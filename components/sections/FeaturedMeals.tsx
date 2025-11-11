import React from 'react';
import { Meal } from '../../types/food';

interface FeaturedMealsProps {
  meals: Meal[];
  onMealClick?: (meal: Meal) => void;
}

export const FeaturedMeals: React.FC<FeaturedMealsProps> = ({ meals, onMealClick }) => {
  return (
    <section className="food-featured-meals py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="food-section-title text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Featured Meals
        </h2>
        
        <div className="food-meals-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {meals.map((meal) => (
            <FeaturedMealCard 
              key={meal.id} 
              meal={meal} 
              onClick={onMealClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedMealCard: React.FC<{ meal: Meal; onClick?: (meal: Meal) => void }> = ({ 
  meal, 
  onClick 
}) => {
  return (
    <article 
      className="food-meal-card bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      onClick={() => onClick?.(meal)}
      data-test-id="food-meal-card"
    >
      {/* Meal Image */}
      <div className="food-meal-image h-48 overflow-hidden">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/default-meal-image.png';
          }}
        />
      </div>

      {/* Meal Content */}
      <div className="food-meal-content p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="food-meal-name text-lg font-semibold text-gray-900 line-clamp-1">
            {meal.name}
          </h3>
          <span className="food-meal-price text-lg font-bold text-orange-500 whitespace-nowrap ml-2">
            ${meal.price.toFixed(2)}
          </span>
        </div>

        {/* Rating and Restaurant */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="food-meal-rating flex items-center bg-gray-100 px-2 py-1 rounded-full">
              <span className="text-yellow-500 text-sm">★</span>
              <span className="food-rating-value text-sm font-medium text-gray-700 ml-1">
                {meal.rating.toFixed(1)}
              </span>
            </div>
            <span className="food-restaurant-name text-sm text-gray-500">
              {meal.restaurant}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};