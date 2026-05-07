import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../layout/GlassCard';

export const StatsStrip = () => {
  const stats = [
    { label: "Biomass Mapped", value: "4.2M", unit: "Tonnes", color: "#0B6E4F" },
    { label: "Farms Verified", value: "1,840", unit: "", color: "#F5F5F5" },
    { label: "Industries Connected", value: "62", unit: "", color: "#FF8F00" },
    { label: "CO₂ Prevented", value: "3.1M", unit: "kg", color: "#2F80ED" }
  ];

  return (
    <section className="w-full bg-[#111111] py-16 relative z-20 border-y border-white/[0.04]">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <GlassCard key={idx} hoverGlow glowColor={stat.color} delay={idx * 0.1} className="flex flex-col items-center text-center p-8">
            <h3 
              className="font-heading font-bold text-[48px] leading-none tracking-tight mb-2"
              style={{ color: stat.color }}
            >
              {stat.value}<span className="text-[24px] ml-1 opacity-70">{stat.unit}</span>
            </h3>
            <p className="text-[#A0A0A0] text-[12px] uppercase tracking-[0.15em] font-semibold">
              {stat.label}
            </p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};
