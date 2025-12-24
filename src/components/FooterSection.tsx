import { Heart, Instagram, Mail } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="py-16 bg-foreground text-cream-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-warm-blush/50 to-transparent" />

      <div className="container max-w-4xl mx-auto px-4 text-center">
        {/* Names */}
        <h2 className="font-display text-4xl md:text-5xl mb-4">
          Sarah & Michael
        </h2>

        <p className="text-cream-white/60 mb-8 font-display text-xl italic">
          14 Februari 2025
        </p>

        {/* Quote */}
        <blockquote className="max-w-lg mx-auto mb-10">
          <p className="text-cream-white/80 italic leading-relaxed">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang."
          </p>
          <cite className="block mt-4 text-warm-blush text-sm">— QS. Ar-Rum: 21</cite>
        </blockquote>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 mb-10">
          <a
            href="#"
            className="w-12 h-12 rounded-full bg-cream-white/10 hover:bg-warm-blush/30 flex items-center justify-center transition-colors duration-300"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="mailto:sarah.michael@wedding.com"
            className="w-12 h-12 rounded-full bg-cream-white/10 hover:bg-warm-blush/30 flex items-center justify-center transition-colors duration-300"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Divider */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-warm-blush/50 to-transparent mx-auto mb-8" />

        {/* Copyright */}
        <p className="text-cream-white/40 text-sm flex items-center justify-center gap-2">
          Made with <Heart className="w-4 h-4 text-warm-blush fill-warm-blush" /> by Sarah & Michael
        </p>
        <p className="text-cream-white/30 text-xs mt-2">
          © 2025 All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
