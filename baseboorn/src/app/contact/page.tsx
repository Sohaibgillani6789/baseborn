'use client';

import React, { useEffect, useState } from 'react';


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
    // This is the main container for your ContactPage.
    // Ensure it has bg-neutral-900 for the overall page background.
    <div className="bg-neutral-900 text-gray-200 min-h-screen flex flex-col">

      {/* Greeting Message Section (Middle) */}
      <div className="flex-grow flex items-center justify-center py-24 md:py-36">
        <div className="relative max-w-7xl mx-auto text-center">
          {/* Language Text (Moved to top) */}
          <p className="text-gray-400 mb-36">
            {greetings[currentGreeting].language}
          </p>
          
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
        </div>
      </div>

      {/* Contact Info Section (Bottom) */}
      {/* If you want this section to also be neutral-900, change bg-white to bg-neutral-900 */}
      {/* For example: <div className="bg-neutral-900 text-gray-200 px-4 md:px-8 py-16"> */}
      <div className="bg-white text-gray-600 px-4 md:px-8 py-16"> 
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-600 text-lg mb-8">
            We're always looking for amazing clients to work with; drop us a mail and you will hear from us as soon as possible.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
    </div>
  );
}