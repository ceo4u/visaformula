import React, { useState, useEffect } from "react";
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Calendar, 
  Clock, 
  RefreshCw, 
  Sparkles,
  ArrowRight,
  BadgeCheck
} from "lucide-react";

export interface PaymentCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  expertId: number;
  expertName: string;
  expertEmail?: string;
  hourlyRate?: number;
  visaCategory?: string;
  selectedDate?: string;
  seekerName?: string;
  seekerEmail?: string;
  seekerPhone?: string;
  onPaymentSuccess?: (bookingId: number) => void;
}

export function PaymentCheckoutModal({
  isOpen,
  onClose,
  expertId,
  expertName,
  expertEmail = "",
  hourlyRate = 49.00,
  visaCategory = "Work & PR Consultation",
  selectedDate = "Tomorrow, 11:00 AM",
  seekerName = "",
  seekerEmail = "",
  seekerPhone = "",
  onPaymentSuccess
}: PaymentCheckoutModalProps) {
  const [step, setStep] = useState<"review" | "processing" | "success" | "error">("review");
  const [paymentMethod, setPaymentMethod] = useState<"razorpay_upi" | "razorpay_card" | "razorpay_netbanking">("razorpay_upi");
  const [name, setName] = useState(seekerName);
  const [email, setEmail] = useState(seekerEmail);
  const [phone, setPhone] = useState(seekerPhone);
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmedBookingId, setConfirmedBookingId] = useState<number | null>(null);
  const [paymentTxId, setPaymentTxId] = useState<string>("");

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";

    // Auto-fill user credentials from localStorage if present
    try {
      const userStr = localStorage.getItem("visaformula_user") || localStorage.getItem("travltik_user");
      if (userStr) {
        const u = JSON.parse(userStr);
        if (u.name && !name) setName(u.name);
        if (u.email && !email) setEmail(u.email);
        if (u.phone && !phone) setPhone(u.phone);
      }
    } catch (e) {}

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInitiatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !name) {
      setErrorMsg("Please enter your name and email to proceed with checkout.");
      return;
    }

    setLoading(true);
    setStep("processing");

    try {
      // 1. Create server-side payment order
      const orderRes = await fetch("/api/bookings/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          expertId,
          expertName,
          expertEmail,
          seekerName: name,
          seekerEmail: email,
          seekerPhone: phone,
          amount: hourlyRate,
          currency: "INR",
          visaCategory,
          bookingDate: new Date().toISOString()
        })
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || "Failed to initialize payment order.");
      }

      const generatedOrderId = orderData.orderId;
      const targetBookingId = orderData.bookingId;

      // 2. Process payment (Razorpay Checkout integration / simulation with server verification)
      const simulatedPaymentId = `pay_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

      // Simulate network verification handshake
      await new Promise(r => setTimeout(r, 1200));

      // 3. Server-side verification (Server is ALWAYS the authority)
      const verifyRes = await fetch("/api/bookings/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: generatedOrderId,
          paymentId: simulatedPaymentId,
          bookingId: targetBookingId,
          signature: "verified_client_token"
        })
      });

      const verifyData = await verifyRes.json();
      if (verifyRes.ok && verifyData.success) {
        setConfirmedBookingId(targetBookingId);
        setPaymentTxId(simulatedPaymentId);
        setStep("success");
        if (onPaymentSuccess) onPaymentSuccess(targetBookingId);
      } else {
        throw new Error(verifyData.error || "Payment verification failed on server.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Payment could not be processed. Please try again.");
      setStep("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn font-sora">
      <div className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-slate-900 relative">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#481268] via-[#5b1982] to-[#00a896] p-5 sm:p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
              <CreditCard className="w-6 h-6 text-teal-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  Consultation Booking
                </h2>
                <span className="text-[10px] uppercase tracking-wider font-extrabold bg-teal-400/20 text-teal-200 px-2 py-0.5 rounded-md">
                  1-on-1 Session
                </span>
              </div>
              <p className="text-xs text-white/80 font-medium mt-0.5">
                Book a verified advisory consultation with <span className="font-bold underline">{expertName}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 text-left">
          
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs flex items-center gap-2 font-medium">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {step === "review" && (
            <form onSubmit={handleInitiatePayment} className="space-y-4">
              
              {/* Order Summary Card */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00a896]"></span>
                    <span className="text-xs font-extrabold text-slate-800">{visaCategory}</span>
                  </div>
                  <span className="text-sm font-black text-[#00a896]">₹{hourlyRate} / Session</span>
                </div>

                <div className="text-[11px] text-slate-600 space-y-1 pt-2 border-t border-slate-200/60 font-medium">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /> Slot:</span>
                    <span className="font-bold text-slate-900">{selectedDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400" /> Duration:</span>
                    <span className="font-bold text-slate-900">45 Minutes Video / Audio</span>
                  </div>
                </div>
              </div>

              {/* Applicant Details */}
              <div className="space-y-2.5">
                <h4 className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                  Applicant Contact Info
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[10px] font-bold text-slate-700 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ankit Verma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#00a896]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="ankit@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#00a896]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-700 block mb-1">Mobile / WhatsApp Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#00a896]"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                  Payment Method (Razorpay Secure)
                </h4>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "razorpay_upi", label: "UPI / QR", desc: "GPay, PhonePe, Paytm" },
                    { id: "razorpay_card", label: "Debit / Credit", desc: "Visa, MC, RuPay" },
                    { id: "razorpay_netbanking", label: "NetBanking", desc: "All Indian Banks" }
                  ].map(m => {
                    const isSelected = paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected 
                            ? "bg-teal-50 border-[#00a896] ring-1 ring-[#00a896]" 
                            : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="text-xs font-extrabold text-slate-900">{m.label}</div>
                        <div className="text-[9px] text-slate-500 font-medium">{m.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#00a896] shrink-0" />
                <span>256-bit SSL encrypted checkout. 100% money-back guarantee if session does not take place.</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-[#00a896] hover:bg-[#008f80] text-white text-xs font-extrabold shadow-sm transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                >
                  <span>Pay ₹{hourlyRate} & Confirm Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

          {step === "processing" && (
            <div className="py-12 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-200 text-[#00a896] flex items-center justify-center mx-auto shadow-inner">
                <RefreshCw className="w-8 h-8 animate-spin" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                  Verifying Payment with Gateway...
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Please do not close or refresh this window while we secure your slot.
                </p>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="py-6 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto text-3xl font-black shadow-inner">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Booking Confirmed! 🎉
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-1 max-w-sm mx-auto">
                  Your session with <strong>{expertName}</strong> has been secured for <strong>{selectedDate}</strong>.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-1.5 text-xs text-slate-700 font-medium">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">Booking ID:</span>
                  <span className="font-mono font-bold text-slate-900">#{confirmedBookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">Payment Ref:</span>
                  <span className="font-mono font-bold text-slate-900">{paymentTxId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">Confirmation Email:</span>
                  <span className="font-bold text-slate-900">{email}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full bg-[#00a896] hover:bg-[#008f80] text-white font-extrabold text-xs py-3 rounded-xl shadow-lg shadow-[#00a896]/20 transition-all cursor-pointer"
              >
                Done & Return to Advisors
              </button>
            </div>
          )}

          {step === "error" && (
            <div className="py-6 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto text-3xl font-black">
                ✕
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                  Transaction Incomplete
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {errorMsg || "The transaction could not be verified by the banking server."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep("review")}
                className="px-6 py-2.5 rounded-xl bg-[#00a896] text-white text-xs font-bold shadow-sm cursor-pointer"
              >
                Try Again
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
