import productsData from './products.json';

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

export const mockProducts: Product[] = productsData as Product[];
