"use client";

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from "@clerk/nextjs"
import { Sparkles } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from 'react'

export default function EcomPage() {
  const { userId } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mobile Menu Component
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
                href="/sign-in"
                className="block py-2 text-sm text-gray-600 hover:text-gray-900"
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 w-screen -mx-[calc((100vw-100%)/2)] px-[calc((100vw-100%)/2)] sticky top-0 bg-white/60 backdrop-blur-sm z-50">
        <header className="max-w-5xl mx-auto flex items-center justify-between py-2 md:py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/favicon.ico"
              alt="Ugcs.io Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="font-semibold">Ugcs.io</span>
          </Link>
            
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/#examples" 
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Features
            </Link>
            <Link 
              href="/beispiele" 
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Beispiele
            </Link>
            <Link 
              href="/#pricing" 
              className="text-sm text-gray-600 hover:text-gray-900"
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
                    href="/sign-in"
                    className="text-sm text-gray-600 hover:text-gray-900"
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

          {/* Mobile Menu Button */}
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
        
        {/* Mobile Menu */}
        <MobileMenu />
      </div>

      {/* Blog Post Style Content */}
      <article className="max-w-4xl mx-auto px-4">
        {/* Hero Section with Enhanced Styling */}
        <div className="pt-20 pb-10">
          <div className="flex flex-col items-center text-center">
            {/* Reading Time & Date Badge */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <span>5 min read</span>
              <span>•</span>
              <span>Updated June 2024</span>
            </div>

            <Badge className="mb-6 bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors">
              E-Commerce Guide
            </Badge>

            <h1 className="text-6xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-black to-black/60 leading-[1.15] pb-1">
              <span className="bg-gradient-to-b from-black to-black/60 text-transparent bg-clip-text">20x mehr UGC-Content mit 90% weniger Kosten</span>
            </h1>
          
           

            
            {/* Enhanced Trust Badge */}
            <div className="flex items-center justify-center gap-3 mt-4 bg-gradient-to-r from-purple-50 to-gray-50 px-6 py-3 rounded-full border border-purple-100">
              <div className="flex -space-x-1.5">
                {[
                  "https://api.altan.ai/platform/media/9e563482-68af-4a46-9e76-42af24259c14?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
                  "https://api.altan.ai/platform/media/a6fef1a0-3116-4904-96d0-0c8c6faeb055?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
                  "https://api.altan.ai/platform/media/ac5d5d98-2159-453b-8312-4b951d572ffc?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
                  "https://api.altan.ai/platform/media/517d3fec-8ec9-4fa3-b5bf-ca2d9591aefd?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
                  "https://api.altan.ai/platform/media/d1abb7f2-28aa-4d80-81c1-cc87e551bf8f?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
                ].map((avatar, i) => (
                  <img
                    key={i}
                    src={avatar}
                    alt=""
                    className="w-6 h-6 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div className="h-6 w-px bg-gray-200"></div>
              <div className="flex items-center gap-2">
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
                <span className="text-sm text-gray-600 font-medium">4.9/5 von 200+ Kunden</span>
              </div>
            </div>

            
          </div>
        </div>

        {/* Table of Contents */}
        <div className="my-12 p-6 bg-gray-50 rounded-xl">
          <h2 className="font-semibold mb-4">Inhalt</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#problems" className="text-purple-600 hover:text-purple-800">
                1. Die 4 größten Probleme beim UGC-Marketing
              </a>
            </li>
            <li>
              <a href="#solutions" className="text-purple-600 hover:text-purple-800">
                2. Unsere Lösungen für dein Business
              </a>
            </li>
            {/* ... more TOC items ... */}
          </ul>
        </div>

        {/* Problem Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold mb-8">
            Die 4 größten Probleme beim UGC-Marketing
          </h2>
          
          <div className="grid gap-8">
            {[
              {
                title: "1. UGC ist teuer & schwer skalierbar",
                description: "Creator verlangen hohe Preise & müssen einzeln bezahlt werden. Jedes neue Creative kostet wieder Zeit & Geld.",
                solution: "Mit KI-generiertem UGC sparst du bis zu 90% der Kosten und kannst unbegrenzt skalieren.",
                icon: "💰"
              },
              {
                title: "2. Creator-Suche frisst Zeit & Nerven",
                description: "Ständige Verhandlungen, Briefings & Revisionsrunden sind ineffizient. Die Qualität schwankt stark.",
                solution: "Erstelle UGC per Knopfdruck – kein Briefing, keine Wartezeit, kein Risiko.",
                icon: "⏰"
              },
              {
                title: "3. Zu wenig Content für effektives Testing",
                description: "Top Ads benötigen wöchentlich neue Creatives. Echte UGC-Videos brauchen zu lange für schnelle Tests.",
                solution: "Generiere in Minuten neue Varianten für A/B-Tests und Performance-Optimierung.",
                icon: "🎯"
              },
              {
                title: "4. Keine Kontrolle über das Endergebnis",
                description: "Bei klassischem UGC hast du wenig Einfluss auf das finale Video. Änderungen sind teuer und zeitaufwändig.",
                solution: "Volle Kontrolle über jeden Aspekt deiner Videos - von der Stimme bis zur Gestik.",
                icon: "🎮"
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-green-800">
                        <span className="font-semibold">Unsere Lösung: </span>
                        {item.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Examples Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold mb-8">
            Verschiedene Video-Styles für maximale Performance
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <video 
                className="w-full aspect-[9/16] rounded-xl shadow-lg"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="https://api.altan.ai/platform/media/b61c5c1e-c4ff-4c5d-be18-7de70a2e6307?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d" type="video/mp4" />
              </video>
              <p className="text-sm text-gray-600 text-center">
                Authentische Testimonials
              </p>
            </div>
            <div className="space-y-4">
              <video 
                className="w-full aspect-[9/16] rounded-xl shadow-lg"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="https://api.altan.ai/platform/media/572ac408-1f34-4dda-a0ae-24a7591e1d3b?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d" type="video/mp4" />
              </video>
              <p className="text-sm text-gray-600 text-center">
                Produkt Reviews
              </p>
            </div>
          </div>
        </div>

        

        {/* Features Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold mb-8">
            Features, die dein Marketing revolutionieren
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "KI-gestützte Erstellung",
                description: "Vollautomatische Generierung von authentischen Werbevideos",
                icon: "🤖"
              },
              {
                title: "Multiple Stimmen",
                description: "Verschiedene Stimmen und Emotionen für deine Zielgruppe",
                icon: "🎭"
              },
              {
                title: "Performance-Optimiert",
                description: "Skripte basierend auf Top-Performance Ads",
                icon: "📈"
              },
              {
                title: "Mehrsprachig",
                description: "47+ Sprachen für internationale Kampagnen",
                icon: "🌍"
              },
              {
                title: "Schnelle Lieferung",
                description: "Videos in weniger als 3 Minuten erstellt",
                icon: "⚡"
              },
              {
                title: "Volle Rechte",
                description: "100% Nutzungsrechte für alle Kanäle",
                icon: "✅"
              }
            ].map((feature, index) => (
              <div key={index} className="border rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold mb-8">
            Was unsere Kunden sagen
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                quote: "Seit wir die KI-UGC Plattform nutzen, sparen wir tausende Euro pro Monat und haben einen konstanten Strom an performanten Creatives.",
                author: "Lisa M.",
                role: "DTC-Brand Owner",
                image: "https://api.altan.ai/platform/media/9e563482-68af-4a46-9e76-42af24259c14?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d"
              },
              {
                quote: "Unsere Meta-Ads performen jetzt doppelt so gut, weil wir jede Woche frische Creatives testen können – ohne teure Creator!",
                author: "Markus S.",
                role: "Performance Marketing Experte",
                image: "https://api.altan.ai/platform/media/a6fef1a0-3116-4904-96d0-0c8c6faeb055?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-gray-600 mb-4">{testimonial.quote}</p>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inline CTAs between sections */}
        <div className="my-12 p-8 bg-purple-50 rounded-xl text-center">
          <h3 className="text-xl font-semibold mb-4">
            Bereit für den nächsten Schritt?
          </h3>
          <p className="text-gray-600 mb-6">
            Teste unsere Plattform kostenlos und überzeuge dich selbst
          </p>
          <Link href={userId ? "/dashboard" : "/sign-up"}>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Jetzt starten
            </Button>
          </Link>
        </div>

        {/* Final CTA Section */}
        <div className="mt-24 mb-20">
          <div className="bg-gradient-to-r from-purple-900 to-purple-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Bereit deine UGC-Produktion zu revolutionieren?
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Starte jetzt und erstelle deine ersten Videos kostenlos!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={userId ? "/dashboard" : "/sign-up"}>
                <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-8">
                  Kostenlos testen
                </Button>
              </Link>
              <a 
                href="https://calendly.com/ai-ugcs/30min" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 text-lg px-8"
                >
                  Demo vereinbaren
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
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
      </article>
    </div>
  );
} 