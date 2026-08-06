'use client';
import React, { useState } from 'react';
import {
  Search, Home as HomeIcon, ChevronRight, Plus,
  MessageSquare, User, ShieldCheck, FileText, DollarSign,
  Activity, MapPin, Globe
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
  { icon: <ShieldCheck className="w-6 h-6 text-[#00a896]" />, name: 'Visa Readiness\nCheck', href: '/services/apply-visa', bg: 'bg-teal-50' },
  { icon: <FileText className="w-6 h-6 text-[#2563eb]" />, name: 'Visa Document\nChecklist', href: '/services/visa-documentation', bg: 'bg-blue-50' },
  { icon: <DollarSign className="w-6 h-6 text-[#7c3aed]" />, name: 'Visa Cost\nCalculator', href: '/services', bg: 'bg-purple-50' },
  { icon: <Activity className="w-6 h-6 text-[#ea580c]" />, name: 'Track Visa\nProcess', href: '/services', bg: 'bg-orange-50' },
];

const classifieds = [
  {
    badge: 'Jobs Abroad', badgeColor: '#00a896',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200&auto=format&fit=crop',
    title: 'Caregiver Jobs in Canada',
    location: 'Toronto, Canada',
    time: '2 hours ago',
    price: 'FREE', priceColor: '#00a896',
  },
  {
    badge: 'Accommodation', badgeColor: '#059669',
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=200&auto=format&fit=crop',
    title: 'Shared Room Near Humber College',
    location: 'Toronto, Canada',
    time: '5 hours ago',
    price: '$650 CAD / Month', priceColor: '#111827',
  },
  {
    badge: 'Study Abroad', badgeColor: '#0d9488',
    img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=200&auto=format&fit=crop',
    title: 'Study in Canada 2025 Intake Open',
    location: '3 Apply Now',
    time: '',
    price: 'FREE', priceColor: '#00a896',
  },
  {
    badge: 'Business', badgeColor: '#0c1a2e',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=200&auto=format&fit=crop',
    title: 'Visa Consultancy Business for Sale',
    location: 'Apply @Deco',
    time: '1 day ago',
    price: '12,00,000', priceColor: '#111827',
  },
];

const classifiedTabs = ['All', 'Jobs', 'Accommodation', 'Business', 'Study Abroad'];

