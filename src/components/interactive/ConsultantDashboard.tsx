import { useState, useEffect } from "react";
import { 
    DollarSign, Users, CheckCircle, Clock, TrendingUp, BarChart3, GripVertical, 
    Settings, X, Save, Edit2, Globe, Sparkles, ArrowLeft, LogOut, LayoutDashboard, 
    Menu, Briefcase, Calendar, Plus, ChevronRight, ChevronDown, Bell, Search, Lock, 
    FileText, LayoutGrid, Star, ShieldCheck, CheckSquare, MessageSquare, Camera, Upload, Trash2, Image, ArrowUpRight, HelpCircle, Eye, AlertTriangle, ExternalLink, Megaphone, User
} from "lucide-react";

export function ConsultantDashboard() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [timePeriod, setTimePeriod] = useState("May 1 – May 31, 2025");
    const [timePeriodOpen, setTimePeriodOpen] = useState(false);

    // Profile Settings States
    const [profile, setProfile] = useState({
        name: "GlobalWay Immigration",
        role: "Immigration Consultancy Firm",
        city: "Hyderabad, India",
        experience: 10,
        bio: "Leading immigration and visa advisory consultancy firm helping thousands of students and professionals study and work abroad.",
        specializations: "Canada, UK, USA, Australia, Germany, NZ",
        countries: "12 Countries",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
    });

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("Action saved successfully!");

    // Temp Form States for Modal
    const [formName, setFormName] = useState(profile.name);
    const [formRole, setFormRole] = useState(profile.role);
    const [formCity, setFormCity] = useState(profile.city);
    const [formBio, setFormBio] = useState(profile.bio);
    const [formSpecs, setFormSpecs] = useState(profile.specializations);
    const [formCountries, setFormCountries] = useState(profile.countries);
    const [formImage, setFormImage] = useState(profile.image);

    // Action Modal States for Post an Ad & Special Offer
    const [isPostingAd, setIsPostingAd] = useState(false);
    const [isPublishingOffer, setIsPublishingOffer] = useState(false);
    
    // Form states for Post an Ad
    const [adTitle, setAdTitle] = useState("");
    const [adCategory, setAdCategory] = useState("Study Abroad");
    const [adPrice, setAdPrice] = useState("FREE");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const userStr = localStorage.getItem("visaformula_user");
            const isLoggedInExpert = localStorage.getItem("expert_isLoggedIn");
            const seekerFirst = localStorage.getItem("seeker_firstName");
            if (seekerFirst && isLoggedInExpert !== "true") {
                window.location.href = "/dashboard";
                return;
            }
            if (userStr) {
                try {
                    const u = JSON.parse(userStr);
                    if (u && u.type === "seeker") {
                        window.location.href = "/dashboard";
                        return;
                    }
                } catch(e) {}
            }

            const firstName = localStorage.getItem("expert_firstName") || "";
            const lastName = localStorage.getItem("expert_lastName") || "";
            const storedName = (firstName || lastName) ? `${firstName} ${lastName}`.trim() : "";
            const bizName = localStorage.getItem("expert_businessName") || "";
            const finalName = bizName || storedName || "GlobalWay Immigration";
            const role = localStorage.getItem("expert_advisorType") || "Immigration Consultancy Firm";
            const city = localStorage.getItem("expert_officeAddress") || "Hyderabad, India";
            const bio = localStorage.getItem("expert_aboutMe") || profile.bio;
            const image = localStorage.getItem("expert_profilePhoto") || profile.image;
            
            const loadedSpecs = (() => {
                try {
                    const tags = localStorage.getItem("expert_expertiseTags");
                    if (tags) {
                        const parsed = JSON.parse(tags);
                        if (Array.isArray(parsed)) return parsed.join(", ");
                    }
                } catch(e) {}
                return profile.specializations;
            })() || profile.specializations;

            const loadedCountries = localStorage.getItem("expert_countriesExpertise") || profile.countries;

            setProfile({
                name: finalName,
                role: role,
                city: city,
                experience: 10,
                bio: bio,
                specializations: loadedSpecs,
                countries: loadedCountries,
                image: image
            });

            setFormName(finalName);
            setFormRole(role);
            setFormCity(city);
            setFormBio(bio);
            setFormSpecs(loadedSpecs);
            setFormCountries(loadedCountries);
            setFormImage(image);
        }
    }, []);

    const triggerToast = (msg: string) => {
        setToastMessage(msg);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
    };

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedProfile = {
            name: formName,
            role: formRole,
            city: formCity,
            experience: 10,
            bio: formBio,
            specializations: formSpecs,
            countries: formCountries,
            image: formImage
        };
        setProfile(updatedProfile);

        localStorage.setItem("expert_businessName", formName);
        localStorage.setItem("expert_advisorType", formRole);
        localStorage.setItem("expert_officeAddress", formCity);
        localStorage.setItem("expert_aboutMe", formBio);
        localStorage.setItem("expert_expertiseTags", JSON.stringify(formSpecs.split(",").map(s => s.trim())));
        localStorage.setItem("expert_countriesExpertise", formCountries);
        localStorage.setItem("expert_profilePhoto", formImage);

        setIsEditingProfile(false);
        triggerToast("Profile details updated successfully!");
    };

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("expert_isLoggedIn");
            localStorage.removeItem("expert_email");
            localStorage.removeItem("visaformula_user");
            window.location.href = "/signup/expert";
        }
    };

    // Navigation Menu Specification
    const navItems = [
        { id: "overview", label: "Dashboard", icon: LayoutDashboard },
        { id: "profile", label: "Profile & Business", icon: User },
        { id: "leads", label: "Leads", icon: Users, badge: "12" },
        { id: "enquiries", label: "Enquiries", icon: MessageSquare },
        { id: "services", label: "My Services", icon: Briefcase },
        { id: "classifieds", label: "Classifieds / Offers", icon: LayoutGrid, badge: "3" },
        { id: "reviews", label: "Reviews & Ratings", icon: Star },
        { id: "promotions", label: "Promotions", icon: Sparkles },
        { id: "analytics", label: "Analytics", icon: BarChart3 },
        { id: "disputes", label: "Disputes", icon: ShieldCheck, badge: "1" },
        { id: "messages", label: "Messages", icon: Bell, badge: "2" },
        { id: "subscriptions", label: "Subscriptions", icon: DollarSign },
        { id: "settings", label: "Settings", icon: Settings },
        { id: "help", label: "Help & Support", icon: HelpCircle },
    ];

    return (
        <div className="min-h-screen bg-[#f4f6f9] font-sora flex flex-col text-slate-900 selection:bg-[#00a896] selection:text-white">
            
            {/* Success Notification Toast */}
            {showSuccessToast && (
                <div className="fixed top-5 right-5 z-[99999] bg-[#00a896] text-white px-5 py-3 rounded-2xl shadow-xl font-bold text-xs flex items-center gap-2 animate-bounce">
                    <CheckCircle className="w-4 h-4 text-white" />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Top Fixed Header Navbar */}
            <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 px-4 py-3 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-3">
                    {/* Brand Logo & Title */}
                    <a href="/" className="flex items-center gap-2.5">
                        <img src="/logo.png" alt="VisaFormula Logo" className="h-8 w-auto object-contain" />
                        <div className="hidden sm:block border-l border-slate-200 pl-3">
                            <span className="text-xs font-black tracking-tight text-slate-900 block leading-none">VisaFormula</span>
                            <span className="text-[10px] font-bold text-slate-500 block mt-0.5">Consultant Panel</span>
                        </div>
                    </a>
                    
                    <button 
                        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} 
                        className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 lg:hidden ml-2"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>

                {/* Right Controls Header */}
                <div className="flex items-center gap-3 sm:gap-4">
                    {/* Help Icon */}
                    <button className="w-9 h-9 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors">
                        <HelpCircle className="w-4.5 h-4.5" />
                    </button>

                    {/* Notification Bell Badge */}
                    <button className="w-9 h-9 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors relative">
                        <Bell className="w-4.5 h-4.5" />
                        <span className="w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-extrabold flex items-center justify-center absolute -top-0.5 -right-0.5 border-2 border-white">2</span>
                    </button>

                    {/* User Profile Pill */}
                    <div className="flex items-center gap-2.5 pl-2 sm:border-l sm:border-slate-200">
                        <img src={profile.image} alt={profile.name} className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0" />
                        <div className="hidden md:block text-left">
                            <h4 className="text-xs font-extrabold text-slate-900 leading-tight truncate max-w-[140px]">{profile.name}</h4>
                            <span className="inline-block bg-teal-50 text-[#00a896] text-[10px] font-bold px-1.5 py-0.2 rounded border border-teal-200/80 mt-0.5">Basic Plan</span>
                        </div>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                    </div>
                </div>
            </header>

            <div className="flex flex-1 min-h-[calc(100vh-61px)]">

                {/* Left Sidebar Navigation */}
                <aside className={`hidden lg:flex bg-white border-r border-slate-200/80 flex-col justify-between transition-all duration-300 z-30 shrink-0 select-none ${isSidebarCollapsed ? "w-20" : "w-64"}`}>
                    <div className="p-3 space-y-1">
                        {navItems.map(item => {
                            const isActive = activeTab === item.id;
                            const IconComp = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        if (item.id === "logout") {
                                            handleLogout();
                                        } else {
                                            setActiveTab(item.id);
                                        }
                                    }}
                                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                                        isActive
                                            ? "bg-[#00a896] text-white shadow-md"
                                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                    }`}
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <IconComp className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-500"}`} />
                                        {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                                    </div>
                                    {!isSidebarCollapsed && item.badge && (
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${isActive ? "bg-white/20 text-white" : "bg-teal-100 text-[#00a896]"}`}>
                                            {item.badge}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs text-rose-600 hover:bg-rose-50 transition-all mt-4"
                        >
                            <LogOut className="w-4 h-4 shrink-0 text-rose-500" />
                            {!isSidebarCollapsed && <span>Logout</span>}
                        </button>
                    </div>

                    {/* Sidebar Upgrade Card */}
                    {!isSidebarCollapsed && (
                        <div className="p-4 m-3 bg-[#f0fdfa] border border-[#ccfbf1] rounded-2xl space-y-3">
                            <h4 className="text-xs font-extrabold text-slate-900">Upgrade to Premium</h4>
                            <ul className="text-[11px] font-semibold text-slate-600 space-y-1">
                                <li className="flex items-center gap-1.5"><span className="text-[#00a896] font-bold">•</span> More leads</li>
                                <li className="flex items-center gap-1.5"><span className="text-[#00a896] font-bold">•</span> Featured listing</li>
                                <li className="flex items-center gap-1.5"><span className="text-[#00a896] font-bold">•</span> Advanced analytics</li>
                                <li className="flex items-center gap-1.5"><span className="text-[#00a896] font-bold">•</span> Priority support</li>
                            </ul>
                            <button 
                                onClick={() => triggerToast("Redirecting to Premium Upgrade Plan...")}
                                className="w-full bg-[#00a896] hover:bg-[#008f80] text-white font-bold py-2 px-3 rounded-xl text-xs shadow-sm transition-all cursor-pointer"
                            >
                                Upgrade Now
                            </button>
                        </div>
                    )}
                </aside>

                {/* Mobile Drawer Navigation */}
                <div className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${isMobileSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsMobileSidebarOpen(false)} />
                    <aside className={`absolute top-0 left-0 w-72 h-full bg-white shadow-2xl flex flex-col justify-between p-4 transform transition-transform duration-300 overflow-y-auto ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                <img src="/logo.png" alt="VisaFormula" className="h-7 w-auto object-contain" />
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
                                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                                                isActive
                                                    ? "bg-[#00a896] text-white shadow-md"
                                                    : "text-slate-600 hover:bg-slate-100"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <IconComp className="w-4 h-4" />
                                                <span>{item.label}</span>
                                            </div>
                                            {item.badge && (
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${isActive ? "bg-white/20 text-white" : "bg-teal-100 text-[#00a896]"}`}>
                                                    {item.badge}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs text-rose-600 hover:bg-rose-50 transition-all mt-4"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </button>
                            </nav>
                        </div>
                    </aside>
                </div>

                {/* Main Content Workspace */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">

                    {activeTab === "overview" && (
                        <>
                            {/* Dashboard Overview Title & Date Range */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
                                </div>
                                <div className="relative">
                                    <button 
                                        onClick={() => setTimePeriodOpen(!timePeriodOpen)}
                                        className="bg-white border border-slate-200/90 hover:border-slate-300 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2 shadow-2xs cursor-pointer"
                                    >
                                        <span>{timePeriod}</span>
                                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                    </button>
                                    {timePeriodOpen && (
                                        <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50 w-44 font-sora text-xs">
                                            {["May 1 – May 31, 2025", "Last 7 Days", "Last 30 Days", "This Year 2025"].map(p => (
                                                <button 
                                                    key={p} 
                                                    onClick={() => { setTimePeriod(p); setTimePeriodOpen(false); }}
                                                    className="w-full text-left px-4 py-2 font-semibold hover:bg-slate-50 text-slate-700"
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Section 1: Top 5 Stat Metric Cards */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                                {/* Stat 1: Total Leads */}
                                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center">
                                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#00a896] mb-3">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <span className="text-2xl font-black text-slate-900 leading-tight">12</span>
                                    <span className="text-xs font-bold text-slate-500 mt-1">Total Leads</span>
                                </div>

                                {/* Stat 2: New Enquiries */}
                                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center">
                                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#00a896] mb-3">
                                        <MessageSquare className="w-5 h-5" />
                                    </div>
                                    <span className="text-2xl font-black text-slate-900 leading-tight">8</span>
                                    <span className="text-xs font-bold text-slate-500 mt-1">New Enquiries</span>
                                </div>

                                {/* Stat 3: Profile Views */}
                                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center">
                                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#00a896] mb-3">
                                        <Eye className="w-5 h-5" />
                                    </div>
                                    <span className="text-2xl font-black text-slate-900 leading-tight">5</span>
                                    <span className="text-xs font-bold text-slate-500 mt-1">Profile Views<br/><span className="text-[10px] font-medium text-slate-400">This Month</span></span>
                                </div>

                                {/* Stat 4: Avg Rating */}
                                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center">
                                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 mb-3">
                                        <Star className="w-5 h-5 fill-amber-400" />
                                    </div>
                                    <span className="text-2xl font-black text-slate-900 leading-tight">4.3</span>
                                    <span className="text-xs font-bold text-slate-500 mt-1">Avg. Rating</span>
                                </div>

                                {/* Stat 5: Ongoing Disputes */}
                                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center col-span-2 sm:col-span-1">
                                    <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mb-3">
                                        <AlertTriangle className="w-5 h-5" />
                                    </div>
                                    <span className="text-2xl font-black text-slate-900 leading-tight">1</span>
                                    <span className="text-xs font-bold text-slate-500 mt-1">Ongoing Disputes</span>
                                </div>
                            </div>

                            {/* Section 2: Middle Row 1 (Leads Overview, Recent Enquiries, Profile Strength) */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                {/* Left 5 Cols: Leads Overview Line Chart */}
                                <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-extrabold text-slate-900">Leads Overview</h3>
                                        <div className="flex items-center gap-3 text-[10.5px] font-bold">
                                            <span className="flex items-center gap-1.5 text-cyan-600"><span className="w-2 h-2 rounded-full bg-cyan-500" /> New Enquiries</span>
                                            <span className="flex items-center gap-1.5 text-indigo-600"><span className="w-2 h-2 rounded-full bg-indigo-500" /> Qualified Leads</span>
                                        </div>
                                    </div>

                                    {/* SVG Custom Interactive Trendline Graph */}
                                    <div className="h-44 w-full relative pt-2">
                                        <svg viewBox="0 0 300 120" className="w-full h-full overflow-visible">
                                            {/* Grid Lines */}
                                            <line x1="0" y1="20" x2="300" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                                            <line x1="0" y1="50" x2="300" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                                            <line x1="0" y1="80" x2="300" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                                            <line x1="0" y1="110" x2="300" y2="110" stroke="#f1f5f9" strokeWidth="1" />

                                            {/* Qualified Leads Curve (Indigo) */}
                                            <path 
                                                d="M 10 100 L 60 70 L 110 60 L 160 80 L 210 75 L 280 40" 
                                                fill="none" 
                                                stroke="#6366f1" 
                                                strokeWidth="2.5" 
                                                strokeLinecap="round" 
                                            />
                                            {[
                                                {x:10, y:100}, {x:60, y:70}, {x:110, y:60}, {x:160, y:80}, {x:210, y:75}, {x:280, y:40}
                                            ].map((pt, i) => (
                                                <circle key={i} cx={pt.x} cy={pt.y} r="3" fill="#6366f1" />
                                            ))}

                                            {/* New Enquiries Curve (Cyan) */}
                                            <path 
                                                d="M 10 110 L 60 90 L 110 85 L 160 95 L 210 88 L 280 65" 
                                                fill="none" 
                                                stroke="#06b6d4" 
                                                strokeWidth="2.5" 
                                                strokeLinecap="round" 
                                            />
                                            {[
                                                {x:10, y:110}, {x:60, y:90}, {x:110, y:85}, {x:160, y:95}, {x:210, y:88}, {x:280, y:65}
                                            ].map((pt, i) => (
                                                <circle key={i} cx={pt.x} cy={pt.y} r="3" fill="#06b6d4" />
                                            ))}
                                        </svg>

                                        {/* X Axis Labels */}
                                        <div className="flex justify-between text-[9.5px] font-bold text-slate-400 mt-2 px-1">
                                            <span>May 1</span>
                                            <span>May 8</span>
                                            <span>May 15</span>
                                            <span>May 22</span>
                                            <span>May 31</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Middle 4 Cols: Recent Enquiries */}
                                <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-extrabold text-slate-900">Recent Enquiries</h3>
                                        <button onClick={() => setActiveTab("enquiries")} className="text-xs font-bold text-[#00a896] hover:underline">View All</button>
                                    </div>

                                    <div className="space-y-3">
                                        {/* Enquiry 1 */}
                                        <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100">
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg">🇨🇦</span>
                                                <div>
                                                    <h4 className="text-xs font-extrabold text-slate-900">Canada Study Visa</h4>
                                                    <span className="text-[10px] font-medium text-slate-400">May 30, 2025</span>
                                                </div>
                                            </div>
                                            <span className="bg-amber-500 text-white text-[9.5px] font-extrabold px-2.5 py-0.5 rounded-md">New</span>
                                        </div>

                                        {/* Enquiry 2 */}
                                        <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100">
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg">🇬🇧</span>
                                                <div>
                                                    <h4 className="text-xs font-extrabold text-slate-900">UK Visitor Visa</h4>
                                                    <span className="text-[10px] font-medium text-slate-400">May 29, 2025</span>
                                                </div>
                                            </div>
                                            <span className="bg-amber-500 text-white text-[9.5px] font-extrabold px-2.5 py-0.5 rounded-md">New</span>
                                        </div>

                                        {/* Enquiry 3 */}
                                        <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100">
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg">🇦🇺</span>
                                                <div>
                                                    <h4 className="text-xs font-extrabold text-slate-900">Australia PR</h4>
                                                    <span className="text-[10px] font-medium text-slate-400">May 28, 2025</span>
                                                </div>
                                            </div>
                                            <span className="bg-blue-100 text-blue-700 text-[9.5px] font-extrabold px-2.5 py-0.5 rounded-md">Contacted</span>
                                        </div>

                                        {/* Enquiry 4 */}
                                        <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100">
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg">🇺🇸</span>
                                                <div>
                                                    <h4 className="text-xs font-extrabold text-slate-900">USA Tourist Visa</h4>
                                                    <span className="text-[10px] font-medium text-slate-400">May 27, 2025</span>
                                                </div>
                                            </div>
                                            <span className="bg-slate-100 text-slate-600 text-[9.5px] font-extrabold px-2.5 py-0.5 rounded-md">Closed</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right 3 Cols: Profile Strength */}
                                <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between items-center text-center">
                                    <div className="w-full text-left">
                                        <h3 className="text-sm font-extrabold text-slate-900">Profile Strength</h3>
                                    </div>

                                    {/* Radial Progress Gauge Ring */}
                                    <div className="relative w-28 h-28 my-2 flex items-center justify-center">
                                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                            <path
                                                className="text-slate-100"
                                                strokeWidth="3.5"
                                                stroke="currentColor"
                                                fill="none"
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                            <path
                                                className="text-[#00a896]"
                                                strokeDasharray="70, 100"
                                                strokeWidth="3.5"
                                                strokeLinecap="round"
                                                stroke="currentColor"
                                                fill="none"
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                        </svg>
                                        <span className="absolute text-xl font-black text-slate-900">70%</span>
                                    </div>

                                    <div className="space-y-1">
                                        <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block">Good</span>
                                        <p className="text-[11px] font-medium text-slate-500 max-w-[180px] mx-auto">Improve your profile to get more leads.</p>
                                    </div>

                                    <button onClick={() => setIsEditingProfile(true)} className="text-xs font-bold text-[#00a896] hover:underline flex items-center gap-1 mt-2">
                                        <span>Improve Profile</span>
                                        <span>&rarr;</span>
                                    </button>
                                </div>
                            </div>

                            {/* Section 3: My Classifieds / Offers Card (Full Width Grid) */}
                            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-base font-black text-slate-900">My Classifieds / Offers</h3>
                                    <button onClick={() => setActiveTab("classifieds")} className="text-xs font-bold text-[#00a896] hover:underline">View All</button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {/* Item 1 */}
                                    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                                        <div>
                                            <div className="h-32 w-full relative overflow-hidden">
                                                <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=400&auto=format&fit=crop" alt="Study in Canada" className="w-full h-full object-cover" />
                                                <span className="absolute top-2 left-2 bg-[#00a896] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-sm">
                                                    Study Abroad
                                                </span>
                                            </div>
                                            <div className="p-3.5 space-y-1.5">
                                                <h4 className="text-xs font-extrabold text-slate-900 leading-snug line-clamp-2">Study in Canada 2025 Intake Open</h4>
                                                <p className="text-xs font-black text-[#00a896]">₹ Free</p>
                                            </div>
                                        </div>
                                        <div className="p-3.5 pt-0 flex items-center justify-between border-t border-slate-100 text-[11px] font-bold text-slate-500">
                                            <span className="text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-md">Active</span>
                                            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-slate-400" /> 124</span>
                                        </div>
                                    </div>

                                    {/* Item 2 */}
                                    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                                        <div>
                                            <div className="h-32 w-full relative overflow-hidden">
                                                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop" alt="Caregiver Jobs" className="w-full h-full object-cover" />
                                                <span className="absolute top-2 left-2 bg-[#d97706] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-sm">
                                                    Job Abroad
                                                </span>
                                            </div>
                                            <div className="p-3.5 space-y-1.5">
                                                <h4 className="text-xs font-extrabold text-slate-900 leading-snug line-clamp-2">Caregiver Jobs in Canada</h4>
                                                <p className="text-xs font-black text-[#00a896]">₹ Free</p>
                                            </div>
                                        </div>
                                        <div className="p-3.5 pt-0 flex items-center justify-between border-t border-slate-100 text-[11px] font-bold text-slate-500">
                                            <span className="text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-md">Active</span>
                                            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-slate-400" /> 98</span>
                                        </div>
                                    </div>

                                    {/* Item 3 */}
                                    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                                        <div>
                                            <div className="h-32 w-full relative overflow-hidden">
                                                <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400&auto=format&fit=crop" alt="Accommodation" className="w-full h-full object-cover" />
                                                <span className="absolute top-2 left-2 bg-[#059669] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-sm">
                                                    Accommodation
                                                </span>
                                            </div>
                                            <div className="p-3.5 space-y-1.5">
                                                <h4 className="text-xs font-extrabold text-slate-900 leading-snug line-clamp-2">Shared Accommodation in Toronto</h4>
                                                <p className="text-xs font-black text-slate-900">₹ 650 CAD / Month</p>
                                            </div>
                                        </div>
                                        <div className="p-3.5 pt-0 flex items-center justify-between border-t border-slate-100 text-[11px] font-bold text-slate-500">
                                            <span className="text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-md">Active</span>
                                            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-slate-400" /> 76</span>
                                        </div>
                                    </div>

                                    {/* Item 4 */}
                                    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                                        <div>
                                            <div className="h-32 w-full relative overflow-hidden">
                                                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400&auto=format&fit=crop" alt="Business Opportunity" className="w-full h-full object-cover" />
                                                <span className="absolute top-2 left-2 bg-[#0c1a2e] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-sm">
                                                    Business Opportunity
                                                </span>
                                            </div>
                                            <div className="p-3.5 space-y-1.5">
                                                <h4 className="text-xs font-extrabold text-slate-900 leading-snug line-clamp-2">Visa Consultancy Business for Sale</h4>
                                                <p className="text-xs font-black text-slate-900">₹ 12,00,000</p>
                                            </div>
                                        </div>
                                        <div className="p-3.5 pt-0 flex items-center justify-between border-t border-slate-100 text-[11px] font-bold text-slate-500">
                                            <span className="text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-md">Active</span>
                                            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-slate-400" /> 65</span>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => setIsPostingAd(true)} 
                                    className="w-full py-3 bg-[#f0fdfa] hover:bg-[#e6fffa] border border-[#00a896] text-[#00a896] rounded-xl text-xs font-extrabold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Post New Classified / Offer</span>
                                </button>
                            </div>

                            {/* Section 4: Middle Row 2 (Reviews & Ratings, Ongoing Disputes, Promote Your Business) */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                {/* Left 4 Cols: Reviews & Ratings */}
                                <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-extrabold text-slate-900">Reviews & Ratings</h3>
                                        <button onClick={() => setActiveTab("reviews")} className="text-xs font-bold text-[#00a896] hover:underline">View All</button>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl font-black text-slate-900">4.3</span>
                                        <div>
                                            <div className="flex items-center gap-0.5 text-amber-400">
                                                <Star className="w-4 h-4 fill-amber-400" />
                                                <Star className="w-4 h-4 fill-amber-400" />
                                                <Star className="w-4 h-4 fill-amber-400" />
                                                <Star className="w-4 h-4 fill-amber-400" />
                                                <Star className="w-4 h-4 text-slate-300" />
                                            </div>
                                            <span className="text-xs font-bold text-slate-500 mt-0.5 block">(28 Reviews)</span>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5 pt-2">
                                        {[
                                            { star: "5 ★", count: 18, pct: "65%", color: "bg-[#00a896]" },
                                            { star: "4 ★", count: 6, pct: "25%", color: "bg-[#00a896]" },
                                            { star: "3 ★", count: 2, pct: "10%", color: "bg-amber-500" },
                                            { star: "2 ★", count: 1, pct: "5%", color: "bg-orange-500" },
                                            { star: "1 ★", count: 1, pct: "5%", color: "bg-rose-500" },
                                        ].map(r => (
                                            <div key={r.star} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                                <span className="w-6 text-slate-500">{r.star}</span>
                                                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                                                    <div className={`h-full ${r.color}`} style={{ width: r.pct }} />
                                                </div>
                                                <span className="w-5 text-right text-slate-500">{r.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Middle 4 Cols: Ongoing Disputes */}
                                <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-extrabold text-slate-900">Ongoing Disputes</h3>
                                        <button onClick={() => setActiveTab("disputes")} className="text-xs font-bold text-[#00a896] hover:underline">View All</button>
                                    </div>

                                    <div className="space-y-3">
                                        {/* Dispute 1 */}
                                        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-black text-slate-900">Dispute #D-2025-0012</span>
                                                <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md">Under Review</span>
                                            </div>
                                            <p className="text-[11px] font-semibold text-slate-600">Client: Rahul Sharma</p>
                                            <p className="text-[11px] font-semibold text-slate-500">Issue: Service not as described</p>
                                            <p className="text-[10px] font-medium text-slate-400">Raised on: May 20, 2025</p>
                                        </div>

                                        {/* Dispute 2 */}
                                        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-black text-slate-900">Dispute #D-2025-0008</span>
                                                <span className="bg-blue-100 text-blue-700 text-[10px] font-extrabold px-2 py-0.5 rounded-md">In Progress</span>
                                            </div>
                                            <p className="text-[11px] font-semibold text-slate-600">Client: Neha Verma</p>
                                            <p className="text-[11px] font-semibold text-slate-500">Issue: Refund not processed</p>
                                            <p className="text-[10px] font-medium text-slate-400">Raised on: May 10, 2025</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right 4 Cols: Promote Your Business */}
                                <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between space-y-4">
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-extrabold text-slate-900">Promote Your Business</h3>
                                        <p className="text-xs font-medium text-slate-500">Get more visibility on VisaFormula home page</p>

                                        <div className="flex items-center justify-between pt-2">
                                            <ul className="text-xs font-bold text-slate-700 space-y-1.5">
                                                <li className="flex items-center gap-1.5 text-emerald-600"><CheckCircle className="w-3.5 h-3.5" /> Featured Listing</li>
                                                <li className="flex items-center gap-1.5 text-emerald-600"><CheckCircle className="w-3.5 h-3.5" /> Top Position</li>
                                                <li className="flex items-center gap-1.5 text-emerald-600"><CheckCircle className="w-3.5 h-3.5" /> More Leads</li>
                                            </ul>
                                            <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#00a896] shrink-0">
                                                <Megaphone className="w-7 h-7" />
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => setIsPublishingOffer(true)} 
                                        className="w-full bg-[#00a896] hover:bg-[#008f80] text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md transition-all cursor-pointer"
                                    >
                                        Promote Now
                                    </button>
                                </div>
                            </div>

                            {/* Section 5: Bottom Business Details Footer Card */}
                            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
                                <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-3">Business Details</h3>

                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
                                    {/* Detail 1 */}
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="font-extrabold text-slate-900">{profile.name}</span>
                                            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-1.5 py-0.2 rounded border border-emerald-200">✔ Verified</span>
                                        </div>
                                        <span className="text-slate-500 font-medium mt-0.5 block">{profile.city}</span>
                                    </div>

                                    {/* Detail 2 */}
                                    <div>
                                        <span className="text-slate-400 font-bold block text-[10.5px]">Established</span>
                                        <span className="font-extrabold text-slate-900 block mt-0.5">2015</span>
                                    </div>

                                    {/* Detail 3 */}
                                    <div>
                                        <span className="text-slate-400 font-bold block text-[10.5px]">Services</span>
                                        <span className="font-extrabold text-slate-900 block mt-0.5">{profile.countries}</span>
                                    </div>

                                    {/* Detail 4 */}
                                    <div>
                                        <span className="text-slate-400 font-bold block text-[10.5px]">Team Size</span>
                                        <span className="font-extrabold text-slate-900 block mt-0.5">8 Members</span>
                                    </div>

                                    {/* Detail 5 */}
                                    <div>
                                        <span className="text-slate-400 font-bold block text-[10.5px]">Languages</span>
                                        <span className="font-extrabold text-slate-900 block mt-0.5">English, Hindi, Telugu</span>
                                    </div>

                                    {/* Detail 6 */}
                                    <div>
                                        <span className="text-slate-400 font-bold block text-[10.5px]">Website</span>
                                        <a href="https://globalway.com" target="_blank" rel="noreferrer" className="font-extrabold text-[#00a896] hover:underline flex items-center gap-1 mt-0.5">
                                            <span>www.globalway.com</span>
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 pt-3 text-center text-xs font-semibold text-slate-500">
                                    Need help? Visit our <a href="#" className="text-[#00a896] font-bold hover:underline">Help Center</a> or <a href="#" className="text-[#00a896] font-bold hover:underline">Contact Support</a>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Placeholder Views for Other Sidebar Navigation Tabs */}
                    {activeTab !== "overview" && (
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-2xs space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <h2 className="text-lg font-black text-slate-900 capitalize">{navItems.find(i => i.id === activeTab)?.label || activeTab}</h2>
                                    <p className="text-xs font-medium text-slate-500">Manage your consultant account details and active listings</p>
                                </div>
                                <button onClick={() => setIsEditingProfile(true)} className="bg-[#00a896] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm">
                                    Edit Settings
                                </button>
                            </div>
                            <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200/70 space-y-2">
                                <p className="text-sm font-extrabold text-slate-700">Content for {activeTab.toUpperCase()} tab is loaded.</p>
                                <p className="text-xs font-medium text-slate-500">All data synced with live database.</p>
                            </div>
                        </div>
                    )}

                </main>
            </div>

            {/* Profile Edit Modal */}
            {isEditingProfile && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsEditingProfile(false)} />
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 z-10 font-sora">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h3 className="text-base font-extrabold text-slate-900">Edit Business & Profile Details</h3>
                            <button onClick={() => setIsEditingProfile(false)} className="p-1 text-slate-400 hover:text-slate-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSaveProfile} className="space-y-3">
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-1 block">Business / Consultancy Name</label>
                                <input 
                                    type="text" 
                                    value={formName} 
                                    onChange={(e) => setFormName(e.target.value)} 
                                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" 
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-1 block">Type of Business</label>
                                <select 
                                    value={formRole} 
                                    onChange={(e) => setFormRole(e.target.value)}
                                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black"
                                >
                                    <option value="Immigration Consultancy Firm">Immigration Consultancy Firm</option>
                                    <option value="Freelancer">Freelancer</option>
                                    <option value="Law Firm / Legal Practice">Law Firm / Legal Practice</option>
                                    <option value="Education & Student Agency">Education & Student Agency</option>
                                    <option value="Recruitment & Manpower Agency">Recruitment & Manpower Agency</option>
                                    <option value="Travel & Tour Agency">Travel & Tour Agency</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-1 block">Office Location / Address</label>
                                <input 
                                    type="text" 
                                    value={formCity} 
                                    onChange={(e) => setFormCity(e.target.value)} 
                                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" 
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-1 block">About Consultancy & Bio</label>
                                <textarea 
                                    rows={3} 
                                    value={formBio} 
                                    onChange={(e) => setFormBio(e.target.value)} 
                                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-black" 
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setIsEditingProfile(false)} className="flex-1 py-2.5 border border-slate-300 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-50">Cancel</button>
                                <button type="submit" className="flex-1 py-2.5 bg-[#00a896] hover:bg-[#008f80] text-white font-bold rounded-xl text-xs shadow-md">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Post an Ad / Offer Modal */}
            {(isPostingAd || isPublishingOffer) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => { setIsPostingAd(false); setIsPublishingOffer(false); }} />
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 z-10 font-sora">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h3 className="text-base font-extrabold text-slate-900">{isPostingAd ? "Post New Classified / Offer" : "Promote Your Business"}</h3>
                            <button onClick={() => { setIsPostingAd(false); setIsPublishingOffer(false); }} className="p-1 text-slate-400 hover:text-slate-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); setIsPostingAd(false); setIsPublishingOffer(false); triggerToast("Listing published on VisaFormula!"); }} className="space-y-3">
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-1 block">Title / Heading *</label>
                                <input type="text" placeholder="e.g. Study in Canada 2025 Special Deal" className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" required />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-1 block">Category *</label>
                                <select className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black">
                                    <option value="Study Abroad">Study Abroad</option>
                                    <option value="Jobs Abroad">Jobs Abroad</option>
                                    <option value="Accommodation">Accommodation</option>
                                    <option value="Business Opportunity">Business Opportunity</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-1 block">Price / Tagline</label>
                                <input type="text" placeholder="e.g. FREE or ₹ 650 CAD / Month" className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => { setIsPostingAd(false); setIsPublishingOffer(false); }} className="flex-1 py-2.5 border border-slate-300 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-50">Cancel</button>
                                <button type="submit" className="flex-1 py-2.5 bg-[#00a896] text-white font-bold rounded-xl text-xs shadow-md">Publish Listing</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
