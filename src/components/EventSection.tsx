import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import venueImage from "@/assets/venue.jpg";

const EventSection = () => {
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

    const section = document.getElementById("event-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const events = [
    {
      title: "Akad Nikah",
      date: "14 Februari 2025",
      time: "10:00 WIB",
      location: "Grand Ballroom, Hotel Mulia",
      address: "Jl. Asia Afrika No. 8, Senayan, Jakarta",
    },
    {
      title: "Resepsi",
      date: "14 Februari 2025",
      time: "18:00 WIB",
      location: "Garden Pavilion, Hotel Mulia",
      address: "Jl. Asia Afrika No. 8, Senayan, Jakarta",
    },
  ];

  return (
    <section
      id="event-section"
      className="py-24 bg-gradient-to-b from-cream-white via-blush-pink/40 to-cream-white relative"
    >
      <div className="container max-w-6xl mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase">
            Bergabunglah Bersama Kami
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
            Detail Acara
          </h2>
          <div className="section-divider" />
        </div>

        {/* Venue Image */}
        <div
          className={`mb-16 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-card max-w-4xl mx-auto">
            <img
              src={venueImage}
              alt="Wedding venue"
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <p className="font-display text-2xl md:text-3xl text-cream-white">
                Hotel Mulia Senayan
              </p>
            </div>
          </div>
        </div>

        {/* Event Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {events.map((event, index) => (
            <div
              key={event.title}
              className={`glass-card rounded-2xl p-8 text-center transition-all duration-700 hover:shadow-glow ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ animationDelay: `${(index + 1) * 200}ms` }}
            >
              {/* Decorative Top */}
              <div className="w-16 h-1 bg-gradient-to-r from-soft-rose via-warm-blush to-soft-rose mx-auto mb-6 rounded-full" />

              <h3 className="font-display text-3xl text-foreground mb-6">
                {event.title}
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                  <Calendar className="w-5 h-5 text-accent" />
                  <span>{event.date}</span>
                </div>

                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                  <Clock className="w-5 h-5 text-accent" />
                  <span>{event.time}</span>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-start justify-center gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">{event.location}</p>
                      <p className="text-sm mt-1">{event.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Button */}
              <a
                href="https://maps.google.com/?q=Hotel+Mulia+Senayan+Jakarta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-warm-blush/20 hover:bg-warm-blush/30 rounded-full text-foreground text-sm font-medium transition-colors duration-300"
              >
                <MapPin className="w-4 h-4" />
                Lihat Peta
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventSection;
