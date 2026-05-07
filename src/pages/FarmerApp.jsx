import React, { useState, useEffect } from 'react';
import { PageTransition } from '../components/layout';
import { motion, AnimatePresence } from 'framer-motion';
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { Bell, CloudSun, Wheat, Droplets, Wind, Flame, Leaf, MapPin, IndianRupee, Camera, Check, X, Mic, Factory } from 'lucide-react';
import { AlertButton, PrimaryButton, SecondaryButton, GhostButton, CropBadge } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { farmerService } from '../services/farmerService';

const MarathiPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
    <path d="M50 20 L60 40 L40 40 Z M50 60 L60 80 L40 80 Z" fill="none" stroke="#FFFFFF" strokeWidth="1" />
    <circle cx="50" cy="50" r="3" fill="#FFFFFF" />
    <path d="M20 50 L40 60 L40 40 Z M80 50 L60 60 L60 40 Z" fill="none" stroke="#FFFFFF" strokeWidth="1" />
  </svg>
);

const ResidueListingModal = ({ isOpen, onClose, user, onListingCreated }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [crop, setCrop] = useState('');
  const [estimating, setEstimating] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setStep(1); setCrop('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (step === 4) {
      setEstimating(true);
      const timer = setTimeout(() => setEstimating(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleConfirm = async () => {
    const listing = await farmerService.createListing({
      farmerId: user.id,
      farmerName: user.name,
      crop: crop,
      loc: `${user.district}, MH`,
      pos: [20.7 + (Math.random()*0.1), 78.6 + (Math.random()*0.1)], // Random nearby pos
      qty: '8.4'
    });
    onListingCreated(listing);
    setStep(6);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "100%" }}
          className="fixed inset-0 z-[1000] flex justify-center md:items-center bg-[#050505]/90 backdrop-blur-xl"
        >
          <div className="w-full h-full md:max-w-[480px] md:h-[80vh] md:rounded-2xl bg-[#0A0A0A] border border-[#1DB97A]/20 flex flex-col shadow-[0_0_50px_rgba(29,185,122,0.1)] relative overflow-hidden">
            <MarathiPattern />
            
            <div className="flex items-center justify-between px-6 pt-6 pb-4 relative z-10 border-b border-white/5">
              <span className="font-mono text-[10px] text-[#1DB97A] uppercase tracking-widest">Listing Protocol // Step {step}/6</span>
              <button onClick={onClose} className="p-2 -mr-2 text-[#A0A0A0] hover:text-white"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col relative z-10">
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="font-heading font-bold text-[24px] text-white text-center mb-8">{t('farmer.upload_listing', 'Select Crop Residue')}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['Sugarcane', 'Cotton', 'Rice', 'Wheat'].map(c => (
                      <div 
                        key={c} onClick={() => setCrop(c)}
                        className={`cursor-pointer rounded-lg p-6 flex flex-col items-center justify-center gap-3 transition-all ${crop === c ? 'bg-[#1DB97A]/10 border border-[#1DB97A]' : 'bg-[#111111] border border-white/5 hover:border-white/20'}`}
                      >
                        <span className={`font-mono text-[14px] font-bold uppercase tracking-wider ${crop === c ? 'text-[#1DB97A]' : 'text-white'}`}>{c}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center h-full text-center">
                  <h3 className="font-heading font-bold text-[24px] text-white mb-6">Capture Field Telemetry</h3>
                  <div className="w-full h-48 border border-dashed border-[#00E5FF]/40 rounded-lg flex flex-col items-center justify-center gap-3 bg-[#00E5FF]/5 mb-6 text-[#00E5FF]">
                    <Camera size={40} />
                    <span className="font-mono text-[11px] uppercase tracking-widest">Awaiting Visual Data</span>
                  </div>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center h-full text-center">
                  <h3 className="font-heading font-bold text-[24px] text-white mb-8">Location Sync</h3>
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-[#00E5FF]/30 blur-xl rounded-full animate-pulse" />
                    <MapPin size={48} className="text-[#00E5FF] relative z-10" />
                  </div>
                  <div className="bg-[#111111] border border-white/5 p-4 w-full rounded-lg font-mono">
                    <div className="text-white text-[14px] mb-1">{user.district}, Maharashtra</div>
                    <div className="text-[#00E5FF] text-[11px]">LAT: 20.7453°N | LNG: 78.6022°E</div>
                  </div>
                </motion.div>
              )}
              {step === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full items-center justify-center text-center">
                  <h3 className="font-heading font-bold text-[24px] text-white mb-8">AI Estimation</h3>
                  {estimating ? (
                    <div className="w-full h-1 bg-[#111111] overflow-hidden relative">
                      <motion.div className="absolute top-0 bottom-0 w-1/2 bg-[#1DB97A]" initial={{ left: "-50%" }} animate={{ left: "100%" }} transition={{ duration: 1, repeat: Infinity }} />
                    </div>
                  ) : (
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                      <h3 className="font-heading font-bold text-[48px] text-[#1DB97A] leading-none mb-2">8.4 T</h3>
                      <div className="text-[#00E5FF] font-mono text-[10px] tracking-widest uppercase border border-[#00E5FF]/30 px-3 py-1 bg-[#00E5FF]/10 rounded-sm">Confidence: 94.2%</div>
                    </motion.div>
                  )}
                </motion.div>
              )}
              {step === 5 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full items-center text-center">
                  <h3 className="font-heading font-bold text-[24px] text-white mb-8">Market Pricing</h3>
                  <div className="bg-[#FFD700]/10 border border-[#FFD700]/30 p-8 w-full rounded-lg mb-4">
                    <div className="font-heading font-bold text-[40px] text-[#FFD700] leading-none mb-2">₹3,400</div>
                    <div className="text-[#FFD700]/70 font-mono text-[10px] uppercase tracking-widest">Suggested Rate / Tonne</div>
                  </div>
                </motion.div>
              )}
              {step === 6 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full text-center items-center justify-center">
                  <div className="w-24 h-24 bg-[#1DB97A]/20 border border-[#1DB97A] rounded-full flex items-center justify-center mb-6">
                    <Check size={40} className="text-[#1DB97A]" />
                  </div>
                  <h3 className="font-heading font-bold text-[28px] text-white mb-2">Listing Active</h3>
                  <p className="text-[#A0A0A0] text-[14px]">Nearby industries have been pinged.</p>
                </motion.div>
              )}
            </div>

            <div className="p-6 border-t border-white/5 flex gap-4 relative z-10 bg-[#0A0A0A]">
              {step > 1 && step < 6 && <GhostButton onClick={() => setStep(s=>s-1)} className="flex-1 font-mono uppercase tracking-widest text-[11px]">{t('farmer.cancel', 'Back')}</GhostButton>}
              {step < 5 && (
                <PrimaryButton onClick={() => setStep(s=>s+1)} disabled={step===1&&!crop || step===4&&estimating} className="flex-[2] bg-[#1DB97A] text-[#050505] font-mono uppercase tracking-widest text-[11px]">
                  Proceed
                </PrimaryButton>
              )}
              {step === 5 && (
                <PrimaryButton onClick={handleConfirm} className="flex-[2] bg-[#1DB97A] text-[#050505] font-mono uppercase tracking-widest text-[11px]">
                  {t('farmer.submit', 'Confirm')}
                </PrimaryButton>
              )}
              {step === 6 && (
                <PrimaryButton onClick={onClose} className="w-full bg-[#1DB97A] text-[#050505] font-mono uppercase tracking-widest text-[11px]">Return to Dash</PrimaryButton>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const FarmerApp = () => {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      if (user) {
        const listings = await farmerService.getMyListings(user.id);
        setMyListings(listings);
      }
      setLoading(false);
    };
    fetchListings();
  }, [user]);

  const handleListingCreated = (newListing) => {
    setMyListings([...myListings, newListing]);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  if (!user || loading) return null;

  return (
    <PageTransition className="w-full min-h-[calc(100vh-80px)] bg-[#050505] flex flex-col relative">
      
      {/* Background Stylings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <MarathiPattern />
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF8F00]/5 blur-[120px] rounded-full" />
      </div>

      <ResidueListingModal isOpen={isListingModalOpen} onClose={() => setIsListingModalOpen(false)} user={user} onListingCreated={handleListingCreated} />

      <div className="w-full max-w-[480px] mx-auto px-4 py-6 md:border md:border-[#1DB97A]/20 md:rounded-lg md:mt-8 md:mb-8 bg-[#0A0A0A]/80 backdrop-blur-md flex-grow shadow-[0_0_40px_rgba(29,185,122,0.05)] relative z-10">
        
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1DB97A]/20 border border-[#1DB97A]/40 flex items-center justify-center text-[#1DB97A] font-bold">
              {user.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="font-mono font-bold text-[14px] text-white uppercase tracking-wider">
                {user.name}
              </div>
              <div className="font-mono text-[10px] text-[#A0A0A0] uppercase tracking-widest">
                {user.district}, MH
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-[#111111] border border-white/5 p-1 items-center">
              {['en', 'mr', 'hi'].map((l) => (
                <button
                  key={l} onClick={() => changeLanguage(l)}
                  className={`text-[10px] font-mono font-bold px-2 py-1 transition-colors uppercase ${i18n.language === l ? 'bg-[#1DB97A] text-[#050505]' : 'text-[#A0A0A0]'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* GLOWING PROGRESS RING - HARVEST READINESS */}
        <div className="flex items-center justify-center mb-8">
           <div className="relative w-[180px] h-[180px]">
             <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none" />
             <RadialBarChart width={180} height={180} cx={90} cy={90} innerRadius={70} outerRadius={90} barSize={8} data={[{ name: 'Harvest', value: 85, fill: '#FF8F00' }]} startAngle={90} endAngle={-270}>
               <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
               <RadialBar background={{ fill: 'rgba(255,255,255,0.05)' }} dataKey="value" cornerRadius={0} />
             </RadialBarChart>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-heading font-bold text-[32px] text-[#FF8F00] leading-none">85%</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#FF8F00]/70 mt-1">{user.cropType || 'Crop'} Readiness</span>
             </div>
           </div>
        </div>

        {/* EARNINGS */}
        <div className="bg-[#111111] border border-white/5 p-5 mb-8 flex justify-between items-center">
          <div>
            <div className="text-[#A0A0A0] text-[10px] font-mono uppercase tracking-widest mb-1">{t('farmer.total_earnings', 'Total Earnings')}</div>
            <div className="text-white font-heading font-bold text-[24px]">₹{user.totalEarnings?.toLocaleString() || '0'}</div>
          </div>
          <button 
            onClick={() => setIsListingModalOpen(true)}
            className="bg-[#1DB97A] hover:bg-[#159461] text-[#050505] font-mono text-[10px] font-bold uppercase tracking-widest py-2 px-4 transition-colors"
          >
            {t('farmer.sell_residue', 'Sell Residue')}
          </button>
        </div>

        {/* WEATHER & TELEMETRY ROW */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-[#050505] border border-[#00E5FF]/20 p-4 flex flex-col justify-between h-[90px]">
            <div className="flex justify-between items-start">
              <span className="font-mono text-[10px] text-[#00E5FF] uppercase tracking-widest">{t('farmer.forecast', 'Weather')}</span>
              <CloudSun size={14} className="text-[#00E5FF]" />
            </div>
            <div className="font-heading font-bold text-[24px] text-white">32°C</div>
          </div>
          <div className="bg-[#050505] border border-[#1DB97A]/20 p-4 flex flex-col justify-between h-[90px]">
            <div className="flex justify-between items-start">
              <span className="font-mono text-[10px] text-[#1DB97A] uppercase tracking-widest">{t('farmer.moisture', 'Moisture')}</span>
              <Droplets size={14} className="text-[#1DB97A]" />
            </div>
            <div className="font-heading font-bold text-[24px] text-white">42%</div>
          </div>
        </div>

        {/* PULSING BURN RISK ALERT */}
        <motion.div 
          animate={{ boxShadow: ['0 0 0 rgba(255,59,48,0)', '0 0 20px rgba(255,59,48,0.3)', '0 0 0 rgba(255,59,48,0)'] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-8 bg-[#FF3B30]/10 border border-[#FF3B30]/50 p-5 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-[#FF3B30]" />
          <div className="flex items-center gap-2 mb-2">
            <Flame size={14} className="text-[#FF3B30] animate-pulse" />
            <div className="text-[#FF3B30] text-[10px] font-mono uppercase tracking-widest font-bold">{t('farmer.burn_risk', 'CRITICAL BURN RISK')}</div>
          </div>
          <h3 className="text-white text-[14px] font-bold mb-1">{user.district} — Next 48h</h3>
          <p className="text-[#A0A0A0] text-[12px] mb-4">{t('farmer.burn_desc', 'High thermal anomalies detected.')}</p>
        </motion.div>

        {/* MY LISTINGS */}
        <div>
          <div className="flex items-center justify-between mb-4">
             <span className="font-mono text-[11px] text-[#1DB97A] uppercase tracking-widest">{t('farmer.my_listings', 'My Listings')}</span>
          </div>
          <div className="flex flex-col gap-2">
            {myListings.length === 0 ? (
              <div className="text-center p-6 bg-[#111111] border border-white/5 text-[#A0A0A0] text-sm font-mono">No active listings.</div>
            ) : (
              myListings.map((listing, i) => (
                <div key={i} className="bg-[#050505] border border-[#1DB97A]/20 p-3 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <CropBadge cropName={listing.crop} />
                    <span className="text-[#1DB97A] text-[9px] font-mono uppercase tracking-widest">{listing.status}</span>
                  </div>
                  <div className="flex justify-between mt-2 pt-2 border-t border-white/5">
                    <span className="text-[#A0A0A0] text-[10px] font-mono">QTY: <strong className="text-white">{listing.qty} T</strong></span>
                    <span className="text-[#A0A0A0] text-[10px] font-mono">CONF: <strong className="text-[#1DB97A]">{listing.conf}</strong></span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Voice Assistant Floating Action */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:translate-x-[180px] z-[100]">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-[#1DB97A] rounded-full flex items-center justify-center text-[#050505] shadow-[0_0_30px_rgba(29,185,122,0.4)] relative"
        >
          <div className="absolute inset-0 border border-[#1DB97A] rounded-full animate-ping opacity-50" />
          <Mic size={24} />
        </motion.button>
      </div>

    </PageTransition>
  );
};
