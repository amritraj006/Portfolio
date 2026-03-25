import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "SkillBridge",
    description: "A SkillBridge platform designed to connect learners with relevant opportunities, featuring user authentication, course enrollment, and personalized learning pathways.",
    tech: ["React", "Express", "MongoDB", "Node", "Clerk"],
    github: "https://github.com/amritraj006/SkillBridge",
    live: "https://skill-bridge-ykko.onrender.com/"
  },
  {
    title: "Tracker",
    description: "Developed a real-time vehicle tracking simulation that enables live location updates, route visualization, speed monitoring, and efficient tracking of multiple vehicles on an interactive interface.",
    tech: ["React", "Node", "MongoDB", "Leaflet.js", "Express"],
    github: "https://github.com/amritraj006/Real-Time-Vehicle-Tracking",
    live: "https://real-time-vehicle-tracking-frontend.onrender.com"
  },
  {
    title: "ShopHub",
    description: "A ShopHub e-commerce platform that enables users to browse products, manage carts, and complete secure purchases with an intuitive shopping experience.",
    tech: ["React", "Node", "Express", "MongoDB", "Stripe"],
    github: "https://github.com/amritraj006/Shop-Hub",
    live: "https://shop-hub-bt8j.onrender.com"
  },
  {
    title: "Career AI",
    description: "A Career AI platform that helps users explore career paths, take assessments, and receive personalized recommendations based on their interests and performance.",
    tech: ["React", "Framer Motion", "Node", "Express", "MySQL", 'Gemini API'],
    github: "https://github.com/amritraj006/Career-AI-MERN",
    live: "https://career-ai-web.onrender.com"
  }
];

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 80, rotateX: 15 },
        visible: { 
          opacity: 1, y: 0, rotateX: 0,
          transition: { duration: 0.7, delay: (index % 2) * 0.15, ease: [0.16, 1, 0.3, 1] }
        }
      }}
      initial="hidden"
      animate={controls}
      style={{ transformPerspective: 1000 }}
      className="group relative bg-[#111] border border-gray-800 rounded-xl p-8 flex flex-col justify-between overflow-hidden"
    >
      {/* Animated border beam on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.1), transparent)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
      />

      {/* Top Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="text-[#00f0ff]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div className="flex gap-4 items-center">
            <motion.a href={project.github} target='_blank' whileHover={{ scale: 1.2, y: -2 }} className="text-gray-400 hover:text-[#00f0ff] transition-colors">
              <Github className="w-5 h-5"/>
            </motion.a>
            <motion.a href={project.live} target='_blank' whileHover={{ scale: 1.2, y: -2 }} className="text-gray-400 hover:text-[#00f0ff] transition-colors">
              <ExternalLink className="w-5 h-5"/>
            </motion.a>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#00f0ff] transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {project.description}
        </p>
      </div>

      {/* Tech stack */}
      <ul className="flex flex-wrap gap-2 mt-2">
        {project.tech.map((tech) => (
          <li key={tech} className="text-xs font-mono px-3 py-1 rounded-full border border-gray-700 text-gray-500 group-hover:border-[#00f0ff]/40 group-hover:text-[#00f0ff] transition-all duration-300">
            {tech}
          </li>
        ))}
      </ul>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
    </motion.div>
  );
};

const Projects = () => {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: false, margin: "-100px" });

  return (
    <section id="projects" className="py-32 px-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, x: -40 }}
          animate={titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl font-bold mb-16 flex items-center gap-4"
        >
          <span className="text-[#00f0ff] text-xl md:text-3xl font-mono">03.</span>
          Some Things I've Built
          <motion.div
            initial={{ scaleX: 0 }}
            animate={titleInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            style={{ originX: 0 }}
            className="h-[1px] bg-gradient-to-r from-gray-700 to-transparent flex-grow ml-4"
          />
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
