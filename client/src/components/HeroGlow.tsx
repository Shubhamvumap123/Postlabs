import React, { useEffect, useRef } from "react";

const HeroGlow: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  // PERFORMANCE: Track mouse position with useRef to prevent re-renders on every mousemove.
  // Directly update DOM element using requestAnimationFrame for smooth animation without stalling the main thread.
  const positionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${positionRef.current.x - 300}px, ${positionRef.current.y - 300}px) scale(0.95)`;
      }
      rafRef.current = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updatePosition);
      }
    };

    globalThis.addEventListener("mousemove", handleMouseMove as EventListener);

    return () => {
      globalThis.removeEventListener("mousemove", handleMouseMove as EventListener);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="hero-glow-container fixed inset-0 pointer-events-none z-0">
      <div
        ref={glowRef}
        className="
          absolute w-[600px] h-[600px] 
          rounded-full 
          blur-3xl 
          transition-transform duration-300 ease-out 
          pointer-events-none
        "
        style={{
          background: "radial-gradient(circle, rgba(250, 204, 21, 0.7), rgba(250, 204, 21, 0.4), rgba(0,0,0,0.7))", // stronger yellow with dark edge
          transform: `translate(${positionRef.current.x - 300}px, ${positionRef.current.y - 300}px) scale(0.95)`,
          opacity: 1,
        }}
      />
    </div>
  );
};

export default HeroGlow;
