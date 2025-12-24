import { useEffect, useState } from "react";
import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import venue from "@/assets/venue.jpg";
import hero from "@/assets/hero-wedding.jpg";
import frameGold from "@/assets/frame-gold.png";
import FloralDecoration from "./FloralDecoration";
import SparklesDecoration from "./SparklesDecoration";
interface FramedPhotoProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}
const FramedPhoto = ({
  src,
  alt,
  className = "",
  imageClassName = ""
}: FramedPhotoProps) => {};
const GallerySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      threshold: 0.1
    });
    const section = document.getElementById("gallery-section");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);
  const images = [{
    src: couple1,
    alt: "Oky dan Mita - Foto 1"
  }, {
    src: couple2,
    alt: "Oky dan Mita - Foto 2"
  }, {
    src: venue,
    alt: "Venue pernikahan"
  }, {
    src: hero,
    alt: "Dekorasi pernikahan"
  }];
  return <section id="gallery-section" className="py-24 bg-gradient-to-b from-cream via-blush-pink/20 to-cream relative overflow-hidden">
      <FloralDecoration position="top-left" size="md" className="opacity-60" variant={1} />
      <FloralDecoration position="bottom-right" size="md" className="opacity-60" variant={2} />
      <SparklesDecoration count={5} />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <p className={`font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase transition-all duration-500 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}`}>
            Momen Bahagia
          </p>
          <h2 className={`font-script text-5xl md:text-6xl mb-6 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
            <span className="text-sage-green">Galeri</span>{" "}
            <span className="text-dusty-rose">Kami</span>
          </h2>
          <div className={`section-divider transition-all duration-500 delay-300 ${isVisible ? "opacity-100 w-24" : "opacity-0 w-0"}`} />
        </div>

        {/* Gallery Grid with Gold Frames */}
        <div className="grid grid-cols-12 gap-6 max-w-4xl mx-auto">
          {/* Large main image */}
          

          {/* Second photo */}
          <div className={`col-span-5 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}>
            <FramedPhoto src={images[1].src} alt={images[1].alt} className="h-48 md:h-56" />
          </div>

          {/* Third photo */}
          <div className={`col-span-5 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}>
            <FramedPhoto src={images[2].src} alt={images[2].alt} className="h-48 md:h-52" />
          </div>

          {/* Fourth photo - square */}
          <div className={`col-span-4 flex justify-center items-center transition-all duration-700 delay-600 ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}>
            <FramedPhoto src={images[3].src} alt={images[3].alt} className="w-32 h-32 md:w-40 md:h-40" />
          </div>

          {/* Additional decorative photos */}
          <div className={`col-span-4 transition-all duration-700 delay-700 ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}>
            <FramedPhoto src={hero} alt="Bouquet" className="h-32 md:h-40" />
          </div>

          <div className={`col-span-4 transition-all duration-700 delay-800 ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}>
            <FramedPhoto src={venue} alt="Table setting" className="h-32 md:h-40" />
          </div>
        </div>

        {/* Color palette */}
        <div className={`flex items-center justify-center gap-3 mt-12 transition-all duration-700 delay-900 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="w-10 h-10 rounded-lg bg-dusty-rose shadow-sm touch-bounce" />
          <div className="w-10 h-10 rounded-lg bg-soft-taupe shadow-sm touch-bounce" />
          <div className="w-10 h-10 rounded-lg bg-sage-green shadow-sm touch-bounce" />
          <div className="w-10 h-10 rounded-lg bg-olive-green shadow-sm touch-bounce" />
        </div>
      </div>
    </section>;
};
export default GallerySection;