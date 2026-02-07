
import { Profile } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Mail, Globe, Linkedin } from 'lucide-react';
import Image from 'next/image';

interface ProfileHeaderProps {
  profile: Profile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors" />
        {profile.avatarUrl && (
          <Image
            src={profile.avatarUrl}
            alt={profile.name}
            width={128}
            height={128}
            className="relative rounded-full border-4 border-background shadow-xl object-cover"
          />
        )}
      </div>

      <div className="space-y-3">
        <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground">{profile.name}</h1>
        <p className="text-xl text-muted-foreground leading-relaxed italic">"{profile.bio}"</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {profile.skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-center gap-6 pt-4">
        {profile.contact.email && (
          <a href={`mailto:${profile.contact.email}`} className="text-muted-foreground hover:text-primary transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        )}
        {profile.contact.linkedin && (
          <a href={`https://${profile.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
        )}
        {profile.contact.website && (
          <a href={`https://${profile.contact.website}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Globe className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );
}
