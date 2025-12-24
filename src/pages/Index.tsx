import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CoupleSection from "@/components/CoupleSection";
import CountdownSection from "@/components/CountdownSection";
import LoveStorySection from "@/components/LoveStorySection";
import EventSection from "@/components/EventSection";
import GallerySection from "@/components/GallerySection";
import ArtFilterSection from "@/components/ArtFilterSection";
import GiftSection from "@/components/GiftSection";
import RSVPSection from "@/components/RSVPSection";
import FooterSection from "@/components/FooterSection";
import MusicPlayer from "@/components/MusicPlayer";

const Index = () => {
  const [searchParams] = useSearchParams();
  
  const guestName = searchParams.get("to")?.replace(/_/g, " ") || undefined;

  return (
    <main className="min-h-screen bg-cream">
      <Navigation />
      <HeroSection guestName={guestName} />
      <CoupleSection />
      <CountdownSection />
      <LoveStorySection />
      <EventSection />
      <GallerySection />
      <ArtFilterSection />
      <GiftSection />
      <RSVPSection />
      <FooterSection />
      <MusicPlayer />
    </main>
  );
};

export default Index;
