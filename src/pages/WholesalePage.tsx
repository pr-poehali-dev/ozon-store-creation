import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import LeadForm from '@/components/LeadForm';

const CONDITIONS = [
  { icon: 'Percent', title: 'Индивидуальные оптовые цены', text: 'Цена зависит от модели и объёма партии. Индивидуальные условия для постоянных партнёров.' },
  { icon: 'ShoppingBag', title: 'Гибкие объёмы партий', text: 'Объём и скидку обсуждаем индивидуально — оставьте заявку, и мы пришлём коммерческое предложение.' },
  { icon: 'FileText', title: 'Работаем с юрлицами и ИП', text: 'Выставляем счёт, предоставляем закрывающие документы.' },
  { icon: 'Truck', title: 'Доставка по России', text: 'СДЭК, Деловые Линии, ПЭК. По Санкт-Петербургу бесплатно при заказе от 50 000 ₽.' },
];

const WholesalePage = () => (
  <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
    <Helmet>
      <title>Опт — оптовые закупки светильников от производителя — Полимер-проект</title>
      <meta name="description" content="Оптовые закупки декоративных светильников и сувениров от производителя из Санкт-Петербурга. Индивидуальные цены, работа с юрлицами и ИП, доставка по России. Оставьте заявку." />
      <link rel="canonical" href="https://proekt-polimer.ru/wholesale" />
    </Helmet>
    <div className="space-y-2">
      <h2 className="text-2xl sm:text-3xl font-bold">Оптовым покупателям</h2>
      <p className="text-muted-foreground">Магазинам декора, дизайн-студиям, event-агентствам и корпоративным заказчикам — светильники и сувениры напрямую от производителя, без посредников.</p>
    </div>
    <div className="grid sm:grid-cols-2 gap-4">
      {CONDITIONS.map(c => (
        <Card key={c.title} className="p-4 sm:p-6 flex gap-3">
          <Icon name={c.icon} size={24} className="text-primary mt-1 flex-shrink-0" fallback="CircleCheck" />
          <div>
            <h3 className="font-semibold mb-1">{c.title}</h3>
            <p className="text-sm text-muted-foreground">{c.text}</p>
          </div>
        </Card>
      ))}
    </div>
    <Card className="p-4 sm:p-8 max-w-2xl">
      <h3 className="text-xl font-semibold mb-4">Заявка на оптовую закупку</h3>
      <LeadForm
        subject="Оптовая заявка"
        goal="wholesale_request"
        withCompany
        withPhone
        messagePlaceholder="Какие модели и в каком количестве интересуют?"
        submitLabel="Отправить заявку"
      />
    </Card>
  </div>
);

export default WholesalePage;
