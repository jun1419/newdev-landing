"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import GNB from "../components/GNB";
import Footer from "../components/Footer";

const SERVICES = [
  {
    title: "웹 개발",
    subtitle: "Web Development",
    summary: "반응형 웹, 대시보드, 랜딩페이지, 커머스 등\n다양한 웹 서비스를 빠르고 완성도 높게 구현",
    detail: "기획부터 디자인, 퍼블리싱, 프론트·백엔드까지 통합적으로 지원하여 완성도 높은 결과물을 빠르게 구현할 수 있습니다.",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    features: ["반응형 디자인", "SEO 최적화", "성능 최적화", "크로스 브라우징"]
  },
  {
    title: "앱 개발",
    subtitle: "Mobile App Development", 
    summary: "iOS/Android 하이브리드 앱, 네이티브 앱까지\n스타트업에 최적화된 앱을 제작",
    detail: "기능성과 안정성을 동시에 고려한 실제 사용자 중심의 앱 경험을 설계합니다. 디자인부터 출시까지 원스톱으로 제공합니다.",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    features: ["크로스 플랫폼", "네이티브 성능", "앱스토어 출시", "푸시 알림"]
  },
  {
    title: "시스템 구축",
    subtitle: "System Architecture",
    summary: "사내 시스템, 관리자 페이지, 자동화 도구 등\n맞춤형 관리 시스템을 구축",
    detail: "반복 업무를 줄이고, 운영 효율성을 극대화할 수 있는 맞춤형 관리 시스템과 백오피스를 구축합니다.",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    features: ["자동화 시스템", "관리자 대시보드", "데이터 분석", "API 연동"]
  },
  {
    title: "유지보수",
    subtitle: "Maintenance & Support",
    summary: "기존 서비스의 안정적 운영 및 기능 개선\n성능 최적화, UX 개선까지 책임",
    detail: "오류 대응은 물론, 지속적인 성능 최적화 및 UX 개선까지 포함된 운영형 유지보수 서비스를 제공합니다.",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    features: ["24시간 모니터링", "버그 수정", "성능 개선", "보안 업데이트"]
  },
  {
    title: "MVP 빠른 개발",
    subtitle: "Rapid MVP Development",
    summary: "아이디어를 빠르게 실현하는 프로토타입 제작\n데이터 기반 피드백 루프까지 고려한 구조 설계",
    detail: "초기 제품을 짧은 시간 안에 출시할 수 있도록 기획, 디자인, 개발을 병렬로 진행합니다.",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    features: ["빠른 프로토타이핑", "사용자 테스트", "데이터 분석", "확장 가능한 구조"]
  }
];

const PROCESS_STEPS = [
  { step: "01", title: "기획 & 분석", desc: "비즈니스 목표와 사용자 니즈를 분석하여\n최적의 솔루션을 기획합니다" },
  { step: "02", title: "디자인 & 설계", desc: "사용자 경험을 고려한 UI/UX 디자인과\n시스템 아키텍처를 설계합니다" },
  { step: "03", title: "개발 & 구현", desc: "최신 기술 스택을 활용하여\n안정적이고 확장 가능한 서비스를 구현합니다" },
  { step: "04", title: "테스트 & 배포", desc: "철저한 테스트를 통해 품질을 검증하고\n안전하게 서비스를 배포합니다" },
  { step: "05", title: "운영 & 개선", desc: "지속적인 모니터링과 사용자 피드백을 통해\n서비스를 개선해 나갑니다" }
];

