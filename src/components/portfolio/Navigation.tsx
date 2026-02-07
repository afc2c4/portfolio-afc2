
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutGrid, User, Settings, CodeXml, BookOpen, ShieldCheck } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();
  const isAdminPath = pathname.startsWith('/admin');

  const publicLinks = [
    { href: '/', label: 'Projetos', icon: LayoutGrid },
    { href: '/blog', label: 'Blog', icon: BookOpen },
  ];

  const adminLinks = [
    { href: '/admin/profile', label: 'Meu Perfil', icon: User },
    { href: '/admin/posts', label: 'Projetos', icon: Settings },
    { href: '/admin/blog', label: 'Blog', icon: BookOpen },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground group-hover:rotate-12 transition-transform">
            <CodeXml className="w-5 h-5" />
          </div>
          <span className="font-headline text-xl font-bold tracking-tight">DevFolio</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="flex items-center border-r pr-2 mr-2 gap-1 sm:gap-2">
            {(isAdminPath ? adminLinks : publicLinks).map(({ href, label, icon: Icon }) => (
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
          
          <Link
            href={isAdminPath ? "/" : "/admin/posts"}
            className={cn(
              "px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all",
              isAdminPath 
                ? "text-muted-foreground hover:text-foreground" 
                : "bg-secondary text-secondary-foreground hover:opacity-90 shadow-sm"
            )}
          >
            {isAdminPath ? <LayoutGrid className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
            <span className="hidden sm:inline">{isAdminPath ? "Sair do Painel" : "Painel Owner"}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
