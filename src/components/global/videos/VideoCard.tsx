import { Video } from '@/types/video';
import { Play, ThumbsUp, ThumbsDown, Download, Copy, Pause, Share, MoreVertical, Trash, Loader2 } from 'lucide-react';
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
import { toast } from "sonner";

interface VideoCardProps {
  video: Video;
  onRatingChange?: (videoId: number, newRating: 'good' | 'bad' | null) => void;
  onDelete?: (videoId: number) => void;
  errorMessage?: string;
}

export function VideoCard({ video, onRatingChange, onDelete, errorMessage }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isGenerating = video.status === "Generating";
  const isFinished = video.status === "Finished";
  const [currentRating, setCurrentRating] = useState<'good' | 'bad' | null>(video.rating);
  const [isRating, setIsRating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout>();
  const isLoading = video.status === "Generating" || video.status === "Loading";
  const hasError = errorMessage || video.status === "Error";
  
  // Get the error message to display
  const displayError = errorMessage || (video.status === "Error" ? "ERROR - Bitte ändere deinen Skript" : null);

  // Reset animation after it plays
  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 500); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  // Remove the separate useEffects and combine into one
  useEffect(() => {
    if (isLoading) {
      // Reset progress when starting
      setGenerationProgress(0);
      
      const duration = 180000; // 3 minutes in milliseconds
      const steps = 100;
      const stepDuration = duration / steps;

      progressInterval.current = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval.current);
            return 100;
          }
          return prev + 1;
        });
      }, stepDuration);

      // Cleanup on unmount or when loading state changes
      return () => {
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }
      };
    }
  }, [isLoading]); // Only depend on isLoading state

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
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
      toast.error("Failed to copy link");
    }
  };

  const handleDelete = async () => {
    try {
      // Call onDelete first for immediate UI update
      onDelete?.(video.id);
      
      // Then make the API call
      await deleteVideo(video.id);
    } catch (error) {
      console.error('Failed to delete video:', error);
      // Optionally: You could add logic here to revert the UI change if the API call fails
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        {/* Error message display - centered with white text */}
        {displayError && (
          <div className="absolute inset-0 z-40 flex items-center justify-center">
            <p className="text-white text-center font-medium px-4">
              <span className="text-red-500">ERROR</span> <br />
              {"Bitte ändere deinen Skript"}
            </p>
          </div>
        )}

        {/* Show loader for both Generating and Loading states */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 rounded-lg z-30">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
              <span className="text-sm font-medium text-white">
                {generationProgress}%
              </span>
            </div>
            <p className="text-xs text-white italic text-center pt-2">
              ca. 2-3 Minuten <br />
              Du kriegst eine Mail <br /> wenn es fertig ist.
            </p>
          </div>
        )}

        {/* Video Section - Enhanced shadows and error state */}
        <div 
          className={cn(
            "relative aspect-[9/16] rounded-lg overflow-hidden bg-white dark:bg-gray-800",
            "shadow-xl",
            isLoading && "brightness-75",
            hasError && "brightness-50", // Now checks for both error states
            "transition-all duration-300"
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <video
            ref={videoRef}
            src={video.video_url || ''}
            className={cn(
              "w-full h-full object-cover",
              hasError && "pointer-events-none" // Now checks for both error states
            )}
            poster={video.thumbnail || undefined}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            playsInline
          />
            
          {/* Only show play/pause overlay if no error */}
          {isFinished && !hasError && (
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

          {/* Timeline Overlay - only show when playing and no error */}
          {isPlaying && !hasError && (
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
      </div>

      {/* Actions Section - Disable rating buttons when error exists */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleRating('good')}
            disabled={!!(isRating || hasError)}
            className={cn(
              "transition-all duration-200 relative",
              "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
              currentRating === 'good' && "text-green-500 hover:text-green-600",
              (isRating || hasError) && "opacity-50 cursor-not-allowed"
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
            disabled={!!(isRating || hasError)}
            className={cn(
              "transition-all duration-200 relative",
              "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
              currentRating === 'bad' && "text-red-500 hover:text-red-600",
              (isRating || hasError) && "opacity-50 cursor-not-allowed"
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
        
        {/* Only show dropdown menu if not loading */}
        {!isLoading && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <MoreVertical className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                className={cn(
                  "flex items-center gap-2 cursor-pointer",
                  copySuccess && "text-green-600"
                )}
                onClick={handleCopyUrl}
                disabled={!video.video_url}
              >
                <Copy className={cn("w-4 h-4", copySuccess && "animate-ping-once")} />
                <span>{copySuccess ? "Copied!" : "Copy Link"}</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer"
                disabled={!video.video_url}
                onClick={async (e) => {
                  e.preventDefault();
                  if (!video.video_url) return;

                  try {
                    // Fetch the video as a blob
                    const response = await fetch(video.video_url);
                    const blob = await response.blob();
                    
                    // Create a blob URL and trigger download
                    const blobUrl = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = blobUrl;
                    link.download = 'video.mp4';
                    document.body.appendChild(link);
                    link.click();
                    
                    // Cleanup
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(blobUrl);
                    
                    toast.success("Download started");
                  } catch (error) {
                    console.error('Download failed:', error);
                    toast.error("Download failed");
                  }
                }}
              >
                <div className="flex items-center gap-2 w-full">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </div>
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
        )}
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
} 