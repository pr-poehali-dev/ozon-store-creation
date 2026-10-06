import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { reachGoal } from '@/lib/metrika';

const CONTACT_URL = 'https://functions.poehali.dev/56ebd5ee-9ada-403b-bd50-ef515efeeede';

interface LeadFormProps {
  subject: string;
  goal: string;
  withPhone?: boolean;
  withCompany?: boolean;
  withSubject?: boolean;
  messagePlaceholder?: string;
  submitLabel?: string;
}

const empty = { name: '', email: '', phone: '', company: '', subject: '', message: '' };

const LeadForm = ({
  subject,
  goal,
  withPhone = false,
  withCompany = false,
  withSubject = false,
  messagePlaceholder = 'Сообщение',
  submitLabel = 'Отправить',
}: LeadFormProps) => {
  const [form, setForm] = useState(empty);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const set = (key: keyof typeof empty, value: string) => setForm(f => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setStatus('loading');
    try {
      const res = await fetch(CONTACT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, subject: form.subject || subject }),
      });
      if (!res.ok) throw new Error();
      reachGoal(goal);
      setStatus('success');
      setForm(empty);
      setConsent(false);
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
      <Input placeholder="Ваше имя *" value={form.name} onChange={e => set('name', e.target.value)} required />
      {withCompany && <Input placeholder="Организация (юрлицо / ИП)" value={form.company} onChange={e => set('company', e.target.value)} />}
      <Input type="email" placeholder="Email *" value={form.email} onChange={e => set('email', e.target.value)} required />
      {withPhone && <Input type="tel" placeholder="Телефон" value={form.phone} onChange={e => set('phone', e.target.value)} />}
      {withSubject && <Input placeholder="Тема сообщения" value={form.subject} onChange={e => set('subject', e.target.value)} />}
      <textarea
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[100px] resize-none"
        placeholder={messagePlaceholder}
        value={form.message}
        onChange={e => set('message', e.target.value)}
      />
      <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer">
        <input type="checkbox" className="mt-0.5 accent-primary" checked={consent} onChange={e => setConsent(e.target.checked)} required />
        <span>
          Я согласен на обработку персональных данных в соответствии с{' '}
          <Link to="/privacy" className="underline hover:text-foreground">политикой конфиденциальности</Link>
        </span>
      </label>
      {status === 'error' && <p className="text-sm text-red-500">Ошибка отправки. Попробуйте позже или напишите нам напрямую.</p>}
      <Button className="w-full" type="submit" disabled={status === 'loading' || !consent}>
        {status === 'loading' ? 'Отправка...' : submitLabel}
      </Button>
    </form>
  );
};

export default LeadForm;
