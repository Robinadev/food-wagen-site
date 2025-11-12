// pages/index.tsx
import { useState } from 'react';
import Layout from '../components/Layout';
import SearchSection from '../components/SearchSection';
import FeaturedMeals from '../components/FeaturedMeals';
import { featuredMeals } from '../data/meals';
import { Meal } from '../types';

export default function Home() {
  const [cart, setCart] = useState<Meal[]>([]);

  const handleAddToCart = (meal: Meal) => {
    setCart(prev => [...prev, meal]);
    // You can add toast notification here
    console.log('Added to cart:', meal.name);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>@alweny@ckun</span>
            </div>
            <h1>Are you starving?</h1>
            <p>Within a few clicks, find meals that are accessible near you</p>
          </div>
          
          <div className="hero-search">
            <SearchSection />
          </div>
        </div>
      </section>

      {/* Featured Meals Section */}
      <FeaturedMeals meals={featuredMeals} onAddToCart={handleAddToCart} />
    </Layout>
  );
}