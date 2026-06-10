import { useState } from "react";
import {
    Clock, CheckCircle, Lock, Calendar, BookOpen, Bookmark, AlertTriangle,
    ArrowRight, Bell, FileText, Star, Shield, TrendingUp, ChevronRight
} from "lucide-react";

const bookings = [
    {
        expert: "Marcus Thorne, JD",
        service: "Express Entry Consultation",
        date: "Apr 20, 2026 · 10:00 AM",
        status: "upcoming",
        escrow: "held",
        amount: "₹2,500",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    },
    {
        expert: "Elena Rodriguez",
        service: "Green Card Document Review",
        date: "Apr 15, 2026 · 2:00 PM",
        status: "completed",
        escrow: "released",
        amount: "₹4,500",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
    },
];

const savedExperts = [
    { name: "Raj Patel", role: "Express Entry Specialist", rating: 4.8, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face" },
    { name: "Aisha Khan", role: "UK Visa Consultant", rating: 4.6, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face" },
];

const notifications = [
    { text: "Your booking with Marcus Thorne is confirmed for Apr 20", time: "2h ago", type: "success" },
    { text: "New IELTS batch starting May 1 near you — British Council", time: "1d ago", type: "info" },
    { text: "Update: Canada Express Entry Draw #243 announced", time: "2d ago", type: "info" },
];

export function UserDashboard() {
    const [activeTab, setActiveTab] = useState<"bookings" | "saved" | "notifications">("bookings");
    const [ieltsScore, setIeltsScore] = useState({ L: 7.5, R: 7.0, W: 6.5, S: 7.0 });
    const overallBand = ((ieltsScore.L + ieltsScore.R + ieltsScore.W + ieltsScore.S) / 4).toFixed(1);

    const statusMap: Record<string, { label: string; color: string; dot: string }> = {
        upcoming: { label: "Upcoming", color: "bg-red-50 text-red-700 border-red-200", dot: "bg-red-500" },
        completed: { label: "Completed", color: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
    };

    const escrowMap: Record<string, { label: string; color: string }> = {
        held: { label: "Escrow: Held", color: "text-red-650 bg-red-50/55 border-red-150" },
        released: { label: "Payment Released", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    };

    return (
        <div className="bg-slate-50/30 min-h-screen">
            {/* Top Banner */}
            <div className="bg-gradient-to-r from-[#0c1a2e] to-[#1a3347] text-white px-6 py-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <h1 className="font-sora text-3xl font-extrabold mb-1">Welcome back, Priya 👋</h1>
                    <p className="text-white/60 text-sm font-medium">Your immigration journey dashboard</p>
                    <div className="flex flex-wrap gap-5 mt-5 text-xs font-bold uppercase tracking-wider text-white/70">
                        <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-red-400" /> 1 upcoming booking</span>
                        <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> 1 session completed</span>
                        <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-red-400" /> ₹2,500 in escrow</span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Tabs */}
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="flex border-b border-slate-200">
                            {(["bookings", "saved", "notifications"] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-3.5 text-xs font-black uppercase tracking-wider transition-all duration-300 ${activeTab === tab
                                        ? "text-red-550 border-b-2 border-red-500 bg-red-50/20"
                                        : "text-gray-400 hover:text-[#0C1A2E]"
                                        }`}
                                >
                                    {tab === "notifications" ? "Updates" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div className="p-5">
                            {/* Bookings Tab */}
                            {activeTab === "bookings" && (
                                <div className="space-y-4">
                                    {bookings.map((b, idx) => (
                                        <div key={idx} className="border border-slate-100 rounded-2xl p-4 hover:shadow-sm transition-all bg-white">
                                            <div className="flex items-center gap-3 mb-3">
                                                <img src={b.avatar} alt={b.expert} className="w-12 h-12 rounded-xl object-cover" />
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-navy text-sm">{b.expert}</h4>
                                                    <p className="text-xs text-gray-500">{b.service}</p>
                                                </div>
                                                <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full border flex items-center gap-1 ${statusMap[b.status].color}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${statusMap[b.status].dot}`} />
                                                    {statusMap[b.status].label}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2 text-[10.5px] font-bold text-gray-500 mb-3 uppercase tracking-wider">
                                                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {b.date}</span>
                                                <span className={`px-2.5 py-0.5 rounded-full border font-bold ${escrowMap[b.escrow].color}`}>
                                                    {escrowMap[b.escrow].label} · {b.amount}
                                                </span>
                                            </div>
                                            <div className="flex gap-2">
                                                {b.status === "upcoming" && (
                                                    <>
                                                        <button className="flex-1 bg-slate-900 text-white py-2 rounded-xl text-xs font-bold hover:bg-black transition-all active:scale-[0.98] shadow-sm">Join Session</button>
                                                        <button className="px-4 py-2 border border-red-200 text-red-700 rounded-xl text-xs font-bold hover:bg-red-50 transition-all active:scale-[0.98]">Reschedule</button>
                                                    </>
                                                )}
                                                {b.status === "completed" && (
                                                    <>
                                                        <a href="/find-experts" className="flex-1">
                                                            <button className="w-full border-2 border-red-200 text-red-650 py-2 rounded-xl text-xs font-bold hover:bg-red-50/50 transition-all flex items-center justify-center gap-1">
                                                                <Star className="w-3.5 h-3.5" /> Leave Review
                                                            </button>
                                                        </a>
                                                        <button className="px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-all active:scale-[0.98]">
                                                            Book Again
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    <a href="/find-experts" className="block">
                                        <button className="w-full border-2 border-dashed border-red-200 text-red-600 py-3 rounded-2xl text-xs font-black uppercase tracking-wider hover:bg-red-50/20 transition-all flex items-center justify-center gap-2">
                                            <ArrowRight className="w-4 h-4" /> Find & Book a New Expert
                                        </button>
                                    </a>
                                </div>
                            )}

                            {/* Saved Tab */}
                            {activeTab === "saved" && (
                                <div className="space-y-3">
                                    {savedExperts.map((e, idx) => (
                                        <div key={idx} className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl hover:shadow-sm transition-all bg-white">
                                            <img src={e.avatar} alt={e.name} className="w-12 h-12 rounded-xl object-cover" />
                                            <div className="flex-1">
                                                <div className="font-bold text-navy text-sm">{e.name}</div>
                                                <div className="text-xs text-gray-400">{e.role}</div>
                                                <div className="flex items-center gap-1 text-xs font-semibold mt-0.5">
                                                    <Star className="w-3 h-3 text-amber-550 fill-amber-500" /> {e.rating}
                                                </div>
                                            </div>
                                            <a href="/find-experts">
                                                <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-black transition-all active:scale-[0.98] shadow-sm">Book</button>
                                            </a>
                                        </div>
                                    ))}
                                    {savedExperts.length === 0 && (
                                        <div className="text-center py-10 text-gray-400">
                                            <Bookmark className="w-10 h-10 mx-auto mb-3 opacity-40" />
                                            <p className="text-sm font-medium">No saved experts yet</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Notifications Tab */}
                            {activeTab === "notifications" && (
                                <div className="space-y-3">
                                    {notifications.map((n, idx) => (
                                        <div key={idx} className="flex items-start gap-3 p-4 border border-slate-100 rounded-2xl hover:shadow-sm transition-all bg-white">
                                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${n.type === "success" ? "bg-emerald-100" : "bg-red-50"}`}>
                                                {n.type === "success" ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <Bell className="w-4 h-4 text-red-500" />}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-navy font-medium leading-relaxed">{n.text}</p>
                                                <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Escrow Status Card */}
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">
                        <h3 className="font-sora font-bold text-navy mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-red-500" /> Escrow Status
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { label: "Held Safely", amount: "₹2,500", color: "bg-red-50/50 border-red-100 text-red-750" },
                                { label: "Released", amount: "₹4,500", color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
                                { label: "Total Spent", amount: "₹7,000", color: "bg-slate-50 border-slate-200 text-slate-700" },
                            ].map((item) => (
                                <div key={item.label} className={`rounded-2xl border p-3 text-center ${item.color}`}>
                                    <div className="font-bold text-base">{item.amount}</div>
                                    <div className="text-[10px] font-bold uppercase mt-0.5 opacity-80">{item.label}</div>
                                </div>
                            ))}
                        </div>
                        <a href="/escrow">
                            <button className="mt-4 w-full border border-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-slate-50 transition-all flex items-center justify-center gap-1 shadow-sm">
                                View Escrow Details <ChevronRight className="w-4 h-4 text-red-500" />
                            </button>
                        </a>
                    </div>

                    {/* Document Vault */}
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">
                        <h3 className="font-sora font-bold text-navy mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-red-500" /> Document Vault
                        </h3>
                        <div className="space-y-3">
                            {[
                                { label: "Passport scan", status: "uploaded", icon: "✅" },
                                { label: "IELTS Score Card", status: "pending", icon: "⚠️" },
                                { label: "Financial Statement", status: "missing", icon: "❌" },
                                { label: "Offer Letter", status: "uploaded", icon: "✅" },
                                { label: "SOP / Cover Letter", status: "pending", icon: "⚠️" },
                            ].map((doc) => (
                                <div key={doc.label} className={`flex items-center justify-between p-3 rounded-2xl border ${doc.status === "uploaded" ? "border-emerald-250 bg-emerald-50/30" :
                                        doc.status === "pending" ? "border-red-150 bg-red-50/20" :
                                            "border-slate-200 bg-slate-50/50"
                                    }`}>
                                    <span className="text-xs font-bold text-navy">{doc.icon} {doc.label}</span>
                                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${doc.status === "uploaded" ? "bg-emerald-100 text-emerald-700" :
                                            doc.status === "pending" ? "bg-red-100 text-red-700" :
                                                "bg-slate-200 text-slate-700"
                                        }`}>{doc.status}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3 bg-red-50/30 rounded-2xl p-4 text-center border border-red-100">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Documents Ready</span>
                            <div className="font-sora text-3xl font-extrabold text-red-500">2 / 5</div>
                            <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
                                <div className="h-full bg-red-500 rounded-full" style={{ width: "40%" }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-5">
                    {/* IELTS Tracker */}
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">
                        <h3 className="font-sora font-bold text-navy mb-1 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-red-500" /> IELTS Tracker
                        </h3>
                        <p className="text-xs text-gray-400 mb-4">Track your current band scores</p>
                        <div className="space-y-3">
                            {(["L", "R", "W", "S"] as const).map((key) => {
                                const labels: Record<string, string> = { L: "Listening", R: "Reading", W: "Writing", S: "Speaking" };
                                const score = ieltsScore[key];
                                return (
                                    <div key={key}>
                                        <div className="flex justify-between text-xs font-semibold mb-1">
                                            <span className="text-gray-600 font-medium">{labels[key]}</span>
                                            <span className="text-red-500 font-bold">{score}</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-red-500 rounded-full" style={{ width: `${(score / 9) * 100}%` }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-4 bg-red-50/20 rounded-2xl p-4 text-center border border-red-100">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Overall Band</span>
                            <div className="font-sora text-4xl font-extrabold text-red-500">{overallBand}</div>
                            <span className="text-[10px] text-gray-400 font-bold">Target: 7.0 for Canada PR</span>
                        </div>
                        <a href="/training" className="block mt-3">
                            <button className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-black transition-all active:scale-[0.98] shadow-sm">
                                Find IELTS Coaching
                            </button>
                        </a>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">
                        <h3 className="font-sora font-bold text-navy mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                            {[
                                { label: "Find Immigration Expert", href: "/find-experts", icon: Star, color: "text-red-500" },
                                { label: "Check Visa Guides", href: "/visa-guide/canada/express-entry", icon: FileText, color: "text-violet-500" },
                                { label: "Emergency Help Portal", href: "/emergency", icon: AlertTriangle, color: "text-red-500" },
                            ].map((action) => (
                                <a key={action.href} href={action.href} className="block">
                                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50/45 transition-all cursor-pointer group">
                                        <action.icon className={`w-5 h-5 ${action.color} shrink-0`} />
                                        <span className="text-xs font-bold text-navy group-hover:text-red-500 transition-colors">{action.label}</span>
                                        <ChevronRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-red-500 transition-colors" />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Emergency Banner */}
                    <a href="/emergency" className="block">
                        <div className="bg-white border-l-4 border-red-500 rounded-3xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                            </div>
                            <div>
                                <h4 className="font-bold text-navy text-sm">Need Emergency Help?</h4>
                                <p className="text-xs text-gray-400 font-medium">Overstay, denial, or deportation risk?</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-red-400 ml-auto group-hover:translate-x-1 transition-transform" />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
