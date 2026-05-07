import React, { useState, useEffect } from 'react';
import { PageTransition, GlassCard } from '../components/layout';
import { motion, AnimatePresence } from 'framer-motion';
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { CheckCircle, Satellite as SatIcon, Activity, MapPin } from 'lucide-react';
import { GhostButton, AlertButton, PrimaryButton } from '../components/ui';

export const SatelliteVerification = () => {
  const [step, setStep] = useState(1);
  const [conf, setConf] = useState(0);
  const [telemetry, setTelemetry] = useState([]);

  // Generate random ISRO-style telemetry data
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => {
        const newLine = `[${new Date().toISOString().substring(11, 23)}] SYS_OK: ${Math.random().toString(36).substring(2, 8).toUpperCase()} | ALT: 786KM | BAND: B04,B08 | ERR: 0.0${Math.floor(Math.random() * 10)}`;
        const updated = [...prev, newLine];
        if (updated.length > 8) updated.shift();
        return updated;
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (step < 6) {
      const timer = setTimeout(() => setStep(step + 1), 2500); // Slower for effect
      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    if (step === 5) {
      let c = 0;
      const interval = setInterval(() => {
        c += 1.8;
        if (c >= 94.3) {
          setConf(94.3);
          clearInterval(interval);
        } else {
          setConf(c);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <PageTransition className="min-h-[calc(100vh-80px)] bg-[#050505] w-full flex flex-col items-center justify-center py-12 px-6 overflow-hidden relative">
      
      {/* ISRO Themed Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(0, 229, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00E5FF]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1DB97A]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 relative z-10">
        
        {/* LEFT PANEL: SCANNER HUD */}
        <GlassCard className="p-1 flex flex-col overflow-hidden border border-[#00E5FF]/20 shadow-[0_0_50px_rgba(0,229,255,0.05)] bg-[#0A0A0A]/80">
          
          <div className="flex items-center justify-between p-4 border-b border-[#00E5FF]/20 bg-[#00E5FF]/5">
            <div className="flex items-center gap-3">
              <SatIcon size={18} className="text-[#00E5FF]" />
              <span className="text-[#00E5FF] font-mono text-[13px] tracking-[0.2em] font-bold">ISRO-IRS LISS-IV DOWNLINK</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#FF3B30] animate-pulse" />
              <span className="text-white/70 font-mono text-[11px] tracking-wider">LIVE</span>
            </div>
          </div>

          <div className="relative w-full h-[400px] bg-[#050505] overflow-hidden flex items-center justify-center">
            
            {/* Target Crosshairs */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-30">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#00E5FF]" />
              <div className="absolute top-0 left-1/2 w-[1px] h-full bg-[#00E5FF]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-[#00E5FF]" />
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="w-[200px] h-[200px] rounded-full relative overflow-hidden"
                    style={{ background: 'conic-gradient(from 0deg, rgba(0,229,255,0) 0%, rgba(0,229,255,0) 80%, rgba(0,229,255,0.8) 100%)' }}
                  >
                    <div className="absolute inset-[2px] rounded-full bg-[#050505]" />
                  </motion.div>
                  <div className="absolute text-[#00E5FF] font-mono text-[14px] tracking-widest text-center mt-32">
                    ACQUIRING SIGNAL...<br/><span className="text-[10px] text-[#A0A0A0]">SENTINEL-2A BAND 8/4</span>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="w-full h-full relative">
                  {/* Simulate raw monochrome terrain */}
                  <div className="absolute inset-0 bg-[#1A1A1A] opacity-50" style={{ filter: 'noise(100%)' }}>
                    <svg width="100%" height="100%">
                       <pattern id="pattern-noise" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                         <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
                       </pattern>
                       <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-noise)" />
                    </svg>
                  </div>
                  <motion.div
                    initial={{ top: '0%' }}
                    animate={{ top: '100%' }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute left-0 w-full h-[2px] bg-[#00E5FF] shadow-[0_0_15px_#00E5FF] z-20"
                  />
                  <div className="absolute bottom-4 left-4 text-[#00E5FF] font-mono text-[12px]">RAW OPTICAL | 10M/PX | 21.1458°N, 79.0882°E</div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full relative">
                  {/* Simulate false color NDVI rendering */}
                  <div className="absolute inset-0 bg-[#0A1F13]">
                    <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="none">
                       <path d="M50,100 Q100,50 200,150 T350,100 L350,300 L50,300 Z" fill="rgba(29, 185, 122, 0.4)" />
                       <path d="M100,200 Q200,100 300,250 L100,300 Z" fill="rgba(29, 185, 122, 0.6)" />
                    </svg>
                  </div>
                  <motion.div
                    initial={{ left: '0%' }}
                    animate={{ left: '100%' }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                    className="absolute top-0 bottom-0 w-[4px] bg-[#1DB97A] shadow-[0_0_20px_#1DB97A] z-20"
                  />
                  <div className="absolute bottom-4 left-4 text-[#1DB97A] font-mono text-[12px]">NDVI COMPOSITE APPLIED</div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="s4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full relative">
                  <div className="absolute inset-0 bg-[#0A1F13]">
                    <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="none">
                       <path d="M50,100 Q100,50 200,150 T350,100 L350,300 L50,300 Z" fill="rgba(29, 185, 122, 0.3)" />
                    </svg>
                  </div>
                  {/* Burn Risk Hotspots */}
                  <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }} className="absolute top-[30%] left-[40%]">
                    <div className="w-16 h-16 bg-[#FF3B30] rounded-full blur-xl opacity-60 animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-[#FF3B30] rounded-full" />
                    </div>
                  </motion.div>
                  <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5, type: "spring" }} className="absolute bottom-[40%] right-[30%]">
                    <div className="w-20 h-20 bg-[#FF8F00] rounded-full blur-xl opacity-60 animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-[#FF8F00] rounded-full" />
                    </div>
                  </motion.div>
                  <div className="absolute bottom-4 left-4 text-[#FF3B30] font-mono text-[12px] font-bold tracking-widest">THERMAL ANOMALY DETECTED</div>
                </motion.div>
              )}

              {step >= 5 && (
                 <motion.div key="s5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full relative flex items-center justify-center bg-[#050505]">
                    <div className="absolute inset-0 border-[4px] border-[#1DB97A]/20 pointer-events-none" />
                    <div className="flex flex-col items-center">
                       <div className="w-[180px] h-[180px] relative">
                         <RadialBarChart width={180} height={180} cx={90} cy={90} innerRadius={70} outerRadius={90} barSize={6} data={[{ name: 'Conf', value: conf, fill: '#1DB97A' }]} startAngle={90} endAngle={-270}>
                           <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                           <RadialBar background={{ fill: 'rgba(255,255,255,0.05)' }} dataKey="value" cornerRadius={10} />
                           <text x={90} y={90} textAnchor="middle" dominantBaseline="middle" className="fill-[#1DB97A] font-bold text-[32px] font-heading">{conf.toFixed(1)}%</text>
                         </RadialBarChart>
                       </div>
                       <div className="text-[#1DB97A] font-mono text-[14px] mt-4 tracking-widest uppercase font-bold">Verification Success</div>
                    </div>
                 </motion.div>
              )}

            </AnimatePresence>
          </div>
        </GlassCard>

        {/* RIGHT PANEL: TELEMETRY & RESULTS */}
        <div className="flex flex-col gap-4">
          
          <GlassCard className="p-4 border border-white/5 bg-[#0D0D0D] flex-1 flex flex-col">
            <h3 className="font-mono text-[#A0A0A0] text-[11px] uppercase tracking-widest border-b border-white/10 pb-2 mb-3">Live Telemetry</h3>
            <div className="flex-1 font-mono text-[10px] text-[#00E5FF] flex flex-col gap-1 overflow-hidden opacity-80">
               {telemetry.map((line, i) => (
                 <div key={i} className="whitespace-nowrap">{line}</div>
               ))}
               <div className="animate-pulse">_</div>
            </div>
          </GlassCard>

          {step === 6 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-none">
              <GlassCard className="p-5 border border-[#1DB97A]/30 bg-[#1DB97A]/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#1DB97A]/20 blur-2xl rounded-full" />
                <h3 className="font-heading text-white font-bold text-[18px] mb-4 flex items-center gap-2">
                  <CheckCircle size={18} className="text-[#1DB97A]" />
                  Vidarbha Farm ID: V-492
                </h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                  <div className="flex flex-col">
                    <span className="text-[#A0A0A0] font-mono text-[10px] uppercase tracking-wider mb-1">Crop Type</span>
                    <span className="text-white text-[14px] font-bold">Cotton Residue</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#A0A0A0] font-mono text-[10px] uppercase tracking-wider mb-1">Est. Volume</span>
                    <span className="text-white text-[14px] font-bold">8.4 Tonnes</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#A0A0A0] font-mono text-[10px] uppercase tracking-wider mb-1">Burn Risk</span>
                    <span className="text-[#FF3B30] text-[14px] font-bold">Critical</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#A0A0A0] font-mono text-[10px] uppercase tracking-wider mb-1">Coordinates</span>
                    <span className="text-[#00E5FF] text-[12px] font-mono">21.1°N 79.0°E</span>
                  </div>
                </div>
                
                <PrimaryButton className="w-full mt-6 bg-[#1DB97A] hover:bg-[#159461] text-[#050505] font-bold h-[44px]">
                  Authorize Procurement
                </PrimaryButton>
              </GlassCard>
            </motion.div>
          )}

        </div>

      </div>
    </PageTransition>
  );
};
