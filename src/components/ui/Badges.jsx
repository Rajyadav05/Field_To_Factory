import React from 'react';
import { Check, ShieldAlert, ShieldCheck, Shield } from 'lucide-react';

export const VerifiedBadge = ({ className = '' }) => {
  return (
    <span className={`inline-flex items-center gap-1.5 bg-[rgba(11,110,79,0.2)] border border-[#0B6E4F] text-[#1DB97A] text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded ${className}`}>
      <Check className="w-3.5 h-3.5" />
      SATELLITE VERIFIED
    </span>
  );
};

export const RiskBadge = ({ level, className = '' }) => {
  let styles = '';
  let Icon = Shield;
  
  switch (level?.toUpperCase()) {
    case 'HIGH':
      styles = 'bg-red-500/20 border-red-500/50 text-red-400';
      Icon = ShieldAlert;
      break;
    case 'MEDIUM':
      styles = 'bg-orange-500/20 border-orange-500/50 text-orange-400';
      Icon = ShieldAlert;
      break;
    case 'LOW':
      styles = 'bg-green-500/20 border-green-500/50 text-green-400';
      Icon = ShieldCheck;
      break;
    default:
      styles = 'bg-gray-500/20 border-gray-500/50 text-gray-400';
      Icon = Shield;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 border text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded ${styles} ${className}`}>
      <Icon className="w-3.5 h-3.5" />
      {level} RISK
    </span>
  );
};

export const CropBadge = ({ cropName, icon: Icon, className = '' }) => {
  return (
    <span className={`inline-flex items-center gap-1.5 bg-[rgba(255,143,0,0.15)] text-[#FF8F00] text-xs font-semibold px-3 py-1 rounded-full ${className}`}>
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {cropName}
    </span>
  );
};
