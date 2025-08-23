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
    <section className="relative z-10 bg-[#fdfcf7]"> 
      {/* Container */}
      <div className="container mx-auto px-10 md:px-14 lg:px-20 py-24  relative z-10 animate-fade-up">
        {/* Heading */}
        <h1
          className="text-[90px] leading-none ml-0 mb-0 max-md:text-[110px] max-sm:text-5xl"
          aria-label="What We’re Building"
        >
          <span className="inline-block">What</span>{" "}
          <span className="inline-block">We’re</span>
          <br />
          <span className="inline-block">Building</span>
        </h1>
      </div>

      {/* Floating Grid */}
      <div className="absolute inset-0 grid grid-cols-[20%_1fr_20%] md:grid-cols-[40px_1fr_40px] z-0">
        <div className="border-r border-gray-200 opacity-10" />
        <div className="border-r border-gray-200 opacity-10" />
        <div className="border-r border-gray-200 opacity-10" />
        <div />
      </div>
    </section>
  );
};

export default BuildingSection;

