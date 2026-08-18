'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  MapPin,
  IndianRupee,
  Calendar,
  Smile,
  ChevronDown,
  ChevronUp,
  Car,
  Hotel,
  UtensilsCrossed,
  Compass,
  ShieldAlert,
  Wand2,
  Tag,
  User,
  Headphones,
  Home as HomeIcon,
  Briefcase,
  Search,
  UserCircle2,
  Check,
  Sun,
  Sunset,
  CloudSun
} from 'lucide-react';

// Pill data for hero category quick-filters
const categoryPills = [
  { id: 'cheap', emoji: '✈️', label: 'Cheap Trip' },
  { id: 'romantic', emoji: '❤️', label: 'Romantic' },
  { id: 'family', emoji: '👨‍👩‍👧', label: 'Family' },
  { id: 'adventure', emoji: '🏔️', label: 'Adventure' },
  { id: 'beach', emoji: '🏖️', label: 'Beach' },
  { id: 'food', emoji: '🍜', label: 'Food' },
  { id: 'relaxation', emoji: '🧘', label: 'Relaxation' },
  { id: 'under10k', emoji: '💰', label: 'Under ₹10,000' },
  { id: 'international', emoji: '🌏', label: 'International' },
];

// Modifiers config with state mutators
const modifiers = [
  { id: 'cheaper', icon: '💡', label: 'Make it cheaper' },
  { id: 'luxurious', icon: '👑', label: 'Make it luxurious' },
  { id: 'children', icon: '👶', label: 'Add Children' },
  { id: 'veg', icon: '🥗', label: 'Find Vegetarian Options' },
  { id: 'late_start', icon: '⏰', label: "Don't wake up early" },
];

interface BudgetItem {
  category: string;
  amount: number;
  pct: number;
  color: string;
  icon: any;
}

