import React, { useState, useEffect } from 'react';
import { PageTransition } from '../components/layout';
import { MapContainer, TileLayer, CircleMarker, Popup, Polygon, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Factory, Satellite } from 'lucide-react';
import { CropBadge } from '../components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { industryService } from '../services/industryService';
import { useNavigate } from 'react-router-dom';
import { TraceConvoyModal } from '../components/TraceConvoyModal';

export const IndustryDashboard = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [activeLayers, setActiveLayers] = useState({
    'Supply Nodes': true,
    'Logistics Feed': true,
    'Thermal Anomalies': true,
    'Industry Hubs': true
  });

  const [mapData, setMapData] = useState({
    biomassListings: [],
    industryNodes: [],
    riskZones: [],
    polygons: []
  });

  const navigate = useNavigate();
  const [traceListing, setTraceListing] = useState(null);
  const [nearestIndForTrace, setNearestIndForTrace] = useState(null);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const data = await industryService.getMapData();
        setMapData(data);
      } catch (err) {
        console.error('Failed to load map data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMapData();
  }, []);

  const toggleLayer = (layer) => {
    setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const getNearestIndustry = (farmPos) => {
    if (!mapData.industryNodes.length) return null;
    let nearest = mapData.industryNodes[0];
    let minDist = Math.pow(farmPos[0]-nearest.pos[0], 2) + Math.pow(farmPos[1]-nearest.pos[1], 2);
    for (let i=1; i<mapData.industryNodes.length; i++) {
      let d = Math.pow(farmPos[0]-mapData.industryNodes[i].pos[0], 2) + Math.pow(farmPos[1]-mapData.industryNodes[i].pos[1], 2);
      if (d < minDist) {
        minDist = d;
        nearest = mapData.industryNodes[i];
      }
    }
    return nearest;
  };

  const handleTrace = (listing) => {
    const nearest = getNearestIndustry(listing.pos);
    setNearestIndForTrace(nearest);
    setTraceListing(listing);
  };

  if (loading) {
    return (
      <div className="w-full h-[calc(100vh-80px)] bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Satellite className="text-[#00E5FF] animate-pulse w-8 h-8" />
          <span className="text-[#00E5FF] font-mono text-xs tracking-widest uppercase animate-pulse">Initializing Telemetry...</span>
        </div>
      </div>
    );
  }

  return (
    <PageTransition className="w-full h-[calc(100vh-80px)] bg-[#050505] overflow-hidden flex flex-col p-0 m-0 max-w-none relative">
      
      {/* TOP COMMAND BAR (HUD STYLE) */}
      <div className="h-14 shrink-0 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#00E5FF]/20 px-6 flex items-center justify-between z-20 absolute top-0 w-full shadow-[0_4px_20px_rgba(0,229,255,0.05)]">
        <div className="flex items-center gap-4">
          <Satellite size={18} className="text-[#00E5FF]" />
          <span className="text-[#00E5FF] text-[12px] tracking-[0.2em] uppercase font-bold font-mono">
            Command Center
          </span>
          <div className="w-px h-4 bg-white/20" />
          <span className="text-white/80 text-[13px] font-semibold tracking-wide">
            Maharashtra Eco-Industrial Network
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-sm bg-[#FF3B30]/10 border border-[#FF3B30]/30">
             <div className="w-1.5 h-1.5 rounded-full bg-[#FF3B30] animate-pulse" />
             <span className="text-[#FF3B30] text-[10px] uppercase font-mono font-bold tracking-widest">{mapData.riskZones.length} Anomalies</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-sm bg-[#00E5FF]/10 border border-[#00E5FF]/30">
             <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
             <span className="text-[#00E5FF] text-[10px] uppercase font-mono font-bold tracking-widest">Live Telemetry</span>
          </div>
        </div>
      </div>

      {/* MAP LAYER (FULL SCREEN) */}
      <div className="absolute inset-0 z-0 pt-14">
        <MapContainer 
          center={[19.75, 75.71]} // Centered on Maharashtra
          zoom={7} 
          zoomControl={false}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <TileLayer
            url="https://cartodb-basemaps-a.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png"
            attribution='&copy; CARTO'
          />
          
          {/* Burn Risk Polygons */}
          {activeLayers['Thermal Anomalies'] && mapData.polygons.map((poly, i) => (
            <Polygon 
              key={i} 
              positions={poly} 
              pathOptions={{ color: '#FF3B30', fillColor: '#FF3B30', fillOpacity: 0.15, weight: 1, className: 'pulse-poly' }} 
            />
          ))}

          {/* Hotspot Markers */}
          {activeLayers['Thermal Anomalies'] && mapData.riskZones.map(pt => (
            <CircleMarker 
              key={`risk-${pt.id}`} 
              center={pt.pos} 
              radius={8}
              pathOptions={{ color: '#FF8F00', fillColor: '#FF8F00', fillOpacity: 0.8, className: 'pulse-marker' }}
            />
          ))}

          {/* Logistics Lines */}
          {activeLayers['Logistics Feed'] && mapData.biomassListings.map(pt => {
            const nearest = getNearestIndustry(pt.pos);
            if (!nearest) return null;
            return (
              <Polyline 
                key={`line-${pt.id}`}
                positions={[pt.pos, nearest.pos]}
                pathOptions={{ color: '#00E5FF', weight: 2, dashArray: '4 8', opacity: 0.6, className: 'logistics-line' }}
              />
            );
          })}

          {/* Industry Hubs */}
          {activeLayers['Industry Hubs'] && mapData.industryNodes.map(pt => (
            <CircleMarker 
              key={`ind-${pt.id}`} 
              center={pt.pos} 
              radius={12}
              pathOptions={{ color: '#00E5FF', fillColor: '#00E5FF', fillOpacity: 0.2, weight: 2 }}
            >
              <Popup className="custom-popup">
                <div className="bg-[#050505] border border-[#00E5FF]/40 p-3 rounded flex flex-col gap-1 min-w-[150px]">
                  <div className="flex items-center gap-2 text-[#00E5FF]">
                    <Factory size={14} />
                    <strong className="text-white text-xs font-mono uppercase tracking-wider">{pt.name}</strong>
                  </div>
                  <span className="text-[#00E5FF]/60 text-[10px] font-mono">Processing Hub (Active)</span>
                </div>
              </Popup>
            </CircleMarker>
          ))}

          {/* Supply Nodes (Farms) */}
          {activeLayers['Supply Nodes'] && mapData.biomassListings.map(pt => (
            <CircleMarker 
              key={`bio-${pt.id}`} 
              center={pt.pos} 
              radius={6}
              pathOptions={{ color: '#1DB97A', fillColor: '#1DB97A', fillOpacity: 1, weight: 2 }}
            >
              <Popup className="custom-popup">
                <div className="bg-[#050505] border border-[#1DB97A]/40 p-3 rounded flex flex-col gap-3 min-w-[200px]">
                  <div className="flex items-center justify-between">
                     <span className="text-white font-mono text-xs uppercase tracking-wider">{pt.farmerName}</span>
                     <CropBadge cropName={pt.crop} />
                  </div>
                  <div className="flex justify-between items-center text-xs border-y border-white/10 py-2">
                    <span className="text-[#A0A0A0] font-mono">SUPPLY_VOL:</span>
                    <strong className="text-[#1DB97A] font-mono">{pt.qty} MT</strong>
                  </div>
                  <button className="w-full py-1.5 text-[10px] font-mono tracking-widest h-auto bg-[#1DB97A] hover:bg-[#159461] transition-colors text-[#050505] rounded-sm font-bold uppercase">Initiate Procurement</button>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* HUD LAYER TOGGLES (Floating Left) */}
      <div className="absolute top-20 left-4 z-[100] flex flex-col gap-2">
        {Object.keys(activeLayers).map(layer => {
          const isActive = activeLayers[layer];
          return (
            <button
              key={layer}
              onClick={() => toggleLayer(layer)}
              className={`px-3 py-1.5 rounded-sm text-[10px] font-mono font-bold tracking-widest uppercase transition-all duration-200 backdrop-blur-md text-left w-48 shadow-lg ${
                isActive 
                  ? 'bg-[#00E5FF]/20 text-[#00E5FF] border-l-2 border-[#00E5FF]' 
                  : 'bg-[#0A0A0A]/80 text-[#A0A0A0] border-l-2 border-transparent hover:text-white'
              }`}
            >
              [{isActive ? 'ON' : 'OFF'}] {t(`industry.${layer.toLowerCase().replace(' ', '_')}`, layer)}
            </button>
          );
        })}
      </div>

      {/* RIGHT PANEL OVERLAY (PALANTIR HUD STYLE) */}
      <div className="absolute top-14 bottom-0 right-0 w-full md:w-[450px] lg:w-[500px] bg-[#0A0A0A]/90 backdrop-blur-xl border-l border-[#00E5FF]/20 flex flex-col overflow-hidden z-[100] shadow-[-20px_0_40px_rgba(0,0,0,0.8)] pointer-events-auto">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px)', backgroundSize: '100% 4px' }} />

        {/* TELEMETRY KPI WIDGETS */}
        <div className="grid grid-cols-2 gap-px bg-[#00E5FF]/20 shrink-0">
          <div className="bg-[#0A0A0A] p-5 flex flex-col justify-center border-b border-[#00E5FF]/10">
            <div className="text-[#00E5FF] text-[10px] font-mono tracking-widest uppercase mb-1">Total Supply</div>
            <div className="font-heading font-bold text-[28px] text-white leading-none">48.2K <span className="text-[14px] text-[#A0A0A0]">MT</span></div>
          </div>
          <div className="bg-[#0A0A0A] p-5 flex flex-col justify-center border-b border-[#00E5FF]/10 border-l border-[#00E5FF]/10">
            <div className="text-[#FF3B30] text-[10px] font-mono tracking-widest uppercase mb-1">Anomalies</div>
            <div className="font-heading font-bold text-[28px] text-white leading-none">{mapData.riskZones.length} <span className="text-[14px] text-[#FF3B30] animate-pulse">DETECTED</span></div>
          </div>
          <div className="bg-[#0A0A0A] p-5 flex flex-col justify-center border-b border-[#00E5FF]/10">
            <div className="text-[#00E5FF] text-[10px] font-mono tracking-widest uppercase mb-1">Active Convoys</div>
            <div className="font-heading font-bold text-[28px] text-white leading-none">23 <span className="text-[14px] text-[#1DB97A]">EN ROUTE</span></div>
          </div>
          <div className="bg-[#0A0A0A] p-5 flex flex-col justify-center border-b border-[#00E5FF]/10 border-l border-[#00E5FF]/10">
             <div className="text-[#00E5FF] text-[10px] font-mono tracking-widest uppercase mb-1">Mitigated</div>
             <div className="font-heading font-bold text-[28px] text-[#00E5FF] leading-none">3.1M <span className="text-[14px] text-[#A0A0A0]">KG</span></div>
          </div>
        </div>

        {/* LISTING CARDS SECTION */}
        <div className="flex-1 overflow-y-auto p-5 z-10 relative custom-scrollbar">
          <div className="flex items-center justify-between mb-4 border-b border-[#00E5FF]/20 pb-2">
            <span className="font-mono font-bold text-[11px] text-[#00E5FF] uppercase tracking-widest">Procurement Targets</span>
          </div>

          <div className="flex flex-col gap-3">
            {mapData.biomassListings.map((listing, i) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-[#050505] border border-[#00E5FF]/20 hover:border-[#00E5FF]/60 p-4 relative group overflow-hidden shadow-lg transition-all"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00E5FF]/40 group-hover:bg-[#00E5FF] transition-colors" />
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#1DB97A]/10 text-[#1DB97A] text-[9px] font-mono px-2 py-0.5 border border-[#1DB97A]/30 uppercase">{listing.crop}</span>
                  <span className={`bg-[#FF3B30]/10 text-[#FF3B30] text-[9px] font-mono px-2 py-0.5 border border-[#FF3B30]/30 uppercase ${listing.risk === 'HIGH' ? 'animate-pulse' : ''}`}>{listing.risk} RISK</span>
                </div>

                <div className="mb-4">
                  <div className="font-mono font-bold text-[15px] text-white uppercase tracking-wider">{listing.farmerName}</div>
                  <div className="text-[#00E5FF]/70 font-mono text-[10px] uppercase tracking-widest">{listing.loc}</div>
                </div>

                <div className="grid grid-cols-4 gap-1 mb-4 bg-[#0A0A0A] p-2 border border-[#00E5FF]/10">
                  <div className="flex flex-col items-center border-r border-[#00E5FF]/10">
                    <span className="text-[#A0A0A0] text-[9px] font-mono uppercase">VOL</span>
                    <span className="text-white text-[12px] font-mono font-bold">{listing.qty}</span>
                  </div>
                  <div className="flex flex-col items-center border-r border-[#00E5FF]/10">
                    <span className="text-[#A0A0A0] text-[9px] font-mono uppercase">MST</span>
                    <span className="text-white text-[12px] font-mono font-bold">{listing.mst}</span>
                  </div>
                  <div className="flex flex-col items-center border-r border-[#00E5FF]/10">
                    <span className="text-[#A0A0A0] text-[9px] font-mono uppercase">NDVI</span>
                    <span className="text-white text-[12px] font-mono font-bold">{listing.ndvi}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[#A0A0A0] text-[9px] font-mono uppercase">CONF</span>
                    <span className="text-[#1DB97A] text-[12px] font-mono font-bold">{listing.conf}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full">
                  <button onClick={() => handleTrace(listing)} className="flex-1 h-9 text-[10px] font-mono font-bold uppercase tracking-widest border border-[#00E5FF]/30 text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-colors">Trace</button>
                  <button onClick={() => navigate(`/transaction/${listing.id}`)} className="flex-[2] h-9 text-[10px] font-mono font-bold uppercase tracking-widest bg-[#1DB97A] text-[#050505] hover:bg-[#159461] transition-colors shadow-[0_0_15px_rgba(29,185,122,0.2)] hover:shadow-[0_0_20px_rgba(29,185,122,0.4)]">Execute Buy</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <TraceConvoyModal 
        isOpen={!!traceListing} 
        onClose={() => setTraceListing(null)} 
        listing={traceListing} 
        nearestIndustry={nearestIndForTrace} 
      />

      <style>{`
        .logistics-line { animation: dash 20s linear infinite; }
        @keyframes dash { to { stroke-dashoffset: -100; } }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,229,255,0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,229,255,0.3); }
      `}</style>
    </PageTransition>
  );
};
