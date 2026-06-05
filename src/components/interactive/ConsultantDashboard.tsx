import { useState } from "react";
import { DollarSign, Users, CheckCircle, Clock, TrendingUp, BarChart3, GripVertical, Settings } from "lucide-react";

const stats = [
    { label: "Total Earnings", value: "₹4,85,000", icon: DollarSign, change: "+12%", color: "text-emerald-600 bg-emerald-50" },
    { label: "Active Clients", value: "18", icon: Users, change: "+3", color: "text-[#f59e0b] bg-yellow-50" },
    { label: "Completed Visas", value: "142", icon: CheckCircle, change: "+8", color: "text-violet-600 bg-violet-50" },
    { label: "This Month", value: "₹62,500", icon: TrendingUp, change: "+22%", color: "text-amber-600 bg-amber-50" },
];

const columns = [
    {
        id: "new", title: "New Requests", color: "border-yellow-300", cards: [
            { name: "Priya Sharma", visa: "Express Entry", days: 1, urgent: false },
            { name: "Rahul Verma", visa: "H-1B Transfer", days: 0, urgent: true },
        ]
    },
    {
        id: "waiting", title: "Waiting on Client", color: "border-amber-300", cards: [
            { name: "Ananya Patel", visa: "UK Student", days: 3, urgent: false },
        ]
    },
    {
        id: "processing", title: "Processing", color: "border-blue-300", cards: [
            { name: "Deepak Kumar", visa: "Australia PR", days: 5, urgent: false },
            { name: "Fatima Ali", visa: "Canada Study", days: 7, urgent: false },
            { name: "Arjun Nair", visa: "Germany JSV", days: 2, urgent: false },
        ]
    },
    {
        id: "completed", title: "Completed", color: "border-emerald-300", cards: [
            { name: "Meera Joshi", visa: "Canada PR", days: 0, urgent: false },
            { name: "Vikram Singh", visa: "US B-1 Visa", days: 0, urgent: false },
        ]
    },
];

const services = [
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

    const toggleSlot = (key: string) => {
        setAvailability(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="bg-[#fff5f5] min-h-screen">
            {/* Header */}
            <section className="bg-gradient-to-r from-[#0c1a2e] to-[#1a3347] text-white py-12 px-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="font-sora text-3xl font-extrabold">Consultant Dashboard</h1>
                        <p className="text-white/60 text-sm font-medium">Welcome back, Marcus Thorne, JD</p>
                    </div>
                    <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2">
                        <Settings className="w-4 h-4" /> Settings
                    </button>
                </div>
            </section>

            {/* Stats */}
            <section className="max-w-7xl mx-auto px-4 -mt-6 relative z-10 mb-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map(s => (
                        <div key={s.label} className="bg-white rounded-3xl border border-yellow-100 p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                                    <s.icon className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{s.change}</span>
                            </div>
                            <div className="font-sora text-2xl font-extrabold text-navy">{s.value}</div>
                            <div className="text-xs text-gray-400 mt-0.5 font-bold uppercase tracking-wider">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Kanban */}
            <section className="max-w-7xl mx-auto px-4 mb-10">
                <h2 className="font-sora text-xl font-bold text-navy mb-5 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#f59e0b]" /> Client Pipeline Kanban
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {columns.map(col => (
                        <div key={col.id} className={`bg-white rounded-3xl border-t-4 ${col.color} border border-gray-100 p-4 min-h-[220px]`}>
                            <h3 className="font-bold text-sm text-navy mb-3 flex items-center justify-between uppercase tracking-wider text-[11px]">
                                {col.title}
                                <span className="w-6 h-6 bg-gray-100 rounded-full text-xs flex items-center justify-center font-bold text-gray-500">{col.cards.length}</span>
                            </h3>
                            <div className="space-y-2.5">
                                {col.cards.map(card => (
                                    <div key={card.name} className={`bg-yellow-50/50 rounded-2xl p-3.5 border ${card.urgent ? "border-yellow-200 bg-yellow-50/50" : "border-yellow-100"} cursor-grab hover:shadow-sm transition-all group`}>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="font-bold text-[#0c1a2e] text-xs">{card.name}</h4>
                                                <span className="text-[9px] bg-yellow-100 text-amber-700 px-2 py-0.5 rounded-full font-bold mt-1.5 inline-block uppercase tracking-wider">{card.visa}</span>
                                            </div>
                                            <GripVertical className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        {card.days > 0 && <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-2.5 flex items-center gap-1"><Clock className="w-3 h-3 text-[#f59e0b]" /> {card.days}d in column</p>}
                                        {card.urgent && <p className="text-[9px] text-amber-500 font-black uppercase tracking-widest mt-1.5 animate-pulse">🚨 Emergency Urgent</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services + Availability side by side */}
            <section className="max-w-7xl mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Services */}
                    <div className="bg-white rounded-3xl border border-yellow-100 p-6 shadow-sm">
                        <h3 className="font-sora font-bold text-navy mb-5">Service Offered & Escrow Pricing</h3>
                        <div className="space-y-3">
                            {services.map(s => (
                                <div key={s.name} className="flex items-center justify-between p-3.5 bg-yellow-50/50 rounded-2xl border border-yellow-100">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2.5 h-2.5 rounded-full ${s.active ? "bg-emerald-500 animate-pulse" : "bg-gray-300"}`} />
                                        <span className="text-xs font-bold text-navy">{s.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-black text-xs text-navy">{s.price}</span>
                                        <button className="text-[10px] text-[#f59e0b] font-black uppercase tracking-wider hover:underline">Edit</button>
                                    </div>
                                </div>
                            ))}
                            <button className="w-full py-3 border-2 border-dashed border-yellow-200 text-[#f59e0b] font-black text-xs uppercase tracking-wider rounded-2xl hover:bg-yellow-50 transition-colors">+ Add New Custom Package</button>
                        </div>
                    </div>

                    {/* Availability */}
                    <div className="bg-white rounded-3xl border border-yellow-100 p-6 shadow-sm">
                        <h3 className="font-sora font-bold text-navy mb-5">Weekly Interview Availability</h3>
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
                                                    className={`p-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${available ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "bg-gray-50 text-gray-300 hover:bg-gray-100"
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
        </div>
    );
}

