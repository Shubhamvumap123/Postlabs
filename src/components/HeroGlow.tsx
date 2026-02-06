import React, { useEffect, useState } from "react";

const HeroGlow: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    globalThis.addEventListener("mousemove", handleMouseMove);
    return () => globalThis.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="hero-glow-container fixed inset-0 pointer-events-none z-0">
      <div
        className="
          absolute w-[600px] h-[600px] 
          rounded-full 
          blur-3xl 
          transition-transform duration-300 ease-out 
          pointer-events-none
        "
        style={{
          background: "radial-gradient(circle, rgba(250, 204, 21, 0.7), rgba(250, 204, 21, 0.4), rgba(0,0,0,0.7))", // stronger yellow with dark edge
          transform: `translate(${position.x - 300}px, ${position.y - 300}px) scale(0.95)`,
          opacity: 1,
        }}
      />
    </div>
  );
};

export default HeroGlow;
