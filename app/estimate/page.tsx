'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import GNB from '../components/GNB';

// 폼 사이즈 및 패딩 변수
const FORM_MAX_WIDTH = 600;
const FORM_PADDING = '0px';
const FORM_RADIUS = 24;

const FLOAT_ANIMATION = `
@keyframes dropDown {
  0% { transform: translateY(-100px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}`;

const EstimatePage = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    services: {
      website: false,
      app: false,
      system: false,
      maintenance: false,
      other: false
    },
    otherService: '',
    budget: '',
    startDate: '',
    endDate: '',
    projectDescription: '',
    referenceUrl: '',
    files: [] as File[]
  });

  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // 애니메이션 스타일 삽입
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = FLOAT_ANIMATION;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 제출 시간 추가
    const formDataWithTime = {
      ...formData,
      submittedAt: new Date().toISOString()
    };

    // 기존 데이터 불러오기
    const prev = JSON.parse(localStorage.getItem("estimateFormData") || "[]");
    localStorage.setItem("estimateFormData", JSON.stringify([...prev, formDataWithTime]));

    // 이메일 알림 전송
    try {
      const response = await fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithTime),
      });

      if (!response.ok) {
        throw new Error('이메일 전송에 실패했습니다.');
      }

      alert("견적이 정상적으로 제출되었습니다!");
    } catch (error) {
      console.error('이메일 전송 중 오류 발생:', error);
      alert("견적은 제출되었으나, 알림 전송에 실패했습니다.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        files: Array.from(e.target.files || [])
      }));
    }
  };

  // 서비스 버튼 목록
  const serviceButtons = [
    { id: 'website', label: '웹 개발' },
    { id: 'app', label: '앱 개발' },
    { id: 'maintenance', label: '유지보수' },
    { id: 'system', label: '시스템구축' },
    { id: 'other', label: '기타' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <GNB />
      <div style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 180, // GNB와 겹치지 않게 상단 여백
      }}>
        {/* 우측 벽 중앙에 고정된 배경 이미지 */}
        <div
          ref={bgRef}
          style={{
            position: 'fixed',
            right: 0,
            top: '10%',
            width: 300,
            height: 300,
            zIndex: 0,
            pointerEvents: 'none',
            animation: 'dropDown 1s ease-out forwards',
          }}
        >
          <img src="/Object.png" alt="Object" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        {/* 타이틀 */}
        <div style={{
          textAlign: 'center',
          fontSize: 48,
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: '-0.96px',
          color: '#fff',
          marginBottom: 120,
          paddingTop: 40,
          zIndex: 1,
        }}>
          진짜 도움이 되는<br />파트너를 찾고 계신가요?
        </div>
        {/* 폼 */}
        <form onSubmit={handleSubmit} style={{ width: '100%', zIndex: 1, backgroundColor: '#0F131B', padding: '80px 500px', borderRadius: 60 }} className="flex flex-col gap-6">
          {/* 회사명 */}
          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-gray-400 font-medium">회사명</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={e => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
              placeholder="회사명을 입력하세요"
              className="w-full px-4 h-[52px] bg-[#232833] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white placeholder-gray-500"
            />
          </div>
          {/* 담당자 이름 */}
          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-gray-400 font-medium">담당자 이름</label>
            <input
              type="text"
              value={formData.contactName}
              onChange={e => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
              placeholder="이름을 입력하세요"
              className="w-full px-4 h-[52px] bg-[#232833] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white placeholder-gray-500"
            />
          </div>
          {/* 전화번호 */}
          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-gray-400 font-medium">전화번호</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="전화번호를 입력해주세요"
              className="w-full px-4 h-[52px] bg-[#232833] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white placeholder-gray-500"
            />
          </div>
          {/* 이메일 */}
          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-gray-400 font-medium">이메일</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="newdev@email.com"
              className="w-full px-4 h-[52px] bg-[#232833] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white placeholder-gray-500"
            />
          </div>
          {/* 서비스 영역 - 버튼 스타일 */}
          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-gray-400 font-medium">서비스 영역</label>
            <div className="flex flex-wrap gap-3">
              {serviceButtons.map(service => (
                <button
                  type="button"
                  key={service.id}
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    services: {
                      ...prev.services,
                      [service.id]: !prev.services[service.id as keyof typeof prev.services]
                    }
                  }))}
                  style={{
                    padding: '12px 24px',
                    borderRadius: 10,
                    border: formData.services[service.id as keyof typeof formData.services] ? '2px solid #3182ED' : '2px solid #232833',
                    background: formData.services[service.id as keyof typeof formData.services] ? '#232F47' : '#232833',
                    color: formData.services[service.id as keyof typeof formData.services] ? '#fff' : '#fff',
                    fontWeight: 500,
                    fontSize: 14,
                    transition: 'all 0.15s',
                    cursor: 'pointer',
                  }}
                >
                  {service.label}
                </button>
              ))}
            </div>
            {/* 기타 선택 시 인풋 노출 */}
            {formData.services.other && (
              <input
                type="text"
                value={formData.otherService}
                onChange={e => setFormData(prev => ({ ...prev, otherService: e.target.value }))}
                placeholder="기타 서비스를 입력해주세요"
                className="w-full px-4 h-[52px] bg-[#232833] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white placeholder-gray-500 mt-2"
              />
            )}
          </div>
          {/* 프로젝트 예산 */}
          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-gray-400 font-medium">프로젝트 예산</label>
            <select
              value={formData.budget}
              onChange={e => setFormData(prev => ({ ...prev, budget: e.target.value }))}
              className="w-full px-4 h-[52px] bg-[#232833] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
            >
              <option value="">예산을 선택해주세요</option>
              <option value="under500">1000만 원 이하</option>
              <option value="500to1000">1000~2,000만 원</option>
              <option value="1000to3000">2,000~5,000만 원</option>
              <option value="over3000">5,000만 원 이상</option>
              <option value="undecided">아직 정해지지 않음</option>
            </select>
          </div>
          {/* 기획서 첨부 */}
          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-gray-400 font-medium">기획서 첨부 (선택)</label>
            <div className="relative">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="w-full px-4 h-[52px] bg-[#232833] rounded-lg flex items-center justify-between text-white border-2 border-dashed border-gray-600 hover:border-blue-500 transition-colors">
                <span className="text-gray-400">파일을 선택하거나 여기에 끌어다 놓으세요</span>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  파일 선택
                </button>
              </div>
            </div>
          </div>
          {/* 프로젝트 요약 설명 */}
          <div className="flex flex-col gap-2">
            <label className="text-[18px] text-gray-400 font-medium">프로젝트 요약 설명</label>
            <textarea
              value={formData.projectDescription}
              onChange={e => setFormData(prev => ({ ...prev, projectDescription: e.target.value }))}
              placeholder="프로젝트를 간략하게 설명해주세요"
              rows={4}
              className="w-full px-4 py-3 bg-[#232833] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white placeholder-gray-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors mt-4"
          >
            프로젝트 견적받기
          </button>
        </form>
      </div>
    </div>
  );
};

export default EstimatePage; 