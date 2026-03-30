import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const CONTACT_URL = 'https://functions.poehali.dev/78de95d1-8bfd-474b-893c-af5d41aba571';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(CONTACT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
        <Icon name="CheckCircle" size={48} className="text-green-500" />
        <p className="font-semibold text-lg">Заявка отправлена!</p>
        <p className="text-muted-foreground text-sm">Мы свяжемся с вами в ближайшее время.</p>
        <Button variant="outline" onClick={() => setStatus('idle')}>Отправить ещё</Button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input placeholder="Ваше имя *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
      <Input type="email" placeholder="Email *" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
      <Input placeholder="Тема сообщения" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
      <textarea
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[100px] resize-none"
        placeholder="Сообщение"
        value={form.message}
        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
      />
      {status === 'error' && <p className="text-sm text-red-500">Ошибка отправки. Попробуйте позже или напишите нам напрямую.</p>}
      <Button className="w-full" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Отправка...' : 'Отправить'}
      </Button>
    </form>
  );
};

const ContactsPage = () => (
  <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
    <Helmet>
      <title>Контакты — Полимер-проект</title>
      <meta name="description" content="Контакты магазина Полимер-проект. Адрес: г. Санкт-Петербург. Телефон: 8 921 636-36-08. Email: proekt-polimer@mail.ru. Форма обратной связи." />
      <link rel="canonical" href="https://proekt-polimer.ru/contacts" />
    </Helmet>
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
        <ContactForm />
      </Card>
    </div>
  </div>
);

export default ContactsPage;