"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Gavel, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/components/providers/auth-provider";

export default function LoginPage() {
    const router = useRouter();
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
        // Basic email regex
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
            router.push("/dashboard");
        } catch (err: any) {
            setError(err?.message?.includes("invalid")
                ? "Invalid email or password."
                : err?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-sky-50 via-white to-sky-100/40">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2.5 text-2xl font-black mb-2 hover:scale-105 transition-transform">
                        <span className="w-10 h-10 bg-gradient-to-tr from-[#38BDF8] to-[#0ea5e9] rounded-2xl flex items-center justify-center shadow-lg shadow-sky-200">
                          <Gavel className="w-5 h-5 text-white" />
                        </span>
                        <span className="font-sora font-extrabold text-navy">Visara</span>
                    </Link>
                    <h1 className="text-3xl font-sora font-extrabold tracking-tight text-navy mt-4">
                      Welcome <span className="bg-gradient-to-r from-[#38BDF8] to-[#0284C7] bg-clip-text text-transparent">Back</span>
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm">Sign in to unlock personalized visa applications</p>
                </div>

                <Card className="border border-sky-100/80 shadow-2xl shadow-sky-100/50 rounded-3xl overflow-hidden bg-white">
                    <CardContent className="p-8 relative">
                        {/* Dot Step Indicator */}
                        <div className="flex justify-center gap-2 mb-6">
                            <span className={`h-2 rounded-full transition-all duration-300 ${loginStep === 0 ? "w-8 bg-[#0ea5e9]" : "w-2 bg-gray-200"}`} />
                            <span className={`h-2 rounded-full transition-all duration-300 ${loginStep === 1 ? "w-8 bg-[#0ea5e9]" : "w-2 bg-gray-200"}`} />
                        </div>

                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 rounded-2xl bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"
                            >
                                {error}
                            </motion.div>
                        )}

                        <AnimatePresence mode="wait">
                            {loginStep === 0 ? (
                                <motion.form
                                    key="email-step"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    onSubmit={handleNextStep}
                                    className="space-y-5"
                                >
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
                                                className="w-full h-12 pl-12 pr-4 rounded-xl border border-sky-100 bg-sky-50/20 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent font-medium transition-all text-sm"
                                            />
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full h-12 rounded-xl font-bold text-sm gap-2 shadow-lg shadow-sky-200 bg-gradient-to-r from-[#38BDF8] to-[#0ea5e9] hover:shadow-xl transition-all">
                                        Continue
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </motion.form>
                            ) : (
                                <motion.form
                                    key="password-step"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    onSubmit={handleEmailLogin}
                                    className="space-y-5"
                                >
                                    <button 
                                        type="button" 
                                        onClick={() => { setLoginStep(0); setError(""); }}
                                        className="inline-flex items-center gap-1.5 text-xs text-sky-600 font-bold hover:underline mb-2"
                                    >
                                        <ArrowLeft className="w-3.5 h-3.5" /> Change Email
                                    </button>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-bold text-navy uppercase tracking-wider mb-1 block">Password</label>
                                            <Link href="#" className="text-xs font-bold text-[#0ea5e9] hover:underline">Forgot password?</Link>
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
                                                className="w-full h-12 pl-12 pr-12 rounded-xl border border-sky-100 bg-sky-50/20 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent font-medium transition-all text-sm"
                                            />
                                            <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                                {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl font-bold text-sm gap-2 shadow-lg shadow-sky-200 bg-gradient-to-r from-[#38BDF8] to-[#0ea5e9] hover:shadow-xl transition-all">
                                        {loading ? "Signing in..." : "Sign In"}
                                        {!loading && <ArrowRight className="w-4 h-4" />}
                                    </Button>
                                </motion.form>
                            )}
                        </AnimatePresence>

                        <div className="mt-8 pt-6 border-t border-sky-50 flex flex-col gap-3">
                            <div className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
                                Don't have an account yet?
                            </div>
                            <div className="flex gap-3">
                                <Link 
                                    href="/signup/seeker" 
                                    className="flex-1 text-center py-2.5 bg-sky-50 hover:bg-sky-100/70 border border-sky-100 text-[#0ea5e9] rounded-xl font-bold text-xs transition-colors"
                                >
                                    Register as User
                                </Link>
                                <Link 
                                    href="/register-provider" 
                                    className="flex-1 text-center py-2.5 bg-purple-50 hover:bg-purple-100/70 border border-purple-100 text-[#7c3aed] rounded-xl font-bold text-xs transition-colors"
                                >
                                    Register as Expert
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
