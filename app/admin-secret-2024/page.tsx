"use client";

import { useEffect, useState } from "react";

interface EstimateFormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  services: Record<string, boolean>;
  otherService: string;
  budget: string;
  startDate: string;
  endDate: string;
  projectDescription: string;
  referenceUrl: string;
  files: string[];
  submittedAt: string;
  type: 'estimate';
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  phone: string;
  company: string;
  submittedAt: string;
  type: 'contact';
}

type FormData = EstimateFormData | ContactFormData;

export default function AdminPage() {
  const [estimateData, setEstimateData] = useState<EstimateFormData[]>([]);
  const [contactData, setContactData] = useState<ContactFormData[]>([]);
  const [activeTab, setActiveTab] = useState<'estimate' | 'contact'>('estimate');
  const [selectedItem, setSelectedItem] = useState<FormData | null>(null);

  useEffect(() => {
    // 견적 폼 데이터 로드
    const savedEstimate = localStorage.getItem("estimateFormData");
    if (savedEstimate) {
      setEstimateData(JSON.parse(savedEstimate));
    }

    // Contact 폼 데이터 로드
    const savedContact = localStorage.getItem("contactFormData");
    if (savedContact) {
      setContactData(JSON.parse(savedContact));
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getServiceLabels = (services: Record<string, boolean>, otherService: string) => {
    const serviceMap: Record<string, string> = {
      website: '웹 개발',
      app: '앱 개발',
      maintenance: '유지보수',
      system: '시스템구축',
      other: '기타'
    };

    const selectedServices = Object.entries(services)
      .filter(([_, v]) => v)
      .map(([k]) => serviceMap[k] || k);

    if (otherService) {
      selectedServices.push(`기타: ${otherService}`);
    }

    return selectedServices.join(', ');
  };

  const getBudgetLabel = (budget: string) => {
    const budgetMap: Record<string, string> = {
      under500: '1000만 원 이하',
      '500to1000': '1000~2,000만 원',
      '1000to3000': '2,000~5,000만 원',
      over3000: '5,000만 원 이상',
      undecided: '아직 정해지지 않음'
    };
    return budgetMap[budget] || budget;
  };

  const currentData = activeTab === 'estimate' ? estimateData : contactData;
  const totalCount = estimateData.length + contactData.length;

  return (
    <div style={{ padding: 40, background: "#0A0A0A", minHeight: "100vh", color: "#fff" }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700 }}>뉴데브 관리자 페이지</h1>
          <div style={{ 
            background: '#232833', 
            padding: '8px 16px', 
            borderRadius: 8,
            color: '#94A3B8',
            fontSize: 14
          }}>
            총 {totalCount}건의 문의
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div style={{ 
          display: 'flex', 
          marginBottom: 24,
          background: '#181C23',
          borderRadius: 12,
          padding: 4
        }}>
          <button
            onClick={() => {
              setActiveTab('estimate');
              setSelectedItem(null);
            }}
            style={{
              flex: 1,
              padding: '12px 24px',
              borderRadius: 8,
              border: 'none',
              background: activeTab === 'estimate' ? '#3B82F6' : 'transparent',
              color: activeTab === 'estimate' ? '#fff' : '#94A3B8',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            프로젝트 견적 ({estimateData.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('contact');
              setSelectedItem(null);
            }}
            style={{
              flex: 1,
              padding: '12px 24px',
              borderRadius: 8,
              border: 'none',
              background: activeTab === 'contact' ? '#3B82F6' : 'transparent',
              color: activeTab === 'contact' ? '#fff' : '#94A3B8',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            일반 문의 ({contactData.length})
          </button>
        </div>

        {currentData.length === 0 ? (
          <div style={{ 
            padding: 40, 
            background: "#181C23", 
            borderRadius: 12, 
            textAlign: 'center',
            color: '#94A3B8'
          }}>
            {activeTab === 'estimate' ? '제출된 견적 신청이 없습니다.' : '제출된 문의가 없습니다.'}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 24 }}>
            {/* 목록 */}
            <div style={{ flex: 1, background: "#181C23", borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ 
                padding: 16, 
                background: "#232833", 
                borderBottom: '1px solid #2D3748',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontWeight: 600 }}>
                  {activeTab === 'estimate' ? '견적 신청 목록' : '문의 목록'}
                </span>
                <span style={{ color: '#94A3B8' }}>총 {currentData.length}건</span>
              </div>
              <div style={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
                {currentData.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedItem(item)}
                    style={{
                      padding: 16,
                      borderBottom: '1px solid #2D3748',
                      cursor: 'pointer',
                      background: selectedItem === item ? '#232F47' : 'transparent',
                      transition: 'background 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontWeight: 600 }}>
                        {item.type === 'estimate' 
                          ? (item as EstimateFormData).companyName
                          : (item as ContactFormData).name + (item as ContactFormData).company ? ` (${(item as ContactFormData).company})` : ''
                        }
                      </span>
                      <span style={{ color: '#94A3B8', fontSize: 14 }}>{formatDate(item.submittedAt)}</span>
                    </div>
                    <div style={{ color: '#94A3B8', fontSize: 14 }}>
                      {item.type === 'estimate' 
                        ? `${(item as EstimateFormData).contactName} · ${(item as EstimateFormData).phone}`
                        : `${(item as ContactFormData).email} · ${(item as ContactFormData).phone || '연락처 없음'}`
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 상세 정보 */}
            <div style={{ flex: 2, background: "#181C23", borderRadius: 12, padding: 24 }}>
              {selectedItem ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <h2 style={{ fontSize: 24, fontWeight: 600 }}>상세 정보</h2>
                    <div style={{
                      padding: '4px 12px',
                      borderRadius: 20,
                      background: selectedItem.type === 'estimate' ? '#10B981' : '#3B82F6',
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 600
                    }}>
                      {selectedItem.type === 'estimate' ? '견적 신청' : '일반 문의'}
                    </div>
                  </div>

                  {selectedItem.type === 'estimate' ? (
                    // 견적 신청 상세 정보
                    <div style={{ display: 'grid', gap: 24 }}>
                      <div>
                        <h3 style={{ color: '#94A3B8', marginBottom: 8 }}>기본 정보</h3>
                        <div style={{ 
                          background: '#232833', 
                          borderRadius: 8, 
                          padding: 16,
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: 16
                        }}>
                          <div>
                            <div style={{ color: '#94A3B8', fontSize: 14, marginBottom: 4 }}>회사명</div>
                            <div>{(selectedItem as EstimateFormData).companyName}</div>
                          </div>
                          <div>
                            <div style={{ color: '#94A3B8', fontSize: 14, marginBottom: 4 }}>담당자</div>
                            <div>{(selectedItem as EstimateFormData).contactName}</div>
                          </div>
                          <div>
                            <div style={{ color: '#94A3B8', fontSize: 14, marginBottom: 4 }}>이메일</div>
                            <div>{(selectedItem as EstimateFormData).email}</div>
                          </div>
                          <div>
                            <div style={{ color: '#94A3B8', fontSize: 14, marginBottom: 4 }}>전화번호</div>
                            <div>{(selectedItem as EstimateFormData).phone}</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 style={{ color: '#94A3B8', marginBottom: 8 }}>프로젝트 정보</h3>
                        <div style={{ 
                          background: '#232833', 
                          borderRadius: 8, 
                          padding: 16,
                          display: 'grid',
                          gap: 16
                        }}>
                          <div>
                            <div style={{ color: '#94A3B8', fontSize: 14, marginBottom: 4 }}>서비스</div>
                            <div>{getServiceLabels((selectedItem as EstimateFormData).services, (selectedItem as EstimateFormData).otherService)}</div>
                          </div>
                          <div>
                            <div style={{ color: '#94A3B8', fontSize: 14, marginBottom: 4 }}>예산</div>
                            <div>{getBudgetLabel((selectedItem as EstimateFormData).budget)}</div>
                          </div>
                          <div>
                            <div style={{ color: '#94A3B8', fontSize: 14, marginBottom: 4 }}>프로젝트 설명</div>
                            <div style={{ 
                              whiteSpace: 'pre-wrap', 
                              lineHeight: 1.6,
                              color: '#E2E8F0'
                            }}>
                              {(selectedItem as EstimateFormData).projectDescription}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Contact 문의 상세 정보
                    <div style={{ display: 'grid', gap: 24 }}>
                      <div>
                        <h3 style={{ color: '#94A3B8', marginBottom: 8 }}>문의자 정보</h3>
                        <div style={{ 
                          background: '#232833', 
                          borderRadius: 8, 
                          padding: 16,
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: 16
                        }}>
                          <div>
                            <div style={{ color: '#94A3B8', fontSize: 14, marginBottom: 4 }}>이름</div>
                            <div>{(selectedItem as ContactFormData).name}</div>
                          </div>
                          <div>
                            <div style={{ color: '#94A3B8', fontSize: 14, marginBottom: 4 }}>회사명</div>
                            <div>{(selectedItem as ContactFormData).company || '미입력'}</div>
                          </div>
                          <div>
                            <div style={{ color: '#94A3B8', fontSize: 14, marginBottom: 4 }}>이메일</div>
                            <div>{(selectedItem as ContactFormData).email}</div>
                          </div>
                          <div>
                            <div style={{ color: '#94A3B8', fontSize: 14, marginBottom: 4 }}>연락처</div>
                            <div>{(selectedItem as ContactFormData).phone || '미입력'}</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 style={{ color: '#94A3B8', marginBottom: 8 }}>문의 내용</h3>
                        <div style={{ 
                          background: '#232833', 
                          borderRadius: 8, 
                          padding: 16
                        }}>
                          <div style={{ 
                            whiteSpace: 'pre-wrap', 
                            lineHeight: 1.6,
                            color: '#E2E8F0'
                          }}>
                            {(selectedItem as ContactFormData).message}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 style={{ color: '#94A3B8', marginBottom: 8 }}>빠른 응답</h3>
                        <div style={{ display: 'flex', gap: 12 }}>
                          <button
                            onClick={() => {
                              const email = (selectedItem as ContactFormData).email;
                              window.open(`mailto:${email}?subject=뉴데브 문의 답변&body=안녕하세요 ${(selectedItem as ContactFormData).name}님,%0A%0A문의해주셔서 감사합니다.%0A%0A`);
                            }}
                            style={{
                              padding: '8px 16px',
                              borderRadius: 6,
                              background: '#3B82F6',
                              border: 'none',
                              color: '#fff',
                              fontSize: 14,
                              cursor: 'pointer'
                            }}
                          >
                            📧 이메일 답변
                          </button>
                          {(selectedItem as ContactFormData).phone && (
                            <button
                              onClick={() => {
                                window.open(`tel:${(selectedItem as ContactFormData).phone}`);
                              }}
                              style={{
                                padding: '8px 16px',
                                borderRadius: 6,
                                background: '#10B981',
                                border: 'none',
                                color: '#fff',
                                fontSize: 14,
                                cursor: 'pointer'
                              }}
                            >
                              📱 전화하기
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#94A3B8'
                }}>
                  왼쪽에서 항목을 선택해주세요
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 