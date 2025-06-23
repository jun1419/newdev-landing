"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import GNB from "../components/GNB";
import Footer from "../components/Footer";

// 포트폴리오 타입 정의
interface Portfolio {
  id: number;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  tech: string[];
  duration: string;
  team: string;
  features: string[];
  image: string;
  gradient: string;
  challenges?: string[];
  solutions?: string[];
}

// 기본 포트폴리오 데이터 (백업용)
const DEFAULT_PORTFOLIO_PROJECTS: Portfolio[] = [
  {
    id: 1,
    title: "핀테크 스타트업 MVP",
    category: "웹 개발",
    subtitle: "Fintech MVP Platform",
    description: "개인 투자자를 위한 포트폴리오 관리 플랫폼. 실시간 데이터 연동과 직관적인 대시보드로 투자 현황을 한눈에 파악할 수 있습니다.",
    tech: ["React", "Next.js", "TypeScript", "Chart.js", "Firebase"],
    duration: "2개월",
    team: "기획자 1명, 디자이너 1명, 개발자 2명",
    features: [
      "실시간 주식/코인 데이터 연동",
      "포트폴리오 분석 대시보드",
      "투자 성과 리포트 자동 생성",
      "모바일 반응형 UI/UX"
    ],
    image: "/images/project1.jpg",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    challenges: [
      "실시간 데이터 처리 최적화",
      "복잡한 차트 데이터 시각화",
      "반응형 대시보드 구현"
    ],
    solutions: [
      "WebSocket 기반 실시간 통신 구축",
      "Chart.js 커스터마이징으로 직관적 시각화 구현",
      "CSS Grid와 Flexbox를 활용한 반응형 레이아웃"
    ]
  },
  {
    id: 2,
    title: "헬스케어 관리 앱",
    category: "앱 개발",
    subtitle: "Healthcare Management App",
    description: "개인 건강 데이터를 체계적으로 관리하고, AI 기반 건강 분석으로 맞춤형 건강 관리 솔루션을 제공하는 모바일 앱입니다.",
    tech: ["React Native", "Node.js", "MongoDB", "AWS", "TensorFlow"],
    duration: "3개월",
    team: "기획자 1명, 디자이너 1명, 개발자 2명",
    features: [
      "건강 데이터 자동 수집 및 분석",
      "AI 기반 건강 상태 예측",
      "의료진과의 실시간 상담 기능",
      "개인 맞춤형 운동/식단 추천"
    ],
    image: "/images/project2.jpg",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    challenges: [
      "개인정보 보안 강화",
      "실시간 데이터 동기화",
      "AI 모델 최적화"
    ],
    solutions: [
      "End-to-End 암호화 적용",
      "실시간 데이터베이스 구축",
      "TensorFlow Lite 경량화 모델 사용"
    ]
  },
  {
    id: 3,
    title: "이커머스 통합 관리 시스템",
    category: "시스템 구축",
    subtitle: "E-commerce Management System",
    description: "다중 쇼핑몰 운영을 위한 통합 관리 시스템. 재고, 주문, 고객 관리를 하나의 플랫폼에서 효율적으로 운영할 수 있습니다.",
    tech: ["Vue.js", "Laravel", "MySQL", "Redis", "Docker"],
    duration: "4개월",
    team: "기획자 1명, 디자이너 1명, 개발자 3명",
    features: [
      "다중 쇼핑몰 통합 관리",
      "실시간 재고 및 주문 관리",
      "고객 데이터 분석 대시보드",
      "자동화된 마케팅 도구"
    ],
    image: "/images/project3.jpg",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    challenges: [
      "대용량 데이터 처리",
      "복잡한 비즈니스 로직 구현",
      "시스템 확장성 확보"
    ],
    solutions: [
      "Redis 캐싱으로 성능 최적화",
      "마이크로서비스 아키텍처 적용",
      "Docker 컨테이너화로 확장성 확보"
    ]
  },
  {
    id: 4,
    title: "에듀테크 학습 플랫폼",
    category: "웹 개발",
    subtitle: "EdTech Learning Platform",
    description: "개인화된 학습 경험을 제공하는 온라인 교육 플랫폼. 학습자의 진도와 이해도를 분석하여 최적의 학습 경로를 제안합니다.",
    tech: ["React", "Django", "PostgreSQL", "WebRTC", "AWS"],
    duration: "5개월",
    team: "기획자 2명, 디자이너 1명, 개발자 3명",
    features: [
      "실시간 화상 강의 시스템",
      "AI 기반 학습 진도 분석",
      "개인 맞춤형 학습 경로 추천",
      "인터랙티브 학습 콘텐츠"
    ],
    image: "/images/project4.jpg",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    challenges: [
      "실시간 화상 통신 안정성",
      "학습 데이터 개인화 알고리즘",
      "대규모 동시 접속 처리"
    ],
    solutions: [
      "WebRTC와 STUN/TURN 서버로 안정적 화상 통신 구현",
      "협업 필터링 기반 추천 시스템 개발",
      "AWS Auto Scaling과 로드 밸런서 활용"
    ]
  },
  {
    id: 5,
    title: "스마트 팩토리 모니터링",
    category: "시스템 구축",
    subtitle: "Smart Factory Monitoring",
    description: "제조업체를 위한 스마트 팩토리 모니터링 시스템. IoT 센서 데이터를 실시간으로 수집하고 분석하여 생산 효율성을 극대화합니다.",
    tech: ["Angular", "Spring Boot", "InfluxDB", "Grafana", "Kubernetes"],
    duration: "6개월",
    team: "기획자 1명, 디자이너 1명, 개발자 4명",
    features: [
      "실시간 생산 라인 모니터링",
      "예측 유지보수 알림 시스템",
      "생산 효율성 분석 대시보드",
      "품질 관리 자동화"
    ],
    image: "/images/project5.jpg",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    challenges: [
      "IoT 센서 데이터 실시간 처리",
      "예측 분석 모델 구축",
      "시스템 확장성 보장"
    ],
    solutions: [
      "InfluxDB를 활용한 시계열 데이터 최적화",
      "머신러닝 기반 예측 모델 개발",
      "Kubernetes 오케스트레이션으로 확장성 확보"
    ]
  },
  {
    id: 6,
    title: "소셜 네트워킹 플랫폼",
    category: "앱 개발",
    subtitle: "Social Networking Platform",
    description: "취미 기반 소셜 네트워킹 앱. 공통 관심사를 가진 사람들을 연결하고, 오프라인 모임을 주선하는 플랫폼입니다.",
    tech: ["Flutter", "Firebase", "Node.js", "MongoDB", "Socket.io"],
    duration: "4개월",
    team: "기획자 1명, 디자이너 2명, 개발자 2명",
    features: [
      "관심사 기반 매칭 알고리즘",
      "실시간 채팅 및 그룹 채팅",
      "위치 기반 모임 추천",
      "이벤트 생성 및 관리 기능"
    ],
    image: "/images/project6.jpg",
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    challenges: [
      "정확한 매칭 알고리즘 개발",
      "위치 기반 서비스 최적화",
      "사용자 안전성 보장"
    ],
    solutions: [
      "코사인 유사도 기반 매칭 알고리즘 구현",
      "GPS와 지오펜싱 기술 활용",
      "신고 시스템과 실명 인증 도입"
    ]
  }
];

