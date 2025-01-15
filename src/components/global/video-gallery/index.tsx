"use client";

import { useRef, useState } from 'react';

const videos = [
  "https://storage.googleapis.com/nca-toolkit-bucket-julius/50e6d91e-cc3f-44cc-9e9a-004af742767c_output_0.mp4",
  "https://storage.googleapis.com/nca-toolkit-bucket-julius/a50db72f-6d74-4106-a1b9-61923eb2cf12_output_0.mp4",
  "https://api.altan.ai/platform/media/887d1870-8245-4a9c-94f6-97ff66bfdb5a?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
  "https://storage.googleapis.com/nca-toolkit-bucket-julius/50e6d91e-cc3f-44cc-9e9a-004af742767c_output_0.mp4",
  "https://storage.googleapis.com/nca-toolkit-bucket-julius/a50db72f-6d74-4106-a1b9-61923eb2cf12_output_0.mp4",
  "https://api.altan.ai/platform/media/887d1870-8245-4a9c-94f6-97ff66bfdb5a?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
  "https://storage.googleapis.com/nca-toolkit-bucket-julius/50e6d91e-cc3f-44cc-9e9a-004af742767c_output_0.mp4",
  "https://storage.googleapis.com/nca-toolkit-bucket-julius/a50db72f-6d74-4106-a1b9-61923eb2cf12_output_0.mp4",
  "https://api.altan.ai/platform/media/887d1870-8245-4a9c-94f6-97ff66bfdb5a?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
  "https://storage.googleapis.com/nca-toolkit-bucket-julius/50e6d91e-cc3f-44cc-9e9a-004af742767c_output_0.mp4",
  "https://storage.googleapis.com/nca-toolkit-bucket-julius/a50db72f-6d74-4106-a1b9-61923eb2cf12_output_0.mp4",
  "https://api.altan.ai/platform/media/887d1870-8245-4a9c-94f6-97ff66bfdb5a?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
];

export function VideoGallery() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleVideoClick = (index: number) => {
    if (playingIndex === index) {
      // If clicking the playing video, pause it
      videoRefs.current[index]?.pause();
      setPlayingIndex(null);
    } else {
      // If clicking a new video, pause the current one and play the new one
      if (playingIndex !== null && videoRefs.current[playingIndex]) {
        videoRefs.current[playingIndex]?.pause();
      }
      videoRefs.current[index]?.play();
      setPlayingIndex(index);
    }
  };

  return (
    <section className="w-screen -mx-[calc((100vw-100%)/2)] mb-24 py-8">
      <div className="relative px-0 md:px-4">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
        
        {/* Scrollable Video Container */}
        <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide">
          {videos.map((src, index) => (
            <div 
              key={index} 
              className="flex-none w-[160px] relative cursor-pointer"
              onClick={() => handleVideoClick(index)}
            >
              <video
                ref={(el) => { videoRefs.current[index] = el }}
                className="w-full aspect-[9/16] object-cover rounded-xl shadow-lg"
                loop
                muted={playingIndex !== index}
                playsInline
                src={src}
              />
              {playingIndex !== index && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <svg 
                    className="w-12 h-12 text-white drop-shadow-lg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.3))' }}
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
              {playingIndex === index && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 hover:opacity-100 transition-opacity"
                >
                  <svg 
                    className="w-12 h-12 text-white/90" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.3))' }}
                  >
                    <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 