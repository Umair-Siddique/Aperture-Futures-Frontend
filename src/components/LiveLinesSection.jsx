"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import img1 from "../assets/img11.png";
import img2 from "../assets/img22.png";
import img3 from "../assets/img33.png";
import chatMock from "../assets/chatmock1.png";

// --- variants ---
const bgImageVariantLeft = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.9, x: -100 },
  animate: { 
    opacity: 1, 
    scale: 1.1, 
    x: 20,
    transition: { 
      duration: 1, 
      ease: [0.1, 1, 0.1, 1], 
      delay 
    } 
  },
});

const bgImageVariantRight = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.9, x: 100 },
  animate: { 
    opacity: 1, 
    scale: 1.1, 
    x: -180,
    transition: { 
      duration: 1, 
      ease: [0.1, 1, 0.1, 1], 
      delay 
    } 
  },
});

const bgImageVariantCenter = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.9, y: 50 },
  animate: { 
    opacity: 1, 
    scale: 1.1, 
    y: 0,
    transition: { 
      duration: 1, 
      ease: [0.1, 1, 0.1, 1], 
      delay 
    } 
  },
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const buttonVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "backOut",
      delay: 0.4
    }
  }
};

const cardFromRight = {
  initial: { opacity: 0, x: 120, scale: 0.98 },
  animate: { 
    opacity: 1, 
    x: 0, 
    scale: 1, 
    transition: { 
      duration: 0.9, 
      ease: [0.16, 1, 0.3, 1], 
      delay: 0.15 
    } 
  },
};

const bubbleLeftToRight = {
  initial: { opacity: 0, x: -80 },
  animate: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.8, 
      ease: "easeOut", 
      delay: 0.2 
    } 
  },
};

const bubbleRightToLeft = {
  initial: { opacity: 0, x: 80 },
  animate: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.8, 
      ease: "easeOut", 
      delay: 0.25 
    } 
  },
};

export default function LiveLinesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
<section 
      ref={ref} 
      className="relative w-full max-h-screen overflow-hidden "
      style={{
background: "linear-gradient(258.39deg, #B600EB 0%, #FFD470 102.66%)"
      }}
    >
      {/* animated background images - only animate when in view */}
      <motion.img
        src={img1}
        alt="bg-1"
        className="pointer-events-none select-none z-1 absolute bottom-[25px] left-[-5%] w-[480px] h-[480px] object-contain"
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        variants={bgImageVariantLeft(0.05)}
        style={{ transformStyle: "preserve-3d" }}
      />
      <motion.img
        src={img2}
        alt="bg-2"
        className="pointer-events-none select-none z-1 absolute bottom-[-10%] right-[17%] w-[440px] h-[440px] object-contain"
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        variants={bgImageVariantRight(0.05)}
        style={{ transformStyle: "preserve-3d" }}
      />
      <motion.img
        src={img3}
        alt="bg-3"
        className="pointer-events-none select-none absolute top-[0%] right-[40%] w-[700px] h-[700px] object-contain"
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        variants={bgImageVariantCenter(0.05)}
        style={{ transformStyle: "preserve-3d" }}
      />

      {/* Main container */}
      <div className="relative z-20 max-w-screen flex items-center justify-between gap-8">
        {/* Left column: text + button */}
        <div className="w-full lg:w-1/2 flex flex-col gap-3 px-6 lg:px-20 py-10">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.span
              className="text-sm tracking-wider text-white/90 font-semibold"
              variants={itemVariants}
            >
              LIVELINES
            </motion.span>

            <motion.h2
              className="text-[26px] md:text-[38px] lg:text-[48px] leading-tight font-bold text-white mt-4"
              variants={itemVariants}
            >
              Rapid Reporting and AI <br /> Analysis of UNSC Meetings
            </motion.h2>

            <motion.p
              className="text-white max-w-2xl text-[16px] leading-relaxed mt-1"
              variants={itemVariants}
            >
              LiveLines captures Security Council proceedings and transforms them into
              custom report formats as well as searchable, interactive transcripts —
              enriched with AI-powered analysis.
            </motion.p>

            <motion.p
              className="text-white max-w-2xl text-[20px] leading-relaxed mt-2"
              variants={itemVariants}
            >
             User can:
            </motion.p>

            <motion.div
              className="mt-1 text-white/90 space-y-3"
              variants={itemVariants}
            >
              <ul className="list-disc pl-5 space-y-2">
                <li>Download a full meeting report within minutes of its conclusion.</li>
                <li>Track interventions from specific Member States or groups.</li>
                <li>Ask targeted questions about the discussion in progress.</li>
              </ul>
            </motion.div>

