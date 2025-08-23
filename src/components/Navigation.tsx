import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-black text-white py-3 px-6 text-center text-sm font-medium relative z-50">
        Help shape the future of digital journalism — we're hiring!
      </div>

      {/* Main Navigation */}
      <nav 
        className={`fixed bottom-6 left-1/2 -translate-x-1/2  z-40 transition-all duration-500 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
        }`}
      >
<div
  className="
    flex justify-center items-center
    gap-1
    p-[5px]
    bg-black/50
    rounded-[100px]
    shadow-lg
    border
    border-gray-200
    backdrop-blur-[5px]
  "
>
  {/* Desktop Navigation */}
    <div className="flex gap-2">
      <a
        href="/"
        className="
          inline-block text-center font-['Inter_Tight',Verdana,sans-serif]
          rounded-full min-w-[100px] px-6 py-3
          transition-all duration-300
          bg-white text-black
          no-underline
        "
      >
        About
      </a>

      {/* Contact Link */}
      <a
        href="/contact-us"
        className="
          inline-block text-center font-['Inter_Tight',Verdana,sans-serif]
          rounded-full min-w-[100px] px-6 py-3
          transition-all duration-300
          text-white hover:bg-white hover:text-black
          no-underline
        "
      >
        Contact
      </a>
    </div>
</div>

        
      </nav>

    </>
  );
};

export default Navigation;