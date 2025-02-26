'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import AvatarSelection, { avatars } from './AvatarSelection'
import StyleSelection from './StyleSelection'
import ScriptInput from './ScriptInput'
import { useAuth } from "@clerk/nextjs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2 } from "lucide-react"
import { Video } from '@/types/video';
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { useUserData } from "@/contexts/UserDataContext";

interface MultiStepFormProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onAddVideo?: (video: Video) => void
  credits: number | string
  refetchData?: () => Promise<void>
}

interface FormData {
  avatar: string
  style: string
  script: string
}

const TOTAL_STEPS = 3

const getAvatarById = (id: string) => {
  return avatars.find(avatar => avatar.id === id);
}

export default function MultiStepForm({ isOpen, onOpenChange, onAddVideo, credits, refetchData }: MultiStepFormProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    avatar: '',
    style: '',
    script: ''
  })
  const { userId } = useAuth()
  const [isGenerating, setIsGenerating] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const { addVideo } = useUserData();

  const loadingStates = [
    { text: "Video wird generiert..." },
    { text: "KI arbeitet..." },
    { text: "Fast fertig..." }
  ]

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      if (field === 'avatar') {
        const selectedAvatar = getAvatarById(value);
        if (selectedAvatar?.style_id) {
          newData.style = selectedAvatar.style_id;
        }
      }
      
      return newData;
    });
  }

  const nextStep = () => {
    const currentAvatar = getAvatarById(formData.avatar);
    
    if (step === 1 && currentAvatar?.style_id) {
      setStep(3);
    } else {
      setStep(prev => Math.min(prev + 1, TOTAL_STEPS));
    }
  }

  const prevStep = () => {
    const currentAvatar = getAvatarById(formData.avatar);
    
    if (step === 3 && currentAvatar?.style_id) {
      setStep(1);
      setFormData(prev => ({ ...prev, avatar: '', style: '', script: '' }));
    } else {
      if (step === 2) {
        setFormData(prev => ({ ...prev, avatar: '', style: '' }));
      } else if (step === 3) {
        setFormData(prev => ({ ...prev, style: '', script: '' }));
      }
      setStep(prev => Math.max(prev - 1, 1));
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setStep(1)
      setFormData({ avatar: '', style: '', script: '' })
    }
    onOpenChange(open)
  }

  const handleSubmit = async () => {
    if (!userId || formData.script.length > 600) return;
    setIsGenerating(true);
    setShowLoader(true);

    const correlationId = `temp-${Date.now()}`;
    const tempVideo: Video = {
      id: Date.now(),
      video_url: null,
      status: 'Generating',
      thumbnail: null,
      created_time: new Date().toISOString(),
      last_modified_time: new Date().toISOString(),
      last_modified_by: userId,
      rating: null,
      correlationId,
      script: formData.script,
      avatar_id: formData.avatar,
      style_id: formData.style
    };

    addVideo(tempVideo);
    onAddVideo?.(tempVideo);

    const payload = {
      text: formData.script,
      style: formData.style,
      avatar: formData.avatar,
      user_id: userId,
      correlation_id: correlationId
    };

    try {
      const response = await fetch('https://api.altan.ai/galaxia/hook/0jctFE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to generate');

      await new Promise(resolve => setTimeout(resolve, 3000));
      await refetchData?.();

      setStep(1);
      setFormData({ avatar: '', style: '', script: '' });
      onOpenChange(false);

    } catch (error) {
      console.error('Error generating:', error);
    } finally {
      setShowLoader(false);
      setIsGenerating(false);
    }
  };

  return (
    <>
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

              <ScrollArea className={`${step === 1 ? 'h-[60vh]' : 'h-[30vh]'} px-6`}>
                <div className="space-y-2">
                  {step === 1 && (
                    <AvatarSelection 
                      selectedAvatar={formData.avatar}
                      onSelect={(avatar) => {
                        updateFormData('avatar', avatar);
                        const selectedAvatar = getAvatarById(avatar);
                        if (selectedAvatar?.style_id) {
                          updateFormData('style', selectedAvatar.style_id);
                          setStep(3);
                        } else {
                          nextStep();
                        }
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
                      credits={Number(credits)}
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
                    Schließen
                  </Button>
                ) : (
                  <Button 
                    onClick={prevStep} 
                    variant="outline" 
                    size="sm"
                  >
                    Zurück
                  </Button>
                )}
                
                {step === TOTAL_STEPS && (
                  <p className="text-xs text-gray-500 self-center mx-4">
                    Wartezeit: Ungefähr 2-3 Minuten.
                  </p>
                )}
                
                {step === TOTAL_STEPS ? (
                  <Button 
                    onClick={handleSubmit} 
                    size="sm"
                    disabled={
                      !formData.script.trim() || 
                      formData.script.trim().split(/\s+/).filter(Boolean).length < 8 || 
                      isGenerating ||
                      formData.script.length > 600 ||
                      (formData.script.trim().split(/\s+/).filter(Boolean).length * 0.4) > Number(credits)
                    }
                  >
                    {isGenerating ? 'Generieren...' : 'Generieren'}
                  </Button>
                ) : (
                  <div className="ml-auto" />
                )}
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>

      <MultiStepLoader
        loadingStates={loadingStates}
        loading={showLoader}
        duration={1000}
        loop={false}
      />
    </>
  )
}

