'use client'

import { useState, useEffect, useRef, forwardRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { X, RotateCw, ChevronsUpDown, Check, ImagePlus, ArrowRight, HelpCircle, Loader2, Wand2Icon } from 'lucide-react'
import { cn } from '@/lib/utils'
import Draggable from 'react-draggable'
import { toast } from '@/components/ui/use-toast'
import { FileInput } from '@/components/ui/file-input'
import { ImageVariantsDialog } from "@/components/ui/image-variants-dialog"
import { Progress } from "@/components/ui/progress"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { removeBackground } from '@/lib/api'
import { ImageIcon } from 'lucide-react'
import { MultiStepLoader } from "@/components/ui/multi-step-loader"

// Update avatar options with more entries and better descriptions
const avatarOptions = [
  {
    id: '1',
    src: 'https://api.altan.ai/platform/media/7edce52a-6886-4a48-b5cb-e332a56dfae3?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d',
    alt: 'Professioneller Business Avatar',
    name: 'Business Pro'
  },
  {
    id: '2',
    src: 'https://api.altan.ai/platform/media/b37669ed-3ea7-4756-9846-41d2fcfaee1e?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d',
    alt: 'Casual Style Avatar',
    name: 'Casual Style'
  },
  // Adding 10 more avatars with placeholder images
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 3}`,
    src: i % 2 === 0 
      ? 'https://api.altan.ai/platform/media/7edce52a-6886-4a48-b5cb-e332a56dfae3?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d'
      : 'https://api.altan.ai/platform/media/b37669ed-3ea7-4756-9846-41d2fcfaee1e?account_id=45531da9-2b5d-43dd-b788-74b6eb4a9b2d',
    alt: `Style ${i + 3}`,
    name: `Style ${i + 3}`
  }))
]

interface ProductOverlay {
  x: number
  y: number
  width: number
  height: number
  imageUrl: string | null
  aspectRatio: number
}

const useResize = (initialSize: { width: number; height: number }) => {
  const [size, setSize] = useState(initialSize)
  const [isResizing, setIsResizing] = useState(false)

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)

    const startX = e.pageX
    const startY = e.pageY
    const startWidth = size.width
    const startHeight = size.height

    const onMouseMove = (e: MouseEvent) => {
      if (!isResizing) return

      const newWidth = startWidth + (e.pageX - startX)
      const newHeight = startHeight + (e.pageY - startY)

      setSize({
        width: Math.max(50, newWidth), // Minimum size of 50px
        height: Math.max(50, newHeight)
      })
    }

    const onMouseUp = () => {
      setIsResizing(false)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return { size, startResize }
}

const bgRemovalStates = [
  { text: "Bild wird analysiert..." },
  { text: "Hintergrund wird entfernt..." },
  { text: "Optimierung wird durchgeführt..." },
  { text: "Transparenz wird angepasst..." }
]

const processingStates = [
  { text: "KI-Modell wird vorbereitet..." },
  { text: "Bild wird verarbeitet..." },
  { text: "Varianten werden generiert..." },
  { text: "Qualitätskontrolle läuft..." },
  { text: "Finale Optimierung..." }
]

export default function TestingPage() {
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0])
  const previewRef = useRef<HTMLDivElement>(null)
  const [productOverlay, setProductOverlay] = useState<ProductOverlay>({
    x: 0,
    y: 0,
    width: 80,
    height: 80,
    imageUrl: null,
    aspectRatio: 1
  })

  const { size, startResize } = useResize({ width: 100, height: 100 })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isProcessing, setIsProcessing] = useState(false)
  const [countdown, setCountdown] = useState(35)
  const [variants, setVariants] = useState<Array<{url: string, id: string}>>([])
  const [showVariants, setShowVariants] = useState(false)

  const [isRemovingBackground, setIsRemovingBackground] = useState(false)

  const handleAvatarSelect = (avatar: typeof avatarOptions[0]) => {
    setSelectedAvatar(avatar)
  }

  const handleProductUpload = async (file: File) => {
    if (!file) return

    try {
      setIsRemovingBackground(true)
      
      // Remove background first
      const processedBlob = await removeBackground(file)
      const imageUrl = URL.createObjectURL(processedBlob)
      
      const img = new Image()
      
      img.onload = () => {
        // Create a canvas to analyze the image
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Draw the image to analyze its pixels
        ctx.drawImage(img, 0, 0)
        const imageData = ctx.getImageData(0, 0, img.width, img.height)
        const data = imageData.data

        // Find the bounds of non-transparent pixels
        let minX = img.width, minY = img.height, maxX = 0, maxY = 0
        let hasContent = false

        for (let y = 0; y < img.height; y++) {
          for (let x = 0; x < img.width; x++) {
            const alpha = data[((y * img.width + x) * 4) + 3]
            if (alpha > 0) {
              minX = Math.min(minX, x)
              minY = Math.min(minY, y)
              maxX = Math.max(maxX, x)
              maxY = Math.max(maxY, y)
              hasContent = true
            }
          }
        }

        if (!hasContent) {
          console.error('No non-transparent pixels found in image')
          return
        }

        const container = previewRef.current
        if (!container) return

        const rect = container.getBoundingClientRect()

        // Calculate dimensions based on the actual content bounds
        const contentWidth = maxX - minX
        const contentHeight = maxY - minY
        const contentAspectRatio = contentWidth / contentHeight

        // Set size to fill a significant portion of the container
        let initialWidth, initialHeight

        if (contentAspectRatio > 1) {
          // Content is wider than tall
          initialWidth = rect.width * 0.5  // Use 50% of container width
          initialHeight = initialWidth / contentAspectRatio
        } else {
          // Content is taller than wide
          initialHeight = rect.height * 0.5 // Use 50% of container height
          initialWidth = initialHeight * contentAspectRatio
        }

        // Center the image
        const centerX = (rect.width - initialWidth) / 2
        const centerY = (rect.height - initialHeight) / 2

        setProductOverlay({
          x: centerX,
          y: centerY,
          width: initialWidth,
          height: initialHeight,
          imageUrl,
          aspectRatio: contentAspectRatio
        })
      }

      img.src = imageUrl
    } catch (error) {
      console.error('Error processing image:', error)
      toast({
        title: "Error",
        description: "Fehler beim Entfernen des Hintergrunds. Bitte versuche es erneut.",
        variant: "destructive",
      })
    } finally {
      setIsRemovingBackground(false)
    }
  }

  const openFileSelector = () => {
    fileInputRef.current?.click()
  }

  const handleDrag = (e: any, data: any) => {
    setProductOverlay(prev => ({
      ...prev,
      x: data.x,
      y: data.y
    }))
  }

  const handleResize = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const startX = e.pageX
    const startY = e.pageY
    const startWidth = productOverlay.width
    const startHeight = productOverlay.height
    const aspectRatio = productOverlay.aspectRatio

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.pageX - startX
      const dy = e.pageY - startY

      // Calculate new width based on diagonal movement
      const diagonal = Math.sqrt(dx * dx + dy * dy) * (dx > 0 ? 1 : -1)
      const newWidth = Math.max(50, startWidth + diagonal)
      // Calculate height based on aspect ratio
      const newHeight = newWidth / aspectRatio

      setProductOverlay(prev => ({
        ...prev,
        width: newWidth,
        height: newHeight
      }))
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  const capturePreview = async (): Promise<{ fullImage: Blob; maskImage: Blob } | null> => {
    const previewElement = previewRef.current
    if (!previewElement) return null

    try {
      const html2canvas = (await import('html2canvas')).default

      // Function to create a canvas with specific dimensions
      const createCanvas = (width: number, height: number) => {
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        return canvas
      }

      // Create temporary container for full image
      const container = document.createElement('div')
      container.style.position = 'fixed'
      container.style.top = '0'
      container.style.left = '0'
      container.style.width = `${previewElement.offsetWidth}px`
      container.style.height = `${previewElement.offsetHeight}px`
      container.style.zIndex = '-1000'
      document.body.appendChild(container)

      // Clone for full image
      const previewClone = previewElement.cloneNode(true) as HTMLElement
      container.appendChild(previewClone)

      // Remove UI elements
      const uiElements = previewClone.querySelectorAll(
        '.remove-button, .rotate-handle, .resize-handle, .hover-outline'
      )
      uiElements.forEach(el => el.remove())

      // Wait for images to load
      const images = previewClone.getElementsByTagName('img')
      await Promise.all(
        Array.from(images).map((img) =>
          new Promise((resolve, reject) => {
            if (img.complete) {
              resolve(true)
              return
            }
            img.onload = () => resolve(true)
            img.onerror = reject
          })
        )
      )

      // Capture full image
      const fullImageCanvas = await html2canvas(previewClone, {
        useCORS: true,
        scale: 2,
        backgroundColor: null,
        logging: false,
      })

      // Create mask canvas
      const maskCanvas = createCanvas(fullImageCanvas.width, fullImageCanvas.height)
      const maskCtx = maskCanvas.getContext('2d')
      if (!maskCtx) return null

      // Fill mask with black background
      maskCtx.fillStyle = '#000000'
      maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height)

      // Create a temporary canvas to get the product image data
      const tempCanvas = createCanvas(productOverlay.width, productOverlay.height)
      const tempCtx = tempCanvas.getContext('2d')
      if (!tempCtx) return null

      // Load the product image to get its actual shape
      const productImage = new Image()
      await new Promise((resolve, reject) => {
        productImage.onload = resolve
        productImage.onerror = reject
        productImage.crossOrigin = 'anonymous'
        productImage.src = productOverlay.imageUrl!
      })

      // Draw the product image to get its data
      tempCtx.drawImage(productImage, 0, 0, productOverlay.width, productOverlay.height)
      
      // Get the image data to check transparency
      const imageData = tempCtx.getImageData(0, 0, productOverlay.width, productOverlay.height)
      const data = imageData.data

      // Create a new ImageData for the mask
      const maskImageData = new ImageData(productOverlay.width, productOverlay.height)
      
      // Convert non-transparent pixels to black (content) and create white border
      for (let i = 0; i < data.length; i += 4) {
        // Make everything black by default
        maskImageData.data[i] = 0       // R
        maskImageData.data[i + 1] = 0   // G
        maskImageData.data[i + 2] = 0   // B
        maskImageData.data[i + 3] = 255 // A
      }

      // Create only the border (no fill)
      const borderWidth = 12  // Increased from 8 to 12 for thicker border
      const smoothingFactor = 0.2  // Reduced from 0.5 to 0.2 for less smoothing

      // In the edge detection part, update the border creation:
      for (let y = 0; y < maskImageData.height; y++) {
        for (let x = 0; x < maskImageData.width; x++) {
          const idx = (y * maskImageData.width + x) * 4
          const currentAlpha = data[idx + 3]
          
          // Check if this pixel is on the edge of the product
          if (currentAlpha > 0) { // If this pixel is part of the product
            let isEdge = false
            
            // Check neighboring pixels
            for (let dy = -1; dy <= 1 && !isEdge; dy++) {
              for (let dx = -1; dx <= 1 && !isEdge; dx++) {
                if (dx === 0 && dy === 0) continue
                
                const nx = x + dx
                const ny = y + dy
                if (nx >= 0 && nx < maskImageData.width && ny >= 0 && ny < maskImageData.height) {
                  const neighborIdx = (ny * maskImageData.width + nx) * 4
                  // If we find a transparent neighbor, this is an edge pixel
                  if (data[neighborIdx + 3] === 0) {
                    isEdge = true
                  }
                }
              }
            }
            
            // If this is an edge pixel, create a white border around it
            if (isEdge) {
              for (let dy = -borderWidth; dy <= borderWidth; dy++) {
                for (let dx = -borderWidth; dx <= borderWidth; dx++) {
                  const nx = x + dx
                  const ny = y + dy
                  if (nx >= 0 && nx < maskImageData.width && ny >= 0 && ny < maskImageData.height) {
                    const distance = Math.sqrt(dx * dx + dy * dy)
                    if (distance <= borderWidth) {
                      const borderIdx = (ny * maskImageData.width + nx) * 4
                      // Add smooth falloff for anti-aliasing
                      const intensity = Math.min(255, 255 * (1 - (distance / borderWidth) * smoothingFactor))
                      maskImageData.data[borderIdx] = intensity     // R
                      maskImageData.data[borderIdx + 1] = intensity // G
                      maskImageData.data[borderIdx + 2] = intensity // B
                      maskImageData.data[borderIdx + 3] = 255       // A
                    }
                  }
                }
              }
            }
          }
        }
      }

      // Use this mask directly (no need for dilation)
      tempCtx.putImageData(maskImageData, 0, 0)

      // Add these calculations back before using them in maskCtx.translate
      const scale = fullImageCanvas.width / previewElement.offsetWidth
      const overlayX = productOverlay.x * scale
      const overlayY = productOverlay.y * scale
      const overlayWidth = productOverlay.width * scale
      const overlayHeight = productOverlay.height * scale

      // Then use them in the existing code
      maskCtx.save()
      maskCtx.translate(
        overlayX + overlayWidth / 2,
        overlayY + overlayHeight / 2
      )
      maskCtx.drawImage(
        tempCanvas,
        -overlayWidth / 2,
        -overlayHeight / 2,
        overlayWidth,
        overlayHeight
      )
      maskCtx.restore()

      // Clean up
      document.body.removeChild(container)

      // Convert both canvases to blobs
      return new Promise((resolve) => {
        fullImageCanvas.toBlob(
          (fullBlob) => {
            maskCanvas.toBlob(
              (maskBlob) => {
                if (fullBlob && maskBlob) {
                  resolve({
                    fullImage: fullBlob,
                    maskImage: maskBlob
                  })
                } else {
                  resolve(null)
                }
              },
              'image/png',
              1.0
            )
          },
          'image/png',
          1.0
        )
      })
    } catch (error) {
      console.error('Error capturing preview:', error)
      return null
    }
  }

  const handleConfirm = async () => {
    if (!productOverlay.imageUrl) return

    try {
      console.log('Starting image generation process...')
      setIsProcessing(true)
      setCountdown(55) // Changed to 55 seconds

      // Start countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            // Show variants immediately when countdown ends
            setIsProcessing(false)
            setShowVariants(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      console.log('Capturing preview...')
      const images = await capturePreview()
      if (!images) {
        throw new Error('Failed to capture preview images')
      }

      // Send initial request
      const formData = new FormData()
      formData.append('image', images.fullImage, 'combined-image.png')
      formData.append('mask', images.maskImage, 'mask-image.png')
      formData.append('metadata', JSON.stringify({
        avatarId: selectedAvatar.id,
        overlay: {
          x: Math.round(productOverlay.x),
          y: Math.round(productOverlay.y),
          width: Math.round(productOverlay.width),
          height: Math.round(productOverlay.height),
          originalImage: productOverlay.imageUrl
        }
      }))

      const response = await fetch('/api/avatar-config', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to process image')
      }

      // Wait for 55 seconds
      await new Promise(resolve => setTimeout(resolve, 55000))

      const data = await response.json()
      const variantData = data.data

      if (!variantData?.Variant_1 || !variantData?.Variant_2 || !variantData?.Variant_3) {
        throw new Error('No variant images received')
      }

      setVariants([
        { url: variantData.Variant_1, id: '1' },
        { url: variantData.Variant_2, id: '2' },
        { url: variantData.Variant_3, id: '3' }
      ])

    } catch (error) {
      console.error('Process failed:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate images. Please try again.",
        variant: "destructive",
      })
      setIsProcessing(false)
    }
  }

  // Cleanup function to remove object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (productOverlay.imageUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(productOverlay.imageUrl)
      }
    }
  }, [productOverlay.imageUrl])

  const removeOverlay = () => {
    setProductOverlay(prev => ({ ...prev, imageUrl: null }))
  }

  useEffect(() => {
    console.log('Product overlay updated:', productOverlay)
  }, [productOverlay])

  return (
    <div className="container max-w-5xl mx-auto p-8 space-y-6">
      <Card className="p-4 border-primary/20 bg-primary/5">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🚀</span>
          <div>
            <h3 className="font-semibold">Early Access Feature</h3>
            <p className="text-sm text-muted-foreground">
              Wir sind die Ersten, die diese innovative Funktion einbetten! 🎉 Diese Funktion befindet sich noch in der Beta-Phase und wird ständig verbessert. 🛠️
            </p>
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/favicon.ico" alt="Logo" className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Avatar Konfiguration</h1>
        </div>
        <Button 
          variant="outline" 
          onClick={() => window.history.back()}
          className="gap-2"
        >
          <X className="w-4 h-4" />
          Zurück
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Avatar Selection Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Avatar auswählen</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {avatarOptions.map((avatar) => (
              <div key={avatar.id}>
                <Card
                  className={cn(
                    'cursor-pointer overflow-hidden relative transition-all duration-300',
                    'hover:shadow-lg hover:scale-[1.02]',
                    selectedAvatar.id === avatar.id 
                      ? 'ring-2 ring-primary shadow-lg' 
                      : 'hover:ring-2 hover:ring-primary/50'
                  )}
                  onClick={() => handleAvatarSelect(avatar)}
                >
                  <div className="relative aspect-[9/16]">
                    <img
                      src={avatar.src}
                      alt={avatar.alt}
                      className="w-full h-full object-cover"
                    />
                    {selectedAvatar.id === avatar.id && (
                      <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </Card>
                <p className="text-xs font-medium mt-2 text-center">{avatar.name}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Preview Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Vorschau</h2>
          <div 
            ref={previewRef}
            className="relative w-full max-w-[280px] mx-auto aspect-[9/16] bg-muted rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={selectedAvatar.src}
              alt={selectedAvatar.alt}
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
              loading="eager"
              onError={(e) => {
                console.error('Error loading avatar image:', e)
                // Retry with cache-busting
                const img = e.currentTarget
                const cacheBuster = Date.now()
                img.src = `${selectedAvatar.src}${selectedAvatar.src.includes('?') ? '&' : '?'}t=${cacheBuster}`
              }}
            />
            {productOverlay.imageUrl && (
              <div className="absolute inset-0">
                <Draggable
                  position={{x: productOverlay.x, y: productOverlay.y}}
                  onDrag={handleDrag}
                  handle=".drag-handle"
                >
                  <div
                    style={{
                      width: `${productOverlay.width}px`,
                      height: `${productOverlay.height}px`,
                      position: 'absolute',
                      zIndex: 50,
                      left: '0',
                      top: '0',
                      touchAction: 'none',
                      willChange: 'transform'
                    }}
                    className="group"
                  >
                    <div 
                      className="w-full h-full drag-handle cursor-move relative"
                    >
                      <img
                        src={productOverlay.imageUrl}
                        alt="Product overlay"
                        className="w-full h-full object-contain"
                        draggable={false}
                        crossOrigin="anonymous"
                        loading="eager"
                      />
                      
                      <button
                        onClick={removeOverlay}
                        className="remove-button absolute -translate-x-1/2 -translate-y-1/2 top-0 left-0 z-10 w-6 h-6 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200"
                      >
                        <X className="w-4 h-4 text-gray-700" />
                      </button>

                      <div 
                        className="resize-handle absolute bottom-0 right-0 z-10 cursor-se-resize group/resize"
                        onMouseDown={handleResize}
                      >
                        <div className="absolute bottom-0 right-0 w-6 h-6 flex items-center justify-center bg-white/90 rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110">
                          <ChevronsUpDown 
                            className="w-4 h-4 text-gray-700 transform rotate-45" 
                          />
                        </div>
                      </div>

                      <div className="hover-outline absolute inset-0 border border-white/40 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                  </div>
                </Draggable>
              </div>
            )}
          </div>

          <div className="space-y-3 max-w-[280px] mx-auto">
            <FileInput
              ref={fileInputRef}
              onFileSelect={handleProductUpload}
            />
            <Button 
              className="w-full font-medium"
              variant={productOverlay.imageUrl ? "outline" : "default"}
              onClick={openFileSelector}
            >
              <ImagePlus className="w-4 h-4 mr-2" />
              {productOverlay.imageUrl ? 'Produktbild ersetzen' : 'Produktbild hinzufügen'}
            </Button>

            {productOverlay.imageUrl && (
              <Button
                variant="default"
                className="w-full font-medium bg-primary hover:bg-primary/90"
                onClick={handleConfirm}
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Weiter
              </Button>
            )}

            {productOverlay.imageUrl && (
              <HoverCard>
                <HoverCardTrigger>
                  <Button variant="ghost" size="sm" className="w-full">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Tipps zur Positionierung
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="space-y-2">
                    <h4 className="font-medium">Steuerelemente:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Ziehen zum Verschieben</li>
                      <li>• Unten rechts zum Skalieren</li>
                    </ul>
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
        </Card>
      </div>

      {isRemovingBackground && (
        <MultiStepLoader
          loadingStates={bgRemovalStates}
          loading={isRemovingBackground}
          duration={1000}
          loop={true}
        />
      )}

      {isProcessing && (
        <MultiStepLoader
          loadingStates={processingStates}
          loading={isProcessing}
          duration={11000} // Adjusted for 55 seconds total (11000 * 5 steps ≈ 55s)
          loop={false}
          warning="Bitte verlassen Sie den Tab nicht während der Verarbeitung."
          countdown={countdown}
        />
      )}

      <ImageVariantsDialog
        isOpen={showVariants}
        onClose={() => setShowVariants(false)}
        variants={variants}
      />
    </div>
  )
} 