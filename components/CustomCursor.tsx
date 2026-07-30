"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    let circleX = 0;
    let circleY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    };

    window.addEventListener("mousemove", moveCursor);

    const animate = () => {
      circleX += (mouseX - circleX) * 0.12;
      circleY += (mouseY - circleY) * 0.12;

      if (circleRef.current) {
        circleRef.current.style.transform = `
          translate(${circleX}px, ${circleY}px)
          translate(-50%, -50%)
        `;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      <div ref={circleRef} className="cursor-circle" />
      <div ref={dotRef} className="cursor-dot" />

      <style jsx global>{`
        body {
          cursor: none;
        }

        a,
        button {
          cursor: none;
        }

        .cursor-circle {
          position: fixed;
          top: 0;
          left: 0;
          width: 30px;
          height: 30px;
          border: 1px solid #000;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          will-change: transform;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-family: var(--font-montreal), Arial, sans-serif;
          font-size: 11px;
          line-height: 1;
          text-transform: uppercase;
          transition:
            width 0.25s ease,
            height 0.25s ease,
            border-radius 0.25s ease,
            background 0.25s ease,
            color 0.25s ease;
        }

        .cursor-circle::after {
          content: "";
        }

        body.photo-drag-hover .cursor-circle {
          width: 70px;
          height: 70px;
          border-radius:full;
          border: 2px solid white;
          background: rgba(247, 241, 241, 0.3);
        }

        body.photo-drag-hover .cursor-circle::after {
          content: "Drag";
        }

        .cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 6px;
          height: 6px;
          background: #000;
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
          will-change: transform;
          transition: opacity 0.2s ease;
        }

        body.photo-drag-hover .cursor-dot {
          opacity: 0;
        }
      `}</style>
    </>
  );
}
