"use client";
import React from "react";
import { motion } from "framer-motion";

// ===== 3D ANIMATION CONFIG =====
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const card = {
  hidden: { 
    opacity: 0,
    z: -150, // DEEP behind screen
    scale: 0.7,
    rotateX: 25, // Tilted back
    transformPerspective: 1200,
    boxShadow: "0 0 0 rgba(0,0,0,0)" 
  },
  visible: {
    opacity: 1,
    z: 0, // Full forward
    scale: 1,
    rotateX: 0,
    // boxShadow: "0 25px 50px -12px rgba(11, 158, 119, 0.25)",
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 12,
      mass: 0.5,
      restDelta: 0.001
    }
  }
};

const iconPop = {
  hidden: { 
    scale: 0.4,
    opacity: 0,
    z: -80,
    y: 20,
    rotate: -15
  },
  visible: {
    scale: 1.1, // Slightly bigger for pop
    opacity: 1,
    z: 10, // Come slightly forward
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      bounce: 0.7,
      duration: 0.8
    }
  }
};

const textPop = {
  hidden: {
    opacity: 0,
    z: -40,
    y: 15
  },
  visible: {
    opacity: 1,
    z: 5, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.2
    }
  }
};

// ===== ICON COMPONENTS =====
const IconSearch = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M21 21l-4.35-4.35" stroke="#0B9E77" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="11" cy="11" r="5.2" stroke="#0B9E77" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const IconChat = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#0B9E77" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconInterface = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="3" y="3" width="18" height="14" rx="2" stroke="#0B9E77" strokeWidth="1.6" />
    <path d="M7 21v-4" stroke="#0B9E77" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M17 21v-4" stroke="#0B9E77" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconData = () => (
  <svg width="20" height="20" viewBox="0 0 24 20" fill="none" aria-hidden>
    <ellipse cx="12" cy="6" rx="7" ry="3" stroke="#0B9E77" strokeWidth="1.6" />
    <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" stroke="#0B9E77" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ===== MAIN COMPONENT =====
export default function FeaturesSection() {
  const features = [
    {
      icon: <IconSearch />,
      title: "Powerful Search",
      description: "Find meeting segments using keywords or filters — no digging."
    },
    {
      icon: <IconChat />,
      title: "AI-Powered Chat",
      description: "Ask complex questions and get clear answers from UNSC documents."
    },
    {
      icon: <IconInterface />,
      title: "Research-Ready Interface",
      description: "For analysts and professionals — save chats and export findings."
    },
    {
      icon: <IconData />,
      title: "Live & Historical Data",
      description: "Access 80 years of UNSC resolutions and transcripts."
    }
  ];

  return (
    <section className="w-full z-5000  overflow-hidden">
      <div className="w-full max-w-7xl ">
        <div style={{ perspective: "1200px" }} className="relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.08, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 "
            style={{
              transform: "translateZ(-100px)",
              zIndex: -1
            }}
          />
          
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            className="border-t border-gray-200 "
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={card}
                  style={{ 
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                  }}
                  className="p-5 relative  group"
                >
                  {/* CARD DEPTH SHADOW */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: 0.4 }}
                    className="absolute inset-0 rounded-lg "
                    style={{
                      transform: "translateZ(30px)",
                      filter: "blur(0px)",
                      zIndex: -1
                    }}
                  />
                  
                  {/* ICON WITH EXTREME POP */}
                  <motion.div
                    variants={iconPop}
                    style={{ transformStyle: "preserve-3d" }}
                    className="w-10 h-10 rounded-full bg-[#E8FFF6] flex items-center justify-center mb-3 shadow-lg"
                  >
                    <div style={{ transform: "translateZ(20px)" }}>
                      {feature.icon}
                    </div>
                  </motion.div>
                  
                  {/* TEXT WITH DEPTH */}
                  <motion.div 
                    variants={textPop}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <h4 
                      className="text-xl font-bold text-gray-900"
                      style={{ transform: "translateZ(10px)" }}
                    >
                      {feature.title}
                    </h4>
                    <p
                      className="text-gray-600 text-base leading-relaxed"
                      style={{ transform: "translateZ(10px)" }}
                    >
                      {feature.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}