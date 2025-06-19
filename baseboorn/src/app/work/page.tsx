'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
    id: 'birdie',
    title: 'Birdie',
    subtitle: 'A Fresh Air Monitor',
    imageUrl: 'https://ext.same-assets.com/152564834/1725000487.webp',
    link: '/work/birdie',
    tags: ['Branding', 'Website', 'UI/UX'],
  },
  {
    id: 'curb-cph',
    title: 'CURBCPH',
    subtitle: 'A new appearance',
    videoUrl: 'https://ext.same-assets.com/152564834/2466347151.mp4',
    link: '/work/curb-cph',
    tags: ['Branding', 'Website'],
  },
  {
    id: 'mixmob',
    title: 'MixMob',
    subtitle: 'Web3 website experience',
    videoUrl: 'https://ext.same-assets.com/152564834/343488274.mp4',
    link: '/work/mixmob',
    tags: ['Website', 'Web3', 'UI/UX'],
  },
  {
    id: 'palette',
    title: 'PALETTE',
    subtitle: 'Taste the full Palette',
    imageUrl: 'https://ext.same-assets.com/152564834/2899481985.webp',
    link: '/work/palette',
    tags: ['Branding', 'Website', 'E-commerce'],
  },
  {
    id: 'pirate-wires',
    title: 'PirateWires',
    subtitle: 'Wave your flag for news',
    videoUrl: 'https://ext.same-assets.com/152564834/3354482214.mp4',
    link: '/work/pirate-wires',
    tags: ['Website', 'UI/UX', 'Motion'],
  },
  {
    id: 'take-a-ride-with-me',
    title: 'TakeARideWithMe',
    subtitle: 'Downhill Mountainbike',
    imageUrl: 'https://ext.same-assets.com/152564834/1955105303.webp',
    link: '/work/take-a-ride-with-me',
    tags: ['Website', 'Motion'],
  },
];

export default function WorkPage() {
  return (
    <div className="px-4 md:px-8">
      <div className="py-24 md:py-36 max-w-5xl mx-auto">
        <div className="mb-16 text-center">
          <p className="text-secondary text-lg mb-8">We transform brands into experiences</p>
          <h1 className="baseborn-title text-4xl md:text-5xl lg:text-6xl mb-4">Work</h1>
          <p className="text-secondary">Current Work ({projects.length})</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.link}
              className="hover-project block aspect-square relative rounded-lg overflow-hidden"
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
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              )}

              <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-xl md:text-2xl font-bold baseborn-heading text-white">{project.title}</h3>
                <p className="text-sm md:text-base text-white/80">{project.subtitle}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.map((tag) => (
                    <span key={`${project.id}-${tag}`} className="text-xs bg-white/10 px-2 py-1 rounded text-white/70">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
