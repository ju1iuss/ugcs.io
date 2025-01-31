import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import { ImageIcon, LinkIcon, Sparkles, Users, VideoIcon, ArrowRightIcon } from "lucide-react"
import Marquee from "react-fast-marquee"
import { NumberTicker } from "@/components/ui/number-ticker";


interface EmptyStateProps {
  onCreateClick: () => void;
}

export function EmptyState({ onCreateClick }: EmptyStateProps) {
  const { user } = useUser();
  
  const getStripeUrl = () => {
    const baseUrl = 'https://buy.stripe.com/test_00g4j28r362t1GwfYZ';
    const email = user?.emailAddresses?.[0]?.emailAddress;
    
    if (!email) return baseUrl;
    
    const encodedEmail = encodeURIComponent(email);
    return `${baseUrl}?prefilled_email=${encodedEmail}`;
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8 flex flex-col items-center">
        <img 
          src="/favicon.ico" 
          alt="Ugcs.io Logo" 
          className="w-10 h-10 mb-4"
        />
        <h1 className="text-2xl font-semibold">Wilkommen bei Ugcs.io</h1>
        <div className="flex items-center gap-2 mt-4 bg-gradient-to-r from-green-50 to-purple-50 px-4 py-1.5 rounded-full shadow-sm border border-black-900">
          <div className="flex -space-x-1.5">
            {[
              "https://i.pravatar.cc/100?img=12",
              "https://i.pravatar.cc/100?img=28",
              "https://i.pravatar.cc/100?img=33",
              "https://i.pravatar.cc/100?img=45",
              "https://i.pravatar.cc/100?img=57",
            ].map((avatar, i) => (
              <img
                key={i}
                src={avatar}
                alt=""
                className="w-5 h-5 rounded-full border-[1.5px] border-white object-cover"
              />
            ))}
          </div>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg key={i} className="w-3.5 h-3.5 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <NumberTicker
            value={4592}
            decimalPlaces={0}
      className="text-gray-700 text-xs font-medium"
    />
          <p className="text-gray-700 text-xs font-medium">Videos erstellt</p>
        </div>
      </div>

      <section className="py-2 md:py-4 overflow-hidden mb-12">
        <div className="relative w-full max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F2F5F8] via-[#F2F5F8] to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#F2F5F8] via-[#F2F5F8] to-transparent z-10"></div>
          <Marquee className="[--duration:40s]" pauseOnHover>
            {[
              "https://api.altan.ai/platform/media/cd3a3884-d7e8-4e32-8947-d3901c1ad9a2?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/17af25f8-5f4c-4ceb-9262-38444b2f9906?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/693ae159-4e06-4a36-810f-218058b81395?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/aa0e0606-1f65-429b-8570-5112d09b3981?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              // Duplicates for smooth loop
              "https://api.altan.ai/platform/media/cd3a3884-d7e8-4e32-8947-d3901c1ad9a2?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/17af25f8-5f4c-4ceb-9262-38444b2f9906?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/69677eaa-d241-4ec0-8cb5-4895d0aa1c12?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
            ].map((videoUrl, index) => (
              <div key={index} className="mx-1">
                <div className="relative w-[70px] h-[124px] rounded-lg overflow-hidden shadow-lg">
                  <video
                    className="w-full h-full object-cover"
                    src={videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </section>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="mb-4">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <VideoIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Ultra Realistische UGC Videos</h3>
          <p className="text-gray-600 text-sm mb-4">
            Erstelle UGC Videos die dein Produkt bewerben mit deinem eigenen Script
          </p>
          <Button 
            onClick={onCreateClick}
            className="w-full"
          >
            Erstelle dein erstes Video <ArrowRightIcon />
          </Button>
        </div>

        {/* Disabled Cards */}
        {[
          {
            title: "Ugcs.io V2 + Script Generator",
            description: "Erstelle noch bessere Ads mit deinem eigenen Script und Untertiteln.",
            icon: ImageIcon,
            colors: { bg: "bg-green-100/70", text: "text-green-600/70" }
          },
          {
            title: "Eigene Avatare die dein Produkt halten",
            description: "Erstelle noch bessere Ads mit Custom Avataren die dein Produkt halten.",
            icon: Users,
            colors: { bg: "bg-orange-100/70", text: "text-orange-600/70" }
          },
          {
            title: "Auto-Editing",
            description: "Erhalte automatisches Editing deiner Videos mit Untertiteln und mehr.",
            icon: Sparkles,
            colors: { bg: "bg-purple-100/70", text: "text-purple-600/70" }
          }
        ].map((card, index) => (
          <div 
            key={index} 
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 opacity-60"
          >
            <div className="mb-4">
              <div className={`h-10 w-10 ${card.colors.bg} rounded-full flex items-center justify-center`}>
                <card.icon className={`h-6 w-6 ${card.colors.text}`} />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">{card.title}</h3>
            <p className="text-gray-500 text-sm mb-4">
              {card.description}
            </p>
            <div className="flex items-center justify-end">
              <span className="text-xs text-gray-400 italic">Available Soon</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 