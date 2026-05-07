import React, { useRef } from 'react';
import { PageTransition, GlassCard } from '../components/layout';
import { FinalCTA } from '../components/sections';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Zap, Flame, Layers, Plane, Landmark, Shield, FileText, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TimelineItem = ({ item, index }) => {
  const { t } = useTranslation();
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
        style={{ backgroundColor: item.isActive ? '#1DB97A' : '#0D0D0D', boxShadow: item.isActive ? '0 0 15px rgba(29,185,122,0.6)' : 'none' }} 
      />
      
      {/* Content Card */}
      <motion.div 
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full pl-12 md:pl-0 md:w-[45%]"
      >
        <GlassCard className={`p-6 border ${item.isActive ? 'border-[#1DB97A]/30' : 'border-white/5'}`}>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-full ${item.statusColor}`}>
              {item.year}
            </span>
            <span className="text-white font-semibold text-[16px]">{t(`roadmap.${item.titleKey}`, item.title)}</span>
          </div>
          <p className="text-[#A0A0A0] text-[14px] mb-4">{item.body}</p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#A0A0A0]">Status:</span>
            <span className={`text-[11px] uppercase tracking-wider font-bold ${item.statusTextColor}`}>{t(`roadmap.status_${item.status.toLowerCase()}`, item.status)}</span>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export const Roadmap = () => {
  const { t } = useTranslation();
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const timelineData = [
    { year: '2026 Q1', titleKey: 'phase1', title: 'Phase 1: Vidarbha Hub', body: 'Nagpur & Wardha — End-to-end residue listing, verification, and procurement for cotton residue.', status: 'ACTIVE', statusColor: 'bg-[#1DB97A]/20 text-[#1DB97A]', statusTextColor: 'text-[#1DB97A]', isActive: true },
    { year: '2026 Q4', titleKey: 'phase2', title: 'Phase 2: Western MH Integration', body: 'Pune, Satara & Kolhapur — Sugarcane trash pipeline directly to bio-CNG refineries.', status: 'PENDING', statusColor: 'bg-[#FF8F00]/20 text-[#FF8F00]', statusTextColor: 'text-[#FF8F00]', isActive: false },
    { year: '2027', titleKey: 'phase3', title: 'Phase 3: Marathwada Network', body: 'Expanding access with full conversational agents in Marathi and complete drought-belt coverage.', status: 'FUTURE', statusColor: 'bg-white/10 text-[#A0A0A0]', statusTextColor: 'text-[#A0A0A0]', isActive: false },
    { year: '2028', titleKey: 'phase4', title: 'Phase 4: Global Protocol', body: 'Connecting verified agricultural biomass pipelines directly to Sustainable Aviation Fuel refineries.', status: 'FUTURE', statusColor: 'bg-white/10 text-[#A0A0A0]', statusTextColor: 'text-[#A0A0A0]', isActive: false },
  ];

  return (
    <PageTransition className="w-full bg-[#0D0D0D] overflow-x-hidden pt-16">
      
      {/* SECTION 1 — MARKET OPPORTUNITY */}
      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-8 py-32 text-center">
        <div className="text-[#A0A0A0] text-[11px] tracking-widest uppercase font-semibold mb-6">THE MAHARASHTRA OPPORTUNITY</div>
        <h1 className="font-heading font-extrabold text-[72px] md:text-[96px] leading-tight text-[#1DB97A] drop-shadow-[0_0_40px_rgba(29,185,122,0.4)]">
          ₹12,000 Crore
        </h1>
        <p className="text-[#A0A0A0] text-[18px] md:text-[20px] mt-4 font-medium">State's untapped agricultural biomass market</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-left">
          <GlassCard className="p-6 border border-[#FF8F00]/20">
            <div className="w-12 h-12 rounded-full bg-[#FF8F00]/20 text-[#FF8F00] flex items-center justify-center mb-6">
              <Zap size={24} />
            </div>
            <h3 className="text-white text-[18px] font-bold mb-2">Biopower</h3>
            <p className="text-[#A0A0A0] text-[14px] mb-1">₹4,000 Cr market</p>
            <p className="text-[#FF8F00] text-[14px] font-semibold mb-6">↑ 24% CAGR</p>
            <span className="bg-[#1DB97A]/15 text-[#1DB97A] text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase">HIGH DEMAND</span>
          </GlassCard>
          
          <GlassCard className="p-6 border border-[#1DB97A]/20">
            <div className="w-12 h-12 rounded-full bg-[#1DB97A]/20 text-[#1DB97A] flex items-center justify-center mb-6">
              <Flame size={24} />
            </div>
            <h3 className="text-white text-[18px] font-bold mb-2">Bio-CNG</h3>
            <p className="text-[#A0A0A0] text-[14px] mb-1">₹3,200 Cr market</p>
            <p className="text-[#1DB97A] text-[14px] font-semibold mb-6">↑ 31% CAGR</p>
            <span className="bg-[#2F80ED]/15 text-[#2F80ED] text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase">GROWING</span>
          </GlassCard>
          
          <GlassCard className="p-6">
            <div className="w-12 h-12 rounded-full bg-[#2F80ED]/20 text-[#2F80ED] flex items-center justify-center mb-6">
              <Layers size={24} />
            </div>
            <h3 className="text-white text-[18px] font-bold mb-2">Pellets & Briquettes</h3>
            <p className="text-[#A0A0A0] text-[14px] mb-1">₹2,800 Cr market</p>
            <p className="text-[#2F80ED] text-[14px] font-semibold mb-6">↑ 19% CAGR</p>
          </GlassCard>
          
          <GlassCard className="p-6">
            <div className="w-12 h-12 rounded-full bg-white/10 text-[#A0A0A0] flex items-center justify-center mb-6">
              <Plane size={24} />
            </div>
            <h3 className="text-white text-[18px] font-bold mb-2">Sustainable Aviation</h3>
            <p className="text-[#A0A0A0] text-[14px] mb-1">₹2,000 Cr by 2030</p>
            <p className="text-[#A0A0A0] text-[14px] font-semibold mb-6 opacity-0">---</p>
            <span className="bg-[#FF8F00]/15 text-[#FF8F00] text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase">EMERGING</span>
          </GlassCard>
        </div>
      </div>

      {/* SECTION 3 — ROADMAP TIMELINE */}
      <div className="w-full bg-[#050505] py-32 relative">
         <div className="absolute inset-0 bg-[#00E5FF]/5 blur-[150px] pointer-events-none" />
        <div className="max-w-[1280px] mx-auto w-full px-4 md:px-8 relative z-10">
          <h2 className="text-white text-[28px] md:text-[32px] font-bold text-center mb-2">{t('roadmap.title', 'Expansion Protocol')}</h2>
          <p className="text-center text-[#A0A0A0] mb-24">{t('roadmap.subtitle', 'Phased deployment timeline across the agricultural belt.')}</p>
          
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
