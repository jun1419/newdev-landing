'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import GNB from './components/GNB';
import Hero from './components/Hero';
import ServiceSection from './components/ServiceSection';
import ProcessSection from './components/ProcessSection';
import StatsSection from './components/StatsSection';
import Footer from './components/Footer';
import { getCookie, setCookie, removeCookie } from './utils/cookies';

const SPLASH_COOKIE_NAME = 'splash_shown';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4
    }
  }
};

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (window as Window & { resetSplash?: () => void }).resetSplash = () => {
      removeCookie(SPLASH_COOKIE_NAME);
      console.log('Splash cookie removed. Refresh to see splash again.');
    };

    const checkSplash = () => {
      const hasSeenSplash = getCookie(SPLASH_COOKIE_NAME);
      console.log('Has seen splash:', hasSeenSplash);
      
      if (hasSeenSplash === 'true') {
        setShowSplash(false);
      } else {
        setShowSplash(true);
      }
      setIsLoading(false);
    };

    setTimeout(checkSplash, 100);
  }, []);

  const handleSplashComplete = () => {
    console.log('Splash completed, setting cookie');
    setCookie(SPLASH_COOKIE_NAME, 'true', 365);
    setTimeout(() => setShowSplash(false), 500);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div style={{ color: '#94A3B8', fontSize: '16px' }}>Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SplashScreen onComplete={handleSplashComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <GNB />
            <Hero />
            <ServiceSection />
            <ProcessSection />
            <StatsSection />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
