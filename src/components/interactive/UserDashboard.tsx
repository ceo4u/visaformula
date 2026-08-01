import { useState, useEffect } from "react";
import {
    Clock, CheckCircle, Lock, Calendar, BookOpen, Bookmark, AlertTriangle,
    ArrowRight, ArrowLeft, Bell, FileText, Star, Shield, TrendingUp, ChevronRight,
    Search, Plus, LayoutDashboard, MessageSquare, Settings, HelpCircle, Briefcase,
    Video, User, LogOut, CheckSquare, Sparkles, X, ChevronDown, Filter, MapPin, Globe, LayoutGrid
} from "lucide-react";

const destinationsList = ["Canada", "USA", "UK", "Australia", "New Zealand", "Germany", "Ireland", "Singapore", "UAE", "France"];

const initialBookings: any[] = [];
const initialSavedExperts: any[] = [];
const initialNotifications: any[] = [];
const initialScannedDocuments: any[] = [];
const initialPreviousVisas: any[] = [];
const initialDisputes: any[] = [];
const initialEscrowPayments: any[] = [];
const initialVisasProcessing: any[] = [];

export function UserDashboard() {
    const [ieltsScore, setIeltsScore] = useState({ L: 7.5, R: 7.0, W: 6.5, S: 7.0 });
    const overallBand = ((ieltsScore.L + ieltsScore.R + ieltsScore.W + ieltsScore.S) / 4).toFixed(1);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const [firstName, setFirstName] = useState("Seeker");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [passportCountry, setPassportCountry] = useState("India");
    const [countryOfCitizenship, setCountryOfCitizenship] = useState("India");
    const [residentOf, setResidentOf] = useState("India");
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [selectedDests, setSelectedDests] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("dashboard");
    const [timePeriod, setTimePeriod] = useState("Last 30 days");
    const [timePeriodOpen, setTimePeriodOpen] = useState(false);

    const [scannedDocs, setScannedDocs] = useState(initialScannedDocuments);
    const [favouriteExperts, setFavouriteExperts] = useState(initialSavedExperts);
    const [previousVisas, setPreviousVisas] = useState(initialPreviousVisas);
    const [activeDisputes, setActiveDisputes] = useState(initialDisputes);
    const [escrowPaymentsState, setEscrowPaymentsState] = useState(initialEscrowPayments);
    const [visasProcessingState, setVisasProcessingState] = useState(initialVisasProcessing);

    const [documents, setDocuments] = useState([
        { id: 1, label: "Passport Scan Copy", status: "uploaded", icon: "✅", bg: "bg-emerald-50 text-emerald-700 border-emerald-200", studentOnly: false },
        { id: 2, label: "IELTS Official Score Card", status: "pending", icon: "⚠️", bg: "bg-amber-50 text-amber-700 border-amber-200", studentOnly: true },
        { id: 3, label: "Bank Statement (Financials)", status: "missing", icon: "❌", bg: "bg-rose-50 text-rose-700 border-rose-200", studentOnly: false },
        { id: 4, label: "University Offer Letter", status: "uploaded", icon: "✅", bg: "bg-emerald-50 text-emerald-700 border-emerald-200", studentOnly: false },
        { id: 5, label: "Statement of Purpose (SOP)", status: "pending", icon: "⚠️", bg: "bg-amber-50 text-amber-700 border-amber-200", studentOnly: false },
    ]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const userStr = localStorage.getItem("visaformula_user");
            const isLoggedInExpert = localStorage.getItem("expert_isLoggedIn");
            if (isLoggedInExpert === "true") {
                window.location.href = "/consultant/dashboard";
                return;
            }
            if (userStr) {
                try {
                    const u = JSON.parse(userStr);
                    if (u && u.type === "expert") {
                        window.location.href = "/consultant/dashboard";
                        return;
                    }
                } catch(e) {}
            }
        }

        const savedFirst = localStorage.getItem("seeker_firstName");
        if (savedFirst) {
            setFirstName(savedFirst);
            setModalFirstName(savedFirst);
        }
        
        const savedLast = localStorage.getItem("seeker_lastName");
        if (savedLast) {
            setLastName(savedLast);
            setModalLastName(savedLast);
        }

        const savedPhone = localStorage.getItem("seeker_phone");
        if (savedPhone) {
            setPhone(savedPhone);
            const match = savedPhone.match(/^(\+\d+)\s*(.*)$/);
            if (match) {
                setCountryCode(match[1]);
                setModalPhone(match[2]);
            } else {
                setModalPhone(savedPhone);
            }
        }

        const savedEmail = localStorage.getItem("seeker_email");
        if (savedEmail) setEmail(savedEmail);

        const savedCountry = localStorage.getItem("seeker_passportCountry");
        if (savedCountry) {
            setPassportCountry(savedCountry);
            setCountryOfCitizenship(savedCountry);
            setModalPassportCountry(savedCountry);
        }

        const savedCitizenship = localStorage.getItem("seeker_country_of_citizenship");
        if (savedCitizenship) {
            setCountryOfCitizenship(savedCitizenship);
            setModalPassportCountry(savedCitizenship);
        }

        const savedResidence = localStorage.getItem("seeker_resident_of");
        if (savedResidence) {
            setResidentOf(savedResidence);
            setModalResidentOf(savedResidence);
        }

        const savedLookingFor = localStorage.getItem("seeker_looking_for");
        if (savedLookingFor) {
            setModalLookingFor(savedLookingFor);
        }

        try {
            const savedGoals = localStorage.getItem("seeker_goals");
            if (savedGoals) setSelectedGoals(JSON.parse(savedGoals));

            const savedDests = localStorage.getItem("seeker_destinations");
            if (savedDests) setSelectedDests(JSON.parse(savedDests));
        } catch (e) {
            console.error(e);
        }
    }, []);

    const [modalFirstName, setModalFirstName] = useState("");
    const [modalLastName, setModalLastName] = useState("");
    const [modalPhone, setModalPhone] = useState("");
    const [modalPassportCountry, setModalPassportCountry] = useState("");
    const [modalResidentOf, setModalResidentOf] = useState("");
    const [modalLookingFor, setModalLookingFor] = useState("");
    const [countryCode, setCountryCode] = useState("+91");

    const toggleDocStatus = (id: number) => {
        setDocuments(prev => prev.map(d => {
            if (d.id === id) {
                const nextStatus = d.status === "uploaded" ? "pending" : d.status === "pending" ? "missing" : "uploaded";
                const bg = nextStatus === "uploaded" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : nextStatus === "pending" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-rose-50 text-rose-700 border-rose-200";
                return { ...d, status: nextStatus, bg };
            }
            return d;
        }));
    };

    const isStudent = selectedGoals.some(g => g.toLowerCase().includes("study") || g.toLowerCase().includes("university") || g.toLowerCase().includes("student"));
    const visibleDocuments = documents.filter(d => !d.studentOnly || isStudent);
    const uploadedCount = visibleDocuments.filter(d => d.status === "uploaded").length;

    const handleSaveProfileModal = (e: React.FormEvent) => {
        e.preventDefault();
        setFirstName(modalFirstName);
        setLastName(modalLastName);
        setPhone(countryCode + " " + modalPhone);
        setCountryOfCitizenship(modalPassportCountry);
        setResidentOf(modalResidentOf);

        localStorage.setItem("seeker_firstName", modalFirstName);
        localStorage.setItem("seeker_lastName", modalLastName);
        localStorage.setItem("seeker_phone", countryCode + " " + modalPhone);
        localStorage.setItem("seeker_passportCountry", modalPassportCountry);
        localStorage.setItem("seeker_country_of_citizenship", modalPassportCountry);
        localStorage.setItem("seeker_resident_of", modalResidentOf);
        if (modalLookingFor) localStorage.setItem("seeker_looking_for", modalLookingFor);

        setShowProfileModal(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("visaformula_user");
        localStorage.removeItem("seeker_firstName");
        localStorage.removeItem("seeker_lastName");
        localStorage.removeItem("seeker_email");
        localStorage.removeItem("seeker_phone");
        localStorage.removeItem("seeker_passportCountry");
        localStorage.removeItem("seeker_goals");
        localStorage.removeItem("seeker_destinations");
        localStorage.removeItem("seeker_profilePhoto");
        window.location.href = "/";
    };

    // Flup reference sales categories data
    const categoriesData = [
        { label: "Living room / Student Visa", percent: "25%", color: "#8b5cf6" },
        { label: "Kids / Work Permit", percent: "17%", color: "#3b82f6" },
        { label: "Office / Tourist Visa", percent: "13%", color: "#a855f7" },
        { label: "Bedroom / PR & Migration", percent: "12%", color: "#38bdf8" },
        { label: "Kitchen / Consultations", percent: "9%", color: "#ec4899" },
        { label: "Bathroom / SOP Review", percent: "8%", color: "#f43f5e" },
        { label: "Dining room / VFS Booking", percent: "6%", color: "#f97316" },
        { label: "Decor / IELTS Prep", percent: "5%", color: "#eab308" },
        { label: "Lighting / Tour Packages", percent: "3%", color: "#10b981" },
        { label: "Outdoor / Escrow Vault", percent: "2%", color: "#22c55e" },
    ];

    // Flup reference sales by countries data
    const countriesData = [
        { name: "Poland / Canada", percent: "19%" },
        { name: "Austria / USA", percent: "15%" },
        { name: "Spain / UK", percent: "13%" },
        { name: "Romania / Australia", percent: "12%" },
        { name: "France / Germany", percent: "11%" },
        { name: "Italy / New Zealand", percent: "11%" },
        { name: "Germany / Ireland", percent: "10%" },
        { name: "Ukraine / UAE", percent: "9%" },
    ];

    // Flup Dual Bar Chart mock data
    const barChartData = [
        { day: "1 Jul", gross: 27, rev: 37 },
        { day: "2 Jul", gross: 31, rev: 45 },
        { day: "3 Jul", gross: 20, rev: 52 },
        { day: "4 Jul", gross: 33, rev: 43 },
        { day: "5 Jul", gross: 50, rev: 38 },
        { day: "6 Jul", gross: 60, rev: 63, tooltip: true },
        { day: "7 Jul", gross: 22, rev: 34 },
        { day: "8 Jul", gross: 33, rev: 42 },
        { day: "9 Jul", gross: 21, rev: 32 },
        { day: "10 Jul", gross: 45, rev: 47 },
        { day: "11 Jul", gross: 33, rev: 45 },
        { day: "12 Jul", gross: 52, rev: 55 },
    ];

    return (
        <div className="min-h-screen bg-white text-slate-800 font-sans flex overflow-x-hidden antialiased" style={{ fontFamily: "'Roboto', 'Google Sans', system-ui, -apple-system, sans-serif" }}>
            <style dangerouslySetInnerHTML={{__html: `
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Google+Sans:wght@400;500;700&display=swap');
            `}} />
            
            {/* Desktop Flup-Style Left Sidebar Navigation — Pure White Background */}
            <aside className={`hidden lg:flex bg-white border-r border-slate-200/80 flex-col justify-between transition-all duration-300 z-30 shrink-0 select-none ${isSidebarCollapsed ? "w-20" : "w-64"}`}>
                <div>
                    {/* Brand Header — Extra Large Official Logo */}
                    <div className="p-4 border-b border-slate-200/70 flex items-center justify-between bg-white min-h-[76px]">
                        <a href="/" className="flex items-center gap-2 min-w-0">
                            {isSidebarCollapsed ? (
                                <img src="/logo.png" alt="VisaFormula Logo" className="h-10 w-auto object-contain shrink-0" />
                            ) : (
                                <img src="/logo.png" alt="VisaFormula Logo" className="h-13 sm:h-15 lg:h-16 w-auto max-h-[60px] object-contain shrink-0 max-w-[260px]" />
                            )}
                        </a>
                        <button 
                            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors hidden lg:block"
                        >
                            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isSidebarCollapsed ? "" : "rotate-180"}`} />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="p-3 space-y-6">
                        {/* Section 1: CORE */}
                        <div>
                            {!isSidebarCollapsed && (
                                <p className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">
                                    Core Workspace
                                </p>
                            )}
                            <div className="space-y-1">
                                {[
                                    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                                    { id: "cases", label: "Active Cases", icon: Briefcase },
                                    { id: "consultations", label: "Consultations", icon: Calendar },
                                    { id: "scanned-documents", label: "Document Vault", icon: FileText },
                                ].map(item => {
                                    const isActive = activeTab === item.id;
                                    const IconComp = item.icon;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-xs transition-all ${
                                                isActive
                                                    ? "bg-[#e6f4ea] text-[#0d5c3a] shadow-xs"
                                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                            }`}
                                        >
                                            <IconComp className={`w-4 h-4 shrink-0 ${isActive ? "text-[#0d5c3a]" : "text-slate-500"}`} />
                                            {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Section 2: SERVICES & PAYMENTS */}
                        <div>
                            {!isSidebarCollapsed && (
                                <p className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">
                                    Services & Escrow
                                </p>
                            )}
                            <div className="space-y-1">
                                {[
                                    { id: "escrow-milestones", label: "Escrow Vault", icon: Lock },
                                    { id: "visa-history", label: "Visa History", icon: BookOpen },
                                    { id: "favourite-experts", label: "Saved Experts", icon: Bookmark },
                                ].map(item => {
                                    const isActive = activeTab === item.id;
                                    const IconComp = item.icon;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-xs transition-all ${
                                                isActive
                                                    ? "bg-[#e6f4ea] text-[#0d5c3a] shadow-xs"
                                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                            }`}
                                        >
                                            <IconComp className={`w-4 h-4 shrink-0 ${isActive ? "text-[#0d5c3a]" : "text-slate-500"}`} />
                                            {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Section 3: SYSTEM */}
                        <div>
                            {!isSidebarCollapsed && (
                                <p className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">
                                    System
                                </p>
                            )}
                            <div className="space-y-1">
                                <button
                                    onClick={() => setShowProfileModal(true)}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-xs text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
                                >
                                    <Settings className="w-4 h-4 shrink-0 text-slate-500" />
                                    {!isSidebarCollapsed && <span>Profile Settings</span>}
                                </button>

                                <div className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-slate-600">
                                    <div className="flex items-center gap-3">
                                        <Sparkles className="w-4 h-4 shrink-0 text-slate-500" />
                                        {!isSidebarCollapsed && <span>Dark mode</span>}
                                    </div>
                                    {!isSidebarCollapsed && (
                                        <button 
                                            onClick={() => setIsDarkMode(!isDarkMode)} 
                                            className={`w-9 h-5 rounded-full p-0.5 transition-colors ${isDarkMode ? "bg-[#107c41]" : "bg-slate-300"}`}
                                        >
                                            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isDarkMode ? "translate-x-4" : "translate-x-0"}`} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>

                {/* Bottom User Profile Card */}
                <div className="p-3 border-t border-slate-200/70">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/60 shadow-xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-extrabold text-xs shrink-0">
                                {(firstName || "S").charAt(0).toUpperCase()}
                            </div>
                            {!isSidebarCollapsed && (
                                <div className="min-w-0">
                                    <h4 className="text-xs font-extrabold text-slate-900 truncate leading-tight">
                                        {firstName} {lastName}
                                    </h4>
                                    <p className="text-[10px] font-semibold text-slate-500 truncate">
                                        Seeker / Client
                                    </p>
                                </div>
                            )}
                        </div>
                        {!isSidebarCollapsed && (
                            <button onClick={handleLogout} className="text-slate-400 hover:text-rose-600 p-1 transition-colors" title="Log Out">
                                <LogOut className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </aside>

            {/* Mobile Slide-Over Drawer Navigation */}
            <div className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${isMobileSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300" onClick={() => setIsMobileSidebarOpen(false)} />
                <aside className={`absolute top-0 left-0 w-72 h-full bg-white shadow-2xl flex flex-col justify-between p-5 transform transition-transform duration-300 overflow-y-auto ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <img src="/logo.png" alt="VisaFormula Logo" className="h-10 w-auto object-contain" />
                            <button onClick={() => setIsMobileSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <nav className="space-y-4">
                            <div>
                                <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">Core Workspace</p>
                                <div className="space-y-1">
                                    {[
                                        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                                        { id: "cases", label: "Active Cases", icon: Briefcase },
                                        { id: "consultations", label: "Consultations", icon: Calendar },
                                        { id: "scanned-documents", label: "Document Vault", icon: FileText },
                                    ].map(item => {
                                        const isActive = activeTab === item.id;
                                        const IconComp = item.icon;
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => { setActiveTab(item.id); setIsMobileSidebarOpen(false); }}
                                                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                                                    isActive ? "bg-[#e6f4ea] text-[#0d5c3a]" : "text-slate-700 hover:bg-slate-100"
                                                }`}
                                            >
                                                <IconComp className={`w-4 h-4 ${isActive ? "text-[#0d5c3a]" : "text-slate-500"}`} />
                                                <span>{item.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">Services & Escrow</p>
                                <div className="space-y-1">
                                    {[
                                        { id: "escrow-milestones", label: "Escrow Vault", icon: Lock },
                                        { id: "visa-history", label: "Visa History", icon: BookOpen },
                                        { id: "favourite-experts", label: "Saved Experts", icon: Bookmark },
                                    ].map(item => {
                                        const isActive = activeTab === item.id;
                                        const IconComp = item.icon;
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => { setActiveTab(item.id); setIsMobileSidebarOpen(false); }}
                                                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                                                    isActive ? "bg-[#e6f4ea] text-[#0d5c3a]" : "text-slate-700 hover:bg-slate-100"
                                                }`}
                                            >
                                                <IconComp className={`w-4 h-4 ${isActive ? "text-[#0d5c3a]" : "text-slate-500"}`} />
                                                <span>{item.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </nav>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3.5 py-2.5 text-rose-600 hover:bg-rose-50 rounded-xl font-bold text-xs transition-all">
                            <LogOut className="w-4 h-4" />
                            <span>Log Out</span>
                        </button>
                    </div>
                </aside>
            </div>

            {/* Main Workspace Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                
                {/* Top Header Bar */}
                <header className="bg-white border-b border-slate-200/80 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 sticky top-0 z-20 shadow-2xs min-h-[76px]">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <button onClick={() => setIsMobileSidebarOpen(true)} className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors">
                            <LayoutGrid className="w-6 h-6" />
                        </button>
                        <a href="/" className="lg:hidden flex items-center shrink-0">
                            <img src="/logo.png" alt="VisaFormula Logo" className="h-12 sm:h-14 md:h-16 w-auto max-h-[56px] object-contain" />
                        </a>
                        <h1 className="hidden sm:block text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight truncate">
                            Dashboard
                        </h1>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Time Period Filter Pill (Flup Reference) */}
                        <div className="relative">
                            <button 
                                onClick={() => setTimePeriodOpen(!timePeriodOpen)}
                                className="flex items-center gap-1.5 sm:gap-2 bg-slate-50 border border-slate-200/90 hover:border-slate-300 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold text-slate-700 transition-all shadow-2xs"
                            >
                                <span className="truncate max-w-[120px] sm:max-w-none">📅 <strong className="text-slate-900">{timePeriod}</strong></span>
                                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            </button>

                            {timePeriodOpen && (
                                <div className="absolute right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 w-44 z-50">
                                    {["Last 7 days", "Last 30 days", "Last 90 days", "This Year"].map(tp => (
                                        <button
                                            key={tp}
                                            onClick={() => { setTimePeriod(tp); setTimePeriodOpen(false); }}
                                            className={`w-full text-left px-3 py-1.5 text-xs font-semibold ${timePeriod === tp ? "bg-[#e6f4ea] text-[#0d5c3a]" : "text-slate-700 hover:bg-slate-50"}`}
                                        >
                                            {tp}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Search Input */}
                        <div className="relative hidden md:block w-52">
                            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search workspace..."
                                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200/90 rounded-xl text-xs font-semibold outline-none focus:border-[#107c41]"
                            />
                        </div>

                        {/* Notification Bell */}
                        <button className="w-8.5 h-8.5 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors relative shrink-0">
                            <Bell className="w-4 h-4" />
                            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2 right-2 border border-white" />
                        </button>
                    </div>
                </header>

                {/* Dashboard Page Content */}
                <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-[#f8f9fc] flex-1">

                    {activeTab === "dashboard" ? (
                        <>
                            {/* Top 4 Summary Metric Cards (Flup Reference Header Cards — Mobile 2-Column Grid) */}
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
                                
                                {/* Card 1: Total Customers / Active Applications */}
                                <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs hover:shadow-xs transition-all">
                                    <div className="flex items-center justify-between text-slate-500 mb-2">
                                        <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-500 flex items-center gap-1 truncate">
                                            👥 Applications
                                        </span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                                        <span className="text-lg sm:text-xl font-extrabold text-slate-900">
                                            12 Active
                                        </span>
                                        <span className="text-[9.5px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md self-start sm:self-auto border border-emerald-200/60">
                                            📈 2.5%
                                        </span>
                                    </div>
                                </div>

                                {/* Card 2: Total Revenue / Escrow Vault */}
                                <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs hover:shadow-xs transition-all">
                                    <div className="flex items-center justify-between text-slate-500 mb-2">
                                        <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-500 flex items-center gap-1 truncate">
                                            💵 Escrow & Funds
                                        </span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                                        <span className="text-lg sm:text-xl font-extrabold text-slate-900">
                                            ₹45,200
                                        </span>
                                        <span className="text-[9.5px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md self-start sm:self-auto border border-emerald-200/60">
                                            📈 0.5%
                                        </span>
                                    </div>
                                </div>

                                {/* Card 3: Total Orders / Consultations */}
                                <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs hover:shadow-xs transition-all">
                                    <div className="flex items-center justify-between text-slate-500 mb-2">
                                        <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-500 flex items-center gap-1 truncate">
                                            💬 Consultations
                                        </span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                                        <span className="text-lg sm:text-xl font-extrabold text-slate-900">
                                            8 Sessions
                                        </span>
                                        <span className="text-[9.5px] sm:text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded-md self-start sm:self-auto border border-rose-200/60">
                                            📉 0.2%
                                        </span>
                                    </div>
                                </div>

                                {/* Card 4: Total Returns / Saved Consultants */}
                                <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs hover:shadow-xs transition-all">
                                    <div className="flex items-center justify-between text-slate-500 mb-2">
                                        <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-500 flex items-center gap-1 truncate">
                                            ⭐ Saved Experts
                                        </span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                                        <span className="text-lg sm:text-xl font-extrabold text-slate-900">
                                            15 Experts
                                        </span>
                                        <span className="text-[9.5px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md self-start sm:self-auto border border-emerald-200/60">
                                            📈 0.12%
                                        </span>
                                    </div>
                                </div>

                                {/* Card 5: Add Data Widget (Flup Reference) */}
                                <div className="col-span-2 sm:col-span-2 lg:col-span-1 bg-slate-50/70 rounded-xl border-2 border-dashed border-slate-200 hover:border-slate-300 p-3 sm:p-4 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all hover:bg-slate-100/60">
                                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow-2xs">
                                        <Plus className="w-4 h-4" />
                                    </div>
                                    <span className="text-xs font-bold text-slate-600">Add custom data</span>
                                </div>

                            </div>

                            {/* Main Middle Section: Product Sales / Application Processing Dual Bar Chart */}
                            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-2xs space-y-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                                            Application Processing & Progress
                                        </h2>
                                        <p className="text-xs font-medium text-slate-500">
                                            Monthly activity breakdown for Student Visas & Work Permits
                                        </p>
                                    </div>

                                    {/* Chart Legend Badges */}
                                    <div className="flex items-center gap-4 text-xs font-bold">
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                                            <span className="text-slate-700">Student Visas</span>
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                            <span className="text-slate-700">Work Permits</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Dual Vertical Bar Chart (Flup Reference Replication — Scrollable on Mobile) */}
                                <div className="relative pt-6 pb-2 overflow-x-auto">
                                    <div className="h-56 flex items-end justify-between gap-2 sm:gap-4 px-2 border-b border-slate-100 min-w-[520px]">
                                        {barChartData.map((item, idx) => (
                                            <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative h-full justify-end">
                                                
                                                {/* Tooltip Overlay (Flup Reference 6 Jul Style) */}
                                                {item.tooltip && (
                                                    <div className="absolute -top-12 z-20 bg-white border border-slate-200 shadow-lg rounded-xl px-3 py-1.5 text-center whitespace-nowrap animate-bounce-subtle">
                                                        <p className="text-[10px] font-bold text-slate-500">Active Cases</p>
                                                        <p className="text-xs font-extrabold text-slate-900 flex items-center gap-1">
                                                            ₹52,187 <span className="text-[9px] text-emerald-600">📈 2.5%</span>
                                                        </p>
                                                    </div>
                                                )}

                                                <div className="w-full flex items-end justify-center gap-1 h-full">
                                                    {/* Blue Bar */}
                                                    <div 
                                                        className="w-2.5 sm:w-3.5 bg-blue-500 hover:bg-blue-600 rounded-t-sm transition-all duration-300"
                                                        style={{ height: `${(item.gross / 70) * 100}%` }}
                                                    />
                                                    {/* Orange Bar */}
                                                    <div 
                                                        className="w-2.5 sm:w-3.5 bg-amber-500 hover:bg-amber-600 rounded-t-sm transition-all duration-300"
                                                        style={{ height: `${(item.rev / 70) * 100}%` }}
                                                    />
                                                </div>

                                                {/* X Axis Label */}
                                                <span className={`text-[11px] font-bold mt-2 ${item.tooltip ? "text-slate-900 font-extrabold" : "text-slate-400"}`}>
                                                    {item.day}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Grid: 2 Column Panels (Flup Reference Donut Chart + Country Sales List) */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                
                                {/* Left Panel: Sales by product category (Donut Chart & Legend Grid) */}
                                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs flex flex-col justify-between">
                                    <div className="mb-4">
                                        <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                                            Applications by Product Category
                                        </h3>
                                        <p className="text-xs text-slate-500 font-medium">Category distribution overview</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                                        {/* Legend Grid Pills */}
                                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                                            {categoriesData.map((cat, idx) => (
                                                <div key={idx} className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                                                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                                                    <span className="font-bold text-slate-800 truncate">{cat.label.split('/')[1] || cat.label}</span>
                                                    <span className="text-[10px] font-extrabold text-slate-500 ml-auto">{cat.percent}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Donut Chart Graphic (Flup Reference SVG) */}
                                        <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
                                            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                                <path strokeDasharray="25, 100" stroke="#8b5cf6" strokeWidth="4.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                                <path strokeDasharray="17, 100" strokeDashoffset="-25" stroke="#3b82f6" strokeWidth="4.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                                <path strokeDasharray="13, 100" strokeDashoffset="-42" stroke="#a855f7" strokeWidth="4.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                                <path strokeDasharray="12, 100" strokeDashoffset="-55" stroke="#38bdf8" strokeWidth="4.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                                <path strokeDasharray="9, 100" strokeDashoffset="-67" stroke="#ec4899" strokeWidth="4.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                                <path strokeDasharray="24, 100" strokeDashoffset="-76" stroke="#10b981" strokeWidth="4.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                            </svg>
                                            <div className="absolute text-center">
                                                <span className="text-xl font-extrabold text-slate-900">100%</span>
                                                <span className="text-[10px] font-bold text-slate-400 block uppercase">Total</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Panel: Sales by countries (Country Ranking List & Map Graphic) */}
                                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs flex flex-col justify-between">
                                    <div className="mb-4">
                                        <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                                            Top Destination Visas by Country
                                        </h3>
                                        <p className="text-xs text-slate-500 font-medium">Demographic destination statistics</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                                        {/* Country Percentage Ranking List */}
                                        <div className="space-y-2.5">
                                            {countriesData.map((c, idx) => (
                                                <div key={idx} className="flex items-center justify-between text-xs font-bold border-b border-slate-100 pb-1">
                                                    <span className="flex items-center gap-2 text-slate-800">
                                                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                                        {c.name.split('/')[1] || c.name}
                                                    </span>
                                                    <span className="text-slate-900 font-extrabold">{c.percent}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Stylized Mini Map Graphic */}
                                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center justify-center h-48 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10" />
                                            <div className="text-center z-10 space-y-2">
                                                <Globe className="w-12 h-12 text-[#107c41] mx-auto animate-pulse-subtle" />
                                                <span className="text-xs font-extrabold text-slate-800 block">150+ Global Destinations</span>
                                                <span className="text-[10px] font-bold text-slate-500 block">Worldwide Coverage</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </>
                    ) : (
                        /* Other Tab Views (Profile, Cases, Consultations, Documents, etc.) */
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs">
                            {activeTab === "profile" && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                                        <div>
                                            <h2 className="text-xl font-extrabold text-slate-900">Profile & Passport Information</h2>
                                            <p className="text-xs text-slate-500 font-semibold">Manage your personal visa application identity</p>
                                        </div>
                                        <button onClick={() => setShowProfileModal(true)} className="bg-[#107c41] hover:bg-[#0d5c3a] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs">
                                            Edit Profile
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 space-y-2">
                                            <span className="text-slate-400 font-bold block uppercase text-[10px]">Full Name</span>
                                            <span className="text-slate-900 font-extrabold text-sm block">{firstName} {lastName}</span>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 space-y-2">
                                            <span className="text-slate-400 font-bold block uppercase text-[10px]">Contact Phone</span>
                                            <span className="text-slate-900 font-extrabold text-sm block">{phone || "Not specified"}</span>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 space-y-2">
                                            <span className="text-slate-400 font-bold block uppercase text-[10px]">Passport Country</span>
                                            <span className="text-slate-900 font-extrabold text-sm block">{countryOfCitizenship || "India"}</span>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 space-y-2">
                                            <span className="text-slate-400 font-bold block uppercase text-[10px]">Current Residence</span>
                                            <span className="text-slate-900 font-extrabold text-sm block">{residentOf || "India"}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab !== "profile" && (
                                <div className="py-12 text-center space-y-3">
                                    <Briefcase className="w-12 h-12 text-slate-400 mx-auto" />
                                    <h3 className="text-base font-extrabold text-slate-900 capitalize">{activeTab.replace('-', ' ')} Portal</h3>
                                    <p className="text-xs text-slate-500 font-semibold max-w-sm mx-auto">
                                        All active {activeTab.replace('-', ' ')} records are synchronized with your verified immigration advisor.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </main>

            {/* Edit Profile Modal */}
            {showProfileModal && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-6">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <h3 className="text-base font-extrabold text-slate-900">Update Profile Details</h3>
                            <button onClick={() => setShowProfileModal(false)} className="text-slate-400 hover:text-slate-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveProfileModal} className="space-y-4 text-xs">
                            <div>
                                <label className="font-bold text-slate-700 block mb-1">First Name</label>
                                <input 
                                    type="text"
                                    value={modalFirstName}
                                    onChange={(e) => setModalFirstName(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold outline-none focus:border-[#107c41]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="font-bold text-slate-700 block mb-1">Last Name</label>
                                <input 
                                    type="text"
                                    value={modalLastName}
                                    onChange={(e) => setModalLastName(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold outline-none focus:border-[#107c41]"
                                />
                            </div>

                            <div>
                                <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                                <input 
                                    type="text"
                                    value={modalPhone}
                                    onChange={(e) => setModalPhone(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold outline-none focus:border-[#107c41]"
                                />
                            </div>

                            <div>
                                <label className="font-bold text-slate-700 block mb-1">Passport Country</label>
                                <input 
                                    type="text"
                                    value={modalPassportCountry}
                                    onChange={(e) => setModalPassportCountry(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold outline-none focus:border-[#107c41]"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <button type="button" onClick={() => setShowProfileModal(false)} className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-[#107c41] hover:bg-[#0d5c3a] text-white rounded-xl font-bold transition-all">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}
