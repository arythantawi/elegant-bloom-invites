import { useEffect, useState } from "react";
import { Gift, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import FloralDecoration from "./FloralDecoration";
import SparklesDecoration from "./SparklesDecoration";
import { FloralSide4, Floral5, GoldenFloral } from "./FloralDecorations";

const GiftSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("gift-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const bankAccounts = [
    {
      bank: "BCA",
      accountNumber: "1234567890",
      accountName: "Oky Dwi Prasetyo",
      color: "dusty-rose",
      gradient: "from-dusty-rose to-mauve",
    },
    {
      bank: "Mandiri",
      accountNumber: "0987654321",
      accountName: "Mita Berliana",
      color: "sage-green",
      gradient: "from-sage-green to-olive-green",
    },
  ];

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Nomor rekening berhasil disalin!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section
      id="gift-section"
      className="py-24 bg-gradient-to-b from-cream via-soft-taupe/20 to-cream relative overflow-hidden"
    >
      <FloralDecoration position="top-right" size="md" className="opacity-30" />
      <FloralDecoration position="bottom-left" size="md" className="opacity-30" />
      
      {/* New floral decorations with sway animation */}
      <FloralSide4 position="left" size="lg" className="opacity-40 top-1/3" />
      <Floral5 position="right" size="md" className="opacity-35 bottom-1/4" />
      <GoldenFloral position="top-left" size="sm" className="opacity-30 top-12 left-6" />
      
      <SparklesDecoration count={4} />

      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <Gift className={`w-12 h-12 text-dusty-rose mx-auto mb-4 transition-all duration-500 delay-100 ${
            isVisible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-12"
          }`} />
          <p className={`font-display text-lg tracking-[0.2em] text-muted-foreground mb-4 uppercase transition-all duration-500 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}>
            Kirim Hadiah
          </p>
          <h2 className={`font-script text-5xl md:text-6xl mb-6 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}>
            <span className="text-sage-green">Wedding</span>{" "}
            <span className="text-dusty-rose">Gift</span>
          </h2>
          <div className={`section-divider mb-6 transition-all duration-500 delay-400 ${
            isVisible ? "opacity-100 w-24" : "opacity-0 w-0"
          }`} />
          <p className={`text-muted-foreground max-w-lg mx-auto transition-all duration-500 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih, Anda dapat memberi kado secara cashless.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {bankAccounts.map((account, index) => (
            <div
              key={account.bank}
              className={`glass-card rounded-2xl p-8 text-center touch-lift transition-all duration-700 ${
                account.color === "dusty-rose" ? "border-dusty-rose/20" : "border-sage-green/20"
              } ${isVisible ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 translate-y-12 rotate-2"}`}
              style={{ transitionDelay: `${600 + index * 150}ms` }}
            >
              {/* Bank Logo */}
              <div className={`w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br ${account.gradient} flex items-center justify-center shadow-lg transition-all duration-500 touch-bounce ${
                isVisible ? "scale-100 rotate-0" : "scale-0 rotate-180"
              }`} style={{ transitionDelay: `${700 + index * 150}ms` }}>
                <span className="text-cream font-bold text-lg font-display">{account.bank}</span>
              </div>

              <h3 className={`font-elegant text-2xl text-foreground mb-4 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`} style={{ transitionDelay: `${750 + index * 150}ms` }}>
                {account.bank}
              </h3>

              <div className={`bg-cream/60 rounded-xl p-4 mb-4 border transition-all duration-500 ${
                account.color === "dusty-rose" ? "border-dusty-rose/20" : "border-sage-green/20"
              } ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`} 
              style={{ transitionDelay: `${800 + index * 150}ms` }}>
                <p className="font-mono text-xl text-foreground tracking-wider">
                  {account.accountNumber}
                </p>
              </div>

              <p className={`text-muted-foreground mb-6 transition-all duration-500 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`} style={{ transitionDelay: `${850 + index * 150}ms` }}>
                a.n. <span className="text-foreground font-medium">{account.accountName}</span>
              </p>

              <button
                onClick={() => copyToClipboard(account.accountNumber, index)}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium touch-bounce transition-all duration-500 ${
                  account.color === "dusty-rose" 
                    ? "bg-dusty-rose/20 hover:bg-dusty-rose/30 text-foreground" 
                    : "bg-sage-green/20 hover:bg-sage-green/30 text-foreground"
                } ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
                style={{ transitionDelay: `${900 + index * 150}ms` }}
              >
                {copiedIndex === index ? (
                  <>
                    <Check className="w-4 h-4 text-sage-green" />
                    Tersalin!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Salin Nomor
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftSection;
