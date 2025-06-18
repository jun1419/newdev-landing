"use client";
import React from 'react';
import { usePathname } from 'next/navigation';

const GNB = () => {
  const pathname = usePathname();

  return (
    <>
      <style>{`
        .gnb-logo {
          cursor: pointer;
        }
        .gnb-menu {
          color: #94A3B8;
          font-family: Pretendard;
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          line-height: 140%;
          letter-spacing: -0.32px;
          text-decoration: none;
          transition: color 0.2s;
          padding-bottom: 2px;
          border-bottom: 2px solid transparent;
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
          font-family: Pretendard;
          cursor: pointer;
          transition: background 0.3s;
        }
        .gnb-cta:hover {
          background: linear-gradient(260deg, #3182ED 0%, #0F131B 100%);
        }
      `}</style>
      <nav style={{
        width: '100%',
        height: 72,
        background: 'rgba(20, 22, 28, 0.85)',
        backdropFilter: 'blur(8px)',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)'
      }}>
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 140px',
        }}>
          {/* 좌측: 로고 */}
          <a href="/" className="gnb-logo" style={{ fontWeight: 700, fontSize: 24, letterSpacing: -1.2, color: '#fff', fontFamily: 'Pretendard', minWidth: 120 }}>
            NEWDEV
          </a>
          {/* 중앙: 메뉴 */}
          <div style={{ display: 'flex', gap: 32, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <a
              href="/about"
              className={`gnb-menu${pathname === '/about' ? ' active' : ''}`}
            >About</a>
            <a
              href="/service"
              className={`gnb-menu${pathname === '/service' ? ' active' : ''}`}
            >Service</a>
            <a
              href="/contact"
              className={`gnb-menu${pathname === '/contact' ? ' active' : ''}`}
            >Contact</a>
          </div>
          {/* 우측: 버튼 */}
          <div style={{ minWidth: 90, display: 'flex', justifyContent: 'flex-end' }}>
            <a href="/estimate" className="gnb-cta">견적받기</a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default GNB; 