import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CalcField {
  id: keyof CalcState;
  label: string;
  unit: string;
  help: string;
  min: number;
  step: number;
}

interface CalcState {
  materialGrams: number;
  materialPrice: number;
  printHours: number;
  machineRate: number;
  powerKw: number;
  electricityRate: number;
  laborMinutes: number;
  laborRate: number;
}

const DEFAULTS: CalcState = {
  materialGrams: 80,
  materialPrice: 1200,
  printHours: 6,
  machineRate: 120,
  powerKw: 0.25,
  electricityRate: 7,
  laborMinutes: 20,
  laborRate: 900,
};

const FIELDS: CalcField[] = [
  { id: 'materialGrams', label: 'Расход материала', unit: 'г', help: 'Вес пластика на деталь, включая поддержки, юбку и рафт — смотрите в слайсере', min: 1, step: 1 },
  { id: 'materialPrice', label: 'Цена материала', unit: '₽/кг', help: 'Стоимость катушки пластика, пересчитанная на 1 кг', min: 0, step: 50 },
  { id: 'printHours', label: 'Время печати', unit: 'ч', help: 'Время печати одной детали, показывает слайсер', min: 0, step: 0.1 },
  { id: 'machineRate', label: 'Ставка принтера', unit: '₽/ч', help: 'Амортизация и обслуживание принтера в час работы', min: 0, step: 10 },
  { id: 'powerKw', label: 'Мощность принтера', unit: 'кВт', help: 'Потребляемая мощность принтера во время печати', min: 0, step: 0.01 },
  { id: 'electricityRate', label: 'Электроэнергия', unit: '₽/кВт·ч', help: 'Тариф на электроэнергию в вашем регионе', min: 0, step: 0.1 },
  { id: 'laborMinutes', label: 'Подготовка', unit: 'мин', help: 'Время на постобработку, снятие поддержек, обслуживание', min: 0, step: 5 },
  { id: 'laborRate', label: 'Работа специалиста', unit: '₽/ч', help: 'Стоимость часа работы мастера', min: 0, step: 50 },
];

const formatMoney = (value: number) => `${Math.round(value).toLocaleString('ru-RU')} ₽`;

const EXAMPLES = [
  {
    image: 'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/280d3736-b189-4fec-81df-a94f5ed834a3.jpg',
    title: 'Фигурка девушки с тюльпаном',
    description: 'Детализированная 3D-печать с цветной покраской элементов',
  },
  {
    image: 'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/9ff1a8ed-5ef5-4eb1-b8a2-1b061396590b.jpg',
    title: 'Свадебная пара по фото',
    description: 'Точное воспроизведение позы и образа молодожёнов',
  },
  {
    image: 'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/905a830f-e37f-42de-9226-df1ee890dc63.jpg',
    title: 'Готовое изделие в подарочной рамке',
    description: 'Оригинальный подарок — фигурка рядом с фотографией события',
  },
];

const PrintCalculatorPage = () => {
  const [values, setValues] = useState<CalcState>(DEFAULTS);

  const handleChange = (id: keyof CalcState, raw: string) => {
    const num = parseFloat(raw);
    setValues(prev => ({ ...prev, [id]: isNaN(num) ? 0 : num }));
  };

  const result = useMemo(() => {
    const materialCost = (values.materialGrams / 1000) * values.materialPrice;
    const machineCost = values.printHours * values.machineRate;
    const electricityCost = values.printHours * values.powerKw * values.electricityRate;
    const laborCost = (values.laborMinutes / 60) * values.laborRate;
    const total = materialCost + machineCost + electricityCost + laborCost;
    const gramPrice = values.materialGrams > 0 ? total / values.materialGrams : 0;
    return { materialCost, machineCost, electricityCost, laborCost, total, gramPrice };
  }, [values]);

  const handleReset = () => setValues(DEFAULTS);

  return (
    <div className="space-y-8 animate-fade-in">
      <Helmet>
        <title>Калькулятор стоимости 3D-печати — Печать на заказ | Полимер-проект</title>
        <meta name="description" content="Онлайн-калькулятор расчёта стоимости 3D-печати на заказ. Укажите расход материала, время печати и получите ориентировочную цену изделия." />
      </Helmet>

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold">Печать на заказ</h1>
        <p className="text-muted-foreground">
          Рассчитайте ориентировочную стоимость 3D-печати вашей модели: укажите расход материала, время печати и подготовку — калькулятор покажет статьи затрат и итоговую цену.
        </p>
      </div>

      <section className="max-w-5xl mx-auto space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold">Примеры наших работ</h2>
          <p className="text-muted-foreground text-sm sm:text-base">Печатаем фигурки по фотографии — свадебные пары, портреты и подарочные сувениры</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {EXAMPLES.map(example => (
            <Card key={example.image} className="overflow-hidden group">
              <div className="relative overflow-hidden">
                <img
                  src={example.image}
                  alt={example.title}
                  className="w-full h-72 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-1">{example.title}</h3>
                <p className="text-xs text-muted-foreground">{example.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 max-w-5xl mx-auto">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Данные для расчёта</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {FIELDS.map(field => (
              <div key={field.id} className="space-y-1.5">
                <Label htmlFor={field.id} className="text-sm flex items-center gap-1">
                  {field.label}
                </Label>
                <div className="relative">
                  <Input
                    id={field.id}
                    type="number"
                    min={field.min}
                    step={field.step}
                    value={values[field.id]}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="pr-16"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    {field.unit}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{field.help}</p>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="mt-4 gap-1.5" onClick={handleReset}>
            <Icon name="RotateCcw" size={14} />
            Сбросить к значениям по умолчанию
          </Button>
        </Card>

        <Card className="p-6 h-fit sticky top-20">
          <h2 className="text-xl font-semibold mb-4">Предварительная смета</h2>
          <div className="text-center bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-xl py-6 mb-4">
            <div className="text-sm opacity-90 mb-1">Расчётная стоимость</div>
            <div className="text-4xl font-bold">{formatMoney(result.total)}</div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Материал</span>
              <span className="font-medium">{formatMoney(result.materialCost)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Работа принтера</span>
              <span className="font-medium">{formatMoney(result.machineCost)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Электроэнергия</span>
              <span className="font-medium">{formatMoney(result.electricityCost)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Подготовка</span>
              <span className="font-medium">{formatMoney(result.laborCost)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Цена за грамм</span>
              <span className="font-medium">{result.gramPrice.toFixed(2)} ₽</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="max-w-5xl mx-auto p-6 sm:p-8">
        <h2 className="text-xl font-semibold mb-3">Как считается стоимость печати</h2>
        <p className="text-sm text-muted-foreground mb-3">
          Формула расчёта: <strong className="text-foreground">стоимость печати = материал + работа принтера + электроэнергия + подготовка</strong>.
        </p>
        <p className="text-sm text-muted-foreground">
          Расход материала обычно показывает слайсер (Cura, PrusaSlicer, OrcaSlicer, Bambu Studio) — учитывайте поддержки, юбку и рафт.
          Цена материала указывается за килограмм, время печати — общее время изготовления детали.
          Хотите точный расчёт под вашу модель — пришлите файл, и мы посчитаем стоимость печати на заказ индивидуально.
        </p>
      </Card>
    </div>
  );
};

export default PrintCalculatorPage;