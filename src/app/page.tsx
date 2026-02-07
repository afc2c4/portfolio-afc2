
"use client";

import { useProfile, useProjects } from '@/hooks/use-portfolio';
import { Navigation } from '@/components/portfolio/Navigation';
import { ProfileHeader } from '@/components/portfolio/ProfileHeader';
import { PostGrid } from '@/components/portfolio/PostGrid';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomePage() {
  const { profile, isLoading: isProfileLoading } = useProfile();
  const { projects, isLoading: isProjectsLoading } = useProjects();
  
  const isLoaded = !isProfileLoading && !isProjectsLoading;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-6xl">
        {!isLoaded ? (
          <div className="space-y-12">
            <div className="flex flex-col items-center gap-4">
              <Skeleton className="h-24 w-24 rounded-full" />
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-96" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-80 w-full rounded-xl" />
              ))}
            </div>
          </div>
        ) : (
          <>
            <ProfileHeader profile={profile} />
            <div className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-headline text-3xl font-bold">Projetos em Destaque</h2>
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
