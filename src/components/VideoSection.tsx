import { useEffect, useRef } from 'react';

const VideoSection = () => {
  const videoRef = useRef<HTMLDivElement>(null);

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
    <section className="full-width-video-section section-padding bg-postlabs-white">
      <div 
        ref={videoRef}
        className="w-full h-[70vh] bg-gradient-to-br from-postlabs-light-gray to-postlabs-yellow/20 rounded-3xl overflow-hidden relative animate-fade-up"
      >
        {/* Video/Image Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-postlabs-black/20 to-postlabs-black/60" />
        
        {/* Overlay Content */}
        <div className="absolute bottom-8 left-8 right-8 text-postlabs-white">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn-secondary bg-postlabs-white/10 backdrop-blur-sm border-postlabs-white/30 text-postlabs-white hover:bg-postlabs-white hover:text-postlabs-black">
              About
            </button>
            <button className="btn-primary bg-postlabs-black/80 backdrop-blur-sm">
              Contact
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-12 left-12 w-16 h-16 bg-postlabs-yellow/30 rounded-full blur-xl" />
        <div className="absolute bottom-12 right-12 w-24 h-24 bg-postlabs-white/20 rounded-full blur-2xl" />
      </div>
    </section>
  );
};

export default VideoSection;