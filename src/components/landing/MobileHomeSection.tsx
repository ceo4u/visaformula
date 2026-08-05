'use client';
import React, { useState } from 'react';
import {
  Search, Home as HomeIcon, ChevronRight, Plus,
  MessageSquare, User, ShieldCheck, FileText, DollarSign,
  Activity, MapPin
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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const terms = [selectedCountry, selectedPurpose, selectedVisaType, selectedCity].filter(Boolean);
    const query = terms.join(' ');
    window.location.href = `/find-experts?q=${encodeURIComponent(query)}`;
  };

  return (
    <div
      className="lg:hidden flex flex-col bg-[#f3f4f6] min-h-screen"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", paddingBottom: '80px' }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        .mob-scrollbar::-webkit-scrollbar { display: none; }
        .mob-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-y-auto">

        {/* ── 1. Hero Card ── */}
        <div className="mx-3 mt-3 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="relative flex items-stretch min-h-[200px]">
            {/* Left: text */}
            <div className="flex-1 p-4 pr-2 flex flex-col justify-center space-y-3 z-10">
              <div>
                <h1 className="text-[26px] font-bold text-[#0c1a2e] leading-[1.15] tracking-tight">
                  Your Journey<br />Abroad{' '}
                  <span style={{ color: '#00a896' }}>Starts<br />Here</span>
                </h1>
                <p className="text-gray-500 text-[11px] leading-relaxed mt-2">
                  Find the right visa information, trusted consultants &amp; everything you need for your journey.
                </p>
              </div>
              {/* Buttons */}
              <div className="flex flex-col gap-2">
                <a href="/services/apply-visa"
                  className="flex items-center justify-center gap-2 text-white text-[13px] font-bold py-2.5 px-4 rounded-xl shadow-sm"
                  style={{ backgroundColor: '#00a896' }}>
                  <Search className="w-4 h-4" /> Find Visa Help
                </a>
                <a href="/find-experts"
                  className="flex items-center justify-center gap-2 text-gray-800 text-[13px] font-bold py-2.5 px-4 rounded-xl border border-gray-300 bg-white">
                  <User className="w-4 h-4 text-gray-600" /> Find a Consultant
                </a>
              </div>
            </div>

            {/* Right: hero image */}
            <div className="w-[45%] shrink-0 relative overflow-hidden rounded-r-2xl">
              <img
                src="/hero-traveler.png"
                alt="Woman traveler with luggage at city"
                className="absolute inset-0 w-full h-full object-cover object-left"
              />
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent" />
            </div>
          </div>
        </div>

        {/* ── Mobile Interactive Structured Search Card ── */}
        <div className="mx-3 mt-3 bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center text-[#00a896] shrink-0">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-[#0c1a2e] leading-tight">Find Visa Information &amp; Consultants</h2>
              <p className="text-[11px] text-gray-500 font-semibold">Select your destination, purpose &amp; location</p>
            </div>
          </div>

          <form onSubmit={handleSearchSubmit} className="space-y-2.5">
            {/* 1. Country */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">I want to go to</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-900 outline-none focus:border-[#00a896] focus:bg-white transition-all cursor-pointer"
              >
                <option value="">Select Country</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="New Zealand">New Zealand</option>
                <option value="UAE">UAE</option>
              </select>
            </div>

            {/* 2. Purpose */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">I am going for</label>
              <select
                value={selectedPurpose}
                onChange={(e) => setSelectedPurpose(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-900 outline-none focus:border-[#00a896] focus:bg-white transition-all cursor-pointer"
              >
                <option value="">Select Purpose</option>
                <option value="Higher Education / Study">Higher Education / Study</option>
                <option value="Employment / Work">Employment / Work</option>
                <option value="Tourism / Visit">Tourism / Visit</option>
                <option value="Permanent Residency">Permanent Residency</option>
                <option value="Business / Investment">Business / Investment</option>
              </select>
            </div>

            {/* 3. Visa Type */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Visa Type</label>
              <select
                value={selectedVisaType}
                onChange={(e) => setSelectedVisaType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-900 outline-none focus:border-[#00a896] focus:bg-white transition-all cursor-pointer"
              >
                <option value="">Select Visa Type</option>
                <option value="Student Visa">Student Visa</option>
                <option value="Work Permit">Work Permit</option>
                <option value="Tourist / Visitor Visa">Tourist / Visitor Visa</option>
                <option value="PR / Express Entry">PR / Express Entry</option>
              </select>
            </div>

            {/* 4. Location */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">My Location</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-900 outline-none focus:border-[#00a896] focus:bg-white transition-all cursor-pointer"
              >
                <option value="">Select City</option>
                <option value="Mumbai, India">Mumbai, India</option>
                <option value="Delhi, India">Delhi, India</option>
                <option value="Bangalore, India">Bangalore, India</option>
                <option value="Hyderabad, India">Hyderabad, India</option>
                <option value="Punjab, India">Punjab, India</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#00a896] hover:bg-[#009485] text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] cursor-pointer mt-2"
            >
              <Search className="w-4 h-4" />
              <span>Search Consultants</span>
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

      {/* ── Fixed Bottom Navigation Bar ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 shadow-lg"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="flex items-center justify-around px-2 py-2">
          {/* Home */}
          <a href="/"
            onClick={() => setActiveNav('home')}
            className="flex flex-col items-center gap-0.5 py-1 px-3">
            <HomeIcon className={`w-5 h-5 ${activeNav === 'home' ? 'text-[#00a896]' : 'text-gray-400'}`} />
            <span className={`text-[10px] font-semibold ${activeNav === 'home' ? 'text-[#00a896]' : 'text-gray-400'}`}>Home</span>
          </a>

          {/* Search */}
          <a href="/find-experts"
            onClick={() => setActiveNav('search')}
            className="flex flex-col items-center gap-0.5 py-1 px-3">
            <Search className={`w-5 h-5 ${activeNav === 'search' ? 'text-[#00a896]' : 'text-gray-400'}`} />
            <span className={`text-[10px] font-semibold ${activeNav === 'search' ? 'text-[#00a896]' : 'text-gray-400'}`}>Search</span>
          </a>

          {/* Post (Center green button) */}
          <a href="/classifieds"
            onClick={() => setActiveNav('post')}
            className="flex flex-col items-center gap-0.5 -mt-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 border-white"
              style={{ backgroundColor: '#00a896' }}>
              <Plus className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] font-semibold text-gray-400 mt-0.5">Post</span>
          </a>

          {/* Messages */}
          <a href="/support"
            onClick={() => setActiveNav('messages')}
            className="flex flex-col items-center gap-0.5 py-1 px-3">
            <MessageSquare className={`w-5 h-5 ${activeNav === 'messages' ? 'text-[#00a896]' : 'text-gray-400'}`} />
            <span className={`text-[10px] font-semibold ${activeNav === 'messages' ? 'text-[#00a896]' : 'text-gray-400'}`}>Messages</span>
          </a>

          {/* Profile */}
          <a href="/signup"
            onClick={() => setActiveNav('profile')}
            className="flex flex-col items-center gap-0.5 py-1 px-3">
            <User className={`w-5 h-5 ${activeNav === 'profile' ? 'text-[#00a896]' : 'text-gray-400'}`} />
            <span className={`text-[10px] font-semibold ${activeNav === 'profile' ? 'text-[#00a896]' : 'text-gray-400'}`}>Profile</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
