
"use client";

import { useProfile, useProjects } from '@/hooks/use-portfolio';
import { Navigation } from '@/components/portfolio/Navigation';
import { ProfileHeader } from '@/components/portfolio/ProfileHeader';
import { PostGrid } from '@/components/portfolio/PostGrid';
import { Skeleton } from '@/components/ui/skeleton';
import { CodeXml } from 'lucide-react';

export default function HomePage() {
  const { profile, isLoading: isProfileLoading } = useProfile();
  const { projects, isLoading: isProjectsLoading } = useProjects();
  
  // Só considera carregado se o perfil existir (ou terminar de carregar)
  const isLoaded = !isProfileLoading && !isProjectsLoading;
  const hasContent = !!profile;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-6xl">
        {!isLoaded ? (
          <div className="space-y-12">
            <div className="flex flex-col items-center gap-4">
              <Skeleton className="h-32 w-32 rounded-full" />
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-6 w-full max-w-lg" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              {[1, 2, 3].map(i => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-2xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        ) : !hasContent ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center mb-6">
              <CodeXml className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="font-headline text-3xl font-bold mb-2">Bem-vindo ao DevFolio</h1>
            <p className="text-muted-foreground max-w-md">O dono deste portfólio ainda está configurando as informações profissionais.</p>
          </div>
        ) : (
          <>
            <ProfileHeader profile={profile} />
            <div className="mt-20">
              <div className="flex items-center justify-between mb-12">
                <h2 className="font-headline text-4xl font-bold">Projetos em Destaque</h2>
                <div className="h-px bg-border flex-grow ml-8" />
              </div>
              <PostGrid posts={projects} />
            </div>
          </>
        )}
      </main>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} DevFolio. Showcase para Desenvolvedores de Elite.</p>
        </div>
      </footer>
    </div>
  );
}
