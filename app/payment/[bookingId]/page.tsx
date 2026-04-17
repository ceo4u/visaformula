"use client";
import { useState } from "react";
import { Lock, Shield, CreditCard, Smartphone, Building2, CheckCircle, ArrowRight } from "lucide-react";

export default function PaymentPage({ params }: { params: { bookingId: string } }) {
    const [method, setMethod] = useState("upi");

    const booking = {
        expert: "Marcus Thorne, JD",
        service: "H-1B Visa Consultation (60 min)",
        date: "Apr 25, 2025 • 10:00 AM IST",
        consultFee: 12500,
        platformFee: 625,
        total: 13125,
    };

    return (
        <div className="bg-[#f0f4f8] min-h-screen py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="font-sora text-2xl font-bold text-navy mb-2">Checkout</h1>
                <p className="text-sm text-gray-500 mb-8">Complete your payment to confirm your booking</p>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Payment Methods */}
                    <div className="lg:col-span-3 space-y-5">
                        {/* Escrow Notice */}
                        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
                            <Lock className="w-5 h-5 text-emerald-600 shrink-0" />
                            <p className="text-sm text-emerald-800 font-medium">Your payment will be held in escrow until session is confirmed complete.</p>
                        </div>

                        {/* Method Tabs */}
                        <div className="bg-white rounded-2xl border border-sky-100 shadow-sm overflow-hidden">
                            <div className="flex border-b border-gray-100">
                                {[
                                    { id: "upi", label: "UPI", icon: Smartphone },
                                    { id: "card", label: "Card", icon: CreditCard },
                                    { id: "netbanking", label: "Net Banking", icon: Building2 },
                                ].map(m => (
                                    <button key={m.id} onClick={() => setMethod(m.id)}
                                        className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-all relative ${method === m.id ? "text-[#0ea5e9] bg-sky-50/50" : "text-gray-500 hover:text-gray-700"}`}>
                                        <m.icon className="w-4 h-4" /> {m.label}
                                        {method === m.id && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0ea5e9]" />}
                                    </button>
                                ))}
                            </div>

                            <div className="p-6">
                                {method === "upi" && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">UPI ID</label>
                                            <input placeholder="yourname@upi" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" />
                                        </div>
                                        <p className="text-xs text-gray-400 text-center">Or scan QR code in Razorpay popup</p>
                                    </div>
                                )}
                                {method === "card" && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Card Number</label>
                                            <input placeholder="4111 1111 1111 1111" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Expiry</label>
                                                <input placeholder="MM/YY" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">CVV</label>
                                                <input placeholder="123" type="password" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {method === "netbanking" && (
                                    <div className="space-y-3">
                                        {["SBI", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra"].map(bank => (
                                            <label key={bank} className="flex items-center gap-3 p-3 bg-sky-50/30 border border-sky-100 rounded-xl cursor-pointer hover:bg-sky-50 transition-colors">
                                                <input type="radio" name="bank" className="text-[#0ea5e9]" />
                                                <span className="text-sm font-medium">{bank}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}

                                <button className="mt-6 w-full bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white py-4 rounded-xl font-bold text-base hover:shadow-lg hover:shadow-sky-200 transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                                    Pay ₹{booking.total.toLocaleString()} <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex justify-center gap-6 text-xs text-gray-400 font-semibold">
                            <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> SSL Secured</span>
                            <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Razorpay</span>
                            <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> DPDP Compliant</span>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm sticky top-24">
                            <h3 className="font-sora font-bold text-navy text-lg mb-5">Order Summary</h3>
                            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
                                <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 text-[#0ea5e9]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-navy text-sm">{booking.expert}</h4>
                                    <p className="text-xs text-gray-500">{booking.service}</p>
                                    <p className="text-xs text-gray-400">{booking.date}</p>
                                </div>
                            </div>
                            <div className="space-y-3 mb-5">
                                <div className="flex justify-between text-sm"><span className="text-gray-500">Consultation Fee</span><span className="font-semibold">₹{booking.consultFee.toLocaleString()}</span></div>
                                <div className="flex justify-between text-sm"><span className="text-gray-500">Platform Fee</span><span className="font-semibold">₹{booking.platformFee.toLocaleString()}</span></div>
                                <div className="flex justify-between text-sm pt-3 border-t border-gray-100"><span className="font-bold text-navy">Total</span><span className="font-bold text-navy text-lg">₹{booking.total.toLocaleString()}</span></div>
                            </div>
                            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center">
                                <p className="text-xs text-emerald-700 font-semibold flex items-center justify-center gap-1"><Lock className="w-3 h-3" /> Escrow Protected</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
