'use client';
import { motion } from 'framer-motion';

const overlayVariants = {
  initial: { y: '100%' }, // Starts from the bottom, off-screen
  animate: {
    y: '0%', // Moves to cover the screen from the bottom
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: {
    y: '-100%', // Exits upwards, off-screen
    transition: { duration: 0.5, ease: 'easeIn' },
  },
};

export default function PageTransitionOverlay() {
  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-screen bg-[#1b1b1b] z-[9999]"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={overlayVariants}
    />
  );
}