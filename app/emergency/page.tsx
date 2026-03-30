"use client";

import { motion } from "framer-motion";
import { AlertCircle, FileText, Globe, Gavel, Scale, Fingerprint } from "lucide-react";

export default function EmergencyPage() {
    return (
        <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <div className="w-20 h-20 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-10 h-10" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Emergency Immigration Assistance</h1>
                <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
                    Immediate legal support for urgent visa situations, detainment, and expiring status.
                </p>
            </div>

            <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-8 mb-12">
                <h2 className="text-2xl font-bold mb-6 text-destructive flex items-center gap-2">
                    <AlertCircle className="w-6 h-6" /> 24/7 Hotline
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1">
                        <p className="text-on-surface-variant font-medium mb-2">Call our emergency legal hotline for immediate assistance with detention, deportation warnings, or sudden status changes.</p>
                        <h3 className="text-3xl font-black text-on-surface">1-800-VISA-HELP</h3>
                    </div>
                    <button className="w-full md:w-auto px-8 py-4 bg-destructive text-white rounded-xl font-bold text-lg hover:bg-destructive/90 transition-colors shadow-lg shadow-destructive/20">
                        Call Now
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {[
                    { icon: Fingerprint, title: "Detained at Border", desc: "Immediate legal representation for CBP or ICE detention cases." },
                    { icon: FileText, title: "Visa Denials", desc: "Rapid response to recent NOID or denials from immigration services." },
                    { icon: AlertCircle, title: "Status Expiring", desc: "Emergency applications to extend status and avoid accrual of unlawful presence." },
                    { icon: Gavel, title: "Deportation Defense", desc: "Experienced attorneys to represent you in immigration court." },
                ].map((item, i) => (
                    <div key={i} className="bg-surface-container-lowest p-6 rounded-2xl border flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <item.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                            <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
