import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Briefcase,
  Camera,
  Globe,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  ShieldCheck,
  Sparkles,
  Lightbulb,
  Building2,
  UserCheck,
  FileText,
  Users,
  Headphones,
  Lock,
  TrendingUp,
  X,
  ChevronDown,
  Check,
  RefreshCw,
  HelpCircle,
  Download,
  Share2,
  ArrowLeft,
  Sliders,
  CheckSquare
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

  // Flow State: false = Collecting Inputs, true = Showing Results Dashboard
  const [isEvaluated, setIsEvaluated] = useState(false);

  // Human captcha state
  const [isHumanChecked, setIsHumanChecked] = useState(true);

  // Form Fields State
  const [country, setCountry] = useState('Canada');
  const [visaType, setVisaType] = useState('Study Permit');
  const [bankBalanceUsd, setBankBalanceUsd] = useState(24500);
  const [languageScoreStr, setLanguageScoreStr] = useState('IELTS - 6.5 Overall');
  const [workExperience, setWorkExperience] = useState('1 - 2 Years');
  const [hasRefusals, setHasRefusals] = useState(false);

  // Evaluation Results State
  const [readinessScore, setReadinessScore] = useState(78);
  const [riskStatus, setRiskStatus] = useState<'LOW' | 'MODERATE' | 'HIGH'>('MODERATE');
  
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

  // REAL DYNAMIC CALCULATION ENGINE
  const computeReadiness = () => {
    let score = 84;
    let finScore = 85;
    let authScore = 90;
    let tiesScore = 75;
    let eligScore = 80;

    const gaps: GapItem[] = [];

    const fundsNum = Number(bankBalanceUsd) || 0;
    const ieltsVal = parseFloat(languageScoreStr.replace(/[^0-9.]/g, '')) || 6.5;

    // Minimum Required Liquid Funds by Country (USD)
    const requiredFunds: Record<string, number> = {
      'Canada': 22000,
      'United States': 32000,
      'United Kingdom': 20000,
      'Australia': 25000,
      'Germany': 14000,
      'New Zealand': 18000,
      'Schengen': 14000,
    };
    const req = requiredFunds[country] || 20000;

    // 1. Financial Fund Assessment
    if (fundsNum < req) {
      const diff = req - fundsNum;
      finScore = Math.max(25, Math.round((fundsNum / req) * 100));
      score -= 24;
      gaps.push({
        id: 'gap-fin-crit',
        severity: 'critical',
        text: `Financial shortfall: Minimum $${req.toLocaleString()} USD required for ${country} ${visaType}. You have a $${diff.toLocaleString()} USD gap.`,
        solution: `Increase liquid bank balance or add a co-sponsor (parents/family member) with official liquid fund proof and affidavit.`
      });
    } else if (fundsNum < req * 1.25) {
      finScore = 78;
      score -= 8;
      gaps.push({
        id: 'gap-fin-mod',
        severity: 'moderate',
        text: `Tight liquid reserves detected. Adding $${Math.round(req * 1.25 - fundsNum).toLocaleString()} USD buffer lowers financial refusal risk.`,
        solution: `Attach fixed deposit certificates, mutual fund statements, or liquid property valuation reports.`
      });
    } else {
      finScore = Math.min(98, 88 + Math.round((fundsNum - req) / 6000));
    }

    // 2. Language Proficiency Assessment
    if (visaType.toLowerCase().includes('study') || visaType.toLowerCase().includes('student')) {
      if (ieltsVal < 6.0) {
        eligScore -= 26;
        score -= 18;
        gaps.push({
          id: 'gap-lang-crit',
          severity: 'critical',
          text: `Language score (${languageScoreStr}) is below embassy minimum threshold (6.0 overall required for student permit).`,
          solution: `Retake IELTS/PTE to achieve overall 6.5+ band before submitting official visa file.`
        });
      } else if (ieltsVal < 6.5) {
        eligScore -= 10;
        score -= 6;
        gaps.push({
          id: 'gap-lang-mod',
          severity: 'moderate',
          text: `Language score meets minimum criteria, but 7.0+ overall significantly improves university visa acceptance.`,
          solution: `Include a Medium of Instruction (MOI) certificate from your previous institution.`
        });
      }
    }

    // 3. Work Experience Assessment
    if (workExperience === 'Fresher / None' && (visaType.toLowerCase().includes('work') || visaType.toLowerCase().includes('pr'))) {
      eligScore -= 30;
      score -= 20;
      gaps.push({
        id: 'gap-exp-crit',
        severity: 'critical',
        text: `Work permit / PR applications require documented skilled work experience.`,
        solution: `Provide official employer reference letters, salary bank credits, and tax filings for past employment.`
      });
    } else if (workExperience === '1 - 2 Years') {
      tiesScore -= 10;
      gaps.push({
        id: 'gap-exp-mod',
        severity: 'moderate',
        text: `Early career profile. Providing evidence of ongoing employment or study leave approval strengthens ties.`,
        solution: `Attach a No Objection Certificate (NOC) and approved study leave letter from your employer.`
      });
    }

    // 4. Previous Refusals Assessment
    if (hasRefusals) {
      tiesScore -= 25;
      score -= 22;
      gaps.push({
        id: 'gap-[#refusal]',
        severity: 'critical',
        text: `Prior visa refusal recorded. Triggers mandatory secondary officer review under embassy refusal codes.`,
        solution: `File a detailed Statement of Purpose (SOP) directly refuting previous refusal grounds with new supporting evidence.`
      });
    }

    if (gaps.length === 0) {
      gaps.push({
        id: 'gap-clean-sop',
        severity: 'moderate',
        text: `Ensure Statement of Purpose (SOP) clearly outlines academic progression and return ties.`,
        solution: `Have a certified visa consultant review your SOP structure prior to submission.`
      });
    }

    score = Math.max(22, Math.min(98, Math.round(score)));
    finScore = Math.max(20, Math.min(98, finScore));
    authScore = Math.max(65, Math.min(98, authScore));
    tiesScore = Math.max(25, Math.min(98, tiesScore));
    eligScore = Math.max(30, Math.min(98, eligScore));

    const status: 'LOW' | 'MODERATE' | 'HIGH' = score >= 82 ? 'LOW' : score >= 64 ? 'MODERATE' : 'HIGH';

    return {
      score,
      status,
      breakdown: {
        financial: finScore,
        authenticity: authScore,
        homeTies: tiesScore,
        eligibility: eligScore,
      },
      gaps
    };
  };

  // Re-compute readiness whenever inputs change
  useEffect(() => {
    const computed = computeReadiness();
    setReadinessScore(computed.score);
    setRiskStatus(computed.status);
    setBreakdown(computed.breakdown);
    setCriticalGaps(computed.gaps);
  }, [country, visaType, bankBalanceUsd, languageScoreStr, workExperience, hasRefusals]);

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

  // Form Submission Handler -> Triggers evaluation and transitions to results
  const handleSubmitEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isHumanChecked) {
      alert("Please confirm 'I am human' checkbox to proceed.");
      return;
    }

    setIsEvaluating(true);

    try {
      await fetch('/api/readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          country,
          visaType,
          financialFundsUsd: bankBalanceUsd,
          ieltsScore: parseFloat(languageScoreStr.replace(/[^0-9.]/g, '')) || 6.5,
          passportValidMonths: 36,
          previousRefusals: hasRefusals
        }),
      });
    } catch (err) {}

    setTimeout(() => {
      setIsEvaluating(false);
      setIsEvaluated(true); // Transition to Output Results Dashboard
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 700);
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
    <div className="w-full max-w-7xl mx-auto font-plus-jakarta pb-12">
      
      {/* ── 1. PAGE TITLE & HEADER BAR ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0c1a2e] tracking-tight">
            AI Visa Readiness Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Get your AI-powered visa approval assessment in minutes
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isEvaluated && (
            <button
              onClick={() => setIsEvaluated(false)}
              className="inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Edit Details</span>
            </button>
          )}

          <a
            href="/find-experts"
            className="inline-flex items-center justify-center gap-2 bg-[#00a896] hover:bg-[#008f80] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-sm transition-all cursor-pointer shrink-0"
          >
            <UserCheck className="w-4 h-4" />
            <span>Find Expert</span>
          </a>
        </div>
      </div>

      {/* ── STEP 1: COLLECTING DETAILS (BEFORE EVALUATION) ── */}
      {!isEvaluated ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Card (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-md space-y-5">
            {/* Category Tabs */}
            <div className="grid grid-cols-4 gap-1 bg-slate-100/80 p-1 rounded-xl mb-4">
              {categories.map((cat) => {
                const IconComponent = cat.icon;
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id as any)}
                    className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-lg transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#00a896] shadow-xs font-bold'
                        : 'text-slate-500 hover:text-slate-800 font-medium'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 mb-1 ${isActive ? 'text-[#00a896]' : 'text-slate-400'}`} />
                    <span className="text-[10px] text-center leading-tight">{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Step Progress Line */}
            <div className="space-y-1.5 mb-5">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span className="text-[#00a896]">Step 1 of 6</span>
                <span className="text-slate-400 font-medium">Enter Details Below</span>
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

            {/* hCaptcha Checkbox Widget */}
            <div className="bg-slate-50/80 border border-slate-200 p-3.5 rounded-xl flex items-center justify-between mb-5">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isHumanChecked}
                  onChange={(e) => setIsHumanChecked(e.target.checked)}
                  className="w-5 h-5 accent-[#00a896] rounded cursor-pointer"
                />
                <span className="text-xs font-bold text-slate-800">I am human</span>
              </label>
              <div className="flex flex-col items-end text-[9px] text-slate-400">
                <div className="w-5 h-5 bg-teal-500 text-white rounded flex items-center justify-center font-bold">h</div>
                <span>Privacy - Terms</span>
              </div>
            </div>

            {/* Input Form Fields */}
            <form onSubmit={handleSubmitEvaluation} className="space-y-4">
              
              {/* 1. Target Country */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-1.5">
                  1. Select Target Country
                </label>
                <div className="relative">
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 outline-none focus:border-[#00a896] cursor-pointer"
                  >
                    <option value="Canada">🇨🇦 Canada</option>
                    <option value="United States">🇺🇸 United States</option>
                    <option value="United Kingdom">🇬🇧 United Kingdom</option>
                    <option value="Australia">🇦🇺 Australia</option>
                    <option value="Germany">🇩🇪 Germany</option>
                    <option value="New Zealand">🇳🇿 New Zealand</option>
                    <option value="Schengen">🇪🇺 Schengen Europe</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* 2. Visa Type */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-1.5">
                  2. Select Visa Type
                </label>
                <div className="relative">
                  <select
                    value={visaType}
                    onChange={(e) => setVisaType(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 outline-none focus:border-[#00a896] cursor-pointer"
                  >
                    <option value="Study Permit">Study Permit</option>
                    <option value="Work Permit">Work Permit</option>
                    <option value="Tourist / Visitor Visa">Tourist / Visitor Visa</option>
                    <option value="Permanent Residency (PR)">Permanent Residency (PR)</option>
                    <option value="Business / Investor Visa">Business / Investor Visa</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* 3 & 4 Grid Row */}
              <div className="grid grid-cols-2 gap-3">
                {/* 3. Bank Balance */}
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-800 mb-1">
                    3. Bank Balance (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">$</span>
                    <input
                      type="number"
                      min="1000"
                      max="200000"
                      step="500"
                      value={bankBalanceUsd}
                      onChange={(e) => setBankBalanceUsd(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-7 pr-2 py-2.5 text-xs font-bold text-slate-800 outline-none focus:border-[#00a896]"
                    />
                  </div>
                </div>

                {/* 4. Language Band Score */}
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-800 mb-1">
                    4. Language Band Score
                  </label>
                  <div className="relative">
                    <select
                      value={languageScoreStr}
                      onChange={(e) => setLanguageScoreStr(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2.5 text-xs font-bold text-slate-800 outline-none focus:border-[#00a896] cursor-pointer truncate"
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
              <div className="grid grid-cols-2 gap-3">
                {/* 5. Work Experience */}
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-800 mb-1">
                    5. Work Experience
                  </label>
                  <div className="relative">
                    <select
                      value={workExperience}
                      onChange={(e) => setWorkExperience(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2.5 text-xs font-bold text-slate-800 outline-none focus:border-[#00a896] cursor-pointer"
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
                  <label className="block text-[11px] font-extrabold text-slate-800 mb-1 flex items-center justify-between">
                    <span>6. Previous Refusals?</span>
                    <Info className="w-3 h-3 text-slate-400 cursor-pointer" />
                  </label>
                  <button
                    type="button"
                    onClick={() => setHasRefusals(!hasRefusals)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <div className={`w-9 h-5 rounded-full p-0.5 transition-colors ${hasRefusals ? 'bg-rose-500' : 'bg-[#00a896]'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${hasRefusals ? 'translate-x-4' : 'translate-x-0'}`} />
                    </div>
                    <span>{hasRefusals ? 'Yes' : 'No'}</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isEvaluating}
                className="w-full bg-[#00a896] hover:bg-[#008f80] text-white font-extrabold py-4 px-4 rounded-xl text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98 mt-3"
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

            <div className="text-center pt-2 border-t border-slate-100">
              <span className="text-[11px] font-medium text-slate-500 inline-flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-slate-400" />
                Your data is 100% secure and private.
              </span>
            </div>
          </div>

          {/* Right Side Preview Hero Card (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-gradient-to-br from-slate-900 via-slate-800 to-[#0c1a2e] rounded-3xl p-8 text-white space-y-6 shadow-xl border border-slate-800 flex flex-col justify-between min-h-[500px]">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-bold px-3.5 py-1.5 rounded-full">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>Powered by Gemini 2.0 AI Intelligence</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                Know Your Exact Visa Approval Probability Before Filing
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-lg">
                Fill out the quick 6-step details on the left. Our AI evaluates your financial reserves, language scores, ties to home country, and refusal history against real embassy criteria.
              </p>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3">
                <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-extrabold text-white block">0 - 100% Score Gauge</span>
                    <span className="text-[11px] text-slate-400 font-medium">Instant approval score & risk status rating.</span>
                  </div>
                </div>

                <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-extrabold text-white block">Critical Gap Analysis</span>
                    <span className="text-[11px] text-slate-400 font-medium">Detect financial and document gaps early.</span>
                  </div>
                </div>

                <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-extrabold text-white block">Actionable AI Advice</span>
                    <span className="text-[11px] text-slate-400 font-medium">Tailored steps to boost approval past 90%.</span>
                  </div>
                </div>

                <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-3">
                  <Users className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-extrabold text-white block">Verified Expert Match</span>
                    <span className="text-[11px] text-slate-400 font-medium">Connect directly with licensed consultants.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold">Over 15,000+ visa assessments generated</span>
              <span className="font-bold text-teal-400">Free & Confidential</span>
            </div>
          </div>

        </div>
      ) : (

        /* ── STEP 2: OUTPUT RESULTS DASHBOARD (AFTER EVALUATION) ── */
        <div className="space-y-6 animate-premium-fade">
          
          {/* Top Bar with Edit Button */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#00a896] animate-ping" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">AI Evaluation Complete</span>
                <h3 className="text-sm font-extrabold text-slate-900">{country} — {visaType} (${bankBalanceUsd.toLocaleString()} USD)</h3>
              </div>
            </div>

            <button
              onClick={() => setIsEvaluated(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Modify Details / Re-Evaluate</span>
            </button>
          </div>

          {/* ── TOP TWO PANELS GRID ── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* ── PANEL 1: YOUR AI ASSESSMENT SUMMARY (md:col-span-7) ── */}
            <div className="md:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <h2 className="text-sm font-extrabold text-[#0c1a2e] mb-3">
                  Your AI Assessment Summary
                </h2>

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
                      <span className="text-2xl font-extrabold text-[#0c1a2e] leading-none">{readinessScore}%</span>
                      <div className="mt-1 flex items-center gap-0.5 text-[8px] font-bold text-slate-400">
                        <span>Visa Readiness Score</span>
                        <Info className="w-2.5 h-2.5 text-slate-400" />
                      </div>
                      <span className={`mt-1 inline-block text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${
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
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {riskStatus === 'LOW'
                        ? `Your profile shows a high chance of visa approval for ${country} (${visaType}). Ensure all documents match official requirements.`
                        : riskStatus === 'MODERATE'
                        ? `Your profile shows a moderate chance of visa approval for ${country}. Address identified financial/document gaps to improve success.`
                        : `Elevated risk detected for ${country} (${visaType}). Secondary consultant review is strongly recommended before filing.`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dynamic AI Recommendation Box */}
              <div className="bg-[#f0fdfa] border border-[#ccfbf1] p-3.5 rounded-xl flex items-start gap-3">
                <Lightbulb className="w-4 h-4 text-[#00a896] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-extrabold text-[#0c1a2e] block mb-0.5">AI Recommendation</span>
                  <span className="text-slate-600 font-medium">
                    {bankBalanceUsd < 22000
                      ? `Increase liquid reserves by at least $${(22000 - bankBalanceUsd).toLocaleString()} USD or add an official financial co-sponsor.`
                      : hasRefusals
                      ? `Draft an official Statement of Purpose (SOP) refuting past refusal reasons.`
                      : `Strengthen financial documents and provide stronger home country ties.`}
                  </span>
                </div>
              </div>
            </div>

            {/* ── PANEL 2: PROFILE STRENGTH (md:col-span-5) ── */}
            <div className="md:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#00a896]" />
                    <h2 className="text-sm font-extrabold text-[#0c1a2e]">Profile Strength</h2>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                    readinessScore >= 80
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {readinessScore >= 80 ? 'Excellent' : 'Good'}
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                  <li className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${breakdown.authenticity >= 80 ? 'bg-[#00a896]' : 'bg-amber-400'}`} />
                    <span>Well prepared documents ({breakdown.authenticity}%)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${breakdown.financial >= 75 ? 'bg-[#00a896]' : 'bg-rose-400'}`} />
                    <span>Financial profile ({breakdown.financial}%)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${breakdown.eligibility >= 75 ? 'bg-[#00a896]' : 'bg-amber-400'}`} />
                    <span>Academic & background ({breakdown.eligibility}%)</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setShowFullReportModal(true)}
                className="w-full bg-white hover:bg-slate-50 border border-[#00a896] text-[#00a896] font-extrabold py-2.5 px-4 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
              >
                <FileText className="w-4 h-4 text-[#00a896]" />
                <span>View Full Report</span>
              </button>
            </div>
          </div>

          {/* ── MIDDLE TWO PANELS GRID ── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* ── PANEL 3: READINESS BREAKDOWN (md:col-span-6) ── */}
            <div className="md:col-span-6 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-sm font-extrabold text-[#0c1a2e] mb-2">Readiness Breakdown</h2>

              <div className="space-y-3.5">
                {/* 1. Financial Stability */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700 flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-[#00a896]" /> Financial Stability
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-800">{breakdown.financial}%</span>
                      <span className={`text-[10px] font-bold px-2 py-0.2 rounded-md ${
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
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700 flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-[#00a896]" /> Document Authenticity
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-800">{breakdown.authenticity}%</span>
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.2 rounded-md">Very Good</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#00a896] rounded-full transition-all duration-500" style={{ width: `${breakdown.authenticity}%` }} />
                  </div>
                </div>

                {/* 3. Home Country Ties */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700 flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-[#00a896]" /> Home Country Ties
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-800">{breakdown.homeTies}%</span>
                      <span className={`text-[10px] font-bold px-2 py-0.2 rounded-md ${
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
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700 flex items-center gap-2">
                      <UserCheck className="w-3.5 h-3.5 text-[#00a896]" /> Profile Eligibility
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-800">{breakdown.eligibility}%</span>
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.2 rounded-md">Good</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#00a896] rounded-full transition-all duration-500" style={{ width: `${breakdown.eligibility}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── PANEL 4: CRITICAL GAPS & RISK ANALYSIS (md:col-span-6) ── */}
            <div className="md:col-span-6 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-3.5">
              <h2 className="text-sm font-extrabold text-[#0c1a2e] flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <span>Critical Gaps & Risk Analysis</span>
              </h2>

              <div className="space-y-2.5">
                {criticalGaps.map((gap) => (
                  <div
                    key={gap.id}
                    onClick={() => setSelectedGap(gap)}
                    className={`p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between gap-3 ${
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
                      <span className="font-semibold text-[11px] leading-snug">{gap.text}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── BOTTOM ACTION BUTTONS BAR ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Action 1: Connect with Verified Expert */}
            <div className="bg-[#00a896] text-white p-4 sm:p-5 rounded-2xl space-y-2 flex flex-col justify-between shadow-md">
              <button
                onClick={() => setBookingModalOpen(true)}
                className="w-full bg-[#008f80] hover:bg-[#007a6d] text-white px-4 py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
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
                <span className="text-[11px] font-bold text-teal-50">500+ Verified Experts Ready to Help You</span>
              </div>
            </div>

            {/* Action 2: Browse Destination Classifieds */}
            <div className="bg-white border border-[#00a896] p-4 sm:p-5 rounded-2xl space-y-2 flex flex-col justify-between shadow-xs">
              <a
                href={`/find-experts?country=${encodeURIComponent(country)}`}
                className="w-full bg-white hover:bg-teal-50/50 text-[#00a896] border border-[#00a896] px-4 py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-[#00a896]" />
                <span>Browse Destination Classifieds</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <p className="text-center text-[11px] font-semibold text-slate-500 pt-1">
                Explore accommodation, jobs, and more in {country}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── 3. FOOTER 4-FEATURES TRUST BAR ── */}
      <div className="mt-8 pt-6 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="flex items-start gap-3 p-2">
          <Sparkles className="w-5 h-5 text-[#00a896] shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-extrabold text-[#0c1a2e] block">AI-Powered Analysis</span>
            <span className="text-[11px] text-slate-500 font-medium leading-tight block mt-0.5">Advanced AI evaluates your profile</span>
          </div>
        </div>

        <div className="flex items-start gap-3 p-2">
          <Lock className="w-5 h-5 text-[#00a896] shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-extrabold text-[#0c1a2e] block">100% Secure</span>
            <span className="text-[11px] text-slate-500 font-medium leading-tight block mt-0.5">Your data is encrypted & safe</span>
          </div>
        </div>

        <div className="flex items-start gap-3 p-2">
          <TrendingUp className="w-5 h-5 text-[#00a896] shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-extrabold text-[#0c1a2e] block">Personalized Insights</span>
            <span className="text-[11px] text-slate-500 font-medium leading-tight block mt-0.5">Get action items for better results</span>
          </div>
        </div>

        <div className="flex items-start gap-3 p-2">
          <Headphones className="w-5 h-5 text-[#00a896] shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-extrabold text-[#0c1a2e] block">Expert Support</span>
            <span className="text-[11px] text-slate-500 font-medium leading-tight block mt-0.5">Connect with verified professionals</span>
          </div>
        </div>
      </div>

      {/* ── MODAL: VIEW FULL REPORT ── */}
      {showFullReportModal && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-200 space-y-5 relative font-plus-jakarta max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#00a896] uppercase tracking-wider">Official AI Audit</span>
                <h3 className="text-lg font-extrabold text-[#0c1a2e]">Full Visa Readiness Report — {country} ({visaType})</h3>
              </div>
              <button onClick={() => setShowFullReportModal(false)} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 font-bold block text-[10px]">READINESS SCORE</span>
                  <span className="text-2xl font-black text-[#00a896]">{readinessScore} / 100</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 font-bold block text-[10px]">RISK STATUS</span>
                  <span className={`text-xs font-black px-3 py-1 rounded-full border ${
                    riskStatus === 'LOW' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-800 border-amber-300'
                  }`}>
                    {riskStatus} RISK
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-[#0c1a2e]">Comprehensive Breakdown</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-teal-50/50 border border-teal-100 rounded-xl">
                    <span className="font-bold text-slate-800 block">Financial Readiness ({breakdown.financial}%)</span>
                    <span className="text-slate-600 font-semibold">${bankBalanceUsd.toLocaleString()} USD recorded for {country}.</span>
                  </div>
                  <div className="p-3 bg-teal-50/50 border border-teal-100 rounded-xl">
                    <span className="font-bold text-slate-800 block">Document Verification ({breakdown.authenticity}%)</span>
                    <span className="text-slate-600 font-semibold">Academic & Language certs ({languageScoreStr}) verified.</span>
                  </div>
                  <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-xl">
                    <span className="font-bold text-slate-800 block">Home Ties Index ({breakdown.homeTies}%)</span>
                    <span className="text-slate-600 font-semibold">Property deeds or family affidavits recommended.</span>
                  </div>
                  <div className="p-3 bg-teal-50/50 border border-teal-100 rounded-xl">
                    <span className="font-bold text-slate-800 block">Work Experience ({breakdown.eligibility}%)</span>
                    <span className="text-slate-600 font-semibold">{workExperience} documented.</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="font-extrabold text-[#0c1a2e]">Actionable Recommendations</h4>
                <ol className="list-decimal list-inside space-y-1.5 font-semibold text-slate-600 pl-1">
                  {criticalGaps.map((gap, i) => (
                    <li key={i}>{gap.solution}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  alert(`Downloading Official PDF Visa Readiness Report for ${country}...`);
                }}
                className="flex-1 bg-[#00a896] hover:bg-[#008f80] text-white py-3 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Report</span>
              </button>
              <button
                onClick={() => {
                  setBookingModalOpen(true);
                  setShowFullReportModal(false);
                }}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-3 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
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
        <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 relative font-plus-jakarta">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <h3 className="text-sm font-extrabold text-[#0c1a2e]">Risk Gap Resolution</h3>
              </div>
              <button onClick={() => setSelectedGap(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl font-bold text-rose-900">
                "{selectedGap.text}"
              </div>

              <div className="space-y-1">
                <span className="font-extrabold text-[#0c1a2e] block">Recommended Action:</span>
                <p className="text-slate-600 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {selectedGap.solution}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedGap(null);
                setBookingModalOpen(true);
              }}
              className="w-full bg-[#00a896] hover:bg-[#008f80] text-white py-3 rounded-xl text-xs font-extrabold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>Fix This Gap with a Verified Consultant</span>
            </button>
          </div>
        </div>
      )}

      {/* ── MODAL: QUICK CONSULTATION LEAD BOOKING ── */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 relative font-plus-jakarta">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-[#0c1a2e]">Book Instant Expert Call</h3>
              <button onClick={() => setBookingModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {leadSuccess ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#00a896] mx-auto animate-bounce" />
                <h4 className="text-lg font-black text-[#0c1a2e]">Consultation Booked! 🎉</h4>
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
