// components/SearchSection.tsx
import { useState } from 'react';

export default function SearchSection() {
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');

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

      <div className="search-box">
        <label htmlFor="food-search">What do you like to eat today?</label>
        <input
          type="text"
          id="food-search"
          className="search-input"
          placeholder="Search for meals..."
        />
      </div>

      <button className="search-btn">
        Find Meal
      </button>
    </div>
  );
}