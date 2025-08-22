
import React, { useEffect, useState } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const text = "Post Labs is rethinking how digital media works for Canadians. Our mission is simple: make journalism profitable, sustainable, and trusted – built for Canadians, by Canadians.";
  
  useEffect(() => {
    // Trigger the animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className={`inline-block transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{
          transitionDelay: `${index * 50}ms`,
          whiteSpace: char === ' ' ? 'pre' : 'normal'
        }}
        aria-hidden="true"
      >
        {char}
      </span>
    ));
  };

  return (
    <section className="relative z-10 bg-cream-50 min-h-screen">
      {/* Floating Grid Background */}
      <div className="absolute inset-0 -z-10 grid grid-cols-[20%_1fr_1fr_20%] lg:grid-cols-[20%_1fr_1fr_20%] md:grid-cols-[40px_1fr_1fr_40px] gap-0">
        <div className="bg-gradient-to-br from-orange-50 via-transparent to-blue-50 opacity-30"></div>
        <div className="bg-gradient-to-tl from-yellow-50 via-transparent to-green-50 opacity-20"></div>
        <div className="bg-gradient-to-tr from-purple-50 via-transparent to-pink-50 opacity-25"></div>
        <div className="bg-gradient-to-bl from-indigo-50 via-transparent to-red-50 opacity-30"></div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-10 py-96 lg:py-80 md:py-60 sm:py-40">
        <div className="flex justify-center items-center min-h-full">
          <p
            className="text-center max-w-[594px] mx-auto mb-0 text-5xl lg:text-4xl md:text-3xl sm:text-2xl leading-[115%] font-medium text-gray-800 tracking-tight"
            aria-label={text}
          >
            <span className="sr-only">{text}</span>
            <span aria-hidden="true">
              {splitText(text)}
            </span>
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-tl from-orange-200 to-pink-200 rounded-full opacity-25 blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-5 w-24 h-24 bg-gradient-to-r from-green-200 to-yellow-200 rounded-full opacity-15 blur-lg animate-pulse" style={{animationDelay: '4s'}}></div>
    </section>
  );
};

export default About;