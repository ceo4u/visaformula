import React, { useState, useEffect } from "react";
import { 
  CheckCircle2, ArrowRight, Send, 
  Building, Briefcase, MapPin, Clock, Globe, 
  Shield, Plane, Car, Hotel, GraduationCap, 
  Sparkles, Luggage, Umbrella, Check, X, 
  Search, Eye, EyeOff
} from "lucide-react";
import { useAuth, AuthProvider } from "../providers/auth-provider";
import { TurnstileWidget } from "../common/TurnstileWidget";

// ─── Available Services for 3x3 Grid (Step 3) ─────────────────────────────────
const AVAILABLE_SERVICES = [
  { id: "visa_consultant", name: "Visa Consultant", icon: Shield },
  { id: "immigration_consultant", name: "Immigration Consultant", icon: Building },
  { id: "travel_agent", name: "Travel Agent", icon: Plane },
  { id: "tour_operator", name: "Tour Operator", icon: Luggage },
  { id: "travel_insurance", name: "Travel Insurance", icon: Umbrella },
  { id: "accommodation", name: "Accommodation", icon: Hotel },
  { id: "transport_car_rental", name: "Transport / Car Rental", icon: Car },
  { id: "education_consultant", name: "Education Consultant", icon: GraduationCap },
  { id: "other_services", name: "Other Services", icon: Sparkles },
];

// ─── Available Top Countries ──────────────────────────────────────────────────
const POPULAR_DESTINATIONS = [
  "United States", "Canada", "United Kingdom", "Australia", "UAE", 
  "Germany", "Singapore", "New Zealand", "Schengen Area", "France", 
  "Italy", "Japan", "Switzerland", "Ireland", "Netherlands"
];

// ─── Available Languages ──────────────────────────────────────────────────────
const POPULAR_LANGUAGES = [
  "English", "Hindi", "Punjabi", "Gujarati", "Spanish", 
  "French", "German", "Arabic", "Mandarin", "Bengali"
];

// ─── Business Types ───────────────────────────────────────────────────────────
const BUSINESS_TYPES = [
  "Private Limited Company",
  "Public Limited Company",
  "Partnership Firm",
  "Sole Proprietorship",
  "Limited Liability Partnership (LLP)",
  "Individual / Freelance Consultant",
  "Other"
];

// ─── Years of Experience Options ──────────────────────────────────────────────
const EXPERIENCE_OPTIONS = [
  "Less than 1 Year",
  "1 - 3 Years",
  "3 - 5 Years",
  "5 - 10 Years",
  "10+ Years"
];

// Generate past years from 2026 down to 1980
const ESTABLISHED_YEARS = Array.from({ length: 47 }, (_, i) => String(2026 - i));

