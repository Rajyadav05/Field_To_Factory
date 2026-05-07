import React, { useEffect } from 'react';
import { PageTransition, GlassCard } from '../components/layout';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Wind, Leaf, TrendingUp, Handshake, Award, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { SecondaryButton } from '../components/ui';

// Dummy Data
const co2Data = [
  { month: 'Jan', value: 120 }, { month: 'Feb', value: 210 }, { month: 'Mar', value: 380 },
  { month: 'Apr', value: 450 }, { month: 'May', value: 590 }, { month: 'Jun', value: 720 },
  { month: 'Jul', value: 910 }, { month: 'Aug', value: 1150 }, { month: 'Sep', value: 1840 },
  { month: 'Oct', value: 3100 }
];

const cropData = [
  { name: 'Rice', value: 42, color: '#1DB97A' },
  { name: 'Wheat', value: 31, color: '#2F80ED' },
  { name: 'Sugarcane', value: 18, color: '#FF8F00' },
  { name: 'Other', value: 9, color: '#A0A0A0' }
];

const stateData = [
  { name: 'Punjab', value: 140 },
  { name: 'Haryana', value: 95 },
  { name: 'UP', value: 65 },
  { name: 'MH', value: 45 }
];

const transactions = [
  { id: 1, name: 'Gurdev Organics', crop: 'Rice Straw', qty: '8.4 T', price: '₹26,880', time: '2 min ago' },
  { id: 2, name: 'Harpreet Agrotech', crop: 'Wheat Straw', qty: '4.2 T', price: '₹14,280', time: '14 min ago' },
  { id: 3, name: 'Rajinder Singh Farm', crop: 'Sugarcane', qty: '12.0 T', price: '₹33,600', time: '41 min ago' },
  { id: 4, name: 'Khalsa Farms Ltd.', crop: 'Cotton', qty: '2.1 T', price: '₹8,610', time: '1 hr ago' },
  { id: 5, name: 'Daljit Singh & Sons', crop: 'Rice Straw', qty: '6.5 T', price: '₹20,800', time: '2 hrs ago' },
  { id: 6, name: 'BioFuel Co-op', crop: 'Wheat Straw', qty: '18.2 T', price: '₹58,240', time: '3 hrs ago' },
  { id: 7, name: 'Green Acres', crop: 'Rice Straw', qty: '3.8 T', price: '₹12,160', time: '5 hrs ago' },
  { id: 8, name: 'Punjab Biomass Hub', crop: 'Sugarcane', qty: '24.5 T', price: '₹68,600', time: '8 hrs ago' },
];

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

const kpis = [
  { icon: Wind, color: '#2F80ED', to: 3.1, format: v => `${v.toFixed(1)}M kg`, label: 'CO₂ Prevented', trend: '↑ 12% this month', trendColor: '#1DB97A' },
  { icon: Leaf, color: '#1DB97A', to: 48200, format: v => `${Math.floor(v).toLocaleString()} T`, label: 'Biomass Recovered' },
  { icon: TrendingUp, color: '#FFD700', to: 2.4, format: v => `₹${v.toFixed(1)} Crore`, label: 'Total Farmer Income' },
  { icon: Handshake, color: '#FFFFFF', to: 1247, format: v => Math.floor(v).toLocaleString(), label: 'Deals Closed' },
  { icon: Award, color: '#FF8F00', to: 3100, format: v => `${Math.floor(v).toLocaleString()} CERs`, label: 'Carbon Credits' },
];