export function MobileHomeSection() {
  const [activeTab, setActiveTab] = useState('All');
  const [activeNav, setActiveNav] = useState('home');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [selectedVisaType, setSelectedVisaType] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const [countryOpen, setCountryOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [purposeOpen, setPurposeOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const terms = [selectedCountry, selectedPurpose, selectedVisaType, selectedCity].filter(Boolean);
    const query = terms.join(' ');
    window.location.href = `/find-experts?q=${encodeURIComponent(query)}`;
  };

  return (
    <div
      className="flex flex-col bg-[#f3f4f6] min-h-screen w-full max-w-full overflow-x-hidden box-border"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", paddingBottom: '80px' }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        .mob-scrollbar::-webkit-scrollbar { display: none; }
        .mob-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-y-auto w-full max-w-full">

        {/* ── 1. Fluid Responsive Hero Card (Android Edge-Safe) ── */}
        <div className="mx-3 mt-3 bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100 max-w-[calc(100vw-24px)]">
          <div className="relative flex flex-col sm:flex-row items-stretch min-h-[190px]">
            {/* Left: text */}
            <div className="flex-1 p-4 flex flex-col justify-center space-y-3 z-10">
              <div>
                <h1 className="text-2xl font-bold text-[#0c1a2e] leading-tight tracking-tight">
                  Your Journey Abroad <span style={{ color: '#00a896' }}>Starts Here</span>
                </h1>
                <p className="text-gray-500 text-xs leading-relaxed mt-1.5 font-medium">
                  Find the right visa information, trusted consultants &amp; everything you need for your journey.
                </p>
              </div>
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <a href="/services/apply-visa"
                  className="flex items-center justify-center gap-2 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm active:scale-95 transition-all"
                  style={{ backgroundColor: '#00a896' }}>
                  <Search className="w-4 h-4" /> Find Visa Help
                </a>
                <a href="/find-experts"
                  className="flex items-center justify-center gap-2 text-slate-800 text-xs font-bold py-2.5 px-4 rounded-xl border border-slate-300 bg-white active:scale-95 transition-all">
                  <User className="w-4 h-4 text-slate-600" /> Find a Consultant
                </a>
              </div>
            </div>

            {/* Right: hero image */}
            <div className="w-full sm:w-[40%] h-40 sm:h-auto shrink-0 relative overflow-hidden rounded-b-2xl sm:rounded-r-2xl sm:rounded-bl-none">
              <img
                src="/hero-traveler.png"
                alt="Woman traveler with luggage at city"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* ── 2. Mobile Advance Search Box (Clean White Theme) ── */}
        <div className="mx-3 mt-3 bg-white rounded-2xl p-4 shadow-sm border border-slate-200/90 max-w-[calc(100vw-24px)] space-y-3">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center text-[#00a896] shrink-0 border border-teal-100">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-[#0c1a2e] leading-tight">Find Visa Experts &amp; Services</h2>
              <p className="text-[11px] text-slate-500 font-semibold">Search by keyword, country, location or category</p>
            </div>
          </div>

          <form onSubmit={handleSearchSubmit} className="space-y-3">
            {/* 1. What are you looking for? (Search Input) */}
            <div className="bg-slate-50/80 rounded-xl border border-slate-200/90 px-3.5 py-2.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#00a896] shrink-0 border border-slate-200/60 shadow-2xs">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex-1 flex flex-col justify-center min-w-0">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  What are you looking for?
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. USA Student Visa, Consultant"
                  className="w-full text-xs font-bold text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
                />
              </div>
            </div>

            {/* 2. Country */}
            <div 
              onClick={() => { setCountryOpen(!countryOpen); setCityOpen(false); setPurposeOpen(false); }}
              className="bg-slate-50/80 rounded-xl border border-slate-200/90 px-3.5 py-2.5 flex items-center justify-between gap-3 relative cursor-pointer select-none"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#00a896] shrink-0 border border-slate-200/60 shadow-2xs">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="flex-1 flex flex-col justify-center min-w-0">
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                    Country
                  </span>
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {selectedCountry || "Select Country"}
                  </span>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${countryOpen ? "rotate-180" : ""}`} />

              {countryOpen && (
                <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 max-h-48 overflow-y-auto">
                  <div
                    onClick={(e) => { e.stopPropagation(); setSelectedCountry(""); setCountryOpen(false); }}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 cursor-pointer"
                  >
                    Select Country
                  </div>
                  {["Canada", "United Kingdom", "United States", "Australia", "Germany", "New Zealand", "UAE"].map((c) => (
                    <div
                      key={c}
                      onClick={(e) => { e.stopPropagation(); setSelectedCountry(c); setCountryOpen(false); }}
                      className={`px-3.5 py-2 text-xs transition-colors cursor-pointer ${
                        selectedCountry === c ? "bg-slate-900 text-white font-bold" : "text-slate-800 hover:bg-slate-100 font-semibold"
                      }`}
                    >
                      {c}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Location */}
            <div 
              onClick={() => { setCityOpen(!cityOpen); setCountryOpen(false); setPurposeOpen(false); }}
              className="bg-slate-50/80 rounded-xl border border-slate-200/90 px-3.5 py-2.5 flex items-center justify-between gap-3 relative cursor-pointer select-none"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#00a896] shrink-0 border border-slate-200/60 shadow-2xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex-1 flex flex-col justify-center min-w-0">
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                    Location
                  </span>
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {selectedCity || "Select Location"}
                  </span>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${cityOpen ? "rotate-180" : ""}`} />

              {cityOpen && (
                <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 max-h-48 overflow-y-auto">
                  <div
                    onClick={(e) => { e.stopPropagation(); setSelectedCity(""); setCityOpen(false); }}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 cursor-pointer"
                  >
                    Select Location
                  </div>
                  {["Hyderabad", "Mumbai", "Delhi", "Bangalore", "Chennai", "Remote"].map((loc) => (
                    <div
                      key={loc}
                      onClick={(e) => { e.stopPropagation(); setSelectedCity(loc); setCityOpen(false); }}
                      className={`px-3.5 py-2 text-xs transition-colors cursor-pointer ${
                        selectedCity === loc ? "bg-slate-900 text-white font-bold" : "text-slate-800 hover:bg-slate-100 font-semibold"
                      }`}
                    >
                      {loc}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Category */}
            <div 
              onClick={() => { setPurposeOpen(!purposeOpen); setCountryOpen(false); setCityOpen(false); }}
              className="bg-slate-50/80 rounded-xl border border-slate-200/90 px-3.5 py-2.5 flex items-center justify-between gap-3 relative cursor-pointer select-none"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#00a896] shrink-0 border border-slate-200/60 shadow-2xs">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="flex-1 flex flex-col justify-center min-w-0">
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                    Category
                  </span>
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {selectedPurpose || "Select Category"}
                  </span>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${purposeOpen ? "rotate-180" : ""}`} />

              {purposeOpen && (
                <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 max-h-48 overflow-y-auto">
                  <div
                    onClick={(e) => { e.stopPropagation(); setSelectedPurpose(""); setPurposeOpen(false); }}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 cursor-pointer"
                  >
                    Select Category
                  </div>
                  {["Student Visa", "Work Permit", "Visitor / Tourist Visa", "Permanent Residence", "Business Visa"].map((cat) => (
                    <div
                      key={cat}
                      onClick={(e) => { e.stopPropagation(); setSelectedPurpose(cat); setPurposeOpen(false); }}
                      className={`px-3.5 py-2 text-xs transition-colors cursor-pointer ${
                        selectedPurpose === cat ? "bg-slate-900 text-white font-bold" : "text-slate-800 hover:bg-slate-100 font-semibold"
                      }`}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#00a896] hover:bg-[#008f80] text-white py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] cursor-pointer mt-1"
            >
              <Search className="w-4 h-4" /> Search Consultants &amp; Visas
            </button>
          </form>
        </div>

        {/* ── 2. Dreaming of Studying in Canada Banner ── */}
        <div className="mx-3 mt-3 rounded-2xl overflow-hidden shadow-sm relative min-h-[80px]"
          style={{ background: 'linear-gradient(135deg, #2d1b6b 0%, #4f46e5 60%, #7c3aed 100%)' }}>
          {/* Right: full-bleed city photo with gradient fade */}
          <div className="absolute inset-y-0 right-0 w-[55%]">
            <img
              src="https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&auto=format&fit=crop&q=85"
              alt="Toronto Canada skyline"
              className="w-full h-full object-cover object-center"
            />
            {/* fade from left so text stays readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#3730a3] via-[#4f46e5]/60 to-transparent" />
          </div>

          {/* Left: text + button */}
          <div className="relative z-10 p-4 max-w-[55%]">
            <h3 className="text-white font-extrabold text-[15px] leading-snug">
              Dreaming of<br />Studying in Canada?
            </h3>
            <a href="/visa-guide/canada"
              onClick={() => trackAdClick({
                adId: 'sponsored_banner_canada_mob',
                adTitle: 'Dreaming of Studying in Canada?',
                adType: 'sponsored',
                category: 'Study Abroad',
                destination: 'Canada',
                targetUrl: '/visa-guide/canada'
              })}
              className="inline-block mt-2.5 bg-white text-[#3730a3] text-[11px] font-bold px-4 py-1.5 rounded-lg shadow transition-all">
              Learn More
            </a>
          </div>
        </div>

        {/* ── 3. Explore Top Destinations ── */}
        <div className="mx-3 mt-3 bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="text-[15px] font-extrabold text-[#0c1a2e]">Explore Top Destinations</h2>
            <a href="/visa-guide" className="text-[12px] font-semibold text-[#1a73e8]">
              View All
            </a>
          </div>
          {/* 5 flags evenly spaced — full width */}
          <div className="flex justify-between items-start">
            {destinations.slice(0, 5).map(d => (
              <a key={d.name} href={d.href} className="flex flex-col items-center gap-1.5 group">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm group-active:scale-95 transition-transform">
                  <img src={`https://flagcdn.com/w80/${d.flag}.png`} alt={d.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[11px] font-semibold text-gray-700 text-center">{d.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── 4. Free Tools & Services ── */}
        <div className="mt-4 px-3">
          <h2 className="text-[15px] font-extrabold text-[#0c1a2e] mb-3">Free Tools &amp; Services</h2>
          <div className="grid grid-cols-4 gap-2">
            {tools.map((t, i) => (
              <a key={i} href={t.href}
                className="flex flex-col items-center gap-1.5 bg-white rounded-xl p-2.5 shadow-sm border border-gray-50 active:scale-95 transition-transform text-center">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.bg}`}>
                  {t.icon}
                </div>
                <span className="text-[10px] font-semibold text-gray-700 leading-tight"
                  style={{ whiteSpace: 'pre-line' }}>{t.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── 5. Featured Classifieds ── */}
        <div className="mt-4 px-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-extrabold text-[#0c1a2e]">Featured Classifieds</h2>
            <a href="/classifieds" className="flex items-center gap-0.5 text-[12px] font-semibold" style={{ color: '#00a896' }}>
              View All <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto mob-scrollbar mb-3 pb-1">
            {classifiedTabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold shrink-0 transition-all ${
                  activeTab === tab
                    ? 'bg-[#111827] text-white'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}>
                {tab}
              </button>
            ))}
          </div>

          {/* Classified List Cards */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden divide-y divide-gray-50">
            {classifieds.map((item, idx) => (
              <a key={idx} href="/classifieds"
                onClick={() => trackAdClick({
                  adId: `classified_mob_${idx}_${item.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
                  adTitle: item.title,
                  adType: 'classified',
                  category: item.badge,
                  targetUrl: '/classifieds'
                })}
                className="flex gap-3 p-3 active:bg-gray-50 transition-colors">
                {/* Thumbnail */}
                <div className="relative w-[68px] h-[68px] rounded-xl overflow-hidden shrink-0 bg-gray-100">
                  <img src={item.img} alt={item.title}
                    className="w-full h-full object-cover" />
                  <span
                    className="absolute top-1 left-1 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md"
                    style={{ backgroundColor: item.badgeColor }}>
                    {item.badge}
                  </span>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <h3 className="text-[13px] font-extrabold text-gray-900 leading-snug line-clamp-2">{item.title}</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                    <span className="text-[11px] text-gray-400 truncate">{item.location}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-gray-400">{item.time}</span>
                    <span className="text-[12px] font-extrabold" style={{ color: item.priceColor }}>{item.price}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── 6. Bottom Spacer ── */}
        <div className="h-4" />
      </div>
    </div>
  );
}
