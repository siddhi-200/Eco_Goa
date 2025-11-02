'use client';

import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AppShell } from '@/components/app-shell';
import { Inter as FontSans } from "next/font/google";
import { cn } from '@/lib/utils';
import { SplashScreen } from '@/components/splash-screen';
import { useState, useEffect } from 'react';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // This is just for demo purposes, in a real app you'd likely have
    // some data fetching or initialization logic here.
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);


  if (showSplash) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
            )}>
                <SplashScreen onAnimationEnd={() => setShowSplash(false)} />
            </body>
        </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <title>EcoGoa</title>
        <meta name="description" content="Waste management and recycling for a greener Goa." />
      </head>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <AppShell>
          {children}
        </AppShell>
        <Toaster />
      </body>
    </html>
  );
}
