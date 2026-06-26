import { useState } from "react";
import { Globe, GraduationCap, Briefcase, Plane, Home, CheckCircle, ArrowRight, ArrowLeft, User, Upload } from "lucide-react";
import airplanePaths from "../../data/clean_airplane.json";
import checkmarkPaths from "../../data/clean_checkmark.json";

const goals = [
    { id: "study", icon: GraduationCap, label: "Study Abroad", desc: "Find universities & student visas" },
    { id: "work", icon: Briefcase, label: "Work Overseas", desc: "Work permits, H-1B, PR pathways" },
    { id: "visit", icon: Plane, label: "Visit / Tourist", desc: "Short-stay & tourist visas" },
    { id: "settle", icon: Home, label: "Settle Permanently", desc: "Express Entry, PR, citizenship" },
];

const destinations = ["Canada", "USA", "UK", "Australia", "New Zealand", "Germany", "Ireland", "Singapore", "UAE", "France"];

const steps = [
    { label: "Account Details", icon: "1" },
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
            <div className="min-h-screen text-[#111111] font-sans flex flex-col justify-between selection:bg-black selection:text-white" style={{ 
                fontFamily: "'Sora', sans-serif",
                background: "radial-gradient(circle at 90% 10%, rgba(253, 244, 215, 0.45) 0%, transparent 40%), radial-gradient(circle at 10% 90%, rgba(224, 231, 255, 0.4) 0%, transparent 40%), #fafbfc"
            }}>
                <header className="w-full max-w-7xl mx-auto px-8 py-6 flex items-center justify-between font-sans">
                    <a href="/" className="flex items-center gap-2">
                        <svg className="w-40 h-auto" viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg">
                            {/* Centered airplane swoop above the wordmark */}
                            <g transform="translate(45, -145) scale(0.68)">
                                {airplanePaths.map((p: any, idx: number) => (
                                    <path key={idx} d={p.d} fill={p.fill} transform={p.transform} />
                                ))}
                            </g>
                            
                            {/* Wordmark */}
                            <text x="350" y="235" textAnchor="middle" fontFamily="'Plus Jakarta Sans', 'Montserrat', sans-serif" fontWeight="900" fontSize="82" letterSpacing="0.02em">
                                <tspan fill="#111111" stroke="#111111" strokeWidth="3">VISA</tspan>
                                <tspan fill="#0F2B6C" stroke="#0F2B6C" strokeWidth="3">FORMULA</tspan>
                            </text>
                            
                            {/* Tagline */}
                            <text x="350" y="300" textAnchor="middle" fontFamily="'Plus Jakarta Sans', 'Montserrat', sans-serif" fontWeight="800" fontSize="24" letterSpacing="0.25em" fill="#0F2B6C">
                                GLOBAL VISA MARKETPLACE
                            </text>
                        </svg>
                    </a>
                </header>

                <div className="flex-grow flex flex-col items-center justify-center px-4 py-12">
                    <div className="bg-white rounded-3xl border border-slate-150 shadow-2xl p-10 max-w-md w-full text-center">
                        <div className="w-20 h-20 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <CheckCircle className="w-10 h-10 text-black" />
                        </div>
                        <h1 className="text-2xl font-bold text-black mb-2">You're In! 🎉</h1>
                        <p className="text-slate-400 text-sm mb-8 font-medium">Your VisaFormula account is ready. Start exploring experts and opportunities.</p>
                        <a href="/dashboard" className="block">
                            <button className="w-full bg-[#111111] hover:bg-black text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-md cursor-pointer text-sm">
                                Explore the Platform <ArrowRight className="w-4 h-4" />
                            </button>
                        </a>
                    </div>
                </div>

                <footer className="py-6 text-center text-xs text-slate-400 font-medium">
                    © 2026 VisaFormula. All rights reserved.
                </footer>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-[#111111] font-sora flex flex-col justify-between selection:bg-black selection:text-white" style={{ 
            fontFamily: "'Sora', sans-serif",
            background: "radial-gradient(circle at 90% 10%, rgba(253, 244, 215, 0.45) 0%, transparent 40%), radial-gradient(circle at 10% 90%, rgba(224, 231, 255, 0.4) 0%, transparent 40%), #fafbfc"
        }}>
            <style dangerouslySetInnerHTML={{__html: `
                .font-sora, .font-sora * {
                    font-family: 'Sora', sans-serif !important;
                }
            `}} />
            <header className="w-full max-w-7xl mx-auto px-8 py-6 flex items-center justify-between font-sans">
                <div className="flex items-center gap-4">
                    <a href="javascript:history.back()" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 hover:text-black hover:border-black hover:bg-slate-50 transition-all">
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                    </a>
                    <a href="/" className="flex items-center gap-2">
                    <svg className="w-40 h-auto" viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg">
                        {/* Centered airplane swoop above the wordmark */}
                        <g transform="translate(45, -145) scale(0.68)">
                            {airplanePaths.map((p: any, idx: number) => (
                                <path key={idx} d={p.d} fill={p.fill} transform={p.transform} />
                            ))}
                        </g>
                        
                        {/* Wordmark */}
                        <text x="350" y="235" textAnchor="middle" fontFamily="'Plus Jakarta Sans', 'Montserrat', sans-serif" fontWeight="900" fontSize="82" letterSpacing="0.02em">
                            <tspan fill="#111111" stroke="#111111" strokeWidth="3">VISA</tspan>
                            <tspan fill="#0F2B6C" stroke="#0F2B6C" strokeWidth="3">FORMULA</tspan>
                        </text>
                        
                        {/* Tagline */}
                        <text x="350" y="300" textAnchor="middle" fontFamily="'Plus Jakarta Sans', 'Montserrat', sans-serif" fontWeight="800" fontSize="24" letterSpacing="0.25em" fill="#0F2B6C">
                            GLOBAL VISA MARKETPLACE
                        </text>
                    </svg>
                </a>
                </div>
                <div className="text-base font-medium text-slate-500">
                    Already a member? <a href="/login" className="text-black font-bold hover:underline">Login</a>
                </div>
            </header>

            <div className="flex-grow flex flex-col justify-start py-10 px-6 max-w-4xl w-full mx-auto">
                <div className="text-center my-8">
                    <h1 className="text-3xl md:text-4xl font-semibold text-black tracking-tight mb-3">Register as Seeker</h1>
                    <p className="text-base text-slate-400 font-medium">Setup immigration goals and match with verified advisors.</p>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center justify-center gap-8 my-10 font-sans">
                    {steps.map((s, i) => (
                        <div key={s.label} className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                                step > i + 1 ? "bg-black text-white" :
                                step === i + 1 ? "bg-black text-white shadow-md" :
                                "border-2 border-slate-350 text-slate-500"
                            }`}>
                                {step > i + 1 ? "✓" : s.icon}
                            </div>
                            <span className={`text-base font-semibold ${step >= i + 1 ? "text-black" : "text-slate-450"}`}>{s.label}</span>
                            {i < steps.length - 1 && (
                                <div className={`h-0.5 w-16 md:w-24 ${step > i + 1 ? "bg-black" : "bg-slate-200"}`} />
                            )}
                        </div>
                    ))}
                </div>

                <div className="w-full mx-auto transition-all duration-300 font-sans mt-4">
                    {/* Step 1: Account Details */}
                    {step === 1 && (
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            if (!emailVerified) {
                                setVerificationError("You must verify your email address to continue.");
                                return;
                            }
                            setVerificationError("");
                            setStep(2);
                        }} className="space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 block">First Name*</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={firstName} 
                                        onChange={(e) => setFirstName(e.target.value)} 
                                        placeholder="Enter first name" 
                                        className="w-full px-5 py-4 bg-white border border-slate-250 rounded-xl text-base outline-none focus:border-black focus:ring-1 focus:ring-black text-black placeholder:text-slate-400 shadow-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 block">Last Name*</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={lastName} 
                                        onChange={(e) => setLastName(e.target.value)} 
                                        placeholder="Enter last name" 
                                        className="w-full px-5 py-4 bg-white border border-slate-250 rounded-xl text-base outline-none focus:border-black focus:ring-1 focus:ring-black text-black placeholder:text-slate-400 shadow-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 block">Verify Email*</label>
                                    <div className="flex gap-3.5">
                                        <div className="relative flex-grow">
                                            <input 
                                                type="email" 
                                                required
                                                placeholder="john@example.com" 
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                disabled={emailVerified}
                                                className="w-full px-5 py-4 bg-white border border-slate-250 rounded-xl text-base outline-none focus:border-black focus:ring-1 focus:ring-black text-black placeholder:text-slate-400 disabled:bg-slate-50 transition-all shadow-sm"
                                            />
                                            {emailVerified && (
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                                                    <span className="w-5 h-5 bg-black rounded-full flex items-center justify-center text-white text-[10px] font-bold">✓</span>
                                                </div>
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
                                                className="bg-black hover:bg-slate-900 text-white text-sm font-semibold px-6 py-4 rounded-xl active:scale-95 transition-all shadow-sm cursor-pointer"
                                            >
                                                {otpSent ? "Resend" : "Send OTP"}
                                            </button>
                                        )}
                                    </div>
                                    {otpSent && !emailVerified && (
                                        <div className="mt-3 bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 shadow-inner">
                                            <div className="text-xs font-bold text-slate-700">Enter Email OTP (Simulated: '999')</div>
                                            <div className="flex gap-3">
                                                <input 
                                                    type="text" 
                                                    maxLength={3}
                                                    placeholder="•••" 
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                    className="w-24 p-3 bg-white border border-slate-250 rounded-xl text-center font-mono text-sm outline-none focus:border-black tracking-widest font-semibold text-black shadow-sm" 
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
                                                    className="bg-black hover:bg-slate-900 text-white font-semibold px-6 py-3 rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
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

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 block">Password*</label>
                                    <input 
                                        type="password" 
                                        required
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        placeholder="Min. 8 characters" 
                                        className="w-full px-5 py-4 bg-white border border-slate-250 rounded-xl text-base outline-none focus:border-black focus:ring-1 focus:ring-black text-black placeholder:text-slate-400 shadow-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 block">Passport Country*</label>
                                    <div className="relative">
                                        <select 
                                            required
                                            value={passportCountry} 
                                            onChange={(e) => setPassportCountry(e.target.value)} 
                                            className="w-full px-5 py-4 bg-white border border-slate-250 rounded-xl text-base outline-none focus:border-black focus:ring-1 focus:ring-black text-black placeholder:text-slate-400 shadow-sm appearance-none cursor-pointer"
                                        >
                                            <option value="">Select a country</option>
                                            <option>India</option>
                                            <option>Nigeria</option>
                                            <option>Philippines</option>
                                            <option>Brazil</option>
                                            <option>Pakistan</option>
                                            <option>Bangladesh</option>
                                            <option>Other</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 block">Phone Number*</label>
                                    <input 
                                        type="tel" 
                                        required
                                        placeholder="+91 99999 99999" 
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-5 py-4 bg-white border border-slate-250 rounded-xl text-base outline-none focus:border-black focus:ring-1 focus:ring-black text-black placeholder:text-slate-400 shadow-sm" 
                                    />
                                </div>
                            </div>

                            <div className="pt-8 flex justify-center">
                                <button 
                                    type="submit"
                                    className="bg-[#111111] hover:bg-black text-white px-12 py-4 rounded-xl text-base font-semibold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
                                >
                                    Continue
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Step 2: Goals */}
                    {step === 2 && (
                        <div className="space-y-8">
                            <div className="bg-slate-50 rounded-xl p-5 border border-slate-150 text-sm shadow-sm">
                                <span className="text-slate-750 font-semibold text-slate-700">Choose all immigration goals that apply to you:</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {goals.map((goal) => {
                                    const isSelected = selectedGoals.includes(goal.id);
                                    return (
                                        <button
                                            key={goal.id}
                                            onClick={() => toggleItem(goal.id, selectedGoals, setSelectedGoals)}
                                            className={`p-6 rounded-2xl border transition-all duration-300 flex items-start gap-4 text-left shadow-sm ${
                                                isSelected
                                                    ? "border-black bg-white ring-2 ring-black scale-[1.02]"
                                                    : "border-slate-200 bg-white hover:border-slate-400"
                                            }`}
                                        >
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                                isSelected ? "bg-black text-white" : "bg-slate-50 text-slate-700 border border-slate-200"
                                            }`}>
                                                <goal.icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-base text-black">{goal.label}</div>
                                                <div className="text-xs text-slate-400 mt-1 font-medium">{goal.desc}</div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="pt-8 border-t border-slate-100 flex items-center justify-between gap-4">
                                <button 
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="text-sm font-semibold text-slate-550 hover:text-black flex items-center gap-1 transition-colors"
                                >
                                    ← Back
                                </button>

                                <button 
                                    type="button"
                                    onClick={() => setStep(3)}
                                    className="bg-[#111111] hover:bg-black text-white px-12 py-4 rounded-xl text-base font-semibold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Destinations */}
                    {step === 3 && (
                        <div className="space-y-8">
                            <div className="bg-slate-50 rounded-xl p-5 border border-slate-150 text-sm shadow-sm">
                                <span className="text-slate-750 font-semibold text-slate-700">Choose your top destination countries:</span>
                            </div>

                            <div className="flex flex-wrap gap-3.5 justify-center py-6">
                                {destinations.map((country) => {
                                    const isSelected = selectedDests.includes(country);
                                    return (
                                        <button
                                            key={country}
                                            onClick={() => toggleItem(country, selectedDests, setSelectedDests)}
                                            className={`px-5 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 shadow-sm ${
                                                isSelected
                                                    ? "bg-black text-white border-black scale-105"
                                                    : "bg-white text-slate-650 border-slate-250 hover:border-slate-400"
                                            }`}
                                        >
                                            {country}
                                        </button>
                                    );
                                })}
                            </div>

                            {selectedDests.length > 0 && (
                                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs font-semibold text-slate-700 shadow-inner text-center">
                                    <strong>Great choice!</strong> We'll match you with experts specializing in{" "}
                                    <span className="text-black uppercase font-bold">{selectedDests.slice(0, 3).join(", ")}</span>
                                    {selectedDests.length > 3 ? ` and ${selectedDests.length - 3} more` : ""}.
                                </div>
                            )}

                            <div className="pt-8 border-t border-slate-100 flex items-center justify-between gap-4">
                                <button 
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="text-sm font-semibold text-slate-550 hover:text-black flex items-center gap-1 transition-colors"
                                >
                                    ← Back
                                </button>

                                <button 
                                    type="button"
                                    onClick={() => {
                                        localStorage.setItem("seeker_firstName", firstName);
                                        localStorage.setItem("seeker_lastName", lastName);
                                        localStorage.setItem("seeker_phone", phone);
                                        localStorage.setItem("seeker_email", email);
                                        localStorage.setItem("seeker_passportCountry", passportCountry);
                                        localStorage.setItem("seeker_goals", JSON.stringify(selectedGoals));
                                        localStorage.setItem("seeker_destinations", JSON.stringify(selectedDests));
                                        setSubmitted(true);
                                    }}
                                    className="bg-[#111111] hover:bg-black text-white px-12 py-4 rounded-xl text-base font-semibold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <footer className="py-6 text-center text-xs text-slate-400 font-medium">
                © 2026 VisaFormula. All rights reserved.
            </footer>
        </div>
    );
}
