import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Gavel, ArrowRight, ArrowLeft } from "lucide-react";
import { useAuth, AuthProvider } from "../providers/auth-provider";
import airplanePaths from "../../data/clean_airplane.json";
import checkmarkPaths from "../../data/clean_checkmark.json";

function LoginPortalContent() {
    const { signIn, signInWithGoogle } = useAuth();
    const handleGoogleLogin = async () => {
        setError("");
        setLoading(true);
        try {
            await signInWithGoogle();
            const userStr = typeof window !== "undefined" ? localStorage.getItem("visaformula_user") : null;
            if (userStr) {
                const parsed = JSON.parse(userStr);
                if (parsed.type === "expert") {
                    window.location.href = "/consultant/dashboard";
                } else {
                    window.location.href = "/dashboard";
                }
            }
        } catch (e: any) {
            setError(e.message || "Google Login failed.");
        } finally {
            setLoading(false);
        }
    };
    const [loginStep, setLoginStep] = useState(0); // 0 = Email, 1 = Password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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
                        window.location.href = "/signup/expert";
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

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gray-50/50 font-opensans relative">
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
                {/* Login Container Box with border (Logo moved inside) */}
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

                    <form onSubmit={handleEmailLogin} className="space-y-5">
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

                    <div className="relative my-5 flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <span className="relative px-3 bg-white text-[10px] font-bold text-slate-400 tracking-wider font-opensans uppercase">— OR —</span>
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
    const [crashError, setCrashError] = useState<string | null>(null);

    useEffect(() => {
        const handleError = (e: ErrorEvent) => {
            setCrashError(e.message || "Unknown client-side runtime error.");
        };
        window.addEventListener("error", handleError);
        return () => window.removeEventListener("error", handleError);
    }, []);

    if (crashError) {
        return (
            <div className="p-6 max-w-lg mx-auto my-12 bg-red-50 text-red-700 font-mono text-xs border border-red-200 rounded-xl shadow-sm">
                <h3 className="font-bold text-sm mb-2">🚨 Client Hydration/Runtime Error Detected:</h3>
                <p className="mb-4">Something went wrong while loading this page in the browser.</p>
                <div className="bg-white p-4 border border-red-100 rounded-lg overflow-auto max-h-60">
                    <pre className="whitespace-pre-wrap">{crashError}</pre>
                </div>
                <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 px-4 py-2 bg-red-700 text-white font-bold rounded-lg hover:bg-red-800 transition-colors cursor-pointer"
                >
                    Force Reload Page
                </button>
            </div>
        );
    }

    return (
        <AuthProvider>
            <LoginPortalContent />
        </AuthProvider>
    );
}
