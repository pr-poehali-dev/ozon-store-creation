import { useState } from 'react';
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
}

interface CartItem extends Product {
  quantity: number;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Беспроводные наушники Premium',
    price: 5990,
    oldPrice: 7990,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Электроника',
    rating: 4.8,
    reviews: 234
  },
  {
    id: 2,
    name: 'Умные часы Sport Pro',
    price: 12990,
    oldPrice: 15990,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Электроника',
    rating: 4.6,
    reviews: 189
  },
  {
    id: 3,
    name: 'Портативная колонка Bass Max',
    price: 3490,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    category: 'Аудио',
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    name: 'Игровая мышь RGB Pro',
    price: 2790,
    oldPrice: 3490,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
    category: 'Аксессуары',
    rating: 4.9,
    reviews: 312
  },
  {
    id: 5,
    name: 'Механическая клавиатура LED',
    price: 4990,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
    category: 'Аксессуары',
    rating: 4.5,
    reviews: 98
  },
  {
    id: 6,
    name: 'Веб-камера HD 1080p',
    price: 3290,
    oldPrice: 4290,
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500',
    category: 'Аксессуары',
    rating: 4.4,
    reviews: 67
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const categories = ['Все', 'Электроника', 'Аудио', 'Аксессуары'];

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
                ShopHub
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
                <h2 className="text-5xl font-bold mb-4">Скидки до 50%</h2>
                <p className="text-xl mb-8 text-white/90">На популярные товары электроники</p>
                <Button size="lg" variant="secondary" className="shadow-lg">
                  Смотреть предложения
                </Button>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20">
                <Icon name="Sparkles" size={200} className="absolute right-10 top-10" />
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Популярные товары</h2>
                <Button variant="ghost" onClick={() => setActiveSection('catalog')}>
                  Все товары <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProducts.slice(0, 6).map(product => (
                  <Card key={product.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 animate-scale-in">
                    <div className="relative overflow-hidden">
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
                    </div>
                    <div className="p-6">
                      <Badge variant="secondary" className="mb-2">
                        {product.category}
                      </Badge>
                      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
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
                  <div className="relative overflow-hidden">
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
                  </div>
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-2">
                      {product.category}
                    </Badge>
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
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
            {[1, 2, 3].map(i => (
              <Card key={i} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="User" size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Покупатель #{i}</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      Отличный магазин! Быстрая доставка, качественные товары, приятные цены. Рекомендую!
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeSection === 'delivery' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-3xl font-bold">Доставка и оплата</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <Icon name="Truck" size={32} className="text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Способы доставки</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Курьерская доставка по городу</li>
                  <li>• Пункты выдачи заказов</li>
                  <li>• Почта России</li>
                  <li>• Транспортные компании</li>
                </ul>
              </Card>
              <Card className="p-6">
                <Icon name="CreditCard" size={32} className="text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Способы оплаты</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Банковские карты</li>
                  <li>• Яндекс.Касса</li>
                  <li>• Сбербанк Онлайн</li>
                  <li>• Наличные при получении</li>
                </ul>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold">О магазине</h2>
            <Card className="p-8">
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                ShopHub — современный интернет-магазин электроники и аксессуаров. Мы предлагаем широкий ассортимент
                качественных товаров по доступным ценам.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Наша миссия — сделать покупки удобными и выгодными для каждого клиента. Работаем с проверенными
                поставщиками и гарантируем качество всех товаров.
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
                    <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 1</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Phone" size={24} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Телефон</h4>
                    <p className="text-muted-foreground">+7 (800) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Mail" size={24} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-muted-foreground">info@shophub.ru</p>
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
