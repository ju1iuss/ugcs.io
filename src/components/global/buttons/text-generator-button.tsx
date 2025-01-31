"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Loader2, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { generateAIScript } from "@/lib/api"

interface TextGeneratorButtonProps {
  onScriptGenerated: (script: string) => void;
}

export default function TextGeneratorButton({ onScriptGenerated }: TextGeneratorButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [productInfo, setProductInfo] = useState("")
  const [brandInfo, setBrandInfo] = useState("")
  const [selectedTheme, setSelectedTheme] = useState("")
  const [selectedLength, setSelectedLength] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const handleGenerate = async () => {
    if (!productInfo || !selectedTheme) {
      alert("Bitte füllen Sie alle Felder aus.")
      return
    }

    setIsLoading(true)
    setIsOpen(false)

    try {
      const generatedScript = await generateAIScript(productInfo, brandInfo, selectedTheme, selectedLength)
      onScriptGenerated(generatedScript)
      setIsLoading(false)
      setIsDone(true)
      setTimeout(() => {
        setIsDone(false)
        setProductInfo("")
        setBrandInfo("")
        setSelectedTheme("")
        setSelectedLength("")
      }, 2000)
    } catch (error) {
      setIsLoading(false)
      alert("Fehler beim Generieren des Skripts")
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!isLoading && !isDone && (
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center text-purple-600"
              >
                KI Skript <Sparkles className="w-3 h-3 ml-1" />
              </motion.div>
            )}
            {isLoading && (
              <motion.div
                key="loading"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ width: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-background"
              >
                <Loader2 className="w-4 h-4 animate-spin" />
              </motion.div>
            )}
            {isDone && (
              <motion.div
                key="done"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-background"
              >
                <Check className="w-4 h-4 text-green-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="productInfo" className="flex items-center gap-1">
              Produktinformationen
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="productInfo"
              value={productInfo}
              onChange={(e) => setProductInfo(e.target.value)}
              placeholder="Beschreiben Sie Ihr Produkt..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brandInfo">
              Markeninformationen (Optional)
            </Label>
            <Input
              id="brandInfo"
              value={brandInfo}
              onChange={(e) => setBrandInfo(e.target.value)}
              placeholder="Beschreiben Sie Ihre Marke..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="theme" className="flex items-center gap-1">
              Thema
              <span className="text-red-500">*</span>
            </Label>
            <Select onValueChange={setSelectedTheme} value={selectedTheme}>
              <SelectTrigger>
                <SelectValue placeholder="Wählen Sie ein Thema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3-gründe-wieso">3 Gründe warum</SelectItem>
                <SelectItem value="pov">POV</SelectItem>
                <SelectItem value="stell-dir-vor">Stell dir Vor</SelectItem>
                <SelectItem value="storytime">Storytime</SelectItem>
                <SelectItem value="omg">OMG</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="length" className="flex items-center gap-1">
              Video Länge
              <span className="text-red-500">*</span>
            </Label>
            <Select onValueChange={setSelectedLength} value={selectedLength}>
              <SelectTrigger>
                <SelectValue placeholder="Wählen Sie eine Länge" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 Sekunden</SelectItem>
                <SelectItem value="30">30 Sekunden</SelectItem>
                <SelectItem value="45">45 Sekunden</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleGenerate}>Text erstellen</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
} 