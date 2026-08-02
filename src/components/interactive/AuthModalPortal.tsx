import { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, CheckCircle, ArrowRight, X, Shield, Sparkles, User, RefreshCw } from "lucide-react";
import { useAuth, AuthProvider } from "../providers/auth-provider";

interface AuthModalPortalProps {
    initialTab?: "login" | "signup";
    initialRole?: "seeker" | "expert";
}

function AuthModalPortalContent({ initialTab = "signup", initialRole = "seeker" }: AuthModalPortalProps) {
    const { signIn, signInWithGoogle } = useAuth();

    // Active Tab & Role state
    const [activeTab, setActiveTab] = useState<"login" | "signup">(initialTab);
    const [role, setRole] = useState<"seeker" | "expert">(initialRole);

    // Form inputs
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [phone, setPhone] = useState("");
    const [isRobotChecked, setIsRobotChecked] = useState(false);

    // UI & Loading states
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [googleLoadingText, setGoogleLoadingText] = useState("");

    // Synchronize initial prop changes if navigated
    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    // Password strength rules
    const hasMinLength = password.length >= 8;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    const getPasswordStrength = () => {
        if (!password) return { label: "", width: "w-0", color: "bg-slate-200" };
        const score = [hasMinLength, hasLowercase, hasUppercase, hasNumber].filter(Boolean).length;
        if (score <= 1) return { label: "Too Short", width: "w-1/4", color: "bg-red-500" };
        if (score === 2) return { label: "Fair", width: "w-2/4", color: "bg-amber-500" };
        if (score === 3) return { label: "Good", width: "w-3/4", color: "bg-blue-500" };
        return { label: "Strong", width: "w-full", color: "bg-emerald-500" };
    };

    const strength = getPasswordStrength();

    // Google Auth Handler
    const handleGoogleAuth = async () => {
        setError("");
        setGoogleLoading(true);
        setGoogleLoadingText("Connecting to Google...");
        try {
            const res = await signInWithGoogle();
            
            if (res && res.status === 'needs_role') {
                // If new user, set role in backend
                const response = await fetch("/api/auth/google/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: res.email,
                        name: res.name,
                        uid: res.uid,
                        role: role
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    if (typeof window !== "undefined") {
                        localStorage.setItem("visaformula_user", JSON.stringify(data.user));
                    }
                }
            }

            setGoogleLoadingText("Authenticated! Opening dashboard...");
            await new Promise(resolve => setTimeout(resolve, 600));

            if (role === "expert") {
                window.location.href = "/consultant/dashboard";
            } else {
                window.location.href = "/dashboard";
            }
        } catch (err: any) {
            setError(err.message || "Google authentication failed.");
            setGoogleLoading(false);
        }
    };

    // Form Submit Handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter a password.");
            return;
        }

        if (activeTab === "signup") {
            if (!firstName || !lastName) {
                setError("Please enter your first and last name.");
                return;
            }
            if (password !== confirmPassword) {
                setError("Passwords do not match.");
                return;
            }
            if (!hasMinLength || !hasLowercase || !hasUppercase || !hasNumber) {
                setError("Password does not meet security requirements below.");
                return;
            }
            if (!isRobotChecked) {
                setError("Please check the 'I'm not a robot' security verification.");
                return;
            }
        }

        setLoading(true);

        try {
            if (activeTab === "login") {
                // Login Flow
                await signIn(email, password);
                const userStr = typeof window !== "undefined" ? localStorage.getItem("visaformula_user") : null;
                if (userStr) {
                    const userObj = JSON.parse(userStr);
                    if (userObj.type === "expert") {
                        window.location.href = "/consultant/dashboard";
                        return;
                    }
                }
                window.location.href = "/dashboard";
            } else {
                // Signup Flow
                const endpoint = role === "expert" ? "/api/register/expert" : "/api/register/seeker";
                const bodyPayload = role === "expert" ? {
                    business_name: `${firstName} ${lastName}`,
                    email: email,
                    password: password,
                    contact_number: phone || "+91 9876543210",
                    advisor_type: "Immigration Lawyer / Visa Consultant",
                    about_me: "Licensed visa consultant providing overseas immigration guidance."
                } : {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password,
                    phone: phone || "+91 9876543210",
                    passport_country: "India",
                    resident_of: "India"
                };

                const res = await fetch(endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bodyPayload)
                });

                if (!res.ok) {
                    const errData = await res.json();
                    setError(errData.message || "Account creation failed.");
                    setLoading(false);
                    return;
                }

                const data = await res.json();
                if (data.user && typeof window !== "undefined") {
                    localStorage.setItem("visaformula_user", JSON.stringify(data.user));
                    if (role === "seeker") {
                        localStorage.setItem("seeker_firstName", firstName);
                        localStorage.setItem("seeker_lastName", lastName);
                        localStorage.setItem("seeker_email", email);
                    } else {
                        localStorage.setItem("expert_businessName", `${firstName} ${lastName}`);
                        localStorage.setItem("expert_email", email);
                        localStorage.setItem("expert_isLoggedIn", "true");
                    }
                }

                // Redirect directly to dashboard
                if (role === "expert") {
                    window.location.href = "/consultant/dashboard";
                } else {
                    window.location.href = "/dashboard";
                }
            }
        } catch (err: any) {
            setError(err?.message || "An error occurred. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center p-3 sm:p-6 font-sans relative selection:bg-blue-600 selection:text-white">
            
            {/* Background Hero Layer */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
                <img src="/logo.png" alt="VisaFormula" className="absolute -right-20 -bottom-20 w-[600px] h-auto object-contain grayscale blur-2xl opacity-40" />
            </div>

            {/* Google Loading Modal Overlay */}
            {googleLoading && (
                <div className="fixed inset-0 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center z-[9999] transition-all duration-300">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm font-bold text-slate-900 tracking-wide animate-pulse">
                            {googleLoadingText}
                        </p>
                    </div>
                </div>
            )}

            {/* Central VisaHQ-Style Auth Card */}
            <div className="relative z-10 w-full max-w-[480px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
                
                {/* Header Close Button */}
                <a href="/" className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all z-20" title="Close & Back to Home">
                    <X className="w-5 h-5" />
                </a>

                {/* Top Dual Tabs: Log in / Create account */}
                <div className="flex items-center border-b border-slate-200 bg-white pt-2 px-6">
                    <button
                        type="button"
                        onClick={() => { setActiveTab("login"); setError(""); }}
                        className={`flex-1 py-3 text-sm font-extrabold transition-all relative ${
                            activeTab === "login"
                                ? "text-slate-900 border-b-2 border-blue-600"
                                : "text-slate-400 hover:text-slate-600"
                        }`}
                    >
                        Log in
                    </button>
                    <button
                        type="button"
                        onClick={() => { setActiveTab("signup"); setError(""); }}
                        className={`flex-1 py-3 text-sm font-extrabold transition-all relative ${
                            activeTab === "signup"
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-slate-400 hover:text-slate-600"
                        }`}
                    >
                        Create account
                    </button>
                </div>

                {/* Main Card Content */}
                <div className="p-6 sm:p-8 space-y-6">
                    
                    {/* Header Title & Subtitle */}
                    <div>
                        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                            {activeTab === "signup" ? "Create your account" : "Log in to your account"}
                        </h1>
                        <p className="text-xs font-semibold text-slate-400 mt-1">
                            {activeTab === "signup"
                                ? "Track applications, book consultations and connect with visa experts"
                                : "Access your VisaFormula workspace and consultation sessions"}
                        </p>
                    </div>

                    {/* Role Selector Pill Toggle (Seeker vs Expert) */}
                    <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
                        <button
                            type="button"
                            onClick={() => setRole("seeker")}
                            className={`flex-1 py-1.5 text-xs font-extrabold rounded-lg transition-all ${
                                role === "seeker"
                                    ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                                    : "text-slate-500 hover:text-slate-800"
                            }`}
                        >
                            🛂 Visa Seeker
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole("expert")}
                            className={`flex-1 py-1.5 text-xs font-extrabold rounded-lg transition-all ${
                                role === "expert"
                                    ? "bg-white text-blue-600 shadow-xs border border-slate-200/80"
                                    : "text-slate-500 hover:text-slate-800"
                            }`}
                        >
                            💼 Visa Expert
                        </button>
                    </div>

                    {/* Google Social SSO Button */}
                    <button
                        type="button"
                        onClick={handleGoogleAuth}
                        className="w-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-3 transition-all shadow-xs cursor-pointer active:scale-[0.99]"
                    >
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        <span>Continue with Google</span>
                    </button>

                    {/* Divider */}
                    <div className="relative flex items-center justify-center my-4">
                        <div className="border-t border-slate-200 w-full" />
                        <span className="bg-white px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider relative z-10 shrink-0">
                            {activeTab === "signup" ? "Or sign up with email" : "Or log in with email"}
                        </span>
                    </div>

                    {/* Error Banner */}
                    {error && (
                        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                            {error}
                        </div>
                    )}

                    {/* Form Controls */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        {/* Name Grid for Signup */}
                        {activeTab === "signup" && (
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[11px] font-extrabold text-slate-700 mb-1">
                                        First name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="First name"
                                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-semibold focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all placeholder:text-slate-300"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-extrabold text-slate-700 mb-1">
                                        Last name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Last name"
                                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-semibold focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all placeholder:text-slate-300"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email Input */}
                        <div>
                            <label className="block text-[11px] font-extrabold text-slate-700 mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-semibold focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all placeholder:text-slate-300"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="block text-[11px] font-extrabold text-slate-700">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                {activeTab === "login" && (
                                    <a href="/forgot-password" className="text-[11px] font-bold text-blue-600 hover:underline">
                                        Forgot password?
                                    </a>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={activeTab === "signup" ? "Create password" : "Enter password"}
                                    className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-semibold focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all placeholder:text-slate-300"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>

                            {/* Password Strength Meter for Signup */}
                            {activeTab === "signup" && password && (
                                <div className="mt-2 space-y-1">
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className={`h-full transition-all duration-300 ${strength.width} ${strength.color}`} />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-500 block text-right">
                                        {strength.label}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password for Signup */}
                        {activeTab === "signup" && (
                            <div>
                                <label className="block text-[11px] font-extrabold text-slate-700 mb-1">
                                    Confirm password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Repeat your password"
                                        className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-semibold focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all placeholder:text-slate-300"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Security Requirements Checklist for Signup */}
                        {activeTab === "signup" && (
                            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-1.5">
                                <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">
                                    For security reasons, your password must contain:
                                </p>
                                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] font-semibold text-slate-600">
                                    <span className={`flex items-center gap-1 ${hasLowercase ? "text-emerald-600 font-bold" : "text-slate-400"}`}>
                                        • One lowercase character
                                    </span>
                                    <span className={`flex items-center gap-1 ${hasMinLength ? "text-emerald-600 font-bold" : "text-slate-400"}`}>
                                        • Eight characters minimum
                                    </span>
                                    <span className={`flex items-center gap-1 ${hasUppercase ? "text-emerald-600 font-bold" : "text-slate-400"}`}>
                                        • One uppercase character
                                    </span>
                                    <span className={`flex items-center gap-1 ${hasNumber ? "text-emerald-600 font-bold" : "text-slate-400"}`}>
                                        • One number
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Security reCAPTCHA Widget Box for Signup */}
                        {activeTab === "signup" && (
                            <div className="border border-slate-300 rounded-xl p-3 bg-white flex items-center justify-between shadow-2xs">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isRobotChecked}
                                        onChange={(e) => setIsRobotChecked(e.target.checked)}
                                        className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <span className="text-xs font-bold text-slate-800">I'm not a robot</span>
                                </label>
                                <div className="flex flex-col items-center opacity-75">
                                    <RefreshCw className="w-5 h-5 text-blue-600 animate-spin-slow" />
                                    <span className="text-[9px] font-bold text-slate-400">reCAPTCHA</span>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Processing...</span>
                                </span>
                            ) : (
                                <span>{activeTab === "signup" ? "Create account" : "Log in"}</span>
                            )}
                        </button>
                    </form>

                    {/* Terms Subtext */}
                    <p className="text-[10px] text-center text-slate-400 font-semibold leading-relaxed">
                        By {activeTab === "signup" ? "creating an account" : "logging in"}, you agree to our{" "}
                        <a href="/terms" className="text-blue-600 font-bold hover:underline">Terms of service</a> and{" "}
                        <a href="/privacy" className="text-blue-600 font-bold hover:underline">privacy policy</a>
                    </p>

                    {/* Feature Badges Bottom Row */}
                    <div className="pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-bold text-slate-600">
                        <span className="flex items-center gap-1 justify-center sm:justify-start">
                            <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>Track orders live</span>
                        </span>
                        <span className="flex items-center gap-1 justify-center sm:justify-start">
                            <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>Save profiles</span>
                        </span>
                        <span className="flex items-center gap-1 justify-center sm:justify-start">
                            <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>Direct expert access</span>
                        </span>
                        <span className="flex items-center gap-1 justify-center sm:justify-start">
                            <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>Email updates</span>
                        </span>
                    </div>

                </div>

            </div>

        </div>
    );
}

export function AuthModalPortal(props: AuthModalPortalProps) {
    return (
        <AuthProvider>
            <AuthModalPortalContent {...props} />
        </AuthProvider>
    );
}
