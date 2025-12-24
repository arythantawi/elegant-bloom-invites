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
  const navLinks = [{
    href: "#countdown-section",
    label: "Countdown"
  }, {
    href: "#love-story-section",
    label: "Kisah Kami"
  }, {
    href: "#event-section",
    label: "Acara"
  }, {
    href: "#gallery-section",
    label: "Galeri"
  }, {
    href: "#rsvp-section",
    label: "RSVP"
  }];
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  };
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-card/95 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"}`}>
      

      {/* Mobile Menu */}
      {isMobileMenuOpen && <div className="md:hidden absolute top-full left-0 right-0 bg-card/95 backdrop-blur-md shadow-lg py-4">
          <div className="flex flex-col items-center gap-4">
            {navLinks.map(link => <button key={link.href} onClick={() => scrollToSection(link.href)} className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium">
                {link.label}
              </button>)}
          </div>
        </div>}
    </nav>;
};
export default Navigation;