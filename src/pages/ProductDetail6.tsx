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

const productData: ProductDetailType = {
  id: 6,
  sku: '07020005',
  name: 'Настенный светильник "Сова"',
  price: 2500,
  oldPrice: 1000,
  images: [
    'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/8879c698-3282-47fe-86c7-bb9ff379fbfa.JPG',
    'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/c2877778-83e8-4d04-b1d1-a2c70e67def9.JPG',
    'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/57d2c398-70cd-45c8-914d-7491c0bed2d1.JPG',
    'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/fd6220db-2f2f-4d47-a4d0-0b383a80d7a3.png',
    'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/c6cb540e-9ded-412a-afa8-4b898b07ffab.JPG',
  ],
  category: 'Интерьер',
  rating: 5.0,
  reviews: 183,
  inStock: true,
  madeIn: 'Россия',
  description: `Добавьте в свою жизнь магию ночи и мудрость веков с уникальным светильником "Сова". Сова — древний символ мудрости, проницательности, ночного видения и защиты.

Не просто источник света, это арт-объект, который призван дарить эмоции, создавать настроение и отражать вашу индивидуальность. Позвольте этой мистической птице осветить ваш дом, наполняя его теплом, мудростью и волшебством.`,
  features: [
    '🦉 Символ мудрости: Сова — древний символ знания, проницательности и защиты',
    '✨ Арт-объект: Станет изюминкой вашего интерьера и объектом восхищения гостей',
    '🌙 Магия ночи: Создаёт атмосферу таинственности и уюта',
    '🎁 Прекрасный подарок: Для тех, кто ценит красоту, смысл и уникальность',
    '🏠 Универсальность: Идеально впишется в классический и современный интерьер',
    '🇷🇺 Сделано в России: Качество и надёжность отечественного производителя'
  ],
  specifications: [
    { label: 'Материал', value: 'Полимер высокого качества' },
    { label: 'Цвет', value: 'Белый' },
    { label: 'Тип установки', value: 'Настенный' },
    { label: 'Тип лампы', value: 'E27 (не входит в комплект)' },
    { label: 'Максимальная мощность', value: '60 Вт' },
    { label: 'Напряжение', value: '220 В' },
    { label: 'Производство', value: 'Россия' },
    { label: 'Гарантия', value: '1 год' }
  ]
};

const ProductDetail6 = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const discount = productData.oldPrice
    ? Math.round((1 - productData.price / productData.oldPrice) * 100)
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
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <img src={productData.images[selectedImage]} alt={productData.name} className="w-full h-full object-contain p-8" />
              {productData.oldPrice && (
                <Badge className="absolute top-6 right-6 bg-accent text-lg px-4 py-2">-{discount}%</Badge>
              )}
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
                {productData.oldPrice && (
                  <div className="text-2xl text-muted-foreground line-through">{productData.oldPrice.toLocaleString()} ₽</div>
                )}
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

export default ProductDetail6;
