import { Recycle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)} aria-label="EcoGoa">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
        <Recycle className="w-5 h-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold font-headline text-foreground group-data-[collapsible=icon]:hidden">
        EcoGoa
      </span>
    </div>
  )
}

export function SplashScreenLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center flex-col gap-4", className)}>
       <div className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
        <Recycle className="w-16 h-16 text-black" />
      </div>
       <span className="text-3xl font-bold font-headline text-foreground">
        EcoGoa
      </span>
    </div>
  )
}
