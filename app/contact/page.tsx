"use client";
import { useState, useEffect, useRef } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    company: ""
  });

  // 애니메이션 상태
  const [heroVisible, setHeroVisible] = useState(false);
  const [contactInfoVisible, setContactInfoVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);

  // Refs for intersection observer
  const heroRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === heroRef.current) setHeroVisible(true);
            if (entry.target === contactInfoRef.current) setContactInfoVisible(true);
            if (entry.target === formRef.current) setFormVisible(true);
            if (entry.target === mapRef.current) setMapVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    if (contactInfoRef.current) observer.observe(contactInfoRef.current);
    if (formRef.current) observer.observe(formRef.current);
    if (mapRef.current) observer.observe(mapRef.current);

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // localStorage에 Contact 폼 데이터 저장
    const contactData = {
      ...form,
      type: 'contact',
      submittedAt: new Date().toISOString()
    };
    
    const existingData = localStorage.getItem("contactFormData");
    const dataArray = existingData ? JSON.parse(existingData) : [];
    dataArray.push(contactData);
    localStorage.setItem("contactFormData", JSON.stringify(dataArray));
    
    setSent(true);
    // 폼 초기화
    setTimeout(() => {
      setForm({ name: "", email: "", message: "", phone: "", company: "" });
      setSent(false);
    }, 3000);
  };

  // 스타일 정의
  const fadeInUp = {
    opacity: 0,
    transform: 'translateY(50px)',
    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  };

  const fadeInUpVisible = {
    opacity: 1,
    transform: 'translateY(0px)',
    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  };

  const scaleIn = {
    opacity: 0,
    transform: 'scale(0.8) rotateX(20deg)',
    transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  };

  const scaleInVisible = {
    opacity: 1,
    transform: 'scale(1) rotateX(0deg)',
    transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "이메일",
      subtitle: "Email",
      value: "contact@newdevs.io",
      description: "24시간 내 답변 보장",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      icon: "📱",
      title: "전화",
      subtitle: "Phone",
      value: "010-9062-4281",
      description: "평일 9시-21시",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#fff', overflow: 'hidden' }}>
      {/* Hero 섹션 */}
      <section 
        ref={heroRef}
        style={{
          height: '100vh',
          background: 'linear-gradient(135deg, #0A0A0A 0%, #1a1a2e 50%, #16213e 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          ...(heroVisible ? fadeInUpVisible : fadeInUp)
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        
        <div style={{ 
          fontSize: 80, 
          fontWeight: 900, 
          letterSpacing: -3, 
          marginBottom: 24, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Contact
        </div>
        
        <div style={{ 
          fontSize: 24, 
          color: '#A3A3A3', 
          textAlign: 'center', 
          maxWidth: 800, 
          lineHeight: 1.6,
          marginBottom: 40
        }}>
          새로운 프로젝트를 시작할 준비가 되셨나요?<br/>
          언제든지 연락주세요. 최고의 솔루션을 제공해드리겠습니다.
        </div>

        <div style={{
          display: 'flex',
          gap: 20,
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <button style={{
            padding: '16px 32px',
            borderRadius: 50,
            background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
            border: 'none',
            color: '#fff',
            fontSize: 18,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
          }}>
            프로젝트 문의하기
          </button>
          <button style={{
            padding: '16px 32px',
            borderRadius: 50,
            background: 'transparent',
            border: '2px solid #3B82F6',
            color: '#3B82F6',
            fontSize: 18,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            포트폴리오 보기
          </button>
        </div>
      </section>

      {/* Contact 정보 섹션 */}
      <section 
        ref={contactInfoRef}
        style={{
          padding: '120px 24px',
          background: 'linear-gradient(180deg, #0A0A0A 0%, #111111 100%)',
          ...(contactInfoVisible ? fadeInUpVisible : fadeInUp)
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ 
            textAlign: 'center', 
            marginBottom: 80 
          }}>
            <h2 style={{ 
              fontSize: 48, 
              fontWeight: 800, 
              marginBottom: 16,
              background: 'linear-gradient(135deg, #fff 0%, #A3A3A3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              연락 방법
            </h2>
            <p style={{ 
              fontSize: 20, 
              color: '#A3A3A3', 
              maxWidth: 600, 
              margin: '0 auto', 
              lineHeight: 1.6 
            }}>
              편하신 연락 수단을 선택해주세요
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 30,
            marginBottom: 60
          }}>
            {contactMethods.map((method, index) => (
              <div
                key={index}
                style={{
                  background: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)',
                  borderRadius: 20,
                  padding: 30,
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                                     border: '1px solid rgba(255, 255, 255, 0.1)',
                   cursor: 'pointer',
                   ...(contactInfoVisible ? {
                     ...scaleInVisible,
                     transitionDelay: `${index * 0.1}s`
                   } : scaleIn)
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.2)';
                  e.currentTarget.style.borderColor = '#3B82F6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: method.gradient,
                  borderRadius: '20px 20px 0 0'
                }} />
                
                <div style={{ fontSize: 48, marginBottom: 16 }}>
                  {method.icon}
                </div>
                
                <h3 style={{ 
                  fontSize: 24, 
                  fontWeight: 700, 
                  marginBottom: 8,
                  color: '#fff'
                }}>
                  {method.title}
                </h3>
                
                <p style={{ 
                  fontSize: 14, 
                  color: '#A3A3A3', 
                  marginBottom: 12,
                  textTransform: 'uppercase',
                  letterSpacing: 1
                }}>
                  {method.subtitle}
                </p>
                
                <p style={{ 
                  fontSize: 18, 
                  fontWeight: 600, 
                  color: '#3B82F6',
                  marginBottom: 8
                }}>
                  {method.value}
                </p>
                
                <p style={{ 
                  fontSize: 14, 
                  color: '#A3A3A3' 
                }}>
                  {method.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact 폼 섹션 */}
      <section 
        ref={formRef}
        style={{
          padding: '120px 24px',
          background: 'linear-gradient(180deg, #111111 0%, #0A0A0A 100%)',
          ...(formVisible ? fadeInUpVisible : fadeInUp)
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ 
            textAlign: 'center', 
            marginBottom: 60 
          }}>
            <h2 style={{ 
              fontSize: 48, 
              fontWeight: 800, 
              marginBottom: 16,
              background: 'linear-gradient(135deg, #fff 0%, #A3A3A3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              프로젝트 문의
            </h2>
            <p style={{ 
              fontSize: 20, 
              color: '#A3A3A3', 
              maxWidth: 600, 
              margin: '0 auto', 
              lineHeight: 1.6 
            }}>
              프로젝트에 대한 자세한 정보를 알려주시면, 맞춤형 제안서를 준비해드리겠습니다.
            </p>
          </div>

          <div style={{
            background: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)',
            borderRadius: 30,
            padding: 50,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
          }}>
            {sent ? (
              <div style={{
                textAlign: 'center',
                padding: 40,
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                borderRadius: 20,
                color: '#fff'
              }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
                  문의가 성공적으로 전송되었습니다!
                </h3>
                <p style={{ fontSize: 16, opacity: 0.9 }}>
                  24시간 내에 답변드리겠습니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                  <input
                    name="name"
                    type="text"
                    placeholder="이름 *"
                    value={form.name}
                    onChange={handleChange}
                    required
                    style={{
                      padding: 20,
                      borderRadius: 15,
                      border: '2px solid rgba(255, 255, 255, 0.1)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#fff',
                      fontSize: 16,
                      transition: 'all 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3B82F6';
                      e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <input
                    name="company"
                    type="text"
                    placeholder="회사명"
                    value={form.company}
                    onChange={handleChange}
                    style={{
                      padding: 20,
                      borderRadius: 15,
                      border: '2px solid rgba(255, 255, 255, 0.1)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#fff',
                      fontSize: 16,
                      transition: 'all 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3B82F6';
                      e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                  <input
                    name="email"
                    type="email"
                    placeholder="이메일 *"
                    value={form.email}
                    onChange={handleChange}
                    required
                    style={{
                      padding: 20,
                      borderRadius: 15,
                      border: '2px solid rgba(255, 255, 255, 0.1)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#fff',
                      fontSize: 16,
                      transition: 'all 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3B82F6';
                      e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="연락처"
                    value={form.phone}
                    onChange={handleChange}
                    style={{
                      padding: 20,
                      borderRadius: 15,
                      border: '2px solid rgba(255, 255, 255, 0.1)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#fff',
                      fontSize: 16,
                      transition: 'all 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3B82F6';
                      e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <textarea
                  name="message"
                  placeholder="프로젝트에 대해 자세히 알려주세요 *"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  style={{
                    padding: 20,
                    borderRadius: 15,
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#fff',
                    fontSize: 16,
                    resize: 'vertical',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3B82F6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />

                <button 
                  type="submit" 
                  style={{
                    padding: '20px 40px',
                    borderRadius: 15,
                    background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(59, 130, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.3)';
                  }}
                >
                  문의 보내기
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 추가 정보 섹션 */}
      <section 
        ref={mapRef}
        style={{
          padding: '120px 24px',
          background: 'linear-gradient(180deg, #0A0A0A 0%, #1a1a2e 100%)',
          ...(mapVisible ? fadeInUpVisible : fadeInUp)
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ 
            textAlign: 'center', 
            marginBottom: 60 
          }}>
            <h2 style={{ 
              fontSize: 48, 
              fontWeight: 800, 
              marginBottom: 16,
              background: 'linear-gradient(135deg, #fff 0%, #A3A3A3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              자주 묻는 질문
            </h2>
          </div>

                               <div style={{
            maxWidth: 900,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 40
          }}>
            {[
              {
                question: "Q1. 프로젝트 기간은 얼마나 걸리나요?",
                answer: [
                  "프로젝트의 복잡도와 기능 범위에 따라 유동적입니다.",
                  "",
                  "웹사이트 기준: 일반적인 기업/서비스 소개 사이트는 2~4주",
                  "",
                  "기능형 웹/앱(MVP): 약 6~10주, 고도화된 앱은 3개월 이상",
                  "",
                  "디자인, 기획, 백엔드 연동 여부에 따라 기간은 달라집니다.",
                  "",
                  "UX 설계 → UI 디자인 → 개발 → 테스팅까지 단계별로 나눠 진행하며, 각 마일스톤에 맞춰 일정을 투명하게 공유합니다."
                ]
              },
              {
                question: "Q2. 개발 비용은 어떻게 산정되나요?",
                answer: [
                  "단순한 정적 사이트부터 복잡한 대시보드 시스템까지 폭넓은 범위를 다루며, 다음 기준으로 견적을 산정합니다.",
                  "",
                  "기능의 복잡도와 인터랙션 수준",
                  "API 연동, 데이터베이스 구조 설계, 관리자 페이지 구성 여부",
                  "반응형 및 디바이스 최적화 범위",
                  "디자인 커스터마이징 및 전환율 최적화 수준",
                  "",
                  "단순 랜딩페이지는 수백만 원 수준부터, 복잡한 기능형 앱은 수천만 원 이상 소요될 수 있습니다.",
                  "",
                  "정확한 금액은 요구사항 정리 후 상세 견적으로 안내드립니다."
                ]
              },
              {
                question: "Q3. 유지보수 및 확장성도 보장되나요?",
                answer: [
                  "프로젝트 완료 후에도 기능 추가, 보안 패치, 성능 개선 등 유지보수 서비스를 제공합니다.",
                  "",
                  "모듈형 구조와 주석 기반 개발로 누구나 구조를 이해하기 쉬우며,",
                  "",
                  "향후 새로운 기능 추가나 스케일 확장도 원활히 대응할 수 있도록 설계합니다.",
                  "",
                  "기술만 구현하는 게 아니라, 안정성과 장기적인 운영까지 고려합니다."
                ]
              },
              {
                question: "Q4. 어떤 기술 스택을 사용하나요?",
                answer: [
                  "다음과 같은 고도화된 풀스택 기술 스택을 기반으로, 성능과 유지보수성을 모두 고려한 개발을 진행합니다.",
                  "",
                  "Frontend: React.js, Next.js, TypeScript, Tailwind CSS",
                  "Backend: Node.js, Express, Python (FastAPI), PostgreSQL, MongoDB",
                  "Authentication & 보안: OAuth2.0, JWT, Session 기반 인증, Rate Limiting, Data Encryption",
                  "인프라/배포: AWS (EC2, S3, RDS), Vercel, Docker, CI/CD (GitHub Actions, GitLab CI)",
                  "디자인 시스템 연동: Figma 기반 컴포넌트 → 개발까지 일관된 흐름 유지",
                  "",
                  "단순 구현이 아닌, 구조 설계부터 사용자 경험까지 고려된 안정적인 시스템을 제공합니다."
                ]
              },
              {
                question: "Q5. 협업 및 커뮤니케이션은 어떻게 이루어지나요?",
                answer: [
                  "기획부터 개발까지 전 과정에서 클라이언트와 긴밀하게 소통하며 진행합니다.",
                  "",
                  "초기 미팅: 요구사항 분석 및 구조 설계",
                  "디자인 공유: Figma를 통한 실시간 코멘트 및 피드백",
                  "개발 진행: Notion을 통한 단계별 진행 상황 공유",
                  "회의 툴: Zoom, Google Meet을 통한 주기적 회의",
                  "",
                  "비전문가도 이해할 수 있도록, 기술적인 내용을 최대한 쉽게 설명드리며 소통합니다."
                ]
              },
              {
                question: "Q6. 데이터와 보안은 안전하게 관리되나요?",
                answer: [
                  "민감한 사용자 데이터가 오가는 서비스일수록 보안은 필수입니다.",
                  "",
                  "SSL/TLS 암호화 통신, XSS/CSRF 대응 로직, 서버 로그 관리",
                  "DB 암호화, 접속 제한 IP 설정, 보안 리포트 주기적 제공",
                  "",
                  "보안은 선택이 아닌 기본입니다. 기업 및 금융 레벨 수준으로 대응합니다."
                ]
              }
            ].map((faq, index) => (
              <div
                key={index}
                style={{
                  background: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)',
                  borderRadius: 20,
                  padding: 40,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                  ...(mapVisible ? {
                    ...scaleInVisible,
                    transitionDelay: `${index * 0.1}s`
                  } : scaleIn)
                }}
              >
                <h3 style={{ 
                  fontSize: 24, 
                  fontWeight: 700, 
                  marginBottom: 24,
                  color: '#3B82F6',
                  lineHeight: 1.4
                }}>
                  {faq.question}
                </h3>
                <div style={{ 
                  fontSize: 16, 
                  color: '#E2E8F0',
                  lineHeight: 1.8
                }}>
                  {faq.answer.map((line, lineIndex) => (
                    <div key={lineIndex} style={{ 
                      marginBottom: line === "" ? 12 : 4,
                      color: '#E2E8F0'
                    }}>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 