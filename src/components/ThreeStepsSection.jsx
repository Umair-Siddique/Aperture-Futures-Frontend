"use client";

import { motion } from "framer-motion";
import { FileText, Bot, BarChart3 } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Select Your Source",
    description:
      "Choose a resolution, meeting transcript, or debate record from our archive.",
    icon: <FileText className="w-8 h-8 text-gray-700" />,
  },
  {
    id: "02",
    title: "Ask the AI",
    description:
      "Receive detailed, contextual answers grounded in official UNSC records.",
    icon: <Bot className="w-8 h-8 text-gray-700" />,
  },
  {
    id: "03",
    title: "Apply the Insight",
    description:
      "Use the results to inform your research, drafting, or negotiation strategy.",
    icon: <BarChart3 className="w-8 h-8 text-gray-700" />,
  },
];

export default function ThreeStepsSection() {
  return (
    <section className="relative w-full p-20 bg-white">
      <div className="container mx-auto  text-center">
        {/* Top Badge */}
       <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="relative inline-block px-6 py-2 rounded-full text-sm font-medium text-gray-800 mb-6 overflow-hidden"
>
  {/* Background with rounded corners */}
  <div 
    className="absolute inset-0 rounded-full"
    style={{
      background: "radial-gradient(67.75% 410.61% at 46.75% 51.52%, rgba(133, 255, 207, 0.2) 0%, rgba(248, 255, 252, 0.2) 100%)",
    }}
  />
  
  {/* Gradient border using pseudo-element */}
  <div 
    className="absolute inset-0 rounded-full p-[1px]"
    style={{
      background: "radial-gradient(111.22% 150.76% at 4.86% 65%, #BB86FC 6.82%, #00EB8F 30.11%, #0A0F1C 54.19%, #0A0F1C 50.17%, #BB86FC 70.27%, #00ff9dff 99.37% )",
      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
    }}
  />
  
  {/* Text content */}
  <div className="relative z-10">
    How it Works
  </div>
</motion.div>


        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          From Search to Strategy in Three Steps
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-lg text-gray-600 mb-14"
        >
          Explore, question, and interpret UNSC decisions — all in a seamless, guided flow.
        </motion.p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative bg-gray-50 rounded-2xl shadow-sm p-6 text-left overflow-hidden"
            >
              {/* Background Number */}
              <span className="absolute -top-10 -right-2 text-[10rem] font-extrabold text-gray-200 opacity-40 select-none leading-none">
                {step.id}
              </span>

              {/* Icon */}
    <div className="mb-6 relative z-10">
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    viewport={{ once: true }}
    className="relative inline-block p-4 rounded-3xl overflow-hidden"
  >
    {/* Background with rounded corners */}
    <div 
      className="absolute inset-0 rounded-3xl"
      style={{
        background: "radial-gradient(67.75% 410.61% at 46.75% 51.52%, rgba(133, 255, 207, 0.2) 0%, rgba(248, 255, 252, 0.2) 100%)",
      }}
    />
    
    {/* Gradient border using the specified radial gradient */}
    <div 
      className="absolute inset-0 rounded-3xl p-[1.5px]"
      style={{
        background: "radial-gradient(141.93% 121.88% at -31.25% 101.04%, #345EFA 0%, #B806E6 33.62%, #0A0F1C 63.42%, #0A0F1C 73.39%, #0551DD 83.71%, #00EB8F 99.37%)",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    />
    
    {/* Icon content */}
    <div className="relative z-10">
      {step.icon}
    </div>
  </motion.div>
</div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 relative z-10 mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 relative z-10">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
