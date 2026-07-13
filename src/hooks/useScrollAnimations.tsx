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
          // SECURITY: Replacing innerHTML assignment with textContent for XSS prevention
          const words = element.innerText.split(' ');
          element.textContent = ''; // Clear existing content

          // PERFORMANCE: Batch DOM mutations using a DocumentFragment
          const fragment = document.createDocumentFragment();

          words.forEach((word, index) => {
            const span = document.createElement('span');
            span.className = 'inline-block opacity-15 transition-opacity duration-300 ease-out';
            span.style.transitionDelay = `${index * 50}ms`;
            span.textContent = word;
            fragment.appendChild(span);

            // Add space between words, but avoid trailing spaces
            if (index < words.length - 1) {
                fragment.appendChild(document.createTextNode(' '));
            }
          });

          element.appendChild(fragment);
          
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
  let rafId: number | null = null;
  let isDestroyed = false;

  const loadLenis = async () => {
    try {
      const Lenis = (await import('@studio-freight/lenis')).default;
      if (isDestroyed) return;
      
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    } catch {
      if (isDestroyed) return;
      console.warn('Lenis not available, using native smooth scroll');
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  };

  loadLenis();

  return () => {
    isDestroyed = true;
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }
    if (lenis) {
      lenis.destroy();
    }
  };
};