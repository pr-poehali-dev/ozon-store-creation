import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface ProductDetailType {
  id: number;
  sku: string;
  name: string;
  price: number;
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

const productData: ProductDetailType = {
  id: 7,
  sku: '07020004',
  name: 'Настенный светильник "Сова на ветке"',
  price: 750,
  images: [
    'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/83c5fef9-775f-45cf-a2ca-6f871b38f789.JPG',
    'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/cbeb8c7c-1f28-49ff-8b0a-c4c117b84660.JPG',
    'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/81822cdb-7e4a-4031-aae6-16ec7bf19dd1.JPG',
    'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/e96e77de-0dc7-425f-9a50-ef51a027b8d7.JPG',
    'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/0e3953fc-7f4b-4a11-9599-f862205ed896.JPG',
  ],
  category: 'Интерьер',
  rating: 5.0,
  reviews: 97,
  inStock: true,
  madeIn: 'Россия',
  description: `Станет центральным элементом вашего интерьера. В детской — добрый ночной страж, охраняющий сны вашего ребёнка. В гостиной или прихожей — произведёт неизгладимое впечатление на гостей, подчеркнув ваш утончённый вкус.

Не просто предмет интерьера — это ваш персональный источник вдохновения и уюта. Изящная фигура совы станет объектом восхищения. Уникальный аксессуар — не просто источник освещения, это сочетание оригинальности и безупречного вкуса.`,
  features: [
    '🦉 Оригинальный дизайн: Изящная сова на ветке — настоящий арт-объект для вашего дома',
    '🏠 Универсальность: Идеально для детской, гостиной, прихожей или спальни',
    '✨ Притягивает взгляды: Станет центральным элементом любого интерьера',
    '😌 Уют и покой: Дарит ощущение спокойствия и умиротворения',
    '🎁 Отличный подарок: Для детей и взрослых, ценящих стиль и оригинальность',
    '🇷🇺 Сделано в России: Высокое качество отечественного производства'
  ],
  specifications: [
    { label: 'Материал', value: 'Полимер высокого качества' },
    { label: 'Цвет', value: 'Белый' },
    { label: 'Тип установки', value: 'Настенный' },
    { label: 'Тип лампы', value: 'E27 (не входит в комплект)' },
    { label: 'Максимальная мощность', value: '10 Вт' },
    { label: 'Напряжение', value: '220 В' },
    { label: 'Производство', value: 'Россия' },
    { label: 'Гарантия', value: '1 год' }
  ]
};

const ProductDetail7 = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

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
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <img src={productData.images[selectedImage]} alt={productData.name} className="w-full h-full object-contain p-8" />

            </div>
            <div className="grid grid-cols-5 gap-3">
              {productData.images.map((img, idx) => (
                <button key={idx} onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-primary shadow-md scale-105' : 'border-transparent hover:border-primary/50'}`}>
                  <img src={img} alt={`${productData.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary">{productData.category}</Badge>
                <span className="text-sm text-muted-foreground">Арт. {productData.sku}</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">{productData.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={20} className={i < Math.floor(productData.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} />
                    ))}
                  </div>
                  <span className="font-semibold">{productData.rating}</span>
                </div>
                <span className="text-muted-foreground">({productData.reviews} отзывов)</span>
              </div>
              <div className="flex items-baseline gap-4 mb-6">
                <div className="text-5xl font-bold text-primary">{productData.price.toLocaleString()} ₽</div>
              </div>
              <div className="flex gap-3 mb-6">
                <Badge variant="outline" className="gap-2 px-4 py-2">
                  <Icon name="CheckCircle" size={16} className="text-green-500" />В наличии
                </Badge>
                <Badge variant="outline" className="gap-2 px-4 py-2">
                  <Icon name="Flag" size={16} />{productData.madeIn}
                </Badge>
              </div>
            </div>

            <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 border">
                  <Button size="icon" variant="outline" className="h-10 w-10" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Icon name="Minus" size={16} />
                  </Button>
                  <span className="w-12 text-center font-bold text-xl">{quantity}</span>
                  <Button size="icon" variant="outline" className="h-10 w-10" onClick={() => setQuantity(quantity + 1)}>
                    <Icon name="Plus" size={16} />
                  </Button>
                </div>
                <div className="text-right flex-1">
                  <div className="text-sm text-muted-foreground">Сумма:</div>
                  <div className="text-2xl font-bold text-primary">{(productData.price * quantity).toLocaleString()} ₽</div>
                </div>
              </div>
              <Button size="lg" className="w-full mb-3 gap-2">
                <Icon name="ShoppingCart" size={20} />Добавить в корзину
              </Button>
              <Button size="lg" variant="outline" className="w-full gap-2">
                <Icon name="Heart" size={20} />В избранное
              </Button>
            </Card>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Icon name="Truck" size={32} className="mx-auto mb-2 text-primary" />
                <div className="font-semibold text-sm">Быстрая доставка</div>
                <div className="text-xs text-muted-foreground">по России</div>
              </div>
              <div className="text-center">
                <Icon name="Shield" size={32} className="mx-auto mb-2 text-primary" />
                <div className="font-semibold text-sm">Гарантия</div>
                <div className="text-xs text-muted-foreground">1 год</div>
              </div>
              <div className="text-center">
                <Icon name="RotateCcw" size={32} className="mx-auto mb-2 text-primary" />
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
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">О товаре</h2>
              {productData.description.split('\n\n').map((p, idx) => (
                <p key={idx} className="text-lg leading-relaxed mb-4 text-muted-foreground">{p}</p>
              ))}
            </Card>
          </TabsContent>
          <TabsContent value="features" className="mt-8">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Почему стоит купить?</h2>
              <div className="grid gap-6">
                {productData.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon name="Check" size={20} className="text-primary" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="specs" className="mt-8">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Технические характеристики</h2>
              <div className="grid gap-3">
                {productData.specifications.map((spec, idx) => (
                  <div key={idx} className="flex justify-between py-3 border-b last:border-0">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium">{spec.value}</span>
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

export default ProductDetail7;