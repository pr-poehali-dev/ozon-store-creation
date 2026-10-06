import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import reviewsData from '@/data/reviews.json';

const reviews = reviewsData as { name: string; date: string; text: string; stars: number }[];

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