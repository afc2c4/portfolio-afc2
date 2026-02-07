
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
        title: "Image required",
        description: "Please upload an image first to generate tags.",
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingTags(true);
    try {
      const result = await generateTagsForPost({ imageDataUri: imageUrl });
      // Merge with existing tags, avoiding duplicates
      const uniqueTags = Array.from(new Set([...tags, ...result.tags]));
      setTags(uniqueTags);
      toast({
        title: "Tags Generated",
        description: `Added ${result.tags.length} new tags based on your image.`,
      });
    } catch (error) {
      console.error("Failed to generate tags", error);
      toast({
        title: "GenAI Error",
        description: "Failed to suggest tags for this image.",
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
        title: "Incomplete",
        description: "Please provide an image for the post.",
        variant: "destructive"
      });
      return;
    }
    onSave({ title, description, imageUrl, tags });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your work a name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your creative process..."
          className="min-h-[100px]"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Work Image</Label>
        <div className="flex flex-col gap-4">
          {imageUrl ? (
            <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-muted group">
              <Image src={imageUrl} alt="Preview" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button type="button" variant="secondary" onClick={() => setImageUrl('')}>
                  Remove Image
                </Button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="aspect-video rounded-lg border-2 border-dashed border-muted hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer flex flex-col items-center justify-center gap-2"
            >
              <Upload className="w-8 h-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground font-medium">Click to upload an image</p>
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
            <span className="text-xs text-muted-foreground">Or provide a URL:</span>
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
          <Label>Categories & Tags</Label>
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
            Suggest with AI
          </Button>
        </div>
        <div className="flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
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
            <span className="text-sm text-muted-foreground italic">No tags added yet.</span>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update Post' : 'Create Post'}
        </Button>
      </div>
    </form>
  );
}
