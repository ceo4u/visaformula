// src/components/channel-partner/ChannelPartnerDashboard.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard, Users, BarChart2, Target, UserCheck, DollarSign,
  Megaphone, AlertTriangle, GraduationCap, Settings, ChevronDown,
  ChevronRight, TrendingUp, TrendingDown, Plus, Eye, Check, X,
  Edit2, ArrowRightLeft, Search, Download, Bell, LogOut,
  MapPin, Globe, Star, Clock, RefreshCw, ArrowUpRight,
  Banknote, ChevronLeft, Menu, Layers, CheckCircle2, XCircle,
  AlertCircle, Shield, Building2, Network, BadgeCheck, Wallet,
  SquareArrowOutUpRight, MoreHorizontal
} from 'lucide-react';

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const STATE_PARTNERS = [
  { id: 1, state: 'California', name: 'Pacific Visa Solutions', initials: 'PV', approved: 28, revenue: 18420, status: 'active', joined: 'Jan 2024' },
  { id: 2, state: 'New York', name: 'Empire Immigration LLC', initials: 'EI', approved: 22, revenue: 14200, status: 'active', joined: 'Feb 2024' },
  { id: 3, state: 'Texas', name: 'Lone Star Consultants', initials: 'LS', approved: 19, revenue: 9800, status: 'active', joined: 'Mar 2024' },
  { id: 4, state: 'Florida', name: 'Sunshine Pathways', initials: 'SP', approved: 17, revenue: 8340, status: 'active', joined: 'Mar 2024' },
  { id: 5, state: 'Illinois', name: 'Midwest Global Immigration', initials: 'MG', approved: 14, revenue: 6210, status: 'active', joined: 'Apr 2024' },
  { id: 6, state: 'Washington', name: 'Pacific Northwest Visas', initials: 'PN', approved: 11, revenue: 5100, status: 'active', joined: 'Apr 2024' },
  { id: 7, state: 'Massachusetts', name: 'Boston Immigration Group', initials: 'BI', approved: 9, revenue: 4280, status: 'pending_hq_approval', joined: 'May 2024' },
  { id: 8, state: 'Colorado', name: 'Rocky Mountain Pathways', initials: 'RM', approved: 6, revenue: 2860, status: 'pending_hq_approval', joined: 'Jun 2024' },
];

const REFERRAL_CONSULTANTS = [
  { id: 1, name: 'Aditya Sharma', initials: 'AS', statePartner: 'Pacific Visa Solutions', state: 'California', status: 'approved', revenue: 4280, commission: 856, leads: 42 },
  { id: 2, name: 'Priya Mehta', initials: 'PM', statePartner: 'Empire Immigration LLC', state: 'New York', status: 'approved', revenue: 3610, commission: 722, leads: 35 },
  { id: 3, name: 'James Wilson', initials: 'JW', statePartner: 'Lone Star Consultants', state: 'Texas', status: 'approved', revenue: 2980, commission: 596, leads: 31 },
  { id: 4, name: 'Maria Garcia', initials: 'MG', statePartner: 'Sunshine Pathways', state: 'Florida', status: 'pending_workflow', revenue: 1240, commission: 248, leads: 18 },
  { id: 5, name: 'Rahul Verma', initials: 'RV', statePartner: 'Pacific Visa Solutions', state: 'California', status: 'approved', revenue: 2140, commission: 428, leads: 24 },
  { id: 6, name: 'Emily Chen', initials: 'EC', statePartner: 'Pacific Northwest Visas', state: 'Washington', status: 'pending_workflow', revenue: 980, commission: 196, leads: 12 },
  { id: 7, name: 'Carlos Rodriguez', initials: 'CR', statePartner: 'Midwest Global Immigration', state: 'Illinois', status: 'approved', revenue: 1760, commission: 352, leads: 19 },
  { id: 8, name: 'Ananya Singh', initials: 'AN', statePartner: 'Empire Immigration LLC', state: 'New York', status: 'pending_workflow', revenue: 0, commission: 0, leads: 4 },
];

const REVENUE_CHART = [
  { month: 'Jan', revenue: 24000, commission: 4800 },
  { month: 'Feb', revenue: 28000, commission: 5600 },
  { month: 'Mar', revenue: 32000, commission: 6400 },
  { month: 'Apr', revenue: 38000, commission: 7600 },
  { month: 'May', revenue: 42000, commission: 8400 },
  { month: 'Jun', revenue: 48210, commission: 12540 },
];

