import { useEffect, useRef, useState } from "react";
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
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Swaying animation on scroll
  useEffect(() => {
    const animStart = () => {
      if (!isActive) {
        setIsActive(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setIsActive(false);
        }, 10000);
      }
    };

    const handleScroll = () => animStart();
    const handleResize = () => animStart();

    document.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    // Initial animation
    animStart();

    return () => {
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isActive]);

  const galleryImages = [
    { src: couple1, alt: "Oky dan Mita - Foto 1", caption: "Our First Meeting" },
    { src: couple2, alt: "Oky dan Mita - Foto 2", caption: "Love Blossoms" },
    { src: couplePrewedding, alt: "Pre-wedding", caption: "Pre-Wedding" },
    { src: venue, alt: "Venue pernikahan", caption: "Our Special Day" },
    { src: hero, alt: "Dekorasi pernikahan", caption: "Beautiful Moments" },
    { src: couple1, alt: "Oky dan Mita - Foto 3", caption: "Together Forever" },
    { src: couple2, alt: "Oky dan Mita - Foto 4", caption: "Sweet Memories" },
    { src: couplePrewedding, alt: "Pre-wedding 2", caption: "Happiness" },
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
        <div className="text-center mb-12">
          <p ref={headerRef} className="font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase">
            Momen Bahagia
          </p>
          <h2 ref={titleRef} className="font-script text-5xl md:text-6xl mb-6">
            <span className="text-sage-green">Galeri</span>{" "}
            <span className="text-dusty-rose">Kami</span>
          </h2>
          <div ref={dividerRef} className="section-divider w-24 mx-auto" />
        </div>

        {/* Swaying Photo Gallery */}
        <div 
          ref={galleryRef}
          className={`swaying-gallery ${isActive ? 'active' : ''}`}
        >
          {galleryImages.map((image, index) => (
            <figure 
              key={index}
              className="swaying-figure"
              style={{
                '--index': index,
              } as React.CSSProperties}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
              />
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>

        {/* Hint */}
        <p className="text-center text-muted-foreground text-sm mt-8">
          ✨ Scroll untuk melihat efek bergoyang
        </p>
      </div>
    </section>
  );
};

export default GallerySection;
