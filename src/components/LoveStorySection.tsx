import { useEffect, useState, useRef } from "react";
import FloralDecoration from "./FloralDecoration";
import SparklesDecoration from "./SparklesDecoration";
import LoveStoryScene from "./LoveStoryScene";

const LoveStorySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeScene, setActiveScene] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("love-story-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const milestones = [
    { 
      scene: 1 as const,
      year: "2020", 
      title: "Awal Pertemuan", 
      subtitle: "The First Meeting",
      description: "Di sebuah kafe hangat di Malang, takdir mempertemukan kami dalam sebuah acara komunitas media. Senyuman pertama yang bertukar menjadi awal dari segalanya.",
      color: "dusty-rose" 
    },
    { 
      scene: 2 as const,
      year: "2021", 
      title: "Perjalanan Cinta", 
      subtitle: "The Journey of Love",
      description: "Di tepi danau saat golden hour, Oky mengungkapkan perasaannya dengan tulus. Sebuah pengakuan cinta yang mengubah pertemanan menjadi sesuatu yang lebih indah.",
      color: "sage-green" 
    },
    { 
      scene: 3 as const,
      year: "2024", 
      title: "Kembali Bersama", 
      subtitle: "Reuniting and Proposal",
      description: "Setelah perjalanan panjang, di malam yang tenang dengan cahaya bulan sebagai saksi, Oky berlutut dengan sebuah cincin. Air mata bahagia mengalir saat Mita mengangguk.",
      color: "dusty-rose" 
    },
    { 
      scene: 4 as const,
      year: "2026", 
      title: "Hari Bahagia", 
      subtitle: "Wedding Day",
      description: "Di bawah lengkungan mawar dengan fairy lights berkelip, dua hati resmi menjadi satu. Kelopak bunga berjatuhan, menjadi saksi cinta yang abadi.",
      color: "sage-green" 
    },
  ];

  return (
    <section
      id="love-story-section"
      ref={sectionRef}
      className="py-24 bg-cream relative overflow-hidden"
    >
      {/* Decorative Background */}
      <FloralDecoration position="top-right" size="md" className="opacity-30" />
      <FloralDecoration position="bottom-left" size="md" className="opacity-30" />
      <SparklesDecoration count={6} />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <p className={`font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase transition-all duration-500 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}>
            Perjalanan Cinta Kami
          </p>
          <h2 className={`font-script text-5xl md:text-6xl mb-6 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}>
            <span className="text-dusty-rose">Kisah</span>{" "}
            <span className="text-sage-green">Kami</span>
          </h2>
          <div className={`section-divider transition-all duration-500 delay-300 ${
            isVisible ? "opacity-100 w-24" : "opacity-0 w-0"
          }`} />
        </div>

        {/* Main Content - Scene Display */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Scene Illustration */}
          <div
            className={`relative transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="sticky top-24">
              {/* Scene Container */}
              <div className="relative bg-gradient-to-br from-warm-cream to-cream rounded-3xl p-4 shadow-elegant border border-dusty-rose/10">
                {/* Scene Display */}
                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-cream/50">
                  <LoveStoryScene 
                    scene={milestones[activeScene - 1].scene} 
                    isActive={isVisible} 
                  />
                </div>

                {/* Scene Navigation Dots */}
                <div className="flex justify-center gap-3 mt-4">
                  {milestones.map((milestone, index) => (
                    <button
                      key={milestone.year}
                      onClick={() => setActiveScene(index + 1)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 touch-bounce ${
                        activeScene === index + 1
                          ? milestone.color === "dusty-rose" 
                            ? "bg-dusty-rose scale-125" 
                            : "bg-sage-green scale-125"
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                      aria-label={`Scene ${index + 1}: ${milestone.title}`}
                    />
                  ))}
                </div>

                {/* Current Scene Label */}
                <div className="text-center mt-3">
                  <span className={`font-display text-sm tracking-wider ${
                    milestones[activeScene - 1].color === "dusty-rose" ? "text-dusty-rose" : "text-sage-green"
                  }`}>
                    {milestones[activeScene - 1].year}
                  </span>
                  <span className="mx-2 text-muted-foreground/50">•</span>
                  <span className="font-elegant text-sm text-muted-foreground">
                    {milestones[activeScene - 1].subtitle}
                  </span>
                </div>
              </div>

              {/* Decorative Frame Corners */}
              <div className={`absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-dusty-rose/40 rounded-tl-2xl transition-all duration-500 delay-400 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`} />
              <div className={`absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-sage-green/40 rounded-br-2xl transition-all duration-500 delay-500 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`} />
            </div>
          </div>

          {/* Timeline */}
          <div
            className={`transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <div className="relative pl-8 border-l-2 border-dusty-rose/30">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative mb-8 last:mb-0 cursor-pointer transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  } ${activeScene === index + 1 ? "scale-100" : "scale-95 opacity-70"}`}
                  style={{ transitionDelay: `${500 + index * 150}ms` }}
                  onClick={() => setActiveScene(index + 1)}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[25px] w-4 h-4 rounded-full border-4 border-cream shadow-soft transition-all duration-300 ${
                    milestone.color === "dusty-rose" ? "bg-dusty-rose" : "bg-sage-green"
                  } ${activeScene === index + 1 ? "scale-125 ring-4 ring-opacity-30" : "scale-100"} ${
                    activeScene === index + 1 && milestone.color === "dusty-rose" ? "ring-dusty-rose" : ""
                  } ${activeScene === index + 1 && milestone.color === "sage-green" ? "ring-sage-green" : ""}`} 
                  />
                  
                  {/* Content Card */}
                  <div className={`glass-card rounded-xl p-6 ml-4 touch-lift transition-all duration-300 ${
                    milestone.color === "dusty-rose" ? "border-dusty-rose/20" : "border-sage-green/20"
                  } ${activeScene === index + 1 ? "shadow-elegant border-opacity-100" : "shadow-soft"}`}>
                    {/* Year Badge */}
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-sm font-medium tracking-wider font-display px-3 py-1 rounded-full ${
                        milestone.color === "dusty-rose" 
                          ? "text-dusty-rose bg-dusty-rose/10" 
                          : "text-sage-green bg-sage-green/10"
                      }`}>
                        {milestone.year}
                      </span>
                      <span className="font-body text-xs text-muted-foreground italic">
                        {milestone.subtitle}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-elegant text-xl md:text-2xl text-foreground mb-3">
                      {milestone.title}
                    </h3>
                    
                    {/* Description */}
                    <p className={`font-body text-muted-foreground leading-relaxed transition-all duration-300 ${
                      activeScene === index + 1 ? "opacity-100 max-h-40" : "opacity-70 max-h-20 overflow-hidden"
                    }`}>
                      {milestone.description}
                    </p>

                    {/* View Scene Button */}
                    <button
                      className={`mt-4 inline-flex items-center gap-2 text-sm font-display tracking-wider transition-all duration-300 ${
                        milestone.color === "dusty-rose" ? "text-dusty-rose" : "text-sage-green"
                      } ${activeScene === index + 1 ? "opacity-100" : "opacity-0"}`}
                    >
                      <span>Lihat Animasi</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Auto-play hint */}
            <div className={`mt-8 text-center transition-all duration-500 delay-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}>
              <p className="text-xs text-muted-foreground/60 font-body">
                Klik pada setiap milestone untuk melihat ilustrasi
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveStorySection;