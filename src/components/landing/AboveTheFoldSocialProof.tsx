'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Star, Users, CheckCircle2, Award,
  Sparkles, ArrowRight, ChevronLeft, ChevronRight,
  TrendingUp, Globe, Building2, Quote, ExternalLink
} from 'lucide-react';

interface SuccessStory {
  id: string;
  name: string;
  avatar: string;
  country: string;
  flag: string;
  visaType: string;
  consultant: string;
  duration: string;
  review: string;
  rating: number;
  verifiedDate: string;
}

const successStories: SuccessStory[] = [
  {
    id: 's1',
    name: 'Aarav & Meera Patel',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=240&auto=format&fit=crop',
    country: 'Canada',
    flag: 'ca',
    visaType: 'Express Entry PR (Federal Skilled Worker)',
    consultant: 'Arjun Mehta (ICCRC-R123456)',
    duration: '4.5 Months',
    review: 'Our consultant identified our CRS point gaps and guided our PNP nomination seamlessly. TravlTik made our dream move to Toronto effortless.',
    rating: 5,
    verifiedDate: 'Approved August 2026'
  },
  {
    id: 's2',
    name: 'Dr. Rohan Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=240&auto=format&fit=crop',
    country: 'United Kingdom',
    flag: 'gb',
    visaType: 'NHS Health & Care Skilled Worker Visa',
    consultant: 'Priya Sharma (OISC Registered)',
    duration: '14 Days Priority',
    review: 'Navigating CoS sponsorship and visa filing seemed daunting. The transparent milestone fees and verified legal check gave me 100% peace of mind.',
    rating: 5,
    verifiedDate: 'Approved July 2026'
  },
  {
    id: 's3',
    name: 'Ananya Sengupta',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=240&auto=format&fit=crop',
    country: 'Germany',
    flag: 'de',
    visaType: 'EU Blue Card (Senior Tech Specialist)',
    consultant: 'Rahul Kapoor (Frankfurt Certified)',
    duration: '3 Weeks',
    review: 'From contract verification to Embassy appointment scheduling, Rahul helped me land in Munich without a single delay or missing document.',
    rating: 5,
    verifiedDate: 'Approved August 2026'
  },
  {
    id: 's4',
    name: 'Vikram & Sneha Iyer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=240&auto=format&fit=crop',
    country: 'Australia',
    flag: 'au',
    visaType: 'Subclass 189 Skilled Independent PR',
    consultant: 'Sneha Joshi (MARA Registered)',
    duration: '6 Months',
    review: 'Every step was logged with escrow protection and clear fee breakdowns. Received our direct Australian Permanent Residency grant!',
    rating: 5,
    verifiedDate: 'Approved June 2026'
  }
];

function AnimatedCounter({ end, duration = 1.8, suffix = '', prefix = '' }: { end: number; duration?: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration]);

  return (
    <span>{prefix}{count.toLocaleString()}{suffix}</span>
  );
}

