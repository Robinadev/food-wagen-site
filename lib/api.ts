import axios from 'axios';
import { FoodItem, CreateFoodData, FeaturedMeal } from '../types/food';

const API_BASE_URL = 'https://6852821e0594059b23cdd834.mockapi.io';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    throw new Error(error.response?.data?.message || 'Network error occurred');
  }
);

export const foodApi = {
  /**
   * Get all food items with search functionality
   */
  async getFoods(search?: string): Promise<FoodItem[]> {
    try {
      const url = search ? `/Food?name=${encodeURIComponent(search)}` : '/Food';
      const response = await api.get<FoodItem[]>(url);
      
      return response.data.map(item => ({
        ...item,
        restaurant: item.restaurant || {
          name: 'Unknown Restaurant',
          logo: '/images/default-restaurant.png',
          status: 'Closed'
        }
      }));
    } catch (error) {
      console.error('Error fetching foods:', error);
      throw new Error('Failed to fetch food items');
    }
  },

  /**
   * Get featured meals for the homepage
   */
  async getFeaturedMeals(): Promise<FeaturedMeal[]> {
    try {
      const response = await api.get<FoodItem[]>('/Food');
      
      // Transform API data to featured meals format
      return response.data.slice(0, 8).map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        rating: item.rating,
        image: item.image,
        restaurant: item.restaurant?.name || 'Unknown Restaurant'
      }));
    } catch (error) {
      console.error('Error fetching featured meals:', error);
      throw new Error('Failed to fetch featured meals');
    }
  },

  /**
   * Create new food item
   */
  async createFood(data: CreateFoodData): Promise<FoodItem> {
    try {
      const response = await api.post<FoodItem>('/Food', {
        ...data,
        createdAt: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Error creating food:', error);
      throw new Error('Failed to create food item');
    }
  },

  /**
   * Update existing food item
   */
  async updateFood(id: string, data: CreateFoodData): Promise<FoodItem> {
    try {
      const response = await api.put<FoodItem>(`/Food/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating food:', error);
      throw new Error('Failed to update food item');
    }
  },

  /**
   * Delete food item
   */
  async deleteFood(id: string): Promise<void> {
    try {
      await api.delete(`/Food/${id}`);
    } catch (error) {
      console.error('Error deleting food:', error);
      throw new Error('Failed to delete food item');
    }
  },

  /**
   * Search foods by name
   */
  async searchFoods(query: string): Promise<FoodItem[]> {
    try {
      const response = await api.get<FoodItem[]>(`/Food?name=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching foods:', error);
      throw new Error('Failed to search food items');
    }
  }
};