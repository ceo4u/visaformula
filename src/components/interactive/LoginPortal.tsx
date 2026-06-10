import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Gavel, ArrowRight, ArrowLeft } from "lucide-react";
import { useAuth } from "../providers/auth-provider";

export function LoginPortal() {
    const { signIn } = useAuth();
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
        <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-slate-50 font-sans">
            <div className="w-full max-w-2xl bg-white border border-slate-200 shadow-xl rounded-3xl p-8 md:p-10">
                <div className="text-center mb-8">
                    <a href="/" className="inline-flex items-center gap-2.5 text-2xl font-black mb-2 hover:scale-105 transition-transform">
                        <span className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center shadow-md">
                          <Gavel className="w-5 h-5 text-white" />
                        </span>
                        <span className="font-sora font-extrabold text-navy">Visara</span>
                    </a>
                    <h1 className="text-3xl font-sora font-extrabold tracking-tight text-navy mt-4">
                      Welcome <span className="text-red-500">Back</span>
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm font-medium">Sign in to unlock personalized visa applications</p>
                </div>

                <div className="max-w-md mx-auto">
                    {/* Dot Step Indicator */}
                    <div className="flex justify-center gap-2 mb-6">
                        <span className={`h-2 rounded-full transition-all duration-300 ${loginStep === 0 ? "w-8 bg-slate-900" : "w-2 bg-gray-250"}`} />
                        <span className={`h-2 rounded-full transition-all duration-300 ${loginStep === 1 ? "w-8 bg-slate-900" : "w-2 bg-gray-255"}`} />
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs font-semibold">
                            {error}
                        </div>
                    )}

                    {loginStep === 0 ? (
                        <form onSubmit={handleNextStep} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-navy uppercase tracking-wider mb-1 block">Email address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="john@example.com"
                                        required
                                        className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500 font-semibold transition-all text-sm text-black"
                                    />
                                </div>
                            </div>

                            <button type="submit" className="w-full h-12 rounded-xl font-bold text-sm gap-2 bg-slate-900 hover:bg-black transition-all text-white flex items-center justify-center shadow-sm">
                                Continue
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleEmailLogin} className="space-y-5">
                            <button 
                                type="button" 
                                onClick={() => { setLoginStep(0); setError(""); }}
                                className="inline-flex items-center gap-1.5 text-xs text-red-500 font-bold hover:underline mb-2"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" /> Change Email
                            </button>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-bold text-navy uppercase tracking-wider mb-1 block">Password</label>
                                    <a href="#" className="text-xs font-bold text-red-500 hover:underline">Forgot password?</a>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showPwd ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        autoFocus
                                        className="w-full h-12 pl-12 pr-12 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500 font-semibold transition-all text-sm text-black"
                                    />
                                    <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" disabled={loading} className="w-full h-12 rounded-xl font-bold text-sm gap-2 bg-slate-900 hover:bg-black transition-all text-white flex items-center justify-center shadow-sm">
                                {loading ? "Signing in..." : "Sign In"}
                                {!loading && <ArrowRight className="w-4 h-4" />}
                            </button>
                        </form>
                    )}

                    <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-3">
                        <div className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
                            Don't have an account yet?
                        </div>
                        <div className="flex gap-3">
                            <a 
                                href="/signup" 
                                className="flex-1 text-center py-2.5 bg-red-50 hover:bg-red-100 border border-red-100 text-red-700 rounded-xl font-bold text-xs transition-colors"
                            >
                                Register as User
                            </a>
                            <a 
                                href="/agents?page=register" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 text-center py-2.5 bg-purple-50 hover:bg-purple-100 border border-purple-100 text-[#7c3aed] rounded-xl font-bold text-xs transition-colors"
                            >
                                Register as Agent
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
