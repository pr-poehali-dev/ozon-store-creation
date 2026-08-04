import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import ravenRight1 from '@/assets/products/raven-right-1.png';
import ravenR1 from '@/assets/products/raven-r-1.jpg';
import ravenR2 from '@/assets/products/raven-r-2.jpg';
import ravenR3 from '@/assets/products/raven-r-3.png';
import ravenR4 from '@/assets/products/raven-r-4.jpg';

interface ProductDetail {
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

const productData: ProductDetail = {
  id: 1,
  sku: '07020002',
  name: 'Настенный светильник "Ворон крепление справа"',
  price: 850,
  images: [
    ravenRight1,
    ravenR1,
    ravenR2,
    ravenR3,
    ravenR4
  ],
  category: 'Интерьер',
  rating: 5.0,
  reviews: 347,
  inStock: true,
  madeIn: 'Россия',
  description: `Эта восхитительная скульптура – воплощение элегантности и интеллекта. Грациозная фигура ворона, выполненная с безупречной детализацией, удерживает в клюве светящуюся лампочку, символизируя связь между мудростью, прозрением и озарением.

Настенный светильник "Ворон настенный" – это не просто источник света, а настоящий арт-объект, который преобразит любое помещение. Идеальное сочетание функциональности и эстетики.`,
  features: [
    '✨ Уникальный дизайн: Станьте обладателем эксклюзивного предмета искусства, который подчеркнет вашу индивидуальность и тонкий вкус',
    '🏠 Неповторимая атмосфера: Создайте в своем доме атмосферу уюта, вдохновения и интеллектуального комфорта',
    '💎 Источник вдохновения: Наслаждайтесь красотой и мудростью, которые излучает эта удивительная скульптура',
    '🎁 Идеальный подарок: Подарите своим близким нечто особенное, что будет радовать их долгие годы',
    '🔧 Безупречное качество: Будьте уверены в долговечности и безупречном внешнем виде вашей покупки',
    '🇷🇺 Сделано в России: Поддержка отечественного производителя и высокие стандарты качества'
  ],
  specifications: [
    { label: 'Материал', value: 'Полимер высокого качества' },
    { label: 'Цвет', value: 'Черный матовый' },
    { label: 'Размер ворона', value: '35 × 15 см' },
    { label: 'Длина крепления', value: '~20 см' },
    { label: 'Тип лампы', value: 'E27 (не входит в комплект)' },
    { label: 'Максимальная мощность', value: '60 Вт' },
    { label: 'Напряжение', value: '220 В' },
    { label: 'Способ крепления', value: 'Настенное' },
    { label: 'Производство', value: 'Россия' },
    { label: 'Гарантия', value: '1 год' }
  ]
};

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Helmet>
        <title>{productData.name} — Полимер-проект</title>
        <meta name="description" content={`${productData.name}. Цена: ${productData.price}₽. ${productData.description.slice(0, 120).replace(/\n/g, ' ')} Доставка по России.`} />
        <link rel="canonical" href="https://proekt-polimer.ru/product/1" />
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
            "url": "https://proekt-polimer.ru/product/1",
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
            { "@type": "ListItem", "position": 3, "name": productData.name, "item": "https://proekt-polimer.ru/product/1" }
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
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 mb-12">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <img
                src={productData.images[selectedImage]}
                alt={productData.name}
                className="w-full h-full object-contain p-4 sm:p-8"
              />

            </div>
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
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
              <h1 className="text-2xl sm:text-4xl font-bold mb-4">{productData.name}</h1>
              
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
                <div className="text-3xl sm:text-5xl font-bold text-primary">{productData.price.toLocaleString()} ₽</div>
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
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-10 w-10"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Icon name="Minus" size={16} />
                  </Button>
                  <span className="w-12 text-center font-bold text-xl">{quantity}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-10 w-10"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Icon name="Plus" size={16} />
                  </Button>
                </div>
                <div className="text-right flex-1">
                  <div className="text-sm text-muted-foreground">Сумма:</div>
                  <div className="text-2xl font-bold text-primary">
                    {(productData.price * quantity).toLocaleString()} ₽
                  </div>
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Описание</TabsTrigger>
            <TabsTrigger value="features">Преимущества</TabsTrigger>
            <TabsTrigger value="specs">Характеристики</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6 sm:mt-8">
            <Card className="p-4 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">О товаре</h2>
              <div className="prose max-w-none">
                {productData.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-base leading-relaxed mb-4 text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="mt-6 sm:mt-8">
            <Card className="p-4 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-6">Почему стоит купить?</h2>
              <div className="grid gap-4 sm:gap-6">
                {productData.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-3 sm:gap-4 items-start">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon name="Check" size={16} className="text-primary" />
                    </div>
                    <p className="text-base leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="specs" className="mt-6 sm:mt-8">
            <Card className="p-4 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-6">Технические характеристики</h2>
              <div className="grid gap-4">
                {productData.specifications.map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between py-4 border-b last:border-0 hover:bg-muted/30 px-4 rounded transition-colors"
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

export default ProductDetail;