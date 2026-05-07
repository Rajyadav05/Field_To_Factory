import React from 'react';
import { PageTransition, GlassCard } from '../components/layout';
import { PrimaryButton } from '../components/ui';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Satellite, Sprout, Factory, Activity } from 'lucide-react';

export const Platform = () => {
  const navigate = useNavigate();

  return (
    <PageTransition className="w-full min-h-screen bg-[#050505] relative overflow-hidden flex items-center justify-center pt-20 pb-12 px-6">
      
      {/* BACKGROUND: Stylized Maharashtra Map & Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(0, 229, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] flex items-center justify-center opacity-30">
          <svg viewBox="0 0 500 400" className="w-full h-full max-w-[150vw]">
            <defs>
              <filter id="hubGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* Abstract Maharashtra Polygon */}
            <motion.polygon 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ duration: 3, ease: "easeInOut" }}
              points="100,50 180,40 280,80 420,120 440,180 390,260 300,280 200,340 120,300 80,220 50,140" 
              fill="rgba(0, 229, 255, 0.02)" 
              stroke="#00E5FF" 
              strokeWidth="1.5"
            />
            {/* Glowing Hub Nodes */}
            <g filter="url(#hubGlow)">
              <circle cx="150" cy="120" r="4" fill="#1DB97A" /> {/* Nashik */}
              <circle cx="160" cy="200" r="5" fill="#2F80ED" /> {/* Pune */}
              <circle cx="360" cy="140" r="6" fill="#FF8F00" /> {/* Nagpur */}
              <circle cx="280" cy="220" r="4" fill="#00E5FF" /> {/* Nanded */}
            </g>
            {/* Connection Lines */}
            <motion.path d="M150,120 L160,200 L280,220 L360,140" fill="none" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto flex flex-col h-full justify-center">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 backdrop-blur-md mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="text-[#00E5FF] text-[11px] tracking-[0.2em] uppercase font-bold">Maharashtra Intelligence Grid</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading font-extrabold text-[48px] md:text-[72px] text-white tracking-tighter mb-4 leading-none"
          >
            Command Subsystems
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[#A0A0A0] text-lg max-w-2xl mx-auto"
          >
            Access specialized portals for agricultural supply, industrial procurement, and satellite verification.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {[
            { id: 'farmer', title: 'Agri-Node', icon: Sprout, color: '#1DB97A', path: '/farmer', desc: 'Farmer intelligence and residue listing portal.' },
            { id: 'industry', title: 'Procurement', icon: Factory, color: '#2F80ED', path: '/industry', desc: 'Real-time logistics and biomass procurement command.' },
            { id: 'satellite', title: 'Sentinel-2', icon: Satellite, color: '#FF8F00', path: '/satellite', desc: 'High-res satellite mapping for burn-risk and yield.' },
            { id: 'impact', title: 'Analytics', icon: Activity, color: '#00E5FF', path: '/impact', desc: 'State-wide carbon impact and market analytics.' }
          ].map((portal, idx) => {
            const Icon = portal.icon;
            return (
              <motion.div
                key={portal.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + (idx * 0.1) }}
              >
                <GlassCard 
                  className="h-full p-8 flex flex-col relative group overflow-hidden border-white/5 hover:border-white/20 transition-all duration-500 cursor-pointer"
                  glowColor={portal.color}
                  onClick={() => navigate(portal.path)}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundColor: portal.color }} />
                  
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10" style={{ backgroundColor: `${portal.color}15`, border: `1px solid ${portal.color}40` }}>
                    <Icon size={28} style={{ color: portal.color }} />
                  </div>
                  
                  <h3 className="font-heading font-bold text-[24px] text-white mb-3 z-10 tracking-tight">{portal.title}</h3>
                  <p className="text-[#A0A0A0] text-[14px] leading-relaxed mb-8 flex-grow z-10">{portal.desc}</p>
                  
                  <div className="z-10 mt-auto flex items-center gap-2 text-[13px] font-bold tracking-wider uppercase transition-transform group-hover:translate-x-2" style={{ color: portal.color }}>
                    Initialize <span className="text-white/50">→</span>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}

        </div>
      </div>
    </PageTransition>
  );
};
