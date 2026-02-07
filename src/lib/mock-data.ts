
import { PortfolioData } from './types';

export const INITIAL_DATA: PortfolioData = {
  profile: {
    id: 'user-1',
    name: 'Elena Vance',
    bio: 'Multi-disciplinary artist specializing in digital painting and urban architectural sketches. I find beauty in the intersection of organic forms and geometric structures.',
    skills: ['Digital Painting', 'Oil Painting', 'Architectural Sketching', 'Minimalist Illustration'],
    contact: {
      email: 'elena@artfolio.com',
      website: 'www.elenavance.art',
      linkedin: 'linkedin.com/in/elenavance'
    },
    avatarUrl: 'https://picsum.photos/seed/elena/200/200'
  },
  posts: [
    {
      id: 'post-1',
      title: 'Ethereal Horizons',
      description: 'An exploration of color and light in an abstract oil landscape.',
      imageUrl: 'https://picsum.photos/seed/art-2/800/600',
      tags: ['Abstract', 'Oil', 'Landscape'],
      createdAt: new Date().toISOString()
    },
    {
      id: 'post-2',
      title: 'Modern Solitude',
      description: 'Digital illustration reflecting on contemporary urban living.',
      imageUrl: 'https://picsum.photos/seed/art-3/800/600',
      tags: ['Digital', 'Minimalist', 'Urban'],
      createdAt: new Date().toISOString()
    }
  ]
};
