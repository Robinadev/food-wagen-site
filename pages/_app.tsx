// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
        color: '#333',
        fontSize: '1.2rem',
        fontFamily: 'Inter, sans-serif'
      }}>
        Loading FoodWagen...
      </div>
    );
  }

  return <Component {...pageProps} />;
}