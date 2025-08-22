import { Button } from '../components/ui/button';
import { useEffect } from 'react';

const About = () => {
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
    <section className="about-section section-padding bg-postlabs-white">
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Content */}
        <div className="animate-fade-up">
          <h2 
            className="text-heading-xl text-postlabs-black mb-8 reveal-text leading-tight"
            data-animation="text"
            data-speed="0.8"
          >
            Post Labs is rethinking how digital media works for Canadians. Our mission is simple: make journalism profitable, sustainable, and trusted —{' '}
            <span className="text-postlabs-gray">
              built for Canadians, by Canadians.
            </span>
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <Button className="btn-secondary">
            About
          </Button>
          <Button className="btn-primary">
            Contact
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;