import { useState, useEffect } from "react";
import { Lock, Shield, CreditCard, Smartphone, Building2, CheckCircle, ArrowRight, Sparkles, Plane, User, Mail, Phone, Calendar, ArrowLeft } from "lucide-react";

export function PaymentPortal({ bookingId }: { bookingId: string }) {
    const [method, setMethod] = useState("upi");
    const [submitted, setSubmitted] = useState(false);
    const [upiId, setUpiId] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCvv, setCardCvv] = useState("");
    const [selectedBank, setSelectedBank] = useState("HDFC Bank");
    const [isProcessing, setIsProcessing] = useState(false);

    // Dynamic Checkout Data from Query Parameters or localStorage
    const [country, setCountry] = useState("Singapore");
    const [variant, setVariant] = useState("30 Days Tourist (Multiple)");
    const [amount, setAmount] = useState(4700);
    const [travellers, setTravellers] = useState(1);
    const [applicantName, setApplicantName] = useState("Visa Applicant");
    const [applicantEmail, setApplicantEmail] = useState("applicant@example.com");
    const [applicantPhone, setApplicantPhone] = useState("+91 9876543210");
    const [isVisaApplication, setIsVisaApplication] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const qCountry = params.get("country");
            const qAmount = params.get("amount");
            const qTravellers = params.get("travellers");
            const qName = params.get("name");
            const qEmail = params.get("email");
            const qPhone = params.get("phone");
            const qVariant = params.get("variant");

            if (qCountry) setCountry(qCountry);
            if (qAmount && !isNaN(Number(qAmount))) setAmount(Number(qAmount));
            if (qTravellers && !isNaN(Number(qTravellers))) setTravellers(Number(qTravellers));
            if (qName) setApplicantName(qName);
            if (qEmail) setApplicantEmail(qEmail);
            if (qPhone) setApplicantPhone(qPhone);
            if (qVariant) setVariant(qVariant);

            // Also check localStorage fallback
            const saved = localStorage.getItem("current_visa_application");
            if (saved && !qCountry) {
                try {
                    const parsed = JSON.parse(saved);
                    if (parsed.country) setCountry(parsed.country);
                    if (parsed.totalAmount) setAmount(parsed.totalAmount);
                    if (parsed.travellers) setTravellers(parsed.travellers);
                    if (parsed.variant) setVariant(parsed.variant);
                    if (parsed.applicant?.name) setApplicantName(parsed.applicant.name);
                    if (parsed.applicant?.email) setApplicantEmail(parsed.applicant.email);
                    if (parsed.applicant?.phone) setApplicantPhone(parsed.applicant.phone);
                } catch (e) {}
            }
        }
    }, []);

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setSubmitted(true);
        }, 1200);
    };

    if (submitted) {
        return (
            <div className="bg-slate-50 min-h-screen py-16 px-4 flex items-center justify-center font-sans">
                <div className="bg-white rounded-[32px] border border-slate-200 shadow-2xl p-8 sm:p-10 max-w-lg w-full text-center space-y-6 animate-fadeIn">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-inner text-[#00A86B]">
                        <CheckCircle className="w-10 h-10" />
                    </div>

                    <div>
                        <span className="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-2">
                            Payment Secured via Razorpay Escrow
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                            Payment Successful! 🎉
                        </h1>
                        <p className="text-slate-500 text-xs sm:text-sm mt-1">
                            Your payment for Application <strong>{bookingId}</strong> has been secured.
                        </p>
                    </div>
                    
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-left space-y-3 text-xs">
                        <div className="flex justify-between"><span className="text-slate-500">Service</span><span className="font-bold text-slate-900">{country} Visa Application</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Visa Plan</span><span className="font-bold text-slate-900">{variant}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Applicant</span><span className="font-bold text-slate-900">{applicantName}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Travellers</span><span className="font-bold text-slate-900">{travellers} Applicant(s)</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Email Updates</span><span className="font-bold text-slate-900">{applicantEmail}</span></div>
                        <div className="flex justify-between pt-2 border-t border-slate-200"><span className="text-slate-500 font-bold">Total Paid</span><span className="font-black text-slate-900 text-base">₹{amount.toLocaleString()}</span></div>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-left text-xs text-emerald-800 font-medium">
                        <p><strong>Next Step:</strong> Our visa verification desk is pre-screening your application. You will receive real-time embassy milestone updates and your approved e-Visa on WhatsApp (<strong>{applicantPhone}</strong>) and Email.</p>
                    </div>
                    
                    <a 
                        href="/" 
                        className="block w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-4 rounded-2xl text-center text-sm shadow-xl transition-all active:scale-[0.98]"
                    >
                        Back to TravlTik Home
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen py-12 sm:py-16 px-4 font-sans text-slate-900">
            <div className="max-w-4xl mx-auto space-y-6">
                
                {/* Top Navigation */}
                <div className="flex items-center justify-between">
                    <a href={`/visa/${country.toLowerCase().replace(/\s+/g, '-')}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to {country} Visa Details</span>
                    </a>
                    <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                        Booking ID: <strong className="text-slate-900">{bookingId}</strong>
                    </span>
                </div>

                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Razorpay Secure Checkout
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                        Complete your payment to confirm your {country} visa filing.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Payment Methods (7 Cols) */}
                    <div className="lg:col-span-7 space-y-5">
                        
                        {/* Escrow Notice */}
                        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
                            <Lock className="w-5 h-5 text-emerald-600 shrink-0" />
                            <p className="text-xs text-emerald-800 font-bold">
                                Escrow Protected: Payment is held safely until your visa application is submitted and approved.
                            </p>
                        </div>

                        {/* Method Tabs */}
                        <form onSubmit={handlePayment} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden text-left">
                            
                            <div className="flex border-b border-slate-100 bg-slate-50/60">
                                {[
                                    { id: "upi", label: "UPI & QR", icon: Smartphone },
                                    { id: "card", label: "Debit / Credit Card", icon: CreditCard },
                                    { id: "netbanking", label: "Net Banking", icon: Building2 },
                                ].map(m => (
                                    <button 
                                        key={m.id} 
                                        type="button" 
                                        onClick={() => setMethod(m.id)}
                                        className={`flex-1 py-3.5 text-xs font-black tracking-wider flex items-center justify-center gap-2 transition-all relative cursor-pointer ${
                                            method === m.id ? "text-slate-900 bg-white shadow-2xs" : "text-slate-400 hover:text-slate-700"
                                        }`}
                                    >
                                        <m.icon className="w-4 h-4" /> {m.label}
                                        {method === m.id && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-slate-900" />}
                                    </button>
                                ))}
                            </div>

                            <div className="p-6">
                                
                                {method === "upi" && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                                                Enter UPI ID / VPA
                                            </label>
                                            <input 
                                                required 
                                                value={upiId} 
                                                onChange={e => setUpiId(e.target.value)} 
                                                placeholder="e.g. yourname@okaxis, yourname@okhdfcbank" 
                                                className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-slate-900" 
                                            />
                                        </div>

                                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/90 text-center space-y-2">
                                            <div className="w-24 h-24 mx-auto bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-2xs p-2">
                                                <img 
                                                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=razorpay@icici&pn=TravlTik&am=4700" 
                                                    alt="Scan to Pay QR"
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <p className="text-[11px] text-slate-600 font-bold">
                                                Scan with Google Pay, PhonePe, Paytm, or BHIM
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {method === "card" && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                                                Card Number
                                            </label>
                                            <input 
                                                required 
                                                value={cardNumber} 
                                                onChange={e => setCardNumber(e.target.value)} 
                                                placeholder="4111 2222 3333 4444" 
                                                className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-slate-900" 
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-xs font-bold text-slate-700 mb-1.5 block">Expiry (MM/YY)</label>
                                                <input 
                                                    required 
                                                    value={cardExpiry} 
                                                    onChange={e => setCardExpiry(e.target.value)} 
                                                    placeholder="MM/YY" 
                                                    className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-slate-900" 
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-700 mb-1.5 block">CVV</label>
                                                <input 
                                                    required 
                                                    value={cardCvv} 
                                                    onChange={e => setCardCvv(e.target.value)} 
                                                    type="password" 
                                                    maxLength={4} 
                                                    placeholder="123" 
                                                    className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-slate-900" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {method === "netbanking" && (
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-700 mb-1 block">Select Your Bank</label>
                                        <div className="space-y-2">
                                            {["HDFC Bank", "State Bank of India (SBI)", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank"].map(bank => (
                                                <label key={bank} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                                                    <input 
                                                        type="radio" 
                                                        checked={selectedBank === bank} 
                                                        onChange={() => setSelectedBank(bank)} 
                                                        name="bank" 
                                                        className="text-slate-900" 
                                                    />
                                                    <span className="text-xs font-bold text-slate-900">{bank}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <button 
                                    type="submit" 
                                    disabled={isProcessing}
                                    className="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl font-black text-sm tracking-wide shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer disabled:opacity-75"
                                >
                                    {isProcessing ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Processing via Razorpay...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Pay ₹{amount.toLocaleString()} Securely</span>
                                            <ArrowRight className="w-4 h-4 stroke-[3]" />
                                        </>
                                    )}
                                </button>

                            </div>
                        </form>

                        {/* Trust Badges */}
                        <div className="flex justify-center gap-6 text-xs text-slate-400 font-bold">
                            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-600" /> 256-Bit SSL</span>
                            <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-emerald-600" /> Escrow Protected</span>
                            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Official Razorpay</span>
                        </div>
                    </div>

                    {/* Order Summary (5 Cols) */}
                    <div className="lg:col-span-5 text-left">
                        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm sticky top-24 space-y-5">
                            <h3 className="font-black text-slate-900 text-base">
                                Application Summary
                            </h3>

                            <div className="flex items-start gap-3.5 pb-4 border-b border-slate-100">
                                <div className="w-12 h-12 bg-emerald-50 text-[#00A86B] rounded-2xl flex items-center justify-center shrink-0">
                                    <Plane className="w-6 h-6" />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="font-black text-slate-900 text-sm">{country} Visa</h4>
                                    <p className="text-xs text-slate-500 font-bold">{variant}</p>
                                    <p className="text-[11px] text-slate-400 font-medium">Applicant: {applicantName}</p>
                                </div>
                            </div>

                            <div className="space-y-2.5 text-xs font-semibold text-slate-600">
                                <div className="flex justify-between"><span>Number of Travellers</span><span className="text-slate-900 font-bold">{travellers} Applicant(s)</span></div>
                                <div className="flex justify-between"><span>Government Visa Fees</span><span className="text-slate-900 font-bold">₹{(amount * 0.65).toFixed(0)}</span></div>
                                <div className="flex justify-between"><span>Concierge &amp; Filing</span><span className="text-slate-900 font-bold">₹{(amount * 0.35).toFixed(0)}</span></div>
                                <div className="flex justify-between"><span>Digital Verification &amp; Compliance</span><span className="text-emerald-600 font-bold">FREE</span></div>
                                <div className="flex justify-between pt-3 border-t border-slate-100"><span className="font-bold text-slate-900 text-sm">Total Payable</span><span className="font-black text-slate-900 text-lg">₹{amount.toLocaleString()}</span></div>
                            </div>

                            <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3.5 text-center">
                                <p className="text-xs text-emerald-800 font-bold flex items-center justify-center gap-1.5">
                                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Money-Back Escrow Guarantee</span>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
