// src/components/channel-partner/ChannelPartnerDashboard.tsx
import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Users, BarChart2, Target, UserCheck, DollarSign,
  Megaphone, AlertTriangle, GraduationCap, Settings, ChevronDown,
  ChevronRight, TrendingUp, TrendingDown, Plus, Eye, Check, X,
  Edit2, ArrowRightLeft, Search, Download, Bell, LogOut,
  MapPin, Globe, Star, Clock, RefreshCw, ArrowUpRight,
  Banknote, ChevronLeft, Menu, Layers, CheckCircle2, XCircle,
  AlertCircle, Shield, Building2, Network, BadgeCheck, Wallet,
  MoreHorizontal, Loader2, Sparkles, Inbox
} from 'lucide-react';

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
      { id: 'pending-approvals', label: 'Pending Approvals', badge: true },
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

// ─── STATUS BADGE COMPONENT ──────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
    approved:            { label: 'Approved',            cls: 'bg-emerald-50 text-emerald-800 border-emerald-200', icon: <CheckCircle2 className="w-3 h-3" /> },
    active:              { label: 'Active',              cls: 'bg-emerald-50 text-emerald-800 border-emerald-200', icon: <CheckCircle2 className="w-3 h-3" /> },
    pending_hq_approval: { label: 'Pending HQ Approval', cls: 'bg-violet-50 text-violet-800 border-violet-200', icon: <Shield className="w-3 h-3" /> },
    pending_workflow:    { label: 'Pending Workflow',    cls: 'bg-amber-50 text-amber-800 border-amber-200',   icon: <Clock className="w-3 h-3" /> },
    rejected:            { label: 'Rejected',            cls: 'bg-red-50 text-red-800 border-red-200',         icon: <XCircle className="w-3 h-3" /> },
  };
  const cfg = map[status] ?? { label: status, cls: 'bg-slate-50 text-slate-700 border-slate-200', icon: <Clock className="w-3 h-3" /> };
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${cfg.cls}`}>
      {cfg.icon}{cfg.label}
    </span>
  );
}

// ─── HIERARCHY BREADCRUMB ─────────────────────────────────────────────────────
function HierarchyBadge() {
  return (
    <div className="flex items-center gap-1 flex-wrap text-[10px] font-bold text-slate-400">
      {['TravlTik HQ', 'Country Partner', 'State Partner', 'Consultant', 'Leads'].map((tier, i, arr) => (
        <React.Fragment key={tier}>
          <span className={i === 1 ? 'text-[#00A86B]' : ''}>{tier}</span>
          {i < arr.length - 1 && <ChevronRight className="w-3 h-3 text-slate-300" />}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, iconBg, positive = true }: any) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[26px] p-4 sm:p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
        {sub && (
          <span className={`flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full ${positive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
            {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {sub}
          </span>
        )}
      </div>
      <div className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">{value}</div>
      <div className="text-[11px] font-semibold text-slate-500 leading-tight">{label}</div>
    </div>
  );
}

