"use client";
import React, { useState, useEffect } from 'react';

const stats = [
  { value: '03+', label: '완료된 프로젝트' },
  { value: '03+', label: '만족한 고객사' },
  { value: '2시간', label: '평균 응답 시간' },
  { value: '95%', label: '고객 만족도' },
];

const StatsSection = () => {
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
        background: 'linear-gradient(180deg, #000 0%, #0F131B 100%)',
        minHeight: '400px',
      }}>
        <div style={{ color: '#94A3B8', fontSize: '16px' }}>Loading...</div>
      </section>
    );
  }

  return (
    <section style={{
      display: 'flex',
      width: '100%',
      padding: isMobile ? '120px 20px' : '140px 92px',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: isMobile ? 60 : 88,
      background: 'linear-gradient(180deg, #000 0%, #0F131B 100%)',
      margin: '0 auto',
      boxSizing: 'border-box',
    }}>
      {/* 헤더 */}
      <div style={{ 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 16 
      }}>
        <h2 style={{
          color: '#fff',
          fontFamily: 'Pretendard',
          fontSize: isMobile ? 32 : 52,
          fontWeight: 400,
          lineHeight: '120%',
          textAlign: 'center',
          margin: 0,
        }}>
          숫자로 보는 <span style={{ fontWeight: 700 }}>뉴데브</span>
        </h2>
        <p style={{
          color: '#94A3B8',
          fontFamily: 'Pretendard',
          fontSize: isMobile ? 16 : 20,
          fontWeight: 400,
          lineHeight: '140%',
          textAlign: 'center',
          margin: 0,
        }}>
          신뢰할 수 있는 파트너로서 쌓아온 경험과 성과입니다.
        </p>
      </div>

      {/* 통계 */}
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: isMobile ? 'center' : 'space-between',
        alignItems: isMobile ? 'center' : 'flex-end',
        marginTop: isMobile ? 40 : 60,
        gap: isMobile ? 40 : 0,
      }}>
        {/* 데스크톱: 가로 4개 */}
        {!isMobile && stats.map((stat, i) => (
          <div key={i} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            flex: 1,
          }}>
            <div style={{ 
              color: '#3182ED', 
              fontWeight: 400, 
              fontSize: 52, 
              fontFamily: 'Pretendard', 
              lineHeight: '120%', 
              letterSpacing: '-1.12px' 
            }}>
              {stat.value}
            </div>
            <div style={{ 
              color: '#94A3B8', 
              fontWeight: 400, 
              fontSize: 18, 
              fontFamily: 'Pretendard', 
              lineHeight: '140%', 
              letterSpacing: '-0.36px' 
            }}>
              {stat.label}
            </div>
          </div>
        ))}

        {/* 모바일: 2x2 그리드 */}
        {isMobile && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: '40px 20px',
            width: '100%',
            maxWidth: '300px',
          }}>
            {stats.map((stat, i) => (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }}>
                <div style={{ 
                  color: '#3182ED', 
                  fontWeight: 400, 
                  fontSize: 36, 
                  fontFamily: 'Pretendard', 
                  lineHeight: '120%', 
                  letterSpacing: '-0.72px' 
                }}>
                  {stat.value}
                </div>
                <div style={{ 
                  color: '#94A3B8', 
                  fontWeight: 400, 
                  fontSize: 14, 
                  fontFamily: 'Pretendard', 
                  lineHeight: '140%', 
                  letterSpacing: '-0.28px',
                  textAlign: 'center'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default StatsSection; 