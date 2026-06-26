import { useState } from "react";
import {
  Briefcase, MapPin, Clock, Search, Filter, CheckCircle, Globe,
  ArrowRight, Shield, Plane, Star, BadgeCheck, DollarSign,
  Building2, Users, Zap, Code2, Stethoscope, HardHat,
  ChefHat, GraduationCap, Bookmark, BookmarkPlus,
} from "lucide-react";

const initialJobs = [
  {
    id: "1",
    title: "Senior Full Stack Engineer",
    company: "Tech Innovations Inc.",
    location: "Toronto, Canada",
    country: "Canada",
    countryCode: "ca",
    category: "IT & Tech",
    salary: "CAD $95K–$120K",
    salaryNote: "per year",
    posted: "2h ago",
    type: "Full-Time",
    sponsorship: true,
    relocation: false,
    featured: true,
    urgent: true,
    logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=120&h=120&fit=crop",
    heroImg: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&h=400&fit=crop&q=90",
    tags: ["React", "Node.js", "AWS", "LMIA"],
    desc: "Looking for an experienced Full Stack Engineer. LMIA sponsorship available for the right candidate.",
    icon: Code2,
    iconColor: "from-violet-500 to-indigo-600",
  },
  {
    id: "2",
    title: "Registered Nurse — ICU Specialist",
    company: "Royal Dubai Hospital",
    location: "Dubai, UAE",
    country: "UAE",
    countryCode: "ae",
    category: "Healthcare",
    salary: "AED 12K–18K",
    salaryNote: "per month",
    posted: "5h ago",
    type: "Full-Time",
    sponsorship: true,
    relocation: true,
    featured: false,
    urgent: false,
    logo: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=120&h=120&fit=crop",
    heroImg: "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?w=800&h=400&fit=crop&q=90",
    tags: ["ICU", "DHA License", "Tax-Free", "Relocation"],
    desc: "Hiring ICU nurses for luxury hospital in Dubai. UAE employment visa provided. Tax-free salary with premium accommodation.",
    icon: Stethoscope,
    iconColor: "from-rose-500 to-pink-600",
  },
  {
    id: "3",
    title: "Civil Engineer — Infrastructure",
    company: "BuildAus Group",
    location: "Melbourne, Australia",
    country: "Australia",
    countryCode: "au",
    category: "Engineering",
    salary: "AUD $90K–$110K",
    salaryNote: "per year",
    posted: "1d ago",
    type: "Full-Time",
    sponsorship: true,
    relocation: true,
    featured: false,
    urgent: false,
    logo: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=120&h=120&fit=crop",
    heroImg: "https://images.unsplash.com/photo-1524820197278-540916411e20?w=800&h=400&fit=crop&q=90",
    tags: ["AutoCAD", "482 Visa", "Relocation Bonus"],
    desc: "Infrastructure projects across Melbourne. Employer-sponsored TSS visa + relocation assistance + signing bonus.",
    icon: HardHat,
    iconColor: "from-amber-500 to-orange-600",
  },
  {
    id: "4",
    title: "Executive Chef — Fine Dining",
    company: "The Ritz London",
    location: "London, UK",
    country: "UK",
    countryCode: "gb",
    category: "Hospitality",
    salary: "GBP £55K–£75K",
    salaryNote: "per year",
    posted: "3h ago",
    type: "Full-Time",
    sponsorship: true,
    relocation: false,
    featured: true,
    urgent: false,
    logo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=120&h=120&fit=crop",
    heroImg: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=400&fit=crop&q=90",
    tags: ["Fine Dining", "Skilled Worker Visa", "Tier 2"],
    desc: "Prestigious fine-dining establishment seeks experienced executive chef. Full UK Skilled Worker visa sponsorship.",
    icon: ChefHat,
    iconColor: "from-emerald-500 to-teal-600",
  },
  {
    id: "5",
    title: "Data Scientist — AI Division",
    company: "DataViz GmbH",
    location: "Berlin, Germany",
    country: "Germany",
    countryCode: "de",
    category: "IT & Tech",
    salary: "€70K–€95K",
    salaryNote: "per year",
    posted: "6h ago",
    type: "Full-Time",
    sponsorship: true,
    relocation: true,
    featured: false,
    urgent: true,
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=120&h=120&fit=crop",
    heroImg: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=400&fit=crop&q=90",
    tags: ["Python", "ML/AI", "EU Blue Card", "Relocation"],
    desc: "Join our AI research division in Berlin. EU Blue Card sponsorship, flexible hours, and relocation package included.",
    icon: Code2,
    iconColor: "from-amber-500 to-blue-600",
  },
  {
    id: "6",
    title: "University Lecturer — Business",
    company: "Auckland University",
    location: "Auckland, New Zealand",
    country: "New Zealand",
    countryCode: "nz",
    category: "Education",
    salary: "NZD $80K–$110K",
    salaryNote: "per year",
    posted: "2d ago",
    type: "Full-Time",
    sponsorship: true,
    relocation: true,
    featured: false,
    urgent: false,
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=120&h=120&fit=crop",
    heroImg: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&h=400&fit=crop&q=90",
    tags: ["MBA", "PhD", "Work Visa NZ", "Relocation"],
    desc: "Auckland University seeks Business faculty. Employer-sponsored work visa, family visa included, accommodation support.",
    icon: GraduationCap,
    iconColor: "from-purple-500 to-violet-600",
  },
];

