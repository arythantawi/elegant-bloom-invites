import { useEffect, useState, useRef, RefObject } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface UseScrollAnimationReturn {
  ref: RefObject<HTMLElement>;
  isVisible: boolean;
  hasAnimated: boolean;
}

export const useScrollAnimation = (
  options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn => {
  const { threshold = 0.2, rootMargin = "0px", triggerOnce = true } = options;
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasAnimated(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref: ref as RefObject<HTMLElement>, isVisible, hasAnimated };
};

// Animation class generator
export const getAnimationClasses = (
  isVisible: boolean,
  variant: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale" | "zoom" = "fade-up",
  delay: number = 0
): string => {
  const baseClasses = "transition-all duration-700 ease-out";
  const delayClass = delay > 0 ? `delay-[${delay}ms]` : "";
  
  const variants = {
    "fade-up": isVisible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-12",
    "fade-down": isVisible
      ? "opacity-100 translate-y-0"
      : "opacity-0 -translate-y-12",
    "fade-left": isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-12",
    "fade-right": isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 translate-x-12",
    "scale": isVisible
      ? "opacity-100 scale-100"
      : "opacity-0 scale-90",
    "zoom": isVisible
      ? "opacity-100 scale-100"
      : "opacity-0 scale-75",
  };

  return `${baseClasses} ${delayClass} ${variants[variant]}`.trim();
};

// Stagger animation for children
export const getStaggerDelay = (index: number, baseDelay: number = 100): number => {
  return index * baseDelay;
};
