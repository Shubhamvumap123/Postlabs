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
  <div className="z-[3] bg-black text-white text-center px-[60px] py-3 leading-[1.4] relative">
  Help shape the future of digital journalism — we're hiring!
</div>
    
    </>
  );
};

export default Navigation;