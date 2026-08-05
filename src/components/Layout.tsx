import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

const MIN_ORDER = 25000;

const DELIVERY_OPTIONS = [
  { value: 'courier', label: 'Курьером по Санкт-Петербургу' },
  { value: 'sdek', label: 'СДЭК (по России)' },
  { value: 'pochta', label: 'Почта России' },
  { value: 'pickup', label: 'Самовывоз (СПб)' },
];

interface OrderForm {
  name: string;
  phone: string;
  email: string;
  delivery: string;
  address: string;
  comment: string;
}

const emptyForm: OrderForm = {
  name: '',
  phone: '',
  email: '',
  delivery: 'courier',
  address: '',
  comment: '',
};

const Layout = ({ children, cart, onUpdateQuantity, onRemoveFromCart }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [step, setStep] = useState<'cart' | 'order' | 'success'>('cart');
  const [form, setForm] = useState<OrderForm>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<OrderForm>>({});

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const canCheckout = totalPrice >= MIN_ORDER;

  const handleSheetOpenChange = (open: boolean) => {
    if (!open) {
      setTimeout(() => setStep('cart'), 300);
    }
  };

  const setField = (field: keyof OrderForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = (): boolean => {
    const e: Partial<OrderForm> = {};
    if (!form.name.trim()) e.name = 'Введите ФИО';
    if (!form.phone.trim()) e.phone = 'Введите телефон';
    if (!form.email.trim()) e.email = 'Введите email';
    if (form.delivery !== 'pickup' && !form.address.trim()) e.address = 'Введите адрес доставки';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmitOrder = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const savedUser = localStorage.getItem('pp_user');
      const userId = savedUser ? JSON.parse(savedUser).id : undefined;
      await fetch('https://functions.poehali.dev/c60042e7-22e3-4f58-9069-72d893a7ddb0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          total: totalPrice,
          items: cart.map(i => ({ name: i.name, price: i.price, quantity: i.quantity })),
          user_id: userId,
        }),
      });
      setStep('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayment = async () => {
    if (!validate()) return;
    setIsPaymentLoading(true);
    try {
      const res = await fetch('https://functions.poehali.dev/0ebaa028-3ef9-46ed-975b-fa5912f44f09', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalPrice,
          description: `Заказ: ${form.name}, ${form.phone}`,
          items: cart.map(i => ({ name: i.name, price: i.price, quantity: i.quantity })),
          customer: form,
        }),
      });
      const data = await res.json();
      if (data.confirmation_url) {
        window.location.href = data.confirmation_url;
      } else {
        alert(data.error || 'Не удалось создать платёж. Попробуйте ещё раз или выберите оплату при получении.');
      }
    } catch {
      alert('Ошибка соединения. Попробуйте ещё раз.');
    } finally {
      setIsPaymentLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
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

            <div className="flex items-center gap-1 sm:gap-2">
              <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
                <Icon name="User" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(v => !v)}>
                <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={20} />
              </Button>
              <Sheet onOpenChange={handleSheetOpenChange}>
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
                <SheetContent className="w-full sm:max-w-lg flex flex-col">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      {step === 'order' && (
                        <button onClick={() => setStep('cart')} className="text-muted-foreground hover:text-foreground">
                          <Icon name="ArrowLeft" size={18} />
                        </button>
                      )}
                      {step === 'cart' && 'Корзина'}
                      {step === 'order' && 'Оформление заказа'}
                      {step === 'success' && 'Заказ принят'}
                    </SheetTitle>
                  </SheetHeader>

                  {/* ШАГ 1: КОРЗИНА */}
                  {step === 'cart' && (
                    <div className="mt-6 flex flex-col flex-1 overflow-hidden">
                      {cart.length === 0 ? (
                        <div className="text-center py-12">
                          <Icon name="ShoppingBag" size={48} className="mx-auto mb-4 text-muted-foreground" />
                          <p className="text-muted-foreground">Корзина пуста</p>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                            {cart.map(item => (
                              <Card key={item.id} className="p-3">
                                <div className="flex gap-3">
                                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-sm leading-tight">{item.name}</h4>
                                    <p className="text-primary font-bold mt-1 text-sm">{item.price.toLocaleString()} ₽</p>
                                    <div className="flex items-center gap-2 mt-2">
                                      <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
                                        <Icon name="Minus" size={12} />
                                      </Button>
                                      <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
                                      <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                                        <Icon name="Plus" size={12} />
                                      </Button>
                                      <Button size="icon" variant="ghost" className="h-7 w-7 ml-auto text-destructive" onClick={() => onRemoveFromCart(item.id)}>
                                        <Icon name="Trash2" size={12} />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            ))}
                          </div>
                          <div className="border-t pt-4 mt-4 space-y-3">
                            <div className="flex justify-between text-lg font-bold">
                              <span>Итого:</span>
                              <span className="text-primary">{totalPrice.toLocaleString()} ₽</span>
                            </div>
                            {!canCheckout && (
                              <p className="text-sm text-red-500 text-center">
                                Минимальный заказ — 25 000 ₽. Ещё {(MIN_ORDER - totalPrice).toLocaleString()} ₽
                              </p>
                            )}
                            <Button
                              className="w-full"
                              size="lg"
                              disabled={!canCheckout}
                              onClick={() => setStep('order')}
                            >
                              Оформить заказ
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* ШАГ 2: ФОРМА ЗАКАЗА */}
                  {step === 'order' && (
                    <div className="mt-4 flex flex-col flex-1 overflow-hidden">
                      <div className="overflow-y-auto flex-1 pr-1 space-y-4">
                        <div className="space-y-1">
                          <Label htmlFor="name">ФИО *</Label>
                          <Input
                            id="name"
                            placeholder="Иванов Иван Иванович"
                            value={form.name}
                            onChange={e => setField('name', e.target.value)}
                            className={errors.name ? 'border-red-500' : ''}
                          />
                          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="phone">Телефон *</Label>
                          <Input
                            id="phone"
                            placeholder="+7 (900) 000-00-00"
                            value={form.phone}
                            onChange={e => setField('phone', e.target.value)}
                            className={errors.phone ? 'border-red-500' : ''}
                          />
                          {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="example@mail.ru"
                            value={form.email}
                            onChange={e => setField('email', e.target.value)}
                            className={errors.email ? 'border-red-500' : ''}
                          />
                          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label>Способ доставки *</Label>
                          <div className="space-y-2">
                            {DELIVERY_OPTIONS.map(opt => (
                              <label
                                key={opt.value}
                                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                                  form.delivery === opt.value
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border hover:bg-muted/50'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="delivery"
                                  value={opt.value}
                                  checked={form.delivery === opt.value}
                                  onChange={() => setField('delivery', opt.value)}
                                  className="accent-primary"
                                />
                                <span className="text-sm">{opt.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {form.delivery !== 'pickup' && (
                          <div className="space-y-1">
                            <Label htmlFor="address">Адрес доставки *</Label>
                            <Input
                              id="address"
                              placeholder="Город, улица, дом, квартира"
                              value={form.address}
                              onChange={e => setField('address', e.target.value)}
                              className={errors.address ? 'border-red-500' : ''}
                            />
                            {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
                          </div>
                        )}

                        <div className="space-y-1">
                          <Label htmlFor="comment">Комментарий к заказу</Label>
                          <Textarea
                            id="comment"
                            placeholder="Дополнительные пожелания..."
                            value={form.comment}
                            onChange={e => setField('comment', e.target.value)}
                            rows={3}
                          />
                        </div>

                        <div className="border rounded-lg p-3 bg-muted/30">
                          <div className="flex justify-between font-bold">
                            <span>Сумма заказа:</span>
                            <span className="text-primary">{totalPrice.toLocaleString()} ₽</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{cart.length} товар(ов)</p>
                        </div>
                      </div>

                      <div className="border-t pt-4 mt-4 space-y-2">
                        <Button
                          className="w-full"
                          size="lg"
                          onClick={handlePayment}
                          disabled={isPaymentLoading || isSubmitting}
                        >
                          {isPaymentLoading ? 'Перенаправление...' : 'Оплатить онлайн'}
                        </Button>
                        <Button
                          className="w-full"
                          size="lg"
                          variant="outline"
                          onClick={handleSubmitOrder}
                          disabled={isSubmitting || isPaymentLoading}
                        >
                          {isSubmitting ? 'Отправка...' : 'Оформить без оплаты'}
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                          При выборе «без оплаты» менеджер свяжется с вами для подтверждения
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ШАГ 3: УСПЕХ */}
                  {step === 'success' && (
                    <div className="mt-8 text-center py-8 space-y-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <Icon name="CheckCircle" size={32} className="text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold">Заказ оформлен!</h3>
                      <p className="text-muted-foreground text-sm">
                        Спасибо, {form.name.split(' ')[0]}! Мы свяжемся с вами по номеру {form.phone} для подтверждения заказа.
                      </p>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b shadow-sm z-40">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.path}
                onClick={() => { navigate(item.path); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      <main className="container mx-auto px-4 py-6 sm:py-8">
        {children}
      </main>

      <footer className="bg-muted/50 mt-12 sm:mt-20 py-8 sm:py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <h3 className="font-bold text-lg mb-3">Полимер-проект</h3>
              <p className="text-sm text-muted-foreground">Эксклюзивные декоративные светильники из Санкт-Петербурга</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Icon name="Phone" size={14} />8 921 636-36-08</li>
                <li className="flex items-center gap-2"><Icon name="Mail" size={14} />proekt-polimer@mail.ru</li>
                <li className="flex items-center gap-2"><Icon name="MapPin" size={14} />г. Санкт-Петербург, Уральская ул., 19к9Ж, офис 409</li>
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