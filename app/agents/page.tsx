"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle, ArrowRight, ArrowLeft, Users, Star, Trophy,
  Bell, UserCheck, FileText, Briefcase, Globe, ShieldCheck,
  Building2, DollarSign, ChevronRight, LogOut, Home, Wallet,
  ClipboardList, PartyPopper, Package, CalendarDays, BadgeCheck,
  Flag, AlertTriangle, ThumbsUp, ThumbsDown, SkipForward, Eye,
  GraduationCap
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────
type Page = "landing" | "register" | "dashboard";
type Section = "overview" | "verify-experts" | "verify-packages" | "verify-jobs" | "verify-events" | "earnings" | "payouts" | "notifications" | "profile";

// ─── Commission Table Data ─────────────────────────────────
const commissions = [
  { action: "🧑‍💼 Expert Profile (Consultant / Lawyer)", rate: "₹150 / profile", avg: "3–5 profiles", monthly: "₹9,000–₹15,000" },
  { action: "📦 Tour / Holiday Package",                 rate: "₹80 / package",  avg: "5–10 packages", monthly: "₹8,000–₹16,000" },
  { action: "💼 Overseas Job Listing",                   rate: "₹50 / listing",  avg: "8–15 listings", monthly: "₹8,000–₹18,000" },
  { action: "🏛️ Exhibition / Event Listing",             rate: "₹100 / listing", avg: "3–6 listings",  monthly: "₹6,000–₹12,000" },
  { action: "🎓 IELTS / Training Institute",             rate: "₹120 / institute",avg: "2–4 institutes",monthly: "₹6,000–₹10,000" },
];

const perks = [
  { emoji: "🧑‍💼", title: "Verify Expert Profiles",   desc: "Review consultant, lawyer, IELTS trainer and recruiter profiles. Check credentials, licences and KYC documents.",     bg: "bg-sky-50"    },
  { emoji: "📦",    title: "Review Tour Packages",    desc: "Check holiday packages, cruise listings, sport tour packages and event deals for accuracy and fraud.",                 bg: "bg-emerald-50"},
  { emoji: "💼",    title: "Verify Job Listings",     desc: "Review overseas job postings — verify employer details, visa claims, salary accuracy and recruiter legitimacy.",       bg: "bg-amber-50"  },
  { emoji: "⭐",    title: "Quality Review",           desc: "Flag spam, incorrect info, or fake listings. Keep the Visara platform trusted and high-quality for all users.",      bg: "bg-violet-50" },
];

const joinSteps = [
  { num: "1", emoji: "📝", title: "Fill Application",    desc: "Name, city, language skills, work availability and why you want to join."                              },
  { num: "2", emoji: "🪪", title: "Upload ID & KYC",    desc: "Aadhar or PAN card. Quick identity verification for trust and payout setup."                           },
  { num: "3", emoji: "✅", title: "Visara Approval",     desc: "Our team reviews your application within 48 hours and activates your agent account."                   },
  { num: "4", emoji: "💰", title: "Start & Earn",        desc: "Log in to your dashboard, pick tasks, verify and get paid every week."                                 },
];

// ─── Sidebar links ─────────────────────────────────────────
const sidebarLinks: { section: Section; emoji: string; label: string; badge?: number; badgeColor?: string }[] = [
  { section: "overview",         emoji: "🏠", label: "Overview"        },
  { section: "verify-experts",   emoji: "🧑‍💼", label: "Verify Experts", badge: 8,  badgeColor: "bg-red-500"   },
  { section: "verify-packages",  emoji: "📦", label: "Verify Packages", badge: 12, badgeColor: "bg-amber-500" },
  { section: "verify-jobs",      emoji: "💼", label: "Verify Jobs",     badge: 5,  badgeColor: "bg-red-500"   },
  { section: "verify-events",    emoji: "🎭", label: "Verify Events",   badge: 3,  badgeColor: "bg-amber-500" },
  { section: "earnings",         emoji: "💰", label: "My Earnings"     },
  { section: "payouts",          emoji: "🏦", label: "Payouts"          },
  { section: "notifications",    emoji: "🔔", label: "Notifications",   badge: 5,  badgeColor: "bg-red-500"   },
  { section: "profile",          emoji: "👤", label: "My Profile"       },
];

