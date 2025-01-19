"use client";

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Link as LinkIcon, Sparkles } from 'lucide-react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useState } from 'react'
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Marquee from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import TypingAnimation from "@/components/ui/typing-animation";

const reviews = [
  {
    name: "Lorenz Kopp",
    username: "Recruiting Werbeanzeigen mit KI",
    body: "⭐️⭐️⭐️⭐️⭐️\nPerfekt für unsere Ad-Kampagnen! Die Videos sehen super professionell aus. 🚀",
    img: "https://api.altan.ai/platform/media/ac5d5d98-2159-453b-8312-4b951d572ffc?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
  },
  {
    name: "Sarah Weber",
    username: "Social Media Managerin",
    body: "⭐️⭐️⭐️⭐️⭐️\nEin absoluter Game-Changer! Die KI-Avatare sind verblüffend natürlich.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=faces",
  },
  {
    name: "Jeremy Okoth",
    username: "Influencer & Startup Gründer",
    body: "⭐️⭐️⭐️⭐️⭐️\nEndlich mehrsprachige Videos ohne Aufwand! Top Service.",
    img: "https://api.altan.ai/platform/media/517d3fec-8ec9-4fa3-b5bf-ca2d9591aefd?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
  },
  {
    name: "Lisa Wagner",
    username: "Content Creator",
    body: "⭐️⭐️⭐️⭐️⭐️\nMeine Follower sind begeistert von der Qualität! 🎬",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=faces",
  },
  {
    name: "Andreas Klein",
    username: "E-Commerce Berater",
    body: "⭐️⭐️⭐️⭐️⭐️\nIdeal für Produktvideos. Genau was wir gesucht haben! 📱",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=faces",
  },
  {
    name: "Hannes Kessel",
    username: "Influencer & Marketing Agentur",
    body: "⭐️⭐️⭐️⭐️⭐️\nUnsere Conversion-Rates sind deutlich gestiegen. Klare Empfehlung.",
    img: "https://api.altan.ai/platform/media/d1abb7f2-28aa-4d80-81c1-cc87e551bf8f?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure className={cn(
      "relative w-[240px] mx-2 cursor-pointer overflow-hidden rounded-xl border p-3",
      "border-gray-200 bg-white hover:bg-gray-50 transition-all duration-300",
      "transform hover:-translate-y-1 hover:shadow-md"
    )}>
      <div className="flex flex-row items-center gap-2">
        <img 
          className="w-8 h-8 rounded-full object-cover" 
          width="32" 
          height="32" 
          alt="" 
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-xs font-semibold text-gray-900">
            {name}
          </figcaption>
          <p className="text-[10px] text-gray-600">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-xs leading-relaxed text-gray-600">{body}</blockquote>
    </figure>
  );
};

