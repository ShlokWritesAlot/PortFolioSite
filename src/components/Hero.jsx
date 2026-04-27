import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, terminalTypeEffect } from '../lib/animations';
import MatrixRain from './shared/MatrixRain';
import TerminalInterface from './TerminalInterface';
import NeonButton from './shared/NeonButton';

const Hero = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <MatrixRain />

      {/* Vignette effect to focus center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-navy/80 to-navy z-10 pointer-events-none"></div>

      <div className="relative z-20 flex flex-col items-center max-w-4xl px-4 w-full">

        {/* Animated Title */}
        <div className="mb-6 overflow-hidden">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={terminalTypeEffect}
            className="text-4xl md:text-6xl font-display font-bold text-white whitespace-nowrap overflow-hidden border-r-4 border-green-400 pr-2 animate-[blink_1s_infinite]"
          >
            SHLOK PANDEY
          </motion.h1>
        </div>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-lg md:text-xl text-cyan-400 font-code mb-10 text-center tracking-wide"
        >
          Researcher & Systems Developer.
          <br />
          <span className="text-gray-400 text-sm mt-2 block">Building secure systems. Breaking bad ones. (get it?)</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full flex justify-center mb-12"
        >
          <TerminalInterface />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex gap-4"
        >
          <NeonButton onClick={() => scrollTo('projects')} variant="cyan">Explore Projects</NeonButton>
          <NeonButton onClick={() => scrollTo('research')} variant="purple">View Research</NeonButton>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={() => scrollTo('projects')}>
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-cyan-400 rounded-full animate-[ping_2s_infinite]"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
