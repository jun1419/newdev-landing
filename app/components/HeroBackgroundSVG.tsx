import React from 'react';

const ANIMATION_STYLE = `
@keyframes moveUp {
  0% { transform: translateY(0); }
  50% { transform: translateY(-40px); }
  100% { transform: translateY(0); }
}
@keyframes moveDown {
  0% { transform: translateY(0); }
  50% { transform: translateY(40px); }
  100% { transform: translateY(0); }
}
.hero-rect-up {
  animation: moveUp 7s ease-in-out infinite;
}
.hero-rect-down {
  animation: moveDown 7s ease-in-out infinite;
}
`;

// 각 열의 x좌표
const X = [0, 306, 612, 918, 1224, 1530, 1836];
// 각 열의 fill id
const FILL = [
  ['paint0_linear_56_42', 'paint7_linear_56_42', 'paint14_linear_56_42'],
  ['paint1_linear_56_42', 'paint8_linear_56_42', 'paint15_linear_56_42'],
  ['paint2_linear_56_42', 'paint9_linear_56_42', 'paint16_linear_56_42'],
  ['paint3_linear_56_42', 'paint10_linear_56_42', 'paint17_linear_56_42'],
  ['paint4_linear_56_42', 'paint11_linear_56_42', 'paint18_linear_56_42'],
  ['paint5_linear_56_42', 'paint12_linear_56_42', 'paint19_linear_56_42'],
  ['paint6_linear_56_42', 'paint13_linear_56_42', 'paint20_linear_56_42'],
];

const COLUMN_HEIGHT = 1172; // SVG 전체 높이
const RECT_HEIGHT = 380; // 사각형 하나 높이
const GAP = 16; // 사각형 사이 간격(396-380)
const NUM_ROWS = 3;

function renderColumn(x: number, fills: string[], direction: 'up' | 'down', key: string) {
  // 2세트로 복제
  const rects = [];
  for (let set = 0; set < 2; set++) {
    for (let i = 0; i < NUM_ROWS; i++) {
      rects.push(
        <rect
          key={`${key}-set${set}-row${i}`}
          x={x}
          y={i * (RECT_HEIGHT + GAP) + set * COLUMN_HEIGHT}
          width="290"
          height="380"
          rx="40"
          fill={`url(#${fills[i]})`}
        />
      );
    }
  }
  return (
    <g className={direction === 'up' ? 'hero-rect-up' : 'hero-rect-down'} key={key}>
      {rects}
    </g>
  );
}

