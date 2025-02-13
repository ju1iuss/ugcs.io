"use client";

import { useUser } from '@clerk/nextjs';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/global/app-sidebar";
import { Copy, Check, ChevronDown, Sparkles, Star, TrendingUp, Lightbulb } from "lucide-react";
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { fetchUserVideos } from '@/lib/api';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Categories with their scripts
const contentCategories = [
  {
    title: "Product Reviews",
    icon: Star,
    description: "Überzeugende Produktbewertungen für maximale Conversion",
    scripts: [
      "Kennt ihr schon dieses KI Tool, mit dem ihr YouGC Ads innerhalb von nur 3 Minuten und ohne viel Kosten erstellen könnt? Kommentiere jetzt Video und Ich schicke dir den Namen.",
      "3 Gründe warum deine brand YouGC Ads benutzten sollte. Erstens Sie kosten nur 5€ pro video, zweitens du hast Resultate innerhalb von 3 Minuten und drittens du kannst so viele Hooks testen wie du willst.",
    ]
  },
  {
    title: "Hook Variationen",
    icon: TrendingUp,
    description: "Attention-grabbing Hooks für bessere Engagement Rates",
    scripts: [
      "POV: Du gibst jetzt nurnoch 5€ pro YouGC Video aus und erstellst 1000 Videos pro Monat. Kommentiere Video um zu erfahren wie.",
      "Stell dir vor du machst 10 Tausend Euro pro Monat an YouGC äd Revenue seitdem du dich nie mehr um Creator & Content kümmern musst."
    ]
  },
  {
    title: "Pain Points",
    icon: Lightbulb,
    description: "Direkte Ansprache der Kundenprobleme",
    scripts: [
      "3 No-Goes im E-commerce: Erstens: Du benutzt kein YouGC. Zweitens: Du zahlst mehr als 10 Euro pro Video. Drittens: Es braucht mehr als 10 Minuten dass Du dein YouGC Video zu erhälst.",
      "Probleme mit teuren Video-Ads? Hier ist die Lösung: YouGC erstellt deine Videos für nur 5€ - in unter 3 Minuten!"
    ]
  }
];

// Example videos with more metadata
const videoCategories = [
  {
    title: "Top Performer",
    description: "Unsere erfolgreichsten Video-Ads",
    videos: [
      {
        url: "https://api.altan.ai/platform/media/17af25f8-5f4c-4ceb-9262-38444b2f9906",
        title: "Product Review",
        performance: "2.1x ROAS"
      },
      {
        url: "https://storage.googleapis.com/nca-toolkit-bucket-julius/56bffbd5-a6a0-4f9b-8d16-448ca95af322_output_0.mp4",
        title: "Hook Style",
        performance: "1.8x ROAS"
      },
      {
        url: "https://storage.googleapis.com/nca-toolkit-bucket-julius/6dfeb2bd-ae22-45a5-adc0-1fb8d183c894_output_0.mp4",
        title: "POV Style",
        performance: "High CTR"
      },
      {
        url: "https://storage.googleapis.com/nca-toolkit-bucket-julius/8911b01e-8b86-422a-8dd1-083ba5a92829_output_0.mp4",
        title: "Problem-Solution",
        performance: "High Conv."
      }
    ]
  },
  {
    title: "Trending Styles",
    description: "Aktuelle Video-Trends und Formate",
    videos: [
      {
        url: "https://storage.googleapis.com/nca-toolkit-bucket-julius/6dfeb2bd-ae22-45a5-adc0-1fb8d183c894_output_0.mp4",
        title: "Story Style",
        performance: "Trending"
      },
      {
        url: "https://storage.googleapis.com/nca-toolkit-bucket-julius/8911b01e-8b86-422a-8dd1-083ba5a92829_output_0.mp4",
        title: "Tutorial",
        performance: "Popular"
      },
      {
        url: "https://api.altan.ai/platform/media/17af25f8-5f4c-4ceb-9262-38444b2f9906",
        title: "Testimonial",
        performance: "New"
      },
      {
        url: "https://storage.googleapis.com/nca-toolkit-bucket-julius/56bffbd5-a6a0-4f9b-8d16-448ca95af322_output_0.mp4",
        title: "Features",
        performance: "Classic"
      }
    ]
  }
];

export default function InspirationPage() {
  const { user, isLoaded } = useUser();
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Product Reviews");
  const [expandedVideoCategory, setExpandedVideoCategory] = useState<string | null>("Top Performer");
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
        <AppSidebar />
        <main className="flex-1 overflow-x-hidden p-6">
          <div className="max-w-[90rem] mx-auto space-y-8">
            {/* Header Section */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Inspiration Hub</h1>
              <p className="text-muted-foreground">
                Entdecke erfolgreiche Skripte und Video-Styles für deine nächste Kampagne
              </p>
            </div>

            {/* Scripts Categories */}
            <div className="grid gap-6">
              {contentCategories.map((category) => (
                <Card key={category.title} className="overflow-hidden">
                  <div 
                    className="border-b border-border p-4 bg-gradient-to-r from-purple-50/50 to-white"
                    onClick={() => setExpandedCategory(
                      expandedCategory === category.title ? null : category.title
                    )}
                  >
                    <div className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <category.icon className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{category.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <ChevronDown className={cn(
                        "w-5 h-5 text-gray-500 transition-transform duration-200",
                        expandedCategory === category.title && "transform rotate-180"
                      )} />
                    </div>
                  </div>
                  
                  {expandedCategory === category.title && (
                    <div className="p-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        {category.scripts.map((script, index) => (
                          <div 
                            key={index}
                            className="bg-gray-50 p-4 rounded-lg relative group hover:bg-gray-100 transition-colors"
                          >
                            <p className="text-sm text-gray-600 pr-8">
                              {script}
                            </p>
                            <button
                              onClick={() => handleCopy(script)}
                              className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              {copiedText === script ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {/* Video Categories */}
            <div className="grid gap-6">
              {videoCategories.map((category) => (
                <Card key={category.title} className="overflow-hidden">
                  <div 
                    className="border-b border-border p-4 bg-gradient-to-r from-purple-50/50 to-white"
                    onClick={() => setExpandedVideoCategory(
                      expandedVideoCategory === category.title ? null : category.title
                    )}
                  >
                    <div className="flex items-center justify-between cursor-pointer">
                      <div>
                        <h3 className="font-medium text-gray-900">{category.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                      <ChevronDown className={cn(
                        "w-5 h-5 text-gray-500 transition-transform duration-200",
                        expandedVideoCategory === category.title && "transform rotate-180"
                      )} />
                    </div>
                  </div>
                  
                  {expandedVideoCategory === category.title && (
                    <div className="p-4 overflow-hidden">
                      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                        {category.videos.map((video, index) => (
                          <div key={index} className="w-[120px] flex-none">
                            <div className="aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden hover:ring-2 hover:ring-purple-200 transition-all">
                              <video
                                src={video.url}
                                className="w-full h-full object-cover"
                                controls
                                preload="metadata"
                                controlsList="nodownload"
                              />
                            </div>
                            <div className="flex items-center justify-between mt-1.5 px-0.5">
                              <span className="text-xs font-medium text-gray-900">
                                {video.title}
                              </span>
                              <Badge 
                                variant="secondary" 
                                className="text-[10px] px-1.5 py-0.5 bg-purple-50 text-purple-700 font-medium"
                              >
                                {video.performance}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
} 