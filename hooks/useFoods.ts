import { useState, useEffect, useCallback } from 'react';
import { FoodItem, CreateFoodData } from '../types/food';
import { foodApi } from '../lib/api';

export const useFoods = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchFoods = useCallback(async (search?: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await foodApi.getFoods(search);
      setFoods(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setFoods([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createFood = async (data: CreateFoodData): Promise<void> => {
    try {
      await foodApi.createFood(data);
      await fetchFoods(searchTerm); // Refresh the list
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create food');
    }
  };

  const updateFood = async (id: string, data: CreateFoodData): Promise<void> => {
    try {
      await foodApi.updateFood(id, data);
      await fetchFoods(searchTerm); // Refresh the list
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update food');
    }
  };

  const deleteFood = async (id: string): Promise<void> => {
    try {
      await foodApi.deleteFood(id);
      await fetchFoods(searchTerm); // Refresh the list
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete food');
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    fetchFoods(term);
  }, [fetchFoods]);

  return {
    foods,
    loading,
    error,
    searchTerm,
    actions: {
      fetchFoods,
      createFood,
      updateFood,
      deleteFood,
      handleSearch,
    },
  };
};