
import { useState } from 'react';
import { Profile } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfileFormProps {
  profile: Profile;
  onSave: (profile: Profile) => void;
}

export function ProfileForm({ profile, onSave }: ProfileFormProps) {
  const [formData, setFormData] = useState<Profile>(profile);
  const [newSkill, setNewSkill] = useState('');
  const { toast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    });
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
          <CardTitle className="font-headline">Personal Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Display Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your professional name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio / Statement</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell the world about your creative vision..."
              className="min-h-[120px]"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="avatarUrl">Avatar URL</Label>
            <Input
              id="avatarUrl"
              value={formData.avatarUrl}
              onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="font-headline">Skills & Specializations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill (e.g. Watercolor)"
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
          <CardTitle className="font-headline">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
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
            <Label htmlFor="website">Website (optional)</Label>
            <Input
              id="website"
              value={formData.contact.website}
              onChange={(e) => setFormData({
                ...formData,
                contact: { ...formData.contact, website: e.target.value }
              })}
              placeholder="www.yoursite.com"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="linkedin">LinkedIn Profile (optional)</Label>
            <Input
              id="linkedin"
              value={formData.contact.linkedin}
              onChange={(e) => setFormData({
                ...formData,
                contact: { ...formData.contact, linkedin: e.target.value }
              })}
              placeholder="linkedin.com/in/username"
            />
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 pt-6">
          <Button type="submit" className="w-full sm:w-auto ml-auto flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Profile
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
