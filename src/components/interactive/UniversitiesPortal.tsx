import React, { useState } from "react";
import {
  GraduationCap, MapPin, Clock, Search, Filter, CheckCircle, Globe,
  ArrowRight, Shield, Plane, Star, BadgeCheck, DollarSign,
  Building2, Users, Zap, Code2, Stethoscope, HardHat,
  ChefHat, Bookmark, BookmarkPlus, BookOpen, Calendar, Library
} from "lucide-react";

interface University {
  id: string;
  name: string;
  location: string;
  country: string;
  countryCode: string;
  category: string;
  tuition: string;
  tuitionNote: string;
  posted: string;
  degreeType: string;
  pgwp: boolean;
  scholarships: boolean;
  featured: boolean;
  urgent: boolean;
  logo: string;
  heroImg: string;
  tags: string[];
  desc: string;
  rank: string;
  ieltsMin: string;
}

const initialUniversities: University[] = [
  {
    id: "1",
    name: "University of Toronto",
    location: "Toronto, Canada",
    country: "Canada",
    countryCode: "ca",
    category: "Engineering",
    tuition: "CAD $38K–$52K",
    tuitionNote: "per year",
    posted: "1d ago",
    degreeType: "Master's",
    pgwp: true,
    scholarships: true,
    featured: true,
    urgent: true,
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop&q=90",
    heroImg: "/images/univ_toronto_night.png",
    tags: ["Top 30 Global", "Co-op Placements", "Scholarships available"],
    desc: "Ranked #1 in Canada, U of T offers world-class postgraduate studies with direct eligibility for Canada's post-graduation work permit (PGWP).",
    rank: "#21 Global",
    ieltsMin: "6.5 Overall"
  },
  {
    id: "2",
    name: "University of Melbourne",
    location: "Melbourne, Australia",
    country: "Australia",
    countryCode: "au",
    category: "Business",
    tuition: "AUD $34K–$48K",
    tuitionNote: "per year",
    posted: "2d ago",
    degreeType: "Bachelor's",
    pgwp: true,
    scholarships: true,
    featured: false,
    urgent: false,
    logo: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=200&h=200&fit=crop&q=90",
    heroImg: "/images/univ_melb_night.png",
    tags: ["Group of Eight", "Group Discounts", "Internships Included"],
    desc: "Australia's leading research university offering extensive career networks and automatic postgraduate visa pathways for international students.",
    rank: "#34 Global",
    ieltsMin: "6.5 (No band < 6.0)"
  },
  {
    id: "3",
    name: "University College London (UCL)",
    location: "London, United Kingdom",
    country: "UK",
    countryCode: "gb",
    category: "IT & Tech",
    tuition: "GBP £24K–£35K",
    tuitionNote: "per year",
    posted: "3h ago",
    degreeType: "Master's",
    pgwp: true,
    scholarships: false,
    featured: true,
    urgent: false,
    logo: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=200&h=200&fit=crop&q=90",
    heroImg: "/images/univ_ucl_night.png",
    tags: ["Russell Group", "No GRE required", "Post-Study Visa"],
    desc: "UCL is a premier global university offering excellent pathways for graduate visa sponsorship and professional employment in the UK.",
    rank: "#9 Global",
    ieltsMin: "7.0 Overall"
  },
  {
    id: "4",
    name: "Technical University of Munich (TUM)",
    location: "Munich, Germany",
    country: "Germany",
    countryCode: "de",
    category: "Engineering",
    tuition: "€0 - €4K",
    tuitionNote: "per year (Free)",
    posted: "5d ago",
    degreeType: "Master's",
    pgwp: true,
    scholarships: true,
    featured: false,
    urgent: false,
    logo: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=200&h=200&fit=crop&q=90",
    heroImg: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=400&fit=crop&q=90",
    tags: ["Free Tuition", "Top Tech University", "English taught programs"],
    desc: "TUM offers tuition-free education for elite engineering and technology courses, with high-demand placements in German tech hubs.",
    rank: "#37 Global",
    ieltsMin: "6.5 Overall"
  },
  {
    id: "5",
    name: "National University of Singapore (NUS)",
    location: "Singapore",
    country: "Singapore",
    countryCode: "sg",
    category: "Business",
    tuition: "SGD $28K–$42K",
    tuitionNote: "per year",
    posted: "6h ago",
    degreeType: "Master's",
    pgwp: true,
    scholarships: true,
    featured: false,
    urgent: true,
    logo: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=200&h=200&fit=crop&q=90",
    heroImg: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&h=400&fit=crop&q=90",
    tags: ["#1 in Asia", "High employment index", "Government subsidies"],
    desc: "Ranked #1 in Asia, NUS provides direct access to multinational corporate headquarters in Singapore's business districts.",
    rank: "#8 Global",
    ieltsMin: "6.5 Overall"
  }
];

