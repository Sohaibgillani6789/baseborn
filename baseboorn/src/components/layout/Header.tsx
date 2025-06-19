'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export const Header = () => {
  const [time, setTime] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu visibility

  useEffect(() => {
    const updateCPHTime = () => {
      const now = new Date();
      // Using 'en-US' locale for consistent time formatting
      const cphTime = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // 24-hour format
        timeZone: 'Europe/Copenhagen'
      }).format(now);

      setTime(cphTime);
    };

    // Update time immediately on mount
    updateCPHTime();
    // Update time every minute
    const interval = setInterval(updateCPHTime, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Effect to close mobile menu if screen resizes to desktop size
  useEffect(() => {
    const handleResize = () => {
      // Assuming 'md' breakpoint is 768px. Close menu if screen is desktop size.
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]); // Dependency on isMobileMenuOpen ensures it runs when menu state changes

  // Effect to disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Clean up on component unmount or when isMobileMenuOpen changes
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);


  return (
    <>
      {/* Main Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-8 md:py-5 flex items-center justify-between bg-neutral-900 text-white transition-colors duration-500 backdrop-blur-sm">
        <div className="flex-1">
          <Link href="/" className="group flex items-center">
            {/* Adjusted logo size and position for mobile, restored for desktop */}
            <div className="w-6 h-6 relative left-2 md:w-8 md:h-8 md:left-4">
              <Image
                src="/images/gia.jpg"
                alt="Baseborn Studio"
                width={32} // Next/Image props, Tailwind classes control display size
                height={32}
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation: Hidden on mobile, flex on medium (md) screens and up */}
        <nav className="hidden md:flex flex-1 justify-center items-center">
          <ul className="flex space-x-4 md:space-x-6 text-[14px] md:text-[15px]">
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

        <div className="flex-1 flex justify-end items-center">
          {/* CPH Time: Always visible, font size responsive */}
          {/* On mobile, moved slightly to left to accommodate hamburger button */}
          <div className="text-[14px] md:text-[15px] text-secondary flex items-center mr-4 md:mr-0">
            <span className="mr-1 md:mr-2">CPH</span>
            <span id="copenhagen-time">{time}</span>
          </div>

          {/* Mobile Hamburger Button: Visible on mobile, hidden on md and up */}
          <button
            className="md:hidden z-50 flex flex-col justify-around w-6 h-6 bg-transparent border-none cursor-pointer p-0 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {/* Hamburger lines with animation for opening/closing */}
            <div className={`w-full h-[2px] bg-white transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <div className={`w-full h-[2px] bg-white transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-full h-[2px] bg-white transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay: Fixed, full screen, slides in/out. Hidden on md and up. */}
      <div
        className={`fixed inset-0 z-40 bg-neutral-900 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden flex flex-col items-center justify-center`}
      >
        {/* Close Button for the mobile menu */}
        <button
          className="absolute top-4 right-4 text-white text-3xl focus:outline-none"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close mobile menu"
        >
          &times; {/* Simple 'x' icon */}
        </button>
        {/* Navigation links inside the mobile overlay */}
        <nav className="flex flex-col items-center space-y-8 text-2xl font-bold">
          <li> {/* Added li tags as good practice for nav lists */}
            <Link href="/work" className="nav-link text-white" onClick={() => setIsMobileMenuOpen(false)}>
              Work <sup className="text-sm">(6)</sup>
            </Link>
          </li>
          <li>
            <Link href="/studio" className="nav-link text-white" onClick={() => setIsMobileMenuOpen(false)}>
              Studio
            </Link>
          </li>
          <li>
            <Link href="/services" className="nav-link text-white" onClick={() => setIsMobileMenuOpen(false)}>
              Services
            </Link>
          </li>
          <li>
            <Link href="/contact" className="nav-link text-white" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </Link>
          </li>
        </nav>
      </div>
    </>
  );
};

export default Header;