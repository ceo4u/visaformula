"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Gavel, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/components/providers/auth-provider";

export default function LoginPage() {
    const router = useRouter();
    const { signIn, signInWithGoogle } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
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

    const handleGoogleLogin = async () => {
        setError("");
        setLoading(true);
        try {
            await signInWithGoogle();
            router.push("/dashboard");
        } catch (err: any) {
            setError(err?.message || "Google sign-in failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-primary/5 via-transparent to-transparent">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-2xl font-black mb-4">
                        <Gavel className="w-7 h-7 text-primary" />
                        <span>Visara</span>
                    </Link>
                    <h1 className="text-3xl font-heading font-extrabold tracking-tight mt-4">Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Back</span></h1>
                    <p className="text-on-surface-variant mt-2">Sign in to continue to your dashboard</p>
                </div>

                <Card className="border-none shadow-2xl">
                    <CardContent className="p-8">
                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-sky-50 dark:bg-red-900/20 border border-sky-200 dark:border-red-800 text-sky-700 dark:text-red-400 text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleEmailLogin} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-heading font-bold mb-1.5 block">Email address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="john@example.com"
                                        required
                                        className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-heading font-bold mb-1.5 block">Password</label>
                                    <Link href="#" className="text-xs font-bold text-primary hover:underline">Forgot password?</Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type={showPwd ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="w-full h-12 pl-12 pr-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                                    />
                                    <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                        {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl font-bold text-base gap-2 shadow-lg shadow-primary/20">
                                {loading ? "Signing in..." : "Sign In"}
                                {!loading && <ArrowRight className="w-4 h-4" />}
                            </Button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-3">
                            <div className="text-center text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                                Don't have an account?
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
