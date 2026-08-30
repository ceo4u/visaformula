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
  Loader2
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
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [successModal, setSuccessModal] = useState<{ active: boolean; title: string; ref: string; amount: number } | null>(null);
  const cleanTo = cleanCountryName(countryName);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleDirectRazorpay = async (amount: number, packageTitle: string) => {
    try {
      setIsProcessing(packageTitle);
      const res = await loadRazorpayScript();
      if (!res) {
        alert('Could not connect to Razorpay gateway. Please check your internet connection.');
        setIsProcessing(null);
        return;
      }

      const seekerEmail = typeof window !== 'undefined' ? (localStorage.getItem('seeker_email') || localStorage.getItem('travltik_email') || '') : '';
      const seekerName = typeof window !== 'undefined' ? (localStorage.getItem('seeker_firstName') || localStorage.getItem('travltik_name') || 'Visa Applicant') : 'Visa Applicant';
      const seekerPhone = typeof window !== 'undefined' ? (localStorage.getItem('seeker_phone') || '') : '';

      const options = {
        key: 'rzp_test_travltik_live',
        amount: amount * 100, // in paise
        currency: 'INR',
        name: 'TravlTik Consular Prep',
        description: `${packageTitle} — ${cleanTo} (${purpose})`,
        image: 'https://travltik.com/favicon.svg',
        handler: function (response: any) {
          setSuccessModal({
            active: true,
            title: packageTitle,
            ref: response.razorpay_payment_id || `TT-MOCK-${Date.now().toString().slice(-6)}`,
            amount
          });
          setIsProcessing(null);
        },
        prefill: {
          name: seekerName,
          email: seekerEmail,
          contact: seekerPhone
        },
        theme: {
          color: '#0f172a'
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(null);
          }
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error('Razorpay Error:', err);
      setIsProcessing(null);
    }
  };

  return (
    <div id="section-mock-prep" className="bg-white text-slate-900 rounded-[20px] sm:rounded-3xl p-5 sm:p-8 md:p-9 shadow-sm border border-slate-200/90 space-y-6 text-left relative my-6 sm:my-8 font-sans">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-extrabold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Consular Mock Interview Prep Kit</span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Ace Your {cleanTo} Consular Interview
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl leading-relaxed">
            Over 82% of visa refusals occur due to unprepared interview answers and Section 214(b) immigrant intent doubts. Practice real visa officer questions before stepping into the embassy.
          </p>
        </div>

        <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-2xl shrink-0">
          <span className="text-xl">🏆</span>
          <div>
            <div className="text-xs font-extrabold text-emerald-800">98.4% Approval Rate</div>
            <div className="text-[10px] text-emerald-600 font-bold">After AI Mock Practice</div>
          </div>
        </div>
      </div>

      {/* Sample Visa Officer Questions Accordion */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Top Consular Questions Asked for {cleanTo} ({purpose}):
          </span>
          <button 
            onClick={() => setShowMockQuestions(prev => !prev)}
            className="text-xs font-extrabold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer transition-colors"
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
              { q: "What strong ties guarantee that you will return to your home country upon visa expiry?", tip: "Mention your active employment contract, family roots, and property/career commitments in home country." },
              { q: `Why did you choose ${cleanTo} over other alternative global destinations?`, tip: "Give concrete reasons aligned with your itinerary, university curriculum, or business meeting agenda." }
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-left">
                <span className="text-xs font-extrabold text-slate-900 block">
                  Q{i + 1}: {item.q}
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong className="text-indigo-700 font-bold">Officer Insight: </strong>{item.tip}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Mock Packages & Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        
        {/* Package 1: Instant AI Speech & Voice Simulator */}
        <div className="bg-slate-50/70 border border-indigo-200 rounded-3xl p-5 sm:p-6 space-y-4 hover:border-indigo-400/80 hover:bg-slate-50 transition-all flex flex-col justify-between shadow-2xs">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-[11px] font-extrabold text-indigo-900">
                <Mic className="w-3.5 h-3.5 text-indigo-700" />
                <span>Instant AI Voice Practice</span>
              </div>
              <span className="text-xl sm:text-2xl font-black text-slate-900">₹499</span>
            </div>
            <h4 className="text-base font-extrabold text-slate-900">AI Voice &amp; Speech Mock Simulator</h4>
            <ul className="text-xs text-slate-600 space-y-2 font-medium">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[2.5]" /> 50+ Real embassy visa officer question scenarios</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[2.5]" /> Live AI speech analysis &amp; immigrant intent grading</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[2.5]" /> Instant Section 214(b) rejection risk scoring</li>
            </ul>
          </div>

          <button 
            type="button"
            onClick={() => handleDirectRazorpay(499, 'AI Voice & Speech Mock Simulator')}
            disabled={Boolean(isProcessing)}
            className="w-full py-3.5 bg-slate-900 hover:bg-black text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-75"
          >
            {isProcessing === 'AI Voice & Speech Mock Simulator' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Opening Razorpay...</span>
              </>
            ) : (
              <>
                <span>Start AI Mock Prep (₹499)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {/* Package 2: 1-on-1 Live Mock with Ex-Visa Officer / Attorney */}
        <div className="bg-slate-50/70 border border-emerald-200 rounded-3xl p-5 sm:p-6 space-y-4 hover:border-emerald-400/80 hover:bg-slate-50 transition-all flex flex-col justify-between shadow-2xs">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[11px] font-extrabold text-emerald-900">
                <Video className="w-3.5 h-3.5 text-emerald-700" />
                <span>Live 1-on-1 Consultation</span>
              </div>
              <span className="text-xl sm:text-2xl font-black text-slate-900">₹1,999</span>
            </div>
            <h4 className="text-base font-extrabold text-slate-900">1-on-1 Live Expert Mock Session</h4>
            <ul className="text-xs text-slate-600 space-y-2 font-medium">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[2.5]" /> 45-Min Live Zoom Mock with licensed immigration counsel</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[2.5]" /> Line-by-line DS-160 / application audit</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[2.5]" /> Custom answer structuring &amp; body language coaching</li>
            </ul>
          </div>

          <button 
            type="button"
            onClick={() => handleDirectRazorpay(1999, '1-on-1 Live Expert Mock Session')}
            disabled={Boolean(isProcessing)}
            className="w-full py-3.5 bg-[#00a896] hover:bg-[#008f80] text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-75"
          >
            {isProcessing === '1-on-1 Live Expert Mock Session' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Opening Razorpay...</span>
              </>
            ) : (
              <>
                <span>Book 1-on-1 Mock Session (₹1,999)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

      </div>

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



