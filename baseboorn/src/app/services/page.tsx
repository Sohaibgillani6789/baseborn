'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const services = {
  branding: [
    {
      name: 'Visual Identity',
      description: 'We create visual identities that stand out and leave a lasting impression.',
    },
    {
      name: 'Logo Design',
      description: 'Unique and memorable logos that represent your brand and values.',
    },
    {
      name: 'Motion Design',
      description: 'Bringing your brand to life through movement and animation.',
    },
    {
      name: 'Packaging',
      description: 'Packaging design that catches the eye and communicates your brand message.',
    },
    {
      name: 'Brand Guidelines',
      description: 'Clear and comprehensive guidelines to maintain brand consistency.',
    },
    {
      name: 'Art Direction',
      description: 'Creative direction that guides your brand\'s visual language and style.',
    },
  ],
  digital: [
    {
      name: 'Web Design',
      description: 'Beautiful, functional websites that provide an exceptional user experience.',
    },
    {
      name: 'Web Development (Webflow)',
      description: 'Custom Webflow development for responsive, performant websites.',
    },
    {
      name: 'E-commerce',
      description: 'Online stores that drive conversions and provide a seamless shopping experience.',
    },
    {
      name: 'User Experience',
      description: 'User-centered design that focuses on creating intuitive and enjoyable experiences.',
    },
    {
      name: 'Wireframing & Prototyping',
      description: 'Detailed planning and testing to ensure your digital product meets user needs.',
    },
  ],
};

export default function ServicesPage() {
  return (
    <div className="px-4 md:px-8">
      <div className="pt-20 pb-40 md:pt-32 md:pb-60">
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h1 className="huge-baseborn baseborn-title text-white mb-16">BASEBORN</h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-heading uppercase">Branding</h2>
              <div className="space-y-12">
                {services.branding.map((service, index) => (
                  <motion.div
                    key={service.name}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInVariants}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <h3 className="text-xl mb-2">{service.name}</h3>
                    <p className="text-secondary">{service.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="section-heading uppercase">Digital</h2>
              <div className="space-y-12">
                {services.digital.map((service, index) => (
                  <motion.div
                    key={service.name}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInVariants}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <h3 className="text-xl mb-2">{service.name}</h3>
                    <p className="text-secondary">{service.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            transition={{ duration: 0.6 }}
            className="mt-24 text-center"
          >
            <h2 className="text-2xl md:text-3xl mb-6">Need something else?</h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              If everything your brand is looking for isn&apos;t on the list, don&apos;t worry.
              We collaborate with great people to cover all aspects of your project.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
