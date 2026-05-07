import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { X, Truck, Factory, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from './ui';

// Create custom icons for Leaflet
const truckIconHtml = `<div style="background-color: #050505; border: 2px solid #00E5FF; color: #00E5FF; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px rgba(0, 229, 255, 0.5);"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-9h-4V5H14v12h3"/><path d="M14 17H5"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg></div>`;
const truckIcon = L.divIcon({ html: truckIconHtml, className: '', iconSize: [24, 24], iconAnchor: [12, 12] });

export const TraceConvoyModal = ({ isOpen, onClose, listing, nearestIndustry }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (isOpen) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            return 100;
          }
          return p + 0.5; // Slow increment
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen || !listing || !nearestIndustry) return null;

  // Calculate intermediate points for polyline
  const farmerPos = listing.pos;
  const industryPos = nearestIndustry.pos;
  const collectionHubPos = [
    farmerPos[0] + (industryPos[0] - farmerPos[0]) * 0.3,
    farmerPos[1] + (industryPos[1] - farmerPos[1]) * 0.3
  ];

  const currentLat = farmerPos[0] + (industryPos[0] - farmerPos[0]) * (progress / 100);
  const currentLng = farmerPos[1] + (industryPos[1] - farmerPos[1]) * (progress / 100);
  const currentPos = [currentLat, currentLng];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex justify-center items-center bg-[#050505]/95 backdrop-blur-xl p-4 md:p-8"
        >
          <div className="w-full h-full max-w-[1200px] max-h-[800px] bg-[#0A0A0A] border border-[#00E5FF]/20 flex flex-col md:flex-row relative overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.1)]">
            
            {/* LEFT PANEL: Details */}
            <div className="w-full md:w-[400px] h-full flex flex-col border-b md:border-b-0 md:border-r border-[#00E5FF]/20 bg-[#050505] z-10 shrink-0 p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-[#00E5FF] w-6 h-6" />
                  <span className="font-mono text-[12px] text-[#00E5FF] uppercase tracking-widest font-bold">Convoy Tracker</span>
                </div>
                <button onClick={onClose} className="text-[#A0A0A0] hover:text-white transition-colors p-2 -mr-2"><X size={20} /></button>
              </div>

              <div className="mb-8">
                <h2 className="font-heading font-extrabold text-[28px] text-white uppercase tracking-tight leading-none mb-2">{listing.farmerName}</h2>
                <div className="flex items-center gap-2 text-[#A0A0A0] font-mono text-[12px] uppercase tracking-widest">
                  <MapPin size={12}/> {listing.loc}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="bg-[#111111] border border-white/5 p-4 flex flex-col">
                   <span className="text-[#A0A0A0] text-[9px] font-mono uppercase">Cargo Volume</span>
                   <span className="text-white font-bold font-mono text-[16px]">{listing.qty} MT</span>
                 </div>
                 <div className="bg-[#111111] border border-white/5 p-4 flex flex-col">
                   <span className="text-[#A0A0A0] text-[9px] font-mono uppercase">Commodity</span>
                   <span className="text-[#1DB97A] font-bold font-mono text-[14px] uppercase">{listing.crop}</span>
                 </div>
                 <div className="bg-[#111111] border border-white/5 p-4 flex flex-col">
                   <span className="text-[#A0A0A0] text-[9px] font-mono uppercase">Quality (MST)</span>
                   <span className="text-white font-bold font-mono text-[16px]">{listing.mst}</span>
                 </div>
                 <div className="bg-[#111111] border border-white/5 p-4 flex flex-col">
                   <span className="text-[#A0A0A0] text-[9px] font-mono uppercase">AI Confidence</span>
                   <span className="text-[#00E5FF] font-bold font-mono text-[16px]">{listing.conf}</span>
                 </div>
              </div>

              {/* Routing Info */}
              <div className="bg-[#00E5FF]/5 border border-[#00E5FF]/20 p-5 mb-8 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-[#00E5FF]" />
                 <h3 className="font-mono text-[10px] text-[#00E5FF] uppercase tracking-widest mb-4">Logistics Telemetry</h3>
                 
                 <div className="flex justify-between items-center mb-3">
                   <span className="text-[#A0A0A0] font-mono text-[12px]">Est. Distance</span>
                   <span className="text-white font-mono text-[14px] font-bold">142 km</span>
                 </div>
                 <div className="flex justify-between items-center mb-4">
                   <span className="text-[#A0A0A0] font-mono text-[12px]">Convoy ETA</span>
                   <span className="text-[#00E5FF] font-mono text-[14px] font-bold flex items-center gap-2"><Clock size={14}/> 4.2 hrs</span>
                 </div>

                 {/* Progress Bar */}
                 <div className="w-full h-1.5 bg-[#111111] overflow-hidden rounded-full mt-6 mb-2 relative">
                    <div className="absolute top-0 left-0 h-full bg-[#00E5FF] transition-all duration-300" style={{ width: `${progress}%` }} />
                 </div>
                 <div className="flex justify-between text-[9px] font-mono uppercase tracking-widest text-[#A0A0A0]">
                   <span>Dispatched</span>
                   <span>Arriving</span>
                 </div>
              </div>

              <div className="mt-auto">
                 <PrimaryButton className="w-full h-12 bg-[#00E5FF] hover:bg-[#00B3CC] text-[#050505] font-mono text-[12px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                   <Truck size={18} /> Connect to Driver
                 </PrimaryButton>
              </div>
            </div>

            {/* RIGHT PANEL: Map */}
            <div className="flex-1 h-full relative z-0 bg-[#0A0A0A]">
               <MapContainer 
                  bounds={[farmerPos, industryPos]} 
                  zoomControl={false}
                  scrollWheelZoom={true}
                  className="w-full h-full"
                  padding={[50, 50]}
                >
                  <TileLayer
                    url="https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                    attribution='&copy; CARTO'
                  />

                  {/* Route Polyline (Full) */}
                  <Polyline positions={[farmerPos, collectionHubPos, industryPos]} pathOptions={{ color: '#00E5FF', weight: 2, dashArray: '4 8', opacity: 0.3 }} />
                  
                  {/* Route Polyline (Completed) */}
                  <Polyline positions={[farmerPos, currentPos]} pathOptions={{ color: '#00E5FF', weight: 3, opacity: 1, className: 'glowing-line' }} />

                  {/* Farmer Node */}
                  <CircleMarker center={farmerPos} radius={8} pathOptions={{ color: '#1DB97A', fillColor: '#1DB97A', fillOpacity: 1, weight: 2 }}>
                    <Popup className="custom-popup"><div className="bg-[#050505] p-2 border border-[#1DB97A]/40 text-[#1DB97A] font-mono text-[10px] uppercase">Origin Node</div></Popup>
                  </CircleMarker>

                  {/* Collection Hub */}
                  <CircleMarker center={collectionHubPos} radius={6} pathOptions={{ color: '#A0A0A0', fillColor: '#111111', fillOpacity: 1, weight: 2 }}>
                    <Popup className="custom-popup"><div className="bg-[#050505] p-2 border border-white/20 text-[#A0A0A0] font-mono text-[10px] uppercase">Collection Hub</div></Popup>
                  </CircleMarker>

                  {/* Industry Node */}
                  <CircleMarker center={industryPos} radius={12} pathOptions={{ color: '#00E5FF', fillColor: '#00E5FF', fillOpacity: 0.2, weight: 2 }}>
                    <Popup className="custom-popup"><div className="bg-[#050505] p-2 border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-[10px] uppercase flex items-center gap-2"><Factory size={12}/> Destination</div></Popup>
                  </CircleMarker>

                  {/* Live Truck Marker */}
                  <Marker position={currentPos} icon={truckIcon} />

                </MapContainer>
                
                {/* Overlay Vignette */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(5,5,5,0.8)] z-[1000]" />
            </div>

          </div>
          <style>{`
             .glowing-line { filter: drop-shadow(0 0 8px rgba(0,229,255,0.6)); }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