function ExpertSignupPortalContent() {
  const { signInWithGoogle } = useAuth();

  // Active step: 1 (Create Account), 2 (Business Details), 3 (Services & Expertise), 4 (Review & Submit), 5 (Celebration/Done)
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // ─── Step 1: Create Account Form ───────────────────────────────────────────
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileCode, setMobileCode] = useState("+91");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [googleLoading, setGoogleLoading] = useState(false);

  // ─── Step 2: Business Details Form ─────────────────────────────────────────
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("Private Limited Company");
  const [yearEstablished, setYearEstablished] = useState("2020");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [pinCode, setPinCode] = useState("");

  // ─── Step 3: Services & Expertise Form ─────────────────────────────────────
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Visa Consultant",
    "Immigration Consultant"
  ]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "UAE"
  ]);
  const [destinationSearch, setDestinationSearch] = useState("");
  const [experience, setExperience] = useState("5 - 10 Years");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([
    "English",
    "Hindi"
  ]);

  // ─── General Wizard State ──────────────────────────────────────────────────
  const [errorMsg, setErrorMsg] = useState("");
  const [comingSoonProvider, setComingSoonProvider] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  // Auto-sync email & phone into business fields when Step 1 changes
  useEffect(() => {
    if (!businessEmail && email) setBusinessEmail(email);
    if (!businessPhone && mobileNumber) setBusinessPhone(mobileNumber);
    if (!businessName && fullName) setBusinessName(`${fullName}'s Immigration`);
  }, [email, mobileNumber, fullName]);

  // Password validation checklist checks
  const isMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isPasswordValid = isMinLength && hasUppercase && hasNumber && hasSpecial;

  // Toggle service selection
  const toggleService = (serviceName: string) => {
    if (selectedServices.includes(serviceName)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== serviceName));
      }
    } else {
      setSelectedServices([...selectedServices, serviceName]);
    }
  };

  // Toggle destination selection
  const toggleDestination = (dest: string) => {
    if (selectedDestinations.includes(dest)) {
      if (selectedDestinations.length > 1) {
        setSelectedDestinations(selectedDestinations.filter(d => d !== dest));
      }
    } else {
      setSelectedDestinations([...selectedDestinations, dest]);
    }
  };

  // Toggle language selection
  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      if (selectedLanguages.length > 1) {
        setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
      }
    } else {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  // ─── Google SSO Sign Up ────────────────────────────────────────────────────
  const handleGoogleSignup = async () => {
    setErrorMsg("");
    setGoogleLoading(true);
    try {
      const res = await signInWithGoogle('expert', 'signup', turnstileToken);
      if (res?.user) {
        const u = res.user;
        if (u.displayName) setFullName(u.displayName);
        if (u.email) {
          setEmail(u.email);
          setBusinessEmail(u.email);
        }
        setBusinessName(u.displayName ? `${u.displayName}'s Advisory` : "Global Visa Advisory");
        // Smoothly proceed to Step 2
        setStep(2);
      }
    } catch (err: any) {
      if (!err?.message?.includes("cancelled") && !err?.message?.includes("closed-by-user")) {
        setErrorMsg(err?.message || "Google sign-in failed.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  // ─── Step 1 Next: Validate & Advance ────────────────────────────────────────
  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!mobileNumber.trim() || mobileNumber.length < 7) {
      setErrorMsg("Please enter a valid mobile number.");
      return;
    }
    if (!isPasswordValid) {
      setErrorMsg("Please ensure your password meets all 4 security criteria.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    if (!agreedToTerms) {
      setErrorMsg("Please accept the Terms & Conditions to proceed.");
      return;
    }

    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ─── Step 2 Next: Validate & Advance ────────────────────────────────────────
  const handleStep2Next = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!businessName.trim()) {
      setErrorMsg("Please enter your business or company name.");
      return;
    }
    if (!businessEmail.trim()) {
      setErrorMsg("Please enter your business email.");
      return;
    }
    if (!city.trim()) {
      setErrorMsg("Please enter your city.");
      return;
    }
    if (!businessAddress.trim()) {
      setErrorMsg("Please enter your business address.");
      return;
    }

    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ─── Step 3 Next: Validate & Advance ────────────────────────────────────────
  const handleStep3Next = () => {
    setErrorMsg("");
    if (selectedServices.length === 0) {
      setErrorMsg("Please select at least one service.");
      return;
    }
    if (selectedDestinations.length === 0) {
      setErrorMsg("Please select at least one destination country.");
      return;
    }

    setStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ─── Step 4: Final Submit Application ──────────────────────────────────────
  const handleSubmitApplication = async () => {
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const fullContact = `${mobileCode} ${mobileNumber || businessPhone}`.trim();
      const payload = {
        business_name: businessName || fullName || "Service Provider",
        full_name: fullName,
        email: (businessEmail || email).toLowerCase().trim(),
        password,
        contact_number: fullContact,
        advisor_type: businessType,
        business_type: businessType,
        year_established: yearEstablished,
        business_email: businessEmail || email,
        business_phone: businessPhone || mobileNumber,
        website,
        country,
        state,
        city,
        office_address: businessAddress,
        pin_code: pinCode,
        services: selectedServices,
        expertise_tags: selectedServices,
        destinations: selectedDestinations,
        countries_expertise: JSON.stringify(selectedDestinations),
        experience_years: experience,
        languages_spoken: JSON.stringify(selectedLanguages),
        turnstileToken,
      };

      const resp = await fetch("/api/register/expert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await resp.json();

      if (!resp.ok || data.status === "error") {
        throw new Error(data.message || "Registration failed. Please try again.");
      }

      // Save user session in localStorage
      if (data.user && typeof window !== "undefined") {
        localStorage.setItem("travltik_user", JSON.stringify(data.user));
        localStorage.setItem("expert_isLoggedIn", "true");
        localStorage.setItem("expert_email", data.user.email);
        localStorage.setItem("expert_businessName", data.user.displayName || businessName);
      }

      // Proceed to celebratory success step
      setStep(5);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to submit application. Please check your details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Filter destinations matching search ────────────────────────────────────
  const filteredDestinations = POPULAR_DESTINATIONS.filter(
    d => d.toLowerCase().includes(destinationSearch.toLowerCase()) && !selectedDestinations.includes(d)
  );

  return (
    <div className="w-full max-w-2xl mx-auto py-6 sm:py-10 px-3 sm:px-4 font-sans text-slate-900">
      
      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* TOP STEPPER HEADER (Exact Match: 4 Steps)                              */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      {step !== 5 && (
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-xl mx-auto px-2 relative">
            
            {/* Background connecting bar */}
            <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0" />
            <div 
              className="absolute top-4 left-6 h-0.5 bg-[#00a896] transition-all duration-500 -z-0" 
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />

            {[
              { num: 1, label: "Create Account" },
              { num: 2, label: "Business Details" },
              { num: 3, label: "Services & Expertise" },
              { num: 4, label: "Review & Submit" },
            ].map((s) => {
              const isDone = step > s.num;
              const isActive = step === s.num;
              return (
                <div key={s.num} className="flex flex-col items-center relative z-10">
                  <button
                    type="button"
                    onClick={() => { if (step > s.num) setStep(s.num as any); }}
                    disabled={step < s.num}
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                      isDone
                        ? "bg-[#00a896] text-white shadow-sm ring-4 ring-emerald-50 cursor-pointer"
                        : isActive
                        ? "bg-[#00a896] text-white ring-4 ring-emerald-100 shadow-md scale-105"
                        : "bg-white text-slate-400 border border-slate-200"
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                  </button>
                  <span className={`text-[11px] sm:text-xs font-semibold mt-1.5 transition-colors text-center hidden sm:block ${
                    isActive ? "text-[#00a896] font-bold" : isDone ? "text-slate-700" : "text-slate-400"
                  }`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* MAIN WHITE CARD CONTAINER                                              */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-[28px] sm:rounded-[32px] p-5 sm:p-8 shadow-xl border border-slate-200/90 relative transition-all">

        {/* Global Error Banner */}
        {errorMsg && (
          <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm font-semibold flex items-center gap-2">
            <span className="shrink-0 text-base">⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* STEP 1: CREATE ACCOUNT                                               */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            {/* Header */}
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Create Your Account
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Join TravlTik and grow your business.
              </p>
            </div>

            {/* Social SSO Buttons */}
            <div className="space-y-2.5 pt-1">
              {/* Google SSO */}
              <button
                type="button"
                onClick={handleGoogleSignup}
                onMouseEnter={() => import("../../lib/firebase").then(m => m.preloadFirebase?.()).catch(() => {})}
                onTouchStart={() => import("../../lib/firebase").then(m => m.preloadFirebase?.()).catch(() => {})}
                onFocus={() => import("../../lib/firebase").then(m => m.preloadFirebase?.()).catch(() => {})}
                disabled={googleLoading}
                className="w-full py-3 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl font-bold text-xs sm:text-sm text-slate-800 flex items-center justify-center gap-3 transition-all shadow-2xs hover:shadow-xs active:scale-[0.99] cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>{googleLoading ? "Connecting Google..." : "Continue with Google"}</span>
              </button>

              {/* Coming Soon Notice */}
              {comingSoonProvider && (
                <div className="p-3 bg-amber-50/90 border border-amber-200/90 rounded-2xl flex items-center justify-between gap-3 text-amber-900 text-xs animate-fade-in shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base shrink-0">🚀</span>
                    <div>
                      <span className="font-bold text-amber-950">{comingSoonProvider} Sign-in is Coming Soon!</span>
                      <p className="text-[11px] text-amber-700 mt-0.5">Please sign up with Google or Email below in the meantime.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setComingSoonProvider(null)}
                    className="text-amber-700 hover:text-amber-950 p-1.5 rounded-lg text-xs font-bold hover:bg-amber-100/60 transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Facebook SSO */}
              <button
                type="button"
                onClick={() => {
                  setErrorMsg("");
                  setComingSoonProvider("Facebook");
                }}
                className={`w-full py-3 px-4 bg-white hover:bg-slate-50 border rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all shadow-2xs hover:shadow-xs active:scale-[0.99] cursor-pointer ${
                  comingSoonProvider === 'Facebook' ? 'border-amber-300 bg-amber-50/40 text-amber-900' : 'border-slate-200 text-slate-800'
                }`}
              >
                <svg className="w-4 h-4 shrink-0" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                {comingSoonProvider === 'Facebook' ? (
                  <span className="text-amber-700 font-bold flex items-center gap-1.5 animate-pulse">
                    <span>⏳</span> Coming Soon...
                  </span>
                ) : (
                  <span>Continue with Facebook</span>
                )}
              </button>

              {/* Apple SSO */}
              <button
                type="button"
                onClick={() => {
                  setErrorMsg("");
                  setComingSoonProvider("Apple");
                }}
                className={`w-full py-3 px-4 bg-white hover:bg-slate-50 border rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all shadow-2xs hover:shadow-xs active:scale-[0.99] cursor-pointer ${
                  comingSoonProvider === 'Apple' ? 'border-amber-300 bg-amber-50/40 text-amber-900' : 'border-slate-200 text-slate-800'
                }`}
              >
                <svg className="w-4 h-4 shrink-0 fill-current text-slate-900" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.9.04-2 .6-2.65 1.36-.58.67-1.09 1.74-.95 2.78 1.02.08 2.06-.52 2.68-1.27z"/>
                </svg>
                {comingSoonProvider === 'Apple' ? (
                  <span className="text-amber-700 font-bold flex items-center gap-1.5 animate-pulse">
                    <span>⏳</span> Coming Soon...
                  </span>
                ) : (
                  <span>Continue with Apple</span>
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                OR
              </span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <div className="text-center -mt-2">
              <span className="text-xs font-bold text-slate-600">
                Sign up with Email
              </span>
            </div>

            {/* Email Registration Form */}
            <form onSubmit={handleStep1Next} className="space-y-3.5">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00a896] focus:border-transparent transition-all"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00a896] focus:border-transparent transition-all"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Mobile Number
                </label>
                <div className="flex gap-2">
                  <select
                    value={mobileCode}
                    onChange={(e) => setMobileCode(e.target.value)}
                    className="px-2.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00a896] cursor-pointer"
                  >
                    <option value="+91">+91 (IN)</option>
                    <option value="+1">+1 (US/CA)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+971">+971 (UAE)</option>
                    <option value="+61">+61 (AU)</option>
                  </select>
                  <input
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter mobile number"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00a896] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00a896] focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00a896] focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Password Checklist Criteria */}
              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                <div className={`flex items-center gap-1.5 ${isMinLength ? "text-emerald-600 font-bold" : "text-slate-400"}`}>
                  <Check className={`w-3.5 h-3.5 ${isMinLength ? "text-emerald-600" : "text-slate-300"}`} />
                  <span>Minimum 8 characters</span>
                </div>
                <div className={`flex items-center gap-1.5 ${hasUppercase ? "text-emerald-600 font-bold" : "text-slate-400"}`}>
                  <Check className={`w-3.5 h-3.5 ${hasUppercase ? "text-emerald-600" : "text-slate-300"}`} />
                  <span>One uppercase letter</span>
                </div>
                <div className={`flex items-center gap-1.5 ${hasNumber ? "text-emerald-600 font-bold" : "text-slate-400"}`}>
                  <Check className={`w-3.5 h-3.5 ${hasNumber ? "text-emerald-600" : "text-slate-300"}`} />
                  <span>One number</span>
                </div>
                <div className={`flex items-center gap-1.5 ${hasSpecial ? "text-emerald-600 font-bold" : "text-slate-400"}`}>
                  <Check className={`w-3.5 h-3.5 ${hasSpecial ? "text-emerald-600" : "text-slate-300"}`} />
                  <span>One special character</span>
                </div>
              </div>

              {/* Agreement Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer select-none text-[11px] sm:text-xs text-slate-600 leading-snug">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#00a896] focus:ring-[#00a896] accent-[#00a896] cursor-pointer"
                  />
                  <span>
                    I agree to TravlTik's{" "}
                    <a href="/terms" target="_blank" className="font-bold text-[#00a896] hover:underline">
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" target="_blank" className="font-bold text-[#00a896] hover:underline">
                      Privacy Policy
                    </a>
                  </span>
                </label>
              </div>

              {/* Action Button: Create Account */}
              <button
                type="submit"
                className="w-full mt-3 py-3.5 px-4 bg-[#00a896] hover:bg-[#008f80] text-white font-bold text-sm rounded-2xl shadow-md transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Already have account */}
              <div className="text-center pt-2 text-xs text-slate-500">
                Already have an account?{" "}
                <a href="/login" className="font-bold text-[#00a896] hover:underline">
                  Sign in
                </a>
              </div>
            </form>
          </div>
        )}

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* STEP 2: BUSINESS DETAILS                                             */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        {step === 2 && (
          <form onSubmit={handleStep2Next} className="space-y-4 animate-fade-in">
            {/* Top Indicator */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-1.5">
                <span>Step 2 of 4</span>
                <span className="text-[#00a896]">50% Completed</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
                <div className="w-1/2 h-full bg-[#00a896] rounded-full transition-all duration-300" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Tell us about your business
              </h2>
            </div>

            {/* Business / Company Name */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Business / Company Name *
              </label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Enter business name"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00a896] focus:border-transparent transition-all"
              />
            </div>

            {/* Business Type */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Business Type *
              </label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a896] cursor-pointer"
              >
                {BUSINESS_TYPES.map(bt => (
                  <option key={bt} value={bt}>{bt}</option>
                ))}
              </select>
            </div>

            {/* Year Established */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Year Established
              </label>
              <select
                value={yearEstablished}
                onChange={(e) => setYearEstablished(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a896] cursor-pointer"
              >
                {ESTABLISHED_YEARS.map(yr => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>
            </div>

            {/* Business Email */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Business Email *
              </label>
              <input
                type="email"
                required
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
                placeholder="Enter business email"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00a896] focus:border-transparent transition-all"
              />
            </div>

            {/* Business Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Business Phone
              </label>
              <div className="flex gap-2">
                <span className="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-xs font-bold text-slate-600 flex items-center">
                  +91
                </span>
                <input
                  type="tel"
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                  placeholder="Enter business phone"
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00a896] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Website (Optional) */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Website (Optional)
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Enter website URL"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00a896] focus:border-transparent transition-all"
              />
            </div>

            {/* Location: Country & State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Country *
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a896] cursor-pointer"
                >
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="UAE">UAE</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  State / Province
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="Select state"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00a896] transition-all"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                City *
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00a896] transition-all"
              />
            </div>

            {/* Business Address */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Business Address *
              </label>
              <input
                type="text"
                required
                value={businessAddress}
                onChange={(e) => setBusinessAddress(e.target.value)}
                placeholder="Enter full business address"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00a896] transition-all"
              />
            </div>

            {/* PIN / ZIP Code */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                PIN / ZIP Code
              </label>
              <input
                type="text"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                placeholder="Enter PIN / ZIP code"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00a896] transition-all"
              />
            </div>

            {/* Navigation Buttons: Back & Next */}
            <div className="flex items-center justify-between pt-4 gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-2xs"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-8 py-3 rounded-2xl bg-[#00a896] hover:bg-[#008f80] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-[0.99] cursor-pointer flex items-center gap-2"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* STEP 3: SERVICES & EXPERTISE                                         */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            {/* Top Indicator */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-1.5">
                <span>Step 3 of 4</span>
                <span className="text-[#00a896]">75% Completed</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
                <div className="w-3/4 h-full bg-[#00a896] rounded-full transition-all duration-300" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Your Services & Expertise
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Select the services you provide and destinations you specialize in.
              </p>
            </div>

            {/* 3x3 Grid of Services */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2.5">
                I provide services as (Select all that apply)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {AVAILABLE_SERVICES.map((s) => {
                  const Icon = s.icon;
                  const isSelected = selectedServices.includes(s.name);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleService(s.name)}
                      className={`relative p-3.5 sm:p-4 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer min-h-[90px] sm:min-h-[100px] ${
                        isSelected
                          ? "border-2 border-[#00a896] bg-emerald-50/40 shadow-xs"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                      }`}
                    >
                      {/* Checkmark indicator */}
                      <div className="flex items-center justify-between w-full mb-2">
                        <div className={`p-1.5 rounded-xl ${isSelected ? "bg-[#00a896] text-white" : "bg-slate-100 text-slate-600"}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                          isSelected ? "border-[#00a896] bg-[#00a896] text-white" : "border-slate-300 bg-white"
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      <span className={`text-xs font-bold leading-snug ${isSelected ? "text-slate-900" : "text-slate-700"}`}>
                        {s.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Destinations Specialization */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">
                Destinations you specialize in (Select all that apply)
              </label>

              {/* Country search input */}
              <div className="relative mb-3">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={destinationSearch}
                  onChange={(e) => setDestinationSearch(e.target.value)}
                  placeholder="Search countries..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00a896] transition-all"
                />
              </div>

              {/* Selected Country Pills */}
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {selectedDestinations.map(d => (
                  <span
                    key={d}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-[#008f80] text-xs font-bold rounded-full"
                  >
                    <span>{d}</span>
                    <button
                      type="button"
                      onClick={() => toggleDestination(d)}
                      className="hover:text-red-500 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Quick Suggestion Chips */}
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-[11px] font-semibold text-slate-400 mr-1">
                  Suggestions:
                </span>
                {(destinationSearch ? filteredDestinations : POPULAR_DESTINATIONS.filter(d => !selectedDestinations.includes(d))).slice(0, 6).map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleDestination(d)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-full transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>+ {d}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Years of Experience */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Years of Experience
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a896] cursor-pointer"
              >
                {EXPERIENCE_OPTIONS.map(exp => (
                  <option key={exp} value={exp}>{exp}</option>
                ))}
              </select>
            </div>

            {/* Languages Spoken */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">
                Languages Spoken
              </label>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_LANGUAGES.map(lang => {
                  const isSel = selectedLanguages.includes(lang);
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => toggleLanguage(lang)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        isSel
                          ? "border-[#00a896] bg-[#00a896] text-white shadow-2xs"
                          : "border-slate-200 bg-slate-50/80 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {lang}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Buttons: Back & Next */}
            <div className="flex items-center justify-between pt-4 gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-2xs"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleStep3Next}
                className="px-8 py-3 rounded-2xl bg-[#00a896] hover:bg-[#008f80] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-[0.99] cursor-pointer flex items-center gap-2"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* STEP 4: REVIEW & SUBMIT (Documents omitted per user request)          */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            {/* Top Indicator */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-1.5">
                <span>Step 4 of 4</span>
                <span className="text-[#00a896]">100% Completed</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
                <div className="w-full h-full bg-[#00a896] rounded-full transition-all duration-300" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Review & Submit
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Please review your information before submitting.
              </p>
            </div>

            {/* Summary Box with Edit link */}
            <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Summary
                </h3>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs font-bold text-[#00a896] hover:underline cursor-pointer"
                >
                  Edit
                </button>
              </div>

              {/* Item: Business Name */}
              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <div className="p-1.5 rounded-lg bg-emerald-50 text-[#00a896] shrink-0 mt-0.5">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400">Business Name</div>
                  <div className="font-bold text-slate-800">{businessName || "Not provided"}</div>
                </div>
              </div>

              {/* Item: Business Type */}
              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <div className="p-1.5 rounded-lg bg-emerald-50 text-[#00a896] shrink-0 mt-0.5">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400">Business Type</div>
                  <div className="font-bold text-slate-800">{businessType}</div>
                </div>
              </div>

              {/* Item: Services */}
              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <div className="p-1.5 rounded-lg bg-emerald-50 text-[#00a896] shrink-0 mt-0.5">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400">Services</div>
                  <div className="font-bold text-slate-800">{selectedServices.join(", ")}</div>
                </div>
              </div>

              {/* Item: Destinations */}
              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <div className="p-1.5 rounded-lg bg-emerald-50 text-[#00a896] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400">Destinations</div>
                  <div className="font-bold text-slate-800">{selectedDestinations.join(", ")}</div>
                </div>
              </div>

              {/* Item: Experience */}
              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <div className="p-1.5 rounded-lg bg-emerald-50 text-[#00a896] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400">Experience</div>
                  <div className="font-bold text-slate-800">{experience}</div>
                </div>
              </div>

              {/* Item: Languages */}
              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <div className="p-1.5 rounded-lg bg-emerald-50 text-[#00a896] shrink-0 mt-0.5">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400">Languages</div>
                  <div className="font-bold text-slate-800">{selectedLanguages.join(", ")}</div>
                </div>
              </div>
            </div>

            {/* Confirmation Box */}
            <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 text-[11px] sm:text-xs text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-[#00a896] shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                By submitting, you confirm that all the information provided is accurate and you agree to our{" "}
                <a href="/terms" target="_blank" className="font-bold text-[#00a896] hover:underline">
                  Terms & Conditions
                </a>.
              </span>
            </div>

            {/* Cloudflare Turnstile bot protection */}
            <div className="flex justify-center pt-1">
              <TurnstileWidget
                onSuccess={(t) => setTurnstileToken(t)}
                onError={() => setTurnstileToken("")}
                onExpire={() => setTurnstileToken("")}
                theme="light"
              />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmitApplication}
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-[#00a896] hover:bg-[#008f80] text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-75"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? "Submitting Application..." : "Submit Application"}</span>
            </button>

            {/* Footer subtext */}
            <p className="text-center text-xs text-slate-400 font-medium">
              You will receive an email once your application is reviewed.
            </p>

            {/* Back Button */}
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                ← Back to Services & Expertise
              </button>
            </div>
          </div>
        )}

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* STEP 5: CELEBRATION / SUCCESS SCREEN                                 */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        {step === 5 && (
          <div className="text-center py-6 sm:py-8 space-y-4 animate-fade-in">
            {/* Animated Badge */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#00a896] shadow-inner animate-bounce">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Application Submitted!
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you for applying to become a verified TravlTik Service Provider. We have sent a confirmation email to <span className="font-bold text-slate-900">{businessEmail || email}</span>.
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-md mx-auto text-left text-xs space-y-2">
              <div className="font-bold text-slate-800">What happens next?</div>
              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                <li>Our verification team will review your business credentials.</li>
                <li>Your listing on the TravlTik marketplace will be activated upon review.</li>
                <li>You can now access your Consultant Dashboard to customize your profile and consultation fees.</li>
              </ul>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto">
              <a
                href="/consultant/dashboard"
                className="w-full sm:w-auto py-3.5 px-6 bg-[#00a896] hover:bg-[#008f80] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all text-center"
              >
                Go to Consultant Dashboard
              </a>
              <a
                href="/"
                className="w-full sm:w-auto py-3.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-2xl transition-all text-center"
              >
                Return to Home
              </a>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

export function ExpertSignupPortal() {
  return (
    <AuthProvider>
      <ExpertSignupPortalContent />
    </AuthProvider>
  );
}

export default ExpertSignupPortal;
