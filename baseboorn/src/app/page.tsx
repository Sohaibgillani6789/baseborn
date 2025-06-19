'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLoader } from '@/context/LoaderContext';

// Existing slide-up variant for text elements (corrected opacity)
const textSlideUpVariant = {
  hidden: {
    opacity: 0,
    y: "100%"
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

// New variant for video/image containers to "fill up" from bottom
const mediaRevealVariant = {
  hidden: {
    clipPath: 'inset(100% 0 0 0)', // Starts with 100% clipped from bottom
    opacity: 0 // Start hidden
  },
  visible: {
    clipPath: 'inset(0% 0 0 0)', // Reveals fully
    opacity: 1, // Becomes visible
    transition: {
      duration: 1.2, // Slightly longer duration for the fill effect
      ease: [0.33, 1, 0.68, 1] // Custom ease
    }
  }
};

// Container variants for staggered reveal of sections
const sectionContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger children animations by 0.1 seconds
      delayChildren: 0.8 // Delay the start of children animations slightly after loader is gone
    }
  }
};

// Item variants for text elements within sections (using textSlideUpVariant)
const sectionTextItemVariant = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
};

// Item variants for media elements within sections (using mediaRevealVariant)
const sectionMediaItemVariant = {
    hidden: mediaRevealVariant.hidden,
    visible: mediaRevealVariant.visible
};


const projects = [
    {
        id: 'birdie',
        title: 'Birdie',
        subtitle: 'A Fresh Air Monitor',
        imageUrl: 'https://ext.same-assets.com/152564834/1725000487.webp',
        link: '/work/birdie',
    },
    {
        id: 'curb-cph',
        title: 'CURBCPH',
        subtitle: 'A new appearance',
        videoUrl: 'https://ext.same-assets.com/152564834/2466347151.mp4',
        link: '/work/curb-cph',
    },
    {
        id: 'mixmob',
        title: 'MixMob',
        subtitle: 'Web3 website experience',
        videoUrl: 'https://ext.same-assets.com/152564834/343488274.mp4',
        link: '/work/mixmob',
    },
    {
        id: 'palette',
        title: 'PALETTE',
        subtitle: 'Taste the full Palette',
        imageUrl: 'https://ext.same-assets.com/152564834/2899481985.webp',
        link: '/work/palette',
    },
    {
        id: 'pirate-wires',
        title: 'PirateWires',
        subtitle: 'Wave your flag for news',
        videoUrl: 'https://ext.same-assets.com/152564834/3354482214.mp4',
        link: '/work/pirate-wires',
    },
    {
        id: 'take-a-ride-with-me',
        title: 'TakeARideWithMe',
        subtitle: 'Downhill Mountainbike',
        imageUrl: 'https://ext.same-assets.com/152564834/1955105303.webp',
        link: '/work/take-a-ride-with-me',
    },
];

