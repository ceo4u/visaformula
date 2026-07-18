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
            // Import client-side Firebase auth dynamically
            const { getAuth, sendPasswordResetEmail } = await import("firebase/auth");
            const { app } = await import("../../lib/firebase");
            const auth = getAuth(app);
            
            await sendPasswordResetEmail(auth, email);
            setSuccess(true);
        } catch (err: any) {
            console.error("Firebase Password Reset Error:", err);
            setError(err.message || "Failed to send reset link. Please check your email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen text-[#111111] flex flex-col justify-between selection:bg-black selection:text-white bg-white font-sans" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <style dangerouslySetInnerHTML={{__html: `
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
                body, html {
                    font-family: 'Plus Jakarta Sans', sans-serif !important;
                }
            `}} />

            {/* Header */}
            <header className="w-full px-4 md:px-8 py-4 flex items-center justify-between border-b border-slate-100 bg-white">
                <a href="/login" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 bg-white text-xs font-bold text-black hover:bg-slate-50 shadow-sm transition-all shrink-0">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Login</span>
                </a>
                <a href="/">
                    <img src="/logo.png" alt="VisaFormula" className="h-14 w-auto object-contain" />
                </a>
                <div className="w-[100px] hidden md:block"></div>
            </header>

            {/* Main Portal Card */}
            <main className="flex-grow flex items-center justify-center px-4 py-16">
                <div className="bg-white rounded-3xl border border-slate-150 shadow-2xl p-8 sm:p-10 max-w-md w-full text-center transition-all">
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
                                    <button className="w-full bg-[#111111] hover:bg-black text-white py-4 rounded-xl font-bold transition-all shadow-md text-sm cursor-pointer">
                                        Return to Sign In
                                    </button>
                                </a>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 text-left">
                            <div className="text-center mb-8">
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight mb-2">
                                    Reset Password
                                </h1>
                                <p className="text-slate-400 text-xs sm:text-sm font-semibold">
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
                                className="w-full h-12 bg-black hover:bg-slate-900 disabled:bg-slate-300 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                            >
                                {loading ? "Sending link..." : "Send Recovery Link"}
                            </button>
                        </form>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-xs text-slate-400 font-semibold border-t border-slate-100">
                © 2026 VisaFormula. All rights reserved.
            </footer>
        </div>
    );
}
