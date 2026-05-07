import React from 'react';

export const SDGAlignment = () => {
  const sdgs = [
    { num: 2, title: "Zero Hunger", desc: "Restoring soil nutrients lost to fires.", color: "#DDA63A" },
    { num: 7, title: "Clean Energy", desc: "Fueling bio-energy with crop residue.", color: "#FCC30B" },
    { num: 11, title: "Sustainable Cities", desc: "Preventing toxic smoke in urban areas.", color: "#FD9D24" },
    { num: 13, title: "Climate Action", desc: "Reducing massive CO₂ & black carbon emissions.", color: "#3F7E44" },
    { num: 15, title: "Life on Land", desc: "Protecting farm ecosystems and biodiversity.", color: "#56C02B" }
  ];

  return (
    <section className="py-24 bg-[#0D0D0D] px-4">
      <div className="max-w-[1280px] mx-auto flex flex-col items-center">
        
        <div className="text-center mb-16">
          <div className="text-[#A0A0A0] text-[11px] tracking-widest uppercase font-sans font-semibold mb-3">
            GLOBAL IMPACT ALIGNMENT
          </div>
          <h2 className="font-heading font-bold text-[32px] md:text-[40px] text-[#F5F5F5] tracking-tight leading-none">
            Aligned with UN Sustainable Development Goals
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
          {sdgs.map((sdg) => (
            <div 
              key={sdg.num} 
              className="bg-[#111111] border-t-4 rounded-b-xl border-x border-b border-white/5 p-6 shadow-xl flex flex-col transition-transform hover:-translate-y-1 duration-300"
              style={{ borderTopColor: sdg.color }}
            >
              <div className="font-heading font-extrabold text-[40px] leading-none mb-4 opacity-90" style={{ color: sdg.color }}>
                {sdg.num}
              </div>
              <h4 className="font-sans font-bold text-[16px] text-white mb-2 uppercase tracking-wide">
                {sdg.title}
              </h4>
              <p className="font-sans text-[13px] text-[#A0A0A0] leading-relaxed">
                {sdg.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
