import React from 'react';
import { motion } from 'framer-motion';

export const PrimaryButton = ({ children, icon: Icon, className = '', ...props }) => {
  return (
    <motion.button
      className={`bg-[#0B6E4F] text-[#F5F5F5] px-7 py-3.5 rounded-md font-semibold flex items-center justify-center gap-2 ${className}`}
      whileHover={{ 
        scale: 1.02, 
        backgroundColor: '#0E8A63', 
        boxShadow: '0 0 20px rgba(11,110,79,0.5)' 
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </motion.button>
  );
};

export const SecondaryButton = ({ children, icon: Icon, className = '', ...props }) => {
  return (
    <motion.button
      className={`bg-transparent border border-[#2F80ED] text-[#2F80ED] px-7 py-3.5 rounded-md font-semibold flex items-center justify-center gap-2 ${className}`}
      whileHover={{ 
        backgroundColor: 'rgba(47,128,237,0.1)', 
        boxShadow: '0 0 16px rgba(47,128,237,0.3)' 
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </motion.button>
  );
};

export const AlertButton = ({ children, icon: Icon, className = '', ...props }) => {
  return (
    <motion.button
      className={`bg-[#FF8F00] text-[#0D0D0D] px-7 py-3.5 rounded-md font-bold flex items-center justify-center gap-2 ${className}`}
      whileHover={{ 
        backgroundColor: '#FFA733', 
        boxShadow: '0 0 24px rgba(255,143,0,0.45)' 
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </motion.button>
  );
};

export const GhostButton = ({ children, icon: Icon, className = '', ...props }) => {
  return (
    <motion.button
      className={`bg-transparent border border-white/10 text-[#A0A0A0] px-7 py-3.5 rounded-md font-semibold flex items-center justify-center gap-2 hover:border-white/30 hover:text-white transition-all duration-250 ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </motion.button>
  );
};
