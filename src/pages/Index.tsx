import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CoupleSection from "@/components/CoupleSection";
import CountdownSection from "@/components/CountdownSection";
import LoveStorySection from "@/components/LoveStorySection";
import EventSection from "@/components/EventSection";
import GallerySection from "@/components/GallerySection";
import CaricatureSection from "@/components/CaricatureSection";
import GiftSection from "@/components/GiftSection";
import RSVPSection from "@/components/RSVPSection";
import FooterSection from "@/components/FooterSection";
import EnvelopeOpening from "@/components/EnvelopeOpening";
import MusicPlayer from "@/components/MusicPlayer";

const Index = () => {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [searchParams] = useSearchParams();
  
  // Get guest name from URL parameter ?to=NamaTamu
  const guestName = searchParams.get("to")?.replace(/_/g, " ") || undefined;

  return (
    <>
      {!isEnvelopeOpened && (
        <EnvelopeOpening 
          onOpen={() => setIsEnvelopeOpened(true)} 
          guestName={guestName}
        />
      )}
      
      <main
        className={`min-h-screen bg-cream-white transition-opacity duration-700 ${
          isEnvelopeOpened ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navigation />
        <HeroSection guestName={guestName} />
        <CoupleSection />
        <CountdownSection />
        <LoveStorySection />
        <EventSection />
        <GallerySection />
        <CaricatureSection />
        <GiftSection />
        <RSVPSection />
        <FooterSection />
        {isEnvelopeOpened && <MusicPlayer />}
      </main>
    </>
  );
};

export default Index;