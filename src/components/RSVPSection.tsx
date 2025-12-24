import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Check, Heart, Users } from "lucide-react";
import FloralDecoration from "./FloralDecoration";
import SparklesDecoration from "./SparklesDecoration";

const RSVPSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attendance: "",
    guests: "1",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("rsvp-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
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
      id="rsvp-section"
      className="py-24 bg-gradient-to-b from-cream via-dusty-rose/10 to-cream relative overflow-hidden"
    >
      <FloralDecoration position="top-left" size="md" className="opacity-30" />
      <FloralDecoration position="bottom-right" size="md" className="opacity-30" />
      <SparklesDecoration count={4} />

      <div className="container max-w-2xl mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <p className={`font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase transition-all duration-500 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}>
            Konfirmasi Kehadiran
          </p>
          <h2 className={`font-script text-5xl md:text-6xl mb-6 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}>
            <span className="text-dusty-rose">RSVP</span>
          </h2>
          <div className={`section-divider mb-6 transition-all duration-500 delay-300 ${
            isVisible ? "opacity-100 w-24" : "opacity-0 w-0"
          }`} />
          <p className={`text-muted-foreground max-w-md mx-auto transition-all duration-500 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            Kehadiran Anda akan menjadi kebahagiaan terbesar bagi kami. Mohon konfirmasi kehadiran Anda sebelum 1 Februari 2025.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`glass-card rounded-2xl p-8 md:p-10 touch-lift border-dusty-rose/20 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
          }`}
        >
          <div className="space-y-6">
            {/* Name */}
            <div className={`transition-all duration-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
            }`} style={{ transitionDelay: "400ms" }}>
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
            <div className={`transition-all duration-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
            }`} style={{ transitionDelay: "500ms" }}>
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
            <div className={`transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`} style={{ transitionDelay: "600ms" }}>
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
              <div className="animate-fade-in transition-all duration-500">
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
            <div className={`transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`} style={{ transitionDelay: "700ms" }}>
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
              className={`w-full py-6 bg-gradient-to-r from-dusty-rose to-mauve hover:from-dusty-rose/90 hover:to-mauve/90 text-cream font-medium text-lg rounded-xl touch-bounce transition-all duration-500 disabled:opacity-50 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "800ms" }}
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
