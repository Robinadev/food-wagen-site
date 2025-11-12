// components/FeaturedMeals.tsx
import { Meal } from '../types';
import MealCard from './MealCard';

interface FeaturedMealsProps {
  meals: Meal[];
  onAddToCart: (meal: Meal) => void;
}

export default function FeaturedMeals({ meals, onAddToCart }: FeaturedMealsProps) {
  return (
    <section className="featured-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Meals</h2>
          <a href="/menu" className="view-all">View all →</a>
        </div>
        
        <div className="meals-grid">
          {meals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}