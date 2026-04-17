"use client";
import { useState } from "react";
import { Shield, CheckCircle, Lock, ArrowRight, AlertTriangle, CreditCard, User, Clock } from "lucide-react";

const steps = [
    { num: 1, label: "You Pay", desc: "Pay securely via Razorpay. Funds are held safely.", icon: CreditCard },
    { num: 2, label: "Session Delivered", desc: "Expert provides the consultation or service.", icon: User },
    { num: 3, label: "You Confirm", desc: "Confirm that the session was satisfactory.", icon: CheckCircle },
    { num: 4, label: "Expert Gets Paid", desc: "Funds are released to the expert's account.", icon: ArrowRight },
];

const protections = [
    { title: "No-Show Protection", desc: "If the expert doesn't show up, you get a full refund automatically.", icon: Clock, color: "bg-red-50 text-red-600 border-red-100" },
    { title: "Quality Guarantee", desc: "If the service doesn't meet promised standards, raise a dispute.", icon: Shield, color: "bg-amber-50 text-amber-600 border-amber-100" },
    { title: "Fraud Prevention", desc: "Funds are never directly accessible to the expert until you confirm.", icon: Lock, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { title: "Dispute Resolution", desc: "Our team reviews disputes within 48 hours with fair mediation.", icon: AlertTriangle, color: "bg-sky-50 text-sky-600 border-sky-100" },
];

const mockBookings = [
    { id: "B001", expert: "Marcus Thorne, JD", service: "H-1B Consultation", amount: "$150", status: "held", date: "Apr 20, 2025" },
    { id: "B002", expert: "Elena Rodriguez", service: "Green Card Review", amount: "$100", status: "held", date: "Apr 18, 2025" },
];

export default function EscrowPage() {
    const [activeStep, setActiveStep] = useState(2);

    return (
        <div className="bg-[#f0f4f8] min-h-screen">
            {/* Hero */}
            <section className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 text-white py-20 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                        <Shield className="w-4 h-4" /> Escrow Protected Payments
                    </div>
                    <h1 className="font-sora text-4xl md:text-5xl font-extrabold mb-4">Pay Safe, Get Service</h1>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto">Your money is held securely until you confirm the service is complete. Zero extra charge.</p>
                </div>
            </section>

            {/* 4-Step Visual Flow */}
            <section className="max-w-4xl mx-auto px-4 -mt-10 relative z-10 mb-14">
                <div className="bg-white rounded-2xl shadow-card border border-sky-100 p-8">
                    <h2 className="font-sora text-xl font-bold text-navy mb-8 text-center">How Visara Escrow Works</h2>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-2">
                        {steps.map((step, i) => (
                            <div key={step.num} className="flex-1 flex flex-col items-center text-center relative">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-all ${i < activeStep ? "bg-emerald-500 text-white shadow-md" :
                                        i === activeStep ? "bg-[#0ea5e9] text-white shadow-lg shadow-sky-200 scale-110" :
                                            "bg-gray-100 text-gray-400"
                                    }`}>
                                    <step.icon className="w-6 h-6" />
                                </div>
                                <h3 className={`font-bold text-sm mb-1 ${i <= activeStep ? "text-navy" : "text-gray-400"}`}>{step.label}</h3>
                                <p className="text-xs text-gray-500 max-w-[150px]">{step.desc}</p>
                                {i < steps.length - 1 && (
                                    <div className={`hidden md:block absolute top-7 left-[calc(50%+35px)] w-[calc(100%-70px)] h-[3px] rounded-full ${i < activeStep ? "bg-emerald-400" : "bg-gray-200"
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Protections */}
            <section className="max-w-5xl mx-auto px-4 mb-14">
                <h2 className="font-sora text-2xl font-bold text-navy mb-8 text-center">What Escrow Protects You From</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {protections.map(p => (
                        <div key={p.title} className={`rounded-2xl border p-6 flex items-start gap-4 ${p.color}`}>
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                                <p.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-navy text-sm mb-1">{p.title}</h3>
                                <p className="text-sm text-gray-600">{p.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Active Bookings */}
            <section className="max-w-5xl mx-auto px-4 mb-14">
                <h2 className="font-sora text-2xl font-bold text-navy mb-6">Your Active Escrow Bookings</h2>
                <div className="space-y-4">
                    {mockBookings.map(b => (
                        <div key={b.id} className="bg-white rounded-2xl border border-sky-100 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center">
                                    <Lock className="w-5 h-5 text-[#0ea5e9]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-navy text-sm">{b.expert}</h3>
                                    <p className="text-xs text-gray-500">{b.service} · {b.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">🔒 {b.amount} Held</span>
                                <button className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all">Confirm Delivery</button>
                                <button className="bg-white border border-red-200 text-red-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-50 transition-all">Dispute</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Legal */}
            <section className="bg-white border-t border-gray-200 py-8">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <p className="text-xs text-gray-400">0% extra charge for escrow protection. Funds held in Razorpay nodal account. DPDP compliant. All transactions are SSL encrypted.</p>
                </div>
            </section>
        </div>
    );
}
