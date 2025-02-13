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
import { useAuth } from "@clerk/nextjs";
import Script from 'next/script';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userId } = useAuth();

  // Define MobileMenu here to access the state
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
            href="/home"
            className="block py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            Einloggen
          </Link>
              <Link 
                href="/home"
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

  return (
    
      
      <div className="min-h-screen max-w-7xl mx-auto px-4 scroll-smooth">
      
      
      {/* Header - Make sticky */}
      <div className="border-b border-gray-200 w-screen -mx-[calc((100vw-100%)/2)] px-[calc((100vw-100%)/2)] sticky top-0 bg-white/60 backdrop-blur-sm z-50">
        <header className="max-w-5xl mx-auto flex items-center justify-between py-2 md:py-4">
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
            
          {/* Hide nav items on mobile, show menu button instead */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="#examples" 
              className="text-sm text-gray-600 hover:text-gray-900 scroll-smooth"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('examples')?.scrollIntoView({ behavior: 'smooth' });
              }}
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
              href="#pricing" 
              className="text-sm text-gray-600 hover:text-gray-900 scroll-smooth"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
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

      {/* Hero Section - Adjust text sizes */}
      <section className="text-center pt-12 md:pt-20 pb-8 md:pb-12 max-w-4xl mx-auto px-4">
        {/* Replace Trusted by Module with new text */}
        <div className="flex items-center justify-center gap-2 mb-8 bg-gradient-to-r from-purple-50 via-white to-purple-50 w-fit mx-auto px-4 py-2 rounded-full border border-black/10">
          <span className="text-xs">
            <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">#1</span>
            <span className="text-gray-600"> realistischste </span>
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">KI Avatare</span>
            <span className="text-gray-600"> in Deutschland</span>
          </span>
        </div>

        {/* Adjust hero text sizes */}
        <h1 className="text-5xl md:text-7xl font-semibold text-gray-900 mb-6 md:mb-10 tracking-tighter flex flex-col items-center justify-center gap-1 md:gap-2">
          {/* Mobile Layout */}
          <div className="flex md:hidden flex-col items-center gap-2">
            <span>Verwandle</span>
            <div className="flex items-center gap-2">
              <TypingAnimation 
                className="text-4xl font-semibold text-green-800 w-[140px]"
                duration={100}
                pauseDuration={1500}
                deleteMode={true}
              >
                Text
              </TypingAnimation>
              <span>in</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-600">UGC</span>
              <span className="text-black">Videos</span>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex flex-col items-center gap-4">
            <div className="flex items-center gap-4 flex-wrap justify-center">
              Verwandle{' '}
              <TypingAnimation 
                className="text-7xl font-semibold text-purple-400 w-[160px]"
                duration={100}
                pauseDuration={1500}
                deleteMode={true}
              >
                Text
              </TypingAnimation>
              {' '}in
            </div>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <span className="text-green-400">UGC</span>
              {/* Stacked Videos Container - Only shown on desktop */}
              <div className="relative w-[50px] h-[89px] mx-6 self-center ml-[38px]">
                {/* Background Shadows - Replace videos with div containers */}
                <div className="absolute top-4 -left-4 w-[50px] h-[89px] rounded-lg bg-gray-200">
                  {/* Empty div for second shadow */}
                </div>
                <div className="absolute top-2 -left-2 w-[50px] h-[89px] rounded-lg bg-gray-400">
                  {/* Empty div for first shadow */}
                </div>
                
                {/* Main Video */}
                <div className="relative w-[50px] h-[89px] rounded-lg overflow-hidden">
                  <Image
                    className="w-full h-full object-cover"
                    src="https://api.altan.ai/platform/media/b61c5c1e-c4ff-4c5d-be18-7de70a2e6307?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d"
                    alt="Video"
                    width={50}
                    height={89}
                  
                    
                  />
                </div>
              </div>
              <span className="text-black">Videos</span>
            </div>
          </div>
        </h1>
        
        <p className="text-sm md:text-md text-gray-600 mb-8 max-w-2xl mx-auto">
          Deutschlands realistischste KI-Avatar-Videos für dein Marketing. Mit unserer KI erstellst du 
          <br />
          professionelle Videos in wenigen Minuten - ohne Equipment, ohne Vorkenntnisse.
        </p>

        <div className="flex justify-center mb-8">
          <Link href={userId ? "/home" : "/home"} className="w-full max-w-xs">
            <Button 
              className="rounded-md text-base md:text-lg py-4 md:py-6 px-8 md:px-10 flex items-center gap-2 w-full bg-black hover:bg-gray-800 transition-all duration-300"
              size="lg"
            >
              <span>Jetzt Video erstellen</span>
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1"
              >
                <path 
                  d="M5 12H19M19 12L12 5M19 12L12 19" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-4">
          <div className="flex items-center gap-2">
            <img
              src="https://api.altan.ai/platform/media/0b054861-11ce-4c5c-98db-c9f80a353d72?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d"
              alt="Google Reviews"
              className="w-6 h-6 object-contain"
            />
            <span className="font-medium text-sm">Google Reviews</span>
            <span className="font-semibold text-sm">4.8</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
        </div>
          </div>

          <div className="flex items-center gap-2">
            <img
              src="https://api.altan.ai/platform/media/da51f8c1-cc31-44c7-a452-169c7e7fd1c8?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d"
              alt="Trustpilot"
              className="w-6 h-6 object-contain"
            />
            <span className="font-medium text-sm">Trustpilot</span>
            <span className="font-semibold text-sm">4.7</span>
            <div className="flex">
              {[1, 2, 3, 4].map((star) => (
                <svg
                  key={star}
                  className="w-4 h-4 text-[#00B67A]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <svg
                className="w-4 h-4 text-[#00B67A]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" 
                  opacity="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
      
      

      {/* Video example Section */}
      <section className="py-2 md:py-4 overflow-hidden">
        <div className="relative w-full">
          <Marquee className="[--duration:30s]" pauseOnHover>
            {[
              "https://api.altan.ai/platform/media/b61c5c1e-c4ff-4c5d-be18-7de70a2e6307?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/572ac408-1f34-4dda-a0ae-24a7591e1d3b?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/d9ec32f7-893b-48a0-8ab9-cb557019ac0b?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/67ba118f-7010-4a59-9be6-b9ce2720baf5?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/a38661be-2aad-46bb-9311-08cbcef91b1c?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/ce894453-190d-4c67-b42a-ec2b22b0a546?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/c14bfaa0-b542-40c2-9b3e-7cbb29041740?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",

            ].map((gifUrl, index) => (
              <div key={index} className="mx-1">
                <div className="relative w-[135px] h-[240px] rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={gifUrl}
                    alt={`Example ${index + 1}`}
                    width={135}
                    height={240}
                    className="w-full h-full object-cover"
                    unoptimized // This is important for GIFs to animate
                  />
                </div>
              </div>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white"></div>
        </div>
      </section>
      
      
      
      {/* Featured Video Section */}
      <section className="py-12 md:py-20 max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Deutschlands realistischste KI-Avatar-Videos
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            In weniger als 2 Minuten erstellst du professionelle Videos mit KI-Avataren und sparst Dir so nicht nur Zeit, sondern auch Geld.
          </p>
        </div>
        
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white">
          <div className="aspect-video w-full">
            <iframe
              src="https://www.loom.com/embed/12a8c3b00a1e4f74bcfe7fa0f38dc193?sid=aae79dac-7bc4-47d0-90f3-f30a90d882e7"
              frameBorder="0"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="absolute inset-0 pointer-events-none rounded-2xl border border-gray-200"></div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/pricing">
            <Button 
              className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-lg rounded-xl flex items-center gap-2"
            >
              Jetzt selbst ausprobieren
              <svg 
                className="w-5 h-5" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
              >
                <path 
                  d="M5 12h14M12 5l7 7-7 7" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </section>




      {/* Testimonial Section with moving cards */}
      <section className="py-4 md:py-8 overflow-hidden">
        <div className="relative w-full">
          <Marquee className="[--duration:40s]">
            {[
              {
                name: "Hannes Kessel",
                role: "Influencer, Marketing Agentur",
                image: "https://api.altan.ai/platform/media/9e563482-68af-4a46-9e76-42af24259c14?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
                quote: "Die KI-Videos haben unsere Social Media Strategie komplett verändert. Sehr beeindruckend.",
                rating: 5,
                video: "https://api.altan.ai/platform/media/b61c5c1e-c4ff-4c5d-be18-7de70a2e6307?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
                layout: "video-right",
                date: "vor 2 Tagen"
              },
              
              {
                name: "Lorenz Kopp",
                role: "Gründer NextStepHR",
                image: "https://api.altan.ai/platform/media/a6fef1a0-3116-4904-96d0-0c8c6faeb055?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
                quote: "Perfekt für Ad Creatives auch im Recruiting Bereich. Deutlich günstiger als andere Tools und Freelancer.",
                rating: 5,
                layout: "quote-only",
                date: "vor 1 Woche"
              },
              {
                name: "Jeremy Okoth",
                role: "Influencer & Startup Gründer",
                image: "https://api.altan.ai/platform/media/de57a97a-5781-4e16-8264-ef14672fb54d?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
                quote: "Bin sehr zufrieden mit dem Ergebnis. Ideal für unsere Ad Kampagnen.",
                rating: 4,
                video: "https://api.altan.ai/platform/media/ce894453-190d-4c67-b42a-ec2b22b0a546?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
                layout: "video-bottom",
                date: "vor 3 Tagen"
              },
              {
                name: "Marwin Anderer",
                role: "Ecom Brand Owner",
                image: "https://api.altan.ai/platform/media/604b1b48-a637-49b9-999a-4f640ebc3418?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
                quote: "Ad Creatives für unsere Produkte sind jetzt in 10 Minuten fertig. hat uns sehr viel Zeit und Geld gespart!",
                rating: 5,
                video: "https://api.altan.ai/platform/media/67ba118f-7010-4a59-9be6-b9ce2720baf5?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
                layout: "video-right",
                date: "vor 2 Tagen"
              },
              {
                name: "Svenja-Fröhlich",
                role: "Leiterin Physiotherapien",
                image: "https://api.altan.ai/platform/media/dc4033aa-c756-4125-8f24-18079079a766?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
                quote: "Hat unser Content Game auf TikTok und Instagram komplett verändert! Ich wusste nicht wie wir Content auf Scale erstellen können, Ugcs hat uns gerettet.",
                rating: 4,
      
                layout: "video-bottom",
                date: "vor 1 Tag"
              },
              // Add more testimonials...
            ].map((testimonial, index) => (
              <div key={index} className="mx-2">
                <div className={`bg-white rounded-xl p-4 shadow-sm ${
                  testimonial.layout === 'quote-only' ? 'w-[280px]' : 'w-[320px]'
                }`}>
                  <div className="flex items-start gap-3 mb-2">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h3>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <img 
                      src="/trustpilot.svg" 
                      alt="Trustpilot" 
                      className="h-4"
                    />
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3.5 h-3.5 ${i < testimonial.rating ? 'text-[#00b67a]' : 'text-gray-200'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-xs text-gray-500 ml-1">{testimonial.date}</span>
                    </div>
                  </div>

                  {testimonial.layout === 'video-right' ? (
                    <div className="flex gap-3">
                      <blockquote className="text-gray-700 text-xs flex-1">
                        "{testimonial.quote}"
                      </blockquote>
                      {testimonial.video && (
                        <div className="w-24 aspect-[9/16] rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={testimonial.video}
                            className="w-full h-full object-cover"
                            alt={`${testimonial.name} video`}
                            width={96}
                            height={171}
                            unoptimized
                          />
                          
                        </div>
                      )}
                    </div>
                  ) : testimonial.layout === 'video-bottom' ? (
                    <>
                      <blockquote className="text-gray-700 text-xs mb-3">
                        "{testimonial.quote}"
                      </blockquote>
                      {testimonial.video && (
                        <div className="aspect-[16/9] w-full rounded-lg overflow-hidden">
                          <Image
                            src={testimonial.video}
                            className="w-full h-full object-cover"
                            alt={`${testimonial.name} video`}
                            width={320}
                            height={180}
                            unoptimized
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <blockquote className="text-gray-700 text-xs">
                      "{testimonial.quote}"
                    </blockquote>
                  )}
                </div>
              </div>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white"></div>
        </div>
      </section>

      {/* Pricing Section - Stack cards on mobile */}
      <section id="pricing" className="px-4 max-w-6xl mx-auto text-center">
        <div className="text-sm md:text-base text-purple-600 mb-2">Preise</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Wähle deinen Plan</h2>
        <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">
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
                120 Video Sekunden (ca. 8 Videos)
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
            <Link href="/pricing">
              <Button variant="outline" className="w-full">
                Mehr erfahren
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
                300 Video Sekunden (ca. 15 Videos)
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
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                AI Script Generation
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Untertitel
              </li>
            </ul>
            <Link href="/pricing">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Mehr erfahren
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
                800 Video Sekunden (ca. 35 Videos)
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="bg-amber-100 text-amber-700 text-xs px-3 py-1.5 rounded-full flex items-center gap-2 font-medium">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M12 1l3.22 6.527 7.198.617-5.385 4.928 1.474 7.133L12 16.886l-6.507 3.319 1.474-7.133-5.385-4.928 7.198-.617L12 1z"/>
                  </svg>
                </span>
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
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                AI Script Generation
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Untertitel
              </li>
            </ul>
            <Link href="/pricing">
              <Button variant="outline" className="w-full">
                Mehr erfahren
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
                    Details besprechen
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>





      {/* Community Videos Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop" alt="" />
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop" alt="" />
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop" alt="" />
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
                  <span className="text-xs text-gray-600">+42</span>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-medium">
                  Sieh was andere generieren
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Entdecke wie andere Nutzer KI-Videos für ihr Marketing erstellen
                </p>
              </div>
            </div>
            <Link href="/beispiele">
              <Button variant="outline" size="sm">
                Jetzt alle ansehen
              </Button>
            </Link>
          </div>

          {/* First row of videos */}
          <div className="grid grid-cols-4 md:grid-cols-5 gap-3 mb-3">
            {[
              {
                thumbnail: "https://api.altan.ai/platform/media/48e8ac65-73e3-482e-a480-c70b377cef2e?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
                username: "@sarah.marketing",
                date: "vor 2 Std",
                script: "Produktvorstellung"
              },
              {
                thumbnail: "https://api.altan.ai/platform/media/d13bbbd2-8482-42f6-b495-ee63f00c1ff2?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
                username: "@max_mueller",
                date: "vor 3 Std",
                script: "Erklärungsvideo"
              },
              {
                thumbnail: "https://api.altan.ai/platform/media/fb63ffb3-b63c-4f2e-8065-29b8ac017446?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
                username: "@lisa.content",
                date: "vor 3 Std",
                script: "Social Media"
              },
              {
                thumbnail: "https://api.altan.ai/platform/media/79497d6b-bc52-4fc3-99df-9f38a2cc84a2?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
                username: "@tom.digital",
                date: "vor 4 Std",
                script: "Produktdemo"
              },
              {
                thumbnail: "https://api.altan.ai/platform/media/0f079522-0501-44ff-81b4-f945ce53033c?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
                username: "@anna.design",
                date: "vor 5 Std",
                script: "Tutorial"
              }
            ].map((video, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>{video.username}</span>
                  <span>{video.date}</span>
                </div>
                <Link href="/beispiele">
                  <div className="aspect-[9/16] rounded-xl overflow-hidden shadow-sm relative group">
                    <img
                      src={video.thumbnail}
                      alt={`Video von ${video.username}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                        <svg 
                          className="w-4 h-4" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor"
                        >
                          <path 
                            d="M5 3l14 9-14 9V3z" 
                            fill="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-1 rounded-full">
                      {video.script}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Second row with blur effect */}
          <div className="relative">
            <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
              {[
                {
                  thumbnail: "https://api.altan.ai/platform/media/0f079522-0501-44ff-81b4-f945ce53033c?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
                  username: "@david.coach",
                  date: "vor 6 Std",
                  script: "Coaching"
                },
                {
                  thumbnail: "https://api.altan.ai/platform/media/62d873c7-999b-4f3e-82f9-107407224f8a?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
                  username: "@marie.social",
                  date: "vor 7 Std",
                  script: "Marketing"
                },
                {
                  thumbnail: "https://api.altan.ai/platform/media/48e8ac65-73e3-482e-a480-c70b377cef2e?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
                  username: "@peter.tech",
                  date: "vor 8 Std",
                  script: "Tutorial"
                },
                {
                  thumbnail: "https://api.altan.ai/platform/media/d13bbbd2-8482-42f6-b495-ee63f00c1ff2?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
                  username: "@julia.design",
                  date: "vor 9 Std",
                  script: "Produktdemo"
                },
                {
                  thumbnail: "https://api.altan.ai/platform/media/fb63ffb3-b63c-4f2e-8065-29b8ac017446?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
                  username: "@max.content",
                  date: "vor 10 Std",
                  script: "Social Media"
                }
              ].map((video, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>{video.username}</span>
                    <span>{video.date}</span>
      </div>
                  <Link href="/beispiele">
                    <div className="aspect-[9/16] rounded-xl overflow-hidden shadow-sm relative group">
                      <img
                        src={video.thumbnail}
                        alt={`Video von ${video.username}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                          <svg 
                            className="w-4 h-4" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor"
                          >
                            <path 
                              d="M5 3l14 9-14 9V3z" 
                              fill="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            />
                    </svg>
                  </div>
                </div>
                      <div className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-1 rounded-full">
                        {video.script}
                      </div>
                    </div>
                  </Link>
            </div>
          ))}
        </div>
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
              <Link href="/beispiele">
                <Button variant="outline" size="lg">
                  Mehr Videos ansehen
                </Button>
              </Link>
      </div>
          </div>
        </div>
      </section>

      


      
      {/* Licensed Creators Section - Stack on mobile */}
      <section className="py-8 md:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1">
            <img
              src="https://api.altan.ai/platform/media/290d714a-01d3-4439-ae50-764db12b61fe?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d"
              alt="Licensed Creators"
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
          <div className="flex-1 maxw-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
              Wöchentlich neue Creator
            </h2>
            <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
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

      {/* Footer - Adjust grid for mobile */}
      <footer className="px-6 py-12 border-t">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
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
              <li><Link href="/#pricing">Preise</Link></li>
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
              <li><Link href="/impressum">Impressum</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-12 text-center text-sm text-gray-600">
          @ 2025 Forever.
        </div>
      </footer>

      {/* Update Demo Video Dialog - Make responsive */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-[95vw] md:max-w-4xl p-0 bg-black overflow-hidden">
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
