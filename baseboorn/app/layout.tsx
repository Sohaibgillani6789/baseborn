'use client';

import './globals.css';
import Header from '@/components/layout/Header';
import { LoaderProvider } from '@/context/LoaderContext';
import Loader from '@/components/Loader';
import CustomCursor from '@/components/CustomCursor';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageTransitionOverlay from '@/components/overlay';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);

    const enterTimer = setTimeout(() => {
      // Load new content AFTER overlay fully covers screen
      setDisplayChildren(children);
    }, 500); // match overlay enter duration

    const exitTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // overlay in + out

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
    };
  }, [pathname, children]);

  return (
    <html lang="en">
      <body>
        <LoaderProvider>
          <CustomCursor />
          <Loader />
          <Header />

          <main className="min-h-screen pt-20 pb-20 relative">


            {/* Background blank cover layer (same color as overlay) */}
            {isTransitioning && (
              <div className="fixed inset-0 bg-[#1b1b1b] z-[9000]" />
            )}

            {/* Transition overlay animation */}
            <AnimatePresence mode="wait">
              {isTransitioning && <PageTransitionOverlay key="transition-overlay" />}
            </AnimatePresence>

            {/* Children appear only when overlay is already in place */}
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.4 } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="w-full h-full absolute top-0 left-0 z-10"
              >
                {displayChildren}
              </motion.div>
            </AnimatePresence>
          </main>
        </LoaderProvider>
      </body>
    </html>
  );
}
