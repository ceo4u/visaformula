import React, { useState, useEffect } from "react";
import { 
  CheckCircle, ArrowLeft, ArrowRight, Upload, Plus, X, 
  User, FileText, Globe, Star, Shield, ArrowUpRight, 
  MessageSquare, Briefcase, Mail, Phone, ExternalLink, 
  Building, CheckSquare, Sparkles, MapPin, Lock, LayoutDashboard
} from "lucide-react";
import { useAuth, AuthProvider } from "../providers/auth-provider";

function ExpertSignupPortalContent() {
  // Wizard Step State: 0 (Start options), 1 (Business Info), 2 (Services & Expertise), 3 (Location & Verification), 3.5 (OTP Modal), 4 (Congratulations / Done)
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);

  // --- Step 1: Business Info States ---
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("Registered consultancy");
  const [yearsInBusiness, setYearsInBusiness] = useState("3-5 years");
  const [businessWebsite, setBusinessWebsite] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);

  // --- Step 2: Services & Expertise States ---
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Student Visa", "Visitor Visa", "PR / Permanent Residency", "Work Visa"
  ]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([
    "Canada", "Australia", "UK", "USA"
  ]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([
    "English", "Hindi"
  ]);
  const [consultationMode, setConsultationMode] = useState<"Online" | "In Office" | "Both">("Both");
  const [customServiceInput, setCustomServiceInput] = useState("");
  const [showAddCustomService, setShowAddCustomService] = useState(false);

  // --- Step 3: Location & Verification States ---
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Delhi");
  const [city, setCity] = useState("New Delhi");
  const [officeAddress, setOfficeAddress] = useState("");
  const [pinLocation, setPinLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [docUploads, setDocUploads] = useState<Record<string, boolean>>({
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

  useEffect(() => {
    // Check if expert is already logged in
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("expert_isLoggedIn");
      if (isLoggedIn === "true") {
        setCurrentStep(4);
      }
    }
  }, []);

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
      if (!businessName.trim()) {
        setValidationError("Please enter your Business Name.");
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

  // Trigger OTP Verification on "Complete & Continue"
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
  };

  // Verify OTP and complete registration
  const handleVerifyOtp = async () => {
    const code = otpDigits.join("");
    if (code.length < 6) {
      setOtpError("Please enter the complete 6-digit verification code.");
      return;
    }

    setVerifyingOtp(true);
    setOtpError("");

    // Simulate OTP validation and save payload
    setTimeout(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("expert_isLoggedIn", "true");
        localStorage.setItem("expert_businessName", businessName || "VisaFormula Consultant");
        localStorage.setItem("expert_email", emailAddress);
        localStorage.setItem("expert_contactNumber", phoneNumber);
        localStorage.setItem("expert_officeAddress", `${officeAddress}, ${city}, ${state}, ${country}`);
        localStorage.setItem("expert_services", JSON.stringify(selectedServices));
        localStorage.setItem("expert_countries", JSON.stringify(selectedCountries));
      }
      setVerifyingOtp(false);
      setShowOtpModal(false);
      setCurrentStep(4); // Navigate to Congratulations
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
    <div className="w-full font-sans">
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
            <div className="md:col-span-7 space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Create your account</h1>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Welcome! Sign up to get started as a verified consultant</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleGoogleSignup}
                  disabled={googleLoading}
                  className="w-full py-3 px-4 bg-white hover:bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold text-slate-800 flex items-center justify-center gap-3 transition-all shadow-2xs cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>{googleLoading ? "Connecting to Google..." : "Continue with Google"}</span>
                </button>

                <button
                  onClick={() => setCurrentStep(1)}
                  className="w-full py-3 px-4 bg-white hover:bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold text-slate-800 flex items-center justify-center gap-3 transition-all shadow-2xs cursor-pointer"
                >
                  <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] font-black">f</div>
                  <span>Continue with Facebook</span>
                </button>

                <button
                  onClick={() => setCurrentStep(1)}
                  className="w-full py-3 px-4 bg-white hover:bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold text-slate-800 flex items-center justify-center gap-3 transition-all shadow-2xs cursor-pointer"
                >
                  <div className="w-4 h-4 bg-blue-700 text-white flex items-center justify-center text-[10px] font-black rounded-xs">in</div>
                  <span>Continue with LinkedIn</span>
                </button>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider absolute">OR</span>
              </div>

              <button
                onClick={() => setCurrentStep(1)}
                className="w-full py-3.5 px-4 bg-[#00a896] hover:bg-[#008f80] text-white rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer active:scale-98"
              >
                <Mail className="w-4 h-4" />
                <span>Continue with Email</span>
              </button>

              <p className="text-[11px] font-semibold text-slate-400 text-center flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Your data is safe with us. We never post on your behalf.</span>
              </p>
            </div>

            {/* Right "Why register on VisaFormula?" Card */}
            <div className="md:col-span-5 bg-teal-50/70 border border-teal-200/80 rounded-3xl p-6 space-y-4">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Shield className="w-4.5 h-4.5 text-[#00a896]" />
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
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/90 space-y-6">
            
            {/* STEP HEADER & WIZARD PROGRESS BAR */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="bg-teal-100 text-[#00a896] text-[10px] font-black px-3 py-1 rounded-full border border-teal-200 uppercase tracking-wider">
                  STEP {currentStep}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  {currentStep === 1 && "Business Information"}
                  {currentStep === 2 && "Services & Expertise"}
                  {currentStep === 3 && "Location & Verification"}
                </h2>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
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
              <div className="space-y-5 animate-premium-fade">
                <div>
                  <label className="block text-xs font-extrabold text-slate-900 mb-1.5">Business Name *</label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Enter your business name"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-semibold text-slate-900 outline-none focus:border-[#00a896]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 mb-1.5">Business Type *</label>
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-semibold text-slate-900 outline-none focus:border-[#00a896] cursor-pointer"
                    >
                      <option value="Registered consultancy">Registered consultancy</option>
                      <option value="Authorised immigration / visa appeal lawyer">Authorised immigration / visa appeal lawyer</option>
                      <option value="Education & Training Institute">Education & Training Institute</option>
                      <option value="Freelancer">Freelancer</option>
                      <option value="Employer / HR agency">Employer / HR agency</option>
                      <option value="Tour operator">Tour operator</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 mb-1.5">Years in Business *</label>
                    <select
                      value={yearsInBusiness}
                      onChange={(e) => setYearsInBusiness(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-semibold text-slate-900 outline-none focus:border-[#00a896] cursor-pointer"
                    >
                      <option value="1-2 years">1-2 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5-10 years">5-10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
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
                    <label className="block text-xs font-extrabold text-slate-900 mb-1.5">Company Logo</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer">
                      <Upload className="w-7 h-7 text-slate-400 mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-700">Click to upload logo</p>
                      <p className="text-[10px] font-semibold text-slate-400 mt-1">PNG, JPG (Max 2MB)</p>
                    </div>
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
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-[#00a896]"
                      >
                        <option value="India">India 🇮🇳</option>
                        <option value="UAE">UAE 🇦🇪</option>
                        <option value="United Kingdom">United Kingdom 🇬🇧</option>
                        <option value="Canada">Canada 🇨🇦</option>
                      </select>
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

                {/* Office Address & Pin Location */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 mb-1">Office Address *</label>
                    <textarea
                      rows={2}
                      value={officeAddress}
                      onChange={(e) => setOfficeAddress(e.target.value)}
                      placeholder="Enter complete office address"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-semibold text-slate-900 outline-none focus:border-[#00a896] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 mb-1">Pin Location</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={pinLocation}
                        onChange={(e) => setPinLocation(e.target.value)}
                        placeholder="Search on map or enter address"
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-semibold text-slate-900 outline-none focus:border-[#00a896]"
                      />
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
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
                      { key: "businessReg", label: "Business Registration" },
                      { key: "profLicense", label: "Professional License" },
                      { key: "officePhoto", label: "Office Photo" },
                      { key: "govId", label: "Government ID" }
                    ].map((doc, i) => {
                      const isUploaded = docUploads[doc.key];
                      return (
                        <div
                          key={i}
                          onClick={() => setDocUploads(prev => ({ ...prev, [doc.key]: !isUploaded }))}
                          className={`p-3 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all ${
                            isUploaded
                              ? 'bg-teal-50/80 border-[#00a896] text-[#00a896]'
                              : 'bg-slate-50/50 border-slate-300 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <Upload className="w-5 h-5 mx-auto mb-1 opacity-70" />
                          <p className="text-[11px] font-extrabold leading-tight">{doc.label}</p>
                          <span className="text-[9px] font-bold block mt-1">
                            {isUploaded ? "✓ Uploaded" : "Upload"}
                          </span>
                        </div>
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
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200/90 space-y-5 text-center font-sora relative">
              
              <button
                onClick={() => setShowOtpModal(false)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 bg-teal-50 border border-teal-200 text-[#00a896] rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
                <Mail className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Verify Your Contact Email</h3>
                <p className="text-xs font-semibold text-slate-500 mt-1.5 leading-relaxed">
                  We have sent a 6-digit verification code to <strong className="text-slate-800">{emailAddress || "your email address"}</strong>
                </p>
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
                    onClick={() => setResendCooldown(30)}
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
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/90 text-center space-y-6 animate-premium-fade">
            
            {/* Top Celebration Badge */}
            <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-black px-4 py-1.5 rounded-full border border-emerald-200 uppercase tracking-wider">
              <span>YOU'RE ALL SET!</span>
            </div>

            {/* Checkmark Graphic */}
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="w-24 h-24 bg-[#00a896] rounded-full flex items-center justify-center text-white shadow-xl shadow-teal-500/20">
                <CheckCircle className="w-14 h-14" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Congratulations!</h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1.5 max-w-md mx-auto">
                Your account has been created successfully. Your profile is now live on VisaFormula.
              </p>
            </div>

            {/* Profile Completion Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border-4 border-[#00a896] flex items-center justify-center text-sm font-black text-slate-900 shrink-0">
                  82%
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">Profile Completion</h4>
                  <p className="text-[11px] font-semibold text-slate-500 mt-0.5">Great! Complete remaining details to get more visibility & enquiries.</p>
                </div>
              </div>

              <a
                href="/consultant/dashboard"
                className="bg-[#00a896] text-white px-4 py-2.5 rounded-xl text-xs font-extrabold shrink-0 hover:bg-[#008f80] transition-colors"
              >
                Complete Profile →
              </a>
            </div>

            {/* What's Next Checklist */}
            <div className="bg-teal-50/70 border border-teal-200/80 rounded-3xl p-6 max-w-lg mx-auto text-left space-y-3">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#00a896]" />
                <span>What's Next?</span>
              </h4>
              <ul className="space-y-2 text-xs font-bold text-slate-700">
                <li className="flex items-center gap-2">• Our team will verify your details</li>
                <li className="flex items-center gap-2">• You can start receiving enquiries</li>
                <li className="flex items-center gap-2">• Build your reputation with reviews</li>
                <li className="flex items-center gap-2">• Grow your business globally</li>
              </ul>
            </div>

            {/* Go to Dashboard CTA */}
            <div className="pt-2">
              <a
                href="/consultant/dashboard"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4 bg-[#00a896] hover:bg-[#008f80] text-white text-sm font-black rounded-2xl shadow-xl transition-all active:scale-95 cursor-pointer"
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
