import { useEffect } from "react";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import FeatureCards from "../components/FeatureCards";
import About from "../components/About";
import VideoSection from "../components/VideoSection";
import BuildingSection from "../components/BuildingSection";
import Footer from "../components/Footer";
import { useScrollAnimations, initSmoothScrolling } from "../hooks/useScrollAnimations";
import FullWidthVideoSection from "../components/FullWidthVideoSection";
import PrivacySection from "../components/PrivacySection";
import FloatingGrid from "../components/FloatingGrid";

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
