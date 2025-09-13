"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImg from "../assets/round.png";
import Navbar from "../components/Navbar";
import img1 from "../assets/img1.png"; 
import img2 from "../assets/img2.png"; 
import img3 from "../assets/img3.png"; 
import img4 from "../assets/img4.png"; 
import FeaturesSection from "../components/featureSection";
import LiveLinesSection from "../components/LiveLinesSection";
import BlueLinesSection from "../components/BlueLinesSection";
import ThreeStepsSection from "../components/ThreeStepsSection";
import PeopleSection from "../components/PeopleSection";
import FaqSection from "../components/FaqSection";
import PoweredSection from "../components/PoweredSection";
import { Power } from "lucide-react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5
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
      ease: "backOut"
    }
  }
};

const textVariantLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const textVariantRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const imageVariantLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 150, transition: { duration: 1 } },
  exit: { opacity: 0, x: -100, transition: { duration: 1 } }
};

const imageVariantRight = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: -250, transition: { duration: 1 } },
  exit: { opacity: 0, x: -100, transition: { duration: 1 } }
};

const LandingPage = () => {
  const heroRef = useRef(null);
  const secondSectionRef = useRef(null);
  const liveLinesRef = useRef(null);
  const blueLinesRef = useRef(null);
  const threeStepsRef = useRef(null);
  const peopleRef = useRef(null);
  const faqRef = useRef(null);
  const footerRef = useRef(null);
  const [hasExitedSecondSection, setHasExitedSecondSection] = useState(false);
  const navigate = useNavigate();
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const handleTryLifeline = () => {
    navigate("/signin");
  };

  const scrollToSection = (sectionRef) => {
    if (sectionRef && sectionRef.current) {
      window.scrollTo({
        top: sectionRef.current.offsetTop,
        behavior: "smooth"
      });
    }  
  };

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 2.8]);
  const zIndex = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <div className="bg-white text-white font-inter relative overflow-hidden">
      {/* Navbar */}
      <Navbar 
        scrollToHero={() => scrollToSection(heroRef)}
        scrollToLiveLines={() => scrollToSection(liveLinesRef)}
        scrollToBlueLines={() => scrollToSection(blueLinesRef)}
        scrollToThreeSteps={() => scrollToSection(threeStepsRef)}
        scrollToPeople={() => scrollToSection(peopleRef)}
        scrollToFaq={() => scrollToSection(faqRef)}
        scrollToFooter={() => scrollToSection(footerRef)}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen relative bg-black -mt-16">
        <main className="w-[90%] max-w-7xl mx-auto pt-[130px] relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-[28px] font-inter font-bold tracking-wide">
              Aperture Futures
            </motion.h2>
            
            <motion.h1 variants={itemVariants} className="text-[34px] md:text-[64px] font-bold leading-tight mt-4">
              Anticipating Change. <br /> Delivering the Future.
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-gray-300 mt-4 max-w-3xl leading-relaxed">
              Aperture Futures is a specialized technology advisory at the forefront
              of United Nations Security Council (UNSC) affairs. We provide
              AI-powered tools that transform how governments, diplomats, advocacy
              networks, and academics engage with the Council's debates, negotiations,
              and decisions.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-gray-300 mt-3 max-w-3xl leading-relaxed">
              <strong className="block mb-3">Objective. Strategy. Tactics.</strong>
              Our flagship products —
              <span className="text-white font-semibold"> BlueLines, LiveLines, and CrossLines </span>
              — are purpose-built to lower the cost and complexity of UNSC engagement,
              turning information into strategy, and strategy into results.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={buttonVariants} className="flex gap-4 mt-6">
              <div className="rounded-full p-[1px]" style={{
                background: 'linear-gradient(30deg, rgba(184, 6, 230, 1) 15%, rgba(10, 15, 28, 1) 30%, rgba(52, 94, 250, 1) 60%, rgba(0, 235, 143, 1) 100%, rgba(5, 81, 221, 1) 90%, rgba(10, 15, 28, 1) 100%)'
              }}>
                <button className="
                  w-full h-full px-6 py-3 rounded-full 
                  bg-[#1D1D1D] hover:bg-[#101820]
                  text-white
                  transition-colors duration-300
                  border-none
                "
                onClick={handleTryLifeline}
                >
                  Try Lifeline
                </button>
              </div>

              <div className="rounded-full p-[1px]" style={{
                background: 'linear-gradient(30deg, rgba(184, 6, 230, 1) 15%, rgba(10, 15, 28, 1) 30%, rgba(52, 94, 250, 1) 50%, rgba(0, 235, 143, 1) 100%, rgba(5, 81, 221, 1) 90%, rgba(10, 15, 28, 1) 100%)'
              }}> 
                <button onClick={handleTryLifeline} className="
                  w-full h-full px-6 py-3 rounded-full 
                  bg-[#0A0F1C] hover:bg-[#101820]
                  text-white
                  transition-colors duration-300
                  border-none
                ">
                  
                  Try Blueline
                </button>
              </div>
            </motion.div>
          </motion.div>
        </main>

        {/* Hero Image with Scroll-Activated Pop Effect */}
        <motion.div
          style={{
            scale,
            z: zIndex,
            opacity,
            transformStyle: "preserve-3d"
          }}
          className="absolute -top-[330px] -right-[325px] w-[800px] h-[800px] pointer-events-none select-none"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ 
            opacity: 1,
            scale: 0.8,
            transition: { 
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2
            }
          }}
        >
          <img
            src={heroImg}
            alt="Hero Background"
            className="w-full h-full object-contain"
            style={{ transform: "translateZ(0)" }}
          />
        </motion.div>
        
        {/* Background Text */}
        <div className="font-bold lg:text-[150px] xl:text-[190px] text-[#1B1B1B] whitespace-nowrap absolute left-1/2 -bottom-25 -translate-x-1/2 ">
          Aperture Futures
        </div>
      </section>

      {/* Second Section */}
      <section 
        ref={secondSectionRef}
        className="relative w-full min-h-[100%] gap-10 flex flex-col items-center justify-center bg-[#FBFBFB] px-6 lg:px-20 overflow-hidden"
      >
        <div className="absolute left-[0px] top-[0px] z-300 flex flex-col justify-left items-left">
          <motion.img
            src={img1}
            alt="bg1"
            className="w-full h-[165px] object-contain"
            variants={imageVariantLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "0px 0px -100px 0px" }}
            onViewportEnter={() => setHasExitedSecondSection(false)}
            onViewportLeave={(entry) => {
              if (entry.boundingClientRect.top < 0) {
                setHasExitedSecondSection(true);
              }
            }}
          />
          <motion.img
            src={img2}
            alt="bg2"
            className="w-[full] h-[128px] object-contain"  
            variants={imageVariantRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "0px 0px -100px 0px" }}
            onViewportEnter={() => setHasExitedSecondSection(false)}
            onViewportLeave={(entry) => {
              if (entry.boundingClientRect.top < 0) {
                setHasExitedSecondSection(true);
              }
            }}
          />
          <motion.img
            src={img3}
            alt="bg3"
            className="w-full h-[128px] object-contain"
            variants={imageVariantLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "0px 0px -100px 0px" }}
            onViewportEnter={() => setHasExitedSecondSection(false)}
            onViewportLeave={(entry) => {
              if (entry.boundingClientRect.top < 0) {
                setHasExitedSecondSection(true);
              }
            }}
          />
          <motion.img
            src={img4}
            alt="bg4"
            className="w-full h-[165px] -ml-50 object-contain"
            variants={imageVariantLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "0px 0px -100px 0px" }}
            onViewportEnter={() => setHasExitedSecondSection(false)}
            onViewportLeave={(entry) => {
              if (entry.boundingClientRect.top < 0) {
                setHasExitedSecondSection(true);
              }
            }}
          />
        </div>
      
        {/* Left Section */}
        <div className="w-full flex flex-row z-400 pt-10 items-center">
          <div className="relative w-full lg:w-[55%] flex flex-col gap-6 z-10">
            <motion.h1
              variants={textVariantLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-[40px] lg:text-[64px] font-regular leading-tight text-gray-900"
            >
              Reimagining How the World Works with the Security Council
            </motion.h1>

            <motion.p
              variants={textVariantLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
              className="text-gray-700 text-lg"
            >
              We combine insider diplomatic experience with state-of-the-art AI
              engineering to:
            </motion.p>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-[45%] justify-center align-center z-10">
            <motion.p
              variants={textVariantRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-gray-700 text-lg leading-relaxed align-center border-l-2 border-gray-300 pl-6"
            >
              When the UNSC sets the course for global peace and security, every
              word matters. Access, accuracy, and insight are critical. Aperture
              Futures bridges these needs with advanced AI tools designed exclusively
              for the realities of Security Council work.
            </motion.p>
          </div>
        </div>
        <FeaturesSection />
      </section>

      <div ref={liveLinesRef}>
        <LiveLinesSection/>
      </div>
      
      <div ref={blueLinesRef}>
        <BlueLinesSection/>
      </div>
      
      <div ref={threeStepsRef}>
        <ThreeStepsSection/>
      </div>
      
      <div ref={peopleRef}>
        <PeopleSection />
      </div>
      
      <div ref={faqRef}>
        <FaqSection />
      </div>
      
      <PoweredSection />
      
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;