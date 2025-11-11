import React from 'react';

// Simple interface to avoid type issues
interface FoodModalProps {
  food?: any;
  onSubmit?: (data: any) => Promise<void>;
  onClose: () => void;
  isLoading?: boolean;
}

export const FoodModal: React.FC<FoodModalProps> = ({
  onClose,
  isLoading = false
}) => {
  return (
    <div 
      className="food-modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
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
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Body - Simple Form */}
        <div className="food-modal-body p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Food Name
              </label>
              <input
                type="text"
                placeholder="Enter food name"
                className="food-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                placeholder="Enter price"
                className="food-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={isLoading}
                className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 disabled:opacity-50 transition-colors"
              >
                {isLoading ? 'Adding...' : 'Add Food'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};