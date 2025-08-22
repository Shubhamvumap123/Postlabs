import React from "react";

const PrivacySection: React.FC = () => {
  return (
    <section className="relative z-[1] bg-[var(--_neutrals---cream)]">
      {/* Floating grid (background lines) */}
      <div className="absolute inset-0 z-[-1] grid grid-cols-[20%_1fr_1fr_20%] md:grid-cols-[40px_1fr_1fr_40px]">
        <div className="border-r border-[var(--_primary---black)] opacity-10"></div>
        <div className="border-r border-[var(--_primary---black)] opacity-10"></div>
        <div className="border-r border-[var(--_primary---black)] opacity-10"></div>
        <div className="border-r border-[var(--_primary---black)] opacity-10"></div>
      </div>

      {/* Content container */}
      <div className="container mx-auto px-10 md:px-[50px] lg:px-[40px]">
        {/* Section 1 */}
        <div className="grid grid-cols-[20%_1fr_1fr_20%] md:grid-cols-[40px_1fr_1fr_40px] py-[220px] md:py-[100px] relative">
          <div className="col-span-1"></div>
          <div className="col-span-2 flex flex-col items-start gap-6">
            <p className="text-lg md:text-xl font-medium max-w-[650px] leading-snug">
              Post Labs is building a homegrown platform designed for Canadians
              and the future of Canadian media.
            </p>
            <img
              src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2/68266ea52e91d548861b8d20_icon-1-transparent.svg"
              alt=""
              className="w-12 h-12"
            />
          </div>
        </div>

        {/* Section 2 */}
        <div className="grid grid-cols-[20%_1fr_1fr_20%] md:grid-cols-[40px_1fr_1fr_40px] py-[220px] md:py-[100px] relative">
          <div className="col-span-1"></div>
          <div className="col-span-2 flex flex-col items-start gap-6">
            <p className="text-lg md:text-xl font-medium max-w-[650px] leading-snug">
              At its core is PostOS, our made-in-Canada publishing engine that
              connects local voices, communities, and trusted journalism in one
              seamless digital experience.
            </p>
            <img
              src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2/68267094af8c90b6a17e323a_icon-2-transparent.svg"
              alt=""
              className="w-12 h-12"
            />
          </div>
        </div>

        {/* Section 3 */}
        <div className="grid grid-cols-[20%_1fr_1fr_20%] md:grid-cols-[40px_1fr_1fr_40px] py-[220px] md:py-[100px] relative">
          <div className="col-span-1"></div>
          <div className="col-span-2 flex flex-col items-start gap-6">
            <p className="text-lg md:text-xl font-medium max-w-[650px] leading-snug">
              Built by Canadians, for Canadians, PostOS is more than just
              technology — it’s a way to bring our stories home.
            </p>
            <img
              src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2/68267087adfa3ad7422b8753_icon-3-transparent.svg"
              alt=""
              className="w-12 h-12"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacySection;
