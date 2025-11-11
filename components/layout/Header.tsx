import React, { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  onAddFood?: () => void;
  cartItemsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ onAddFood, cartItemsCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="food-header bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="food-logo flex-shrink-0">
            <Link href="/">
              <span className="text-2xl font-bold text-orange-500 cursor-pointer hover:text-orange-600 transition-colors">
                FoodWagen
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="food-navigation hidden md:flex items-center space-x-8">
            <Link href="/">
              <span className="food-nav-link text-gray-700 hover:text-orange-500 font-medium transition-colors cursor-pointer">
                Home
              </span>
            </Link>
            <Link href="/menu">
              <span className="food-nav-link text-gray-700 hover:text-orange-500 font-medium transition-colors cursor-pointer">
                Menu
              </span>
            </Link>
            <Link href="/about">
              <span className="food-nav-link text-gray-700 hover:text-orange-500 font-medium transition-colors cursor-pointer">
                About
              </span>
            </Link>
            <Link href="/contact">
              <span className="food-nav-link text-gray-700 hover:text-orange-500 font-medium transition-colors cursor-pointer">
                Contact
              </span>
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="food-actions flex items-center space-x-4">
            
            {/* Add Food Button */}
            {onAddFood && (
              <button
                onClick={onAddFood}
                className="food-add-food-btn hidden md:flex bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                data-test-id="food-add-btn"
              >
                Add Food
              </button>
            )}

            {/* Cart Button */}
            <button className="food-cart-btn p-2 text-gray-600 hover:text-orange-500 relative transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21" />
              </svg>
              {cartItemsCount > 0 && (
                <span className="food-cart-count absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartItemsCount}
                </span>
              )}
            </button>
            
            {/* Profile Button */}
            <button className="food-profile-btn p-2 text-gray-600 hover:text-orange-500 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="food-mobile-menu-btn md:hidden p-2 text-gray-600 hover:text-orange-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="food-mobile-menu md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/">
                <span className="food-nav-link text-gray-700 hover:text-orange-500 font-medium transition-colors cursor-pointer block py-2">
                  Home
                </span>
              </Link>
              <Link href="/menu">
                <span className="food-nav-link text-gray-700 hover:text-orange-500 font-medium transition-colors cursor-pointer block py-2">
                  Menu
                </span>
              </Link>
              <Link href="/about">
                <span className="food-nav-link text-gray-700 hover:text-orange-500 font-medium transition-colors cursor-pointer block py-2">
                  About
                </span>
              </Link>
              <Link href="/contact">
                <span className="food-nav-link text-gray-700 hover:text-orange-500 font-medium transition-colors cursor-pointer block py-2">
                  Contact
                </span>
              </Link>
              {onAddFood && (
                <button
                  onClick={onAddFood}
                  className="food-add-food-btn bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium text-left"
                >
                  Add Food
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};