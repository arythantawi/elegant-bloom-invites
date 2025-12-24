import { useEffect, useState } from "react";
import coupleImage from "@/assets/couple-2.jpg";

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
    { year: "2020", title: "Awal Bertemu", description: "Takdir mempertemukan kami di perjalanan yang sama" },
    { year: "2022", title: "Perjuangan", description: "Melewati suka dan duka bersama menguatkan cinta" },
    { year: "2025", title: "Lamaran", description: "Sebuah pertanyaan yang mengubah segalanya" },
    { year: "2026", title: "Pernikahan", description: "Dua hati menjadi satu dalam ikatan suci" },
  ];

  return (
    <section
      id="love-story-section"
      className="py-24 bg-cream-white relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-soft-rose/20 to-transparent rounded-full blur-3xl transition-all duration-1000 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
      }`} />
      <div className={`absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blush-pink/20 to-transparent rounded-full blur-3xl transition-all duration-1000 delay-200 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
      }`} />

      <div className="container max-w-6xl mx-auto px-4">
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
          <h2 className={`font-display text-4xl md:text-5xl text-foreground mb-6 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}>
            Kisah Kami
          </h2>
          <div className={`section-divider transition-all duration-500 delay-300 ${
            isVisible ? "opacity-100 w-24" : "opacity-0 w-0"
          }`} />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div
            className={`relative transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0 rotate-0" : "opacity-0 -translate-x-12 -rotate-3"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-card touch-lift">
              <img
                src={coupleImage}
                alt="Oky dan Mita"
                className={`w-full h-[500px] object-cover transition-all duration-1000 ${
                  isVisible ? "scale-100" : "scale-110"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            {/* Decorative Frame */}
            <div className={`absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-warm-blush rounded-tl-2xl transition-all duration-500 delay-400 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`} />
            <div className={`absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-warm-blush rounded-br-2xl transition-all duration-500 delay-500 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`} />
          </div>

          {/* Timeline */}
          <div
            className={`transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <div className="relative pl-8 border-l-2 border-soft-rose/50">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative mb-10 last:mb-0 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  }`}
                  style={{ transitionDelay: `${500 + index * 150}ms` }}
                >
                  {/* Dot */}
                  <div className={`absolute -left-[25px] w-4 h-4 bg-warm-blush rounded-full border-4 border-cream-white shadow-soft transition-all duration-300 ${
                    isVisible ? "scale-100" : "scale-0"
                  }`} style={{ transitionDelay: `${550 + index * 150}ms` }} />
                  
                  {/* Content */}
                  <div className="glass-card rounded-xl p-6 ml-4 touch-lift">
                    <span className={`text-sm font-medium text-accent tracking-wider transition-all duration-300 ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`} style={{ transitionDelay: `${600 + index * 150}ms` }}>
                      {milestone.year}
                    </span>
                    <h3 className={`font-display text-2xl text-foreground mt-1 mb-2 transition-all duration-300 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`} style={{ transitionDelay: `${650 + index * 150}ms` }}>
                      {milestone.title}
                    </h3>
                    <p className={`text-muted-foreground transition-all duration-300 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`} style={{ transitionDelay: `${700 + index * 150}ms` }}>
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveStorySection;
