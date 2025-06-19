'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export const Header = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateCPHTime = () => {
      const now = new Date();
      const cphTime = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Europe/Copenhagen'
      }).format(now);

      setTime(cphTime);
    };

    updateCPHTime();
    const interval = setInterval(updateCPHTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
<header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-5 flex items-center justify-between bg-neutral-900 text-white transition-colors duration-500 backdrop-blur-sm">
      <div className="flex-1">
        <Link href="/" className="group flex items-center">
          <div className="w-8 h-8 relative left-4" >
            <Image
              src="/images/gia.jpg"
              alt="Baseborn Studio"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
        </Link>
      </div>

      <nav className="flex-1 flex justify-center items-center">
        <ul className="flex space-x-6 text-[15px]">
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

      <div className="flex-1 flex justify-end">
        <div className="text-[15px] text-secondary flex items-center">
          <span className="mr-2">CPH</span>
          <span id="copenhagen-time">{time}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
