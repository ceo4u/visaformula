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
  FileText,
  Plane,
  CreditCard,
  QrCode,
  CheckCircle2,
  Clock,
  UploadCloud,
  ArrowUpRight,
  ExternalLink,
  Shield,
  AlertTriangle,
  Send,
  Building
} from 'lucide-react';

// Quick-Pill Intent Tags (Visa & Overseas Journey Categories)
const categoryPills = [
  { id: 'student', emoji: '🎓', label: 'Student Visa' },
  { id: 'work', emoji: '💼', label: 'Work Permit' },
  { id: 'pr', emoji: '🏡', label: 'PR & Settlement' },
  { id: 'tourist', emoji: '🏝️', label: 'Tourist / Visit' },
  { id: 'transit', emoji: '✈️', label: 'Transit Visa' },
  { id: 'business', emoji: '💼', label: 'Business Visa' },
  { id: 'appeals', emoji: '⚖️', label: 'Refusal Appeals' },
  { id: 'relocation', emoji: '🧳', label: 'Relocation & Housing' },
];

const passportCountryOptions = [
  { value: 'India', label: 'India', icon: '🇮🇳', desc: 'Indian Passport' },
  { value: 'Nepal', label: 'Nepal', icon: '🇳🇵', desc: 'Nepalese Passport' },
  { value: 'Bangladesh', label: 'Bangladesh', icon: '🇧🇩', desc: 'Bangladeshi Passport' },
  { value: 'Sri Lanka', label: 'Sri Lanka', icon: '🇱🇰', desc: 'Sri Lankan Passport' },
  { value: 'Philippines', label: 'Philippines', icon: '🇵🇭', desc: 'Philippine Passport' },
  { value: 'Nigeria', label: 'Nigeria', icon: '🇳🇬', desc: 'Nigerian Passport' },
  { value: 'Pakistan', label: 'Pakistan', icon: '🇵🇰', desc: 'Pakistani Passport' },
  { value: 'UAE', label: 'UAE', icon: '🇦🇪', desc: 'Emirati Passport' },
  { value: 'Canada', label: 'Canada', icon: '🇨🇦', desc: 'Canadian Passport' },
  { value: 'United States', label: 'United States', icon: '🇺🇸', desc: 'US Passport' },
  { value: 'United Kingdom', label: 'United Kingdom', icon: '🇬🇧', desc: 'British Passport' },
  { value: 'Australia', label: 'Australia', icon: '🇦🇺', desc: 'Australian Passport' },
  { value: 'Other', label: 'Other Country', icon: '🌍', desc: 'All Passports' },
];

const journeyDestinationOptions = [
  { value: 'Canada', label: 'Canada', icon: '🇨🇦', desc: 'Top for PR & Student Visas' },
  { value: 'United States', label: 'United States', icon: '🇺🇸', desc: 'F-1, H-1B, L-1 & EB Visas' },
  { value: 'United Kingdom', label: 'United Kingdom', icon: '🇬🇧', desc: 'Student, Skilled Worker, PSW' },
  { value: 'Australia', label: 'Australia', icon: '🇦🇺', desc: 'Subclass 500, 482, 189 & 190' },
  { value: 'Germany', label: 'Germany', icon: '🇩🇪', desc: 'EU Blue Card & Opportunity Card' },
  { value: 'Ireland', label: 'Ireland', icon: '🇮🇪', desc: 'European Tech Hub & Stamp 1G' },
  { value: 'New Zealand', label: 'New Zealand', icon: '🇳🇿', desc: 'Skilled Migrant & Post Study' },
  { value: 'UAE', label: 'UAE / Dubai', icon: '🇦🇪', desc: 'Golden Visa & Remote Work' },
  { value: 'Singapore', label: 'Singapore', icon: '🇸🇬', desc: 'EP, S-Pass & Global Investor' },
  { value: 'France', label: 'France / Schengen', icon: '🇫🇷', desc: 'Talent Passport & Europe Stay' },
  { value: 'Japan', label: 'Japan', icon: '🇯🇵', desc: 'SSW & Skilled Professional' },
];

