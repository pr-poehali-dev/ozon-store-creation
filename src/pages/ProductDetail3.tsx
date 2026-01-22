import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface ProductDetail {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  specifications: { label: string; value: string }[];
  inStock: boolean;
  madeIn: string;
}

const productData: ProductDetail = {
  id: 3,
  name: 'Настольный светильник "Ворон золотой"',
  price: 1900,
  oldPrice: 700,
  images: [
    'https://cdn.poehali.dev/files/d049b710-acfb-4fc8-912e-78a07883cc3e.png',
    'https://cdn.poehali.dev/files/f72fc973-b899-441f-ab8f-ae0394bfeb02.png',
    'https://cdn.poehali.dev/files/0fcf2b4f-726b-441c-8ee4-0c932fdb12ba.png',
    'https://cdn.poehali.dev/files/7e20a695-3456-4335-b134-57f8cb229a9b.png',
    'https://cdn.poehali.dev/files/113676be-11eb-41e5-b991-b53ab798e0e9.JPG'
  ],
  category: 'Интерьер',
  rating: 5.0,
  reviews: 412,
  inStock: true,
  madeIn: 'Россия',
  description: `Настольный светильник "Ворон золотой" — это шедевр современного дизайна, сочетающий в себе элегантность, стиль и функциональность. Скульптура ворона с золотистым оттенком придает интерьеру нотки роскоши и изысканности.

Этот светильник создает волшебную атмосферу, наполняя пространство теплым, мягким светом. Идеальный выбор для тех, кто ценит оригинальность, стиль и внимание к деталям. Станьте владельцем уникального арт-объекта, который подчеркнет ваш безупречный вкус.`,
  features: [
    '✨ Золотистый оттенок: Роскошный дизайн с переливами золота создает эффект премиальности и изысканности',
    '🎨 Арт-объект: Настоящее произведение искусства, которое станет центром внимания в любом интерьере',
    '💡 Теплый свет: Создает уютную, располагающую атмосферу для вечернего отдыха и релаксации',
    '🏆 Эксклюзивность: Оригинальный дизайн для тех, кто ценит индивидуальность и стиль',
    '🌟 Универсальное применение: Идеален для гостиной, спальни, кабинета или прихожей',
    '🎁 Статусный подарок: Презент премиум-класса для людей с утонченным вкусом',
    '🇷🇺 Российское производство: Качество и надежность от отечественного производителя'
  ],
  specifications: [
    { label: 'Материал', value: 'Премиальный полимер' },
    { label: 'Цвет', value: 'Золотистый с градиентом' },
    { label: 'Размер фигуры', value: '32 × 14 см' },
    { label: 'Высота с лампой', value: '~28 см' },
    { label: 'Тип установки', value: 'Настольный' },
    { label: 'Тип лампы', value: 'E27 (в комплект не входит)' },
    { label: 'Рекомендуемая мощность', value: '40-60 Вт' },
    { label: 'Напряжение', value: '220 В' },
    { label: 'Длина кабеля', value: '1.5 м с выключателем' },
    { label: 'Производство', value: 'Россия' },
    { label: 'Гарантия', value: '1 год' }
  ]
};

