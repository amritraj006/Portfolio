import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Certificates from './sections/Certificates';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';
import Preloader from './components/Preloader';
import { AnimatePresence, motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // Lenis: Native requestAnimationFrame smoothing to fix lag
    const lenis = new Lenis({
      lerp: 0.1,          // Slightly faster lerp for more responsiveness
      smoothWheel: true,
      syncTouch: false,   // Native feel on mobile touch
    });

    lenis.on('scroll', ScrollTrigger.update);

    // Use native browser RAF instead of GSAP ticker for maximum performance
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Expose globally for programmatic scrollTo from Navbar
    window.locomotive = {
      scrollTo: (target, opts = {}) => lenis.scrollTo(target, opts),
    };

    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.locomotive = null;
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader key="preloader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-[#00f0ff] selection:text-black cursor-none"
      >
        <CustomCursor />
      <Navbar />
  
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Certificates />
      <Achievements />
      <Contact />
      </motion.main>
    </>
  );
}

export default App;
