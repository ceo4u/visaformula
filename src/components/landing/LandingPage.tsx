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

export default function LandingPage() {
  const [showLeadModal, setShowLeadModal] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [targetCountry, setTargetCountry] = React.useState("Canada");
  const [visaType, setVisaType] = React.useState("Student Visa");
  const [fullName, setFullName] = React.useState("");
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
    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seekerName: fullName,
          seekerEmail: email || `${phone.replace(/\D/g, '')}@trawelliq.guest`,
          seekerPhone: phone,
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
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn font-sans"
            onClick={handleClose}
          >
            <div 
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 border border-purple-100 font-sans" 
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                ✕
              </button>

              {!submitted ? (
                <>
                  <div className="space-y-1.5 text-center sm:text-left">
                    <span className="inline-block px-3 py-1 bg-teal-50 text-[#00a896] text-[11px] font-extrabold rounded-full tracking-wider uppercase">
                      ⚡ Free Instant Visa Guidance
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                      Connect with Verified Visa Experts ✈️
                    </h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      Get matched with top embassy-licensed consultants for high approval success rates.
                    </p>
                  </div>

                  <form onSubmit={handleSubmitLead} className="space-y-4 pt-1">
                    {/* Country Selector */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Target Destination</label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {[
                          { name: "Canada", flag: "🇨🇦" },
                          { name: "USA", flag: "🇺🇸" },
                          { name: "UK", flag: "🇬🇧" },
                          { name: "Australia", flag: "🇦🇺" },
                          { name: "Germany", flag: "🇩🇪" },
                          { name: "Schengen", flag: "🇪🇺" },
                          { name: "UAE", flag: "🇦🇪" }
                        ].map(c => (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => setTargetCountry(c.name)}
                            className={`p-2 rounded-xl border text-center transition-all text-xs cursor-pointer ${
                              targetCountry === c.name 
                                ? "border-[#00a896] bg-teal-50 font-extrabold text-slate-900 ring-2 ring-[#00a896]/20" 
                                : "border-slate-200 hover:border-slate-300 text-slate-600"
                            }`}
                          >
                            <span className="text-base block">{c.flag}</span>
                            <span className="text-[11px] font-bold block truncate">{c.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Visa Type Selector */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Visa Purpose</label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Student Visa", "Work Permit", "Tourist / Visit", "PR / Migration"].map(v => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setVisaType(v)}
                            className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left cursor-pointer ${
                              visaType === v 
                                ? "border-[#00a896] bg-teal-50 text-[#00a896] font-extrabold" 
                                : "border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Contact Inputs */}
                    <div className="space-y-2 pt-1">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name *"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#00a896] focus:bg-white transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="tel"
                          required
                          placeholder="Mobile / WhatsApp *"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#00a896] focus:bg-white transition-all"
                        />
                        <input
                          type="email"
                          placeholder="Email Address (Optional)"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#00a896] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#00a896] hover:bg-[#008f80] text-white font-extrabold text-xs py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer tracking-wide"
                    >
                      {loading ? "Connecting with Experts..." : "✨ Request Call Back & Free Evaluation"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-200 text-[#00a896] flex items-center justify-center mx-auto text-2xl">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900">Request Received! 🎉</h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Our top verified {targetCountry} consultants have been notified and will reach out shortly.
                    </p>
                  </div>
                  <div className="pt-2">
                    <a
                      href={`/find-experts?country=${encodeURIComponent(targetCountry)}`}
                      className="block w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3 rounded-xl transition-all"
                    >
                      Browse Verified {targetCountry} Experts Now →
                    </a>
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
