
"use client";

import { useBlog } from '@/hooks/use-portfolio';
import { Navigation } from '@/components/portfolio/Navigation';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { blogPosts, isLoading } = useBlog();
  
  const post = blogPosts.find(p => p.id === id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-12 max-w-3xl">
          <Skeleton className="h-10 w-3/4 mb-6" />
          <Skeleton className="h-64 w-full rounded-2xl mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Artigo não encontrado</h1>
          <p className="text-muted-foreground mb-8">O conteúdo que você procura não existe ou foi removido.</p>
          <Button onClick={() => router.push('/blog')}>Voltar para o Blog</Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-3xl">
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-8 hover:bg-transparent hover:text-primary p-0 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Button>

        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {format(new Date(post.createdAt), "dd 'de' MMMM, yyyy", { locale: ptBR })}
            </div>
            {post.tags.length > 0 && (
              <div className="flex items-center gap-1.5">
                <Tag className="w-4 h-4" />
                <div className="flex gap-1">
                  {post.tags.map(tag => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <h1 className="font-headline text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground italic border-l-4 border-primary pl-6 py-2">
            {post.excerpt}
          </p>
        </header>

        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl mb-12">
          <Image
            src={post.coverUrl || `https://picsum.photos/seed/${post.id}/1200/600`}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <article className="prose prose-lg max-w-none dark:prose-invert">
          <div className="whitespace-pre-wrap leading-relaxed text-lg text-foreground/90 space-y-6">
            {post.content}
          </div>
        </article>

        <div className="mt-16 pt-8 border-t">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t py-12 bg-muted/30 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} DevFolio. Insights e Tecnologia.</p>
        </div>
      </footer>
    </div>
  );
}