<motion.p
              className="text-white max-w-2xl text-[16px] leading-relaxed mt-2"
              variants={itemVariants}
            >
              For diplomats, journalists, and analysts, LiveLines delivers immediate, authoritative insight into the pulse of the Council.
            </motion.p>
            <motion.div variants={buttonVariants} className="mt-8">
              <div
                className="inline-block rounded-full p-[1px]"
                style={{
                  background:
                    "linear-gradient(30deg, rgba(184,6,230,1) 15%, rgba(10,15,28,1) 30%, rgba(52,94,250,1) 60%, rgba(0,235,143,1) 100%)",
                }}
              >
                <button className="px-6 py-3 rounded-full bg-black/80 hover:bg-black text-white font-semibold shadow-lg transition">
                  Try LifeLines
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right column: mock chat card + bubbles */}
        <div className="w-full lg:w-1/2 flex items-center justify-end relative">
          {/* upper bubble (left -> right) */}
          <motion.div
            className="absolute -top-8 left-10 z-50"
            initial={bubbleLeftToRight.initial}
            animate={isInView ? bubbleLeftToRight.animate : bubbleLeftToRight.initial}
          >
            <div className="px-4 py-2 rounded-full bg-[#6b7280]/10 backdrop-blur-sm border border-white/10 shadow-md text-sm text-gray-900 font-medium">
              UNSC Meeting Analysis
            </div>
          </motion.div>

          {/* the main chat/card */}
          <motion.div
            className="relative z-20 w-[760px] h-[504px] max-w-full rounded-l-2xl bg-white shadow-2xl p-8 border border-gray-900"
            initial={cardFromRight.initial}
            animate={isInView ? cardFromRight.animate : cardFromRight.initial}
          >
            {/* little window dots */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-[#FF4B4B]"></span>
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]"></span>
              <span className="w-3 h-3 rounded-full bg-[#2EE37A]"></span>
            </div>

            {/* mock chat content */}
            {chatMock ? (
              <img src={chatMock} alt="chat mock" className="w-full h-auto object-contain rounded-lg" />
            ) : (
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-full bg-gray-200"></div>
                  <div className="rounded-xl bg-gray-100 px-4 py-2 text-sm text-gray-800 max-w-[70%]">In today's meeting on Sudan, which members called for Security Council support to open up humanitarian access in Darfur?</div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-full bg-[#0b6]"></div>
                  <div className="rounded-xl bg-gray-100 px-4 py-2 text-sm text-gray-800 max-w-[70%]">Several Council members explicitly urged the Security Council to support efforts to open humanitarian access in Darfur...</div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-full bg-gray-200"></div>
                  <div className="rounded-xl bg-gray-100 px-4 py-2 text-sm text-gray-800 max-w-[50%]">Can you generate me a meeting report for HQ?</div>
                </div>
              </div>
            )}
          </motion.div>

          {/* lower bubble (right -> left) */}
          <motion.div
            className="absolute -bottom-6 right-8 z-30"
            initial={bubbleRightToLeft.initial}
            animate={isInView ? bubbleRightToLeft.animate : bubbleRightToLeft.initial}
          >
            <div className="px-5 py-2 rounded-full bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ff3cac] text-white shadow-lg text-sm font-medium">
              Generate full meeting reports
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}