import { cn } from '@/lib/utils';

const RealisticLogoIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path d="M50 10 C 55 10, 60 15, 60 20 L 60 30 L 85 30 C 90 30, 95 35, 95 40 C 95 45, 90 50, 85 50 L 50 50 L 50 60 C 50 68, 42 75, 35 75 L 20 75 C 12 75, 5 68, 5 60 L 5 40 C 5 35, 10 30, 15 30 L 40 30 L 40 20 C 40 15, 45 10, 50 10 Z M 80 60 C 80 55, 75 50, 70 50 L 65 50 C 60 50, 55 55, 55 60 L 55 70 L 30 70 C 25 70, 20 75, 20 80 C 20 85, 25 90, 30 90 L 60 90 L 60 80 C 60 72, 68 65, 75 65 L 90 65 C 98 65, 105 58, 105 50 L 85 50 C 85 55, 80 60, 80 60 Z" transform="rotate(15, 50, 50)"/>
  </svg>
);


export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)} aria-label="EcoGoa">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
        <RealisticLogoIcon className="w-5 h-5 text-primary-foreground" />
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
        <RealisticLogoIcon className="w-16 h-16 text-black p-1" />
      </div>
       <span className="text-3xl font-bold font-headline text-foreground">
        EcoGoa
      </span>
    </div>
  )
}
