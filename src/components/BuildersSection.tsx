import { useEffect } from 'react';

const BuildersSection = () => {
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
    <section className="section-padding bg-postlabs-yellow">
      <div className="max-w-4xl mx-auto">
        {/* Main Heading */}
        <div className="animate-fade-up mb-12">
          <h2 
            className="text-display text-postlabs-black text-right reveal-text"
            data-animation="text"
            data-speed="1.2"
          >
            For Builders
          </h2>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div className="lg:order-2">
            <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
              <p className="text-body-lg text-postlabs-black mb-8 leading-relaxed">
                We're hiring. If you're passionate about media, technology, and the future of 
                Canada's digital ecosystem, come build with us. We're always looking for great 
                people. Check out our{' '}
                <a href="#" className="story-link font-medium">
                  jobs page
                </a>
                {' '}for current opportunities.
              </p>
              
              <div className="animate-fade-up" style={{ animationDelay: '400ms' }}>
                <a 
                  href="mailto:careers@postlabs.com" 
                  className="story-link text-xl font-medium text-postlabs-black"
                >
                  careers@postlabs.com
                </a>
              </div>
            </div>
          </div>
          
          <div className="lg:order-1">
            {/* Decorative Element */}
            <div className="animate-fade-up" style={{ animationDelay: '300ms' }}>
              <div className="w-32 h-32 bg-postlabs-black/10 rounded-3xl flex items-center justify-center">
                <div className="w-16 h-16 bg-postlabs-black rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildersSection;