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
        <div className="h-12 w-12 bg-black rounded-lg flex items-center justify-center mb-4">
          <LinkIcon className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-2xl font-semibold">Welcome to Ugcs.io</h1>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="mb-4">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <VideoIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Ultra Realistic UGC Videos</h3>
          <p className="text-gray-600 text-sm mb-4">
            Create UGC videos promoting your product with your own script
          </p>
          <Button 
            onClick={onCreateClick}
            className="w-full"
          >
            Create your first Video
          </Button>
        </div>

        {/* Disabled Cards */}
        {[
          {
            title: "UGC Videos V2 + Script Generator",
            description: "Let AI generate your script and create mindblowing Ad videos with subtitles and editing.",
            icon: ImageIcon,
            colors: { bg: "bg-green-100/70", text: "text-green-600/70" }
          },
          {
            title: "Let AI hold your brands products",
            description: "Make even better Ads with AI holding your products, ultra realistic.",
            icon: Users,
            colors: { bg: "bg-orange-100/70", text: "text-orange-600/70" }
          },
          {
            title: "Auto Editing",
            description: "Receive automatic editing of your videos, with subtitles, cuts, and more.",
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

      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-blue-100 rounded flex items-center justify-center">
            <span className="text-blue-600 font-semibold">:(</span>
          </div>
          <div>
            <div className="font-medium">You have 0 Credits</div>
            <div className="text-sm text-gray-600">Get new credits to generate more videos</div>
          </div>
        </div>
        <a 
          href={getStripeUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="link" className="text-blue-600">
            Upgrade now →
          </Button>
        </a>
      </div>
    </div>
  );
} 