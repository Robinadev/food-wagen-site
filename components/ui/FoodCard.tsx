import React from 'react';
import { FoodItem } from '../../types/food';

interface FoodCardProps {
  food: FoodItem;
  onEdit: (food: FoodItem) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export const FoodCard: React.FC<FoodCardProps> = ({ 
  food, 
  onEdit, 
  onDelete,
  isLoading = false 
}) => {
  const handleEdit = () => onEdit(food);
  const handleDelete = () => onDelete(food.id);

  return (
    <article 
      className="food-card group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-150 ease-out hover:shadow-lg hover:-translate-y-1"
      data-test-id="food-card"
      style={{ animation: 'slideUp 0.3s ease-out' }}
    >
      {/* Food Image */}
      <div className="food-image-container relative h-48 overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="food-image w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/default-food-image.png';
          }}
        />
      </div>

      {/* Food Content */}
      <div className="food-content p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="food-name text-xl font-semibold text-gray-900 truncate">
            {food.name}
          </h3>
          <span className="food-price text-lg font-bold text-green-600 whitespace-nowrap">
            ${food.price.toFixed(2)}
          </span>
        </div>

        {/* Rating */}
        <div className="food-rating flex items-center mb-3">
          <div className="flex text-yellow-400">
            {'★'.repeat(Math.floor(food.rating))}
            {'☆'.repeat(5 - Math.floor(food.rating))}
          </div>
          <span className="food-rating-value ml-2 text-sm text-gray-600">
            ({food.rating.toFixed(1)})
          </span>
        </div>

        {/* Restaurant Info */}
        <div className="restaurant-info flex items-center justify-between border-t pt-3">
          <div className="flex items-center space-x-2">
            <img
              src={food.restaurant.logo}
              alt={food.restaurant.name}
              className="restaurant-logo w-8 h-8 rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/default-restaurant-logo.png';
              }}
            />
            <span className="restaurant-name text-sm font-medium text-gray-700">
              {food.restaurant.name}
            </span>
          </div>
          <span 
            className={`restaurant-status px-2 py-1 rounded-full text-xs font-medium ${
              food.restaurant.status === 'Open Now' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}
          >
            {food.restaurant.status}
          </span>
        </div>

        {/* Actions */}
        <div className="food-actions flex space-x-2 mt-4">
          <button
            onClick={handleEdit}
            disabled={isLoading}
            className="food-edit-btn flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            data-test-id="food-edit-btn"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="food-delete-btn flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            data-test-id="food-delete-btn"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};