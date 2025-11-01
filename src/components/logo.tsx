import { cn } from '@/lib/utils';

const RealisticLogoIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path d="M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 M50,0 C22.4,0 0,22.4 0,50 C0,77.6 22.4,100 50,100 C77.6,100 100,77.6 100,50 C100,22.4 77.6,0 50,0" />
    <path d="M50,18 C62.4,18 73.1,26.5 77,37 L89.8,31.7 C84.1,16.5 68.6,6 50,6 C31.4,6 15.9,16.5 10.2,31.7 L23,37 C26.9,26.5 37.6,18 50,18" />
    <path d="M22.9,63 C18.9,53.4 19.8,42.4 25.1,33.5 L12.3,28.2 C4.9,40.4 4,56.7 10.7,68.9 L22.9,63" />
    <path d="M74.9,33.5 C80.2,42.4 81.1,53.4 77.1,63 L89.3,68.9 C96,56.7 95.1,40.4 87.7,28.2 L74.9,33.5" />
    <path d="M43,78 C39,83.5 32.5,87 25,87 C15.7,87 8.3,80.9 6.2,72 L2.1,73.5 C4.7,85.2 13.9,93 25,93 C34.5,93 42.9,88.4 48,82 L43,78" />
    <path d="M57,78 C61,83.5 67.5,87 75,87 C84.3,87 91.7,80.9 93.8,72 L97.9,73.5 C95.3,85.2 86.1,93 75,93 C65.5,93 57.1,88.4 52,82 L57,78" />
  </svg>
);


export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)} aria-label="EcoGoa">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
        <RealisticLogoIcon className="w-6 h-6 text-primary-foreground" />
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
        <RealisticLogoIcon className="w-20 h-20 text-black p-1" />
      </div>
       <span className="text-3xl font-bold font-headline text-foreground">
        EcoGoa
      </span>
    </div>
  )
}
