import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // The dot follows mouse instantly
  const dotX = useSpring(cursorX, { stiffness: 2000, damping: 80 });
  const dotY = useSpring(cursorY, { stiffness: 2000, damping: 80 });

  // The ring follows with a smooth lag
  const ringX = useSpring(cursorX, { stiffness: 120, damping: 20 });
  const ringY = useSpring(cursorY, { stiffness: 120, damping: 20 });

  // The glow follows with even more lag
  const glowX = useSpring(cursorX, { stiffness: 60, damping: 15 });
  const glowY = useSpring(cursorY, { stiffness: 60, damping: 15 });

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Detect hoverable elements
    const handleMouseEnter = (e) => {
      if (
        e.target.closest('a, button, [role="button"]')
      ) {
        setIsHovering(true);
      }
    };
    const handleMouseLeave = (e) => {
      if (
        e.target.closest('a, button, [role="button"]')
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseEnter);
    window.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseEnter);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Outer glow blob - slowest follower */}
      <motion.div
        className="fixed pointer-events-none z-[9990] rounded-full"
        style={{
          left: glowX,
          top: glowY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 120 : 80,
          height: isHovering ? 120 : 80,
          background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
        transition={{ width: { duration: 0.3 }, height: { duration: 0.3 } }}
      />

      {/* Follower ring - medium lag */}
      <motion.div
        className="fixed pointer-events-none z-[9991] rounded-full border border-[#00f0ff]/60"
        style={{
          left: ringX,
          top: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 52 : isClicking ? 28 : 38,
          height: isHovering ? 52 : isClicking ? 28 : 38,
          borderColor: isHovering ? 'rgba(112,0,255,0.8)' : 'rgba(0,240,255,0.6)',
          boxShadow: isHovering
            ? '0 0 15px rgba(112,0,255,0.4)'
            : '0 0 8px rgba(0,240,255,0.3)',
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Center dot - instant */}
      <motion.div
        className="fixed pointer-events-none z-[9992] rounded-full bg-[#00f0ff]"
        style={{
          left: dotX,
          top: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isClicking ? 6 : isHovering ? 8 : 6,
          height: isClicking ? 6 : isHovering ? 8 : 6,
          opacity: isHovering ? 0.7 : 1,
          boxShadow: '0 0 10px 2px rgba(0,240,255,0.8)',
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};

export default CustomCursor;
