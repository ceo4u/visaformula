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
    email?: string;
    phone?: string;
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
  isOpen?: boolean;
  onClose: () => void;
  onBookClick?: (expert: any) => void;
}

export function ExpertProfileModal({ expert, onClose, onBookClick }: ExpertProfileModalProps) {
  if (!expert) return null;

  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingName, setBookingName] = useState(() => typeof window !== 'undefined' ? (localStorage.getItem("seeker_firstName") ? `${localStorage.getItem("seeker_firstName")} ${localStorage.getItem("seeker_lastName") || ""}`.trim() : "") : "");
  const [bookingEmail, setBookingEmail] = useState(() => typeof window !== 'undefined' ? (localStorage.getItem("seeker_email") || "") : "");
  const [bookingPhone, setBookingPhone] = useState(() => typeof window !== 'undefined' ? (localStorage.getItem("seeker_phone") || "") : "");
  const [bookingVisa, setBookingVisa] = useState("Student Visa");
  const [bookingNotes, setBookingNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBookingClick = () => {
    if (onBookClick) {
      onBookClick(expert);
    } else {
      setShowBookingForm(true);
    }
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingEmail) return;
    setIsSubmitting(true);

    try {
      const payload = {
        seekerName: bookingName || "Applicant",
        seekerEmail: bookingEmail,
        seekerPhone: bookingPhone,
        expertName: expert.name,
        expertEmail: expert.email || "consultant@trawelliq.com",
        visaCategory: bookingVisa,
        details: bookingNotes || "Consultation session request",
        bookingDate: new Date().toISOString()
      };

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setBookingSuccess(true);
      }
    } catch(err) {
      console.error('[ExpertProfileModal] Booking error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const experienceYears = expert?.experience || 5;
  const ratingValue = (expert?.rating || 4.9).toFixed(1);
  const reviewsCount = expert?.reviews || 48;

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
                  className="flex-1 sm:flex-none bg-slate-900 hover:bg-slate-700 active:scale-95 text-white font-bold text-xs px-6 py-3 rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer font-sans"
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
                  <span className="text-[10px] font-medium text-slate-600 tracking-tight">{story.label}</span>
                </div>
              ))}
            </div>

            {/* Transparent Fixed Pricing Banner */}
            <div className="flex items-center justify-between bg-teal-50/80 border border-teal-200/80 rounded-2xl p-3.5 mb-5 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#00a896]/10 flex items-center justify-center text-[#00a896] shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900 font-sans">Transparent Direct Pricing</p>
                  <p className="text-[11px] text-slate-500 font-normal">Includes 15-min initial case evaluation &amp; document roadmap</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] uppercase font-medium text-teal-800 tracking-wider block">Starting from</span>
                <span className="text-base font-bold text-slate-950 font-sans">{expert.price ? `₹${expert.price}` : '₹299'}</span>
                <span className="text-[10px] text-slate-500 font-normal"> / session</span>
              </div>
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
                <strong>Privacy Protected:</strong> Direct contact details (phone, email &amp; address) are kept confidential until your consultation is booked.
              </p>
            </div>

          </div>
        </div>

        {/* Fixed Bottom Booking Footer */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-5 py-3.5 flex items-center justify-between gap-4 font-sans">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-sans">Consultation Fee</span>
            <div className="flex items-baseline gap-1 font-sans">
              <span className="text-lg font-black text-slate-900 font-sans">₹{expert.price || 299}</span>
              <span className="text-[11px] text-slate-400 font-semibold font-sans">/ session</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleBookingClick}
            className="bg-slate-900 hover:bg-slate-700 active:scale-95 text-white font-bold text-xs px-6 py-3 rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer font-sans"
          >
            <Calendar className="w-4 h-4" /> Book Consultation
          </button>
        </div>
      </div>

      {showBookingForm && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn font-sans">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 border border-slate-100 font-sans text-slate-900">
            <button
              onClick={() => { setShowBookingForm(false); setBookingSuccess(false); }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-black text-slate-900">Consultation Booked! 📅</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Your inquiry has been submitted directly to <strong>{expert.name}</strong>. They will contact you shortly via email/phone.
                </p>
                <button
                  type="button"
                  onClick={() => { setShowBookingForm(false); setBookingSuccess(false); onClose(); }}
                  className="bg-slate-900 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md hover:bg-slate-800 transition-all"
                >
                  Done & Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitBooking} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-900">Book Session with {expert.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">Fill in your details to schedule a 1-on-1 consultation.</p>
                </div>

                <div className="space-y-3 text-left">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 focus:border-[#00a896] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={bookingEmail}
                        onChange={(e) => setBookingEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 focus:border-[#00a896] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        placeholder="+91 9876543210"
                        className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 focus:border-[#00a896] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Visa Category</label>
                    <select
                      value={bookingVisa}
                      onChange={(e) => setBookingVisa(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 focus:border-[#00a896] outline-none bg-white"
                    >
                      <option value="Student Visa">Student Visa / Study Permit</option>
                      <option value="Work Permit">Work Permit / Job Visa</option>
                      <option value="Tourist Visa">Tourist / Visitor Visa</option>
                      <option value="Permanent Residency">PR / Migration</option>
                      <option value="Business Visa">Business / Investment Visa</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Message / Key Requirements</label>
                    <textarea
                      rows={3}
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      placeholder="Briefly describe your profile, destination, or questions..."
                      className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 focus:border-[#00a896] outline-none"
                    ></textarea>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#581c87] hover:bg-[#4c1d95] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                  >
                    {isSubmitting ? 'Submitting...' : 'Confirm & Submit Enquiry →'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
