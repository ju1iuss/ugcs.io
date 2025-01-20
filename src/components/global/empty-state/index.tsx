import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import { ImageIcon, LinkIcon, Sparkles, Users, VideoIcon } from "lucide-react"

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
      

      <div className="text-center mb-12 flex flex-col items-center">
      <img 
                src="/favicon.ico" 
                alt="Ugcs.io Logo" 
                className="w-10 h-10 mb-4"
              />
        <h1 className="text-2xl font-semibold">Wilkommen bei Ugcs.io</h1>
      </div>
      
      <div className="mb-8 bg-purple-50 border border-purple-100 rounded-lg p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 bg-purple-100 rounded flex items-center justify-center">
            <span className="text-purple-600 font-semibold">!</span>
          </div>
          <div>
            <div className="font-medium">Wichtig: Die App ist in der Early Stage Phase.</div>
            <div className="text-sm text-gray-600">
            Falls keine generierten Videos angezeigt werden und die "Credits" Anzeige grau ist, {' '}
              <button 
                onClick={() => window.location.reload()}
                className="text-purple-600 hover:text-purple-700 hover:underline font-medium"
              >
                klick hier.
              </button>
            </div>
          </div>
        </div>
      </div>
      
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
            Erstelle dein erstes Video
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