const RECENT_APPROVALS = [
  { name: 'Pathway Immigration Services', type: 'State Partner', status: 'approved', date: '2h ago', state: 'Georgia' },
  { name: 'Global Edu Connect', type: 'Referral Consultant', status: 'pending_workflow', date: '5h ago', state: 'New Jersey' },
  { name: 'Visa Express Group', type: 'Referral Consultant', status: 'approved', date: '1d ago', state: 'Texas' },
  { name: 'NextGen Immigration', type: 'State Partner', status: 'approved', date: '2d ago', state: 'Arizona' },
];

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

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
    approved:              { label: 'Approved',              cls: 'bg-emerald-50 text-emerald-800 border-emerald-200', icon: <CheckCircle2 className="w-3 h-3" /> },
    active:                { label: 'Active',                cls: 'bg-emerald-50 text-emerald-800 border-emerald-200', icon: <CheckCircle2 className="w-3 h-3" /> },
    pending_hq_approval:   { label: 'Pending HQ Approval',   cls: 'bg-violet-50 text-violet-800 border-violet-200',   icon: <Shield className="w-3 h-3" /> },
    pending_workflow:      { label: 'Pending Workflow',       cls: 'bg-amber-50 text-amber-800 border-amber-200',      icon: <Clock className="w-3 h-3" /> },
    rejected:              { label: 'Rejected',               cls: 'bg-red-50 text-red-800 border-red-200',            icon: <XCircle className="w-3 h-3" /> },
  };
  const cfg = map[status] ?? map['pending_workflow'];
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border whitespace-nowrap ${cfg.cls}`}>
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

// ─── AREA CHART SVG ───────────────────────────────────────────────────────────
function AreaChart({ data }: { data: typeof REVENUE_CHART }) {
  const maxR = Math.max(...data.map(d => d.revenue));
  const W = 400, H = 100, P = 12;
  const pts = data.map((d, i) => {
    const x = P + (i / (data.length - 1)) * (W - P * 2);
    const y = H - P - (d.revenue / maxR) * (H - P * 2);
    return [x, y] as [number, number];
  });
  const line = pts.map(([x, y]) => `${x},${y}`).join(' ');
  const area = `M${pts[0].join(',')} ${pts.map(([x, y]) => `L${x},${y}`).join(' ')} L${pts[pts.length - 1][0]},${H - P} L${pts[0][0]},${H - P} Z`;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full">
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00A86B" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#00A86B" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#cg)" />
      <polyline points={line} fill="none" stroke="#00A86B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#00A86B" stroke="white" strokeWidth="2" />
      ))}
    </svg>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, iconBg, positive = true }: any) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-slate-200/70 rounded-[24px] p-4 sm:p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={`flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full ${positive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
          {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {sub}
        </span>
      </div>
      <div className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">{value}</div>
      <div className="text-[11px] font-semibold text-slate-500 leading-tight">{label}</div>
    </div>
  );
}

