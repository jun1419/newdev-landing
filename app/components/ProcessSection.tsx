import React from 'react';
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

const responsiveStyle = `
@media (max-width: 768px) {
  .process-circles {
    flex-direction: column !important;
    align-items: center !important;
    margin-left: 0 !important;
  }
  .process-circle {
    margin-left: 0 !important;
    margin-top: 16px !important;
    margin-bottom: 16px !important;
    width: clamp(160px, 60vw, 320px) !important;
    height: clamp(160px, 60vw, 320px) !important;
    min-width: clamp(160px, 60vw, 320px) !important;
    min-height: clamp(160px, 60vw, 320px) !important;
    max-width: 320px !important;
    max-height: 320px !important;
    padding: 40px 16px !important;
  }
  .process-circle-inner {
    align-items: center !important;
    text-align: center !important;
  }
  .process-circle-inner * {
    text-align: center !important;
  }
}
`;

const ProcessSection = () => {
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
        padding: '140px 92px 140px 92px',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 100,
        boxSizing: 'border-box',
      }}
    >
      <style>{responsiveStyle}</style>
      <motion.div variants={itemVariants} style={{ width: '100%', maxWidth: 1440, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <h2 style={{
          color: '#FFF',
          textAlign: 'center',
          fontFamily: 'Pretendard',
          fontSize: 52,
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
          fontSize: 20,
          fontWeight: 400,
          lineHeight: '140%',
          textAlign: 'center',
          margin: 0,
          letterSpacing: '-0.4px',
        }}>
          체계적인 4단계 프로세스로 여러분의 아이디어를 현실로 만들어갑니다.
        </p>
      </motion.div>
      <motion.div
        variants={containerVariants}
        className="process-circles"
        style={{
          width: '100%',
          maxWidth: '100%',
          marginLeft: 0,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        {steps.map((step, i) => (
          <motion.div
            key={i}
            variants={circleVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="process-circle"
            style={{
              display: 'flex',
              width: 'clamp(220px, 22vw, 400px)',
              height: 'clamp(220px, 22vw, 400px)',
              minWidth: 'clamp(220px, 22vw, 400px)',
              minHeight: 'clamp(220px, 22vw, 400px)',
              maxWidth: 400,
              maxHeight: 400,
              flexShrink: 0,
              aspectRatio: '1/1',
              padding: '100px 60px',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              gap: 24,
              borderRadius: 200,
              background: 'linear-gradient(270deg, #000 0%, #0F131B 100%)',
              marginLeft: i === 0 ? 0 : -40,
            }}
          >
            <div style={{ color: '#35507B', fontWeight: 500, fontSize: 32, fontFamily: 'Pretendard', letterSpacing: '-0.64px' }}>{step.num}</div>
            <div className="process-circle-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12, width: '100%' }}>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: 24, fontFamily: 'Pretendard', letterSpacing: '-0.48px', textAlign: 'left' }}>{step.title}</div>
              <div style={{ color: '#94A3B8', fontWeight: 400, fontSize: 16, fontFamily: 'Pretendard', lineHeight: '150%', letterSpacing: '-0.32px', textAlign: 'left' }}>{step.desc}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ProcessSection; 