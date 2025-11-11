import React, { useState, useEffect } from 'react';
import { FeaturedMeal, FoodItem, CreateFoodData } from '../types/food';
import { HeroSection } from '../components/sections/HeroSection';
import { FeaturedMeals } from '../components/sections/FeaturedMeals';
import { FoodModal } from '../components/ui/FoodModal';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { foodApi } from '../lib/api';

// Fallback featured meals data in case API is empty
const fallbackFeaturedMeals: FeaturedMeal[] = [
  {
    id: '1',
    name: 'Bona Lumpom',
    price: 2.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop',
    restaurant: 'PKKA BANAN'
  },
  {
    id: '2',
    name: 'Izhmal Avocando P.',
    price: 5.99,
    rating: 4.0,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    restaurant: 'Eri Deleis'
  },
  {
    id: '3',
    name: 'Pascaleia CONTE',
    price: 3.99,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop',
    restaurant: 'Carpentra'
  },
  {
    id: '4',
    name: 'Country Studio',
    price: 12.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    restaurant: 'KFC'
  },
  {
    id: '5',
    name: 'Studio width Potatoes',
    price: 15.99,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop',
    restaurant: 'Games'
  },
  {
    id: '6',
    name: 'Indiana Spikgy Stamp',
    price: 9.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    restaurant: 'Studio Ormista'
  },
  {
    id: '7',
    name: 'Special Meal 7',
    price: 11.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop',
    restaurant: 'Fine Dining'
  },
  {
    id: '8',
    name: 'Special Meal 8',
    price: 8.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    restaurant: 'Gourmet Kitchen'
  }
];

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
      setFeaturedMeals(meals.length > 0 ? meals : fallbackFeaturedMeals);
      
      // Fetch all foods for management
      const foods = await foodApi.getFoods();
      setAllFoods(foods);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load data';
      setError(errorMessage);
      console.error('Error fetching data:', err);
      
      // Use fallback data on error
      setFeaturedMeals(fallbackFeaturedMeals);
    } finally {
      setLoading(false);
    }
  };

  // Search handler
  const handleSearch = async (query: string) => {
    setSearchTerm(query);
    try {
      setLoading(true);
      if (query.trim()) {
        const results = await foodApi.searchFoods(query);
        setAllFoods(results);
      } else {
        // If search is empty, fetch all foods
        const foods = await foodApi.getFoods();
        setAllFoods(foods);
      }
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
    alert(`You selected ${meal.name} from ${meal.restaurant} for $${meal.price}`);
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
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-800 font-medium">Error loading data</p>
              </div>
              <p className="text-red-700 mt-1">{error}</p>
              <button
                onClick={fetchData}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium text-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
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