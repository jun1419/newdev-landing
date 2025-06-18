import React from 'react';
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

const getBoxStyle = (type: string) => {
  if (type === 'brown') {
    return {
      display: 'flex',
      width: 380,
      height: 380,
      padding: '52px 40px',
      flexDirection: 'column' as const,
      justifyContent: 'space-between' as const,
      alignItems: 'flex-end' as const,
      borderRadius: 40,
      border: '1px solid rgba(255, 255, 255, 0.10)',
      background: 'linear-gradient(180deg, #000 0%, #492318 100%)',
      boxShadow: '0 2px 24px 0 rgba(0,0,0,0.18)',
      position: 'relative' as const,
    };
  } else {
    return {
      display: 'flex',
      width: 380,
      height: 480,
      padding: '52px 40px',
      flexDirection: 'column' as const,
      justifyContent: 'space-between' as const,
      alignItems: 'flex-end' as const,
      borderRadius: 40,
      border: '1px solid rgba(255, 255, 255, 0.10)',
      background: 'linear-gradient(180deg, #000 0%, #1B2B48 100%)',
      boxShadow: '0 2px 24px 0 rgba(0,0,0,0.18)',
      position: 'relative' as const,
    };
  }
};

const ServiceSection = () => {
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
      style={{ width: '100%', background: 'transparent', padding: '120px 0 80px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, marginBottom: 16 }}>
        <h2 style={{
          color: '#fff',
          fontFamily: 'Pretendard',
          fontSize: 52,
          fontWeight: 400,  
          lineHeight: '120%',
          letterSpacing: '-1.04px',
          margin: 0,
        }}>
          우리가 제공하는 <span style={{ color: '#3182ED' }}>서비스</span>
        </h2>
        <p style={{
          color: '#94A3B8',
          fontFamily: 'Pretendard',
          fontSize: 20,
          fontWeight: 400,
          margin: 0,
          lineHeight: '140%',
          letterSpacing: '-0.4px',
        }}>
          스타트업의 성장 단계에 맞는 맞춤형 개발 솔루션을 제공합니다.
        </p>
      </motion.div>
      <motion.div
        variants={containerVariants}
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 24,
          marginTop: 80,
          maxWidth: 800,
          width: '100%',
          justifyContent: 'center',
        }}
      >
        {/* 왼쪽 컬럼: 웹 개발, 앱 개발 */}
        <motion.div variants={containerVariants} style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>
          {[services[0], services[1]].map((s, i) => (
            <motion.div
              key={s.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              style={getBoxStyle(s.type)}
            >
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: 28, fontFamily: 'Pretendard' }}>{s.title}</div>
                  <div style={{ color: '#94A3B8', fontWeight: 400, fontSize: 18, fontFamily: 'Pretendard' }}>{s.desc}</div>
                </div>
                <img src={s.icon} alt={s.title + ' 아이콘'} style={{ width: 80, height: 80, flexShrink: 0, aspectRatio: '1/1', alignSelf: 'flex-end' }} />
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* 오른쪽 컬럼: 풀스택 개발, 빠른 MVP */}
        <motion.div variants={containerVariants} style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>
          {[services[2], services[3]].map((s, i) => (
            <motion.div
              key={s.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              style={getBoxStyle(s.type)}
            >
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: 28, fontFamily: 'Pretendard' }}>{s.title}</div>
                  <div style={{ color: '#94A3B8', fontWeight: 400, fontSize: 18, fontFamily: 'Pretendard' }}>{s.desc}</div>
                </div>
                <img src={s.icon} alt={s.title + ' 아이콘'} style={{ width: 80, height: 80, flexShrink: 0, aspectRatio: '1/1', alignSelf: 'flex-end' }} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default ServiceSection; 