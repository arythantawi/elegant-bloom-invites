import { useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CountdownSection from "@/components/CountdownSection";
import LoveStorySection from "@/components/LoveStorySection";
import EventSection from "@/components/EventSection";
import GallerySection from "@/components/GallerySection";
import RSVPSection from "@/components/RSVPSection";
import FooterSection from "@/components/FooterSection";
import EnvelopeOpening from "@/components/EnvelopeOpening";

const Index = () => {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);

  return (
    <>
      {!isEnvelopeOpened && (
        <EnvelopeOpening onOpen={() => setIsEnvelopeOpened(true)} />
      )}
      
      <main
        className={`min-h-screen bg-cream-white transition-opacity duration-700 ${
          isEnvelopeOpened ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navigation />
        <HeroSection />
        <CountdownSection />
        <LoveStorySection />
        <EventSection />
        <GallerySection />
        <RSVPSection />
        <FooterSection />
      </main>
    </>
  );
};

export default Index;
