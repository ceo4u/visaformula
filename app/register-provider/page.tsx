"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe, ArrowRight, ArrowLeft, CheckCircle, Upload, GraduationCap, Briefcase, Plane, Home, BookOpen, DollarSign, Scale, MapPin, Clock, Users } from "lucide-react";

const expertCategories = [
    { id: "student", icon: GraduationCap, label: "Student Visa Expert", desc: "Help students get admission & student visas" },
    { id: "work", icon: Briefcase, label: "Work Permit Expert", desc: "H-1B, LMIA, work permits, job visa" },
    { id: "tourist", icon: Plane, label: "Tourist + Holiday Expert", desc: "Tourist visas, travel planning, tour packages" },
    { id: "pr", icon: Home, label: "PR / Residency Expert", desc: "Express Entry, PR applications, citizenship" },
    { id: "ielts", icon: BookOpen, label: "IELTS Institute", desc: "IELTS coaching, batch training, test prep" },
    { id: "language", icon: Globe, label: "Language Training", desc: "French, German, Spanish language courses" },
    { id: "financial", icon: DollarSign, label: "Financial Advisor / Loan", desc: "Education loans, GIC, forex, financial planning" },
    { id: "local", icon: MapPin, label: "Local Immigration Expert", desc: "City-based immigration office guidance" },
    { id: "lawyer", icon: Scale, label: "Immigration Lawyer", desc: "Legal representation, appeals, court cases" },
];

