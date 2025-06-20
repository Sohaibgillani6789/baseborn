'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import useSmoothScroll from '../hooks/useSmoothScroll';

const transition = {
  duration: 0.8,
  ease: [0.43, 0.13, 0.23, 0.96]
};

const fadeIn = {
  hidden: { opacity: 0, y: 50, scale: 0.95 }, // Starts 50px below and slightly scaled down
  visible: {
    opacity: 1,
    y: 0, // Moves to its original Y position
    scale: 1,
    transition: {
      duration: 0.8, // Add a duration here for individual elements
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Reduced stagger for a slightly faster overall reveal
      delayChildren: 0.1, // Reduced delay
    },
  },
};

const teamMembers = [
  {
    name: 'S. Sohaib Gilani',
    role: 'Interactive Designer & Co-Founder',
    imageUrl: 'https://ext.same-assets.com/2519627967/3639195492.webp',
  },
  {
    name: 'M. muzammil',
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
  useSmoothScroll();

  const paragraphs = [
    "We're an independent digital-first design studio, combining branding, motion design & digital design to help amazing clients stand out from the crowd in a digital first world.",
    'We believe that for a brand to break through the barrier of today’s digital world, it needs to be a memorable experience across all platforms.',
    'Our philosophy is that working closely with our clients, understanding their vision, and immersing ourselves in their brand story allows us to create truly impactful designs.',
    'With more than 20+ years of experience combined, we bring a wealth of knowledge and expertise to every project, ensuring top-notch quality and innovation.',
  ];

  const containerRef = useRef(null); // This ref is not currently used for a scroll animation target.
  const triggerRef = useRef(null); // This ref is for the EST.2022 section's scroll animation

  // Set up scroll animation for the dark section sliding up
  const { scrollYProgress } = useScroll({
    target: triggerRef, // The EST.2022 section triggers this
    offset: ["start bottom", "end top"]
  });

  // Transform scroll progress to slide the dark section up
  const yTransform = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vh", "-50vh"] // This makes the dark section slide up over the white section
  );

  return (
    <div className="relative">

      {/* Fixed White Background Section - Half Height */}
      <div className="fixed bottom-0 left-0 w-full h-[50vh] bg-white text-black z-0">
        {/* Pattern overlay */}
        <div className="absolute w-full h-full flex items-center justify-center">
          <div className="w-full max-w-[1400px] opacity-90">
            <Image
              src="/images/pattern.svg"
              alt="Pattern"
              width={600}
              height={600}
              priority
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Contact Information - Consider adding whileInView here if it's meant to animate */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center z-10">
          <motion.h3
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="baseborn-heading text-sm mb-1"
          >
            Get in Touch
          </motion.h3>
          <motion.p
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="mb-1 text-xs"
          >
            hello@baseborn.design
          </motion.p>
          <motion.p
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-xs"
          >
            +1 (123) 456-7890
          </motion.p>
        </div>

        {/* BOUNDLESS text - This is part of the fixed background, so it appears without scroll-triggered animation.
            If you want it to appear with an animation when the page loads, use `animate="visible"`.
            If you want it to be a part of the scroll reveal, move it into the dark section.
            For now, let's keep it static as it seems intended for the fixed white section.
        */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center px-4">
          <h2 className="baseborn-title text-[5rem] sm:text-[7rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] 2xl:text-[12rem] text-neutral-900 leading-none text-center break-words relative z-10">
            BOUNDLESS
          </h2>
        </div>
      </div>

      {/* Sliding Dark Content - Covers entire viewport initially */}
      <motion.div
        style={{
          y: yTransform,
        }}
        className="relative bg-neutral-900 text-white min-h-[200vh] z-30"
      >
        <div className="py-16 sm:py-20"> {/* Adjusted top padding */}
          {/* Hero Title */}
          <motion.div
            initial="hidden"
            animate="visible" // Animate on initial load
            variants={fadeIn} // Using fadeIn for a bottom-to-top reveal
            className="mb-12 sm:mb-16 text-left pl-4 pr-4 overflow-hidden"
          >
            <h1 className="baseborn-title text-[3.5rem] xs:text-[4rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] 2xl:text-[12rem] mb-4 sm:mb-8 leading-[0.85] font-bold">
              BORNIN <br /> DIGITAL
            </h1>
          </motion.div>

          <div className="max-w-5xl mx-auto px-4 text-left">
            {/* Paragraph at the top, just below BORNIN DIGITAL */}
            <motion.p
              variants={fadeIn}
              initial="hidden"
              whileInView="visible" // Animate when it enters the viewport
              viewport={{ once: true, amount: 0.5 }} // Trigger when 50% of the element is visible, animate once
              className="text-lg mb-16 max-w-xl leading-relaxed"
            >
              We're an independent digital-first design studio, combining branding, motion design & digital design to help amazing clients stand out from the crowd in a digital first world.
            </motion.p>

            {/* Team Section */}
            <motion.div
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible" // Animate when the container enters the viewport
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-2 gap-4 md:gap-8 mb-24"
            >
              {teamMembers.map((member) => (
                // Each team member div will animate individually using fadeIn
                <motion.div key={member.name} variants={fadeIn} className="relative text-center">
                  <div className="aspect-square overflow-hidden mb-4">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      width={500}
                      height={500}
                      priority
                      className="w-full h-full object-cover transition-all duration-500 filter grayscale hover:grayscale-0"
                    />
                  </div>
                  <h3 className="text-xl font-bold baseborn-heading">{member.name}</h3>
                  <p className="text-secondary">{member.role}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Paragraphs (Remaining ones) */}
            <motion.div
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }} // Animate once
              className="mb-16 max-w-2xl mx-auto"
            >
              {paragraphs.slice(1).map((text, index) => (
                <motion.p
                  key={index}
                  variants={fadeIn} // Each paragraph animates with fadeIn
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
              viewport={{ once: true, amount: 0.3 }} // Animate once
              className="mb-24 text-center"
            >
              <motion.h2
                variants={fadeIn} // Animate the heading with fadeIn
                className="baseborn-heading text-3xl md:text-4xl mb-12"
              >
                Our Services
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                {services.map((service) => (
                  // Each service div animates with fadeIn
                  <motion.div
                    key={service.title}
                    variants={fadeIn}
                    className="text-left"
                  >
                    <h3 className="baseborn-heading text-xl mb-4">{service.title}</h3>
                    <p className="text-secondary mb-6">{service.description}</p>
                    <ul className="space-y-2">
                      {service.items.map((item, idx) => (
                        // If you want each list item to stagger, you'd wrap them in a motion.ul and give them their own variants.
                        // For now, they'll appear with the parent service div.
                        <li key={idx} className="text-sm text-secondary">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Work Philosophy Section */}
            <motion.div
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }} // Animate once
              className="mb-32 max-w-3xl mx-auto"
            >
              <motion.h2
                variants={fadeIn} // Animate the heading with fadeIn
                className="baseborn-heading text-3xl md:text-4xl mb-12 text-center"
              >
                Our Work Philosophy
              </motion.h2>

              <motion.div variants={fadeIn} className="mb-10 text-left">
                <h3 className="baseborn-heading text-xl mb-4">Passion & Dedication</h3>
                <p className="text-lg text-secondary mb-4">
                  At BOUND LESS, we don't just create designs - we live and breathe our craft. Every pixel, every interaction, and every color choice is purposeful and deliberate. Our team works tirelessly, often into the late hours, refining concepts until they reach perfection.
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="mb-10 text-left">
                <h3 className="baseborn-heading text-xl mb-4">Beyond Expectations</h3>
                <p className="text-lg text-secondary mb-4">
                  We believe in exceeding client expectations, not just meeting them. This means countless iterations, thorough research, and pushing creative boundaries. We're never satisfied with "good enough" - we strive for excellence in everything we deliver.
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="text-left">
                <h3 className="baseborn-heading text-xl mb-4">Collaborative Intensity</h3>
                <p className="text-lg text-secondary">
                  Our team thrives in the intensity of creative collaboration. We challenge each other, debate concepts, and push ideas to their limits. This sometimes means late nights, heated discussions, and relentless refinement - but the results speak for themselves in the quality of our work.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* EST.2022 Section - This is the trigger point */}
          <div ref={triggerRef} className="w-full px-2 sm:px-4 md:px-8 flex flex-col justify-center items-center border-t border-accent/20 mt-12">
            {/* The EST.2022 text itself is not a motion.div, so it won't animate with fadeIn.
                If you want it to animate, wrap it in a motion.h2 and apply fadeIn.
            */}
            <h2 className="baseborn-title text-[3rem] xs:text-[4.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[16rem] leading-none text-center py-16">
              EST.2022
            </h2>
          </div>
        </div>
      </motion.div>

      {/* Spacer to allow for scroll effect and stop at white page */}
      <div className="h-[50vh] bg-transparent relative z-0"></div>
    </div>
  );
}