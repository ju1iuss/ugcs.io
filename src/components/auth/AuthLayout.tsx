import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: React.ReactNode
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full bg-white p-4">
      {/* Back Button */}
      <Link 
        href="/" 
        className="absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
      >
        <svg 
          className="h-5 w-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Link>

      {/* Left side - Auth Form */}
      <div className="flex w-full flex-1 flex-col items-center justify-center px-4 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <Image
                src="/favicon.ico"
                alt="Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
            </div>
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
            {subtitle && (
              <div className="mt-2 text-center text-sm text-gray-600">{subtitle}</div>
            )}
          </div>
          
          {/* Auth Component */}
          <div className="mt-8 w-full">{children}</div>
        </div>
      </div>

      {/* Right side - Gradient Background */}
      <div className="hidden flex-1 md:block">
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-purple-800 to-indigo-950">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-4 top-1/4 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl"></div>
            <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/3 h-[400px] w-[400px] rounded-full bg-purple-300/20 blur-3xl"></div>
          </div>

          {/* Content */}
          <div className="relative flex h-full flex-col items-center justify-center px-12 py-16 text-center">
            <h1 className="mb-8 max-w-lg text-3xl font-bold leading-tight text-white lg:text-4xl">
              UGC Videos - KI generiert
            </h1>
            
            <div className="relative mb-8">
             
              <Image
                src="https://api.altan.ai/platform/media/67ed5d44-c11e-430f-bfda-dbd815e0f5d4?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d"
                alt="Platform Preview"
                width={600}
                height={400}
                className="rounded-xl"
                
              />
            </div>

            <p className="max-w-md text-base text-purple-50">
              Generiere realistische Talking Head Videos mit KI die nicht wie Roboter klingen oder aussehen.
            </p>

            {/* Feature List */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20">
                  <svg className="h-4 w-4 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-purple-50">Schneller und effizienter Prozess</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20">
                  <svg className="h-4 w-4 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-purple-50">Automatisierte Video Content komplett</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20">
                  <svg className="h-4 w-4 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-purple-50">Direkte Download und Teilen Funktion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout 