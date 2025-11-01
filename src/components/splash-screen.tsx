
'use client';

import { SplashScreenLogo } from './logo';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

type SplashScreenProps = {
  onAnimationEnd: () => void;
};

export function SplashScreen({ onAnimationEnd }: SplashScreenProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
    }, 59500); // Show splash for 59.5 seconds

    const fadeOutTimer = setTimeout(() => {
      onAnimationEnd();
    }, 60000); // 59.5s display + 0.5s fade out

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeOutTimer);
    };
  }, [onAnimationEnd]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500',
        isFadingOut ? 'opacity-0' : 'opacity-100'
      )}
    >
      <div className="animate-pulse">
        <SplashScreenLogo />
      </div>
    </div>
  );
}
