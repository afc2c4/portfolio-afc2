
import { Post } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface PostGridProps {
  posts: Post[];
}

export function PostGrid({ posts }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-24 bg-muted/10 rounded-2xl border-2 border-dashed">
        <p className="text-muted-foreground">No works to showcase yet. Start creating!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Card key={post.id} className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-white/20 text-white backdrop-blur-sm border-none">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <h3 className="font-headline text-xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
              {post.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
