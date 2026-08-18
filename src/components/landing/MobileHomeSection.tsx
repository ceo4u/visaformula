'use client';
import React, { useState } from 'react';
import {
  Search, Home as HomeIcon, ChevronRight, Plus,
  MessageSquare, User, ShieldCheck, FileText, DollarSign,
  Activity, MapPin, Globe, ChevronDown,
  LayoutGrid, UserCheck, Building2, Briefcase, Scale, MoreHorizontal,
  GraduationCap, Smartphone, Compass, Sparkles, Check
} from 'lucide-react';
import { trackAdClick, handleAdClickWithAuth } from '../../utils/trackAdClick';

const destinations = [
  { flag: 'ca', name: 'Canada', href: '/visa-guide/canada' },
  { flag: 'gb', name: 'UK', href: '/visa-guide/uk' },
  { flag: 'us', name: 'USA', href: '/visa-guide/usa' },
  { flag: 'au', name: 'Australia', href: '/visa-guide/australia' },
  { flag: 'de', name: 'Germany', href: '/visa-guide/germany' },
  { flag: 'nz', name: 'New Zealand', href: '/visa-guide/new-zealand' },
  { flag: 'ae', name: 'UAE', href: '/visa-guide/uae' },
];

const tools = [
  { icon: <ShieldCheck className="w-5 h-5 text-[#00a896]" />, name: 'Travel Readiness\nCheck', href: '/readiness', bg: 'bg-teal-50' },
  { icon: <FileText className="w-5 h-5 text-[#2563eb]" />, name: 'Visa Document\nChecklist', href: '/services/visa-documentation', bg: 'bg-blue-50' },
  { icon: <DollarSign className="w-5 h-5 text-[#7c3aed]" />, name: 'Visa Cost\nCalculator', href: '/migration-tools', bg: 'bg-purple-50' },
  { icon: <Activity className="w-5 h-5 text-[#ea580c]" />, name: 'Track Visa\nProcess', href: '/services', bg: 'bg-orange-50' },
];

const classifieds = [
  {
    id: 'shared-room-humber-college',
    badge: 'Accommodation', badgeColor: '#059669',
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=200&auto=format&fit=crop',
    title: 'Shared Room Near Humber College',
    country: 'Canada',
    category: 'Accommodation',
    postedBy: 'Canada Student Housing',
    location: 'Toronto, Canada',
    time: '1 hour ago',
    price: '$650 CAD', priceColor: '#0c1a2e',
  },
  {
    id: 'global-travel-esim-pack',
    badge: 'SIM & Connectivity', badgeColor: '#0284c7',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=200&auto=format&fit=crop',
    title: 'Instant Unlimited 5G eSIM for Canada & USA',
    country: 'Canada',
    category: 'SIM',
    postedBy: 'TravlTik Telecomm',
    location: 'Online Delivery',
    time: 'Just now',
    price: '$29 USD', priceColor: '#00a896',
  },
  {
    id: 'caregiver-jobs-canada',
    badge: 'Jobs Abroad', badgeColor: '#00a896',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200&auto=format&fit=crop',
    title: 'Caregiver & Healthcare Jobs in Canada',
    country: 'Canada',
    category: 'Jobs Abroad',
    postedBy: 'Apex Visa Consultancy',
    location: 'Toronto, Canada',
    time: '2 hours ago',
    price: 'FREE', priceColor: '#00a896',
  },
];

