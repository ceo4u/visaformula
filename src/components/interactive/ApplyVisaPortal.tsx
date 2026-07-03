import { useState, useEffect } from "react";
import { 
  Search, CheckCircle, Upload, CreditCard, 
  Shield, Clock, Star, Zap, ArrowRight, ArrowLeft, 
  Camera, FileText, Check, Plus, Users, FileCheck, ShoppingCart 
} from "lucide-react";

const countries = [
  { name: "UAE / Dubai", code: "ae", flag: "🇦🇪", type: "e-Visa", days: "30 days", fee: "₹2,499", express: true, popular: true, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop&q=80" },
  { name: "Thailand", code: "th", flag: "🇹🇭", type: "e-Visa", days: "30 days", fee: "₹1,499", express: true, popular: true, image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&auto=format&fit=crop&q=80" },
  { name: "United Kingdom", code: "gb", flag: "🇬🇧", type: "e-Visa", days: "6 months", fee: "₹9,999", express: false, popular: true, image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop&q=80" },
  { name: "Singapore", code: "sg", flag: "🇸🇬", type: "e-Visa", days: "30 days", fee: "₹3,999", express: true, popular: true, image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&auto=format&fit=crop&q=80" },
  { name: "Saudi Arabia", code: "sa", flag: "🇸🇦", type: "e-Visa", days: "365 days", fee: "₹4,999", express: true, popular: false, image: "https://images.unsplash.com/photo-1682685797886-79020b7462a4?w=600&auto=format&fit=crop&q=80" },
  { name: "Japan", code: "jp", flag: "🇯🇵", type: "Sticker", days: "30 days", fee: "₹5,999", express: false, popular: true, image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80" },
  { name: "USA", code: "us", flag: "🇺🇸", type: "B-2 Visa", days: "10 years", fee: "₹12,999", express: false, popular: true, image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&auto=format&fit=crop&q=80" },
  { name: "Australia", code: "au", flag: "🇦🇺", type: "e-Visa", days: "12 months", fee: "₹7,499", express: true, popular: true, image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&auto=format&fit=crop&q=80" },
  { name: "Canada", code: "ca", flag: "🇨🇦", type: "eTA", days: "5 years", fee: "₹6,999", express: false, popular: true, image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=600&auto=format&fit=crop&q=80" },
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

export function ApplyVisaPortal() {
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const countryCode = params.get("country");
      const tourName = params.get("name");
      
      if (countryCode) {
        const matching = countries.find(c => c.code === countryCode.toLowerCase());
        if (matching) {
          setSelected(matching);
          setStep(1);
        }
      } else if (tourName) {
        // Mock custom visa selection for tour
        const customTarget = { 
          name: tourName, 
          code: "custom", 
          flag: "🌎", 
          type: "Holiday Visa", 
          days: "30 days", 
          fee: "₹3,500", 
          express: true, 
          popular: true, 
          image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format&fit=crop&q=80" 
        };
        setSelected(customTarget);
        setStep(1);
      }
    }
  }, []);

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

  const handlePayment = () => {
    triggerBookingEscrow();
  };

  const triggerBookingEscrow = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-20">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-10 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="font-sora text-3xl font-extrabold text-slate-900 mb-2">Application Submitted! 🎉</h1>
          <p className="text-gray-500 text-sm mb-1">Your visa request for <strong>{selected?.flag} {selected?.name}</strong> is under official embassy review.</p>
          <p className="text-gray-400 text-xs mb-6">Visa delivery details and real-time tracking will be shared to all traveler contacts.</p>
          
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mb-6 text-left space-y-3">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Destination</span><span className="font-bold text-slate-900">{selected?.name} ({selected?.type})</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Total Applicants</span><span className="font-bold text-slate-900">{travelers.length} {travelers.length > 1 ? "Travelers" : "Traveler"}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Processing Mode</span><span className="font-bold text-slate-800">{express ? "⚡ Express (6-12 hr)" : "Standard (24-48 hr)"}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Total Paid</span><span className="font-bold text-slate-950 text-base">₹{getTotal().toLocaleString()}</span></div>
          </div>
          
          <a href="/" className="block w-full bg-black hover:bg-slate-900 text-white font-bold py-4 rounded-xl text-center hover:shadow-lg transition-all">
            Back to VisaFormula Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* Top Progress Header */}
      {step > 0 && selected && (
        <div className="bg-white border-b border-slate-200 py-4 px-6 flex flex-col items-center">
          <div className="text-[10px] font-black tracking-widest text-slate-900 bg-slate-100 px-3 py-1 rounded-full mb-1">
            {getProgressPercentage()}% COMPLETED
          </div>
          <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden border border-slate-200 relative">
            <div 
              style={{ width: `${getProgressPercentage()}%` }}
              className="h-full bg-black rounded-full transition-all duration-300"
            />
          </div>
          
          {/* Dynamic promotion banner */}
          <div className="mt-3 bg-emerald-50 text-emerald-800 text-[10px] font-extrabold px-4 py-1.5 rounded-full border border-emerald-100/60 flex items-center gap-1.5 shadow-sm tracking-wider">
            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" /> Add 1 more traveler to unlock a flat 5% off!
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 gap-8">
        
        {/* Left Sidebar (Only when step > 0) */}
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
                      ? "bg-white border-slate-900 shadow-lg text-slate-950 font-extrabold" 
                      : isCompleted 
                        ? "bg-emerald-50/50 border-emerald-100/60 text-emerald-600 font-semibold" 
                        : "bg-white/20 border-transparent text-gray-400 font-medium hover:bg-white/50"
                  }`}
                >
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive 
                      ? "bg-slate-950 text-white" 
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
          
          {/* Step 0: Choose Destination Card Grid */}
          {step === 0 && (
            <div className="transition-all duration-300">
              {/* Hero Headings */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight leading-tight mb-4">
                  Apply for Visa Online.<br/>
                  <span className="text-slate-800">Fast. Simple. Guaranteed.</span>
                </h1>
                <p className="text-slate-500 text-base md:text-lg mb-6 max-w-2xl mx-auto font-semibold leading-relaxed">Select your destination, fill the form — we get your visa on time. Expert support included.</p>
              </div>

              <h2 className="font-sora text-xl font-bold text-slate-900 mb-1">Where are you going?</h2>
              <p className="text-xs text-gray-500 mb-5">Select the country you want to apply a visa for.</p>

              {/* Search + filter bar */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search country..." className="w-full pl-10 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-black shadow-sm" />
                </div>
                <div className="flex gap-2">
                  {["All", "Popular", "e-Visa", "Express"].map(f => (
                    <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${filter === f ? "bg-slate-950 text-white border-slate-950 shadow-md" : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"}`}>{f}</button>
                  ))}
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filtered.map(c => (
                  <button
                    key={c.code}
                    onClick={() => { setSelected(c); setStep(1); }}
                    className={`group relative h-80 rounded-3xl overflow-hidden text-left hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 border-2 ${selected?.code === c.code ? "border-black ring-4 ring-slate-200" : "border-white/10 shadow-md bg-white"}`}
                  >
                    <div className="absolute inset-0 bg-slate-950">
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
                        <span className="bg-gradient-to-r from-slate-800 to-slate-900 text-white text-[10px] font-black px-2.5 py-1 rounded-full border border-slate-700 flex items-center gap-1 shadow-md animate-pulse">
                          <Zap className="w-3 h-3 fill-white" /> Express
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col justify-end">
                      <span className="text-emerald-400 text-[11px] font-black tracking-widest mb-1">{c.type}</span>
                      <h3 className="font-sora text-lg font-extrabold text-white leading-tight mb-1 group-hover:text-slate-200 transition-colors">{c.name}</h3>
                      <p className="text-gray-300 text-xs font-semibold mb-2">🕒 Validity: {c.days}</p>
                      <div className="h-px bg-white/10 my-2" />
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-gray-400 block font-bold tracking-wider">Total Fee</span>
                          <span className="text-base font-black text-white">{c.fee}</span>
                        </div>
                        <span className="bg-white/10 group-hover:bg-black group-hover:text-white text-white p-2 rounded-xl transition-all duration-300 backdrop-blur-md border border-white/10">
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {filtered.length === 0 && <p className="text-center text-gray-400 py-12 text-sm">No countries found. Try a different search.</p>}
            </div>
          )}

          {/* Step 1: Travelers Detail List */}
          {step === 1 && selected && (
            <div className="max-w-2xl mx-auto space-y-6 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-sora text-2xl font-extrabold text-slate-900">Enter Traveler Details</h2>
                  <p className="text-xs text-gray-500 mt-1">Make sure names match exactly as written on the passport.</p>
                </div>
                <button onClick={() => setStep(0)} className="text-xs text-slate-700 font-bold hover:underline flex items-center gap-1">
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
                          ? "bg-white border-black text-black shadow-md shadow-slate-100" 
                          : "bg-white/40 border-slate-200 text-slate-500 hover:border-slate-400"
                      }`}
                    >
                      👤 Traveler {idx + 1} {tr.firstName ? `(${tr.firstName})` : ""}
                    </button>
                    {travelers.length > 1 && (
                      <button 
                        onClick={() => removeTraveler(idx)}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-slate-800 text-white rounded-full flex items-center justify-center text-[9px] hover:bg-black"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addTraveler}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold border-2 border-dashed border-slate-300 text-slate-800 hover:bg-slate-100 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Traveler
                </button>
              </div>

              {/* Active Traveler Form Card */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 space-y-4">
                <h3 className="font-sora text-xs font-black text-slate-900 tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  Editing Details for Traveler #{activeTravelerIdx + 1}
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 tracking-widest mb-1.5 block">First Name *</label>
                    <input 
                      value={travelers[activeTravelerIdx].firstName} 
                      onChange={e => updateTravelerField(activeTravelerIdx, "firstName", e.target.value)} 
                      placeholder="As on passport" 
                      className="w-full p-3.5 bg-slate-50/60 border border-slate-250 rounded-xl text-xs outline-none focus:border-black" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 tracking-widest mb-1.5 block">Last Name *</label>
                    <input 
                      value={travelers[activeTravelerIdx].lastName} 
                      onChange={e => updateTravelerField(activeTravelerIdx, "lastName", e.target.value)} 
                      placeholder="As on passport" 
                      className="w-full p-3.5 bg-slate-50/60 border border-slate-250 rounded-xl text-xs outline-none focus:border-black" 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-500 tracking-widest mb-1.5 block">Passport Number *</label>
                  <input 
                    value={travelers[activeTravelerIdx].passport} 
                    onChange={e => updateTravelerField(activeTravelerIdx, "passport", e.target.value)} 
                    placeholder="e.g. P1234567" 
                    className="w-full p-3.5 bg-slate-50/60 border border-slate-250 rounded-xl text-xs outline-none focus:border-black" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 tracking-widest mb-1.5 block">Date of Birth *</label>
                    <input 
                      type="date" 
                      value={travelers[activeTravelerIdx].dob} 
                      onChange={e => updateTravelerField(activeTravelerIdx, "dob", e.target.value)} 
                      className="w-full p-3.5 bg-slate-50/60 border border-slate-250 rounded-xl text-xs outline-none focus:border-black text-gray-650" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 tracking-widest mb-1.5 block">Passport Expiry *</label>
                    <input 
                      type="date" 
                      value={travelers[activeTravelerIdx].expiry} 
                      onChange={e => updateTravelerField(activeTravelerIdx, "expiry", e.target.value)} 
                      className="w-full p-3.5 bg-slate-50/60 border border-slate-250 rounded-xl text-xs outline-none focus:border-black text-gray-650" 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-500 tracking-widest mb-1.5 block">Email address *</label>
                  <input 
                    type="email"
                    value={travelers[activeTravelerIdx].email} 
                    onChange={e => updateTravelerField(activeTravelerIdx, "email", e.target.value)} 
                    placeholder="e.g. traveler@mail.com" 
                    className="w-full p-3.5 bg-slate-50/60 border border-slate-250 rounded-xl text-xs outline-none focus:border-black" 
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-500 tracking-widest mb-1.5 block">Mobile Number *</label>
                  <input 
                    type="tel"
                    value={travelers[activeTravelerIdx].phone} 
                    onChange={e => updateTravelerField(activeTravelerIdx, "phone", e.target.value)} 
                    placeholder="e.g. +91 98765 43210" 
                    className="w-full p-3.5 bg-slate-50/60 border border-slate-250 rounded-xl text-xs outline-none focus:border-black" 
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={() => setStep(0)} className="px-6 py-4 border-2 border-slate-200 rounded-2xl text-xs font-black text-gray-600 hover:bg-slate-100 transition-all flex items-center gap-1.5 tracking-wider">← Back</button>
                <button onClick={handleNextFromTravelers} className="flex-1 bg-black hover:bg-slate-900 text-white font-black py-4 rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-xs tracking-wider">Continue to Documents <ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          )}

          {/* Step 2: Essential Documents Upload Checklist */}
          {step === 2 && selected && (
            <div className="max-w-2xl mx-auto space-y-6 transition-all duration-300">
              <div className="text-center">
                <h2 className="font-sora text-3xl font-extrabold text-slate-900">The Essential Documents</h2>
                <p className="text-xs text-gray-500 mt-2 max-w-lg mx-auto">These are as per the official {selected.name} embassy requirements for visa processing.</p>
              </div>

              {/* Traveler document cards list */}
              {travelers.map((tr, index) => (
                <div key={tr.id} className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 space-y-5">
                  
                  {/* Traveler Header */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-950 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                      {tr.firstName ? tr.firstName.substring(0, 2).toUpperCase() : `T${index + 1}`}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-base">{tr.firstName || "Traveler"} {tr.lastName}</div>
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
                          : "bg-slate-50/20 border-slate-200 hover:border-black hover:bg-slate-100/40"
                      }`}
                    >
                      <Camera className={`w-8 h-8 mx-auto mb-2 ${tr.photoUploaded ? "text-emerald-500" : "text-slate-800"}`} />
                      <h4 className="font-bold text-slate-900 text-xs mb-0.5">Passport Size Photo</h4>
                      <p className="text-[10px] text-gray-400 mb-2">White background, high quality JPG</p>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black tracking-wider ${
                        tr.photoUploaded ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-800"
                      }`}>
                        {tr.photoUploaded ? "✅ Uploaded" : "↑ Upload"}
                      </span>
                    </div>

                    {/* Upload Passport Scan Card */}
                    <div 
                      onClick={() => {
                        const newTravelers = [...travelers];
                        newTravelers[index].passportUploaded = !newTravelers[index].passportUploaded;
                        setTravelers(newTravelers);
                      }}
                      className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                        tr.passportUploaded 
                          ? "bg-emerald-50/50 border-emerald-300" 
                          : "bg-slate-50/20 border-slate-200 hover:border-black hover:bg-slate-100/40"
                      }`}
                    >
                      <FileText className={`w-8 h-8 mx-auto mb-2 ${tr.passportUploaded ? "text-emerald-500" : "text-slate-800"}`} />
                      <h4 className="font-bold text-slate-900 text-xs mb-0.5">Passport Front Scan</h4>
                      <p className="text-[10px] text-gray-400 mb-2">Bio-data page, clear text PDF/JPG</p>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black tracking-wider ${
                        tr.passportUploaded ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-800"
                      }`}>
                        {tr.passportUploaded ? "✅ Uploaded" : "↑ Upload"}
                      </span>
                    </div>

                  </div>
                </div>
              ))}

              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="px-6 py-4 border-2 border-slate-200 rounded-2xl text-xs font-black text-gray-600 hover:bg-slate-100 transition-all flex items-center gap-1.5 tracking-wider">← Back</button>
                <button onClick={() => setStep(3)} className="flex-1 bg-black hover:bg-slate-900 text-white font-black py-4 rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-xs tracking-wider">Proceed to Essentials <ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          )}

          {/* Step 3: Premium Essentials & Upgrades */}
          {step === 3 && selected && (
            <div className="max-w-2xl mx-auto space-y-6 transition-all duration-300">
              <div>
                <h2 className="font-sora text-2xl font-extrabold text-slate-900">Enhance Your Application</h2>
                <p className="text-xs text-gray-500 mt-1">Unlock fast processing and premium traveler protections.</p>
              </div>

              <div className="space-y-4">
                
                {/* Express Upgrade Card */}
                {selected.express && (
                  <div 
                    onClick={() => setExpress(!express)}
                    className={`flex items-center gap-4 p-5 rounded-3xl border-2 cursor-pointer transition-all ${
                      express 
                        ? "bg-slate-100/50 border-slate-900 shadow-md" 
                        : "bg-white border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0">
                      <Zap className="w-6 h-6 text-slate-900" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        Express Visa Processing
                        <span className="text-[9px] bg-slate-900 text-white font-bold px-2 py-0.5 rounded-full tracking-wider">Popular</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">Embassy response in 6-12 hours. Guaranteed fast track.</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-black text-slate-950 text-sm">₹1,500</div>
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
                      : "bg-white border-slate-200 hover:border-slate-400"
                  }`}
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      Premium Visa Insurance
                      <span className="text-[9px] bg-emerald-500 text-white font-bold px-2 py-0.5 rounded-full tracking-wider">Highly Recommended</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">100% refund of all visa fees in case of rejection or visa delay.</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black text-slate-950 text-sm">₹699</div>
                    <div className="text-[10px] text-gray-400 font-bold">per traveler</div>
                  </div>
                </div>

              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={() => setStep(2)} className="px-6 py-4 border-2 border-slate-200 rounded-2xl text-xs font-black text-gray-600 hover:bg-slate-100 transition-all flex items-center gap-1.5 tracking-wider">← Back</button>
                <button onClick={() => setStep(4)} className="flex-1 bg-black hover:bg-slate-900 text-white font-black py-4 rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-xs tracking-wider">Go to Checkout <ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          )}

          {/* Step 4: Checkout & Pay */}
          {step === 4 && selected && (
            <div className="max-w-2xl mx-auto space-y-6 transition-all duration-300">
              <div>
                <h2 className="font-sora text-2xl font-extrabold text-slate-900">Checkout & Pay</h2>
                <p className="text-xs text-gray-500 mt-1">Review your summary and make secure payment.</p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-gray-500 text-xs font-bold tracking-wider">Destination</span>
                  <span className="font-bold text-slate-900 text-sm">{selected.flag} {selected.name}</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-gray-500 text-xs font-bold tracking-wider">Applicants ({travelers.length})</span>
                  <div className="text-right">
                    {travelers.map((tr, idx) => (
                      <div key={tr.id} className="text-xs font-bold text-slate-900">
                        Traveler {idx + 1}: {tr.firstName || "Unnamed"} {tr.lastName}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 text-xs text-gray-600 font-semibold">
                  <div className="flex justify-between">
                    <span>Visa Base Fees ({travelers.length} × {selected.fee})</span>
                    <span className="text-slate-900">₹{getSubtotal().toLocaleString()}</span>
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
                      <span className="text-slate-900">₹{(1500 * travelers.length).toLocaleString()}</span>
                    </div>
                  )}

                  {insurance && (
                    <div className="flex justify-between">
                      <span>Rejection Protection Insurance ({travelers.length} × ₹699)</span>
                      <span className="text-slate-900">₹{(699 * travelers.length).toLocaleString()}</span>
                    </div>
                  )}

                  <div className="h-px bg-slate-100 my-3" />

                  <div className="flex justify-between font-extrabold text-slate-900 text-base">
                    <span>Total Amount</span>
                    <span className="text-slate-950">₹{getTotal().toLocaleString()}</span>
                  </div>
                </div>

                {/* PCI Secure Form */}
                <div className="bg-slate-50/60 rounded-2xl p-4 border border-slate-200 space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 tracking-widest mb-1.5 block">Cardholder Name</label>
                    <input placeholder="As written on card" className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-black" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 tracking-widest mb-1.5 block">Card Number</label>
                    <input placeholder="4111 2222 3333 4444" className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-black" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 tracking-widest mb-1.5 block">Expiry</label>
                      <input placeholder="MM / YY" className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-black" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 tracking-widest mb-1.5 block">CVV</label>
                      <input placeholder="•••" className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-black" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-3">
                  <button onClick={() => setStep(3)} className="px-6 py-4 border-2 border-slate-200 rounded-2xl text-xs font-black text-gray-600 hover:bg-slate-100 transition-all flex items-center gap-1.5 tracking-wider">← Back</button>
                  <button onClick={handlePayment} className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black py-4 rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-xs tracking-wider animate-shimmer">
                    <CreditCard className="w-4 h-4" /> Pay & Apply · ₹{getTotal().toLocaleString()}
                  </button>
                </div>
                
                <p className="text-center text-[10px] text-gray-550 mt-2 flex items-center justify-center gap-1.5 font-bold tracking-wider">
                  <Shield className="w-3.5 h-3.5 text-slate-800" />
                  256-bit SSL Encrypted · PCI DSS Compliant · 100% Refundable Rejection Insurance
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
