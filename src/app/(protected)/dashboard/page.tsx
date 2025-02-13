"use client";

import { useUser } from '@clerk/nextjs';
import { useEffect, useState, useRef } from 'react';
import { VideoGrid } from '@/components/global/videos/VideoGrid';
import { fetchUserVideos } from '@/lib/api';
import { Video } from '@/types/video';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/global/app-sidebar";
import { EmptyState } from '@/components/global/empty-state';
import MultiStepForm from "@/components/global/form/MultiStepForm";
import { Progress } from "@/components/ui/progress";
import { AnimatedText } from "@/components/ui/animated-text";
import { Card } from "@/components/ui/card";
import { usePathname } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useUserData } from '@/contexts/UserDataContext';
import Link from 'next/link';
import { Crown } from "lucide-react";

// Add new type for error tracking
interface PollingError {
  videoId: number;
  message: string;
}

function LoadingState() {
  return (
    <div className="h-[50vh] flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        <AnimatedText text="Lade deine Videos..." />
      </h2>
      <div className="w-full max-w-xl animate-fade-in">
        <Progress value={66} className="h-1" />
      </div>
    </div>
  );
}

function ErrorState({ error }: { error: string }) {
  return (
    <div className="p-4">
      <div className="text-red-500">{error}</div>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Erneut versuchen
      </button>
    </div>
  );
}

export default function DashboardPage() {
  const { videos, credits, loading, error, refetchData } = useUserData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, isLoaded } = useUser();
  const [pollingErrors, setPollingErrors] = useState<PollingError[]>([]);
  const pathname = usePathname();
  const [showThankYou, setShowThankYou] = useState(false);
  
  // Add these refs
  const pollIntervals = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const pollingStartTimes = useRef<{ [key: string]: number }>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isNewPurchase = window.location.hash === '#new';
      setShowThankYou(isNewPurchase);
      
      // Fire conversion tracking for completed purchase
      if (isNewPurchase && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-11382902307/DRE4CJqz0JkaEKOc5bMq'
        });
      }
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
      
      if (data.video) {
        const videoData = typeof data.video === 'string' 
          ? JSON.parse(data.video) 
          : data.video;

        // Update video in state with new data
        refetchData();

        // If status changes to "Loading", start loading polling
        if (videoData.status === "Loading") {
          startLoadingPolling(Number(videoData.id));
        }

        // Clear the interval if we got a valid response
        if (pollIntervals.current[correlationId]) {
          clearInterval(pollIntervals.current[correlationId]);
          delete pollIntervals.current[correlationId];
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
      setPollingErrors(prev => [...prev, { videoId, message: "ERROR - Bitte ändere deinen Skript" }]);

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
        refetchData();

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
    
    // Just call once after 5 seconds delay
    setTimeout(() => {
      pollGeneratingStatus(correlationId);
    }, 5000);
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
    setPollingErrors(prev => prev.filter(error => error.videoId !== videoId));
  };

  const handleAddVideo = async (video: Video) => {
    // ... video handling logic
    await refetchData(); // Refetch data after adding video
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

  const renderWelcomeCard = () => {
    const plan = user?.publicMetadata?.plan as string;

    switch(plan) {
      case 'free':
        return (
          <Card className="bg-white border-purple-100/50">
            <div className="p-6 flex items-center justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-medium text-gray-900">
                    Willkommen bei UGCS
                  </h2>
                  <Badge 
                    variant="secondary" 
                    className="bg-purple-50 text-purple-700"
                  >
                    Free
                  </Badge>
                  <Badge 
                    variant="secondary" 
                    className="bg-amber-50 text-amber-700 animate-pulse"
                  >
                    Limited Time
                  </Badge>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className="px-2.5 py-0.5 border-purple-100/50"
                    >
                      {credits} Test Credits Available
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      1 Credit = 1 Second
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Teste jetzt kostenlos! Upgrade für unbegrenzte Video-Erstellung & Downloads
                  </p>
                </div>
              </div>
              <button
                onClick={() => window.location.href = '/pricing'}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-purple-600 text-white hover:bg-purple-700 h-9 px-4 py-2"
              >
                Upgrade to Pro
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </Card>
        );
      case 'starter':
        return (
          <Card className="bg-white border-purple-100/50 p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-base font-medium">Starter Plan</h2>
                <p className="text-sm text-gray-500">Upgrade to Creator for more features</p>
              </div>
              <Link href="/pricing">
                <button className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
                  Upgrade to Creator
                </button>
              </Link>
            </div>
          </Card>
        );
      case 'creator':
        return (
          <Card className="bg-white border-purple-100/50 p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-base font-medium">Creator Plan</h2>
                <p className="text-sm text-gray-500">Upgrade to Agency for team features</p>
              </div>
              <Link href="/pricing">
                <button className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
                  Upgrade to Agency
                </button>
              </Link>
            </div>
          </Card>
        );
      case 'agency':
        return (
          <Card className="bg-white border-purple-100/50 p-4">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-yellow-500" />
              <h2 className="text-base font-medium">Agency Plan</h2>
            </div>
          </Card>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (loading || !isLoaded || !user) {
      return <LoadingState />;
    }

    if (error) {
      return <ErrorState error={error} />;
    }

    const plan = user?.publicMetadata?.plan as string;

    if (videos.length === 0) {
      return (
        <div className="p-6 space-y-6">
          {renderThankYouCard()}
          {renderWelcomeCard()}
          <VideoGrid 
            videos={[]}
            onAddVideo={handleAddVideo}
            pollingErrors={pollingErrors}
            userTier={plan || 'free'}
            refetchData={refetchData}
          />
          <div className="text-center text-sm text-gray-500">
            Noch keine Videos erstellt. Starte jetzt mit deinem ersten Video!
          </div>
        </div>
      );
    }

    return (
      <div className="p-6 space-y-6">
        {renderThankYouCard()}
        {renderWelcomeCard()}
        {plan !== 'free' && (
          <div className="flex items-center justify-between bg-white/50 backdrop-blur-sm rounded-lg px-6 py-3 border border-purple-100/50">
            <div className="flex items-center gap-4">
              <h2 className="text-base font-medium text-gray-900">
                {user.firstName ? `Welcome back, ${user.firstName}` : 'Welcome back'}
              </h2>
              <div className="h-4 w-px bg-gray-200" />
              <div className="flex items-center gap-2">
                <Badge 
                  variant="secondary" 
                  className="px-2.5 py-0.5 bg-purple-50 text-purple-700 font-medium border border-purple-100/50"
                >
                  {credits} Credits Available
                </Badge>
                <span className="text-xs text-gray-500">
                  1 Credit = 1 Second
                </span>
              </div>
            </div>
          </div>
        )}

        <VideoGrid 
          videos={videos}
          onAddVideo={handleAddVideo}
          pollingErrors={pollingErrors}
          userTier={plan || 'free'}
          refetchData={refetchData}
        />
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#f3f5f8]">
      <SidebarProvider>
        <AppSidebar onAddVideo={handleAddVideo} />
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
