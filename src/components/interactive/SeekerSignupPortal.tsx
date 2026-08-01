import { useState, useEffect } from "react";
import { Globe, GraduationCap, Briefcase, Plane, Home, CheckCircle, ArrowRight, ArrowLeft, User, Upload, Eye, EyeOff, Mail, X, Pencil } from "lucide-react";
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
    const [currentVisaStatus, setCurrentVisaStatus] = useState("");
    const [currentVisaStatusOpen, setCurrentVisaStatusOpen] = useState(false);

    // Modal OTP States
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [modalError, setModalError] = useState("");
    const [isEditingEmail, setIsEditingEmail] = useState(false);

    // Residential Address States
    const [addressArea, setAddressArea] = useState("");
    const [addressCity, setAddressCity] = useState("");
    const [addressState, setAddressState] = useState("");
    const [addressZip, setAddressZip] = useState("");

    const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(""));
    const [resendCooldown, setResendCooldown] = useState(0);
    const [sendingCode, setSendingCode] = useState(false);
    const [otpInput, setOtpInput] = useState("");

    const [emailErrorMsg, setEmailErrorMsg] = useState("");

    const handleSendVerificationCode = async () => {
        setValidationError("");
        setVerificationError("");
        setEmailErrorMsg("");
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
                const errorText = data.message || "Failed to send verification code.";
                setValidationError(errorText);
                if (data.code === 'EMAIL_ALREADY_EXISTS' || errorText.toLowerCase().includes('already registered')) {
                    setEmailErrorMsg("This email is already registered.");
                }
            }
        } catch (err) {
            setValidationError("Server connection error. Please try again.");
        } finally {
            setSendingCode(false);
        }
    };

    const [verifyingCode, setVerifyingCode] = useState(false);

    const handleVerifyCode = async (forcedCode?: string): Promise<boolean> => {
        setValidationError("");
        const code = (forcedCode || otpInput || otpDigits.join("")).trim();
        if (code.length < 6) {
            setValidationError("Please enter all 6 digits of the code.");
            return false;
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
                setEmailVerified(true);
                setValidationError("");
                return true;
            } else {
                setValidationError(data.message || "Invalid or expired verification code.");
                return false;
            }
        } catch (err) {
            setValidationError("Server error while verifying code.");
            return false;
        } finally {
            setVerifyingCode(false);
        }
    };

    const handleDigitChange = (val: string, idx: number) => {
        const cleanVal = val.replace(/\D/g, "").slice(-1);
        const updated = [...otpDigits];
        updated[idx] = cleanVal;
        setOtpDigits(updated);
        setOtpInput(updated.join(""));
        setModalError("");

        if (cleanVal && idx < 5) {
            const nextInput = document.getElementById(`otp-box-${idx + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleDigitKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
        if (e.key === "Backspace" && !otpDigits[idx] && idx > 0) {
            const prevInput = document.getElementById(`otp-box-${idx - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleDigitPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        if (pasted) {
            const digitsArr = pasted.split("");
            const updated = Array(6).fill("");
            digitsArr.forEach((d, i) => { updated[i] = d; });
            setOtpDigits(updated);
            setOtpInput(pasted);
            setModalError("");
            const targetIdx = Math.min(digitsArr.length, 5);
            const targetInput = document.getElementById(`otp-box-${targetIdx}`);
            if (targetInput) targetInput.focus();
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

    const handleFinalSubmit = async () => {
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
                    current_visa_status: currentVisaStatus,
                    goals: selectedGoals,
                    destinations: selectedDests,
                    area: addressArea,
                    city: addressCity,
                    state: addressState,
                    zip_code: addressZip,
                    address: [addressArea, addressCity, addressState, addressZip].filter(Boolean).join(", ")
                })
            });
            if (!response.ok) {
                const errData = await response.json();
                setValidationError(errData.message || "Registration failed.");
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
        localStorage.setItem("seeker_current_visa_status", currentVisaStatus);
        localStorage.setItem("seeker_passportCountry", countryOfCitizenship); // legacy fallback
        localStorage.setItem("seeker_area", addressArea);
        localStorage.setItem("seeker_city", addressCity);
        localStorage.setItem("seeker_state", addressState);
        localStorage.setItem("seeker_zip", addressZip);
        localStorage.setItem("seeker_address", [addressArea, addressCity, addressState, addressZip].filter(Boolean).join(", "));
        localStorage.setItem("seeker_goals", JSON.stringify(selectedGoals));
        localStorage.setItem("seeker_destinations", JSON.stringify(selectedDests));
        if (typeof window !== "undefined") {
            window.location.href = "/dashboard";
        }
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
        <div className="min-h-screen text-[#111111] font-sora flex flex-col justify-between selection:bg-black selection:text-white bg-white relative overflow-x-hidden w-full max-w-full">
            <style dangerouslySetInnerHTML={{__html: `
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap');
                * {
                    font-family: 'Roboto', 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
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
                        <div className="w-12 h-12 border-4 border-[#1a73e8] border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm font-medium text-[#202124] tracking-wide animate-pulse">
                            {googleLoadingText}
                        </p>
                    </div>
                </div>
            )}
            <header className="w-full px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between font-sans gap-4 border-b border-[#dadce0] bg-white md:min-h-[100px] relative">
                <div className="order-1 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-10">
                    <a href="/">
                        <img src="/logo.png" alt="VisaFormula" className="h-14 md:h-20 w-auto object-contain mx-auto" />
                    </a>
                </div>

                <div className="order-2 w-full md:w-auto flex justify-between md:justify-start items-center gap-4">
                    <a href="/" className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#dadce0] bg-white text-xs font-medium text-[#3c4043] hover:bg-slate-50 transition-all shrink-0">
                        <span className="text-sm font-medium">&larr;</span>
                        <span>Back to Home</span>
                    </a>
                    
                    <div className="text-xs font-normal text-[#5f6368] shrink-0 md:hidden">
                        Already a member? <a href="/login" className="text-[#1a73e8] font-medium hover:underline">Login</a>
                    </div>
                </div>

                <div className="hidden md:block text-sm font-normal text-[#5f6368] shrink-0 order-3">
                    Already a member? <a href="/login" className="text-[#1a73e8] font-medium hover:underline">Login</a>
                </div>
            </header>

            <div className="flex-grow flex flex-col justify-start pt-8 pb-20 px-4 sm:px-6 max-w-2xl w-full mx-auto">
                <div className="text-center my-6">
                    <h1 className="text-2xl sm:text-3xl font-normal text-[#202124] tracking-tight mb-1.5">Create your Seeker Account</h1>
                    <p className="text-sm text-[#5f6368] font-normal">Connect with top verified immigration experts worldwide</p>
                </div>

                <div className="w-full mx-auto transition-all duration-300 font-sans mt-2 bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8 shadow-xs">
                    {/* Account Details Form */}
                    <form onSubmit={async (e) => {
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

                        if (!countryOfCitizenship) {
                            setValidationError("Please select your country of citizenship (passport country).");
                            return;
                        }

                        if (!residentOf) {
                            setValidationError("Please select your current country of residence.");
                            return;
                        }

                        const isDiffCountry = countryOfCitizenship && residentOf && countryOfCitizenship.toLowerCase().trim() !== residentOf.toLowerCase().trim();
                        if (isDiffCountry && !currentVisaStatus) {
                            setValidationError(`Please select your current visa status in ${residentOf}.`);
                            return;
                        }

                        if (!addressArea.trim() || !addressCity.trim() || !addressState.trim() || !addressZip.trim()) {
                            setValidationError("Please fill out all address fields (Area, City/District, State, and PIN Code).");
                            return;
                        }

                        setValidationError("");
                        if (!emailVerified) {
                            setShowOtpModal(true);
                            setModalError("");
                            await handleSendVerificationCode();
                            return;
                        }
                        handleFinalSubmit();
                    }} className="space-y-4">
                        <div className="flex flex-col items-center gap-3 mb-6">
                            <button
                                type="button"
                                onClick={handleGoogleSignup}
                                className="w-full max-w-[280px] h-11 border border-[#dadce0] bg-white hover:bg-slate-50 transition-all text-[#3c4043] font-medium text-xs rounded-lg flex items-center justify-center gap-2.5 shadow-xs hover:border-slate-400 active:scale-98 duration-150 shrink-0 cursor-pointer"
                            >
                                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                                </svg>
                                <span>Sign up with Google</span>
                            </button>

                            <div className="flex items-center justify-center gap-3 w-full max-w-[280px] my-1">
                                <div className="h-[1px] bg-[#dadce0] flex-grow" />
                                <span className="text-[10px] font-medium text-[#5f6368] uppercase tracking-widest">— OR —</span>
                                <div className="h-[1px] bg-[#dadce0] flex-grow" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <label className="text-[13px] font-medium text-[#3c4043] block mb-1">First name *</label>
                                <input 
                                    type="text" 
                                    required
                                    value={firstName} 
                                    onChange={(e) => setFirstName(e.target.value)} 
                                    placeholder="First name" 
                                    className="w-full px-3.5 py-3 bg-white border border-[#dadce0] rounded-lg text-[14px] text-[#202124] placeholder:text-[#80868b] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 transition-all duration-150 shadow-2xs"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="text-[13px] font-medium text-[#3c4043] block mb-1">Last name *</label>
                                <input 
                                    type="text" 
                                    required
                                    value={lastName} 
                                    onChange={(e) => setLastName(e.target.value)} 
                                    placeholder="Last name" 
                                    className="w-full px-3.5 py-3 bg-white border border-[#dadce0] rounded-lg text-[14px] text-[#202124] placeholder:text-[#80868b] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 transition-all duration-150 shadow-2xs"
                                />
                            </div>

                            <div className="col-span-2 space-y-1">
                                 <label className="text-[13px] font-medium text-[#3c4043] block mb-1">Email address *</label>
                                 <div className="relative w-full">
                                     <input 
                                         type="email"
                                         placeholder="name@example.com"
                                         required
                                         value={email}
                                         onChange={(e) => {
                                             setEmail(e.target.value);
                                             setEmailVerified(false);
                                             setEmailErrorMsg("");
                                         }}
                                         className="w-full px-3.5 py-3 bg-white border border-[#dadce0] rounded-lg text-[14px] text-[#202124] placeholder:text-[#80868b] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 transition-all duration-150 shadow-2xs pr-10"
                                     />
                                     {emailVerified && (
                                         <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center bg-emerald-50 border border-emerald-250 p-1.5 rounded-full animate-premium-fade shadow-sm">
                                             <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                             </svg>
                                         </span>
                                     )}
                                 </div>
                                 {emailErrorMsg && (
                                     <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-center justify-between gap-3 mt-2 w-full animate-premium-fade shadow-sm">
                                         <div className="flex items-center gap-2">
                                             <span className="text-amber-600 font-bold">⚠️</span>
                                             <span>{emailErrorMsg}</span>
                                         </div>
                                         <a href="/login" className="px-3 py-1.5 bg-[#1a73e8] text-white rounded-lg text-xs font-medium shrink-0 hover:bg-[#1557b0] transition-colors shadow-xs">
                                             Log In &rarr;
                                         </a>
                                     </div>
                                 )}
                                 {validationError && !emailErrorMsg && (
                                    <p className="text-xs text-red-600 font-medium mt-1">{validationError}</p>
                                )}
                             </div>

                            {/* Connected Passwords Area */}
                            <div className="col-span-2 space-y-3 pt-1">
                                <div className="flex justify-between items-center">
                                    <label className="text-[13px] font-medium text-[#3c4043] block">Password *</label>
                                    {password && confirmPassword && (
                                        <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
                                            password === confirmPassword ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                                        }`}>
                                            {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                                        </span>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="relative">
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            required
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)} 
                                            placeholder="Password" 
                                            className="w-full px-3.5 py-3 bg-white border border-[#dadce0] rounded-lg text-[14px] text-[#202124] placeholder:text-[#80868b] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 transition-all duration-150 shadow-2xs pr-10"
                                        />
                                        <button 
                                            type="button" 
                                            onClick={() => setShowPassword(!showPassword)} 
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>

                                    <div className="relative">
                                        <input 
                                            type={showConfirmPassword ? "text" : "password"} 
                                            required
                                            value={confirmPassword} 
                                            onChange={(e) => setConfirmPassword(e.target.value)} 
                                            placeholder="Confirm" 
                                            className="w-full px-3.5 py-3 bg-white border border-[#dadce0] rounded-lg text-[14px] text-[#202124] placeholder:text-[#80868b] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 transition-all duration-150 shadow-2xs pr-10"
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
                                <span className="text-[11px] text-[#5f6368] block font-normal leading-normal">Use 8 or more characters with a mix of letters, numbers & symbols</span>
                            </div>

                            <div className="col-span-2 space-y-1 pt-1">
                                <label className="text-[13px] font-medium text-[#3c4043] block">Country of Citizenship (Passport Country) *</label>
                                 <div className="relative">
                                     <button
                                         type="button"
                                         onClick={() => { setCitizenshipOpen(!citizenshipOpen); setResidenceOpen(false); }}
                                         className="w-full px-3.5 py-3 bg-white border border-[#dadce0] rounded-lg text-[14px] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 text-[#202124] shadow-2xs text-left flex justify-between items-center cursor-pointer font-normal h-[46px]"
                                     >
                                         <span>{countryOfCitizenship || "Select passport country"}</span>
                                         <svg className="fill-current h-4 w-4 text-[#5f6368]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                     </button>
                                     {citizenshipOpen && (
                                         <div className="absolute z-50 w-full mt-1 bg-white border border-[#dadce0] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                             {["India", "Nigeria", "Philippines", "Brazil", "Pakistan", "Bangladesh", "United States", "United Kingdom", "Canada", "Australia", "Other"].map(opt => (
                                                 <div
                                                     key={opt}
                                                     onClick={() => { setCountryOfCitizenship(opt); setCitizenshipOpen(false); }}
                                                     className="px-4 py-2.5 text-[14px] text-[#202124] hover:bg-slate-100 cursor-pointer transition-colors"
                                                 >
                                                     {opt}
                                                 </div>
                                             ))}
                                         </div>
                                     )}
                                 </div>
                             </div>

                             <div className="space-y-1 col-span-2 lg:col-span-1">
                                 <label className="text-[13px] font-medium text-[#3c4043] block">Current Residence *</label>
                                 <div className="relative">
                                     <button
                                         type="button"
                                         onClick={() => { setResidenceOpen(!residenceOpen); setCitizenshipOpen(false); }}
                                         className="w-full px-3.5 py-3 bg-white border border-[#dadce0] rounded-lg text-[14px] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 text-[#202124] shadow-2xs text-left flex justify-between items-center cursor-pointer font-normal h-[46px]"
                                     >
                                         <span>{residentOf || "Select current residence"}</span>
                                         <svg className="fill-current h-4 w-4 text-[#5f6368]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                     </button>
                                     {residenceOpen && (
                                         <div className="absolute z-50 w-full mt-1 bg-white border border-[#dadce0] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                             {["India", "Nigeria", "Philippines", "Brazil", "Pakistan", "Bangladesh", "United States", "United Kingdom", "Canada", "Australia", "Singapore", "United Arab Emirates", "Germany", "France", "Other"].map(opt => (
                                                 <div
                                                     key={opt}
                                                     onClick={() => { setResidentOf(opt); setResidenceOpen(false); }}
                                                     className="px-4 py-2.5 text-[14px] text-[#202124] hover:bg-slate-100 cursor-pointer transition-colors"
                                                 >
                                                     {opt}
                                                 </div>
                                             ))}
                                         </div>
                                     )}
                                 </div>
                             </div>

                             <div className="space-y-1 col-span-2 lg:col-span-1">
                                 <label className="text-[13px] font-medium text-[#3c4043] block">Phone Number *</label>
                                 <div className="flex gap-2.5">
                                     <div className="relative" onClick={(e) => e.stopPropagation()}>
                                         <button
                                             type="button"
                                             onClick={() => setCountryCodeOpen(!countryCodeOpen)}
                                             className="px-3 py-3 bg-white border border-[#dadce0] rounded-lg text-[14px] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 text-[#202124] shadow-2xs shrink-0 cursor-pointer flex items-center justify-between gap-1 h-[46px] font-medium"
                                         >
                                             <span>{countryCode}</span>
                                             <svg className={`w-3.5 h-3.5 text-[#5f6368] transition-transform ${countryCodeOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                                         </button>
                                         {countryCodeOpen && (
                                             <div className="absolute left-0 mt-1.5 w-40 bg-white border border-[#dadce0] rounded-lg shadow-lg max-h-60 overflow-y-auto z-[60]">
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
                                                         className="w-full text-left px-3.5 py-2 text-xs font-medium text-[#202124] hover:bg-slate-100 transition-colors"
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
                                         className="w-full px-3.5 py-3 bg-white border border-[#dadce0] rounded-lg text-[14px] text-[#202124] placeholder:text-[#80868b] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 transition-all duration-150 shadow-2xs" 
                                     />
                                 </div>
                             </div>

                              {/* Conditional Current Visa Status if Passport Country != Residence Country */}
                              {countryOfCitizenship && residentOf && countryOfCitizenship.toLowerCase().trim() !== residentOf.toLowerCase().trim() && (
                                  <div className="col-span-2 space-y-1 animate-premium-fade">
                                      <label className="text-[13px] font-medium text-[#3c4043] block">
                                          Current Visa Status in {residentOf} *
                                      </label>
                                      <div className="relative">
                                          <button
                                              type="button"
                                              onClick={() => {
                                                  setCurrentVisaStatusOpen(!currentVisaStatusOpen);
                                                  setCitizenshipOpen(false);
                                                  setResidenceOpen(false);
                                              }}
                                              className="w-full px-3.5 py-3 bg-white border border-[#dadce0] rounded-lg text-[14px] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 text-[#202124] text-left flex justify-between items-center cursor-pointer font-normal h-[46px]"
                                          >
                                              <span>{currentVisaStatus || `Select visa status in ${residentOf}`}</span>
                                              <svg className={`fill-current h-4 w-4 text-[#5f6368] transition-transform ${currentVisaStatusOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                          </button>
                                          {currentVisaStatusOpen && (
                                              <div className="absolute z-50 w-full mt-1 bg-white border border-[#dadce0] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                                  {[
                                                      "Student Visa",
                                                      "Work Permit / Work Visa",
                                                      "Tourist / Short-Term Visitor",
                                                      "Permanent Resident (PR)",
                                                      "Business Visa",
                                                      "Dependent / Spouse Visa",
                                                      "Temporary Resident",
                                                      "Other"
                                                  ].map((opt) => (
                                                      <div
                                                          key={opt}
                                                          onClick={() => {
                                                              setCurrentVisaStatus(opt);
                                                              setCurrentVisaStatusOpen(false);
                                                          }}
                                                          className="px-4 py-2.5 text-[14px] text-[#202124] hover:bg-slate-100 cursor-pointer transition-colors"
                                                      >
                                                          {opt}
                                                      </div>
                                                  ))}
                                              </div>
                                          )}
                                      </div>
                                  </div>
                              )}

                              {/* Residential Address Details (Area, City, State, Pin Code) */}
                              <div className="col-span-2 space-y-3 pt-3 border-t border-[#dadce0]">
                                  <label className="text-[12px] font-medium text-[#5f6368] uppercase tracking-wider block">Residential Address *</label>
                                  
                                  {/* Area / Locality / Street Address */}
                                  <div className="space-y-1">
                                      <input 
                                          type="text" 
                                          required
                                          value={addressArea} 
                                          onChange={(e) => setAddressArea(e.target.value)} 
                                          placeholder="Street address / Locality *" 
                                          className="w-full px-3.5 py-3 bg-white border border-[#dadce0] rounded-lg text-[14px] text-[#202124] placeholder:text-[#80868b] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 transition-all duration-150 shadow-2xs"
                                      />
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                      {/* City / District */}
                                      <div>
                                          <input 
                                              type="text" 
                                              required
                                              value={addressCity} 
                                              onChange={(e) => setAddressCity(e.target.value)} 
                                              placeholder="City / District *" 
                                              className="w-full px-3.5 py-3 bg-white border border-[#dadce0] rounded-lg text-[14px] text-[#202124] placeholder:text-[#80868b] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 transition-all duration-150 shadow-2xs"
                                          />
                                      </div>

                                      {/* State / Province */}
                                      <div>
                                          <input 
                                              type="text" 
                                              required
                                              value={addressState} 
                                              onChange={(e) => setAddressState(e.target.value)} 
                                              placeholder="State / Province *" 
                                              className="w-full px-3.5 py-3 bg-white border border-[#dadce0] rounded-lg text-[14px] text-[#202124] placeholder:text-[#80868b] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 transition-all duration-150 shadow-2xs"
                                          />
                                      </div>
                                  </div>

                                  {/* PIN Code / ZIP Code */}
                                  <div className="space-y-1">
                                      <input 
                                          type="text" 
                                          required
                                          value={addressZip} 
                                          onChange={(e) => setAddressZip(e.target.value)} 
                                          placeholder="ZIP / Postal code *" 
                                          className="w-full px-3.5 py-3 bg-white border border-[#dadce0] rounded-lg text-[14px] text-[#202124] placeholder:text-[#80868b] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 transition-all duration-150 shadow-2xs"
                                      />
                                  </div>
                              </div>
                         </div>

                         {validationError && (
                             <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium text-center transition-all animate-premium-fade max-w-lg mx-auto mt-4">
                                 {validationError}
                             </div>
                         )}
                         <div className="pt-6 flex justify-end">
                              <button 
                                  type="submit"
                                  className="bg-[#1a73e8] hover:bg-[#1557b0] text-white px-8 py-3 rounded-lg text-[14px] font-medium tracking-wide transition-all shadow-sm active:scale-98 cursor-pointer flex items-center gap-2"
                              >
                                  <span>Submit & Create Account</span>
                              </button>
                          </div>              
                    </form>
                </div>
            </div>

            {/* Email Verification Modal Pop-Up (Matching Image 2) */}
            {showOtpModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-premium-fade font-sans">
                    <div className="bg-white rounded-3xl border border-slate-150 shadow-2xl p-5 sm:p-8 max-w-[420px] w-full relative space-y-5 sm:space-y-6 max-h-[95vh] overflow-y-auto">
                        <button
                            type="button"
                            onClick={() => setShowOtpModal(false)}
                            className="absolute top-4 right-4 sm:top-5 sm:right-5 text-slate-400 hover:text-black p-1.5 rounded-full hover:bg-slate-100 transition-all cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="text-center space-y-2 pt-1 sm:pt-2">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100/90 border border-slate-200/80 rounded-full flex items-center justify-center mx-auto shadow-xs mb-2 sm:mb-3">
                                <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-slate-900" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Check your email</h2>
                            <p className="text-xs sm:text-sm font-medium text-slate-500">
                                Enter the verification code sent to
                            </p>
                            {!isEditingEmail ? (
                                <div className="flex items-center justify-center gap-2 bg-slate-100/90 border border-slate-200/90 py-2 px-3 sm:px-4 rounded-xl shadow-inner max-w-xs mx-auto">
                                    <span className="text-xs sm:text-sm font-bold text-slate-900 break-all">{email}</span>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditingEmail(true)}
                                        className="text-xs text-[#2563eb] font-bold hover:underline shrink-0 flex items-center gap-1 cursor-pointer pl-1"
                                    >
                                        <span>Edit</span>
                                        <Pencil className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2 max-w-xs mx-auto animate-premium-fade">
                                    <div className="flex gap-2">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                setEmailErrorMsg("");
                                                setModalError("");
                                            }}
                                            className="w-full px-3 py-2 bg-white border-2 border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black"
                                            placeholder="Enter new email address"
                                        />
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                if (!email || !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
                                                    setModalError("Please enter a valid email address.");
                                                    return;
                                                }
                                                setIsEditingEmail(false);
                                                setOtpDigits(Array(6).fill(""));
                                                setOtpInput("");
                                                setOtpSent(false);
                                                await handleSendVerificationCode();
                                            }}
                                            className="bg-black text-white text-xs font-bold px-3.5 py-2 rounded-xl shrink-0 hover:bg-neutral-800 cursor-pointer shadow-sm"
                                        >
                                            Save & Resend
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 6 Individual Digit Inputs with Black Accent */}
                        <div className="space-y-4 sm:space-y-5 pt-1">
                            <div className="flex justify-center gap-1.5 sm:gap-2.5 md:gap-3 my-1 sm:my-2 w-full">
                                {otpDigits.map((digit, idx) => (
                                    <input
                                        key={idx}
                                        id={`otp-box-${idx}`}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleDigitChange(e.target.value, idx)}
                                        onKeyDown={(e) => handleDigitKeyDown(e, idx)}
                                        onPaste={idx === 0 ? handleDigitPaste : undefined}
                                        className={`w-9 h-11 sm:w-11 sm:h-13 md:w-12 md:h-14 border-2 rounded-xl text-center text-lg sm:text-xl font-bold text-slate-900 outline-none transition-all shadow-xs shrink-0 ${
                                            digit ? "border-black bg-slate-50" : "border-slate-300 focus:border-black"
                                        }`}
                                    />
                                ))}
                            </div>

                            <div className="text-center text-sm font-medium text-slate-500">
                                Didn't get a code?{" "}
                                <button
                                    type="button"
                                    onClick={handleSendVerificationCode}
                                    disabled={sendingCode || resendCooldown > 0}
                                    className="text-black font-bold underline underline-offset-2 hover:text-slate-700 disabled:opacity-50 cursor-pointer"
                                >
                                    resend{resendCooldown > 0 ? ` (${resendCooldown}s)` : ""}
                                </button>
                            </div>

                            {modalError && (
                                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold text-center animate-premium-fade">
                                    {modalError}
                                </div>
                            )}

                            <button
                                type="button"
                                disabled={verifyingCode || otpDigits.join("").length < 6}
                                onClick={async () => {
                                    setModalError("");
                                    const codeStr = otpDigits.join("");
                                    const ok = await handleVerifyCode(codeStr);
                                    if (ok) {
                                        setShowOtpModal(false);
                                        handleFinalSubmit();
                                    } else {
                                        setModalError("Invalid or expired verification code. Please try again.");
                                    }
                                }}
                                className={`w-full font-bold py-4 rounded-xl text-base transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${
                                    otpDigits.join("").trim().length === 6
                                        ? "bg-slate-900 hover:bg-black text-white shadow-xl shadow-slate-900/20 scale-[1.01] cursor-pointer"
                                        : "bg-slate-200 border border-slate-300 text-slate-400 cursor-not-allowed shadow-none"
                                }`}
                            >
                                {verifyingCode ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Verifying...</span>
                                    </>
                                ) : (
                                    <span>Verify email</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
