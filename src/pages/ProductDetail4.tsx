import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
  id: 4,
  sku: '07020007',
  name: 'Настенный светильник "Ворон"',
  price: 350,
  images: [
    'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/8096bb65-5a8a-4934-94e2-e85171eafebb.png',
  ],
  category: 'Интерьер',
  rating: 5.0,
  reviews: 128,
  inStock: true,
  madeIn: 'Россия',
  description: `Арт-объект, который привнесёт в ваш интерьер нотку готической элегантности и загадочности. Ворон — символ мудрости, тайны и вдохновения.

Настенный светильник "Ворон" — это не просто источник света, а настоящее украшение вашего дома, создающее особую атмосферу.`,
  features: [
    '🖤 Готическая элегантность: Уникальный дизайн в тёмных тонах добавит интерьеру загадочности',
    '✨ Арт-объект: Привлекает взгляды и вызывает восхищение гостей',
    '🏠 Универсальность: Подходит для гостиной, спальни, кабинета или прихожей',
    '🎁 Отличный подарок: Для тех, кто ценит необычное и стильное',
    '🔧 Лёгкий монтаж: Простая установка на стену',
    '🇷🇺 Сделано в России: Высокое качество отечественного производителя'
  ],
  specifications: [
    { label: 'Материал', value: 'Полимер высокого качества' },
    { label: 'Цвет', value: 'Чёрный матовый' },
    { label: 'Тип установки', value: 'Настенный' },
    { label: 'Тип лампы', value: 'E27 (не входит в комплект)' },
    { label: 'Максимальная мощность', value: '60 Вт' },
    { label: 'Напряжение', value: '220 В' },
    { label: 'Производство', value: 'Россия' },
    { label: 'Гарантия', value: '1 год' }
  ]
};

const ProductDetail4 = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Helmet>
        <title>Настенный светильник «Ворон» — Полимер-проект</title>
        <meta name="description" content="Настенный светильник «Ворон». Цена: 580₽. Арт-объект с готической элегантностью. Ворон — символ мудрости, тайны и вдохновения в вашем интерьере. Доставка по России." />
        <link rel="canonical" href="https://proekt-polimer.ru/product/4" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": productData.name,
          "sku": productData.sku,
          "description": productData.description.replace(/\n/g, ' '),
          "image": productData.images,
          "brand": { "@type": "Brand", "name": "Полимер-проект" },
          "offers": {
            "@type": "Offer",
            "url": "https://proekt-polimer.ru/product/4",
            "priceCurrency": "RUB",
            "price": productData.price,
            "availability": "https://schema.org/InStock",
            "seller": { "@type": "Organization", "name": "Полимер-проект" }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": productData.rating,
            "reviewCount": productData.reviews,
            "bestRating": 5,
            "worstRating": 1
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://proekt-polimer.ru/" },
            { "@type": "ListItem", "position": 2, "name": "Каталог", "item": "https://proekt-polimer.ru/catalog" },
            { "@type": "ListItem", "position": 3, "name": productData.name, "item": "https://proekt-polimer.ru/product/4" }
          ]
        })}</script>
      </Helmet>
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
              <img
                src={productData.images[selectedImage]}
                alt={productData.name}
                className="w-full h-full object-contain p-8"
              />

            </div>
            <div className="grid grid-cols-5 gap-3">
              {productData.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? 'border-primary shadow-md scale-105'
                      : 'border-transparent hover:border-primary/50'
                  }`}
                >
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
                  <Icon name="CheckCircle" size={16} className="text-green-500" />
                  В наличии
                </Badge>
                <Badge variant="outline" className="gap-2 px-4 py-2">
                  <Icon name="Flag" size={16} />
                  {productData.madeIn}
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
                <Icon name="ShoppingCart" size={20} />
                Добавить в корзину
              </Button>
              <Button size="lg" variant="outline" className="w-full gap-2">
                <Icon name="Heart" size={20} />
                В избранное
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
              <div className="prose max-w-none">
                {productData.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-lg leading-relaxed mb-4 text-muted-foreground">{paragraph}</p>
                ))}
              </div>
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

export default ProductDetail4;