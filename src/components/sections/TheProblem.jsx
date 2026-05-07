import React from 'react';
import { motion } from 'framer-motion';

export const TheProblem = () => {
  return (
    <section className="py-32 bg-[#111111] px-4">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left: Text */}
        <div className="w-full lg:w-[55%] flex flex-col">
          <div className="text-[#FF8F00] text-[11px] tracking-widest uppercase font-sans font-semibold mb-4">
            THE PROBLEM
          </div>
          <h2 className="font-heading font-bold text-[40px] md:text-[48px] text-[#F5F5F5] tracking-tight leading-[1.1] mb-6">
            23 million tonnes of crop residue burns across India every year.
          </h2>
          <p className="font-sans font-normal text-[18px] text-[#A0A0A0] leading-relaxed mb-8">
            Every October and November, Punjab and Haryana farmers burn leftover crop residue — releasing toxic smoke, destroying soil, and wasting a billion-dollar biomass resource. We built the intelligence layer to stop it.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-x-8 gap-y-6 mt-8">
            <div>
              <div className="font-heading font-bold text-[32px] text-[#FF8F00] leading-none mb-2">9.6M Tonnes CO₂</div>
              <div className="font-sans font-semibold text-[11px] uppercase tracking-widest text-[#A0A0A0]">Emissions Preventable</div>
            </div>
            <div>
              <div className="font-heading font-bold text-[32px] text-[#FF8F00] leading-none mb-2">₹18,000 Crore</div>
              <div className="font-sans font-semibold text-[11px] uppercase tracking-widest text-[#A0A0A0]">Wasted Value</div>
            </div>
            <div>
              <div className="font-heading font-bold text-[32px] text-[#FF8F00] leading-none mb-2">47%</div>
              <div className="font-sans font-semibold text-[11px] uppercase tracking-widest text-[#A0A0A0]">AQI Spike</div>
            </div>
          </div>
        </div>

        {/* Right: Visual */}
        <div className="w-full lg:w-[45%]">
          <div className="relative w-full aspect-video bg-[#0D0D0D] border border-white/10 rounded-xl overflow-hidden flex items-center justify-center shadow-2xl">
            
            {/* Map SVGs */}
            <svg viewBox="0 0 400 400" className="w-[120%] h-[120%] text-[#1DB97A]/20">
              {/* Simplified India Outline */}
              <polygon 
                points="200,20 230,70 260,130 380,160 390,190 350,210 300,200 260,260 180,380 120,240 90,200 50,170 120,130 160,70" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinejoin="round"
              />
              
              {/* Fire Hotspots in Punjab/Haryana (approx 160,70 to 180,100) */}
              {[
                { cx: 165, cy: 75, delay: 0 },
                { cx: 175, cy: 85, delay: 0.3 },
                { cx: 160, cy: 90, delay: 0.6 },
                { cx: 185, cy: 95, delay: 0.2 },
                { cx: 170, cy: 105, delay: 0.8 },
                { cx: 180, cy: 80, delay: 0.5 },
              ].map((spot, i) => (
                <motion.circle
                  key={i}
                  cx={spot.cx}
                  cy={spot.cy}
                  r={10}
                  fill="#ef4444"
                  animate={{
                    opacity: [0.3, 0.9, 0.3],
                    scale: [1, 1.4, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: spot.delay,
                    ease: "easeInOut"
                  }}
                  style={{ filter: 'blur(5px)' }}
                />
              ))}
            </svg>

            {/* Label Overlay */}
            <div className="absolute bottom-4 left-4 text-[#A0A0A0] text-[11px] font-sans bg-[#111111]/80 backdrop-blur-sm px-3 py-1.5 rounded border border-white/5">
              Satellite burn detection — Oct 2024
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
