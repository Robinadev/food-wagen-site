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
            <h1>Are you starving?</h1>
            <p>Within a few clicks, find meals that are accessible near you</p>
          </div>
          
          
           // In pages/index.tsx - update the hero image section
<div className="hero-image">
  <img 
    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop" 
    alt="Delicious Pizza"
    width={500}
    height={400}
  />
</div>
          <div className="container" style={{ marginTop: '40px' }}>
          <SearchSection />
        </div>
        </div>
      </section>

      {/* Featured Meals Section */}
      <FeaturedMeals meals={featuredMeals} onAddToCart={handleAddToCart} />
    </Layout>
  );
}