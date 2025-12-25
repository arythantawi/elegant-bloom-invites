import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import venue from "@/assets/venue.jpg";
import hero from "@/assets/hero-wedding.jpg";
import FloralDecoration from "./FloralDecoration";
import SparklesDecoration from "./SparklesDecoration";

gsap.registerPlugin(ScrollTrigger);

interface PhotoProps {
  src: string;
  alt: string;
  className?: string;
}

const Photo = ({ src, alt, className = "" }: PhotoProps) => {
  return (
    <div className={`relative group overflow-hidden rounded-2xl shadow-card ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
  );
};

const GallerySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
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

      if (gridRef.current) {
        const photos = gridRef.current.querySelectorAll('.photo-item');
        gsap.from(photos, {
          y: 40, scale: 0.95, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 85%", toggleActions: "play none none none" },
        });
      }

      if (paletteRef.current) {
        const colors = paletteRef.current.querySelectorAll('.color-item');
        gsap.from(colors, {
          scale: 0, opacity: 0, duration: 0.4, stagger: 0.1, ease: "back.out(2)",
          scrollTrigger: { trigger: paletteRef.current, start: "top 95%", toggleActions: "play none none none" },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const images = [
    { src: couple1, alt: "Oky dan Mita - Foto 1" },
    { src: couple2, alt: "Oky dan Mita - Foto 2" },
    { src: venue, alt: "Venue pernikahan" },
    { src: hero, alt: "Dekorasi pernikahan" },
  ];

  return (
    <section ref={sectionRef} id="gallery-section" className="py-24 bg-gradient-to-b from-cream via-blush-pink/20 to-cream relative overflow-hidden">
      <FloralDecoration position="top-left" size="md" className="opacity-60" variant={1} />
      <FloralDecoration position="bottom-right" size="md" className="opacity-60" variant={2} />
      <SparklesDecoration count={5} />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p ref={headerRef} className="font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase">Momen Bahagia</p>
          <h2 ref={titleRef} className="font-script text-5xl md:text-6xl mb-6">
            <span className="text-sage-green">Galeri</span> <span className="text-dusty-rose">Kami</span>
          </h2>
          <div ref={dividerRef} className="section-divider w-24 mx-auto" />
        </div>

        <div ref={gridRef} className="grid grid-cols-12 gap-6 max-w-4xl mx-auto">
          <div className="photo-item col-span-5"><Photo src={images[1].src} alt={images[1].alt} className="h-48 md:h-56" /></div>
          <div className="photo-item col-span-5"><Photo src={images[2].src} alt={images[2].alt} className="h-48 md:h-52" /></div>
          <div className="photo-item col-span-4 flex justify-center items-center"><Photo src={images[3].src} alt={images[3].alt} className="w-32 h-32 md:w-40 md:h-40" /></div>
          <div className="photo-item col-span-4"><Photo src={hero} alt="Bouquet" className="h-32 md:h-40" /></div>
          <div className="photo-item col-span-4"><Photo src={venue} alt="Table setting" className="h-32 md:h-40" /></div>
        </div>

        <div ref={paletteRef} className="flex items-center justify-center gap-3 mt-12">
          <div className="color-item w-10 h-10 rounded-lg bg-dusty-rose shadow-sm touch-bounce" />
          <div className="color-item w-10 h-10 rounded-lg bg-soft-taupe shadow-sm touch-bounce" />
          <div className="color-item w-10 h-10 rounded-lg bg-sage-green shadow-sm touch-bounce" />
          <div className="color-item w-10 h-10 rounded-lg bg-olive-green shadow-sm touch-bounce" />
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
