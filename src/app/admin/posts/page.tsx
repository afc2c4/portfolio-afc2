
"use client";

import { useState } from 'react';
import { useProjects } from '@/hooks/use-portfolio';
import { Navigation } from '@/components/portfolio/Navigation';
import { PostForm } from '@/components/admin/PostForm';
import { Post } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, FolderCode } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

export default function AdminPostsPage() {
  const { projects, addPost, updatePost, deletePost, isLoading } = useProjects();
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  const handleAddNew = () => {
    setEditingPost(null);
    setIsFormOpen(true);
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este projeto?")) {
      deletePost(id);
      toast({
        title: "Projeto Excluído",
        description: "O projeto foi removido do seu portfólio.",
      });
    }
  };

  const handleSave = (postData: Omit<Post, 'id' | 'createdAt'>) => {
    if (editingPost) {
      updatePost({
        ...editingPost,
        ...postData,
      });
    } else {
      addPost(postData);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-muted/10">
      <Navigation />
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-headline text-4xl font-bold">Gerenciar Projetos</h1>
            <p className="text-muted-foreground mt-2">Adicione e organize suas aplicações e sistemas.</p>
          </div>
          <Button onClick={handleAddNew} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Novo Projeto
          </Button>
        </div>

        {projects.length === 0 && !isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-card rounded-2xl border-2 border-dashed">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <FolderCode className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-lg">Seu portfólio de projetos está vazio.</p>
            <Button variant="link" onClick={handleAddNew}>Clique aqui para adicionar seu primeiro trabalho</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((post) => (
              <Card key={post.id} className="group overflow-hidden shadow-md">
                <div className="relative aspect-video">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <Button size="icon" variant="secondary" onClick={() => handleEdit(post)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="destructive" onClick={() => handleDelete(post.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold truncate">{post.title}</h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground uppercase tracking-wider font-semibold">
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-[10px] text-muted-foreground">+{post.tags.length - 3} mais</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl">
                {editingPost ? 'Editar Projeto' : 'Adicionar Novo Projeto'}
              </DialogTitle>
              <DialogDescription>
                Preencha os detalhes da sua aplicação ou sistema.
              </DialogDescription>
            </DialogHeader>
            <PostForm
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
