
export interface Product {
  id: string;
  number: string;
  name: string;
  brand: string;
  category: 'MUJER' | 'HOMBRE';
  family: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
