"use client";

import { useUser } from '@clerk/nextjs';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/global/app-sidebar";
import { Copy, Check, ChevronDown } from "lucide-react";
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { fetchUserVideos } from '@/lib/api';

// Flat array of scripts
const scripts = [
  "Kennt ihr schon dieses KI Tool, mit dem ihr YouGC Ads innerhalb von nur 3 Minuten und ohne viel Kosten erstellen könnt? Kommentiere jetzt Video und Ich schicke dir den Namen.",
  "3 Gründe warum deine brand YouGC Ads benutzten sollte. Erstens Sie kosten nur 5€ pro video, zweitens du hast Resultate innerhalb von 3 Minuten und drittens du kannst so viele Hooks testen wie du willst.",
  "POV: Du gibst jetzt nurnoch 5€ pro YouGC Video aus und erstellst 1000 Videos pro Monat. Kommentiere Video um zu erfahren wie.",
  "3 No-Goes im E-commerce: Erstens: Du benutzt kein YouGC. Zweitens: Du zahlst mehr als 10 Euro pro Video. Drittens: Es braucht mehr als 10 Minuten dass Du dein YouGC Video zu erhälst.",
  "Stell dir vor du machst 10 Tausend Euro pro Monat an YouGC äd Revenue seitdem du dich nie mehr um Creator & Content kümmern musst."
  // Add more scripts as needed
];

// Add videos array
const videos = [
  {
    url: "https://api.altan.ai/platform/media/17af25f8-5f4c-4ceb-9262-38444b2f9906?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
  },
  {
    url: "https://storage.googleapis.com/nca-toolkit-bucket-julius/56bffbd5-a6a0-4f9b-8d16-448ca95af322_output_0.mp4",
  },
  {
    url: "https://storage.googleapis.com/nca-toolkit-bucket-julius/6dfeb2bd-ae22-45a5-adc0-1fb8d183c894_output_0.mp4",
  },
  {
    url: "https://storage.googleapis.com/nca-toolkit-bucket-julius/8911b01e-8b86-422a-8dd1-083ba5a92829_output_0.mp4",
  },
];

export default function InspirationPage() {
  const { user, isLoaded } = useUser();
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isScriptsCollapsed, setIsScriptsCollapsed] = useState(false);
  const [isVideosCollapsed, setIsVideosCollapsed] = useState(false);
  const [credits, setCredits] = useState<string>("0");

  useEffect(() => {
    async function loadCredits() {
      if (!isLoaded || !user?.id) return;
      
      try {
        const response = await fetchUserVideos(user.id);
        setCredits(response.credits);
      } catch (err) {
        console.error('Error loading credits:', err);
      }
    }

    loadCredits();
  }, [user?.id, isLoaded]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f3f5f8]">
      <SidebarProvider>
        <AppSidebar credits={credits} />
        <main className="flex-1 overflow-x-hidden p-6">
          <div className="max-w-[90rem] mx-auto space-y-8">
            {/* Scripts Section */}
            <div>
              <button
                onClick={() => setIsScriptsCollapsed(!isScriptsCollapsed)}
                className="flex items-center gap-2 mb-6 group hover:scale-[1.02] transition-transform duration-200"
              >
                <h2 className="text-lg font-medium text-gray-900">Product Reviews</h2>
                <ChevronDown 
                  className={cn(
                    "h-5 w-5 text-gray-500 transition-transform duration-200 group-hover:text-gray-700",
                    isScriptsCollapsed && "transform rotate-180"
                  )} 
                />
              </button>

              <div className={cn(
                "transition-all duration-300 origin-top",
                isScriptsCollapsed ? "h-0 opacity-0 overflow-hidden" : "h-auto opacity-100"
              )}>
                <div className="flex overflow-x-auto pb-6 gap-4 snap-x">
                  {scripts.map((script, index) => (
                    <div 
                      key={index}
                      className="min-w-[300px] max-w-[300px] bg-white p-6 rounded-lg shadow-sm snap-start
                        hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="relative h-full">
                        <p className="text-gray-600 pr-8 text-sm leading-relaxed">
                          {script}
                        </p>
                        <button
                          onClick={() => handleCopy(script)}
                          className="absolute top-0 right-0 text-gray-400 hover:text-gray-600"
                        >
                          {copiedText === script ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <Copy className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Videos Section */}
            <div>
              <button
                onClick={() => setIsVideosCollapsed(!isVideosCollapsed)}
                className="flex items-center gap-2 mb-6 group hover:scale-[1.02] transition-transform duration-200"
              >
                <h2 className="text-lg font-medium text-gray-900">Videos</h2>
                <ChevronDown 
                  className={cn(
                    "h-5 w-5 text-gray-500 transition-transform duration-200 group-hover:text-gray-700",
                    isVideosCollapsed && "transform rotate-180"
                  )} 
                />
              </button>

              <div className={cn(
                "transition-all duration-300 origin-top",
                isVideosCollapsed ? "h-0 opacity-0 overflow-hidden" : "h-auto opacity-100"
              )}>
                <div className="flex overflow-x-auto pb-6 gap-4 snap-x">
                  {videos.map((video, index) => (
                    <div 
                      key={index}
                      className="min-w-[260px] max-w-[260px] bg-white rounded-lg shadow-sm snap-start
                        hover:shadow-md transition-shadow duration-200 overflow-hidden"
                    >
                      <video
                        src={video.url}
                        className="w-full aspect-[9/16] object-cover"
                        controls
                        preload="metadata"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
} 