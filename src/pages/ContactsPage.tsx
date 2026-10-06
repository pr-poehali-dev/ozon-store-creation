import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import LeadForm from '@/components/LeadForm';

const ContactsPage = () => (
  <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
    <Helmet>
      <title>Контакты — Полимер-проект</title>
      <meta name="description" content="Контакты магазина Полимер-проект. Адрес: г. Санкт-Петербург, Уральская ул., 19к9Ж, офис 409. Телефон: 8 921 636-36-08. Email: proekt-polimer@mail.ru. Форма обратной связи." />
      <link rel="canonical" href="https://proekt-polimer.ru/contacts" />
    </Helmet>
    <h2 className="text-2xl sm:text-3xl font-bold">Контакты</h2>
    <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
      <Card className="p-4 sm:p-6 space-y-4">
        <div className="flex items-start gap-3">
          <Icon name="MapPin" size={24} className="text-primary mt-1" />
          <div>
            <h4 className="font-semibold mb-1">Адрес</h4>
            <p className="text-muted-foreground">г. Санкт-Петербург, Уральская ул., 19к9Ж, офис 409</p>
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
        <div className="flex items-start gap-3">
          <Icon name="Clock" size={24} className="text-primary mt-1" />
          <div>
            <h4 className="font-semibold mb-1">Режим работы</h4>
            <p className="text-muted-foreground">Ежедневно с 10:00 до 19:00</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Icon name="Store" size={24} className="text-primary mt-1" />
          <div>
            <h4 className="font-semibold mb-2">Мы на маркетплейсах</h4>
            <div className="flex gap-2 flex-wrap">
              <a href="https://www.ozon.ru/seller/polimer-proekt/" target="_blank" rel="noopener noreferrer"><Button size="sm" variant="outline">Ozon</Button></a>
              <a href="https://www.avito.ru/profile/items/active/all?s=4" target="_blank" rel="noopener noreferrer"><Button size="sm" variant="outline">Авито</Button></a>
            </div>
          </div>
        </div>
      </Card>
      <Card className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">Напишите нам</h3>
        <LeadForm subject="Сообщение с сайта" goal="contact_form" withSubject messagePlaceholder="Сообщение" />
      </Card>
    </div>
    <Card className="p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-semibold mb-2">Мы на карте</h3>
      <p className="text-muted-foreground mb-3">г. Санкт-Петербург, Уральская ул., 19к9Ж, офис 409</p>
      <div className="aspect-video w-full rounded-lg overflow-hidden border">
        <iframe
          title="Карта: Санкт-Петербург, Уральская ул., 19к9Ж"
          src="https://yandex.ru/map-widget/v1/?text=%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3%2C%20%D0%A3%D1%80%D0%B0%D0%BB%D1%8C%D1%81%D0%BA%D0%B0%D1%8F%20%D1%83%D0%BB%D0%B8%D1%86%D0%B0%2C%2019%D0%BA9%D0%96&z=16"
          className="w-full h-full"
          loading="lazy"
        />
      </div>
    </Card>
  </div>
);

export default ContactsPage;