export default function Home() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const [playingVideos, setPlayingVideos] = useState<{[key: string]: boolean}>({
    video1: false,
    video2: false,
    video3: false,
  });

  return (
    <div className="min-h-screen bg-white max-w-7xl mx-auto px-4 scroll-smooth">
      {/* Header */}
      <div className="border-b border-gray-200 w-screen -mx-[calc((100vw-100%)/2)] px-[calc((100vw-100%)/2)]">
        <header className="max-w-5xl mx-auto flex items-center justify-between py-4">
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
            
          <nav className="flex space-x-8">
            <Link 
              href="#examples" 
              className="text-gray-600 hover:text-gray-900 scroll-smooth"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('examples')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Produkt
            </Link>
            <Link 
              href="#pricing" 
              className="text-gray-600 hover:text-gray-900 scroll-smooth"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Pricing
            </Link>
          </nav>
        </header>
      </div>

      {/* Hero Section */}
      <section className="text-center pt-20 pb-12 max-w-4xl mx-auto">
        {/* Trusted by Module */}
        <div className="flex items-center justify-center gap-2 mb-8 bg-gray-50 w-fit mx-auto px-4 py-2 rounded-full border border-black/10">
          <div className="flex -space-x-1.5">
            <img 
              className="w-5 h-5 rounded-full border border-white"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=faces" 
              alt="avatar" 
            />
            <img 
              className="w-5 h-5 rounded-full border border-white"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=faces" 
              alt="avatar" 
            />
            <img 
              className="w-5 h-5 rounded-full border border-white"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=faces" 
              alt="avatar" 
            />
            <img 
              className="w-5 h-5 rounded-full border border-white"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=faces" 
              alt="avatar" 
            />
          </div>
          <span className="text-xs text-gray-600">
            Bereits über <span className="font-medium text-gray-900">200+</span> Nutzer
          </span>
        </div>

        <h1 className="text-7xl font-semibold text-gray-900 mb-10 tracking-tighter flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-4">
            Verwandle{' '}
            <TypingAnimation 
              className="text-7xl font-semibold text-purple-300 w-[160px]"
              duration={100}
              pauseDuration={1500}
              deleteMode={true}
            >
              Text
            </TypingAnimation>
            {' '}in
          </div>
          <div className="flex items-center gap-4">
            <span className="text-green-300">UGC</span>
            {/* Stacked Videos Container */}
            <div className="relative w-[50px] h-[89px] mx-6 self-center">
              {/* Background Videos */}
              <div className="absolute top-2 -left-2 w-[50px] h-[89px] rounded-lg overflow-hidden opacity-40">
                <video
                  className="w-full h-full object-cover"
                  src="https://api.altan.ai/platform/media/eaf1fc38-c7e1-4da8-b8eb-3a16a584ecf6?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
              <div className="absolute top-4 -left-4 w-[50px] h-[89px] rounded-lg overflow-hidden opacity-20">
                <video
                  className="w-full h-full object-cover"
                  src="https://api.altan.ai/platform/media/eaf1fc38-c7e1-4da8-b8eb-3a16a584ecf6?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
              {/* Main Video */}
              <div className="relative w-[50px] h-[89px] rounded-lg overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  src="https://api.altan.ai/platform/media/eaf1fc38-c7e1-4da8-b8eb-3a16a584ecf6?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            </div>
            <span className="text-black">Videos</span>
          </div>
        </h1>
        
        <p className="text-md text-gray-800 mb-12">
          Deutschlands realistischste KI-Avatar-Videos. So schnell und einfach war Content-Erstellung noch nie!
        </p>
        <div className="flex justify-center gap-4 mb-4">
          <Link href="/dashboard">
            <Button 
              className="rounded-md text-md py-6 px-8 flex items-center gap-2"
              size="lg"
            >
              <Sparkles className="h-5 w-5" />
              Jetzt Starten
            </Button>
          </Link>
          <Button 
            variant="outline"
            className="rounded-md text-md py-6 px-6"
            size="lg"
            onClick={() => setIsVideoOpen(true)}
          >
            Demo anschauen (20Sek)
          </Button>
        </div>
        <p className="text-xs text-gray-400">
        Starte deinen Test – keine versteckten Kosten.

        </p>
        
      </section>
      

      {/* Avatar Examples */}
      <div id="examples" className="relative pb-4">
        <div className="grid grid-cols-5 gap-2 max-w-4xl mx-auto">
          {[
            {
              id: 'hero1',
              src: "https://api.altan.ai/platform/media/eaf1fc38-c7e1-4da8-b8eb-3a16a584ecf6?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
            },
            {
              id: 'hero2',
              src: "https://api.altan.ai/platform/media/17af25f8-5f4c-4ceb-9262-38444b2f9906?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
            },
            {
              id: 'hero3',
              src: "https://api.altan.ai/platform/media/3aa1c4a1-5875-4bb0-84b0-8dec1794fc5c?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
            },
            {
              id: 'hero4',
              src: "https://storage.googleapis.com/nca-toolkit-bucket-julius/8911b01e-8b86-422a-8dd1-083ba5a92829_output_0.mp4",
            },
            {
              id: 'hero5',
              src: "https://api.altan.ai/platform/media/f70e52f2-e59a-4e26-9cb7-0e3712308e33?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
            }
          ].map((video) => (
            <div key={video.id} className="relative aspect-[9/16] group">
              <video 
                className="w-full h-full object-cover rounded-lg"
                src={video.src}
                playsInline
                preload="metadata"
                controls={playingVideos[video.id]}
                onPlay={() => setPlayingVideos(prev => ({ ...prev, [video.id]: true }))}
                onPause={() => setPlayingVideos(prev => ({ ...prev, [video.id]: false }))}
                onEnded={() => setPlayingVideos(prev => ({ ...prev, [video.id]: false }))}
              >
                <source src={video.src} type="video/mp4" />
              </video>
              {!playingVideos[video.id] && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors cursor-pointer" 
                  onClick={(e) => {
                    const video = e.currentTarget.previousElementSibling as HTMLVideoElement;
                    if (video.paused) {
                      video.play();
                    } else {
                      video.pause();
                    }
                  }}
                >
                  <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M5 3l14 9-14 9V3z" fill="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <section className="py-8 overflow-hidden">
        <div className="relative flex h-[500px] w-full max-w-5xl mx-auto flex-col items-center justify-center overflow-hidden">
          <Marquee className="[--duration:20s]" pauseOnHover>
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee className="[--duration:20s]" pauseOnHover reverse>
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white"></div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-4 max-w-6xl mx-auto text-center">
        <div className="text-purple-600 mb-2">Pricing</div>
        <h2 className="text-4xl font-bold mb-4">Wähle deinen Plan</h2>
        <p className="text-gray-600 mb-8">
          Einfacher & schneller Zahlungs Prozess. Keine versteckten Kosten.
        </p>
        
        {/* Toggle Switch */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className={`${isYearly ? 'text-gray-600' : 'text-gray-900'}`}>Monatlich</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={isYearly}
              onChange={(e) => setIsYearly(e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-purple-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all cursor-pointer"></div>
          </label>
          <span className={`${isYearly ? 'text-gray-900' : 'text-gray-600'}`}>
            Jährlich <span className="text-purple-600">(2 Monate gespart)</span>
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div className="rounded-lg border bg-white p-6 relative">
            {/* Sale Badge */}
            {!isYearly && (
              <div className="absolute -top-3 right-4 bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                34% Rabatt
              </div>
            )}
            <h3 className="font-semibold text-lg mb-1">Starter</h3>
            <p className="text-gray-600 text-sm mb-3">Perfekt zum Starten</p>
            <div className="mb-1">
              <span className="text-4xl font-bold">€{isYearly ? '15,17' : '19'}</span>
              <span className="text-gray-600 text-sm">/monat</span>
            </div>
            {!isYearly && (
              <div className="mb-4 text-sm">
                <span className="line-through text-gray-400 mr-2">€29/mo</span>
                <span className="text-green-600 font-medium">LinkedIn Sale!</span>
              </div>
            )}
            {isYearly && (
              <div className="mb-4 text-xs text-gray-600">
                <div>€182/Jahr (20% gespart)</div>
              </div>
            )}
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                70 Video Sekunden (ca. 5 Videos)
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Basis Avatare
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                HD Videos
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Verfügbar in 47 Sprachen
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Sound Effects
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Exportieren ohne Wasserzeichen
              </li>
              
            </ul>
            <Link href="https://ugcs.io/pricing">
              <Button variant="outline" className="w-full">
                Jetzt Starten
              </Button>
            </Link>
          </div>

          {/* Creator Plan */}
          <div className="rounded-lg border-2 border-purple-600 bg-white p-6 relative">
            <div className="absolute -top-3 right-4 bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
              Beliebt
            </div>
            <h3 className="font-semibold text-lg mb-1">Creator</h3>
            <p className="text-gray-600 text-sm mb-3">Für Content Creator</p>
            <div className="mb-4">
              <span className="text-4xl font-bold">€{isYearly ? '39,17' : '49'}</span>
              <span className="text-gray-600 text-sm">/monat</span>
            </div>
            {isYearly && (
              <div className="mb-4 text-xs text-gray-600">
                <div>€470/Jahr (20% gespart)</div>
              </div>
            )}
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                200 Video Sekunden (ca. 12 Videos)
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Alle Avatare (soon)
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                HD Videos
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Verfügbar in 47 Sprachen
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Sound Effects
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Exportieren ohne Wasserzeichen
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                AI Skript Generation (soon)
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Untertitel (soon)
              </li>
            </ul>
            <Link href="https://ugcs.io/pricing">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Jetzt Starten
              </Button>
            </Link>
          </div>

          {/* Agentur Plan */}
          <div className="rounded-lg border bg-white p-6">
            <h3 className="font-semibold text-lg mb-1">Agentur</h3>
            <p className="text-gray-600 text-sm mb-3">Für Agenturen & Teams</p>
            <div className="mb-4">
              <span className="text-4xl font-bold">€{isYearly ? '87,17' : '109'}</span>
              <span className="text-gray-600 text-sm">/monat</span>
            </div>
            {isYearly && (
              <div className="mb-4 text-xs text-gray-600">
                <div>€1046/Jahr (20% gespart)</div>
              </div>
            )}
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                600 Video Sekunden (ca. 25 Videos)
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Alle Avatare (soon)
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                HD Videos
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Verfügbar in 47 Sprachen
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Sound Effects
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Exportieren ohne Wasserzeichen
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                AI Script Generation (soon)
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Untertitel (soon)
              </li>
            </ul>
            <Link href="https://ugcs.io/pricing">
              <Button variant="outline" className="w-full">
                Jetzt Starten
              </Button>
            </Link>
          </div>
        </div>

        {/* Enterprise Plan */}
        <div className="mt-12">
          <div className="rounded-lg border bg-gradient-to-r from-purple-50 via-white to-purple-50 p-6 max-w-none">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  Enterprise
                  <span className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full">
                    Custom
                  </span>
                </h3>
                <p className="text-gray-600 text-sm mb-4">Brauchst du mehr als 25 Videos pro Monat?</p>
                <ul className="space-y-2 mb-0 text-sm">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Eigene Menge an Video Sekunden</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Alle Premium Features und Extra Support</span>
                  </li>
                 
                </ul>
              </div>
              <div className="flex-shrink-0">
                <a 
                  href="https://calendly.com/ai-ugcs/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="whitespace-nowrap px-8">
                    Book A Call
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Licensed Creators Section */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <img
              src="https://api.altan.ai/platform/media/290d714a-01d3-4439-ae50-764db12b61fe?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d"
              alt="Licensed Creators"
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
          <div className="flex-1 max-w-xl">
            <h2 className="text-4xl font-bold mb-6">
              15+ lizenzierte Creator
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Erstelle Videos mit unseren Top-Tier Creators ohne dir Gedanken über Rechte machen zu müssen. Du besitzt den Content - keine zusätzlichen Gebühren, kein Stress, volle Eigentumsrechte garantiert.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-16 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-purple-600 mb-2">FAQ</div>
          <h2 className="text-4xl font-bold mb-4">Häufige Fragen</h2>
          <p className="text-gray-600">
            Alles was du über unseren Service wissen musst
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="border rounded-lg px-4">
            <AccordionTrigger className="text-left hover:no-underline">
              Wie realistisch sind die KI-Videos wirklich?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Unsere KI-Videos gehören zu den fortschrittlichsten auf dem Markt. Die Avatare bewegen sich natürlich, 
              haben realistische Gesichtsausdrücke und die Lippenbewegungen sind perfekt mit der Sprache synchronisiert. 
              Überzeuge dich selbst anhand der ganzen Beispiel Videos!
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border rounded-lg px-4">
            <AccordionTrigger className="text-left hover:no-underline">
              Wie lange dauert die Erstellung eines Videos?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Die Generierung eines Videos dauert nur wenige Minuten. Du gibst deinen Text ein, 
              wählst einen Avatar und eine Stimme aus - wir kümmern uns um den Rest. Ein 30-Sekunden-Video 
              ist normalerweise in unter 3 Minuten fertig.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border rounded-lg px-4">
            <AccordionTrigger className="text-left hover:no-underline">
              Wer behält die Rechte an den erstellten Videos?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Du erhältst die vollen Nutzungsrechte an allen Videos, die du mit unserem Service erstellst. 
              Du kannst sie für Marketing, Social Media, Schulungen oder andere Zwecke unbegrenzt verwenden.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border rounded-lg px-4">
            <AccordionTrigger className="text-left hover:no-underline">
              Was passiert, wenn meine Credits aufgebraucht sind?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Dein Account bleibt aktiv, aber du kannst keine neuen Videos erstellen, bis Credits nachgekauft werden.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border rounded-lg px-4">
            <AccordionTrigger className="text-left hover:no-underline">
              Was passiert mit ungenutzten Credits?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Deine Credits verfallen nicht und bleiben dir erhalten. Bei monatlichen Abos werden 
              die neuen Credits zu deinem bestehenden Guthaben addiert. Du kannst sie flexibel 
              einsetzen, wann immer du sie brauchst.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t">
        <div className="max-w-4xl mx-auto grid grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/favicon.ico"
                alt="Ugcs.io Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-semibold">Ugcs.io</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/#examples">Demo</Link></li>
              <li><Link href="/#pricing">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Unternehmen</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/about">Über uns</Link></li>
              <li><Link href="/contact">Kontakt</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/privacy">Datenschutzerklärung</Link></li>
              <li><Link href="/terms">Nutzungsbedingungen</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-12 text-center text-sm text-gray-600">
          @ 2025 Forever.
        </div>
      </footer>

      {/* Update Demo Video Dialog */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black overflow-hidden">
          <video
            className="w-full aspect-[4/3]"
            src="https://api.altan.ai/platform/media/73adf8a2-9382-4171-be25-18b306146388?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d"
            controls
            autoPlay
            playsInline
          >
            <source 
              src="https://api.altan.ai/platform/media/73adf8a2-9382-4171-be25-18b306146388?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d" 
              type="video/mp4" 
            />
          </video>
        </DialogContent>
      </Dialog>
    </div>
  );
}
