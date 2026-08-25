// src/components/community/CommunityHub.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Hash, Search, Paperclip, Smile, Star, Users,
  Bell, MoreVertical, X,
  FileText, MessageSquare, Check,
  Mic, Volume2, PhoneCall, Home, Megaphone, 
  GraduationCap, Heart, Building2, Luggage, UserCheck, Menu
} from 'lucide-react';

interface Channel {
  id: number;
  slug: string;
  name: string;
  category: string;
  icon?: string;
  badge_icon?: string;
  unread_count?: number;
}

interface ChatMessage {
  id: number;
  channel_slug: string;
  sender_name: string;
  sender_avatar: string;
  is_verified_senior: boolean;
  is_self?: boolean;
  content: string;
  time: string;
  reactions: { emoji: string; count: number }[];
}

interface SeniorMember {
  id: number;
  name: string;
  avatar_url: string;
  is_verified: boolean;
  status: 'Online' | 'Offline';
}

interface PinnedFile {
  id: number;
  title: string;
  file_size: string;
  file_type: string;
}

const CATEGORIES = [
  { id: 'general', name: 'General Announcements', icon: Megaphone },
  { id: 'visa', name: 'Visa & Documentation', icon: FileText },
  { id: 'mbbs', name: 'MBBS Abroad Guide', icon: GraduationCap },
  { id: 'travel', name: 'Travel & Accommodation', icon: Luggage },
  { id: 'student', name: 'Student Life', icon: Heart },
  { id: 'offtopic', name: 'Off-Topic', icon: Smile },
];

const COMMUNITY_CHANNELS: Channel[] = [
  { id: 1, slug: 'russia-mbbs-2026', name: 'russia-mbbs-2026', category: 'MBBS Abroad Guide', badge_icon: 'users' },
  { id: 2, slug: 'delhi-to-moscow-flights', name: 'delhi-to-moscow-flights', category: 'Travel & Accommodation', badge_icon: 'pin' },
  { id: 3, slug: 'dorm-sharing', name: 'dorm-sharing', category: 'Travel & Accommodation', badge_icon: 'building' },
];

