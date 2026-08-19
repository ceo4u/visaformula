'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  MapPin,
  IndianRupee,
  Calendar,
  Smile,
  ChevronDown,
  ChevronUp,
  Car,
  Hotel,
  UtensilsCrossed,
  Compass,
  ShieldAlert,
  Wand2,
  Tag,
  User,
  Headphones,
  Home as HomeIcon,
  Briefcase,
  Search,
  UserCircle2,
  Check,
  Sun,
  Sunset,
  CloudSun,
  GraduationCap,
  Users,
  Scale,
  Luggage,
  ShieldCheck,
  Globe2,
  FileCheck2,
  Lock,
  Download,
  FileText
} from 'lucide-react';

// Pill data for hero category quick-filters
const categoryPills = [
  { id: 'cheap', emoji: '✈️', label: 'Cheap Trip' },
  { id: 'romantic', emoji: '❤️', label: 'Romantic' },
  { id: 'family', emoji: '👨‍👩‍👧', label: 'Family' },
  { id: 'adventure', emoji: '🏔️', label: 'Adventure' },
  { id: 'beach', emoji: '🏖️', label: 'Beach' },
  { id: 'food', emoji: '🍜', label: 'Food' },
  { id: 'relaxation', emoji: '🧘', label: 'Relaxation' },
  { id: 'under10k', emoji: '💰', label: 'Under ₹10,000' },
  { id: 'international', emoji: '🌏', label: 'International' },
];

// Curated iPhone-styled dropdown options
const durationOptions = [
  { value: '2 Days', label: '2 Days', desc: 'Weekend Getaway', icon: '⚡' },
  { value: '3 Days', label: '3 Days', desc: 'Short Break', icon: '🌤️' },
  { value: '4 Days', label: '4 Days', desc: 'Mini Vacation', icon: '🌴' },
  { value: '5 Days', label: '5 Days', desc: 'Popular Choice', icon: '⭐' },
  { value: '6 Days', label: '6 Days', desc: 'Explorer', icon: '🗺️' },
  { value: '7 Days', label: '7 Days', desc: '1 Week Holiday', icon: '🏖️' },
  { value: '10 Days', label: '10 Days', desc: 'Extended Trip', icon: '✈️' },
  { value: '14 Days', label: '14 Days', desc: '2 Weeks Grand Tour', icon: '🌏' },
];

const vibeOptions = [
  { value: 'Beach', label: 'Beach & Coastal', desc: 'Sun, sand & waves', icon: '🏖️' },
  { value: 'Romantic', label: 'Romantic & Honeymoon', desc: 'Candlelight & sunsets', icon: '❤️' },
  { value: 'Adventure', label: 'Adventure & Trekking', desc: 'Thrills & hikes', icon: '🏔️' },
  { value: 'Family', label: 'Family Friendly', desc: 'Fun for all ages', icon: '👨‍👩‍👧' },
  { value: 'Relaxation', label: 'Relaxation & Spa', desc: 'Peace & wellness', icon: '🧘' },
  { value: 'Food & Culture', label: 'Food & Heritage', desc: 'Local flavors & sights', icon: '🍜' },
  { value: 'Nightlife', label: 'Nightlife & Party', desc: 'Clubs & evening energy', icon: '🎉' },
  { value: 'Wildlife', label: 'Nature & Safari', desc: 'Wild animals & green', icon: '🌿' },
  { value: 'Budget Friendly', label: 'Budget Explorer', desc: 'Max fun, min spend', icon: '💰' },
  { value: 'Luxury', label: 'Luxury & VIP', desc: '5-star indulgence', icon: '👑' },
];

// Search Filter Custom Dropdown Options
const courseLevelOptions = [
  { value: 'bachelors', label: "Bachelor's Degree", icon: '🎓', desc: 'Undergraduate Degree' },
  { value: 'masters', label: "Master's / PG", icon: '📜', desc: 'Postgraduate & MBA' },
  { value: 'diploma', label: 'Diploma / Certificate', icon: '📋', desc: 'Vocational & Short Term' },
  { value: 'phd', label: 'PhD / Doctorate', icon: '🔬', desc: 'Doctoral Research' },
  { value: 'language', label: 'Language Program', icon: '🗣️', desc: 'IELTS / ESL / Pathway' },
];

const countryOptions = [
  { value: 'Canada', label: 'Canada', icon: '🇨🇦', desc: 'Top for PR & Study' },
  { value: 'USA', label: 'United States', icon: '🇺🇸', desc: 'World Top Universities' },
  { value: 'UK', label: 'United Kingdom', icon: '🇬🇧', desc: 'Fast-track Degrees' },
  { value: 'Australia', label: 'Australia', icon: '🇦🇺', desc: 'Post-study Work Visas' },
  { value: 'Germany', label: 'Germany', icon: '🇩🇪', desc: 'Tuition-free Education' },
  { value: 'Ireland', label: 'Ireland', icon: '🇮🇪', desc: 'European Tech Hub' },
  { value: 'New Zealand', label: 'New Zealand', icon: '🇳🇿', desc: 'Safe & Scenic Living' },
  { value: 'UAE', label: 'UAE / Dubai', icon: '🇦🇪', desc: 'Tax-free & Fast Processing' },
];

const locationOptions = [
  { value: 'delhi', label: 'Delhi NCR', icon: '📍', desc: 'Capital Region' },
  { value: 'mumbai', label: 'Mumbai', icon: '📍', desc: 'Maharashtra' },
  { value: 'bengaluru', label: 'Bengaluru', icon: '📍', desc: 'Karnataka' },
  { value: 'punjab', label: 'Punjab / Chandigarh', icon: '📍', desc: 'North Hub' },
  { value: 'hyderabad', label: 'Hyderabad', icon: '📍', desc: 'Telangana' },
  { value: 'gujarat', label: 'Gujarat', icon: '📍', desc: 'Ahmedabad & Surat' },
  { value: 'remote', label: 'Online / Pan India', icon: '🌐', desc: 'Virtual Consultation' },
];

const visaCategoryOptions = [
  { value: 'student', label: 'Student Visa', icon: '🎓', desc: 'Study Abroad & Intake' },
  { value: 'work', label: 'Work & Job Visa', icon: '💼', desc: 'Permits & Sponsorship' },
  { value: 'pr', label: 'PR & Permanent Residency', icon: '🛡️', desc: 'Express Entry & PNP' },
  { value: 'tourist', label: 'Tourist & Visitor', icon: '✈️', desc: 'Holiday & Family Visit' },
  { value: 'business', label: 'Business & Investor', icon: '🏢', desc: 'Startup & Investment' },
  { value: 'family', label: 'Spouse & Dependent', icon: '👨‍👩‍👧', desc: 'Family Reunification' },
];

const experienceLevelOptions = [
  { value: 'entry', label: 'Entry Level (0-2 yrs)', icon: '🌱', desc: 'Graduate & Fresher' },
  { value: 'mid', label: 'Mid Level (2-5 yrs)', icon: '⚡', desc: 'Intermediate Specialist' },
  { value: 'senior', label: 'Senior Level (5-8 yrs)', icon: '💼', desc: 'Lead / Expert' },
  { value: 'executive', label: 'Executive (8+ yrs)', icon: '👑', desc: 'Manager & Director' },
];

const lawyerSpecializationOptions = [
  { value: 'appeals', label: 'Visa Refusals & Appeals', icon: '⚖️', desc: 'Deportation & Refusal Overturn' },
  { value: 'judicial', label: 'Judicial Review / Federal Court', icon: '🏛️', desc: 'High Court Petitions' },
  { value: 'corporate', label: 'Corporate & Business Immigration', icon: '🏢', desc: 'LMIA, Sponsorship & Intra-Company' },
  { value: 'deportation', label: 'Deportation Defense & Stay Orders', icon: '🛡️', desc: 'Emergency Protection' },
  { value: 'citizenship', label: 'Citizenship & Complex Filings', icon: '📜', desc: 'Status Inadmissibility' },
];

// Modifiers config with state mutators
const modifiers = [
  { id: 'cheaper', icon: '💡', label: 'Make it cheaper' },
  { id: 'luxurious', icon: '👑', label: 'Make it luxurious' },
  { id: 'children', icon: '👶', label: 'Add Children' },
  { id: 'veg', icon: '🥗', label: 'Find Vegetarian Options' },
  { id: 'late_start', icon: '⏰', label: "Don't wake up early" },
];

// Popular destinations with high-res circular country flag images
const popularDestinations = [
  { name: 'Canada', flagImg: 'https://flagcdn.com/w160/ca.png', code: 'CA' },
  { name: 'UK', flagImg: 'https://flagcdn.com/w160/gb.png', code: 'GB' },
  { name: 'USA', flagImg: 'https://flagcdn.com/w160/us.png', code: 'US' },
  { name: 'Australia', flagImg: 'https://flagcdn.com/w160/au.png', code: 'AU' },
  { name: 'Germany', flagImg: 'https://flagcdn.com/w160/de.png', code: 'DE' },
  { name: 'New Zealand', flagImg: 'https://flagcdn.com/w160/nz.png', code: 'NZ' },
  { name: 'UAE', flagImg: 'https://flagcdn.com/w160/ae.png', code: 'AE' },
  { name: 'More', flagImg: '', isMore: true, code: 'ALL' },
];

interface BudgetItem {
  category: string;
  amount: number;
  pct: number;
  color: string;
  icon: any;
}

