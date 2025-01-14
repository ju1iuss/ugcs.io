"use client";

import { useUser } from '@clerk/nextjs';
import { useEffect, useState, useRef } from 'react';
import { VideoGrid } from '@/components/global/videos/VideoGrid';
import { fetchUserVideos } from '@/lib/api';
import { Video } from '@/types/video';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/global/app-sidebar";
import { Button } from "@/components/ui/button";
import { EmptyState } from '@/components/global/empty-state';
import MultiStepForm from "@/components/global/form/MultiStepForm";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [videos, setVideos] = useState<Video[]>([]);
  const [credits, setCredits] = useState<string>("0");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const pollIntervals = useRef<{ [key: string]: NodeJS.Timeout }>({});

  useEffect(() => {
    if (loading && isLoaded) {
      setProgress(0);
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 2;
          });
        }, 40);

        return () => clearInterval(interval);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [loading, isLoaded]);

  const pollGeneratingStatus = async (correlationId: string) => {
    try {
      console.log('Polling generating status for:', correlationId);
      
      const response = await fetch('https://api.altan.ai/galaxia/hook/rxhQo5', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correlation_id: correlationId })
      });
      
      const data = await response.json();
      console.log('Received data:', data);
      
      if (data.video) {
        const videoData = typeof data.video === 'string' 
          ? JSON.parse(data.video) 
          : data.video;

        console.log('Parsed video data:', videoData);

        if (pollIntervals.current[correlationId]) {
          clearInterval(pollIntervals.current[correlationId]);
          delete pollIntervals.current[correlationId];
        }

        setVideos(currentVideos => {
          return currentVideos.map(video => {
            if (video.correlationId === correlationId) {
              const updatedVideo = {
                ...video,
                id: Number(videoData.id),
                status: videoData.status,
                thumbnail: videoData.thumbnail,
                video_url: videoData.video_url,
                created_time: videoData.created_time,
                last_modified_time: videoData.last_modified_time
              };
              console.log('Updating video:', updatedVideo);
              return updatedVideo;
            }
            return video;
          });
        });

        if (videoData.status === "Loading") {
          startLoadingPolling(Number(videoData.id));
        }
      }
    } catch (error) {
      console.error('Error polling generating status:', error);
    }
  };

  const pollLoadingStatus = async (videoId: number) => {
    try {
      const response = await fetch('https://api.altan.ai/galaxia/hook/mdqQXB', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: videoId })
      });
      
      const data = await response.json();
      
      if (data.video) {
        setVideos(currentVideos => 
          currentVideos.map(video => 
            video.id === videoId 
              ? { ...video, ...data.video }
              : video
          )
        );

        if (data.video.status === "Finished") {
          clearLoadingPolling(videoId);
        }
      }
    } catch (error) {
      console.error('Error polling loading status:', error);
    }
  };

  const startGeneratingPolling = (correlationId: string) => {
    if (pollIntervals.current[correlationId]) {
      clearInterval(pollIntervals.current[correlationId]);
    }
    
    pollIntervals.current[correlationId] = setInterval(() => {
      pollGeneratingStatus(correlationId);
    }, 5000);
  };

  const startLoadingPolling = (videoId: number) => {
    if (pollIntervals.current[`loading-${videoId}`]) {
      clearInterval(pollIntervals.current[`loading-${videoId}`]);
    }
    
    pollIntervals.current[`loading-${videoId}`] = setInterval(() => {
      pollLoadingStatus(videoId);
    }, 5000);
  };

  const clearLoadingPolling = (videoId: number) => {
    if (pollIntervals.current[`loading-${videoId}`]) {
      clearInterval(pollIntervals.current[`loading-${videoId}`]);
      delete pollIntervals.current[`loading-${videoId}`];
    }
  };

  const handleAddVideo = (newVideo: Video) => {
    setVideos(prev => [newVideo, ...prev]);
    
    if (newVideo.correlationId) {
      startGeneratingPolling(newVideo.correlationId);
    }
    setIsModalOpen(false);
  };

  const startPollingVideos = (records: Video[]) => {
    Object.values(pollIntervals.current).forEach(clearInterval);
    pollIntervals.current = {};

    records.forEach(record => {
      if (record.status === "Generating" && record.correlationId) {
        startGeneratingPolling(record.correlationId);
      } else if (record.status === "Loading" || record.status === "Processing") {
        startLoadingPolling(record.id);
      }
    });
  };

  useEffect(() => {
    return () => {
      Object.values(pollIntervals.current).forEach(clearInterval);
    };
  }, []);

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
        setCredits(response.credits);
        
        startPollingVideos(filteredVideos);
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

  const handleDeleteVideo = (videoId: number) => {
    setVideos(currentVideos => 
      currentVideos.filter(video => video.id !== videoId)
    );
  };

  const renderContent = () => {
    if (loading || !isLoaded || !user) return (
      <div className="h-[50vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 animate-fade-in">
          Creating your dashboard...
        </h2>
        <div className="w-full max-w-xl animate-fade-in">
          <Progress value={progress} className="h-1" />
        </div>
      </div>
    );

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

    if (videos.length === 0) {
      return <EmptyState onCreateClick={() => setIsModalOpen(true)} />;
    }

    return (
      <div className="p-6">
        <VideoGrid 
          videos={videos}
          onRatingChange={handleRatingChange}
          onAddVideo={handleAddVideo}
          onDelete={handleDeleteVideo}
        />
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#f3f5f8]">
      <SidebarProvider>
        <AppSidebar credits={credits} onAddVideo={handleAddVideo} />
        <main className="flex-1 overflow-x-hidden">
          {renderContent()}
        </main>
      </SidebarProvider>

      <MultiStepForm 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen}
        onAddVideo={handleAddVideo}
      />
    </div>
  );
}
