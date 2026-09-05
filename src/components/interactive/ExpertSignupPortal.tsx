import React, { useState, useEffect, useRef } from "react";
import { 
  CheckCircle2, ArrowRight, ArrowLeft, Send, 
  Building, Briefcase, MapPin, Clock, Globe, 
  Shield, Plane, Car, Hotel, GraduationCap, 
  Sparkles, Luggage, Umbrella, Check, X, 
  Search, Eye, EyeOff, ChevronDown, Mail, Loader2
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

// ─── Business Operating Countries ─────────────────────────────────────────────
const BUSINESS_COUNTRIES = [
  "India",
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "UAE",
  "Germany",
  "Singapore",
  "New Zealand",
  "Other"
];

// ─── Country Dial Codes ───────────────────────────────────────────────────────
const COUNTRY_DIAL_CODES = [
  { value: "+91", label: "+91 (IN)" },
  { value: "+1", label: "+1 (US/CA)" },
  { value: "+44", label: "+44 (UK)" },
  { value: "+971", label: "+971 (UAE)" },
  { value: "+61", label: "+61 (AU)" },
  { value: "+49", label: "+49 (DE)" },
  { value: "+65", label: "+65 (SG)" }
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

// ─── Modern Custom Dropdown Component ────────────────────────────────────────
interface CustomDropdownProps {
  value: string;
  onChange: (val: string) => void;
  options: ({ value: string; label: string } | string)[];
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
}

function CustomDropdown({ value, onChange, options, placeholder = "Select option", disabled = false, hasError = false }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const normalizedOptions = options.map(opt => 
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find(o => o.value === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(prev => !prev)}
        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-between gap-2 transition-all cursor-pointer text-left ${
          hasError
            ? "border-rose-500 ring-2 ring-rose-200/80 bg-rose-50/20 text-rose-900"
            : isOpen
            ? "border-[#481268] ring-2 ring-purple-200/70 bg-white shadow-xs"
            : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
        } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        <span className={`truncate ${selectedOption && selectedOption.value ? "text-slate-800 font-semibold" : "text-slate-400 font-normal"}`}>
          {selectedOption && selectedOption.value ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#481268]" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white border border-slate-200/90 rounded-2xl shadow-xl py-1.5 max-h-60 overflow-y-auto scrollbar-thin">
          {normalizedOptions.map(option => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 text-xs sm:text-sm flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-purple-50 text-[#481268] font-bold"
                    : "text-slate-700 hover:bg-purple-50/40 hover:text-slate-900 font-medium"
                }`}
              >
                <span className="truncate">{option.label}</span>
                {isSelected && <Check className="w-4 h-4 text-[#481268] shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

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

  // ─── Step 2: Business Details Form (Clean empty initial states - user fills them) ───
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [yearEstablished, setYearEstablished] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [pinCode, setPinCode] = useState("");

  // ─── Step 3: Services & Expertise Form (Clean empty initial states) ────────
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [destinationSearch, setDestinationSearch] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  // ─── Field-Level Error Tracking ──────────────────────────────────────────
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const clearFieldError = (field: string) => {
    setFieldErrors(prev => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    if (errorMsg) setErrorMsg("");
  };

  // ─── General Wizard State ──────────────────────────────────────────────────
  const [errorMsg, setErrorMsg] = useState("");
  const [comingSoonProvider, setComingSoonProvider] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  // ─── Email OTP Verification State (Submit -> Email Code -> Dashboard) ───────
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [otpSuccessMsg, setOtpSuccessMsg] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Auto-sync email & phone into business fields when Step 1 changes (do NOT auto-fill business name)
  useEffect(() => {
    if (!businessEmail && email) setBusinessEmail(email);
    if (!businessPhone && mobileNumber) setBusinessPhone(mobileNumber);
  }, [email, mobileNumber]);

  // Password validation checklist checks
  const isMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isPasswordValid = isMinLength && hasUppercase && hasNumber && hasSpecial;

  // Toggle service selection
  const toggleService = (serviceName: string) => {
    clearFieldError("selectedServices");
    if (selectedServices.includes(serviceName)) {
      setSelectedServices(selectedServices.filter(s => s !== serviceName));
    } else {
      setSelectedServices([...selectedServices, serviceName]);
    }
  };

  // Toggle destination selection
  const toggleDestination = (dest: string) => {
    clearFieldError("selectedDestinations");
    if (selectedDestinations.includes(dest)) {
      setSelectedDestinations(selectedDestinations.filter(d => d !== dest));
    } else {
      setSelectedDestinations([...selectedDestinations, dest]);
    }
  };

  // Toggle language selection
  const toggleLanguage = (lang: string) => {
    clearFieldError("selectedLanguages");
    if (selectedLanguages.includes(lang)) {
      setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
    } else {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  // ─── Google SSO Sign Up ────────────────────────────────────────────────────
  const handleGoogleSignup = async () => {
    setErrorMsg("");
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error("[ExpertGoogleAuth]", err);
      setErrorMsg(err.message || "Failed to authenticate with Google.");
    } finally {
      setGoogleLoading(false);
    }
  };

  // ─── Step 1 Next: Validate & Advance ────────────────────────────────────────
  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const errs: Record<string, string> = {};

    if (!fullName.trim()) {
      errs.fullName = "Please enter your full legal name.";
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!mobileNumber.trim() || mobileNumber.replace(/\D/g, '').length < 7) {
      errs.mobileNumber = "Please enter a valid mobile number (at least 7 digits).";
    }
    if (!password) {
      errs.password = "Please enter a password.";
    } else if (!isPasswordValid) {
      errs.password = "Please ensure your password meets all 4 security criteria.";
    }
    if (!confirmPassword) {
      errs.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
    }
    if (!agreedToTerms) {
      errs.agreedToTerms = "Please accept the Terms & Conditions to proceed.";
    }

    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      setErrorMsg("Please fill in all required fields highlighted below.");
      return;
    }

    setFieldErrors({});
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ─── Step 2 Next: Validate & Advance ────────────────────────────────────────
  const handleStep2Next = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const errs: Record<string, string> = {};

    if (!businessName.trim()) {
      errs.businessName = "Please enter your business or company name.";
    }
    if (!businessType) {
      errs.businessType = "Please select your business type.";
    }
    if (!businessEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessEmail.trim())) {
      errs.businessEmail = "Please enter a valid business email address.";
    }
    if (!country) {
      errs.country = "Please select your operating country.";
    }
    if (!city.trim()) {
      errs.city = "Please enter your city.";
    }
    if (!businessAddress.trim()) {
      errs.businessAddress = "Please enter your business address.";
    }

    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      setErrorMsg("Please fill in or select all required business fields highlighted below.");
      return;
    }

    setFieldErrors({});
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ─── Step 3 Next: Validate & Advance ────────────────────────────────────────
  const handleStep3Next = () => {
    setErrorMsg("");
    const errs: Record<string, string> = {};

    if (selectedServices.length === 0) {
      errs.selectedServices = "Please select this field (choose at least one service).";
    }
    if (selectedDestinations.length === 0) {
      errs.selectedDestinations = "Please select this field (choose at least one destination country).";
    }
    if (!experience) {
      errs.experience = "Please select this field (years of experience).";
    }
    if (selectedLanguages.length === 0) {
      errs.selectedLanguages = "Please select this field (choose at least one language spoken).";
    }

    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      setErrorMsg("Please select all required fields highlighted below before proceeding.");
      return;
    }

    setFieldErrors({});
    setStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ─── Step 4: Initiate Email Verification with Code on Submit Application ────
  const handleInitiateEmailVerification = async () => {
    setErrorMsg("");
    setOtpError("");
    const targetEmail = (businessEmail || email).toLowerCase().trim();
    if (!targetEmail) {
      setErrorMsg("Please provide a valid email address.");
      return;
    }

    setIsSendingOtp(true);
    try {
      const res = await fetch("/api/auth/send-verification-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: targetEmail,
          mode: "registration",
          allowExisting: false
        })
      });
      const data = await res.json();
      if (!res.ok || data.status === "error") {
        setErrorMsg(data.message || "Failed to dispatch verification code. Please check your email.");
        return;
      }

      setOtpDigits(["", "", "", "", "", ""]);
      setOtpError("");
      setOtpSuccessMsg(`Verification code sent to ${targetEmail}`);
      setIsVerifyingEmail(true);
      setResendCooldown(60);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setErrorMsg("Server connection error. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  // ─── Resend OTP Code ───────────────────────────────────────────────────────
  const handleResendOtp = async () => {
    if (resendCooldown > 0 || isSendingOtp) return;
    setOtpError("");
    setIsSendingOtp(true);
    const targetEmail = (businessEmail || email).toLowerCase().trim();
    try {
      const res = await fetch("/api/auth/send-verification-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: targetEmail,
          mode: "registration",
          allowExisting: true
        })
      });
      const data = await res.json();
      if (!res.ok || data.status === "error") {
        setOtpError(data.message || "Failed to resend code.");
      } else {
        setOtpSuccessMsg("New 6-digit verification code sent to your email!");
        setResendCooldown(60);
      }
    } catch {
      setOtpError("Failed to resend verification code.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  // ─── OTP Digit Navigation & Paste Support ───────────────────────────────────
  const handleOtpDigitChange = (index: number, val: string) => {
    if (val.length > 1) {
      const digits = val.replace(/\D/g, '').slice(0, 6).split('');
      if (digits.length > 0) {
        const next = [...otpDigits];
        digits.forEach((d, i) => {
          if (index + i < 6) next[index + i] = d;
        });
        setOtpDigits(next);
        setOtpError("");
        const nextIdx = Math.min(5, index + digits.length);
        otpInputRefs.current[nextIdx]?.focus();
        if (next.every(d => d !== "")) {
          handleVerifyAndSubmit(next.join(""));
        }
        return;
      }
    }

    const cleanChar = val.replace(/\D/g, '').slice(-1);
    const next = [...otpDigits];
    next[index] = cleanChar;
    setOtpDigits(next);
    setOtpError("");

    if (cleanChar && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
    if (next.every(d => d !== "")) {
      handleVerifyAndSubmit(next.join(""));
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // ─── Final Verification & Redirect to Dashboard ─────────────────────────────
  const handleVerifyAndSubmit = async (codeOverride?: string) => {
    const fullCode = codeOverride || otpDigits.join("");
    if (fullCode.length < 6) {
      setOtpError("Please enter the complete 6-digit verification code.");
      return;
    }
    setOtpError("");
    setIsVerifyingOtp(true);
    const targetEmail = (businessEmail || email).toLowerCase().trim();

    try {
      // 1. Verify code
      const verifyRes = await fetch("/api/auth/verify-email-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail, code: fullCode, otp: fullCode })
      });
      const verifyData = await verifyRes.json();
      if (!verifyRes.ok || verifyData.status === "error" || !verifyData.verified) {
        setOtpError(verifyData.message || "Invalid or expired verification code. Please check your email and try again.");
        setIsVerifyingOtp(false);
        return;
      }

      // 2. Submit expert application
      const fullContact = `${mobileCode} ${mobileNumber || businessPhone}`.trim();
      const payload = {
        business_name: businessName || fullName || "Service Provider",
        full_name: fullName,
        email: targetEmail,
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
      if (typeof window !== "undefined") {
        if (data.user) {
          localStorage.setItem("travltik_user", JSON.stringify(data.user));
        }
        localStorage.setItem("expert_isLoggedIn", "true");
        localStorage.setItem("expert_email", targetEmail);
        localStorage.setItem("expert_businessName", businessName || fullName);
      }

      setOtpSuccessMsg("✓ Email verified! Redirecting to Service Provider Dashboard...");

      // Redirect directly to Service Provider Dashboard
      setTimeout(() => {
        window.location.href = "/service-provider/dashboard";
      }, 1000);
    } catch (err: any) {
      setOtpError(err?.message || "Failed to verify. Please check your code and try again.");
      setIsVerifyingOtp(false);
    }
  };

  // ─── Filter destinations matching search ────────────────────────────────────
  const filteredDestinations = POPULAR_DESTINATIONS.filter(
    d => d.toLowerCase().includes(destinationSearch.toLowerCase()) && !selectedDestinations.includes(d)
  );

  return (
    <div className="w-full max-w-2xl mx-auto py-4 sm:py-8 px-3 sm:px-4 font-sans text-slate-900">
      
      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* TOP BACK TO HOME & LOGO HEADER (Matching Traveller Login Modal)        */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      <div className="w-full max-w-xl mx-auto flex items-center justify-between mb-5 px-1 shrink-0 gap-2 font-sans">
        <a href="/" className="flex items-center gap-1.5 text-xs font-bold text-white/90 hover:text-white transition-colors bg-white/15 hover:bg-white/25 px-3.5 py-1.5 rounded-full border border-white/25 backdrop-blur-md shadow-sm shrink-0">
          <ArrowLeft className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Back to </span>Home
        </a>
        <a href="/" className="shrink-0">
          <img src="/logo.png?v=8" alt="TravlTik Logo" className="h-6 sm:h-7 w-auto object-contain" />
        </a>
      </div>

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* TOP STEPPER HEADER (Exact Match: 4 Steps)                              */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      {step !== 5 && (
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-xl mx-auto px-2 relative">
            
            {/* Background connecting bar */}
            <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-700/60 -z-0" />
            <div 
              className="absolute top-4 left-6 h-0.5 bg-[#481268] transition-all duration-500 -z-0" 
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
                        ? "bg-[#481268] text-white shadow-sm ring-4 ring-purple-400/30 cursor-pointer"
                        : isActive
                        ? "bg-[#481268] text-white ring-4 ring-purple-300/60 shadow-md scale-105"
                        : "bg-white text-slate-400 border border-slate-200"
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                  </button>
                  <span className={`text-[11px] sm:text-xs font-semibold mt-1.5 transition-colors text-center hidden sm:block ${
                    isActive ? "text-purple-300 font-bold drop-shadow-xs" : isDone ? "text-purple-200 font-semibold" : "text-slate-300"
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
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    clearFieldError("fullName");
                  }}
                  placeholder="Enter your full name"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                    fieldErrors.fullName
                      ? "border-rose-500 ring-2 ring-rose-200/80 bg-rose-50/20 text-rose-900"
                      : "border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#481268] focus:border-transparent"
                  }`}
                />
                {fieldErrors.fullName && (
                  <p className="text-[11px] sm:text-xs text-rose-600 font-bold flex items-center gap-1 mt-1 animate-fade-in">
                    <span>⚠️</span> {fieldErrors.fullName}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearFieldError("email");
                  }}
                  placeholder="Enter your email"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                    fieldErrors.email
                      ? "border-rose-500 ring-2 ring-rose-200/80 bg-rose-50/20 text-rose-900"
                      : "border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#481268] focus:border-transparent"
                  }`}
                />
                {fieldErrors.email && (
                  <p className="text-[11px] sm:text-xs text-rose-600 font-bold flex items-center gap-1 mt-1 animate-fade-in">
                    <span>⚠️</span> {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Mobile Number *
                </label>
                <div className="flex gap-2">
                  <div className="w-28 shrink-0">
                    <CustomDropdown
                      value={mobileCode}
                      onChange={setMobileCode}
                      options={COUNTRY_DIAL_CODES}
                      placeholder="+91"
                    />
                  </div>
                  <input
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      clearFieldError("mobileNumber");
                    }}
                    placeholder="Enter mobile number"
                    className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                      fieldErrors.mobileNumber
                        ? "border-rose-500 ring-2 ring-rose-200/80 bg-rose-50/20 text-rose-900"
                        : "border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#481268] focus:border-transparent"
                    }`}
                  />
                </div>
                {fieldErrors.mobileNumber && (
                  <p className="text-[11px] sm:text-xs text-rose-600 font-bold flex items-center gap-1 mt-1 animate-fade-in">
                    <span>⚠️</span> {fieldErrors.mobileNumber}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      clearFieldError("password");
                    }}
                    placeholder="Enter password"
                    className={`w-full pl-3.5 pr-10 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                      fieldErrors.password
                        ? "border-rose-500 ring-2 ring-rose-200/80 bg-rose-50/20 text-rose-900"
                        : "border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#481268] focus:border-transparent"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="text-[11px] sm:text-xs text-rose-600 font-bold flex items-center gap-1 mt-1 animate-fade-in">
                    <span>⚠️</span> {fieldErrors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      clearFieldError("confirmPassword");
                    }}
                    placeholder="Re-enter password"
                    className={`w-full pl-3.5 pr-10 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                      fieldErrors.confirmPassword
                        ? "border-rose-500 ring-2 ring-rose-200/80 bg-rose-50/20 text-rose-900"
                        : "border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#481268] focus:border-transparent"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {fieldErrors.confirmPassword && (
                  <p className="text-[11px] sm:text-xs text-rose-600 font-bold flex items-center gap-1 mt-1 animate-fade-in">
                    <span>⚠️</span> {fieldErrors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Password Checklist Criteria */}
              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                <div className={`flex items-center gap-1.5 ${isMinLength ? "text-purple-700 font-bold" : "text-slate-400"}`}>
                  <Check className={`w-3.5 h-3.5 ${isMinLength ? "text-purple-700 stroke-[3]" : "text-slate-300"}`} />
                  <span>Minimum 8 characters</span>
                </div>
                <div className={`flex items-center gap-1.5 ${hasUppercase ? "text-purple-700 font-bold" : "text-slate-400"}`}>
                  <Check className={`w-3.5 h-3.5 ${hasUppercase ? "text-purple-700 stroke-[3]" : "text-slate-300"}`} />
                  <span>One uppercase letter</span>
                </div>
                <div className={`flex items-center gap-1.5 ${hasNumber ? "text-purple-700 font-bold" : "text-slate-400"}`}>
                  <Check className={`w-3.5 h-3.5 ${hasNumber ? "text-purple-700 stroke-[3]" : "text-slate-300"}`} />
                  <span>One number</span>
                </div>
                <div className={`flex items-center gap-1.5 ${hasSpecial ? "text-purple-700 font-bold" : "text-slate-400"}`}>
                  <Check className={`w-3.5 h-3.5 ${hasSpecial ? "text-purple-700 stroke-[3]" : "text-slate-300"}`} />
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
                    className="mt-0.5 w-4 h-4 rounded text-[#481268] focus:ring-[#481268] accent-[#481268] cursor-pointer"
                  />
                  <span>
                    I agree to TravlTik's{" "}
                    <a href="/terms" target="_blank" className="font-bold text-[#481268] hover:underline">
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" target="_blank" className="font-bold text-[#481268] hover:underline">
                      Privacy Policy
                    </a>
                  </span>
                </label>
              </div>

              {/* Action Button: Create Account */}
              <button
                type="submit"
                className="w-full mt-3 py-3.5 px-4 bg-[#481268] hover:bg-[#3b0e56] text-white font-bold text-sm rounded-2xl shadow-md transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Already have account */}
              <div className="text-center pt-2 text-xs text-slate-500">
                Already have an account?{" "}
                <a href="/login" className="font-bold text-[#481268] hover:underline">
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
                <span className="text-[#481268]">50% Completed</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
                <div className="w-1/2 h-full bg-[#481268] rounded-full transition-all duration-300" />
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
                onChange={(e) => {
                  setBusinessName(e.target.value);
                  clearFieldError("businessName");
                }}
                placeholder="Enter business or company name"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                  fieldErrors.businessName
                    ? "border-rose-500 ring-2 ring-rose-200/80 bg-rose-50/20 text-rose-900"
                    : "border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#481268] focus:border-transparent"
                }`}
              />
              {fieldErrors.businessName && (
                <p className="text-[11px] sm:text-xs text-rose-600 font-bold flex items-center gap-1 mt-1 animate-fade-in">
                  <span>⚠️</span> {fieldErrors.businessName}
                </p>
              )}
            </div>

            {/* Business Type */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Business Type *
              </label>
              <CustomDropdown
                value={businessType}
                onChange={(val) => {
                  setBusinessType(val);
                  clearFieldError("businessType");
                }}
                options={BUSINESS_TYPES}
                placeholder="Select Business Type"
                hasError={Boolean(fieldErrors.businessType)}
              />
              {fieldErrors.businessType && (
                <p className="text-[11px] sm:text-xs text-rose-600 font-bold flex items-center gap-1 mt-1 animate-fade-in">
                  <span>⚠️</span> {fieldErrors.businessType}
                </p>
              )}
            </div>

            {/* Year Established */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Year Established
              </label>
              <CustomDropdown
                value={yearEstablished}
                onChange={setYearEstablished}
                options={ESTABLISHED_YEARS}
                placeholder="Select Year Established"
              />
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
                onChange={(e) => {
                  setBusinessEmail(e.target.value);
                  clearFieldError("businessEmail");
                }}
                placeholder="Enter business email"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                  fieldErrors.businessEmail
                    ? "border-rose-500 ring-2 ring-rose-200/80 bg-rose-50/20 text-rose-900"
                    : "border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#481268] focus:border-transparent"
                }`}
              />
              {fieldErrors.businessEmail && (
                <p className="text-[11px] sm:text-xs text-rose-600 font-bold flex items-center gap-1 mt-1 animate-fade-in">
                  <span>⚠️</span> {fieldErrors.businessEmail}
                </p>
              )}
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
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#481268] focus:border-transparent transition-all"
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#481268] focus:border-transparent transition-all"
              />
            </div>

            {/* Location: Country & State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Country *
                </label>
                <CustomDropdown
                  value={country}
                  onChange={(val) => {
                    setCountry(val);
                    clearFieldError("country");
                  }}
                  options={BUSINESS_COUNTRIES}
                  placeholder="Select Country"
                  hasError={Boolean(fieldErrors.country)}
                />
                {fieldErrors.country && (
                  <p className="text-[11px] sm:text-xs text-rose-600 font-bold flex items-center gap-1 mt-1 animate-fade-in">
                    <span>⚠️</span> {fieldErrors.country}
                  </p>
                )}
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#481268] transition-all"
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
                onChange={(e) => {
                  setCity(e.target.value);
                  clearFieldError("city");
                }}
                placeholder="Enter city"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                  fieldErrors.city
                    ? "border-rose-500 ring-2 ring-rose-200/80 bg-rose-50/20 text-rose-900"
                    : "border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#481268] transition-all"
                }`}
              />
              {fieldErrors.city && (
                <p className="text-[11px] sm:text-xs text-rose-600 font-bold flex items-center gap-1 mt-1 animate-fade-in">
                  <span>⚠️</span> {fieldErrors.city}
                </p>
              )}
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
                onChange={(e) => {
                  setBusinessAddress(e.target.value);
                  clearFieldError("businessAddress");
                }}
                placeholder="Enter full business address"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                  fieldErrors.businessAddress
                    ? "border-rose-500 ring-2 ring-rose-200/80 bg-rose-50/20 text-rose-900"
                    : "border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-[#481268] transition-all"
                }`}
              />
              {fieldErrors.businessAddress && (
                <p className="text-[11px] sm:text-xs text-rose-600 font-bold flex items-center gap-1 mt-1 animate-fade-in">
                  <span>⚠️</span> {fieldErrors.businessAddress}
                </p>
              )}
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#481268] transition-all"
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
                className="px-8 py-3 rounded-2xl bg-[#481268] hover:bg-[#3b0e56] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-[0.99] cursor-pointer flex items-center gap-2"
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
                <span className="text-[#481268]">75% Completed</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
                <div className="w-3/4 h-full bg-[#481268] rounded-full transition-all duration-300" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Your Services & Expertise
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Select the services you provide and destinations you specialize in.
              </p>
            </div>

            {/* 3x3 Grid of Services */}
            <div className={`transition-all ${fieldErrors.selectedServices ? "p-3 rounded-2xl border-2 border-rose-400 bg-rose-50/20" : ""}`}>
              <div className="flex items-center justify-between mb-2.5">
                <label className="block text-xs font-bold text-slate-800">
                  I provide services as (Select all that apply) *
                </label>
                {fieldErrors.selectedServices && (
                  <span className="text-[11px] sm:text-xs text-rose-600 font-bold flex items-center gap-1 animate-fade-in">
                    ⚠️ Please select this field
                  </span>
                )}
              </div>
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
                          ? "border-2 border-[#481268] bg-purple-50/50 shadow-xs"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                      }`}
                    >
                      {/* Checkmark indicator */}
                      <div className="flex items-center justify-between w-full mb-2">
                        <div className={`p-1.5 rounded-xl ${isSelected ? "bg-[#481268] text-white" : "bg-slate-100 text-slate-600"}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                          isSelected ? "border-[#481268] bg-[#481268] text-white" : "border-slate-300 bg-white"
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
            <div className={`transition-all ${fieldErrors.selectedDestinations ? "p-3 rounded-2xl border-2 border-rose-400 bg-rose-50/20" : ""}`}>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-800">
                  Destinations you specialize in (Select all that apply) *
                </label>
                {fieldErrors.selectedDestinations && (
                  <span className="text-[11px] sm:text-xs text-rose-600 font-bold flex items-center gap-1 animate-fade-in">
                    ⚠️ Please select this field
                  </span>
                )}
              </div>

              {/* Country search input */}
              <div className="relative mb-3">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={destinationSearch}
                  onChange={(e) => setDestinationSearch(e.target.value)}
                  placeholder="Search countries..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#481268] transition-all"
                />
              </div>

              {/* Selected Country Pills */}
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {selectedDestinations.map(d => (
                  <span
                    key={d}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 border border-purple-200 text-[#481268] text-xs font-bold rounded-full"
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
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-800">
                  Years of Experience *
                </label>
                {fieldErrors.experience && (
                  <span className="text-[11px] sm:text-xs text-rose-600 font-bold flex items-center gap-1 animate-fade-in">
                    ⚠️ Please select this field
                  </span>
                )}
              </div>
              <CustomDropdown
                value={experience}
                onChange={(val) => {
                  setExperience(val);
                  clearFieldError("experience");
                }}
                options={EXPERIENCE_OPTIONS}
                placeholder="Select Years of Experience"
                hasError={Boolean(fieldErrors.experience)}
              />
            </div>

            {/* Languages Spoken */}
            <div className={`transition-all ${fieldErrors.selectedLanguages ? "p-3 rounded-2xl border-2 border-rose-400 bg-rose-50/20" : ""}`}>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-800">
                  Languages Spoken *
                </label>
                {fieldErrors.selectedLanguages && (
                  <span className="text-[11px] sm:text-xs text-rose-600 font-bold flex items-center gap-1 animate-fade-in">
                    ⚠️ Please select this field
                  </span>
                )}
              </div>
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
                          ? "border-[#481268] bg-[#481268] text-white shadow-2xs"
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
                className="px-8 py-3 rounded-2xl bg-[#481268] hover:bg-[#3b0e56] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-[0.99] cursor-pointer flex items-center gap-2"
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
            {isVerifyingEmail ? (
              /* ─── Email Verification Screen (Code sent to Email) ─── */
              <div className="space-y-6 animate-fade-in text-center py-2 sm:py-4">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#481268] shadow-inner">
                  <Mail className="w-8 h-8" />
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Verify Your Email
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-sm mx-auto leading-relaxed">
                    We sent a 6-digit verification code to{" "}
                    <span className="font-bold text-slate-900 break-all">{businessEmail || email}</span>.
                    Enter the code below to complete your registration and access your dashboard.
                  </p>
                </div>

                {/* Status Banners */}
                {otpSuccessMsg && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs sm:text-sm rounded-2xl font-semibold flex items-center justify-center gap-2 max-w-md mx-auto">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>{otpSuccessMsg}</span>
                  </div>
                )}

                {otpError && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-600 text-xs sm:text-sm rounded-2xl font-semibold flex items-center justify-center gap-2 max-w-md mx-auto">
                    <span className="shrink-0 text-base">⚠️</span>
                    <span>{otpError}</span>
                  </div>
                )}

                {/* 6-Digit OTP Input Boxes */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 py-2">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => { otpInputRefs.current[idx] = el; }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      value={digit}
                      onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-11 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-black rounded-2xl border-2 border-slate-300 focus:border-[#481268] focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all bg-white text-slate-900 shadow-2xs"
                      autoFocus={idx === 0}
                    />
                  ))}
                </div>

                {/* Verify & Proceed Button */}
                <button
                  type="button"
                  onClick={() => handleVerifyAndSubmit()}
                  disabled={isVerifyingOtp || otpDigits.some(d => !d)}
                  className="w-full max-w-md mx-auto py-4 px-6 bg-[#481268] hover:bg-[#3b0e56] text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-50"
                >
                  {isVerifyingOtp ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Verifying & Setting Up Dashboard...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Verify Code & Go to Dashboard</span>
                    </>
                  )}
                </button>

                {/* Resend Code Section */}
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
                  <span>Didn't receive the code?</span>
                  {resendCooldown > 0 ? (
                    <span className="font-semibold text-slate-400">Resend in {resendCooldown}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isSendingOtp}
                      className="font-bold text-[#481268] hover:underline cursor-pointer disabled:opacity-50"
                    >
                      {isSendingOtp ? "Sending..." : "Resend Code"}
                    </button>
                  )}
                </div>

                {/* Back to Edit Details */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => { setIsVerifyingEmail(false); setOtpError(""); setOtpSuccessMsg(""); }}
                    className="text-xs font-bold text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
                  >
                    ← Back to Review & Edit Details
                  </button>
                </div>
              </div>
            ) : (
              /* ─── Standard Step 4 Review & Submit ─── */
              <>
                {/* Top Indicator */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-1.5">
                    <span>Step 4 of 4</span>
                    <span className="text-[#481268]">100% Completed</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
                    <div className="w-full h-full bg-[#481268] rounded-full transition-all duration-300" />
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
                      className="text-xs font-bold text-[#481268] hover:underline cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>

                  {/* Item: Business Name */}
                  <div className="flex items-start gap-3 text-xs sm:text-sm">
                    <div className="p-1.5 rounded-lg bg-purple-50 text-[#481268] shrink-0 mt-0.5">
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-slate-400">Business Name</div>
                      <div className="font-bold text-slate-800">{businessName || "Not provided"}</div>
                    </div>
                  </div>

                  {/* Item: Business Type */}
                  <div className="flex items-start gap-3 text-xs sm:text-sm">
                    <div className="p-1.5 rounded-lg bg-purple-50 text-[#481268] shrink-0 mt-0.5">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-slate-400">Business Type</div>
                      <div className="font-bold text-slate-800">{businessType}</div>
                    </div>
                  </div>

                  {/* Item: Services */}
                  <div className="flex items-start gap-3 text-xs sm:text-sm">
                    <div className="p-1.5 rounded-lg bg-purple-50 text-[#481268] shrink-0 mt-0.5">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-slate-400">Services</div>
                      <div className="font-bold text-slate-800">{selectedServices.join(", ")}</div>
                    </div>
                  </div>

                  {/* Item: Destinations */}
                  <div className="flex items-start gap-3 text-xs sm:text-sm">
                    <div className="p-1.5 rounded-lg bg-purple-50 text-[#481268] shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-slate-400">Destinations</div>
                      <div className="font-bold text-slate-800">{selectedDestinations.join(", ")}</div>
                    </div>
                  </div>

                  {/* Item: Experience */}
                  <div className="flex items-start gap-3 text-xs sm:text-sm">
                    <div className="p-1.5 rounded-lg bg-purple-50 text-[#481268] shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-slate-400">Experience</div>
                      <div className="font-bold text-slate-800">{experience}</div>
                    </div>
                  </div>

                  {/* Item: Languages */}
                  <div className="flex items-start gap-3 text-xs sm:text-sm">
                    <div className="p-1.5 rounded-lg bg-purple-50 text-[#481268] shrink-0 mt-0.5">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-slate-400">Languages</div>
                      <div className="font-bold text-slate-800">{selectedLanguages.join(", ")}</div>
                    </div>
                  </div>
                </div>

                {/* Confirmation Box */}
                <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-purple-50/50 border border-purple-200/80 text-[11px] sm:text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#481268] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    By submitting, you confirm that all the information provided is accurate and you agree to our{" "}
                    <a href="/terms" target="_blank" className="font-bold text-[#481268] hover:underline">
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

                {/* Submit Application Button: sends 6-digit verification code to email */}
                <button
                  type="button"
                  onClick={handleInitiateEmailVerification}
                  disabled={isSendingOtp || isSubmitting}
                  className="w-full py-4 px-6 bg-[#481268] hover:bg-[#3b0e56] text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-75"
                >
                  {isSendingOtp ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending Verification Code...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>

                {/* Footer subtext */}
                <p className="text-center text-xs text-slate-400 font-medium">
                  We will send a 6-digit verification code to your email upon submission.
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
              </>
            )}
          </div>
        )}

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* STEP 5: CELEBRATION / SUCCESS SCREEN                                 */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        {step === 5 && (
          <div className="text-center py-6 sm:py-8 space-y-4 animate-fade-in">
            {/* Animated Badge */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#481268] shadow-inner animate-bounce">
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
                <li>You can now access your Service Provider Dashboard to customize your profile and consultation fees.</li>
              </ul>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto">
              <a
                href="/service-provider/dashboard"
                className="w-full sm:w-auto py-3.5 px-6 bg-[#481268] hover:bg-[#3b0e56] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all text-center"
              >
                Go to Service Provider Dashboard
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
