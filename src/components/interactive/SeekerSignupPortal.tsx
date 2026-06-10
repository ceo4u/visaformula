import { useState } from "react";
import { Globe, GraduationCap, Briefcase, Plane, Home, CheckCircle, ArrowRight, ArrowLeft, Sparkles, Shield, Star } from "lucide-react";

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

export function SeekerSignupPortal() {
    const [step, setStep] = useState(1);
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [selectedDests, setSelectedDests] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState(false);

    // Account inputs
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [passportCountry, setPassportCountry] = useState("");
    const [phone, setPhone] = useState("");

    // Email Verification States
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [verificationError, setVerificationError] = useState("");

    const toggleItem = (id: string, list: string[], setList: (l: string[]) => void) => {
        setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
    };

    if (submitted) {
        return (
            <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center px-4 py-12">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-10 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <CheckCircle className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h1 className="font-sora text-2xl font-extrabold text-navy mb-2">You're In! 🎉</h1>
                    <p className="text-gray-500 text-sm mb-6">Your Visara account is ready. Start exploring experts and opportunities.</p>
                    <a href="/dashboard" className="block">
                        <button className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                            Explore the Platform <ArrowRight className="w-4 h-4" />
                        </button>
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col justify-center items-center py-10 px-4">
            <div className="max-w-4xl w-full mx-auto">
                <div className="text-center mb-8">
                    <a href="/" className="inline-flex items-center gap-2 mb-3">
                        <Globe className="w-6 h-6 text-red-500" />
                        <span className="text-2xl font-extrabold tracking-tight text-navy">Visara</span>
                    </a>
                    <h1 className="font-sora text-3xl font-extrabold text-black mb-1.5">Register as Seeker</h1>
                    <p className="text-sm text-gray-500">Setup immigration goals and match with verified advisors.</p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 md:p-8">

                    {/* Step Indicator */}
                    <div className="flex items-center justify-center gap-2 mb-8">
                        {steps.map((s, i) => (
                            <div key={s.label} className="flex items-center gap-2">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                                    step > i + 1 ? "bg-emerald-500 text-white" :
                                    step === i + 1 ? "bg-slate-900 text-white shadow-md" :
                                    "bg-gray-100 text-gray-400"
                                }`}>
                                    {step > i + 1 ? <CheckCircle className="w-4 h-4" /> : s.icon}
                                </div>
                                <span className={`text-xs font-bold hidden sm:block ${step >= i + 1 ? "text-navy" : "text-gray-400"}`}>{s.label}</span>
                                {i < steps.length - 1 && (
                                    <div className={`w-8 h-[3px] rounded-full mx-1 ${step > i + 1 ? "bg-emerald-500" : "bg-gray-200"}`} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Step 1: Account Details */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <div>
                                <h2 className="font-sora text-xl font-bold text-navy mb-1">Let's get started</h2>
                                <p className="text-xs text-gray-500 mb-6">Create your free Visara account in seconds.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">First Name</label>
                                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-red-500 transition-colors font-semibold text-black" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Last Name</label>
                                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-red-500 transition-colors font-semibold text-black" />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Email Address *</label>
                                    <div className="flex gap-2">
                                        <div className="flex-1 relative">
                                            <input 
                                                type="email" 
                                                placeholder="john@example.com" 
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                disabled={emailVerified}
                                                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-red-500 disabled:bg-gray-100 disabled:text-gray-500 transition-colors font-semibold text-black" 
                                            />
                                            {emailVerified && (
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                                                    <CheckCircle className="w-3 h-3 animate-pulse" /> Verified
                                                </span>
                                            )}
                                        </div>
                                        {!emailVerified && (
                                            <button 
                                                type="button"
                                                onClick={() => {
                                                    if (!email || !/\S+@\S+\.\S+/.test(email)) {
                                                        setVerificationError("Please enter a valid email address.");
                                                        return;
                                                    }
                                                    setVerificationError("");
                                                    setOtpSent(true);
                                                    alert("Simulated Email: OTP verification code is '999' sent to " + email);
                                                }}
                                                className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-bold px-4 rounded-xl text-xs whitespace-nowrap transition-colors"
                                            >
                                                {otpSent ? "Resend OTP" : "Send OTP"}
                                            </button>
                                        )}
                                    </div>
                                    {otpSent && !emailVerified && (
                                        <div className="mt-3 bg-red-50/20 border border-red-100 rounded-2xl p-4 space-y-2">
                                            <div className="text-xs font-bold text-navy">Enter Email OTP (Simulated: '999')</div>
                                            <div className="flex gap-2">
                                                <input 
                                                    type="text" 
                                                    maxLength={3}
                                                    placeholder="•••" 
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                    className="w-24 p-2.5 bg-white border border-red-150 rounded-xl text-center font-mono text-sm outline-none focus:border-red-500 tracking-widest font-semibold text-black" 
                                                />
                                                <button 
                                                    type="button"
                                                    onClick={() => {
                                                        if (otp === "999") {
                                                            setEmailVerified(true);
                                                            setVerificationError("");
                                                        } else {
                                                            setVerificationError("Incorrect OTP. Try '999'.");
                                                        }
                                                    }}
                                                    className="bg-slate-900 hover:bg-black text-white font-bold px-4 rounded-xl text-xs transition-colors"
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
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Password</label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-red-500 transition-colors font-semibold text-black" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Passport Country</label>
                                    <div className="relative">
                                        <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <select value={passportCountry} onChange={(e) => setPassportCountry(e.target.value)} className="w-full p-3.5 pl-10 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-red-500 transition-colors appearance-none font-semibold text-black">
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
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        placeholder="+91 99999 99999" 
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-red-500 transition-colors font-semibold text-black" 
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Goals */}
                    {step === 2 && (
                        <div>
                            <h2 className="font-sora text-xl font-bold text-navy mb-1">What's your goal?</h2>
                            <p className="text-xs text-gray-500 mb-6">Select all that apply — we'll personalize your experience.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {goals.map((goal) => (
                                    <button
                                        key={goal.id}
                                        onClick={() => toggleItem(goal.id, selectedGoals, setSelectedGoals)}
                                        className={`p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3 ${
                                            selectedGoals.includes(goal.id)
                                                ? "border-red-500 bg-red-50/20 shadow-sm"
                                                : "border-slate-205 bg-white hover:border-slate-300"
                                        }`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                            selectedGoals.includes(goal.id) ? "bg-red-500" : "bg-red-50"
                                        }`}>
                                            <goal.icon className={`w-5 h-5 ${selectedGoals.includes(goal.id) ? "text-white" : "text-red-500"}`} />
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
                            <h2 className="font-sora text-xl font-bold text-navy mb-1">Where do you want to go?</h2>
                            <p className="text-xs text-gray-500 mb-6">Choose your top destination countries.</p>
                            <div className="flex flex-wrap gap-2.5 mb-6">
                                {destinations.map((country) => (
                                    <button
                                        key={country}
                                        onClick={() => toggleItem(country, selectedDests, setSelectedDests)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-300 ${
                                            selectedDests.includes(country)
                                                ? "bg-red-500 text-white border-red-500 shadow-sm"
                                                : "bg-white text-gray-600 border-slate-200 hover:border-slate-355"
                                        }`}
                                    >
                                        {country}
                                    </button>
                                ))}
                            </div>
                            {selectedDests.length > 0 && (
                                <div className="bg-red-50/50 rounded-2xl p-4 border border-red-100 text-xs font-medium text-red-700">
                                    <strong>Great choice!</strong> We'll match you with experts specializing in{" "}
                                    {selectedDests.slice(0, 3).join(", ")}{selectedDests.length > 3 ? ` and ${selectedDests.length - 3} more` : ""}.
                                </div>
                            )}
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
                        {step > 1 ? (
                            <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-navy transition-colors">
                                <ArrowLeft className="w-4 h-4" /> Back
                            </button>
                        ) : (
                            <div />
                        )}
                        {step < 3 ? (
                            <button
                                onClick={() => {
                                    if (step === 1 && !emailVerified) {
                                        setVerificationError("You must verify your email address to continue.");
                                        return;
                                    }
                                    setVerificationError("");
                                    setStep(step + 1);
                                }}
                                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-black transition-all active:scale-[0.97] flex items-center gap-2"
                            >
                                Continue <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={() => setSubmitted(true)}
                                className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 transition-all active:scale-[0.97] flex items-center gap-2"
                            >
                                <CheckCircle className="w-4 h-4" /> Complete Registration
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
