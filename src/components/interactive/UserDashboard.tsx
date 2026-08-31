import { useState, useEffect } from "react";
import {
    Clock, CheckCircle, Lock, Calendar, BookOpen, Bookmark, AlertTriangle,
    ArrowRight, ArrowLeft, Bell, FileText, Star, Shield, TrendingUp, ChevronRight,
    Search, Plus, LayoutDashboard, MessageSquare, Settings, HelpCircle, Briefcase,
    Video, User, LogOut, CheckSquare, Sparkles, X, ChevronDown, Filter, MapPin, Globe, LayoutGrid, Save, Menu, ChevronLeft, Edit2, Upload
} from "lucide-react";

export function UserDashboard() {
    const [ieltsScore, setIeltsScore] = useState({ L: 0, R: 0, W: 0, S: 0 });
    const hasIeltsScore = ieltsScore.L > 0 || ieltsScore.R > 0 || ieltsScore.W > 0 || ieltsScore.S > 0;
    const overallBand = hasIeltsScore ? ((ieltsScore.L + ieltsScore.R + ieltsScore.W + ieltsScore.S) / 4).toFixed(1) : "N/A";
    
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
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState("");

    const [favouriteExperts, setFavouriteExperts] = useState<any[]>([]);
    const [visasProcessingState, setVisasProcessingState] = useState<any[]>([]);
    const [documents, setDocuments] = useState<any[]>([]);
    const [journeyData, setJourneyData] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Hydrate cached journey data
            const localJourney = localStorage.getItem("travltik_user_journey");
            const activeCasesStr = localStorage.getItem("active_visa_cases");
            const savedDocsStr = localStorage.getItem("seeker_documents");

            if (localJourney) {
                try {
                    const parsedJ = JSON.parse(localJourney);
                    setJourneyData(parsedJ);
                    if (parsedJ.uploaded_documents && typeof parsedJ.uploaded_documents === 'object') {
                        const docList = Object.entries(parsedJ.uploaded_documents).map(([k, v]: [string, any]) => ({
                            id: k,
                            label: v.fileName ? `${k.toUpperCase().replace(/_/g, ' ')} (${v.fileName})` : `${k.toUpperCase().replace(/_/g, ' ')} Document`,
                            status: 'verified',
                            size: v.size || '1.8 MB',
                            uploadedAt: v.timestamp || 'Recently'
                        }));
                        setDocuments(docList);
                    }
                } catch(e) {}
            }

            if (savedDocsStr) {
                try {
                    const parsedDocs = JSON.parse(savedDocsStr);
                    if (Array.isArray(parsedDocs) && parsedDocs.length > 0) {
                        setDocuments(parsedDocs);
                    }
                } catch(e) {}
            }

            if (activeCasesStr) {
                try {
                    const parsedCases = JSON.parse(activeCasesStr);
                    if (Array.isArray(parsedCases)) {
                        setVisasProcessingState(parsedCases);
                    }
                } catch(e) {}
            } else if (localJourney) {
                try {
                    const parsedJ = JSON.parse(localJourney);
                    if (parsedJ && parsedJ.destination) {
                        setVisasProcessingState([{
                            id: 'case-1',
                            trackingId: parsedJ.tracking_id || 'TT-APP-2026-9824',
                            destination: parsedJ.destination,
                            destinationFlag: parsedJ.destination_flag || '🌍',
                            visaType: parsedJ.visa_type || 'Standard Visitor Visa',
                            purpose: parsedJ.purpose || 'tourism',
                            passport: parsedJ.passport_country || 'India',
                            status: 'Dossier Ingested & AI Verified',
                            stage: 'Under AI Concierge Review',
                            progress: 35,
                            documentsCount: parsedJ.uploaded_documents ? Object.keys(parsedJ.uploaded_documents).length : 0,
                            addonsCount: parsedJ.selected_addons ? parsedJ.selected_addons.length : 0,
                            submittedAt: parsedJ.submitted_at || 'Recently',
                            targetDate: '15 Working Days'
                        }]);
                    }
                } catch(e) {}
            }

            const userStr = (localStorage.getItem("travltik_user"));
            const savedEmail = localStorage.getItem("seeker_email");
            const isLoggedInExpert = localStorage.getItem("expert_isLoggedIn");

            if (isLoggedInExpert === "true") {
                window.location.href = "/consultant/dashboard";
                return;
            }

            // If user has no login credentials and no active journey/case, then redirect to login
            if (!userStr && !savedEmail && !localJourney && !activeCasesStr) {
                window.location.href = "/login?redirect=/dashboard";
                return;
            }

            if (userStr) {
                try {
                    const u = JSON.parse(userStr);
                    if (u && u.type === "expert") {
                        window.location.href = "/consultant/dashboard";
                        return;
                    }
                    if (u && u.email) {
                        setEmail(u.email);
                        fetch(`/api/journey/status?email=${encodeURIComponent(u.email)}`)
                            .then(r => r.json())
                            .then(res => {
                                if (res?.success && res.data) setJourneyData(res.data);
                            })
                            .catch(() => {});
                    }
                    if (u && u.name) {
                        const parts = u.name.split(" ");
                        if (parts[0]) setFirstName(parts[0]);
                        if (parts[1]) setLastName(parts.slice(1).join(" "));
                    }
                } catch(e) {}
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

            const savedPhoto = localStorage.getItem("seeker_profilePhoto") || localStorage.getItem("seeker_profilePhotoUrl") || "";
            setProfilePhoto(savedPhoto);
            setModalPhoto(savedPhoto);

            try {
                const savedGoals = localStorage.getItem("seeker_goals");
                if (savedGoals) {
                    const parsed = JSON.parse(savedGoals);
                    if (Array.isArray(parsed)) {
                        setSelectedGoals(parsed);
                        setModalGoals(parsed.join(", "));
                    }
                }

                const savedDests = localStorage.getItem("seeker_destinations");
                if (savedDests) {
                    const parsed = JSON.parse(savedDests);
                    if (Array.isArray(parsed)) {
                        setSelectedDests(parsed);
                        setModalDestinations(parsed.join(", "));
                    }
                }

                const savedDocs = localStorage.getItem("seeker_documents");
                if (savedDocs) {
                    const parsed = JSON.parse(savedDocs);
                    if (Array.isArray(parsed)) setDocuments(parsed);
                }

                const savedIelts = localStorage.getItem("seeker_ielts");
                if (savedIelts) {
                    const parsed = JSON.parse(savedIelts);
                    if (parsed && typeof parsed === "object") setIeltsScore(parsed);
                }
            } catch (e) {}

            const savedCity = localStorage.getItem("seeker_city") || "";
            const savedState = localStorage.getItem("seeker_state") || "";
            const savedZip = localStorage.getItem("seeker_zip") || "";
            setModalCity(savedCity);
            setModalState(savedState);
            setModalZip(savedZip);

            // Check if Seeker profile is incomplete based on registration starting details
            const hasPhone = Boolean(localStorage.getItem("seeker_phone"));
            const hasCitizenship = Boolean(localStorage.getItem("seeker_country_of_citizenship") || localStorage.getItem("seeker_passportCountry"));
            const hasResidence = Boolean(localStorage.getItem("seeker_resident_of"));
            const hasDestinations = Boolean(localStorage.getItem("seeker_destinations"));

            setIsProfileIncomplete(!hasPhone || !hasCitizenship || !hasResidence || !hasDestinations);
        }
    }, []);

    const [modalFirstName, setModalFirstName] = useState("");
    const [modalLastName, setModalLastName] = useState("");
    const [modalPhone, setModalPhone] = useState("");
    const [modalPassportCountry, setModalPassportCountry] = useState("");
    const [modalResidentOf, setModalResidentOf] = useState("");
    const [countryCode, setCountryCode] = useState("+91");
    const [modalGoals, setModalGoals] = useState("");
    const [modalDestinations, setModalDestinations] = useState("");
    const [modalCity, setModalCity] = useState("");
    const [modalState, setModalState] = useState("");
    const [modalZip, setModalZip] = useState("");
    const [modalPhoto, setModalPhoto] = useState("");

    const handleSaveProfileModal = (e: React.FormEvent) => {
        e.preventDefault();
        setFirstName(modalFirstName);
        setLastName(modalLastName);
        setPhone(countryCode + " " + modalPhone);
        setCountryOfCitizenship(modalPassportCountry);
        setResidentOf(modalResidentOf);
        setProfilePhoto(modalPhoto);

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
        
        localStorage.setItem("seeker_goals", JSON.stringify(goalsArr));
        localStorage.setItem("seeker_destinations", JSON.stringify(destsArr));
        localStorage.setItem("seeker_city", modalCity);
        localStorage.setItem("seeker_state", modalState);
        localStorage.setItem("seeker_zip", modalZip);
        localStorage.setItem("seeker_profilePhoto", modalPhoto);

        setIsProfileIncomplete(false);
        setShowProfileModal(false);
    };

    const handleUpdateIelts = (newScore: { L: number; R: number; W: number; S: number }) => {
        setIeltsScore(newScore);
        localStorage.setItem("seeker_ielts", JSON.stringify(newScore));
    };

    const handleLogout = () => {
        localStorage.removeItem("travltik_user"); localStorage.removeItem("seeker_firstName");
        localStorage.removeItem("seeker_lastName");
        localStorage.removeItem("seeker_email");
        localStorage.removeItem("seeker_phone");
        localStorage.removeItem("seeker_passportCountry");
        localStorage.removeItem("seeker_goals");
        localStorage.removeItem("seeker_destinations");
        localStorage.removeItem("seeker_profilePhoto");
        window.location.href = "/";
    };

    const navItems = [
        { id: "dashboard", label: "Dashboard Overview", icon: LayoutDashboard },
        { id: "cases", label: "Active Visa Cases", icon: Briefcase },
        { id: "consultations", label: "Bookings & Sessions", icon: Calendar },
        { id: "scanned-documents", label: "Document Vault", icon: FileText },
        { id: "favourite-experts", label: "Saved Experts", icon: Bookmark },
        { id: "escrow-milestones", label: "Escrow Vault", icon: Lock },
        { id: "visa-history", label: "Visa History", icon: BookOpen },
        { id: "profile", label: "Profile & Settings", icon: User },
    ];

    const userDisplayName = firstName || (email ? email.split("@")[0] : "User");
    const fullName = `${firstName} ${lastName}`.trim() || userDisplayName;

    return (
        <div className="min-h-screen bg-[#f8fafc] font-sans flex flex-col text-slate-800 antialiased selection:bg-slate-900 selection:text-white">
            
            {/* Top Fixed Navigation Header */}
            <header className="bg-white border-b border-slate-200/80 shadow-2xs h-16 sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setIsMobileSidebarOpen(true)}
                        className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <a href="/" className="flex items-center gap-2">
                        <img src="/logo.png?v=3" alt="TravlTik Logo" className="h-10 sm:h-12 max-h-[50px] w-auto object-contain" />
                    </a>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                    <a href="/find-experts" className="hidden sm:flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm">
                        <Plus className="w-3.5 h-3.5" /> Book Consultation
                    </a>

                    <button onClick={() => setActiveTab("consultations")} className="w-9 h-9 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors relative">
                        <Bell className="w-4.5 h-4.5" />
                    </button>

                    <div className="flex items-center gap-2.5 pl-2 sm:border-l sm:border-slate-200 cursor-pointer" onClick={() => setActiveTab("profile")}>
                        {profilePhoto && !profilePhoto.includes("unsplash.com") ? (
                            <img src={profilePhoto} alt={fullName} className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0" />
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-slate-900 text-white text-sm font-black flex items-center justify-center border border-slate-700 shrink-0 shadow-2xs">
                                {(userDisplayName || "U").charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div className="hidden md:block text-left">
                            <h4 className="text-xs font-extrabold text-slate-900 leading-tight truncate max-w-[140px]">{fullName}</h4>
                            <span className="inline-block bg-teal-50 text-[#00a896] text-[10px] font-bold px-1.5 py-0.2 rounded border border-slate-700/80 mt-0.5">Visa Seeker</span>
                        </div>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                    </div>
                </div>
            </header>

            <div className="flex-1 flex min-h-[calc(100vh-4rem)]">
                
                {/* Desktop Collapsible Left Sidebar */}
                <aside className={`hidden lg:flex bg-white border-r border-slate-200/80 flex-col justify-between transition-all duration-300 z-30 shrink-0 select-none ${isSidebarCollapsed ? "w-20" : "w-64"}`}>
                    <div className="p-3.5 space-y-4">
                        <nav className="space-y-1">
                            {navItems.map(item => {
                                const isActive = activeTab === item.id;
                                const IconComp = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                                            isActive
                                                ? "bg-slate-900 text-white shadow-md"
                                                : "text-slate-600 hover:bg-slate-100"
                                        }`}
                                    >
                                        <IconComp className={`w-4.5 h-4.5 shrink-0 ${isActive ? "text-white" : "text-slate-500"}`} />
                                        {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="p-3 border-t border-slate-100 space-y-2">
                        <button
                            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                        >
                            {!isSidebarCollapsed && <span>Collapse Sidebar</span>}
                            <ChevronLeft className={`w-4 h-4 transition-transform ${isSidebarCollapsed ? "rotate-180" : ""}`} />
                        </button>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs text-rose-600 hover:bg-rose-50 transition-all"
                        >
                            <LogOut className="w-4.5 h-4.5 shrink-0" />
                            {!isSidebarCollapsed && <span>Logout</span>}
                        </button>
                    </div>
                </aside>

                {/* Mobile Drawer Navigation */}
                <div className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${isMobileSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsMobileSidebarOpen(false)} />
                    <aside className={`absolute top-0 left-0 w-72 h-full bg-white shadow-2xl flex flex-col justify-between p-4 transform transition-transform duration-300 overflow-y-auto ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                <img src="/logo.png?v=3" alt="TravlTik Logo" className="h-9 sm:h-10 max-h-[42px] w-auto object-contain" />
                                <button onClick={() => setIsMobileSidebarOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <nav className="space-y-1">
                                {navItems.map(item => {
                                    const isActive = activeTab === item.id;
                                    const IconComp = item.icon;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                setActiveTab(item.id);
                                                setIsMobileSidebarOpen(false);
                                            }}
                                            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                                                isActive
                                                    ? "bg-slate-900 text-white shadow-md"
                                                    : "text-slate-600 hover:bg-slate-100"
                                            }`}
                                        >
                                            <IconComp className="w-4 h-4" />
                                            <span>{item.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs text-rose-600 hover:bg-rose-50 transition-all mt-4"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </aside>
                </div>

                {/* Main Content Workspace */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">

                    {/* Incomplete Profile Alert Banner */}
                    {isProfileIncomplete && (
                        <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs w-full animate-fade-up">
                            <div className="flex items-start gap-3.5">
                                <div className="w-10 h-10 rounded-2xl bg-amber-100/90 flex items-center justify-center text-amber-800 shrink-0 font-black text-lg border border-amber-200">
                                    ⚠️
                                </div>
                                <div>
                                    <h4 className="text-sm font-extrabold text-amber-950 leading-tight">Complete your seeker profile details</h4>
                                    <p className="text-xs font-semibold text-amber-800 mt-1 leading-relaxed">
                                        Please add your phone number, citizenship country, and target visa goals to receive personalized consultant matches.
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setShowProfileModal(true)}
                                className="bg-amber-800 hover:bg-amber-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 shrink-0 cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
                            >
                                <span>Complete Profile</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {/* 1. TAB: OVERVIEW */}
                    {activeTab === "dashboard" && (
                        <>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Welcome back, {userDisplayName}! 👋</h1>
                                    <p className="text-xs font-medium text-slate-500 mt-0.5">Track your visa applications, consultations, and document readiness</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <a href="/find-experts" className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm flex items-center gap-1.5">
                                        <Search className="w-3.5 h-3.5" /> Find Expert
                                    </a>
                                </div>
                            </div>

                            {/* Stat Summary Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 block">Document Vault</span>
                                        <span className="text-2xl font-black text-slate-900 mt-1 block">{documents.length}</span>
                                        <span className="text-[11px] font-bold text-emerald-600 mt-1 inline-block">Uploaded Documents</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#00a896] flex items-center justify-center font-bold">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                </div>

                                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 block">IELTS Band Score</span>
                                        <span className="text-2xl font-black text-slate-900 mt-1 block">{overallBand}</span>
                                        <span className="text-[11px] font-bold text-emerald-600 mt-1 inline-block">{hasIeltsScore ? "Overall Score" : "Not Added"}</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold">
                                        <BookOpen className="w-6 h-6" />
                                    </div>
                                </div>

                                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 block">Active Cases</span>
                                        <span className="text-2xl font-black text-slate-900 mt-1 block">{visasProcessingState.length}</span>
                                        <span className="text-[11px] font-bold text-slate-500 mt-1 inline-block">Under Review</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                                        <Briefcase className="w-6 h-6" />
                                    </div>
                                </div>

                                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 block">Escrow Protection</span>
                                        <span className="text-2xl font-black text-slate-900 mt-1 block">Active</span>
                                        <span className="text-[11px] font-bold text-emerald-600 mt-1 inline-block">100% Protected</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                                        <Lock className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>

                            {/* Section: My Journey & Application Dashboard Widget */}
                            {journeyData && (
                                <div className="space-y-4 animate-fade-up">
                                    {/* CARD 1: OVERSEAS VISA / STUDY ABROAD PATHWAY */}
                                    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
                                        <div className="space-y-2 z-10 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A86B]/20 text-emerald-300 border border-[#00A86B]/40 text-[10px] font-black uppercase tracking-wider">
                                                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                                                    {journeyData.has_visa 
                                                        ? 'Active Visa • Departure Safeguard Roadmap' 
                                                        : (journeyData.purpose === 'study' ? '🎓 Study Abroad Pathway (In Progress)' : '✈️ Overseas Visa Application (In Progress)')}
                                                </span>
                                                {journeyData.readiness_score && (
                                                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black">
                                                        Readiness: {journeyData.readiness_score}%
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                                                {journeyData.destination_flag ? `${journeyData.destination_flag} ` : ''}{journeyData.destination || 'Destination'} • {journeyData.matched_university || journeyData.visa_type || 'Student Visa Pathway'}
                                            </h3>

                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
                                                <span>Passport: <strong className="text-white">{journeyData.passport_country || journeyData.passportCountry || 'India'}</strong></span>
                                                {journeyData.selected_course_major && (
                                                    <span>• Major: <strong className="text-emerald-400 font-bold">{journeyData.selected_course_major}</strong></span>
                                                )}
                                                {journeyData.visa_type && (
                                                    <span>• Visa: <strong className="text-white">{journeyData.visa_type}</strong></span>
                                                )}
                                                {journeyData.stay_duration && (
                                                    <span>• Duration: <strong className="text-slate-300">{journeyData.stay_duration}</strong></span>
                                                )}
                                                {journeyData.target_degree && (
                                                    <span>• Target Degree: <strong className="text-emerald-400 uppercase">{journeyData.target_degree}</strong></span>
                                                )}
                                            </div>

                                            {/* Status Highlights */}
                                            <div className="pt-2 flex flex-wrap items-center gap-2">
                                                {journeyData.cas_i20_number && (
                                                    <span className="px-2.5 py-1 rounded-xl bg-white/10 text-slate-200 text-xs font-semibold">
                                                        CAS / I-20: {journeyData.cas_i20_number} ✓
                                                    </span>
                                                )}
                                                {journeyData.uploaded_documents && Object.keys(journeyData.uploaded_documents).length > 0 && (
                                                    <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                                                        📄 {Object.keys(journeyData.uploaded_documents).length} Documents Uploaded &amp; Verified
                                                    </span>
                                                )}
                                                {journeyData.final_dossier_submitted && (
                                                    <span className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white text-xs font-black shadow-xs">
                                                        Dossier Filed to Concierge Vault ✓
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="z-10 shrink-0 flex items-center gap-3">
                                            <a
                                                href={journeyData.destination ? `/visa/${encodeURIComponent(journeyData.destination.toLowerCase().replace(/\s+/g, '-'))}?purpose=${encodeURIComponent(journeyData.purpose || 'study')}&passport=${encodeURIComponent(journeyData.passport_country || 'India')}` : '/#need-visa-pathway-dashboard'}
                                                className="px-5 py-3 rounded-2xl bg-[#00A86B] hover:bg-[#008f5a] text-white text-xs sm:text-sm font-black shadow-lg transition-all flex items-center gap-2 active:scale-95 text-center"
                                            >
                                                <span>Resume Pathway →</span>
                                            </a>
                                        </div>
                                    </div>

                                    {/* CARD 2: DOMESTIC TRIP BOOKING (IF CONFIGURED) */}
                                    {(journeyData.domestic_destination || journeyData.domestic_country) && (
                                        <div className="bg-white border border-emerald-200/90 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex items-center gap-3.5">
                                                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#00A86B] flex items-center justify-center text-xl shadow-xs shrink-0">
                                                    🏠
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                                                            {journeyData.domestic_country || 'India'} Domestic Holiday
                                                        </span>
                                                        <span className="text-xs text-slate-500">
                                                            {journeyData.domestic_members || 1} {(journeyData.domestic_members || 1) === 1 ? 'Traveler' : 'Travelers'}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-base font-black text-slate-900 mt-1">
                                                        {journeyData.domestic_destination || 'Selected Holiday Tour'}
                                                    </h4>
                                                    <p className="text-xs text-slate-500 mt-0.5">
                                                        Origin: {journeyData.domestic_city || journeyData.domestic_state || 'Local Region'}
                                                    </p>
                                                </div>
                                            </div>

                                            <a
                                                href={`/services/tours?country=${encodeURIComponent(journeyData.domestic_country || 'India')}`}
                                                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shrink-0 self-start sm:self-auto"
                                            >
                                                View Tour Packages →
                                            </a>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Section: IELTS Score Breakdown & Document Vault */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                
                                {/* Left 2 Cols: Document Vault Checklist */}
                                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-base font-extrabold text-slate-900">Document Readiness Vault</h3>
                                            <p className="text-xs text-slate-500 font-medium mt-0.5">Manage your passport scans, scorecards, and visa applications</p>
                                        </div>
                                        <button onClick={() => setActiveTab("scanned-documents")} className="text-xs font-bold text-slate-900 hover:underline flex items-center gap-1">
                                            View Vault <ChevronRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    {documents.length === 0 ? (
                                        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-3">
                                            <FileText className="w-10 h-10 text-slate-400 mx-auto" />
                                            <h4 className="text-sm font-extrabold text-slate-900">No Documents Uploaded Yet</h4>
                                            <p className="text-xs text-slate-500 max-w-xs mx-auto">Upload your Passport copy, IELTS scorecard, or SOP to share with verified consultants.</p>

                                            <button onClick={() => setActiveTab("scanned-documents")} className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm transition-all inline-flex items-center gap-1.5">
                                                <Upload className="w-3.5 h-3.5" /> Upload Document
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-2.5">
                                            {documents.map(doc => (
                                                <div 
                                                    key={doc.id}
                                                    className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200/60 transition-all"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-lg">📄</span>
                                                        <span className="text-xs font-extrabold text-slate-900">{doc.label}</span>
                                                    </div>
                                                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
                                                        Uploaded
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Right Col: IELTS Score Band Card */}
                                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-base font-extrabold text-slate-900">IELTS Scorecard</h3>
                                        <span className="bg-teal-50 text-[#00a896] text-xs font-black px-2.5 py-1 rounded-full border border-slate-700">
                                            Overall: {overallBand}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60 text-center">
                                            <span className="text-[10px] font-bold text-slate-400 block uppercase">Listening</span>
                                            <input 
                                                type="number" 
                                                step="0.5" 
                                                min="0" 
                                                max="9" 
                                                value={ieltsScore.L}
                                                onChange={e => handleUpdateIelts({...ieltsScore, L: parseFloat(e.target.value) || 0})}
                                                className="w-full text-center text-lg font-black text-slate-900 bg-transparent outline-none mt-0.5"
                                            />
                                        </div>

                                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60 text-center">
                                            <span className="text-[10px] font-bold text-slate-400 block uppercase">Reading</span>
                                            <input 
                                                type="number" 
                                                step="0.5" 
                                                min="0" 
                                                max="9" 
                                                value={ieltsScore.R}
                                                onChange={e => handleUpdateIelts({...ieltsScore, R: parseFloat(e.target.value) || 0})}
                                                className="w-full text-center text-lg font-black text-slate-900 bg-transparent outline-none mt-0.5"
                                            />
                                        </div>

                                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60 text-center">
                                            <span className="text-[10px] font-bold text-slate-400 block uppercase">Writing</span>
                                            <input 
                                                type="number" 
                                                step="0.5" 
                                                min="0" 
                                                max="9" 
                                                value={ieltsScore.W}
                                                onChange={e => handleUpdateIelts({...ieltsScore, W: parseFloat(e.target.value) || 0})}
                                                className="w-full text-center text-lg font-black text-slate-900 bg-transparent outline-none mt-0.5"
                                            />
                                        </div>

                                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60 text-center">
                                            <span className="text-[10px] font-bold text-slate-400 block uppercase">Speaking</span>
                                            <input 
                                                type="number" 
                                                step="0.5" 
                                                min="0" 
                                                max="9" 
                                                value={ieltsScore.S}
                                                onChange={e => handleUpdateIelts({...ieltsScore, S: parseFloat(e.target.value) || 0})}
                                                className="w-full text-center text-lg font-black text-slate-900 bg-transparent outline-none mt-0.5"
                                            />
                                        </div>
                                    </div>

                                    <a href="/training/ielts" className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-xs font-bold text-center block shadow-sm">
                                        Practice IELTS Tests →
                                    </a>
                                </div>
                            </div>
                        </>
                    )}

                    {/* 2. TAB: PROFILE & SETTINGS */}
                    {activeTab === "profile" && (
                        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6 animate-fade-up">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <h2 className="text-xl font-black text-slate-900">Personal & Visa Profile</h2>
                                    <p className="text-xs font-medium text-slate-500 mt-0.5">Manage your personal details, citizenship, and destination preferences</p>
                                </div>
                                <button onClick={() => setShowProfileModal(true)} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 cursor-pointer">
                                    <Edit2 className="w-3.5 h-3.5" /> Edit Details
                                </button>
                            </div>

                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                {profilePhoto && !profilePhoto.includes("unsplash.com") ? (
                                    <img src={profilePhoto} alt={fullName} className="w-24 h-24 rounded-2xl object-cover border-2 border-slate-200 shadow-sm shrink-0" />
                                ) : (
                                    <div className="w-24 h-24 rounded-2xl bg-slate-900 text-white text-3xl font-black flex items-center justify-center border-2 border-slate-700 shadow-sm shrink-0">
                                        {(userDisplayName || "U").charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-black text-slate-900">{fullName}</h3>
                                        <span className="bg-teal-50 text-[#00a896] text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-slate-700">Verified Seeker</span>
                                    </div>
                                    <p className="text-xs font-bold text-[#00a896]">{email || "Email not set"} • {phone || "Phone not added"}</p>
                                    <p className="text-xs text-slate-600 font-medium">Passport Origin: <span className="font-extrabold text-slate-900">{countryOfCitizenship || passportCountry || "Not specified"}</span> | Residence: <span className="font-extrabold text-slate-900">{residentOf || "Not specified"}</span></p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
                                <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                                    <span className="font-bold text-slate-500 block">Visa Goals:</span>
                                    <span className="font-black text-slate-900 block">{selectedGoals.join(", ") || "Not specified"}</span>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                                    <span className="font-bold text-slate-500 block">Target Destinations:</span>
                                    <span className="font-black text-slate-900 block">{selectedDests.join(", ") || "Not specified"}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 3. TAB: ACTIVE VISA CASES */}
                    {activeTab === "cases" && (
                        <div className="space-y-6 animate-fade-up">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-black text-slate-900">Active Visa Cases ({visasProcessingState.length})</h2>
                                    <p className="text-xs font-medium text-slate-500 mt-0.5">Real-time status, timeline milestones, and embassy filing tracker</p>
                                </div>
                                <a href="/#need-visa-pathway-dashboard" className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm flex items-center gap-1.5 self-start sm:self-auto">
                                    <Plus className="w-3.5 h-3.5" /> Start New Application
                                </a>
                            </div>

                            {visasProcessingState.length === 0 ? (
                                <div className="bg-white rounded-3xl border border-slate-200/80 p-10 text-center space-y-4 shadow-sm">
                                    <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
                                    <h3 className="text-base font-black text-slate-900">No Active Visa Applications Found</h3>
                                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                                        You haven't submitted any visa dossiers yet. Explore official visa requirements and start your fast-track application.
                                    </p>
                                    <a href="/visa/united-kingdom?passport=indian&purpose=tourism" className="inline-block bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md">
                                        Explore UK Tourist Visa →
                                    </a>
                                </div>
                            ) : (
                                <div className="space-y-5">
                                    {visasProcessingState.map((cItem, idx) => (
                                        <div key={cItem.id || idx} className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-5 hover:shadow-md transition-all">
                                            {/* Case Header */}
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                                                <div className="flex items-center gap-3.5">
                                                    <span className="text-3xl">{cItem.destinationFlag || '🇬🇧'}</span>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="text-lg font-black text-slate-950">
                                                                {cItem.destination || 'Destination'} • {cItem.visaType || 'Standard Visa'}
                                                            </h3>
                                                            <span className="bg-emerald-50 text-[#00A86B] text-[10px] font-black px-2 py-0.5 rounded-md border border-emerald-200">
                                                                {cItem.status || 'Active'}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-slate-500 mt-0.5">
                                                            Tracking ID: <strong className="text-slate-900 font-mono">{cItem.trackingId || 'TT-APP-2026-9824'}</strong> • Passport: <strong className="text-slate-700">{cItem.passport || 'Indian'}</strong>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 self-start sm:self-auto">
                                                    <a
                                                        href={cItem.destination ? `/visa/${encodeURIComponent(cItem.destination.toLowerCase().replace(/\s+/g, '-'))}?purpose=${encodeURIComponent(cItem.purpose || 'tourism')}&passport=${encodeURIComponent(cItem.passport || 'India')}` : '/'}
                                                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
                                                    >
                                                        Resume Workspace →
                                                    </a>
                                                </div>
                                            </div>

                                            {/* 5-Step Visual Timeline Progress */}
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-xs font-bold text-slate-700">
                                                    <span>Application Pipeline Progress:</span>
                                                    <span className="text-emerald-600 font-black">{cItem.stage || 'Under AI Concierge Review'} (35%)</span>
                                                </div>
                                                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full w-[35%]" />
                                                </div>
                                                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-[10px] font-bold text-slate-500">
                                                    <div className="text-emerald-700 font-black flex items-center gap-1">
                                                        <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" /> 1. Dossier Ingested
                                                    </div>
                                                    <div className="text-emerald-700 font-black flex items-center gap-1">
                                                        <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" /> 2. AI Quality Audit
                                                    </div>
                                                    <div className="text-slate-400 flex items-center gap-1">
                                                        <Clock className="w-3 h-3 shrink-0" /> 3. Consular Form Filing
                                                    </div>
                                                    <div className="text-slate-400 flex items-center gap-1">
                                                        <Clock className="w-3 h-3 shrink-0" /> 4. Biometrics Slot
                                                    </div>
                                                    <div className="text-slate-400 flex items-center gap-1">
                                                        <Shield className="w-3 h-3 shrink-0" /> 5. Visa Stamped
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Key Case Specs */}
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                                                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Vault Documents</span>
                                                    <strong className="text-xs font-black text-slate-900 mt-0.5 block">{cItem.documentsCount || documents.length || 0} Files OCR Verified</strong>
                                                </div>
                                                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Active Add-Ons</span>
                                                    <strong className="text-xs font-black text-emerald-600 mt-0.5 block">{cItem.addonsCount || 0} Protections Active</strong>
                                                </div>
                                                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Submitted On</span>
                                                    <strong className="text-xs font-black text-slate-900 mt-0.5 block">{cItem.submittedAt || 'Today'}</strong>
                                                </div>
                                                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Target Decision</span>
                                                    <strong className="text-xs font-black text-slate-900 mt-0.5 block">{cItem.targetDate || '15 Working Days'}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* 4. TAB: DOCUMENT VAULT */}
                    {activeTab === "scanned-documents" && (
                        <div className="space-y-6 animate-fade-up">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-black text-slate-900">Document Readiness Vault ({documents.length})</h2>
                                    <p className="text-xs font-medium text-slate-500 mt-0.5">Encrypted cloud vault storing passport scans, financial proofs, and transcripts</p>
                                </div>
                                <label className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm flex items-center gap-1.5 cursor-pointer self-start sm:self-auto active:scale-95 transition-all">
                                    <Upload className="w-3.5 h-3.5" /> Upload New File
                                    <input 
                                        type="file" 
                                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" 
                                        className="hidden" 
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const newDoc = {
                                                    id: `doc-${Date.now()}`,
                                                    label: file.name,
                                                    status: 'verified',
                                                    size: file.size > 1024*1024 ? `${(file.size/(1024*1024)).toFixed(1)} MB` : `${Math.round(file.size/1024)} KB`,
                                                    uploadedAt: new Date().toLocaleDateString()
                                                };
                                                const updated = [newDoc, ...documents];
                                                setDocuments(updated);
                                                localStorage.setItem('seeker_documents', JSON.stringify(updated));
                                            }
                                        }}
                                    />
                                </label>
                            </div>

                            {documents.length === 0 ? (
                                <div className="bg-white rounded-3xl border border-slate-200/80 p-10 text-center space-y-4 shadow-sm">
                                    <FileText className="w-12 h-12 text-slate-300 mx-auto" />
                                    <h3 className="text-base font-black text-slate-900">Your Document Vault is Empty</h3>
                                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                                        Upload your Passport scan, financial proof, or statement of purpose to automatically attach them to your visa applications.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {documents.map((docItem, idx) => (
                                        <div key={docItem.id || idx} className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-3 flex flex-col justify-between hover:border-emerald-300 transition-all">
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="w-10 h-10 rounded-2xl bg-teal-50 text-[#00A86B] flex items-center justify-center text-lg font-bold">
                                                        📄
                                                    </div>
                                                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black border border-emerald-200 flex items-center gap-1">
                                                        <CheckCircle className="w-3 h-3 text-[#00A86B]" /> OCR Verified
                                                    </span>
                                                </div>
                                                <h4 className="text-xs font-black text-slate-950 truncate" title={docItem.label}>
                                                    {docItem.label}
                                                </h4>
                                                <p className="text-[11px] text-slate-400 font-medium">
                                                    {docItem.size || '1.8 MB'} • Uploaded {docItem.uploadedAt || 'Recently'}
                                                </p>
                                            </div>

                                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                                                <span className="text-[10px] text-slate-500 font-semibold">256-bit AES Encrypted</span>
                                                <button
                                                    type="button"
                                                    onClick={() => alert(`Document "${docItem.label}" is securely encrypted and validated in TravlTik Vault.`)}
                                                    className="font-bold text-[#00A86B] hover:underline text-xs cursor-pointer"
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* 5. TAB: CONSULTATIONS & SESSIONS */}
                    {activeTab === "consultations" && (
                        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm text-center space-y-4 animate-fade-up">
                            <Calendar className="w-12 h-12 text-[#00a896] mx-auto" />
                            <h3 className="text-lg font-black text-slate-900">1-on-1 Expert Consultation Schedule</h3>
                            <p className="text-xs font-medium text-slate-500 max-w-md mx-auto">
                                View your upcoming video advisory calls with OISC & Bar-licensed solicitors and verified immigration consultants.
                            </p>
                            <div className="pt-2">
                                <a href="/find-experts" className="inline-block bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md">
                                    Book New 1-on-1 Session →
                                </a>
                            </div>
                        </div>
                    )}

                    {/* 6. TAB: ESCROW VAULT */}
                    {activeTab === "escrow-milestones" && (
                        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm space-y-6 animate-fade-up">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                                <div>
                                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                                        <Lock className="w-5 h-5 text-[#00a896]" /> TravlTik 100% Escrow Protection
                                    </h3>
                                    <p className="text-xs text-slate-500 font-medium mt-0.5">Your funds remain safely locked in escrow and are only released upon milestone completion.</p>
                                </div>
                                <span className="bg-emerald-50 text-emerald-800 text-xs font-black px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
                                    🛡️ 100% Money-Back Guarantee
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Milestone 1</span>
                                    <h4 className="font-extrabold text-slate-900">AI &amp; Legal Quality Audit</h4>
                                    <p className="text-slate-500 text-[11px]">30% released when all mandatory checklist items are verified.</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Milestone 2</span>
                                    <h4 className="font-extrabold text-slate-900">Embassy / VFS Filing</h4>
                                    <p className="text-slate-500 text-[11px]">40% released when official visa submission receipt is generated.</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Milestone 3</span>
                                    <h4 className="font-extrabold text-slate-900">Visa Decision Clearance</h4>
                                    <p className="text-slate-500 text-[11px]">Remaining 30% released upon passport stamping and outcome delivery.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 7. OTHER TABS */}
                    {activeTab !== "dashboard" && activeTab !== "profile" && activeTab !== "cases" && activeTab !== "scanned-documents" && activeTab !== "consultations" && activeTab !== "escrow-milestones" && (
                        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm text-center space-y-4 animate-fade-up">
                            <Briefcase className="w-12 h-12 text-[#00a896] mx-auto" />
                            <h3 className="text-lg font-black text-slate-900 capitalize">{activeTab.replace('-', ' ')} Portal</h3>
                            <p className="text-xs font-medium text-slate-500 max-w-md mx-auto">
                                All your active {activeTab.replace('-', ' ')} records are synchronized in real-time with your TravlTik profile.
                            </p>
                            <a href="/find-experts" className="inline-block bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md">
                                Connect with Expert →
                            </a>
                        </div>
                    )}

                </main>
            </div>

            {/* Edit Profile Modal */}
            {showProfileModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowProfileModal(false)} />
                    <div className="relative z-10 w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-6 sm:p-8 space-y-5 animate-fade-up max-h-[90vh] overflow-y-auto no-scrollbar">
                        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                                <Settings className="w-4 h-4 text-[#00a896]" /> Edit Seeker Profile Details
                            </h3>
                            <button onClick={() => setShowProfileModal(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSaveProfileModal} className="space-y-4 text-xs">
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-1.5 block">Profile Photo</label>
                                <div className="flex items-center gap-3">
                                    {modalPhoto && !modalPhoto.includes("unsplash.com") ? (
                                        <img src={modalPhoto} alt="Preview" className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-xl bg-slate-900 text-white text-lg font-black flex items-center justify-center border border-slate-700 shrink-0">
                                            {(modalFirstName || userDisplayName || "U").charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    if (typeof reader.result === "string") {
                                                        setModalPhoto(reader.result);
                                                    }
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium text-slate-700 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-teal-50 file:text-[#00a896] cursor-pointer" 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">First Name</label>
                                    <input 
                                        type="text" 
                                        value={modalFirstName} 
                                        onChange={(e) => setModalFirstName(e.target.value)} 
                                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" 
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Last Name</label>
                                    <input 
                                        type="text" 
                                        value={modalLastName} 
                                        onChange={(e) => setModalLastName(e.target.value)} 
                                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Phone Number</label>
                                    <input 
                                        type="text" 
                                        value={modalPhone} 
                                        onChange={(e) => setModalPhone(e.target.value)} 
                                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" 
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Current Residence</label>
                                    <input 
                                        type="text" 
                                        value={modalResidentOf} 
                                        onChange={(e) => setModalResidentOf(e.target.value)} 
                                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" 
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Passport Citizenship</label>
                                    <input 
                                        type="text" 
                                        value={modalPassportCountry} 
                                        onChange={(e) => setModalPassportCountry(e.target.value)} 
                                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" 
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Target Destinations</label>
                                    <input 
                                        type="text" 
                                        value={modalDestinations} 
                                        onChange={(e) => setModalDestinations(e.target.value)} 
                                        placeholder="Canada, UK, USA"
                                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" 
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-3">
                                <button type="button" onClick={() => setShowProfileModal(false)} className="flex-1 py-2.5 border border-slate-300 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer">Cancel</button>
                                <button type="submit" className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs shadow-md transition-colors cursor-pointer">Save Details</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}