export function AITripPlannerLanding() {
  // Input search state
  const [searchPrompt, setSearchPrompt] = useState('');
  const [selectedPill, setSelectedPill] = useState<string>('');

  // Interactive Form State (No dummy data initially)
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [vibe, setVibe] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Global Multi-Tab Search Widget State
  const [activeSearchTab, setActiveSearchTab] = useState<'universities' | 'consultants' | 'relocation' | 'jobs' | 'lawyers'>('universities');
  const [courseLevel, setCourseLevel] = useState('');
  const [searchCountry, setSearchCountry] = useState('');
  const [consultantName, setConsultantName] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [visaCategory, setVisaCategory] = useState('');
  const [consultantType, setConsultantType] = useState<'all' | 'freelancer' | 'agency'>('all');
  const [consultantMode, setConsultantMode] = useState<'all' | 'online' | 'offline'>('all');

  // Relocation Tab State
  const [serviceKeyword, setServiceKeyword] = useState('');
  const [serviceCategory, setServiceCategory] = useState<'all' | 'accommodation' | 'sim' | 'jobs' | 'business' | 'appeals'>('all');

  // Jobs Tab State
  const [jobKeyword, setJobKeyword] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [jobType, setJobType] = useState<'all' | 'fulltime' | 'remote' | 'internship' | 'contract'>('all');

  // Lawyers Tab State
  const [lawyerSpecialization, setLawyerSpecialization] = useState('');
  const [lawyerPracticeArea, setLawyerPracticeArea] = useState<'all' | 'appeals' | 'deportation' | 'judicial' | 'corporate'>('all');

  // Search filter custom dropdowns open state
  const [isCourseLevelOpen, setIsCourseLevelOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isVisaCategoryOpen, setIsVisaCategoryOpen] = useState(false);
  const [isExperienceLevelOpen, setIsExperienceLevelOpen] = useState(false);
  const [isLawyerSpecOpen, setIsLawyerSpecOpen] = useState(false);

  const courseLevelRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const visaCategoryRef = useRef<HTMLDivElement>(null);
  const experienceLevelRef = useRef<HTMLDivElement>(null);
  const lawyerSpecRef = useRef<HTMLDivElement>(null);

  // Active modifier pills
  const [activeModifiers, setActiveModifiers] = useState<string[]>([]);

  // Itinerary accordion expanded day (1 - 5)
  const [expandedDay, setExpandedDay] = useState<number>(1);

  // Budget Breakdown dynamic data
  const [budgetTotal, setBudgetTotal] = useState<number>(0);
  const [budgetBreakdown, setBudgetBreakdown] = useState<BudgetItem[]>([]);

  // Itinerary days list (AI generated)
  const [itineraryDays, setItineraryDays] = useState<Array<{
    dayNumber: number;
    title: string;
    summary?: string;
    image: string;
    morning: string;
    afternoon: string;
    evening: string;
  }>>([]);

  // Custom Dropdown Open States & Refs
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const [isVibeOpen, setIsVibeOpen] = useState(false);
  const durationRef = useRef<HTMLDivElement>(null);
  const vibeRef = useRef<HTMLDivElement>(null);

  // Close custom dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (durationRef.current && !durationRef.current.contains(target)) setIsDurationOpen(false);
      if (vibeRef.current && !vibeRef.current.contains(target)) setIsVibeOpen(false);
      if (courseLevelRef.current && !courseLevelRef.current.contains(target)) setIsCourseLevelOpen(false);
      if (countryRef.current && !countryRef.current.contains(target)) setIsCountryOpen(false);
      if (locationRef.current && !locationRef.current.contains(target)) setIsLocationOpen(false);
      if (visaCategoryRef.current && !visaCategoryRef.current.contains(target)) setIsVisaCategoryOpen(false);
      if (experienceLevelRef.current && !experienceLevelRef.current.contains(target)) setIsExperienceLevelOpen(false);
      if (lawyerSpecRef.current && !lawyerSpecRef.current.contains(target)) setIsLawyerSpecOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGlobalSearch = () => {
    const params = new URLSearchParams();
    if (searchCountry) params.set('country', searchCountry);
    if (searchLocation) params.set('location', searchLocation);

    if (activeSearchTab === 'universities') {
      if (courseLevel) params.set('level', courseLevel);
      const queryStr = params.toString() ? `?${params.toString()}` : '';
      window.location.href = `/universities${queryStr}`;
    } else if (activeSearchTab === 'consultants') {
      if (consultantName.trim()) params.set('q', consultantName.trim());
      if (!consultantName.trim() && visaCategory) params.set('category', visaCategory);
      if (consultantType !== 'all') params.set('type', consultantType);
      if (consultantMode !== 'all') params.set('mode', consultantMode);
      const queryStr = params.toString() ? `?${params.toString()}` : '';
      window.location.href = `/find-experts${queryStr}`;
    } else if (activeSearchTab === 'relocation') {
      if (serviceKeyword.trim()) params.set('q', serviceKeyword.trim());
      if (serviceCategory !== 'all') params.set('category', serviceCategory);
      const queryStr = params.toString() ? `?${params.toString()}` : '';
      window.location.href = `/classifieds${queryStr}`;
    } else if (activeSearchTab === 'jobs') {
      if (jobKeyword.trim()) params.set('q', jobKeyword.trim());
      if (experienceLevel) params.set('exp', experienceLevel);
      if (jobType !== 'all') params.set('type', jobType);
      const queryStr = params.toString() ? `?${params.toString()}` : '';
      window.location.href = `/jobs${queryStr}`;
    } else if (activeSearchTab === 'lawyers') {
      if (lawyerSpecialization) params.set('specialization', lawyerSpecialization);
      if (lawyerPracticeArea !== 'all') params.set('practice', lawyerPracticeArea);
      const queryStr = params.toString() ? `?${params.toString()}` : '';
      window.location.href = `/emergency${queryStr}`;
    }
  };

  // Map category icon
  const getCategoryIcon = (catName: string) => {
    switch (catName?.toLowerCase()) {
      case 'transport': return Car;
      case 'hotel': return Hotel;
      case 'food': return UtensilsCrossed;
      case 'activities': return Compass;
      case 'reserve': return ShieldAlert;
      default: return Tag;
    }
  };

  // Dynamic AI Generation Loading Step State
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [loadingProgress, setLoadingProgress] = useState<number>(15);

  const loadingSteps = [
    { icon: '🌐', title: 'Connecting to Travel Intelligence Hub...', desc: 'Analyzing destination vibes & best spots' },
    { icon: '🗺️', title: 'Structuring Daily Route & Attractions...', desc: 'Optimizing morning, afternoon & evening plans' },
    { icon: '💰', title: 'Calculating Dynamic Budget Allocations...', desc: 'Balancing Transport, Hotels, Food & Activities' },
    { icon: '✨', title: 'Finalizing Your AI Pathway...', desc: 'Generating instant booking & itinerary cards' }
  ];

  // Trigger Gemini API trip plan generation
  const fetchAITrip = async (payload: {
    destination?: string;
    budget?: number;
    duration?: number;
    vibe?: string;
    modifiers?: string[];
  }) => {
    setIsGenerating(true);
    setLoadingStep(0);
    setLoadingProgress(15);

    // Scroll to loading card
    setTimeout(() => {
      const loadingEl = document.getElementById('trip-generator-status');
      if (loadingEl) {
        loadingEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);

    // Step progress interval
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < 3) return prev + 1;
        return prev;
      });
      setLoadingProgress((prev) => {
        if (prev < 85) return prev + 25;
        return 95;
      });
    }, 450);

    try {
      const response = await fetch('/api/generate-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data && data.success && data.plan) {
        const plan = data.plan;
        setBudgetTotal(plan.totalBudget || (payload.budget || 30000));
        
        if (plan.budgetBreakdown && Array.isArray(plan.budgetBreakdown)) {
          const formattedBreakdown: BudgetItem[] = plan.budgetBreakdown.map((b: any) => ({
            category: b.category,
            amount: b.amount,
            pct: b.pct,
            color: b.color || '#00A86B',
            icon: getCategoryIcon(b.category)
          }));
          setBudgetBreakdown(formattedBreakdown);
        }

        if (plan.days && Array.isArray(plan.days)) {
          setItineraryDays(plan.days.map((d: any) => ({
            dayNumber: d.dayNumber,
            title: d.title,
            summary: d.summary || (d.morning ? d.morning.substring(0, 45) + '...' : ''),
            image: d.image || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80',
            morning: d.morning || '',
            afternoon: d.afternoon || '',
            evening: d.evening || '',
          })));
          setExpandedDay(1);
        }

        setLoadingProgress(100);
        setHasGenerated(true);

        setTimeout(() => {
          const dashboardElement = document.getElementById('trip-dashboard');
          if (dashboardElement) {
            dashboardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      }
    } catch (err) {
      console.error('Failed to generate AI trip:', err);
    } finally {
      clearInterval(stepInterval);
      setIsGenerating(false);
    }
  };

  const handleGenerateTrip = () => {
    const rawBudget = parseInt(budget.replace(/[^0-9]/g, ''), 10) || 30000;
    const rawDuration = parseInt(duration.replace(/[^0-9]/g, ''), 10) || 5;
    const dest = destination || 'Goa';
    const chosenVibe = vibe || 'Beach';
    
    if (!destination) setDestination(dest);
    if (!budget) setBudget(rawBudget.toLocaleString('en-IN'));
    if (!duration) setDuration(`${rawDuration} Days`);
    if (!vibe) setVibe(chosenVibe);

    fetchAITrip({
      destination: dest,
      budget: rawBudget,
      duration: rawDuration,
      vibe: chosenVibe,
      modifiers: activeModifiers
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchPrompt.trim()) return;
    const destMatch = searchPrompt.match(/(?:in|to)\s+([A-Za-z]+)/i);
    const dest = destMatch ? destMatch[1] : (destination || 'Goa');
    const budgMatch = searchPrompt.match(/(?:₹|rs\.?|inr)?\s*([0-9,]+)/i);
    const budg = budgMatch ? parseInt(budgMatch[1].replace(/,/g, ''), 10) : 30000;
    const durMatch = searchPrompt.match(/([0-9]+)\s*(?:days|day)/i);
    const dur = durMatch ? parseInt(durMatch[1], 10) : 5;

    setDestination(dest);
    setBudget(budg.toLocaleString('en-IN'));
    setDuration(`${dur} Days`);

    fetchAITrip({
      destination: dest,
      budget: budg,
      duration: dur,
      vibe: vibe || 'Beach',
      modifiers: activeModifiers
    });
  };

  const handlePillClick = (pillId: string, label: string) => {
    setSelectedPill(pillId);
    let newDest = destination || 'Goa';
    let newVibe = vibe || 'Beach';
    let newBudget = budget || '30,000';

    if (pillId === 'cheap' || pillId === 'under10k') {
      newBudget = '10,000';
      newVibe = 'Budget Friendly';
    } else if (pillId === 'romantic') {
      newVibe = 'Romantic';
      newDest = 'Udaipur';
    } else if (pillId === 'family') {
      newVibe = 'Family';
      newDest = 'Kerala';
    } else if (pillId === 'adventure') {
      newVibe = 'Adventure';
      newDest = 'Manali';
    } else if (pillId === 'beach') {
      newVibe = 'Beach';
      newDest = 'Goa';
    } else if (pillId === 'international') {
      newVibe = 'International';
      newDest = 'Dubai';
      newBudget = '65,000';
    }

    setDestination(newDest);
    setVibe(newVibe);
    setBudget(newBudget);
    setDuration('5 Days');
    setSearchPrompt(`5 days in ${newDest} with ${label.toLowerCase()}`);

    const rawBudg = parseInt(newBudget.replace(/[^0-9]/g, ''), 10) || 30000;
    fetchAITrip({
      destination: newDest,
      budget: rawBudg,
      duration: 5,
      vibe: newVibe,
      modifiers: activeModifiers
    });
  };

  const toggleModifier = (modId: string) => {
    let nextMods: string[];
    if (activeModifiers.includes(modId)) {
      nextMods = activeModifiers.filter(m => m !== modId);
    } else {
      nextMods = [...activeModifiers, modId];
    }
    setActiveModifiers(nextMods);

    const rawBudget = parseInt(budget.replace(/[^0-9]/g, ''), 10) || 30000;
    const rawDuration = parseInt(duration.replace(/[^0-9]/g, ''), 10) || 5;

    fetchAITrip({
      destination: destination || 'Goa',
      budget: rawBudget,
      duration: rawDuration,
      vibe: vibe || 'Beach',
      modifiers: nextMods
    });
  };

  // Donut chart math
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let accumulatedOffset = 0;

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 pb-20">

      {/* ── 1. HERO SECTION (ULTRA-LIGHT CLEAN AIRY BACKGROUND) ── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50/60 via-white to-white pt-8 pb-10 px-4 sm:px-6 lg:px-8">
        
        {/* Soft Ultra-Light Background Glows */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
          <div className="absolute top-2 left-10 w-72 h-72 bg-purple-100/10 rounded-full blur-3xl" />
          <div className="absolute top-16 right-0 w-80 h-80 bg-emerald-50/20 rounded-full blur-3xl" />
          <div className="absolute bottom-4 left-1/3 w-96 h-96 bg-slate-50/40 rounded-full blur-3xl" />
          
          {/* Subtle Decorative Tropical Leaves & Plane SVG Path */}
          <div className="hidden lg:block absolute left-2 top-24 opacity-25">
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <path d="M10 80 Q 40 10 90 20 Q 70 80 10 80 Z" fill="#00A86B" opacity="0.4" />
            </svg>
          </div>
          <div className="hidden lg:block absolute right-40 top-12 opacity-35">
            <svg width="220" height="90" viewBox="0 0 220 90" fill="none">
              <path d="M10 70 C 60 10, 140 10, 200 40" stroke="#A855F7" strokeWidth="2" strokeDasharray="6 6" fill="none" />
              <polygon points="200,40 215,35 208,48" fill="#A855F7" />
            </svg>
          </div>
        </div>

        {/* Hero Content Container */}
        <div className="max-w-6xl mx-auto relative z-10 text-center">

          {/* Centered Hero Info */}
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              <span className="text-[#30005a] block">Where do you</span>
              <span className="text-[#00A86B] block mt-1">want to go?</span>
            </h1>
            
            <p className="mt-3 text-slate-600 text-sm sm:text-base font-medium max-w-lg mx-auto">
              Tell TravlTik your budget, time &amp; vibe. We&apos;ll craft the perfect trip pathway for you.
            </p>

            {/* FLOATING PROMPT INPUT */}
            <div className="w-full max-w-3xl mt-7 mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center bg-white border border-purple-200/90 rounded-full pl-6 pr-2.5 py-2.5 shadow-[0_10px_35px_rgb(91,44,111,0.08)] hover:shadow-[0_12px_40px_rgb(91,44,111,0.14)] transition-all">
                <span className="text-purple-600 mr-3 text-xl shrink-0">✨</span>
                <input 
                  type="text" 
                  value={searchPrompt}
                  onChange={(e) => setSearchPrompt(e.target.value)}
                  placeholder="5 days in Goa under ₹30,000 with beaches" 
                  className="w-full bg-transparent border-none text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-0 text-sm sm:text-base md:text-lg font-medium"
                />
                <button 
                  type="submit"
                  disabled={isGenerating}
                  className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#00A86B] hover:bg-[#008f5a] text-white flex items-center justify-center shadow-md hover:shadow-lg transition-transform active:scale-95 shrink-0 cursor-pointer disabled:opacity-70"
                >
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </form>
            </div>
          </div>

          {/* QUICK PILLS (STRICT 1-ROW FLEX CONTAINER WITH INCREASED SIZE) */}
          <div className="mt-8 flex flex-nowrap items-center justify-start sm:justify-center gap-2.5 sm:gap-3 max-w-6xl mx-auto w-full overflow-x-auto no-scrollbar pb-1">
            {categoryPills.map((pill) => {
              const isSelected = selectedPill === pill.id;
              return (
                <button 
                  key={pill.id} 
                  type="button"
                  onClick={() => handlePillClick(pill.id, pill.label)}
                  className={`flex flex-col items-center justify-center bg-white border rounded-2xl px-3 py-2.5 shadow-2xs hover:shadow-md transition-all shrink-0 w-[84px] sm:w-[94px] h-[72px] cursor-pointer select-none ${
                    isSelected ? 'border-[#00A86B] ring-2 ring-[#00A86B]/20 bg-emerald-50/40' : 'border-slate-200/80 hover:border-[#00A86B]'
                  }`}
                >
                  <span className="text-xl sm:text-2xl leading-none">{pill.emoji}</span>
                  <span className={`text-[11px] sm:text-xs font-bold mt-1.5 whitespace-nowrap leading-tight ${isSelected ? 'text-[#00A86B]' : 'text-slate-700'}`}>
                    {pill.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* WEEKEND BADGE */}
          <div className="mt-5 text-center">
            <button 
              type="button"
              onClick={() => {
                setDuration('2 Days');
                setBudget('15,000');
                setVibe('Relaxation');
                fetchAITrip({ destination: destination || 'Goa', budget: 15000, duration: 2, vibe: 'Relaxation' });
              }}
              className="inline-flex items-center gap-2 bg-white border border-teal-500/40 hover:border-[#00A86B] text-slate-700 px-6 py-2.5 rounded-full shadow-2xs text-xs sm:text-sm font-bold transition-all cursor-pointer hover:shadow-xs"
            >
              <span className="text-sm">📅</span> What can I do this <span className="text-[#00A86B] font-extrabold">weekend?</span>
            </button>
          </div>

          {/* ── PLAN YOUR TRIP FORM CARD (MATCHING SEARCH BOX MAX-W-6XL) ── */}
          <div className="relative z-30 w-full max-w-6xl mx-auto mt-8 bg-white border border-slate-200/90 rounded-[30px] p-6 sm:p-7 md:p-8 shadow-[0_14px_45px_rgba(0,0,0,0.06)] text-left">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-[#30005a] font-black text-base sm:text-lg">
                <span className="text-purple-600 text-sm">✨</span>
                <span>Plan Your Trip</span>
              </div>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100 flex items-center gap-1.5">
                <span>AI Magic</span>
                <span>✨</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 items-center">
              {/* Location Input */}
              <div className="bg-slate-50/80 hover:bg-slate-50 border border-slate-200/80 rounded-2xl h-[52px] px-4 flex items-center gap-3 transition-colors">
                <span className="text-sm">📍</span>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block">Location</span>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Where to? (e.g. Goa)"
                    className="w-full bg-transparent text-sm font-bold text-slate-800 outline-none border-none p-0 placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Total Budget Input */}
              <div className="bg-slate-50/80 hover:bg-slate-50 border border-slate-200/80 rounded-2xl h-[52px] px-4 flex items-center gap-3 transition-colors">
                <span className="text-sm font-extrabold text-slate-700">₹</span>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block">Total Budget (₹)</span>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. 30,000"
                    className="w-full bg-transparent text-sm font-bold text-slate-800 outline-none border-none p-0 placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Duration Custom Dropdown */}
              <div
                ref={durationRef}
                className="relative bg-slate-50/80 hover:bg-slate-50 border border-slate-200/80 rounded-2xl h-[52px] px-4 flex items-center gap-3 transition-colors cursor-pointer select-none"
                onClick={() => {
                  setIsDurationOpen(!isDurationOpen);
                  setIsVibeOpen(false);
                }}
              >
                <span className="text-sm">📅</span>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block">Duration (Days)</span>
                  <div className={`text-sm font-bold truncate ${duration ? 'text-slate-800' : 'text-slate-400'}`}>
                    {duration || 'Duration'}
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isDurationOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                {isDurationOpen && (
                  <div
                    className="absolute bottom-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[230px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Select Trip Length
                    </div>
                    <div className="space-y-0.5">
                      {durationOptions.map((opt) => {
                        const isSelected = duration === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              setDuration(opt.value);
                              setIsDurationOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                              isSelected ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-base">{opt.icon}</span>
                              <span className="truncate">{opt.label}</span>
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#00A86B] shrink-0 ml-1" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Vibe Custom Dropdown */}
              <div
                ref={vibeRef}
                className="relative bg-slate-50/80 hover:bg-slate-50 border border-slate-200/80 rounded-2xl h-[52px] px-4 flex items-center gap-3 transition-colors cursor-pointer select-none"
                onClick={() => {
                  setIsVibeOpen(!isVibeOpen);
                  setIsDurationOpen(false);
                }}
              >
                <span className="text-sm">😊</span>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block">Vibe</span>
                  <div className={`text-sm font-bold truncate ${vibe ? 'text-slate-800' : 'text-slate-400'}`}>
                    {vibe || 'Vibe'}
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isVibeOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                {isVibeOpen && (
                  <div
                    className="absolute bottom-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[230px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Choose Your Vibe
                    </div>
                    <div className="space-y-0.5">
                      {vibeOptions.map((opt) => {
                        const isSelected = vibe === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              setVibe(opt.value);
                              setIsVibeOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                              isSelected ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-base">{opt.icon}</span>
                              <span className="truncate">{opt.label}</span>
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#00A86B] shrink-0 ml-1" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Generate Button */}
              <button
                type="button"
                onClick={handleGenerateTrip}
                disabled={isGenerating}
                className="w-full sm:col-span-2 lg:col-span-1 h-[52px] px-5 rounded-2xl bg-[#00A86B] hover:bg-[#008f5a] text-white font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center whitespace-nowrap cursor-pointer disabled:opacity-75"
              >
                <span>{isGenerating ? 'Crafting Trip...' : 'Generate My Trip'}</span>
              </button>
            </div>
          </div>

          {/* ── AI LOADING STATE (ATTRACTIVE ANIMATED GENERATION HUD) ── */}
          {isGenerating && (
            <div id="trip-generator-status" className="w-full max-w-6xl mx-auto my-8 bg-gradient-to-b from-white to-emerald-50/30 border border-emerald-200/80 rounded-2xl sm:rounded-[32px] p-6 sm:p-9 text-left shadow-[0_20px_60px_rgba(0,168,107,0.08)] backdrop-blur-md relative overflow-hidden">
              {/* Subtle Animated Top Border Glow */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-[#00A86B] to-teal-500 animate-pulse" />

              {/* Header Badge */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/25 shrink-0 animate-spin" style={{ animationDuration: '6s' }}>
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black tracking-wider uppercase text-[#00A86B] bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                        AI Trip Architect
                      </span>
                      <span className="text-xs font-semibold text-slate-400">Live Synthesis</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
                      Crafting Custom Pathway for <span className="text-[#00A86B]">{destination || 'Your Destination'}</span>
                    </h3>
                  </div>
                </div>

                {/* Destination & Meta Tags */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
                    📅 {duration || '5 Days'}
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
                    💰 ₹{budget || '30,000'}
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#00A86B] shadow-2xs">
                    ✨ {vibe || 'Beach & Leisure'}
                  </span>
                </div>
              </div>

              {/* Dynamic Live Progress Bar */}
              <div className="mt-6 mb-7">
                <div className="flex items-center justify-between text-xs font-extrabold text-slate-700 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{loadingSteps[loadingStep]?.icon}</span>
                    <span className="text-slate-900">{loadingSteps[loadingStep]?.title}</span>
                  </div>
                  <span className="text-[#00A86B] font-black">{loadingProgress}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/80">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-[#00A86B] rounded-full transition-all duration-300 shadow-sm"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1.5 pl-6 font-medium">
                  {loadingSteps[loadingStep]?.desc}
                </p>
              </div>

              {/* 4 Multi-Step Visual Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                {loadingSteps.map((step, idx) => {
                  const isDone = idx < loadingStep;
                  const isCurrent = idx === loadingStep;
                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'bg-white border-[#00A86B] shadow-md shadow-emerald-500/10 ring-2 ring-emerald-500/20'
                          : isDone
                          ? 'bg-emerald-50/60 border-emerald-200 text-emerald-800'
                          : 'bg-slate-50/60 border-slate-200/60 text-slate-400 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-lg">{step.icon}</span>
                        {isDone ? (
                          <div className="w-4 h-4 rounded-full bg-[#00A86B] text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        ) : isCurrent ? (
                          <div className="w-3 h-3 rounded-full bg-[#00A86B] animate-ping" />
                        ) : (
                          <span className="text-[10px] font-bold text-slate-300">0{idx + 1}</span>
                        )}
                      </div>
                      <div className="text-xs font-bold truncate text-slate-800">
                        {step.title.split('...')[0]}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Shimmer Skeleton Preview Cards */}
              <div className="mt-7 pt-6 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-5 opacity-70 animate-pulse pointer-events-none">
                <div className="lg:col-span-5 bg-white/80 border border-slate-200 rounded-2xl p-5 h-44 flex items-center justify-center gap-4">
                  <div className="w-24 h-24 rounded-full border-8 border-slate-200 border-t-emerald-400 animate-spin" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3.5 bg-slate-200 rounded-md w-3/4" />
                    <div className="h-3 bg-slate-100 rounded-md w-1/2" />
                    <div className="h-3 bg-slate-100 rounded-md w-2/3" />
                  </div>
                </div>
                <div className="lg:col-span-7 bg-white/80 border border-slate-200 rounded-2xl p-5 h-44 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-xl" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-3.5 bg-slate-200 rounded-md w-1/3" />
                      <div className="h-3 bg-slate-100 rounded-md w-2/3" />
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full w-full" />
                  <div className="h-2 bg-slate-100 rounded-full w-5/6" />
                </div>
              </div>
            </div>
          )}

          {/* ── 2. GENERATED TRIP PATHWAY DASHBOARD (MATCHING MAX-W-6XL) ── */}
          {hasGenerated && itineraryDays.length > 0 && (
            <div id="trip-dashboard" className="w-full max-w-6xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start text-left">
              
              {/* LEFT CARD: AI Trip & Budget Planner */}
              <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-[24px] p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                    AI Trip &amp; Budget Planner
                  </h2>
                  <div className="text-right">
                    <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Total Budget</span>
                    <span className="text-sm md:text-base font-extrabold text-[#00A86B]">
                      ₹{budgetTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Interactive SVG Donut Chart + Central Legend */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 my-2">
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                      {budgetBreakdown.map((item, idx) => {
                        const strokeDasharray = `${(item.pct / 100) * circumference} ${circumference}`;
                        const strokeDashoffset = -accumulatedOffset;
                        accumulatedOffset += (item.pct / 100) * circumference;

                        return (
                          <circle
                            key={idx}
                            cx="80"
                            cy="80"
                            r={radius}
                            fill="transparent"
                            stroke={item.color}
                            strokeWidth="20"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-500 hover:opacity-80 cursor-pointer"
                          />
                        );
                      })}
                    </svg>
                    {/* Center Donut Label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                      <span className="text-xs sm:text-sm font-extrabold text-slate-800">₹{budgetTotal.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] text-slate-400 font-semibold">Total Budget</span>
                    </div>
                  </div>

                  {/* Expense List */}
                  <div className="w-full space-y-1.5 text-xs">
                    {budgetBreakdown.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-slate-700 font-semibold">{item.category}</span>
                        </div>
                        <div className="flex items-center gap-2 font-bold">
                          <span className="text-slate-800">₹{item.amount.toLocaleString('en-IN')}</span>
                          <span className="text-[10px] font-semibold text-slate-400">{item.pct}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modifiers List below Donut Chart */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                    {modifiers.map((mod) => {
                      const isActive = activeModifiers.includes(mod.id);
                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => toggleModifier(mod.id)}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[10px] sm:text-xs font-semibold whitespace-nowrap transition-all cursor-pointer select-none ${
                            isActive
                              ? 'border-[#00A86B] bg-emerald-50 text-[#00A86B] font-bold'
                              : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <span>{mod.icon}</span>
                          <span>{mod.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* RIGHT CARD: 5-Day Pathway Itinerary */}
              <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-[24px] p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base sm:text-lg">
                    <span>{itineraryDays.length}-Day Pathway Itinerary</span>
                  </div>
                  <a href="/services/tours" className="text-xs font-bold text-[#00A86B] hover:underline">
                    View Full
                  </a>
                </div>

                {/* Dynamic Accordion list */}
                <div className="space-y-2.5">
                  {itineraryDays.map((day) => {
                    const isExpanded = expandedDay === day.dayNumber;
                    return (
                      <div
                        key={day.dayNumber}
                        className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                          isExpanded
                            ? 'border-slate-200 bg-white shadow-2xs'
                            : 'border-slate-200/80 bg-white hover:border-slate-300'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedDay(isExpanded ? 0 : day.dayNumber)}
                          className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {day.image && (
                              <img
                                src={day.image}
                                alt={day.title}
                                className="w-11 h-11 object-cover rounded-xl shrink-0 border border-slate-100 shadow-2xs"
                              />
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-extrabold text-[#00A86B]">
                                  Day {day.dayNumber}
                                </span>
                                <span className="text-xs sm:text-sm font-bold text-slate-800">
                                  {day.title}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 truncate max-w-[220px] sm:max-w-md">
                                {day.summary || day.morning}
                              </p>
                            </div>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="p-3 pt-0 border-t border-slate-100 bg-white">
                            <div className="space-y-1.5 text-xs pt-2.5">
                              {day.morning && (
                                <div className="flex items-start gap-1.5">
                                  <span className="font-semibold text-slate-700 shrink-0 flex items-center gap-1">
                                    ☀️ Morning <span className="text-slate-300">•</span>
                                  </span>
                                  <span className="text-slate-600">{day.morning}</span>
                                </div>
                              )}
                              {day.afternoon && (
                                <div className="flex items-start gap-1.5">
                                  <span className="font-semibold text-slate-700 shrink-0 flex items-center gap-1">
                                    ☀️ Afternoon <span className="text-slate-300">•</span>
                                  </span>
                                  <span className="text-slate-600">{day.afternoon}</span>
                                </div>
                              )}
                              {day.evening && (
                                <div className="flex items-start gap-1.5">
                                  <span className="font-semibold text-slate-700 shrink-0 flex items-center gap-1">
                                    🌅 Evening <span className="text-slate-300">•</span>
                                  </span>
                                  <span className="text-slate-600">{day.evening}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── 3. MULTI-TAB GLOBAL SEARCH & FILTER WIDGET (MOBILE-PERFECT RESPONSIVE) ── */}
          <div className="w-full max-w-6xl mx-auto mt-7 sm:mt-9 bg-white border border-slate-200/90 rounded-2xl sm:rounded-[30px] p-4 sm:p-7 md:p-9 shadow-[0_14px_50px_rgba(0,0,0,0.05)] text-left">
            
            {/* Top 5 Service Tabs - Clean Horizontal Scroll with Generous Gap */}
            <div className="flex items-center justify-start lg:justify-between gap-5 sm:gap-7 border-b border-slate-100 overflow-x-auto no-scrollbar pb-3 sm:pb-4 mb-5 sm:mb-6 px-1">
              <button
                type="button"
                onClick={() => setActiveSearchTab('universities')}
                className={`shrink-0 flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm md:text-base font-extrabold transition-all whitespace-nowrap cursor-pointer pb-3 sm:pb-4 -mb-[13px] sm:-mb-[17px] ${
                  activeSearchTab === 'universities'
                    ? 'border-b-2 border-[#00A86B] text-[#00A86B]'
                    : 'border-b-2 border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Universities</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSearchTab('consultants')}
                className={`shrink-0 flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm md:text-base font-extrabold transition-all whitespace-nowrap cursor-pointer pb-3 sm:pb-4 -mb-[13px] sm:-mb-[17px] ${
                  activeSearchTab === 'consultants'
                    ? 'border-b-2 border-[#00A86B] text-[#00A86B]'
                    : 'border-b-2 border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Find Consultants</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSearchTab('relocation')}
                className={`shrink-0 flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm md:text-base font-extrabold transition-all whitespace-nowrap cursor-pointer pb-3 sm:pb-4 -mb-[13px] sm:-mb-[17px] ${
                  activeSearchTab === 'relocation'
                    ? 'border-b-2 border-[#00A86B] text-[#00A86B]'
                    : 'border-b-2 border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Luggage className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Relocation Assistance</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSearchTab('jobs')}
                className={`shrink-0 flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm md:text-base font-extrabold transition-all whitespace-nowrap cursor-pointer pb-3 sm:pb-4 -mb-[13px] sm:-mb-[17px] ${
                  activeSearchTab === 'jobs'
                    ? 'border-b-2 border-[#00A86B] text-[#00A86B]'
                    : 'border-b-2 border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Jobs Abroad</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSearchTab('lawyers')}
                className={`shrink-0 flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm md:text-base font-extrabold transition-all whitespace-nowrap cursor-pointer pb-3 sm:pb-4 -mb-[13px] sm:-mb-[17px] ${
                  activeSearchTab === 'lawyers'
                    ? 'border-b-2 border-[#00A86B] text-[#00A86B]'
                    : 'border-b-2 border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Scale className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Immigration Lawyers</span>
              </button>
            </div>

            {/* ── DYNAMIC ROW 1 FILTER FIELDS (ADAPTS EXACTLY TO ACTIVE TAB) ── */}
            
            {/* 1. UNIVERSITIES TAB (3 Columns: Course Level, Country, Location) */}
            {activeSearchTab === 'universities' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6 animate-fadeIn">
                {/* Course Level */}
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Course Level</label>
                  <div
                    ref={courseLevelRef}
                    className="relative bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 rounded-2xl h-[52px] px-4 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                    onClick={() => {
                      setIsCourseLevelOpen(!isCourseLevelOpen);
                      setIsCountryOpen(false);
                      setIsLocationOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="text-sm shrink-0">🎓</span>
                      <span className={`text-sm font-semibold truncate ${courseLevel ? 'text-slate-800 font-bold' : 'text-slate-400'}`}>
                        {courseLevelOptions.find(o => o.value === courseLevel)?.label || 'Select Level'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isCourseLevelOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                    {isCourseLevelOpen && (
                      <div
                        className="absolute bottom-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[230px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Choose Course Level</div>
                        <div className="space-y-0.5">
                          <button
                            type="button"
                            onClick={() => { setCourseLevel(''); setIsCourseLevelOpen(false); }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                              courseLevel === '' ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span>All Levels</span>
                            {courseLevel === '' && <Check className="w-3.5 h-3.5 text-[#00A86B]" />}
                          </button>
                          {courseLevelOptions.map((opt) => {
                            const isSelected = courseLevel === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => { setCourseLevel(opt.value); setIsCourseLevelOpen(false); }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                                  isSelected ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-base">{opt.icon}</span>
                                  <span className="truncate">{opt.label}</span>
                                </div>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#00A86B] shrink-0 ml-1" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Destination Country */}
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Destination Country</label>
                  <div
                    ref={countryRef}
                    className="relative bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 rounded-2xl h-[52px] px-4 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                    onClick={() => {
                      setIsCountryOpen(!isCountryOpen);
                      setIsCourseLevelOpen(false);
                      setIsLocationOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="text-sm shrink-0">{countryOptions.find(o => o.value === searchCountry)?.icon || '🌐'}</span>
                      <span className={`text-sm font-semibold truncate ${searchCountry ? 'text-slate-800 font-bold' : 'text-slate-400'}`}>
                        {countryOptions.find(o => o.value === searchCountry)?.label || 'Select Country'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isCountryOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                    {isCountryOpen && (
                      <div
                        className="absolute bottom-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[230px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Choose Destination</div>
                        <div className="space-y-0.5">
                          <button
                            type="button"
                            onClick={() => { setSearchCountry(''); setIsCountryOpen(false); }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                              searchCountry === '' ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span>All Countries</span>
                            {searchCountry === '' && <Check className="w-3.5 h-3.5 text-[#00A86B]" />}
                          </button>
                          {countryOptions.map((opt) => {
                            const isSelected = searchCountry === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => { setSearchCountry(opt.value); setIsCountryOpen(false); }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                                  isSelected ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-base">{opt.icon}</span>
                                  <span className="truncate">{opt.label}</span>
                                </div>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#00A86B] shrink-0 ml-1" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location</label>
                  <div
                    ref={locationRef}
                    className="relative bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 rounded-2xl h-[52px] px-4 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                    onClick={() => {
                      setIsLocationOpen(!isLocationOpen);
                      setIsCourseLevelOpen(false);
                      setIsCountryOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="text-sm shrink-0">📍</span>
                      <span className={`text-sm font-semibold truncate ${searchLocation ? 'text-slate-800 font-bold' : 'text-slate-400'}`}>
                        {locationOptions.find(o => o.value === searchLocation)?.label || 'State / City'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isLocationOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                    {isLocationOpen && (
                      <div
                        className="absolute bottom-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[230px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Choose City / Region</div>
                        <div className="space-y-0.5">
                          <button
                            type="button"
                            onClick={() => { setSearchLocation(''); setIsLocationOpen(false); }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                              searchLocation === '' ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span>All Locations</span>
                            {searchLocation === '' && <Check className="w-3.5 h-3.5 text-[#00A86B]" />}
                          </button>
                          {locationOptions.map((opt) => {
                            const isSelected = searchLocation === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => { setSearchLocation(opt.value); setIsLocationOpen(false); }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                                  isSelected ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-base">{opt.icon}</span>
                                  <span className="truncate">{opt.label}</span>
                                </div>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#00A86B] shrink-0 ml-1" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 2. FIND CONSULTANTS TAB (4 Columns: Consultant Name, Country, Location, Visa Category) */}
            {activeSearchTab === 'consultants' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 animate-fadeIn">
                {/* Consultant Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 whitespace-nowrap truncate">Consultant Name</label>
                  <div className="bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 rounded-2xl h-[52px] px-4 flex items-center justify-between shadow-2xs transition-colors">
                    <input
                      type="text"
                      value={consultantName}
                      onChange={(e) => setConsultantName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleGlobalSearch();
                        }
                      }}
                      placeholder="Search by name"
                      className="w-full bg-transparent text-sm font-semibold text-slate-800 placeholder-slate-400 outline-none border-none p-0"
                    />
                    <button
                      type="button"
                      onClick={handleGlobalSearch}
                      className="p-1 hover:text-[#00A86B] cursor-pointer"
                    >
                      <Search className="w-4 h-4 text-slate-400 hover:text-[#00A86B] shrink-0 ml-1 transition-colors" />
                    </button>
                  </div>
                </div>

                {/* Destination Country */}
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Destination Country</label>
                  <div
                    ref={countryRef}
                    className="relative bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 rounded-2xl h-[52px] px-4 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                    onClick={() => {
                      setIsCountryOpen(!isCountryOpen);
                      setIsLocationOpen(false);
                      setIsVisaCategoryOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="text-sm shrink-0">{countryOptions.find(o => o.value === searchCountry)?.icon || '🌐'}</span>
                      <span className={`text-sm font-semibold truncate ${searchCountry ? 'text-slate-800 font-bold' : 'text-slate-400'}`}>
                        {countryOptions.find(o => o.value === searchCountry)?.label || 'Select Country'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isCountryOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                    {isCountryOpen && (
                      <div
                        className="absolute bottom-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[230px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Choose Destination</div>
                        <div className="space-y-0.5">
                          <button
                            type="button"
                            onClick={() => { setSearchCountry(''); setIsCountryOpen(false); }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                              searchCountry === '' ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span>All Countries</span>
                            {searchCountry === '' && <Check className="w-3.5 h-3.5 text-[#00A86B]" />}
                          </button>
                          {countryOptions.map((opt) => {
                            const isSelected = searchCountry === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => { setSearchCountry(opt.value); setIsCountryOpen(false); }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                                  isSelected ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-base">{opt.icon}</span>
                                  <span className="truncate">{opt.label}</span>
                                </div>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#00A86B] shrink-0 ml-1" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location</label>
                  <div
                    ref={locationRef}
                    className="relative bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 rounded-2xl h-[52px] px-4 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                    onClick={() => {
                      setIsLocationOpen(!isLocationOpen);
                      setIsCountryOpen(false);
                      setIsVisaCategoryOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="text-sm shrink-0">📍</span>
                      <span className={`text-sm font-semibold truncate ${searchLocation ? 'text-slate-800 font-bold' : 'text-slate-400'}`}>
                        {locationOptions.find(o => o.value === searchLocation)?.label || 'State / City'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isLocationOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                    {isLocationOpen && (
                      <div
                        className="absolute bottom-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[230px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Choose City / Region</div>
                        <div className="space-y-0.5">
                          <button
                            type="button"
                            onClick={() => { setSearchLocation(''); setIsLocationOpen(false); }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                              searchLocation === '' ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span>All Locations</span>
                            {searchLocation === '' && <Check className="w-3.5 h-3.5 text-[#00A86B]" />}
                          </button>
                          {locationOptions.map((opt) => {
                            const isSelected = searchLocation === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => { setSearchLocation(opt.value); setIsLocationOpen(false); }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                                  isSelected ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-base">{opt.icon}</span>
                                  <span className="truncate">{opt.label}</span>
                                </div>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#00A86B] shrink-0 ml-1" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Visa Category (Disabled when Consultant Name has input) */}
                <div className={`relative transition-opacity duration-200 ${consultantName.trim() ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Visa Category</label>
                    {consultantName.trim() && <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded-md">Name Priority</span>}
                  </div>
                  <div
                    ref={visaCategoryRef}
                    className="relative bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 rounded-2xl h-[52px] px-4 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                    onClick={() => {
                      if (consultantName.trim()) return;
                      setIsVisaCategoryOpen(!isVisaCategoryOpen);
                      setIsCountryOpen(false);
                      setIsLocationOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="text-sm shrink-0">{visaCategoryOptions.find(o => o.value === visaCategory)?.icon || '🛂'}</span>
                      <span className={`text-sm font-semibold truncate ${visaCategory ? 'text-slate-800 font-bold' : 'text-slate-400'}`}>
                        {visaCategoryOptions.find(o => o.value === visaCategory)?.label || 'Select Category'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isVisaCategoryOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                    {isVisaCategoryOpen && (
                      <div
                        className="absolute bottom-[calc(100%+8px)] right-0 sm:left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[230px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Choose Visa Pathway</div>
                        <div className="space-y-0.5">
                          <button
                            type="button"
                            onClick={() => { setVisaCategory(''); setIsVisaCategoryOpen(false); }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                              visaCategory === '' ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span>All Categories</span>
                            {visaCategory === '' && <Check className="w-3.5 h-3.5 text-[#00A86B]" />}
                          </button>
                          {visaCategoryOptions.map((opt) => {
                            const isSelected = visaCategory === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => { setVisaCategory(opt.value); setIsVisaCategoryOpen(false); }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                                  isSelected ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-base">{opt.icon}</span>
                                  <span className="truncate">{opt.label}</span>
                                </div>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#00A86B] shrink-0 ml-1" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 3. RELOCATION ASSISTANCE TAB (3 Columns: Service Keyword, Country, Location) */}
            {activeSearchTab === 'relocation' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6 animate-fadeIn">
                {/* Service Keyword */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Service Name / Keyword</label>
                  <div className="bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 rounded-2xl h-[52px] px-4 flex items-center justify-between shadow-2xs transition-colors">
                    <input
                      type="text"
                      value={serviceKeyword}
                      onChange={(e) => setServiceKeyword(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleGlobalSearch();
                        }
                      }}
                      placeholder="Housing, SIM & eSIM, Forex..."
                      className="w-full bg-transparent text-sm font-semibold text-slate-800 placeholder-slate-400 outline-none border-none p-0"
                    />
                    <button type="button" onClick={handleGlobalSearch} className="p-1 hover:text-[#00A86B] cursor-pointer">
                      <Search className="w-4 h-4 text-slate-400 hover:text-[#00A86B] shrink-0 ml-1 transition-colors" />
                    </button>
                  </div>
                </div>

                {/* Destination Country */}
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Destination Country</label>
                  <div
                    ref={countryRef}
                    className="relative bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 rounded-2xl h-[52px] px-4 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                    onClick={() => {
                      setIsCountryOpen(!isCountryOpen);
                      setIsLocationOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="text-sm shrink-0">{countryOptions.find(o => o.value === searchCountry)?.icon || '🌐'}</span>
                      <span className={`text-sm font-semibold truncate ${searchCountry ? 'text-slate-800 font-bold' : 'text-slate-400'}`}>
                        {countryOptions.find(o => o.value === searchCountry)?.label || 'Select Country'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isCountryOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                    {isCountryOpen && (
                      <div
                        className="absolute bottom-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[230px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Choose Destination</div>
                        <div className="space-y-0.5">
                          <button
                            type="button"
                            onClick={() => { setSearchCountry(''); setIsCountryOpen(false); }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                              searchCountry === '' ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span>All Countries</span>
                            {searchCountry === '' && <Check className="w-3.5 h-3.5 text-[#00A86B]" />}
                          </button>
                          {countryOptions.map((opt) => {
                            const isSelected = searchCountry === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => { setSearchCountry(opt.value); setIsCountryOpen(false); }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                                  isSelected ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-base">{opt.icon}</span>
                                  <span className="truncate">{opt.label}</span>
                                </div>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#00A86B] shrink-0 ml-1" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location</label>
                  <div
                    ref={locationRef}
                    className="relative bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 rounded-2xl h-[52px] px-4 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                    onClick={() => {
                      setIsLocationOpen(!isLocationOpen);
                      setIsCountryOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="text-sm shrink-0">📍</span>
                      <span className={`text-sm font-semibold truncate ${searchLocation ? 'text-slate-800 font-bold' : 'text-slate-400'}`}>
                        {locationOptions.find(o => o.value === searchLocation)?.label || 'State / City'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isLocationOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                    {isLocationOpen && (
                      <div
                        className="absolute bottom-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[230px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Choose City / Region</div>
                        <div className="space-y-0.5">
                          <button
                            type="button"
                            onClick={() => { setSearchLocation(''); setIsLocationOpen(false); }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                              searchLocation === '' ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span>All Locations</span>
                            {searchLocation === '' && <Check className="w-3.5 h-3.5 text-[#00A86B]" />}
                          </button>
                          {locationOptions.map((opt) => {
                            const isSelected = searchLocation === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => { setSearchLocation(opt.value); setIsLocationOpen(false); }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                                  isSelected ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-base">{opt.icon}</span>
                                  <span className="truncate">{opt.label}</span>
                                </div>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#00A86B] shrink-0 ml-1" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 4. JOBS ABROAD TAB (3 Columns: Job Role, Country, Experience Level) */}
            {activeSearchTab === 'jobs' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6 animate-fadeIn">
                {/* Job Role */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Job Role / Keyword</label>
                  <div className="bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 rounded-2xl h-[52px] px-4 flex items-center justify-between shadow-2xs transition-colors">
                    <input
                      type="text"
                      value={jobKeyword}
                      onChange={(e) => setJobKeyword(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleGlobalSearch();
                        }
                      }}
                      placeholder="Software Engineer, Nurse, Chef..."
                      className="w-full bg-transparent text-sm font-semibold text-slate-800 placeholder-slate-400 outline-none border-none p-0"
                    />
                    <button type="button" onClick={handleGlobalSearch} className="p-1 hover:text-[#00A86B] cursor-pointer">
                      <Search className="w-4 h-4 text-slate-400 hover:text-[#00A86B] shrink-0 ml-1 transition-colors" />
                    </button>
                  </div>
                </div>

                {/* Destination Country */}
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Destination Country</label>
                  <div
                    ref={countryRef}
                    className="relative bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 rounded-2xl h-[52px] px-4 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                    onClick={() => {
                      setIsCountryOpen(!isCountryOpen);
                      setIsExperienceLevelOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="text-sm shrink-0">{countryOptions.find(o => o.value === searchCountry)?.icon || '🌐'}</span>
                      <span className={`text-sm font-semibold truncate ${searchCountry ? 'text-slate-800 font-bold' : 'text-slate-400'}`}>
                        {countryOptions.find(o => o.value === searchCountry)?.label || 'Select Country'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isCountryOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                    {isCountryOpen && (
                      <div
                        className="absolute bottom-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[230px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Choose Destination</div>
                        <div className="space-y-0.5">
                          <button
                            type="button"
                            onClick={() => { setSearchCountry(''); setIsCountryOpen(false); }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                              searchCountry === '' ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span>All Countries</span>
                            {searchCountry === '' && <Check className="w-3.5 h-3.5 text-[#00A86B]" />}
                          </button>
                          {countryOptions.map((opt) => {
                            const isSelected = searchCountry === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => { setSearchCountry(opt.value); setIsCountryOpen(false); }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                                  isSelected ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-base">{opt.icon}</span>
                                  <span className="truncate">{opt.label}</span>
                                </div>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#00A86B] shrink-0 ml-1" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Experience Level */}
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Experience Level</label>
                  <div
                    ref={experienceLevelRef}
                    className="relative bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 rounded-2xl h-[52px] px-4 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                    onClick={() => {
                      setIsExperienceLevelOpen(!isExperienceLevelOpen);
                      setIsCountryOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="text-sm shrink-0">💼</span>
                      <span className={`text-sm font-semibold truncate ${experienceLevel ? 'text-slate-800 font-bold' : 'text-slate-400'}`}>
                        {experienceLevelOptions.find(o => o.value === experienceLevel)?.label || 'Select Experience'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isExperienceLevelOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                    {isExperienceLevelOpen && (
                      <div
                        className="absolute bottom-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[230px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Choose Experience</div>
                        <div className="space-y-0.5">
                          <button
                            type="button"
                            onClick={() => { setExperienceLevel(''); setIsExperienceLevelOpen(false); }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                              experienceLevel === '' ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span>All Experience Levels</span>
                            {experienceLevel === '' && <Check className="w-3.5 h-3.5 text-[#00A86B]" />}
                          </button>
                          {experienceLevelOptions.map((opt) => {
                            const isSelected = experienceLevel === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => { setExperienceLevel(opt.value); setIsExperienceLevelOpen(false); }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                                  isSelected ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-base">{opt.icon}</span>
                                  <span className="truncate">{opt.label}</span>
                                </div>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#00A86B] shrink-0 ml-1" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 5. IMMIGRATION LAWYERS TAB (3 Columns: Specialization / Appeal Type, Country, Location) */}
            {activeSearchTab === 'lawyers' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6 animate-fadeIn">
                {/* Specialization / Appeal Type */}
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Specialization / Appeal Type</label>
                  <div
                    ref={lawyerSpecRef}
                    className="relative bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 rounded-2xl h-[52px] px-4 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                    onClick={() => {
                      setIsLawyerSpecOpen(!isLawyerSpecOpen);
                      setIsCountryOpen(false);
                      setIsLocationOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="text-sm shrink-0">⚖️</span>
                      <span className={`text-sm font-semibold truncate ${lawyerSpecialization ? 'text-slate-800 font-bold' : 'text-slate-400'}`}>
                        {lawyerSpecializationOptions.find(o => o.value === lawyerSpecialization)?.label || 'Select Specialization'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isLawyerSpecOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                    {isLawyerSpecOpen && (
                      <div
                        className="absolute bottom-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[230px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Choose Specialization</div>
                        <div className="space-y-0.5">
                          <button
                            type="button"
                            onClick={() => { setLawyerSpecialization(''); setIsLawyerSpecOpen(false); }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                              lawyerSpecialization === '' ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span>All Specializations</span>
                            {lawyerSpecialization === '' && <Check className="w-3.5 h-3.5 text-[#00A86B]" />}
                          </button>
                          {lawyerSpecializationOptions.map((opt) => {
                            const isSelected = lawyerSpecialization === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => { setLawyerSpecialization(opt.value); setIsLawyerSpecOpen(false); }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                                  isSelected ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-base">{opt.icon}</span>
                                  <span className="truncate">{opt.label}</span>
                                </div>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#00A86B] shrink-0 ml-1" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Destination Country */}
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Destination Country</label>
                  <div
                    ref={countryRef}
                    className="relative bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 rounded-2xl h-[52px] px-4 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                    onClick={() => {
                      setIsCountryOpen(!isCountryOpen);
                      setIsLawyerSpecOpen(false);
                      setIsLocationOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="text-sm shrink-0">{countryOptions.find(o => o.value === searchCountry)?.icon || '🌐'}</span>
                      <span className={`text-sm font-semibold truncate ${searchCountry ? 'text-slate-800 font-bold' : 'text-slate-400'}`}>
                        {countryOptions.find(o => o.value === searchCountry)?.label || 'Select Country'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isCountryOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                    {isCountryOpen && (
                      <div
                        className="absolute bottom-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[230px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Choose Destination</div>
                        <div className="space-y-0.5">
                          <button
                            type="button"
                            onClick={() => { setSearchCountry(''); setIsCountryOpen(false); }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                              searchCountry === '' ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span>All Countries</span>
                            {searchCountry === '' && <Check className="w-3.5 h-3.5 text-[#00A86B]" />}
                          </button>
                          {countryOptions.map((opt) => {
                            const isSelected = searchCountry === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => { setSearchCountry(opt.value); setIsCountryOpen(false); }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                                  isSelected ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-base">{opt.icon}</span>
                                  <span className="truncate">{opt.label}</span>
                                </div>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#00A86B] shrink-0 ml-1" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location</label>
                  <div
                    ref={locationRef}
                    className="relative bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 rounded-2xl h-[52px] px-4 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                    onClick={() => {
                      setIsLocationOpen(!isLocationOpen);
                      setIsCountryOpen(false);
                      setIsLawyerSpecOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="text-sm shrink-0">📍</span>
                      <span className={`text-sm font-semibold truncate ${searchLocation ? 'text-slate-800 font-bold' : 'text-slate-400'}`}>
                        {locationOptions.find(o => o.value === searchLocation)?.label || 'State / City'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isLocationOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                    {isLocationOpen && (
                      <div
                        className="absolute bottom-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[230px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Choose City / Region</div>
                        <div className="space-y-0.5">
                          <button
                            type="button"
                            onClick={() => { setSearchLocation(''); setIsLocationOpen(false); }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                              searchLocation === '' ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span>All Locations</span>
                            {searchLocation === '' && <Check className="w-3.5 h-3.5 text-[#00A86B]" />}
                          </button>
                          {locationOptions.map((opt) => {
                            const isSelected = searchLocation === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => { setSearchLocation(opt.value); setIsLocationOpen(false); }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                                  isSelected ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-base">{opt.icon}</span>
                                  <span className="truncate">{opt.label}</span>
                                </div>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#00A86B] shrink-0 ml-1" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── ROW 2 FILTER BOTTOM CONTROLS & DYNAMIC SUB-FILTERS ── */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-5 border-t border-slate-100/90">
              
              {/* SUB-FILTERS AREA */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-8 min-h-[38px]">
                
                {/* 1. UNIVERSITIES TAB: No Sub-filters required */}
                {activeSearchTab === 'universities' && (
                  <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[#00A86B]" />
                    <span>Search accredited universities, courses & global intake programs</span>
                  </div>
                )}

                {/* 2. FIND CONSULTANTS TAB: Consultant Type & Mode */}
                {activeSearchTab === 'consultants' && (
                  <>
                    {/* Consultant Type */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Consultant Type</label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setConsultantType('all')}
                          className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                            consultantType === 'all'
                              ? 'bg-[#00A86B] text-white shadow-xs'
                              : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/90'
                          }`}
                        >
                          All
                        </button>
                        <button
                          type="button"
                          onClick={() => setConsultantType('freelancer')}
                          className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                            consultantType === 'freelancer'
                              ? 'bg-[#00A86B] text-white shadow-xs'
                              : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/90'
                          }`}
                        >
                          Freelancer
                        </button>
                        <button
                          type="button"
                          onClick={() => setConsultantType('agency')}
                          className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                            consultantType === 'agency'
                              ? 'bg-[#00A86B] text-white shadow-xs'
                              : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/90'
                          }`}
                        >
                          Registered Agency
                        </button>
                      </div>
                    </div>

                    {/* Mode */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mode</label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setConsultantMode('all')}
                          className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                            consultantMode === 'all'
                              ? 'bg-[#00A86B] text-white shadow-xs'
                              : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/90'
                          }`}
                        >
                          All
                        </button>
                        <button
                          type="button"
                          onClick={() => setConsultantMode('online')}
                          className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                            consultantMode === 'online'
                              ? 'bg-[#00A86B] text-white shadow-xs'
                              : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/90'
                          }`}
                        >
                          Online
                        </button>
                        <button
                          type="button"
                          onClick={() => setConsultantMode('offline')}
                          className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                            consultantMode === 'offline'
                              ? 'bg-[#00A86B] text-white shadow-xs'
                              : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/90'
                          }`}
                        >
                          Offline
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* 3. RELOCATION ASSISTANCE TAB: Service Category */}
                {activeSearchTab === 'relocation' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Service Category</label>
                    <div className="flex flex-wrap items-center gap-2">
                      {[
                        { id: 'all', label: 'All Services' },
                        { id: 'accommodation', label: '🏠 Accommodation' },
                        { id: 'sim', label: '📱 SIM & eSIM' },
                        { id: 'jobs', label: '💼 Jobs' },
                        { id: 'business', label: '🏢 Business' },
                        { id: 'appeals', label: '⚖️ Visa Appeals' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setServiceCategory(item.id as any)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                            serviceCategory === item.id
                              ? 'bg-[#00A86B] text-white font-bold shadow-xs'
                              : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/90'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. JOBS ABROAD TAB: Job Type */}
                {activeSearchTab === 'jobs' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Job Type</label>
                    <div className="flex flex-wrap items-center gap-2">
                      {[
                        { id: 'all', label: 'All Types' },
                        { id: 'fulltime', label: 'Full-time' },
                        { id: 'remote', label: 'Remote 🌐' },
                        { id: 'internship', label: 'Internship' },
                        { id: 'contract', label: 'Contract' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setJobType(item.id as any)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                            jobType === item.id
                              ? 'bg-[#00A86B] text-white font-bold shadow-xs'
                              : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/90'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. IMMIGRATION LAWYERS TAB: Practice Area */}
                {activeSearchTab === 'lawyers' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Practice Area</label>
                    <div className="flex flex-wrap items-center gap-2">
                      {[
                        { id: 'all', label: 'All Areas' },
                        { id: 'appeals', label: 'Visa Appeals' },
                        { id: 'deportation', label: 'Deportation Defense' },
                        { id: 'judicial', label: 'Judicial Review' },
                        { id: 'corporate', label: 'Corporate Law' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setLawyerPracticeArea(item.id as any)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                            lawyerPracticeArea === item.id
                              ? 'bg-[#00A86B] text-white font-bold shadow-xs'
                              : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/90'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* DYNAMIC CTA SEARCH ACTION BUTTON */}
              <button
                type="button"
                onClick={handleGlobalSearch}
                className="w-full sm:w-auto h-[50px] px-9 bg-[#00A86B] hover:bg-[#008f5a] text-white font-extrabold rounded-2xl flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all active:scale-95 text-sm sm:text-base cursor-pointer whitespace-nowrap"
              >
                <span>
                  {activeSearchTab === 'universities' && 'Find Universities →'}
                  {activeSearchTab === 'consultants' && 'Search Consultants →'}
                  {activeSearchTab === 'relocation' && 'Explore Services →'}
                  {activeSearchTab === 'jobs' && 'Search Jobs →'}
                  {activeSearchTab === 'lawyers' && 'Find Lawyers →'}
                </span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. POPULAR DESTINATIONS & CLASSIFIEDS SECTION ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-6 md:space-y-7 mt-5">

        {/* 1. Popular Destinations (Full Width Single Horizontal Row Card) */}
        <div className="w-full bg-white border border-slate-200/90 rounded-[28px] p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.03)] text-left">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                Popular Destinations
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Explore top country pathways with verified consultants and university partners.
              </p>
            </div>
            <a href="/find-experts" className="text-xs font-bold text-[#00A86B] hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Single Row of 8 Circular Flag Items */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4 lg:gap-6 text-center">
            {popularDestinations.map((dest, idx) => (
              <a
                key={idx}
                href={`/find-experts?country=${encodeURIComponent(dest.name)}`}
                className="flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200/80 transition-all duration-200 group cursor-pointer"
              >
                {dest.flagImg ? (
                  <div className="relative mb-2">
                    <img
                      src={dest.flagImg}
                      alt={dest.name}
                      className="w-13 h-13 sm:w-14 sm:h-14 md:w-15 md:h-15 rounded-full object-cover shadow-sm border-2 border-white ring-1 ring-slate-200 group-hover:scale-110 group-hover:ring-[#00A86B] transition-all duration-300"
                    />
                  </div>
                ) : (
                  <div className="w-13 h-13 sm:w-14 sm:h-14 md:w-15 md:h-15 rounded-full bg-slate-100 border-2 border-white ring-1 ring-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm mb-2 group-hover:bg-emerald-50 group-hover:text-[#00A86B] group-hover:ring-[#00A86B] group-hover:scale-110 transition-all duration-300 shadow-sm">
                    •••
                  </div>
                )}
                <span className="text-xs sm:text-sm font-bold text-slate-700 group-hover:text-[#00A86B] whitespace-nowrap transition-colors">
                  {dest.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* 2. Relocation Assistance & Classifieds (Full Width with Larger Cards) */}
        <div className="w-full bg-white border border-slate-200/90 rounded-[28px] p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.03)] text-left">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                Relocation Assistance &amp; Classifieds
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Essential landing essentials, housing, local SIMs, job listings &amp; legal services.
              </p>
            </div>
            <a href="/classifieds" className="text-xs font-bold text-[#00A86B] hover:underline flex items-center gap-1">
              <span>View Full Marketplace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-4.5">
            {[
              {
                title: 'Student Housing',
                sub: 'Shared & Ensuite Rooms',
                badge: 'Accommodation',
                image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&q=80',
                href: '/classifieds?cat=housing'
              },
              {
                title: '5G eSIMs',
                sub: 'Instant Activation',
                badge: 'Connectivity',
                image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80',
                href: '/services/esims'
              },
              {
                title: 'Healthcare Jobs',
                sub: 'Caregiver & Nurse',
                badge: 'Work Abroad',
                image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80',
                href: '/jobs?cat=healthcare'
              },
              {
                title: 'Consultancy Sale',
                sub: 'Established Business',
                badge: 'Business',
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80',
                href: '/classifieds?cat=business'
              },
              {
                title: 'Visa Appeals',
                sub: 'Refusal Case Review',
                badge: 'Legal',
                image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&q=80',
                href: '/emergency'
              },
              {
                title: 'Airport Pickup',
                sub: 'Travel Hassle-Free',
                badge: 'Arrival Support',
                image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=500&q=80',
                href: '/services/pickup'
              },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="group flex flex-col bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-[#00A86B] rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="relative w-full h-32 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                    {item.badge}
                  </div>
                </div>
                <div className="p-3.5 text-left flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 leading-snug group-hover:text-[#00A86B] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] font-medium text-slate-500 mt-1 line-clamp-1">
                      {item.sub}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-[#00A86B] opacity-90 group-hover:opacity-100">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── 5. TRAVEL READINESS & EMBASSY CHECKLIST DOWNLOAD STRIP ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Check Your Travel Readiness */}
          <a
            href="/readiness"
            className="group lg:col-span-5 bg-white hover:bg-emerald-50/20 border border-slate-200/90 hover:border-[#00A86B] rounded-[28px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer text-left"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#00A86B] transition-colors">
                  Check Your Travel Readiness
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-[#00A86B] px-2 py-0.5 rounded-full">
                  Instant AI Audit
                </span>
              </div>
              <div className="flex items-center gap-4">
                {/* Radial circular score 82/100 */}
                <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#00A86B]"
                      strokeDasharray="82, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-black text-slate-900 leading-none">82</span>
                    <span className="text-[8px] font-bold text-slate-400 leading-none">/ 100</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] font-semibold text-slate-700">
                  <div className="flex items-center gap-1.5 text-emerald-700">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Passport Validity</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Documents Verified</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Finances Ready</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Travel Insurance</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Ready for immediate submission</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#00A86B] group-hover:translate-x-0.5 transition-transform">
                <span>Check Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>

          {/* Free Embassy Document Checklist Download */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-[28px] p-5 sm:p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Free Embassy Document Checklist Download
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Get country-specific checklist instantly for your visa process.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2.5 mt-4">
                <div className="relative w-full sm:w-64 bg-slate-50 border border-slate-200 rounded-xl p-2 px-3 flex items-center justify-between">
                  <select className="w-full bg-transparent text-xs font-semibold text-slate-700 outline-none border-none p-0 appearance-none cursor-pointer">
                    <option value="ca">Select Country (e.g. Canada)</option>
                    <option value="us">United States (B1/B2, F1, H1B)</option>
                    <option value="uk">United Kingdom (Student, Standard)</option>
                    <option value="de">Germany (Schengen, Opportunity Card)</option>
                    <option value="au">Australia (Subclass 500, 482, 189)</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>

                <a
                  href="/resources/checklists"
                  className="w-full sm:w-auto bg-[#00A86B] hover:bg-[#008f5a] text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all whitespace-nowrap cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                  <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                </a>
              </div>
            </div>

            {/* 5 Trust Icons Strip */}
            <div className="mt-5 pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-slate-600">
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-[#00A86B] mb-1" />
                <span className="text-[10px] font-bold text-slate-700 leading-tight">Verified &amp; Trusted</span>
                <span className="text-[8px] text-slate-400">Consultants</span>
              </div>
              <div className="flex flex-col items-center">
                <Globe2 className="w-4 h-4 text-purple-600 mb-1" />
                <span className="text-[10px] font-bold text-slate-700 leading-tight">Relocation Support</span>
                <span className="text-[8px] text-slate-400">Global Assistance</span>
              </div>
              <div className="flex flex-col items-center">
                <FileCheck2 className="w-4 h-4 text-indigo-600 mb-1" />
                <span className="text-[10px] font-bold text-slate-700 leading-tight">Updated Travel</span>
                <span className="text-[8px] text-slate-400">Official Rules</span>
              </div>
              <div className="flex flex-col items-center">
                <Lock className="w-4 h-4 text-teal-600 mb-1" />
                <span className="text-[10px] font-bold text-slate-700 leading-tight">Secure Platform</span>
                <span className="text-[8px] text-slate-400">Encrypted</span>
              </div>
              <div className="flex flex-col items-center col-span-2 sm:col-span-1">
                <Headphones className="w-4 h-4 text-emerald-600 mb-1" />
                <span className="text-[10px] font-bold text-slate-700 leading-tight">24/7 Assistance</span>
                <span className="text-[8px] text-slate-400">Live Concierge</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ── 6. MOBILE NAVIGATION BAR (MOBILE ONLY 1:1) ── */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-4 py-2 flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <a href="/" className="flex flex-col items-center justify-center text-[#00A86B] text-[10px] font-bold">
          <HomeIcon className="w-5 h-5 stroke-[2.2]" />
          <span>Home</span>
        </a>
        <a href="/find-experts" className="flex flex-col items-center justify-center text-slate-400 hover:text-slate-700 text-[10px] font-medium">
          <Search className="w-5 h-5 stroke-[1.8]" />
          <span>Explore</span>
        </a>

        {/* Center Glowing Action: AI Planner */}
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="-mt-5 w-12 h-12 rounded-full bg-gradient-to-tr from-[#00A86B] to-[#00c9b7] text-white flex items-center justify-center shadow-[0_6px_20px_rgba(0,168,107,0.4)] border-2 border-white active:scale-95 transition-transform"
        >
          <Sparkles className="w-6 h-6 fill-white/20" />
        </button>

        <a href="/classifieds" className="flex flex-col items-center justify-center text-slate-400 hover:text-slate-700 text-[10px] font-medium">
          <Users className="w-5 h-5 stroke-[1.8]" />
          <span>Community</span>
        </a>
        <a href="/user/dashboard" className="flex flex-col items-center justify-center text-slate-400 hover:text-slate-700 text-[10px] font-medium">
          <UserCircle2 className="w-5 h-5 stroke-[1.8]" />
          <span>Profile</span>
        </a>
      </div>

    </div>
  );
}

export const HeroSection = AITripPlannerLanding;
