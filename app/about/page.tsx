"use client";
import { useState, useRef, useEffect } from "react";
import GNB from "../components/GNB";
import Footer from "../components/Footer";

const TEAM_MEMBERS = [
  { role: "기획자", linearGradient: "linear-gradient(to left, #3182ED, #0a0a0a)" },
  { role: "디자이너", linearGradient: "linear-gradient(to left, #00B8A9, #0a0a0a)" },
  { role: "개발자", linearGradient: "linear-gradient(to left, #A259FF, #0a0a0a)" }
];

const SERVICES = [
  {
    title: "MVP 빠른 개발",
    desc: "아이디어를 빠르게 시제품으로 전환\n시장 반응을 신속하게 확인"
  },
  {
    title: "웹/앱 시스템 구축",
    desc: "비즈니스에 꼭 맞는\n맞춤형 IT 솔루션 제공"
  },
  {
    title: "지속 가능한 유지보수",
    desc: "론칭 후에도 안정적인 운영과\n기능 개선 지원"
  }
];

const ADVANTAGE_CAROUSEL = [
  {
    title: "MVP를 빠르게 실현하는 실행력",
    desc: "아이디어를 빠르게 시제품으로 전환하여\n시장 반응을 확인할 수 있습니다."
  },
  {
    title: "웹/앱 시스템 구축과\n지속 가능한 유지보수",
    desc: "론칭 후에도 안정적인 운영과\n기능 개선까지 지원합니다."
  },
  {
    title: "올인원 구성",
    desc: "기획자, 디자이너, 개발자가\n팀으로 움직입니다. 외주 간 커뮤니케이션\n스트레스 없음."
  },
  {
    title: "스타트업 눈높이에 맞춘 유연한 소통",
    desc: "빠른 피드백, 가벼운 커뮤니케이션\n그리고 결과 중심의 협업"
  },
  {
    title: "최신 기술 스택 + 유행에 맞는 UI/UX 적용",
    desc: "React, Next.js, AI API, Headless CMS\n등 트렌디한 기술 반영"
  }
];

const CLIENTS = [
  { name: "스타트업 A", review: "뉴데브와 함께 MVP를 2달 만에 출시! 빠른 실행력 최고." },
  { name: "스타트업 B", review: "기획-디자인-개발이 한 팀이라 소통이 정말 편했어요." },
  { name: "스타트업 C", review: "론칭 후에도 유지보수까지 꼼꼼하게 챙겨줘서 든든합니다." }
];

