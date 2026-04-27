import React from 'react';
import { playSound } from '../../lib/sounds';

const NeonButton = ({ children, onClick, variant = 'cyan', className = "", ...props }) => {
  const baseStyle = "relative px-6 py-2 rounded-md font-code text-sm uppercase tracking-wider font-bold transition-all duration-300 overflow-hidden group";
  
  const variants = {
    cyan: "text-cyan-400 border-2 border-cyan-400 hover:bg-cyan-400 hover:text-navy hover:shadow-[0_0_20px_rgba(0,217,255,0.6)]",
    green: "text-green-400 border-2 border-green-400 hover:bg-green-400 hover:text-navy hover:shadow-[0_0_20px_rgba(57,255,20,0.6)]",
    purple: "text-purple-400 border-2 border-purple-400 hover:bg-purple-400 hover:text-navy hover:shadow-[0_0_20px_rgba(157,78,221,0.6)]",
  };

  return (
    <button
      onClick={(e) => {
        playSound('hover');
        if (onClick) onClick(e);
      }}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default NeonButton;
