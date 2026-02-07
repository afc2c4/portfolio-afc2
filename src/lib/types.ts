
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
}

export interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  createdAt: string;
}

export interface PortfolioData {
  profile: Profile;
  posts: Post[];
}
