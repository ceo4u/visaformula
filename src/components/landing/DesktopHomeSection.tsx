'use client';
import React, { useState } from 'react';
import {
  Search, ShieldCheck, FileText, Users, CheckCircle2,
  Clock, ChevronRight, Globe, Download
} from 'lucide-react';

export function DesktopHomeSection() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [selectedVisaType, setSelectedVisaType] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = [selectedCountry, selectedPurpose, selectedVisaType, selectedCity].filter(Boolean).join(' ');
    window.location.href = `/find-experts?q=${encodeURIComponent(query)}`;
  };

  const classifiedTabs = ['All', 'Jobs', 'Accommodation', 'Business', 'Study Abroad'];

  const classifieds = [
    {
      badge: 'Jobs Abroad',
      badgeBg: 'bg-[#6366f1]',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
      title: 'Caregiver Jobs in Canada',
      location: 'Toronto, Canada',
      time: '2 hours ago',
      price: 'FREE',
      priceColor: 'text-[#00a896]',
    },
    {
      badge: 'Accommodation',
      badgeBg: 'bg-[#2563eb]',
      img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop',
      title: 'Shared Room Near Humber College',
      location: 'Toronto, Canada',
      time: '5 hours ago',
      price: '$650 CAD / Month',
      priceColor: 'text-gray-900',
    },
    {
      badge: 'Study Abroad',
      badgeBg: 'bg-[#8b5cf6]',
      img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop',
      title: 'Study in Canada 2025 Intake Open',
      location: '3 Apply Now',
      applyLink: 'Apply Now',
      time: '',
      price: 'FREE',
      priceColor: 'text-[#00a896]',
    },
    {
      badge: 'Business Opportunity',
      badgeBg: 'bg-[#0284c7]',
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
      title: 'Visa Consultancy Business for Sale',
      location: 'Apply @Deco',
      time: '1 day ago',
      price: '12,00,000',
      priceColor: 'text-gray-900',
    },
    {
      badge: 'Jobs Abroad',
      badgeBg: 'bg-[#6366f1]',
      img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
      title: 'Hotel Front Desk Staff in UK',
      location: 'London, UK',
      time: '2 days ago',
      price: 'FREE',
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
          style={{ background: 'linear-gradient(90deg, #1c3570 0%, #2b4890 55%, #3a5ba0 100%)' }}
        >
          {/* Left */}
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-blue-200 tracking-wider uppercase mb-0.5">✈ SPONSORED</p>
            <h3 className="text-white font-extrabold text-xl leading-tight">Fly High with Your Dreams</h3>
            <p className="text-blue-200 text-xs font-medium mt-0.5">Best Deals on Flight Tickets</p>
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
            <a href="#" className="bg-white text-[#1c3570] font-bold text-sm px-5 py-2.5 rounded-xl shadow hover:bg-blue-50 transition whitespace-nowrap">
              Book Now
            </a>
            <div className="text-right">
              <p className="text-blue-200 text-[10px] font-bold uppercase tracking-wider">UP TO</p>
              <p className="text-white font-black text-3xl leading-none">20% OFF</p>
              <p className="text-blue-200 text-[10px] font-semibold">On International Flights</p>
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* 2. HERO — woman with luggage + city skyline photo */}
        {/* ======================================================= */}
        <div className="relative rounded-3xl overflow-hidden bg-white shadow-sm min-h-[360px] flex items-center">
          {/* RIGHT: Hero image — woman with luggage at modern city skyline */}
          <div className="absolute inset-y-0 right-0 w-[60%] pointer-events-none overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1400&auto=format&fit=crop&q=85"
              alt="Woman traveler with luggage at city"
              className="w-full h-full object-cover object-center"
            />
            {/* gradient fade so text is readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/75 to-transparent" style={{ width: '55%' }} />
          </div>

          {/* LEFT: Hero text content */}
          <div className="relative z-10 px-8 sm:px-12 py-10 max-w-[530px] space-y-5">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-[44px] font-extrabold text-gray-900 leading-[1.12] tracking-tight">
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
                Find Visa Help
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
        {/* 3. SEARCH + POPULAR DESTINATIONS (left 9) | IELTS (right 3) */}
        {/* ======================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* LEFT: Search + Popular stacked */}
          <div className="lg:col-span-9 space-y-4">

            {/* 3A. Search Form */}
            <div className="bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100 space-y-3">
              <h2 className="text-base font-bold text-gray-900">Find Visa Information &amp; Consultants</h2>
              <form onSubmit={handleSearch} className="grid grid-cols-2 lg:grid-cols-5 gap-3 items-end">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-gray-500">I want to go to</label>
                  <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-800 outline-none focus:border-[#00a896]">
                    <option value="">Select Country</option>
                    <option>Canada 🇨🇦</option><option>United Kingdom 🇬🇧</option>
                    <option>United States 🇺🇸</option><option>Australia 🇦🇺</option>
                    <option>Germany 🇩🇪</option><option>New Zealand 🇳🇿</option><option>UAE 🇦🇪</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-gray-500">I am going for</label>
                  <select value={selectedPurpose} onChange={e => setSelectedPurpose(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-800 outline-none focus:border-[#00a896]">
                    <option value="">Select Purpose</option>
                    <option>Higher Education / Study</option><option>Employment / Work</option>
                    <option>Tourism / Visit</option><option>Permanent Residency</option><option>Business / Investment</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-gray-500">Visa Type</label>
                  <select value={selectedVisaType} onChange={e => setSelectedVisaType(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-800 outline-none focus:border-[#00a896]">
                    <option value="">Select Visa Type</option>
                    <option>Student Visa</option><option>Work Permit</option>
                    <option>Tourist / Visitor Visa</option><option>PR / Express Entry</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-gray-500">My Location</label>
                  <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-800 outline-none focus:border-[#00a896]">
                    <option value="">Select City</option>
                    <option>Mumbai, India</option><option>Delhi, India</option>
                    <option>Bangalore, India</option><option>Hyderabad, India</option><option>Punjab, India</option>
                  </select>
                </div>
                <button type="submit"
                  className="w-full bg-[#00a896] hover:bg-[#009485] text-white font-bold text-sm px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md">
                  <Search className="w-4 h-4" /> Search
                </button>
              </form>
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

          {/* RIGHT 3 cols: IELTS Ad — spans full height alongside Search + Destinations */}
          <div className="lg:col-span-3">
            <div className="bg-[#eef7ff] border border-blue-100 rounded-3xl p-5 shadow-sm flex flex-col items-center text-center h-full gap-3 group">
              <div className="w-full">
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">SPONSORED</p>
                <h3 className="text-xl font-black text-gray-900 leading-tight">
                  IELTS<br /><span className="text-[#1a73e8]">Made Easy</span>
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-1">Achieve your dream score!</p>
              </div>
              <a href="/ielts" className="w-full block bg-[#1a73e8] hover:bg-blue-700 text-white font-bold text-sm py-2.5 rounded-xl shadow transition-all">
                Book Now
              </a>
              <div className="relative w-full flex-1 min-h-[180px] rounded-2xl overflow-hidden shadow">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&auto=format&fit=crop&q=80"
                  alt="Student with books"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
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
              <a key={idx} href="/classifieds"
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col">
                <div className="relative h-36 overflow-hidden bg-gray-100 shrink-0">
                  <img src={item.img} alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                  <span className={`absolute top-2 left-2 text-white text-[9px] font-bold px-2 py-0.5 rounded-full ${item.badgeBg}`}>
                    {item.badge}
                  </span>
                </div>
                <div className="p-3 space-y-0.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[11px] font-extrabold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#00a896] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-gray-400 font-medium mt-0.5">{item.location}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-50 pt-1.5 mt-1.5">
                    {item.time
                      ? <span className="text-[9.5px] text-gray-400">{item.time}</span>
                      : item.applyLink
                        ? <span className="text-[9.5px] font-bold text-[#00a896]">{item.applyLink}</span>
                        : <span />
                    }
                    <span className={`text-[10.5px] font-black ${item.priceColor}`}>{item.price}</span>
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
