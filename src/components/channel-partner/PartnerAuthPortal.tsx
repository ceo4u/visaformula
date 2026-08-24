// src/components/channel-partner/PartnerAuthPortal.tsx
import React, { useState } from 'react';
import {
  Star, Lock, Mail, Shield, ArrowRight, Eye, EyeOff,
  CheckCircle2, AlertCircle, Building2, UserCheck, Sparkles, ChevronDown,
  Globe, Phone, FileText, Check, ArrowLeft
} from 'lucide-react';

interface Props {
  initialMode?: 'login' | 'register';
}

const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
  'France', 'India', 'United Arab Emirates', 'Singapore', 'New Zealand',
  'Ireland', 'Saudi Arabia', 'Qatar', 'Kuwait', 'South Africa'
];

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia',
  'Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland',
  'Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey',
  'New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina',
  'South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'
];

export default function PartnerAuthPortal({ initialMode = 'login' }: Props) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [role, setRole] = useState<'country_partner' | 'state_partner' | 'referral_consultant'>('country_partner');

  // Sign In Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Sign Up Form States
  const [regCompany, setRegCompany] = useState('');
  const [regContactName, setRegContactName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCountry, setRegCountry] = useState('United States');
  const [regState, setRegState] = useState('');
  const [regTaxId, setRegTaxId] = useState('');
  const [regSpeciality, setRegSpeciality] = useState('Student Visa');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // State Management
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successModal, setSuccessModal] = useState<{ title: string; message: string; status: string } | null>(null);

  // Handle Login Submit
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/partner/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword, role })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      window.location.href = '/channel-partner/dashboard';
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Registration Submit
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Frontend validations
    if (regPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);

    try {
      const payload: any = {
        role,
        email: regEmail,
        password: regPassword,
        phone: regPhone,
      };

      if (role === 'country_partner') {
        payload.company_name = regCompany;
        payload.contact_person = regContactName;
        payload.country = regCountry;
        payload.tax_id = regTaxId;
      } else if (role === 'state_partner') {
        payload.agency_name = regCompany;
        payload.contact_person = regContactName;
        payload.operating_state = regState || 'California';
      } else if (role === 'referral_consultant') {
        payload.consultant_name = regContactName;
        payload.state = regState || 'California';
        payload.specialization = regSpeciality;
      }

      const res = await fetch('/api/partner/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Registration failed.');
      }

      setSuccessModal({
        title: 'Registration Submitted!',
        message: data.message,
        status: data.status || 'PENDING_APPROVAL'
      });

    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] relative flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none font-sans" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
      
      {/* Soft Ambient Glow Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-100/50 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-teal-100/40 blur-[140px] pointer-events-none" />
      <div className="absolute top-[35%] right-[20%] w-[400px] h-[400px] rounded-full bg-slate-200/50 blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className={`w-full ${mode === 'register' ? 'max-w-[540px]' : 'max-w-[450px]'} relative z-10 transition-all duration-300`}>
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 rounded-[32px] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] text-slate-900">

          {/* Official Site Logo & Header */}
          <div className="text-center mb-6">
            <div className="flex flex-col items-center justify-center gap-1.5 mb-2.5">
              <img
                src="/logo.png"
                alt="TravlTik Official Logo"
                className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
              <div className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase mt-1">
                CHANNEL PARTNER PORTAL
              </div>
            </div>

            <div className="flex justify-center mb-3">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/90 px-3.5 py-0.5 rounded-full">
                <Star className="w-3 h-3 text-[#00A86B] fill-current" /> Platinum Partner Network
              </span>
            </div>
          </div>

          {/* Mode Switcher Segmented Control (Sign In vs Register) */}
          <div className="flex bg-slate-100/80 p-1 rounded-2xl mb-6 border border-slate-200/70">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(null); }}
              className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setError(null); }}
              className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                mode === 'register'
                  ? 'bg-[#00A86B] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Register as Partner
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-red-700 text-xs animate-fadeIn font-medium">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div className="flex-1">{error}</div>
            </div>
          )}

          {/* ═══════════ TAB 1: SIGN IN FORM ═══════════ */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Role Selector */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5">
                  Partner Level
                </label>
                <div className="relative">
                  <select
                    value={role}
                    onChange={(e: any) => setRole(e.target.value)}
                    className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B] cursor-pointer appearance-none"
                  >
                    <option value="country_partner">Country Partner (Tier 1 - Master Network)</option>
                    <option value="state_partner">State Partner (Tier 2 - Regional Network)</option>
                    <option value="referral_consultant">Referral Consultant (Tier 3 - Direct Advisory)</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5">
                  Official Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="partner@globalhorizons.com"
                    className="w-full h-12 pl-11 pr-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B] font-medium"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5">
                  Account Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full h-12 pl-11 pr-11 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B] font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Security Banner */}
              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-3 flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-[#00A86B] shrink-0" />
                <p className="text-[11px] text-emerald-900 font-semibold">
                  4-Tier Hierarchy Security Protected by TravlTik Network Engine.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-2xl bg-[#00A86B] hover:bg-emerald-600 text-white text-sm font-black tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Instant Demo Helper */}
              <div className="pt-4 border-t border-slate-100 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setLoginEmail('partner@globalhorizons.com');
                    setLoginPassword('TravlTik2026!');
                    setRole('country_partner');
                  }}
                  className="text-[11px] font-bold text-emerald-800 hover:text-emerald-900 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl cursor-pointer"
                >
                  ⚡ Fill Demo Country Partner
                </button>
              </div>
            </form>
          )}

          {/* ═══════════ TAB 2: REGISTER FORM ═══════════ */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">

              {/* Role Segmented Buttons */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-2">
                  Select Partner Category *
                </label>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200/60">
                  <button
                    type="button"
                    onClick={() => setRole('country_partner')}
                    className={`py-2 px-1 rounded-xl text-[11px] font-black cursor-pointer transition-all ${
                      role === 'country_partner'
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Country Partner
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('state_partner')}
                    className={`py-2 px-1 rounded-xl text-[11px] font-black cursor-pointer transition-all ${
                      role === 'state_partner'
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    State Partner
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('referral_consultant')}
                    className={`py-2 px-1 rounded-xl text-[11px] font-black cursor-pointer transition-all ${
                      role === 'referral_consultant'
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Consultant
                  </button>
                </div>
              </div>

              {/* ROLE 1: COUNTRY PARTNER FIELDS */}
              {role === 'country_partner' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5">
                        Legal Entity / Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={regCompany}
                        onChange={(e) => setRegCompany(e.target.value)}
                        placeholder="Global Horizons Pvt. Ltd."
                        className="w-full h-11 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={regContactName}
                        onChange={(e) => setRegContactName(e.target.value)}
                        placeholder="Johnathan Davis"
                        className="w-full h-11 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="director@globalhorizons.com"
                        className="w-full h-11 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5">
                        WhatsApp / Phone (+Code)
                      </label>
                      <input
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="+1 (555) 019-2834"
                        className="w-full h-11 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5">
                        Operating Country *
                      </label>
                      <select
                        value={regCountry}
                        onChange={(e) => setRegCountry(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B] cursor-pointer"
                      >
                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5">
                        Tax ID / Business Reg #
                      </label>
                      <input
                        type="text"
                        value={regTaxId}
                        onChange={(e) => setRegTaxId(e.target.value)}
                        placeholder="EIN-9283749"
                        className="w-full h-11 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* ROLE 2: STATE PARTNER FIELDS */}
              {role === 'state_partner' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5">
                        Agency Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={regCompany}
                        onChange={(e) => setRegCompany(e.target.value)}
                        placeholder="Pacific Visa Solutions"
                        className="w-full h-11 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={regContactName}
                        onChange={(e) => setRegContactName(e.target.value)}
                        placeholder="Robert Chen"
                        className="w-full h-11 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5">
                        Official Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="agency@pacificvisa.com"
                        className="w-full h-11 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5">
                        Operating State / Region *
                      </label>
                      <select
                        value={regState}
                        onChange={(e) => setRegState(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B] cursor-pointer"
                      >
                        <option value="">Select Operating State...</option>
                        {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* ROLE 3: REFERRAL CONSULTANT FIELDS */}
              {role === 'referral_consultant' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5">
                        Consultant Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={regContactName}
                        onChange={(e) => setRegContactName(e.target.value)}
                        placeholder="Sarah Jenkins"
                        className="w-full h-11 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5">
                        Consultant Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="sarah@immigrationpro.com"
                        className="w-full h-11 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5">
                        Assigned State
                      </label>
                      <select
                        value={regState}
                        onChange={(e) => setRegState(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B] cursor-pointer"
                      >
                        <option value="">Select State...</option>
                        {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5">
                        Specialization
                      </label>
                      <select
                        value={regSpeciality}
                        onChange={(e) => setRegSpeciality(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B] cursor-pointer"
                      >
                        <option value="Study Visa">Study Visa & Admissions</option>
                        <option value="Work Migration">Work Migration & Permits</option>
                        <option value="PR & Citizenship">PR & Permanent Residency</option>
                        <option value="Tourist & Visitor">Tourist & Visitor Visa</option>
                        <option value="Business & Investor">Business & Investor Visa</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Password Field */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5">
                  Create Password (Min. 8 characters) *
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full h-11 pl-11 pr-11 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Notice */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                  Upon registration, your account will be placed into the TravlTik HQ approval queue with status <strong>PENDING_APPROVAL</strong>.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-2xl bg-[#00A86B] hover:bg-emerald-600 text-white text-sm font-black tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Application...</span>
                  </div>
                ) : (
                  <>
                    <span>Submit Partner Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          )}

        </div>

        {/* Footer info */}
        <div className="text-center mt-5">
          <p className="text-[11px] text-slate-400 font-medium">
            TravlTik Global Immigration & Mobility Platform &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>

      {/* Success Modal */}
      {successModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
          <div className="bg-white rounded-[32px] max-w-[460px] w-full p-7 text-center shadow-2xl animate-fadeIn border border-slate-100">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-4 text-[#00A86B]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-2">{successModal.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">{successModal.message}</p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold rounded-full mb-6">
              <Shield className="w-3.5 h-3.5" /> Status: {successModal.status}
            </div>

            <button
              type="button"
              onClick={() => {
                setSuccessModal(null);
                setMode('login');
              }}
              className="w-full h-12 rounded-2xl bg-[#00A86B] text-white text-sm font-black tracking-wide cursor-pointer hover:bg-emerald-600 transition-colors"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
