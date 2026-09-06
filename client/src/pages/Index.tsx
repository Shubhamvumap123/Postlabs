import { useEffect } from "react";
import { Link } from "react-router-dom";
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
      <div className="absolute top-4 right-4 z-50 flex gap-4">
        <Link to="/login" className="px-4 py-2 text-sm font-medium text-white bg-zinc-800 rounded-md hover:bg-zinc-700">Login</Link>
        <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-500">Sign Up</Link>
      </div>
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
