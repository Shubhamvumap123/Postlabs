import React from "react";
import { motion } from "framer-motion";

const PrivacySection: React.FC = () => {
  return (
    <div className="container mx-auto px-10 md:px-[50px] lg:px-[40px]">
  <div className="container mx-auto px-10 md:px-[50px] lg:px-[40px]">
  {/* Section 1 */}
  <div className="grid grid-cols-[20%_1fr_1fr_20%] md:grid-cols-[40px_1fr_1fr_40px] py-[220px] md:py-[100px] relative">
    <div className="col-span-1"></div>
    <div className="col-span-2 flex flex-col items-start gap-6">
      <p className="z-2 text-6xl md:text-4xl font-normal max-w-[650px] leading-snug">
        Post Labs is building a homegrown platform designed for Canadians
        and the future of Canadian media.
      </p>
      <img
        src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2/68266ea52e91d548861b8d20_icon-1-transparent.svg"
        alt=""
        className="w-40 h-40 absolute"
      />
    </div>
  </div>

  {/* Section 2 (Animate on scroll - Horizontal) */}
  <motion.div
    className="grid grid-cols-[20%_1fr_1fr_20%] md:grid-cols-[40px_1fr_1fr_40px] py-[220px] md:py-[100px] relative"
    style={{ marginTop: "50vh",marginLeft:"80vh", }} // start halfway down page
    initial={{ opacity: 0, x: 200 }} // off-screen to the right
    whileInView={{ opacity: 1, x: 0 }} // slide in to normal position
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.5 }} // trigger when 50% visible
  >
    <div className="col-span-1"></div>
    <div className="col-span-2 flex flex-col items-start gap-6">
      <p className="z-2 text-6xl md:text-4xl font-normal max-w-[650px] leading-snug">
        At its core is PostOS, our made-in-Canada publishing engine that
        connects local voices, communities, and trusted journalism in one
        seamless digital experience.
      </p>
      <img
        src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2/68267094af8c90b6a17e323a_icon-2-transparent.svg"
        alt=""
        className="w-40 h-40 absolute"
      />
    </div>
  </motion.div>

  {/* Section 3 (Animate on scroll - Horizontal) */}
  <motion.div
    className="grid grid-cols-[20%_1fr_1fr_20%] md:grid-cols-[40px_1fr_1fr_40px] py-[220px] md:py-[100px] relative"
    style={{ marginTop: "50vh", }} // also starts halfway down
    initial={{ opacity: 0, x: 200 }} // off-screen to the right
    whileInView={{ opacity: 1, x: 0 }} // slide in to position
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.5 }}
  >
    <div className="col-span-1"></div>
    <div className="col-span-2 flex flex-col items-start gap-6">
      <p className="z-2 text-6xl md:text-4xl font-normal max-w-[650px] leading-snug">
        Built by Canadians, for Canadians, PostOS is more than just
        technology — it’s a way to bring our stories home.
      </p>
      <img
        src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2/68267087adfa3ad7422b8753_icon-3-transparent.svg"
        alt=""
        className="w-40 h-40 absolute"
      />
    </div>
  </motion.div>
</div>

    </div>
  );
};

export default PrivacySection;
