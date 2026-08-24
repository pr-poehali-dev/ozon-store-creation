import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

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
  id: 12,
  sku: '07020012',
  name: 'Крючок самозажимной',
  price: 85,
  images: [
    'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/0217760a-e3e5-4f5a-9491-4c08e7ff7f4a.png',
    'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/c1426912-3a43-409b-b016-9ddfefadad84.png',
    'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/3e710cbb-1aa8-4fa2-8605-c376742f537a.png',
    'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/945eb3bf-4089-4371-8b67-e80dbe9a019f.png',
    'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/4c637eac-1775-45a3-bbe6-5c75cb30044a.png',
    'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/3d167f31-4d30-4008-a766-79f49ecc1b1f.png',
    'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/57105756-71fe-4767-bb15-f2f16d714357.png',
    'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/99456524-3c75-46f5-840f-7a14efb98396.png',
    'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/b0f57563-8494-45dc-b159-06047ea84633.png',
  ],
  category: 'Для дома',
  rating: 5.0,
  reviews: 0,
  inStock: true,
  madeIn: 'Россия',
  description: `Революция в организации вашего пространства: Откройте для себя самозажимающиеся крючки нового поколения!

Устали от вечного хаоса и неэстетичных решений для хранения? Представляем вам продукт, который изменит ваше представление об организации дома. Наши самозажимающиеся крючки – это не просто аксессуар, это философия порядка, воплощенная в инновационной технологии. Они легко крепятся, надежно держатся и выглядят так, словно были созданы специально для вашего интерьера.

Безупречная функциональность в каждой детали. Забудьте о сверлении стен и сложных монтажах. Уникальная запатентованная система самозажима позволяет вам разместить крючок где угодно – от гладкой плитки в ванной до деревянных поверхностей на кухне – без каких-либо повреждений. Просто приложите, нажмите, и крючок надежно зафиксируется, готовый выдержать значительные нагрузки.

Эстетика, которая восхищает. Мы понимаем, что дом – это отражение вашей индивидуальности. Поэтому наши крючки представлены в широкой палитре цветов и фактур, от сдержанной классики до ярких акцентов. Они гармонично впишутся в любой стиль, от скандинавского минимализма до богемного шика, добавляя вашему пространству изысканности и завершенности.

Долговечность и надежность, на которые можно положиться. Изготовленные из высококачественных, экологически чистых материалов, наши самозажимающиеся крючки спроектированы для долговременного использования. Они устойчивы к влаге, перепадам температур и механическим воздействиям, сохраняя свою первоначальную привлекательность и функциональность на долгие годы.

Удобство, которое оценит каждый. Простота использования – наш приоритет. Откройте для себя новый уровень комфорта и порядка, который наши крючки привнесут в вашу повседневную жизнь. Они станут незаменимыми помощниками для организации полотенец, одежды, кухонной утвари, ключей и множества других вещей.

Сделайте шаг навстречу идеальному порядку и стилю. Выберите самозажимающиеся крючки – ваш дом скажет вам спасибо!`,
  features: [
    '🧲 Самозажимное крепление: Надёжно держится без сверления и клея',
    '🎨 7 видов текстур: Полосатая, сотовая, вафельная и другие — на любой вкус',
    '💧 Влагостойкость: Идеально для ванной и кухни',
    '🏠 Универсальность: Для полотенец, одежды, ключей и кухонной утвари',
    '♻️ Экологичные материалы: Безопасны для дома и не оставляют следов на поверхности',
    '⚡ Быстрая установка: Приложить, нажать — и крючок готов к использованию',
    '🎁 Продаётся набором: 3 штуки в комплекте'
  ],
  specifications: [
    { label: 'Материал', value: 'Высококачественный полимер' },
    { label: 'Комплект', value: '3 шт' },
    { label: 'Крепление', value: 'Самоклеящееся, без сверления' },
    { label: 'Поверхности', value: 'Плитка, дерево, стекло, металл, пластик' },
    { label: 'Место применения', value: 'Ванная, кухня, прихожая, спальня' },
    { label: 'Производство', value: 'Россия' },
    { label: 'Гарантия', value: 'Без гарантии' }
  ]
};

const ProductDetail12 = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Helmet>
        <title>Крючок самозажимной — Полимер-проект</title>
        <meta name="description" content="Крючок самозажимной. Цена: 85₽ за штуку. Самоклеящиеся крючки без сверления — для ванной, кухни, прихожей и спальни. Доставка по России." />
        <link rel="canonical" href="https://proekt-polimer.ru/product/12" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": productData.name,
          "sku": productData.sku,
          "description": productData.description.replace(/\n/g, ' '),
          "brand": { "@type": "Brand", "name": "Полимер-проект" },
          "offers": {
            "@type": "Offer",
            "url": "https://proekt-polimer.ru/product/12",
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
            { "@type": "ListItem", "position": 3, "name": productData.name, "item": "https://proekt-polimer.ru/product/12" }
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

export default ProductDetail12;