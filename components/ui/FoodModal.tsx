import React from 'react';

// Define types locally to avoid import issues
interface FoodItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  restaurant: {
    name: string;
    logo: string;
    status: 'Open Now' | 'Closed';
  };
}

interface CreateFoodData {
  name: string;
  price: number;
  rating: number;
  image: string;
  restaurant_name: string;
  restaurant_logo: string;
  restaurant_status: 'Open Now' | 'Closed';
}

interface FoodModalProps {
  food?: FoodItem | null;
  onSubmit: (data: CreateFoodData) => Promise<void>;
  onClose: () => void;
  isLoading: boolean;
}

// Import FoodForm dynamically to avoid build issues
type FoodFormProps = {
  initialData?: FoodItem;
  onSubmit: (data: CreateFoodData) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
};

const FoodForm = React.lazy<React.ComponentType<FoodFormProps>>(() =>
  import('../forms/FoodForm').then((mod) => {
    // If the module has a default export, use it; otherwise fall back to named export 'FoodForm'
    const comp = (mod as any).default ?? (mod as any).FoodForm;
    return { default: comp } as any;
  })
);

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
          <React.Suspense fallback={<div>Loading form...</div>}>
            <FoodForm
              initialData={food || undefined}
              onSubmit={onSubmit}
              onCancel={onClose}
              isLoading={isLoading}
            />
          </React.Suspense>
        </div>
      </div>
    </div>
  );
};