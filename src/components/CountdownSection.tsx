import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const weddingDate = new Date("2026-01-16T07:00:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById("countdown-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const timeBlocks = [
    { value: timeLeft.days, label: "Hari" },
    { value: timeLeft.hours, label: "Jam" },
    { value: timeLeft.minutes, label: "Menit" },
    { value: timeLeft.seconds, label: "Detik" },
  ];

  return (
    <section
      id="countdown-section"
      className="py-24 bg-gradient-to-b from-cream-white via-blush-pink/30 to-cream-white"
    >
      <div className="container max-w-4xl mx-auto px-4 text-center">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <p className={`font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase transition-all duration-500 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}>
            Menuju Hari Bahagia
          </p>
          <h2 className={`font-display text-4xl md:text-5xl text-foreground mb-12 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}>
            Hitung Mundur
          </h2>
        </div>

        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {timeBlocks.map((block, index) => (
            <div
              key={block.label}
              className={`glass-card rounded-2xl p-6 md:p-8 touch-bounce transition-all duration-500 ${
                isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <span className={`font-display text-5xl md:text-6xl lg:text-7xl font-light text-foreground block mb-2 transition-all duration-300 ${
                isVisible ? "scale-100" : "scale-50"
              }`} style={{ transitionDelay: `${400 + index * 100}ms` }}>
                {String(block.value).padStart(2, "0")}
              </span>
              <span className={`text-sm tracking-widest text-muted-foreground uppercase transition-all duration-300 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`} style={{ transitionDelay: `${500 + index * 100}ms` }}>
                {block.label}
              </span>
            </div>
          ))}
        </div>

        <div className={`mt-12 section-divider transition-all duration-500 delay-700 ${
          isVisible ? "opacity-100 w-24" : "opacity-0 w-0"
        }`} />
      </div>
    </section>
  );
};

export default CountdownSection;
