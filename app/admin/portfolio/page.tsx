"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
  challenges: string[];
  solutions: string[];
}

// 기본 포트폴리오 데이터
const DEFAULT_PORTFOLIOS: Portfolio[] = [
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
  }
];

const CATEGORIES = ["웹 개발", "앱 개발", "시스템 구축"];

export default function PortfolioAdminPage() {
  const router = useRouter();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Portfolio>>({
    title: '',
    category: '웹 개발',
    subtitle: '',
    description: '',
    tech: [],
    duration: '',
    team: '',
    features: [],
    image: '',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    challenges: [],
    solutions: []
  });
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [challengeInput, setChallengeInput] = useState('');
  const [solutionInput, setSolutionInput] = useState('');

  // 로컬스토리지에서 데이터 로드
  useEffect(() => {
    const savedPortfolios = localStorage.getItem('portfolioData');
    if (savedPortfolios) {
      setPortfolios(JSON.parse(savedPortfolios));
    } else {
      setPortfolios(DEFAULT_PORTFOLIOS);
      localStorage.setItem('portfolioData', JSON.stringify(DEFAULT_PORTFOLIOS));
    }
  }, []);

  // 포트폴리오 저장
  const savePortfolios = (updatedPortfolios: Portfolio[]) => {
    setPortfolios(updatedPortfolios);
    localStorage.setItem('portfolioData', JSON.stringify(updatedPortfolios));
  };

  // 이미지 업로드 처리
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setFormData(prev => ({ ...prev, image: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 배열 아이템 추가
  const addArrayItem = (field: 'tech' | 'features' | 'challenges' | 'solutions', value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] || []), value.trim()]
      }));
      
      // 입력창 초기화
      if (field === 'tech') setTechInput('');
      if (field === 'features') setFeatureInput('');
      if (field === 'challenges') setChallengeInput('');
      if (field === 'solutions') setSolutionInput('');
    }
  };

  // 배열 아이템 제거
  const removeArrayItem = (field: 'tech' | 'features' | 'challenges' | 'solutions', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index)
    }));
  };

  // 편집 시작
  const startEdit = (portfolio: Portfolio) => {
    setIsEditing(true);
    setEditingId(portfolio.id);
    setFormData(portfolio);
  };

  // 새 프로젝트 추가
  const startNew = () => {
    setIsEditing(true);
    setEditingId(null);
    setFormData({
      title: '',
      category: '웹 개발',
      subtitle: '',
      description: '',
      tech: [],
      duration: '',
      team: '',
      features: [],
      image: '',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      challenges: [],
      solutions: []
    });
  };

  // 저장
  const handleSave = () => {
    if (!formData.title || !formData.description) {
      alert('제목과 설명은 필수입니다.');
      return;
    }

    const newPortfolio: Portfolio = {
      id: editingId || Date.now(),
      title: formData.title || '',
      category: formData.category || '웹 개발',
      subtitle: formData.subtitle || '',
      description: formData.description || '',
      tech: formData.tech || [],
      duration: formData.duration || '',
      team: formData.team || '',
      features: formData.features || [],
      image: formData.image || '',
      gradient: formData.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      challenges: formData.challenges || [],
      solutions: formData.solutions || []
    };

    let updatedPortfolios;
    if (editingId) {
      // 수정
      updatedPortfolios = portfolios.map(p => p.id === editingId ? newPortfolio : p);
    } else {
      // 추가
      updatedPortfolios = [...portfolios, newPortfolio];
    }

    savePortfolios(updatedPortfolios);
    setIsEditing(false);
    setEditingId(null);
    alert('저장되었습니다!');
  };

  // 삭제
  const handleDelete = (id: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const updatedPortfolios = portfolios.filter(p => p.id !== id);
      savePortfolios(updatedPortfolios);
    }
  };

  // 취소
  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', padding: '40px' }}>
      {/* 헤더 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '40px',
        borderBottom: '1px solid #333',
        paddingBottom: '20px'
      }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>
            포트폴리오 관리
          </h1>
          <p style={{ color: '#888', fontSize: '16px' }}>
            포트폴리오를 추가, 수정, 삭제할 수 있습니다.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => router.push('/portfolio')}
            style={{
              padding: '12px 24px',
              background: '#333',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            포트폴리오 보기
          </button>
          <button
            onClick={startNew}
            style={{
              padding: '12px 24px',
              background: '#3182ED',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            새 프로젝트 추가
          </button>
        </div>
      </div>

      {isEditing ? (
        /* 편집 폼 */
        <div style={{ 
          background: '#1a1a1a', 
          padding: '32px', 
          borderRadius: '12px',
          marginBottom: '40px'
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>
            {editingId ? '프로젝트 수정' : '새 프로젝트 추가'}
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '24px' 
          }}>
            {/* 기본 정보 */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>제목 *</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#333',
                  border: '1px solid #555',
                  borderRadius: '6px',
                  color: '#fff',
                  marginBottom: '16px'
                }}
              />

              <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>부제목</label>
              <input
                type="text"
                value={formData.subtitle || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#333',
                  border: '1px solid #555',
                  borderRadius: '6px',
                  color: '#fff',
                  marginBottom: '16px'
                }}
              />

              <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>카테고리</label>
              <select
                value={formData.category || '웹 개발'}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#333',
                  border: '1px solid #555',
                  borderRadius: '6px',
                  color: '#fff',
                  marginBottom: '16px'
                }}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>기간</label>
              <input
                type="text"
                value={formData.duration || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#333',
                  border: '1px solid #555',
                  borderRadius: '6px',
                  color: '#fff',
                  marginBottom: '16px'
                }}
                placeholder="예: 3개월"
              />

              <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>팀 구성</label>
              <input
                type="text"
                value={formData.team || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, team: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#333',
                  border: '1px solid #555',
                  borderRadius: '6px',
                  color: '#fff',
                  marginBottom: '16px'
                }}
                placeholder="예: 기획자 1명, 디자이너 1명, 개발자 2명"
              />
            </div>

            {/* 상세 정보 */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>설명 *</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#333',
                  border: '1px solid #555',
                  borderRadius: '6px',
                  color: '#fff',
                  marginBottom: '16px',
                  resize: 'vertical'
                }}
              />

              <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>그라디언트</label>
              <input
                type="text"
                value={formData.gradient || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, gradient: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#333',
                  border: '1px solid #555',
                  borderRadius: '6px',
                  color: '#fff',
                  marginBottom: '16px'
                }}
                placeholder="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              />

              <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>이미지 업로드</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#333',
                  border: '1px solid #555',
                  borderRadius: '6px',
                  color: '#fff',
                  marginBottom: '16px'
                }}
              />
              {formData.image && (
                <img 
                  src={formData.image} 
                  alt="preview" 
                  style={{ 
                    width: '100px', 
                    height: '60px', 
                    objectFit: 'cover', 
                    borderRadius: '6px',
                    marginBottom: '16px'
                  }} 
                />
              )}
            </div>
          </div>

          {/* 기술 스택 */}
          <div style={{ marginTop: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>기술 스택</label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addArrayItem('tech', techInput)}
                placeholder="기술 입력 후 엔터"
                style={{
                  flex: 1,
                  padding: '8px',
                  background: '#333',
                  border: '1px solid #555',
                  borderRadius: '4px',
                  color: '#fff'
                }}
              />
              <button
                onClick={() => addArrayItem('tech', techInput)}
                style={{
                  padding: '8px 16px',
                  background: '#3182ED',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                추가
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '24px' }}>
              {(formData.tech || []).map((tech, index) => (
                <span key={index} style={{
                  padding: '4px 8px',
                  background: '#555',
                  borderRadius: '12px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  {tech}
                  <button
                    onClick={() => removeArrayItem('tech', index)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ff6b6b',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* 주요 기능 */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>주요 기능</label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addArrayItem('features', featureInput)}
                placeholder="기능 입력 후 엔터"
                style={{
                  flex: 1,
                  padding: '8px',
                  background: '#333',
                  border: '1px solid #555',
                  borderRadius: '4px',
                  color: '#fff'
                }}
              />
              <button
                onClick={() => addArrayItem('features', featureInput)}
                style={{
                  padding: '8px 16px',
                  background: '#3182ED',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                추가
              </button>
            </div>
            <div style={{ overflowY: 'auto', marginBottom: '24px' }}>
              {(formData.features || []).map((feature, index) => (
                <div key={index} style={{
                  padding: '4px 8px',
                  background: '#555',
                  borderRadius: '4px',
                  fontSize: '12px',
                  marginBottom: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>{feature}</span>
                  <button
                    onClick={() => removeArrayItem('features', index)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ff6b6b',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 저장/취소 버튼 */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleSave}
              style={{
                padding: '12px 24px',
                background: '#10B981',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              저장
            </button>
            <button
              onClick={handleCancel}
              style={{
                padding: '12px 24px',
                background: '#6B7280',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        /* 포트폴리오 목록 */
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
          gap: '24px' 
        }}>
          {portfolios.map(portfolio => (
            <div key={portfolio.id} style={{
              background: '#1a1a1a',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #333'
            }}>
              {/* 이미지/그라디언트 미리보기 */}
              <div style={{
                height: '150px',
                background: portfolio.image ? `url(${portfolio.image})` : portfolio.gradient,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {!portfolio.image && (
                  <div style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: 'rgba(255,255,255,0.9)'
                  }}>
                    {portfolio.category}
                  </div>
                )}
              </div>

              {/* 내용 */}
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '14px', color: '#888', marginBottom: '4px' }}>
                  {portfolio.subtitle}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
                  {portfolio.title}
                </h3>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#ccc', 
                  lineHeight: '1.4',
                  marginBottom: '16px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {portfolio.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '16px' }}>
                  {portfolio.tech.slice(0, 3).map((tech, index) => (
                    <span key={index} style={{
                      padding: '2px 8px',
                      background: 'rgba(49, 130, 237, 0.2)',
                      borderRadius: '12px',
                      fontSize: '11px',
                      color: '#3182ED'
                    }}>
                      {tech}
                    </span>
                  ))}
                  {portfolio.tech.length > 3 && (
                    <span style={{ fontSize: '11px', color: '#888' }}>
                      +{portfolio.tech.length - 3}개
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => startEdit(portfolio)}
                    style={{
                      flex: 1,
                      padding: '8px 16px',
                      background: '#3182ED',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(portfolio.id)}
                    style={{
                      flex: 1,
                      padding: '8px 16px',
                      background: '#DC2626',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 