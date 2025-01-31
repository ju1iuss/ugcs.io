"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const MobileMenu = () => {
    return (
      <div className={`
        absolute top-full left-0 right-0 bg-white border-b border-gray-200 
        transition-all duration-200 ease-in-out z-50
        ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}>
        <div className="px-4 py-2 space-y-2">
          <Link 
            href="/#examples"
            className="block py-2 text-sm text-gray-600 hover:text-gray-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Features
          </Link>
          <Link 
            href="/#examples"
            className="block py-2 text-sm text-gray-600 hover:text-gray-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Beispiele
          </Link>
          <Link 
            href="/#pricing"
            className="block py-2 text-sm text-gray-600 hover:text-gray-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Preise
          </Link>
          <Link 
            href="/dashboard"
            className="block py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            Einloggen
          </Link>
          <Link href="/sign-up" className="block py-2">
            <Button variant="default" className="w-full text-sm bg-black hover:bg-gray-800 text-white flex items-center gap-2 justify-center">
              <Sparkles className="h-4 w-4" />
              Video erstellen
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="border-b border-gray-200 w-screen -mx-[calc((100vw-100%)/2)] px-[calc((100vw-100%)/2)] sticky top-0 bg-white/80 backdrop-blur-sm z-50">
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
          
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            href="/#examples" 
            className="text-sm text-gray-600 hover:text-gray-900 scroll-smooth"
          >
            Features
          </Link>
          <Link 
            href="/#examples" 
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
            <Link 
              href="/dashboard"
              className="text-sm text-gray-600 hover:text-gray-900 border rounded-md px-4 py-2"
            >
              Einloggen
            </Link>
            <Link href="/sign-up">
              <Button variant="default" className="text-sm bg-black hover:bg-gray-800 text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Video erstellen
              </Button>
            </Link>
          </div>
        </nav>

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
      
      <MobileMenu />
    </div>
  );
} 