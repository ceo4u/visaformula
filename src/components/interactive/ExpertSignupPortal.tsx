import React, { useState, useEffect, useRef } from "react";
import { 
  CheckCircle, ArrowLeft, ArrowRight, Upload, Plus, X, 
  User, FileText, Globe, Star, Shield, ArrowUpRight, 
  MessageSquare, Briefcase, Mail, Phone, ExternalLink, 
  Building, CheckSquare, Sparkles, MapPin, Lock, LayoutDashboard, ChevronDown, Edit2, Eye, EyeOff
} from "lucide-react";
import { useAuth, AuthProvider } from "../providers/auth-provider";

// ─── Custom Dropdown (no browser-blue) ───────────────────────────────────────
interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}
function CustomSelect({ value, onChange, options, className = "" }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = options.find(o => o.value === value);

  return (
    <div ref={ref} className={`relative ${className}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-900 outline-none hover:border-[#00a896] focus:border-[#00a896] transition-colors cursor-pointer"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <span>{selected?.label || "Select..."}</span>
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-50 top-full mt-1.5 left-0 right-0 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                opt.value === value
                  ? "bg-slate-900 text-white font-semibold"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

function ExpertSignupPortalContent() {
  // Wizard Step State: 1 (Business Info), 2 (Services & Expertise), 3 (Location & Verification), 3.5 (OTP Modal), 4 (Congratulations / Done)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);

  // --- Step 1: Business Info States ---
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [businessType, setBusinessType] = useState("");
  const [yearsInBusiness, setYearsInBusiness] = useState("");
  const [businessWebsite, setBusinessWebsite] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);

  // --- Step 2: Services & Expertise States ---
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [consultationMode, setConsultationMode] = useState<"Online" | "In Office" | "Both" | "">("");
  const [customServiceInput, setCustomServiceInput] = useState("");
  const [showAddCustomService, setShowAddCustomService] = useState(false);

  // --- Step 3: Location & Verification States ---
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");
  const [pinLocation, setPinLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [docUploads, setDocUploads] = useState<Record<string, boolean | string>>({
    businessReg: false,
    profLicense: false,
    officePhoto: false,
    govId: false
  });

  // --- Step 3.5: OTP Verification States ---
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(""));
  const [resendCooldown, setResendCooldown] = useState(30);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [tempEmail, setTempEmail] = useState("");

  const [validationError, setValidationError] = useState("");
  const { signInWithGoogle } = useAuth();
  const [googleLoading, setGoogleLoading] = useState(false);

  // Available options
  const defaultServices = [
    "Student Visa", "Visitor Visa", "PR / Permanent Residency", "Work Visa", 
    "Business Visa", "Dependent Visa", "Investor Visa", "Citizenship", 
    "Appeals / Tribunal", "University Admissions", "Jobs Abroad", "Travel Insurance"
  ];

  const defaultCountries = [
    { name: "Canada", flag: "🇨🇦" },
    { name: "Australia", flag: "🇦🇺" },
    { name: "UK", flag: "🇬🇧" },
    { name: "USA", flag: "🇺🇸" },
    { name: "Germany", flag: "🇩🇪" },
    { name: "New Zealand", flag: "🇳🇿" },
    { name: "UAE", flag: "🇦🇪" },
    { name: "Europe", flag: "🇪🇺" },
    { name: "Singapore", flag: "🇸🇬" },
    { name: "Other", flag: "🌐" }
  ];

  const defaultLanguages = ["English", "Hindi", "Telugu", "Tamil", "Punjabi", "Arabic", "French", "Other"];

  // Auto-restore draft from localStorage on mount so details never vanish
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("expert_isLoggedIn");
      if (isLoggedIn === "true") {
        setCurrentStep(4);
        return;
      }
      try {
        const savedDraft = localStorage.getItem("expert_form_draft");
        if (savedDraft) {
          const draft = JSON.parse(savedDraft);
          if (draft.firstName && draft.firstName !== "Google") setFirstName(draft.firstName);
          if (draft.lastName && draft.lastName !== "User") setLastName(draft.lastName);
          if (draft.businessName) setBusinessName(draft.businessName);
          if (draft.businessType) setBusinessType(draft.businessType);
          if (draft.yearsInBusiness) setYearsInBusiness(draft.yearsInBusiness);
          if (draft.businessWebsite) setBusinessWebsite(draft.businessWebsite);
          if (draft.businessDescription) setBusinessDescription(draft.businessDescription);
          if (draft.companyLogo) setCompanyLogo(draft.companyLogo);
          if (draft.selectedServices) setSelectedServices(draft.selectedServices);
          if (draft.selectedCountries) setSelectedCountries(draft.selectedCountries);
          if (draft.selectedLanguages) setSelectedLanguages(draft.selectedLanguages);
          if (draft.consultationMode) setConsultationMode(draft.consultationMode);
          if (draft.country) setCountry(draft.country);
          if (draft.state) setState(draft.state);
          if (draft.city) setCity(draft.city);
          if (draft.streetAddress) setStreetAddress(draft.streetAddress);
          if (draft.landmark) setLandmark(draft.landmark);
          if (draft.pinCode) setPinCode(draft.pinCode);
          if (draft.phoneNumber) setPhoneNumber(draft.phoneNumber);
          if (draft.whatsappNumber) setWhatsappNumber(draft.whatsappNumber);
          if (draft.emailAddress) setEmailAddress(draft.emailAddress);
          if (draft.currentStep && draft.currentStep >= 1 && draft.currentStep <= 3) {
            setCurrentStep(draft.currentStep);
          }
        }
      } catch (e) {}
    }
  }, []);

  // Auto-save draft to localStorage whenever fields change
  useEffect(() => {
    if (typeof window !== "undefined" && currentStep >= 1 && currentStep <= 3) {
      try {
        const draft = {
          firstName, lastName, businessName, businessType, yearsInBusiness,
          businessWebsite, businessDescription, companyLogo,
          selectedServices, selectedCountries, selectedLanguages, consultationMode,
          country, state, city, streetAddress, landmark, pinCode,
          phoneNumber, whatsappNumber, emailAddress, currentStep
        };
        localStorage.setItem("expert_form_draft", JSON.stringify(draft));
      } catch (e) {}
    }
  }, [
    firstName, lastName, businessName, businessType, yearsInBusiness,
    businessWebsite, businessDescription, companyLogo,
    selectedServices, selectedCountries, selectedLanguages, consultationMode,
    country, state, city, streetAddress, landmark, pinCode,
    phoneNumber, whatsappNumber, emailAddress, currentStep
  ]);

  useEffect(() => {
    let timer: any;
    if (resendCooldown > 0) {
      timer = setInterval(() => setResendCooldown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Google OAuth Signup
  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    setValidationError("");
    try {
      const res = await signInWithGoogle();
      if (res) {
        if (res.email) setEmailAddress(res.email);
        if (res.name) setBusinessName(res.name);
        setCurrentStep(1);
      }
    } catch (e: any) {
      setValidationError("Google Auth failed. Please try again or use Email.");
    } finally {
      setGoogleLoading(false);
    }
  };

  // Toggle helpers
  const toggleService = (svc: string) => {
    setSelectedServices(prev => prev.includes(svc) ? prev.filter(x => x !== svc) : [...prev, svc]);
  };

  const toggleCountry = (ctry: string) => {
    setSelectedCountries(prev => prev.includes(ctry) ? prev.filter(x => x !== ctry) : [...prev, ctry]);
  };

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages(prev => prev.includes(lang) ? prev.filter(x => x !== lang) : [...prev, lang]);
  };

  const handleAddCustomService = () => {
    if (customServiceInput.trim()) {
      setSelectedServices(prev => [...prev, customServiceInput.trim()]);
      setCustomServiceInput("");
      setShowAddCustomService(false);
    }
  };

  // Step Navigators
  const goToNextStep = (target: number) => {
    setValidationError("");
    if (currentStep === 1) {
      if (!firstName.trim() || !lastName.trim()) {
        setValidationError("Please enter your First Name and Last Name.");
        return;
      }
      if (!businessName.trim()) {
        setValidationError("Please enter your Business Name.");
        return;
      }
      if (!password) {
        setValidationError("Please create a Password for your account.");
        return;
      }
      if (password.length < 6) {
        setValidationError("Password must be at least 6 characters long.");
        return;
      }
      if (password !== confirmPassword) {
        setValidationError("Passwords do not match. Please verify and try again.");
        return;
      }
      if (!businessDescription.trim()) {
        setValidationError("Please provide a brief Business Description.");
        return;
      }
    }
    if (currentStep === 2) {
      if (selectedServices.length === 0) {
        setValidationError("Please select at least one service you offer.");
        return;
      }
    }
    setCurrentStep(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [sendingOtp, setSendingOtp] = useState(false);

  const sendVerificationEmail = async (targetEmail: string) => {
    setSendingOtp(true);
    setOtpError("");
    try {
      const res = await fetch("/api/auth/send-verification-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.warn("[ExpertSignupPortal] OTP send response:", data);
      }
    } catch (e) {
      console.error("[ExpertSignupPortal] OTP send error:", e);
    } finally {
      setSendingOtp(false);
    }
  };

  // Trigger OTP Verification on "Complete & Continue" — dispatches real Resend email
  const handleCompleteAndContinue = () => {
    setValidationError("");
    if (!phoneNumber.trim()) {
      setValidationError("Please enter your Phone Number.");
      return;
    }
    if (!emailAddress.trim()) {
      setValidationError("Please enter your Email Address.");
      return;
    }
    setShowOtpModal(true);
    setResendCooldown(30);
    sendVerificationEmail(emailAddress);
  };

  // Verify OTP and complete registration — saves full profile to localStorage so FindExpertsPortal lists this expert
  const handleVerifyOtp = async () => {
    const code = otpDigits.join("");
    if (code.length < 6) {
      setOtpError("Please enter the complete 6-digit verification code.");
      return;
    }

    setVerifyingOtp(true);
    setOtpError("");

    try {
      const res = await fetch("/api/auth/verify-email-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailAddress, code }),
      });
      const data = await res.json();
      if (!res.ok && data.status === "error") {
        setOtpError(data.message || "Invalid verification code. Please check and try again.");
        setVerifyingOtp(false);
        return;
      }
    } catch (e) {
      console.warn("[handleVerifyOtp] Verification fallback mode:", e);
    }

    setTimeout(() => {
      if (typeof window !== "undefined") {
        // Core identity
        localStorage.setItem("expert_isLoggedIn", "true");
        localStorage.setItem("expert_firstName", firstName);
        localStorage.setItem("expert_lastName", lastName);
        localStorage.setItem("expert_businessName", businessName || `${firstName} ${lastName}`.trim() || "VisaFormula Consultant");
        localStorage.setItem("expert_businessType", businessType);
        localStorage.setItem("expert_yearsInBusiness", yearsInBusiness);
        localStorage.setItem("expert_businessWebsite", businessWebsite);
        localStorage.setItem("expert_businessDescription", businessDescription);
        if (companyLogo) localStorage.setItem("expert_profilePhoto", companyLogo);

        // Contact
        localStorage.setItem("expert_email", emailAddress);
        localStorage.setItem("expert_contactNumber", phoneNumber);
        localStorage.setItem("expert_whatsapp", whatsappNumber);

        // Address — detailed
        localStorage.setItem("expert_streetAddress", streetAddress);
        localStorage.setItem("expert_landmark", landmark);
        localStorage.setItem("expert_pinCode", pinCode);
        localStorage.setItem("expert_city", city);
        localStorage.setItem("expert_state", state);
        localStorage.setItem("expert_country", country);
        localStorage.setItem("expert_officeAddress", [streetAddress, landmark, city, state, country].filter(Boolean).join(", "));

        // Services & expertise
        localStorage.setItem("expert_services", JSON.stringify(selectedServices));
        localStorage.setItem("expert_countries", JSON.stringify(selectedCountries));
        localStorage.setItem("expert_languages", JSON.stringify(selectedLanguages));
        localStorage.setItem("expert_consultationMode", consultationMode);
        localStorage.setItem("expert_expertiseTags", JSON.stringify(selectedServices));
        localStorage.setItem("expert_countriesExpertise", selectedCountries.join(", "));
        localStorage.setItem("expert_advisorType", businessType || "Visa Consultant");

        // Add to global experts list for FindExpertsPortal
        const fullName = businessName || `${firstName} ${lastName}`.trim() || "VisaFormula Consultant";
        const newExpert = {
          id: `expert-${Date.now()}`,
          name: fullName,
          category: selectedServices.some(s => s.toLowerCase().includes("student")) ? "student"
                  : selectedServices.some(s => s.toLowerCase().includes("work") || s.toLowerCase().includes("permit")) ? "work"
                  : "pr",
          role: businessType || "Visa Consultant",
          rating: 5.0,
          reviews: 1,
          price: 1500,
          city: city || "Remote",
          countries: selectedCountries.length > 0 ? selectedCountries : ["India"],
          experience: yearsInBusiness === "Less than 1 year" ? 1
                    : yearsInBusiness === "1-2 years" ? 2
                    : yearsInBusiness === "3-5 years" ? 4
                    : yearsInBusiness === "5-10 years" ? 7
                    : yearsInBusiness === "10+ years" ? 12 : 5,
          isRemote: consultationMode === "Online" || consultationMode === "Both",
          isAvailableToday: true,
          isEmergency: false,
          tags: selectedServices.slice(0, 3),
          image: companyLogo || "",
        };

        let existingList: any[] = [];
        try {
          const stored = localStorage.getItem("visaformula_all_experts");
          if (stored) existingList = JSON.parse(stored);
        } catch(e) {}

        const alreadyExists = existingList.some((e: any) => e.name?.toLowerCase() === fullName.toLowerCase());
        if (!alreadyExists) {
          existingList = [newExpert, ...existingList];
          localStorage.setItem("visaformula_all_experts", JSON.stringify(existingList));
        }

        // Complete Expert DB Registration
        fetch("/api/register/expert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            business_name: businessName || `${firstName} ${lastName}`.trim(),
            email: emailAddress,
            password: password,
            contact_number: phoneNumber,
            advisor_type: businessType || "Freelancer",
            about_me: businessDescription,
            portfolio_link: businessWebsite,
            office_address: [streetAddress, landmark, city, state, country].filter(Boolean).join(", "),
            gov_registration_number: registrationNumber,
            expertise_tags: selectedServices,
            countries_expertise: selectedCountries
          })
        }).catch(e => console.warn("Expert DB reg error:", e));

        // Send Welcome Email instantly via Resend
        fetch("/api/auth/send-welcome-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailAddress,
            firstName: firstName || businessName,
            displayName: businessName || `${firstName} ${lastName}`.trim(),
            userType: "expert",
          }),
        }).catch(e => console.error("Welcome email send error:", e));

      }
      setVerifyingOtp(false);
      setShowOtpModal(false);
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);
  };

  const handleDigitChange = (val: string, idx: number) => {
    const clean = val.replace(/\D/g, "").slice(-1);
    const updated = [...otpDigits];
    updated[idx] = clean;
    setOtpDigits(updated);
    setOtpError("");

    if (clean && idx < 5) {
      const nextInput = document.getElementById(`reg-otp-box-${idx + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleDigitKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !otpDigits[idx] && idx > 0) {
      const prevInput = document.getElementById(`reg-otp-box-${idx - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div className="w-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Top-left fixed Back button — steps back when in wizard, goes home when on step 1 */}
      {currentStep !== 4 && (
        <div className="fixed top-4 left-4 z-40 pointer-events-auto">
          <button
            type="button"
            onClick={() => {
              if (currentStep > 1) {
                setCurrentStep(prev => prev - 1);
              } else {
                window.location.href = "/";
              }
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-white/20 hover:bg-white/30 transition-all px-4 py-2 rounded-full border border-white/30 backdrop-blur-md shadow-md cursor-pointer active:scale-95"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentStep > 1 ? "Back" : "Back to Home"}</span>
          </button>
        </div>
      )}

      <div className="w-full">
        
        {/* Validation error message */}
        {validationError && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-2xl text-center shadow-xs">
            {validationError}
          </div>
        )}

        {/* SCREEN 0: INITIAL START OPTIONS ("Create your account") */}
        {currentStep === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/90">
            
            {/* Left Options Box */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Create your account</h1>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="text-sm text-slate-500 mt-1.5">Welcome! Sign up to get started as a verified consultant</p>
              </div>

              <div className="space-y-3">
                {/* Google Button */}
                <button
                  onClick={handleGoogleSignup}
                  disabled={googleLoading}
                  className="w-full py-3.5 px-5 bg-white hover:bg-slate-50 border border-slate-300 rounded-2xl font-semibold text-slate-800 flex items-center justify-center gap-3 transition-all shadow-sm cursor-pointer text-sm"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {googleLoading ? (
                    <svg className="animate-spin w-4 h-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                  )}
                  <span>{googleLoading ? "Signing in with Google..." : "Continue with Google"}</span>
                </button>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-widest absolute" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>OR</span>
              </div>

              <button
                onClick={() => setCurrentStep(1)}
                className="w-full py-3.5 px-5 bg-[#00a896] hover:bg-[#008f80] text-white rounded-2xl font-bold flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer active:scale-98 text-sm"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <Mail className="w-4.5 h-4.5" />
                <span>Continue with Email</span>
              </button>

              <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <Lock className="w-3 h-3" />
                <span>Your data is safe with us. We never post on your behalf.</span>
              </p>
            </div>

            {/* Right "Why register on VisaFormula?" Card */}
            <div className="md:col-span-5 bg-teal-50/60 border border-teal-200/60 rounded-3xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <Shield className="w-4.5 h-4.5 text-[#00a896] shrink-0" />
                <span>Why register on VisaFormula?</span>
              </h3>

              <ul className="space-y-3 text-xs font-bold text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#00a896] shrink-0 mt-0.5" />
                  <span>Get quality visa related enquiries</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#00a896] shrink-0 mt-0.5" />
                  <span>Build trust with Verified Badge</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#00a896] shrink-0 mt-0.5" />
                  <span>Grow your business globally</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#00a896] shrink-0 mt-0.5" />
                  <span>Manage everything in one place</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* WIZARD CONTAINER FOR STEPS 1, 2, 3 */}
        {currentStep >= 1 && currentStep <= 3 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/90 space-y-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            
            {/* STEP HEADER & WIZARD PROGRESS BAR */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="bg-teal-100 text-[#00a896] text-[10px] font-bold px-3 py-1 rounded-full border border-teal-200 uppercase tracking-wider" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  STEP {currentStep}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {currentStep === 1 && "Business Information"}
                  {currentStep === 2 && "Services & Expertise"}
                  {currentStep === 3 && "Location & Verification"}
                </h2>
                <p className="text-sm text-slate-500 mt-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {currentStep === 1 && "Tell us about your business"}
                  {currentStep === 2 && "Tell us about your services"}
                  {currentStep === 3 && "Help clients find and trust you"}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-black text-[#00a896] bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200">
                  {currentStep}/3
                </span>
              </div>
            </div>

            {/* Progress Bar Indicator */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#00a896] h-full transition-all duration-300 ease-out"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>

            {/* STEP 1: BUSINESS INFORMATION */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-premium-fade" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

                {/* First Name + Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>First Name *</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter your first name"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-900 outline-none focus:border-[#00a896]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Last Name *</label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter your last name"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-900 outline-none focus:border-[#00a896]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    />
                  </div>
                </div>

                {/* Business Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Business Name *</label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Enter your business name"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-900 outline-none focus:border-[#00a896]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  />
                </div>

                {/* Password & Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Password *</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password (min 6 chars)"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-900 outline-none focus:border-[#00a896] pr-10"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Confirm Password *</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter your password"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-900 outline-none focus:border-[#00a896] pr-10"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Business Type *</label>
                    <CustomSelect
                      value={businessType}
                      onChange={setBusinessType}
                      options={[
                        { value: "Registered consultancy", label: "Registered consultancy" },
                        { value: "Authorised immigration / visa appeal lawyer", label: "Authorised immigration / visa appeal lawyer" },
                        { value: "Education & Training Institute", label: "Education & Training Institute" },
                        { value: "Freelancer", label: "Freelancer" },
                        { value: "Employer / HR agency", label: "Employer / HR agency" },
                        { value: "Tour operator", label: "Tour operator" },
                      ]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Years in Business *</label>
                    <CustomSelect
                      value={yearsInBusiness}
                      onChange={setYearsInBusiness}
                      options={[
                        { value: "Less than 1 year", label: "Less than 1 year" },
                        { value: "1-2 years", label: "1-2 years" },
                        { value: "3-5 years", label: "3-5 years" },
                        { value: "5-10 years", label: "5-10 years" },
                        { value: "10+ years", label: "10+ years" },
                      ]}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-900 mb-1.5">Business Website</label>
                  <input
                    type="url"
                    value={businessWebsite}
                    onChange={(e) => setBusinessWebsite(e.target.value)}
                    placeholder="https://www.yourwebsite.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-semibold text-slate-900 outline-none focus:border-[#00a896]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Company Logo</label>
                    <label
                      htmlFor="company-logo-upload"
                      className="block border-2 border-dashed border-slate-300 rounded-2xl p-5 text-center bg-slate-50/50 hover:bg-slate-50 hover:border-[#00a896] transition-all cursor-pointer group"
                    >
                      {companyLogo ? (
                        <div className="relative">
                          <img
                            src={companyLogo}
                            alt="Company Logo"
                            className="w-20 h-20 object-contain rounded-xl mx-auto border border-slate-200"
                          />
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); setCompanyLogo(null); }}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold hover:bg-rose-600"
                          >
                            ×
                          </button>
                          <p className="text-[11px] font-semibold text-[#00a896] mt-2">✓ Logo uploaded — click to change</p>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-7 h-7 text-slate-400 group-hover:text-[#00a896] mx-auto mb-2 transition-colors" />
                          <p className="text-xs font-bold text-slate-700" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Click to upload logo</p>
                          <p className="text-[10px] font-semibold text-slate-400 mt-1">PNG, JPG (Max 2MB)</p>
                        </>
                      )}
                    </label>
                    <input
                      id="company-logo-upload"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        if (file.size > 2 * 1024 * 1024) {
                          setValidationError("Logo file size must be under 2MB.");
                          return;
                        }
                        const reader = new FileReader();
                        reader.onload = (ev) => setCompanyLogo(ev.target?.result as string);
                        reader.readAsDataURL(file);
                      }}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-extrabold text-slate-900">Business Description *</label>
                      <span className="text-[10px] font-bold text-slate-400">{businessDescription.length}/300</span>
                    </div>
                    <textarea
                      maxLength={300}
                      rows={4}
                      value={businessDescription}
                      onChange={(e) => setBusinessDescription(e.target.value)}
                      placeholder="Briefly describe your business and services you offer..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-semibold text-slate-900 outline-none focus:border-[#00a896] resize-none"
                    />
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-[#00a896]" />
                    <span>We save your progress automatically</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => goToNextStep(2)}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#00a896] hover:bg-[#008f80] text-white font-extrabold text-xs rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SERVICES & EXPERTISE */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-premium-fade">
                
                {/* Services You Offer */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-extrabold text-slate-900">Services You Offer (Select all that apply)</label>
                  <div className="flex flex-wrap gap-2">
                    {defaultServices.map((svc, i) => {
                      const isSelected = selectedServices.includes(svc);
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => toggleService(svc)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#00a896] text-white border-[#00a896] shadow-2xs'
                              : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          {isSelected && <CheckSquare className="w-3.5 h-3.5 text-white" />}
                          <span>{svc}</span>
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() => setShowAddCustomService(true)}
                      className="px-3.5 py-2 rounded-xl text-xs font-extrabold border border-dashed border-[#00a896] text-[#00a896] bg-teal-50/50 hover:bg-teal-50 transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Other Service</span>
                    </button>
                  </div>

                  {showAddCustomService && (
                    <div className="flex gap-2 pt-2 max-w-md">
                      <input
                        type="text"
                        value={customServiceInput}
                        onChange={(e) => setCustomServiceInput(e.target.value)}
                        placeholder="Enter custom service name"
                        className="flex-1 px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-semibold outline-none focus:border-[#00a896]"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomService}
                        className="bg-[#00a896] text-white px-4 py-2 rounded-xl text-xs font-bold"
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>

                {/* Countries You Deal With */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-extrabold text-slate-900">Countries You Deal With (Select all that apply)</label>
                  <div className="flex flex-wrap gap-2">
                    {defaultCountries.map((c, i) => {
                      const isSelected = selectedCountries.includes(c.name);
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => toggleCountry(c.name)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer flex items-center gap-2 ${
                            isSelected
                              ? 'bg-[#00a896] text-white border-[#00a896] shadow-2xs'
                              : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          <span>{c.flag}</span>
                          <span>{c.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Languages Spoken */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-extrabold text-slate-900">Languages Spoken (Select all that apply)</label>
                  <div className="flex flex-wrap gap-2">
                    {defaultLanguages.map((lang, i) => {
                      const isSelected = selectedLanguages.includes(lang);
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => toggleLanguage(lang)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#00a896] text-white border-[#00a896] shadow-2xs'
                              : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          {isSelected && <CheckSquare className="w-3.5 h-3.5 text-white" />}
                          <span>{lang}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Consultation Mode */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-extrabold text-slate-900">Consultation Mode</label>
                  <div className="flex items-center gap-6 bg-slate-50 border border-slate-200 p-4 rounded-2xl">
                    <label className="flex items-center gap-2 text-xs font-extrabold text-slate-800 cursor-pointer">
                      <input
                        type="radio"
                        name="consultMode"
                        checked={consultationMode === "Online"}
                        onChange={() => setConsultationMode("Online")}
                        className="accent-[#00a896]"
                      />
                      <span>Online</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-extrabold text-slate-800 cursor-pointer">
                      <input
                        type="radio"
                        name="consultMode"
                        checked={consultationMode === "In Office"}
                        onChange={() => setConsultationMode("In Office")}
                        className="accent-[#00a896]"
                      />
                      <span>In Office</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-extrabold text-slate-800 cursor-pointer">
                      <input
                        type="radio"
                        name="consultMode"
                        checked={consultationMode === "Both"}
                        onChange={() => setConsultationMode("Both")}
                        className="accent-[#00a896]"
                      />
                      <span>Both</span>
                    </label>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="w-full sm:w-auto px-6 py-3 border border-slate-300 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => goToNextStep(3)}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#00a896] hover:bg-[#008f80] text-white font-extrabold text-xs rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: LOCATION & VERIFICATION */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-premium-fade">
                
                {/* Business Location Dropdowns */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Business Location</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-700 mb-1">Country *</label>
                      <CustomSelect
                        value={country}
                        onChange={setCountry}
                        options={[
                          { value: "India", label: "India 🇮🇳" },
                          { value: "UAE", label: "UAE 🇦🇪" },
                          { value: "United Kingdom", label: "United Kingdom 🇬🇧" },
                          { value: "Canada", label: "Canada 🇨🇦" },
                          { value: "Australia", label: "Australia 🇦🇺" },
                          { value: "USA", label: "USA 🇺🇸" },
                          { value: "Germany", label: "Germany 🇩🇪" },
                          { value: "Singapore", label: "Singapore 🇸🇬" },
                          { value: "New Zealand", label: "New Zealand 🇳🇿" },
                          { value: "Other", label: "Other 🌐" },
                        ]}
                        className=""
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-700 mb-1">State *</label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Select State"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-[#00a896]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-700 mb-1">City *</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Select City"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-[#00a896]"
                      />
                    </div>
                  </div>
                </div>

                {/* Detailed Address */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Office Address Details</h4>

                  {/* Street Address */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-700 mb-1">Street Address *</label>
                    <input
                      type="text"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="Building no., Street name, Area"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-[#00a896]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    />
                  </div>

                  {/* Landmark + Pin/Zip Code */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-700 mb-1">Landmark</label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="e.g. Near City Mall, Opposite Metro"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-[#00a896]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-700 mb-1">Pin / Zip Code *</label>
                      <input
                        type="text"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        placeholder="e.g. 110001"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-[#00a896]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      />
                    </div>
                  </div>

                  {/* Google Maps / Pin Location — removed */}
                </div>

                {/* Contact Information */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Contact Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-[#00a896]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-700 mb-1">WhatsApp Number</label>
                      <input
                        type="tel"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-[#00a896]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="info@yourbusiness.com"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-[#00a896]"
                      />
                    </div>
                  </div>
                </div>

                {/* Verification Documents (Optional but recommended) */}
              <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Verification Documents (Optional but recommended)</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { key: "businessReg", label: "Business Registration", accept: ".pdf,image/*" },
                      { key: "profLicense", label: "Professional License", accept: ".pdf,image/*" },
                      { key: "officePhoto", label: "Office Photo", accept: "image/*" },
                      { key: "govId", label: "Government ID", accept: ".pdf,image/*" }
                    ].map((doc, i) => {
                      const isUploaded = !!docUploads[doc.key];
                      const fileName = typeof docUploads[doc.key] === 'string' ? docUploads[doc.key] as string : null;
                      return (
                        <label
                          key={i}
                          htmlFor={`doc-upload-${doc.key}`}
                          className={`p-3 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all block ${
                            isUploaded
                              ? 'bg-teal-50/80 border-[#00a896] text-[#00a896]'
                              : 'bg-slate-50/50 border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-[#00a896]'
                          }`}
                        >
                          <Upload className="w-5 h-5 mx-auto mb-1 opacity-70" />
                          <p className="text-[11px] font-extrabold leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{doc.label}</p>
                          <span className="text-[9px] font-bold block mt-1 truncate px-1">
                            {isUploaded ? (fileName ? `✓ ${fileName.slice(0, 12)}…` : "✓ Uploaded") : "Click to Upload"}
                          </span>
                          <input
                            id={`doc-upload-${doc.key}`}
                            type="file"
                            accept={doc.accept}
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              if (file.size > 10 * 1024 * 1024) {
                                setValidationError(`${doc.label} must be under 10MB.`);
                                return;
                              }
                              setDocUploads(prev => ({ ...prev, [doc.key]: file.name }));
                            }}
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="w-full sm:w-auto px-6 py-3 border border-slate-300 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCompleteAndContinue}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#00a896] hover:bg-[#008f80] text-white font-extrabold text-xs rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Complete & Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3.5: OTP VERIFICATION MODAL / OVERLAY */}
        {showOtpModal && (
          <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-up">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200/90 space-y-5 text-center relative" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              
              <button
                onClick={() => setShowOtpModal(false)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 bg-teal-50 border border-teal-200 text-[#00a896] rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
                <Mail className="w-7 h-7" />
              </div>

              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <h3 className="text-xl font-black text-slate-900 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Verify Your Contact Email</h3>
                <p className="text-xs font-semibold text-slate-500 mt-1.5 leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  We have sent a 6-digit verification code to
                </p>

                {!isEditingEmail ? (
                  <div className="inline-flex items-center gap-2 bg-slate-100 px-3.5 py-1.5 rounded-full mt-2 border border-slate-200">
                    <strong className="text-slate-800 text-xs font-bold">{emailAddress || "your email address"}</strong>
                    <button
                      type="button"
                      onClick={() => {
                        setTempEmail(emailAddress);
                        setIsEditingEmail(true);
                      }}
                      className="text-[#00a896] hover:text-[#008f80] text-xs font-extrabold flex items-center gap-1 cursor-pointer transition-colors"
                      title="Edit Email Address"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 mt-2.5">
                    <input
                      type="email"
                      value={tempEmail}
                      onChange={(e) => setTempEmail(e.target.value)}
                      placeholder="Enter correct email"
                      className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-[#00a896] w-full max-w-[210px]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (tempEmail.trim()) {
                          const newEmail = tempEmail.trim();
                          setEmailAddress(newEmail);
                          setIsEditingEmail(false);
                          setResendCooldown(30);
                          sendVerificationEmail(newEmail);
                        }
                      }}
                      className="px-3 py-1.5 bg-[#00a896] hover:bg-[#008f80] text-white rounded-xl text-xs font-extrabold shadow-xs cursor-pointer transition-all active:scale-95"
                    >
                      Save & Send Code
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingEmail(false)}
                      className="px-2 py-1.5 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {otpError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl text-center">
                  {otpError}
                </div>
              )}

              {/* 6 Digit OTP Inputs */}
              <div className="flex justify-center gap-2 pt-2">
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`reg-otp-box-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(e.target.value, idx)}
                    onKeyDown={(e) => handleDigitKeyDown(e, idx)}
                    className="w-10 h-12 text-center text-lg font-black bg-slate-50 border border-slate-300 rounded-xl focus:border-[#00a896] outline-none"
                  />
                ))}
              </div>

              <div className="text-xs font-semibold text-slate-500 pt-1">
                {resendCooldown > 0 ? (
                  <span>Resend code in <strong className="text-slate-800">{resendCooldown}s</strong></span>
                ) : (
                  <button
                    onClick={() => {
                      setResendCooldown(30);
                      sendVerificationEmail(emailAddress);
                    }}
                    className="text-[#00a896] font-bold hover:underline cursor-pointer"
                  >
                    Resend Verification Code
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={verifyingOtp}
                className="w-full py-3.5 bg-[#00a896] hover:bg-[#008f80] text-white font-extrabold text-xs rounded-2xl shadow-md transition-all cursor-pointer active:scale-98 disabled:bg-slate-300"
              >
                {verifyingOtp ? "Verifying Code..." : "Verify Code & Finish"}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: COMPLETION SCREEN ("YOU'RE ALL SET!") */}
        {currentStep === 4 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/90 text-center space-y-6 animate-premium-fade" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            
            {/* Top Celebration Badge */}
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black px-4 py-1.5 rounded-full border border-emerald-300 uppercase tracking-wider" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <span>YOU'RE ALL SET!</span>
            </div>

            {/* Checkmark Graphic */}
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="w-24 h-24 bg-[#00a896] rounded-full flex items-center justify-center text-white shadow-xl shadow-teal-500/20">
                <CheckCircle className="w-14 h-14" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Congratulations!</h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1.5 max-w-md mx-auto" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Your account has been created successfully. Your profile is now live on VisaFormula.
              </p>
            </div>

            {/* Profile Completion Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-xs">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                  <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-200" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-[#00a896]" strokeWidth="3" strokeDasharray="100, 100" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <span className="absolute text-xs font-black text-[#00a896]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>100%</span>
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Profile Completion</h4>
                  <p className="text-[11px] font-semibold text-slate-500 mt-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Awesome! Your registration & profile are 100% complete and live.</p>
                </div>
              </div>

              <a
                href="/consultant/dashboard"
                className="bg-[#00a896] hover:bg-[#008f80] text-white px-4 py-2.5 rounded-xl text-xs font-extrabold shrink-0 transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* What's Next Checklist */}
            <div className="bg-teal-50/60 border border-teal-200/80 rounded-3xl p-6 max-w-lg mx-auto text-left space-y-3">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <Shield className="w-4 h-4 text-[#00a896]" />
                <span>WHAT'S NEXT?</span>
              </h4>
              <ul className="space-y-2.5 text-xs font-bold text-slate-700" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 bg-[#00a896] rounded-full shrink-0"></span>
                  <span>Our team will verify your details</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 bg-[#00a896] rounded-full shrink-0"></span>
                  <span>You can start receiving enquiries</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 bg-[#00a896] rounded-full shrink-0"></span>
                  <span>Build your reputation with reviews</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 bg-[#00a896] rounded-full shrink-0"></span>
                  <span>Grow your business globally</span>
                </li>
              </ul>
            </div>

            {/* Go to Dashboard CTA */}
            <div className="pt-2">
              <a
                href="/consultant/dashboard"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-3.5 bg-[#00a896] hover:bg-[#008f80] text-white text-xs sm:text-sm font-black rounded-2xl shadow-xl transition-all active:scale-98 cursor-pointer"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <LayoutDashboard className="w-4.5 h-4.5" />
                <span>Go to Dashboard</span>
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
