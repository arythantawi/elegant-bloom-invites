import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Check, Heart, Users } from "lucide-react";
import FloralDecoration from "./FloralDecoration";
import SparklesDecoration from "./SparklesDecoration";

gsap.registerPlugin(ScrollTrigger);

const RSVPSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attendance: "",
    guests: "1",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.from(descRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Form card animation
      gsap.from(formRef.current, {
        y: 60,
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Form fields stagger
      if (formRef.current) {
        const fields = formRef.current.querySelectorAll('.form-field');
        gsap.from(fields, {
          x: -30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Terima Kasih! 💕",
      description: "RSVP Anda telah berhasil dikirim. Kami menantikan kehadiran Anda!",
    });

    setFormData({
      name: "",
      email: "",
      attendance: "",
      guests: "1",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <section
      ref={sectionRef}
      id="rsvp-section"
      className="py-24 bg-gradient-to-b from-cream via-dusty-rose/10 to-cream relative overflow-hidden"
    >
      <FloralDecoration position="top-left" size="md" className="opacity-30" />
      <FloralDecoration position="bottom-right" size="md" className="opacity-30" />
      <SparklesDecoration count={4} />

      <div className="container max-w-2xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <p ref={headerRef} className="font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase">
            Konfirmasi Kehadiran
          </p>
          <h2 ref={titleRef} className="font-script text-5xl md:text-6xl mb-6">
            <span className="text-dusty-rose">RSVP</span>
          </h2>
          <div ref={dividerRef} className="section-divider mb-6 w-24 mx-auto" />
          <p ref={descRef} className="text-muted-foreground max-w-md mx-auto">
            Kehadiran Anda akan menjadi kebahagiaan terbesar bagi kami. Mohon konfirmasi kehadiran Anda sebelum 1 Februari 2025.
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="glass-card rounded-2xl p-8 md:p-10 touch-lift border-dusty-rose/20"
        >
          <div className="space-y-6">
            {/* Name */}
            <div className="form-field">
              <label className="block text-sm font-medium text-foreground mb-2 font-display">
                Nama Lengkap
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Masukkan nama Anda"
                required
                className="bg-cream/50 border-dusty-rose/30 focus:border-dusty-rose focus:ring-dusty-rose/20 transition-all duration-300"
              />
            </div>

            {/* Email */}
            <div className="form-field">
              <label className="block text-sm font-medium text-foreground mb-2 font-display">
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
                required
                className="bg-cream/50 border-dusty-rose/30 focus:border-dusty-rose focus:ring-dusty-rose/20 transition-all duration-300"
              />
            </div>

            {/* Attendance */}
            <div className="form-field">
              <label className="block text-sm font-medium text-foreground mb-3 font-display">
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: "hadir" })}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 touch-bounce ${
                    formData.attendance === "hadir"
                      ? "border-sage-green bg-sage-green/20 text-foreground scale-105"
                      : "border-border/50 bg-cream/30 text-muted-foreground hover:border-sage-green/50"
                  }`}
                >
                  <Check className={`w-6 h-6 ${formData.attendance === "hadir" ? "text-sage-green" : ""}`} />
                  <span className="font-medium font-display">Ya, Hadir</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: "tidak" })}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 touch-bounce ${
                    formData.attendance === "tidak"
                      ? "border-dusty-rose bg-dusty-rose/20 text-foreground scale-105"
                      : "border-border/50 bg-cream/30 text-muted-foreground hover:border-dusty-rose/50"
                  }`}
                >
                  <Heart className={`w-6 h-6 ${formData.attendance === "tidak" ? "text-dusty-rose" : ""}`} />
                  <span className="font-medium font-display">Maaf, Tidak Bisa</span>
                </button>
              </div>
            </div>

            {/* Number of Guests */}
            {formData.attendance === "hadir" && (
              <div className="form-field">
                <label className="block text-sm font-medium text-foreground mb-2 font-display">
                  <Users className="w-4 h-4 inline mr-2 text-sage-green" />
                  Jumlah Tamu
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full p-3 rounded-lg bg-cream/50 border border-sage-green/30 focus:border-sage-green focus:ring-sage-green/20 focus:outline-none transition-all duration-300"
                >
                  <option value="1">1 Orang</option>
                  <option value="2">2 Orang</option>
                  <option value="3">3 Orang</option>
                  <option value="4">4 Orang</option>
                </select>
              </div>
            )}

            {/* Message */}
            <div className="form-field">
              <label className="block text-sm font-medium text-foreground mb-2 font-display">
                Ucapan & Doa
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tulis ucapan dan doa untuk kedua mempelai..."
                rows={4}
                className="bg-cream/50 border-dusty-rose/30 focus:border-dusty-rose focus:ring-dusty-rose/20 resize-none transition-all duration-300"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !formData.attendance}
              className="form-field w-full py-6 bg-gradient-to-r from-dusty-rose to-mauve hover:from-dusty-rose/90 hover:to-mauve/90 text-cream font-medium text-lg rounded-xl touch-bounce disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                  Mengirim...
                </span>
              ) : (
                <span className="flex items-center gap-2 font-display">
                  <Heart className="w-5 h-5" />
                  Kirim RSVP
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RSVPSection;
