import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 bg-black rounded"></div>
          <span className="font-medium">ReelFarm</span>
        </div>
        <nav className="flex space-x-6">
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            Product
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      
      <section className="text-center px-4 py-16 max-w-4xl mx-auto">
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Automate TikToks that drive traffic to your website
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          It's like a gen z marketing team, but way cheaper
        </p>
        <div className="flex justify-center gap-4">
        <HoverBorderGradient className="flex items-center">
       <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
         <path d="M12 4v16m0-16L6 10m6-6l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
       </svg>
           <Link href="/dashboard">Start Now</Link>
        </HoverBorderGradient>


        </div>
      </section>
      

      {/* TikTok Videos Grid */}
      <section className="flex justify-center gap-4 px-4 mb-24">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="relative w-48 h-80 rounded-2xl overflow-hidden shadow-lg transform rotate-[-2deg] hover:rotate-0 transition-transform">
            <Image
              src={`/placeholder.svg?height=320&width=192`}
              alt={`TikTok video ${i}`}
              width={192}
              height={320}
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Alternatives Section */}
      <section className="px-4 py-16 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Alternatives are expensive.</h2>
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
      <section className="px-4 py-16 max-w-4xl mx-auto text-center">
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

      {/* Pricing Section */}
      <section className="px-4 py-16 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Choose your plan</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Starter",
              price: "19",
              videos: "10",
              popular: false,
              features: [
                "10 videos per month",
                "5 UGC avatars",
                "Generate unlimited viral hooks",
                "Publish to TikTok",
                "Schedule/automate videos"
              ]
            },
            {
              name: "Growth",
              price: "49",
              videos: "50",
              popular: true,
              features: [
                "50 videos per month",
                "All 50+ UGC avatars",
                "Generate unlimited viral hooks",
                "Publish to TikTok",
                "Schedule/automate videos"
              ]
            },
            {
              name: "Scale",
              price: "95",
              videos: "150",
              popular: false,
              features: [
                "150 videos per month",
                "All 50+ UGC avatars",
                "Generate unlimited viral hooks",
                "Publish to TikTok",
                "Schedule/automate videos"
              ]
            }
          ].map((plan, i) => (
            <Card 
              key={i} 
              className={`p-6 relative ${plan.popular ? 'border-2 border-blue-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="font-semibold text-xl mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-600">/month</span>
              </div>
              <div className="text-sm text-gray-600 mb-6">
                {plan.videos} videos per month
              </div>
              <ul className="text-sm text-gray-600 space-y-3 mb-6">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${
                  plan.popular ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Buy Now
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t">
        <div className="max-w-4xl mx-auto grid grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-6 w-6 bg-black rounded"></div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#">Features</Link></li>
              <li><Link href="#">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#">About</Link></li>
              <li><Link href="#">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-12 text-center text-sm text-gray-600">
          © 2023 ReelFarm. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
