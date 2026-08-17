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
                    if (u && u.email) setEmail(u.email);
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
        <div className="min-h-screen bg-[#f8fafc] font-sans flex flex-col text-slate-800 antialiased selection:bg-[#00a896] selection:text-white">
            
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
                    <a href="/find-experts" className="hidden sm:flex items-center gap-1.5 bg-[#00a896] hover:bg-[#008f80] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm">
                        <Plus className="w-3.5 h-3.5" /> Book Consultation
                    </a>

                    <button onClick={() => setActiveTab("consultations")} className="w-9 h-9 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors relative">
                        <Bell className="w-4.5 h-4.5" />
                    </button>

                    <div className="flex items-center gap-2.5 pl-2 sm:border-l sm:border-slate-200 cursor-pointer" onClick={() => setActiveTab("profile")}>
                        {profilePhoto && !profilePhoto.includes("unsplash.com") ? (
                            <img src={profilePhoto} alt={fullName} className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0" />
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-[#00a896] text-white text-sm font-black flex items-center justify-center border border-teal-200 shrink-0 shadow-2xs">
                                {(userDisplayName || "U").charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div className="hidden md:block text-left">
                            <h4 className="text-xs font-extrabold text-slate-900 leading-tight truncate max-w-[140px]">{fullName}</h4>
                            <span className="inline-block bg-teal-50 text-[#00a896] text-[10px] font-bold px-1.5 py-0.2 rounded border border-teal-200/80 mt-0.5">Visa Seeker</span>
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
                                                ? "bg-[#00a896] text-white shadow-md"
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
                                                    ? "bg-[#00a896] text-white shadow-md"
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
                                    <a href="/find-experts" className="bg-[#00a896] hover:bg-[#008f80] text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm flex items-center gap-1.5">
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

                            {/* Section: IELTS Score Breakdown & Document Vault */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                
                                {/* Left 2 Cols: Document Vault Checklist */}
                                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-base font-extrabold text-slate-900">Document Readiness Vault</h3>
                                            <p className="text-xs text-slate-500 font-medium mt-0.5">Manage your passport scans, scorecards, and visa applications</p>
                                        </div>
                                        <button onClick={() => setActiveTab("scanned-documents")} className="text-xs font-bold text-[#00a896] hover:underline flex items-center gap-1">
                                            View Vault <ChevronRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    {documents.length === 0 ? (
                                        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-3">
                                            <FileText className="w-10 h-10 text-slate-400 mx-auto" />
                                            <h4 className="text-sm font-extrabold text-slate-900">No Documents Uploaded Yet</h4>
                                            <p className="text-xs text-slate-500 max-w-xs mx-auto">Upload your Passport copy, IELTS scorecard, or SOP to share with verified consultants.</p>
                                            <button onClick={() => setActiveTab("scanned-documents")} className="bg-[#00a896] hover:bg-[#008f80] text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm transition-all inline-flex items-center gap-1.5">
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
                                        <span className="bg-teal-50 text-[#00a896] text-xs font-black px-2.5 py-1 rounded-full border border-teal-200">
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

                                    <a href="/training/ielts" className="w-full bg-[#00a896] hover:bg-[#008f80] text-white py-2.5 rounded-xl text-xs font-bold text-center block shadow-sm">
                                        Practice IELTS Tests →
                                    </a>
                                </div>
                            </div>
                        </>
                    )}

                    {/* 2. TAB: PROFILE & SETTINGS */}
                    {activeTab === "profile" && (
                        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <h2 className="text-xl font-black text-slate-900">Personal & Visa Profile</h2>
                                    <p className="text-xs font-medium text-slate-500 mt-0.5">Manage your personal details, citizenship, and destination preferences</p>
                                </div>
                                <button onClick={() => setShowProfileModal(true)} className="bg-[#00a896] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5">
                                    <Edit2 className="w-3.5 h-3.5" /> Edit Details
                                </button>
                            </div>

                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                {profilePhoto && !profilePhoto.includes("unsplash.com") ? (
                                    <img src={profilePhoto} alt={fullName} className="w-24 h-24 rounded-2xl object-cover border-2 border-slate-200 shadow-sm shrink-0" />
                                ) : (
                                    <div className="w-24 h-24 rounded-2xl bg-[#00a896] text-white text-3xl font-black flex items-center justify-center border-2 border-teal-200 shadow-sm shrink-0">
                                        {(userDisplayName || "U").charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-black text-slate-900">{fullName}</h3>
                                        <span className="bg-teal-50 text-[#00a896] text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-teal-200">Verified Seeker</span>
                                    </div>
                                    <p className="text-xs font-bold text-[#00a896]">{email || "Email not set"} • {phone || "Phone not added"}</p>
                                    <p className="text-xs text-slate-600 font-medium">Passport Origin: <span className="font-extrabold text-slate-900">{countryOfCitizenship || "Not specified"}</span> | Residence: <span className="font-extrabold text-slate-900">{residentOf || "Not specified"}</span></p>
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

                    {/* OTHER TABS */}
                    {activeTab !== "dashboard" && activeTab !== "profile" && (
                        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm text-center space-y-4">
                            <Briefcase className="w-12 h-12 text-[#00a896] mx-auto" />
                            <h3 className="text-lg font-black text-slate-900 capitalize">{activeTab.replace('-', ' ')} Portal</h3>
                            <p className="text-xs font-medium text-slate-500 max-w-md mx-auto">
                                All your active {activeTab.replace('-', ' ')} records are synchronized in real-time with your assigned immigration consultant.
                            </p>
                            <a href="/find-experts" className="inline-block bg-[#00a896] hover:bg-[#008f80] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md">
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
                            <button onClick={() => setShowProfileModal(false)} className="p-1 text-slate-400 hover:text-slate-700">
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
                                        <div className="w-12 h-12 rounded-xl bg-[#00a896] text-white text-lg font-black flex items-center justify-center border border-teal-200 shrink-0">
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
                                <button type="button" onClick={() => setShowProfileModal(false)} className="flex-1 py-2.5 border border-slate-300 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-50 transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 py-2.5 bg-[#00a896] hover:bg-[#008f80] text-white rounded-xl font-bold text-xs shadow-md transition-colors">Save Details</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}
