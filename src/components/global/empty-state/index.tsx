import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import { ImageIcon, LinkIcon, Sparkles, Users, VideoIcon, ArrowRightIcon } from "lucide-react"
import Marquee from "react-fast-marquee"
import { NumberTicker } from "@/components/ui/number-ticker";
import Image from "next/image";
import Link from "next/link";

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
              "https://api.altan.ai/platform/media/d9ec32f7-893b-48a0-8ab9-cb557019ac0b?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/67ba118f-7010-4a59-9be6-b9ce2720baf5?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/a38661be-2aad-46bb-9311-08cbcef91b1c?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/ce894453-190d-4c67-b42a-ec2b22b0a546?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/c14bfaa0-b542-40c2-9b3e-7cbb29041740?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
              "https://api.altan.ai/platform/media/a38661be-2aad-46bb-9311-08cbcef91b1c?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d",
            ].map((videoUrl, index) => (
              <div key={index} className="mx-1">
                <div className="relative w-[70px] h-[124px] rounded-lg overflow-hidden shadow-lg">
                    <Image
                    className="w-full h-full object-cover"
                    src={videoUrl}
                    alt={`Example ${index + 1}`}
                    width={70}
                    height={124}
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </section>
      
      <div className="grid md:grid-cols-2 gap-6">
        {[
          {
            title: "Ultra Realistische UGC Videos",
            description: "Erstelle UGC Videos die dein Produkt bewerben mit deinem eigenen Script",
            icon: VideoIcon,
            colors: { bg: "bg-blue-100", text: "text-blue-600" },
            action: onCreateClick,
            buttonText: "Erstelle dein erstes Video"
          },
          {
            title: "Eigene Avatare die dein Produkt halten",
            description: "Erstelle noch bessere Ads mit Custom Avataren die dein Produkt halten.",
            icon: Users,
            colors: { bg: "bg-orange-100", text: "text-orange-600" },
            href: "/avatar",
            buttonText: "Zu den Avataren"
          },
          {
            title: "Script Generator",
            description: "Erstelle noch bessere Ads mit dem KI Script Generator.",
            icon: Sparkles,
            colors: { bg: "bg-purple-100", text: "text-purple-600" },
            href: "/script",
            buttonText: "Zum Generator"
          },
          {
            title: "See all videos",
            description: "Siehe alle deine erstellten Videos in der Übersicht.",
            icon: ImageIcon,
            colors: { bg: "bg-green-100", text: "text-green-600" },
            href: "/dashboard",
            buttonText: "Zur Übersicht"
          }
        ].map((card, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <div className="mb-4">
              <div className={`h-10 w-10 ${card.colors.bg} rounded-full flex items-center justify-center`}>
                <card.icon className={`h-6 w-6 ${card.colors.text}`} />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-600 text-sm mb-4">
              {card.description}
            </p>
            {card.href ? (
              <Link href={card.href}>
                <Button className="w-full" variant="outline">
                  {card.buttonText} <ArrowRightIcon className="ml-2" />
                </Button>
              </Link>
            ) : (
              <Button 
                onClick={card.action}
                className="w-full"
                variant="outline"
              >
                {card.buttonText} <ArrowRightIcon className="ml-2" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 