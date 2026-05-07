import React, { useState, useEffect } from 'react';
import { PageTransition, GlassCard } from '../components/layout';
import { motion, AnimatePresence } from 'framer-motion';
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { CheckCircle } from 'lucide-react';
import { GhostButton, AlertButton } from '../components/ui';

export const SatelliteVerification = () => {
  const [step, setStep] = useState(1);
  const [conf, setConf] = useState(0);

  useEffect(() => {
    if (step < 6) {
      const timer = setTimeout(() => setStep(step + 1), 1500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    if (step === 5) {
      let c = 0;
      const interval = setInterval(() => {
        c += 2.3;
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
    <PageTransition className="min-h-screen bg-[#0D0D0D] w-full flex flex-col pt-16 pb-24 px-4 overflow-x-hidden">
      <div className="w-full max-w-[560px] mx-auto">
        
        {/* STEP INDICATOR */}
        <div className="flex gap-2 justify-center mb-12">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <motion.div
              key={idx}
              initial={false}
              animate={{
                width: step === idx ? 32 : 8,
                backgroundColor: step === idx 
                  ? '#1DB97A' 
                  : step > idx 
                    ? 'rgba(29,185,122,0.5)' 
                    : 'rgba(255,255,255,0.2)'
              }}
              className="h-2 rounded-full"
            />
          ))}
        </div>

        {/* STEP STAGE */}
        <div className="min-h-[320px] flex flex-col items-center justify-center relative w-full">
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="w-[200px] h-[200px] rounded-full relative overflow-hidden shadow-[0_0_40px_rgba(47,128,237,0.2)]"
                  style={{ background: 'conic-gradient(from 0deg, rgba(47,128,237,0.05) 0%, rgba(47,128,237,0) 70%, rgba(47,128,237,0.8) 100%)' }}
                >
                  <div className="w-full h-full rounded-full border-2 border-[#2F80ED]/30 absolute inset-0" />
                  <div className="w-[2px] h-[100px] bg-[#2F80ED] absolute left-[99px] top-0 shadow-[0_0_10px_#2F80ED]" />
                </motion.div>
                <div className="text-[#A0A0A0] text-[14px]">Establishing connection to Sentinel-2...</div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6">
                <div className="w-[320px] aspect-video rounded-lg bg-[#0a1a0a] border border-white/10 overflow-hidden relative shadow-[0_0_20px_rgba(47,128,237,0.1)]">
                  <motion.div
                    initial={{ y: '-100%' }}
                    animate={{ y: '100%' }}
                    transition={{ repeat: 3, duration: 0.5, ease: "linear" }}
                    className="w-full h-1 bg-gradient-to-r from-transparent via-[rgba(47,128,237,0.8)] to-transparent absolute shadow-[0_0_8px_rgba(47,128,237,0.8)] z-20"
                  />
                  <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 z-10">
                    {[...Array(12)].map((_, i) => <div key={i} className="border-[0.5px] border-[#2F80ED]/10" />)}
                  </div>
                </div>
                <div className="text-[#2F80ED] font-mono text-[14px] tracking-widest">Lat 30.7°N • Long 76.4°E</div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6">
                <div className="w-[320px] aspect-video rounded-lg bg-[#0a1a0a] border border-white/10 overflow-hidden relative">
                  <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 z-10">
                    {[...Array(12)].map((_, i) => <div key={i} className="border-[0.5px] border-[#2F80ED]/10" />)}
                  </div>
                  <motion.div
                    initial={{ height: '0%' }}
                    animate={{ height: '100%' }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute top-0 left-0 w-full bg-[rgba(29,185,122,0.3)] z-20 border-b border-[#1DB97A]"
                  />
                </div>
                <div className="text-[#A0A0A0] text-[14px]">NDVI false-color overlay applied</div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6">
                <div className="w-[320px] aspect-video rounded-lg bg-[#0a1a0a] border border-white/10 overflow-hidden relative">
                  <div className="absolute inset-0 bg-[rgba(29,185,122,0.3)] z-10" />
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.7, scale: 1 }} transition={{ duration: 0.8 }} className="absolute top-[20%] left-[30%] w-16 h-12 bg-[#FF8F00] blur-xl rounded-full z-20" />
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.7, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="absolute bottom-[30%] right-[20%] w-20 h-14 bg-[#FF8F00] blur-xl rounded-full z-20" />
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.6, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="absolute top-[50%] left-[50%] w-12 h-12 bg-[#FF8F00] blur-xl rounded-full z-20" />
                </div>
                <div className="text-[#FF8F00] text-[14px] font-semibold">Residue coverage: 68% of field area</div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="s5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6">
                <div className="relative w-[160px] h-[160px]">
                  <RadialBarChart width={160} height={160} cx={80} cy={80} innerRadius={60} outerRadius={80} barSize={10} data={[{ name: 'Conf', value: conf, fill: '#1DB97A' }]} startAngle={90} endAngle={-270}>
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar background={{ fill: '#1a1a1a' }} dataKey="value" cornerRadius={10} />
                    <text x={80} y={80} textAnchor="middle" dominantBaseline="middle" className="fill-[#1DB97A] font-bold text-[28px] font-heading">{conf.toFixed(1)}%</text>
                  </RadialBarChart>
                </div>
                <div className="text-[#A0A0A0] text-[14px]">Generating AI Confidence Score...</div>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div key="s6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-6">
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }} 
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="relative flex flex-col items-center justify-center gap-4"
                >
                  <div className="absolute inset-0 bg-[#1DB97A] blur-[60px] opacity-20 rounded-full animate-pulse" />
                  <div className="w-20 h-20 bg-[#1DB97A]/20 rounded-full flex items-center justify-center border border-[#1DB97A]/40 text-[#1DB97A] z-10">
                    <CheckCircle size={40} />
                  </div>
                  <div className="text-white text-[24px] font-bold z-10">Verification Complete ✓</div>
                </motion.div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* VERIFIED RESULTS CARD */}
        {step === 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full mt-8"
          >
            <GlassCard className="p-6">
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div className="flex flex-col">
                  <span className="text-[#A0A0A0] text-[11px] uppercase tracking-wider font-semibold mb-1">NDVI</span>
                  <span className="text-white text-[24px] font-bold font-heading leading-none">0.68</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#A0A0A0] text-[11px] uppercase tracking-wider font-semibold mb-1">NDTI</span>
                  <span className="text-white text-[24px] font-bold font-heading leading-none">0.42</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#A0A0A0] text-[11px] uppercase tracking-wider font-semibold mb-1">Residue</span>
                  <span className="text-white text-[24px] font-bold font-heading leading-none">4.2 T/ha</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#A0A0A0] text-[11px] uppercase tracking-wider font-semibold mb-1">Confidence</span>
                  <span className="text-[#1DB97A] text-[24px] font-bold font-heading leading-none">94.3%</span>
                </div>
              </div>
              <div className="mt-6 text-[#A0A0A0] text-[12px] pt-4 border-t border-white/5 flex items-center justify-center text-center">
                Farm ID: RJ-2847 • 30.7°N 75.8°E • Verified: May 7, 2026 14:32 IST
              </div>
            </GlassCard>

            <div className="mt-6 flex gap-4">
              <GhostButton className="flex-1 border-white/10 text-[#A0A0A0] hover:text-white justify-center h-12">← Back to Listings</GhostButton>
              <AlertButton className="flex-1 justify-center h-12 flex items-center">Reserve This Supply</AlertButton>
            </div>
          </motion.div>
        )}

      </div>
    </PageTransition>
  );
};
