"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const GNB = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 모바일 메뉴 토글
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // 메뉴 클릭 시 모바일 메뉴 닫기
  const handleMenuClick = () => {
    setIsMobileMenuOpen(false);
  };

  // 배경 클릭 시 메뉴 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <style>{`
        .gnb-logo {
          cursor: pointer;
          user-select: none;
          text-decoration: none;
        }
        .gnb-menu {
          color: #94A3B8;
          font-family: "Pretendard", sans-serif;
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          line-height: 140%;
          letter-spacing: -0.32px;
          text-decoration: none;
          transition: color 0.2s;
          padding-bottom: 2px;
          border-bottom: 2px solid transparent;
          display: block;
        }
        .gnb-menu:hover {
          color: #3182ED;
        }
        .gnb-menu.active {
          color: #3182ED;
          border-bottom: 2px solid #3182ED;
        }
        .gnb-cta {
          display: flex;
          padding: 8px 20px;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          background: linear-gradient(80deg, #3182ED 0%, #0F131B 100%);
          color: #fff;
          border: none;
          font-weight: 600;
          font-size: 14px;
          font-family: "Pretendard", sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          min-height: 40px;
        }
        .gnb-cta:hover {
          background: linear-gradient(260deg, #3182ED 0%, #0F131B 100%);
          transform: translateY(-1px);
        }
        
        /* 햄버거 메뉴 */
        .hamburger {
          display: none;
          flex-direction: column;
          cursor: pointer;
          padding: 8px;
          border-radius: 4px;
          transition: all 0.3s ease;
          position: relative;
          z-index: 102;
        }
        .hamburger:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .hamburger span {
          width: 22px;
          height: 2px;
          background: #fff;
          margin: 2.4px 0;
          transition: all 0.3s ease;
          border-radius: 2px;
        }
        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }
        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }
        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }
        
        /* 모바일 반응형 */
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .hamburger {
            display: flex !important;
          }
          .gnb-cta-desktop {
            display: none !important;
          }
        }
        
        /* 사이드 메뉴 배경 */
        .side-menu-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          z-index: 150;
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .side-menu-backdrop.active {
          opacity: 1;
          visibility: visible;
        }
        
        /* 사이드 메뉴 */
        .side-menu {
          position: fixed;
          top: 0;
          right: -350px;
          width: 320px;
          height: 100vh;
          background: linear-gradient(135deg, 
            rgba(15, 23, 42, 0.95) 0%, 
            rgba(30, 41, 59, 0.95) 50%, 
            rgba(15, 23, 42, 0.95) 100%);
          backdrop-filter: blur(20px);
          border-left: 1px solid rgba(148, 163, 184, 0.2);
          z-index: 200;
          transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          padding: 0;
          box-shadow: -10px 0 40px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }
        
        .side-menu::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, 
            rgba(49, 130, 237, 0.03) 0%, 
            transparent 50%, 
            rgba(49, 130, 237, 0.03) 100%);
          pointer-events: none;
        }
        
        @media (max-width: 768px) {
          .side-menu {
            top: 0;
            height: 100vh;
          }
        }
        
        .side-menu.active {
          right: 0;
        }
        
        /* 사이드 메뉴 헤더 */
        .side-menu-header {
          padding: 32px 24px 24px 24px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.15);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(90deg, 
            rgba(49, 130, 237, 0.1) 0%, 
            rgba(15, 23, 42, 0.1) 100%);
          position: relative;
        }
        
        .side-menu-header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 24px;
          right: 24px;
          height: 1px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(49, 130, 237, 0.5) 50%, 
            transparent 100%);
        }
        
        /* 사이드 메뉴 네비게이션 */
        .side-menu-nav {
          padding: 40px 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .side-menu .gnb-menu {
          font-size: 18px;
          font-weight: 500;
          padding: 16px 20px;
          border-bottom: none;
          border-radius: 12px;
          margin-bottom: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .side-menu .gnb-menu::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(49, 130, 237, 0.1) 50%, 
            transparent 100%);
          transition: left 0.5s ease;
        }
        
        .side-menu .gnb-menu:hover::before {
          left: 100%;
        }
        
        .side-menu .gnb-menu:hover {
          background: rgba(49, 130, 237, 0.15);
          color: #60A5FA;
          transform: translateX(8px);
          box-shadow: 0 4px 20px rgba(49, 130, 237, 0.2);
        }
        
        .side-menu .gnb-menu.active {
          background: linear-gradient(135deg, 
            rgba(49, 130, 237, 0.2) 0%, 
            rgba(49, 130, 237, 0.1) 100%);
          color: #60A5FA;
          border: 1px solid rgba(49, 130, 237, 0.3);
          transform: translateX(8px);
          box-shadow: 0 4px 20px rgba(49, 130, 237, 0.25);
        }
        
        /* 메뉴 아이콘 */
        .menu-icon {
          width: 20px;
          height: 20px;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }
        
        .side-menu .gnb-menu:hover .menu-icon,
        .side-menu .gnb-menu.active .menu-icon {
          opacity: 1;
        }
        
        /* 사이드 메뉴 CTA */
        .side-menu-footer {
          padding: 24px;
          border-top: 1px solid rgba(148, 163, 184, 0.15);
          background: linear-gradient(90deg, 
            rgba(15, 23, 42, 0.8) 0%, 
            rgba(30, 41, 59, 0.8) 100%);
        }
        
        .side-menu .gnb-cta {
          width: 100%;
          padding: 16px 24px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 12px;
          margin: 0;
          background: linear-gradient(135deg, #3182ED 0%, #1E40AF 100%);
          box-shadow: 0 4px 20px rgba(49, 130, 237, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .side-menu .gnb-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.2) 50%, 
            transparent 100%);
          transition: left 0.5s ease;
        }
        
        .side-menu .gnb-cta:hover::before {
          left: 100%;
        }
        
        .side-menu .gnb-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(49, 130, 237, 0.4);
        }
        
        /* 닫기 버튼 */
        .close-button {
          background: rgba(148, 163, 184, 0.1);
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: #fff;
          font-size: 24px;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.3s ease;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .close-button:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.4);
          transform: rotate(90deg);
        }
        
        /* 로고 그라데이션 효과 */
        .side-menu-logo {
          background: linear-gradient(135deg, #3182ED 0%, #60A5FA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
          font-size: 24px;
          font-family: "Pretendard", sans-serif;
        }
        
        /* 애니메이션 지연 효과 */
        .side-menu.active .gnb-menu:nth-child(1) { animation-delay: 0.1s; }
        .side-menu.active .gnb-menu:nth-child(2) { animation-delay: 0.2s; }
        .side-menu.active .gnb-menu:nth-child(3) { animation-delay: 0.3s; }
        .side-menu.active .gnb-menu:nth-child(4) { animation-delay: 0.4s; }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .side-menu.active .gnb-menu {
          animation: slideInRight 0.4s ease forwards;
        }
      `}</style>
      
      <nav style={{
        width: '100%',
        height: isMobile ? 'var(--gnb-height-mobile)' : '72px',
        background: 'rgba(20, 22, 28, 0.95)',
        backdropFilter: 'blur(12px)',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 20px 0 rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? 'var(--padding-mobile)' : '0 190px',
        width: '100%',
        boxSizing: 'border-box',
      }}>

          {/* 로고 */}
          <a 
            href="/" 
            className="gnb-logo" 
            style={{ 
              fontWeight: 700, 
              fontSize: isMobile ? 18 : 24, 
              letterSpacing: -1.2, 
              color: '#fff', 
              fontFamily: '"Pretendard", sans-serif'
            }}
            onClick={handleMenuClick}
          >
            NEWDEV
          </a>
          
          {/* 데스크톱: 중앙 메뉴 */}
          <div className="desktop-menu" style={{ 
            display: 'flex', 
            gap: 32, 
            alignItems: 'center', 
            justifyContent: 'center'
          }}>
            <a
              href="/about"
              className={`gnb-menu${pathname === '/about' ? ' active' : ''}`}
            >
              About
            </a>
            <a
              href="/service"
              className={`gnb-menu${pathname === '/service' ? ' active' : ''}`}
            >
              Service
            </a>
            <a
              href="/portfolio"
              className={`gnb-menu${pathname === '/portfolio' ? ' active' : ''}`}
            >
              Portfolio
            </a>
            <a
              href="/contact"
              className={`gnb-menu${pathname === '/contact' ? ' active' : ''}`}
            >
              Contact
            </a>
          </div>
          
          {/* 데스크톱: 우측 버튼 */}
          <div className="gnb-cta-desktop">
            <a href="/estimate" className="gnb-cta">견적받기</a>
          </div>
          
          {/* 모바일: 햄버거 메뉴 - 우측에 위치 */}
          <div 
            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            style={{ display: 'none' }}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
      
      {/* 사이드 메뉴 배경 */}
      <div 
        className={`side-menu-backdrop ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={handleBackdropClick}
      />
      
      {/* 사이드 메뉴 */}
      <div className={`side-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        {/* 사이드 메뉴 헤더 */}
        <div className="side-menu-header">
          <div style={{ 
            color: '#fff', 
            fontWeight: 500, 
            fontSize: 18, 
            fontFamily: '"Pretendard", sans-serif' 
          }}>
            menu
          </div>
          <button 
            className="close-button"
            onClick={toggleMobileMenu}
          >
            ×
          </button>
        </div>
        
        {/* 사이드 메뉴 네비게이션 */}
        <div className="side-menu-nav">
          <a
            href="/about"
            className={`gnb-menu${pathname === '/about' ? ' active' : ''}`}
            onClick={handleMenuClick}
          >
            <svg className="menu-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            About
          </a>
          <a
            href="/service"  
            className={`gnb-menu${pathname === '/service' ? ' active' : ''}`}
            onClick={handleMenuClick}
          >
            <svg className="menu-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Service
          </a>
          <a
            href="/portfolio"
            className={`gnb-menu${pathname === '/portfolio' ? ' active' : ''}`}
            onClick={handleMenuClick}
          >
            <svg className="menu-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
            </svg>
            Portfolio
          </a>
          <a
            href="/contact"
            className={`gnb-menu${pathname === '/contact' ? ' active' : ''}`}
            onClick={handleMenuClick}
          >
            <svg className="menu-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            Contact
          </a>
        </div>
        
        {/* 사이드 메뉴 푸터 */}
        <div className="side-menu-footer">
          <a 
            href="/estimate" 
            className="gnb-cta"
            onClick={handleMenuClick}
          >
            견적받기
          </a>
        </div>
      </div>
    </>
  );
};

export default GNB; 