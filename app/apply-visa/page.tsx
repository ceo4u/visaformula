"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, MapPin, ChevronRight, CheckCircle, Upload, CreditCard, 
  Shield, Clock, Star, Zap, ArrowRight, ArrowLeft, Globe, 
  Camera, FileText, Check, Plus, Trash2, Users, FileCheck, ShoppingCart 
} from "lucide-react";

const countries = [
  { name: "UAE / Dubai", code: "ae", flag: "🇦🇪", type: "e-Visa", days: "30 days", fee: "₹2,499", express: true, popular: true, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop&q=80" },
  { name: "Thailand", code: "th", flag: "🇹🇭", type: "e-Visa", days: "30 days", fee: "₹1,499", express: true, popular: true, image: "https://images.unsplash.com/photo-1528181304800-2f1702413247?w=600&auto=format&fit=crop&q=80" },
  { name: "United Kingdom", code: "gb", flag: "🇬🇧", type: "e-Visa", days: "6 months", fee: "₹9,999", express: false, popular: true, image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop&q=80" },
  { name: "Singapore", code: "sg", flag: "🇸🇬", type: "e-Visa", days: "30 days", fee: "₹3,999", express: true, popular: true, image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&auto=format&fit=crop&q=80" },
  { name: "Saudi Arabia", code: "sa", flag: "🇸🇦", type: "e-Visa", days: "365 days", fee: "₹4,999", express: true, popular: false, image: "https://images.unsplash.com/photo-1586724237569-f38559db826c?w=600&auto=format&fit=crop&q=80" },
  { name: "Japan", code: "jp", flag: "🇯🇵", type: "Sticker", days: "30 days", fee: "₹5,999", express: false, popular: true, image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80" },
  { name: "USA", code: "us", flag: "🇺🇸", type: "B-2 Visa", days: "10 years", fee: "₹12,999", express: false, popular: true, image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&auto=format&fit=crop&q=80" },
  { name: "Australia", code: "au", flag: "🇦🇺", type: "e-Visa", days: "12 months", fee: "₹7,499", express: true, popular: true, image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&auto=format&fit=crop&q=80" },
  { name: "Canada", code: "ca", flag: "🇨🇦", type: "eTA", days: "5 years", fee: "₹6,999", express: false, popular: true, image: "https://images.unsplash.com/photo-1506535772-4523e71c8b41?w=600&auto=format&fit=crop&q=80" },
  { name: "Germany", code: "de", flag: "🇩🇪", type: "Schengen", days: "90 days", fee: "₹8,499", express: false, popular: false, image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&auto=format&fit=crop&q=80" },
  { name: "France", code: "fr", flag: "🇫🇷", type: "Schengen", days: "90 days", fee: "₹8,499", express: false, popular: false, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80" },
  { name: "New Zealand", code: "nz", flag: "🇳🇿", type: "e-Visa", days: "9 months", fee: "₹5,499", express: true, popular: false, image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format&fit=crop&q=80" },
];

const leftSteps = [
  { id: 1, label: "Travelers", icon: Users },
  { id: 2, label: "Docs", icon: FileCheck },
  { id: 3, label: "Essentials", icon: Shield },
  { id: 4, label: "Checkout", icon: ShoppingCart }
];

export default function ApplyVisaPage() {
  const [step, setStep] = useState(0); // 0: Country list, 1: Travelers list, 2: Document checklist, 3: Premium Add-ons, 4: Payment Summary
  const [selected, setSelected] = useState<typeof countries[0] | null>(null);
  
  // Travelers Collection
  const [travelers, setTravelers] = useState([
    { id: 1, firstName: "Prashant", lastName: "Sharma", passport: "", dob: "", expiry: "", email: "", phone: "", photoUploaded: false, passportUploaded: false }
  ]);
  const [activeTravelerIdx, setActiveTravelerIdx] = useState(0);
  
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [express, setExpress] = useState(false);
  const [insurance, setInsurance] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Search logic
  const filtered = countries.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || (filter === "e-Visa" && c.type === "e-Visa") || (filter === "Popular" && c.popular) || (filter === "Express" && c.express);
    return matchSearch && matchFilter;
  });

  const addTraveler = () => {
    setTravelers([
      ...travelers,
      { id: Date.now(), firstName: "", lastName: "", passport: "", dob: "", expiry: "", email: "", phone: "", photoUploaded: false, passportUploaded: false }
    ]);
    setActiveTravelerIdx(travelers.length);
  };

  const removeTraveler = (index: number) => {
    if (travelers.length === 1) return;
    const newTravelers = travelers.filter((_, idx) => idx !== index);
    setTravelers(newTravelers);
    setActiveTravelerIdx(0);
  };

  const updateTravelerField = (index: number, field: string, value: string) => {
    const newTravelers = [...travelers];
    newTravelers[index] = { ...newTravelers[index], [field]: value };
    setTravelers(newTravelers);
  };

  const handleNextFromTravelers = () => {
    // Basic validation
    const current = travelers[activeTravelerIdx];
    if (!current.firstName || !current.lastName) {
      alert("Please fill in first and last name for traveler.");
      return;
    }
    setStep(2);
  };

  // Fees math
  const getSubtotal = () => {
    if (!selected) return 0;
    const base = parseInt(selected.fee.replace(/[₹,]/g, ""));
    return base * travelers.length;
  };

  const getDiscount = () => {
    // 5% off dynamic promotion when multi-traveler
    if (travelers.length > 1) {
      return Math.round(getSubtotal() * 0.05);
    }
    return 0;
  };

  const getAddonsCost = () => {
    let cost = 0;
    if (express) cost += 1500 * travelers.length;
    if (insurance) cost += 699 * travelers.length;
    return cost;
  };

  const getTotal = () => {
    return getSubtotal() - getDiscount() + getAddonsCost();
  };

  const getProgressPercentage = () => {
    if (step === 0) return 0;
    if (step === 1) return 25;
    if (step === 2) return 50;
    if (step === 3) return 75;
    return 100;
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f7fbff] flex items-center justify-center px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl border border-sky-100 shadow-2xl p-10 max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="font-sora text-3xl font-extrabold text-navy mb-2">Application Submitted! 🎉</h1>
          <p className="text-gray-500 text-sm mb-1">Your visa request for <strong>{selected?.flag} {selected?.name}</strong> is under official embassy review.</p>
          <p className="text-gray-400 text-xs mb-6">Visa delivery details and real-time tracking will be shared to all traveler contacts.</p>
          
          <div className="bg-sky-50/50 rounded-2xl p-5 border border-sky-100/80 mb-6 text-left space-y-3">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Destination</span><span className="font-bold text-navy">{selected?.name} ({selected?.type})</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Total Applicants</span><span className="font-bold text-navy">{travelers.length} {travelers.length > 1 ? "Travelers" : "Traveler"}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Processing Mode</span><span className="font-bold text-amber-600">{express ? "⚡ Express (6-12 hr)" : "Standard (24-48 hr)"}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Total Paid</span><span className="font-bold text-[#0ea5e9] text-base">₹{getTotal().toLocaleString()}</span></div>
          </div>
          
          <Link href="/" className="block w-full bg-gradient-to-r from-[#38BDF8] to-[#0ea5e9] text-white font-bold py-4 rounded-xl text-center hover:shadow-lg transition-all">
            Back to Visara Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7fbff] flex flex-col">
      
      {/* Top Professional Progress Header */}
      {step > 0 && selected && (
        <div className="bg-white border-b border-sky-100/70 py-4 px-6 flex flex-col items-center">
          <div className="text-[10px] font-black uppercase tracking-widest text-sky-500 bg-sky-50 px-3 py-1 rounded-full mb-1">
            {getProgressPercentage()}% COMPLETED
          </div>
          <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden border border-sky-50 relative">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${getProgressPercentage()}%` }}
              className="h-full bg-gradient-to-r from-[#38BDF8] via-[#0ea5e9] to-[#0284C7] rounded-full"
              transition={{ duration: 0.4 }}
            />
          </div>
          
          {/* Dynamic promotion banner */}
          <div className="mt-3 bg-emerald-50 text-emerald-800 text-xs px-4 py-1.5 rounded-full border border-emerald-100 flex items-center gap-1.5 font-bold shadow-sm">
            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" /> Add 1 more traveler to unlock a flat 5% off!
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 gap-8">
        
        {/* Left Professional Sidebar (Only when step > 0) */}
        {step > 0 && selected && (
          <div className="w-full md:w-56 shrink-0 flex md:flex-col gap-2 md:pt-4">
            {leftSteps.map(ls => {
              const Icon = ls.icon;
              const isActive = step === ls.id;
              const isCompleted = step > ls.id;
              return (
                <button 
                  key={ls.id} 
                  disabled={ls.id > step}
                  onClick={() => setStep(ls.id)}
                  className={`flex-1 md:flex-initial flex items-center gap-3 p-3.5 rounded-2xl transition-all duration-300 text-left border ${
                    isActive 
                      ? "bg-white border-sky-100 shadow-lg text-sky-600 font-extrabold" 
                      : isCompleted 
                        ? "bg-emerald-50/50 border-emerald-100/60 text-emerald-600 font-semibold" 
                        : "bg-white/20 border-transparent text-gray-400 font-medium hover:bg-white/50"
                  }`}
                >
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive 
                      ? "bg-sky-500 text-white" 
                      : isCompleted 
                        ? "bg-emerald-500 text-white" 
                        : "bg-gray-100 text-gray-400"
                  }`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </span>
                  <span className="text-xs hidden md:inline">{ls.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Wizard Panel View */}
        <div className="flex-1 min-w-0">
          
          <AnimatePresence mode="wait">
            
            {/* Step 0: Choose Destination Card Grid */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                {/* Hero Headings */}
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 border border-sky-200 rounded-full px-4 py-1.5 text-xs font-bold mb-4">
                    <Zap className="w-3 h-3" /> Apply Online · 120+ Countries · On-Time Guaranteed
                  </div>
                  <h1 className="font-sora text-4xl font-extrabold text-navy mb-3">
                    Apply for Visa Online.<br/>
                    <span className="bg-gradient-to-r from-[#38BDF8] to-[#0284C7] bg-clip-text text-transparent">Fast. Simple. Guaranteed.</span>
                  </h1>
                  <p className="text-gray-500 text-sm mb-6 max-w-lg mx-auto">Select your destination, fill the form — we get your visa on time. Expert support included.</p>
                  <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-gray-500">
                    <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> 99.1% approval rate</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-sky-500" /> 24–48 hr processing</span>
                    <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-purple-500" /> Money-back guarantee</span>
                  </div>
                </div>

                <h2 className="font-sora text-xl font-bold text-navy mb-1">Where are you going?</h2>
                <p className="text-xs text-gray-500 mb-5">Select the country you want to apply a visa for.</p>

                {/* Search + filter bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search country..." className="w-full pl-10 pr-4 py-3.5 bg-white border border-sky-100 rounded-xl text-xs outline-none focus:border-[#0ea5e9] shadow-sm" />
                  </div>
                  <div className="flex gap-2">
                    {["All", "Popular", "e-Visa", "Express"].map(f => (
                      <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${filter === f ? "bg-[#0ea5e9] text-white border-[#0ea5e9] shadow-md shadow-sky-100" : "bg-white text-gray-500 border-sky-100 hover:border-sky-300"}`}>{f}</button>
                    ))}
                  </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filtered.map(c => (
                    <button
                      key={c.code}
                      onClick={() => { setSelected(c); setStep(1); }}
                      className={`group relative h-80 rounded-3xl overflow-hidden text-left hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 border-2 ${selected?.code === c.code ? "border-[#0ea5e9] ring-4 ring-sky-100" : "border-white/10 shadow-md bg-white"}`}
                    >
                      <div className="absolute inset-0 bg-navy">
                        <img 
                          src={c.image} 
                          alt={c.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 brightness-[0.8] group-hover:brightness-[0.7]"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-black/20" />
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full border border-white/35 flex items-center justify-center text-xl shadow-lg">
                          {c.flag}
                        </div>
                        {c.express && (
                          <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-amber-400 flex items-center gap-1 shadow-md animate-pulse">
                            <Zap className="w-3 h-3 fill-white" /> Express
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col justify-end">
                        <span className="text-emerald-400 text-[11px] font-black uppercase tracking-widest mb-1">{c.type}</span>
                        <h3 className="font-sora text-lg font-extrabold text-white leading-tight mb-1 group-hover:text-[#38BDF8] transition-colors">{c.name}</h3>
                        <p className="text-gray-300 text-xs font-semibold mb-2">🕒 Validity: {c.days}</p>
                        <div className="h-px bg-white/10 my-2" />
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Total Fee</span>
                            <span className="text-base font-black text-white">{c.fee}</span>
                          </div>
                          <span className="bg-white/10 group-hover:bg-[#0ea5e9] group-hover:text-white text-white p-2 rounded-xl transition-all duration-300 backdrop-blur-md border border-white/10">
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                {filtered.length === 0 && <p className="text-center text-gray-400 py-12 text-sm">No countries found. Try a different search.</p>}
              </motion.div>
            )}

            {/* Step 1: Travelers Detail List */}
            {step === 1 && selected && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="max-w-2xl mx-auto space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-sora text-2xl font-extrabold text-navy">Enter Traveler Details</h2>
                    <p className="text-xs text-gray-500 mt-1">Make sure names match exactly as written on the passport.</p>
                  </div>
                  <button onClick={() => setStep(0)} className="text-xs text-sky-600 font-bold hover:underline flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" /> Change Country
                  </button>
                </div>

                {/* Traveler selection tabs */}
                <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
                  {travelers.map((tr, idx) => (
                    <div key={tr.id} className="relative shrink-0">
                      <button
                        onClick={() => setActiveTravelerIdx(idx)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${
                          activeTravelerIdx === idx 
                            ? "bg-white border-[#0ea5e9] text-[#0ea5e9] shadow-md shadow-sky-50" 
                            : "bg-white/40 border-sky-100 text-gray-500 hover:border-sky-300"
                        }`}
                      >
                        👤 Traveler {idx + 1} {tr.firstName ? `(${tr.firstName})` : ""}
                      </button>
                      {travelers.length > 1 && (
                        <button 
                          onClick={() => removeTraveler(idx)}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[9px] hover:bg-red-600"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addTraveler}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold border-2 border-dashed border-sky-200 text-sky-600 hover:bg-sky-50 flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Traveler
                  </button>
                </div>

                {/* Active Traveler Form Card */}
                <div className="bg-white rounded-3xl border border-sky-100 shadow-xl p-6 space-y-4">
                  <h3 className="font-sora text-sm font-bold text-navy uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 bg-sky-500 rounded-full animate-ping" />
                    Editing Details for Traveler #{activeTravelerIdx + 1}
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">First Name *</label>
                      <input 
                        value={travelers[activeTravelerIdx].firstName} 
                        onChange={e => updateTravelerField(activeTravelerIdx, "firstName", e.target.value)} 
                        placeholder="As on passport" 
                        className="w-full p-3.5 bg-slate-50/60 border border-sky-100 rounded-xl text-xs outline-none focus:border-[#0ea5e9]" 
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Last Name *</label>
                      <input 
                        value={travelers[activeTravelerIdx].lastName} 
                        onChange={e => updateTravelerField(activeTravelerIdx, "lastName", e.target.value)} 
                        placeholder="As on passport" 
                        className="w-full p-3.5 bg-slate-50/60 border border-sky-100 rounded-xl text-xs outline-none focus:border-[#0ea5e9]" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Passport Number *</label>
                    <input 
                      value={travelers[activeTravelerIdx].passport} 
                      onChange={e => updateTravelerField(activeTravelerIdx, "passport", e.target.value)} 
                      placeholder="e.g. P1234567" 
                      className="w-full p-3.5 bg-slate-50/60 border border-sky-100 rounded-xl text-xs outline-none focus:border-[#0ea5e9]" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Date of Birth *</label>
                      <input 
                        type="date" 
                        value={travelers[activeTravelerIdx].dob} 
                        onChange={e => updateTravelerField(activeTravelerIdx, "dob", e.target.value)} 
                        className="w-full p-3.5 bg-slate-50/60 border border-sky-100 rounded-xl text-xs outline-none focus:border-[#0ea5e9] text-gray-600" 
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Passport Expiry *</label>
                      <input 
                        type="date" 
                        value={travelers[activeTravelerIdx].expiry} 
                        onChange={e => updateTravelerField(activeTravelerIdx, "expiry", e.target.value)} 
                        className="w-full p-3.5 bg-slate-50/60 border border-sky-100 rounded-xl text-xs outline-none focus:border-[#0ea5e9] text-gray-600" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Email address *</label>
                    <input 
                      type="email"
                      value={travelers[activeTravelerIdx].email} 
                      onChange={e => updateTravelerField(activeTravelerIdx, "email", e.target.value)} 
                      placeholder="e.g. traveler@mail.com" 
                      className="w-full p-3.5 bg-slate-50/60 border border-sky-100 rounded-xl text-xs outline-none focus:border-[#0ea5e9]" 
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Mobile Number *</label>
                    <input 
                      type="tel"
                      value={travelers[activeTravelerIdx].phone} 
                      onChange={e => updateTravelerField(activeTravelerIdx, "phone", e.target.value)} 
                      placeholder="e.g. +91 98765 43210" 
                      className="w-full p-3.5 bg-slate-50/60 border border-sky-100 rounded-xl text-xs outline-none focus:border-[#0ea5e9]" 
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button onClick={() => setStep(0)} className="px-6 py-4 border-2 border-sky-200 rounded-2xl text-xs font-black text-gray-600 hover:bg-sky-50 transition-all flex items-center gap-1.5 uppercase tracking-wider">← Back</button>
                  <button onClick={handleNextFromTravelers} className="flex-1 bg-gradient-to-r from-[#38BDF8] to-[#0ea5e9] text-white font-black py-4 rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider">Continue to Documents <ArrowRight className="w-4 h-4" /></button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Essential Documents Upload Checklist */}
            {step === 2 && selected && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="max-w-2xl mx-auto space-y-6"
              >
                <div className="text-center">
                  <h2 className="font-sora text-3xl font-extrabold text-navy">The Essential Documents</h2>
                  <p className="text-xs text-gray-500 mt-2 max-w-lg mx-auto">These are as per the official {selected.name} embassy requirements for visa processing.</p>
                </div>

                {/* Traveler document cards list */}
                {travelers.map((tr, index) => (
                  <div key={tr.id} className="bg-white rounded-3xl border border-sky-100 shadow-xl p-6 space-y-5">
                    
                    {/* Traveler Header */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-tr from-sky-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {tr.firstName ? tr.firstName.substring(0, 2).toUpperCase() : `T${index + 1}`}
                      </div>
                      <div>
                        <div className="font-bold text-navy text-base">{tr.firstName || "Traveler"} {tr.lastName}</div>
                        <div className="text-xs text-gray-400 font-semibold">{tr.photoUploaded && tr.passportUploaded ? "✅ All documents uploaded" : "0/2 documents uploaded"}</div>
                      </div>
                    </div>

                    {/* Interactive Upload Targets */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Upload Photo Card */}
                      <div 
                        onClick={() => {
                          const newTravelers = [...travelers];
                          newTravelers[index].photoUploaded = !newTravelers[index].photoUploaded;
                          setTravelers(newTravelers);
                        }}
                        className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                          tr.photoUploaded 
                            ? "bg-emerald-50/50 border-emerald-300" 
                            : "bg-sky-50/20 border-sky-200 hover:border-sky-400 hover:bg-sky-50/40"
                        }`}
                      >
                        <Camera className={`w-8 h-8 mx-auto mb-2 ${tr.photoUploaded ? "text-emerald-500" : "text-[#0ea5e9]"}`} />
                        <h4 className="font-bold text-navy text-xs mb-0.5">Passport Size Photo</h4>
                        <p className="text-[10px] text-gray-400 mb-2">White background, high quality JPG</p>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                          tr.photoUploaded ? "bg-emerald-100 text-emerald-800" : "bg-sky-100 text-sky-800"
                        }`}>
                          {tr.photoUploaded ? "✅ Uploaded" : "↑ Upload"}
                        </span>
                      </div>

                      {/* Upload Passport Card */}
                      <div 
                        onClick={() => {
                          const newTravelers = [...travelers];
                          newTravelers[index].passportUploaded = !newTravelers[index].passportUploaded;
                          setTravelers(newTravelers);
                        }}
                        className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                          tr.passportUploaded 
                            ? "bg-emerald-50/50 border-emerald-300" 
                            : "bg-sky-50/20 border-sky-200 hover:border-sky-400 hover:bg-sky-50/40"
                        }`}
                      >
                        <FileText className={`w-8 h-8 mx-auto mb-2 ${tr.passportUploaded ? "text-emerald-500" : "text-[#0ea5e9]"}`} />
                        <h4 className="font-bold text-navy text-xs mb-0.5">Passport Front Scan</h4>
                        <p className="text-[10px] text-gray-400 mb-2">Bio-data page, clear text PDF/JPG</p>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                          tr.passportUploaded ? "bg-emerald-100 text-emerald-800" : "bg-sky-100 text-sky-800"
                        }`}>
                          {tr.passportUploaded ? "✅ Uploaded" : "↑ Upload"}
                        </span>
                      </div>

                    </div>
                  </div>
                ))}

                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="px-6 py-4 border-2 border-sky-200 rounded-2xl text-xs font-black text-gray-600 hover:bg-sky-50 transition-all flex items-center gap-1.5 uppercase tracking-wider">← Back</button>
                  <button onClick={() => setStep(3)} className="flex-1 bg-gradient-to-r from-[#38BDF8] to-[#0ea5e9] text-white font-black py-4 rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider">Proceed to Essentials <ArrowRight className="w-4 h-4" /></button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Premium Essentials & Upgrades */}
            {step === 3 && selected && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="max-w-2xl mx-auto space-y-6"
              >
                <div>
                  <h2 className="font-sora text-2xl font-extrabold text-navy">Enhance Your Application</h2>
                  <p className="text-xs text-gray-500 mt-1">Unlock fast processing and premium traveler protections.</p>
                </div>

                <div className="space-y-4">
                  
                  {/* Express Upgrade Card */}
                  {selected.express && (
                    <div 
                      onClick={() => setExpress(!express)}
                      className={`flex items-center gap-4 p-5 rounded-3xl border-2 cursor-pointer transition-all ${
                        express 
                          ? "bg-amber-50/50 border-amber-300 shadow-md" 
                          : "bg-white border-sky-100 hover:border-sky-300"
                      }`}
                    >
                      <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
                        <Zap className="w-6 h-6 text-amber-500 fill-amber-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-navy text-sm flex items-center gap-1.5">
                          Express Visa Processing
                          <span className="text-[9px] bg-amber-500 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Popular</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">Embassy response in 6-12 hours. Guaranteed fast track.</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-black text-navy text-sm">₹1,500</div>
                        <div className="text-[10px] text-gray-400 font-bold">per traveler</div>
                      </div>
                    </div>
                  )}

                  {/* Travel Protection Card */}
                  <div 
                    onClick={() => setInsurance(!insurance)}
                    className={`flex items-center gap-4 p-5 rounded-3xl border-2 cursor-pointer transition-all ${
                      insurance 
                        ? "bg-emerald-50/50 border-emerald-300 shadow-md" 
                        : "bg-white border-sky-100 hover:border-sky-300"
                    }`}
                  >
                    <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center shrink-0">
                      <Shield className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-navy text-sm flex items-center gap-1.5">
                        Premium Visa Insurance
                        <span className="text-[9px] bg-emerald-500 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Highly Recommended</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">100% refund of all visa fees in case of rejection or visa delay.</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-black text-navy text-sm">₹699</div>
                      <div className="text-[10px] text-gray-400 font-bold">per traveler</div>
                    </div>
                  </div>

                </div>

                <div className="flex gap-4 pt-4">
                  <button onClick={() => setStep(2)} className="px-6 py-4 border-2 border-sky-200 rounded-2xl text-xs font-black text-gray-600 hover:bg-sky-50 transition-all flex items-center gap-1.5 uppercase tracking-wider">← Back</button>
                  <button onClick={() => setStep(4)} className="flex-1 bg-gradient-to-r from-[#38BDF8] to-[#0ea5e9] text-white font-black py-4 rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider">Go to Checkout <ArrowRight className="w-4 h-4" /></button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Checkout & Pay */}
            {step === 4 && selected && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="max-w-2xl mx-auto space-y-6"
              >
                <div>
                  <h2 className="font-sora text-2xl font-extrabold text-navy">Checkout & Pay</h2>
                  <p className="text-xs text-gray-500 mt-1">Review your summary and make secure payment.</p>
                </div>

                <div className="bg-white rounded-3xl border border-sky-100 shadow-xl p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-sky-50">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Destination</span>
                    <span className="font-bold text-navy text-sm">{selected.flag} {selected.name}</span>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-sky-50">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Applicants ({travelers.length})</span>
                    <div className="text-right">
                      {travelers.map((tr, idx) => (
                        <div key={tr.id} className="text-xs font-bold text-navy">
                          Traveler {idx + 1}: {tr.firstName || "Unnamed"} {tr.lastName}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 text-xs text-gray-600 font-semibold">
                    <div className="flex justify-between">
                      <span>Visa Base Fees ({travelers.length} × {selected.fee})</span>
                      <span className="text-navy">₹{getSubtotal().toLocaleString()}</span>
                    </div>

                    {travelers.length > 1 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Multi-Traveler Discount (5% Off)</span>
                        <span>-₹{getDiscount().toLocaleString()}</span>
                      </div>
                    )}

                    {express && (
                      <div className="flex justify-between">
                        <span>Express Processing Add-on ({travelers.length} × ₹1,500)</span>
                        <span className="text-navy">₹{(1500 * travelers.length).toLocaleString()}</span>
                      </div>
                    )}

                    {insurance && (
                      <div className="flex justify-between">
                        <span>Rejection Protection Insurance ({travelers.length} × ₹699)</span>
                        <span className="text-navy">₹{(699 * travelers.length).toLocaleString()}</span>
                      </div>
                    )}

                    <div className="h-px bg-sky-50 my-3" />

                    <div className="flex justify-between font-extrabold text-navy text-base">
                      <span>Total Amount</span>
                      <span className="text-[#0ea5e9]">₹{getTotal().toLocaleString()}</span>
                    </div>
                  </div>

                  {/* PCI Secure Form */}
                  <div className="bg-slate-50/60 rounded-2xl p-4 border border-sky-100/50 space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">Cardholder Name</label>
                      <input placeholder="As written on card" className="w-full p-3 bg-white border border-sky-100 rounded-xl text-xs outline-none focus:border-[#0ea5e9]" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">Card Number</label>
                      <input placeholder="4111 2222 3333 4444" className="w-full p-3 bg-white border border-sky-100 rounded-xl text-xs outline-none focus:border-[#0ea5e9]" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">Expiry</label>
                        <input placeholder="MM / YY" className="w-full p-3 bg-white border border-sky-100 rounded-xl text-xs outline-none focus:border-[#0ea5e9]" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">CVV</label>
                        <input placeholder="•••" className="w-full p-3 bg-white border border-sky-100 rounded-xl text-xs outline-none focus:border-[#0ea5e9]" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-3">
                    <button onClick={() => setStep(3)} className="px-6 py-4 border-2 border-sky-200 rounded-2xl text-xs font-black text-gray-600 hover:bg-sky-50 transition-all flex items-center gap-1.5 uppercase tracking-wider">← Back</button>
                    <button onClick={() => setSubmitted(true)} className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black py-4 rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider">
                      <CreditCard className="w-4 h-4" /> Pay & Apply · ₹{getTotal().toLocaleString()}
                    </button>
                  </div>
                  
                  <p className="text-center text-[10px] text-gray-400 mt-2 flex items-center justify-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-sky-500" />
                    256-bit SSL Encrypted · PCI DSS Compliant · 100% Refundable Rejection Insurance
                  </p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
