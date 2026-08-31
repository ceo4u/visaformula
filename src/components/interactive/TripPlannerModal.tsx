import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Globe, Calendar, Users, Minus, Plus, Sparkles, X, Phone, User, ArrowRight, RotateCw, CheckCircle2 } from 'lucide-react';

export function TripPlannerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const [originCity, setOriginCity] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [tripType, setTripType] = useState('vacation');
  
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [contactPref, setContactPref] = useState<'whatsapp' | 'call'>('whatsapp');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsSuccess(false);
      setError('');
    };

    window.addEventListener('open-trip-modal', handleOpen);

    const setupButtons = () => {
      const btn = document.getElementById('hero-suitcase-btn');
      if (btn) btn.onclick = handleOpen;
      const mobileBtn = document.getElementById('mobile-suitcase-btn');
      if (mobileBtn) mobileBtn.onclick = handleOpen;
    };

    setupButtons();
    const timer = setTimeout(setupButtons, 500);

    return () => {
      window.removeEventListener('open-trip-modal', handleOpen);
      clearTimeout(timer);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setError('Please provide your name and phone number');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await fetch('/api/leads/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          contactPref,
          leadType: 'Trip Planning & Holiday Booking',
          originCity: originCity || 'Not specified',
          destination: destination || 'General Inquiry',
          travelDate: travelDate || 'Flexible',
          travelers: travelers || 1,
          tripType,
          source: 'Header Suitcase Feature'
        })
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsOpen(false);
        setStep(1);
      }, 3500);
    } catch (err) {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsOpen(false);
        setStep(1);
      }, 3500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn overflow-y-auto">
      
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={() => setIsOpen(false)} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-lg bg-white border border-slate-200/90 rounded-[28px] sm:rounded-[36px] shadow-[0_25px_70px_rgba(0,0,0,0.2)] p-5 sm:p-8 text-slate-900 transition-all my-auto">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 sm:top-6 right-4 sm:right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer select-none"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#00A86B] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Trip Plan Initiated!</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong className="text-slate-900">{fullName}</strong>! Our AI trip specialist is curating your personalized itinerary for <strong className="text-slate-900">{destination || 'your destination'}</strong> and will reach out via <strong className="text-emerald-700">{contactPref === 'whatsapp' ? 'WhatsApp' : 'Phone'}</strong> shortly.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Verified Safe &amp; 100% Free Consultation
            </div>
          </div>
        ) : (
          <div>
            {/* Header Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[11px] font-bold mb-3">
              <Briefcase className="w-3.5 h-3.5 text-[#00A86B]" />
              <span>AI Holiday &amp; Trip Planner</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {step === 1 ? 'Plan Your Dream Trip' : 'Where Should We Send It?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 mb-5">
              {step === 1 ? 'Enter your travel details to get curated tour options & rates' : 'Provide your contact info to receive the complete itinerary package'}
            </p>

            {error && (
              <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                {error}
              </div>
            )}

            {step === 1 ? (
              <div className="space-y-3.5">
                
                {/* 1. Departure City */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Departure City / Origin</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={originCity}
                      onChange={(e) => setOriginCity(e.target.value)}
                      placeholder="e.g. Mumbai, Delhi, Bengaluru, London..."
                      className="w-full h-12 pl-9 pr-3 rounded-2xl bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-[#00A86B] text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A86B]/20 transition-all"
                    />
                  </div>
                </div>

                {/* 2. Destination */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Destination Country / Place</label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="e.g. Goa, Dubai, Switzerland, Bali, Paris..."
                      className="w-full h-12 pl-9 pr-3 rounded-2xl bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-[#00A86B] text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A86B]/20 transition-all"
                    />
                  </div>
                </div>

                {/* 3. Travel Date & Travelers in 2 Cols */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Travel Date / Month</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full h-12 pl-9 pr-2 rounded-2xl bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-[#00A86B] text-xs font-semibold text-slate-900 focus:outline-none cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Travelers</label>
                    <div className="h-12 px-2 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setTravelers(Math.max(1, travelers - 1))}
                        disabled={travelers <= 1}
                        className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold flex items-center justify-center disabled:opacity-30 cursor-pointer shadow-2xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-extrabold text-xs sm:text-sm text-slate-900 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        {travelers}
                      </span>
                      <button
                        type="button"
                        onClick={() => setTravelers(Math.min(20, travelers + 1))}
                        disabled={travelers >= 20}
                        className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold flex items-center justify-center disabled:opacity-30 cursor-pointer shadow-2xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. Trip Style Options */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Holiday Style</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'vacation', label: '🏖️ Leisure', desc: 'Relax & Tours' },
                      { id: 'family', label: '👨‍👩‍👧 Family', desc: 'Kids & Comfort' },
                      { id: 'adventure', label: '⛰️ Adventure', desc: 'Trekking & Sports' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setTripType(item.id)}
                        className={`p-2 rounded-2xl border text-left cursor-pointer transition-all ${
                          tripType === item.id
                            ? 'bg-emerald-50/70 border-[#00A86B] ring-2 ring-[#00A86B]/20'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100/60'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-900">{item.label}</div>
                        <div className="text-[10px] text-slate-500">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Next Step Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (!originCity.trim() && !destination.trim()) {
                        setError('Please enter at least departure city or destination');
                        return;
                      }
                      setError('');
                      setStep(2);
                    }}
                    className="w-full h-12 sm:h-13 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Next: Add Contact Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Your Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full h-12 pl-9 pr-3 rounded-2xl bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-[#00A86B] text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A86B]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Mobile / WhatsApp Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full h-12 pl-9 pr-3 rounded-2xl bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-[#00A86B] text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A86B]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Email Address <span className="text-slate-400 font-normal">(Optional)</span></label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rahul@example.com"
                    className="w-full h-12 px-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-[#00A86B] text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A86B]/20 transition-all"
                  />
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Preferred Contact Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setContactPref('whatsapp')}
                      className={`p-2.5 rounded-2xl border text-center font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5 transition-all ${
                        contactPref === 'whatsapp'
                          ? 'bg-emerald-50 border-[#00A86B] text-emerald-900 ring-2 ring-[#00A86B]/20'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span>💬 WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactPref('call')}
                      className={`p-2.5 rounded-2xl border text-center font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5 transition-all ${
                        contactPref === 'call'
                          ? 'bg-emerald-50 border-[#00A86B] text-emerald-900 ring-2 ring-[#00A86B]/20'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span>📞 Phone Call</span>
                    </button>
                  </div>
                </div>

                {/* Submit & Back Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-all"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 h-12 rounded-2xl bg-[#00A86B] hover:bg-[#008f5a] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <>
                        <RotateCw className="w-4 h-4 animate-spin text-white" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-emerald-200" />
                        <span>Get AI Plan →</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
