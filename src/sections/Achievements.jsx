import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const achievementsData = [
  {
    title: "Elite Silver in NPTEL Course",
    context: "Privacy and Security in Online Social Media",
    period: "Nov 2025",
    description: "Awarded Elite Silver for performance in the NPTEL online certification course."
  },
  {
    title: "C++ Gold Badge",
    context: "HackerRank",
    period: "Oct 2024",
    description: "Earned for advanced-level proficiency in C++ programming."
  },
  {
    title: "C (Level 3) Badge",
    context: "HackerRank",
    period: "Feb 2024",
    description: "Achieved for strong fundamentals in coding and problem-solving in C."
  }
];

const Achievements = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: false, margin: "-100px" });
  const isSectionInView = useInView(sectionRef, { once: false, margin: "-100px" });

  return (
    <section id="achievements" ref={sectionRef} className="py-24 px-8 min-h-screen items-center flex overflow-hidden">
      <div className="max-w-5xl mx-auto w-full">
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, x: -40 }}
          animate={titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl font-bold mb-16 flex items-center gap-4"
        >
          <span className="text-[#00f0ff] text-xl md:text-3xl font-mono">06.</span>
          Achievements
          <motion.div
            initial={{ scaleX: 0 }}
            animate={titleInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ originX: 0 }}
            className="h-[1px] bg-gradient-to-r from-gray-700 to-transparent flex-grow ml-4"
          />
        </motion.h2>

        <div className="relative border-l border-gray-800 ml-4 md:ml-0 pl-8 md:pl-12 py-4 space-y-16">
          {achievementsData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: index * 0.2 + 0.1, ease: "easeOut" }}
              className="relative group"
            >
              {/* Timeline marker */}
              <div className="absolute -left-[41px] md:-left-[57px] top-1 w-5 h-5 bg-[#0a0a0a] border-2 border-[#00f0ff] rounded-full group-hover:scale-125 group-hover:bg-[#00f0ff] transition-all duration-300 shadow-[0_0_10px_rgba(0,240,255,0.2)] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.6)]" />
              
              <div className="flex flex-col gap-1 mb-3">
                <span className="text-[#00f0ff] font-mono text-sm">{item.period}</span>
                <h3 className="text-2xl font-bold text-white group-hover:text-[#00f0ff] transition-colors">{item.title}</h3>
                <h4 className="text-lg text-gray-300 font-medium">{item.context}</h4>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-2xl">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
