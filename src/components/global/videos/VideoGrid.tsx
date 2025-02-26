import { Video } from '@/types/video';
import { VideoCard } from './VideoCard';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { PollingError } from '@/types/pollingError';

interface VideoGridProps {
  videos: Video[];
  onRatingChange?: (videoId: number, newRating: 'good' | 'bad' | null) => void;
  onAddVideo?: (video: Video) => void;
  onDelete?: (videoId: number) => void;
  pollingErrors: PollingError[];
  userTier?: string;
  refetchData?: () => Promise<void>;
}

export function VideoGrid({ videos, onRatingChange, onAddVideo, onDelete, pollingErrors, userTier = 'free', refetchData }: VideoGridProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="space-y-4">
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex items-center gap-2 text-sm font-medium text-gray-700"
      >
        Videos ({videos.length})
        <ChevronDown className={cn(
          "w-4 h-4 transition-transform",
          isCollapsed && "transform rotate-180"
        )} />
      </button>
      
      <div className={cn(
        "transition-all duration-300",
        isCollapsed ? "h-0 overflow-hidden" : "h-[280px]" // Adjust height based on your card size
      )}>
        <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {videos.map((video) => (
            <div key={video.id} className="flex-none w-[160px]"> {/* Fixed width for 9:16 ratio */}
              <VideoCard 
                video={video} 
                onRatingChange={onRatingChange}
                onDelete={onDelete}
                errorMessage={pollingErrors.find(e => e.videoId === video.id)?.message}
                userTier={userTier}
                refetchData={refetchData}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
