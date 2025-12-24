import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import ConfettiEffect from "./ConfettiEffect";
import couplePrewedding from "@/assets/couple-prewedding.png";

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
    
    // Trigger confetti after flap starts opening
    setTimeout(() => {
      setShowConfetti(true);
    }, 400);
    
    // After flap opens, slide up the card
    setTimeout(() => {
      setIsFullyOpen(true);
    }, 800);

    // Transition to main content
    setTimeout(() => {
      onOpen();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-b from-blush-pink via-soft-rose/50 to-cream-white flex items-center justify-center overflow-hidden">
      {/* Confetti Effect */}
      <ConfettiEffect isActive={showConfetti} />
      
      {/* Background Photo with overlay */}
      <div className="absolute inset-0">
        <img 
          src={couplePrewedding} 
          alt="Couple Prewedding" 
          className="w-full h-full object-cover opacity-40 animate-scale-in"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream-white/60 via-blush-pink/40 to-cream-white/80" />
      </div>
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-warm-blush/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-soft-rose/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.3s' }} />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-blush-pink/50 rounded-full blur-2xl animate-float" />
        
        {/* Sparkle decorations */}
        {[...Array(8)].map((_, i) => (
          <Sparkles
            key={`sparkle-${i}`}
            className="absolute text-warm-blush/50 animate-twinkle"
            style={{
              left: `${5 + i * 12}%`,
              top: `${10 + (i % 4) * 22}%`,
              width: `${14 + (i % 3) * 6}px`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
        
        {/* Floating Hearts */}
        {[...Array(6)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-warm-blush/40 animate-float"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              width: `${16 + (i % 3) * 8}px`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Envelope Container */}
      <div className="relative" style={{ perspective: "1000px" }}>
        {/* Envelope Body */}
        <div
          className={`relative w-[320px] h-[220px] md:w-[400px] md:h-[280px] transition-all duration-1000 ${
            isFullyOpen ? "opacity-0 scale-90" : "opacity-100 scale-100"
          }`}
        >
          {/* Back of envelope */}
          <div className="absolute inset-0 bg-gradient-to-b from-cream-white to-blush-pink rounded-lg shadow-card" />

          {/* Envelope pocket (bottom part) */}
          <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-cream-white rounded-b-lg border-t-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-soft-rose/30 to-transparent" />
          </div>

          {/* Side flaps shadow effect */}
          <div className="absolute top-0 left-0 w-0 h-0 border-l-[160px] md:border-l-[200px] border-b-[110px] md:border-b-[140px] border-l-transparent border-b-soft-rose/20" />
          <div className="absolute top-0 right-0 w-0 h-0 border-r-[160px] md:border-r-[200px] border-b-[110px] md:border-b-[140px] border-r-transparent border-b-soft-rose/20" />

          {/* Top Flap */}
          <div
            className={`absolute top-0 left-0 right-0 origin-top transition-transform duration-700 ease-in-out ${
              isOpening ? "[transform:rotateX(180deg)]" : "[transform:rotateX(0deg)]"
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front of flap */}
            <div
              className="absolute w-full bg-cream-white"
              style={{
                clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                height: "140px",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blush-pink/50 to-soft-rose/30" />
            </div>
            {/* Back of flap */}
            <div
              className="absolute w-full bg-soft-rose/50"
              style={{
                clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                height: "140px",
                backfaceVisibility: "hidden",
                transform: "rotateX(180deg)",
              }}
            />
          </div>

          {/* Wax Seal */}
          <div
            className={`absolute top-[100px] md:top-[120px] left-1/2 -translate-x-1/2 z-20 transition-all duration-500 ${
              isOpening ? "opacity-0 scale-0" : "opacity-100 scale-100"
            }`}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-warm-blush to-accent rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-8 h-8 md:w-10 md:h-10 text-cream-white fill-cream-white" />
            </div>
          </div>

          {/* Invitation Card (slides up when opened) */}
          <div
            className={`absolute left-[10%] right-[10%] bg-card rounded-lg shadow-soft transition-all duration-700 ease-out ${
              isOpening
                ? "bottom-[80%] opacity-100"
                : "bottom-[20%] opacity-0"
            }`}
            style={{
              height: "200px",
              transitionDelay: isOpening ? "500ms" : "0ms",
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase mb-2">
                The Wedding of
              </p>
              <h2 className="font-display text-2xl md:text-3xl text-foreground">
                Oky & Mita
              </h2>
              <div className="w-12 h-px bg-warm-blush my-3" />
              <p className="text-sm text-muted-foreground">
                16 - 17 Januari 2026
              </p>
            </div>
          </div>
        </div>

        {/* Open Button */}
        {!isOpening && (
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 animate-fade-up">
            <button
              onClick={handleOpen}
              className="group relative px-8 py-4 bg-warm-blush hover:bg-accent text-foreground font-medium rounded-full shadow-soft hover:shadow-glow transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Buka Undangan
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-soft-rose to-warm-blush opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        )}
      </div>

      {/* Couple names header */}
      <div className="absolute top-8 left-0 right-0 text-center animate-fade-up">
        <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-1">The Wedding of</p>
        <h1 className="font-display text-3xl md:text-4xl text-foreground animate-shimmer">
          Oky & Mita
        </h1>
        <p className="mt-2 text-sm text-muted-foreground tracking-wide">16 - 17 Januari 2026</p>
      </div>

      {/* Names text at bottom */}
      <div className="absolute bottom-8 left-0 right-0 text-center animate-fade-up" style={{ animationDelay: '0.5s' }}>
        <p className="text-sm text-muted-foreground tracking-widest">
          Kepada Yth: <span className="font-medium text-foreground">{guestName || "Tamu Undangan"}</span>
        </p>
      </div>

      {/* Fade out overlay */}
      <div
        className={`absolute inset-0 bg-cream-white transition-opacity duration-700 ${
          isFullyOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
    </div>
  );
};

export default EnvelopeOpening;
