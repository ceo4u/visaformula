import React, { useState, useEffect } from "react";

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
        setOtpSent(true);
        setOtpCountdown(60);
        setAuthSuccess(`Verification code sent to ${cleanEmail}! Please check inbox.`);
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
        setAuthSuccess("Email verified successfully! ✅");

        if (data.user) {
          setIsSeekerLoggedIn(true);
          if (data.user.displayName || data.user.name) setFullName(data.user.displayName || data.user.name);
          if (data.user.phone) setPhone(data.user.phone);
          if (typeof window !== "undefined") {
            localStorage.setItem("visaformula_user", JSON.stringify(data.user));
            localStorage.setItem("travltik_user", JSON.stringify(data.user));
            localStorage.setItem("isLoggedIn", "true");
          }
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
      {/* ── FLOATING VISA ICON BUTTON ON LEFT SIDE ── */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Visa Readiness Score & Match"
        className="fixed bottom-[84px] sm:bottom-6 left-4 sm:left-6 z-50 flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-[#00a896] hover:bg-[#008f80] text-white shadow-xl hover:shadow-2xl transition-all active:scale-95 border border-teal-300/40 cursor-pointer group font-sans"
      >
        <span className="relative flex items-center justify-center text-lg sm:text-xl shrink-0">
          🛂
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-[#00a896] animate-pulse" />
        </span>
        <span className="text-xs font-black tracking-tight whitespace-nowrap">
          Visa Score & Match
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

                    <div className="space-y-2.5 text-xs">
                      <div>
                        <label className="text-[10px] font-bold text-slate-700 block mb-1">Your Age Group</label>
                        <select
                          value={ageRange}
                          onChange={(e) => setAgeRange(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:border-[#00a896]"
                        >
                          <option value="">Select Age Range</option>
                          <option value="18-22">18–22 years</option>
                          <option value="23-28">23–28 years (Max points)</option>
                          <option value="29-35">29–35 years</option>
                          <option value="36-45">36–45 years</option>
                          <option value="46+">46+ years</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-700 block mb-1">Highest Education Completed</label>
                        <select
                          value={educationLevel}
                          onChange={(e) => setEducationLevel(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:border-[#00a896]"
                        >
                          <option value="">Select Education Level</option>
                          <option value="High School / 12th">High School / 12th Grade</option>
                          <option value="Diploma / Certificate">Diploma / 2-Year Certificate</option>
                          <option value="Bachelor's Degree">Bachelor's Degree (3–4 years)</option>
                          <option value="Master's Degree">Master's / Post Graduate</option>
                          <option value="PhD / Doctorate">PhD / Doctorate</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-700 block mb-1">Work Experience</label>
                          <select
                            value={workExperience}
                            onChange={(e) => setWorkExperience(e.target.value)}
                            className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:border-[#00a896]"
                          >
                            <option value="">Select Exp</option>
                            <option value="Fresher / 0 years">Fresher (0 yrs)</option>
                            <option value="1-2 years">1–2 years</option>
                            <option value="3-5 years">3–5 years</option>
                            <option value="6+ years">6+ years</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-700 block mb-1">English Test</label>
                          <select
                            value={englishTest}
                            onChange={(e) => setEnglishTest(e.target.value)}
                            className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:border-[#00a896]"
                          >
                            <option value="">Select Test</option>
                            <option value="IELTS">IELTS</option>
                            <option value="PTE">PTE Academic</option>
                            <option value="TOEFL">TOEFL</option>
                            <option value="Not Given Yet">Planning to give</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-700 block mb-1">Estimated Budget (Tuition + Fund + Fee)</label>
                        <select
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:border-[#00a896]"
                        >
                          <option value="">Select Budget Range</option>
                          <option value="Under ₹10 Lakhs">Under ₹10 Lakhs</option>
                          <option value="₹10 - ₹20 Lakhs">₹10 – ₹20 Lakhs</option>
                          <option value="₹20 - ₹35 Lakhs">₹20 – ₹35 Lakhs</option>
                          <option value="₹35 Lakhs+">₹35 Lakhs+</option>
                          <option value="Need Educational Loan">Need Educational Loan</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="w-1/3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(4)}
                        className="w-2/3 py-2.5 rounded-xl bg-[#00a896] hover:bg-[#008f80] text-white text-xs font-extrabold shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
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
                            placeholder="e.g. Prashant Sharma"
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
                            placeholder="e.g. prashant@example.com"
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

                      {!isSeekerLoggedIn && !isEmailVerified && otpSent && (
                        <div className="p-3 bg-purple-50/60 border border-purple-200 rounded-2xl space-y-2 animate-fadeIn">
                          <div className="flex items-center justify-between">
                            <label className="text-[10px] font-extrabold text-purple-900">
                              Enter 6-Digit Email Code *
                            </label>
                            <span className="text-[10px] text-purple-700 font-medium">Check Inbox/Spam</span>
                          </div>
                          <div className="flex gap-1.5">
                            <input
                              type="text"
                              maxLength={6}
                              placeholder="123456"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                              className="w-full px-3.5 py-2 bg-white border border-purple-200 rounded-xl text-center text-sm font-mono font-bold tracking-widest text-slate-900 focus:outline-none focus:border-[#481268]"
                            />
                            <button
                              type="button"
                              onClick={handleVerifyOtp}
                              disabled={otpVerifying || otp.length < 6}
                              className="px-4 py-2 bg-[#00a896] hover:bg-[#008f80] disabled:bg-slate-200 disabled:text-slate-400 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer shrink-0 shadow-sm"
                            >
                              {otpVerifying ? "Checking..." : "Verify Code"}
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
                        className="w-full bg-[#00a896] hover:bg-[#008f80] disabled:bg-slate-200 disabled:text-slate-400 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-lg shadow-[#00a896]/25 hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
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
                <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-200 text-[#00a896] flex items-center justify-center mx-auto text-2xl font-black shadow-inner">
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
                      <span className="text-teal-600 font-bold">✓</span>
                      <span>Verified Immigration Lawyers with active embassy licenses</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-teal-600 font-bold">✓</span>
                      <span>100% Escrow Milestone Payment Protection</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 pt-2">
                  <a
                    href={`/find-experts?country=${encodeURIComponent(targetCountry || "Canada")}`}
                    className="block w-full bg-[#00a896] hover:bg-[#008f80] text-white font-extrabold text-xs py-3.5 rounded-xl shadow-lg transition-all text-center cursor-pointer"
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
