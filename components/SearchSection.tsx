// components/SearchSection.tsx
import { useState } from 'react';

export default function SearchSection() {
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="search-section">
      <div className="delivery-toggle">
        <button
          className={`toggle-btn ${deliveryType === 'delivery' ? 'active' : ''}`}
          onClick={() => setDeliveryType('delivery')}
        >
          Delivery
        </button>
        <button
          className={`toggle-btn ${deliveryType === 'pickup' ? 'active' : ''}`}
          onClick={() => setDeliveryType('pickup')}
        >
          Pickup
        </button>
      </div>

      <form onSubmit={handleSearch}>
        <div className="search-box">
          <label htmlFor="food-search">What do you like to eat today?</label>
          <input
            type="text"
            id="food-search"
            className="search-input"
            placeholder="Search for meals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button type="submit" className="search-btn">
          Find Meal
        </button>
      </form>
    </div>
  );
}