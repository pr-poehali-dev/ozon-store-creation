import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { mockProducts, Product } from '@/data/products';

interface CatalogPageProps {
  onAddToCart: (product: Product) => void;
}

const YML_URL = 'https://functions.poehali.dev/56bb9d57-ff07-4bb0-ae99-1141ee4cf7ba';

const CatalogPage = ({ onAddToCart }: CatalogPageProps) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [ymlLoading, setYmlLoading] = useState(false);

  const categories = ['Все', ...Array.from(new Set(mockProducts.map(p => p.category)))];
  const filteredProducts = selectedCategory === 'Все'
    ? mockProducts
    : mockProducts.filter(p => p.category === selectedCategory);

  const downloadYml = async () => {
    setYmlLoading(true);
    try {
      const res = await fetch(YML_URL);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'polimer-project-catalog.xml';
      a.click();
      window.URL.revokeObjectURL(url);
    } finally {
      setYmlLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-3xl font-bold">Каталог товаров</h2>
        <Button variant="outline" onClick={downloadYml} disabled={ymlLoading} className="gap-2">
          <Icon name="Download" size={16} />
          {ymlLoading ? 'Генерация...' : 'Скачать YML (Яндекс)'}
        </Button>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList>
          {categories.map(cat => (
            <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
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
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                <span className="text-xs text-muted-foreground">Арт. {product.sku}</span>
              </div>
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
    </div>
  );
};

export default CatalogPage;