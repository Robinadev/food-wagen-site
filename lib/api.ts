import axios from 'axios';
import { FoodItem, CreateFoodData } from '../types/food';

const API_BASE_URL = 'https://6852821e0594059b23cdd834.mockapi.io';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const foodApi = {
  async getFoods(search?: string): Promise<FoodItem[]> {
    try {
      const url = search ? `/Food?name=${encodeURIComponent(search)}` : '/Food';
      const response = await api.get<FoodItem[]>(url);
      
      // Handle missing restaurant data gracefully
      return response.data.map(item => ({
        ...item,
        restaurant: item.restaurant || {
          name: 'Unknown Restaurant',
          logo: '/default-restaurant-logo.png',
          status: 'Closed'
        }
      }));
    } catch (error) {
      console.error('Error fetching foods:', error);
      throw new Error('Failed to fetch food items');
    }
  },

  async createFood(data: CreateFoodData): Promise<FoodItem> {
    try {
      const response = await api.post<FoodItem>('/Food', data);
      return response.data;
    } catch (error) {
      console.error('Error creating food:', error);
      throw new Error('Failed to create food item');
    }
  },

  async updateFood(id: string, data: CreateFoodData): Promise<FoodItem> {
    try {
      const response = await api.put<FoodItem>(`/Food/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating food:', error);
      throw new Error('Failed to update food item');
    }
  },

  async deleteFood(id: string): Promise<void> {
    try {
      await api.delete(`/Food/${id}`);
    } catch (error) {
      console.error('Error deleting food:', error);
      throw new Error('Failed to delete food item');
    }
  },
};