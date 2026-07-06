import { useState, useEffect } from "react";
import {
    Clock, CheckCircle, Lock, Calendar, Bookmark, AlertTriangle,
    ArrowRight, ArrowLeft, Bell, Star, Shield, TrendingUp, ChevronRight,
    Search, Plus, LayoutDashboard, MessageSquare, Settings, HelpCircle, Briefcase,
    Video, User, LogOut, CheckSquare, Sparkles, FileText, Globe, DollarSign, X
} from "lucide-react";

export function UserDashboard() {
    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Doe");
    const [phone, setPhone] = useState("+91 98765 43210");
    const [email, setEmail] = useState("john.doe@example.com");
    const [dob, setDob] = useState("1998-05-15");
    const [citizenship, setCitizenship] = useState("India");
    const [residentOf, setResidentOf] = useState("India");
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [selectedDests, setSelectedDests] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState("dashboard");

    // Module 14: Additional Service Requests State
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [submittedRequests, setSubmittedRequests] = useState([
        { id: "req-1", type: "Offer Verification", desc: "Verification of job offer from employer in Canada", date: "2026-07-01", status: "Active" }
    ]);
    const [newRequestType, setNewRequestType] = useState("");
    const [newRequestTarget, setNewRequestTarget] = useState("Canada");

    // Module 9: Scanned Documents Vault (Dynamically supports S3 bucket strings)
    const [documents, setDocuments] = useState([
        { id: "doc-1", name: "Passport Scan Copy", size: "2.4 MB", s3Uri: "s3://visaformula-vault/users/usr_982/seeker_passport_copy.pdf", uploadedAt: "2026-07-04" },
        { id: "doc-2", name: "IELTS Official Certificate", size: "1.8 MB", s3Uri: "s3://visaformula-vault/users/usr_982/ielts_academic_report.pdf", uploadedAt: "2026-07-05" },
        { id: "doc-3", name: "Undergraduate Degree Transcript", size: "4.1 MB", s3Uri: "s3://visaformula-vault/users/usr_982/ug_transcript_stamped.pdf", uploadedAt: "2026-07-05" }
    ]);
    const [newDocName, setNewDocName] = useState("");
    const [newDocS3, setNewDocS3] = useState("");

    // Module 13: Visas Under Processing
    const [processingVisas, setProcessingVisas] = useState([
        { id: "p-1", country: "Canada", type: "Student Visa (PGWP Track)", stage: "Document Verification", lastUpdated: "5h ago", pulse: true },
        { id: "p-2", country: "Germany", type: "Opportunity Card Work Permit", stage: "VFS Interview Scheduled", lastUpdated: "2d ago", pulse: false }
    ]);

    // Module 11 & 12: Escrow Payments & Active Disputes
    const [escrowVault, setEscrowVault] = useState({
        heldBalance: "₹1,45,000",
        releasedBalance: "₹85,000",
        milestones: [
            { id: "m-1", desc: "Contract Signoff & Evaluation", status: "Released", amount: "₹45,000" },
            { id: "m-2", desc: "SOP Review & Intake Approval", status: "Released", amount: "₹40,000" },
            { id: "m-3", desc: "Final Visa Filing Submission", status: "Locked", amount: "₹60,000" }
        ],
        safetyLockdown: "SECURE" // Mapped lockdown status
    });

    const [disputes, setDisputes] = useState<any[]>([]); // Empty indicates 'No Active Flags'

    // Module 8: My Favourite Agents
    const [favouriteAgents, setFavouriteAgents] = useState([
        { id: "agent-1", name: "Marcus Thorne, JD", role: "Immigration Attorney", rating: "★ 4.9", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop" },
        { id: "agent-2", name: "Elena Rodriguez", role: "Immigration Consultant", rating: "★ 5.0", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop" }
    ]);

    // Module 10: Previous Applied Visas History
    const [visaHistory, setVisaHistory] = useState([
        { id: "h-1", country: "UK", subType: "Tier-4 General Student", year: "2024", outcome: "Approved" },
        { id: "h-2", country: "USA", subType: "B1/B2 Tourist Visa", year: "2023", outcome: "Rejected" }
    ]);

    // Module 15: My Reviews & Ratings Given
    const [reviewsGiven, setReviewsGiven] = useState([
        { id: "rev-1", agentName: "Marcus Thorne, JD", rating: 5, comment: "Exceptional assistance with my L-1A visa review. Very thorough.", timestamp: "2026-06-28 14:32" },
        { id: "rev-2", agentName: "Elena Rodriguez", rating: 4, comment: "Helped verify my financial statements accurately.", timestamp: "2026-05-14 09:15" }
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

        const savedCountry = localStorage.getItem("seeker_citizenship");
        if (savedCountry) setCitizenship(savedCountry);

        const savedResident = localStorage.getItem("seeker_residentOf");
        if (savedResident) setResidentOf(savedResident);

        const savedDob = localStorage.getItem("seeker_dob");
        if (savedDob) setDob(savedDob);

        try {
            const savedGoals = localStorage.getItem("seeker_goals");
            if (savedGoals) setSelectedGoals(JSON.parse(savedGoals));

            const savedDests = localStorage.getItem("seeker_destinations");
            if (savedDests) setSelectedDests(JSON.parse(savedDests));
        } catch (e) {
            console.error(e);
        }
    }, []);

    const triggerPostRequest = (type: string) => {
        const descText = type === "A" 
            ? `I need verification of my offer from employer in ${newRequestTarget}` 
            : "I need my education doc attested.";
        
        const newReq = {
            id: `req-${Date.now()}`,
            type: type === "A" ? "Offer Verification" : "Doc Attestation",
            desc: descText,
            date: new Date().toISOString().split("T")[0],
            status: "Active"
        };

        setSubmittedRequests([newReq, ...submittedRequests]);
        setIsRequestModalOpen(false);
        setNewRequestType("");
    };

    const addDocument = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newDocName || !newDocS3) return;
        const newDoc = {
            id: `doc-${Date.now()}`,
            name: newDocName,
            size: "1.5 MB",
            s3Uri: newDocS3,
            uploadedAt: new Date().toISOString().split("T")[0]
        };
        setDocuments([...documents, newDoc]);
        setNewDocName("");
        setNewDocS3("");
    };

    return (
        <div className="flex bg-[#050505] min-h-screen antialiased text-neutral-200 font-sans selection:bg-cyan-500 selection:text-black">
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes pulse-cyan {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.1); }
                }
                .pulse-cyan-indicator {
                    animation: pulse-cyan 2s infinite;
                }
            `}} />

            {/* Redesigned Premium Sidebar Navigation */}
            <aside className="w-64 bg-[#0a0a0a] border-r border-neutral-800/80 flex flex-col justify-between py-8 px-5 flex-shrink-0 text-white">
                <div className="flex flex-col items-stretch gap-8">
                    {/* Logo / Branding */}
                    <div className="flex flex-col gap-3 px-3">
                        <a href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-white transition-colors">
                            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
                        </a>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-white font-serif text-lg tracking-wider uppercase font-semibold">VisaFormula</span>
                            <span className="bg-cyan-500/10 text-cyan-400 text-[8px] font-black tracking-widest px-2 py-0.5 rounded-full border border-cyan-500/20">SEEKER</span>
                        </div>
                    </div>
                    
                    <nav className="flex flex-col gap-2">
                        {[
                            { id: "dashboard", label: "Dashboard Hub", icon: LayoutDashboard },
                            { id: "documents", label: "Document Locker", icon: FileText },
                            { id: "escrow", label: "Escrow Vault", icon: Shield }
                        ].map(tab => {
                            const isActive = activeTab === tab.id;
                            const IconComponent = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 px-5 py-3.5 rounded-xl font-bold text-xs tracking-wide transition-all relative ${
                                        isActive 
                                            ? "bg-[#111111] text-cyan-400 border border-neutral-800/90 shadow-md shadow-cyan-950/15" 
                                            : "text-neutral-500 hover:text-white hover:bg-[#0c0c0c]"
                                    }`}
                                >
                                    <IconComponent className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-cyan-400" : "text-neutral-500"}`} />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Module 8: My Favourite Agents Sidebar Widget */}
                <div className="mt-8 pt-6 border-t border-neutral-800/80 px-2 space-y-4">
                    <span className="text-[10px] font-bold text-neutral-400 tracking-wider block uppercase">★ Favourite Consultants</span>
                    <div className="space-y-3">
                        {favouriteAgents.map((agent) => (
                            <div key={agent.id} className="flex items-center gap-3 bg-[#0d0d0d] p-2.5 rounded-xl border border-neutral-800/60">
                                <img src={agent.avatar} alt={agent.name} className="w-8 h-8 rounded-lg object-cover" />
                                <div className="min-w-0 flex-1">
                                    <div className="text-[11px] font-bold text-white truncate">{agent.name}</div>
                                    <div className="text-[9px] text-neutral-500 truncate">{agent.role}</div>
                                </div>
                                <span className="bg-cyan-500/10 text-cyan-400 text-[8px] font-bold px-1.5 py-0.5 rounded border border-cyan-500/20 shrink-0">
                                    {agent.rating}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="px-2 pt-6">
                    <button 
                        onClick={() => window.location.href = '/login'} 
                        className="flex items-center gap-3 px-5 py-3.5 text-neutral-500 hover:text-red-400 hover:bg-neutral-900 rounded-xl font-bold text-xs tracking-wide transition-all w-full text-left cursor-pointer border-none bg-transparent"
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
                    <div className="flex flex-col sm:flex-row sm:items-center gap-5 flex-grow max-w-5xl">
                        {/* Seeker Profile Card (Premium Gradient Theme) */}
                        <div className="bg-[#0c0c0c] border border-neutral-800/80 rounded-3xl p-5 flex items-center overflow-hidden max-w-md w-full relative shadow-xl">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                            {/* Left side: Avatar */}
                            <div className="pr-4 flex-shrink-0">
                                <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 text-white shadow-md flex items-center justify-center font-black text-lg tracking-tight">
                                    {(firstName || "Seeker").substring(0, 2).toUpperCase()}
                                </div>
                            </div>

                            {/* Right side: Info */}
                            <div className="flex flex-col justify-center flex-grow">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h2 className="text-base font-bold text-white tracking-tight leading-snug">{firstName} {lastName}</h2>
                                    <span className="bg-emerald-500/10 text-emerald-400 text-[8px] font-black tracking-widest px-2 py-0.5 rounded-full border border-emerald-500/20">Active Seeker</span>
                                </div>
                                <p className="text-[10px] text-neutral-400 mt-1 leading-tight flex items-center gap-1.5">
                                    <span>Citizenship:</span> <span className="text-white font-semibold">{citizenship}</span>
                                    <span>•</span>
                                    <span>Resident:</span> <span className="text-white font-semibold">{residentOf}</span>
                                </p>
                            </div>
                        </div>

                        {/* Search Bar next to Profile */}
                        <div className="relative w-full sm:w-[350px] flex-shrink-0">
                            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                            <input 
                                type="text"
                                placeholder="Search application logs, files, tasks..."
                                className="w-full pl-11 pr-5 py-3.5 bg-[#0c0c0c] border border-neutral-800/80 rounded-xl text-xs font-semibold text-white focus:border-cyan-500 focus:outline-none shadow-sm transition-all"
                            />
                        </div>
                    </div>

                    {/* POST NEW REQUEST BUTTON (MODULE 14 UI HOOK) */}
                    <button
                        onClick={() => setIsRequestModalOpen(true)}
                        className="bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98] shrink-0"
                    >
                        ➔ POST NEW REQUEST
                    </button>
                </header>

                {/* Dashboard Responsive Grid */}
                {activeTab === "dashboard" ? (
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                    
                    {/* LEFT COLUMN (XL: 8): Primary Operations */}
                    <div className="xl:col-span-8 space-y-6">
                        
                        {/* Module 13: Visas Under Processing */}
                        <div className="bg-[#0c0c0c] border border-neutral-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                            <div className="flex items-center justify-between mb-5">
                                <div>
                                    <h3 className="font-bold text-base text-white">Visas Under Processing</h3>
                                    <span className="text-[10px] text-neutral-400 font-bold tracking-wider mt-0.5 block uppercase">MODULE 13 · REALTIME MONITORING</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-cyan-400 pulse-cyan-indicator"></span>
                                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Live Sync</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {processingVisas.map((visa) => (
                                    <div key={visa.id} className="bg-[#080808] border border-neutral-800/60 rounded-2xl p-5 flex flex-col justify-between gap-4 relative group hover:border-neutral-750 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="text-white font-bold text-sm flex items-center gap-2">
                                                    <span>🗺️</span> {visa.country}
                                                </div>
                                                <div className="text-[11px] text-neutral-400 font-medium mt-1">{visa.type}</div>
                                            </div>
                                            {visa.pulse && (
                                                <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                    Active Stage
                                                </span>
                                            )}
                                        </div>

                                        <div className="bg-[#111111] p-3 rounded-xl border border-neutral-850 flex items-center justify-between">
                                            <span className="text-[10px] text-neutral-500 font-bold uppercase">Processing Stage</span>
                                            <span className="text-[11px] text-white font-bold">{visa.stage}</span>
                                        </div>

                                        <div className="flex items-center justify-between text-[10px] text-neutral-500 font-semibold pt-1">
                                            <span>System Mapped</span>
                                            <span>Updated {visa.lastUpdated}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Module 11 & 12 Matrix Row: Escrow Payments & Active Disputes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Module 12: Escrow Payments Card */}
                            <div className="bg-[#0c0c0c] border border-neutral-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[340px]">
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF66] to-transparent"></div>
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="font-bold text-sm text-white">Escrow Payment Vault</h3>
                                        <span className="text-[9px] text-neutral-500 font-bold block uppercase tracking-wider">Module 12 · Secure Transaction Milestones</span>
                                    </div>
                                    <Shield className="w-5 h-5 text-emerald-400" />
                                </div>

                                <div className="grid grid-cols-2 gap-3 my-3">
                                    <div className="bg-[#080808] p-3.5 rounded-xl border border-neutral-800/60">
                                        <span className="text-[9px] text-neutral-400 font-bold block mb-1">HELD BALANCE</span>
                                        <span className="text-base font-extrabold text-white">{escrowVault.heldBalance}</span>
                                    </div>
                                    <div className="bg-[#080808] p-3.5 rounded-xl border border-neutral-800/60">
                                        <span className="text-[9px] text-neutral-400 font-bold block mb-1">LOCKDOWN STATE</span>
                                        <span className="text-xs font-black text-emerald-400 flex items-center gap-1">
                                            <Lock className="w-3.5 h-3.5" /> {escrowVault.safetyLockdown}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {escrowVault.milestones.map((m) => (
                                        <div key={m.id} className="flex justify-between items-center text-xs font-semibold bg-[#111111] px-3.5 py-2.5 rounded-lg border border-neutral-850">
                                            <span className="text-white">{m.desc}</span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-neutral-400 font-bold">{m.amount}</span>
                                                <span className={`text-[8px] font-black px-2 py-0.5 rounded border ${m.status === "Released" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-neutral-800 text-neutral-400 border-neutral-700"}`}>
                                                    {m.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Module 11: Active Disputes Card */}
                            <div className="bg-[#0c0c0c] border border-neutral-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[340px]">
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF3366] to-transparent"></div>
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="font-bold text-sm text-white">Active Disputes Monitor</h3>
                                        <span className="text-[9px] text-neutral-500 font-bold block uppercase tracking-wider">Module 11 · Client Protection System</span>
                                    </div>
                                    <AlertTriangle className="w-5 h-5 text-red-500" />
                                </div>

                                {disputes.length === 0 ? (
                                    <div className="flex-grow flex flex-col items-center justify-center py-6 text-center">
                                        <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center mb-3">
                                            <CheckCircle className="w-6 h-6 text-[#00FF66]" />
                                        </div>
                                        <div className="text-xs font-bold text-white mb-1">No Active Flags</div>
                                        <p className="text-[10px] text-neutral-400 max-w-[200px] leading-relaxed">Your escrow milestones are fully verified with zero client disputes logged.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {disputes.map((d) => (
                                            <div key={d.id} className="p-3 rounded-xl border border-neutral-850 bg-red-950/10">
                                                <div className="flex justify-between items-center text-xs font-bold text-white">
                                                    <span>{d.title}</span>
                                                    <span className="text-red-400">{d.status}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="text-center text-[10px] font-bold text-neutral-500 pt-3 border-t border-neutral-800/60">
                                    🔐 Verified 256-bit TLS Escrow Ledger
                                </div>
                            </div>
                        </div>

                        {/* Module 10: Previous Applied Visas History */}
                        <div className="bg-[#0c0c0c] border border-neutral-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent"></div>
                            <div className="flex items-center justify-between mb-5">
                                <div>
                                    <h3 className="font-bold text-base text-white">Previous Applied Visas</h3>
                                    <span className="text-[10px] text-neutral-400 font-bold tracking-wider mt-0.5 block uppercase">MODULE 10 · HISTORICAL TRAVEL RECORDS</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {visaHistory.map((hist) => (
                                    <div key={hist.id} className="flex justify-between items-center bg-[#080808] px-4 py-3.5 rounded-xl border border-neutral-800/60 hover:border-neutral-700 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="text-lg">🗺️</div>
                                            <div>
                                                <div className="text-xs font-bold text-white">{hist.country} — {hist.subType}</div>
                                                <div className="text-[10px] text-neutral-500 font-medium mt-0.5">Applied in {hist.year}</div>
                                            </div>
                                        </div>
                                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                                            hist.outcome === "Approved" 
                                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                                                : "bg-red-500/10 text-red-400 border-red-500/20"
                                        }`}>
                                            {hist.outcome}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Module 15: My Reviews & Ratings Given */}
                        <div className="bg-[#0c0c0c] border border-neutral-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                            <div className="flex items-center justify-between mb-5">
                                <div>
                                    <h3 className="font-bold text-base text-white">My Reviews & Ratings Given</h3>
                                    <span className="text-[10px] text-neutral-400 font-bold tracking-wider mt-0.5 block uppercase">MODULE 15 · FEEDBACK HISTORY</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {reviewsGiven.map((rev) => (
                                    <div key={rev.id} className="bg-[#080808] border border-neutral-800/60 rounded-xl p-4 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <div className="text-xs font-bold text-white">{rev.agentName}</div>
                                            <div className="flex items-center gap-0.5 text-yellow-500 text-xs font-bold">
                                                {Array.from({ length: rev.rating }).map((_, i) => <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />)}
                                            </div>
                                        </div>
                                        <p className="text-[11px] text-neutral-400 leading-normal italic">"{rev.comment}"</p>
                                        <div className="text-[9px] text-neutral-500 text-right">{rev.timestamp}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN (XL: 4): Secondary Panels */}
                    <div className="xl:col-span-4 space-y-6">
                        
                        {/* Module 14: Submitted Additional Service Requests List */}
                        <div className="bg-[#0c0c0c] border border-neutral-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF66] to-transparent"></div>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="font-bold text-sm text-white">Active Service Requests</h3>
                                    <span className="text-[9px] text-neutral-500 font-bold block uppercase tracking-wider">Module 14 · Additional Attestations</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {submittedRequests.map((req) => (
                                    <div key={req.id} className="bg-[#080808] p-3.5 rounded-xl border border-neutral-800/60 space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">{req.type}</span>
                                            <span className="text-[9px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20">{req.status}</span>
                                        </div>
                                        <p className="text-xs text-white leading-normal font-semibold">{req.desc}</p>
                                        <div className="text-[9px] text-neutral-500 font-medium">Requested on {req.date}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Goals Overview Card */}
                        <div className="bg-[#0c0c0c] border border-neutral-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden min-h-[260px] flex flex-col justify-between">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent"></div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-bold text-neutral-400 tracking-widest block">Goals Overview</span>
                                <Sparkles className="w-4 h-4 text-cyan-400" />
                            </div>

                            <div className="space-y-3 py-2">
                                <div>
                                    <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block mb-1">MAPPED GOALS</div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {selectedGoals.length === 0 ? (
                                            <span className="text-xs text-neutral-500 italic">None selected</span>
                                        ) : selectedGoals.map(g => (
                                            <span key={g} className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">{g}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block mb-1">TARGET COUNTRIES</div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {selectedDests.length === 0 ? (
                                            <span className="text-xs text-neutral-500 italic">None selected</span>
                                        ) : selectedDests.map(d => (
                                            <span key={d} className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">{d}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="text-[9px] text-neutral-500 text-center border-t border-neutral-800/60 pt-3">
                                Profiles are synced directly with the AI matching engine.
                            </div>
                        </div>

                    </div>

                </div>
                ) : activeTab === "documents" ? (
                    /* Module 9: Scanned Documents Document Locker Grid */
                    <div className="bg-[#0c0c0c] border border-neutral-800/80 rounded-3xl p-8 shadow-xl space-y-6 max-w-4xl relative overflow-hidden animate-premium-fade">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent"></div>
                        <div className="flex justify-between items-center border-b border-neutral-850 pb-4">
                            <div>
                                <h3 className="text-lg font-bold text-white">My Scanned Documents</h3>
                                <p className="text-xs text-neutral-400 mt-1">Module 9: Dynamic Cloud Locker with Secure AWS S3 Object Reference Strings.</p>
                            </div>
                            <FileText className="w-5 h-5 text-cyan-400" />
                        </div>

                        {/* S3 File Upload Box */}
                        <form onSubmit={addDocument} className="bg-[#080808] border border-neutral-850 p-5 rounded-2xl space-y-4">
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Verify & Push New AWS S3 Document Record</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-neutral-400 block uppercase">Document Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Master's Degree Transcript"
                                        value={newDocName}
                                        onChange={(e) => setNewDocName(e.target.value)}
                                        className="w-full bg-[#111111] border border-neutral-800/80 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-neutral-400 block uppercase">AWS S3 Cloud URI Reference String</label>
                                    <input 
                                        type="text" 
                                        placeholder="s3://visaformula-vault/users/usr_982/degree_trans.pdf"
                                        value={newDocS3}
                                        onChange={(e) => setNewDocS3(e.target.value)}
                                        className="w-full bg-[#111111] border border-neutral-800/80 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="bg-[#00FF66] hover:bg-[#00e055] text-black font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all select-none">
                                Push Record to Postgres
                            </button>
                        </form>
                        
                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            {documents.map((doc) => (
                                <div key={doc.id} className="bg-[#080808] border border-neutral-800/60 rounded-2xl p-5 hover:border-neutral-700 transition-colors flex flex-col justify-between gap-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="text-white font-bold text-sm">{doc.name}</div>
                                            <div className="text-[9px] text-neutral-500 font-semibold mt-1">Uploaded {doc.uploadedAt} · {doc.size}</div>
                                        </div>
                                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px] font-bold px-2 py-0.5 rounded uppercase">Verified</span>
                                    </div>
                                    <div className="bg-[#111111] p-3 rounded-xl border border-neutral-850/80 overflow-x-auto">
                                        <span className="text-[8px] text-neutral-400 font-bold block uppercase tracking-wider mb-1">AWS S3 BUCKET URI STRING</span>
                                        <code className="text-[10px] text-cyan-400 block whitespace-nowrap font-mono">{doc.s3Uri}</code>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : activeTab === "escrow" ? (
                    /* Module 11 & 12 details tab */
                    <div className="bg-[#0c0c0c] border border-neutral-800/80 rounded-3xl p-8 shadow-xl space-y-6 max-w-4xl relative overflow-hidden animate-premium-fade">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF66] to-transparent"></div>
                        <div className="flex justify-between items-center border-b border-neutral-850 pb-4">
                            <div>
                                <h3 className="text-lg font-bold text-white">Secure Escrow Milestone Ledger</h3>
                                <p className="text-xs text-neutral-400 mt-1">Module 12: View transactional status updates, safelocks, and client dispute verification metrics.</p>
                            </div>
                            <Shield className="w-5 h-5 text-emerald-400" />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-[#080808] p-5 rounded-2xl border border-neutral-800/60">
                                <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider block mb-1">TOTAL HELD FUND</span>
                                <div className="text-2xl font-black text-white">{escrowVault.heldBalance}</div>
                            </div>
                            <div className="bg-[#080808] p-5 rounded-2xl border border-neutral-800/60">
                                <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider block mb-1">RELEASED FUND</span>
                                <div className="text-2xl font-black text-emerald-400">{escrowVault.releasedBalance}</div>
                            </div>
                            <div className="bg-[#080808] p-5 rounded-2xl border border-neutral-800/60">
                                <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider block mb-1">VAULT SAFETY INDEX</span>
                                <div className="text-sm font-black text-emerald-400 mt-2 flex items-center gap-1.5">
                                    <Lock className="w-4 h-4" /> 100% SECURED BY SHIELD
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4">
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Milestone Execution Log</h4>
                            {escrowVault.milestones.map((m) => (
                                <div key={m.id} className="flex justify-between items-center bg-[#080808] px-4 py-4 rounded-xl border border-neutral-800/60">
                                    <div>
                                        <div className="text-xs font-bold text-white">{m.desc}</div>
                                        <span className="text-[9px] text-neutral-500 font-semibold block mt-1">Escrow Managed</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-white font-bold text-sm">{m.amount}</span>
                                        <span className={`text-[9px] font-black px-2.5 py-1 rounded border ${m.status === "Released" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-neutral-800 text-neutral-400 border-neutral-700"}`}>
                                            {m.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}

            </main>

            {/* MODULE 14: ADDITIONAL SERVICE REQUESTS MODAL OVERLAY */}
            {isRequestModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsRequestModalOpen(false)}></div>
                    <div className="bg-[#0c0c0c] border border-neutral-800/80 rounded-3xl w-full max-w-md p-6 shadow-2xl relative overflow-hidden z-10 text-left">
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent"></div>
                        
                        <div className="flex justify-between items-center mb-5">
                            <div>
                                <h3 className="text-base font-bold text-white">Post New Request</h3>
                                <p className="text-[10px] text-neutral-400 uppercase font-bold mt-0.5">Module 14 · Service Options</p>
                            </div>
                            <button 
                                onClick={() => setIsRequestModalOpen(false)}
                                className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:bg-neutral-800 text-neutral-400 transition-colors cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {newRequestType === "" ? (
                            <div className="space-y-4">
                                <span className="text-xs font-bold text-neutral-400 block uppercase tracking-wider">Choose Request Option Template</span>
                                
                                <button
                                    onClick={() => setNewRequestType("A")}
                                    className="w-full bg-[#080808] border border-neutral-800 hover:border-[#00F0FF] p-4 rounded-2xl text-left transition-all group cursor-pointer"
                                >
                                    <div className="text-xs font-bold text-white group-hover:text-cyan-400 mb-1">Request Type A</div>
                                    <p className="text-[11px] text-neutral-400 font-semibold leading-relaxed">"I need verification of my offer from employer in [here/abroad]"</p>
                                </button>

                                <button
                                    onClick={() => triggerPostRequest("B")}
                                    className="w-full bg-[#080808] border border-neutral-800 hover:border-[#00F0FF] p-4 rounded-2xl text-left transition-all group cursor-pointer"
                                >
                                    <div className="text-xs font-bold text-white group-hover:text-cyan-400 mb-1">Request Type B</div>
                                    <p className="text-[11px] text-neutral-400 font-semibold leading-relaxed">"I need my education doc attested."</p>
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-5">
                                <span className="text-xs font-bold text-neutral-400 block uppercase tracking-wider">Verify Country Details</span>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-400 block uppercase">Specify Destination Country</label>
                                    <input 
                                        type="text"
                                        placeholder="e.g. Canada / UK"
                                        value={newRequestTarget}
                                        onChange={(e) => setNewRequestTarget(e.target.value)}
                                        className="w-full bg-[#111111] border border-neutral-800/80 rounded-xl px-4 py-3 text-xs text-white focus:border-cyan-500 focus:outline-none"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => setNewRequestType("")}
                                        className="w-1/3 bg-transparent border border-neutral-800 text-neutral-400 py-3 rounded-xl text-xs font-bold"
                                    >
                                        Back
                                    </button>
                                    <button 
                                        onClick={() => triggerPostRequest("A")}
                                        className="w-2/3 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold py-3 rounded-xl text-xs shadow-md"
                                    >
                                        Confirm & Submit
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
