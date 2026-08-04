import React, { useState } from 'react';
import { 
  Search, ShieldCheck, FileText, Users, ArrowRight, CheckCircle2, 
  MapPin, Star, Calculator, Clock, Compass, AlertCircle, Sparkles, 
  Send, Mail, ChevronRight, Filter, ChevronDown, Check, Building2, Briefcase, GraduationCap, Plane, Home as HomeIcon
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
    <div className="w-full bg-[#f8fafc] text-slate-900 font-sans pb-16 antialiased selection:bg-[#00a896]/20 selection:text-[#00a896]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">

        {/* ========================================================================= */}
        {/* 1. TOP HEADER AD BANNERS ROW */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Left Ad Banner: Canada Study Promo */}
          <div className="md:col-span-2 relative bg-gradient-to-r from-[#0b2545] via-[#134074] to-[#00a896] text-white rounded-xl p-4 overflow-hidden shadow-sm flex items-center justify-between min-h-[90px]">
            <img 
              src="https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&auto=format&fit=crop&q=80" 
              alt="Canada Skyline" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
            />
            <div className="relative z-10 space-y-0.5">
              <span className="bg-rose-500 text-white font-extrabold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full">
                STUDY IN CANADA
              </span>
              <h3 className="text-base font-extrabold tracking-tight text-white drop-shadow-sm">
                Build your future in top ranked universities
              </h3>
            </div>
            <a 
              href="/universities?country=canada" 
              className="relative z-10 shrink-0 bg-white text-[#0b2545] hover:bg-slate-100 font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition-all hover:scale-105"
            >
              Learn More
            </a>
          </div>

          {/* Right Ad Placeholder (728x90) */}
          <div className="md:col-span-1 border-2 border-dashed border-slate-300 bg-slate-100/70 rounded-xl min-h-[90px] flex flex-col items-center justify-center text-slate-400 p-2 text-center">
            <span className="text-xs font-bold text-slate-500">YOUR AD HERE</span>
            <span className="text-[10px] font-semibold text-slate-400">728 x 90</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. MAIN HERO SECTION BANNER WITH AIRPLANE & SCORE CARD */}
        {/* ========================================================================= */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white p-6 sm:p-10 shadow-xl border border-slate-800 min-h-[380px] flex items-center">
          {/* Background Airplane & Luggage Image */}
          <img 
            src="https://images.unsplash.com/photo-1542296332-2e4473faf563?w=1600&auto=format&fit=crop&q=80" 
            alt="Journey Abroad Window View" 
            className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent" />

          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                  Your Journey Abroad <br className="hidden sm:inline" />
                  Starts <span className="text-[#00a896] underline decoration-teal-400 decoration-wavy decoration-2">Here</span>
                </h1>
                <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-medium leading-relaxed">
                  Find visa information, explore your options and connect with trusted immigration professionals across 150+ countries.
                </p>
              </div>

              {/* 3 Feature Badges */}
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-200 pt-1">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>Trusted Verified Consultants</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                  <FileText className="w-4 h-4 text-teal-400" />
                  <span>Accurate Visa Information</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                  <Users className="w-4 h-4 text-teal-400" />
                  <span>Millions of users Every Month</span>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a 
                  href="/services/apply-visa" 
                  className="bg-[#00a896] hover:bg-[#008080] text-white font-extrabold text-sm px-6 py-3 rounded-xl shadow-lg hover:shadow-teal-500/20 transition-all flex items-center gap-2 hover:scale-105"
                >
                  <span>Find My Visa Path</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href="/find-experts" 
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-sm px-6 py-3 rounded-xl backdrop-blur-md transition-all flex items-center gap-2 hover:scale-105"
                >
                  <span>Find a Consultant</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Interactive Readiness Check Score Card */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-100 text-center w-full max-w-xs space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900">
                  Free Visa Readiness Check
                </h3>

                {/* Circular Score Ring Gauge (72/100) */}
                <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100 stroke-current"
                      strokeWidth="3.5"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#00a896] stroke-current"
                      strokeDasharray="72, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-slate-900 leading-none">72</span>
                    <span className="text-[10px] font-bold text-slate-400">/100</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-600">Your Application Readiness</p>
                  <a 
                    href="/services/apply-visa" 
                    className="mt-3 block w-full bg-[#00a896] hover:bg-[#008080] text-white font-extrabold text-xs py-2.5 rounded-xl shadow-md transition-all active:scale-95"
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
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
            Find Visa Information & Consultants
          </h2>

          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
            {/* 1. Country Dropdown */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600">I want to go to</label>
              <select 
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-teal-500 transition-colors"
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
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-teal-500 transition-colors"
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
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-teal-500 transition-colors"
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
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-teal-500 transition-colors"
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
                className="w-full bg-[#00a896] hover:bg-[#008080] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Popular Searches Pills */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-slate-600">Popular Searches:</span>
            <a href="/find-experts?q=Canada+Study+Visa" className="bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 font-semibold px-2.5 py-1 rounded-lg transition-colors">Canada Study Visa</a>
            <a href="/find-experts?q=UK+Visitor+Visa" className="bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 font-semibold px-2.5 py-1 rounded-lg transition-colors">UK Visitor Visa</a>
            <a href="/find-experts?q=Australia+PR" className="bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 font-semibold px-2.5 py-1 rounded-lg transition-colors">Australia PR</a>
            <a href="/find-experts?q=USA+Tourist+Visa" className="bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 font-semibold px-2.5 py-1 rounded-lg transition-colors">USA Tourist Visa</a>
            <a href="/find-experts?q=Schengen+Visa" className="bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 font-semibold px-2.5 py-1 rounded-lg transition-colors">Schengen Visa</a>
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
                <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Popular Destinations</h2>
                <a href="/visa-guide" className="text-xs font-bold text-[#00a896] hover:underline flex items-center gap-1">
                  View all Countries <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {/* 1. Canada */}
                <a href="/visa-guide/canada" className="bg-white rounded-xl border border-slate-200 p-3 text-center space-y-2 hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="w-10 h-10 mx-auto rounded-full bg-slate-50 flex items-center justify-center text-xl shadow-xs border border-slate-100">🇨🇦</div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900">Canada</h3>
                    <p className="text-[10px] font-semibold text-slate-500">Study, Work, PR</p>
                  </div>
                </a>

                {/* 2. UK */}
                <a href="/visa-guide/uk" className="bg-white rounded-xl border border-slate-200 p-3 text-center space-y-2 hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="w-10 h-10 mx-auto rounded-full bg-slate-50 flex items-center justify-center text-xl shadow-xs border border-slate-100">🇬🇧</div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900">UK</h3>
                    <p className="text-[10px] font-semibold text-slate-500">Study, Work, Visit</p>
                  </div>
                </a>

                {/* 3. USA */}
                <a href="/visa-guide/usa" className="bg-white rounded-xl border border-slate-200 p-3 text-center space-y-2 hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="w-10 h-10 mx-auto rounded-full bg-slate-50 flex items-center justify-center text-xl shadow-xs border border-slate-100">🇺🇸</div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900">USA</h3>
                    <p className="text-[10px] font-semibold text-slate-500">Study, Work, Visit</p>
                  </div>
                </a>

                {/* 4. Australia */}
                <a href="/visa-guide/australia" className="bg-white rounded-xl border border-slate-200 p-3 text-center space-y-2 hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="w-10 h-10 mx-auto rounded-full bg-slate-50 flex items-center justify-center text-xl shadow-xs border border-slate-100">🇦🇺</div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900">Australia</h3>
                    <p className="text-[10px] font-semibold text-slate-500">Study, Work, PR</p>
                  </div>
                </a>

                {/* 5. Germany */}
                <a href="/visa-guide/germany" className="bg-white rounded-xl border border-slate-200 p-3 text-center space-y-2 hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="w-10 h-10 mx-auto rounded-full bg-slate-50 flex items-center justify-center text-xl shadow-xs border border-slate-100">🇩🇪</div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900">Germany</h3>
                    <p className="text-[10px] font-semibold text-slate-500">Study, Work</p>
                  </div>
                </a>

                {/* 6. New Zealand */}
                <a href="/visa-guide/new-zealand" className="bg-white rounded-xl border border-slate-200 p-3 text-center space-y-2 hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="w-10 h-10 mx-auto rounded-full bg-slate-50 flex items-center justify-center text-xl shadow-xs border border-slate-100">🇳🇿</div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900">New Zealand</h3>
                    <p className="text-[10px] font-semibold text-slate-500">Study, Work, PR</p>
                  </div>
                </a>

                {/* 7. More Countries */}
                <a href="/visa-guide" className="bg-[#00a896]/10 border border-[#00a896]/30 rounded-xl p-3 text-center space-y-2 hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="w-10 h-10 mx-auto rounded-full bg-[#00a896] text-white flex items-center justify-center text-sm font-bold shadow-xs">🌐</div>
                  <div>
                    <h3 className="text-xs font-extrabold text-[#00a896]">More Countries</h3>
                    <p className="text-[10px] font-semibold text-teal-700">Explore Now</p>
                  </div>
                </a>
              </div>
            </div>

            {/* SECTION 4B: FREE TOOLS & RESOURCES (6 CARDS) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Free Tools & Resources</h2>
                <a href="/migration-tools" className="text-xs font-bold text-[#00a896] hover:underline flex items-center gap-1">
                  View all Tools <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {/* 1. Visa Readiness Check */}
                <a href="/services/apply-visa" className="bg-white rounded-xl border border-slate-200 p-3.5 text-center space-y-2 hover:shadow-md transition-all hover:border-teal-400">
                  <div className="w-9 h-9 mx-auto rounded-full bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-extrabold text-slate-900 leading-tight">Visa Readiness Check</h3>
                </a>

                {/* 2. Document Checklist */}
                <a href="/services/visa-documentation" className="bg-white rounded-xl border border-slate-200 p-3.5 text-center space-y-2 hover:shadow-md transition-all hover:border-teal-400">
                  <div className="w-9 h-9 mx-auto rounded-full bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-extrabold text-slate-900 leading-tight">Document Checklist</h3>
                </a>

                {/* 3. Visa Cost Calculator */}
                <a href="/migration-tools" className="bg-white rounded-xl border border-slate-200 p-3.5 text-center space-y-2 hover:shadow-md transition-all hover:border-teal-400">
                  <div className="w-9 h-9 mx-auto rounded-full bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-extrabold text-slate-900 leading-tight">Visa Cost Calculator</h3>
                </a>

                {/* 4. Processing Time Checker */}
                <a href="/migration-tools" className="bg-white rounded-xl border border-slate-200 p-3.5 text-center space-y-2 hover:shadow-md transition-all hover:border-teal-400">
                  <div className="w-9 h-9 mx-auto rounded-full bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-extrabold text-slate-900 leading-tight">Processing Time Checker</h3>
                </a>

                {/* 5. Visa Path Finder */}
                <a href="/services/apply-visa" className="bg-white rounded-xl border border-slate-200 p-3.5 text-center space-y-2 hover:shadow-md transition-all hover:border-teal-400">
                  <div className="w-9 h-9 mx-auto rounded-full bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-extrabold text-slate-900 leading-tight">Visa Path Finder</h3>
                </a>

                {/* 6. Refusal Reasons Guide */}
                <a href="/support" className="bg-white rounded-xl border border-slate-200 p-3.5 text-center space-y-2 hover:shadow-md transition-all hover:border-teal-400">
                  <div className="w-9 h-9 mx-auto rounded-full bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-extrabold text-slate-900 leading-tight">Refusal Reasons Guide</h3>
                </a>
              </div>
            </div>

            {/* SECTION 4C: CLASSIFIEDS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Classifieds</h2>
                <a href="/jobs" className="text-xs font-bold text-[#00a896] hover:underline flex items-center gap-1">
                  View all Classifieds <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Classified Category Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
                {['All', 'Jobs Abroad', 'Accommodation', 'Study Abroad', 'Business Opportunities', 'Buy & Sell', 'Others'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveClassifiedTab(tab)}
                    className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
                      activeClassifiedTab === tab
                        ? 'bg-[#00a896] text-white shadow-xs'
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
                    <span className="bg-purple-100 text-purple-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                      Study Abroad
                    </span>
                    <h3 className="text-xs font-extrabold text-slate-900 mt-2 leading-snug">
                      Masters in Australia 2026 Intake
                    </h3>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 pt-2 border-t border-slate-100">
                    <span className="text-teal-700 font-bold">Apply Now</span>
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
                <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Featured Consultants</h2>
                <a href="/find-experts" className="text-xs font-bold text-[#00a896] hover:underline flex items-center gap-1">
                  View all Consultants <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* 1. GlobalWay Immigration */}
                <div className="bg-white rounded-xl border border-slate-200 p-3.5 text-center space-y-2.5 hover:shadow-md transition-all">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center font-extrabold text-blue-700 text-sm">
                    GlobalWay
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
                  <p className="text-[10px] font-bold text-teal-700">👥 1200+ Clients</p>
                  <a href="/find-experts" className="block w-full border border-teal-600 text-[#00a896] hover:bg-teal-50 font-bold text-xs py-1.5 rounded-lg transition-colors">
                    View Profile
                  </a>
                </div>

                {/* 2. MapleVisa Solutions */}
                <div className="bg-white rounded-xl border border-slate-200 p-3.5 text-center space-y-2.5 hover:shadow-md transition-all">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-red-50 border border-red-100 flex items-center justify-center font-extrabold text-red-700 text-sm">
                    MapleVisa
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
                    <span className="text-slate-400">(96)</span>
                  </div>
                  <p className="text-[10px] font-semibold text-slate-500">Canada, USA, UK</p>
                  <p className="text-[10px] font-bold text-teal-700">👥 850+ Clients</p>
                  <a href="/find-experts" className="block w-full border border-teal-600 text-[#00a896] hover:bg-teal-50 font-bold text-xs py-1.5 rounded-lg transition-colors">
                    View Profile
                  </a>
                </div>

                {/* 3. FuturePath Advisors */}
                <div className="bg-white rounded-xl border border-slate-200 p-3.5 text-center space-y-2.5 hover:shadow-md transition-all">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center font-extrabold text-emerald-700 text-sm">
                    FuturePath
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
                  <p className="text-[10px] font-bold text-teal-700">👥 950+ Clients</p>
                  <a href="/find-experts" className="block w-full border border-teal-600 text-[#00a896] hover:bg-teal-50 font-bold text-xs py-1.5 rounded-lg transition-colors">
                    View Profile
                  </a>
                </div>

                {/* 4. VisaExperts Global */}
                <div className="bg-white rounded-xl border border-slate-200 p-3.5 text-center space-y-2.5 hover:shadow-md transition-all">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-extrabold text-indigo-700 text-sm">
                    VisaExperts
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
                  <p className="text-[10px] font-bold text-teal-700">👥 700+ Clients</p>
                  <a href="/find-experts" className="block w-full border border-teal-600 text-[#00a896] hover:bg-teal-50 font-bold text-xs py-1.5 rounded-lg transition-colors">
                    View Profile
                  </a>
                </div>
              </div>
            </div>

            {/* SECTION 4E: LATEST FROM KNOWLEDGE CENTER */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Latest from Knowledge Center</h2>
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
          <div className="lg:col-span-3 space-y-6">
            
            {/* Sidebar Item 1: Ad Box 1 (300 x 250) */}
            <div className="border-2 border-dashed border-slate-300 bg-slate-100/80 rounded-2xl min-h-[220px] flex flex-col items-center justify-center text-slate-400 p-4 text-center shadow-2xs">
              <span className="text-xs font-bold text-slate-500">YOUR AD HERE</span>
              <span className="text-[10px] font-semibold text-slate-400">300 x 250</span>
            </div>

            {/* Sidebar Item 2: Are you a Consultant? Card */}
            <div className="relative bg-gradient-to-br from-[#008080] via-[#0d9488] to-[#042f2e] text-white rounded-2xl p-5 shadow-lg overflow-hidden space-y-4">
              <div className="relative z-10 space-y-2">
                <h3 className="text-lg font-black tracking-tight text-white leading-snug">
                  Are you a Consultant?
                </h3>
                <p className="text-xs font-medium text-teal-100 leading-relaxed">
                  Get discovered by thousands of people looking for visa help.
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <a 
                  href="/register-provider" 
                  className="bg-white hover:bg-slate-100 text-[#008080] font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-105"
                >
                  Join VisaFormula
                </a>
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl">
                  👨‍💼
                </div>
              </div>
            </div>

            {/* Sidebar Item 3: Ad Box 2 (300 x 250) */}
            <div className="border-2 border-dashed border-slate-300 bg-slate-100/80 rounded-2xl min-h-[220px] flex flex-col items-center justify-center text-slate-400 p-4 text-center shadow-2xs">
              <span className="text-xs font-bold text-slate-500">YOUR AD HERE</span>
              <span className="text-[10px] font-semibold text-slate-400">300 x 250</span>
            </div>

            {/* Sidebar Item 4: Get Your DREAM VISA Banner */}
            <div className="relative bg-gradient-to-br from-[#0a192f] to-[#1e3a8a] text-white rounded-2xl p-5 shadow-lg overflow-hidden space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1542296332-2e4473faf563?w=500&auto=format&fit=crop&q=80" 
                alt="Airplane flying" 
                className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-overlay"
              />
              <div className="relative z-10 space-y-2">
                <h3 className="text-base font-black tracking-tight text-white uppercase leading-snug">
                  Get Your <br />
                  <span className="text-teal-400">DREAM VISA</span> <br />
                  with the Right Guidance
                </h3>
              </div>
              <a 
                href="/find-experts" 
                className="relative z-10 inline-block bg-[#00a896] hover:bg-[#008080] text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow-md transition-all"
              >
                Find an Expert
              </a>
            </div>

            {/* Sidebar Item 5: Stay Updated Newsletter Card */}
            <div className="bg-[#0d9488] text-white rounded-2xl p-5 shadow-lg space-y-3 relative overflow-hidden">
              <div className="space-y-1">
                <h3 className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-teal-200" />
                  <span>Stay Updated</span>
                </h3>
                <p className="text-[11px] font-medium text-teal-100 leading-normal">
                  Get the latest visa updates and immigration news directly in your inbox.
                </p>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="space-y-2 pt-1">
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email" 
                  required
                  className="w-full bg-white text-slate-900 placeholder:text-slate-400 text-xs font-semibold px-3 py-2 rounded-xl outline-none"
                />
                <button 
                  type="submit"
                  className="w-full bg-slate-950 hover:bg-black text-white font-extrabold text-xs py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  {newsletterSuccess ? 'Subscribed ✓' : 'Subscribe'}
                </button>
              </form>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 5. BOTTOM WIDE BANNER: APPLY FOR INTERNATIONAL EDUCATION LOANS */}
        {/* ========================================================================= */}
        <div className="relative bg-gradient-to-r from-[#003d7a] via-[#00529b] to-[#0f4c81] text-white rounded-2xl p-6 sm:p-8 shadow-lg overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Apply for International Education Loans
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-teal-200">
              <span>• Low Interest Rates</span>
              <span>• Quick Approval</span>
              <span>• 100% Online Process</span>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a 
              href="/services/financial-proof" 
              className="bg-[#fbc02d] hover:bg-yellow-400 text-slate-950 font-black text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Check Eligibility
            </a>
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/40 shadow-md hidden sm:block">
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
