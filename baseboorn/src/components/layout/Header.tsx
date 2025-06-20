'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export const Header = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateLahoreTime = () => {
      const now = new Date();
      const lahoreTime = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit', // Added seconds for more accurate display
        hour12: false, // 24-hour format
        timeZone: 'Asia/Karachi', // Lahore timezone
      }).format(now);

      setTime(lahoreTime);
    };

    updateLahoreTime();
    // Update every second for more accurate time display
    const interval = setInterval(updateLahoreTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Main Header */}
      <header className="fixed top-0 left-5 right-0 z-50 px-4 py-3 md:px-8 md:py-5 flex items-center justify-between bg-transparent text-white transition-colors duration-500">
        <div className="flex-none">
          <Link href="/" className="group flex items-center cursor-pointer">
            {/* Logo container for hover effects */}
            {/* The 'group' class on the Link allows applying hover effects to children.
                This div acts as the initial sizing container for the image. */}
            <div className="w-8 h-6 relative md:w-18 md:h-18">
              {/*
              

                If 'gia.jpg' has a black background baked into the image itself, CSS
                cannot remove it directly. The 'brightness' and 'contrast' filters below
                will *alter the appearance* of the current JPG, but not change its
                base color to a specific new color, nor remove a non-transparent background.
              */}
              <Image
                src="/images/logo.svg" // Please update this to a transparent PNG or SVG!
                alt="Boundless Studio" // Updated alt text
                width={52} // Original intrinsic width of the image for Next.js optimization
                height={52} // Original intrinsic height of the image for Next.js optimization
              
                className="
                  object-contain
                  transition-all duration-300 ease-in-out
                  group-hover:scale-125
                  // For SVG logos only: Uncomment the line below to change SVG fill color on hover:
                   group-hover:fill-blue-900
                "
              />
            </div>
          </Link>
        </div>

        {/* Navigation - Always visible, responsive layout */}
        <nav className="flex-1 flex justify-center items-center">
          <ul className="flex flex-wrap justify-center space-x-2 md:space-x-4 lg:space-x-6 text-[12px] md:text-[14px] lg:text-[15px]">
            <li>
              <Link href="/work" className="nav-link">
                Work <sup className="text-xs">(6)</sup>
              </Link>
            </li>
            <li>
              <Link href="/studio" className="nav-link">
                Studio
              </Link>
            </li>
            <li>
              <Link href="/services" className="nav-link">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="nav-link">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex-none flex justify-end items-center">
          {/* Lahore Time: Always visible, font size responsive */}
          <div className="text-[12px] md:text-[14px] lg:text-[15px] text-gray-400 flex items-center">
            <span className="mr-1 md:mr-2">LHR</span>
            <span id="lahore-time">{time}</span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
