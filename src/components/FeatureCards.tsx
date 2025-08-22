import { useEffect, useRef } from 'react';

const FeatureCards = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    {
      title: "Empowering",
      subtitle: "Creators.",
      description: "Give journalists and content creators the tools they need to build sustainable, independent media businesses.",
      pattern: "grid-pattern-1"
    },
    {
      title: "Transforming",
      subtitle: "Publishing.",
      description: "Revolutionary publishing platform that puts creators first, with fair revenue sharing and creative control.",
      pattern: "grid-pattern-2"
    },
    {
      title: "Reclaiming",
      subtitle: "Canadian Media.",
      description: "Building a thriving Canadian digital media ecosystem that serves local communities and tells our stories.",
      pattern: "grid-pattern-3"
    }
  ];

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
    <section ref={sectionRef} className="card-section section-padding bg-postlabs-light-gray">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 
            className="text-heading-xl text-postlabs-black mb-6 reveal-text"
            data-animation="text"
            data-speed="1"
          >
            What We're Building
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`card feature-card animate-fade-up`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Pattern */}
              <div className="absolute top-8 left-8">
                <div className="w-12 h-12 grid grid-cols-4 gap-1">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div 
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < 8 ? 'bg-postlabs-yellow' : 'bg-postlabs-yellow/30'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="mt-20">
                <h3 className="text-3xl md:text-4xl font-bold mb-2 text-postlabs-white">
                  {feature.title}
                </h3>
                <h4 className="text-3xl md:text-4xl font-bold mb-6 text-postlabs-white">
                  {feature.subtitle}
                </h4>
                <p className="text-postlabs-white/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;