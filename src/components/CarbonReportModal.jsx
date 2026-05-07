import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, CheckCircle, Download, Loader2, Globe, Leaf } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from './ui';
import { useTranslation } from 'react-i18next';

export const CarbonReportModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [generating, setGenerating] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (isOpen) {
      setGenerating(true);
      setProgress(0);
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => setGenerating(false), 500);
            return 100;
          }
          return p + 2;
        });
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex justify-center items-center bg-[#050505]/90 backdrop-blur-md p-4"
        >
          <div className="w-full max-w-[800px] max-h-[90vh] bg-[#0A0A0A] border border-[#FF8F00]/30 shadow-[0_0_40px_rgba(255,143,0,0.1)] flex flex-col relative overflow-hidden">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#FF8F00]/20 bg-[#FF8F00]/5 shrink-0">
               <div className="flex items-center gap-3">
                 <FileText className="text-[#FF8F00]" size={24} />
                 <div>
                   <h2 className="font-heading font-bold text-[20px] text-white leading-none">Sustainability & Carbon Report</h2>
                   <p className="text-[#FF8F00] font-mono text-[10px] tracking-widest uppercase mt-1">Official Environmental Audit</p>
                 </div>
               </div>
               <button onClick={onClose} className="text-[#A0A0A0] hover:text-white transition-colors"><X size={24} /></button>
            </div>

            {generating ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 min-h-[400px]">
                 <div className="relative w-24 h-24 mb-8">
                   <div className="absolute inset-0 border-2 border-[#FF8F00]/20 rounded-full" />
                   <div className="absolute inset-0 border-2 border-[#FF8F00] rounded-full border-t-transparent animate-spin" />
                   <div className="absolute inset-0 flex items-center justify-center">
                     <span className="text-[#FF8F00] font-mono font-bold text-[14px]">{progress}%</span>
                   </div>
                 </div>
                 <h3 className="text-white font-heading font-bold text-[24px] mb-2 animate-pulse">Synthesizing Data</h3>
                 <p className="text-[#A0A0A0] font-mono text-[12px] text-center max-w-sm uppercase tracking-widest leading-relaxed">Aggregating state-wide biomass metrics, compiling SDG alignment, and verifying carbon offset estimates...</p>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 overflow-y-auto custom-scrollbar p-8">
                 
                 {/* Report Content Preview (Simulated PDF Page) */}
                 <div className="bg-white p-8 md:p-12 shadow-2xl mx-auto max-w-[650px] relative">
                    {/* Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                       <Leaf size={400} />
                    </div>

                    <div className="border-b-2 border-black pb-6 mb-8 flex justify-between items-end">
                       <div>
                         <h1 className="font-heading font-extrabold text-[32px] text-black leading-tight uppercase tracking-tighter">Carbon Impact<br/>Audit Report</h1>
                         <p className="text-gray-600 font-mono text-[10px] uppercase tracking-widest mt-2">Issued: {new Date().toLocaleDateString()}</p>
                       </div>
                       <div className="text-right">
                         <div className="font-mono text-[12px] font-bold text-black border-2 border-black px-3 py-1 inline-block uppercase">Certified</div>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-8">
                       <div>
                         <h3 className="text-gray-500 font-mono text-[9px] uppercase tracking-widest mb-1">Total Offset Achieved</h3>
                         <div className="text-black font-heading font-bold text-[36px]">3.2M <span className="text-[14px] text-gray-500">kg CO₂</span></div>
                       </div>
                       <div>
                         <h3 className="text-gray-500 font-mono text-[9px] uppercase tracking-widest mb-1">Equivalent Trees Planted</h3>
                         <div className="text-black font-heading font-bold text-[36px]">142,500</div>
                       </div>
                    </div>

                    <div className="mb-8">
                       <h3 className="text-black font-heading font-bold text-[18px] mb-4 uppercase border-b border-gray-200 pb-2">Environmental Mitigation</h3>
                       <p className="text-gray-800 text-[13px] leading-relaxed mb-4">
                         Through the mobilization of 48.2K MT of agricultural biomass, the Thermax Eco-Industrial Network has successfully prevented wide-scale crop residue burning across Maharashtra. This intervention directly aligns with the National Clean Air Programme (NCAP) objectives.
                       </p>
                       <ul className="text-[12px] text-gray-700 space-y-2 list-disc pl-4">
                         <li><strong>Air Quality:</strong> Reduced PM2.5 emissions by an estimated 420 tonnes.</li>
                         <li><strong>Soil Health:</strong> Preserved topsoil integrity across 12,000 hectares.</li>
                         <li><strong>Economic Impact:</strong> Generated ₹8.4 Cr in supplementary income for rural farming communities.</li>
                       </ul>
                    </div>

                    <div>
                       <h3 className="text-black font-heading font-bold text-[18px] mb-4 uppercase border-b border-gray-200 pb-2">UN SDG Alignment</h3>
                       <div className="flex gap-4">
                         <div className="w-16 h-16 bg-[#E5243B] text-white flex flex-col items-center justify-center p-1 text-center font-bold leading-none shrink-0"><span className="text-[10px]">SDG 1</span><span className="text-[6px] mt-1 uppercase">No Poverty</span></div>
                         <div className="w-16 h-16 bg-[#FCC30B] text-white flex flex-col items-center justify-center p-1 text-center font-bold leading-none shrink-0"><span className="text-[10px]">SDG 7</span><span className="text-[6px] mt-1 uppercase">Clean Energy</span></div>
                         <div className="w-16 h-16 bg-[#3F7E44] text-white flex flex-col items-center justify-center p-1 text-center font-bold leading-none shrink-0"><span className="text-[10px]">SDG 13</span><span className="text-[6px] mt-1 uppercase">Climate Action</span></div>
                       </div>
                    </div>

                 </div>

              </motion.div>
            )}

            {/* Footer */}
            {!generating && (
              <div className="p-6 border-t border-[#FF8F00]/20 bg-[#050505] shrink-0 flex justify-end gap-4 relative z-10">
                <SecondaryButton onClick={onClose} className="border border-white/20">Close Preview</SecondaryButton>
                <PrimaryButton className="bg-[#FF8F00] hover:bg-[#FF9F1A] text-[#050505] flex items-center gap-2 shadow-[0_0_20px_rgba(255,143,0,0.3)]">
                  <Download size={18} /> Download Certified PDF
                </PrimaryButton>
              </div>
            )}
          </div>
          <style>{`
            .custom-scrollbar::-webkit-scrollbar { width: 6px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,143,0,0.5); }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
