// src/components/channel-partner/PartnerSettingsView.tsx
import React, { useState, useEffect } from 'react';
import {
  Building2, KeyRound, CreditCard, Users, Shield, Copy, Check,
  RefreshCw, Plus, Trash2, CheckCircle2, AlertCircle, Loader2,
  Lock, Mail, Phone, MapPin, Globe, ArrowRight, Eye, EyeOff,
  Bell, MessageSquare, Save, Sparkles, Upload, X
} from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
}

export default function PartnerSettingsView() {
  const [subTab, setSubTab] = useState<'profile' | 'network' | 'banking' | 'team' | 'security'>('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Profile Form States
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('United States');
  const [taxId, setTaxId] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  // Network & Invite Form States
  const [inviteCode, setInviteCode] = useState('CP-USA-001');
  const [copied, setCopied] = useState(false);
  const [requireManualApproval, setRequireManualApproval] = useState(true);

  // Banking Form States
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [swiftIfsc, setSwiftIfsc] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [payoutFrequency, setPayoutFrequency] = useState('monthly');

  // Team Management States
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Manager');
  const [inviting, setInviting] = useState(false);

  // Security Form States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Alerts & Notifications
  const [notifyEmailLeads, setNotifyEmailLeads] = useState(true);
  const [notifyWhatsappLeads, setNotifyWhatsappLeads] = useState(false);
  const [notifyPayouts, setNotifyPayouts] = useState(true);

  // Fetch full settings data
  const loadSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/partner/settings');
      const data = await res.json();
      if (data.success && data.settings) {
        const s = data.settings;
        setCompanyName(s.company_name || '');
        setContactPerson(s.contact_person || '');
        setPhone(s.phone || '');
        setCountry(s.country || 'United States');
        setTaxId(s.tax_id || '');
        setBusinessAddress(s.business_address || '');
        setLogoUrl(s.logo_url || '');

        setInviteCode(s.invite_code || 'CP-USA-001');
        setRequireManualApproval(s.require_manual_approval !== false);

        setBankName(s.bank_name || '');
        setAccountNumber(s.account_number || '');
        setSwiftIfsc(s.swift_ifsc || '');
        setAccountHolder(s.account_holder || '');
        setPayoutFrequency(s.payout_frequency || 'monthly');

        setNotifyEmailLeads(s.notify_email_leads !== false);
        setNotifyWhatsappLeads(Boolean(s.notify_whatsapp_leads));
        setNotifyPayouts(s.notify_payouts !== false);

        setTeam(data.team || []);
      }
    } catch (err: any) {
      console.error('[LoadSettings Error]', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  // Copy Invite Code
  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    showToast(`Invite Code ${inviteCode} copied to clipboard!`);
    setTimeout(() => setCopied(false), 2500);
  };

  // Regenerate Invite Code
  const handleRegenerateCode = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/partner/settings/network', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'regenerate_code' })
      });
      const data = await res.json();
      if (data.success && data.invite_code) {
        setInviteCode(data.invite_code);
        showToast('New Country Partner invite code generated!');
      }
    } catch (err) {
      setError('Failed to regenerate code.');
    } finally {
      setSaving(false);
    }
  };

  // Save Profile
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/partner/settings/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: companyName,
          contact_person: contactPerson,
          phone,
          country,
          tax_id: taxId,
          business_address: businessAddress,
          logo_url: logoUrl
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Save failed.');
      showToast('🏢 Organization Profile Saved Successfully!');
    } catch (err: any) {
      setError(err.message || 'Error saving profile.');
    } finally {
      setSaving(false);
    }
  };

  // Save Network Settings
  const handleSaveNetwork = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/partner/settings/network', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invite_code: inviteCode,
          require_manual_approval: requireManualApproval
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Save failed.');
      showToast('🔑 Network & Policy Settings Saved!');
    } catch (err: any) {
      setError(err.message || 'Error saving network settings.');
    } finally {
      setSaving(false);
    }
  };

  // Save Banking
  const handleSaveBanking = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/partner/settings/banking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bank_name: bankName,
          account_number: accountNumber,
          swift_ifsc: swiftIfsc,
          account_holder: accountHolder,
          payout_frequency: payoutFrequency
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Save failed.');
      showToast('💳 Banking & Payout Settings Saved!');
    } catch (err: any) {
      setError(err.message || 'Error saving banking details.');
    } finally {
      setSaving(false);
    }
  };

  // Invite Team Member
  const handleInviteTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviting(true);
    try {
      const res = await fetch('/api/partner/settings/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inviteName,
          email: inviteEmail,
          role: inviteRole
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Failed to invite.');
      setShowInviteModal(false);
      setInviteName('');
      setInviteEmail('');
      loadSettings();
      showToast(`👥 ${data.member.name} invited successfully!`);
    } catch (err: any) {
      setError(err.message || 'Failed to invite team member.');
    } finally {
      setInviting(false);
    }
  };

  // Remove Team Member
  const handleRemoveTeamMember = async (id: number) => {
    if (!confirm('Are you sure you want to remove this team member?')) return;
    try {
      const res = await fetch('/api/partner/settings/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id })
      });
      const data = await res.json();
      if (data.success) {
        setTeam(team.filter(m => m.id !== id));
        showToast('Team member removed.');
      }
    } catch (e) {}
  };

  // Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/partner/settings/security', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'change_password',
          current_password: currentPassword,
          new_password: newPassword
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Password change failed.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showToast('🔒 Account Password Updated Successfully!');
    } catch (err: any) {
      setError(err.message || 'Error updating password.');
    } finally {
      setSaving(false);
    }
  };

  // Save Security Notification Preferences
  const handleSaveAlerts = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/partner/settings/security', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'preferences',
          notify_email_leads: notifyEmailLeads,
          notify_whatsapp_leads: notifyWhatsappLeads,
          notify_payouts: notifyPayouts
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast('🔔 Notification Preferences Saved!');
      }
    } catch (err) {
      setError('Failed to save preferences.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 flex flex-col items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-[#00A878] mb-2" />
        <span className="text-xs font-semibold">Loading Partner Configuration...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn select-none" style={{ fontFamily: '"Plus Jakarta Sans", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>

      {/* ═══════════ 1. TABBED NAVIGATION BAR ═══════════ */}
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-[28px] p-2 sm:p-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {[
            { id: 'profile', icon: Building2, label: 'Profile & Org' },
            { id: 'network', icon: KeyRound, label: 'Network & Invite Code' },
            { id: 'banking', icon: CreditCard, label: 'Payout & Banking' },
            { id: 'team', icon: Users, label: 'Team Management' },
            { id: 'security', icon: Shield, label: 'Security & Alerts' },
          ].map((tab) => {
            const isActive = subTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setSubTab(tab.id as any);
                  setError(null);
                }}
                className={`flex-1 min-w-[140px] py-2.5 px-3.5 rounded-2xl text-xs sm:text-[13px] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#00A878] text-white shadow-sm shadow-emerald-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-2.5 text-red-700 text-xs font-medium animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* ═══════════ TAB 1: PROFILE & ORG ═══════════ */}
      {subTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-[28px] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Organization & Legal Entity Profile</h2>
              <p className="text-xs text-slate-500 mt-0.5">Manage corporate registration, authorized representative, and branding.</p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Tier 1 Master Network
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Legal Entity / Company Name *</label>
              <input
                required
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Global Horizons Pvt. Ltd."
                className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-xs sm:text-[13px] font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#00A878]/20 focus:border-[#00A878]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">TAX ID / Business Registration #</label>
              <input
                type="text"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                placeholder="EIN-9283749"
                className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-xs sm:text-[13px] font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#00A878]/20 focus:border-[#00A878]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Authorized Contact Person *</label>
              <input
                required
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="Johnathan Davis"
                className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-xs sm:text-[13px] font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#00A878]/20 focus:border-[#00A878]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">WhatsApp / Phone (+Code)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 019-2834"
                className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-xs sm:text-[13px] font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#00A878]/20 focus:border-[#00A878]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Registered Business HQ Address</label>
            <input
              type="text"
              value={businessAddress}
              onChange={(e) => setBusinessAddress(e.target.value)}
              placeholder="750 17th Street NW, Suite 1000, Washington, DC 20006"
              className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-xs sm:text-[13px] font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#00A878]/20 focus:border-[#00A878]"
            />
          </div>

          {/* Logo Upload Box */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Organization Brand Logo</label>
            <div className="flex items-center gap-4 p-4 border border-dashed border-slate-200 rounded-2xl bg-slate-50/70">
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center p-1 shadow-2xs shrink-0">
                {logoUrl ? (
                  <img src={logoUrl} alt="Org Logo" className="w-full h-full object-contain" />
                ) : (
                  <Building2 className="w-7 h-7 text-slate-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://yourdomain.com/logo.png"
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#00A878]/20 focus:border-[#00A878]"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">Paste logo image URL or SVG link for your partner portal.</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 h-11 rounded-2xl bg-[#00A878] hover:bg-[#008A62] text-white text-xs sm:text-sm font-semibold tracking-normal flex items-center gap-2 shadow-sm shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Organization Profile</span>
            </button>
          </div>
        </form>
      )}

      {/* ═══════════ TAB 2: NETWORK & INVITE CODE ═══════════ */}
      {subTab === 'network' && (
        <form onSubmit={handleSaveNetwork} className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-[28px] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Country Partner Network & Onboarding Policies</h2>
            <p className="text-xs text-slate-500 mt-0.5">Control consultant self-onboarding, referral keys, and hierarchy rules.</p>
          </div>

          {/* Invite Code Showcase Card */}
          <div className="p-6 rounded-[24px] bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between flex-wrap gap-4 relative z-10">
              <div>
                <span className="text-[11px] font-semibold text-emerald-400 tracking-wider uppercase">Master Referral Key</span>
                <div className="text-2xl sm:text-3xl font-mono font-black tracking-wider text-white mt-1">
                  {inviteCode}
                </div>
                <p className="text-xs text-slate-300 mt-1 max-w-[380px]">
                  Share this code with State Partners & Consultants to automatically link them under your Country Partner territory.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleRegenerateCode}
                  disabled={saving}
                  className="px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${saving ? 'animate-spin' : ''}`} />
                  <span>Regenerate</span>
                </button>
              </div>
            </div>
          </div>

          {/* Toggle Policy Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs sm:text-[13px] font-bold text-slate-900">Require Manual Approval for New Consultants</div>
              <p className="text-xs text-slate-500 mt-0.5">
                When enabled, consultants registering with your invite code must be reviewed before unlocking live client leads.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setRequireManualApproval(!requireManualApproval)}
              className={`w-14 h-8 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                requireManualApproval ? 'bg-[#00A878]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-sm transform transition-transform ${
                  requireManualApproval ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 h-11 rounded-2xl bg-[#00A878] hover:bg-[#008A62] text-white text-xs sm:text-sm font-semibold tracking-normal flex items-center gap-2 shadow-sm shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Network Policies</span>
            </button>
          </div>
        </form>
      )}

      {/* ═══════════ TAB 3: PAYOUT & BANKING ═══════════ */}
      {subTab === 'banking' && (
        <form onSubmit={handleSaveBanking} className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-[28px] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Banking & Automated Commission Payouts</h2>
              <p className="text-xs text-slate-500 mt-0.5">Settlement bank accounts for recurring B2B network overrides.</p>
            </div>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              ACH / SWIFT / Wire Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Bank / Financial Institution Name *</label>
              <input
                required
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="JPMorgan Chase Bank N.A."
                className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-xs sm:text-[13px] font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#00A878]/20 focus:border-[#00A878]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Account Holder Name *</label>
              <input
                required
                type="text"
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
                placeholder="Global Horizons Pvt. Ltd."
                className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-xs sm:text-[13px] font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#00A878]/20 focus:border-[#00A878]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Account / IBAN Number *</label>
              <input
                required
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="4829103849102"
                className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-xs sm:text-[13px] font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#00A878]/20 focus:border-[#00A878]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Routing / SWIFT / IFSC Code *</label>
              <input
                required
                type="text"
                value={swiftIfsc}
                onChange={(e) => setSwiftIfsc(e.target.value)}
                placeholder="CHASUS33XXX"
                className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-xs sm:text-[13px] font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#00A878]/20 focus:border-[#00A878]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Payout Frequency Preference</label>
            <div className="grid grid-cols-2 gap-3 max-w-md">
              <button
                type="button"
                onClick={() => setPayoutFrequency('weekly')}
                className={`py-3 px-4 rounded-2xl border text-xs sm:text-[13px] font-semibold transition-all cursor-pointer text-left ${
                  payoutFrequency === 'weekly'
                    ? 'border-[#00A878] bg-emerald-50/70 text-emerald-900 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold">Weekly Settlement</div>
                <div className="text-[11px] text-slate-500 font-normal mt-0.5">Every Monday</div>
              </button>

              <button
                type="button"
                onClick={() => setPayoutFrequency('monthly')}
                className={`py-3 px-4 rounded-2xl border text-xs sm:text-[13px] font-semibold transition-all cursor-pointer text-left ${
                  payoutFrequency === 'monthly'
                    ? 'border-[#00A878] bg-emerald-50/70 text-emerald-900 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold">Monthly Settlement</div>
                <div className="text-[11px] text-slate-500 font-normal mt-0.5">1st of every month</div>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 h-11 rounded-2xl bg-[#00A878] hover:bg-[#008A62] text-white text-xs sm:text-sm font-semibold tracking-normal flex items-center gap-2 shadow-sm shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Payout & Banking</span>
            </button>
          </div>
        </form>
      )}

      {/* ═══════════ TAB 4: TEAM MANAGEMENT ═══════════ */}
      {subTab === 'team' && (
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-[28px] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Partner Workspace Team Members</h2>
              <p className="text-xs text-slate-500 mt-0.5">Grant subordinate staff role-based access to your Channel Partner Portal.</p>
            </div>
            <button
              type="button"
              onClick={() => setShowInviteModal(true)}
              className="h-10 px-4 rounded-2xl bg-[#00A878] hover:bg-[#008A62] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm shadow-emerald-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Invite Team Member</span>
            </button>
          </div>

          {team.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-100">
                    {['Member Name', 'Email Address', 'Assigned Role', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider py-2.5 pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {team.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 pr-4 text-xs sm:text-[13px] font-bold text-slate-900">{m.name}</td>
                      <td className="py-3 pr-4 text-xs text-slate-500">{m.email}</td>
                      <td className="py-3 pr-4">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                          {m.role}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00A878]" /> {m.status}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <button
                          type="button"
                          onClick={() => handleRemoveTeamMember(m.id)}
                          className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-400 flex items-center justify-center cursor-pointer transition-colors"
                          title="Remove Member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-10 text-center text-slate-400">
              <Users className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="text-xs font-semibold text-slate-700">No team members invited yet</p>
              <p className="text-xs text-slate-400 mt-0.5">Click '+ Invite Team Member' to delegate dashboard management.</p>
            </div>
          )}
        </div>
      )}

      {/* ═══════════ TAB 5: SECURITY & ALERTS ═══════════ */}
      {subTab === 'security' && (
        <div className="space-y-6">

          {/* Change Password Form */}
          <form onSubmit={handleChangePassword} className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-[28px] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Change Master Password</h2>
              <p className="text-xs text-slate-500 mt-0.5">Protect your B2B multi-tier network with an 8+ character password.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Current Password</label>
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-xs sm:text-[13px] font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#00A878]/20 focus:border-[#00A878]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">New Password (Min. 8 chars)</label>
                <input
                  required
                  minLength={8}
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-xs sm:text-[13px] font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#00A878]/20 focus:border-[#00A878]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Confirm New Password</label>
                <input
                  required
                  minLength={8}
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-xs sm:text-[13px] font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#00A878]/20 focus:border-[#00A878]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1.5 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-slate-400" />}
                <span>{showPassword ? 'Hide Passwords' : 'Show Passwords'}</span>
              </button>

              <button
                type="submit"
                disabled={saving}
                className="px-5 h-10 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Lock className="w-3.5 h-3.5" />}
                <span>Update Password</span>
              </button>
            </div>
          </form>

          {/* Notification Alerts Settings */}
          <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-[28px] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Notification Alerts & Channels</h2>
              <p className="text-xs text-slate-500 mt-0.5">Configure live alerts for client leads, consultant registrations, and payouts.</p>
            </div>

            <div className="space-y-3">
              {/* Alert 1 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-[13px] font-bold text-slate-900">Email Alerts for New Leads</div>
                    <div className="text-[11px] text-slate-500">Receive instant email summary whenever leads are assigned in your territory.</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifyEmailLeads(!notifyEmailLeads)}
                  className={`w-13 h-7 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                    notifyEmailLeads ? 'bg-[#00A878]' : 'bg-slate-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-white shadow-sm transform transition-transform ${
                    notifyEmailLeads ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Alert 2 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-[13px] font-bold text-slate-900">WhatsApp Live Dispatch</div>
                    <div className="text-[11px] text-slate-500">Receive priority WhatsApp alerts for high-value migration applications.</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifyWhatsappLeads(!notifyWhatsappLeads)}
                  className={`w-13 h-7 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                    notifyWhatsappLeads ? 'bg-[#00A878]' : 'bg-slate-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-white shadow-sm transform transition-transform ${
                    notifyWhatsappLeads ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Alert 3 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Bell className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-[13px] font-bold text-slate-900">Payout & Settlement Invoices</div>
                    <div className="text-[11px] text-slate-500">Receive automatic invoices when weekly/monthly commission is transferred.</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifyPayouts(!notifyPayouts)}
                  className={`w-13 h-7 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                    notifyPayouts ? 'bg-[#00A878]' : 'bg-slate-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-white shadow-sm transform transition-transform ${
                    notifyPayouts ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={handleSaveAlerts}
                disabled={saving}
                className="px-6 h-11 rounded-2xl bg-[#00A878] hover:bg-[#008A62] text-white text-xs sm:text-sm font-semibold tracking-normal flex items-center gap-2 shadow-sm shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Alert Preferences</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ═══════════ INVITE TEAM MEMBER MODAL ═══════════ */}
      {showInviteModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
          <div className="bg-white w-full max-w-[440px] rounded-[28px] shadow-2xl p-6 border border-slate-100 animate-fadeIn space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Invite Team Member</h3>
                <p className="text-xs text-slate-500">Grant portal access to your staff</p>
              </div>
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInviteTeam} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Full Name *</label>
                <input
                  required
                  type="text"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="Elena Rostova"
                  className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-xs sm:text-[13px] font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#00A878]/20 focus:border-[#00A878]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Corporate Email *</label>
                <input
                  required
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="elena@globalhorizons.com"
                  className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-xs sm:text-[13px] font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#00A878]/20 focus:border-[#00A878]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Role Permission</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-xs sm:text-[13px] font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#00A878]/20 focus:border-[#00A878] cursor-pointer"
                >
                  <option value="Manager">Manager (Full Operational Control)</option>
                  <option value="Accountant">Accountant (Payouts & Invoices Only)</option>
                  <option value="Support">Support Agent (Leads & Enquiries)</option>
                  <option value="Viewer">Viewer (Read-Only Analytics)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 h-11 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={inviting}
                  className="flex-1 h-11 rounded-2xl bg-[#00A878] hover:bg-[#008A62] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {inviting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  <span>Send Invitation</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════ FLOATING iOS TOAST NOTIFICATION ═══════════ */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[9999] bg-slate-900/95 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn border border-white/10 backdrop-blur-xl">
          <div className="w-6 h-6 rounded-full bg-[#00A878] text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs sm:text-[13px] font-semibold">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
