import React, { useState } from "react";
import { 
    Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, CheckCircle, 
    Sparkles, ShieldCheck, GraduationCap, Briefcase, Plane, Home, X, Globe, User, Phone, MapPin 
} from "lucide-react";
import { useAuth, AuthProvider } from "../providers/auth-provider";

const goals = [
    { id: "study", icon: GraduationCap, label: "Study Abroad", desc: "Find universities & student visas" },
    { id: "work", icon: Briefcase, label: "Work Overseas", desc: "Work permits, H-1B, PR pathways" },
    { id: "visit", icon: Plane, label: "Visit / Tourist", desc: "Short-stay & tourist visas" },
    { id: "settle", icon: Home, label: "Settle Permanently", desc: "Express Entry, PR, citizenship" },
];

const destinations = ["Canada", "USA", "UK", "Australia", "New Zealand", "Germany", "Ireland", "Singapore", "UAE", "France"];

const countryOptions = [
    "India", "Canada", "United States", "United Kingdom", "Australia", 
    "Germany", "UAE", "Singapore", "New Zealand", "Pakistan", "Bangladesh", 
    "Nepal", "Sri Lanka", "Nigeria", "Philippines", "Other"
];

const visaStatusOptions = [
    "Citizen", "Permanent Resident", "Work Permit", 
    "Student Visa", "Tourist / Visitor", "No Active Visa", "Other"
];

interface AuthModalProps {
    defaultTab?: "login" | "signup";
    onClose?: () => void;
}

