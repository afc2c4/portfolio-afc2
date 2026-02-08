
import { Profile } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Mail, Globe, Linkedin } from 'lucide-react';
import Image from 'next/image';

interface ProfileHeaderProps {
  profile: Profile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const settings = profile.avatarSettings || { scale: 1, x: 0, y: 0 };

  return (
    <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
        
        {/* Profile Circle Container */}
        <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-background shadow-2xl overflow-hidden bg-muted">
          {profile.avatarUrl ? (
            <div className="w-full h-full relative">
              <Image
                src={profile.avatarUrl}
                alt={profile.name}
                fill
                className="object-cover"
                style={{
                  transform: `scale(${settings.scale}) translate(${settings.x}%, ${settings.y}%)`,
                }}
                priority
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10">
              <span className="text-4xl font-headline font-bold text-primary">
                {profile.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-foreground">
          {profile.name}
        </h1>
        <div className="max-w-2xl mx-auto">
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed italic font-medium">
            "{profile.bio}"
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {profile.skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="px-4 py-1.5 text-sm font-semibold tracking-wide">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-center gap-8 pt-4">
        {profile.contact.email && (
          <a 
            href={`mailto:${profile.contact.email}`} 
            className="p-3 rounded-full bg-muted/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm"
            title="Enviar Email"
          >
            <Mail className="w-6 h-6" />
          </a>
        )}
        {profile.contact.linkedin && (
          <a 
            href={`https://${profile.contact.linkedin}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3 rounded-full bg-muted/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm"
            title="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        )}
        {profile.contact.website && (
          <a 
            href={`https://${profile.contact.website}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3 rounded-full bg-muted/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm"
            title="Website"
          >
            <Globe className="w-6 h-6" />
          </a>
        )}
      </div>
    </div>
  );
}
