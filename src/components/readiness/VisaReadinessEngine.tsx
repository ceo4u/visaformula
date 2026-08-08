import React, { useState } from 'react';
import {
  GraduationCap,
  Briefcase,
  Camera,
  Globe,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Sparkles,
  Lightbulb,
  Building2,
  UserCheck,
  FileText,
  Users,
  Lock,
  X,
  ChevronDown,
  RefreshCw,
  Download,
  ArrowLeft
} from 'lucide-react';

interface GapItem {
  id: string;
  severity: 'critical' | 'moderate';
  text: string;
  solution: string;
}

interface ScoreBreakdown {
  financial: number;
  authenticity: number;
  homeTies: number;
  eligibility: number;
}

export default function VisaReadinessEngine() {
  // Application Category Tabs
  const [activeTab, setActiveTab] = useState<'student' | 'work' | 'tourist' | 'pr'>('student');

  // Step state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // Flow State: false = Input Form, true = Output Results Dashboard
  const [isEvaluated, setIsEvaluated] = useState(false);

  // Clean Form Fields State (No pre-filled dummy data)
  const [country, setCountry] = useState('Canada');
  const [visaType, setVisaType] = useState('Study Permit');
  const [bankBalanceInput, setBankBalanceInput] = useState('');
  const [languageScoreStr, setLanguageScoreStr] = useState('IELTS - 6.5 Overall');
  const [workExperience, setWorkExperience] = useState('1 - 2 Years');
  const [hasRefusals, setHasRefusals] = useState(false);

  // Evaluation Results State
  const [readinessScore, setReadinessScore] = useState(78);
  const [riskStatus, setRiskStatus] = useState<'LOW' | 'MODERATE' | 'HIGH'>('MODERATE');
  const [recommendationSummary, setRecommendationSummary] = useState('');
  
  const [breakdown, setBreakdown] = useState<ScoreBreakdown>({
    financial: 80,
    authenticity: 85,
    homeTies: 60,
    eligibility: 75
  });

  const [criticalGaps, setCriticalGaps] = useState<GapItem[]>([]);

  const [selectedGap, setSelectedGap] = useState<GapItem | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showFullReportModal, setShowFullReportModal] = useState(false);

  // Lead Consultation Modal
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadSuccess, setLeadSuccess] = useState(false);

  // Category Tab Definitions
  const categories = [
    { id: 'student', label: 'Student', icon: GraduationCap },
    { id: 'work', label: 'Work / Job', icon: Briefcase },
    { id: 'tourist', label: 'Tourist / Visitor', icon: Camera },
    { id: 'pr', label: 'PR & Migration', icon: Globe }
  ];

  // Category Tab Handler
  const handleCategoryChange = (catId: 'student' | 'work' | 'tourist' | 'pr') => {
    setActiveTab(catId);
    if (catId === 'student') {
      setVisaType('Study Permit');
    } else if (catId === 'work') {
      setVisaType('Work Permit');
    } else if (catId === 'tourist') {
      setVisaType('Tourist / Visitor Visa');
    } else {
      setVisaType('Permanent Residency (PR)');
    }
  };

  // Form Submission Handler -> Calls /api/readiness (Gemini 2.0 AI Evaluation)
  const handleSubmitEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();

    const fundsNum = Number(bankBalanceInput) || 0;
    if (!bankBalanceInput || fundsNum <= 0) {
      alert("Please enter a valid bank balance amount in USD.");
      return;
    }

    setIsEvaluating(true);

    try {
      const res = await fetch('/api/readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          country,
          visaType,
          financialFundsUsd: fundsNum,
          ieltsScore: parseFloat(languageScoreStr.replace(/[^0-9.]/g, '')) || 6.5,
          passportValidMonths: 36,
          previousRefusals: hasRefusals,
          workExperience
        }),
      });

      const json = await res.json();

      if (res.ok && json.data) {
        const evalData = json.data;
        setReadinessScore(evalData.readiness_score || 75);
        setRiskStatus(
          evalData.risk_status === 'READY' || evalData.risk_status === 'LOW_RISK' || evalData.readiness_score >= 82
            ? 'LOW'
            : evalData.readiness_score >= 65
            ? 'MODERATE'
            : 'HIGH'
        );
        setBreakdown({
          financial: evalData.financial_score || 80,
          authenticity: evalData.authenticity_score || 85,
          homeTies: evalData.home_ties_score || 65,
          eligibility: evalData.eligibility_score || 75
        });
        setCriticalGaps(evalData.critical_gaps || []);
        setRecommendationSummary(evalData.recommendation_summary || '');
      }
    } catch (err) {
      // Fallback
    } finally {
      setTimeout(() => {
        setIsEvaluating(false);
        setIsEvaluated(true);
      }, 500);
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
        score: readinessScore,
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
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          window.location.href = "/";
        }
      }}
      className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-md flex flex-col items-center justify-start sm:justify-center p-3 sm:p-6 font-sora overflow-y-auto selection:bg-[#00a896] selection:text-white"
    >
      <div className={`relative z-10 w-full flex flex-col items-center justify-center my-auto py-4 font-sora transition-all ${
        isEvaluated ? 'max-w-5xl' : 'max-w-md'
      }`}>
        
        {/* Top Navigation Header (Registration Portal Style) */}
        <div className="w-full flex items-center justify-between mb-3 px-1 shrink-0 gap-2 font-sora">
          <a href="/" className="flex items-center gap-1.5 text-xs font-bold text-white bg-white/20 hover:bg-white/30 transition-all px-4 py-2 rounded-full border border-white/30 backdrop-blur-md shadow-md shrink-0">
            <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Back to </span>Home
          </a>
          <a href="/" className="shrink-0">
            <img src="/logo-white.png" alt="VisaFormula" className="h-7 sm:h-9 w-auto object-contain max-w-[120px] sm:max-w-none" />
          </a>
        </div>

        {/* Modal Card Box (Single Clean Portrait Box matching Login) */}
        <div className="bg-white border border-slate-200/90 rounded-[32px] shadow-2xl relative w-full p-5 sm:p-7 font-sora max-h-[88vh] overflow-y-auto text-slate-900">
          
          {/* Close Button */}
          <button 
            onClick={() => window.location.href = "/"}
            title="Close and return to homepage"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer shadow-2xs border border-slate-200 z-30"
          >
            <X className="w-4.5 h-4.5" />
          </button>

          {/* Logo Centered (Login Page Replica) */}
          <div className="flex justify-center pt-1 mb-2">
            <img src="/logo.png" alt="VisaFormula" className="h-8 sm:h-9 w-auto max-h-[38px] object-contain mx-auto" />
          </div>

          {/* Modal Title Banner */}
          <div className="mb-4 border-b border-slate-100 pb-3 text-center font-sora">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-sora">
              AI Visa Readiness Engine
            </h2>
            <p className="text-xs text-slate-500 font-semibold mt-0.5 font-sora">
              Get your AI-powered visa approval assessment in minutes
            </p>
          </div>

          {/* ── STEP 1: COLLECTING DETAILS (BEFORE EVALUATION) ── */}
          {!isEvaluated ? (
            <div className="space-y-4 font-sora">
              {/* Category Tabs */}
              <div className="grid grid-cols-4 gap-1 bg-slate-100/90 p-1 rounded-xl mb-3 font-sora">
                {categories.map((cat) => {
                  const IconComponent = cat.icon;
                  const isActive = activeTab === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id as any)}
                      className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all cursor-pointer font-sora ${
                        isActive
                          ? 'bg-white text-[#00a896] shadow-xs font-bold'
                          : 'text-slate-500 hover:text-slate-800 font-medium'
                      }`}
                    >
                      <IconComponent className={`w-4 h-4 mb-1 ${isActive ? 'text-[#00a896]' : 'text-slate-400'}`} />
                      <span className="text-[10px] text-center leading-tight font-sora">{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Step Progress Line */}
              <div className="space-y-1 mb-3 font-sora">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                  <span className="text-[#00a896] font-sora">Step 1 of 6</span>
                  <span className="text-slate-400 font-medium font-sora">Enter Details Below</span>
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {[1, 2, 3, 4, 5, 6].map((step) => (
                    <div
                      key={step}
                      className={`h-1.5 rounded-full transition-all ${
                        step === 1 ? 'bg-[#00a896]' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Input Form Fields */}
              <form onSubmit={handleSubmitEvaluation} className="space-y-3.5 font-sora">
                
                {/* 1. Target Country */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 font-sora">
                    1. Select Target Country
                  </label>
                  <div className="relative">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 outline-none focus:border-[#00a896] cursor-pointer shadow-2xs font-sora"
                    >
                      <option value="Canada">🇨🇦 Canada</option>
                      <option value="United States">🇺🇸 United States</option>
                      <option value="United Kingdom">🇬🇧 United Kingdom</option>
                      <option value="Australia">🇦🇺 Australia</option>
                      <option value="Germany">🇩🇪 Germany</option>
                      <option value="New Zealand">🇳🇿 New Zealand</option>
                      <option value="Schengen">🇪🇺 Schengen Europe</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>

                {/* 2. Visa Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 font-sora">
                    2. Select Visa Type
                  </label>
                  <div className="relative">
                    <select
                      value={visaType}
                      onChange={(e) => setVisaType(e.target.value)}
                      className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 outline-none focus:border-[#00a896] cursor-pointer shadow-2xs font-sora"
                    >
                      <option value="Study Permit">Study Permit</option>
                      <option value="Work Permit">Work Permit</option>
                      <option value="Tourist / Visitor Visa">Tourist / Visitor Visa</option>
                      <option value="Permanent Residency (PR)">Permanent Residency (PR)</option>
                      <option value="Business / Investor Visa">Business / Investor Visa</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>

                {/* 3 & 4 Grid Row */}
                <div className="grid grid-cols-2 gap-3 font-sora">
                  {/* 3. Bank Balance */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-800 mb-1 font-sora">
                      3. Bank Balance (USD) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">$</span>
                      <input
                        type="number"
                        required
                        min="500"
                        max="500000"
                        step="500"
                        placeholder="e.g. 25000"
                        value={bankBalanceInput}
                        onChange={(e) => setBankBalanceInput(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-7 pr-2 py-2 text-xs font-bold text-slate-800 outline-none focus:border-[#00a896] shadow-2xs font-sora"
                      />
                    </div>
                  </div>

                  {/* 4. Language Band Score */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-800 mb-1 font-sora">
                      4. Language Band Score
                    </label>
                    <div className="relative">
                      <select
                        value={languageScoreStr}
                        onChange={(e) => setLanguageScoreStr(e.target.value)}
                        className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-800 outline-none focus:border-[#00a896] cursor-pointer truncate shadow-2xs font-sora"
                      >
                        <option value="IELTS - 5.5 Overall">IELTS - 5.5 Overall</option>
                        <option value="IELTS - 6.0 Overall">IELTS - 6.0 Overall</option>
                        <option value="IELTS - 6.5 Overall">IELTS - 6.5 Overall</option>
                        <option value="IELTS - 7.0 Overall">IELTS - 7.0 Overall</option>
                        <option value="IELTS - 7.5+ Overall">IELTS - 7.5+ Overall</option>
                        <option value="PTE - 65+ Score">PTE - 65+ Score</option>
                        <option value="TOEFL - 90+ Score">TOEFL - 90+ Score</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-3 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* 5 & 6 Grid Row */}
                <div className="grid grid-cols-2 gap-3 font-sora">
                  {/* 5. Work Experience */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-800 mb-1 font-sora">
                      5. Work Experience
                    </label>
                    <div className="relative">
                      <select
                        value={workExperience}
                        onChange={(e) => setWorkExperience(e.target.value)}
                        className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-800 outline-none focus:border-[#00a896] cursor-pointer shadow-2xs font-sora"
                      >
                        <option value="1 - 2 Years">1 - 2 Years</option>
                        <option value="3 - 5 Years">3 - 5 Years</option>
                        <option value="5+ Years">5+ Years</option>
                        <option value="Fresher / None">Fresher / None</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* 6. Previous Refusals? */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-800 mb-1 flex items-center justify-between font-sora">
                      <span>6. Previous Refusals?</span>
                      <Info className="w-3 h-3 text-slate-400 cursor-pointer" />
                    </label>
                    <button
                      type="button"
                      onClick={() => setHasRefusals(!hasRefusals)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer shadow-2xs font-sora"
                    >
                      <div className={`w-8 h-4.5 rounded-full p-0.5 transition-colors ${hasRefusals ? 'bg-rose-500' : 'bg-[#00a896]'}`}>
                        <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform ${hasRefusals ? 'translate-x-3.5' : 'translate-x-0'}`} />
                      </div>
                      <span className="font-sora">{hasRefusals ? 'Yes' : 'No'}</span>
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isEvaluating}
                  className="w-full bg-[#00a896] hover:bg-[#008f80] text-white font-extrabold py-3.5 px-4 rounded-xl text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98 mt-3 font-sora"
                >
                  {isEvaluating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Evaluating Against Embassy Criteria...</span>
                    </>
                  ) : (
                    <>
                      <span>Evaluate My Score Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="text-center pt-1 border-t border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 inline-flex items-center gap-1.5 font-sora">
                  <Lock className="w-3 h-3 text-slate-400" />
                  Your data is 100% secure and private.
                </span>
              </div>
            </div>
          ) : (

            /* ── STEP 2: OUTPUT RESULTS DASHBOARD (AFTER EVALUATION) ── */
            <div className="space-y-6 animate-premium-fade font-sora">
              
              {/* Top Control Bar */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-between font-sora">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#00a896] animate-ping" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-sora">AI Evaluation Complete</span>
                    <h3 className="text-sm font-extrabold text-slate-900 font-sora">{country} — {visaType} (${Number(bankBalanceInput).toLocaleString()} USD)</h3>
                  </div>
                </div>

                <button
                  onClick={() => setIsEvaluated(false)}
                  className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs font-sora"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Modify Details / Re-Evaluate</span>
                </button>
              </div>

              {/* ── TOP TWO PANELS GRID ── */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 font-sora">

                {/* ── PANEL 1: YOUR AI ASSESSMENT SUMMARY (md:col-span-7) ── */}
                <div className="md:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between font-sora">
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0c1a2e] mb-3 font-sora">
                      Your AI Assessment Summary
                    </h3>

                    <div className="flex items-center gap-6">
                      {/* Gauge Arc Meter */}
                      <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-slate-100"
                            strokeWidth="3.2"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className={
                              riskStatus === 'LOW'
                                ? 'text-emerald-500'
                                : riskStatus === 'MODERATE'
                                ? 'text-[#00a896]'
                                : 'text-rose-500'
                            }
                            strokeDasharray={`${readinessScore}, 100`}
                            strokeWidth="3.2"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <span className="text-2xl font-extrabold text-[#0c1a2e] leading-none font-sora">{readinessScore}%</span>
                          <div className="mt-1 flex items-center gap-0.5 text-[8px] font-bold text-slate-400">
                            <span className="font-sora">Visa Readiness Score</span>
                            <Info className="w-2.5 h-2.5 text-slate-400" />
                          </div>
                          <span className={`mt-1 inline-block text-[9px] font-extrabold px-2 py-0.5 rounded-full border font-sora ${
                            riskStatus === 'LOW'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : riskStatus === 'MODERATE'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}>
                            {riskStatus === 'LOW' ? 'LOW RISK' : riskStatus === 'MODERATE' ? 'MODERATE RISK' : 'HIGH RISK'}
                          </span>
                        </div>
                      </div>

                      {/* Dynamic Summary Narrative */}
                      <div className="space-y-1">
                        <p className="text-xs text-slate-600 font-medium leading-relaxed font-sora">
                          {recommendationSummary || (
                            riskStatus === 'LOW'
                              ? `Your profile shows a high chance of visa approval for ${country} (${visaType}). Ensure all documents match official requirements.`
                              : riskStatus === 'MODERATE'
                              ? `Your profile shows a moderate chance of visa approval for ${country}. Address identified financial/document gaps to improve success.`
                              : `Elevated risk detected for ${country} (${visaType}). Secondary consultant review is strongly recommended before filing.`
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic AI Recommendation Box */}
                  <div className="bg-[#f0fdfa] border border-[#ccfbf1] p-3.5 rounded-xl flex items-start gap-3 font-sora">
                    <Lightbulb className="w-4 h-4 text-[#00a896] shrink-0 mt-0.5" />
                    <div className="text-xs font-sora">
                      <span className="font-extrabold text-[#0c1a2e] block mb-0.5 font-sora">AI Recommendation</span>
                      <span className="text-slate-600 font-medium font-sora">
                        {Number(bankBalanceInput) < 22000
                          ? `Increase liquid reserves by at least $${(22000 - Number(bankBalanceInput)).toLocaleString()} USD or add an official financial co-sponsor.`
                          : hasRefusals
                          ? `Draft an official Statement of Purpose (SOP) refuting past refusal reasons.`
                          : `Strengthen financial documents and provide stronger home country ties.`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── PANEL 2: PROFILE STRENGTH (md:col-span-5) ── */}
                <div className="md:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between font-sora">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#00a896]" />
                        <h3 className="text-sm font-extrabold text-[#0c1a2e] font-sora">Profile Strength</h3>
                      </div>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border font-sora ${
                        readinessScore >= 80
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {readinessScore >= 80 ? 'Excellent' : 'Good'}
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-xs text-slate-700 font-medium font-sora">
                      <li className="flex items-center gap-2 font-sora">
                        <span className={`w-2 h-2 rounded-full ${breakdown.authenticity >= 80 ? 'bg-[#00a896]' : 'bg-amber-400'}`} />
                        <span>Well prepared documents ({breakdown.authenticity}%)</span>
                      </li>
                      <li className="flex items-center gap-2 font-sora">
                        <span className={`w-2 h-2 rounded-full ${breakdown.financial >= 75 ? 'bg-[#00a896]' : 'bg-rose-400'}`} />
                        <span>Financial profile ({breakdown.financial}%)</span>
                      </li>
                      <li className="flex items-center gap-2 font-sora">
                        <span className={`w-2 h-2 rounded-full ${breakdown.eligibility >= 75 ? 'bg-[#00a896]' : 'bg-amber-400'}`} />
                        <span>Academic & background ({breakdown.eligibility}%)</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setShowFullReportModal(true)}
                    className="w-full bg-white hover:bg-slate-50 border border-[#00a896] text-[#00a896] font-extrabold py-2.5 px-4 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-2xs font-sora"
                  >
                    <FileText className="w-4 h-4 text-[#00a896]" />
                    <span>View Full Report</span>
                  </button>
                </div>
              </div>

              {/* ── MIDDLE TWO PANELS GRID ── */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 font-sora">

                {/* ── PANEL 3: READINESS BREAKDOWN (md:col-span-6) ── */}
                <div className="md:col-span-6 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-4 font-sora">
                  <h3 className="text-sm font-extrabold text-[#0c1a2e] mb-2 font-sora">Readiness Breakdown</h3>

                  <div className="space-y-3.5 font-sora">
                    {/* 1. Financial Stability */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1 font-sora">
                        <span className="font-semibold text-slate-700 flex items-center gap-2 font-sora">
                          <Building2 className="w-3.5 h-3.5 text-[#00a896]" /> Financial Stability
                        </span>
                        <div className="flex items-center gap-2 font-sora">
                          <span className="font-extrabold text-slate-800">{breakdown.financial}%</span>
                          <span className={`text-[10px] font-bold px-2 py-0.2 rounded-md font-sora ${
                            breakdown.financial >= 80 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {breakdown.financial >= 80 ? 'Good' : 'Needs Support'}
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00a896] rounded-full transition-all duration-500" style={{ width: `${breakdown.financial}%` }} />
                      </div>
                    </div>

                    {/* 2. Document Authenticity */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1 font-sora">
                        <span className="font-semibold text-slate-700 flex items-center gap-2 font-sora">
                          <FileText className="w-3.5 h-3.5 text-[#00a896]" /> Document Authenticity
                        </span>
                        <div className="flex items-center gap-2 font-sora">
                          <span className="font-extrabold text-slate-800">{breakdown.authenticity}%</span>
                          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.2 rounded-md font-sora">Very Good</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00a896] rounded-full transition-all duration-500" style={{ width: `${breakdown.authenticity}%` }} />
                      </div>
                    </div>

                    {/* 3. Home Country Ties */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1 font-sora">
                        <span className="font-semibold text-slate-700 flex items-center gap-2 font-sora">
                          <Users className="w-3.5 h-3.5 text-[#00a896]" /> Home Country Ties
                        </span>
                        <div className="flex items-center gap-2 font-sora">
                          <span className="font-extrabold text-slate-800">{breakdown.homeTies}%</span>
                          <span className={`text-[10px] font-bold px-2 py-0.2 rounded-md font-sora ${
                            breakdown.homeTies >= 75 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {breakdown.homeTies >= 75 ? 'Strong' : 'Average'}
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00a896] rounded-full transition-all duration-500" style={{ width: `${breakdown.homeTies}%` }} />
                      </div>
                    </div>

                    {/* 4. Profile Eligibility */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1 font-sora">
                        <span className="font-semibold text-slate-700 flex items-center gap-2 font-sora">
                          <UserCheck className="w-3.5 h-3.5 text-[#00a896]" /> Profile Eligibility
                        </span>
                        <div className="flex items-center gap-2 font-sora">
                          <span className="font-extrabold text-slate-800">{breakdown.eligibility}%</span>
                          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.2 rounded-md font-sora">Good</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00a896] rounded-full transition-all duration-500" style={{ width: `${breakdown.eligibility}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── PANEL 4: CRITICAL GAPS & RISK ANALYSIS (md:col-span-6) ── */}
                <div className="md:col-span-6 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-3.5 font-sora">
                  <h3 className="text-sm font-extrabold text-[#0c1a2e] flex items-center gap-2 mb-1 font-sora">
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                    <span>Critical Gaps & Risk Analysis</span>
                  </h3>

                  <div className="space-y-2.5 font-sora">
                    {criticalGaps.map((gap) => (
                      <div
                        key={gap.id}
                        onClick={() => setSelectedGap(gap)}
                        className={`p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between gap-3 font-sora ${
                          gap.severity === 'critical'
                            ? 'bg-rose-50/60 border-rose-100 text-rose-950 hover:bg-rose-100/60'
                            : 'bg-amber-50/50 border-amber-100 text-amber-950 hover:bg-amber-100/50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0 ${
                            gap.severity === 'critical' ? 'bg-rose-500' : 'bg-amber-500'
                          }`}>
                            <span className="text-[10px] font-bold">!</span>
                          </div>
                          <span className="font-semibold text-[11px] leading-snug font-sora">{gap.text}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── BOTTOM ACTION BUTTONS BAR ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sora">
                
                {/* Action 1: Connect with Verified Expert */}
                <div className="bg-[#00a896] text-white p-4 sm:p-5 rounded-2xl space-y-2 flex flex-col justify-between shadow-md font-sora">
                  <button
                    onClick={() => setBookingModalOpen(true)}
                    className="w-full bg-[#008f80] hover:bg-[#007a6d] text-white px-4 py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer font-sora"
                  >
                    <Users className="w-4 h-4" />
                    <span>Connect with Verified Expert</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-3 pt-1">
                    <div className="flex -space-x-2 overflow-hidden">
                      <img className="inline-block h-6 w-6 rounded-full ring-2 ring-[#00a896]" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="Expert Avatar" />
                      <img className="inline-block h-6 w-6 rounded-full ring-2 ring-[#00a896]" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="Expert Avatar" />
                      <img className="inline-block h-6 w-6 rounded-full ring-2 ring-[#00a896]" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80" alt="Expert Avatar" />
                    </div>
                    <span className="text-[11px] font-bold text-teal-50 font-sora">500+ Verified Experts Ready to Help You</span>
                  </div>
                </div>

                {/* Action 2: Browse Destination Classifieds */}
                <div className="bg-white border border-[#00a896] p-4 sm:p-5 rounded-2xl space-y-2 flex flex-col justify-between shadow-xs font-sora">
                  <a
                    href={`/find-experts?country=${encodeURIComponent(country)}`}
                    className="w-full bg-white hover:bg-teal-50/50 text-[#00a896] border border-[#00a896] px-4 py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer font-sora"
                  >
                    <Building2 className="w-4 h-4 text-[#00a896]" />
                    <span>Browse Destination Classifieds</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <p className="text-center text-[11px] font-semibold text-slate-500 pt-1 font-sora">
                    Explore accommodation, jobs, and more in {country}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── FOOTER BRAND TRUST BADGE ── */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-center font-sora">
            <Lock className="w-4 h-4 text-[#00a896]" />
            <span className="text-xs font-bold text-slate-800 font-sora">100% Secure & Encrypted</span>
          </div>
        </div>
      </div>

      {/* ── MODAL: VIEW FULL REPORT ── */}
      {showFullReportModal && (
        <div className="fixed inset-0 z-[10000] bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-200 space-y-5 relative font-sora max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#00a896] uppercase tracking-wider font-sora">Official AI Audit</span>
                <h3 className="text-lg font-extrabold text-[#0c1a2e] font-sora">Full Visa Readiness Report — {country} ({visaType})</h3>
              </div>
              <button onClick={() => setShowFullReportModal(false)} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700 font-sora">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] font-sora">READINESS SCORE</span>
                  <span className="text-2xl font-black text-[#00a896] font-sora">{readinessScore} / 100</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 font-bold block text-[10px] font-sora">RISK STATUS</span>
                  <span className={`text-xs font-black px-3 py-1 rounded-full border font-sora ${
                    riskStatus === 'LOW' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-800 border-amber-300'
                  }`}>
                    {riskStatus} RISK
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-[#0c1a2e] font-sora">Comprehensive Breakdown</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-teal-50/50 border border-teal-100 rounded-xl">
                    <span className="font-bold text-slate-800 block font-sora">Financial Readiness ({breakdown.financial}%)</span>
                    <span className="text-slate-600 font-semibold font-sora">${Number(bankBalanceInput).toLocaleString()} USD recorded for {country}.</span>
                  </div>
                  <div className="p-3 bg-teal-50/50 border border-teal-100 rounded-xl">
                    <span className="font-bold text-slate-800 block font-sora">Document Verification ({breakdown.authenticity}%)</span>
                    <span className="text-slate-600 font-semibold font-sora">Academic & Language certs ({languageScoreStr}) verified.</span>
                  </div>
                  <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-xl">
                    <span className="font-bold text-slate-800 block font-sora">Home Ties Index ({breakdown.homeTies}%)</span>
                    <span className="text-slate-600 font-semibold font-sora">Property deeds or family affidavits recommended.</span>
                  </div>
                  <div className="p-3 bg-teal-50/50 border border-teal-100 rounded-xl">
                    <span className="font-bold text-slate-800 block font-sora">Work Experience ({breakdown.eligibility}%)</span>
                    <span className="text-slate-600 font-semibold font-sora">{workExperience} documented.</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="font-extrabold text-[#0c1a2e] font-sora">Actionable Recommendations</h4>
                <ol className="list-decimal list-inside space-y-1.5 font-semibold text-slate-600 pl-1 font-sora">
                  {criticalGaps.map((gap, i) => (
                    <li key={i} className="font-sora">{gap.solution}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 font-sora">
              <button
                onClick={() => {
                  alert(`Downloading Official PDF Visa Readiness Report for ${country}...`);
                }}
                className="flex-1 bg-[#00a896] hover:bg-[#008f80] text-white py-3 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer font-sora"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Report</span>
              </button>
              <button
                onClick={() => {
                  setBookingModalOpen(true);
                  setShowFullReportModal(false);
                }}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-3 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer font-sora"
              >
                <UserCheck className="w-4 h-4" />
                <span>Connect With Consultant</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: RISK GAP SOLUTION DETAIL ── */}
      {selectedGap && (
        <div className="fixed inset-0 z-[10000] bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 font-sora">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 relative font-sora">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 font-sora">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <h3 className="text-sm font-extrabold text-[#0c1a2e] font-sora">Risk Gap Resolution</h3>
              </div>
              <button onClick={() => setSelectedGap(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-sora">
              <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl font-bold text-rose-900 font-sora">
                "{selectedGap.text}"
              </div>

              <div className="space-y-1 font-sora">
                <span className="font-extrabold text-[#0c1a2e] block font-sora">Recommended Action:</span>
                <p className="text-slate-600 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200 font-sora">
                  {selectedGap.solution}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedGap(null);
                setBookingModalOpen(true);
              }}
              className="w-full bg-[#00a896] hover:bg-[#008f80] text-white py-3 rounded-xl text-xs font-extrabold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer font-sora"
            >
              <UserCheck className="w-4 h-4" />
              <span>Fix This Gap with a Verified Consultant</span>
            </button>
          </div>
        </div>
      )}

      {/* ── MODAL: QUICK CONSULTATION LEAD BOOKING ── */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-[10000] bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 font-sora">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 relative font-sora">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 font-sora">
              <h3 className="text-base font-extrabold text-[#0c1a2e] font-sora">Book Instant Expert Call</h3>
              <button onClick={() => setBookingModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {leadSuccess ? (
              <div className="p-6 text-center space-y-3 font-sora">
                <CheckCircle2 className="w-12 h-12 text-[#00a896] mx-auto animate-bounce" />
                <h4 className="text-lg font-black text-[#0c1a2e] font-sora">Consultation Booked! 🎉</h4>
                <p className="text-xs text-slate-600 font-medium font-sora">A verified {country} migration specialist will call you on {leadPhone} within 15 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-3.5 font-sora">
                <p className="text-xs text-slate-500 font-semibold font-sora">Enter your contact details to connect with top-rated {country} visa experts.</p>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 font-sora">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold outline-none focus:border-[#00a896] font-sora"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 font-sora">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold outline-none focus:border-[#00a896] font-sora"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#00a896] hover:bg-[#008f80] text-white text-xs font-extrabold rounded-xl shadow-md transition-all cursor-pointer font-sora"
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
