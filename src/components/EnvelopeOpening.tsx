import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import ConfettiEffect from "./ConfettiEffect";
import FloralDecoration from "./FloralDecoration";

interface EnvelopeOpeningProps {
  onOpen: () => void;
  guestName?: string;
}

const EnvelopeOpening = ({
  onOpen,
  guestName
}: EnvelopeOpeningProps) => {
  const [isFullyOpen, setIsFullyOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Auto open after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(true);
      setTimeout(() => setIsFullyOpen(true), 800);
      setTimeout(() => onOpen(), 2500);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onOpen]);
  return <div className="fixed inset-0 z-[100] bg-gradient-to-b from-cream via-warm-cream to-cream flex items-center justify-center overflow-hidden">
      <ConfettiEffect isActive={showConfetti} />
      
      {/* Background Photo */}
      <div className="absolute inset-0">
        <img alt="Couple Prewedding" src="/lovable-uploads/5f8e9aca-8702-4aab-9742-01aed30d5f21.png" className="w-full h-full object-cover animate-scale-in opacity-100" />
        
      </div>
      
      {/* Floral Decorations */}
      <FloralDecoration position="top-left" size="lg" className="opacity-50" />
      <FloralDecoration position="top-right" size="md" className="opacity-40" />
      <FloralDecoration position="bottom-left" size="md" className="opacity-40" />
      <FloralDecoration position="bottom-right" size="lg" className="opacity-50" />

      {/* Sparkles */}
      {[...Array(6)].map((_, i) => <Sparkles key={i} className="absolute text-dusty-rose/40 animate-twinkle" style={{
      left: `${10 + i * 15}%`,
      top: `${15 + i % 3 * 25}%`,
      width: `${14 + i % 3 * 6}px`,
      animationDelay: `${i * 0.3}s`
    }} />)}

      {/* Envelope */}
      <div className="relative" style={{
        perspective: "1000px"
      }}>
      </div>

      {/* Header */}
      <div className="absolute top-8 left-0 right-0 text-center animate-fade-up">
        <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-1 font-display">The Wedding of</p>
        
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center animate-fade-up" style={{
      animationDelay: '0.5s'
    }}>
        <p className="text-sm text-muted-foreground tracking-widest font-display">Kepada Yth: <span className="font-script text-xl text-foreground">{guestName || "Tamu Undangan"}</span></p>
      </div>

      <div className={`absolute inset-0 bg-cream transition-opacity duration-700 ${isFullyOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} />
    </div>;
};
export default EnvelopeOpening;