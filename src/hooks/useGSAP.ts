import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export interface UseGSAPScrollOptions {
  trigger?: string | Element | RefObject<Element>;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  toggleActions?: string;
  markers?: boolean;
  once?: boolean;
}

export interface UseGSAPAnimationOptions {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
}

// Hook for scroll-triggered animations
export const useGSAPScrollTrigger = <T extends HTMLElement>(
  animationConfig: gsap.TweenVars,
  scrollOptions: UseGSAPScrollOptions = {}
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const {
      start = "top 80%",
      end = "bottom 20%",
      toggleActions = "play none none reverse",
      once = true,
    } = scrollOptions;

    const ctx = gsap.context(() => {
      gsap.from(element, {
        ...animationConfig,
        scrollTrigger: {
          trigger: element,
          start,
          end,
          toggleActions: once ? "play none none none" : toggleActions,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
};

// Hook for fade up animation with scroll trigger
export const useGSAPFadeUp = <T extends HTMLElement>(
  options: UseGSAPAnimationOptions = {}
) => {
  const { duration = 0.8, delay = 0, ease = "power3.out" } = options;
  
  return useGSAPScrollTrigger<T>(
    {
      opacity: 0,
      y: 50,
      duration,
      delay,
      ease,
    },
    { once: true }
  );
};

// Hook for fade in animation with scroll trigger
export const useGSAPFadeIn = <T extends HTMLElement>(
  options: UseGSAPAnimationOptions = {}
) => {
  const { duration = 1, delay = 0, ease = "power2.out" } = options;
  
  return useGSAPScrollTrigger<T>(
    {
      opacity: 0,
      duration,
      delay,
      ease,
    },
    { once: true }
  );
};

// Hook for scale animation with scroll trigger
export const useGSAPScale = <T extends HTMLElement>(
  options: UseGSAPAnimationOptions = {}
) => {
  const { duration = 0.7, delay = 0, ease = "back.out(1.7)" } = options;
  
  return useGSAPScrollTrigger<T>(
    {
      opacity: 0,
      scale: 0.8,
      duration,
      delay,
      ease,
    },
    { once: true }
  );
};

// Hook for slide animations
export const useGSAPSlide = <T extends HTMLElement>(
  direction: "left" | "right" | "up" | "down" = "up",
  options: UseGSAPAnimationOptions = {}
) => {
  const { duration = 0.8, delay = 0, ease = "power3.out" } = options;
  
  const getTransform = () => {
    switch (direction) {
      case "left": return { x: -100, y: 0 };
      case "right": return { x: 100, y: 0 };
      case "up": return { x: 0, y: 100 };
      case "down": return { x: 0, y: -100 };
    }
  };
  
  const transform = getTransform();
  
  return useGSAPScrollTrigger<T>(
    {
      opacity: 0,
      ...transform,
      duration,
      delay,
      ease,
    },
    { once: true }
  );
};

// Hook for stagger animations on children
export const useGSAPStagger = <T extends HTMLElement>(
  childSelector: string,
  options: UseGSAPAnimationOptions = {}
) => {
  const ref = useRef<T>(null);
  const { duration = 0.6, delay = 0, stagger = 0.1, ease = "power3.out" } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const children = element.querySelectorAll(childSelector);
    if (!children.length) return;

    const ctx = gsap.context(() => {
      gsap.from(children, {
        opacity: 0,
        y: 40,
        duration,
        delay,
        stagger,
        ease,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, [childSelector, duration, delay, stagger, ease]);

  return ref;
};

// Hook for continuous floating animation
export const useGSAPFloat = <T extends HTMLElement>(
  amplitude: number = 20,
  duration: number = 3
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        y: -amplitude,
        duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, [amplitude, duration]);

  return ref;
};

// Hook for sway animation (for florals)
export const useGSAPSway = <T extends HTMLElement>(
  intensity: number = 1
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        rotation: 2 * intensity,
        x: 3 * intensity,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, [intensity]);

  return ref;
};

// Hook for sparkle/twinkle animation
export const useGSAPSparkle = <T extends HTMLElement>(
  options: { duration?: number; scale?: number } = {}
) => {
  const ref = useRef<T>(null);
  const { duration = 1.5, scale = 1.2 } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        opacity: 0.4,
        scale: 0.8,
        rotation: 180,
        duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, [duration, scale]);

  return ref;
};

// Hook for confetti animation
export const useGSAPConfetti = <T extends HTMLElement>(
  isActive: boolean,
  onComplete?: () => void
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!isActive || !ref.current) return;

    const pieces = ref.current.querySelectorAll('.confetti-piece');
    if (!pieces.length) return;

    const ctx = gsap.context(() => {
      pieces.forEach((piece) => {
        const randomX = (Math.random() - 0.5) * 100;
        const randomRotation = Math.random() * 720 - 360;
        const randomDuration = 2 + Math.random() * 2;
        const randomDelay = Math.random() * 0.5;

        gsap.fromTo(
          piece,
          {
            y: -20,
            x: 0,
            rotation: 0,
            opacity: 1,
          },
          {
            y: window.innerHeight + 50,
            x: randomX,
            rotation: randomRotation,
            opacity: 0,
            duration: randomDuration,
            delay: randomDelay,
            ease: "power1.in",
            onComplete: () => {
              if (piece === pieces[pieces.length - 1] && onComplete) {
                onComplete();
              }
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [isActive, onComplete]);

  return ref;
};

// Utility function to create timeline for complex animations
export const createGSAPTimeline = (options?: gsap.TimelineVars) => {
  return gsap.timeline(options);
};

// Export gsap for direct usage
export { gsap, ScrollTrigger };
