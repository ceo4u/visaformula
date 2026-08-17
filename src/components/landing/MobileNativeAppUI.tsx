import React, { useState } from "react";
import {
  Search, MapPin, GraduationCap, Briefcase, Plane, Home as HomeIcon,
  BookOpen, MessageSquare, CreditCard, User, Bell, ArrowRight, Bookmark,
  Star, Filter, ChevronRight, Phone, ShieldCheck, ChevronDown, Globe,
  Languages, DollarSign, UserCheck, FileText
} from "lucide-react";

export function MobileNativeAppUI() {
  const [activeNavTab, setActiveNavTab] = useState<"home" | "applications" | "messages" | "bookmarks" | "profile">("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Student Visa");
  const [bookmarkedAgencies, setBookmarkedAgencies] = useState<string[]>([]);

  const toggleBookmark = (id: string) => {
    setBookmarkedAgencies(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleContact = (name: string) => {
    const text = encodeURIComponent(`Hi ${name}, I found your agency on TravlTik and would like to consult.`);
    window.open(`https://wa.me/917661989366?text=${text}`, "_blank");
  };

  const categories = [
    { id: 'student', label: 'Student Visa', sub: 'Study abroad made easy', icon: '🎓', iconBg: 'bg-blue-500', href: '/visa-guide?type=student' },
    { id: 'work', label: 'Work Permit', sub: 'Explore global opportunities', icon: '💼', iconBg: 'bg-green-500', href: '/visa-guide?type=work' },
    { id: 'visit', label: 'Visit + Holiday', sub: 'Travel the world with ease', icon: '✈️', iconBg: 'bg-purple-500', href: '/visa-guide?type=visit' },
    { id: 'pr', label: 'PR / Residency', sub: 'Settle abroad permanently', icon: '🏠', iconBg: 'bg-orange-500', href: '/visa-guide?type=pr' },
    { id: 'ielts', label: 'IELTS Training', sub: 'Prepare with top trainers', icon: '📚', iconBg: 'bg-pink-500', href: '/ielts' },
    { id: 'language', label: 'Language', sub: 'Learn new languages', icon: '💬', iconBg: 'bg-teal-500', href: '/services' },
    { id: 'finance', label: 'Finance & Loans', sub: 'Secure funding for your dreams', icon: '🏛️', iconBg: 'bg-yellow-500', href: '/services' },
    { id: 'expert', label: 'Local Expert', sub: 'Connect with verified experts', icon: '👤', iconBg: 'bg-blue-400', href: '/find-experts' },
  ];

  const deals = [
    {
      badge: '🔥 Hot Deal', badgeBg: 'bg-red-600',
      img: 'https://images.unsplash.com/photo-1523428096881-5bd79d04300f?w=600&auto=format&fit=crop&q=80',
      title: 'Australia\nStudent Visa\nPackage',
      sub: 'Visa + SOP +\nDocumentation',
      rating: '4.9', reviews: '(128)',
      price: '₹24,999', strikePrice: '₹29,999',
      href: '/services/apply-visa'
    },
    {
      badge: '⚡ Limited Time', badgeBg: 'bg-slate-700',
      img: 'https://images.unsplash.com/photo-1517935703635-27c7078861d6?w=600&auto=format&fit=crop&q=80',
      title: 'Canada PR\nExpress\nEntry',
      sub: 'Fast-track your\nPR process',
      rating: '4.8', reviews: '(96)',
      price: '₹49,999', strikePrice: '₹59,999',
      href: '/services/apply-visa'
    },
    {
      badge: '🎯 Best Value', badgeBg: 'bg-rose-700',
      img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop&q=80',
      title: 'UK Skilled\nWorker Visa\n ',
      sub: 'End-to-end\nassistance',
      rating: '4.7', reviews: '(74)',
      price: '₹38,999', strikePrice: '₹44,999',
      href: '/services/apply-visa'
    },
  ];

  const agencies = [
    {
      id: 'yaxis',
      letterBg: 'bg-gray-900 text-white',
      letter: 'Y',
      letterSub: 'Y-AXIS',
      name: 'Y-Axis Overseas',
      rating: '4.9',
      reviews: '(2,345 reviews)',
      exp: '12+ Years Experience',
      visas: '50k+ Visas Processed',
      location: 'Mumbai, India',
    },
    {
      id: 'kaplan',
      letterBg: 'bg-blue-800 text-white',
      letter: 'K',
      letterSub: 'KAPLAN',
      name: 'Kaplan International',
      rating: '4.8',
      reviews: '(1,867 reviews)',
      exp: '20+ Years Experience',
      visas: '35k+ Visas Processed',
      location: 'Delhi, India',
    },
    {
      id: 'inspiro',
      letterBg: 'bg-teal-600 text-white',
      letter: 'ins',
      letterSub: 'Inspiro',
      name: 'Inspiro Immigration',
      rating: '4.7',
      reviews: '(1,256 reviews)',
      exp: '15+ Years Experience',
      visas: '25k+ Visas Processed',
      location: 'Bangalore, India',
    },
  ];

  const filterTabs = ['Student Visa', 'Job Visas', 'Visit Visas'];

  const navItems = [
    { id: 'home' as const, label: 'Home', icon: HomeIcon },
    { id: 'applications' as const, label: 'My Applications', icon: FileText },
    { id: 'messages' as const, label: 'Messages', icon: MessageSquare, badge: 2 },
    { id: 'bookmarks' as const, label: 'Bookmarks', icon: Bookmark },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ];

  return (
    <div className="w-full bg-[#f8fafc] text-gray-900 font-sans min-h-screen pb-20 select-none">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .mob-font { font-family: 'Inter', sans-serif !important; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div className="mob-font">

        {/* ===================================================== */}
        {/* 1. HEADER */}
        {/* ===================================================== */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 pt-3 pb-3 flex items-center justify-between shadow-sm">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.png?v=3" alt="TravlTik Logo" className="h-8 w-auto object-contain" />
            <div>
              <div className="font-extrabold text-[15px] text-gray-900 leading-none">TravlTik</div>
              <div className="text-[9px] text-gray-400 leading-tight">The Global Immigration & Mobility Platform</div>
            </div>
          </a>

          <div className="flex items-center gap-2.5">
            {/* Bell */}
            <button className="relative w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center cursor-pointer">
              <Bell className="w-4.5 h-4.5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white">3</span>
            </button>
            {/* Avatar */}
            <button className="w-9 h-9 rounded-full overflow-hidden border-2 border-blue-500 cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </header>

        <div className="px-4 pt-4 space-y-4">

          {/* ===================================================== */}
          {/* 2. SEARCH BAR */}
          {/* ===================================================== */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search country, city, visas, services..."
              className="flex-1 bg-transparent text-[13px] text-gray-700 placeholder-gray-400 outline-none"
            />
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
          </div>

          {/* ===================================================== */}
          {/* 3. FILTER TAB PILLS */}
          {/* ===================================================== */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {filterTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-[12px] font-semibold transition-all shrink-0 cursor-pointer ${
                  activeFilter === tab
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-white border-gray-200 text-gray-600'
                }`}
              >
                {tab === 'Student Visa' && <GraduationCap className="w-3.5 h-3.5" />}
                {tab === 'Job Visas' && <Briefcase className="w-3.5 h-3.5" />}
                {tab === 'Visit Visas' && <Plane className="w-3.5 h-3.5" />}
                {tab}
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>
            ))}
            <button className="w-9 h-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center flex-shrink-0 cursor-pointer">
              <Filter className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* ===================================================== */}
          {/* 4. CATEGORY GRID (2 rows × 4 cols) */}
          {/* ===================================================== */}
          <div className="grid grid-cols-4 gap-2.5">
            {categories.map(cat => (
              <a
                key={cat.id}
                href={cat.href}
                className="bg-white rounded-xl border border-gray-100 p-3 flex flex-col items-center text-center gap-1.5 shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                <div className={`w-11 h-11 rounded-xl ${cat.iconBg} flex items-center justify-center text-xl shadow-sm mb-0.5`}>
                  {cat.icon}
                </div>
                <h3 className="text-[11px] font-semibold text-gray-900 leading-tight">{cat.label}</h3>
                <p className="text-[9px] text-gray-400 leading-tight">{cat.sub}</p>
                <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center mt-0.5">
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                </div>
              </a>
            ))}
          </div>

          {/* ===================================================== */}
          {/* 5. FEATURED DEALS */}
          {/* ===================================================== */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-bold text-gray-900">Featured Deals &amp; Sponsored Ads</h2>
              <a href="/services/apply-visa" className="text-[13px] font-medium text-[#1a73e8] flex items-center gap-0.5">
                View all <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {deals.map((deal, i) => (
                <a
                  key={i}
                  href={deal.href}
                  className="relative rounded-[20px] overflow-hidden flex-shrink-0 w-[168px] h-[260px] flex flex-col justify-between p-4 group bg-[#050914] shadow-xl"
                >
                  <img
                    src={deal.img}
                    alt={deal.title}
                    className="absolute right-0 top-0 h-full w-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050914] via-[#050914]/85 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-transparent to-[#050914]/30" />

                  <div className="relative z-10">
                    <span className={`text-[10px] font-bold text-white px-2.5 py-1 rounded-full ${deal.badgeBg}`}>
                      {deal.badge}
                    </span>
                  </div>

                  <div className="relative z-10 space-y-2">
                    <h3 className="text-[14px] font-bold text-white leading-snug whitespace-pre-line">{deal.title}</h3>
                    <p className="text-[11px] text-slate-300 whitespace-pre-line">{deal.sub}</p>
                    <div className="flex items-center gap-1 text-[11px]">
                      <span className="text-yellow-400">★★★★★</span>
                      <span className="text-white font-bold">{deal.rating}</span>
                      <span className="text-slate-400">{deal.reviews}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-white font-black text-[15px]">{deal.price}</span>
                        <span className="text-slate-400 text-[10px] line-through ml-1">{deal.strikePrice}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg">
                        <ChevronRight className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ===================================================== */}
          {/* 6. TOP VERIFIED IMMIGRATION AGENCIES */}
          {/* ===================================================== */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-bold text-gray-900">Top Verified Immigration Agencies</h2>
              <a href="/find-experts" className="text-[13px] font-medium text-[#1a73e8] flex items-center gap-0.5">
                View all <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="space-y-3">
              {agencies.map(ag => (
                <div key={ag.id} className="bg-white rounded-xl border border-gray-100 p-3.5 shadow-sm flex items-start gap-3">

                  {/* Logo block */}
                  <div className={`w-14 h-14 rounded-xl ${ag.letterBg} flex flex-col items-center justify-center flex-shrink-0 font-black`}>
                    <span className="text-[15px] leading-none">{ag.letter}</span>
                    <span className="text-[7px] opacity-70 mt-0.5">{ag.letterSub}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-1">
                      <h3 className="text-[13px] font-bold text-gray-900">{ag.name}</h3>
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex text-yellow-400 text-[11px]">{'★'.repeat(5)}</div>
                      <span className="text-[11px] font-semibold text-gray-800">{ag.rating}</span>
                      <span className="text-[10px] text-gray-400">{ag.reviews}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500">
                      <span>📋 {ag.exp}</span>
                      <span>• {ag.visas}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                      <MapPin className="w-3 h-3" />
                      <span>{ag.location}</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() => toggleBookmark(ag.id)}
                      className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                        bookmarkedAgencies.includes(ag.id)
                          ? 'border-blue-500 bg-blue-50 text-blue-500'
                          : 'border-gray-200 bg-white text-gray-400'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleContact(ag.name)}
                      className="bg-[#1a73e8] hover:bg-blue-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom padding */}
          <div className="h-4" />
        </div>

        {/* ===================================================== */}
        {/* 7. BOTTOM NAVIGATION BAR */}
        {/* ===================================================== */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50 flex items-center justify-around shadow-lg">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveNavTab(item.id)}
              className="flex flex-col items-center gap-0.5 flex-1 relative cursor-pointer"
            >
              <div className="relative">
                <item.icon
                  className={`w-5 h-5 transition-colors ${
                    activeNavTab === item.id ? 'text-[#1a73e8]' : 'text-gray-400'
                  }`}
                />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-black flex items-center justify-center rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[9px] font-medium transition-colors ${
                  activeNavTab === item.id ? 'text-[#1a73e8]' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </nav>

      </div>
    </div>
  );
}
