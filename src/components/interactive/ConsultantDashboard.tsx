import { useState, useEffect } from "react";
import { 
    DollarSign, Users, CheckCircle, Clock, TrendingUp, BarChart3, GripVertical, 
    Settings, X, Save, Edit2, Globe, Sparkles, ArrowLeft, LogOut, LayoutDashboard, 
    Menu, Briefcase, Calendar, Plus, ChevronRight, ChevronDown, Bell, Search, Lock, 
    FileText, LayoutGrid, Star, ShieldCheck, CheckSquare, MessageSquare, Camera, Upload, Trash2, Image, ArrowUpRight
} from "lucide-react";

const statsData = [
    { label: "Active Clients", value: "0 Clients", change: "0%", color: "text-slate-600 bg-slate-50 border-slate-200" },
    { label: "Total Earnings & Escrow", value: "₹0", change: "₹0 Escrow", color: "text-slate-600 bg-slate-50 border-slate-200" },
    { label: "Booked Consultations", value: "0 Sessions", change: "0 Upcoming", color: "text-slate-600 bg-slate-50 border-slate-200" },
    { label: "Client Rating & Reviews", value: "5.0 ★", change: "⭐ (0 Reviews)", color: "text-amber-700 bg-amber-50 border-amber-200/60" },
];

interface CardItem {
    name: string;
    visa: string;
    days: number;
    urgent: boolean;
}

interface Column {
    id: string;
    title: string;
    color: string;
    cards: CardItem[];
}

const initialColumns: Column[] = [
    { id: "new", title: "New Requests", color: "border-blue-400", cards: [] },
    { id: "waiting", title: "Waiting on Client", color: "border-amber-400", cards: [] },
    { id: "processing", title: "Processing & Filing", color: "border-indigo-400", cards: [] },
    { id: "completed", title: "Completed & Approved", color: "border-emerald-400", cards: [] },
];

