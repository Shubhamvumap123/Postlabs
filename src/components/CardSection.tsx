import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

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
  return (
    <section className="relative z-20 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={40}
          slidesPerView={1.2}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2.2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {cards.map((card) => (
            <SwiperSlide
              key={card.id}
              className="flex flex-row items-center justify-center text-center bg-black p-6 rounded-xl shadow-lg"
            >
              <img
                src={card.icon}
                alt={card.text}
                className="w-16 h-16 mb-6"
                loading="lazy"
              />
              <div className="text-lg md:text-xl font-medium leading-snug">
                {card.text}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CardSection;
