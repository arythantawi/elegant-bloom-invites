import React from "react";

interface SparkleProps {
  className?: string;
  size?: number;
}

const Sparkle = ({ className = "", size = 16 }: SparkleProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`text-dusty-rose animate-sparkle ${className}`}
  >
    <polygon points="12,2 14,10 22,12 14,14 12,22 10,14 2,12 10,10" />
  </svg>
);

interface SparklesDecorationProps {
  count?: number;
  className?: string;
}

const SparklesDecoration = ({ count = 5, className = "" }: SparklesDecorationProps) => {
  const positions = [
    { top: "10%", left: "5%", delay: "0s", size: 12 },
    { top: "15%", right: "8%", delay: "0.5s", size: 16 },
    { top: "25%", left: "15%", delay: "1s", size: 10 },
    { top: "30%", right: "12%", delay: "0.3s", size: 14 },
    { top: "45%", left: "3%", delay: "0.7s", size: 11 },
    { top: "60%", right: "5%", delay: "0.2s", size: 13 },
    { top: "75%", left: "10%", delay: "0.8s", size: 15 },
    { top: "85%", right: "15%", delay: "0.4s", size: 12 },
  ];

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {positions.slice(0, count).map((pos, index) => (
        <div
          key={index}
          className="absolute opacity-40"
          style={{
            top: pos.top,
            left: pos.left,
            right: pos.right,
            animationDelay: pos.delay,
          }}
        >
          <Sparkle size={pos.size} />
        </div>
      ))}
    </div>
  );
};

export { Sparkle, SparklesDecoration };
export default SparklesDecoration;
