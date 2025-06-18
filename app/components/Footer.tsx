import React from 'react';

const Footer = () => (
  <footer style={{
    width: '100%',
    background: '#0F131B',
    color: '#fff',
    padding: '48px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Pretendard',
  }}>
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 40,
      padding: '0 140px',
    }}>
      {/* 좌측: 회사 정보 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ marginBottom: 8 }}>
          {/* 실제 SVG 로고 */}
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="auto" viewBox="0 0 140 26" fill="none">
            <g clipPath="url(#clip0_38_687)">
              <path d="M140 0L131.029 25.118H125.503L116.533 0H121.628L128.266 18.9821H128.338L134.905 0H140Z" fill="white"/>
              <path d="M105.81 14.3532V20.8121H115.821V25.118H100.786V0H115.821V4.30595H105.81V10.0472H113.668V14.3532H105.81Z" fill="white"/>
              <path d="M96.127 22.7139L91.9645 25.118H76.5708V0H91.9645L96.127 2.40416V22.7139ZM81.5944 4.30595V20.8121H91.1033V4.30595H81.5944Z" fill="white"/>
              <path d="M74.0604 0L67.6732 25.118H62.2908L57.7695 8.14542H57.6978L53.1765 25.118H47.7941L41.4069 0H46.287L50.5212 17.2238H50.593L55.186 0H60.2813L64.8744 17.152H64.9461L69.1803 0H74.0604Z" fill="white"/>
              <path d="M30.3253 14.3532V20.8121H40.3366V25.118H25.3017V0H40.3366V4.30595H30.3253V10.0472H38.1836V14.3532H30.3253Z" fill="white"/>
              <path d="M5.02361 8.86308V25.118H0V0H4.70066L15.5373 16.255H15.6091V0H20.6327V25.118H15.932L5.09537 8.86308H5.02361Z" fill="white"/>
            </g>
            <defs>
              <clipPath id="clip0_38_687">
                <rect width="140" height="26" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div style={{ fontWeight: 700, fontSize: 24, lineHeight: '140%', letterSpacing: '-0.48px' }}>뉴데브</div>
        <div style={{ color: '#B0B6BC', fontSize: 14, lineHeight: '145%', letterSpacing: '-0.28px' }}>
          대표이사: 전진우<br />
          경기도 오산시 독산상로 425, 세교 더퍼스트타워 1012호<br />
          사업자등록번호 : 123-45-67890 / 통신판매업신고 : 9999-12345호<br />
          개인정보보호책임자: 박서준<br />
          이메일: pseojun1419@gmail.com<br />
          Copyright © NewDev ALL RIGHTS RESERVED.
        </div>
      </div>
      {/* 우측: 연락처/문의 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16, minWidth: 240 }}>
        <div style={{ fontWeight: 600, fontSize: 28, lineHeight: '140%', letterSpacing: '-0.56px' }}>1234-5678</div>
        <div style={{ color: '#B0B6BC', fontSize: 14, lineHeight: '140%', letterSpacing: '-0.28px' }}>
          오전 9시 ~ 오후 6시(토요일, 공휴일 휴무)
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button style={{
            padding: '3px 10px',
            borderRadius: 2,
            border: '1px solid #fff',
            background: 'transparent',
            color: '#fff',
            fontWeight: 400,
            fontSize: 12,
            cursor: 'pointer',
          }}>1:1문의하기</button>
          <button style={{
            padding: '3px 10px',
            borderRadius: 2,
            border: '1px solid #fff',
            background: 'transparent',
            color: '#fff',
            fontWeight: 400,
            fontSize: 12,
            cursor: 'pointer',
          }}>자주 묻는 질문</button>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer; 