const countryCards = [
  { name: "Canada",       code: "ca", jobs: "1,240 jobs", img: "https://images.unsplash.com/photo-1530025809667-1f4bcff8e60f?w=500&h=300&fit=crop&q=90" },
  { name: "Dubai, UAE",   code: "ae", jobs: "980 jobs",   img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&h=300&fit=crop&q=90" },
  { name: "UK",           code: "gb", jobs: "720 jobs",   img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&h=300&fit=crop&q=90" },
  { name: "Australia",    code: "au", jobs: "640 jobs",   img: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=500&h=300&fit=crop&q=90" },
  { name: "Germany",      code: "de", jobs: "380 jobs",   img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=500&h=300&fit=crop&q=90" },
];

const categoriesList = ["All Categories", "IT & Tech", "Healthcare", "Engineering", "Hospitality", "Education"];
const countriesList   = ["All Countries", "Canada", "UAE", "UK", "Australia", "Germany", "New Zealand"];

export function JobsPortal() {
  const [jobs, setJobs]                   = useState(initialJobs);
  const [saved, setSaved]                 = useState<string[]>([]);
  const [searchQuery, setSearchQuery]     = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [activeChip, setActiveChip]       = useState("All Jobs");
  const [activeJob, setActiveJob]         = useState<any>(null);
  const [sponsorOnly, setSponsorOnly]     = useState(false);
  const [relocationOnly, setRelocationOnly] = useState(false);
  const [toastMsg, setToastMsg]           = useState("");
  const [toastOn, setToastOn]             = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg); setToastOn(true);
    setTimeout(() => setToastOn(false), 2500);
  };

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    showToast(saved.includes(id) ? "🤍 Removed from saved" : "💙 Saved to bookmarks!");
  };

  const applyFilters = () => {
    let f = initialJobs;
    if (searchQuery) f = f.filter(j =>
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (selectedCountry !== "All Countries") f = f.filter(j => j.country === selectedCountry);
    if (selectedCategory !== "All Categories") f = f.filter(j => j.category === selectedCategory);
    if (sponsorOnly) f = f.filter(j => j.sponsorship);
    if (relocationOnly) f = f.filter(j => j.relocation);
    setJobs(f);
    showToast(`✅ ${f.length} jobs found`);
  };

  const clearFilters = () => {
    setSearchQuery(""); setSelectedCountry("All Countries");
    setSelectedCategory("All Categories"); setActiveChip("All Jobs");
    setSponsorOnly(false); setRelocationOnly(false);
    setJobs(initialJobs); showToast("🔄 Filters cleared");
  };

  const filterByChip = (chip: string) => {
    setActiveChip(chip);
    if (chip === "All Jobs") { setJobs(initialJobs); return; }
    const map: Record<string,string> = {
      "💻 IT & Tech": "IT & Tech", "🏥 Healthcare": "Healthcare",
      "🏗️ Engineering": "Engineering", "🍽️ Hospitality": "Hospitality",
      "🎓 Education": "Education",
    };
    const cat = map[chip];
    setJobs(cat ? initialJobs.filter(j => j.category === cat) : initialJobs.filter(j => j.posted.includes("h")));
  };

  const filterByCountry = (displayName: string) => {
    const countryMap: Record<string,string> = { "Dubai, UAE": "UAE" };
    const mapped = countryMap[displayName] || displayName;
    setJobs(initialJobs.filter(j => j.country === mapped));
    showToast(`🌍 Jobs in ${displayName}`);
  };

  return (
    <div className="bg-[#fff5f5] min-h-screen text-[#1a3347] font-sans relative pb-16">
      {/* TOAST */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0c1a2e] text-white px-6 py-3 rounded-full text-xs font-bold z-[999] shadow-xl transition-all duration-300 ${toastOn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
        {toastMsg}
      </div>

      {/* JOB DETAIL VIEW */}
      {activeJob ? (
        <div className="max-w-4xl mx-auto px-6 py-10">
          <button
            onClick={() => { setActiveJob(null); window.scrollTo(0, 0); }}
            className="text-xs font-bold text-black hover:underline mb-6 flex items-center gap-1.5 outline-none"
          >
            ← Back to Jobs
          </button>

          {/* Hero Image */}
          <div className="relative rounded-3xl overflow-hidden h-52 mb-6 border border-red-100 shadow-sm">
            <img src={activeJob.heroImg} alt={activeJob.location} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a2e]/70 to-transparent"></div>
            <div className="absolute bottom-4 left-5 flex items-center gap-2">
              <img src={`https://flagcdn.com/w40/${activeJob.countryCode}.png`} alt="flag" className="h-5 rounded shadow" />
              <span className="text-white font-bold text-sm flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-200" /> {activeJob.location}
              </span>
            </div>
          </div>

          <div className="bg-white border border-red-100 rounded-2xl p-8 shadow-sm">
            <div className="flex gap-4 items-start mb-6">
              <img src={activeJob.logo} alt={activeJob.company} className="w-16 h-16 rounded-2xl object-cover border border-red-100 bg-white shrink-0 shadow-sm" />
              <div>
                <h2 className="font-sora text-2xl font-extrabold text-[#0c1a2e] mb-1.5">{activeJob.title}</h2>
                <div className="flex flex-wrap items-center gap-2 text-sm text-[#475569]">
                  <span className="font-bold text-[#0c1a2e]">{activeJob.company}</span>
                  <BadgeCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 font-bold text-xs">Verified</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-[#ef4444]" />{activeJob.type}</span>
                </div>
              </div>
            </div>

            {/* Key info pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Salary", value: activeJob.salary, sub: activeJob.salaryNote },
                { label: "Posted", value: activeJob.posted, sub: "ago" },
                { label: "Visa", value: "Sponsored", sub: "Work permit" },
                { label: "Relocation", value: activeJob.relocation ? "Included" : "Not offered", sub: "" },
              ].map(item => (
                <div key={item.label} className="bg-red-50/30 border border-red-100 rounded-2xl p-3.5 text-center">
                  <div className="text-[10px] text-[#94b0c4] font-extrabold uppercase tracking-wider mb-1">{item.label}</div>
                  <div className="font-sora font-extrabold text-sm text-[#0c1a2e]">{item.value}</div>
                  {item.sub && <div className="text-[10px] text-gray-400 font-semibold">{item.sub}</div>}
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {activeJob.tags.map((t: string) => (
                <span key={t} className="bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider">{t}</span>
              ))}
              {activeJob.sponsorship && <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" />Visa Sponsored</span>}
              {activeJob.relocation && <span className="bg-violet-50 text-violet-700 border border-violet-200 px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1"><Plane className="w-3.5 h-3.5" />Relocation</span>}
            </div>

            {/* Description */}
            <div className="border-t border-red-100 py-5">
              <h3 className="text-xs font-extrabold text-navy uppercase tracking-wider mb-2">Job Description</h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                {activeJob.desc} We are hiring premium international candidates for this role. Direct visa filing, relocation credits, and official employer sponsorships will be arranged by our expert immigration panel.
              </p>
            </div>

            {/* Visa Package */}
            <div className="bg-red-50/30 border border-red-100 rounded-2xl p-5 mb-6">
              <h4 className="text-xs font-bold text-navy flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-black" /> Visa & Relocation Package Included
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                This employer provides full support — LMIA (Canada), DHA (UAE), TSS 482 (Australia), or EU Blue Card (Germany). Consult our experts to fast-track your onboarding.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-red-100">
              <button
                onClick={() => showToast("✅ Application submitted successfully!")}
                className="bg-black hover:bg-neutral-900 text-white font-bold text-sm px-7 py-3.5 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center gap-2 outline-none"
              >
                Submit Application <ArrowRight className="w-4 h-4" />
              </button>
              <a href="/find-experts?category=work" className="block">
                <button className="bg-white border-2 border-gray-200 text-black font-bold text-sm px-5 py-3.5 rounded-2xl hover:bg-gray-50 transition-all flex items-center gap-2 outline-none">
                  <Shield className="w-4 h-4" /> Consult Immigration Expert
                </button>
              </a>
            </div>
          </div>
        </div>

      ) : (
        /* MAIN LISTING VIEW */
        <div>
          {/* HERO */}
          <div className="relative overflow-hidden" style={{ minHeight: "720px" }}>
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1800&h=900&fit=crop&q=90"
                alt="City skyline"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0c1a2e]/75 via-[#0c1a2e]/60 to-[#0c1a2e]/90 animate-fade-in"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#b91c1c]/30 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 lg:pt-48 pb-36">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-xs font-bold text-white/80 mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                4,200+ Active Listings · Work Visa Included · 40+ Countries
              </div>

              <h1 className="font-sora font-extrabold text-4xl sm:text-5xl md:text-6xl text-white mb-5 leading-[1.08] tracking-tight">
                Find Your Dream<br />
                <span className="text-white">Overseas Job.</span>
              </h1>

              <p className="text-white/60 text-base md:text-lg max-w-xl mb-8 font-medium leading-relaxed">
                Jobs in Canada, UK, Australia, Dubai & 40+ countries — every listing includes work permit guidance from a VisaFormula expert.
              </p>

              {/* Search bar */}
              <div className="bg-white rounded-2xl p-4 shadow-2xl max-w-4xl border border-red-100 text-left">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                  <div className="md:col-span-5">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#94b0c4] block mb-1.5">Job Title / Skill / Company</label>
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      <input
                        type="text"
                        placeholder="e.g. Software Engineer, Nurse…"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full bg-[#fff5f5] border border-red-100 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-navy outline-none focus:border-[#ef4444] transition-all placeholder:text-gray-300"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#94b0c4] block mb-1.5">Country</label>
                    <div className="relative">
                      <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
                      <select
                        value={selectedCountry}
                        onChange={e => setSelectedCountry(e.target.value)}
                        className="w-full bg-[#fff5f5] border border-red-100 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-navy outline-none focus:border-[#ef4444] transition-all appearance-none cursor-pointer"
                      >
                        {countriesList.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#94b0c4] block mb-1.5">Category</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
                      <select
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                        className="w-full bg-[#fff5f5] border border-red-100 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-navy outline-none focus:border-[#ef4444] transition-all appearance-none cursor-pointer"
                      >
                        {categoriesList.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="md:col-span-1">
                    <button
                      onClick={applyFilters}
                      className="w-full h-[42px] bg-black hover:bg-neutral-900 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center outline-none"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-6 mt-3 pt-3 border-t border-red-50">
                  <label className="flex items-center gap-2 cursor-pointer" onClick={() => setSponsorOnly(!sponsorOnly)}>
                    <div className={`w-9 h-5 rounded-full transition-all relative ${sponsorOnly ? "bg-black" : "bg-gray-200"}`}>
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${sponsorOnly ? "left-4" : "left-0.5"}`} />
                    </div>
                    <span className="text-xs font-semibold text-[#475569]">Visa Sponsored Only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer" onClick={() => setRelocationOnly(!relocationOnly)}>
                    <div className={`w-9 h-5 rounded-full transition-all relative ${relocationOnly ? "bg-black" : "bg-gray-200"}`}>
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${relocationOnly ? "left-4" : "left-0.5"}`} />
                    </div>
                    <span className="text-xs font-semibold text-[#475569]">Relocation Package</span>
                  </label>
                </div>
              </div>

              {/* Chips */}
              <div className="flex gap-2 flex-wrap mt-5">
                {["All Jobs","💻 IT & Tech","🏥 Healthcare","🏗️ Engineering","🍽️ Hospitality","🎓 Education","🆕 New Today"].map(chip => (
                  <button
                    key={chip}
                    onClick={() => filterByChip(chip)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold border shrink-0 transition-all outline-none ${
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

            <div className="absolute bottom-0 left-0 right-0 overflow-hidden z-10">
              <svg className="block w-full" height="32" viewBox="0 0 1440 32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M0,32 L1440,32 L1440,0 C1080,32 360,0 0,16 Z" fill="#fff5f5" />
              </svg>
            </div>
          </div>

          {/* STATS BAR */}
          <div className="bg-white border-b border-red-100">
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap gap-6 items-center justify-between">
              <div className="flex items-center gap-8 flex-wrap">
                {[
                  { icon: Briefcase, value: "4,200+", label: "Active Jobs" },
                  { icon: Globe, value: "40+", label: "Countries" },
                  { icon: BadgeCheck, value: "320+", label: "Verified Recruiters" },
                  { icon: Users, value: "50K+", label: "Placements Done" },
                ].map(s => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-black" />
                      <span className="font-sora font-extrabold text-black text-base">{s.value}</span>
                      <span className="text-[11px] font-bold text-[#475569] uppercase">{s.label}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs font-extrabold text-emerald-600">142 jobs added today</span>
              </div>
            </div>
          </div>

          {/* DESTINATION CARDS */}
          <div className="max-w-6xl mx-auto px-6 pt-12 pb-2 text-left">
            <div className="flex items-end justify-between mb-6">
              <div>
                <span className="text-[11px] font-extrabold text-[#ef4444] uppercase tracking-wider block mb-1">Browse by Destination</span>
                <h2 className="font-sora font-extrabold text-[#0c1a2e] text-2xl">Where Do You Want to Work?</h2>
              </div>
              <button onClick={clearFilters} className="text-xs font-bold text-[#ef4444] hover:underline outline-none">View All →</button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {countryCards.map(c => (
                <div
                  key={c.name}
                  onClick={() => filterByCountry(c.name)}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer h-40 border border-red-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a2e]/75 via-[#0c1a2e]/20 to-transparent"></div>
                  <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1 shadow border border-white/50">
                    <img src={`https://flagcdn.com/w40/${c.code}.png`} alt="flag" className="h-3 rounded" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="text-white font-sora font-extrabold text-sm leading-snug">{c.name}</div>
                    <div className="text-red-100 text-xs font-bold mt-0.5">{c.jobs}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MAIN LISTINGS GRID */}
          <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
            {/* SIDEBAR */}
            <aside className="lg:col-span-3">
              <div className="bg-white border border-red-100 rounded-2xl p-5 shadow-sm sticky top-28 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-sora font-bold text-sm text-navy flex items-center gap-1.5">
                    <Filter className="w-3.5 h-3.5 text-[#ef4444]" /> Filters
                  </h3>
                  <button onClick={clearFilters} className="text-xs font-bold text-[#ef4444] hover:underline outline-none">Clear all</button>
                </div>

                <div className="h-px bg-red-50 animate-fade-in"></div>

                {/* Country checkboxes */}
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold text-[#94b0c4] uppercase tracking-wider block">Country</span>
                  {[
                    { flag: "🇨🇦", label: "Canada",          count: "1,240" },
                    { flag: "🇦🇪", label: "UAE / Dubai",     count: "980"   },
                    { flag: "🇬🇧", label: "United Kingdom",  count: "720"   },
                    { flag: "🇦🇺", label: "Australia",       count: "640"   },
                    { flag: "🇩🇪", label: "Germany",         count: "380"   },
                  ].map(item => (
                    <label key={item.label} className="flex items-center gap-2 cursor-pointer text-xs text-[#475569] font-semibold group">
                      <input type="checkbox" className="rounded text-[#ef4444] border-red-200 w-4 h-4 accent-[#ef4444]" />
                      <span className="flex-1 group-hover:text-navy transition-colors">{item.flag} {item.label}</span>
                      <span className="text-[10px] text-[#94b0c4] font-bold">{item.count}</span>
                    </label>
                  ))}
                </div>

                <div className="h-px bg-red-50"></div>

                {/* Job Category checkboxes */}
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold text-[#94b0c4] uppercase tracking-wider block">Job Category</span>
                  {[
                    { icon: Code2,        label: "IT & Tech",    count: "920" },
                    { icon: Stethoscope,  label: "Healthcare",   count: "680" },
                    { icon: HardHat,      label: "Engineering",  count: "540" },
                    { icon: ChefHat,      label: "Hospitality",  count: "310" },
                    { icon: GraduationCap,label: "Education",    count: "220" },
                  ].map(item => {
                    const CategoryIcon = item.icon;
                    return (
                      <label key={item.label} className="flex items-center gap-2 cursor-pointer text-xs text-[#475569] font-semibold group">
                        <input type="checkbox" className="rounded text-[#ef4444] border-red-200 w-4 h-4 accent-[#ef4444]" />
                        <CategoryIcon className="w-3.5 h-3.5 text-[#94b0c4] group-hover:text-[#ef4444] transition-colors" />
                        <span className="flex-1 group-hover:text-navy transition-colors">{item.label}</span>
                        <span className="text-[10px] text-[#94b0c4] font-bold">{item.count}</span>
                      </label>
                    );
                  })}
                </div>

                <div className="h-px bg-red-50"></div>

                {/* Perks toggles */}
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold text-[#94b0c4] uppercase tracking-wider block">Special Perks</span>
                  <label className="flex items-center gap-2 cursor-pointer" onClick={() => setSponsorOnly(!sponsorOnly)}>
                    <div className={`w-9 h-5 rounded-full transition-all relative ${sponsorOnly ? "bg-black" : "bg-gray-200"}`}>
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${sponsorOnly ? "left-4" : "left-0.5"}`} />
                    </div>
                    <span className="text-xs text-[#475569] font-semibold">✅ Visa Sponsored</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer" onClick={() => setRelocationOnly(!relocationOnly)}>
                    <div className={`w-9 h-5 rounded-full transition-all relative ${relocationOnly ? "bg-black" : "bg-gray-200"}`}>
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${relocationOnly ? "left-4" : "left-0.5"}`} />
                    </div>
                    <span className="text-xs text-[#475569] font-semibold">✈️ Relocation Package</span>
                  </label>
                </div>

                <button
                  onClick={applyFilters}
                  className="w-full bg-black hover:bg-neutral-900 text-white font-bold py-2.5 rounded-xl text-xs shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all outline-none"
                >
                  Apply Filters
                </button>
              </div>
            </aside>

            {/* JOBS GRID */}
            <div className="lg:col-span-9 space-y-4">
              <div className="bg-gradient-to-r from-red-50/50 to-white border border-red-100 border-l-4 border-l-black rounded-2xl p-4 flex gap-3">
                <Zap className="w-5 h-5 text-black shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-extrabold text-red-700 mb-0.5">Work Visa Help on Every Job</h4>
                  <p className="text-[11px] text-[#475569] font-semibold leading-normal">Every listing includes free work permit guidance. Apply and book a visa expert in one seamless flow.</p>
                </div>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="text-xs font-semibold text-gray-400">
                  <span className="text-[#0c1a2e] font-extrabold">{jobs.length} jobs</span> matching your preference
                </div>
                <select className="bg-white border border-red-100 rounded-xl px-3 py-1.5 text-xs font-bold text-[#475569] outline-none">
                  <option>Most Relevant</option>
                  <option>Newest Added</option>
                  <option>Highest Salary</option>
                </select>
              </div>

              {jobs.length === 0 ? (
                <div className="bg-white border border-red-100 rounded-2xl p-16 text-center shadow-sm">
                  <Briefcase className="w-10 h-10 text-red-100 mx-auto mb-3" />
                  <h3 className="font-sora font-extrabold text-[#0c1a2e] text-sm mb-1">No Jobs Found</h3>
                  <p className="text-xs text-[#94b0c4] font-semibold mb-4">Try clearing filters to broaden your search.</p>
                  <button onClick={clearFilters} className="text-xs font-bold text-[#ef4444] hover:underline outline-none">Clear All Filters</button>
                </div>
              ) : jobs.map(job => {
                const JobIcon = job.icon;
                return (
                  <div
                    key={job.id}
                    onClick={() => { setActiveJob(job); window.scrollTo(0, 0); }}
                    className={`group bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer ${
                      job.featured ? "border-l-4 border-l-[#ef4444] border-red-100" : "border-red-100"
                    }`}
                  >
                    <div className="relative h-28 overflow-hidden">
                      <img src={job.heroImg} alt={job.location} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a2e]/60 via-[#0c1a2e]/10 to-transparent"></div>

                      <div className="absolute top-2.5 right-2.5 flex gap-1.5">
                        {job.featured && <span className="bg-[#0c1a2e] text-white text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow">⭐ Featured</span>}
                        {job.urgent && <span className="bg-red-50 text-red-700 border border-red-200 text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-md">🔴 Urgent</span>}
                      </div>

                      <button
                        onClick={e => toggleSave(job.id, e)}
                        className="absolute top-2.5 left-2.5 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/50 hover:bg-white shadow-sm transition-all outline-none"
                      >
                        {saved.includes(job.id)
                          ? <Bookmark className="w-4 h-4 text-[#ef4444] fill-[#ef4444]" />
                          : <BookmarkPlus className="w-4 h-4 text-gray-400" />}
                      </button>

                      <div className="absolute bottom-2.5 left-4 flex items-center gap-2">
                        <img src={`https://flagcdn.com/w40/${job.countryCode}.png`} alt="flag" className="h-4 rounded shadow" />
                        <span className="text-white text-xs font-bold flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-red-200" />{job.location}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex gap-4 items-start mb-3 pr-4">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${job.iconColor} flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
                          <JobIcon className="w-5 h-5 text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-sora font-extrabold text-base text-[#0c1a2e] leading-snug group-hover:text-[#ef4444] transition-colors mb-1">
                            {job.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-xs text-[#475569] font-semibold">
                            <Building2 className="w-3 h-3 text-gray-300" />
                            {job.company}
                            <BadgeCheck className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-600 font-bold">Verified</span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="font-sora font-extrabold text-sm text-[#0c1a2e]">{job.salary}</div>
                          <div className="text-[10px] text-[#94b0c4] font-semibold">{job.salaryNote}</div>
                        </div>
                      </div>

                      <div className="flex gap-1.5 flex-wrap mb-3">
                        {job.tags.map(t => (
                          <span key={t} className="bg-red-50 text-red-600 border border-red-100 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider">{t}</span>
                        ))}
                        {job.sponsorship && <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase flex items-center gap-1"><CheckCircle className="w-2.5 h-2.5" />Visa Sponsored</span>}
                        {job.relocation  && <span className="bg-violet-50 text-violet-700 border border-violet-100 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase flex items-center gap-1"><Plane className="w-2.5 h-2.5" />Relocation</span>}
                      </div>

                      <p className="text-xs text-[#475569] leading-relaxed mb-4 font-medium line-clamp-2">{job.desc}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-red-50">
                        <div className="flex items-center gap-4 text-[11px] text-[#94b0c4] font-bold">
                          <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{job.type}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.posted}</span>
                        </div>
                        <button
                          onClick={e => { e.stopPropagation(); setActiveJob(job); window.scrollTo(0, 0); }}
                          className="bg-black hover:bg-neutral-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.97] transition-all flex items-center gap-1.5 group/btn outline-none"
                        >
                          Apply Now <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="text-center pt-4">
                <button
                  onClick={() => showToast("📄 Loading more jobs...")}
                  className="bg-white border border-gray-200 text-black font-bold text-xs px-7 py-3 rounded-xl hover:bg-gray-50 hover:shadow-sm active:scale-[0.98] transition-all shadow-sm outline-none"
                >
                  Load More Jobs →
                </button>
              </div>
            </div>
          </div>

          {/* VERIFIED RECRUITERS */}
          <div className="bg-white border-y border-red-100 text-left">
            <div className="max-w-6xl mx-auto px-6 py-12">
              <span className="text-[11px] font-extrabold text-[#ef4444] uppercase tracking-wider block mb-1">Verified Recruiters</span>
              <h2 className="font-sora font-extrabold text-[#0c1a2e] text-xl mb-6">Top Overseas Recruitment Agencies</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { name: "Priya Staffing Solutions", countries: "Canada · UK · Australia", rating: "4.9", reviews: 128, placed: "240 placed", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
                  { name: "Gulf Hiring Group",        countries: "UAE · Saudi Arabia · Qatar", rating: "4.8", reviews: 96,  placed: "580 placed", avatar: "https://randomuser.me/api/portraits/men/32.jpg"   },
                  { name: "EuroGlobal Placements",    countries: "Germany · France · Netherlands", rating: "4.8", reviews: 74,  placed: "310 placed", avatar: "https://randomuser.me/api/portraits/men/45.jpg"   },
                ].map(rc => (
                  <div
                    key={rc.name}
                    onClick={() => showToast(`Opening agency: ${rc.name}`)}
                    className="bg-[#fff5f5] border border-red-100 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img src={rc.avatar} alt={rc.name} className="w-11 h-11 rounded-xl object-cover border border-red-100 shadow-sm" />
                      <div>
                        <h4 className="font-sora font-bold text-xs text-[#0c1a2e] leading-snug">{rc.name}</h4>
                        <div className="text-[10px] text-[#475569] font-semibold mt-0.5">{rc.countries}</div>
                      </div>
                    </div>
                    <div className="flex gap-4 text-[11px] text-gray-400 font-bold mb-4">
                      <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />{rc.rating} · {rc.reviews} reviews</span>
                      <span>💼 {rc.placed}</span>
                    </div>
                    <button className="w-full bg-white border border-gray-200 text-black font-bold text-[11px] py-2 rounded-xl hover:bg-gray-50 transition-all outline-none">
                      View Agency →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PROCESS */}
          <div className="max-w-6xl mx-auto px-6 py-12 text-center">
            <span className="text-[11px] font-extrabold text-black uppercase tracking-wider block mb-1">Our Process</span>
            <h2 className="font-sora font-extrabold text-[#0c1a2e] text-xl mb-8">From Job Application to Landing Abroad</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { step: "01", title: "Search & Apply",      desc: "Browse 4,200+ jobs across 40+ countries with your ideal filters.",                    icon: Search,       color: "from-neutral-800 to-black"   },
                { step: "02", title: "Get Offer Letter",    desc: "Receive official employer letter — the key document for your work visa.",              icon: CheckCircle,  color: "from-neutral-700 to-neutral-900" },
                { step: "03", title: "Apply for Work Visa", desc: "VisaFormula immigration expert handles LMIA, DHA, TSS 482, and EU Blue Card.",             icon: Shield,       color: "from-neutral-800 to-black"},
                { step: "04", title: "Fly & Start Working", desc: "Settlement support: SIM card, accommodation, and onboarding assistance.",             icon: Plane,        color: "from-neutral-700 to-neutral-900" },
              ].map(hs => {
                const ProcessIcon = hs.icon;
                return (
                  <div key={hs.step} className="bg-white border border-gray-150 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${hs.color} flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
                      <ProcessIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-[10px] font-extrabold text-gray-300 tracking-widest mb-2">{hs.step}</div>
                    <h4 className="font-sora font-bold text-xs text-[#0c1a2e] mb-1.5 leading-snug">{hs.title}</h4>
                    <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">{hs.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA BOTTOM */}
          <div className="max-w-5xl mx-auto px-6 pb-16 text-center animate-fade-in">
            <div className="bg-gradient-to-r from-[#111111] via-[#1a1a1a] to-black rounded-3xl p-10 text-center shadow-2xl shadow-neutral-200">
              <Globe className="w-10 h-10 text-white/60 mx-auto mb-4" />
              <h2 className="font-sora font-extrabold text-white text-3xl mb-3">Ready to Work Abroad?</h2>
              <p className="text-white/70 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                Our immigration experts are ready to guide you from application to landing. Premium visa support, guaranteed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/find-experts?category=work" className="block">
                  <button className="bg-white text-black font-bold px-8 py-3.5 rounded-2xl text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 outline-none">
                    <Shield className="w-4 h-4" /> Talk to a Visa Expert
                  </button>
                </a>
                <button onClick={() => window.scrollTo(0, 0)} className="bg-white/15 border border-white/25 text-white font-bold px-8 py-3.5 rounded-2xl text-sm hover:bg-white/25 transition-all flex items-center gap-2 outline-none">
                  Browse All Jobs <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

