'use client'

import { useState, useEffect } from 'react'
import { useAuth, useClerk } from '@clerk/nextjs'
import Sidebar from '@/components/global/sidebar'
import MultiStepForm from '@/components/global/form/MultiStepForm'
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const [videos, setVideos] = useState([])
  const [showVideos, setShowVideos] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { signOut } = useClerk()

  return (
    <div className="flex min-h-screen text-sm bg-[#f3f4ef] text-[#111827] font-['Inter',sans-serif]">
      <Sidebar onCreateClick={() => setIsModalOpen(true)} />

      <main className="flex-1 bg-[#f3f4ef] p-6">
      <div className="flex justify-end mb-6">
          <Button 
            variant="outline"
            onClick={() => signOut()}
            className="text-sm"
          >
            Sign out
          </Button>
        </div>
        <MultiStepForm 
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </main>
    </div>
  )
}

