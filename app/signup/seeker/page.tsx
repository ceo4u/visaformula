"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe, GraduationCap, Briefcase, Plane, Home, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

const goals = [
    { id: "study", icon: GraduationCap, label: "Study Abroad", desc: "Find universities & student visas" },
    { id: "work", icon: Briefcase, label: "Work Overseas", desc: "Work permits, H-1B, PR pathways" },
    { id: "visit", icon: Plane, label: "Visit / Tourist", desc: "Short-stay & tourist visas" },
    { id: "settle", icon: Home, label: "Settle Permanently", desc: "Express Entry, PR, citizenship" },
];

const destinations = ["Canada", "USA", "UK", "Australia", "New Zealand", "Germany", "Ireland", "Singapore", "UAE", "France"];

const steps = [
    { label: "Account", icon: "1" },
    { label: "Your Goals", icon: "2" },
    { label: "Destinations", icon: "3" },
];
export default function SeekerSignupPage() {
    const [step, setStep] = useState(1);
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [selectedDests, setSelectedDests] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState(false);

    // Phone Verification States
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [phoneVerified, setPhoneVerified] = useState(false);
    const [verificationError, setVerificationError] = useState("");

    const toggleItem = (id: string, list: string[], setList: (l: string[]) => void) => {
        setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
    };

    if (submitted) {
        return (
            <div className="bg-[#f0f4f8] min-h-screen flex flex-col items-center justify-center px-4">
                <div className="bg-white rounded-3xl border border-sky-100 shadow-card p-10 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h1 className="font-sora text-2xl font-extrabold text-navy mb-2">You&apos;re In! 🎉</h1>
                    <p className="text-gray-500 text-sm mb-6">Your Visara account is ready. Start exploring experts and opportunities.</p>
                    <Link href="/">
                        <button className="w-full bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white py-3.5 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                            Explore the Platform <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#f0f4f8] min-h-screen flex flex-col">
            {/* Top Bar */}
            <div className="bg-white border-b border-sky-100 py-4 px-6 flex justify-between items-center shadow-sm">
                <Link href="/" className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#0ea5e9]" />
                    <span className="text-xl font-extrabold tracking-tight text-navy">Visara</span>
                </Link>
                <Link href="/login" className="text-sm font-bold text-gray-500 hover:text-[#0ea5e9] transition-colors">
                    Log in instead
                </Link>
            </div>

            <main className="flex-1 flex items-center justify-center py-10 px-4">
                <div className="bg-white max-w-xl w-full rounded-3xl border border-sky-100 shadow-card p-8">

                    {/* Step Indicator */}
                    <div className="flex items-center justify-center gap-2 mb-8">
                        {steps.map((s, i) => (
                            <div key={s.label} className="flex items-center gap-2">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step > i + 1 ? "bg-emerald-500 text-white" :
                                        step === i + 1 ? "bg-[#0ea5e9] text-white shadow-lg shadow-sky-200" :
                                            "bg-gray-100 text-gray-400"
                                    }`}>
                                    {step > i + 1 ? <CheckCircle className="w-4 h-4" /> : s.icon}
                                </div>
                                <span className={`text-xs font-bold hidden sm:block ${step >= i + 1 ? "text-navy" : "text-gray-400"}`}>{s.label}</span>
                                {i < steps.length - 1 && (
                                    <div className={`w-8 h-[3px] rounded-full mx-1 ${step > i + 1 ? "bg-emerald-400" : "bg-gray-200"}`} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Step 1: Account Details */}
                    {step === 1 && (
                        <div>
                            <h2 className="font-sora text-2xl font-bold text-navy mb-1">Let&apos;s get started</h2>
                            <p className="text-sm text-gray-500 mb-6">Create your free Visara account in seconds.</p>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">First Name</label>
                                        <input type="text" placeholder="John" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9] transition-colors" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Last Name</label>
                                        <input type="text" placeholder="Doe" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9] transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Email Address</label>
                                    <input type="email" placeholder="john@example.com" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9] transition-colors" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Password</label>
                                    <input type="password" placeholder="Min. 8 characters" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9] transition-colors" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Passport Country</label>
                                    <div className="relative">
                                        <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <select className="w-full p-3 pl-9 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9] transition-colors appearance-none">
                                            <option value="">Select a country</option>
                                            <option>India</option>
                                            <option>Nigeria</option>
                                            <option>Philippines</option>
                                            <option>Brazil</option>
                                            <option>Pakistan</option>
                                            <option>Bangladesh</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Phone Number *</label>
                                    <div className="flex gap-2">
                                        <div className="flex-1 relative">
                                            <input 
                                                type="tel" 
                                                placeholder="+91 99999 99999" 
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                disabled={phoneVerified}
                                                className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9] disabled:bg-gray-100 disabled:text-gray-500 transition-colors" 
                                            />
                                            {phoneVerified && (
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                                                    <CheckCircle className="w-3 h-3 animate-pulse" /> Verified
                                                </span>
                                            )}
                                        </div>
                                        {!phoneVerified && (
                                            <button 
                                                type="button"
                                                onClick={() => {
                                                    if (!phone) {
                                                        setVerificationError("Please enter a valid phone number.");
                                                        return;
                                                    }
                                                    setVerificationError("");
                                                    setOtpSent(true);
                                                    alert("Simulated SMS: OTP code is '1234' sent to " + phone);
                                                }}
                                                className="bg-sky-50 hover:bg-sky-100 border border-sky-200 text-[#0ea5e9] font-bold px-4 rounded-xl text-xs whitespace-nowrap transition-colors"
                                            >
                                                {otpSent ? "Resend OTP" : "Send OTP"}
                                            </button>
                                        )}
                                    </div>
                                    {otpSent && !phoneVerified && (
                                        <div className="mt-3 bg-sky-50/40 border border-sky-100 rounded-2xl p-4 space-y-2">
                                            <div className="text-xs font-bold text-navy">Enter OTP (Simulated: '1234')</div>
                                            <div className="flex gap-2">
                                                <input 
                                                    type="text" 
                                                    maxLength={4}
                                                    placeholder="••••" 
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                    className="w-24 p-2.5 bg-white border border-sky-100 rounded-xl text-center font-mono text-sm outline-none focus:border-[#0ea5e9] tracking-widest" 
                                                />
                                                <button 
                                                    type="button"
                                                    onClick={() => {
                                                        if (otp === "1234") {
                                                            setPhoneVerified(true);
                                                            setVerificationError("");
                                                        } else {
                                                            setVerificationError("Incorrect OTP. Try '1234'.");
                                                        }
                                                    }}
                                                    className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold px-4 rounded-xl text-xs transition-colors"
                                                >
                                                    Verify OTP
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {verificationError && (
                                        <div className="text-xs text-red-500 font-semibold mt-1">{verificationError}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Goals */}
                    {step === 2 && (
                        <div>
                            <h2 className="font-sora text-2xl font-bold text-navy mb-1">What&apos;s your goal?</h2>
                            <p className="text-sm text-gray-500 mb-6">Select all that apply — we&apos;ll personalize your experience.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {goals.map((goal) => (
                                    <button
                                        key={goal.id}
                                        onClick={() => toggleItem(goal.id, selectedGoals, setSelectedGoals)}
                                        className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3 ${selectedGoals.includes(goal.id)
                                                ? "border-[#0ea5e9] bg-sky-50 shadow-sm"
                                                : "border-sky-100 bg-white hover:border-sky-200"
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${selectedGoals.includes(goal.id) ? "bg-[#0ea5e9]" : "bg-sky-50"
                                            }`}>
                                            <goal.icon className={`w-5 h-5 ${selectedGoals.includes(goal.id) ? "text-white" : "text-[#0ea5e9]"}`} />
                                        </div>
                                        <div>
                                            <div className={`font-bold text-sm ${selectedGoals.includes(goal.id) ? "text-navy" : "text-gray-700"}`}>{goal.label}</div>
                                            <div className="text-xs text-gray-400 mt-0.5">{goal.desc}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Destinations */}
                    {step === 3 && (
                        <div>
                            <h2 className="font-sora text-2xl font-bold text-navy mb-1">Where do you want to go?</h2>
                            <p className="text-sm text-gray-500 mb-6">Choose your top destination countries.</p>
                            <div className="flex flex-wrap gap-2.5 mb-6">
                                {destinations.map((country) => (
                                    <button
                                        key={country}
                                        onClick={() => toggleItem(country, selectedDests, setSelectedDests)}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${selectedDests.includes(country)
                                                ? "bg-[#0ea5e9] text-white border-[#0ea5e9] shadow-sm"
                                                : "bg-white text-gray-600 border-sky-100 hover:border-sky-200"
                                            }`}
                                    >
                                        {country}
                                    </button>
                                ))}
                            </div>
                            {selectedDests.length > 0 && (
                                <div className="bg-sky-50 rounded-2xl p-4 border border-sky-100 text-sm text-sky-800">
                                    <strong>Great choice!</strong> We&apos;ll match you with experts specializing in{" "}
                                    {selectedDests.slice(0, 3).join(", ")}{selectedDests.length > 3 ? ` and ${selectedDests.length - 3} more` : ""}.
                                </div>
                            )}
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                        {step > 1 ? (
                            <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-navy transition-colors">
                                <ArrowLeft className="w-4 h-4" /> Back
                            </button>
                        ) : (
                            <div />
                        )}
                        {step < 3 ? (
                            <button
                                onClick={() => {
                                    if (step === 1 && !phoneVerified) {
                                        setVerificationError("You must verify your phone number to continue.");
                                        return;
                                    }
                                    setVerificationError("");
                                    setStep(step + 1);
                                }}
                                className="bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all active:scale-[0.97] flex items-center gap-2"
                            >
                                Continue <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={() => setSubmitted(true)}
                                className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all active:scale-[0.97] flex items-center gap-2"
                            >
                                <CheckCircle className="w-4 h-4" /> Complete Registration
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
