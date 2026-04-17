"use client";
import { useState } from "react";
import { DollarSign, Users, CheckCircle, Calendar, TrendingUp, Clock, ArrowRight, Settings, BarChart3, GripVertical } from "lucide-react";

const stats = [
    { label: "Total Earnings", value: "₹4,85,000", icon: DollarSign, change: "+12%", color: "text-emerald-600 bg-emerald-50" },
    { label: "Active Clients", value: "18", icon: Users, change: "+3", color: "text-[#0ea5e9] bg-sky-50" },
    { label: "Completed Visas", value: "142", icon: CheckCircle, change: "+8", color: "text-violet-600 bg-violet-50" },
    { label: "This Month", value: "₹62,500", icon: TrendingUp, change: "+22%", color: "text-amber-600 bg-amber-50" },
];

const columns = [
    {
        id: "new", title: "New Requests", color: "border-sky-300", cards: [
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

export default function ConsultantDashboardPage() {
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
        <div className="bg-[#f0f4f8] min-h-screen">
            {/* Header */}
            <section className="bg-gradient-to-r from-navy to-ink text-white py-8 px-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="font-sora text-2xl font-bold">Consultant Dashboard</h1>
                        <p className="text-white/60 text-sm">Welcome back, Marcus</p>
                    </div>
                    <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2">
                        <Settings className="w-4 h-4" /> Settings
                    </button>
                </div>
            </section>

            {/* Stats */}
            <section className="max-w-7xl mx-auto px-4 -mt-5 relative z-10 mb-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map(s => (
                        <div key={s.label} className="bg-white rounded-2xl border border-sky-100 p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                                    <s.icon className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{s.change}</span>
                            </div>
                            <div className="font-sora text-2xl font-extrabold text-navy">{s.value}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Kanban */}
            <section className="max-w-7xl mx-auto px-4 mb-10">
                <h2 className="font-sora text-lg font-bold text-navy mb-5 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-[#0ea5e9]" /> Client Pipeline</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {columns.map(col => (
                        <div key={col.id} className={`bg-white rounded-2xl border-t-4 ${col.color} border border-gray-100 p-4 min-h-[200px]`}>
                            <h3 className="font-bold text-sm text-navy mb-3 flex items-center justify-between">
                                {col.title}
                                <span className="w-6 h-6 bg-gray-100 rounded-full text-xs flex items-center justify-center font-bold text-gray-500">{col.cards.length}</span>
                            </h3>
                            <div className="space-y-2.5">
                                {col.cards.map(card => (
                                    <div key={card.name} className={`bg-sky-50/50 rounded-xl p-3 border ${card.urgent ? "border-red-200 bg-red-50/50" : "border-sky-100"} cursor-grab hover:shadow-sm transition-all group`}>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="font-semibold text-navy text-sm">{card.name}</h4>
                                                <span className="text-[10px] bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full font-semibold mt-1 inline-block">{card.visa}</span>
                                            </div>
                                            <GripVertical className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        {card.days > 0 && <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1"><Clock className="w-3 h-3" /> {card.days}d in column</p>}
                                        {card.urgent && <p className="text-[10px] text-red-500 font-bold mt-1">🚨 Emergency</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services + Availability side by side */}
            <section className="max-w-7xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Services */}
                    <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm">
                        <h3 className="font-sora font-bold text-navy mb-5">Service & Pricing</h3>
                        <div className="space-y-3">
                            {services.map(s => (
                                <div key={s.name} className="flex items-center justify-between p-3 bg-sky-50/50 rounded-xl border border-sky-100">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${s.active ? "bg-emerald-500" : "bg-gray-300"}`} />
                                        <span className="text-sm font-medium text-navy">{s.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-sm text-navy">{s.price}</span>
                                        <button className="text-xs text-[#0ea5e9] font-semibold hover:underline">Edit</button>
                                    </div>
                                </div>
                            ))}
                            <button className="w-full py-2.5 border-2 border-dashed border-sky-200 text-[#0ea5e9] font-bold text-sm rounded-xl hover:bg-sky-50 transition-colors">+ Add New Service</button>
                        </div>
                    </div>

                    {/* Availability */}
                    <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm">
                        <h3 className="font-sora font-bold text-navy mb-5">Weekly Availability</h3>
                        <div className="overflow-x-auto">
                            <div className="grid grid-cols-8 gap-1 min-w-[500px]">
                                <div className="text-xs font-bold text-gray-400 p-2"></div>
                                {weekDays.map(d => <div key={d} className="text-xs font-bold text-center text-gray-500 p-2">{d}</div>)}
                                {timeSlots.map(t => (
                                    <>
                                        <div key={`label-${t}`} className="text-[10px] font-semibold text-gray-400 p-2 flex items-center">{t}</div>
                                        {weekDays.map(d => {
                                            const key = `${d}-${t}`;
                                            const available = availability[key] || false;
                                            return (
                                                <button key={key} onClick={() => toggleSlot(key)}
                                                    className={`p-2 rounded-lg text-xs font-semibold transition-all ${available ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "bg-gray-50 text-gray-300 hover:bg-gray-100"
                                                        }`}>
                                                    {available ? "✓" : "–"}
                                                </button>
                                            );
                                        })}
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
