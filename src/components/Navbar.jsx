import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // Trigger when section is in the middle of the screen
      threshold: 0,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id) {
            setActiveLink(`#${id}`);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Watch all nav link targets
    const sections = ['home', ...navLinks.map((link) => link.href.replace('#', ''))];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setActiveLink(href);
    const target = document.querySelector(href);
    if (target && window.locomotive) {
      window.locomotive.scrollTo(target);
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[60] flex justify-center w-full px-4 md:px-8 transition-all duration-500 ${
          isScrolled ? 'py-4' : 'py-8'
        }`}
      >
        {/* The floating glass capsule */}
        <div 
          className={`flex justify-between items-center w-full transition-all duration-500 ${
            isScrolled 
              ? 'max-w-5xl bg-[#111]/80 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-full px-6 py-3' 
              : 'max-w-7xl bg-transparent border-transparent px-2 py-2'
          }`}
        >
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 font-bold tracking-tighter hover:opacity-80 transition-opacity z-10 group"
          >
            <div className={`flex items-center justify-center transition-all duration-300 ${isScrolled ? 'w-8 h-8 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30' : ''}`}>
               <Code className="text-[#00f0ff] group-hover:rotate-12 transition-transform duration-300" size={isScrolled ? 18 : 28} />
            </div>
            <span className={`bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 transition-all font-sans ${isScrolled ? 'text-lg' : 'text-2xl'}`}>
              Dev<span></span>
            </span>
          </a>

          {/* Desktop Links (Magnetic Pills) */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeLink === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-5 py-2 text-sm font-medium transition-colors duration-300 z-10 rounded-full ${
                    isActive ? 'text-white [text-shadow:0_0_10px_rgba(0,240,255,0.5)]' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute bottom-1 left-4 right-4 h-[2px] bg-[#00f0ff] shadow-[0_0_8px_rgba(0,240,255,0.8)] rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Actions & Mobile Toggle */}
          <div className="flex items-center gap-4 z-10">
            <a
              href="/CV_12312878.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:inline-flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${
                isScrolled 
                  ? 'px-6 py-2 bg-white text-black hover:bg-gray-200 shadow-md transform hover:scale-105' 
                  : 'px-6 py-2.5 border-2 border-[#00f0ff]/40 text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]'
              }`}
            >
              Resume
            </a>
            
            {/* Hamburger (Mobile) */}
            <button 
              className="lg:hidden text-white hover:text-[#00f0ff] transition-colors p-2 rounded-full hover:bg-white/5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <motion.div animate={{ rotate: isMobileMenuOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] lg:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-[#0a0a0a] border-l border-white/10 z-[55] flex flex-col justify-center px-8 lg:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.05, ease: "easeOut" }}
                  className="group flex gap-4 items-center mb-2"
                >
                  <span className="text-4xl font-bold text-gray-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                    {link.name}
                  </span>
                </motion.a>
              ))}
              
              <motion.a
                href="/CV_12312878.pdf"
                download="CV_12312878.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setTimeout(() => setIsMobileMenuOpen(false), 300)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.1 + navLinks.length * 0.05, ease: "easeOut" }}
                className="mt-8 text-center px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors w-full"
              >
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
