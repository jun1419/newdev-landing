"use client";
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import GNB from '../../components/GNB';
import Footer from '../../components/Footer';

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
  images?: string[]; // 추가 이미지들
  overview?: string; // 상세 개요
  results?: string[]; // 프로젝트 결과
}

// 기본 포트폴리오 데이터 (백업용)
const DEFAULT_PORTFOLIO_DATA: Portfolio[] = [
  {
    id: 1,
    title: "핀테크 스타트업 MVP",
    category: "웹 개발",
    subtitle: "Fintech MVP Platform",
    description: "개인 투자자를 위한 포트폴리오 관리 플랫폼. 실시간 데이터 연동과 직관적인 대시보드로 투자 현황을 한눈에 파악할 수 있습니다.",
    overview: "현대 투자자들이 다양한 자산을 효율적으로 관리할 수 있도록 설계된 종합 포트폴리오 관리 플랫폼입니다. 실시간 데이터 처리와 직관적인 UI/UX를 통해 복잡한 투자 정보를 쉽게 이해할 수 있도록 구현했습니다.",
    tech: ["React", "Next.js", "TypeScript", "Chart.js", "Firebase"],
    duration: "2개월",
    team: "기획자 1명, 디자이너 1명, 개발자 2명",
    features: [
      "실시간 주식/코인 데이터 연동",
      "포트폴리오 분석 대시보드",
      "투자 성과 리포트 자동 생성",
      "모바일 반응형 UI/UX"
    ],
    image: "/red-ford-truck.jpg",
    images: [
      "/red-ford-truck.jpg",
      "/images/mobile-mockup.png", 
      "/images/desktop-mockup.png",
      "/images/mobile-mockup.png"
    ],
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
    ],
    results: [
      "사용자 만족도 95% 달성",
      "월 활성 사용자 10,000명 돌파",
      "평균 세션 시간 15분 증가"
    ]
  }
];

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [project, setProject] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (!params.id) return;

    const projectId = parseInt(params.id as string);
    
    // 로컬스토리지에서 포트폴리오 데이터 로드
    const savedPortfolios = localStorage.getItem('portfolioData');
    let portfolios: Portfolio[] = [];
    
    if (savedPortfolios) {
      try {
        portfolios = JSON.parse(savedPortfolios);
      } catch (error) {
        console.error('포트폴리오 데이터 파싱 오류:', error);
        portfolios = DEFAULT_PORTFOLIO_DATA;
      }
    } else {
      portfolios = DEFAULT_PORTFOLIO_DATA;
    }

    const foundProject = portfolios.find(p => p.id === projectId);
    
    if (foundProject) {
      setProject(foundProject);
    } else {
      setError('프로젝트를 찾을 수 없습니다.');
    }
    
    setLoading(false);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [params.id]);

  const handleBackClick = () => {
    router.push('/portfolio');
  };

  const handleContactClick = () => {
    router.push('/contact');
  };

  if (loading) {
    return (
      <>
        <GNB />
        <div style={{
          minHeight: '100vh',
          background: '#0a0a0a',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '18px'
          }}>
            <div style={{
              width: '20px',
              height: '20px',
              border: '2px solid #3182ED',
              borderTop: '2px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            로딩 중...
          </div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <GNB />
        <div style={{
          minHeight: '100vh',
          background: '#0a0a0a',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          padding: '20px'
        }}>
          <div style={{ 
            fontSize: isMobile ? '20px' : '24px', 
            fontWeight: '600',
            textAlign: 'center'
          }}>
            {error || '프로젝트를 찾을 수 없습니다.'}
          </div>
          <button
            onClick={handleBackClick}
            style={{
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #3182ED 0%, #1e40af 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(49, 130, 237, 0.3)'
            }}
          >
            포트폴리오로 돌아가기
          </button>
        </div>
      </>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <>
      <GNB />
      
      {/* 뒤로가기 버튼 */}
      <button
        onClick={handleBackClick}
        style={{
          position: 'fixed',
          top: isMobile ? '80px' : '100px',
          left: isMobile ? '20px' : '40px',
          zIndex: 1000,
          padding: isMobile ? '10px 14px' : '12px 16px',
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '100px',
          color: '#fff',
          fontSize: isMobile ? '14px' : '16px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: '500'
        }}
      >
        ← 뒤로가기
      </button>

      {/* 메인 이미지-텍스트 섹션 (KGBC 스타일) */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{
          width: '100%',
          background: 'linear-gradient(to bottom, #000 0%, #fff 100%)',
          padding: isMobile ? '100px 0 80px 0' : '120px 0',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '100%',
            margin: '0 auto',
            display: 'column',
            alignItems: 'center',
            gap: '8px',
            justifyContent: 'center',
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          {/* 이미지 섹션 */}
          <motion.div
            variants={itemVariants}
            style={{
              flex: '1',
              position: 'relative',
              height: '540x',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '540px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                priority
              />
            </div>
          </motion.div>

          {/* 텍스트 섹션 */}
          <motion.div
            variants={itemVariants}
            style={{
              flex: '1',
              display: 'flex',
              flexDirection: 'column',
              paddingTop: '40px',
              paddingLeft: '180px',
              paddingRight: '180px',
              gap: '16px',
            }}
          >
            <div>
              <motion.h3
                variants={itemVariants}
                style={{
                  fontSize: '20px',
                  fontWeight: 500,
                  color: '#6B7280',
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  margin: '0 0 8px 0',
                  fontFamily: 'Pretendard',
                }}
              >
                {project.category}
              </motion.h3>
              <motion.h1
                variants={itemVariants}
                style={{
                  fontSize: isMobile ? '32px' : '44px',
                  fontWeight: 700,
                  color: '#fff',
                  lineHeight: '1.2',
                  margin: '0 0 16px 0',
                  fontFamily: 'Pretendard',
                  letterSpacing: '-0.02em',
                }}
              >
                {project.title}
              </motion.h1>
            </div>
            
            <motion.p
              variants={itemVariants}
              style={{
                width: '800px',
                fontSize: '24px',
                fontWeight: 400,
                color: '#a3a3a3',
                lineHeight: '1.4',
                margin: 0,
                fontFamily: 'Pretendard',
              }}
            >
              {project.overview || project.description}
            </motion.p>

            {/* 프로젝트 정보 */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                padding: '24px',
                backgroundColor: '#F9FAFB',
                borderRadius: '16px',
                border: '1px solid #E5E7EB'
              }}
            >
              <div>
                <strong style={{ color: '#374151', fontSize: '14px' }}>기간:</strong>
                <span style={{ color: '#6B7280', marginLeft: '8px' }}>{project.duration}</span>
              </div>
              <div>
                <strong style={{ color: '#374151', fontSize: '14px' }}>팀 구성:</strong>
                <span style={{ color: '#6B7280', marginLeft: '8px' }}>{project.team}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 그라데이션 배경 섹션 (Peppermint 스타일) */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        style={{
          width: '100%',
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: project.gradient,
          overflow: 'hidden',
        }}
      >
        {/* 배경 오버레이 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.1)',
            zIndex: 1,
          }}
        />

        {/* 메인 콘텐츠 */}
        <motion.div
          variants={containerVariants}
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '1200px',
            width: '100%',
            padding: '0 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '40px',
          }}
        >
          {/* 상단 섹션 */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
              marginBottom: '40px',
            }}
          >
            <motion.h3
              variants={itemVariants}
              style={{
                fontSize: '18px',
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.8)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                margin: 0,
                fontFamily: 'Pretendard',
              }}
            >
              주요 기능
            </motion.h3>
            
            <motion.h2
              variants={itemVariants}
              style={{
                fontSize: isMobile ? '48px' : '72px',
                fontWeight: 300,
                color: 'white',
                lineHeight: '1.1',
                margin: 0,
                fontFamily: 'Pretendard',
                letterSpacing: '-0.02em',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              {project.subtitle}
            </motion.h2>
          </motion.div>

          {/* 하단 섹션 */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '100%',
              maxWidth: '900px',
              gap: '60px',
              flexDirection: isMobile ? 'column' : 'row',
            }}
          >
            {/* 왼쪽 - 주요 기능 */}
            <div
              style={{
                flex: '1',
                textAlign: isMobile ? 'center' : 'left',
              }}
            >
              <motion.h3
                variants={itemVariants}
                style={{
                  fontSize: '28px',
                  fontWeight: 600,
                  color: 'white',
                  lineHeight: '1.4',
                  margin: '0 0 24px 0',
                  fontFamily: 'Pretendard',
                }}
              >
                핵심 기능들
              </motion.h3>
              <motion.ul
                variants={itemVariants}
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                {project.features.map((feature, index) => (
                  <li key={index} style={{
                    fontSize: '16px',
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: '1.6',
                    fontFamily: 'Pretendard',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ color: '#00ff88', fontSize: '20px' }}>•</span>
                    {feature}
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* 오른쪽 - 기술 스택 및 버튼 */}
            <div
              style={{
                flex: '1',
                textAlign: isMobile ? 'center' : 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
              }}
            >
              <div>
                <motion.h3
                  variants={itemVariants}
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: 'white',
                    margin: '0 0 16px 0',
                    fontFamily: 'Pretendard',
                  }}
                >
                  사용 기술
                </motion.h3>
                <motion.div
                  variants={itemVariants}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    justifyContent: isMobile ? 'center' : 'flex-start'
                  }}
                >
                  {project.tech.map((tech, index) => (
                    <span key={index} style={{
                      padding: '8px 16px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '20px',
                      fontSize: '14px',
                      color: 'white',
                      fontWeight: '500',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(10px)'
                    }}>
                      {tech}
                    </span>
                  ))}
                </motion.div>
              </div>

              <motion.div
                variants={itemVariants}
                style={{
                  display: 'flex',
                  gap: '16px',
                  flexWrap: 'wrap',
                  justifyContent: isMobile ? 'center' : 'flex-start'
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/contact')}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '30px',
                    background: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontFamily: 'Pretendard',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  문의하기
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBackClick}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '30px',
                    background: 'transparent',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontFamily: 'Pretendard',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  포트폴리오 목록
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      <Footer />
    </>
  );
} 