import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { DesktopHomeSection } from './DesktopHomeSection';
import { MobileHomeSection } from './MobileHomeSection';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in LandingPage section:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-[400px] flex items-center justify-center p-8 bg-white text-center">
          <div className="max-w-md space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Loading Landing Page...</h2>
            <p className="text-sm text-gray-500">Refreshing components to display optimal view.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-[#00a896] text-white rounded-xl text-xs font-bold shadow hover:bg-[#008f80]"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", country: "India", iso: "IN" },
  { code: "+1", flag: "🇨🇦", country: "Canada", iso: "CA" },
  { code: "+1", flag: "🇺🇸", country: "USA", iso: "US" },
  { code: "+44", flag: "🇬🇧", country: "UK", iso: "GB" },
  { code: "+61", flag: "🇦🇺", country: "Australia", iso: "AU" },
  { code: "+49", flag: "🇩🇪", country: "Germany", iso: "DE" },
  { code: "+971", flag: "🇦🇪", country: "UAE", iso: "AE" },
  { code: "+33", flag: "🇫🇷", country: "France", iso: "FR" },
  { code: "+65", flag: "🇸🇬", country: "Singapore", iso: "SG" },
  { code: "+92", flag: "🇵🇰", country: "Pakistan", iso: "PK" },
  { code: "+880", flag: "🇧🇩", country: "Bangladesh", iso: "BD" },
  { code: "+977", flag: "🇳🇵", country: "Nepal", iso: "NP" },
  { code: "+94", flag: "🇱🇰", country: "Sri Lanka", iso: "LK" },
];

