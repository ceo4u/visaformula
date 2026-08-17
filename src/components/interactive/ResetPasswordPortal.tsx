import { useState, useEffect } from "react";
import { Eye, EyeOff, CheckCircle, Lock } from "lucide-react";

export function ResetPasswordPortal() {
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // Retrieve token from URL search query on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const t = params.get("token");
            if (t) {
                setToken(t);
            } else {
                setError("Invalid or missing password reset token in URL.");
            }
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!token) {
            setError("Password reset token is missing.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password })
            });
            const data = await res.json();
            if (res.ok) {
                setSuccess(true);
            } else {
                setError(data.message || "Failed to reset password.");
            }
        } catch (err) {
            setError("Server connection error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen text-[#111111] flex flex-col justify-between selection:bg-black selection:text-white bg-gray-50/50 font-sans" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <style dangerouslySetInnerHTML={{__html: `
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
                * {
                    font-family: 'Plus Jakarta Sans', sans-serif !important;
                }
            `}} />

            {/* Floating Back Button - Top Left */}
            <a href="/login" className="absolute top-6 left-6 flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 bg-white text-xs font-bold text-black hover:bg-slate-50 shadow-sm transition-all z-50 shrink-0">
                <span className="text-sm font-semibold">&larr;</span>
                <span>Back to Login</span>
            </a>

            {/* Main Portal Card (Structured like Login Box) */}
            <main className="flex-grow flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-md">
                    
                    {/* Outer Box with Border-2 Black */}
                    <div className="w-full bg-white border-2 border-black rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-150/40 text-center">
                        
                        {/* Centered Logo */}
                        <div className="text-center mb-4">
                            <a href="/" className="inline-flex items-center justify-center gap-2 group mb-0">
                                <img src="/logo.png?v=3" alt="TravlTik Logo" className="h-28 w-auto object-contain mx-auto" />
                            </a>
                        </div>

                        {success ? (
                            <div className="space-y-6">
                                <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                    <CheckCircle className="w-10 h-10 text-emerald-600 animate-pulse" />
                                </div>
                                <h2 className="text-2xl font-bold text-black">Password Reset Complete! 🎉</h2>
                                <p className="text-slate-500 text-sm font-semibold leading-relaxed">
                                    Your password has been successfully reset. You can now log in using your new credentials.
                                </p>
                                <div className="pt-4">
                                    <a href="/login">
                                        <button className="w-full bg-black hover:bg-neutral-900 text-white py-4 rounded-xl font-bold transition-all shadow-md text-sm cursor-pointer">
                                            Log In Now
                                        </button>
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6 text-left">
                                <div className="text-center mb-6">
                                    <h1 className="text-2xl font-extrabold text-black tracking-tight mb-2">
                                        Create New Password
                                    </h1>
                                    <p className="text-slate-500 text-sm font-semibold leading-normal">
                                        Please set a secure new password for your account access.
                                    </p>
                                </div>

                                {/* Connected Passwords Indicator Area */}
                                <div className={`space-y-4 border-l-4 pl-4 transition-all duration-300 ${
                                    !password && !confirmPassword ? 'border-slate-200' :
                                    password === confirmPassword ? 'border-emerald-500 bg-emerald-50/10 py-2 rounded-r-md' : 'border-rose-500 bg-rose-50/10 py-2 rounded-r-md'
                                }`}>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">New Credentials</span>
                                        {password && confirmPassword && (
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                                password === confirmPassword ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                            }`}>
                                                {password === confirmPassword ? '✓ Passwords Match' : '✗ Passwords Do Not Match'}
                                            </span>
                                        )}
                                    </div>

                                    {/* Password field */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-800 tracking-wide uppercase">New Password</label>
                                        <div className="relative">
                                            <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                required
                                                placeholder="Enter new password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full h-12 pl-12 pr-10 rounded-xl border border-slate-250 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-100 focus:border-black font-semibold transition-all text-sm text-black shadow-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Confirm Password field */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-800 tracking-wide uppercase">Confirm New Password</label>
                                        <div className="relative">
                                            <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                required
                                                placeholder="Confirm new password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="w-full h-12 pl-12 pr-10 rounded-xl border border-slate-250 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-100 focus:border-black font-semibold transition-all text-sm text-black shadow-sm"
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
                                </div>

                                {error && (
                                    <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-xs font-semibold text-center leading-relaxed">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading || !!error}
                                    className="w-full h-12 bg-black hover:bg-slate-900 disabled:bg-slate-300 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    {loading ? "Resetting password..." : "Confirm Password Reset"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-xs text-slate-400 font-semibold border-t border-slate-100">
                © 2026 TravlTik. All rights reserved.
            </footer>
        </div>
    );
}
