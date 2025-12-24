import { useEffect, useState } from "react";
import FloralDecoration from "./FloralDecoration";
import SparklesDecoration from "./SparklesDecoration";

const LoveStorySection = () => {
  const [isVisible, setIsVisible] = useState(false);

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
      year: "2020", 
      title: "Awal Pertemuan", 
      subtitle: "The First Meeting",
      description: "Di sebuah kafe hangat di Malang, takdir mempertemukan kami dalam sebuah acara komunitas media. Senyuman pertama yang bertukar menjadi awal dari segalanya.",
      color: "dusty-rose" 
    },
    { 
      year: "2021", 
      title: "Perjalanan Cinta", 
      subtitle: "The Journey of Love",
      description: "Di tepi danau saat golden hour, Oky mengungkapkan perasaannya dengan tulus. Sebuah pengakuan cinta yang mengubah pertemanan menjadi sesuatu yang lebih indah.",
      color: "sage-green" 
    },
    { 
      year: "2024", 
      title: "Kembali Bersama", 
      subtitle: "Reuniting and Proposal",
      description: "Setelah perjalanan panjang, di malam yang tenang dengan cahaya bulan sebagai saksi, Oky berlutut dengan sebuah cincin. Air mata bahagia mengalir saat Mita mengangguk.",
      color: "dusty-rose" 
    },
    { 
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
      className="py-24 bg-cream relative overflow-hidden"
    >
      {/* Decorative Background */}
      <FloralDecoration position="top-right" size="md" className="opacity-30" />
      <FloralDecoration position="bottom-left" size="md" className="opacity-30" />
      <SparklesDecoration count={6} />

      <div className="container max-w-4xl mx-auto px-4 relative z-10">
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

        {/* Timeline */}
        <div className="relative pl-8 border-l-2 border-dusty-rose/30">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.year}
              className={`relative mb-12 last:mb-0 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: `${500 + index * 150}ms` }}
            >
              {/* Timeline Dot */}
              <div className={`absolute -left-[25px] w-4 h-4 rounded-full border-4 border-cream shadow-soft ${
                milestone.color === "dusty-rose" ? "bg-dusty-rose" : "bg-sage-green"
              }`} />
              
              {/* Content Card */}
              <div className={`glass-card rounded-xl p-6 ml-4 ${
                milestone.color === "dusty-rose" ? "border-dusty-rose/20" : "border-sage-green/20"
              } shadow-soft hover:shadow-elegant transition-shadow duration-300`}>
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
                <p className="font-body text-muted-foreground leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveStorySection;