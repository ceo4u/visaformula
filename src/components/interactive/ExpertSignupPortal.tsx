import { useState, useEffect } from "react";
import { 
  CheckCircle, ArrowLeft, ArrowRight, Upload, Plus, X, 
  User, FileText, Globe, Star, Shield, ArrowUpRight, 
  MessageSquare, Briefcase, Mail, Phone, ExternalLink, 
  Percent, Award, Image as ImageIcon, Sparkles, Building, 
  CreditCard, Settings, ChevronRight, LayoutDashboard, Search, 
  Calendar, LogOut, CheckSquare, TrendingUp, Bookmark, Bell, Clock, ChevronDown, AlertTriangle, Menu,
  Eye, EyeOff
} from "lucide-react";
import { useAuth, AuthProvider } from "../providers/auth-provider";
import airplanePaths from "../../data/clean_airplane.json";
import checkmarkPaths from "../../data/clean_checkmark.json";

function ExpertSignupPortalContent() {
  const [step, setStep] = useState(1); // 1: Initial Reg, 2: Profile Complete, 3: Dashboard View
  
  // Tab states for Dashboard
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, profile, inquiries, cases, upgrade, photos
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- Phase 1 States ---
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [consultantType, setConsultantType] = useState("Freelancer");

  // Granular Address States
  const [addressArea, setAddressArea] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressState, setAddressState] = useState("");
  const [addressCountry, setAddressCountry] = useState("India");
  const [addressZip, setAddressZip] = useState("");

  const updateFullAddress = (area: string, city: string, state: string, country: string, zip: string) => {
    setAddressArea(area);
    setAddressCity(city);
    setAddressState(state);
    setAddressCountry(country);
    setAddressZip(zip);
    const fullStr = [area, city, state, country].filter(Boolean).join(", ") + (zip ? ` - ${zip}` : "");
    setExpertAddress(fullStr);
    setOfficeAddress(fullStr);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
        const isLoggedInExpert = localStorage.getItem("expert_isLoggedIn");
        const name = localStorage.getItem("expert_businessName");
        if (isLoggedInExpert === "true" && name) {
          setStep(3);
          setFirstName(localStorage.getItem("expert_firstName") || "");
          setLastName(localStorage.getItem("expert_lastName") || "");
          setBusinessName(name);
          setEmail(localStorage.getItem("expert_email") || "");
          setContactNumber(localStorage.getItem("expert_contactNumber") || "");
          setConsultantType(localStorage.getItem("expert_advisorType") || "Freelancer");
          setAboutMe(localStorage.getItem("expert_aboutMe") || "");
          setPortfolioLink(localStorage.getItem("expert_portfolioLink") || "");
          setExpertAddress(localStorage.getItem("expert_officeAddress") || "");
          setOfficeAddress(localStorage.getItem("expert_officeAddress") || "");
          setGovRegNumber(localStorage.getItem("expert_govRegNumber") || "");
          setLicenseFileName(localStorage.getItem("expert_licenseFileName") || "");
          setLicenseUploaded(localStorage.getItem("expert_licenseUploaded") === "true");
          
          try {
            const tags = localStorage.getItem("expert_expertiseTags");
            if (tags) setExpertiseTags(JSON.parse(tags));
          } catch(e) {}
          
          setCountriesExpertise(localStorage.getItem("expert_countriesExpertise") || "");
          setProfilePhoto(localStorage.getItem("expert_profilePhoto") || "");
      } else {
        const params = new URLSearchParams(window.location.search);
        const nameParam = params.get("name");
        const phoneParam = params.get("phone");
        const typeParam = params.get("type");

        if (nameParam) setBusinessName(nameParam);
        if (phoneParam) setContactNumber(phoneParam);
        if (typeParam) {
          const validTypes = ["Freelancer", "Registered consultancy", "Employer/ hr agency", "University/ educational institute", "Insurance agent", "Bank or financer", "Tour operator", "Event organiser"];
          if (validTypes.includes(typeParam)) {
            setConsultantType(typeParam);
          }
        }
      }
    }
  }, []);
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false); // must verify
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(""));
  const [resendCooldown, setResendCooldown] = useState(0);
  const [sendingCode, setSendingCode] = useState(false);
  const [otpInput, setOtpInput] = useState("");

  const [verifyingCode, setVerifyingCode] = useState(false);

  const handleSendVerificationCode = async () => {
    setValidationError("");
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setValidationError("Please enter your email address first.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) {
      setValidationError("Please enter a valid email address.");
      return;
    }
    setSendingCode(true);
    try {
      const res = await fetch("/api/auth/send-verification-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail })
      });
      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        setResendCooldown(60);
      } else {
        setValidationError(data.message || "Failed to send verification code.");
      }
    } catch (err) {
      setValidationError("Server connection error. Please try again.");
    } finally {
      setSendingCode(false);
    }
  };

  const handleVerifyCode = async (forcedCode?: string) => {
    setValidationError("");
    const code = (forcedCode || otpInput || otpDigits.join("")).trim();
    if (code.length < 6) {
      setValidationError("Please enter all 6 digits of the code.");
      return;
    }
    setVerifyingCode(true);
    try {
      const res = await fetch("/api/auth/verify-email-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), otp: code })
      });
      const data = await res.json();
      if (res.ok && data.verified) {
        setOtpSent(false);
        setEmailVerified(true);
        setValidationError("");
      } else {
        setValidationError(data.message || "Invalid or expired verification code.");
      }
    } catch (err) {
      setValidationError("Failed to verify code. Please try again.");
    } finally {
      setVerifyingCode(false);
    }
  };

  useEffect(() => {
    let timer: any;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);
  const [facebookLink, setFacebookLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [validationError, setValidationError] = useState("");
  const [countryCodeOpen, setCountryCodeOpen] = useState(false);

  const { signInWithGoogle } = useAuth();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleLoadingText, setGoogleLoadingText] = useState("");

  const handleGoogleSignup = async () => {
      setValidationError("");
      setGoogleLoading(true);
      setGoogleLoadingText("Connecting to Google Auth...");
      try {
          const res = await signInWithGoogle();
          
          // If user is brand new (needs_role), immediately auto-register them as an Expert!
          if (res && res.status === 'needs_role') {
              setGoogleLoadingText("Initializing your expert profile...");
              const response = await fetch("/api/auth/google/register", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                      email: res.email,
                      name: res.name,
                      uid: res.uid,
                      role: 'expert'
                  })
              });

              if (response.ok) {
                  const data = await response.json();
                  if (typeof window !== "undefined") {
                      localStorage.setItem("visaformula_user", JSON.stringify(data.user));
                      if (data.user && data.user.rawUser) {
                          const raw = data.user.rawUser;
                          localStorage.setItem("expert_businessName", raw.business_name || "Expert");
                          localStorage.setItem("expert_email", raw.email);
                          localStorage.setItem("expert_isLoggedIn", "true");
                      }
                  }
              } else {
                  const errData = await response.json();
                  throw new Error(errData.message || "Failed to register expert profile.");
              }
          }

          setGoogleLoadingText("Authenticated! Redirecting to dashboard...");
          await new Promise(resolve => setTimeout(resolve, 800));
          window.location.href = "/consultant/dashboard";
      } catch (e: any) {
          setValidationError(e.message || "Google signup failed.");
          setGoogleLoading(false);
      }
  };
  const [expertCategory, setExpertCategory] = useState("Student visa expert");
  const [expertAddress, setExpertAddress] = useState("");
  const [signupCategoryOpen, setSignupCategoryOpen] = useState(false);
  const [editConsultantOpen, setEditConsultantOpen] = useState(false);
  const [editCategoryOpen, setEditCategoryOpen] = useState(false);
  const [signupConsultantOpen, setSignupConsultantOpen] = useState(false);

  useEffect(() => {
    if (!signupCategoryOpen && !editConsultantOpen && !editCategoryOpen && !signupConsultantOpen) return;
    const handleOutsideClick = () => {
      setSignupCategoryOpen(false);
      setEditConsultantOpen(false);
      setEditCategoryOpen(false);
      setSignupConsultantOpen(false);
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [signupCategoryOpen, editConsultantOpen, editCategoryOpen, signupConsultantOpen]);

  // --- Phase 2 States ---
  // Freelancer specific
  const [smmAccounts, setSmmAccounts] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  
  // Corporate specific
  const [govRegNumber, setGovRegNumber] = useState("");
  const [licenseUploaded, setLicenseUploaded] = useState(false);
  const [licenseFileName, setLicenseFileName] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");

  // Shared Features Matrix
  const [newTag, setNewTag] = useState("");
  const [expertiseTags, setExpertiseTags] = useState<string[]>([]);
  const [countriesExpertise, setCountriesExpertise] = useState("");
  const [pastSuccessText, setPastSuccessText] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [escrowAccepted, setEscrowAccepted] = useState(true);
  const [subscribeUpdates, setSubscribeUpdates] = useState("Yes");


  // --- Tag Helpers ---
  const addTag = () => {
    if (newTag && !expertiseTags.includes(newTag)) {
      setExpertiseTags([...expertiseTags, newTag]);
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setExpertiseTags(expertiseTags.filter(t => t !== tag));
  };

  // Mock Active Cases & Inquiries
  const [inquiries, setInquiries] = useState<any[]>([]);

  const [activeCases, setActiveCases] = useState<any[]>([]);

  const handleProceedToPhase2 = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    if (!firstName || !lastName || !businessName || !contactNumber || !email || !password) {
      setValidationError("Please fill in all required fields.");
      return;
    }

    // 1. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setValidationError("Please enter a valid email address (must contain '@' and end with a valid domain like '.com').");
      return;
    }

    // 2. Contact Number validation
    const cleanPhone = contactNumber.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setValidationError("Please enter a valid contact number (must contain at least 10 digits).");
      return;
    }

    // 3. Password validation
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (password.length < 8) {
      setValidationError("Password must be at least 8 characters long.");
      return;
    }
    if (!hasNumber || !hasSymbol) {
      setValidationError("Password must contain at least one number and one special character / symbol (e.g. !, @, #, etc).");
      return;
    }

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match. Please verify your password entry.");
      return;
    }

    if (!emailVerified) {
      setValidationError("Please verify your email address with the OTP code first.");
      return;
    }

    setStep(2);
  };

  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; url: string }[]>([]);
  const [showAdModal, setShowAdModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [adTitle, setAdTitle] = useState("");
  const [adDescription, setAdDescription] = useState("");
  const [offerTitle, setOfferTitle] = useState("");
  const [offerDiscount, setOfferDiscount] = useState("");
  const [membershipTier, setMembershipTier] = useState("Standard Directory");

  const [adsList, setAdsList] = useState<Array<{title: string, desc: string}>>([]);
  const [offersList, setOffersList] = useState<Array<{title: string, discount: string}>>([]);

  const handleLaunchDashboard = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    
    // Auto-populate expertise tags if empty to avoid blocking registration
    const finalExpertise = expertiseTags.length > 0 ? expertiseTags : ["Study visa", "Visa filing assistance"];
    if (expertiseTags.length === 0) {
      setExpertiseTags(finalExpertise);
    }

    const finalAddress = expertAddress || (addressArea ? `${addressArea}, ${addressCity}, ${addressState}, ${addressCountry} - ${addressZip}` : officeAddress) || "Primary Office Address";

    try {
      await fetch(`${import.meta.env.PUBLIC_BACKEND_URL || ''}/api/register/expert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          business_name: businessName,
          email: email,
          password: password,
          contact_number: `${countryCode} ${contactNumber}`,
          advisor_type: consultantType,
          about_me: aboutMe,
          portfolio_link: portfolioLink,
          office_address: finalAddress,
          gov_registration_number: govRegNumber,
          license_document_url: "uploaded_license_copy.pdf",
          expertise_tags: finalExpertise,
          countries_expertise: countriesExpertise.trim() ? countriesExpertise.split(",").map(c => c.trim()).filter(Boolean) : ["Canada", "UK", "USA"]
        })
      });
    } catch (err) {
      console.warn("Backend server offline. Proceeding in frontend mode.", err);
    }

    // Save full registration profile to localStorage so Dashboard loads completely
    if (typeof window !== "undefined") {
      localStorage.setItem("expert_firstName", firstName || "Expert");
      localStorage.setItem("expert_lastName", lastName || "User");
      localStorage.setItem("expert_businessName", businessName || "Consultancy Agency");
      localStorage.setItem("expert_email", email);
      localStorage.setItem("expert_contactNumber", `${countryCode} ${contactNumber}`);
      localStorage.setItem("expert_advisorType", consultantType);
      localStorage.setItem("expert_aboutMe", aboutMe || "Verified visa and relocation consultant.");
      localStorage.setItem("expert_portfolioLink", portfolioLink || "");
      localStorage.setItem("expert_officeAddress", finalAddress);
      localStorage.setItem("expert_govRegNumber", govRegNumber || "REG-2026-OK");
      localStorage.setItem("expert_expertiseTags", JSON.stringify(finalExpertise));
      localStorage.setItem("expert_countriesExpertise", countriesExpertise || "Canada, UK, USA, Australia, Cyprus");
      localStorage.setItem("expert_profilePhoto", profilePhoto || "");
      localStorage.setItem("expert_isLoggedIn", "true");
      localStorage.setItem("visaformula_user", JSON.stringify({
        name: `${firstName} ${lastName}`,
        email: email,
        role: "expert",
        advisor_type: consultantType
      }));
      
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    // Launch Step 3 (Live Dashboard)
    setStep(3);
  };

  const handleAddAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (adTitle) {
      setAdsList([...adsList, { title: adTitle, desc: adDescription }]);
      setAdTitle("");
      setAdDescription("");
      setShowAdModal(false);
    }
  };

  const handleAddOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (offerTitle) {
      setOffersList([...offersList, { title: offerTitle, discount: offerDiscount }]);
      setOfferTitle("");
      setOfferDiscount("");
      setShowOfferModal(false);
    }
  };

  const handleAcceptInquiry = (id: number) => {
    const inq = inquiries.find(item => item.id === id);
    if (inq) {
      const newCase = {
        id: Date.now(),
        name: inq.name,
        visa: inq.type,
        status: "milestone initialized",
        escrow: "₹15,000 Secured",
        progress: 10
      };
      setActiveCases([...activeCases, newCase]);
      setInquiries(inquiries.filter(item => item.id !== id));
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUploadedFiles(prev => [...prev, { name: file.name, url: event.target.result as string }]);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch(`${import.meta.env.PUBLIC_BACKEND_URL || ''}/api/profile/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          role: "expert",
          business_name: businessName,
          first_name: businessName,
          phone: contactNumber,
          advisor_type: consultantType,
          about_me: aboutMe,
          portfolio_link: portfolioLink,
          office_address: consultantType === "Freelancer" ? expertAddress : officeAddress,
          gov_registration_number: govRegNumber,
          countries_expertise: countriesExpertise
        })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.user && typeof window !== "undefined") {
          localStorage.setItem("visaformula_user", JSON.stringify(data.user));
        }
      }
    } catch (err) {
      console.warn("Failed to update profile to backend, saving locally.", err);
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("expert_businessName", businessName);
      localStorage.setItem("expert_contactNumber", contactNumber);
      localStorage.setItem("expert_advisorType", consultantType);
      localStorage.setItem("expert_aboutMe", aboutMe);
      localStorage.setItem("expert_portfolioLink", portfolioLink);
      localStorage.setItem("expert_officeAddress", consultantType === "Freelancer" ? expertAddress : officeAddress);
      localStorage.setItem("expert_govRegNumber", govRegNumber);
      localStorage.setItem("expert_licenseFileName", licenseFileName);
      localStorage.setItem("expert_licenseUploaded", licenseUploaded ? "true" : "false");
      localStorage.setItem("expert_profilePhoto", profilePhoto || "");
      alert("Profile details and photo saved successfully!");
    }
  };

  const avatarPresets = [
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&q=80",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80"
  ];

  return (
    <div className="min-h-screen text-[#111111] flex flex-col justify-between selection:bg-black selection:text-white bg-white font-sora relative overflow-x-hidden w-full max-w-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {googleLoading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center z-[9999] transition-all duration-300">
              <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm font-bold text-black tracking-wide animate-pulse">
                      {googleLoadingText}
                  </p>
              </div>
          </div>
      )}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
        * {
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            box-sizing: border-box;
        }
        html, body {
            overflow-x: hidden !important;
            max-width: 100% !important;
            width: 100% !important;
            margin: 0;
            padding: 0;
        }
        @keyframes premiumFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.995);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-premium-fade {
          animation: premiumFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
      
      {step < 3 && (
        <header className="w-full px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between font-sans gap-4 border-b border-slate-100 bg-white md:min-h-[120px] relative">
          <div className="order-1 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-10">
            <a href="/">
              <img src="/logo.png" alt="VisaFormula" className="h-16 md:h-28 w-auto object-contain mx-auto" />
            </a>
          </div>

          <div className="order-2 w-full md:w-auto flex justify-between md:justify-start items-center gap-4">
            <a href="/" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 bg-white text-xs font-bold text-black hover:bg-slate-50 shadow-sm transition-all shrink-0">
              <span className="text-sm font-semibold">&larr;</span>
              <span>Back to Home</span>
            </a>
            
            <div className="text-xs font-semibold text-slate-500 shrink-0 md:hidden">
              Already a member? <a href="/login" className="text-black font-extrabold hover:underline">Login</a>
            </div>
          </div>

          <div className="hidden md:block text-sm font-semibold text-slate-500 shrink-0 order-3">
            Already a member? <a href="/login" className="text-black font-extrabold hover:underline">Login</a>
          </div>
        </header>
      )}

      {step < 3 ? (
        <div className="flex-grow flex flex-col justify-start pt-6 pb-28 px-6 max-w-4xl w-full mx-auto">
          <div className="text-center my-6">
            <h1 className="text-2xl md:text-3xl font-bold text-[#0c1a2e] tracking-tight mb-2 font-jakarta">Register as Expert</h1>
            <p className="text-base text-slate-400 font-medium">Enter your details to initialize your portal</p>
          </div>

          <div className="flex items-center justify-center gap-2 md:gap-8 my-8 font-sans max-w-full overflow-x-auto px-2">
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                step > 1 ? "bg-emerald-500 text-white" : "bg-[#1C1C1E] text-white shadow-sm"
              }`}>
                {step > 1 ? "✓" : "1"}
              </div>
              <span className={`text-xs md:text-sm font-bold whitespace-nowrap ${step === 1 ? "text-black" : "text-slate-400"}`}>
                General Details
              </span>
            </div>
            
            <div className={`h-0.5 w-8 md:w-24 shrink-0 transition-all ${step > 1 ? "bg-emerald-500" : "bg-slate-200"}`}></div>

            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all shrink-0 ${
                step === 2 
                  ? "bg-[#1C1C1E] text-white shadow-sm" 
                  : "border border-slate-200 bg-white text-slate-400"
              }`}>
                2
              </div>
              <span className={`text-xs md:text-sm font-bold whitespace-nowrap ${step === 2 ? "text-black" : "text-slate-400"}`}>
                Credentials & Service
              </span>
            </div>
          </div>

          <div className="w-full mx-auto transition-all duration-300 font-sans mt-4">
            {step === 1 && (
              <form onSubmit={handleProceedToPhase2} className="space-y-4">
                <div className="flex flex-col items-center gap-4 mb-6">
                    <button
                        type="button"
                        onClick={handleGoogleSignup}
                        className="w-full max-w-[280px] h-12 border border-slate-200/80 bg-white hover:bg-slate-50 transition-all text-slate-800 font-extrabold text-xs rounded-xl flex items-center justify-center gap-3 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 duration-200 shrink-0 cursor-pointer"
                    >
                        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                        </svg>
                        <span>Continue with Google</span>
                    </button>

                    <div className="flex items-center justify-center gap-3 w-full max-w-[280px] my-1">
                        <div className="h-[1px] bg-slate-200 flex-grow" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">— OR —</span>
                        <div className="h-[1px] bg-slate-200 flex-grow" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* 1. First Name & Last Name */}
                  <div className="col-span-1">
                    <label className="text-xs font-bold text-slate-700 mb-1 block">First Name *</label>
                    <input 
                      required
                      value={firstName} 
                      onChange={(e) => setFirstName(e.target.value)} 
                      placeholder="First name" 
                      style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-[15px] outline-none focus:border-gray-500 text-slate-800 placeholder:text-slate-500 shadow-sm"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="text-xs font-bold text-slate-700 mb-1 block">Last Name *</label>
                    <input 
                      required
                      value={lastName} 
                      onChange={(e) => setLastName(e.target.value)} 
                      placeholder="Last name" 
                      style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-[15px] outline-none focus:border-gray-500 text-slate-800 placeholder:text-slate-500 shadow-sm"
                    />
                  </div>

                  {/* 2. Type of Expert & Business Name */}
                  <div className="col-span-2 md:col-span-1" onClick={(e) => e.stopPropagation()}>
                    <label className="text-xs font-bold text-slate-700 mb-1 block">Type of Expert *</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setSignupConsultantOpen(!signupConsultantOpen)}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-[15px] outline-none text-left focus:border-gray-500 text-slate-800 cursor-pointer flex items-center justify-between shadow-sm"
                      >
                        <span style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>{consultantType}</span>
                        <svg className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${signupConsultantOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      {signupConsultantOpen && (
                        <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-xl mt-1 py-1 z-50 font-sans">
                          {["Freelancer", "Registered consultancy", "Employer/ hr agency", "University/ educational institute", "Insurance agent", "Bank or financer", "Tour operator", "Event organiser"].map(type => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => { setConsultantType(type); setSignupConsultantOpen(false); }}
                              className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-black hover:text-white transition-colors"
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="text-xs font-bold text-slate-700 mb-1 block">Business / Agency Name *</label>
                    <input 
                      required
                      value={businessName} 
                      onChange={(e) => setBusinessName(e.target.value)} 
                      placeholder="Business or Consultancy Name" 
                      style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-[15px] outline-none focus:border-gray-500 text-slate-800 placeholder:text-slate-500 shadow-sm"
                    />
                  </div>

                  {/* 3. Email Address & Email Verification */}
                  <div className="col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-700 block">Email Address *</label>
                    <div className="flex flex-col sm:flex-row gap-3 items-center">
                      <div className="flex-grow relative w-full">
                        <input 
                          type="email"
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailVerified(false);
                          }}
                          placeholder="name@example.com" 
                          style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-[15px] outline-none focus:border-gray-500 text-slate-800 placeholder:text-slate-500 shadow-sm pr-10"
                        />
                        {emailVerified && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center bg-emerald-50 border border-emerald-250 p-1.5 rounded-full animate-premium-fade shadow-sm">
                            <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        )}
                      </div>

                      {otpSent && !emailVerified && (
                        <div className="relative w-full sm:w-auto shrink-0 flex gap-2 animate-premium-fade">
                          <input
                            type="text"
                            maxLength={6}
                            placeholder="OTP"
                            value={otpInput}
                            onChange={(e) => setOtpInput(e.target.value)}
                            className="w-24 px-2 py-3 bg-white border border-gray-300 rounded-md text-[15px] outline-none focus:border-black text-center font-bold tracking-widest text-black shadow-sm"
                          />
                          <button
                            type="button"
                            disabled={verifyingCode}
                            onClick={() => handleVerifyCode(otpInput)}
                            className="bg-black hover:bg-neutral-900 text-white text-xs font-bold tracking-wider px-4 py-3 rounded-md uppercase cursor-pointer h-[46px] shrink-0 disabled:opacity-50"
                          >
                            {verifyingCode ? "Verifying..." : "Verify"}
                          </button>
                        </div>
                      )}
                      
                      {!emailVerified && (
                        <button
                          type="button"
                          onClick={handleSendVerificationCode}
                          disabled={sendingCode || resendCooldown > 0}
                          className="bg-black text-white text-xs font-bold tracking-wider px-5 py-3 rounded-md hover:bg-neutral-900 transition-all uppercase cursor-pointer disabled:bg-slate-200 disabled:text-slate-400 h-[46px] shrink-0 w-full sm:w-auto"
                        >
                          {sendingCode ? "Sending..." : resendCooldown > 0 ? `Resend (${resendCooldown}s)` : otpSent ? "Resend" : "Send OTP"}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 4. Create Password & Confirm Password */}
                  <div className={`col-span-2 space-y-4 border-l-4 pl-4 transition-all duration-300 ${
                    !password && !confirmPassword ? 'border-slate-200' :
                    password === confirmPassword ? 'border-emerald-500 bg-emerald-50/10 py-2 rounded-r-md' : 'border-rose-500 bg-rose-50/10 py-2 rounded-r-md'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Security Credentials *</span>
                      {password && confirmPassword && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          password === confirmPassword ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {password === confirmPassword ? '✓ Passwords Match' : '✗ Passwords Do Not Match'}
                        </span>
                      )}
                    </div>

                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        required
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Create Password" 
                        style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-[15px] outline-none focus:border-gray-500 text-slate-800 placeholder:text-slate-500 shadow-sm pr-10"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)} 
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-400 block font-semibold leading-normal mt-1">Must be at least 8 characters long, containing 1 number and 1 special symbol (e.g. @, #, $, !).</span>

                    <div className="relative">
                      <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        required
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        placeholder="Confirm Password" 
                        style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-[15px] outline-none focus:border-gray-500 text-slate-800 placeholder:text-slate-500 shadow-sm pr-10"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* 5. Mobile Number */}
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-slate-700 mb-1 block">Mobile / Phone Number *</label>
                    <div className="flex gap-3">
                      <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => setCountryCodeOpen(!countryCodeOpen)}
                          className="px-4 py-3 bg-white border border-gray-300 rounded-md text-[15px] outline-none focus:border-gray-500 text-slate-800 shadow-sm shrink-0 cursor-pointer flex items-center justify-between gap-1.5 h-[46px] font-semibold"
                        >
                          <span style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>{countryCode}</span>
                          <svg className={`w-3.5 h-3.5 text-slate-500 transition-transform ${countryCodeOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        {countryCodeOpen && (
                          <div className="absolute left-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-xl max-h-60 overflow-y-auto z-[60] font-sans">
                            {[
                              { val: "+91", label: "+91 (IN)" },
                              { val: "+1", label: "+1 (US/CA)" },
                              { val: "+44", label: "+44 (UK)" },
                              { val: "+61", label: "+61 (AU)" },
                              { val: "+971", label: "+971 (AE)" },
                              { val: "+49", label: "+49 (DE)" },
                              { val: "+33", label: "+33 (FR)" },
                              { val: "+65", label: "+65 (SG)" },
                              { val: "+64", label: "+64 (NZ)" }
                            ].map(opt => (
                              <button
                                key={opt.val}
                                type="button"
                                onClick={() => { setCountryCode(opt.val); setCountryCodeOpen(false); }}
                                className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-black hover:text-white transition-colors"
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <input 
                        required
                        value={contactNumber} 
                        onChange={(e) => setContactNumber(e.target.value)} 
                        placeholder="e.g. 99999 99999" 
                        style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-[15px] outline-none focus:border-gray-500 text-slate-800 placeholder:text-slate-500 shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                {validationError && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-xs font-semibold font-sans text-center transition-all animate-premium-fade max-w-lg mx-auto mt-6">
                    {validationError}
                  </div>
                )}

                <div className="pt-6 flex justify-center">
                  <button 
                    type="submit"
                    className="bg-[#111111] hover:bg-black text-white px-12 py-4 rounded-xl text-base font-semibold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <span>Proceed to Location & Expertise Details</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleLaunchDashboard} className="space-y-10">
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-150 flex items-center justify-between text-sm shadow-sm">
                  <span className="text-slate-700 font-semibold">Selected Consultant Category: <strong className="text-black font-bold">{consultantType}</strong></span>
                  {consultantType === "Freelancer" ? (
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-3 py-1 rounded-lg border border-slate-250 font-semibold">Verification Documents: Optional</span>
                  ) : (
                    <span className="text-[10px] bg-red-50 text-red-700 px-3 py-1 rounded-lg border border-red-200 font-semibold">Verification Documents: Required</span>
                  )}
                </div>

                {/* 1. Office / Practice Location Address */}
                <div className="bg-white border border-slate-150 rounded-xl p-6 shadow-sm space-y-3">
                  <label className="text-sm font-bold text-slate-800 block uppercase tracking-wider">Office / Practice Location Address *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Area */}
                    <div className="col-span-2">
                      <label className="text-[11px] font-bold text-slate-600 mb-1 block">Area / Locality / Street Address *</label>
                      <input 
                        type="text"
                        required
                        value={addressArea} 
                        onChange={(e) => updateFullAddress(e.target.value, addressCity, addressState, addressCountry, addressZip)} 
                        placeholder="e.g. Suite 402, MG Road, Landmark Building" 
                        className="w-full px-4 py-3 bg-white border border-slate-250 rounded-xl text-sm outline-none focus:border-black text-black placeholder:text-slate-400 shadow-sm"
                      />
                    </div>
                    {/* City or District or Town */}
                    <div className="col-span-1">
                      <label className="text-[11px] font-bold text-slate-600 mb-1 block">City / District / Town *</label>
                      <input 
                        type="text"
                        required
                        value={addressCity} 
                        onChange={(e) => updateFullAddress(addressArea, e.target.value, addressState, addressCountry, addressZip)} 
                        placeholder="e.g. Mumbai / New Delhi" 
                        className="w-full px-4 py-3 bg-white border border-slate-250 rounded-xl text-sm outline-none focus:border-black text-black placeholder:text-slate-400 shadow-sm"
                      />
                    </div>
                    {/* State */}
                    <div className="col-span-1">
                      <label className="text-[11px] font-bold text-slate-600 mb-1 block">State / Province *</label>
                      <input 
                        type="text"
                        required
                        value={addressState} 
                        onChange={(e) => updateFullAddress(addressArea, addressCity, e.target.value, addressCountry, addressZip)} 
                        placeholder="e.g. Maharashtra" 
                        className="w-full px-4 py-3 bg-white border border-slate-250 rounded-xl text-sm outline-none focus:border-black text-black placeholder:text-slate-400 shadow-sm"
                      />
                    </div>
                    {/* Country */}
                    <div className="col-span-1">
                      <label className="text-[11px] font-bold text-slate-600 mb-1 block">Country *</label>
                      <input 
                        type="text"
                        required
                        value={addressCountry} 
                        onChange={(e) => updateFullAddress(addressArea, addressCity, addressState, e.target.value, addressZip)} 
                        placeholder="e.g. India" 
                        className="w-full px-4 py-3 bg-white border border-slate-250 rounded-xl text-sm outline-none focus:border-black text-black placeholder:text-slate-400 shadow-sm"
                      />
                    </div>
                    {/* Zip code */}
                    <div className="col-span-1">
                      <label className="text-[11px] font-bold text-slate-600 mb-1 block">ZIP / Postal Code *</label>
                      <input 
                        type="text"
                        required
                        value={addressZip} 
                        onChange={(e) => updateFullAddress(addressArea, addressCity, addressState, addressCountry, e.target.value)} 
                        placeholder="e.g. 400001" 
                        className="w-full px-4 py-3 bg-white border border-slate-250 rounded-xl text-sm outline-none focus:border-black text-black placeholder:text-slate-400 shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-150 rounded-xl p-6 shadow-sm space-y-4">
                  <span className="text-sm font-semibold text-slate-800 block">Choose Profile Photo / Upload</span>
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <label className="group relative w-20 h-20 rounded-full border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center flex-shrink-0 cursor-pointer hover:border-slate-400 transition-all shadow-inner">
                      {profilePhoto ? (
                        <img src={profilePhoto} alt="profile" className="w-full h-full object-cover group-hover:opacity-85 transition-opacity" />
                      ) : (
                        <User className="w-10 h-10 text-slate-350 group-hover:text-slate-500 transition-colors" />
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity text-white text-[10px] font-semibold">
                        <Upload className="w-4 h-4 mb-0.5" />
                        <span>Upload</span>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setProfilePhoto(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                    <div className="flex-grow space-y-3">
                      <span className="text-xs font-semibold text-slate-500 block">Select a Preset Professional Avatar:</span>
                      <div className="flex gap-2 flex-wrap items-center">
                        {avatarPresets.map((presetUrl, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setProfilePhoto(presetUrl)}
                            className={`w-10 h-10 rounded-full border overflow-hidden transition-all ${profilePhoto === presetUrl ? "border-black ring-2 ring-black scale-105" : "border-slate-200 hover:border-slate-400"}`}
                          >
                            <img src={presetUrl} alt="preset" className="w-full h-full object-cover" />
                          </button>
                        ))}
                        
                        <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>

                        <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-slate-900 text-white rounded-xl text-xs font-semibold cursor-pointer transition-all active:scale-95 shadow-sm">
                          <Upload className="w-3.5 h-3.5" />
                          Upload Custom Photo
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setProfilePhoto(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {consultantType === "Freelancer" ? (
                    <>
                      <div className="col-span-1">
                        <input 
                          value={smmAccounts}
                          onChange={(e) => setSmmAccounts(e.target.value)}
                          placeholder="Social Media Accounts / Portfolio Links (e.g. LinkedIn)" 
                          style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-[15px] outline-none focus:border-gray-500 text-slate-800 placeholder:text-slate-500 shadow-sm"
                        />
                      </div>
                      <div className="col-span-1">
                        <input 
                          value={portfolioLink}
                          onChange={(e) => setPortfolioLink(e.target.value)}
                          placeholder="Personal Portfolio / Website (e.g. https://portfolio.com)" 
                          style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-[15px] outline-none focus:border-gray-500 text-slate-800 placeholder:text-slate-500 shadow-sm"
                        />
                      </div>
                      <div className="col-span-2">
                        <textarea 
                          value={aboutMe}
                          onChange={(e) => setAboutMe(e.target.value)}
                          rows={4}
                          placeholder="About Section / Brief Bio (Briefly describe your freelance services and achievements...)" 
                          style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-[15px] outline-none focus:border-gray-500 text-slate-800 resize-none placeholder:text-slate-500 shadow-sm"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col-span-1">
                        <input 
                          required
                          value={govRegNumber}
                          onChange={(e) => setGovRegNumber(e.target.value)}
                          placeholder="Government Registration Number / License *" 
                          style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-[15px] outline-none focus:border-gray-500 text-slate-800 placeholder:text-slate-500 shadow-sm"
                        />
                      </div>
                       <div className="col-span-1">
                        <div className="relative">
                          <input 
                            type="file"
                            id="license-file-input"
                            accept=".pdf,.jpg,.jpeg,.png"
                            required
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setLicenseUploaded(true);
                                setLicenseFileName(file.name);
                              }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <div 
                            className={`w-full py-2.5 border border-dashed rounded-md text-sm font-semibold text-center transition-all shadow-sm ${licenseUploaded ? "bg-slate-50 border-black text-black" : "border-slate-300 hover:bg-slate-50 text-slate-500"}`}
                          >
                            {licenseUploaded ? `✓ ${licenseFileName || "License Copy Attached"}` : "Upload License Copy (PDF / JPG) *"}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <input 
                          required
                          value={officeAddress}
                          onChange={(e) => setOfficeAddress(e.target.value)}
                          placeholder="Physical Verified Office Address *" 
                          style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-[15px] outline-none focus:border-gray-500 text-slate-800 placeholder:text-slate-500 shadow-sm"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="border-t border-slate-150 pt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(consultantType === "Freelancer" || consultantType === "Registered consultancy") ? (
                      <div className="col-span-2 space-y-3">
                        <label className="text-xs font-bold text-slate-800 block uppercase tracking-wider">Expert in (Select all that apply)*</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {[
                            "Study visa",
                            "Travel visa",
                            "Job visa",
                            "Visa filing assistance",
                            "Visa appointment",
                            "Tourist visa",
                            "PR migration visas"
                          ].map(service => {
                            const isChecked = expertiseTags.includes(service);
                            return (
                              <button
                                key={service}
                                type="button"
                                onClick={() => {
                                  if (isChecked) {
                                    setExpertiseTags(expertiseTags.filter(t => t !== service));
                                  } else {
                                    setExpertiseTags([...expertiseTags, service]);
                                  }
                                }}
                                className={`flex items-center justify-between p-3.5 rounded-xl border text-xs font-bold transition-all text-left ${isChecked ? "bg-black border-black text-white" : "bg-white border-slate-200 text-slate-700 hover:border-slate-350"}`}
                              >
                                <span>{service}</span>
                                <span className={`w-4 h-4 rounded-full flex items-center justify-center border text-[9px] ${isChecked ? "bg-white border-white text-black" : "border-slate-300 text-transparent"}`}>✓</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="col-span-1">
                        <div className="flex gap-2">
                          <input 
                            value={newTag} 
                            onChange={(e) => setNewTag(e.target.value)} 
                            placeholder="Add Area of Expertise (e.g. Work Visa)" 
                            style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-md text-[14px] outline-none focus:border-gray-500 text-slate-800 placeholder:text-slate-500 shadow-sm"
                          />
                          <button type="button" onClick={addTag} className="bg-black hover:bg-slate-900 text-white text-xs px-4 py-2.5 rounded-md font-semibold active:scale-95 transition-all shadow-sm shrink-0">Add</button>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {expertiseTags.map(tag => (
                            <span key={tag} className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-full px-3 py-0.5 text-xs font-semibold text-slate-650 shadow-xs">
                              {tag}
                              <button type="button" onClick={() => removeTag(tag)} className="text-slate-400 hover:text-black font-bold">×</button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="col-span-2 md:col-span-1">
                      <input 
                        value={countriesExpertise}
                        onChange={(e) => setCountriesExpertise(e.target.value)}
                        placeholder="Countries of Expertise (e.g. Canada, UK)" 
                        style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-[15px] outline-none focus:border-gray-500 text-slate-800 placeholder:text-slate-500 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-5 bg-slate-50/50 rounded-xl border border-slate-200 shadow-sm">
                    <div>
                      <span className="text-sm font-semibold text-slate-800 block">Accept Secure Escrow Payouts</span>
                      <span className="text-xs text-slate-400 font-medium mt-0.5 block">Payments remain secured in escrow during milestone completion checks.</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setEscrowAccepted(!escrowAccepted)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wider transition-all cursor-pointer ${escrowAccepted ? "bg-black text-white" : "bg-slate-200 text-slate-700"}`}
                    >
                      {escrowAccepted ? "Yes" : "No"}
                    </button>
                  </div>
                </div>

                {validationError && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-xs font-semibold font-sans text-center transition-all animate-premium-fade max-w-lg mx-auto mt-6">
                    {validationError}
                  </div>
                )}

                <div className="pt-8 border-t border-slate-100 flex items-center justify-between gap-4">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-sm font-semibold text-slate-550 hover:text-black flex items-center gap-1 transition-colors"
                  >
                    ← Back
                  </button>

                  <button 
                    type="submit"
                    className="bg-[#111111] hover:bg-black text-white px-12 py-4 rounded-xl text-base font-semibold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-grow flex flex-col lg:flex-row bg-[#f3f7fa] min-h-screen text-[#111111] antialiased animate-premium-fade font-roboto" style={{ fontFamily: "'Roboto', sans-serif" }}>
          <style dangerouslySetInnerHTML={{__html: `
            .font-roboto, .font-roboto * {
                font-family: 'Roboto', sans-serif !important;
            }
          `}} />

          {/* Mobile Header Bar */}
          <div className="lg:hidden w-full bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
            <a href="/" className="flex items-center">
              <img src="/logo.png" className="h-10 w-auto object-contain" alt="VisaFormula Logo" />
            </a>
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl focus:outline-none"
              aria-label="Open Sidebar"
            >
              <Menu className="w-6 h-6 text-black" />
            </button>
          </div>

          {/* Mobile Slide-Over Sidebar Drawer */}
          <div className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300" onClick={() => setIsSidebarOpen(false)} />
            
            {/* Drawer Content */}
            <aside className={`absolute top-0 left-0 w-64 h-full bg-white shadow-2xl flex flex-col justify-between py-8 px-5 transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center px-1">
                  <a href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-black transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
                  </a>
                  <button onClick={() => setIsSidebarOpen(false)} className="p-1 hover:bg-slate-100 rounded text-slate-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <nav className="flex flex-col gap-1.5">
                  {[
                    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                    { id: "profile", label: "Edit Profile", icon: User },
                    { id: "inquiries", icon: MessageSquare, label: "New Inquiries", count: inquiries.length },
                    { id: "cases", icon: Briefcase, label: "Active Cases", count: activeCases.length },
                    { id: "upgrade", icon: Shield, label: "Upgrade Tier" },
                    { id: "photos", icon: Upload, label: "Upload Photos", count: uploadedFiles.length }
                  ].map(tab => {
                    const isActive = activeTab === tab.id;
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setIsSidebarOpen(false);
                        }}
                        className={`flex items-center gap-3 px-5 py-3 rounded-full font-bold text-xs tracking-wide transition-all relative ${
                          isActive 
                            ? "bg-black text-white shadow-md" 
                            : "text-slate-600 hover:text-black hover:bg-slate-100"
                        }`}
                      >
                        <IconComponent className="w-4 h-4 flex-shrink-0" />
                        <span>{tab.label}</span>
                        {tab.count !== undefined && tab.count > 0 && (
                          <span className={`absolute right-4 px-2 py-0.5 rounded-full text-[9px] font-black transition-all ${
                            isActive ? "bg-white text-black" : "bg-slate-200 text-slate-700"
                          }`}>
                            {tab.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="px-2">
                <button 
                  onClick={() => setStep(1)} 
                  className="flex items-center gap-3 px-5 py-3 text-slate-650 hover:text-red-650 rounded-full font-bold text-xs tracking-wide transition-all w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </aside>
          </div>

          <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex flex-col justify-between py-8 px-5 flex-shrink-0 text-black">
            <div className="flex flex-col items-stretch gap-8">
              {/* Logo / Branding */}
              <div className="flex flex-col gap-3 px-3">
                <a href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-black transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
                </a>
              </div>
              
              <nav className="flex flex-col gap-2">
                {[
                  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                  { id: "profile", label: "Edit Profile", icon: User },
                  { id: "inquiries", icon: MessageSquare, label: "New Inquiries", count: inquiries.length },
                  { id: "cases", icon: Briefcase, label: "Active Cases", count: activeCases.length },
                  { id: "upgrade", icon: Shield, label: "Upgrade Tier" },
                  { id: "photos", icon: Upload, label: "Upload Photos", count: uploadedFiles.length }
                ].map(tab => {
                  const isActive = activeTab === tab.id;
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 px-5 py-3.5 rounded-full font-bold text-xs tracking-wide transition-all relative ${
                        isActive 
                          ? "bg-black text-white shadow-md active:scale-[0.98]" 
                          : "text-slate-600 hover:text-black hover:bg-slate-100"
                      }`}
                    >
                      <IconComponent className="w-4 h-4 flex-shrink-0" />
                      <span>{tab.label}</span>
                      
                      {tab.count !== undefined && tab.count > 0 && (
                        <span className={`absolute right-4 px-2 py-0.5 rounded-full text-[9px] font-black transition-all ${
                          isActive ? "bg-white text-black" : "bg-slate-200 text-slate-700"
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
 
            <div className="px-2">
              <button 
                onClick={() => setStep(1)} 
                className="flex items-center gap-3 px-5 py-3.5 text-slate-650 hover:text-red-600 hover:bg-slate-50 rounded-full font-bold text-xs tracking-wide transition-all w-full text-left cursor-pointer border-none bg-transparent"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </aside>

          <main className="flex-grow p-8 overflow-y-auto space-y-8">
            
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 flex-grow max-w-4xl">
                {/* Profile Badge (Premium Style matching screenshot) */}
                <div className="bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 border border-slate-200/80 rounded-[28px] shadow-sm flex flex-col sm:flex-row items-center overflow-hidden max-w-md w-full relative">
                  {/* Left side: Avatar */}
                  <div className="p-4 sm:pr-2 flex-shrink-0 z-10">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[20px] bg-gradient-to-br from-black via-slate-800 to-slate-950 text-white border-2 border-white shadow-md flex items-center justify-center font-black text-xl tracking-tight overflow-hidden">
                      {profilePhoto ? (
                        <img src={profilePhoto} alt="expert avatar" className="w-full h-full object-cover" />
                      ) : (
                        "XP"
                      )}
                    </div>
                  </div>

                  {/* Right side: Info */}
                  <div className="p-4 sm:pl-3 flex flex-col justify-center text-center sm:text-left flex-grow z-10">
                    {/* Name and PRO Badge */}
                    <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                      <h2 className="text-base sm:text-lg font-extrabold text-black tracking-tight leading-snug">{businessName || "Apex Immigration"}</h2>
                      <span className="bg-emerald-500/10 text-emerald-700 text-[9px] font-black tracking-widest px-2 py-0.5 rounded-full border border-emerald-500/20">Verified</span>
                    </div>

                    {/* Description/Location */}
                    <p className="text-[11px] text-slate-500 font-semibold mt-1 leading-tight flex items-center justify-center sm:justify-start gap-1.5 flex-wrap">
                      <span>💼</span> {expertCategory || consultantType || "Visa Expert"} based in <span className="text-black font-extrabold">{expertAddress ? expertAddress.split(',')[0] : (officeAddress ? officeAddress.split(',')[0] : "Delhi, India")}</span>
                    </p>
                  </div>
                </div>

                {/* Search Bar next to Profile */}
                <div className="relative w-full sm:w-[450px] flex-shrink-0">
                  <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text"
                    placeholder="Search consultations, tasks, files..."
                    className="w-full pl-11 pr-5 py-4 bg-white border border-slate-200 rounded-full text-xs font-semibold focus:border-black outline-none shadow-sm transition-all"
                  />
                </div>
              </div>

              {/* Action buttons on the right */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowAdModal(true)}
                  className="bg-white hover:bg-slate-50 text-black border border-slate-250 px-5 py-3.5 rounded-xl text-xs font-medium tracking-normal transition-all flex items-center gap-2 active:scale-95 shadow-sm cursor-pointer"
                >
                  Post an Ad <ArrowUpRight className="w-4 h-4 text-slate-500" />
                </button>
                <button 
                  onClick={() => setShowOfferModal(true)}
                  className="bg-black hover:bg-slate-900 text-white px-5 py-3.5 rounded-xl text-xs font-medium tracking-normal transition-all flex items-center gap-2 active:scale-95 shadow-sm cursor-pointer"
                >
                  Special Offer <Sparkles className="w-4 h-4 text-yellow-400" />
                </button>
              </div>
            </header>

            {activeTab === "dashboard" ? (
              <div className="space-y-8">
                {(!aboutMe || !contactNumber || (!expertAddress && !officeAddress)) && (
                  <div className="bg-amber-50 border border-amber-250/60 rounded-3xl p-5 flex items-start gap-4 shadow-sm animate-premium-fade">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-amber-900 tracking-wider">Your Profile is Incomplete</h4>
                      <p className="text-[11px] font-semibold text-amber-700 mt-1">
                        Please complete your advisor category, contact number, and office details under the <button onClick={() => setActiveTab("profile")} className="font-extrabold underline hover:text-amber-900 cursor-pointer">Edit Profile</button> tab to complete your setup.
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                
                {/* Column 1: Applicant Inquiries (styled as My Tasks mockup) */}
                <div className="xl:col-span-1 bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="font-bold text-lg text-black">My Inquiries</h3>
                      <span className="text-[11px] text-slate-400 font-bold tracking-wider mt-0.5">Applicant Requests</span>
                    </div>
                    <button onClick={() => setShowAdModal(true)} className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-all">
                      <Plus className="w-4 h-4 text-black" />
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <button className="bg-black text-white text-xs font-bold px-4 py-2 rounded-full">Today</button>
                    <button className="bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-2 rounded-full transition-all">Tomorrow</button>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/60 p-3 rounded-2xl flex items-center justify-between text-xs font-bold text-black">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px]">{inquiries.length}</div>
                      <span>On Going Inquiries</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    {inquiries.length === 0 ? (
                      <div className="text-center py-6 text-slate-400 text-xs font-medium">
                        No pending applicant inquiries.
                      </div>
                    ) : (
                      inquiries.map((inq, idx) => {
                        const bgColors = ["bg-[#ffeae6]/40", "bg-[#e8f5e9]/40", "bg-[#e1f5fe]/40", "bg-[#f3e5f5]/40"];
                        return (
                          <div key={inq.id} className={`p-4 border border-slate-150 rounded-2xl transition-all hover:scale-[1.01] flex flex-col justify-between gap-3 ${bgColors[idx % bgColors.length]}`}>
                            <div className="flex items-start justify-between">
                              <div>
                                <span className="text-xs font-semibold text-black block">{inq.name}</span>
                                <span className="text-[9px] bg-white/80 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-bold mt-1 inline-block tracking-wider">
                                  {inq.type} ({inq.country})
                                </span>
                              </div>
                              <span className="text-[9px] font-semibold text-slate-400">{inq.time}</span>
                            </div>
                            <p className="text-[11px] text-slate-650 leading-relaxed font-semibold">{inq.message}</p>
                            
                            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100/50">
                              <button 
                                onClick={() => setInquiries(inquiries.filter(item => item.id !== inq.id))}
                                className="text-[10px] font-bold text-slate-500 hover:text-black transition-colors"
                              >
                                Decline
                              </button>
                              <button 
                                onClick={() => handleAcceptInquiry(inq.id)}
                                className="bg-black hover:bg-slate-900 text-white text-[9px] font-bold tracking-wider px-3.5 py-1.5 rounded-lg transition-all"
                              >
                                Accept
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Column 2: Dashboard Analytics & Milestone Escrow (Middle column) */}
                <div className="xl:col-span-2 flex flex-col gap-8">
                  
                  {/* Upper Row: Projects Overview & Earnings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Projects / Cases Overview Doughnut Chart Layout */}
                    <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[280px]">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400 tracking-widest block">Cases Overview</span>
                        <button className="text-slate-400 hover:text-black">
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="relative w-36 h-36 mx-auto flex items-center justify-center my-3">
                        <div className="absolute inset-0 border-[10px] border-slate-100 rounded-full"></div>
                        <div className="absolute inset-0 border-[10px] border-t-black border-r-orange-500 border-b-sky-500 border-l-slate-100 rounded-full animate-spin-slow"></div>
                        <div className="text-center z-10">
                          <span className="text-2xl font-bold text-black">{activeCases.length}</span>
                          <span className="text-[9px] text-slate-400 font-bold tracking-wider block mt-0.5">Active</span>
                        </div>
                      </div>

                      <div className="flex justify-between text-[10px] font-bold text-slate-500 pt-2 border-t border-slate-100">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-black rounded-xs"></span> In Progress: {activeCases.filter(c => c.progress < 100).length}</span>
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-orange-500 rounded-xs"></span> Completed: {activeCases.filter(c => c.progress === 100).length}</span>
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-sky-500 rounded-xs"></span> Inquiries: {inquiries.length}</span>
                      </div>
                    </div>

                    {/* Milestone Earnings Chart Visual (Income VS Expense layout) */}
                    <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[280px]">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xs font-bold text-slate-400 tracking-widest block">Revenue</span>
                          <span className="text-lg font-bold text-black mt-1 block">₹{(activeCases.length * 15000).toLocaleString()} Secured</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-450">
                          <TrendingUp className="w-4 h-4 text-emerald-500" />
                          <span>Escrow Active</span>
                        </div>
                      </div>

                      {/* Custom visual curves / lines representing Income vs Expense */}
                      <div className="relative h-28 flex items-end justify-between gap-1 mt-2">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                          <path d="M0,35 Q20,10 40,25 T80,15 T100,5" fill="none" stroke="rgba(17,17,17,0.15)" strokeWidth="1.5" />
                          <path d="M0,38 Q25,30 50,35 T100,28" fill="none" stroke="rgba(249,115,22,0.25)" strokeWidth="1.5" />
                          <circle cx="40" cy="25" r="2.5" fill="black" />
                          <circle cx="80" cy="15" r="2.5" fill="orange" />
                        </svg>
                        <div className="absolute top-2 right-2 bg-black text-white text-[8px] px-2 py-0.5 rounded font-bold">
                          Income: ₹{(activeCases.length * 15000).toLocaleString()}
                        </div>
                      </div>

                      <div className="flex justify-between text-[9px] font-bold text-slate-400 border-t border-slate-100 pt-2">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                      </div>
                    </div>

                  </div>

                  {/* Lower Block: Milestone Escrow Vault (Invoice Overview Mockup layout) */}
                  <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <h3 className="font-bold text-lg text-black">Milestone Escrow Vault</h3>
                        <span className="text-[11px] text-slate-450 font-bold tracking-wider">Secured Payouts</span>
                      </div>
                      <Shield className="w-5 h-5 text-black" />
                    </div>

                    <div className="space-y-4">
                      {[
                        { label: "Overdue Payouts", count: "0 cases", amount: "₹0", width: "0%", bg: "bg-purple-600" },
                        { label: "Under Milestone Review", count: `${activeCases.length} cases`, amount: `₹${(activeCases.length * 15000).toLocaleString()}`, width: activeCases.length > 0 ? "65%" : "0%", bg: "bg-red-500" },
                        { label: "Secure Escrow Held", count: `${activeCases.length} cases`, amount: `₹${(activeCases.length * 15000).toLocaleString()}`, width: activeCases.length > 0 ? "65%" : "0%", bg: "bg-sky-500" },
                        { label: "Total Completed Payouts", count: "0 cases", amount: "₹0", width: "0%", bg: "bg-emerald-500" },
                        { label: "Drafts / Pending", count: "0 cases", amount: "₹0", width: "0%", bg: "bg-orange-500" }
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex justify-between text-xs font-bold text-black">
                            <span>{item.label}</span>
                            <div className="flex gap-4">
                              <span className="text-slate-450">{item.count}</span>
                              <span className="font-bold">{item.amount}</span>
                            </div>
                          </div>
                          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full ${item.bg} rounded-full`} style={{ width: item.width }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Column 3: Active Case Milestones & Open Tickets (Right Column) */}
                <div className="xl:col-span-1 flex flex-col gap-8">
                  
                  {/* Active Cases Milestone list (styled like My Meetings in mockup) */}
                  <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-450 tracking-widest block">Active Cases</span>
                      <Calendar className="w-4 h-4 text-black" />
                    </div>

                    <div className="space-y-3">
                      {activeCases.length === 0 ? (
                        <div className="text-center py-6 text-slate-400 text-xs font-medium">
                          No active client cases.
                        </div>
                      ) : (
                        activeCases.map((c, idx) => (
                          <div key={c.id} className="bg-slate-50 border border-slate-200/40 rounded-2xl p-4.5 space-y-3 hover:shadow-xs transition-all relative">
                            <div className="flex justify-between items-center text-xs font-bold">
                              <span className="text-slate-450 font-bold">{c.escrow}</span>
                              <span className="bg-black text-white px-2 py-0.5 rounded-md text-[9px] tracking-wider">Meet</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-250 flex items-center justify-center font-bold text-xs text-black">
                                {c.name.substring(0, 2).toUpperCase()}
                              </div>
                              <div className="truncate">
                                <span className="text-xs font-semibold text-black block truncate">{c.name}</span>
                                <span className="text-[10px] text-slate-400 block truncate font-semibold mt-0.5">{c.visa}</span>
                              </div>
                            </div>
                            
                            {/* Milestone progress interactive slider */}
                            <div className="mt-2 pt-2 border-t border-slate-100/50">
                              <div className="flex items-center justify-between text-[9px] font-bold text-slate-500 mb-1">
                                <span>Progress: {c.progress}%</span>
                                <span className="text-black font-bold">{c.status.includes("Completed") ? "Completed" : "In-Progress"}</span>
                              </div>
                              <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={c.progress}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value);
                                  setActiveCases(activeCases.map(item => item.id === c.id ? { ...item, progress: val, status: val === 100 ? "Completed & Escrow Released" : "milestone in-progress" } : item));
                                }}
                                className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-black" 
                              />
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Open Tickets layout (shows partners ads & promotional offers list) */}
                  <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-450 tracking-widest block">Active Ads & Offers</span>
                      <Plus className="w-4 h-4 text-black cursor-pointer" onClick={() => setShowAdModal(true)} />
                    </div>

                    <div className="space-y-4">
                      {adsList.length === 0 && offersList.length === 0 ? (
                        <div className="text-center py-6 text-slate-400 text-xs font-medium">
                          No promotional offers published. Click + to post.
                        </div>
                      ) : (
                        <>
                          {adsList.map((ad, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
                              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center font-bold text-xs text-orange-850 flex-shrink-0">AD</div>
                              <div className="flex-1 truncate">
                                <div className="text-xs font-semibold text-black leading-none truncate">{ad.title}</div>
                                <span className="text-[9px] text-slate-400 font-bold block mt-1 truncate">{ad.desc}</span>
                              </div>
                              <button onClick={() => setAdsList(adsList.filter((_, i) => i !== idx))} className="text-xs text-slate-400 hover:text-black font-bold">×</button>
                            </div>
                          ))}
                          {offersList.map((off, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
                              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-xs text-emerald-850 flex-shrink-0">%</div>
                              <div className="flex-1 truncate">
                                <div className="text-xs font-semibold text-black leading-none truncate">{off.title}</div>
                                <span className="text-[9px] text-emerald-700 font-bold block mt-1 truncate">{off.discount} Discount</span>
                              </div>
                              <button onClick={() => setOffersList(offersList.filter((_, i) => i !== idx))} className="text-xs text-slate-400 hover:text-black font-bold">×</button>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            </div>
            ) : activeTab === "profile" ? (
              <div className="bg-white border border-slate-200/50 rounded-3xl p-8 shadow-sm space-y-8 animate-premium-fade">
                <h3 className="text-base font-bold text-black border-b border-slate-100 pb-3 tracking-wide">
                  Live Consultant Profile Information
                </h3>

                {/* Profile Photo Upload block */}
                <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-150 shadow-inner">
                  <div className="relative w-24 h-24 rounded-full bg-slate-200 border border-slate-300 overflow-hidden flex items-center justify-center flex-shrink-0 group">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="profile avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl font-black text-slate-400">XP</span>
                    )}
                  </div>
                  <div className="flex flex-col items-start gap-2.5">
                    <span className="text-xs font-bold text-black tracking-wider">Profile Avatar Image</span>
                    <p className="text-[11px] text-slate-500 font-medium">PNG, JPG formats accepted. Automatically syncs with header badge.</p>
                    <label className="bg-black hover:bg-slate-900 text-white text-xs font-bold tracking-wider px-5 py-2.5 rounded-xl cursor-pointer active:scale-95 transition-all shadow-sm">
                      Upload Avatar Photo
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (event.target?.result) {
                                setProfilePhoto(event.target.result as string);
                                localStorage.setItem("expert_profilePhoto", event.target.result as string);
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Business Name</label>
                    <input 
                      type="text" 
                      value={businessName} 
                      onChange={(e) => setBusinessName(e.target.value)} 
                      className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-black focus:bg-white focus:border-black outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Contact Number</label>
                    <input 
                      type="text" 
                      value={contactNumber} 
                      onChange={(e) => setContactNumber(e.target.value)} 
                      className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-black focus:bg-white focus:border-black outline-none"
                    />
                  </div>

                  <div className="space-y-1.5" onClick={(e) => e.stopPropagation()}>
                    <label className="text-xs font-bold text-slate-800">Practice Consultant Category</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setEditConsultantOpen(!editConsultantOpen)}
                        className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-black text-left outline-none cursor-pointer flex items-center justify-between h-[46px]"
                      >
                        <span>{consultantType}</span>
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      </button>
                      {editConsultantOpen && (
                        <div className="absolute top-full left-0 w-full bg-white border border-slate-200 rounded-xl shadow-xl mt-1 py-1 z-50 font-sora">
                          {["Freelancer", "Registered consultancy", "Employer/ hr agency", "University/ educational institute", "Insurance agent", "Bank or financer", "Tour operator", "Event organiser"].map(type => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => { setConsultantType(type); setEditConsultantOpen(false); }}
                              className="w-full text-left px-4 py-2 text-xs font-normal text-slate-700 hover:bg-black hover:text-white transition-colors"
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5" onClick={(e) => e.stopPropagation()}>
                    <label className="text-xs font-bold text-slate-800">Expert In (Category)</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setEditCategoryOpen(!editCategoryOpen)}
                        className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-black text-left outline-none cursor-pointer flex items-center justify-between h-[46px]"
                      >
                        <span>{expertCategory}</span>
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      </button>
                      {editCategoryOpen && (
                        <div className="absolute top-full left-0 w-full bg-white border border-slate-200 rounded-xl shadow-xl mt-1 py-1 z-50 font-sora">
                          {["Student visa expert", "Visa filing expert", "Visit visa expert", "Job visa expert", "PR And Migration expert"].map(cat => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => { setExpertCategory(cat); setEditCategoryOpen(false); }}
                              className="w-full text-left px-4 py-2 text-xs font-normal text-slate-700 hover:bg-black hover:text-white transition-colors"
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 col-span-1 md:col-span-2 pt-2 border-t border-slate-100">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Practice / Office Location Address</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Area */}
                      <div className="col-span-2">
                        <label className="text-[11px] font-bold text-slate-600 mb-1 block">Area / Locality / Street Address</label>
                        <input 
                          type="text"
                          value={addressArea} 
                          onChange={(e) => updateFullAddress(e.target.value, addressCity, addressState, addressCountry, addressZip)} 
                          placeholder="Area / Locality / Street Address" 
                          className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-black focus:bg-white focus:border-black outline-none"
                        />
                      </div>
                      {/* City or District or Town */}
                      <div className="col-span-1">
                        <label className="text-[11px] font-bold text-slate-600 mb-1 block">City / District / Town</label>
                        <input 
                          type="text"
                          value={addressCity} 
                          onChange={(e) => updateFullAddress(addressArea, e.target.value, addressState, addressCountry, addressZip)} 
                          placeholder="City / District / Town" 
                          className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-black focus:bg-white focus:border-black outline-none"
                        />
                      </div>
                      {/* State */}
                      <div className="col-span-1">
                        <label className="text-[11px] font-bold text-slate-600 mb-1 block">State / Province</label>
                        <input 
                          type="text"
                          value={addressState} 
                          onChange={(e) => updateFullAddress(addressArea, addressCity, e.target.value, addressCountry, addressZip)} 
                          placeholder="State / Province" 
                          className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-black focus:bg-white focus:border-black outline-none"
                        />
                      </div>
                      {/* Country */}
                      <div className="col-span-1">
                        <label className="text-[11px] font-bold text-slate-600 mb-1 block">Country</label>
                        <input 
                          type="text"
                          value={addressCountry} 
                          onChange={(e) => updateFullAddress(addressArea, addressCity, addressState, e.target.value, addressZip)} 
                          placeholder="Country" 
                          className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-black focus:bg-white focus:border-black outline-none"
                        />
                      </div>
                      {/* ZIP Code */}
                      <div className="col-span-1">
                        <label className="text-[11px] font-bold text-slate-600 mb-1 block">ZIP / Postal Code</label>
                        <input 
                          type="text"
                          value={addressZip} 
                          onChange={(e) => updateFullAddress(addressArea, addressCity, addressState, addressCountry, e.target.value)} 
                          placeholder="ZIP / Postal Code" 
                          className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-black focus:bg-white focus:border-black outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Website Address</label>
                    <input 
                      type="text" 
                      value={website} 
                      onChange={(e) => setWebsite(e.target.value)} 
                      className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-black focus:bg-white focus:border-black outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Countries of Expertise</label>
                    <input 
                      type="text" 
                      value={countriesExpertise} 
                      onChange={(e) => setCountriesExpertise(e.target.value)} 
                      className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-black focus:bg-white focus:border-black outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Registered Email Address</label>
                    <input 
                      type="email" 
                      disabled
                      value={email} 
                      className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-sm font-semibold text-slate-500 outline-none"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-150 space-y-4">
                  <span className="text-xs font-bold text-slate-600 tracking-wider block">Additional Details & Verified Documents</span>
                  {consultantType === "Freelancer" ? (
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-800">SMM / Portfolio Link</label>
                        <input 
                          type="text"
                          value={portfolioLink}
                          onChange={(e) => setPortfolioLink(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-800">Bio</label>
                        <textarea 
                          value={aboutMe}
                          onChange={(e) => setAboutMe(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs outline-none resize-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-800">Gov Reg / License Code</label>
                        <input 
                          type="text"
                          value={govRegNumber}
                          onChange={(e) => setGovRegNumber(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs outline-none"
                        />
                      </div>
                      <div className="space-y-3 md:col-span-2 pt-2 border-t border-slate-100">
                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Office / Practice Address Details</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="col-span-2">
                            <label className="text-[11px] font-bold text-slate-600 mb-1 block">Area / Locality / Street Address</label>
                            <input 
                              type="text"
                              value={addressArea}
                              onChange={(e) => updateFullAddress(e.target.value, addressCity, addressState, addressCountry, addressZip)}
                              placeholder="e.g. Suite 402, MG Road, Landmark Building"
                              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-black"
                            />
                          </div>
                          <div className="col-span-1">
                            <label className="text-[11px] font-bold text-slate-600 mb-1 block">City / District / Town</label>
                            <input 
                              type="text"
                              value={addressCity}
                              onChange={(e) => updateFullAddress(addressArea, e.target.value, addressState, addressCountry, addressZip)}
                              placeholder="e.g. Mumbai / New Delhi"
                              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-black"
                            />
                          </div>
                          <div className="col-span-1">
                            <label className="text-[11px] font-bold text-slate-600 mb-1 block">State / Province</label>
                            <input 
                              type="text"
                              value={addressState}
                              onChange={(e) => updateFullAddress(addressArea, addressCity, e.target.value, addressCountry, addressZip)}
                              placeholder="e.g. Maharashtra"
                              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-black"
                            />
                          </div>
                          <div className="col-span-1">
                            <label className="text-[11px] font-bold text-slate-600 mb-1 block">Country</label>
                            <input 
                              type="text"
                              value={addressCountry}
                              onChange={(e) => updateFullAddress(addressArea, addressCity, addressState, e.target.value, addressZip)}
                              placeholder="e.g. India"
                              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-black"
                            />
                          </div>
                          <div className="col-span-1">
                            <label className="text-[11px] font-bold text-slate-600 mb-1 block">ZIP / Postal Code</label>
                            <input 
                              type="text"
                              value={addressZip}
                              onChange={(e) => updateFullAddress(addressArea, addressCity, addressState, addressCountry, e.target.value)}
                              placeholder="e.g. 400001"
                              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-black"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold text-slate-800">Upload License / ID Document Copy</label>
                        <div className="flex items-center gap-3">
                          <label className="bg-black hover:bg-slate-900 text-white text-xs font-bold tracking-wider px-4 py-2.5 rounded-xl cursor-pointer active:scale-95 transition-all shadow-sm">
                            Select File
                            <input 
                              type="file" 
                              accept="image/*,application/pdf"
                              className="hidden" 
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setLicenseFileName(file.name);
                                  setLicenseUploaded(true);
                                }
                              }}
                            />
                          </label>
                          <span className="text-xs text-slate-500 font-semibold truncate">
                            {licenseFileName || "No document uploaded yet"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between bg-slate-50 p-4.5 rounded-2xl border border-slate-150 gap-4 flex-wrap">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-extrabold text-black">Directory Listing Status</span>
                    <span className="text-[10px] text-slate-500 font-semibold">Only Business Experts with complete registration details are published live.</span>
                  </div>
                  {consultantType !== "Freelancer" && (!govRegNumber || !officeAddress || !licenseUploaded || !businessName || !contactNumber) ? (
                    <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">🔴 Draft (Details Incomplete)</span>
                  ) : (
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">🟢 Live on Directory</span>
                  )}
                </div>

                <div className="pt-4 flex justify-end">
                  <button 
                    onClick={handleSaveProfile}
                    className="bg-black hover:bg-slate-900 text-white font-bold text-xs px-6 py-3.5 rounded-xl tracking-wider transition-all active:scale-[0.98] shadow-md cursor-pointer"
                  >
                    Save Profile Changes
                  </button>
                </div>
              </div>
            ) : activeTab === "inquiries" ? (
              <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm animate-premium-fade">
                <h3 className="text-base font-bold text-black border-b border-slate-100 pb-3 mb-4 tracking-wide">
                  Incoming Applicant Inquiries
                </h3>

                {inquiries.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 font-medium text-sm">
                    No new inquiries currently available.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {inquiries.map(inq => (
                      <div key={inq.id} className="border border-slate-150 rounded-2xl p-5 hover:shadow-md transition-all bg-white relative group">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-black text-sm">{inq.name}</h4>
                            <span className="text-[10px] bg-slate-100 text-black px-2.5 py-0.5 rounded-md font-bold mt-1.5 inline-block tracking-wider">
                              {inq.type} ({inq.country})
                            </span>
                          </div>
                          <span className="text-[10px] font-semibold text-slate-400">{inq.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium mt-3">{inq.message}</p>
                        
                        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end gap-2.5">
                          <button 
                            onClick={() => setInquiries(inquiries.filter(item => item.id !== inq.id))}
                            className="text-xs font-bold text-slate-450 hover:text-black px-3.5 py-1.5 transition-colors"
                          >
                            Decline
                          </button>
                          <button 
                            onClick={() => handleAcceptInquiry(inq.id)}
                            className="bg-black hover:bg-slate-900 text-white text-xs font-bold tracking-wider px-5 py-2 rounded-xl active:scale-95 transition-all shadow-sm"
                          >
                            Accept Inquiry
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : activeTab === "cases" ? (
              <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm animate-premium-fade">
                <h3 className="text-base font-bold text-black border-b border-slate-100 pb-3 mb-4 tracking-wide">
                  Active Client Milestones List
                </h3>

                {activeCases.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 font-medium text-sm">
                    No active cases. Accept inquiries to initiate escrow cases.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeCases.map(c => (
                      <div key={c.id} className="border border-slate-150 rounded-2xl p-5 hover:shadow-md transition-all bg-white relative">
                        <div className="flex items-center justify-between mb-3.5">
                          <h4 className="font-bold text-black text-sm">{c.name}</h4>
                          <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-md">
                            {c.escrow}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-black">{c.visa}</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-1 tracking-wider">{c.status}</p>

                        <div className="mt-5">
                          <div className="flex items-center justify-between text-[10px] font-bold mb-1.5">
                            <span>Case milestone progress</span>
                            <span>{c.progress}%</span>
                          </div>
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={c.progress}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              setActiveCases(activeCases.map(item => item.id === c.id ? { ...item, progress: val, status: val === 100 ? "Completed & Escrow Released" : "milestone in-progress" } : item));
                            }}
                            className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-black" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : activeTab === "upgrade" ? (
              <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm animate-premium-fade">
                <h3 className="text-base font-bold text-black border-b border-slate-100 pb-3 mb-6 tracking-wide">
                  Membership Tier Plans Comparison
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="border border-slate-150 rounded-2xl p-6 shadow-sm space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider">Current Tier</span>
                      <h4 className="text-lg font-bold text-black mt-1">Standard Directory</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">Basic directory listing, standard case commission applies. Receive applicant inquiries up to 5 per week.</p>
                    <button 
                      disabled={true}
                      className="w-full bg-slate-100 text-slate-400 py-2.5 rounded-lg text-xs font-bold tracking-wider cursor-not-allowed"
                    >
                      Coming Soon
                    </button>
                  </div>

                  <div className="border-2 border-black rounded-2xl p-6 shadow-sm space-y-4 relative overflow-hidden bg-slate-50/20">
                    <span className="absolute top-2.5 right-2.5 text-[9px] font-bold bg-black text-white px-2 py-0.5 rounded-md">Highly Rated</span>
                    <div>
                      <span className="text-[10px] font-bold text-slate-550 tracking-wider">Premium Partner</span>
                      <h4 className="text-lg font-bold text-[#111111] mt-1">Elite Accelerator</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">Featured directory listing boost, direct messaging to all applicants, zero commission on escrow bookings, priority support.</p>
                    <button 
                      disabled={true}
                      className="w-full bg-black/60 text-white/80 py-2.5 rounded-lg text-xs font-bold tracking-wider cursor-not-allowed"
                    >
                      Coming Soon
                    </button>
                  </div>
                </div>
              </div>
            ) : activeTab === "photos" ? (
              <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm space-y-6 animate-premium-fade">
                <h3 className="text-base font-bold text-black border-b border-slate-100 pb-3 tracking-wide">
                  Upload Photos & Gallery Documents
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="border-2 border-dashed border-slate-250 rounded-2xl p-6 text-center hover:bg-slate-50 cursor-pointer transition-all block group">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2 group-hover:text-black transition-colors" />
                    <span className="text-xs font-bold text-black block">Upload Case Success Files</span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block font-semibold">PDF, JPG, PNG up to 10MB</span>
                    <input 
                      type="file" 
                      accept="image/*,application/pdf"
                                  onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileUpload(file);
                        }
                      }}
                    />
                  </label>

                  <label className="border-2 border-dashed border-slate-250 rounded-2xl p-6 text-center hover:bg-slate-50 cursor-pointer transition-all block group">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2 group-hover:text-black transition-colors" />
                    <span className="text-xs font-bold text-black block">Upload ID Document/License</span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block font-semibold">PDF, JPG, PNG up to 10MB</span>
                    <input 
                      type="file" 
                      accept="image/*,application/pdf"
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileUpload(file);
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="space-y-3 pt-4">
                  <span className="text-xs font-bold text-black block tracking-wider">Uploaded Gallery Files List ({uploadedFiles.length})</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {uploadedFiles.map((file, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-150 p-4.5 rounded-xl flex items-center justify-between text-xs font-bold text-black shadow-sm">
                        <span className="truncate pr-2">{file.name}</span>
                        <button onClick={() => setUploadedFiles(uploadedFiles.filter(item => item.name !== file.name))} className="text-black font-extrabold hover:text-red-650 transition-colors text-sm">×</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </main>
      {showAdModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn px-4">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="font-bold text-sm text-black tracking-wider">Post a New Ad</h3>
                  <button onClick={() => setShowAdModal(false)} className="text-slate-450 hover:text-black font-bold">×</button>
                </div>
                <form onSubmit={handleAddAd} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Ad Title</label>
                    <input 
                      required
                      type="text" 
                      value={adTitle} 
                      onChange={(e) => setAdTitle(e.target.value)} 
                      placeholder="e.g. Express Admission Consultation Session"
                      className="w-full px-4.5 py-3 border rounded-xl text-xs outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Description</label>
                    <textarea 
                      required
                      value={adDescription} 
                      onChange={(e) => setAdDescription(e.target.value)} 
                      placeholder="Give details about your advertisement offer..."
                      rows={3}
                      className="w-full px-4.5 py-3 border rounded-xl text-xs outline-none resize-none"
                    />
                  </div>
                  <div className="flex justify-end gap-2.5 pt-2">
                    <button type="button" onClick={() => setShowAdModal(false)} className="px-4 py-2 border rounded-lg text-xs font-bold text-slate-500">Cancel</button>
                    <button type="submit" className="px-5 py-2 bg-black text-white rounded-lg text-xs font-bold tracking-wider">Publish Ad</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {showOfferModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn px-4">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="font-bold text-sm text-black tracking-wider">Create a Promotional Offer</h3>
                  <button onClick={() => setShowOfferModal(false)} className="text-slate-450 hover:text-black font-bold">×</button>
                </div>
                <form onSubmit={handleAddOffer} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Offer Title</label>
                    <input 
                      required
                      type="text" 
                      value={offerTitle} 
                      onChange={(e) => setOfferTitle(e.target.value)} 
                      placeholder="e.g. Canada Visa Appeal Special discount"
                      className="w-full px-4.5 py-3 border rounded-xl text-xs outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Discount Amount / Percentage</label>
                    <input 
                      required
                      type="text" 
                      value={offerDiscount} 
                      onChange={(e) => setOfferDiscount(e.target.value)} 
                      placeholder="e.g. ₹5,000 or 15%"
                      className="w-full px-4.5 py-3 border rounded-xl text-xs outline-none"
                    />
                  </div>
                  <div className="flex justify-end gap-2.5 pt-2">
                    <button type="button" onClick={() => setShowOfferModal(false)} className="px-4 py-2 border rounded-lg text-xs font-bold text-slate-500">Cancel</button>
                    <button type="submit" className="px-5 py-2 bg-black text-white rounded-lg text-xs font-bold tracking-wider">Launch Offer</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
      
      {step < 3 && (
        <footer className="bg-white border-t border-slate-100 py-6 px-12 text-xs font-semibold text-slate-500 font-sans mt-10">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <span>Copyright © 2022 VisaFormula Corporates</span>
            <div className="flex items-center gap-6">
              <span className="cursor-pointer hover:text-black">Privacy</span>
              <span className="cursor-pointer hover:text-black">Policy</span>
            </div>
          </div>
        </footer>
      )}
      
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
