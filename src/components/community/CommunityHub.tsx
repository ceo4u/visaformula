// src/components/community/CommunityHub.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Hash, Search, Paperclip, Smile, Star, Users,
  Bell, MoreVertical, X, Check, ArrowRight,
  FileText, MessageSquare, Send, LogIn, LogOut,
  Megaphone, GraduationCap, Heart, Building2, Luggage, Plane, Menu, MessageCircle, User as UserIcon, UserPlus
} from 'lucide-react';

interface Channel {
  id: number;
  slug: string;
  name: string;
  category: string;
  badge_icon?: string;
  unread_count?: number;
  description?: string;
}

interface Reaction {
  emoji: string;
  count: number;
}

interface ChatMessage {
  id: number;
  channel_slug: string;
  user_id?: string;
  sender_name: string;
  sender_avatar: string;
  is_verified_senior: boolean;
  is_self?: boolean;
  content: string;
  reactions: Reaction[];
  created_at: string;
}

interface SeniorMember {
  id: number;
  name: string;
  avatar_url: string;
  university?: string;
  status: 'Online' | 'Offline';
}

interface PinnedFile {
  id: number;
  title: string;
  file_size: string;
  file_type: string;
  download_url?: string;
}

interface AuthUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
}

interface CommunityStats {
  online_seniors: number;
  total_members: number;
}

const CATEGORIES = [
  { id: 'announcements', name: 'Announcements', icon: Megaphone },
  { id: 'visa', name: 'Visa & Documents', icon: FileText },
  { id: 'mbbs', name: 'MBBS Abroad Guide', icon: GraduationCap },
  { id: 'travel', name: 'Travel & Accommodation', icon: Luggage },
  { id: 'offtopic', name: 'Off-Topic', icon: MessageCircle },
  { id: 'student', name: 'Student Life', icon: Heart },
];

const EMOJI_OPTIONS = ['❤️', '👍', '🔥', '💯', '👏', '🎉', '👋', '🚀'];

