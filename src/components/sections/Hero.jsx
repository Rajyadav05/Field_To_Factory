import React from 'react';
import { motion } from 'framer-motion';
import { PrimaryButton, SecondaryButton } from '../ui';
import { ChevronRight, ScanLine } from 'lucide-react';

const dots = [
  { cx: 170, cy: 80, delay: 0 }, // Punjab
  { cx: 185, cy: 100, delay: 0.2 }, // Haryana
  { cx: 220, cy: 130, delay: 0.5 }, // UP
  { cx: 270, cy: 160, delay: 0.8 }, // Bihar
  { cx: 140, cy: 240, delay: 0.1 }, // Maharashtra
  { cx: 200, cy: 190, delay: 0.4 }, // MP
  { cx: 220, cy: 290, delay: 0.7 }, // AP
  { cx: 160, cy: 310, delay: 0.3 }, // Karnataka
  { cx: 130, cy: 140, delay: 0.6 }, // Rajasthan
  { cx: 80, cy: 180, delay: 0.25 }, // Gujarat
];

const paths = [
  "M170,80 L185,100 L220,130 L270,160",
  "M130,140 L200,190 L140,240",
  "M200,190 L220,130",
  "M140,240 L160,310 L220,290",
  "M80,180 L200,190"
];

export const Hero = () => {
  return (
    <section className="relative w-full h-[90vh] min-h-[800px] bg-[#0D0D0D] overflow-hidden flex items-center justify-center">
      {/* Ambient Lighting & Layered Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0B6E4F]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#2F80ED]/5 blur-[150px] rounded-full" />
      </div>

      {/* Animated Intelligence Grid Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Animated India Map Layer */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-[800px] h-[800px] max-w-[150vw]">
          {/* Glowing Drop Shadow Def */}
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* India Outline (Stylized) */}
          <polygon 
            points="200,20 230,70 260,130 380,160 390,190 350,210 300,200 260,260 180,380 120,240 90,200 50,170 120,130 160,70" 
            fill="none" 
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth="1" 
            strokeLinejoin="round"
          />
          
          {/* Connecting Logistics Paths */}
          {paths.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke="#0B6E4F"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
            />
          ))}

          {/* Glowing Biomass Nodes */}
          {dots.map((dot, i) => (
            <g key={`dot-${i}`}>
              <motion.circle
                cx={dot.cx}
                cy={dot.cy}
                r={6}
                fill="#0B6E4F"
                filter="url(#glow)"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: dot.delay,
                  ease: "easeInOut"
                }}
              />
              <circle cx={dot.cx} cy={dot.cy} r={2} fill="#FFF" />
            </g>
          ))}
        </svg>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-[1200px]">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md mb-8"
        >
          <ScanLine className="w-4 h-4 text-[#0B6E4F]" />
          <span className="text-white/80 text-[11px] tracking-[0.2em] uppercase font-semibold">
            Intelligence Engine v2.0 Active
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-heading font-extrabold text-[56px] md:text-[96px] tracking-tighter leading-[1.05]"
        >
          <span className="text-white">Eliminate Waste.</span><br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0B6E4F] via-[#1DB97A] to-[#0B6E4F]">
            Power Industry.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="font-sans font-medium text-[18px] md:text-[22px] text-[#A0A0A0] max-w-[640px] mx-auto mt-8 leading-relaxed"
        >
          The national intelligence protocol converting agricultural residue from an environmental hazard into verified industrial power.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12 w-full"
        >
          <PrimaryButton className="w-full sm:w-auto px-8 py-4 text-[15px] font-bold tracking-wide bg-[#0B6E4F] hover:bg-[#1DB97A] border-none shadow-[0_0_30px_rgba(11,110,79,0.3)] hover:shadow-[0_0_40px_rgba(29,185,122,0.5)] transition-all duration-500 group flex items-center justify-center gap-2">
            Initialize Platform
            <ChevronRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </PrimaryButton>
          <SecondaryButton className="w-full sm:w-auto px-8 py-4 text-[15px] font-semibold tracking-wide border-white/10 hover:border-white/30 hover:bg-white/[0.03] backdrop-blur-md">
            View Logistics Map
          </SecondaryButton>
        </motion.div>

      </div>
    </section>
  );
};
