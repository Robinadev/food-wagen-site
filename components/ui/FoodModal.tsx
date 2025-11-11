import React from 'react';
import { FoodItem, CreateFoodData } from '../../types/food';  // Fixed import
import { FoodForm } from '../forms/FoodForm';  // Fixed import path

interface FoodModalProps {
  food?: FoodItem | null;  // Fixed typo
  onSubmit: (data: CreateFoodData) => Promise<void>;
  onClose: () => void;
  isLoading: boolean;
}

export const FoodModal: React.FC<FoodModalProps> = ({
  food,
  onSubmit,
  onClose,
  isLoading
}) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleFormSubmit = async (data: CreateFoodData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error in modal:', error);
    }
  };

  return (
    <div 
      className="food-modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="food-modal bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="food-modal-header border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="food-modal-title text-xl font-bold text-gray-900">
              {food ? 'Edit Food Item' : 'Add New Food Item'}
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

        {/* Modal Body */}
        <div className="food-modal-body p-6">
          <FoodForm
            initialData={food || undefined}
            onSubmit={handleFormSubmit}
            onCancel={onClose}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};