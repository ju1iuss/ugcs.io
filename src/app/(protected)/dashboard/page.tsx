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
import MorphingText from '@/components/ui/morphing-text';
import { AnimatedText } from "@/components/ui/animated-text";
import { Card } from "@/components/ui/card";
import { useSearchParams, usePathname } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';

// Add new type for error tracking
interface PollingError {
  videoId: number;
  message: string;
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [videos, setVideos] = useState<Video[]>([]);
  const [credits, setCredits] = useState<string>("0");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const pollIntervals = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const [loadingStep, setLoadingStep] = useState(0);
  const [pollingErrors, setPollingErrors] = useState<Record<number, string>>({});
  const pollingStartTimes = useRef<Record<string, number>>({});
  const pathname = usePathname();
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    if (loading && isLoaded) {
      setLoadingStep(0);
      const steps = [
        setTimeout(() => setLoadingStep(1), 1000),
        setTimeout(() => setLoadingStep(2), 2000),
      ];

      return () => steps.forEach(clearTimeout);
    }
  }, [loading, isLoaded]);

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShowThankYou(window.location.hash === '#new');
    }
  }, []);

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

  const handlePollingError = async (videoId: number) => {
    try {
      // Send error to webhook
      await fetch('https://api.altan.ai/galaxia/hook/z7iCFd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: videoId })
      });

      // Update error state
      setPollingErrors(prev => ({
        ...prev,
        [videoId]: "ERROR - Bitte ändere deinen Skript"
      }));

      // Clear polling interval
      clearLoadingPolling(videoId);
    } catch (error) {
      console.error('Error handling polling timeout:', error);
    }
  };

  const pollLoadingStatus = async (videoId: number) => {
    try {
      // Check if we've exceeded polling time limit (240 seconds)
      const startTime = pollingStartTimes.current[`loading-${videoId}`];
      if (startTime && Date.now() - startTime > 240000) {
        await handlePollingError(videoId);
        return;
      }

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
    
    setTimeout(() => {
      pollIntervals.current[correlationId] = setInterval(() => {
        pollGeneratingStatus(correlationId);
      }, 5000);
    }, 5000); //WIP Change time to delay first polling function
  };

  const startLoadingPolling = (videoId: number) => {
    if (pollIntervals.current[`loading-${videoId}`]) {
      clearInterval(pollIntervals.current[`loading-${videoId}`]);
    }
    
    // Record start time for this polling session
    pollingStartTimes.current[`loading-${videoId}`] = Date.now();
    
    // Wait 90 seconds before starting to poll
    setTimeout(() => {
      pollIntervals.current[`loading-${videoId}`] = setInterval(() => {
        pollLoadingStatus(videoId);
      }, 10000); // Poll every 10 seconds
    }, 90000); // Wait 90 seconds
  };

  const clearLoadingPolling = (videoId: number) => {
    if (pollIntervals.current[`loading-${videoId}`]) {
      clearInterval(pollIntervals.current[`loading-${videoId}`]);
    }
    // Clean up start time
    delete pollingStartTimes.current[`loading-${videoId}`];
    // Clean up error message if exists
    setPollingErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[videoId];
      return newErrors;
    });
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
      if (!isLoaded || !user?.id) {
        console.log('Dashboard: User not loaded or no ID', { isLoaded, userId: user?.id });
        return;
      }
      
      try {
        setLoading(true);
        console.log('Dashboard: Fetching user videos and credits...');
        const response = await fetchUserVideos(user.id);
        console.log('Dashboard: Raw API Response:', response);

        // Direct access since the response is flat
        const creditsValue = response.credits;
        console.log('Dashboard: Extracted credits value:', creditsValue);
        
        const videos = response.records || [];
        console.log('Dashboard: Extracted videos:', videos);

        const sortedVideos = videos
          .filter(video => video.status !== "Not submitted")
          .sort((a, b) => new Date(b.created_time).getTime() - new Date(a.created_time).getTime());
        
        setVideos(sortedVideos);
        setCredits(creditsValue?.toString() || "0");
        console.log('Dashboard: Credits set to:', creditsValue);
        
        startPollingVideos(sortedVideos);
        
      } catch (err) {
        console.error('Dashboard: Error fetching data:', err);
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

  const renderThankYouCard = () => {
    if (!showThankYou) return null;

    return (
      <div className="p-4">
        <Card className="relative overflow-hidden bg-gradient-to-r from-green-100 to-green-50 border-green-300">
          <div className="p-3">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <span className="text-lg">✅</span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-green-950">
                  Vielen Dank für deinen Kauf! 🎉 Deine Credits wurden erfolgreich aktualisiert.
                </h3>
                <p className="text-xs text-green-800 mt-0.5">
                  Support jederzeit unter{' '}
                  <a 
                    href="mailto:kontakt@ugcs.io" 
                    className="font-medium hover:text-green-950 transition-colors"
                  >
                    kontakt@ugcs.io
                  </a>
                </p>
              </div>
              <button 
                onClick={() => setShowThankYou(false)} 
                className="flex-shrink-0 text-green-600 hover:text-green-800"
              >
                <span className="sr-only">Schließen</span>
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const renderContent = () => {
    if (loading || !isLoaded || !user) return (
      <div className="h-[50vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          <AnimatedText 
            text={
              loadingStep === 0 ? "Sammeln deiner Videos..." :
              loadingStep === 1 ? "Zusammenstellen des Layouts..." :
              "Erstellen deines Dashboards..."
            }
          />
        </h2>
        <div className="w-full max-w-xl animate-fade-in">
          <Progress value={progress} className="h-1" />
        </div>
      </div>
    );

    if (error) {
      return (
        <div className="p-4">
          {renderThankYouCard()}
          <div className="text-red-500">{error}</div>
          <button onClick={() => window.location.reload()} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Retry
          </button>
        </div>
      );
    }

    if (videos.length === 0) {
      return (
        <div>
          {renderThankYouCard()}
          <EmptyState onCreateClick={() => setIsModalOpen(true)} />
        </div>
      );
    }

    return (
      <div className="p-6 space-y-6">
        {renderThankYouCard()}
        <Card className="relative overflow-hidden bg-purple-50/80 border border-purple-400 shadow-sm">
          <div className="relative z-10 p-4">
            <div className="space-y-1">
              <h1 className="text-lg font-medium text-gray-900">
                Willkommen zurück, {user.firstName || 'Creator'}!
              </h1>
              <p className="text-sm text-gray-900">
                Du hast <span className="font-medium text-purple-700">{credits} Credits</span> verfügbar
              </p>
            </div>
          </div>
          <div 
            className="absolute inset-0 bg-gradient-to-r from-purple-100/50 via-purple-50/25 to-transparent" 
            style={{ 
              maskImage: 'radial-gradient(circle at 100% 100%, transparent 25%, black 75%)'
            }} 
          />
        </Card>

        <VideoGrid 
          videos={videos}
          onRatingChange={handleRatingChange}
          onAddVideo={handleAddVideo}
          onDelete={handleDeleteVideo}
          pollingErrors={pollingErrors}
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
        credits={parseInt(credits)}
      />
    </div>
  );
}
