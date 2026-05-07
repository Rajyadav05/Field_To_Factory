import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GlassCard } from '../layout';
import { Satellite, Cpu, Bell, ShieldCheck } from 'lucide-react';

export const HowItWorks = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const cards = [
    {
      icon: Satellite,
      glow: '#2F80ED',
      iconColor: 'text-[#2F80ED]',
      iconShadow: 'shadow-[0_0_40px_rgba(47,128,237,0.3)]',
      title: 'Satellite NDVI Scan',
      desc: 'Sentinel-2 imagery scans fields every 5 days. NDVI and NDTI values calculated per farm with military precision.'
    },
    {
      icon: Cpu,
      glow: '#FF8F00',
      iconColor: 'text-[#FF8F00]',
      iconShadow: 'shadow-[0_0_40px_rgba(255,143,0,0.3)]',
      title: 'AI Burn-Risk Prediction',
      desc: 'Palantir-grade ML models predict burn probabilities 2 weeks ahead using harvest timing, weather, and residue metadata.'
    },
    {
      icon: Bell,
      glow: '#0B6E4F',
      iconColor: 'text-[#0B6E4F]',
      iconShadow: 'shadow-[0_0_40px_rgba(11,110,79,0.3)]',
      title: 'Industry Alert',
      desc: 'Verified enterprise partners receive instantaneous alerts for high-grade biomass supply within their procurement radius.'
    },
    {
      icon: ShieldCheck,
      glow: '#1DB97A',
      iconColor: 'text-[#1DB97A]',
      iconShadow: 'shadow-[0_0_40px_rgba(29,185,122,0.3)]',
      title: 'Reserve Before Burn',
      desc: 'Industries lock in biomass directly. Farmers are instantly compensated. The fire sequence is aborted.'
    }
  ];

  return (
    <section className="py-32 bg-[#0D0D0D] px-6 overflow-hidden relative">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#2F80ED]/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#0B6E4F]/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-[1280px] mx-auto flex flex-col items-center relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#0B6E4F] text-[12px] tracking-[0.2em] uppercase font-sans font-bold mb-4"
          >
            THE INTELLIGENCE ENGINE
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-[40px] md:text-[56px] text-[#F5F5F5] tracking-tight leading-[1.1]"
          >
            Predict. Alert. Reserve.<br />
            <span className="text-[#A0A0A0]">Before the Fire Starts.</span>
          </motion.h2>
        </div>

        {/* Cards Row */}
        <div ref={containerRef} className="relative w-full">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[64px] left-0 w-full h-[1px] bg-white/[0.05] z-0">
            {isInView && (
              <motion.div 
                className="absolute top-1/2 -translate-y-1/2 left-0 w-32 h-[2px] bg-gradient-to-r from-transparent via-[#1DB97A] to-transparent shadow-[0_0_20px_#1DB97A]"
                initial={{ left: "-10%" }}
                animate={{ left: "110%" }}
                transition={{ duration: 4, ease: "linear", repeat: Infinity }}
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {cards.map((card, i) => (
              <GlassCard key={i} hoverGlow glowColor={card.glow} delay={i * 0.1} className="flex flex-col gap-5 p-8">
                {/* Icon Circle */}
                <div className={`w-16 h-16 rounded-xl bg-[#111111] border border-white/[0.08] flex items-center justify-center ${card.iconColor} ${card.iconShadow} relative overflow-hidden group-hover:scale-110 transition-transform duration-500`}>
                  <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <card.icon className="w-8 h-8 relative z-10" strokeWidth={1.5} />
                </div>
                
                <h3 className="font-heading font-bold text-[22px] text-white mt-4">
                  {card.title}
                </h3>
                
                <p className="font-sans font-medium text-[15px] text-[#A0A0A0] leading-relaxed">
                  {card.desc}
                </p>
              </GlassCard>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
