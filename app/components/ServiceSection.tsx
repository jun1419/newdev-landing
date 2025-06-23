"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: '웹 개발',
    desc: '반응형 웹사이트부터 복잡한 웹 애플리케이션까지 최신 기술로 구현합니다.',
    icon: 'web.png',
    type: 'brown',
  },
  {
    title: '앱 개발',
    desc: 'iOS와 Android를 지원하는 크로스플랫폼 모바일 앱을 개발합니다.',
    icon: 'app.png',
    type: 'blue',
  },
  {
    title: '풀스택 개발',
    desc: '프론트엔드부터 백엔드까지, 완전한 솔루션을 제공합니다.',
    icon: 'code.png',
    type: 'blue',
  },
  {
    title: '빠른 MVP',
    desc: '아이디어를 빠르게 검증할 수 있는 최소기능제품을 제작합니다.',
    icon: 'MVP.png',
    type: 'brown',
  },
];

const ServiceSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 스와이프 처리
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }
    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
    }
  };

  // 마운트되기 전에는 로딩 상태
  if (!mounted) {
    return (
      <section style={{
        display: 'flex',
        width: '100%',
        padding: '160px 20px 80px 20px',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
      }}>
        <div style={{ color: '#94A3B8', fontSize: '16px' }}>Loading...</div>
      </section>
    );
  }

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
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      style={{ 
        width: '100%', 
        background: 'transparent', 
        padding: isMobile ? '160px 0 80px 0' : '120px 0 80px 0', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}
    >
      {/* 헤더 */}
      <motion.div variants={itemVariants} style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 20, 
        marginBottom: 16,
        padding: isMobile ? '0 20px' : '0',
        textAlign: 'center' as const
      }}>
        <h2 style={{
          color: '#fff',
          fontFamily: '"Pretendard", sans-serif',
          fontWeight: 400,  
          lineHeight: '120%',
          letterSpacing: '-1.04px',
          margin: 0,
          fontSize: isMobile ? '32px' : '52px'
        }}>
          우리가 제공하는 <span style={{ color: '#3182ED' }}>서비스</span>
        </h2>
        <p style={{
          color: '#94A3B8',
          fontFamily: '"Pretendard", sans-serif',
          fontWeight: 400,
          margin: 0,
          lineHeight: '140%',
          letterSpacing: '-0.4px',
          fontSize: isMobile ? '16px' : '20px'
        }}>
          스타트업의 성장 단계에 맞는 맞춤형 개발 솔루션을 제공합니다.
        </p>
      </motion.div>

      {/* 서비스 카드들 */}
      <motion.div
        variants={containerVariants}
        style={{
          width: '100%',
          marginTop: isMobile ? 60 : 80,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: isMobile ? 0 : 24,
          maxWidth: isMobile ? '100%' : 800,
          overflow: isMobile ? 'hidden' : 'visible',
        }}
      >
        {/* 데스크톱: 2컬럼 레이아웃 */}
        {!isMobile && (
          <>
            {/* 왼쪽 컬럼 */}
            <motion.div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>
              {[services[0], services[1]].map((service) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: 'flex',
                    padding: '32px',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    borderRadius: 40,
                    border: '1px solid rgba(255, 255, 255, 0.10)',
                    boxShadow: '0 2px 24px 0 rgba(0,0,0,0.18)',
                    width: 380,
                    height: service.type === 'brown' ? 380 : 480,
                    background: service.type === 'brown' 
                      ? 'linear-gradient(180deg, #000 0%, #492318 100%)'
                      : 'linear-gradient(180deg, #000 0%, #1B2B48 100%)',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ color: '#fff', fontWeight: 600, fontFamily: '"Pretendard", sans-serif', fontSize: '24px' }}>
                        {service.title}
                      </div>
                      <div style={{ color: '#94A3B8', fontWeight: 400, fontFamily: '"Pretendard", sans-serif', fontSize: '16px' }}>
                        {service.desc}
                      </div>
                    </div>
                    <img src={service.icon} alt={service.title + ' 아이콘'} style={{ width: 80, height: 80, flexShrink: 0, aspectRatio: '1/1', alignSelf: 'flex-end' }} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* 오른쪽 컬럼 */}
            <motion.div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>
              {[services[2], services[3]].map((service) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: 'flex',
                    padding: '32px',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    borderRadius: 40,
                    border: '1px solid rgba(255, 255, 255, 0.10)',
                    boxShadow: '0 2px 24px 0 rgba(0,0,0,0.18)',
                    width: 380,
                    height: service.type === 'brown' ? 380 : 480,
                    background: service.type === 'brown' 
                      ? 'linear-gradient(180deg, #000 0%, #492318 100%)'
                      : 'linear-gradient(180deg, #000 0%, #1B2B48 100%)',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ color: '#fff', fontWeight: 600, fontFamily: '"Pretendard", sans-serif', fontSize: '24px' }}>
                        {service.title}
                      </div>
                      <div style={{ color: '#94A3B8', fontWeight: 400, fontFamily: '"Pretendard", sans-serif', fontSize: '16px' }}>
                        {service.desc}
                      </div>
                    </div>
                    <img src={service.icon} alt={service.title + ' 아이콘'} style={{ width: 80, height: 80, flexShrink: 0, aspectRatio: '1/1', alignSelf: 'flex-end' }} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        {/* 모바일: 캐러셀 */}
        {isMobile && (
          <div
            style={{
              display: 'flex',
              transform: `translateX(-${currentSlide * (280 + 20)}px)`,
              transition: 'transform 0.5s ease-out',
              gap: 20,
              paddingLeft: '20px',
              paddingRight: '20px',
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {services.map((service, index) => (
              <div
                key={service.title}
                style={{
                  display: 'flex',
                  padding: '24px',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  borderRadius: 32,
                  border: '1px solid rgba(255, 255, 255, 0.10)',
                  boxShadow: '0 2px 24px 0 rgba(0,0,0,0.18)',
                  width: '280px',
                  height: '360px',
                  minWidth: '280px',
                  flexShrink: 0,
                  background: service.type === 'brown' 
                    ? 'linear-gradient(180deg, #000 0%, #492318 100%)'
                    : 'linear-gradient(180deg, #000 0%, #1B2B48 100%)',
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between', 
                  height: '100%', 
                  width: '100%' 
                }}>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 12, 
                    alignItems: 'flex-start' 
                  }}>
                    <div style={{ 
                      color: '#fff', 
                      fontWeight: 600, 
                      fontFamily: '"Pretendard", sans-serif',
                      fontSize: '20px',
                      lineHeight: '130%'
                    }}>
                      {service.title}
                    </div>
                    <div style={{ 
                      color: '#94A3B8', 
                      fontWeight: 400, 
                      fontFamily: '"Pretendard", sans-serif',
                      fontSize: '14px',
                      lineHeight: '150%'
                    }}>
                      {service.desc}
                    </div>
                  </div>
                  <img 
                    src={service.icon} 
                    alt={service.title + ' 아이콘'} 
                    style={{ 
                      width: 70, 
                      height: 70, 
                      flexShrink: 0, 
                      aspectRatio: '1/1', 
                      alignSelf: 'flex-end' 
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.section>
  );
};

export default ServiceSection; 