export function AITripPlannerLanding() {
  // Input search state
  const [searchPrompt, setSearchPrompt] = useState('5 days in Goa under ₹30,000 with beaches');
  const [selectedPill, setSelectedPill] = useState<string>('beach');

  // Interactive Form State
  const [destination, setDestination] = useState('Goa');
  const [budget, setBudget] = useState('30,000');
  const [duration, setDuration] = useState('5 Days');
  const [vibe, setVibe] = useState('Beach');
  const [isGenerating, setIsGenerating] = useState(false);

  // Active modifier pills
  const [activeModifiers, setActiveModifiers] = useState<string[]>([]);

  // Itinerary accordion expanded day (1 - 5)
  const [expandedDay, setExpandedDay] = useState<number>(1);

  // Budget Breakdown dynamic data
  const [budgetTotal, setBudgetTotal] = useState<number>(30000);
  const [budgetBreakdown, setBudgetBreakdown] = useState<BudgetItem[]>([
    { category: 'Transport', amount: 6000, pct: 20, color: '#00a896', icon: Car },
    { category: 'Hotel', amount: 9000, pct: 30, color: '#5b2c6f', icon: Hotel },
    { category: 'Food', amount: 5100, pct: 17, color: '#f59e0b', icon: UtensilsCrossed },
    { category: 'Activities', amount: 6000, pct: 20, color: '#3b82f6', icon: Compass },
    { category: 'Emergency Reserve', amount: 3900, pct: 13, color: '#ef4444', icon: ShieldAlert },
  ]);

  // Handle Quick Category Pill Click
  const handlePillClick = (id: string, label: string) => {
    setSelectedPill(id);
    if (id === 'cheap') {
      setBudget('15,000');
      setBudgetTotal(15000);
      setSearchPrompt(`Budget 4 days in ${destination} under ₹15,000`);
    } else if (id === 'under10k') {
      setBudget('9,500');
      setBudgetTotal(9500);
      setSearchPrompt(`Weekend getaway under ₹10,000`);
    } else if (id === 'romantic') {
      setVibe('Romantic');
      setSearchPrompt(`4 romantic days in Udaipur with lakeside dinners`);
      setDestination('Udaipur');
    } else if (id === 'adventure') {
      setVibe('Adventure');
      setSearchPrompt(`6 days in Manali trekking & rafting`);
      setDestination('Manali');
    } else if (id === 'beach') {
      setVibe('Beach');
      setSearchPrompt(`5 days in Goa under ₹30,000 with beaches`);
      setDestination('Goa');
    } else {
      setVibe(label);
      setSearchPrompt(`5 days in ${destination} for ${label}`);
    }
  };

  // Handle Dynamic Modifier Click
  const toggleModifier = (id: string) => {
    const isPresent = activeModifiers.includes(id);
    const updated = isPresent ? activeModifiers.filter((m) => m !== id) : [...activeModifiers, id];
    setActiveModifiers(updated);

    // Dynamic recalculation
    if (id === 'cheaper') {
      if (!isPresent) {
        setBudgetTotal(22000);
        setBudget('22,000');
        setBudgetBreakdown([
          { category: 'Transport', amount: 4400, pct: 20, color: '#00a896', icon: Car },
          { category: 'Hotel', amount: 6600, pct: 30, color: '#5b2c6f', icon: Hotel },
          { category: 'Food', amount: 4400, pct: 20, color: '#f59e0b', icon: UtensilsCrossed },
          { category: 'Activities', amount: 3800, pct: 17, color: '#3b82f6', icon: Compass },
          { category: 'Emergency Reserve', amount: 2800, pct: 13, color: '#ef4444', icon: ShieldAlert },
        ]);
      } else {
        setBudgetTotal(30000);
        setBudget('30,000');
      }
    } else if (id === 'luxurious') {
      if (!isPresent) {
        setBudgetTotal(65000);
        setBudget('65,000');
        setBudgetBreakdown([
          { category: 'Transport', amount: 13000, pct: 20, color: '#00a896', icon: Car },
          { category: 'Hotel', amount: 26000, pct: 40, color: '#5b2c6f', icon: Hotel },
          { category: 'Food', amount: 11000, pct: 17, color: '#f59e0b', icon: UtensilsCrossed },
          { category: 'Activities', amount: 10000, pct: 15, color: '#3b82f6', icon: Compass },
          { category: 'Emergency Reserve', amount: 5000, pct: 8, color: '#ef4444', icon: ShieldAlert },
        ]);
      } else {
        setBudgetTotal(30000);
        setBudget('30,000');
      }
    }
  };

  // Generate My Trip Action
  const handleGenerateTrip = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      // scroll smoothly to dashboard
      const dashboardEl = document.getElementById('trip-dashboard');
      if (dashboardEl) {
        dashboardEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 600);
  };

  // SVG Donut calculation
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  let accumulatedOffset = 0;

  return (
    <div className="w-full min-h-screen bg-[#fafafc] text-slate-900 font-sans antialiased overflow-x-hidden pb-24 md:pb-16 relative selection:bg-[#00a896]/20 selection:text-[#00a896]">
      {/* ── AMBIENT BACKGROUND GLOWS ── */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-tr from-purple-200/40 via-teal-100/30 to-purple-100/20 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[28rem] -right-20 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[32rem] -left-20 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* ── TOP CONTAINER ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 md:pt-10">

        {/* ── 1. HERO SECTION & PROMPT SEARCH BAR ── */}
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-5">
          {/* Subtle floating plane/decor icons in desktop view */}
          <div className="relative w-full max-w-2xl flex justify-center items-center">
            {/* Soft decorative elements */}
            <span className="hidden md:inline-block absolute -left-12 top-0 text-2xl opacity-40 select-none animate-bounce duration-1000">✈️</span>
            <span className="hidden md:inline-block absolute -right-12 top-2 text-2xl opacity-40 select-none">💜</span>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.12]">
              <span className="bg-gradient-to-r from-[#4a154b] via-[#5B2C6F] to-[#00a896] bg-clip-text text-transparent">
                Where do you
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#00a896] via-[#008f80] to-[#5B2C6F] bg-clip-text text-transparent">
                want to go?
              </span>
            </h1>
          </div>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed">
            Tell TravlTik your budget, time &amp; vibe. We'll craft the perfect trip pathway for you.
          </p>

          {/* Floating AI Input Pill */}
          <div className="w-full max-w-2xl mt-2">
            <div className="relative flex items-center bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-full p-2 pl-4 md:pl-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_12px_36px_rgb(0,0,0,0.09)] transition-all focus-within:ring-2 focus-within:ring-[#00a896]/30 focus-within:border-[#00a896]">
              <div className="text-purple-600 mr-2 md:mr-3 shrink-0">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
              </div>
              <input
                type="text"
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateTrip()}
                placeholder="5 days in Goa under ₹30,000 with beaches"
                className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-xs sm:text-sm md:text-base font-medium outline-none border-none pr-2"
              />
              <button
                type="button"
                onClick={handleGenerateTrip}
                aria-label="Submit trip query"
                className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-[#00a896] hover:bg-[#008f80] text-white flex items-center justify-center shadow-md hover:shadow-lg transition-transform active:scale-95 shrink-0 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Quick-Pill Category Tags (Scrollable on mobile, flex-wrap on desktop) */}
          <div className="w-full max-w-3xl pt-2">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-1 sm:flex-wrap sm:justify-center">
              {categoryPills.map((pill) => {
                const isActive = selectedPill === pill.id;
                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => handlePillClick(pill.id, pill.label)}
                    className={`flex items-center gap-1.5 px-3 py-2 md:px-4 md:py-2.5 rounded-2xl md:rounded-3xl text-xs md:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer select-none ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-[0_4px_16px_rgba(0,168,150,0.18)] border-2 border-[#00a896] scale-105'
                        : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80 shadow-sm hover:shadow'
                    }`}
                  >
                    <span className="text-sm md:text-base">{pill.emoji}</span>
                    <span>{pill.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prominent Action Badge: "What can I do this weekend?" */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => {
                setDuration('2 Days');
                setBudget('8,000');
                setBudgetTotal(8000);
                setSearchPrompt('Best 2-day weekend getaway near me under ₹8,000');
                handleGenerateTrip();
              }}
              className="inline-flex items-center gap-2 px-5 py-2 md:py-2.5 rounded-full bg-white/90 hover:bg-white border border-[#00a896]/40 hover:border-[#00a896] shadow-[0_2px_12px_rgba(0,168,150,0.1)] text-slate-800 text-xs md:text-sm font-bold tracking-wide transition-all active:scale-95 group cursor-pointer"
            >
              <span>🗓️</span>
              <span>What can I do <strong className="text-[#00a896] group-hover:underline">this weekend?</strong></span>
            </button>
          </div>
        </div>

        {/* ── 2. PLAN YOUR TRIP INTERACTIVE FORM ── */}
        <div className="mt-8 md:mt-10 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[24px] md:rounded-[28px] p-4 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-purple-900 font-bold text-sm md:text-base">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Plan Your Trip</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] md:text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
              <Wand2 className="w-3 h-3 text-purple-600" />
              <span>AI Magic ✨</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
            {/* Location Input */}
            <div className="bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-200/70 rounded-2xl p-2.5 px-3 flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-medium text-slate-400 leading-tight">Location</span>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-transparent text-xs md:text-sm font-bold text-slate-800 outline-none border-none p-0"
                />
              </div>
            </div>

            {/* Total Budget Input */}
            <div className="bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-200/70 rounded-2xl p-2.5 px-3 flex items-center gap-2.5">
              <IndianRupee className="w-4 h-4 text-slate-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-medium text-slate-400 leading-tight">Total Budget (₹)</span>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-transparent text-xs md:text-sm font-bold text-slate-800 outline-none border-none p-0"
                />
              </div>
            </div>

            {/* Duration Input */}
            <div className="bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-200/70 rounded-2xl p-2.5 px-3 flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-medium text-slate-400 leading-tight">Duration (Days)</span>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-transparent text-xs md:text-sm font-bold text-slate-800 outline-none border-none p-0"
                />
              </div>
            </div>

            {/* Vibe Input */}
            <div className="bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-200/70 rounded-2xl p-2.5 px-3 flex items-center gap-2.5">
              <Smile className="w-4 h-4 text-slate-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-medium text-slate-400 leading-tight">Vibe</span>
                <input
                  type="text"
                  value={vibe}
                  onChange={(e) => setVibe(e.target.value)}
                  className="w-full bg-transparent text-xs md:text-sm font-bold text-slate-800 outline-none border-none p-0"
                />
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="sm:col-span-2 lg:col-span-1">
              <button
                type="button"
                onClick={handleGenerateTrip}
                disabled={isGenerating}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#00a896] to-[#008f80] hover:from-[#00bda8] hover:to-[#00a896] text-white font-bold text-xs md:text-sm shadow-[0_8px_20px_rgba(0,168,150,0.35)] hover:shadow-[0_10px_25px_rgba(0,168,150,0.5)] transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-75"
              >
                <span>{isGenerating ? 'Generating...' : 'Generate My Trip'}</span>
                <span>🪄</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── 3. GENERATED TRIP PATHWAY DASHBOARD (2-COLUMN LAYOUT) ── */}
        <div id="trip-dashboard" className="mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* LEFT CARD: Budget Breakdown */}
          <div className="lg:col-span-5 bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-[24px] md:rounded-[28px] p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base md:text-lg font-extrabold text-slate-900">
                Budget Breakdown
              </h2>
              <div className="text-right">
                <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Total Budget</span>
                <span className="text-sm md:text-base font-extrabold text-[#00a896]">
                  ₹{budgetTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Interactive SVG Donut Chart + Central Legend */}
            <div className="flex flex-col sm:flex-row items-center gap-5 my-4">
              <div className="relative w-36 h-36 md:w-40 md:h-40 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                  {budgetBreakdown.map((item, idx) => {
                    const strokeDasharray = `${(item.pct / 100) * circumference} ${circumference}`;
                    const strokeDashoffset = -accumulatedOffset;
                    accumulatedOffset += (item.pct / 100) * circumference;

                    return (
                      <circle
                        key={idx}
                        cx="80"
                        cy="80"
                        r={radius}
                        fill="transparent"
                        stroke={item.color}
                        strokeWidth="20"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-500 hover:opacity-80 cursor-pointer"
                      />
                    );
                  })}
                </svg>
                {/* Center Donut Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-xs md:text-sm font-extrabold text-slate-800">₹{budgetTotal.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-slate-400 font-semibold">Total</span>
                </div>
              </div>

              {/* Expense List */}
              <div className="w-full space-y-2 text-xs md:text-sm">
                {budgetBreakdown.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <Icon className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-slate-700 font-medium">{item.category}</span>
                      </div>
                      <div className="flex items-center gap-2 font-bold">
                        <span className="text-slate-800">₹{item.amount.toLocaleString('en-IN')}</span>
                        <span className="text-[10px] font-semibold text-slate-400 w-7 text-right">({item.pct}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-[11px] text-slate-400 text-center font-normal pt-2">
              All prices are estimated and can change based on preferences.
            </p>
          </div>

          {/* RIGHT CARD: Your 5-Day Pathway */}
          <div className="lg:col-span-7 bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-[24px] md:rounded-[28px] p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex items-center gap-2 mb-4 text-purple-900 font-extrabold text-base md:text-lg">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Your 5-Day Pathway</span>
            </div>

            {/* Accordion list */}
            <div className="space-y-3">
              {/* DAY 1 (Expanded Detail Card) */}
              <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-slate-50/50 transition-all">
                <button
                  type="button"
                  onClick={() => setExpandedDay(expandedDay === 1 ? 0 : 1)}
                  className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-100/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs md:text-sm font-extrabold text-slate-900 bg-white border border-slate-200 px-2.5 py-1 rounded-xl shadow-xs">
                      Day 1
                    </span>
                    <span className="text-xs md:text-sm font-bold text-slate-800">
                      Arrival &amp; North Goa Vibes
                    </span>
                  </div>
                  {expandedDay === 1 ? (
                    <ChevronUp className="w-4 h-4 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  )}
                </button>

                {expandedDay === 1 && (
                  <div className="p-3.5 pt-0 border-t border-slate-200/50 bg-white">
                    <div className="flex flex-col sm:flex-row gap-3 pt-3 items-start">
                      {/* Destination Thumbnail */}
                      <img
                        src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=400&auto=format&fit=crop"
                        alt="Goa Beach"
                        className="w-full sm:w-28 h-24 object-cover rounded-xl shrink-0 shadow-sm"
                      />
                      {/* Timeline Slots */}
                      <div className="flex-1 space-y-2 text-xs md:text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-amber-500 font-bold flex items-center gap-1 shrink-0 w-20">
                            <Sun className="w-3.5 h-3.5" /> Morning
                          </span>
                          <span className="text-slate-600">Arrive in Goa &amp; check-in to hotel</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold flex items-center gap-1 shrink-0 w-20">
                            <CloudSun className="w-3.5 h-3.5" /> Afternoon
                          </span>
                          <span className="text-slate-600">Baga Beach &amp; Watersports</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-orange-500 font-bold flex items-center gap-1 shrink-0 w-20">
                            <Sunset className="w-3.5 h-3.5" /> Evening
                          </span>
                          <span className="text-slate-600">Sunset at Anjuna Beach &amp; Dinner</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* DAY 2 */}
              <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setExpandedDay(expandedDay === 2 ? 0 : 2)}
                  className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs md:text-sm font-extrabold text-slate-900 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-xl">
                      Day 2
                    </span>
                    <span className="text-xs md:text-sm font-bold text-slate-800">
                      South Goa Escape &amp; Waterfalls
                    </span>
                  </div>
                  {expandedDay === 2 ? (
                    <ChevronUp className="w-4 h-4 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  )}
                </button>
                {expandedDay === 2 && (
                  <div className="p-3.5 text-xs md:text-sm text-slate-600 border-t border-slate-100 space-y-1.5">
                    <p>☀️ <strong>Morning:</strong> Dudhsagar Waterfall excursion</p>
                    <p>🌤️ <strong>Afternoon:</strong> Spice Plantation tour &amp; authentic Goan buffet</p>
                    <p>🌅 <strong>Evening:</strong> Palolem Beach chilled beachside acoustic night</p>
                  </div>
                )}
              </div>

              {/* DAY 3 */}
              <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setExpandedDay(expandedDay === 3 ? 0 : 3)}
                  className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs md:text-sm font-extrabold text-slate-900 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-xl">
                      Day 3
                    </span>
                    <span className="text-xs md:text-sm font-bold text-slate-800">
                      Old Goa &amp; Latin Quarter Heritage Walk
                    </span>
                  </div>
                  {expandedDay === 3 ? (
                    <ChevronUp className="w-4 h-4 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  )}
                </button>
                {expandedDay === 3 && (
                  <div className="p-3.5 text-xs md:text-sm text-slate-600 border-t border-slate-100 space-y-1.5">
                    <p>☀️ <strong>Morning:</strong> Basilica of Bom Jesus &amp; Se Cathedral</p>
                    <p>🌤️ <strong>Afternoon:</strong> Fontainhas colorful Portuguese streets &amp; bakery stops</p>
                    <p>🌅 <strong>Evening:</strong> Mandovi River sunset cruise &amp; live music</p>
                  </div>
                )}
              </div>

              {/* DAY 4 */}
              <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setExpandedDay(expandedDay === 4 ? 0 : 4)}
                  className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs md:text-sm font-extrabold text-slate-900 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-xl">
                      Day 4
                    </span>
                    <span className="text-xs md:text-sm font-bold text-slate-800">
                      Grand Island Scuba &amp; Dolphin Adventure
                    </span>
                  </div>
                  {expandedDay === 4 ? (
                    <ChevronUp className="w-4 h-4 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  )}
                </button>
                {expandedDay === 4 && (
                  <div className="p-3.5 text-xs md:text-sm text-slate-600 border-t border-slate-100 space-y-1.5">
                    <p>☀️ <strong>Morning:</strong> Boat ride to Grand Island, dolphin sighting &amp; snorkeling</p>
                    <p>🌤️ <strong>Afternoon:</strong> Island BBQ lunch &amp; swimming in calm waters</p>
                    <p>🌅 <strong>Evening:</strong> Vagator Hilltop sunset view &amp; dinner</p>
                  </div>
                )}
              </div>

              {/* DAY 5 */}
              <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setExpandedDay(expandedDay === 5 ? 0 : 5)}
                  className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs md:text-sm font-extrabold text-slate-900 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-xl">
                      Day 5
                    </span>
                    <span className="text-xs md:text-sm font-bold text-slate-800">
                      Leisure Morning, Souvenirs &amp; Departure
                    </span>
                  </div>
                  {expandedDay === 5 ? (
                    <ChevronUp className="w-4 h-4 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  )}
                </button>
                {expandedDay === 5 && (
                  <div className="p-3.5 text-xs md:text-sm text-slate-600 border-t border-slate-100 space-y-1.5">
                    <p>☀️ <strong>Morning:</strong> Chilled breakfast at local cafe &amp; cashews shopping</p>
                    <p>🌤️ <strong>Afternoon:</strong> Hotel check-out and transfer to airport/station</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── 4. DYNAMIC MODIFY MY TRIP PILLS ── */}
        <div className="mt-8 md:mt-10 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[24px] md:rounded-[28px] p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="mb-4">
            <h3 className="text-sm md:text-base font-extrabold text-slate-900">
              Modify My Trip
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              See changes in real-time ✨
            </p>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1 sm:flex-wrap">
            {modifiers.map((mod) => {
              const isActive = activeModifiers.includes(mod.id);
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => toggleModifier(mod.id)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 md:px-4 md:py-3 rounded-2xl text-xs md:text-sm font-bold transition-all duration-200 whitespace-nowrap cursor-pointer select-none ${
                    isActive
                      ? 'bg-white text-slate-900 border-2 border-[#00a896] shadow-[0_4px_14px_rgba(0,168,150,0.2)] scale-105'
                      : 'bg-slate-50/80 hover:bg-white text-slate-700 border border-slate-200/80 shadow-xs hover:shadow'
                  }`}
                >
                  <span className="text-sm md:text-base">{mod.icon}</span>
                  <span>{mod.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 5. VALUE PROPOSITION FEATURE GRID ── */}
        <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: AI-Powered */}
          <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-[22px] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-sm md:text-base font-bold text-slate-900 mb-1">
              AI-Powered
            </h4>
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              Smart recommendations tailored just for you.
            </p>
          </div>

          {/* Card 2: Budget Friendly */}
          <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-[22px] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#00a896] mb-3">
              <IndianRupee className="w-5 h-5" />
            </div>
            <h4 className="text-sm md:text-base font-bold text-slate-900 mb-1">
              Budget Friendly
            </h4>
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              Get the best experience within your budget.
            </p>
          </div>

          {/* Card 3: Personalized */}
          <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-[22px] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-3">
              <User className="w-5 h-5" />
            </div>
            <h4 className="text-sm md:text-base font-bold text-slate-900 mb-1">
              Personalized
            </h4>
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              Tailored trips based on your vibe &amp; style.
            </p>
          </div>

          {/* Card 4: 24x7 Support */}
          <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-[22px] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 mb-3">
              <Headphones className="w-5 h-5" />
            </div>
            <h4 className="text-sm md:text-base font-bold text-slate-900 mb-1">
              24x7 Support
            </h4>
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              We're here to help, anytime you need.
            </p>
          </div>
        </div>

      </div>

      {/* ── 6. MOBILE NAVIGATION BAR (MOBILE ONLY) ── */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-4 py-2 flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <a href="/" className="flex flex-col items-center justify-center text-[#00a896] text-[10px] font-bold">
          <HomeIcon className="w-5 h-5 stroke-[2.2]" />
          <span>Home</span>
        </a>
        <a href="/trips" className="flex flex-col items-center justify-center text-slate-400 hover:text-slate-700 text-[10px] font-medium">
          <Briefcase className="w-5 h-5 stroke-[1.8]" />
          <span>Trips</span>
        </a>

        {/* Center Glowing Action: AI Plan */}
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="-mt-5 w-12 h-12 rounded-full bg-gradient-to-tr from-[#00a896] to-[#00c9b7] text-white flex items-center justify-center shadow-[0_6px_20px_rgba(0,168,150,0.4)] border-2 border-white active:scale-95 transition-transform"
        >
          <Sparkles className="w-6 h-6 fill-white/20" />
        </button>

        <a href="/find-experts" className="flex flex-col items-center justify-center text-slate-400 hover:text-slate-700 text-[10px] font-medium">
          <Search className="w-5 h-5 stroke-[1.8]" />
          <span>Explore</span>
        </a>
        <a href="/dashboard" className="flex flex-col items-center justify-center text-slate-400 hover:text-slate-700 text-[10px] font-medium">
          <UserCircle2 className="w-5 h-5 stroke-[1.8]" />
          <span>Profile</span>
        </a>
      </div>
    </div>
  );
}
