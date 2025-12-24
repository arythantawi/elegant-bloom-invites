import { useEffect, useState } from "react";
import coupleImage from "@/assets/couple-2.jpg";

const LoveStorySection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("love-story-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const milestones = [
    { year: "2018", title: "Pertama Bertemu", description: "Di sebuah acara kampus yang mengubah segalanya" },
    { year: "2019", title: "Jatuh Cinta", description: "Momen ketika kami tahu ini adalah takdir" },
    { year: "2023", title: "Lamaran", description: "Ya, aku mau menghabiskan selamanya bersamamu" },
    { year: "2025", title: "Pernikahan", description: "Memulai babak baru kehidupan bersama" },
  ];

  return (
    <section
      id="love-story-section"
      className="py-24 bg-cream-white relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-soft-rose/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blush-pink/20 to-transparent rounded-full blur-3xl" />

      <div className="container max-w-6xl mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase">
            Perjalanan Cinta Kami
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
            Kisah Kami
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div
            className={`relative transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-card">
              <img
                src={coupleImage}
                alt="Sarah dan Michael"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            {/* Decorative Frame */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-warm-blush rounded-tl-2xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-warm-blush rounded-br-2xl" />
          </div>

          {/* Timeline */}
          <div
            className={`transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative pl-8 border-l-2 border-soft-rose/50">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className="relative mb-10 last:mb-0"
                  style={{ animationDelay: `${(index + 1) * 150}ms` }}
                >
                  {/* Dot */}
                  <div className="absolute -left-[25px] w-4 h-4 bg-warm-blush rounded-full border-4 border-cream-white shadow-soft" />
                  
                  {/* Content */}
                  <div className="glass-card rounded-xl p-6 ml-4 hover:shadow-card transition-shadow duration-300">
                    <span className="text-sm font-medium text-accent tracking-wider">
                      {milestone.year}
                    </span>
                    <h3 className="font-display text-2xl text-foreground mt-1 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground">
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
