"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, ChevronRight, CheckCircle, Upload, CreditCard, Shield, Clock, Star, Zap, ArrowRight, Globe } from "lucide-react";

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

const steps = ["Destination", "Details", "Documents", "Payment"];

export default function ApplyVisaPage() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<typeof countries[0] | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [express, setExpress] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", passport: "", dob: "", expiry: "", travel: "", email: "", phone: "" });

  const filtered = countries.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || (filter === "e-Visa" && c.type === "e-Visa") || (filter === "Popular" && c.popular) || (filter === "Express" && c.express);
    return matchSearch && matchFilter;
  });

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-sky-100 shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="font-sora text-2xl font-extrabold text-navy mb-2">Application Submitted! 🎉</h1>
          <p className="text-gray-500 text-sm mb-1">Your {selected?.name} visa application is under review.</p>
          <p className="text-gray-400 text-xs mb-6">We'll send your e-Visa to <strong>{form.email}</strong> within 24–48 hours.</p>
          <div className="bg-sky-50 rounded-2xl p-4 border border-sky-100 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Country</span><span className="font-bold text-navy">{selected?.flag} {selected?.name}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Visa Type</span><span className="font-bold text-navy">{selected?.type}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Total Paid</span><span className="font-bold text-[#0ea5e9]">{selected?.fee}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Processing</span><span className="font-bold text-emerald-600">24–48 hours</span></div>
          </div>
          <Link href="/" className="block w-full bg-gradient-to-r from-[#38BDF8] to-[#0ea5e9] text-white font-bold py-3.5 rounded-xl text-center hover:shadow-lg transition-all">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#EBF7FF] via-[#F0F9FF] to-white border-b border-sky-100 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 border border-sky-200 rounded-full px-4 py-1.5 text-xs font-bold mb-4">
            <Zap className="w-3 h-3" /> Apply Online · 120+ Countries · On-Time Guaranteed
          </div>
          <h1 className="font-sora text-4xl font-extrabold text-navy mb-3">
            Apply for Visa Online.<br/>
            <span className="bg-gradient-to-r from-[#38BDF8] to-[#0284C7] bg-clip-text text-transparent">Fast. Simple. Guaranteed.</span>
          </h1>
          <p className="text-gray-500 text-base mb-6 max-w-lg mx-auto">Select your destination, fill the form — we get your visa on time. Expert support included.</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-gray-600">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> 99.1% approval rate</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-sky-500" /> 24–48 hr processing</span>
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-purple-500" /> Money-back guarantee</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-500" /> 50,000+ visas issued</span>
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="bg-white border-b border-sky-100 py-3 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${i === step ? "bg-[#0ea5e9] text-white" : i < step ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-400"}`}>
                {i < step ? <CheckCircle className="w-3 h-3" /> : <span>{i + 1}</span>}
                <span className="hidden sm:inline">{s}</span>
              </div>
              {i < steps.length - 1 && <ChevronRight className="w-4 h-4 text-gray-300" />}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Step 0: Choose Destination */}
        {step === 0 && (
          <div>
            <h2 className="font-sora text-xl font-bold text-navy mb-1">Where are you going?</h2>
            <p className="text-sm text-gray-500 mb-5">Select the country you want to apply a visa for.</p>

            {/* Search + filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search country..." className="w-full pl-10 pr-4 py-3 bg-white border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9] shadow-sm" />
              </div>
              <div className="flex gap-2">
                {["All", "Popular", "e-Visa", "Express"].map(f => (
                  <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 rounded-xl text-xs font-bold border-2 transition-all ${filter === f ? "bg-[#0ea5e9] text-white border-[#0ea5e9]" : "bg-white text-gray-500 border-sky-100 hover:border-sky-300"}`}>{f}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filtered.map(c => (
                <button
                  key={c.code}
                  onClick={() => { setSelected(c); setStep(1); }}
                  className={`group relative h-80 rounded-3xl overflow-hidden text-left hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 border-2 ${selected?.code === c.code ? "border-[#0ea5e9] ring-4 ring-sky-100" : "border-white/10 shadow-md bg-white"}`}
                >
                  {/* Luxurious Background Image */}
                  <div className="absolute inset-0 bg-navy">
                    <img 
                      src={c.image} 
                      alt={c.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 brightness-[0.8] group-hover:brightness-[0.7]"
                    />
                  </div>

                  {/* Elegant Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-black/20" />

                  {/* Top Floating Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    {/* Glowing Flag Orb */}
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full border border-white/35 flex items-center justify-center text-xl shadow-lg">
                      {c.flag}
                    </div>

                    {/* Express Badge */}
                    {c.express && (
                      <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-amber-400 flex items-center gap-1 shadow-md">
                        <Zap className="w-3 h-3 fill-white" /> Express
                      </span>
                    )}
                  </div>

                  {/* Card Content Footer */}
                  <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col justify-end">
                    <span className="text-emerald-400 text-[11px] font-black uppercase tracking-widest mb-1">{c.type}</span>
                    <h3 className="font-sora text-lg font-extrabold text-white leading-tight mb-1 group-hover:text-[#38BDF8] transition-colors">{c.name}</h3>
                    <p className="text-gray-300 text-xs font-semibold mb-2">
                      🕒 Validity: {c.days}
                    </p>
                    
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
          </div>
        )}

        {/* Step 1: Personal Details */}
        {step === 1 && selected && (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-6 p-4 bg-white rounded-2xl border border-sky-100 shadow-sm">
              <span className="text-3xl">{selected.flag}</span>
              <div>
                <div className="font-bold text-navy">{selected.name}</div>
                <div className="text-xs text-gray-500">{selected.type} · {selected.days} · <span className="text-[#0ea5e9] font-bold">{selected.fee}</span></div>
              </div>
              <button onClick={() => setStep(0)} className="ml-auto text-xs text-sky-600 font-bold hover:underline">Change</button>
            </div>

            <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6 space-y-4">
              <h2 className="font-sora text-lg font-bold text-navy">Personal Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">First Name *</label><input value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} placeholder="As on passport" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" /></div>
                <div><label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Last Name *</label><input value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} placeholder="As on passport" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" /></div>
              </div>
              <div><label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Passport Number *</label><input value={form.passport} onChange={e => setForm({...form, passport: e.target.value})} placeholder="e.g. P1234567" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Date of Birth *</label><input type="date" value={form.dob} onChange={e => setForm({...form, dob: e.target.value})} className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" /></div>
                <div><label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Passport Expiry *</label><input type="date" value={form.expiry} onChange={e => setForm({...form, expiry: e.target.value})} className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" /></div>
              </div>
              <div><label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Travel Date *</label><input type="date" value={form.travel} onChange={e => setForm({...form, travel: e.target.value})} className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" /></div>
              <div><label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Email (for visa delivery) *</label><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" /></div>
              <div><label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Phone Number *</label><input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+91 99999 99999" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" /></div>

              {/* Express option */}
              {selected.express && (
                <div className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${express ? "border-amber-400 bg-amber-50" : "border-sky-100 bg-sky-50/30"}`} onClick={() => setExpress(!express)}>
                  <div><div className="font-bold text-navy text-sm flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-500" /> Express Processing</div><div className="text-xs text-gray-500 mt-0.5">Get your visa in 6–12 hours instead of 24–48</div></div>
                  <div className={`w-11 h-6 rounded-full transition-all flex items-center ${express ? "bg-amber-500 justify-end" : "bg-gray-200 justify-start"}`}><span className="w-5 h-5 bg-white rounded-full shadow mx-0.5" /></div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(0)} className="px-5 py-3 border-2 border-sky-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-sky-50 transition-all">← Back</button>
                <button onClick={() => { if (!form.firstName || !form.email) { alert("Please fill all required fields."); return; } setStep(2); }} className="flex-1 bg-gradient-to-r from-[#38BDF8] to-[#0ea5e9] text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">Continue <ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Documents */}
        {step === 2 && selected && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6 mb-5">
              <h2 className="font-sora text-lg font-bold text-navy mb-4">Upload Documents</h2>
              <p className="text-sm text-gray-500 mb-5">All documents are encrypted and stored securely. We handle everything from here.</p>
              <div className="space-y-4">
                {[
                  { label: "Passport (scan of bio-data page)", required: true, hint: "PDF, JPG, PNG · Max 5MB" },
                  { label: "Passport-size Photo", required: true, hint: "White background, recent · JPG, PNG" },
                  { label: "Flight Itinerary", required: false, hint: "Booking confirmation · PDF, JPG" },
                  { label: "Hotel Booking / Invitation Letter", required: false, hint: "For UAE, UK, Schengen" },
                ].map((doc, i) => (
                  <div key={i}>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">{doc.label} {doc.required && <span className="text-red-400">*</span>}</label>
                    <div className="border-2 border-dashed border-sky-200 rounded-2xl p-6 text-center bg-sky-50/30 hover:bg-sky-50 transition-colors cursor-pointer group">
                      <Upload className="w-7 h-7 text-[#0ea5e9] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-sm font-semibold text-navy mb-0.5">Drop file here or click to browse</p>
                      <p className="text-xs text-gray-400">{doc.hint}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Required checklist */}
              <div className="mt-6 bg-emerald-50 rounded-2xl border border-emerald-100 p-4">
                <div className="font-bold text-navy text-sm mb-3">📋 Document Checklist</div>
                <ul className="space-y-2">
                  {["Passport with 6+ months validity ✅", "Recent passport-size photo ✅", "Flight itinerary (can be provisional)", "Hotel booking (recommended)"].map((item, i) => (
                    <li key={i} className={`text-xs flex items-center gap-2 ${i < 2 ? "text-emerald-700 font-semibold" : "text-gray-500"}`}>
                      {i < 2 ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 shrink-0" />}
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 h-2 bg-emerald-100 rounded-full"><div className="h-2 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" style={{ width: "50%" }} /></div>
                <div className="text-xs text-emerald-700 font-bold mt-1">2 of 4 required docs uploaded</div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)} className="px-5 py-3 border-2 border-sky-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-sky-50 transition-all">← Back</button>
                <button onClick={() => setStep(3)} className="flex-1 bg-gradient-to-r from-[#38BDF8] to-[#0ea5e9] text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">Continue to Payment <ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && selected && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6 mb-5">
              <h2 className="font-sora text-lg font-bold text-navy mb-5">Order Summary & Payment</h2>
              <div className="bg-sky-50/50 rounded-2xl border border-sky-100 p-4 mb-5 space-y-2.5">
                <div className="flex justify-between text-sm"><span className="text-gray-500">Destination</span><span className="font-bold text-navy">{selected.flag} {selected.name}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Visa Type</span><span className="font-bold text-navy">{selected.type}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Validity</span><span className="font-bold text-navy">{selected.days}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Applicant</span><span className="font-bold text-navy">{form.firstName} {form.lastName}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Travel Date</span><span className="font-bold text-navy">{form.travel || "—"}</span></div>
                <div className="h-px bg-sky-100 my-1" />
                <div className="flex justify-between text-sm"><span className="text-gray-500">Government Fee</span><span className="font-semibold">{parseInt(selected.fee.replace(/[₹,]/g, "")) - 999 > 0 ? `₹${parseInt(selected.fee.replace(/[₹,]/g, "")) - 999}` : selected.fee}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Visara Service Fee</span><span className="font-semibold">₹999</span></div>
                {express && <div className="flex justify-between text-sm text-amber-700"><span>Express Processing</span><span className="font-bold">₹1,500</span></div>}
                <div className="h-px bg-sky-100 my-1" />
                <div className="flex justify-between font-extrabold text-navy"><span>Total</span><span className="text-[#0ea5e9] text-lg">{selected.fee}</span></div>
              </div>

              <div className="space-y-3 mb-5">
                <div className="font-bold text-navy text-sm mb-2">Payment Method</div>
                {["💳 Credit / Debit Card", "📱 UPI (PhonePe · GPay · BHIM)", "🏦 Net Banking", "💰 Wallet (Paytm · Mobikwik)"].map((method, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3.5 border-2 rounded-xl cursor-pointer transition-all ${i === 0 ? "border-[#0ea5e9] bg-sky-50" : "border-sky-100 hover:border-sky-200"}`}>
                    <div className="w-4 h-4 rounded-full border-2 border-[#0ea5e9] flex items-center justify-center">{i === 0 && <div className="w-2 h-2 bg-[#0ea5e9] rounded-full" />}</div>
                    <span className="text-sm font-semibold text-navy">{method}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-3">
                <div><label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Card Number</label><input placeholder="1234 5678 9012 3456" className="w-full p-3 bg-white border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Expiry</label><input placeholder="MM / YY" className="w-full p-3 bg-white border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" /></div>
                  <div><label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">CVV</label><input placeholder="•••" className="w-full p-3 bg-white border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" /></div>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="px-5 py-3 border-2 border-sky-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-sky-50 transition-all">← Back</button>
                <button onClick={() => setSubmitted(true)} className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-3.5 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm">
                  <CreditCard className="w-4 h-4" /> Pay & Apply Now → {selected.fee}
                </button>
              </div>
              <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1"><Shield className="w-3 h-3" /> 256-bit SSL Encrypted · PCI DSS Compliant · 100% Secure</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
