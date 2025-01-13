"use client";

import { QuickCreateButton } from "@/components/ui/QuickCreateButton";
import { useState } from "react";
import MultiStepForm from "@/components/global/form/MultiStepForm";
import { Calendar, Home, Inbox, Search, Settings, ChevronUp, ChevronDown, Sparkles } from "lucide-react";
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

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Affiliates",
    url: "#",
    icon: Calendar,
  },
];

interface AppSidebarProps {
  credits?: number | string;
}

export function AppSidebar({ credits = 0 }: AppSidebarProps) {
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
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white mb-2">
                <Sparkles className="h-5 w-5" />
              </div>
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
         

            <SidebarGroupLabel className="px-6">Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="px-2">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild
                      className={cn(
                        "w-full px-4",
                        pathname === item.url && "bg-gray-100 font-medium border-l-2 border-green-500"
                      )}
                    >
                      <a href={item.url}>
                        <item.icon className={cn(
                          pathname === item.url && "text-green-600"
                        )} />
                        <span className={cn(
                          pathname === item.url && "text-green-600"
                        )}>
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup> 
            <SidebarGroupLabel className="px-6">Community</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="px-2">
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild
                    className={cn(
                      "w-full px-4",
                      pathname === '/inspiration' && "bg-gray-100 font-medium border-l-2 border-green-500"
                    )}
                  >
                    <a href="/inspiration">
                      <Sparkles className={cn(
                        pathname === '/inspiration' && "text-green-600"
                      )} />
                      <span className={cn(
                        pathname === '/inspiration' && "text-green-600"
                      )}>
                        Inspiration
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter> 
          <div className="px-4 space-y-3">
            <Credits credits={credits} />
            
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
                <DropdownMenuItem className="flex items-center gap-2 py-2.5">
                  <span className="text-sm">Upgrade to Pro</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 py-2.5">
                  <span className="text-sm">Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 py-2.5">
                  <span className="text-sm">Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 py-2.5">
                  <span className="text-sm">Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="flex items-center gap-2 py-2.5 text-red-600 focus:text-red-600"
                  onClick={() => signOut()}
                >
                  <span className="text-sm">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>

      <MultiStepForm isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
