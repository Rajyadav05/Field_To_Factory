import React, { useState } from 'react';
import { PageTransition } from '../components/layout';
import { MapContainer, TileLayer, CircleMarker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Bell, Settings, Truck, ChevronDown } from 'lucide-react';
import { GhostButton, CropBadge, RiskBadge, PrimaryButton, AlertButton, VerifiedBadge } from '../components/ui';
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { motion } from 'framer-motion';

// Dummy data
const biomassPoints = [
  { id: 1, pos: [31.1471, 75.3412], crop: 'Wheat', qty: '400T', risk: 'LOW' },
  { id: 2, pos: [29.0588, 76.0856], crop: 'Paddy', qty: '800T', risk: 'LOW' },
  { id: 3, pos: [26.8467, 80.9462], crop: 'Sugarcane', qty: '1200T', risk: 'LOW' },
  { id: 4, pos: [19.7515, 75.7139], crop: 'Cotton', qty: '200T', risk: 'LOW' },
  { id: 5, pos: [28.6139, 77.2090], crop: 'Wheat', qty: '500T', risk: 'LOW' },
  { id: 6, pos: [22.2587, 71.1924], crop: 'Cotton', qty: '150T', risk: 'LOW' },
  { id: 7, pos: [15.3173, 75.7139], crop: 'Sugarcane', qty: '850T', risk: 'LOW' },
  { id: 8, pos: [23.2599, 77.4126], crop: 'Wheat', qty: '320T', risk: 'LOW' },
];

const riskZones = [
  { id: 1, pos: [30.9010, 75.8573], risk: 'HIGH' },
  { id: 2, pos: [29.9695, 76.8226], risk: 'HIGH' },
  { id: 3, pos: [27.1767, 78.0081], risk: 'MEDIUM' },
  { id: 4, pos: [21.1458, 79.0882], risk: 'MEDIUM' },
  { id: 5, pos: [31.6340, 74.8723], risk: 'HIGH' },
];

const industryNodes = [
  { id: 1, pos: [28.7041, 77.1025], name: 'Delhi Energy Corp' },
  { id: 2, pos: [19.0760, 72.8777], name: 'Mumbai BioFuels' },
  { id: 3, pos: [22.5726, 88.3639], name: 'Kolkata Green Power' },
  { id: 4, pos: [12.9716, 77.5946], name: 'Bangalore BioPlastics' },
];

const polygons = [
  [ [31.0, 75.0], [31.5, 75.5], [31.2, 76.0], [30.8, 75.8], [30.5, 75.2] ],
  [ [30.2, 74.8], [30.6, 74.5], [30.3, 74.0], [29.9, 74.2] ],
  [ [29.5, 75.5], [29.8, 76.2], [29.0, 76.5], [28.8, 75.8] ]
];

