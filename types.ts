export type ProductCategory = 'MUJER' | 'HOMBRE' | 'UNISEX';
export type ProductLine = 'normal' | 'nicho' | 'arabe' | 'selecta';

export interface Product {
  id: string;
  number: string;
  name: string;
  brand: string;
  category: ProductCategory;
  family: string;
  size: string;
  price: number;
  image: string;
  description: string;
  line: ProductLine;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
