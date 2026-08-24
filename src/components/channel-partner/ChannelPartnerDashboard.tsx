// src/components/channel-partner/ChannelPartnerDashboard.tsx
'use client';
import React, { useState } from 'react';
import {
  LayoutDashboard, Users, BarChart2, Target, UserCheck, DollarSign,
  Megaphone, AlertTriangle, GraduationCap, Settings, ChevronDown,
  ChevronRight, TrendingUp, TrendingDown, Plus, Eye, Check, X,
  Edit2, ArrowRightLeft, Search, Filter, Download, Bell, LogOut,
  MapPin, Globe, Star, Clock, RefreshCw, ArrowUpRight, Award,
  FileText, Banknote, PieChart, ChevronLeft, Menu, Layers,
  CheckCircle2, XCircle, AlertCircle, Mail, Phone, Building2,
  CalendarDays, Zap, Shield
} from 'lucide-react';

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
const STATE_PARTNERS = [
  { id: 1, state: 'California', name: 'Pacific Visa Solutions', approved: 28, revenue: 18420, status: 'active' },
  { id: 2, state: 'New York', name: 'Empire Immigration LLC', approved: 22, revenue: 14200, status: 'active' },
  { id: 3, state: 'Texas', name: 'Lone Star Consultants', approved: 19, revenue: 9800, status: 'active' },
  { id: 4, state: 'Florida', name: 'Sunshine Pathways', approved: 17, revenue: 8340, status: 'active' },
  { id: 5, state: 'Illinois', name: 'Midwest Global Immigration', approved: 14, revenue: 6210, status: 'active' },
  { id: 6, state: 'Washington', name: 'Pacific Northwest Visas', approved: 11, revenue: 5100, status: 'active' },
  { id: 7, state: 'Massachusetts', name: 'Boston Immigration Group', approved: 9, revenue: 4280, status: 'pending' },
  { id: 8, state: 'Colorado', name: 'Rocky Mountain Pathways', approved: 6, revenue: 2860, status: 'pending' },
];

const REFERRAL_CONSULTANTS = [
  { id: 1, name: 'Aditya Sharma', statePartner: 'Pacific Visa Solutions', state: 'California', status: 'approved', revenue: 4280, commission: 856, leads: 42 },
  { id: 2, name: 'Priya Mehta', statePartner: 'Empire Immigration LLC', state: 'New York', status: 'approved', revenue: 3610, commission: 722, leads: 35 },
  { id: 3, name: 'James Wilson', statePartner: 'Lone Star Consultants', state: 'Texas', status: 'approved', revenue: 2980, commission: 596, leads: 31 },
  { id: 4, name: 'Maria Garcia', statePartner: 'Sunshine Pathways', state: 'Florida', status: 'pending', revenue: 1240, commission: 248, leads: 18 },
  { id: 5, name: 'Rahul Verma', statePartner: 'Pacific Visa Solutions', state: 'California', status: 'approved', revenue: 2140, commission: 428, leads: 24 },
  { id: 6, name: 'Emily Chen', statePartner: 'Pacific Northwest Visas', state: 'Washington', status: 'pending', revenue: 980, commission: 196, leads: 12 },
  { id: 7, name: 'Carlos Rodriguez', statePartner: 'Midwest Global Immigration', state: 'Illinois', status: 'approved', revenue: 1760, commission: 352, leads: 19 },
  { id: 8, name: 'Ananya Singh', statePartner: 'Empire Immigration LLC', state: 'New York', status: 'pending', revenue: 0, commission: 0, leads: 4 },
];

const RECENT_APPROVALS = [
  { name: 'Pathway Immigration Services', type: 'State Partner', status: 'approved', date: '2 hours ago', state: 'Georgia' },
  { name: 'Global Edu Connect', type: 'Referral Consultant', status: 'pending', date: '5 hours ago', state: 'New Jersey' },
  { name: 'Visa Express Group', type: 'Referral Consultant', status: 'approved', date: '1 day ago', state: 'Texas' },
  { name: 'NextGen Immigration', type: 'State Partner', status: 'approved', date: '2 days ago', state: 'Arizona' },
];

