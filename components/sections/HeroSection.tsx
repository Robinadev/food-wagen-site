import React, { useState } from 'react';

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="food-hero bg-gradient-to-r from-orange-50 to-red-50 py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="food-hero-title text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Are you starving?
          </h1>
          <p className="food-hero-subtitle text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Within a few clicks, find meals that are accessible near you
          </p>
        </div>

        {/* Delivery Type Toggle */}
        <div className="food-delivery-toggle flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-md flex">
            <button
              onClick={() => setDeliveryType('delivery')}
              className={`food-delivery-btn px-8 py-3 rounded-full font-medium transition-all ${
                deliveryType === 'delivery'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Delivery
            </button>
            <button
              onClick={() => setDeliveryType('pickup')}
              className={`food-pickup-btn px-8 py-3 rounded-full font-medium transition-all ${
                deliveryType === 'pickup'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Pickup
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="food-search-section max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-2 flex flex-col md:flex-row items-center">
            <div className="flex-1 mb-4 md:mb-0 md:mr-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What do you like to eat today?"
                className="food-search-input w-full px-6 py-4 text-lg border-0 focus:outline-none focus:ring-0"
              />
            </div>
            <button 
              onClick={handleSearch}
              className="food-find-meal-btn bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-orange-600 transition-colors w-full md:w-auto"
            >
              Find Meal
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};