import { Video } from '@/types/video';
import { Play, ThumbsUp, ThumbsDown, Download, Copy, Pause, Share, MoreVertical, Trash } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { updateVideoRating, deleteVideo } from '@/lib/api';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface VideoCardProps {
  video: Video;
  onRatingChange?: (videoId: number, newRating: 'good' | 'bad' | null) => void;
  onDelete?: (videoId: number) => void;
}

export function VideoCard({ video, onRatingChange, onDelete }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isFinished = video.status === "Finished";
  const [currentRating, setCurrentRating] = useState<'good' | 'bad' | null>(video.rating);
  const [isRating, setIsRating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

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

  const handleCopyUrl = async () => {
    if (!video.video_url) return;
    
    try {
      await navigator.clipboard.writeText(video.video_url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteVideo(video.id);
      // Only call onDelete if the API call was successful
      onDelete?.(video.id);
    } catch (error) {
      console.error('Failed to delete video:', error);
      // You might want to show an error toast here
    }
  };

  return (
    
    <div className="space-y-3">
      
      {/* Video Section */}
      <div 
        className="relative aspect-[9/16] rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <video
          ref={videoRef}
          src={video.video_url || ''}
          className="w-full h-full object-cover"
          poster={video.thumbnail || undefined}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          playsInline
        />
            
        {/* Play/Pause Overlay */}
        {isFinished && (
          <div className="absolute inset-0 flex items-center justify-center">
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
        )}

        {/* Timeline Overlay - only show when playing */}
        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
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
            <div className="flex justify-between text-xs text-white mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Controls Section */}
      <div className="flex justify-between items-center px-1">
        <div className="flex gap-4">
          <button 
            onClick={() => handleRating('good')}
            disabled={isRating}
            className={cn(
              "transition-all duration-200 relative",
              "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
              currentRating === 'good' && "text-green-500 hover:text-green-600",
              isRating && "opacity-50"
            )}
          >
            <ThumbsUp 
              className={cn(
                "w-5 h-5",
                currentRating === 'good' && "fill-current"
              )}
            />
            {currentRating === 'good' && showAnimation && (
              <span className="absolute inset-0 animate-ping-once rounded-full bg-green-400 opacity-75" />
            )}
          </button>
          <button 
            onClick={() => handleRating('bad')}
            disabled={isRating}
            className={cn(
              "transition-all duration-200 relative",
              "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
              currentRating === 'bad' && "text-red-500 hover:text-red-600",
              isRating && "opacity-50"
            )}
          >
            <ThumbsDown 
              className={cn(
                "w-5 h-5",
                currentRating === 'bad' && "fill-current"
              )}
            />
            {currentRating === 'bad' && showAnimation && (
              <span className="absolute inset-0 animate-ping-once rounded-full bg-red-400 opacity-75" />
            )}
          </button>
        </div>
        
        {/* Replace the download/copy buttons with dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <MoreVertical className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleCopyUrl}
              disabled={!video.video_url}
            >
              <Copy className="w-4 h-4" />
              <span>Copy Link</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer"
              asChild
              disabled={!video.video_url}
            >
              <a
                href={video.video_url || '#'}
                download
                onClick={(e) => !video.video_url && e.preventDefault()}
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </a>
            </DropdownMenuItem>
            
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                if (video.video_url) {
                  navigator.share({
                    title: 'Share Video',
                    url: video.video_url
                  });
                }
              }}
              disabled={!video.video_url}
            >
              <Share className="w-4 h-4" />
              <span>Share</span>
            </DropdownMenuItem>
            
            <AlertDialog>
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
                onSelect={(e) => e.preventDefault()} // Prevent closing dropdown on trigger click
              >
                <AlertDialogTrigger className="flex items-center gap-2 w-full">
                  <Trash className="w-4 h-4" />
                  <span>Delete</span>
                </AlertDialogTrigger>
              </DropdownMenuItem>
              
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Video</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this video? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
} 