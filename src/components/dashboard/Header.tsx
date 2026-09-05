/**
 * Header.tsx
 * Top navigation bar for the User Dashboard.
 * Supports desktop wide search and mobile brand view with notification badge & avatar.
 */
import React from 'react';
import { Search, Bell, Menu, User } from 'lucide-react';

export interface HeaderProps {
  userName: string;
  unreadCount?: number;
  userPhoto?: string | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
  onMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName,
  unreadCount = 3,
  userPhoto,
  searchQuery,
  onSearchChange,
  onNotificationsClick,
  onProfileClick,
  onMenuToggle,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      {/* Mobile Top Bar */}
      <div className="flex md:hidden items-center justify-between px-4 py-3 border-b border-slate-100">
        <button
          type="button"
          onClick={onMenuToggle}
          className="p-1.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <a href="/dashboard" className="flex items-center gap-1.5">
          <span className="text-lg font-black tracking-tight text-slate-900">
            Trav<span className="text-[#00a896]">i</span>Tik
          </span>
        </a>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onNotificationsClick}
            className="relative p-1.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onProfileClick}
            className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 shadow-2xs hover:ring-2 hover:ring-[#00a896]/30 transition-all cursor-pointer"
          >
            {userPhoto ? (
              <img src={userPhoto} alt={userName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#00a896] to-teal-700 text-white flex items-center justify-center text-xs font-bold">
                {userName ? userName.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        <div className="flex items-center justify-between gap-4 sm:gap-6">
          {/* Welcome User Greeting (Desktop) */}
          <div className="hidden md:block shrink-0">
            <span className="text-xs text-slate-400 font-medium block leading-none">
              Welcome back,
            </span>
            <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-1.5 mt-1">
              <span>{userName || 'Arjun Sharma'}</span>
              <span className="inline-block animate-wave text-xl">👋</span>
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search for services, consultants, destinations..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-[#00a896] focus:ring-2 focus:ring-[#00a896]/10 text-xs sm:text-sm text-slate-800 placeholder-slate-400 transition-all outline-hidden shadow-2xs"
              />
            </div>
          </div>

          {/* Right Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            {/* Notification Bell */}
            <button
              type="button"
              onClick={onNotificationsClick}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Profile Avatar */}
            <button
              type="button"
              onClick={onProfileClick}
              className="flex items-center gap-2.5 p-1 rounded-full hover:ring-2 hover:ring-[#00a896]/20 transition-all cursor-pointer"
              title="View Profile"
            >
              <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 shadow-2xs">
                {userPhoto ? (
                  <img src={userPhoto} alt={userName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#00a896] to-teal-700 text-white flex items-center justify-center text-xs font-bold">
                    {userName ? userName.charAt(0).toUpperCase() : 'A'}
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
