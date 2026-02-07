
"use client";

import { useState } from 'react';
import { BlogPost } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { X, Save, FileText } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

interface BlogFormProps {
  initialData?: BlogPost;
  onSave: (data: Omit<BlogPost, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export function BlogForm({ initialData, onSave, onCancel }: BlogFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [coverUrl, setCoverUrl] = useState(initialData?.coverUrl || '');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [published, setPublished] = useState(initialData?.published ?? true);
  const { toast } = useToast();

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast({
        title: "Campos obrigatórios",
        description: "Título e conteúdo são necessários.",
        variant: "destructive"
      });
      return;
    }
    onSave({ title, excerpt, content, coverUrl, tags, published });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
        <div className="space-y-0.5">
          <Label>Status de Publicação</Label>
          <p className="text-xs text-muted-foreground">O post ficará visível imediatamente para visitantes.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{published ? 'Publicado' : 'Rascunho'}</span>
          <Switch checked={published} onCheckedChange={setPublished} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Título do Artigo</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Como dominar o Next.js 15"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Resumo (opcional)</Label>
        <Input
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Uma breve introdução para atrair leitores..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverUrl">URL da Imagem de Capa</Label>
        <Input
          id="coverUrl"
          value={coverUrl}
          onChange={(e) => setCoverUrl(e.target.value)}
          placeholder="https://..."
        />
        {coverUrl && (
          <div className="relative aspect-[21/9] rounded-md overflow-hidden border mt-2">
            <Image src={coverUrl} alt="Cover Preview" fill className="object-cover" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Conteúdo (Markdown suportado em breve)</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escreva seu artigo aqui..."
          className="min-h-[300px]"
          required
        />
      </div>

      <div className="space-y-3">
        <Label>Tags do Blog</Label>
        <div className="flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Ex: Carreira, Backend"
            className="h-9"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
          />
          <Button type="button" onClick={addTag} variant="outline" size="sm" className="h-9">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="hover:text-destructive">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          {initialData ? 'Atualizar Post' : 'Publicar Agora'}
        </Button>
      </div>
    </form>
  );
}
