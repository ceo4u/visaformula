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

interface UniversityConsultant {
  id: string;
  name: string;
  agencyName: string;
  role: string;
  city: string;
  countries: { name: string; flag: string }[];
  rating: number;
  reviews: number;
  successRate: string;
  license: string;
  experience: string;
  specialities: string[];
  bio: string;
  phone: string;
  whatsapp: string;
  image: string;
  freeCounselling: boolean;
}

const studyConsultantsList: UniversityConsultant[] = [
  {
    id: "c1",
    name: "Arjun Mehta",
    agencyName: "Apex Study Abroad & Immigration",
    role: "Senior Canada University Admissions Specialist",
    city: "Hyderabad",
    countries: [{ name: "Canada", flag: "ca" }, { name: "USA", flag: "us" }],
    rating: 4.9,
    reviews: 412,
    successRate: "99.4%",
    license: "ICCRC-R705123",
    experience: "11+ Years",
    specialities: ["Canada Study Permit", "PGWP Pathways", "DLI Shortlisting", "SOP Writing"],
    bio: "Helped 1,400+ Indian students secure direct admissions and visa approvals into top Canadian institutions like U of T, UBC, McGill, Humber, and Seneca.",
    phone: "+91 98490 12345",
    whatsapp: "+919849012345",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces&q=80",
    freeCounselling: true
  },
  {
    id: "c2",
    name: "Nisha Agarwal",
    agencyName: "Global Scholar Consulting",
    role: "UK & Ireland University Admissions Counsellor",
    city: "Delhi NCR",
    countries: [{ name: "UK", flag: "gb" }, { name: "Ireland", flag: "ie" }],
    rating: 4.8,
    reviews: 328,
    successRate: "99.1%",
    license: "British Council Certified",
    experience: "8+ Years",
    specialities: ["Russell Group Universities", "Graduate Route Visa", "Scholarship Grants", "IELTS Waiver"],
    bio: "Specialized in UK Master's and Bachelor's admissions with 100% visa success track record. Facilitated over £1.2M in university scholarships.",
    phone: "+91 98110 54321",
    whatsapp: "+919811054321",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces&q=80",
    freeCounselling: true
  },
  {
    id: "c3",
    name: "Dr. Sandeep Kulkarni",
    agencyName: "EuroEd Pathways & Mobility",
    role: "Germany & Europe Public Universities Advisor",
    city: "Pune",
    countries: [{ name: "Germany", flag: "de" }, { name: "Cyprus", flag: "cy" }, { name: "Austria", flag: "at" }],
    rating: 5.0,
    reviews: 289,
    successRate: "98.8%",
    license: "BAMF-Certified Consultant",
    experience: "14+ Years",
    specialities: ["Tuition-Free Public Universities", "APS Certificate", "Blocked Account Setup", "Chancenkarte"],
    bio: "Assists STEM and Engineering students in gaining admission to top German TU9 universities and Cyprus 100% visa colleges with English-taught programs.",
    phone: "+91 98220 98765",
    whatsapp: "+919822098765",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces&q=80",
    freeCounselling: true
  },
  {
    id: "c4",
    name: "Priya Sharma",
    agencyName: "Southern Cross Migration & Study",
    role: "Australia & New Zealand Certified Counsellor",
    city: "Mumbai",
    countries: [{ name: "Australia", flag: "au" }, { name: "New Zealand", flag: "nz" }],
    rating: 4.9,
    reviews: 512,
    successRate: "99.2%",
    license: "MARA-1804210 / QEAC Certified",
    experience: "10+ Years",
    specialities: ["Group of Eight (Go8)", "Subclass 500 Visa", "Genuine Student (GS) Prep", "Post-Study Work"],
    bio: "Ex-admissions officer guiding students through Australian university offers, GTE/GS statement drafting, and seamless student visa grant processing.",
    phone: "+91 98200 45678",
    whatsapp: "+919820045678",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=faces&q=80",
    freeCounselling: true
  },
  {
    id: "c5",
    name: "Karthik Reddy",
    agencyName: "Silicon Valley Student Visas",
    role: "USA STEM Universities & F-1 Visa Strategist",
    city: "Bangalore",
    countries: [{ name: "USA", flag: "us" }],
    rating: 4.8,
    reviews: 375,
    successRate: "98.5%",
    license: "AIRC Certified Counsellor",
    experience: "9+ Years",
    specialities: ["F-1 Visa Mock Interviews", "STEM OPT 3-Year", "I-20 Shortlisting", "Assistantships"],
    bio: "Expert in F-1 Visa mock interviews and funding guidance for MS in CS, Data Science, AI, and MBA programs at top tier US universities.",
    phone: "+91 98450 78901",
    whatsapp: "+919845078901",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces&q=80",
    freeCounselling: true
  },
  {
    id: "c6",
    name: "Vikram Singh",
    agencyName: "Gulf & Asia EduLink",
    role: "Singapore & Dubai International Campuses Expert",
    city: "Ahmedabad",
    countries: [{ name: "Singapore", flag: "sg" }, { name: "UAE", flag: "ae" }, { name: "Cyprus", flag: "cy" }],
    rating: 4.7,
    reviews: 215,
    successRate: "99.0%",
    license: "Global EduPartner Verified",
    experience: "7+ Years",
    specialities: ["Fast-Track Student Pass", "Affordable Living Hubs", "October & Jan Intakes", "Corporate Internships"],
    bio: "Direct university partner for Curtin Singapore, James Cook, Middlesex Dubai, and European universities with direct employment links.",
    phone: "+91 98790 23456",
    whatsapp: "+919879023456",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=faces&q=80",
    freeCounselling: true
  }
];

