'use client';

import React, { useEffect, useState } from 'react';
import CustomCursor from '@/components/CustomCursor';

const greetings = [
  { text: 'Hello', language: 'English' },
  { text: 'Hej', language: 'Danish' },
  { text: 'Bonjour', language: 'French' },
  { text: 'Salut', language: 'French' },
  { text: 'Hola', language: 'Spanish' },
  { text: 'Ciao', language: 'Italian' },
    { text: 'Salam', language: 'Arabic' },

];

export default function ContactPage() {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation(false);
      setTimeout(() => {
        setCurrentGreeting((prev) => (prev + 1) % greetings.length);
        setAnimation(true);
      }, 500);
    }, 3000);

    setAnimation(true);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white text-ray-600">
      <CustomCursor />
      <div className="px-4 md:px-8">
        <div className="py-24 md:py-36 max-w-5xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-gray-600 text-lg mb-8">
              We're always looking for amazing clients to work with
              drop us a mail and you will hear from us as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
            <div>
              <h3 className="text-sm font-medium mb-4 text-black">Business Inquiries</h3>
              <a
                href="mailto:newbiz@baseborn.studio"
                className="text-gray-600 hover:text-black transition-colors duration-300"
              >
                newbiz@baseborn.studio
              </a>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4 text-black">General</h3>
              <a
                href="mailto:hello@baseborn.studio"
                className="text-gray-600 hover:text-black transition-colors duration-300"
              >
                hello@baseborn.studio
              </a>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4 text-black">Call us</h3>
              <a
                href="tel:+4542760898"
                className="text-gray-600 hover:text-black transition-colors duration-300"
              >
                (+45) 42 76 08 98
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Black band with greeting animation */}
      <div className="bg-black py-32 w-full">
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="huge-baseborn baseborn-title text-black opacity-10 select-none pointer-events-none">
            BASEBORN
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="say-animation">
              <h2 className="text-5xl md:text-8xl baseborn-heading flex justify-center items-center text-white">
                <span className={animation ? '' : 'opacity-0'}>S</span>
                <span className={animation ? '' : 'opacity-0'} style={{ animationDelay: '0.05s' }}>A</span>
                <span className={animation ? '' : 'opacity-0'} style={{ animationDelay: '0.1s' }}>Y</span>
                <span className="w-4" />
                {greetings[currentGreeting].text.split('').map((letter, i) => (
                  <span
                    key={`${currentGreeting}-${i}-${letter}`}
                    className={animation ? '' : 'opacity-0'}
                    style={{ animationDelay: `${0.2 + i * 0.05}s` }}
                  >
                    {letter}
                  </span>
                ))}
              </h2>
            </div>
          </div>
          <p className="text-gray-400 mt-4">
            {greetings[currentGreeting].language}
          </p>
        </div>
      </div>

      
    </div>
  );
}
