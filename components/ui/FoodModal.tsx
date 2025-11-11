import React, { useState } from 'react';

interface FoodModalProps {
  food?: any;
  onSubmit?: (data: any) => Promise<void>;
  onClose: () => void;
  isLoading?: boolean;
}

export const FoodModal: React.FC<FoodModalProps> = ({
  onClose,
  onSubmit,
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    rating: '',
    image: '',
    restaurant_name: '',
    restaurant_logo: '',
    restaurant_status: 'Open Now'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Food name is required';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (!formData.restaurant_name.trim()) newErrors.restaurant_name = 'Restaurant name is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && onSubmit) {
      try {
        await onSubmit({
          ...formData,
          price: parseFloat(formData.price),
          rating: parseFloat(formData.rating) || 0
        });
      } catch (error) {
        console.error('Error in modal form submission:', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div 
      className="food-modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="food-modal bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="food-modal-header border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="food-modal-title text-xl font-bold text-gray-900">
              Add Food Item
            </h2>
            <button
              onClick={onClose}
              className="food-modal-close-btn text-gray-400 hover:text-gray-600 transition-colors p-1"
              disabled={isLoading}
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="food-modal-body p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Food Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter food name"
                className="food-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={isLoading}
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                className="food-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={isLoading}
              />
              {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating (1-5)
              </label>
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleInputChange}
                placeholder="Enter rating"
                className="food-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL *
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="Enter image URL"
                className="food-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={isLoading}
              />
              {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Restaurant Name *
              </label>
              <input
                type="text"
                name="restaurant_name"
                value={formData.restaurant_name}
                onChange={handleInputChange}
                placeholder="Enter restaurant name"
                className="food-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={isLoading}
              />
              {errors.restaurant_name && <p className="text-red-600 text-sm mt-1">{errors.restaurant_name}</p>}
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors font-medium"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 disabled:opacity-50 transition-colors font-medium flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="food-loading mr-2"></div>
                    Adding...
                  </>
                ) : (
                  'Add Food'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};