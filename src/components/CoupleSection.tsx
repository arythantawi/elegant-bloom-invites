import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloralDecoration from "./FloralDecoration";
import SparklesDecoration from "./SparklesDecoration";
import floralSide1 from "@/assets/floral-side-1.png";
import floralSide2 from "@/assets/floral-side-2.png";
import floralSide3 from "@/assets/floral-side-3.png";

gsap.registerPlugin(ScrollTrigger);

const CoupleSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const groomRef = useRef<HTMLDivElement>(null);
  const brideRef = useRef<HTMLDivElement>(null);
  const groomFloralsRef = useRef<HTMLDivElement>(null);
  const brideFloralsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.from(headerRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(titleRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.7,
        delay: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(dividerRef.current, {
        width: 0,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Groom card slide in from left with rotation
      gsap.from(groomRef.current, {
        x: -100,
        rotation: -5,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: groomRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Bride card slide in from right with rotation
      gsap.from(brideRef.current, {
        x: 100,
        rotation: 5,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: brideRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Groom florals
      if (groomFloralsRef.current) {
        const florals = groomFloralsRef.current.querySelectorAll('img');
        florals.forEach((floral, i) => {
          // Sway animation
          gsap.to(floral, {
            rotation: 2,
            x: 3,
            duration: 2.5 + i * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2,
          });
        });
      }

      // Bride florals
      if (brideFloralsRef.current) {
        const florals = brideFloralsRef.current.querySelectorAll('img');
        florals.forEach((floral, i) => {
          gsap.to(floral, {
            rotation: -2,
            x: -3,
            duration: 2.5 + i * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2,
          });
        });
      }

      // Avatar spin in
      const avatars = sectionRef.current?.querySelectorAll('.avatar');
      avatars?.forEach((avatar, i) => {
        gsap.from(avatar, {
          scale: 0,
          rotation: 180,
          opacity: 0,
          duration: 0.6,
          delay: 0.4 + i * 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: avatar,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="couple-section"
      className="py-24 bg-gradient-to-b from-cream via-warm-cream/50 to-cream relative overflow-hidden"
    >
      {/* Floral decorations */}
      <FloralDecoration position="left" size="sm" className="opacity-60" variant={3} />
      <FloralDecoration position="right" size="sm" className="opacity-60" variant={4} />
      
      <SparklesDecoration count={4} />

      <div className="container max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p ref={headerRef} className="font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase">
            Bismillahirrahmanirrahim
          </p>
          <h2 ref={titleRef} className="font-script text-5xl md:text-6xl mb-6">
            <span className="text-dusty-rose">Mempelai</span>
          </h2>
          <div ref={dividerRef} className="section-divider w-24 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Groom */}
          <div ref={groomRef} className="text-center relative">
            {/* Left side decorations */}
            <div ref={groomFloralsRef}>
              <img 
                src={floralSide1} 
                alt="" 
                className="absolute -left-8 md:-left-16 top-0 w-20 md:w-28 opacity-70 pointer-events-none"
              />
              <img 
                src={floralSide2} 
                alt="" 
                className="absolute -left-6 md:-left-12 bottom-8 w-16 md:w-24 opacity-60 pointer-events-none"
              />
              <img 
                src={floralSide3} 
                alt="" 
                className="absolute -left-4 md:-left-10 top-1/2 -translate-y-1/2 w-14 md:w-20 opacity-50 pointer-events-none"
              />
            </div>

            <div className="glass-card rounded-2xl p-8 touch-lift border-dusty-rose/20">
              <div className="avatar relative w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden border-4 border-dusty-rose/30 shadow-card">
                <div className="w-full h-full bg-gradient-to-br from-dusty-rose to-mauve flex items-center justify-center">
                  <span className="font-script text-4xl text-cream">O</span>
                </div>
              </div>
              <h3 className="font-elegant text-2xl md:text-3xl text-foreground mb-2">
                Oky Dwi Prasetyo, S.Kom
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Putra kedua dari<br />
                <span className="text-foreground font-medium">(Alm.) Sulaiman</span><br />
                <span className="text-sage-green font-script text-xl">&</span><br />
                <span className="text-foreground font-medium">Suji Rahayu</span>
              </p>
            </div>
          </div>

          {/* Bride */}
          <div ref={brideRef} className="text-center relative">
            {/* Right side decorations */}
            <div ref={brideFloralsRef}>
              <img 
                src={floralSide1} 
                alt="" 
                className="absolute -right-8 md:-right-16 top-0 w-20 md:w-28 opacity-70 pointer-events-none scale-x-[-1]"
              />
              <img 
                src={floralSide2} 
                alt="" 
                className="absolute -right-6 md:-right-12 bottom-8 w-16 md:w-24 opacity-60 pointer-events-none scale-x-[-1]"
              />
              <img 
                src={floralSide3} 
                alt="" 
                className="absolute -right-4 md:-right-10 top-1/2 -translate-y-1/2 w-14 md:w-20 opacity-50 pointer-events-none scale-x-[-1]"
              />
            </div>

            <div className="glass-card rounded-2xl p-8 touch-lift border-sage-green/20">
              <div className="avatar relative w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden border-4 border-sage-green/30 shadow-card">
                <div className="w-full h-full bg-gradient-to-br from-sage-green to-olive-green flex items-center justify-center">
                  <span className="font-script text-4xl text-cream">M</span>
                </div>
              </div>
              <h3 className="font-elegant text-2xl md:text-3xl text-foreground mb-2">
                Mita Berliana, S.Si, M.Si
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Putri kedua dari<br />
                <span className="text-foreground font-medium">Agus Bambang Dwi Purwanto</span><br />
                <span className="text-dusty-rose font-script text-xl">&</span><br />
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