export default function AboutPage() {
  const [showService, setShowService] = useState<number | null>(null);
  const [advIdx, setAdvIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // 각 섹션 ref
  const titleRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  const advRef = useRef<HTMLDivElement>(null);
  
  // 애니메이션 상태
  const [titleVisible, setTitleVisible] = useState(true);
  const [introVisible, setIntroVisible] = useState(false);
  const [teamVisible, setTeamVisible] = useState(false);
  const [serviceVisible, setServiceVisible] = useState(false);
  const [advVisible, setAdvVisible] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === introRef.current) setIntroVisible(true);
            if (entry.target === teamRef.current) setTeamVisible(true);
            if (entry.target === serviceRef.current) setServiceVisible(true);
            if (entry.target === advRef.current) setAdvVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );
    
    if (introRef.current) observer.observe(introRef.current);
    if (teamRef.current) observer.observe(teamRef.current);
    if (serviceRef.current) observer.observe(serviceRef.current);
    if (advRef.current) observer.observe(advRef.current);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
    };
  }, []);
  
  const prevAdv = () => setAdvIdx(advIdx === 0 ? ADVANTAGE_CAROUSEL.length - 1 : advIdx - 1);
  const nextAdv = () => setAdvIdx(advIdx === ADVANTAGE_CAROUSEL.length - 1 ? 0 : advIdx + 1);
  
  // 스와이프 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
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
      nextAdv();
    } else if (isRightSwipe) {
      prevAdv();
    }
  };
  
  // CSS 스타일 정의
  const fadeInUp = {
    opacity: 0,
    transform: 'translateY(60px)',
    transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
  };
  
  const fadeInUpVisible = {
    opacity: 1,
    transform: 'translateY(0px)',
    transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
  };
  
  const scaleIn = {
    opacity: 0,
    transform: 'scale(0.8) rotateY(30deg)',
    transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
  };
  
  const scaleInVisible = {
    opacity: 1,
    transform: 'scale(1) rotateY(0deg)',
    transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
  };
  
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <GNB />
      {/* 상단 타이틀 */}
      <div ref={titleRef} style={{ 
        width: '100vw', 
        height: '100vh', 
        textAlign: 'center', 
        paddingTop: 60, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: isMobile ? '60px 20px 0' : '60px 0 0',
        ...fadeInUpVisible
      }}>
        <h1 style={{ 
          fontSize: isMobile ? 48 : 72, 
          fontWeight: 700, 
          marginBottom: isMobile ? 24 : 32, 
          textShadow: '0 4px 50px 80% #3182ED' 
        }}>뉴데브</h1>
        <div style={{ 
          fontSize: isMobile ? 18 : 40, 
          color: '#fff', 
          fontWeight: 350, 
          marginBottom: 0, 
          lineHeight: 1.4,
          maxWidth: isMobile ? 320 : 'none'
        }}>
          스타트업과 기업의 빠른 성장에 필요한<br />
          기획부터 개발, 유지보수까지 올인원 웹&앱 개발팀<br />
          NEWDEV를 소개합니다.
        </div>
      </div>
      
      {/* 소개문구 */}
      <div ref={introRef} style={{ 
        width: '100vw', 
        height: isMobile ? 'auto' : '100vh', 
        margin: '0 auto', 
        fontSize: isMobile ? 16 : 40, 
        color: '#E2E8F0', 
        lineHeight: 1.6, 
        textAlign: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: isMobile ? '80px 20px' : '0',
        minHeight: isMobile ? '60vh' : 'auto',
        ...(introVisible ? fadeInUpVisible : fadeInUp)
      }}>
        <b style={{ 
          color: '#fff', 
          fontSize: isMobile ? 32 : 40 
        }}>뉴데브</b>는 스타트업을 위한 맞춤형 IT 솔루션을 제공합니다.<br />
        기획, 디자인, 개발, 유지보수까지 한 팀에서 전담하며,<br />
        빠른 실행력과 깊이 있는 기술력으로 MVP부터 확장까지 함께합니다.
      </div>
      
      {/* 다이어그램: 올인원 팀 구조 */}
      <div ref={teamRef} style={{ 
        width: '100vw', 
        height: isMobile ? 'auto' : '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 20 : 0,
        padding: isMobile ? '80px 20px' : '0',
        minHeight: isMobile ? '60vh' : 'auto',
        ...(teamVisible ? scaleInVisible : scaleIn)
      }}>
        {TEAM_MEMBERS.map((m, i) => (
          <div key={m.role} style={{
            background: m.linearGradient,
            color: '#fff',
            fontWeight: 700,
            fontSize: isMobile ? 20 : 28,
            width: isMobile ? 200 : 400,
            height: isMobile ? 200 : 400,
            borderRadius: isMobile ? 100 : 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px 10px rgba(0,0,0,0.1)',
            position: 'relative',
            marginLeft: !isMobile && i !== 0 ? -40 : 0,
            zIndex: 2 - i
          }}>
            <span style={{ opacity: 1, color: '#fff' }}>{m.role}</span>
          </div>
        ))}
      </div>
      
      {/* 주요 서비스 썸네일 카드 */}
      <div ref={serviceRef} style={{ 
        width: '100vw', 
        height: isMobile ? 'auto' : '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: isMobile ? 20 : 40,
        flexDirection: isMobile ? 'column' : 'row',
        padding: isMobile ? '80px 20px' : '0',
        minHeight: isMobile ? '80vh' : 'auto'
      }}>
        {SERVICES.map((svc, idx) => (
          <div key={svc.title} style={{
            background: 'linear-gradient(to top, #000, #1B2B48)',
            borderRadius: isMobile ? 20 : 40,
            paddingTop: isMobile ? 40 : 120,
            paddingLeft: isMobile ? 20 : 32,
            paddingRight: isMobile ? 20 : 32,
            paddingBottom: isMobile ? 40 : 0,
            width: isMobile ? 280 : 440,
            height: isMobile ? 200 : 440,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: isMobile ? 'center' : 'flex-start',
            position: 'relative',
            cursor: 'pointer',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: `${idx * 0.2}s`,
            ...(serviceVisible ? {
              opacity: 1,
              transform: 'translateY(0px) scale(1)',
            } : {
              opacity: 0,
              transform: 'translateY(80px) scale(0.9)',
            })
          }}
          onClick={() => setShowService(showService === idx ? null : idx)}
          >
            <div style={{ 
              fontWeight: 700, 
              fontSize: isMobile ? 18 : 28, 
              marginBottom: isMobile ? 12 : 20,
              textAlign: 'center'
            }}>{svc.title}</div>
            <div style={{ 
              color: '#A3A3A3', 
              fontSize: isMobile ? 14 : 20, 
              textAlign: 'center', 
              lineHeight: 1.4, 
              fontWeight: 400, 
              whiteSpace: 'pre-line' 
            }}>
              {svc.desc}
            </div>
          </div>
        ))}
      </div>
      
      {/* 이점 카드형 블록 → 3D 입체 캐러셀로 변경 */}
      <div ref={advRef} style={{ 
        width: isMobile ? '100vw' : 1200, 
        margin: '0 auto', 
        position: 'relative', 
        height: isMobile ? 'auto' : '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        perspective: isMobile ? 'none' : 2000,
        flexDirection: isMobile ? 'column' : 'row',
        padding: isMobile ? '80px 0' : '0',
        minHeight: isMobile ? '100vh' : 'auto',
        gap: isMobile ? 0 : 0,
        overflow: isMobile ? 'hidden' : 'visible',
        ...(advVisible ? {
          opacity: 1,
          transform: isMobile ? 'translateY(0px)' : 'rotateY(0deg) scale(1)',
          transition: 'all 1.8s cubic-bezier(0.4, 0, 0.2, 1)',
        } : {
          opacity: 0,
          transform: isMobile ? 'translateY(40px)' : 'rotateY(45deg) scale(0.8)',
          transition: 'all 1.8s cubic-bezier(0.4, 0, 0.2, 1)',
        })
      }}>
        {isMobile ? (
          // 모바일: 스와이프 가능한 캐러셀
          <>
            {/* 제목 */}
            <div style={{
              fontSize: 28,
              fontWeight: 700,
              textAlign: 'center',
              marginBottom: 40,
              color: '#fff',
              padding: '0 20px'
            }}>
              뉴데브만의 차별점
            </div>

            {/* 캐러셀 컨테이너 */}
            <div 
              style={{
                position: 'relative',
                width: '100%',
                height: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 40
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* 배경 그라데이션 - 성능 최적화 */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 300,
                height: 300,
                background: 'radial-gradient(circle, rgba(49, 130, 237, 0.08) 0%, rgba(0, 0, 0, 0) 70%)',
                borderRadius: '50%',
                zIndex: 0
              }} />

              {/* 카드들 - 성능 최적화 */}
              {ADVANTAGE_CAROUSEL.map((adv, i) => {
                const isActive = i === advIdx;
                const isPrev = i === (advIdx - 1 + ADVANTAGE_CAROUSEL.length) % ADVANTAGE_CAROUSEL.length;
                const isNext = i === (advIdx + 1) % ADVANTAGE_CAROUSEL.length;
                
                // 보이지 않는 카드는 렌더링하지 않음
                if (!isActive && !isPrev && !isNext) return null;
                
                let cardStyle: React.CSSProperties = {
                  position: 'absolute',
                  width: 320,
                  height: 420,
                  background: 'linear-gradient(135deg, rgba(15, 19, 27, 0.95) 0%, rgba(16, 28, 52, 0.95) 100%)',
                  borderRadius: 24,
                  border: '1px solid rgba(49, 130, 237, 0.2)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 32,
                  gap: 24,
                  textAlign: 'center',
                  transition: 'transform 0.4s ease, opacity 0.4s ease',
                  cursor: 'pointer',
                  zIndex: 1,
                  willChange: 'transform, opacity'
                };

                if (isActive) {
                  cardStyle.transform = 'translateX(0px) scale(1)';
                  cardStyle.opacity = 1;
                  cardStyle.zIndex = 3;
                  cardStyle.border = '1px solid #3182ED';
                  cardStyle.boxShadow = '0 25px 50px rgba(49, 130, 237, 0.25)';
                } else if (isPrev) {
                  cardStyle.transform = 'translateX(-120px) scale(0.9)';
                  cardStyle.opacity = 0.5;
                  cardStyle.zIndex = 2;
                } else if (isNext) {
                  cardStyle.transform = 'translateX(120px) scale(0.9)';
                  cardStyle.opacity = 0.5;
                  cardStyle.zIndex = 2;
                }

                return (
                  <div
                    key={adv.title}
                    style={cardStyle}
                    onClick={() => {
                      if (isPrev) prevAdv();
                      else if (isNext) nextAdv();
                    }}
                  >
                    {/* 카드 상단 아이콘/숫자 */}
                    <div style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      background: 'linear-gradient(135deg, #3182ED 0%, #1e40af 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                      fontWeight: 700,
                      color: '#fff',
                      marginBottom: 8
                    }}>
                      {i + 1}
                    </div>

                    {/* 제목 */}
                    <div style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: '#fff',
                      lineHeight: 1.3,
                      marginBottom: 8
                    }}>
                      {adv.title}
                    </div>

                    {/* 설명 */}
                    <div style={{
                      fontSize: 14,
                      color: '#A3A3A3',
                      lineHeight: 1.5,
                      whiteSpace: 'pre-line'
                    }}>
                      {adv.desc}
                    </div>

                    {/* 활성 카드 표시 */}
                    {isActive && (
                      <div style={{
                        position: 'absolute',
                        bottom: 20,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 40,
                        height: 4,
                        background: 'linear-gradient(90deg, #3182ED 0%, #1e40af 100%)',
                        borderRadius: 2
                      }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* 인디케이터만 유지 */}
            <div style={{
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {ADVANTAGE_CAROUSEL.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setAdvIdx(i)}
                  style={{
                    width: i === advIdx ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === advIdx 
                      ? 'linear-gradient(90deg, #3182ED 0%, #1e40af 100%)' 
                      : 'rgba(255, 255, 255, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

            {/* 스와이프 힌트 */}
            <div style={{
              marginTop: 20,
              fontSize: 14,
              color: 'rgba(255, 255, 255, 0.5)',
              textAlign: 'center'
            }}>
              ← 스와이프하여 다른 카드 보기 →
            </div>
          </>
        ) : (
          // 데스크톱: 기존 3D 캐러셀 유지
          ADVANTAGE_CAROUSEL.map((adv, i) => {
            // 3D 카드 위치 계산
            const pos = i - advIdx;
            let style: React.CSSProperties = {
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 400,
              height: 460,
              transform: '',
              opacity: 0,
              zIndex: 1,
              background: 'linear-gradient(120deg, #0F131B 60%,rgb(16, 28, 52) 100%)',
              borderRadius: 40,
              boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
              transition: 'all 0.5s cubic-bezier(.4,2,.3,1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              padding: 40,
              gap: 28,
              textAlign: 'center',
              border: '2px solid transparent',
              cursor: pos === -1 || pos === 1 ? 'pointer' : 'default',
            };
            if (pos === 0) {
              style.transform = 'translate(-50%, -50%) scale(1) rotateY(0deg)';
              style.opacity = 1;
              style.zIndex = 3;
              style.border = '2px solid #3182ED';
            } else if (pos === -1 || (pos === ADVANTAGE_CAROUSEL.length-1 && advIdx === 0)) {
              style.transform = 'translate(-120%, -50%) scale(0.92) rotateY(30deg)';
              style.opacity = 0.6;
              style.zIndex = 2;
            } else if (pos === 1 || (pos === -(ADVANTAGE_CAROUSEL.length-1) && advIdx === ADVANTAGE_CAROUSEL.length-1)) {
              style.transform = 'translate(20%, -50%) scale(0.92) rotateY(-30deg)';
              style.opacity = 0.6;
              style.zIndex = 2;
            } else if (pos === -2 || (pos === ADVANTAGE_CAROUSEL.length-2 && advIdx <= 1)) {
              style.transform = 'translate(-220%, -50%) scale(0.85) rotateY(45deg)';
              style.opacity = 0.2;
              style.zIndex = 1;
            } else if (pos === 2 || (pos === -(ADVANTAGE_CAROUSEL.length-2) && advIdx >= ADVANTAGE_CAROUSEL.length-2)) {
              style.transform = 'translate(120%, -50%) scale(0.85) rotateY(-45deg)';
              style.opacity = 0.2;
              style.zIndex = 1;
            }
            let onClick = undefined;
            if (pos === -1 || (pos === ADVANTAGE_CAROUSEL.length-1 && advIdx === 0)) onClick = prevAdv;
            if (pos === 1 || (pos === -(ADVANTAGE_CAROUSEL.length-1) && advIdx === ADVANTAGE_CAROUSEL.length-1)) onClick = nextAdv;
            return (
              <div key={adv.title} style={style} onClick={onClick}>
                <div style={{ fontSize: 24, fontWeight: 700, textShadow: '0 2px 8px #000', lineHeight: 1.4 }}>{adv.title}</div>
                <div style={{ fontSize: 18, fontWeight: 400, whiteSpace: 'pre-line', textShadow: '0 2px 8px #000', color: '#A3A3A3', lineHeight: 1.4 }}>{adv.desc}</div>
              </div>
            );
          })
        )}
      </div>
      <Footer />
    </div>
  );
} 