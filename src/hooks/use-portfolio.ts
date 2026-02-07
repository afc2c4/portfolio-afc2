
"use client";

import { useMemo } from 'react';
import { 
  useFirestore, 
  useMemoFirebase,
  useDoc,
  useCollection
} from '@/firebase';
import { 
  collection, 
  doc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { Profile, Post, BlogPost } from '@/lib/types';
import { INITIAL_DATA } from '@/lib/mock-data';
import { 
  setDocumentNonBlocking, 
  addDocumentNonBlocking, 
  deleteDocumentNonBlocking, 
  updateDocumentNonBlocking 
} from '@/firebase/non-blocking-updates';

const OWNER_ID = 'main-dev';

export function useProfile() {
  const firestore = useFirestore();
  const profileRef = useMemoFirebase(() => 
    doc(firestore, 'users', OWNER_ID, 'userProfile', 'current'), 
    [firestore]
  );
  
  const { data: profile, isLoading } = useDoc<Profile>(profileRef);

  const updateProfile = (profileData: Profile) => {
    setDocumentNonBlocking(profileRef, profileData, { merge: true });
  };

  return { 
    profile: profile || INITIAL_DATA.profile, 
    isLoading,
    updateProfile 
  };
}

export function useProjects() {
  const firestore = useFirestore();
  const projectsQuery = useMemoFirebase(() => 
    query(collection(firestore, 'users', OWNER_ID, 'projects'), orderBy('createdAt', 'desc')), 
    [firestore]
  );

  const { data: projects, isLoading } = useCollection<Post>(projectsQuery);

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

  return { 
    projects: projects || [], 
    isLoading, 
    addPost, 
    updatePost, 
    deletePost 
  };
}

export function useBlog() {
  const firestore = useFirestore();
  const blogPostsQuery = useMemoFirebase(() => 
    query(collection(firestore, 'users', OWNER_ID, 'blogPosts'), orderBy('createdAt', 'desc')), 
    [firestore]
  );

  const { data: blogPosts, isLoading } = useCollection<BlogPost>(blogPostsQuery);

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

  return { 
    blogPosts: blogPosts || [], 
    isLoading, 
    addBlogPost, 
    updateBlogPost, 
    deleteBlogPost 
  };
}
