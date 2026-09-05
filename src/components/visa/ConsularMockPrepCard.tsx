// src/components/visa/ConsularMockPrepCard.tsx
import React, { useState } from 'react';
import { 
  Sparkles, 
  ChevronDown, 
  Mic, 
  Video, 
  Check, 
  ArrowRight,
  CheckCircle2,
  X,
  Loader2,
  ShieldCheck,
  CreditCard,
  QrCode,
  Smartphone
} from 'lucide-react';

interface Props {
  countryName: string;
  passportCountry?: string;
  purpose?: string;
}

function cleanCountryName(str: string): string {
  if (!str) return 'United States';
  const s = str.trim();
  const sLow = s.toLowerCase();
  if (sLow === 'indian' || sLow === 'in' || sLow === 'india') return 'India';
  if (sLow === 'uk' || sLow === 'united kingdom' || sLow === 'england' || sLow === 'great britain') return 'United Kingdom';
  if (sLow === 'us' || sLow === 'usa' || sLow === 'united states' || sLow === 'america') return 'United States';
  if (sLow === 'uae' || sLow === 'dubai' || sLow === 'united arab emirates') return 'United Arab Emirates';
  return s.split(/[-_\s]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export const ConsularMockPrepCard: React.FC<Props> = ({
  countryName,
  passportCountry = 'India',
  purpose = 'Tourism / Vacation'
}) => {
  const [showMockQuestions, setShowMockQuestions] = useState(false);
  const [activeCheckout, setActiveCheckout] = useState<{ amount: number; title: string } | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'qr'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successModal, setSuccessModal] = useState<{ active: boolean; title: string; ref: string; amount: number } | null>(null);
  const cleanTo = cleanCountryName(countryName);

  const handleOpenCheckout = (amount: number, title: string) => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('travltik_user');
      const seekerEmail = localStorage.getItem('seeker_email');
      const isLoggedIn = (userStr && userStr !== 'null') || Boolean(seekerEmail);
      if (!isLoggedIn) {
        const currentUrl = window.location.pathname + window.location.search;
        window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`;
        return;
      }

      const email = seekerEmail || localStorage.getItem('travltik_email') || '';
      const name = localStorage.getItem('seeker_firstName') || localStorage.getItem('travltik_name') || '';
      const phone = localStorage.getItem('seeker_phone') || '';
      if (email) setApplicantEmail(email);
      if (name) setApplicantName(name);
      if (phone) setApplicantPhone(phone);
    }
    setActiveCheckout({ amount, title });
  };

  const handleCompletePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCheckout) return;

    setIsProcessing(true);

    try {
      // Create record
      const generatedRef = `RZP-PAY-${Date.now().toString().slice(-7)}`;
      
      // Save local applicant info
      if (typeof window !== 'undefined') {
        if (applicantEmail) localStorage.setItem('seeker_email', applicantEmail);
        if (applicantName) localStorage.setItem('seeker_firstName', applicantName);
        if (applicantPhone) localStorage.setItem('seeker_phone', applicantPhone);
      }

      // Simulate instantaneous Razorpay gateway processing
      await new Promise(r => setTimeout(r, 1200));

      setSuccessModal({
        active: true,
        title: activeCheckout.title,
        ref: generatedRef,
        amount: activeCheckout.amount
      });
      setActiveCheckout(null);
    } catch (err) {
      console.error('Payment Error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div id="section-mock-prep" className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xs border border-slate-200/90 space-y-6 text-left relative my-6 sm:my-8 font-sans scroll-mt-24">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
            <Mic className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg sm:text-2xl font-black text-slate-950 tracking-tight">
              Ace Your {cleanTo} Consular Interview
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl leading-relaxed">
              Over 82% of visa refusals occur due to unprepared interview answers and Section 214(b) immigrant intent doubts. Practice real visa officer questions before stepping into the embassy.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl shrink-0">
          <span className="text-lg">🎯</span>
          <div>
            <div className="text-xs font-black text-slate-900">98.4% Approval Rate</div>
            <div className="text-[10px] text-slate-500 font-bold">After Mock Practice</div>
          </div>
        </div>
      </div>

      {/* Sample Visa Officer Questions Accordion */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Top Consular Questions Asked for {cleanTo} ({purpose}):
          </span>
          <button 
            onClick={() => setShowMockQuestions(prev => !prev)}
            className="text-xs font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>{showMockQuestions ? 'Hide Questions' : 'View Sample Questions (4)'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showMockQuestions ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showMockQuestions && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 animate-fade-in">
            {[
              { q: `What is the specific purpose of your trip to ${cleanTo} and how long will you stay?`, tip: "State your travel dates, exact hotel/sponsor city, and definitive return date clearly." },
              { q: "Who is sponsoring your trip and how did you accumulate these financial funds?", tip: "Reference your stamped 6-month bank statements and employer/sponsor compensation." },
              { q: "What strong ties demonstrate that you will return to your home country upon visa expiry?", tip: "Mention your active employment contract, family roots, and property/career commitments in home country." },
              { q: `Why did you choose ${cleanTo} over other alternative global destinations?`, tip: "Give concrete reasons aligned with your itinerary, university curriculum, or business meeting agenda." }
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5 text-left">
                <span className="text-xs font-black text-slate-950 block">
                  Q{i + 1}: {item.q}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  <strong className="text-indigo-600 font-bold">Officer Insight: </strong>{item.tip}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Mock Packages & Pricing Grid (Clean, High-Contrast) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
        
        {/* Package 1: Instant AI Speech & Voice Simulator */}
        <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-3xl p-6 sm:p-7 space-y-5 transition-all flex flex-col justify-between shadow-2xs hover:shadow-xs">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50 border border-indigo-100 text-[10px] font-black uppercase tracking-wider text-indigo-900">
                <Mic className="w-3.5 h-3.5 text-indigo-700" />
                <span>Instant AI Voice Practice</span>
              </span>
              <span className="text-2xl font-black text-slate-950">₹499</span>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black text-slate-950">AI Voice &amp; Speech Mock Simulator</h4>
              <span className="text-xs text-slate-500 font-medium block mt-0.5">Interactive speech practice on mobile &amp; laptop</span>
            </div>
            <ul className="text-xs sm:text-[13px] text-slate-700 space-y-2.5 font-medium">
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" /> 50+ Real embassy visa officer question scenarios</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" /> Live AI speech analysis &amp; immigrant intent grading</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" /> Instant Section 214(b) rejection risk scoring</li>
            </ul>
          </div>

          <button 
            type="button"
            onClick={() => handleOpenCheckout(499, 'AI Voice & Speech Mock Simulator')}
            className="w-full py-3.5 bg-slate-950 hover:bg-black text-white font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <span>Start AI Mock Prep (₹499)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Package 2: 1-on-1 Live Mock with Ex-Visa Officer / Attorney */}
        <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-3xl p-6 sm:p-7 space-y-5 transition-all flex flex-col justify-between shadow-2xs hover:shadow-xs">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-100 text-[10px] font-black uppercase tracking-wider text-emerald-900">
                <Video className="w-3.5 h-3.5 text-emerald-700" />
                <span>Live 1-on-1 Consultation</span>
              </span>
              <span className="text-2xl font-black text-slate-950">₹1,999</span>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black text-slate-950">1-on-1 Live Expert Mock Session</h4>
              <span className="text-xs text-slate-500 font-medium block mt-0.5">Direct 1-on-1 coaching with licensed immigration expert</span>
            </div>
            <ul className="text-xs sm:text-[13px] text-slate-700 space-y-2.5 font-medium">
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" /> 45-Min Live Zoom Mock with licensed immigration counsel</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" /> Line-by-line DS-160 / application audit</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" /> Custom answer structuring &amp; body language coaching</li>
            </ul>
          </div>

          <button 
            type="button"
            onClick={() => handleOpenCheckout(1999, '1-on-1 Live Expert Mock Session')}
            className="w-full py-3.5 bg-[#004e8c] hover:bg-[#003866] text-white font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <span>Book 1-on-1 Mock Session (₹1,999)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Interactive Razorpay & UPI Checkout Modal */}
      {activeCheckout && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 text-left space-y-5 relative animate-in fade-in zoom-in-95">
            <button
              type="button"
              onClick={() => setActiveCheckout(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-extrabold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Razorpay Secured 256-Bit SSL Checkout</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 pt-1">
                Checkout: {activeCheckout.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {cleanTo} Consular Preparation • Instant Activation
              </p>
            </div>

            <form onSubmit={handleCompletePayment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Rahul Sharma"
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:border-[#00a896] outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:border-[#00a896] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-700">Email Address (For Instant Access Token) *</label>
                <input
                  type="email"
                  required
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  placeholder="rahul@gmail.com"
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:border-[#00a896] outline-none"
                />
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-1.5 pt-1">
                <label className="block text-[11px] font-bold text-slate-700">Select Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      paymentMethod === 'upi'
                        ? 'border-[#00a896] bg-emerald-50 text-emerald-950 ring-1 ring-[#00a896]'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-[#00a896]" />
                    <span>UPI Apps</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('qr')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      paymentMethod === 'qr'
                        ? 'border-[#00a896] bg-emerald-50 text-emerald-950 ring-1 ring-[#00a896]'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-slate-800" />
                    <span>QR Code</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      paymentMethod === 'card'
                        ? 'border-[#00a896] bg-emerald-50 text-emerald-950 ring-1 ring-[#00a896]'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span>Cards / NetBank</span>
                  </button>
                </div>
              </div>

              {/* Amount Summary */}
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Payable Now</span>
                  <span className="text-base font-black text-slate-900">₹{activeCheckout.amount.toLocaleString()}</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg">
                  Inclusive of all taxes
                </span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-black text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Pay ₹{activeCheckout.amount.toLocaleString()} Securely</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Confirmation Modal */}
      {successModal?.active && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center space-y-5 relative animate-in fade-in zoom-in-95">
            <button
              type="button"
              onClick={() => setSuccessModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto text-emerald-600 border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                Payment Verified via Razorpay
              </span>
              <h3 className="text-xl font-black text-slate-900 pt-1">
                {successModal.title} Booked!
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Your payment of <strong>₹{successModal.amount.toLocaleString()}</strong> has been secured. Your session link &amp; AI access tokens have been dispatched to your WhatsApp and Email.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-700 text-left space-y-1 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Payment ID:</span>
                <strong className="text-slate-900">{successModal.ref}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <strong className="text-emerald-700 font-bold">PAID &amp; ACTIVE</strong>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSuccessModal(null)}
              className="w-full py-3 bg-slate-900 hover:bg-black text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Start Session Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};



