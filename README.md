FoodWagen 🍕

A modern, responsive food delivery web application built with Next.js and TypeScript. Discover and order delicious meals from local restaurants with an intuitive user interface.
✨ Features
🎯 Core Functionality

    Meal Discovery - Browse featured meals with high-quality images

    Smart Search - Find meals by name with delivery/pickup options

    Responsive Design - Flawless experience across all devices

    Real-time UI - Smooth animations and interactive elements

🛠️ Technical Excellence

    TypeScript - Full type safety and better developer experience

    Next.js 13 - Latest React framework with optimized performance

    Modern CSS - CSS Grid, Flexbox, and custom properties

    Image Optimization - Automatic WebP/AVIF format serving

📱 User Experience

    Mobile-First - Designed for mobile users first

    Fast Loading - Optimized images and efficient code splitting

    Accessible - Proper ARIA labels and keyboard navigation

    Professional UI - Clean, modern interface matching Figma designs

🚀 Quick Start
Prerequisites

    Node.js 16.0 or higher

    npm or yarn

Installation & Running
bash

# Clone repository
git clone <repository-url>
cd foodwagen

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm start

Visit http://localhost:3000 to see the application.
🏗️ Project Structure
text

foodwagen/
├── components/          # Reusable React components
│   ├── Layout.tsx      # App layout wrapper
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── SearchSection.tsx # Delivery search
│   ├── FeaturedMeals.tsx # Meal grid
│   └── MealCard.tsx    # Individual meal component
├── pages/              # Next.js pages
│   ├── index.tsx       # Homepage
│   ├── menu.tsx        # Full menu page
│   ├── about.tsx       # About page
│   ├── contact.tsx     # Contact page
│   └── api/            # API routes
├── data/               # Static data
│   └── meals.ts        # Meal database
├── styles/             # Global styles
│   └── globals.css     # Main stylesheet
├── types/              # TypeScript definitions
│   └── index.ts        # Type interfaces
└── public/             # Static assets
    └── images/         # Image resources

🎨 Design System
Color Palette

    Primary: #FF7A00 (Orange)

    Secondary: #FFA857 (Light Orange)

    Text Dark: #333333

    Text Light: #666666

    Background: #F8F8F8

Typography

    Font Family: Inter, system fonts

    Weights: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

Components

    Meal Cards - Consistent card layout with image, price, rating

    Search Section - Toggle between delivery/pickup options

    Navigation - Fixed header with smooth scrolling

    Footer - Multi-column layout with company links

🔧 Configuration
Next.js Config
javascript

// next.config.js
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
}

TypeScript Config

Full TypeScript support with strict type checking and path aliases for clean imports.
📱 Responsive Breakpoints

    Mobile: 320px - 767px

    Tablet: 768px - 1199px

    Desktop: 1200px+

🚀 Deployment
Vercel (Recommended)
bash

npm i -g vercel
vercel

Other Platforms

    Netlify

    AWS Amplify

    Railway

    Any Node.js hosting service

🛠️ Development
Code Quality

    ESLint configuration included

    TypeScript strict mode enabled

    Consistent code formatting

Performance Optimizations

    Next.js Image component for automatic optimization

    Code splitting at page level

    Efficient re-rendering with proper state management

    CSS containment for better painting performance

🎯 Key Components Deep Dive
MealCard Component
tsx

// Features:
// - Image optimization with Next.js Image
// - Delivery time overlay
// - Rating display with star icons
// - Add to cart functionality
// - Hover animations

SearchSection Component
tsx

// Features:
// - Delivery/Pickup toggle
// - Form validation
// - Search input with proper labeling
// - Responsive layout

🔮 Future Enhancements
Planned Features

    User authentication & profiles

    Real payment integration

    Order tracking system

    Restaurant partner pages

    Advanced filtering (dietary, cuisine)

    Push notifications

    PWA capabilities

Technical Improvements

    Backend API integration

    Database for meal data

    Admin dashboard

    Analytics integration

    Performance monitoring

🤝 Contributing

    Fork the repository

    Create feature branch (git checkout -b feature/amazing-feature)

    Commit changes (git commit -m 'Add amazing feature')

    Push to branch (git push origin feature/amazing-feature)

    Open Pull Request

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
👥 Authors

    Rihobot Elias- Initial development

🙏 Acknowledgments

    Design inspiration from provided Figma mockups

    Meal images from Unsplash

    Icons from various open source libraries

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
