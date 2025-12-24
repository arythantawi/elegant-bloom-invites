import { useEffect, useState, useRef } from "react";
import { Camera, Download, Share2, Wand2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import FloralDecoration from "./FloralDecoration";
import SparklesDecoration from "./SparklesDecoration";

const ArtFilterSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState("cartoon");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("art-filter-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const styles = [
    { id: "cartoon", name: "Kartun", emoji: "🎨", color: "dusty-rose" },
    { id: "elegant", name: "Elegan", emoji: "✨", color: "sage-green" },
    { id: "whimsical", name: "Magical", emoji: "🦋", color: "mauve" },
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setGeneratedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateArtFilter = async () => {
    if (!selectedImage) {
      toast.error("Silakan upload foto terlebih dahulu");
      return;
    }

    setIsLoading(true);
    try {
      const base64Data = selectedImage.split(",")[1];

      const { data, error } = await supabase.functions.invoke("generate-caricature", {
        body: {
          imageBase64: base64Data,
          style: selectedStyle,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.success) {
        throw new Error(data.error || "Gagal membuat art filter");
      }

      setGeneratedImage(`data:image/png;base64,${data.image}`);
      toast.success("Art filter berhasil diterapkan!");
    } catch (error) {
      console.error("Error generating art filter:", error);
      toast.error(error instanceof Error ? error.message : "Gagal membuat art filter");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = "art-filter-wedding-oky-mita.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Gambar berhasil diunduh!");
  };

  const shareToWhatsApp = () => {
    if (!generatedImage) return;

    const text = encodeURIComponent(
      "Lihat foto artistik saya untuk pernikahan Oky & Mita! 💕\n\nAyo buat juga di undangan digital mereka!"
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const resetImage = () => {
    setSelectedImage(null);
    setGeneratedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section
      id="art-filter-section"
      className="py-24 bg-gradient-to-b from-cream via-blush-pink/15 to-cream relative overflow-hidden"
    >
      <FloralDecoration position="top-left" size="md" className="opacity-30" />
      <FloralDecoration position="bottom-right" size="md" className="opacity-30" />
      <SparklesDecoration count={5} />

      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <Wand2 className={`w-12 h-12 text-sage-green mx-auto mb-4 transition-all duration-500 delay-100 ${
            isVisible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 rotate-45"
          }`} />
          <p className={`font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase transition-all duration-500 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}>
            AI Art Filter
          </p>
          <h2 className={`font-script text-5xl md:text-6xl mb-6 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}>
            <span className="text-dusty-rose">Foto</span>{" "}
            <span className="text-sage-green">Artistik</span>
          </h2>
          <div className={`section-divider mb-6 transition-all duration-500 delay-400 ${
            isVisible ? "opacity-100 w-24" : "opacity-0 w-0"
          }`} />
          <p className={`text-muted-foreground max-w-lg mx-auto transition-all duration-500 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            Upload foto kamu dan AI akan mengubahnya menjadi karya seni dengan tema pernikahan Oky & Mita!
          </p>
          <p className={`text-muted-foreground/70 text-sm mt-2 max-w-md mx-auto transition-all duration-500 delay-600 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            * Hasil merupakan interpretasi artistik AI dan mungkin berbeda dari foto asli
          </p>
        </div>

        <div
          className={`glass-card rounded-2xl p-8 touch-lift border-dusty-rose/20 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
          }`}
        >
          {/* Style Selection */}
          <div className={`mb-8 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`} style={{ transitionDelay: "500ms" }}>
            <p className="text-sm font-medium text-foreground mb-4 text-center font-display">
              Pilih Style Artistik:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {styles.map((style, index) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium touch-bounce transition-all duration-300 ${
                    selectedStyle === style.id
                      ? style.color === "dusty-rose" 
                        ? "bg-dusty-rose text-cream shadow-soft scale-105"
                        : style.color === "sage-green"
                        ? "bg-sage-green text-cream shadow-soft scale-105"
                        : "bg-mauve text-cream shadow-soft scale-105"
                      : "bg-cream/60 text-muted-foreground hover:bg-cream border border-border/30"
                  } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  {style.emoji} {style.name}
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload Area */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className={`relative transition-all duration-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`} style={{ transitionDelay: "700ms" }}>
              <p className="text-sm font-medium text-foreground mb-4 text-center font-display">
                Foto Asli
              </p>
              {selectedImage ? (
                <div className="relative photo-frame photo-frame-rounded aspect-square touch-lift">
                  <img
                    src={selectedImage}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={resetImage}
                    className="absolute top-2 right-2 w-8 h-8 bg-foreground/80 hover:bg-foreground rounded-full flex items-center justify-center text-cream transition-colors touch-bounce"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-dusty-rose/40 bg-cream/50 cursor-pointer hover:bg-dusty-rose/10 transition-all duration-300 touch-pulse">
                  <Upload className="w-12 h-12 text-dusty-rose mb-4" />
                  <span className="text-foreground font-medium mb-1 font-display">
                    Upload Foto
                  </span>
                  <span className="text-sm text-muted-foreground">
                    JPG, PNG (max 5MB)
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Result Section */}
            <div className={`relative transition-all duration-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`} style={{ transitionDelay: "800ms" }}>
              <p className="text-sm font-medium text-foreground mb-4 text-center font-display">
                Hasil Art Filter
              </p>
              <div className="aspect-square rounded-xl border-2 border-dashed border-sage-green/40 bg-cream/50 flex items-center justify-center overflow-hidden touch-lift">
                {isLoading ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-dusty-rose/30 border-t-dusty-rose rounded-full animate-spin" />
                    <p className="text-muted-foreground text-sm font-display">
                      Sedang menerapkan art filter...
                    </p>
                    <p className="text-muted-foreground/60 text-xs">
                      Ini mungkin memakan waktu 30-60 detik
                    </p>
                  </div>
                ) : generatedImage ? (
                  <img
                    src={generatedImage}
                    alt="Generated Art"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <Camera className="w-12 h-12 text-sage-green mx-auto mb-4" />
                    <p className="text-muted-foreground text-sm font-display">
                      Hasil art filter akan muncul di sini
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`} style={{ transitionDelay: "900ms" }}>
            <button
              onClick={generateArtFilter}
              disabled={!selectedImage || isLoading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-dusty-rose to-mauve text-cream font-medium rounded-full shadow-soft hover:shadow-glow touch-bounce transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-display"
            >
              <Wand2 className="w-5 h-5" />
              {isLoading ? "Memproses..." : "Terapkan Filter"}
            </button>

            {generatedImage && (
              <>
                <button
                  onClick={downloadImage}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-sage-green/20 hover:bg-sage-green/30 text-foreground font-medium rounded-full touch-bounce transition-colors font-display"
                >
                  <Download className="w-5 h-5" />
                  Download
                </button>

                <button
                  onClick={shareToWhatsApp}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-olive-green/20 hover:bg-olive-green/30 text-foreground font-medium rounded-full touch-bounce transition-colors font-display"
                >
                  <Share2 className="w-5 h-5" />
                  Share WhatsApp
                </button>
              </>
            )}
          </div>

          {/* Watermark Note */}
          <p className={`text-center text-xs text-muted-foreground mt-6 transition-all duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`} style={{ transitionDelay: "1000ms" }}>
            * Hasil akan memiliki watermark "Wedding of Oky & Mita"
          </p>
        </div>
      </div>
    </section>
  );
};

export default ArtFilterSection;
