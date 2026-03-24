import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skillCategories = [
  {
    title: "Languages",
    skills: ["JavaScript (Advanced)", "Python", "C++", "Java", "PHP"],
    color: "#00f0ff", // Cyan
    direction: 1 // Left
  },
  {
    title: "Frameworks & Libraries",
    skills: ["React.js", "Node.js", "Express.js", "Next.js", "Tailwind CSS"],
    color: "#7000ff", // Purple
    direction: -1 // Right
  },
  {
    title: "Databases",
    skills: ["MySQL", "MongoDB", "PostgreSQL"],
    color: "#00f0ff",
    direction: 1 
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "Postman", "Render", "Vercel", "Clerk"],
    color: "#7000ff",
    direction: -1
  },
  {
    title: "Soft Skills",
    skills: ["Problem-Solving", "Teamwork", "Critical Thinking", "Adaptability"],
    color: "#00f0ff",
    direction: 1
  }
];

const SlidingMarqueeRow = ({ title, skills, color, direction, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  
  // Duplicating array heavily to ensure enough items for infinite scroll
  const scrollArray = [...skills, ...skills, ...skills, ...skills, ...skills, ...skills];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction === 1 ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: direction === 1 ? -100 : 100 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col md:flex-row items-center md:items-stretch py-12 border-b border-gray-800/50 group"
    >
      {/* Category Title Pane */}
      <div className="w-full md:w-1/3 md:pr-12 flex flex-col justify-center mb-6 md:mb-0 relative z-10">
        <motion.div
           initial={{ scaleX: 0 }}
           animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
           transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
           style={{ originX: direction === 1 ? 0 : 1, backgroundColor: color }}
           className="h-[2px] w-12 mb-4"
        />
        <h3 className="text-3xl font-bold text-gray-300 group-hover:text-white transition-colors duration-500 tracking-tight">
          {title}
        </h3>
      </div>

      {/* Infinite Slider Pane */}
      <div 
        className="w-full md:w-2/3 overflow-hidden relative" 
        style={{ 
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' 
        }}
      >
        <motion.div
          animate={{ x: direction === 1 ? ["-50%", "0%"] : ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          className="flex gap-4 w-max h-full items-center px-4"
        >
          {scrollArray.map((skill, i) => (
            <motion.div
              key={`${skill}-${i}`}
              whileHover={{ scale: 1.05, y: -5, backgroundColor: `${color}15`, borderColor: color }}
              className="px-8 py-4 bg-[#111] border border-gray-800 rounded-full flex flex-col justify-center items-center cursor-pointer transition-colors duration-300 shadow-xl"
            >
              <span className="text-lg font-mono text-gray-400 group-hover:text-white transition-colors">
                {skill}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: false, margin: "-100px" });

  return (
    <section id="skills" className="py-32 px-8 bg-[#0a0a0a] overflow-hidden min-h-screen">
      <div className="max-w-5xl mx-auto w-full">
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, x: -40 }}
          animate={titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl font-bold mb-24 flex items-center gap-4"
        >
          <span className="text-[#00f0ff] text-xl md:text-3xl font-mono">02.</span>
          My Skills
          <motion.div
            initial={{ scaleX: 0 }}
            animate={titleInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ originX: 0 }}
            className="h-[1px] bg-gradient-to-r from-gray-700 to-transparent flex-grow ml-4"
          />
        </motion.h2>

        <div className="flex flex-col border-t border-gray-800">
          {skillCategories.map((category, i) => (
            <SlidingMarqueeRow 
              key={category.title} 
              {...category} 
              index={i} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
