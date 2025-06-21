// src/app/template.tsx
'use client'; // This is correct, template.tsx can be a client component

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
// Removed: useEffect, useState, PageTransitionOverlay imports for simplicity

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    // AnimatePresence will detect when the component keyed by 'pathname' changes
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname} // This key is crucial for AnimatePresence to trigger exit/enter
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.4 } }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        // You might need to adjust this className to ensure it fills the space correctly
        // and doesn't interfere with your main layout's positioning.
        className="w-full h-full absolute top-0 left-0" // Adjusted z-index from z-10 if it's not needed by your design to be on top of Header/Loader
      >
        {children} {/* Directly render children here */}
      </motion.div>
    </AnimatePresence>
  );
}