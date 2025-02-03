"use client";

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { useAuth } from "@clerk/nextjs";
import { Sparkles, Check } from "lucide-react";
import Image from "next/image";
import { fetchCommunityVideos } from '@/lib/api';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Download, Share2, Twitter, Facebook, Instagram, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface Video {
  video_url: string;
  user_id: string;
  creation_time: string;
  category?: string;
  title?: string;
}

export default function BeispielePage() {
  const { userId } = useAuth();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [playingVideos, setPlayingVideos] = useState<{ [key: string]: boolean }>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

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
        setLoading(true);
        const fetchedVideos = await fetchCommunityVideos();
        console.log('Fetched videos in page:', fetchedVideos);
        if (Array.isArray(fetchedVideos) && fetchedVideos.length > 0) {
          setVideos(fetchedVideos);
        } else {
          console.warn('No videos returned from API');
          setVideos([]);
        }
      } catch (error) {
        console.error('Error loading videos:', error);
        setVideos([]);
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
    : videos.filter(video => video.category === selectedCategory);

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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center mb-16 space-y-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border">
              <div className="flex -space-x-2">
                <img 
                  className="w-6 h-6 rounded-full ring-2 ring-white" 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop" 
                  alt="" 
                />
                <img 
                  className="w-6 h-6 rounded-full ring-2 ring-white" 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop" 
                  alt="" 
                />
              </div>
              <span className="text-sm text-gray-600">+859 aktive Nutzer</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Community Videos</h1>
            <p className="text-gray-600 text-center max-w-2xl">
              Entdecke wie andere Nutzer KI-Videos für ihr Marketing erstellen und lass dich inspirieren
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm mb-12 border">
            <h2 className="text-lg font-medium mb-4 text-gray-900">Filter nach Kategorie</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "rounded-full",
                    selectedCategory === category.id && "bg-gray-900 hover:bg-gray-800"
                  )}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { label: "Videos erstellt", value: "4.000+" },
              { label: "Aktive Nutzer", value: "859" },
              { label: "Zufriedene Kunden", value: "92%" },
            ].map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border text-center">
                <div className="font-bold text-2xl text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video, index) => (
                <div key={index} className="group bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="p-2">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span className="font-medium">{video.user_id}</span>
                      <span>{video.creation_time}</span>
                    </div>
                    <div className="aspect-[9/16] rounded-lg overflow-hidden bg-gray-100">
                      {video.video_url ? (
                        <video
                          src={video.video_url}
                          className="w-full h-full object-cover"
                          playsInline
                          loop
                          controls
                          ref={(el) => {
                            if (el) {
                              el.addEventListener('play', () => {
                                setPlayingVideos(prev => ({ ...prev, [index]: true }));
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
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-sm text-gray-400">Video nicht verfügbar</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="px-2 py-2 border-t bg-gray-50/50">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-[#1DA1F2] hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10"
                        >
                          <Twitter className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-[#4267B2] hover:text-[#4267B2] hover:bg-[#4267B2]/10"
                        >
                          <Facebook className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-[#E4405F] hover:text-[#E4405F] hover:bg-[#E4405F]/10"
                        >
                          <Instagram className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-600 hover:text-gray-900"
                          onClick={() => window.open(video.video_url, '_blank')}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn(
                            "h-8 w-8 transition-all duration-200",
                            copiedStates[index] 
                              ? "text-green-600 bg-green-50" 
                              : "text-gray-600 hover:text-gray-900"
                          )}
                          onClick={() => {
                            navigator.clipboard.writeText(video.video_url);
                            setCopiedStates(prev => ({ ...prev, [index]: true }));
                            setTimeout(() => {
                              setCopiedStates(prev => ({ ...prev, [index]: false }));
                            }, 2000);
                          }}
                        >
                          {copiedStates[index] ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-500">Keine Videos gefunden</div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 