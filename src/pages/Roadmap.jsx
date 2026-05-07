import React, { useRef } from 'react';
import { PageTransition, GlassCard } from '../components/layout';
import { FinalCTA } from '../components/sections';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Zap, Flame, Layers, Plane, Landmark, Shield, FileText } from 'lucide-react';

const TimelineItem = ({ item, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`relative flex items-center justify-between w-full mb-12 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Empty Space */}
      <div className="w-[45%] hidden md:block" />
      
      {/* Center Dot */}
      <div 
        className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#1DB97A] z-10 transition-colors duration-500" 
        style={{ backgroundColor: item.isActive ? '#1DB97A' : '#0D0D0D' }} 
      />
      
      {/* Content Card */}
      <motion.div 
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full pl-12 md:pl-0 md:w-[45%]"
      >
        <GlassCard className="p-6">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-full ${item.statusColor}`}>
              {item.year}
            </span>
            <span className="text-white font-semibold text-[16px]">{item.title}</span>
          </div>
          <p className="text-[#A0A0A0] text-[14px] mb-4">{item.body}</p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#A0A0A0]">Status:</span>
            <span className={`text-[11px] uppercase tracking-wider font-bold ${item.statusTextColor}`}>{item.status}</span>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export const Roadmap = () => {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const timelineData = [
    { year: '2026 Q1', title: 'AI Biomass Marketplace LIVE', body: 'Punjab & Haryana — End-to-end residue listing, verification, and procurement.', status: 'LIVE', statusColor: 'bg-[#1DB97A]/20 text-[#1DB97A]', statusTextColor: 'text-[#1DB97A]', isActive: true },
    { year: '2026 Q4', title: 'Carbon Credit Automation', body: 'NDVI-linked credit issuance platform integration for rapid payouts.', status: 'UPCOMING', statusColor: 'bg-[#FF8F00]/20 text-[#FF8F00]', statusTextColor: 'text-[#FF8F00]', isActive: false },
    { year: '2027', title: 'Voice AI for Farmers', body: 'Expanding access with full conversational agents in Hindi, Punjabi, and 8+ regional languages.', status: 'PLANNED', statusColor: 'bg-white/10 text-[#A0A0A0]', statusTextColor: 'text-[#A0A0A0]', isActive: false },
    { year: '2028', title: 'SAF Supply Chain', body: 'Connecting verified agricultural biomass pipelines directly to Sustainable Aviation Fuel refineries.', status: 'PLANNED', statusColor: 'bg-white/10 text-[#A0A0A0]', statusTextColor: 'text-[#A0A0A0]', isActive: false },
    { year: '2029', title: 'Pan-India Coverage', body: 'Scaling operations across 15 states, empowering over 500,000 farmers nationwide.', status: 'PLANNED', statusColor: 'bg-white/10 text-[#A0A0A0]', statusTextColor: 'text-[#A0A0A0]', isActive: false },
    { year: '2030', title: 'National Infrastructure Layer', body: 'Complete integration with government APIs and policy frameworks as the standard for biomass tracking.', status: 'VISION', statusColor: 'bg-[#2F80ED]/20 text-[#2F80ED]', statusTextColor: 'text-[#2F80ED]', isActive: false },
  ];

  return (
    <PageTransition className="w-full bg-[#0D0D0D] overflow-x-hidden pt-16">
      
      {/* SECTION 1 — MARKET OPPORTUNITY */}
      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-8 py-32 text-center">
        <div className="text-[#A0A0A0] text-[11px] tracking-widest uppercase font-semibold mb-6">THE OPPORTUNITY</div>
        <h1 className="font-heading font-extrabold text-[72px] md:text-[96px] leading-tight text-[#1DB97A] drop-shadow-[0_0_40px_rgba(29,185,122,0.4)]">
          ₹42,000 Crore
        </h1>
        <p className="text-[#A0A0A0] text-[18px] md:text-[20px] mt-4 font-medium">India's untapped agricultural biomass market</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-left">
          <GlassCard className="p-6">
            <div className="w-12 h-12 rounded-full bg-[#FF8F00]/20 text-[#FF8F00] flex items-center justify-center mb-6">
              <Zap size={24} />
            </div>
            <h3 className="text-white text-[18px] font-bold mb-2">Biopower</h3>
            <p className="text-[#A0A0A0] text-[14px] mb-1">₹18,000 Cr market</p>
            <p className="text-[#FF8F00] text-[14px] font-semibold mb-6">↑ 24% CAGR</p>
            <span className="bg-[#1DB97A]/15 text-[#1DB97A] text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase">HIGH DEMAND</span>
          </GlassCard>
          
          <GlassCard className="p-6">
            <div className="w-12 h-12 rounded-full bg-[#1DB97A]/20 text-[#1DB97A] flex items-center justify-center mb-6">
              <Flame size={24} />
            </div>
            <h3 className="text-white text-[18px] font-bold mb-2">Bio-CNG</h3>
            <p className="text-[#A0A0A0] text-[14px] mb-1">₹9,200 Cr market</p>
            <p className="text-[#1DB97A] text-[14px] font-semibold mb-6">↑ 31% CAGR</p>
            <span className="bg-[#2F80ED]/15 text-[#2F80ED] text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase">GROWING</span>
          </GlassCard>
          
          <GlassCard className="p-6">
            <div className="w-12 h-12 rounded-full bg-[#2F80ED]/20 text-[#2F80ED] flex items-center justify-center mb-6">
              <Layers size={24} />
            </div>
            <h3 className="text-white text-[18px] font-bold mb-2">Pellets & Briquettes</h3>
            <p className="text-[#A0A0A0] text-[14px] mb-1">₹7,800 Cr market</p>
            <p className="text-[#2F80ED] text-[14px] font-semibold mb-6">↑ 19% CAGR</p>
          </GlassCard>
          
          <GlassCard className="p-6">
            <div className="w-12 h-12 rounded-full bg-white/10 text-[#A0A0A0] flex items-center justify-center mb-6">
              <Plane size={24} />
            </div>
            <h3 className="text-white text-[18px] font-bold mb-2">Sustainable Aviation Fuel</h3>
            <p className="text-[#A0A0A0] text-[14px] mb-1">₹6,000 Cr by 2030</p>
            <p className="text-[#A0A0A0] text-[14px] font-semibold mb-6 opacity-0">---</p>
            <span className="bg-[#FF8F00]/15 text-[#FF8F00] text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase">EMERGING</span>
          </GlassCard>
        </div>
      </div>

      {/* SECTION 2 — GOVERNMENT MANDATES */}
      <div className="w-full bg-[#111111] py-24">
        <div className="max-w-[1280px] mx-auto w-full px-4 md:px-8">
          <h2 className="text-white text-[28px] md:text-[32px] font-bold text-center mb-16">Backed by Policy. Powered by Technology.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="p-8">
              <Landmark size={32} className="text-[#1DB97A] mb-6" />
              <div className="text-[#A0A0A0] text-[12px] font-bold tracking-widest mb-2">2023</div>
              <h3 className="text-white text-[18px] font-semibold mb-3">PM-KUSUM Scheme</h3>
              <p className="text-[#A0A0A0] text-[14px] leading-relaxed">Mandates agricultural biomass utilization for rural energy, providing significant financial incentives for collection infrastructure.</p>
            </GlassCard>
            
            <GlassCard className="p-8">
              <Shield size={32} className="text-[#FF3B30] mb-6" />
              <div className="text-[#A0A0A0] text-[12px] font-bold tracking-widest mb-2">2015</div>
              <h3 className="text-white text-[18px] font-semibold mb-3">CPCB Stubble Ban</h3>
              <p className="text-[#A0A0A0] text-[14px] leading-relaxed">Supreme Court-enforced ban on crop residue burning across North India, driving the urgent need for compliant disposal alternatives.</p>
            </GlassCard>
            
            <GlassCard className="p-8">
              <FileText size={32} className="text-[#2F80ED] mb-6" />
              <div className="text-[#A0A0A0] text-[12px] font-bold tracking-widest mb-2">2022</div>
              <h3 className="text-white text-[18px] font-semibold mb-3">NITI Aayog Biomass Policy</h3>
              <p className="text-[#A0A0A0] text-[14px] leading-relaxed">National framework targeting 60 MT biomass mobilization annually to co-fire in thermal power plants to reduce coal dependency.</p>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* SECTION 3 — ROADMAP TIMELINE */}
      <div className="w-full bg-[#0D0D0D] py-32">
        <div className="max-w-[1280px] mx-auto w-full px-4 md:px-8">
          <h2 className="text-white text-[28px] md:text-[32px] font-bold text-center mb-24">Our Expansion Roadmap</h2>
          
          <div className="max-w-3xl mx-auto relative pt-8 pb-8">
            {/* Center Line Background */}
            <div className="absolute left-[23px] md:left-1/2 md:-translate-x-1/2 top-0 h-full w-0.5 bg-white/5" />
            
            {/* Animated Center Line */}
            <motion.div 
              style={{ scaleY }}
              className="absolute left-[23px] md:left-1/2 md:-translate-x-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-[#1DB97A] to-[#0B6E4F]/20 origin-top z-0"
            />
            
            {/* Timeline Items Container for Scroll Ref */}
            <div ref={timelineRef} className="relative z-10 flex flex-col gap-8 md:gap-4">
              {timelineData.map((item, index) => (
                <TimelineItem key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FINAL CTA SECTION */}
      <FinalCTA />

    </PageTransition>
  );
};
