import { useEffect, useState } from "react";

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
      className="py-24 bg-gradient-to-b from-cream-white via-soft-rose/20 to-cream-white relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className={`absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blush-pink/30 to-transparent rounded-full blur-3xl transition-all duration-1000 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
      }`} />
      <div className={`absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-soft-rose/20 to-transparent rounded-full blur-3xl transition-all duration-1000 delay-200 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
      }`} />

      <div className="container max-w-5xl mx-auto px-4">
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
          <h2 className={`font-display text-4xl md:text-5xl text-foreground mb-6 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}>
            Mempelai
          </h2>
          <div className={`section-divider transition-all duration-500 delay-300 ${
            isVisible ? "opacity-100 w-24" : "opacity-0 w-0"
          }`} />
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-8">
          {/* Groom */}
          <div
            className={`text-center transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-x-0 rotate-0" : "opacity-0 -translate-x-12 -rotate-3"
            }`}
          >
            <div className="glass-card rounded-2xl p-8 touch-lift">
              <div className={`w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blush-pink to-warm-blush flex items-center justify-center transition-all duration-500 delay-400 ${
                isVisible ? "scale-100 rotate-0" : "scale-0 rotate-180"
              }`}>
                <span className="font-display text-5xl text-cream-white">O</span>
              </div>
              <h3 className={`font-display text-3xl text-foreground mb-2 transition-all duration-500 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}>
                Oky Dwi Prasetyo, S.Kom
              </h3>
              <p className={`text-muted-foreground leading-relaxed transition-all duration-500 delay-600 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}>
                Putra kedua dari<br />
                <span className="text-foreground font-medium">(Alm.) Sulaiman</span><br />
                <span className="text-accent">&</span><br />
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
            <div className="glass-card rounded-2xl p-8 touch-lift">
              <div className={`w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-soft-rose to-accent flex items-center justify-center transition-all duration-500 delay-600 ${
                isVisible ? "scale-100 rotate-0" : "scale-0 -rotate-180"
              }`}>
                <span className="font-display text-5xl text-cream-white">M</span>
              </div>
              <h3 className={`font-display text-3xl text-foreground mb-2 transition-all duration-500 delay-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}>
                Mita Berliana, S.Si, M.Si
              </h3>
              <p className={`text-muted-foreground leading-relaxed transition-all duration-500 delay-800 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}>
                Putri kedua dari<br />
                <span className="text-foreground font-medium">Agus Bambang Dwi Purwanto</span><br />
                <span className="text-accent">&</span><br />
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
