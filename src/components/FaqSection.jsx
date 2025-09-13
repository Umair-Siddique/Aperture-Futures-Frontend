// src/components/FaqSection.jsx
"use client";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// Replace these with your real assets
import leftPattern from "../assets/faq-right-pattern.png";
import rightPattern from "../assets/faq-right-pattern.png";

const faqs = [
  {
    q: "What's the difference between BlueLines, LiveLines, and CrossLines?",
    a: (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>BlueLines</strong> focuses on UNSC resolutions from 1948 to today — deep
          analysis, drafting support, and negotiation mapping.
        </li>
        <li>
          <strong>LiveLines</strong> specialises in live meeting transcripts and real-time
          proprietary insight into diplomatic discussions.
        </li>
        <li>
          <strong>CrossLines</strong> simulates negotiation dynamics to support preparation
          and strategy.
        </li>
      </ul>
    ),
  },
  {
    q: "Who uses Aperture Futures?",
    a: "Delegations, policy teams, researchers, NGOs, and journalists use our products to monitor and synthesize Council activity.",
  },
  {
    q: "How current is the data?",
    a: "Our archive includes official UNSC resolutions back to 1948; live feeds and transcripts are ingested in real-time where available.",
  },
  {
    q: "Is the AI analysis reliable for diplomatic or academic work?",
    a: "We combine expert-curated models with human-in-the-loop review. Outputs include confidence signals and source references to support expert use.",
  },
  {
    q: "How secure is my data?",
    a: "We provide enterprise-grade encryption, role-based access, and strict data governance aligned with international best practices.",
  },
];

export default function FaqSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // which accordion index is open; default 0 (first open)
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const accordionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full py-10 bg-[#0a0a0a] overflow-hidden">
      {/* bg images */}
      <motion.img
        src={leftPattern}
        alt="decorative left"
        className="pointer-events-none select-none absolute -left-75 -top-75 w-[520px] opacity-100"
        initial={{ scale: 1, opacity: 0.7 }}
        animate={isSectionInView ? { scale: 1.2, opacity: 1 } : { scale: 1, opacity: 0.7 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ willChange: "transform" }}
      />
      <motion.img
        src={rightPattern}
        alt="decorative right"
        className="pointer-events-none select-none absolute -right-70 -bottom-70 w-[520px] opacity-100"
        initial={{ scale: 1, opacity: 0.7 }}
        animate={isSectionInView ? { scale: 1.2, opacity: 1 } : { scale: 1, opacity: 0.7 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ willChange: "transform" }}
      />

      <div ref={ref} className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        {/* badge - Centered with flex */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-block px-4 py-1 rounded-full text-sm font-medium relative"
            style={{
              background: "radial-gradient(67.75% 410.61% at 46.75% 51.52%, rgba(133, 255, 207, 0.2) 0%, rgba(248, 255, 252, 0.2) 100%)",
              color: "#dfffe9",
            }}
          >
            {/* Gradient border using pseudo-element */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(101.22% 111.76% at 5.86% 50%, #BB86FC 11.82%, #00EB8F 26.11%, #0A0F1C 57.19%, #0A0F1C 70.17%, #BB86FC 90.27%, #00EB8F 99.37%)",
                zIndex: -1,
                padding: '1px',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
              }}
            ></div>
            
            FAQs
          </motion.div>
        </div>

        {/* title */}
        <motion.h2
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl md:text-5xl font-bold text-white mb-10 text-center"
        >
          Frequently Asked Questions
        </motion.h2>

        {/* accordion */}
        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
        >
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                variants={accordionVariants}
                className={`rounded-xl overflow-hidden transition-all duration-300 ${
                  isOpen ? "bg-white/8 ring-1 ring-[#00EB8F]/20 shadow-lg" : "bg-white/4 hover:bg-white/6"
                }`}
                style={{ backdropFilter: "blur(10px)" }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between px-6 py-5 cursor-pointer">
                  <button
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    className="text-left flex-1 flex items-center gap-4 focus:outline-none group"
                  >

                    <span className="font-medium text-white group-hover:text-[#bfeedf] transition-colors duration-200">
                      {item.q}
                    </span>
                  </button>

                  {/* chevron */}
                  <motion.button
                    onClick={() => toggle(i)}
                    aria-label={`${isOpen ? "Collapse" : "Expand"} FAQ`}
                    aria-expanded={isOpen}
                    className="w-10 h-10 rounded-full flex items-center justify-center focus:outline-none group/chevron"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 235, 143, 0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.svg 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      aria-hidden
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <path 
                        d="M6 9l6 6 6-6" 
                        stroke={isOpen ? "#00EB8F" : "#c7d6cf"} 
                        strokeWidth="1.8" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="group-hover/chevron:stroke-[#00EB8F] transition-colors duration-200"
                      />
                    </motion.svg>
                  </motion.button>
                </div>

                {/* answer with animated height + opacity */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: "auto", 
                        opacity: 1,
                        transition: {
                          height: { duration: 0.4, ease: "easeOut" },
                          opacity: { duration: 0.3, delay: 0.1 }
                        }
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: {
                          height: { duration: 0.3 },
                          opacity: { duration: 0.2 }
                        }
                      }}
                      className="px-6 pb-6 text-gray-200 text-start overflow-hidden"
                    >
                      <motion.div 
                        className="pt-2"
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        {item.a}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}