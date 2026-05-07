import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GlassCard, PageTransition } from '../components/layout';
import { PrimaryButton } from '../components/ui';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    role: 'farmer',
    district: 'Pune'
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const districts = ['Pune', 'Nagpur', 'Nashik', 'Satara', 'Aurangabad', 'Amravati', 'Solapur'];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await register(formData);
      if (user.role === 'farmer') navigate('/farmer');
      else if (user.role === 'industry') navigate('/industry');
      else navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    }
  };

  return (
    <PageTransition className="min-h-[calc(100vh-80px)] bg-[#0D0D0D] flex items-center justify-center p-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2F80ED]/10 blur-[150px] rounded-full pointer-events-none" />
      
      <GlassCard className="w-full max-w-md p-8 relative z-10" glowColor="#2F80ED">
        <div className="text-center mb-8">
          <h2 className="font-heading font-extrabold text-[32px] text-white tracking-tight mb-2">Join the Network</h2>
          <p className="text-[#A0A0A0] text-sm">Register as a Farmer or Industry partner.</p>
        </div>

        {error && <div className="bg-[#E5243B]/10 border border-[#E5243B]/30 text-[#E5243B] px-4 py-3 rounded-xl text-sm mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold tracking-widest uppercase text-white/50">Full Name / Organization</label>
            <input 
              name="name"
              type="text" 
              value={formData.name}
              onChange={handleChange}
              className="bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2F80ED] transition-colors"
              placeholder="e.g. Ramesh Patil or Pune Green Energy"
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold tracking-widest uppercase text-white/50">Phone Number</label>
            <input 
              name="phone"
              type="tel" 
              value={formData.phone}
              onChange={handleChange}
              className="bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2F80ED] transition-colors"
              placeholder="+91 98765 43210"
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-widest uppercase text-white/50">Role</label>
              <select 
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2F80ED] transition-colors appearance-none"
              >
                <option value="farmer">Farmer</option>
                <option value="industry">Industry</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-widest uppercase text-white/50">District</label>
              <select 
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2F80ED] transition-colors appearance-none"
              >
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold tracking-widest uppercase text-white/50">Password</label>
            <input 
              name="password"
              type="password" 
              value={formData.password}
              onChange={handleChange}
              className="bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2F80ED] transition-colors"
              placeholder="••••••••"
              required 
            />
          </div>

          <PrimaryButton type="submit" className="w-full mt-4 h-12 bg-[#2F80ED] hover:bg-[#1C69D4] shadow-[0_0_20px_rgba(47,128,237,0.3)]">
            Create Account
          </PrimaryButton>
        </form>

        <div className="mt-6 text-center text-sm text-[#A0A0A0]">
          Already have an account? <Link to="/login" className="text-[#2F80ED] font-semibold hover:underline">Log in</Link>
        </div>
      </GlassCard>
    </PageTransition>
  );
};
