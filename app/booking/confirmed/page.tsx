"use client";
import Link from "next/link";
import { CheckCircle, Calendar, Shield, ArrowRight, Download, Copy } from "lucide-react";

export default function BookingConfirmedPage() {
    return (
        <div className="bg-[#f0f4f8] min-h-screen flex items-center justify-center px-4 py-16">
            <div className="max-w-lg w-full">
                <div className="bg-white rounded-2xl border border-sky-100 shadow-card p-8 text-center">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h1 className="font-sora text-2xl font-extrabold text-navy mb-2">Booking Confirmed!</h1>
                    <p className="text-gray-500 text-sm mb-6">Your session has been booked and payment is held in escrow.</p>

                    <div className="bg-sky-50 rounded-xl p-4 mb-6 text-left">
                        <div className="text-xs font-bold text-gray-400 uppercase mb-2">Booking Details</div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-gray-500">Booking ID</span><span className="font-mono font-bold text-navy flex items-center gap-1">VIS-2025-0042 <Copy className="w-3 h-3 text-gray-400 cursor-pointer hover:text-[#0ea5e9]" /></span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Expert</span><span className="font-semibold text-navy">Marcus Thorne, JD</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Session</span><span className="font-semibold text-navy">H-1B Consultation (60 min)</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Date & Time</span><span className="font-semibold text-navy">Apr 25, 2025 · 10:00 AM</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Amount</span><span className="font-semibold text-navy">₹13,125</span></div>
                        </div>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 mb-6 flex items-center justify-center gap-2">
                        <Shield className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-semibold text-emerald-700">Payment held in escrow until session is complete</span>
                    </div>

                    <div className="flex gap-3 mb-6">
                        <button className="flex-1 bg-white border border-sky-200 text-[#0284c7] py-3 rounded-xl font-bold text-sm hover:bg-sky-50 transition-all flex items-center justify-center gap-2">
                            <Calendar className="w-4 h-4" /> Add to Calendar
                        </button>
                        <button className="flex-1 bg-white border border-sky-200 text-[#0284c7] py-3 rounded-xl font-bold text-sm hover:bg-sky-50 transition-all flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" /> Download Receipt
                        </button>
                    </div>

                    <Link href="/dashboard">
                        <button className="w-full bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-sky-200 transition-all flex items-center justify-center gap-2">
                            Go to Dashboard <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
