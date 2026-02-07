
"use client";

import { useState } from 'react';
import { useBlog } from '@/hooks/use-portfolio';
import { Navigation } from '@/components/portfolio/Navigation';
import { BlogForm } from '@/components/admin/BlogForm';
import { BlogPost } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, BookOpen, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function AdminBlogPage() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useBlog();
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  const handleAddNew = () => {
    setEditingPost(null);
    setIsFormOpen(true);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Deseja realmente excluir este artigo?")) {
      deleteBlogPost(id);
      toast({ title: "Artigo removido" });
    }
  };

  const handleSave = (postData: Omit<BlogPost, 'id' | 'createdAt'>) => {
    if (editingPost) {
      updateBlogPost({ ...editingPost, ...postData });
    } else {
      addBlogPost(postData);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-muted/10">
      <Navigation />
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-headline text-4xl font-bold">Gerenciar Blog</h1>
            <p className="text-muted-foreground mt-2">Compartilhe conhecimento e insights técnicos.</p>
          </div>
          <Button onClick={handleAddNew} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Novo Artigo
          </Button>
        </div>

        {blogPosts.length === 0 ? (
          <div className="text-center py-24 bg-card rounded-2xl border-2 border-dashed">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum artigo publicado ainda.</p>
            <Button variant="link" onClick={handleAddNew}>Escrever meu primeiro post</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        {post.published ? (
                          <Badge className="bg-green-500/10 text-green-600 border-green-200 hover:bg-green-500/10">
                            <Eye className="w-3 h-3 mr-1" /> Publicado
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            <EyeOff className="w-3 h-3 mr-1" /> Rascunho
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(post.createdAt), "d 'de' MMMM, yyyy", { locale: ptBR })}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex md:flex-col gap-2 w-full md:w-auto">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(post)} className="flex-1">
                        <Pencil className="w-4 h-4 mr-2" /> Editar
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)} className="flex-1">
                        <Trash2 className="w-4 h-4 mr-2" /> Excluir
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl">
                {editingPost ? 'Editar Artigo' : 'Novo Artigo para o Blog'}
              </DialogTitle>
            </DialogHeader>
            <BlogForm
              initialData={editingPost || undefined}
              onSave={handleSave}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