const REVENUE_CHART_DATA = [
  { month: 'Jan', revenue: 24000, commission: 4800 },
  { month: 'Feb', revenue: 28000, commission: 5600 },
  { month: 'Mar', revenue: 32000, commission: 6400 },
  { month: 'Apr', revenue: 38000, commission: 7600 },
  { month: 'May', revenue: 42000, commission: 8400 },
  { month: 'Jun', revenue: 48210, commission: 12540 },
];

const NAV_ITEMS = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  {
    id: 'network', icon: Users, label: 'My Network',
    children: [
      { id: 'state-partners', label: 'State Partners' },
      { id: 'referral-consultants', label: 'Referral Consultants' },
      { id: 'pending-approvals', label: 'Pending Approvals', badge: 8 },
    ]
  },
  { id: 'business', icon: BarChart2, label: 'Business Overview' },
  { id: 'leads', icon: Target, label: 'Leads & Enquiries' },
  { id: 'performance', icon: UserCheck, label: 'Consultants Performance' },
  {
    id: 'earnings', icon: DollarSign, label: 'My Earnings',
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

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function MiniAreaChart({ data }: { data: typeof REVENUE_CHART_DATA }) {
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  const w = 320, h = 80, pad = 8;
  const pts = data.map((d, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((d.revenue / maxRevenue) * (h - pad * 2));
    return `${x},${y}`;
  });
  const polyline = pts.join(' ');
  const fillPath = `M${pts[0]} L${pts.join(' L')} L${pad + (w - pad * 2)},${h - pad} L${pad},${h - pad} Z`;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00A86B" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#00A86B" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={fillPath} fill="url(#areaGrad)" />
      <polyline points={polyline} fill="none" stroke="#00A86B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => {
        const x = pad + (i / (data.length - 1)) * (w - pad * 2);
        const y = h - pad - ((d.revenue / maxRevenue) * (h - pad * 2));
        return <circle key={i} cx={x} cy={y} r="3.5" fill="#00A86B" stroke="white" strokeWidth="1.5" />;
      })}
    </svg>
  );
}

