import React from 'react';
import { motion } from 'framer-motion';

const CodeEditor = () => {
  const codeLines = [
    { line: 1, text: 'const Developer = {', indent: 0, color: 'text-purple-400' },
    { line: 2, text: 'name: "Amrit Raj",', indent: 2, color: 'text-blue-400' },
    { line: 3, text: 'role: "Full Stack Engineer",', indent: 2, color: 'text-blue-400' },
    { line: 4, text: 'skills: ["React", "Node.js", "Python"],', indent: 2, color: 'text-green-400' },
    { line: 5, text: 'status: "Open to Work"', indent: 2, color: 'text-blue-400' },
    { line: 6, text: '};', indent: 0, color: 'text-purple-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="w-full max-w-4xl bg-[#0d1117]/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl"
    >
      {/* Search/Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22]/50 border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-xs text-gray-400 font-mono tracking-wider bg-[#0d1117] px-3 py-1 rounded-md border border-white/5">
          Developer.js
        </div>
        <div className="w-10" />
      </div>

      {/* Editor Content */}
      <div className="p-6 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto custom-scrollbar">
        {codeLines.map((line, index) => (
          <motion.div
            key={line.line}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
            className="flex hover:bg-white/5 transition-colors duration-200"
          >
            <span className="w-8 shrink-0 text-gray-600 select-none text-right pr-4 border-r border-white/5 mr-4">
              {line.line}
            </span>
            <span 
              className={`${line.color}`}
              style={{ marginLeft: `${line.indent * 0.75}rem` }}
            >
              {line.text}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2 bg-[#161b22]/30 border-t border-white/5 flex justify-between items-center">
        <div className="flex gap-4 text-[10px] text-gray-500 font-mono">
          <span>UTF-8</span>
          <span>JavaScript</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-[#00f0ff]/70 font-mono">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
          Live
        </div>
      </div>
    </motion.div>
  );
};

export default CodeEditor;
