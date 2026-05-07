import React from 'react';
import { motion } from 'framer-motion';

export const PageTransition = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`w-full flex-grow flex flex-col items-center justify-center ${className}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};
