import React, { useState, useRef, useEffect } from "react";
import { Menu, Search, Bell, ChevronDown, User, FileText, Briefcase, Settings, LogOut } from "lucide-react";

export function DashboardHeader({
  dashboardSearch,
  setDashboardSearch,
  setIsMobileSidebarOpen,
  setActiveTab,
  profilePhoto,
  fullName,
  userDisplayName,
  handleLogout,
  email
}: {
  dashboardSearch: string;
  setDashboardSearch: (val: string) => void;
  setIsMobileSidebarOpen: (val: boolean) => void;
  setActiveTab: (tab: string) => void;
  profilePhoto?: string;
  fullName: string;
  userDisplayName: string;
  handleLogout?: () => void;
  email?: string;
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

        {/* Profile Avatar & Dropdown */}
        <div className="relative" ref={profileMenuRef}>
          <div
            className="flex items-center gap-2.5 pl-2 sm:border-l sm:border-slate-200 cursor-pointer select-none"
            onClick={() => setIsProfileOpen(prev => !prev)}
            aria-haspopup="true"
            aria-expanded={isProfileOpen}
          >
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
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 hidden sm:block transition-transform duration-200 ${isProfileOpen ? 'rotate-180 text-slate-700' : ''}`} />
          </div>

          {/* Profile Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2.5 w-64 bg-white rounded-2xl border border-slate-200/90 shadow-xl py-2 z-50 animate-fade-up">
              {/* User summary */}
              <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
                {profilePhoto && !profilePhoto.includes("unsplash.com") ? (
                  <img src={profilePhoto} alt={fullName} className="w-10 h-10 rounded-full object-cover border border-[#00a896]/30 shrink-0" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#00a896] text-white text-sm font-black flex items-center justify-center border border-[#00a896]/30 shrink-0 shadow-2xs">
                    {(userDisplayName || "U").charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-black text-slate-900 truncate">{fullName}</h4>
                  <p className="text-[11px] text-slate-400 truncate">{email || 'traveller@travltik.com'}</p>
                  <span className="inline-block bg-teal-50 text-[#00a896] text-[9px] font-bold px-1.5 py-0.2 rounded border border-teal-200 mt-1">Active Traveller</span>
                </div>
              </div>

              {/* Menu items */}
              <div className="p-1 space-y-0.5 text-xs font-semibold text-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("profile");
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>My Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("scanned-documents");
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span>Document Vault</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("cases");
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  <span>Visa Applications</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("profile");
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Settings &amp; Preferences</span>
                </button>
              </div>

              <div className="border-t border-slate-100 my-1"></div>

              {/* Logout Option */}
              <div className="p-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    if (handleLogout) {
                      handleLogout();
                    } else {
                      localStorage.clear();
                      window.location.href = "/";
                    }
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50/80 hover:text-rose-700 transition-colors text-left text-xs font-bold cursor-pointer group"
                >
                  <LogOut className="w-4 h-4 text-rose-500 group-hover:text-rose-700 transition-colors" />
                  <span>Log Out / Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
