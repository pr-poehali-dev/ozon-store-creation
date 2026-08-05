import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const AUTH_URL = 'https://functions.poehali.dev/d22d7436-8efc-41c5-a3de-633de1edd972';
const ORDERS_URL = 'https://functions.poehali.dev/c60042e7-22e3-4f58-9069-72d893a7ddb0';

interface User { id: number; name: string; email: string; }

interface OrderItem { name: string; price: number; quantity: number; }

interface Order {
  id: number;
  name: string;
  phone: string;
  email: string;
  delivery: string;
  address: string;
  comment: string;
  total: number;
  items: OrderItem[];
  status: string;
  created_at: string;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  new: { label: 'Новый', color: 'bg-blue-500' },
  processing: { label: 'В работе', color: 'bg-amber-500' },
  shipped: { label: 'Отправлен', color: 'bg-purple-500' },
  delivered: { label: 'Доставлен', color: 'bg-green-500' },
  cancelled: { label: 'Отменён', color: 'bg-red-500' },
};

const DELIVERY_LABELS: Record<string, string> = {
  courier: 'Курьер',
  sdek: 'СДЭК',
  pochta: 'Почта России',
  pickup: 'Самовывоз',
};

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('pp_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [regForm, setRegForm] = useState({ name: '', email: '', password: '' });
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setOrdersLoading(true);
    fetch(`${ORDERS_URL}?user_id=${user.id}&email=${encodeURIComponent(user.email)}`)
      .then(res => res.json())
      .then(data => setOrders(data.orders || []))
      .finally(() => setOrdersLoading(false));
  }, [user]);

  const logout = () => {
    localStorage.removeItem('pp_user');
    localStorage.removeItem('pp_token');
    setUser(null);
    setOrders([]);
  };

  const handleLogin = async () => {
    setAuthError('');
    setAuthLoading(true);
    const res = await fetch(AUTH_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'login', ...loginForm }) });
    const data = await res.json();
    setAuthLoading(false);
    if (!res.ok) { setAuthError(data.error || 'Ошибка входа'); return; }
    localStorage.setItem('pp_user', JSON.stringify(data.user));
    localStorage.setItem('pp_token', data.token);
    setUser(data.user);
  };

  const handleRegister = async () => {
    setAuthError('');
    setAuthLoading(true);
    const res = await fetch(AUTH_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'register', ...regForm }) });
    const data = await res.json();
    setAuthLoading(false);
    if (!res.ok) { setAuthError(data.error || 'Ошибка регистрации'); return; }
    localStorage.setItem('pp_user', JSON.stringify(data.user));
    localStorage.setItem('pp_token', data.token);
    setUser(data.user);
  };

  return (
    <div className={`mx-auto space-y-6 animate-fade-in ${user ? 'max-w-2xl' : 'max-w-md'}`}>
      <h2 className="text-3xl font-bold">Личный кабинет</h2>
      {user ? (
        <>
          <Card className="p-8 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="User" size={32} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={logout}>
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </Card>

          <div>
            <h3 className="text-xl font-semibold mb-4">История заказов</h3>
            {ordersLoading ? (
              <p className="text-muted-foreground text-center py-8">Загрузка...</p>
            ) : orders.length === 0 ? (
              <Card className="p-8 text-center">
                <Icon name="PackageSearch" size={40} className="mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">У вас пока нет заказов</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map(order => {
                  const status = STATUS_LABELS[order.status] || STATUS_LABELS.new;
                  return (
                    <Card key={order.id} className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <p className="font-semibold">Заказ №{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </p>
                        </div>
                        <Badge className={`${status.color} text-white`}>{status.label}</Badge>
                      </div>
                      <div className="space-y-1 mb-3">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                            <span>{(item.price * item.quantity).toLocaleString()} ₽</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t">
                        <span className="text-sm text-muted-foreground">{DELIVERY_LABELS[order.delivery] || order.delivery}</span>
                        <span className="font-bold text-lg">{order.total.toLocaleString()} ₽</span>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </>
      ) : (
        <Card className="p-6">
          <Tabs value={authTab} onValueChange={(v) => { setAuthTab(v as 'login' | 'register'); setAuthError(''); }}>
            <TabsList className="w-full mb-6">
              <TabsTrigger value="login" className="flex-1">Вход</TabsTrigger>
              <TabsTrigger value="register" className="flex-1">Регистрация</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <div className="space-y-4">
                <Input type="email" placeholder="Email" value={loginForm.email} onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))} />
                <Input type="password" placeholder="Пароль" value={loginForm.password} onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
                {authError && <p className="text-sm text-destructive">{authError}</p>}
                <Button className="w-full" onClick={handleLogin} disabled={authLoading}>
                  {authLoading ? 'Вход...' : 'Войти'}
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="register">
              <div className="space-y-4">
                <Input placeholder="Ваше имя" value={regForm.name} onChange={e => setRegForm(f => ({ ...f, name: e.target.value }))} />
                <Input type="email" placeholder="Email" value={regForm.email} onChange={e => setRegForm(f => ({ ...f, email: e.target.value }))} />
                <Input type="password" placeholder="Пароль (минимум 6 символов)" value={regForm.password} onChange={e => setRegForm(f => ({ ...f, password: e.target.value }))} onKeyDown={e => e.key === 'Enter' && handleRegister()} />
                {authError && <p className="text-sm text-destructive">{authError}</p>}
                <Button className="w-full" onClick={handleRegister} disabled={authLoading}>
                  {authLoading ? 'Регистрация...' : 'Создать аккаунт'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      )}
    </div>
  );
};

export default ProfilePage;