export function AboveTheFoldSocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % successStories.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const current = successStories[currentIndex];

  return (
    <section className="relative w-full overflow-hidden rounded-3xl my-6">
      {/* Premium Obsidian Dark Hybrid Container with subtle Emerald Glow */}
      <div className="relative bg-gradient-to-br from-[#0B0F17] via-[#0E1422] to-[#07090E] border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl text-white overflow-hidden">
        
        {/* Ambient background light gradients */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-teal-500/15 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-emerald-500/15 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,245,160,0.03),transparent_70%)] pointer-events-none" />

        {/* ── TOP SECTION: LIVE METRICS & VERIFIED REVIEW SKELETON WIDGETS ── */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 pb-8 border-b border-white/10">
          
          {/* Metric 1: Verified Consultants */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-teal-500/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-teal-400" /> Verified Network
              </span>
              <span className="flex items-center gap-1 text-[10px] font-medium text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded-full border border-teal-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 radar-live-dot" /> 150+ Countries
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-semibold text-white tracking-tight flex items-baseline gap-1 font-sans">
              <AnimatedCounter end={2450} suffix="+" />
            </div>
            <p className="text-xs text-slate-400 font-normal mt-1">
              Active licensed lawyers & verified RCIC/OISC consultants
            </p>
          </motion.div>

          {/* Metric 2: Total Visas Facilitated */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Visas Facilitated
              </span>
              <span className="text-[10px] font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/20">
                99.4% Approval Track
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-semibold text-white tracking-tight flex items-baseline gap-1 font-sans">
              <AnimatedCounter end={48200} suffix="+" />
            </div>
            <p className="text-xs text-slate-400 font-normal mt-1">
              Study permits, work visas, permanent residencies & appeals
            </p>
          </motion.div>

          {/* Metric 3: Live TrustScore & Review Widgets */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-amber-400/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Live TrustScore
              </span>
              <span className="text-[10px] font-medium text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/20">
                12,800+ Reviews
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-2xl sm:text-3xl font-semibold text-white tracking-tight font-sans">
                4.9 <span className="text-base text-slate-400 font-normal">/ 5.0</span>
              </div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
            </div>

            {/* Review Widgets Badges: Trustpilot & Google Reviews skeletons */}
            <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center gap-3">
              {/* Trustpilot Skeleton Badge */}
              <div className="flex items-center gap-1.5 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/10 text-[10px] text-slate-300">
                <span className="text-[#00b67a] font-semibold flex items-center gap-1">
                  ★ Trustpilot
                </span>
                <span className="text-slate-400">4.9 • Excellent</span>
              </div>

              {/* Google Reviews Skeleton Badge */}
              <div className="flex items-center gap-1.5 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/10 text-[10px] text-slate-300">
                <span className="text-[#4285f4] font-semibold">Google</span>
                <span className="text-slate-400">4.9 ★★★★★</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── MIDDLE SECTION: REAL CLIENT SUCCESS STORIES CAROUSEL ── */}
        <div 
          className="relative z-10 pt-8"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 text-teal-300" /> Real Verified Client Outcomes
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white font-sans tracking-tight">
                Empowering Global Journeys with Absolute Clarity
              </h2>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setCurrentIndex(prev => (prev - 1 + successStories.length) % successStories.length)}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all active:scale-95 cursor-pointer"
                aria-label="Previous story"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentIndex(prev => (prev + 1) % successStories.length)}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all active:scale-95 cursor-pointer"
                aria-label="Next story"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Carousel Slide Card */}
          <div className="relative min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-white/[0.05] via-white/[0.03] to-transparent border border-white/10 backdrop-blur-md shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                {/* Left Client Profile Info (4 cols) */}
                <div className="lg:col-span-4 flex items-center gap-4 border-b lg:border-b-0 lg:border-r border-white/10 pb-4 lg:pb-0 lg:pr-6">
                  <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-2 border-teal-400/40 shadow-lg shrink-0">
                    <img
                      src={current.avatar}
                      alt={current.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-teal-400 border-2 border-[#0B0F17] flex items-center justify-center text-[8px] text-black font-bold">
                      ✓
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-semibold text-white truncate font-sans">{current.name}</h4>
                      <img
                        src={`https://flagcdn.com/w40/${current.flag}.png`}
                        alt={current.country}
                        className="w-4 h-3 rounded-xs object-cover shrink-0"
                      />
                    </div>
                    <p className="text-xs font-medium text-teal-300 mt-0.5">{current.visaType}</p>
                    <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400">
                      <span className="bg-white/5 px-2 py-0.5 rounded-md border border-white/10">{current.duration}</span>
                      <span>{current.verifiedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Right Quote & Consultant Details (8 cols) */}
                <div className="lg:col-span-8 flex flex-col justify-between space-y-3">
                  <div className="relative">
                    <Quote className="w-7 h-7 text-teal-500/20 absolute -top-3 -left-3 pointer-events-none" />
                    <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed italic pl-3">
                      "{current.review}"
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Case Handled By: <strong className="text-white font-medium">{current.consultant}</strong></span>
                    </div>

                    <a
                      href="/find-experts"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-teal-400 hover:text-teal-300 hover:underline transition-colors"
                    >
                      Find Similar Expert <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {successStories.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx ? 'w-8 bg-teal-400 shadow-[0_0_10px_rgba(0,245,160,0.5)]' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
