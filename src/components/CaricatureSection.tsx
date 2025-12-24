import { useEffect, useState, useRef } from "react";
import { Camera, Download, Share2, Sparkles, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const CaricatureSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState("cartoon");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("caricature-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const styles = [
    { id: "cartoon", name: "Kartun", emoji: "🎨" },
    { id: "elegant", name: "Elegan", emoji: "✨" },
    { id: "whimsical", name: "Magical", emoji: "🦋" },
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

  const generateCaricature = async () => {
    if (!selectedImage) {
      toast.error("Silakan upload foto terlebih dahulu");
      return;
    }

    setIsLoading(true);
    try {
      // Extract base64 data from data URL
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
        throw new Error(data.error || "Gagal membuat karikatur");
      }

      setGeneratedImage(`data:image/png;base64,${data.image}`);
      toast.success("Karikatur berhasil dibuat!");
    } catch (error) {
      console.error("Error generating caricature:", error);
      toast.error(error instanceof Error ? error.message : "Gagal membuat karikatur");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = "karikatur-wedding-oky-mita.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Gambar berhasil diunduh!");
  };

  const shareToWhatsApp = () => {
    if (!generatedImage) return;

    const text = encodeURIComponent(
      "Lihat karikatur saya untuk pernikahan Oky & Mita! 💕\n\nAyo buat karikatur kamu juga di undangan digital mereka!"
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
      id="caricature-section"
      className="py-24 bg-gradient-to-b from-cream-white via-soft-rose/20 to-cream-white relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-gradient-to-bl from-blush-pink/30 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gradient-to-tr from-warm-blush/20 to-transparent rounded-full blur-3xl" />

      <div className="container max-w-4xl mx-auto px-4">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Sparkles className="w-12 h-12 text-accent mx-auto mb-4" />
          <p className="font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase">
            AI Caricature
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
            Buat Karikaturmu
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground max-w-lg mx-auto">
            Upload foto kamu dan AI akan membuatkan karikatur spesial dengan tema pernikahan Oky & Mita!
          </p>
        </div>

        <div
          className={`glass-card rounded-2xl p-8 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Style Selection */}
          <div className="mb-8">
            <p className="text-sm font-medium text-foreground mb-4 text-center">
              Pilih Style Karikatur:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {styles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedStyle === style.id
                      ? "bg-warm-blush text-foreground shadow-soft"
                      : "bg-blush-pink/30 text-muted-foreground hover:bg-blush-pink/50"
                  }`}
                >
                  {style.emoji} {style.name}
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload Area */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="relative">
              <p className="text-sm font-medium text-foreground mb-4 text-center">
                Foto Asli
              </p>
              {selectedImage ? (
                <div className="relative rounded-xl overflow-hidden aspect-square">
                  <img
                    src={selectedImage}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={resetImage}
                    className="absolute top-2 right-2 w-8 h-8 bg-foreground/80 hover:bg-foreground rounded-full flex items-center justify-center text-cream-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-warm-blush/50 bg-blush-pink/10 cursor-pointer hover:bg-blush-pink/20 transition-colors">
                  <Upload className="w-12 h-12 text-warm-blush mb-4" />
                  <span className="text-foreground font-medium mb-1">
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
            <div className="relative">
              <p className="text-sm font-medium text-foreground mb-4 text-center">
                Hasil Karikatur
              </p>
              <div className="aspect-square rounded-xl border-2 border-dashed border-soft-rose/50 bg-soft-rose/10 flex items-center justify-center overflow-hidden">
                {isLoading ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-warm-blush/30 border-t-warm-blush rounded-full animate-spin" />
                    <p className="text-muted-foreground text-sm">
                      Sedang membuat karikatur...
                    </p>
                    <p className="text-muted-foreground/60 text-xs">
                      Ini mungkin memakan waktu 30-60 detik
                    </p>
                  </div>
                ) : generatedImage ? (
                  <img
                    src={generatedImage}
                    alt="Generated Caricature"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <Camera className="w-12 h-12 text-soft-rose mx-auto mb-4" />
                    <p className="text-muted-foreground text-sm">
                      Hasil karikatur akan muncul di sini
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button
              onClick={generateCaricature}
              disabled={!selectedImage || isLoading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-warm-blush to-accent text-cream-white font-medium rounded-full shadow-soft hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-5 h-5" />
              {isLoading ? "Memproses..." : "Buat Karikatur"}
            </button>

            {generatedImage && (
              <>
                <button
                  onClick={downloadImage}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-warm-blush/20 hover:bg-warm-blush/30 text-foreground font-medium rounded-full transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download
                </button>

                <button
                  onClick={shareToWhatsApp}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500/20 hover:bg-green-500/30 text-foreground font-medium rounded-full transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  Share WhatsApp
                </button>
              </>
            )}
          </div>

          {/* Watermark Note */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            * Hasil karikatur akan memiliki watermark "Wedding of Oky & Mita"
          </p>
        </div>
      </div>
    </section>
  );
};

export default CaricatureSection;