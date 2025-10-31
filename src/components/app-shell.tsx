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
  SidebarGroup,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from './logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth, useUser } from '@/firebase';
import { BookOpen, CalendarPlus, Home, LogOut, Map, Megaphone, Recycle, ScanSearch, Settings, User as UserIcon } from 'lucide-react';
import { signOut } from 'firebase/auth';

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
  const { user, loading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/login');
    }
  };

  if (loading) {
    return null;
  }

  if (!user) {
    return (
       <Button asChild variant="outline">
          <Link href="/login">Login</Link>
       </Button>
    )
  }

  const userInitial = user.displayName ? user.displayName.charAt(0).toUpperCase() : <UserIcon size={20} />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="w-full justify-start gap-2 text-left"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
            <AvatarFallback>{userInitial}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <span className="truncate font-medium">{user.displayName}</span>
            <span className="truncate text-xs text-muted-foreground">{user.email}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm font-medium leading-none">{user.displayName}</p>
          <p className="text-xs leading-none text-muted-foreground">
            {user.email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
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

  // If loading, and not on an auth page, show a loader or nothing
  if (loading && !isAuthPage) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        {/* Or a more sophisticated loading skeleton */}
      </div>
    );
  }

  // If not logged in and not on an auth page, redirect
  if (!user && !isAuthPage && !loading) {
     router.push('/login');
     return null; // or a loading spinner
  }

  // If logged in and on an auth page, redirect to home
  if (user && isAuthPage) {
    router.push('/');
    return null; // or a loading spinner
  }

  // Render auth pages without the main app shell
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
           <SidebarGroup>
              <UserProfile />
           </SidebarGroup>
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
