import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import venue from "@/assets/venue.jpg";
import hero from "@/assets/hero-wedding.jpg";
import couplePrewedding from "@/assets/couple-prewedding.png";
import FloralDecoration from "./FloralDecoration";
import SparklesDecoration from "./SparklesDecoration";

gsap.registerPlugin(ScrollTrigger);

const GallerySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const galleryContainerRef = useRef<HTMLDivElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: -30, opacity: 0, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
      });

      gsap.from(titleRef.current, {
        scale: 0.9, opacity: 0, duration: 0.7, delay: 0.1, ease: "back.out(1.7)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
      });

      gsap.from(dividerRef.current, {
        width: 0, opacity: 0, duration: 0.6, delay: 0.2, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
      });

      if (galleryContainerRef.current) {
        gsap.from(galleryContainerRef.current, {
          y: 50, opacity: 0, scale: 0.95, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: galleryContainerRef.current, start: "top 85%", toggleActions: "play none none none" },
        });
      }

      if (paletteRef.current) {
        const colors = paletteRef.current.querySelectorAll('.color-item');
        gsap.from(colors, {
          scale: 0, opacity: 0, rotationY: 180, duration: 0.5, stagger: 0.1, ease: "back.out(2)",
          scrollTrigger: { trigger: paletteRef.current, start: "top 95%", toggleActions: "play none none none" },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const galleryImages = [
    { src: couple1, alt: "Oky dan Mita - Foto 1" },
    { src: couple2, alt: "Oky dan Mita - Foto 2" },
    { src: couplePrewedding, alt: "Pre-wedding" },
    { src: venue, alt: "Venue pernikahan" },
    { src: hero, alt: "Dekorasi pernikahan" },
  ];

  // Create 5 columns with duplicated images for infinite scroll
  const columns = Array.from({ length: 5 }, (_, colIndex) => {
    // Shuffle images differently for each column
    const shuffled = [...galleryImages].sort(() => Math.random() - 0.5);
    // Triple the images for seamless infinite scroll
    return [...shuffled, ...shuffled, ...shuffled];
  });

  return (
    <section 
      ref={sectionRef} 
      id="gallery-section" 
      className="py-24 bg-gradient-to-b from-cream via-blush-pink/20 to-cream relative overflow-hidden"
    >
      <FloralDecoration position="top-left" size="md" className="opacity-60" variant={1} />
      <FloralDecoration position="bottom-right" size="md" className="opacity-60" variant={2} />
      <SparklesDecoration count={5} />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <p ref={headerRef} className="font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase">
            Momen Bahagia
          </p>
          <h2 ref={titleRef} className="font-script text-5xl md:text-6xl mb-6">
            <span className="text-sage-green">Galeri</span>{" "}
            <span className="text-dusty-rose">Kami</span>
          </h2>
          <div ref={dividerRef} className="section-divider w-24 mx-auto" />
        </div>

        {/* Infinite Scroll Column Gallery */}
        <div 
          ref={galleryContainerRef}
          className="gallery-infinite-container relative max-w-4xl mx-auto h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-cream/50 via-blush-pink/10 to-sage-green/10 backdrop-blur-sm border border-dusty-rose/20"
        >
          <div className="flex h-full w-full">
            {columns.map((columnImages, colIndex) => (
              <div
                key={colIndex}
                className={`gallery-column flex-1 overflow-hidden relative ${
                  colIndex % 2 === 0 ? 'gallery-column-up' : 'gallery-column-down'
                }`}
                style={{
                  animationDuration: `${18 + colIndex * 3}s`,
                }}
              >
                <div className="flex flex-col">
                  {columnImages.map((image, imgIndex) => (
                    <div
                      key={`${colIndex}-${imgIndex}`}
                      className="gallery-item relative p-1"
                    >
                      <div className="w-full h-full overflow-hidden rounded-lg group cursor-pointer">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Gradient overlays for seamless effect */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-cream to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cream to-transparent pointer-events-none z-10" />
        </div>

        {/* Hint */}
        <p className="text-center text-muted-foreground text-sm mt-6">
          ✨ Hover untuk melihat lebih dekat
        </p>

        {/* Color palette */}
        <div ref={paletteRef} className="flex items-center justify-center gap-3 mt-10">
          <div className="color-item w-10 h-10 rounded-lg bg-dusty-rose shadow-sm touch-bounce cursor-pointer hover:scale-110 transition-transform" />
          <div className="color-item w-10 h-10 rounded-lg bg-soft-taupe shadow-sm touch-bounce cursor-pointer hover:scale-110 transition-transform" />
          <div className="color-item w-10 h-10 rounded-lg bg-sage-green shadow-sm touch-bounce cursor-pointer hover:scale-110 transition-transform" />
          <div className="color-item w-10 h-10 rounded-lg bg-olive-green shadow-sm touch-bounce cursor-pointer hover:scale-110 transition-transform" />
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
