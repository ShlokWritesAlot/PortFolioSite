import React from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../../lib/sounds';

const GlowCard = ({ children, className = "", onClick, ...props }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={() => {
        if (onClick) {
          playSound('hover');
          onClick();
        }
      }}
      className={`relative glass-panel rounded-lg p-6 group transition-colors duration-300 hover:border-cyan-400 ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/5 transition-colors duration-300 rounded-lg pointer-events-none" />
      {children}
    </motion.div>
  );
};

export default GlowCard;
