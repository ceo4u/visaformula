// src/components/community/CommunityHub.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Hash, Search, Paperclip, Smile, Send, Star, Users, Download,
  Bell, MoreVertical, ChevronDown, ChevronRight, Plus, Check,
  Sparkles, FileText, Globe, MessageSquare, ShieldCheck, X,
  Menu, Info, ArrowUpRight, Loader2, Share2, Heart, ThumbsUp, Flame
} from 'lucide-react';

interface Channel {
  id: number;
  slug: string;
  name: string;
  category: string;
  icon: string;
  unread_count: number;
  description?: string;
}

interface Reaction {
  emoji: string;
  count: number;
}

interface ChatMessage {
  id: number;
  channel_slug: string;
  user_id: string;
  sender_name: string;
  sender_avatar: string;
  is_verified_senior: boolean;
  content: string;
  reactions: Reaction[];
  created_at: string;
}

interface VerifiedSenior {
  id: number;
  name: string;
  avatar_url: string;
  university: string;
  status: string;
}

interface PinnedResource {
  id: number;
  channel_slug: string;
  title: string;
  file_size: string;
  file_type: string;
  download_url: string;
}

const EMOJI_LIST = ['❤️', '👍', '🔥', '💯', '👋', '🚀', '🎉', '👏'];

