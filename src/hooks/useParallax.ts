import { useEffect, useState, useCallback } from "react";

interface ParallaxConfig {
  speed?: number; // 0.1 = slow, 1 = same as scroll, -0.5 = opposite direction
  direction?: "vertical" | "horizontal" | "both";
  maxOffset?: number; // Maximum offset in pixels
}

interface ParallaxValues {
  x: number;
  y: number;
  rotate: number;
}

export const useParallax = (config: ParallaxConfig = {}): ParallaxValues => {
  const { speed = 0.3, direction = "vertical", maxOffset = 100 } = config;
  const [values, setValues] = useState<ParallaxValues>({ x: 0, y: 0, rotate: 0 });

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    let y = 0;
    let x = 0;
    const rotate = (scrollY * speed * 0.02) % 360;

    if (direction === "vertical" || direction === "both") {
      y = Math.min(Math.max(scrollY * speed, -maxOffset), maxOffset);
    }

    if (direction === "horizontal" || direction === "both") {
      x = Math.min(Math.max(scrollX * speed, -maxOffset), maxOffset);
    }

    setValues({ x, y, rotate });
  }, [speed, direction, maxOffset]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return values;
};

// Hook for individual element parallax based on its position
export const useElementParallax = (
  elementRef: React.RefObject<HTMLElement>,
  config: ParallaxConfig = {}
): ParallaxValues => {
  const { speed = 0.3, maxOffset = 50 } = config;
  const [values, setValues] = useState<ParallaxValues>({ x: 0, y: 0, rotate: 0 });

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      
      // Calculate distance from viewport center
      const distance = (elementCenter - viewportCenter) / windowHeight;
      
      const y = Math.min(Math.max(distance * speed * 100, -maxOffset), maxOffset);
      const rotate = distance * speed * 5;

      setValues({ x: 0, y, rotate });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [elementRef, speed, maxOffset]);

  return values;
};
