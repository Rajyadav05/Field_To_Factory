import React, { useState, useEffect } from 'react';
import { PageTransition } from '../components/layout';
import { motion, AnimatePresence } from 'framer-motion';
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { Bell, CloudSun, Wheat, Droplets, Wind, Flame, Leaf, MapPin, IndianRupee, Camera, Check, X, Mic, Factory } from 'lucide-react';
import { AlertButton, PrimaryButton, SecondaryButton, GhostButton } from '../components/ui';

const ResidueListingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [crop, setCrop] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [estimating, setEstimating] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setCrop('');
      setIsSuccess(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (step === 4) {
      setEstimating(true);
      const timer = setTimeout(() => setEstimating(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleNext = () => setStep(s => Math.min(s + 1, 6));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));
  const handleSubmit = () => {
    setIsSuccess(true);
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  const crops = [
    { id: 'rice', name: 'Rice', icon: '🌾' },
    { id: 'wheat', name: 'Wheat', icon: '🌾' },
    { id: 'sugarcane', name: 'Sugarcane', icon: '🎋' },
    { id: 'cotton', name: 'Cotton', icon: '☁️' },
    { id: 'maize', name: 'Maize', icon: '🌽' },
    { id: 'other', name: 'Other', icon: '🌱' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-50 flex justify-center md:items-center bg-[#0F1A14] md:bg-black/80 backdrop-blur-md"
        >
          {isSuccess ? (
             <div className="w-full h-full md:max-w-[480px] md:h-[80vh] md:rounded-2xl bg-[#0F1A14] flex flex-col items-center justify-center px-6 text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 200 }}
                  className="w-24 h-24 rounded-full bg-[#1DB97A]/20 border-2 border-[#1DB97A] flex items-center justify-center mb-6 relative"
                >
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border border-[#1DB97A]"
                  />
                  <Check size={48} className="text-[#1DB97A]" />
                </motion.div>
                <h2 className="font-heading font-bold text-[28px] text-white mb-2">Listing Submitted!</h2>
                <p className="text-[#A0A0A0] text-[16px]">Industries have been alerted in your radius.</p>
             </div>
          ) : (
            <div className="w-full h-full md:max-w-[480px] md:h-[80vh] md:rounded-2xl bg-[#0F1A14] flex flex-col shadow-2xl border border-white/5 relative">
              {/* Header: Step Indicator & Close */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div 
                      key={i} 
                      className={`h-1.5 w-8 rounded-full transition-colors duration-300 ${
                        i === step ? 'bg-[#1DB97A]' : i < step ? 'bg-[#1DB97A]/50' : 'bg-white/20'
                      }`} 
                    />
                  ))}
                </div>
                <button onClick={onClose} className="p-2 -mr-2 text-[#A0A0A0] hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* Step Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col">
                
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h3 className="font-heading font-bold text-[24px] text-white text-center mb-8">What did you harvest?</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {crops.map(c => {
                        const isSelected = crop === c.id;
                        return (
                          <div 
                            key={c.id}
                            onClick={() => setCrop(c.id)}
                            className={`cursor-pointer rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                              isSelected 
                                ? 'bg-[#1DB97A]/[0.12] border-2 border-[#1DB97A]' 
                                : 'bg-white/[0.04] border-2 border-white/5 hover:border-white/20'
                            }`}
                          >
                            <span className="text-[28px]">{c.icon}</span>
                            <span className={`text-[12px] font-semibold ${isSelected ? 'text-[#1DB97A]' : 'text-white'}`}>{c.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full">
                    <h3 className="font-heading font-bold text-[24px] text-white text-center mb-8">Photo of your field</h3>
                    <div className="w-full h-48 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center gap-3 bg-white/[0.02] mb-6">
                      <Camera size={48} className="text-[#A0A0A0]" />
                      <span className="text-[#A0A0A0] text-[14px]">Tap to take photo or upload</span>
                    </div>
                    <SecondaryButton className="w-full border-white/10 text-white hover:bg-white/5">
                      Upload from gallery
                    </SecondaryButton>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full items-center text-center">
                    <h3 className="font-heading font-bold text-[24px] text-white mb-10">Your field location</h3>
                    <div className="relative mb-6">
                      <motion.div
                        animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        className="absolute inset-0 bg-[#1DB97A]/30 rounded-full blur-md"
                      />
                      <MapPin size={48} className="text-[#1DB97A] relative z-10" />
                    </div>
                    <div className="bg-[#111111] border border-white/10 rounded-xl p-4 w-full mb-6">
                      <p className="text-white text-[16px] font-semibold mb-1">Ludhiana, Punjab</p>
                      <p className="text-[#A0A0A0] text-[13px] font-mono">30.9010°N, 75.8573°E</p>
                    </div>
                    <div className="w-full h-32 rounded-lg bg-[#1a2a1a] border border-[#1DB97A]/20 relative overflow-hidden">
                      {/* Fake Map Grid Pattern */}
                      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#1DB97A 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#1DB97A] rounded-full shadow-[0_0_12px_#1DB97A]" />
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full items-center justify-center text-center">
                    <h3 className="font-heading font-bold text-[24px] text-white mb-10">Estimating your residue...</h3>
                    
                    {estimating ? (
                      <div className="w-full max-w-[240px] h-1.5 bg-[#111111] rounded-full overflow-hidden relative">
                        <motion.div 
                          className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#1DB97A] to-transparent"
                          initial={{ left: "-50%" }}
                          animate={{ left: "100%" }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                    ) : (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
                        <h3 className="font-heading font-bold text-[36px] text-[#1DB97A] leading-none mb-4">4.2 Tonnes</h3>
                        <div className="bg-[#1DB97A]/10 border border-[#1DB97A]/30 text-[#1DB97A] text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          AI Confidence: 91%
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full text-center">
                    <h3 className="font-heading font-bold text-[24px] text-white mb-8">Recommended price</h3>
                    <div className="bg-[#1DB97A]/[0.08] border border-[#1DB97A]/20 rounded-2xl p-8 mb-8">
                      <div className="font-heading font-bold text-[40px] text-[#1DB97A] leading-none mb-1">
                        ₹3,400 – ₹3,800
                      </div>
                      <div className="text-[#A0A0A0] text-[18px]">/tonne</div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-full max-w-[280px] h-2 bg-[#111111] rounded-full relative">
                        <div className="absolute left-[30%] right-[20%] h-full bg-[#1DB97A] rounded-full" />
                        <div className="absolute left-[40%] top-4 w-0.5 h-3 bg-white/20" />
                      </div>
                      <div className="text-[#A0A0A0] text-[13px] mt-2">Market avg <span className="text-white font-semibold">₹3,200</span></div>
                    </div>
                  </motion.div>
                )}

                {step === 6 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full">
                    <h3 className="font-heading font-bold text-[24px] text-white text-center mb-6">Confirm Listing</h3>
                    <div className="bg-[#111111] border border-white/5 rounded-xl p-5 flex flex-col gap-4 mb-auto">
                      <div className="flex justify-between items-center pb-4 border-b border-white/5">
                        <span className="text-[#A0A0A0] text-[14px]">Crop Type</span>
                        <span className="text-white font-semibold capitalize flex items-center gap-2">
                          {crop || 'Wheat'} <Wheat size={16} className="text-[#1DB97A]"/>
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-white/5">
                        <span className="text-[#A0A0A0] text-[14px]">Estimated Qty</span>
                        <span className="text-white font-semibold">4.2 Tonnes</span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-white/5">
                        <span className="text-[#A0A0A0] text-[14px]">Listing Price</span>
                        <span className="text-[#1DB97A] font-bold">₹3,400 / tonne</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#A0A0A0] text-[14px]">Location</span>
                        <span className="text-white font-semibold text-right">Ludhiana, PB</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Footer: Navigation */}
              <div className="p-6 border-t border-white/5 flex gap-4">
                {step > 1 && (
                  <GhostButton onClick={handleBack} className="flex-1 h-[52px]">
                    Back
                  </GhostButton>
                )}
                {step < 6 ? (
                  <PrimaryButton 
                    onClick={handleNext} 
                    className="flex-[2] h-[52px]"
                    disabled={step === 1 && !crop || step === 4 && estimating}
                  >
                    Next
                  </PrimaryButton>
                ) : (
                  <PrimaryButton onClick={handleSubmit} className="flex-[2] h-[52px]">
                    Submit Listing
                  </PrimaryButton>
                )}
              </div>

            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const FarmerApp = () => {
  const [lang, setLang] = useState('EN');
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);

  return (
    <PageTransition className="w-full min-h-[calc(100vh-72px)] bg-[#0F1A14] flex flex-col">
      <ResidueListingModal isOpen={isListingModalOpen} onClose={() => setIsListingModalOpen(false)} />

      <div className="w-full max-w-[480px] mx-auto px-4 py-6 md:border md:border-[#1DB97A]/20 md:rounded-2xl md:mt-8 md:mb-8 bg-[#0F1A14] flex-grow shadow-[0_0_40px_rgba(29,185,122,0.03)]">
        
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#1DB97A]/20 border border-[#1DB97A]/40 flex items-center justify-center text-[#1DB97A] font-bold text-lg">
              HS
            </div>
            <div>
              <div className="font-sans font-semibold text-[18px] text-white leading-tight">
                Namaste, Harinder Singh <span className="inline-block">👋</span>
              </div>
              <div className="font-sans text-[12px] text-[#A0A0A0] mt-0.5">
                Ludhiana, Punjab
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-[#111111] rounded-lg border border-white/5 p-1 h-[44px] items-center">
              {['EN', 'PN', 'HI'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`text-[12px] font-bold px-2 py-1 h-full rounded transition-colors flex items-center justify-center ${
                    lang === l ? 'bg-[#1DB97A] text-[#0D0D0D]' : 'text-[#A0A0A0] hover:text-white'
                  }`}
                  style={{ minWidth: '40px' }}
                >
                  {l}
                </button>
              ))}
            </div>
            <button className="relative w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
              <Bell size={20} />
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#FF8F00] rounded-full border-2 border-[#0F1A14]" />
            </button>
          </div>
        </div>

        {/* WEATHER + CROP ROW */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#2F80ED]/[0.06] border border-[#2F80ED]/20 backdrop-blur-md rounded-xl p-4 flex flex-col justify-between h-[110px]">
            <div className="flex justify-between items-start">
              <CloudSun size={24} className="text-[#2F80ED]" />
              <div className="text-right">
                <div className="font-bold text-[24px] text-white leading-none">28°C</div>
                <div className="text-[#A0A0A0] text-[12px] mt-1">Ludhiana</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#A0A0A0] font-medium">
              <span className="flex items-center gap-1.5"><Droplets size={12} className="text-[#2F80ED]"/> 62%</span>
              <span className="flex items-center gap-1.5"><Wind size={12} className="text-[#A0A0A0]"/> 14 km/h</span>
            </div>
          </div>
          <div className="bg-[#1DB97A]/[0.06] border border-[#1DB97A]/20 backdrop-blur-md rounded-xl p-4 flex flex-col justify-between h-[110px]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Wheat size={18} className="text-[#FF8F00]" />
                <span className="font-semibold text-[15px] text-white leading-none">Wheat Season</span>
              </div>
              <div className="text-[#A0A0A0] text-[12px]">18 days to harvest</div>
            </div>
            <div className="mt-2">
              <div className="w-full h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div className="h-full bg-[#1DB97A] rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* ACTION GRID */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <motion.div 
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsListingModalOpen(true)}
            className="cursor-pointer bg-[#1DB97A]/[0.08] border border-white/5 hover:border-[#1DB97A]/40 transition-colors backdrop-blur-md rounded-xl p-5 flex flex-col items-center justify-center gap-3 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
          >
            <Leaf size={40} className="text-[#1DB97A]" />
            <span className="text-white text-[14px] font-semibold">Sell Residue</span>
          </motion.div>
          <motion.div 
            whileTap={{ scale: 0.96 }}
            className="cursor-pointer bg-[#FF8F00]/[0.08] border border-white/5 hover:border-[#FF8F00]/40 transition-colors backdrop-blur-md rounded-xl p-5 flex flex-col items-center justify-center gap-3 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
          >
            <Flame size={40} className="text-[#FF8F00]" />
            <span className="text-white text-[14px] font-semibold">Risk Alert</span>
          </motion.div>
          <motion.div 
            whileTap={{ scale: 0.96 }}
            className="cursor-pointer bg-[#2F80ED]/[0.08] border border-white/5 hover:border-[#2F80ED]/40 transition-colors backdrop-blur-md rounded-xl p-5 flex flex-col items-center justify-center gap-3 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
          >
            <MapPin size={40} className="text-[#2F80ED]" />
            <span className="text-white text-[14px] font-semibold">Nearby Buyers</span>
          </motion.div>
          <motion.div 
            whileTap={{ scale: 0.96 }}
            className="cursor-pointer bg-[#FFD700]/[0.08] border border-white/5 hover:border-[#FFD700]/40 transition-colors backdrop-blur-md rounded-xl p-5 flex flex-col items-center justify-center gap-3 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
          >
            <IndianRupee size={40} className="text-[#FFD700]" />
            <span className="text-white text-[14px] font-semibold">My Earnings</span>
          </motion.div>
        </div>

        {/* BURN RISK ALERT CARD */}
        <div className="mb-4 bg-[#FF8F00]/[0.08] border-2 border-[#FF8F00] rounded-xl p-5 shadow-[0_0_20px_rgba(255,143,0,0.2)]">
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Flame size={16} className="text-[#FF8F00]" />
            </motion.div>
            <div className="text-[#FF8F00] text-[11px] uppercase tracking-widest font-bold">
              HIGH BURN RISK
            </div>
          </div>
          <h3 className="text-white text-[16px] font-semibold">
            Burn risk detected in your zone
          </h3>
          <p className="text-[#A0A0A0] text-[14px] mt-1 mb-5 leading-snug">
            Punjab Zone 3 — Next 72 hours. Sell now and earn ₹8,200.
          </p>
          <AlertButton className="w-full h-[52px] text-[15px] flex justify-center items-center gap-2">
            <span>🔥</span> Sell Residue Now — Earn ₹8,200
          </AlertButton>
        </div>

        {/* FARMER ANALYTICS SECTION */}
        <div className="mt-6">
          <h2 className="font-sans font-semibold text-[18px] text-white mb-4">Your Impact</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: 'Total Earned', value: '₹24,600', color: '#FFD700' },
              { title: 'Residue Sold', value: '7.2 Tonnes', color: '#FFFFFF' },
              { title: 'Carbon Saved', value: '4,100 kg', color: '#2F80ED' },
              { isChart: true, title: 'Impact Score' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                className="bg-white/[0.04] border border-white/5 backdrop-blur-md rounded-xl p-5 flex flex-col justify-center shadow-[0_4px_24px_rgba(0,0,0,0.2)] min-h-[140px]"
              >
                {stat.isChart ? (
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-[80px] h-[80px] relative">
                      <RadialBarChart width={80} height={80} cx={40} cy={40} innerRadius={30} outerRadius={40} barSize={6} data={[{ name: 'Score', value: 87, fill: '#FF8F00' }]} startAngle={90} endAngle={-270}>
                        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                        <RadialBar background={{ fill: '#1a1a1a' }} dataKey="value" cornerRadius={10} />
                        <text x={40} y={40} textAnchor="middle" dominantBaseline="middle" className="fill-white font-bold text-[18px]">87</text>
                      </RadialBarChart>
                    </div>
                    <div className="text-[#A0A0A0] text-[12px] uppercase tracking-wider font-semibold mt-2">{stat.title}</div>
                  </div>
                ) : (
                  <>
                    <div className="font-heading font-bold text-[28px] leading-none mb-1" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-[#A0A0A0] text-[12px] uppercase tracking-wider font-semibold">{stat.title}</div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* NEARBY BUYERS SECTION */}
        <div className="mt-8 pb-8">
          <h2 className="font-sans font-semibold text-[18px] text-white mb-4">Nearby Buyers</h2>
          <div className="flex flex-col gap-3">
            {[
              { name: 'GreenPower Biogas Plant', distance: 'Ludhiana • 12 km', price: '₹3,600/T', crop: 'Rice Straw' },
              { name: 'BioFuel Corp', distance: 'Khanna • 18 km', price: '₹3,450/T', crop: 'Wheat Straw' },
              { name: 'EcoEnergy Papers', distance: 'Jalandhar • 24 km', price: '₹3,800/T', crop: 'Rice Straw' }
            ].map((buyer, i) => (
              <div key={i} className="bg-white/[0.04] border border-white/5 backdrop-blur-md rounded-xl p-4 flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.2)] gap-2">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#2F80ED]/20 text-[#2F80ED] flex items-center justify-center border border-[#2F80ED]/30">
                    <Factory size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-white text-[14px] font-bold truncate">{buyer.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[#A0A0A0] text-[11px] truncate">{buyer.distance}</span>
                      <span className="bg-[#FF8F00]/20 text-[#FF8F00] text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">{buyer.crop}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[#1DB97A] font-semibold text-[14px]">{buyer.price}</span>
                  <GhostButton className="h-7 text-[11px] px-3 py-0 border-white/10 hover:border-white/30 text-[#A0A0A0]">Contact</GhostButton>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* VOICE AI FLOATING BUTTON */}
      <div className="fixed bottom-6 right-6 md:right-auto md:left-1/2 md:translate-x-[180px] z-50 flex items-center group">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-4 px-4 py-2 bg-[#111111]/80 backdrop-blur-md text-white text-[13px] font-semibold rounded-full border border-white/10 shadow-lg pointer-events-none whitespace-nowrap">
          Voice Assistant
        </div>
        <motion.div 
          whileTap={{ scale: 0.9 }}
          className="relative w-16 h-16 rounded-full bg-[#0B6E4F] flex items-center justify-center cursor-pointer shadow-[0_4px_32px_rgba(11,110,79,0.5)] z-10 border border-[#1DB97A]/50 shrink-0"
        >
          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border-2 border-[#1DB97A]"
          />
          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
            className="absolute inset-0 rounded-full border-2 border-[#1DB97A]"
          />
          <Mic size={24} className="text-white relative z-10" />
        </motion.div>
      </div>

    </PageTransition>
  );
};
