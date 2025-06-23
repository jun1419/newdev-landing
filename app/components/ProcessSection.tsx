"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: '기획',
    desc: '아이디어를 구체화하고 사용자 니즈를 분석하여 명확한 요구사항을 정의합니다.',
  },
  {
    num: '02',
    title: '디자인',
    desc: '사용자 경험을 고려한 직관적이고 매력적인 UI/UX 디자인을 제작합니다.',
  },
  {
    num: '03',
    title: '개발',
    desc: '최신 기술 스택을 활용하여 안정적이고 확장 가능한 솔루션을 개발합니다.',
  },
  {
    num: '04',
    title: '런칭',
    desc: '철저한 테스트를 거쳐 성공적인 서비스 런칭과 지속적인 운영을 지원합니다.',
  },
];

const ProcessSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 마운트되기 전에는 로딩 상태
  if (!mounted) {
    return (
      <section style={{
        display: 'flex',
        width: '100%',
        padding: '140px 20px',
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
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const circleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      style={{
        display: 'flex',
        width: '100%',
        padding: isMobile ? '120px 20px' : '140px 92px',
        flexDirection: 'column',
        alignItems: 'center',
        gap: isMobile ? 60 : 100,
        boxSizing: 'border-box',
      }}
    >
      {/* 헤더 */}
      <motion.div variants={itemVariants} style={{ 
        width: '100%', 
        maxWidth: 1440, 
        margin: '0 auto', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 24 
      }}>
        <h2 style={{
          color: '#FFF',
          textAlign: 'center',
          fontFamily: 'Pretendard',
          fontSize: isMobile ? 32 : 52,
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '120%',
          letterSpacing: '-1.04px',
          margin: 0,
        }}>
          간단하고 명확한<br />개발 프로세스
        </h2>
        <p style={{
          color: '#94A3B8',
          fontFamily: 'Pretendard',
          fontSize: isMobile ? 16 : 20,
          fontWeight: 400,
          lineHeight: '140%',
          textAlign: 'center',
          margin: 0,
          letterSpacing: '-0.4px',
        }}>
          체계적인 4단계 프로세스로 여러분의 아이디어를 현실로 만들어갑니다.
        </p>
      </motion.div>

      {/* 프로세스 스텝들 */}
      <motion.div
        variants={containerVariants}
        style={{
          width: '100%',
          maxWidth: '100%',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: isMobile ? 32 : 0,
        }}
      >
        {steps.map((step, i) => (
          <motion.div
            key={i}
            variants={circleVariants}
            whileHover={!isMobile ? { scale: 1.05 } : {}}
            whileTap={isMobile ? { scale: 0.95 } : {}}
            transition={{ duration: 0.2 }}
            style={{
              display: 'flex',
              width: isMobile ? '100%' : 360,
              height: isMobile ? 'auto' : 360,
              maxWidth: isMobile ? 320 : 360,
              minHeight: isMobile ? 280 : 360,
              flexShrink: 0,
              aspectRatio: isMobile ? 'auto' : '1/1',
              padding: isMobile ? '40px 32px' : '80px 50px',
              flexDirection: 'column',
              alignItems: isMobile ? 'center' : 'flex-start',
              justifyContent: 'center',
              gap: isMobile ? 20 : 24,
              borderRadius: isMobile ? 32 : 180,
              background: 'linear-gradient(270deg, #000 0%, #0F131B 100%)',
              marginLeft: isMobile ? 0 : (i === 0 ? 0 : -32),
              zIndex: isMobile ? 1 : (steps.length - i),
              position: 'relative',
              border: isMobile ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              boxShadow: isMobile ? '0 4px 32px rgba(0, 0, 0, 0.3)' : 'none',
            }}
          >
            <div style={{ 
              color: '#35507B', 
              fontWeight: 500, 
              fontSize: isMobile ? 28 : 32, 
              fontFamily: 'Pretendard', 
              letterSpacing: isMobile ? '-0.56px' : '-0.64px' 
            }}>
              {step.num}
            </div>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: isMobile ? 'center' : 'flex-start', 
              gap: 12, 
              width: '100%',
              textAlign: isMobile ? 'center' : 'left'
            }}>
              <div style={{ 
                color: '#fff', 
                fontWeight: 600, 
                fontSize: isMobile ? 24 : 24, 
                fontFamily: 'Pretendard', 
                letterSpacing: isMobile ? '-0.4px' : '-0.48px' 
              }}>
                {step.title}
              </div>
              <div style={{ 
                color: '#94A3B8', 
                fontWeight: 400, 
                fontSize: isMobile ? 16 : 16, 
                fontFamily: 'Pretendard', 
                lineHeight: '150%', 
                letterSpacing: isMobile ? '-0.28px' : '-0.32px',
                textAlign: isMobile ? 'center' : 'left'
              }}>
                {step.desc}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ProcessSection; 