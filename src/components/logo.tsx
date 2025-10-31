import { Recycle } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-3" aria-label="EcoGoa">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
        <Recycle className="w-5 h-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold font-headline text-foreground group-data-[collapsible=icon]:hidden">
        EcoGoa
      </span>
    </div>
  )
}
