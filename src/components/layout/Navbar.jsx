import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, X, ChevronRight, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GhostButton, PrimaryButton } from '../ui';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: t('nav.platform'), path: '/platform' },
    { name: t('nav.farmer_dashboard'), path: '/farmer' },
    { name: t('nav.industry_command'), path: '/industry' },
    { name: t('nav.global_impact'), path: '/impact' },
    { name: t('nav.expansion'), path: '/roadmap' },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
  };

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
        <div className="hidden lg:flex items-center gap-4 relative">
          <div className="relative">
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 text-[#A0A0A0] hover:text-white transition-colors text-[13px] font-semibold tracking-wide px-3 py-2"
            >
              <Globe size={16} />
              {i18n.language.toUpperCase()}
            </button>
            
            {isLangMenuOpen && (
              <div className="absolute top-full mt-2 right-0 w-32 bg-[#111111] border border-white/10 rounded-xl shadow-xl overflow-hidden flex flex-col z-50">
                <button onClick={() => changeLanguage('en')} className="px-4 py-3 text-left text-sm text-[#A0A0A0] hover:bg-white/5 hover:text-white">English</button>
                <button onClick={() => changeLanguage('mr')} className="px-4 py-3 text-left text-sm text-[#A0A0A0] hover:bg-white/5 hover:text-white">मराठी</button>
                <button onClick={() => changeLanguage('hi')} className="px-4 py-3 text-left text-sm text-[#A0A0A0] hover:bg-white/5 hover:text-white">हिंदी</button>
              </div>
            )}
          </div>

          {!user ? (
            <>
              <Link to="/login">
                <GhostButton className="px-6 py-2.5 text-[13px] font-semibold tracking-wide border-white/5 hover:border-white/20 hover:bg-white/[0.02]">
                  {t('nav.sign_in')}
                </GhostButton>
              </Link>
              <Link to="/login">
                <PrimaryButton className="px-6 py-2.5 text-[13px] font-bold tracking-wide bg-[#0B6E4F] hover:bg-[#1DB97A] border-none shadow-[0_0_20px_rgba(11,110,79,0.3)] hover:shadow-[0_0_30px_rgba(29,185,122,0.5)] transition-all duration-500 group flex items-center gap-2">
                  {t('nav.access_network')}
                  <ChevronRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </PrimaryButton>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3 ml-2 border-l border-white/10 pl-4">
              <div className="flex flex-col items-end">
                <span className="text-[13px] text-white font-bold">{user.name}</span>
                <span className="text-[10px] text-[#1DB97A] font-mono uppercase tracking-widest">{user.role}</span>
              </div>
              <button 
                onClick={logout}
                className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/50 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
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
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
                <button onClick={() => changeLanguage('en')} className={`text-sm ${i18n.language === 'en' ? 'text-white font-bold' : 'text-[#A0A0A0]'}`}>EN</button>
                <button onClick={() => changeLanguage('mr')} className={`text-sm ${i18n.language === 'mr' ? 'text-white font-bold' : 'text-[#A0A0A0]'}`}>मराठी</button>
                <button onClick={() => changeLanguage('hi')} className={`text-sm ${i18n.language === 'hi' ? 'text-white font-bold' : 'text-[#A0A0A0]'}`}>हिंदी</button>
              </div>

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
                {!user ? (
                  <>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <GhostButton className="w-full justify-center h-12 border-white/10">{t('nav.sign_in')}</GhostButton>
                    </Link>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <PrimaryButton className="w-full justify-center h-12 bg-[#0B6E4F]">{t('nav.access_network')}</PrimaryButton>
                    </Link>
                  </>
                ) : (
                  <button onClick={() => { logout(); setIsMobileMenuOpen(false); }}>
                    <GhostButton className="w-full justify-center h-12 border-red-500/20 text-red-400 hover:bg-red-500/10">Logout</GhostButton>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
