"use client"

import * as React from "react"
import { Minus, Plus, CreditCard, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { motion, AnimatePresence } from "framer-motion"

export function CreditDrawer() {
  const [credits, setCredits] = React.useState(350)

  function onClick(adjustment: number) {
    setCredits(Math.max(0, Math.min(1000, credits + adjustment)))
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 w-full bg-purple-600 text-white hover:bg-purple-700 border-0"
        >
          <CreditCard className="h-3 w-3" />
          <span className="text-xs">Mehr Credits</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xs">
          <DrawerHeader className="p-4">
            <DrawerTitle className="text-base font-medium">Mehr Credits</DrawerTitle>
            <DrawerDescription className="text-xs text-muted-foreground">Erhalte mehr Videosekunden.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 shrink-0 rounded-full"
                onClick={() => onClick(-50)}
                disabled={credits <= 0}
              >
                <Minus className="h-3 w-3" />
                <span className="sr-only">Weniger</span>
              </Button>
              <AnimatePresence mode="wait">
                <motion.div
                  key={credits}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex-1 text-center"
                >
                  <div className="text-2xl font-bold tracking-tighter">
                    {credits}
                  </div>
                  <div className="text-[0.65rem] uppercase text-muted-foreground">
                    Credits
                  </div>
                </motion.div>
              </AnimatePresence>
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 shrink-0 rounded-full"
                onClick={() => onClick(50)}
                disabled={credits >= 1000}
              >
                <Plus className="h-3 w-3" />
                <span className="sr-only">Mehr</span>
              </Button>
            </div>
          </div>
          <DrawerFooter className="flex-row gap-2 px-4 py-4 pb-6">
            <Button 
              size="sm" 
              className="flex-1 text-xs bg-purple-600 hover:bg-purple-700"
            >
              Credits hinzufügen
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <X className="h-3 w-3" />
                <span className="sr-only">Schließen</span>
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
} 