const SENIOR_MEMBERS: SeniorMember[] = [
  { id: 1, name: 'Arjun Patel', avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', is_verified: true, status: 'Online' },
  { id: 2, name: 'Neha Reddy', avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', is_verified: true, status: 'Online' },
  { id: 3, name: 'Vikram Joshi', avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', is_verified: true, status: 'Online' },
  { id: 4, name: 'Simran Kaur', avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', is_verified: true, status: 'Online' },
  { id: 5, name: 'Aditya Kumar', avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', is_verified: true, status: 'Online' },
];

const PINNED_RESOURCES: PinnedFile[] = [
  { id: 1, title: 'Russia MBBS Admission Process 2026.pdf', file_size: '2.4 MB', file_type: 'PDF' },
  { id: 2, title: 'Moscow State University Hostel Guide.pdf', file_size: '1.8 MB', file_type: 'PDF' },
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    channel_slug: 'russia-mbbs-2026',
    sender_name: 'Ananya Sharma',
    sender_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    is_verified_senior: true,
    is_self: false,
    content: "Hey everyone! How's the weather in Moscow these days?",
    time: '10:24 AM',
    reactions: [{ emoji: '❤️', count: 12 }]
  },
  {
    id: 2,
    channel_slug: 'russia-mbbs-2026',
    sender_name: 'Rohit Mehta',
    sender_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    is_verified_senior: true,
    is_self: true,
    content: "It's getting colder now, around -5°C today.\nMake sure to carry warm clothes!",
    time: '10:26 AM',
    reactions: [{ emoji: '👍', count: 8 }]
  },
  {
    id: 3,
    channel_slug: 'russia-mbbs-2026',
    sender_name: 'Priya Nair',
    sender_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    is_verified_senior: true,
    is_self: false,
    content: "Anyone going to the university this week?\nLet's catch up!",
    time: '10:28 AM',
    reactions: [{ emoji: '👏', count: 6 }]
  },
  {
    id: 4,
    channel_slug: 'russia-mbbs-2026',
    sender_name: 'Karan Singh',
    sender_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    is_verified_senior: true,
    is_self: false,
    content: "@Priya Nair I'll be there on Wednesday.\nLet me know!",
    time: '10:30 AM',
    reactions: [{ emoji: '💯', count: 5 }]
  }
];

export default function CommunityHub() {
  const [activeChannel, setActiveChannel] = useState('russia-mbbs-2026');
  const [channelSearch, setChannelSearch] = useState('');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now(),
      channel_slug: activeChannel,
      sender_name: 'Aman Verma',
      sender_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      is_verified_senior: true,
      is_self: true,
      content: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: []
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
  };

  const handleReaction = (msgId: number, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== msgId) return msg;
        const exists = msg.reactions.find((r) => r.emoji === emoji);
        if (exists) {
          return {
            ...msg,
            reactions: msg.reactions.map((r) =>
              r.emoji === emoji ? { ...r, count: r.count + 1 } : r
            )
          };
        }
        return {
          ...msg,
          reactions: [...msg.reactions, { emoji, count: 1 }]
        };
      })
    );
  };

  return (
    <div
      className="min-h-screen w-full bg-[#eef2f6] p-2.5 sm:p-4 lg:p-6 flex items-center justify-center font-sans antialiased text-slate-900 select-none overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
    >
      {/* ═════════════════════════════════════════════════════════════════
          MAIN APP CONTAINER (3 FLOATING COLUMN TILES)
         ═════════════════════════════════════════════════════════════════ */}
      <div className="w-full max-w-[1600px] h-[calc(100vh-1.25rem)] sm:h-[calc(100vh-2rem)] lg:h-[94vh] grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 overflow-hidden">

        {/* ─────────────────────────────────────────────────────────────
            COLUMN 1: LEFT SIDEBAR (CHANNELS & PROFILE) - 3 COLS
           ───────────────────────────────────────────────────────────── */}
        <aside className={`lg:col-span-3 xl:col-span-3 bg-white rounded-[28px] sm:rounded-[32px] border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-4 sm:p-5 flex flex-col justify-between overflow-hidden shrink-0 z-30 transition-all ${
          mobileMenuOpen ? 'fixed inset-4 z-50 shadow-2xl flex' : 'hidden lg:flex'
        }`}>
          
          <div className="space-y-4 overflow-y-auto no-scrollbar pr-1">
            
            {/* Top Row: macOS Traffic Lights + TravlTik Logo */}
            <div className="space-y-3 pb-1">
              {/* Traffic Light Dots */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] cursor-pointer" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] cursor-pointer" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] cursor-pointer" />
                </div>
                {mobileMenuOpen && (
                  <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden p-1 rounded-lg text-slate-400">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Logo Header */}
              <a href="/" className="flex items-center gap-2.5 pt-1 group">
                <img
                  src="/logo.png?v=8"
                  alt="TravlTik"
                  className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
                />
                <div className="flex flex-col">
                  <span className="text-base font-black text-slate-900 leading-tight">
                    TravlTik
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    Community
                  </span>
                </div>
              </a>
            </div>

            {/* Search channels input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={channelSearch}
                onChange={(e) => setChannelSearch(e.target.value)}
                placeholder="Search channels..."
                className="w-full h-10 pl-8.5 pr-10 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#00A86B] text-slate-800 placeholder:text-slate-400"
              />
              <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded-md">
                ⌘K
              </kbd>
            </div>

            {/* Section: Community Channels */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-slate-400 px-1 block">
                Community Channels
              </span>

              <div className="space-y-1">
                {COMMUNITY_CHANNELS.map((ch) => {
                  const isActive = activeChannel === ch.slug;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => {
                        setActiveChannel(ch.slug);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#00A86B] text-white shadow-sm shadow-emerald-600/30'
                          : 'text-slate-700 hover:bg-slate-100/80'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Hash className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span className="truncate">{ch.name}</span>
                      </div>

                      {ch.badge_icon === 'users' && (
                        <Users className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      )}
                      {ch.badge_icon === 'pin' && (
                        <Megaphone className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      )}
                      {ch.badge_icon === 'building' && (
                        <Building2 className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section: Categories */}
            <div className="space-y-1 pt-2">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => showToast(`Filtered by ${cat.name}`)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer text-left"
                  >
                    <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate">{cat.name}</span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Bottom Profile Row */}
          <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                  alt="Aman Verma"
                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00A86B] ring-2 ring-white" />
              </div>
              <div className="min-w-0 truncate">
                <div className="text-xs font-black text-slate-900 truncate">Aman Verma</div>
                <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B]" /> Online
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => showToast('Profile settings')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

        </aside>

        {/* ─────────────────────────────────────────────────────────────
            COLUMN 2: CENTER CHAT STREAM (6 COLS)
           ───────────────────────────────────────────────────────────── */}
        <main className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between overflow-hidden gap-3.5 min-w-0">
          
          {/* Top Channel Header Pill Card */}
          <div className="bg-white rounded-[24px] sm:rounded-[28px] border border-slate-200/80 shadow-[0_6px_20px_rgba(0,0,0,0.02)] px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-1.5 rounded-xl bg-slate-100 text-slate-700 mr-1"
              >
                <Menu className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                <Hash className="w-4 h-4 text-[#00A86B]" />
                <span className="text-xs sm:text-sm font-black text-slate-900">
                  {activeChannel}
                </span>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-[#00A86B]" />
                  85 Seniors Online
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => showToast('Search messages')}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => showToast('Channel notifications active')}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00A86B]" />
              </button>
              <button
                onClick={() => showToast('Channel settings')}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Floating Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-1 sm:p-2 space-y-4 no-scrollbar">
            {messages.map((msg) => {
              const isSelf = msg.is_self;

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 w-full ${
                    isSelf ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {/* Avatar Left (if not self) */}
                  {!isSelf && (
                    <img
                      src={msg.sender_avatar}
                      alt={msg.sender_name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200/80 shrink-0 shadow-xs"
                    />
                  )}

                  {/* Message Bubble Card */}
                  <div
                    className={`relative rounded-[26px] p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border transition-all max-w-[85%] sm:max-w-[78%] ${
                      isSelf
                        ? 'bg-[#f0fbf7] border-emerald-100/90 text-slate-900 rounded-tr-sm'
                        : 'bg-white border-slate-200/80 text-slate-900 rounded-tl-sm'
                    }`}
                  >
                    {/* Header: Name + Verified Senior Badge */}
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-xs sm:text-[13px] font-black text-slate-900">
                        {msg.sender_name}
                      </span>
                      {msg.is_verified_senior && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#00A86B] bg-emerald-50 border border-emerald-200/80 px-2 py-0.2 rounded-full">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          <span>Verified Senior</span>
                        </span>
                      )}
                    </div>

                    {/* Content Text */}
                    <p className="text-xs sm:text-[13px] font-medium text-slate-700 leading-relaxed whitespace-pre-line">
                      {msg.content.includes('@Priya Nair') ? (
                        <>
                          <span className="text-[#00A86B] font-bold">@Priya Nair</span>
                          {msg.content.replace('@Priya Nair', '')}
                        </>
                      ) : (
                        msg.content
                      )}
                    </p>

                    {/* Timestamp */}
                    <div className="text-[10px] font-semibold text-slate-400 mt-2">
                      {msg.time}
                    </div>

                    {/* Floating Reaction Pill (Bottom Right) */}
                    {msg.reactions && msg.reactions.length > 0 && (
                      <div className="absolute -bottom-3 right-4 flex items-center gap-1">
                        {msg.reactions.map((r, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleReaction(msg.id, r.emoji)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-800 hover:scale-105 transition-transform cursor-pointer"
                          >
                            <span>{r.emoji}</span>
                            <span className="text-[11px] font-black text-slate-600">{r.count}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Avatar Right (if self) */}
                  {isSelf && (
                    <img
                      src={msg.sender_avatar}
                      alt={msg.sender_name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200/80 shrink-0 shadow-xs"
                    />
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Floating Composer Card */}
          <form
            onSubmit={handleSendMessage}
            className="bg-white rounded-[26px] sm:rounded-[30px] border border-slate-200/80 shadow-[0_6px_25px_rgba(0,0,0,0.03)] p-2 sm:p-2.5 flex items-center gap-2 shrink-0"
          >
            <button
              type="button"
              onClick={() => showToast('Attachment options')}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-colors shrink-0"
              title="Attach File"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-transparent border-none text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none px-2"
            />

            <button
              type="button"
              onClick={() => {
                setInputText((prev) => prev + ' 👋');
                inputRef.current?.focus();
              }}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-colors shrink-0"
              title="Emoji"
            >
              <Smile className="w-4 h-4" />
            </button>

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-5 py-2.5 bg-[#00A86B] hover:bg-[#008f5a] disabled:opacity-40 text-white text-xs font-black rounded-2xl shadow-sm shadow-emerald-600/30 transition-all cursor-pointer shrink-0 active:scale-95"
            >
              Send
            </button>
          </form>

        </main>

        {/* ─────────────────────────────────────────────────────────────
            COLUMN 3: RIGHT SIDEBAR (ONLINE MEMBERS & PINNED) - 3 COLS
           ───────────────────────────────────────────────────────────── */}
        <aside className="lg:col-span-3 xl:col-span-3 flex flex-col gap-3.5 overflow-y-auto no-scrollbar shrink-0">
          
          {/* Card 1: Online Members (85) */}
          <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-4 sm:p-5 space-y-3.5">
            {/* Header */}
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00A86B]" />
                <h3 className="text-xs sm:text-sm font-black text-slate-900">
                  Online Members
                </h3>
              </div>
              <span className="text-[11px] font-black text-[#00A86B] bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                85
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>Verified Seniors</span>
              <button
                type="button"
                onClick={() => showToast('Viewing all verified seniors')}
                className="text-[#00A86B] text-[11px] font-bold hover:underline cursor-pointer"
              >
                See all
              </button>
            </div>

            {/* Seniors List */}
            <div className="space-y-2 pt-1">
              {SENIOR_MEMBERS.map((s) => (
                <div
                  key={s.id}
                  onClick={() => {
                    setInputText(`@${s.name} `);
                    inputRef.current?.focus();
                    showToast(`Mentioning @${s.name}`);
                  }}
                  className="p-2 rounded-2xl bg-slate-50/70 hover:bg-emerald-50/50 border border-slate-200/60 flex items-center justify-between transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-1">
                    <div className="relative shrink-0">
                      <img
                        src={s.avatar_url}
                        alt={s.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#00A86B] ring-1 ring-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-black text-slate-900 truncate">
                        {s.name}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-[#00A86B]">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        <span>Verified Senior</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      showToast(`Options for ${s.name}`);
                    }}
                    className="p-1 rounded-lg text-slate-300 group-hover:text-slate-600 transition-colors"
                  >
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Pinned Resources */}
          <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-4 sm:p-5 space-y-3.5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1">
                <h3 className="text-xs sm:text-sm font-black text-slate-900">
                  Pinned Resources
                </h3>
                <button
                  type="button"
                  onClick={() => showToast('Viewing all pinned files')}
                  className="text-[#00A86B] text-[11px] font-bold hover:underline cursor-pointer"
                >
                  See all
                </button>
              </div>

              {/* Resource items */}
              <div className="space-y-2">
                {PINNED_RESOURCES.map((r) => (
                  <div
                    key={r.id}
                    className="p-2.5 rounded-2xl bg-slate-50/70 hover:bg-slate-100/80 border border-slate-200/60 flex items-center justify-between gap-2.5 transition-colors group cursor-pointer"
                    onClick={() => showToast(`Downloading ${r.title}...`)}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 border border-red-200/60 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {r.title}
                        </div>
                        <div className="text-[10px] text-slate-400 font-semibold">
                          {r.file_size} • {r.file_type}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Button */}
            <button
              type="button"
              onClick={() => showToast('Opening Resource Vault...')}
              className="w-full py-3 bg-[#00A86B] hover:bg-[#008f5a] text-white text-xs font-black rounded-2xl shadow-sm shadow-emerald-600/30 transition-all cursor-pointer active:scale-98 mt-2"
            >
              View All Resources
            </button>
          </div>

        </aside>

      </div>

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-[9999] bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 animate-fadeIn border border-white/10">
          <div className="w-5 h-5 rounded-full bg-[#00A86B] text-white flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span className="text-xs font-bold">{toastMsg}</span>
        </div>
      )}

    </div>
  );
}
