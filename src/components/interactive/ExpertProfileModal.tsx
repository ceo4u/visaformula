import React, { useState } from 'react';
import { 
  X, CheckCircle, Star, Award, ShieldCheck, MapPin, Globe, 
  Calendar, MessageSquare, ArrowRight, Sparkles, UserCheck, 
  Briefcase, Check, Bookmark, Share2, ThumbsUp, ChevronRight, Clock
} from 'lucide-react';

export interface ExpertProfileData {
  id: string;
  name: string;
  role: string;
  rating?: number;
  reviews?: number;
  price?: number;
  city?: string;
  countries?: string[];
  experience?: number;
  isRemote?: boolean;
  isVerified?: boolean;
  govReg?: string;
  tags?: string[];
  image?: string;
  bio?: string;
  aboutMe?: string;
  portfolioLink?: string;
  services?: string[];
}

interface ExpertProfileModalProps {
  expert: ExpertProfileData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ExpertProfileModal({ expert, isOpen, onClose }: ExpertProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'reviews'>('overview');
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!isOpen || !expert) return null;

  if (bookingConfirmed) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
        <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5 border border-slate-100 font-sans" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={() => { setBookingConfirmed(false); onClose(); }}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-3xl bg-teal-50 border border-teal-100 text-[#00a896] flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle className="w-9 h-9 text-[#00a896]" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-black text-slate-900">Booking Request Sent! 🎉</h3>
            <p className="text-xs text-slate-500 font-medium">Your session booking request has been dispatched to {expert.name}.</p>
          </div>

          {/* Prominent TAT Notice Box */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-teal-200 rounded-2xl p-4 text-left space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-emerald-900 font-black text-xs uppercase tracking-wider">
              <Clock className="w-4 h-4 text-[#00a896]" />
              <span>Turnaround Time Notice</span>
            </div>
            <p className="text-xs font-bold text-teal-950 leading-relaxed">
              EXPERT WILL CHECK YOUR REQUEST AND CONNECT WITH YOU TAT - 12-24 HOURS.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-3.5 text-left text-xs space-y-2 border border-slate-100">
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Consultant:</span>
              <span className="font-bold text-slate-800">{expert.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Fee:</span>
              <span className="font-extrabold text-[#00a896]">₹{expert.price || 1500}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Status:</span>
              <span className="font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md">Pending Expert Approval</span>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => { setBookingConfirmed(false); onClose(); window.location.href = "/dashboard"; }}
              className="w-full bg-[#00a896] hover:bg-[#008f80] text-white font-extrabold text-xs py-3.5 rounded-2xl shadow-md transition-all cursor-pointer"
            >
              View My Dashboard
            </button>
            <button
              onClick={() => { setBookingConfirmed(false); onClose(); }}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-2xl transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }


  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Generate Instagram style handle
  const handleName = `@${expert.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
  const experienceYears = expert.experience || 5;
  const ratingValue = (expert.rating || 4.9).toFixed(1);
  const reviewsCount = expert.reviews || 48;

  // Mock Instagram style story highlights for visual polish
  const storyHighlights = [
    { label: 'Approvals', icon: '📜', color: 'from-amber-400 to-orange-500' },
    { label: 'Canada PR', icon: '🇨🇦', color: 'from-[#00a896] to-teal-700' },
    { label: 'Student Visa', icon: '🎓', color: 'from-blue-500 to-indigo-600' },
    { label: 'Reviews', icon: '⭐', color: 'from-yellow-400 to-amber-600' },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/75 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-auto transform transition-all duration-300 max-h-[92vh] flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold text-slate-900 tracking-tight">{handleName}</span>
            {expert.isVerified && (
              <span className="inline-flex items-center gap-1 bg-teal-50 text-[#00a896] text-[10px] font-black px-2 py-0.5 rounded-full border border-teal-100">
                <CheckCircle className="w-3 h-3 fill-teal-100 text-[#00a896]" /> Verified
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-full transition-all ${isSaved ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              title="Save Consultant"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
            </button>

            <button 
              onClick={handleShare}
              className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all relative"
              title="Share Profile"
            >
              <Share2 className="w-4 h-4" />
              {copied && (
                <span className="absolute -bottom-8 right-0 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                  Link Copied!
                </span>
              )}
            </button>

            <button 
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          
          {/* Cover Photo / Gradient Header Banner */}
          <div className="h-32 sm:h-40 bg-gradient-to-r from-slate-900 via-teal-950 to-emerald-950 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00a896_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-white text-[11px] font-extrabold flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Top Rated Consultant</span>
            </div>
          </div>

          {/* Main Profile Info Header (Instagram Style) */}
          <div className="px-5 sm:px-7 pb-6 relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-14 sm:-mt-16 mb-5 gap-4">
              
              {/* Instagram Gradient Ring Avatar */}
              <div className="relative group shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-teal-500 to-[#00a896] shadow-xl">
                  {expert.image ? (
                    <img 
                      src={expert.image} 
                      alt={expert.name} 
                      className="w-full h-full object-cover rounded-full border-2 border-white bg-slate-100" 
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-slate-900 text-white font-black text-3xl flex items-center justify-center border-2 border-white">
                      {(expert.name || "E").charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="absolute bottom-1 right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow-md" title="Online & Available">
                  <UserCheck className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button 
                  type="button"
                  onClick={() => setBookingConfirmed(true)}
                  className="flex-1 sm:flex-none bg-[#00a896] hover:bg-[#008f80] active:scale-95 text-white font-extrabold text-xs px-6 py-3 rounded-2xl shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" /> Book Consultation
                </button>
              </div>

            </div>

            {/* Profile Titles */}
            <div className="space-y-1 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-2">
                {expert.name}
                <CheckCircle className="w-5 h-5 text-[#00a896] fill-teal-50 shrink-0" />
              </h2>
              <p className="text-xs sm:text-sm font-bold text-[#00a896] flex items-center justify-center sm:justify-start gap-1.5">
                <Briefcase className="w-3.5 h-3.5" /> {expert.role}
              </p>
            </div>

            {/* Instagram Style Stats Bar */}
            <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-100 rounded-2xl p-3 my-5 text-center">
              <div className="space-y-0.5">
                <div className="flex items-center justify-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-extrabold text-base text-slate-900">{ratingValue}</span>
                </div>
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">{reviewsCount} Reviews</p>
              </div>

              <div className="space-y-0.5 border-x border-slate-200/60 px-1">
                <div className="font-extrabold text-base text-slate-900 flex items-center justify-center gap-1">
                  <Award className="w-4 h-4 text-[#00a896]" />
                  <span>{experienceYears}+ Yrs</span>
                </div>
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Experience</p>
              </div>

              <div className="space-y-0.5">
                <div className="font-extrabold text-base text-slate-900 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>98%</span>
                </div>
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Success Rate</p>
              </div>
            </div>

            {/* Instagram Story Highlights Bar */}
            <div className="flex items-center gap-4 overflow-x-auto pb-2 mb-5 no-scrollbar">
              {storyHighlights.map((story, i) => (
                <div key={i} className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group">
                  <div className={`w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr ${story.color} shadow-sm group-hover:scale-105 transition-transform`}>
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xl border border-slate-100">
                      {story.icon}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 tracking-tight">{story.label}</span>
                </div>
              ))}
            </div>

            {/* About Bio Section */}
            <div className="space-y-3 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm mb-5">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#00a896]" /> About Consultant
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {expert.bio || expert.aboutMe || `Licensed immigration specialist providing expert guidance for overseas education, work permits, and permanent residency. Committed to delivering seamless and transparent visa processing for clients worldwide.`}
              </p>

              {/* Countries Destinations */}
              {expert.countries && expert.countries.length > 0 && (
                <div className="pt-2 flex flex-wrap items-center gap-1.5 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 mr-1">Destinations Served:</span>
                  {expert.countries.map(c => (
                    <span key={c} className="bg-teal-50 text-[#00a896] text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border border-teal-100">
                      🌍 {c}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Expertise Tags */}
            {expert.tags && expert.tags.length > 0 && (
              <div className="mb-5">
                <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">Specializations</h3>
                <div className="flex flex-wrap gap-1.5">
                  {expert.tags.map(t => (
                    <span key={t} className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-1 rounded-xl transition-colors">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Portfolio Link (If present) */}
            {expert.portfolioLink && (
              <div className="mb-5 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 rounded-2xl p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#00a896] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                    🌐
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Official Website & Portfolio</h4>
                    <p className="text-[11px] text-slate-500 truncate max-w-[200px] sm:max-w-xs">{expert.portfolioLink}</p>
                  </div>
                </div>
                <a 
                  href={expert.portfolioLink.startsWith('http') ? expert.portfolioLink : `https://${expert.portfolioLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-teal-600 hover:text-white text-[#00a896] text-xs font-extrabold px-3 py-1.5 rounded-xl border border-teal-200 transition-all shrink-0 flex items-center gap-1 shadow-xs"
                >
                  Visit <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* Privacy Protection Notice */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex items-center gap-3 text-slate-600 text-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <p className="text-[11px] font-medium leading-snug">
                <strong>Privacy Guaranteed:</strong> Direct contact details (phone, email &amp; address) are kept confidential until your consultation is booked.
              </p>
            </div>

          </div>
        </div>

        {/* Fixed Bottom Booking Footer */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-5 py-3.5 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Consultation Fee</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-slate-900">₹{expert.price || 1500}</span>
              <span className="text-[11px] text-slate-400 font-semibold">/ session</span>
            </div>
          </div>

          <button 
            type="button"
            onClick={() => setBookingConfirmed(true)}
            className="bg-[#00a896] hover:bg-[#008f80] active:scale-95 text-white font-extrabold text-xs px-6 py-3 rounded-2xl shadow-lg shadow-teal-500/20 flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>Book Session Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
}