// ─── Expert verification card ──────────────────────────────
function VerifyCard({ initials, gradient, name, type, location, exp, badge, earnLabel, earn, documents, desc, onApprove, onReject, onFlag, onSkip }:
  { initials:string; gradient:string; name:string; type:string; location:string; exp:string; badge:string; badgeColor?:string; earnLabel:string; earn:string; documents:{icon:string;label:string}[]; desc:string;
    onApprove:()=>void; onReject:()=>void; onFlag:()=>void; onSkip:()=>void }) {
  return (
    <div className="bg-white border border-[#D4E8F5] rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 mb-4">
      {/* Header */}
      <div className="flex gap-4 items-start mb-4">
        <div className={`w-14 h-14 rounded-2xl ${gradient} flex items-center justify-center text-white font-sora font-bold text-lg shrink-0`}>{initials}</div>
        <div className="flex-1 min-w-0">
          <div className="font-sora font-bold text-base text-[#0C1A2E]">{name}</div>
          <div className="text-xs text-[#475569] mb-1.5">{type}</div>
          <div className="flex flex-wrap gap-2 text-xs text-[#475569]">
            <span>📍 {location}</span><span>·</span><span>{exp}</span><span>·</span>
            <span className="bg-sky-100 text-[#0369A1] border border-[#BAE6FD] px-2 py-0.5 rounded-full font-bold">{badge}</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-sora font-bold text-emerald-600 text-sm">{earn}</div>
          <div className="text-[10px] text-[#94B0C4] font-semibold">{earnLabel}</div>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-[#475569] leading-relaxed mb-4">{desc}</p>

      {/* Documents */}
      <div className="bg-[#EEF6FD] border border-[#D4E8F5] rounded-xl p-3 mb-4">
        <div className="text-[10px] font-extrabold text-[#94B0C4] uppercase tracking-wider mb-2">Submitted Documents</div>
        {documents.map(d => (
          <div key={d.label} className="flex items-center gap-2 py-1.5 border-b border-[#D4E8F5] last:border-0">
            <span className="text-base">{d.icon}</span>
            <span className="flex-1 text-xs text-[#1A3347] font-medium">{d.label}</span>
            <span className="text-xs font-bold text-[#0ea5e9] cursor-pointer hover:underline">View</span>
          </div>
        ))}
      </div>

      {/* Checklist */}
      <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-xl p-3 mb-4">
        <div className="text-[10px] font-bold text-[#0369A1] mb-2">Your Verification Checklist</div>
        {["ID document matches name on profile","Licence number is valid and not expired","Selfie matches ID photo clearly","No red flags or suspicious information"].map(item => (
          <label key={item} className="flex items-center gap-2 text-xs text-[#475569] mb-1.5 cursor-pointer">
            <input type="checkbox" className="accent-[#0ea5e9] w-3.5 h-3.5 rounded" />
            {item}
          </label>
        ))}
      </div>

      {/* Agent note */}
      <div className="mb-4">
        <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#94B0C4] block mb-1">Agent Note (optional)</label>
        <textarea className="w-full bg-[#f7fbff] border border-[#D4E8F5] rounded-xl px-3 py-2 text-xs text-[#0C1A2E] outline-none focus:border-[#0ea5e9] resize-none h-14 placeholder:text-gray-300" placeholder="Add a note if rejecting or flagging..." />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button onClick={onApprove} className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-emerald-100 transition-all active:scale-[0.97]">
          <ThumbsUp className="w-3.5 h-3.5" /> Approve Profile
        </button>
        <button onClick={onReject} className="flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-700 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-red-100 transition-all active:scale-[0.97]">
          <ThumbsDown className="w-3.5 h-3.5" /> Reject
        </button>
        <button onClick={onFlag} className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-amber-100 transition-all active:scale-[0.97]">
          <Flag className="w-3.5 h-3.5" /> Flag for Review
        </button>
        <button onClick={onSkip} className="flex items-center gap-1.5 bg-white border border-sky-100 text-[#0ea5e9] font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-sky-50 transition-all active:scale-[0.97]">
          <SkipForward className="w-3.5 h-3.5" /> Skip
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//   MAIN COMPONENT
// ══════════════════════════════════════════════════════════════
export default function OurAgentsPage() {
  const [page, setPage] = useState<Page>("landing");
  const [section, setSection] = useState<Section>("overview");
  const [regStep, setRegStep]   = useState(1);
  const [regDone, setRegDone]   = useState(false);
  const [toast, setToast]       = useState({ show: false, msg: "" });

  // Register form state
  const [langs, setLangs]       = useState<string[]>(["English"]);
  const allLangs = ["English","Hindi","Marathi","Tamil","Telugu","Kannada","Bengali","Gujarati"];

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2800);
  };

  const switchSection = (s: Section) => {
    setSection(s);
    // Update active sidebar
    document.querySelectorAll("[data-si]").forEach(el => el.classList.remove("si-active"));
  };

  // ── LANDING PAGE ────────────────────────────────────────────
  if (page === "landing") return (
    <div className="bg-[#f7fbff] min-h-screen text-[#1a3347] font-sans">

      {/* Toast */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0c1a2e] text-white px-6 py-3 rounded-full text-xs font-bold z-[999] shadow-xl transition-all duration-300 ${toast.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
        {toast.msg}
      </div>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0c1a2e] via-[#0f2a40] to-[#0369a1]">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1800&h=700&fit=crop&q=90" alt="Team" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="absolute top-10 right-1/4 w-72 h-72 bg-[#0ea5e9] rounded-full opacity-[0.07] blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-5 py-2 text-xs font-bold text-emerald-300 mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Now Hiring · 200+ Agents Active · Earn from Home
              </div>
              <h1 className="font-sora font-extrabold text-4xl sm:text-5xl md:text-6xl text-white leading-[1.07] mb-5 tracking-tight">
                Become a<br />
                Visara Agent.<br />
                <span className="bg-gradient-to-r from-[#38bdf8] to-[#7dd3fc] bg-clip-text text-transparent">
                  Verify. Earn. Grow.
                </span>
              </h1>
              <p className="text-white/55 text-base md:text-lg max-w-lg leading-relaxed mb-8 font-medium">
                Join as a freelance agent — verify expert profiles, review packages, and earn commission on every approval. Work from anywhere, anytime.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <button onClick={() => setPage("register")} className="bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white font-bold px-7 py-4 rounded-2xl text-sm shadow-lg shadow-[#0ea5e9]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
                  Register as Agent <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => setPage("dashboard")} className="bg-white/10 border border-white/20 text-white font-bold px-7 py-4 rounded-2xl text-sm hover:bg-white/20 transition-all backdrop-blur flex items-center gap-2">
                  Agent Login
                </button>
              </div>

              <div className="flex flex-wrap gap-5">
                {["Free to join","No target pressure","Weekly payouts","Work from home"].map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-white/60 font-semibold">
                    <CheckCircle className="w-4 h-4 text-emerald-400" /> {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Right – Earnings preview */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-3xl border border-sky-100 p-6 shadow-2xl shadow-[#0c1a2e]/30">
                <div className="font-sora font-bold text-base text-[#0c1a2e] mb-5 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-500" /> Agent Earnings — This Month
                </div>
                {[
                  { label: "Expert profiles verified", value: "12" },
                  { label: "Packages reviewed",        value: "28" },
                  { label: "Job listings verified",    value: "45" },
                  { label: "Approvals this month",     value: "34" },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between py-2.5 border-b border-sky-50 text-sm">
                    <span className="text-[#475569]">{row.label}</span>
                    <span className="font-sora font-bold text-[#0c1a2e]">{row.value}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-4 mt-2 border-t-2 border-sky-100">
                  <span className="font-bold text-[#0c1a2e] text-sm">Total Earned</span>
                  <span className="font-sora font-extrabold text-2xl text-emerald-600">₹18,400</span>
                </div>
                <div className="bg-sky-50 border border-sky-100 rounded-2xl p-3 mt-4 text-xs text-[#475569]">
                  🏆 <strong className="text-[#0c1a2e]">Riya M., Pune</strong> — Top agent this month. Average ₹15,000–₹35,000/month.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden z-10">
          <svg className="block w-full" height="36" viewBox="0 0 1440 36" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,36 L1440,36 L1440,0 C1080,36 360,0 0,18 Z" fill="#f7fbff" />
          </svg>
        </div>
      </section>

      {/* ── STAT STRIP ── */}
      <div className="bg-white border-b border-sky-100">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-wrap justify-around gap-4">
          {[
            { value: "200+",    label: "Active agents"       },
            { value: "₹35,000", label: "Max monthly earning" },
            { value: "Weekly",  label: "Payout schedule"     },
            { value: "4.8★",    label: "Agent satisfaction"  },
          ].map(s => (
            <div key={s.label} className="text-center px-6 py-2">
              <div className="font-sora font-extrabold text-2xl text-[#0ea5e9]">{s.value}</div>
              <div className="text-xs text-[#475569] font-semibold mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14 space-y-16">

        {/* ── WHAT AGENTS DO ── */}
        <div>
          <span className="text-[11px] font-extrabold text-[#0ea5e9] uppercase tracking-widest block mb-2">Your Role</span>
          <h2 className="font-sora font-extrabold text-[#0c1a2e] text-2xl mb-2">What Does a Visara Agent Do?</h2>
          <p className="text-sm text-[#475569] mb-8">Agents are the quality backbone of Visara — they verify everything before it goes live.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {perks.map(p => (
              <div key={p.title} className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                <div className={`w-14 h-14 ${p.bg} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4`}>{p.emoji}</div>
                <div className="font-sora font-bold text-sm text-[#0c1a2e] mb-2">{p.title}</div>
                <p className="text-xs text-[#475569] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── COMMISSION TABLE ── */}
        <div>
          <span className="text-[11px] font-extrabold text-[#0ea5e9] uppercase tracking-widest block mb-2">Earnings</span>
          <h2 className="font-sora font-extrabold text-[#0c1a2e] text-2xl mb-2">How Much Do You Earn?</h2>
          <p className="text-sm text-[#475569] mb-6">Fixed commission per verified item — paid every week to your bank account or UPI.</p>
          <div className="bg-white border border-sky-100 rounded-2xl overflow-hidden shadow-sm">
            {/* Table header */}
            <div className="grid grid-cols-12 bg-[#0ea5e9] px-5 py-3 text-[11px] font-bold text-white uppercase tracking-wider">
              <div className="col-span-5">What You Verify</div>
              <div className="col-span-2">Commission</div>
              <div className="col-span-3">Avg per Day</div>
              <div className="col-span-2">Monthly</div>
            </div>
            {commissions.map((row, i) => (
              <div key={i} className={`grid grid-cols-12 px-5 py-4 text-sm border-b border-sky-50 items-center ${i % 2 === 1 ? "bg-[#f7fbff]" : "bg-white"}`}>
                <div className="col-span-5 font-semibold text-[#0c1a2e] text-xs md:text-sm">{row.action}</div>
                <div className="col-span-2 font-bold text-emerald-600 text-xs md:text-sm">{row.rate}</div>
                <div className="col-span-3 text-[#475569] text-xs">{row.avg}</div>
                <div className="col-span-2 font-sora font-bold text-[#0ea5e9] text-xs md:text-sm">{row.monthly}</div>
              </div>
            ))}
            <div className="grid grid-cols-12 px-5 py-4 bg-gradient-to-r from-sky-50 to-white border-t-2 border-sky-200 items-center">
              <div className="col-span-5 font-bold text-[#0c1a2e] text-sm">🏆 Total Monthly (all combined)</div>
              <div className="col-span-2 font-bold text-emerald-600 text-xs">Variable</div>
              <div className="col-span-3 text-[#475569] text-xs">Work your pace</div>
              <div className="col-span-2 font-sora font-extrabold text-[#0ea5e9] text-sm">₹15K–₹35K</div>
            </div>
          </div>
        </div>

        {/* ── HOW TO JOIN ── */}
        <div>
          <span className="text-[11px] font-extrabold text-[#0ea5e9] uppercase tracking-widest block mb-2">Join Process</span>
          <h2 className="font-sora font-extrabold text-[#0c1a2e] text-2xl mb-2">How to Become an Agent</h2>
          <p className="text-sm text-[#475569] mb-8">Simple 4-step process — approved within 48 hours.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {joinSteps.map((s, i) => (
              <div key={s.num} className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] text-white font-sora font-bold text-base flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                  {s.num}
                </div>
                <div className="text-2xl mb-3">{s.emoji}</div>
                <div className="font-sora font-bold text-sm text-[#0c1a2e] mb-2">{s.title}</div>
                <p className="text-xs text-[#475569] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA BANNER ── */}
        <div className="bg-gradient-to-r from-[#0ea5e9] via-[#0284c7] to-[#0369a1] rounded-3xl p-10 text-center shadow-2xl shadow-sky-200">
          <Users className="w-10 h-10 text-white/50 mx-auto mb-4" />
          <h2 className="font-sora font-extrabold text-white text-3xl mb-3">Ready to Join the Visara Agent Network?</h2>
          <p className="text-white/70 text-sm max-w-md mx-auto mb-8">Free to join · Work from home · Get paid weekly</p>
          <button
            onClick={() => setPage("register")}
            className="bg-white text-[#0ea5e9] font-sora font-bold px-8 py-4 rounded-2xl text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 mx-auto"
          >
            Register as Agent Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  // ── REGISTER PAGE ───────────────────────────────────────────
  if (page === "register") {
    if (regDone) return (
      <div className="bg-[#f7fbff] min-h-screen flex items-center justify-center px-4">
        <div className="bg-white border border-sky-100 rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <PartyPopper className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="font-sora font-extrabold text-2xl text-[#0c1a2e] mb-2">Application Submitted! 🎉</h2>
          <p className="text-sm text-[#475569] mb-2">Your agent application is under review.</p>
          <p className="text-xs text-[#94B0C4] mb-7">We'll notify you via WhatsApp & email within 48 hours once verified.</p>
          <div className="space-y-3">
            <button onClick={() => { setRegDone(false); setPage("dashboard"); }} className="w-full bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white font-bold py-3.5 rounded-2xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
              Go to Agent Dashboard <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => { setRegDone(false); setPage("landing"); }} className="w-full bg-white border border-sky-100 text-[#0ea5e9] font-bold py-3 rounded-2xl text-sm hover:bg-sky-50 transition-all">
              Back to Homepage
            </button>
          </div>
        </div>
      </div>
    );

    const regSteps = ["Personal Info","Availability & Skills","KYC Upload","Bank Details"];
    return (
      <div className="bg-[#f7fbff] min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0c1a2e] to-[#0f2a40] border-b border-sky-900 py-5 px-6">
          <div className="max-w-2xl mx-auto">
            <button onClick={() => setPage("landing")} className="text-xs text-white/50 hover:text-white/80 font-semibold mb-3 flex items-center gap-1.5 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <span className="text-[11px] font-extrabold text-[#38bdf8] uppercase tracking-widest block mb-1">Agent Registration</span>
            <h2 className="font-sora font-extrabold text-white text-2xl mb-1">Create Your Agent Account</h2>
            <p className="text-white/50 text-sm">Takes 5 minutes · Approved within 48 hours</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-8">
          {/* Progress */}
          <div className="flex items-center mb-8">
            {regSteps.map((label, i) => (
              <div key={label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    regStep > i + 1 ? "bg-[#0ea5e9] text-white" :
                    regStep === i + 1 ? "bg-white border-2 border-[#0ea5e9] text-[#0ea5e9] shadow-md shadow-sky-100" :
                    "bg-white border border-sky-100 text-[#94B0C4]"
                  }`}>
                    {regStep > i + 1 ? <CheckCircle className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-[10px] font-bold mt-1 text-center leading-tight hidden sm:block ${regStep >= i + 1 ? "text-[#0ea5e9]" : "text-[#94B0C4]"}`}>
                    {label.split(" ").map((w,wi) => <span key={wi} className="block">{w}</span>)}
                  </span>
                </div>
                {i < regSteps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 mt-[-14px] ${regStep > i + 1 ? "bg-[#0ea5e9]" : "bg-sky-100"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="bg-white border border-sky-100 rounded-2xl p-7 shadow-sm">
            {regStep === 1 && (
              <div>
                <h3 className="font-sora font-bold text-lg text-[#0c1a2e] mb-5">Step 1 — Personal Information</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div><label className="text-[10px] font-extrabold uppercase tracking-wider text-[#94B0C4] block mb-1.5">First Name</label>
                    <input className="w-full bg-[#f7fbff] border border-sky-100 rounded-xl px-3.5 py-2.5 text-sm text-[#0c1a2e] outline-none focus:border-[#0ea5e9] transition-all" placeholder="Riya" /></div>
                  <div><label className="text-[10px] font-extrabold uppercase tracking-wider text-[#94B0C4] block mb-1.5">Last Name</label>
                    <input className="w-full bg-[#f7fbff] border border-sky-100 rounded-xl px-3.5 py-2.5 text-sm text-[#0c1a2e] outline-none focus:border-[#0ea5e9] transition-all" placeholder="Mehta" /></div>
                </div>
                <div className="mb-4"><label className="text-[10px] font-extrabold uppercase tracking-wider text-[#94B0C4] block mb-1.5">Email Address</label>
                  <input type="email" className="w-full bg-[#f7fbff] border border-sky-100 rounded-xl px-3.5 py-2.5 text-sm text-[#0c1a2e] outline-none focus:border-[#0ea5e9] transition-all" placeholder="riya@email.com" /></div>
                <div className="mb-4"><label className="text-[10px] font-extrabold uppercase tracking-wider text-[#94B0C4] block mb-1.5">Mobile Number</label>
                  <input className="w-full bg-[#f7fbff] border border-sky-100 rounded-xl px-3.5 py-2.5 text-sm text-[#0c1a2e] outline-none focus:border-[#0ea5e9] transition-all" placeholder="+91 98765 43210" /></div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div><label className="text-[10px] font-extrabold uppercase tracking-wider text-[#94B0C4] block mb-1.5">City</label>
                    <input className="w-full bg-[#f7fbff] border border-sky-100 rounded-xl px-3.5 py-2.5 text-sm text-[#0c1a2e] outline-none focus:border-[#0ea5e9] transition-all" placeholder="Pune" /></div>
                  <div><label className="text-[10px] font-extrabold uppercase tracking-wider text-[#94B0C4] block mb-1.5">State</label>
                    <select className="w-full bg-[#f7fbff] border border-sky-100 rounded-xl px-3.5 py-2.5 text-sm text-[#0c1a2e] outline-none focus:border-[#0ea5e9] transition-all appearance-none cursor-pointer">
                      <option>Select state</option>
                      {["Maharashtra","Delhi","Karnataka","Tamil Nadu","Gujarat","Rajasthan","Uttar Pradesh","West Bengal","Telangana"].map(s => <option key={s}>{s}</option>)}
                    </select></div>
                </div>
                <div className="mb-4">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#94B0C4] block mb-2">Languages Known</label>
                  <div className="flex flex-wrap gap-2">
                    {allLangs.map(l => (
                      <button key={l} type="button" onClick={() => setLangs(prev => prev.includes(l) ? prev.filter(x => x !== l) : [...prev, l])}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${langs.includes(l) ? "bg-[#0ea5e9] text-white border-[#0ea5e9]" : "bg-white text-[#475569] border-sky-100 hover:border-sky-200"}`}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4"><label className="text-[10px] font-extrabold uppercase tracking-wider text-[#94B0C4] block mb-1.5">Why do you want to become a Visara Agent?</label>
                  <textarea className="w-full bg-[#f7fbff] border border-sky-100 rounded-xl px-3.5 py-2.5 text-sm text-[#0c1a2e] outline-none focus:border-[#0ea5e9] transition-all resize-none h-24 placeholder:text-gray-300" placeholder="Tell us a bit about yourself and why you'd be a great agent…" /></div>
              </div>
            )}

            {regStep === 2 && (
              <div>
                <h3 className="font-sora font-bold text-lg text-[#0c1a2e] mb-5">Step 2 — Availability & Skills</h3>
                <div className="mb-4"><label className="text-[10px] font-extrabold uppercase tracking-wider text-[#94B0C4] block mb-1.5">Available Hours Per Day</label>
                  <select className="w-full bg-[#f7fbff] border border-sky-100 rounded-xl px-3.5 py-2.5 text-sm text-[#0c1a2e] outline-none focus:border-[#0ea5e9] appearance-none cursor-pointer">
                    {["1–2 hours","2–4 hours","4–6 hours","Full-time (6+ hours)"].map(o => <option key={o}>{o}</option>)}
                  </select></div>
                <div className="mb-4">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#94B0C4] block mb-2">Verification Categories (select all you can handle)</label>
                  <div className="space-y-2">
                    {["Expert Profiles (Consultant / Lawyer)","Tour & Holiday Packages","Overseas Job Listings","Exhibition & Event Listings","IELTS / Training Institutes"].map(cat => (
                      <label key={cat} className="flex items-center gap-3 bg-[#f7fbff] border border-sky-100 rounded-xl px-4 py-3 cursor-pointer hover:border-[#0ea5e9] transition-all">
                        <input type="checkbox" className="accent-[#0ea5e9] w-4 h-4" defaultChecked />
                        <span className="text-sm font-semibold text-[#0c1a2e]">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="mb-4"><label className="text-[10px] font-extrabold uppercase tracking-wider text-[#94B0C4] block mb-1.5">Previous Experience (if any)</label>
                  <textarea className="w-full bg-[#f7fbff] border border-sky-100 rounded-xl px-3.5 py-2.5 text-sm text-[#0c1a2e] outline-none focus:border-[#0ea5e9] resize-none h-20 placeholder:text-gray-300" placeholder="e.g., worked as a data entry operator, content moderator, etc." /></div>
              </div>
            )}

            {regStep === 3 && (
              <div>
                <h3 className="font-sora font-bold text-lg text-[#0c1a2e] mb-2">Step 3 — KYC Upload</h3>
                <p className="text-xs text-[#475569] mb-6">Your documents are encrypted and used only for agent verification and payout setup.</p>
                <div className="space-y-4">
                  {[
                    { label: "Government ID (Aadhar / PAN)", note: "Accepted: Aadhar Card, PAN Card, Passport — PDF, JPG, PNG (max 5MB)" },
                    { label: "Selfie with ID (KYC)", note: "Hold your ID next to your face clearly — JPG, PNG (max 5MB)" },
                  ].map(doc => (
                    <div key={doc.label}>
                      <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#94B0C4] block mb-2">{doc.label}</label>
                      <div className="border-2 border-dashed border-sky-200 rounded-2xl p-8 text-center bg-sky-50/30 hover:bg-sky-50 transition-colors cursor-pointer">
                        <div className="text-3xl mb-2">📎</div>
                        <p className="text-sm font-semibold text-[#0c1a2e] mb-1">Drop file here or click to browse</p>
                        <p className="text-xs text-[#94B0C4]">{doc.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mt-4 flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-emerald-700 font-medium leading-relaxed">Your documents are 256-bit encrypted and never shared with third parties. Used only for KYC verification and UPI payout setup.</p>
                </div>
              </div>
            )}

            {regStep === 4 && (
              <div>
                <h3 className="font-sora font-bold text-lg text-[#0c1a2e] mb-5">Step 4 — Bank / UPI Details</h3>
                <div className="mb-4"><label className="text-[10px] font-extrabold uppercase tracking-wider text-[#94B0C4] block mb-1.5">UPI ID</label>
                  <input className="w-full bg-[#f7fbff] border border-sky-100 rounded-xl px-3.5 py-2.5 text-sm text-[#0c1a2e] outline-none focus:border-[#0ea5e9] transition-all" placeholder="yourname@upi" /></div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div><label className="text-[10px] font-extrabold uppercase tracking-wider text-[#94B0C4] block mb-1.5">Bank Account Number</label>
                    <input className="w-full bg-[#f7fbff] border border-sky-100 rounded-xl px-3.5 py-2.5 text-sm text-[#0c1a2e] outline-none focus:border-[#0ea5e9] transition-all" placeholder="XXXX XXXX XXXX" /></div>
                  <div><label className="text-[10px] font-extrabold uppercase tracking-wider text-[#94B0C4] block mb-1.5">IFSC Code</label>
                    <input className="w-full bg-[#f7fbff] border border-sky-100 rounded-xl px-3.5 py-2.5 text-sm text-[#0c1a2e] outline-none focus:border-[#0ea5e9] transition-all" placeholder="e.g. SBIN0001234" /></div>
                </div>
                <div className="mb-4"><label className="text-[10px] font-extrabold uppercase tracking-wider text-[#94B0C4] block mb-1.5">Account Holder Name</label>
                  <input className="w-full bg-[#f7fbff] border border-sky-100 rounded-xl px-3.5 py-2.5 text-sm text-[#0c1a2e] outline-none focus:border-[#0ea5e9] transition-all" placeholder="Riya Mehta" /></div>
                <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-2xl p-4">
                  <h4 className="text-xs font-bold text-[#0369a1] mb-2">💸 Payout Schedule</h4>
                  <p className="text-xs text-[#475569] leading-relaxed">Earnings are paid out every <strong>Monday</strong> for the previous week's verified items. Minimum payout threshold: ₹500. Direct NEFT / UPI transfer.</p>
                </div>
              </div>
            )}

            {/* Nav buttons */}
            <div className="flex items-center justify-between mt-7 pt-5 border-t border-sky-50">
              {regStep > 1
                ? <button onClick={() => setRegStep(regStep - 1)} className="flex items-center gap-2 text-sm font-semibold text-[#475569] hover:text-[#0c1a2e] transition-colors"><ArrowLeft className="w-4 h-4" /> Back</button>
                : <button onClick={() => setPage("landing")} className="flex items-center gap-2 text-sm font-semibold text-[#475569] hover:text-[#0c1a2e] transition-colors"><ArrowLeft className="w-4 h-4" /> Back</button>
              }
              {regStep < 4
                ? <button onClick={() => setRegStep(regStep + 1)} className="bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.97] flex items-center gap-2">
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                : <button onClick={() => setRegDone(true)} className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.97] flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Submit Application
                  </button>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── DASHBOARD ───────────────────────────────────────────────
  return (
    <div className="bg-[#f7fbff] min-h-screen text-[#1a3347] font-sans">

      {/* Toast */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0c1a2e] text-white px-6 py-3 rounded-full text-xs font-bold z-[999] shadow-xl transition-all duration-300 ${toast.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
        {toast.msg}
      </div>

      {/* Top bar */}
      <div className="bg-white border-b border-sky-100 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-40">
        <div className="font-sora font-extrabold text-lg text-[#0c1a2e] flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          Visara <span className="text-[#0ea5e9]">·</span>
          <span className="text-sm font-medium text-[#94B0C4]">Agent Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer" onClick={() => setSection("notifications")}>
            <Bell className="w-5 h-5 text-[#475569]" />
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-4 h-4 text-[9px] font-bold flex items-center justify-center">5</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#38bdf8] to-[#0284c7] flex items-center justify-center text-white font-bold text-sm cursor-pointer shadow-md">RM</div>
        </div>
      </div>

      <div className="flex" style={{ minHeight: "calc(100vh - 65px)" }}>

        {/* Sidebar */}
        <aside className="w-60 bg-white border-r border-sky-100 shrink-0 hidden lg:flex flex-col">
          {/* Agent info */}
          <div className="p-5 border-b border-sky-50">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#38bdf8] to-[#0284c7] flex items-center justify-center text-white font-bold shadow-md">RM</div>
              <div>
                <div className="font-sora font-bold text-sm text-[#0c1a2e]">Riya Mehta</div>
                <div className="text-[10px] text-[#475569]">Visara Agent · Pune</div>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full px-2 py-0.5 text-[9px] font-bold mt-0.5">
                  <BadgeCheck className="w-2.5 h-2.5" /> Verified
                </span>
              </div>
            </div>
          </div>

          {/* Nav items */}
          <nav className="flex-1 py-3 overflow-y-auto">
            <div className="px-4 py-2 text-[9px] font-extrabold text-[#94B0C4] uppercase tracking-widest">Main</div>
            {sidebarLinks.slice(0,5).map(link => (
              <button key={link.section} onClick={() => setSection(link.section)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all text-left border-l-2 ${section === link.section ? "bg-sky-50 text-[#0ea5e9] border-[#0ea5e9]" : "text-[#475569] border-transparent hover:bg-sky-50/50 hover:text-[#0ea5e9]"}`}>
                <span className="text-base">{link.emoji}</span>
                <span className="flex-1">{link.label}</span>
                {link.badge && <span className={`${link.badgeColor} text-white rounded-full px-2 py-0.5 text-[9px] font-bold`}>{link.badge}</span>}
              </button>
            ))}

            <div className="px-4 py-2 mt-2 text-[9px] font-extrabold text-[#94B0C4] uppercase tracking-widest">Earnings</div>
            {sidebarLinks.slice(5,7).map(link => (
              <button key={link.section} onClick={() => setSection(link.section)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all text-left border-l-2 ${section === link.section ? "bg-sky-50 text-[#0ea5e9] border-[#0ea5e9]" : "text-[#475569] border-transparent hover:bg-sky-50/50 hover:text-[#0ea5e9]"}`}>
                <span className="text-base">{link.emoji}</span>
                <span className="flex-1">{link.label}</span>
              </button>
            ))}

            <div className="px-4 py-2 mt-2 text-[9px] font-extrabold text-[#94B0C4] uppercase tracking-widest">Account</div>
            {sidebarLinks.slice(7).map(link => (
              <button key={link.section} onClick={() => setSection(link.section)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all text-left border-l-2 ${section === link.section ? "bg-sky-50 text-[#0ea5e9] border-[#0ea5e9]" : "text-[#475569] border-transparent hover:bg-sky-50/50 hover:text-[#0ea5e9]"}`}>
                <span className="text-base">{link.emoji}</span>
                <span className="flex-1">{link.label}</span>
                {link.badge && <span className={`${link.badgeColor} text-white rounded-full px-2 py-0.5 text-[9px] font-bold`}>{link.badge}</span>}
              </button>
            ))}

            <button onClick={() => setPage("landing")}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#475569] border-l-2 border-transparent hover:bg-red-50/50 hover:text-red-500 transition-all text-left mt-2">
              <LogOut className="w-4 h-4" /><span>Logout</span>
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">

          {/* ── OVERVIEW ── */}
          {section === "overview" && (
            <div>
              <h2 className="font-sora font-extrabold text-xl text-[#0c1a2e] mb-1">Good morning, Riya 👋</h2>
              <p className="text-sm text-[#475569] mb-6">You have <strong className="text-red-500">28 pending verifications</strong> waiting for you.</p>

              {/* Stat cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Total Verified", value: "156",     sub: "This month", color: "after:bg-[#0ea5e9]", icon: "📋" },
                  { label: "Earned",         value: "₹18,400", sub: "This month", color: "after:bg-emerald-500", icon: "💰" },
                  { label: "Pending",        value: "28",      sub: "Awaiting review", color: "after:bg-amber-500", icon: "⏳" },
                  { label: "Agent Rank",     value: "#4",      sub: "Out of 200 agents", color: "after:bg-violet-500", icon: "🏆" },
                ].map(card => (
                  <div key={card.label} className={`bg-white border border-sky-100 rounded-2xl p-5 shadow-sm relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 ${card.color}`}>
                    <div className="absolute top-4 right-4 text-xl opacity-70">{card.icon}</div>
                    <div className="text-[10px] font-extrabold text-[#94B0C4] uppercase tracking-wider mb-1">{card.label}</div>
                    <div className="font-sora font-extrabold text-2xl text-[#0c1a2e] mb-0.5">{card.value}</div>
                    <div className="text-xs text-[#475569]">{card.sub}</div>
                  </div>
                ))}
              </div>

              {/* Pending queue */}
              <h3 className="font-sora font-bold text-base text-[#0c1a2e] mb-4">Pending Verifications — Priority Queue</h3>
              <div className="space-y-3 mb-6">
                {[
                  { emoji:"🧑‍💼", label:"8 Expert Profiles waiting",  desc:"Consultants, lawyers and IELTS trainers — KYC and licence verification needed", earn:"₹1,200 potential", section:"verify-experts" as Section },
                  { emoji:"📦",   label:"12 Tour Packages waiting",   desc:"Holiday packages, cruise listings and sport tour packages — accuracy and fraud check", earn:"₹960 potential", section:"verify-packages" as Section },
                  { emoji:"💼",   label:"5 Job Listings waiting",     desc:"Overseas job postings — verify employer, visa sponsorship claims and salary accuracy", earn:"₹250 potential", section:"verify-jobs" as Section },
                  { emoji:"🎭",   label:"3 Event Listings waiting",   desc:"Exhibitions and university fairs — verify dates, venue, organiser details", earn:"₹300 potential", section:"verify-events" as Section },
                ].map(item => (
                  <div key={item.label} onClick={() => setSection(item.section)}
                    className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-4 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 items-center">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-xl shrink-0">{item.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-[#0c1a2e] mb-0.5">{item.label}</div>
                      <div className="text-xs text-[#475569]">{item.desc}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-sora font-bold text-emerald-600 text-xs mb-1">{item.earn}</div>
                      <button className="bg-amber-500 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg hover:bg-amber-600 transition-colors">Review Now →</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent activity */}
              <h3 className="font-sora font-bold text-base text-[#0c1a2e] mb-4">Recent Activity</h3>
              <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-sm space-y-3">
                {[
                  { icon:"✅", bg:"bg-emerald-50", label:"Approved — Arjun Mehta (Immigration Lawyer, Canada)", earn:"+₹150", time:"2 hrs ago" },
                  { icon:"❌", bg:"bg-red-50",     label:"Rejected — Dubai 7N Package (incorrect visa claim)",  earn:"+₹80",  time:"4 hrs ago" },
                  { icon:"✅", bg:"bg-emerald-50", label:"Approved — Amazon Canada Warehouse Job",              earn:"+₹50",  time:"Yesterday" },
                ].map(a => (
                  <div key={a.label} className={`${a.bg} rounded-xl p-3 flex items-center gap-3`}>
                    <div className="text-base shrink-0">{a.icon}</div>
                    <div className="flex-1 text-xs text-[#475569] font-medium">{a.label}</div>
                    <div className="text-right text-xs text-[#94B0C4] font-bold shrink-0">
                      <div className="text-emerald-600 font-bold">{a.earn}</div>
                      <div>{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── VERIFY EXPERTS ── */}
          {section === "verify-experts" && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-sora font-extrabold text-xl text-[#0c1a2e]">Verify Expert Profiles</h2>
                  <p className="text-sm text-[#475569]">8 pending · ₹150 per verified profile</p>
                </div>
                <span className="bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-3 py-1 text-xs font-bold">8 pending</span>
              </div>
              <VerifyCard
                initials="PS" gradient="bg-gradient-to-br from-[#38bdf8] to-[#0284c7]"
                name="Priya Sharma" type="Immigration Consultant · Applies to list on Visara"
                location="Mumbai" exp="8 yrs experience" badge="🎓 Student Visa · PR"
                earn="+₹150" earnLabel="on approval"
                desc={`"I am a certified RCIC with 8 years of experience helping Indian students apply to Canadian universities. I have helped 400+ clients get their study permits."`}
                documents={[{icon:"🪪",label:"Government ID (Aadhar)"},{icon:"📋",label:"RCIC Licence — R706842"},{icon:"🤳",label:"Selfie with ID (KYC)"}]}
                onApprove={() => showToast("✅ Priya Sharma Approved! +₹150 added to earnings")}
                onReject={() => showToast("❌ Rejected — notified applicant")}
                onFlag={() => showToast("🚩 Flagged for senior review")}
                onSkip={() => showToast("⏭️ Skipped — will come back later")}
              />
              <VerifyCard
                initials="AM" gradient="bg-gradient-to-br from-[#A78BFA] to-[#7C3AED]"
                name="Aryan Mathur" type="IELTS Training Institute · Applies to list on Visara"
                location="Delhi" exp="Institute since 2018" badge="📚 IELTS · PTE"
                earn="+₹120" earnLabel="on approval"
                desc={`"Aryan's IELTS Academy has trained 2,000+ students since 2018. We offer classroom and online batches with a 95% band 7+ success rate."`}
                documents={[{icon:"🏛️",label:"Institute Registration Certificate"},{icon:"🪪",label:"Director Aadhar / PAN"},{icon:"📷",label:"Institute photos & brochure"}]}
                onApprove={() => showToast("✅ Aryan Mathur Approved! +₹120 added to earnings")}
                onReject={() => showToast("❌ Rejected — notified applicant")}
                onFlag={() => showToast("🚩 Flagged for senior review")}
                onSkip={() => showToast("⏭️ Skipped")}
              />
            </div>
          )}

          {/* ── VERIFY PACKAGES ── */}
          {section === "verify-packages" && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-sora font-extrabold text-xl text-[#0c1a2e]">Verify Tour Packages</h2>
                  <p className="text-sm text-[#475569]">12 pending · ₹80 per verified package</p>
                </div>
                <span className="bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-3 py-1 text-xs font-bold">12 pending</span>
              </div>
              {[
                { name:"Bali Paradise 5D/4N", agency:"SunTours India", price:"₹28,999/person", issue:"Visa claim needs verification", img:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=120&h=80&fit=crop" },
                { name:"Dubai City + Desert Safari 7N", agency:"GulfTrips Pvt Ltd", price:"₹55,000/person", issue:"Hotel star rating mismatch", img:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=120&h=80&fit=crop" },
              ].map(pkg => (
                <div key={pkg.name} className="bg-white border border-sky-100 rounded-2xl p-5 shadow-sm mb-4 hover:shadow-lg transition-all duration-200">
                  <div className="flex gap-4 mb-4">
                    <img src={pkg.img} alt={pkg.name} className="w-20 h-14 rounded-xl object-cover border border-sky-100" />
                    <div className="flex-1">
                      <div className="font-sora font-bold text-sm text-[#0c1a2e] mb-0.5">{pkg.name}</div>
                      <div className="text-xs text-[#475569]">by {pkg.agency}</div>
                      <div className="font-bold text-[#0ea5e9] text-sm mt-1">{pkg.price}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded-lg text-[10px] font-bold">⚠️ {pkg.issue}</span>
                      <div className="font-sora font-bold text-emerald-600 text-xs mt-2">+₹80 on approval</div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={() => showToast(`✅ ${pkg.name} Approved! +₹80`)} className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs px-4 py-2 rounded-xl hover:bg-emerald-100 transition-all active:scale-[0.97]"><ThumbsUp className="w-3 h-3" /> Approve</button>
                    <button onClick={() => showToast("❌ Package rejected")} className="flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-700 font-bold text-xs px-4 py-2 rounded-xl hover:bg-red-100 transition-all active:scale-[0.97]"><ThumbsDown className="w-3 h-3" /> Reject</button>
                    <button onClick={() => showToast("🚩 Flagged for review")} className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs px-4 py-2 rounded-xl hover:bg-amber-100 transition-all active:scale-[0.97]"><Flag className="w-3 h-3" /> Flag</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── VERIFY JOBS ── */}
          {section === "verify-jobs" && (
            <div>
              <h2 className="font-sora font-extrabold text-xl text-[#0c1a2e] mb-1">Verify Job Listings</h2>
              <p className="text-sm text-[#475569] mb-5">5 pending · ₹50 per verified listing</p>
              {["Amazon Canada Warehouse Staff","Senior Software Engineer — Toronto","Registered Nurse — Dubai Hospital"].map(job => (
                <div key={job} className="bg-white border border-sky-100 rounded-2xl p-5 shadow-sm mb-3 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-lg">💼</div>
                    <div className="flex-1">
                      <div className="font-sora font-bold text-sm text-[#0c1a2e]">{job}</div>
                      <div className="text-xs text-[#475569]">Verify: employer legitimacy · visa claim · salary accuracy</div>
                    </div>
                    <div className="font-sora font-bold text-emerald-600 text-xs shrink-0">+₹50</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => showToast(`✅ Job approved! +₹50`)} className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs px-3 py-2 rounded-xl hover:bg-emerald-100 transition-all active:scale-[0.97]"><ThumbsUp className="w-3 h-3" /> Approve</button>
                    <button onClick={() => showToast("❌ Rejected")} className="flex items-center gap-1 bg-red-50 border border-red-200 text-red-700 font-bold text-xs px-3 py-2 rounded-xl hover:bg-red-100 transition-all active:scale-[0.97]"><ThumbsDown className="w-3 h-3" /> Reject</button>
                    <button onClick={() => showToast("🚩 Flagged")} className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs px-3 py-2 rounded-xl hover:bg-amber-100 transition-all active:scale-[0.97]"><Flag className="w-3 h-3" /> Flag</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── VERIFY EVENTS ── */}
          {section === "verify-events" && (
            <div>
              <h2 className="font-sora font-extrabold text-xl text-[#0c1a2e] mb-1">Verify Events & Exhibitions</h2>
              <p className="text-sm text-[#475569] mb-5">3 pending · ₹100 per verified event</p>
              {["GITEX Tech Expo 2025 — Dubai","Canada Education Fair — Mumbai","Germany Trade Show 2025 — Frankfurt"].map(ev => (
                <div key={ev} className="bg-white border border-sky-100 rounded-2xl p-5 shadow-sm mb-3 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-lg">🎭</div>
                    <div className="flex-1">
                      <div className="font-sora font-bold text-sm text-[#0c1a2e]">{ev}</div>
                      <div className="text-xs text-[#475569]">Verify: dates · venue · organiser · entry requirements</div>
                    </div>
                    <div className="font-sora font-bold text-emerald-600 text-xs shrink-0">+₹100</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => showToast(`✅ Event approved! +₹100`)} className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs px-3 py-2 rounded-xl hover:bg-emerald-100 transition-all active:scale-[0.97]"><ThumbsUp className="w-3 h-3" /> Approve</button>
                    <button onClick={() => showToast("❌ Rejected")} className="flex items-center gap-1 bg-red-50 border border-red-200 text-red-700 font-bold text-xs px-3 py-2 rounded-xl hover:bg-red-100 transition-all active:scale-[0.97]"><ThumbsDown className="w-3 h-3" /> Reject</button>
                    <button onClick={() => showToast("🚩 Flagged")} className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs px-3 py-2 rounded-xl hover:bg-amber-100 transition-all active:scale-[0.97]"><Flag className="w-3 h-3" /> Flag</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── EARNINGS ── */}
          {section === "earnings" && (
            <div>
              <h2 className="font-sora font-extrabold text-xl text-[#0c1a2e] mb-5">My Earnings</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[{label:"This Week",value:"₹3,200"},{label:"This Month",value:"₹18,400"},{label:"All Time",value:"₹1,24,700"}].map(s => (
                  <div key={s.label} className="bg-white border border-sky-100 rounded-2xl p-5 shadow-sm text-center">
                    <div className="text-xs font-bold text-[#94B0C4] uppercase tracking-wider mb-1">{s.label}</div>
                    <div className="font-sora font-extrabold text-2xl text-emerald-600">{s.value}</div>
                  </div>
                ))}
              </div>
              <div className="bg-white border border-sky-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-12 bg-sky-50 px-5 py-3 text-[10px] font-extrabold text-[#94B0C4] uppercase tracking-wider border-b border-sky-100">
                  <div className="col-span-5">Action</div><div className="col-span-3">Date</div><div className="col-span-2">Earned</div><div className="col-span-2">Status</div>
                </div>
                {[
                  { action:"Approved — Priya Sharma (Expert)", date:"31 May 2026", earn:"₹150", status:"Paid" },
                  { action:"Rejected — Dubai 7N Package",       date:"31 May 2026", earn:"₹80",  status:"Paid" },
                  { action:"Approved — Amazon Canada Job",      date:"30 May 2026", earn:"₹50",  status:"Paid" },
                  { action:"Approved — GITEX Expo listing",     date:"29 May 2026", earn:"₹100", status:"Processing" },
                ].map((row, i) => (
                  <div key={i} className={`grid grid-cols-12 px-5 py-3.5 text-xs border-b border-sky-50 items-center ${i % 2 === 1 ? "bg-[#f7fbff]" : ""}`}>
                    <div className="col-span-5 font-semibold text-[#0c1a2e]">{row.action}</div>
                    <div className="col-span-3 text-[#475569]">{row.date}</div>
                    <div className="col-span-2 font-bold text-emerald-600">{row.earn}</div>
                    <div className="col-span-2">
                      <span className={`px-2 py-1 rounded-full text-[9px] font-bold ${row.status === "Paid" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-amber-50 text-amber-700 border border-amber-100"}`}>{row.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── PAYOUTS ── */}
          {section === "payouts" && (
            <div>
              <h2 className="font-sora font-extrabold text-xl text-[#0c1a2e] mb-5">Payouts</h2>
              <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-2xl p-5 mb-6 flex items-start gap-3">
                <Wallet className="w-5 h-5 text-[#0ea5e9] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-[#0c1a2e] mb-1">Next Payout: Monday, 2 June 2026</div>
                  <div className="text-xs text-[#475569]">Amount: <strong className="text-emerald-600">₹3,200</strong> · Via UPI: riya@ybl</div>
                </div>
              </div>
              <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-sm">
                <div className="font-sora font-bold text-sm text-[#0c1a2e] mb-4">Payout History</div>
                {[
                  { date:"26 May 2026", amount:"₹4,100", method:"UPI", status:"Done" },
                  { date:"19 May 2026", amount:"₹3,750", method:"UPI", status:"Done" },
                  { date:"12 May 2026", amount:"₹5,200", method:"NEFT", status:"Done" },
                ].map((p, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-sky-50 last:border-0 text-sm">
                    <div><div className="font-semibold text-[#0c1a2e]">{p.date}</div><div className="text-xs text-[#475569]">via {p.method}</div></div>
                    <div className="text-right"><div className="font-sora font-bold text-emerald-600">{p.amount}</div><span className="bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full px-2 py-0.5 text-[9px] font-bold">✓ {p.status}</span></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── NOTIFICATIONS ── */}
          {section === "notifications" && (
            <div>
              <h2 className="font-sora font-extrabold text-xl text-[#0c1a2e] mb-5">Notifications</h2>
              <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-sm">
                {[
                  { icon:"💰", bg:"bg-emerald-50", text:"₹150 earned — Priya Sharma profile approved", time:"2 hrs ago", unread:true },
                  { icon:"🆕", bg:"bg-sky-50",     text:"8 new expert profiles added to your queue", time:"3 hrs ago", unread:true },
                  { icon:"🏆", bg:"bg-amber-50",   text:"You reached Rank #4 — Top Agent this week!", time:"Today 9AM", unread:true },
                  { icon:"💸", bg:"bg-violet-50",  text:"Payout of ₹4,100 sent to your UPI", time:"26 May", unread:false },
                  { icon:"📢", bg:"bg-sky-50",     text:"New commission rate for Job listings: ₹50 → ₹60 (from June)", time:"24 May", unread:false },
                ].map((n, i) => (
                  <div key={i} className={`flex gap-3 py-3.5 border-b border-sky-50 last:border-0 ${n.unread ? "" : "opacity-60"}`}>
                    <div className={`w-9 h-9 ${n.bg} rounded-xl flex items-center justify-center text-lg shrink-0`}>{n.icon}</div>
                    <div className="flex-1">
                      <div className={`text-sm ${n.unread ? "font-semibold text-[#0c1a2e]" : "text-[#475569]"}`}>{n.text}</div>
                      <div className="text-xs text-[#94B0C4] mt-0.5">{n.time}</div>
                    </div>
                    {n.unread && <div className="w-2 h-2 bg-[#0ea5e9] rounded-full mt-1.5 shrink-0" />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── PROFILE ── */}
          {section === "profile" && (
            <div>
              <h2 className="font-sora font-extrabold text-xl text-[#0c1a2e] mb-5">My Profile</h2>
              <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm mb-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#38bdf8] to-[#0284c7] flex items-center justify-center text-white font-sora font-bold text-2xl shadow-md">RM</div>
                  <div>
                    <div className="font-sora font-bold text-lg text-[#0c1a2e]">Riya Mehta</div>
                    <div className="text-sm text-[#475569]">Visara Agent · Pune, Maharashtra</div>
                    <div className="flex gap-2 mt-1">
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full px-2 py-0.5 text-[10px] font-bold flex items-center gap-1"><BadgeCheck className="w-2.5 h-2.5" /> KYC Verified</span>
                      <span className="bg-sky-50 text-[#0369a1] border border-sky-100 rounded-full px-2 py-0.5 text-[10px] font-bold">Agent since Jan 2026</span>
                    </div>
                  </div>
                </div>
                {[{label:"Email",value:"riya.mehta@email.com"},{label:"Phone",value:"+91 98765 43210"},{label:"UPI",value:"riya@ybl"},{label:"Languages",value:"English, Hindi, Marathi"}].map(row => (
                  <div key={row.label} className="flex items-center justify-between py-3 border-b border-sky-50 last:border-0">
                    <span className="text-xs font-extrabold text-[#94B0C4] uppercase tracking-wider">{row.label}</span>
                    <span className="text-sm font-semibold text-[#0c1a2e]">{row.value}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => showToast("✏️ Profile edit coming soon!")} className="bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.97]">
                Edit Profile
              </button>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
