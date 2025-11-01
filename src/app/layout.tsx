
'use client';

import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import { AppShell } from '@/components/app-shell';
import { cn } from '@/lib/utils';
import { Inter as FontSans } from 'next/font/google';
import { useState, useEffect } from 'react';
import { SplashScreen } from '@/components/splash-screen';
import { FirebaseClientProvider } from '@/firebase/client-provider';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

// Metadata needs to be exported from a server component or a static export.
// Since we are converting this to a client component for the splash screen,
// we will handle metadata in a different way if needed, or acknowledge this change.
// For now, let's keep it simple. We can define static metadata.
// export const metadata: Metadata = {
//   title: 'EcoGoa',
//   description: 'Waste management and recycling for a greener Goa.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  // This check is to prevent the splash screen on subsequent soft navigations
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);
  
  // Basic metadata that can be defined in a client component.
  useEffect(() => {
    document.title = 'EcoGoa';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Waste management and recycling for a greener Goa.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Waste management and recycling for a greener Goa.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        {isLoading && isInitialLoad ? (
          <SplashScreen onAnimationEnd={() => setIsLoading(false)} />
        ) : (
          <FirebaseClientProvider>
            <AppShell>
              {children}
            </AppShell>
            <Toaster />
          </FirebaseClientProvider>
        )}
      </body>
    </html>
  );
}