export default function LandingPage() {
  const [showLeadModal, setShowLeadModal] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [targetCountry, setTargetCountry] = React.useState("Canada");
  const [visaType, setVisaType] = React.useState("Student Visa");
  const [fullName, setFullName] = React.useState("");
  const [selectedCountry, setSelectedCountry] = React.useState(COUNTRY_CODES[0]);
  const [showCountryDropdown, setShowCountryDropdown] = React.useState(false);
  const [countryDialCode, setCountryDialCode] = React.useState("+91");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if user is a consultant
    let isConsultant = false;
    try {
      const expertLoggedIn = localStorage.getItem("expert_isLoggedIn") === "true";
      const expertEmail = localStorage.getItem("expert_email");
      if (expertLoggedIn || expertEmail) isConsultant = true;
      const userStr = localStorage.getItem("visaformula_user");
      if (userStr) {
        const u = JSON.parse(userStr);
        if (u && (u.type === "expert" || u.role === "expert" || u.role === "consultant" || u.isExpert)) isConsultant = true;
      }
    } catch (e) {}

    const isDismissed = sessionStorage.getItem("hide_home_lead_modal") === "true";

    // Auto trigger popup after 2 seconds for Seekers/Visitors
    if (!isConsultant && !isDismissed) {
      const timer = setTimeout(() => {
        setShowLeadModal(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShowLeadModal(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("hide_home_lead_modal", "true");
    }
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    setLoading(true);
    const fullPhone = phone.startsWith("+") ? phone : `${countryDialCode} ${phone}`;
    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seekerName: fullName,
          seekerEmail: email || `${phone.replace(/\D/g, '')}@trawelliq.guest`,
          seekerPhone: fullPhone,
          expertName: "Verified Top Expert",
          expertEmail: "support@trawelliq.com",
          visaCategory: `${targetCountry} - ${visaType}`,
          preferredDate: new Date().toISOString().split("T")[0],
          preferredTime: "11:00 AM",
          notes: `Homepage Lead Request for ${targetCountry} (${visaType})`
        })
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Lead submission error:", err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="w-full bg-[#f3f4f6] text-black font-sans antialiased selection:bg-[#2563eb]/20 selection:text-[#2563eb]">
        {/* Desktop: shown on lg+ screens */}
        <div className="hidden lg:block">
          <DesktopHomeSection />
        </div>
        {/* Mobile: shown on screens smaller than lg */}
        <div className="block lg:hidden">
          <MobileHomeSection />
        </div>

        {/* ── HOMEPAGE AUTO CONSULTATION / EXPERT MATCHING POPUP MODAL ── */}
        {showLeadModal && (
          <div 
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn font-sans"
            onClick={handleClose}
          >
            <div 
              className="relative w-full max-w-md bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_30px_90px_-15px_rgba(0,0,0,0.4)] border border-slate-100 font-sans text-center overflow-hidden" 
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={handleClose}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors cursor-pointer text-sm font-bold z-10"
              >
                ✕
              </button>

              {!submitted ? (
                <>
                  {/* Step Indicator Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-[#00a896] text-[11px] font-black tracking-wide uppercase mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00a896] animate-pulse"></span>
                    Step {step} of 3 • Quick Evaluation
                  </div>

                  {/* Progress Line */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-6">
                    <div 
                      className="bg-[#00a896] h-full transition-all duration-300 rounded-full"
                      style={{ width: `${(step / 3) * 100}%` }}
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
                          What is your travel purpose?
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">
                          Target Country: <span className="font-extrabold text-[#00a896]">{targetCountry}</span>
                        </p>
                      </div>

                      <div className="space-y-2.5 text-left">
                        {[
                          { title: "Student Visa", icon: "🎓", desc: "University & College Admissions" },
                          { title: "Work Permit", icon: "💼", desc: "Job Offers & Work Sponsorship" },
                          { title: "Tourist / Visit", icon: "🏝️", desc: "Holidays & Family Meetings" },
                          { title: "PR & Settlement", icon: "🏡", desc: "Express Entry & PR Pathways" }
                        ].map(v => (
                          <button
                            key={v.title}
                            type="button"
                            onClick={() => {
                              setVisaType(v.title);
                              setStep(3);
                            }}
                            className={`w-full p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer hover:scale-[1.01] ${
                              visaType === v.title 
                                ? "border-[#00a896] bg-teal-50/70 font-extrabold text-slate-900 shadow-sm ring-1 ring-[#00a896]" 
                                : "border-slate-200 hover:border-[#00a896]/50 bg-slate-50/50 text-slate-700"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{v.icon}</span>
                              <div>
                                <div className="text-xs font-extrabold text-slate-900">{v.title}</div>
                                <div className="text-[10px] text-slate-500 font-medium">{v.desc}</div>
                              </div>
                            </div>
                            <span className="text-[#00a896] font-extrabold text-sm">→</span>
                          </button>
                        ))}
                      </div>

                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="w-full py-2.5 rounded-2xl border border-slate-200 text-xs font-extrabold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer"
                        >
                          ← Back to Destination
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Contact Info & Submit */}
                  {step === 3 && (
                    <form onSubmit={handleSubmitLead} className="space-y-5 animate-fadeIn">
                      <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-2xl mx-auto shadow-sm border border-teal-100/60">
                        ✨
                      </div>

                      <div>
                        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-1">
                          Get Matched with Experts
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">
                          Selected: <span className="font-extrabold text-slate-900">{targetCountry} ({visaType})</span>
                        </p>
                      </div>

                      <div className="space-y-3 text-left">
                        <div>
                          <label className="text-[11px] font-extrabold text-slate-700 block mb-1">Your Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Prashant Sharma"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 font-bold focus:outline-none focus:border-[#00a896] focus:bg-white focus:ring-2 focus:ring-[#00a896]/15 transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-extrabold text-slate-700 block mb-1">Mobile / WhatsApp Number *</label>
                          <div className="relative">
                            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden focus-within:border-[#00a896] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#00a896]/15 transition-all">
                              <button
                                type="button"
                                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                className="flex items-center gap-1.5 px-3.5 py-3 bg-slate-100/90 hover:bg-slate-200/80 text-slate-800 font-extrabold text-xs border-r border-slate-200 transition-colors cursor-pointer shrink-0"
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
                                className="w-full px-4 py-3 bg-transparent text-xs text-slate-900 font-bold focus:outline-none placeholder:text-slate-400 placeholder:font-medium"
                              />
                            </div>

                            {/* Custom High-Quality Popover Menu */}
                            {showCountryDropdown && (
                              <div className="absolute left-0 bottom-full mb-1.5 z-50 w-60 max-h-52 overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-2xl p-1.5 space-y-0.5 animate-fadeIn">
                                {COUNTRY_CODES.map((c, idx) => (
                                  <button
                                    key={`${c.iso}-${idx}`}
                                    type="button"
                                    onClick={() => {
                                      setSelectedCountry(c);
                                      setCountryDialCode(c.code);
                                      setShowCountryDropdown(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs text-left font-bold transition-all cursor-pointer ${
                                      selectedCountry.iso === c.iso && selectedCountry.code === c.code
                                        ? "bg-teal-50 text-[#00a896] font-extrabold"
                                        : "hover:bg-slate-50 text-slate-700"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <span className="text-base">{c.flag}</span>
                                      <span className="text-xs">{c.country}</span>
                                    </div>
                                    <span className="text-slate-400 text-[11px] font-mono">{c.code}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 pt-1">
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-[#00a896] hover:bg-[#008f80] active:scale-[0.99] text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg shadow-[#00a896]/25 hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <span>Submitting Request...</span>
                          ) : (
                            <>
                              <span>Get Free Evaluation</span>
                              <span className="text-base">🚀</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="w-full py-2.5 rounded-2xl text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                        >
                          Cancel / Back
                        </button>
                      </div>
                    </form>
                  )}
                </>
              ) : (
                <div className="py-4 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-200 text-[#00a896] flex items-center justify-center mx-auto text-2xl font-black shadow-inner">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Request Submitted! 🎉</h3>
                    <p className="text-xs text-slate-500 font-medium mt-1 max-w-xs mx-auto">
                      Our top verified {targetCountry} experts have received your request and will reach out shortly.
                    </p>
                  </div>
                  <div className="pt-2 space-y-2">
                    <a
                      href={`/find-experts?country=${encodeURIComponent(targetCountry)}`}
                      className="block w-full bg-[#00a896] hover:bg-[#008f80] text-white font-extrabold text-xs py-3.5 rounded-2xl shadow-lg shadow-[#00a896]/20 transition-all"
                    >
                      Browse Verified {targetCountry} Experts Now →
                    </a>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="block w-full py-2.5 text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
