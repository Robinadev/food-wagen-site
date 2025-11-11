import React, { useState, useEffect } from 'react';
import { FeaturedMeal } from '../types/food';
import { HeroSection } from '../components/sections/HeroSection';
import { FeaturedMeals } from '../components/sections/FeaturedMeals';
import { FoodModal } from '../components/ui/FoodModal'; // This should work now
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { foodApi } from '../lib/api';

// Fallback data
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
  }
];

export default function HomePage() {
  const [featuredMeals, setFeaturedMeals] = useState<FeaturedMeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [operationLoading, setOperationLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const meals = await foodApi.getFeaturedMeals();
      setFeaturedMeals(meals.length > 0 ? meals : fallbackFeaturedMeals);
    } catch (err) {
      setError('Failed to load data');
      setFeaturedMeals(fallbackFeaturedMeals);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFood = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMealClick = (meal: FeaturedMeal) => {
    alert(`You selected ${meal.name} from ${meal.restaurant}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header onAddFood={handleAddFood} cartItemsCount={0} />
      
      <main className="flex-1">
        <HeroSection />
        <FeaturedMeals 
          meals={featuredMeals} 
          onMealClick={handleMealClick}
          loading={loading}
        />

        {error && (
          <div className="container mx-auto max-w-6xl px-4 py-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}
      </main>

      {/* Food Modal - Now it should work */}
      {isModalOpen && (
        <FoodModal
          onClose={handleCloseModal}
          isLoading={operationLoading}
        />
      )}

      <Footer />
    </div>
  );
}