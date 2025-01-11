'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import AvatarSelection from './AvatarSelection'
import StyleSelection from './StyleSelection'
import ScriptInput from './ScriptInput'

interface MultiStepFormProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

interface FormData {
  avatar: string
  style: string
  script: string
}

const TOTAL_STEPS = 3

export default function MultiStepForm({ isOpen, onOpenChange }: MultiStepFormProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    avatar: '',
    style: '',
    script: ''
  })

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, TOTAL_STEPS))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  // Reset form when dialog is closed
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setStep(1)
      setFormData({ avatar: '', style: '', script: '' })
    }
    onOpenChange(open)
  }

  const handleSubmit = async () => {
    const payload = {
      script: formData.script,
      styleId: "1",
      avatarId: "1"
    }

    await fetch('https://api.altan.ai/galaxia/hook/0jctFE', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    // Close dialog and reset form
    setStep(1)
    setFormData({ avatar: '', style: '', script: '' })
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <Card>
          <CardContent className="pt-6">
            {/* Progress indicators */}
            <div className="flex justify-center mb-6">
              {[...Array(TOTAL_STEPS)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full mx-1 transition-all duration-300 ${
                    i + 1 <= step ? 'bg-primary scale-125' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Form steps */}
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

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <Button onClick={prevStep} variant="outline">
                  Previous
                </Button>
              )}
              {step === TOTAL_STEPS && (
                <Button onClick={handleSubmit} className="ml-auto">
                  Generate
                </Button>
              )}
            </div>

            {step === TOTAL_STEPS && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                Generation takes about 2-3 minutes.
              </p>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}

