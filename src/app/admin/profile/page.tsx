
"use client";

import { usePortfolio } from '@/hooks/use-portfolio';
import { Navigation } from '@/components/portfolio/Navigation';
import { ProfileForm } from '@/components/admin/ProfileForm';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminProfilePage() {
  const { data, updateProfile, isLoaded } = usePortfolio();

  return (
    <div className="min-h-screen bg-muted/10">
      <Navigation />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold">Configurar Perfil Dev</h1>
          <p className="text-muted-foreground mt-2">Atualize suas informações profissionais e stack tecnológica.</p>
        </div>

        {!isLoaded ? (
          <div className="space-y-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : (
          <ProfileForm profile={data.profile} onSave={updateProfile} />
        )}
      </main>
    </div>
  );
}
