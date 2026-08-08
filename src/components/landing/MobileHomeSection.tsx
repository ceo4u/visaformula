'use client';
import React, { useState } from 'react';
import {
  Search, Home as HomeIcon, ChevronRight, Plus,
  MessageSquare, User, ShieldCheck, FileText, DollarSign,
  Activity, MapPin, Globe, ChevronDown,
  LayoutGrid, UserCheck, Building2, Briefcase, Scale, MoreHorizontal
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
    id: 'caregiver-jobs-canada',
    badge: 'Jobs Abroad', badgeColor: '#00a896',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200&auto=format&fit=crop',
    title: 'Caregiver Jobs in Canada',
    country: 'Canada',
    category: 'Jobs Abroad',
    postedBy: 'Apex Visa Consultancy',
    location: 'Toronto, Canada',
    time: '2 hours ago',
    price: 'FREE', priceColor: '#00a896',
  },
  {
    id: 'shared-room-humber-college',
    badge: 'Accommodation', badgeColor: '#059669',
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=200&auto=format&fit=crop',
    title: 'Shared Room Near Humber College',
    country: 'Canada',
    category: 'Accommodation',
    postedBy: 'Canada Student Hub',
    location: 'Toronto, Canada',
    time: '5 hours ago',
    price: '$650 CAD / Month', priceColor: '#111827',
  },
  {
    id: 'study-canada-2025-intake',
    badge: 'Study Abroad', badgeColor: '#0d9488',
    img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=200&auto=format&fit=crop',
    title: 'Study in Canada 2025 Intake Open',
    country: 'Canada',
    category: 'Study Abroad',
    postedBy: 'Canam Overseas Experts',
    location: 'Canada',
    time: 'Just Now',
    price: 'FREE', priceColor: '#00a896',
  },
  {
    id: 'visa-business-for-sale',
    badge: 'Business', badgeColor: '#0c1a2e',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=200&auto=format&fit=crop',
    title: 'Visa Consultancy Business for Sale',
    country: 'UAE',
    category: 'Business',
    postedBy: 'Global Business Advisors',
    location: 'Dubai, UAE',
    time: '1 day ago',
    price: '12,00,000', priceColor: '#111827',
  },
  {
    badge: 'Visa Appeals', badgeColor: '#7c3aed',
    img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=200&auto=format&fit=crop',
    title: 'UK & Australia Refusal Visa Appeals',
    country: 'UK / Australia',
    category: 'Visa Appeals',
    postedBy: 'Immigration Law Partners',
    location: 'London / Remote',
    time: '3 hours ago',
    price: 'Free Consultation', priceColor: '#00a896',
  },
];

const classifiedTabs = ['All', 'Jobs', 'Accommodation', 'Business', 'Study Abroad', 'Visa Appeals'];

const searchCategories = [
  { key: 'all',          label: 'All Services',  icon: LayoutGrid,     purpose: '' },
  { key: 'consultant',   label: 'Consultant',     icon: UserCheck,      purpose: 'Consultant' },
  { key: 'universities', label: 'Universities',   icon: Building2,      purpose: 'Higher Education / Study' },
  { key: 'jobs',         label: 'Jobs Abroad',    icon: Briefcase,      purpose: 'Employment / Work' },
  { key: 'insurance',    label: 'Insurance',      icon: ShieldCheck,    purpose: 'Insurance' },
  { key: 'lawyers',      label: 'Lawyers',        icon: Scale,          purpose: 'Lawyers' },
  { key: 'more',         label: 'More',           icon: MoreHorizontal, purpose: '' },
];

