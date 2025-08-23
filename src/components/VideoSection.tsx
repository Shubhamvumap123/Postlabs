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
     <section className="relative bg-[#f8f8f2]">
      {/* Sticky container */}
      <div className="sticky top-0 z-10 h-screen">
        <div className="relative flex h-screen items-end justify-start">
          {/* Video backgrounds */}
          <div className="absolute inset-0 overflow-hidden">
            {/* First Video */}
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              poster="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F6827802fb93caba00853824a_video2-poster-00001.jpg"
            >
              <source src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F6827802fb93caba00853824a_video2-transcode.mp4" type="video/mp4" />
              <source src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F6827802fb93caba00853824a_video2-transcode.webm" type="video/webm" />
            </video>

            {/* Example of second video (hidden by default, you can toggle with state) */}
            <video
              className="absolute inset-0 h-full w-full object-cover opacity-0"
              autoPlay
              loop
              muted
              playsInline
              poster="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F682dd7a24d93a7df690274d9_post-labs-video-3-poster-00001.jpg"
            >
              <source src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F682dd7a24d93a7df690274d9_post-labs-video-3-transcode.mp4" type="video/mp4" />
              <source src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F682dd7a24d93a7df690274d9_post-labs-video-3-transcode.webm" type="video/webm" />
            </video>
          </div>

          {/* Text Overlay */}
          <div className="relative z-20 grid gap-4 p-10 md:p-16">
            <h3 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Built for
            </h3>
            <div className="space-y-2">
              <h3 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold">
                Scale
              </h3>
              <h3 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold opacity-50">
                Creators
              </h3>
              <h3 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold opacity-50">
                Canada
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;

