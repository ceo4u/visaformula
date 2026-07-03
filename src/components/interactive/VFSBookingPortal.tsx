import { useState, useEffect } from "react";
import {
  CalendarCheck, MapPin, Clock, Search, Shield, CheckCircle,
  Globe, Bell, Download, RefreshCw, ArrowRight, ChevronDown,
  FileText, Fingerprint, Camera, AlertCircle, Info, Phone,
  Lightbulb, BadgeCheck, Wallet, ExternalLink
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────
type StatusType = "confirmed" | "upcoming" | "pending";

// ── Data ──────────────────────────────────────────────────
const filterChips = [
  "All Bookings", "🇬🇧 UK", "🇨🇦 Canada", "🇦🇺 Australia",
  "🇩🇪 Schengen", "Biometrics", "Passport Submission", "Visa Interview",
];

const upcomingCards = [
  {
    flag: "🇬🇧", country: "UK Visa", badgeColor: "bg-red-50 text-red-700 border-red-100",
    status: "confirmed" as StatusType, title: "Biometrics Appointment",
    centre: "VFS Mumbai — Tardeo", date: "12 June 2025 · 10:30 AM",
    applicant: "Priya Sharma", applicantColor: "text-emerald-600",
    action: "View Slip →", actionStyle: "bg-white border border-red-200 text-red-600 hover:bg-red-50",
    toastMsg: "📄 View appointment PDF",
  },
  {
    flag: "🇨🇦", country: "Canada", badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    status: "upcoming" as StatusType, title: "Biometrics & Document Submission",
    centre: "VFS Pune — Magarpatta", date: "18 June 2025 · 2:00 PM",
    applicant: "Rajesh Patil", applicantColor: "text-emerald-600",
    action: "Slip →", actionStyle: "bg-white border border-red-200 text-red-600 hover:bg-red-50",
    toastMsg: "📄 Appointment slip",
  },
  {
    flag: "🇪🇺", country: "Schengen", badgeColor: "bg-violet-50 text-violet-700 border-violet-200",
    status: "pending" as StatusType, title: "Visa Interview — France",
    centre: "VFS Delhi — Shivaji Stadium", date: "25 June 2025 · 11:15 AM",
    applicant: "Awaiting VFS confirmation", applicantColor: "text-red-600",
    action: "Check →", actionStyle: "bg-red-50 border border-red-200 text-red-700 hover:bg-red-100",
    toastMsg: "🔄 Checking status...",
  },
];

const statusBadge: Record<StatusType, string> = {
  confirmed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  upcoming:  "bg-red-50 text-red-700 border border-red-100",
  pending:   "bg-red-50 text-red-600 border border-red-100",
};
const statusLabel: Record<StatusType, string> = {
  confirmed: "✅ Confirmed",
  upcoming:  "⏳ Upcoming",
  pending:   "🕒 Pending",
};

const historyRows = [
  { client: "Priya Sharma",  country: "🇬🇧 UK Student Visa",     centre: "Mumbai (Tardeo)",           date: "12 Jun 2025 · 10:30 AM", status: "Confirmed", statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200", action: "Download →", actionStyle: "bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100", toast: "📄 Download appointment letter" },
  { client: "Rajesh Patil",  country: "🇨🇦 Canada PR",            centre: "Pune (Magarpatta)",         date: "18 Jun 2025 · 2:00 PM",  status: "Upcoming",  statusColor: "bg-red-50 text-red-700 border-red-200",         action: "Reschedule →", actionStyle: "bg-red-50 border border-red-200 text-red-700 hover:bg-red-100", toast: "⏰ Reschedule requested" },
  { client: "Neha Gupta",   country: "🇪🇺 Schengen (France)",     centre: "Delhi (Shivaji Stadium)",  date: "25 Jun 2025 · 11:15 AM", status: "Pending",   statusColor: "bg-red-50 text-red-600 border-red-100",     action: "Refresh →", actionStyle: "bg-white border border-red-200 text-red-600 hover:bg-red-50", toast: "🔄 Check VFS status" },
];

const processSteps = [
  { emoji: "1️⃣", title: "Collect Client Docs",  desc: "Passport, photo, visa application form."                             },
  { emoji: "2️⃣", title: "Book Slot via VisaFormula",  desc: "Fill form below — we check real-time VFS availability."              },
  { emoji: "3️⃣", title: "Share Confirmation",    desc: "Send appointment slip to client (PDF / WhatsApp)."                   },
  { emoji: "4️⃣", title: "Track & Update",        desc: "Mark completed and earn ₹75 agent commission per booking."           },
];

const vfsCountries = ["🇬🇧 United Kingdom (UKVI)", "🇨🇦 Canada (IRCC)", "🇦🇺 Australia", "🇪🇺 Schengen (France/Germany/Italy etc)", "🇺🇸 USA (Dropbox only)"];
const serviceTypes = ["Biometrics (fingerprints + photo)", "Passport Submission", "Visa Interview", "Document Collection"];
const vfsCentres  = ["Mumbai (Tardeo)", "Delhi (Shivaji Stadium)", "Bengaluru (Global Village Tech Park)", "Chennai (DLF Cybercity)", "Kolkata (Rajarhat)", "Hyderabad (Madhapur)", "Pune (Magarpatta)", "Ahmedabad (Prahlad Nagar)"];
const timeSlots   = ["09:00 AM – 10:00 AM", "10:00 AM – 11:00 AM", "11:00 AM – 12:00 PM", "01:00 PM – 02:00 PM", "02:00 PM – 03:00 PM", "03:00 PM – 04:00 PM"];

export function VFSBookingPortal() {
  const [activeChip, setActiveChip]       = useState("All Bookings");
  const [toast, setToast]                 = useState({ show: false, msg: "" });
  const [clientName, setClientName]       = useState("");
  const [passportNo, setPassportNo]       = useState("");
  const [country, setCountry]             = useState(vfsCountries[0]);
  const [serviceType, setServiceType]     = useState(serviceTypes[0]);
  const [centre, setCentre]               = useState(vfsCentres[0]);
  const [prefDate, setPrefDate]           = useState("");
  const [timeSlot, setTimeSlot]           = useState(timeSlots[0]);
  const [agentNote, setAgentNote]         = useState("");
  const [submitted, setSubmitted]         = useState(false);

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2800);
  };

  const handleBook = () => {
    if (!clientName.trim()) { showToast("❌ Client name is required"); return; }
    if (!prefDate)           { showToast("📅 Please select a preferred date"); return; }
    showToast(`✅ VFS booking submitted for ${clientName} at ${centre} on ${prefDate}`);
    setSubmitted(true);
    setPrefDate(""); setAgentNote("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleClear = () => {
    setClientName(""); setPassportNo(""); setPrefDate(""); setAgentNote("");
    showToast("🔄 Form cleared");
  };

  return (
    <div className="bg-white min-h-screen text-[#1A3347] font-sans pb-20">

      {/* ── TOAST ─────────────────────────────────────── */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0C1A2E] text-white px-6 py-3 rounded-full text-xs font-bold z-[999] shadow-xl whitespace-nowrap transition-all duration-300 ${toast.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
        {toast.msg}
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-8">

        {/* ── HERO BANNER ───────────────────────────────── */}
        <div className="bg-gradient-to-br from-[#fff5f5] to-white border border-red-100 rounded-3xl p-8 md:p-10 mb-8 text-center shadow-sm relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 rounded-full opacity-[0.03] blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-400 rounded-full opacity-[0.02] blur-3xl pointer-events-none" />

          <div className="text-5xl mb-4">🛂📅</div>
          <h1 className="font-sora font-extrabold text-3xl md:text-4xl text-[#0C1A2E] mb-3 leading-tight">
            VFS Global <span className="text-[#ef4444]">Booking Services</span>
          </h1>
          <p className="text-[#475569] text-sm md:text-base max-w-2xl mx-auto mb-7 leading-relaxed">
            Book biometrics, visa appointments, passport submission and collection slots for UK, Canada, Schengen, Australia and more — directly via VisaFormula Agent Portal.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {[
              { value: "18+",    label: "VFS Centres" },
              { value: "12K+",   label: "Appointments" },
              { value: "98%",    label: "On-time slots" },
              { value: "₹0 extra", label: "for VisaFormula Agents" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="font-sora font-extrabold text-3xl text-[#ef4444]">{s.value}</div>
                <div className="text-xs text-[#475569] font-semibold mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => document.getElementById("book-section")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-slate-900 text-white font-bold px-7 py-3.5 rounded-2xl text-sm shadow-md hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all inline-flex items-center gap-2"
          >
            <CalendarCheck className="w-4 h-4" /> + Create New Booking
          </button>
        </div>

        {/* ── FILTER CHIPS ──────────────────────────────── */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-7 scrollbar-hide">
          {filterChips.map(chip => (
            <button
              key={chip}
              onClick={() => { setActiveChip(chip); showToast(`🔍 Filter: ${chip}`); }}
              className={`px-4 py-2 rounded-full text-xs font-bold border whitespace-nowrap shrink-0 transition-all ${
                activeChip === chip
                  ? "bg-slate-900 text-white border-transparent shadow-sm"
                  : "bg-white text-[#475569] border-slate-200 hover:border-red-500 hover:text-red-500"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* ── UPCOMING APPOINTMENTS ─────────────────────── */}
        <div className="mb-8">
          <span className="text-[11px] font-extrabold text-red-500 tracking-widest block mb-1">Upcoming & Pending</span>
          <h2 className="font-sora font-extrabold text-xl text-[#0C1E2E] mb-5">Your Booked Appointments</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {upcomingCards.map((card, i) => (
              <div
                key={i}
                onClick={() => showToast(card.toastMsg)}
                className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:border-red-200 hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
              >
                {/* Top row */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${card.badgeColor}`}>
                    {card.flag} {card.country}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusBadge[card.status]}`}>
                    {statusLabel[card.status]}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-sora font-bold text-base text-[#0C1A2E] mb-2 group-hover:text-red-500 transition-colors leading-snug">{card.title}</h3>

                {/* Centre & date */}
                <div className="text-xs text-[#475569] flex items-center gap-1.5 mb-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#94B0C4] shrink-0" /> {card.centre}
                </div>
                <div className="text-sm font-bold text-[#0C1A2E] flex items-center gap-1.5 mb-4">
                  <CalendarCheck className="w-3.5 h-3.5 text-red-500 shrink-0" /> {card.date}
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-50 mb-4" />

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${card.applicantColor}`}>
                    {card.status !== "pending" ? `Applicant: ${card.applicant}` : card.applicant}
                  </span>
                  <button
                    onClick={e => { e.stopPropagation(); showToast(card.toastMsg); }}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all active:scale-[0.97] ${card.actionStyle}`}
                  >
                    {card.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOOKING FORM ──────────────────────────────── */}
        <div id="book-section" className="bg-gradient-to-br from-[#fff5f5] to-white border border-red-100 rounded-3xl p-7 md:p-9 mb-8 shadow-sm">
          <span className="text-[11px] font-extrabold text-red-500 tracking-widest block mb-1">Agent Booking Panel</span>
          <h2 className="font-sora font-extrabold text-xl text-[#0C1A2E] mb-1">Book New VFS Appointment</h2>
          <p className="text-sm text-[#475569] mb-7">For your client — biometrics, passport submission, visa interview, or document collection.</p>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
              <div className="font-sora font-bold text-base text-[#0C1A2E] mb-1">Booking Request Submitted!</div>
              <p className="text-xs text-[#475569]">We'll confirm availability and send the appointment slip within <strong>30 minutes</strong>.</p>
            </div>
          ) : null}

          {/* Row 1: Client name + Passport */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="text-[10px] font-medium tracking-normal text-[#94B0C4] block mb-1.5">Client Full Name *</label>
              <input
                value={clientName} onChange={e => setClientName(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-[#0C1A2E] outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all placeholder:text-[#C4D9E8]"
                placeholder="As on passport"
              />
            </div>
            <div>
              <label className="text-[10px] font-medium tracking-normal text-[#94B0C4] block mb-1.5">Passport Number</label>
              <input
                value={passportNo} onChange={e => setPassportNo(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-[#0C1A2E] outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all placeholder:text-[#C4D9E8]"
                placeholder="P1234567"
              />
            </div>
          </div>

          {/* Row 2: Country + Service */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="text-[10px] font-medium tracking-normal text-[#94B0C4] block mb-1.5">Visa Country / Destination</label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94B0C4] pointer-events-none" />
                <select value={country} onChange={e => setCountry(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold text-[#0C1A2E] outline-none focus:border-red-500 appearance-none cursor-pointer transition-all">
                  {vfsCountries.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-medium tracking-normal text-[#94B0C4] block mb-1.5">Service Type</label>
              <div className="relative">
                <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94B0C4] pointer-events-none" />
                <select value={serviceType} onChange={e => setServiceType(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold text-[#0C1A2E] outline-none focus:border-red-500 appearance-none cursor-pointer transition-all">
                  {serviceTypes.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Row 3: Centre + Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="text-[10px] font-medium tracking-normal text-[#94B0C4] block mb-1.5">VFS Centre (City)</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94B0C4] pointer-events-none" />
                <select value={centre} onChange={e => setCentre(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold text-[#0C1A2E] outline-none focus:border-red-500 appearance-none cursor-pointer transition-all">
                  {vfsCentres.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-medium tracking-normal text-[#94B0C4] block mb-1.5">Preferred Date *</label>
              <div className="relative">
                <CalendarCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94B0C4] pointer-events-none" />
                <input type="date" value={prefDate} onChange={e => setPrefDate(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold text-[#0C1A2E] outline-none focus:border-red-500 transition-all" />
              </div>
            </div>
          </div>

          {/* Row 4: Time + Note */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="text-[10px] font-medium tracking-normal text-[#94B0C4] block mb-1.5">Preferred Time Slot</label>
              <div className="relative">
                <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94B0C4] pointer-events-none" />
                <select value={timeSlot} onChange={e => setTimeSlot(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold text-[#0C1A2E] outline-none focus:border-red-500 appearance-none cursor-pointer transition-all">
                  {timeSlots.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-medium tracking-normal text-[#94B0C4] block mb-1.5">Agent Note (optional)</label>
              <input value={agentNote} onChange={e => setAgentNote(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-[#0C1A2E] outline-none focus:border-red-500 transition-all placeholder:text-[#C4D9E8]"
                placeholder="Any special request for client?" />
            </div>
          </div>

          {/* Tip box */}
          <div className="bg-red-50/50 border-l-4 border-red-500 rounded-r-2xl px-5 py-4 mb-6 flex gap-3 items-start">
            <Lightbulb className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="text-xs text-[#475569] leading-relaxed">
              <strong className="text-[#0C1A2E]">VFS Booking Tip (for agents)</strong> — Biometrics slots for UK and Canada fill up 3–4 weeks in advance. For urgent cases, try Mumbai or Delhi centres — they release late slots on Wednesdays.
            </div>
          </div>

          {/* Form actions */}
          <div className="flex gap-3 justify-end flex-wrap">
            <button onClick={handleClear}
              className="bg-white border border-red-200 text-red-600 font-bold text-sm px-6 py-3 rounded-2xl hover:bg-red-50 transition-all active:scale-[0.97]">
              Clear
            </button>
            <button onClick={handleBook}
              className="bg-slate-900 text-white font-bold text-sm px-7 py-3 rounded-2xl shadow-sm hover:bg-black hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center gap-2">
              <Search className="w-4 h-4" /> Check Availability & Book
            </button>
          </div>
        </div>

        {/* ── BOOKING HISTORY TABLE ─────────────────────── */}
        <div className="mb-8">
          <span className="text-[11px] font-extrabold text-red-500 tracking-widest block mb-1">Booking History</span>
          <h2 className="font-sora font-extrabold text-xl text-[#0C1A2E] mb-5">Recent Appointments Booked by You</h2>

          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
            {/* Table header */}
            <div className="hidden md:grid grid-cols-12 bg-slate-50 border-b border-slate-100 px-5 py-3 text-[10px] font-extrabold text-[#94B0C4] tracking-wider">
              <div className="col-span-2">Client</div>
              <div className="col-span-3">Country / Visa</div>
              <div className="col-span-2">VFS Centre</div>
              <div className="col-span-2">Date & Time</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-2 text-right">Action</div>
            </div>

            {historyRows.map((row, i) => (
              <div key={i} className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-0 px-5 py-4 border-b border-[#EEF6FD] last:border-0 items-center text-sm ${i % 2 === 1 ? "bg-slate-50/30" : "bg-white"} hover:bg-red-50/30 transition-colors`}>
                <div className="col-span-2 font-bold text-[#0C1A2E]">{row.client}</div>
                <div className="col-span-3 text-[#475569] font-medium">{row.country}</div>
                <div className="col-span-2 text-[#475569] text-xs">{row.centre}</div>
                <div className="col-span-2 text-xs font-semibold text-[#0C1A2E]">{row.date}</div>
                <div className="col-span-1">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${row.statusColor}`}>{row.status}</span>
                </div>
                <div className="col-span-2 flex justify-end">
                  <button onClick={() => showToast(row.toast)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all active:scale-[0.97] ${row.actionStyle}`}>
                    {row.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── VFS PROCESS GUIDE ─────────────────────────── */}
        <div className="bg-white border border-slate-100 rounded-3xl p-7 mb-8 shadow-sm">
          <span className="text-[11px] font-extrabold text-red-500 tracking-widest block mb-1">VFS Process Guide</span>
          <h2 className="font-sora font-extrabold text-xl text-[#0C1A2E] mb-7">Step-by-Step for VisaFormula Agents</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            {processSteps.map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  {step.emoji}
                </div>
                <div className="font-sora font-bold text-sm text-[#0C1A2E] mb-2">{step.title}</div>
                <p className="text-xs text-[#475569] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Commission tip */}
          <div className="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-2xl px-5 py-4 flex gap-3 items-start">
            <Wallet className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-700 leading-relaxed">
              <strong>Agent commission: ₹75 per VFS slot booking</strong> (paid weekly via UPI). Bonus ₹150 for every 10 successful bookings in a month.
            </div>
          </div>
        </div>

        {/* ── FAQ / QUICK LINKS ─────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-slate-100">
          <button onClick={() => showToast("🔗 VFS Official website")}
            className="flex items-center gap-1.5 text-xs text-red-500 font-semibold hover:underline">
            <ExternalLink className="w-3.5 h-3.5" /> VFS Global official appointment portal
          </button>
          <button onClick={() => showToast("📞 VFS helpline: 1800 102 1234 (toll free)")}
            className="flex items-center gap-1.5 text-xs text-red-500 font-semibold hover:underline">
            <Phone className="w-3.5 h-3.5" /> VFS helpline: 1800 102 1234
          </button>
          <button onClick={() => showToast("Mon–Sat, 9 AM – 5:30 PM")}
            className="flex items-center gap-1.5 text-xs text-[#475569] font-semibold hover:text-red-500 transition-colors">
            <Clock className="w-3.5 h-3.5" /> Booking support timings
          </button>
        </div>

      </div>
    </div>
  );
}