export default function Home() {
    const { isLoading } = useLoader();
    const [pageLoaded, setPageLoaded] = useState(false);
    const [showFooter, setShowFooter] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const lastScrollY = useRef(0);

    // This useEffect will set pageLoaded to true once the main loader is done
    useEffect(() => {
        if (!isLoading) {
            setPageLoaded(true);
        }
    }, [isLoading]);

    // Handle scroll events
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;

            const isAtBottom = currentScrollY + clientHeight >= scrollHeight - 20;
            setShowFooter(isAtBottom);

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Add mouse movement handler
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Custom Cursor */}
            <div
                className="fixed w-14 h-14 rounded-full border-2 border-white pointer-events-none z-50 transition-all duration-100 ease-out mix-blend-difference"
                style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`,
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <div
                    className={`absolute inset-0 rounded-full transition-all duration-200 ease-out mix-blend-difference ${
                        isHovering ? 'bg-white' : 'bg-transparent'
                    }`}
                    style={{
                        backdropFilter: isHovering ? 'invert(1) hue-rotate(180deg) contrast(200%)' : 'none'
                    }}
                />
            </div>

            {/* Main Content Container - Will slide up */}
            <motion.div
                initial="hidden"
                animate={pageLoaded ? "visible" : "hidden"}
                variants={sectionContainerVariants} // Use container variants for the main content
                className="flex flex-col lg:flex-row min-h-screen relative z-20 lg:pt-0 pt-4"
            >
                {/* Text banner instead of image - desktop (left panel) */}
                <motion.div
                    variants={sectionTextItemVariant} // Use text variant
                    className="fixed top-0 left-0 w-1/2 h-[45vh] z-10 hidden lg:flex items-center justify-center"
                >
                    <motion.h1
                        className="baseborn-heading text-6xl md:text-8xl text-white uppercase"
                    >
                        BOUNDLESS
                    </motion.h1>
                </motion.div>

                {/* Text banner instead of image - mobile */}
                <motion.div
                    variants={sectionTextItemVariant} // Use text variant
                    className="relative w-full h-[55vh] lg:hidden z-10 flex items-center justify-center"
                >
                    <motion.h1
                        className="baseborn-heading text-6xl md:text-8xl text-white uppercase"
                    >
                        BOUNDLESS
                    </motion.h1>
                </motion.div>

                {/* Left Panel - Fixed */}
                <div className="lg:w-1/2 lg:fixed lg:h-screen lg:top-[45vh]">
                    <section className="p-2 lg:p-16 flex flex-col items-center justify-center">
                        <div className="max-w-2xl">
                            <motion.h1
                                variants={sectionTextItemVariant} // Use text variant
                                className="font-light text-5xl md:text-2xl tracking-tighter -mt-[50px]"
                            >
                                /boundless/_adjective_having no limits
                            </motion.h1>

                            <motion.h2
                                variants={sectionTextItemVariant} // Use text variant
                                className="baseborn-title text-2xl md:text-4xl lg:text-5xl leading-tight mb-2"
                            >
                                An Independent Branding & Digital Design Studio
                                based in lahore. We combine Identity,
                                Digital Design & Development
                                Specializing in webGl.
                            </motion.h2>

                            <motion.div
                                variants={sectionTextItemVariant} // Use text variant
                                className="mb-12"
                            >
                                <Link
                                    href="/work"
                                    className="mb-25 inline-block py-3 px-6 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300 text-white"
                                >
                                    View Work
                                </Link>
                            </motion.div>
                        </div>
                    </section>
                </div>

                {/* Right Panel - Scrollable */}
                <div className="lg:w-1/2 lg:ml-auto relative lg:pt-0 pt-0">
                    <motion.div
                        initial="hidden"
                        animate={pageLoaded ? "visible" : "hidden"}
                        variants={sectionContainerVariants} // Container variant for the grid items
                        className="grid grid-cols-1 gap-8 p-8"
                    >
                        {projects.map((project) => (
                            <motion.div key={project.id} variants={sectionMediaItemVariant}> {/* Apply media reveal variant */}
                                <Link
                                    href={project.link}
                                    className="hover-project block aspect-[16/12] relative rounded-lg"
                                    // Removed overflow-hidden from here, as clip-path will handle it
                                >
                                    <div className="absolute inset-0 bg-black/20 z-10" />
                                    {project.videoUrl ? (
                                        <video
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            className="w-full h-full object-cover"
                                        >
                                            <source src={project.videoUrl} type="video/mp4" />
                                        </video>
                                    ) : (
                                        <Image
                                            src={project.imageUrl || ''}
                                            alt={project.title}
                                            width={1200}
                                            height={675}
                                            className="w-full h-full object-cover"
                                        />
                                    )}

                                    <div className="absolute bottom-6 left-6 z-20 text-white">
                                        <h3 className="text-xl md:text-2xl font-bold baseborn-heading">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm md:text-base opacity-80">
                                            {project.subtitle}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* Footer - Fixed to bottom with show/hide animation */}
            <footer className={`fixed bottom-0 left-0 w-full bg-white z-30 py-6 transition-transform duration-300 ${showFooter ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Image
                            src="/images/pattern.svg"
                            alt="Pattern"
                            width={800}
                            height={400}
                            className="w-auto h-[120px] opacity-10"
                        />
                    </div>
                </div>
                <div className="container mx-auto px-8 flex flex-col md:flex-row justify-between items-center relative z-10">
                    <div className="baseborn-heading text-black text-sm md:text-base mb-4 md:mb-0">
                        © 2025 BOUNDLESS. All rights reserved.
                    </div>
                    <div className="flex space-x-8">
                        <Link href="/contact" className="baseborn-heading text-black text-sm md:text-base hover:text-gray-600 transition-colors">
                            Contact
                        </Link>
                        <Link href="/about" className="baseborn-heading text-black text-sm md:text-base hover:text-gray-600 transition-colors">
                            About
                        </Link>
                        <Link href="/careers" className="baseborn-heading text-black text-sm md:text-base hover:text-gray-600 transition-colors">
                            Careers
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}