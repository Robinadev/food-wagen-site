export interface Meal {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  restaurant: string;
  category?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  logo: string;
  status: 'Open Now' | 'Closed';
  deliveryTime?: string;
}

export interface CreateMealData {
  name: string;
  price: number;
  rating: number;
  image: string;
  restaurant_name: string;
  restaurant_logo: string;
  restaurant_status: 'Open Now' | 'Closed';
}