export default function ServicePage() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // 애니메이션 상태
  const [heroVisible, setHeroVisible] = useState(true);
  const [servicesVisible, setServicesVisible] = useState(false);
  const [processVisible, setProcessVisible] = useState(false);
  
  // refs
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  
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
            if (entry.target === servicesRef.current) setServicesVisible(true);
            if (entry.target === processRef.current) setProcessVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (servicesRef.current) observer.observe(servicesRef.current);
    if (processRef.current) observer.observe(processRef.current);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
    };
  }, []);
  
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

  const handleServiceClick = (serviceTitle: string) => {
    // 서비스 타입을 쿼리 파라미터로 전달하여 견적받기 페이지로 이동
    router.push(`/estimate?service=${encodeURIComponent(serviceTitle)}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <GNB />
      {/* Hero Section */}
      <div ref={heroRef} style={{ 
        width: '100vw', 
        height: '100vh', 
        textAlign: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        background: 'radial-gradient(ellipse at center, rgba(49, 130, 237, 0.1) 0%, rgba(0, 0, 0, 1) 70%)',
        padding: isMobile ? '0 20px' : '0',
        ...fadeInUpVisible
      }}>
        <div style={{ 
          fontSize: isMobile ? 16 : 20, 
          color: '#3182ED', 
          fontWeight: 600, 
          marginBottom: isMobile ? 12 : 16, 
          letterSpacing: '2px' 
        }}>SERVICES</div>
        <h1 style={{ 
          fontSize: isMobile ? 36 : 64, 
          fontWeight: 800, 
          marginBottom: isMobile ? 24 : 32, 
          background: 'linear-gradient(135deg, #fff 0%, #3182ED 100%)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent' 
        }}>
          사업도 뉴데브와 함께
        </h1>
        <div style={{ 
          fontSize: isMobile ? 18 : 40, 
          color: '#A3A3A3', 
          fontWeight: 400, 
          lineHeight: 1.5, 
          maxWidth: isMobile ? 320 : 600, 
          textShadow: '0 2px 100px #3182ED' 
        }}>
          사업을 시작하셨나요?<br />
          사업의 시작부터 성장, 관리까지<br />
          <span style={{ color: '#3182ED', fontWeight: 600 }}>이제 뉴데브와 함께 하세요.</span>
        </div>
      </div>

      {/* Services Grid Section */}
      <div ref={servicesRef} style={{ 
        width: '100vw', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: isMobile ? '60px 20px' : '80px 40px'
      }}>
        <div style={{ 
          fontSize: isMobile ? 32 : 48, 
          fontWeight: 700, 
          marginBottom: isMobile ? 40 : 80, 
          textAlign: 'center',
          ...(servicesVisible ? fadeInUpVisible : fadeInUp)
        }}>
          우리의 서비스
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: isMobile ? 24 : 40,
          maxWidth: 1400,
          width: '100%'
        }}>
          {SERVICES.map((service, idx) => (
            <div key={service.title} style={{
              background: 'linear-gradient(135deg, #1a1d29 0%, #0f1419 100%)',
              borderRadius: isMobile ? 20 : 40,
              padding: isMobile ? 24 : 40,
              minHeight: isMobile ? 280 : 400,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              cursor: 'pointer',
              border: '2px solid rgba(255,255,255,0.1)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: `${idx * 0.1}s`,
              overflow: 'hidden',
              ...(servicesVisible ? {
                opacity: 1,
                transform: 'translateY(0px) scale(1)',
              } : {
                opacity: 0,
                transform: 'translateY(60px) scale(0.95)',
              })
            }}
            onClick={() => handleServiceClick(service.title)}
            onMouseEnter={!isMobile ? (e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(49, 130, 237, 0.3)';
              e.currentTarget.style.border = '2px solid #3182ED';
            } : undefined}
            onMouseLeave={!isMobile ? (e) => {
              e.currentTarget.style.transform = 'translateY(0px) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
              e.currentTarget.style.border = '2px solid rgba(255,255,255,0.1)';
            } : undefined}
            >
              {/* 배경 그라디언트 */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                width: '100%',
                height: '8px',
                background: service.gradient,
                borderRadius: isMobile ? '20px 20px 0 0' : '40px 40px 0 0',
                opacity: 0.7,
                transition: 'opacity 0.3s'
              }} />

              <div style={{ 
                fontSize: isMobile ? 22 : 28, 
                fontWeight: 700, 
                marginBottom: isMobile ? 6 : 8 
              }}>{service.title}</div>
              <div style={{ 
                fontSize: isMobile ? 12 : 14, 
                color: '#3182ED', 
                fontWeight: 500, 
                marginBottom: isMobile ? 16 : 20, 
                letterSpacing: '1px' 
              }}>{service.subtitle}</div>
              <div style={{ 
                color: '#A3A3A3', 
                fontSize: isMobile ? 14 : 16, 
                lineHeight: 1.6, 
                marginBottom: isMobile ? 16 : 24, 
                whiteSpace: 'pre-line', 
                flex: 1 
              }}>
                {service.summary}
              </div>
              
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: isMobile ? 6 : 8,
                marginBottom: isMobile ? 16 : 20
              }}>
                {service.features.map((feature, i) => (
                  <span key={i} style={{
                    background: 'rgba(49, 130, 237, 0.15)',
                    color: '#3182ED',
                    padding: isMobile ? '3px 8px' : '4px 12px',
                    borderRadius: 4,
                    fontSize: isMobile ? 12 : 14,
                    fontWeight: 500
                  }}>
                    {feature}
                  </span>
                ))}
              </div>
              
              <div style={{
                marginTop: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: isMobile ? 16 : 20
              }}>
                <span style={{ 
                  color: '#3182ED', 
                  fontSize: isMobile ? 14 : 16, 
                  fontWeight: 600 
                }}>
                  견적 확인하기
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div ref={processRef} style={{ 
        width: '100vw', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: isMobile ? '60px 20px' : '80px 40px',
        background: 'linear-gradient(180deg, #000 0%, #0a0f1c 50%, #000 100%)'
      }}>
        <div style={{ 
          fontSize: isMobile ? 32 : 48, 
          fontWeight: 700, 
          marginBottom: isMobile ? 40 : 60, 
          textAlign: 'center',
          ...(processVisible ? fadeInUpVisible : fadeInUp)
        }}>
          개발 프로세스
        </div>
        
        <div style={{ 
          maxWidth: 1200, 
          width: '100%' 
        }}>
          {PROCESS_STEPS.map((step, idx) => (
            <div key={step.step} style={{
              display: 'flex',
              alignItems: isMobile ? 'flex-start' : 'center',
              marginBottom: isMobile ? 40 : 60,
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: `${idx * 0.2}s`,
              ...(processVisible ? {
                opacity: 1,
                transform: 'translateX(0px)',
              } : {
                opacity: 0,
                transform: isMobile ? 'translateY(30px)' : (idx % 2 === 0 ? 'translateX(-60px)' : 'translateX(60px)'),
              })
            }}>
              <div style={{
                width: isMobile ? 60 : 80,
                height: isMobile ? 60 : 80,
                borderRadius: isMobile ? 30 : 40,
                background: 'linear-gradient(135deg, #3182ED 0%, #1e40af 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isMobile ? 16 : 20,
                fontWeight: 500,
                marginRight: isMobile ? 20 : 40,
                boxShadow: '0 10px 30px rgba(49, 130, 237, 0.3)',
                flexShrink: 0
              }}>
                {step.step}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: isMobile ? 20 : 28, 
                  fontWeight: 700, 
                  marginBottom: isMobile ? 6 : 8 
                }}>{step.title}</div>
                <div style={{ 
                  color: '#A3A3A3', 
                  fontSize: isMobile ? 14 : 20, 
                  lineHeight: 1.5, 
                  whiteSpace: 'pre-line' 
                }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
} 