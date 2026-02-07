
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutGrid, User, Settings, Palette } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Portfolio', icon: LayoutGrid },
    { href: '/admin/profile', label: 'Profile', icon: User },
    { href: '/admin/posts', label: 'Manage Posts', icon: Settings },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground group-hover:rotate-12 transition-transform">
            <Palette className="w-5 h-5" />
          </div>
          <span className="font-headline text-xl font-bold tracking-tight">ArtFolio</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-4">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors",
                pathname === href 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
