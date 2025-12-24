import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-wedding.jpg";
import coupleImage from "@/assets/couple-1.jpg";
import FloralDecoration from "./FloralDecoration";
import SparklesDecoration from "./SparklesDecoration";

interface HeroSectionProps {
  guestName?: string;
}

const HeroSection = ({ guestName }: HeroSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream">
      {/* Background with soft texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-warm-cream to-cream opacity-90" />
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, hsl(10, 35%, 72%, 0.15) 0%, transparent 50%),
                          radial-gradient(circle at 80% 30%, hsl(100, 20%, 50%, 0.1) 0%, transparent 40%),
                          radial-gradient(circle at 60% 80%, hsl(10, 35%, 72%, 0.1) 0%, transparent 45%)`
      }} />

      {/* Floral Decorations */}
      <FloralDecoration position="top-left" size="lg" className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-70 scale-100" : "opacity-0 scale-50"}`} />
      <FloralDecoration position="top-right" size="md" className={`transition-all duration-1000 delay-700 ${isVisible ? "opacity-60 scale-100" : "opacity-0 scale-50"}`} />
      <FloralDecoration position="bottom-left" size="md" className={`transition-all duration-1000 delay-600 ${isVisible ? "opacity-50 scale-100" : "opacity-0 scale-50"}`} />
      <FloralDecoration position="bottom-right" size="lg" className={`transition-all duration-1000 delay-800 ${isVisible ? "opacity-70 scale-100" : "opacity-0 scale-50"}`} />

      {/* Sparkle decorations */}
      <SparklesDecoration count={8} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-16">
        {/* Main Tagline - Like the poster */}
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}>
          <h1 className="font-script text-5xl md:text-7xl lg:text-8xl mb-4">
            <span className="text-dusty-rose">Dua Hati</span>
            {" "}
            <span className="text-sage-green">Satu Cerita</span>
          </h1>
        </div>

        {/* Date Badge */}
        <div className={`mb-6 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          <div className="inline-flex items-center gap-3 px-6 py-2 border-2 border-dusty-rose/40 rounded-lg bg-cream/80 backdrop-blur-sm">
            <span className="font-elegant text-lg md:text-xl text-foreground tracking-wider">
              16/01/2026
            </span>
          </div>
        </div>

        {/* Names */}
        <div className={`mb-10 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="font-display text-xl md:text-2xl text-muted-foreground tracking-[0.3em] uppercase">
            Oky Dwi Prasetyo & Mita Berliana
          </p>
        </div>

        {/* Photo Gallery Grid - Like the poster */}
        <div className={`grid grid-cols-12 gap-3 md:gap-4 max-w-3xl mx-auto mb-10 transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {/* Main large photo */}
          <div className="col-span-5 row-span-2">
            <div className="photo-frame photo-frame-rounded h-full overflow-hidden touch-lift">
              <img 
                src={coupleImage} 
                alt="Oky & Mita" 
                className="w-full h-full object-cover min-h-[200px] md:min-h-[300px]"
              />
            </div>
          </div>

          {/* Arch photo */}
          <div className="col-span-4">
            <div className="photo-frame photo-frame-arch h-32 md:h-40 overflow-hidden touch-lift">
              <img 
                src={heroImage} 
                alt="Wedding decoration" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Small square photo */}
          <div className="col-span-3">
            <div className="photo-frame photo-frame-rounded h-32 md:h-40 overflow-hidden touch-lift">
              <img 
                src={heroImage} 
                alt="Wedding detail" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Circle photo */}
          <div className="col-span-3">
            <div className="photo-frame photo-frame-circle w-24 h-24 md:w-28 md:h-28 mx-auto overflow-hidden touch-lift">
              <img 
                src={heroImage} 
                alt="Wedding rings" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bottom photos */}
          <div className="col-span-4">
            <div className="photo-frame photo-frame-rounded h-28 md:h-36 overflow-hidden touch-lift">
              <img 
                src={heroImage} 
                alt="Bouquet" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Color palette indicator */}
        <div className={`flex items-center justify-center gap-2 mb-8 transition-all duration-700 delay-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded bg-dusty-rose shadow-sm" />
          <div className="w-8 h-8 md:w-10 md:h-10 rounded bg-soft-taupe shadow-sm" />
          <div className="w-8 h-8 md:w-10 md:h-10 rounded bg-sage-green shadow-sm" />
          <div className="w-8 h-8 md:w-10 md:h-10 rounded bg-olive-green shadow-sm" />
        </div>

        {/* Guest Name */}
        {guestName && (
          <div className={`mt-8 transition-all duration-700 delay-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <p className="text-muted-foreground text-sm tracking-widest uppercase mb-2">Kepada Yth.</p>
            <p className="font-script text-3xl md:text-4xl text-dusty-rose">
              {guestName}
            </p>
          </div>
        )}

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <div className="flex flex-col items-center gap-2 text-muted-foreground touch-bounce cursor-pointer">
            <span className="text-xs tracking-widest uppercase font-display">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-dusty-rose to-transparent animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
