import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth, AuthProvider } from "../providers/auth-provider";

function LoginPortalContent() {
    const { signIn, signInWithGoogle } = useAuth();
    const [loginStep, setLoginStep] = useState(0); // 0 = Email, 1 = Password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [googleLoadingText, setGoogleLoadingText] = useState("");
    const [onboardingUser, setOnboardingUser] = useState<any>(null);

    const handleGoogleLogin = async () => {
        setError("");
        setGoogleLoading(true);
        setGoogleLoadingText("Connecting to Google Auth...");
        try {
            const res = await signInWithGoogle();
            
            // Check if user is brand new and needs role selection
            if (res && res.status === 'needs_role') {
                setGoogleLoading(false);
                setOnboardingUser(res);
                return;
            }

            setGoogleLoadingText("Authenticated! Setting up your workspace...");
            
            // Premium transition delay
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
                // Default fallback redirect
                window.location.href = "/dashboard";
            }
        } catch (e: any) {
            setError(e.message || "Google Login failed.");
            setGoogleLoading(false);
        }
    };

    const handleCompleteOnboarding = async (role: 'seeker' | 'expert') => {
        if (!onboardingUser) return;
        setError("");
        setGoogleLoading(true);
        setGoogleLoadingText("Creating your visa profile...");
        try {
            const response = await fetch("/api/auth/google/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: onboardingUser.email,
                    name: onboardingUser.name,
                    uid: onboardingUser.uid,
                    role: role
                })
            });

            if (response.ok) {
                const data = await response.json();
                
                if (typeof window !== "undefined") {
                    localStorage.setItem("visaformula_user", JSON.stringify(data.user));
                    
                    if (data.user && data.user.rawUser) {
                        const raw = data.user.rawUser;
                        if (role === "seeker") {
                            localStorage.setItem("seeker_firstName", raw.first_name || "Seeker");
                            localStorage.setItem("seeker_lastName", raw.last_name || "");
                            localStorage.setItem("seeker_email", raw.email);
                            localStorage.setItem("seeker_passportCountry", raw.passport_country || "");
                            localStorage.setItem("seeker_goals", typeof raw.goals === "string" ? raw.goals : JSON.stringify(raw.goals || []));
                            localStorage.setItem("seeker_destinations", typeof raw.destinations === "string" ? raw.destinations : JSON.stringify(raw.destinations || []));
                        } else {
                            localStorage.setItem("expert_businessName", raw.business_name || "Expert");
                            localStorage.setItem("expert_email", raw.email);
                            localStorage.setItem("expert_isLoggedIn", "true");
                        }
                    }
                }

                setGoogleLoadingText("Profile initialized! Opening dashboard...");
                await new Promise(resolve => setTimeout(resolve, 800));

                if (role === "expert") {
                    window.location.href = "/consultant/dashboard";
                } else {
                    window.location.href = "/dashboard";
                }
            } else {
                const errData = await response.json();
                setError(errData.message || "Failed to complete role registration.");
                setGoogleLoading(false);
            }
        } catch (err: any) {
            setError(err.message || "An error occurred.");
            setGoogleLoading(false);
        }
    };

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError("Please enter your email.");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
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
            setError(err?.message?.includes("invalid")
                ? "Invalid email or password."
                : err?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    if (onboardingUser) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-16 font-sans relative">
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
                    }
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-8px); }
                    }
                    @keyframes pulse-ring {
                        0% { transform: scale(1); opacity: 0.4; }
                        50% { transform: scale(1.08); opacity: 0.15; }
                        100% { transform: scale(1); opacity: 0.4; }
                    }
                    .circle-float-1 { animation: float 4s ease-in-out infinite; }
                    .circle-float-2 { animation: float 4s ease-in-out infinite 0.5s; }
                    .pulse-ring { animation: pulse-ring 3s ease-in-out infinite; }
                `}} />

                {/* Logo */}
                <div className="inline-flex items-center justify-center gap-2 group mb-4">
                    <img src="/logo.png" alt="VisaFormula" className="h-40 w-auto object-contain mx-auto" />
                </div>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5 mb-6">
                    <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span className="text-xs font-bold text-slate-800">Join 50,000+ users</span>
                </div>

                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl font-extrabold text-black mb-2 text-center">
                    I want to join as
                </h1>
                <p className="text-slate-400 text-sm mb-12 text-center">Select your role to get started with VisaFormula</p>

                {/* Selection Cards */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-20 mb-12">
                    
                    {/* Seeker Option */}
                    <div onClick={() => handleCompleteOnboarding('seeker')} className="group flex flex-col items-center text-center cursor-pointer">
                        <div className="relative circle-float-1">
                            <div className="absolute inset-[-6px] rounded-full border-2 border-slate-100 pulse-ring"></div>
                            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:shadow-xl group-hover:border-black transition-all duration-300 relative z-10">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="sm:w-14 sm:h-14">
                                    <circle cx="12" cy="8" r="3.5" fill="#000" opacity="0.2"></circle>
                                    <circle cx="12" cy="8" r="3.5" stroke="#000" strokeWidth="1.8" fill="none"></circle>
                                    <path d="M5 20c0-3 3.1-5.5 7-5.5s7 2.5 7 5.5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" fill="none"></path>
                                    <path d="M16 4l1.5 1.5L16 7" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M17.5 5.5H15" stroke="#000" strokeWidth="1.5" strokeLinecap="round"></path>
                                </svg>
                            </div>
                        </div>
                        <span className="mt-5 font-extrabold text-black text-base sm:text-lg group-hover:text-slate-600 transition-colors">Visa Seeker</span>
                        <span className="text-xs text-slate-400 mt-1 mb-4 font-semibold">Find, consult & book immigration experts</span>
                        <span className="bg-black hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-[0.97]">
                            Register as Seeker <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                    </div>

                    {/* Divider */}
                    <div className="flex flex-row sm:flex-col items-center gap-2 text-slate-200 font-bold text-xs tracking-widest py-4">
                        <div className="w-12 sm:w-px h-px sm:h-10 bg-slate-200"></div>
                        <span className="text-slate-400">OR</span>
                        <div className="w-12 sm:w-px h-px sm:h-10 bg-slate-200"></div>
                    </div>

                    {/* Expert Option */}
                    <div onClick={() => handleCompleteOnboarding('expert')} className="group flex flex-col items-center text-center cursor-pointer">
                        <div className="relative circle-float-2">
                            <div className="absolute inset-[-6px] rounded-full border-2 border-slate-100 pulse-ring"></div>
                            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:shadow-xl group-hover:border-black transition-all duration-300 relative z-10">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="sm:w-14 sm:h-14">
                                    <rect x="5" y="2" width="14" height="20" rx="3" fill="#000" opacity="0.12"></rect>
                                    <rect x="5" y="2" width="14" height="20" rx="3" stroke="#000" strokeWidth="1.8" fill="none"></rect>
                                    <circle cx="12" cy="10" r="2.5" stroke="#000" strokeWidth="1.5" fill="none"></circle>
                                    <path d="M8.5 16c0-1.5 1.6-2.8 3.5-2.8s3.5 1.3 3.5 2.8" stroke="#000" strokeWidth="1.5" strokeLinecap="round" fill="none"></path>
                                    <circle cx="16" cy="5" r="0.7" fill="#000"></circle>
                                    <circle cx="16" cy="7.5" r="0.7" fill="#000"></circle>
                                </svg>
                            </div>
                        </div>
                        <span className="mt-5 font-extrabold text-black text-base sm:text-lg group-hover:text-slate-600 transition-colors">Visa Expert</span>
                        <span className="text-xs text-slate-400 mt-1 mb-4 font-semibold">Grow your global client consulting practice</span>
                        <span className="bg-black hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-[0.97]">
                            Register as Expert <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                    </div>

                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gray-50/50 font-opensans relative">
            {googleLoading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center z-[9999] transition-all duration-300">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm font-bold text-black font-opensans tracking-wide animate-pulse">
                            {googleLoadingText}
                        </p>
                    </div>
                </div>
            )}
            <style dangerouslySetInnerHTML={{__html: `
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
                * {
                    font-family: 'Plus Jakarta Sans', sans-serif !important;
                }
            `}} />
            {/* Back Button - Top Left */}
            <a href="/" className="absolute top-6 left-6 flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 bg-white text-xs font-bold text-black hover:bg-slate-50 shadow-sm transition-all z-50 font-opensans shrink-0">
                <span className="text-sm font-semibold">&larr;</span>
                <span>Back to Home</span>
            </a>

            <div className="w-full max-w-md">
                {/* Login Container Box with border */}
                <div className="w-full bg-white border-2 border-black rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-150/40">
                    <div className="text-center mb-4">
                        <a href="/" className="inline-flex items-center justify-center gap-2 group mb-0">
                            <img src="/logo.png" alt="VisaFormula" className="h-28 w-auto object-contain mx-auto" />
                        </a>
                    </div>

                    <p className="text-black text-base font-bold text-center mb-6 font-opensans">
                        Sign in to get started with VisaFormula
                    </p>

                    {/* Dot Step Indicator */}
                    <div className="flex justify-center gap-2 mb-6">
                        <span className={`h-2 rounded-full transition-all duration-300 ${loginStep === 0 ? "w-8 bg-black" : "w-2 bg-gray-200"}`} />
                        <span className={`h-2 rounded-full transition-all duration-300 ${loginStep === 1 ? "w-8 bg-black" : "w-2 bg-gray-200"}`} />
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-xs font-semibold font-opensans">
                            {error}
                        </div>
                    )}

                    {loginStep === 0 ? (
                        <form onSubmit={handleNextStep} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-black tracking-wider mb-1 block font-opensans">Email address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="john@example.com"
                                        required
                                        className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-100 focus:border-black font-semibold transition-all text-sm text-black font-opensans"
                                    />
                                </div>
                            </div>

                            <button type="submit" className="w-full h-12 rounded-xl font-bold text-sm gap-2 bg-black hover:bg-slate-900 transition-all text-white flex items-center justify-center shadow-sm font-opensans">
                                Continue
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleEmailLogin} className="space-y-5">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-bold text-black tracking-wider mb-1 block font-opensans">Email address</label>
                                    <button 
                                        type="button" 
                                        onClick={() => setLoginStep(0)} 
                                        className="text-xs font-semibold text-slate-500 hover:text-black transition-colors"
                                    >
                                        Change
                                    </button>
                                </div>
                                <div className="w-full h-12 px-4 rounded-xl border border-gray-150 bg-gray-50/50 flex items-center text-sm font-semibold text-slate-700">
                                    {email}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-black tracking-wider mb-1 block font-opensans">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showPwd ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            required
                                            className="w-full h-12 pl-12 pr-12 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-100 focus:border-black font-semibold transition-all text-sm text-black font-opensans"
                                        />
                                        <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                            {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me & Forgot Password Row */}
                                <div className="flex items-center justify-between font-opensans">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer accent-black"
                                        />
                                        <span className="text-xs font-semibold text-slate-500 group-hover:text-black transition-colors select-none">
                                            Remember me
                                        </span>
                                    </label>
                                    <a href="#" className="text-xs font-bold text-black hover:underline font-opensans">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <button type="submit" disabled={loading} className="w-full h-12 rounded-xl font-bold text-sm gap-2 bg-black hover:bg-slate-900 transition-all text-white flex items-center justify-center shadow-sm font-opensans">
                                {loading ? "Signing in..." : "Sign In"}
                                {!loading && <ArrowRight className="w-4 h-4" />}
                            </button>
                        </form>
                    )}

                    <div className="relative my-5 flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <span className="relative px-3 bg-white text-[10px] font-bold text-slate-400 tracking-wider font-opensans uppercase bg-white">— OR —</span>
                    </div>

                    <button 
                        type="button" 
                        onClick={handleGoogleLogin} 
                        disabled={loading}
                        className="w-full h-12 rounded-xl border border-gray-200 hover:bg-slate-50 transition-all font-bold text-sm text-black flex items-center justify-center gap-2.5 font-opensans shadow-sm cursor-pointer disabled:opacity-50"
                    >
                        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                            <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.64 14.99 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.85 2.99c.92-2.76 3.49-4.51 6.76-4.51z"/>
                            <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.35H12v4.51h6.48c-.29 1.48-1.14 2.73-2.43 3.58l3.77 2.92c2.2-2.03 3.47-5.01 3.47-8.66z"/>
                            <path fill="#FBBC05" d="M5.24 10.55c-.24-.72-.37-1.49-.37-2.28s.13-1.56.37-2.28L1.39 7.56C.5 9.36 0 11.37 0 13.5s.5 4.14 1.39 5.94l3.85-2.99c-.24-.72-.37-1.49-.37-2.28s.13-1.56.37-2.28z"/>
                            <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.77-2.92c-1.09.73-2.49 1.16-4.19 1.16-3.27 0-5.84-1.75-6.76-4.51L1.39 16.8C3.37 20.33 7.35 23 12 23z"/>
                        </svg>
                        <span>Continue with Google</span>
                    </button>

                    <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-3">
                        <div className="text-center text-[11px] text-slate-500 font-bold tracking-wider mb-1 font-opensans">
                            Don't have an account yet?
                        </div>
                        <div className="flex gap-3">
                            <a 
                                href="/signup" 
                                className="flex-1 text-center py-2.5 bg-black hover:bg-slate-900 text-white border border-black rounded-xl font-bold text-xs transition-colors font-opensans"
                            >
                                Register as Seeker
                            </a>
                            <a 
                                href="/signup/expert" 
                                className="flex-1 text-center py-2.5 bg-white hover:bg-slate-50 border border-gray-200 text-black rounded-xl font-bold text-xs transition-colors font-opensans"
                            >
                                Register as Expert
                            </a>
                        </div>
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
