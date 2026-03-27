import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { Product } from '@/data/products';

interface CartItem extends Product {
  quantity: number;
}

interface LayoutProps {
  children: React.ReactNode;
  cart: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveFromCart: (id: number) => void;
}

const NAV_ITEMS = [
  { path: '/', label: 'Главная' },
  { path: '/catalog', label: 'Каталог' },
  { path: '/reviews', label: 'Отзывы' },
  { path: '/delivery', label: 'Доставка' },
  { path: '/about', label: 'О магазине' },
  { path: '/contacts', label: 'Контакты' },
];

const Layout = ({ children, cart, onUpdateQuantity, onRemoveFromCart }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Lightbulb" size={18} className="text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Полимер-проект</span>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
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
                                    <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
                                      <Icon name="Minus" size={14} />
                                    </Button>
                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                    <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                                      <Icon name="Plus" size={14} />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 ml-auto text-destructive" onClick={() => onRemoveFromCart(item.id)}>
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
                          <Button className="w-full" size="lg">Оформить заказ</Button>
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
        {children}
      </main>

      <footer className="bg-muted/50 mt-20 py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-3">Полимер-проект</h3>
              <p className="text-sm text-muted-foreground">Эксклюзивные декоративные светильники из Санкт-Петербурга</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Icon name="Phone" size={14} />8 921 636-36-08</li>
                <li className="flex items-center gap-2"><Icon name="Mail" size={14} />proekt-polimer@mail.ru</li>
                <li className="flex items-center gap-2"><Icon name="MapPin" size={14} />г. Санкт-Петербург</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Навигация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {NAV_ITEMS.slice(1).map(item => (
                  <li key={item.path} className="cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate(item.path)}>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t pt-6 text-center text-sm text-muted-foreground">
            © 2026 Полимер-проект. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
