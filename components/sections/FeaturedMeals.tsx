import React from 'react';
import { FeaturedMeal } from '../../types/food';

interface FeaturedMealsProps {
  meals: FeaturedMeal[];
  onMealClick?: (meal: FeaturedMeal) => void;
  loading?: boolean;
}

export const FeaturedMeals: React.FC<FeaturedMealsProps> = ({ 
  meals, 
  onMealClick,
  loading = false 
}) => {
  if (loading) {
    return (
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
    );
  }

  return (
    <section className="food-featured-meals py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="food-section-title text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Featured Meals
        </h2>
        
        {meals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No featured meals available at the moment.</p>
            <p className="text-gray-400 text-sm mt-2">Add some delicious meals to get started!</p>
          </div>
        ) : (
          <div className="food-meals-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {meals.map((meal) => (
              <FeaturedMealCard 
                key={meal.id} 
                meal={meal} 
                onClick={onMealClick}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// Featured Meal Card Component
const FeaturedMealCard: React.FC<{ 
  meal: FeaturedMeal; 
  onClick?: (meal: FeaturedMeal) => void 
}> = ({ meal, onClick }) => {
  const handleClick = () => {
    onClick?.(meal);
  };

  // Generate star rating display
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`text-sm ${
              index < fullStars
                ? 'text-yellow-400'
                : index === fullStars && hasHalfStar
                ? 'text-yellow-400'
                : 'text-gray-300'
            }`}
          >
            {index < fullStars ? '★' : index === fullStars && hasHalfStar ? '★' : '☆'}
          </span>
        ))}
        <span className="food-rating-value text-sm font-medium text-gray-600 ml-1">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  return (
    <article 
      className="food-meal-card bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      onClick={handleClick}
      data-test-id="food-meal-card"
    >
      {/* Meal Image */}
      <div className="food-meal-image h-48 overflow-hidden relative">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/default-meal.png';
          }}
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
          <div className="food-meal-rating mb-2">
            {renderStars(meal.rating)}
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