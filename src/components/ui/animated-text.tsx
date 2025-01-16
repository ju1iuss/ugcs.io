"use client";

import { motion, AnimatePresence } from "framer-motion";

interface AnimatedTextProps {
  text: string;
}

export function AnimatedText({ text }: AnimatedTextProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={text}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {text}
      </motion.div>
    </AnimatePresence>
  );
} 