function USMapPlaceholder({ statePartners }: { statePartners: typeof STATE_PARTNERS }) {
  return (
    <div className="relative bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[220px]">
      <div className="absolute top-3 right-3 flex gap-2">
        <span className="flex items-center gap-1 text-xs text-[#00A86B] font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-[#00A86B] inline-block" /> Active Partner
        </span>
        <span className="flex items-center gap-1 text-xs text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Pending
        </span>
      </div>
      <Globe className="w-12 h-12 text-slate-300 mb-3" />
      <p className="text-sm font-bold text-slate-600 mb-1">United States Network Coverage</p>
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {statePartners.map((sp) => (
          <span key={sp.id} className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
            sp.status === 'active'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-amber-50 text-amber-800 border-amber-200'
          }`}>{sp.state}</span>
        ))}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, change, positive, color }: any) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={`text-xs font-bold flex items-center gap-0.5 px-2 py-0.5 rounded-full ${
          positive ? 'text-emerald-700 bg-emerald-50' : 'text-red-600 bg-red-50'
        }`}>
          {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change}
        </span>
      </div>
      <div className="text-2xl font-black text-slate-900 mb-0.5">{value}</div>
      <div className="text-xs font-semibold text-slate-500">{label}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'approved') return (
    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
      <CheckCircle2 className="w-3 h-3" /> Approved
    </span>
  );
  if (status === 'pending') return (
    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
      <Clock className="w-3 h-3" /> Pending
    </span>
  );
  if (status === 'rejected') return (
    <span className="inline-flex items-center gap-1 text-xs font-bold text-red-800 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
      <XCircle className="w-3 h-3" /> Rejected
    </span>
  );
  return null;
}

// ─── MODALS ──────────────────────────────────────────────────────────────────

function AddStatePartnerModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', company: '', state: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg animate-fadeIn">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900">Add State Partner</h3>
            <p className="text-xs text-slate-500 mt-0.5">Request will be sent for HQ approval</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer">
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Full Name *</label>
                <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]" placeholder="John Smith" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">State *</label>
                <select required value={form.state} onChange={e => setForm(f => ({...f, state: e.target.value}))}
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B] bg-white">
                  <option value="">Select State</option>
                  {['Alabama','Alaska','Arizona','Arkansas','Colorado','Connecticut','Delaware','Georgia','Hawaii','Idaho','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Utah','Vermont','Virginia','West Virginia','Wisconsin','Wyoming'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Company / Agency Name *</label>
              <input required value={form.company} onChange={e => setForm(f => ({...f, company: e.target.value}))}
                className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]" placeholder="Immigration Experts LLC" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Email *</label>
                <input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]" placeholder="partner@example.com" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Phone</label>
                <input value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]" placeholder="+1 555 000 0000" />
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 font-medium">State will be set to <strong>PENDING_HQ_APPROVAL</strong>. TravlTik HQ will review and approve within 2–3 business days.</p>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className="flex-1 h-11 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer">Cancel</button>
              <button type="submit" className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold transition-colors cursor-pointer">Submit for HQ Approval</button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#00A86B]" />
            </div>
            <h4 className="text-lg font-black text-slate-900 mb-2">Request Submitted!</h4>
            <p className="text-sm text-slate-500 mb-6">State Partner request has been sent to TravlTik HQ for review. Status: <strong className="text-amber-700">PENDING_HQ_APPROVAL</strong></p>
            <button onClick={onClose} className="w-full h-11 rounded-xl bg-[#00A86B] text-white text-sm font-bold cursor-pointer">Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

function AddConsultantModal({ onClose, statePartners }: { onClose: () => void; statePartners: typeof STATE_PARTNERS }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', statePartner: '', speciality: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg animate-fadeIn">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900">Register Referral Consultant</h3>
            <p className="text-xs text-slate-500 mt-0.5">Will enter <strong>PENDING_APPROVAL_WORKFLOW</strong></p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer">
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Consultant Name *</label>
                <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]" placeholder="Full Name" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Assign to State Partner *</label>
                <select required value={form.statePartner} onChange={e => setForm(f => ({...f, statePartner: e.target.value}))}
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B] bg-white">
                  <option value="">Select Partner</option>
                  {statePartners.filter(sp => sp.status === 'active').map(sp => (
                    <option key={sp.id} value={sp.name}>{sp.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Email Address *</label>
              <input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]" placeholder="consultant@example.com" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Phone Number</label>
                <input value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B]" placeholder="+1 555 000 0000" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Speciality</label>
                <select value={form.speciality} onChange={e => setForm(f => ({...f, speciality: e.target.value}))}
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B] bg-white">
                  <option value="">Select</option>
                  <option>Student Visa</option>
                  <option>Work Permit</option>
                  <option>PR / Migration</option>
                  <option>Tourist / Visitor</option>
                  <option>Business Visa</option>
                </select>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex gap-2">
              <Shield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-800 font-medium">Consultant will be set to <strong>PENDING_APPROVAL_WORKFLOW</strong>. You can approve or reject from the Pending Approvals section.</p>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className="flex-1 h-11 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer">Cancel</button>
              <button type="submit" className="flex-1 h-11 rounded-xl bg-[#00A86B] hover:bg-emerald-600 text-white text-sm font-bold transition-colors cursor-pointer">Register Consultant</button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#00A86B]" />
            </div>
            <h4 className="text-lg font-black text-slate-900 mb-2">Consultant Registered!</h4>
            <p className="text-sm text-slate-500 mb-6">Referral Consultant is now in <strong className="text-blue-700">PENDING_APPROVAL_WORKFLOW</strong>. Go to Pending Approvals to review.</p>
            <button onClick={onClose} className="w-full h-11 rounded-xl bg-[#00A86B] text-white text-sm font-bold cursor-pointer">Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar({ activeSection, setActiveSection, collapsed, setCollapsed }: any) {
  const [expandedNav, setExpandedNav] = useState<string[]>(['network']);

  const toggleExpand = (id: string) => {
    setExpandedNav(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <aside className={`${collapsed ? 'w-[70px]' : 'w-64'} bg-slate-950 text-white flex flex-col shrink-0 transition-all duration-300 h-full`}>
      {/* Header */}
      <div className={`flex items-center ${collapsed ? 'justify-center px-3' : 'justify-between px-5'} pt-5 pb-4 border-b border-slate-800`}>
        {!collapsed && (
          <div>
            <div className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-400 mb-0.5">TravlTik</div>
            <div className="text-sm font-black text-white leading-tight">CHANNEL PARTNER</div>
            <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-black text-amber-800 bg-amber-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
              <Star className="w-2.5 h-2.5" /> Platinum Partner
            </span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2.5 space-y-0.5">
        {NAV_ITEMS.map(item => {
          const isActive = activeSection === item.id || (item.children?.some(c => c.id === activeSection));
          const isExpanded = expandedNav.includes(item.id);

          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.children) {
                    toggleExpand(item.id);
                    if (!expandedNav.includes(item.id)) setActiveSection(item.id);
                  } else {
                    setActiveSection(item.id);
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#00A86B] text-white shadow-lg shadow-emerald-900/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="w-4.5 h-4.5 shrink-0" size={18} />
                {!collapsed && (
                  <>
                    <span className="text-sm font-bold flex-1 truncate">{item.label}</span>
                    {item.children && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    )}
                  </>
                )}
              </button>
              {!collapsed && item.children && isExpanded && (
                <div className="ml-7 mt-0.5 space-y-0.5">
                  {item.children.map(child => (
                    <button
                      key={child.id}
                      onClick={() => setActiveSection(child.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                        activeSection === child.id
                          ? 'bg-slate-800 text-white'
                          : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      <span>{child.label}</span>
                      {(child as any).badge && (
                        <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                          {(child as any).badge}
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

      {/* Bottom User Card */}
      {!collapsed && (
        <div className="p-3 border-t border-slate-800">
          <div className="flex items-center gap-3 bg-slate-900 rounded-2xl p-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00A86B] to-emerald-400 flex items-center justify-center font-black text-white text-sm shrink-0">
              GH
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-black text-white truncate">Global Horizons Pvt. Ltd.</div>
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5" /> United States
              </div>
              <span className="inline-flex items-center gap-0.5 mt-0.5 text-[9px] font-black text-blue-800 bg-blue-200 px-1.5 py-0.5 rounded-full uppercase">
                Country Partner
              </span>
            </div>
            <button className="text-slate-500 hover:text-red-400 transition-colors cursor-pointer">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      {collapsed && (
        <div className="p-2 border-t border-slate-800 flex justify-center">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00A86B] to-emerald-400 flex items-center justify-center font-black text-white text-xs">
            GH
          </div>
        </div>
      )}
    </aside>
  );
}

// ─── MAIN DASHBOARD CONTENT ───────────────────────────────────────────────────
function DashboardContent({
  consultants, setConsultants, statePartners,
  openAddPartner, openAddConsultant
}: any) {
  const maxRev = Math.max(...REVENUE_CHART_DATA.map(d => d.revenue));

  return (
    <div className="space-y-6">
      {/* Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        <StatCard icon={DollarSign} label="Total Revenue (All Consultants)" value="$48,210" change="+18.6% vs Apr" positive color="bg-emerald-100 text-[#00A86B]" />
        <StatCard icon={Banknote} label="My Commission Earned" value="$12,540" change="+15.2% vs Apr" positive color="bg-blue-100 text-blue-600" />
        <StatCard icon={Globe} label="Active State Partners" value="8" change="+1 new" positive color="bg-violet-100 text-violet-600" />
        <StatCard icon={Users} label="Approved Consultants" value="126" change="+14 new" positive color="bg-amber-100 text-amber-600" />
        <StatCard icon={Target} label="Total Leads Generated" value="1,248" change="+21.4% vs Apr" positive color="bg-cyan-100 text-cyan-600" />
        <StatCard icon={TrendingUp} label="Conversion Rate" value="24.3%" change="+3.6% vs Apr" positive color="bg-rose-100 text-rose-600" />
      </div>

      {/* Main 2-col Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Section A: Network Overview */}
        <div className="xl:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-black text-slate-900">My Network Overview</h2>
              <p className="text-xs text-slate-500 mt-0.5">8 State Partners • 126 Approved Consultants</p>
            </div>
            <div className="flex gap-2">
              <button className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-900 text-white cursor-pointer">State Partners</button>
              <button className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">Referral Consultants</button>
            </div>
          </div>
          <USMapPlaceholder statePartners={statePartners} />
          <div className="mt-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-[11px] font-black text-slate-400 uppercase tracking-wider py-2 pr-4">State</th>
                  <th className="text-left text-[11px] font-black text-slate-400 uppercase tracking-wider py-2 pr-4">Partner Name</th>
                  <th className="text-right text-[11px] font-black text-slate-400 uppercase tracking-wider py-2 pr-4">Consultants</th>
                  <th className="text-right text-[11px] font-black text-slate-400 uppercase tracking-wider py-2 pr-4">Revenue</th>
                  <th className="text-center text-[11px] font-black text-slate-400 uppercase tracking-wider py-2">Status</th>
                  <th className="py-2" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {statePartners.map((sp: any) => (
                  <tr key={sp.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-2.5 pr-4">
                      <span className="text-xs font-bold text-slate-700">{sp.state}</span>
                    </td>
                    <td className="py-2.5 pr-4">
                      <span className="text-xs font-semibold text-slate-800">{sp.name}</span>
                    </td>
                    <td className="py-2.5 pr-4 text-right">
                      <span className="text-xs font-black text-slate-900">{sp.approved}</span>
                    </td>
                    <td className="py-2.5 pr-4 text-right">
                      <span className="text-xs font-black text-[#00A86B]">${sp.revenue.toLocaleString()}</span>
                    </td>
                    <td className="py-2.5 text-center">
                      <StatusBadge status={sp.status} />
                    </td>
                    <td className="py-2.5 pl-3">
                      <button className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer">
                        <Eye className="w-3.5 h-3.5 text-slate-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section B: Quick Actions */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <h2 className="text-base font-black text-slate-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button onClick={openAddPartner} className="w-full flex items-center gap-3 p-4 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-colors text-left cursor-pointer group">
              <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <Plus className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-black">Add State Partner</div>
                <div className="text-[10px] text-slate-400">Register new state-level partner</div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            </button>

            <button onClick={openAddConsultant} className="w-full flex items-center gap-3 p-4 rounded-2xl bg-[#00A86B] text-white hover:bg-emerald-600 transition-colors text-left cursor-pointer group">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Plus className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-black">Register Referral Consultant</div>
                <div className="text-[10px] text-emerald-100">Add consultant to your network</div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-emerald-200 group-hover:text-white transition-colors" />
            </button>

            <button className="w-full flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 hover:bg-red-100 transition-colors text-left cursor-pointer group">
              <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-black text-slate-900">Review Pending Approvals</div>
                <div className="text-[10px] text-slate-500">8 items awaiting your action</div>
              </div>
              <span className="bg-red-500 text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center shrink-0">8</span>
            </button>

            <button className="w-full flex items-center gap-3 p-4 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors text-left cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0">
                <Target className="w-5 h-5 text-cyan-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-slate-900">View All Leads</div>
                <div className="text-[10px] text-slate-500">1,248 total leads generated</div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </button>

            <button className="w-full flex items-center gap-3 p-4 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors text-left cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
                <Megaphone className="w-5 h-5 text-violet-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-slate-900">Marketing Toolkit</div>
                <div className="text-[10px] text-slate-500">Banners, tracking links, creatives</div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Section C: Performance Analytics */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-black text-slate-900">Business Progress</h2>
              <p className="text-xs text-slate-500 mt-0.5">Network revenue growth — This Year</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                <span className="w-3 h-0.5 bg-[#00A86B] rounded-full inline-block" /> Revenue
              </div>
              <select className="text-xs font-bold text-slate-700 border border-slate-200 rounded-xl px-3 py-1.5 bg-white focus:outline-none cursor-pointer">
                <option>This Year</option>
                <option>This Quarter</option>
                <option>This Month</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <MiniAreaChart data={REVENUE_CHART_DATA} />
          </div>

          <div className="grid grid-cols-6 gap-1 border-t border-slate-100 pt-3">
            {REVENUE_CHART_DATA.map((d, i) => (
              <div key={i} className="text-center">
                <div className="text-[10px] font-bold text-slate-400">{d.month}</div>
                <div className="text-xs font-black text-slate-900">${(d.revenue / 1000).toFixed(0)}k</div>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-slate-100 pt-4">
            <h3 className="text-sm font-black text-slate-900 mb-3">Top Performing Consultants</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  {['Consultant', 'State', 'Revenue', 'Commission', 'Leads'].map(h => (
                    <th key={h} className="text-left text-[11px] font-black text-slate-400 uppercase tracking-wider py-2 pr-3 last:pr-0">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {consultants.filter((c: any) => c.status === 'approved').slice(0, 5).map((c: any) => (
                  <tr key={c.id} className="hover:bg-slate-50/60">
                    <td className="py-2.5 pr-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-700">
                          {c.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <span className="text-xs font-bold text-slate-800">{c.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 pr-3 text-xs text-slate-600">{c.state}</td>
                    <td className="py-2.5 pr-3 text-xs font-black text-slate-900">${c.revenue.toLocaleString()}</td>
                    <td className="py-2.5 pr-3 text-xs font-bold text-[#00A86B]">${c.commission.toLocaleString()}</td>
                    <td className="py-2.5 text-xs font-bold text-slate-700">{c.leads}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Approvals + Earnings Summary */}
        <div className="space-y-5">
          {/* Recent Approvals */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-black text-slate-900">Recent Approvals</h2>
              <button className="text-xs font-bold text-[#00A86B] hover:underline cursor-pointer">View all →</button>
            </div>
            <div className="space-y-3">
              {RECENT_APPROVALS.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/80 hover:bg-slate-100/60 transition-colors">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    item.status === 'approved' ? 'bg-emerald-100' : 'bg-amber-100'
                  }`}>
                    {item.status === 'approved'
                      ? <CheckCircle2 className="w-4 h-4 text-[#00A86B]" />
                      : <Clock className="w-4 h-4 text-amber-600" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">{item.name}</div>
                    <div className="text-[10px] text-slate-500">{item.type} • {item.state}</div>
                    <div className={`text-[10px] font-bold mt-0.5 capitalize ${
                      item.status === 'approved' ? 'text-[#00A86B]' : 'text-amber-600'
                    }`}>{item.status === 'approved' ? '✓ Approved' : '⏳ Pending'}</div>
                  </div>
                  <div className="text-[10px] text-slate-400 shrink-0">{item.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Earnings Summary */}
          <div className="bg-slate-950 rounded-3xl p-5 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-black">Earnings Summary</h2>
              <select className="text-xs font-bold bg-slate-800 border border-slate-700 text-slate-300 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer">
                <option>This Month</option>
                <option>This Quarter</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Total Business', value: '$48,210', color: 'text-white' },
                { label: 'My Commission', value: '$12,540', color: 'text-[#00A86B]' },
                { label: 'Pending Commission', value: '$4,210', color: 'text-amber-400' },
                { label: 'Paid Commission', value: '$8,330', color: 'text-blue-400' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
                  <span className="text-xs font-semibold text-slate-400">{item.label}</span>
                  <span className={`text-sm font-black ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 h-11 rounded-2xl bg-[#00A86B] hover:bg-emerald-500 text-white text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer">
              View Earnings Report <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CONSULTANTS TABLE ────────────────────────────────────────────────────────
function ConsultantsTable({ consultants, setConsultants, statePartners }: any) {
  const [search, setSearch] = useState('');
  const [filterState, setFilterState] = useState('All States');
  const [filterStatus, setFilterStatus] = useState('All Status');

  const filtered = consultants.filter((c: any) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.statePartner.toLowerCase().includes(search.toLowerCase());
    const matchState = filterState === 'All States' || c.state === filterState;
    const matchStatus = filterStatus === 'All Status' || c.status === filterStatus;
    return matchSearch && matchState && matchStatus;
  });

  const updateStatus = (id: number, status: string) => {
    setConsultants((prev: any[]) => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="text-base font-black text-slate-900">Referral Consultants Under Your Network</h2>
          <p className="text-xs text-slate-500 mt-0.5">{filtered.length} of {consultants.length} consultants shown</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search consultant..."
              className="pl-8 pr-3 h-9 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00A86B]/30 focus:border-[#00A86B] w-44"
            />
          </div>
          <select value={filterState} onChange={e => setFilterState(e.target.value)}
            className="h-9 px-3 text-xs rounded-xl border border-slate-200 focus:outline-none bg-white cursor-pointer">
            <option>All States</option>
            {[...new Set(consultants.map((c: any) => c.state))].map((s: any) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="h-9 px-3 text-xs rounded-xl border border-slate-200 focus:outline-none bg-white cursor-pointer">
            <option>All Status</option>
            <option>approved</option>
            <option>pending</option>
          </select>
          <button className="h-9 px-3.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>
      <div className="overflow-x-auto -mx-5 sm:mx-0">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-slate-100">
              {['Consultant Name', 'State Partner', 'State', 'Status', 'Business Revenue', 'Commission', 'Leads', 'Actions'].map(h => (
                <th key={h} className="text-left text-[11px] font-black text-slate-400 uppercase tracking-wider py-3 pr-4 first:pl-5 sm:first:pl-0 last:text-center last:pr-5 sm:last:pr-0">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((c: any) => (
              <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3 pr-4 pl-5 sm:pl-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-black text-slate-700 shrink-0">
                      {c.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{c.name}</div>
                      <div className="text-[10px] text-slate-400">ID: CONS-{String(c.id).padStart(4, '0')}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <span className="text-xs font-semibold text-slate-700 truncate max-w-[140px] block">{c.statePartner}</span>
                </td>
                <td className="py-3 pr-4">
                  <span className="text-xs font-semibold text-slate-600">{c.state}</span>
                </td>
                <td className="py-3 pr-4">
                  <StatusBadge status={c.status} />
                </td>
                <td className="py-3 pr-4">
                  <span className="text-xs font-black text-slate-900">${c.revenue.toLocaleString()}</span>
                </td>
                <td className="py-3 pr-4">
                  <span className="text-xs font-bold text-[#00A86B]">${c.commission.toLocaleString()}</span>
                </td>
                <td className="py-3 pr-4">
                  <span className="text-xs font-bold text-slate-700">{c.leads}</span>
                </td>
                <td className="py-3 pr-5 sm:pr-0">
                  <div className="flex items-center justify-center gap-1.5">
                    {c.status === 'pending' ? (
                      <>
                        <button onClick={() => updateStatus(c.id, 'approved')}
                          className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 flex items-center justify-center transition-colors cursor-pointer" title="Approve">
                          <Check className="w-3.5 h-3.5 text-[#00A86B]" />
                        </button>
                        <button onClick={() => updateStatus(c.id, 'rejected')}
                          className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 flex items-center justify-center transition-colors cursor-pointer" title="Reject">
                          <X className="w-3.5 h-3.5 text-red-600" />
                        </button>
                      </>
                    ) : null}
                    <button className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer" title="Edit">
                      <Edit2 className="w-3.5 h-3.5 text-slate-600" />
                    </button>
                    <button className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer" title="Transfer">
                      <ArrowRightLeft className="w-3.5 h-3.5 text-slate-600" />
                    </button>
                    <button className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer" title="View">
                      <Eye className="w-3.5 h-3.5 text-slate-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-slate-400">
            <Users className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-semibold">No consultants found</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ROOT COMPONENT ───────────────────────────────────────────────────────────
export default function ChannelPartnerDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showAddPartner, setShowAddPartner] = useState(false);
  const [showAddConsultant, setShowAddConsultant] = useState(false);
  const [consultants, setConsultants] = useState(REFERRAL_CONSULTANTS);

  const pendingCount = consultants.filter(c => c.status === 'pending').length;

  return (
    <div className="flex h-screen bg-[#f4f5f7] overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileSidebarOpen(false)} />
      )}

      {/* Sidebar – Desktop */}
      <div className="hidden lg:flex">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
      </div>

      {/* Sidebar – Mobile */}
      <div className={`fixed left-0 top-0 h-full z-50 transition-transform duration-300 lg:hidden ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar
          activeSection={activeSection}
          setActiveSection={(s: string) => { setActiveSection(s); setMobileSidebarOpen(false); }}
          collapsed={false}
          setCollapsed={() => {}}
        />
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 h-14 flex items-center justify-between shrink-0 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} className="lg:hidden w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center cursor-pointer">
              <Menu className="w-4 h-4 text-slate-700" />
            </button>
            <div>
              <h1 className="text-sm font-black text-slate-900 capitalize">
                {activeSection.replace(/-/g, ' ')}
              </h1>
              <div className="text-[10px] text-slate-400 font-medium hidden sm:block">Global Horizons Pvt. Ltd. • Country Partner</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <button className="relative w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer">
              <Bell className="w-4 h-4 text-slate-600" />
              {pendingCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">{pendingCount}</span>
              )}
            </button>
            <button className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer">
              <RefreshCw className="w-4 h-4 text-slate-600" />
            </button>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00A86B] to-emerald-400 flex items-center justify-center font-black text-white text-xs cursor-pointer">
              GH
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activeSection === 'dashboard' && (
            <DashboardContent
              consultants={consultants}
              setConsultants={setConsultants}
              statePartners={STATE_PARTNERS}
              openAddPartner={() => setShowAddPartner(true)}
              openAddConsultant={() => setShowAddConsultant(true)}
            />
          )}
          {(activeSection === 'network' || activeSection === 'referral-consultants') && (
            <ConsultantsTable
              consultants={consultants}
              setConsultants={setConsultants}
              statePartners={STATE_PARTNERS}
            />
          )}
          {activeSection === 'state-partners' && (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-base font-black text-slate-900">State Partners</h2>
                  <p className="text-xs text-slate-500 mt-0.5">8 state-level partners in your network</p>
                </div>
                <button onClick={() => setShowAddPartner(true)} className="h-9 px-4 bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-slate-800 transition-colors cursor-pointer">
                  <Plus className="w-3.5 h-3.5" /> Add State Partner
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {STATE_PARTNERS.map(sp => (
                  <div key={sp.id} className="border border-slate-200 rounded-2xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-sm font-black text-slate-700">
                        {sp.name.split(' ').slice(0, 2).map(w => w[0]).join('')}
                      </div>
                      <StatusBadge status={sp.status} />
                    </div>
                    <h3 className="text-sm font-black text-slate-900 mb-0.5">{sp.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mb-3"><MapPin className="w-3 h-3" />{sp.state}</p>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="bg-slate-50 rounded-xl p-2">
                        <div className="text-sm font-black text-slate-900">{sp.approved}</div>
                        <div className="text-[10px] text-slate-400">Consultants</div>
                      </div>
                      <div className="bg-emerald-50 rounded-xl p-2">
                        <div className="text-sm font-black text-[#00A86B]">${(sp.revenue / 1000).toFixed(1)}k</div>
                        <div className="text-[10px] text-slate-400">Revenue</div>
                      </div>
                    </div>
                    <button className="w-full mt-3 h-8 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" /> View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeSection === 'pending-approvals' && (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-base font-black text-slate-900">Pending Approvals</h2>
                  <p className="text-xs text-slate-500 mt-0.5">{pendingCount} items awaiting your action</p>
                </div>
                <span className="bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-full">{pendingCount} Pending</span>
              </div>
              <div className="space-y-3">
                {consultants.filter(c => c.status === 'pending').map(c => (
                  <div key={c.id} className="flex items-center gap-4 p-4 border border-amber-200 bg-amber-50/50 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-sm font-black text-amber-800 shrink-0">
                      {c.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-black text-slate-900">{c.name}</div>
                      <div className="text-xs text-slate-500">{c.statePartner} • {c.state}</div>
                      <div className="text-[10px] text-amber-700 font-bold mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> PENDING_APPROVAL_WORKFLOW
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => setConsultants(prev => prev.map(x => x.id === c.id ? {...x, status: 'approved'} : x))}
                        className="h-9 px-4 bg-[#00A86B] hover:bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer">
                        <Check className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button onClick={() => setConsultants(prev => prev.map(x => x.id === c.id ? {...x, status: 'rejected'} : x))}
                        className="h-9 px-4 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer">
                        <X className="w-3.5 h-3.5" /> Reject
                      </button>
                    </div>
                  </div>
                ))}
                {pendingCount === 0 && (
                  <div className="py-16 text-center">
                    <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-[#00A86B] opacity-60" />
                    <p className="text-sm font-bold text-slate-600">All approvals are up to date!</p>
                  </div>
                )}
              </div>
            </div>
          )}
          {!['dashboard', 'network', 'referral-consultants', 'state-partners', 'pending-approvals'].includes(activeSection) && (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              <Layers className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <h2 className="text-lg font-black text-slate-800 mb-2 capitalize">{activeSection.replace(/-/g, ' ')}</h2>
              <p className="text-sm text-slate-500">This section is being developed. Check back soon!</p>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      {showAddPartner && <AddStatePartnerModal onClose={() => setShowAddPartner(false)} />}
      {showAddConsultant && <AddConsultantModal onClose={() => setShowAddConsultant(false)} statePartners={STATE_PARTNERS} />}
    </div>
  );
}
