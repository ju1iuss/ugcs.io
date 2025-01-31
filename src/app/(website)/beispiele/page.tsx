"use client";

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { useAuth } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { fetchCommunityVideos } from '@/lib/api';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Download, Share2 } from "lucide-react";

interface Video {
  video_url: string;
  user_id: string;
  creation_time: string;
}

export default function BeispielePage() {
  const { userId } = useAuth();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [playingVideos, setPlayingVideos] = useState<{ [key: string]: boolean }>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    { id: "all", name: "Alle Videos" },
    { id: "product", name: "Produktvorstellung" },
    { id: "social", name: "Social Media" },
    { id: "tutorial", name: "Tutorials" },
    { id: "marketing", name: "Marketing" },
    { id: "other", name: "Sonstiges" },
  ];

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const videos = await fetchCommunityVideos();
        setVideos(videos);
      } catch (error) {
        console.error('Error loading videos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  const filteredVideos = selectedCategory === "all" 
    ? videos 
    : videos.filter(video => video.user_id.includes(selectedCategory));

  const MobileMenu = () => {
    return (
      <div className={`
        absolute top-full left-0 right-0 bg-white border-b border-gray-200 
        transition-all duration-200 ease-in-out z-50
        ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}>
        <div className="px-4 py-2 space-y-2">
          {userId ? (
            <Link 
              href="/dashboard"
              className="block py-2"
            >
              <Button 
                variant="default" 
                className="w-full text-sm bg-black hover:bg-gray-800 text-white flex items-center gap-2 justify-center px-4 py-2"
              >
                <Sparkles className="h-4 w-4" />
                Zum Dashboard
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
            </Link>
          ) : (
            <>
              <Link 
                href="/dashboard"
                className="block py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-md px-4 py-2"
              >
                Einloggen
              </Link>
              <Link 
                href="/sign-up"
                className="block py-2"
              >
                <Button 
                  variant="default" 
                  className="w-full text-sm bg-black hover:bg-gray-800 text-white flex items-center gap-2 justify-center px-4 py-2"
                >
                  <Sparkles className="h-4 w-4" />
                  Video erstellen
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    );
  };

  const Header = () => (
    <div className="border-b border-gray-200 w-screen -mx-[calc((100vw-100%)/2)] px-[calc((100vw-100%)/2)] sticky top-0 bg-white/80 backdrop-blur-sm z-50">
      <header className="max-w-5xl mx-auto flex items-center justify-between py-2 md:py-4">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <Image
                src="/favicon.ico"
                alt="Ugcs.io Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-semibold">Ugcs.io</span>
            </div>
          </Link>
        </div>
        
        {/* Hide nav items on mobile, show menu button instead */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            href="/#examples" 
            className="text-sm text-gray-600 hover:text-gray-900 scroll-smooth"
          >
            Features
          </Link>
          <Link 
            href="/beispiele" 
            className="text-sm text-gray-600 hover:text-gray-900 scroll-smooth"
          >
            Beispiele
          </Link>
          <Link 
            href="/#pricing" 
            className="text-sm text-gray-600 hover:text-gray-900 scroll-smooth"
          >
            Preise
          </Link>
          <div className="flex items-center space-x-4">
            {userId ? (
              <Link href="/dashboard">
                <Button 
                  variant="default" 
                  className="text-sm bg-black hover:bg-gray-800 text-white flex items-center gap-2 px-4 py-2"
                >
                  <Sparkles className="h-4 w-4" />
                  Zum Dashboard
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Button>
              </Link>
            ) : (
              <>
                <Link 
                  href="/dashboard"
                  className="text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-md px-4 py-2"
                >
                  Einloggen
                </Link>
                <Link href="/sign-up">
                  <Button 
                    variant="default" 
                    className="text-sm bg-black hover:bg-gray-800 text-white flex items-center gap-2 px-4 py-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    Video erstellen
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </Button>
      </header>
      
      {/* Mobile menu dropdown */}
      <MobileMenu />
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col items-center mb-12">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex -space-x-2">
                <img 
                  className="w-8 h-8 rounded-full border-2 border-white" 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop" 
                  alt="" 
                />
                <img 
                  className="w-8 h-8 rounded-full border-2 border-white" 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop" 
                  alt="" 
                />
                <img 
                  className="w-8 h-8 rounded-full border-2 border-white" 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop" 
                  alt="" 
                />
              </div>
              <span className="text-sm text-gray-600">+859 aktive Nutzer</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Community Videos</h1>
            <p className="text-gray-600 text-center max-w-2xl">
              Entdecke wie andere Nutzer KI-Videos für ihr Marketing erstellen und lass dich inspirieren
            </p>
          </div>

          {/* Enhanced Category Filter */}
          <div className="bg-gray-50 p-6 rounded-xl mb-12">
            <h2 className="text-lg font-medium mb-4">Filter nach Kategorie</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="rounded-full"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {[
              { label: "Videos erstellt", value: "4.000+" },
              { label: "Aktive Nutzer", value: "859" },
              { label: "Zufriedene Kunden", value: "92%" },
            ].map((stat, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-xl text-center">
                <div className="font-bold text-xl">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>{video.user_id}</span>
                    <span>{video.creation_time}</span>
                  </div>
                  <div className="aspect-[9/16] rounded-xl overflow-hidden shadow-sm relative group">
                    {video.video_url ? (
                      <div className="relative">
                        {/* Video Player */}
                        <video
                          src={video.video_url}
                          className="w-full h-full object-cover"
                          playsInline
                          loop
                          controls // Native controls for better UX
                          ref={(el) => {
                            if (el) {
                              el.addEventListener('play', () => {
                                setPlayingVideos(prev => ({ ...prev, [index]: true }));
                                // Pause other videos when this one starts playing
                                document.querySelectorAll('video').forEach(v => {
                                  if (v !== el) v.pause();
                                });
                              });
                              el.addEventListener('pause', () => 
                                setPlayingVideos(prev => ({ ...prev, [index]: false }))
                              );
                            }
                          }}
                        />

                        {/* Actions Dropdown */}
                        <div className="absolute top-2 right-2 z-10">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 bg-black/20 hover:bg-black/40 text-white"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  window.open(video.video_url, '_blank');
                                }}
                                className="cursor-pointer"
                              >
                                <Download className="mr-2 h-4 w-4" />
                                <span>Download</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  if (navigator.share) {
                                    navigator.share({
                                      title: `Video von ${video.user_id}`,
                                      url: video.video_url
                                    }).catch(console.error);
                                  } else {
                                    // Fallback to copying link
                                    navigator.clipboard.writeText(video.video_url);
                                    // You might want to add a toast notification here
                                  }
                                }}
                                className="cursor-pointer"
                              >
                                <Share2 className="mr-2 h-4 w-4" />
                                <span>Teilen</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-sm text-gray-400">Video nicht verfügbar</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-12">
                Keine Videos gefunden
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 