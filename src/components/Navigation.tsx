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
        <div className="flex justify-center mx-6 md:mx-8 lg:mx-10">
<div
  className="
    w-[250px] bg-white/95 backdrop-blur-md 
    rounded-full px-6 py-4 shadow-lg border border-gray-200 
    flex items-center justify-between
  "
>
  {/* Desktop Navigation */}
  <div className="hidden md:flex items-center justify-between space-x-4">
    <Button variant="ghost" className="btn-ghost">
      About
    </Button>
    <Button variant="ghost" className="btn-ghost">
      Contact
    </Button>
  </div>

  {/* Mobile Menu Button */}
  <button
    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    className="md:hidden p-2 text-black"
    aria-label="Toggle menu"
  >
    <div className="w-5 h-5 flex flex-col justify-center space-y-1">
      <span
        className={`h-0.5 bg-current transition-all duration-300 ${
          isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
        }`}
      />
      <span
        className={`h-0.5 bg-current transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-0" : ""
        }`}
      />
      <span
        className={`h-0.5 bg-current transition-all duration-300 ${
          isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
        }`}
      />
    </div>
  </button>
</div>

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden">
          <div className="absolute top-32 left-6 right-6">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="space-y-4">
                <Button variant="ghost" className="w-full justify-start text-left" onClick={() => setIsMobileMenuOpen(false)}>
                  About
                </Button>
                <Button variant="ghost" className="w-full justify-start text-left" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;