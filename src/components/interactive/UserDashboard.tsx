import { useState, useEffect } from "react";
import {
    Clock, CheckCircle, Lock, Calendar, BookOpen, Bookmark, AlertTriangle,
    ArrowRight, Bell, FileText, Star, Shield, TrendingUp, ChevronRight,
    Search, Plus, Layers, MessageSquare, Settings, HelpCircle, Briefcase,
    Video, User, LogOut, CheckSquare, Sparkles
} from "lucide-react";

const destinations = ["Canada", "USA", "UK", "Australia", "New Zealand", "Germany", "Ireland", "Singapore", "UAE", "France"];

const initialBookings = [
    {
        expert: "Marcus Thorne, JD",
        service: "Express Entry Consultation",
        date: "Apr 20, 2026 · 10:00 AM",
        status: "upcoming",
        escrow: "held",
        amount: "₹2,500",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
        platform: "Meet"
    },
    {
        expert: "Elena Rodriguez",
        service: "Green Card Document Review",
        date: "Apr 15, 2026 · 2:00 PM",
        status: "completed",
        escrow: "released",
        amount: "₹4,500",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
        platform: "Zoom"
    },
];

const initialSavedExperts = [
    { name: "Raj Patel", role: "Express Entry Specialist", rating: 4.8, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face" },
    { name: "Aisha Khan", role: "UK Visa Consultant", rating: 4.6, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face" },
];

const initialNotifications = [
    { text: "Your booking with Marcus Thorne is confirmed for Apr 20", time: "6:45 PM", type: "success" },
    { text: "New IELTS batch starting May 1 near you — British Council", time: "3:15 PM", type: "info" },
    { text: "Update: Canada Express Entry Draw #243 announced", time: "1:00 PM", type: "info" },
];

export function UserDashboard() {
    const [ieltsScore, setIeltsScore] = useState({ L: 7.5, R: 7.0, W: 6.5, S: 7.0 });
    const overallBand = ((ieltsScore.L + ieltsScore.R + ieltsScore.W + ieltsScore.S) / 4).toFixed(1);

    const [firstName, setFirstName] = useState("Priya");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [passportCountry, setPassportCountry] = useState("India");
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [selectedDests, setSelectedDests] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("dashboard");

    const [documents, setDocuments] = useState([
        { id: 1, label: "Passport scan", status: "uploaded", icon: "✅", bg: "bg-emerald-50/40 text-emerald-800 border-emerald-100" },
        { id: 2, label: "IELTS Score Card", status: "pending", icon: "⚠️", bg: "bg-amber-50/40 text-amber-800 border-amber-100" },
        { id: 3, label: "Financial Statement", status: "missing", icon: "❌", bg: "bg-rose-50/40 text-rose-800 border-rose-100" },
        { id: 4, label: "Offer Letter", status: "uploaded", icon: "✅", bg: "bg-emerald-50/40 text-emerald-800 border-emerald-100" },
        { id: 5, label: "SOP / Cover Letter", status: "pending", icon: "⚠️", bg: "bg-amber-50/40 text-amber-800 border-amber-100" },
    ]);

    useEffect(() => {
        const savedFirst = localStorage.getItem("seeker_firstName");
        if (savedFirst) setFirstName(savedFirst);
        
        const savedLast = localStorage.getItem("seeker_lastName");
        if (savedLast) setLastName(savedLast);

        const savedPhone = localStorage.getItem("seeker_phone");
        if (savedPhone) setPhone(savedPhone);

        const savedEmail = localStorage.getItem("seeker_email");
        if (savedEmail) setEmail(savedEmail);

        const savedCountry = localStorage.getItem("seeker_passportCountry");
        if (savedCountry) setPassportCountry(savedCountry);

        try {
            const savedGoals = localStorage.getItem("seeker_goals");
            if (savedGoals) setSelectedGoals(JSON.parse(savedGoals));

            const savedDests = localStorage.getItem("seeker_destinations");
            if (savedDests) setSelectedDests(JSON.parse(savedDests));
        } catch (e) {
            console.error(e);
        }
    }, []);

    const toggleDocStatus = (id: number) => {
        setDocuments(documents.map(doc => {
            if (doc.id === id) {
                const nextStatus = doc.status === "uploaded" ? "pending" : doc.status === "pending" ? "missing" : "uploaded";
                const nextIcon = nextStatus === "uploaded" ? "✅" : nextStatus === "pending" ? "⚠️" : "❌";
                const nextBg = nextStatus === "uploaded" ? "bg-emerald-50/40 text-emerald-800 border-emerald-100" :
                               nextStatus === "pending" ? "bg-amber-50/40 text-amber-800 border-amber-100" :
                               "bg-rose-50/40 text-rose-800 border-rose-100";
                return { ...doc, status: nextStatus, icon: nextIcon, bg: nextBg };
            }
            return doc;
        }));
    };

    const uploadedCount = documents.filter(d => d.status === "uploaded").length;

    return (
        <div className="flex bg-[#f3f7fa] min-h-screen antialiased text-black">

            {/* Redesigned Premium Sidebar Navigation */}
            <aside className="w-64 bg-white border-r border-slate-200/65 flex flex-col justify-between py-8 px-5 flex-shrink-0">
                <div className="flex flex-col items-stretch gap-8">
                    {/* Logo / Branding */}
                    <div className="flex flex-col gap-3 px-3">
                        <a href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-black transition-colors">
                            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
                        </a>
                        <div className="flex items-center gap-2.5 mt-1">
                            <div className="w-5.5 h-5.5 rounded-full border-[3.5px] border-black flex-shrink-0"></div>
                            <span className="font-extrabold text-black text-lg tracking-tight">VisaFormula</span>
                        </div>
                    </div>
                    
                    <nav className="flex flex-col gap-2">
                        {[
                            { id: "dashboard", label: "Dashboard", icon: Layers },
                            { id: "consultations", label: "Consultations", icon: Calendar },
                            { id: "cases", label: "Active Cases", icon: Briefcase },
                            { id: "training", label: "IELTS Coaching", icon: BookOpen },
                            { id: "upgrade", label: "Upgrade Tier", icon: Shield },
                            { id: "inquiries", label: "Inquiries", icon: MessageSquare }
                        ].map(tab => {
                            const isActive = activeTab === tab.id;
                            const IconComponent = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 px-5 py-3.5 rounded-full font-bold text-xs tracking-wide transition-all relative ${
                                        isActive 
                                            ? "bg-[#1C1C1E] text-white shadow-sm active:scale-[0.98]" 
                                            : "text-slate-700 hover:text-black hover:bg-slate-50"
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
                        className="flex items-center gap-3 px-5 py-3.5 text-slate-700 hover:text-red-600 hover:bg-red-50/50 rounded-full font-bold text-xs tracking-wide transition-all w-full text-left cursor-pointer"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow p-8 overflow-y-auto space-y-8">
                {/* Redesigned Premium Header Bar */}
                <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-5 flex-grow max-w-4xl">
                        {/* Seeker Profile Card */}
                        <div className="bg-white border border-slate-200/80 rounded-[28px] shadow-sm flex items-center overflow-hidden max-w-md w-full relative">
                            {/* Top right gradient banner background */}
                            <div className="absolute top-0 right-0 left-[35%] h-[45px] bg-gradient-to-br from-[#818CF8]/35 via-[#C084FC]/20 to-transparent rounded-bl-[40px] pointer-events-none" />
                            
                            {/* Left side: Avatar */}
                            <div className="p-4 pr-2 flex-shrink-0 z-10">
                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[24px] bg-slate-100 overflow-hidden border border-slate-150 flex items-center justify-center font-black text-xl text-slate-400 shadow-inner">
                                    {firstName.substring(0, 2).toUpperCase()}
                                </div>
                            </div>

                            {/* Right side: Info */}
                            <div className="p-4 pl-3 flex flex-col justify-center flex-grow z-10">
                                {/* Name and Badge */}
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h2 className="text-base sm:text-lg font-extrabold text-black tracking-tight leading-snug">{firstName} {lastName || "Sharma"}</h2>
                                    <span className="inline-flex items-center gap-0.5 bg-[#4A72FF] text-white px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider">
                                        MEMBER <Sparkles className="w-2.5 h-2.5 fill-current text-white" />
                                    </span>
                                </div>

                                {/* Description/Location */}
                                <p className="text-[11.5px] text-slate-500 font-semibold mt-1 leading-tight max-w-[220px]">
                                    Passport holder from {passportCountry || "India"}
                                </p>
                            </div>
                        </div>

                        {/* Search Bar next to Profile */}
                        <div className="relative w-full sm:w-[450px] flex-shrink-0">
                            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="text"
                                placeholder="Search consultations, tasks, files..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-5 py-4 bg-white border border-slate-200 rounded-full text-xs font-semibold focus:border-black outline-none shadow-sm transition-all"
                            />
                        </div>
                    </div>
                </header>

                {/* Dashboard Responsive Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                    
                    {/* Column 1: Document Vault (My Tasks mockup layout) */}
                    <div className="xl:col-span-1 bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                              <h3 className="font-bold text-lg text-black">My Documents</h3>
                              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Document Vault</span>
                          </div>
                          <button className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-all">
                              <Plus className="w-4 h-4 text-black" />
                          </button>
                        </div>

                        <div className="flex gap-2">
                            <button className="bg-black text-white text-xs font-bold px-4 py-2 rounded-full">All</button>
                            <button className="bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-2 rounded-full transition-all">Required</button>
                        </div>

                        <div className="bg-slate-50 border border-slate-200/60 p-3 rounded-2xl flex items-center justify-between text-xs font-bold text-black">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px]">{documents.length}</div>
                                <span>Total Files needed</span>
                            </div>
                        </div>

                        {/* Document items styled like mockup cards */}
                        <div className="flex flex-col gap-4">
                            {documents.map((doc, idx) => {
                                const bgColors = ["bg-[#ffeae6]/40", "bg-[#e8f5e9]/40", "bg-[#e1f5fe]/40", "bg-[#f3e5f5]/40", "bg-[#fff8e1]/40"];
                                return (
                                    <div 
                                        key={doc.id} 
                                        onClick={() => toggleDocStatus(doc.id)}
                                        className={`p-4 border border-slate-150 rounded-2xl transition-all hover:scale-[1.01] active:scale-95 cursor-pointer ${bgColors[idx % bgColors.length]} flex flex-col justify-between gap-3`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <span className="text-xs font-semibold text-black block max-w-[80%]">{doc.label}</span>
                                            <CheckSquare className={`w-4.5 h-4.5 ${doc.status === "uploaded" ? "text-black fill-black" : "text-slate-400"}`} />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] text-slate-500 font-bold uppercase">Status</span>
                                            <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border ${doc.bg}`}>
                                                {doc.status}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Column 2: Mid-Dashboard Overview (Project Overview & Invoice charts mockup) */}
                    <div className="xl:col-span-2 flex flex-col gap-8">
                        
                        {/* Upper row: Dest & IELTS Progress mock */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            
                            {/* Goals / Destination Pie Chart layout */}
                            <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[280px]">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-slate-450 uppercase tracking-widest block">Goals Overview</span>
                                    <button className="text-slate-400 hover:text-black">
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="relative w-36 h-36 mx-auto flex items-center justify-center my-3">
                                    {/* Simulated Doughnut Chart */}
                                    <div className="absolute inset-0 border-[10px] border-slate-100 rounded-full"></div>
                                    <div className="absolute inset-0 border-[10px] border-t-black border-r-orange-500 border-b-sky-500 border-l-slate-100 rounded-full animate-spin-slow"></div>
                                    <div className="text-center z-10">
                                        <span className="text-2xl font-bold text-black">{uploadedCount}</span>
                                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">Uploaded</span>
                                    </div>
                                </div>

                                <div className="flex justify-between text-[10px] font-bold text-slate-500 pt-2 border-t border-slate-100">
                                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-black rounded-xs"></span> Goals: {selectedGoals.length}</span>
                                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-orange-500 rounded-xs"></span> Dests: {selectedDests.length}</span>
                                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-sky-500 rounded-xs"></span> Ready: {uploadedCount}</span>
                                </div>
                            </div>

                            {/* IELTS Tracker (styled like Income VS Expense curve) */}
                            <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[280px]">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">IELTS Scores</span>
                                        <span className="text-lg font-bold text-black mt-1 block">Band {overallBand}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-450">
                                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                                        <span>Target 7.0</span>
                                    </div>
                                </div>

                                {/* Custom Score Curves */}
                                <div className="space-y-3 py-2">
                                    {(["L", "R", "W", "S"] as const).map((key, idx) => {
                                        const labels = { L: "Listening", R: "Reading", W: "Writing", S: "Speaking" };
                                        const colors = ["bg-black", "bg-orange-500", "bg-sky-500", "bg-purple-500"];
                                        return (
                                            <div key={key}>
                                                <div className="flex justify-between text-[11px] font-bold mb-1">
                                                    <span className="text-slate-500 font-semibold">{labels[key]}</span>
                                                    <span className="text-black font-extrabold">{ieltsScore[key]}</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className={`h-full ${colors[idx]} rounded-full`} style={{ width: `${(ieltsScore[key] / 9) * 100}%` }} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <a href="/training" className="block pt-2 border-t border-slate-100">
                                    <button className="w-full bg-black text-white py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-slate-900 transition-all">
                                        Find IELTS Coaching
                                    </button>
                                </a>
                            </div>

                        </div>

                        {/* Lower Block: Escrow & Funds Overview (Invoice Overview Layout) */}
                        <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <h3 className="font-bold text-lg text-black">Milestone Escrow Vault</h3>
                                    <span className="text-[11px] text-slate-450 font-bold uppercase tracking-wider">Secured Payments</span>
                                </div>
                                <Shield className="w-5 h-5 text-black" />
                            </div>

                            <div className="space-y-4">
                                {[
                                    { label: "Held in Escrow", count: "1 Booking", amount: "₹2,500", width: "40%", bg: "bg-purple-600" },
                                    { label: "Released Payments", count: "1 Complete", amount: "₹4,500", width: "70%", bg: "bg-emerald-600" },
                                    { label: "Total Spent", count: "2 Transactions", amount: "₹7,000", width: "85%", bg: "bg-sky-600" },
                                ].map((item, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold text-black">
                                            <span>{item.label}</span>
                                            <div className="flex gap-4">
                                                <span className="text-slate-450">{item.count}</span>
                                                <span className="font-bold">{item.amount}</span>
                                            </div>
                                        </div>
                                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className={`h-full ${item.bg} rounded-full`} style={{ width: item.width }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Column 3: Meetings & Support (My Meetings & Tickets layout) */}
                    <div className="xl:col-span-1 flex flex-col gap-8">
                        
                        {/* Consultation Meetings */}
                        <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-450 uppercase tracking-widest block">My Consultations</span>
                                <Calendar className="w-4 h-4 text-black" />
                            </div>

                            <div className="space-y-3">
                                {initialBookings.map((b, idx) => (
                                    <div key={idx} className="bg-slate-50 border border-slate-200/40 rounded-2xl p-4.5 space-y-3 hover:shadow-xs transition-all">
                                        <div className="flex justify-between items-center text-xs font-bold">
                                            <span className="text-slate-450">{b.date.split("·")[0]}</span>
                                            <span className="bg-black text-white px-2 py-0.5 rounded-md text-[9px] uppercase tracking-wider">{b.platform}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <img src={b.avatar} alt={b.expert} className="w-8 h-8 rounded-full object-cover" />
                                            <div className="truncate">
                                                <span className="text-xs font-semibold text-black block truncate">{b.expert}</span>
                                                <span className="text-[10px] text-slate-400 block truncate font-semibold mt-0.5">{b.service}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <a href="/find-experts" className="block text-center text-xs font-bold text-slate-700 hover:text-black pt-2">
                                See All Consultations &gt;
                            </a>
                        </div>

                        {/* Saved Experts list (styled like Open Tickets / Chats list) */}
                        <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-450 uppercase tracking-widest block">Saved Experts</span>
                                <Bookmark className="w-4 h-4 text-black" />
                            </div>

                            <div className="space-y-4">
                                {initialSavedExperts.map((e, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <img src={e.avatar} alt={e.name} className="w-10 h-10 rounded-full object-cover border border-slate-100" />
                                        <div className="flex-1 truncate">
                                            <div className="text-xs font-semibold text-black leading-none">{e.name}</div>
                                            <span className="text-[10px] text-slate-400 font-bold block mt-1 truncate">{e.role}</span>
                                        </div>
                                        <a href="/find-experts">
                                            <button className="bg-black hover:bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-xl active:scale-95 transition-all">
                                                Book
                                            </button>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Updates / Notifications */}
                        <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-450 uppercase tracking-widest block">Updates & alerts</span>
                                <Bell className="w-4 h-4 text-black" />
                            </div>

                            <div className="space-y-3">
                                {initialNotifications.map((n, idx) => (
                                    <div key={idx} className="border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                                        <p className="text-xs text-black font-semibold leading-relaxed">{n.text}</p>
                                        <span className="text-[9px] text-slate-400 font-bold uppercase mt-1 block">{n.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>

            </main>
        </div>
    );
}
