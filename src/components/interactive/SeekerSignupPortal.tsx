import { useState, useEffect } from "react";
import { Globe, GraduationCap, Briefcase, Plane, Home, CheckCircle, ArrowRight, ArrowLeft, User, Upload, Eye, EyeOff } from "lucide-react";
import { useAuth, AuthProvider } from "../providers/auth-provider";
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

function SeekerSignupPortalContent() {
    const [step, setStep] = useState(1);
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [selectedDests, setSelectedDests] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState(false);

    // Account inputs
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [countryOfCitizenship, setCountryOfCitizenship] = useState("");
    const [residentOf, setResidentOf] = useState("");
    const [citizenshipOpen, setCitizenshipOpen] = useState(false);
    const [residenceOpen, setResidenceOpen] = useState(false);
    const [phone, setPhone] = useState("");

    // Email Verification States
    const [email, setEmail] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false); // must verify
    const [verificationError, setVerificationError] = useState("");
    const [countryCode, setCountryCode] = useState("+91");
    const [validationError, setValidationError] = useState("");
    const [countryCodeOpen, setCountryCodeOpen] = useState(false);
    const [lookingFor, setLookingFor] = useState("");
    const [lookingForOpen, setLookingForOpen] = useState(false);

    const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(""));
    const [resendCooldown, setResendCooldown] = useState(0);
    const [sendingCode, setSendingCode] = useState(false);
    const [otpInput, setOtpInput] = useState("");

    const handleSendVerificationCode = async () => {
        setValidationError("");
        setVerificationError("");
        if (!email) {
            setValidationError("Please enter your email address first.");
            return;
        }
        setSendingCode(true);
        try {
            const res = await fetch("/api/auth/send-verification-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (res.ok) {
                setOtpSent(true);
                setResendCooldown(60);
                if (data.otp) {
                    console.log(`[Test Mode Code]: ${data.otp}`);
                }
            } else {
                setValidationError(data.message || "Failed to send verification code.");
            }
        } catch (err) {
            setValidationError("Server connection error. Please try again.");
        } finally {
            setSendingCode(false);
        }
    };

    const [verifyingCode, setVerifyingCode] = useState(false);

    const handleVerifyCode = async (forcedCode?: string) => {
        setValidationError("");
        const code = (forcedCode || otpInput || otpDigits.join("")).trim();
        if (code.length < 6) {
            setValidationError("Please enter all 6 digits of the code.");
            return;
        }
        setVerifyingCode(true);
        try {
            const res = await fetch("/api/auth/verify-email-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim(), otp: code })
            });
            const data = await res.json();
            if (res.ok && data.verified) {
                setOtpSent(false);
                setEmailVerified(true);
                setValidationError("");
            } else {
                setValidationError(data.message || "Invalid or expired verification code.");
            }
        } catch (err) {
            setValidationError("Failed to verify code. Please try again.");
        } finally {
            setVerifyingCode(false);
        }
    };

    useEffect(() => {
        let timer: any;
        if (resendCooldown > 0) {
            timer = setInterval(() => {
                setResendCooldown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendCooldown]);

    const { signInWithGoogle } = useAuth();
    const [googleLoading, setGoogleLoading] = useState(false);
    const [googleLoadingText, setGoogleLoadingText] = useState("");

    const handleGoogleSignup = async () => {
        setValidationError("");
        setGoogleLoading(true);
        setGoogleLoadingText("Connecting to Google Auth...");
        try {
            const res = await signInWithGoogle();
            
            // If user is brand new (needs_role), immediately auto-register them as a Seeker!
            if (res && res.status === 'needs_role') {
                setGoogleLoadingText("Initializing your seeker profile...");
                const response = await fetch("/api/auth/google/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: res.email,
                        name: res.name,
                        uid: res.uid,
                        role: 'seeker'
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    if (typeof window !== "undefined") {
                        localStorage.setItem("visaformula_user", JSON.stringify(data.user));
                        if (data.user && data.user.rawUser) {
                            const raw = data.user.rawUser;
                            localStorage.setItem("seeker_firstName", raw.first_name || "Seeker");
                            localStorage.setItem("seeker_lastName", raw.last_name || "");
                            localStorage.setItem("seeker_email", raw.email);
                            localStorage.setItem("seeker_passportCountry", raw.passport_country || "");
                        }
                    }
                } else {
                    const errData = await response.json();
                    throw new Error(errData.message || "Failed to register seeker profile.");
                }
            }

            setGoogleLoadingText("Authenticated! Redirecting to dashboard...");
            await new Promise(resolve => setTimeout(resolve, 800));
            window.location.href = "/dashboard";
        } catch (e: any) {
            setValidationError(e.message || "Google signup failed.");
            setGoogleLoading(false);
        }
    };

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
        <div className="min-h-screen text-[#111111] font-sora flex flex-col justify-between selection:bg-black selection:text-white bg-white relative overflow-x-hidden w-full max-w-full" style={{ 
            fontFamily: "'Plus Jakarta Sans', sans-serif"
        }}>
            <style dangerouslySetInnerHTML={{__html: `
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
                * {
                    font-family: 'Plus Jakarta Sans', sans-serif !important;
                    box-sizing: border-box;
                }
                html, body {
                    overflow-x: hidden !important;
                    max-width: 100% !important;
                    width: 100% !important;
                    margin: 0;
                    padding: 0;
                }
            `}} />
            {googleLoading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center z-[9999] transition-all duration-300">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm font-bold text-black tracking-wide animate-pulse">
                            {googleLoadingText}
                        </p>
                    </div>
                </div>
            )}
            <style dangerouslySetInnerHTML={{__html: `
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
                .font-sora, .font-sora *, body, html {
                    font-family: 'Plus Jakarta Sans', sans-serif !important;
                }
            `}} />
            <header className="w-full px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between font-sans gap-4 border-b border-slate-100 bg-white md:min-h-[120px] relative">
                <div className="order-1 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-10">
                    <a href="/">
                        <img src="/logo.png" alt="VisaFormula" className="h-16 md:h-28 w-auto object-contain mx-auto" />
                    </a>
                </div>

                <div className="order-2 w-full md:w-auto flex justify-between md:justify-start items-center gap-4">
                    <a href="/" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 bg-white text-xs font-bold text-black hover:bg-slate-50 shadow-sm transition-all shrink-0">
                        <span className="text-sm font-semibold">&larr;</span>
                        <span>Back to Home</span>
                    </a>
                    
                    <div className="text-xs font-semibold text-slate-500 shrink-0 md:hidden">
                        Already a member? <a href="/login" className="text-black font-extrabold hover:underline">Login</a>
                    </div>
                </div>

                <div className="hidden md:block text-sm font-semibold text-slate-500 shrink-0 order-3">
                    Already a member? <a href="/login" className="text-black font-bold hover:underline">Login</a>
                </div>
            </header>

            <div className="flex-grow flex flex-col justify-start pt-10 pb-28 px-6 max-w-4xl w-full mx-auto">
                <div className="text-center my-8">
                    <h1 className="text-2xl md:text-3xl font-semibold text-black tracking-tight mb-3">Register as Seeker</h1>
                    <p className="text-base text-slate-400 font-medium">Setup immigration goals and match with verified advisors.</p>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center justify-center gap-2 md:gap-6 my-10 font-sans max-w-full overflow-x-auto px-2">
                    {steps.map((s, i) => (
                        <div key={s.label} className="flex items-center gap-2 md:gap-4 shrink-0">
                            <div className="flex items-center gap-2 md:gap-3 shrink-0">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold transition-all shrink-0 ${
                                    step > i + 1 ? "bg-black text-white" :
                                    step === i + 1 ? "bg-black text-white shadow-md" :
                                    "border-2 border-slate-350 text-slate-500"
                                }`}>
                                    {step > i + 1 ? "✓" : s.icon}
                                </div>
                                <span className={`hidden md:inline text-[11px] md:text-sm font-semibold whitespace-nowrap ${step >= i + 1 ? "text-black" : "text-slate-450"}`}>{s.label}</span>
                            </div>
                            {i < steps.length - 1 && (
                                <div className={`h-0.5 w-6 md:w-16 shrink-0 transition-all ${step > i + 1 ? "bg-black" : "bg-slate-200"}`} />
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

                            if (password !== confirmPassword) {
                                setValidationError("Passwords do not match. Please verify your password entry.");
                                return;
                            }

                            // Contact validation: at least 10 digits
                            const cleanPhone = phone.replace(/\D/g, "");
                            if (cleanPhone.length < 10) {
                                setValidationError("Please enter a valid phone number containing at least 10 digits.");
                                return;
                            }

                            if (!emailVerified) {
                                setValidationError("Please verify your email address with the OTP code first.");
                                return;
                            }

                            setValidationError("");
                            setStep(2);
                        }} className="space-y-4">
                            <div className="flex flex-col items-center gap-4 mb-6">
                                <button
                                    type="button"
                                    onClick={handleGoogleSignup}
                                    className="w-full max-w-[280px] h-12 border border-slate-200/80 bg-white hover:bg-slate-50 transition-all text-slate-800 font-extrabold text-xs rounded-xl flex items-center justify-center gap-3 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 duration-200 shrink-0 cursor-pointer"
                                >
                                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                                    </svg>
                                    <span>Continue with Google</span>
                                </button>

                                <div className="flex items-center justify-center gap-3 w-full max-w-[280px] my-1">
                                    <div className="h-[1px] bg-slate-200 flex-grow" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">— OR —</span>
                                    <div className="h-[1px] bg-slate-200 flex-grow" />
                                </div>
                            </div>

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

                                <div className="col-span-2 space-y-2">
                                    <div className="flex flex-col sm:flex-row gap-3 items-center">
                                        <div className="flex-grow relative w-full">
                                            <input 
                                                type="email"
                                                placeholder="Email Address"
                                                required
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                    setEmailVerified(false);
                                                }}
                                                style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-[15px] outline-none focus:border-gray-500 text-slate-800 placeholder:text-slate-500 shadow-sm pr-10"
                                            />
                                            {emailVerified && (
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center bg-emerald-50 border border-emerald-250 p-1.5 rounded-full animate-premium-fade shadow-sm">
                                                    <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </span>
                                            )}
                                        </div>

                                        {otpSent && !emailVerified && (
                                             <div className="relative w-full sm:w-auto shrink-0 flex gap-2 animate-premium-fade">
                                                 <input
                                                     type="text"
                                                     maxLength={6}
                                                     placeholder="OTP"
                                                     value={otpInput}
                                                     onChange={(e) => setOtpInput(e.target.value)}
                                                     className="w-24 px-2 py-3 bg-white border border-gray-300 rounded-md text-[15px] outline-none focus:border-black text-center font-bold tracking-widest text-black shadow-sm"
                                                 />
                                                 <button
                                                     type="button"
                                                     disabled={verifyingCode}
                                                     onClick={() => handleVerifyCode(otpInput)}
                                                     className="bg-black hover:bg-neutral-900 text-white text-xs font-bold tracking-wider px-4 py-3 rounded-md uppercase cursor-pointer h-[46px] shrink-0 active:scale-95 disabled:opacity-50"
                                                 >
                                                     {verifyingCode ? "Verifying..." : "Verify"}
                                                 </button>
                                             </div>
                                         )}
                                        
                                        {!emailVerified && (
                                            <button
                                                type="button"
                                                onClick={handleSendVerificationCode}
                                                disabled={sendingCode || resendCooldown > 0}
                                                className="bg-black text-white text-xs font-bold tracking-wider px-5 py-3 rounded-md hover:bg-neutral-900 transition-all uppercase cursor-pointer disabled:bg-slate-200 disabled:text-slate-400 h-[46px] shrink-0 w-full sm:w-auto"
                                            >
                                                {sendingCode ? "Sending..." : resendCooldown > 0 ? `Resend (${resendCooldown}s)` : otpSent ? "Resend" : "Send OTP"}
                                            </button>
                                        )}
                                    </div>
                                    {validationError && (
                                        <p className="text-xs text-red-500 font-semibold mt-1.5">{validationError}</p>
                                    )}
                                </div>

                                {/* Connected Passwords Area */}
                                <div className={`col-span-2 space-y-4 border-l-4 pl-4 transition-all duration-300 ${
                                    !password && !confirmPassword ? 'border-slate-200' :
                                    password === confirmPassword ? 'border-emerald-500 bg-emerald-50/10 py-2 rounded-r-md' : 'border-rose-500 bg-rose-50/10 py-2 rounded-r-md'
                                }`}>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Security Credentials</span>
                                        {password && confirmPassword && (
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                                password === confirmPassword ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                            }`}>
                                                {password === confirmPassword ? '✓ Passwords Match' : '✗ Passwords Do Not Match'}
                                            </span>
                                        )}
                                    </div>

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
                                    <span className="text-[10px] text-slate-400 block font-semibold leading-normal mt-1">Must be at least 8 characters long, containing 1 number and 1 special symbol (e.g. @, #, $, !).</span>

                                    <div className="relative">
                                        <input 
                                            type={showConfirmPassword ? "text" : "password"} 
                                            required
                                            value={confirmPassword} 
                                            onChange={(e) => setConfirmPassword(e.target.value)} 
                                            placeholder="Confirm Password" 
                                            style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-[15px] outline-none focus:border-gray-500 text-slate-800 placeholder:text-slate-500 shadow-sm pr-10"
                                        />
                                        <button 
                                            type="button" 
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 block">Country of Citizenship (Passport Country)*</label>
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
                                 <div className="space-y-2 col-span-2 lg:col-span-1">
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
                                 <div className="space-y-2 col-span-2 lg:col-span-1">
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

                                  <div className="col-span-2 space-y-2">
                                      <label className="text-sm font-semibold text-slate-700 block">Looking for*</label>
                                      <div className="relative">
                                          <button
                                              type="button"
                                              onClick={() => { setLookingForOpen(!lookingForOpen); setCitizenshipOpen(false); setResidenceOpen(false); }}
                                              className="w-full px-5 py-4 bg-white border border-slate-250 rounded-xl text-base outline-none focus:border-black focus:ring-1 focus:ring-black text-black placeholder:text-slate-400 shadow-sm text-left flex justify-between items-center cursor-pointer font-semibold h-[58px]"
                                          >
                                              <span>{lookingFor || "Select a service"}</span>
                                              <svg className="fill-current h-4 w-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                          </button>
                                          {lookingForOpen && (
                                              <div className="absolute z-50 w-full mt-1 bg-white border border-slate-250 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                                                  {["Visitor Visa", "Student Visa", "Work Visa", "Permanent Residence", "Citizenship", "Visa Appeal"].map(opt => (
                                                      <div
                                                          key={opt}
                                                          onClick={() => { setLookingFor(opt); setLookingForOpen(false); }}
                                                          className="px-5 py-3 text-base text-black hover:bg-black hover:text-white cursor-pointer transition-colors"
                                                      >
                                                          {opt}
                                                      </div>
                                                  ))}
                                              </div>
                                          )}
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
                                                    passport_country: countryOfCitizenship,
                                                    goals: selectedGoals,
                                                    destinations: selectedDests,
                                                    looking_for: lookingFor
                                                })
                                            });
                                            if (!response.ok) {
                                                const errData = await response.json();
                                                setValidationError(errData.message || "Registration failed.");
                                                setStep(1);
                                                return;
                                            }
                                            const data = await response.json();
                                            if (data.user && typeof window !== "undefined") {
                                                localStorage.setItem("visaformula_user", JSON.stringify(data.user));
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
                                        localStorage.setItem("seeker_looking_for", lookingFor);
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

export function SeekerSignupPortal() {
    return (
        <AuthProvider>
            <SeekerSignupPortalContent />
        </AuthProvider>
    );
}
