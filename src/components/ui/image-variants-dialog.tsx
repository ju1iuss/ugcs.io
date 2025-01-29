import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { notifyAvatarCreation } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@clerk/nextjs"

interface ImageVariant {
  url: string
  id: string
}

interface ImageVariantsDialogProps {
  isOpen: boolean
  onClose: () => void
  variants: ImageVariant[]
}

export function ImageVariantsDialog({
  isOpen,
  onClose,
  variants,
}: ImageVariantsDialogProps) {
  const router = useRouter()
  const { userId } = useAuth()
  const [selectedVariant, setSelectedVariant] = useState<ImageVariant | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSelect = async () => {
    if (!selectedVariant || !userId) return

    try {
      setIsProcessing(true)
      await notifyAvatarCreation(selectedVariant.url, userId)
      router.push('/avatar-processing')
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "Es gab einen Fehler bei der Avatar-Erstellung. Bitte versuche es erneut.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Wähle eine Variante</h2>
          <div className="grid grid-cols-3 gap-4">
            {variants.map((variant) => (
              <div
                key={variant.id}
                className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                  selectedVariant?.id === variant.id
                    ? 'border-primary ring-2 ring-primary/50'
                    : 'border-transparent hover:border-primary/50'
                }`}
                onClick={() => setSelectedVariant(variant)}
              >
                <img
                  src={variant.url}
                  alt={`Variante ${variant.id}`}
                  className="w-full h-auto aspect-[9/16] object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose} disabled={isProcessing}>
              Abbrechen
            </Button>
            <Button
              disabled={!selectedVariant || isProcessing}
              onClick={handleSelect}
            >
              {isProcessing ? "Wird verarbeitet..." : "Auswählen"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 