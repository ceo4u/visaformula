"use client";

import Link from "next/link";
import { Search, CheckCircle, Users, Award, Shield, ArrowRight, Star, Globe, Briefcase, GraduationCap, BookOpen, Wallet, AlertTriangle, Lock, Heart } from "lucide-react";
import { useState } from "react";
import { MagicSearch } from "@/components/shared/magic-search";
import { ExpertCard } from "@/components/ExpertCard";
import { UniversityCard } from "@/components/UniversityCard";
import { JobCard } from "@/components/JobCard";
import { TourCard } from "@/components/TourCard";

const experts = [
  { name: "Marcus Thorne, JD", role: "Immigration Attorney", rating: 4.5, reviews: 142, location: "New York, NY", price: "from $150", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face", badges: ["Open now", "Verified"], tags: ["US Visa", "H-1B", "L-1"] },
  { name: "Elena Rodriguez", role: "Immigration Consultant", rating: 5.0, reviews: 89, location: "Brooklyn, NY", price: "from $100", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face", badges: ["Verified"], tags: ["Green Card", "Family"] },
  { name: "Beacon Global Services", role: "Education Agent", rating: 4.0, reviews: 210, location: "Queens, NY", price: "from $80", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=400&fit=crop&crop=face", badges: [], tags: ["F-1 Visa", "Admissions"] },
];

const universities = [
  { name: "University of Toronto", location: "Toronto, Canada", ranking: "21", rating: 4.8, reviews: 342, programs: "Engineering, CS, Business", tuition: "CAD 45k/yr", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop" },
  { name: "University of Melbourne", location: "Melbourne, Australia", ranking: "14", rating: 4.7, reviews: 256, programs: "Medicine, Arts, Law", tuition: "AUD 50k/yr", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop" },
  { name: "UCL", location: "London, UK", ranking: "9", rating: 4.6, reviews: 412, programs: "Architecture, Economics", tuition: "GBP 30k/yr", image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&h=400&fit=crop" },
];

const jobs = [
  { title: "Senior Software Engineer", company: "TechCorp Inc.", location: "San Francisco, USA", salary: "$140k - $180k", posted: "2d ago" },
  { title: "Registered Nurse", company: "HealthCare Plus", location: "Toronto, Canada", salary: "CAD 80k - 100k", posted: "5h ago" },
  { title: "Data Analyst", company: "DataViz GmbH", location: "Berlin, Germany", salary: "€60k - €80k", posted: "1w ago" },
];

const tours = [
  { name: "Ivy League Campus Tour", duration: "7 Days", covered: "Harvard, MIT, Yale, Columbia", rating: 4.9, reviews: 128, price: "$1,299", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop", badges: ["Visa assistance included", "Group discount"] },
  { name: "Australian Uni Explorer", duration: "10 Days", covered: "UniMelb, USyd, UNSW", rating: 4.7, reviews: 84, price: "$2,499", image: "https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?w=600&h=400&fit=crop", badges: ["Flights included"] },
  { name: "UK Russell Group Tour", duration: "8 Days", covered: "Oxford, Cambridge, Imperial", rating: 4.8, reviews: 96, price: "$1,899", image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=600&h=400&fit=crop", badges: ["Visa assistance included"] },
];

const categories = [
  { label: "Study Visa", icon: GraduationCap, href: "/visa-guide/canada/study-permit", color: "from-blue-500 to-indigo-600" },
  { label: "Work Visa", icon: Briefcase, href: "/visa-guide/usa/h1b", color: "from-emerald-500 to-teal-600" },
  { label: "Express Entry", icon: Globe, href: "/visa-guide/canada/express-entry", color: "from-sky-500 to-blue-600" },
  { label: "Work Permit", icon: Shield, href: "/work-permit", color: "from-violet-500 to-purple-600" },
  { label: "IELTS Prep", icon: BookOpen, href: "/training/ielts", color: "from-amber-500 to-orange-600" },
  { label: "Loan Advisor", icon: Wallet, href: "/training/financial", color: "from-pink-500 to-rose-600" },
  { label: "Emergency", icon: AlertTriangle, href: "/emergency", color: "from-red-500 to-red-600" },
  { label: "Escrow", icon: Lock, href: "/escrow", color: "from-emerald-500 to-green-600" },
];

const successStories = [
  { name: "Priya Sharma", visa: "Canada PR", quote: "Got my ITA with CRS 472. Visara made it seamless!", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face", helpful: 142 },
  { name: "Rahul Verma", visa: "H-1B Transfer", quote: "H-1B transfer done in 45 days. Premium processing FTW!", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face", helpful: 89 },
  { name: "Ananya Patel", visa: "UK Student", quote: "UCL admission + visa in 3 weeks. Incredible support!", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face", helpful: 201 },
];

export default function HomePage() {
  return (
    <div className="bg-[#f0f4f8] min-h-screen">
      {/* ────── HERO ────── */}
      <section className="relative w-full flex flex-col items-center justify-center px-4 overflow-hidden" style={{ minHeight: "520px" }}>
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&h=900&fit=crop&q=80" alt="City skyline" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy/80" />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-white font-sora text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-5 leading-[1.1] tracking-tight">
            Find the right expert.<br />
            <span className="text-[#38bdf8]">Explore your options.</span>
          </h1>
          <p className="text-white/75 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto mb-8">
            Your global marketplace for immigration experts, top universities, overseas jobs, and more.
          </p>
          <div className="flex flex-wrap gap-6 justify-center text-white/60 text-sm font-semibold">
            <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#38bdf8]" /> 190+ Countries</span>
            <span className="flex items-center gap-2"><Users className="w-4 h-4 text-[#38bdf8]" /> 50K+ Users</span>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#38bdf8]" /> Verified Experts</span>
            <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-[#38bdf8]" /> Escrow Payments</span>
          </div>
        </div>
      </section>

      {/* ────── MAGIC SEARCH ────── */}
      <section className="max-w-5xl mx-auto px-4 -mt-14 relative z-20 mb-12">
        <MagicSearch />
      </section>

      {/* ────── VISA CATEGORIES ────── */}
      <section className="max-w-6xl mx-auto px-4 mb-14">
        <h2 className="font-sora text-2xl font-bold text-navy mb-6 text-center">Explore by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map(cat => (
            <Link key={cat.label} href={cat.href}>
              <div className="flex flex-col items-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all group cursor-pointer">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-2.5 shadow-sm group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-bold text-navy text-center leading-tight">{cat.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ────── IN-HOUSE EXPERT BANNER ────── */}
      <section className="max-w-5xl mx-auto px-4 mb-14">
        <Link href="/smart-search?type=inhouse">
          <div className="bg-gradient-to-r from-[#0ea5e9] via-[#0284c7] to-[#0369a1] rounded-2xl p-8 text-white flex flex-col md:flex-row items-center gap-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shrink-0">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-sora text-xl font-bold mb-1">Talk to Our In-House Experts</h3>
              <p className="text-white/70 text-sm">Visara&apos;s own employed team of immigration professionals. Vetted, trained, and trusted.</p>
            </div>
            <button className="bg-white text-[#0ea5e9] px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-white/90 transition-all flex items-center gap-2 group-hover:gap-3 shrink-0">
              Find In-House Experts <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Link>
      </section>

      {/* ────── TRUST BAR ────── */}
      <section className="bg-white border-y border-gray-200 py-10 mb-14">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { icon: CheckCircle, label: "KYC Verified", desc: "100% verified professionals", color: "text-emerald-500", bg: "bg-emerald-50" },
            { icon: Lock, label: "Escrow Payments", desc: "Pay safe, get service", color: "text-[#0ea5e9]", bg: "bg-sky-50" },
            { icon: Award, label: "In-House Experts", desc: "Visara employed team", color: "text-violet-500", bg: "bg-violet-50" },
            { icon: Users, label: "50K+ Applicants", desc: "Trusted by global seekers", color: "text-amber-500", bg: "bg-amber-50" },
          ].map(item => (
            <div key={item.label} className="flex flex-col items-center">
              <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-3`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <h3 className="font-bold text-sm text-navy mb-0.5">{item.label}</h3>
              <p className="text-xs text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ────── EXPERTS ────── */}
      <section className="max-w-6xl mx-auto py-10 px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-sora text-2xl md:text-3xl font-extrabold text-navy">
            Recommended <span className="text-[#0ea5e9]">Experts</span>
          </h2>
          <Link href="/find-lawyer" className="text-sm font-bold text-[#0ea5e9] hover:underline hidden md:flex items-center gap-1">View All <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert, idx) => <ExpertCard key={idx} expert={expert} />)}
        </div>
      </section>

      {/* ────── UNIVERSITIES ────── */}
      <section className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="font-sora text-2xl md:text-3xl font-extrabold text-navy mb-8">Top <span className="text-[#0ea5e9]">Universities</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni, idx) => <UniversityCard key={idx} uni={uni} />)}
        </div>
      </section>

      {/* ────── JOBS ────── */}
      <section className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="font-sora text-2xl md:text-3xl font-extrabold text-navy mb-8">Overseas <span className="text-[#0ea5e9]">Jobs</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{jobs.map((job, idx) => <JobCard key={idx} job={job} />)}</div>
      </section>

      {/* ────── TOURS ────── */}
      <section className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="font-sora text-2xl md:text-3xl font-extrabold text-navy mb-8">Campus <span className="text-[#0ea5e9]">Tours</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{tours.map((tour, idx) => <TourCard key={idx} tour={tour} />)}</div>
      </section>

      {/* ────── SUCCESS STORIES ────── */}
      <section className="max-w-6xl mx-auto py-14 px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-sora text-2xl md:text-3xl font-extrabold text-navy">Success <span className="text-[#0ea5e9]">Stories</span></h2>
          <Link href="/success-stories" className="text-sm font-bold text-[#0ea5e9] hover:underline flex items-center gap-1">See All <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {successStories.map(s => (
            <div key={s.name} className="bg-white rounded-2xl border border-sky-100 p-5 shadow-sm hover:shadow-card-hover hover:-translate-y-0.5 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <img src={s.image} alt={s.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-sky-100" />
                <div>
                  <h4 className="font-bold text-navy text-sm">{s.name}</h4>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold border border-emerald-100">{s.visa}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 italic leading-relaxed mb-3">&ldquo;{s.quote}&rdquo;</p>
              <div className="flex items-center text-xs text-gray-400 font-semibold"><Heart className="w-3.5 h-3.5 mr-1" /> {s.helpful} found helpful</div>
            </div>
          ))}
        </div>
      </section>

      {/* ────── EMERGENCY BANNER ────── */}
      <section className="max-w-5xl mx-auto px-4 mb-16">
        <Link href="/emergency">
          <div className="bg-white border-l-4 border-red-500 rounded-2xl p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-navy text-base mb-0.5">Need Emergency Help?</h3>
              <p className="text-sm text-gray-500">Overstay, deportation threat, or visa denial? Get urgent legal assistance right now.</p>
            </div>
            <span className="text-sm font-bold text-red-500 flex items-center gap-1 shrink-0 group-hover:gap-2 transition-all">Get Help <ArrowRight className="w-4 h-4" /></span>
          </div>
        </Link>
      </section>
    </div>
  );
}
