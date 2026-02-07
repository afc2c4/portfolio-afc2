
"use client";

import { useState, useRef } from 'react';
import { Post } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Sparkles, Upload, Loader2 } from 'lucide-react';
import { generateTagsForPost } from '@/ai/flows/generate-tags-for-post';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

interface PostFormProps {
  initialData?: Post;
  onSave: (data: Omit<Post, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export function PostForm({ initialData, onSave, onCancel }: PostFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [isGeneratingTags, setIsGeneratingTags] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSuggestTags = async () => {
    if (!imageUrl || !imageUrl.startsWith('data:')) {
      toast({
        title: "Screenshot necessária",
        description: "Faça upload de uma imagem do projeto para sugerir stacks.",
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingTags(true);
    try {
      const result = await generateTagsForPost({ imageDataUri: imageUrl });
      const uniqueTags = Array.from(new Set([...tags, ...result.tags]));
      setTags(uniqueTags);
      toast({
        title: "Tecnologias Identificadas",
        description: `Adicionadas ${result.tags.length} novas tags baseadas na interface.`,
      });
    } catch (error) {
      console.error("Failed to generate tags", error);
      toast({
        title: "Erro de IA",
        description: "Não foi possível sugerir tecnologias para este projeto.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingTags(false);
    }
  };

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
    if (!imageUrl) {
      toast({
        title: "Incompleto",
        description: "Por favor, adicione uma imagem do projeto.",
        variant: "destructive"
      });
      return;
    }
    onSave({ title, description, imageUrl, tags });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      <div className="space-y-2">
        <Label htmlFor="title">Nome do Projeto</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Sistema de Gestão Escolar"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição Técnica / Resumo</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descreva o problema resolvido e as tecnologias principais..."
          className="min-h-[100px]"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Screenshot / Capa do Projeto</Label>
        <div className="flex flex-col gap-4">
          {imageUrl ? (
            <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-muted group">
              <Image src={imageUrl} alt="Preview" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button type="button" variant="secondary" onClick={() => setImageUrl('')}>
                  Remover Imagem
                </Button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="aspect-video rounded-lg border-2 border-dashed border-muted hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer flex flex-col items-center justify-center gap-2"
            >
              <Upload className="w-8 h-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground font-medium">Clique para subir um screenshot</p>
              <Input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Ou URL direta:</span>
            <Input
              value={imageUrl.startsWith('data:') ? '' : imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="h-8"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Tech Stack & Tags</Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleSuggestTags}
            disabled={isGeneratingTags || !imageUrl || !imageUrl.startsWith('data:')}
            className="text-primary hover:text-primary/80 flex items-center gap-2 h-8"
          >
            {isGeneratingTags ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Sparkles className="w-3 h-3" />
            )}
            Sugerir Stack com IA
          </Button>
        </div>
        <div className="flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Ex: Next.js"
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
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-destructive transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {tags.length === 0 && (
            <span className="text-sm text-muted-foreground italic">Nenhuma tag adicionada.</span>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {initialData ? 'Atualizar Projeto' : 'Salvar Projeto'}
        </Button>
      </div>
    </form>
  );
}