// ─── ADD STATE PARTNER MODAL ──────────────────────────────────────────────────
function AddStatePartnerModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<'form' | 'done'>('form');
  const [form, setForm] = useState({ name: '', company: '', state: '', email: '', phone: '' });
  const US_STATES = ['Alabama','Alaska','Arizona','Arkansas','Colorado','Connecticut','Delaware','Georgia','Hawaii','Idaho','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Utah','Vermont','Virginia','West Virginia','Wisconsin','Wyoming'];

  return (
    <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)' }}>
      <div className="bg-white w-full sm:max-w-[480px] rounded-t-[32px] sm:rounded-[28px] shadow-2xl overflow-hidden animate-fadeIn">
        {/* Handle bar (mobile) */}
        <div className="flex justify-center pt-3 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-slate-200" />
        </div>
        <div className="flex items-center justify-between px-6 pt-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-slate-900">Add State Partner</h3>
            <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
              <Shield className="w-3 h-3 text-violet-500" />
              Status will be set to <strong className="text-violet-700">PENDING_HQ_APPROVAL</strong>
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={e => { e.preventDefault(); setStep('done'); }} className="p-6 space-y-4">
            {/* Hierarchy Alert */}
            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-3.5 flex gap-3">
              <div className="flex flex-col gap-1 text-[10px]">
                {['TravlTik HQ', 'YOU (Country Partner)', 'New State Partner ← Adding here', 'Consultants', 'Leads'].map((t, i) => (
                  <div key={i} className={`flex items-center gap-1.5 ${i === 2 ? 'font-black text-violet-800' : 'text-slate-400'}`}>
                    <span className={`w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center ${i === 2 ? 'bg-violet-600 text-white' : 'bg-slate-200 text-slate-500'}`}>{i + 1}</span>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Contact Name *</label>
                <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                  className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/25 focus:border-[#00A86B] bg-slate-50/50" placeholder="John Smith" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1.5">State *</label>
                <select required value={form.state} onChange={e => setForm(f => ({...f, state: e.target.value}))}
                  className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/25 focus:border-[#00A86B] bg-slate-50/50 appearance-none cursor-pointer">
                  <option value="">Select...</option>
                  {US_STATES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Company / Agency *</label>
              <input required value={form.company} onChange={e => setForm(f => ({...f, company: e.target.value}))}
                className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/25 focus:border-[#00A86B] bg-slate-50/50" placeholder="Immigration Experts LLC" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Email *</label>
                <input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                  className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/25 focus:border-[#00A86B] bg-slate-50/50" placeholder="partner@co.com" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Phone</label>
                <input value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                  className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/25 focus:border-[#00A86B] bg-slate-50/50" placeholder="+1 555 000 0000" />
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              <button type="button" onClick={onClose} className="flex-1 h-12 rounded-2xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors">Cancel</button>
              <button type="submit" className="flex-1 h-12 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold cursor-pointer transition-colors">Submit to HQ →</button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#00A86B]" />
            </div>
            <h4 className="text-lg font-black text-slate-900 mb-1">Submitted!</h4>
            <p className="text-sm text-slate-500 mb-2">State Partner request sent to TravlTik HQ.</p>
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

// ─── ADD CONSULTANT MODAL ─────────────────────────────────────────────────────
function AddConsultantModal({ onClose, statePartners }: { onClose: () => void; statePartners: typeof STATE_PARTNERS }) {
  const [step, setStep] = useState<'form' | 'done'>('form');
  const [form, setForm] = useState({ name: '', email: '', phone: '', statePartner: '', speciality: '' });
  const activePartners = statePartners.filter(sp => sp.status === 'active');

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
              Status → <strong className="text-amber-700">PENDING_WORKFLOW</strong>
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={e => { e.preventDefault(); setStep('done'); }} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Full Name *</label>
                <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                  className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/25 focus:border-[#00A86B] bg-slate-50/50" placeholder="Jane Doe" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Assign State Partner *</label>
                <select required value={form.statePartner} onChange={e => setForm(f => ({...f, statePartner: e.target.value}))}
                  className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/25 focus:border-[#00A86B] bg-slate-50/50 cursor-pointer">
                  <option value="">Select Partner...</option>
                  {activePartners.map(sp => <option key={sp.id} value={sp.name}>{sp.name}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Email *</label>
              <input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/25 focus:border-[#00A86B] bg-slate-50/50" placeholder="consultant@example.com" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Phone</label>
                <input value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                  className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/25 focus:border-[#00A86B] bg-slate-50/50" placeholder="+1 555 000 0000" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Speciality</label>
                <select value={form.speciality} onChange={e => setForm(f => ({...f, speciality: e.target.value}))}
                  className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/25 focus:border-[#00A86B] bg-slate-50/50 cursor-pointer">
                  <option value="">Select...</option>
                  {['Student Visa', 'Work Permit', 'PR / Migration', 'Tourist / Visitor', 'Business Visa'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-800">Approval flows: <strong>Country Partner → State Partner → Consultant</strong>. You can approve from the Pending Approvals queue.</p>
            </div>
            <div className="flex gap-3 pt-1">
              <button type="button" onClick={onClose} className="flex-1 h-12 rounded-2xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors">Cancel</button>
              <button type="submit" className="flex-1 h-12 rounded-2xl bg-[#00A86B] hover:bg-emerald-600 text-white text-sm font-bold cursor-pointer transition-colors">Register →</button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#00A86B]" />
            </div>
            <h4 className="text-lg font-black text-slate-900 mb-1">Consultant Registered!</h4>
            <p className="text-sm text-slate-500 mb-2">Now in approval workflow queue.</p>
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

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive, pendingCount, collapsed, setCollapsed, onClose }: any) {
  const [expanded, setExpanded] = useState<string[]>(['network', 'earnings']);

  const toggle = (id: string) => setExpanded(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  return (
    <div className={`flex flex-col h-full bg-[#0a0f1a] text-white ${collapsed ? 'w-[68px]' : 'w-[248px]'} transition-all duration-300 ease-in-out`}>

      {/* Top Logo */}
      <div className={`flex items-center ${collapsed ? 'justify-center px-3' : 'justify-between px-5'} pt-5 pb-4 border-b border-white/5`}>
        {!collapsed && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              {/* Logo mark */}
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#00A86B] to-emerald-400 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-900/40">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-black text-white tracking-tight leading-none">TravlTik</div>
                <div className="text-[9px] font-bold text-slate-400 tracking-[0.15em] uppercase leading-none mt-0.5">Channel Partner</div>
              </div>
            </div>
            <div className="ml-9">
              <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-emerald-900 bg-[#00A86B] px-2 py-0.5 rounded-full">
                <Star className="w-2.5 h-2.5" /> Platinum Partner
              </span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00A86B] to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-900/40">
            <Globe className="w-4.5 h-4.5 text-white" size={18} />
          </div>
        )}
        <button
          onClick={() => { setCollapsed(!collapsed); onClose?.(); }}
          className="hidden lg:flex w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 items-center justify-center cursor-pointer transition-colors shrink-0"
        >
          {collapsed ? <ChevronRight className="w-3 h-3 text-slate-400" /> : <ChevronLeft className="w-3 h-3 text-slate-400" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5 scrollbar-hide">
        {NAV_LINKS.map(item => {
          const isActive = active === item.id || item.children?.some(c => c.id === active);
          const isExpanded = expanded.includes(item.id);

          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.children) { toggle(item.id); if (!isExpanded) setActive(item.id); }
                  else { setActive(item.id); onClose?.(); }
                }}
                className={`w-full flex items-center ${collapsed ? 'justify-center px-0' : 'gap-3 px-3'} py-2.5 rounded-2xl transition-all text-left cursor-pointer group ${
                  isActive && !item.children ? 'bg-[#00A86B] text-white shadow-lg shadow-emerald-900/25'
                  : isActive ? 'bg-white/5 text-white'
                  : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon size={18} className="shrink-0" />
                {!collapsed && (
                  <>
                    <span className="text-[13px] font-semibold flex-1 truncate">{item.label}</span>
                    {item.children && (
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    )}
                  </>
                )}
              </button>

              {/* Sub-links */}
              {!collapsed && item.children && isExpanded && (
                <div className="ml-7 mt-0.5 mb-1 space-y-0.5">
                  {item.children.map((child: any) => (
                    <button
                      key={child.id}
                      onClick={() => { setActive(child.id); onClose?.(); }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[12px] font-semibold cursor-pointer transition-colors ${
                        active === child.id ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      <span>{child.label}</span>
                      {child.badge && pendingCount > 0 && (
                        <span className="min-w-[18px] h-[18px] bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center px-1">{pendingCount}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom user card */}
      {!collapsed ? (
        <div className="p-3 border-t border-white/5">
          <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-3 hover:bg-white/8 transition-colors">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#00A86B] to-emerald-400 flex items-center justify-center font-black text-white text-xs shrink-0">GH</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-black text-white truncate">Global Horizons Pvt.</div>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                <MapPin className="w-2.5 h-2.5" />United States
              </div>
            </div>
            <button className="text-slate-500 hover:text-red-400 transition-colors cursor-pointer shrink-0">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-2 border-t border-white/5 flex justify-center">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#00A86B] to-emerald-400 flex items-center justify-center font-black text-white text-xs">GH</div>
        </div>
      )}
    </div>
  );
}

// ─── DASHBOARD MAIN ───────────────────────────────────────────────────────────
function DashboardMain({ consultants, setConsultants, openAddPartner, openAddConsultant }: any) {
  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        <StatCard icon={DollarSign}   iconBg="bg-emerald-100 text-[#00A86B]"  label="Total Revenue" value="$48,210" sub="+18.6%" positive />
        <StatCard icon={Banknote}     iconBg="bg-blue-100 text-blue-600"       label="My Commission" value="$12,540" sub="+15.2%" positive />
        <StatCard icon={Globe}        iconBg="bg-violet-100 text-violet-600"   label="State Partners" value="8" sub="+1 new" positive />
        <StatCard icon={Users}        iconBg="bg-amber-100 text-amber-600"     label="Approved Consultants" value="126" sub="+14 new" positive />
        <StatCard icon={Target}       iconBg="bg-cyan-100 text-cyan-600"       label="Total Leads" value="1,248" sub="+21.4%" positive />
        <StatCard icon={TrendingUp}   iconBg="bg-rose-100 text-rose-500"       label="Conversion Rate" value="24.3%" sub="+3.6%" positive />
      </div>

      {/* 2-col grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Network overview */}
        <div className="xl:col-span-2 bg-white/80 backdrop-blur-xl border border-slate-200/70 rounded-[28px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-start justify-between mb-4 gap-2 flex-wrap">
            <div>
              <h2 className="text-[15px] font-black text-slate-900">My Network Overview</h2>
              <HierarchyBadge />
            </div>
            <div className="flex gap-1.5">
              <button className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-slate-900 text-white cursor-pointer">State Partners</button>
              <button className="text-[11px] font-bold px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">Referral</button>
            </div>
          </div>

          {/* US coverage chips */}
          <div className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-4 mb-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1">
              <Globe className="w-4 h-4 text-slate-400" />
              <span className="text-[11px] font-bold text-slate-500">United States — Active Coverage</span>
              <div className="flex gap-1.5 ml-auto">
                <span className="flex items-center gap-1 text-[10px] font-bold text-[#00A86B] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-[#00A86B]" />Active</span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-violet-700 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-violet-500" />Pending HQ</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {STATE_PARTNERS.map(sp => (
                <span key={sp.id} className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                  sp.status === 'active' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-violet-50 text-violet-800 border-violet-200'
                }`}>{sp.state}</span>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px]">
              <thead>
                <tr className="border-b border-slate-100">
                  {['State', 'Partner Name', 'Consultants', 'Revenue', 'Status', ''].map(h => (
                    <th key={h} className="text-left text-[10px] font-black text-slate-400 uppercase tracking-wider py-2 pr-3 last:pr-0">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50/80">
                {STATE_PARTNERS.map(sp => (
                  <tr key={sp.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 pr-3 text-[12px] font-bold text-slate-700">{sp.state}</td>
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-[9px] font-black text-slate-600">{sp.initials}</div>
                        <span className="text-[12px] font-semibold text-slate-800 truncate max-w-[140px]">{sp.name}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-3 text-[12px] font-black text-slate-900">{sp.approved}</td>
                    <td className="py-3 pr-3 text-[12px] font-black text-[#00A86B]">${sp.revenue.toLocaleString()}</td>
                    <td className="py-3 pr-3"><StatusBadge status={sp.status} /></td>
                    <td className="py-3">
                      <button className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer">
                        <Eye className="w-3.5 h-3.5 text-slate-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/70 rounded-[28px] p-5 shadow-sm hover:shadow-md transition-all">
          <h2 className="text-[15px] font-black text-slate-900 mb-1">Quick Actions</h2>
          <p className="text-[11px] text-slate-400 mb-4">Manage your partner network</p>
          <div className="space-y-2.5">
            {/* Primary CTA */}
            <button onClick={openAddPartner} className="w-full flex items-center gap-3 p-4 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-all active:scale-[0.98] text-left cursor-pointer group">
              <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-black">Add State Partner</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Requires HQ approval</div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-colors shrink-0" />
            </button>

            <button onClick={openAddConsultant} className="w-full flex items-center gap-3 p-4 rounded-2xl bg-[#00A86B] text-white hover:bg-emerald-600 transition-all active:scale-[0.98] text-left cursor-pointer group">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/25 transition-colors">
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-black">Register Consultant</div>
                <div className="text-[10px] text-emerald-100 mt-0.5">Enter approval workflow</div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-emerald-200 group-hover:text-white transition-colors shrink-0" />
            </button>

            <button className="w-full flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-200/80 hover:bg-red-100/80 transition-all active:scale-[0.98] text-left cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-black text-slate-900">Pending Approvals</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Awaiting your decision</div>
              </div>
              <span className="bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shrink-0">3</span>
            </button>

            {[
              { icon: Target, label: 'View All Leads', sub: '1,248 total generated', bg: 'bg-cyan-50 border-cyan-200/80 hover:bg-cyan-100/80', iconBg: 'bg-cyan-100', iconColor: 'text-cyan-600' },
              { icon: Megaphone, label: 'Marketing Toolkit', sub: 'Banners, tracking, creatives', bg: 'bg-violet-50 border-violet-200/80 hover:bg-violet-100/80', iconBg: 'bg-violet-100', iconColor: 'text-violet-600' },
            ].map(item => (
              <button key={item.label} className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border transition-all active:scale-[0.98] text-left cursor-pointer ${item.bg}`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}>
                  <item.icon className={`w-4 h-4 ${item.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-bold text-slate-900">{item.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{item.sub}</div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Chart + Top Consultants */}
        <div className="xl:col-span-2 bg-white/80 backdrop-blur-xl border border-slate-200/70 rounded-[28px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-1 gap-2 flex-wrap">
            <div>
              <h2 className="text-[15px] font-black text-slate-900">Business Progress</h2>
              <p className="text-[11px] text-slate-400">Revenue growth — 2024</p>
            </div>
            <select className="text-[11px] font-bold border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none bg-white/80 cursor-pointer text-slate-700">
              <option>This Year</option><option>This Quarter</option><option>This Month</option>
            </select>
          </div>

          <div className="my-4"><AreaChart data={REVENUE_CHART} /></div>

          <div className="grid grid-cols-6 gap-1 border-t border-slate-100 pt-3 mb-5">
            {REVENUE_CHART.map((d, i) => (
              <div key={i} className="text-center">
                <div className="text-[10px] text-slate-400 font-medium">{d.month}</div>
                <div className="text-[12px] font-black text-slate-900">${(d.revenue / 1000).toFixed(0)}k</div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-4">
            <h3 className="text-[13px] font-black text-slate-900 mb-3">Top Performing Consultants</h3>
            <div className="space-y-2">
              {consultants.filter((c: any) => c.status === 'approved').slice(0, 4).map((c: any, i: number) => (
                <div key={c.id} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/80 hover:bg-slate-100/60 transition-colors">
                  <span className="text-[11px] font-black text-slate-400 w-4 shrink-0">#{i + 1}</span>
                  <div className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-700 shrink-0">{c.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-bold text-slate-900 truncate">{c.name}</div>
                    <div className="text-[10px] text-slate-400">{c.state} · {c.leads} leads</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[12px] font-black text-slate-900">${c.revenue.toLocaleString()}</div>
                    <div className="text-[10px] font-bold text-[#00A86B]">+${c.commission.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Recent Approvals */}
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200/70 rounded-[28px] p-5 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[13px] font-black text-slate-900">Recent Approvals</h2>
              <button className="text-[11px] font-bold text-[#00A86B] hover:underline cursor-pointer">View all</button>
            </div>
            <div className="space-y-2">
              {RECENT_APPROVALS.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50/80 hover:bg-slate-100/60 transition-colors">
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${item.status === 'approved' ? 'bg-emerald-100' : 'bg-amber-100'}`}>
                    {item.status === 'approved'
                      ? <CheckCircle2 className="w-3.5 h-3.5 text-[#00A86B]" />
                      : <Clock className="w-3.5 h-3.5 text-amber-600" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-bold text-slate-900 truncate">{item.name}</div>
                    <div className="text-[10px] text-slate-400">{item.type} · {item.state}</div>
                  </div>
                  <div className="text-[10px] text-slate-400 shrink-0">{item.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Earnings Summary */}
          <div className="bg-[#0a0f1a] rounded-[28px] p-5 shadow-xl border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[13px] font-black text-white">Earnings Summary</h2>
              <select className="text-[11px] font-bold bg-white/10 border border-white/10 text-slate-300 rounded-xl px-2.5 py-1 focus:outline-none cursor-pointer">
                <option>This Month</option><option>This Quarter</option><option>This Year</option>
              </select>
            </div>
            {[
              { label: 'Total Business', val: '$48,210', color: 'text-white' },
              { label: 'My Commission', val: '$12,540', color: 'text-[#00A86B]' },
              { label: 'Pending Commission', val: '$4,210', color: 'text-amber-400' },
              { label: 'Paid Commission', val: '$8,330', color: 'text-blue-400' },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                <span className="text-[11px] font-semibold text-slate-400">{item.label}</span>
                <span className={`text-[13px] font-black ${item.color}`}>{item.val}</span>
              </div>
            ))}
            <button className="w-full mt-4 h-11 rounded-2xl bg-[#00A86B] hover:bg-emerald-500 text-white text-[12px] font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors active:scale-[0.98]">
              View Earnings Report <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CONSULTANTS TABLE (with mobile card view) ────────────────────────────────
function ConsultantsTable({ consultants, setConsultants }: any) {
  const [search, setSearch] = useState('');
  const [filterState, setFilterState] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = consultants.filter((c: any) => {
    const q = search.toLowerCase();
    const matchQ = c.name.toLowerCase().includes(q) || c.statePartner.toLowerCase().includes(q);
    const matchState = filterState === 'All' || c.state === filterState;
    const matchStatus = filterStatus === 'All' || c.status === filterStatus;
    return matchQ && matchState && matchStatus;
  });

  const approve = (id: number) => setConsultants((p: any[]) => p.map(c => c.id === id ? {...c, status: 'approved'} : c));
  const reject  = (id: number) => setConsultants((p: any[]) => p.map(c => c.id === id ? {...c, status: 'rejected'} : c));

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-slate-200/70 rounded-[28px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-[15px] font-black text-slate-900">Referral Consultants</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">{filtered.length} consultants · approve, reject, or transfer</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
              className="pl-8 pr-3 h-9 w-36 text-[12px] rounded-2xl border border-slate-200 bg-slate-50/80 focus:outline-none focus:ring-2 focus:ring-[#00A86B]/20 focus:border-[#00A86B]" />
          </div>
          <select value={filterState} onChange={e => setFilterState(e.target.value)}
            className="h-9 px-3 text-[12px] rounded-2xl border border-slate-200 bg-white/80 focus:outline-none cursor-pointer">
            <option value="All">All States</option>
            {[...new Set(consultants.map((c: any) => c.state))].map((s: any) => <option key={s}>{s}</option>)}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="h-9 px-3 text-[12px] rounded-2xl border border-slate-200 bg-white/80 focus:outline-none cursor-pointer">
            <option value="All">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending_workflow">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className="h-9 px-3.5 text-[12px] font-bold bg-slate-100 hover:bg-slate-200 rounded-2xl flex items-center gap-1.5 cursor-pointer transition-colors">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="border-b border-slate-100">
              {['Consultant', 'State Partner', 'State', 'Status', 'Revenue', 'Commission', 'Leads', 'Actions'].map(h => (
                <th key={h} className="text-left text-[10px] font-black text-slate-400 uppercase tracking-wider py-2.5 pr-3 last:text-center">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((c: any) => (
              <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3 pr-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-700 shrink-0">{c.initials}</div>
                    <div>
                      <div className="text-[12px] font-bold text-slate-900">{c.name}</div>
                      <div className="text-[10px] text-slate-400">ID #{String(c.id).padStart(4,'0')}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 pr-3 text-[11px] font-semibold text-slate-600 max-w-[120px] truncate">{c.statePartner}</td>
                <td className="py-3 pr-3 text-[11px] text-slate-600">{c.state}</td>
                <td className="py-3 pr-3"><StatusBadge status={c.status} /></td>
                <td className="py-3 pr-3 text-[12px] font-black text-slate-900">${c.revenue.toLocaleString()}</td>
                <td className="py-3 pr-3 text-[12px] font-bold text-[#00A86B]">${c.commission.toLocaleString()}</td>
                <td className="py-3 pr-3 text-[12px] font-bold text-slate-700">{c.leads}</td>
                <td className="py-3">
                  <div className="flex items-center justify-center gap-1">
                    {c.status === 'pending_workflow' && (
                      <>
                        <button onClick={() => approve(c.id)} title="Approve" className="w-7 h-7 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 flex items-center justify-center cursor-pointer transition-colors">
                          <Check className="w-3.5 h-3.5 text-[#00A86B]" />
                        </button>
                        <button onClick={() => reject(c.id)} title="Reject" className="w-7 h-7 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 flex items-center justify-center cursor-pointer transition-colors">
                          <X className="w-3.5 h-3.5 text-red-600" />
                        </button>
                      </>
                    )}
                    <button title="Edit" className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors">
                      <Edit2 className="w-3.5 h-3.5 text-slate-600" />
                    </button>
                    <button title="Transfer" className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors">
                      <ArrowRightLeft className="w-3.5 h-3.5 text-slate-600" />
                    </button>
                    <button title="View" className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors">
                      <Eye className="w-3.5 h-3.5 text-slate-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {filtered.map((c: any) => (
          <div key={c.id} className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[11px] font-black text-slate-700">{c.initials}</div>
                <div>
                  <div className="text-[13px] font-bold text-slate-900">{c.name}</div>
                  <div className="text-[10px] text-slate-400">{c.statePartner}</div>
                </div>
              </div>
              <StatusBadge status={c.status} />
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { label: 'Revenue', val: `$${c.revenue.toLocaleString()}`, color: 'text-slate-900' },
                { label: 'Commission', val: `$${c.commission.toLocaleString()}`, color: 'text-[#00A86B]' },
                { label: 'Leads', val: c.leads, color: 'text-slate-700' },
              ].map(m => (
                <div key={m.label} className="bg-white rounded-xl p-2 text-center border border-slate-100">
                  <div className={`text-[12px] font-black ${m.color}`}>{m.val}</div>
                  <div className="text-[9px] text-slate-400 font-medium">{m.label}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              {c.status === 'pending_workflow' && (
                <>
                  <button onClick={() => approve(c.id)} className="flex-1 h-9 rounded-2xl bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-800 flex items-center justify-center gap-1 cursor-pointer">
                    <Check className="w-3.5 h-3.5" /> Approve
                  </button>
                  <button onClick={() => reject(c.id)} className="flex-1 h-9 rounded-2xl bg-red-50 border border-red-200 text-[11px] font-bold text-red-700 flex items-center justify-center gap-1 cursor-pointer">
                    <X className="w-3.5 h-3.5" /> Reject
                  </button>
                </>
              )}
              <button className="flex-1 h-9 rounded-2xl bg-white border border-slate-200 text-[11px] font-bold text-slate-700 flex items-center justify-center gap-1 cursor-pointer">
                <MoreHorizontal className="w-3.5 h-3.5" /> More
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <Users className="w-10 h-10 mx-auto mb-2 text-slate-200" />
          <p className="text-sm font-semibold text-slate-400">No consultants found</p>
        </div>
      )}
    </div>
  );
}

// ─── PENDING APPROVALS ────────────────────────────────────────────────────────
function PendingApprovals({ consultants, setConsultants }: any) {
  const pending = consultants.filter((c: any) => c.status === 'pending_workflow');
  const approve = (id: number) => setConsultants((p: any[]) => p.map(c => c.id === id ? {...c, status: 'approved'} : c));
  const reject  = (id: number) => setConsultants((p: any[]) => p.map(c => c.id === id ? {...c, status: 'rejected'} : c));

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-slate-200/70 rounded-[28px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[15px] font-black text-slate-900">Pending Approvals</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">{pending.length} items in <strong>PENDING_WORKFLOW</strong></p>
        </div>
        {pending.length > 0 && (
          <span className="bg-red-500 text-white text-[11px] font-black px-3 py-1 rounded-full">{pending.length} Pending</span>
        )}
      </div>

      {pending.length === 0 ? (
        <div className="py-16 text-center">
          <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-[#00A86B] opacity-60" />
          <p className="text-sm font-bold text-slate-500">All caught up! No pending approvals.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {pending.map((c: any) => (
            <div key={c.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border border-amber-200/80 bg-amber-50/60 rounded-2xl hover:bg-amber-50 transition-colors">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-sm font-black text-amber-800 shrink-0">{c.initials}</div>
                <div className="min-w-0">
                  <div className="text-[13px] font-black text-slate-900">{c.name}</div>
                  <div className="text-[11px] text-slate-500 truncate">{c.statePartner} · {c.state}</div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-amber-700 mt-0.5">
                    <Clock className="w-3 h-3" /> PENDING_WORKFLOW
                  </div>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => approve(c.id)} className="h-9 px-4 bg-[#00A86B] hover:bg-emerald-600 text-white text-[12px] font-bold rounded-2xl flex items-center gap-1.5 cursor-pointer transition-colors active:scale-[0.97]">
                  <Check className="w-3.5 h-3.5" /> Approve
                </button>
                <button onClick={() => reject(c.id)} className="h-9 px-4 bg-white border border-red-200 text-red-600 text-[12px] font-bold rounded-2xl flex items-center gap-1.5 cursor-pointer transition-colors hover:bg-red-50 active:scale-[0.97]">
                  <X className="w-3.5 h-3.5" /> Reject
                </button>
                <button className="h-9 px-3.5 bg-white border border-slate-200 text-slate-700 text-[12px] font-bold rounded-2xl flex items-center gap-1.5 cursor-pointer transition-colors hover:bg-slate-50">
                  <ArrowRightLeft className="w-3.5 h-3.5" /> Transfer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── STATE PARTNERS VIEW ──────────────────────────────────────────────────────
function StatePartnersView({ openAddPartner }: { openAddPartner: () => void }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-slate-200/70 rounded-[28px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[15px] font-black text-slate-900">State Partners</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">8 partners in your network</p>
        </div>
        <button onClick={openAddPartner} className="h-9 px-4 bg-slate-900 text-white text-[12px] font-bold rounded-2xl flex items-center gap-1.5 hover:bg-slate-800 cursor-pointer transition-colors active:scale-[0.97]">
          <Plus className="w-3.5 h-3.5" /> Add Partner
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {STATE_PARTNERS.map(sp => (
          <div key={sp.id} className="border border-slate-200/70 bg-slate-50/60 rounded-2xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[11px] font-black text-slate-700">{sp.initials}</div>
              <StatusBadge status={sp.status} />
            </div>
            <h3 className="text-[13px] font-black text-slate-900 mb-0.5 leading-tight">{sp.name}</h3>
            <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-3"><MapPin className="w-3 h-3" />{sp.state}</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-xl p-2 border border-slate-100 text-center">
                <div className="text-[13px] font-black text-slate-900">{sp.approved}</div>
                <div className="text-[9px] text-slate-400 font-medium">Consultants</div>
              </div>
              <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-100 text-center">
                <div className="text-[13px] font-black text-[#00A86B]">${(sp.revenue / 1000).toFixed(1)}k</div>
                <div className="text-[9px] text-slate-400 font-medium">Revenue</div>
              </div>
            </div>
            <button className="w-full mt-3 h-8 rounded-xl border border-slate-200 bg-white text-[11px] font-bold text-slate-700 hover:bg-slate-50 cursor-pointer flex items-center justify-center gap-1.5 transition-colors">
              <Eye className="w-3.5 h-3.5" /> View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ROOT COMPONENT ───────────────────────────────────────────────────────────
export default function ChannelPartnerDashboard() {
  const [active, setActive] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAddPartner, setShowAddPartner] = useState(false);
  const [showAddConsultant, setShowAddConsultant] = useState(false);
  const [consultants, setConsultants] = useState(REFERRAL_CONSULTANTS);

  const pendingCount = consultants.filter(c => c.status === 'pending_workflow').length;

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

  return (
    <div className="flex h-screen bg-[#f1f3f5] overflow-hidden" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar desktop */}
      <div className="hidden lg:flex shrink-0">
        <Sidebar
          active={active}
          setActive={setActive}
          pendingCount={pendingCount}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
      </div>

      {/* Sidebar mobile drawer */}
      <div className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out lg:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar
          active={active}
          setActive={setActive}
          pendingCount={pendingCount}
          collapsed={false}
          setCollapsed={() => {}}
          onClose={() => setMobileOpen(false)}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="bg-white/90 backdrop-blur-xl border-b border-slate-200/80 h-14 flex items-center justify-between px-4 sm:px-6 shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
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
            <button className="relative w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors">
              <Bell className="w-4 h-4 text-slate-600" />
              {pendingCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center px-1">{pendingCount}</span>
              )}
            </button>
            <button className="w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors">
              <RefreshCw className="w-4 h-4 text-slate-600" />
            </button>
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#00A86B] to-emerald-400 flex items-center justify-center font-black text-white text-[11px] cursor-pointer shadow-md shadow-emerald-500/25">
              GH
            </div>
          </div>
        </header>

        {/* Page body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6">
          {active === 'dashboard' && (
            <DashboardMain
              consultants={consultants}
              setConsultants={setConsultants}
              openAddPartner={() => setShowAddPartner(true)}
              openAddConsultant={() => setShowAddConsultant(true)}
            />
          )}
          {(active === 'network' || active === 'referral-consultants') && (
            <ConsultantsTable consultants={consultants} setConsultants={setConsultants} />
          )}
          {active === 'state-partners' && (
            <StatePartnersView openAddPartner={() => setShowAddPartner(true)} />
          )}
          {active === 'pending-approvals' && (
            <PendingApprovals consultants={consultants} setConsultants={setConsultants} />
          )}
          {!['dashboard', 'network', 'referral-consultants', 'state-partners', 'pending-approvals'].includes(active) && (
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/70 rounded-[28px] p-12 text-center shadow-sm">
              <Layers className="w-12 h-12 mx-auto mb-3 text-slate-200" />
              <h2 className="text-[16px] font-black text-slate-800 mb-1">{sectionTitle[active]}</h2>
              <p className="text-[13px] text-slate-400">This section is under development. Coming soon!</p>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      {showAddPartner    && <AddStatePartnerModal onClose={() => setShowAddPartner(false)} />}
      {showAddConsultant && <AddConsultantModal onClose={() => setShowAddConsultant(false)} statePartners={STATE_PARTNERS} />}
    </div>
  );
}
