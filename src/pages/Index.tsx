import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  featured?: boolean;
  description?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Настенный светильник "Ворон настенный крепление с право"',
    price: 1900,
    oldPrice: 700,
    image: 'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/2c365501-6595-4d4e-bad1-d09f29e73b87.PNG',
    category: 'Интерьер',
    rating: 5.0,
    reviews: 347,
    featured: true,
    description: 'Предмет искусства, который не просто украшает пространство, но и пробуждает воображение, вдохновляет на размышления'
  },
  {
    id: 2,
    name: 'Настольный светильник "Ворон белый"',
    price: 1900,
    oldPrice: 700,
    image: 'https://cdn.poehali.dev/files/9c8c5d3b-f00d-47ad-b19e-51e059d79f85.JPG',
    category: 'Интерьер',
    rating: 5.0,
    reviews: 289,
    featured: true,
    description: 'Стильный акцент в вашем интерьере, приковывающий взгляды и вызывающий восхищение'
  },
  {
    id: 7,
    name: 'Настенный светильник "Сова на ветке"',
    price: 1700,
    oldPrice: 750,
    image: 'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/83c5fef9-775f-45cf-a2ca-6f871b38f789.JPG',
    category: 'Интерьер',
    rating: 5.0,
    reviews: 97,
    featured: true,
    description: 'Станет центральным элементом вашего интерьера. В детской — добрый ночной страж, в гостиной — произведёт неизгладимое впечатление на гостей, подчеркнув ваш утончённый вкус'
  },
  {
    id: 6,
    name: 'Настенный светильник "Сова"',
    price: 2500,
    oldPrice: 1000,
    image: 'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/8879c698-3282-47fe-86c7-bb9ff379fbfa.JPG',
    category: 'Интерьер',
    rating: 5.0,
    reviews: 183,
    featured: true,
    description: 'Добавьте в свою жизнь магию ночи и мудрость веков. Сова — древний символ мудрости, проницательности и защиты. Станет изюминкой вашего интерьера'
  },
  {
    id: 5,
    name: 'Настенный светильник "Луна"',
    price: 3100,
    oldPrice: 1100,
    image: 'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/3174a2b5-b1a4-4b3d-80e6-9f209257dc2d.JPG',
    category: 'Интерьер',
    rating: 5.0,
    reviews: 215,
    featured: true,
    description: 'Свет, который словно сошёл с ночного неба, принося с собой магию лунных ночей. Превратит ваше пространство в настоящее произведение искусства'
  },
  {
    id: 4,
    name: 'Настенный светильник "Ворон"',
    price: 850,
    oldPrice: 350,
    image: 'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/8096bb65-5a8a-4934-94e2-e85171eafebb.png',
    category: 'Интерьер',
    rating: 5.0,
    reviews: 128,
    featured: true,
    description: 'Арт-объект, который привнесёт в ваш интерьер нотку готической элегантности и загадочности'
  },
  {
    id: 3,
    name: 'Настольный светильник "Ворон"',
    price: 1900,
    oldPrice: 700,
    image: 'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/c05a670d-564b-47d9-bde3-96214f2f5be2.PNG',
    category: 'Интерьер',
    rating: 5.0,
    reviews: 412,
    featured: true,
    description: 'Выбор для тех, кто ценит оригинальность, стиль и внимание к деталям'
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const categories = ['Все', 'Интерьер'];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = selectedCategory === 'Все' 
    ? mockProducts 
    : mockProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Полимер-проект
              </h1>
              <nav className="hidden md:flex gap-6">
                {['home', 'catalog', 'reviews', 'delivery', 'about', 'contacts'].map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    className={`transition-colors font-medium ${
                      activeSection === section ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {section === 'home' && 'Главная'}
                    {section === 'catalog' && 'Каталог'}
                    {section === 'reviews' && 'Отзывы'}
                    {section === 'delivery' && 'Доставка'}
                    {section === 'about' && 'О магазине'}
                    {section === 'contacts' && 'Контакты'}
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Search" size={20} />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setActiveSection('profile')}>
                <Icon name="User" size={20} />
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {totalItems > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-12">
                        <Icon name="ShoppingBag" size={48} className="mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">Корзина пуста</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                          {cart.map(item => (
                            <Card key={item.id} className="p-4">
                              <div className="flex gap-4">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                                <div className="flex-1">
                                  <h4 className="font-semibold text-sm">{item.name}</h4>
                                  <p className="text-primary font-bold mt-1">{item.price.toLocaleString()} ₽</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      className="h-8 w-8"
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                      <Icon name="Minus" size={14} />
                                    </Button>
                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      className="h-8 w-8"
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                      <Icon name="Plus" size={14} />
                                    </Button>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-8 w-8 ml-auto text-destructive"
                                      onClick={() => removeFromCart(item.id)}
                                    >
                                      <Icon name="Trash2" size={14} />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                        <div className="border-t pt-4 space-y-4">
                          <div className="flex justify-between text-lg font-bold">
                            <span>Итого:</span>
                            <span className="text-primary">{totalPrice.toLocaleString()} ₽</span>
                          </div>
                          <Button className="w-full" size="lg">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <div className="space-y-12 animate-fade-in">
            <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary via-secondary to-accent p-12 text-white">
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-5xl font-bold mb-4">Розница 1900₽ • Опт 700₽</h2>
                <p className="text-xl mb-8 text-white/90">Эксклюзивные светильники ручной работы</p>
                <Button size="lg" variant="secondary" className="shadow-lg" onClick={() => setActiveSection('catalog')}>
                  Смотреть каталог
                </Button>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20">
                <Icon name="Lightbulb" size={200} className="absolute right-10 top-10" />
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Наши товары</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProducts.slice(0, 6).map(product => (
                  <Card key={product.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 animate-scale-in">
                    <div 
                      className="relative overflow-hidden cursor-pointer"
                      onClick={() => product.featured && navigate(`/product/${product.id}`)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.oldPrice && (
                        <Badge className="absolute top-4 right-4 bg-accent">
                          -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                        </Badge>
                      )}
                      {product.featured && (
                        <Badge className="absolute top-4 left-4 bg-primary">
                          ⭐ Хит
                        </Badge>
                      )}
                    </div>
                    <div className="p-6">
                      <Badge variant="secondary" className="mb-2">
                        {product.category}
                      </Badge>
                      <h3 
                        className="font-semibold text-lg mb-2 cursor-pointer hover:text-primary transition-colors"
                        onClick={() => product.featured && navigate(`/product/${product.id}`)}
                      >
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                          <span className="ml-1 text-sm font-medium">{product.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-primary">{product.price.toLocaleString()} ₽</div>
                          {product.oldPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              {product.oldPrice.toLocaleString()} ₽
                            </div>
                          )}
                        </div>
                        <Button onClick={() => addToCart(product)} className="gap-2">
                          <Icon name="ShoppingCart" size={16} />
                          В корзину
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSection === 'catalog' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold">Каталог товаров</h2>
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList>
                {categories.map(cat => (
                  <TabsTrigger key={cat} value={cat}>
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div 
                    className="relative overflow-hidden cursor-pointer"
                    onClick={() => product.featured && navigate(`/product/${product.id}`)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.oldPrice && (
                      <Badge className="absolute top-4 right-4 bg-accent">
                        -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                      </Badge>
                    )}
                    {product.featured && (
                      <Badge className="absolute top-4 left-4 bg-primary">
                        ⭐ Хит
                      </Badge>
                    )}
                  </div>
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-2">
                      {product.category}
                    </Badge>
                    <h3 
                      className="font-semibold text-lg mb-2 cursor-pointer hover:text-primary transition-colors"
                      onClick={() => product.featured && navigate(`/product/${product.id}`)}
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-primary">{product.price.toLocaleString()} ₽</div>
                        {product.oldPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            {product.oldPrice.toLocaleString()} ₽
                          </div>
                        )}
                      </div>
                      <Button onClick={() => addToCart(product)} className="gap-2">
                        <Icon name="ShoppingCart" size={16} />
                        В корзину
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'reviews' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold">Отзывы покупателей</h2>
            {[
              { name: 'Александр Б.', date: '23 марта 2026', text: 'Красивая ворона', stars: 5 },
              { name: 'Марина С.', date: '22 марта 2026', text: 'Оригинальный светильник! Купила в подарок человеку, который коллекционирует ворон и воронов. Тщательно проработано оперенье, блестит! Надеюсь, оценит!', stars: 5 },
              { name: 'Сергей Е.', date: '18 марта 2026', text: 'супер', stars: 5 },
              { name: 'Анастасия Ш.', date: '11 марта 2026', text: 'Прекрасный светильник)) Сначала правда загрустила, что он лёгкий, но потом разглядела, что он очень красивый. Брала на подарок, поэтому не могу приложить фото — не распаковывала полностью. Жаль, что лампочки в комплекте нет, вот это минус для меня.', stars: 5 },
              { name: 'Моногарова О.', date: '8 марта 2026', text: 'Очень красивый светильник', stars: 5 },
              { name: 'Вера Я.', date: '2 марта 2026', text: 'Очень классный светильник — необычный, стильный. Однозначно рекомендую к покупке!', stars: 5 },
              { name: 'Анна П.', date: '21 февраля 2026', text: 'Красивый светильник, клювик и коготки целые 👍. Упакован был хорошо пупыркой и в коробке. Хотелось бы чтобы ещё побольше был сделан. Лампы в комплекте нет.', stars: 5 },
              { name: 'Пользователь', date: '21 февраля 2026', text: 'Офигенный ворон! Напечатан на 3д принтере пластиком, видны слои печати вблизи, но его это не портит. Детализация хорошая. Блестит, как настоящий) Смотрится здорово 🔥', stars: 5 },
              { name: 'Марина П.', date: '13 февраля 2026', text: 'Любимчик❣️ Очень красивый, как живой 😍👍', stars: 5 },
              { name: 'Елена Т.', date: '12 февраля 2026', text: 'Отличный за свою цену. Отдельно спасибо за упаковку )))', stars: 5 },
              { name: 'Екатерина Д.', date: '13 января 2026', text: 'Хороший светильник, пока не подключали, жду ремонт.', stars: 5 },
              { name: 'Юлия', date: '4 января 2026', text: 'Отличный настенный светильник, всё работает.', stars: 5 },
              { name: 'Ирина С.', date: '2 января 2026', text: 'Хороший светильник, пластик, лёгкий, светит ярко.', stars: 5 },
              { name: 'Гончар А.', date: '2 января 2026', text: 'Миниатюрный светильник, крепёж в комплекте, также продавец положил в подарок снежинку — большое спасибо!', stars: 5 },
              { name: 'Роман', date: '27 декабря 2025', text: 'Отличный светильник, да ещё и за такую цену 👍 Купил для использования как ночник, надо было конечно брать два... Хорошо упакован. Доставили на следующий день. Понравилось то, что можно крепить в любом положении. Рекомендую 100%. Ну и новогодний бонус — снежинка, мелочь конечно, а приятно)', stars: 5 },
            ].map((review, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="User" size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold">{review.name}</h4>
                      <div className="flex">
                        {[...Array(review.stars)].map((_, j) => (
                          <Icon key={j} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{review.date}</p>
                    <p className="text-muted-foreground">{review.text}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeSection === 'delivery' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold">Доставка и оплата</h2>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="Package" size={28} className="text-primary" />
                <h3 className="text-xl font-semibold">Самовывоз со склада в Санкт-Петербурге</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Мы рады предложить нашим клиентам удобную услугу – самовывоз из нашего склада, расположенного в Санкт-Петербурге. Это отличная возможность получить ваш заказ оперативно и без лишних затрат на доставку. Наш склад находится по адресу: [Указать точный адрес склада]. Работаем для вас <strong>10:00–19:00</strong>. Перед приездом, пожалуйста, убедитесь, что ваш заказ готов к отгрузке, связавшись с нами по телефону [Указать номер телефона] или через форму на сайте. Мы всегда готовы помочь вам с погрузкой и ответить на все ваши вопросы.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="Truck" size={28} className="text-primary" />
                <h3 className="text-xl font-semibold">Доставка по Санкт-Петербургу</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Если самовывоз вам не подходит, мы предлагаем быструю и надежную доставку вашего заказа по всему Санкт-Петербургу. Наши курьеры доставят товар прямо до двери в удобное для вас время. Стоимость доставки по городу составляет <strong>1 000 ₽</strong> вне зависимости от района. При заказе на сумму свыше <strong>50 000 ₽</strong> доставка по Санкт-Петербургу осуществляется бесплатно. Мы стремимся к тому, чтобы ваш заказ был у вас как можно скорее.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="MapPin" size={28} className="text-primary" />
                <h3 className="text-xl font-semibold">Доставка по Ленинградской области</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Мы также осуществляем доставку заказов по всей Ленинградской области. Стоимость и сроки доставки рассчитываются индивидуально в зависимости от удалённости вашего населённого пункта. Для уточнения стоимости и времени доставки, пожалуйста, свяжитесь с нашими менеджерами по телефону <strong>8 921 636-36-08</strong> или оставьте заявку на сайте. Мы постараемся сделать процесс доставки максимально удобным для вас.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="Globe" size={28} className="text-primary" />
                <h3 className="text-xl font-semibold">Доставка по России</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Для клиентов из других регионов России мы предлагаем надёжную доставку с помощью проверенных транспортных компаний. Мы работаем с ведущими перевозчиками, такими как СДЭК, Деловые Линии, ПЭК. Стоимость и сроки доставки по России зависят от выбранной вами транспортной компании, веса и габаритов груза, а также удалённости вашего города. Мы поможем вам подобрать оптимальный вариант и рассчитаем предварительную стоимость доставки. После отправки заказа мы предоставим вам трек-номер для отслеживания его местонахождения.
              </p>
            </Card>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold">О магазине</h2>
            <Card className="p-8 space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                «Полимер-проект» — российская компания, основанная в 2024 году в Санкт-Петербурге, специализирующаяся на производстве уникальных декоративных светильников. Мы объединяем современные технологии и художественный замысел, чтобы создавать осветительные приборы, которые станут сердцем любого интерьера, добавляя ему индивидуальности и стиля. Наша миссия — привнести свет и красоту в каждый дом, основываясь на качестве, инновациях и глубоком понимании тенденций в дизайне.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                С момента основания мы сосредоточились на разработке и производстве светильников из высококачественных полимерных материалов. Этот выбор не случаен: полимеры позволяют нам воплощать самые смелые дизайнерские идеи, предлагая широкий спектр форм, текстур и цветов. От элегантных минималистичных моделей до изысканных арт-объектов — каждый светильник «Полимер-проект» является результатом кропотливой работы наших инженеров и дизайнеров.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Мы гордимся тем, что производство полностью локализовано в Санкт-Петербурге. Это позволяет нам контролировать каждый этап создания продукции, гарантируя высочайшее качество и соблюдение экологических стандартов. Наша команда — это профессионалы, увлечённые своим делом, которые вкладывают душу и опыт в каждый светильник, делая его по-настоящему особенным.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                «Полимер-проект» предлагает решения как для частных интерьеров, так и для коммерческих пространств — от уютных гостиных и спален до стильных кафе, ресторанов и офисов. Мы уверены, что наши светильники способны преобразить любое помещение, создавая уникальную атмосферу и подчёркивая ваш безупречный вкус. Приглашаем вас открыть для себя мир света и дизайна вместе с «Полимер-проект».
              </p>
            </Card>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold">Контакты</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" size={24} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Адрес</h4>
                    <p className="text-muted-foreground">г. Санкт-Петербург</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Phone" size={24} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Телефон</h4>
                    <p className="text-muted-foreground">8 921 636-36-08</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Mail" size={24} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-muted-foreground">proekt-polimer@mail.ru</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Напишите нам</h3>
                <form className="space-y-4">
                  <Input placeholder="Ваше имя" />
                  <Input type="email" placeholder="Email" />
                  <Input placeholder="Тема сообщения" />
                  <Button className="w-full">Отправить</Button>
                </form>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'profile' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold">Личный кабинет</h2>
            <Card className="p-8 text-center">
              <Icon name="User" size={64} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Авторизация</h3>
              <p className="text-muted-foreground mb-6">
                Войдите в личный кабинет для просмотра заказов и управления профилем
              </p>
              <div className="max-w-sm mx-auto space-y-4">
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Пароль" />
                <Button className="w-full">Войти</Button>
              </div>
            </Card>
          </div>
        )}
      </main>

      <footer className="bg-muted/50 mt-20 py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">ShopHub</h3>
              <p className="text-sm text-muted-foreground">
                Ваш надёжный интернет-магазин электроники
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>О компании</li>
                <li>Доставка</li>
                <li>Оплата</li>
                <li>Гарантия</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Помощь</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Контакты</li>
                <li>FAQ</li>
                <li>Возврат</li>
                <li>Отзывы</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>+7 (800) 123-45-67</li>
                <li>info@shophub.ru</li>
                <li>Ежедневно 9:00 - 21:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 ShopHub. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;