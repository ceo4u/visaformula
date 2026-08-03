import React, { useState } from "react";
import { 
    Search, MapPin, GraduationCap, Briefcase, Plane, Home as HomeIcon, 
    BookOpen, MessageSquare, CreditCard, User, Bell, ArrowRight, Bookmark, 
    CheckCircle2, Star, Sparkles, Filter, ChevronDown, Phone, ShieldCheck 
} from "lucide-react";
import { AuthModalPortalContent } from "../interactive/AuthModalPortal";

export function MobileNativeAppUI() {
    const [activeNavTab, setActiveNavTab] = useState<"home" | "applications" | "messages" | "bookmarks" | "profile">("home");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [bookmarkedAgencies, setBookmarkedAgencies] = useState<string[]>([]);

    const toggleBookmark = (agencyId: string) => {
        setBookmarkedAgencies(prev => 
            prev.includes(agencyId) ? prev.filter(id => id !== agencyId) : [...prev, agencyId]
        );
    };

    const handleContactClick = (agencyName: string) => {
        const text = encodeURIComponent(`Hi ${agencyName}, I found your agency on VisaFormula and would like to consult regarding my visa application.`);
        window.open(`https://wa.me/917661989366?text=${text}`, "_blank");
    };

    return (
        <div className="w-full bg-[#f8fafc] text-slate-900 font-sans min-h-screen pb-20 select-none">
            
            {/* ========================================================================= */}
            {/* 1. TOP APP BAR (HEADER WITH LOGO, NOTIFICATIONS & PROFILE) */}
            {/* ========================================================================= */}
            <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between shadow-2xs">
                <a href="/" className="flex items-center gap-2">
                    <img src="/logo.png" alt="VisaFormula" className="h-8 sm:h-9 w-auto object-contain" />
                </a>

                <div className="flex items-center gap-3">
                    {/* Notification Bell Button with Badge Counter 3 */}
                    <button 
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative w-9.5 h-9.5 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
                    >
                        <Bell className="w-4.5 h-4.5 text-slate-700" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-extrabold text-[9.5px] flex items-center justify-center border-2 border-white shadow-2xs">
                            3
                        </span>
                    </button>

                    {/* Profile Avatar Button */}
                    <button 
                        onClick={() => setShowAuthModal(true)}
                        className="w-9.5 h-9.5 rounded-full overflow-hidden border-2 border-blue-500/80 shadow-2xs cursor-pointer active:scale-95 transition-transform"
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" 
                            alt="User Profile" 
                            className="w-full h-full object-cover" 
                        />
                    </button>
                </div>
            </header>

            {/* Notification Dropdown Drawer */}
            {showNotifications && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-start justify-center p-4">
                    <div className="bg-white rounded-3xl p-5 w-full max-w-sm shadow-2xl space-y-3 mt-14 border border-slate-200 animate-fade-up">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <h3 className="text-sm font-extrabold text-slate-900">Notifications</h3>
                            <button onClick={() => setShowNotifications(false)} className="text-xs font-bold text-slate-400 hover:text-slate-600">Close</button>
                        </div>
                        <div className="space-y-2 text-xs">
                            <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-2.5">
                                <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-slate-900">Welcome to VisaFormula!</p>
                                    <p className="text-[11px] text-slate-600">Explore 150+ country visa guides & verified immigration experts.</p>
                                </div>
                            </div>
                            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-slate-900">Verified Agencies Available</p>
                                    <p className="text-[11px] text-slate-600">Connect with Y-Axis, Kaplan & top migration law firms.</p>
                                </div>
                            </div>
                            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-2.5">
                                <CreditCard className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-slate-900">Escrow Protected Payments</p>
                                    <p className="text-[11px] text-slate-600">Your funds stay 100% safe until visa milestones are delivered.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================================= */}
            {/* 2. SEARCH BAR WITH LOCATION PIN */}
            {/* ========================================================================= */}
            <div className="px-4 pt-3.5 pb-2.5">
                <div className="relative flex items-center bg-white border border-slate-200/90 rounded-2xl px-3.5 py-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search country, city, visas, services..." 
                        className="text-xs font-semibold text-slate-900 placeholder:text-slate-400 outline-none w-full bg-transparent"
                    />
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 ml-2 cursor-pointer hover:text-blue-600 transition-colors" />
                </div>
            </div>

            {/* ========================================================================= */}
            {/* 3. HORIZONTAL CATEGORY FILTER PILLS BAR */}
            {/* ========================================================================= */}
            <div className="px-4 pb-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
                <button 
                    onClick={() => setSelectedCategory("student")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                        selectedCategory === "student"
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                            : "bg-white text-slate-800 border-slate-200/90 shadow-2xs hover:bg-slate-50"
                    }`}
                >
                    <span>🎓 Student Visa</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                </button>

                <button 
                    onClick={() => setSelectedCategory("work")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                        selectedCategory === "work"
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                            : "bg-white text-slate-800 border-slate-200/90 shadow-2xs hover:bg-slate-50"
                    }`}
                >
                    <span>💼 Job Visas</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                </button>

                <button 
                    onClick={() => setSelectedCategory("visit")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                        selectedCategory === "visit"
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                            : "bg-white text-slate-800 border-slate-200/90 shadow-2xs hover:bg-slate-50"
                    }`}
                >
                    <span>✈️ Visit Visas</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                </button>

                <button 
                    onClick={() => setSelectedCategory("all")}
                    className="p-2 bg-white text-slate-700 border border-slate-200/90 rounded-xl shrink-0 shadow-2xs flex items-center justify-center hover:bg-slate-50"
                >
                    <Filter className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* ========================================================================= */}
            {/* 4. 2-COLUMN SERVICE CATEGORY CARDS GRID (8 CARDS) */}
            {/* ========================================================================= */}
            <div className="px-4 grid grid-cols-2 gap-3 pb-6">
                
                {/* Card 1: Student Visa */}
                <a 
                    href="/services/apply-visa?type=student" 
                    className="bg-white rounded-2xl border border-slate-200/70 p-3.5 text-center flex flex-col items-center justify-between space-y-2 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-all active:scale-[0.98]"
                >
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-2xs">
                        <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xs font-extrabold text-slate-900 leading-tight">Student Visa</h3>
                        <p className="text-[10px] font-semibold text-slate-500 mt-0.5">Study abroad made easy</p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200/60 mt-1">
                        <ArrowRight className="w-3 h-3" />
                    </div>
                </a>

                {/* Card 2: Work Permit */}
                <a 
                    href="/services/apply-visa?type=work" 
                    className="bg-white rounded-2xl border border-slate-200/70 p-3.5 text-center flex flex-col items-center justify-between space-y-2 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-all active:scale-[0.98]"
                >
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-2xs">
                        <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xs font-extrabold text-slate-900 leading-tight">Work Permit</h3>
                        <p className="text-[10px] font-semibold text-slate-500 mt-0.5">Explore global opportunities</p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200/60 mt-1">
                        <ArrowRight className="w-3 h-3" />
                    </div>
                </a>

                {/* Card 3: Visit + Holiday */}
                <a 
                    href="/services/apply-visa?type=tourist" 
                    className="bg-white rounded-2xl border border-slate-200/70 p-3.5 text-center flex flex-col items-center justify-between space-y-2 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-all active:scale-[0.98]"
                >
                    <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shadow-2xs">
                        <Plane className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xs font-extrabold text-slate-900 leading-tight">Visit + Holiday</h3>
                        <p className="text-[10px] font-semibold text-slate-500 mt-0.5">Travel the world with ease</p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200/60 mt-1">
                        <ArrowRight className="w-3 h-3" />
                    </div>
                </a>

                {/* Card 4: PR / Residency */}
                <a 
                    href="/services/apply-visa?type=pr" 
                    className="bg-white rounded-2xl border border-slate-200/70 p-3.5 text-center flex flex-col items-center justify-between space-y-2 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-all active:scale-[0.98]"
                >
                    <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shadow-2xs">
                        <HomeIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xs font-extrabold text-slate-900 leading-tight">PR / Residency</h3>
                        <p className="text-[10px] font-semibold text-slate-500 mt-0.5">Settle abroad permanently</p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200/60 mt-1">
                        <ArrowRight className="w-3 h-3" />
                    </div>
                </a>

                {/* Card 5: IELTS Training */}
                <a 
                    href="/services/ielts-prep" 
                    className="bg-white rounded-2xl border border-slate-200/70 p-3.5 text-center flex flex-col items-center justify-between space-y-2 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-all active:scale-[0.98]"
                >
                    <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 shadow-2xs">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xs font-extrabold text-slate-900 leading-tight">IELTS Training</h3>
                        <p className="text-[10px] font-semibold text-slate-500 mt-0.5">Prepare with top trainers</p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200/60 mt-1">
                        <ArrowRight className="w-3 h-3" />
                    </div>
                </a>

                {/* Card 6: Language */}
                <a 
                    href="/services/language-training" 
                    className="bg-white rounded-2xl border border-slate-200/70 p-3.5 text-center flex flex-col items-center justify-between space-y-2 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-all active:scale-[0.98]"
                >
                    <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 shadow-2xs">
                        <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xs font-extrabold text-slate-900 leading-tight">Language</h3>
                        <p className="text-[10px] font-semibold text-slate-500 mt-0.5">Learn new languages</p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-200/60 mt-1">
                        <ArrowRight className="w-3 h-3" />
                    </div>
                </a>

                {/* Card 7: Finance & Loans */}
                <a 
                    href="/services/financial-proof" 
                    className="bg-white rounded-2xl border border-slate-200/70 p-3.5 text-center flex flex-col items-center justify-between space-y-2 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-all active:scale-[0.98]"
                >
                    <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shadow-2xs">
                        <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xs font-extrabold text-slate-900 leading-tight">Finance & Loans</h3>
                        <p className="text-[10px] font-semibold text-slate-500 mt-0.5">Secure funding for your dreams</p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200/60 mt-1">
                        <ArrowRight className="w-3 h-3" />
                    </div>
                </a>

                {/* Card 8: Local Expert */}
                <a 
                    href="/find-experts" 
                    className="bg-white rounded-2xl border border-slate-200/70 p-3.5 text-center flex flex-col items-center justify-between space-y-2 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-all active:scale-[0.98]"
                >
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-2xs">
                        <User className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xs font-extrabold text-slate-900 leading-tight">Local Expert</h3>
                        <p className="text-[10px] font-semibold text-slate-500 mt-0.5">Connect with verified experts</p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200/60 mt-1">
                        <ArrowRight className="w-3 h-3" />
                    </div>
                </a>

            </div>

            {/* ========================================================================= */}
            {/* 5. FEATURED DEALS & SPONSORED ADS (HORIZONTAL SCROLL) */}
            {/* ========================================================================= */}
            <div className="pb-6">
                <div className="flex items-center justify-between px-4 pb-3">
                    <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
                        Featured Deals & Sponsored Ads
                    </h2>
                    <a href="/services/apply-visa" className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                        View all <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                </div>

                <div className="px-4 flex gap-3.5 overflow-x-auto no-scrollbar pb-2">
                    
                    {/* Deal 1: Australia Student Visa Package */}
                    <div className="relative w-[250px] shrink-0 bg-slate-950 rounded-2xl p-4 text-white overflow-hidden shadow-lg flex flex-col justify-between min-h-[180px]">
                        <img 
                            src="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400&auto=format&fit=crop&q=80" 
                            alt="Australia Opera House" 
                            className="absolute inset-0 w-full h-full object-cover opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />

                        <div className="relative z-10">
                            <span className="bg-rose-500/90 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full w-fit mb-1.5 flex items-center gap-1 shadow-2xs">
                                🔥 Hot Deal
                            </span>
                            <h3 className="text-sm font-extrabold text-white leading-snug drop-shadow-sm">
                                Australia Student Visa Package
                            </h3>
                            <p className="text-[10px] text-slate-300 font-semibold mt-0.5">
                                Visa + SOP + Documentation
                            </p>
                        </div>

                        <div className="relative z-10 pt-3">
                            <div className="flex items-center gap-1 text-[10px] font-bold text-amber-300 mb-1">
                                <span>⭐⭐⭐⭐⭐</span>
                                <span className="text-white">4.9 (128)</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-base font-extrabold text-white">₹24,999</span>
                                    <span className="text-[10px] text-slate-400 line-through ml-1.5">₹29,999</span>
                                </div>
                                <button 
                                    onClick={() => handleContactClick("Australia Student Visa Package")}
                                    className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-md active:scale-95 cursor-pointer"
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Deal 2: Canada PR Express Entry */}
                    <div className="relative w-[250px] shrink-0 bg-slate-950 rounded-2xl p-4 text-white overflow-hidden shadow-lg flex flex-col justify-between min-h-[180px]">
                        <img 
                            src="https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400&auto=format&fit=crop&q=80" 
                            alt="Canada CN Tower" 
                            className="absolute inset-0 w-full h-full object-cover opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />

                        <div className="relative z-10">
                            <span className="bg-amber-500/90 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full w-fit mb-1.5 flex items-center gap-1 shadow-2xs">
                                ⚡ Limited Time
                            </span>
                            <h3 className="text-sm font-extrabold text-white leading-snug drop-shadow-sm">
                                Canada PR Express Entry
                            </h3>
                            <p className="text-[10px] text-slate-300 font-semibold mt-0.5">
                                Fast-track your PR process
                            </p>
                        </div>

                        <div className="relative z-10 pt-3">
                            <div className="flex items-center gap-1 text-[10px] font-bold text-amber-300 mb-1">
                                <span>⭐⭐⭐⭐⭐</span>
                                <span className="text-white">4.8 (96)</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-base font-extrabold text-white">₹49,999</span>
                                    <span className="text-[10px] text-slate-400 line-through ml-1.5">₹59,999</span>
                                </div>
                                <button 
                                    onClick={() => handleContactClick("Canada PR Express Entry")}
                                    className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-md active:scale-95 cursor-pointer"
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Deal 3: UK Skilled Worker Visa */}
                    <div className="relative w-[250px] shrink-0 bg-slate-950 rounded-2xl p-4 text-white overflow-hidden shadow-lg flex flex-col justify-between min-h-[180px]">
                        <img 
                            src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&auto=format&fit=crop&q=80" 
                            alt="UK Big Ben" 
                            className="absolute inset-0 w-full h-full object-cover opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />

                        <div className="relative z-10">
                            <span className="bg-rose-600/90 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full w-fit mb-1.5 flex items-center gap-1 shadow-2xs">
                                🎯 Best Value
                            </span>
                            <h3 className="text-sm font-extrabold text-white leading-snug drop-shadow-sm">
                                UK Skilled Worker Visa
                            </h3>
                            <p className="text-[10px] text-slate-300 font-semibold mt-0.5">
                                End-to-end assistance
                            </p>
                        </div>

                        <div className="relative z-10 pt-3">
                            <div className="flex items-center gap-1 text-[10px] font-bold text-amber-300 mb-1">
                                <span>⭐⭐⭐⭐⭐</span>
                                <span className="text-white">4.7 (74)</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-base font-extrabold text-white">₹38,999</span>
                                    <span className="text-[10px] text-slate-400 line-through ml-1.5">₹44,999</span>
                                </div>
                                <button 
                                    onClick={() => handleContactClick("UK Skilled Worker Visa")}
                                    className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-md active:scale-95 cursor-pointer"
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ========================================================================= */}
            {/* 6. TOP VERIFIED IMMIGRATION AGENCIES LIST */}
            {/* ========================================================================= */}
            <div className="px-4 pb-24">
                <div className="flex items-center justify-between pb-3">
                    <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
                        Top Verified Immigration Agencies
                    </h2>
                    <a href="/find-experts" className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                        View all <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                </div>

                <div className="space-y-3">
                    
                    {/* Agency 1: Y-Axis Overseas */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center font-black text-slate-900 shrink-0 text-sm">
                                <span className="text-red-600 font-serif text-lg">Y</span>
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-1">
                                    <h3 className="text-xs font-extrabold text-slate-900 truncate">Y-Axis Overseas</h3>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-600 mt-0.5">
                                    <span className="text-amber-500 font-extrabold">4.9</span>
                                    <span>⭐⭐⭐⭐⭐</span>
                                    <span className="text-slate-400">(2,345 reviews)</span>
                                </div>
                                <p className="text-[10px] font-semibold text-slate-500 truncate mt-0.5">
                                    💼 12+ Years Experience • 50k+ Visas Processed
                                </p>
                                <p className="text-[10px] font-semibold text-slate-400 flex items-center gap-1 mt-0.5">
                                    <MapPin className="w-3 h-3 text-slate-400" /> Mumbai, India
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <button 
                                onClick={() => toggleBookmark("y-axis")}
                                className={`p-2 rounded-xl border transition-colors ${
                                    bookmarkedAgencies.includes("y-axis") 
                                        ? "bg-blue-50 border-blue-200 text-blue-600" 
                                        : "bg-slate-50 border-slate-200/80 text-slate-500 hover:text-slate-700"
                                }`}
                            >
                                <Bookmark className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={() => handleContactClick("Y-Axis Overseas")}
                                className="bg-[#2563eb] hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
                            >
                                Contact
                            </button>
                        </div>
                    </div>

                    {/* Agency 2: Kaplan International */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-black text-white shrink-0 text-sm">
                                <span className="font-sans text-base tracking-widest text-indigo-400">K</span>
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-1">
                                    <h3 className="text-xs font-extrabold text-slate-900 truncate">Kaplan International</h3>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-600 mt-0.5">
                                    <span className="text-amber-500 font-extrabold">4.8</span>
                                    <span>⭐⭐⭐⭐⭐</span>
                                    <span className="text-slate-400">(1,987 reviews)</span>
                                </div>
                                <p className="text-[10px] font-semibold text-slate-500 truncate mt-0.5">
                                    💼 20+ Years Experience • 35k+ Visas Processed
                                </p>
                                <p className="text-[10px] font-semibold text-slate-400 flex items-center gap-1 mt-0.5">
                                    <MapPin className="w-3 h-3 text-slate-400" /> Delhi, India
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <button 
                                onClick={() => toggleBookmark("kaplan")}
                                className={`p-2 rounded-xl border transition-colors ${
                                    bookmarkedAgencies.includes("kaplan") 
                                        ? "bg-blue-50 border-blue-200 text-blue-600" 
                                        : "bg-slate-50 border-slate-200/80 text-slate-500 hover:text-slate-700"
                                }`}
                            >
                                <Bookmark className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={() => handleContactClick("Kaplan International")}
                                className="bg-[#2563eb] hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
                            >
                                Contact
                            </button>
                        </div>
                    </div>

                    {/* Agency 3: Inspiro Immigration */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center font-black text-rose-600 shrink-0 text-xs">
                                ins
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-1">
                                    <h3 className="text-xs font-extrabold text-slate-900 truncate">Inspiro Immigration</h3>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-600 mt-0.5">
                                    <span className="text-amber-500 font-extrabold">4.7</span>
                                    <span>⭐⭐⭐⭐⭐</span>
                                    <span className="text-slate-400">(1,256 reviews)</span>
                                </div>
                                <p className="text-[10px] font-semibold text-slate-500 truncate mt-0.5">
                                    💼 15+ Years Experience • 25k+ Visas Processed
                                </p>
                                <p className="text-[10px] font-semibold text-slate-400 flex items-center gap-1 mt-0.5">
                                    <MapPin className="w-3 h-3 text-slate-400" /> Bangalore, India
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <button 
                                onClick={() => toggleBookmark("inspiro")}
                                className={`p-2 rounded-xl border transition-colors ${
                                    bookmarkedAgencies.includes("inspiro") 
                                        ? "bg-blue-50 border-blue-200 text-blue-600" 
                                        : "bg-slate-50 border-slate-200/80 text-slate-500 hover:text-slate-700"
                                }`}
                            >
                                <Bookmark className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={() => handleContactClick("Inspiro Immigration")}
                                className="bg-[#2563eb] hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
                            >
                                Contact
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* ========================================================================= */}
            {/* 7. FIXED BOTTOM NAVIGATION DOCK (NATIVE MOBILE APP BAR WITH 5 TABS) */}
            {/* ========================================================================= */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 flex items-center justify-around shadow-[0_-4px_25px_rgba(0,0,0,0.06)]">
                
                {/* Tab 1: Home */}
                <button 
                    onClick={() => {
                        setActiveNavTab("home");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
                        activeNavTab === "home" ? "text-blue-600 font-extrabold" : "text-slate-400 font-bold hover:text-slate-600"
                    }`}
                >
                    <HomeIcon className="w-5 h-5" />
                    <span className="text-[10px] mt-0.5">Home</span>
                </button>

                {/* Tab 2: My Applications */}
                <a 
                    href="/dashboard"
                    onClick={() => setActiveNavTab("applications")}
                    className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
                        activeNavTab === "applications" ? "text-blue-600 font-extrabold" : "text-slate-400 font-bold hover:text-slate-600"
                    }`}
                >
                    <BookOpen className="w-5 h-5" />
                    <span className="text-[10px] mt-0.5">My Applications</span>
                </a>

                {/* Tab 3: Messages with Badge 2 */}
                <button 
                    onClick={() => {
                        setActiveNavTab("messages");
                        window.location.href = "/support";
                    }}
                    className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer relative ${
                        activeNavTab === "messages" ? "text-blue-600 font-extrabold" : "text-slate-400 font-bold hover:text-slate-600"
                    }`}
                >
                    <div className="relative">
                        <MessageSquare className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white font-extrabold text-[9px] flex items-center justify-center border border-white">
                            2
                        </span>
                    </div>
                    <span className="text-[10px] mt-0.5">Messages</span>
                </button>

                {/* Tab 4: Bookmarks */}
                <button 
                    onClick={() => {
                        setActiveNavTab("bookmarks");
                        const agencySection = document.querySelector('.space-y-3');
                        if (agencySection) agencySection.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
                        activeNavTab === "bookmarks" ? "text-blue-600 font-extrabold" : "text-slate-400 font-bold hover:text-slate-600"
                    }`}
                >
                    <Bookmark className="w-5 h-5" />
                    <span className="text-[10px] mt-0.5">Bookmarks</span>
                </button>

                {/* Tab 5: Profile */}
                <button 
                    onClick={() => {
                        setActiveNavTab("profile");
                        setShowAuthModal(true);
                    }}
                    className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
                        activeNavTab === "profile" ? "text-blue-600 font-extrabold" : "text-slate-400 font-bold hover:text-slate-600"
                    }`}
                >
                    <User className="w-5 h-5" />
                    <span className="text-[10px] mt-0.5">Profile</span>
                </button>

            </nav>

            {/* Auth Modal Trigger when Profile / Avatar is tapped */}
            {showAuthModal && (
                <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3">
                    <div className="relative w-full max-w-lg">
                        <button 
                            onClick={() => setShowAuthModal(false)}
                            className="absolute top-2 right-2 z-[10000] w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold"
                        >
                            ✕
                        </button>
                        <AuthModalPortalContent defaultTab="signup" onClose={() => setShowAuthModal(false)} />
                    </div>
                </div>
            )}

        </div>
    );
}
