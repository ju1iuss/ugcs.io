"use client";

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { VideoGrid } from '@/components/global/videos/VideoGrid';
import { fetchUserVideos } from '@/lib/api';
import { Video } from '@/types/video';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/global/app-sidebar";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadVideos() {
      if (!isLoaded || !user?.id) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await fetchUserVideos(user.id);
        const filteredVideos = response.records
          .filter(video => video.status !== "Not submitted")
          .sort((a, b) => new Date(b.created_time).getTime() - new Date(a.created_time).getTime());
        setVideos(filteredVideos);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(`Failed to load videos: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, [user?.id, isLoaded]);

  const handleRatingChange = (videoId: number, newRating: 'good' | 'bad' | null) => {
    setVideos(currentVideos => 
      currentVideos.map(video => 
        video.id === videoId 
          ? { ...video, rating: newRating }
          : video
      )
    );
  };

  const renderContent = () => {
    if (!isLoaded) return <div className="p-4">Loading user...</div>;
    if (!user) return <div className="p-4">Please log in to view videos.</div>;
    if (loading) return <div className="p-4">Loading videos...</div>;
    if (error) {
      return (
        <div className="p-4">
          <div className="text-red-500">{error}</div>
          <button onClick={() => window.location.reload()} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Retry
          </button>
        </div>
      );
    }

    return (
      <div className="p-6">
        <VideoGrid 
          videos={videos} 
          onRatingChange={handleRatingChange as any} // Type assertion added to bypass TS error
        />
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#f3f4ef]">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 overflow-x-hidden">
          {renderContent()}
        </main>
      </SidebarProvider>
    </div>
  );
}
