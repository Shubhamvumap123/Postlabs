import React from "react";

const FloatingGrid: React.FC = () => {
  return (
    <div
      className="
        absolute inset-0 
        grid 
        grid-cols-[20%_1fr_1fr_20%] 
        grid-rows-[repeat(12,minmax(0,1fr))] 
        gap-0 
        -z-10
      "
    >
      {/* Vertical grid columns */}
      <div className="border-r border-white/10" />
      <div className="border-r border-white/10" />
      <div className="border-r border-white/10" />
      <div /> {/* last column no border-right */}

      {/* Horizontal grid lines (overlay using absolute positioning) */}
      <div
        className="
          absolute inset-0 
          grid grid-rows-[repeat(12,minmax(0,1fr))] 
        "
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="border-b border-white/10"
          />
        ))}
      </div>
    </div>
  );
};

export default FloatingGrid;
