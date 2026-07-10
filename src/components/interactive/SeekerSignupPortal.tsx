import { useState } from "react";
import { Globe, GraduationCap, Briefcase, Plane, Home, CheckCircle, ArrowRight, ArrowLeft, User, Upload, Eye, EyeOff } from "lucide-react";
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
    const [showPassword, setShowPassword] = useState(false);
    const [countryOfCitizenship, setCountryOfCitizenship] = useState("");
    const [residentOf, setResidentOf] = useState("");
    const [citizenshipOpen, setCitizenshipOpen] = useState(false);
    const [residenceOpen, setResidenceOpen] = useState(false);
    const [phone, setPhone] = useState("");

    // Email Verification States
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [emailVerified, setEmailVerified] = useState(true);
    const [verificationError, setVerificationError] = useState("");
    const [countryCode, setCountryCode] = useState("+91");
    const [validationError, setValidationError] = useState("");
    const [countryCodeOpen, setCountryCodeOpen] = useState(false);

    const toggleItem = (id: string, list: string[], setList: (l: string[]) => void) => {
        setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
    };

    if (submitted) {
        return (
            <div className="min-h-screen text-[#111111] font-sans flex flex-col justify-between selection:bg-black selection:text-white bg-white" style={{ 
                fontFamily: "'Sora', sans-serif"
            }}>


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
        <div className="min-h-screen text-[#111111] font-sora flex flex-col justify-between selection:bg-black selection:text-white bg-white" style={{ 
            fontFamily: "'Sora', sans-serif"
        }}>
            <style dangerouslySetInnerHTML={{__html: `
                .font-sora, .font-sora * {
                    font-family: 'Sora', sans-serif !important;
                }
            `}} />
            <header className="relative w-full px-4 md:px-8 py-6 flex items-center justify-between font-sans min-h-[120px]">
                <a href="/" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 bg-white text-xs font-bold text-black hover:bg-slate-50 shadow-sm transition-all shrink-0">
                    <span className="text-sm font-semibold">&larr;</span>
                    <span>Back to Home</span>
                </a>
                
                <a href="/" className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 z-10">
                    <img src="/logo/visaformula-navbar.svg" alt="VisaFormula" className="h-36 w-auto object-contain" />
                </a>
                
                <div className="text-base font-medium text-slate-500 shrink-0">
                    Already a member? <a href="/login" className="text-black font-bold hover:underline">Login</a>
                </div>
            </header>

            <div className="flex-grow flex flex-col justify-start py-10 px-6 max-w-4xl w-full mx-auto">
                <div className="text-center my-8">
                    <h1 className="text-2xl md:text-3xl font-semibold text-black tracking-tight mb-3">Register as Seeker</h1>
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
                            setValidationError("");
                            
                            // Email check
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
                            if (!emailRegex.test(email)) {
                                setValidationError("Please enter a valid email address (must contain '@' and end with a valid domain like '.com').");
                                return;
                            }

                            // Password check: 8 chars, 1 number, 1 symbol
                            const hasNumber = /\d/.test(password);
                            const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
                            if (password.length < 8) {
                                setValidationError("Password must be at least 8 characters long.");
                                return;
                            }
                            if (!hasNumber || !hasSymbol) {
                                setValidationError("Password must contain at least one number and one special character / symbol (e.g. !, @, #, etc).");
                                return;
                            }

                            // Contact validation: at least 10 digits
                            const cleanPhone = phone.replace(/\D/g, "");
                            if (cleanPhone.length < 10) {
                                setValidationError("Please enter a valid phone number containing at least 10 digits.");
                                return;
                            }

                            if (verificationStep) {
                                verifyEmailCode();
                                return;
                            }

                            if (!emailVerified) {
                                setVerificationError("You must verify your email address to continue.");
                                return;
                            }
                            setValidationError("");
                            setStep(2);
                        }} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-1">
                                    <input 
                                        type="text" 
                                        required
                                        value={firstName} 
                                        onChange={(e) => setFirstName(e.target.value)} 
                                        placeholder="First name" 
                                        style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-[15px] outline-none focus:border-gray-500 text-slate-800 placeholder:text-slate-500 shadow-sm"
                                    />
                                </div>
                                <div className="col-span-1">
                                    <input 
                                        type="text" 
                                        required
                                        value={lastName} 
                                        onChange={(e) => setLastName(e.target.value)} 
                                        placeholder="Last name" 
                                        style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-[15px] outline-none focus:border-gray-500 text-slate-800 placeholder:text-slate-500 shadow-sm"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <input 
                                        type="email" 
                                        required
                                        placeholder="Email address" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-[15px] outline-none focus:border-gray-500 text-slate-800 placeholder:text-slate-500 shadow-sm"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <div className="relative">
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            required
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)} 
                                            placeholder="Password" 
                                            style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-[15px] outline-none focus:border-gray-500 text-slate-800 placeholder:text-slate-500 shadow-sm pr-10"
                                        />
                                        <button 
                                            type="button" 
                                            onClick={() => setShowPassword(!showPassword)} 
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <span className="text-[10px] text-slate-400 block font-semibold leading-normal mt-1.5">Must be at least 8 characters long, containing 1 number and 1 special symbol (e.g. @, #, $, !).</span>
                                </div>
                                <div className="col-span-2">
                                     <div className="relative">
                                         <button
                                             type="button"
                                             onClick={() => { setCitizenshipOpen(!citizenshipOpen); setResidenceOpen(false); }}
                                             className="w-full px-5 py-4 bg-white border border-slate-250 rounded-xl text-base outline-none focus:border-black focus:ring-1 focus:ring-black text-black placeholder:text-slate-400 shadow-sm text-left flex justify-between items-center cursor-pointer"
                                         >
                                             <span>{countryOfCitizenship || "Select passport country"}</span>
                                             <svg className="fill-current h-4 w-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                         </button>
                                         {citizenshipOpen && (
                                             <div className="absolute z-50 w-full mt-1 bg-white border border-slate-250 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                                                 {["India", "Nigeria", "Philippines", "Brazil", "Pakistan", "Bangladesh", "United States", "United Kingdom", "Canada", "Australia", "Other"].map(opt => (
                                                     <div
                                                         key={opt}
                                                         onClick={() => { setCountryOfCitizenship(opt); setCitizenshipOpen(false); }}
                                                         className="px-5 py-3 text-base text-black hover:bg-black hover:text-white cursor-pointer transition-colors"
                                                     >
                                                         {opt}
                                                     </div>
                                                 ))}
                                             </div>
                                         )}
                                     </div>
                                 </div>
                                 <div className="space-y-2">
                                     <label className="text-sm font-semibold text-slate-700 block">Current Country of Residence*</label>
                                     <div className="relative">
                                         <button
                                             type="button"
                                             onClick={() => { setResidenceOpen(!residenceOpen); setCitizenshipOpen(false); }}
                                             className="w-full px-5 py-4 bg-white border border-slate-250 rounded-xl text-base outline-none focus:border-black focus:ring-1 focus:ring-black text-black placeholder:text-slate-400 shadow-sm text-left flex justify-between items-center cursor-pointer"
                                         >
                                             <span>{residentOf || "Select current residence"}</span>
                                             <svg className="fill-current h-4 w-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                         </button>
                                         {residenceOpen && (
                                             <div className="absolute z-50 w-full mt-1 bg-white border border-slate-250 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                                                 {["India", "Nigeria", "Philippines", "Brazil", "Pakistan", "Bangladesh", "United States", "United Kingdom", "Canada", "Australia", "Singapore", "United Arab Emirates", "Germany", "France", "Other"].map(opt => (
                                                     <div
                                                         key={opt}
                                                         onClick={() => { setResidentOf(opt); setResidenceOpen(false); }}
                                                         className="px-5 py-3 text-base text-black hover:bg-black hover:text-white cursor-pointer transition-colors"
                                                     >
                                                         {opt}
                                                     </div>
                                                 ))}
                                             </div>
                                         )}
                                     </div>
                                 </div>
                                <div className="space-y-2">
                                     <label className="text-sm font-semibold text-slate-700 block">Phone Number*</label>
                                     <div className="flex gap-3">
                                         <div className="relative" onClick={(e) => e.stopPropagation()}>
                                             <button
                                                 type="button"
                                                 onClick={() => setCountryCodeOpen(!countryCodeOpen)}
                                                 className="px-4 py-4 bg-white border border-slate-250 rounded-xl text-base outline-none focus:border-black focus:ring-1 focus:ring-black text-black shadow-sm shrink-0 cursor-pointer flex items-center justify-between gap-1.5 h-[58px] font-semibold"
                                             >
                                                 <span>{countryCode}</span>
                                                 <svg className={`w-4 h-4 text-slate-500 transition-transform ${countryCodeOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                                             </button>
                                             {countryCodeOpen && (
                                                 <div className="absolute left-0 mt-1.5 w-40 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto z-[60] font-sans">
                                                     {[
                                                         { val: "+91", label: "+91 (IN)" },
                                                         { val: "+1", label: "+1 (US/CA)" },
                                                         { val: "+44", label: "+44 (UK)" },
                                                         { val: "+61", label: "+61 (AU)" },
                                                         { val: "+971", label: "+971 (AE)" },
                                                         { val: "+49", label: "+49 (DE)" },
                                                         { val: "+33", label: "+33 (FR)" },
                                                         { val: "+65", label: "+65 (SG)" },
                                                         { val: "+64", label: "+64 (NZ)" }
                                                     ].map(opt => (
                                                         <button
                                                             key={opt.val}
                                                             type="button"
                                                             onClick={() => { setCountryCode(opt.val); setCountryCodeOpen(false); }}
                                                             className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-black hover:text-white transition-colors"
                                                         >
                                                             {opt.label}
                                                         </button>
                                                     ))}
                                                 </div>
                                             )}
                                         </div>
                                         <input 
                                             type="tel" 
                                             required
                                             placeholder="99999 99999" 
                                             value={phone}
                                             onChange={(e) => setPhone(e.target.value)}
                                             className="w-full px-5 py-4 bg-white border border-slate-250 rounded-xl text-base outline-none focus:border-black focus:ring-1 focus:ring-black text-black placeholder:text-slate-400 shadow-sm" 
                                         />
                                     </div>
                                 </div>
                             </div>

                             {validationError && (
                                 <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-xs font-semibold font-sans text-center transition-all animate-premium-fade max-w-lg mx-auto mt-6">
                                     {validationError}
                                 </div>
                             )}

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
                                    <span className="text-black font-bold">{selectedDests.slice(0, 3).join(", ")}</span>
                                    {selectedDests.length > 3 ? ` and ${selectedDests.length - 3} more` : ""}.
                                </div>
                            )}

                            {validationError && (
                                <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-xs font-semibold font-sans text-center transition-all animate-premium-fade max-w-lg mx-auto mt-6">
                                    {validationError}
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
                                    onClick={async () => {
                                        try {
                                            const response = await fetch(`${import.meta.env.PUBLIC_BACKEND_URL || ''}/api/register/seeker`, {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({
                                                    first_name: firstName,
                                                    last_name: lastName,
                                                    email: email,
                                                    password: password,
                                                    phone: `${countryCode} ${phone}`,
                                                    country_of_citizenship: countryOfCitizenship,
                                                    resident_of: residentOf,
                                                    passport_country: countryOfCitizenship, // legacy fallback
                                                    goals: selectedGoals,
                                                    destinations: selectedDests
                                                })
                                            });
                                            if (!response.ok) {
                                                const errData = await response.json();
                                                setValidationError(errData.message || "Registration failed.");
                                                setStep(1);
                                                return;
                                            }
                                        } catch (err) {
                                            console.warn("Backend server offline. Falling back to local simulation mode.", err);
                                        }
                                        // Save locally and proceed
                                        localStorage.setItem("seeker_firstName", firstName);
                                        localStorage.setItem("seeker_lastName", lastName);
                                        localStorage.setItem("seeker_phone", `${countryCode} ${phone}`);
                                        localStorage.setItem("seeker_email", email);
                                        localStorage.setItem("seeker_country_of_citizenship", countryOfCitizenship);
                                        localStorage.setItem("seeker_resident_of", residentOf);
                                        localStorage.setItem("seeker_passportCountry", countryOfCitizenship); // legacy fallback
                                        localStorage.setItem("seeker_goals", JSON.stringify(selectedGoals));
                                        localStorage.setItem("seeker_destinations", JSON.stringify(selectedDests));
                                        if (typeof window !== "undefined") {
                                            window.scrollTo({ top: 0, behavior: "instant" });
                                        }
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
