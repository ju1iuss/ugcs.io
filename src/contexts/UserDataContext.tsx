"use client";

import { createContext, useContext, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { fetchUserVideos } from '@/lib/api';
import { Video } from '@/types/video';
import { useUser } from '@clerk/nextjs';

export const UserDataContext = createContext<{
  videos: Video[];
  credits: string;
  loading: boolean;
  error: string | null;
  refetchData: () => Promise<void>;
  addVideo: (video: Video) => void;
  removeVideo: (videoId: number) => void;
}>({
  videos: [],
  credits: '0',
  loading: false,
  error: null,
  refetchData: async () => {},
  addVideo: () => {},
  removeVideo: () => {},
});

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [credits, setCredits] = useState<string>('0');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isLoaded } = useUser();
  const fetchTimeoutRef = useRef<NodeJS.Timeout>();

  const fetchData = async () => {
    if (!isLoaded || !user) return;
    
    try {
      setLoading(true);
      console.log('Fetching user data for:', user.id);
      
      const data = await fetchUserVideos(user.id);
      console.log('Received data from API:', data);
      
      // Only update state if component is still mounted
      setVideos(data.videos);
      setCredits(data.credits);
      console.log('Updated credits state to:', data.credits);
      setError(null);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err instanceof Error ? err.message : 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch with delay to ensure Clerk is loaded
  useEffect(() => {
    if (isLoaded && user) {
      // Clear any existing timeout
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
      
      // Set a small delay before first fetch
      fetchTimeoutRef.current = setTimeout(() => {
        fetchData();
      }, 500);
    }
    
    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, [isLoaded, user?.id]);

  // Add effect to log credits changes
  useEffect(() => {
    console.log('Credits value in context:', credits);
  }, [credits]);

  const addVideo = (video: Video) => {
    setVideos(prev => [video, ...prev]);
  };

  const removeVideo = useCallback((videoId: number) => {
    setVideos(prevVideos => prevVideos.filter(video => video.id !== videoId));
  }, []);

  const value = useMemo(() => ({
    videos,
    credits,
    loading,
    error,
    refetchData: fetchData,
    addVideo,
    removeVideo,
  }), [videos, credits, loading, error, fetchData, addVideo, removeVideo]);

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
} 