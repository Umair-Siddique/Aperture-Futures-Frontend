// src/components/PeopleSection.jsx
"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Replace these with your real assets
import bgPattern from "../assets/people-bg-pattern.png";
import p1 from "../assets/profile1-photo.png";
import p1bg from "../assets/profile1-card-bg.png";
import p2 from "../assets/profile2-photo.png";
import p2bg from "../assets/profile1-card-bg.png";

/* Inline small SVG icon components (no external icon package needed) */
const IconX = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const IconIn = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-12h4v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6" cy="8" r="1.5" fill="white" />
    </svg>
);
const IconIg = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="white" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.6" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="white" />
    </svg>
);

export default function PeopleSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const [hoveredCard, setHoveredCard] = useState(null);

    // variants
    const bgPop = {
        hidden: { opacity: 0, scale: 0.7, x: -40, rotate: -6 },
        visible: {
            opacity: 0.4,
            scale: 1,
            x: 0,
            rotate: [0, 360], // Continuous rotation
            transition: {
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                rotate: {
                    repeat: Infinity,
                    duration: 60,
                    ease: "linear"
                }
            },
        },
    };

    const badgeVariant = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const titleVariant = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.75, delay: 0.05 } },
    };

    const descVariant = {
        hidden: { opacity: 0, y: -12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.12 } },
    };

    const cardVariant = (delay = 0) => ({
        hidden: { opacity: 0, y: 40, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, delay } },
    });

    return (
        <section className="w-full px-20 pb-15 bg-white">
            <div
                ref={ref}
                className="relative rounded-2xl p-8 overflow-hidden shadow-2xl"
                style={{
                    background: "linear-gradient(140deg, #111111 45%, rgba(6,67,48,1) 100%)",
                    borderRadius: "18px",
                }}
            >
                {/* background pattern that 'pops' from screen and rotates continuously */}
                <motion.img
                    src={bgPattern}
                    alt="background pattern"
                    className="pointer-events-none absolute -left-160 -top-100 w-full z-10 select-none "
                    variants={bgPop}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    style={{ transformStyle: "preserve-3d" }}
                />

                {/* container */}
                <div className="relative z-20 flex flex-col lg:flex-row items-center gap-8">
                    {/* left text column */}
                    <div className="w-full lg:w-1/2 text-white">
                        <motion.div
                            variants={badgeVariant}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="inline-block px-5 py-2 text-sm font-medium mb-6 relative"
                            style={{
                                color: "#e6fff7",
                            }}
                        >
                            {/* Background with rounded corners */}
                            <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background: "radial-gradient(67.75% 410.61% at 46.75% 51.52%, rgba(133,255,207,0.12) 0%, rgba(248,255,252,0.08) 100%)",
                                    zIndex: -1,
                                }}
                            />

                            {/* Gradient border using pseudo-element */}
                            <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background: "radial-gradient(101.22% 111.76% at 5.86% 65%, #BB86FC 11.82%, #00EB8F 26.11%, #0A0F1C 57.19%, #0A0F1C 70.17%, #BB86FC 90.27%, #00EB8F 99.37%)",
                                    zIndex: -2,
                                    padding: '1px',
                                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    maskComposite: 'exclude',
                                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    WebkitMaskComposite: 'xor',
                                }}
                            />

                            Who We Are
                        </motion.div>

                        <motion.h2
                            variants={titleVariant}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
                            style={{ color: "#ffffff" }}
                        >
                            People Behind
                            <br />
                            Aperture Futures
                        </motion.h2>

                        <motion.p
                            variants={descVariant}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="max-w-xl text-sm md:text-base text-white/80"
                        >
                            Aperture Futures is a network of diplomats, humanitarian professionals,
                            AI engineers, and policy strategists committed to principled, innovative action.
                        </motion.p>
                    </div>

                    {/* right profile column */}
                    <div className="w-full lg:w-1/2 flex flex-col sm:flex-row items-center gap-8 justify-center items-start py-20 -mt-10">
                        {/* profile card 1 */}
                        <motion.div
                            variants={cardVariant(0.05)}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            whileHover={{ scale: 1.02 }}
                            className="relative w-[395px] h-[340px] rounded-3xl group border-l border-t border-white/9"
                            onMouseEnter={() => setHoveredCard(1)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            {/* Main container with extended height to accommodate the image */}
                            <div className="absolute inset-0 w-full h-[calc(100%+100px)]">
                                {/* Image positioned halfway out */}
                                <div className="absolute -top-[42px] left-1/2 transform -translate-x-1/2 w-[275px] h-[380px] z-30">
                                    <img
                                        src={p1}
                                        alt="Alex Jonathon Dunne - Founder & CEO"
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                {/* Text content positioned below */}
                                <div className="absolute bottom-5 left-0 w-full flex flex-col items-center z-30">
                                    <div className="text-center">
                                        <div className="text-lg font-semibold text-white">Alex Jonathon Dunne</div>
                                        <div className="text-sm text-white/80 mt-1">Founder & CEO</div>
                                    </div>
                                </div>

                                {/* hover overlay: shows bg image + three actions */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: hoveredCard === 1 ? 1 : 0 }}
                                    transition={{ duration: 0.28 }}
                                    className="absolute w-full h-[338px] flex flex-col items-center justify-end rounded-3xl "
                                    style={{
                                        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.55) 60%), url(${p1bg})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    <div
                                        className="absolute inset-0 rounded-b-3xl z-400"
                                        style={{
                                            background: "linear-gradient(180deg, rgba(0, 252, 153, 0) 57.62%, #00EB8F 100%)",
                                        }}
                                    ></div>
                                    <div className="flex gap-3 mb-3">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            className="w-10 h-10 rounded-full z-500 bg-black backdrop-blur-sm flex items-center justify-center border border-white/10 shadow"
                                            aria-label="View X profile"
                                        >
                                            <IconX />
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            className="w-10 h-10 rounded-full z-500 bg-black backdrop-blur-sm flex items-center justify-center border border-white/10 shadow"
                                            aria-label="View LinkedIn profile"
                                        >
                                            <IconIn />
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            className="w-10 h-10 rounded-full z-500 bg-black backdrop-blur-sm flex items-center justify-center border border-white/10 shadow"
                                            aria-label="View Instagram profile"
                                        >
                                            <IconIg />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* profile card 2 */}
                        <motion.div
                            variants={cardVariant(0.18)}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            whileHover={{ scale: 1.02 }}
                            className="relative w-[350px] h-[340px] rounded-3xl group border-l border-t border-white/9"
                            onMouseEnter={() => setHoveredCard(2)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            {/* Main container with extended height to accommodate the image */}
                            <div className="absolute inset-0 w-full h-[calc(100%+100px)]">
                                {/* Image positioned halfway out */}
                                <div className="absolute -top-[42px] left-1/2 transform -translate-x-1/2 w-[275px] h-[380px] z-30">
                                    <img
                                        src={p2}
                                        alt="Alex Jonathon Dunne - Head of Technology & AI Engagement"
                                        className="w-full h-full object-contain rounded-b-3xl"
                                    />
                                </div>

                                {/* Text content positioned below */}
                                <div className="absolute bottom-5 left-0 w-full flex flex-col items-center z-30">
                                    <div className="text-center">
                                        <div className="text-lg font-semibold text-white">Alex Jonathon Dunne</div>
                                        <div className="text-sm text-white/80 mt-1">Head of Technology & AI Engagement</div>
                                    </div>
                                </div>

                                {/* hover overlay: shows bg image + three actions */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: hoveredCard === 2 ? 1 : 0 }}
                                    transition={{ duration: 0.28 }}
                                    className="absolute inset-0 h-[338px] flex flex-col items-center justify-end rounded-3xl "
                                    style={{
                                        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.55) 60%), url(${p2bg})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    <div
                                        className="absolute inset-0 rounded-b-3xl z-400"
                                        style={{
                                            background: "linear-gradient(180deg, rgba(0, 252, 153, 0) 57.62%, #00EB8F 100%)",
                                        }}
                                    ></div>
                                    <div className="flex gap-3 mb-3 relative">


                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            className="w-10 h-10 rounded-full z-500 bg-black backdrop-blur-sm flex items-center justify-center border border-white/10 shadow"
                                            aria-label="View X profile"
                                        >
                                            <IconX />
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            className="w-10 h-10 rounded-full z-500 bg-black backdrop-blur-sm flex items-center justify-center border border-white/10 shadow"
                                            aria-label="View LinkedIn profile"
                                        >
                                            <IconIn />
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            className="w-10 h-10 rounded-full z-500 bg-black backdrop-blur-sm flex items-center justify-center border border-white/10 shadow"
                                            aria-label="View Instagram profile"
                                        >
                                            <IconIg />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}