const HeroBackgroundSVG = () => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 2126,
      height: 1172,
      transform: 'translate(-50%, -50%)',
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}
  >
    <style>{ANIMATION_STYLE}</style>
    <svg xmlns="http://www.w3.org/2000/svg" width="2126" height="1172" viewBox="0 0 2126 1172" fill="none" style={{width: '100%', height: '100%'}}>
      <g filter="url(#filter0_n_56_42)">
        {/* 1열 (위로) */}
        <g className="hero-rect-up">
          <rect x="0" y="0" width="290" height="380" rx="40" fill="url(#paint0_linear_56_42)"/>
          <rect x="0" y="396" width="290" height="380" rx="40" fill="url(#paint7_linear_56_42)"/>
          <rect x="0" y="792" width="290" height="380" rx="40" fill="url(#paint14_linear_56_42)"/>
        </g>
        {/* 2열 (아래로) */}
        <g className="hero-rect-down">
          <rect x="306" y="0" width="290" height="380" rx="40" fill="url(#paint1_linear_56_42)"/>
          <rect x="306" y="396" width="290" height="380" rx="40" fill="url(#paint8_linear_56_42)"/>
          <rect x="306" y="792" width="290" height="380" rx="40" fill="url(#paint15_linear_56_42)"/>
        </g>
        {/* 3열 (위로) */}
        <g className="hero-rect-up">
          <rect x="612" y="0" width="290" height="380" rx="40" fill="url(#paint2_linear_56_42)"/>
          <rect x="612" y="396" width="290" height="380" rx="40" fill="url(#paint9_linear_56_42)"/>
          <rect x="612" y="792" width="290" height="380" rx="40" fill="url(#paint16_linear_56_42)"/>
        </g>
        {/* 4열 (아래로) */}
        <g className="hero-rect-down">
          <rect x="918" y="0" width="290" height="380" rx="40" fill="url(#paint3_linear_56_42)"/>
          <rect x="918" y="396" width="290" height="380" rx="40" fill="url(#paint10_linear_56_42)"/>
          <rect x="918" y="792" width="290" height="380" rx="40" fill="url(#paint17_linear_56_42)"/>
        </g>
        {/* 5열 (위로) */}
        <g className="hero-rect-up">
          <rect x="1224" y="0" width="290" height="380" rx="40" fill="url(#paint4_linear_56_42)"/>
          <rect x="1224" y="396" width="290" height="380" rx="40" fill="url(#paint11_linear_56_42)"/>
          <rect x="1224" y="792" width="290" height="380" rx="40" fill="url(#paint18_linear_56_42)"/>
        </g>
        {/* 6열 (아래로) */}
        <g className="hero-rect-down">
          <rect x="1530" y="0" width="290" height="380" rx="40" fill="url(#paint5_linear_56_42)"/>
          <rect x="1530" y="396" width="290" height="380" rx="40" fill="url(#paint12_linear_56_42)"/>
          <rect x="1530" y="792" width="290" height="380" rx="40" fill="url(#paint19_linear_56_42)"/>
        </g>
        {/* 7열 (위로) */}
        <g className="hero-rect-up">
          <rect x="1836" y="0" width="290" height="380" rx="40" fill="url(#paint6_linear_56_42)"/>
          <rect x="1836" y="396" width="290" height="380" rx="40" fill="url(#paint13_linear_56_42)"/>
          <rect x="1836" y="792" width="290" height="380" rx="40" fill="url(#paint20_linear_56_42)"/>
        </g>
      </g>
      <defs>
        <filter id="filter0_n_56_42" x="0" y="0" width="2126" height="1172" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feTurbulence type="fractalNoise" baseFrequency="0.5 0.5" stitchTiles="stitch" numOctaves="3" result="noise" seed="4867"/>
          <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise"/>
          <feComponentTransfer in="alphaNoise" result="coloredNoise1">
            <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "/>
          </feComponentTransfer>
          <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped"/>
          <feFlood floodColor="rgba(255, 255, 255, 0.05)" result="color1Flood"/>
          <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1"/>
          <feMerge result="effect1_noise_56_42">
            <feMergeNode in="shape"/>
            <feMergeNode in="color1"/>
          </feMerge>
        </filter>
        <linearGradient id="paint0_linear_56_42" x1="145" y1="0" x2="145" y2="380" gradientUnits="userSpaceOnUse">
          <stop/>
          <stop offset="1" stopColor="#0F131B"/>
        </linearGradient>
        <linearGradient id="paint1_linear_56_42" x1="451" y1="0" x2="451" y2="380" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F131B"/>
          <stop offset="1"/>
        </linearGradient>
        <linearGradient id="paint2_linear_56_42" x1="757" y1="0" x2="757" y2="380" gradientUnits="userSpaceOnUse">
          <stop/>
          <stop offset="1" stopColor="#0F131B"/>
        </linearGradient>
        <linearGradient id="paint3_linear_56_42" x1="1063" y1="0" x2="1063" y2="380" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F131B"/>
          <stop offset="1"/>
        </linearGradient>
        <linearGradient id="paint4_linear_56_42" x1="1369" y1="0" x2="1369" y2="380" gradientUnits="userSpaceOnUse">
          <stop/>
          <stop offset="1" stopColor="#0F131B"/>
        </linearGradient>
        <linearGradient id="paint5_linear_56_42" x1="1675" y1="0" x2="1675" y2="380" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F131B"/>
          <stop offset="1"/>
        </linearGradient>
        <linearGradient id="paint6_linear_56_42" x1="1981" y1="0" x2="1981" y2="380" gradientUnits="userSpaceOnUse">
          <stop/>
          <stop offset="1" stopColor="#0F131B"/>
        </linearGradient>
        <linearGradient id="paint7_linear_56_42" x1="145" y1="396" x2="145" y2="776" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F131B"/>
          <stop offset="1"/>
        </linearGradient>
        <linearGradient id="paint8_linear_56_42" x1="451" y1="396" x2="451" y2="776" gradientUnits="userSpaceOnUse">
          <stop/>
          <stop offset="1" stopColor="#0F131B"/>
        </linearGradient>
        <linearGradient id="paint9_linear_56_42" x1="757" y1="396" x2="757" y2="776" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F131B"/>
          <stop offset="1"/>
        </linearGradient>
        <linearGradient id="paint10_linear_56_42" x1="1063" y1="396" x2="1063" y2="776" gradientUnits="userSpaceOnUse">
          <stop/>
          <stop offset="1" stopColor="#0F131B"/>
        </linearGradient>
        <linearGradient id="paint11_linear_56_42" x1="1369" y1="396" x2="1369" y2="776" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F131B"/>
          <stop offset="1"/>
        </linearGradient>
        <linearGradient id="paint12_linear_56_42" x1="1675" y1="396" x2="1675" y2="776" gradientUnits="userSpaceOnUse">
          <stop/>
          <stop offset="1" stopColor="#0F131B"/>
        </linearGradient>
        <linearGradient id="paint13_linear_56_42" x1="1981" y1="396" x2="1981" y2="776" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F131B"/>
          <stop offset="1"/>
        </linearGradient>
        <linearGradient id="paint14_linear_56_42" x1="145" y1="792" x2="145" y2="1172" gradientUnits="userSpaceOnUse">
          <stop/>
          <stop offset="1" stopColor="#0F131B"/>
        </linearGradient>
        <linearGradient id="paint15_linear_56_42" x1="451" y1="792" x2="451" y2="1172" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F131B"/>
          <stop offset="1"/>
        </linearGradient>
        <linearGradient id="paint16_linear_56_42" x1="757" y1="792" x2="757" y2="1172" gradientUnits="userSpaceOnUse">
          <stop/>
          <stop offset="1" stopColor="#0F131B"/>
        </linearGradient>
        <linearGradient id="paint17_linear_56_42" x1="1063" y1="792" x2="1063" y2="1172" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F131B"/>
          <stop offset="1"/>
        </linearGradient>
        <linearGradient id="paint18_linear_56_42" x1="1369" y1="792" x2="1369" y2="1172" gradientUnits="userSpaceOnUse">
          <stop/>
          <stop offset="1" stopColor="#0F131B"/>
        </linearGradient>
        <linearGradient id="paint19_linear_56_42" x1="1675" y1="792" x2="1675" y2="1172" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F131B"/>
          <stop offset="1"/>
        </linearGradient>
        <linearGradient id="paint20_linear_56_42" x1="1981" y1="792" x2="1981" y2="1172" gradientUnits="userSpaceOnUse">
          <stop/>
          <stop offset="1" stopColor="#0F131B"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export default HeroBackgroundSVG; 