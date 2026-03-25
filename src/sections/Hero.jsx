import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fadeUpVariant, staggerContainer } from '../utils/animations';
import { TypeAnimation } from 'react-type-animation';
import ParticleBackground from '../components/ParticleBackground';
import CodeEditor from '../components/CodeEditor';

const Hero = () => { 
  const containerRef = useRef(null);
  
  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden"
    >
      {/* Particle field */}
      <ParticleBackground />

      {/* Ambient glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.28, 0.15] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] bg-[#00f0ff] rounded-full mix-blend-screen filter blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] bg-[#7000ff] rounded-full mix-blend-screen filter blur-[120px]"
        />
      </div>
      
      <div className="z-10 w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <motion.p variants={fadeUpVariant} className="text-[#00f0ff] font-mono tracking-wide">
            Hi, my name is
          </motion.p>
          <motion.h1 variants={fadeUpVariant} className="text-5xl md:text-7xl font-bold tracking-tight text-white m-0">
            Amrit Raj.
          </motion.h1>
          <motion.div variants={fadeUpVariant} className="text-4xl md:text-6xl font-bold text-gray-400 mt-2 m-0 leading-tight tracking-tight min-h-[48px] md:min-h-[72px]">
            <TypeAnimation
              sequence={[
                'I build things for the web.',
                2000,
                'I create modern web apps.',
                2000,
                'I design premium interfaces.',
                2000,
              ]}
              wrapper="span"
              speed={75}
              deletionSpeed={90}
              repeat={Infinity}
              className="inline-block"
            />
          </motion.div>

          <motion.p 
  variants={fadeUpVariant} 
  className="text-gray-400 max-w-xl text-lg leading-relaxed mt-4"
>
I’m a BTech CSE student passionate about full stack development and building practical web applications. I enjoy creating simple and user-friendly solutions.
</motion.p>
          
          
          <motion.div variants={fadeUpVariant} className="flex gap-4 mt-8">
            <a href="#projects" className="px-8 py-4 bg-white text-black font-semibold rounded hover:bg-transparent hover:text-white border-2 border-white transition-all duration-300">
              View Projects
            </a>
            <a href="/CV_12312878.pdf" download="CV_12312878.pdf" target="_blank" rel="noreferrer" className="px-8 py-4 bg-transparent text-[#00f0ff] font-semibold rounded border-2 border-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-all duration-300">
              Download CV
            </a>
          </motion.div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
           className="relative hidden lg:block"
        >
           {/* Animated ambient glow — pulsing gradient */}
           <motion.div
             animate={{
               scale: [1, 1.08, 1],
               opacity: [0.2, 0.4, 0.2],
             }}
             transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
             className="absolute inset-0 bg-gradient-to-tr from-[#00f0ff]/30 to-[#7000ff]/30 rounded-2xl blur-2xl"
           />

           {/* Floating + subtle hover-tilt Code Editor */}
           <motion.div
             animate={{ y: [-8, 8, -8] }}
             transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
             whileHover={{ rotateX: -4, rotateY: 6, scale: 1.03 }}
             style={{ transformStyle: 'preserve-3d', perspective: 800 }}
             className="relative z-10 w-full"
           >
             <CodeEditor />
           </motion.div>
           
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs uppercase tracking-widest text-white">Scroll</span>
        <div className="w-[1px] h-12 bg-white/30 overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48] }} 
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-1/2 bg-white"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
