import React, { useState } from 'react';
import { 
  X, Star, MapPin, Award, CheckCircle, Calendar, 
  MessageSquare, ShieldCheck, Globe, Share2, Bookmark, 
  Sparkles, ExternalLink, UserCheck, Briefcase, ChevronRight
} from 'lucide-react';

interface ExpertProfileModalProps {
  expert: {
    id: string;
    name: string;
    role: string;
    city: string;
    bio?: string;
    aboutMe?: string;
    tags: string[];
    countries: string[];
    rating: number;
    reviews: number;
    isVerified?: boolean;
    isRemote?: boolean;
    govReg?: string;
    image?: string;
    experience?: number;
    price?: number;
    portfolioLink?: string;
  };
  onClose: () => void;
  onBookClick?: (expert: any) => void;
}

export function ExpertProfileModal({ expert, onClose, onBookClick }: ExpertProfileModalProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBookingClick = () => {
    if (onBookClick) {
      onBookClick(expert);
    } else {
      onClose();
    }
  };

  const experienceYears = expert.experience || 5;
  const ratingValue = (expert.rating || 4.9).toFixed(1);
  const reviewsCount = expert.reviews || 48;

  // Highlights with balanced colors
  const storyHighlights = [
    { label: 'Approvals', icon: '📜', color: 'from-amber-400 to-orange-500' },
    { label: 'Canada PR', icon: '🇨🇦', color: 'from-slate-700 to-slate-900' },
    { label: 'Student Visa', icon: '🎓', color: 'from-blue-500 to-indigo-600' },
    { label: 'Reviews', icon: '⭐', color: 'from-amber-400 to-yellow-500' },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/75 backdrop-blur-md animate-fadeIn overflow-y-auto font-sans">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-auto transform transition-all duration-300 max-h-[92vh] flex flex-col font-sans text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-5 py-3.5 border-b border-slate-100 flex items-center justify-between font-sans">
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold text-slate-900 tracking-tight font-sans">{expert.name}</span>
            {expert.isVerified && (
              <span className="inline-flex items-center gap-1 bg-sky-50 text-sky-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-sky-200">
                <CheckCircle className="w-3 h-3 text-sky-600 fill-sky-100" /> Verified
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
          
          {/* Cover Photo Banner (Sleek Obsidian Slate Navy) */}
          <div className="h-32 sm:h-40 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-white text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Top Rated Consultant</span>
            </div>
          </div>

          {/* Main Profile Info Header */}
          <div className="px-5 sm:px-7 pb-6 relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-14 sm:-mt-16 mb-5 gap-4">
              
              {/* Profile Avatar Ring */}
              <div className="relative group shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-slate-800 via-amber-400 to-slate-900 shadow-xl">
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
                  onClick={handleBookingClick}
                  className="flex-1 sm:flex-none bg-[#00a896] hover:bg-[#008f80] active:scale-95 text-white font-bold text-xs px-6 py-3 rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer font-sans"
                >
                  <Calendar className="w-4 h-4" /> Book Consultation
                </button>
              </div>

            </div>

            {/* Profile Titles */}
            <div className="space-y-1 text-center sm:text-left font-sans">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-2 font-sans">
                {expert.name}
                <CheckCircle className="w-5 h-5 text-sky-500 fill-sky-50 shrink-0" />
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 flex items-center justify-center sm:justify-start gap-1.5 font-sans">
                <Briefcase className="w-3.5 h-3.5 text-slate-500" /> {expert.role}
              </p>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-200/80 rounded-2xl p-3 my-5 text-center font-sans">
              <div className="space-y-0.5">
                <div className="flex items-center justify-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-black text-base text-slate-900">{ratingValue}</span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{reviewsCount} Reviews</p>
              </div>

              <div className="space-y-0.5 border-x border-slate-200/80 px-1">
                <div className="font-black text-base text-slate-900 flex items-center justify-center gap-1">
                  <Award className="w-4 h-4 text-slate-700" />
                  <span>{experienceYears}+ Yrs</span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Experience</p>
              </div>

              <div className="space-y-0.5">
                <div className="font-black text-base text-slate-900 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>98%</span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Success Rate</p>
              </div>
            </div>

            {/* Story Highlights Bar */}
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
            <div className="space-y-3 bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs mb-5 font-sans">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-sans">
                <Globe className="w-3.5 h-3.5 text-slate-500" /> About Consultant
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium font-sans">
                {expert.bio || expert.aboutMe || `Licensed immigration specialist providing expert guidance for overseas education, work permits, and permanent residency. Committed to delivering seamless and transparent visa processing for clients worldwide.`}
              </p>

              {/* Countries Destinations */}
              {expert.countries && expert.countries.length > 0 && (
                <div className="pt-2 flex flex-wrap items-center gap-1.5 border-t border-slate-100 font-sans">
                  <span className="text-[11px] font-bold text-slate-500 mr-1">Destinations Served:</span>
                  {expert.countries.map(c => (
                    <span key={c} className="bg-slate-100 text-slate-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-slate-200 font-sans">
                      🌍 {c}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Expertise Tags */}
            {expert.tags && expert.tags.length > 0 && (
              <div className="mb-5 font-sans">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 font-sans">Specializations</h3>
                <div className="flex flex-wrap gap-1.5 font-sans">
                  {expert.tags.map(t => (
                    <span key={t} className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1 rounded-xl transition-colors font-sans">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Portfolio Link (If present) */}
            {expert.portfolioLink && (
              <div className="mb-5 bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between font-sans">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 font-bold text-xs">
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
                  className="bg-white hover:bg-slate-900 hover:text-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-300 transition-all shrink-0 flex items-center gap-1 shadow-2xs font-sans"
                >
                  Visit <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* Privacy Protection Notice */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex items-center gap-3 text-slate-600 text-xs font-sans">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <p className="text-[11px] font-medium leading-snug font-sans">
                <strong>Privacy Guaranteed:</strong> Direct contact details (phone, email &amp; address) are kept confidential until your consultation is booked.
              </p>
            </div>

          </div>
        </div>

        {/* Fixed Bottom Booking Footer */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-5 py-3.5 flex items-center justify-between gap-4 font-sans">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-sans">Consultation Fee</span>
            <div className="flex items-baseline gap-1 font-sans">
              <span className="text-lg font-black text-slate-900 font-sans">₹{expert.price || 1500}</span>
              <span className="text-[11px] text-slate-400 font-semibold font-sans">/ session</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleBookingClick}
            className="bg-[#00a896] hover:bg-[#008f80] active:scale-95 text-white font-bold text-xs px-6 py-3 rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer font-sans"
          >
            <Calendar className="w-4 h-4" /> Book Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
