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
     <g transform="translate(3 3) scale(0.75)">
      <path d="M16.4 2.8c.2-.3.2-.6 0-.9l-2-2.8c-.2-.3-.5-.4-.8-.2L8.2 2.8c-.3.1-.4.5-.2.8l2 2.8c.2.3.5.4.8.2L16.4 2.8z" stroke="hsl(var(--background))" fill="hsl(var(--background))"/>
      <path d="m11.3 14.7 3.4-2.1" stroke="hsl(var(--background))" />
      <path d="M5.1 12.2c-1.4 2.4 1 5.2 3.8 5.6 2.8.4 5.2-1.9 5.6-4.3" stroke="hsl(var(--background))" />
      <path d="M16.9 13c-2.3-1.4-5.1.9-5.6 3.7s1.9 5.2 4.3 5.6" stroke="hsl(var(--background))" />
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
