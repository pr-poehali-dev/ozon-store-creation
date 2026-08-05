import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const AUTH_URL = 'https://functions.poehali.dev/d22d7436-8efc-41c5-a3de-633de1edd972';

interface User { id: number; name: string; email: string; }

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

  const logout = () => {
    localStorage.removeItem('pp_user');
    localStorage.removeItem('pp_token');
    setUser(null);
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
    <div className="max-w-md mx-auto space-y-6 animate-fade-in">
      <h2 className="text-3xl font-bold">Личный кабинет</h2>
      {user ? (
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