const initialUniversities: University[] = [
  {
    id: "cyprus-october-intake",
    name: "Study In Cyprus (October Intake - 100% Visa)",
    location: "Cyprus (Europe)",
    country: "Cyprus",
    countryCode: "cy",
    category: "Higher Education",
    tuition: "€3,300–€5,000",
    tuitionNote: "per year",
    posted: "1d ago",
    degreeType: "Foundation / Bachelor's / Master's",
    pgwp: true,
    scholarships: true,
    featured: true,
    urgent: true,
    logo: "/images/cyprus.jpg",
    heroImg: "/images/cyprus-ad.jpg",
    tags: ["100% Visa", "October Intake", "Zero Apostille Fees", "Part-Time Work Allowed"],
    desc: "Last chance for October Intake in Cyprus! Limited Seats Available with Zero Apostille & Documentation Charges. Fees: Foundation (€3300), Bachelor's (€3800), Master's (€5000). 100% transparency & complete support till visa. Submit your application or partnership call: 9044854415 / www.gugportal.com.",
    rank: "🔥 Top Featured Ad",
    ieltsMin: "No IELTS Mandatory"
  },
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
    name: "Imperial College London",
    location: "London, UK",
    country: "UK",
    countryCode: "gb",
    category: "IT & Tech",
    tuition: "£32K–£44K",
    tuitionNote: "per year",
    posted: "3d ago",
    degreeType: "Master's",
    pgwp: true,
    scholarships: false,
    featured: true,
    urgent: false,
    logo: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=200&h=200&fit=crop&q=90",
    heroImg: "/images/univ_imperial_night.png",
    tags: ["World Top 10", "UK Graduate Visa Eligible", "Global Tech Network"],
    desc: "Global leader in science, engineering and medicine. Graduates receive automatic 2-year post-study work authorization under the UK Graduate Route.",
    rank: "#6 Global",
    ieltsMin: "7.0 Overall"
  },
  {
    id: "4",
    name: "Technical University of Munich (TUM)",
    location: "Munich, Germany",
    country: "Germany",
    countryCode: "de",
    category: "Engineering",
    tuition: "€0 (Free Tuition)",
    tuitionNote: "admin fee only",
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
  { name: "Cyprus",      code: "cy", jobs: "15 universities",  img: "/images/cyprus.jpg" },
  { name: "Canada",      code: "ca", jobs: "150 universities", img: "/images/dest_canada_cold.png" },
  { name: "Singapore",  code: "sg", jobs: "45 universities",  img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&h=300&fit=crop&q=90" },
  { name: "UK",          code: "gb", jobs: "120 universities", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&h=300&fit=crop&q=90" },
  { name: "Australia",   code: "au", jobs: "85 universities",  img: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=500&h=300&fit=crop&q=90" },
];

const streamsList = ["All Categories", "Higher Education", "IT & Tech", "Business", "Engineering", "Arts"];
const countriesList = ["All Countries", "Cyprus", "Canada", "Australia", "UK", "USA", "Germany", "Singapore", "Ireland", "New Zealand"];
const consultantCitiesList = ["All Cities", "Hyderabad", "Delhi NCR", "Mumbai", "Bangalore", "Pune", "Ahmedabad", "Remote"];

export function UniversitiesPortal() {
  // Main Search Mode: 'universities' | 'consultants'
  const [activeMode, setActiveMode] = useState<"universities" | "consultants">("universities");

  // Universities search state
  const [universities, setUniversities] = useState(initialUniversities);
  const [saved, setSaved] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [activeChip, setActiveChip] = useState("All Universities");
  const [activeUniv, setActiveUniv] = useState<University | null>(null);
  const [pgwpOnly, setPgwpOnly] = useState(false);
  const [scholarshipOnly, setScholarshipOnly] = useState(false);

  // Consultants search state
  const [consultantSearch, setConsultantSearch] = useState("");
  const [consultantCountry, setConsultantCountry] = useState("All Countries");
  const [consultantCity, setConsultantCity] = useState("All Cities");
  const [consultants, setConsultants] = useState<UniversityConsultant[]>(studyConsultantsList);
  const [activeConsultant, setActiveConsultant] = useState<UniversityConsultant | null>(null);
  const [counsellingModalOpen, setCounsellingModalOpen] = useState(false);
  const [counsellingSuccess, setCounsellingSuccess] = useState(false);
  const [studentForm, setStudentForm] = useState({ name: "", phone: "", email: "", targetCountry: "Canada", course: "Master's Degree" });

  const [toastMsg, setToastMsg] = useState("");
  const [toastOn, setToastOn] = useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const countryParam = searchParams.get("country");
      const adParam = searchParams.get("ad");
      const tabParam = searchParams.get("tab") || searchParams.get("mode") || searchParams.get("category");
      
      if (tabParam === "consultants" || tabParam === "consultant" || tabParam === "experts" || tabParam === "student") {
        setActiveMode("consultants");
      }

      if (countryParam) {
        const foundC = countriesList.find(c => c.toLowerCase() === countryParam.toLowerCase());
        if (foundC) {
          setSelectedCountry(foundC);
          setConsultantCountry(foundC);
        }
      }

      if (adParam === "cyprus" || countryParam?.toLowerCase() === "cyprus") {
        const cyprusItem = initialUniversities.find(u => u.country.toLowerCase() === "cyprus");
        if (cyprusItem) {
          setActiveUniv(cyprusItem);
        }
      }
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg); setToastOn(true);
    setTimeout(() => setToastOn(false), 2500);
  };

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    showToast(saved.includes(id) ? "Removed from saved" : "Saved to bookmarks!");
  };

  // Universities filtering
  const applyFilters = () => {
    let f = initialUniversities;
    if (searchQuery) f = f.filter(u =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    if (selectedCountry !== "All Countries") f = f.filter(u => u.country.toLowerCase() === selectedCountry.toLowerCase());
    if (selectedCategory !== "All Categories") f = f.filter(u => u.category.toLowerCase() === selectedCategory.toLowerCase());
    if (pgwpOnly) f = f.filter(u => u.pgwp);
    if (scholarshipOnly) f = f.filter(u => u.scholarships);
    setUniversities(f);
  };

  // Consultants filtering
  const applyConsultantFilters = () => {
    let f = studyConsultantsList;
    if (consultantSearch.trim()) {
      const q = consultantSearch.toLowerCase();
      f = f.filter(c => 
        c.name.toLowerCase().includes(q) ||
        c.agencyName.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q) ||
        c.specialities.some(s => s.toLowerCase().includes(q)) ||
        c.bio.toLowerCase().includes(q)
      );
    }
    if (consultantCountry !== "All Countries") {
      f = f.filter(c => c.countries.some(country => country.name.toLowerCase() === consultantCountry.toLowerCase()));
    }
    if (consultantCity !== "All Cities") {
      f = f.filter(c => c.city.toLowerCase() === consultantCity.toLowerCase());
    }
    setConsultants(f);
  };

  React.useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedCountry, selectedCategory, pgwpOnly, scholarshipOnly]);

  React.useEffect(() => {
    applyConsultantFilters();
  }, [consultantSearch, consultantCountry, consultantCity]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCountry("All Countries");
    setSelectedCategory("All Categories");
    setActiveChip("All Universities");
    setPgwpOnly(false);
    setScholarshipOnly(false);
    setUniversities(initialUniversities);
  };

  const clearConsultantFilters = () => {
    setConsultantSearch("");
    setConsultantCountry("All Countries");
    setConsultantCity("All Cities");
    setConsultants(studyConsultantsList);
  };

  const filterByChip = (chip: string) => {
    setActiveChip(chip);
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
    <div className="bg-white min-h-screen text-[#1a3347] font-sans relative pb-16">
      {/* TOAST */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0c1a2e] text-white px-6 py-3 rounded-full text-xs font-bold z-[999] shadow-xl transition-all duration-300 ${toastOn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
        {toastMsg}
      </div>

        {/* MAIN LISTING VIEW */}
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-10">
          {/* Main Twilight Universities Banner Container */}
          <div 
              className="relative w-full rounded-[40px] overflow-hidden flex flex-col items-center justify-center text-center px-6 py-20 min-h-[540px] md:min-h-[600px] shadow-2xl border border-white/10"
              style={{ background: '#0C1A2E' }}
          >
              {/* Background Image with Crisp Contrast & Clean Shading */}
              <div className="absolute inset-0 z-0">
                  <img 
                      src="/univ_grad_girls.png" 
                      alt="University Graduates" 
                      className="w-full h-full object-cover brightness-[0.7] contrast-[1.1] object-center"
                  />
                  {/* A soft transparent overlay for text readability without extra shading */}
                  <div 
                      className="absolute inset-0 bg-black/35"
                  />
              </div>

              {/* Banner Content */}
              <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                  
                  {/* Active status pill */}
                  <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-xs font-bold text-white/80 mb-6 backdrop-blur-sm">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    150+ Verified Global Universities · PGWP Work Permits Included
                  </div>

                  {/* Main Serif Header */}
                  <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-tight tracking-wide mb-2 drop-shadow-md">
                      Find Your Dream Overseas University.
                  </h1>



                  {/* 3-Column Metadata Row */}
                  <div className="grid grid-cols-3 gap-8 md:gap-16 text-center mb-10 w-full max-w-lg">
                      <div>
                          <span className="text-[9px] text-gray-300 font-bold uppercase tracking-wider block mb-1">UNIVERSITIES</span>
                          <span className="text-[11px] text-white font-extrabold tracking-wide uppercase block">150+ VERIFIED</span>
                      </div>
                      <div>
                          <span className="text-[9px] text-gray-300 font-bold uppercase tracking-wider block mb-1">STUDENT VISA</span>
                          <span className="text-[11px] text-white font-extrabold tracking-wide uppercase block">100% SUCCESS</span>
                      </div>
                      <div>
                          <span className="text-[9px] text-gray-300 font-bold uppercase tracking-wider block mb-1">COUNTRIES</span>
                          <span className="text-[11px] text-white font-extrabold tracking-wide uppercase block">20+ SPACES</span>
                      </div>
                  </div>

                  {/* Pill CTA Button */}
                  <button 
                      onClick={() => {
                          const el = document.getElementById("univ-search-bar");
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-300 transform hover:scale-[1.02] shadow-xl tracking-wider active:scale-[0.98] select-none"
                  >
                      Browse Vetted Universities
                  </button>
              </div>
          </div>

          {/* Search bar below the banner with Mode Switcher */}
          <div id="univ-search-bar" className="mt-8 bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-xl max-w-4xl mx-auto space-y-4">
            {/* Mode Switcher Tabs */}
            <div className="flex items-center justify-center p-1 bg-slate-100 rounded-2xl max-w-md mx-auto">
              <button
                type="button"
                onClick={() => setActiveMode("universities")}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeMode === "universities"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Explore Universities</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMode("consultants")}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeMode === "consultants"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Find University Consultants</span>
              </button>
            </div>

            {/* MODE 1: UNIVERSITIES SEARCH FORM */}
            {activeMode === "universities" ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center">
                  <div className="md:col-span-3">
                    <label className="text-[10px] font-bold tracking-normal text-slate-500 block mb-1.5 text-left">University / Course</label>
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Search e.g. Toronto, MBA, Computer Science..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-slate-900 transition-all"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold tracking-normal text-slate-500 block mb-1.5 text-left">Destination Country</label>
                    <div className="relative">
                      <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <select
                        value={selectedCountry}
                        onChange={e => setSelectedCountry(e.target.value)}
                        className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-slate-900 transition-all appearance-none cursor-pointer"
                      >
                        {countriesList.map(c => <option key={c} value={c} className="text-slate-900 bg-white">{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold tracking-normal text-slate-500 block mb-1.5 text-left">Field / Discipline</label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <select
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                        className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-slate-900 transition-all appearance-none cursor-pointer"
                      >
                        {streamsList.map(c => <option key={c} value={c} className="text-slate-900 bg-white">{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 mt-2 pt-3 border-t border-slate-100">
                  <label className="flex items-center gap-2 cursor-pointer select-none" onClick={() => setPgwpOnly(!pgwpOnly)}>
                    <div className={`w-9 h-5 rounded-full transition-all relative ${pgwpOnly ? "bg-slate-900" : "bg-slate-200"}`}>
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${pgwpOnly ? "left-4" : "left-0.5"}`} />
                    </div>
                    <span className="text-xs font-semibold text-slate-700">PGWP Eligible Only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none" onClick={() => setScholarshipOnly(!scholarshipOnly)}>
                    <div className={`w-9 h-5 rounded-full transition-all relative ${scholarshipOnly ? "bg-slate-900" : "bg-slate-200"}`}>
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${scholarshipOnly ? "left-4" : "left-0.5"}`} />
                    </div>
                    <span className="text-xs font-semibold text-slate-700">Scholarships Available</span>
                  </label>
                </div>
              </>
            ) : (
              /* MODE 2: CONSULTANTS SEARCH FORM */
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center">
                  <div className="md:col-span-3">
                    <label className="text-[10px] font-bold tracking-normal text-slate-500 block mb-1.5 text-left">Search Consultant / Agency</label>
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Search e.g. Arjun Mehta, Canada Visa, SOP..."
                        value={consultantSearch}
                        onChange={e => setConsultantSearch(e.target.value)}
                        className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-slate-900 transition-all"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold tracking-normal text-slate-500 block mb-1.5 text-left">Country Specialty</label>
                    <div className="relative">
                      <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <select
                        value={consultantCountry}
                        onChange={e => setConsultantCountry(e.target.value)}
                        className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-slate-900 transition-all appearance-none cursor-pointer"
                      >
                        {countriesList.map(c => <option key={c} value={c} className="text-slate-900 bg-white">{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold tracking-normal text-slate-500 block mb-1.5 text-left">Consultant City</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <select
                        value={consultantCity}
                        onChange={e => setConsultantCity(e.target.value)}
                        className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-slate-900 transition-all appearance-none cursor-pointer"
                      >
                        {consultantCitiesList.map(c => <option key={c} value={c} className="text-slate-900 bg-white">{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="font-semibold text-slate-500">
                    Showing <strong className="text-slate-900">{consultants.length}</strong> verified study abroad experts
                  </span>
                  <button
                    type="button"
                    onClick={clearConsultantFilters}
                    className="text-slate-700 hover:text-slate-900 font-bold hover:underline"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Chips (Only for Universities Mode) */}
          {activeMode === "universities" && (
            <div className="flex gap-2 flex-wrap mt-5 justify-center">
              {["All Universities", "IT & Tech", "Business", "Engineering", "Arts"].map(chip => (
                <button
                  key={chip}
                  onClick={() => filterByChip(chip)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold border shrink-0 transition-all outline-none cursor-pointer ${
                    activeChip === chip
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* STATS BAR */}
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap gap-6 items-center justify-between">
            <div className="flex items-center gap-8 flex-wrap">
              {[
                { icon: Library, value: "150+", label: "Verified Universities" },
                { icon: Users, value: "850+", label: "Certified Study Consultants" },
                { icon: Globe, value: "20+", label: "Target Countries" },
                { icon: BadgeCheck, value: "99.4%", label: "Visa Approval Rate" },
              ].map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-slate-900" />
                    <span className="font-sans font-extrabold text-slate-900 text-base">{s.value}</span>
                    <span className="text-[11px] font-bold text-slate-500">{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* VIEW 1: UNIVERSITIES LISTINGS GRID */}
        {/* ======================================================= */}
        {activeMode === "universities" ? (
          <>
            {/* DESTINATION CARDS */}
            <div className="max-w-6xl mx-auto px-6 pt-12 pb-2 text-left">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <span className="text-[11px] font-semibold text-slate-900 tracking-wider block mb-1">Browse by Destination</span>
                  <h2 className="font-sans font-extrabold text-[#0c1a2e] text-2xl">Where Do You Want to Study?</h2>
                </div>
                <button onClick={clearFilters} className="text-xs font-bold text-slate-900 hover:underline outline-none cursor-pointer">View All →</button>
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
                      <div className="text-white font-sans font-extrabold text-sm leading-snug">{c.name}</div>
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
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm sticky top-28 space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-sans font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <Filter className="w-3.5 h-3.5 text-slate-900" /> Filters
                    </h3>
                    <button onClick={clearFilters} className="text-xs font-bold text-slate-900 hover:underline outline-none cursor-pointer">Clear all</button>
                  </div>

                  <div className="h-px bg-slate-100"></div>

                  {/* Country checkboxes */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-800 tracking-normal block">Country</span>
                    {[
                      { flag: "🇨🇾", label: "Cyprus",          count: "15" },
                      { flag: "🇨🇦", label: "Canada",          count: "150" },
                      { flag: "🇸🇬", label: "Singapore",        count: "45"   },
                      { flag: "🇬🇧", label: "United Kingdom",  count: "120"   },
                      { flag: "🇦🇺", label: "Australia",       count: "85"   },
                    ].map(item => (
                      <label key={item.label} className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 font-medium group">
                        <input type="checkbox" className="rounded border-slate-200 w-4 h-4 accent-slate-900" />
                        <span className="flex-1 group-hover:text-slate-900 transition-colors">{item.flag} {item.label}</span>
                        <span className="text-[10px] text-slate-400 font-bold">{item.count}</span>
                      </label>
                    ))}
                  </div>

                  <div className="h-px bg-slate-100"></div>

                  {/* Stream Category checkboxes */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-800 tracking-normal block">Field / Stream</span>
                    {[
                      { icon: Code2,        label: "IT & Tech",    count: "78" },
                      { icon: Stethoscope,  label: "Healthcare",   count: "35" },
                      { icon: HardHat,      label: "Engineering",  count: "62" },
                      { icon: ChefHat,      label: "Hospitality",  count: "24" },
                      { icon: GraduationCap,label: "Education",    count: "40" },
                    ].map(item => {
                      const CategoryIcon = item.icon;
                      return (
                        <label key={item.label} className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 font-medium group">
                          <input type="checkbox" className="rounded border-slate-200 w-4 h-4 accent-slate-900" />
                          <CategoryIcon className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                          <span className="flex-1 group-hover:text-slate-900 transition-colors">{item.label}</span>
                          <span className="text-[10px] text-slate-400 font-bold">{item.count}</span>
                        </label>
                      );
                    })}
                  </div>

                  <div className="h-px bg-slate-100"></div>

                  {/* Perks toggles */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-800 tracking-normal block">Student Visa Perks</span>
                    <label className="flex items-center gap-2 cursor-pointer" onClick={() => setPgwpOnly(!pgwpOnly)}>
                      <div className={`w-9 h-5 rounded-full transition-all relative ${pgwpOnly ? "bg-slate-900" : "bg-slate-200"}`}>
                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${pgwpOnly ? "left-4" : "left-0.5"}`} />
                      </div>
                      <span className="text-xs text-slate-600 font-semibold">PGWP Eligible</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer" onClick={() => setScholarshipOnly(!scholarshipOnly)}>
                      <div className={`w-9 h-5 rounded-full transition-all relative ${scholarshipOnly ? "bg-slate-900" : "bg-slate-200"}`}>
                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${scholarshipOnly ? "left-4" : "left-0.5"}`} />
                      </div>
                      <span className="text-xs text-slate-600 font-semibold">Scholarships Available</span>
                    </label>
                  </div>

                  <button
                    onClick={applyFilters}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs shadow-md hover:shadow-lg transition-all outline-none cursor-pointer"
                  >
                    Apply Filters
                  </button>
                </div>
              </aside>

              {/* LISTINGS */}
              <div className="lg:col-span-9 space-y-4">
                <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 border-l-4 border-l-slate-900 rounded-2xl p-4 flex gap-3">
                  <Zap className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900 mb-0.5">Verified Student Visa Pathways</h4>
                    <p className="text-[11px] text-slate-600 font-semibold leading-normal">Every listing includes verified post-graduation work permit (PGWP) guides. Get admission assistance in one tap.</p>
                  </div>
                </div>

                {universities.map(univ => (
                  <div
                    key={univ.id}
                    onClick={() => setActiveUniv(univ)}
                    className="bg-white border border-slate-200/90 rounded-[22px] p-5 hover:shadow-xl hover:border-slate-900/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row gap-5 items-start justify-between relative group shadow-xs"
                  >
                    <div className="flex gap-4 items-center w-full">
                      <img src={univ.logo} alt={univ.name} className="w-16 h-16 rounded-[18px] object-cover border border-slate-100 shrink-0 shadow-sm" />
                      <div className="flex-grow min-w-0">
                        <h3 className="font-sans font-bold text-lg text-slate-900 mb-1.5 leading-snug group-hover:text-slate-700 transition-colors">{univ.name}</h3>
                        <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-600 font-semibold">
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-900" />{univ.location}</span>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-slate-900" />{univ.tuition} <span className="text-slate-400 font-normal">{univ.tuitionNote}</span></span>
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-3 w-full sm:w-auto shrink-0 border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
                      <div className="text-[11px] text-slate-400 font-medium tracking-wide">{univ.posted}</div>
                      <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wide px-5 py-2 rounded-full flex items-center gap-1.5 transition-all outline-none shrink-0 shadow-sm active:scale-95 cursor-pointer">
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* ======================================================= */
          /* VIEW 2: UNIVERSITY CONSULTANTS LISTINGS GRID */
          /* ======================================================= */
          <div className="max-w-6xl mx-auto px-6 py-10 space-y-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Verified Network</span>
                <h2 className="font-sans font-extrabold text-2xl text-slate-900">Certified University Admissions Consultants</h2>
                <p className="text-xs text-slate-500 mt-0.5">Connect directly with licensed education counsellors for college shortlisting, SOPs, scholarships &amp; student visas.</p>
              </div>
              <a
                href="https://wa.me/917661989366?text=Hi%20TravlTik,%20I%20need%20help%20finding%20the%20best%20study%20abroad%20consultant"
                target="_blank"
                rel="noreferrer"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-3 rounded-2xl flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
              >
                <span>Free Concierge Match</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {consultants.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
                <Users className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">No consultants found for this filter</h3>
                <p className="text-xs text-slate-500">Try changing your destination country or city filter.</p>
                <button
                  onClick={clearConsultantFilters}
                  className="bg-slate-900 text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-slate-800 transition-all cursor-pointer"
                >
                  View All Consultants
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {consultants.map(consultant => (
                  <div
                    key={consultant.id}
                    className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-xl hover:border-slate-900/30 transition-all duration-300 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3.5">
                      {/* Top Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3.5">
                          <img
                            src={consultant.image}
                            alt={consultant.name}
                            className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-bold text-base text-slate-900 leading-tight">{consultant.name}</h3>
                              <BadgeCheck className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                            </div>
                            <p className="text-xs font-semibold text-slate-600 mt-0.5">{consultant.agencyName}</p>
                            <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-slate-400" /> {consultant.city} • {consultant.experience}
                            </span>
                          </div>
                        </div>

                        {/* Rating & License Badge */}
                        <div className="text-right">
                          <div className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-lg text-xs font-bold text-amber-700">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>{consultant.rating}</span>
                            <span className="text-[10px] text-amber-600 font-normal">({consultant.reviews})</span>
                          </div>
                          <span className="block text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                            {consultant.license}
                          </span>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-xs text-slate-600 font-normal leading-relaxed line-clamp-2">
                        {consultant.bio}
                      </p>

                      {/* Country Badges */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">Admissions:</span>
                        {consultant.countries.map(c => (
                          <span
                            key={c.name}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold border border-slate-200"
                          >
                            <img src={`https://flagcdn.com/w40/${c.flag}.png`} alt={c.name} className="w-3.5 h-2.5 object-cover rounded-xs" />
                            <span>{c.name}</span>
                          </span>
                        ))}
                        <span className="ml-auto text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {consultant.successRate} Visa Rate
                        </span>
                      </div>

                      {/* Specialities tags */}
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        {consultant.specialities.map((spec, i) => (
                          <span key={i} className="text-[10px] font-medium text-slate-600 bg-slate-50 border border-slate-200/70 px-2 py-0.5 rounded-md">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                      <a
                        href={`https://wa.me/${consultant.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${consultant.name}, I found your profile on TravlTik for university admission and student visa guidance.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Chat on WhatsApp</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleBookCounselling(consultant)}
                        className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                      >
                        <span>Book Counselling</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* COUNSELLING MODAL */}
        {counsellingModalOpen && activeConsultant && (
          <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 font-sans">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 relative shadow-2xl border border-slate-200 text-left space-y-4">
              <button
                type="button"
                onClick={() => setCounsellingModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center transition-all cursor-pointer"
              >
                ✕
              </button>

              <div>
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
                  100% Free 1-on-1 Profile Assessment
                </div>
                <h3 className="font-bold text-lg text-slate-900">Book Session with {activeConsultant.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{activeConsultant.role} ({activeConsultant.agencyName})</p>
              </div>

              {counsellingSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2">
                  <BadgeCheck className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-base text-emerald-950">Request Confirmed!</h4>
                  <p className="text-xs text-emerald-800">
                    {activeConsultant.name} will contact you on WhatsApp &amp; Phone ({studentForm.phone || "your number"}) within 2 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={submitCounsellingForm} className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={studentForm.name}
                      onChange={e => setStudentForm({ ...studentForm, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">WhatsApp Phone</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={studentForm.phone}
                        onChange={e => setStudentForm({ ...studentForm, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Target Country</label>
                      <select
                        value={studentForm.targetCountry}
                        onChange={e => setStudentForm({ ...studentForm, targetCountry: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-slate-900"
                      >
                        {["Canada", "UK", "USA", "Australia", "Germany", "Cyprus", "Singapore", "Ireland"].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Target Degree / Course</label>
                    <input
                      type="text"
                      placeholder="e.g. Master's in Computer Science, MBA, B.Tech"
                      value={studentForm.course}
                      onChange={e => setStudentForm({ ...studentForm, course: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-slate-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wide shadow-md transition-all cursor-pointer mt-2"
                  >
                    Confirm Free Profile Assessment
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

          {/* AD DETAIL POPUP MODAL */}
          {activeUniv && (
        <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-sans">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-4 sm:p-6 relative shadow-2xl border border-slate-200 my-auto max-h-[92vh] overflow-y-auto flex flex-col">
            <button
              onClick={() => setActiveUniv(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center transition-all z-20 outline-none shadow-sm cursor-pointer"
            >
              ✕
            </button>

            {/* Banner Image Container */}
            <div className="relative rounded-2xl overflow-hidden mb-4 border border-slate-100 shadow-xs bg-white w-full flex items-center justify-center shrink-0">
              <img src={activeUniv.heroImg} alt={activeUniv.location} className="w-full h-auto max-h-[320px] sm:max-h-[420px] object-contain rounded-xl" />
              <div className="absolute bottom-3 left-4 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
                <img src={`https://flagcdn.com/w40/${activeUniv.countryCode}.png`} alt="flag" className="h-4 rounded shadow" />
                <span className="text-white font-bold text-xs flex items-center gap-1.5 font-sans">
                  <MapPin className="w-3.5 h-3.5 text-red-400" /> {activeUniv.location}
                </span>
              </div>
            </div>

            <div className="text-left space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-extrabold text-cyan-600 bg-cyan-50 border border-cyan-100 px-2.5 py-1 rounded-full uppercase tracking-wider inline-block">
                    OCTOBER INTAKE • 100% VISA
                  </span>
                  <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
                    <BadgeCheck className="w-4 h-4 text-emerald-500" /> Verified Pathway
                  </span>
                </div>
                <h2 className="font-sans font-extrabold text-lg sm:text-xl text-[#0c1a2e] leading-snug">{activeUniv.name}</h2>
                <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">{activeUniv.desc}</p>
              </div>

              {/* Program Fee Breakdown */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                <span className="text-[9px] sm:text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2.5">Tuition Fee Structure</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Foundation Program</span>
                    <span className="font-sans font-extrabold text-base text-[#159BB8]">€ 3,300</span>
                    <span className="text-[10px] text-slate-400 block font-normal">per year</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Bachelor's Program</span>
                    <span className="font-sans font-extrabold text-base text-[#159BB8]">€ 3,800</span>
                    <span className="text-[10px] text-slate-400 block font-normal">per year</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Master's Program</span>
                    <span className="font-sans font-extrabold text-base text-[#159BB8]">€ 5,000</span>
                    <span className="text-[10px] text-slate-400 block font-normal">per year</span>
                  </div>
                </div>
              </div>

              {/* Highlights & Inclusions */}
              <div>
                <h4 className="text-[11px] font-extrabold text-[#0c1a2e] uppercase tracking-wider mb-2">Key Highlights & Admissions Perks:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                  {[
                    "100% Visa Approval Guarantee",
                    "Zero Apostille & Documentation Charges",
                    "Part-Time Work Allowed While Studying",
                    "Affordable Tuition & Living Costs",
                    "Easy Admission & Direct Processing",
                    "Complete Support Till Visa Approval"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Actions Bar */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="text-xs font-bold text-slate-600 text-center sm:text-left">
                  Direct Contact: <a href="https://www.gugportal.com" target="_blank" rel="noreferrer" className="text-[#159BB8] hover:underline font-extrabold">www.gugportal.com</a>
                </div>
                <a
                  href="https://wa.me/919044854415?text=Hi,%20I%20am%20interested%20in%20Study%20in%20Cyprus%20October%20Intake%202026."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto bg-black hover:bg-neutral-900 text-white font-extrabold text-xs px-6 py-3 rounded-full flex items-center justify-center gap-2 shadow-lg transition-all outline-none active:scale-95 shrink-0"
                >
                  <span>Apply / Register (+91 9044854415)</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
