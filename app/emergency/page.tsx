"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Upload, QrCode, BarChart3, Star, Phone, Gavel } from "lucide-react";

const respondingAttorneys = [
    { name: "David Kessler", status: "Open Now", expertise: "H1-B Revocations", rating: 5, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face" },
    { name: "Elena Rodriguez", status: "Online", expertise: "Deportation Defense", rating: 4, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face" },
    { name: "Marcus Thorne", status: "Active", expertise: "Overstay Petitions", rating: 5, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
];

export default function EmergencyPage() {
    return (
        <div className="mb-20">
            {/* ALERT BAR */}
            <div className="bg-primary-container text-white py-2 px-4 text-center sticky top-16 z-40 shadow-md">
                <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
                    <Gavel className="w-4 h-4" />
                    <span className="text-xs md:text-sm font-bold tracking-wider uppercase">Emergency Legal Help — 24/7 Response Available</span>
                </div>
            </div>

            <main className="max-w-5xl mx-auto px-6 py-12">
                {/* HERO */}
                <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12 bg-blue-50 p-8 rounded-xl border border-blue-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-primary leading-tight mb-4 font-heading">
                                Visa expired or facing legal risk?
                            </h1>
                            <p className="text-lg text-on-surface-variant mb-8 max-w-md">
                                Upload your documents to get a quick preliminary check and connect with available lawyers immediately.
                            </p>
                            <div className="flex flex-wrap gap-8">
                                {[
                                    { value: "140+", label: "On-call Lawyers" },
                                    { value: "<3m", label: "Response Time" },
                                    { value: "Live", label: "Active Support" },
                                ].map((s) => (
                                    <div key={s.label}>
                                        <div className="text-2xl font-bold text-primary">{s.value}</div>
                                        <div className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant opacity-70">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative rounded-lg overflow-hidden h-64 shadow-xl">
                            <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop" alt="Legal office" />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                        </div>
                    </div>
                </motion.section>

                {/* UPLOAD ZONES */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-surface-container-lowest p-8 rounded-xl shadow-editorial border-2 border-dashed border-surface-container-highest hover:border-primary transition-colors cursor-pointer group">
                        <div className="flex flex-col items-center text-center">
                            <Upload className="w-10 h-10 text-on-surface-variant group-hover:text-primary mb-4 transition-colors" />
                            <h3 className="text-lg font-bold mb-1 font-heading">Passport Scan</h3>
                            <p className="text-sm text-on-surface-variant">Upload ID or Bio-data page</p>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-surface-container-lowest p-8 rounded-xl shadow-editorial border-2 border-dashed border-surface-container-highest hover:border-primary transition-colors cursor-pointer group">
                        <div className="flex flex-col items-center text-center">
                            <QrCode className="w-10 h-10 text-on-surface-variant group-hover:text-primary mb-4 transition-colors" />
                            <h3 className="text-lg font-bold mb-1 font-heading">Current Visa / I-94</h3>
                            <p className="text-sm text-on-surface-variant">Upload most recent status document</p>
                        </div>
                    </motion.div>
                </section>

                {/* ANALYZE BUTTON */}
                <div className="mb-16">
                    <button className="w-full bg-primary-container text-white py-4 rounded-lg text-lg font-black uppercase tracking-widest shadow-lg hover:bg-primary transition-all flex items-center justify-center gap-3 active:scale-95">
                        <BarChart3 className="w-5 h-5" />
                        Analyze Legal Status Now
                    </button>
                </div>

                {/* AI RESULT CARD */}
                <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-surface-container-lowest p-8 md:p-12 rounded-xl shadow-editorial-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0">
                        <div className="bg-primary text-white text-[10px] font-bold px-4 py-1.5 uppercase tracking-wider rounded-bl-lg">
                            Real-time Analysis
                        </div>
                    </div>

                    <div className="flex items-start gap-6 mb-10">
                        <div className="p-4 bg-red-50 rounded-full text-red-600">
                            <AlertTriangle className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-on-surface tracking-tight font-heading">Issue Detected</h2>
                            <p className="text-on-surface-variant">Based on the provided documents, we have identified a critical status misalignment.</p>
                        </div>
                    </div>

                    {/* Risk Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="p-6 bg-surface-container rounded-lg border-l-4 border-primary">
                            <div className="text-xs uppercase font-bold text-on-surface-variant mb-2">Overstay Risk</div>
                            <div className="text-2xl font-black text-primary uppercase">Critical</div>
                        </div>
                        <div className="p-6 bg-surface-container rounded-lg border-l-4 border-tertiary">
                            <div className="text-xs uppercase font-bold text-on-surface-variant mb-2">Work Authorization</div>
                            <div className="text-2xl font-black text-tertiary uppercase">Active</div>
                        </div>
                        <div className="p-6 bg-surface-container rounded-lg border-l-4 border-secondary">
                            <div className="text-xs uppercase font-bold text-on-surface-variant mb-2">Grace Period</div>
                            <div className="text-2xl font-black text-secondary uppercase tracking-tighter">0 Days Left</div>
                        </div>
                    </div>

                    {/* Immediate Protocol */}
                    <div className="mb-12">
                        <h4 className="text-xs uppercase font-black tracking-widest text-on-surface-variant mb-6 flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-surface-container-highest" />
                            Immediate Protocol
                        </h4>
                        <ul className="space-y-4">
                            {[
                                "Secure all physical copies of your I-94 and most recent I-797 notice.",
                                "Avoid filing for status extensions until legal counsel has reviewed your \"Intent to Deny\" risk.",
                                "Initiate a protected communication channel with one of the responding attorneys below.",
                            ].map((step, i) => (
                                <li key={i} className="flex gap-4 items-start">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">{i + 1}</span>
                                    <p className="text-sm leading-relaxed">{step}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Responding Attorneys */}
                    <div className="mb-10">
                        <h4 className="text-xs uppercase font-black tracking-widest text-on-surface-variant mb-6 flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-surface-container-highest" />
                            Responding Attorneys (Online Now)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {respondingAttorneys.map((att) => (
                                <div key={att.name} className="p-4 bg-surface-container-low rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                                    <div className="flex items-center gap-3 mb-3">
                                        <img className="w-10 h-10 rounded-full object-cover grayscale" src={att.image} alt={att.name} />
                                        <div>
                                            <div className="text-sm font-bold">{att.name}</div>
                                            <div className="text-[10px] text-tertiary font-bold uppercase">{att.status}</div>
                                        </div>
                                    </div>
                                    <div className="flex text-primary mb-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star key={i} className="w-3 h-3" fill={i <= att.rating ? "currentColor" : "none"} strokeWidth={i <= att.rating ? 0 : 1.5} />
                                        ))}
                                    </div>
                                    <div className="text-[11px] text-on-surface-variant">Expertise: {att.expertise}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="w-full bg-primary py-4 rounded-lg text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:bg-primary-container transition-all active:scale-95">
                        <Phone className="w-5 h-5" />
                        Connect to Emergency Lawyer
                    </button>
                </motion.section>
            </main>
        </div>
    );
}
