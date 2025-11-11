import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="food-footer bg-gray-900 text-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Company Section */}
          <div className="food-company-section">
            <h4 className="food-footer-title text-lg font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about">
                  <span className="food-footer-link text-gray-400 hover:text-white transition-colors cursor-pointer">
                    About us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/team">
                  <span className="food-footer-link text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Team
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  <span className="food-footer-link text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Careers
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <span className="food-footer-link text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Blog
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="food-contact-section">
            <h4 className="food-footer-title text-lg font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/support">
                  <span className="food-footer-link text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Help & Support
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/partner">
                  <span className="food-footer-link text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Partner with us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/ride">
                  <span className="food-footer-link text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Ride with us
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="food-legal-section">
            <h4 className="food-footer-title text-lg font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/terms">
                  <span className="food-footer-link text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Terms & Conditions
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/refund">
                  <span className="food-footer-link text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Refund & Cancellation
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <span className="food-footer-link text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/cookies">
                  <span className="food-footer-link text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Cookie Policy
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="food-social-section">
            <h4 className="food-footer-title text-lg font-semibold mb-4 text-white">FOLLOW US</h4>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                className="food-social-link text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                className="food-social-link text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                className="food-social-link text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.24 14.815 3.75 13.664 3.75 12.367s.49-2.448 1.376-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.886.875 1.376 2.026 1.376 3.323s-.49 2.448-1.376 3.323c-.875.808-2.026 1.297-3.323 1.297z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="food-footer-bottom border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="food-copyright text-gray-400 text-sm mb-4 md:mb-0">
            All rights Reserved © Your Company, {currentYear}
          </div>
          <div className="food-credits text-gray-400 text-sm flex items-center">
            Made with <span className="text-red-500 mx-1">❤️</span> by Thameswagen
          </div>
        </div>
      </div>
    </footer>
  );
};