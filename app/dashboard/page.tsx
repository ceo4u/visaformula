"use client";

import { motion } from "framer-motion";
import { CheckCircle, Clock, Flag, FileText, AlertTriangle, Video, Send, Calendar, Upload, Verified } from "lucide-react";

export default function DashboardPage() {
    return (
        <main className="max-w-7xl mx-auto px-6 py-12 pb-24">
            {/* Dashboard Header */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                <h1 className="text-4xl md:text-[3.5rem] font-black tracking-tight leading-none text-on-surface mb-2 font-heading">My Dashboard</h1>
                <p className="text-lg text-on-surface-variant/70 font-medium">Manage your applications</p>
            </motion.div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }} className="bg-surface-container-lowest p-6 rounded-xl shadow-editorial flex flex-col gap-1">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">Active applications</span>
                    <span className="text-3xl font-black text-primary">2</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-surface-container-lowest p-6 rounded-xl shadow-editorial flex flex-col gap-1">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">Documents</span>
                    <span className="text-3xl font-black text-on-surface">8/11</span>
                    <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-primary h-full w-[72%] rounded-full" />
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-surface-container-lowest p-6 rounded-xl shadow-editorial flex flex-col gap-1">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">Next session</span>
                    <span className="text-lg font-black text-on-surface">Tomorrow, 10:00 AM</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-surface-container-lowest p-6 rounded-xl shadow-editorial flex flex-col gap-1">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">Days until deadline</span>
                    <span className="text-3xl font-black text-tertiary">14</span>
                </motion.div>
            </div>

            {/* Horizontal Tracker */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-surface-container-lowest p-10 rounded-xl shadow-editorial mb-12 overflow-x-auto">
                <div className="min-w-[700px] flex items-center justify-between relative">
                    <div className="absolute top-5 left-0 w-full h-0.5 bg-surface-container-high z-0" />
                    <div className="absolute top-5 left-0 w-1/3 h-0.5 bg-primary z-0" />

                    {[
                        { label: "Documents", icon: CheckCircle, done: true },
                        { label: "Review", icon: CheckCircle, done: true },
                        { label: "Interview", icon: Clock, done: false, active: true },
                        { label: "Approved", icon: Flag, done: false },
                    ].map((step) => (
                        <div key={step.label} className="relative z-10 flex flex-col items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.done ? "bg-primary text-white" : step.active ? "bg-white border-2 border-primary text-primary" : "bg-surface-container-high text-on-surface-variant"}`}>
                                <step.icon className="w-5 h-5" />
                            </div>
                            <span className={`text-sm font-bold ${!step.done && !step.active ? "text-on-surface-variant" : ""}`}>{step.label}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Column */}
                <div className="lg:col-span-8 flex flex-col gap-12">
                    {/* Document Vault */}
                    <section>
                        <div className="flex justify-between items-end mb-6">
                            <h2 className="text-2xl font-black tracking-tight font-heading">Document Vault</h2>
                            <button className="text-secondary font-bold text-sm">Upload New</button>
                        </div>
                        <div className="bg-surface-container-lowest rounded-xl shadow-editorial overflow-hidden">
                            <div className="divide-y divide-surface-container">
                                {[
                                    { name: "Passport_Final.pdf", time: "Modified 2 days ago", status: "Verified", statusColor: "text-tertiary bg-emerald-50", icon: Verified },
                                    { name: "Proof_of_Funds.jpg", time: "Modified 4 hours ago", status: "Pending", statusColor: "text-secondary bg-blue-50", icon: Clock },
                                    { name: "Background_Check.pdf", time: "Action Required", status: "Missing", statusColor: "text-red-600 bg-red-50", icon: AlertTriangle, error: true },
                                ].map((doc) => (
                                    <div key={doc.name} className="p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded flex items-center justify-center ${doc.error ? "bg-red-50" : "bg-surface-container"}`}>
                                                {doc.error ? <AlertTriangle className="w-5 h-5 text-red-500" /> : <FileText className="w-5 h-5 text-on-surface-variant" />}
                                            </div>
                                            <div>
                                                <p className={`font-bold text-sm ${doc.error ? "text-red-600" : ""}`}>{doc.name}</p>
                                                <p className="text-[11px] text-on-surface-variant">{doc.time}</p>
                                            </div>
                                        </div>
                                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${doc.statusColor}`}>
                                            <doc.icon className="w-3 h-3" />
                                            {doc.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Upcoming Sessions */}
                    <section>
                        <h2 className="text-2xl font-black tracking-tight font-heading mb-6">Upcoming Sessions</h2>
                        <div className="bg-surface-container-lowest rounded-xl shadow-editorial p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex gap-6">
                                    <div className="flex flex-col items-center justify-center bg-surface-container-high w-16 h-16 rounded-xl">
                                        <span className="text-[11px] font-black uppercase text-primary">Apr</span>
                                        <span className="text-2xl font-black">24</span>
                                    </div>
                                    <div>
                                        <h3 className="font-black text-lg font-heading">Case Review with Sarah Jenkins</h3>
                                        <p className="text-on-surface-variant text-sm mb-2">Discussing document verification and final steps.</p>
                                        <div className="flex items-center gap-4 text-[11px] font-bold text-on-surface-variant">
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 10:00 AM - 10:45 AM</span>
                                            <span className="flex items-center gap-1"><Video className="w-3 h-3" /> Video Call</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="bg-primary text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-primary-container transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
                                    <Video className="w-4 h-4" />
                                    Join Call
                                </button>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Messages */}
                <div className="lg:col-span-4">
                    <section className="sticky top-24">
                        <div className="flex justify-between items-end mb-6">
                            <h2 className="text-2xl font-black tracking-tight font-heading">Messages</h2>
                            <button className="text-secondary font-bold text-sm">View All</button>
                        </div>
                        <div className="bg-surface-container-lowest rounded-xl shadow-editorial overflow-hidden">
                            <div className="p-6 border-b border-surface-container">
                                <div className="flex items-center gap-4 mb-4">
                                    <img alt="Sarah Jenkins" className="w-12 h-12 rounded-full object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" />
                                    <div>
                                        <p className="font-black text-sm">Sarah Jenkins</p>
                                        <p className="text-[11px] text-tertiary font-bold">Online Now</p>
                                    </div>
                                </div>
                                <div className="bg-surface-container-low p-4 rounded-xl rounded-tl-none mb-4">
                                    <p className="text-sm leading-relaxed">Hi James, I&apos;ve reviewed your latest upload. Everything looks great except the background check. Could you rescan that with better lighting?</p>
                                </div>
                                <p className="text-[11px] text-on-surface-variant font-medium">Delivered 2:45 PM</p>
                            </div>
                            <div className="p-4">
                                <div className="flex items-center gap-2 bg-surface-container rounded-lg px-4 py-2">
                                    <input className="bg-transparent border-none focus:ring-0 text-sm flex-1 placeholder:text-on-surface-variant" placeholder="Type a message..." type="text" />
                                    <button className="text-primary hover:text-primary-container transition-colors"><Send className="w-5 h-5" /></button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
