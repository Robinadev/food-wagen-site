import React, { useState, useEffect } from 'react';
import { FeaturedMeal } from '../types/food';
import { HeroSection } from '../components/sections/HeroSection';
import { FeaturedMeals } from '../components/sections/FeaturedMeals';
import { FoodModal } from '../components/ui/FoodModal';
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
  },
  {
    id: '5',
    name: 'Studio Potatoes',
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
  }
];

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-4">We're sorry, but something went wrong. Please try refreshing the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Safe API hook with error handling
const useSafeFoodData = () => {
  const [featuredMeals, setFeaturedMeals] = useState<FeaturedMeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch from API
        const meals = await foodApi.getFeaturedMeals();
        
        // Use API data if available, otherwise fallback
        if (meals && meals.length > 0) {
          setFeaturedMeals(meals);
        } else {
          setFeaturedMeals(fallbackFeaturedMeals);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load featured meals');
        // Use fallback data on error
        setFeaturedMeals(fallbackFeaturedMeals);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { featuredMeals, loading, error };
};

// Main Component with Error Handling
const HomePageContent: React.FC = () => {
  const { featuredMeals, loading, error } = useSafeFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [operationLoading, setOperationLoading] = useState(false);

  const handleAddFood = () => {
    try {
      setIsModalOpen(true);
    } catch (err) {
      console.error('Error opening modal:', err);
    }
  };

  const handleCloseModal = () => {
    try {
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error closing modal:', err);
    }
  };

  const handleMealClick = (meal: FeaturedMeal) => {
    try {
      alert(`You selected ${meal.name} from ${meal.restaurant} for $${meal.price}`);
    } catch (err) {
      console.error('Error handling meal click:', err);
    }
  };

  const handleSubmitFood = async (data: any) => {
    try {
      setOperationLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Food data submitted:', data);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error submitting food:', err);
      alert('Failed to add food item');
    } finally {
      setOperationLoading(false);
    }
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
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-yellow-800">{error} (Using demo data)</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Food Modal with error boundary */}
      {isModalOpen && (
        <FoodModal
          onClose={handleCloseModal}
          onSubmit={handleSubmitFood}
          isLoading={operationLoading}
        />
      )}

      <Footer />
    </div>
  );
};

// Main Export with Error Boundary
export default function HomePage() {
  return (
    <ErrorBoundary>
      <HomePageContent />
    </ErrorBoundary>
  );
}