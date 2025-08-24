import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function FullWidthVideoSection() {
  const videoRef = useRef(null);
  const isInView = useInView(videoRef, { margin: "0px 0px -50% 0px" });

  return (
    <section className="relative z-10 bg-[#f8f8f2]">
      {/* Video Background with shrink animation when leaving screen */}
      <motion.div
        ref={videoRef}
        className="relative w-full h-screen overflow-hidden"
        animate={{
          width: isInView ? '100%' : '80%',
          height: isInView ? '100vh' : '60vh',
          margin: isInView ? '0 auto' : '50px auto',
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F682e229ec192a9f049ae0b4a_post-labs-video-1-poster-00001.jpg"
        >
          <source src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F682e229ec192a9f049ae0b4a_post-labs-video-1-transcode.mp4" type="video/mp4" />
          <source src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F682e229ec192a9f049ae0b4a_post-labs-video-1-transcode.webm" type="video/webm" />
        </video>
      </motion.div>

      {/* Floating Grid Overlay */}
      <div className="absolute inset-0 grid grid-cols-4">
        <div className="border-r border-black opacity-10"></div>
        <div className="border-r border-black opacity-10"></div>
        <div className="border-r border-black opacity-10"></div>
        <div></div>
      </div>
    </section>
  );
}
