import React from 'react';

const stats = [
  { value: '03+', label: '완료된 프로젝트' },
  { value: '03+', label: '만족한 고객사' },
  { value: '2시간', label: '평균 응답 시간' },
  { value: '95%', label: '고객 만족도' },
];

const StatsSection = () => (
  <section style={{
    display: 'flex',
    width: '100%',
    padding: '140px 92px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 88,
    background: 'linear-gradient(180deg, #000 0%, #0F131B 100%)',
    margin: '0 auto',
    boxSizing: 'border-box',
  }}>
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <h2 style={{
        color: '#fff',
        fontFamily: 'Pretendard',
        fontSize: 52,
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
        fontSize: 20,
        fontWeight: 400,
        lineHeight: '140%',
        textAlign: 'center',
        margin: 0,
      }}>
        신뢰할 수 있는 파트너로서 쌓아온 경험과 성과입니다.
      </p>
    </div>
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginTop: 60,
      gap: 0,
    }}>
      {stats.map((stat, i) => (
        <div key={i} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          flex: 1,
        }}>
          <div style={{ color: '#3182ED', fontWeight: 400, fontSize: 52, fontFamily: 'Pretendard', lineHeight: '120%', letterSpacing: '-1.12px' }}>{stat.value}</div>
          <div style={{ color: '#94A3B8', fontWeight: 400, fontSize: 18, fontFamily: 'Pretendard', lineHeight: '140%', letterSpacing: '-0.36px' }}>{stat.label}</div>
        </div>
      ))}
    </div>
  </section>
);

export default StatsSection; 