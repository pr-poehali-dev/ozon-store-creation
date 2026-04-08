import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const reviews = [
  { name: 'Александр Б.', date: '23 марта 2026', text: 'Красивая ворона', stars: 5 },
  { name: 'Марина С.', date: '22 марта 2026', text: 'Оригинальный светильник! Купила в подарок человеку, который коллекционирует ворон и воронов. Тщательно проработано оперенье, блестит! Надеюсь, оценит!', stars: 5 },
  { name: 'Сергей Е.', date: '18 марта 2026', text: 'супер', stars: 5 },
  { name: 'Анастасия Ш.', date: '11 марта 2026', text: 'Прекрасный светильник)) Сначала правда загрустила, что он лёгкий, но потом разглядела, что он очень красивый. Брала на подарок, поэтому не могу приложить фото — не распаковывала полностью. Жаль, что лампочки в комплекте нет, вот это минус для меня.', stars: 5 },
  { name: 'Моногарова О.', date: '8 марта 2026', text: 'Очень красивый светильник', stars: 5 },
  { name: 'Вера Я.', date: '2 марта 2026', text: 'Очень классный светильник — необычный, стильный. Однозначно рекомендую к покупке!', stars: 5 },
  { name: 'Анна П.', date: '21 февраля 2026', text: 'Красивый светильник, клювик и коготки целые 👍. Упакован был хорошо пупыркой и в коробке. Хотелось бы чтобы ещё побольше был сделан. Лампы в комплекте нет.', stars: 5 },
  { name: 'Пользователь', date: '21 февраля 2026', text: 'Офигенный ворон! Напечатан на 3д принтере пластиком, видны слои печати вблизи, но его это не портит. Детализация хорошая. Блестит, как настоящий) Смотрится здорово 🔥', stars: 5 },
  { name: 'Марина П.', date: '13 февраля 2026', text: 'Любимчик❣️ Очень красивый, как живой 😍👍', stars: 5 },
  { name: 'Елена Т.', date: '12 февраля 2026', text: 'Отличный за свою цену. Отдельно спасибо за упаковку )))', stars: 5 },
  { name: 'Екатерина Д.', date: '13 января 2026', text: 'Хороший светильник, пока не подключали, жду ремонт.', stars: 5 },
  { name: 'Юлия', date: '4 января 2026', text: 'Отличный настенный светильник, всё работает.', stars: 5 },
  { name: 'Ирина С.', date: '2 января 2026', text: 'Хороший светильник, пластик, лёгкий, светит ярко.', stars: 5 },
  { name: 'Гончар А.', date: '2 января 2026', text: 'Миниатюрный светильник, крепёж в комплекте, также продавец положил в подарок снежинку — большое спасибо!', stars: 5 },
  { name: 'Роман', date: '27 декабря 2025', text: 'Отличный светильник, да ещё и за такую цену 👍 Купил для использования как ночник, надо было конечно брать два... Хорошо упакован. Доставили на следующий день. Понравилось то, что можно крепить в любом положении. Рекомендую 100%. Ну и новогодний бонус — снежинка, мелочь конечно, а приятно)', stars: 5 },
];

const ReviewsPage = () => (
  <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
    <Helmet>
      <title>Отзывы покупателей — Полимер-проект</title>
      <meta name="description" content="Отзывы покупателей о декоративных светильниках Полимер-проект. Более 15 отзывов с оценкой 5 звёзд. Ворон, сова, луна — уникальные светильники из Санкт-Петербурга." />
      <link rel="canonical" href="https://proekt-polimer.ru/reviews" />
    </Helmet>
    <h2 className="text-2xl sm:text-3xl font-bold">Отзывы покупателей</h2>
    {reviews.map((review, i) => (
      <Card key={i} className="p-4 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon name="User" size={20} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1 gap-2 flex-wrap">
              <h4 className="font-semibold">{review.name}</h4>
              <div className="flex">
                {[...Array(review.stars)].map((_, j) => (
                  <Icon key={j} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{review.date}</p>
            <p className="text-muted-foreground">{review.text}</p>
          </div>
        </div>
      </Card>
    ))}
  </div>
);

export default ReviewsPage;