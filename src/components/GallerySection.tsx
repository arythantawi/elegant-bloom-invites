import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import venue from "@/assets/venue.jpg";
import hero from "@/assets/hero-wedding.jpg";
import FloralDecoration from "./FloralDecoration";
import SparklesDecoration from "./SparklesDecoration";
import { Gallery3DScene } from "./Gallery3D";

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
      // Header animations
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

      // 3D Gallery container animation
      if (galleryContainerRef.current) {
        gsap.from(galleryContainerRef.current, {
          y: 50,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // Color palette animation
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
    { src: venue, alt: "Venue pernikahan" },
    { src: hero, alt: "Dekorasi pernikahan" },
    { src: hero, alt: "Bouquet" },
    { src: venue, alt: "Table setting" },
  ];

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

        {/* 3D Floating Tiles Gallery */}
        <div 
          ref={galleryContainerRef}
          className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-cream/50 via-blush-pink/10 to-sage-green/10 backdrop-blur-sm border border-dusty-rose/10"
        >
          <Gallery3DScene images={galleryImages} />
          
          {/* Instruction hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-muted-foreground/70 flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
            <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <span>Gerakkan mouse untuk melihat efek 3D</span>
          </div>
        </div>

        {/* Color palette */}
        <div ref={paletteRef} className="flex items-center justify-center gap-3 mt-16">
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