const travelPurposeOptions = [
  { value: 'study', label: 'Study Abroad & Degree', icon: '🎓', desc: 'Universities, Colleges & Student Visas' },
  { value: 'work', label: 'Work Permit & Employment', icon: '💼', desc: 'Job Sponsorship, LMIA & Work Visas' },
  { value: 'pr', label: 'PR & Migration Settlement', icon: '🏡', desc: 'Express Entry, PNP & Direct PR' },
  { value: 'visit', label: 'Tourist & Visitor Stay', icon: '🏝️', desc: 'Short-stay, Holidays & Family' },
  { value: 'business', label: 'Business & Investor', icon: '💼', desc: 'Startups, Entrepreneur & Investor' },
  { value: 'transit', label: 'Transit & Layover Visa', icon: '✈️', desc: 'Airport transit & Stopover Visas' },
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

const getLocationsByCountry = (country: string) => {
  const c = (country || '').toLowerCase().trim();
  if (c === 'canada') {
    return [
      { value: 'ontario', label: 'Ontario (Toronto, Ottawa)', icon: '🇨🇦', desc: 'Top universities & tech hub' },
      { value: 'bc', label: 'British Columbia (Vancouver, Victoria)', icon: '🇨🇦', desc: 'Pacific gateway & top colleges' },
      { value: 'alberta', label: 'Alberta (Calgary, Edmonton)', icon: '🇨🇦', desc: 'Energy, tech & fast PNP pathways' },
      { value: 'quebec', label: 'Quebec (Montreal, Quebec City)', icon: '🇨🇦', desc: 'Bilingual cultural & research hub' },
      { value: 'manitoba', label: 'Manitoba (Winnipeg)', icon: '🇨🇦', desc: 'Affordable study & high PR success' },
      { value: 'novascotia', label: 'Nova Scotia (Halifax)', icon: '🇨🇦', desc: 'Atlantic Immigration Program (AIP)' },
      { value: 'saskatchewan', label: 'Saskatchewan (Saskatoon, Regina)', icon: '🇨🇦', desc: 'High demand tech & agriculture PNP' },
      { value: 'newbrunswick', label: 'New Brunswick (Moncton, Fredericton)', icon: '🇨🇦', desc: 'Atlantic growth stream' },
      { value: 'all_canada', label: 'All Canada / Nationwide', icon: '🍁', desc: 'Pan Canada search' },
    ];
  }
  if (c === 'usa' || c === 'united states') {
    return [
      { value: 'california', label: 'California (Silicon Valley, LA, SF)', icon: '🇺🇸', desc: 'Tech & innovation capital' },
      { value: 'newyork', label: 'New York (NYC, Buffalo)', icon: '🇺🇸', desc: 'Global finance & Ivy League' },
      { value: 'texas', label: 'Texas (Austin, Dallas, Houston)', icon: '🇺🇸', desc: 'Booming tech & zero state income tax' },
      { value: 'massachusetts', label: 'Massachusetts (Boston, Cambridge)', icon: '🇺🇸', desc: 'Harvard & MIT education hub' },
      { value: 'washington', label: 'Washington (Seattle)', icon: '🇺🇸', desc: 'Amazon & Microsoft tech center' },
      { value: 'illinois', label: 'Illinois (Chicago)', icon: '🇺🇸', desc: 'Midwest economic center' },
      { value: 'florida', label: 'Florida (Miami, Orlando, Tampa)', icon: '🇺🇸', desc: 'International commerce & tech' },
      { value: 'all_usa', label: 'All USA / Nationwide', icon: '🗽', desc: 'Pan USA search' },
    ];
  }
  if (c === 'uk' || c === 'united kingdom') {
    return [
      { value: 'london', label: 'Greater London', icon: '🇬🇧', desc: 'World financial & education capital' },
      { value: 'manchester', label: 'Manchester & North West', icon: '🇬🇧', desc: 'Top student city & tech hub' },
      { value: 'birmingham', label: 'West Midlands (Birmingham)', icon: '🇬🇧', desc: 'UK manufacturing & central hub' },
      { value: 'scotland', label: 'Scotland (Edinburgh, Glasgow)', icon: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', desc: 'Prestigious historic universities' },
      { value: 'wales', label: 'Wales (Cardiff, Swansea)', icon: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', desc: 'Affordable study & scenic coasts' },
      { value: 'yorkshire', label: 'Yorkshire (Leeds, Sheffield)', icon: '🇬🇧', desc: 'Healthcare, engineering & AI' },
      { value: 'all_uk', label: 'All UK / Nationwide', icon: '🏰', desc: 'Pan UK search' },
    ];
  }
  if (c === 'australia') {
    return [
      { value: 'nsw', label: 'New South Wales (Sydney)', icon: '🇦🇺', desc: 'Top global universities & finance' },
      { value: 'victoria', label: 'Victoria (Melbourne)', icon: '🇦🇺', desc: 'Cultural & tech capital' },
      { value: 'queensland', label: 'Queensland (Brisbane, Gold Coast)', icon: '🇦🇺', desc: 'High quality life & tourism hub' },
      { value: 'wa', label: 'Western Australia (Perth)', icon: '🇦🇺', desc: 'Mining, engineering & regional PR' },
      { value: 'sa', label: 'South Australia (Adelaide)', icon: '🇦🇺', desc: 'Designated regional migration benefits' },
      { value: 'act', label: 'ACT (Canberra)', icon: '🇦🇺', desc: 'Government, policy & research' },
      { value: 'all_au', label: 'All Australia / Nationwide', icon: '🦘', desc: 'Pan Australia search' },
    ];
  }
  if (c === 'germany') {
    return [
      { value: 'bavaria', label: 'Bavaria (Munich, Nuremberg)', icon: '🇩🇪', desc: 'Automotive, aerospace & high tech' },
      { value: 'berlin', label: 'Berlin', icon: '🇩🇪', desc: 'Startup hub & vibrant cultural capital' },
      { value: 'nrw', label: 'North Rhine-Westphalia (Cologne, Düsseldorf)', icon: '🇩🇪', desc: 'Largest industrial economic zone' },
      { value: 'baden', label: 'Baden-Württemberg (Stuttgart)', icon: '🇩🇪', desc: 'Engineering & Mercedes/Porsche hub' },
      { value: 'hesse', label: 'Hesse (Frankfurt)', icon: '🇩🇪', desc: 'European Central Bank & fintech' },
      { value: 'hamburg', label: 'Hamburg', icon: '🇩🇪', desc: 'Port logistics & media center' },
      { value: 'all_de', label: 'All Germany / Nationwide', icon: '🍺', desc: 'Pan Germany search' },
    ];
  }
  if (c === 'ireland') {
    return [
      { value: 'dublin', label: 'Dublin', icon: '🇮🇪', desc: 'European tech HQ & Silicon Docks' },
      { value: 'cork', label: 'Cork', icon: '🇮🇪', desc: 'Biotech & pharmaceutical powerhouse' },
      { value: 'galway', label: 'Galway', icon: '🇮🇪', desc: 'Medical devices & arts capital' },
      { value: 'limerick', label: 'Limerick', icon: '🇮🇪', desc: 'Aviation & STEM innovation' },
      { value: 'all_ie', label: 'All Ireland / Nationwide', icon: '☘️', desc: 'Pan Ireland search' },
    ];
  }
  if (c === 'new zealand') {
    return [
      { value: 'auckland', label: 'Auckland', icon: '🇳🇿', desc: 'Major economic & university city' },
      { value: 'wellington', label: 'Wellington', icon: '🇳🇿', desc: 'Government, film & creative capital' },
      { value: 'canterbury', label: 'Canterbury (Christchurch)', icon: '🇳🇿', desc: 'South Island innovation center' },
      { value: 'otago', label: 'Otago (Dunedin, Queenstown)', icon: '🇳🇿', desc: 'Historic medical & student hub' },
      { value: 'all_nz', label: 'All New Zealand', icon: '🥝', desc: 'Pan New Zealand search' },
    ];
  }
  if (c === 'uae') {
    return [
      { value: 'dubai', label: 'Dubai', icon: '🇦🇪', desc: 'Global business, tax-free & tourism' },
      { value: 'abudhabi', label: 'Abu Dhabi', icon: '🇦🇪', desc: 'Capital city & clean energy hub' },
      { value: 'sharjah', label: 'Sharjah', icon: '🇦🇪', desc: 'University City & cultural center' },
      { value: 'ajman', label: 'Ajman & RAK', icon: '🇦🇪', desc: 'Free zone business & maritime' },
      { value: 'all_ae', label: 'All UAE / Nationwide', icon: '🐪', desc: 'Pan UAE search' },
    ];
  }
  // Default when no destination country is chosen
  return [
    { value: 'delhi', label: 'Delhi NCR', icon: '📍', desc: 'Capital Region' },
    { value: 'mumbai', label: 'Mumbai', icon: '📍', desc: 'Maharashtra' },
    { value: 'bengaluru', label: 'Bengaluru', icon: '📍', desc: 'Karnataka' },
    { value: 'punjab', label: 'Punjab / Chandigarh', icon: '📍', desc: 'North Hub' },
    { value: 'hyderabad', label: 'Hyderabad', icon: '📍', desc: 'Telangana' },
    { value: 'gujarat', label: 'Gujarat', icon: '📍', desc: 'Ahmedabad & Surat' },
    { value: 'chennai', label: 'Chennai', icon: '📍', desc: 'Tamil Nadu' },
    { value: 'remote', label: 'Online / Pan India', icon: '🌐', desc: 'Virtual Consultation' },
  ];
};

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
  const [selectedPill, setSelectedPill] = useState<string>('student');

  // Journey Engine Form State (Replacing holiday budget/vibe/duration)
  const [passportCountry, setPassportCountry] = useState('India');
  const [journeyDestination, setJourneyDestination] = useState('Canada');
  const [travelPurpose, setTravelPurpose] = useState('study');
  const [hasVisaAlready, setHasVisaAlready] = useState<'no' | 'yes'>('no');
  
  // Custom dropdown open states for Journey Form
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isJourneyDestOpen, setIsJourneyDestOpen] = useState(false);
  const [isPurposeOpen, setIsPurposeOpen] = useState(false);
  const passportRef = useRef<HTMLDivElement>(null);
  const journeyDestRef = useRef<HTMLDivElement>(null);
  const purposeRef = useRef<HTMLDivElement>(null);

  // FLOW 1: "VISA APPROVED & READY" Dashboard State
  const [approvedVisaType, setApprovedVisaType] = useState('Student Visa (Subclass 500 / Study Permit)');
  const [approvalDate, setApprovalDate] = useState('2026-04-15');
  const [validityDate, setValidityDate] = useState('2028-08-30');
  const [isOcrScanning, setIsOcrScanning] = useState(false);
  const [ocrScanned, setOcrScanned] = useState(false);
  const [ocrConditions, setOcrConditions] = useState<string[]>([
    'Condition 8105: Work 48 hrs / fortnight allowed during academic term',
    'Condition 8501: Maintain mandatory international health cover (OSHC)',
    'Multiple Entry Visa: Permitted unlimited exits and entries prior to expiry',
    'Full-time study load requirement at designated learning institution (DLI)',
  ]);
  
  // Action Checklist Checklist States
  const [ticketScanning, setTicketScanning] = useState(false);
  const [flightTicketUploaded, setFlightTicketUploaded] = useState(false);
  const [transitCheckResult, setTransitCheckResult] = useState<string | null>(null);
  const [pickupFlightNum, setPickupFlightNum] = useState('');
  const [pickupConfirmed, setPickupConfirmed] = useState(false);
  const [housingStatus, setHousingStatus] = useState<'exploring' | 'verified' | 'booked'>('exploring');
  const [peerNetworkJoined, setPeerNetworkJoined] = useState(false);
  const [forexCardOrdered, setForexCardOrdered] = useState(false);
  const [customsChecklistDone, setCustomsChecklistDone] = useState<Record<string, boolean>>({
    cash: true,
    meds: true,
    food: false,
    docs: true,
  });

  // Interactive Form State
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

  // Dynamically resolve state/province locations based on chosen destination country
  const activeLocations = getLocationsByCountry(searchCountry);

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
      if (passportRef.current && !passportRef.current.contains(target)) setIsPassportOpen(false);
      if (journeyDestRef.current && !journeyDestRef.current.contains(target)) setIsJourneyDestOpen(false);
      if (purposeRef.current && !purposeRef.current.contains(target)) setIsPurposeOpen(false);
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
    let newDest = destination || 'Canada';
    let newVibe = 'Study';
    let newBudget = budget || '15,00,000';

    if (pillId === 'study') {
      newVibe = 'Study';
      newDest = 'Canada';
      newBudget = '15,00,000';
    } else if (pillId === 'holiday' || pillId === 'tourist') {
      newVibe = 'Holiday';
      newDest = 'Dubai';
      newBudget = '75,000';
    } else if (pillId === 'business' || pillId === 'investor') {
      newVibe = 'Business';
      newDest = 'USA';
      newBudget = '30,00,000';
    } else if (pillId === 'work') {
      newVibe = 'Work';
      newDest = 'Germany';
      newBudget = '5,00,000';
    } else if (pillId === 'pr' || pillId === 'citizenship') {
      newVibe = 'PR';
      newDest = 'Australia';
      newBudget = '10,00,000';
    } else if (pillId === 'family') {
      newVibe = 'Family';
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
            
            <p className="mt-3 text-slate-600 text-sm sm:text-base font-medium max-w-xl mx-auto leading-relaxed">
              From dream to reality, we make your overseas journey process and visas easy to apply and smooth journey.
            </p>

            {/* FLOATING PROMPT INPUT */}
            <div className="w-full max-w-3xl mt-7 mx-auto px-1 sm:px-0">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center bg-white border border-purple-200/90 rounded-full pl-3.5 sm:pl-6 pr-1.5 sm:pr-2.5 py-1.5 sm:py-2.5 shadow-[0_10px_35px_rgb(91,44,111,0.08)] hover:shadow-[0_12px_40px_rgb(91,44,111,0.14)] transition-all">
                <span className="text-purple-600 mr-2 sm:mr-3 text-base sm:text-xl shrink-0">✨</span>
                <input 
                  type="text" 
                  value={searchPrompt}
                  onChange={(e) => setSearchPrompt(e.target.value)}
                  placeholder="Select Passport Country, Destination, and Visa Type (e.g., Indian Passport to Australia Skilled Migration)..." 
                  className="w-full bg-transparent border-none text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-0 text-xs sm:text-sm md:text-[15px] font-medium mr-2 sm:mr-3 truncate"
                />
                <button 
                  type="submit"
                  className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-[#00A86B] hover:bg-[#008f5a] text-white flex items-center justify-center shadow-md hover:shadow-lg transition-transform active:scale-95 shrink-0 cursor-pointer"
                  title="Search Pathway"
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                </button>
              </form>
            </div>
          </div>

          {/* QUICK-PILL INTENT TAGS (STRICT 1-ROW FLEX CONTAINER) */}
          <div className="mt-8 flex flex-nowrap items-center justify-start sm:justify-center gap-2.5 sm:gap-3 max-w-6xl mx-auto w-full overflow-x-auto no-scrollbar pb-1">
            {categoryPills.map((pill) => {
              const isSelected = selectedPill === pill.id;
              return (
                <button 
                  key={pill.id} 
                  type="button"
                  onClick={() => handlePillClick(pill.id, pill.label)}
                  className={`flex flex-col items-center justify-center bg-white border rounded-2xl px-3 py-2.5 shadow-2xs hover:shadow-md transition-all shrink-0 min-w-[88px] sm:min-w-[98px] h-[74px] cursor-pointer select-none ${
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

          {/* ── 2. PLAN YOUR OVERSEAS JOURNEY FORM CARD (NO BUDGET / NO VIBE) ── */}
          <div className="relative z-30 w-full max-w-6xl mx-auto mt-8 bg-white border border-slate-200/90 rounded-2xl sm:rounded-[30px] p-5 sm:p-7 md:p-8 shadow-[0_14px_45px_rgba(0,0,0,0.06)] text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shadow-2xs">
                  <Compass className="w-5 h-5 text-[#00A86B]" />
                </div>
                <div>
                  <h2 className="text-[#30005a] font-black text-base sm:text-lg tracking-tight">
                    Plan Your Overseas Journey
                  </h2>
                  <p className="text-xs text-slate-500 font-semibold">
                    Smart pathway matching for study, employment, migration &amp; travel.
                  </p>
                </div>
              </div>

              {/* Radio Toggle: Have Visa Already? */}
              <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/90 p-1.5 rounded-2xl shrink-0 self-start sm:self-auto">
                <span className="text-[11px] font-bold text-slate-600 pl-2">Have Visa Already?</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setHasVisaAlready('no')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      hasVisaAlready === 'no'
                        ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    NO
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasVisaAlready('yes')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                      hasVisaAlready === 'yes'
                        ? 'bg-[#00A86B] text-white shadow-sm shadow-emerald-600/20'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span>YES</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                  </button>
                </div>
              </div>
            </div>

            {/* Form Inputs Grid (4 Fields: Passport, Destination, Purpose, Action) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 items-center">
              
              {/* Field 1: Citizenship / Passport Country */}
              <div className="relative">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Passport Country
                </label>
                <div
                  ref={passportRef}
                  onClick={() => {
                    setIsPassportOpen(!isPassportOpen);
                    setIsJourneyDestOpen(false);
                    setIsPurposeOpen(false);
                  }}
                  className="relative bg-slate-50/90 hover:bg-slate-50 border border-slate-200/90 hover:border-[#00A86B]/60 rounded-2xl h-[52px] px-3.5 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <span className="text-base shrink-0">
                      {passportCountryOptions.find(o => o.value === passportCountry)?.icon || '🇮🇳'}
                    </span>
                    <div className="min-w-0">
                      <span className="text-xs sm:text-sm font-bold text-slate-800 truncate block">
                        {passportCountryOptions.find(o => o.value === passportCountry)?.label || passportCountry}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isPassportOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                  {isPassportOpen && (
                    <div
                      className="absolute top-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[260px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Select Citizenship
                      </div>
                      <div className="space-y-0.5">
                        {passportCountryOptions.map((opt) => {
                          const isSelected = passportCountry === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setPassportCountry(opt.value);
                                setIsPassportOpen(false);
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
              </div>

              {/* Field 2: Destination Country */}
              <div className="relative">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Destination Country
                </label>
                <div
                  ref={journeyDestRef}
                  onClick={() => {
                    setIsJourneyDestOpen(!isJourneyDestOpen);
                    setIsPassportOpen(false);
                    setIsPurposeOpen(false);
                  }}
                  className="relative bg-slate-50/90 hover:bg-slate-50 border border-slate-200/90 hover:border-[#00A86B]/60 rounded-2xl h-[52px] px-3.5 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <span className="text-base shrink-0">
                      {journeyDestinationOptions.find(o => o.value === journeyDestination)?.icon || '🇨🇦'}
                    </span>
                    <div className="min-w-0">
                      <span className="text-xs sm:text-sm font-bold text-slate-800 truncate block">
                        {journeyDestinationOptions.find(o => o.value === journeyDestination)?.label || journeyDestination}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isJourneyDestOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                  {isJourneyDestOpen && (
                    <div
                      className="absolute top-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[260px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Where do you want to go?
                      </div>
                      <div className="space-y-0.5">
                        {journeyDestinationOptions.map((opt) => {
                          const isSelected = journeyDestination === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setJourneyDestination(opt.value);
                                setIsJourneyDestOpen(false);
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
              </div>

              {/* Field 3: Purpose of Travel */}
              <div className="relative">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Purpose of Travel
                </label>
                <div
                  ref={purposeRef}
                  onClick={() => {
                    setIsPurposeOpen(!isPurposeOpen);
                    setIsPassportOpen(false);
                    setIsJourneyDestOpen(false);
                  }}
                  className="relative bg-slate-50/90 hover:bg-slate-50 border border-slate-200/90 hover:border-[#00A86B]/60 rounded-2xl h-[52px] px-3.5 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <span className="text-base shrink-0">
                      {travelPurposeOptions.find(o => o.value === travelPurpose)?.icon || '🎓'}
                    </span>
                    <div className="min-w-0">
                      <span className="text-xs sm:text-sm font-bold text-slate-800 truncate block">
                        {travelPurposeOptions.find(o => o.value === travelPurpose)?.label || travelPurpose}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isPurposeOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                  {isPurposeOpen && (
                    <div
                      className="absolute top-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[260px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Select Purpose
                      </div>
                      <div className="space-y-0.5">
                        {travelPurposeOptions.map((opt) => {
                          const isSelected = travelPurpose === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setTravelPurpose(opt.value);
                                setIsPurposeOpen(false);
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
              </div>

              {/* Field 4: Primary Action Button */}
              <div className="pt-5 sm:pt-4">
                {hasVisaAlready === 'no' ? (
                  <a
                    href={`/find-experts?country=${encodeURIComponent(journeyDestination)}&category=${travelPurpose}`}
                    className="w-full h-[52px] px-5 rounded-2xl bg-[#00A86B] hover:bg-[#008f5a] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-[#00A86B]/25 hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer select-none"
                  >
                    <span>Find Visa Experts &amp; Pathway</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('visa-journey-engine-dashboard');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="w-full h-[52px] px-5 rounded-2xl bg-[#30005a] hover:bg-[#20003e] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-purple-950/20 hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer select-none"
                  >
                    <Sparkles className="w-4 h-4 text-purple-300" />
                    <span>Open Journey Engine</span>
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* ── 3. FLOW 1: "VISA APPROVED & READY" JOURNEY DASHBOARD (APPLE-LIKE GLASSMORPHISM) ── */}
          {hasVisaAlready === 'yes' && (
            <div id="visa-journey-engine-dashboard" className="w-full max-w-6xl mx-auto mt-8 text-left animate-fadeIn space-y-6">
              
              {/* Top Banner: Visa Status Active & Destination Confirmation */}
              <div className="bg-gradient-to-r from-emerald-500 via-[#00A86B] to-teal-600 rounded-2xl sm:rounded-[28px] p-5 sm:p-7 text-white shadow-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shrink-0 text-2xl shadow-sm">
                      ✈️
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-black uppercase tracking-wider mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
                        <span>Visa Approved &amp; Active</span>
                      </div>
                      <h3 className="text-lg sm:text-2xl font-black tracking-tight">
                        Your Overseas Journey to {journeyDestination}
                      </h3>
                      <p className="text-xs sm:text-sm text-emerald-50 font-medium">
                        Passport: <strong>{passportCountry}</strong> • Purpose: <strong>{travelPurposeOptions.find(o => o.value === travelPurpose)?.label || travelPurpose}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="px-4 py-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-left">
                      <span className="text-[10px] uppercase font-bold text-emerald-100 block">Status</span>
                      <span className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                        <span>Ready for Departure</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 1: VISA DETAILS & OCR SCANNER CARD */}
              <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-[28px] p-5 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700">
                      <FileCheck2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                        Step 1: Visa Verification &amp; Auto-Renewal Tracker
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Record valid visa dates and scan document to auto-detect conditions.
                      </p>
                    </div>
                  </div>

                  {/* Auto-Renewal Reminder Pill */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold shrink-0">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Auto-renewal active • {getDaysRemaining(validityDate)} days left</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  {/* Visa Type Input */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Visa Category / Subclass</label>
                    <input
                      type="text"
                      value={approvedVisaType}
                      onChange={(e) => setApprovedVisaType(e.target.value)}
                      placeholder="e.g. Student Subclass 500"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#00A86B]"
                    />
                  </div>

                  {/* Approval Date */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Grant / Approval Date</label>
                    <input
                      type="date"
                      value={approvalDate}
                      onChange={(e) => setApprovalDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#00A86B]"
                    />
                  </div>

                  {/* Expiry / Validity Date */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Visa Expiry Date</label>
                    <input
                      type="date"
                      value={validityDate}
                      onChange={(e) => setValidityDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#00A86B]"
                    />
                  </div>
                </div>

                {/* OCR Scan Visa Document Banner */}
                <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-2xs shrink-0">
                      <QrCode className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h5 className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-2">
                        <span>OCR Scan Visa Document / Grant Letter</span>
                        {ocrScanned && <span className="text-[10px] font-black text-[#00A86B] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">VERIFIED ✓</span>}
                      </h5>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Upload your grant PDF or photo. Our AI OCR engine extracts stay conditions and work limits automatically.
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSimulateOcrScan}
                      disabled={isOcrScanning}
                      className="px-4 py-2.5 rounded-xl bg-[#30005a] hover:bg-[#20003e] text-white text-xs font-extrabold shadow-sm transition-all cursor-pointer flex items-center gap-2 active:scale-95 disabled:opacity-75"
                    >
                      {isOcrScanning ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Scanning Visa...</span>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="w-4 h-4 text-purple-300" />
                          <span>{ocrScanned ? 'Re-scan Document' : 'Scan Visa Document'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Extracted Condition Tags */}
                {ocrScanned && (
                  <div className="mt-4 pt-3 border-t border-slate-100 animate-fadeIn">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                      Extracted Visa Conditions &amp; Entitlements
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ocrConditions.map((cond, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs font-bold text-slate-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00A86B] shrink-0" />
                          <span className="truncate">{cond}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* STEP 2: "MY OVERSEAS JOURNEY" INTERACTIVE ACTION CHECKLIST (6 ACTION MODULES) */}
              <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-[28px] p-5 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#00A86B]">
                      <Luggage className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                        Step 2: &quot;My Overseas Journey&quot; Interactive Action Checklist
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Essential pre-departure tools, transit visa check, housing &amp; airport assistance.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 6 Action Checklist Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  
                  {/* Action 1: ✈️ Flight Booking & Transit Visa Check */}
                  <div className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">✈️</span>
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100">Transit Visa</span>
                      </div>
                      <h5 className="text-xs sm:text-sm font-extrabold text-slate-900">Flight &amp; Transit Visa Check</h5>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        Scan flight ticket to check layover airport transit rules (Heathrow, Doha, Frankfurt).
                      </p>

                      {transitCheckResult && (
                        <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] font-bold text-emerald-900">
                          {transitCheckResult}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCheckTransit}
                        disabled={ticketScanning}
                        className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        {ticketScanning ? 'Checking Rules...' : 'Check Transit Rules'}
                      </button>
                    </div>
                  </div>

                  {/* Action 2: 🚘 Airport Pickup Confirmation */}
                  <div className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">🚘</span>
                        <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${pickupConfirmed ? 'bg-emerald-50 text-[#00A86B] border border-emerald-200' : 'bg-slate-100 text-slate-600'}`}>
                          {pickupConfirmed ? 'Booked ✓' : 'Optional'}
                        </span>
                      </div>
                      <h5 className="text-xs sm:text-sm font-extrabold text-slate-900">Airport Pickup &amp; Meet</h5>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        Record arrival flight slot to request verified student / migrant driver pickup.
                      </p>

                      <div className="mt-3 space-y-2">
                        <input
                          type="text"
                          value={pickupFlightNum}
                          onChange={(e) => setPickupFlightNum(e.target.value)}
                          placeholder="Arrival Flight No. (e.g. AC 043)"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setPickupConfirmed(!pickupConfirmed)}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          pickupConfirmed ? 'bg-emerald-50 text-[#00A86B] border border-emerald-200' : 'bg-[#00A86B] hover:bg-[#008f5a] text-white'
                        }`}
                      >
                        {pickupConfirmed ? 'Pickup Slot Confirmed ✓' : 'Confirm Airport Transfer'}
                      </button>
                    </div>
                  </div>

                  {/* Action 3: 🏠 Accommodation Confirmation */}
                  <div className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">🏠</span>
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">Housing</span>
                      </div>
                      <h5 className="text-xs sm:text-sm font-extrabold text-slate-900">Verified Accommodation</h5>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        Connect with verified student dorms, homestays, and rental apartments with escrow protection.
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                      <a
                        href="/classifieds?category=accommodation"
                        className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold text-center transition-all flex items-center justify-center gap-1"
                      >
                        <span>Find Housing in {journeyDestination}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Action 4: 👥 Peer Network */}
                  <div className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">👥</span>
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#00A86B] border border-emerald-200">Community</span>
                      </div>
                      <h5 className="text-xs sm:text-sm font-extrabold text-slate-900">Peer Network &amp; Arrivals</h5>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        Connect with other verified visa holders heading to {journeyDestination} in Fall 2026.
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setPeerNetworkJoined(!peerNetworkJoined)}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          peerNetworkJoined ? 'bg-emerald-50 text-[#00A86B] border border-emerald-200' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        {peerNetworkJoined ? 'Joined ' + journeyDestination + ' Group ✓' : 'Join Peer Community'}
                      </button>
                    </div>
                  </div>

                  {/* Action 5: 💳 Forex & eSIM Connectivity */}
                  <div className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">💳</span>
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100">Forex &amp; SIM</span>
                      </div>
                      <h5 className="text-xs sm:text-sm font-extrabold text-slate-900">Forex Card &amp; 5G eSIM</h5>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        Zero-forex multi-currency card &amp; instant QR code 5G eSIM before boarding flight.
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setForexCardOrdered(!forexCardOrdered)}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          forexCardOrdered ? 'bg-emerald-50 text-[#00A86B] border border-emerald-200' : 'bg-slate-900 hover:bg-black text-white'
                        }`}
                      >
                        {forexCardOrdered ? 'Forex & eSIM Reserved ✓' : 'Get Forex Card & eSIM'}
                      </button>
                    </div>
                  </div>

                  {/* Action 6: 📑 Customs & Travel Rules Guide */}
                  <div className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">📑</span>
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100">Customs</span>
                      </div>
                      <h5 className="text-xs sm:text-sm font-extrabold text-slate-900">Customs &amp; Arrival Rules</h5>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        Cash declaration limits, prescribed medications certificate &amp; biosecurity declaration.
                      </p>

                      <div className="mt-3 space-y-1.5 text-[11px] font-semibold text-slate-700">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={customsChecklistDone.cash} onChange={(e) => setCustomsChecklistDone({ ...customsChecklistDone, cash: e.target.checked })} className="rounded text-[#00A86B] focus:ring-0" />
                          <span>Under $10,000 USD cash limit</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={customsChecklistDone.meds} onChange={(e) => setCustomsChecklistDone({ ...customsChecklistDone, meds: e.target.checked })} className="rounded text-[#00A86B] focus:ring-0" />
                          <span>Doctor&apos;s letter for medications</span>
                        </label>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <a
                        href="/visa-guide"
                        className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold text-center transition-all block"
                      >
                        Read Arrival Guide →
                      </a>
                    </div>
                  </div>

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
                            onClick={() => { setSearchCountry(''); setSearchLocation(''); setIsCountryOpen(false); }}
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
                                onClick={() => { setSearchCountry(opt.value); setSearchLocation(''); setIsCountryOpen(false); }}
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
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location / State</label>
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
                      <span className="text-sm shrink-0">{activeLocations.find(o => o.value === searchLocation)?.icon || '📍'}</span>
                      <span className={`text-sm font-semibold truncate ${searchLocation ? 'text-slate-800 font-bold' : 'text-slate-400'}`}>
                        {activeLocations.find(o => o.value === searchLocation)?.label || (searchCountry ? `Select ${searchCountry} State / Province` : 'State / City')}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isLocationOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                    {isLocationOpen && (
                      <div
                        className="absolute bottom-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[230px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {searchCountry ? `${searchCountry} States & Provinces` : 'Choose State / Region'}
                        </div>
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
                          {activeLocations.map((opt) => {
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
                                  <span className="text-base shrink-0">{opt.icon}</span>
                                  <div className="truncate text-left">
                                    <span className="block truncate font-bold text-slate-800 text-xs sm:text-sm">{opt.label}</span>
                                    {opt.desc && <span className="block text-[10px] text-slate-400 truncate font-normal">{opt.desc}</span>}
                                  </div>
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
                            onClick={() => { setSearchCountry(''); setSearchLocation(''); setIsCountryOpen(false); }}
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
                                onClick={() => { setSearchCountry(opt.value); setSearchLocation(''); setIsCountryOpen(false); }}
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
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location / State</label>
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
                      <span className="text-sm shrink-0">{activeLocations.find(o => o.value === searchLocation)?.icon || '📍'}</span>
                      <span className={`text-sm font-semibold truncate ${searchLocation ? 'text-slate-800 font-bold' : 'text-slate-400'}`}>
                        {activeLocations.find(o => o.value === searchLocation)?.label || (searchCountry ? `Select ${searchCountry} State / Province` : 'State / City')}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isLocationOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                    {isLocationOpen && (
                      <div
                        className="absolute bottom-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[230px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {searchCountry ? `${searchCountry} States & Provinces` : 'Choose State / Region'}
                        </div>
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
                          {activeLocations.map((opt) => {
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
                                  <span className="text-base shrink-0">{opt.icon}</span>
                                  <div className="truncate text-left">
                                    <span className="block truncate font-bold text-slate-800 text-xs sm:text-sm">{opt.label}</span>
                                    {opt.desc && <span className="block text-[10px] text-slate-400 truncate font-normal">{opt.desc}</span>}
                                  </div>
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
                            onClick={() => { setSearchCountry(''); setSearchLocation(''); setIsCountryOpen(false); }}
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
                                onClick={() => { setSearchCountry(opt.value); setSearchLocation(''); setIsCountryOpen(false); }}
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
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location / State</label>
                  <div
                    ref={locationRef}
                    className="relative bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 rounded-2xl h-[52px] px-4 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                    onClick={() => {
                      setIsLocationOpen(!isLocationOpen);
                      setIsCountryOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="text-sm shrink-0">{activeLocations.find(o => o.value === searchLocation)?.icon || '📍'}</span>
                      <span className={`text-sm font-semibold truncate ${searchLocation ? 'text-slate-800 font-bold' : 'text-slate-400'}`}>
                        {activeLocations.find(o => o.value === searchLocation)?.label || (searchCountry ? `Select ${searchCountry} State / Province` : 'State / City')}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isLocationOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                    {isLocationOpen && (
                      <div
                        className="absolute bottom-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[230px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {searchCountry ? `${searchCountry} States & Provinces` : 'Choose State / Region'}
                        </div>
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
                          {activeLocations.map((opt) => {
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
                                  <span className="text-base shrink-0">{opt.icon}</span>
                                  <div className="truncate text-left">
                                    <span className="block truncate font-bold text-slate-800 text-xs sm:text-sm">{opt.label}</span>
                                    {opt.desc && <span className="block text-[10px] text-slate-400 truncate font-normal">{opt.desc}</span>}
                                  </div>
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
                            onClick={() => { setSearchCountry(''); setSearchLocation(''); setIsCountryOpen(false); }}
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
                                onClick={() => { setSearchCountry(opt.value); setSearchLocation(''); setIsCountryOpen(false); }}
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
                            onClick={() => { setSearchCountry(''); setSearchLocation(''); setIsCountryOpen(false); }}
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
                                onClick={() => { setSearchCountry(opt.value); setSearchLocation(''); setIsCountryOpen(false); }}
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
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location / State</label>
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
                      <span className="text-sm shrink-0">{activeLocations.find(o => o.value === searchLocation)?.icon || '📍'}</span>
                      <span className={`text-sm font-semibold truncate ${searchLocation ? 'text-slate-800 font-bold' : 'text-slate-400'}`}>
                        {activeLocations.find(o => o.value === searchLocation)?.label || (searchCountry ? `Select ${searchCountry} State / Province` : 'State / City')}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isLocationOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                    {isLocationOpen && (
                      <div
                        className="absolute bottom-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[230px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {searchCountry ? `${searchCountry} States & Provinces` : 'Choose State / Region'}
                        </div>
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
                          {activeLocations.map((opt) => {
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
                                  <span className="text-base shrink-0">{opt.icon}</span>
                                  <div className="truncate text-left">
                                    <span className="block truncate font-bold text-slate-800 text-xs sm:text-sm">{opt.label}</span>
                                    {opt.desc && <span className="block text-[10px] text-slate-400 truncate font-normal">{opt.desc}</span>}
                                  </div>
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
