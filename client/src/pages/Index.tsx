import { useEffect } from "react";
import Navigation from "../components/Navigation.tsx";
import Hero from "../components/Hero.tsx";
import FeatureCards from "../components/FeatureCards.tsx";
import About from "../components/About.tsx";
import VideoSection from "../components/VideoSection.tsx";
import BuildingSection from "../components/BuildingSection.tsx";
import Footer from "../components/Footer.tsx";
import { useScrollAnimations, initSmoothScrolling } from "../hooks/useScrollAnimations.tsx";
import FullWidthVideoSection from "../components/FullWidthVideoSection.tsx";
import PrivacySection from "../components/PrivacySection.tsx";
import FloatingGrid from "../components/FloatingGrid.tsx";

const Index = () => {
  useScrollAnimations();

  useEffect(() => {
    const cleanup = initSmoothScrolling();
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen bg-background font-['Inter_Tight',Verdana,sans-serif]">
      <Navigation />
      {/* relative container so FloatingGrid stays only behind main content */}
      <div className="relative">
        <FloatingGrid />
        <main className="relative z-10">
          <Hero />
          <About />
          <FullWidthVideoSection />
          <BuildingSection />
          <PrivacySection />
          <VideoSection />
          <FeatureCards />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
