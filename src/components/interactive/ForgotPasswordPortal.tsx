import { useState } from "react";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export function ForgotPasswordPortal() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        if (!email) {
            setError("Please enter your email.");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (res.ok) {
                setSuccess(true);
            } else {
                setError(data.message || "Failed to send reset link.");
            }
        } catch (err: any) {
            console.error("Password Reset Error:", err);
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

            {/* Floating Back Button - Top Left (Identical to Login Page) */}
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
                                <img src="/logo.png" alt="VisaFormula" className="h-28 w-auto object-contain mx-auto" />
                            </a>
                        </div>

                        {success ? (
                            <div className="space-y-6">
                                <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                    <CheckCircle className="w-10 h-10 text-emerald-600 animate-pulse" />
                                </div>
                                <h2 className="text-2xl font-bold text-black">Check Your Inbox! ✉️</h2>
                                <p className="text-slate-500 text-sm font-semibold leading-relaxed">
                                    We have sent a recovery email to <strong className="text-black">{email}</strong>. Click the link inside the email to safely reset your password.
                                </p>
                                <div className="pt-4">
                                    <a href="/login">
                                        <button className="w-full bg-black hover:bg-neutral-900 text-white py-4 rounded-xl font-bold transition-all shadow-md text-sm cursor-pointer">
                                            Return to Sign In
                                        </button>
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6 text-left">
                                <div className="text-center mb-6">
                                    <h1 className="text-2xl font-extrabold text-black tracking-tight mb-2">
                                        Reset Password
                                    </h1>
                                    <p className="text-slate-500 text-sm font-semibold leading-normal">
                                        Enter your registered email and we'll send you a safe link to set a new password.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-800 tracking-wide uppercase">Email Address</label>
                                    <div className="relative">
                                        <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                        <input
                                            type="email"
                                            required
                                            placeholder="user@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full h-12 pl-12 pr-5 rounded-xl border border-slate-250 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-100 focus:border-black font-semibold transition-all text-sm text-black shadow-sm"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-xs font-semibold text-center leading-relaxed">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 bg-black hover:bg-neutral-900 disabled:bg-slate-300 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    {loading ? "Sending link..." : "Send Recovery Link"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-xs text-slate-400 font-semibold border-t border-slate-100">
                © 2026 VisaFormula. All rights reserved.
            </footer>
        </div>
    );
}
