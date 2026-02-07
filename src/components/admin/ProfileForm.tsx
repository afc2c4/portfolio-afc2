
"use client";

import { useState, useRef } from 'react';
import { Profile } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Save, Upload, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface ProfileFormProps {
  profile: Profile;
  onSave: (profile: Profile) => void;
}

export function ProfileForm({ profile, onSave }: ProfileFormProps) {
  const [formData, setFormData] = useState<Profile>(profile);
  const [newSkill, setNewSkill] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    toast({
      title: "Perfil Atualizado",
      description: "Suas alterações foram salvas com sucesso.",
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "Por favor, escolha uma imagem com menos de 2MB.",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatarUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skillToRemove)
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="font-headline">Detalhes Pessoais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center sm:flex-row gap-8 mb-4">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-muted bg-muted flex items-center justify-center relative">
                {formData.avatarUrl ? (
                  <Image 
                    src={formData.avatarUrl} 
                    alt="Preview" 
                    fill 
                    className="object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-muted-foreground" />
                )}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                >
                  <Upload className="w-6 h-6 text-white" />
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <p className="text-[10px] text-muted-foreground mt-2 text-center uppercase font-bold tracking-wider">Clique para mudar</p>
            </div>

            <div className="flex-grow space-y-4 w-full">
              <div className="space-y-2">
                <Label htmlFor="name">Nome de Exibição</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Seu nome profissional"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avatarUrl">URL da Imagem (ou use o upload ao lado)</Label>
                <Input
                  id="avatarUrl"
                  value={formData.avatarUrl?.startsWith('data:') ? '' : formData.avatarUrl}
                  onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio / Statement Profissional</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Conte ao mundo sobre sua visão criativa e stack tecnológica..."
              className="min-h-[120px]"
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="font-headline">Habilidades & Especializações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Adicione uma tech (ex: React, Docker)"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            />
            <Button type="button" onClick={addSkill} variant="secondary">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="pl-3 pr-1 py-1 flex items-center gap-1">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="hover:text-destructive transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="font-headline">Informações de Contato</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email de Contato</Label>
            <Input
              id="email"
              type="email"
              value={formData.contact.email}
              onChange={(e) => setFormData({
                ...formData,
                contact: { ...formData.contact, email: e.target.value }
              })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website / Portfólio (opcional)</Label>
            <Input
              id="website"
              value={formData.contact.website}
              onChange={(e) => setFormData({
                ...formData,
                contact: { ...formData.contact, website: e.target.value }
              })}
              placeholder="www.seusite.com"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="linkedin">Perfil LinkedIn (opcional)</Label>
            <Input
              id="linkedin"
              value={formData.contact.linkedin}
              onChange={(e) => setFormData({
                ...formData,
                contact: { ...formData.contact, linkedin: e.target.value }
              })}
              placeholder="linkedin.com/in/usuario"
            />
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 pt-6">
          <Button type="submit" className="w-full sm:w-auto ml-auto flex items-center gap-2">
            <Save className="w-4 h-4" />
            Salvar Perfil Dev
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
