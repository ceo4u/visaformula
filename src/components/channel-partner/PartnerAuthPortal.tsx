// src/components/channel-partner/PartnerAuthPortal.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Star, Lock, Mail, Shield, ArrowRight, Eye, EyeOff,
  CheckCircle2, AlertCircle, Building2, UserCheck, Sparkles, ChevronDown,
  Globe, Phone, FileText, Check, ArrowLeft, Search, Layers, MapPin, Briefcase
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

const ROLES_OPTIONS = [
  { value: 'country_partner', label: 'Country Partner', sub: 'Tier 1 - Master Network', icon: Globe },
  { value: 'state_partner', label: 'State Partner', sub: 'Tier 2 - Regional Network', icon: Building2 },
  { value: 'referral_consultant', label: 'Referral Consultant', sub: 'Tier 3 - Direct Advisory', icon: UserCheck },
];

const SPECIALIZATION_OPTIONS = [
  'Study Visa & Admissions',
  'Work Migration & Permits',
  'PR & Permanent Residency',
  'Tourist & Visitor Visa',
  'Business & Investor Visa'
];

// ─── CUSTOM PROFESSIONAL DROPDOWN ──────────────────────────────────────────
function CustomSelect({
  value,
  onChange,
  options,
  placeholder = 'Select option...',
  label,
  searchable = false,
  icon: Icon
}: {
  value: string;
  onChange: (val: string) => void;
  options: (string | { value: string; label: string; sub?: string; icon?: any })[];
  placeholder?: string;
  label?: string;
  searchable?: boolean;
  icon?: any;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const normalizedOptions = options.map(opt =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const selectedOpt = normalizedOptions.find(o => o.value === value);

  const filteredOptions = query
    ? normalizedOptions.filter(o =>
        o.label.toLowerCase().includes(query.toLowerCase()) ||
        (o.sub && o.sub.toLowerCase().includes(query.toLowerCase()))
      )
    : normalizedOptions;

  return (
    <div className="relative w-full" ref={ref}>
      {label && (
        <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <div
        onClick={() => setOpen(!open)}
        className={`w-full h-12 px-3.5 sm:px-4 rounded-2xl bg-slate-50 border transition-all flex items-center justify-between cursor-pointer select-none ${
          open
            ? 'border-[#00A86B] ring-2 ring-[#00A86B]/20 bg-white shadow-xs'
            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          {Icon && <Icon className="w-4 h-4 text-slate-400 shrink-0" />}
          {selectedOpt?.icon && <selectedOpt.icon className="w-4 h-4 text-[#00A86B] shrink-0" />}
          <div className="min-w-0 truncate">
            <span className="text-xs sm:text-sm font-bold text-slate-900 truncate block">
              {selectedOpt ? selectedOpt.label : <span className="text-slate-400 font-normal">{placeholder}</span>}
            </span>
            {selectedOpt?.sub && (
              <span className="text-[10px] text-slate-400 font-medium truncate block leading-none mt-0.5">
                {selectedOpt.sub}
              </span>
            )}
          </div>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180 text-[#00A86B]' : ''
          }`}
        />
      </div>

      {/* Dropdown Floating Menu */}
      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 w-full z-[99999] bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-[22px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-2 animate-fadeIn ring-1 ring-black/5 max-h-[260px] overflow-hidden flex flex-col">
          {searchable && (
            <div className="relative mb-2 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full h-8 pl-8 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#00A86B]"
                autoFocus
              />
            </div>
          )}

          <div className="overflow-y-auto space-y-1 pr-1 scrollbar-thin">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value;
                const OptIcon = opt.icon;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                      setQuery('');
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200/60'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      {OptIcon && (
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? 'bg-[#00A86B] text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <OptIcon className="w-3.5 h-3.5" />
                        </div>
                      )}
                      <div className="min-w-0 truncate">
                        <div className="text-xs truncate">{opt.label}</div>
                        {opt.sub && (
                          <div className="text-[10px] text-slate-400 font-normal truncate mt-0.5">{opt.sub}</div>
                        )}
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#00A86B] shrink-0" />}
                  </button>
                );
              })
            ) : (
              <div className="py-4 text-center text-xs text-slate-400">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MAIN PORTAL COMPONENT ──────────────────────────────────────────────────
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
  const [regState, setRegState] = useState('California');
  const [regTaxId, setRegTaxId] = useState('');
  const [regSpeciality, setRegSpeciality] = useState('Study Visa & Admissions');
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
        payload.operating_state = regState;
      } else if (role === 'referral_consultant') {
        payload.consultant_name = regContactName;
        payload.state = regState;
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
      
      {/* Ambient Glow Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-100/50 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-teal-100/40 blur-[140px] pointer-events-none" />
      <div className="absolute top-[35%] right-[20%] w-[400px] h-[400px] rounded-full bg-slate-200/50 blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className={`w-full ${mode === 'register' ? 'max-w-[540px]' : 'max-w-[450px]'} relative z-10 transition-all duration-300`}>
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 rounded-[32px] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] text-slate-900">

          {/* Header & Logo */}
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
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/90 px-3.5 py-0.5 rounded-full shadow-2xs">
                <Star className="w-3 h-3 text-[#00A86B] fill-current" /> Platinum Partner Network
              </span>
            </div>
          </div>

          {/* Mode Switcher Segmented Control */}
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
              {/* Custom Role Dropdown */}
              <CustomSelect
                label="Partner Level"
                value={role}
                onChange={(val: any) => setRole(val)}
                options={ROLES_OPTIONS}
              />

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

              {/* Custom Role Segmented Control */}
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
                        className="w-full h-12 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]"
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
                        className="w-full h-12 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]"
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
                        className="w-full h-12 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]"
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
                        className="w-full h-12 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Custom Operating Country Dropdown with Search */}
                    <CustomSelect
                      label="Operating Country *"
                      value={regCountry}
                      onChange={(val) => setRegCountry(val)}
                      options={COUNTRIES}
                      searchable={true}
                      icon={Globe}
                    />

                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5">
                        Tax ID / Business Reg #
                      </label>
                      <input
                        type="text"
                        value={regTaxId}
                        onChange={(e) => setRegTaxId(e.target.value)}
                        placeholder="EIN-9283749"
                        className="w-full h-12 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]"
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
                        className="w-full h-12 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]"
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
                        className="w-full h-12 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]"
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
                        className="w-full h-12 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]"
                      />
                    </div>

                    {/* Custom Operating State Dropdown with Search */}
                    <CustomSelect
                      label="Operating State / Region *"
                      value={regState}
                      onChange={(val) => setRegState(val)}
                      options={US_STATES}
                      searchable={true}
                      icon={MapPin}
                    />
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
                        className="w-full h-12 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]"
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
                        className="w-full h-12 px-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Custom Assigned State Dropdown */}
                    <CustomSelect
                      label="Assigned State"
                      value={regState}
                      onChange={(val) => setRegState(val)}
                      options={US_STATES}
                      searchable={true}
                      icon={MapPin}
                    />

                    {/* Custom Specialization Dropdown */}
                    <CustomSelect
                      label="Specialization"
                      value={regSpeciality}
                      onChange={(val) => setRegSpeciality(val)}
                      options={SPECIALIZATION_OPTIONS}
                      icon={Briefcase}
                    />
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
                    className="w-full h-12 pl-11 pr-11 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]"
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
