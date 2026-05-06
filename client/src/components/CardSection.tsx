import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const cards = [
  {
    id: 1,
    icon: "https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2/68239a34145625a862ba3d54_icon-1.svg",
    text: "Empowering Creators.",
  },
  {
    id: 2,
    icon: "https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2/68239b7ac5ddc2008b2da9b7_icon-2.svg",
    text: "Transforming Publishing.",
  },
  {
    id: 3,
    icon: "https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2/68239b7ab5708009ef8f649e_icon-3.svg",
    text: "Reclaiming Canadian Media.",
  },
];

const CardSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.6 }); // trigger earlier
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      // ✅ On screen → spread horizontally
      controls.start((i) => ({
        x: i === 0 ? -300 : i === 2 ? 300 : 0, // left, center, right
        y: 0,
        scale: 1,
        zIndex: 10 - i,
        transition: { duration: 0.9, ease: "easeOut" },
      }));
    } else {
      // ✅ Leaving → collapse closer, then overlap
      controls.start((i) => ({
        x: 0, // move to center
        y: 0,
        scale: 1,
        zIndex: 20 - i, // overlap order
        transition: { duration: 1.2, ease: "easeInOut" },
      }));
    }
  }, [inView, controls]);

  return (
    <section className="relative z-[9999] py-20">
      <div
        className="relative w-full flex justify-center items-center"
        ref={ref}
        style={{ height: "400px" }}
      >
        {cards.map((card, i) => (
          <motion.div
            key={card.id}
            custom={i}
            animate={controls}
            initial={{
              x: i === 0 ? -300 : i === 2 ? 300 : 0, // start spread
              scale: 1,
              zIndex: 10 - i,
            }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="absolute bg-black rounded-xl shadow-xl w-64 h-48 p-4 cursor-pointer"
          >
            <img
              src={card.icon}
              alt={card.text}
              className="w-10 h-10 absolute top-2 left-2"
            />
            <div className="text-white text-base font-medium mt-10">
              {card.text}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CardSection;
