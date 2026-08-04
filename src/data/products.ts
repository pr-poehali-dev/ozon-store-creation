import ravenRight1 from '@/assets/products/raven-right-1.png';
import ravenWhite1 from '@/assets/products/raven-white-1.jpg';
import ravenTable1 from '@/assets/products/raven-table-1.jpg';
import ravenLeft1 from '@/assets/products/raven-left-1.jpg';
import owlBranch1 from '@/assets/products/owl-branch-1.jpg';
import owl1 from '@/assets/products/owl-1.jpg';
import moon1 from '@/assets/products/moon-1.jpg';
import ravenGeneric1 from '@/assets/products/raven-table-generic.jpg';
import ravenBlack1 from '@/assets/products/raven-black-1.png';
import mouseHanged1 from '@/assets/products/mouse-hanged-1.jpg';

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
    price: 850,
    image: ravenLeft1,
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
    price: 850,
    image: ravenRight1,
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
    price: 900,
    image: ravenWhite1,
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
    price: 1000,
    image: owlBranch1,
    category: 'Интерьер',
    rating: 5.0,
    reviews: 97,
    featured: true,
    description: 'Станет центральным элементом вашего интерьера. В детской — добрый ночной страж, в гостиной — произведёт неизгладимое впечатление на гостей, подчеркнув ваш утончённый вкус'
  },
  {
    id: 6,
    sku: '07020005',
    name: 'Настенный светильник "Сова с шаром"',
    price: 1100,
    image: owl1,
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
    price: 1300,
    image: moon1,
    category: 'Интерьер',
    rating: 5.0,
    reviews: 215,
    featured: true,
    description: 'Свет, который словно сошёл с ночного неба, принося с собой магию лунных ночей. Превратит ваше пространство в настоящее произведение искусства'
  },
  {
    id: 4,
    sku: '07020007',
    name: 'Настенный светильник "Голова ворона"',
    price: 450,
    image: ravenGeneric1,
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
    price: 900,
    image: ravenTable1,
    category: 'Интерьер',
    rating: 5.0,
    reviews: 412,
    featured: true,
    description: 'Выбор для тех, кто ценит оригинальность, стиль и внимание к деталям'
  },
  {
    id: 9,
    sku: '07020009',
    name: 'Настольный светильник "Ворон черный"',
    price: 900,
    image: ravenBlack1,
    category: 'Интерьер',
    rating: 5.0,
    reviews: 0,
    featured: true,
    description: 'Изящная скульптура чёрного ворона с лампой в клюве — произведение искусства для уюта вашего дома'
  },
  {
    id: 10,
    sku: '07020010',
    name: 'Фигурка в холодильник "Мышь повесилась"',
    price: 260,
    image: mouseHanged1,
    category: 'Юмор',
    rating: 5.0,
    reviews: 0,
    featured: true,
    description: 'Эксклюзивная фигурка с чёрным юмором для холодильника — станет звездой вашей кухни'
  }
];
