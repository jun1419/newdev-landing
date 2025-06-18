'use client';

import React, { useEffect, useRef } from 'react';

const CURSOR_COUNT = 1;

const cursorStyle = `
  html, body {
    cursor: none !important;
  }

  .cursor-dot {
    position: fixed;
    top: 0;
    left: 0;
    width: 18px;
    height: 18px;
    background: white;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease-out, background 0.3s ease, scale 0.3s ease;
    opacity: 0.9;
    mix-blend-mode: difference;
    will-change: transform;
  }

  .cursor-dot.hovered {
    background: linear-gradient(45deg, #00ffd0, #007cf0);
    transform: scale(2.5);
    mix-blend-mode: lighten;
  }

  button:hover {
    cursor: none !important;
  }
`;

const MouseCursor = () => {
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const coords = useRef(
    Array.from({ length: CURSOR_COUNT }, () => ({ x: 0, y: 0 }))
  );
  const isHovering = useRef(false);

  useEffect(() => {
    const dots = dotsRef.current;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    document.addEventListener('mousemove', onMouseMove);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button')) {
        isHovering.current = true;
        dots.forEach(dot => dot?.classList.add('hovered'));
      } else {
        isHovering.current = false;
        dots.forEach(dot => dot?.classList.remove('hovered'));
      }
    };
    document.addEventListener('mouseover', onMouseOver);

    function animate() {
      let x = mouse.current.x;
      let y = mouse.current.y;

      coords.current.forEach((coord, index) => {
        if (index === 0) {
          coord.x = x;
          coord.y = y;
        } else {
          const prev = coords.current[index - 1];
          coord.x += (prev.x - coord.x) * 0.3;
          coord.y += (prev.y - coord.y) * 0.3;
        }

        const dot = dots[index];
        if (dot) {
          dot.style.transform = `translate3d(${coord.x - 8}px, ${coord.y - 8}px, 0)`;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      <style>{cursorStyle}</style>
      {Array.from({ length: CURSOR_COUNT }).map((_, i) => (
        <div
          key={i}
          className="cursor-dot"
          ref={(el) => {
            if (el) dotsRef.current[i] = el;
          }}
        />
      ))}
    </>
  );
};

export default MouseCursor;
