"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import leftBg from "../assets/left-bg.png"; // replace with actual imported images
import rightBg from "../assets/right-bg.png";

export default function PoweredSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Variants
  const fadeFromTop = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <section ref={ref} className="relative w-full py-10 px-6 sm:px-10 bg-gradient-to-br from-[#f3fdfb] to-[#e6f9f5] overflow-hidden rounded-[36px] max-w-7xl mx-auto mt-20 mb-20 shadow-xl">
      
      {/* Background Images */}
      <motion.img
        src={leftBg}
        alt="Background Left"
        className="absolute -left-155 top-1/2 transform -translate-y-1/2 w-[700px] md:w-[1290px] pointer-events-none select-none"
        variants={fadeLeft}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />

      <motion.img
        src={rightBg}
        alt="Background Right"
        className="absolute -right-155 top-65 transform -translate-y-1/2 w-[700px] md:w-[1390px] pointer-events-none select-none"
        variants={fadeRight}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />

      

      {/* Content */}
      <div className="relative z-20 text-center max-w-3xl mx-auto">
        <motion.div
  variants={fadeFromTop}
  initial="hidden"
  animate={isInView ? "visible" : "hidden"}
  className="inline-block px-5 py-2 mb-6 text-sm font-medium rounded-full relative"
  style={{
    background: "radial-gradient(67.75% 410.61% at 46.75% 51.52%, rgba(133, 255, 207, 0.2) 0%, rgba(248, 255, 252, 0.2) 100%)",
    color: "#0f766e",
  }}
>
  {/* Gradient border using pseudo-element technique */}
  <div 
    className="absolute inset-0 rounded-full"
    style={{
      background: "radial-gradient(101.22% 111.76% at 5.86% 80%, #BB86FC 11.82%, #00EB8F 26.11%, #0A0F1C 57.19%, #0A0F1C 70.17%, #BB86FC 90.27%, #00EB8F 99.37%)",
      zIndex: -1,
      padding: '1.5px',
      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      maskComposite: 'exclude',
      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'xor',
    }}
  ></div>
  
  AI Powered Assistance
</motion.div>

        <motion.h1
          variants={fadeFromTop}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-neutral-900 leading-tight mb-4"
        >
          Start Leveraging AI for UNSC Intelligence Today
        </motion.h1>

        <motion.p
          variants={fadeFromTop}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.2 }}
          className="text-base text-gray-700 mb-8"
        >
          Join the governments, diplomats, and humanitarian actors who trust Aperture Futures
          for accurate, strategic, and rapid UNSC analysis.
        </motion.p>

       <motion.a
  variants={fadeFromTop}
  initial="hidden"
  animate={isInView ? "visible" : "hidden"}
  transition={{ delay: 0.3 }}
  href="#"
  className="inline-block px-8 py-4 rounded-full font-semibold text-white relative group overflow-hidden "
  style={{
    background: "#00EB8F",
    isolation: "isolate", // This creates a new stacking context
  }}
>
  {/* Gradient border - fixed approach */}
  <div 
    className="absolute inset-0 rounded-full -z-10"
    style={{
      background: "radial-gradient(141.93% 121.88% at -31.25% 101.04%, #345EFA 0%, #B806E6 33.62%, #0A0F1C 63.42%, #0A0F1C 73.39%, #0551DD 83.71%, #00EB8F 99.37%)",
      padding: '1.5px',
      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      maskComposite: 'exclude',
      WebkitMaskComposite: 'xor',
    }}
  ></div>

  {/* Hover effect */}
  
  <span className="relative z-10">Get Started Free →</span>
</motion.a>
      </div>
    </section>
  );
}