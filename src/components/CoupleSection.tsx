import { useEffect, useState } from "react";
import FloralDecoration from "./FloralDecoration";
import SparklesDecoration from "./SparklesDecoration";

const CoupleSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("couple-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="couple-section"
      className="py-24 bg-gradient-to-b from-cream via-warm-cream/50 to-cream relative overflow-hidden"
    >
      {/* Floral decorations */}
      <FloralDecoration position="left" size="sm" className="opacity-40" />
      <FloralDecoration position="right" size="sm" className="opacity-40" />
      
      <SparklesDecoration count={4} />

      <div className="container max-w-5xl mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <p className={`font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase transition-all duration-500 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}>
            Bismillahirrahmanirrahim
          </p>
          <h2 className={`font-script text-5xl md:text-6xl mb-6 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}>
            <span className="text-dusty-rose">Mempelai</span>
          </h2>
          <div className={`section-divider transition-all duration-500 delay-300 ${
            isVisible ? "opacity-100 w-24" : "opacity-0 w-0"
          }`} />
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Groom */}
          <div
            className={`text-center transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-x-0 rotate-0" : "opacity-0 -translate-x-12 -rotate-3"
            }`}
          >
            <div className="glass-card rounded-2xl p-8 touch-lift border-dusty-rose/20">
              <div className={`w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-dusty-rose to-mauve flex items-center justify-center transition-all duration-500 delay-400 ${
                isVisible ? "scale-100 rotate-0" : "scale-0 rotate-180"
              }`}>
                <span className="font-script text-5xl text-cream">O</span>
              </div>
              <h3 className={`font-elegant text-2xl md:text-3xl text-foreground mb-2 transition-all duration-500 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}>
                Oky Dwi Prasetyo, S.Kom
              </h3>
              <p className={`text-muted-foreground leading-relaxed transition-all duration-500 delay-600 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}>
                Putra kedua dari<br />
                <span className="text-foreground font-medium">(Alm.) Sulaiman</span><br />
                <span className="text-sage-green font-script text-xl">&</span><br />
                <span className="text-foreground font-medium">Suji Rahayu</span>
              </p>
            </div>
          </div>

          {/* Bride */}
          <div
            className={`text-center transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-x-0 rotate-0" : "opacity-0 translate-x-12 rotate-3"
            }`}
          >
            <div className="glass-card rounded-2xl p-8 touch-lift border-sage-green/20">
              <div className={`w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-sage-green to-olive-green flex items-center justify-center transition-all duration-500 delay-600 ${
                isVisible ? "scale-100 rotate-0" : "scale-0 -rotate-180"
              }`}>
                <span className="font-script text-5xl text-cream">M</span>
              </div>
              <h3 className={`font-elegant text-2xl md:text-3xl text-foreground mb-2 transition-all duration-500 delay-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}>
                Mita Berliana, S.Si, M.Si
              </h3>
              <p className={`text-muted-foreground leading-relaxed transition-all duration-500 delay-800 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}>
                Putri kedua dari<br />
                <span className="text-foreground font-medium">Agus Bambang Dwi Purwanto</span><br />
                <span className="text-dusty-rose font-script text-xl">&</span><br />
                <span className="text-foreground font-medium">Uchuda</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoupleSection;
