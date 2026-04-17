"use client";
import { useState } from "react";
import { Star, Camera, Upload, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ReviewPage({ params }: { params: { expertId: string } }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [responsiveness, setResponsiveness] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [value, setValue] = useState(0);
    const [visaStatus, setVisaStatus] = useState("");
    const [reviewText, setReviewText] = useState("");

    const RatingStars = ({ current, onSet }: { current: number; onSet: (n: number) => void }) => (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(n => (
                <button key={n} onClick={() => onSet(n)} className="transition-transform hover:scale-110">
                    <Star className={`w-6 h-6 ${n <= current ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
                </button>
            ))}
        </div>
    );

    return (
        <div className="bg-[#f0f4f8] min-h-screen py-10 px-4">
            <div className="max-w-xl mx-auto">
                <Link href={`/expert/${params.expertId}`} className="text-sm text-[#0ea5e9] font-semibold flex items-center gap-1 mb-6 hover:underline">
                    <ArrowLeft className="w-4 h-4" /> Back to Expert Profile
                </Link>

                <div className="bg-white rounded-2xl border border-sky-100 shadow-card p-6">
                    {/* Expert Mini Card */}
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                        <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face" alt="Expert" className="w-14 h-14 rounded-xl object-cover ring-2 ring-sky-100" />
                        <div>
                            <h3 className="font-bold text-navy">Marcus Thorne, JD</h3>
                            <p className="text-xs text-gray-500">Immigration Attorney · New York</p>
                        </div>
                    </div>

                    <h2 className="font-sora text-xl font-bold text-navy mb-6">Leave a Review</h2>

                    {/* Overall Rating */}
                    <div className="mb-6">
                        <label className="text-sm font-bold text-navy mb-2 block">Overall Rating</label>
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1.5">
                                {[1, 2, 3, 4, 5].map(n => (
                                    <button key={n} onClick={() => setRating(n)} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)} className="transition-transform hover:scale-125">
                                        <Star className={`w-8 h-8 ${n <= (hover || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} transition-colors`} />
                                    </button>
                                ))}
                            </div>
                            {rating > 0 && <span className="text-sm font-bold text-navy">{rating}.0</span>}
                        </div>
                    </div>

                    {/* Attribute Ratings */}
                    <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-600">Responsiveness</span>
                            <RatingStars current={responsiveness} onSet={setResponsiveness} />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-600">Accuracy</span>
                            <RatingStars current={accuracy} onSet={setAccuracy} />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-600">Value for Money</span>
                            <RatingStars current={value} onSet={setValue} />
                        </div>
                    </div>

                    {/* Visa Status */}
                    <div className="mb-6">
                        <label className="text-sm font-bold text-navy mb-2 block">Did your visa get approved?</label>
                        <div className="flex gap-2">
                            {["Yes", "No", "Still Waiting"].map(s => (
                                <button key={s} onClick={() => setVisaStatus(s)}
                                    className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${visaStatus === s
                                            ? s === "Yes" ? "bg-emerald-50 border-emerald-300 text-emerald-700" : s === "No" ? "bg-red-50 border-red-300 text-red-700" : "bg-amber-50 border-amber-300 text-amber-700"
                                            : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
                                        }`}>
                                    {s === "Yes" ? "✅" : s === "No" ? "❌" : "⏳"} {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Review Text */}
                    <div className="mb-6">
                        <label className="text-sm font-bold text-navy mb-2 block">Your Review</label>
                        <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} rows={4}
                            placeholder="Share your experience... (min 50 characters)"
                            className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9] resize-none" />
                        <p className={`text-xs mt-1 ${reviewText.length < 50 ? "text-gray-400" : "text-emerald-500"}`}>{reviewText.length}/50 characters minimum</p>
                    </div>

                    {/* Photo Upload */}
                    <div className="mb-6">
                        <label className="text-sm font-bold text-navy mb-2 block">Attach Photo (optional)</label>
                        <div className="border-2 border-dashed border-sky-200 rounded-xl p-6 text-center hover:bg-sky-50/50 transition-colors cursor-pointer">
                            <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                            <p className="text-xs text-gray-400">Drop your approval letter or photo here</p>
                            <p className="text-[10px] text-gray-300 mt-1">PDF, JPG, PNG · Max 5MB</p>
                        </div>
                    </div>

                    {/* Submit */}
                    <button disabled={rating === 0 || reviewText.length < 50}
                        className={`w-full py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all ${rating > 0 && reviewText.length >= 50
                                ? "bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white hover:shadow-lg hover:shadow-sky-200 active:scale-[0.98]"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}>
                        <CheckCircle className="w-5 h-5" /> Submit Review
                    </button>
                </div>
            </div>
        </div>
    );
}
