import React, { useState, useEffect } from 'react';
import {
  Search, ShieldCheck, FileText, Users, CheckCircle2,
  Clock, ChevronRight, Globe, Download, ChevronDown, User,
  LayoutGrid, UserCheck, Building2, Briefcase, Scale, MoreHorizontal,
  GraduationCap, Home, Smartphone, Compass, Sparkles, MapPin, SlidersHorizontal, Check, ArrowRight
} from 'lucide-react';
import { trackAdClick, handleAdClickWithAuth } from '../../utils/trackAdClick';

export function DesktopHomeSection() {
  // Main Search Category Tabs: 'consultant' | 'universities' | 'relocation' | 'jobs' | 'lawyers'
  const [activeCategory, setActiveCategory] = useState<'consultant' | 'universities' | 'relocation' | 'jobs' | 'lawyers'>('consultant');
  const [activeTab, setActiveTab] = useState('All');

  // --- TAB 1: Universities Search States ---
  const [courseLevel, setCourseLevel] = useState('Select Course Level');
  const [uniCountry, setUniCountry] = useState('Select Country');
  const [courseKeyword, setCourseKeyword] = useState('');
  const [courseLevelOpen, setCourseLevelOpen] = useState(false);
  const [uniCountryOpen, setUniCountryOpen] = useState(false);

  // --- TAB 2: Consultant Search States ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Select Country');
  const [location, setLocation] = useState('');
  const [selectedVisaType, setSelectedVisaType] = useState('Select Category');
  const [consultantType, setConsultantType] = useState<'All' | 'Freelancer' | 'Registered Agency'>('All');
  const [consultantMode, setConsultantMode] = useState<'All' | 'Online' | 'Offline' | 'Both'>('All');
  const [countryOpen, setCountryOpen] = useState(false);
  const [visaTypeOpen, setVisaTypeOpen] = useState(false);

  // --- TAB 3: Relocation Assistance States ---
  const [relocCountry, setRelocCountry] = useState('Canada');
  const [relocService, setRelocService] = useState('Accommodation');

  useEffect(() => {
    const handleClose = () => {
      setCountryOpen(false);
      setVisaTypeOpen(false);
      setCourseLevelOpen(false);
      setUniCountryOpen(false);
    };
    window.addEventListener('click', handleClose);
    return () => window.removeEventListener('click', handleClose);
  }, []);

  // --- TAB 1: Universities Search Handlers ---
  const handleFindUniversities = () => {
    const params = new URLSearchParams();
    if (uniCountry && uniCountry !== 'Select Country') params.set('country', uniCountry);
    if (courseLevel && courseLevel !== 'Select Course Level') params.set('level', courseLevel);
    if (courseKeyword.trim()) params.set('q', courseKeyword.trim());
    window.location.href = `/universities?${params.toString()}`;
  };

  const handleFindStudyConsultants = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const params = new URLSearchParams();
          params.set('category', 'student');
          if (uniCountry && uniCountry !== 'Select Country') params.set('country', uniCountry);
          params.set('nearMe', 'true');
          window.location.href = `/find-experts?${params.toString()}`;
        },
        () => {
          const params = new URLSearchParams();
          params.set('category', 'student');
          if (uniCountry && uniCountry !== 'Select Country') params.set('country', uniCountry);
          window.location.href = `/find-experts?${params.toString()}`;
        }
      );
    } else {
      const params = new URLSearchParams();
      params.set('category', 'student');
      if (uniCountry && uniCountry !== 'Select Country') params.set('country', uniCountry);
      window.location.href = `/find-experts?${params.toString()}`;
    }
  };

  // --- TAB 2: Consultant Search Handler ---
  const handleConsultantSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();

    // If searching by Name/keyword, prioritize Name match
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
    } else if (selectedVisaType && selectedVisaType !== 'Select Category') {
      params.set('category', selectedVisaType);
    }

    if (selectedCountry && selectedCountry !== 'Select Country')
      params.set('country', selectedCountry);

    if (location.trim()) params.set('city', location.trim());
    if (consultantType !== 'All') params.set('type', consultantType);
    if (consultantMode !== 'All') params.set('mode', consultantMode);

    window.location.href = `/find-experts?${params.toString()}`;
  };

  const courseLevelsList = [
    'Undergraduate (Bachelor\'s)',
    'Postgraduate (Master\'s)',
    'PhD / Doctorate',
    'Diploma / Certificate',
    'Language / Pathway Program'
  ];

  const countriesList = [
    'Canada', 'United Kingdom', 'United States', 'Australia', 
    'Germany', 'Ireland', 'New Zealand', 'Singapore', 'France', 
    'Europe', 'Schengen Countries', 'UAE', 'Other'
  ];

  const categoriesList = [
    'Student Visa', 'Work Permit / Work Visa', 'Tourist / Visitor Visa', 
    'PR / Express Entry', 'Visa Appeals / Tribunal', 'Digital Nomad Visa', 
    'Business & Investor Visa', 'Spousal / Dependent Visa'
  ];

  const destinations = [
    { name: 'Canada', flag: 'ca', href: '/visa-guide/canada' },
    { name: 'UK', flag: 'gb', href: '/visa-guide/uk' },
    { name: 'USA', flag: 'us', href: '/visa-guide/usa' },
    { name: 'Australia', flag: 'au', href: '/visa-guide/australia' },
    { name: 'Germany', flag: 'de', href: '/visa-guide/germany' },
    { name: 'New Zealand', flag: 'nz', href: '/visa-guide/new-zealand' },
    { name: 'UAE', flag: 'ae', href: '/visa-guide/uae' },
  ];

  const classifiedTabs = ['All', 'Accommodation', 'SIM & eSIM', 'Jobs', 'Business', 'Visa Appeals'];

  const classifieds = [
    {
      id: 'shared-room-humber-college',
      badge: 'Accommodation',
      badgeBg: 'bg-[#059669]',
      img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop',
      title: 'Shared Student Room Near Humber College',
      country: 'Canada',
      category: 'Accommodation',
      postedBy: 'Canada Student Hub',
      location: 'Toronto, Canada',
      time: '2 hours ago',
      price: '$650 CAD / Mo',
      priceColor: 'text-slate-900',
    },
    {
      id: 'global-travel-esim-pack',
      badge: 'SIM & Connectivity',
      badgeBg: 'bg-[#0284c7]',
      img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
      title: 'Instant Unlimited 5G eSIM for Canada & USA',
      country: 'Canada',
      category: 'SIM & eSIM',
      postedBy: 'TravlTik Telecomm',
      location: 'Online Delivery',
      time: 'Just Now',
      price: '$29 USD',
      priceColor: 'text-[#00a896]',
    },
    {
      id: 'caregiver-jobs-canada',
      badge: 'Jobs Abroad',
      badgeBg: 'bg-[#00a896]',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
      title: 'Caregiver & Healthcare Jobs in Canada',
      country: 'Canada',
      category: 'Jobs',
      postedBy: 'Apex Visa Consultancy',
      location: 'Toronto, Canada',
      time: '3 hours ago',
      price: 'FREE',
      priceColor: 'text-[#00a896]',
    },
    {
      id: 'uk-student-flat-london',
      badge: 'Accommodation',
      badgeBg: 'bg-[#059669]',
      img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop',
      title: 'Furnished Ensuite Room in Zone 2 London',
      country: 'UK',
      category: 'Accommodation',
      postedBy: 'London Living UK',
      location: 'London, United Kingdom',
      time: '5 hours ago',
      price: '£820 / Mo',
      priceColor: 'text-slate-900',
    },
    {
      id: 'visa-consultancy-business-sale',
      badge: 'Business',
      badgeBg: 'bg-[#0c1a2e]',
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
      title: 'Established Visa Consultancy Office for Sale',
      country: 'UAE',
      category: 'Business',
      postedBy: 'Global Business Advisors',
      location: 'Dubai, UAE',
      time: '1 day ago',
      price: 'AED 65,000',
      priceColor: 'text-slate-900',
    },
    {
      id: 'uk-australia-refusal-appeals',
      badge: 'Visa Appeals',
      badgeBg: 'bg-[#d97706]',
      img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop',
      title: 'Embassy Refusal Case Review & Tribunal Appeal',
      country: 'Australia',
      category: 'Visa Appeals',
      postedBy: 'Global Rights Legal',
      location: 'Sydney, Australia',
      time: '1 day ago',
      price: 'Free Review',
      priceColor: 'text-[#00a896]',
    },
  ];

  const filteredClassifieds = classifieds.filter(c => {
    if (activeTab === 'All') return true;
    return c.category.toLowerCase().includes(activeTab.toLowerCase());
  });

  return (
    <div className="w-full bg-[#f3f4f6] text-slate-800 font-sans antialiased py-3">
      <div className="max-w-[1240px] mx-auto px-4 space-y-4">

        {/* ======================================================= */}
        {/* 1. FLIGHT AD BANNER */}
        {/* ======================================================= */}
        <div className="relative rounded-2xl overflow-hidden flex items-center justify-between px-6 py-4 min-h-[86px] shadow-sm text-white"
          style={{ background: 'linear-gradient(90deg, #0c1a2e 0%, #172b4d 55%, #1e3a66 100%)' }}
        >
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-teal-300 tracking-wider uppercase mb-0.5">✈ SPONSORED TRAVEL DEALS</p>
            <h3 className="text-white font-bold text-xl leading-tight">Fly High with Your Global Dreams</h3>
            <p className="text-slate-300 text-xs font-medium mt-0.5">Best Student & Immigrant Flight Fares with Extra Baggage Allowance</p>
          </div>

          <div className="relative z-10 hidden md:block">
            <div className="w-24 h-14 rounded-xl overflow-hidden border border-white/20 shadow">
              <img
                src="https://images.unsplash.com/photo-1542296332-2e4473faf563?w=400&auto=format&fit=crop&q=80"
                alt="Airplane"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-5">
            <a href="/find-experts?category=flight" className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition whitespace-nowrap">
              Explore Deals
            </a>
            <div className="text-right">
              <p className="text-teal-300 text-[10px] font-bold uppercase tracking-wider">UP TO</p>
              <p className="text-white font-extrabold text-2xl leading-none">20% OFF</p>
              <p className="text-slate-300 text-[10px] font-medium">On International Flights</p>
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* 2. HYPER-PREMIUM APPLE-GRADE HERO SECTION */}
        {/* ======================================================= */}
        <div className="relative rounded-3xl overflow-hidden bg-white shadow-sm min-h-[350px] flex items-center border border-slate-100/80 transition-all hover:shadow-md">
          <div className="absolute inset-y-0 right-0 w-[58%] pointer-events-none overflow-hidden">
            <img
              src="/hero-traveler.png"
              alt="Global traveler with backpack and luggage"
              className="w-full h-full object-cover object-left transition-transform duration-700 hover:scale-102"
            />
            <div className="absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-white via-white/80 to-transparent" />
          </div>

          <div className="relative z-10 px-8 sm:px-12 py-10 max-w-[540px] space-y-5">
            {/* Live Trust Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50/80 border border-teal-200/60 text-[11px] font-medium text-teal-800 backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-[#00a896] radar-live-dot" />
              <span>Global Mobility Platform • Over 48,000+ Visas Granted</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-[42px] font-semibold text-slate-950 leading-[1.12] tracking-tight font-sans">
                Your Journey<br />
                Abroad <span className="text-[#00a896] font-medium">Starts Here</span>
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md font-normal">
                Connect with verified immigration lawyers, accredited global universities & licensed relocation consultants across 150+ countries.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <a href="/readiness"
                className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-5 py-3 rounded-xl shadow-xs transition-all hover-spring flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Check Travel Readiness
              </a>
              <a href="/find-experts"
                className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-medium text-xs px-5 py-3 rounded-xl transition-all hover-spring shadow-2xs"
              >
                Find Verified Experts
              </a>
            </div>

            <div className="flex gap-6 pt-3 border-t border-slate-100">
              {[
                { top: '2,450+', bot: 'Verified Experts' },
                { top: '1,200+', bot: 'Partner Universities' },
                { top: '99.4%', bot: 'Visa Success' },
                { top: '24/7', bot: 'Live Concierge' },
              ].map((b, idx) => (
                <div key={idx}>
                  <p className="text-xs font-semibold text-slate-900 leading-tight font-sans">{b.top}<br /><span className="font-normal text-[11px] text-slate-500 font-sans">{b.bot}</span></p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* 3. DYNAMIC SEARCH TABS OVERHAUL */}
        {/* ======================================================= */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-100 space-y-4">

            {/* Tab Navigation Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none">
                
                {/* TAB 1: Universities Search */}
                <button
                  type="button"
                  onClick={() => setActiveCategory('universities')}
                  className={`flex items-center gap-2 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shrink-0 ${
                    activeCategory === 'universities'
                      ? 'bg-teal-50 border border-teal-200 text-[#00a896] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <GraduationCap className="w-4.5 h-4.5 stroke-[2.2]" />
                  <span>Universities</span>
                </button>

                {/* TAB 2: Consultant Search */}
                <button
                  type="button"
                  onClick={() => setActiveCategory('consultant')}
                  className={`flex items-center gap-2 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shrink-0 ${
                    activeCategory === 'consultant'
                      ? 'bg-teal-50 border border-teal-200 text-[#00a896] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <UserCheck className="w-4.5 h-4.5 stroke-[2.2]" />
                  <span>Find Consultants</span>
                </button>

                {/* TAB 3: Relocation Assistance */}
                <button
                  type="button"
                  onClick={() => setActiveCategory('relocation')}
                  className={`flex items-center gap-2 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shrink-0 ${
                    activeCategory === 'relocation'
                      ? 'bg-teal-50 border border-teal-200 text-[#00a896] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <Home className="w-4.5 h-4.5 stroke-[2.2]" />
                  <span>Relocation Assistance</span>
                </button>

                {/* TAB 4: Jobs Abroad */}
                <button
                  type="button"
                  onClick={() => setActiveCategory('jobs')}
                  className={`flex items-center gap-2 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shrink-0 ${
                    activeCategory === 'jobs'
                      ? 'bg-teal-50 border border-teal-200 text-[#00a896] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <Briefcase className="w-4.5 h-4.5 stroke-[2.2]" />
                  <span>Jobs Abroad</span>
                </button>

                {/* TAB 5: Lawyers */}
                <button
                  type="button"
                  onClick={() => setActiveCategory('lawyers')}
                  className={`flex items-center gap-2 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shrink-0 ${
                    activeCategory === 'lawyers'
                      ? 'bg-teal-50 border border-teal-200 text-[#00a896] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <Scale className="w-4.5 h-4.5 stroke-[2.2]" />
                  <span>Immigration Lawyers</span>
                </button>

              </div>
            </div>

            {/* ── TAB 1 BODY: UNIVERSITIES SEARCH ── */}
            {activeCategory === 'universities' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* 1. Course Level Dropdown */}
                  <div className="relative">
                    <label className="text-xs font-bold text-slate-800 leading-none mb-2 block">
                      Course Level
                    </label>
                    <div
                      onClick={(e) => { e.stopPropagation(); setCourseLevelOpen(!courseLevelOpen); setUniCountryOpen(false); }}
                      className="bg-white border border-slate-200 hover:border-[#00a896] rounded-2xl px-4 h-[52px] flex items-center justify-between gap-3 cursor-pointer transition-all shadow-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <GraduationCap className="w-4.5 h-4.5 text-[#00a896] shrink-0" />
                        <span className={`text-xs font-semibold truncate ${courseLevel !== 'Select Course Level' ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                          {courseLevel}
                        </span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${courseLevelOpen ? 'rotate-180' : ''}`} />
                    </div>
                    {courseLevelOpen && (
                      <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 max-h-60 overflow-y-auto">
                        {courseLevelsList.map((lvl) => (
                          <button key={lvl} type="button"
                            onClick={(e) => { e.stopPropagation(); setCourseLevel(lvl); setCourseLevelOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors ${courseLevel === lvl ? 'bg-teal-50 text-[#00a896] font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
                          >{lvl}</button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 2. Destination Country Dropdown */}
                  <div className="relative">
                    <label className="text-xs font-bold text-slate-800 leading-none mb-2 block">
                      Study Destination
                    </label>
                    <div
                      onClick={(e) => { e.stopPropagation(); setUniCountryOpen(!uniCountryOpen); setCourseLevelOpen(false); }}
                      className="bg-white border border-slate-200 hover:border-[#00a896] rounded-2xl px-4 h-[52px] flex items-center justify-between gap-3 cursor-pointer transition-all shadow-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <Globe className="w-4.5 h-4.5 text-slate-600 shrink-0" />
                        <span className={`text-xs font-semibold truncate ${uniCountry !== 'Select Country' ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                          {uniCountry !== 'Select Country' ? uniCountry : 'Select Country'}
                        </span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${uniCountryOpen ? 'rotate-180' : ''}`} />
                    </div>
                    {uniCountryOpen && (
                      <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 max-h-60 overflow-y-auto">
                        {countriesList.map((c) => (
                          <button key={c} type="button"
                            onClick={(e) => { e.stopPropagation(); setUniCountry(c); setUniCountryOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors ${uniCountry === c ? 'bg-teal-50 text-[#00a896] font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
                          >{c}</button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 3. Subject / Major Keyword */}
                  <div>
                    <label className="text-xs font-bold text-slate-800 leading-none mb-2 block">
                      Subject / Course Name <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <div className="bg-white border border-slate-200 focus-within:border-[#00a896] hover:border-slate-300 rounded-2xl px-4 h-[52px] flex items-center gap-3 transition-all shadow-xs">
                      <Search className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                      <input
                        type="text"
                        value={courseKeyword}
                        onChange={(e) => setCourseKeyword(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleFindUniversities(); }}
                        placeholder="e.g., Computer Science, MBA, Data Science"
                        className="w-full text-xs font-semibold text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Universities Action Buttons (Dual Actions) */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  {/* Primary Action: Find Universities */}
                  <button
                    type="button"
                    onClick={handleFindUniversities}
                    className="w-full sm:w-auto min-w-[220px] px-8 py-3.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white rounded-2xl shadow-md flex items-center justify-center gap-2 font-bold text-xs cursor-pointer transition-all"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Find Universities</span>
                  </button>

                  {/* Secondary Action: Find Consultants (with Geolocation trigger) */}
                  <button
                    type="button"
                    onClick={handleFindStudyConsultants}
                    className="w-full sm:w-auto min-w-[220px] px-8 py-3.5 bg-slate-900 hover:bg-black active:scale-95 text-white rounded-2xl shadow-sm flex items-center justify-center gap-2 font-bold text-xs cursor-pointer transition-all border border-slate-800"
                  >
                    <MapPin className="w-4 h-4 text-teal-400" />
                    <span>Find Study Consultants Near Me</span>
                  </button>
                </div>
              </div>
            )}

            {/* ── TAB 2 BODY: CONSULTANT SEARCH (WITH DYNAMIC NAME RULE & FILTERS) ── */}
            {activeCategory === 'consultant' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                  {/* Box 1: Consultant Name or Keyword */}
                  <div>
                    <label className="text-xs font-bold text-slate-800 leading-none mb-2 block">
                      Search Consultant Name or Topic
                    </label>
                    <div className="bg-white border border-slate-200 focus-within:border-[#00a896] hover:border-slate-300 rounded-2xl px-4 h-[52px] flex items-center gap-3 transition-all shadow-xs">
                      <Search className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleConsultantSearch(); }}
                        placeholder="e.g., Arjun Mehta, Canam, Student Visa"
                        className="w-full text-xs font-semibold text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
                      />
                      {searchQuery && (
                        <button type="button" onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600 text-xs font-bold">✕</button>
                      )}
                    </div>
                  </div>

                  {/* Box 2: Destination Country */}
                  <div className="relative">
                    <label className="text-xs font-bold text-slate-800 leading-none mb-2 block">Destination Country</label>
                    <div
                      onClick={(e) => { e.stopPropagation(); setCountryOpen(!countryOpen); setVisaTypeOpen(false); }}
                      className="bg-white border border-slate-200 hover:border-[#00a896] rounded-2xl px-4 h-[52px] flex items-center justify-between gap-3 cursor-pointer transition-all shadow-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <Globe className="w-4.5 h-4.5 text-slate-600 shrink-0" />
                        <span className={`text-xs font-semibold truncate ${selectedCountry !== 'Select Country' ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                          {selectedCountry !== 'Select Country' ? selectedCountry : 'All Countries'}
                        </span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${countryOpen ? 'rotate-180' : ''}`} />
                    </div>
                    {countryOpen && (
                      <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 max-h-60 overflow-y-auto">
                        {countriesList.map((c) => (
                          <button key={c} type="button"
                            onClick={(e) => { e.stopPropagation(); setSelectedCountry(c); setCountryOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors ${selectedCountry === c ? 'bg-teal-50 text-[#00a896] font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
                          >{c}</button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Box 3: Location / City */}
                  <div>
                    <label className="text-xs font-bold text-slate-800 leading-none mb-2 flex items-center justify-between">
                      <span>Your Location</span>
                      <span className="text-[10px] text-teal-600 font-medium">GPS Auto-Detect</span>
                    </label>
                    <div className="bg-white border border-slate-200 focus-within:border-[#00a896] hover:border-slate-300 rounded-2xl px-4 h-[52px] flex items-center justify-between gap-2 transition-all shadow-xs">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <MapPin className="w-4.5 h-4.5 text-slate-500 shrink-0" />
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleConsultantSearch(); }}
                          placeholder="City / State (e.g., Delhi, Mumbai)"
                          className="w-full text-xs font-semibold text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
                        />
                      </div>
                      <button type="button" title="Detect current location"
                        onClick={() => {
                          if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(
                              () => setLocation('Current Location'),
                              () => setLocation('Delhi')
                            );
                          } else {
                            setLocation('Delhi');
                          }
                        }}
                        className="p-1 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer shrink-0"
                      >
                        <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5 text-[#00a896]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Box 4: Visa Category — DYNAMIC RULE: Hidden when searching by Name */}
                  {searchQuery.trim().length === 0 ? (
                    <div className="relative">
                      <label className="text-xs font-bold text-slate-800 leading-none mb-2 block">
                        Visa Category <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <div
                        onClick={(e) => { e.stopPropagation(); setVisaTypeOpen(!visaTypeOpen); setCountryOpen(false); }}
                        className="bg-white border border-slate-200 hover:border-[#00a896] rounded-2xl px-4 h-[52px] flex items-center justify-between gap-3 cursor-pointer transition-all shadow-xs"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <FileText className="w-4.5 h-4.5 text-slate-600 shrink-0" />
                          <span className={`text-xs font-semibold truncate ${selectedVisaType !== 'Select Category' ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                            {selectedVisaType !== 'Select Category' ? selectedVisaType : 'All Visa Types'}
                          </span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${visaTypeOpen ? 'rotate-180' : ''}`} />
                      </div>
                      {visaTypeOpen && (
                        <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 max-h-60 overflow-y-auto">
                          {categoriesList.map((cat) => (
                            <button key={cat} type="button"
                              onClick={(e) => { e.stopPropagation(); setSelectedVisaType(cat); setVisaTypeOpen(false); }}
                              className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors ${selectedVisaType === cat ? 'bg-teal-50 text-[#00a896] font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
                            >{cat}</button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-teal-50/70 border border-teal-200/80 rounded-2xl px-4 h-[52px] flex items-center justify-between gap-2 mt-auto">
                      <div className="text-[11px] text-teal-900 font-medium leading-tight">
                        <span className="font-bold block text-teal-800">Prioritizing Name Match</span>
                        Category filter auto-bypassed
                      </div>
                      <Sparkles className="w-4 h-4 text-[#00a896] shrink-0" />
                    </div>
                  )}

                </div>

                {/* Sub-Filters: Consultant Type & Mode */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Consultant Type */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 font-bold text-[11px]">TYPE:</span>
                      {(['All', 'Freelancer', 'Registered Agency'] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setConsultantType(t)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                            consultantType === t
                              ? 'bg-slate-900 text-white font-bold'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    {/* Consultation Mode */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 font-bold text-[11px]">MODE:</span>
                      {(['All', 'Online', 'Offline', 'Both'] as const).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setConsultantMode(m)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                            consultantMode === m
                              ? 'bg-slate-900 text-white font-bold'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={() => handleConsultantSearch()}
                    className="w-full sm:w-auto px-8 py-2.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white rounded-xl shadow-md flex items-center justify-center gap-2 font-bold text-xs cursor-pointer transition-all ml-auto"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search Consultants</span>
                  </button>
                </div>

              </div>
            )}

            {/* ── TAB 3 BODY: RELOCATION ASSISTANCE ── */}
            {activeCategory === 'relocation' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  
                  {/* Relocation Item 1: Accommodation */}
                  <a
                    href="/classifieds?category=Accommodation"
                    className="p-4 rounded-2xl border border-slate-200 hover:border-[#00a896] bg-slate-50 hover:bg-white transition-all group shadow-xs"
                  >
                    <div className="w-9 h-9 rounded-xl bg-teal-100/70 text-[#00a896] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Home className="w-5 h-5" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#00a896] transition-colors">
                      Find Accommodation
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium mt-1">
                      Student dorms, shared apartments & homestays abroad.
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00a896] mt-2">
                      Explore Housing <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </a>

                  {/* Relocation Item 2: SIM Card & eSIM */}
                  <a
                    href="/services/sim-card"
                    className="p-4 rounded-2xl border border-slate-200 hover:border-[#00a896] bg-slate-50 hover:bg-white transition-all group shadow-xs"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#00a896] transition-colors">
                      Find SIM Card & eSIM
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium mt-1">
                      Pre-activated 5G eSIMs for USA, Canada, UK, EU & Aus.
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 mt-2">
                      Get eSIM Now <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </a>

                  {/* Relocation Item 3: Forex & Bank Accounts */}
                  <a
                    href="/services/financial-proof"
                    className="p-4 rounded-2xl border border-slate-200 hover:border-[#00a896] bg-slate-50 hover:bg-white transition-all group shadow-xs"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#00a896] transition-colors">
                      Forex & Student GIC
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium mt-1">
                      International student bank accounts, remittance & GIC.
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 mt-2">
                      Setup Account <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </a>

                  {/* Relocation Item 4: Airport Pickup & Arrival */}
                  <a
                    href="/services"
                    className="p-4 rounded-2xl border border-slate-200 hover:border-[#00a896] bg-slate-50 hover:bg-white transition-all group shadow-xs"
                  >
                    <div className="w-9 h-9 rounded-xl bg-purple-100/70 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Compass className="w-5 h-5" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#00a896] transition-colors">
                      Airport & City Arrival
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium mt-1">
                      Airport transit, transit cards, and landing guides.
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 mt-2">
                      View Assistance <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </a>

                </div>
              </div>
            )}

            {/* ── TAB 4 & 5: JOBS & LAWYERS REDIRECT SEARCH ── */}
            {(activeCategory === 'jobs' || activeCategory === 'lawyers') && (
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200 gap-4 animate-fadeIn">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {activeCategory === 'jobs' ? 'Looking for Overseas Employment?' : 'Need Licensed Legal Representation?'}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {activeCategory === 'jobs' 
                      ? 'Browse verified job listings, sponsorship employers and LMIA-approved vacancies.' 
                      : 'Connect with certified bar-admitted attorneys for appeals, court representation and PR.'}
                  </p>
                </div>
                <a
                  href={activeCategory === 'jobs' ? '/classifieds?category=Jobs' : '/find-experts?category=lawyer'}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs whitespace-nowrap transition-all"
                >
                  {activeCategory === 'jobs' ? 'Browse Jobs Abroad →' : 'Find Immigration Lawyers →'}
                </a>
              </div>
            )}

          </div>

          {/* 3B. Popular Destinations */}
          <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Popular Destinations</h2>
              <a href="/visa-guide" className="text-xs font-semibold text-[#00a896] hover:underline flex items-center gap-0.5">
                View All Countries <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="flex items-start justify-between gap-2">
              {destinations.map(d => (
                <a key={d.name} href={d.href} className="flex flex-col items-center gap-1.5 group">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-100 shadow-xs group-hover:border-[#00a896] group-hover:scale-105 transition-all">
                    <img src={`https://flagcdn.com/w80/${d.flag}.png`} alt={d.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 text-center leading-tight">{d.name}</span>
                </a>
              ))}
              <a href="/visa-guide" className="flex flex-col items-center gap-1.5 group">
                <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center group-hover:border-[#00a896] group-hover:text-[#00a896] text-slate-500 transition-all">
                  <span className="text-base font-bold">···</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-700 text-center">More</span>
              </a>
            </div>
          </div>

        </div>

        {/* ======================================================= */}
        {/* 4. FEATURED RELOCATION & CLASSIFIEDS */}
        {/* ======================================================= */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Relocation Assistance &amp; Classifieds</h2>
              <p className="text-xs text-slate-500 font-medium">Verified student housing, telecom SIMs, jobs and professional services</p>
            </div>
            <a href="/classifieds" className="text-xs font-bold text-[#00a896] hover:underline flex items-center gap-1">
              Browse All Listings <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {classifiedTabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === tab ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >{tab}</button>
            ))}
          </div>

          {/* Grid of 6 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClassifieds.map(card => (
              <a
                key={card.id}
                href={`/classifieds/${card.id}`}
                onClick={(e) => handleAdClickWithAuth(e, card.id, `/classifieds/${card.id}`)}
                className="bg-white border border-slate-100 hover:border-teal-300 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col cursor-pointer"
              >
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className={`absolute top-2.5 left-2.5 ${card.badgeBg} text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs`}>
                    {card.badge}
                  </span>
                  <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Globe className="w-3 h-3" /> {card.country}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-xs text-slate-900 group-hover:text-[#00a896] transition-colors line-clamp-2 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium mt-1 flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" /> {card.postedBy}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {card.time}
                    </span>
                    <span className={`text-xs font-extrabold ${card.priceColor}`}>
                      {card.price}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ======================================================= */}
        {/* 5. CTA ROW */}
        {/* ======================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Travel Readiness CTA */}
          <div className="bg-[#00a896] rounded-3xl p-6 flex items-center justify-between shadow-sm text-white relative overflow-hidden">
            <div className="space-y-3 max-w-[220px] relative z-10">
              <h3 className="font-bold text-lg leading-tight">Check Your Travel Readiness<br />in Just 2 Minutes</h3>
              <p className="text-teal-100 text-xs font-medium">Free AI-powered embassy refusal risk score.</p>
              <a href="/readiness"
                className="inline-block bg-white text-[#00a896] hover:bg-teal-50 font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-all">
                Check Score Now
              </a>
            </div>
            <div className="relative z-10 w-24 h-24 flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-teal-700/40 stroke-current" strokeWidth="3.5" fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-white stroke-current" strokeDasharray="82, 100" strokeWidth="3.5"
                  strokeLinecap="round" fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-white font-extrabold text-2xl leading-none">82</span>
                <span className="text-teal-100 text-[10px]">/100</span>
              </div>
            </div>
          </div>

          {/* Document Checklist CTA */}
          <div className="bg-[#eef8f6] border border-teal-100 rounded-3xl p-6 flex items-center justify-between shadow-sm relative overflow-hidden">
            <div className="space-y-3 max-w-[240px] relative z-10">
              <h3 className="font-bold text-lg text-slate-900 leading-tight">Free Embassy Document<br />Checklist Download</h3>
              <p className="text-slate-500 text-xs font-medium">Country-specific checklist for smooth visa filings.</p>
              <a href="/services/visa-documentation"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-all">
                <Download className="w-4 h-4" /> Download Checklist
              </a>
            </div>
            <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
              <div className="w-16 h-20 bg-white border border-teal-200 rounded-2xl shadow-xs p-2.5 flex flex-col justify-around">
                {[{ c: 'bg-teal-500' }, { c: 'bg-amber-400' }, { c: 'bg-teal-500' }].map((r, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className={`w-2.5 h-2.5 rounded-full ${r.c} flex items-center justify-center text-[6px] text-white font-bold`}>✓</div>
                    <div className="h-1.5 bg-slate-200 rounded flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ======================================================= */}
        {/* 6. TRUST BAR */}
        {/* ======================================================= */}
        <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-slate-100">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {[
              { icon: <ShieldCheck className="w-5 h-5 text-[#00a896]" />, t: 'Verified & Trusted', s: 'Consultants' },
              { icon: <Globe className="w-5 h-5 text-[#00a896]" />, t: 'Relocation Assistance', s: 'Global Support' },
              { icon: <FileText className="w-5 h-5 text-[#00a896]" />, t: 'Updated Travel Rules', s: 'Verified Policies' },
              { icon: <CheckCircle2 className="w-5 h-5 text-[#00a896]" />, t: 'Secure & Reliable', s: 'Platform' },
              { icon: <Clock className="w-5 h-5 text-[#00a896]" />, t: '24/7 Assistance', s: '& Guidance' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 flex-1 min-w-[140px]">
                <div className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 leading-tight">{item.t}</p>
                  <p className="text-[11px] text-slate-500 font-medium">{item.s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
