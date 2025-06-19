'use client';

import React, { useState, useEffect, useRef } from 'react';
import CustomCursor from '@/components/CustomCursor';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView, useMotionValue } from 'framer-motion';
import useSmoothScroll from '../hooks/useSmoothScroll';

const transition = {
  duration: 0.8,
  ease: [0.43, 0.13, 0.23, 0.96]
};

const fadeIn = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const teamMembers = [
  {
    name: 'Tore S. Bentsen',
    role: 'Interactive Designer & Co-Founder',
    imageUrl: 'https://ext.same-assets.com/2519627967/3639195492.webp',
  },
  {
    name: 'Simon H. Larsen',
    role: 'Brand Designer & Co-Founder',
    imageUrl: 'https://ext.same-assets.com/2519627967/639753852.webp',
  },
];

const services = [
  {
    title: 'Web Development',
    description: 'Custom websites built with modern technologies...',
    items: ['Next.js', 'React', 'Webflow', 'WordPress', 'E-commerce', 'CMS Integration'],
  },
  {
    title: 'Digital Design',
    description: 'Creating immersive digital experiences...',
    items: ['Motion Design', 'Interactive Design', '3D Design', 'Digital Art Direction', 'Content Creation', 'Visual Design'],
  },
  {
    title: 'Brand Identity',
    description: 'Building memorable brands...',
    items: ['Logo Design', 'Brand Strategy', 'Visual Identity', 'Brand Guidelines', 'Typography', 'Art Direction'],
  },
];

