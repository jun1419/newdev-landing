"use client";
import { useState, useRef, useEffect } from "react";
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
    
    return () => observer.disconnect();
  }, []);
  
  const prevAdv = () => setAdvIdx(advIdx === 0 ? ADVANTAGE_CAROUSEL.length - 1 : advIdx - 1);
  const nextAdv = () => setAdvIdx(advIdx === ADVANTAGE_CAROUSEL.length - 1 ? 0 : advIdx + 1);
  
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
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', paddingBottom: 80 }}>
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
        ...fadeInUpVisible
      }}>
        <h1 style={{ fontSize: 72, fontWeight: 700, marginBottom: 32, textShadow: '0 4px 50px 80% #3182ED' }}>뉴데브</h1>
        <div style={{ fontSize: 40, color: '#fff', fontWeight: 350, marginBottom: 0, lineHeight: 1.4 }}>
          스타트업과 기업의 빠른 성장에 필요한<br />
          기획부터 개발, 유지보수까지 올인원 웹&앱 개발팀<br />
          NEWDEV를 소개합니다.
        </div>
      </div>
      
      {/* 소개문구 */}
      <div ref={introRef} style={{ 
        width: '100vw', 
        height: '100vh', 
        margin: '0 auto', 
        fontSize: 40, 
        color: '#E2E8F0', 
        lineHeight: 1.6, 
        textAlign: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        ...(introVisible ? fadeInUpVisible : fadeInUp)
      }}>
        <b style={{ color: '#fff', fontSize: 40 }}>뉴데브</b>는 스타트업을 위한 맞춤형 IT 솔루션을 제공합니다.<br />
        기획, 디자인, 개발, 유지보수까지 한 팀에서 전담하며,<br />
        빠른 실행력과 깊이 있는 기술력으로 MVP부터 확장까지 함께합니다.
      </div>
      
      {/* 다이어그램: 올인원 팀 구조 */}
      <div ref={teamRef} style={{ 
        width: '100vw', 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        ...(teamVisible ? scaleInVisible : scaleIn)
      }}>
        {TEAM_MEMBERS.map((m, i) => (
          <div key={m.role} style={{
            background: m.linearGradient,
            color: '#fff',
            fontWeight: 700,
            fontSize: 28,
            width: 400,
            height: 400,
            borderRadius: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px 10px rgba(0,0,0,0.1)',
            position: 'relative',
            marginLeft: i !== 0 ? -40 : 0,
            zIndex: 2 - i
          }}>
            <span style={{ opacity: 1, color: '#fff' }}>{m.role}</span>
          </div>
        ))}
      </div>
      
      {/* 주요 서비스 썸네일 카드 */}
      <div ref={serviceRef} style={{ 
        width: '100vw', 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 40
      }}>
        {SERVICES.map((svc, idx) => (
          <div key={svc.title} style={{
            background: 'linear-gradient(to top, #000, #1B2B48)',
            borderRadius: 40,
            paddingTop: 120,
            paddingLeft: 32,
            paddingRight: 32,
            width: 440,
            height: 440,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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
            <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 20 }}>{svc.title}</div>
            <div style={{ color: '#A3A3A3', fontSize: 20, textAlign: 'center', lineHeight: 1.4, fontWeight: 400, whiteSpace: 'pre-line' }}>
              {svc.desc}
            </div>
          </div>
        ))}
      </div>
      
      {/* 이점 카드형 블록 → 3D 입체 캐러셀로 변경 */}
      <div ref={advRef} style={{ 
        width: 1200, 
        margin: '0 auto', 
        position: 'relative', 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        perspective: 2000,
        ...(advVisible ? {
          opacity: 1,
          transform: 'rotateY(0deg) scale(1)',
          transition: 'all 1.8s cubic-bezier(0.4, 0, 0.2, 1)',
        } : {
          opacity: 0,
          transform: 'rotateY(45deg) scale(0.8)',
          transition: 'all 1.8s cubic-bezier(0.4, 0, 0.2, 1)',
        })
      }}>
        {ADVANTAGE_CAROUSEL.map((adv, i) => {
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
        })}
      </div>
      <Footer />
    </div>
  );
} 