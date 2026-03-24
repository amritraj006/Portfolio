import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Lock scroll while preloader is active
    document.body.style.overflow = "hidden";
    
    let current = 0;
    const interval = setInterval(() => {
      // Simulate loading progress
      current += Math.floor(Math.random() * 8) + 2;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          document.body.style.overflow = "auto";
          onComplete();
        }, 500); // Hold at 100% for 500ms
      }
      setPercent(current);
    }, 40);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100vh" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[99999] bg-[#0a0a0a] flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="flex flex-col items-center gap-8 relative">
        <div className="font-mono text-[#00f0ff] text-6xl md:text-8xl font-bold tabular-nums tracking-tighter mix-blend-difference z-10">
          {percent}%
        </div>
        
        {/* Animated Loading Bar */}
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden absolute -bottom-6">
          <motion.div 
            className="h-full bg-[#00f0ff]"
            initial={{ width: "0%" }}
            animate={{ width: `${percent}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
      </div>
      
      {/* Decorative text */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-10 text-gray-500 font-mono text-xs uppercase tracking-[0.3em]"
      >
        Loading Experience
      </motion.p>
    </motion.div>
  );
};

export default Preloader;
