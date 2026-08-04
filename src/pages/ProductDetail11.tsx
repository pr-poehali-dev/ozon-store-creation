import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import monk1 from '@/assets/products/monk-1.jpg';
import monk2 from '@/assets/products/monk-2.jpg';
import monkCandleInsert from '@/assets/products/monk-candle-insert.jpg';

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
  id: 11,
  sku: '07020011',
  name: 'Подсвечник "Монах"',
  price: 900,
  images: [
    monk1,
    monk2,
    monkCandleInsert,
  ],
  category: 'Интерьер',
  rating: 5.0,
  reviews: 0,
  inStock: true,
  madeIn: 'Россия',
  description: `Окунитесь в мир таинственности и элегантности с нашей эксклюзивной статуэткой, воплощающей образ таинственной фигуры, освещенной внутренним пламенем. Это не просто предмет декора, а настоящий артефакт, способный преобразить любое пространство, наполнив его особой атмосферой.

Неповторимый дизайн и безупречное качество

В основе этой статуэтки лежит глубокая символика, облаченная в форму, притягивающую взгляды. Темный, струящийся плащ фигуры словно живёт собственной жизнью, окутывая загадочный внутренний свет. Этот контраст между мраком и огнём завораживает, создавая поистине магнетический эффект. Материалы, из которых изготовлена статуэтка, подобраны с особой тщательностью, обеспечивая её долговечность и изысканный внешний вид. Детализация проработки формы поражает: каждая складка ткани, каждый изгиб фигуры – всё выполнено с высочайшим мастерством.

Привнесите элемент магии в свою жизнь!

Представьте: вечер, приглушённый свет, и в центре вашего внимания – эта завораживающая статуэтка. Её мягкое, пульсирующее сияние окутывает комнату тёплом и спокойствием, приглашая к размышлениям или приятному отдыху. Это идеальное средство для завершения образа вашего кабинета, гостиной или спальни, добавляя им нотку загадочности и утончённости.`,
  features: [
    '✨ Элегантный дизайн: Классическое исполнение дополнит любой интерьер',
    '🖤 Прочный материал: Чёрный пластик обеспечивает прочность и устойчивость к повседневным нагрузкам',
    '📐 Компактные размеры: Идеально подходят для настольного размещения в доме или на мероприятии',
    '🎉 Универсальное применение: Подходит для создания атмосферы на праздниках любого формата',
    '🕯️ Простота использования: Одно центральное отверстие под свечу позволяет быстро подготовить декор',
    '🌌 Уникальная атмосфера: Излучает таинственный, мягкий свет, создающий уютную и немного мистическую обстановку',
    '🎁 Идеальный подарок: Оценят люди с тонким вкусом, любящие искусство, мистику и эксклюзивные вещи'
  ],
  specifications: [
    { label: 'Материал', value: 'Высококачественный пластик' },
    { label: 'Цвет', value: 'Чёрный' },
    { label: 'Тип', value: 'Подсвечник декоративный' },
    { label: 'Источник света', value: 'Светодиодная свеча (в комплекте)' },
    { label: 'Питание', value: 'Батарейки' },
    { label: 'Способ размещения', value: 'Настольный' },
    { label: 'Производство', value: 'Россия' },
    { label: 'Гарантия', value: 'Без гарантии' }
  ]
};

const ProductDetail11 = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Helmet>
        <title>Подсвечник «Монах» — Полимер-проект</title>
        <meta name="description" content="Подсвечник «Монах». Цена: 900₽. Эксклюзивная статуэтка таинственной фигуры с внутренним пламенем — идеальный выбор для тех, кто ценит оригинальность. Доставка по России." />
        <link rel="canonical" href="https://proekt-polimer.ru/product/11" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": productData.name,
          "sku": productData.sku,
          "description": productData.description.replace(/\n/g, ' '),
          "brand": { "@type": "Brand", "name": "Полимер-проект" },
          "offers": {
            "@type": "Offer",
            "url": "https://proekt-polimer.ru/product/11",
            "priceCurrency": "RUB",
            "price": productData.price,
            "availability": "https://schema.org/InStock",
            "seller": { "@type": "Organization", "name": "Полимер-проект" }
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://proekt-polimer.ru/" },
            { "@type": "ListItem", "position": 2, "name": "Каталог", "item": "https://proekt-polimer.ru/catalog" },
            { "@type": "ListItem", "position": 3, "name": productData.name, "item": "https://proekt-polimer.ru/product/11" }
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
            {productData.images.length > 1 && (
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
            )}
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
                <div className="text-xs text-muted-foreground">на брак</div>
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
                  <p key={idx} className="text-lg leading-relaxed mb-4 text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="mt-8">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Многогранные достоинства</h2>
              <div className="grid gap-6">
                {productData.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon name="Check" size={20} className="text-primary" />
                    </div>
                    <p className="text-lg leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="specs" className="mt-8">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Технические характеристики</h2>
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

export default ProductDetail11;
