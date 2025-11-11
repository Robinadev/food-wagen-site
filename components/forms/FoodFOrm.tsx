import React, { useState, useEffect } from 'react';
import { CreateFoodData, FoodItem, FoodFormErrors } from '../../types/food';

interface FoodFormProps {
  initialData?: FoodItem;
  onSubmit: (data: CreateFoodData) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

export const FoodForm: React.FC<FoodFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading
}) => {
  const [formData, setFormData] = useState<CreateFoodData>({
    name: initialData?.name || '',
    price: initialData?.price || 0,
    rating: initialData?.rating || 0,
    image: initialData?.image || '',
    restaurant_name: initialData?.restaurant.name || '',
    restaurant_logo: initialData?.restaurant.logo || '',
    restaurant_status: initialData?.restaurant.status || 'Open Now'
  });

  const [errors, setErrors] = useState<FoodFormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FoodFormErrors = {};

    // Food Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Food Name is required';
    }

    // Rating validation
    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Food Rating must be between 1 and 5';
    }

    // Image URL validation
    if (!formData.image.trim()) {
      newErrors.image = 'Food Image URL is required';
    } else if (!isValidUrl(formData.image)) {
      newErrors.image = 'Please enter a valid image URL';
    }

    // Restaurant Name validation
    if (!formData.restaurant_name.trim()) {
      newErrors.restaurant_name = 'Restaurant Name is required';
    }

    // Restaurant Logo validation
    if (!formData.restaurant_logo.trim()) {
      newErrors.restaurant_logo = 'Restaurant Logo URL is required';
    } else if (!isValidUrl(formData.restaurant_logo)) {
      newErrors.restaurant_logo = 'Please enter a valid logo URL';
    }

    // Restaurant Status validation
    if (!['Open Now', 'Closed'].includes(formData.restaurant_status)) {
      newErrors.restaurant_status = 'Restaurant Status must be "Open Now" or "Closed"';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await onSubmit(formData);
        // Form reset happens in parent component after successful submission
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'rating' ? parseFloat(value) || 0 : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FoodFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="food-form space-y-4">
      {/* Food Name */}
      <div className="food-input-group">
        <label 
          htmlFor="food_name" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Food Name
        </label>
        <input
          type="text"
          id="food_name"
          name="food_name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter food name"
          className="food-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-describedby={errors.name ? "food-name-error" : undefined}
        />
        {errors.name && (
          <span 
            id="food-name-error" 
            className="error text-red-600 text-sm mt-1 block"
          >
            {errors.name}
          </span>
        )}
      </div>

      {/* Food Rating */}
      <div className="food-input-group">
        <label 
          htmlFor="food_rating" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Food Rating (1-5)
        </label>
        <input
          type="number"
          id="food_rating"
          name="food_rating"
          min="1"
          max="5"
          step="0.1"
          value={formData.rating}
          onChange={handleInputChange}
          placeholder="Enter food rating"
          className="food-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-describedby={errors.rating ? "food-rating-error" : undefined}
        />
        {errors.rating && (
          <span 
            id="food-rating-error" 
            className="error text-red-600 text-sm mt-1 block"
          >
            {errors.rating}
          </span>
        )}
      </div>

      {/* Submit & Cancel Buttons */}
      <div className="food-form-actions flex space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 disabled:opacity-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="small" />
              <span className="ml-2">
                {initialData ? 'Updating Food...' : 'Adding Food...'}
              </span>
            </>
          ) : (
            initialData ? 'Update Food' : 'Add Food'
          )}
        </button>
      </div>
    </form>
  );
};