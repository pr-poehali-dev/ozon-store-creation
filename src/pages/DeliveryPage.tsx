import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const DeliveryPage = () => (
  <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
    <Helmet>
      <title>Доставка и оплата — Полимер-проект</title>
      <meta name="description" content="Доставка светильников по Санкт-Петербургу, Ленинградской области и всей России (СДЭК, Деловые Линии). Самовывоз со склада в СПб. Оплата онлайн или при получении." />
      <link rel="canonical" href="https://proekt-polimer.ru/delivery" />
    </Helmet>
    <h2 className="text-3xl font-bold">Доставка и оплата</h2>

    <Card className="p-6">
      <div className="flex items-center gap-3 mb-3">
        <Icon name="Package" size={28} className="text-primary" />
        <h3 className="text-xl font-semibold">Самовывоз со склада в Санкт-Петербурге</h3>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        Мы рады предложить нашим клиентам удобную услугу – самовывоз из нашего склада, расположенного в Санкт-Петербурге. Это отличная возможность получить ваш заказ оперативно и без лишних затрат на доставку. Работаем для вас <strong>10:00–19:00</strong>. Перед приездом, пожалуйста, убедитесь, что ваш заказ готов к отгрузке, связавшись с нами по телефону <strong>8 921 636-36-08</strong> или через форму на сайте.
      </p>
    </Card>

    <Card className="p-6">
      <div className="flex items-center gap-3 mb-3">
        <Icon name="Truck" size={28} className="text-primary" />
        <h3 className="text-xl font-semibold">Доставка по Санкт-Петербургу</h3>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        Если самовывоз вам не подходит, мы предлагаем быструю и надежную доставку вашего заказа по всему Санкт-Петербургу. Наши курьеры доставят товар прямо до двери в удобное для вас время. Стоимость доставки по городу составляет <strong>1 000 ₽</strong> вне зависимости от района. При заказе на сумму свыше <strong>50 000 ₽</strong> доставка по Санкт-Петербургу осуществляется бесплатно.
      </p>
    </Card>

    <Card className="p-6">
      <div className="flex items-center gap-3 mb-3">
        <Icon name="MapPin" size={28} className="text-primary" />
        <h3 className="text-xl font-semibold">Доставка по Ленинградской области</h3>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        Мы также осуществляем доставку заказов по всей Ленинградской области. Стоимость и сроки доставки рассчитываются индивидуально в зависимости от удалённости вашего населённого пункта. Для уточнения стоимости и времени доставки, пожалуйста, свяжитесь с нашими менеджерами по телефону <strong>8 921 636-36-08</strong> или оставьте заявку на сайте.
      </p>
    </Card>

    <Card className="p-6">
      <div className="flex items-center gap-3 mb-3">
        <Icon name="Globe" size={28} className="text-primary" />
        <h3 className="text-xl font-semibold">Доставка по России</h3>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        Для клиентов из других регионов России мы предлагаем надёжную доставку с помощью проверенных транспортных компаний. Мы работаем с ведущими перевозчиками, такими как СДЭК, Деловые Линии, ПЭК. Стоимость и сроки доставки по России зависят от выбранной вами транспортной компании, веса и габаритов груза, а также удалённости вашего города. После отправки заказа мы предоставим вам трек-номер для отслеживания.
      </p>
    </Card>
  </div>
);

export default DeliveryPage;