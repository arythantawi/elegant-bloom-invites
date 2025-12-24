import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Check, Heart, Users } from "lucide-react";

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
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
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

    // Simulate submission
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
      className="py-24 bg-gradient-to-b from-cream-white via-soft-rose/30 to-cream-white relative"
    >
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-blush-pink/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-warm-blush/20 rounded-full blur-3xl" />

      <div className="container max-w-2xl mx-auto px-4 relative">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase">
            Konfirmasi Kehadiran
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
            RSVP
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground max-w-md mx-auto">
            Kehadiran Anda akan menjadi kebahagiaan terbesar bagi kami. Mohon konfirmasi kehadiran Anda sebelum 1 Februari 2025.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`glass-card rounded-2xl p-8 md:p-10 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nama Lengkap
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Masukkan nama Anda"
                required
                className="bg-card/50 border-border/50 focus:border-warm-blush focus:ring-warm-blush/20"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
                required
                className="bg-card/50 border-border/50 focus:border-warm-blush focus:ring-warm-blush/20"
              />
            </div>

            {/* Attendance */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: "hadir" })}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                    formData.attendance === "hadir"
                      ? "border-warm-blush bg-warm-blush/20 text-foreground"
                      : "border-border/50 bg-card/30 text-muted-foreground hover:border-warm-blush/50"
                  }`}
                >
                  <Check className="w-6 h-6" />
                  <span className="font-medium">Ya, Hadir</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: "tidak" })}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                    formData.attendance === "tidak"
                      ? "border-warm-blush bg-warm-blush/20 text-foreground"
                      : "border-border/50 bg-card/30 text-muted-foreground hover:border-warm-blush/50"
                  }`}
                >
                  <Heart className="w-6 h-6" />
                  <span className="font-medium">Maaf, Tidak Bisa</span>
                </button>
              </div>
            </div>

            {/* Number of Guests */}
            {formData.attendance === "hadir" && (
              <div className="animate-fade-in">
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Users className="w-4 h-4 inline mr-2" />
                  Jumlah Tamu
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full p-3 rounded-lg bg-card/50 border border-border/50 focus:border-warm-blush focus:ring-warm-blush/20 focus:outline-none"
                >
                  <option value="1">1 Orang</option>
                  <option value="2">2 Orang</option>
                  <option value="3">3 Orang</option>
                  <option value="4">4 Orang</option>
                </select>
              </div>
            )}

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Ucapan & Doa
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tulis ucapan dan doa untuk kedua mempelai..."
                rows={4}
                className="bg-card/50 border-border/50 focus:border-warm-blush focus:ring-warm-blush/20 resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !formData.attendance}
              className="w-full py-6 bg-warm-blush hover:bg-accent text-foreground font-medium text-lg rounded-xl transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
                  Mengirim...
                </span>
              ) : (
                <span className="flex items-center gap-2">
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
