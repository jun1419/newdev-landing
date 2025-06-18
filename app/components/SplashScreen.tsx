'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

const LINE_HEIGHT = 66;
const DOT_SIZE = 20;

interface SplashScreenProps {
  onComplete?: () => void;
}

const DRWABLE_LINE_HEIGHT = LINE_HEIGHT * 2 + DOT_SIZE;

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isBlurActive, setIsBlurActive] = useState(false);
  const controls = useAnimation();
  const gradientControls = useAnimation();
  const [meteorVisible, setMeteorVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      controls.start(
        { y: DRWABLE_LINE_HEIGHT },
        {
          duration: 1.5,
          ease: 'easeInOut',
        }
      ).then(() => {
        setMeteorVisible(false);
        gradientControls.start({
          scale: [1, 6],
          opacity: [1, 1],
          filter: ['blur(0px)', 'blur(120px)']
        }, {
          duration: 1.2,
          ease: 'easeInOut',
          onComplete: () => {
            if (onComplete) onComplete();
          }
        });
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, [controls, gradientControls, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: -600,
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 60,
          width: '100vw',
          background: 'transparent',
        }}
      >
        {/* 로고 */}
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="140" height="26" viewBox="0 0 140 26" fill="none">
            <g clipPath="url(#clip0_38_687)">
              <path d="M140 0L131.029 25.118H125.503L116.533 0H121.628L128.266 18.9821H128.338L134.905 0H140Z" fill="white"/>
              <path d="M105.81 14.3532V20.8121H115.821V25.118H100.786V0H115.821V4.30595H105.81V10.0472H113.668V14.3532H105.81Z" fill="white"/>
              <path d="M96.127 22.7139L91.9645 25.118H76.5708V0H91.9645L96.127 2.40416V22.7139ZM81.5944 4.30595V20.8121H91.1033V4.30595H81.5944Z" fill="white"/>
              <path d="M74.0604 0L67.6732 25.118H62.2908L57.7695 8.14542H57.6978L53.1765 25.118H47.7941L41.4069 0H46.287L50.5212 17.2238H50.593L55.186 0H60.2813L64.8744 17.152H64.9461L69.1803 0H74.0604Z" fill="white"/>
              <path d="M30.3253 14.3532V20.8121H40.3366V25.118H25.3017V0H40.3366V4.30595H30.3253V10.0472H38.1836V14.3532H30.3253Z" fill="white"/>
              <path d="M5.02361 8.86308V25.118H0V0H4.70066L15.5373 16.255H15.6091V0H20.6327V25.118H15.932L5.09537 8.86308H5.02361Z" fill="white"/>
            </g>
            <defs>
              <clipPath id="clip0_38_687">
                <rect width="140" height="26" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        {/* 라인+원+라인 그룹 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', height: DRWABLE_LINE_HEIGHT }}>
          <div style={{ width: 2, height: '100%', background: '#FFF' }} />
          {meteorVisible && (
            <motion.div
              animate={controls}
              initial={{ y: 0 }}
              style={{
                width: DOT_SIZE,
                height: DOT_SIZE,
                borderRadius: '50%',
                background: '#FFF',
                boxShadow: '2px 2px 2px 0px rgba(0,0,0,0.25) inset',
                filter: 'drop-shadow(0 0 4px #FFF) drop-shadow(0 0 8px #FFF) drop-shadow(0 0 16px #FFF)',
                position: 'absolute',
                left: '50%',
                x: '-50%',
                top: 0,
                zIndex: 2,
              }}
            />
          )}
        </div>
        {/* 하단 큰 원: 두 레이어로 겹침 */}
        <div style={{ position: 'relative', width: 1000, height: 1000 }}>
          {/* 검정 원 (항상 고정) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 1000,
              height: 1000,
              borderRadius: 822,
              background: '#000 0%',
              boxShadow: '0px 8px 16px 0px rgba(255,255,255,0.16) inset',
              zIndex: 2,
            }}
          />
          {/* 폭발 애니메이션용 gradient 원 */}
          <motion.div
            animate={gradientControls}
            initial={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 1000,
              height: 1000,
              borderRadius: 822,
              background: 'radial-gradient(circle at center, #cccccc 20%, #000 60%, #000 80%, #000 100%)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SplashScreen; 