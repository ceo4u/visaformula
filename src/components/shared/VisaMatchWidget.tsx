import React, { useState, useEffect } from "react";
import { FileCheck2, Sparkles, X, ChevronRight, ChevronDown, Check } from "lucide-react";

const AGE_OPTIONS = [
  { value: "18-22", label: "18–22 years", icon: "🌱" },
  { value: "23-28", label: "23–28 years (Max Points)", icon: "⭐" },
  { value: "29-35", label: "29–35 years", icon: "🎯" },
  { value: "36-45", label: "36–45 years", icon: "💼" },
  { value: "46+", label: "46+ years", icon: "🏆" }
];

const EDUCATION_OPTIONS = [
  { value: "High School / 12th", label: "High School / 12th Grade", icon: "🏫" },
  { value: "Diploma / Certificate", label: "Diploma / 2-Year Certificate", icon: "📜" },
  { value: "Bachelor's Degree", label: "Bachelor's Degree (3–4 years)", icon: "🎓" },
  { value: "Master's Degree", label: "Master's / Post Graduate", icon: "🏛️" },
  { value: "PhD / Doctorate", label: "PhD / Doctorate", icon: "🔬" }
];

const EXPERIENCE_OPTIONS = [
  { value: "Fresher / 0 years", label: "Fresher (0 yrs)", icon: "🚀" },
  { value: "1-2 years", label: "1–2 years", icon: "💼" },
  { value: "3-5 years", label: "3–5 years", icon: "⭐" },
  { value: "6+ years", label: "6+ years", icon: "🏆" }
];

const ENGLISH_TEST_OPTIONS = [
  { value: "IELTS", label: "IELTS", icon: "🇬🇧" },
  { value: "PTE", label: "PTE Academic", icon: "🇦🇺" },
  { value: "TOEFL", label: "TOEFL", icon: "🇺🇸" },
  { value: "Not Given Yet", label: "Planning to give", icon: "📝" }
];

const BUDGET_OPTIONS = [
  { value: "Under ₹10 Lakhs", label: "Under ₹10 Lakhs", icon: "🪙" },
  { value: "₹10 - ₹20 Lakhs", label: "₹10 – ₹20 Lakhs", icon: "💵" },
  { value: "₹20 - ₹35 Lakhs", label: "₹20 – ₹35 Lakhs", icon: "💳" },
  { value: "₹35 Lakhs+", label: "₹35 Lakhs+", icon: "💰" },
  { value: "Need Educational Loan", label: "Need Educational Loan", icon: "🏦" }
];

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", country: "India", iso: "IN" },
  { code: "+1", flag: "🇺🇸", country: "USA / Canada", iso: "US" },
  { code: "+44", flag: "🇬🇧", country: "UK", iso: "GB" },
  { code: "+61", flag: "🇦🇺", country: "Australia", iso: "AU" },
  { code: "+971", flag: "🇦🇪", country: "UAE", iso: "AE" },
  { code: "+49", flag: "🇩🇪", country: "Germany", iso: "DE" },
  { code: "+65", flag: "🇸🇬", country: "Singapore", iso: "SG" },
  { code: "+64", flag: "🇳🇿", country: "New Zealand", iso: "NZ" },
  { code: "+880", flag: "🇧🇩", country: "Bangladesh", iso: "BD" },
  { code: "+977", flag: "🇳🇵", country: "Nepal", iso: "NP" },
  { code: "+94", flag: "🇱🇰", country: "Sri Lanka", iso: "LK" },
];

