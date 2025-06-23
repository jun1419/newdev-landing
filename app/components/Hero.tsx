'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import HeroBackgroundSVG from './HeroBackgroundSVG';

const Hero = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: '#0F131B',
      }}
    >
      {/* SVG 백그라운드 */}
      <HeroBackgroundSVG />

      {/* 메인 콘텐츠 */}
      <motion.div
        variants={containerVariants}
        style={{
          maxWidth: 1200,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
          position: 'relative',
          zIndex: 2,
          padding: '120px 16px 80px 16px',
        }}
      >
        {/* 로고 SVG */}
        <motion.div variants={itemVariants} style={{ width: 158, marginBottom: 16 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="158" height="19" viewBox="0 0 140 26" fill="none">
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
        </motion.div>
        <motion.h1
          variants={itemVariants}
          style={{
            textAlign: 'center',
            fontFamily: 'Pretendard',
            fontSize: isMobile ? '46px' : '68px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '120%',
            letterSpacing: '-1.36px',
            color: '#A3A3A3',
            margin: 0,
            padding: 0,
          }}
        >
          스타트업을 위한<br />
          <span
            style={{
              fontWeight: 600,
              background: 'linear-gradient(180deg, #626262 0%, #FFF 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >
            웹&앱 개발팀
          </span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          style={{
            color: '#A3A3A3',
            fontFamily: 'Pretendard',
            fontSize: isMobile ? '19px' : '32px',
            fontWeight: 400,
            letterSpacing: '-0.48px',
            lineHeight: '150%',
            textAlign: 'center',
            maxWidth: '600px',
            margin: 0,
          }}
        >
          스타트업에게 필요한 단 하나의 팀<br />
          기획부터 디자인, 개발까지<br />단순하고, 명확하게
        </motion.p>
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '12px',
            marginTop: '44px',
            width: isMobile ? '100%' : 'auto',
            maxWidth: isMobile ? '320px' : 'none',
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/portfolio')}
            style={{
              padding: '11px 50.5px',
              borderRadius: '12px',
              background: '#3182ED',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '16px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'Pretendard',
              boxShadow: '0 2px 8px 0 rgba(49,130,237,0.15)',
            }}
          >
            포트폴리오 보기
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/contact')}
            style={{
              padding: '11px 44px',
              borderRadius: '12px',
              background: 'transparent',
              color: '#3182ED',
              border: '1.5px solid #3182ED',
              fontSize: '16px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'Pretendard',
              boxShadow: '0 2px 8px 0 rgba(49,130,237,0.10)',
            }}
          >
            프로젝트 문의하기
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero; 