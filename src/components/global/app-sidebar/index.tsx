"use client";

import { QuickCreateButton } from "@/components/ui/QuickCreateButton";
import { useState } from "react";
import MultiStepForm from "@/components/global/form/MultiStepForm";
import { Calendar, Home, Inbox, Search, Settings, ChevronUp, ChevronDown, Sparkles, Package, Star, X, LogOut, Copy, Gift, Check, MessageSquare, UserCircle, Crown, Plus } from "lucide-react";
import Credits from "@/components/global/credits";
import { FeedbackFish } from '@feedback-fish/react';

import {
    useSidebar,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from 'next/navigation';
import { Video } from '@/types/video';
import { CreditDrawer } from "../pricing/credit-drawer";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import confetti from 'canvas-confetti';
import { Badge } from "@/components/ui/badge";
import { useUserData } from "@/contexts/UserDataContext";

const items = [
  {
    title: "Dashboard",
    url: "/home",
    icon: Home,
  },
  {
    title: "Alle Videos",
    url: "/dashboard",
    icon: Package,
  },
  {
    title: "Avatar erstellen",
    url: "/avatar",
    icon: UserCircle,
  },
  {
    title: "Skript Generator",
    url: "/script",
    icon: MessageSquare,
    requiresPro: true,
  },
];

interface AppSidebarProps {
  onAddVideo?: (video: Video) => void;
  userTier?: string;
}

const StarRating = () => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-[#00B67A] text-[#00B67A]" />
    ))}
  </div>
);

const GoogleStars = () => (
  <div className="flex gap-0.5">
    {[...Array(4)].map((_, i) => (
      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
    ))}
    <Star className="w-3 h-3 fill-yellow-400/50 text-yellow-400" />
  </div>
);

const TrustpilotStars = () => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-3 h-3 fill-[#00B67A] text-[#00B67A]" />
    ))}
  </div>
);

const ACTIVE_USERS = "1.200+";

const getUpgradeButton = (plan: string) => {
  switch(plan) {
    case 'agency':
      return null;
    case 'creator':
      return (
        <Link href="/pricing">
          <DropdownMenuItem className="flex items-center gap-2 py-2">
            <span className="text-sm font-medium text-purple-600 hover:text-purple-700">
              Upgrade to Agency
            </span>
          </DropdownMenuItem>
        </Link>
      );
    case 'starter':
      return (
        <Link href="/pricing">
          <DropdownMenuItem className="flex items-center gap-2 py-2">
            <span className="text-sm font-medium text-purple-600 hover:text-purple-700">
              Upgrade to Creator
            </span>
          </DropdownMenuItem>
        </Link>
      );
    default: // 'free' or undefined
      return (
        <Link href="/pricing">
          <DropdownMenuItem className="flex items-center gap-2 py-2 text-gray-600 hover:text-gray-900">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm">Upgrade to Pro</span>
          </DropdownMenuItem>
        </Link>
      );
  }
};

