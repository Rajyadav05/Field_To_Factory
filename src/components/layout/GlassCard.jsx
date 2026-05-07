import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard = ({ 
  children, 
  className = '', 
  hoverGlow = false,
  glowColor = '#0B6E4F',
  delay = 0,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={hoverGlow ? { y: -5 } : {}}
      className={`relative rounded-2xl bg-[#0D0D0D]/60 backdrop-blur-xl border border-white/[0.04] p-6 overflow-hidden group ${className}`}
      {...props}
    >
      {hoverGlow && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 0%, ${glowColor}, transparent 70%)` }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
