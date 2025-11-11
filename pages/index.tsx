import React, { useState, useEffect } from 'react';
import { FeaturedMeal, FoodItem, CreateFoodData } from '../types/food';
import { HeroSection } from '../components/sections/HeroSection';
import { FeaturedMeals } from '../components/sections/FeaturedMeals';
import { FoodModal } from '../components/ui/FoodModal';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { foodApi } from '../lib/api';

export default function HomePage() {
  // State management
  const [featuredMeals, setFeaturedMeals] = useState<FeaturedMeal[]>([]);
  const [allFoods, setAllFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [operationLoading, setOperationLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch featured meals for homepage
      const meals = await foodApi.getFeaturedMeals();
      setFeaturedMeals(meals);
      
      // Fetch all foods for management
      const foods = await foodApi.getFoods();
      setAllFoods(foods);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load data';
      setError(errorMessage);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Search handler
  const handleSearch = async (query: string) => {
    setSearchTerm(query);
    try {
      setLoading(true);
      const results = await foodApi.searchFoods(query);
      setAllFoods(results);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Food management handlers
  const handleAddFood = () => {
    setEditingFood(null);
    setIsModalOpen(true);
  };

  const handleEditFood = (food: FoodItem) => {
    setEditingFood(food);
    setIsModalOpen(true);
  };

  const handleDeleteFood = async (id: string) => {
    if (confirm('Are you sure you want to delete this food item?')) {
      try {
        setOperationLoading(true);
        await foodApi.deleteFood(id);
        await fetchData(); // Refresh data
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to delete food';
        alert(errorMessage);
      } finally {
        setOperationLoading(false);
      }
    }
  };

  const handleSubmitFood = async (data: CreateFoodData) => {
    try {
      setOperationLoading(true);
      
      if (editingFood) {
        await foodApi.updateFood(editingFood.id, data);
      } else {
        await foodApi.createFood(data);
      }
      
      setIsModalOpen(false);
      setEditingFood(null);
      await fetchData(); // Refresh data after successful operation
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save food';
      alert(errorMessage);
      throw err; // Re-throw to let form handle it
    } finally {
      setOperationLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFood(null);
  };

  const handleMealClick = (meal: FeaturedMeal) => {
    console.log('Meal clicked:', meal);
    // In a real app, this would navigate to meal details or add to cart
    // For now, we'll show an alert
    alert(`You clicked on ${meal.name} from ${meal.restaurant}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header onAddFood={handleAddFood} cartItemsCount={0} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection onSearch={handleSearch} />
        
        {/* Featured Meals Section */}
        <FeaturedMeals 
          meals={featuredMeals} 
          onMealClick={handleMealClick}
          loading={loading}
        />

        {/* Error Display */}
        {error && (
          <div className="container mx-auto max-w-6xl px-4 py-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
              <button
                onClick={fetchData}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Food Management Section (Optional - can be on separate page) */}
        {/* {allFoods.length > 0 && (
          <div className="container mx-auto max-w-6xl px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Manage Food Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allFoods.map(food => (
                <div key={food.id} className="border rounded-lg p-4">
                  <h3 className="font-semibold">{food.name}</h3>
                  <p>${food.price}</p>
                  <button 
                    onClick={() => handleEditFood(food)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteFood(food.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )} */}
      </main>

      {/* Food Management Modal */}
      {isModalOpen && (
        <FoodModal
          food={editingFood}
          onSubmit={handleSubmitFood}
          onClose={handleCloseModal}
          isLoading={operationLoading}
        />
      )}

      <Footer />
    </div>
  );
}