'use client';

import { useLoader } from '@/context/LoaderContext';
import { useEffect, useState, useRef } from 'react';
import styles from './Loader.module.css';

export default function Loader() {
  const { progress, isLoading } = useLoader();
  const [shouldAnimateOut, setShouldAnimateOut] = useState(false);
  const [displayLoader, setDisplayLoader] = useState(true);

  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading) {
      setShouldAnimateOut(true);
    }
  }, [isLoading]);

  useEffect(() => {
    const loaderElement = loaderRef.current;

    if (loaderElement && shouldAnimateOut) {
      const handleAnimationEnd = () => {
        setDisplayLoader(false);
      };

      loaderElement.addEventListener('animationend', handleAnimationEnd);
      return () => {
        loaderElement.removeEventListener('animationend', handleAnimationEnd);
      };
    }
  }, [shouldAnimateOut]);

  if (!displayLoader) return null;

  return (
    <div
      ref={loaderRef}
      className={`${styles.loader} ${shouldAnimateOut ? styles.slideUp : ''}`}
    >
      <div className={styles.logoWrapper}>
        <img src="./images/logo.svg" alt="Loader Logo" className={styles.logo} />
      </div>
      {/* Optional: show progress */}
      {/* <div className={styles.progress}>Loading: {Math.round(progress)}%</div> */}
    </div>
  );
}
