import { useEffect } from 'react';

// Custom hook for scroll-based animations without external dependencies
export const useScrollAnimations = () => {
  useEffect(() => {
    // Text reveal animation for elements with reveal-text class
    const revealElements = document.querySelectorAll('.reveal-text');
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          
          // Split text into words and animate them
          const words = element.innerText.split(' ');
          element.innerHTML = words.map((word, index) => 
            `<span class="inline-block opacity-15 transition-opacity duration-300 ease-out" style="transition-delay: ${index * 50}ms">${word}</span>`
          ).join(' ');
          
          // Trigger animation
          setTimeout(() => {
            const spans = element.querySelectorAll('span');
            spans.forEach((span, index) => {
              setTimeout(() => {
                span.style.opacity = '1';
              }, index * 50);
            });
          }, 100);
          
          // Stop observing this element
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -20% 0px'
    });

    revealElements.forEach((el) => {
      el.classList.add('opacity-100');
      observer.observe(el);
    });

    // Fade up animation
    const fadeUpCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    };

    const fadeUpObserver = new IntersectionObserver(fadeUpCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    });

    const fadeUpElements = document.querySelectorAll('.animate-fade-up');
    fadeUpElements.forEach((el) => fadeUpObserver.observe(el));

    return () => {
      observer.disconnect();
      fadeUpObserver.disconnect();
    };
  }, []);
};

// Smooth scrolling utility
export const initSmoothScrolling = () => {
  // deno-lint-ignore no-explicit-any
  let lenis: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any

  const loadLenis = async () => {
    try {
      const Lenis = (await import('@studio-freight/lenis')).default;
      
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);
    } catch {
      console.warn('Lenis not available, using native smooth scroll');
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  };

  loadLenis();

  return () => {
    if (lenis) {
      lenis.destroy();
    }
  };
};