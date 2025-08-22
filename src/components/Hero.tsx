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
    <section className="relative min-h-screen bg-yellow flex flex-col overflow-hidden">
      {/* 🔳 Floating Grid in the background */}
      <div
        className="
          absolute inset-0 
          grid grid-cols-[20%_1fr_1fr_20%] 
          grid-rows-[repeat(12,minmax(80px,1fr))] 
          gap-0 auto-cols-fr 
          -z-10
        "
      >
        {/* Vertical lines */}
        <div className="border-r border-gray-300" />
        <div className="border-r border-gray-300" />
        <div className="border-r border-gray-300" />
        <div />

        {/* Horizontal lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="col-span-4 border-b border-gray-300"
          />
        ))}
      </div>

      {/* 🌟 Hero Glow Effect */}
      <div className="hero-glow absolute -top-48 -right-48 w-96 h-96 bg-gradient-radial from-white/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* 🔝 Hero Content */}
  <div className="flex-1 flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-16 relative z-10"> 
  {/* Logo + Tagline - updated to use grid like PostLabs */}
  <div className="grid grid-cols-[20%_1fr_1fr_1fr] items-center gap-4 animate-fade-up mb-12 relative z-5">
          <a href="/" aria-current="page" className="logo-link w-inline-block w--current">
            <img
              src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2/68227dfdc407523fbe5b56e7_post-labs-logo.svg"
              loading="lazy"
              data-animation="fadeup"
              alt="Post Labs logo"
              className="logo"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                opacity: 1
              }}
            />
          </a>
          <div></div>
          <div></div>
          <p className="text-black leading-relaxed">
            We're building the backbone of Canadian digital media —
            a next-gen platform that gives creators the tools to thrive.
          </p>
        </div>

        {/* Heading */}
        <div className="relative max-w-6xl">
          <h1
            className="text-4xl md:text-6xl font-extrabold text-black mb-8 reveal-text"
            data-animation="text"
            data-speed="1.2"
          >
            The Future of
            <br />
            News Starts Here
          </h1>
        </div>

        {/* ⬇️ Down Arrow */}
        <div className="down-arrow animate-bounce mt-12">
          <ChevronDown className="w-8 h-8 text-black" />
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-16" />
    </section>
  );
};

export default Hero;