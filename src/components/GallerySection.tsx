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

interface Photo3DProps {
  src: string;
  alt: string;
  className?: string;
  depth?: number;
}

const Photo3D = ({ src, alt, className = "", depth = 0 }: Photo3DProps) => {
  return (
    <div 
      className={`photo-3d relative group overflow-hidden rounded-2xl shadow-card ${className}`}
      data-depth={depth}
    >
      <div className="photo-inner w-full h-full">
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Reflection/shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};

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

      // 3D Parallax Gallery Effect
      if (galleryContainerRef.current) {
        const photos = galleryContainerRef.current.querySelectorAll('.photo-3d');
        
        // Initial entrance animation
        gsap.from(photos, {
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotationX: 15,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        // 3D Parallax on scroll - each photo moves at different speeds
        photos.forEach((photo, index) => {
          const depth = parseFloat(photo.getAttribute('data-depth') || '0');
          const direction = index % 2 === 0 ? 1 : -1;
          
          // Vertical parallax with depth
          gsap.to(photo, {
            y: () => depth * 100 * direction,
            z: () => depth * 50,
            rotationY: () => depth * 5 * direction,
            rotationX: () => depth * 3,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });

          // Scale effect based on scroll position
          gsap.to(photo, {
            scale: 1 + depth * 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: photo,
              start: "top bottom",
              end: "center center",
              scrub: 1,
            },
          });
        });

        // Rotate entire gallery container slightly on scroll
        gsap.to(galleryContainerRef.current, {
          rotationY: 5,
          rotationX: -3,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
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
    { src: couple1, alt: "Oky dan Mita - Foto 1", depth: 0.3, size: "large" },
    { src: couple2, alt: "Oky dan Mita - Foto 2", depth: 0.6, size: "medium" },
    { src: venue, alt: "Venue pernikahan", depth: 0.2, size: "medium" },
    { src: hero, alt: "Dekorasi pernikahan", depth: 0.5, size: "small" },
    { src: hero, alt: "Bouquet", depth: 0.4, size: "medium" },
    { src: venue, alt: "Table setting", depth: 0.7, size: "small" },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="gallery-section" 
      className="py-24 bg-gradient-to-b from-cream via-blush-pink/20 to-cream relative overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      <FloralDecoration position="top-left" size="md" className="opacity-60" variant={1} />
      <FloralDecoration position="bottom-right" size="md" className="opacity-60" variant={2} />
      <SparklesDecoration count={5} />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p ref={headerRef} className="font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase">
            Momen Bahagia
          </p>
          <h2 ref={titleRef} className="font-script text-5xl md:text-6xl mb-6">
            <span className="text-sage-green">Galeri</span>{" "}
            <span className="text-dusty-rose">Kami</span>
          </h2>
          <div ref={dividerRef} className="section-divider w-24 mx-auto" />
        </div>

        {/* 3D Gallery Grid */}
        <div 
          ref={galleryContainerRef}
          className="relative max-w-5xl mx-auto"
          style={{ 
            transformStyle: "preserve-3d",
            perspective: "1200px",
          }}
        >
          {/* Grid Layout */}
          <div className="grid grid-cols-12 gap-4 md:gap-6" style={{ transformStyle: "preserve-3d" }}>
            {/* Main large photo - front layer */}
            <div className="col-span-7 row-span-2" style={{ transformStyle: "preserve-3d" }}>
              <Photo3D 
                src={galleryImages[0].src} 
                alt={galleryImages[0].alt} 
                className="h-[320px] md:h-[420px]"
                depth={galleryImages[0].depth}
              />
            </div>

            {/* Top right photos */}
            <div className="col-span-5" style={{ transformStyle: "preserve-3d" }}>
              <Photo3D 
                src={galleryImages[1].src} 
                alt={galleryImages[1].alt} 
                className="h-[150px] md:h-[200px]"
                depth={galleryImages[1].depth}
              />
            </div>

            <div className="col-span-5" style={{ transformStyle: "preserve-3d" }}>
              <Photo3D 
                src={galleryImages[2].src} 
                alt={galleryImages[2].alt} 
                className="h-[150px] md:h-[200px]"
                depth={galleryImages[2].depth}
              />
            </div>

            {/* Bottom row */}
            <div className="col-span-4" style={{ transformStyle: "preserve-3d" }}>
              <Photo3D 
                src={galleryImages[3].src} 
                alt={galleryImages[3].alt} 
                className="h-[140px] md:h-[180px]"
                depth={galleryImages[3].depth}
              />
            </div>

            <div className="col-span-4" style={{ transformStyle: "preserve-3d" }}>
              <Photo3D 
                src={galleryImages[4].src} 
                alt={galleryImages[4].alt} 
                className="h-[140px] md:h-[180px]"
                depth={galleryImages[4].depth}
              />
            </div>

            <div className="col-span-4" style={{ transformStyle: "preserve-3d" }}>
              <Photo3D 
                src={galleryImages[5].src} 
                alt={galleryImages[5].alt} 
                className="h-[140px] md:h-[180px]"
                depth={galleryImages[5].depth}
              />
            </div>
          </div>

          {/* Floating decorative elements that also parallax */}
          <div 
            className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-dusty-rose/10 blur-xl parallax-bg"
            style={{ transform: "translateZ(-100px)" }}
          />
          <div 
            className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-sage-green/10 blur-xl parallax-bg"
            style={{ transform: "translateZ(-150px)" }}
          />
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
