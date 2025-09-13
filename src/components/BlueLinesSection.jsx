"use client";
import React, { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import bg1 from "../assets/Group1.png";
import bg2 from "../assets/Group2.png";
import bg3 from "../assets/Group3.png";
import bg4 from "../assets/Group4.png";
import chatMock from "../assets/chatmock1.png";

const BlueLinesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  // Memoized animation variants
  const variants = useMemo(() => ({
    imageLeft: {
      hidden: { opacity: 0, x: 100 },
      visible: { 
        opacity: 1, 
        x: 10, 
        transition: { duration: 0.5 } 
      }
    },
    imageRight: {
      hidden: { opacity: 0, x: 100 },
      visible: { 
        opacity: 1, 
        x: 10, 
        transition: { duration: 0.5 } 
      }
    },
    imageCenter: {
      hidden: { opacity: 0, x: 80 },
      visible: { 
        opacity: 1, 
        x: 0, 
        transition: { duration: 1 } 
      }
    },
    card: {
      hidden: { opacity: 0, x: 120, scale: 0.98 },
      visible: { 
        opacity: 1, 
        x: 0, 
        scale: 1, 
        transition: { 
          duration: 0.9, 
          ease: [0.16, 1, 0.3, 1], 
          delay: 0.15 
        }
      }
    },
    bubbleLeft: {
      hidden: { opacity: 0, x: 100 },
      visible: { 
        opacity: 1, 
        x: 0, 
        transition: { 
          duration: 0.8, 
          ease: "easeOut", 
          delay: 0.2 
        }
      }
    },
    bubbleRight: {
      hidden: { opacity: 0, x: -100 },
      visible: { 
        opacity: 1, 
        x: 0, 
        transition: { 
          duration: 0.8, 
          ease: "easeOut", 
          delay: 0.25 
        }
      }
    },
    fadeUp: (delay = 0) => ({
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
          duration: 0.5, 
          delay 
        }
      }
    })
  }), []);

  // Background image data
  const bgImages = [
    { src: bg1, className: "top-[0%] left-[10%]", variant: "imageLeft" },
    { src: bg2, className: "top-[25.2%] left-[16%]", variant: "imageRight" },
    { src: bg3, className: "top-[50.4%] left-[10%]", variant: "imageRight" },
    { src: bg4, className: "top-[75.5%] left-[16%]", variant: "imageRight" }
  ];

  // Content animation delays
  const contentDelays = [0.1, 0.2, 0.3, 0.4, 0.5];

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[675px] max-h-[650px] overflow-hidden py-10"
      style={{
        background: "linear-gradient(225deg, #0A1F88 0%, #1C8CFF 100%)",
      }}
    >
      {/* Background images */}
      <div className="absolute left-10 top-0 w-[2000px] h-full pointer-events-none">
        {bgImages.map((img, index) => (
          <motion.img
            key={`bg-${index}`}
            src={img.src}
            alt={`bg-${index + 1}`}
            className={`absolute w-[1940px] h-[170px] object-fit ${img.className}`}
            variants={variants[img.variant]}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            viewport={{ once: false, margin: "0px 0px -100px 0px" }}
            loading="lazy"
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-20 flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Left column */}
        <div className="w-full lg:w-[55%] flex flex-col gap-2 px-6 lg:px-20 py-0 text-white">
          <motion.span 
            className="text-[28px] tracking-wider font-semibold"
            variants={variants.fadeUp(contentDelays[0])}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            BLUELINES
          </motion.span>
          
          <motion.h2 
            className="text-[26px] md:text-[38px] lg:text-[48px] leading-tight font-regular mt-2"
            variants={variants.fadeUp(contentDelays[1])}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            The World's First Security Council Resolutions Research <br /> and Drafting Tool
          </motion.h2>
          
          <motion.p 
            className="max-w-2xl text-[20px] leading-relaxed mt-2 text-white"
            variants={variants.fadeUp(contentDelays[2])}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            BlueLines is Aperture Futures' proprietary large language model for the Security Council.
          </motion.p>
          
          <motion.ul 
            className="list-disc pl-5 space-y-2 mt-1 text-white"
            variants={variants.fadeUp(contentDelays[3])}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <li>Instantly search, analyse, and compare decades of UNSC resolutions dating back to 1948.</li>
            <li>Draft and refine new resolution text grounded in established precedent.</li>
            <li>Analyse shifts in thematic language over time to identify evolving Council priorities and negotiation trends.</li>
          </motion.ul>

          <motion.p 
            className="max-w-2xl text-[16px] leading-relaxed mt-1 text-white"
            variants={variants.fadeUp(contentDelays[4])}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            For newly elected members or any delegation seeking greater influence, 
            <span className="text-white font-semibold"> BlueLines </span>
            redefines what's possible in Security Council engagement.
          </motion.p>
          
          <motion.div 
            className="mt-5"
            variants={variants.fadeUp(contentDelays[4])}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div
              className="inline-block rounded-full p-[1px]"
              style={{
                background: "linear-gradient(30deg, #B806E6 15%, rgba(10,15,28,1) 30%, rgba(52,94,250,1) 60%, #00EB8F 100%)",
              }}
            >
              <button 
                className="px-6 py-2 rounded-full bg-black/80 hover:bg-black text-white font-semibold shadow-lg transition-colors duration-300"
                aria-label="Try BlueLines"
              >
                Try BlueLines
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right column */}
        <div className="w-full lg:w-[45%] flex items-center justify-center lg:justify-end relative">
          {/* Floating bubble top-left */}
          <motion.div
            className="absolute -top-5 left-30 lg:left-80 z-50"
            variants={variants.bubbleLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="px-4 py-2 rounded-full bg-[#2563eb]/20 backdrop-blur-sm border border-white/10 shadow-md text-sm text-white font-medium">
              Diplomats tracking discussions
            </div>
          </motion.div>

          {/* Chat card */}
          <motion.div
            className="relative z-20 w-full max-w-[720px] h-[460px] rounded-l-2xl bg-white shadow-2xl p-8 border border-gray-900"
            variants={variants.card}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="flex items-center gap-2 mb-4">
              {['#FF4B4B', '#FFBD2E', '#2EE37A'].map((color, i) => (
                <span 
                  key={`dot-${i}`}
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: color }} 
                />
              ))}
            </div>
            <img 
              src={chatMock} 
              alt="BlueLines chat interface" 
              className="w-full h-auto object-contain rounded-lg" 
              loading="lazy"
            />
          </motion.div>

          {/* Floating bubble bottom-right */}
          <motion.div
            className="absolute -bottom-5 left-4 lg:left-10 z-30"
            variants={variants.bubbleRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="px-5 py-2 rounded-full bg-gradient-to-r from-[#1d4ed8] via-[#3b82f6] to-[#06b6d4] text-white shadow-lg text-sm font-medium">
              Journalists sourcing direct quotes
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlueLinesSection;