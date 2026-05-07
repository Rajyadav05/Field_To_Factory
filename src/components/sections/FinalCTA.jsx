import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from '../ui';

export const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-32 bg-[#0D0D0D] overflow-hidden flex flex-col items-center justify-center px-4">
      {/* Background Radial Glow */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(11,110,79,0.15) 0%, transparent 70%)'
        }}
      />

      <motion.div 
        className="relative z-10 w-full max-w-[800px] flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="font-heading font-bold text-[40px] md:text-[56px] text-white tracking-tight leading-[1.1] mb-6">
          Join the infrastructure that stops fires before they start.
        </h2>
        
        <p className="font-sans text-[18px] text-[#A0A0A0] mb-12">
          Used by 1,840 farmers and 62 industries across 6 states.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <PrimaryButton className="w-full sm:w-auto" onClick={() => navigate('/farmer')}>
            Register as Farmer
          </PrimaryButton>
          <SecondaryButton className="w-full sm:w-auto bg-[#0D0D0D]/50 hover:bg-[#2F80ED]/10" onClick={() => navigate('/industry')}>
            Access Industry Platform
          </SecondaryButton>
        </div>
      </motion.div>
    </section>
  );
};
