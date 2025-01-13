'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import AvatarSelection from './AvatarSelection'
import StyleSelection from './StyleSelection'
import ScriptInput from './ScriptInput'
import { useAuth } from "@clerk/nextjs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2 } from "lucide-react"
import { Video } from '@/types/video';

interface MultiStepFormProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onAddVideo?: (video: Video) => void
}

interface FormData {
  avatar: string
  style: string
  script: string
}

const TOTAL_STEPS = 3

export default function MultiStepForm({ isOpen, onOpenChange, onAddVideo }: MultiStepFormProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    avatar: '',
    style: '',
    script: ''
  })
  const { userId } = useAuth()
  const [isGenerating, setIsGenerating] = useState(false)

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, TOTAL_STEPS))
  const prevStep = () => {
    if (step === 2) {
      setFormData(prev => ({ ...prev, avatar: '', style: '' }))
    } else if (step === 3) {
      setFormData(prev => ({ ...prev, style: '', script: '' }))
    }
    setStep(prev => Math.max(prev - 1, 1))
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setStep(1)
      setFormData({ avatar: '', style: '', script: '' })
    }
    onOpenChange(open)
  }

  const handleSubmit = async () => {
    if (!userId) return;
    setIsGenerating(true);

    const tempVideo: Video = {
      id: Date.now(),
      video_url: null,
      status: 'Generating',
      thumbnail: null,
      created_time: new Date().toISOString(),
      last_modified_time: new Date().toISOString(),
      last_modified_by: userId,
      rating: null
    };

    onAddVideo?.(tempVideo);

    const payload = {
      script: formData.script,
      styleId: formData.style,
      avatarId: formData.avatar,
      userId: userId
    };

    try {
      // Initial generation request
      const response = await fetch('https://api.altan.ai/galaxia/hook/0jctFE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to generate');

      // Wait 10 seconds before first poll
      setTimeout(async () => {
        try {
          const pollResponse = await fetch('https://api.altan.ai/galaxia/hook/mdqQXB', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: tempVideo.id })
          });
          
          const data = await pollResponse.json();
          
          // If we get video data back, update the video in the dashboard
          if (data.video) {
            onAddVideo?.(data.video);
          }
        } catch (error) {
          console.error('Error polling video status:', error);
        }
      }, 10000);

      setStep(1);
      setFormData({ avatar: '', style: '', script: '' });
      onOpenChange(false);
    } catch (error) {
      console.error('Error generating:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <div className="flex justify-center mb-2 pt-4">
              {[...Array(TOTAL_STEPS)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 h-1 rounded-full mx-0.5 transition-all duration-300 ${
                    i + 1 <= step ? 'bg-primary scale-110' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <ScrollArea className="h-[30vh] px-6">
              <div className="space-y-2">
                {step === 1 && (
                  <AvatarSelection 
                    selectedAvatar={formData.avatar}
                    onSelect={(avatar) => {
                      updateFormData('avatar', avatar)
                      nextStep()
                    }}
                  />
                )}
                {step === 2 && (
                  <StyleSelection
                    selectedAvatar={formData.avatar}
                    selectedStyle={formData.style}
                    onSelect={(style) => {
                      updateFormData('style', style)
                      nextStep()
                    }}
                  />
                )}
                {step === 3 && (
                  <ScriptInput
                    script={formData.script}
                    onScriptChange={(script) => updateFormData('script', script)}
                  />
                )}
              </div>
            </ScrollArea>

            <div className="flex justify-between mt-2 pt-2 px-6 pb-4 border-t">
              {step === 1 ? (
                <Button 
                  onClick={() => handleOpenChange(false)} 
                  variant="outline" 
                  size="sm"
                >
                  Close
                </Button>
              ) : (
                <Button 
                  onClick={prevStep} 
                  variant="outline" 
                  size="sm"
                >
                  Previous
                </Button>
              )}
              
              {step === TOTAL_STEPS && (
                <p className="text-xs text-gray-500 self-center mx-4">
                  Generation takes about 2-3 minutes.
                </p>
              )}
              
              {step === TOTAL_STEPS ? (
                <Button 
                  onClick={handleSubmit} 
                  size="sm"
                  disabled={!formData.script.trim() || formData.script.trim().split(/\s+/).filter(Boolean).length < 8 || isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate'
                  )}
                </Button>
              ) : (
                <div className="ml-auto" />
              )}
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}

