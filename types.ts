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

  // 🔥 NUEVO (no rompe nada, opcional)
  slug?: string; // para SEO (ej: equivalencia-baccarat-rouge)
  keywords?: string[]; // para búsquedas y futuro SEO interno
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
