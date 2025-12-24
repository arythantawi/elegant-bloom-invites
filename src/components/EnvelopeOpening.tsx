import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import ConfettiEffect from "./ConfettiEffect";
import couplePrewedding from "@/assets/couple-prewedding.png";
import FloralDecoration from "./FloralDecoration";

interface EnvelopeOpeningProps {
  onOpen: () => void;
  guestName?: string;
}

const EnvelopeOpening = ({ onOpen, guestName }: EnvelopeOpeningProps) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isFullyOpen, setIsFullyOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => setShowConfetti(true), 400);
    setTimeout(() => setIsFullyOpen(true), 800);
    setTimeout(() => onOpen(), 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-b from-cream via-warm-cream to-cream flex items-center justify-center overflow-hidden">
      <ConfettiEffect isActive={showConfetti} />
      
      {/* Background Photo */}
      <div className="absolute inset-0">
        <img src={couplePrewedding} alt="Couple Prewedding" className="w-full h-full object-cover opacity-30 animate-scale-in" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/70 via-dusty-rose/20 to-cream/80" />
      </div>
      
      {/* Floral Decorations */}
      <FloralDecoration position="top-left" size="lg" className="opacity-50" />
      <FloralDecoration position="top-right" size="md" className="opacity-40" />
      <FloralDecoration position="bottom-left" size="md" className="opacity-40" />
      <FloralDecoration position="bottom-right" size="lg" className="opacity-50" />

      {/* Sparkles */}
      {[...Array(6)].map((_, i) => (
        <Sparkles key={i} className="absolute text-dusty-rose/40 animate-twinkle"
          style={{ left: `${10 + i * 15}%`, top: `${15 + (i % 3) * 25}%`, width: `${14 + (i % 3) * 6}px`, animationDelay: `${i * 0.3}s` }} />
      ))}

      {/* Envelope */}
      <div className="relative" style={{ perspective: "1000px" }}>
        <div className={`relative w-[320px] h-[220px] md:w-[400px] md:h-[280px] transition-all duration-1000 ${isFullyOpen ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-cream to-blush-pink rounded-lg shadow-card" />
          <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-cream rounded-b-lg"><div className="absolute inset-0 bg-gradient-to-t from-dusty-rose/20 to-transparent" /></div>
          <div className="absolute top-0 left-0 w-0 h-0 border-l-[160px] md:border-l-[200px] border-b-[110px] md:border-b-[140px] border-l-transparent border-b-dusty-rose/10" />
          <div className="absolute top-0 right-0 w-0 h-0 border-r-[160px] md:border-r-[200px] border-b-[110px] md:border-b-[140px] border-r-transparent border-b-dusty-rose/10" />

          {/* Top Flap */}
          <div className={`absolute top-0 left-0 right-0 origin-top transition-transform duration-700 ease-in-out ${isOpening ? "[transform:rotateX(180deg)]" : "[transform:rotateX(0deg)]"}`} style={{ transformStyle: "preserve-3d" }}>
            <div className="absolute w-full bg-cream" style={{ clipPath: "polygon(0 0, 50% 100%, 100% 0)", height: "140px", backfaceVisibility: "hidden" }}>
              <div className="absolute inset-0 bg-gradient-to-b from-blush-pink/40 to-dusty-rose/20" />
            </div>
            <div className="absolute w-full bg-dusty-rose/30" style={{ clipPath: "polygon(0 0, 50% 100%, 100% 0)", height: "140px", backfaceVisibility: "hidden", transform: "rotateX(180deg)" }} />
          </div>

          {/* Wax Seal */}
          <div className={`absolute top-[100px] md:top-[120px] left-1/2 -translate-x-1/2 z-20 transition-all duration-500 ${isOpening ? "opacity-0 scale-0" : "opacity-100 scale-100"}`}>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-dusty-rose to-mauve rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-8 h-8 md:w-10 md:h-10 text-cream fill-cream" />
            </div>
          </div>

          {/* Card */}
          <div className={`absolute left-[10%] right-[10%] bg-card rounded-lg shadow-soft transition-all duration-700 ease-out ${isOpening ? "bottom-[80%] opacity-100" : "bottom-[20%] opacity-0"}`} style={{ height: "200px", transitionDelay: isOpening ? "500ms" : "0ms" }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase mb-2 font-display">The Wedding of</p>
              <h2 className="font-script text-3xl md:text-4xl"><span className="text-dusty-rose">Oky</span> <span className="text-sage-green">&</span> <span className="text-dusty-rose">Mita</span></h2>
              <div className="w-12 h-px bg-gradient-to-r from-dusty-rose to-sage-green my-3" />
              <p className="text-sm text-muted-foreground font-display">16 - 17 Januari 2026</p>
            </div>
          </div>
        </div>

        {!isOpening && (
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 animate-fade-up">
            <button onClick={handleOpen} className="group relative px-8 py-4 bg-gradient-to-r from-dusty-rose to-mauve text-cream font-medium rounded-full shadow-soft hover:shadow-glow touch-bounce transition-all duration-300 font-display">
              <span className="flex items-center gap-2"><Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />Buka Undangan</span>
            </button>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="absolute top-8 left-0 right-0 text-center animate-fade-up">
        <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-1 font-display">The Wedding of</p>
        <h1 className="font-script text-4xl md:text-5xl"><span className="text-dusty-rose">Oky</span> <span className="text-sage-green">&</span> <span className="text-dusty-rose">Mita</span></h1>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center animate-fade-up" style={{ animationDelay: '0.5s' }}>
        <p className="text-sm text-muted-foreground tracking-widest font-display">Kepada Yth: <span className="font-script text-xl text-foreground">{guestName || "Tamu Undangan"}</span></p>
      </div>

      <div className={`absolute inset-0 bg-cream transition-opacity duration-700 ${isFullyOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} />
    </div>
  );
};

export default EnvelopeOpening;
