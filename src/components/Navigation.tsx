import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { Home, LayoutDashboard, Settings, Mail } from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Contact', path: '/contact-us', icon: Mail },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = globalThis.scrollY;
      setIsVisible(scrollY > 100);
    };

    addEventListener('scroll', handleScroll);
    return () => removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Banner - Only on Home */}
      {location.pathname === '/' && (
        <div className="bg-zinc-950 dark:bg-zinc-900 text-white py-3 px-6 text-center text-sm font-medium relative z-50 transition-colors">
          Help shape the future of digital journalism — we're hiring!
        </div>
      )}

      {/* Main Navigation */}
      <nav 
        className={cn(
            "fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-out max-w-[90vw]",
             isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'
        )}
      >
        <div className="flex items-center gap-1 sm:gap-2 p-2 bg-background/80 backdrop-blur-md border border-border rounded-full shadow-lg">
           {navItems.map((item) => {
               const isActive = location.pathname === item.path;
               return (
                   <Link
                     key={item.path}
                     to={item.path}
                     aria-label={item.name}
                     aria-current={isActive ? 'page' : undefined}
                     className={cn(
                       "flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium",
                       isActive
                         ? "bg-zinc-800 text-zinc-100 shadow-sm"
                         : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
                     )}
                   >
                     <item.icon className="w-4 h-4" />
                     <span className="hidden sm:inline">{item.name}</span>
                   </Link>
               )
           })}
           <div className="w-px h-6 bg-border mx-1" />
           <div className="px-1">
             <ThemeToggle />
           </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
