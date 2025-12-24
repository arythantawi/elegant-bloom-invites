import React from "react";
import { useParallax } from "@/hooks/useParallax";

interface FloralDecorationProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "left" | "right";
  className?: string;
  size?: "sm" | "md" | "lg";
  enableParallax?: boolean;
  parallaxSpeed?: number;
}

const FloralDecoration = ({ 
  position, 
  className = "", 
  size = "md",
  enableParallax = true,
  parallaxSpeed
}: FloralDecorationProps) => {
  // Different parallax speeds based on position for depth effect
  const getDefaultSpeed = () => {
    switch (position) {
      case "top-left": return 0.15;
      case "top-right": return 0.25;
      case "bottom-left": return 0.2;
      case "bottom-right": return 0.12;
      case "left": return 0.18;
      case "right": return 0.22;
      default: return 0.2;
    }
  };

  const parallax = useParallax({ 
    speed: parallaxSpeed ?? getDefaultSpeed(), 
    direction: "vertical",
    maxOffset: 80 
  });

  const sizeClasses = {
    sm: "w-24 h-24 md:w-32 md:h-32",
    md: "w-32 h-32 md:w-48 md:h-48",
    lg: "w-48 h-48 md:w-64 md:h-64"
  };

  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "left": "top-1/2 -translate-y-1/2 left-0",
    "right": "top-1/2 -translate-y-1/2 right-0"
  };

  const baseTransforms = {
    "top-left": "",
    "top-right": "scaleX(-1)",
    "bottom-left": "scaleY(-1)",
    "bottom-right": "scale(-1)",
    "left": "scaleX(-1)",
    "right": ""
  };

  const parallaxStyle = enableParallax ? {
    transform: `${baseTransforms[position]} translateY(${parallax.y}px) rotate(${parallax.rotate}deg)`,
    transition: "transform 0.1s ease-out"
  } : {
    transform: baseTransforms[position]
  };

  return (
    <div 
      className={`absolute ${positionClasses[position]} ${sizeClasses[size]} pointer-events-none z-0 ${className}`}
      style={parallaxStyle}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full opacity-70">
        {/* Magnolia flowers */}
        <defs>
          <linearGradient id={`petalGradient-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(10, 35%, 85%)" />
            <stop offset="100%" stopColor="hsl(10, 35%, 72%)" />
          </linearGradient>
          <linearGradient id={`leafGradient-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(100, 25%, 55%)" />
            <stop offset="100%" stopColor="hsl(80, 25%, 42%)" />
          </linearGradient>
        </defs>
        
        {/* Large magnolia flower */}
        <g transform="translate(30, 30)">
          {/* Petals */}
          <ellipse cx="40" cy="20" rx="20" ry="35" fill={`url(#petalGradient-${position})`} opacity="0.9" transform="rotate(-30, 40, 40)" />
          <ellipse cx="60" cy="25" rx="18" ry="30" fill={`url(#petalGradient-${position})`} opacity="0.85" transform="rotate(15, 40, 40)" />
          <ellipse cx="35" cy="50" rx="22" ry="32" fill={`url(#petalGradient-${position})`} opacity="0.8" transform="rotate(-60, 40, 40)" />
          <ellipse cx="55" cy="55" rx="16" ry="28" fill={`url(#petalGradient-${position})`} opacity="0.75" transform="rotate(40, 40, 40)" />
          <ellipse cx="45" cy="35" rx="12" ry="20" fill="hsl(10, 40%, 78%)" opacity="0.9" />
          {/* Center */}
          <circle cx="45" cy="40" r="8" fill="hsl(40, 60%, 85%)" />
          <circle cx="45" cy="40" r="4" fill="hsl(40, 50%, 70%)" />
        </g>

        {/* Small flower */}
        <g transform="translate(120, 100)">
          <ellipse cx="15" cy="8" rx="8" ry="14" fill={`url(#petalGradient-${position})`} opacity="0.8" transform="rotate(-25, 15, 15)" />
          <ellipse cx="22" cy="10" rx="7" ry="12" fill={`url(#petalGradient-${position})`} opacity="0.75" transform="rotate(20, 15, 15)" />
          <ellipse cx="12" cy="20" rx="9" ry="13" fill={`url(#petalGradient-${position})`} opacity="0.7" transform="rotate(-50, 15, 15)" />
          <circle cx="17" cy="15" r="4" fill="hsl(40, 60%, 85%)" />
        </g>

        {/* Leaves */}
        <g transform="translate(80, 140)">
          <ellipse cx="20" cy="30" rx="8" ry="25" fill={`url(#leafGradient-${position})`} opacity="0.8" transform="rotate(-20, 20, 30)" />
          <ellipse cx="35" cy="25" rx="6" ry="20" fill={`url(#leafGradient-${position})`} opacity="0.7" transform="rotate(15, 35, 25)" />
          <ellipse cx="50" cy="35" rx="7" ry="22" fill={`url(#leafGradient-${position})`} opacity="0.75" transform="rotate(30, 50, 35)" />
        </g>

        {/* Branch/stem lines */}
        <path d="M 90 180 Q 70 140 85 100 Q 95 70 75 40" stroke="hsl(80, 20%, 50%)" strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M 95 170 Q 110 130 100 90" stroke="hsl(80, 20%, 50%)" strokeWidth="1.5" fill="none" opacity="0.4" />

        {/* Buds */}
        <g transform="translate(150, 50)">
          <ellipse cx="10" cy="15" rx="5" ry="10" fill="hsl(10, 30%, 80%)" opacity="0.7" />
          <ellipse cx="8" cy="12" rx="3" ry="8" fill="hsl(100, 20%, 50%)" opacity="0.6" transform="rotate(-15, 8, 12)" />
        </g>

        {/* Sparkle decorations */}
        <g fill="hsl(10, 35%, 72%)" opacity="0.6">
          <polygon points="170,20 172,25 177,27 172,29 170,34 168,29 163,27 168,25" className="animate-sparkle" />
          <polygon points="15,170 16,173 19,174 16,175 15,178 14,175 11,174 14,173" className="animate-sparkle" style={{ animationDelay: '0.5s' }} />
          <polygon points="180,140 181,143 184,144 181,145 180,148 179,145 176,144 179,143" className="animate-sparkle" style={{ animationDelay: '1s' }} />
        </g>
      </svg>
    </div>
  );
};

export default FloralDecoration;
