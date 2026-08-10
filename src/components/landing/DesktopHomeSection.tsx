'use client';
import React, { useState, useEffect } from 'react';
import {
  Search, ShieldCheck, FileText, Users, CheckCircle2,
  Clock, ChevronRight, Globe, Download, ChevronDown, User,
  LayoutGrid, UserCheck, Building2, Briefcase, Scale, MoreHorizontal
} from 'lucide-react';
import { trackAdClick, handleAdClickWithAuth } from '../../utils/trackAdClick';

interface CustomSelectProps {
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (val: string) => void;
}

function CustomSelect({ label, value, placeholder, options, isOpen, onToggle, onSelect }: CustomSelectProps) {
  return (
    <div className="space-y-1 relative text-left">
      <label className="text-[11px] font-bold text-gray-500 block">{label}</label>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        className={`w-full bg-white border rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 outline-none flex items-center justify-between gap-1.5 transition-all select-none h-[38px] ${
          isOpen ? "border-[#00a896] ring-1 ring-[#00a896]/20" : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180 text-gray-900" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white rounded-xl shadow-xl border border-gray-200/90 py-1.5 z-50 max-h-48 overflow-y-auto animate-premium-fade">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onSelect(opt)}
              className={`w-full text-left px-3.5 py-2 text-xs transition-colors font-semibold ${
                value === opt 
                  ? 'bg-slate-950 text-white font-bold' 
                  : 'text-gray-700 hover:bg-slate-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function DesktopHomeSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('All');

  // New search fields
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Select Country');
  const [location, setLocation] = useState('');
  const [selectedVisaType, setSelectedVisaType] = useState('Select Category');

  const [countryOpen, setCountryOpen] = useState(false);
  const [visaTypeOpen, setVisaTypeOpen] = useState(false);

  useEffect(() => {
    const handleClose = () => {
      setCountryOpen(false);
      setVisaTypeOpen(false);
    };
    window.addEventListener('click', handleClose);
    return () => window.removeEventListener('click', handleClose);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();

    // Free-text keyword
    if (searchQuery.trim()) params.set('q', searchQuery.trim());

    // Destination country
    if (selectedCountry && selectedCountry !== 'Select Country')
      params.set('country', selectedCountry);

    // Your location (city of consultant)
    if (location.trim()) params.set('city', location.trim());

    // Visa / service category
    if (selectedVisaType && selectedVisaType !== 'Select Category')
      params.set('category', selectedVisaType);

    window.location.href = `/find-experts?${params.toString()}`;
  };

  const countriesList = ['Canada', 'United Kingdom', 'United States', 'Australia', 'Germany', 'Europe', 'Schengen Countries', 'South Africa', 'New Zealand', 'UAE', 'France', 'Singapore', 'Ireland', 'Other'];
  const categoriesList = ['Student Visa', 'Work Permit / Work Visa', 'Tourist / Visitor Visa', 'PR / Express Entry', 'Business Visa', 'Dependent Visa', 'Spousal / Partner Visa', 'Investor Visa'];

  const classifiedTabs = ['All', 'Jobs', 'Accommodation', 'Business', 'Study Abroad', 'Visa Appeals'];

  const classifieds = [
    {
      id: 'caregiver-jobs-canada',
      badge: 'Jobs Abroad',
      badgeBg: 'bg-[#00a896]',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
      title: 'Caregiver Jobs in Canada',
      country: 'Canada',
      category: 'Jobs Abroad',
      postedBy: 'Apex Visa Consultancy',
      location: 'Toronto, Canada',
      time: '2 hours ago',
      price: 'FREE',
      priceColor: 'text-[#00a896]',
    },
    {
      id: 'shared-room-humber-college',
      badge: 'Accommodation',
      badgeBg: 'bg-[#059669]',
      img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop',
      title: 'Shared Room Near Humber College',
      country: 'Canada',
      category: 'Accommodation',
      postedBy: 'Canada Student Hub',
      location: 'Toronto, Canada',
      time: '5 hours ago',
      price: '$650 CAD / Month',
      priceColor: 'text-gray-900',
    },
    {
      id: 'study-canada-2025-intake',
      badge: 'Study Abroad',
      badgeBg: 'bg-[#0d9488]',
      img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop',
      title: 'Study in Canada 2025 Intake Open',
      country: 'Canada',
      category: 'Study Abroad',
      postedBy: 'Canam Overseas Experts',
      location: 'Canada',
      applyLink: 'Apply Now',
      time: 'Just Now',
      price: 'FREE',
      priceColor: 'text-[#00a896]',
    },
    {
      id: 'visa-consultancy-business-sale',
      badge: 'Business',
      badgeBg: 'bg-[#0c1a2e]',
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
      title: 'Visa Consultancy Business for Sale',
      country: 'UAE',
      category: 'Business',
      postedBy: 'Global Business Advisors',
      location: 'Dubai, UAE',
      time: '1 day ago',
      price: '12,00,000',
      priceColor: 'text-gray-900',
    },
    {
      id: 'uk-australia-refusal-appeals',
      badge: 'Visa Appeals',
      badgeBg: 'bg-[#00a896]',
      img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=800&auto=format&fit=crop',
      title: 'UK & Australia Refusal Visa Appeals',
      country: 'UK / Australia',
      category: 'Visa Appeals',
      postedBy: 'Immigration Law Partners',
      location: 'London / Remote',
      time: '3 hours ago',
      price: 'Free Consultation',
      priceColor: 'text-[#00a896]',
    },
  ];

  const destinations = [
    { flag: 'ca', name: 'Canada', href: '/visa-guide/canada' },
    { flag: 'gb', name: 'UK', href: '/visa-guide/uk' },
    { flag: 'us', name: 'USA', href: '/visa-guide/usa' },
    { flag: 'au', name: 'Australia', href: '/visa-guide/australia' },
    { flag: 'de', name: 'Germany', href: '/visa-guide/germany' },
    { flag: 'nz', name: 'New Zealand', href: '/visa-guide/new-zealand' },
    { flag: 'ae', name: 'UAE', href: '/visa-guide/uae' },
  ];

  return (
    <div className="w-full bg-[#f1f3f6] text-[#111827] pb-12 antialiased">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        .hp-font { font-family: 'Plus Jakarta Sans', sans-serif !important; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 hp-font space-y-4 pt-3">

        {/* ======================================================= */}
        {/* 1. FLIGHT AD BANNER — full width, right below header */}
        {/* ======================================================= */}
        <div className="relative rounded-2xl overflow-hidden flex items-center justify-between px-6 py-4 min-h-[86px] shadow-md text-white"
          style={{ background: 'linear-gradient(90deg, #3b0764 0%, #581c87 45%, #6b21a8 75%, #00a896 100%)' }}
        >
          {/* Left */}
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-teal-200 tracking-wider uppercase mb-0.5">✈ SPONSORED</p>
            <h3 className="text-white font-bold text-xl leading-tight">Fly High with Your Dreams</h3>
            <p className="text-purple-200 text-xs font-medium mt-0.5">Best Deals on Flight Tickets</p>
          </div>

          {/* Center plane thumb */}
          <div className="relative z-10 hidden md:block">
            <div className="w-24 h-14 rounded-xl overflow-hidden border border-white/20 shadow">
              <img
                src="https://images.unsplash.com/photo-1542296332-2e4473faf563?w=400&auto=format&fit=crop&q=80"
                alt="Airplane"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right */}
          <div className="relative z-10 flex items-center gap-5">
            <a href="#" className="bg-white text-[#581c87] font-bold text-sm px-5 py-2.5 rounded-xl shadow hover:bg-teal-50 hover:text-[#00a896] transition whitespace-nowrap">
              Book Now
            </a>
            <div className="text-right">
              <p className="text-purple-200 text-[10px] font-bold uppercase tracking-wider">UP TO</p>
              <p className="text-white font-black text-3xl leading-none">20% OFF</p>
              <p className="text-teal-200 text-[10px] font-semibold">On International Flights</p>
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* 2. HERO — woman with luggage + city skyline photo */}
        {/* ======================================================= */}
        <div className="relative rounded-3xl overflow-hidden bg-white shadow-sm min-h-[360px] flex items-center">
          {/* RIGHT: Hero image — exact user photo: woman with hat, backpack, luggage, city, plane */}
          <div className="absolute inset-y-0 right-0 w-[62%] pointer-events-none overflow-hidden">
            <img
              src="/hero-traveler.png"
              alt="Woman traveler with hat, backpack and luggage at city skyline with airplane"
              className="w-full h-full object-cover object-left"
            />
            {/* soft fade from white on left so text stays readable */}
            <div className="absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-white to-transparent" />
          </div>

          {/* LEFT: Hero text content */}
          <div className="relative z-10 px-8 sm:px-12 py-10 max-w-[530px] space-y-5">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-[44px] font-semibold text-gray-900 leading-[1.12] tracking-tight">
                Your Journey<br />
                Abroad <span style={{ color: '#00a896' }}>Starts Here</span>
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                Find the right visa information, trusted consultants &amp; everything you need for your journey.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <a href="/services/apply-visa"
                className="bg-[#00a896] hover:bg-[#009485] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all hover:scale-[1.02]"
              >
                Check Visa Readiness
              </a>
              <a href="/find-experts"
                className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-bold text-sm px-6 py-3 rounded-xl transition-all hover:scale-[1.02]"
              >
                Find a Consultant
              </a>
            </div>

            {/* 4 trust badges */}
            <div className="flex gap-6 pt-2 border-t border-gray-100">
              {[
                { icon: <ShieldCheck className="w-[18px] h-[18px]" />, top: 'Trusted', bot: 'Consultants' },
                { icon: <FileText className="w-[18px] h-[18px]" />, top: 'Accurate', bot: 'Information' },
                { icon: <Users className="w-[18px] h-[18px]" />, top: 'Millions of', bot: 'Users' },
                { icon: <CheckCircle2 className="w-[18px] h-[18px]" />, top: 'Secure &', bot: 'Reliable' },
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-1">
                  <div className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center text-[#00a896]">
                    {b.icon}
                  </div>
                  <p className="text-[10px] font-bold text-gray-700 leading-tight">{b.top}<br /><span className="font-normal text-gray-400">{b.bot}</span></p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* 3. SEARCH + POPULAR DESTINATIONS — full width */}
        {/* ======================================================= */}
        <div className="space-y-4">


            {/* 3A. Search Form */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 space-y-4">
                     {/* Top Category Tabs Bar (Exact match to Reference Image) */}
              <div className="flex items-center gap-2 sm:gap-4 border-b border-slate-100 pb-3 mb-5 overflow-x-auto scrollbar-none">
                <button
                  type="button"
                  onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                  className={`flex items-center gap-2 text-xs sm:text-sm font-extrabold px-3.5 py-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                    activeCategory === 'all'
                      ? 'bg-teal-50/60 border border-teal-200 text-[#00a896] shadow-2xs border-b-2 border-b-[#00a896]'
                      : 'text-slate-600 hover:text-slate-900 border border-transparent'
                  }`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <LayoutGrid className="w-4.5 h-4.5 stroke-[2.2] text-[#00a896]" />
                  <span>All Services</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveCategory('consultant'); setSearchQuery('Consultant'); }}
                  className={`flex items-center gap-2 text-xs sm:text-sm font-bold px-3 py-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                    activeCategory === 'consultant'
                      ? 'bg-teal-50/60 border border-teal-200 text-[#00a896] shadow-2xs border-b-2 border-b-[#00a896]'
                      : 'text-slate-600 hover:text-slate-900 border border-transparent'
                  }`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <UserCheck className="w-4.5 h-4.5 stroke-[2.2]" />
                  <span>Consultant</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveCategory('universities'); setSearchQuery('Higher Education Study'); }}
                  className={`flex items-center gap-2 text-xs sm:text-sm font-bold px-3 py-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                    activeCategory === 'universities'
                      ? 'bg-teal-50/60 border border-teal-200 text-[#00a896] shadow-2xs border-b-2 border-b-[#00a896]'
                      : 'text-slate-600 hover:text-slate-900 border border-transparent'
                  }`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <Building2 className="w-4.5 h-4.5 stroke-[2.2]" />
                  <span>Universities</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveCategory('jobs'); setSearchQuery('Employment Work'); }}
                  className={`flex items-center gap-2 text-xs sm:text-sm font-bold px-3 py-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                    activeCategory === 'jobs'
                      ? 'bg-teal-50/60 border border-teal-200 text-[#00a896] shadow-2xs border-b-2 border-b-[#00a896]'
                      : 'text-slate-600 hover:text-slate-900 border border-transparent'
                  }`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <Briefcase className="w-4.5 h-4.5 stroke-[2.2]" />
                  <span>Jobs Abroad</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveCategory('insurance'); setSearchQuery('Insurance'); }}
                  className={`flex items-center gap-2 text-xs sm:text-sm font-bold px-3 py-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                    activeCategory === 'insurance'
                      ? 'bg-teal-50/60 border border-teal-200 text-[#00a896] shadow-2xs border-b-2 border-b-[#00a896]'
                      : 'text-slate-600 hover:text-slate-900 border border-transparent'
                  }`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <ShieldCheck className="w-4.5 h-4.5 stroke-[2.2]" />
                  <span>Insurance</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveCategory('lawyers'); setSearchQuery('Lawyers'); }}
                  className={`flex items-center gap-2 text-xs sm:text-sm font-bold px-3 py-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                    activeCategory === 'lawyers'
                      ? 'bg-teal-50/60 border border-teal-200 text-[#00a896] shadow-2xs border-b-2 border-b-[#00a896]'
                      : 'text-slate-600 hover:text-slate-900 border border-transparent'
                  }`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <Scale className="w-4.5 h-4.5 stroke-[2.2]" />
                  <span>Lawyers</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveCategory('more'); }}
                  className={`flex items-center gap-2 text-xs sm:text-sm font-bold px-3 py-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                    activeCategory === 'more'
                      ? 'bg-teal-50/60 border border-teal-200 text-[#00a896] shadow-2xs border-b-2 border-b-[#00a896]'
                      : 'text-slate-600 hover:text-slate-900 border border-transparent'
                  }`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <MoreHorizontal className="w-4.5 h-4.5 stroke-[2.2]" />
                  <span>More</span>
                </button>
              </div>

              {/* New 4-input search matching reference image exactly */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

                {/* Box 1: What are you looking for? */}
                <div>
                  <label className="text-xs font-bold text-slate-800 leading-none mb-2 block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>What are you looking for?</label>
                  <div className="bg-white border border-slate-200 focus-within:border-[#00a896] hover:border-slate-300 rounded-2xl px-4 h-[52px] flex items-center gap-3 transition-all shadow-sm">
                    <Search className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                      placeholder="e.g., Canada student visa consultant"
                      className="w-full text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    />
                  </div>
                </div>

                {/* Box 2: Destination Country */}
                <div className="relative">
                  <label className="text-xs font-bold text-slate-800 leading-none mb-2 block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Destination Country</label>
                  <div
                    onClick={(e) => { e.stopPropagation(); setCountryOpen(!countryOpen); setVisaTypeOpen(false); }}
                    className="bg-white border border-slate-200 hover:border-[#00a896] rounded-2xl px-4 h-[52px] flex items-center justify-between gap-3 cursor-pointer transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <Globe className="w-4.5 h-4.5 text-slate-600 shrink-0" />
                      <span className={`text-sm font-semibold truncate ${selectedCountry !== 'Select Country' ? 'text-slate-900' : 'text-slate-400'}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {selectedCountry !== 'Select Country' ? selectedCountry : 'Select country'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-600 shrink-0 transition-transform duration-200 ${countryOpen ? 'rotate-180' : ''}`} />
                  </div>
                  {countryOpen && (
                    <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 max-h-60 overflow-y-auto">
                      {countriesList.map((c) => (
                        <button key={c} type="button"
                          onClick={(e) => { e.stopPropagation(); setSelectedCountry(c); setCountryOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors ${ selectedCountry === c ? 'bg-teal-50 text-[#00a896] font-bold' : 'text-slate-700 hover:bg-slate-50' }`}
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >{c}</button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Box 3: Your Location */}
                <div>
                  <label className="text-xs font-bold text-slate-800 leading-none mb-2 flex items-center gap-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    <span>Your Location</span><span className="text-[10px] text-slate-400 font-normal">v</span>
                  </label>
                  <div className="bg-white border border-slate-200 focus-within:border-[#00a896] hover:border-slate-300 rounded-2xl px-4 h-[52px] flex items-center justify-between gap-2 transition-all shadow-sm">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <FileText className="w-4.5 h-4.5 text-slate-600 shrink-0" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                        placeholder="State / City"
                        className="w-full text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      />
                    </div>
                    <button type="button" title="Detect location"
                      onClick={() => { if (navigator.geolocation) { navigator.geolocation.getCurrentPosition(() => setLocation('Current Location'), () => setLocation('Delhi')); } else { setLocation('Delhi'); } }}
                      className="p-1 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5 text-[#00a896]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Box 4: Visa Category (Optional) */}
                <div className="relative">
                  <label className="text-xs font-bold text-slate-800 leading-none mb-2 block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Visa Category <span className="text-slate-400 font-normal">(Optional)</span></label>
                  <div
                    onClick={(e) => { e.stopPropagation(); setVisaTypeOpen(!visaTypeOpen); setCountryOpen(false); }}
                    className="bg-white border border-slate-200 hover:border-[#00a896] rounded-2xl px-4 h-[52px] flex items-center justify-between gap-3 cursor-pointer transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <FileText className="w-4.5 h-4.5 text-slate-600 shrink-0" />
                      <span className={`text-sm font-semibold truncate ${selectedVisaType !== 'Select Category' ? 'text-slate-900' : 'text-slate-400'}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {selectedVisaType !== 'Select Category' ? selectedVisaType : 'Select visa type'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-600 shrink-0 transition-transform duration-200 ${visaTypeOpen ? 'rotate-180' : ''}`} />
                  </div>
                  {visaTypeOpen && (
                    <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 max-h-60 overflow-y-auto">
                      {categoriesList.map((cat) => (
                        <button key={cat} type="button"
                          onClick={(e) => { e.stopPropagation(); setSelectedVisaType(cat); setVisaTypeOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors ${ selectedVisaType === cat ? 'bg-teal-50 text-[#00a896] font-bold' : 'text-slate-700 hover:bg-slate-50' }`}
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >{cat}</button>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* Centered Search Button */}
              <div className="mt-2 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => handleSearch()}
                  className="w-full sm:w-auto min-w-[280px] sm:min-w-[320px] px-10 py-3.5 bg-[#008f80] hover:bg-[#007a6d] active:scale-95 text-white rounded-2xl shadow-lg shadow-teal-700/20 flex items-center justify-center gap-2.5 font-extrabold text-sm cursor-pointer transition-all mx-auto"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>

            </div>

            {/* 3B. Popular Destinations — simple flat circles like reference */}
            <div className="bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-gray-900">Popular Destinations</h2>
                <a href="/visa-guide" className="text-xs font-semibold text-[#1a73e8] hover:underline flex items-center gap-0.5">
                  View All Countries <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="flex items-start justify-between gap-2">
                {destinations.map(d => (
                  <a key={d.name} href={d.href} className="flex flex-col items-center gap-1.5 group">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm group-hover:border-[#00a896] group-hover:scale-105 transition-all">
                      <img src={`https://flagcdn.com/w80/${d.flag}.png`} alt={d.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[11px] font-semibold text-gray-700 text-center leading-tight">{d.name}</span>
                  </a>
                ))}
                {/* More */}
                <a href="/visa-guide" className="flex flex-col items-center gap-1.5 group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center group-hover:border-[#1a73e8] group-hover:text-[#1a73e8] text-gray-500 transition-all">
                    <span className="text-base font-bold">···</span>
                  </div>
                  <span className="text-[11px] font-semibold text-gray-700 text-center">More</span>
                </a>
              </div>
            </div>

        </div>

        {/* ======================================================= */}
        {/* 4. FEATURED CLASSIFIEDS */}
        {/* ======================================================= */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-base font-bold text-gray-900">Featured Classifieds</h2>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {classifiedTabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === tab ? 'bg-[#111827] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >{tab}</button>
            ))}
          </div>

          {/* 5 Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {classifieds.map((item, idx) => (
              <a key={idx} href={`/classifieds/${item.id}`}
                onClick={(e) => handleAdClickWithAuth(e, {
                  adId: `classified_desk_${idx}_${item.id}`,
                  adTitle: item.title,
                  adType: 'classified',
                  category: item.badge,
                  targetUrl: `/classifieds/${item.id}`
                })}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col">
                <div className="relative h-36 overflow-hidden bg-gray-100 shrink-0">
                  <img src={item.img} alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                  <span className={`absolute top-2 left-2 text-white text-[9px] font-bold px-2 py-0.5 rounded-full ${item.badgeBg}`}>
                    {item.badge}
                  </span>
                </div>
                <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* TITLE + COUNTRY OF DESTINATION */}
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="text-xs font-bold text-slate-800 leading-snug line-clamp-2 group-hover:text-[#00a896] transition-colors">
                        {item.title}
                      </h3>
                      {item.country && (
                        <span className="shrink-0 bg-teal-50 border border-teal-200 text-[#00a896] text-[9.5px] font-extrabold px-1.5 py-0.5 rounded-md">
                          [{item.country}]
                        </span>
                      )}
                    </div>

                    {/* CATEGORY */}
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60">
                        Category: {item.category || item.badge}
                      </span>
                    </div>

                    {/* POSTED BY: EXPERT NAME */}
                    <div className="mt-2 flex items-center gap-1 text-[10.5px] font-bold text-slate-700">
                      <User className="w-3 h-3 text-[#00a896] shrink-0" />
                      <span className="truncate">POSTED BY: <strong className="text-slate-900 font-black">{item.postedBy || 'Verified Expert'}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-2 mt-2">
                    <span className="text-[10px] text-gray-400 font-medium">{item.time || 'Active Listing'}</span>
                    <span className="text-xs font-black text-[#00a896]">{item.price}</span>
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

          {/* Visa Readiness */}
          <div className="bg-[#00a896] rounded-3xl p-6 flex items-center justify-between shadow-md text-white relative overflow-hidden">
            <div className="space-y-3 max-w-[220px] relative z-10">
              <h3 className="font-extrabold text-xl leading-tight">Check Your Visa Readiness<br />in Just 2 Minutes</h3>
              <p className="text-teal-100 text-xs font-medium">Get your free score now!</p>
              <a href="/services/apply-visa"
                className="inline-block bg-white text-[#00a896] hover:bg-teal-50 font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-all">
                Check Now
              </a>
            </div>
            {/* Gauge */}
            <div className="relative z-10 w-28 h-28 flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-teal-700/40 stroke-current" strokeWidth="3.5" fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-white stroke-current" strokeDasharray="72, 100" strokeWidth="3.5"
                  strokeLinecap="round" fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-white font-black text-3xl leading-none">72</span>
                <span className="text-teal-100 text-[11px]">/100</span>
              </div>
            </div>
          </div>

          {/* Document Checklist */}
          <div className="bg-[#eef8f6] border border-teal-100 rounded-3xl p-6 flex items-center justify-between shadow-sm relative overflow-hidden">
            <div className="space-y-3 max-w-[240px] relative z-10">
              <h3 className="font-extrabold text-xl text-gray-900 leading-tight">Download Free<br />Visa Document Checklist</h3>
              <p className="text-gray-500 text-xs font-medium">Country-wise checklist for a hassle-free application.</p>
              <a href="/services/visa-documentation"
                className="inline-flex items-center gap-2 bg-[#00a896] hover:bg-[#009485] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-all">
                <Download className="w-4 h-4" /> Download Now
              </a>
            </div>
            {/* Clipboard illustration */}
            <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center">
              <div className="w-20 h-24 bg-white border border-teal-200 rounded-2xl shadow-sm p-3 flex flex-col justify-around">
                {[{ c: 'bg-teal-500' }, { c: 'bg-amber-400' }, { c: 'bg-teal-500' }].map((r, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded-full ${r.c} flex items-center justify-center text-[7px] text-white font-bold`}>✓</div>
                    <div className="h-1.5 bg-gray-200 rounded flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ======================================================= */}
        {/* 6. FOOTER TRUST BAR */}
        {/* ======================================================= */}
        <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {[
              { icon: <ShieldCheck className="w-5 h-5 text-[#00a896]" />, t: 'Verified & Trusted', s: 'Consultants' },
              { icon: <Globe className="w-5 h-5 text-[#00a896]" />, t: 'Wide Range of', s: 'Visa Services' },
              { icon: <FileText className="w-5 h-5 text-[#00a896]" />, t: 'Updated Visa', s: 'Information' },
              { icon: <CheckCircle2 className="w-5 h-5 text-[#00a896]" />, t: 'Secure & Reliable', s: 'Platform' },
              { icon: <Clock className="w-5 h-5 text-[#00a896]" />, t: '24/7 Support &', s: 'Guidance' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 flex-1 min-w-[140px]">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800 leading-tight">{item.t}</p>
                  <p className="text-[11px] text-gray-500 font-medium">{item.s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
