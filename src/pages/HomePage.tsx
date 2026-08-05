import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { mockProducts, Product } from '@/data/products';

interface HomePageProps {
  onAddToCart: (product: Product) => void;
}

const HomePage = ({ onAddToCart }: HomePageProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12 animate-fade-in">
      <Helmet>
        <title>Полимер-проект — декоративные светильники из Санкт-Петербурга</title>
        <meta name="description" content="Декоративные светильники из полимерных материалов — ворон, сова, луна. Уникальный дизайн, производство в Санкт-Петербурге. Оптовые цены от 260₽. Доставка по всей России." />
        <link rel="canonical" href="https://proekt-polimer.ru/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Полимер-проект",
          "url": "https://proekt-polimer.ru",
          "logo": "https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/files/7b978b85-30d5-4d9b-8834-d2cb5f648179.jpg",
          "description": "Производитель декоративных светильников из полимерных материалов. Уникальный дизайн, доставка по всей России.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Санкт-Петербург",
            "addressCountry": "RU"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+7-921-636-36-08",
            "contactType": "customer service",
            "availableLanguage": "Russian"
          },
          "sameAs": []
        })}</script>
      </Helmet>
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary via-secondary to-accent p-6 sm:p-12 text-white">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">Оптовые цены от 260₽</h2>
          <Button size="lg" variant="secondary" className="shadow-lg" onClick={() => navigate('/catalog')}>
            Смотреть каталог
          </Button>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 hidden sm:block">
          <Icon name="Lightbulb" size={200} className="absolute right-10 top-10" />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Наши товары</h2>
          <Button variant="outline" onClick={() => navigate('/catalog')}>
            Все товары
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.slice(0, 6).map(product => (
            <Card key={product.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 animate-scale-in">
              <div
                className="relative overflow-hidden cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.featured && (
                  <Badge className="absolute top-4 left-4 bg-primary">⭐ Хит</Badge>
                )}
              </div>
              <div className="p-6">
                <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                <h3
                  className="font-semibold text-lg mb-2 cursor-pointer hover:text-primary transition-colors"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">{product.price.toLocaleString()} ₽</div>
                  <Button onClick={() => onAddToCart(product)} className="gap-2">
                    <Icon name="ShoppingCart" size={16} />
                    В корзину
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;