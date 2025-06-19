// loader.tsx
'use client';

import { useLoader } from '@/context/LoaderContext';
import { useEffect, useState, useRef } from 'react'; // Import useRef
import styles from './Loader.module.css';

export default function Loader() {
  const { progress, isLoading } = useLoader();
  const [shouldAnimateOut, setShouldAnimateOut] = useState(false);
  const [displayLoader, setDisplayLoader] = useState(true); // New state to control visibility

  // Ref to the loader div to potentially listen for animation end
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading) {
      // When isLoading becomes false, trigger the animation
      setShouldAnimateOut(true);
    }
  }, [isLoading]);

  useEffect(() => {
    const loaderElement = loaderRef.current;

    if (loaderElement && shouldAnimateOut) {
      // Listen for the animationend event
      const handleAnimationEnd = () => {
        setDisplayLoader(false); // Hide the loader completely after animation
      };

      // Add event listener for animation end
      loaderElement.addEventListener('animationend', handleAnimationEnd);

      // Cleanup function: remove the event listener when component unmounts or deps change
      return () => {
        loaderElement.removeEventListener('animationend', handleAnimationEnd);
      };
    }
  }, [shouldAnimateOut]); // Rerun this effect when shouldAnimateOut changes

  // If we decide not to display the loader, return null immediately
  if (!displayLoader) {
    return null;
  }

  return (
    <div
      ref={loaderRef} // Attach the ref to the loader div
      className={`${styles.loader} ${shouldAnimateOut ? styles.slideUp : ''}`}
    >
      <div className={styles.hexagon}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M40 0L79.0526 22.8571V57.1429L40 80L0.947441 57.1429V22.8571L40 0Z"
            fill="white"
          />
          <path
            d="M40 14.2857L65.2632 30V53.5714L40 68.5714L14.7368 53.5714V30L40 14.2857Z"
            fill="black"
          />
        </svg>
      </div>
      {/* <div className={styles.progress}>Loading: {Math.round(progress)}%</div> */}
    </div>
  );
}