export const IndustryDashboard = () => {
  const [activeLayers, setActiveLayers] = useState({
    'Biomass': true,
    'Burn Risk': true,
    'Logistics': false,
    'Verified Farms': false,
    'Satellite': true
  });

  const toggleLayer = (layer) => {
    setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <PageTransition className="w-full h-[calc(100vh-72px)] bg-[#0D0D0D] overflow-hidden flex flex-col p-0 m-0 max-w-none">
      
      {/* TOP COMMAND BAR */}
      <div className="h-16 shrink-0 bg-white/[0.03] border-b border-white/5 px-8 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-4">
          <span className="text-[#A0A0A0] text-[11px] tracking-widest uppercase font-semibold">
            Industry Command Center
          </span>
          <div className="w-px h-4 bg-white/20" />
          <span className="text-white text-[16px] font-semibold">
            GreenPower Industries Ltd.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-full px-3 py-1 text-xs font-semibold bg-[#1DB97A]/15 text-[#1DB97A] border border-[#1DB97A]/30">
            ● LIVE DATA
          </div>
          <div className="rounded-full px-3 py-1 text-xs font-semibold bg-[#FF8F00]/15 text-[#FF8F00]">
            14 Burn Risk Zones
          </div>
          <div className="rounded-full px-3 py-1 text-xs font-semibold bg-[#2F80ED]/15 text-[#2F80ED]">
            23 Trucks Active
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <Bell size={20} className="text-[#A0A0A0] hover:text-white cursor-pointer transition-colors" />
            <Settings size={20} className="text-[#A0A0A0] hover:text-white cursor-pointer transition-colors" />
          </div>
          <GhostButton className="border-white/20 text-[#A0A0A0] hover:text-white">
            Export Report
          </GhostButton>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 grid grid-cols-[60%_40%] overflow-hidden relative">
        
        {/* LEFT MAP PANEL */}
        <div className="relative w-full h-full bg-[#0D0D0D]">
          <MapContainer 
            center={[22.5, 80.0]} 
            zoom={5} 
            zoomControl={false}
            scrollWheelZoom={true}
            className="w-full h-full z-0"
          >
            <TileLayer
              url="https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
              attribution='&copy; CARTO'
            />
            
            {/* Layers based on toggle state */}
            {activeLayers['Burn Risk'] && polygons.map((poly, i) => (
              <Polygon 
                key={i} 
                positions={poly} 
                pathOptions={{ 
                  color: '#FF3B30', 
                  fillColor: '#FF3B30', 
                  fillOpacity: 0.12, 
                  weight: 2, 
                  className: 'animated-dash' 
                }} 
              />
            ))}

            {activeLayers['Burn Risk'] && riskZones.map(pt => (
              <CircleMarker 
                key={`risk-${pt.id}`} 
                center={pt.pos} 
                radius={12}
                pathOptions={{ color: '#FF8F00', fillColor: '#FF8F00', fillOpacity: 0.8, className: 'pulse-marker' }}
              >
                <Popup className="custom-popup">
                  <div className="bg-[#111111] p-3 rounded shadow-lg flex flex-col gap-2 min-w-[200px]">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">Burn Risk Detected</span>
                      <RiskBadge level={pt.risk} />
                    </div>
                    <span className="text-[#A0A0A0] text-xs">Estimated 300T residue at risk.</span>
                    <PrimaryButton className="w-full py-1.5 text-xs h-auto mt-1 bg-[#FF8F00] hover:bg-[#FF8F00]/80 border-none text-[#0D0D0D]">Dispatch Agent</PrimaryButton>
                  </div>
                </Popup>
              </CircleMarker>
            ))}

            {activeLayers['Biomass'] && biomassPoints.map(pt => (
              <CircleMarker 
                key={`bio-${pt.id}`} 
                center={pt.pos} 
                radius={10}
                pathOptions={{ color: '#1DB97A', fillColor: '#1DB97A', fillOpacity: 0.8, className: 'pulse-marker' }}
              >
                <Popup className="custom-popup">
                  <div className="bg-[#111111] p-3 rounded shadow-lg flex flex-col gap-3 min-w-[200px]">
                    <div className="flex items-center justify-between">
                       <span className="text-white font-semibold">Verified Farm</span>
                       <CropBadge cropName={pt.crop} />
                    </div>
                    <div className="flex justify-between items-center text-sm border-y border-white/10 py-2">
                      <span className="text-[#A0A0A0]">Available:</span>
                      <strong className="text-white">{pt.qty}</strong>
                    </div>
                    <PrimaryButton className="w-full py-2 text-xs h-auto">Procure Now</PrimaryButton>
                  </div>
                </Popup>
              </CircleMarker>
            ))}

            {industryNodes.map(pt => (
              <CircleMarker 
                key={`ind-${pt.id}`} 
                center={pt.pos} 
                radius={8}
                pathOptions={{ color: '#2F80ED', fillColor: '#2F80ED', fillOpacity: 1, className: 'pulse-marker' }}
              >
                <Popup className="custom-popup">
                  <div className="bg-[#111111] p-3 rounded shadow-lg flex flex-col gap-1 min-w-[150px]">
                    <strong className="text-white text-sm">{pt.name}</strong>
                    <span className="text-[#A0A0A0] text-xs">Your Facility</span>
                  </div>
                </Popup>
              </CircleMarker>
            ))}

          </MapContainer>

          {/* LAYER TOGGLE BAR */}
          <div className="absolute bottom-4 left-4 z-[1000] bg-white/[0.04] border border-white/[0.08] backdrop-blur-md rounded-xl p-3 flex flex-wrap gap-2 shadow-[0_4px_32px_rgba(0,0,0,0.4)]">
            {Object.keys(activeLayers).map(layer => {
              const isActive = activeLayers[layer];
              return (
                <button
                  key={layer}
                  onClick={() => toggleLayer(layer)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                    isActive 
                      ? 'bg-[#0B6E4F] text-white border border-[#0B6E4F]' 
                      : 'bg-transparent text-[#1DB97A] border border-[#0B6E4F]/50 hover:border-[#1DB97A]/50'
                  }`}
                >
                  {layer}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full h-full bg-[#111111] border-l border-white/5 flex flex-col overflow-hidden">
          
          {/* KPI WIDGET GRID */}
          <div className="grid grid-cols-2 gap-3 p-4 shrink-0">
            {/* 1. Available Biomass */}
            <GlassCard className="p-4 flex flex-col justify-center">
              <div className="font-heading font-bold text-[28px] text-[#1DB97A] leading-none mb-1">48,200 T</div>
              <div className="text-[#A0A0A0] text-[11px] uppercase tracking-wider font-semibold">Available Biomass</div>
              <div className="w-full h-1 bg-[#1a1a1a] rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-[#1DB97A] rounded-full" style={{ width: '78%' }} />
              </div>
            </GlassCard>

            {/* 2. Burn Risk Zones */}
            <GlassCard className="p-4 flex flex-col justify-center">
              <div className="font-heading font-bold text-[28px] text-[#FF8F00] leading-none mb-1">14 Active</div>
              <div className="text-[#A0A0A0] text-[11px] uppercase tracking-wider font-semibold mb-1">Burn Risk Zones</div>
              <div className="text-[#FF3B30] text-[12px] font-medium">↑ 3 since yesterday</div>
            </GlassCard>

            {/* 3. Verified Farms */}
            <GlassCard className="p-4 flex flex-col justify-center">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-heading font-bold text-[28px] text-white leading-none mb-1">1,840</div>
                  <div className="text-[#A0A0A0] text-[11px] uppercase tracking-wider font-semibold">Verified Farms</div>
                </div>
                <div className="bg-[#1DB97A]/20 text-[#1DB97A] text-[10px] font-bold px-2 py-0.5 rounded-full">+12 today</div>
              </div>
            </GlassCard>

            {/* 4. Carbon Savings */}
            <GlassCard className="p-4 flex items-center justify-between">
              <div className="flex flex-col justify-center">
                <div className="font-heading font-bold text-[28px] text-[#2F80ED] leading-none mb-1">3.1M kg</div>
                <div className="text-[#A0A0A0] text-[11px] uppercase tracking-wider font-semibold">CO₂ Prevented</div>
              </div>
              <div className="w-[48px] h-[48px] relative shrink-0">
                 <RadialBarChart width={48} height={48} cx={24} cy={24} innerRadius={18} outerRadius={24} barSize={4} data={[{ name: 'Savings', value: 62, fill: '#2F80ED' }]} startAngle={90} endAngle={-270}>
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar background={{ fill: '#1a1a1a' }} dataKey="value" cornerRadius={10} />
                 </RadialBarChart>
              </div>
            </GlassCard>

            {/* 5. Logistics */}
            <GlassCard className="p-4 col-span-2 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FF8F00]/20 text-[#FF8F00] flex items-center justify-center shrink-0">
                <Truck size={20} />
              </div>
              <div className="flex items-center gap-3 text-[14px] text-white font-medium">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#1DB97A] animate-pulse" />
                    23 Trucks Active
                 </div>
                 <span className="text-white/20">•</span>
                 <span>6 En Route</span>
                 <span className="text-white/20">•</span>
                 <span>4 Loading</span>
              </div>
            </GlassCard>
          </div>

          {/* LISTING CARDS SECTION */}
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <div className="flex items-center justify-between mb-4 mt-2">
              <div className="flex items-center gap-2">
                <span className="font-sans font-semibold text-[14px] text-white">Available Supply</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer group">
                <span className="text-[#A0A0A0] text-[12px] group-hover:text-white transition-colors">Sorted by Burn Risk ↓</span>
                <ChevronDown size={14} className="text-[#A0A0A0]" />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { name: 'Rajinder Singh Farm', loc: 'Ludhiana, Punjab • 47 km', crop: 'Rice Straw', risk: 'HIGH', qty: '4.2 T', mst: '12.4%', ndvi: '0.68', ndti: '0.42', price: '₹3,200–₹3,800/T', conf: '94%' },
                { name: 'Harpreet Agrotech', loc: 'Moga, Punjab • 62 km', crop: 'Wheat Straw', risk: 'HIGH', qty: '8.5 T', mst: '14.1%', ndvi: '0.72', ndti: '0.38', price: '₹3,100–₹3,600/T', conf: '89%' },
                { name: 'Khalsa Farms Ltd.', loc: 'Jalandhar, Punjab • 38 km', crop: 'Rice Straw', risk: 'MEDIUM', qty: '2.1 T', mst: '11.8%', ndvi: '0.65', ndti: '0.45', price: '₹3,400–₹3,900/T', conf: '96%' },
                { name: 'Daljit Singh & Sons', loc: 'Patiala, Punjab • 85 km', crop: 'Sugarcane', risk: 'MEDIUM', qty: '12.0 T', mst: '18.2%', ndvi: '0.81', ndti: '0.52', price: '₹2,800–₹3,100/T', conf: '82%' },
                { name: 'Gurdev Organics', loc: 'Amritsar, Punjab • 110 km', crop: 'Cotton', risk: 'LOW', qty: '1.8 T', mst: '9.5%', ndvi: '0.58', ndti: '0.33', price: '₹4,100–₹4,500/T', conf: '91%' },
              ].map((listing, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
                >
                  <GlassCard className="p-4 hover:border-[rgba(255,143,0,0.4)] transition-colors duration-300">
                    
                    {/* Top Row: Badges */}
                    <div className="flex items-center gap-2 mb-3">
                      <CropBadge cropName={listing.crop} />
                      <RiskBadge level={listing.risk} />
                      <VerifiedBadge />
                    </div>

                    {/* Farm Details */}
                    <div className="mb-3">
                      <div className="font-sans font-semibold text-[14px] text-white">{listing.name}</div>
                      <div className="text-[#A0A0A0] text-[12px]">{listing.loc}</div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-4 gap-2 mb-4 bg-white/[0.02] rounded-lg p-2 border border-white/5">
                      <div className="flex flex-col">
                        <span className="text-[#A0A0A0] text-[10px] uppercase tracking-wider mb-0.5">Qty</span>
                        <span className="text-white text-[12px] font-semibold">{listing.qty}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[#A0A0A0] text-[10px] uppercase tracking-wider mb-0.5">Moisture</span>
                        <span className="text-white text-[12px] font-semibold">{listing.mst}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[#A0A0A0] text-[10px] uppercase tracking-wider mb-0.5">NDVI</span>
                        <span className="text-white text-[12px] font-semibold">{listing.ndvi}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[#A0A0A0] text-[10px] uppercase tracking-wider mb-0.5">NDTI</span>
                        <span className="text-white text-[12px] font-semibold">{listing.ndti}</span>
                      </div>
                    </div>

                    {/* Price Row */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-heading font-bold text-[18px] text-[#1DB97A]">{listing.price}</div>
                      <div className="bg-[#1DB97A]/15 text-[#1DB97A] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        AI Conf: {listing.conf}
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-3 w-full">
                      <GhostButton className="flex-1 h-10 text-xs border-white/10">View on Map</GhostButton>
                      <AlertButton className="flex-1 h-10 text-xs px-2 whitespace-nowrap">Reserve Before Burn</AlertButton>
                    </div>

                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* DEAL TICKER */}
          <div className="shrink-0 h-10 bg-white/[0.03] border-t border-white/5 overflow-hidden flex items-center relative z-20">
            <div className="animate-ticker text-[#1DB97A] text-[12px] font-medium tracking-wide">
              ✓ 3.2T Rice Straw reserved — Amritsar → BioEnergy Ludhiana — ₹10,240 — 2 min ago &nbsp;&nbsp;•&nbsp;&nbsp; ✓ 1.8T Wheat Straw — Karnal → GreenPower Plant — ₹6,120 — 5 min ago &nbsp;&nbsp;•&nbsp;&nbsp; ✓ 5.4T Sugarcane — Muzaffarnagar → Delhi Energy Corp — ₹18,900 — 12 min ago
            </div>
          </div>

        </div>

      </div>
    </PageTransition>
  );
};
