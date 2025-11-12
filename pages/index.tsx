import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FeaturedMeal } from '../types/food';
import { HeroSection } from '../components/sections/HeroSection';
import { FoodModal } from '../components/ui/FoodModal';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { foodApi } from '../lib/api';



// Custom Intersection Observer Hook
const useIntersectionObserver = (options?: IntersectionObserverInit) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<Element | null>(null);

  const callback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsIntersecting(entry.isIntersecting);
    if (entry.isIntersecting && !hasIntersected) {
      setHasIntersected(true);
    }
  }, [hasIntersected]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options,
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [callback, options]);

  return { elementRef, isIntersecting, hasIntersected };
};

// Lazy Load Hook using Intersection Observer
const useLazyLoad = (options?: IntersectionObserverInit) => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    ...options,
  });

  return { elementRef, isVisible: isIntersecting };
};

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
  },
  {
    id: '7',
    name: 'Spicy Chicken Bowl',
    price: 11.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    restaurant: 'Urban Kitchen'
  },
  {
    id: '8',
    name: 'Veggie Delight',
    price: 8.99,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    restaurant: 'Green Garden'
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

// Animated Section Component with Intersection Observer
const AnimatedSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'zoomIn';
}> = ({ children, className = '', animation = 'fadeIn' }) => {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  const getAnimationClass = () => {
    if (!hasIntersected) return 'opacity-0';
    
    switch (animation) {
      case 'fadeIn':
        return 'animate-fadeIn';
      case 'slideUp':
        return 'animate-slideUp';
      case 'zoomIn':
        return 'animate-zoomIn';
      default:
        return 'animate-fadeIn';
    }
  };

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  );
};

// Lazy Image Component
const LazyImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}> = ({ src, alt, className = '', fallbackSrc = '/api/placeholder/400/300' }) => {
  const { elementRef, isVisible } = useLazyLoad();
  const [imageSrc, setImageSrc] = useState(fallbackSrc);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setImageLoaded(true);
      };
      img.onerror = () => {
        setImageSrc(fallbackSrc);
        setImageLoaded(true);
      };
    }
  }, [src, isVisible, fallbackSrc]);

  return (
    <div ref={elementRef as React.RefObject<HTMLDivElement>} className={`relative ${className}`}>
      {!imageLoaded && isVisible && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="food-loading-spinner w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full"></div>
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onError={() => setImageSrc(fallbackSrc)}
      />
    </div>
  );
};

// Enhanced Meal Card with Intersection Observer
const MealCard: React.FC<{ 
  meal: FeaturedMeal; 
  onClick?: (meal: FeaturedMeal) => void;
  index: number;
}> = ({ meal, onClick, index }) => {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  const handleClick = () => {
    onClick?.(meal);
  };

  return (
    <article 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`food-meal-card bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-500 ${
        hasIntersected 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95'
      } hover:scale-105 hover:shadow-xl`}
      onClick={handleClick}
      data-test-id="food-meal-card"
      style={{
        transitionDelay: hasIntersected ? `${index * 100}ms` : '0ms'
      }}
    >
      {/* Meal Image with lazy loading */}
      <div className="food-meal-image h-48 overflow-hidden relative">
        <LazyImage
          src={meal.image}
          alt={meal.name}
          className="w-full h-full"
          fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgMTUwTDE1MCAxMDBMMjAwIDE1MEwyNTAgMTAwTDMwMCAxNTAiIHN0cm9rZT0iI0QxRDRENyIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxyZWN0IHg9IjE1MCIgeT0iMTIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjYwIiByeD0iOCIgZmlsbD0iI0Y5NzMxNiIgb3BhY2l0eT0iMC4xIi8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE1MCIgcj0iMTUiIGZpbGw9IiNGOTczMTYiIG9wYWNpdHk9IjAuMiIvPgo8Y2lyY2xlIGN4PSIyNTAiIGN5PSIxNTAiIHI9IjE1IiBmaWxsPSIjRjk3MzE2IiBvcGFjaXR5PSIwLjIiLz4KPC9zdmc+"
        />
        
        {/* Price Badge */}
        <div className="food-price-badge absolute top-3 right-3 bg-white bg-opacity-95 rounded-full px-3 py-1 shadow-md">
          <span className="food-meal-price text-orange-500 font-bold text-sm">
            ${meal.price.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Meal Content */}
      <div className="food-meal-content p-4">
        <div className="mb-3">
          <h3 className="food-meal-name text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
            {meal.name}
          </h3>
          
          {/* Rating */}
          <div className="food-meal-rating flex items-center mb-2">
            <div className="flex text-yellow-400">
              {'★'.repeat(Math.floor(meal.rating))}
              {'☆'.repeat(5 - Math.floor(meal.rating))}
            </div>
            <span className="food-rating-value ml-2 text-sm text-gray-600">
              ({meal.rating.toFixed(1)})
            </span>
          </div>

          {/* Restaurant */}
          <div className="food-restaurant-info flex items-center">
            <span className="food-restaurant-name text-sm text-gray-500 font-medium">
              {meal.restaurant}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button 
          className="food-order-btn w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          Order Now
        </button>
      </div>
    </article>
  );
};

// Enhanced FeaturedMeals Component
const EnhancedFeaturedMeals: React.FC<{
  meals: FeaturedMeal[];
  onMealClick?: (meal: FeaturedMeal) => void;
  loading?: boolean;
}> = ({ meals, onMealClick, loading = false }) => {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px'
  });

  if (loading) {
    return (
      <AnimatedSection animation="fadeIn">
        <section className="food-featured-meals py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="food-section-title text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              Featured Meals
            </h2>
            <div className="flex justify-center items-center py-12">
              <div className="food-loading-spinner w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-gray-600">Loading featured meals...</span>
            </div>
          </div>
        </section>
      </AnimatedSection>
    );
  }

  return (
    <section 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className="food-featured-meals py-16 px-4 bg-white"
    >
      <div className="container mx-auto max-w-6xl">
        <AnimatedSection animation="slideUp">
          <h2 className="food-section-title text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Featured Meals
          </h2>
        </AnimatedSection>
        
        {meals.length === 0 ? (
          <AnimatedSection animation="fadeIn">
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No featured meals available at the moment.</p>
              <p className="text-gray-400 text-sm mt-2">Add some delicious meals to get started!</p>
            </div>
          </AnimatedSection>
        ) : (
          <div className="food-meals-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {meals.map((meal, index) => (
              <MealCard 
                key={meal.id} 
                meal={meal} 
                onClick={onMealClick}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// Main Component with Error Handling
const HomePageContent: React.FC = () => {
  const { featuredMeals, loading, error } = useSafeFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [operationLoading, setOperationLoading] = useState(false);

  // Intersection Observer for header animation
  const { elementRef: headerRef, hasIntersected: headerVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '-100px'
  });

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
      <div ref={headerRef as React.RefObject<HTMLDivElement>}>
        <Header onAddFood={handleAddFood} cartItemsCount={0} />
      </div>
      
      <main className="flex-1">
        <AnimatedSection animation="zoomIn">
          <HeroSection />
        </AnimatedSection>
        
        <EnhancedFeaturedMeals 
          meals={featuredMeals} 
          onMealClick={handleMealClick}
          loading={loading}
        />

        {error && (
          <AnimatedSection animation="fadeIn">
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
          </AnimatedSection>
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

      <AnimatedSection animation="fadeIn">
        <Footer />
      </AnimatedSection>
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