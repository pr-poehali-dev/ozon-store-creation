export interface Product {
  id: number;
  sku: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  featured?: boolean;
  description?: string;
}

export const mockProducts: Product[] = [
  {
    id: 8,
    sku: '07020001',
    name: 'Настенный светильник "Ворон настенный крепление с лево"',
    price: 680,
    image: 'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/2c365501-6595-4d4e-bad1-d09f29e73b87.PNG',
    category: 'Интерьер',
    rating: 5.0,
    reviews: 0,
    featured: true,
    description: 'Зеркальное исполнение настенного ворона с креплением с левой стороны — создайте симметричную пару или уникальную композицию в вашем интерьере'
  },
  {
    id: 1,
    sku: '07020002',
    name: 'Настенный светильник "Ворон настенный крепление с право"',
    price: 580,
    image: 'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/2c365501-6595-4d4e-bad1-d09f29e73b87.PNG',
    category: 'Интерьер',
    rating: 5.0,
    reviews: 347,
    featured: true,
    description: 'Предмет искусства, который не просто украшает пространство, но и пробуждает воображение, вдохновляет на размышления'
  },
  {
    id: 2,
    sku: '07020003',
    name: 'Настольный светильник "Ворон белый"',
    price: 630,
    image: 'https://cdn.poehali.dev/files/9c8c5d3b-f00d-47ad-b19e-51e059d79f85.JPG',
    category: 'Интерьер',
    rating: 5.0,
    reviews: 289,
    featured: true,
    description: 'Стильный акцент в вашем интерьере, приковывающий взгляды и вызывающий восхищение'
  },
  {
    id: 7,
    sku: '07020004',
    name: 'Настенный светильник "Сова на ветке"',
    price: 750,
    image: 'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/83c5fef9-775f-45cf-a2ca-6f871b38f789.JPG',
    category: 'Интерьер',
    rating: 5.0,
    reviews: 97,
    featured: true,
    description: 'Станет центральным элементом вашего интерьера. В детской — добрый ночной страж, в гостиной — произведёт неизгладимое впечатление на гостей, подчеркнув ваш утончённый вкус'
  },
  {
    id: 6,
    sku: '07020005',
    name: 'Настенный светильник "Сова"',
    price: 1000,
    image: 'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/8879c698-3282-47fe-86c7-bb9ff379fbfa.JPG',
    category: 'Интерьер',
    rating: 5.0,
    reviews: 183,
    featured: true,
    description: 'Добавьте в свою жизнь магию ночи и мудрость веков. Сова — древний символ мудрости, проницательности и защиты. Станет изюминкой вашего интерьера'
  },
  {
    id: 5,
    sku: '07020006',
    name: 'Настенный светильник "Луна"',
    price: 1100,
    image: 'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/3174a2b5-b1a4-4b3d-80e6-9f209257dc2d.JPG',
    category: 'Интерьер',
    rating: 5.0,
    reviews: 215,
    featured: true,
    description: 'Свет, который словно сошёл с ночного неба, принося с собой магию лунных ночей. Превратит ваше пространство в настоящее произведение искусства'
  },
  {
    id: 4,
    sku: '07020007',
    name: 'Настенный светильник "Ворон"',
    price: 350,
    image: 'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/8096bb65-5a8a-4934-94e2-e85171eafebb.png',
    category: 'Интерьер',
    rating: 5.0,
    reviews: 128,
    featured: true,
    description: 'Арт-объект, который привнесёт в ваш интерьер нотку готической элегантности и загадочности'
  },
  {
    id: 3,
    sku: '07020008',
    name: 'Настольный светильник "Ворон"',
    price: 630,
    image: 'https://cdn.poehali.dev/projects/c6e71b0f-7d20-4c00-9607-09b4ebf43fcc/bucket/ea900f25-f5e2-468e-9028-c75137470847.JPG',
    category: 'Интерьер',
    rating: 5.0,
    reviews: 412,
    featured: true,
    description: 'Выбор для тех, кто ценит оригинальность, стиль и внимание к деталям'
  }
];