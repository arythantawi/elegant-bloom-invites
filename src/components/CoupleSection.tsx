import { useEffect, useState } from "react";
import FloralDecoration from "./FloralDecoration";
import JavaneseOrnament from "./JavaneseOrnament";
import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";

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
      className="py-24 bg-gradient-to-b from-cream via-dusty-pink/20 to-cream relative overflow-hidden"
    >
      {/* Floral decorations */}
      <FloralDecoration position="left" size="md" className="opacity-50" />
      <FloralDecoration position="right" size="md" className="opacity-50" />

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
          <h2 className={`font-script text-5xl md:text-6xl mb-6 text-burgundy transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}>
            Mempelai
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
            <div className="glass-card rounded-2xl p-8 touch-lift border-burgundy/20 bg-gradient-to-b from-cream to-dusty-pink/20">
              {/* Portrait */}
              <div className="relative w-36 h-44 mx-auto mb-6">
                <div className="absolute inset-0 rounded-[50%] border-4 border-burgundy" />
                <div className="absolute inset-2 rounded-[50%] border border-burgundy/30" />
                <div className="absolute inset-3 rounded-[50%] overflow-hidden">
                  <img 
                    src={couple2}
                    alt="Oky" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <JavaneseOrnament position="frame" className="max-w-[200px] mx-auto mb-4" />

              <h3 className={`font-script text-3xl md:text-4xl text-burgundy mb-2 transition-all duration-500 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}>
                Oky Dwi Prasetyo
              </h3>
              <p className="font-elegant text-lg text-foreground mb-4">S.Kom</p>
              <p className={`text-muted-foreground leading-relaxed font-display transition-all duration-500 delay-600 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}>
                Putra kedua dari<br />
                <span className="text-foreground font-medium">(Alm.) Sulaiman</span><br />
                <span className="text-mauve font-script text-xl">&</span><br />
                <span className="text-foreground font-medium">Suji Rahayu</span>
              </p>

              <div className="rotate-180 mt-4">
                <JavaneseOrnament position="frame" className="max-w-[200px] mx-auto" />
              </div>
            </div>
          </div>

          {/* Bride */}
          <div
            className={`text-center transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-x-0 rotate-0" : "opacity-0 translate-x-12 rotate-3"
            }`}
          >
            <div className="glass-card rounded-2xl p-8 touch-lift border-burgundy/20 bg-gradient-to-b from-cream to-dusty-pink/20">
              {/* Portrait */}
              <div className="relative w-36 h-44 mx-auto mb-6">
                <div className="absolute inset-0 rounded-[50%] border-4 border-burgundy" />
                <div className="absolute inset-2 rounded-[50%] border border-burgundy/30" />
                <div className="absolute inset-3 rounded-[50%] overflow-hidden">
                  <img 
                    src={couple1}
                    alt="Mita" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              <JavaneseOrnament position="frame" className="max-w-[200px] mx-auto mb-4" />

              <h3 className={`font-script text-3xl md:text-4xl text-burgundy mb-2 transition-all duration-500 delay-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}>
                Mita Berliana
              </h3>
              <p className="font-elegant text-lg text-foreground mb-4">S.Si, M.Si</p>
              <p className={`text-muted-foreground leading-relaxed font-display transition-all duration-500 delay-800 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}>
                Putri kedua dari<br />
                <span className="text-foreground font-medium">Agus Bambang Dwi Purwanto</span><br />
                <span className="text-burgundy font-script text-xl">&</span><br />
                <span className="text-foreground font-medium">Uchuda</span>
              </p>

              <div className="rotate-180 mt-4">
                <JavaneseOrnament position="frame" className="max-w-[200px] mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoupleSection;