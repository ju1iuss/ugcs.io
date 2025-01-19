"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface TypingAnimationProps extends MotionProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  pauseDuration?: number;
  deleteMode?: boolean;
  as?: React.ElementType;
  startOnView?: boolean;
}

export default function TypingAnimation({
  children,
  className,
  duration = 100,
  delay = 0,
  pauseDuration = 5000,
  deleteMode = false,
  as: Component = "div",
  startOnView = false,
  ...props
}: TypingAnimationProps) {
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [displayedText, setDisplayedText] = useState<string>("");
  const [started, setStarted] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setStarted(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setStarted(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, startOnView]);

  useEffect(() => {
    if (!started) return;

    let isDeleting = false;
    let i = 0;
    
    const animate = () => {
      if (!isDeleting && i < children.length) {
        setDisplayedText(children.substring(0, i + 1));
        i++;
        return true;
      }
      if (isDeleting && i > 0) {
        setDisplayedText(children.substring(0, i - 1));
        i--;
        return true;
      }
      if (i === children.length && !isDeleting) {
        isDeleting = true;
        return false;
      }
      if (i === 0 && isDeleting) {
        isDeleting = false;
        return false;
      }
      return true;
    };

    const startAnimation = () => {
      const typingEffect = setInterval(() => {
        if (!animate()) {
          clearInterval(typingEffect);
          setTimeout(() => {
            startAnimation(); // Restart the animation immediately after pause
          }, pauseDuration);
        }
      }, duration);

      return typingEffect;
    };

    const initialTypingEffect = startAnimation();

    return () => {
      clearInterval(initialTypingEffect);
    };
  }, [children, duration, started, pauseDuration]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn(
        "text-4xl font-bold leading-[5rem] tracking-[-0.02em]",
        className,
      )}
      {...props}
    >
      {displayedText}
    </MotionComponent>
  );
}
