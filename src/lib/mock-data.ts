
import { PortfolioData } from './types';

export const INITIAL_DATA: PortfolioData = {
  profile: {
    id: 'user-1',
    name: 'Alex Tech',
    bio: 'Desenvolvedor Full-stack sênior apaixonado por criar soluções escaláveis com Next.js, Firebase e Cloud Architecture. Especialista em transformar ideias em produtos digitais de alta performance.',
    skills: ['React/Next.js', 'Node.js', 'TypeScript', 'Cloud Computing', 'Firebase', 'Mobile Development'],
    contact: {
      email: 'alex.dev@exemplo.com',
      website: 'www.alex-dev.tech',
      linkedin: 'linkedin.com/in/alexdev'
    },
    avatarUrl: 'https://picsum.photos/seed/dev-avatar/200/200'
  },
  posts: [
    {
      id: 'post-1',
      title: 'Plataforma E-commerce SaaS',
      description: 'Uma solução completa de comércio eletrônico com multi-tenancy, integração de pagamentos e painel administrativo em tempo real.',
      imageUrl: 'https://picsum.photos/seed/web-project-1/800/600',
      tags: ['Next.js', 'Stripe', 'Tailwind', 'PostgreSQL'],
      createdAt: new Date().toISOString()
    },
    {
      id: 'post-2',
      title: 'App de Gestão Financeira',
      description: 'Aplicativo mobile cross-platform focado em UX, com gráficos complexos e sincronização offline de dados.',
      imageUrl: 'https://picsum.photos/seed/app-project-1/800/600',
      tags: ['React Native', 'Firebase', 'Recharts', 'TypeScript'],
      createdAt: new Date().toISOString()
    }
  ]
};
