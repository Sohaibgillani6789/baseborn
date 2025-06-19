'use client';

import { useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);
  const frameRef = useRef<number>(0);
  const isVisibleRef = useRef(false);
  
  // Optimized spring configuration for better initial performance
  const springConfig = {
    stiffness: 50, // Reduced stiffness for smoother movement
    damping: 2,   // Reduced damping for less lag
    mass: 0.05,    // Reduced mass for faster response
    restSpeed: 0.001
  };

  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);
  const hoveredRef = useRef(false);

  useEffect(() => {
    // Hide cursor initially and show it only after first mouse move
    if (cursorRef.current) {
      cursorRef.current.style.opacity = '0';
    }

    let moveTimeout: NodeJS.Timeout | undefined = undefined;

    // Function to update cursor position with immediate first update
    const updateCursorPosition = (e: MouseEvent) => {
      if (!isVisibleRef.current && cursorRef.current) {
        cursorRef.current.style.opacity = '1';
        isVisibleRef.current = true;
        // First movement is instant
        mouseX.set(e.clientX - 12);
        mouseY.set(e.clientY - 12);
      } else {
        const scale = hoveredRef.current ? 24 : 12;
        mouseX.set(e.clientX - scale);
        mouseY.set(e.clientY - scale);
      }
    };

    // Optimized mousemove handler with RAF
    const onMouseMove = (e: MouseEvent) => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = requestAnimationFrame(() => updateCursorPosition(e));
    };

    // Optimized hover detection with event delegation
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], [data-hover]')) {
        hoveredRef.current = true;
        if (cursorRef.current) {
          cursorRef.current.style.width = '58px';
          cursorRef.current.style.height = '78px';
        }
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], [data-hover]')) {
        hoveredRef.current = false;
        if (cursorRef.current) {
          cursorRef.current.style.width = '24px';
          cursorRef.current.style.height = '24px';
        }
      }
    };

    // Handle cursor visibility when leaving/entering window
    const onMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };

    const onMouseEnter = () => {
      if (cursorRef.current && isVisibleRef.current) {
        cursorRef.current.style.opacity = '1';
      }
    };

    // Add all event listeners with passive flag for better performance
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mouseout', onMouseOut, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      clearTimeout(moveTimeout);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 rounded-full border-2 border-white mix-blend-difference"
      style={{
        x: mouseX,
        y: mouseY,
        width: '24px',
        height: '24px',
        willChange: 'transform, opacity',
        transition: 'width 0.2s ease-out, height 0.2s ease-out',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)'
      }}
    >
      <motion.div
        className="w-full h-full rounded-full transition-all duration-200"
        style={{
          backgroundColor: hoveredRef.current ? 'white' : 'transparent',
          willChange: 'background-color',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      />
    </motion.div>
  );
}
