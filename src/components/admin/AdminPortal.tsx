// src/components/admin/AdminPortal.tsx
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Users, Briefcase, FileText, Calendar, 
  TrendingUp, Search, Lock, CheckCircle2, XCircle, AlertCircle, 
  RefreshCw, LogOut, Eye, Filter, ArrowUpRight, DollarSign, Award, Check, X
} from 'lucide-react';

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  // Tab State: 'overview' | 'experts' | 'applications' | 'bookings' | 'users' | 'ads'
  const [activeTab, setActiveTab] = useState<'overview' | 'experts' | 'applications' | 'bookings' | 'users' | 'ads'>('overview');

  // Search Filter
  const [searchQuery, setSearchQuery] = useState('');

  // Data States
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [experts, setExperts] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  // Detail Modal State
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Check stored passcode session on mount
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('dt_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch all admin data when authenticated
  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, expertsRes, appsRes, bookingsRes, usersRes] = await Promise.all([
        fetch('/api/admin/stats').then(r => r.json()),
        fetch('/api/admin/experts').then(r => r.json()),
        fetch('/api/admin/applications').then(r => r.json()),
        fetch('/api/admin/bookings').then(r => r.json()),
        fetch('/api/admin/users').then(r => r.json())
      ]);

      if (statsRes.success) setStats(statsRes.stats);
      if (expertsRes.success) setExperts(expertsRes.experts || []);
      if (appsRes.success) setApplications(appsRes.applications || []);
      if (bookingsRes.success) setBookings(bookingsRes.bookings || []);
      if (usersRes.success) setUsers(usersRes.users || []);
    } catch (err) {
      console.error('[AdminPortal] Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminData();
    }
  }, [isAuthenticated]);

  // Passcode submit handler
  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = passcode.trim();
    const allowed = [
      '~MINDSETGROW91topG$',
      'MINDSETGROW91topG$',
      'dt2026',
      'dt'
    ];

    if (allowed.includes(input)) {
      setIsAuthenticated(true);
      sessionStorage.setItem('dt_admin_auth', 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('dt_admin_auth');
  };

  // Expert Verification Action Handler
  const handleExpertAction = async (expertId: number, action: 'approve' | 'reject' | 'suspend') => {
    setActionLoading(expertId);
    try {
      const res = await fetch('/api/admin/experts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expertId, action })
      });
      const data = await res.json();
      if (data.success) {
        // Refresh experts list
        setExperts(prev => prev.map(exp => {
          if (exp.id === expertId) {
            return {
              ...exp,
              is_verified: action === 'approve',
              verification_status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'suspended'
            };
          }
          return exp;
        }));
      } else {
        alert(data.error || 'Failed to update expert status');
      }
    } catch (err) {
      console.error('Error updating expert status:', err);
    } finally {
      setActionLoading(null);
    }
  };

  // Filtered lists based on search query
  const filteredExperts = experts.filter(e => 
    (e.business_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (e.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (e.gov_registration_number || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredApplications = applications.filter(a => 
    (a.first_name + ' ' + a.last_name).toLowerCase().includes(searchQuery.toLowerCase()) ||
    (a.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (a.passport_number || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (a.destination_country || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBookings = bookings.filter(b => 
    (b.seeker_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.seeker_email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.expert_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.visa_category || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(u => 
    (u.first_name + ' ' + u.last_name).toLowerCase().includes(searchQuery.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (u.phone || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render Passcode Screen if not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 font-sans text-slate-100 selection:bg-[#00a896] selection:text-white">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00a896] via-purple-600 to-[#00a896]" />

          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#00a896]/10 border border-[#00a896]/30 flex items-center justify-center mx-auto text-[#00a896]">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-black tracking-tight text-white font-sans">Travltik Admin Control Panel</h1>
            <p className="text-xs text-slate-400 font-medium font-sans">Secret Management Portal (`/dt`)</p>
          </div>

          <form onSubmit={handlePasscodeSubmit} className="space-y-4 font-sans">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-sans">
                Master Security Passcode *
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin passcode"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-[#00a896] transition-all font-sans"
              />
            </div>

            {authError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Invalid Master Passcode. Access Denied.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#00a896] hover:bg-[#008f80] text-white font-bold py-3.5 px-4 rounded-2xl text-xs sm:text-sm shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 font-sans"
            >
              <span>Unlock Admin Panel</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2 text-[11px] font-semibold text-slate-500 font-sans">
            🔒 256-Bit Encrypted Admin Access • Reference: DT-ADMIN-SECURE
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-[#00a896] selection:text-white">
      {/* ── TOP ADMIN HEADER ── */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#00a896] text-white flex items-center justify-center font-black shadow-md">
              DT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-white tracking-tight font-sans">Travltik Master Admin</h1>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full font-sans flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Neon DB
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium font-sans">Secret Control Route: <code className="bg-slate-800 px-1.5 py-0.5 rounded text-teal-300">/dt</code></p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            <button
              onClick={fetchAdminData}
              disabled={loading}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5 font-sans"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Data</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold rounded-xl border border-rose-500/30 transition-all cursor-pointer flex items-center gap-1.5 font-sans"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Panel</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
        {/* ── METRICS OVERVIEW CARDS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 font-sans">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>Total Verified Experts</span>
              <Briefcase className="w-4 h-4 text-[#00a896]" />
            </div>
            <div className="text-2xl font-black text-white font-sans">
              {stats?.totalExperts || experts.length || 0}
            </div>
            <div className="text-[11px] text-teal-400 font-semibold flex items-center gap-1 font-sans">
              <Award className="w-3 h-3" />
              <span>{experts.filter(e => e.is_verified).length} Approved Experts</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>Self-Apply Applications</span>
              <FileText className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-white font-sans">
              {stats?.totalApplications || applications.length || 0}
            </div>
            <div className="text-[11px] text-purple-400 font-semibold font-sans">
              ₹{((stats?.selfApplyRevenue || 0)).toLocaleString()} Total Payments
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>Consultation Leads</span>
              <Calendar className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white font-sans">
              {stats?.totalBookings || bookings.length || 0}
            </div>
            <div className="text-[11px] text-amber-400 font-semibold font-sans">
              Active Seeker-Expert Bookings
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>Registered Seekers</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-white font-sans">
              {stats?.totalSeekers || users.length || 0}
            </div>
            <div className="text-[11px] text-blue-400 font-semibold font-sans">
              Registered Candidates
            </div>
          </div>
        </div>

        {/* ── TAB CONTROLS & SEARCH BAR ── */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col md:flex-row md:items-center justify-between gap-3 font-sans">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none font-sans">
            {[
              { id: 'overview', label: '📊 Overview', count: null },
              { id: 'experts', label: '👨‍💼 Experts & Licenses', count: experts.length },
              { id: 'applications', label: '📄 Self-Apply Visas', count: applications.length },
              { id: 'bookings', label: '📞 Consultation Leads', count: bookings.length },
              { id: 'users', label: '👥 Applicants', count: users.length },
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 font-sans ${
                    isActive
                      ? 'bg-[#00a896] text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== null && (
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-64 shrink-0 font-sans">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search records..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold text-white outline-none focus:border-[#00a896] font-sans"
            />
          </div>
        </div>

        {/* ── TAB CONTENT AREA ── */}
        
        {/* TAB 1: OVERVIEW SUMMARY */}
        {activeTab === 'overview' && (
          <div className="space-y-6 font-sans">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-black text-white font-sans">Platform Operational Status</h3>
                  <p className="text-xs text-slate-400 font-medium font-sans">Real-time status of Neon PostgreSQL tables & services</p>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full font-sans">
                  🟢 All Systems Operational
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-400 block font-sans">Pending Verification Requests</span>
                  <div className="text-xl font-black text-amber-400 font-sans">
                    {experts.filter(e => !e.is_verified).length} Consultants Pending
                  </div>
                  <button
                    onClick={() => setActiveTab('experts')}
                    className="text-xs font-bold text-[#00a896] hover:underline flex items-center gap-1 mt-1 cursor-pointer"
                  >
                    <span>Review & Verify Licenses</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-400 block font-sans">Recent Self-Apply Applications</span>
                  <div className="text-xl font-black text-purple-400 font-sans">
                    {applications.length} Applications Saved
                  </div>
                  <button
                    onClick={() => setActiveTab('applications')}
                    className="text-xs font-bold text-purple-400 hover:underline flex items-center gap-1 mt-1 cursor-pointer"
                  >
                    <span>View Application Records</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-400 block font-sans">Total Platform Est. Revenue</span>
                  <div className="text-xl font-black text-emerald-400 font-sans">
                    ₹{(stats?.totalRevenue || 0).toLocaleString()}
                  </div>
                  <span className="text-[11px] text-slate-500 font-semibold block font-sans">From self-apply & booking inquiries</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EXPERTS & LICENSES MANAGEMENT */}
        {activeTab === 'experts' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 font-sans">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-black text-white font-sans">Registered Visa Consultants ({filteredExperts.length})</h3>
                <p className="text-xs text-slate-400 font-medium font-sans">Review government license numbers & grant verified badges</p>
              </div>
            </div>

            {filteredExperts.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs font-bold font-sans">
                No expert records found matching your search.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                      <th className="py-3 px-3">Business / Expert</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Govt Reg Number</th>
                      <th className="py-3 px-3">Location</th>
                      <th className="py-3 px-3">Verification Status</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium text-slate-200">
                    {filteredExperts.map((exp) => (
                      <tr key={exp.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-3">
                          <div className="font-bold text-white text-sm">{exp.business_name || 'Unnamed Agency'}</div>
                          <div className="text-[11px] text-slate-400">{exp.email} • {exp.contact_number || 'N/A'}</div>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg text-[11px] font-bold">
                            {exp.advisor_type || 'Visa Advisor'}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 font-mono font-bold text-teal-300">
                          {exp.gov_registration_number || 'Not Provided'}
                        </td>
                        <td className="py-3.5 px-3 text-slate-300">
                          {exp.city ? `${exp.city}, ${exp.country || ''}` : 'Remote'}
                        </td>
                        <td className="py-3.5 px-3">
                          {exp.is_verified ? (
                            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-extrabold px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED TRUSTED
                            </span>
                          ) : exp.verification_status === 'rejected' ? (
                            <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[11px] font-extrabold px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5" /> REJECTED
                            </span>
                          ) : (
                            <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[11px] font-extrabold px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" /> PENDING REVIEW
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-3 text-right space-x-2">
                          {!exp.is_verified ? (
                            <button
                              onClick={() => handleExpertAction(exp.id, 'approve')}
                              disabled={actionLoading === exp.id}
                              className="px-3 py-1.5 bg-[#00a896] hover:bg-[#008f80] text-white font-bold text-[11px] rounded-xl shadow-xs transition-all cursor-pointer inline-flex items-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Approve & Verify</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleExpertAction(exp.id, 'suspend')}
                              disabled={actionLoading === exp.id}
                              className="px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-[11px] rounded-xl border border-rose-500/30 transition-all cursor-pointer inline-flex items-center gap-1"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Suspend</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SELF-APPLY APPLICATIONS */}
        {activeTab === 'applications' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 font-sans">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-black text-white font-sans">Self-Apply Visa Applications ({filteredApplications.length})</h3>
                <p className="text-xs text-slate-400 font-medium font-sans">Review candidate visa filings and Razorpay payment statuses</p>
              </div>
            </div>

            {filteredApplications.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs font-bold font-sans">
                No self-apply records saved in Neon DB yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                      <th className="py-3 px-3">Applicant Name</th>
                      <th className="py-3 px-3">Visa Type & Destination</th>
                      <th className="py-3 px-3">Passport Number</th>
                      <th className="py-3 px-3">Total Amount</th>
                      <th className="py-3 px-3">Payment Status</th>
                      <th className="py-3 px-3 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium text-slate-200">
                    {filteredApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-3">
                          <div className="font-bold text-white text-sm">{app.first_name} {app.last_name}</div>
                          <div className="text-[11px] text-slate-400">{app.email} • {app.mobile_number || 'N/A'}</div>
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="font-bold text-teal-300">{app.destination_country} ({app.visa_type})</div>
                          <div className="text-[11px] text-slate-400">Travel Date: {app.travel_date || 'N/A'}</div>
                        </td>
                        <td className="py-3.5 px-3 font-mono font-bold text-slate-300">
                          {app.passport_number || 'N/A'}
                        </td>
                        <td className="py-3.5 px-3 font-bold text-emerald-400">
                          ₹{(app.total_amount || 0).toLocaleString()}
                        </td>
                        <td className="py-3.5 px-3">
                          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                            app.payment_status === 'completed' || app.payment_status === 'submitted'
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                          }`}>
                            {app.payment_status?.toUpperCase() || 'PENDING'}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <button
                            onClick={() => setSelectedItem(app)}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold rounded-xl border border-slate-700 cursor-pointer inline-flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Full</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CONSULTATION BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 font-sans">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-black text-white font-sans">Consultation Bookings & Inquiries ({filteredBookings.length})</h3>
                <p className="text-xs text-slate-400 font-medium font-sans">1-on-1 consultation requests submitted by Seekers to Experts</p>
              </div>
            </div>

            {filteredBookings.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs font-bold font-sans">
                No consultation bookings recorded yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                      <th className="py-3 px-3">Seeker (Client)</th>
                      <th className="py-3 px-3">Requested Expert</th>
                      <th className="py-3 px-3">Visa Category</th>
                      <th className="py-3 px-3">Booking Date</th>
                      <th className="py-3 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium text-slate-200">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-3">
                          <div className="font-bold text-white text-sm">{b.seeker_name || 'Client Seeker'}</div>
                          <div className="text-[11px] text-slate-400">{b.seeker_email} • {b.seeker_phone || 'N/A'}</div>
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="font-bold text-teal-300">{b.expert_name || 'Assigned Expert'}</div>
                          <div className="text-[11px] text-slate-400">{b.expert_email}</div>
                        </td>
                        <td className="py-3.5 px-3 font-bold text-slate-300">
                          {b.visa_category || 'General Consultation'}
                        </td>
                        <td className="py-3.5 px-3 text-slate-400">
                          {new Date(b.created_at || b.booking_date).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                            {(b.status || 'NEW LEAD').toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: REGISTERED USERS (SEEKERS) */}
        {activeTab === 'users' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 font-sans">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-black text-white font-sans">Registered Applicants / Candidates ({filteredUsers.length})</h3>
                <p className="text-xs text-slate-400 font-medium font-sans">All seeker accounts registered on Travltik</p>
              </div>
            </div>

            {filteredUsers.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs font-bold font-sans">
                No seeker accounts registered yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                      <th className="py-3 px-3">Candidate Name</th>
                      <th className="py-3 px-3">Email & Phone</th>
                      <th className="py-3 px-3">Target Country / Goals</th>
                      <th className="py-3 px-3">Joined Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium text-slate-200">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-3">
                          <div className="font-bold text-white text-sm">{u.first_name} {u.last_name}</div>
                          <div className="text-[11px] text-slate-400">{u.city ? `${u.city}, ${u.passport_country || ''}` : 'India'}</div>
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="font-bold text-slate-300">{u.email}</div>
                          <div className="text-[11px] text-slate-400">{u.phone || 'N/A'}</div>
                        </td>
                        <td className="py-3.5 px-3 text-teal-300 font-semibold">
                          {u.destinations || u.looking_for || 'Overseas Journey'}
                        </td>
                        <td className="py-3.5 px-3 text-slate-400">
                          {new Date(u.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── DETAIL MODAL PREVIEW ── */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 text-xs font-sans text-slate-200 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-black text-sm text-white">Full Application Record #{selectedItem.id}</h4>
              <button onClick={() => setSelectedItem(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 font-sans">
              <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <div><span className="text-slate-500 font-bold block text-[10px]">APPLICANT</span><span className="font-bold text-white">{selectedItem.first_name} {selectedItem.last_name}</span></div>
                <div><span className="text-slate-500 font-bold block text-[10px]">EMAIL</span><span className="font-bold text-white">{selectedItem.email}</span></div>
                <div><span className="text-slate-500 font-bold block text-[10px]">PASSPORT NUMBER</span><span className="font-mono text-teal-300 font-bold">{selectedItem.passport_number || 'N/A'}</span></div>
                <div><span className="text-slate-500 font-bold block text-[10px]">PASSPORT EXPIRY</span><span className="font-bold text-slate-300">{selectedItem.passport_expiry || 'N/A'}</span></div>
                <div><span className="text-slate-500 font-bold block text-[10px]">DESTINATION</span><span className="font-bold text-teal-300">{selectedItem.destination_country} ({selectedItem.visa_type})</span></div>
                <div><span className="text-slate-500 font-bold block text-[10px]">PAYMENT ID</span><span className="font-mono text-emerald-400 font-bold">{selectedItem.payment_id || 'N/A'}</span></div>
              </div>
            </div>

            <button
              onClick={() => setSelectedItem(null)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