const initialServicesData = [
    { name: "Initial Consultation (30 min)", price: "₹2,500", active: true },
    { name: "Full Visa Application Support", price: "₹15,000", active: true },
    { name: "Document & SOP Review", price: "₹3,500", active: true },
    { name: "Appeal Filing & Legal Guidance", price: "₹25,000", active: true },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = ["9 AM", "10 AM", "11 AM", "12 PM", "2 PM", "3 PM", "4 PM", "5 PM"];

// Real category revenue distribution data
const categoriesData = [
    { label: "Full Visa Support", percent: "35%", color: "#3b82f6" },
    { label: "PR & Express Entry", percent: "25%", color: "#8b5cf6" },
    { label: "Initial Consultations", percent: "15%", color: "#a855f7" },
    { label: "SOP & LOR Review", percent: "12%", color: "#ec4899" },
    { label: "Appeal & Refusal Support", percent: "8%", color: "#f43f5e" },
    { label: "VFS & Appointment Prep", percent: "5%", color: "#10b981" },
];

// Real client distribution by country
const countriesData = [
    { name: "Canada", percent: "32%" },
    { name: "United States (USA)", percent: "25%" },
    { name: "United Kingdom (UK)", percent: "18%" },
    { name: "Australia", percent: "12%" },
    { name: "Germany", percent: "8%" },
    { name: "UAE & Middle East", percent: "5%" },
];

// Dual vertical bar chart data
const barChartData = [
    { day: "1 Jul", gross: 35, rev: 25 },
    { day: "2 Jul", gross: 42, rev: 38 },
    { day: "3 Jul", gross: 28, rev: 45 },
    { day: "4 Jul", gross: 45, rev: 52 },
    { day: "5 Jul", gross: 55, rev: 40 },
    { day: "6 Jul", gross: 68, rev: 72, tooltip: true },
    { day: "7 Jul", gross: 32, rev: 44 },
    { day: "8 Jul", gross: 48, rev: 55 },
    { day: "9 Jul", gross: 38, rev: 42 },
    { day: "10 Jul", gross: 58, rev: 62 },
    { day: "11 Jul", gross: 44, rev: 50 },
    { day: "12 Jul", gross: 65, rev: 70 },
];

export function ConsultantDashboard() {
    const [availability, setAvailability] = useState<Record<string, boolean>>({
        "Mon-9 AM": true, "Mon-10 AM": true, "Mon-11 AM": true,
        "Tue-9 AM": true, "Tue-10 AM": true, "Tue-2 PM": true,
        "Wed-9 AM": true, "Wed-3 PM": true, "Wed-4 PM": true,
        "Thu-10 AM": true, "Thu-11 AM": true,
        "Fri-9 AM": true, "Fri-10 AM": true, "Fri-11 AM": true, "Fri-2 PM": true,
    });

    const [services, setServices] = useState(initialServicesData);
    const [columns, setColumns] = useState(initialColumns);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [timePeriod, setTimePeriod] = useState("Last 30 days");
    const [timePeriodOpen, setTimePeriodOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Profile Settings States
    const [profile, setProfile] = useState({
        name: "Immigration Expert",
        role: "Registered Consultant",
        city: "Delhi, India",
        experience: 8,
        bio: "Licensed Immigration Consultant providing verified guidance for Student, Work, and PR visas.",
        specializations: "Canada PR, USA H-1B, UK Student Visa",
        countries: "Canada, USA, UK, Australia, Germany",
        image: ""
    });

    // Temp Form States for Modal
    const [formName, setFormName] = useState("");
    const [formRole, setFormRole] = useState("");
    const [formCity, setFormCity] = useState("");
    const [formExperience, setFormExperience] = useState(8);
    const [formBio, setFormBio] = useState("");
    const [formSpecs, setFormSpecs] = useState("");
    const [formCountries, setFormCountries] = useState("");
    const [formImage, setFormImage] = useState("");

    // Action Modal States for Post an Ad & Special Offer
    const [isPostingAd, setIsPostingAd] = useState(false);
    const [isPublishingOffer, setIsPublishingOffer] = useState(false);
    
    // Form states for Post an Ad
    const [adTitle, setAdTitle] = useState("");
    const [adTargetCountry, setAdTargetCountry] = useState("Canada");
    const [adAudience, setAdAudience] = useState("Student Visa Applicants");
    const [adBudget, setAdBudget] = useState("7 Days Featured");

    // Form states for Special Offer
    const [offerTitle, setOfferTitle] = useState("");
    const [offerDiscount, setOfferDiscount] = useState("20% OFF");
    const [offerCode, setOfferCode] = useState("VISA2026");

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
            const finalName = storedName || bizName || "Immigration Expert";
            const role = localStorage.getItem("expert_advisorType") || "Registered Consultant";
            const city = localStorage.getItem("expert_officeAddress") || "Delhi, India";
            const bio = localStorage.getItem("expert_aboutMe") || "Licensed Immigration Consultant providing verified guidance for Student, Work, and PR visas.";
            const image = localStorage.getItem("expert_profilePhoto") || "";
            
            const loadedSpecs = (() => {
                try {
                    const tags = localStorage.getItem("expert_expertiseTags");
                    if (tags) {
                        const parsed = JSON.parse(tags);
                        if (Array.isArray(parsed)) return parsed.join(", ");
                    }
                } catch(e) {}
                return "";
            })() || "Canada PR, USA H-1B, UK Student Visa";

            const loadedCountries = localStorage.getItem("expert_countriesExpertise") || "Canada, USA, UK, Australia";
            const expYears = Number(localStorage.getItem("expert_yearsExperience")) || 8;

            // Load saved availability slots if any
            try {
                const savedAvail = localStorage.getItem("expert_availability");
                if (savedAvail) {
                    setAvailability(JSON.parse(savedAvail));
                }
            } catch(e) {}

            setProfile({
                name: finalName,
                role: role,
                city: city,
                experience: expYears,
                bio: bio,
                specializations: loadedSpecs,
                countries: loadedCountries,
                image: image
            });

            setFormName(finalName);
            setFormRole(role);
            setFormCity(city);
            setFormExperience(expYears);
            setFormBio(bio);
            setFormSpecs(loadedSpecs);
            setFormCountries(loadedCountries);
            setFormImage(image);
        }
    }, []);

    const toggleSlot = (key: string) => {
        setAvailability(prev => {
            const updated = { ...prev, [key]: !prev[key] };
            localStorage.setItem("expert_availability", JSON.stringify(updated));
            return updated;
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("Image file size should be less than 5MB");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setFormImage(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedProfile = {
            name: formName,
            role: formRole,
            city: formCity,
            experience: Number(formExperience),
            bio: formBio,
            specializations: formSpecs,
            countries: formCountries,
            image: formImage
        };
        setProfile(updatedProfile);

        // Sync with localStorage database
        localStorage.setItem("expert_businessName", formName);
        localStorage.setItem("expert_advisorType", formRole);
        localStorage.setItem("expert_officeAddress", formCity);
        localStorage.setItem("expert_aboutMe", formBio);
        localStorage.setItem("expert_yearsExperience", String(formExperience));
        localStorage.setItem("expert_expertiseTags", JSON.stringify(formSpecs.split(",").map(s => s.trim())));
        localStorage.setItem("expert_countriesExpertise", formCountries);
        localStorage.setItem("expert_profilePhoto", formImage);

        setIsEditingProfile(false);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
    };

    const handlePostAd = (e: React.FormEvent) => {
        e.preventDefault();
        const newAd = {
            id: Date.now(),
            title: adTitle,
            targetCountry: adTargetCountry,
            audience: adAudience,
            budget: adBudget,
            createdAt: new Date().toLocaleDateString()
        };
        const existing = JSON.parse(localStorage.getItem("expert_activeAds") || "[]");
        localStorage.setItem("expert_activeAds", JSON.stringify([newAd, ...existing]));
        setIsPostingAd(false);
        setAdTitle("");
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
    };

    const handlePublishOffer = (e: React.FormEvent) => {
        e.preventDefault();
        const newOffer = {
            id: Date.now(),
            title: offerTitle,
            discount: offerDiscount,
            code: offerCode,
            createdAt: new Date().toLocaleDateString()
        };
        const existing = JSON.parse(localStorage.getItem("expert_specialOffers") || "[]");
        localStorage.setItem("expert_specialOffers", JSON.stringify([newOffer, ...existing]));
        setIsPublishingOffer(false);
        setOfferTitle("");
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
    };

    const handleLogout = () => {
        localStorage.removeItem("expert_isLoggedIn");
        localStorage.removeItem("visaformula_user");
        window.location.href = "/";
    };

    return (
        <div className="min-h-screen bg-white text-slate-800 font-sans flex overflow-x-hidden antialiased" style={{ fontFamily: "'Roboto', 'Google Sans', system-ui, -apple-system, sans-serif" }}>
            <style dangerouslySetInnerHTML={{__html: `
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Google+Sans:wght@400;500;700&display=swap');
            `}} />

            {/* Success Notification Toast */}
            {showSuccessToast && (
                <div className="fixed bottom-6 right-6 z-[110] bg-slate-900 text-white px-5 py-3 rounded-2xl text-xs font-extrabold shadow-2xl animate-bounce flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Profile saved successfully!
                </div>
            )}
            
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
                        {/* Section 1: CORE WORKSPACE */}
                        <div>
                            {!isSidebarCollapsed && (
                                <p className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">
                                    Core Workspace
                                </p>
                            )}
                            <div className="space-y-1">
                                {[
                                    { id: "overview", label: "Expert Overview", icon: LayoutDashboard },
                                    { id: "pipeline", label: "Client Pipeline", icon: Briefcase },
                                    { id: "availability", label: "Consultation Hours", icon: Calendar },
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

                        {/* Section 2: SERVICES & PRICING */}
                        <div>
                            {!isSidebarCollapsed && (
                                <p className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">
                                    Services & Pricing
                                </p>
                            )}
                            <div className="space-y-1">
                                {[
                                    { id: "services", label: "Packages & Rates", icon: DollarSign },
                                    { id: "earnings-vault", label: "Earnings & Escrow", icon: Lock },
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
                                    onClick={() => setIsEditingProfile(true)}
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
                            <img src={profile.image} alt={profile.name} className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200" />
                            {!isSidebarCollapsed && (
                                <div className="min-w-0">
                                    <h4 className="text-xs font-extrabold text-slate-900 truncate leading-tight flex items-center gap-1">
                                        {profile.name} <ShieldCheck className="w-3.5 h-3.5 text-blue-600 inline" />
                                    </h4>
                                    <p className="text-[10px] font-semibold text-slate-500 truncate">
                                        {profile.role}
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
                                        { id: "overview", label: "Expert Overview", icon: LayoutDashboard },
                                        { id: "pipeline", label: "Client Pipeline", icon: Briefcase },
                                        { id: "availability", label: "Consultation Hours", icon: Calendar },
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
                                <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">Services & Pricing</p>
                                <div className="space-y-1">
                                    {[
                                        { id: "services", label: "Packages & Rates", icon: DollarSign },
                                        { id: "earnings-vault", label: "Earnings & Escrow", icon: Lock },
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
                        {/* Sleek Workspace Indicator Icon Badge — Prominent Readability */}
                        <div className="hidden sm:flex items-center gap-2.5 bg-slate-50 border border-slate-200/90 px-4 py-2 rounded-2xl shadow-2xs">
                            <LayoutDashboard className="w-5.5 h-5.5 text-[#107c41] shrink-0" />
                            <span className="text-sm sm:text-base font-black text-slate-900 capitalize tracking-tight">
                                {activeTab.replace("-", " ")}
                            </span>
                        </div>
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
                        <div className="relative hidden lg:block w-52">
                            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search client cases..."
                                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200/90 rounded-xl text-xs font-semibold outline-none focus:border-[#107c41]"
                            />
                        </div>

                        {/* Post an Ad Button (Exact Flup Pill Design) */}
                        <button 
                            onClick={() => setIsPostingAd(true)} 
                            className="hidden sm:flex items-center gap-1.5 bg-white border border-slate-200/90 hover:border-slate-300 px-3.5 py-2 rounded-2xl text-xs font-extrabold text-slate-900 transition-all shadow-2xs hover:bg-slate-50 cursor-pointer"
                        >
                            <span>Post an Ad</span>
                            <ArrowUpRight className="w-4 h-4 text-slate-400" />
                        </button>

                        {/* Special Offer Button (Exact Flup Black Pill Design) */}
                        <button 
                            onClick={() => setIsPublishingOffer(true)} 
                            className="hidden sm:flex items-center gap-1.5 bg-slate-950 hover:bg-black text-white px-4 py-2 rounded-2xl text-xs font-extrabold transition-all shadow-md cursor-pointer border border-slate-800"
                        >
                            <span>Special Offer</span>
                            <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
                        </button>

                        {/* Notification Bell Button — Perfect Square Badge */}
                        <button className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors relative shrink-0 shadow-2xs">
                            <Bell className="w-4.5 h-4.5 text-slate-700" />
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 absolute top-1.5 right-1.5 border-2 border-white shadow-2xs" />
                        </button>
                    </div>
                </header>

                {/* Dashboard Page Content */}
                <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-[#f8f9fc] flex-1">

                    {activeTab === "overview" ? (
                        <>
                            {/* Top 4 Summary Metric Cards (Flup Reference Header Cards) */}
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
                                {statsData.map((s, idx) => (
                                    <div key={idx} className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs hover:shadow-xs transition-all">
                                        <div className="flex items-center justify-between text-slate-500 mb-2">
                                            <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-500 flex items-center gap-1 truncate">
                                                {s.label}
                                            </span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                                            <span className="text-lg sm:text-xl font-extrabold text-slate-900">
                                                {s.value}
                                            </span>
                                            <span className={`text-[9.5px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-md self-start sm:self-auto border ${s.color}`}>
                                                {s.change}
                                            </span>
                                        </div>
                                    </div>
                                ))}

                                {/* Card 5: Add Data Widget (Flup Reference) */}
                                <div className="col-span-2 sm:col-span-2 lg:col-span-1 bg-slate-50/70 rounded-xl border-2 border-dashed border-slate-200 hover:border-slate-300 p-3 sm:p-4 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all hover:bg-slate-100/60">
                                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow-2xs">
                                        <Plus className="w-4 h-4" />
                                    </div>
                                    <span className="text-xs font-bold text-slate-600">Add custom metric</span>
                                </div>
                            </div>

                            {/* Main Middle Section: Product Sales / Application Processing Dual Bar Chart */}
                            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-2xs space-y-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                                            Consultation Revenue & Client Pipeline
                                        </h2>
                                        <p className="text-xs font-medium text-slate-500">
                                            Monthly breakdown for Advisory Sessions & Escrow Milestones
                                        </p>
                                    </div>

                                    {/* Chart Legend Badges */}
                                    <div className="flex items-center gap-4 text-xs font-bold">
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                                            <span className="text-slate-700">Consultation Sessions</span>
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                            <span className="text-slate-700">Escrow Milestone Payments</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Dual Vertical Bar Chart (Flup Reference Replication) */}
                                <div className="relative pt-6 pb-2 overflow-x-auto">
                                    <div className="h-56 flex items-end justify-between gap-2 sm:gap-4 px-2 border-b border-slate-100 min-w-[520px]">
                                        {barChartData.map((item, idx) => (
                                            <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative h-full justify-end">
                                                
                                                {/* Tooltip Overlay (Flup Reference 6 Jul Style) */}
                                                {item.tooltip && (
                                                    <div className="absolute -top-12 z-20 bg-white border border-slate-200 shadow-lg rounded-xl px-3 py-1.5 text-center whitespace-nowrap animate-bounce-subtle">
                                                        <p className="text-[10px] font-bold text-slate-500">Consultation Revenue</p>
                                                        <p className="text-xs font-extrabold text-slate-900 flex items-center gap-1">
                                                            ₹84,500 <span className="text-[9px] text-emerald-600">📈 4.8%</span>
                                                        </p>
                                                    </div>
                                                )}

                                                <div className="w-full flex items-end justify-center gap-1 h-full">
                                                    {/* Blue Bar */}
                                                    <div 
                                                        className="w-2.5 sm:w-3.5 bg-blue-500 hover:bg-blue-600 rounded-t-sm transition-all duration-300"
                                                        style={{ height: `${(item.gross / 75) * 100}%` }}
                                                    />
                                                    {/* Orange Bar */}
                                                    <div 
                                                        className="w-2.5 sm:w-3.5 bg-amber-500 hover:bg-amber-600 rounded-t-sm transition-all duration-300"
                                                        style={{ height: `${(item.rev / 75) * 100}%` }}
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

                            {/* Bottom Grid: 2 Columns Layout (Flup Reference) */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                
                                {/* Left Column: Sales by Categories / Donut Chart */}
                                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 lg:p-6 shadow-2xs space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                                                Earnings by Service Category
                                            </h3>
                                            <p className="text-xs font-medium text-slate-500">
                                                Revenue share across consultation & filing packages
                                            </p>
                                        </div>
                                    </div>

                                    {/* Donut Chart SVG + Legend Pills */}
                                    <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
                                        <div className="relative w-40 h-40 shrink-0">
                                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                                <path strokeDasharray="35, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3b82f6" strokeWidth="4.5" />
                                                <path strokeDasharray="25, 100" strokeDashoffset="-35" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#8b5cf6" strokeWidth="4.5" />
                                                <path strokeDasharray="15, 100" strokeDashoffset="-60" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#a855f7" strokeWidth="4.5" />
                                                <path strokeDasharray="12, 100" strokeDashoffset="-75" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#ec4899" strokeWidth="4.5" />
                                                <path strokeDasharray="8, 100" strokeDashoffset="-87" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f43f5e" strokeWidth="4.5" />
                                                <path strokeDasharray="5, 100" strokeDashoffset="-95" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="4.5" />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                                <span className="text-xs font-bold text-slate-400">Total Services</span>
                                                <span className="text-lg font-black text-slate-900">₹1.24L</span>
                                            </div>
                                        </div>

                                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                                            {categoriesData.map((cat, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                                                        <span className="text-xs font-bold text-slate-700 truncate">{cat.label}</span>
                                                    </div>
                                                    <span className="text-xs font-extrabold text-slate-900 ml-1">{cat.percent}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Sales by Countries / Globe Ranking List */}
                                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 lg:p-6 shadow-2xs space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                                                Client Distribution by Country
                                            </h3>
                                            <p className="text-xs font-medium text-slate-500">
                                                Demographic location statistics for target destinations
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
                                        {/* Globe Mini Map Graphic */}
                                        <div className="w-36 h-36 rounded-full bg-blue-50/70 border border-blue-100 flex items-center justify-center p-3 shrink-0 relative overflow-hidden shadow-inner">
                                            <Globe className="w-24 h-24 text-blue-500/30 animate-spin-slow" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-[11px] font-black text-blue-900 bg-white/90 px-2 py-0.5 rounded-full shadow-xs">
                                                    50+ Countries
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex-1 space-y-2 w-full">
                                            {countriesData.map((cnt, idx) => (
                                                <div key={idx} className="flex items-center justify-between text-xs font-bold">
                                                    <span className="text-slate-700">{cnt.name}</span>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                                            <div className="bg-blue-600 h-full rounded-full" style={{ width: cnt.percent }} />
                                                        </div>
                                                        <span className="text-slate-900 font-extrabold w-8 text-right">{cnt.percent}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </>
                    ) : activeTab === "pipeline" ? (
                        /* Kanban Client Pipeline View */
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-extrabold text-slate-900">Client Pipeline Kanban</h2>
                                    <p className="text-xs font-medium text-slate-500">Manage client applications from new request to visa completion</p>
                                </div>
                                <button onClick={() => setIsEditingProfile(true)} className="bg-[#107c41] text-white px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm hover:bg-[#0d5c3a] transition-all">
                                    <Plus className="w-4 h-4" /> Add New Client
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {columns.map(col => (
                                    <div key={col.id} className={`bg-white rounded-2xl border-t-4 ${col.color} border border-slate-200/80 p-4 min-h-[320px] shadow-2xs`}>
                                        <h3 className="font-extrabold text-slate-900 mb-3 flex items-center justify-between tracking-wide text-xs">
                                            <span>{col.title}</span>
                                            <span className="w-5 h-5 bg-slate-100 border border-slate-200 rounded-full text-[11px] flex items-center justify-center font-bold text-slate-600">{col.cards.length}</span>
                                        </h3>
                                        <div className="space-y-2.5">
                                            {col.cards.map(card => (
                                                <div key={card.name} className={`bg-white rounded-xl p-3.5 border ${card.urgent ? "border-rose-300 bg-rose-50/20" : "border-slate-200/90"} cursor-grab hover:shadow-md transition-all group`}>
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h4 className="font-extrabold text-slate-900 text-xs">{card.name}</h4>
                                                            <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-bold mt-1.5 inline-block border border-blue-200/60">{card.visa}</span>
                                                        </div>
                                                        <GripVertical className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                    {card.days > 0 && <p className="text-[10px] text-slate-500 font-semibold mt-2.5 flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" /> {card.days}d in stage</p>}
                                                    {card.urgent && <p className="text-[10px] text-rose-600 font-bold mt-1.5">🚨 Priority Review Needed</p>}
                                                </div>
                                            ))}
                                            {col.cards.length === 0 && (
                                                <div className="p-6 border-2 border-dashed border-slate-200 rounded-xl text-center text-slate-400 text-xs font-medium">
                                                    No clients in this stage
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : activeTab === "services" ? (
                        /* Services & Escrow Pricing */
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-extrabold text-slate-900">Service Packages & Escrow Pricing</h2>
                                    <p className="text-xs font-medium text-slate-500">Configure consultation rates and protected milestone fees</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {services.map(s => (
                                    <div key={s.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full ${s.active ? "bg-emerald-500" : "bg-slate-300"}`} />
                                            <span className="text-xs font-bold text-slate-800">{s.name}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-black text-sm text-slate-900">{s.price}</span>
                                            <button className="text-xs text-blue-600 font-bold hover:underline">Edit</button>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full py-3.5 border-2 border-dashed border-slate-200 text-slate-600 font-extrabold text-xs rounded-xl hover:bg-slate-50 transition-colors">
                                    + Add New Custom Package
                                </button>
                            </div>
                        </div>
                    ) : activeTab === "availability" ? (
                        /* Weekly Consultation Availability */
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-6">
                            <div>
                                <h2 className="text-lg font-extrabold text-slate-900">Weekly Consultation Availability</h2>
                                <p className="text-xs font-medium text-slate-500">Select open slots for client booking & video calls</p>
                            </div>
                            <div className="overflow-x-auto">
                                <div className="grid grid-cols-8 gap-2 min-w-[540px]">
                                    <div className="text-xs font-bold text-slate-400 p-2">Time</div>
                                    {weekDays.map(d => <div key={d} className="text-xs font-extrabold text-center text-slate-700 p-2">{d}</div>)}
                                    {timeSlots.map(t => (
                                        <div key={`row-${t}`} className="contents">
                                            <div className="text-[11px] font-bold text-slate-500 p-2 flex items-center">{t}</div>
                                            {weekDays.map(d => {
                                                const key = `${d}-${t}`;
                                                const available = availability[key] || false;
                                                return (
                                                    <button key={key} type="button" onClick={() => toggleSlot(key)}
                                                        className={`p-3 rounded-xl text-xs font-bold transition-all ${available ? "bg-[#e6f4ea] text-[#0d5c3a] border border-emerald-300/60" : "bg-slate-50 text-slate-300 hover:bg-slate-100"
                                                            }`}>
                                                        {available ? "✓" : "–"}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center text-slate-500 font-bold text-sm">
                            Select a section from the sidebar menu to view details.
                        </div>
                    )}

                </div>
            </main>

            {/* Profile Settings Modal Drawer */}
            {isEditingProfile && (
                <div className="fixed inset-0 z-50 flex items-center justify-end">
                    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setIsEditingProfile(false)} />
                    <div className="absolute right-0 top-0 bottom-0 max-w-xl w-full bg-white shadow-2xl overflow-y-auto p-6 md:p-8 flex flex-col z-10">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
                            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                                <Settings className="w-5 h-5 text-[#107c41]" /> Edit Profile Details
                            </h2>
                            <button onClick={() => setIsEditingProfile(false)}><X className="w-5 h-5 text-slate-400 hover:text-slate-900" /></button>
                        </div>

                        <form onSubmit={handleSaveProfile} className="space-y-5 flex-1">
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Full Name / Business Name</label>
                                <input value={formName} onChange={e => setFormName(e.target.value)} required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-[#107c41] text-slate-900" />
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Professional Title / Designation</label>
                                <input value={formRole} onChange={e => setFormRole(e.target.value)} required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-[#107c41] text-slate-900" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">City / Office Location</label>
                                    <input value={formCity} onChange={e => setFormCity(e.target.value)} required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-[#107c41] text-slate-900" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Years of Experience</label>
                                    <input type="number" value={formExperience} onChange={e => setFormExperience(Number(e.target.value))} required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-[#107c41] text-slate-900" />
                                </div>
                            </div>

                            {/* Profile Photo Upload & Preview Widget */}
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">
                                    Profile Photo
                                </label>
                                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center gap-4">
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-black text-white flex items-center justify-center font-extrabold text-xl shadow-xs shrink-0 border-2 border-white ring-2 ring-slate-200">
                                        {formImage ? (
                                            <img src={formImage} alt="Profile Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <span>{(formName || "E").charAt(0).toUpperCase()}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2 flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <label 
                                                htmlFor="expert-photo-file-input" 
                                                className="cursor-pointer bg-[#107c41] hover:bg-[#0d5c3a] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5"
                                            >
                                                <Upload className="w-3.5 h-3.5" /> Upload Photo
                                            </label>
                                            <input 
                                                type="file" 
                                                id="expert-photo-file-input" 
                                                accept="image/*" 
                                                onChange={handleImageUpload} 
                                                className="hidden" 
                                            />
                                            {formImage && (
                                                <button 
                                                    type="button" 
                                                    onClick={() => setFormImage("")} 
                                                    className="px-3 py-1.5 border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1 bg-white"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" /> Remove
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-slate-400 font-medium">PNG, JPG or WEBP (Max 5MB)</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Specializations (comma separated)</label>
                                <input value={formSpecs} onChange={e => setFormSpecs(e.target.value)} placeholder="Canada PR, USA H-1B, UK Student Visa" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-[#107c41] text-slate-900" />
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Target Countries Covered (comma separated)</label>
                                <input value={formCountries} onChange={e => setFormCountries(e.target.value)} placeholder="Canada, USA, UK, Australia" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-[#107c41] text-slate-900" />
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Biography / Expert Summary</label>
                                <textarea value={formBio} onChange={e => setFormBio(e.target.value)} required rows={4} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-[#107c41] text-slate-900 resize-none" placeholder="Write detailed biography info about your legal background..." />
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-slate-100">
                                <button type="button" onClick={() => setIsEditingProfile(false)} className="flex-1 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 py-3 bg-[#107c41] hover:bg-[#0d5c3a] text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md">
                                    <Save className="w-4 h-4" /> Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Post an Ad Modal */}
            {isPostingAd && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsPostingAd(false)} />
                    <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 space-y-6">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                            <div>
                                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                                    📢 Post an Advertisement
                                </h2>
                                <p className="text-xs font-medium text-slate-500 mt-0.5">Promote your consultation packages to visa applicants</p>
                            </div>
                            <button onClick={() => setIsPostingAd(false)} className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handlePostAd} className="space-y-4">
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Ad Campaign Title</label>
                                <input 
                                    value={adTitle} 
                                    onChange={e => setAdTitle(e.target.value)} 
                                    placeholder="e.g. Free Canada PR Assessment for IT Professionals" 
                                    required 
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-[#107c41] text-slate-900" 
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Target Country</label>
                                    <select 
                                        value={adTargetCountry} 
                                        onChange={e => setAdTargetCountry(e.target.value)} 
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-[#107c41] text-slate-900"
                                    >
                                        <option value="Canada">Canada</option>
                                        <option value="USA">United States (USA)</option>
                                        <option value="UK">United Kingdom (UK)</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Germany">Germany</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Target Audience</label>
                                    <select 
                                        value={adAudience} 
                                        onChange={e => setAdAudience(e.target.value)} 
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-[#107c41] text-slate-900"
                                    >
                                        <option value="Student Visa Applicants">Student Visa Applicants</option>
                                        <option value="Work & Job Seekers">Work & Job Seekers</option>
                                        <option value="PR & Immigration">PR & Immigration</option>
                                        <option value="Business & Investment">Business & Investment</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Featured Duration & Placement</label>
                                <select 
                                    value={adBudget} 
                                    onChange={e => setAdBudget(e.target.value)} 
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-[#107c41] text-slate-900"
                                >
                                    <option value="7 Days Featured Banner">7 Days Featured Banner (Homepage Top)</option>
                                    <option value="15 Days Category Sponsor">15 Days Category Sponsor</option>
                                    <option value="30 Days Unlimited Reach">30 Days Unlimited Reach</option>
                                </select>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-slate-100">
                                <button type="button" onClick={() => setIsPostingAd(false)} className="flex-1 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 py-3 bg-slate-950 hover:bg-black text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md">
                                    <ArrowUpRight className="w-4 h-4" /> Publish Ad
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Special Offer Modal */}
            {isPublishingOffer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsPublishingOffer(false)} />
                    <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 space-y-6">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                            <div>
                                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" /> Publish Special Offer
                                </h2>
                                <p className="text-xs font-medium text-slate-500 mt-0.5">Create a discount promo offer for client bookings</p>
                            </div>
                            <button onClick={() => setIsPublishingOffer(false)} className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handlePublishOffer} className="space-y-4">
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Offer Title</label>
                                <input 
                                    value={offerTitle} 
                                    onChange={e => setOfferTitle(e.target.value)} 
                                    placeholder="e.g. 20% Discount on First Consultation Booking" 
                                    required 
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-[#107c41] text-slate-900" 
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Discount Badge</label>
                                    <input 
                                        value={offerDiscount} 
                                        onChange={e => setOfferDiscount(e.target.value)} 
                                        placeholder="e.g. 20% OFF or ₹500 OFF" 
                                        required 
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-[#107c41] text-slate-900" 
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Promo Code</label>
                                    <input 
                                        value={offerCode} 
                                        onChange={e => setOfferCode(e.target.value)} 
                                        placeholder="e.g. VISA2026" 
                                        required 
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-[#107c41] text-slate-900 uppercase font-mono" 
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-slate-100">
                                <button type="button" onClick={() => setIsPublishingOffer(false)} className="flex-1 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 py-3 bg-[#107c41] hover:bg-[#0d5c3a] text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md">
                                    <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" /> Activate Offer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
