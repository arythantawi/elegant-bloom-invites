import { useEffect, useState } from "react";
import { Heart, Instagram, Mail } from "lucide-react";

const FooterSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("footer-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <footer id="footer-section" className="py-16 bg-foreground text-cream-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-warm-blush/50 to-transparent transition-all duration-1000 ${
        isVisible ? "opacity-100 w-full" : "opacity-0 w-0"
      }`} />

      <div className="container max-w-4xl mx-auto px-4 text-center">
        {/* Names */}
        <h2 className={`font-display text-4xl md:text-5xl mb-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
        }`}>
          Oky & Mita
        </h2>

        <p className={`text-cream-white/60 mb-8 font-display text-xl italic transition-all duration-700 delay-100 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}>
          16 - 17 Januari 2026
        </p>

        {/* Quote */}
        <blockquote className={`max-w-lg mx-auto mb-10 transition-all duration-700 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <p className="text-cream-white/80 italic leading-relaxed">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang."
          </p>
          <cite className={`block mt-4 text-warm-blush text-sm transition-all duration-500 delay-400 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>— QS. Ar-Rum: 21</cite>
        </blockquote>

        {/* Social Links */}
        <div className={`flex items-center justify-center gap-6 mb-10 transition-all duration-700 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}>
          <a
            href="#"
            className={`w-12 h-12 rounded-full bg-cream-white/10 hover:bg-warm-blush/30 flex items-center justify-center touch-bounce transition-all duration-500 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="mailto:oky.mita@wedding.com"
            className={`w-12 h-12 rounded-full bg-cream-white/10 hover:bg-warm-blush/30 flex items-center justify-center touch-bounce transition-all duration-500 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Divider */}
        <div className={`w-24 h-px bg-gradient-to-r from-transparent via-warm-blush/50 to-transparent mx-auto mb-8 transition-all duration-500 delay-400 ${
          isVisible ? "opacity-100 w-24" : "opacity-0 w-0"
        }`} />

        {/* Copyright */}
        <p className={`text-cream-white/40 text-sm flex items-center justify-center gap-2 transition-all duration-500 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          Made with <Heart className="w-4 h-4 text-warm-blush fill-warm-blush animate-pulse" /> by Oky & Mita
        </p>
        <p className={`text-cream-white/30 text-xs mt-2 transition-all duration-500 delay-600 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          © 2026 All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
