'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './logo';
import { BookOpen, CalendarPlus, Home, Info, Map, Megaphone, Recycle, ScanSearch } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: <Home /> },
  { href: '/about', label: 'About', icon: <Info /> },
  { href: '/schedule-pickup', label: 'Schedule Pickup', icon: <CalendarPlus /> },
  { href: '/tracking', label: 'Track Collection', icon: <Map /> },
  { href: '/recycling-rewards', label: 'Recycling Rewards', icon: <Recycle /> },
  { href: '/identify-waste', label: 'Identify Waste', icon: <ScanSearch /> },
  { href: '/resources', label: 'Resources', icon: <BookOpen /> },
  { href: '/report-dumping', label: 'Report Dumping', icon: <Megaphone /> },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           {/* User Profile can be added here later */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 md:px-6">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-lg font-semibold md:text-xl font-headline">
            {navItems.find(item => item.href === pathname)?.label || 'Dashboard'}
          </h1>
        </header>
        <div className="flex-1 overflow-auto bg-background">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
