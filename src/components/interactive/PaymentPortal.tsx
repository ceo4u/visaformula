import { useState } from "react";
import { Lock, Shield, CreditCard, Smartphone, Building2, CheckCircle, ArrowRight, Sparkles } from "lucide-react";

export function PaymentPortal({ bookingId }: { bookingId: string }) {
    const [method, setMethod] = useState("upi");
    const [submitted, setSubmitted] = useState(false);
    const [upiId, setUpiId] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCvv, setCardCvv] = useState("");
    const [selectedBank, setSelectedBank] = useState("");

    const booking = {
        expert: "Marcus Thorne, JD",
        service: "H-1B Visa Consultation (60 min)",
        date: "Apr 25, 2025 • 10:00 AM IST",
        consultFee: 12500,
        platformFee: 625,
        total: 13125,
    };

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bg-[#f0f4f8] min-h-screen py-20 px-4 flex items-center justify-center">
                <div className="bg-white rounded-3xl border border-yellow-100 shadow-2xl p-10 max-w-lg w-full text-center">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <CheckCircle className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h1 className="font-sora text-3xl font-extrabold text-navy mb-2">Payment Successful! ??</h1>
                    <p className="text-gray-500 text-sm mb-1">Your payment for Booking <strong>{bookingId}</strong> has been secured in Escrow.</p>
                    <p className="text-gray-400 text-xs mb-6">Consultation details and the meet link have been sent to your registered email.</p>
                    
                    <div className="bg-yellow-50/50 rounded-2xl p-5 border border-yellow-100/80 mb-6 text-left space-y-3">
                        <div className="flex justify-between text-sm"><span className="text-gray-500">Expert</span><span className="font-bold text-navy">{booking.expert}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-gray-500">Service</span><span className="font-bold text-navy">{booking.service}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-gray-500">Scheduled At</span><span className="font-bold text-navy text-xs">{booking.date}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-gray-500">Amount Secured</span><span className="font-bold text-[#f59e0b] text-base">?{booking.total.toLocaleString()}</span></div>
                    </div>
                    
                    <a href="/" className="block w-full bg-gradient-to-r from-[#fef08a] to-[#f59e0b] text-white font-bold py-4 rounded-xl text-center hover:shadow-lg transition-all">
                        Back to VisaFormula Home
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#fff5f5] min-h-screen py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="font-sora text-3xl font-extrabold text-navy mb-2">Checkout</h1>
                <p className="text-sm text-gray-500 mb-8">Complete your payment to confirm your booking (ID: {bookingId})</p>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Payment Methods */}
                    <div className="lg:col-span-3 space-y-5">
                        {/* Escrow Notice */}
                        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 flex items-center gap-3">
                            <Lock className="w-5 h-5 text-emerald-600 shrink-0 animate-pulse" />
                            <p className="text-xs text-emerald-800 font-bold tracking-wider">Your payment will be held safely in escrow until session is confirmed complete.</p>
                        </div>

                        {/* Method Tabs */}
                        <form onSubmit={handlePayment} className="bg-white rounded-3xl border border-yellow-100 shadow-xl overflow-hidden">
                            <div className="flex border-b border-gray-100">
                                {[
                                    { id: "upi", label: "UPI", icon: Smartphone },
                                    { id: "card", label: "Card", icon: CreditCard },
                                    { id: "netbanking", label: "Net Banking", icon: Building2 },
                                ].map(m => (
                                    <button key={m.id} type="button" onClick={() => setMethod(m.id)}
                                        className={`flex-1 py-4 text-xs font-black tracking-wider flex items-center justify-center gap-2 transition-all relative ${method === m.id ? "text-[#f59e0b] bg-yellow-50/50" : "text-gray-400 hover:text-navy"}`}>
                                        <m.icon className="w-4 h-4" /> {m.label}
                                        {method === m.id && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#f59e0b]" />}
                                    </button>
                                ))}
                            </div>

                            <div className="p-6">
                                {method === "upi" && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-500 tracking-widest mb-1.5 block">UPI ID</label>
                                            <input required value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="yourname@upi" className="w-full p-3.5 bg-yellow-50/30 border border-yellow-100 rounded-xl text-xs outline-none focus:border-[#f59e0b]" />
                                        </div>
                                        <p className="text-[10px] text-gray-400 text-center font-semibold">Or scan QR code in Razorpay popup</p>
                                    </div>
                                )}
                                {method === "card" && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-500 tracking-widest mb-1.5 block">Card Number</label>
                                            <input required value={cardNumber} onChange={e => setCardNumber(e.target.value)} placeholder="4111 1111 1111 1111" className="w-full p-3.5 bg-yellow-50/30 border border-yellow-100 rounded-xl text-xs outline-none focus:border-[#f59e0b]" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-500 tracking-widest mb-1.5 block">Expiry</label>
                                                <input required value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} placeholder="MM/YY" className="w-full p-3.5 bg-yellow-50/30 border border-yellow-100 rounded-xl text-xs outline-none focus:border-[#f59e0b]" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-500 tracking-widest mb-1.5 block">CVV</label>
                                                <input required value={cardCvv} onChange={e => setCardCvv(e.target.value)} type="password" maxLength={3} placeholder="123" className="w-full p-3.5 bg-yellow-50/30 border border-yellow-100 rounded-xl text-xs outline-none focus:border-[#f59e0b]" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {method === "netbanking" && (
                                    <div className="space-y-3">
                                        {["SBI", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra"].map(bank => (
                                            <label key={bank} className="flex items-center gap-3 p-3 bg-yellow-50/20 border border-yellow-100 rounded-xl cursor-pointer hover:bg-yellow-50 transition-colors">
                                                <input required type="radio" checked={selectedBank === bank} onChange={() => setSelectedBank(bank)} name="bank" className="text-[#f59e0b]" />
                                                <span className="text-xs font-bold text-navy">{bank}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}

                                <button type="submit" className="mt-6 w-full bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white py-4 rounded-xl font-bold text-xs tracking-wider hover:shadow-lg hover:shadow-yellow-100 transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                                    Pay ?{booking.total.toLocaleString()} <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </form>

                        {/* Trust Badges */}
                        <div className="flex justify-center gap-6 text-[10px] text-gray-400 font-medium tracking-normal">
                            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-amber-500" /> SSL Secured</span>
                            <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-amber-500" /> Secure Escrow</span>
                            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-amber-500" /> DPDP Compliant</span>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl border border-yellow-100 p-6 shadow-xl sticky top-24">
                            <h3 className="font-sora font-bold text-navy text-lg mb-5">Order Summary</h3>
                            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
                                <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 text-[#f59e0b]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-navy text-sm">{booking.expert}</h4>
                                    <p className="text-[11px] text-gray-500 font-medium">{booking.service}</p>
                                    <p className="text-[10px] text-gray-400 font-semibold">{booking.date}</p>
                                </div>
                            </div>
                            <div className="space-y-3 mb-5 text-xs font-semibold text-gray-500">
                                <div className="flex justify-between"><span>Consultation Fee</span><span className="text-navy font-bold">?{booking.consultFee.toLocaleString()}</span></div>
                                <div className="flex justify-between"><span>Platform Fee</span><span className="text-navy font-bold">?{booking.platformFee.toLocaleString()}</span></div>
                                <div className="flex justify-between pt-3 border-t border-gray-100"><span className="font-bold text-navy text-[10px] tracking-wider">Total</span><span className="font-extrabold text-[#f59e0b] text-base">?{booking.total.toLocaleString()}</span></div>
                            </div>
                            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3.5 text-center">
                                <p className="text-[10px] text-emerald-700 font-bold tracking-wider flex items-center justify-center gap-1"><Lock className="w-3 h-3 text-emerald-600" /> Escrow Protected</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