export default function CommunityHub() {
  const [activeChannel, setActiveChannel] = useState('russia-mbbs-2026');
  const [channels, setChannels] = useState<Channel[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [seniors, setSeniors] = useState<VerifiedSenior[]>([]);
  const [resources, setResources] = useState<PinnedResource[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & input states
  const [channelSearch, setChannelSearch] = useState('');
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<number | null>(null);
  const [showInputEmoji, setShowInputEmoji] = useState(false);

  // Mobile Drawers
  const [mobileChannelsOpen, setMobileChannelsOpen] = useState(false);
  const [mobileRosterOpen, setMobileRosterOpen] = useState(false);

  // Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch channel data
  const loadChannelData = async (channelSlug: string) => {
    try {
      const res = await fetch(`/api/community/messages?channel=${channelSlug}`);
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages || []);
        if (data.channels && data.channels.length > 0) setChannels(data.channels);
        if (data.seniors) setSeniors(data.seniors);
        if (data.resources) setResources(data.resources);
      }
    } catch (err) {
      console.error('[Community Load Error]', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChannelData(activeChannel);
  }, [activeChannel]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send new message
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || sending) return;

    const messageText = inputText.trim();
    setInputText('');
    setSending(true);

    // Optimistic message
    const tempMessage: ChatMessage = {
      id: Date.now(),
      channel_slug: activeChannel,
      user_id: 'user-current',
      sender_name: 'Aman Verma',
      sender_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      is_verified_senior: false,
      content: messageText,
      reactions: [],
      created_at: new Date().toISOString()
    };

    setMessages((prev) => [...prev, tempMessage]);

    try {
      const res = await fetch('/api/community/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel_slug: activeChannel,
          content: messageText,
          sender_name: 'Aman Verma',
          sender_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          is_verified_senior: false
        })
      });
      const data = await res.json();
      if (data.success && data.message) {
        setMessages((prev) => prev.map((m) => (m.id === tempMessage.id ? data.message : m)));
      }
    } catch (err) {
      console.error('[Send Message Error]', err);
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  };

  // React to a message
  const handleReaction = async (messageId: number, emoji: string) => {
    // Optimistic update
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
    setShowEmojiPicker(null);

    try {
      const res = await fetch('/api/community/messages/react', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message_id: messageId, emoji })
      });
      const data = await res.json();
      if (data.success && data.reactions) {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === messageId ? { ...msg, reactions: data.reactions } : msg))
        );
      }
    } catch (err) {
      console.error('[React Error]', err);
    }
  };

  // Group channels by category
  const categories = Array.from(new Set(channels.map((c) => c.category)));
  const filteredChannels = channels.filter((c) =>
    c.name.toLowerCase().includes(channelSearch.toLowerCase())
  );

  const currentChannelObj = channels.find((c) => c.slug === activeChannel);

  return (
    <div
      className="min-h-screen bg-[#f0f2f5] p-2 sm:p-4 lg:p-6 select-none flex items-center justify-center font-sans"
      style={{ fontFamily: '"Plus Jakarta Sans", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
    >
      {/* ═══════════ MAIN FLOATING macOS WINDOW CONTAINER ═══════════ */}
      <div className="w-full max-w-[1540px] h-[calc(100vh-1rem)] sm:h-[calc(100vh-2rem)] lg:h-[92vh] bg-white rounded-[32px] shadow-[0_20px_70px_rgba(0,0,0,0.08)] border border-slate-200/90 overflow-hidden flex flex-col">

        {/* ═══════════ TOP GLOBAL WINDOW HEADER ═══════════ */}
        <div className="h-12 bg-white/95 border-b border-slate-200/80 px-5 flex items-center justify-between shrink-0">
          {/* macOS Window Controls */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] cursor-pointer" />
            <div className="ml-3 hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
              <img src="/logo.png" alt="TravlTik" className="h-4.5 w-auto object-contain" />
              <span className="text-slate-300">|</span>
              <span className="text-slate-800 font-bold">TravlTik Live Community Hub</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-[#00A86B] border border-emerald-200/80 rounded-full text-xs font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#00A86B] animate-ping" />
              <span>Live Multi-Tier Network</span>
            </div>
          </div>
        </div>

        {/* ═══════════ 3-COLUMN MAIN LAYOUT ═══════════ */}
        <div className="flex-1 flex min-h-0 overflow-hidden relative">

          {/* ─────────────────────────────────────────────────────────────
              1. LEFT SIDEBAR (Cols 3 - Channel Navigator)
             ───────────────────────────────────────────────────────────── */}
          <aside className={`w-[290px] bg-slate-50/70 border-r border-slate-200/80 flex flex-col justify-between shrink-0 transition-all duration-300 z-30 ${
            mobileChannelsOpen ? 'fixed inset-y-0 left-0 z-50 bg-white w-72 shadow-2xl flex' : 'hidden lg:flex'
          }`}>
            {/* Sidebar Top: Logo & Search */}
            <div className="p-4 border-b border-slate-200/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#00A86B] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900 tracking-tight leading-none">COMMUNITY HUB</div>
                    <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">Study Abroad 2026</div>
                  </div>
                </div>
                {mobileChannelsOpen && (
                  <button onClick={() => setMobileChannelsOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Search Bar with ⌘K */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={channelSearch}
                  onChange={(e) => setChannelSearch(e.target.value)}
                  placeholder="Search channels..."
                  className="w-full h-9 pl-8 pr-12 rounded-xl bg-white border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#00A86B]/20 focus:border-[#00A86B]"
                />
                <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Channels List by Category */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-thin">
              {categories.map((category) => {
                const categoryChannels = filteredChannels.filter((c) => c.category === category);
                if (categoryChannels.length === 0) return null;
                return (
                  <div key={category} className="space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
                      <span>{category}</span>
                      <span className="text-[9px] bg-slate-200/60 text-slate-500 font-bold px-1.5 py-0.2 rounded-full">
                        {categoryChannels.length}
                      </span>
                    </div>

                    {categoryChannels.map((channel) => {
                      const isActive = activeChannel === channel.slug;
                      return (
                        <button
                          key={channel.id}
                          type="button"
                          onClick={() => {
                            setActiveChannel(channel.slug);
                            setMobileChannelsOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#00A86B] text-white shadow-sm shadow-emerald-600/30'
                              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            <Hash className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                            <span className="truncate">{channel.name}</span>
                          </div>
                          {channel.unread_count > 0 && !isActive && (
                            <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shrink-0">
                              {channel.unread_count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* User Footer Profile Card */}
            <div className="p-3 border-t border-slate-200/60 bg-white">
              <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-50 border border-slate-200/70">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                      alt="User Avatar"
                      className="w-9 h-9 rounded-full object-cover border border-emerald-300"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00A86B] ring-2 ring-white" />
                  </div>
                  <div className="min-w-0 truncate">
                    <div className="text-xs font-black text-slate-900 truncate">Aman Verma</div>
                    <div className="text-[10px] text-slate-500 font-semibold truncate flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B]" /> Online
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => showToast('Profile settings loaded')}
                  className="w-8 h-8 rounded-xl bg-white hover:bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-500 cursor-pointer"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </aside>

          {/* Mobile Overlay for Left Drawer */}
          {mobileChannelsOpen && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden" onClick={() => setMobileChannelsOpen(false)} />
          )}

          {/* ─────────────────────────────────────────────────────────────
              2. CENTER PANEL (Cols 6 - Real-time Chat Container)
             ───────────────────────────────────────────────────────────── */}
          <main className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] overflow-hidden">

            {/* Header Pill Bar */}
            <div className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs z-20">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileChannelsOpen(true)}
                  className="lg:hidden w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 cursor-pointer"
                >
                  <Menu className="w-4.5 h-4.5" />
                </button>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Hash className="w-5 h-5 text-[#00A86B]" />
                    <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                      {currentChannelObj ? currentChannelObj.name : activeChannel}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                    <span className="flex items-center gap-1 text-[#00A86B]">
                      <span className="w-2 h-2 rounded-full bg-[#00A86B] animate-pulse" /> 85 Seniors Online
                    </span>
                    <span>&bull;</span>
                    <span className="hidden sm:inline text-slate-400 truncate max-w-[280px]">
                      {currentChannelObj?.description || 'Community Q&A and verified senior mentorship'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast('Channel notifications are active')}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer transition-colors"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setMobileRosterOpen(!mobileRosterOpen)}
                  className="xl:hidden w-9 h-9 rounded-xl bg-emerald-50 text-[#00A86B] border border-emerald-200 flex items-center justify-center cursor-pointer transition-colors"
                  title="Toggle Seniors & Resources"
                >
                  <Users className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message Stream Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin">
              {loading ? (
                <div className="py-20 text-center flex flex-col items-center justify-center text-slate-400">
                  <Loader2 className="w-6 h-6 animate-spin text-[#00A86B] mb-2" />
                  <span className="text-xs font-semibold">Connecting to Live Community Stream...</span>
                </div>
              ) : messages.length > 0 ? (
                messages.map((msg) => {
                  const isSelf = msg.user_id === 'user-current' || msg.sender_name === 'Aman Verma';
                  const timeFormatted = new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-3.5 max-w-[85%] group animate-fadeIn ${
                        isSelf ? 'ml-auto flex-row-reverse' : ''
                      }`}
                    >
                      {/* Avatar */}
                      <img
                        src={msg.sender_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                        alt={msg.sender_name}
                        className="w-10 h-10 rounded-2xl object-cover border border-slate-200 shrink-0 shadow-2xs"
                      />

                      {/* Message Bubble Card */}
                      <div className="space-y-1.5 flex-1 min-w-0">
                        {/* Header metadata */}
                        <div className={`flex items-center gap-2 flex-wrap ${isSelf ? 'justify-end' : ''}`}>
                          <span className="text-xs font-bold text-slate-900">{msg.sender_name}</span>
                          {msg.is_verified_senior && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[#00A86B] bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full shadow-2xs">
                              <Star className="w-2.5 h-2.5 fill-current" /> Verified Senior
                            </span>
                          )}
                          <span className="text-[10px] font-semibold text-slate-400">{timeFormatted}</span>
                        </div>

                        {/* Content Card */}
                        <div
                          className={`p-4 rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border transition-all ${
                            isSelf
                              ? 'bg-emerald-50/70 border-emerald-200/80 text-slate-900'
                              : 'bg-white border-slate-200/80 text-slate-800'
                          }`}
                        >
                          <p className="text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap font-medium">
                            {msg.content}
                          </p>

                          {/* Emoji Reactions Pill Bar */}
                          <div className="flex items-center flex-wrap gap-1.5 mt-3 pt-2 border-t border-slate-100">
                            {Array.isArray(msg.reactions) && msg.reactions.map((r, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => handleReaction(msg.id, r.emoji)}
                                className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-700 cursor-pointer active:scale-95 transition-all"
                              >
                                <span>{r.emoji}</span>
                                <span className="text-[11px] text-slate-600 font-black">{r.count}</span>
                              </button>
                            ))}

                            {/* Add Reaction Button */}
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setShowEmojiPicker(showEmojiPicker === msg.id ? null : msg.id)}
                                className="w-7 h-7 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/70 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer transition-colors text-xs"
                                title="Add Reaction"
                              >
                                +
                              </button>

                              {/* Emoji Picker Popover */}
                              {showEmojiPicker === msg.id && (
                                <div className="absolute bottom-full mb-1 left-0 z-30 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 flex gap-1.5 animate-fadeIn">
                                  {EMOJI_LIST.map((emoji) => (
                                    <button
                                      key={emoji}
                                      type="button"
                                      onClick={() => handleReaction(msg.id, emoji)}
                                      className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center text-sm cursor-pointer active:scale-125 transition-transform"
                                    >
                                      {emoji}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-20 text-center text-slate-400">
                  <Hash className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                  <h3 className="text-sm font-bold text-slate-700">Welcome to #{activeChannel}!</h3>
                  <p className="text-xs text-slate-400 mt-1">Be the first to post a query or say hello to the batch.</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* ─────────────────────────────────────────────────────────────
                BOTTOM INPUT BAR
               ───────────────────────────────────────────────────────────── */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-200/80">
              <form
                onSubmit={handleSendMessage}
                className="relative bg-[#f8fafc] border border-slate-200/90 rounded-[28px] p-2 flex items-center gap-2 shadow-xs focus-within:border-[#00A86B] focus-within:ring-2 focus-within:ring-[#00A86B]/15 transition-all"
              >
                {/* Attachment Clip */}
                <button
                  type="button"
                  onClick={() => showToast('Attachment uploaded: certified_transcript.pdf')}
                  className="w-10 h-10 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200/70 flex items-center justify-center text-slate-500 cursor-pointer shrink-0 transition-colors"
                  title="Attach File / Document"
                >
                  <Paperclip className="w-4.5 h-4.5 text-slate-600" />
                </button>

                {/* Input Text Field */}
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Type your message in #${activeChannel}... (Press Enter)`}
                  className="flex-1 bg-transparent border-none text-xs sm:text-[13px] font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none px-2"
                />

                {/* Quick Emoji Trigger */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowInputEmoji(!showInputEmoji)}
                    className="w-10 h-10 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200/70 flex items-center justify-center text-slate-500 cursor-pointer shrink-0 transition-colors"
                  >
                    <Smile className="w-4.5 h-4.5 text-slate-600" />
                  </button>

                  {showInputEmoji && (
                    <div className="absolute bottom-full mb-2 right-0 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 flex gap-1.5 animate-fadeIn z-30">
                      {EMOJI_LIST.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => {
                            setInputText((prev) => prev + emoji);
                            setShowInputEmoji(false);
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

                {/* Solid Emerald Send Button */}
                <button
                  type="submit"
                  disabled={!inputText.trim() || sending}
                  className="w-10 h-10 rounded-2xl bg-[#00A86B] hover:bg-[#008A62] text-white flex items-center justify-center cursor-pointer disabled:opacity-40 transition-all shrink-0 shadow-sm shadow-emerald-600/30 active:scale-95"
                  title="Send Message"
                >
                  {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </form>
            </div>

          </main>

          {/* ─────────────────────────────────────────────────────────────
              3. RIGHT SIDEBAR (Cols 3 - Roster & Pinned Resources)
             ───────────────────────────────────────────────────────────── */}
          <aside className={`w-[320px] bg-white border-l border-slate-200/80 flex flex-col justify-between shrink-0 overflow-y-auto p-5 space-y-6 scrollbar-thin z-30 transition-all duration-300 ${
            mobileRosterOpen ? 'fixed inset-y-0 right-0 z-50 bg-white w-80 shadow-2xl flex' : 'hidden xl:flex'
          }`}>
            <div className="space-y-6">

              {/* Mobile Close Button */}
              {mobileRosterOpen && (
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 xl:hidden">
                  <h3 className="text-xs font-bold text-slate-900">Roster & Resources</h3>
                  <button onClick={() => setMobileRosterOpen(false)} className="p-1 rounded-lg text-slate-400">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* 1. Online Members / Seniors Block */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#00A86B]" />
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Verified Seniors</h3>
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    85 Online
                  </span>
                </div>

                <div className="space-y-2">
                  {seniors.map((senior) => (
                    <div
                      key={senior.id}
                      className="p-2.5 rounded-2xl bg-slate-50/80 hover:bg-emerald-50/50 border border-slate-200/70 flex items-center justify-between transition-colors group cursor-pointer"
                      onClick={() => {
                        setInputText(`@${senior.name} `);
                        inputRef.current?.focus();
                        showToast(`Mentioning @${senior.name}`);
                      }}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="relative shrink-0">
                          <img
                            src={senior.avatar_url}
                            alt={senior.name}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200"
                          />
                          <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#00A86B] ring-2 ring-white" />
                        </div>
                        <div className="min-w-0 truncate">
                          <div className="text-xs font-bold text-slate-900 truncate flex items-center gap-1">
                            <span>{senior.name}</span>
                            <Star className="w-2.5 h-2.5 text-[#00A86B] fill-current shrink-0" />
                          </div>
                          <div className="text-[10px] text-slate-500 font-medium truncate">{senior.university}</div>
                        </div>
                      </div>

                      <button className="text-[10px] font-bold text-[#00A86B] opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        Ask
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Pinned Resources Block */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#00A86B]" />
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Pinned Resources</h3>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">{resources.length} files</span>
                </div>

                <div className="space-y-2">
                  {resources.map((res) => (
                    <div
                      key={res.id}
                      className="p-3 rounded-2xl bg-slate-50/80 hover:bg-slate-100 border border-slate-200/70 flex items-center justify-between transition-colors group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 border border-red-200/60 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 truncate">
                          <div className="text-xs font-bold text-slate-900 truncate">{res.title}</div>
                          <div className="text-[10px] text-slate-400 font-semibold">{res.file_size} &bull; PDF Guide</div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => showToast(`Downloading ${res.title}...`)}
                        className="w-7 h-7 rounded-xl bg-white group-hover:bg-[#00A86B] group-hover:text-white border border-slate-200 flex items-center justify-center text-slate-600 cursor-pointer transition-colors shrink-0"
                        title="Download Document"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom CTA Button */}
            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => showToast('Opening Full Knowledgebase Library...')}
                className="w-full h-11 rounded-2xl bg-[#00A86B] hover:bg-[#008A62] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm shadow-emerald-600/20 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>View All Resources</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </aside>

          {/* Mobile Overlay for Right Drawer */}
          {mobileRosterOpen && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 xl:hidden" onClick={() => setMobileRosterOpen(false)} />
          )}

        </div>

      </div>

      {/* ═══════════ FLOATING TOAST NOTIFICATION ═══════════ */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-[9999] bg-slate-900/95 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn border border-white/10 backdrop-blur-xl">
          <div className="w-6 h-6 rounded-full bg-[#00A86B] text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs sm:text-[13px] font-semibold">{toastMsg}</span>
        </div>
      )}

    </div>
  );
}
