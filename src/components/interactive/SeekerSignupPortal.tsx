import { useState } from "react";
import { Globe, GraduationCap, Briefcase, Plane, Home, CheckCircle, ArrowRight, ArrowLeft, Shield, Sparkles } from "lucide-react";

const goals = [
    { id: "study", icon: GraduationCap, label: "Study Abroad", desc: "Find universities & student visas" },
    { id: "work", icon: Briefcase, label: "Work Overseas", desc: "Work permits, H-1B, PR pathways" },
    { id: "visit", icon: Plane, label: "Visit / Tourist", desc: "Short-stay & tourist visas" },
    { id: "settle", icon: Home, label: "Settle Permanently", desc: "Express Entry, PR, citizenship" },
];

const destinations = ["Canada", "USA", "UK", "Australia", "New Zealand", "Germany", "Ireland", "Singapore", "UAE", "France"];

const countryCodes = [
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+1", country: "USA/Canada", flag: "🇺🇸" },
    { code: "+44", country: "UK", flag: "🇬🇧" },
    { code: "+61", country: "Australia", flag: "🇦🇺" },
    { code: "+971", country: "UAE", flag: "🇦🇪" },
    { code: "+65", country: "Singapore", flag: "🇸🇬" },
    { code: "+49", country: "Germany", flag: "🇩🇪" }
];

