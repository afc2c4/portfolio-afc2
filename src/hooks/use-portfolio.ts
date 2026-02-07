
"use client";

import { useState, useEffect } from 'react';
import { PortfolioData, Profile, Post, BlogPost } from '@/lib/types';
import { INITIAL_DATA } from '@/lib/mock-data';

const STORAGE_KEY = 'devfolio_data_v2';

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

  const addBlogPost = (blogPost: BlogPost) => {
    setData(prev => ({ ...prev, blogPosts: [blogPost, ...prev.blogPosts] }));
  };

  const updateBlogPost = (updatedBlogPost: BlogPost) => {
    setData(prev => ({
      ...prev,
      blogPosts: prev.blogPosts.map(p => p.id === updatedBlogPost.id ? updatedBlogPost : p)
    }));
  };

  const deleteBlogPost = (blogPostId: string) => {
    setData(prev => ({
      ...prev,
      blogPosts: prev.blogPosts.filter(p => p.id !== blogPostId)
    }));
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
