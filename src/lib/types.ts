
export interface Profile {
  id: string;
  name: string;
  bio: string;
  skills: string[];
  contact: {
    email: string;
    linkedin?: string;
    website?: string;
  };
  avatarUrl?: string;
  avatarSettings?: {
    scale: number;
    x: number;
    y: number;
  };
}

export interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverUrl: string;
  tags: string[];
  createdAt: string;
  published: boolean;
}

export interface PortfolioData {
  profile: Profile;
  posts: Post[];
  blogPosts: BlogPost[];
}