export function VisaMatchWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [targetCountry, setTargetCountry] = useState("");
  const [visaType, setVisaType] = useState("");

  // Evaluation criteria fields
  const [ageRange, setAgeRange] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [englishTest, setEnglishTest] = useState("");
  const [englishScore, setEnglishScore] = useState("");
  const [budget, setBudget] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countryDialCode, setCountryDialCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seekerAuthMode, setSeekerAuthMode] = useState<"register" | "login">("register");
  const [isSeekerLoggedIn, setIsSeekerLoggedIn] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");

  // Email OTP Verification States
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [readinessScore, setReadinessScore] = useState(85);

  useEffect(() => {
    let timer: any;
    if (otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Listen for custom trigger to open modal from anywhere on site
    const handleOpenTrigger = () => setOpen(true);
    window.addEventListener("open-visa-match-modal", handleOpenTrigger);

    try {
      const userStr = localStorage.getItem("visaformula_user") || localStorage.getItem("travltik_user");
      if (userStr) {
        const u = JSON.parse(userStr);
        if (u && (u.type === "seeker" || u.role === "seeker" || u.email)) {
          setIsSeekerLoggedIn(true);
          setIsEmailVerified(true);
          const seekerName = u.displayName || u.name || `${u.first_name || ''} ${u.last_name || ''}`.trim();
          if (seekerName) setFullName(seekerName);
          if (u.email) setEmail(u.email);
          if (u.phone) setPhone(u.phone);
        }
      }
    } catch (e) {}

    return () => window.removeEventListener("open-visa-match-modal", handleOpenTrigger);
  }, []);

  const handleSendOtp = async () => {
    setAuthError("");
    setAuthSuccess("");
    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setAuthError("Please enter a valid email address.");
      return;
    }

    setOtpSending(true);
    setOtpSent(true); // Show OTP input box immediately for smooth UX
    try {
      const res = await fetch("/api/auth/send-verification-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          mode: seekerAuthMode,
          allowExisting: true
        })
      });
      const data = await res.json();
      if (res.ok && data.status === "success") {
        setOtpCountdown(60);
        setAuthSuccess(`Verification code sent to ${cleanEmail}! Please check your inbox.`);
      } else {
        setAuthError(data.message || "Failed to send verification code. Please try again.");
      }
    } catch (e: any) {
      setAuthError("Network error while sending verification code.");
    } finally {
      setOtpSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    setAuthError("");
    setAuthSuccess("");
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !otp || otp.trim().length < 6) {
      setAuthError("Please enter the 6-digit verification code sent to your email.");
      return;
    }

    setOtpVerifying(true);
    try {
      const res = await fetch("/api/auth/verify-email-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          otp: otp.trim()
        })
      });
      const data = await res.json();
      if (res.ok && data.status === "success") {
        setIsEmailVerified(true);
        setAuthSuccess("Email verified and logged in successfully! ✅");

        const seekerUser = data.user || {
          uid: `seeker_${Date.now()}`,
          email: cleanEmail,
          displayName: fullName || cleanEmail.split("@")[0],
          name: fullName || cleanEmail.split("@")[0],
          phone: phone || '',
          type: "seeker",
          role: "seeker",
          isEmailVerified: true
        };

        setIsSeekerLoggedIn(true);
        if (seekerUser.displayName || seekerUser.name) setFullName(seekerUser.displayName || seekerUser.name);
        if (seekerUser.phone) setPhone(seekerUser.phone);

        if (typeof window !== "undefined") {
          localStorage.setItem("visaformula_user", JSON.stringify(seekerUser));
          localStorage.setItem("travltik_user", JSON.stringify(seekerUser));
          localStorage.setItem("isLoggedIn", "true");
          window.dispatchEvent(new Event('auth-state-change'));
        }
      } else {
        setAuthError(data.message || "Invalid or expired verification code.");
      }
    } catch (e: any) {
      setAuthError("Network error while verifying code.");
    } finally {
      setOtpVerifying(false);
    }
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (!email) {
      setAuthError("Email address is required.");
      return;
    }

    if (!isSeekerLoggedIn && !isEmailVerified) {
      setAuthError("Please verify your email with the 6-digit OTP code before proceeding.");
      return;
    }

    if (seekerAuthMode === "register" && !fullName) {
      setAuthError("Full name is required.");
      return;
    }

    setLoading(true);
    const fullPhone = phone ? (phone.startsWith("+") ? phone : `${countryDialCode} ${phone}`) : "";
    const cleanEmail = email.trim().toLowerCase();

    try {
      if (!isSeekerLoggedIn) {
        const seekerUser = {
          uid: `seeker_${Date.now()}`,
          email: cleanEmail,
          displayName: fullName || cleanEmail.split("@")[0],
          name: fullName || cleanEmail.split("@")[0],
          phone: fullPhone,
          type: "seeker",
          role: "seeker",
          isEmailVerified: true
        };

        if (password) {
          try {
            await fetch("/api/auth/signup", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: cleanEmail,
                password,
                role: "seeker"
              })
            });
          } catch (e) {}
        }

        if (typeof window !== "undefined") {
          localStorage.setItem("visaformula_user", JSON.stringify(seekerUser));
          localStorage.setItem("travltik_user", JSON.stringify(seekerUser));
          localStorage.setItem("isLoggedIn", "true");
        }
        setIsSeekerLoggedIn(true);
      }

      const evalRes = await fetch("/api/evaluations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName || cleanEmail.split("@")[0],
          email: cleanEmail,
          phone: fullPhone || "N/A",
          destinationCountry: targetCountry || "Canada",
          visaType: visaType || "General Consultation",
          ageRange: ageRange || "26-32",
          educationLevel: educationLevel || "Bachelor's Degree",
          workExperience: workExperience || "3-5 years",
          englishTest: englishTest || "IELTS",
          englishScore: englishScore || "7.0",
          budget: budget || "Flexible"
        })
      });

      const evalData = await evalRes.json();
      if (evalData.readinessScore) {
        setReadinessScore(evalData.readinessScore);
      }

      if (typeof window !== "undefined") {
        try {
          const existingLeads = JSON.parse(localStorage.getItem("expert_leads") || "[]");
          const newLead = {
            id: Date.now(),
            name: fullName || cleanEmail.split("@")[0],
            visa: `${targetCountry || 'Canada'} - ${visaType || 'Consultation'}`,
            country: targetCountry || 'Canada',
            phone: fullPhone,
            email: cleanEmail,
            time: "Just now",
            badge: "Evaluation Lead",
            budget: budget || "Flexible",
            details: `Education: ${educationLevel} | Exp: ${workExperience} | English: ${englishTest} (${englishScore})`
          };
          localStorage.setItem("expert_leads", JSON.stringify([newLead, ...existingLeads]));
        } catch (e) {}
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("[Quick Evaluation Lead] Submission error:", err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const resetModal = () => {
    setOpen(false);
    setSubmitted(false);
    setStep(1);
    setAuthError("");
    setAuthSuccess("");
  };

  return (
    <>
      {/* ── FLOATING VISA ICON BUTTON ON LEFT SIDE (Sleek Black) ── */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Visa"
        className="fixed bottom-[88px] md:bottom-6 left-3.5 md:left-6 z-50 inline-flex items-center justify-center gap-2 md:gap-2.5 px-3.5 py-2 md:px-5 md:py-3 rounded-2xl md:rounded-[20px] bg-slate-900 hover:bg-black text-white shadow-[0_10px_25px_-4px_rgba(0,0,0,0.5),0_4px_10px_-2px_rgba(0,0,0,0.2),inset_0_1.5px_0_rgba(255,255,255,0.25)] hover:shadow-[0_14px_30px_-4px_rgba(0,0,0,0.65),0_6px_12px_-2px_rgba(0,0,0,0.25),inset_0_2px_0_rgba(255,255,255,0.4)] hover:-translate-y-0.5 transition-all duration-200 active:scale-95 active:translate-y-0 border border-white/20 cursor-pointer group font-sans shrink-0 select-none backdrop-blur-sm"
      >
        <span className="relative flex items-center justify-center shrink-0 w-4 h-4 md:w-5 md:h-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
          <FileCheck2 className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:scale-110 transition-transform stroke-[2.4]" />
          <span className="absolute -top-1 -right-1 w-2 h-2 md:w-2.5 md:h-2.5 bg-emerald-400 rounded-full border-2 border-black shadow-sm animate-pulse" />
        </span>
        <span className="text-xs md:text-[15px] font-extrabold text-white tracking-wide leading-none whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
          Visa
        </span>
      </button>

      {/* ── 4-STEP VISA EVALUATION & MATCHER MODAL ── */}
      {open && (
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn font-sans"
          onClick={resetModal}
        >
          <div 
            className="relative w-full max-w-md bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_30px_90px_-15px_rgba(0,0,0,0.4)] border border-slate-100 font-sans text-center overflow-hidden max-h-[90vh] overflow-y-auto" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={resetModal}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors cursor-pointer text-sm font-bold z-10"
            >
              ✕
            </button>

            {!submitted ? (
              <>
                {/* Step Indicator Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-[#00a896] text-[11px] font-black tracking-wide uppercase mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00a896] animate-pulse"></span>
                  Step {step} of 4 • Quick Evaluation
                </div>

                {/* Progress Line */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-6">
                  <div 
                    className="bg-[#00a896] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${(step / 4) * 100}%` }}
                  ></div>
                </div>

                {/* STEP 1: Country Selection */}
                {step === 1 && (
                  <div className="space-y-5 animate-fadeIn">
                    <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-2xl mx-auto shadow-sm border border-teal-100/60">
                      ✈️
                    </div>

                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-1">
                        Where do you want to travel?
                      </h3>
                      <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
                        Select your target destination country to get matched with certified visa experts.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      {[
                        { name: "Canada", flag: "🇨🇦" },
                        { name: "USA", flag: "🇺🇸" },
                        { name: "UK", flag: "🇬🇧" },
                        { name: "Australia", flag: "🇦🇺" },
                        { name: "Germany", flag: "🇩🇪" },
                        { name: "Schengen", flag: "🇪🇺" }
                      ].map(c => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => {
                            setTargetCountry(c.name);
                            setStep(2);
                          }}
                          className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer hover:scale-[1.02] ${
                            targetCountry === c.name 
                              ? "border-[#00a896] bg-teal-50/70 font-extrabold text-slate-900 shadow-sm ring-1 ring-[#00a896]" 
                              : "border-slate-200 hover:border-[#00a896]/50 bg-slate-50/50 text-slate-700"
                          }`}
                        >
                          <span className="text-2xl">{c.flag}</span>
                          <span className="text-xs font-extrabold text-slate-800">{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: Visa Purpose */}
                {step === 2 && (
                  <div className="space-y-5 animate-fadeIn">
                    <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-2xl mx-auto shadow-sm border border-teal-100/60">
                      🎯
                    </div>

                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-1">
                        Select Visa Category
                      </h3>
                      <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
                        Destination: <strong className="text-[#00a896]">{targetCountry || "Canada"}</strong>
                      </p>
                    </div>

                    <div className="space-y-2 pt-1 text-left">
                      {[
                        { title: "Study Visa", sub: "University & College admissions", icon: "🎓" },
                        { title: "Work Permit", sub: "Employment sponsorship & LMIA", icon: "💼" },
                        { title: "Tourist / Visitor", sub: "Holiday, family visits & business trips", icon: "🏖️" },
                        { title: "Permanent Residency (PR)", sub: "Express Entry & PNP programs", icon: "🍁" },
                        { title: "Business / Investor", sub: "Startups & global trade migration", icon: "🏢" }
                      ].map(v => (
                        <button
                          key={v.title}
                          type="button"
                          onClick={() => {
                            setVisaType(v.title);
                            setStep(3);
                          }}
                          className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer hover:scale-[1.01] ${
                            visaType === v.title 
                              ? "border-[#00a896] bg-teal-50/70 shadow-sm ring-1 ring-[#00a896]" 
                              : "border-slate-200 hover:border-[#00a896]/50 bg-slate-50/50"
                          }`}
                        >
                          <span className="text-xl p-2 bg-white rounded-xl shadow-xs">{v.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-extrabold text-slate-900">{v.title}</p>
                            <p className="text-[11px] text-slate-500 truncate font-medium">{v.sub}</p>
                          </div>
                          <span className="text-slate-400 font-bold text-xs">→</span>
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                    >
                      ← Back to Country Selection
                    </button>
                  </div>
                )}

                {/* STEP 3: Evaluation Criteria & Qualifications */}
                {step === 3 && (
                  <div className="space-y-4 animate-fadeIn text-left">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-xl mx-auto shadow-sm border border-teal-100/60 mb-2">
                        📊
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                        Your Profile Qualifications
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Target: <span className="font-extrabold text-[#00a896]">{targetCountry || "Canada"} ({visaType || "Visa"})</span>
                      </p>
                    </div>

                    <div className="space-y-3 text-xs">
                      {/* 1. Custom Age Group Dropdown */}
                      <div className="relative">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Your Age Group</label>
                        <div
                          onClick={() => setOpenDropdown(openDropdown === 'age' ? null : 'age')}
                          className="bg-slate-50/90 hover:bg-slate-50 border border-slate-200/90 hover:border-[#00A86B]/60 rounded-2xl h-[48px] px-3.5 flex items-center justify-between shadow-2xs transition-all cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <span className="text-base shrink-0">{AGE_OPTIONS.find(o => o.value === ageRange)?.icon || '🎂'}</span>
                            <span className={`text-xs font-bold truncate ${ageRange ? 'text-slate-900' : 'text-slate-400'}`}>
                              {AGE_OPTIONS.find(o => o.value === ageRange)?.label || 'Select Age Range'}
                            </span>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${openDropdown === 'age' ? 'rotate-180 text-[#00A86B]' : ''}`} />
                        </div>

                        {openDropdown === 'age' && (
                          <div
                            className="absolute top-[calc(100%+6px)] left-0 w-full z-[9999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 space-y-0.5 animate-fadeIn max-h-52 overflow-y-auto no-scrollbar ring-1 ring-black/5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {AGE_OPTIONS.map((opt) => {
                              const isSelected = ageRange === opt.value;
                              return (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => {
                                    setAgeRange(opt.value);
                                    setOpenDropdown(null);
                                  }}
                                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-colors cursor-pointer ${
                                    isSelected ? 'bg-emerald-50 text-[#00A86B]' : 'text-slate-700 hover:bg-slate-50'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <span className="text-base">{opt.icon}</span>
                                    <span className="truncate">{opt.label}</span>
                                  </div>
                                  {isSelected && <Check className="w-4 h-4 text-[#00A86B] shrink-0" />}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* 2. Custom Highest Education Completed Dropdown */}
                      <div className="relative">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Highest Education Completed</label>
                        <div
                          onClick={() => setOpenDropdown(openDropdown === 'education' ? null : 'education')}
                          className="bg-slate-50/90 hover:bg-slate-50 border border-slate-200/90 hover:border-[#00A86B]/60 rounded-2xl h-[48px] px-3.5 flex items-center justify-between shadow-2xs transition-all cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <span className="text-base shrink-0">{EDUCATION_OPTIONS.find(o => o.value === educationLevel)?.icon || '🎓'}</span>
                            <span className={`text-xs font-bold truncate ${educationLevel ? 'text-slate-900' : 'text-slate-400'}`}>
                              {EDUCATION_OPTIONS.find(o => o.value === educationLevel)?.label || 'Select Education Level'}
                            </span>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${openDropdown === 'education' ? 'rotate-180 text-[#00A86B]' : ''}`} />
                        </div>

                        {openDropdown === 'education' && (
                          <div
                            className="absolute top-[calc(100%+6px)] left-0 w-full z-[9999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 space-y-0.5 animate-fadeIn max-h-52 overflow-y-auto no-scrollbar ring-1 ring-black/5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {EDUCATION_OPTIONS.map((opt) => {
                              const isSelected = educationLevel === opt.value;
                              return (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => {
                                    setEducationLevel(opt.value);
                                    setOpenDropdown(null);
                                  }}
                                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-colors cursor-pointer ${
                                    isSelected ? 'bg-emerald-50 text-[#00A86B]' : 'text-slate-700 hover:bg-slate-50'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <span className="text-base">{opt.icon}</span>
                                    <span className="truncate">{opt.label}</span>
                                  </div>
                                  {isSelected && <Check className="w-4 h-4 text-[#00A86B] shrink-0" />}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* 3 & 4. Work Experience and English Test (2 Columns) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Work Experience */}
                        <div className="relative">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Work Experience</label>
                          <div
                            onClick={() => setOpenDropdown(openDropdown === 'experience' ? null : 'experience')}
                            className="bg-slate-50/90 hover:bg-slate-50 border border-slate-200/90 hover:border-[#00A86B]/60 rounded-2xl h-[48px] px-3 flex items-center justify-between shadow-2xs transition-all cursor-pointer select-none"
                          >
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <span className="text-base shrink-0">{EXPERIENCE_OPTIONS.find(o => o.value === workExperience)?.icon || '💼'}</span>
                              <span className={`text-xs font-bold truncate ${workExperience ? 'text-slate-900' : 'text-slate-400'}`}>
                                {EXPERIENCE_OPTIONS.find(o => o.value === workExperience)?.label || 'Select Exp'}
                              </span>
                            </div>
                            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${openDropdown === 'experience' ? 'rotate-180 text-[#00A86B]' : ''}`} />
                          </div>

                          {openDropdown === 'experience' && (
                            <div
                              className="absolute top-[calc(100%+6px)] left-0 w-full z-[9999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 space-y-0.5 animate-fadeIn max-h-52 overflow-y-auto no-scrollbar ring-1 ring-black/5"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {EXPERIENCE_OPTIONS.map((opt) => {
                                const isSelected = workExperience === opt.value;
                                return (
                                  <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => {
                                      setWorkExperience(opt.value);
                                      setOpenDropdown(null);
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-left transition-colors cursor-pointer ${
                                      isSelected ? 'bg-emerald-50 text-[#00A86B]' : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 min-w-0">
                                      <span className="text-base">{opt.icon}</span>
                                      <span className="truncate">{opt.label}</span>
                                    </div>
                                    {isSelected && <Check className="w-3.5 h-3.5 text-[#00A86B] shrink-0" />}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* English Test */}
                        <div className="relative">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">English Test</label>
                          <div
                            onClick={() => setOpenDropdown(openDropdown === 'english' ? null : 'english')}
                            className="bg-slate-50/90 hover:bg-slate-50 border border-slate-200/90 hover:border-[#00A86B]/60 rounded-2xl h-[48px] px-3 flex items-center justify-between shadow-2xs transition-all cursor-pointer select-none"
                          >
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <span className="text-base shrink-0">{ENGLISH_TEST_OPTIONS.find(o => o.value === englishTest)?.icon || '🗣️'}</span>
                              <span className={`text-xs font-bold truncate ${englishTest ? 'text-slate-900' : 'text-slate-400'}`}>
                                {ENGLISH_TEST_OPTIONS.find(o => o.value === englishTest)?.label || 'Select Test'}
                              </span>
                            </div>
                            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${openDropdown === 'english' ? 'rotate-180 text-[#00A86B]' : ''}`} />
                          </div>

                          {openDropdown === 'english' && (
                            <div
                              className="absolute top-[calc(100%+6px)] left-0 w-full z-[9999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 space-y-0.5 animate-fadeIn max-h-52 overflow-y-auto no-scrollbar ring-1 ring-black/5"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {ENGLISH_TEST_OPTIONS.map((opt) => {
                                const isSelected = englishTest === opt.value;
                                return (
                                  <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => {
                                      setEnglishTest(opt.value);
                                      setOpenDropdown(null);
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-left transition-colors cursor-pointer ${
                                      isSelected ? 'bg-emerald-50 text-[#00A86B]' : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 min-w-0">
                                      <span className="text-base">{opt.icon}</span>
                                      <span className="truncate">{opt.label}</span>
                                    </div>
                                    {isSelected && <Check className="w-3.5 h-3.5 text-[#00A86B] shrink-0" />}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 5. Custom Estimated Budget Dropdown */}
                      <div className="relative">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Estimated Budget (Tuition + Fund + Fee)</label>
                        <div
                          onClick={() => setOpenDropdown(openDropdown === 'budget' ? null : 'budget')}
                          className="bg-slate-50/90 hover:bg-slate-50 border border-slate-200/90 hover:border-[#00A86B]/60 rounded-2xl h-[48px] px-3.5 flex items-center justify-between shadow-2xs transition-all cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <span className="text-base shrink-0">{BUDGET_OPTIONS.find(o => o.value === budget)?.icon || '💰'}</span>
                            <span className={`text-xs font-bold truncate ${budget ? 'text-slate-900' : 'text-slate-400'}`}>
                              {BUDGET_OPTIONS.find(o => o.value === budget)?.label || 'Select Budget Range'}
                            </span>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${openDropdown === 'budget' ? 'rotate-180 text-[#00A86B]' : ''}`} />
                        </div>

                        {openDropdown === 'budget' && (
                          <div
                            className="absolute top-[calc(100%+6px)] left-0 w-full z-[9999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 space-y-0.5 animate-fadeIn max-h-52 overflow-y-auto no-scrollbar ring-1 ring-black/5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {BUDGET_OPTIONS.map((opt) => {
                              const isSelected = budget === opt.value;
                              return (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => {
                                    setBudget(opt.value);
                                    setOpenDropdown(null);
                                  }}
                                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-colors cursor-pointer ${
                                    isSelected ? 'bg-emerald-50 text-[#00A86B]' : 'text-slate-700 hover:bg-slate-50'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <span className="text-base">{opt.icon}</span>
                                    <span className="truncate">{opt.label}</span>
                                  </div>
                                  {isSelected && <Check className="w-4 h-4 text-[#00A86B] shrink-0" />}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => { setOpenDropdown(null); setStep(2); }}
                        className="w-1/3 py-3 rounded-2xl border border-slate-200 text-xs font-extrabold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={() => { setOpenDropdown(null); setStep(4); }}
                        className="w-2/3 py-3 rounded-2xl bg-[#00A86B] hover:bg-[#008f5a] text-white text-xs font-extrabold shadow-md shadow-[#00A86B]/25 hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>Continue to Match</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: Contact Info & Seeker Authentication */}
                {step === 4 && (
                  <form onSubmit={handleSubmitLead} className="space-y-3.5 animate-fadeIn text-left">
                    <div className="text-center">
                      <div className="w-11 h-11 bg-teal-50 rounded-2xl flex items-center justify-center text-xl mx-auto shadow-sm border border-teal-100/60 mb-1.5">
                        ✨
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                        {isSeekerLoggedIn ? "Confirm Details for Instant Match" : "Seeker Sign Up / Login Required"}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Target: <span className="font-extrabold text-[#00a896]">{targetCountry || "Canada"} ({visaType || "Visa"})</span>
                      </p>
                    </div>

                    {isSeekerLoggedIn ? (
                      <div className="p-3 bg-teal-50 border border-teal-200/80 rounded-2xl text-teal-900 text-xs font-bold flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-base">👤</span>
                          <span>Seeker Account: <strong>{fullName || email}</strong></span>
                        </div>
                        <span className="text-[10px] bg-[#00a896] text-white px-2 py-0.5 rounded-full font-extrabold">Active</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex bg-slate-100 p-1 rounded-xl gap-1 text-xs font-extrabold">
                          <button
                            type="button"
                            onClick={() => { setSeekerAuthMode("register"); setAuthError(""); }}
                            className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                              seekerAuthMode === "register" 
                                ? "bg-white text-slate-900 shadow-sm" 
                                : "text-slate-500 hover:text-slate-800"
                            }`}
                          >
                            ✨ Sign Up as Seeker
                          </button>
                          <button
                            type="button"
                            onClick={() => { setSeekerAuthMode("login"); setAuthError(""); }}
                            className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                              seekerAuthMode === "login" 
                                ? "bg-white text-slate-900 shadow-sm" 
                                : "text-slate-500 hover:text-slate-800"
                            }`}
                          >
                            🔑 Seeker Login
                          </button>
                        </div>
                      </div>
                    )}

                    {authError && (
                      <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold text-center">
                        {authError}
                      </div>
                    )}

                    <div className="space-y-2.5 text-left text-xs">
                      {(isSeekerLoggedIn || seekerAuthMode === "register") && (
                        <div>
                          <label className="text-[10px] font-bold text-slate-700 block mb-1">Your Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:border-[#00a896] focus:bg-white transition-all"
                          />
                        </div>
                      )}

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[10px] font-bold text-slate-700 block">Email Address *</label>
                          {isEmailVerified ? (
                            <span className="text-[10px] font-extrabold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              ✓ Verified
                            </span>
                          ) : null}
                        </div>
                        
                        <div className="flex gap-1.5">
                          <input
                            type="email"
                            required
                            disabled={isEmailVerified}
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setIsEmailVerified(false); setOtpSent(false); }}
                            className={`flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:border-[#00a896] focus:bg-white transition-all ${
                              isEmailVerified ? "bg-emerald-50/50 border-emerald-200 text-emerald-900 cursor-not-allowed" : ""
                            }`}
                          />
                          {!isSeekerLoggedIn && !isEmailVerified && (
                            <button
                              type="button"
                              onClick={handleSendOtp}
                              disabled={otpSending || otpCountdown > 0 || !email}
                              className="px-3.5 py-2.5 bg-[#481268] hover:bg-[#390d54] disabled:bg-slate-200 disabled:text-slate-400 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer shrink-0 shadow-sm"
                            >
                              {otpSending ? "Sending..." : (otpCountdown > 0 ? `Resend (${otpCountdown}s)` : (otpSent ? "Resend OTP" : "Send OTP"))}
                            </button>
                          )}
                        </div>
                      </div>

                      {!isSeekerLoggedIn && !isEmailVerified && (otpSent || email.length > 5) && (
                        <div className="p-3 bg-purple-50/80 border border-purple-200 rounded-2xl space-y-2 animate-fadeIn">
                          <div className="flex items-center justify-between">
                            <label className="text-[10px] font-extrabold text-purple-900">
                              Enter 6-Digit Email Code *
                            </label>
                            <span className="text-[10px] text-purple-700 font-medium">Check Inbox / Spam</span>
                          </div>
                          <div className="flex gap-1.5">
                            <input
                              type="text"
                              maxLength={6}
                              placeholder="123456"
                              value={otp}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                setOtp(val);
                                if (val.length === 6) {
                                  // Auto trigger verification when 6 digits are typed
                                  setTimeout(() => {
                                    handleVerifyOtp();
                                  }, 100);
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleVerifyOtp();
                                }
                              }}
                              className="w-full px-3.5 py-2.5 bg-white border border-purple-200 rounded-xl text-center text-sm font-mono font-bold tracking-widest text-slate-900 focus:outline-none focus:border-[#481268] focus:ring-1 focus:ring-[#481268]/20"
                            />
                            <button
                              type="button"
                              onClick={handleVerifyOtp}
                              disabled={otpVerifying || otp.length < 6}
                              className="px-4 py-2.5 bg-[#00A86B] hover:bg-[#008f5a] disabled:bg-slate-200 disabled:text-slate-400 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer shrink-0 shadow-sm"
                            >
                              {otpVerifying ? "Verifying..." : (seekerAuthMode === "login" ? "Verify & Login 🚀" : "Verify Code ✓")}
                            </button>
                          </div>
                        </div>
                      )}

                      {authSuccess && (
                        <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-[11px] font-bold text-center animate-fadeIn">
                          {authSuccess}
                        </div>
                      )}

                      {(isSeekerLoggedIn || seekerAuthMode === "register") && (
                        <div>
                          <label className="text-[10px] font-bold text-slate-700 block mb-1">Mobile / WhatsApp Number *</label>
                          <div className="relative">
                            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-[#00a896] focus-within:bg-white transition-all">
                              <button
                                type="button"
                                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-100/90 hover:bg-slate-200/80 text-slate-800 font-extrabold text-xs border-r border-slate-200 transition-colors cursor-pointer shrink-0"
                              >
                                <span className="text-base">{selectedCountry.flag}</span>
                                <span>{selectedCountry.code}</span>
                                <span className="text-[9px] text-slate-500 font-extrabold">▼</span>
                              </button>
                              <input
                                type="tel"
                                required
                                placeholder="98765 43210"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-3 py-2.5 bg-transparent text-xs text-slate-900 font-bold focus:outline-none placeholder:text-slate-400"
                              />
                            </div>

                            {showCountryDropdown && (
                              <div className="absolute left-0 bottom-full mb-1.5 z-50 w-60 max-h-52 overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-2xl p-1.5 space-y-0.5 animate-fadeIn text-left">
                                {COUNTRY_CODES.map((c, idx) => (
                                  <button
                                    key={`${c.iso}-${idx}`}
                                    type="button"
                                    onClick={() => {
                                      setSelectedCountry(c);
                                      setCountryDialCode(c.code);
                                      setShowCountryDropdown(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                      selectedCountry.iso === c.iso && selectedCountry.code === c.code
                                        ? "bg-teal-50 text-[#00a896] font-extrabold"
                                        : "hover:bg-slate-50 text-slate-700"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="text-base">{c.flag}</span>
                                      <span className="text-xs">{c.country}</span>
                                    </div>
                                    <span className="text-slate-400 text-[10px] font-mono">{c.code}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 pt-2">
                      <button
                        type="submit"
                        disabled={loading || (!isSeekerLoggedIn && !isEmailVerified)}
                        className="w-full bg-[#00A86B] hover:bg-[#008f5a] disabled:bg-slate-200 disabled:text-slate-400 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-lg shadow-[#00A86B]/25 hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <span>Processing & Calculating Score...</span>
                        ) : (
                          <>
                            <span>
                              {isSeekerLoggedIn || isEmailVerified
                                ? "Calculate Probability & Match Experts"
                                : "Verify Email with OTP to Continue"}
                            </span>
                            <span className="text-sm">🚀</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="w-full py-1 text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors cursor-pointer text-center"
                      >
                        ← Back to Qualifications
                      </button>
                    </div>
                  </form>
                )}
              </>
            ) : (
              <div className="py-4 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-[#00A86B] flex items-center justify-center mx-auto text-2xl font-black shadow-inner">
                  {readinessScore}%
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">High Visa Approval Match! 🎉</h3>
                  <p className="text-xs text-slate-600 font-medium mt-1 max-w-xs mx-auto">
                    Based on your profile, you have an estimated <strong>{readinessScore}%</strong> readiness score for {targetCountry} {visaType}.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left space-y-2 text-xs">
                  <p className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <span>⚡ Matched Expert Advisors Ready</span>
                  </p>
                  <ul className="space-y-1.5 text-slate-600 text-[11px] font-medium">
                    <li className="flex items-center gap-1.5">
                      <span className="text-[#00A86B] font-bold">✓</span>
                      <span>Verified Immigration Lawyers with active embassy licenses</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-[#00A86B] font-bold">✓</span>
                      <span>100% Escrow Milestone Payment Protection</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 pt-2">
                  <a
                    href={`/find-experts?country=${encodeURIComponent(targetCountry || "Canada")}`}
                    className="block w-full bg-[#00A86B] hover:bg-[#008f5a] text-white font-extrabold text-xs py-3.5 rounded-xl shadow-lg transition-all text-center cursor-pointer"
                  >
                    View Top Matched Consultants Now →
                  </a>
                  <button
                    type="button"
                    onClick={resetModal}
                    className="w-full py-1 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
