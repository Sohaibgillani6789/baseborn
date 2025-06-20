// hooks/useSmoothScroll.js
import { useEffect } from 'react';

export default function useSmoothScroll() {
  useEffect(() => {
    // Disable native smooth scroll
    const prevScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';

    // Prevent browser from restoring scroll position automatically
    const prevScrollRestoration = window.history.scrollRestoration;
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    let targetScrollY = window.scrollY;
    let currentScrollY = targetScrollY;
    let rafId = null;

    const ease = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animateScroll = () => {
      const diff = targetScrollY - currentScrollY;
      currentScrollY += diff * 0.1; // Adjust this value for smoothness (0.1 is smooth, 0.5 is faster)
      
      if (Math.abs(diff) < 0.5) {
        currentScrollY = targetScrollY;
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      
      window.scrollTo(0, currentScrollY);
      
      if (rafId) {
        rafId = requestAnimationFrame(animateScroll);
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      targetScrollY += e.deltaY;
      targetScrollY = Math.max(0, Math.min(targetScrollY, document.body.scrollHeight - window.innerHeight));
      
      if (!rafId) {
        rafId = requestAnimationFrame(animateScroll);
      }
    };

    const handleTouchStart = (e) => {
      const touchY = e.touches[0].clientY;
      let lastTouchY = touchY;

      const handleTouchMove = (e) => {
        const touchY = e.touches[0].clientY;
        const deltaY = lastTouchY - touchY;
        lastTouchY = touchY;
        
        targetScrollY += deltaY * 2; // Adjust multiplier for touch sensitivity
        targetScrollY = Math.max(0, Math.min(targetScrollY, document.body.scrollHeight - window.innerHeight));
        
        if (!rafId) {
          rafId = requestAnimationFrame(animateScroll);
        }
      };

      const handleTouchEnd = () => {
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };

      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd, { passive: false });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      // Restore scroll behavior and scroll restoration
      document.documentElement.style.scrollBehavior = prevScrollBehavior;
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = prevScrollRestoration;
      }
    };
  }, []);
}