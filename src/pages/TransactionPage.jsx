import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageTransition, GlassCard } from '../components/layout';
import { useAuth } from '../context/AuthContext';
import { industryService } from '../services/industryService';
import { transactionService } from '../services/transactionService';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, FileText, Truck, ArrowLeft, Loader2, Phone, ShieldCheck, Receipt } from 'lucide-react';
import { PrimaryButton, SecondaryButton, GhostButton, CropBadge } from '../components/ui';

export const TransactionPage = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [txState, setTxState] = useState('idle'); // idle, processing, success, error
  const [errorMsg, setErrorMsg] = useState('');
  const [transactionData, setTransactionData] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await industryService.getMapData();
        const found = data.biomassListings.find(l => l.id.toString() === listingId);
        if (found) setListing(found);
        else setErrorMsg('Listing not found or already booked.');
      } catch (err) {
        setErrorMsg('Failed to load listing.');
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [listingId]);

  const handleExecuteBuy = async () => {
    setTxState('processing');
    setErrorMsg('');
    try {
      const tx = await transactionService.executeTransaction(listing, user);
      setTransactionData(tx);
      setTxState('success');
    } catch (err) {
      setErrorMsg(err.message || 'Transaction failed. Please try again.');
      setTxState('error');
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-[calc(100vh-80px)] bg-[#050505] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#00E5FF] w-12 h-12 mb-4" />
        <span className="text-[#00E5FF] font-mono text-xs tracking-widest uppercase">Initializing Secure Handshake...</span>
      </div>
    );
  }

  if (!listing && txState !== 'success') {
    return (
      <div className="w-full min-h-[calc(100vh-80px)] bg-[#050505] flex flex-col items-center justify-center text-white p-6">
        <AlertTriangle className="text-[#FF3B30] w-16 h-16 mb-4" />
        <h2 className="font-heading font-bold text-[24px] mb-2">Resource Unavailable</h2>
        <p className="text-[#A0A0A0] mb-6 font-mono text-sm text-center max-w-md">{errorMsg}</p>
        <SecondaryButton onClick={() => navigate('/industry')}>Return to Command Center</SecondaryButton>
      </div>
    );
  }

  const pricePerTon = 3400;
  const qtyNum = parseFloat(listing?.qty || 0);
  const totalValue = qtyNum * pricePerTon;
  const carbonEst = qtyNum * 1.8;

  return (
    <PageTransition className="w-full min-h-[calc(100vh-80px)] bg-[#050505] relative overflow-hidden py-8 px-4 md:px-8">
      {/* Background Stylings */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00E5FF]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1DB97A]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1000px] mx-auto relative z-10">
        
        {/* Navigation & Header */}
        <button onClick={() => navigate('/industry')} className="flex items-center gap-2 text-[#A0A0A0] hover:text-white font-mono text-[11px] uppercase tracking-widest mb-8 transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Abort Sequence
        </button>

        <div className="flex items-center gap-3 mb-8">
          <ShieldCheck className="text-[#00E5FF] w-8 h-8" />
          <div>
            <h1 className="font-heading font-extrabold text-[32px] text-white leading-none tracking-tight">Procurement Gateway</h1>
            <p className="font-mono text-[#A0A0A0] text-[12px] uppercase tracking-widest">Encrypted B2B Smart Contract Initialization</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {txState === 'success' ? (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16">
               <div className="w-24 h-24 rounded-full bg-[#1DB97A]/20 border-2 border-[#1DB97A] flex items-center justify-center mb-6 relative">
                 <div className="absolute inset-0 rounded-full border border-[#1DB97A] animate-ping opacity-50" />
                 <CheckCircle size={48} className="text-[#1DB97A]" />
               </div>
               <h2 className="font-heading font-bold text-[36px] text-white mb-2">Transaction Executed</h2>
               <p className="text-[#00E5FF] font-mono text-[14px] mb-8 bg-[#00E5FF]/10 px-4 py-2 border border-[#00E5FF]/30">TXN ID: {transactionData?.id}</p>
               
               <div className="flex gap-4 flex-wrap justify-center">
                 <PrimaryButton className="bg-[#1DB97A] text-[#050505] flex items-center gap-2 h-12"><Truck size={18}/> Assign Logistics Convoy</PrimaryButton>
                 <SecondaryButton className="flex items-center gap-2 h-12"><Receipt size={18} /> Download Invoice</SecondaryButton>
                 <GhostButton onClick={() => navigate('/industry')} className="h-12 border border-[#A0A0A0]/30 hover:bg-white/5 text-white">Return to Dashboard</GhostButton>
               </div>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-8">
              
              {/* Left Column: Details */}
              <div className="flex flex-col gap-6">
                <GlassCard className="p-6 border border-[#00E5FF]/20 bg-[#0A0A0A]">
                  <h3 className="font-mono text-[10px] text-[#00E5FF] uppercase tracking-widest mb-4">Supplier Profile</h3>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="font-heading font-bold text-[24px] text-white uppercase">{listing.farmerName}</div>
                      <div className="text-[#A0A0A0] font-mono text-[12px]">{listing.loc}</div>
                    </div>
                    <GhostButton className="border border-white/10 hover:border-white/30 hover:bg-white/5 text-[10px] h-8 px-3 font-mono flex items-center gap-2"><Phone size={14} /> Contact Node</GhostButton>
                  </div>

                  <h3 className="font-mono text-[10px] text-[#00E5FF] uppercase tracking-widest mb-4 mt-8 pt-4 border-t border-white/5">Asset Specifications</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#111111] p-4 rounded border border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[#A0A0A0] text-[9px] font-mono uppercase">Commodity</span>
                      <CropBadge cropName={listing.crop} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#A0A0A0] text-[9px] font-mono uppercase">Volume</span>
                      <span className="text-white font-bold font-mono text-[14px]">{listing.qty}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#A0A0A0] text-[9px] font-mono uppercase">Quality / MST</span>
                      <span className="text-white font-bold font-mono text-[14px]">{listing.mst}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#A0A0A0] text-[9px] font-mono uppercase">AI Match</span>
                      <span className="text-[#1DB97A] font-bold font-mono text-[14px]">{listing.conf}</span>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-6 border border-white/5 bg-[#0A0A0A]">
                   <h3 className="font-mono text-[10px] text-[#A0A0A0] uppercase tracking-widest mb-4">Contractual Impact Projections</h3>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="bg-[#1DB97A]/5 border border-[#1DB97A]/20 p-4 rounded flex items-center justify-between">
                       <span className="text-[#1DB97A] font-mono text-[10px] uppercase">Carbon Mitigation</span>
                       <span className="text-white font-heading font-bold text-[20px]">{carbonEst.toFixed(1)} <span className="text-[12px] text-[#A0A0A0]">MT CO₂</span></span>
                     </div>
                     <div className="bg-[#FF8F00]/5 border border-[#FF8F00]/20 p-4 rounded flex items-center justify-between">
                       <span className="text-[#FF8F00] font-mono text-[10px] uppercase">Logistics ETA</span>
                       <span className="text-white font-heading font-bold text-[20px]">4.2 <span className="text-[12px] text-[#A0A0A0]">HRS</span></span>
                     </div>
                   </div>
                </GlassCard>
              </div>

              {/* Right Column: Checkout */}
              <div className="flex flex-col gap-6">
                <GlassCard className="p-6 border border-[#00E5FF]/40 shadow-[0_0_30px_rgba(0,229,255,0.05)] bg-[#050505]">
                  <h3 className="font-mono text-[10px] text-[#00E5FF] uppercase tracking-widest mb-6">Financial Ledger</h3>
                  
                  <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-4">
                    <span className="text-[#A0A0A0] font-mono text-[12px]">Base Rate (per MT)</span>
                    <span className="text-white font-mono text-[14px]">₹{pricePerTon.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-4">
                    <span className="text-[#A0A0A0] font-mono text-[12px]">Volume</span>
                    <span className="text-white font-mono text-[14px]">x {qtyNum} MT</span>
                  </div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[#A0A0A0] font-mono text-[12px]">Platform Fee (1.5%)</span>
                    <span className="text-white font-mono text-[14px]">₹{Math.floor(totalValue * 0.015).toLocaleString()}</span>
                  </div>

                  <div className="bg-[#00E5FF]/10 border border-[#00E5FF]/30 p-4 mb-6">
                    <div className="flex justify-between items-end">
                      <span className="text-[#00E5FF] font-mono text-[10px] uppercase tracking-widest">Total Valuation</span>
                      <span className="text-[#00E5FF] font-heading font-extrabold text-[32px] leading-none">₹{Math.floor(totalValue * 1.015).toLocaleString()}</span>
                    </div>
                  </div>

                  {txState === 'error' && (
                    <div className="bg-[#FF3B30]/10 border border-[#FF3B30]/30 text-[#FF3B30] p-3 rounded text-[12px] font-mono mb-6 flex items-start gap-2">
                      <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                      {errorMsg}
                    </div>
                  )}

                  <PrimaryButton 
                    onClick={handleExecuteBuy}
                    disabled={txState === 'processing'}
                    className="w-full h-14 bg-[#1DB97A] text-[#050505] font-mono text-[12px] uppercase tracking-widest shadow-[0_0_20px_rgba(29,185,122,0.3)] hover:shadow-[0_0_30px_rgba(29,185,122,0.5)] flex items-center justify-center gap-3"
                  >
                    {txState === 'processing' ? (
                      <><Loader2 size={18} className="animate-spin" /> Authorizing Ledger...</>
                    ) : (
                      <><FileText size={18}/> Initiate Smart Contract</>
                    )}
                  </PrimaryButton>
                  <SecondaryButton onClick={() => navigate('/industry')} disabled={txState === 'processing'} className="w-full mt-3 h-12 text-[10px]">Cancel Transaction</SecondaryButton>

                </GlassCard>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};
