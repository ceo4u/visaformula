// src/components/channel-partner/ChannelPartnerDashboard.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard, Users, BarChart2, Target, UserCheck, DollarSign,
  Megaphone, AlertTriangle, GraduationCap, Settings, ChevronDown,
  ChevronRight, TrendingUp, Plus, Eye, Check, X,
  Search, Bell, LogOut, MapPin, Globe, Star, RefreshCw, ArrowUpRight,
  Banknote, ChevronLeft, Menu, CheckCircle2,
  AlertCircle, Shield, Building2, Network, BadgeCheck, Wallet,
  Loader2, Sparkles, Briefcase
} from 'lucide-react';
import PartnerSettingsView from './PartnerSettingsView';

interface PartnerProfile {
  company_name: string;
  email: string;
  role: string;
  tier: string;
  country: string;
  contact_person?: string;
}

interface Metrics {
  total_revenue: number;
  my_commission: number;
  total_leads: number;
  state_partners_count: number;
  approved_consultants: number;
  pending_consultants: number;
  conversion_rate: number;
}

interface StatePartner {
  id: number;
  partner_name: string;
  company_name: string;
  operating_state: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
}

interface ReferralConsultant {
  id: number;
  consultant_name: string;
  email: string;
  phone: string;
  region: string;
  speciality: string;
  status: string;
  revenue: number;
  commission: number;
  leads_count: number;
  state_partner_id: number | null;
  state_partner_name?: string;
  created_at: string;
}

const NAV_LINKS = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  {
    id: 'network', icon: Network, label: 'My Network',
    children: [
      { id: 'state-partners', label: 'State Partners' },
      { id: 'referral-consultants', label: 'Referral Consultants' },
    ]
  },
  { id: 'business', icon: BarChart2, label: 'Business Overview' },
  { id: 'leads', icon: Target, label: 'Leads & Enquiries' },
  { id: 'performance', icon: UserCheck, label: 'Consultants Performance' },
  {
    id: 'earnings', icon: Wallet, label: 'My Earnings',
    children: [
      { id: 'payouts', label: 'Payouts & Invoices' },
      { id: 'analytics', label: 'Payouts & Analytics' },
    ]
  },
  { id: 'marketing', icon: Megaphone, label: 'Marketing Tools' },
  { id: 'disputes', icon: AlertTriangle, label: 'Disputes' },
  { id: 'training', icon: GraduationCap, label: 'Report & Training' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia',
  'Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland',
  'Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey',
  'New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina',
  'South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'
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
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          {label}
        </label>
      )}

      <div
        onClick={() => setOpen(!open)}
        className={`w-full h-11 px-3.5 rounded-2xl bg-white border transition-all flex items-center justify-between cursor-pointer select-none ${
          open
            ? 'border-[#00A878] ring-2 ring-[#00A878]/15 bg-white shadow-xs'
            : 'border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/70'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          {Icon && <Icon className="w-4 h-4 text-slate-400 shrink-0" />}
          {selectedOpt?.icon && <selectedOpt.icon className="w-4 h-4 text-[#00A878] shrink-0" />}
          <div className="min-w-0 truncate">
            <span className="text-xs sm:text-[13px] font-medium text-slate-900 truncate block">
              {selectedOpt ? selectedOpt.label : <span className="text-slate-400 font-normal">{placeholder}</span>}
            </span>
            {selectedOpt?.sub && (
              <span className="text-[11px] text-slate-500 font-normal truncate block leading-none mt-0.5">
                {selectedOpt.sub}
              </span>
            )}
          </div>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180 text-[#00A878]' : ''
          }`}
        />
      </div>

      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 w-full z-[99999] bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-2 animate-fadeIn ring-1 ring-black/5 max-h-[250px] overflow-hidden flex flex-col">
          {searchable && (
            <div className="relative mb-2 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to search..."
                className="w-full h-8 pl-8 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#00A878]"
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
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200/60'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      {OptIcon && (
                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? 'bg-[#00A878] text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <OptIcon className="w-3 h-3" />
                        </div>
                      )}
                      <div className="min-w-0 truncate">
                        <div className="text-xs sm:text-[13px] truncate">{opt.label}</div>
                        {opt.sub && (
                          <div className="text-[11px] text-slate-400 font-normal truncate mt-0.5">{opt.sub}</div>
                        )}
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#00A878] shrink-0" />}
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

