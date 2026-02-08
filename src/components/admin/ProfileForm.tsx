
"use client";

import { useState, useRef, useEffect } from 'react';
import { Profile } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { X, Plus, Save, Upload, User, Move } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface ProfileFormProps {
  profile: Profile | null;
  onSave: (profile: Profile) => void;
}

const DEFAULT_PROFILE: Profile = {
  id: 'main-dev',
  name: '',
  bio: '',
  skills: [],
  contact: {
    email: '',
    linkedin: '',
    website: ''
  },
  avatarUrl: '',
  avatarSettings: {
    scale: 1,
    x: 0,
    y: 0
  }
};

export function ProfileForm({ profile, onSave }: ProfileFormProps) {
  const [formData, setFormData] = useState<Profile>(profile || DEFAULT_PROFILE);
  const [newSkill, setNewSkill] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (profile) {
      setFormData({
        ...profile,
        avatarSettings: profile.avatarSettings || { scale: 1, x: 0, y: 0 }
      });
    }
  }, [profile]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    toast({
      title: "Perfil Atualizado",
      description: "Suas alterações foram salvas com sucesso no banco de dados.",
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
        setFormData({ 
          ...formData, 
          avatarUrl: reader.result as string,
          avatarSettings: { scale: 1, x: 0, y: 0 } // Reset settings for new image
        });
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

  const updateAvatarSetting = (key: 'scale' | 'x' | 'y', value: number) => {
    setFormData({
      ...formData,
      avatarSettings: {
        ...(formData.avatarSettings || { scale: 1, x: 0, y: 0 }),
        [key]: value
      }
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="font-headline">Detalhes Pessoais & Foto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Image Preview and Controls */}
            <div className="w-full lg:w-1/3 flex flex-col items-center space-y-6">
              <div className="relative group">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20 bg-muted flex items-center justify-center relative">
                  {formData.avatarUrl ? (
                    <div className="w-full h-full relative">
                      <Image 
                        src={formData.avatarUrl} 
                        alt="Preview" 
                        fill 
                        className="object-cover"
                        style={{
                          transform: `scale(${formData.avatarSettings?.scale || 1}) translate(${formData.avatarSettings?.x || 0}%, ${formData.avatarSettings?.y || 0}%)`,
                          transition: 'transform 0.1s ease-out'
                        }}
                      />
                    </div>
                  ) : (
                    <User className="w-16 h-16 text-muted-foreground" />
                  )}
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white"
                  >
                    <Upload className="w-8 h-8 mb-1" />
                    <span className="text-[10px] font-bold uppercase">Trocar Foto</span>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>

              {formData.avatarUrl && (
                <div className="w-full space-y-6 bg-muted/30 p-4 rounded-xl border">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    <Move className="w-3 h-3" /> Ajustes da Foto
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <Label>Zoom</Label>
                      <span className="text-primary">{(formData.avatarSettings?.scale || 1).toFixed(1)}x</span>
                    </div>
                    <Slider 
                      value={[formData.avatarSettings?.scale || 1]} 
                      min={1} 
                      max={4} 
                      step={0.1}
                      onValueChange={([val]) => updateAvatarSetting('scale', val)}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <Label>Posição X (Horizontal)</Label>
                      <span className="text-primary">{formData.avatarSettings?.x || 0}%</span>
                    </div>
                    <Slider 
                      value={[formData.avatarSettings?.x || 0]} 
                      min={-100} 
                      max={100} 
                      step={1}
                      onValueChange={([val]) => updateAvatarSetting('x', val)}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <Label>Posição Y (Vertical)</Label>
                      <span className="text-primary">{formData.avatarSettings?.y || 0}%</span>
                    </div>
                    <Slider 
                      value={[formData.avatarSettings?.y || 0]} 
                      min={-100} 
                      max={100} 
                      step={1}
                      onValueChange={([val]) => updateAvatarSetting('y', val)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-grow space-y-6 w-full">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Profissional</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Alexandre Ferreira"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatarUrl">Ou cole uma URL de imagem</Label>
                  <Input
                    id="avatarUrl"
                    value={formData.avatarUrl?.startsWith('data:') ? '' : formData.avatarUrl}
                    onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio / Statement Profissional</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Conte ao mundo sobre sua visão criativa e stack tecnológica..."
                    className="min-h-[150px]"
                    required
                  />
                </div>
              </div>
            </div>
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
