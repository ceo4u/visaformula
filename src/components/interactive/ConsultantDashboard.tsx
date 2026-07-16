import { useState } from "react";
import { DollarSign, Users, CheckCircle, Clock, TrendingUp, BarChart3, GripVertical, Settings, X, Save, Edit2, Globe, Sparkles, ArrowLeft, LogOut, LayoutDashboard, Menu, Briefcase, Calendar } from "lucide-react";

const stats = [
    { label: "Total Earnings", value: "₹4,85,000", icon: DollarSign, change: "+12%", color: "text-emerald-600 bg-emerald-50" },
    { label: "Active Clients", value: "18", icon: Users, change: "+3", color: "text-red-600 bg-red-50" },
    { label: "Completed Visas", value: "142", icon: CheckCircle, change: "+8", color: "text-violet-600 bg-violet-50" },
    { label: "This Month", value: "₹62,500", icon: TrendingUp, change: "+22%", color: "text-red-600 bg-red-50" },
];

const columns = [
    {
        id: "new", title: "New Requests", color: "border-red-200", cards: [
            { name: "Priya Sharma", visa: "Express Entry", days: 1, urgent: false },
            { name: "Rahul Verma", visa: "H-1B Transfer", days: 0, urgent: true },
        ]
    },
    {
        id: "waiting", title: "Waiting on Client", color: "border-slate-200", cards: [
            { name: "Ananya Patel", visa: "UK Student", days: 3, urgent: false },
        ]
    },
    {
        id: "processing", title: "Processing", color: "border-red-100", cards: [
            { name: "Deepak Kumar", visa: "Australia PR", days: 5, urgent: false },
            { name: "Fatima Ali", visa: "Canada Study", days: 7, urgent: false },
            { name: "Arjun Nair", visa: "Germany JSV", days: 2, urgent: false },
        ]
    },
    {
        id: "completed", title: "Completed", color: "border-emerald-250", cards: [
            { name: "Meera Joshi", visa: "Canada PR", days: 0, urgent: false },
            { name: "Vikram Singh", visa: "US B-1 Visa", days: 0, urgent: false },
        ]
    },
];

