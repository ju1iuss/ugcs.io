"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, Loader2, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function AnimatedGenerateButton() {
  const [isLoading, setIsLoading] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const handleClick = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsDone(true)
      setTimeout(() => setIsDone(false), 2000) // Reset after 2 seconds
    }, 3000) // Show loading for 3 seconds
  }

  return (
    <Button variant="outline" className="relative overflow-hidden" onClick={handleClick} disabled={isLoading || isDone}>
      <AnimatePresence mode="wait">
        {!isLoading && !isDone && (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center"
          >
            Text erstellen
            <motion.span className="ml-2 text-purple-600 flex items-center">
              Mit KI <Sparkles className="w-4 h-4 ml-1" />
            </motion.span>
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
            <Loader2 className="w-5 h-5 animate-spin" />
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
            <Check className="w-5 h-5 text-green-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  )
} 