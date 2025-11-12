// components/MealCard.tsx
import { Meal } from '../types';
import Image from 'next/image';

interface MealCardProps {
  meal: Meal;
  onAddToCart: (meal: Meal) => void;
}

export default function MealCard({ meal, onAddToCart }: MealCardProps) {
  return (
    <div className="meal-card">
      <div className="meal-image">
        <Image
          src={meal.image}
          alt={meal.name}
          width={280}
          height={200}
          style={{ objectFit: 'cover' }}
        />
        <div className="delivery-badge">
          {meal.deliveryTime}
        </div>
      </div>
      <div className="meal-content">
        <div className="meal-header">
          <div>
            <h3 className="meal-name">{meal.name}</h3>
            <div className="meal-rating">
              <span className="rating-star">★</span>
              <span>{meal.rating}</span>
              <span>({meal.reviewCount})</span>
            </div>
          </div>
          <div className="meal-price">${meal.price.toFixed(2)}</div>
        </div>
        <p className="meal-description">{meal.description}</p>
        <button 
          className="add-to-cart"
          onClick={() => onAddToCart(meal)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}