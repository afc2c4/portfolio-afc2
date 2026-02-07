
"use client";

import { useMemo } from 'react';
import { 
  useFirestore, 
  useUser, 
  useCollection, 
  useDoc, 
  useMemoFirebase 
} from '@/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  query, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { Profile, Post, BlogPost, PortfolioData } from '@/lib/types';
import { INITIAL_DATA } from '@/lib/mock-data';
import { setDocumentNonBlocking, addDocumentNonBlocking, deleteDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';

// UID fixo para o portfólio (conforme definido nas security rules)
const OWNER_ID = 'main-dev';

export function usePortfolio() {
  const firestore = useFirestore();
  const { user } = useUser();

  // Referências Memoizadas
  const profileRef = useMemoFirebase(() => 
    doc(firestore, 'users', OWNER_ID, 'userProfile', 'current'), 
    [firestore]
  );
  
  const projectsQuery = useMemoFirebase(() => 
    query(collection(firestore, 'users', OWNER_ID, 'projects'), orderBy('createdAt', 'desc')), 
    [firestore]
  );

  const blogPostsQuery = useMemoFirebase(() => 
    query(collection(firestore, 'users', OWNER_ID, 'blogPosts'), orderBy('createdAt', 'desc')), 
    [firestore]
  );

  // Hooks de Dados do Firebase
  const { data: profileData, isLoading: isProfileLoading } = useDoc<Profile>(profileRef);
  const { data: projectsData, isLoading: isProjectsLoading } = useCollection<Post>(projectsQuery);
  const { data: blogPostsData, isLoading: isBlogLoading } = useCollection<BlogPost>(blogPostsQuery);

  const isLoaded = !isProfileLoading && !isProjectsLoading && !isBlogLoading;

  // Funções de Mutação (Usando Non-Blocking Updates para melhor UX)
  const updateProfile = (profile: Profile) => {
    setDocumentNonBlocking(profileRef, profile, { merge: true });
  };

  const addPost = (post: Omit<Post, 'id' | 'createdAt'>) => {
    const colRef = collection(firestore, 'users', OWNER_ID, 'projects');
    addDocumentNonBlocking(colRef, {
      ...post,
      createdAt: new Date().toISOString()
    });
  };

  const updatePost = (updatedPost: Post) => {
    const docRef = doc(firestore, 'users', OWNER_ID, 'projects', updatedPost.id);
    updateDocumentNonBlocking(docRef, updatedPost);
  };

  const deletePost = (postId: string) => {
    const docRef = doc(firestore, 'users', OWNER_ID, 'projects', postId);
    deleteDocumentNonBlocking(docRef);
  };

  const addBlogPost = (blogPost: Omit<BlogPost, 'id' | 'createdAt'>) => {
    const colRef = collection(firestore, 'users', OWNER_ID, 'blogPosts');
    addDocumentNonBlocking(colRef, {
      ...blogPost,
      createdAt: new Date().toISOString()
    });
  };

  const updateBlogPost = (updatedBlogPost: BlogPost) => {
    const docRef = doc(firestore, 'users', OWNER_ID, 'blogPosts', updatedBlogPost.id);
    updateDocumentNonBlocking(docRef, updatedBlogPost);
  };

  const deleteBlogPost = (blogPostId: string) => {
    const docRef = doc(firestore, 'users', OWNER_ID, 'blogPosts', blogPostId);
    deleteDocumentNonBlocking(docRef);
  };

  const data: PortfolioData = {
    profile: profileData || INITIAL_DATA.profile,
    posts: projectsData || [],
    blogPosts: blogPostsData || []
  };

  return {
    data,
    updateProfile,
    addPost,
    updatePost,
    deletePost,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    isLoaded
  };
}
