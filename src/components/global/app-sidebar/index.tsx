"use client";

import { QuickCreateButton } from "@/components/ui/QuickCreateButton";
import { useState } from "react";
import MultiStepForm from "@/components/global/form/MultiStepForm";
import { Calendar, Home, Inbox, Search, Settings, ChevronUp, ChevronDown, Sparkles, Package } from "lucide-react";
import Credits from "@/components/global/credits";

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
import { usePathname } from 'next/navigation';
import { Video } from '@/types/video';
import { CreditDrawer } from "../pricing/credit-drawer";
import Link from "next/link";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Einstellungen",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Custom Avatare (bald)",
    url: "#",
    icon: Package,
  },
];

interface AppSidebarProps {
  credits?: number | string;
  onAddVideo?: (video: Video) => void;
}

export function AppSidebar({ credits = 0, onAddVideo }: AppSidebarProps) {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { signOut } = useClerk();
  const { user } = useUser();

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
                className="w-full h-9 text-sm"
               
              />
              
            </div>
         

            <SidebarGroupLabel className="px-6">App</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="px-2">
                {items.map((item) => (
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
                ))}
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
          <div className="px-4 space-y-3">
            <Credits credits={credits} />
            <p className="text-xs text-gray-500 text-center italic">
        1 Credit = 1 Video Sekunde
      </p>
      <div className="flex justify-center">
        
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
                <Link href="/pricing">
                  <DropdownMenuItem className="flex items-center gap-2 py-2.5">
                    <span className="text-sm">Auf Pro upgraden</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/settings">
                  <DropdownMenuItem className="flex items-center gap-2 py-2.5">
                    <span className="text-sm">Konto</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/settings">
                  <DropdownMenuItem className="flex items-center gap-2 py-2.5">
                    <span className="text-sm">Abrechnung</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/settings">
                  <DropdownMenuItem className="flex items-center gap-2 py-2.5">
                    <span className="text-sm">Benachrichtigungen</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem 
                  className="flex items-center gap-2 py-2.5 text-red-600 focus:text-red-600"
                  onClick={() => signOut()}
                >
                  <span className="text-sm">Abmelden</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>

      <MultiStepForm 
        isOpen={isModalOpen} 
        credits={credits}
        onOpenChange={setIsModalOpen}
        onAddVideo={onAddVideo}
      />
    </>
  );
}