export function AppSidebar({ onAddVideo, userTier = 'free' }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showCouponDialog, setShowCouponDialog] = useState(false);
  const { signOut } = useClerk();
  const { user } = useUser();
  const [isCopied, setIsCopied] = useState(false);
  const { credits, refetchData } = useUserData();

  // Ensure credits is never negative and is always a number
  const displayCredits = Math.max(0, Number(credits) || 0);

  const handleClaimDiscount = () => {
    setShowLogoutDialog(false);
    setShowCouponDialog(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleCopyCode = async () => {
    setIsCopied(true);
    await navigator.clipboard.writeText('NEW20');
    
    setTimeout(() => {
      router.push('/pricing');
    }, 500);
  };

  return (
    
    <>
    
      <Sidebar collapsible="offcanvas">
        <SidebarContent>
            <SidebarHeader>
            <div className="flex flex-col items-center justify-center py-6">
              <img 
                src="/favicon.ico" 
                alt="Ugcs.io Logo" 
                className="w-10 h-10 mb-2"
              />
              <span className="font-semibold text-lg">Ugcs.io</span>
            </div>
            </SidebarHeader>
          

          <SidebarGroup>
            
          
            <div className="px-4 mb-6">
              <QuickCreateButton
                onCreateClick={() => setIsModalOpen(true)}
                className="w-full h-9 text-sm rounded-md"
              />
            </div>
         

            <SidebarGroupLabel className="px-6">App</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="px-2">
                {items.map((item) => {
                  if (item.requiresPro && user?.publicMetadata?.tier === 'free') {
                    return null;
                  }

                  return (
                    <Link
                      key={item.url}
                      href={item.url}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                        pathname === item.url ? "bg-gray-200 text-gray-900" : "hover:bg-gray-100"
                      )}
                    >
                      <item.icon className={cn(
                        "h-4 w-4",
                        pathname === item.url && "text-foreground"
                      )} />
                      <span className={cn(
                        pathname === item.url && "font-medium"
                      )}>
                        {item.title}
                      </span>
                    </Link>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup> 
            <SidebarGroupLabel className="px-6">Community</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="px-2">
                <Link
                  href="/inspiration"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                    pathname === '/inspiration' ? "bg-gray-200 text-gray-900" : "hover:bg-gray-100"
                  )}
                >
                  <Sparkles className={cn(
                    "h-4 w-4",
                    pathname === '/inspiration' && "text-foreground"
                  )} />
                  <span className={cn(
                    pathname === '/inspiration' && "font-medium"
                  )}>
                    Inspiration
                  </span>
                </Link>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter> 
          <div className="px-4 space-y-2">
            <FeedbackFish 
              projectId="a853f1ad81e2d7" 
              userId={user?.primaryEmailAddress?.emailAddress}
            >
              <button
                className={cn(
                  "w-full flex items-center gap-3 rounded-lg px-3 py-1.5 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100 text-sm"
                )}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Support</span>
              </button>
            </FeedbackFish>

            <Link
              href="/settings"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-1.5 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100",
                pathname === '/settings' ? "bg-gray-200 text-gray-900" : ""
              )}
            >
              <Settings className={cn(
                "h-3.5 w-3.5",
                pathname === '/settings' && "text-foreground"
              )} />
              <span className={cn(
                "text-sm",
                pathname === '/settings' && "font-medium"
              )}>
                Einstellungen
              </span>
            </Link>

            <div className="px-4 py-3">
              <Button 
                variant="outline"
                className="w-full justify-between bg-white hover:bg-gray-50"
                onClick={() => router.push('/pricing')}
              >
                <span className="font-medium">{credits} Credits</span>
                <Plus className="w-4 h-4 text-purple-600" />
              </Button>
              <p className="text-xs text-muted-foreground mt-1.5 text-center">
                1 Credit = 1 Video Sekunde
              </p>
            </div>
            
            <DropdownMenu open={isProfileOpen} onOpenChange={setIsProfileOpen}>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center justify-between p-3.5 bg-gray-100/80 rounded-lg cursor-pointer 
                  hover:bg-gray-200/90 transition-all duration-200 shadow-sm border border-gray-200/50 -mt-1"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <img
                        src={user?.imageUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                        alt="Profile"
                        className="h-9 w-9 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user?.fullName || 'User'}
                      </p>
                      <p className="text-[11px] text-gray-500 truncate">
                        {user?.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>
                  </div>
                  {isProfileOpen ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 transition-transform duration-200" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-200" />
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                alignOffset={-14}
                className="w-56"
                sideOffset={8}
              >
                {getUpgradeButton(user?.publicMetadata?.plan as string)}
                {user?.publicMetadata?.plan === 'agency' && (
                  <DropdownMenuItem className="flex items-center gap-2 py-2 text-yellow-600">
                    <Crown className="h-4 w-4" />
                    <span className="text-xs font-medium">Agency Plan</span>
                  </DropdownMenuItem>
                )}
                <a 
                  href="https://billing.stripe.com/p/login/eVaaEF8mH2uz2l2288" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <DropdownMenuItem className="flex items-center gap-2 py-2">
                    <span className="text-sm">Abrechnung</span>
                  </DropdownMenuItem>
                </a>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowLogoutDialog(true)}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Abmelden
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <Dialog 
        open={showLogoutDialog} 
        onOpenChange={setShowLogoutDialog}
      >
        <DialogContent className="max-w-[800px] p-0 rounded-lg overflow-hidden border-0">
          <div className="grid grid-cols-2">
            <div className="bg-[#111] text-white p-8">
              <h2 className="text-purple-400 text-4xl font-bold mb-2">
                4500 +
              </h2>
              <p className="text-lg mb-8 text-gray-300">
                UGC Videos generiert
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-10">
                <video 
                  src="https://api.altan.ai/platform/media/aa0e0606-1f65-429b-8570-5112d09b3981?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d"
                  className="rounded-xl col-span-1 row-span-2 object-cover w-full h-[300px]"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <video 
                  src="https://api.altan.ai/platform/media/cd3a3884-d7e8-4e32-8947-d3901c1ad9a2?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d"
                  className="rounded-xl object-cover w-full h-[145px]"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <video 
                  src="https://api.altan.ai/platform/media/693ae159-4e06-4a36-810f-218058b81395?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d"
                  className="rounded-xl object-cover w-full h-[145px]"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-t border-gray-800 pt-4">
                  <p className="text-sm text-gray-400">
                    Aktive Nutzer in Deutschland
                  </p>
                  <p className="text-xl font-semibold text-white">
                    1.250+
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="text-[11px] font-light text-gray-400">Google Reviews</span>
                    <div className="flex items-center gap-1.5">
                      <img 
                        src="https://api.altan.ai/platform/media/0b054861-11ce-4c5c-98db-c9f80a353d72?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d" 
                        alt="Google" 
                        className="h-3.5"
                      />
                      <GoogleStars />
                      <span className="text-[11px] font-light text-gray-400">4.6</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="text-[11px] font-light text-gray-400">Trustpilot</span>
                    <div className="flex items-center gap-1.5">
                      <img 
                        src="https://api.altan.ai/platform/media/70fcddd7-92d5-49ba-911e-f28276e6329d?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d" 
                        alt="Trustpilot" 
                        className="h-3.5"
                      />
                      <TrustpilotStars />
                      <span className="text-[11px] font-light text-gray-400">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 relative bg-white">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                  Möchtest du uns wirklich verlassen?
                </h2>
                
                <p className="text-gray-600 text-base">
                  Wir haben ein spezielles Angebot für dich vorbereitet.
                </p>

                <div className="space-y-3">
                  <Button
                    onClick={handleClaimDiscount}
                    className="w-full bg-purple-600 hover:bg-purple-700 font-medium"
                    size="lg"
                  >
                    Angebot ansehen
                  </Button>
                  
                  <Button
                    onClick={() => {
                      setShowLogoutDialog(false);
                      signOut();
                    }}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Abmelden bestätigen
                  </Button>
                </div>

                <div className="pt-6">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <p className="text-gray-600 mb-4 text-sm">
                      "Als Geschäftsführer war ich skeptisch gegenüber KI-generierten Videos. Aber die Qualität und Professionalität der Ergebnisse haben mich absolut überzeugt. Ein echter Game-Changer für unser Team was Zeit, Geld und Conversion Rates angeht."
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <img 
                        src="https://api.altan.ai/platform/media/de57a97a-5781-4e16-8264-ef14672fb54d?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d"
                        alt="Bewerter"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium">Jeremy Okoth</p>
                        <p className="text-sm text-gray-500">Influencer & Gründer von Marketing Agentur</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog 
        open={showCouponDialog} 
        onOpenChange={setShowCouponDialog}
      >
        <DialogContent className="sm:max-w-md border-0">
          <div className="text-center space-y-4 py-6">
            <div className="mx-auto w-fit">
              <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-center">
                Dein exklusiver Rabatt
              </DialogTitle>
              <DialogDescription className="text-center text-base">
                Spare jetzt 10% auf deine Videos mit diesem Code
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="bg-purple-50 px-6 py-3 rounded-lg border border-purple-100">
                <span className="text-purple-600 font-bold text-xl">NEW20</span>
              </div>
              <Button
                size="icon"
                variant="outline"
                onClick={handleCopyCode}
                className="h-12 w-12 relative"
                disabled={isCopied}
              >
                <div className={cn(
                  "transition-all duration-300",
                  isCopied ? "scale-0" : "scale-100"
                )}>
                  <Copy className="h-5 w-5" />
                </div>
                <div className={cn(
                  "absolute inset-0 flex items-center justify-center transition-all duration-300",
                  isCopied ? "scale-100" : "scale-0"
                )}>
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <MultiStepForm 
        isOpen={isModalOpen} 
        credits={parseInt(credits)}
        onOpenChange={setIsModalOpen}
        onAddVideo={onAddVideo}
        refetchData={refetchData}
      />
    </>
  );
}
