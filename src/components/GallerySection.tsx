import { useEffect, useState } from "react";
import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import venue from "@/assets/venue.jpg";
import hero from "@/assets/hero-wedding.jpg";

const GallerySection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("gallery-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const images = [
    { src: couple1, alt: "Sarah dan Michael - Foto 1" },
    { src: couple2, alt: "Sarah dan Michael - Foto 2" },
    { src: venue, alt: "Venue pernikahan" },
    { src: hero, alt: "Dekorasi pernikahan" },
  ];

  return (
    <section id="gallery-section" className="py-24 bg-cream-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <p className={`font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase transition-all duration-500 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}>
            Momen Bahagia
          </p>
          <h2 className={`font-display text-4xl md:text-5xl text-foreground mb-6 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}>
            Galeri Kami
          </h2>
          <div className={`section-divider transition-all duration-500 delay-300 ${
            isVisible ? "opacity-100 w-24" : "opacity-0 w-0"
          }`} />
        </div>

        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl aspect-square touch-lift ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              } transition-all duration-500 ${
                isVisible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-90 rotate-2"
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                  isVisible ? "scale-100" : "scale-125"
                }`}
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-cream-white/50 rounded-xl transition-all duration-300" />
              
              {/* Hover overlay effect */}
              <div className={`absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4`}>
                <span className="text-cream-white text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  Lihat Foto
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