const servicesData = [
    { name: "Initial Consultation (30 min)", price: "₹2,500", active: true },
    { name: "Full Visa Application Support", price: "₹15,000", active: true },
    { name: "Document Review", price: "₹1,500", active: true },
    { name: "Appeal Filing", price: "₹25,000", active: false },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = ["9 AM", "10 AM", "11 AM", "12 PM", "2 PM", "3 PM", "4 PM", "5 PM"];

export function ConsultantDashboard() {
    const [availability, setAvailability] = useState<Record<string, boolean>>({
        "Mon-9 AM": true, "Mon-10 AM": true, "Mon-11 AM": true,
        "Tue-9 AM": true, "Tue-10 AM": true, "Tue-2 PM": true,
        "Wed-9 AM": true, "Wed-3 PM": true, "Wed-4 PM": true,
        "Thu-10 AM": true, "Thu-11 AM": true,
        "Fri-9 AM": true, "Fri-10 AM": true, "Fri-11 AM": true, "Fri-2 PM": true,
    });

    const [services, setServices] = useState(servicesData);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    // Profile Settings States
    const [profile, setProfile] = useState({
        name: "Marcus Thorne, JD",
        role: "Immigration Attorney",
        city: "Hyderabad",
        experience: 15,
        bio: "Immigration attorney with 15+ years of experience helping individuals, families, and corporations successfully navigate visa applications, PR pathways, and citizenship applications globally.",
        specializations: "H-1B, L-1, EB-1, Express Entry",
        countries: "USA, Canada",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"
    });

    // Temp Form States for Modal
    const [formName, setFormName] = useState(profile.name);
    const [formRole, setFormRole] = useState(profile.role);
    const [formCity, setFormCity] = useState(profile.city);
    const [formExperience, setFormExperience] = useState(profile.experience);
    const [formBio, setFormBio] = useState(profile.bio);
    const [formSpecs, setFormSpecs] = useState(profile.specializations);
    const [formCountries, setFormCountries] = useState(profile.countries);
    const [formImage, setFormImage] = useState(profile.image);

    const toggleSlot = (key: string) => {
        setAvailability(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        setProfile({
            name: formName,
            role: formRole,
            city: formCity,
            experience: Number(formExperience),
            bio: formBio,
            specializations: formSpecs,
            countries: formCountries,
            image: formImage
        });
        setIsEditingProfile(false);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
    };

    return (
        <div className="flex flex-col lg:flex-row bg-[#f3f7fa] min-h-screen antialiased text-black font-sans">
            {/* Success Notification */}
            {showSuccessToast && (
                <div className="fixed bottom-6 right-6 z-[110] bg-[#0C1A2E] text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-xl animate-bounce flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Profile saved successfully!
                </div>
            )}

            {/* Mobile Header / Navigation Bar */}
            <div className="lg:hidden w-full bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
                <a href="/" className="flex items-center">
                    <img src="/logo.png" className="h-10 w-auto object-contain" alt="VisaFormula Logo" />
                </a>
                <button 
                    onClick={() => setIsSidebarOpen(true)} 
                    className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl focus:outline-none"
                    aria-label="Open Sidebar"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Desktop Sidebar (hidden on mobile) */}
            <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex-col justify-between py-8 px-5 flex-shrink-0 text-black">
                <div className="flex flex-col items-stretch gap-8">
                    {/* Logo / Branding */}
                    <div className="flex flex-col gap-3 px-3">
                        <a href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-black transition-colors">
                            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
                        </a>
                    </div>
                    
                    <nav className="flex flex-col gap-2">
                        {[
                            { id: "overview", label: "Overview", icon: LayoutDashboard },
                            { id: "pipeline", label: "Client Pipeline", icon: Briefcase },
                            { id: "services", label: "Services & Pricing", icon: DollarSign },
                            { id: "availability", label: "Consultation Hours", icon: Calendar },
                        ].map(tab => {
                            const isActive = activeTab === tab.id;
                            const IconComponent = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        document.getElementById(tab.id)?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className={`flex items-center gap-3 px-5 py-3.5 rounded-full font-bold text-xs tracking-wide transition-all relative ${
                                        isActive 
                                            ? "bg-[#0c1a2e] text-white shadow-md active:scale-[0.98]" 
                                            : "text-slate-600 hover:text-[#0c1a2e] hover:bg-slate-100"
                                    }`}
                                >
                                    <IconComponent className="w-4 h-4 flex-shrink-0" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <div className="px-2">
                    <button 
                        onClick={() => window.location.href = '/login'} 
                        className="flex items-center gap-3 px-5 py-3.5 text-slate-650 hover:text-red-600 hover:bg-slate-55 rounded-full font-bold text-xs tracking-wide transition-all w-full text-left cursor-pointer border-none bg-transparent"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Slide-Over Sidebar Drawer */}
            <div className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300" onClick={() => setIsSidebarOpen(false)} />
                
                {/* Drawer Content */}
                <aside className={`absolute top-0 left-0 w-64 h-full bg-white shadow-2xl flex flex-col justify-between py-8 px-5 transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className="flex flex-col gap-6">
                        <div className="flex justify-between items-center px-1">
                            <a href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-black transition-colors">
                                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
                            </a>
                            <button onClick={() => setIsSidebarOpen(false)} className="p-1 hover:bg-slate-100 rounded text-slate-500">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <nav className="flex flex-col gap-1.5">
                            {[
                                { id: "overview", label: "Overview", icon: LayoutDashboard },
                                { id: "pipeline", label: "Client Pipeline", icon: Briefcase },
                                { id: "services", label: "Services & Pricing", icon: DollarSign },
                                { id: "availability", label: "Consultation Hours", icon: Calendar },
                            ].map(tab => {
                                const isActive = activeTab === tab.id;
                                const IconComponent = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => {
                                            setActiveTab(tab.id);
                                            setIsSidebarOpen(false);
                                            document.getElementById(tab.id)?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className={`flex items-center gap-3 px-5 py-3 rounded-full font-bold text-xs tracking-wide transition-all ${
                                            isActive 
                                                ? "bg-[#0c1a2e] text-white shadow-md" 
                                                : "text-slate-600 hover:text-black hover:bg-slate-100"
                                        }`}
                                    >
                                        <IconComponent className="w-4 h-4 flex-shrink-0" />
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="px-2">
                        <button 
                            onClick={() => window.location.href = '/login'} 
                            className="flex items-center gap-3 px-5 py-3 text-slate-650 hover:text-red-600 rounded-full font-bold text-xs tracking-wide transition-all w-full text-left"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Log Out</span>
                        </button>
                    </div>
                </aside>
            </div>

            {/* Main Content Area */}
            <main className="flex-grow overflow-y-auto w-full pb-20 bg-[#f3f7fa] scroll-smooth">
                {/* Header */}
                <section id="overview" className="bg-gradient-to-r from-[#0c1a2e] to-[#1a3347] text-white py-12 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <img src={profile.image} alt={profile.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20" />
                        <div>
                            <h1 className="font-sora text-2xl md:text-3xl font-extrabold flex items-center gap-2">
                                {profile.name} <CheckCircle className="w-5 h-5 text-red-400 fill-white/10 shrink-0" />
                            </h1>
                            <p className="text-white/60 text-xs font-bold tracking-wider mt-0.5">{profile.role} · Based in {profile.city}</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsEditingProfile(true)}
                        className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all flex items-center gap-2 border border-white/10"
                    >
                        <Settings className="w-4 h-4" /> Edit Profile Details
                    </button>
                </div>
            </section>

            {/* Stats */}
            <section className="max-w-7xl mx-auto px-6 -mt-6 relative z-10 mb-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map(s => (
                        <div key={s.label} className="bg-white rounded-3xl border border-red-100 p-5 shadow-md">
                            <div className="flex items-center justify-between mb-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                                    <s.icon className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{s.change}</span>
                            </div>
                            <div className="font-sora text-2xl font-extrabold text-navy">{s.value}</div>
                            <div className="text-[10px] text-gray-400 mt-0.5 font-bold tracking-wider">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Kanban Pipeline */}
            <section id="pipeline" className="max-w-7xl mx-auto px-6 mb-10">
                <h2 className="font-sora text-lg font-bold text-navy mb-5 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-red-500" /> Client Pipeline Kanban
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {columns.map(col => (
                        <div key={col.id} className={`bg-slate-50/50 rounded-3xl border-t-4 ${col.color} border border-slate-100 p-4 min-h-[220px]`}>
                            <h3 className="font-bold text-[#0c1a2e] mb-3 flex items-center justify-between tracking-wider text-[10px]">
                                {col.title}
                                <span className="w-5 h-5 bg-white border border-slate-200 rounded-full text-xs flex items-center justify-center font-bold text-gray-500 shadow-sm">{col.cards.length}</span>
                            </h3>
                            <div className="space-y-2.5">
                                {col.cards.map(card => (
                                    <div key={card.name} className={`bg-white rounded-2xl p-3.5 border ${card.urgent ? "border-red-200" : "border-slate-100"} cursor-grab hover:shadow-md transition-all group`}>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="font-bold text-[#0c1a2e] text-xs">{card.name}</h4>
                                                <span className="text-[9px] bg-red-50 text-red-700 px-2 py-0.5 rounded-full font-bold mt-1.5 inline-block tracking-wider">{card.visa}</span>
                                            </div>
                                            <GripVertical className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        {card.days > 0 && <p className="text-[9px] text-gray-400 font-bold tracking-wider mt-2.5 flex items-center gap-1"><Clock className="w-3 h-3 text-red-500" /> {card.days}d in stage</p>}
                                        {card.urgent && <p className="text-[9px] text-red-600 font-black tracking-widest mt-1.5 animate-pulse">🚨 Urgent Case</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services + Availability side by side */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Services */}
                    <div id="services" className="bg-white rounded-3xl border border-slate-150 p-6 shadow-md">
                        <h3 className="font-sora font-bold text-navy mb-5">Service Offered & Escrow Pricing</h3>
                        <div className="space-y-3">
                            {services.map(s => (
                                <div key={s.name} className="flex items-center justify-between p-3.5 bg-slate-50/50 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2.5 h-2.5 rounded-full ${s.active ? "bg-emerald-500 animate-pulse" : "bg-gray-350"}`} />
                                        <span className="text-xs font-bold text-navy">{s.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-black text-xs text-navy">{s.price}</span>
                                        <button className="text-[10px] text-red-500 font-black tracking-wider hover:underline">Edit</button>
                                    </div>
                                </div>
                            ))}
                            <button className="w-full py-3 border-2 border-dashed border-red-200 text-red-500 font-black text-xs tracking-wider rounded-2xl hover:bg-red-50/20 transition-colors">+ Add New Custom Package</button>
                        </div>
                    </div>

                    {/* Availability */}
                    <div id="availability" className="bg-white rounded-3xl border border-slate-150 p-6 shadow-md">
                        <h3 className="font-sora font-bold text-navy mb-5">Weekly Consultation Availability</h3>
                        <div className="overflow-x-auto">
                            <div className="grid grid-cols-8 gap-1.5 min-w-[500px]">
                                <div className="text-xs font-bold text-gray-400 p-2"></div>
                                {weekDays.map(d => <div key={d} className="text-xs font-bold text-center text-gray-500 p-2">{d}</div>)}
                                {timeSlots.map(t => (
                                    <div key={`row-${t}`} className="contents">
                                        <div className="text-[10px] font-bold text-gray-400 p-2 flex items-center">{t}</div>
                                        {weekDays.map(d => {
                                            const key = `${d}-${t}`;
                                            const available = availability[key] || false;
                                            return (
                                                <button key={key} type="button" onClick={() => toggleSlot(key)}
                                                    className={`p-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${available ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "bg-slate-50 text-slate-300 hover:bg-slate-100"
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
                </div>
            </section>

            </main>

            {/* Profile settings Modal Drawer */}
            {isEditingProfile && (
                <div className="fixed inset-0 z-50 flex items-center justify-end">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsEditingProfile(false)} />
                    <div className="absolute right-0 top-0 bottom-0 max-w-xl w-full bg-white shadow-2xl overflow-y-auto p-6 md:p-8 flex flex-col z-10 animate-slide-in">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
                            <h2 className="font-sora text-lg font-bold text-navy flex items-center gap-2">
                                <Settings className="w-5 h-5 text-red-500" /> Edit Profile Details
                            </h2>
                            <button onClick={() => setIsEditingProfile(false)}><X className="w-5 h-5 text-gray-400 hover:text-navy" /></button>
                        </div>

                        <form onSubmit={handleSaveProfile} className="space-y-5 flex-1">
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 tracking-widest mb-1.5 block">Full Name</label>
                                <input value={formName} onChange={e => setFormName(e.target.value)} required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-red-500 text-black" />
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-gray-400 tracking-widest mb-1.5 block">Professional Title / Role</label>
                                <input value={formRole} onChange={e => setFormRole(e.target.value)} required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-red-500 text-black" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 tracking-widest mb-1.5 block">City / Location</label>
                                    <input value={formCity} onChange={e => setFormCity(e.target.value)} required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-red-500 text-black" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 tracking-widest mb-1.5 block">Years of Experience</label>
                                    <input type="number" value={formExperience} onChange={e => setFormExperience(Number(e.target.value))} required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-red-500 text-black" />
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-gray-400 tracking-widest mb-1.5 block">Profile Cover / Avatar URL</label>
                                <input value={formImage} onChange={e => setFormImage(e.target.value)} required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-red-500 text-black" />
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-gray-400 tracking-widest mb-1.5 block">Specializations (comma separated)</label>
                                <input value={formSpecs} onChange={e => setFormSpecs(e.target.value)} placeholder="H-1B, L-1, PR" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-red-500 text-black" />
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-gray-400 tracking-widest mb-1.5 block">Target Countries Covered (comma separated)</label>
                                <input value={formCountries} onChange={e => setFormCountries(e.target.value)} placeholder="USA, Canada" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-red-500 text-black" />
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-gray-400 tracking-widest mb-1.5 block">About Us / Biography</label>
                                <textarea value={formBio} onChange={e => setFormBio(e.target.value)} required rows={4} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-red-500 text-black resize-none" placeholder="Write detailed biography info about your legal background..." />
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-slate-100">
                                <button type="button" onClick={() => setIsEditingProfile(false)} className="flex-1 py-3 border border-slate-200 text-gray-600 rounded-xl font-bold text-xs tracking-wider hover:bg-slate-50 transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-xs tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md">
                                    <Save className="w-4 h-4" /> Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
