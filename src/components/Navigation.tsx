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
  return;
};
export default Navigation;