const ProductDetail3 = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const discount = productData.oldPrice
    ? Math.round((1 - productData.oldPrice / productData.price) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Полимер-проект
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg">
              <img
                src={productData.images[selectedImage]}
                alt={productData.name}
                className="w-full h-full object-contain p-8"
              />
              <Badge className="absolute top-6 right-6 bg-amber-500 text-white text-lg px-4 py-2">
                ⭐ Премиум
              </Badge>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {productData.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? 'border-amber-500 shadow-md scale-105'
                      : 'border-transparent hover:border-amber-300'
                  }`}
                >
                  <img src={img} alt={`${productData.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3 bg-amber-100 text-amber-800">
                {productData.category}
              </Badge>
              <h1 className="text-4xl font-bold mb-4">{productData.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={20}
                        className={i < Math.floor(productData.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{productData.rating}</span>
                </div>
                <span className="text-muted-foreground">({productData.reviews} отзывов)</span>
              </div>

              <div className="flex items-baseline gap-4 mb-6">
                <div className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  {productData.price.toLocaleString()} ₽
                </div>
                {productData.oldPrice && (
                  <div className="text-xl text-muted-foreground">
                    Опт: {productData.oldPrice} ₽
                  </div>
                )}
              </div>

              <div className="flex gap-3 mb-6">
                <Badge variant="outline" className="gap-2 px-4 py-2 border-green-500 text-green-700">
                  <Icon name="CheckCircle" size={16} className="text-green-500" />
                  В наличии
                </Badge>
                <Badge variant="outline" className="gap-2 px-4 py-2 border-amber-500 text-amber-700">
                  <Icon name="Flag" size={16} />
                  {productData.madeIn}
                </Badge>
              </div>
            </div>

            <Card className="p-6 bg-gradient-to-br from-amber-50/50 to-orange-50/50 border-amber-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 border border-amber-200">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-10 w-10 border-amber-300 hover:bg-amber-50"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Icon name="Minus" size={16} />
                  </Button>
                  <span className="w-12 text-center font-bold text-xl">{quantity}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-10 w-10 border-amber-300 hover:bg-amber-50"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Icon name="Plus" size={16} />
                  </Button>
                </div>
                <div className="text-right flex-1">
                  <div className="text-sm text-muted-foreground">Сумма:</div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    {(productData.price * quantity).toLocaleString()} ₽
                  </div>
                </div>
              </div>

              <Button size="lg" className="w-full mb-3 gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                <Icon name="ShoppingCart" size={20} />
                Добавить в корзину
              </Button>
              <Button size="lg" variant="outline" className="w-full gap-2 border-amber-300 hover:bg-amber-50">
                <Icon name="Heart" size={20} />
                В избранное
              </Button>
            </Card>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Icon name="Truck" size={32} className="mx-auto mb-2 text-amber-600" />
                <div className="font-semibold text-sm">Быстрая доставка</div>
                <div className="text-xs text-muted-foreground">по России</div>
              </div>
              <div className="text-center">
                <Icon name="Shield" size={32} className="mx-auto mb-2 text-amber-600" />
                <div className="font-semibold text-sm">Гарантия</div>
                <div className="text-xs text-muted-foreground">1 год</div>
              </div>
              <div className="text-center">
                <Icon name="RotateCcw" size={32} className="mx-auto mb-2 text-amber-600" />
                <div className="font-semibold text-sm">Возврат</div>
                <div className="text-xs text-muted-foreground">14 дней</div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="description">Описание</TabsTrigger>
            <TabsTrigger value="features">Преимущества</TabsTrigger>
            <TabsTrigger value="specs">Характеристики</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-8">
            <Card className="p-8 border-amber-100">
              <h2 className="text-2xl font-bold mb-4">О товаре</h2>
              <div className="prose max-w-none">
                {productData.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-lg leading-relaxed mb-4 text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="mt-8">
            <Card className="p-8 border-amber-100">
              <h2 className="text-2xl font-bold mb-6">Почему стоит купить?</h2>
              <div className="grid gap-6">
                {productData.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon name="Check" size={20} className="text-amber-600" />
                    </div>
                    <p className="text-lg leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="specs" className="mt-8">
            <Card className="p-8 border-amber-100">
              <h2 className="text-2xl font-bold mb-6">Технические характеристики</h2>
              <div className="grid gap-4">
                {productData.specifications.map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between py-4 border-b last:border-0 hover:bg-amber-50/30 px-4 rounded transition-colors"
                  >
                    <span className="font-medium text-muted-foreground">{spec.label}</span>
                    <span className="font-semibold text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ProductDetail3;
