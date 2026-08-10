import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import { useAuth, AuthProvider } from "../providers/auth-provider";

function LoginPortalContent() {
    const { signIn, signInWithGoogle } = useAuth();
    const [loginStep, setLoginStep] = useState<0 | 1>(0); // 0 = Email, 1 = Password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [googleLoadingText, setGoogleLoadingText] = useState("");

    const handleGoogleLogin = async () => {
        setError("");
        setGoogleLoading(true);
        setGoogleLoadingText("Connecting to Google...");
        try {
            const res = await signInWithGoogle();
            if (res && res.status === 'needs_role') {
                setGoogleLoading(false);
                return;
            }
            // Use redirect URL from backend response (correctly identifies expert vs seeker)
            if (res?.redirect) {
                window.location.href = res.redirect;
                return;
            }
            // Fallback: read from localStorage
            const userStr = typeof window !== "undefined" ? localStorage.getItem("visaformula_user") : null;
            if (userStr) {
                try {
                    const parsed = JSON.parse(userStr);
                    window.location.href = parsed.type === "expert" ? "/consultant/dashboard" : "/dashboard";
                } catch { window.location.href = "/dashboard"; }
            } else {
                window.location.href = "/dashboard";
            }
        } catch (e: any) {
            setError(e.message || "Google Login failed.");
            setGoogleLoading(false);
        }
    };

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        setError("");
        setLoginStep(1);
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password) {
            setError("Please enter your password.");
            return;
        }
        setError("");
        setLoading(true);
        try {
            await signIn(email, password);
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
            setError(err?.message?.includes("invalid") ? "Invalid email or password." : err?.message || "Login failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-start sm:justify-center p-3 sm:p-6 font-sans overflow-y-auto no-scrollbar">
            
            {/* Top Back Button */}
            <div className="w-full max-w-md flex items-center justify-between mb-3 px-1 shrink-0 gap-2">
                <a href="/" className="flex items-center gap-1.5 text-xs font-bold text-white/90 hover:text-white transition-colors bg-white/15 px-3 py-1.5 rounded-full border border-white/25 backdrop-blur-md shadow-sm shrink-0">
                    <ArrowLeft className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Back to </span>Home
                </a>
                <a href="/" className="shrink-0">
                    <img src="/logo.png?v=3" alt="VisaFormula Logo" className="h-10 sm:h-14 w-auto object-contain max-w-[160px] sm:max-w-none" />
                </a>
            </div>

            {/* Main Clean White Login Box (Exact Screenshot Replica) */}
            <div className="bg-white rounded-[32px] p-5 sm:p-8 max-w-md w-[94vw] sm:w-full shadow-2xl border border-slate-200/80 space-y-5 sm:space-y-6 text-slate-900 relative animate-fade-up max-h-[88vh] overflow-y-auto no-scrollbar my-auto">
                
                {/* Logo Centered */}
                <div className="flex justify-center pt-1">
                    <img src="/logo.png?v=3" alt="VisaFormula Logo" className="h-14 sm:h-16 w-auto max-h-[70px] object-contain mx-auto" />
                </div>

                {/* Title */}
                <div className="text-center space-y-1.5">
                    <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight max-w-[280px] sm:max-w-xs mx-auto">
                        Sign in to get started with VisaFormula
                    </h1>
                    {/* Step indicator dots */}
                    <div className="flex items-center justify-center gap-1.5 pt-1">
                        <span className={`h-1.5 rounded-full transition-all duration-300 ${loginStep === 0 ? "w-8 bg-black" : "w-2 bg-slate-200"}`} />
                        <span className={`h-1.5 rounded-full transition-all duration-300 ${loginStep === 1 ? "w-8 bg-black" : "w-2 bg-slate-200"}`} />
                    </div>
                </div>

                {error && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold text-center">
                        {error}
                    </div>
                )}

                {/* Step 0: Email Input */}
                {loginStep === 0 ? (
                    <form onSubmit={handleNextStep} className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-xs font-bold text-slate-900">
                                    Email address
                                </label>
                                <a href="/forgot-password" className="text-xs font-bold text-slate-900 hover:underline">
                                    Forgot password?
                                </a>
                            </div>
                            <div className="relative">
                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="john@example.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm sm:text-xs font-medium focus:outline-none focus:ring-2 focus:ring-black transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black hover:bg-slate-900 text-white font-bold py-3.5 rounded-2xl text-xs sm:text-sm transition-all cursor-pointer shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
                        >
                            Continue <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                ) : (
                    /* Step 1: Password Input */
                    <form onSubmit={handleEmailLogin} className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-xs font-bold text-slate-900">
                                    Password ({email})
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setLoginStep(0)}
                                    className="text-xs font-bold text-slate-500 hover:text-slate-900"
                                >
                                    Change email
                                </button>
                            </div>
                            <div className="relative">
                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <input
                                    type={showPwd ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-10 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-sm sm:text-xs font-medium focus:outline-none focus:ring-2 focus:ring-black transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPwd(!showPwd)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                >
                                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black hover:bg-slate-900 text-white font-bold py-3.5 rounded-2xl text-xs sm:text-sm transition-all cursor-pointer shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
                        >
                            {loading ? "Signing in..." : "Sign in"} <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                )}

                {/* Divider */}
                <div className="flex items-center gap-3 my-3">
                    <div className="flex-1 h-px bg-slate-200" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        — OR —
                    </span>
                    <div className="flex-1 h-px bg-slate-200" />
                </div>

                {/* Google SSO Button */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={googleLoading}
                    className="w-full bg-white hover:bg-slate-50 text-slate-900 font-bold py-3.5 px-4 rounded-2xl border border-slate-200 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-2xs hover:shadow-xs active:scale-[0.99]"
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

                {/* Bottom Registration Links */}
                <div className="pt-2 text-center space-y-3">
                    <p className="text-xs font-semibold text-slate-500">
                        Don't have an account yet?
                    </p>
                    <div className="grid grid-cols-2 gap-2.5">
                        <a
                            href="/signup/seeker"
                            className="bg-black hover:bg-slate-900 text-white font-bold py-3 px-3 rounded-2xl text-xs transition-all shadow-sm flex items-center justify-center text-center cursor-pointer"
                        >
                            Register as Seeker
                        </a>
                        <a
                            href="/signup/expert"
                            className="bg-white hover:bg-slate-50 text-slate-900 font-bold py-3 px-3 rounded-2xl text-xs border border-slate-200 transition-all shadow-2xs flex items-center justify-center text-center cursor-pointer"
                        >
                            Register as Expert
                        </a>
                    </div>
                </div>

            </div>

        </div>
    );
}

export function LoginPortal() {
    return (
        <AuthProvider>
            <LoginPortalContent />
        </AuthProvider>
    );
}
