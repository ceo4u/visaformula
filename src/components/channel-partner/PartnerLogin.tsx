// src/components/channel-partner/PartnerLogin.tsx
import React, { useState } from 'react';
import {
  Star, Lock, Mail, Shield, ArrowRight, Eye, EyeOff,
  CheckCircle2, AlertCircle, Building2, UserCheck, Sparkles, ChevronDown
} from 'lucide-react';

export default function PartnerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'country_partner' | 'state_partner' | 'referral_consultant'>('country_partner');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/partner/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      // Successful login -> Redirect to dashboard
      window.location.href = '/channel-partner/dashboard';
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] relative flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none font-sans" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
      
      {/* Soft Apple iOS Ambient Glow Gradients (White / Light Mode) */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-100/50 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-teal-100/40 blur-[140px] pointer-events-none" />
      <div className="absolute top-[35%] right-[20%] w-[400px] h-[400px] rounded-full bg-slate-200/50 blur-[100px] pointer-events-none" />

      {/* Main Luxury White Glass Card */}
      <div className="w-full max-w-[450px] relative z-10">
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 rounded-[32px] p-6 sm:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.06)] text-slate-900">

          {/* Official Logo & Header */}
          <div className="text-center mb-7">
            <div className="flex flex-col items-center justify-center gap-1.5 mb-3">
              <img
                src="/logo.png"
                alt="TravlTik Official Logo"
                className="h-11 sm:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
              <div className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase mt-1">
                CHANNEL PARTNER
              </div>
            </div>

            <div className="flex justify-center mb-3">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/90 px-3.5 py-1 rounded-full shadow-2xs">
                <Star className="w-3 h-3 text-[#00A86B] fill-current" /> Platinum Partner Portal
              </span>
            </div>

            <h1 className="text-2xl sm:text-[26px] font-black text-slate-900 tracking-tight">Partner Sign In</h1>
            <p className="text-xs text-slate-500 mt-1 font-medium">Access your B2B multi-tier network operating system</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-red-700 text-xs animate-fadeIn font-medium">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div className="flex-1">{error}</div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Role Selector */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5">
                Partner Role
              </label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e: any) => setRole(e.target.value)}
                  className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B] cursor-pointer appearance-none transition-all"
                >
                  <option value="country_partner">Country Partner (Tier 1 - Master Network)</option>
                  <option value="state_partner">State Partner (Tier 2 - Regional Network)</option>
                  <option value="referral_consultant">Referral Consultant (Tier 3 - Direct Advisory)</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5">
                Official Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="partner@globalhorizons.com"
                  className="w-full h-12 pl-11 pr-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B] transition-all font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-12 pl-11 pr-11 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B] transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 4-Tier Security Callout */}
            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-3 flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-[#00A86B] shrink-0" />
              <p className="text-[11px] text-emerald-900 font-semibold">
                4-Tier Hierarchy Security Protected by TravlTik Network Engine.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-2xl bg-[#00A86B] hover:bg-emerald-600 text-white text-sm font-black tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400 mb-2 font-semibold">Instant Demo Onboarding:</p>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setEmail('partner@globalhorizons.com');
                  setPassword('TravlTik2026!');
                  setRole('country_partner');
                }}
                className="text-[11px] font-bold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-1.5 rounded-xl cursor-pointer transition-colors"
              >
                ⚡ Fill Demo Country Partner
              </button>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="text-center mt-5">
          <p className="text-[11px] text-slate-400 font-medium">
            TravlTik Global Immigration & Mobility Platform &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
