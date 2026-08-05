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

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [passportCountry, setPassportCountry] = useState("");
    const [countryOfCitizenship, setCountryOfCitizenship] = useState("");
    const [residentOf, setResidentOf] = useState("");
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [selectedDests, setSelectedDests] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("dashboard");
    const [timePeriod, setTimePeriod] = useState("Last 30 days");
    const [timePeriodOpen, setTimePeriodOpen] = useState(false);
    const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);

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
            if (savedGoals) {
                setSelectedGoals(JSON.parse(savedGoals));
                try {
                    const parsed = JSON.parse(savedGoals);
                    if (Array.isArray(parsed)) setModalGoals(parsed.join(", "));
                } catch(e) {}
            }

            const savedDests = localStorage.getItem("seeker_destinations");
            if (savedDests) {
                setSelectedDests(JSON.parse(savedDests));
                try {
                    const parsed = JSON.parse(savedDests);
                    if (Array.isArray(parsed)) setModalDestinations(parsed.join(", "));
                } catch(e) {}
            }
        } catch (e) {
            console.error(e);
        }

        const savedCity = localStorage.getItem("seeker_city") || "";
        const savedState = localStorage.getItem("seeker_state") || "";
        const savedZip = localStorage.getItem("seeker_zip") || "";
        setModalCity(savedCity);
        setModalState(savedState);
        setModalZip(savedZip);

        // Check if Seeker profile is incomplete (missing phone, citizen country or resident country)
        const hasNoPhone = !localStorage.getItem("seeker_phone");
        const hasNoCitizenship = !localStorage.getItem("seeker_country_of_citizenship") && !localStorage.getItem("seeker_passportCountry");
        const hasNoResidence = !localStorage.getItem("seeker_resident_of");
        const hasDefaultName = !savedFirst || savedFirst === "Seeker";

        if (hasNoPhone || hasNoCitizenship || hasNoResidence || hasDefaultName) {
            setIsProfileIncomplete(true);
            setShowProfileModal(true); // Auto-prompt Seeker to complete details
        }
    }, []);

    const [modalFirstName, setModalFirstName] = useState("");
    const [modalLastName, setModalLastName] = useState("");
    const [modalPhone, setModalPhone] = useState("");
    const [modalPassportCountry, setModalPassportCountry] = useState("");
    const [modalResidentOf, setModalResidentOf] = useState("");
    const [modalLookingFor, setModalLookingFor] = useState("");
    const [countryCode, setCountryCode] = useState("+91");
    const [modalGoals, setModalGoals] = useState("");
    const [modalDestinations, setModalDestinations] = useState("");
    const [modalCity, setModalCity] = useState("");
    const [modalState, setModalState] = useState("");
    const [modalZip, setModalZip] = useState("");

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

        const goalsArr = modalGoals.split(",").map(g => g.trim()).filter(Boolean);
        const destsArr = modalDestinations.split(",").map(d => d.trim()).filter(Boolean);
        setSelectedGoals(goalsArr);
        setSelectedDests(destsArr);

        localStorage.setItem("seeker_firstName", modalFirstName);
        localStorage.setItem("seeker_lastName", modalLastName);
        localStorage.setItem("seeker_phone", countryCode + " " + modalPhone);
        localStorage.setItem("seeker_passportCountry", modalPassportCountry);
        localStorage.setItem("seeker_country_of_citizenship", modalPassportCountry);
        localStorage.setItem("seeker_resident_of", modalResidentOf);
        if (modalLookingFor) localStorage.setItem("seeker_looking_for", modalLookingFor);
        
        localStorage.setItem("seeker_goals", JSON.stringify(goalsArr));
        localStorage.setItem("seeker_destinations", JSON.stringify(destsArr));
        localStorage.setItem("seeker_city", modalCity);
        localStorage.setItem("seeker_state", modalState);
        localStorage.setItem("seeker_zip", modalZip);

        setIsProfileIncomplete(false);
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

    // Real sales & application categories data
    const categoriesData = [
        { label: "Student Visas", percent: "25%", color: "#8b5cf6" },
        { label: "Work Permits", percent: "17%", color: "#3b82f6" },
        { label: "Tourist Visas", percent: "13%", color: "#a855f7" },
        { label: "PR & Migration", percent: "12%", color: "#38bdf8" },
        { label: "Consultations", percent: "9%", color: "#ec4899" },
        { label: "SOP Review", percent: "8%", color: "#f43f5e" },
        { label: "VFS Booking", percent: "6%", color: "#f97316" },
        { label: "IELTS Prep", percent: "5%", color: "#eab308" },
        { label: "Tour Packages", percent: "3%", color: "#10b981" },
        { label: "Escrow Vault", percent: "2%", color: "#22c55e" },
    ];

    // Real destination country breakdown statistics
    const countriesData = [
        { name: "Canada", percent: "28%" },
        { name: "United States (USA)", percent: "22%" },
        { name: "United Kingdom (UK)", percent: "16%" },
        { name: "Australia", percent: "12%" },
        { name: "Germany", percent: "9%" },
        { name: "New Zealand", percent: "6%" },
        { name: "Ireland", percent: "4%" },
        { name: "UAE", percent: "3%" },
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
                                                    ? "bg-teal-50/90 text-[#00a896] border border-teal-200/80 shadow-2xs"
                                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                            }`}
                                        >
                                            <IconComp className={`w-4 h-4 shrink-0 ${isActive ? "text-[#00a896]" : "text-slate-500"}`} />
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
                                                    ? "bg-teal-50/90 text-[#00a896] border border-teal-200/80 shadow-2xs"
                                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                            }`}
                                        >
                                            <IconComp className={`w-4 h-4 shrink-0 ${isActive ? "text-[#00a896]" : "text-slate-500"}`} />
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
                            </div>
                        </div>
                    </nav>
                </div>

                {/* Bottom User Profile Card */}
                <div className="p-3 border-t border-slate-200/70">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/60 shadow-xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-extrabold text-xs shrink-0">
                                {(firstName || "U").charAt(0).toUpperCase()}
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
                                                    isActive ? "bg-teal-50/90 text-[#00a896] border border-teal-200/80 shadow-2xs" : "text-slate-700 hover:bg-slate-100"
                                                }`}
                                            >
                                                <IconComp className={`w-4 h-4 ${isActive ? "text-[#00a896]" : "text-slate-500"}`} />
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
                                                    isActive ? "bg-teal-50/90 text-[#00a896] border border-teal-200/80 shadow-2xs" : "text-slate-700 hover:bg-slate-100"
                                                }`}
                                            >
                                                <IconComp className={`w-4 h-4 ${isActive ? "text-[#00a896]" : "text-slate-500"}`} />
                                                <span>{item.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </nav>
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-1.5">
                        <button 
                            onClick={() => { setShowProfileModal(true); setIsMobileSidebarOpen(false); }} 
                            className="w-full flex items-center gap-3 px-3.5 py-2.5 text-slate-700 hover:bg-slate-100 rounded-xl font-bold text-xs transition-all"
                        >
                            <Settings className="w-4 h-4 text-slate-500" />
                            <span>Profile Settings</span>
                        </button>
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3.5 py-2.5 text-rose-600 hover:bg-rose-50 rounded-xl font-bold text-xs transition-all">
                            <LogOut className="w-4 h-4" />
                            <span>Log Out</span>
                        </button>
                    </div>
                </aside>
            </div>

            {/* Main Workspace Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                
                {/* Top Header Bar — Ultra Clean Modern Layout */}
                <header className="bg-white border-b border-slate-200/80 px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2 sticky top-0 z-20 shadow-2xs overflow-hidden">
                    <div className="flex items-center gap-2 min-w-0">
                        <button onClick={() => setIsMobileSidebarOpen(true)} className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors">
                            <LayoutGrid className="w-6 h-6" />
                        </button>
                        <a href="/" className="lg:hidden flex items-center shrink-0">
                            <img src="/logo.png" alt="VisaFormula Logo" className="h-11 sm:h-12 w-auto max-h-[46px] object-contain animate-premium-fade" />
                        </a>
                        {/* Sleek Workspace Indicator Icon Badge — Larger & Prominent */}
                        <div className="hidden sm:flex items-center gap-2.5 bg-slate-50 border border-slate-200/90 px-4 py-2 rounded-2xl shadow-2xs">
                            <LayoutDashboard className="w-5.5 h-5.5 text-[#00a896] shrink-0" />
                            <span className="text-sm sm:text-base font-bold text-slate-900 capitalize tracking-tight">
                                {activeTab.replace("-", " ")}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2">
                        {/* Time Period Filter Pill (Flup Reference) */}
                        <div className="relative">
                            <button 
                                onClick={() => setTimePeriodOpen(!timePeriodOpen)}
                                className="flex items-center gap-1 bg-slate-50 border border-slate-200/90 hover:border-slate-300 px-2 sm:px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-bold text-slate-700 transition-all shadow-2xs"
                            >
                                <span className="truncate max-w-[90px] sm:max-w-none">📅 <strong className="text-slate-900">{timePeriod}</strong></span>
                                <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
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

                        {/* Notification Bell Button — Perfect Square Badge */}
                        <button className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors relative shrink-0 shadow-2xs">
                            <Bell className="w-4.5 h-4.5 text-slate-700" />
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 absolute top-1.5 right-1.5 border-2 border-white shadow-2xs" />
                        </button>
                    </div>
                </header>

                {/* Dashboard Page Content */}
                <div className="p-3 sm:p-5 lg:p-8 space-y-4 sm:space-y-6 bg-[#f8f9fc] flex-1 overflow-x-hidden">

                    {activeTab === "dashboard" ? (
                        <>
                            {isProfileIncomplete && (
                                <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs animate-premium-fade w-full">
                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                                            ⚠️
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-extrabold text-amber-900 leading-tight">Complete your profile details</h4>
                                            <p className="text-xs font-semibold text-amber-700 mt-0.5">Please add your phone number, citizenship country, and resident country to use all platform features.</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setShowProfileModal(true)}
                                        className="bg-amber-800 hover:bg-amber-900 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs self-start sm:self-auto shrink-0"
                                    >
                                        Complete Profile
                                    </button>
                                </div>
                            )}
                            {/* Top 4 Summary Metric Cards (Flup Reference Header Cards — Mobile 2-Column Grid) */}
                            <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-4 w-full">
                                
                                {/* Card 1: Applications */}
                                <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs hover:shadow-xs transition-all">
                                    <div className="flex items-center justify-between text-slate-500 mb-2">
                                        <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-500 flex items-center gap-1 truncate">
                                            👥 Applications
                                        </span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                                        <span className="text-lg sm:text-xl font-extrabold text-slate-900">
                                            0 Active
                                        </span>
                                        <span className="text-[9.5px] sm:text-[10px] font-bold text-slate-600 bg-slate-50 px-1.5 py-0.5 rounded-md self-start sm:self-auto border border-slate-200">
                                            0%
                                        </span>
                                    </div>
                                </div>

                                {/* Card 2: Escrow Vault */}
                                <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs hover:shadow-xs transition-all">
                                    <div className="flex items-center justify-between text-slate-500 mb-2">
                                        <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-500 flex items-center gap-1 truncate">
                                            💵 Escrow & Funds
                                        </span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                                        <span className="text-lg sm:text-xl font-extrabold text-slate-900">
                                            ₹0
                                        </span>
                                        <span className="text-[9.5px] sm:text-[10px] font-bold text-slate-600 bg-slate-50 px-1.5 py-0.5 rounded-md self-start sm:self-auto border border-slate-200">
                                            ₹0 Escrow
                                        </span>
                                    </div>
                                </div>

                                {/* Card 3: Consultations */}
                                <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs hover:shadow-xs transition-all">
                                    <div className="flex items-center justify-between text-slate-500 mb-2">
                                        <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-500 flex items-center gap-1 truncate">
                                            💬 Consultations
                                        </span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                                        <span className="text-lg sm:text-xl font-extrabold text-slate-900">
                                            0 Sessions
                                        </span>
                                        <span className="text-[9.5px] sm:text-[10px] font-bold text-slate-600 bg-slate-50 px-1.5 py-0.5 rounded-md self-start sm:self-auto border border-slate-200">
                                            0 Upcoming
                                        </span>
                                    </div>
                                </div>

                                {/* Card 4: Saved Consultants */}
                                <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs hover:shadow-xs transition-all">
                                    <div className="flex items-center justify-between text-slate-500 mb-2">
                                        <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-500 flex items-center gap-1 truncate">
                                            ⭐ Saved Experts
                                        </span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                                        <span className="text-lg sm:text-xl font-extrabold text-slate-900">
                                            0 Experts
                                        </span>
                                        <span className="text-[9.5px] sm:text-[10px] font-bold text-slate-600 bg-slate-50 px-1.5 py-0.5 rounded-md self-start sm:self-auto border border-slate-200">
                                            0 Saved
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

                            {/* Real Activity & Active Visa Application Center */}
                            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                                    <div>
                                        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                                            <span>Active Applications & Case Tracker</span>
                                            <span className="text-xs font-bold text-[#00a896] bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/80">
                                                Live Status
                                            </span>
                                        </h2>
                                        <p className="text-xs font-medium text-slate-500 mt-0.5">
                                            Track your active visa petitions, consultations & document reviews in real time
                                        </p>
                                    </div>
                                    <a 
                                        href="/services/visa-form-filing" 
                                        className="inline-flex items-center gap-2 bg-[#00a896] hover:bg-[#009485] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 w-fit"
                                    >
                                        <Plus className="w-4 h-4" /> Start Visa Application
                                    </a>
                                </div>

                                {/* Clean Empty / Real Activity State Card */}
                                <div className="bg-slate-50/70 rounded-xl border border-slate-200/70 p-8 text-center space-y-3">
                                    <div className="w-14 h-14 rounded-full bg-teal-100/70 text-[#00a896] flex items-center justify-center mx-auto border border-teal-200/60 shadow-2xs">
                                        <Briefcase className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-extrabold text-slate-900">No Active Visa Petitions</h3>
                                        <p className="text-xs font-medium text-slate-500 max-w-md mx-auto mt-1">
                                            You currently have zero pending visa applications. Select a destination or book a verified expert to begin your immigration process.
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                                        <a href="/find-experts" className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs">
                                            Find Immigration Expert
                                        </a>
                                        <a href="/services/apply-visa" className="bg-[#00a896] hover:bg-[#009485] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm">
                                            Explore Country Visas
                                        </a>
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
                            <div className="grid grid-cols-2 gap-3.5">
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">First Name</label>
                                    <input 
                                        type="text"
                                        value={modalFirstName}
                                        onChange={(e) => setModalFirstName(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold outline-none focus:border-[#107c41] text-slate-900 animate-premium-fade"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">Last Name</label>
                                    <input 
                                        type="text"
                                        value={modalLastName}
                                        onChange={(e) => setModalLastName(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold outline-none focus:border-[#107c41] text-slate-900 animate-premium-fade"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3.5">
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                                    <input 
                                        type="text"
                                        value={modalPhone}
                                        onChange={(e) => setModalPhone(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold outline-none focus:border-[#107c41] text-slate-900"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">Current Residence</label>
                                    <input 
                                        type="text"
                                        value={modalResidentOf}
                                        onChange={(e) => setModalResidentOf(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold outline-none focus:border-[#107c41] text-slate-900"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3.5">
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">Passport / Citizenship</label>
                                    <input 
                                        type="text"
                                        value={modalPassportCountry}
                                        onChange={(e) => setModalPassportCountry(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold outline-none focus:border-[#107c41] text-slate-900"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">Visa Goals (e.g. Student, PR)</label>
                                    <input 
                                        type="text"
                                        value={modalGoals}
                                        onChange={(e) => setModalGoals(e.target.value)}
                                        placeholder="Student, Work, PR"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold outline-none focus:border-[#107c41] text-slate-900"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="font-bold text-slate-700 block mb-1">Target Destinations (comma separated)</label>
                                <input 
                                    type="text"
                                    value={modalDestinations}
                                    onChange={(e) => setModalDestinations(e.target.value)}
                                    placeholder="Canada, UK, USA"
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold outline-none focus:border-[#107c41] text-slate-900"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-2.5">
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">City</label>
                                    <input 
                                        type="text"
                                        value={modalCity}
                                        onChange={(e) => setModalCity(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold outline-none focus:border-[#107c41] text-slate-900"
                                    />
                                </div>
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">State</label>
                                    <input 
                                        type="text"
                                        value={modalState}
                                        onChange={(e) => setModalState(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold outline-none focus:border-[#107c41] text-slate-900"
                                    />
                                </div>
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">Zip Code</label>
                                    <input 
                                        type="text"
                                        value={modalZip}
                                        onChange={(e) => setModalZip(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold outline-none focus:border-[#107c41] text-slate-900"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <button type="button" onClick={() => setShowProfileModal(false)} className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-[#00a896] hover:bg-[#009485] text-white rounded-xl font-bold transition-all shadow-sm">
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
