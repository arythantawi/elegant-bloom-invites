import { useEffect, useState } from "react";
import { Heart, Menu, X } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#countdown-section", label: "Countdown" },
    { href: "#love-story-section", label: "Kisah Kami" },
    { href: "#event-section", label: "Acara" },
    { href: "#gallery-section", label: "Galeri" },
    { href: "#rsvp-section", label: "RSVP" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-cream/95 backdrop-blur-md shadow-soft py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 font-script text-2xl text-foreground touch-bounce"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Heart className="w-5 h-5 text-dusty-rose fill-dusty-rose" />
            <span>
              <span className="text-dusty-rose">O</span>
              <span className="text-sage-green">&</span>
              <span className="text-dusty-rose">M</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-foreground/80 hover:text-dusty-rose transition-colors duration-300 relative font-display after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-dusty-rose after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-foreground touch-bounce"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-80 mt-4" : "max-h-0"
          }`}
        >
          <div className="bg-cream/98 backdrop-blur-md rounded-xl p-4 shadow-soft border border-dusty-rose/10">
            {navLinks.map((link, index) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`block w-full text-left py-3 px-4 text-foreground/80 hover:text-dusty-rose rounded-lg transition-colors duration-200 font-display ${
                  index % 2 === 0 ? "hover:bg-dusty-rose/10" : "hover:bg-sage-green/10"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
