import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, UserCheck, Sparkles, Building2, ExternalLink, HelpCircle, X } from 'lucide-react';

interface ReadinessData {
  id: string;
  target_country: string;
  visa_category: string;
  readiness_score: number;
  risk_status: string;
  financial_score: number;
  critical_gaps: string[];
  recommendation_summary: string;
}

export default function VisaReadinessEngine() {
  const [country, setCountry] = useState('Canada');
  const [visaType, setVisaType] = useState('Student Visa');
  const [financialFundsUsd, setFinancialFundsUsd] = useState(25000);
  const [ieltsScore, setIeltsScore] = useState(6.5);
  const [passportValidMonths, setPassportValidMonths] = useState(36);
  const [previousRefusals, setPreviousRefusals] = useState(false);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReadinessData | null>(null);
  const [error, setError] = useState('');
  
  // Lead Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadSuccess, setLeadSuccess] = useState(false);

  const handleSubmitEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          country,
          visaType,
          financialFundsUsd,
          ieltsScore,
          passportValidMonths,
          previousRefusals,
        }),
      });

      const data = await res.json();
      if (res.ok && data.data) {
        setResult(data.data);
        // Persist to local storage history
        try {
          const history = JSON.parse(localStorage.getItem('visaformula_readiness_history') || '[]');
          localStorage.setItem('visaformula_readiness_history', JSON.stringify([data.data, ...history]));
        } catch (e) {}
      } else {
        setError(data.error || 'Evaluation failed. Please check inputs.');
      }
    } catch (err) {
      setError('Server connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    try {
      const existingLeads = JSON.parse(localStorage.getItem('expert_leads') || '[]');
      const newLead = {
        id: Date.now(),
        name: leadName,
        visa: visaType,
        country: country,
        phone: leadPhone,
        status: 'New',
        score: result?.readiness_score || 70,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('expert_leads', JSON.stringify([newLead, ...existingLeads]));
    } catch(e) {}

    setLeadSuccess(true);
    setTimeout(() => {
      setBookingModalOpen(false);
      setLeadSuccess(false);
      setLeadName('');
      setLeadPhone('');
    }, 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto font-sora">
      
      {/* HEADER HERO BANNER */}
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-[#00a896] text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-2xs">
          <Sparkles className="w-4 h-4 text-[#00a896]" />
          <span>AI-Powered Visa Readiness Engine 3.0</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Check Your Visa Approval Score & Risk Gaps
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-slate-500 max-w-xl mx-auto leading-relaxed">
          Evaluate your profile against real embassy criteria using Gemini 2.0 Flash intelligence before submitting your official application.
        </p>
      </div>

      {/* MAIN CONTAINER GRID */}
      <div className="grid grid-cols-1 gap-8">

        {/* INPUT QUESTIONNAIRE FORM */}
        {!result && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/90 space-y-6">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span>Step 1: Enter Application Details</span>
            </h3>

            {error && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-2xl text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmitEvaluation} className="space-y-5">
              
              {/* Target Country & Visa Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-800 mb-1.5">Target Destination Country *</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold text-slate-900 outline-none focus:border-[#00a896] cursor-pointer"
                  >
                    <option value="Canada">Canada 🇨🇦</option>
                    <option value="USA">United States 🇺🇸</option>
                    <option value="United Kingdom">United Kingdom 🇬🇧</option>
                    <option value="Australia">Australia 🇦🇺</option>
                    <option value="Germany">Germany 🇩🇪</option>
                    <option value="New Zealand">New Zealand 🇳🇿</option>
                    <option value="UAE / Dubai">UAE / Dubai 🇦🇪</option>
                    <option value="Schengen">Schengen Europe 🇪🇺</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-800 mb-1.5">Visa Category *</label>
                  <select
                    value={visaType}
                    onChange={(e) => setVisaType(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold text-slate-900 outline-none focus:border-[#00a896] cursor-pointer"
                  >
                    <option value="Student Visa">Student Visa 🎓</option>
                    <option value="Work Permit">Work Permit 💼</option>
                    <option value="Tourist / Visit Visa">Tourist / Visit Visa ✈️</option>
                    <option value="PR / Migration">PR / Migration 🏡</option>
                    <option value="Business / Investor">Business / Investor 💰</option>
                  </select>
                </div>
              </div>

              {/* Liquid Funds Input */}
              <div className="bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-extrabold text-slate-900">Available Liquid Funds (USD) *</label>
                  <span className="text-sm font-black text-[#00a896] bg-teal-50 px-3 py-1 rounded-xl border border-teal-200">
                    ${financialFundsUsd.toLocaleString()} USD
                  </span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="100000"
                  step="1000"
                  value={financialFundsUsd}
                  onChange={(e) => setFinancialFundsUsd(Number(e.target.value))}
                  className="w-full accent-[#00a896] cursor-pointer"
                />
                <p className="text-[11px] font-semibold text-slate-500">Includes liquid bank balance, fixed deposits, or liquid sponsor funds.</p>
              </div>

              {/* IELTS & Passport Expiry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-extrabold text-slate-900">Overall IELTS / Language Band *</label>
                    <span className="text-xs font-black text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-300">
                      {ieltsScore}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="4.0"
                    max="9.0"
                    step="0.5"
                    value={ieltsScore}
                    onChange={(e) => setIeltsScore(Number(e.target.value))}
                    className="w-full accent-[#00a896] cursor-pointer"
                  />
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-extrabold text-slate-900">Passport Remaining Validity *</label>
                    <span className="text-xs font-black text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-300">
                      {passportValidMonths} Months
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="120"
                    step="3"
                    value={passportValidMonths}
                    onChange={(e) => setPassportValidMonths(Number(e.target.value))}
                    className="w-full accent-[#00a896] cursor-pointer"
                  />
                </div>
              </div>

              {/* Previous Refusal History */}
              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div>
                  <label className="block text-xs font-extrabold text-slate-900">Have you ever had a prior visa refusal for any country?</label>
                  <p className="text-[11px] font-semibold text-slate-500">Evaluates refusal risk impact on embassy decision.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviousRefusals(!previousRefusals)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    previousRefusals
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {previousRefusals ? 'YES (Refusal History)' : 'NO (Clean Record)'}
                </button>
              </div>

              {/* Submit Evaluation Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#00a896] hover:bg-[#008f80] text-white font-extrabold text-sm rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Evaluating Against Embassy Criteria...</span>
                  </>
                ) : (
                  <>
                    <span>Evaluate My Visa Readiness Score Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* RESULTS DASHBOARD VIEW */}
        {result && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/90 space-y-6 animate-premium-fade">
            
            {/* Top Controls */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Assessment Result</span>
                <h3 className="text-lg font-black text-slate-900">{result.target_country} — {result.visa_category}</h3>
              </div>
              <button
                onClick={() => setResult(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-Evaluate</span>
              </button>
            </div>

            {/* RADIAL SCORE GAUGE & STATUS */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-50 border border-slate-200/80 p-6 rounded-3xl">
              
              {/* Score Gauge Circle */}
              <div className="md:col-span-5 flex flex-col items-center justify-center text-center space-y-2">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-200"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={`${
                        result.readiness_score >= 80
                          ? 'text-emerald-500'
                          : result.readiness_score >= 60
                          ? 'text-amber-500'
                          : 'text-rose-600'
                      }`}
                      strokeDasharray={`${result.readiness_score}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-black text-slate-900">{result.readiness_score}%</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Readiness</span>
                  </div>
                </div>

                <div className="pt-1">
                  {result.risk_status === 'READY' && (
                    <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> High Approval Probability (READY)
                    </span>
                  )}
                  {result.risk_status === 'MODERATE_RISK' && (
                    <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full border border-amber-300">
                      <AlertTriangle className="w-4 h-4 text-amber-700" /> Moderate Risk (GAPS DETECTED)
                    </span>
                  )}
                  {result.risk_status === 'HIGH_RISK' && (
                    <span className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-800 text-xs font-extrabold px-3 py-1 rounded-full border border-rose-300">
                      <ShieldAlert className="w-4 h-4 text-rose-600" /> High Rejection Risk (ACTION REQUIRED)
                    </span>
                  )}
                </div>
              </div>

              {/* Officer Summary */}
              <div className="md:col-span-7 space-y-3 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Officer Evaluation Summary</h4>
                <p className="text-xs font-semibold text-slate-700 leading-relaxed bg-white p-4 rounded-2xl border border-slate-200">
                  "{result.recommendation_summary}"
                </p>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-600 pt-1">
                  <span>Financial Rating: <strong className="text-slate-900">{result.financial_score}/100</strong></span>
                  <span>Target: <strong className="text-slate-900">{result.target_country}</strong></span>
                </div>
              </div>
            </div>

            {/* CRITICAL GAP BREAKDOWN BADGES */}
            <div className="space-y-3">
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Critical Gap Breakdown ({result.critical_gaps.length})</span>
              </h4>

              {result.critical_gaps.length > 0 ? (
                <div className="space-y-2">
                  {result.critical_gaps.map((gap, i) => (
                    <div key={i} className="p-3.5 bg-rose-50/80 border border-rose-200/90 rounded-2xl flex items-start gap-3 text-xs font-semibold text-rose-900">
                      <span className="w-2 h-2 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                      <p className="leading-relaxed">{gap}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>No critical gaps detected! Your profile meets embassy criteria.</span>
                </div>
              )}
            </div>

            {/* MONETIZATION & EXPERT MARKETPLACE CTA BANNER */}
            {result.readiness_score < 80 && (
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#00a896] rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-xl relative overflow-hidden">
                <div className="relative z-10 space-y-2">
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    High Rejection Risk Mitigation
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    Fix Profile Gaps with Verified Migration Experts
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 max-w-xl font-medium leading-relaxed">
                    Submitting an application with gaps often leads to permanent embassy refusal. Connect with licensed {result.target_country} visa specialists to fix your documentation and financial statements.
                  </p>
                </div>

                <div className="relative z-10 flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={`/find-experts?category=${encodeURIComponent(result.visa_category)}&country=${encodeURIComponent(result.target_country)}`}
                    className="bg-[#00a896] hover:bg-[#008f80] text-white px-6 py-3 rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Connect with Verified Expert</span>
                  </a>

                  <a
                    href={`/classifieds?country=${encodeURIComponent(result.target_country)}`}
                    className="bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>View Classified Offers</span>
                  </a>

                  <button
                    onClick={() => setBookingModalOpen(true)}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 py-3 rounded-2xl text-xs font-black transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Book 1-on-1 Consultation</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* QUICK CONSULTATION LEAD MODAL */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 relative font-sora">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Book Instant Expert Call</h3>
              <button onClick={() => setBookingModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {leadSuccess ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="text-lg font-black text-slate-900">Consultation Booked! 🎉</h4>
                <p className="text-xs text-slate-600 font-medium">A verified {country} migration specialist will call you on {leadPhone} within 15 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-3.5">
                <p className="text-xs text-slate-500 font-semibold">Enter your contact details to connect with top-rated {country} visa experts.</p>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold outline-none focus:border-[#00a896]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold outline-none focus:border-[#00a896]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#00a896] hover:bg-[#008f80] text-white text-xs font-extrabold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Confirm Instant Call Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
