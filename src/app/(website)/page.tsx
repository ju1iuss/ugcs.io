"use client";

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Link as LinkIcon } from 'lucide-react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useState } from 'react'
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import { Problems } from '@/components/global/problems';

export default function Home() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-white max-w-7xl mx-auto px-4 scroll-smooth">
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
      

      {/* Hero Video Section */}
      <div className="relative pb-24">
        <HeroVideoDialog
          className="dark:hidden block aspect-[4/3] w-full max-w-4xl mx-auto"
          animationStyle="top-in-bottom-out"
          videoSrc="https://api.altan.ai/platform/media/73adf8a2-9382-4171-be25-18b306146388?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d"
          thumbnailSrc="https://api.altan.ai/platform/media/eaf52df7-e535-454d-b1e6-9d635ddbfb3f?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d"
          thumbnailAlt="Hero Video"
     
        />
        <HeroVideoDialog
          className="hidden dark:block aspect-[4/3] w-full max-w-4xl mx-auto"
          animationStyle="top-in-bottom-out"
          videoSrc="https://api.altan.ai/platform/media/73adf8a2-9382-4171-be25-18b306146388?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d"
          thumbnailSrc="https://api.altan.ai/platform/media/eaf52df7-e535-454d-b1e6-9d635ddbfb3f?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d"
          thumbnailAlt="Hero Video"
         
        />
      </div>

      {/* Problems Section */}
      <Problems />

      {/* Remove the Alternatives and Features sections and go straight to Pricing */}
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
          @ 2025 Forever. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