export const ImpactDashboard = () => {
  return (
    <PageTransition className="min-h-screen bg-[#0D0D0D] w-full pt-20 pb-24 overflow-x-hidden">
      <div className="w-full max-w-[1280px] mx-auto px-8">
        
        {/* PAGE HEADER */}
        <div className="mb-8 relative">
          <div className="text-[#A0A0A0] text-[11px] tracking-widest uppercase font-semibold mb-2">LIVE IMPACT TRACKER</div>
          <h2 className="text-white text-[32px] font-bold font-sans tracking-tight mb-2">National Biomass Impact Dashboard</h2>
          <p className="text-[#A0A0A0] text-[15px]">Real-time metrics across all active zones and farmer listings.</p>
          
          <div className="absolute top-0 right-0 flex items-center gap-2 text-[12px] text-[#A0A0A0] font-medium bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/5">
            <div className="w-2 h-2 rounded-full bg-[#1DB97A] animate-pulse" />
            Last updated: 2 min ago
          </div>
        </div>

        {/* TOP KPI ROW */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <GlassCard key={idx} className="p-6 relative overflow-hidden group">
                <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  <Icon size={40} color={kpi.color} />
                </div>
                <div className="font-heading font-bold text-[36px] leading-none mb-2 z-10 relative" style={{ color: kpi.color }}>
                  <Counter to={kpi.to} formatFn={kpi.format} />
                </div>
                <div className="text-[#A0A0A0] text-[12px] uppercase tracking-wider font-semibold z-10 relative">{kpi.label}</div>
                {kpi.trend && (
                  <div className="text-[12px] font-medium mt-2 z-10 relative" style={{ color: kpi.trendColor }}>
                    {kpi.trend}
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>

        {/* MIDDLE ROW */}
        <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 mb-8">
          
          {/* Line Chart */}
          <GlassCard className="p-6 flex flex-col h-[300px]">
            <h3 className="font-sans font-semibold text-[16px] text-white mb-6">CO₂ Prevented — Monthly</h3>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={co2Data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1DB97A" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#1DB97A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: '#A0A0A0', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#A0A0A0', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(17,17,17,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }} 
                    itemStyle={{ color: '#1DB97A', fontWeight: 'bold' }} 
                  />
                  <Area type="monotone" dataKey="value" stroke="#1DB97A" strokeWidth={3} fillOpacity={1} fill="url(#colorCo2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Donut Chart */}
          <GlassCard className="p-6 flex flex-col h-[300px] items-center">
            <h3 className="font-sans font-semibold text-[16px] text-white mb-2 w-full">Biomass by Crop Type</h3>
            <div className="flex-1 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={cropData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={2} dataKey="value" stroke="none">
                    {cropData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(17,17,17,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: 'white' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-2 w-full">
              {cropData.map(c => (
                <div key={c.name} className="flex items-center gap-1.5 text-[11px] text-[#A0A0A0] font-semibold tracking-wide uppercase">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                  {c.name}
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Bar Chart */}
          <GlassCard className="p-6 flex flex-col h-[300px]">
            <h3 className="font-sans font-semibold text-[16px] text-white mb-6">Income by State</h3>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stateData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: '#A0A0A0', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#A0A0A0', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
                    contentStyle={{ backgroundColor: 'rgba(17,17,17,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} 
                  />
                  <Bar dataKey="value" fill="#0B6E4F" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

        </div>

        {/* BOTTOM ROW */}
        <div className="grid grid-cols-[3fr_2fr] gap-4">
          
          {/* Live Deal Feed */}
          <GlassCard className="p-6 h-[280px] flex flex-col">
            <h3 className="font-sans font-semibold text-[16px] text-white mb-4 shrink-0">Recent Transactions</h3>
            <div className="flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#1DB97A]/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
              {transactions.map((tx, idx) => (
                <div key={tx.id} className={`flex items-center py-3 ${idx !== transactions.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <CheckCircle2 size={18} className="text-[#1DB97A] mr-3 shrink-0" />
                  <div className="flex-1 min-w-0 flex items-center gap-3">
                    <span className="text-white text-[14px] font-bold truncate">{tx.name}</span>
                    <span className="bg-white/5 text-[#A0A0A0] text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">{tx.crop}</span>
                    <span className="text-white text-[13px] font-medium whitespace-nowrap">{tx.qty}</span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 ml-4">
                    <span className="text-[#1DB97A] font-semibold text-[14px]">{tx.price}</span>
                    <span className="text-[#A0A0A0] text-[12px] w-[70px] text-right">{tx.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Carbon Credit Gauge */}
          <GlassCard className="p-6 h-[280px] flex flex-col items-center justify-center relative">
            <h3 className="font-sans font-semibold text-[16px] text-white absolute top-6 left-6">Carbon Credit Progress</h3>
            
            <div className="relative w-[180px] h-[180px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius={70} outerRadius={90} barSize={12} data={[{ name: 'CERs', value: 31, fill: '#FF8F00' }]} startAngle={180} endAngle={-180}>
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar background={{ fill: '#1a1a1a' }} dataKey="value" cornerRadius={10} />
                  <text x="50%" y="45%" textAnchor="middle" dominantBaseline="middle" className="fill-white font-bold text-[18px]">3,100 / 10,000</text>
                  <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" className="fill-[#A0A0A0] text-[11px] font-semibold uppercase tracking-widest">CERs Issued</text>
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="text-[#A0A0A0] text-[13px] mt-2 font-medium">31% of annual target</div>
            <SecondaryButton className="mt-4 border-white/10 hover:border-white/30 hover:bg-white/5 text-[13px] h-9 px-6">View Carbon Report</SecondaryButton>
          </GlassCard>

        </div>

      </div>
    </PageTransition>
  );
};
