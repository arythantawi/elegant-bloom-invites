import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-wedding.jpg";

interface HeroSectionProps {
  guestName?: string;
}

const HeroSection = ({ guestName }: HeroSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Beautiful wedding floral arrangement"
          className={`w-full h-full object-cover transition-all duration-1500 ${
            isVisible ? "scale-100 opacity-100" : "scale-110 opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blush-pink/60 via-cream-white/40 to-cream-white" />
      </div>

      {/* Decorative Elements */}
      <div className={`absolute top-10 left-10 w-32 h-32 border border-warm-blush/30 rounded-full animate-float opacity-50 transition-all duration-1000 delay-500 ${
        isVisible ? "opacity-50 scale-100" : "opacity-0 scale-0"
      }`} />
      <div className={`absolute bottom-20 right-10 w-24 h-24 border border-soft-rose/40 rounded-full animate-float delay-300 transition-all duration-1000 delay-700 ${
        isVisible ? "opacity-40 scale-100" : "opacity-0 scale-0"
      }`} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Ornament */}
          <p className={`font-display text-lg tracking-[0.3em] text-muted-foreground mb-6 uppercase transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}>
            The Wedding of
          </p>

          {/* Names */}
          <h1 className={`font-display text-5xl md:text-7xl lg:text-8xl font-light text-foreground mb-4 transition-all duration-700 delay-300 touch-pulse ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}>
            Oky
          </h1>
          <div className={`flex items-center justify-center gap-6 my-4 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}>
            <div className={`w-16 md:w-24 h-px bg-warm-blush transition-all duration-700 delay-500 ${
              isVisible ? "w-16 md:w-24" : "w-0"
            }`} />
            <span className="font-display text-3xl md:text-4xl text-accent italic animate-pulse-soft">&</span>
            <div className={`w-16 md:w-24 h-px bg-warm-blush transition-all duration-700 delay-500 ${
              isVisible ? "w-16 md:w-24" : "w-0"
            }`} />
          </div>
          <h1 className={`font-display text-5xl md:text-7xl lg:text-8xl font-light text-foreground mb-8 transition-all duration-700 delay-500 touch-pulse ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}>
            Mita
          </h1>

          {/* Date */}
          <div
            className={`transition-all duration-700 delay-600 ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
            }`}
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-card/60 backdrop-blur-sm border border-border/50 shadow-soft touch-lift">
              <span className="font-display text-xl md:text-2xl text-foreground">
                16 - 17 Januari 2026
              </span>
            </div>
          </div>

          {/* Guest Name */}
          {guestName && (
            <div className={`mt-8 transition-all duration-700 delay-700 ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
            }`}>
              <p className="text-muted-foreground text-sm tracking-widest uppercase mb-2">Kepada Yth.</p>
              <p className="font-display text-2xl md:text-3xl text-foreground touch-pulse">
                {guestName}
              </p>
            </div>
          )}
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground touch-bounce cursor-pointer">
            <span className="text-sm tracking-widest uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-warm-blush to-transparent animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