export default function CommunityHub() {
  const [activeChannel, setActiveChannel] = useState('russia-mbbs-2026');
  const [channels, setChannels] = useState<Channel[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [seniors, setSeniors] = useState<SeniorMember[]>([]);
  const [resources, setResources] = useState<PinnedFile[]>([]);
  const [stats, setStats] = useState<CommunityStats>({ online_seniors: 8, total_members: 480 });
  const [loading, setLoading] = useState(true);

  // Search & Filter
  const [channelSearch, setChannelSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // User Auth State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Composer
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msgEmojiPickerId, setMsgEmojiPickerId] = useState<number | null>(null);

  // UI state
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

  // 1. Fetch Auth State from real Session / LocalStorage
  const checkAuth = async () => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('visaformula_user');
        if (stored && stored !== 'null') {
          const parsed = JSON.parse(stored);
          if (parsed && (parsed.displayName || parsed.email || parsed.first_name)) {
            setCurrentUser({
              uid: parsed.uid || `user_${parsed.id || 'current'}`,
              displayName: parsed.displayName || `${parsed.first_name || ''} ${parsed.last_name || ''}`.trim() || parsed.email?.split('@')[0] || 'Member',
              email: parsed.email,
              photoURL: parsed.photoURL || parsed.profile_photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
            });
          }
        }
      }

      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.status === 'success' && data.user) {
        setCurrentUser({
          uid: data.user.uid,
          displayName: data.user.displayName || 'Member',
          email: data.user.email,
          photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        });
      }
    } catch (err) {
      console.warn('[Community Auth Check]', err);
    }
  };

  // 2. Fetch Live Feed from PostgreSQL Backend
  const fetchFeed = async (channelSlug: string, isPolling = false) => {
    try {
      if (!isPolling) setLoading(true);
      const res = await fetch(`/api/community/messages?channel=${channelSlug}`);
      const data = await res.json();

      if (data.success) {
        if (data.channels && data.channels.length > 0) {
          setChannels(data.channels);
        }
        if (data.seniors && data.seniors.length > 0) {
          setSeniors(data.seniors);
        }
        if (data.resources && data.resources.length > 0) {
          setResources(data.resources);
        }
        if (data.messages) {
          setMessages(data.messages);
        }
        if (data.stats) {
          setStats(data.stats);
        }
      }
    } catch (err) {
      console.error('[Community Feed Error]', err);
    } finally {
      if (!isPolling) setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    fetchFeed(activeChannel);

    // Live background polling every 4 seconds
    const interval = setInterval(() => {
      fetchFeed(activeChannel, true);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeChannel]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 3. Send Message to PostgreSQL Backend
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || sending) return;

    const senderDisplayName = currentUser
      ? currentUser.displayName
      : 'Guest Member';
    const senderAvatar = currentUser?.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
    const userId = currentUser ? currentUser.uid : 'guest-user';

    const messageContent = inputText.trim();
    setInputText('');
    setSending(true);

    // Optimistic UI update
    const tempId = Date.now();
    const optimisticMsg: ChatMessage = {
      id: tempId,
      channel_slug: activeChannel,
      user_id: userId,
      sender_name: senderDisplayName,
      sender_avatar: senderAvatar,
      is_verified_senior: false,
      is_self: true,
      content: messageContent,
      reactions: [],
      created_at: new Date().toISOString()
    };

    setMessages((prev) => [...prev, optimisticMsg]);

    try {
      const res = await fetch('/api/community/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel_slug: activeChannel,
          content: messageContent,
          sender_name: senderDisplayName,
          sender_avatar: senderAvatar,
          user_id: userId,
          is_verified_senior: false
        })
      });
      const data = await res.json();
      if (data.success && data.message) {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === tempId ? { ...data.message, is_self: true } : msg))
        );
      }
    } catch (err) {
      console.error('[Send Message Error]', err);
      showToast('Failed to send message. Please retry.');
    } finally {
      setSending(false);
    }
  };

  // 4. Emoji Reaction Action (Persisted to Database)
  const handleReaction = async (messageId: number, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== messageId) return msg;
        const reactions = Array.isArray(msg.reactions) ? [...msg.reactions] : [];
        const idx = reactions.findIndex((r) => r.emoji === emoji);
        if (idx >= 0) {
          reactions[idx] = { ...reactions[idx], count: reactions[idx].count + 1 };
        } else {
          reactions.push({ emoji, count: 1 });
        }
        return { ...msg, reactions };
      })
    );
    setMsgEmojiPickerId(null);

    try {
      await fetch('/api/community/messages/react', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message_id: messageId, emoji })
      });
    } catch (err) {
      console.error('[React Error]', err);
    }
  };

  // Filter Channels
  const filteredChannels = channels.filter((ch) => {
    const matchesSearch = ch.name.toLowerCase().includes(channelSearch.toLowerCase());
    const matchesCategory = selectedCategory ? ch.category.toLowerCase().includes(selectedCategory.toLowerCase()) : true;
    return matchesSearch && matchesCategory;
  });

  const currentChannelObj = channels.find((c) => c.slug === activeChannel) || {
    id: 1,
    slug: 'russia-mbbs-2026',
    name: 'russia-mbbs-2026',
    category: 'MBBS Abroad Guide'
  };

  return (
    <div
      className="min-h-screen w-full bg-[#edf2f7] p-2.5 sm:p-4 lg:p-6 flex items-center justify-center font-plus-jakarta antialiased text-slate-900 select-none overflow-x-hidden"
    >
      {/* ═════════════════════════════════════════════════════════════════
          MAIN APP CONTAINER (3-COLUMN EXACT PIXEL-PERFECT LAYOUT)
         ═════════════════════════════════════════════════════════════════ */}
      <div className="w-full max-w-[1600px] h-[calc(100vh-1.25rem)] sm:h-[calc(100vh-2rem)] lg:h-[94vh] grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 overflow-hidden">

        {/* ─────────────────────────────────────────────────────────────
            COLUMN 1: LEFT SIDEBAR (CHANNELS & PROFILE) - 3 COLS
           ───────────────────────────────────────────────────────────── */}
        <aside className={`lg:col-span-3 xl:col-span-3 bg-white rounded-[28px] sm:rounded-[32px] border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-4 sm:p-5 flex flex-col justify-between overflow-hidden shrink-0 z-30 transition-all ${
          mobileMenuOpen ? 'fixed inset-4 z-50 shadow-2xl flex' : 'hidden lg:flex'
        }`}>
          
          <div className="space-y-4 overflow-y-auto no-scrollbar pr-1">
            
            {/* Top Row: macOS Traffic Lights + Brand Logo */}
            <div className="space-y-3.5 pb-1">
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

              {/* Exact Brand Logo matching Screenshot */}
              <a href="/" className="flex items-center gap-2.5 pt-0.5 group">
                <img
                  src="/logo.png?v=8"
                  alt="TravlTik Logo"
                  className="h-10 sm:h-11 w-auto max-w-[170px] object-contain transition-transform group-hover:scale-[1.02]"
                />
              </a>
            </div>

            {/* Search channels input with ⌘K */}
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={channelSearch}
                onChange={(e) => setChannelSearch(e.target.value)}
                placeholder="Search channels..."
                className="w-full h-10 pl-10 pr-12 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#00A86B]/20 focus:border-[#00A86B] text-slate-800 placeholder:text-slate-400 transition-all"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded-md pointer-events-none">
                ⌘K
              </kbd>
            </div>

            {/* Section: CHANNELS (Dynamic from PostgreSQL) */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1 block">
                Channels
              </span>

              <div className="space-y-1">
                {filteredChannels.length > 0 ? (
                  filteredChannels.map((ch, idx) => {
                    const isActive = activeChannel === ch.slug;
                    return (
                      <button
                        key={`channel-${ch.id}-${ch.slug}-${idx}`}
                        type="button"
                        onClick={() => {
                          setActiveChannel(ch.slug);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#00A86B] text-white shadow-sm shadow-emerald-600/30'
                            : 'text-slate-700 hover:bg-slate-100/80'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Hash className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                          <span className="truncate">{ch.name}</span>
                        </div>

                        {ch.slug.includes('russia') && (
                          <Users className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        )}
                        {ch.slug.includes('flight') && (
                          <Plane className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        )}
                        {ch.slug.includes('dorm') && (
                          <Building2 className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="text-[11px] text-slate-400 p-2">No channels found</div>
                )}
              </div>
            </div>

            {/* Section: CATEGORIES */}
            <div className="space-y-1 pt-1.5">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Categories
                </span>
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-[10px] text-[#00A86B] font-bold hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-0.5">
                {CATEGORIES.map((cat, idx) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.name;
                  return (
                    <button
                      key={`cat-${cat.id}-${idx}`}
                      type="button"
                      onClick={() => setSelectedCategory(isSelected ? null : cat.name)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
                        isSelected ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#00A86B]' : 'text-slate-400'}`} />
                      <span className="truncate">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Bottom User Profile Card (Dynamic Real Logged-in User or Guest) */}
          <div className="relative pt-3 mt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2.5 min-w-0 cursor-pointer group"
              >
                <div className="relative shrink-0">
                  {currentUser?.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200 group-hover:ring-2 group-hover:ring-[#00A86B]/40 transition-all"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs border border-slate-200 group-hover:ring-2 group-hover:ring-[#00A86B]/40 transition-all">
                      {currentUser ? currentUser.displayName.slice(0, 2).toUpperCase() : <UserIcon className="w-4 h-4 text-slate-400" />}
                    </div>
                  )}
                  <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white ${currentUser ? 'bg-[#00A86B]' : 'bg-slate-400'}`} />
                </div>
                <div className="min-w-0 truncate">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {currentUser ? currentUser.displayName : 'Guest Visitor'}
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${currentUser ? 'bg-[#00A86B]' : 'bg-slate-400'}`} />
                    <span>{currentUser ? 'Online (Verified)' : 'Click to Log In'}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Account Settings"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Popup Menu */}
            {showProfileMenu && (
              <div className="absolute bottom-14 left-0 w-full bg-white border border-slate-200 rounded-2xl shadow-xl p-2 space-y-1 animate-fadeIn z-50">
                {currentUser ? (
                  <>
                    <div className="px-3 py-1.5 text-[11px] font-medium text-slate-400 border-b border-slate-100">
                      Logged in as <strong className="text-slate-700">{currentUser.email}</strong>
                    </div>
                    <a
                      href="/dashboard"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100"
                    >
                      <UserIcon className="w-4 h-4 text-slate-400" />
                      <span>My User Dashboard</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.removeItem('visaformula_user');
                        window.location.href = '/login';
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="/login?redirect=/community"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#00A86B] bg-emerald-50 hover:bg-emerald-100"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Log In to Account</span>
                    </a>
                    <a
                      href="/signup"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100"
                    >
                      <UserPlus className="w-4 h-4 text-slate-400" />
                      <span>Create Free Account</span>
                    </a>
                  </>
                )}
              </div>
            )}
          </div>

        </aside>

        {/* ─────────────────────────────────────────────────────────────
            COLUMN 2: CENTER CHAT STREAM (6 COLS) - REAL DATABASE FEED
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
                <span className="text-xs sm:text-sm font-bold text-slate-900">
                  {currentChannelObj.name}
                </span>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-[#00A86B]" />
                  {stats.online_seniors || seniors.length || 8} Seniors Online
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => showToast('Search messages in this channel')}
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
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#00A86B] text-white text-[9px] font-bold flex items-center justify-center">
                  {seniors.length > 0 ? seniors.length : 3}
                </span>
              </button>

              <button
                onClick={() => showToast('Channel settings')}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Floating Chat Messages Area (Live DB rows) */}
          <div className="flex-1 overflow-y-auto p-1 sm:p-2 space-y-4 no-scrollbar">
            {messages.length > 0 ? (
              messages.map((msg, idx) => {
                const isSelf = msg.is_self || (currentUser && msg.user_id === currentUser.uid) || msg.sender_name === (currentUser?.displayName || 'Aman Verma');
                const timeFormatted = new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                return (
                  <div
                    key={`msg-${msg.id || idx}-${idx}`}
                    className={`flex items-start gap-3 w-full ${
                      isSelf ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {/* Avatar Left (if not self) */}
                    {!isSelf && (
                      <img
                        src={msg.sender_avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'}
                        alt={msg.sender_name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200/80 shrink-0 shadow-xs"
                      />
                    )}

                    {/* Message Bubble Card */}
                    <div
                      className={`relative rounded-[26px] p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border transition-all max-w-[85%] sm:max-w-[78%] ${
                        isSelf
                          ? 'bg-[#edfbf6] border-emerald-100/90 text-slate-900 rounded-tr-sm'
                          : 'bg-white border-slate-200/80 text-slate-900 rounded-tl-sm'
                      }`}
                    >
                      {/* Header: Name + Verified Senior Badge */}
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-xs sm:text-[13px] font-bold text-slate-900">
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
                        {msg.content}
                      </p>

                      {/* Timestamp */}
                      <div className="text-[10px] font-semibold text-slate-400 mt-2">
                        {timeFormatted}
                      </div>

                      {/* Floating Reaction Pill (Bottom Right) */}
                      <div className="absolute -bottom-3 right-4 flex items-center gap-1">
                        {msg.reactions && msg.reactions.map((r, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleReaction(msg.id, r.emoji)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-800 hover:scale-105 transition-transform cursor-pointer"
                          >
                            <span>{r.emoji}</span>
                            <span className="text-[11px] font-bold text-slate-600">{r.count}</span>
                          </button>
                        ))}

                        {/* Reaction Picker Button */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setMsgEmojiPickerId(msgEmojiPickerId === msg.id ? null : msg.id)}
                            className="w-6 h-6 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center text-xs shadow-xs cursor-pointer"
                            title="Add Reaction"
                          >
                            <Smile className="w-3 h-3" />
                          </button>

                          {msgEmojiPickerId === msg.id && (
                            <div className="absolute bottom-8 right-0 z-50 bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 flex gap-1 animate-fadeIn">
                              {EMOJI_OPTIONS.map((emoji) => (
                                <button
                                  key={emoji}
                                  type="button"
                                  onClick={() => handleReaction(msg.id, emoji)}
                                  className="w-7 h-7 rounded-xl hover:bg-slate-100 flex items-center justify-center text-sm cursor-pointer"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Avatar Right (if self) */}
                    {isSelf && (
                      <img
                        src={msg.sender_avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                        alt={msg.sender_name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200/80 shrink-0 shadow-xs"
                      />
                    )}
                  </div>
                );
              })
            ) : (
              <div className="h-full min-h-[320px] flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-14 h-14 rounded-3xl bg-emerald-50 text-[#00A86B] flex items-center justify-center border border-emerald-100/80 shadow-xs">
                  <MessageSquare className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-800">
                    No messages in #{currentChannelObj.name} yet
                  </h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto font-medium">
                    Send a message below to start the peer discussion with seniors & batchmates!
                  </p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Floating Composer Card with Real Send DB Action */}
          <form
            onSubmit={handleSendMessage}
            className="bg-white rounded-[26px] sm:rounded-[30px] border border-slate-200/80 shadow-[0_6px_25px_rgba(0,0,0,0.03)] p-2 sm:p-2.5 flex items-center gap-2 shrink-0"
          >
            <button
              type="button"
              onClick={() => showToast('Select PDF checklist or image to upload')}
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

            {/* Composer Emoji Picker */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-colors shrink-0"
                title="Emoji"
              >
                <Smile className="w-4 h-4" />
              </button>

              {showEmojiPicker && (
                <div className="absolute bottom-11 right-0 z-50 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 grid grid-cols-4 gap-1 animate-fadeIn">
                  {EMOJI_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => {
                        setInputText((prev) => prev + emoji);
                        setShowEmojiPicker(false);
                        inputRef.current?.focus();
                      }}
                      className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center text-sm cursor-pointer"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Solid Dark Slate Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim() || sending}
              className="w-10 h-10 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center cursor-pointer disabled:opacity-40 transition-all shrink-0 shadow-md active:scale-95"
              title="Send Message"
            >
              <Send className="w-4 h-4 -rotate-45 -translate-y-0.5 translate-x-0.5 text-white" />
            </button>
          </form>

        </main>

        {/* ─────────────────────────────────────────────────────────────
            COLUMN 3: RIGHT SIDEBAR (ONLINE MEMBERS & PINNED RESOURCES)
           ───────────────────────────────────────────────────────────── */}
        <aside className="lg:col-span-3 xl:col-span-3 flex flex-col gap-3.5 overflow-y-auto no-scrollbar shrink-0">
          
          {/* Card 1: Online Members - Real from PostgreSQL */}
          <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-4 sm:p-5 space-y-3.5">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00A86B]" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  Online Members
                </h3>
              </div>
              <span className="text-[11px] font-bold text-[#00A86B] bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                {stats.online_seniors || seniors.length || 8}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>Verified Experts & Members</span>
              <button
                type="button"
                onClick={() => showToast('Viewing all verified members directory')}
                className="text-[#00A86B] text-[11px] font-bold hover:underline cursor-pointer"
              >
                See all
              </button>
            </div>

            {/* Seniors List from PostgreSQL */}
            <div className="space-y-2 pt-1">
              {seniors.map((s, idx) => (
                <div
                  key={`senior-${s.id || idx}-${idx}`}
                  onClick={() => {
                    setInputText(`@${s.name} `);
                    inputRef.current?.focus();
                    showToast(`Mentioning @${s.name} in chat`);
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
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {s.name}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-[#00A86B]">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        <span>{s.university || 'Verified Advisor'}</span>
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

          {/* Card 2: Pinned Resources - Deduplicated from PostgreSQL */}
          <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-4 sm:p-5 space-y-3.5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
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
                {resources.map((r, idx) => (
                  <div
                    key={`res-${r.id || idx}-${idx}`}
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
                          {r.file_size} • {r.file_type.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Full-Width Button */}
            <button
              type="button"
              onClick={() => showToast('Opening Resource Vault...')}
              className="w-full py-3 bg-[#00A86B] hover:bg-[#008f5a] text-white text-xs font-black rounded-2xl shadow-sm shadow-emerald-600/30 transition-all cursor-pointer active:scale-98 mt-2 flex items-center justify-center gap-2"
            >
              <span>View All Resources</span>
              <ArrowRight className="w-3.5 h-3.5" />
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
