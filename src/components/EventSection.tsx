import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import venueImage from "@/assets/venue.jpg";
import FloralDecoration from "./FloralDecoration";
import SparklesDecoration from "./SparklesDecoration";

const EventSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
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
      date: "16 Januari 2026",
      time: "07:00 WIB",
      location: "Kediaman Mempelai Wanita",
      address: "Pd. Kobong, Kedungrejo, Kec. Rowokangkung, Kabupaten Lumajang, Jawa Timur",
      color: "dusty-rose"
    },
    {
      title: "Resepsi",
      date: "17 Januari 2026",
      time: "13:00 WIB",
      location: "Kediaman Mempelai Wanita",
      address: "Pd. Kobong, Kedungrejo, Kec. Rowokangkung, Kabupaten Lumajang, Jawa Timur",
      color: "sage-green"
    },
  ];

  return (
    <section
      id="event-section"
      className="py-24 bg-gradient-to-b from-cream via-soft-taupe/30 to-cream relative overflow-hidden"
    >
      <FloralDecoration position="top-right" size="md" className="opacity-40" />
      <FloralDecoration position="bottom-left" size="md" className="opacity-40" />
      <SparklesDecoration count={5} />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <p className={`font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase transition-all duration-500 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}>
            Bergabunglah Bersama Kami
          </p>
          <h2 className={`font-script text-5xl md:text-6xl mb-6 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}>
            <span className="text-dusty-rose">Detail</span>{" "}
            <span className="text-sage-green">Acara</span>
          </h2>
          <div className={`section-divider transition-all duration-500 delay-300 ${
            isVisible ? "opacity-100 w-24" : "opacity-0 w-0"
          }`} />
        </div>

        {/* Venue Image */}
        <div
          className={`mb-16 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-90 rotate-1"
          }`}
        >
          <div className="relative photo-frame photo-frame-rounded max-w-4xl mx-auto touch-lift">
            <img
              src={venueImage}
              alt="Wedding venue"
              className={`w-full h-[280px] md:h-[380px] object-cover transition-all duration-1000 ${
                isVisible ? "scale-100" : "scale-110"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
            <div className={`absolute bottom-0 left-0 right-0 p-8 text-center transition-all duration-500 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}>
              <p className="font-script text-3xl md:text-4xl text-cream">
                Rowokangkung, Lumajang
              </p>
            </div>
          </div>
        </div>

        {/* Event Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {events.map((event, index) => (
            <div
              key={event.title}
              className={`glass-card rounded-2xl p-8 text-center touch-lift transition-all duration-700 ${
                event.color === "dusty-rose" ? "border-dusty-rose/20" : "border-sage-green/20"
              } ${isVisible ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 translate-y-12 rotate-2"}`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              {/* Decorative Top */}
              <div className={`w-16 h-1 mx-auto mb-6 rounded-full transition-all duration-500 ${
                event.color === "dusty-rose" 
                  ? "bg-gradient-to-r from-dusty-rose via-mauve to-dusty-rose" 
                  : "bg-gradient-to-r from-sage-green via-olive-green to-sage-green"
              } ${isVisible ? "w-16" : "w-0"}`} style={{ transitionDelay: `${500 + index * 150}ms` }} />

              <h3 className={`font-script text-4xl mb-6 transition-all duration-500 ${
                event.color === "dusty-rose" ? "text-dusty-rose" : "text-sage-green"
              } ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`} 
              style={{ transitionDelay: `${550 + index * 150}ms` }}>
                {event.title}
              </h3>

              <div className="space-y-4">
                <div className={`flex items-center justify-center gap-3 text-muted-foreground transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                }`} style={{ transitionDelay: `${600 + index * 150}ms` }}>
                  <Calendar className={`w-5 h-5 ${event.color === "dusty-rose" ? "text-dusty-rose" : "text-sage-green"} touch-bounce`} />
                  <span className="font-display">{event.date}</span>
                </div>

                <div className={`flex items-center justify-center gap-3 text-muted-foreground transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
                }`} style={{ transitionDelay: `${650 + index * 150}ms` }}>
                  <Clock className={`w-5 h-5 ${event.color === "dusty-rose" ? "text-dusty-rose" : "text-sage-green"} touch-bounce`} />
                  <span className="font-display">{event.time}</span>
                </div>

                <div className={`pt-4 border-t border-border/30 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`} style={{ transitionDelay: `${700 + index * 150}ms` }}>
                  <div className="flex items-start justify-center gap-3 text-muted-foreground">
                    <MapPin className={`w-5 h-5 mt-0.5 flex-shrink-0 ${event.color === "dusty-rose" ? "text-dusty-rose" : "text-sage-green"} touch-bounce`} />
                    <div>
                      <p className="font-medium text-foreground">{event.location}</p>
                      <p className="text-sm mt-1">{event.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Button */}
              <a
                href="https://maps.google.com/?q=Q8F6+5XG,+Pd.+Kobong,+Kedungrejo,+Rowokangkung,+Lumajang"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full text-sm font-medium touch-bounce transition-all duration-500 ${
                  event.color === "dusty-rose" 
                    ? "bg-dusty-rose/20 hover:bg-dusty-rose/30 text-foreground" 
                    : "bg-sage-green/20 hover:bg-sage-green/30 text-foreground"
                } ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
                style={{ transitionDelay: `${750 + index * 150}ms` }}
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
