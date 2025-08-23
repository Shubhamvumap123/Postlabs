import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import FloatingGrid from "./FloatingGrid";
import Header from './Header';
import HeroGlow from './HeroGlow';
import CardSection from './CardSection';
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
        

      </div>

      {/* 🌟 Hero Glow Effect */}
      <div className="hero-glow absolute -top-48 -right-48 w-96 h-96 bg-gradient-radial from-white/20 to-transparent rounded-full blur-3xl pointer-events-none" />
<HeroGlow />
      {/* 🔝 Hero Content */}
 <div className="flex-1 flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-16 relative z-10">
  {/* 🔳 Header Section (Logo + Tagline) */}
  <Header />

 <section className="hero relative z-10">
      {/* container.bottom-0 */}
      <div className="relative z-[1]">
        {/* hero-wrapper */}
        <div className="flex justify-between items-end gap-10 pt-[180px] pb-0">
          {/* H1 */}
          <h1
            data-speed="0.5"
            data-animation="text"
            aria-label="The Future of News Starts Here"
            className="font-normal text-[120px] leading-[100%] max-w-[1097px] mb-10 md:mb-0"
          >
            <span className="anim-word inline-block">The Future of News Starts Here</span>{" "}
          </h1>

          {/* Down Arrow */}
          <img
            src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2/68238111591ea94a69065212_Vector.svg"
            loading="lazy"
            alt="Down arrow"
            className="down-arrow w-32 h-32 animate-bounce-slow"
          />
        </div>
        <style>
          {`
            @keyframes bounce-slow {
              0%, 100% {
          transform: translateY(0);
          animation-timing-function: cubic-bezier(0.8,0,1,1);
              }
              50% {
          transform: translateY(-25%);
          animation-timing-function: cubic-bezier(0,0,0.2,1);
              }
            }
            .animate-bounce-slow {
              animation: bounce-slow 8s infinite;
            }
          `}
        </style>
      </div>
    </section>
</div>

      {/* Bottom spacing */}
      <CardSection/>
    </section>
  );
};

export default Hero;