'use client';
import React, { useState } from 'react';
import {
  Search, ShieldCheck, FileText, Users, ArrowRight, CheckCircle2,
  MapPin, Star, Calculator, Clock, Compass, AlertCircle, ChevronRight,
  GraduationCap, Briefcase, Plane, Globe, Building2, BookOpen,
  MessageSquare, CreditCard, User, Download, Check, Sparkles
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
      badgeBg: 'bg-[#6366f1]', // sleek indigo
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
      title: 'Caregiver Jobs in Canada',
      location: 'Toronto, Canada',
      time: '2 hours ago',
      price: 'FREE',
      priceColor: 'text-[#00a896]',
    },
    {
      badge: 'Accommodation',
      badgeBg: 'bg-[#2563eb]', // blue
      img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop',
      title: 'Shared Room Near Humber College',
      location: 'Toronto, Canada',
      time: '5 hours ago',
      price: '$650 CAD / Month',
      priceColor: 'text-gray-900',
    },
    {
      badge: 'Study Abroad',
      badgeBg: 'bg-[#8b5cf6]', // violet
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
      badgeBg: 'bg-[#0284c7]', // sky blue
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
      title: 'Visa Consultancy Business for Sale',
      location: 'Apply @Deco',
      time: '1 day ago',
      price: '12,00,000',
      priceColor: 'text-gray-900',
    },
    {
      badge: 'Jobs Abroad',
      badgeBg: 'bg-[#6366f1]', // indigo
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
    <div className="w-full bg-[#f3f4f6] text-[#111827] pb-12 antialiased">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        .hp-font { font-family: 'Plus Jakarta Sans', sans-serif !important; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-5 lg:px-6 space-y-4 pt-4 hp-font">

        {/* ======================================================= */}
        {/* 1. TOP SPONSORED FLIGHT AD BANNER */}
        {/* ======================================================= */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#1c3570] via-[#2b4890] to-[#3a5ba0] flex items-center justify-between px-6 py-3.5 min-h-[84px] shadow-md border border-blue-900/30 text-white">
          {/* Left Text Info */}
          <div className="relative z-10 flex items-center gap-3">
            <div>
              <p className="text-[10px] font-bold text-blue-200 tracking-wider uppercase flex items-center gap-1">
                <span>✈</span> SPONSORED
              </p>
              <h3 className="text-white font-extrabold text-lg sm:text-xl leading-tight mt-0.5">
                Fly High with Your Dreams
              </h3>
              <p className="text-blue-200 text-xs font-medium">Best Deals on Flight Tickets</p>
            </div>
          </div>

          {/* Center Airplane Thumbnail */}
          <div className="relative z-10 hidden md:flex items-center justify-center">
            <div className="w-24 h-14 rounded-lg overflow-hidden border border-white/20 shadow-inner bg-blue-950/40 p-0.5">
              <img
                src="https://images.unsplash.com/photo-1542296332-2e4473faf563?w=400&auto=format&fit=crop&q=80"
                alt="Airplane flying in blue sky"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>

          {/* Right Action & Offer */}
          <div className="relative z-10 flex items-center gap-5">
            <a
              href="#"
              className="bg-white text-[#1c3570] hover:bg-blue-50 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all whitespace-nowrap active:scale-95"
            >
              Book Now
            </a>
            <div className="text-right">
              <p className="text-blue-200 text-[10px] font-bold tracking-wider uppercase">UP TO</p>
              <p className="text-white font-black text-2xl sm:text-3xl leading-none tracking-tight">20% OFF</p>
              <p className="text-blue-200 text-[10px] font-semibold">On International Flights</p>
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* 2. HERO SECTION */}
        {/* ======================================================= */}
        <div className="relative rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-100 min-h-[380px] flex items-center">
          {/* Right Background Image (Paris / Eiffel Tower view) */}
          <div className="absolute inset-y-0 right-0 w-full sm:w-[62%] pointer-events-none overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1400&auto=format&fit=crop&q=80"
              alt="Eiffel Tower skyline view"
              className="w-full h-full object-cover object-right sm:object-center"
            />
            {/* Soft Gradient Fade from Left */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent w-[50%]" />
          </div>

          {/* Left Hero Content */}
          <div className="relative z-10 p-6 sm:p-10 max-w-[560px] space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-gray-900 leading-[1.15] tracking-tight">
                Your Journey<br />
                Abroad <span className="text-[#00a896]">Starts Here</span>
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm font-medium leading-relaxed max-w-md">
                Find the right visa information, trusted consultants &amp; everything you need for your journey.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/services/apply-visa"
                className="bg-[#00a896] hover:bg-[#009485] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md shadow-teal-500/20 transition-all hover:scale-[1.02] active:scale-95"
              >
                Find Visa Help
              </a>
              <a
                href="/find-experts"
                className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all hover:scale-[1.02] shadow-2xs"
              >
                Find a Consultant
              </a>
            </div>

            {/* 4 Feature Icons */}
            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-gray-100/80 max-w-md">
              {[
                { icon: <ShieldCheck className="w-5 h-5 text-[#00a896]" />, title: 'Trusted', sub: 'Consultants' },
                { icon: <FileText className="w-5 h-5 text-[#00a896]" />, title: 'Accurate', sub: 'Information' },
                { icon: <Users className="w-5 h-5 text-[#00a896]" />, title: 'Millions of', sub: 'Users' },
                { icon: <CheckCircle2 className="w-5 h-5 text-[#00a896]" />, title: 'Secure &', sub: 'Reliable' },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center space-y-1">
                  <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <p className="text-[10px] font-bold text-gray-800 leading-tight">
                    {item.title}<br />
                    <span className="font-normal text-gray-500">{item.sub}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* 3. MAIN BODY ROW: SEARCH + POPULAR DESTINATIONS (LEFT) & IELTS AD (RIGHT) */}
        {/* ======================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">

          {/* LEFT 9 COLUMNS (Search Form + Popular Destinations) */}
          <div className="lg:col-span-9 space-y-4 flex flex-col justify-between">

            {/* 3A. SEARCH FORM */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
              <h2 className="text-sm sm:text-base font-bold text-gray-900">Find Visa Information &amp; Consultants</h2>

              <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-gray-500">I want to go to</label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 outline-none focus:border-[#00a896] transition-colors"
                  >
                    <option value="">Select Country</option>
                    <option value="Canada">Canada 🇨🇦</option>
                    <option value="UK">United Kingdom 🇬🇧</option>
                    <option value="USA">United States 🇺🇸</option>
                    <option value="Australia">Australia 🇦🇺</option>
                    <option value="Germany">Germany 🇩🇪</option>
                    <option value="New Zealand">New Zealand 🇳🇿</option>
                    <option value="UAE">UAE 🇦🇪</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-gray-500">I am going for</label>
                  <select
                    value={selectedPurpose}
                    onChange={(e) => setSelectedPurpose(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 outline-none focus:border-[#00a896] transition-colors"
                  >
                    <option value="">Select Purpose</option>
                    <option value="Study">Higher Education / Study</option>
                    <option value="Work">Employment / Work</option>
                    <option value="Visit">Tourism / Visit</option>
                    <option value="PR">Permanent Residency</option>
                    <option value="Business">Business / Investment</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-gray-500">Visa Type</label>
                  <select
                    value={selectedVisaType}
                    onChange={(e) => setSelectedVisaType(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 outline-none focus:border-[#00a896] transition-colors"
                  >
                    <option value="">Select Visa Type</option>
                    <option value="Student Visa">Student Visa</option>
                    <option value="Work Permit">Work Permit</option>
                    <option value="Tourist Visa">Tourist / Visitor Visa</option>
                    <option value="Express Entry">PR / Express Entry</option>
                    <option value="Digital Nomad">Digital Nomad Visa</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-gray-500">My Location</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 outline-none focus:border-[#00a896] transition-colors"
                  >
                    <option value="">Select City</option>
                    <option value="Mumbai">Mumbai, India</option>
                    <option value="Delhi">Delhi, India</option>
                    <option value="Bangalore">Bangalore, India</option>
                    <option value="Hyderabad">Hyderabad, India</option>
                    <option value="Punjab">Punjab, India</option>
                  </select>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-[#00a896] hover:bg-[#009485] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-md shadow-teal-500/15"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </button>
                </div>
              </form>
            </div>

            {/* 3B. POPULAR DESTINATIONS */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm sm:text-base font-bold text-gray-900">Popular Destinations</h2>
                <a href="/visa-guide" className="text-xs font-semibold text-[#1a73e8] hover:underline flex items-center gap-0.5">
                  View All Countries &gt;
                </a>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
                {destinations.map((d) => (
                  <a
                    key={d.name}
                    href={d.href}
                    className="bg-white rounded-2xl border border-gray-100 p-2.5 flex flex-col items-center justify-center text-center gap-1.5 hover:shadow-md hover:border-[#00a896] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden shadow-2xs border border-gray-100 flex-shrink-0 group-hover:scale-105 transition-transform">
                      <img
                        src={`https://flagcdn.com/w80/${d.flag}.png`}
                        alt={d.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[11px] font-bold text-gray-800 leading-tight">{d.name}</span>
                  </a>
                ))}
                {/* More Button */}
                <a
                  href="/visa-guide"
                  className="bg-white rounded-2xl border border-gray-100 p-2.5 flex flex-col items-center justify-center text-center gap-1.5 hover:shadow-md hover:border-[#1a73e8] transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 group-hover:text-[#1a73e8] transition-colors">
                    <span className="text-base font-bold leading-none">···</span>
                  </div>
                  <span className="text-[11px] font-bold text-gray-800 leading-tight">More</span>
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT 3 COLUMNS (IELTS SPONSORED AD CARD - SPANS FULL HEIGHT OF SEARCH + DESTINATIONS) */}
          <div className="lg:col-span-3 flex">
            <div className="bg-[#eef7ff] border border-blue-100 rounded-3xl p-5 shadow-sm flex flex-col justify-between items-center text-center w-full relative overflow-hidden group">
              <div className="space-y-1 relative z-10 w-full">
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">SPONSORED</p>
                <h3 className="text-lg font-black text-gray-900 leading-tight">
                  IELTS<br />
                  <span className="text-[#1a73e8]">Made Easy</span>
                </h3>
                <p className="text-xs text-gray-500 font-medium">Achieve your dream score!</p>
              </div>

              {/* Book Now Button */}
              <div className="w-full my-3 relative z-10">
                <a
                  href="/ielts"
                  className="block w-full bg-[#1a73e8] hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-md transition-all"
                >
                  Book Now
                </a>
              </div>

              {/* Student Photo */}
              <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden shadow-2xs">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&auto=format&fit=crop&q=80"
                  alt="Student with books smiling"
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
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold text-gray-900">Featured Classifieds</h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {classifiedTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#00a896] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 5 Classified Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {classifieds.map((item, idx) => (
              <a
                key={idx}
                href="/classifieds"
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-2xs hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-36 overflow-hidden bg-gray-100">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
                    <span className={`absolute top-2.5 left-2.5 text-white text-[9.5px] font-bold px-2.5 py-1 rounded-full shadow-md backdrop-blur-xs ${item.badgeBg}`}>
                      {item.badge}
                    </span>
                  </div>

                  <div className="p-3.5 space-y-1">
                    <h3 className="text-xs font-extrabold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#00a896] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[10.5px] text-gray-400 font-medium">{item.location}</p>
                  </div>
                </div>

                <div className="px-3.5 pb-3.5 pt-1.5 flex items-center justify-between border-t border-gray-50 mt-1">
                  {item.time ? (
                    <span className="text-[10px] text-gray-400 font-medium">{item.time}</span>
                  ) : item.applyLink ? (
                    <span className="text-[10px] font-bold text-[#00a896]">{item.applyLink}</span>
                  ) : <span />}

                  <span className={`text-xs font-black ${item.priceColor}`}>
                    {item.price}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ======================================================= */}
        {/* 5. BOTTOM CTA ROW: VISA READINESS + DOCUMENT CHECKLIST */}
        {/* ======================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Left CTA: Visa Readiness */}
          <div className="bg-[#00a896] rounded-3xl p-6 flex items-center justify-between shadow-md text-white relative overflow-hidden">
            <div className="space-y-3 max-w-[230px] relative z-10">
              <h3 className="font-extrabold text-lg sm:text-xl leading-tight">
                Check Your Visa Readiness<br />in Just 2 Minutes
              </h3>
              <p className="text-teal-100 text-xs font-medium">Get your free score now!</p>
              <a
                href="/services/apply-visa"
                className="inline-block bg-white text-[#00a896] hover:bg-teal-50 font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all"
              >
                Check Now
              </a>
            </div>

            {/* Circular Readiness Gauge */}
            <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-teal-700/40 stroke-current"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-white stroke-current"
                  strokeDasharray="72, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl sm:text-3xl font-black leading-none text-white">72</span>
                <span className="text-[10px] text-teal-100 font-semibold">/100</span>
              </div>
            </div>
          </div>

          {/* Right CTA: Download Checklist */}
          <div className="bg-[#eef8f6] border border-teal-100 rounded-3xl p-6 flex items-center justify-between shadow-2xs relative overflow-hidden">
            <div className="space-y-3 max-w-[240px] relative z-10">
              <h3 className="font-extrabold text-lg sm:text-xl text-gray-900 leading-tight">
                Download Free<br />Visa Document Checklist
              </h3>
              <p className="text-gray-500 text-xs font-medium">Country-wise checklist for a hassle-free application.</p>
              <a
                href="/services/visa-documentation"
                className="inline-flex items-center gap-2 bg-[#00a896] hover:bg-[#009485] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-teal-500/15 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Now</span>
              </a>
            </div>

            {/* Checklist Clipboard Illustration */}
            <div className="relative z-10 w-24 h-24 flex-shrink-0 flex items-center justify-center">
              <div className="w-20 h-24 bg-white border border-teal-200 rounded-2xl shadow-sm p-3 flex flex-col justify-between">
                <div className="flex items-center gap-1 border-b border-gray-100 pb-1.5">
                  <div className="w-3 h-3 rounded-full bg-teal-500 flex items-center justify-center text-[8px] text-white font-bold">✓</div>
                  <div className="h-1.5 bg-gray-200 rounded w-full" />
                </div>
                <div className="flex items-center gap-1 border-b border-gray-100 pb-1.5">
                  <div className="w-3 h-3 rounded-full bg-amber-500 flex items-center justify-center text-[8px] text-white font-bold">✓</div>
                  <div className="h-1.5 bg-gray-200 rounded w-full" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-teal-500 flex items-center justify-center text-[8px] text-white font-bold">✓</div>
                  <div className="h-1.5 bg-gray-200 rounded w-full" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ======================================================= */}
        {/* 6. FOOTER TRUST STATS BAR */}
        {/* ======================================================= */}
        <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {[
              { icon: <ShieldCheck className="w-5 h-5 text-[#00a896]" />, title: 'Verified & Trusted', sub: 'Consultants' },
              { icon: <Globe className="w-5 h-5 text-[#00a896]" />, title: 'Wide Range of', sub: 'Visa Services' },
              { icon: <FileText className="w-5 h-5 text-[#00a896]" />, title: 'Updated Visa', sub: 'Information' },
              { icon: <CheckCircle2 className="w-5 h-5 text-[#00a896]" />, title: 'Secure & Reliable', sub: 'Platform' },
              { icon: <Clock className="w-5 h-5 text-[#00a896]" />, title: '24/7 Support &', sub: 'Guidance' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 flex-1 min-w-[150px]">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800 leading-tight">{item.title}</p>
                  <p className="text-[11px] text-gray-500 font-medium">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
