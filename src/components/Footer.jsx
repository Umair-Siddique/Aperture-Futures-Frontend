"use client";
import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import leftBg from "../assets/footer-left-bg.png";
import rightBg from "../assets/footer-right-bg.png";
import sparkles from "../assets/sparkles.png";


const Footer = () => {
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <footer className="bg-black text-gray-300 relative py-20 overflow-hidden">
            {/* Background Images */}
            <img
                src={leftBg}
                alt="Footer Background Left"
                className="absolute -left-50 z-10 -top-50 w-1/3 max-w-md opacity-100 pointer-events-none select-none"
            />

            <img
                src={rightBg}
                alt="Footer Background Right"
                className="absolute -right-50 -top-50 w-1/3 max-w-md opacity-100 pointer-events-none select-none"
            />

            {/* Top Footer */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 relative z-10"
            >
                {/* Logo + Name */}
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4  rounded-full flex items-center justify-center">
                        <img
                            src={sparkles}
                            alt="Footer Background Right"
                            className="absolute  w-7 h-7 opacity-100 pointer-events-none select-none"
                        />
                    </div>
                    <h2 className=" text-gray-400 font-regular text-lg">
                        Aperture <span className="text-white">Futures</span>
                    </h2>
                </div>

                {/* Navigation */}
                <ul className="flex gap-8 text-sm font-medium text-white">
                    <li className="hover:text-gray-400 transition-colors cursor-pointer">Home</li>
                    <li className="hover:text-gray-400 transition-colors cursor-pointer">Blueline</li>
                    <li className="hover:text-gray-400 transition-colors cursor-pointer">Lifeline</li>
                    <li className="hover:text-gray-400 transition-colors cursor-pointer">About us</li>
                    <li className="hover:text-gray-400 transition-colors cursor-pointer">Contact us</li>
                </ul>

                {/* Social Links */}
                <div className="flex flex-col items-center lg:items-start gap-3">
                    <p className="text-sm font-medium text-white">Follow Us</p>
                    <div className="flex gap-4">
                        <a href="#" className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-300 transition-colors">
                            <Twitter size={16} />
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-300 transition-colors">
                            <Linkedin size={16} />
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-300 transition-colors">
                            <Github size={16} />
                        </a>
                    </div>
                </div>
            </motion.div>

            {/* Divider */}
            <div className="border-t border-gray-700 relative z-10"></div>

            {/* Bottom Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, transition: { duration: 0.8 } }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col lg:flex-row items-center justify-between gap-3 text-sm text-gray-400 relative z-10"
            >
                <p>@2025 Aperture Futures | All Rights Reserved</p>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-gray-200 transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-gray-200 transition-colors">Privacy Policy</a>
                </div>
            </motion.div>
             <div className="font-semibold lg:text-[150px] xl:text-[190px] text-[#1B1B1B] whitespace-nowrap absolute left-1/2 -bottom-25 -translate-x-1/2 ">
  Aperture Futures
</div>
        </footer>
    );
};

export default Footer;