export function MobileHomeSection() {
  const [activeTab, setActiveTab] = useState('All');
  const [activeNav, setActiveNav] = useState('home');
  const [activeCategory, setActiveCategory] = useState('all');

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
    const params = new URLSearchParams();
    if (selectedCountry) params.set('country', selectedCountry);
    if (selectedPurpose) params.set('purpose', selectedPurpose);
    if (selectedCity) params.set('city', selectedCity);
    if (selectedVisaType) params.set('q', selectedVisaType);
    window.location.href = `/find-experts?${params.toString()}`;
  };


  return (
    <div
      className="flex flex-col bg-[#f3f4f6] min-h-screen w-full max-w-full overflow-x-hidden box-border"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", paddingBottom: '16px' }}
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

        {/* ── 2. Mobile Interactive Search Card ── */}
        <div className="mx-3 mt-3 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

          {/* ── Category Tabs Row ── */}
          <div className="flex items-center gap-1 border-b border-gray-100 px-3 pt-3 pb-0 overflow-x-auto mob-scrollbar">
            {searchCategories.map(({ key, label, icon: Icon, purpose }) => (
              <button
                key={key}
                type="button"
                onClick={() => { setActiveCategory(key); setSelectedPurpose(purpose); }}
                className={`flex flex-col items-center gap-0.5 px-2.5 py-2 rounded-t-lg transition-all cursor-pointer shrink-0 border-b-2 ${
                  activeCategory === key
                    ? 'text-[#00a896] border-[#00a896] bg-teal-50/60'
                    : 'text-gray-500 border-transparent hover:text-gray-800'
                }`}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <Icon className="w-4 h-4 stroke-[2]" />
                <span className="text-[9px] font-bold whitespace-nowrap">{label}</span>
              </button>
            ))}
          </div>

          {/* ── Search Form ── */}
          <div className="p-4 space-y-3">
          {/* Header */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center text-[#00a896] shrink-0">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-[#0c1a2e] leading-tight">Find Consultants &amp; Services</h2>
              <p className="text-[11px] text-gray-400 font-medium">Search by name, country, or visa type</p>
            </div>
          </div>

          <form onSubmit={handleSearchSubmit} className="space-y-3">
            {/* 1. Keyword Input */}
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search consultants, visas, services..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-3 text-xs font-medium text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#00a896] focus:bg-white transition-all"
              />
            </div>

            {/* 2. Destination & Category Side-by-Side */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">DESTINATION</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-800 outline-none focus:border-[#00a896] focus:bg-white transition-all cursor-pointer truncate"
                >
                  <option value="">All Countries</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="Europe">Europe</option>
                  <option value="Schengen Countries">Schengen Countries</option>
                  <option value="South Africa">South Africa</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="UAE">UAE</option>
                  <option value="Other">Other</option>

                </select>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">CATEGORY</label>
                <select
                  value={selectedPurpose}
                  onChange={(e) => setSelectedPurpose(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-800 outline-none focus:border-[#00a896] focus:bg-white transition-all cursor-pointer truncate"
                >
                  <option value="">All Categories</option>
                  <option value="Student Visa">Student Visa</option>
                  <option value="Work Permit">Work Permit</option>
                  <option value="Tourist Visa">Tourist Visa</option>
                  <option value="PR / Express Entry">PR / Express Entry</option>
                  <option value="Business Visa">Business Visa</option>
                </select>
              </div>
            </div>

            {/* 3. My Location Filter */}
            <div>
              <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">LOCATION</label>
              <div className="relative flex items-center">
                <MapPin className="w-3.5 h-3.5 text-[#00a896] absolute left-3 pointer-events-none" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-bold text-gray-800 outline-none focus:border-[#00a896] focus:bg-white transition-all cursor-pointer truncate"
                >
                  <option value="">All Locations / Cities</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#00a896] hover:bg-[#008f80] text-white text-xs font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer mt-1"
            >
              <Search className="w-4 h-4" />
              <span>Search Consultants</span>
            </button>
          </form>
          </div>{/* end search form wrapper */}
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
            <a href="/find-experts" className="flex items-center gap-0.5 text-[12px] font-semibold" style={{ color: '#00a896' }}>
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
              <a key={idx} href={`/classifieds/${item.id || 'caregiver-jobs-canada'}`}
                onClick={() => trackAdClick({
                  adId: `classified_mob_${idx}_${item.id || 'caregiver-jobs-canada'}`,
                  adTitle: item.title,
                  adType: 'classified',
                  category: item.badge,
                  targetUrl: `/classifieds/${item.id || 'caregiver-jobs-canada'}`
                })}
                className="flex gap-3 p-3 active:bg-gray-50 transition-colors">
                {/* Thumbnail */}
                <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-slate-100">
                  <img src={item.img} alt={item.title}
                    className="w-full h-full object-cover" />
                  <span
                    className="absolute top-1 left-1 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md shadow-xs whitespace-nowrap truncate max-w-[64px] leading-none"
                    style={{ backgroundColor: item.badgeColor || '#00a896' }}>
                    {item.badge}
                  </span>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 space-y-1">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="text-[13px] font-bold text-slate-800 leading-snug line-clamp-2">{item.title}</h3>
                    {item.country && (
                      <span className="shrink-0 bg-teal-50 text-[#00a896] border border-teal-200 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md">
                        [{item.country}]
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200/60">
                      Category: {item.category || item.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[10.5px] text-slate-700 font-bold">
                    <User className="w-3 h-3 text-[#00a896] shrink-0" />
                    <span className="truncate">POSTED BY: <strong className="text-slate-900 font-black">{item.postedBy || 'Verified Expert'}</strong></span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    <span className="text-[10px] text-gray-400">{item.time || 'Active Listing'}</span>
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
