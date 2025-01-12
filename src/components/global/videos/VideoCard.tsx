import { Video } from '@/types/video';
import { Play, ThumbsUp, ThumbsDown, Share, Pause } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { updateVideoRating } from '@/lib/api';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  video: Video;
  onRatingChange?: (videoId: number, newRating: 'good' | 'bad' | null) => void;
}

export function VideoCard({ video, onRatingChange }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isFinished = video.status === "Finished";
  const [currentRating, setCurrentRating] = useState<'good' | 'bad' | null>(video.rating);
  const [isRating, setIsRating] = useState(false);

  // Reset animation after it plays
  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 500); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  const handlePlay = () => {
    if (!video.video_url || !isFinished || !videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    
    const timeline = e.currentTarget;
    const rect = timeline.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    const time = percent * videoRef.current.duration;
    
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleRating = async (rating: 'good' | 'bad') => {
    if (isRating) return;

    try {
      setIsRating(true);
      
      // Determine new rating
      const newRating = currentRating === rating ? null : rating;
      
      // Update local state immediately
      setCurrentRating(newRating);
      setShowAnimation(true);
      
      // Notify parent component
      onRatingChange?.(video.id, newRating);

      // Send to API
      await updateVideoRating(video.id, rating);
    } catch (error) {
      console.error('Failed to update rating:', error);
      // Don't revert the state as we want it to be instantly changeable
    } finally {
      setIsRating(false);
    }
  };

  return (
    <div 
      className="relative rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[9/16]">
        <video
          ref={videoRef}
          src={video.video_url || ''}
          className="w-full h-full object-cover"
          poster={video.thumbnail || undefined}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          playsInline
        />
            
        {/* Overlay container */}
        {isFinished && (
          <div className="absolute inset-0 flex flex-col items-center justify-between">
            {/* Play/Pause button container */}
            <div className="flex-1 flex items-center justify-center w-full">
              {/* Show play button when not playing, or pause button only on hover while playing */}
              {(!isPlaying || (isPlaying && isHovered)) && (
                <button 
                  onClick={handlePlay}
                  className="hover:scale-110 transition-transform duration-200"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white/90" />
                  ) : (
                    <Play className="w-8 h-8 text-white/90" />
                  )}
                </button>
              )}
            </div>

            {/* Timeline - only show when hovering and playing */}
            {isPlaying && isHovered && (
              <div className="w-full px-4 pb-4 bg-gradient-to-t from-black/50 to-transparent">
                <div 
                  className="w-full h-1 bg-white/30 rounded cursor-pointer"
                  onClick={handleTimelineClick}
                >
                  <div 
                    className="h-full bg-white rounded"
                    style={{ 
                      width: `${(currentTime / duration) * 100}%`,
                      transition: 'width 0.1s linear'
                    }}
                  />
                </div>
                <div className="flex justify-between text-white text-xs mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Updated controls */}
      <div className="p-2 flex justify-between items-center">
        <div className="flex gap-2">
          <button 
            onClick={() => handleRating('good')}
            disabled={isRating}
            className={cn(
              "transition-all duration-200 relative",
              "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
              currentRating === 'good' && "text-green-500 hover:text-green-600",
              isRating && "opacity-50"
            )}
          >
            <ThumbsUp 
              className={cn(
                "w-3.5 h-3.5",
                currentRating === 'good' && "fill-current"
              )}
            />
            {/* One-time animation ring */}
            {currentRating === 'good' && showAnimation && (
              <span className="absolute inset-0 animate-ping-once rounded-full bg-green-400 opacity-75" />
            )}
          </button>
          <button 
            onClick={() => handleRating('bad')}
            disabled={isRating}
            className={cn(
              "transition-all duration-200 relative",
              "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
              currentRating === 'bad' && "text-red-500 hover:text-red-600",
              isRating && "opacity-50"
            )}
          >
            <ThumbsDown 
              className={cn(
                "w-3.5 h-3.5",
                currentRating === 'bad' && "fill-current"
              )}
            />
            {/* One-time animation ring */}
            {currentRating === 'bad' && showAnimation && (
              <span className="absolute inset-0 animate-ping-once rounded-full bg-red-400 opacity-75" />
            )}
          </button>
        </div>
        <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
          <Share className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
} 