import React, { useState, useEffect } from "react";
import { 
  X, 
  Star, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  MessageSquare, 
  Sparkles,
  RefreshCw,
  Tag
} from "lucide-react";

export interface ReviewRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  expertId: number;
  expertName: string;
  bookingId?: number;
  onSuccess?: () => void;
}

const REVIEW_TAGS = [
  "Fast Response",
  "High Visa Success",
  "Clear Documentation",
  "Patient & Helpful",
  "Transparent Pricing",
  "Excellent Advice",
  "Stress-free Process"
];

export function ReviewRatingModal({
  isOpen,
  onClose,
  expertId,
  expertName,
  bookingId = 0,
  onSuccess
}: ReviewRatingModalProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedback, setFeedback] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const [seekerName, setSeekerName] = useState("");
  const [seekerEmail, setSeekerEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isVerifiedTx, setIsVerifiedTx] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";

    // Auto-fill authenticated seeker information if stored locally
    try {
      const userStr = localStorage.getItem("visaformula_user") || localStorage.getItem("travltik_user");
      if (userStr) {
        const u = JSON.parse(userStr);
        if (u.name) setSeekerName(u.name);
        if (u.email) setSeekerEmail(u.email);
      }
    } catch (e) {}

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!seekerEmail.trim() || !feedback.trim()) {
      setErrorMsg("Please provide your email and write your review experience.");
      return;
    }

    if (feedback.trim().length < 15) {
      setErrorMsg("Please write at least 15 characters describing your consultation experience.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          expertId,
          expertName,
          seekerName: seekerName || "Verified Client",
          seekerEmail,
          rating,
          feedback,
          tags: selectedTags.join(", "),
          bookingId
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsVerifiedTx(data.isVerifiedTransaction);
        setSuccessMsg(data.message || "Thank you for rating your advisor!");
        if (onSuccess) onSuccess();
        setTimeout(() => {
          onClose();
        }, 2200);
      } else {
        throw new Error(data.error || "Failed to submit review.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn font-sans">
      <div className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-slate-900 relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#481268] to-[#00a896] p-5 sm:p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
              <Star className="w-6 h-6 text-amber-300 fill-amber-300" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                Rate & Review Advisor
              </h2>
              <p className="text-xs text-white/80 font-medium mt-0.5">
                Share your consultation experience with <span className="font-bold underline">{expertName}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 text-left">
          
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs flex items-center gap-2 font-medium">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-xs flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <div>
                <span>{successMsg}</span>
                {isVerifiedTx && (
                  <span className="block text-[11px] font-extrabold text-emerald-800 mt-0.5">
                    ✓ Verified Transaction Badge Awarded
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Star Rating Selector */}
          <div className="text-center py-2 bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
            <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider block mb-2">
              Overall Satisfaction Score
            </label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((starVal) => {
                const active = (hoverRating || rating) >= starVal;
                return (
                  <button
                    key={starVal}
                    type="button"
                    onMouseEnter={() => setHoverRating(starVal)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(starVal)}
                    className="p-1 transition-transform hover:scale-125 cursor-pointer"
                  >
                    <Star 
                      className={`w-8 h-8 ${active ? "text-amber-400 fill-amber-400" : "text-slate-300"}`} 
                    />
                  </button>
                );
              })}
            </div>
            <span className="text-xs font-bold text-slate-700 mt-1 block">
              {rating === 5 ? "⭐️⭐️⭐️⭐️⭐️ Outstanding" : rating === 4 ? "⭐️⭐️⭐️⭐️ Very Good" : rating === 3 ? "⭐️⭐️⭐️ Average" : rating === 2 ? "⭐️⭐️ Needs Improvement" : "⭐️ Poor"}
            </span>
          </div>

          {/* Review Tags Selection */}
          <div>
            <label className="text-[11px] font-extrabold text-slate-700 block mb-1.5">
              Highlight Highlights (Optional)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {REVIEW_TAGS.map(t => {
                const isSelected = selectedTags.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTag(t)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                      isSelected 
                        ? "bg-teal-50 text-[#00a896] border-[#00a896] shadow-2xs" 
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {isSelected ? "✓ " : "+ "}{t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Written Feedback Textarea */}
          <div>
            <label className="text-[11px] font-extrabold text-slate-700 block mb-1">
              Your Written Review *
            </label>
            <textarea
              rows={3}
              required
              placeholder="How was your communication? Did the advisor provide clear document checklists and transparent answers?..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#00a896] transition-colors resize-none"
            />
          </div>

          {/* Reviewer Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div>
              <label className="text-[10px] font-bold text-slate-700 block mb-1">Your Name</label>
              <input
                type="text"
                placeholder="e.g. Priya Sharma"
                value={seekerName}
                onChange={(e) => setSeekerName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#00a896]"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-700 block mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="priya@example.com"
                value={seekerEmail}
                onChange={(e) => setSeekerEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#00a896]"
              />
            </div>
          </div>

          {/* Verified Transaction Notice */}
          <div className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-[#00a896] shrink-0" />
            <span>Reviews with completed consultation records are automatically badged as <strong>Verified Transactions</strong>.</span>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-[#00a896] hover:bg-[#008f80] text-white text-xs font-extrabold shadow-sm transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Publishing Review...
                </>
              ) : (
                <>
                  <Star className="w-4 h-4 fill-white" /> Submit Review
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