export function MobileHomeSection() {
  const [activeCategory, setActiveCategory] = useState<'universities' | 'consultant' | 'relocation' | 'jobs'>('consultant');
  const [activeTab, setActiveTab] = useState('All');

  // Universities Search state
  const [courseLevel, setCourseLevel] = useState('');
  const [uniCountry, setUniCountry] = useState('');
  const [courseKeyword, setCourseKeyword] = useState('');

  // Consultant Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [consultantType, setConsultantType] = useState<'All' | 'Freelancer' | 'Registered Agency'>('All');
  const [consultantMode, setConsultantMode] = useState<'All' | 'Online' | 'Offline'>('All');

  // Universities Actions
  const handleFindUniversities = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (uniCountry) params.set('country', uniCountry);
    if (courseLevel) params.set('level', courseLevel);
    if (courseKeyword.trim()) params.set('q', courseKeyword.trim());
    window.location.href = `/universities?${params.toString()}`;
  };

  const handleFindStudyConsultants = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          const params = new URLSearchParams();
          params.set('category', 'student');
          if (uniCountry) params.set('country', uniCountry);
          params.set('nearMe', 'true');
          window.location.href = `/find-experts?${params.toString()}`;
        },
        () => {
          const params = new URLSearchParams();
          params.set('category', 'student');
          if (uniCountry) params.set('country', uniCountry);
          window.location.href = `/find-experts?${params.toString()}`;
        }
      );
    } else {
      const params = new URLSearchParams();
      params.set('category', 'student');
      if (uniCountry) params.set('country', uniCountry);
      window.location.href = `/find-experts?${params.toString()}`;
    }
  };

  // Consultant Action
  const handleConsultantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
    } else if (selectedPurpose) {
      params.set('category', selectedPurpose);
    }
    if (selectedCountry) params.set('country', selectedCountry);
    if (selectedCity) params.set('city', selectedCity);
    if (consultantType !== 'All') params.set('type', consultantType);
    if (consultantMode !== 'All') params.set('mode', consultantMode);
    window.location.href = `/find-experts?${params.toString()}`;
  };

  return (
    <div
      className="flex flex-col bg-[#f3f4f6] min-h-screen w-full max-w-full overflow-x-hidden box-border font-sans antialiased"
      style={{ paddingBottom: '16px' }}
    >
      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-y-auto w-full max-w-full">

        {/* ── 1. Hero Card ── */}
        <div className="mx-3 mt-3 bg-white rounded-2xl shadow-xs overflow-hidden border border-slate-100 max-w-[calc(100vw-24px)]">
          <div className="relative flex flex-col sm:flex-row items-stretch min-h-[190px]">
            {/* Left: text */}
            <div className="flex-1 p-4 flex flex-col justify-center space-y-2.5 z-10">
              <div>
                <h1 className="text-xl font-bold text-slate-900 leading-tight tracking-tight">
                  Your Journey Abroad <span className="text-[#00a896]">Starts Here</span>
                </h1>
                <p className="text-slate-500 text-xs leading-relaxed mt-1 font-medium">
                  Find accredited universities, verified consultants &amp; complete relocation support.
                </p>
              </div>
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <a href="/readiness"
                  className="flex items-center justify-center gap-2 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs active:scale-95 transition-all bg-[#00a896]"
                >
                  <Search className="w-3.5 h-3.5" /> Check Travel Readiness
                </a>
                <a href="/find-experts"
                  className="flex items-center justify-center gap-2 text-slate-800 text-xs font-bold py-2.5 px-4 rounded-xl border border-slate-300 bg-white active:scale-95 transition-all"
                >
                  <User className="w-3.5 h-3.5 text-slate-600" /> Find a Consultant
                </a>
              </div>
            </div>

            {/* Right: hero image */}
            <div className="w-full sm:w-[40%] h-36 sm:h-auto shrink-0 relative overflow-hidden rounded-b-2xl sm:rounded-r-2xl sm:rounded-bl-none">
              <img
                src="/hero-traveler.png"
                alt="Woman traveler with luggage"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* ── 2. Dynamic Search Tabs Card ── */}
        <div className="mx-3 mt-3 bg-white rounded-2xl shadow-xs border border-slate-100 overflow-hidden">

          {/* ── Category Tabs Row ── */}
          <div className="flex items-center gap-1 border-b border-slate-100 px-3 pt-2.5 pb-0 overflow-x-auto mob-scrollbar">
            
            {/* Universities Tab */}
            <button
              type="button"
              onClick={() => setActiveCategory('universities')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg transition-all cursor-pointer shrink-0 border-b-2 text-xs font-bold ${
                activeCategory === 'universities'
                  ? 'text-[#00a896] border-[#00a896] bg-teal-50/70'
                  : 'text-slate-500 border-transparent hover:text-slate-800'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Universities</span>
            </button>

            {/* Consultants Tab */}
            <button
              type="button"
              onClick={() => setActiveCategory('consultant')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg transition-all cursor-pointer shrink-0 border-b-2 text-xs font-bold ${
                activeCategory === 'consultant'
                  ? 'text-[#00a896] border-[#00a896] bg-teal-50/70'
                  : 'text-slate-500 border-transparent hover:text-slate-800'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Find Consultants</span>
            </button>

            {/* Relocation Assistance Tab */}
            <button
              type="button"
              onClick={() => setActiveCategory('relocation')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg transition-all cursor-pointer shrink-0 border-b-2 text-xs font-bold ${
                activeCategory === 'relocation'
                  ? 'text-[#00a896] border-[#00a896] bg-teal-50/70'
                  : 'text-slate-500 border-transparent hover:text-slate-800'
              }`}
            >
              <HomeIcon className="w-3.5 h-3.5" />
              <span>Relocation</span>
            </button>

            {/* Jobs Tab */}
            <button
              type="button"
              onClick={() => setActiveCategory('jobs')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg transition-all cursor-pointer shrink-0 border-b-2 text-xs font-bold ${
                activeCategory === 'jobs'
                  ? 'text-[#00a896] border-[#00a896] bg-teal-50/70'
                  : 'text-slate-500 border-transparent hover:text-slate-800'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Jobs Abroad</span>
            </button>

          </div>

          {/* ── TAB 1: UNIVERSITIES SEARCH CONTENT ── */}
          {activeCategory === 'universities' && (
            <div className="p-4 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#00a896] shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-900 leading-tight">Search Universities Abroad</h2>
                  <p className="text-[10px] text-slate-400 font-medium">Select course level and destination</p>
                </div>
              </div>

              <form onSubmit={handleFindUniversities} className="space-y-2.5">
                {/* Course Level */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">COURSE LEVEL</label>
                  <select
                    value={courseLevel}
                    onChange={(e) => setCourseLevel(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#00a896] focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="">Select Course Level</option>
                    <option value="Undergraduate">Undergraduate (Bachelor&apos;s)</option>
                    <option value="Postgraduate">Postgraduate (Master&apos;s)</option>
                    <option value="PhD">PhD / Doctorate</option>
                    <option value="Diploma">Diploma / Certificate</option>
                  </select>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">DESTINATION COUNTRY</label>
                  <select
                    value={uniCountry}
                    onChange={(e) => setUniCountry(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#00a896] focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="">Select Country</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ireland">Ireland</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Singapore">Singapore</option>
                  </select>
                </div>

                {/* Actions */}
                <div className="pt-1 space-y-2">
                  <button
                    type="submit"
                    className="w-full bg-[#00a896] hover:bg-[#008f80] active:scale-95 text-white font-bold text-xs py-3 rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Find Universities</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleFindStudyConsultants}
                    className="w-full bg-slate-900 hover:bg-black active:scale-95 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all border border-slate-800"
                  >
                    <MapPin className="w-3.5 h-3.5 text-teal-400" />
                    <span>Find Consultants Near Me</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ── TAB 2: CONSULTANT SEARCH CONTENT ── */}
          {activeCategory === 'consultant' && (
            <div className="p-4 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#00a896] shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-900 leading-tight">Find Verified Consultants</h2>
                  <p className="text-[10px] text-slate-400 font-medium">Search by name, country, or visa service</p>
                </div>
              </div>

              <form onSubmit={handleConsultantSubmit} className="space-y-2.5">
                {/* 1. Keyword / Name Input */}
                <div className="relative flex items-center">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by Consultant Name or topic..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2.5 text-xs font-semibold text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#00a896] focus:bg-white transition-all"
                  />
                  {searchQuery && (
                    <button type="button" onClick={() => setSearchQuery('')} className="absolute right-3 text-slate-400 text-xs font-bold">✕</button>
                  )}
                </div>

                {/* Dynamic Notification when searching by Name */}
                {searchQuery.trim().length > 0 ? (
                  <div className="bg-teal-50/70 border border-teal-200 p-2 rounded-xl flex items-center justify-between text-[11px] text-teal-900 font-medium">
                    <span>Prioritizing Name matches. Category filter auto-bypassed.</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#00a896] shrink-0" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">DESTINATION</label>
                      <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-[#00a896] focus:bg-white transition-all cursor-pointer truncate"
                      >
                        <option value="">All Countries</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="Europe">Europe</option>
                        <option value="UAE">UAE</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">CATEGORY</label>
                      <select
                        value={selectedPurpose}
                        onChange={(e) => setSelectedPurpose(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-[#00a896] focus:bg-white transition-all cursor-pointer truncate"
                      >
                        <option value="">All Categories</option>
                        <option value="Student Visa">Student Visa</option>
                        <option value="Work Permit">Work Permit</option>
                        <option value="Tourist Visa">Tourist Visa</option>
                        <option value="PR / Express Entry">PR / Express Entry</option>
                        <option value="Visa Appeals">Visa Appeals</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Sub-Filters: Type & Mode */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">TYPE</label>
                    <select
                      value={consultantType}
                      onChange={(e) => setConsultantType(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 text-[11px] font-semibold text-slate-800 outline-none"
                    >
                      <option value="All">All Types</option>
                      <option value="Freelancer">Freelancers</option>
                      <option value="Registered Agency">Registered Agencies</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">MODE</label>
                    <select
                      value={consultantMode}
                      onChange={(e) => setConsultantMode(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 text-[11px] font-semibold text-slate-800 outline-none"
                    >
                      <option value="All">Online &amp; In-Person</option>
                      <option value="Online">Online Only</option>
                      <option value="Offline">In-Person Only</option>
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="w-full mt-2 bg-[#00a896] hover:bg-[#008f80] active:scale-95 text-white font-bold text-xs py-3 rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search Consultants</span>
                </button>
              </form>
            </div>
          )}

          {/* ── TAB 3: RELOCATION ASSISTANCE CONTENT ── */}
          {activeCategory === 'relocation' && (
            <div className="p-4 space-y-2.5 animate-fadeIn">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="/classifieds?category=Accommodation"
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between hover:border-[#00a896] transition-all"
                >
                  <HomeIcon className="w-4 h-4 text-[#00a896] mb-1.5" />
                  <span className="text-xs font-bold text-slate-900 leading-tight">Find Accommodation</span>
                  <span className="text-[10px] text-slate-400 mt-1">Student rooms &amp; flats</span>
                </a>

                <a
                  href="/services/sim-card"
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between hover:border-blue-500 transition-all"
                >
                  <Smartphone className="w-4 h-4 text-blue-600 mb-1.5" />
                  <span className="text-xs font-bold text-slate-900 leading-tight">SIM Card &amp; eSIM</span>
                  <span className="text-[10px] text-slate-400 mt-1">Instant 5G activation</span>
                </a>

                <a
                  href="/services/financial-proof"
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between hover:border-emerald-600 transition-all"
                >
                  <FileText className="w-4 h-4 text-emerald-600 mb-1.5" />
                  <span className="text-xs font-bold text-slate-900 leading-tight">Forex &amp; GIC</span>
                  <span className="text-[10px] text-slate-400 mt-1">Student bank accounts</span>
                </a>

                <a
                  href="/services"
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between hover:border-purple-600 transition-all"
                >
                  <Compass className="w-4 h-4 text-purple-600 mb-1.5" />
                  <span className="text-xs font-bold text-slate-900 leading-tight">Airport Pickup</span>
                  <span className="text-[10px] text-slate-400 mt-1">City landing guides</span>
                </a>
              </div>
            </div>
          )}

          {/* ── TAB 4: JOBS ABROAD CONTENT ── */}
          {activeCategory === 'jobs' && (
            <div className="p-4 text-center space-y-3 animate-fadeIn">
              <p className="text-xs text-slate-600 font-medium">Browse verified job openings, employer sponsorships, and work visas.</p>
              <a
                href="/classifieds?category=Jobs"
                className="inline-flex items-center justify-center gap-2 w-full bg-[#00a896] text-white text-xs font-bold py-2.5 rounded-xl shadow-xs"
              >
                Browse Jobs Abroad →
              </a>
            </div>
          )}

        </div>

        {/* ── 3. Quick Action Grid (Tools) ── */}
        <div className="mx-3 mt-3 grid grid-cols-4 gap-2">
          {tools.map((t, idx) => (
            <a
              key={idx}
              href={t.href}
              className="bg-white rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-xs border border-slate-100 hover:border-teal-200 active:scale-95 transition-all"
            >
              <div className={`w-9 h-9 rounded-xl ${t.bg} flex items-center justify-center mb-1.5 shrink-0`}>
                {t.icon}
              </div>
              <span className="text-[9.5px] font-bold text-slate-700 leading-tight whitespace-pre-line">
                {t.name}
              </span>
            </a>
          ))}
        </div>

        {/* ── 4. Popular Destinations ── */}
        <div className="mx-3 mt-3 bg-white rounded-2xl p-3.5 shadow-xs border border-slate-100">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-xs font-bold text-slate-900">Popular Destinations</h2>
            <a href="/visa-guide" className="text-[11px] font-bold text-[#00a896] flex items-center gap-0.5">
              All <ChevronRight className="w-3 h-3" />
            </a>
          </div>
          <div className="flex items-center justify-between gap-1 overflow-x-auto mob-scrollbar pb-1">
            {destinations.map(d => (
              <a key={d.name} href={d.href} className="flex flex-col items-center gap-1 shrink-0 px-1 group">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-100 shadow-2xs group-hover:border-[#00a896] transition-all">
                  <img src={`https://flagcdn.com/w80/${d.flag}.png`} alt={d.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-semibold text-slate-700 text-center leading-tight">{d.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── 5. Relocation Assistance & Classifieds ── */}
        <div className="mx-3 mt-3 bg-white rounded-2xl p-3.5 shadow-xs border border-slate-100 space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-900">Relocation Assistance</h2>
            <a href="/classifieds" className="text-[11px] font-bold text-[#00a896] flex items-center gap-0.5">
              View All <ChevronRight className="w-3 h-3" />
            </a>
          </div>

          <div className="space-y-2">
            {classifieds.map(ad => (
              <a
                key={ad.id}
                href={`/classifieds/${ad.id}`}
                onClick={(e) => handleAdClickWithAuth(e, ad.id, `/classifieds/${ad.id}`)}
                className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-100 hover:border-teal-200 transition-all cursor-pointer"
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-200">
                  <img src={ad.img} alt={ad.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: ad.badgeColor }}>
                      {ad.badge}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium truncate">{ad.country}</span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 truncate leading-tight">{ad.title}</h3>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                    <span>{ad.time}</span>
                    <span className="font-bold" style={{ color: ad.priceColor }}>{ad.price}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