const countryCards = [
  { name: "Canada",       code: "ca", jobs: "150 universities", img: "/images/dest_canada_cold.png" },
  { name: "Singapore",   code: "sg", jobs: "45 universities",  img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&h=300&fit=crop&q=90" },
  { name: "UK",           code: "gb", jobs: "120 universities", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&h=300&fit=crop&q=90" },
  { name: "Australia",    code: "au", jobs: "85 universities",  img: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=500&h=300&fit=crop&q=90" },
  { name: "Germany",      code: "de", jobs: "60 universities",  img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=500&h=300&fit=crop&q=90" },
];

const streamsList = ["All Categories", "IT & Tech", "Business", "Engineering", "Arts"];
const countriesList = ["All Countries", "Canada", "Australia", "UK", "Germany", "Singapore"];

export function UniversitiesPortal() {
  const [universities, setUniversities] = useState(initialUniversities);
  const [saved, setSaved] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [activeChip, setActiveChip] = useState("All Universities");
  const [activeUniv, setActiveUniv] = useState<University | null>(null);
  const [pgwpOnly, setPgwpOnly] = useState(false);
  const [scholarshipOnly, setScholarshipOnly] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastOn, setToastOn] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg); setToastOn(true);
    setTimeout(() => setToastOn(false), 2500);
  };

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    showToast(saved.includes(id) ? "Removed from saved" : "Saved to bookmarks!");
  };

  const applyFilters = () => {
    let f = initialUniversities;
    if (searchQuery) f = f.filter(u =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (selectedCountry !== "All Countries") f = f.filter(u => u.country === selectedCountry);
    if (selectedCategory !== "All Categories") f = f.filter(u => u.category === selectedCategory);
    if (pgwpOnly) f = f.filter(u => u.pgwp);
    if (scholarshipOnly) f = f.filter(u => u.scholarships);
    setUniversities(f);
    showToast(`${f.length} universities found`);
  };

  const clearFilters = () => {
    setSearchQuery(""); setSelectedCountry("All Countries");
    setSelectedCategory("All Categories"); setActiveChip("All Universities");
    setPgwpOnly(false); setScholarshipOnly(false);
    setUniversities(initialUniversities); showToast("Filters cleared");
  };

  const filterByChip = (chip: string) => {
    setActiveChip(chip);
    if (chip === "All Universities") { setUniversities(initialUniversities); return; }
    const map: Record<string, string> = {
      "IT & Tech": "IT & Tech", "Business": "Business",
      "Engineering": "Engineering", "Arts": "Arts"
    };
    const streamName = map[chip];
    setUniversities(streamName ? initialUniversities.filter(u => u.category === streamName) : initialUniversities);
  };

  const filterByCountry = (displayName: string) => {
    setUniversities(initialUniversities.filter(u => u.country === displayName));
    showToast(`Universities in ${displayName}`);
  };

  return (
    <div className="bg-[#fcfdfd] min-h-screen text-[#1a3347] font-sans relative pb-16">
      {/* TOAST */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0c1a2e] text-white px-6 py-3 rounded-full text-xs font-bold z-[999] shadow-xl transition-all duration-300 ${toastOn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
        {toastMsg}
      </div>

      {activeUniv ? (
        /* DETAIL VIEW */
        <div className="max-w-4xl mx-auto px-6 py-10">
          <button
            onClick={() => { setActiveUniv(null); window.scrollTo(0, 0); }}
            className="text-xs font-bold text-black hover:underline mb-6 flex items-center gap-1.5 outline-none"
          >
            ← Back to Universities
          </button>

          {/* Hero Image */}
          <div className="relative rounded-3xl overflow-hidden h-52 mb-6 border border-slate-100 shadow-sm">
            <img src={activeUniv.heroImg} alt={activeUniv.location} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a2e]/70 to-transparent"></div>
            <div className="absolute bottom-4 left-5 flex items-center gap-2">
              <img src={`https://flagcdn.com/w40/${activeUniv.countryCode}.png`} alt="flag" className="h-5 rounded shadow" />
              <span className="text-white font-bold text-sm flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-200" /> {activeUniv.location}
              </span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/60 rounded-2xl p-8 shadow-sm">
            <div className="flex gap-4 items-start mb-6">
              <img src={activeUniv.logo} alt={activeUniv.name} className="w-16 h-16 rounded-2xl object-cover border border-slate-100 bg-white shrink-0 shadow-sm" />
              <div>
                <h2 className="font-sora text-2xl font-extrabold text-[#0c1a2e] mb-1.5">{activeUniv.name}</h2>
                <div className="flex flex-wrap items-center gap-2 text-sm text-[#475569]">
                  <span className="font-sora font-bold text-[#0c1a2e]">{activeUniv.rank}</span>
                  <BadgeCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 font-bold text-xs">Verified Institution</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5 text-indigo-550" /> {activeUniv.degreeType} Program</span>
                </div>
              </div>
            </div>

            {/* Key info pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Tuition Cost", value: activeUniv.tuition, sub: activeUniv.tuitionNote },
                { label: "Visa Support", value: activeUniv.pgwp ? "PGWP Eligible" : "Work Permit Link", sub: "Graduate Visa Route" },
                { label: "IELTS Min", value: activeUniv.ieltsMin, sub: "requirements" },
                { label: "Intake season", value: "Fall / Winter", sub: "Enrollment timeline" },
              ].map(item => (
                <div key={item.label} className="bg-indigo-50/20 border border-slate-100 rounded-2xl p-3.5 text-center">
                  <div className="text-[10px] text-slate-400 font-sora font-medium tracking-normal mb-1">{item.label}</div>
                  <div className="font-sora font-extrabold text-sm text-[#0c1a2e]">{item.value}</div>
                  {item.sub && <div className="text-[10px] text-gray-400 font-sora font-semibold">{item.sub}</div>}
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {activeUniv.tags.map(t => (
                <span key={t} className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 rounded-lg text-[10px] font-sora font-medium tracking-normal">{t}</span>
              ))}
            </div>

            {/* Description */}
            <div className="border-t border-slate-100 py-5">
              <h3 className="text-xs font-sora font-extrabold text-navy tracking-wider mb-2">University Profile & Academic Intake</h3>
              <p className="text-sm font-sora text-[#475569] leading-relaxed">
                {activeUniv.desc} VisaFormula offers comprehensive counseling, documentation, and student visa filing services directly associated with international colleges.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => showToast("✅ Application request submitted!")}
                className="bg-black hover:bg-neutral-900 text-white font-bold text-sm px-7 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 outline-none"
              >
                Apply Admission Support <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      ) : (
        /* MAIN LISTING VIEW */
        <div>
          {/* HERO */}
          <div className="relative overflow-hidden min-h-[480px] flex items-center" >
            <div className="absolute inset-0 z-0">
              <img
                src="/univ_grad_girls.png"
                alt="University graduates"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/45"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 text-left w-full">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-xs font-bold text-white/80 mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                150+ Verified Global Universities · PGWP Work Permits Included
              </div>

              <h1 className="font-sora font-extrabold text-4xl sm:text-5xl md:text-6xl text-white mb-5 leading-[1.08] tracking-tight">
                Find Your Dream<br />Overseas University.
              </h1>

              <p className="text-white/80 text-sm sm:text-base max-w-2xl mb-8 font-medium leading-relaxed">
                Studies in Canada, UK, Australia, Germany & 20+ countries — every listing includes student visa checklists, part-time jobs allowed, and post-study work permit guidance.
              </p>

              {/* Search Bar */}
              <div className="bg-white border border-slate-200/50 rounded-3xl p-5 shadow-2xl max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center">
                  <div className="md:col-span-3">
                    <label className="text-[10px] font-medium tracking-normal text-slate-400 block mb-1.5">University / Course</label>
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Search e.g. Toronto, MBA, Computer Science..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-black outline-none focus:border-black transition-all"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-medium tracking-normal text-slate-400 block mb-1.5">Country</label>
                    <div className="relative">
                      <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
                      <select
                        value={selectedCountry}
                        onChange={e => setSelectedCountry(e.target.value)}
                        className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-black outline-none focus:border-black transition-all appearance-none cursor-pointer"
                      >
                        {countriesList.map(c => <option key={c} className="text-black bg-white">{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-medium tracking-normal text-slate-400 block mb-1.5">Category</label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
                      <select
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                        className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-black outline-none focus:border-black transition-all appearance-none cursor-pointer"
                      >
                        {streamsList.map(c => <option key={c} className="text-black bg-white">{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 mt-3 pt-3 border-t border-slate-100">
                  <label className="flex items-center gap-2 cursor-pointer" onClick={() => setPgwpOnly(!pgwpOnly)}>
                    <div className={`w-9 h-5 rounded-full transition-all relative ${pgwpOnly ? "bg-black" : "bg-gray-200"}`}>
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${pgwpOnly ? "left-4" : "left-0.5"}`} />
                    </div>
                    <span className="text-xs font-semibold text-[#475569]">PGWP Eligible Only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer" onClick={() => setScholarshipOnly(!scholarshipOnly)}>
                    <div className={`w-9 h-5 rounded-full transition-all relative ${scholarshipOnly ? "bg-black" : "bg-gray-200"}`}>
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${scholarshipOnly ? "left-4" : "left-0.5"}`} />
                    </div>
                    <span className="text-xs font-semibold text-[#475569]">Scholarships Available</span>
                  </label>
                </div>
              </div>

              {/* Chips */}
              <div className="flex gap-2 flex-wrap mt-5">
                {["All Universities", "IT & Tech", "Business", "Engineering", "Arts"].map(chip => (
                  <button
                    key={chip}
                    onClick={() => filterByChip(chip)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium border shrink-0 transition-all outline-none ${
                      activeChip === chip
                        ? "bg-black text-white border-black shadow-sm"
                        : "bg-white/15 border-white/25 text-white/80 hover:bg-white/25 backdrop-blur-sm"
                    }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* STATS BAR */}
          <div className="bg-white border-b border-slate-100">
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap gap-6 items-center justify-between">
              <div className="flex items-center gap-8 flex-wrap">
                {[
                  { icon: Library, value: "150+", label: "Verified Universities" },
                  { icon: Globe, value: "20+", label: "Target Countries" },
                  { icon: BadgeCheck, value: "100%", label: "PGWP / PSW Vetted" },
                  { icon: Users, value: "12K+", label: "Student Visas Filed" },
                ].map(s => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-black" />
                      <span className="font-sora font-extrabold text-black text-base">{s.value}</span>
                      <span className="text-[11px] font-bold text-[#475569]">{s.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* DESTINATION CARDS */}
          <div className="max-w-6xl mx-auto px-6 pt-12 pb-2 text-left">
            <div className="flex items-end justify-between mb-6">
              <div>
                <span className="text-[11px] font-extrabold text-[#ef4444] tracking-wider block mb-1">Browse by Destination</span>
                <h2 className="font-sora font-extrabold text-[#0c1a2e] text-2xl">Where Do You Want to Study?</h2>
              </div>
              <button onClick={clearFilters} className="text-xs font-bold text-[#ef4444] hover:underline outline-none">View All →</button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {countryCards.map(c => (
                <div
                  key={c.name}
                  onClick={() => filterByCountry(c.name)}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer h-40 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a2e]/75 via-[#0c1a2e]/20 to-transparent"></div>
                  <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1 shadow border border-white/50">
                    <img src={`https://flagcdn.com/w40/${c.code}.png`} alt="flag" className="h-3 rounded" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="text-white font-sora font-extrabold text-sm leading-snug">{c.name}</div>
                    <div className="text-indigo-100 text-xs font-bold mt-0.5">{c.jobs}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MAIN LISTINGS GRID */}
          <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
            {/* SIDEBAR */}
            <aside className="lg:col-span-3">
              <div className="bg-white border border-black/20 rounded-2xl p-5 shadow-sm sticky top-28 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-sora font-bold text-sm text-navy flex items-center gap-1.5">
                    <Filter className="w-3.5 h-3.5 text-black" /> Filters
                  </h3>
                  <button onClick={clearFilters} className="text-xs font-bold text-black hover:underline outline-none">Clear all</button>
                </div>

                <div className="h-px bg-slate-100"></div>

                {/* Country checkboxes */}
                <div className="space-y-2">
                  <span className="text-xs font-light text-[#359FC2] tracking-normal block">Country</span>
                  {[
                    { flag: "🇨🇦", label: "Canada",          count: "150" },
                    { flag: "🇸🇬", label: "Singapore",        count: "45"   },
                    { flag: "🇬🇧", label: "United Kingdom",  count: "120"   },
                    { flag: "🇦🇺", label: "Australia",       count: "85"   },
                    { flag: "🇩🇪", label: "Germany",         count: "60"   },
                  ].map(item => (
                    <label key={item.label} className="flex items-center gap-2 cursor-pointer text-xs text-[#475569] font-medium group">
                      <input type="checkbox" className="rounded border-slate-200 w-4 h-4 accent-black" />
                      <span className="flex-1 group-hover:text-navy transition-colors">{item.flag} {item.label}</span>
                      <span className="text-[10px] text-slate-400 font-bold">{item.count}</span>
                    </label>
                  ))}
                </div>

                <div className="h-px bg-slate-100"></div>

                {/* Stream Category checkboxes */}
                <div className="space-y-2">
                  <span className="text-xs font-light text-[#359FC2] tracking-normal block">Field / Stream</span>
                  {[
                    { icon: Code2,        label: "IT & Tech",    count: "78" },
                    { icon: Stethoscope,  label: "Healthcare",   count: "35" },
                    { icon: HardHat,      label: "Engineering",  count: "62" },
                    { icon: ChefHat,      label: "Hospitality",  count: "24" },
                    { icon: GraduationCap,label: "Education",    count: "40" },
                  ].map(item => {
                    const CategoryIcon = item.icon;
                    return (
                      <label key={item.label} className="flex items-center gap-2 cursor-pointer text-xs text-[#475569] font-medium group">
                        <input type="checkbox" className="rounded border-slate-200 w-4 h-4 accent-black" />
                        <CategoryIcon className="w-3.5 h-3.5 text-slate-400 group-hover:text-black transition-colors" />
                        <span className="flex-1 group-hover:text-navy transition-colors">{item.label}</span>
                        <span className="text-[10px] text-slate-400 font-bold">{item.count}</span>
                      </label>
                    );
                  })}
                </div>

                <div className="h-px bg-slate-100"></div>

                {/* Perks toggles */}
                <div className="space-y-2">
                  <span className="text-xs font-light text-[#359FC2] tracking-normal block">Student Visa Perks</span>
                  <label className="flex items-center gap-2 cursor-pointer" onClick={() => setPgwpOnly(!pgwpOnly)}>
                    <div className={`w-9 h-5 rounded-full transition-all relative ${pgwpOnly ? "bg-black" : "bg-gray-200"}`}>
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${pgwpOnly ? "left-4" : "left-0.5"}`} />
                    </div>
                    <span className="text-xs text-[#475569] font-semibold">PGWP Eligible</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer" onClick={() => setScholarshipOnly(!scholarshipOnly)}>
                    <div className={`w-9 h-5 rounded-full transition-all relative ${scholarshipOnly ? "bg-black" : "bg-gray-200"}`}>
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${scholarshipOnly ? "left-4" : "left-0.5"}`} />
                    </div>
                    <span className="text-xs text-[#475569] font-semibold">Scholarships Available</span>
                  </label>
                </div>

                <button
                  onClick={applyFilters}
                  className="w-full bg-black hover:bg-neutral-900 text-white font-bold py-2.5 rounded-xl text-xs shadow-md hover:shadow-lg transition-all outline-none"
                >
                  Apply Filters
                </button>
              </div>
            </aside>

            {/* LISTINGS */}
            <div className="lg:col-span-9 space-y-4">
              <div className="bg-gradient-to-r from-indigo-50/50 to-white border border-indigo-150 border-l-4 border-l-black rounded-2xl p-4 flex gap-3">
                <Zap className="w-5 h-5 text-black shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-extrabold text-indigo-750 mb-0.5">Verified Student Visa Pathways</h4>
                  <p className="text-[11px] text-[#475569] font-semibold leading-normal">Every listing includes verified post-graduation work permit (PGWP) guides. Get admission assistance in one tap.</p>
                </div>
              </div>

              {universities.map(univ => (
                <div
                  key={univ.id}
                  onClick={() => setActiveUniv(univ)}
                  className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row gap-5 items-start justify-between relative group"
                >
                  <div className="flex gap-4 items-start w-full">
                    <img src={univ.logo} alt={univ.name} className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shrink-0 shadow-sm" />
                    <div className="flex-grow min-w-0">
                      <h3 className="font-sora font-extrabold text-lg text-[#0c1a2e] mb-1.5 leading-snug group-hover:text-black transition-colors">{univ.name}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#475569] font-semibold">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#ef4444]" />{univ.location}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-indigo-500" />{univ.tuition} <span className="text-gray-400 font-medium">{univ.tuitionNote}</span></span>
                      </div>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-4 w-full sm:w-auto shrink-0 border-t sm:border-t-0 border-slate-100 pt-3.5 sm:pt-0">
                    <div className="text-[10px] text-slate-400 font-medium tracking-normal">{univ.posted}</div>
                    <button className="bg-black hover:bg-neutral-900 text-white font-bold text-[11px] tracking-wider px-4 py-2 rounded-xl flex items-center gap-1 transition-all outline-none shrink-0 shadow-sm">
                      Details <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