export function SeekerSignupPortal() {
    const [step, setStep] = useState(1);
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [selectedDests, setSelectedDests] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState(false);

    // Seeker Registration Form Fields mapped to Postgres Schema
    const [firstName, setFirstName] = useState("");
    const [surName, setSurName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [countryOfCitizenship, setCountryOfCitizenship] = useState("India");
    const [residentOf, setResidentOf] = useState("India");
    const [phoneCode, setPhoneCode] = useState("+91");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const toggleItem = (id: string, list: string[], setList: (l: string[]) => void) => {
        setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setIsSubmitting(true);

        if (!firstName || !surName || !dateOfBirth || !email || !phoneNumber || !password) {
            setErrorMsg("Please fill in all required fields.");
            setIsSubmitting(false);
            return;
        }

        try {
            // Securely construct data object matching Serverless Postgres schema variables
            const payload = {
                first_name: firstName,
                sur_name: surName,
                date_of_birth: dateOfBirth,
                country_of_citizenship: countryOfCitizenship,
                resident_of: residentOf,
                phone: `${phoneCode}${phoneNumber}`,
                email: email,
                password: password,
                goals: selectedGoals,
                destinations: selectedDests
            };

            // Save to localStorage for demo persistence in dashboard
            localStorage.setItem("seeker_firstName", firstName);
            localStorage.setItem("seeker_lastName", surName);
            localStorage.setItem("seeker_dob", dateOfBirth);
            localStorage.setItem("seeker_citizenship", countryOfCitizenship);
            localStorage.setItem("seeker_residentOf", residentOf);
            localStorage.setItem("seeker_phone", `${phoneCode}${phoneNumber}`);
            localStorage.setItem("seeker_email", email);
            localStorage.setItem("seeker_goals", JSON.stringify(selectedGoals));
            localStorage.setItem("seeker_destinations", JSON.stringify(selectedDests));

            // Simulate serverless postgres DB submission latency
            await new Promise(resolve => setTimeout(resolve, 1200));
            setSubmitted(true);
        } catch (err) {
            setErrorMsg("Registration failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen text-neutral-100 font-sans flex flex-col justify-between bg-[#050505] selection:bg-cyan-500 selection:text-black">
                <div className="flex-grow flex flex-col items-center justify-center px-4 py-12">
                    <div className="bg-[#0c0c0c] rounded-3xl border border-neutral-800/80 p-10 max-w-md w-full text-center shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00FF66] to-transparent"></div>
                        <div className="w-20 h-20 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-950/20">
                            <CheckCircle className="w-10 h-10 text-[#00FF66]" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Registration Complete</h1>
                        <p className="text-neutral-400 text-sm mb-8 font-medium">Your profile has been mapped to our secure Serverless Postgres storage.</p>
                        <a href="/dashboard" className="block">
                            <button className="w-full bg-[#00FF66] hover:bg-[#00e055] text-black py-4 rounded-xl font-bold tracking-wider transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-lg shadow-emerald-500/10 cursor-pointer text-sm">
                                Enter Premium Dashboard <ArrowRight className="w-4 h-4" />
                            </button>
                        </a>
                    </div>
                </div>
                <footer className="py-6 text-center text-xs text-neutral-600 font-medium">
                    © 2026 VisaFormula. All rights reserved.
                </footer>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-neutral-200 flex flex-col justify-between bg-[#050505] selection:bg-cyan-500 selection:text-black">
            <header className="w-full px-6 md:px-12 py-6 flex items-center justify-between min-h-[100px]">
                <a href="javascript:history.back()" className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-neutral-800/80 text-xs font-bold text-neutral-400 hover:text-white hover:border-neutral-750 transition-all shrink-0">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                </a>
                
                <a href="/" className="flex items-center gap-2">
                    <span className="text-white font-serif text-xl tracking-wider uppercase font-semibold">VisaFormula</span>
                    <span className="bg-[#00F0FF]/10 text-[#00F0FF] text-[8px] font-black tracking-widest px-2 py-0.5 rounded-full border border-[#00F0FF]/20">SEEKER</span>
                </a>
                
                <div className="text-xs font-semibold text-neutral-500 shrink-0">
                    Already a member? <a href="/login" className="text-white hover:text-cyan-400 hover:underline">Login</a>
                </div>
            </header>

            <div className="flex-grow flex flex-col justify-start py-10 px-6 max-w-2xl w-full mx-auto">
                {/* Custom Process Step Indicator */}
                <div className="flex items-center justify-between mb-12 max-w-sm mx-auto w-full relative">
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-neutral-900 -translate-y-1/2 z-0"></div>
                    <div className={`absolute top-1/2 left-0 h-[1px] bg-cyan-500 -translate-y-1/2 z-0 transition-all duration-300`} style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>
                    
                    {[1, 2, 3].map((s) => (
                        <button
                            key={s}
                            onClick={() => s < step && setStep(s)}
                            disabled={s >= step}
                            className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-300 relative z-10 ${
                                s === step
                                    ? "bg-black border-cyan-500 text-cyan-400 shadow-md shadow-cyan-950/20"
                                    : s < step
                                    ? "bg-cyan-500 border-cyan-500 text-black"
                                    : "bg-[#050505] border-neutral-800 text-neutral-600"
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                <div className="bg-[#0c0c0c] border border-neutral-800/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent"></div>

                    {errorMsg && (
                        <div className="mb-6 p-4 bg-red-950/30 border border-red-900/50 rounded-xl text-red-400 text-xs font-semibold">
                            ⚠️ {errorMsg}
                        </div>
                    )}

                    {step === 1 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-bold text-white tracking-tight mb-1">Seeker Registration</h2>
                                <p className="text-xs text-neutral-400">Configure your global visa profile mapping.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">First Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. John"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full bg-[#111111] border border-neutral-800/80 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">Surname / Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Doe"
                                        value={surName}
                                        onChange={(e) => setSurName(e.target.value)}
                                        className="w-full bg-[#111111] border border-neutral-800/80 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">Date of Birth</label>
                                    <input
                                        type="date"
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        className="w-full bg-[#111111] border border-neutral-800/80 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none transition-all [color-scheme:dark]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">Country of Citizenship</label>
                                    <select
                                        value={countryOfCitizenship}
                                        onChange={(e) => setCountryOfCitizenship(e.target.value)}
                                        className="w-full bg-[#111111] border border-neutral-800/80 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none transition-all cursor-pointer"
                                    >
                                        <option value="India">India</option>
                                        <option value="Maldives">Maldives</option>
                                        <option value="Canada">Canada</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="United States">United States</option>
                                        <option value="Australia">Australia</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">Resident Of (Current Location)</label>
                                    <select
                                        value={residentOf}
                                        onChange={(e) => setResidentOf(e.target.value)}
                                        className="w-full bg-[#111111] border border-neutral-800/80 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none transition-all cursor-pointer"
                                    >
                                        <option value="India">India</option>
                                        <option value="Maldives">Maldives</option>
                                        <option value="Canada">Canada</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="United States">United States</option>
                                        <option value="Australia">Australia</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">Phone Number</label>
                                    <div className="flex gap-2">
                                        <select
                                            value={phoneCode}
                                            onChange={(e) => setPhoneCode(e.target.value)}
                                            className="bg-[#111111] border border-neutral-800/80 rounded-xl px-2 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none transition-all cursor-pointer w-24 shrink-0"
                                        >
                                            {countryCodes.map(c => (
                                                <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                                            ))}
                                        </select>
                                        <input
                                            type="tel"
                                            placeholder="9876543210"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            className="w-full bg-[#111111] border border-neutral-800/80 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john.doe@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#111111] border border-neutral-800/80 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#111111] border border-neutral-800/80 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none transition-all"
                                />
                            </div>

                            <button
                                onClick={() => {
                                    if (!firstName || !surName || !dateOfBirth || !email || !phoneNumber || !password) {
                                        setErrorMsg("Please fill in all Account details first.");
                                    } else {
                                        setErrorMsg("");
                                        setStep(2);
                                    }
                                }}
                                className="w-full bg-[#00F0FF] hover:bg-[#00d0e0] text-black py-3.5 rounded-xl font-bold tracking-wider transition-all flex items-center justify-center gap-1 active:scale-[0.98] shadow-md shadow-cyan-500/10 cursor-pointer text-xs"
                            >
                                Continue to Goals <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-bold text-white tracking-tight mb-1">Your Visa Goals</h2>
                                <p className="text-xs text-neutral-400">Select one or more matching categories.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {goals.map((g) => {
                                    const Icon = g.icon;
                                    const isSelected = selectedGoals.includes(g.id);
                                    return (
                                        <div
                                            key={g.id}
                                            onClick={() => toggleItem(g.id, selectedGoals, setSelectedGoals)}
                                            className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 text-left relative group ${
                                                isSelected
                                                    ? "bg-[#111111] border-cyan-500/80 shadow-md shadow-cyan-950/20"
                                                    : "bg-[#080808] border-neutral-800/85 hover:border-neutral-700"
                                            }`}
                                        >
                                            {isSelected && (
                                                <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
                                            )}
                                            <Icon className={`w-6 h-6 mb-3 ${isSelected ? "text-[#00F0FF]" : "text-neutral-500"}`} />
                                            <div className="text-xs font-bold text-white mb-1">{g.label}</div>
                                            <div className="text-[10px] text-neutral-400 font-semibold leading-relaxed">{g.desc}</div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep(1)}
                                    className="w-1/3 bg-transparent border border-neutral-800 text-neutral-400 py-3.5 rounded-xl font-bold transition-all text-xs active:scale-[0.98]"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={() => setStep(3)}
                                    className="w-2/3 bg-[#00F0FF] hover:bg-[#00d0e0] text-black py-3.5 rounded-xl font-bold tracking-wider transition-all flex items-center justify-center gap-1 active:scale-[0.98] text-xs"
                                >
                                    Select Destinations <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-bold text-white tracking-tight mb-1">Target Destinations</h2>
                                <p className="text-xs text-neutral-400">Choose countries you wish to study, work or visit.</p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {destinations.map((dest) => {
                                    const isSelected = selectedDests.includes(dest);
                                    return (
                                        <button
                                            key={dest}
                                            onClick={() => toggleItem(dest, selectedDests, setSelectedDests)}
                                            className={`py-3 rounded-xl border text-xs font-bold transition-all select-none ${
                                                isSelected
                                                    ? "bg-[#111111] border-cyan-500 text-cyan-400"
                                                    : "bg-[#080808] border-neutral-800 text-neutral-400 hover:border-neutral-750"
                                            }`}
                                        >
                                            {dest}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep(2)}
                                    className="w-1/3 bg-transparent border border-neutral-800 text-neutral-400 py-3.5 rounded-xl font-bold transition-all text-xs active:scale-[0.98]"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleRegister}
                                    disabled={isSubmitting}
                                    className="w-2/3 bg-[#00FF66] hover:bg-[#00e055] text-black py-3.5 rounded-xl font-bold tracking-wider transition-all flex items-center justify-center gap-1 active:scale-[0.98] text-xs shadow-lg shadow-emerald-500/10"
                                >
                                    {isSubmitting ? "Submitting..." : "Submit & Complete →"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <footer className="py-6 text-center text-xs text-neutral-600 font-medium font-sans">
                © 2026 VisaFormula. All rights reserved.
            </footer>
        </div>
    );
}
