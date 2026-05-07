import React, { useEffect, useState } from 'react';
import { PageTransition, GlassCard } from '../components/layout';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Wind, Leaf, TrendingUp, Handshake, Award, CheckCircle2, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { SecondaryButton } from '../components/ui';
import { useTranslation } from 'react-i18next';
import { analyticsService } from '../services/analyticsService';
import { CarbonReportModal } from '../components/CarbonReportModal';

const Counter = ({ to, formatFn }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  const spring = useSpring(0, { duration: 2500, bounce: 0 });
  const display = useTransform(spring, (current) => formatFn(current));
  
  useEffect(() => {
    if (inView) spring.set(to);
  }, [inView, spring, to]);
  
  return <motion.span ref={ref}>{display}</motion.span>;
};

export const ImpactDashboard = () => {
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const res = await analyticsService.getImpactData();
      setData(res);
    };
    loadData();
  }, []);

  if (!data) return (
    <div className="w-full h-screen bg-[#050505] flex items-center justify-center">
        <Activity className="text-[#00E5FF] animate-pulse w-8 h-8" />
    </div>
  );

  const kpis = [
    { icon: Wind, color: '#00E5FF', to: data.kpis.co2Mitigated, format: v => `${v.toFixed(1)}M kg`, label: t('impact.co2_mitigated', 'CO₂ Mitigated'), trend: '↑ 8% this month', trendColor: '#00E5FF' },
    { icon: Leaf, color: '#1DB97A', to: data.kpis.biomassRecovered, format: v => `${Math.floor(v).toLocaleString()} T`, label: t('impact.biomass_recovered', 'Biomass Recovered') },
    { icon: TrendingUp, color: '#FFD700', to: data.kpis.farmerEarnings, format: v => `₹${v.toFixed(1)} Cr`, label: t('impact.farmer_earnings', 'Farmer Earnings') },
    { icon: Handshake, color: '#FFFFFF', to: data.kpis.activeContracts, format: v => Math.floor(v).toLocaleString(), label: t('impact.active_contracts', 'Active Contracts') },
    { icon: Award, color: '#FF8F00', to: data.kpis.carbonCredits, format: v => `${Math.floor(v).toLocaleString()} CERs`, label: t('impact.carbon_credits', 'Carbon Credits') },
  ];

  return (
    <PageTransition className="min-h-screen bg-[#050505] w-full pt-20 pb-24 overflow-x-hidden relative">
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(0, 229, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="w-full max-w-[1280px] mx-auto px-8 relative z-10">
        
        {/* PAGE HEADER */}
        <div className="mb-8 relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Activity size={16} className="text-[#00E5FF]" />
              <div className="text-[#00E5FF] text-[11px] tracking-[0.2em] uppercase font-bold font-mono">LIVE INTELLIGENCE</div>
            </div>
            <h2 className="text-white text-[36px] font-bold font-heading tracking-tight mb-1">{t('impact.title', 'Maharashtra Analytics Core')}</h2>
            <p className="text-[#A0A0A0] text-[14px] font-mono">{t('impact.subtitle', 'State-wide supply chain and carbon impact metrics.')}</p>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] text-[#00E5FF] font-bold font-mono tracking-widest bg-[#00E5FF]/10 px-4 py-2 border border-[#00E5FF]/30">
            <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            SYNC: OK
          </div>
        </div>

        {/* TOP KPI ROW */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <GlassCard key={idx} className="p-6 relative overflow-hidden group bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 blur-[40px] opacity-10 group-hover:opacity-30 transition-opacity" style={{ backgroundColor: kpi.color }} />
                <div className="absolute top-6 right-6 opacity-20">
                  <Icon size={32} color={kpi.color} />
                </div>
                <div className="font-heading font-bold text-[32px] leading-none mb-2 relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" style={{ color: kpi.color }}>
                  <Counter to={kpi.to} formatFn={kpi.format} />
                </div>
                <div className="text-[#A0A0A0] text-[10px] font-mono uppercase tracking-widest font-bold z-10 relative">{kpi.label}</div>
                {kpi.trend && (
                  <div className="text-[10px] font-mono font-bold mt-2 z-10 relative" style={{ color: kpi.trendColor }}>
                    {kpi.trend}
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>

        {/* MIDDLE ROW */}
        <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 mb-6">
          
          {/* Glowing Area Chart: Biomass Forecast */}
          <GlassCard className="p-6 flex flex-col h-[320px] bg-[#0A0A0A] border border-[#00E5FF]/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#00E5FF]/5 to-transparent pointer-events-none" />
            <h3 className="font-mono font-bold text-[11px] text-[#00E5FF] tracking-widest uppercase mb-6 flex items-center gap-2">
              <Activity size={14}/> {t('impact.supply_forecast', 'Supply Forecast (MT)')}
            </h3>
            <div className="flex-1 w-full relative z-10 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.forecast} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,229,255,0.1)" />
                  <XAxis dataKey="month" tick={{ fill: '#A0A0A0', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#A0A0A0', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(5,5,5,0.9)', border: '1px solid rgba(0,229,255,0.3)', borderRadius: '0', fontFamily: 'monospace', fontSize: '12px' }} 
                    itemStyle={{ color: '#00E5FF', fontWeight: 'bold' }} 
                  />
                  <Area type="monotone" dataKey="value" stroke="#00E5FF" strokeWidth={3} fillOpacity={1} fill="url(#colorForecast)" style={{ filter: 'drop-shadow(0px 4px 10px rgba(0,229,255,0.4))' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Donut Chart */}
          <GlassCard className="p-6 flex flex-col h-[320px] items-center bg-[#0A0A0A] border border-white/5">
            <h3 className="font-mono font-bold text-[11px] text-[#A0A0A0] tracking-widest uppercase mb-2 w-full">{t('impact.crop_intelligence', 'Crop Intelligence')}</h3>
            <div className="flex-1 w-full flex items-center justify-center relative min-h-0">
              <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none scale-75" />
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data.crops} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value" stroke="none">
                    {data.crops.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} style={{ filter: `drop-shadow(0px 0px 8px ${entry.color}40)` }} />)}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(5,5,5,0.9)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'monospace', fontSize: '12px' }}
                    itemStyle={{ color: 'white' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 mt-2 w-full shrink-0">
              {data.crops.map(c => (
                <div key={c.name} className="flex items-center justify-between text-[10px] font-mono text-[#A0A0A0] uppercase">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color, boxShadow: `0 0 8px ${c.color}` }} />
                    {c.name}
                  </div>
                  <span className="text-white font-bold">{c.value}%</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Bar Chart: Districts */}
          <GlassCard className="p-6 flex flex-col h-[320px] bg-[#0A0A0A] border border-[#1DB97A]/20 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-b from-[#1DB97A]/5 to-transparent pointer-events-none" />
            <h3 className="font-mono font-bold text-[11px] text-[#1DB97A] tracking-widest uppercase mb-6">{t('impact.district_heatmap', 'District Heatmap')}</h3>
            <div className="flex-1 w-full z-10 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.districts} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(29,185,122,0.1)" />
                  <XAxis dataKey="name" tick={{ fill: '#A0A0A0', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#A0A0A0', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    cursor={{ fill: 'rgba(29,185,122,0.1)' }} 
                    contentStyle={{ backgroundColor: 'rgba(5,5,5,0.9)', border: '1px solid rgba(29,185,122,0.3)', fontFamily: 'monospace', fontSize: '12px' }} 
                  />
                  <Bar dataKey="value" fill="#1DB97A" radius={[2, 2, 0, 0]} style={{ filter: 'drop-shadow(0px -4px 8px rgba(29,185,122,0.3))' }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

        </div>

        {/* BOTTOM ROW */}
        <div className="grid grid-cols-[3fr_2fr] gap-4">
          
          {/* Live Deal Feed */}
          <GlassCard className="p-6 h-[280px] flex flex-col bg-[#0A0A0A] border border-white/5">
            <h3 className="font-mono font-bold text-[11px] text-[#A0A0A0] tracking-widest uppercase mb-4 shrink-0 flex justify-between">
              <span>{t('impact.logistics_uplink', 'Logistics Uplink')}</span>
              <span className="text-[#00E5FF] animate-pulse">RECIEVING...</span>
            </h3>
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {data.transactions.map((tx, idx) => (
                <div key={tx.id} className={`flex items-center py-3 ${idx !== data.transactions.length - 1 ? 'border-b border-[#00E5FF]/10' : ''}`}>
                  <CheckCircle2 size={16} className="text-[#00E5FF] mr-3 shrink-0" />
                  <div className="flex-1 min-w-0 flex items-center gap-3">
                    <span className="text-white text-[12px] font-bold font-mono uppercase truncate">{tx.name}</span>
                    <span className="bg-[#1DB97A]/10 text-[#1DB97A] border border-[#1DB97A]/20 text-[9px] font-mono px-2 py-0.5 uppercase tracking-widest whitespace-nowrap">{tx.crop}</span>
                    <span className="text-[#A0A0A0] text-[12px] font-mono whitespace-nowrap">{tx.qty}</span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 ml-4">
                    <span className="text-[#00E5FF] font-mono font-bold text-[14px]">{tx.price}</span>
                    <span className="text-[#A0A0A0] text-[10px] font-mono w-[60px] text-right">{tx.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Carbon Credit Gauge */}
          <GlassCard className="p-6 h-[280px] flex flex-col items-center justify-center relative bg-[#0A0A0A] border border-[#FF8F00]/20 overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-[#FF8F00]/5 to-transparent pointer-events-none" />
            <h3 className="font-mono font-bold text-[11px] text-[#FF8F00] tracking-widest uppercase absolute top-6 left-6">{t('impact.cer_protocol', 'CER Mitigation Protocol')}</h3>
            
            <div className="relative w-[180px] h-[180px] mt-4 z-10 flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius={70} outerRadius={90} barSize={12} data={[{ name: 'CERs', value: 31, fill: '#FF8F00' }]} startAngle={180} endAngle={-180}>
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar background={{ fill: 'rgba(255,255,255,0.05)' }} dataKey="value" cornerRadius={0} />
                  <text x="50%" y="45%" textAnchor="middle" dominantBaseline="middle" className="fill-white font-bold font-heading text-[24px]">1.2K <tspan className="text-[14px] fill-[#A0A0A0]">/ 10K</tspan></text>
                  <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" className="fill-[#FF8F00] text-[9px] font-mono uppercase tracking-widest">CERs Issued</text>
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 border border-[#FF8F00]/20 rounded-full scale-110 pointer-events-none" />
            </div>
            
            <SecondaryButton onClick={() => setReportModalOpen(true)} className="mt-4 shrink-0 border border-[#FF8F00]/30 text-[#FF8F00] hover:bg-[#FF8F00]/10 text-[10px] font-mono tracking-widest uppercase h-8 px-6 rounded-none relative z-10">Deploy Carbon Report</SecondaryButton>
          </GlassCard>

        </div>

      </div>

      <CarbonReportModal isOpen={reportModalOpen} onClose={() => setReportModalOpen(false)} />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,229,255,0.2); }
      `}</style>
    </PageTransition>
  );
};
