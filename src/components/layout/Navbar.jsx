import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GhostButton, PrimaryButton } from '../ui';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Platform', path: '/platform' },
    { name: 'Farmer Dashboard', path: '/farmer' },
    { name: 'Industry Command', path: '/industry' },
    { name: 'Global Impact', path: '/impact' },
    { name: 'Expansion', path: '/roadmap' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 bg-[#0D0D0D]/60 backdrop-blur-2xl border-b border-white/[0.04] w-full"
    >
      <div className="max-w-[1440px] mx-auto h-[80px] px-6 lg:px-12 flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-3 group relative">
          <div className="w-10 h-10 rounded-xl bg-[#0B6E4F]/10 border border-[#0B6E4F]/30 flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-[#0B6E4F] opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-md"></div>
            <Leaf className="w-5 h-5 text-[#0B6E4F] z-10" />
          </div>
          <span className="font-heading font-extrabold text-[15px] tracking-[0.2em] uppercase text-white/90">
            Field<span className="text-white/30 px-1">×</span>Factory
          </span>
        </Link>

        {/* Center: Nav Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-4 py-2 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-[#A0A0A0] hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0B6E4F] shadow-[0_0_8px_rgba(11,110,79,0.8)]"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <GhostButton className="px-6 py-2.5 text-[13px] font-semibold tracking-wide border-white/5 hover:border-white/20 hover:bg-white/[0.02]">
            Sign In
          </GhostButton>
          <PrimaryButton className="px-6 py-2.5 text-[13px] font-bold tracking-wide bg-[#0B6E4F] hover:bg-[#1DB97A] border-none shadow-[0_0_20px_rgba(11,110,79,0.3)] hover:shadow-[0_0_30px_rgba(29,185,122,0.5)] transition-all duration-500 group flex items-center gap-2">
            Access Network
            <ChevronRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </PrimaryButton>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="lg:hidden w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/70"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-[#0D0D0D]/95 backdrop-blur-3xl border-b border-white/[0.04] overflow-hidden absolute w-full"
          >
            <div className="flex flex-col px-6 py-6 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-[#A0A0A0] text-[15px] font-medium hover:text-white py-3 px-4 rounded-xl hover:bg-white/[0.03] transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-white/[0.04]">
                <GhostButton className="w-full justify-center h-12 border-white/10">Sign In</GhostButton>
                <PrimaryButton className="w-full justify-center h-12 bg-[#0B6E4F]">Access Network</PrimaryButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
