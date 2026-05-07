import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../layout';
import { Wheat, Factory, ChevronRight } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from '../ui';

export const DualEcosystem = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 bg-[#111111] px-6 border-y border-white/[0.02] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] mix-blend-overlay"></div>
      
      <div className="max-w-[1200px] mx-auto flex flex-col items-center relative z-10">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading font-extrabold text-[44px] md:text-[56px] text-white tracking-tight leading-none mb-20 text-center"
        >
          Built for <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0B6E4F] to-[#2F80ED]">Two Worlds</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          
          {/* Farmer Card */}
          <GlassCard 
            className="relative flex flex-col p-10 lg:p-12"
            hoverGlow
            glowColor="#0B6E4F"
            delay={0.1}
          >
            {/* Corner Badge */}
            <div className="absolute top-6 right-6 bg-[#0B6E4F]/10 border border-[#0B6E4F]/20 rounded-full px-4 py-1.5 text-[11px] text-[#0B6E4F] font-bold tracking-wide flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0B6E4F] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0B6E4F]"></span>
              </span>
              Low-literacy friendly
            </div>

            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0B6E4F]/20 to-transparent border border-[#0B6E4F]/30 flex items-center justify-center text-[#1DB97A] mb-8 shadow-[0_0_40px_rgba(11,110,79,0.2)]">
              <Wheat size={40} strokeWidth={1.5} />
            </div>

            <div className="text-[#0B6E4F] text-[12px] tracking-[0.2em] uppercase font-bold mb-4">
              FOR FARMERS
            </div>

            <h3 className="font-heading font-extrabold text-[32px] text-white leading-[1.2] mb-6">
              List residue.<br />Get paid instantly.
            </h3>

            <p className="font-sans font-medium text-[16px] text-[#A0A0A0] leading-relaxed mb-10 flex-grow max-w-sm">
              Simple voice and image-guided AI listing. Full native language support across Hindi, Punjabi, and English interfaces.
            </p>

            <PrimaryButton 
              className="w-full sm:w-auto h-14 px-8 text-[15px] font-bold bg-[#0B6E4F] hover:bg-[#1DB97A] border-none shadow-[0_0_20px_rgba(11,110,79,0.3)] group flex items-center justify-center gap-2" 
              onClick={() => navigate('/farmer')}
            >
              Initialize Farmer Portal
              <ChevronRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </PrimaryButton>
          </GlassCard>

          {/* Industry Card */}
          <GlassCard 
            className="relative flex flex-col p-10 lg:p-12"
            hoverGlow
            glowColor="#2F80ED"
            delay={0.2}
          >
            {/* Corner Badge */}
            <div className="absolute top-6 right-6 bg-[#2F80ED]/10 border border-[#2F80ED]/20 rounded-full px-4 py-1.5 text-[11px] text-[#2F80ED] font-bold tracking-wide flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2F80ED] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2F80ED]"></span>
              </span>
              Satellite verified
            </div>

            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2F80ED]/20 to-transparent border border-[#2F80ED]/30 flex items-center justify-center text-[#2F80ED] mb-8 shadow-[0_0_40px_rgba(47,128,237,0.2)]">
              <Factory size={40} strokeWidth={1.5} />
            </div>

            <div className="text-[#2F80ED] text-[12px] tracking-[0.2em] uppercase font-bold mb-4">
              FOR INDUSTRIES
            </div>

            <h3 className="font-heading font-extrabold text-[32px] text-white leading-[1.2] mb-6">
              Procure verified<br />biomass securely.
            </h3>

            <p className="font-sans font-medium text-[16px] text-[#A0A0A0] leading-relaxed mb-10 flex-grow max-w-sm">
              Satellite-verified supply streams. Algorithmic dynamic pricing. Real-time fleet logistics tracking.
            </p>

            <SecondaryButton 
              className="w-full sm:w-auto h-14 px-8 text-[15px] font-bold border-white/10 hover:border-white/30 hover:bg-white/[0.03] group flex items-center justify-center gap-2" 
              onClick={() => navigate('/industry')}
            >
              Open Command Center
              <ChevronRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#2F80ED]" />
            </SecondaryButton>
          </GlassCard>

        </div>
      </div>
    </section>
  );
};
