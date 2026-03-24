import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';

import imgNptel from '../assets/certificates/nptel.png';
import imgChatgpt4 from '../assets/certificates/chatgpt4.png';
import imgComputation from '../assets/certificates/computation.png';
import imgBits from '../assets/certificates/bits-and byte.png';

const certificates = [
  {
    title: "Privacy and Security in Online Social Media",
    issuer: "NPTEL",
    image: imgNptel,
    year: "Recent",
    onCLick: "https://archive.nptel.ac.in/content/noc/NOC25/SEM2/Ecertificates/106/noc25-cs117/Course/NPTEL25CS117S135870179410359342.pdf"
  },
  {
    title: "ChatGPT-4 Prompt Engineering, Generative AI & LLM",
    issuer: "Infosys",
    image: imgChatgpt4,
    year: "Recent",
    onClick: "https://drive.google.com/file/d/1-ZQOIiDRgriflMSZVawNIxIhyGro-Ori/view"
  },
  {
    title: "Computational Theory: Language Principle & Finite Automata Theory",
    issuer: "Infosys",
    image: imgComputation,
    year: "Recent",
    onClick: "https://drive.google.com/file/d/1fhbL_JpFai0PkzpnzZTPfInlFYJNIwkf/view"
  },
  {
    title: "The Bits and Bytes of Computer Networking",
    issuer: "Coursera",
    image: imgBits,
    year: "Recent",
    onCLick: "https://www.coursera.org/account/accomplishments/verify/QIN25SFVXWQ7?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course"
  }
];

const Certificates = () => {
  const [activeImage, setActiveImage] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: false, margin: "-100px" });

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      // Offset so the image centers roughly on the cursor 
      cursorX.set(e.clientX - 175); 
      cursorY.set(e.clientY - 125);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <section id="certificates" ref={sectionRef} className="py-32 px-8 min-h-screen relative bg-[#0a0a0a]">
      {/* Floating separate image component overlay */}
      <motion.div
        className="fixed top-0 left-0 w-[350px] h-[250px] pointer-events-none z-[80] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isHovering && activeImage ? 1 : 0,
          scale: isHovering && activeImage ? 1 : 0.8,
        }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
      >
        {activeImage && (
          <img 
            src={activeImage} 
            alt="Certificate Preview" 
            className="w-full h-full object-cover" 
          />
        )}
      </motion.div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, x: -40 }}
          animate={titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl font-bold mb-16 flex items-center gap-4"
        >
          <span className="text-[#00f0ff] text-xl md:text-3xl font-mono">05.</span>
          Certifications
          <motion.div
            initial={{ scaleX: 0 }}
            animate={titleInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ originX: 0 }}
            className="h-[1px] bg-gradient-to-r from-gray-700 to-transparent flex-grow ml-4"
          />
        </motion.h2>

        <div className="flex flex-col border-t border-gray-800">
          {certificates.map((cert, index) => {
            const rowRef = useRef(null);
            const rowInView = useInView(rowRef, { once: false, margin: "-50px" });

            return (
              <motion.a
                key={index}
                href={cert.onCLick}
                target='_blank'
                ref={rowRef}
                initial={{ opacity: 0, y: 30 }}
                animate={rowInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 * index, ease: "easeOut" }}
                onMouseEnter={() => {
                  setActiveImage(cert.image);
                  setIsHovering(true);
                }}
                onMouseLeave={() => {
                  setIsHovering(false);
                }}
                className="group relative flex flex-col md:flex-row justify-between md:items-center py-10 md:py-12 border-b border-gray-800 cursor-none transition-colors duration-500 hover:bg-[#111]"
              >
                {/* Background hover fill line */}
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#00f0ff] group-hover:w-full transition-all duration-700 ease-out z-20" />

                <div className="flex flex-col md:w-2/3 px-4">
                  <h3 className="text-2xl md:text-4xl font-bold text-gray-300 group-hover:text-white group-hover:translate-x-4 transition-all duration-500 max-w-2xl leading-tight">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-4 group-hover:translate-x-4 transition-all duration-500">
                    <span className="text-[#7000ff] font-mono text-sm tracking-widest uppercase bg-[#7000ff]/10 px-3 py-1 rounded-full border border-[#7000ff]/20">
                      {cert.issuer}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 px-4 flex items-center justify-start md:justify-end w-full md:w-1/3 opacity-50 md:opacity-0 group-hover:opacity-100 md:group-hover:-translate-x-4 transition-all duration-500 text-gray-400">
                  <span className="text-sm font-mono tracking-widest uppercase text-[#00f0ff] flex items-center gap-2">
                    Hover to View 
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
