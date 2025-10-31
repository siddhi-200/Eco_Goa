import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AppShell } from '@/components/app-shell';
import { FirebaseClientProvider } from '@/firebase';
import { Inter as FontSans } from "next/font/google";
import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: 'EcoGoa',
  description: 'Waste management and recycling for a greener Goa.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <FirebaseClientProvider>
          <AppShell>
            {children}
          </AppShell>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
