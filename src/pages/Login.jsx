import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GlassCard, PageTransition } from '../components/layout';
import { PrimaryButton } from '../components/ui';

export const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(phone, password);
      if (user.role === 'farmer') navigate('/farmer');
      else if (user.role === 'industry') navigate('/industry');
      else navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid credentials or server error.');
    }
  };

  return (
    <PageTransition className="min-h-[calc(100vh-80px)] bg-[#0D0D0D] flex items-center justify-center p-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0B6E4F]/10 blur-[150px] rounded-full pointer-events-none" />
      
      <GlassCard className="w-full max-w-md p-8 relative z-10" glowColor="#0B6E4F">
        <div className="text-center mb-8">
          <h2 className="font-heading font-extrabold text-[32px] text-white tracking-tight mb-2">Welcome Back</h2>
          <p className="text-[#A0A0A0] text-sm">Sign in to your intelligence dashboard.</p>
        </div>

        {error && <div className="bg-[#E5243B]/10 border border-[#E5243B]/30 text-[#E5243B] px-4 py-3 rounded-xl text-sm mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold tracking-widest uppercase text-white/50">Phone Number</label>
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0B6E4F] transition-colors"
              placeholder="+91 98765 43210"
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold tracking-widest uppercase text-white/50">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0B6E4F] transition-colors"
              placeholder="••••••••"
              required 
            />
          </div>

          <PrimaryButton type="submit" className="w-full mt-4 h-12 bg-[#0B6E4F] hover:bg-[#1DB97A]">
            Secure Login
          </PrimaryButton>
        </form>

        <div className="mt-6 text-center text-sm text-[#A0A0A0]">
          Don't have an account? <Link to="/register" className="text-[#1DB97A] font-semibold hover:underline">Register here</Link>
        </div>
      </GlassCard>
    </PageTransition>
  );
};
