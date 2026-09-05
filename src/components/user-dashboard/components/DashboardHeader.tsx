import React from "react";
import { Menu, Search, Bell, ChevronDown } from "lucide-react";

export function DashboardHeader({
  dashboardSearch,
  setDashboardSearch,
  setIsMobileSidebarOpen,
  setActiveTab,
  profilePhoto,
  fullName,
  userDisplayName
}: {
  dashboardSearch: string;
  setDashboardSearch: (val: string) => void;
  setIsMobileSidebarOpen: (val: boolean) => void;
  setActiveTab: (tab: string) => void;
  profilePhoto?: string;
  fullName: string;
  userDisplayName: string;
}) {
  return (
    <header className="bg-white border-b border-slate-200/80 shadow-2xs h-16 sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <button 
          type="button"
          onClick={() => setIsMobileSidebarOpen(true)}
          aria-label="Open Navigation Menu"
          className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
        >
          <Menu className="w-6 h-6 stroke-[2]" />
        </button>
        <a href="/" className="flex items-center gap-2">
          <img src="/logo.png?v=3" alt="TravlTik Logo" className="h-9 sm:h-11 max-h-[46px] w-auto object-contain" />
        </a>
      </div>

      {/* Center Topbar Search */}
      <div className="relative flex-1 max-w-sm hidden md:block mx-4">
        <div className="relative flex items-center w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input 
            type="text" 
            placeholder="Search"
            value={dashboardSearch}
            onChange={(e) => setDashboardSearch(e.target.value)}
            className="w-full pl-9 pr-14 py-2 bg-slate-50/70 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-slate-400 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 transition-all outline-none"
          />
          <div className="absolute right-2.5 flex items-center pointer-events-none">
            <kbd className="text-[10px] font-mono text-slate-400 bg-white border border-slate-200/90 px-1.5 py-0.5 rounded shadow-2xs">⌘ + F</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <a href="/find-experts" className="hidden sm:flex items-center gap-1.5 bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm">
          <Search className="w-3.5 h-3.5" /> Find Consultants
        </a>

        <button onClick={() => setActiveTab("consultations")} className="w-9 h-9 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors relative">
          <Bell className="w-4.5 h-4.5" />
        </button>

        <div className="flex items-center gap-2.5 pl-2 sm:border-l sm:border-slate-200 cursor-pointer" onClick={() => setActiveTab("profile")}>
          {profilePhoto && !profilePhoto.includes("unsplash.com") ? (
            <img src={profilePhoto} alt={fullName} className="w-9 h-9 rounded-full object-cover border border-[#00a896]/30 shrink-0" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-[#00a896] text-white text-sm font-black flex items-center justify-center border border-[#00a896]/30 shrink-0 shadow-2xs">
              {(userDisplayName || "U").charAt(0).toUpperCase()}
            </div>
          )}
          <div className="hidden md:block text-left">
            <h4 className="text-xs font-extrabold text-slate-900 leading-tight truncate max-w-[140px]">{fullName}</h4>
            <span className="inline-block bg-teal-50 text-[#00a896] text-[10px] font-bold px-1.5 py-0.2 rounded border border-teal-200 mt-0.5">Traveller</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
