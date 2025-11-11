export interface Restaurant {
  name: string;
  logo: string;
  status: 'Open Now' | 'Closed';
}

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  restaurant: Restaurant;
}

export interface CreateFoodData {
  name: string;
  price: number;
  rating: number;
  image: string;
  restaurant_name: string;
  restaurant_logo: string;
  restaurant_status: 'Open Now' | 'Closed';
}

export interface FoodFormErrors {
  name?: string;
  rating?: string;
  image?: string;
  restaurant_name?: string;
  restaurant_logo?: string;
  restaurant_status?: string;
}