const CATEGORIES = ["전체", "웹 개발", "앱 개발", "시스템 구축"];

// 성능 최적화를 위한 스타일 객체들
const cardContainerStyle = {
  perspective: '800px',
  height: '500px',
  willChange: 'transform',
};

const cardInnerStyle = {
  position: 'relative' as const,
  width: '100%',
  height: '100%',
  transformStyle: 'preserve-3d' as const,
  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  willChange: 'transform'
};

const cardFrontStyle = {
  position: 'absolute' as const,
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden' as const,
  background: '#1a1d29',
  borderRadius: 24,
  overflow: 'hidden' as const,
  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
};

const cardBackStyle = {
  position: 'absolute' as const,
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden' as const,
  transform: 'rotateY(180deg)',
  background: 'linear-gradient(to bottom, #fff 0%,rgb(180, 211, 254) 100%)',
  borderRadius: 24,
  padding: '40px 30px',
  display: 'flex' as const,
  flexDirection: 'column' as const,
  justifyContent: 'space-between' as const,
  boxShadow: '0 1px 30px rgba(255, 255, 255, 0.5)',
  willChange: 'transform',
};

export default function PortfolioPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [portfolioProjects, setPortfolioProjects] = useState<Portfolio[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  
  // 애니메이션 상태
  const [heroVisible, setHeroVisible] = useState(true);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [ctaVisible, setCTAVisible] = useState(false);
  
  // refs
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  // 로컬스토리지에서 포트폴리오 데이터 로드
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const savedPortfolios = localStorage.getItem('portfolioData');
    if (savedPortfolios) {
      try {
        const parsedPortfolios = JSON.parse(savedPortfolios);
        setPortfolioProjects(parsedPortfolios);
      } catch (error) {
        console.error('포트폴리오 데이터 파싱 오류:', error);
        setPortfolioProjects(DEFAULT_PORTFOLIO_PROJECTS);
      }
    } else {
      // 기본 데이터 사용
      setPortfolioProjects(DEFAULT_PORTFOLIO_PROJECTS);
      localStorage.setItem('portfolioData', JSON.stringify(DEFAULT_PORTFOLIO_PROJECTS));
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === projectsRef.current) setProjectsVisible(true);
            if (entry.target === ctaRef.current) setCTAVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (projectsRef.current) observer.observe(projectsRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);
    
    return () => observer.disconnect();
  }, []);
  
  const fadeInUp = {
    opacity: 0,
    transform: 'translateY(30px)',
    transition: 'all 0.6s ease',
  };
  
  const fadeInUpVisible = {
    opacity: 1,
    transform: 'translateY(0px)',
    transition: 'all 0.6s ease',
  };
  
  const filteredProjects = selectedCategory === "전체" 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === selectedCategory);
  
  const handleProjectClick = (projectId: number) => {
    router.push(`/portfolio/${projectId}`);
  };
  
  const handleProjectInquiry = () => {
    router.push('/contact');
  };

  // 카드 클릭 핸들러 - 모바일과 데스크톱 구분
  const handleCardClick = (projectId: number) => {
    // 모바일과 데스크톱 모두 뒤집기만 작동
    setSelectedProject(selectedProject === projectId ? null : projectId);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', overflow: 'hidden' }}>
      {/* SVG 배경 최상단 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 'auto',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="3200" height="700" viewBox="0 0 3200 700" fill="none" style={{ width: '100%', height: 'auto' }}>
          <g filter="url(#filter0_g_87_42)">
            <path d="M3100 100C2800.59 398.9 2240.96 600 1600 600C959.04 600 399.413 398.9 100 100H3100Z" fill="#0F1115"/>
          </g>
          <defs>
            <filter id="filter0_g_87_42" x="0" y="0" width="3200" height="700" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feTurbulence type="fractalNoise" baseFrequency="0.083333335816860199 0.083333335816860199" numOctaves="3" seed="3377"/>
              <feDisplacementMap in="shape" scale="200" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%"/>
              <feMerge result="effect1_texture_87_42">
                <feMergeNode in="displacedImage"/>
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
      
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
        }}>PORTFOLIO</div>
        <h1 style={{ 
          fontSize: isMobile ? 36 : 64, 
          fontWeight: 800, 
          marginBottom: isMobile ? 24 : 32, 
          background: 'linear-gradient(135deg, #fff 0%, #3182ED 100%)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent' 
        }}>
          우리의 성공 사례
        </h1>
        <div style={{ 
          fontSize: isMobile ? 18 : 40, 
          color: '#A3A3A3', 
          fontWeight: 400, 
          lineHeight: 1.5, 
          maxWidth: isMobile ? 320 : 800, 
          textShadow: '0 2px 100px #3182ED' 
        }}>
          다양한 분야의 프로젝트를 통해<br />
          축적된 경험과 노하우를<br />
          <span style={{ color: '#3182ED', fontWeight: 600 }}>확인해보세요.</span>
        </div>
      </div>

      {/* 카테고리 필터 */}
      <div style={{ 
        width: '100%', 
        display: 'flex',
        justifyContent: 'center',
        marginBottom: isMobile ? 40 : 80,
        padding: isMobile ? '0 20px' : '0',
        ...(projectsVisible ? fadeInUpVisible : fadeInUp)
      }}>
        <div style={{ 
          display: 'flex', 
          gap: isMobile ? 12 : 20, 
          padding: isMobile ? '8px' : '8px', 
          background: 'rgba(255,255,255,0.05)', 
          borderRadius: isMobile ? 20 : 50, 
          backdropFilter: 'blur(10px)',
          flexWrap: isMobile ? 'wrap' : 'nowrap',
          justifyContent: 'center',
          maxWidth: isMobile ? '100%' : 'auto'
        }}>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: isMobile ? '12px 20px' : '12px 24px',
                borderRadius: isMobile ? 16 : 50,
                border: 'none',
                background: selectedCategory === category 
                  ? 'linear-gradient(135deg, #3182ED 100%, #fff 50%)' 
                  : 'transparent',
                color: selectedCategory === category ? '#fff' : '#A3A3A3',
                fontSize: isMobile ? 16 : 18,
                fontWeight: selectedCategory === category ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                minHeight: isMobile ? 44 : 'auto',
                minWidth: isMobile ? 80 : 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent'
              }}
              onTouchStart={isMobile ? (e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
                e.currentTarget.style.background = selectedCategory === category 
                  ? 'linear-gradient(135deg, #2563eb 100%, #e5e7eb 50%)' 
                  : 'rgba(255,255,255,0.1)';
              } : undefined}
              onTouchEnd={isMobile ? (e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = selectedCategory === category 
                  ? 'linear-gradient(135deg, #3182ED 100%, #fff 50%)' 
                  : 'transparent';
              } : undefined}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid Section */}
      <div ref={projectsRef} style={{ 
        width: '100%', 
        maxWidth: 1400,
        margin: '0 auto',
        padding: isMobile ? '0 20px' : '0 40px',
        marginBottom: isMobile ? 80 : 120
      }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: isMobile ? 20 : 24,
        }}>
          {filteredProjects.map((project, idx) => (
            <div key={project.id} style={{
              ...cardContainerStyle,
              ...(isMobile ? {
                height: 'auto',
                minHeight: '500px'
              } : {}),
              ...(projectsVisible ? {
                opacity: 1,
                transform: 'translate3d(0,0,0)',
              } : {
                opacity: 0,
                transform: 'translate3d(0,30px,0)',
              })
            }}>
              <div 
                style={{
                  ...cardInnerStyle,
                  transform: selectedProject === project.id ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  ...(isMobile ? {
                    height: 'auto',
                    minHeight: '500px'
                  } : {})
                }}
                onClick={() => handleCardClick(project.id)}
              >
                {/* 앞면 */}
                <div style={{
                  ...cardFrontStyle,
                  ...(isMobile ? {
                    borderRadius: 20,
                    minHeight: '500px'
                  } : {})
                }}>
                  {/* 프로젝트 이미지 영역 */}
                  <div style={{
                    height: isMobile ? 200 : 280,
                    background: project.image ? `url(${project.image})` : project.gradient,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {/* 이미지가 없을 때만 카테고리 텍스트 표시 */}
                    {!project.image && (
                      <div style={{
                        fontSize: isMobile ? 24 : 32,
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.9)',
                        textAlign: 'center'
                      }}>
                        {project.category}
                      </div>
                    )}
                    
                    {/* 이미지 오버레이 */}
                    {project.image && (
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)'
                      }} />
                    )}
                    
                    <div style={{
                      position: 'absolute',
                      top: isMobile ? 12 : 20,
                      right: isMobile ? 12 : 20,
                      padding: isMobile ? '4px 8px' : '6px 12px',
                      background: 'rgba(0,0,0,0.6)',
                      backdropFilter: 'blur(6px)',
                      borderRadius: isMobile ? 12 : 16,
                      fontSize: isMobile ? 12 : 14,
                      fontWeight: 400,
                      color: '#fff'
                    }}>
                      {project.duration}
                    </div>
                  </div>
                  
                  {/* 프로젝트 정보 */}
                  <div style={{ 
                    padding: isMobile ? '16px 16px 20px 16px' : '20px 20px 28px 20px' 
                  }}>
                    <div style={{ 
                      fontSize: isMobile ? 12 : 14, 
                      color: '#acacac', 
                      fontWeight: 400, 
                      marginBottom: 4, 
                      letterSpacing: '0.5px' 
                    }}>
                      {project.subtitle}
                    </div>
                    <h3 style={{ 
                      fontSize: isMobile ? 18 : 24, 
                      fontWeight: 600, 
                      marginBottom: isMobile ? 16 : 32, 
                      color: '#fff', 
                      letterSpacing: '-0.5px' 
                    }}>
                      {project.title}
                    </h3>
                    
                    {/* 기술 스택 */}
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: isMobile ? 6 : 8 
                    }}>
                      {project.tech.slice(0, isMobile ? 4 : project.tech.length).map((tech) => (
                        <span key={tech} style={{
                          padding: isMobile ? '4px 8px' : '6px 12px',
                          background: 'rgba(49, 130, 237, 0.1)',
                          border: '1px solid rgba(49, 130, 237, 0.3)',
                          borderRadius: isMobile ? 16 : 20,
                          fontSize: isMobile ? 12 : 14,
                          color: '#3182ED',
                          fontWeight: 500
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* 모바일에서 간단한 설명 추가 */}
                    {isMobile && (
                      <p style={{
                        fontSize: 14,
                        color: '#A3A3A3',
                        lineHeight: 1.4,
                        marginTop: 12,
                        marginBottom: 0
                      }}>
                        {project.description.length > 80 
                          ? project.description.substring(0, 80) + '...' 
                          : project.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* 뒷면 */}
                <div style={{
                  ...cardBackStyle,
                  ...(isMobile ? {
                    padding: '30px 20px',
                    minHeight: '500px'
                  } : {})
                }}>
                  <div>
                    <h3 style={{ 
                      fontSize: isMobile ? 20 : 24, 
                      fontWeight: 800, 
                      marginBottom: 12, 
                      color: '#2a2a2a', 
                      letterSpacing: '-0.5px' 
                    }}>
                      {project.title}
                    </h3>
                    
                    <p style={{ 
                      fontSize: isMobile ? 16 : 18, 
                      color: '#767676', 
                      fontWeight: 400, 
                      lineHeight: 1.5, 
                      marginBottom: isMobile ? 40 : 60, 
                      letterSpacing: '-0.5px'
                    }}>
                      {project.description}
                    </p>                    
                    <div>
                      <div style={{ 
                        fontSize: isMobile ? 16 : 18, 
                        color: '#000', 
                        fontWeight: 800, 
                        marginBottom: 8 
                      }}>주요 기능</div>
                      <ul style={{ margin: 0, paddingLeft: 0 }}>
                        {project.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} style={{ 
                            fontSize: isMobile ? 14 : 16, 
                            color: '#767676', 
                            marginBottom: 2, 
                            letterSpacing: '-0.5px' 
                          }}>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProjectClick(project.id);
                    }}
                    style={{
                      width: '100%',
                      padding: isMobile ? '16px 24px' : '14px 24px',
                      borderRadius: 100,
                      background: '#3182ED',
                      border: 'none',
                      color: '#fff',
                      fontSize: isMobile ? 16 : 16,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out',
                      marginTop: 20,
                      willChange: 'transform',
                      touchAction: 'manipulation',
                      WebkitTapHighlightColor: 'transparent'
                    }}
                    onMouseEnter={!isMobile ? (e) => {
                      e.currentTarget.style.transform = 'translate3d(0,-1px,0)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(49, 130, 237, 0.25)';
                    } : undefined}
                    onMouseLeave={!isMobile ? (e) => {
                      e.currentTarget.style.transform = 'translate3d(0,0,0)';
                      e.currentTarget.style.boxShadow = 'none';
                    } : undefined}
                    onTouchStart={isMobile ? (e) => {
                      e.currentTarget.style.transform = 'scale(0.95)';
                      e.currentTarget.style.background = '#2563eb';
                    } : undefined}
                    onTouchEnd={isMobile ? (e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.background = '#3182ED';
                    } : undefined}
                  >
                    자세히 보기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div ref={ctaRef} style={{
        width: '100%',
        height: isMobile ? 'auto' : '100vh',
        padding: isMobile ? '80px 20px' : '120px 40px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, #000 0%, #0F131B 100%)',
        minHeight: isMobile ? '70vh' : 'auto',
        ...(ctaVisible ? fadeInUpVisible : fadeInUp)
      }}>
        <h2 style={{ 
          fontSize: isMobile ? 32 : 66, 
          fontWeight: 800, 
          marginBottom: isMobile ? 24 : 40, 
          color: '#fff', 
          lineHeight: 1.2, 
          textShadow: '0 2px 300px #3182ED',
          maxWidth: isMobile ? 300 : 'none'
        }}>
          다음 성공 사례의<br />주인공이 되어보세요
        </h2>
        <p style={{ 
          fontSize: isMobile ? 16 : 40, 
          color: '#A3A3A3', 
          marginBottom: isMobile ? 40 : 80, 
          margin: isMobile ? '0 auto 40px' : '0 auto 40px', 
          textShadow: '0 2px 300px #3182ED',
          maxWidth: isMobile ? 280 : 'none',
          lineHeight: 1.4
        }}>
          여러분의 아이디어를 현실로 만들어드리겠습니다.<br />
          지금 바로 프로젝트를 시작해보세요.
        </p>
        <button
          onClick={handleProjectInquiry}
          style={{
            padding: isMobile ? '16px 32px' : '20px 40px',
            borderRadius: 50,
            border: 'none',
            background: 'linear-gradient(135deg, #3182ED 0%, #1e40af 100%)',
            color: '#fff',
            fontSize: isMobile ? 16 : 18,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 1px 100px rgba(49, 130, 237, 0.8)'
          }}
          onMouseEnter={!isMobile ? (e) => {
            e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 30px 60px rgba(49, 130, 237, 0.4)';
          } : undefined}
          onMouseLeave={!isMobile ? (e) => {
            e.currentTarget.style.transform = 'translateY(0px) scale(1)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(49, 130, 237, 0.3)';
          } : undefined}
        >
          프로젝트 문의하기
        </button>
      </div>

      <Footer />
      
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}