// ─── ADD STATE PARTNER MODAL (PERSISTS TO DB) ─────────────────────────────────
function AddStatePartnerModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [form, setForm] = useState({ partner_name: '', company_name: '', operating_state: '', email: '', phone: '' });
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
      setError(err.message || 'Error occurred while saving to database.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)' }}>
      <div className="bg-white w-full sm:max-w-[480px] rounded-t-[32px] sm:rounded-[28px] shadow-2xl overflow-hidden animate-fadeIn">
        <div className="flex justify-center pt-3 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-slate-200" />
        </div>
        <div className="flex items-center justify-between px-6 pt-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-slate-900">Add State Partner</h3>
            <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
              <Shield className="w-3 h-3 text-violet-500" />
              Persists with status <strong className="text-violet-700">PENDING_HQ_APPROVAL</strong>
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors">
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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Contact / Partner Name *</label>
                <input required value={form.partner_name} onChange={e => setForm(f => ({...f, partner_name: e.target.value}))}
                  className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/25 focus:border-[#00A86B] bg-slate-50/50" placeholder="John Smith" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Operating State *</label>
                <select required value={form.operating_state} onChange={e => setForm(f => ({...f, operating_state: e.target.value}))}
                  className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/25 focus:border-[#00A86B] bg-slate-50/50 cursor-pointer">
                  <option value="">Select State...</option>
                  {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Company / Agency Name</label>
              <input value={form.company_name} onChange={e => setForm(f => ({...f, company_name: e.target.value}))}
                className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/25 focus:border-[#00A86B] bg-slate-50/50" placeholder="Pacific Visa Solutions LLC" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Official Email *</label>
                <input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                  className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/25 focus:border-[#00A86B] bg-slate-50/50" placeholder="partner@domain.com" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Contact Number</label>
                <input value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                  className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/25 focus:border-[#00A86B] bg-slate-50/50" placeholder="+1 555 000 0000" />
              </div>
            </div>

            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-3 flex gap-2.5">
              <Shield className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-violet-800 font-medium">
                Record will be inserted into PostgreSQL database. Requires TravlTik HQ verification before state territory unlocks.
              </p>
            </div>

            <div className="flex gap-3 pt-1">
              <button type="button" onClick={onClose} className="flex-1 h-12 rounded-2xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors">Cancel</button>
              <button type="submit" disabled={loading} className="flex-1 h-12 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold cursor-pointer transition-colors flex items-center justify-center gap-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit to DB →'}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#00A86B]" />
            </div>
            <h4 className="text-lg font-black text-slate-900 mb-1">State Partner Added!</h4>
            <p className="text-sm text-slate-500 mb-2">Saved directly to database table.</p>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-800 bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-full">
              <Shield className="w-3 h-3" /> PENDING_HQ_APPROVAL
            </span>
            <button onClick={onClose} className="w-full mt-6 h-12 rounded-2xl bg-[#00A86B] text-white text-sm font-bold cursor-pointer hover:bg-emerald-600 transition-colors">Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ADD CONSULTANT MODAL (PERSISTS TO DB) ────────────────────────────────────
function AddConsultantModal({ onClose, statePartners, onSuccess }: { onClose: () => void; statePartners: StatePartner[]; onSuccess: () => void }) {
  const [form, setForm] = useState({ consultant_name: '', email: '', phone: '', state_partner_id: '', region: '', speciality: '' });
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

  return (
    <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)' }}>
      <div className="bg-white w-full sm:max-w-[480px] rounded-t-[32px] sm:rounded-[28px] shadow-2xl overflow-hidden animate-fadeIn">
        <div className="flex justify-center pt-3 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-slate-200" />
        </div>
        <div className="flex items-center justify-between px-6 pt-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-slate-900">Register Referral Consultant</h3>
            <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-500" />
              Persists with status <strong className="text-amber-700">PENDING_WORKFLOW</strong>
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors">
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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Consultant Name *</label>
                <input required value={form.consultant_name} onChange={e => setForm(f => ({...f, consultant_name: e.target.value}))}
                  className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/25 focus:border-[#00A86B] bg-slate-50/50" placeholder="Priya Sharma" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Assign State Partner</label>
                <select value={form.state_partner_id} onChange={e => setForm(f => ({...f, state_partner_id: e.target.value}))}
                  className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/25 focus:border-[#00A86B] bg-slate-50/50 cursor-pointer">
                  <option value="">Direct Country Partner / Unassigned</option>
                  {statePartners.map(sp => (
                    <option key={sp.id} value={sp.id}>{sp.partner_name} ({sp.operating_state})</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Official Email *</label>
              <input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/25 focus:border-[#00A86B] bg-slate-50/50" placeholder="consultant@domain.com" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Phone Number</label>
                <input value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                  className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/25 focus:border-[#00A86B] bg-slate-50/50" placeholder="+1 555 000 0000" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Advisory Speciality</label>
                <select value={form.speciality} onChange={e => setForm(f => ({...f, speciality: e.target.value}))}
                  className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/25 focus:border-[#00A86B] bg-slate-50/50 cursor-pointer">
                  <option value="">Select Speciality...</option>
                  <option value="Student Visa">Student Visa</option>
                  <option value="Work Permit">Work Permit</option>
                  <option value="PR / Migration">PR / Migration</option>
                  <option value="Tourist / Visitor">Tourist / Visitor</option>
                  <option value="Business Visa">Business Visa</option>
                </select>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex gap-2.5">
              <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-800 font-medium">
                Saves to database as <strong>PENDING_WORKFLOW</strong>. You can approve from the Pending Approvals tab immediately.
              </p>
            </div>

            <div className="flex gap-3 pt-1">
              <button type="button" onClick={onClose} className="flex-1 h-12 rounded-2xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors">Cancel</button>
              <button type="submit" disabled={loading} className="flex-1 h-12 rounded-2xl bg-[#00A86B] hover:bg-emerald-600 text-white text-sm font-bold cursor-pointer transition-colors flex items-center justify-center gap-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Register in DB →'}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#00A86B]" />
            </div>
            <h4 className="text-lg font-black text-slate-900 mb-1">Consultant Registered!</h4>
            <p className="text-sm text-slate-500 mb-2">Saved to referral consultants table.</p>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
              <Clock className="w-3 h-3" /> PENDING_WORKFLOW
            </span>
            <button onClick={onClose} className="w-full mt-6 h-12 rounded-2xl bg-[#00A86B] text-white text-sm font-bold cursor-pointer hover:bg-emerald-600 transition-colors">Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── TRANSFER CONSULTANT MODAL ────────────────────────────────────────────────
function TransferConsultantModal({ consultant, statePartners, onClose, onSuccess }: { consultant: ReferralConsultant; statePartners: StatePartner[]; onClose: () => void; onSuccess: () => void }) {
  const [targetPartnerId, setTargetPartnerId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTransfer = async () => {
    if (!targetPartnerId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/partner/approvals/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'consultant',
          id: consultant.id,
          action: 'transfer',
          transfer_to_state_partner_id: parseInt(targetPartnerId, 10)
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Transfer failed.');
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to transfer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)' }}>
      <div className="bg-white w-full max-w-[420px] rounded-[28px] shadow-2xl p-6 animate-fadeIn">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-slate-900">Transfer Consultant</h3>
            <p className="text-xs text-slate-500">{consultant.consultant_name}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-red-50 text-red-700 text-xs font-medium">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Select Target State Partner</label>
            <select
              value={targetPartnerId}
              onChange={(e) => setTargetPartnerId(e.target.value)}
              className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/25 focus:border-[#00A86B] bg-slate-50/50 cursor-pointer"
            >
              <option value="">Choose State Partner...</option>
              {statePartners.map(sp => (
                <option key={sp.id} value={sp.id}>{sp.partner_name} — {sp.operating_state}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 h-11 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700">Cancel</button>
            <button
              onClick={handleTransfer}
              disabled={!targetPartnerId || loading}
              className="flex-1 h-11 rounded-2xl bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Transfer'}
            </button>
          </div>
        </div>
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
  const [transferringConsultant, setTransferringConsultant] = useState<ReferralConsultant | null>(null);

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
  const [filterStatus, setFilterStatus] = useState('All');

  // Fetch real-time data from database
  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/partner/metrics');
      if (res.status === 401) {
        // Session expired or unauthenticated -> redirect to login
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

  // Process Approval Action
  const handleApprovalAction = async (id: number, action: 'approve' | 'reject') => {
    try {
      const res = await fetch('/api/partner/approvals/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'consultant', id, action })
      });
      const data = await res.json();
      if (data.success) {
        // Refresh live data
        fetchDashboardData();
      }
    } catch (err) {
      console.error('[Approval] Failed to process action:', err);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch('/api/partner/auth/logout', { method: 'POST' });
    } catch (e) {}
    window.location.href = '/channel-partner/login';
  };

  const pendingCount = metrics.pending_consultants;

  // Filtered consultants
  const filteredConsultants = consultants.filter((c) => {
    const q = search.toLowerCase();
    const matchQ = c.consultant_name.toLowerCase().includes(q) || (c.state_partner_name || '').toLowerCase().includes(q);
    const matchState = filterState === 'All' || c.region === filterState || (c.state_partner_name || '').includes(filterState);
    const matchStatus = filterStatus === 'All' || c.status === filterStatus;
    return matchQ && matchState && matchStatus;
  });

  const sectionTitle: Record<string, string> = {
    dashboard: 'Dashboard',
    network: 'My Network',
    'state-partners': 'State Partners',
    'referral-consultants': 'Referral Consultants',
    'pending-approvals': 'Pending Approvals',
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
      <div className="min-h-screen bg-[#070b14] flex flex-col items-center justify-center p-6 text-white select-none">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00A86B] to-emerald-400 flex items-center justify-center mb-4 shadow-lg shadow-emerald-900/50 animate-pulse">
          <Globe className="w-6 h-6 text-white" />
        </div>
        <div className="flex items-center gap-2.5 text-sm font-bold text-slate-300">
          <Loader2 className="w-4 h-4 animate-spin text-[#00A86B]" />
          <span>Synchronizing Multi-Tier Channel Network...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f1f3f5] overflow-hidden font-sans select-none" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar - Desktop */}
      <aside className={`hidden lg:flex flex-col h-full bg-[#0a0f1a] text-white ${sidebarCollapsed ? 'w-[70px]' : 'w-[250px]'} transition-all duration-300 shrink-0`}>

        {/* Top-Left Header Branding */}
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-5'} pt-5 pb-4 border-b border-white/5`}>
          {!sidebarCollapsed ? (
            <div>
              <div className="flex flex-col items-start gap-1 mb-1.5">
                <img
                  src="/logo.png"
                  alt="TravlTik Official Logo"
                  className="h-8 w-auto object-contain brightness-0 invert"
                />
                <div className="text-[9px] font-black text-slate-400 tracking-[0.2em] uppercase leading-none">
                  CHANNEL PARTNER
                </div>
              </div>
              <div>
                <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-emerald-950 bg-[#00A86B] px-2.5 py-0.5 rounded-full shadow-sm shadow-emerald-500/20">
                  <Star className="w-2.5 h-2.5 fill-current" /> Platinum Partner
                </span>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-[#00A86B] flex items-center justify-center shadow-md shadow-emerald-900/40 p-1">
              <img src="/logo.png" alt="Logo" className="h-5 w-auto object-contain brightness-0 invert" />
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 items-center justify-center cursor-pointer transition-colors shrink-0"
          >
            {sidebarCollapsed ? <ChevronRight className="w-3.5 h-3.5 text-slate-400" /> : <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {NAV_LINKS.map(item => {
            const isActive = active === item.id || item.children?.some(c => c.id === active);
            return (
              <div key={item.id}>
                <button
                  onClick={() => setActive(item.id)}
                  className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-3'} py-2.5 rounded-2xl transition-all text-left cursor-pointer ${
                    isActive && !item.children ? 'bg-[#00A86B] text-white shadow-lg shadow-emerald-900/25'
                    : isActive ? 'bg-white/5 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <item.icon size={18} className="shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="text-[13px] font-semibold flex-1 truncate">{item.label}</span>
                  )}
                </button>
                {!sidebarCollapsed && item.children && (
                  <div className="ml-7 mt-0.5 mb-1 space-y-0.5">
                    {item.children.map(child => (
                      <button
                        key={child.id}
                        onClick={() => setActive(child.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[12px] font-semibold cursor-pointer transition-colors ${
                          active === child.id ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                        }`}
                      >
                        <span>{child.label}</span>
                        {child.badge && pendingCount > 0 && (
                          <span className="min-w-[18px] h-[18px] bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center px-1">
                            {pendingCount}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Card at Bottom */}
        {!sidebarCollapsed ? (
          <div className="p-3 border-t border-white/5">
            <div className="flex items-center gap-2.5 bg-white/5 rounded-2xl p-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00A86B] to-emerald-400 flex items-center justify-center font-black text-white text-xs shrink-0">
                {(partner?.company_name || 'GH').substring(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-black text-white truncate">{partner?.company_name || 'Global Horizons Pvt.'}</div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  <MapPin className="w-2.5 h-2.5" />{partner?.country || 'United States'}
                </div>
              </div>
              <button onClick={handleLogout} title="Sign Out" className="text-slate-400 hover:text-red-400 transition-colors cursor-pointer p-1">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-2 border-t border-white/5 flex justify-center">
            <button onClick={handleLogout} title="Sign Out" className="text-slate-400 hover:text-red-400 p-2">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </aside>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top Navigation Bar */}
        <header className="bg-white/90 backdrop-blur-xl border-b border-slate-200/80 h-14 flex items-center justify-between px-4 sm:px-6 shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors"
            >
              <Menu className="w-4.5 h-4.5 text-slate-700" size={18} />
            </button>
            <div>
              <h1 className="text-[14px] font-black text-slate-900">{sectionTitle[active] || active}</h1>
              <div className="hidden sm:flex items-center gap-1 text-[10px] text-slate-400">
                <HierarchyBadge />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActive('pending-approvals')}
              className="relative w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors"
            >
              <Bell className="w-4 h-4 text-slate-600" />
              {pendingCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center px-1">
                  {pendingCount}
                </span>
              )}
            </button>
            <button
              onClick={fetchDashboardData}
              title="Refresh Live Data"
              className="w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-slate-600" />
            </button>
            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-1.5 px-3 h-9 rounded-2xl bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Dashboard Main Scroll Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6">

          {/* 1. DASHBOARD VIEW */}
          {active === 'dashboard' && (
            <div className="space-y-5">
              {/* Top Metrics Grid (Live Database Counts) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
                <StatCard
                  icon={DollarSign}
                  iconBg="bg-emerald-100 text-[#00A86B]"
                  label="Total Revenue"
                  value={`$${metrics.total_revenue.toLocaleString()}`}
                  sub="+0.0%"
                  positive
                />
                <StatCard
                  icon={Banknote}
                  iconBg="bg-blue-100 text-blue-600"
                  label="My Commission"
                  value={`$${metrics.my_commission.toLocaleString()}`}
                  sub="+0.0%"
                  positive
                />
                <StatCard
                  icon={Globe}
                  iconBg="bg-violet-100 text-violet-600"
                  label="Active State Partners"
                  value={metrics.state_partners_count}
                  sub="In Network"
                  positive
                />
                <StatCard
                  icon={Users}
                  iconBg="bg-amber-100 text-amber-600"
                  label="Approved Consultants"
                  value={metrics.approved_consultants}
                  sub="Active"
                  positive
                />
                <StatCard
                  icon={Target}
                  iconBg="bg-cyan-100 text-cyan-600"
                  label="Total Leads Generated"
                  value={metrics.total_leads.toLocaleString()}
                  sub="Leads"
                  positive
                />
                <StatCard
                  icon={TrendingUp}
                  iconBg="bg-rose-100 text-rose-500"
                  label="Network Conversion"
                  value={`${metrics.conversion_rate}%`}
                  sub="Rate"
                  positive
                />
              </div>

              {/* Main 2-Col Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

                {/* Left Card: Network & Coverage */}
                <div className="xl:col-span-2 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[28px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-4 gap-2 flex-wrap">
                    <div>
                      <h2 className="text-[15px] font-black text-slate-900">Regional Network Coverage</h2>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {statePartners.length} State Partners &bull; {consultants.length} Total Consultants
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setShowAddPartner(true)} className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-slate-900 text-white cursor-pointer hover:bg-slate-800 flex items-center gap-1">
                        <Plus className="w-3 h-3" /> State Partner
                      </button>
                      <button onClick={() => setShowAddConsultant(true)} className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-[#00A86B] text-white cursor-pointer hover:bg-emerald-600 flex items-center gap-1">
                        <Plus className="w-3 h-3" /> Consultant
                      </button>
                    </div>
                  </div>

                  {/* Active States Chips */}
                  {statePartners.length > 0 ? (
                    <div className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-4 mb-4 flex flex-wrap gap-1.5">
                      {statePartners.map(sp => (
                        <span key={sp.id} className="text-[11px] font-bold px-2.5 py-1 rounded-full border bg-emerald-50 text-emerald-800 border-emerald-200 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B]" />
                          {sp.operating_state} &bull; {sp.partner_name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-6 mb-4 text-center">
                      <Globe className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-600 mb-1">No State Partners added yet</p>
                      <p className="text-[11px] text-slate-400 mb-3">Expand your regional network across states by clicking '+ Add State Partner'.</p>
                      <button onClick={() => setShowAddPartner(true)} className="inline-flex items-center gap-1 text-xs font-bold bg-slate-900 text-white px-3.5 py-1.5 rounded-xl cursor-pointer">
                        <Plus className="w-3 h-3" /> Add State Partner
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
                              <th key={h} className="text-left text-[10px] font-black text-slate-400 uppercase tracking-wider py-2 pr-3">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50/80">
                          {statePartners.map(sp => (
                            <tr key={sp.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-3 pr-3 text-[12px] font-bold text-slate-700">{sp.operating_state}</td>
                              <td className="py-3 pr-3 text-[12px] font-semibold text-slate-800">{sp.partner_name}</td>
                              <td className="py-3 pr-3 text-[11px] text-slate-500">{sp.email}</td>
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

                {/* Right Card: Quick Actions & Pending Approvals */}
                <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[28px] p-5 shadow-sm hover:shadow-md transition-all space-y-3">
                  <h2 className="text-[15px] font-black text-slate-900">Quick Actions</h2>

                  <button onClick={() => setShowAddPartner(true)} className="w-full flex items-center gap-3 p-4 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-all active:scale-[0.98] text-left cursor-pointer group">
                    <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-black">+ Add State Partner</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Persists to PENDING_HQ_APPROVAL</div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-colors shrink-0" />
                  </button>

                  <button onClick={() => setShowAddConsultant(true)} className="w-full flex items-center gap-3 p-4 rounded-2xl bg-[#00A86B] text-white hover:bg-emerald-600 transition-all active:scale-[0.98] text-left cursor-pointer group">
                    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/25 transition-colors">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-black">+ Register Consultant</div>
                      <div className="text-[10px] text-emerald-100 mt-0.5">Enters PENDING_WORKFLOW</div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-emerald-200 group-hover:text-white transition-colors shrink-0" />
                  </button>

                  <button onClick={() => setActive('pending-approvals')} className="w-full flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-200/80 hover:bg-red-100/80 transition-all active:scale-[0.98] text-left cursor-pointer">
                    <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-black text-slate-900">Review Pending Approvals</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{pendingCount} awaiting country partner action</div>
                    </div>
                    <span className="bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                      {pendingCount}
                    </span>
                  </button>

                  {/* Earnings Callout */}
                  <div className="bg-[#0a0f1a] rounded-2xl p-4 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-slate-400">Total Net Commission</span>
                      <span className="text-xs font-black text-[#00A86B]">${metrics.my_commission.toLocaleString()}</span>
                    </div>
                    <button onClick={() => setActive('earnings')} className="w-full mt-2 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-colors">
                      View Earnings Report <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 2. REFERRAL CONSULTANTS TAB */}
          {(active === 'network' || active === 'referral-consultants') && (
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[28px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div>
                  <h2 className="text-[15px] font-black text-slate-900">Referral Consultants</h2>
                  <p className="text-[11px] text-slate-400 mt-0.5">{consultants.length} consultants registered in database</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
                      className="pl-8 pr-3 h-9 w-36 text-[12px] rounded-2xl border border-slate-200 bg-slate-50/80 focus:outline-none focus:ring-2 focus:ring-[#00A86B]/20 focus:border-[#00A86B]" />
                  </div>
                  <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                    className="h-9 px-3 text-[12px] rounded-2xl border border-slate-200 bg-white/80 focus:outline-none cursor-pointer">
                    <option value="All">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="pending_workflow">Pending Workflow</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button onClick={() => setShowAddConsultant(true)} className="h-9 px-3.5 bg-[#00A86B] hover:bg-emerald-600 text-white text-[12px] font-bold rounded-2xl flex items-center gap-1.5 cursor-pointer transition-colors">
                    <Plus className="w-3.5 h-3.5" /> Register Consultant
                  </button>
                </div>
              </div>

              {/* Consultants Table */}
              {filteredConsultants.length > 0 ? (
                <>
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                      <thead>
                        <tr className="border-b border-slate-100">
                          {['Consultant', 'State Partner', 'Speciality', 'Status', 'Revenue', 'Commission', 'Leads', 'Actions'].map(h => (
                            <th key={h} className="text-left text-[10px] font-black text-slate-400 uppercase tracking-wider py-2.5 pr-3 last:text-center">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {filteredConsultants.map(c => (
                          <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="py-3 pr-3">
                              <div className="text-[12px] font-bold text-slate-900">{c.consultant_name}</div>
                              <div className="text-[10px] text-slate-400">{c.email}</div>
                            </td>
                            <td className="py-3 pr-3 text-[11px] font-semibold text-slate-600">{c.state_partner_name || 'Unassigned'}</td>
                            <td className="py-3 pr-3 text-[11px] text-slate-600">{c.speciality || 'General'}</td>
                            <td className="py-3 pr-3"><StatusBadge status={c.status} /></td>
                            <td className="py-3 pr-3 text-[12px] font-black text-slate-900">${parseFloat(c.revenue as any || 0).toLocaleString()}</td>
                            <td className="py-3 pr-3 text-[12px] font-bold text-[#00A86B]">${parseFloat(c.commission as any || 0).toLocaleString()}</td>
                            <td className="py-3 pr-3 text-[12px] font-bold text-slate-700">{c.leads_count}</td>
                            <td className="py-3 text-center">
                              <div className="flex items-center justify-center gap-1">
                                {c.status === 'pending_workflow' && (
                                  <>
                                    <button onClick={() => handleApprovalAction(c.id, 'approve')} title="Approve" className="w-7 h-7 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 flex items-center justify-center cursor-pointer">
                                      <Check className="w-3.5 h-3.5 text-[#00A86B]" />
                                    </button>
                                    <button onClick={() => handleApprovalAction(c.id, 'reject')} title="Reject" className="w-7 h-7 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 flex items-center justify-center cursor-pointer">
                                      <X className="w-3.5 h-3.5 text-red-600" />
                                    </button>
                                  </>
                                )}
                                <button onClick={() => setTransferringConsultant(c)} title="Transfer State Partner" className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer">
                                  <ArrowRightLeft className="w-3.5 h-3.5 text-slate-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card List */}
                  <div className="md:hidden space-y-3">
                    {filteredConsultants.map(c => (
                      <div key={c.id} className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="text-[13px] font-bold text-slate-900">{c.consultant_name}</div>
                            <div className="text-[10px] text-slate-400">{c.email}</div>
                          </div>
                          <StatusBadge status={c.status} />
                        </div>
                        <div className="text-xs text-slate-600 mb-3">Partner: <strong>{c.state_partner_name || 'Unassigned'}</strong></div>
                        <div className="flex gap-2">
                          {c.status === 'pending_workflow' && (
                            <>
                              <button onClick={() => handleApprovalAction(c.id, 'approve')} className="flex-1 h-9 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1">
                                <Check className="w-3.5 h-3.5" /> Approve
                              </button>
                              <button onClick={() => handleApprovalAction(c.id, 'reject')} className="flex-1 h-9 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center justify-center gap-1">
                                <X className="w-3.5 h-3.5" /> Reject
                              </button>
                            </>
                          )}
                          <button onClick={() => setTransferringConsultant(c)} className="flex-1 h-9 rounded-2xl bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center gap-1">
                            <ArrowRightLeft className="w-3.5 h-3.5" /> Transfer
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="py-16 text-center">
                  <Users className="w-10 h-10 mx-auto mb-2 text-slate-200" />
                  <p className="text-sm font-bold text-slate-600 mb-1">No Referral Consultants in your network yet</p>
                  <p className="text-xs text-slate-400 mb-4">Click below to register consultants under your state partners.</p>
                  <button onClick={() => setShowAddConsultant(true)} className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#00A86B] text-white px-4 py-2 rounded-2xl cursor-pointer">
                    <Plus className="w-3.5 h-3.5" /> Register Consultant
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 3. STATE PARTNERS TAB */}
          {active === 'state-partners' && (
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[28px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-[15px] font-black text-slate-900">State Partners</h2>
                  <p className="text-[11px] text-slate-400 mt-0.5">{statePartners.length} regional partners assigned</p>
                </div>
                <button onClick={() => setShowAddPartner(true)} className="h-9 px-4 bg-slate-900 text-white text-[12px] font-bold rounded-2xl flex items-center gap-1.5 hover:bg-slate-800 cursor-pointer transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Add State Partner
                </button>
              </div>

              {statePartners.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {statePartners.map(sp => (
                    <div key={sp.id} className="border border-slate-200/70 bg-slate-50/60 rounded-2xl p-4 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[11px] font-black text-slate-700">
                          {sp.partner_name.substring(0, 2).toUpperCase()}
                        </div>
                        <StatusBadge status={sp.status} />
                      </div>
                      <h3 className="text-[13px] font-black text-slate-900 mb-0.5 leading-tight">{sp.partner_name}</h3>
                      <div className="text-[10px] text-slate-400 mb-3 flex items-center gap-1"><MapPin className="w-3 h-3" />{sp.operating_state}</div>
                      <div className="text-[11px] text-slate-600 mb-1 truncate">{sp.email}</div>
                      <div className="text-[10px] text-slate-400">{sp.phone || 'No phone registered'}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <Building2 className="w-10 h-10 mx-auto mb-2 text-slate-200" />
                  <p className="text-sm font-bold text-slate-600 mb-1">No State Partners registered yet</p>
                  <p className="text-xs text-slate-400 mb-4">Add state partners to establish regional operational presence.</p>
                  <button onClick={() => setShowAddPartner(true)} className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-900 text-white px-4 py-2 rounded-2xl cursor-pointer">
                    <Plus className="w-3.5 h-3.5" /> + Add State Partner
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 4. PENDING APPROVALS TAB */}
          {active === 'pending-approvals' && (
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[28px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-[15px] font-black text-slate-900">Pending Approvals Queue</h2>
                  <p className="text-[11px] text-slate-400 mt-0.5">{consultants.filter(c => c.status === 'pending_workflow').length} consultants in <strong>PENDING_WORKFLOW</strong></p>
                </div>
              </div>

              {consultants.filter(c => c.status === 'pending_workflow').length > 0 ? (
                <div className="space-y-3">
                  {consultants.filter(c => c.status === 'pending_workflow').map(c => (
                    <div key={c.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border border-amber-200/80 bg-amber-50/60 rounded-2xl">
                      <div>
                        <div className="text-[13px] font-black text-slate-900">{c.consultant_name}</div>
                        <div className="text-[11px] text-slate-500">{c.email} &bull; Assigned: {c.state_partner_name || 'Direct Country Partner'}</div>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-amber-700 mt-1">
                          <Clock className="w-3 h-3" /> PENDING_WORKFLOW
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleApprovalAction(c.id, 'approve')} className="h-9 px-4 bg-[#00A86B] hover:bg-emerald-600 text-white text-[12px] font-bold rounded-2xl flex items-center gap-1.5 cursor-pointer">
                          <Check className="w-3.5 h-3.5" /> Approve Consultant
                        </button>
                        <button onClick={() => handleApprovalAction(c.id, 'reject')} className="h-9 px-4 bg-white border border-red-200 text-red-600 text-[12px] font-bold rounded-2xl flex items-center gap-1.5 cursor-pointer hover:bg-red-50">
                          <X className="w-3.5 h-3.5" /> Reject
                        </button>
                        <button onClick={() => setTransferringConsultant(c)} className="h-9 px-3 bg-white border border-slate-200 text-slate-700 text-[12px] font-bold rounded-2xl flex items-center gap-1.5 cursor-pointer hover:bg-slate-50">
                          <ArrowRightLeft className="w-3.5 h-3.5" /> Transfer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-[#00A86B] opacity-60" />
                  <p className="text-sm font-bold text-slate-600">All approvals are up to date!</p>
                  <p className="text-xs text-slate-400 mt-0.5">No pending items requiring Country Partner sign-off.</p>
                </div>
              )}
            </div>
          )}

          {/* Fallback for other tabs */}
          {!['dashboard', 'network', 'referral-consultants', 'state-partners', 'pending-approvals'].includes(active) && (
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[28px] p-12 text-center shadow-sm">
              <Layers className="w-12 h-12 mx-auto mb-3 text-slate-200" />
              <h2 className="text-[16px] font-black text-slate-800 mb-1">{sectionTitle[active]}</h2>
              <p className="text-[13px] text-slate-400">Integrated with database tables &bull; Multi-tier channel analytics active.</p>
            </div>
          )}

        </main>
      </div>

      {/* Operation Modals */}
      {showAddPartner && (
        <AddStatePartnerModal
          onClose={() => setShowAddPartner(false)}
          onSuccess={() => { setShowAddPartner(false); fetchDashboardData(); }}
        />
      )}

      {showAddConsultant && (
        <AddConsultantModal
          statePartners={statePartners}
          onClose={() => setShowAddConsultant(false)}
          onSuccess={() => { setShowAddConsultant(false); fetchDashboardData(); }}
        />
      )}

      {transferringConsultant && (
        <TransferConsultantModal
          consultant={transferringConsultant}
          statePartners={statePartners}
          onClose={() => setTransferringConsultant(null)}
          onSuccess={() => { setTransferringConsultant(null); fetchDashboardData(); }}
        />
      )}

    </div>
  );
}
