import { useEffect, useState } from "react";
import coupleImage from "@/assets/couple-1.jpg";
import FloralDecoration from "./FloralDecoration";
import JavaneseOrnament from "./JavaneseOrnament";
import { Instagram } from "lucide-react";

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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dusty-pink via-cream to-dusty-pink/50" />
      
      {/* Decorative pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238B4557' fill-opacity='0.5'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0V0h2v14h2v-2h2v2h2V0h2v14h2v-2h2v2h2V0h2v14h4V0h2v18H20zm0 1V40h-2V21H0v-2h20zm2 0h18v2H22V40h-2V21.5zM0 22h2v2H0v-2zm4 0h2v2H4v-2zm4 0h2v2H8v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm4 4h18v2H24v-2zm0 4h18v2H24v-2zm0 4h18v2H24v-2z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Top ornamental decoration */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <JavaneseOrnament position="top" className="opacity-80" />
      </div>

      {/* Floral Decorations */}
      <FloralDecoration position="top-left" size="lg" className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-70 scale-100" : "opacity-0 scale-50"}`} />
      <FloralDecoration position="top-right" size="md" className={`transition-all duration-1000 delay-700 ${isVisible ? "opacity-60 scale-100" : "opacity-0 scale-50"}`} />
      <FloralDecoration position="bottom-left" size="lg" className={`transition-all duration-1000 delay-600 ${isVisible ? "opacity-70 scale-100" : "opacity-0 scale-50"}`} />
      <FloralDecoration position="bottom-right" size="lg" className={`transition-all duration-1000 delay-800 ${isVisible ? "opacity-70 scale-100" : "opacity-0 scale-50"}`} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-lg mx-auto py-20">
        {/* Title */}
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}>
          <p className="font-display text-lg tracking-[0.3em] text-burgundy uppercase mb-2">
            The Wedding Of
          </p>
        </div>

        {/* Oval Portrait Frame */}
        <div className={`relative mx-auto mb-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
          {/* Ornate oval frame */}
          <div className="relative w-56 h-72 md:w-64 md:h-80 mx-auto">
            {/* Decorative border layers */}
            <div className="absolute inset-0 rounded-[50%] border-4 border-burgundy" />
            <div className="absolute inset-2 rounded-[50%] border-2 border-burgundy/50" />
            <div className="absolute inset-4 rounded-[50%] border border-gold-accent/40" />
            
            {/* Photo container */}
            <div className="absolute inset-6 rounded-[50%] overflow-hidden shadow-burgundy">
              <img 
                src={coupleImage} 
                alt="Mita" 
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Corner decorations */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="w-8 h-8 border-t-4 border-l-4 border-r-4 border-burgundy rounded-t-full" />
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
              <div className="w-8 h-8 border-b-4 border-l-4 border-r-4 border-burgundy rounded-b-full" />
            </div>
          </div>
        </div>

        {/* Instagram handle */}
        <div className={`flex items-center justify-center gap-2 mb-6 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <Instagram className="w-4 h-4 text-burgundy" />
          <span className="text-sm text-muted-foreground font-display tracking-wider">@okymita</span>
        </div>

        {/* Name with decorative frame */}
        <div className={`mb-8 transition-all duration-700 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {/* Top frame line */}
          <JavaneseOrnament position="frame" className="mb-4 max-w-xs mx-auto" />
          
          <h1 className="font-script text-5xl md:text-6xl text-burgundy mb-2">
            Mita Berliana
          </h1>
          
          <p className="font-display text-base text-muted-foreground tracking-wide mt-4">
            Putri kedua dari
          </p>
          <p className="font-display text-lg text-foreground mt-2">
            Bapak Agus Bambang D.P & Ibu Uchuda
          </p>

          {/* Bottom frame line */}
          <div className="rotate-180 mt-4">
            <JavaneseOrnament position="frame" className="max-w-xs mx-auto" />
          </div>
        </div>

        {/* Action buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <button className="btn-burgundy font-display tracking-wider">
            Mempelai Pria
          </button>
          <button className="btn-burgundy font-display tracking-wider">
            Mempelai Wanita
          </button>
        </div>

        {/* Guest Name */}
        {guestName && (
          <div className={`mt-10 transition-all duration-700 delay-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <p className="text-muted-foreground text-sm tracking-widest uppercase mb-2 font-display">Kepada Yth.</p>
            <p className="font-script text-3xl md:text-4xl text-burgundy">
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
            <div className="w-px h-10 bg-gradient-to-b from-burgundy to-transparent animate-pulse" />
          </div>
        </div>
      </div>

      {/* Bottom floral decoration */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <JavaneseOrnament position="bottom" />
      </div>
    </section>
  );
};

export default HeroSection;