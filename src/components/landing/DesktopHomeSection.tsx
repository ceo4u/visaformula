'use client';
import React, { useState } from 'react';
import {
  Search, ShieldCheck, FileText, Users, ArrowRight, CheckCircle2,
  MapPin, Star, Calculator, Clock, Compass, AlertCircle, ChevronRight,
  GraduationCap, Briefcase, Plane, Globe, Building2, BookOpen,
  MessageSquare, CreditCard, User, Download, Check
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
      badgeColor: 'bg-purple-600',
      img: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400&auto=format&fit=crop&q=80',
      title: 'Caregiver Jobs in Canada',
      location: 'Toronto, Canada',
      time: '2 hours ago',
      price: 'FREE',
      priceColor: 'text-green-600',
    },
    {
      badge: 'Accommodation',
      badgeColor: 'bg-blue-500',
      img: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&auto=format&fit=crop&q=80',
      title: 'Shared Room Near Humber College',
      location: 'Toronto, Canada',
      time: '5 hours ago',
      price: '$650 CAD / Month',
      priceColor: 'text-slate-800',
    },
    {
      badge: 'Study Abroad',
      badgeColor: 'bg-pink-500',
      img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&auto=format&fit=crop&q=80',
      title: 'Study in Canada 2025 Intake Open',
      location: '3 Apply Now',
      time: '',
      price: 'FREE',
      priceColor: 'text-green-600',
      cta: 'Apply Now',
    },
    {
      badge: 'Business Opportunity',
      badgeColor: 'bg-teal-500',
      img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&auto=format&fit=crop&q=80',
      title: 'Visa Consultancy Business for Sale',
      location: 'Apply @Deco',
      time: '1 day ago',
      price: '12,00,000',
      priceColor: 'text-slate-800',
    },
    {
      badge: 'Jobs Abroad',
      badgeColor: 'bg-purple-600',
      img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop&q=80',
      title: 'Hotel Front Desk Staff in UK',
      location: 'London, UK',
      time: '2 days ago',
      price: 'FREE',
      priceColor: 'text-green-600',
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .hp-font { font-family: 'Inter', sans-serif !important; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 lg:px-6 space-y-4 pt-4 hp-font">

        {/* ======================================================= */}
        {/* 1. TOP FLIGHT AD BANNER */}
        {/* ======================================================= */}
        <div className="relative rounded-xl overflow-hidden bg-[#1a237e] flex items-center justify-between px-6 py-4 min-h-[90px] shadow-md">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a237e] via-[#283593] to-[#1565c0]" />
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&auto=format&fit=crop&q=60"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Left text */}
          <div className="relative z-10 space-y-0.5">
            <p className="text-blue-200 text-[11px] font-medium uppercase tracking-widest">✈ Sponsored</p>
            <h3 className="text-white font-extrabold text-xl leading-tight">Fly High with Your Dreams</h3>
            <p className="text-blue-200 text-sm">Best Deals on Flight Tickets</p>
          </div>

          {/* Center: airplane image */}
          <div className="relative z-10 flex-1 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=400&auto=format&fit=crop&q=80"
              alt="Airplane"
              className="h-16 w-auto object-contain drop-shadow-xl"
            />
          </div>

          {/* Book Now button */}
          <div className="relative z-10 flex items-center gap-6">
            <a
              href="#"
              className="bg-white text-[#1a237e] font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors shadow-md whitespace-nowrap"
            >
              Book Now
            </a>
            <div className="text-right">
              <p className="text-blue-200 text-[11px] font-semibold uppercase tracking-wide">UP TO</p>
              <p className="text-white font-black text-3xl leading-none">20% OFF</p>
              <p className="text-blue-200 text-[11px] font-medium">On International Flights</p>
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* 2. HERO SECTION */}
        {/* ======================================================= */}
        <div className="relative rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 min-h-[340px] flex items-center">
          {/* Right background image */}
          <div className="absolute inset-y-0 right-0 w-[55%] pointer-events-none overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&auto=format&fit=crop&q=80"
              alt="Woman traveler with luggage at city"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent w-[45%]" />
          </div>

          {/* Left content */}
          <div className="relative z-10 px-8 py-10 max-w-[520px] space-y-5">
            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
                Your Journey<br />
                Abroad <span className="text-[#00a896]">Starts Here</span>
              </h1>
              <p className="text-gray-500 text-[15px] leading-relaxed">
                Find the right visa information, trusted<br />
                consultants &amp; everything you need<br />
                for your journey.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/services/apply-visa"
                className="bg-[#00a896] hover:bg-[#009485] text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-md transition-all hover:scale-105"
              >
                Find Visa Help
              </a>
              <a
                href="/find-experts"
                className="bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm px-6 py-3 rounded-lg border border-gray-300 transition-all hover:scale-105"
              >
                Find a Consultant
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1">
              {[
                { icon: <ShieldCheck className="w-5 h-5" />, label: 'Trusted', sub: 'Consultants' },
                { icon: <FileText className="w-5 h-5" />, label: 'Accurate', sub: 'Information' },
                { icon: <Users className="w-5 h-5" />, label: 'Millions of', sub: 'Users' },
                { icon: <CheckCircle2 className="w-5 h-5" />, label: 'Secure &', sub: 'Reliable' },
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-1">
                  <div className="text-[#00a896]">{b.icon}</div>
                  <p className="text-[11px] text-gray-600 leading-tight font-medium">{b.label}<br />{b.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* 3. SEARCH BAR + IELTS SIDEBAR */}
        {/* ======================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">

          {/* Search Form */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-[15px] font-bold text-gray-900">Find Visa Information &amp; Consultants</h2>

            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500">I want to go to</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#00a896] transition-colors"
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
                <label className="text-[11px] font-semibold text-gray-500">I am going for</label>
                <select
                  value={selectedPurpose}
                  onChange={(e) => setSelectedPurpose(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#00a896] transition-colors"
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
                <label className="text-[11px] font-semibold text-gray-500">Visa Type</label>
                <select
                  value={selectedVisaType}
                  onChange={(e) => setSelectedVisaType(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#00a896] transition-colors"
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
                <label className="text-[11px] font-semibold text-gray-500">My Location</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#00a896] transition-colors"
                >
                  <option value="">Select City</option>
                  <option value="Mumbai">Mumbai, India</option>
                  <option value="Delhi">Delhi, India</option>
                  <option value="Bangalore">Bangalore, India</option>
                  <option value="Hyderabad">Hyderabad, India</option>
                  <option value="Punjab">Punjab, India</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#00a896] hover:bg-[#009485] text-white font-bold text-sm px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-md"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </form>
          </div>

          {/* IELTS Sidebar Ad */}
          <div className="lg:col-span-1">
            <a href="/ielts" className="relative bg-[#e8f4fd] border border-blue-200 rounded-2xl overflow-hidden flex flex-col items-center p-4 shadow-sm hover:shadow-md transition-shadow group block">
              <p className="text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-1">Sponsored</p>
              <h4 className="text-[17px] font-extrabold text-gray-900 text-center leading-tight">IELTS<br /><span className="text-[#1a73e8]">Made Easy</span></h4>
              <p className="text-gray-500 text-xs text-center mt-1 mb-3">Achieve your dream score!</p>
              <div className="relative w-full h-28 rounded-xl overflow-hidden mb-3">
                <img
                  src="https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=400&auto=format&fit=crop&q=80"
                  alt="IELTS coaching"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="bg-[#1a73e8] text-white font-bold text-sm px-5 py-2 rounded-lg w-full text-center">
                Book Now
              </span>
            </a>
          </div>
        </div>

        {/* ======================================================= */}
        {/* 4. POPULAR DESTINATIONS */}
        {/* ======================================================= */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[15px] font-bold text-gray-900">Popular Destinations</h2>
            <a href="/visa-guide" className="text-[13px] font-medium text-[#1a73e8] flex items-center gap-0.5 hover:underline">
              View All Countries <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex items-start justify-between gap-2 overflow-x-auto no-scrollbar pb-1">
            {destinations.map((d) => (
              <a
                key={d.name}
                href={d.href}
                className="flex flex-col items-center gap-2 min-w-[70px] hover:-translate-y-1 transition-transform group"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm group-hover:border-[#00a896] transition-colors">
                  <img
                    src={`https://flagcdn.com/w80/${d.flag}.png`}
                    alt={d.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[12px] font-medium text-gray-700 text-center">{d.name}</span>
              </a>
            ))}
            {/* More */}
            <a href="/visa-guide" className="flex flex-col items-center gap-2 min-w-[70px] hover:-translate-y-1 transition-transform group">
              <div className="w-14 h-14 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-[#1a73e8] group-hover:text-[#1a73e8] transition-colors bg-gray-50">
                <span className="text-[22px] leading-none">···</span>
              </div>
              <span className="text-[12px] font-medium text-gray-700 text-center">More</span>
            </a>
          </div>
        </div>

        {/* ======================================================= */}
        {/* 5. FEATURED CLASSIFIEDS */}
        {/* ======================================================= */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-gray-900">Featured Classifieds</h2>
            <a href="/classifieds" className="text-[13px] font-medium text-[#1a73e8] flex items-center gap-0.5 hover:underline">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {classifiedTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all shrink-0 cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#111827] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Classifieds Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {classifieds.map((item, i) => (
              <a
                key={i}
                href="/classifieds"
                className="group bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all"
              >
                <div className="relative h-28 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className={`absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>
                <div className="p-2.5 space-y-1">
                  <h3 className="text-[12px] font-semibold text-gray-900 leading-tight line-clamp-2">{item.title}</h3>
                  <p className="text-[10px] text-gray-400">{item.location}</p>
                  <div className="flex items-center justify-between">
                    {item.time && <span className="text-[10px] text-gray-400">{item.time}</span>}
                    {item.cta && <span className="text-[10px] font-bold text-[#00a896]">{item.cta}</span>}
                    <span className={`text-[11px] font-bold ${item.priceColor}`}>{item.price}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ======================================================= */}
        {/* 6. CTA ROW: VISA READINESS + DOCUMENT CHECKLIST */}
        {/* ======================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Left: Visa Readiness */}
          <div className="bg-[#00a896] rounded-2xl p-6 flex items-center justify-between shadow-md overflow-hidden relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            </div>
            <div className="relative z-10 space-y-2 max-w-[210px]">
              <h3 className="text-white font-extrabold text-[17px] leading-snug">Check Your Visa Readiness in Just 2 Minutes</h3>
              <p className="text-teal-100 text-[12px]">Get your free score now!</p>
              <a
                href="/services/apply-visa"
                className="inline-block bg-white text-[#00a896] font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-teal-50 transition-colors shadow-md"
              >
                Check Now
              </a>
            </div>
            {/* Circular gauge */}
            <div className="relative z-10 w-28 h-28 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/20 stroke-current"
                  strokeWidth="3.2"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-white stroke-current"
                  strokeDasharray="72, 100"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-white font-black text-3xl leading-none">72</span>
                <span className="text-white/70 text-[11px]">/100</span>
              </div>
            </div>
          </div>

          {/* Right: Download Checklist */}
          <div className="bg-white rounded-2xl p-6 flex items-center justify-between shadow-sm border border-gray-100 overflow-hidden relative">
            <div className="space-y-2">
              <h3 className="text-gray-900 font-extrabold text-[17px] leading-snug">Download Free<br />Visa Document Checklist</h3>
              <p className="text-gray-500 text-[12px]">Country-wise checklist for a hassle-free application.</p>
              <a
                href="/services/visa-documentation"
                className="inline-flex items-center gap-2 bg-[#00a896] text-white font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-[#009485] transition-colors shadow-md"
              >
                <Download className="w-4 h-4" />
                Download Now
              </a>
            </div>
            {/* Illustration */}
            <div className="w-28 h-28 flex-shrink-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-20 h-24 bg-blue-50 border-2 border-blue-200 rounded-lg flex flex-col items-center justify-center gap-1.5 p-2">
                  <FileText className="w-8 h-8 text-[#00a896]" />
                  {[1,2,3].map(j => (
                    <div key={j} className="flex items-center gap-1 w-full">
                      <Check className="w-2.5 h-2.5 text-green-500 flex-shrink-0" />
                      <div className="h-1.5 bg-gray-200 rounded flex-1" />
                    </div>
                  ))}
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-orange-400 rounded-full flex items-center justify-center shadow">
                  <Download className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* 7. FOOTER STATS BAR */}
        {/* ======================================================= */}
        <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {[
              { icon: <ShieldCheck className="w-5 h-5 text-[#00a896]" />, label: 'Verified & Trusted', sub: 'Consultants' },
              { icon: <Globe className="w-5 h-5 text-[#00a896]" />, label: 'Wide Range of', sub: 'Visa Services' },
              { icon: <FileText className="w-5 h-5 text-[#00a896]" />, label: 'Updated Visa', sub: 'Information' },
              { icon: <CheckCircle2 className="w-5 h-5 text-[#00a896]" />, label: 'Secure & Reliable', sub: 'Platform' },
              { icon: <Clock className="w-5 h-5 text-[#00a896]" />, label: '24/7 Support &', sub: 'Guidance' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2.5 flex-1 min-w-[140px]">
                <div className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                  {s.icon}
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-gray-800">{s.label}</p>
                  <p className="text-[11px] text-gray-500">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
