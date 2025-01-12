"use client";

import { QuickCreateButton } from "@/components/ui/QuickCreateButton";
import { useState } from "react";
import MultiStepForm from "@/components/global/form/MultiStepForm";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";


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
import { useClerk } from "@clerk/nextjs";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { signOut } = useClerk();

  return (
    
    <>
    
      <Sidebar collapsible="offcanvas">
        <SidebarContent>
            <SidebarHeader>
            <div className="flex items-center gap-2 p-4">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
              <i className="fas fa-link"></i>
            </div>
            <span className="font-semibold">Ugcs.io</span>
          </div>

            </SidebarHeader>
          

          <SidebarGroup>
            
          
            <QuickCreateButton
              onCreateClick={() => setIsModalOpen(true)}
              className="w-full"
            />
         

            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup> 
            <SidebarGroupLabel>Settings</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Settings />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter> 
       
        <Button
              variant="outline"
              onClick={() => signOut()}
              className="w-full"
            >
              Sign out
            </Button>
            
            

        </SidebarFooter>
      </Sidebar>

      <MultiStepForm isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
