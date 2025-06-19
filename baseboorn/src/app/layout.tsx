'use client';

import "./globals.css";
import Header from "@/components/layout/Header";
import { LoaderProvider } from "@/context/LoaderContext";
import Loader from "@/components/Loader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LoaderProvider>
          <Loader />
          <Header />
          <main className="min-h-screen pt-20 pb-20">{children}</main>
        </LoaderProvider>
      </body>
    </html>
  );
}
