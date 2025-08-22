import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import FloatingGrid from "./FloatingGrid";
const Hero = () => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    });

    const elements = document.querySelectorAll('.animate-fade-up');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
   <section className="relative min-h-screen bg-postlabs-yellow flex flex-col overflow-hidden">
      {/* Floating Grid in the background */}
      <FloatingGrid />

      {/* Hero Glow Effect */}
      <div className="hero-glow absolute -top-48 -right-48 w-96 h-96 bg-gradient-radial from-postlabs-white/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="flex-1 flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-16 relative z-10">
        {/* Logo and Tagline */}
        <div className="animate-fade-up mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="text-postlabs-black font-bold text-xl md:text-2xl">
              &lt;/&gt;PostLabs
            </div>
          </div>
          <p className="text-postlabs-black text-lg md:text-xl max-w-2xl leading-relaxed">
            We're building the backbone of Canadian digital media — 
            a next-gen platform that gives creators the tools to thrive.
          </p>
        </div>

        {/* Main Heading */}
        <div className="relative max-w-6xl">
          <h1
            className="text-display text-postlabs-black mb-8 reveal-text"
            data-animation="text"
            data-speed="1.2"
          >
            The Future of
            <br />
            News Starts Here
          </h1>
        </div>

        {/* Down Arrow */}
        <div className="down-arrow animate-bounce mt-12">
          <ChevronDown className="w-8 h-8 text-postlabs-black" />
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-16" />
    </section>
  );
};

export default Hero;