"use client";

import { EmptyState } from '@/components/global/empty-state';
import { AppSidebar } from "@/components/global/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import MultiStepForm from "@/components/global/form/MultiStepForm";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Star, TrendingUp, Video, Zap, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useUserData } from '@/contexts/UserDataContext';

export default function HomePage() {
  const { credits } = useUserData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();

  return (
    <div className="flex min-h-screen bg-[#f3f5f8]">
      <SidebarProvider>
        <AppSidebar userTier={String(user?.publicMetadata?.tier || 'free')} />
        <main className="flex-1 overflow-x-hidden">
          <div className="p-6 space-y-6">
            <EmptyState onCreateClick={() => setIsModalOpen(true)} />

            <Card className="p-6 bg-gradient-to-r from-purple-50/50 to-white border-purple-100/50">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <PlayCircle className="w-5 h-5 text-purple-600" />
                    <h3 className="font-medium text-gray-900">Inspiration & Beispiele</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Entdecke erfolgreiche Video-Styles und Skripte
                  </p>
                </div>
                <Link 
                  href="/inspiration"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white border border-purple-200/50 text-sm font-medium text-purple-900 hover:bg-purple-50 transition-colors"
                >
                  Entdecken
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          </div>
        </main>
      </SidebarProvider>

      <MultiStepForm 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen}
        credits={credits}
      />
    </div>
  );
} 