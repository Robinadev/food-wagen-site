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

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        price: initialData.price,
        rating: initialData.rating,
        image: initialData.image,
        restaurant_name: initialData.restaurant.name,
        restaurant_logo: initialData.restaurant.logo,
        restaurant_status: initialData.restaurant.status
      });
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: FoodFormErrors = {};

    // Food Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Food Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Food Name must be at least 2 characters';
    }

    // Price validation
    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
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
    } else if (formData.restaurant_name.trim().length < 2) {
      newErrors.restaurant_name = 'Restaurant Name must be at least 2 characters';
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
        // Reset form after successful submission if it's a new item
        if (!initialData) {
          setFormData({
            name: '',
            price: 0,
            rating: 0,
            image: '',
            restaurant_name: '',
            restaurant_logo: '',
            restaurant_status: 'Open Now'
          });
        }
      } catch (error) {
        // Error is handled by the parent component
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
          Food Name *
        </label>
        <input
          type="text"
          id="food_name"
          name="food_name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter food name"
          className="food-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          aria-describedby={errors.name ? "food-name-error" : undefined}
          disabled={isLoading}
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

      {/* Food Price */}
      <div className="food-input-group">
        <label 
          htmlFor="food_price" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Food Price ($) *
        </label>
        <input
          type="number"
          id="food_price"
          name="food_price"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Enter food price"
          className="food-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          aria-describedby={errors.price ? "food-price-error" : undefined}
          disabled={isLoading}
        />
        {errors.price && (
          <span 
            id="food-price-error" 
            className="error text-red-600 text-sm mt-1 block"
          >
            {errors.price}
          </span>
        )}
      </div>

      {/* Food Rating */}
      <div className="food-input-group">
        <label 
          htmlFor="food_rating" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Food Rating (1-5) *
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
          className="food-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          aria-describedby={errors.rating ? "food-rating-error" : undefined}
          disabled={isLoading}
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

      {/* Food Image URL */}
      <div className="food-input-group">
        <label 
          htmlFor="food_image" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Food Image URL *
        </label>
        <input
          type="url"
          id="food_image"
          name="food_image"
          value={formData.image}
          onChange={handleInputChange}
          placeholder="Enter food image URL"
          className="food-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          aria-describedby={errors.image ? "food-image-error" : undefined}
          disabled={isLoading}
        />
        {errors.image && (
          <span 
            id="food-image-error" 
            className="error text-red-600 text-sm mt-1 block"
          >
            {errors.image}
          </span>
        )}
      </div>

      {/* Restaurant Name */}
      <div className="food-input-group">
        <label 
          htmlFor="restaurant_name" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Restaurant Name *
        </label>
        <input
          type="text"
          id="restaurant_name"
          name="restaurant_name"
          value={formData.restaurant_name}
          onChange={handleInputChange}
          placeholder="Enter restaurant name"
          className="food-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          aria-describedby={errors.restaurant_name ? "restaurant-name-error" : undefined}
          disabled={isLoading}
        />
        {errors.restaurant_name && (
          <span 
            id="restaurant-name-error" 
            className="error text-red-600 text-sm mt-1 block"
          >
            {errors.restaurant_name}
          </span>
        )}
      </div>

      {/* Restaurant Logo URL */}
      <div className="food-input-group">
        <label 
          htmlFor="restaurant_logo" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Restaurant Logo URL *
        </label>
        <input
          type="url"
          id="restaurant_logo"
          name="restaurant_logo"
          value={formData.restaurant_logo}
          onChange={handleInputChange}
          placeholder="Enter restaurant logo URL"
          className="food-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          aria-describedby={errors.restaurant_logo ? "restaurant-logo-error" : undefined}
          disabled={isLoading}
        />
        {errors.restaurant_logo && (
          <span 
            id="restaurant-logo-error" 
            className="error text-red-600 text-sm mt-1 block"
          >
            {errors.restaurant_logo}
          </span>
        )}
      </div>

      {/* Restaurant Status */}
      <div className="food-input-group">
        <label 
          htmlFor="restaurant_status" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Restaurant Status *
        </label>
        <select
          id="restaurant_status"
          name="restaurant_status"
          value={formData.restaurant_status}
          onChange={handleInputChange}
          className="food-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          aria-describedby={errors.restaurant_status ? "restaurant-status-error" : undefined}
          disabled={isLoading}
        >
          <option value="Open Now">Open Now</option>
          <option value="Closed">Closed</option>
        </select>
        {errors.restaurant_status && (
          <span 
            id="restaurant-status-error" 
            className="error text-red-600 text-sm mt-1 block"
          >
            {errors.restaurant_status}
          </span>
        )}
      </div>

      {/* Form Actions */}
      <div className="food-form-actions flex space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 disabled:opacity-50 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="food-loading-spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              <span>
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