const cities = ["Hyderabad", "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Other"];
const countries = ["Canada", "UK", "Australia", "USA", "Germany", "UAE", "New Zealand", "France", "Singapore"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const steps = [
    { label: "Category", icon: "1" },
    { label: "Details", icon: "2" },
    { label: "Credentials", icon: "3" },
    { label: "Pricing", icon: "4" },
];

export default function RegisterProviderPage() {
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [selectedDays, setSelectedDays] = useState<string[]>(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]);
    const [isEmergency, setIsEmergency] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Phone Verification States
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [phoneVerified, setPhoneVerified] = useState(false);
    const [verificationError, setVerificationError] = useState("");

    const toggleCountry = (c: string) => setSelectedCountries(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
    const toggleDay = (d: string) => setSelectedDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);

    if (submitted) {
        return (
            <div className="bg-[#f0f4f8] min-h-screen flex flex-col items-center justify-center px-4">
                <div className="bg-white rounded-3xl border border-sky-100 shadow-card p-10 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-[#0ea5e9]" />
                    </div>
                    <h1 className="font-sora text-2xl font-extrabold text-navy mb-2">Application Submitted! 🎉</h1>
                    <p className="text-gray-500 text-sm mb-2">Your expert profile is under review.</p>
                    <p className="text-gray-400 text-xs mb-6">We&apos;ll notify you via email within 24-48 hours once verification is complete.</p>
                    <Link href="/consultant/dashboard">
                        <button className="w-full bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white py-3.5 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                            Go to Dashboard <ArrowRight className="w-4 h-4" />
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
                <Link href="/login" className="text-sm font-bold text-gray-500 hover:text-[#0ea5e9] transition-colors">Already registered? Log in</Link>
            </div>

            <main className="flex-1 flex items-center justify-center py-10 px-4">
                <div className="bg-white max-w-2xl w-full rounded-3xl border border-sky-100 shadow-card p-8">
                    {/* Step Indicator */}
                    <div className="flex items-center justify-center gap-1 mb-8">
                        {steps.map((s, i) => (
                            <div key={s.label} className="flex items-center gap-1">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step > i + 1 ? "bg-emerald-500 text-white" :
                                        step === i + 1 ? "bg-[#0ea5e9] text-white shadow-lg shadow-sky-200" :
                                            "bg-gray-100 text-gray-400"
                                    }`}>
                                    {step > i + 1 ? <CheckCircle className="w-4 h-4" /> : s.icon}
                                </div>
                                <span className={`text-xs font-bold hidden sm:block mr-2 ${step >= i + 1 ? "text-navy" : "text-gray-400"}`}>{s.label}</span>
                                {i < steps.length - 1 && <div className={`w-6 h-[3px] rounded-full ${step > i + 1 ? "bg-emerald-400" : "bg-gray-200"}`} />}
                            </div>
                        ))}
                    </div>

                    {/* Step 1: Category */}
                    {step === 1 && (
                        <div>
                            <h2 className="font-sora text-2xl font-bold text-navy mb-1">What do you offer?</h2>
                            <p className="text-sm text-gray-500 mb-6">Select the category that best describes your services.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {expertCategories.map(cat => (
                                    <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                                        className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3 ${selectedCategory === cat.id ? "border-[#0ea5e9] bg-sky-50 shadow-sm" : "border-sky-100 bg-white hover:border-sky-200"
                                            }`}>
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${selectedCategory === cat.id ? "bg-[#0ea5e9]" : "bg-sky-50"}`}>
                                            <cat.icon className={`w-5 h-5 ${selectedCategory === cat.id ? "text-white" : "text-[#0ea5e9]"}`} />
                                        </div>
                                        <div>
                                            <div className={`font-bold text-sm ${selectedCategory === cat.id ? "text-navy" : "text-gray-700"}`}>{cat.label}</div>
                                            <div className="text-xs text-gray-400 mt-0.5">{cat.desc}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Details */}
                    {step === 2 && (
                        <div>
                            <h2 className="font-sora text-2xl font-bold text-navy mb-1">Your Details</h2>
                            <p className="text-sm text-gray-500 mb-6">Tell seekers about yourself and your expertise.</p>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Full Name *</label>
                                        <input type="text" placeholder="Dr. Priya Sharma" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Business Name (optional)</label>
                                        <input type="text" placeholder="Sharma Immigration Services" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">City *</label>
                                    <select className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9] appearance-none">
                                        <option value="">Select your city</option>
                                        {cities.map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Years of Experience *</label>
                                    <input type="number" placeholder="e.g. 5" min={0} className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" />
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
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Countries You Serve *</label>
                                    <div className="flex flex-wrap gap-2">
                                        {countries.map(c => (
                                            <button key={c} onClick={() => toggleCountry(c)}
                                                className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all ${selectedCountries.includes(c) ? "bg-[#0ea5e9] text-white border-[#0ea5e9]" : "bg-white text-gray-600 border-sky-100 hover:border-sky-200"
                                                    }`}>
                                                {c}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Bio *</label>
                                    <textarea rows={4} placeholder="Describe your expertise, approach, and why seekers should trust you (200-500 characters)..." className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9] resize-none" />
                                    <p className="text-xs text-gray-400 mt-1">200-500 characters recommended</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Credentials */}
                    {step === 3 && (
                        <div>
                            <h2 className="font-sora text-2xl font-bold text-navy mb-1">Upload Credentials</h2>
                            <p className="text-sm text-gray-500 mb-6">Help us verify your expertise. All documents are encrypted and stored securely.</p>
                            <div className="space-y-5">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">License / Registration Number</label>
                                    <input type="text" placeholder="e.g. ICCRC R123456" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Government ID Proof</label>
                                    <div className="border-2 border-dashed border-sky-200 rounded-2xl p-8 text-center bg-sky-50/30 hover:bg-sky-50 transition-colors cursor-pointer">
                                        <Upload className="w-8 h-8 text-[#0ea5e9] mx-auto mb-3" />
                                        <p className="text-sm font-semibold text-navy mb-1">Drop your ID here or click to browse</p>
                                        <p className="text-xs text-gray-400">Aadhar, Passport, PAN — PDF, JPG, PNG (max 5MB)</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Professional Certificate</label>
                                    <div className="border-2 border-dashed border-sky-200 rounded-2xl p-8 text-center bg-sky-50/30 hover:bg-sky-50 transition-colors cursor-pointer">
                                        <Upload className="w-8 h-8 text-[#0ea5e9] mx-auto mb-3" />
                                        <p className="text-sm font-semibold text-navy mb-1">Upload your professional certificate</p>
                                        <p className="text-xs text-gray-400">ICCRC, Bar License, IELTS Certification, etc. (max 5MB)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Pricing & Availability */}
                    {step === 4 && (
                        <div>
                            <h2 className="font-sora text-2xl font-bold text-navy mb-1">Pricing & Availability</h2>
                            <p className="text-sm text-gray-500 mb-6">Set your session pricing and weekly availability.</p>
                            <div className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Session Price (₹ per hour) *</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">₹</span>
                                            <input type="number" placeholder="2000" className="w-full p-3 pl-8 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Emergency Price (₹)</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">₹</span>
                                            <input type="number" placeholder="4000" className="w-full p-3 pl-8 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Available Days</label>
                                    <div className="flex flex-wrap gap-2">
                                        {days.map(d => (
                                            <button key={d} onClick={() => toggleDay(d)}
                                                className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all ${selectedDays.includes(d) ? "bg-emerald-500 text-white border-emerald-500" : "bg-white text-gray-600 border-sky-100 hover:border-sky-200"
                                                    }`}>
                                                {d.slice(0, 3)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Start Time</label>
                                        <input type="time" defaultValue="09:00" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">End Time</label>
                                        <input type="time" defaultValue="18:00" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-red-50 rounded-2xl border border-red-100">
                                    <div>
                                        <div className="font-bold text-navy text-sm">Emergency 24/7 Availability</div>
                                        <div className="text-xs text-gray-400">Accept urgent bookings at any time</div>
                                    </div>
                                    <button onClick={() => setIsEmergency(!isEmergency)}
                                        className={`w-12 h-7 rounded-full transition-all flex items-center ${isEmergency ? "bg-red-500 justify-end" : "bg-gray-300 justify-start"}`}>
                                        <span className="w-5 h-5 bg-white rounded-full shadow-md mx-1 transition-all" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                        {step > 1 ? (
                            <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-navy transition-colors">
                                <ArrowLeft className="w-4 h-4" /> Back
                            </button>
                        ) : <div />}
                        {step < 4 ? (
                            <button 
                                onClick={() => {
                                    if (step === 2 && !phoneVerified) {
                                        setVerificationError("You must verify your phone number to continue.");
                                        return;
                                    }
                                    setVerificationError("");
                                    setStep(step + 1);
                                }}
                                disabled={step === 1 && !selectedCategory}
                                className="bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all active:scale-[0.97] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Continue <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button onClick={() => setSubmitted(true)}
                                className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all active:scale-[0.97] flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" /> Submit Application
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
