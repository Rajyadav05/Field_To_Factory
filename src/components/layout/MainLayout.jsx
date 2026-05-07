import React from 'react';
import { Navbar } from './Navbar';
import { Leaf } from 'lucide-react';

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col font-sans text-[#F5F5F5]">
      <Navbar />
      
      {/* Main Content Area */}
      <main className="flex-grow flex flex-col">
        {children}
      </main>

      {/* Enterprise Footer */}
      <footer className="bg-[#0A0A0A] border-t border-white/[0.04] py-20 px-6 lg:px-12 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#0B6E4F]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-[1440px] mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-20">
            
            {/* Left: Branding & Value Prop */}
            <div className="col-span-1 md:col-span-12 lg:col-span-4 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0B6E4F]/10 border border-[#0B6E4F]/30 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-[#0B6E4F]" />
                </div>
                <span className="font-heading font-extrabold text-[15px] tracking-[0.2em] uppercase text-white/90">
                  Field<span className="text-white/30 px-1">×</span>Factory
                </span>
              </div>
              <p className="text-[#A0A0A0] text-[15px] leading-relaxed max-w-sm font-medium">
                The intelligence layer orchestrating India's transition from agricultural waste to clean industrial power.
              </p>
              <div className="mt-2">
                <button className="text-[13px] font-bold tracking-wide uppercase text-[#0B6E4F] hover:text-[#1DB97A] transition-colors">
                  View System Status →
                </button>
              </div>
            </div>

            {/* Right: Link Columns */}
            <div className="col-span-1 md:col-span-12 lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
              
              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-[13px] tracking-widest uppercase text-white/40 mb-2">Platform</h4>
                <a href="#" className="text-[#A0A0A0] hover:text-white text-[14px] font-medium transition-colors">Farmer App</a>
                <a href="#" className="text-[#A0A0A0] hover:text-white text-[14px] font-medium transition-colors">Industry Command</a>
                <a href="#" className="text-[#A0A0A0] hover:text-white text-[14px] font-medium transition-colors">Satellite Intelligence</a>
                <a href="#" className="text-[#A0A0A0] hover:text-white text-[14px] font-medium transition-colors">Logistics Engine</a>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-[13px] tracking-widest uppercase text-white/40 mb-2">Network</h4>
                <a href="#" className="text-[#A0A0A0] hover:text-white text-[14px] font-medium transition-colors">Live Map</a>
                <a href="#" className="text-[#A0A0A0] hover:text-white text-[14px] font-medium transition-colors">National Impact</a>
                <a href="#" className="text-[#A0A0A0] hover:text-white text-[14px] font-medium transition-colors">Carbon Markets</a>
                <a href="#" className="text-[#A0A0A0] hover:text-white text-[14px] font-medium transition-colors">Roadmap 2030</a>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-[13px] tracking-widest uppercase text-white/40 mb-2">Company</h4>
                <a href="#" className="text-[#A0A0A0] hover:text-white text-[14px] font-medium transition-colors">About</a>
                <a href="#" className="text-[#A0A0A0] hover:text-white text-[14px] font-medium transition-colors">Careers</a>
                <a href="#" className="text-[#A0A0A0] hover:text-white text-[14px] font-medium transition-colors">Press</a>
                <a href="#" className="text-[#A0A0A0] hover:text-white text-[14px] font-medium transition-colors">Contact</a>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-[13px] tracking-widest uppercase text-white/40 mb-2">Legal</h4>
                <a href="#" className="text-[#A0A0A0] hover:text-white text-[14px] font-medium transition-colors">Privacy Policy</a>
                <a href="#" className="text-[#A0A0A0] hover:text-white text-[14px] font-medium transition-colors">Terms of Service</a>
                <a href="#" className="text-[#A0A0A0] hover:text-white text-[14px] font-medium transition-colors">Security</a>
              </div>

            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white/30 text-[13px] font-medium">
              © 2026 From Field to Factory. Engineered by Green Guardians.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-bold tracking-widest uppercase text-white/30">SDG Alignment</span>
              <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100">
                <div className="w-7 h-7 rounded-lg bg-[#E5243B] flex items-center justify-center text-[11px] font-bold text-white shadow-lg">1</div>
                <div className="w-7 h-7 rounded-lg bg-[#DDA63A] flex items-center justify-center text-[11px] font-bold text-white shadow-lg">2</div>
                <div className="w-7 h-7 rounded-lg bg-[#FD6925] flex items-center justify-center text-[11px] font-bold text-white shadow-lg">9</div>
                <div className="w-7 h-7 rounded-lg bg-[#3F7E44] flex items-center justify-center text-[11px] font-bold text-white shadow-lg">13</div>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};
