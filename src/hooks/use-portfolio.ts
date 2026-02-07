
"use client";

import { useState, useEffect } from 'react';
import { PortfolioData, Profile, Post } from '@/lib/types';
import { INITIAL_DATA } from '@/lib/mock-data';

const STORAGE_KEY = 'artfolio_data';

export function usePortfolio() {
  const [data, setData] = useState<PortfolioData>(INITIAL_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse stored data", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, isLoaded]);

  const updateProfile = (profile: Profile) => {
    setData(prev => ({ ...prev, profile }));
  };

  const addPost = (post: Post) => {
    setData(prev => ({ ...prev, posts: [post, ...prev.posts] }));
  };

  const updatePost = (updatedPost: Post) => {
    setData(prev => ({
      ...prev,
      posts: prev.posts.map(p => p.id === updatedPost.id ? updatedPost : p)
    }));
  };

  const deletePost = (postId: string) => {
    setData(prev => ({
      ...prev,
      posts: prev.posts.filter(p => p.id !== postId)
    }));
  };

  return {
    data,
    updateProfile,
    addPost,
    updatePost,
    deletePost,
    isLoaded
  };
}
