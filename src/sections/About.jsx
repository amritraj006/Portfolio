import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "5+", label: "Projects Built" },
  { value: "10+", label: "Technologies" },
  { value: "100%", label: "Passion" },
];

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const isTextInView = useInView(textRef, { once: false, margin: "-80px" });
  const isImageInView = useInView(imageRef, { once: false, margin: "-80px" });

  return (
    <section id="about" ref={sectionRef} className="min-h-screen py-24 px-8 flex items-center overflow-hidden">
      <div className="max-w-5xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, x: -40 }}
          animate={isTextInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl font-bold mb-12 flex items-center gap-4"
        >
          <span className="text-[#00f0ff] text-xl md:text-3xl font-mono">01.</span>
          About Me
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isTextInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ originX: 0 }}
            className="h-[1px] bg-gradient-to-r from-gray-700 to-transparent flex-grow ml-4"
          />
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Text Content */}
          <div ref={textRef} className="flex flex-col gap-6">
            {[
              "I’m a BTech CSE student who enjoys turning ideas into real web applications. Whether it’s building full stack projects or solving practical problems, I focus on creating solutions that are simple, useful, and user-friendly."
,
"I work with modern web technologies across frontend and backend, but what really defines my approach is curiosity—learning new tools, improving my skills, and building projects that solve real-world problems.",

"Still learning, still building, and always aiming to create work that makes an impact."
            ].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7, delay: i * 0.15 + 0.1, ease: "easeOut" }}
                className="text-gray-400 text-lg leading-relaxed"
              >
                {para}
              </motion.p>
            ))}

            {/* Stat counters */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 gap-4 mt-4"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.04, borderColor: "#00f0ff" }}
                  className="border border-gray-800 rounded-xl p-5 transition-colors duration-300"
                >
                  <div className="text-3xl font-bold text-white mb-1" style={{
                    background: "linear-gradient(135deg, #00f0ff, #7000ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

         
          </div>

          {/* Profile image */}
          <div ref={imageRef} className="relative group w-[80%] max-w-[300px] mx-auto md:w-full md:mx-0 aspect-square">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isImageInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -inset-4 rounded-2xl blur-xl opacity-20 group-hover:opacity-60 group-hover:blur-2xl transition-all duration-700"
              style={{
                background: 'linear-gradient(135deg, #00f0ff, #7000ff)',
                animation: 'pulse 4s ease-in-out infinite',
              }}
            />

            <div className="absolute inset-0 border border-white/10 rounded-2xl scale-[1.03] group-hover:scale-105 group-hover:rotate-3 transition-transform duration-700 ease-out" />
            <div className="absolute inset-0 border border-[#00f0ff]/30 rounded-2xl scale-[1.06] group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 ease-out" />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isImageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#111]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-20 transition-opacity duration-700" />
              <img
                src='profile.jpg'
                alt="Amrit Raj"
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
              />
              <div className="absolute bottom-4 left-4 z-20 flex gap-2 items-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                <div className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff] animate-pulse" />
                <span className="text-white text-xs font-mono font-medium backdrop-blur-md bg-[#111]/70 px-3 py-1.5 rounded-full border border-white/10">
                  Availability: 100%
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
