// types/index.ts
export interface Meal {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  category: string;
  image: string;
  deliveryTime: string;
}

export interface OrderData {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  notes?: string;
}

export interface OrderItem {
  mealId: number;
  quantity: number;
  price: number;
  name: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  orderId?: string;
  error?: string;
}