export default function StudioPage() {
  // Use the smooth scroll hook - Consider temporarily disabling this to diagnose scroll issues
  useSmoothScroll();

  const paragraphs = [
    "We're an independent digital-first design studio...",
    'We believe that for a brand to break through...',
    'Our philosophy is that working closely...',
    'With more than 20+ years of experience...',
  ];

  // Create refs
  const containerRef = useRef(null);
  const contentRef = useRef(null); // Ref for the main scrolling content

  // Set up scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform with clamping to prevent white line
  const yProgress = useTransform(scrollYProgress, [0, 0.7], [0, -100]); // Adjust 0.7 and -100 as needed
  const y = useMotionValue(0);

  useEffect(() => {
    const unsubscribe = yProgress.on("change", (latest) => {
      // Ensure the value never goes positive (which would show white line at top)
      const clampedValue = Math.min(0, latest);
      y.set(clampedValue);
    });

    return () => unsubscribe();
  }, [yProgress, y]);

  return (
    <div className="relative bg-neutral-900">
      <CustomCursor />

      {/*
        Main container for the scroll effect.
        It needs to be tall enough to allow the content to scroll up and reveal the fixed footer.
        Consider setting a specific height (e.g., h-[200vh]) or calculating it dynamically.
      */}
      <div ref={containerRef} className="relative">
        {/* White Footer (fixed position) */}
        {/* This element remains fixed in the viewport while the parent scrolls */}
        <div className="fixed inset-0 w-full h-screen bg-white text-black z-0">
          {/* Pattern overlay */}
          <div className="absolute w-full h-full flex items-center justify-center">
            <div className="w-full max-w-[2800px] opacity-90">
              <Image
                src="/images/pattern.svg"
                alt="Pattern"
                width={1200}
                height={1200}
                priority
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Contact Information at the top */}
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-center z-10">
            <h3 className="baseborn-heading text-xl mb-2">Get in Touch</h3>
            <p className="mb-1">hello@baseborn.design</p>
            <p>+1 (123) 456-7890</p>
          </div>

          {/* BOUNDLESS text */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center px-4">
            <h2 className="baseborn-title text-[3rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[14rem] 2xl:text-[19rem] text-neutral-900 leading-none text-center break-words relative z-10">
              BOUNDLESS
            </h2>
          </div>
        </div>

        {/* Main Content Section */}
        {/*
          This motion.div contains all your scrollable content.
          For a "reveal" effect where a fixed element comes into view,
          it's often more reliable to use `position: sticky` on the scrolling content
          if the `containerRef` wraps both.
          Alternatively, if using `position: relative` as you are, the `containerRef`
          needs enough height for the content to scroll entirely out of view,
          revealing the fixed element beneath.
        */}
        <motion.div
          ref={contentRef}
          style={{
            y: y,
            position: 'relative', // Keep relative if you want to use the spacer div to control overall scroll
            // CONSIDER CHANGING TO 'sticky' with `top: 0` if `containerRef` wraps both elements and you want the content to stick and then animate.
            // position: 'sticky',
            // top: 0,
            zIndex: 10,
            backgroundColor: '#171717',
            minHeight: '100vh', // Ensure content takes at least one viewport height
          }}
          className="text-white"
        >
          {/* Extra safety div to prevent white line when scrolling up */}
          <div style={{
            position: 'absolute',
            top: '-5px',
            left: 0,
            right: 0,
            height: '10px',
            backgroundColor: '#171717',
            zIndex: 20
          }} />

          <div className="py-20" style={{ backgroundColor: '#171717' }}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mb-16 text-left pl-4 overflow-hidden"
            >
              <h1 className="baseborn-title text-[3rem] xs:text-[3.5rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] 2xl:text-[12rem] mb-8 leading-[0.85]">
                BORNIN <br /> DIGITAL
              </h1>
            </motion.div>

            <div className="max-w-5xl mx-auto px-4 text-center">
              {/* Team Section */}
              <motion.div
                variants={staggerChildren}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24"
              >
                {teamMembers.map((member) => (
                  <motion.div key={member.name} variants={fadeIn} className="relative">
                    <div className="aspect-square overflow-hidden rounded-lg bg-accent/20 mb-4">
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover transition-all duration-500 filter grayscale hover:grayscale-0"
                      />
                    </div>
                    <h3 className="text-xl font-bold baseborn-heading">{member.name}</h3>
                    <p className="text-secondary">{member.role}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Paragraphs */}
              <motion.div
                variants={staggerChildren}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                className="mb-16 max-w-2xl mx-auto"
              >
                {paragraphs.map((text, index) => (
                  <motion.p
                    key={index}
                    variants={fadeIn}
                    className="text-lg mb-8 leading-relaxed"
                  >
                    {text}
                  </motion.p>
                ))}
              </motion.div>

              {/* Services Section */}
              <motion.div
                variants={staggerChildren}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                className="mb-24 text-center"
              >
                <motion.h2
                  variants={fadeIn}
                  className="baseborn-heading text-3xl md:text-4xl mb-12"
                >
                  Our Services
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  {services.map((service) => (
                    <motion.div
                      key={service.title}
                      variants={fadeIn}
                      className="text-left"
                    >
                      <h3 className="baseborn-heading text-xl mb-4">{service.title}</h3>
                      <p className="text-secondary mb-6">{service.description}</p>
                      <ul className="space-y-2">
                        {service.items.map((item, idx) => (
                          <li key={idx} className="text-sm text-secondary">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Our Work Philosophy Section */}
              <motion.div
                variants={staggerChildren}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                className="mb-32 max-w-3xl mx-auto"
              >
                <motion.h2
                  variants={fadeIn}
                  className="baseborn-heading text-3xl md:text-4xl mb-12 text-center"
                >
                  Our Work Philosophy
                </motion.h2>

                <motion.div variants={fadeIn} className="mb-10">
                  <h3 className="baseborn-heading text-xl mb-4">Passion & Dedication</h3>
                  <p className="text-lg text-secondary mb-4">
                    At BOUND LESS, we don't just create designs - we live and breathe our craft. Every pixel, every interaction, and every color choice is purposeful and deliberate. Our team works tirelessly, often into the late hours, refining concepts until they reach perfection.
                  </p>
                </motion.div>

                <motion.div variants={fadeIn} className="mb-10">
                  <h3 className="baseborn-heading text-xl mb-4">Beyond Expectations</h3>
                  <p className="text-lg text-secondary mb-4">
                    We believe in exceeding client expectations, not just meeting them. This means countless iterations, thorough research, and pushing creative boundaries. We're never satisfied with "good enough" - we strive for excellence in everything we deliver.
                  </p>
                </motion.div>

                <motion.div variants={fadeIn}>
                  <h3 className="baseborn-heading text-xl mb-4">Collaborative Intensity</h3>
                  <p className="text-lg text-secondary">
                    Our team thrives in the intensity of creative collaboration. We challenge each other, debate concepts, and push ideas to their limits. This sometimes means late nights, heated discussions, and relentless refinement - but the results speak for themselves in the quality of our work.
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* Large EST Title */}
            <div className="w-full px-2 sm:px-4 md:px-8 flex flex-col justify-center items-center border-t border-accent/20 mt-12">
              <p className="baseborn-title text-[2.5rem] xs:text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[12rem] 2xl:text-[16rem] leading-none text-center py-16">
                EST.2022
              </p>
            </div>
          </div>
        </motion.div>

        {/*
          Spacer div to create scroll distance.
          This div creates the extra height within `containerRef` that allows
          the `motion.div` to scroll up and reveal the fixed footer.
          The height of this spacer should ideally be equal to the height of the fixed footer
          or the desired amount of scroll needed to fully reveal it.
        */}
        <div className="h-screen" style={{ backgroundColor: 'transparent' }} />
      </div>
    </div>
  );
}