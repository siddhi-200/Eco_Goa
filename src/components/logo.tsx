import { cn } from '@/lib/utils';

const RealisticLogoIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" stroke="none" />
    <g transform="translate(4 4) scale(0.6)">
        <path d="M12 6v3l4-4-4-4v3" stroke="hsl(var(--background))" />
        <path d="M6 12l-4 4 4 4v-3" stroke="hsl(var(--background))" />
        <path d="M18.004 15l4 4-4 4v-3" stroke="hsl(var(--background))" />
        <path d="M11 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0" fill="hsl(var(--background))" stroke="none"/>
    </g>
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
