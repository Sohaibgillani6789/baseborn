'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0); // Used for requestAnimationFrame to optimize mousemove
  const isVisibleRef = useRef(false); // Tracks if the cursor has become visible after first mousemove
  const hoveredRef = useRef(false); // Tracks if the cursor is currently hovering over an interactive element
  const [isMobile, setIsMobile] = useState(false); // State to determine if the device is mobile

  // Optimized spring configuration for smoother animations
  const springConfig = {
    stiffness: 400, 
    damping: 30,    
    mass: 0.4,      
    restSpeed: 0.001,
    restDelta: 0.001
  };

  // useSpring hooks from framer-motion to animate cursor position and scale
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);
  const scale = useSpring(1, springConfig);

  useEffect(() => {
    // Define cursor sizes - made base size bigger as requested
    const baseCursorSize = 54; // Increased from 24px to 32px for bigger default size
    const hoveredCursorSize = { width: 48, height: 48 }; // Slightly adjusted hover size

    // Function to check if the device is considered mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768 || window.matchMedia("(hover: none)").matches);
    };

    // Initial check on component mount
    handleResize(); 
    window.addEventListener('resize', handleResize);

    // If it's a mobile device, clean up and prevent cursor logic from running
    if (isMobile) {
      document.body.style.cursor = 'auto';
      return () => {
        window.removeEventListener('resize', handleResize);
        document.body.style.cursor = 'auto';
      };
    }

    // Hide ALL default cursors including hand gestures
    document.body.style.cursor = 'none';
    // Apply cursor: none to all interactive elements to remove hand gestures
    const style = document.createElement('style');
    style.textContent = `
      *, *:hover, *:focus, *:active {
        cursor: none !important;
      }
      a, button, [role="button"], [data-hover], input, textarea, select {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    // Initially hide the cursor until the first mouse movement
    if (cursorRef.current) {
      cursorRef.current.style.opacity = '0';
    }

    // Function to update cursor position, optimized with requestAnimationFrame
    const updateCursorPosition = (e: MouseEvent) => {
      // Calculate the offset needed to center the cursor based on its current state
      const offsetX = hoveredRef.current ? hoveredCursorSize.width / 2 : baseCursorSize / 2;
      const offsetY = hoveredRef.current ? hoveredCursorSize.height / 2 : baseCursorSize / 2;
      
      // On the very first mouse movement, make the cursor instantly visible and set its position
      if (!isVisibleRef.current && cursorRef.current) {
        cursorRef.current.style.opacity = '1';
        isVisibleRef.current = true;
        mouseX.set(e.clientX - baseCursorSize / 2);
        mouseY.set(e.clientY - baseCursorSize / 2);
      } else {
        // For subsequent movements, use useSpring to animate the cursor to the new position
        mouseX.set(e.clientX - offsetX);
        mouseY.set(e.clientY - offsetY);
      }
    };

    // Mousemove event handler, throttled using requestAnimationFrame for performance
    const onMouseMove = (e: MouseEvent) => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = requestAnimationFrame(() => updateCursorPosition(e));
    };

    // Event handler for when the mouse enters an interactive element
    const onInteractionTargetEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the target matches any of the defined interactive elements
      if (target.matches('a, button, [role="button"], [data-hover], input, textarea, select, [onclick]')) {
        hoveredRef.current = true;
        
        // Animate scale for smoother hover effect
        scale.set(1.2);
        
        if (cursorRef.current) {
          // Change cursor dimensions with smooth animation
          cursorRef.current.style.width = `${hoveredCursorSize.width}px`;
          cursorRef.current.style.height = `${hoveredCursorSize.height}px`;
        }
        
        // Immediately update the cursor's position to reflect the new size
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }
        frameRef.current = requestAnimationFrame(() => updateCursorPosition(e));
      }
    };

    // Event handler for when the mouse leaves an interactive element
    const onInteractionTargetLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], [data-hover], input, textarea, select, [onclick]')) {
        hoveredRef.current = false;
        
        // Reset scale animation
        scale.set(1);
        
        if (cursorRef.current) {
          // Revert cursor dimensions to base size
          cursorRef.current.style.width = `${baseCursorSize}px`;
          cursorRef.current.style.height = `${baseCursorSize}px`;
        }
        
        // Immediately update the cursor's position
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }
        frameRef.current = requestAnimationFrame(() => updateCursorPosition(e));
      }
    };

    // Event handler for when the mouse leaves the document window
    const onMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };

    // Event handler for when the mouse enters the document window
    const onMouseEnter = () => {
      if (cursorRef.current && isVisibleRef.current) {
        cursorRef.current.style.opacity = '1';
      }
    };

    // Add all event listeners
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onInteractionTargetEnter, { passive: true });
    window.addEventListener('mouseout', onInteractionTargetLeave, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onInteractionTargetEnter);
      window.removeEventListener('mouseout', onInteractionTargetLeave);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      // Remove the style element and restore default cursor
      const customStyle = document.querySelector('style');
      if (customStyle && customStyle.textContent?.includes('cursor: none')) {
        customStyle.remove();
      }
      document.body.style.cursor = 'auto';
    };
  }, [mouseX, mouseY, scale, isMobile]);

  // If the device is detected as mobile, return null
  if (isMobile) {
    return null;
  }

  return (
    <motion.div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 rounded-full border-2 border-white mix-blend-difference"
      style={{
        x: mouseX,
        y: mouseY,
        scale: scale, // Added scale animation for smoother hover effects
        width: '32px',  // Updated base width (increased from 24px)
        height: '32px', // Updated base height (increased from 24px)
        willChange: 'transform, width, height, opacity, scale',
        // Improved transitions for smoother animations
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)'
      }}
    >
      <motion.div
        className="w-full h-full rounded-full"
        style={{
          backgroundColor: 'white',
          willChange: 'background-color, transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          // Added subtle pulse effect on hover
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
    </motion.div>
  );
}