// ─── APPLE STAT CARD COMPONENT ──────────────────────────────────────────────
function StatCard({ icon: Icon, iconBg, label, value, sub, positive }: { icon: any; iconBg: string; label: string; value: string | number; sub?: string; positive?: boolean }) {
  return (
    <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-[24px] p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-xs ${iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
        {sub && (
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5 ${
            positive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-slate-100 text-slate-600'
          }`}>
            {positive && <TrendingUp className="w-3 h-3" />}
            {sub}
          </span>
        )}
      </div>
      <div className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight leading-none mb-1">
        {value}
      </div>
      <div className="text-xs font-medium text-slate-500">{label}</div>
    </div>
  );
}

// ─── STATUS BADGE COMPONENT ──────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70 shadow-2xs">
      <span className="w-1.5 h-1.5 rounded-full bg-[#00A878]" />
      Active
    </span>
  );
}

// ─── HIERARCHY PILL BADGE ────────────────────────────────────────────────────
function HierarchyBadge() {
  return (
    <div className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-slate-700 bg-slate-50 border border-slate-200/90 px-3.5 py-1 rounded-full shadow-2xs">
      <span className="text-slate-400">TravlTik HQ</span>
      <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
      <span className="text-[#00A878] font-bold">Country Partner</span>
      <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
      <span className="text-slate-500">State Partners</span>
      <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
      <span className="text-slate-500">Consultants</span>
    </div>
  );
}

// ─── ADD STATE PARTNER MODAL ─────────────────────────────────────────────────
function AddStatePartnerModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [form, setForm] = useState({ partner_name: '', company_name: '', operating_state: 'California', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/partner/state-partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to add state partner.');
      }
      setDone(true);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
      <div className="bg-white w-full max-w-[480px] rounded-[28px] shadow-2xl overflow-hidden animate-fadeIn border border-slate-100">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Add State Partner</h3>
            <p className="text-xs text-slate-500 mt-0.5">Expand your regional state network</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {!done ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Contact Person *</label>
                <input required value={form.partner_name} onChange={e => setForm(f => ({...f, partner_name: e.target.value}))}
                  className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-xs sm:text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-[#00A878]/20 focus:border-[#00A878] bg-white" placeholder="Robert Chen" />
              </div>
              <div>
                <CustomSelect
                  label="Operating State *"
                  value={form.operating_state}
                  onChange={(val) => setForm(f => ({...f, operating_state: val}))}
                  options={US_STATES}
                  searchable={true}
                  icon={MapPin}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Agency / Company Name</label>
              <input value={form.company_name} onChange={e => setForm(f => ({...f, company_name: e.target.value}))}
                className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-xs sm:text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-[#00A878]/20 focus:border-[#00A878] bg-white" placeholder="Pacific Visa Solutions LLC" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Official Email *</label>
                <input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                  className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-xs sm:text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-[#00A878]/20 focus:border-[#00A878] bg-white" placeholder="partner@domain.com" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Contact Phone</label>
                <input value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                  className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-xs sm:text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-[#00A878]/20 focus:border-[#00A878] bg-white" placeholder="+1 555 000 0000" />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className="flex-1 h-11 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors">Cancel</button>
              <button type="submit" disabled={loading} className="flex-1 h-11 rounded-2xl bg-[#00A878] hover:bg-[#008A62] text-white text-xs font-semibold cursor-pointer transition-colors flex items-center justify-center gap-2 shadow-sm shadow-emerald-500/20">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save State Partner'}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-7 h-7 text-[#00A878]" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">State Partner Activated!</h4>
            <p className="text-xs text-slate-500 mb-4">Saved directly to your regional network.</p>
            <button onClick={onClose} className="w-full h-11 rounded-2xl bg-[#00A878] text-white text-xs font-semibold cursor-pointer hover:bg-[#008A62] transition-colors">Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ADD CONSULTANT MODAL ─────────────────────────────────────────────────────
function AddConsultantModal({ onClose, statePartners, onSuccess }: { onClose: () => void; statePartners: StatePartner[]; onSuccess: () => void }) {
  const [form, setForm] = useState({ consultant_name: '', email: '', phone: '', state_partner_id: '', region: '', speciality: 'Study Visa & Admissions' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/partner/consultants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          state_partner_id: form.state_partner_id ? parseInt(form.state_partner_id, 10) : null
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to register consultant.');
      }
      setDone(true);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Error occurred while saving to database.');
    } finally {
      setLoading(false);
    }
  };

  const partnerOptions = [
    { value: '', label: 'Direct Country Partner (HQ Assigned)' },
    ...statePartners.map(sp => ({
      value: String(sp.id),
      label: `${sp.partner_name} (${sp.operating_state})`
    }))
  ];

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
      <div className="bg-white w-full max-w-[480px] rounded-[28px] shadow-2xl overflow-hidden animate-fadeIn border border-slate-100">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Register Referral Consultant</h3>
            <p className="text-xs text-slate-500 mt-0.5">Onboard licensed immigration advisor</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {!done ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Consultant Name *</label>
                <input required value={form.consultant_name} onChange={e => setForm(f => ({...f, consultant_name: e.target.value}))}
                  className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-xs sm:text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-[#00A878]/20 focus:border-[#00A878] bg-white" placeholder="Priya Sharma" />
              </div>
              <div>
                <CustomSelect
                  label="Assign State Partner"
                  value={form.state_partner_id}
                  onChange={(val) => setForm(f => ({...f, state_partner_id: val}))}
                  options={partnerOptions}
                  icon={Building2}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Official Email *</label>
              <input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-xs sm:text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-[#00A878]/20 focus:border-[#00A878] bg-white" placeholder="consultant@domain.com" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Phone Number</label>
                <input value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                  className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-xs sm:text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-[#00A878]/20 focus:border-[#00A878] bg-white" placeholder="+1 555 000 0000" />
              </div>
              <div>
                <CustomSelect
                  label="Advisory Speciality"
                  value={form.speciality}
                  onChange={(val) => setForm(f => ({...f, speciality: val}))}
                  options={SPECIALIZATION_OPTIONS}
                  icon={Briefcase}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className="flex-1 h-11 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors">Cancel</button>
              <button type="submit" disabled={loading} className="flex-1 h-11 rounded-2xl bg-[#00A878] hover:bg-[#008A62] text-white text-xs font-semibold cursor-pointer transition-colors flex items-center justify-center gap-2 shadow-sm shadow-emerald-500/20">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Consultant'}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-7 h-7 text-[#00A878]" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">Consultant Activated!</h4>
            <p className="text-xs text-slate-500 mb-4">Saved directly to active referral network.</p>
            <button onClick={onClose} className="w-full h-11 rounded-2xl bg-[#00A878] text-white text-xs font-semibold cursor-pointer hover:bg-[#008A62] transition-colors">Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN DASHBOARD COMPONENT ─────────────────────────────────────────────────
export default function ChannelPartnerDashboard() {
  const [active, setActive] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Modals
  const [showAddPartner, setShowAddPartner] = useState(false);
  const [showAddConsultant, setShowAddConsultant] = useState(false);

  // Dynamic Data States (from Neon DB)
  const [loading, setLoading] = useState(true);
  const [partner, setPartner] = useState<PartnerProfile | null>(null);
  const [metrics, setMetrics] = useState<Metrics>({
    total_revenue: 0,
    my_commission: 0,
    total_leads: 0,
    state_partners_count: 0,
    approved_consultants: 0,
    pending_consultants: 0,
    conversion_rate: 0
  });
  const [statePartners, setStatePartners] = useState<StatePartner[]>([]);
  const [consultants, setConsultants] = useState<ReferralConsultant[]>([]);

  // Search & Filters
  const [search, setSearch] = useState('');
  const [filterState, setFilterState] = useState('All');

  // Fetch real-time data from database
  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/partner/metrics');
      if (res.status === 401) {
        window.location.href = '/channel-partner/login';
        return;
      }
      const data = await res.json();
      if (data.success) {
        setPartner(data.partner);
        setMetrics(data.metrics);
        setStatePartners(data.state_partners || []);
        setConsultants(data.consultants || []);
      }
    } catch (err) {
      console.error('[Dashboard] Error fetching live DB metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch('/api/partner/auth/logout', { method: 'POST' });
    } catch (e) {}
    window.location.href = '/channel-partner/login';
  };

  // Filtered consultants
  const filteredConsultants = consultants.filter((c) => {
    const q = search.toLowerCase();
    const matchQ = c.consultant_name.toLowerCase().includes(q) || (c.state_partner_name || '').toLowerCase().includes(q);
    const matchState = filterState === 'All' || c.region === filterState || (c.state_partner_name || '').includes(filterState);
    return matchQ && matchState;
  });

  const sectionTitle: Record<string, string> = {
    dashboard: 'Dashboard',
    network: 'My Network',
    'state-partners': 'State Partners',
    'referral-consultants': 'Referral Consultants',
    business: 'Business Overview',
    leads: 'Leads & Enquiries',
    performance: 'Consultants Performance',
    earnings: 'My Earnings',
    payouts: 'Payouts & Invoices',
    analytics: 'Payouts & Analytics',
    marketing: 'Marketing Tools',
    disputes: 'Disputes',
    training: 'Report & Training',
    settings: 'Settings',
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] flex flex-col items-center justify-center p-6 text-slate-900 select-none" style={{ fontFamily: '"Plus Jakarta Sans", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 shadow-sm animate-pulse">
          <Globe className="w-7 h-7 text-[#00A878]" />
        </div>
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
          <Loader2 className="w-4 h-4 animate-spin text-[#00A878]" />
          <span>Synchronizing Multi-Tier Channel Network...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f8f9fb] overflow-hidden select-none" style={{ fontFamily: '"Plus Jakarta Sans", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>

      {/* ═══════════ MOBILE DRAWER OVERLAY & SIDEBAR ═══════════ */}
      <div className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
        <aside className={`absolute top-0 left-0 w-72 h-full bg-white shadow-2xl flex flex-col justify-between p-4 transform transition-transform duration-300 overflow-y-auto ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="space-y-4">
            {/* Mobile Header Logo */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex flex-col items-start gap-1">
                <img src="/logo.png" alt="TravlTik Official Logo" className="h-8 w-auto object-contain" />
                <div className="text-[10px] font-semibold text-slate-400 tracking-[0.16em] uppercase">
                  CHANNEL PARTNER
                </div>
              </div>
              <button onClick={() => setMobileOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="space-y-1">
              {NAV_LINKS.map(item => {
                const isActive = active === item.id || item.children?.some(c => c.id === active);
                return (
                  <div key={item.id}>
                    <button
                      onClick={() => {
                        setActive(item.id);
                        if (!item.children) setMobileOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-semibold text-xs sm:text-[13px] transition-all cursor-pointer ${
                        isActive && !item.children
                          ? 'bg-[#00A878] text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-4 h-4 ${isActive && !item.children ? 'text-white' : 'text-slate-500'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.children && <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
                    </button>
                    {item.children && (
                      <div className="ml-7 mt-1 space-y-0.5">
                        {item.children.map(child => (
                          <button
                            key={child.id}
                            onClick={() => {
                              setActive(child.id);
                              setMobileOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                              active === child.id ? 'bg-emerald-50 text-[#00A878] font-semibold' : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            <span>{child.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Mobile User Card */}
          <div className="pt-4 border-t border-slate-100 mt-4">
            <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-2.5 border border-slate-200/80">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-[#00A878] text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {(partner?.company_name || 'GH').substring(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 truncate">
                  <div className="text-xs font-semibold text-slate-900 truncate">{partner?.company_name || 'Global Horizons'}</div>
                  <div className="text-[10px] text-slate-500">{partner?.country || 'United States'}</div>
                </div>
              </div>
              <button onClick={handleLogout} className="p-1.5 text-slate-400 hover:text-rose-600 cursor-pointer">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* ═══════════ DESKTOP WHITE SIDEBAR ═══════════ */}
      <aside className={`hidden lg:flex flex-col h-full bg-white border-r border-slate-200/80 ${sidebarCollapsed ? 'w-[76px]' : 'w-[260px]'} transition-all duration-300 shrink-0 z-30 select-none shadow-[2px_0_12px_rgba(0,0,0,0.015)]`}>

        {/* Top-Left Header Branding (White Background & Official Logo) */}
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-5'} pt-5 pb-4 border-b border-slate-100`}>
          {!sidebarCollapsed ? (
            <div>
              <div className="flex flex-col items-start gap-1 mb-1.5">
                <img
                  src="/logo.png"
                  alt="TravlTik Official Logo"
                  className="h-8 w-auto object-contain"
                />
                <div className="text-[10px] font-semibold text-slate-400 tracking-[0.16em] uppercase leading-none mt-1">
                  CHANNEL PARTNER
                </div>
              </div>
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/90 px-2.5 py-0.5 rounded-full shadow-2xs">
                  <Star className="w-2.5 h-2.5 fill-current text-[#00A878]" /> Platinum Partner
                </span>
              </div>
            </div>
          ) : (
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center p-1.5 shadow-2xs">
              <img src="/logo.png" alt="Logo" className="h-6 w-auto object-contain" />
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 items-center justify-center cursor-pointer transition-colors shrink-0 text-slate-500"
          >
            {sidebarCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          {NAV_LINKS.map(item => {
            const isActive = active === item.id || item.children?.some(c => c.id === active);
            return (
              <div key={item.id}>
                <button
                  onClick={() => setActive(item.id)}
                  className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-3.5'} py-2.5 rounded-2xl transition-all text-left cursor-pointer ${
                    isActive && !item.children
                      ? 'bg-[#00A878] text-white shadow-sm font-semibold'
                      : isActive
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <item.icon size={17} className={`shrink-0 ${isActive && !item.children ? 'text-white' : 'text-slate-500'}`} />
                  {!sidebarCollapsed && (
                    <span className="text-xs sm:text-[13px] flex-1 truncate">{item.label}</span>
                  )}
                </button>
                {!sidebarCollapsed && item.children && (
                  <div className="ml-7 mt-0.5 mb-1 space-y-0.5">
                    {item.children.map(child => (
                      <button
                        key={child.id}
                        onClick={() => setActive(child.id)}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                          active === child.id ? 'bg-emerald-50 text-[#00A878] font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <span>{child.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Card at Bottom Left */}
        {!sidebarCollapsed ? (
          <div className="p-3 border-t border-slate-100">
            <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl p-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#00A878] text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-xs">
                {(partner?.company_name || 'GH').substring(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-slate-900 truncate">{partner?.company_name || 'Global Horizons Pvt.'}</div>
                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                  <MapPin className="w-2.5 h-2.5 text-[#00A878]" />{partner?.country || 'United States'}
                </div>
              </div>
              <button onClick={handleLogout} title="Sign Out" className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer p-1">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-2 border-t border-slate-100 flex justify-center">
            <button onClick={handleLogout} title="Sign Out" className="text-slate-400 hover:text-rose-600 p-2 cursor-pointer">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </aside>

      {/* ═══════════ MAIN CONTENT PANEL ═══════════ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top Header Bar (Spacious & Prominent) */}
        <header className="bg-white/95 backdrop-blur-2xl border-b border-slate-200/90 min-h-[76px] sm:min-h-[86px] flex items-center justify-between px-5 sm:px-8 shrink-0 shadow-[0_2px_12px_rgba(0,0,0,0.02)] z-20 transition-all">
          <div className="flex items-center gap-3.5">
            {/* Mobile Hamburger & Logo */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors text-slate-800 shadow-2xs"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="lg:hidden flex items-center gap-2">
              <img src="/logo.png" alt="TravlTik" className="h-8 w-auto object-contain" />
            </div>

            <div className="hidden sm:flex flex-col gap-1.5">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">{sectionTitle[active] || active}</h1>
              <div className="flex items-center gap-1">
                <HierarchyBadge />
              </div>
            </div>
          </div>

          {/* Upper Right Corner Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs sm:text-[13px] font-bold shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00A878] animate-ping inline-block mr-0.5" />
              <span>{partner?.country || 'United States'} &bull; Tier 1 Master Partner</span>
            </div>

            <button
              onClick={fetchDashboardData}
              title="Refresh Live Data"
              className="w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors text-slate-700 shadow-2xs"
            >
              <RefreshCw className="w-4.5 h-4.5" />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 h-11 rounded-2xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-800 text-xs sm:text-sm font-bold transition-colors cursor-pointer shadow-2xs"
            >
              <LogOut className="w-4 h-4 text-slate-500 hover:text-rose-600" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Dashboard Main Scroll Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6">

          {/* ═══════════ TAB 1: DASHBOARD OVERVIEW ═══════════ */}
          {active === 'dashboard' && (
            <div className="space-y-5">
              {/* Top Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
                <StatCard
                  icon={DollarSign}
                  iconBg="bg-emerald-50 text-[#00A878] border border-emerald-200/50"
                  label="Total Revenue"
                  value={`$${metrics.total_revenue.toLocaleString()}`}
                  sub="+0.0%"
                  positive
                />
                <StatCard
                  icon={Banknote}
                  iconBg="bg-blue-50 text-blue-600 border border-blue-200/50"
                  label="My Commission"
                  value={`$${metrics.my_commission.toLocaleString()}`}
                  sub="+0.0%"
                  positive
                />
                <StatCard
                  icon={Globe}
                  iconBg="bg-purple-50 text-purple-600 border border-purple-200/50"
                  label="Active State Partners"
                  value={metrics.state_partners_count}
                  sub="In Network"
                  positive
                />
                <StatCard
                  icon={Users}
                  iconBg="bg-amber-50 text-amber-600 border border-amber-200/50"
                  label="Approved Consultants"
                  value={metrics.approved_consultants}
                  sub="Active"
                  positive
                />
                <StatCard
                  icon={Target}
                  iconBg="bg-teal-50 text-teal-600 border border-teal-200/50"
                  label="Total Leads Generated"
                  value={metrics.total_leads.toLocaleString()}
                  sub="Leads"
                  positive
                />
                <StatCard
                  icon={TrendingUp}
                  iconBg="bg-rose-50 text-rose-500 border border-rose-200/50"
                  label="Network Conversion"
                  value={`${metrics.conversion_rate}%`}
                  sub="Rate"
                  positive
                />
              </div>

              {/* Main 2-Col Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

                {/* Left Card: Network & Coverage */}
                <div className="xl:col-span-2 bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-[28px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <div className="flex items-start justify-between mb-4 gap-2 flex-wrap">
                    <div>
                      <h2 className="text-base font-bold text-slate-900">Regional Network Coverage</h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {statePartners.length} State Partners &bull; {consultants.length} Active Consultants
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setShowAddPartner(true)} className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-900 text-white cursor-pointer hover:bg-slate-800 flex items-center gap-1">
                        <Plus className="w-3.5 h-3.5" /> State Partner
                      </button>
                      <button onClick={() => setShowAddConsultant(true)} className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#00A878] text-white cursor-pointer hover:bg-[#008A62] flex items-center gap-1">
                        <Plus className="w-3.5 h-3.5" /> Consultant
                      </button>
                    </div>
                  </div>

                  {/* Active States Chips */}
                  {statePartners.length > 0 ? (
                    <div className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-3.5 mb-4 flex flex-wrap gap-1.5">
                      {statePartners.map(sp => (
                        <span key={sp.id} className="text-xs font-medium px-2.5 py-1 rounded-full border bg-emerald-50 text-emerald-800 border-emerald-200 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00A878]" />
                          {sp.operating_state} &bull; {sp.partner_name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-6 mb-4 text-center">
                      <Globe className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-700 mb-1">No State Partners added yet</p>
                      <p className="text-xs text-slate-500 mb-3">Expand your regional network across states by clicking '+ Add State Partner'.</p>
                      <button onClick={() => setShowAddPartner(true)} className="inline-flex items-center gap-1 text-xs font-semibold bg-slate-900 text-white px-3.5 py-1.5 rounded-xl cursor-pointer">
                        <Plus className="w-3.5 h-3.5" /> Add State Partner
                      </button>
                    </div>
                  )}

                  {/* Live Table */}
                  {statePartners.length > 0 && (
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[500px]">
                        <thead>
                          <tr className="border-b border-slate-100">
                            {['Operating State', 'Partner Name', 'Email', 'Status', ''].map(h => (
                              <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider py-2 pr-3">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50/80">
                          {statePartners.map(sp => (
                            <tr key={sp.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-3 pr-3 text-xs sm:text-[13px] font-semibold text-slate-900">{sp.operating_state}</td>
                              <td className="py-3 pr-3 text-xs sm:text-[13px] font-medium text-slate-700">{sp.partner_name}</td>
                              <td className="py-3 pr-3 text-xs text-slate-500">{sp.email}</td>
                              <td className="py-3 pr-3"><StatusBadge status={sp.status} /></td>
                              <td className="py-3 text-right">
                                <button onClick={() => setActive('state-partners')} className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer">
                                  <Eye className="w-3.5 h-3.5 text-slate-600" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Right Card: Quick Actions */}
                <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-[28px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-3">
                  <h2 className="text-base font-bold text-slate-900">Quick Actions</h2>

                  <button onClick={() => setShowAddPartner(true)} className="w-full flex items-center gap-3 p-4 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-all active:scale-[0.98] text-left cursor-pointer group">
                    <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-[13px] font-bold">+ Add State Partner</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Expand regional state network</div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors shrink-0" />
                  </button>

                  <button onClick={() => setShowAddConsultant(true)} className="w-full flex items-center gap-3 p-4 rounded-2xl bg-[#00A878] text-white hover:bg-[#008A62] transition-all active:scale-[0.98] text-left cursor-pointer group shadow-sm shadow-emerald-500/20">
                    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/25 transition-colors">
                      <UserCheck className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-[13px] font-bold">+ Register Consultant</div>
                      <div className="text-[11px] text-emerald-100 mt-0.5">Onboard licensed migration advisor</div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-emerald-200 group-hover:text-white transition-colors shrink-0" />
                  </button>

                  <button onClick={() => setActive('referral-consultants')} className="w-full flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-all active:scale-[0.98] text-left cursor-pointer">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0 text-[#00A878]">
                      <BadgeCheck className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-[13px] font-bold text-slate-900">Network Directory</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{consultants.length} active consultants</div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </button>

                  {/* Net Commission Callout */}
                  <div className="bg-slate-900 rounded-2xl p-4 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-slate-400">Total Net Commission</span>
                      <span className="text-xs sm:text-sm font-bold text-[#00A878]">${metrics.my_commission.toLocaleString()}</span>
                    </div>
                    <button onClick={() => setActive('earnings')} className="w-full mt-2 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer">
                      View Earnings Report <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ═══════════ TAB 2: REFERRAL CONSULTANTS ═══════════ */}
          {(active === 'network' || active === 'referral-consultants') && (
            <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-[28px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Referral Consultants</h2>
                  <p className="text-xs text-slate-500 mt-0.5">{consultants.length} active advisors in database</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
                      className="pl-8 pr-3 h-9 w-40 text-xs rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A878]/20 focus:border-[#00A878]" />
                  </div>
                  <button onClick={() => setShowAddConsultant(true)} className="h-9 px-3.5 bg-[#00A878] hover:bg-[#008A62] text-white text-xs font-semibold rounded-2xl flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm shadow-emerald-500/20">
                    <Plus className="w-3.5 h-3.5" /> Register Consultant
                  </button>
                </div>
              </div>

              {filteredConsultants.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr className="border-b border-slate-100">
                        {['Consultant Name', 'Speciality', 'Assigned State Partner', 'Revenue', 'Commission', 'Leads', 'Status'].map(h => (
                          <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider py-2.5 pr-4">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredConsultants.map(c => (
                        <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3 pr-4">
                            <div className="text-xs sm:text-[13px] font-semibold text-slate-900">{c.consultant_name}</div>
                            <div className="text-[11px] text-slate-400">{c.email}</div>
                          </td>
                          <td className="py-3 pr-4 text-xs font-medium text-slate-700">{c.speciality || 'Study Visa'}</td>
                          <td className="py-3 pr-4 text-xs font-medium text-slate-600">{c.state_partner_name || 'Direct Country Partner'}</td>
                          <td className="py-3 pr-4 text-xs font-semibold text-slate-900">${parseFloat(String(c.revenue || 0)).toLocaleString()}</td>
                          <td className="py-3 pr-4 text-xs font-semibold text-[#00A878]">${parseFloat(String(c.commission || 0)).toLocaleString()}</td>
                          <td className="py-3 pr-4 text-xs font-medium text-slate-600">{c.leads_count || 0}</td>
                          <td className="py-3 pr-4"><StatusBadge status={c.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400">
                  <Users className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                  <p className="text-xs font-semibold text-slate-600">No consultants registered yet</p>
                  <p className="text-xs text-slate-400 mt-0.5">Click '+ Register Consultant' to add advisors to your network.</p>
                </div>
              )}
            </div>
          )}

          {/* ═══════════ TAB 3: STATE PARTNERS ═══════════ */}
          {active === 'state-partners' && (
            <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-[28px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div>
                  <h2 className="text-base font-bold text-slate-900">State Partners Network</h2>
                  <p className="text-xs text-slate-500 mt-0.5">{statePartners.length} regional state partners active</p>
                </div>
                <button onClick={() => setShowAddPartner(true)} className="h-9 px-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-2xl flex items-center gap-1.5 cursor-pointer transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Add State Partner
                </button>
              </div>

              {statePartners.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b border-slate-100">
                        {['Operating State', 'Partner Name', 'Company Name', 'Email', 'Phone', 'Status'].map(h => (
                          <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider py-2.5 pr-4">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {statePartners.map(sp => (
                        <tr key={sp.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3 pr-4 text-xs sm:text-[13px] font-semibold text-slate-900">{sp.operating_state}</td>
                          <td className="py-3 pr-4 text-xs sm:text-[13px] font-medium text-slate-800">{sp.partner_name}</td>
                          <td className="py-3 pr-4 text-xs text-slate-600">{sp.company_name || '—'}</td>
                          <td className="py-3 pr-4 text-xs text-slate-500">{sp.email}</td>
                          <td className="py-3 pr-4 text-xs text-slate-500">{sp.phone || '—'}</td>
                          <td className="py-3 pr-4"><StatusBadge status={sp.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400">
                  <Building2 className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                  <p className="text-xs font-semibold text-slate-600">No state partners added yet</p>
                  <p className="text-xs text-slate-400 mt-0.5">Click '+ Add State Partner' to expand your state network.</p>
                </div>
              )}
            </div>
          )}

          {/* ═══════════ TAB 4: MY EARNINGS / BUSINESS / PAYOUTS ═══════════ */}
          {(active === 'business' || active === 'earnings' || active === 'payouts' || active === 'analytics') && (
            <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-[28px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Earnings & Payouts Analytics</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Real-time commission breakdown and automated payout history.</p>
                </div>
                <div className="px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 text-[#00A878] rounded-full text-xs font-semibold">
                  Payout Status: Auto-Settled (Weekly/Monthly)
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <div className="text-xs font-medium text-slate-500 mb-1">Gross Network Revenue</div>
                  <div className="text-2xl font-black text-slate-900">${metrics.total_revenue.toLocaleString()}</div>
                  <div className="text-[11px] text-slate-400 mt-1">Processed across your territory</div>
                </div>
                <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80">
                  <div className="text-xs font-medium text-emerald-800 mb-1">Your Net Override Commission</div>
                  <div className="text-2xl font-black text-emerald-900">${metrics.my_commission.toLocaleString()}</div>
                  <div className="text-[11px] text-emerald-700 mt-1">Ready for settlement payout</div>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <div className="text-xs font-medium text-slate-500 mb-1">Network Conversion Rate</div>
                  <div className="text-2xl font-black text-slate-900">{metrics.conversion_rate}%</div>
                  <div className="text-[11px] text-slate-400 mt-1">Leads to successful visas</div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════ TAB 5: LEADS & ENQUIRIES ═══════════ */}
          {active === 'leads' && (
            <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-[28px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Territory Client Leads & Enquiries</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Real-time visa applicants assigned across your consultant network.</p>
                </div>
                <div className="px-3.5 py-1.5 bg-blue-50 border border-blue-200 text-blue-800 rounded-full text-xs font-semibold">
                  {metrics.total_leads} Total Leads
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px]">
                  <thead>
                    <tr className="border-b border-slate-100">
                      {['Applicant Name', 'Target Destination', 'Assigned Consultant', 'State Region', 'Status', 'Date'].map(h => (
                        <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider py-2.5 pr-4">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 pr-4">
                        <div className="text-xs sm:text-[13px] font-bold text-slate-900">Arjun Mehta</div>
                        <div className="text-[11px] text-slate-400">Student Visa Inquiry</div>
                      </td>
                      <td className="py-3 pr-4 text-xs font-semibold text-slate-700">United States (F-1)</td>
                      <td className="py-3 pr-4 text-xs font-medium text-slate-800">Priya Sharma</td>
                      <td className="py-3 pr-4 text-xs text-slate-500">California</td>
                      <td className="py-3 pr-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          In Progress
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-xs text-slate-400">Today</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 pr-4">
                        <div className="text-xs sm:text-[13px] font-bold text-slate-900">Sarah Jenkins</div>
                        <div className="text-[11px] text-slate-400">Skilled Migration</div>
                      </td>
                      <td className="py-3 pr-4 text-xs font-semibold text-slate-700">Canada (Express Entry)</td>
                      <td className="py-3 pr-4 text-xs font-medium text-slate-800">Robert Chen</td>
                      <td className="py-3 pr-4 text-xs text-slate-500">Texas</td>
                      <td className="py-3 pr-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                          Consultation Booked
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-xs text-slate-400">Yesterday</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ═══════════ TAB 6: CONSULTANTS PERFORMANCE ═══════════ */}
          {active === 'performance' && (
            <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-[28px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-base font-bold text-slate-900">Consultants Performance & Leaderboard</h2>
                <p className="text-xs text-slate-500 mt-0.5">Top-producing referral consultants ranked by revenue and client satisfaction.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px]">
                  <thead>
                    <tr className="border-b border-slate-100">
                      {['Rank', 'Consultant', 'State Partner', 'Processed Leads', 'Revenue Volume', 'Commission Generated'].map(h => (
                        <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider py-2.5 pr-4">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {consultants.length > 0 ? consultants.map((c, idx) => (
                      <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 pr-4 text-xs font-bold text-slate-500">#{idx + 1}</td>
                        <td className="py-3 pr-4 text-xs sm:text-[13px] font-bold text-slate-900">{c.consultant_name}</td>
                        <td className="py-3 pr-4 text-xs text-slate-600">{c.state_partner_name || 'Direct HQ'}</td>
                        <td className="py-3 pr-4 text-xs text-slate-700">{c.leads_count || 0}</td>
                        <td className="py-3 pr-4 text-xs font-bold text-slate-900">${parseFloat(String(c.revenue || 0)).toLocaleString()}</td>
                        <td className="py-3 pr-4 text-xs font-bold text-[#00A878]">${parseFloat(String(c.commission || 0)).toLocaleString()}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-xs text-slate-400">No performance records found yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ═══════════ TAB 7: MARKETING TOOLS ═══════════ */}
          {active === 'marketing' && (
            <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-[28px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-base font-bold text-slate-900">Partner Marketing Kit & Growth Assets</h2>
                <p className="text-xs text-slate-500 mt-0.5">High-resolution brand assets, client brochures, and territory marketing collaterals.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs sm:text-[13px] font-bold text-slate-900">Official Partner Certificate</h3>
                    <p className="text-[11px] text-slate-500 mt-1">Authorized Platinum Country Partner certificate badge for websites.</p>
                  </div>
                  <button onClick={() => window.open('/logo.png', '_blank')} className="mt-4 w-full h-9 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer">
                    Download Asset
                  </button>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs sm:text-[13px] font-bold text-slate-900">Visa Consultation Brochure</h3>
                    <p className="text-[11px] text-slate-500 mt-1">Customizable 8-page PDF guide for prospective student and migration clients.</p>
                  </div>
                  <button onClick={() => window.open('/find-experts', '_blank')} className="mt-4 w-full h-9 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer">
                    Preview Brochure
                  </button>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs sm:text-[13px] font-bold text-slate-900">Social Media Campaign Pack</h3>
                    <p className="text-[11px] text-slate-500 mt-1">Instagram, LinkedIn, and Facebook banner templates with TravlTik branding.</p>
                  </div>
                  <button onClick={() => window.open('/logo.png', '_blank')} className="mt-4 w-full h-9 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer">
                    Download Pack
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════ TAB 8: DISPUTES ═══════════ */}
          {active === 'disputes' && (
            <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-[28px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Territory Disputes & Lead Attribution</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Submit conflict resolution tickets directly to TravlTik HQ Legal & Compliance.</p>
                </div>
                <button onClick={() => alert('Support ticket raised. HQ Compliance will respond within 24 business hours.')} className="px-4 h-9 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer">
                  + Raise Conflict Ticket
                </button>
              </div>

              <div className="py-8 text-center text-slate-400">
                <CheckCircle2 className="w-9 h-9 mx-auto mb-2 text-emerald-500" />
                <p className="text-xs font-semibold text-slate-700">No Active Disputes in Territory</p>
                <p className="text-[11px] text-slate-400 mt-0.5">All consultant leads and commission splits are operating without conflict.</p>
              </div>
            </div>
          )}

          {/* ═══════════ TAB 9: TRAINING & REPORT ═══════════ */}
          {active === 'training' && (
            <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-[28px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-base font-bold text-slate-900">Partner Knowledgebase & Operating SOPs</h2>
                <p className="text-xs text-slate-500 mt-0.5">Standard Operating Procedures, compliance guidelines, and network expansion playbooks.</p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <div className="text-xs sm:text-[13px] font-bold text-slate-900">Master SOP: Multi-Tier State Partner Onboarding</div>
                    <div className="text-[11px] text-slate-500">Step-by-step guide for recruiting and verifying state-level agency partners.</div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">Verified Guide</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <div className="text-xs sm:text-[13px] font-bold text-slate-900">Global Immigration Compliance Framework</div>
                    <div className="text-[11px] text-slate-500">Legal responsibilities for US, Canada, UK, and Australia student/work applications.</div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">Mandatory</span>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════ TAB 10: SETTINGS ═══════════ */}
          {active === 'settings' && (
            <PartnerSettingsView />
          )}

        </main>
      </div>

      {/* ═══════════ MODALS ═══════════ */}
      {showAddPartner && (
        <AddStatePartnerModal
          onClose={() => setShowAddPartner(false)}
          onSuccess={() => {
            setShowAddPartner(false);
            fetchDashboardData();
          }}
        />
      )}

      {showAddConsultant && (
        <AddConsultantModal
          statePartners={statePartners}
          onClose={() => setShowAddConsultant(false)}
          onSuccess={() => {
            setShowAddConsultant(false);
            fetchDashboardData();
          }}
        />
      )}

    </div>
  );
}
