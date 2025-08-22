import { useEffect } from 'react';

const BuildingSection = () => {
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
    <section className="section-padding bg-postlabs-light-gray">
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-fade-up">
          <h2 
            className="text-display text-postlabs-black reveal-text"
            data-animation="text"
            data-speed="1"
          >
            What We're Building
          </h2>
        </div>
      </div>
    </section>
  );
};

export default BuildingSection;