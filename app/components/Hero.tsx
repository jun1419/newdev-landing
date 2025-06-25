'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import HeroBackgroundSVG from './HeroBackgroundSVG'; // 동영상으로 교체

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // 동영상 재생 속도 조절
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // 50% 속도로 느리게 재생
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 동영상 진행률 업데이트
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress);
    }
  };
  
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
      {/* 동영상 백그라운드 */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => {
          // 동영상이 로드된 후에도 재생 속도 설정
          if (videoRef.current) {
            videoRef.current.playbackRate = 0.75;
          }
        }}
        onTimeUpdate={handleTimeUpdate}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
          opacity: 0.7, // 동영상 투명도 조절 (필요시 수정)
        }}
      >
        <source src="/mainhero-background.mp4" type="video/mp4" />
        <source src="/mainhero-background.webm" type="video/webm" />
        {/* 동영상을 지원하지 않는 브라우저를 위한 폴백 */}
        Your browser does not support the video tag.
      </video>
      
      {/* 동영상 위에 오버레이 (선택사항) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(15, 19, 27, 0.45)', // 어두운 오버레이
          zIndex: 1,
        }}
      />

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
        <motion.div variants={itemVariants} style={{ width: 180, marginBottom: 24 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="180" height="auto" viewBox="0 0 140 26" fill="none">
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
            fontWeight: 600,
            lineHeight: '130%',
            letterSpacing: '-1.36px',
            color: '#fff',
            margin: 0,
            padding: 0,
            textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          스타트업을 위한<br />
          <span
            style={{
              fontFamily: 'Pretendard',
              fontSize: isMobile ? '46px' : '68px',
             fontWeight: 600,
             lineHeight: '130%',
             letterSpacing: '-1.36px',
             color: '#fff',
             margin: 0,
             padding: 0,
             textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
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
            fontSize: isMobile ? '18px' : '40px',
            fontWeight: 300,
            letterSpacing: '-0.48px',
            lineHeight: '160%',
            textAlign: 'center',
            maxWidth: '600px',
            margin: 0,
          }}
        >
          기획부터 디자인, 개발까지<br />단순하고, 명확하게
        </motion.p>
        
        {/* 동영상 진행률 바 */}
        <motion.div
          variants={itemVariants}
          style={{
            marginTop: '60px',
            width: isMobile ? '90%' : '400px',
            maxWidth: '400px',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '2px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '1px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: `${videoProgress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #3182ED 0%, #64B5F6 100%)',
                borderRadius: '1px',
                transition: 'width 0.1s ease-out',
                boxShadow: '0 0 8px rgba(49, 130, 237, 0.5)',
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero; 