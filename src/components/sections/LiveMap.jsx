import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { GlassCard } from '../layout';
import { CropBadge, RiskBadge, PrimaryButton } from '../ui';
import { Leaf } from 'lucide-react';

const mapData = [
  // Biomass (Green)
  { id: 1, pos: [31.1471, 75.3412], type: 'biomass', crop: 'Wheat', qty: '400T', risk: 'LOW' },
  { id: 2, pos: [29.0588, 76.0856], type: 'biomass', crop: 'Paddy', qty: '800T', risk: 'LOW' },
  { id: 3, pos: [26.8467, 80.9462], type: 'biomass', crop: 'Sugarcane', qty: '1200T', risk: 'LOW' },
  { id: 4, pos: [19.7515, 75.7139], type: 'biomass', crop: 'Cotton', qty: '200T', risk: 'LOW' },
  
  // Burn Risk (Orange)
  { id: 5, pos: [30.9010, 75.8573], type: 'risk', crop: 'Paddy', qty: '500T', risk: 'HIGH' },
  { id: 6, pos: [29.9695, 76.8226], type: 'risk', crop: 'Wheat', qty: '300T', risk: 'HIGH' },
  { id: 7, pos: [27.1767, 78.0081], type: 'risk', crop: 'Sugarcane', qty: '900T', risk: 'MEDIUM' },
  { id: 8, pos: [21.1458, 79.0882], type: 'risk', crop: 'Cotton', qty: '150T', risk: 'MEDIUM' },

  // Industry (Blue)
  { id: 9, pos: [28.7041, 77.1025], type: 'industry', name: 'Delhi Energy Corp' },
  { id: 10, pos: [19.0760, 72.8777], type: 'industry', name: 'Mumbai BioFuels' },
  { id: 11, pos: [22.5726, 88.3639], type: 'industry', name: 'Kolkata Green Power' },
  { id: 12, pos: [12.9716, 77.5946], type: 'industry', name: 'Bangalore BioPlastics' },
];

export const LiveMap = () => {
  const [activeLayer, setActiveLayer] = useState('Biomass');

  const layers = ['Biomass', 'Burn Risk', 'Industries', 'Logistics', 'Satellite'];

  return (
    <section className="w-full py-32 bg-[#0D0D0D] px-4">
      <div className="max-w-[1280px] mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="text-[#1DB97A] text-[11px] tracking-widest uppercase font-sans font-semibold mb-3">
            LIVE INTELLIGENCE LAYER
          </div>
          <h2 className="font-heading font-bold text-[48px] text-[#F5F5F5] tracking-tight leading-none mb-4">
            National Biomass Network
          </h2>
          <p className="font-sans font-normal text-[16px] text-[#A0A0A0]">
            Real-time satellite data across Punjab, Haryana, UP, and Maharashtra
          </p>
        </div>

        {/* Map Container */}
        <div className="relative w-full h-[560px] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
          <MapContainer 
            center={[22.5, 80.0]} 
            zoom={5} 
            scrollWheelZoom={false}
            className="w-full h-full bg-[#0D0D0D] z-0"
          >
            <TileLayer
              url="https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />
            {mapData.map(pt => {
              // Map Colors
              let color = '#1DB97A'; // green
              if (pt.type === 'risk') color = '#FF8F00'; // orange
              if (pt.type === 'industry') color = '#2F80ED'; // blue

              return (
                <CircleMarker 
                  key={pt.id} 
                  center={pt.pos} 
                  radius={10}
                  pathOptions={{ color, fillColor: color, fillOpacity: 0.6, className: 'animate-pulse' }}
                >
                  <Popup className="custom-popup">
                    <div className="bg-[#111111] p-3 rounded shadow-lg flex flex-col gap-3 min-w-[200px]">
                      {pt.type === 'industry' ? (
                        <>
                          <strong className="text-white text-sm">{pt.name}</strong>
                          <span className="text-[#A0A0A0] text-xs">Bio-processing Facility</span>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-between">
                            <CropBadge cropName={pt.crop} icon={Leaf} />
                            <RiskBadge level={pt.risk} />
                          </div>
                          <div className="flex justify-between items-center text-sm border-y border-white/10 py-2">
                            <span className="text-[#A0A0A0]">Available:</span>
                            <strong className="text-white">{pt.qty}</strong>
                          </div>
                          <PrimaryButton className="w-full py-2 text-xs h-auto px-4">Reserve Now</PrimaryButton>
                        </>
                      )}
                    </div>
                  </Popup>
                </CircleMarker>
              )
            })}
          </MapContainer>

          {/* Floating Toggle Bar */}
          <GlassCard className="absolute bottom-6 left-6 z-[1000] p-3 flex flex-wrap gap-2">
            {layers.map(layer => {
              const isActive = activeLayer === layer;
              return (
                <button
                  key={layer}
                  onClick={() => setActiveLayer(layer)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                    isActive 
                      ? 'bg-[#1DB97A] text-[#0D0D0D] border border-[#1DB97A]' 
                      : 'bg-transparent text-[#1DB97A] border border-[#1DB97A]/30 hover:border-[#1DB97A]'
                  }`}
                >
                  {layer}
                </button>
              );
            })}
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
