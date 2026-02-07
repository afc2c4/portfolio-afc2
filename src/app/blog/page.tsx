
"use client";

import { useBlog } from '@/hooks/use-portfolio';
import { Navigation } from '@/components/portfolio/Navigation';
import { BookOpen } from 'lucide-react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';

export default function PublicBlogPage() {
  const { blogPosts, isLoading } = useBlog();
  const publishedPosts = blogPosts.filter(p => p.published);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-16">
          <h1 className="font-headline text-5xl font-bold mb-4">Blog & Insights</h1>
          <p className="text-xl text-muted-foreground">Explorando o futuro do desenvolvimento de software.</p>
        </header>

        {isLoading ? (
          <div className="space-y-8">
            {[1, 2].map(i => <Skeleton key={i} className="h-64 w-full rounded-2xl" />)}
          </div>
        ) : publishedPosts.length === 0 ? (
          <div className="text-center py-24">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
            <p className="text-muted-foreground text-lg">Novos artigos estão sendo preparados. Volte em breve!</p>
          </div>
        ) : (
          <div className="grid gap-12">
            {publishedPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <article className="group cursor-pointer">
                  <div className="grid md:grid-cols-5 gap-8 items-center">
                    <div className="md:col-span-2">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
                        <Image
                          src={post.coverUrl || `https://picsum.photos/seed/${post.id}/800/600`}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-3 space-y-4">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground font-semibold uppercase tracking-widest">
                        <span>{format(new Date(post.createdAt), "dd 'de' MMM, yyyy", { locale: ptBR })}</span>
                        <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                        <div className="flex gap-2">
                          {post.tags.slice(0, 2).map(tag => <span key={tag}>#{tag}</span>)}
                        </div>
                      </div>
                      <h2 className="font-headline text-3xl font-bold group-hover:text-primary transition-colors leading-tight">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-lg leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="pt-2">
                        <span className="text-primary font-bold inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                          Ler Artigo Completo <span className="text-xl">→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t py-12 bg-muted/30 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} DevFolio. Insights e Tecnologia.</p>
        </div>
      </footer>
    </div>
  );
}
