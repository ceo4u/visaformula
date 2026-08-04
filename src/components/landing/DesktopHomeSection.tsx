import React, { useState } from 'react';
import { 
  Search, ShieldCheck, FileText, Users, ArrowRight, CheckCircle2, 
  MapPin, Star, Calculator, Clock, Compass, AlertCircle, Sparkles, 
  Send, Mail, ChevronRight, Filter, ChevronDown, Check, Building2, Briefcase, GraduationCap, Plane, Home as HomeIcon, X, Globe
} from 'lucide-react';
import { AuthModalPortalContent } from '../interactive/AuthModalPortal';

export function DesktopHomeSection() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [selectedVisaType, setSelectedVisaType] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [activeClassifiedTab, setActiveClassifiedTab] = useState('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = [selectedCountry, selectedPurpose, selectedVisaType, selectedCity].filter(Boolean).join(' ');
    window.location.href = `/find-experts?q=${encodeURIComponent(query)}`;
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setNewsletterSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="w-full bg-[#f3f4f6] text-[#111827] font-['Plus_Jakarta_Sans',sans-serif] pb-16 antialiased selection:bg-[#2563eb]/20 selection:text-[#2563eb]">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif !important; }
      `}} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4 font-jakarta">

        {/* ========================================================================= */}
        {/* 1. TOP HEADER AD BANNERS ROW */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          
          {/* Left Ad Banner: Canada Study Promo */}
          <div className="md:col-span-2 relative bg-[#0b2545] text-white rounded-xl p-4 overflow-hidden shadow-sm flex items-center justify-between min-h-[90px] border border-[#1e3a8a]/30">
            <img 
              src="https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&auto=format&fit=crop&q=80" 
              alt="Canada CN Tower Skyline" 
              className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-overlay"
            />
            <div className="relative z-10 space-y-1">
              <span className="bg-[#1e40af] text-blue-200 font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full inline-block">
                STUDY IN CANADA
              </span>
              <h3 className="text-sm sm:text-base font-extrabold tracking-tight text-white drop-shadow-sm">
                Build your future in top ranked universities
              </h3>
            </div>
            <a 
              href="/universities?country=canada" 
              className="relative z-10 shrink-0 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs px-4 py-2 rounded-lg backdrop-blur-md transition-all hover:scale-105"
            >
              Learn More
            </a>
          </div>

          {/* Top Luxury Banner Ad (728x90 Size Matched) */}
          <a href="/find-experts" className="md:col-span-1 relative rounded-xl overflow-hidden shadow-sm group min-h-[90px] h-full block border border-amber-300/40">
            <img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80" 
              alt="Luxury Golden Visa Ad" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-transparent p-3 flex flex-col justify-center text-white z-10">
              <span className="bg-amber-400 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider w-fit">GOLDEN VISA</span>
              <h4 className="text-xs font-black tracking-tight text-white mt-0.5 leading-tight">Europe & Caribbean PR Concierge</h4>
              <span className="text-[9.5px] text-amber-200 font-bold mt-0.5 flex items-center gap-1 group-hover:translate-x-1 transition-transform">Get Fast-Track Visa →</span>
            </div>
          </a>

        </div>

        {/* ========================================================================= */}
        {/* 2. MAIN HERO SECTION BANNER MATCHING USER REFERENCE IMAGE 100% */}
        {/* ========================================================================= */}
        <div className="relative rounded-2xl overflow-hidden bg-white text-slate-900 p-6 sm:p-10 shadow-sm border border-slate-200/80 min-h-[420px] flex items-center">
          
          {/* Background Airport Departure Window with Suitcase, Hat, Passport & Airplane */}
          <div className="absolute inset-y-0 right-0 w-full sm:w-[65%] overflow-hidden pointer-events-none">
            <img 
              src="https://images.unsplash.com/photo-1542296332-2e4473faf563?w=1600&auto=format&fit=crop&q=80" 
              alt="Airport Departure Lounge Window view with Airplane, Suitcase & Passport" 
              className="w-full h-full object-cover object-right"
            />
            {/* Smooth left gradient overlay transitioning image to white */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent w-[55%]" />
          </div>

          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-3 max-w-lg">
                <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-[#111827] leading-[1.15]">
                  Your Journey Abroad <br />
                  Starts <span className="text-[#00a896]">Here</span>
                </h1>
                <p className="text-[#374151] text-xs sm:text-sm font-normal leading-[1.6]">
                  Find visa information, explore your options <br />
                  and connect with trusted immigration <br />
                  professionals.
                </p>
              </div>

              {/* 3 Feature Badges */}
              <div className="flex flex-wrap gap-3.5 text-xs font-medium text-slate-700 pt-1">
                {/* Badge 1: Trusted Verified Consultants */}
                <div className="flex items-center gap-2.5 bg-[#f0fdfa] border border-[#99f6e4]/80 px-3.5 py-2 rounded-xl shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-[#00a896] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-[10px] leading-tight">
                    <span className="font-semibold block text-slate-900 text-[11px]">Trusted</span>
                    <span className="font-normal text-slate-500">Verified Consultants</span>
                  </div>
                </div>

                {/* Badge 2: Accurate Visa Information */}
                <div className="flex items-center gap-2.5 bg-[#f0fdfa] border border-[#99f6e4]/80 px-3.5 py-2 rounded-xl shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-[#00a896] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="text-[10px] leading-tight">
                    <span className="font-semibold block text-slate-900 text-[11px]">Accurate</span>
                    <span className="font-normal text-slate-500">Visa Information</span>
                  </div>
                </div>

                {/* Badge 3: Millions of users Every Month */}
                <div className="flex items-center gap-2.5 bg-[#f0fdfa] border border-[#99f6e4]/80 px-3.5 py-2 rounded-xl shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-[#00a896] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="text-[10px] leading-tight">
                    <span className="font-semibold block text-slate-900 text-[11px]">Millions of users</span>
                    <span className="font-normal text-slate-500">Every Month</span>
                  </div>
                </div>
              </div>

              {/* 2 CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a 
                  href="/services/apply-visa" 
                  className="bg-[#00a896] hover:bg-[#028090] text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md shadow-teal-500/20 transition-all flex items-center gap-2.5 hover:scale-105 active:scale-95"
                >
                  <span>Find My Visa Path</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href="/find-experts" 
                  className="bg-white hover:bg-slate-50 text-[#111827] border border-slate-300 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all flex items-center gap-2.5 shadow-2xs hover:scale-105"
                >
                  <span>Find a Consultant</span>
                  <ArrowRight className="w-4 h-4 text-slate-900" />
                </a>
              </div>
            </div>

            {/* Right Interactive Readiness Score Card */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-xl border border-slate-100 text-center w-full max-w-[270px] space-y-4">
                <h3 className="text-[14px] font-bold text-slate-900">
                  Free Visa Readiness Check
                </h3>

                {/* Circular Gauge Ring (72/100) */}
                <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100 stroke-current"
                      strokeWidth="3.2"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#00a896] stroke-current"
                      strokeDasharray="72, 100"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-[32px] font-bold text-[#111827] leading-none">72</span>
                    <span className="text-[11px] font-normal text-slate-400 mt-0.5">/100</span>
                  </div>
                </div>

                <div>
                  <p className="text-[12px] font-medium text-slate-500">Your Application Readiness</p>
                  <a 
                    href="/services/apply-visa" 
                    className="mt-3 block w-full bg-[#00a896] hover:bg-[#028090] text-white font-semibold text-[13px] py-2.5 rounded-xl shadow-md shadow-teal-500/15 transition-all active:scale-95 cursor-pointer"
                  >
                    Check Now - It's Free
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. FIND VISA INFORMATION & CONSULTANTS SEARCH FILTER WIDGET */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
          <h2 className="text-sm sm:text-base font-extrabold text-[#111827] tracking-tight">
            Find Visa Information & Consultants
          </h2>

          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
            {/* 1. Country Dropdown */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600">I want to go to</label>
              <select 
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-[#00a896] transition-colors"
              >
                <option value="">Select Country</option>
                <option value="Canada">Canada 🇨🇦</option>
                <option value="UK">United Kingdom 🇬🇧</option>
                <option value="USA">United States 🇺🇸</option>
                <option value="Australia">Australia 🇦🇺</option>
                <option value="Germany">Germany 🇩🇪</option>
                <option value="New Zealand">New Zealand 🇳🇿</option>
              </select>
            </div>

            {/* 2. Purpose Dropdown */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600">I am going for</label>
              <select 
                value={selectedPurpose}
                onChange={(e) => setSelectedPurpose(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-[#00a896] transition-colors"
              >
                <option value="">Select Purpose</option>
                <option value="Study">Higher Education / Study</option>
                <option value="Work">Employment / Work</option>
                <option value="Visit">Tourism / Visit</option>
                <option value="PR">Permanent Residency</option>
                <option value="Business">Business / Investment</option>
              </select>
            </div>

            {/* 3. Visa Type Dropdown */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600">Visa Type</label>
              <select 
                value={selectedVisaType}
                onChange={(e) => setSelectedVisaType(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-[#00a896] transition-colors"
              >
                <option value="">Select Visa Type</option>
                <option value="Student Visa">Student Visa</option>
                <option value="Work Permit">Work Permit</option>
                <option value="Tourist Visa">Tourist / Visitor Visa</option>
                <option value="Express Entry">PR / Express Entry</option>
                <option value="Digital Nomad">Digital Nomad Visa</option>
              </select>
            </div>

            {/* 4. Location Dropdown */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600">My Location</label>
              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-[#00a896] transition-colors"
              >
                <option value="">Select City</option>
                <option value="Mumbai">Mumbai, India</option>
                <option value="Delhi">Delhi, India</option>
                <option value="Bangalore">Bangalore, India</option>
                <option value="Hyderabad">Hyderabad, India</option>
                <option value="Punjab">Punjab, India</option>
                <option value="London">London, UK</option>
                <option value="Toronto">Toronto, Canada</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="pt-5 sm:pt-4">
              <button 
                type="submit"
                className="w-full bg-[#00a896] hover:bg-[#028090] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-teal-500/20 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Popular Searches Pills */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-slate-600">Popular Searches:</span>
            <a href="/find-experts?q=Canada+Study+Visa" className="text-[#00a896] hover:text-[#028090] font-semibold hover:underline">Canada Study Visa</a>
            <span className="text-slate-300">•</span>
            <a href="/find-experts?q=UK+Visitor+Visa" className="text-[#00a896] hover:text-[#028090] font-semibold hover:underline">UK Visitor Visa</a>
            <span className="text-slate-300">•</span>
            <a href="/find-experts?q=Australia+PR" className="text-[#00a896] hover:text-[#028090] font-semibold hover:underline">Australia PR</a>
            <span className="text-slate-300">•</span>
            <a href="/find-experts?q=USA+Tourist+Visa" className="text-[#00a896] hover:text-[#028090] font-semibold hover:underline">USA Tourist Visa</a>
            <span className="text-slate-300">•</span>
            <a href="/find-experts?q=Schengen+Visa" className="text-[#00a896] hover:text-[#028090] font-semibold hover:underline">Schengen Visa</a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. MAIN BODY GRID: 2 COLUMNS (LEFT 75%, RIGHT SIDEBAR 25%) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT MAIN CONTENT COLUMN (LG:COL-SPAN-9) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* SECTION 4A: POPULAR DESTINATIONS (7 FLAG CARDS) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h2 className="text-base font-extrabold text-[#111827] tracking-tight">Popular Destinations</h2>
                <a href="/visa-guide" className="text-xs font-bold text-[#00a896] hover:underline flex items-center gap-1">
                  View all Countries <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {/* 1. Canada */}
                <a href="/visa-guide/canada" className="bg-white rounded-xl border border-slate-200 p-3 text-center space-y-2 hover:shadow-md transition-all hover:-translate-y-1 group">
                  <div className="w-11 h-11 mx-auto rounded-full bg-slate-50 flex items-center justify-center shadow-2xs border border-slate-100 overflow-hidden p-0.5 group-hover:scale-110 transition-transform">
                    <img src="https://flagcdn.com/w80/ca.png" alt="Canada Flag" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900">Canada</h3>
                    <p className="text-[10px] font-semibold text-slate-500">Study, Work, PR</p>
                  </div>
                </a>

                {/* 2. UK */}
                <a href="/visa-guide/uk" className="bg-white rounded-xl border border-slate-200 p-3 text-center space-y-2 hover:shadow-md transition-all hover:-translate-y-1 group">
                  <div className="w-11 h-11 mx-auto rounded-full bg-slate-50 flex items-center justify-center shadow-2xs border border-slate-100 overflow-hidden p-0.5 group-hover:scale-110 transition-transform">
                    <img src="https://flagcdn.com/w80/gb.png" alt="UK Flag" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900">UK</h3>
                    <p className="text-[10px] font-semibold text-slate-500">Study, Work, Visit</p>
                  </div>
                </a>

                {/* 3. USA */}
                <a href="/visa-guide/usa" className="bg-white rounded-xl border border-slate-200 p-3 text-center space-y-2 hover:shadow-md transition-all hover:-translate-y-1 group">
                  <div className="w-11 h-11 mx-auto rounded-full bg-slate-50 flex items-center justify-center shadow-2xs border border-slate-100 overflow-hidden p-0.5 group-hover:scale-110 transition-transform">
                    <img src="https://flagcdn.com/w80/us.png" alt="USA Flag" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900">USA</h3>
                    <p className="text-[10px] font-semibold text-slate-500">Study, Work, Visit</p>
                  </div>
                </a>

                {/* 4. Australia */}
                <a href="/visa-guide/australia" className="bg-white rounded-xl border border-slate-200 p-3 text-center space-y-2 hover:shadow-md transition-all hover:-translate-y-1 group">
                  <div className="w-11 h-11 mx-auto rounded-full bg-slate-50 flex items-center justify-center shadow-2xs border border-slate-100 overflow-hidden p-0.5 group-hover:scale-110 transition-transform">
                    <img src="https://flagcdn.com/w80/au.png" alt="Australia Flag" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900">Australia</h3>
                    <p className="text-[10px] font-semibold text-slate-500">Study, Work, PR</p>
                  </div>
                </a>

                {/* 5. Germany */}
                <a href="/visa-guide/germany" className="bg-white rounded-xl border border-slate-200 p-3 text-center space-y-2 hover:shadow-md transition-all hover:-translate-y-1 group">
                  <div className="w-11 h-11 mx-auto rounded-full bg-slate-50 flex items-center justify-center shadow-2xs border border-slate-100 overflow-hidden p-0.5 group-hover:scale-110 transition-transform">
                    <img src="https://flagcdn.com/w80/de.png" alt="Germany Flag" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900">Germany</h3>
                    <p className="text-[10px] font-semibold text-slate-500">Study, Work</p>
                  </div>
                </a>

                {/* 6. New Zealand */}
                <a href="/visa-guide/new-zealand" className="bg-white rounded-xl border border-slate-200 p-3 text-center space-y-2 hover:shadow-md transition-all hover:-translate-y-1 group">
                  <div className="w-11 h-11 mx-auto rounded-full bg-slate-50 flex items-center justify-center shadow-2xs border border-slate-100 overflow-hidden p-0.5 group-hover:scale-110 transition-transform">
                    <img src="https://flagcdn.com/w80/nz.png" alt="New Zealand Flag" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900">New Zealand</h3>
                    <p className="text-[10px] font-semibold text-slate-500">Study, Work, PR</p>
                  </div>
                </a>

                {/* 7. More Countries */}
                <a href="/visa-guide" className="bg-white rounded-xl border border-slate-200 p-3 text-center space-y-2 hover:shadow-md transition-all hover:-translate-y-1 group">
                  <div className="w-11 h-11 mx-auto rounded-full bg-[#e6fffa] text-[#00a896] flex items-center justify-center shadow-2xs border border-[#b2f5ea] group-hover:bg-[#00a896] group-hover:text-white transition-all">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900">More Countries</h3>
                    <p className="text-[10px] font-semibold text-[#00a896]">Explore Now</p>
                  </div>
                </a>
              </div>
            </div>

            {/* SECTION 4B: FREE TOOLS & RESOURCES (6 CARDS) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h2 className="text-base font-extrabold text-[#111827] tracking-tight">Free Tools & Resources</h2>
                <a href="/migration-tools" className="text-xs font-bold text-[#00a896] hover:underline flex items-center gap-1">
                  View all Tools <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {/* 1. Visa Readiness Check */}
                <a href="/services/apply-visa" className="bg-white rounded-xl border border-slate-200 p-3.5 text-center space-y-2 hover:shadow-md transition-all hover:border-[#00a896] group">
                  <div className="w-9 h-9 mx-auto rounded-full bg-[#e6fffa] text-[#00a896] group-hover:bg-[#00a896] group-hover:text-white flex items-center justify-center border border-[#b2f5ea] transition-all">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-extrabold text-slate-900 leading-tight">Visa Readiness Check</h3>
                </a>

                {/* 2. Document Checklist */}
                <a href="/services/visa-documentation" className="bg-white rounded-xl border border-slate-200 p-3.5 text-center space-y-2 hover:shadow-md transition-all hover:border-[#00a896] group">
                  <div className="w-9 h-9 mx-auto rounded-full bg-[#e6fffa] text-[#00a896] group-hover:bg-[#00a896] group-hover:text-white flex items-center justify-center border border-[#b2f5ea] transition-all">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-extrabold text-slate-900 leading-tight">Document Checklist</h3>
                </a>

                {/* 3. Visa Cost Calculator */}
                <a href="/migration-tools" className="bg-white rounded-xl border border-slate-200 p-3.5 text-center space-y-2 hover:shadow-md transition-all hover:border-[#00a896] group">
                  <div className="w-9 h-9 mx-auto rounded-full bg-[#e6fffa] text-[#00a896] group-hover:bg-[#00a896] group-hover:text-white flex items-center justify-center border border-[#b2f5ea] transition-all">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-extrabold text-slate-900 leading-tight">Visa Cost Calculator</h3>
                </a>

                {/* 4. Processing Time Checker */}
                <a href="/migration-tools" className="bg-white rounded-xl border border-slate-200 p-3.5 text-center space-y-2 hover:shadow-md transition-all hover:border-[#00a896] group">
                  <div className="w-9 h-9 mx-auto rounded-full bg-[#e6fffa] text-[#00a896] group-hover:bg-[#00a896] group-hover:text-white flex items-center justify-center border border-[#b2f5ea] transition-all">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-extrabold text-slate-900 leading-tight">Processing Time Checker</h3>
                </a>

                {/* 5. Visa Path Finder */}
                <a href="/services/apply-visa" className="bg-white rounded-xl border border-slate-200 p-3.5 text-center space-y-2 hover:shadow-md transition-all hover:border-[#00a896] group">
                  <div className="w-9 h-9 mx-auto rounded-full bg-[#e6fffa] text-[#00a896] group-hover:bg-[#00a896] group-hover:text-white flex items-center justify-center border border-[#b2f5ea] transition-all">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-extrabold text-slate-900 leading-tight">Visa Path Finder</h3>
                </a>

                {/* 6. Refusal Reasons Guide */}
                <a href="/support" className="bg-white rounded-xl border border-slate-200 p-3.5 text-center space-y-2 hover:shadow-md transition-all hover:border-[#00a896] group">
                  <div className="w-9 h-9 mx-auto rounded-full bg-[#e6fffa] text-[#00a896] group-hover:bg-[#00a896] group-hover:text-white flex items-center justify-center border border-[#b2f5ea] transition-all">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-extrabold text-slate-900 leading-tight">Refusal Reasons Guide</h3>
                </a>
              </div>
            </div>

            {/* SECTION 4C: CLASSIFIEDS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h2 className="text-base font-extrabold text-[#111827] tracking-tight">Classifieds</h2>
                <a href="/jobs" className="text-xs font-bold text-[#00a896] hover:underline flex items-center gap-1">
                  View all Classifieds <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Classified Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
                {['All', 'Jobs Abroad', 'Accommodation', 'Study Abroad', 'Business Opportunities', 'Buy & Sell', 'Others'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveClassifiedTab(tab)}
                    className={`px-3.5 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
                      activeClassifiedTab === tab
                        ? 'bg-[#00a896] text-white shadow-sm'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* 4 Classified Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* 1. Caregiver Jobs in Canada */}
                <div className="bg-white rounded-xl border border-slate-200 p-3.5 flex flex-col justify-between space-y-3 hover:shadow-md transition-all">
                  <div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                      Jobs Abroad
                    </span>
                    <h3 className="text-xs font-extrabold text-slate-900 mt-2 leading-snug">
                      Caregiver Jobs in Canada
                    </h3>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 pt-2 border-t border-slate-100">
                    <span>Toronto, Canada</span>
                    <span>2 hours ago</span>
                  </div>
                </div>

                {/* 2. Shared Room Near Humber College */}
                <div className="bg-white rounded-xl border border-slate-200 p-3.5 flex flex-col justify-between space-y-3 hover:shadow-md transition-all">
                  <div>
                    <span className="bg-indigo-100 text-indigo-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                      Accommodation
                    </span>
                    <h3 className="text-xs font-extrabold text-slate-900 mt-2 leading-snug">
                      Shared Room Near Humber College
                    </h3>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 pt-2 border-t border-slate-100">
                    <span>Toronto, Canada</span>
                    <span>5 hours ago</span>
                  </div>
                </div>

                {/* 3. Masters in Australia 2026 Intake */}
                <div className="bg-white rounded-xl border border-slate-200 p-3.5 flex flex-col justify-between space-y-3 hover:shadow-md transition-all">
                  <div>
                    <span className="bg-pink-100 text-pink-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                      Study Abroad
                    </span>
                    <h3 className="text-xs font-extrabold text-slate-900 mt-2 leading-snug">
                      Masters in Australia 2026 Intake
                    </h3>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 pt-2 border-t border-slate-100">
                    <span className="text-slate-600">Apply Now</span>
                    <span>1 day ago</span>
                  </div>
                </div>

                {/* 4. Start Your Own Visa Consultancy */}
                <div className="bg-white rounded-xl border border-slate-200 p-3.5 flex flex-col justify-between space-y-3 hover:shadow-md transition-all">
                  <div>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                      Business
                    </span>
                    <h3 className="text-xs font-extrabold text-slate-900 mt-2 leading-snug">
                      Start Your Own Visa Consultancy
                    </h3>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 pt-2 border-t border-slate-100">
                    <span>High Profit Business</span>
                    <span>2 days ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 4D: FEATURED CONSULTANTS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h2 className="text-base font-extrabold text-[#111827] tracking-tight">Featured Consultants</h2>
                <a href="/find-experts" className="text-xs font-bold text-[#00a896] hover:underline flex items-center gap-1">
                  View all Consultants <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* 1. GlobalWay Immigration */}
                <div className="bg-white rounded-xl border border-slate-200 p-3.5 text-center space-y-2.5 hover:shadow-md transition-all">
                  <div className="flex items-center justify-center gap-2 pb-1 border-b border-slate-100">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-red-500 flex items-center justify-center text-white font-black text-xs">
                      G
                    </div>
                    <span className="font-extrabold text-xs text-slate-900">GlobalWay <span className="font-semibold text-slate-500">Immigration</span></span>
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900">GlobalWay Immigration</h3>
                    <p className="text-[10px] font-semibold text-slate-500 flex items-center justify-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" /> Hyderabad, India
                    </p>
                  </div>
                  <div className="text-[10px] font-bold text-amber-500 flex items-center justify-center gap-1">
                    <span>4.9</span>
                    <span>⭐⭐⭐⭐⭐</span>
                    <span className="text-slate-400">(128)</span>
                  </div>
                  <p className="text-[10px] font-semibold text-slate-500">Canada, UK, Australia</p>
                  <p className="text-[10px] font-bold text-[#00a896]">👥 1200+ Clients</p>
                  <a href="/find-experts" className="block w-full bg-white hover:bg-[#00a896] text-[#00a896] hover:text-white border border-[#00a896] font-bold text-xs py-2 rounded-xl transition-all duration-200 shadow-2xs text-center">
                    View Profile
                  </a>
                </div>

                {/* 2. MapleVisa Solutions */}
                <div className="bg-white rounded-xl border border-slate-200 p-3.5 text-center space-y-2.5 hover:shadow-md transition-all">
                  <div className="flex items-center justify-center gap-2 pb-1 border-b border-slate-100">
                    <span className="text-red-600 text-base">🍁</span>
                    <span className="font-extrabold text-xs text-slate-900">MapleVisa <span className="font-semibold text-slate-500">Solutions</span></span>
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900">MapleVisa Solutions</h3>
                    <p className="text-[10px] font-semibold text-slate-500 flex items-center justify-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" /> Bangalore, India
                    </p>
                  </div>
                  <div className="text-[10px] font-bold text-amber-500 flex items-center justify-center gap-1">
                    <span>4.8</span>
                    <span>⭐⭐⭐⭐⭐</span>
                    <span className="text-slate-400">(95)</span>
                  </div>
                  <p className="text-[10px] font-semibold text-slate-500">Canada, USA, UK</p>
                  <p className="text-[10px] font-bold text-[#00a896]">👥 850+ Clients</p>
                  <a href="/find-experts" className="block w-full bg-white hover:bg-[#00a896] text-[#00a896] hover:text-white border border-[#00a896] font-bold text-xs py-2 rounded-xl transition-all duration-200 shadow-2xs text-center">
                    View Profile
                  </a>
                </div>

                {/* 3. FuturePath Advisors */}
                <div className="bg-white rounded-xl border border-slate-200 p-3.5 text-center space-y-2.5 hover:shadow-md transition-all">
                  <div className="flex items-center justify-center gap-2 pb-1 border-b border-slate-100">
                    <Compass className="w-5 h-5 text-[#00a896]" />
                    <span className="font-extrabold text-xs text-slate-900">FuturePath <span className="font-semibold text-slate-500">Advisors</span></span>
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900">FuturePath Advisors</h3>
                    <p className="text-[10px] font-semibold text-slate-500 flex items-center justify-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" /> Delhi, India
                    </p>
                  </div>
                  <div className="text-[10px] font-bold text-amber-500 flex items-center justify-center gap-1">
                    <span>4.9</span>
                    <span>⭐⭐⭐⭐⭐</span>
                    <span className="text-slate-400">(110)</span>
                  </div>
                  <p className="text-[10px] font-semibold text-slate-500">Australia, NZ, Canada</p>
                  <p className="text-[10px] font-bold text-[#00a896]">👥 950+ Clients</p>
                  <a href="/find-experts" className="block w-full bg-white hover:bg-[#00a896] text-[#00a896] hover:text-white border border-[#00a896] font-bold text-xs py-2 rounded-xl transition-all duration-200 shadow-2xs text-center">
                    View Profile
                  </a>
                </div>

                {/* 4. VisaExperts Global */}
                <div className="bg-white rounded-xl border border-slate-200 p-3.5 text-center space-y-2.5 hover:shadow-md transition-all">
                  <div className="flex items-center justify-center gap-2 pb-1 border-b border-slate-100">
                    <Plane className="w-5 h-5 text-[#00a896]" />
                    <span className="font-extrabold text-xs text-slate-900">VisaExperts <span className="font-semibold text-slate-500">Global</span></span>
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900">VisaExperts Global</h3>
                    <p className="text-[10px] font-semibold text-slate-500 flex items-center justify-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" /> Mumbai, India
                    </p>
                  </div>
                  <div className="text-[10px] font-bold text-amber-500 flex items-center justify-center gap-1">
                    <span>4.7</span>
                    <span>⭐⭐⭐⭐⭐</span>
                    <span className="text-slate-400">(76)</span>
                  </div>
                  <p className="text-[10px] font-semibold text-slate-500">USA, UK, Schengen</p>
                  <p className="text-[10px] font-bold text-[#00a896]">👥 700+ Clients</p>
                  <a href="/find-experts" className="block w-full bg-white hover:bg-[#00a896] text-[#00a896] hover:text-white border border-[#00a896] font-bold text-xs py-2 rounded-xl transition-all duration-200 shadow-2xs text-center">
                    View Profile
                  </a>
                </div>
              </div>
            </div>

            {/* SECTION 4E: LATEST FROM KNOWLEDGE CENTER */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h2 className="text-base font-extrabold text-[#111827] tracking-tight">Latest from Knowledge Center</h2>
                <a href="/visa-guide" className="text-xs font-bold text-[#00a896] hover:underline flex items-center gap-1">
                  View all Articles <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* 1. Canada Study Visa */}
                <a href="/visa-guide/canada/student" className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all group">
                  <div className="h-28 overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1517935706615-2717063c2225?w=500&auto=format&fit=crop&q=80" 
                      alt="Canada Flag Skyline" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 space-y-1">
                    <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-[#00a896] transition-colors leading-snug">
                      Canada Study Visa Requirements 2026
                    </h3>
                    <p className="text-[10px] font-semibold text-slate-400">Updated: Aug 1, 2026</p>
                  </div>
                </a>

                {/* 2. UK Visitor Visa */}
                <a href="/visa-guide/uk/tourist" className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all group">
                  <div className="h-28 overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&auto=format&fit=crop&q=80" 
                      alt="UK Big Ben" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 space-y-1">
                    <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-[#00a896] transition-colors leading-snug">
                      UK Visitor Visa Complete Guide
                    </h3>
                    <p className="text-[10px] font-semibold text-slate-400">Updated: Aug 1, 2026</p>
                  </div>
                </a>

                {/* 3. Australia PR Process */}
                <a href="/visa-guide/australia/pr" className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all group">
                  <div className="h-28 overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=500&auto=format&fit=crop&q=80" 
                      alt="Australia Opera House" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 space-y-1">
                    <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-[#00a896] transition-colors leading-snug">
                      Australia PR Process Step by Step
                    </h3>
                    <p className="text-[10px] font-semibold text-slate-400">Updated: Jul 31, 2026</p>
                  </div>
                </a>

                {/* 4. Top 10 Reasons for Visa Refusal */}
                <a href="/support" className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all group">
                  <div className="h-28 overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&auto=format&fit=crop&q=80" 
                      alt="Passport Documents" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 space-y-1">
                    <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-[#00a896] transition-colors leading-snug">
                      Top 10 Reasons for Visa Refusal
                    </h3>
                    <p className="text-[10px] font-semibold text-slate-400">Updated: Jul 30, 2026</p>
                  </div>
                </a>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT SIDEBAR COLUMN (LG:COL-SPAN-3) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-3 space-y-5">
            
            {/* Sidebar Item 1: Luxury Ad Banner 1 (300 x 250) */}
            <a href="/services/apply-visa" className="relative rounded-2xl overflow-hidden min-h-[205px] block group shadow-md border border-amber-400/30">
              <img 
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&auto=format&fit=crop&q=80" 
                alt="Luxury Real Estate & PR Residency Ad" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-4 flex flex-col justify-end text-white space-y-1">
                <span className="bg-amber-400 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider w-fit">SPONSORED AD</span>
                <h4 className="text-xs font-black text-white leading-tight">Europe Golden Passport & Luxury Estate</h4>
                <p className="text-[10px] text-slate-200 font-medium">Invest & gain permanent residency in 90 days.</p>
                <span className="text-[11px] font-extrabold text-amber-300 pt-0.5 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Learn More →
                </span>
              </div>
            </a>

            {/* Sidebar Item 2: Are you a Consultant? Banner Card */}
            <div className="bg-[#00a896] text-white rounded-2xl p-5 shadow-sm overflow-hidden relative flex flex-col justify-between min-h-[175px]">
              <div className="space-y-1.5 relative z-10 max-w-[165px]">
                <h3 className="text-sm font-extrabold tracking-tight text-white leading-snug">
                  Are you a Consultant?
                </h3>
                <p className="text-[11px] font-medium text-teal-50 leading-normal opacity-95">
                  Get discovered by thousands of people looking for visa help.
                </p>
              </div>

              <div className="pt-3 relative z-10">
                <a 
                  href="/register-provider" 
                  className="inline-block bg-white text-[#00a896] hover:bg-teal-50 font-extrabold text-xs px-4 py-2 rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95"
                >
                  Join VisaFormula
                </a>
              </div>

              {/* Businessman illustration matching reference image */}
              <div className="absolute bottom-0 right-1 w-24 h-36 opacity-95 pointer-events-none">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80" 
                  alt="Businessman Consultant" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Sidebar Item 3: Luxury Ad Banner 2 (300 x 250) */}
            <a href="/tours" className="relative rounded-2xl overflow-hidden min-h-[205px] block group shadow-md border border-cyan-400/30">
              <img 
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=80" 
                alt="First Class Business Flight Ad" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent p-4 flex flex-col justify-end text-white space-y-1">
                <span className="bg-cyan-400 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider w-fit">SPONSORED AD</span>
                <h4 className="text-xs font-black text-white leading-tight">Fly First Class World-Wide</h4>
                <p className="text-[10px] text-cyan-100 font-medium">Exclusive corporate & VIP flight deals for expats.</p>
                <span className="text-[11px] font-extrabold text-cyan-300 pt-0.5 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Book VIP Flight →
                </span>
              </div>
            </a>

            {/* Sidebar Item 4: Get Your DREAM VISA Banner */}
            <div className="relative bg-gradient-to-br from-[#0b2545] via-[#0f2d57] to-[#1e3a8a] text-white rounded-2xl p-5 shadow-md overflow-hidden min-h-[205px] flex flex-col justify-between border border-blue-900/40">
              <div className="relative z-10 space-y-1">
                <h3 className="text-sm font-extrabold tracking-tight text-white uppercase leading-snug">
                  Get Your <br />
                  <span className="text-[#00b4d8] text-base font-black">DREAM VISA</span> <br />
                  with the Right Guidance
                </h3>
              </div>
              
              <div className="pt-2 relative z-10">
                <a 
                  href="/find-experts" 
                  className="inline-block bg-white hover:bg-slate-100 text-[#0b2545] font-extrabold text-xs px-3.5 py-2 rounded-lg shadow-sm transition-all hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer"
                >
                  Find an Expert
                </a>
              </div>

              {/* Passenger Airplane in sky graphic matching reference image */}
              <div className="absolute bottom-0 right-0 w-36 h-28 opacity-85 pointer-events-none">
                <img 
                  src="https://images.unsplash.com/photo-1542296332-2e4473faf563?w=500&auto=format&fit=crop&q=80" 
                  alt="Commercial Passenger Airplane taking off" 
                  className="w-full h-full object-cover object-bottom"
                />
              </div>
            </div>

            {/* Sidebar Item 5: Stay Updated Newsletter Card */}
            <div className="bg-[#00a896] text-white rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden">
              <div className="space-y-1 relative z-10">
                <h3 className="text-sm font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  <span>Stay Updated</span>
                </h3>
                <p className="text-[11px] font-medium text-teal-50 leading-normal opacity-95">
                  Get the latest visa updates and immigration news.
                </p>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="space-y-2 pt-1 relative z-10">
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email" 
                  required
                  className="w-full bg-white text-slate-900 placeholder:text-slate-400 text-xs font-semibold px-3.5 py-2 rounded-lg outline-none border border-slate-200 focus:border-slate-400 transition-all"
                />
                <button 
                  type="submit"
                  className="w-full bg-black hover:bg-slate-900 text-white font-extrabold text-xs py-2 rounded-lg transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  {newsletterSuccess ? 'Subscribed ✓' : 'Subscribe'}
                </button>
              </form>

              {/* Envelope graphic matching reference image */}
              <div className="absolute bottom-2 right-2 w-12 h-12 opacity-40 pointer-events-none">
                <span className="text-3xl">📩</span>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 5. BOTTOM WIDE BANNER: APPLY FOR INTERNATIONAL EDUCATION LOANS */}
        {/* ========================================================================= */}
        <div className="relative bg-[#0d5294] text-white rounded-2xl p-6 sm:p-7 shadow-md overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Apply for International Education Loans
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-blue-100">
              <span>• Low Interest Rates</span>
              <span>• Quick Approval</span>
              <span>• 100% Online Process</span>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a 
              href="/services/financial-proof" 
              className="bg-[#fbc02d] hover:bg-yellow-400 text-slate-950 font-black text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Check Eligibility
            </a>
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/40 shadow-sm hidden sm:block">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" 
                alt="Student Loan Avatar" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>

      </div>

      {/* Auth Modal Portal trigger if needed */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="relative w-full max-w-lg">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-2 right-2 z-[10000] w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold"
            >
              ✕
            </button>
            <AuthModalPortalContent defaultTab="signup" onClose={() => setShowAuthModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
