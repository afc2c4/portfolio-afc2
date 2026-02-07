
"use client";

import { useProfile } from '@/hooks/use-portfolio';
import { Navigation } from '@/components/portfolio/Navigation';
import { ProfileForm } from '@/components/admin/ProfileForm';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminProfilePage() {
  const { profile, updateProfile, isLoading } = useProfile();

  return (
    <div className="min-h-screen bg-muted/10">
      <Navigation />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold">Configurar Perfil Dev</h1>
          <p className="text-muted-foreground mt-2">Atualize suas informações profissionais e stack tecnológica.</p>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : (
          <ProfileForm profile={profile} onSave={updateProfile} />
        )}
      </main>
    </div>
  );
}
