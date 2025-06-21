// src/app/layout.tsx
// REMOVE THE FOLLOWING LINE: 'use client';

import './globals.css'; // Corrected path

import Header from '@/components/layout/Header';
import { LoaderProvider } from '@/context/LoaderContext';
import Loader from '@/components/Loader';
import CustomCursor from '@/components/CustomCursor';

// NO AnimatePresence, motion, usePathname, useEffect, useState here!

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // No state or effects for page transitions here
  return (
    <html lang="en">
      <body>
        <LoaderProvider>
          {/* Global components that persist across page navigations */}
          <CustomCursor />
          <Loader />
          <Header />

          {/* This `main` wrapper will contain the template.tsx and then the page content */}
          <main className="min-h-screen pt-20 pb-20 relative">
            {children} {/* This is where template.tsx will render */}
          </main>
        </LoaderProvider>
      </body>
    </html>
  );
}