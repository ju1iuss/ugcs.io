"use client";

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Link as LinkIcon } from 'lucide-react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useState } from 'react'
import AnimatedLogoCloud from '@/components/global/logoCloud';
import { VideoGallery } from '@/components/global/video-gallery';
import { Problems } from '@/components/global/problems';

export default function Home() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-white max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="border-b border-gray-200 w-screen -mx-[calc((100vw-100%)/2)] px-[calc((100vw-100%)/2)]">
        <header className="max-w-5xl mx-auto flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center">
              <LinkIcon className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">Ugcs.io</span>
          </div>
            
          <nav className="flex space-x-8">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Product
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
          </nav>
        </header>
      </div>

      {/* Hero Section */}
      <section className="text-center pt-24 pb-12 max-w-4xl mx-auto">
       

        <h1 className="text-7xl font-semibold text-gray-900 mb-12 tracking-tighter">
          Keine Creator? Kein Problem.{' '}
          <span className="relative inline-block mt-0">
            <span className="absolute inset-0 bg-purple-500/30" />
            <span className="relative">UGC Videos</span>
          </span>
          <span className="relative inline-block mt-2">
            <span className="absolute inset-0 bg-green-500/30" />
            <span className="relative">KI generiert</span>
          </span>
          {' '} 
        </h1>
        
        <p className="text-md text-gray-800 mb-12">
          Deutschlands realistischste KI-Avatar-Videos. Einfacher, schneller und besser gehts nicht.
        </p>
        <div className="flex justify-center gap-4 mb-4">
          <Link href="/dashboard">
            <Button 
              className="rounded-md text-md py-6 px-8"
              size="lg"
            >
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
          Free Trial - Keine Kreditkarte notwendig
        </p>
        
      </section>
      

      {/* Videos Display Section */}
      <VideoGallery />

      {/* Problems Section */}
      <Problems />

      {/* Gray Background Section */}
      <div className="w-screen -mx-[calc((100vw-100%)/2)] bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Alternatives Section */}
          <section className="py-24 max-w-4xl mx-auto text-center">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-red-50">
                <div className="flex justify-between mb-4">
                  <h3 className="font-semibold">UGC Agencies</h3>
                  <span className="text-red-500">×</span>
                </div>
                <p className="text-sm text-red-600">
                  Expensive, $60-120 per video, anywhere between $4000 to $6000 a month
                </p>
              </Card>
              <Card className="p-6 bg-red-50">
                <div className="flex justify-between mb-4">
                  <h3 className="font-semibold">Doing it yourself</h3>
                  <span className="text-red-500">×</span>
                </div>
                <p className="text-sm text-red-600">
                  Researching, planning, filming, recording, editing, publishing, re-purposing
                </p>
              </Card>
              <Card className="p-6 bg-green-50">
                <div className="flex justify-between mb-4">
                  <h3 className="font-semibold">ReelFarm</h3>
                  <span className="text-green-500">✓</span>
                </div>
                <p className="text-sm text-green-600">
                  Automatically creating & publishing videos to all platforms, for a monthly subscription
                </p>
              </Card>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-24 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Create UGC videos",
                  description: "Create & publish UGC videos promoting your product demo",
                  available: true
                },
                {
                  title: "Create slideshow videos",
                  description: "Create & publish image slideshow videos to TikTok",
                  available: false
                },
                {
                  title: "Automated Campaigns",
                  description: "Automatically create & auto-publish UGC videos to your TikTok account",
                  available: true
                },
                {
                  title: "UGC Avatar Generator",
                  description: "Auto-magically generate and save viral hooks for your videos",
                  available: false
                },
                {
                  title: "Hook Generator",
                  description: "Auto-magically generate and save viral hooks for your videos",
                  available: false
                }
              ].map((feature, i) => (
                <Card key={i} className="p-6">
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                  {!feature.available && (
                    <div className="mt-2 text-sm text-gray-400">Not Available Yet</div>
                  )}
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Video Dialog */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-[520px] p-0 overflow-hidden">
          <div className="relative aspect-[4/3]">
            <video 
              className="w-full h-full object-cover"
              autoPlay
              controls
              src="https://api.altan.ai/platform/media/73adf8a2-9382-4171-be25-18b306146388?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pricing Section */}
      <section id="pricing" className="px-4 py-16 max-w-4xl mx-auto text-center">
        <div className="text-purple-600 mb-2">Pricing</div>
        <h2 className="text-4xl font-bold mb-4">Wähle deinen Plan</h2>
        <p className="text-gray-600 mb-8">
          Starte kostenlos und upgrade wenn du mehr brauchst. Keine versteckten Kosten.
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

        <div className="grid md:grid-cols-3 gap-6">
          {/* Free Plan */}
          <div className="rounded-lg border bg-white p-8">
            <h3 className="font-semibold text-xl mb-2">Free</h3>
            <p className="text-gray-600 mb-4">Perfekt zum Testen</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">€0</span>
              <span className="text-gray-600">/einmalig</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                15 Video Sekunden
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
                Community Support
              </li>
            </ul>
            <Link href="/dashboard">
              <Button variant="outline" className="w-full">
                Kostenlos Starten
              </Button>
            </Link>
          </div>

          {/* Starter Plan */}
          <div className="rounded-lg border-2 border-purple-600 bg-white p-8 relative">
            <div className="absolute -top-3 right-4 bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
              Beliebt
            </div>
            <h3 className="font-semibold text-xl mb-2">Starter</h3>
            <p className="text-gray-600 mb-4">
              {isYearly ? 'Jährlicher Plan für Beginner' : 'Monatlicher Plan für Beginner'}
            </p>
            <div className="mb-6">
              <span className="text-4xl font-bold">€{isYearly ? '280' : '28'}</span>
              <span className="text-gray-600">/{isYearly ? 'jahr' : 'monat'}</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {isYearly ? '2400 Video Sekunden (200/Monat)' : '200 Video Sekunden pro Monat'}
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
                Priority Support
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Unbegrenzte Projekte
              </li>
            </ul>
            <Link href="/pricing">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                {isYearly ? 'Jahresplan Starten' : 'Monatsplan Starten'}
              </Button>
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="rounded-lg border bg-white p-8">
            <h3 className="font-semibold text-xl mb-2">Pro</h3>
            <p className="text-gray-600 mb-4">
              {isYearly ? 'Jährlicher Plan für Agenturen' : 'Monatlicher Plan für Agenturen'}
            </p>
            <div className="mb-6">
              <span className="text-4xl font-bold">€{isYearly ? '640' : '64'}</span>
              <span className="text-gray-600">/{isYearly ? 'jahr' : 'monat'}</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {isYearly ? '9600 Video Sekunden (800/Monat)' : '800 Video Sekunden pro Monat'}
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
                Premium Support
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                API Zugang
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Custom Branding
              </li>
            </ul>
            <Link href="/pricing">
              <Button variant="outline" className="w-full">
                Kontaktiere uns
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Brauchst du einfach nur mehr Credits? {' '}
            <Link href="/credits" className="text-purple-600 hover:underline">
              Klicke hier →
            </Link>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t">
        <div className="max-w-4xl mx-auto grid grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center">
                <LinkIcon className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold">Ugcs.io</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/#demo">Demo</Link></li>
              <li><Link href="/#pricing">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-12 text-center text-sm text-gray-600">
          @ 2025 Forever. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