export function AuthModalPortalContent({ defaultTab = "signup", onClose }: AuthModalProps) {
    const { signIn, signInWithGoogle } = useAuth();
    const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab);

    // --- LOGIN STATES ---
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [showLoginPwd, setShowLoginPwd] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);

    // --- SIGNUP STATES ---
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [showSignupPwd, setShowSignupPwd] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPwd, setShowConfirmPwd] = useState(false);
    
    // Additional Seeker Details Collected
    const [countryCode, setCountryCode] = useState("+91");
    const [phone, setPhone] = useState("");
    const [countryOfCitizenship, setCountryOfCitizenship] = useState("India");
    const [residentOf, setResidentOf] = useState("India");
    const [currentVisaStatus, setCurrentVisaStatus] = useState("Citizen");
    
    // Address Details
    const [addressArea, setAddressArea] = useState("");
    const [addressCity, setAddressCity] = useState("");
    const [addressState, setAddressState] = useState("");
    const [addressZip, setAddressZip] = useState("");

    // Goals & Destinations
    const [selectedGoals, setSelectedGoals] = useState<string[]>(["study"]);
    const [selectedDests, setSelectedDests] = useState<string[]>(["Canada"]);

    // Verification & Loading States
    const [emailVerified, setEmailVerified] = useState(false);
    const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(""));
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otpError, setOtpError] = useState("");
    const [sendingCode, setSendingCode] = useState(false);
    const [signupError, setSignupError] = useState("");
    const [signupLoading, setSignupLoading] = useState(false);

    // Google SSO States
    const [googleLoading, setGoogleLoading] = useState(false);
    const [googleLoadingText, setGoogleLoadingText] = useState("");

    // --- PASSWORD VALIDATION RULES ---
    const hasMinLength = signupPassword.length >= 8;
    const hasLowercase = /[a-z]/.test(signupPassword);
    const hasUppercase = /[A-Z]/.test(signupPassword);
    const hasNumber = /[0-9]/.test(signupPassword);
    const isPasswordValid = hasMinLength && hasLowercase && hasUppercase && hasNumber;
    const passwordsMatch = signupPassword && confirmPassword && signupPassword === confirmPassword;

    // Password Strength Score (0 to 4)
    const passedCriteriaCount = [hasMinLength, hasLowercase, hasUppercase, hasNumber].filter(Boolean).length;
    const getStrengthLabel = () => {
        if (!signupPassword) return { text: "Too Short", color: "bg-slate-200 text-slate-400", width: "w-1/4" };
        if (passedCriteriaCount <= 1) return { text: "Too Short", color: "bg-red-500 text-red-600", width: "w-1/4" };
        if (passedCriteriaCount === 2) return { text: "Weak", color: "bg-amber-500 text-amber-600", width: "w-2/4" };
        if (passedCriteriaCount === 3) return { text: "Good", color: "bg-blue-500 text-blue-600", width: "w-3/4" };
        return { text: "Strong", color: "bg-emerald-500 text-emerald-600", width: "w-full" };
    };
    const strength = getStrengthLabel();

    // --- GOOGLE SSO HANDLER ---
    const handleGoogleLogin = async () => {
        setLoginError("");
        setSignupError("");
        setGoogleLoading(true);
        setGoogleLoadingText("Connecting to Google Auth...");
        try {
            const res = await signInWithGoogle();
            if (res && res.status === "needs_role") {
                setGoogleLoading(false);
                return;
            }
            setGoogleLoadingText("Authenticated! Setting up your workspace...");
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const userStr = typeof window !== "undefined" ? localStorage.getItem("visaformula_user") : null;
            if (userStr) {
                const parsed = JSON.parse(userStr);
                if (parsed.type === "expert") {
                    window.location.href = "/consultant/dashboard";
                } else {
                    window.location.href = "/dashboard";
                }
            } else {
                window.location.href = "/dashboard";
            }
        } catch (e: any) {
            setLoginError(e.message || "Google Authentication failed.");
            setGoogleLoading(false);
        }
    };

    // --- LOGIN SUBMIT HANDLER ---
    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!loginEmail || !loginPassword) {
            setLoginError("Please enter both email and password.");
            return;
        }
        setLoginError("");
        setLoginLoading(true);
        try {
            await signIn(loginEmail, loginPassword);
            const userStr = typeof window !== "undefined" ? localStorage.getItem("visaformula_user") : null;
            if (userStr) {
                try {
                    const userObj = JSON.parse(userStr);
                    if (userObj.type === "expert") {
                        window.location.href = "/consultant/dashboard";
                        return;
                    }
                } catch (e) {}
            }
            window.location.href = "/dashboard";
        } catch (err: any) {
            setLoginError(err?.message?.includes("invalid") ? "Invalid email or password." : err?.message || "Login failed.");
        } finally {
            setLoginLoading(false);
        }
    };

    // --- SEND OTP CODE ---
    const handleSendVerificationCode = async () => {
        setSignupError("");
        setOtpError("");
        if (!signupEmail || !/\S+@\S+\.\S+/.test(signupEmail)) {
            setSignupError("Please enter a valid email address.");
            return;
        }
        setSendingCode(true);
        try {
            const res = await fetch("/api/auth/send-verification-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: signupEmail })
            });
            const data = await res.json();
            if (res.ok) {
                setShowOtpModal(true);
            } else {
                setSignupError(data.message || "Failed to send OTP code.");
            }
        } catch (err) {
            setSignupError("Server connection error. Please try again.");
        } finally {
            setSendingCode(false);
        }
    };

    // --- VERIFY OTP CODE AND COMPLETE REGISTRATION ---
    const handleVerifyOtp = async () => {
        const fullCode = otpDigits.join("");
        if (fullCode.length < 6) {
            setOtpError("Please enter the complete 6-digit verification code.");
            return;
        }
        setOtpError("");
        setSendingCode(true);
        try {
            const res = await fetch("/api/auth/verify-email-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: signupEmail, code: fullCode })
            });
            const data = await res.json();
            if (!res.ok) {
                setOtpError(data.message || "Invalid OTP code. Please try again.");
                setSendingCode(false);
                return;
            }
        } catch (err) {
            console.warn("Verify code fallback mode.", err);
        }

        // Complete Seeker Registration
        try {
            const response = await fetch(`${import.meta.env.PUBLIC_BACKEND_URL || ''}/api/register/seeker`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: signupEmail,
                    password: signupPassword,
                    phone: `${countryCode} ${phone}`,
                    country_of_citizenship: countryOfCitizenship,
                    resident_of: residentOf,
                    passport_country: countryOfCitizenship,
                    current_visa_status: currentVisaStatus,
                    goals: selectedGoals,
                    destinations: selectedDests,
                    area: addressArea,
                    city: addressCity,
                    state: addressState,
                    zip_code: addressZip,
                    address: [addressArea, addressCity, addressState, addressZip].filter(Boolean).join(", ")
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.user && typeof window !== "undefined") {
                    localStorage.setItem("visaformula_user", JSON.stringify(data.user));
                }
            }
        } catch (err) {
            console.warn("Fallback to local simulation mode.", err);
        }

        // Save locally for instant client persistence
        if (typeof window !== "undefined") {
            localStorage.setItem("seeker_firstName", firstName);
            localStorage.setItem("seeker_lastName", lastName);
            localStorage.setItem("seeker_phone", `${countryCode} ${phone}`);
            localStorage.setItem("seeker_email", signupEmail);
            localStorage.setItem("seeker_country_of_citizenship", countryOfCitizenship);
            localStorage.setItem("seeker_resident_of", residentOf);
            localStorage.setItem("seeker_current_visa_status", currentVisaStatus);
            localStorage.setItem("seeker_area", addressArea);
            localStorage.setItem("seeker_city", addressCity);
            localStorage.setItem("seeker_state", addressState);
            localStorage.setItem("seeker_zip", addressZip);
            localStorage.setItem("seeker_address", [addressArea, addressCity, addressState, addressZip].filter(Boolean).join(", "));
            localStorage.setItem("seeker_goals", JSON.stringify(selectedGoals));
            localStorage.setItem("seeker_destinations", JSON.stringify(selectedDests));

            // Direct redirect to Seeker Dashboard
            window.location.href = "/dashboard";
        }
    };

    // --- SIGNUP FINAL SUBMIT HANDLER ---
    const handleSignupSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSignupError("");
        
        if (!firstName || !lastName) {
            setSignupError("Please enter your first name and last name.");
            return;
        }
        if (!signupEmail || !/\S+@\S+\.\S+/.test(signupEmail)) {
            setSignupError("Please enter a valid email address.");
            return;
        }
        if (!isPasswordValid) {
            setSignupError("Password does not meet all security requirements.");
            return;
        }
        if (!passwordsMatch) {
            setSignupError("Passwords do not match.");
            return;
        }

        setSignupLoading(true);

        // Dispatch 6-digit OTP code to user's email and open verification modal
        try {
            const res = await fetch("/api/auth/send-verification-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: signupEmail })
            });
            const data = await res.json();
            if (res.ok) {
                setShowOtpModal(true);
            } else {
                setSignupError(data.message || "Failed to send verification OTP code.");
            }
        } catch (err) {
            setShowOtpModal(true);
        } finally {
            setSignupLoading(false);
        }
    };

    const toggleGoal = (id: string) => {
        setSelectedGoals(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);
    };

    const toggleDest = (dest: string) => {
        setSelectedDests(prev => prev.includes(dest) ? prev.filter(d => d !== dest) : [...prev, dest]);
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-start sm:justify-center p-3 sm:p-6 font-sans overflow-y-auto no-scrollbar">
            
            {/* Top Navigation & Logo Header */}
            <div className="w-full max-w-2xl flex items-center justify-between mb-3 px-2 shrink-0">
                <a href="/" className="flex items-center gap-2 text-xs font-bold text-white/80 hover:text-white transition-colors bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-md">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
                </a>
                <a href="/">
                    <img src="/logo-white.png" alt="VisaFormula" className="h-10 sm:h-12 w-auto object-contain" />
                </a>
            </div>

            {/* Central VisaHQ-Style Modal Dialog Container */}
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 max-w-2xl w-full max-h-[88vh] overflow-y-auto no-scrollbar transition-all duration-300 relative my-auto">
                
                {/* Close Button if embedded in modal */}
                {onClose && (
                    <button 
                        onClick={onClose} 
                        className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors z-20"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}

                {/* Top Dual Tabs Switcher (VisaHQ Style) */}
                <div className="flex border-b border-slate-200 text-center font-bold text-sm bg-slate-50/50">
                    <button
                        onClick={() => setActiveTab("login")}
                        className={`flex-1 py-4 text-center transition-all relative cursor-pointer ${
                            activeTab === "login"
                                ? "text-[#2563eb] bg-white font-extrabold"
                                : "text-slate-500 hover:text-slate-900"
                        }`}
                    >
                        Log in
                        {activeTab === "login" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563eb]" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("signup")}
                        className={`flex-1 py-4 text-center transition-all relative cursor-pointer ${
                            activeTab === "signup"
                                ? "text-[#2563eb] bg-white font-extrabold"
                                : "text-slate-500 hover:text-slate-900"
                        }`}
                    >
                        Create account
                        {activeTab === "signup" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563eb]" />
                        )}
                    </button>
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-8 space-y-6">
                    
                    {/* Header Title & Subtitle */}
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                            {activeTab === "login" ? "Log in to your account" : "Create your account"}
                        </h1>
                        <p className="text-xs font-semibold text-slate-500 mt-1">
                            {activeTab === "login" 
                                ? "Access your visa applications, expert bookings, and document vaults." 
                                : "Track applications live, consult verified experts, and manage traveler profiles."}
                        </p>
                    </div>

                    {/* Google SSO Button */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={googleLoading}
                        className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-4 rounded-xl border border-slate-300 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-2xs hover:shadow-xs active:scale-[0.99]"
                    >
                        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        <span className="text-xs sm:text-sm">
                            {googleLoading ? (googleLoadingText || "Connecting Google...") : "Continue with Google"}
                        </span>
                    </button>

                    {/* Divider Line */}
                    <div className="flex items-center gap-3 my-2">
                        <div className="flex-1 h-px bg-slate-200" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {activeTab === "login" ? "OR LOG IN WITH EMAIL" : "OR SIGN UP WITH EMAIL"}
                        </span>
                        <div className="flex-1 h-px bg-slate-200" />
                    </div>

                    {/* ========================================================================= */}
                    {/* LOG IN FORM VIEW */}
                    {/* ========================================================================= */}
                    {activeTab === "login" && (
                        <form onSubmit={handleLoginSubmit} className="space-y-4">
                            
                            {loginError && (
                                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold">
                                    {loginError}
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Email address *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-all"
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <label className="block text-xs font-bold text-slate-700">
                                        Password *
                                    </label>
                                    <a href="/forgot-password" className="text-[11px] font-bold text-[#2563eb] hover:underline">
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showLoginPwd ? "text" : "password"}
                                        required
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-all pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowLoginPwd(!showLoginPwd)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                    >
                                        {showLoginPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loginLoading}
                                className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm transition-all cursor-pointer shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
                            >
                                {loginLoading ? "Authenticating..." : "Log in"} <ArrowRight className="w-4 h-4" />
                            </button>

                            <p className="text-center text-xs text-slate-500 font-semibold pt-2">
                                Don't have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("signup")}
                                    className="text-[#2563eb] font-bold hover:underline cursor-pointer"
                                >
                                    Create account
                                </button>
                            </p>
                        </form>
                    )}

                    {/* ========================================================================= */}
                    {/* CREATE ACCOUNT FORM VIEW (VisaHQ Match + Exact VisaFormula Collected Details) */}
                    {/* ========================================================================= */}
                    {activeTab === "signup" && (
                        <form onSubmit={handleSignupSubmit} className="space-y-4">
                            
                            {signupError && (
                                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold">
                                    {signupError}
                                </div>
                            )}

                            {/* 1. First & Last Name (Two Column Row - VisaHQ Match) */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        First name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="First name"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Last name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Last name"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-all"
                                    />
                                </div>
                            </div>

                            {/* 2. Email Address */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={signupEmail}
                                    onChange={(e) => setSignupEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-all"
                                />
                            </div>

                            {/* 3. Password Input with Strength Progress Bar */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Password *
                                </label>
                                <div className="relative">
                                    <input
                                        type={showSignupPwd ? "text" : "password"}
                                        required
                                        value={signupPassword}
                                        onChange={(e) => setSignupPassword(e.target.value)}
                                        placeholder="Create password"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-all pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowSignupPwd(!showSignupPwd)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                    >
                                        {showSignupPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>

                                {/* Password Strength Bar (VisaHQ Style) */}
                                {signupPassword && (
                                    <div className="mt-2 space-y-1">
                                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                            <div className={`h-full transition-all duration-300 ${strength.color} ${strength.width}`} />
                                        </div>
                                        <div className="flex justify-between text-[10px] font-bold text-slate-400">
                                            <span>Password Strength</span>
                                            <span className={strength.color}>{strength.text}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* 4. Confirm Password Input */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Confirm password *
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPwd ? "text" : "password"}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Repeat your password"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-all pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                    >
                                        {showConfirmPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {confirmPassword && !passwordsMatch && (
                                    <p className="text-[10px] font-bold text-red-500 mt-1">Passwords do not match.</p>
                                )}
                            </div>

                            {/* 5. Live Password Security Checklist (VisaHQ Exact 4 Bullet Layout) */}
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1.5">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                    For security reasons, your password must contain:
                                </p>
                                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] font-semibold text-slate-600">
                                    <div className={`flex items-center gap-1.5 ${hasLowercase ? "text-emerald-700 font-bold" : "text-slate-400"}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${hasLowercase ? "bg-emerald-500" : "bg-slate-300"}`} />
                                        One lowercase character
                                    </div>
                                    <div className={`flex items-center gap-1.5 ${hasMinLength ? "text-emerald-700 font-bold" : "text-slate-400"}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${hasMinLength ? "bg-emerald-500" : "bg-slate-300"}`} />
                                        Eight characters minimum
                                    </div>
                                    <div className={`flex items-center gap-1.5 ${hasUppercase ? "text-emerald-700 font-bold" : "text-slate-400"}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${hasUppercase ? "bg-emerald-500" : "bg-slate-300"}`} />
                                        One uppercase character
                                    </div>
                                    <div className={`flex items-center gap-1.5 ${hasNumber ? "text-emerald-700 font-bold" : "text-slate-400"}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${hasNumber ? "bg-emerald-500" : "bg-slate-300"}`} />
                                        One number
                                    </div>
                                </div>
                            </div>

                            {/* 6. Collected Seeker Details Section (Phone, Citizenship, Address, Goals) */}
                            <div className="pt-2 border-t border-slate-100 space-y-3">
                                <p className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5 text-[#2563eb]" /> Immigration Profile & Contact Details
                                </p>

                                {/* Phone & Passport Country */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                            Phone / WhatsApp *
                                        </label>
                                        <div className="flex gap-1.5">
                                            <input
                                                type="text"
                                                value={countryCode}
                                                onChange={(e) => setCountryCode(e.target.value)}
                                                className="w-16 px-2 py-2 rounded-xl border border-slate-300 text-xs font-bold text-center bg-slate-50"
                                            />
                                            <input
                                                type="tel"
                                                required
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="98765 43210"
                                                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#2563eb]"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                            Passport / Citizenship *
                                        </label>
                                        <select
                                            value={countryOfCitizenship}
                                            onChange={(e) => setCountryOfCitizenship(e.target.value)}
                                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#2563eb] bg-white"
                                        >
                                            {countryOptions.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* Resident Country & Visa Status */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                            Resident Country *
                                        </label>
                                        <select
                                            value={residentOf}
                                            onChange={(e) => setResidentOf(e.target.value)}
                                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#2563eb] bg-white"
                                        >
                                            {countryOptions.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                            Current Visa Status *
                                        </label>
                                        <select
                                            value={currentVisaStatus}
                                            onChange={(e) => setCurrentVisaStatus(e.target.value)}
                                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#2563eb] bg-white"
                                        >
                                            {visaStatusOptions.map(v => <option key={v} value={v}>{v}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* Residential Address Inputs */}
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                        Residential Address (Area / City / State / Zip)
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            value={addressArea}
                                            onChange={(e) => setAddressArea(e.target.value)}
                                            placeholder="Area / Street"
                                            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium"
                                        />
                                        <input
                                            type="text"
                                            value={addressCity}
                                            onChange={(e) => setAddressCity(e.target.value)}
                                            placeholder="City"
                                            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium"
                                        />
                                        <input
                                            type="text"
                                            value={addressState}
                                            onChange={(e) => setAddressState(e.target.value)}
                                            placeholder="State"
                                            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium"
                                        />
                                        <input
                                            type="text"
                                            value={addressZip}
                                            onChange={(e) => setAddressZip(e.target.value)}
                                            placeholder="PIN / ZIP Code"
                                            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium"
                                        />
                                    </div>
                                </div>

                                {/* Primary Immigration Goals Badges */}
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                        Primary Visa Goals
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {goals.map(g => (
                                            <button
                                                type="button"
                                                key={g.id}
                                                onClick={() => toggleGoal(g.id)}
                                                className={`px-3 py-1.5 rounded-xl border text-xs font-bold text-left flex items-center gap-2 transition-all cursor-pointer ${
                                                    selectedGoals.includes(g.id)
                                                        ? "bg-blue-50 border-[#2563eb] text-[#2563eb]"
                                                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                                                }`}
                                            >
                                                <g.icon className="w-3.5 h-3.5 shrink-0" />
                                                <span>{g.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Target Destinations Pills */}
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                        Target Countries
                                    </label>
                                    <div className="flex flex-wrap gap-1.5">
                                        {destinations.map(d => (
                                            <button
                                                type="button"
                                                key={d}
                                                onClick={() => toggleDest(d)}
                                                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                                                    selectedDests.includes(d)
                                                        ? "bg-[#2563eb] text-white shadow-xs"
                                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                                }`}
                                            >
                                                {d}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 7. Submit Action Button */}
                            <button
                                type="submit"
                                disabled={signupLoading}
                                className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm transition-all cursor-pointer shadow-md active:scale-[0.99] flex items-center justify-center gap-2 mt-4"
                            >
                                {signupLoading ? "Creating account..." : "Create account"} <ArrowRight className="w-4 h-4" />
                            </button>

                            {/* 8. Legal Disclaimer (VisaHQ Match) */}
                            <p className="text-[11px] text-center text-slate-400 font-medium pt-1">
                                By creating an account, you agree to our{" "}
                                <a href="/terms" className="text-slate-600 font-bold hover:underline">Terms of service</a> and{" "}
                                <a href="/privacy" className="text-slate-600 font-bold hover:underline">privacy policy</a>
                            </p>

                            {/* 9. Feature Value Props Bullets (VisaHQ Match Bottom Checks) */}
                            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3 text-[11px] font-bold text-slate-600">
                                <span className="flex items-center gap-1">
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Track applications live
                                </span>
                                <span className="flex items-center gap-1">
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Save traveler profiles
                                </span>
                                <span className="flex items-center gap-1">
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Escrow safety
                                </span>
                            </div>

                        </form>
                    )}

                </div>
            </div>

            {/* OTP Verification Modal Overlay */}
            {showOtpModal && (
                <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 z-[9999]">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl border border-slate-200">
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563eb] flex items-center justify-center mx-auto border border-blue-100">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Verify Email Address</h3>
                            <p className="text-xs text-slate-500 mt-1 font-medium">
                                Enter the 6-digit code sent to <span className="font-bold text-slate-800">{signupEmail}</span>
                            </p>
                        </div>

                        {otpError && (
                            <p className="text-xs font-bold text-red-600 bg-red-50 p-2 rounded-lg">{otpError}</p>
                        )}

                        <div className="flex justify-center gap-2">
                            {otpDigits.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`modal-otp-${index}`}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        const newDigits = [...otpDigits];
                                        newDigits[index] = val;
                                        setOtpDigits(newDigits);
                                        if (val && index < 5) {
                                            const nextInput = document.getElementById(`modal-otp-${index + 1}`);
                                            if (nextInput) nextInput.focus();
                                        }
                                    }}
                                    className="w-9 h-11 text-center font-extrabold text-base border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#2563eb] outline-none"
                                />
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={handleVerifyOtp}
                            className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-sm cursor-pointer"
                        >
                            Confirm Verification
                        </button>
                        
                        <button
                            type="button"
                            onClick={() => setShowOtpModal(false)}
                            className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export function AuthModalPortal(props: AuthModalProps) {
    return (
        <AuthProvider>
            <AuthModalPortalContent {...props} />
        </AuthProvider>
    );
}
