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
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from './logo';
import { BookOpen, CalendarPlus, Home, LogOut, Map, Megaphone, Recycle, ScanSearch, User } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

const navItems = [
  { href: '/', label: 'Dashboard', icon: <Home /> },
  { href: '/schedule-pickup', label: 'Schedule Pickup', icon: <CalendarPlus /> },
  { href: '/tracking', label: 'Track Collection', icon: <Map /> },
  { href: '/recycling-rewards', label: 'Recycling Rewards', icon: <Recycle /> },
  { href: '/identify-waste', label: 'Identify Waste', icon: <ScanSearch /> },
  { href: '/resources', label: 'Resources', icon: <BookOpen /> },
  { href: '/report-dumping', label: 'Report Dumping', icon: <Megaphone /> },
];

function UserProfile() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  if (!user) {
    return (
      <SidebarMenuButton asChild>
        <Link href="/login">
          <User />
          <span>Sign In</span>
        </Link>
      </SidebarMenuButton>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto w-full justify-start p-2 text-left">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
            <AvatarFallback>{getInitials(user.displayName ?? 'U')}</AvatarFallback>
          </Avatar>
          <div className="ml-2 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-medium">{user.displayName}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start" className="w-56">
        <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useUser();
  const router = useRouter();

  const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(pathname);

  // If loading, show a simplified shell or a loading state.
  if (loading) {
     return <div className="flex h-screen w-screen items-center justify-center">Loading...</div>;
  }
  
  // If the user is not authenticated and not on an auth page, redirect to login.
  if (!user && !isAuthPage && typeof window !== 'undefined') {
    router.push('/login');
    return <div className="flex h-screen w-screen items-center justify-center">Redirecting...</div>;
  }
  
  // If the user is authenticated and on an auth page, redirect to the home page.
  if (user && isAuthPage && typeof window !== 'undefined') {
    router.push('/');
    return <div className="flex h-screen w-screen items-center justify-center">Redirecting...</div>;
  }

  // Render auth pages without the main app shell.
  if (isAuthPage) {
    return <>{children}</>;
  }

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
           <UserProfile />
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
