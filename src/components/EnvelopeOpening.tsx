import { useState } from "react";
import { Heart } from "lucide-react";
import ConfettiEffect from "./ConfettiEffect";
import JavaneseOrnament from "./JavaneseOrnament";
import FloralDecoration from "./FloralDecoration";

interface EnvelopeOpeningProps {
  onOpen: () => void;
  guestName?: string;
}

const EnvelopeOpening = ({ onOpen, guestName }: EnvelopeOpeningProps) => {
  const [isOpening, setIsOpening] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => setShowConfetti(true), 400);
    setTimeout(() => onOpen(), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      <ConfettiEffect isActive={showConfetti} />
      
      {/* Background gradient with temple backdrop effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-dusty-pink via-mauve-light/30 to-dusty-pink" />
      
      {/* Decorative background pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B4557' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Top ornamental arch */}
      <div className="absolute top-0 left-0 right-0">
        <JavaneseOrnament position="top" className="text-burgundy" />
      </div>

      {/* Bottom floral decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <JavaneseOrnament position="bottom" />
      </div>

      {/* Side floral decorations */}
      <FloralDecoration position="left" size="lg" className="opacity-60" />
      <FloralDecoration position="right" size="lg" className="opacity-60" />

      {/* Main content */}
      <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${
        isOpening ? "opacity-0 scale-90 translate-y-10" : "opacity-100 scale-100 translate-y-0"
      }`}>
        {/* Ornate frame around content */}
        <div className="relative max-w-sm mx-auto">
          {/* Frame decoration */}
          <JavaneseOrnament position="frame" className="mb-4" />

          {/* Main text content */}
          <div className="py-8">
            <p className="font-display text-lg tracking-[0.25em] text-burgundy uppercase mb-4 animate-fade-up">
              The Wedding Of
            </p>

            {/* Names with script font */}
            <div className="animate-fade-up delay-200">
              <h1 className="font-script text-6xl md:text-7xl text-burgundy mb-2">
                Oky
              </h1>
              <p className="font-elegant text-3xl text-mauve my-2">&</p>
              <h1 className="font-script text-6xl md:text-7xl text-burgundy">
                Mita
              </h1>
            </div>

            {/* Date */}
            <div className="mt-6 animate-fade-up delay-300">
              <p className="font-display text-lg text-muted-foreground tracking-wider">
                16 Januari 2026
              </p>
            </div>
          </div>

          {/* Bottom frame decoration (flipped) */}
          <div className="rotate-180">
            <JavaneseOrnament position="frame" className="mt-4" />
          </div>
        </div>

        {/* Guest name */}
        <div className="mt-8 animate-fade-up delay-400">
          <p className="text-sm text-muted-foreground tracking-widest uppercase font-display mb-2">
            Kepada Yth.
          </p>
          <p className="font-script text-3xl md:text-4xl text-burgundy">
            {guestName || "Tamu Undangan"}
          </p>
        </div>

        {/* Open button */}
        <div className="mt-10 animate-fade-up delay-500">
          <button
            onClick={handleOpen}
            className="btn-burgundy group flex items-center gap-3 mx-auto"
          >
            <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-display tracking-wider">Buka Undangan</span>
          </button>
        </div>
      </div>

      {/* Transition overlay */}
      <div className={`absolute inset-0 bg-cream transition-opacity duration-700 ${
        isOpening ? "opacity-100" : "opacity-0 pointer-events-none"
      }`} />
    </div>
  );
};

export default EnvelopeOpening;