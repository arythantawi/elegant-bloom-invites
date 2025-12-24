import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CountdownSection from "@/components/CountdownSection";
import LoveStorySection from "@/components/LoveStorySection";
import EventSection from "@/components/EventSection";
import GallerySection from "@/components/GallerySection";
import RSVPSection from "@/components/RSVPSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-cream-white">
      <Navigation />
      <HeroSection />
      <CountdownSection />
      <LoveStorySection />
      <EventSection />
      <GallerySection />
      <RSVPSection />
      <FooterSection />
    </main>
  );
};

export default Index;
