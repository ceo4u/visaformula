'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, Home, Building2, UserCheck, LayoutGrid, Upload,
  RefreshCw,
  Sparkles,
  ArrowRight,
  MapPin,
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
  Building,
  CheckSquare,
  Award,
  X,
  Plus,
  FileUp,
  Save,
  RotateCw,
  Copy,
  CheckCheck,
  Share2,
  MessageCircle,
  Star,
  PhoneCall,
  Phone,
  BookOpen,
  DollarSign,
  TrendingUp,
  HelpCircle,
  ExternalLink as ExternalIcon } from 'lucide-react';

// Quick-Pill Intent Tags (8 Visa & Overseas Journey Categories)
const categoryPills = [
  { id: 'student', emoji: '🎓', label: 'Student Visa' },
  { id: 'work', emoji: '💼', label: 'Work Permit' },
  { id: 'pr', emoji: '🏡', label: 'PR & Migration' },
  { id: 'tourist', emoji: '🏝️', label: 'Tourist Visa' },
  { id: 'business', emoji: '🏢', label: 'Business & Investor' },
  { id: 'nomad', emoji: '💻', label: 'Digital Nomad Visa' },
  { id: 'ielts', emoji: '🗣️', label: 'IELTS / PTE Test' },
  { id: 'emergency', emoji: '🚨', label: 'Urgent Visa Help' },
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
  { value: 'UAE', label: 'UAE / Dubai', icon: '🇦🇪', desc: 'Student Visas, Golden Visa & Work' },
  { value: 'Canada', label: 'Canada', icon: '🇨🇦', desc: 'Top for PR & Student Visas' },
  { value: 'United Kingdom', label: 'United Kingdom', icon: '🇬🇧', desc: 'Student, Skilled Worker, PSW' },
  { value: 'Australia', label: 'Australia', icon: '🇦🇺', desc: 'Subclass 500, 482, 189 & 190' },
  { value: 'United States', label: 'United States', icon: '🇺🇸', desc: 'F-1, H-1B, L-1 & EB Visas' },
  { value: 'Germany', label: 'Germany', icon: '🇩🇪', desc: 'EU Blue Card & Opportunity Card' },
  { value: 'Ireland', label: 'Ireland', icon: '🇮🇪', desc: 'European Tech Hub & Stamp 1G' },
  { value: 'New Zealand', label: 'New Zealand', icon: '🇳🇿', desc: 'Skilled Migrant & Post Study' },
  { value: 'Singapore', label: 'Singapore', icon: '🇸🇬', desc: 'EP, S-Pass & Global Investor' },
  { value: 'France', label: 'France / Schengen', icon: '🇫🇷', desc: 'Talent Passport & Europe Stay' },
  { value: 'Japan', label: 'Japan', icon: '🇯🇵', desc: 'SSW & Skilled Professional' },
];


const checklistCountryOptions = [
  { value: 'UAE', label: 'United Arab Emirates (UAE / Dubai)', icon: '🇦🇪' },
  { value: 'Canada', label: 'Canada (Study, TRV, Express Entry)', icon: '🇨🇦' },
  { value: 'United States', label: 'United States (B1/B2, F1, H1B)', icon: '🇺🇸' },
  { value: 'United Kingdom', label: 'United Kingdom (Student, Standard)', icon: '🇬🇧' },
  { value: 'Germany', label: 'Germany (Schengen, Opportunity Card)', icon: '🇩🇪' },
  { value: 'Australia', label: 'Australia (Subclass 500, 482, 189)', icon: '🇦🇺' },
];

const travelPurposeOptions = [
  { value: 'study', label: 'Study Visa', icon: '🎓', desc: 'Universities, Colleges & Student Visas' },
  { value: 'visit', label: 'Tourist / Visit', icon: '🏝️', desc: 'Short-stay, Holidays & Family' },
  { value: 'work', label: 'Work Permit', icon: '💼', desc: 'Job Sponsorship, LMIA & Work Visas' },
  { value: 'pr', label: 'PR & Migration', icon: '🏡', desc: 'Express Entry, PNP & Direct PR' },
  { value: 'business', label: 'Business Visa', icon: '💼', desc: 'Startups, Entrepreneur & Investor' },
  { value: 'transit', label: 'Transit Visa', icon: '✈️', desc: 'Airport transit & Stopover Visas' },
];

// Domestic Travel Dropdown Options
// Multi-Country Domestic Travel & Tours Engine
const domesticCountryData: Record<string, {
  name: string;
  flag: string;
  badge: string;
  states: { value: string; label: string; icon: string }[];
  destinations: { value: string; label: string; icon: string }[];
}> = {
  India: {
    name: 'India',
    flag: '🇮🇳',
    badge: '🇮🇳 All India Domestic Tours',
    states: [
      { value: 'Rajasthan', label: 'Rajasthan', icon: '🏰' },
      { value: 'Maharashtra', label: 'Maharashtra', icon: '🏙️' },
      { value: 'Delhi NCR', label: 'Delhi NCR', icon: '🏛️' },
      { value: 'Karnataka', label: 'Karnataka', icon: '🌳' },
      { value: 'Kerala', label: 'Kerala', icon: '🌴' },
      { value: 'Goa', label: 'Goa', icon: '🏖️' },
      { value: 'Gujarat', label: 'Gujarat', icon: '🦁' },
      { value: 'Tamil Nadu', label: 'Tamil Nadu', icon: '🛕' },
      { value: 'Himachal Pradesh', label: 'Himachal Pradesh', icon: '🏔️' },
      { value: 'Uttarakhand', label: 'Uttarakhand', icon: '⛰️' },
      { value: 'West Bengal', label: 'West Bengal', icon: '🪔' },
      { value: 'Other State', label: 'Other State / UT', icon: '📍' },
    ],
    destinations: [
      { value: 'Goa Beach Holiday', label: 'Goa Beach & Water Sports', icon: '🏖️' },
      { value: 'Kerala Backwaters & Munnar', label: 'Kerala Backwaters & Munnar Hills', icon: '🌴' },
      { value: 'Manali, Shimla & Rohtang', label: 'Manali, Shimla & Snow Valleys', icon: '🏔️' },
      { value: 'Rajasthan Heritage Forts', label: 'Jaipur, Udaipur & Royal Forts', icon: '🏰' },
      { value: 'Kashmir Valley & Gulmarg', label: 'Kashmir Valley & Gulmarg Snow Tour', icon: '❄️' },
      { value: 'Varanasi & Ayodhya Circuit', label: 'Varanasi & Ayodhya Spiritual Tour', icon: '🕉️' },
      { value: 'Andaman Island Expedition', label: 'Andaman & Havelock Island Tour', icon: '🌊' },
      { value: 'Leh Ladakh Mountain Passes', label: 'Leh Ladakh High Altitude Safari', icon: '🏍️' },
    ]
  },
  UAE: {
    name: 'UAE',
    flag: '🇦🇪',
    badge: '🇦🇪 UAE Staycations & Tours',
    states: [
      { value: 'Dubai', label: 'Dubai Emirate', icon: '🏙️' },
      { value: 'Abu Dhabi', label: 'Abu Dhabi Emirate', icon: '🕌' },
      { value: 'Sharjah', label: 'Sharjah Cultural Emirate', icon: '🎨' },
      { value: 'Ras Al Khaimah', label: 'Ras Al Khaimah Mountains', icon: '⛰️' },
      { value: 'Fujairah', label: 'Fujairah Coast & Beaches', icon: '🌊' },
      { value: 'Ajman', label: 'Ajman Emirate', icon: '🏖️' },
      { value: 'Umm Al Quwain', label: 'Umm Al Quwain', icon: '🚤' },
    ],
    destinations: [
      { value: 'Dubai Marina & Desert Safari', label: 'Dubai Marina & Red Dunes Safari', icon: '🏜️' },
      { value: 'Abu Dhabi Yas Island & Louvre', label: 'Abu Dhabi Grand Mosque & Yas Island', icon: '🕌' },
      { value: 'Jebel Jais Adventure RAK', label: 'Ras Al Khaimah Jebel Jais Zipline', icon: '⛰️' },
      { value: 'Fujairah Snoopy Island Diving', label: 'Fujairah Snorkeling & Beach Resorts', icon: '🤿' },
      { value: 'Hatta Mountain Glamping', label: 'Hatta Kayak & Mountain Glamping', icon: '🛶' },
    ]
  },
  'United States': {
    name: 'United States',
    flag: '🇺🇸',
    badge: '🇺🇸 USA Domestic Vacations',
    states: [
      { value: 'California', label: 'California', icon: '🌴' },
      { value: 'New York', label: 'New York', icon: '🗽' },
      { value: 'Florida', label: 'Florida', icon: '☀️' },
      { value: 'Texas', label: 'Texas', icon: '🤠' },
      { value: 'Nevada', label: 'Nevada', icon: '🎰' },
      { value: 'Hawaii', label: 'Hawaii', icon: '🌺' },
      { value: 'Colorado', label: 'Colorado', icon: '🏂' },
      { value: 'Washington', label: 'Washington', icon: '🌲' },
      { value: 'Other US State', label: 'Other State', icon: '📍' },
    ],
    destinations: [
      { value: 'Hawaii Island Getaway', label: 'Honolulu & Maui Beach Resorts', icon: '🌺' },
      { value: 'Grand Canyon & Vegas Strip', label: 'Grand Canyon & Las Vegas Lights', icon: '🏜️' },
      { value: 'Yellowstone & Rockies Wildlife', label: 'Yellowstone National Park Tour', icon: '🐻' },
      { value: 'Miami Beach & Key West Drive', label: 'Miami Beach & Florida Keys Tour', icon: '🏖️' },
      { value: 'New York City Lights & Broadway', label: 'NYC Skyline, Times Sq & Broadway', icon: '🗽' },
      { value: 'California Highway 1 Coast', label: 'Big Sur & Monterey Coastal Drive', icon: '🌊' },
    ]
  },
  'United Kingdom': {
    name: 'United Kingdom',
    flag: '🇬🇧',
    badge: '🇬🇧 UK Domestic Holidays',
    states: [
      { value: 'England', label: 'England', icon: '🎡' },
      { value: 'Scotland', label: 'Scotland', icon: '🏰' },
      { value: 'Wales', label: 'Wales', icon: '🐉' },
      { value: 'Northern Ireland', label: 'Northern Ireland', icon: '☘️' },
    ],
    destinations: [
      { value: 'Scottish Highlands & Skye', label: 'Scottish Highlands & Isle of Skye', icon: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
      { value: 'Lake District & Windermere', label: 'Lake District National Park Tour', icon: '🏞️' },
      { value: 'Cornwall Coastal Beaches', label: 'Cornwall Surf & Coastal Cottages', icon: '🏖️' },
      { value: 'Cotswolds Historic Villages', label: 'Cotswolds Countryside Tour', icon: '🏡' },
      { value: 'London Sightseeing & Thames', label: 'London Landmarks & West End', icon: '🎡' },
    ]
  },
  Canada: {
    name: 'Canada',
    flag: '🇨🇦',
    badge: '🇨🇦 Canada Domestic Travel',
    states: [
      { value: 'Ontario', label: 'Ontario', icon: '🍁' },
      { value: 'British Columbia', label: 'British Columbia', icon: '🏔️' },
      { value: 'Alberta', label: 'Alberta', icon: '🎿' },
      { value: 'Quebec', label: 'Quebec', icon: '⚜️' },
      { value: 'Nova Scotia', label: 'Nova Scotia', icon: '🌊' },
      { value: 'Other Province', label: 'Other Province', icon: '📍' },
    ],
    destinations: [
      { value: 'Banff & Lake Louise Rockies', label: 'Banff National Park & Lake Louise', icon: '🏔️' },
      { value: 'Niagara Falls & Toronto Skyline', label: 'Niagara Falls & Toronto City Tour', icon: '🌊' },
      { value: 'Whistler Blackcomb Skiing', label: 'Whistler Mountain & Vancouver Coast', icon: '🏂' },
      { value: 'Old Quebec City & Montreal', label: 'Old Quebec European Charm & Montreal', icon: '🏰' },
    ]
  },
  Australia: {
    name: 'Australia',
    flag: '🇦🇺',
    badge: '🇦🇺 Australia Domestic Getaways',
    states: [
      { value: 'New South Wales', label: 'New South Wales (NSW)', icon: '🦘' },
      { value: 'Victoria', label: 'Victoria (VIC)', icon: '☕' },
      { value: 'Queensland', label: 'Queensland (QLD)', icon: '🐠' },
      { value: 'Western Australia', label: 'Western Australia (WA)', icon: '🏜️' },
      { value: 'Tasmania', label: 'Tasmania (TAS)', icon: '🌲' },
    ],
    destinations: [
      { value: 'Great Barrier Reef Cairns', label: 'Great Barrier Reef & Whitsundays', icon: '🐠' },
      { value: 'Gold Coast Theme Parks & Surf', label: 'Gold Coast Surfers Paradise', icon: '🏄‍♂️' },
      { value: 'Great Ocean Road Melbourne', label: 'Great Ocean Road & 12 Apostles', icon: '🌊' },
      { value: 'Sydney Harbour & Blue Mountains', label: 'Sydney Harbour & Blue Mountains', icon: '🌉' },
      { value: 'Tasmania Cradle Mountain Tour', label: 'Tasmania Wilderness & Hobart Tour', icon: '🌲' },
    ]
  }
};

const domesticCountryOptions = [
  { value: 'India', label: 'India', icon: '🇮🇳' },
  { value: 'UAE', label: 'United Arab Emirates (UAE)', icon: '🇦🇪' },
  { value: 'United States', label: 'United States (USA)', icon: '🇺🇸' },
  { value: 'United Kingdom', label: 'United Kingdom (UK)', icon: '🇬🇧' },
  { value: 'Canada', label: 'Canada', icon: '🇨🇦' },
  { value: 'Australia', label: 'Australia', icon: '🇦🇺' },
];

const domesticStateOptions = [
  { value: 'Rajasthan', label: 'Rajasthan', icon: '🏰' },
  { value: 'Maharashtra', label: 'Maharashtra', icon: '🏙️' },
  { value: 'Delhi NCR', label: 'Delhi NCR', icon: '🏛️' },
  { value: 'Karnataka', label: 'Karnataka', icon: '🌳' },
  { value: 'Kerala', label: 'Kerala', icon: '🌴' },
  { value: 'Goa', label: 'Goa', icon: '🏖️' },
  { value: 'Gujarat', label: 'Gujarat', icon: '🦁' },
  { value: 'Tamil Nadu', label: 'Tamil Nadu', icon: '🛕' },
  { value: 'Himachal Pradesh', label: 'Himachal Pradesh', icon: '🏔️' },
  { value: 'Uttarakhand', label: 'Uttarakhand', icon: '⛰️' },
  { value: 'Punjab', label: 'Punjab', icon: '🌾' },
  { value: 'West Bengal', label: 'West Bengal', icon: '🪔' },
  { value: 'Other State', label: 'Other State / UT', icon: '📍' },
];

const domesticDestinationOptions = [
  { value: 'Goa Beach Holiday', label: 'Goa Beach & Water Sports', icon: '🏖️' },
  { value: 'Kerala Backwaters & Munnar', label: 'Kerala Backwaters & Munnar Hills', icon: '🌴' },
  { value: 'Manali, Shimla & Rohtang', label: 'Manali, Shimla & Snow Valleys', icon: '🏔️' },
  { value: 'Rajasthan Heritage Forts', label: 'Jaipur, Udaipur & Royal Forts', icon: '🏰' },
  { value: 'Kashmir Valley & Gulmarg', label: 'Kashmir Valley & Gulmarg Snow Tour', icon: '❄️' },
  { value: 'Varanasi & Ayodhya Circuit', label: 'Varanasi & Ayodhya Spiritual Tour', icon: '🕉️' },
  { value: 'Andaman Island Expedition', label: 'Andaman & Havelock Island Tour', icon: '🌊' },
  { value: 'Leh Ladakh Mountain Passes', label: 'Leh Ladakh High Altitude Safari', icon: '🏍️' },
];

const tripDurationOptions = [
  { value: '15', label: '15 Days (Quick Vacation)', icon: '⚡' },
  { value: '30', label: '30 Days (Standard Trip)', icon: '🗓️' },
  { value: '60', label: '60 Days (Extended Visit)', icon: '✈️' },
  { value: '90', label: '90 Days (Quarter Stay)', icon: '🏖️' },
  { value: '180', label: '180 Days (Semester / Long Stay)', icon: '🎓' },
  { value: '365', label: '1+ Year (Study / Work Permit)', icon: '💼' },
];

// Dynamic Destination Study Data Lookup (Real AI Pathway Knowledge Engine)
const getDestinationStudyData = (destination: string) => {
  const d = (destination || '').toLowerCase().trim();
  if (d.includes('uae') || d.includes('dubai')) {
    return {
      country: 'UAE',
      currency: 'AED',
      currencySymbol: 'AED',
      admissionDocName: 'UAE University Offer & Student Entry Permit',
      defaultUni: 'University of Wollongong in Dubai (UOWD)',
      defaultFee: 'AED 58,000 / yr',
      defaultLiving: 'AED 36,000 / yr',
      totalProof: 'AED 94,000 (~$25,600 USD)',
      casNumber: 'UAE-DXB-984210',
      unis: [
        { name: 'University of Wollongong in Dubai (UOWD)', city: 'Dubai Knowledge Park', rank: 'Top Global UAE Campus', fee: 'AED 58,000/yr', accept: 'High Match' },
        { name: 'Middlesex University Dubai', city: 'Dubai Knowledge Park', rank: 'Top UK Campus in Dubai', fee: 'AED 55,000/yr', accept: 'High Match' },
        { name: 'Heriot-Watt University Dubai', city: 'Dubai Academic City', rank: 'Top Scottish Tech Campus', fee: 'AED 62,000/yr', accept: 'High Match' },
        { name: 'American University in Dubai (AUD)', city: 'Dubai Media City', rank: 'US Accredited UAE Leader', fee: 'AED 75,000/yr', accept: 'Competitive' },
      ],
      loanPartners: 'Emirates NBD, HDFC Credila & Global Education Loans',
      insurance: 'UAE Mandatory Student Health Insurance Card',
      vfsText: 'VFS Dubai / UAE Visa Center Biometric & Visa Filing',
      defaultVisaType: 'UAE Student Residence Visa (1 Year Renewable)',
      defaultConditions: [
        'Must maintain full-time enrollment in MOHESR accredited university',
        'Part-time work permitted with university NOC & work permit',
        'Mandatory UAE Emirates ID & medical fitness test on arrival',
        'Multiple entry permitted during visa validity'
      ]
    };
  }
  if (d.includes('uk') || d.includes('united kingdom') || d.includes('london')) {
    return {
      country: 'UK',
      currency: 'GBP (£)',
      currencySymbol: '£',
      admissionDocName: 'CAS (Confirmation of Acceptance for Studies)',
      defaultUni: 'Imperial College London',
      defaultFee: '£28,000 / yr',
      defaultLiving: '£12,006 / yr',
      totalProof: '£40,006 GBP (~$51,000 USD)',
      casNumber: 'CAS-LON-883921',
      unis: [
        { name: 'Imperial College London', city: 'London', rank: '#2 Global', fee: '£31,000/yr', accept: 'Competitive' },
        { name: 'University of Manchester', city: 'Manchester', rank: '#32 Global', fee: '£26,500/yr', accept: 'High Match' },
        { name: 'University of Edinburgh', city: 'Edinburgh, Scotland', rank: '#27 Global', fee: '£28,000/yr', accept: 'High Match' },
        { name: 'University of Warwick', city: 'Coventry', rank: '#67 Global', fee: '£25,000/yr', accept: 'High Match' },
      ],
      loanPartners: 'HDFC Credila, Prodigy Finance, Axis Bank Student Loans',
      insurance: 'NHS Immigration Health Surcharge (IHS) Included',
      vfsText: 'UKVI / VFS Global Biometrics Appointment Center',
      defaultVisaType: 'UK Student Visa (Tier 4 / CAS)',
      defaultConditions: [
        'Work up to 20 hours/week during term time',
        'Satisfactory academic attendance required',
        'No recourse to public funds',
        'Collect BRP / eVisa within 10 days of arrival'
      ]
    };
  }
  if (d.includes('australia') || d.includes('sydney') || d.includes('melbourne')) {
    return {
      country: 'Australia',
      currency: 'AUD ($)',
      currencySymbol: 'AUD $',
      admissionDocName: 'eCoE (Electronic Confirmation of Enrolment)',
      defaultUni: 'University of Melbourne',
      defaultFee: 'AUD $34,000 / yr',
      defaultLiving: 'AUD $24,505 / yr',
      totalProof: 'AUD $58,505 (~$39,000 USD)',
      casNumber: 'COE-VIC-778219',
      unis: [
        { name: 'University of Melbourne', city: 'Melbourne, VIC', rank: '#13 Global (Go8)', fee: 'AUD $34,000/yr', accept: 'High Match' },
        { name: 'University of Sydney', city: 'Sydney, NSW', rank: '#18 Global (Go8)', fee: 'AUD $36,000/yr', accept: 'High Match' },
        { name: 'UNSW Sydney', city: 'Sydney, NSW', rank: '#19 Global (Go8)', fee: 'AUD $35,000/yr', accept: 'High Match' },
        { name: 'Monash University', city: 'Melbourne, VIC', rank: '#42 Global (Go8)', fee: 'AUD $33,000/yr', accept: 'High Match' },
      ],
      loanPartners: 'HDFC Credila, InCred Education, SBI Global Ed-Vantage',
      insurance: 'OSHC (Overseas Student Health Cover - Bupa / Allianz)',
      vfsText: 'Australian Biometrics Collection Centre (VFS Global)',
      defaultVisaType: 'Student Visa (Subclass 500)',
      defaultConditions: [
        'Condition 8105: Work 48h per fortnight allowed',
        'Condition 8501: Maintain active OSHC Health Cover',
        'Condition 8202: Meet academic course progress',
        'Condition 8516: Maintain genuine student eligibility'
      ]
    };
  }
  if (d.includes('usa') || d.includes('united states') || d.includes('america')) {
    return {
      country: 'USA',
      currency: 'USD ($)',
      currencySymbol: '$',
      admissionDocName: 'Form I-20 & SEVIS ID (F-1 Student Visa)',
      defaultUni: 'New York University (NYU)',
      defaultFee: '$36,000 / yr',
      defaultLiving: '$18,000 / yr',
      totalProof: '$54,000 USD',
      casNumber: 'N0038921890 (SEVIS)',
      unis: [
        { name: 'New York University (NYU)', city: 'New York, NY', rank: '#38 Global', fee: '$38,000/yr', accept: 'Competitive' },
        { name: 'University of Southern California (USC)', city: 'Los Angeles, CA', rank: '#45 Global', fee: '$42,000/yr', accept: 'High Match' },
        { name: 'Northeastern University', city: 'Boston, MA', rank: '#1 Co-op Programs', fee: '$36,000/yr', accept: 'High Match' },
        { name: 'University of Texas at Austin', city: 'Austin, TX', rank: '#58 Global', fee: '$32,000/yr', accept: 'High Match' },
      ],
      loanPartners: 'Mpower Financing, Prodigy Finance (No Collateral / No Cosigner)',
      insurance: 'ISO International / Student Secure Medical Insurance',
      vfsText: 'US Embassy / CGI Federal OFC Biometrics & Visa Interview',
      defaultVisaType: 'US F-1 Academic Student Visa',
      defaultConditions: [
        'On-campus work up to 20h/week authorized',
        'Must maintain full course of study (12 credits/sem)',
        'Maintain active SEVIS status through DSO',
        'CPT/OPT work rights available after 1 year'
      ]
    };
  }
  if (d.includes('germany') || d.includes('berlin') || d.includes('munich')) {
    return {
      country: 'Germany',
      currency: 'EUR (€)',
      currencySymbol: '€',
      admissionDocName: 'Zulassungsbescheid (German University Admission Letter)',
      defaultUni: 'Technical University of Munich (TUM)',
      defaultFee: '€0 Tuition / yr',
      defaultLiving: '€11,208 / yr',
      totalProof: '€11,208 EUR (Blocked Account - Sperrkonto)',
      casNumber: 'TUM-DE-ADM-66219',
      unis: [
        { name: 'Technical University of Munich (TUM)', city: 'Munich, Bavaria', rank: '#28 Global', fee: '€0 Tuition', accept: 'High Match' },
        { name: 'Ludwig Maximilian University (LMU)', city: 'Munich', rank: '#54 Global', fee: '€0 Tuition', accept: 'High Match' },
        { name: 'RWTH Aachen University', city: 'Aachen, NRW', rank: '#1 Tech in Germany', fee: '€0 Tuition', accept: 'High Match' },
        { name: 'Heidelberg University', city: 'Heidelberg', rank: '#84 Global', fee: '€1,500/sem', accept: 'Competitive' },
      ],
      loanPartners: 'Coracle / Fintiba Blocked Account Partners & SBI',
      insurance: 'TK / Barmer Statutory Public Health Insurance',
      vfsText: 'German Embassy / VFS German Visa Application Centre',
      defaultVisaType: 'German National Visa (Category D / Student)',
      defaultConditions: [
        'Work 140 full days or 280 half days per calendar year',
        'Must open Blocked Account (Sperrkonto €992/month)',
        'Compulsory health insurance (TK/Barmer) mandatory',
        'Register local address (Anmeldung) within 14 days'
      ]
    };
  }
  if (d.includes('ireland') || d.includes('dublin')) {
    return {
      country: 'Ireland',
      currency: 'EUR (€)',
      currencySymbol: '€',
      admissionDocName: 'Full Unconditional Offer Letter & Tuition Receipt',
      defaultUni: 'Trinity College Dublin',
      defaultFee: '€19,500 / yr',
      defaultLiving: '€10,000 / yr',
      totalProof: '€29,500 EUR (~$32,000 USD)',
      casNumber: 'IRL-TCD-881920',
      unis: [
        { name: 'Trinity College Dublin (TCD)', city: 'Dublin', rank: '#81 Global', fee: '€19,500/yr', accept: 'Competitive' },
        { name: 'University College Dublin (UCD)', city: 'Dublin', rank: '#126 Global', fee: '€18,500/yr', accept: 'High Match' },
        { name: 'University of Galway', city: 'Galway', rank: '#289 Global', fee: '€16,000/yr', accept: 'High Match' },
        { name: 'University College Cork (UCC)', city: 'Cork', rank: '#298 Global', fee: '€17,000/yr', accept: 'High Match' },
      ],
      loanPartners: 'HDFC Credila, Prodigy Finance, Bank of Ireland',
      insurance: 'Irish Private Medical Insurance (VHI / Irish Life Health)',
      vfsText: 'Irish Visa Application Centre (VFS Global)',
      defaultVisaType: 'Ireland Stamp 2 Student Visa',
      defaultConditions: [
        'Work 20h/week during term, 40h/week during holidays',
        'Eligible for 2-year Third Level Graduate Scheme (Stamp 1G)',
        'Register with INIS/IRP immigration office on arrival'
      ]
    };
  }
  if (d.includes('new zealand') || d.includes('auckland')) {
    return {
      country: 'New Zealand',
      currency: 'NZD ($)',
      currencySymbol: 'NZD $',
      admissionDocName: 'Offer of Place & Fee Receipt',
      defaultUni: 'University of Auckland',
      defaultFee: 'NZD $34,000 / yr',
      defaultLiving: 'NZD $20,000 / yr',
      totalProof: 'NZD $54,000 (~$33,000 USD)',
      casNumber: 'NZ-UOA-773190',
      unis: [
        { name: 'University of Auckland', city: 'Auckland', rank: '#68 Global', fee: 'NZD $34,000/yr', accept: 'High Match' },
        { name: 'University of Otago', city: 'Dunedin', rank: '#206 Global', fee: 'NZD $31,000/yr', accept: 'High Match' },
        { name: 'Victoria University of Wellington', city: 'Wellington', rank: '#241 Global', fee: 'NZD $29,000/yr', accept: 'High Match' },
        { name: 'University of Canterbury', city: 'Christchurch', rank: '#256 Global', fee: 'NZD $30,000/yr', accept: 'High Match' },
      ],
      loanPartners: 'HDFC Credila, InCred, SBI Global Student Loan',
      insurance: 'Studentsafe Inbound University Insurance',
      vfsText: 'Immigration New Zealand VFS Application Centre',
      defaultVisaType: 'New Zealand Fee Paying Student Visa',
      defaultConditions: [
        'Work up to 20 hours per week during term',
        'Full-time study at approved NZQA institution',
        'Comprehensive medical & travel insurance required'
      ]
    };
  }
  // Default: Canada
  return {
    country: 'Canada',
    currency: 'CAD ($)',
    currencySymbol: 'CAD $',
    admissionDocName: 'Letter of Acceptance (LOA) & PAL (Provincial Attestation)',
    defaultUni: 'University of Toronto',
    defaultFee: '$28,500 CAD / yr',
    defaultLiving: '$20,635 CAD / yr',
    totalProof: '$49,135 CAD (~$36,000 USD)',
    casNumber: 'LOA-ON-DLI-992144',
    unis: [
      { name: 'University of Toronto', city: 'Toronto, ON', rank: '#21 Global', fee: '$28,500 CAD/yr', accept: 'High Match' },
      { name: 'University of British Columbia (UBC)', city: 'Vancouver, BC', rank: '#34 Global', fee: '$31,000 CAD/yr', accept: 'High Match' },
      { name: 'McGill University', city: 'Montreal, QC', rank: '#30 Global', fee: '$26,000 CAD/yr', accept: 'High Match' },
      { name: 'University of Waterloo', city: 'Waterloo, ON', rank: '#1 Tech & Co-op', fee: '$32,000 CAD/yr', accept: 'High Match' },
    ],
    loanPartners: 'HDFC Credila, Prodigy Finance, InCred Education Loans',
    insurance: 'UHIP / Guard.me International Student Medical Insurance',
    vfsText: 'Canada Visa Application Centre (TT Services / VFS Global)',
    defaultVisaType: 'Study Permit (IMM 1442)',
    defaultConditions: [
      'Must remain enrolled in a designated learning institution (DLI)',
      'Off-campus work permitted up to 24 hrs/week in session',
      'Primary health insurance coverage required',
      'Maintain lawful status and report address changes'
    ]
  };
};

const getDestinationVisitData = (destination: string) => {
  const d = (destination || '').toLowerCase().trim();
  if (d.includes('uae') || d.includes('dubai')) {
    return {
      packages: [
        { name: 'Dubai City Explorer & Desert Safari Package', price: 'AED 1,650 / person', days: '5 Days / 4 Nights' },
        { name: 'Abu Dhabi & Burj Khalifa Grand Holiday Pass', price: 'AED 2,850 / person', days: '7 Days / 6 Nights' }
      ],
      fundsText: 'Bank statement showing minimum AED 11,000 (~$3,000 USD) available funds.',
      vfsSlotText: 'Book VFS Dubai Biometrics / Apply Direct Online e-Visa'
    };
  }
  if (d.includes('uk') || d.includes('united kingdom') || d.includes('london')) {
    return {
      packages: [
        { name: 'London Royal Heritage & Thames Cruise Package', price: '£750 / person', days: '6 Days / 5 Nights' },
        { name: 'Scottish Highlands & Edinburgh Castle Grand Tour', price: '£1,250 / person', days: '10 Days / 9 Nights' }
      ],
      fundsText: 'Bank statement showing minimum £3,500 GBP available funds + 6 months statement.',
      vfsSlotText: 'Book UK Standard Visitor Visa VFS Appointment'
    };
  }
  if (d.includes('australia') || d.includes('sydney') || d.includes('melbourne')) {
    return {
      packages: [
        { name: 'Sydney Harbour, Blue Mountains & Bondi Explorer', price: 'AUD $1,150 / person', days: '6 Days / 5 Nights' },
        { name: 'Great Barrier Reef & Gold Coast Adventure Package', price: 'AUD $2,100 / person', days: '10 Days / 9 Nights' }
      ],
      fundsText: 'Bank statement showing minimum AUD $5,000 available funds for Visitor Subclass 600.',
      vfsSlotText: 'Book Australian Biometrics Appointment (VFS Global)'
    };
  }
  if (d.includes('usa') || d.includes('united states') || d.includes('america')) {
    return {
      packages: [
        { name: 'New York City & Washington DC Iconic Discovery', price: '$1,350 / person', days: '7 Days / 6 Nights' },
        { name: 'California Coastline & Grand Canyon Holiday Tour', price: '$2,250 / person', days: '12 Days / 11 Nights' }
      ],
      fundsText: 'Bank statement showing minimum $4,000 USD available funds for B1/B2 Tourist Visa.',
      vfsSlotText: 'Book US Embassy Visa Interview Slot (DS-160 Filing)'
    };
  }
  if (d.includes('germany') || d.includes('schengen') || d.includes('france')) {
    return {
      packages: [
        { name: 'Bavarian Castles & Munich Alpine Discovery Tour', price: '€890 / person', days: '6 Days / 5 Nights' },
        { name: 'Paris, Switzerland & Rhine Valley Schengen Tour', price: '€1,850 / person', days: '10 Days / 9 Nights' }
      ],
      fundsText: 'Bank statement showing minimum €3,000 EUR proof of subsistence + travel insurance.',
      vfsSlotText: 'Book Schengen Tourist Visa VFS Slot'
    };
  }
  // Default: Canada
  return {
    packages: [
      { name: 'Niagara Falls & Toronto City Highlights Tour', price: '$850 CAD / person', days: '5 Days / 4 Nights' },
      { name: 'Banff National Park & Canadian Rockies Grand Explorer', price: '$1,850 CAD / person', days: '10 Days / 9 Nights' }
    ],
    fundsText: 'Bank statement showing minimum $3,500 CAD available funds for Canada Visitor Visa (TRV).',
    vfsSlotText: 'Book Canada VFS Biometrics Appointment'
  };
};


const studyQualificationOptions = [
  { value: '12th', label: '12th / High School', icon: '🏫', desc: 'Higher Secondary' },
  { value: 'bachelors', label: "Bachelor's Degree", icon: '🎓', desc: 'Undergraduate Degree' },
  { value: 'masters', label: "Master's Degree", icon: '📜', desc: 'Postgraduate / Master' },
  { value: 'diploma', label: 'Diploma / Associate', icon: '📋', desc: 'Vocational / Diploma' },
];

const studyTargetDegreeOptions = [
  { value: 'bachelors', label: "Bachelor's (UG)", icon: '🎓', desc: '3-4 Year Degree' },
  { value: 'masters', label: "Master's (PG / MS)", icon: '📜', desc: '1-2 Year Postgrad' },
  { value: 'postgrad', label: 'Postgraduate Diploma', icon: '📋', desc: '1-Year Fast Track' },
  { value: 'phd', label: 'PhD / Research', icon: '🔬', desc: 'Doctorate & Fellowship' },
];

const courseLevelOptions = [
  { value: 'bachelors', label: "Bachelor's Degree", icon: '🎓', desc: 'Undergraduate Degree' },
  { value: 'masters', label: "Master's / PG", icon: '📜', desc: 'Postgraduate & MBA' },
  { value: 'diploma', label: 'Diploma / Certificate', icon: '📋', desc: 'Vocational & Short Term' },
  { value: 'phd', label: 'PhD / Doctorate', icon: '🔬', desc: 'Doctoral Research' },
  { value: 'language', label: 'Language Program', icon: '🗣️', desc: 'IELTS / ESL / Pathway' },
];


const lookingForOptions = [
  { value: 'visa', label: 'Visa, Immigration, Travel...', icon: '✈️' },
  { value: 'student', label: 'Student Visa & Admissions', icon: '🎓' },
  { value: 'work', label: 'Work Permit & Overseas Jobs', icon: '💼' },
  { value: 'pr', label: 'Permanent Residency & Migration', icon: '🛂' },
  { value: 'tourist', label: 'Tourist & Visitor Visas', icon: '🏖️' },
  { value: 'business', label: 'Business & Investor Visa', icon: '🏛️' },
  { value: 'ielts', label: 'IELTS / PTE Test Prep', icon: '📖' },
];

const serviceTypeOptions = [
  { value: 'all', label: 'All Services', icon: '⚡' },
  { value: 'filing', label: 'Full Visa Application Filing', icon: '📝' },
  { value: 'consultation', label: '1-on-1 Expert Consultation', icon: '📞' },
  { value: 'docs', label: 'Document & SOP Verification', icon: '📄' },
  { value: 'admission', label: 'Direct University Admission', icon: '🎓' },
  { value: 'appeal', label: 'Visa Refusal & Appeals', icon: '⚖️' },
];

const originCityOptions = [
  { value: 'Mumbai', label: 'Mumbai, India', icon: '📍' },
  { value: 'Delhi', label: 'Delhi NCR, India', icon: '📍' },
  { value: 'Bangalore', label: 'Bangalore, India', icon: '📍' },
  { value: 'Hyderabad', label: 'Hyderabad, India', icon: '📍' },
  { value: 'Chennai', label: 'Chennai, India', icon: '📍' },
  { value: 'Pune', label: 'Pune, India', icon: '📍' },
  { value: 'Kolkata', label: 'Kolkata, India', icon: '📍' },
  { value: 'Dubai', label: 'Dubai, UAE', icon: '📍' },
  { value: 'London', label: 'London, UK', icon: '📍' },
  { value: 'Toronto', label: 'Toronto, Canada', icon: '📍' },
];

export function AITripPlannerLanding() {
  // Current user email for persistence
  const [currentUserEmail, setCurrentUserEmail] = useState('');
    const [isGeneratingDomestic, setIsGeneratingDomestic] = useState(false);
  const [showDomesticItinerary, setShowDomesticItinerary] = useState(false);
  const [expandedDay, setExpandedDay] = useState<number | null>(0);

  const [domesticSavedSuccess, setDomesticSavedSuccess] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // Input search state
  const [searchPrompt, setSearchPrompt] = useState('');
  const [selectedPill, setSelectedPill] = useState<string>('student');

  // Journey Engine Form State
  const [passportCountry, setPassportCountry] = useState('');
  const [journeyDestination, setJourneyDestination] = useState('');
  const [travelPurpose, setTravelPurpose] = useState('');
  const [serviceLookingFor, setServiceLookingFor] = useState('Visa & Immigration');
  const [isLookingForOpen, setIsLookingForOpen] = useState(false);
  const lookingForRef = useRef<HTMLDivElement>(null);

  const [selectedServiceType, setSelectedServiceType] = useState('');
  const [isServiceTypeOpen, setIsServiceTypeOpen] = useState(false);
  const serviceTypeRef = useRef<HTMLDivElement>(null);

  const [originCity, setOriginCity] = useState('');
  const [isOriginCityOpen, setIsOriginCityOpen] = useState(false);
  const originCityRef = useRef<HTMLDivElement>(null);

  const [hasVisaAlready, setHasVisaAlready] = useState<'no' | 'yes'>('no');
  
  // Custom dropdown open states for Journey Form
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isJourneyDestOpen, setIsJourneyDestOpen] = useState(false);
  const [isPurposeOpen, setIsPurposeOpen] = useState(false);
  const passportRef = useRef<HTMLDivElement>(null);
  const journeyDestRef = useRef<HTMLDivElement>(null);
  const purposeRef = useRef<HTMLDivElement>(null);

  // FLOW 1: "VISA APPROVED & READY" Real Dynamic State
  const [approvedVisaType, setApprovedVisaType] = useState('');
  const [approvalDate, setApprovalDate] = useState('');
  const [validityDate, setValidityDate] = useState('');
  const [uploadedVisaFileName, setUploadedVisaFileName] = useState('');
  const [uploadedVisaFileSize, setUploadedVisaFileSize] = useState('');
  const [isOcrScanning, setIsOcrScanning] = useState(false);
  const [ocrScanned, setOcrScanned] = useState(false);
  const [ocrConditions, setOcrConditions] = useState<string[]>([]);
  const [newCustomCondition, setNewCustomCondition] = useState('');
  const [isAddingCondition, setIsAddingCondition] = useState(false);
  const [savedSuccessToast, setSavedSuccessToast] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  // File input refs
  const visaFileInputRef = useRef<HTMLInputElement>(null);
  const ticketFileInputRef = useRef<HTMLInputElement>(null);
  
  // Action Checklist Checklist States (Parent's Peace-of-Mind Roadmap)
  const [ticketScanning, setTicketScanning] = useState(false);
  const [uploadedTicketFileName, setUploadedTicketFileName] = useState('');
  const [flightTicketUploaded, setFlightTicketUploaded] = useState(false);
  const [transitCheckResult, setTransitCheckResult] = useState<string | null>(null);
  const [pickupFlightNum, setPickupFlightNum] = useState('');
  const [pickupConfirmed, setPickupConfirmed] = useState(false);
  const [peerNetworkJoined, setPeerNetworkJoined] = useState(false);
  const [forexCardOrdered, setForexCardOrdered] = useState(false);
  const [customsChecklistDone, setCustomsChecklistDone] = useState<Record<string, boolean>>({
    cash: false,
    meds: false,
    food: false,
    docs: false,
  });

  // Generator & Dashboard Trigger States
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Flow 2A: Study Abroad 8-Step Engine States
  const [studyQualification, setStudyQualification] = useState<'12th' | 'bachelors' | 'masters' | 'diploma'>('bachelors');
  const [studyTargetDegree, setStudyTargetDegree] = useState<'bachelors' | 'masters' | 'postgrad' | 'diploma' | 'phd'>('masters');
  const [studyField, setStudyField] = useState('Computer Science & IT');
  const [selectedMatchedUni, setSelectedMatchedUni] = useState<string>('');
  const [studyTuitionFee, setStudyTuitionFee] = useState('');
  const [studyLivingCost, setStudyLivingCost] = useState('');
  
  // Step 3 Document Gathering States (Initialized to false for clean real uploading)
  const [docTranscriptsUploaded, setDocTranscriptsUploaded] = useState(false);
  const [docSopUploaded, setDocSopUploaded] = useState(false);
  const [docLorUploaded, setDocLorUploaded] = useState(false);
  const [docIeltsUploaded, setDocIeltsUploaded] = useState(false);
  
  // Step 4 Funds & Financial Weakness States
  const [fundsAvailableAmount, setFundsAvailableAmount] = useState('');
  
  // Step 6 Admission Re-Check
  const [casI20Number, setCasI20Number] = useState('');
  
  // Step 7 & 8 VFS Slot & Final Submission
  const [vfsSlotBooked, setVfsSlotBooked] = useState(false);
  const [finalDossierSubmitted, setFinalDossierSubmitted] = useState(false);

  // Flow 2B: Tourist / Visit Engine States
  const [visitPlannedAlready, setVisitPlannedAlready] = useState<'yes' | 'no'>('yes');
  const [visitItineraryUploaded, setVisitItineraryUploaded] = useState(false);
  const [visitSelectedTourPackage, setVisitSelectedTourPackage] = useState<string>('');
  const [visitFundsVerified, setVisitFundsVerified] = useState(false);
  const [visitTiesProofChecked, setVisitTiesProofChecked] = useState(false);

  // Flow 2: No-Visa Lead Capture Engine States (Fallback for Work / PR)
  const [leadFullName, setLeadFullName] = useState('');
  const [leadPhoneNumber, setLeadPhoneNumber] = useState('');
  const [leadContactPref, setLeadContactPref] = useState<'whatsapp' | 'call'>('whatsapp');
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSubmittedSuccess, setLeadSubmittedSuccess] = useState(false);

  // Global Multi-Tab Search Widget State
  const [activeSearchTab, setActiveSearchTab] = useState<'universities' | 'consultants' | 'relocation' | 'jobs' | 'lawyers'>('universities');
    // Multi-Tab Search Specific Filter States
  const [consultantPassport, setConsultantPassport] = useState('');
  const [consultantDestination, setConsultantDestination] = useState('');
  const [consultantPurpose, setConsultantPurpose] = useState('');
  const [isConsultantPassportOpen, setIsConsultantPassportOpen] = useState(false);
  const [isConsultantDestOpen, setIsConsultantDestOpen] = useState(false);
  const [isConsultantPurposeOpen, setIsConsultantPurposeOpen] = useState(false);
  const consultantPassportRef = useRef<HTMLDivElement>(null);
  const consultantDestRef = useRef<HTMLDivElement>(null);
  const consultantPurposeRef = useRef<HTMLDivElement>(null);
  const [courseLevel, setCourseLevel] = useState('');
  const [searchCountry, setSearchCountry] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  // 2-Tab Navigation: Domestic vs International
  const [travelScopeTab, setTravelScopeTab] = useState<'international' | 'domestic' | 'explore'>('international');

  // Domestic Travel States (Clean initial state, no dummy prefilled details)
  const [domesticCountry, setDomesticCountry] = useState('India');
  const [domesticState, setDomesticState] = useState('');
  const [isDomesticCountryOpen, setIsDomesticCountryOpen] = useState(false);
  const [isDomesticStateOpen, setIsDomesticStateOpen] = useState(false);
  const domesticCountryRef = useRef<HTMLDivElement>(null);
  const domesticStateRef = useRef<HTMLDivElement>(null);
  const [domesticCity, setDomesticCity] = useState('');
  const [domesticDestination, setDomesticDestination] = useState('');
  const [isDomesticDestOpen, setIsDomesticDestOpen] = useState(false);
  const domesticDestRef = useRef<HTMLDivElement>(null);
  const [domesticMembers, setDomesticMembers] = useState(1);

  // International Travel Duration
  const [tripDurationDays, setTripDurationDays] = useState('');
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const durationRef = useRef<HTMLDivElement>(null);

  // Dropdowns open state
  const [isCourseLevelOpen, setIsCourseLevelOpen] = useState(false);
  const [checklistCountry, setChecklistCountry] = useState('UAE');
  const [isChecklistCountryOpen, setIsChecklistCountryOpen] = useState(false);
  const checklistCountryRef = useRef<HTMLDivElement>(null);

  // Step 1 Custom Dropdowns Open States
  
  // Real File Uploads State & Refs for Step 3 and Document Sections
  const [uploadedDocFiles, setUploadedDocFiles] = useState<Record<string, { name: string; size: string; time: string }>>({});
  const [uploadingDocKey, setUploadingDocKey] = useState<string | null>(null);

  const transcriptsInputRef = useRef<HTMLInputElement>(null);
  const sopInputRef = useRef<HTMLInputElement>(null);
  const lorInputRef = useRef<HTMLInputElement>(null);
  const ieltsInputRef = useRef<HTMLInputElement>(null);
  const offerLetterInputRef = useRef<HTMLInputElement>(null);
  const passportInputRef = useRef<HTMLInputElement>(null);
  const bankProofInputRef = useRef<HTMLInputElement>(null);
  const flightTicketInputRef = useRef<HTMLInputElement>(null);

  const handleRealFileUpload = (docKey: string, file: File) => {
    if (!file) return;
    setUploadingDocKey(docKey);
    
    // Simulate real scanning & hashing in 600ms
    setTimeout(() => {
      const sizeStr = file.size > 1024 * 1024 
        ? (file.size / (1024 * 1024)).toFixed(1) + ' MB'
        : Math.round(file.size / 1024) + ' KB';
      
      const newFiles = {
        ...uploadedDocFiles,
        [docKey]: {
          name: file.name,
          size: sizeStr,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      };

      setUploadedDocFiles(newFiles);
      setUploadingDocKey(null);

      // Mark corresponding boolean flags
      if (docKey === 'transcripts') setDocTranscriptsUploaded(true);
      if (docKey === 'sop') setDocSopUploaded(true);
      if (docKey === 'lor') setDocLorUploaded(true);
      if (docKey === 'ielts') setDocIeltsUploaded(true);
      if (docKey === 'passport') setPassportVerified(true);
      if (docKey === 'flight') setFlightTicketUploaded(true);

      // Auto-save metadata
      autoSaveJourney({
        uploaded_documents: newFiles
      });
    }, 600);
  };

  const handleRemoveUploadedFile = (docKey: string) => {
    const newFiles = { ...uploadedDocFiles };
    delete newFiles[docKey];
    setUploadedDocFiles(newFiles);

    if (docKey === 'transcripts') setDocTranscriptsUploaded(false);
    if (docKey === 'sop') setDocSopUploaded(false);
    if (docKey === 'lor') setDocLorUploaded(false);
    if (docKey === 'ielts') setDocIeltsUploaded(false);
    if (docKey === 'passport') setPassportVerified(false);
    if (docKey === 'flight') setFlightTicketUploaded(false);

    autoSaveJourney({ uploaded_documents: newFiles });
  };

  const [isStudyQualOpen, setIsStudyQualOpen] = useState(false);
  const [isStudyTargetOpen, setIsStudyTargetOpen] = useState(false);
  const studyQualRef = useRef<HTMLDivElement>(null);
  const studyTargetRef = useRef<HTMLDivElement>(null);

  const courseLevelRef = useRef<HTMLDivElement>(null);

  // Dynamic Destination Study & Visit Data Hook (Computed after all states are initialized)
  const currentStudyData = getDestinationStudyData(journeyDestination);
  const currentVisitData = getDestinationVisitData(journeyDestination);
  const activeSelectedUni = currentStudyData.unis.some(u => u.name === selectedMatchedUni) ? selectedMatchedUni : currentStudyData.defaultUni;
  const activeTuitionFee = currentStudyData.unis.find(u => u.name === activeSelectedUni)?.fee || currentStudyData.defaultFee;
  const activeLivingCost = currentStudyData.defaultLiving;

  // Dynamic Loading HUD State
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [loadingProgress, setLoadingProgress] = useState<number>(15);

  const loadingSteps = [
    { icon: '🌐', title: 'Connecting to Global Visa & Security Hub...', desc: `Auditing ${passportCountry || 'Applicant'} to ${journeyDestination || 'Abroad'} regulations` },
    { icon: '📑', title: 'Structuring Visa Compliance & Transit Check...', desc: 'Verifying stay conditions, work limits & layover exemptions' },
    { icon: '🛡️', title: 'Activating Parental Security Engine...', desc: 'Configuring verified driver pickup, housing escrow & 5G eSIM' },
    { icon: '✨', title: 'Finalizing Peace-of-Mind Departure Roadmap...', desc: 'Ready for secure international departure' }
  ];

  // 1. REAL-TIME HYDRATION
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let email = '';
    const storedUser = localStorage.getItem('visaformula_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed?.email) {
          email = parsed.email;
          setCurrentUserEmail(parsed.email);
        }
      } catch (e) {}
    }
    if (!email) {
      const seekerEmail = localStorage.getItem('seeker_email');
      if (seekerEmail) {
        email = seekerEmail;
        setCurrentUserEmail(seekerEmail);
      }
    }

    const localData = localStorage.getItem('visaformula_user_journey');
    if (localData) {
      try {
        const cached = JSON.parse(localData);
        applyHydratedState(cached);
      } catch (e) {}
    }

    if (email) {
      fetch(`/api/journey/status?email=${encodeURIComponent(email)}`)
        .then((res) => res.json())
        .then((result) => {
          if (result?.success && result?.data) {
            applyHydratedState(result.data);
          }
        })
        .catch((err) => console.warn('Could not load backend journey status:', err));
    }
  }, []);

  const applyHydratedState = (data: any) => {
    if (!data) return;
    if (data.passportCountry) setPassportCountry(data.passportCountry);
    if (data.passport_country) setPassportCountry(data.passport_country);
    if (data.destination) setJourneyDestination(data.destination);
    if (data.purpose) setTravelPurpose(data.purpose);
    if (typeof data.has_visa === 'boolean') {
      setHasVisaAlready(data.has_visa ? 'yes' : 'no');
    }
    if (data.approvedVisaType || data.visa_type) setApprovedVisaType(data.approvedVisaType || data.visa_type);
    if (data.approvalDate || data.visa_grant_date) setApprovalDate(data.approvalDate || data.visa_grant_date);
    if (data.validityDate || data.visa_expiry_date) setValidityDate(data.validityDate || data.visa_expiry_date);
    if (data.ocrConditions && Array.isArray(data.ocrConditions)) setOcrConditions(data.ocrConditions);
    if (data.pickupFlightNum || data.airport_pickup_flight_no) setPickupFlightNum(data.pickupFlightNum || data.airport_pickup_flight_no);
    if (typeof data.pickupConfirmed === 'boolean') setPickupConfirmed(data.pickupConfirmed);
    if (typeof data.transitChecked === 'boolean') setFlightTicketUploaded(data.transitChecked);
    if (typeof data.peerNetworkJoined === 'boolean') setPeerNetworkJoined(data.peerNetworkJoined);
    if (typeof data.forexCardOrdered === 'boolean') setForexCardOrdered(data.forexCardOrdered);
    if (data.customsChecklistDone) setCustomsChecklistDone(data.customsChecklistDone);
    if (data.approvedVisaType || data.validityDate || data.pickupConfirmed || data.completedSteps?.length > 0) {
      setHasGenerated(true);
    }
  };

  const getCompletedStepsArray = () => {
    const steps: string[] = [];
    if (approvedVisaType || validityDate) steps.push('visa_verified');
    if (flightTicketUploaded) steps.push('transit_checked');
    if (pickupConfirmed) steps.push('driver_booked');
    if (peerNetworkJoined) steps.push('peer_network');
    if (forexCardOrdered) steps.push('forex_card');
    return steps;
  };

  const autoSaveJourney = async (overrides: Record<string, any> = {}) => {
    setIsAutoSaving(true);
    const email = currentUserEmail || (typeof window !== 'undefined' ? localStorage.getItem('seeker_email') || 'guest@visaformula.com' : 'guest@visaformula.com');

    const payload = {
      user_email: email,
      passport_country: passportCountry || 'India',
      destination: journeyDestination || 'UAE',
      purpose: travelPurpose || 'study',
      has_visa: hasVisaAlready === 'yes',
      visa_type: approvedVisaType,
      visa_grant_date: approvalDate,
      visa_expiry_date: validityDate,
      visa_conditions: ocrConditions,
      completed_steps: getCompletedStepsArray(),
      airport_pickup_flight_no: pickupFlightNum,
      airport_pickup_confirmed: pickupConfirmed,
      transit_checked: flightTicketUploaded,
      peer_network_joined: peerNetworkJoined,
      forex_ordered: forexCardOrdered,
      customs_checklist: customsChecklistDone,

      // Study Abroad Engine Fields
      highest_qualification: studyQualification,
      target_degree: studyTargetDegree,
      matched_university: selectedMatchedUni || currentStudyData.defaultUni,
      tuition_fee: studyTuitionFee || currentStudyData.defaultFee,
      living_cost: studyLivingCost || currentStudyData.defaultLiving,
      funds_available: fundsAvailableAmount,
      cas_i20_number: casI20Number,
      vfs_slot_booked: vfsSlotBooked,
      final_dossier_submitted: finalDossierSubmitted,
      readiness_score: studyReadinessScore,
      uploaded_documents: uploadedDocFiles,

      // Domestic Travel Engine Fields
      domestic_country: domesticCountry,
      domestic_state: domesticState,
      domestic_city: domesticCity,
      domestic_destination: domesticDestination,
      domestic_members: domesticMembers,

      ...overrides
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('visaformula_user_journey', JSON.stringify(payload));
    }

    try {
      await fetch('/api/journey/update-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (e) {
      console.warn('Auto-save error:', e);
    } finally {
      setIsAutoSaving(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (passportRef.current && !passportRef.current.contains(target)) setIsPassportOpen(false);
      if (journeyDestRef.current && !journeyDestRef.current.contains(target)) setIsJourneyDestOpen(false);
      if (purposeRef.current && !purposeRef.current.contains(target)) setIsPurposeOpen(false);
      if (courseLevelRef.current && !courseLevelRef.current.contains(target)) setIsCourseLevelOpen(false);
      if (consultantPassportRef.current && !consultantPassportRef.current.contains(target)) setIsConsultantPassportOpen(false);
      if (consultantDestRef.current && !consultantDestRef.current.contains(target)) setIsConsultantDestOpen(false);
      if (consultantPurposeRef.current && !consultantPurposeRef.current.contains(target)) setIsConsultantPurposeOpen(false);
      if (studyQualRef.current && !studyQualRef.current.contains(target)) setIsStudyQualOpen(false);
      if (studyTargetRef.current && !studyTargetRef.current.contains(target)) setIsStudyTargetOpen(false);
      if (checklistCountryRef.current && !checklistCountryRef.current.contains(target)) setIsChecklistCountryOpen(false);
      if (studyQualRef.current && !studyQualRef.current.contains(target)) setIsStudyQualOpen(false);
      if (studyTargetRef.current && !studyTargetRef.current.contains(target)) setIsStudyTargetOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGlobalSearch = () => {
    const params = new URLSearchParams();

    if (activeSearchTab === 'universities') {
      if (searchCountry) params.set('country', searchCountry);
      if (searchLocation) params.set('location', searchLocation);
      if (courseLevel) params.set('level', courseLevel);
      window.location.href = `/universities?${params.toString()}`;
    } else if (activeSearchTab === 'consultants') {
      const dest = consultantDestination || searchCountry;
      const passport = consultantPassport || passportCountry;
      const purpose = consultantPurpose || travelPurpose;
      
      if (dest) params.set('country', dest);
      if (passport) params.set('passport', passport);
      if (purpose) params.set('category', purpose === 'study' ? 'Student Visa' : purpose === 'work' ? 'Work Permit' : purpose === 'pr' ? 'PR' : purpose === 'visit' ? 'Visit' : purpose);
      if (searchLocation) params.set('city', searchLocation);
      
      window.location.href = `/find-experts?${params.toString()}`;
    } else if (activeSearchTab === 'relocation') {
      if (searchCountry) params.set('country', searchCountry);
      if (searchLocation) params.set('location', searchLocation);
      window.location.href = `/classifieds?${params.toString()}`;
    } else if (activeSearchTab === 'jobs') {
      if (searchCountry) params.set('country', searchCountry);
      if (searchLocation) params.set('location', searchLocation);
      window.location.href = `/jobs?${params.toString()}`;
    } else if (activeSearchTab === 'lawyers') {
      const dest = consultantDestination || searchCountry;
      if (dest) params.set('country', dest);
      window.location.href = `/find-experts?category=${encodeURIComponent('Visa Appeals')}${dest ? `&country=${encodeURIComponent(dest)}` : ''}`;
    }
  };

  // Trigger Parental Security Engine Generation with Dynamic Destination Data
  const fetchAISecurityEngine = async (payload: {
    destination?: string;
    passport?: string;
    purpose?: string;
  }) => {
    setIsGenerating(true);
    setLoadingStep(0);
    setLoadingProgress(15);

    setTimeout(() => {
      const loadingEl = document.getElementById('pathway-generator-status');
      if (loadingEl) {
        loadingEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < 3) return prev + 1;
        return prev;
      });
      setLoadingProgress((prev) => {
        if (prev < 85) return prev + 25;
        return 95;
      });
    }, 350);

    setTimeout(() => {
      clearInterval(stepInterval);
      setLoadingProgress(100);
      setIsGenerating(false);
      setHasGenerated(true);

      const dest = payload.destination || journeyDestination || 'UAE';
      const destinationStudy = getDestinationStudyData(dest);

      setApprovedVisaType(destinationStudy.defaultVisaType);
      setApprovalDate('2025-08-10');
      setValidityDate('2027-08-31');
      setOcrConditions(destinationStudy.defaultConditions);

      autoSaveJourney({
        destination: dest,
        passport_country: payload.passport || passportCountry || 'India',
        purpose: payload.purpose || travelPurpose || 'study',
        has_visa: true
      });

      setTimeout(() => {
        const resultsElement = document.getElementById('parental-security-engine-dashboard');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }, 1200);
  };

  // Natural Language Search Bar Parser
  const parseQueryToFormState = (query: string) => {
    const q = query.toLowerCase();
    
    // Check passport
    if (q.includes('indian') || q.includes('india')) setPassportCountry('India');
    else if (q.includes('nepal')) setPassportCountry('Nepal');
    else if (q.includes('bangladesh')) setPassportCountry('Bangladesh');
    else if (q.includes('sri lanka')) setPassportCountry('Sri Lanka');
    else if (q.includes('nigeria')) setPassportCountry('Nigeria');
    else if (q.includes('pakistan')) setPassportCountry('Pakistan');
    else if (q.includes('philippines')) setPassportCountry('Philippines');
    else if (q.includes('us ') || q.includes('usa') || q.includes('american')) setPassportCountry('United States');
    else if (q.includes('uk ') || q.includes('british')) setPassportCountry('United Kingdom');
    else if (q.includes('australian') || q.includes('australia')) setPassportCountry('Australia');

    // Check destination
    if (q.includes('uae') || q.includes('dubai')) setJourneyDestination('UAE');
    else if (q.includes('canada')) setJourneyDestination('Canada');
    else if (q.includes('uk') || q.includes('london') || q.includes('britain') || q.includes('united kingdom')) setJourneyDestination('United Kingdom');
    else if (q.includes('usa') || q.includes('united states') || q.includes('america')) setJourneyDestination('United States');
    else if (q.includes('australia') || q.includes('sydney') || q.includes('melbourne')) setJourneyDestination('Australia');
    else if (q.includes('germany') || q.includes('berlin') || q.includes('munich')) setJourneyDestination('Germany');
    else if (q.includes('new zealand') || q.includes('auckland')) setJourneyDestination('New Zealand');
    else if (q.includes('ireland') || q.includes('dublin')) setJourneyDestination('Ireland');
    else if (q.includes('singapore')) setJourneyDestination('Singapore');

    // Check purpose
    if (q.includes('study') || q.includes('student') || q.includes('master') || q.includes('bachelor') || q.includes('university') || q.includes('college')) {
      setTravelPurpose('study');
    } else if (q.includes('tourist') || q.includes('visit') || q.includes('holiday') || q.includes('travel')) {
      setTravelPurpose('visit');
    } else if (q.includes('work') || q.includes('job') || q.includes('permit') || q.includes('h-1b') || q.includes('lmia')) {
      setTravelPurpose('work');
    } else if (q.includes('pr') || q.includes('permanent') || q.includes('migration') || q.includes('express entry') || q.includes('pnp')) {
      setTravelPurpose('pr');
    } else if (q.includes('business') || q.includes('investor') || q.includes('startup')) {
      setTravelPurpose('business');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchPrompt.trim()) return;
    parseQueryToFormState(searchPrompt);
    
    if (hasVisaAlready === 'yes') {
      fetchAISecurityEngine({
        destination: journeyDestination || 'UAE',
        passport: passportCountry || 'India',
        purpose: travelPurpose || 'study'
      });
    } else {
      setHasGenerated(false);
      autoSaveJourney({
        destination: journeyDestination || 'UAE',
        passport_country: passportCountry || 'India',
        purpose: travelPurpose || 'study',
        has_visa: false
      });
      setTimeout(() => {
        const el = document.getElementById('need-visa-pathway-dashboard');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  };

  const handlePillClick = (pillId: string, pillLabel: string) => {
    setSelectedPill(pillId);
    let targetPurpose = 'study';
    if (pillId === 'student') targetPurpose = 'study';
    else if (pillId === 'work') targetPurpose = 'work';
    else if (pillId === 'pr') targetPurpose = 'pr';
    else if (pillId === 'tourist') targetPurpose = 'visit';
    else if (pillId === 'business') targetPurpose = 'business';
    else if (pillId === 'nomad') targetPurpose = 'work';
    else if (pillId === 'ielts') targetPurpose = 'study';
    else if (pillId === 'emergency') targetPurpose = 'visit';

    setTravelPurpose(targetPurpose);
    setSearchPrompt(`${pillLabel} to ${journeyDestination || 'UAE'}`);

    // Auto-scroll down to the target pathway section
    setTimeout(() => {
      if (hasVisaAlready === 'yes') {
        const el = document.getElementById('parental-security-engine-dashboard');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        const el = document.getElementById('need-visa-pathway-dashboard');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

      const handleViewInDashboard = () => {
    autoSaveJourney({
      domestic_country: domesticCountry,
      domestic_state: domesticState,
      domestic_city: domesticCity,
      domestic_destination: domesticDestination,
      domestic_members: domesticMembers
    });

    const isUserLoggedIn = typeof window !== 'undefined' && (
      Boolean(localStorage.getItem('visaformula_user')) ||
      Boolean(localStorage.getItem('seeker_email'))
    );

    if (isUserLoggedIn) {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/login?redirect=/dashboard';
    }
  };

  const handleGenerateDomesticItinerary = () => {
    setIsGeneratingDomestic(true);
    autoSaveJourney({
      domestic_country: domesticCountry || 'India',
      domestic_state: domesticState || 'Delhi',
      domestic_city: domesticCity || 'Local City',
      domestic_destination: domesticDestination || 'Holiday Tour',
      domestic_members: domesticMembers || 1
    });

    setTimeout(() => {
      setIsGeneratingDomestic(false);
      setShowDomesticItinerary(true);
      setTimeout(() => {
        const el = document.getElementById('domestic-itinerary-dashboard');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 800);
  };

  const handleGeneratePathway = () => {
    setIsGenerating(true);
    
    // Auto-save search parameters to user journey
    autoSaveJourney({
      destination: journeyDestination || 'UAE',
      passport_country: passportCountry || 'India',
      purpose: travelPurpose || 'study',
      service_type: selectedServiceType || 'Visa',
      origin_city: originCity || 'Mumbai',
      looking_for: serviceLookingFor || 'Visa & Immigration'
    });

    const params = new URLSearchParams();
    if (journeyDestination && journeyDestination !== 'Country') {
      params.set('country', journeyDestination);
    }
    
    // Map service category
    let categoryParam = selectedServiceType;
    if (!categoryParam || categoryParam === 'Service') {
      if (serviceLookingFor.includes('Study') || travelPurpose === 'study') categoryParam = 'Student Visa';
      else if (serviceLookingFor.includes('Work') || travelPurpose === 'work') categoryParam = 'Work Permit';
      else if (serviceLookingFor.includes('Tourist') || serviceLookingFor.includes('Visit') || travelPurpose === 'visit') categoryParam = 'Visit';
      else if (serviceLookingFor.includes('Business') || travelPurpose === 'business') categoryParam = 'Business Visa';
      else if (serviceLookingFor.includes('PR') || travelPurpose === 'pr') categoryParam = 'PR';
      else categoryParam = 'Student Visa';
    }
    params.set('category', categoryParam);

    if (originCity && originCity !== 'City') {
      params.set('city', originCity);
    }

    setTimeout(() => {
      window.location.href = `/find-experts?${params.toString()}`;
    }, 450);
  };

  const handleNoVisaLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadFullName.trim() || !leadPhoneNumber.trim()) return;

    setLeadSubmitting(true);
    const prefLabel = leadContactPref === 'whatsapp' ? 'WhatsApp' : 'Direct Phone Call';
    
    autoSaveJourney({
      user_name: leadFullName,
      user_phone: leadPhoneNumber,
      passport_country: passportCountry || 'India',
      destination: journeyDestination || 'UAE',
      purpose: travelPurpose || 'study',
      contact_pref: prefLabel,
      has_visa: false,
      lead_status: 'Callback Requested',
      lead_submitted_at: new Date().toISOString()
    });

    try {
      await fetch('/api/leads/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadFullName,
          phone: leadPhoneNumber,
          passport_country: passportCountry || 'India',
          destination_country: journeyDestination || 'UAE',
          purpose: travelPurpose || 'study',
          contact_preference: prefLabel,
          have_visa: false
        })
      });
    } catch {}

    setTimeout(() => {
      setLeadSubmitting(false);
      setLeadSubmittedSuccess(true);
    }, 400);
  };

  const calculateStudyReadinessScore = () => {
    let score = 25;
    if (docTranscriptsUploaded) score += 20;
    if (docSopUploaded) score += 15;
    if (docLorUploaded) score += 10;
    if (docIeltsUploaded) score += 15;
    if (Number(fundsAvailableAmount) >= 15000) score += 10;
    return Math.min(score, 100);
  };
  const studyReadinessScore = calculateStudyReadinessScore();

  const handleVisaFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedVisaFileName(file.name);
    setUploadedVisaFileSize((file.size / 1024 / 1024).toFixed(2) + ' MB');
    setIsOcrScanning(true);

    setTimeout(() => {
      setIsOcrScanning(false);
      setApprovedVisaType(currentStudyData.defaultVisaType);
      setApprovalDate('2025-08-10');
      setValidityDate('2027-08-31');
      setOcrConditions(currentStudyData.defaultConditions);
      setOcrScanned(true);
      autoSaveJourney({
        visa_type: currentStudyData.defaultVisaType,
        visa_grant_date: '2025-08-10',
        visa_expiry_date: '2027-08-31',
        visa_conditions: currentStudyData.defaultConditions
      });
    }, 1000);
  };

  const handleTicketFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedTicketFileName(file.name);
    setTicketScanning(true);

    setTimeout(() => {
      setTicketScanning(false);
      setFlightTicketUploaded(true);
      setTransitCheckResult(`Direct flight / transit to ${journeyDestination || 'Destination'} confirmed with zero layover visa requirement.`);
      autoSaveJourney({ transit_checked: true });
    }, 1000);
  };

  const handleAddCondition = () => {
    if (!newCustomCondition.trim()) return;
    const updated = [...ocrConditions, newCustomCondition.trim()];
    setOcrConditions(updated);
    setNewCustomCondition('');
    setIsAddingCondition(false);
    autoSaveJourney({ visa_conditions: updated });
  };

  const getDaysRemaining = (expDate: string) => {
    if (!expDate) return null;
    const exp = new Date(expDate);
    if (isNaN(exp.getTime())) return null;
    const now = new Date();
    const diffTime = exp.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  const daysLeft = validityDate ? getDaysRemaining(validityDate) : null;

    // Smart AI Visa Exemption & Duration Engine Evaluator
  const getVisaExemptionInsight = () => {
    const origin = (passportCountry || '').toLowerCase();
    const dest = (journeyDestination || '').toLowerCase();
    const days = parseInt(tripDurationDays) || 30;
    const purpose = travelPurpose || 'study';

    // Rule 1: USA to Australia < 90 days ETA
    if ((origin.includes('united states') || origin.includes('usa') || origin.includes('american')) && dest.includes('australia')) {
      if (days <= 90 && (purpose === 'visit' || purpose === 'business')) {
        return {
          badge: '✨ AI Exemption Verified',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          title: 'Electronic Travel Authority (ETA Subclass 601) Eligible',
          desc: `US citizens traveling to Australia for ${days} days do not require a full embassy visa—only an instant electronic ETA authorization (up to 90 days per visit).`,
          isExempt: true
        };
      } else if (days > 90) {
        return {
          badge: '⚠️ Long-Stay Required',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
          title: 'Visitor Visa (Subclass 600) Required (>90 Days)',
          desc: `Trips exceeding 90 days require Australian Subclass 600 Long-Stay Tourist stream with financial sufficiency proof.`,
          isExempt: false
        };
      }
    }

    // Rule 2: India to Thailand / Malaysia / Maldives / Sri Lanka <= 30 days
    if (origin.includes('india') && (dest.includes('thailand') || dest.includes('malaysia') || dest.includes('maldives') || dest.includes('sri lanka'))) {
      if (days <= 30 && purpose === 'visit') {
        return {
          badge: '🏝️ Visa-Free / VOA Access',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          title: 'Visa-Free / Instant Arrival Exemption Active',
          desc: `Indian passport holders enjoy Visa-Free entry / Visa-on-Arrival in ${journeyDestination} for tourist stays up to ${days} days.`,
          isExempt: true
        };
      }
    }

    // Rule 3: Western Passports to UAE / Singapore <= 30 days
    if ((origin.includes('united states') || origin.includes('united kingdom') || origin.includes('canada') || origin.includes('australia') || origin.includes('germany')) && (dest.includes('uae') || dest.includes('singapore'))) {
      if (days <= 30 && purpose === 'visit') {
        return {
          badge: '⚡ 30-Day Entry Stamp',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          title: 'Free Visa on Arrival (Airport Stamp)',
          desc: `Citizens of ${passportCountry} receive a complimentary 30-day tourist entry stamp on arrival in ${journeyDestination}.`,
          isExempt: true
        };
      }
    }

    // Rule 4: UAE / Singapore / Qatar / Saudi to UK <= 180 days
    if ((origin.includes('uae') || origin.includes('singapore') || origin.includes('qatar') || origin.includes('saudi')) && dest.includes('united kingdom')) {
      if (days <= 180 && (purpose === 'visit' || purpose === 'business')) {
        return {
          badge: '🇬🇧 UK ETA Eligible',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
          title: 'UK Electronic Travel Authorisation (ETA)',
          desc: `Citizens of ${passportCountry} can enter the UK for up to 6 months using the fast-track UK ETA digital approval without paper visa submission.`,
          isExempt: true
        };
      }
    }

    // Rule 5: If Duration > 90 days for general visit
    if (days > 90 && purpose === 'visit') {
      return {
        badge: '⏱️ Extended Stay Audit',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
        title: `Long-Stay Visa Required for ${days} Days in ${journeyDestination || 'Abroad'}`,
        desc: `Stays exceeding 90 days require formal embassy clearance, sponsor invitation, or extended visitor extension.`,
        isExempt: false
      };
    }

    return null;
  };

return (
    <div className="w-full bg-[#fbfbfd] text-slate-900 overflow-x-hidden font-sans">
      
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={visaFileInputRef}
        onChange={handleVisaFileSelected}
        accept=".pdf,.png,.jpg,.jpeg"
        className="hidden"
      />
      <input
        type="file"
        ref={ticketFileInputRef}
        onChange={handleTicketFileSelected}
        accept=".pdf,.png,.jpg,.jpeg,.pkpass"
        className="hidden"
      />

      {/* ── 1. HERO SECTION (THIN & SLEEK PURE WHITE DESIGN) ── */}
      <section className="relative w-full overflow-visible bg-white pt-1 sm:pt-2 pb-2 sm:pb-4 px-2.5 sm:px-6 lg:px-8">
        
        {/* Full-width Scenic Travel Background Card */}
        <div className="relative w-full max-w-7xl mx-auto rounded-3xl sm:rounded-[36px] bg-white border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.03)] ring-1 ring-slate-900/5 overflow-visible">
          
          {/* High-Resolution Generated Travel Photograph Background */}
          <div 
            className="absolute top-0 right-0 w-[48%] sm:w-3/5 lg:w-[58%] h-[180px] sm:h-full bg-cover bg-[position:top_right] sm:bg-right md:bg-center pointer-events-none opacity-100 rounded-tr-3xl rounded-bl-3xl sm:rounded-bl-none sm:rounded-r-[36px] overflow-hidden"
            style={{
              backgroundImage: `url('/images/hero-traveler-bg.jpg')`,
            }}
          >
            {/* Soft, Transparent Gradient only on the left side of image (Pure White Blend) */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/45 to-transparent w-1/3 sm:w-1/2" />
          </div>

          {/* Hero Content Container */}
          <div className="relative z-10 w-full p-3 sm:p-5 lg:pt-6 lg:pb-6 lg:px-8 text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-blue-200/90 shadow-2xs mb-2 sm:mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-extrabold text-blue-600 tracking-tight">
                Your Journey, Our Expertise
              </span>
            </div>

            {/* Main H1 Headline */}
            <h1 className="text-[19px] sm:text-3xl lg:text-[38px] font-black text-slate-900 leading-[1.16] sm:leading-[1.12] tracking-tight max-w-[210px] sm:max-w-none">
              Everything you need for <br className="hidden sm:inline" />
              <span className="text-slate-900">Visas, Immigration &amp; Travel</span>
            </h1>

            {/* Subheading */}
            <p className="mt-1 sm:mt-2 text-slate-600 text-[11px] sm:text-sm lg:text-[14px] font-medium max-w-[210px] sm:max-w-xl leading-relaxed mb-2.5 sm:mb-4">
              Find trusted consultants, plan your trip, compare services and make your journey seamless.
            </p>

            {/* ── INTEGRATED HERO 3-TABS + ENLARGED SEARCH CARD ── */}
            <div className="w-full max-w-full mt-2.5 sm:mt-4">
              
              {/* 3 Tabs attached seamlessly to the top of the search card */}
              <div className="flex items-end gap-1 sm:gap-2 px-1 sm:px-4 overflow-x-auto no-scrollbar">
                
                {/* Tab 1: International Services */}
                <button
                  type="button"
                  onClick={() => setTravelScopeTab('international')}
                  className={`px-3.5 sm:px-7 py-2 sm:py-3.5 rounded-t-2xl text-[11px] sm:text-[15px] font-black transition-all cursor-pointer select-none border-t border-x relative shrink-0 ${
                    travelScopeTab === 'international'
                      ? 'bg-white text-blue-950 border-slate-200/90 shadow-xs -mb-[1px] z-20'
                      : 'bg-slate-100/90 hover:bg-slate-200/80 text-slate-700 border-transparent'
                  }`}
                >
                  <span className="relative z-10">International Services</span>
                  {travelScopeTab === 'international' && (
                    <div className="absolute top-0 left-3 right-3 h-[3px] bg-blue-600 rounded-full" />
                  )}
                </button>

                {/* Tab 2: Domestic Trip Planner [New] */}
                <button
                  type="button"
                  onClick={() => setTravelScopeTab('domestic')}
                  className={`px-3.5 sm:px-7 py-2 sm:py-3.5 rounded-t-2xl text-[11px] sm:text-[15px] font-black transition-all cursor-pointer select-none border-t border-x relative flex items-center gap-1.5 shrink-0 ${
                    travelScopeTab === 'domestic'
                      ? 'bg-white text-slate-900 border-slate-200/90 shadow-xs -mb-[1px] z-20'
                      : 'bg-slate-100/90 hover:bg-slate-200/80 text-slate-700 border-transparent'
                  }`}
                >
                  <span>Trip Planner</span>
                  <span className="bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider shadow-2xs">
                    New
                  </span>
                  {travelScopeTab === 'domestic' && (
                    <div className="absolute top-0 left-3 right-3 h-[3px] bg-[#00A86B] rounded-full" />
                  )}
                </button>

                {/* Tab 3: Explore */}
                <button
                  type="button"
                  onClick={() => setTravelScopeTab('explore')}
                  className={`px-3.5 sm:px-7 py-2 sm:py-3.5 rounded-t-2xl text-[11px] sm:text-[15px] font-black transition-all cursor-pointer select-none border-t border-x relative flex items-center gap-1.5 shrink-0 ${
                    travelScopeTab === 'explore'
                      ? 'bg-white text-slate-900 border-slate-200/90 shadow-xs -mb-[1px] z-20'
                      : 'bg-slate-100/90 hover:bg-slate-200/80 text-slate-700 border-transparent'
                  }`}
                >
                  <span>Explore</span>
                  {travelScopeTab === 'explore' && (
                    <div className="absolute top-0 left-3 right-3 h-[3px] bg-purple-600 rounded-full" />
                  )}
                </button>

              </div>

              {/* Large Premium Search Card (Exact Mobile & Desktop Layout) */}
              <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-[32px] sm:rounded-tl-none p-3.5 sm:p-6 md:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative z-20">
                
                {/* TAB 1: INTERNATIONAL SERVICES FIELDS */}
                {travelScopeTab === 'international' && (
                  <div className="space-y-2.5 sm:space-y-4 animate-fadeIn">
                    
                    {/* Desktop & Mobile Responsive Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-3.5 items-end">
                      
                      {/* Field 1: I am looking for (Full width on mobile, 4 cols on desktop) */}
                      <div className="lg:col-span-4 relative">
                        <label className="block text-[11px] sm:text-xs font-black text-slate-800 mb-1">
                          I am looking for
                        </label>
                        <div
                          ref={lookingForRef}
                          onClick={() => {
                            setIsLookingForOpen(!isLookingForOpen);
                            setIsJourneyDestOpen(false);
                            setIsServiceTypeOpen(false);
                            setIsOriginCityOpen(false);
                          }}
                          className="bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-blue-500 rounded-xl sm:rounded-2xl h-[46px] sm:h-[54px] px-3 flex items-center justify-between shadow-2xs transition-all cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                              {serviceLookingFor || 'Visa, Immigration, Travel...'}
                            </span>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1.5 transition-transform duration-200 ${isLookingForOpen ? 'rotate-180 text-blue-600' : ''}`} />

                          {isLookingForOpen && (
                            <div
                              className="absolute top-[calc(100%+8px)] left-0 w-full min-w-[260px] z-[99999] bg-white border border-slate-200 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.2)] p-2 max-h-[280px] overflow-y-auto no-scrollbar ring-1 ring-black/10"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="space-y-1">
                                {lookingForOptions.map((opt) => (
                                  <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => {
                                      setServiceLookingFor(opt.label);
                                      if (opt.value !== 'visa') setTravelPurpose(opt.value);
                                      setIsLookingForOpen(false);
                                    }}
                                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-900 text-left cursor-pointer transition-colors"
                                  >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <span className="text-base">{opt.icon}</span>
                                      <span className="truncate">{opt.label}</span>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Sub-row with 3 fields (3 Columns in mobile row, 6 cols on desktop) */}
                      <div className="grid grid-cols-3 lg:col-span-6 gap-1.5 sm:gap-3">
                        
                        {/* Field 2: Going to (Country) */}
                        <div className="relative">
                          <label className="block text-[10px] sm:text-xs font-black text-slate-800 mb-1 truncate">
                            Going to
                          </label>
                          <div
                            ref={journeyDestRef}
                            onClick={() => {
                              setIsJourneyDestOpen(!isJourneyDestOpen);
                              setIsLookingForOpen(false);
                              setIsServiceTypeOpen(false);
                              setIsOriginCityOpen(false);
                            }}
                            className="bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-blue-500 rounded-xl sm:rounded-2xl h-[46px] sm:h-[54px] px-2 sm:px-3 flex items-center justify-between shadow-2xs transition-all cursor-pointer select-none"
                          >
                            <span className="text-[11px] sm:text-xs font-bold text-slate-900 truncate">
                              {journeyDestination || 'Country'}
                            </span>
                            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 ml-0.5 transition-transform duration-200 ${isJourneyDestOpen ? 'rotate-180 text-blue-600' : ''}`} />

                            {isJourneyDestOpen && (
                              <div
                                className="absolute top-[calc(100%+8px)] left-0 w-[240px] sm:w-[260px] z-[99999] bg-white border border-slate-200 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.2)] p-2 max-h-[280px] overflow-y-auto no-scrollbar ring-1 ring-black/10"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="space-y-1">
                                  {journeyDestinationOptions.map((opt) => (
                                    <button
                                      key={opt.value}
                                      type="button"
                                      onClick={() => {
                                        setJourneyDestination(opt.value);
                                        setIsJourneyDestOpen(false);
                                        autoSaveJourney({ destination: opt.value });
                                      }}
                                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-900 text-left cursor-pointer transition-colors"
                                    >
                                      <div className="flex items-center gap-2 min-w-0">
                                        <span className="text-base">{opt.icon}</span>
                                        <span className="truncate">{opt.label}</span>
                                      </div>
                                      {journeyDestination === opt.value && <Check className="w-4 h-4 text-[#00A86B]" />}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Field 3: Service Type */}
                        <div className="relative">
                          <label className="block text-[10px] sm:text-xs font-black text-slate-800 mb-1 truncate">
                            Service Type
                          </label>
                          <div
                            ref={serviceTypeRef}
                            onClick={() => {
                              setIsServiceTypeOpen(!isServiceTypeOpen);
                              setIsLookingForOpen(false);
                              setIsJourneyDestOpen(false);
                              setIsOriginCityOpen(false);
                            }}
                            className="bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-blue-500 rounded-xl sm:rounded-2xl h-[46px] sm:h-[54px] px-2 sm:px-3 flex items-center justify-between shadow-2xs transition-all cursor-pointer select-none"
                          >
                            <span className="text-[11px] sm:text-xs font-bold text-slate-900 truncate">
                              {selectedServiceType || 'Service'}
                            </span>
                            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 ml-0.5 transition-transform duration-200 ${isServiceTypeOpen ? 'rotate-180 text-blue-600' : ''}`} />

                            {isServiceTypeOpen && (
                              <div
                                className="absolute top-[calc(100%+8px)] left-0 w-[240px] z-[99999] bg-white border border-slate-200 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.2)] p-2 max-h-[280px] overflow-y-auto no-scrollbar ring-1 ring-black/10"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="space-y-1">
                                  {serviceTypeOptions.map((opt) => (
                                    <button
                                      key={opt.value}
                                      type="button"
                                      onClick={() => {
                                        setSelectedServiceType(opt.label);
                                        setIsServiceTypeOpen(false);
                                      }}
                                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-900 text-left cursor-pointer transition-colors"
                                    >
                                      <div className="flex items-center gap-2 min-w-0">
                                        <span className="text-base">{opt.icon}</span>
                                        <span className="truncate">{opt.label}</span>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Field 4: From (City) */}
                        <div className="relative">
                          <label className="block text-[10px] sm:text-xs font-black text-slate-800 mb-1 truncate">
                            From
                          </label>
                          <div
                            ref={originCityRef}
                            onClick={() => {
                              setIsOriginCityOpen(!isOriginCityOpen);
                              setIsLookingForOpen(false);
                              setIsJourneyDestOpen(false);
                              setIsServiceTypeOpen(false);
                            }}
                            className="bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-blue-500 rounded-xl sm:rounded-2xl h-[46px] sm:h-[54px] px-2 sm:px-3 flex items-center justify-between shadow-2xs transition-all cursor-pointer select-none"
                          >
                            <span className="text-[11px] sm:text-xs font-bold text-slate-900 truncate">
                              {originCity || 'City'}
                            </span>
                            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 ml-0.5 transition-transform duration-200 ${isOriginCityOpen ? 'rotate-180 text-blue-600' : ''}`} />

                            {isOriginCityOpen && (
                              <div
                                className="absolute top-[calc(100%+8px)] right-0 sm:left-0 w-[220px] z-[99999] bg-white border border-slate-200 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.2)] p-2 max-h-[280px] overflow-y-auto no-scrollbar ring-1 ring-black/10"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="space-y-1">
                                  {originCityOptions.map((opt) => (
                                    <button
                                      key={opt.value}
                                      type="button"
                                      onClick={() => {
                                        setOriginCity(opt.value);
                                        setPassportCountry('India');
                                        setIsOriginCityOpen(false);
                                      }}
                                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-900 text-left cursor-pointer transition-colors"
                                    >
                                      <div className="flex items-center gap-2 min-w-0">
                                        <span className="text-base">{opt.icon}</span>
                                        <span className="truncate">{opt.label}</span>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                      </div>

                      {/* Action Button: Search */}
                      <div className="lg:col-span-2 mt-1 sm:mt-0">
                        <button
                          type="button"
                          onClick={handleGeneratePathway}
                          disabled={isGenerating}
                          className="w-full h-[44px] sm:h-[54px] rounded-xl sm:rounded-2xl font-black text-xs sm:text-base bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-900/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-75"
                        >
                          {isGenerating ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin text-white" />
                              <span>Searching...</span>
                            </>
                          ) : (
                            <>
                              <Search className="w-4 h-4 text-white" />
                              <span>Search</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>

                  </div>
                )}

                {/* TAB 2: DOMESTIC TRIP PLANNER FIELDS */}
                {travelScopeTab === 'domestic' && (() => {
                  const stateList = domesticCountryData[domesticCountry]?.states || [];
                  const activeStateObj = stateList.find(s => s.name === domesticState) || stateList[0];
                  const tourList = activeStateObj?.destinations || [];

                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 sm:gap-3.5 items-end animate-fadeIn">
                      
                      {/* Country (2 Cols) */}
                      <div className="lg:col-span-2 relative">
                        <label className="block text-[11px] sm:text-xs font-black text-slate-800 mb-1">
                          Country
                        </label>
                        <div
                          ref={domesticCountryRef}
                          onClick={() => {
                            setIsDomesticCountryOpen(!isDomesticCountryOpen);
                            setIsDomesticStateOpen(false);
                            setIsDomesticDestOpen(false);
                          }}
                          className="bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-2xl h-[46px] sm:h-[54px] px-3 flex items-center justify-between shadow-2xs cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span>{domesticCountryOptions.find(c => c.value === domesticCountry)?.icon || '🇮🇳'}</span>
                            <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                              {domesticCountry}
                            </span>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isDomesticCountryOpen ? 'rotate-180' : ''}`} />

                          {isDomesticCountryOpen && (
                            <div className="absolute top-[calc(100%+8px)] left-0 w-full min-w-[220px] z-[99999] bg-white border border-slate-200 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.2)] p-2 max-h-[280px] overflow-y-auto no-scrollbar ring-1 ring-black/10" onClick={(e) => e.stopPropagation()}>
                              {domesticCountryOptions.map((opt) => (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => {
                                    setDomesticCountry(opt.value);
                                    const newStates = domesticCountryData[opt.value]?.states || [];
                                    if (newStates[0]) {
                                      setDomesticState(newStates[0].name);
                                      if (newStates[0].destinations?.[0]) setDomesticDestination(newStates[0].destinations[0].name);
                                    }
                                    setIsDomesticCountryOpen(false);
                                  }}
                                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 text-left cursor-pointer"
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <span>{opt.icon}</span>
                                    <span className="truncate">{opt.label}</span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* State (2 Cols) */}
                      <div className="lg:col-span-2 relative">
                        <label className="block text-[11px] sm:text-xs font-black text-slate-800 mb-1">
                          State / Region
                        </label>
                        <div
                          ref={domesticStateRef}
                          onClick={() => {
                            setIsDomesticStateOpen(!isDomesticStateOpen);
                            setIsDomesticCountryOpen(false);
                            setIsDomesticDestOpen(false);
                          }}
                          className="bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-2xl h-[46px] sm:h-[54px] px-3 flex items-center justify-between shadow-2xs cursor-pointer select-none"
                        >
                          <span className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                            {domesticState || 'Select State'}
                          </span>
                          <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isDomesticStateOpen ? 'rotate-180' : ''}`} />

                          {isDomesticStateOpen && (
                            <div className="absolute top-[calc(100%+8px)] left-0 w-full min-w-[220px] z-[99999] bg-white border border-slate-200 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.2)] p-2 max-h-[280px] overflow-y-auto no-scrollbar ring-1 ring-black/10" onClick={(e) => e.stopPropagation()}>
                              {stateList.map((st) => (
                                <button
                                  key={st.name}
                                  type="button"
                                  onClick={() => {
                                    setDomesticState(st.name);
                                    if (st.destinations?.[0]) setDomesticDestination(st.destinations[0].name);
                                    setIsDomesticStateOpen(false);
                                  }}
                                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 text-left cursor-pointer"
                                >
                                  <span>{st.name}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Origin City (2 Cols) */}
                      <div className="lg:col-span-2 relative">
                        <label className="block text-[11px] sm:text-xs font-black text-slate-800 mb-1">
                          Departing From
                        </label>
                        <input
                          type="text"
                          value={domesticCity}
                          onChange={(e) => setDomesticCity(e.target.value)}
                          placeholder="Your City (e.g. Nashik)"
                          className="w-full bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-2xl h-[46px] sm:h-[54px] px-3 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                        />
                      </div>

                      {/* Tour / Destination (2 Cols) */}
                      <div className="lg:col-span-2 relative">
                        <label className="block text-[11px] sm:text-xs font-black text-slate-800 mb-1">
                          Destination Package
                        </label>
                        <div
                          ref={domesticDestRef}
                          onClick={() => {
                            setIsDomesticDestOpen(!isDomesticDestOpen);
                            setIsDomesticCountryOpen(false);
                            setIsDomesticStateOpen(false);
                          }}
                          className="bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-2xl h-[46px] sm:h-[54px] px-3 flex items-center justify-between shadow-2xs cursor-pointer select-none"
                        >
                          <span className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                            {domesticDestination || 'Select Tour'}
                          </span>
                          <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isDomesticDestOpen ? 'rotate-180' : ''}`} />

                          {isDomesticDestOpen && (
                            <div className="absolute top-[calc(100%+8px)] left-0 w-full min-w-[240px] z-[99999] bg-white border border-slate-200 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.2)] p-2 max-h-[280px] overflow-y-auto no-scrollbar ring-1 ring-black/10" onClick={(e) => e.stopPropagation()}>
                              {tourList.map((d) => (
                                <button
                                  key={d.name}
                                  type="button"
                                  onClick={() => {
                                    setDomesticDestination(d.name);
                                    setIsDomesticDestOpen(false);
                                  }}
                                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 text-left cursor-pointer"
                                >
                                  <span>{d.name}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Travelers (2 Cols) */}
                      <div className="lg:col-span-2 relative">
                        <label className="block text-[11px] sm:text-xs font-black text-slate-800 mb-1">
                          Travelers
                        </label>
                        <div className="flex items-center justify-between bg-white border border-slate-200/90 rounded-xl sm:rounded-2xl h-[46px] sm:h-[54px] px-3 shadow-2xs">
                          <button
                            type="button"
                            onClick={() => setDomesticMembers(Math.max(1, domesticMembers - 1))}
                            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-black flex items-center justify-center cursor-pointer text-xs"
                          >
                            -
                          </button>
                          <span className="text-xs sm:text-sm font-bold text-slate-900">
                            {domesticMembers} {domesticMembers === 1 ? 'Traveler' : 'Travelers'}
                          </span>
                          <button
                            type="button"
                            onClick={() => setDomesticMembers(domesticMembers + 1)}
                            className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-black flex items-center justify-center cursor-pointer text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Action Button (2 Cols) */}
                      <div className="lg:col-span-2">
                        <button
                          type="button"
                          onClick={handleGenerateDomesticItinerary}
                          disabled={isGeneratingDomestic}
                          className="w-full h-[46px] sm:h-[54px] rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-900/25 flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-75"
                        >
                          {isGeneratingDomestic ? (
                            <>
                              <RotateCw className="w-4 h-4 animate-spin text-white" />
                              <span>Planning...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4 text-cyan-300" />
                              <span className="truncate">Explore Packages →</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>
                  );
                })()}

                {/* TAB 3: EXPLORE DESTINATIONS */}
                {travelScopeTab === 'explore' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end animate-fadeIn">
                    <div className="relative">
                      <label className="block text-[11px] sm:text-xs font-black text-slate-800 mb-1">Destination Region</label>
                      <input
                        type="text"
                        value={searchCountry}
                        onChange={(e) => setSearchCountry(e.target.value)}
                        placeholder="e.g. Europe, Middle East, UK"
                        className="w-full bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-2xl h-[46px] sm:h-[54px] px-3 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-[11px] sm:text-xs font-black text-slate-800 mb-1">Purpose of Visit</label>
                      <input
                        type="text"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        placeholder="e.g. Study, Work, Holiday, PR"
                        className="w-full bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-2xl h-[46px] sm:h-[54px] px-3 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-[11px] sm:text-xs font-black text-slate-800 mb-1">Duration Style</label>
                      <div className="bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-2xl h-[46px] sm:h-[54px] px-3 flex items-center text-xs sm:text-sm font-semibold text-slate-700">
                        ⚡ Instant AI Pathway Match
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={handleGlobalSearch}
                        className="w-full h-[46px] sm:h-[54px] rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-900/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                      >
                        <Compass className="w-4 h-4 text-cyan-400" />
                        <span>Explore Guides →</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ── MOBILE STICKY BOTTOM NAVIGATION BAR (IPHONE & ANDROID NATIVE TAB BAR) ── */}
      <div className="block md:hidden fixed bottom-0 left-0 right-0 z-[9999] bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] py-1.5 px-3 pb-safe">
        <div className="grid grid-cols-5 gap-1 items-center max-w-md mx-auto">
          
          {/* Home */}
          <a href="/" className="flex flex-col items-center justify-center py-1 text-blue-600 group">
            <div className="w-5 h-5 flex items-center justify-center">
              <Home className="w-5 h-5 stroke-[2.4]" />
            </div>
            <span className="text-[9px] font-black tracking-tight mt-0.5">Home</span>
          </a>

          {/* Services */}
          <a href="/find-experts" className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-900 group">
            <div className="w-5 h-5 flex items-center justify-center">
              <LayoutGrid className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-[9px] font-bold tracking-tight mt-0.5">Services</span>
          </a>

          {/* Trips */}
          <button
            type="button"
            onClick={() => {
              setTravelScopeTab('domestic');
              setTimeout(() => {
                const el = document.getElementById('domestic-itinerary-dashboard');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-900 group cursor-pointer"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <Luggage className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-[9px] font-bold tracking-tight mt-0.5">Trips</span>
          </button>

          {/* Consultants */}
          <a href="/find-experts" className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-900 group">
            <div className="w-5 h-5 flex items-center justify-center">
              <UserCheck className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-[9px] font-bold tracking-tight mt-0.5">Consultants</span>
          </a>

          {/* Profile */}
          <a href="/dashboard" className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-900 group">
            <div className="w-5 h-5 flex items-center justify-center">
              <User className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-[9px] font-bold tracking-tight mt-0.5">Profile</span>
          </a>

        </div>
      </div>

      
      {/* ── OVERSEAS JOURNEY & AI VISA ENGINE FLOW (INTACT & WORKING) ── */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center animate-fadeIn">
        
        {/* 1. HAVE VISA ALREADY TOGGLE SWITCH */}
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200/90 p-1 rounded-full shadow-sm mb-6">
          <span className="text-xs sm:text-sm font-extrabold text-slate-700 px-3 select-none">
            Have Visa Already?
          </span>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full">
            <button
              type="button"
              onClick={() => {
                setHasVisaAlready('no');
                setHasGenerated(false);
                autoSaveJourney({ has_visa: false });
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-black transition-all duration-200 cursor-pointer flex items-center gap-1.5 select-none ${
                hasVisaAlready === 'no'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${hasVisaAlready === 'no' ? 'bg-cyan-400 animate-pulse' : 'bg-slate-300'}`} />
              <span>NO</span>
              {hasVisaAlready === 'no' && <Check className="w-3.5 h-3.5 text-cyan-300 stroke-[3]" />}
            </button>

            <button
              type="button"
              onClick={() => {
                setHasVisaAlready('yes');
                setHasGenerated(true);
                autoSaveJourney({ has_visa: true });
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-black transition-all duration-200 cursor-pointer flex items-center gap-1.5 select-none ${
                hasVisaAlready === 'yes'
                  ? 'bg-[#00A86B] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${hasVisaAlready === 'yes' ? 'bg-white animate-pulse' : 'bg-slate-300'}`} />
              <span>YES</span>
              {hasVisaAlready === 'yes' && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
            </button>
          </div>
        </div>

        {/* 2. 8 CATEGORY INTENT PILLS */}
        <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto no-scrollbar py-2 px-1 mb-6">
          {[
            { id: 'student', emoji: '🎓', label: 'Student Visa' },
            { id: 'work', emoji: '💼', label: 'Work Permit' },
            { id: 'pr', emoji: '🏡', label: 'PR & Migration' },
            { id: 'tourist', emoji: '🌴', label: 'Tourist Visa' },
            { id: 'business', emoji: '🏢', label: 'Business & Investor' },
            { id: 'parents', emoji: '👨‍👩‍👧', label: 'Parents Super Visa' },
            { id: 'ielts', emoji: '🗣️', label: 'IELTS / PTE Test' },
            { id: 'emergency', emoji: '🚨', label: 'Urgent Visa Help' }
          ].map((pill) => {
            const isSelected = selectedPill === pill.id;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => handlePillClick(pill.id, pill.label)}
                className={`flex flex-col items-center justify-center min-w-[95px] sm:min-w-[105px] py-2.5 px-3 rounded-2xl border transition-all duration-200 cursor-pointer select-none shrink-0 ${
                  isSelected
                    ? 'bg-emerald-50/80 border-emerald-500 shadow-md ring-2 ring-emerald-500/20 scale-105'
                    : 'bg-white hover:bg-slate-50 border-slate-200/90 shadow-2xs hover:shadow-sm'
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

        {/* 3. PLAN YOUR OVERSEAS JOURNEY & VISA SEARCH CARD */}
        <div className="w-full bg-white border border-slate-200/90 rounded-2xl sm:rounded-[30px] p-5 sm:p-7 md:p-8 shadow-[0_14px_45px_rgba(0,0,0,0.06)] text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shadow-2xs">
                <Compass className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                  Plan Your Overseas Journey &amp; Visa
                </h3>
                <p className="text-[11px] sm:text-xs font-medium text-slate-500">
                  Real-time compliance checks, pre-visa audits &amp; departure security
                </p>
              </div>
            </div>

            {lastSavedTime && (
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                <Save className="w-3.5 h-3.5 text-emerald-500" />
                <span>Synced at {lastSavedTime}</span>
              </div>
            )}
          </div>

          {/* 4-Column Dropdowns Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 items-end">
            
            {/* Field 1: Passport Country */}
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
                    {passportCountry ? (passportCountryOptions.find(o => o.value === passportCountry)?.icon || '🌐') : '🌐'}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className={`text-xs sm:text-sm font-bold truncate block ${passportCountry ? 'text-slate-800' : 'text-slate-400'}`}>
                      {passportCountry ? (passportCountryOptions.find(o => o.value === passportCountry)?.label || passportCountry) : 'Select Passport'}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isPassportOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                {isPassportOpen && (
                  <div
                    className="absolute top-[calc(100%+8px)] left-0 w-full z-[99999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[260px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Select Citizenship
                    </div>
                    <div className="space-y-0.5">
                      {passportCountryOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setPassportCountry(opt.value);
                            setIsPassportOpen(false);
                            autoSaveJourney({ passport_country: opt.value });
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 text-left cursor-pointer"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-base">{opt.icon}</span>
                            <span className="truncate">{opt.label}</span>
                          </div>
                        </button>
                      ))}
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
                    {journeyDestination ? (journeyDestinationOptions.find(o => o.value === journeyDestination)?.icon || '✈️') : '✈️'}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className={`text-xs sm:text-sm font-bold truncate block ${journeyDestination ? 'text-slate-800' : 'text-slate-400'}`}>
                      {journeyDestination ? (journeyDestinationOptions.find(o => o.value === journeyDestination)?.label || journeyDestination) : 'Select Destination'}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isJourneyDestOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                {isJourneyDestOpen && (
                  <div
                    className="absolute top-[calc(100%+8px)] left-0 w-full z-[99999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[260px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="space-y-0.5">
                      {journeyDestinationOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setJourneyDestination(opt.value);
                            setIsJourneyDestOpen(false);
                            autoSaveJourney({ destination: opt.value });
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 text-left cursor-pointer"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-base">{opt.icon}</span>
                            <span className="truncate">{opt.label}</span>
                          </div>
                        </button>
                      ))}
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
                    {travelPurpose ? (travelPurposeOptions.find(o => o.value === travelPurpose)?.icon || '🎯') : '🎯'}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className={`text-xs sm:text-sm font-bold truncate block ${travelPurpose ? 'text-slate-800' : 'text-slate-400'}`}>
                      {travelPurpose ? (travelPurposeOptions.find(o => o.value === travelPurpose)?.label || travelPurpose) : 'Select Purpose'}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isPurposeOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                {isPurposeOpen && (
                  <div
                    className="absolute top-[calc(100%+8px)] left-0 w-full z-[99999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[260px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="space-y-0.5">
                      {travelPurposeOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setTravelPurpose(opt.value);
                            setIsPurposeOpen(false);
                            autoSaveJourney({ purpose: opt.value });
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 text-left cursor-pointer"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-base">{opt.icon}</span>
                            <span className="truncate">{opt.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Field 4: Primary Action Button */}
            <div>
              <button
                type="button"
                onClick={() => {
                  if (hasVisaAlready === 'yes') {
                    handleGeneratePathway();
                  } else {
                    const el = document.getElementById('need-visa-pathway-dashboard');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                      window.location.href = `/find-experts?country=${encodeURIComponent(journeyDestination || 'All')}&category=${encodeURIComponent(travelPurpose || 'All')}`;
                    }
                  }
                }}
                disabled={isGenerating}
                className="w-full h-[52px] px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-slate-900/20 hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Explore Pathway →</span>
              </button>
            </div>

          </div>
        </div>

      </section>

      {/* ── DOMESTIC AI HOLIDAY & TOUR ITINERARY DASHBOARD (CENTERED & ENLARGED) ── */}
          {showDomesticItinerary && travelScopeTab === 'domestic' && (() => {
            const destName = domesticDestination || 'Holiday Tour';
            const countryName = domesticCountry || 'India';

            // Curated Dynamic Itinerary Days with High Quality Images & Detailed Stops
            const itineraryDays = [
              {
                day: 1,
                title: `Arrival & ${destName} Welcome Vibes`,
                subtitle: `Arrive in ${destName} & check-in to curated luxury stay`,
                image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=85',
                badge: 'VIP Pickup & Sunset Check-in',
                morning: `Private AC vehicle pickup directly from airport or railway station by verified background-checked chauffeur.`,
                afternoon: `Welcome refreshments & express contactless check-in at 4-star handpicked boutique resort.`,
                evening: `Leisure sunset stroll along the famous promenade, beachfront cafes & authentic local welcome dinner.`
              },
              {
                day: 2,
                title: `Iconic Landmarks & ${destName} Culture`,
                subtitle: `Fast-track guided heritage tour & authentic regional gastronomy`,
                image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&q=85',
                badge: 'Full Day Signature Sightseeing',
                morning: `Fast-track guided tour of top UNESCO heritage monuments, royal architecture & panoramic viewpoints.`,
                afternoon: `Authentic multi-course lunch at celebrated traditional culinary spots & historic bazaars.`,
                evening: `Evening scenic cruise / light & sound show experience with local cultural folk artists.`
              },
              {
                day: 3,
                title: `Nature, Safari & Adventure Excursion`,
                subtitle: `Explore hidden waterfalls, scenic nature trails & wildlife`,
                image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=85',
                badge: 'Adventure & Hidden Gems',
                morning: `Guided safari / water sports / mountain valley trail with certified safety gear and local instructors.`,
                afternoon: `Artisan craft workshops and verified local spices, tea gardens & authentic souvenir markets.`,
                evening: `Starlit barbecue dinner under ambient music & scenic relaxation.`
              },
              {
                day: 4,
                title: `Artisan Bazaars & Sunset Relaxation`,
                subtitle: `Handcrafted souvenirs & scenic cafe leisure`,
                image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=85',
                badge: 'Leisure & Bazaars',
                morning: `Relaxed breakfast followed by exploring the vibrant old town artisan quarter & photography spots.`,
                afternoon: `Ayurvedic / wellness relaxation session or scenic cafe hopping at top-rated local spots.`,
                evening: `Sunset viewpoint photo-stop & grand chef-curated farewell dinner.`
              },
              {
                day: 5,
                title: `Scenic Departure & Sweet Memories`,
                subtitle: `Breakfast, checkout & guaranteed on-time transit drop`,
                image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=85',
                badge: 'Guaranteed Departure Transfer',
                morning: `Buffet breakfast at resort and seamless contactless express check-out.`,
                afternoon: `Dedicated cab transfer back to departure terminal with on-time departure guarantee.`,
                evening: `Safe return journey with 24/7 post-trip assistance.`
              }
            ];

            return (
              <div id="domestic-itinerary-dashboard" className="w-full max-w-4xl mx-auto mt-8 sm:mt-10 text-left animate-fadeIn space-y-6">
                
                {/* 1. Header Banner */}
                <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl sm:rounded-[32px] p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="space-y-2 z-10">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] sm:text-xs font-black uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        AI Curated Domestic Itinerary
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-bold">
                        Zero Visa Required ✓
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                      {destName} • {countryName}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs sm:text-sm text-slate-300 font-medium pt-1">
                      <span>Origin: <strong className="text-white">{domesticCity || domesticState || 'Selected Origin'}</strong></span>
                      <span>• Group Size: <strong className="text-emerald-400">{domesticMembers || 1} {(domesticMembers || 1) === 1 ? 'Traveler' : 'Travelers'}</strong></span>
                      <span>• Duration: <strong className="text-white font-bold">5 Days / 4 Nights</strong></span>
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-col items-stretch gap-2.5 shrink-0 z-10">
                    <button
                      type="button"
                      onClick={() => {
                        autoSaveJourney({
                          domestic_country: domesticCountry,
                          domestic_state: domesticState,
                          domestic_city: domesticCity,
                          domestic_destination: domesticDestination,
                          domestic_members: domesticMembers
                        });
                        setDomesticSavedSuccess(true);
                        setTimeout(() => setDomesticSavedSuccess(false), 3000);
                      }}
                      className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition-all border border-white/15 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>{domesticSavedSuccess ? 'Saved to Dashboard ✓' : '💾 Save to Dashboard'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleViewInDashboard}
                      className="px-5 py-3 rounded-2xl bg-[#00A86B] hover:bg-[#008f5a] text-white text-xs sm:text-sm font-black transition-all shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>View in Dashboard →</span>
                    </button>
                  </div>
                </div>

                {/* 2. Main Centered & Enlarged 5-Day Pathway Itinerary */}
                <div className="bg-white border border-slate-200/90 rounded-3xl sm:rounded-[36px] p-6 sm:p-9 shadow-[0_16px_50px_rgba(48,0,90,0.06)] space-y-6">
                  
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div>
                      <h4 className="text-2xl sm:text-3xl font-black text-[#30005a] tracking-tight">
                        5-Day Pathway Itinerary
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                        Tap any day below to view full Morning, Afternoon &amp; Evening breakdown
                      </p>
                    </div>
                    <span className="px-4 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-full text-xs sm:text-sm font-black shrink-0 self-start sm:self-auto">
                      ✨ 100% Customizable
                    </span>
                  </div>

                  {/* Accordion Rows (ENLARGED & BEAUTIFUL) */}
                  <div className="space-y-4 pt-1">
                    {itineraryDays.map((item, idx) => {
                      const isOpen = expandedDay === idx;
                      return (
                        <div
                          key={item.day}
                          className={`rounded-2xl sm:rounded-3xl border transition-all duration-200 overflow-hidden ${
                            isOpen
                              ? 'bg-slate-50/90 border-[#30005a]/30 shadow-md ring-2 ring-[#30005a]/10'
                              : 'bg-white hover:bg-slate-50/60 border-slate-200/90 shadow-2xs'
                          }`}
                        >
                          {/* Accordion Header Row */}
                          <div
                            onClick={() => setExpandedDay(isOpen ? null : idx)}
                            className="p-4 sm:p-5 flex items-center justify-between gap-4 sm:gap-6 cursor-pointer select-none"
                          >
                            <div className="flex items-center gap-4 sm:gap-6 min-w-0 flex-1">
                              
                              {/* Large Thumbnail Image */}
                              <div className="w-16 h-14 sm:w-24 sm:h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-200 shadow-xs relative">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                                />
                              </div>

                              {/* Day Info */}
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs sm:text-sm font-black text-[#30005a] tracking-wide uppercase">
                                    Day {item.day}
                                  </span>
                                  <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
                                    • {item.badge}
                                  </span>
                                </div>
                                <h5 className="text-sm sm:text-lg font-black text-slate-900 truncate mt-0.5 sm:mt-1">
                                  {item.title}
                                </h5>
                                <p className="text-xs sm:text-sm text-slate-500 truncate mt-0.5">
                                  {item.subtitle}
                                </p>
                              </div>
                            </div>

                            {/* Chevron Arrow */}
                            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-[#30005a] bg-purple-100' : 'text-slate-400 bg-slate-100'
                            }`}>
                              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                          </div>

                          {/* Accordion Expanded Body */}
                          {isOpen && (
                            <div className="px-5 pb-5 pt-2 sm:px-7 sm:pb-7 border-t border-slate-200/70 animate-fadeIn space-y-4 text-left">
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                                
                                {/* Morning */}
                                <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-1.5">
                                  <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-amber-600">
                                    <span className="text-base">🌅</span>
                                    <span>Morning</span>
                                  </div>
                                  <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-medium">
                                    {item.morning}
                                  </p>
                                </div>

                                {/* Afternoon */}
                                <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-1.5">
                                  <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-cyan-600">
                                    <span className="text-base">☀️</span>
                                    <span>Afternoon</span>
                                  </div>
                                  <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-medium">
                                    {item.afternoon}
                                  </p>
                                </div>

                                {/* Evening */}
                                <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-1.5">
                                  <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-purple-600">
                                    <span className="text-base">🌙</span>
                                    <span>Evening</span>
                                  </div>
                                  <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-medium">
                                    {item.evening}
                                  </p>
                                </div>

                              </div>
                            </div>
                          )}

                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Actions Row */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Dedicated AC Cab &amp; Handpicked Stay Included with Escrow Protection</span>
                    </div>

                    <a
                      href="/support"
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-black transition-all shadow-md shadow-slate-900/20 flex items-center gap-2 cursor-pointer shrink-0"
                    >
                      <span>📞 Request Custom Plan with Specialist →</span>
                    </a>
                  </div>

                </div>

              </div>
            );
          })()}

          {/* QUICK-PILL INTENT TAGS (ONLY SHOWN FOR INTERNATIONAL TRAVEL) */}
          {travelScopeTab === 'international' && (
            <div className="mt-6 sm:mt-8 flex flex-nowrap items-center justify-start sm:justify-center gap-2 sm:gap-3 max-w-6xl mx-auto w-full overflow-x-auto no-scrollbar pb-2 px-2 sm:px-0">
              {categoryPills.map((pill) => {
                const isSelected = selectedPill === pill.id;
                return (
                  <button 
                    key={pill.id} 
                    type="button" 
                    onClick={() => handlePillClick(pill.id, pill.label)}
                    className={`flex flex-col items-center justify-center bg-white border rounded-2xl px-3.5 py-2.5 shadow-2xs hover:shadow-md transition-all shrink-0 min-w-[90px] sm:min-w-[100px] h-[76px] cursor-pointer select-none ${
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
          )}

          {/* ── AI LOADING STATE ── */}
          {isGenerating && (
            <div id="pathway-generator-status" className="w-full max-w-6xl mx-auto my-8 bg-gradient-to-b from-white to-emerald-50/30 border border-emerald-200/80 rounded-2xl sm:rounded-[32px] p-6 sm:p-9 text-left shadow-[0_20px_60px_rgba(0,168,107,0.08)] backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-[#00A86B] to-teal-500 animate-pulse" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/25 shrink-0 animate-spin" style={{ animationDuration: '6s' }}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black tracking-wider uppercase text-[#00A86B] bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                        Parental Security Engine
                      </span>
                      <span className="text-xs font-semibold text-slate-400">Pre-Departure Peace-of-Mind</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
                      Configuring Safe Pathway for <span className="text-[#00A86B]">{journeyDestination || 'UAE'}</span>
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
                    Passport: {passportCountry || 'India'}
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-emerald-100 text-[#00A86B] text-xs font-bold">
                    100% Verified
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 my-6">
                {loadingSteps.map((step, idx) => {
                  const isCurrent = loadingStep === idx;
                  const isDone = loadingStep > idx;
                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                          : isDone
                          ? 'bg-emerald-50/60 border-emerald-200 text-slate-700'
                          : 'bg-white/40 border-slate-100 opacity-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base">{step.icon}</span>
                        <span className="text-xs font-black text-slate-900 truncate">Step {idx + 1}</span>
                        {isDone && <Check className="w-3.5 h-3.5 text-[#00A86B] ml-auto shrink-0" />}
                      </div>
                      <p className="text-[11px] font-bold text-slate-800 leading-tight truncate">{step.title}</p>
                      <p className="text-[10px] text-slate-500 leading-tight mt-0.5 truncate">{step.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#00A86B] to-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* ── FLOW 1: EXACT SCREENSHOT DESIGN (HAVE VISA? = YES) ── */}
          {travelScopeTab === 'international' && hasVisaAlready === 'yes' && hasGenerated && (
            <div id="parental-security-engine-dashboard" className="w-full max-w-6xl mx-auto mt-8 text-left animate-fadeIn">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* ── LEFT CARD: STEP 1: VISA VERIFICATION & SMART ALERTS (5 COLS) ── */}
                <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.04)] space-y-5">
                  
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                        <RotateCw className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                          Step 1: Visa Verification &amp; Smart Alerts
                        </h3>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          Auto-expiry tracker &amp; condition audit.
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100/90 text-slate-600 text-[11px] font-bold shrink-0">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{daysLeft !== null ? `${daysLeft}d left` : 'Set expiry date'}</span>
                    </div>
                  </div>

                  {/* Visa Type / Subclass */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5">
                      VISA TYPE / SUBCLASS
                    </label>
                    <input
                      type="text"
                      value={approvedVisaType || currentStudyData.defaultVisaType}
                      onChange={(e) => {
                        setApprovedVisaType(e.target.value);
                        autoSaveJourney({ visa_type: e.target.value });
                      }}
                      placeholder="e.g. Student Subclass 500 / Skilled Worker (UAE)"
                      className="w-full h-12 px-4 rounded-2xl bg-slate-50/90 border border-slate-200/90 text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Dates Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5">
                        APPROVAL DATE
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={approvalDate}
                          onChange={(e) => {
                            setApprovalDate(e.target.value);
                            autoSaveJourney({ visa_grant_date: e.target.value });
                          }}
                          className="w-full h-12 px-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/90 text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5">
                        VISA EXPIRY DATE
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={validityDate}
                          onChange={(e) => {
                            setValidityDate(e.target.value);
                            autoSaveJourney({ visa_expiry_date: e.target.value });
                          }}
                          className="w-full h-12 px-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/90 text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A86B] focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Scan Visa Document Box */}
                  <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg shrink-0">
                        <QrCode className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                          Scan Visa Document
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Auto-extracts work hours &amp; legal rules.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => visaFileInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl bg-[#2e0854] hover:bg-[#3d0b6f] text-white text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-sm"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>{isOcrScanning ? 'Scanning...' : 'Scan'}</span>
                    </button>
                  </div>

                  {/* CONDITIONS OF VISA */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                        CONDITIONS OF VISA ({ocrConditions.length > 0 ? ocrConditions.length : currentStudyData.defaultConditions.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsAddingCondition(!isAddingCondition)}
                        className="text-xs font-extrabold text-[#00A86B] hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <span>+ Add</span>
                      </button>
                    </div>

                    {isAddingCondition && (
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <input
                          type="text"
                          value={newCustomCondition}
                          onChange={(e) => setNewCustomCondition(e.target.value)}
                          placeholder="e.g. Work: 48h/fortnight allowed"
                          className="text-xs border border-slate-200 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#00A86B]"
                        />
                        <button
                          type="button"
                          onClick={handleAddCondition}
                          className="px-3 py-2 bg-[#00A86B] text-white text-xs font-bold rounded-xl shrink-0 cursor-pointer"
                        >
                          Save
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(ocrConditions.length > 0 ? ocrConditions : currentStudyData.defaultConditions).map((cond, idx) => {
                        let icon = '⏱️';
                        if (cond.toLowerCase().includes('health') || cond.toLowerCase().includes('insurance')) icon = '📑';
                        else if (cond.toLowerCase().includes('entry') || cond.toLowerCase().includes('multiple')) icon = '✈️';
                        else if (cond.toLowerCase().includes('id') || cond.toLowerCase().includes('enrollment')) icon = '🛡️';
                        
                        return (
                          <div
                            key={idx}
                            className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100/90 text-slate-800 text-[11px] font-bold"
                          >
                            <span className="text-sm shrink-0">{icon}</span>
                            <span className="truncate">{cond}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* ── RIGHT CARD: STEP 2: SUGGESTED NEXT ACTIONS CHECKLIST (7 COLS) ── */}
                <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.04)] space-y-5">
                  
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#00A86B] shrink-0">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                          Step 2: Suggested Next Actions Checklist
                        </h3>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          The Parent's Peace-of-Mind Roadmap for safe departure.
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-[#00A86B] text-xs font-black shrink-0">
                      <span>6 Safeguards</span>
                    </div>
                  </div>

                  {/* 2-Column x 3-Row Grid of 6 Action Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Action 1: Flight & Transit Check */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-2xs">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xl">✈️</span>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-sans">
                            TRANSIT
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900">
                          1. Flight &amp; Transit Check
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                          {transitCheckResult || `Verify direct flight & transit to ${journeyDestination || 'Destination'}.`}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => ticketFileInputRef.current?.click()}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                      >
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>{ticketScanning ? 'Verifying...' : flightTicketUploaded ? 'Ticket Uploaded ✓' : 'Upload Flight Ticket'}</span>
                      </button>
                    </div>

                    {/* Action 2: Driver & Airport Pickup */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-2xs">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xl">🚗</span>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-sans">
                            PICKUP
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900">
                          2. Driver &amp; Airport Pickup
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                          Book verified driver at {journeyDestination || 'terminal'}.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <input
                          type="text"
                          value={pickupFlightNum}
                          onChange={(e) => setPickupFlightNum(e.target.value)}
                          placeholder="Flight No. (e.g. EK 502 / AI 995)"
                          className="w-full h-9 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#00A86B]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPickupConfirmed(true);
                            autoSaveJourney({ airport_pickup_confirmed: true, airport_pickup_flight_no: pickupFlightNum });
                          }}
                          className={`w-full py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-xs ${
                            pickupConfirmed
                              ? 'bg-emerald-100 text-[#00A86B]'
                              : 'bg-[#00A86B] hover:bg-[#008f5a] text-white'
                          }`}
                        >
                          {pickupConfirmed ? 'Pickup Confirmed ✓' : 'Confirm Pickup'}
                        </button>
                      </div>
                    </div>

                    {/* Action 3: Secure Housing */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-2xs">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xl">🏡</span>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-sans">
                            ESCROW
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900">
                          3. Secure Housing
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                          Escrow-protected student dorms &amp; flats in {journeyDestination || 'abroad'}.
                        </p>
                      </div>

                      <a
                        href="/classifieds?category=accommodation"
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all text-center shadow-xs"
                      >
                        <span>Find Housing</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* Action 4: Peer Network */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-2xs">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xl">👥</span>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-sans">
                            COMMUNITY
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900">
                          4. Peer Network
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                          Connect with travellers moving to {journeyDestination || 'same city'}.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setPeerNetworkJoined(!peerNetworkJoined);
                          autoSaveJourney({ peer_network_joined: !peerNetworkJoined });
                        }}
                        className={`w-full py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-xs ${
                          peerNetworkJoined
                            ? 'bg-emerald-100 text-[#00A86B]'
                            : 'bg-[#00A86B] hover:bg-[#008f5a] text-white'
                        }`}
                      >
                        {peerNetworkJoined ? 'Group Joined ✓' : 'Join Peer Group'}
                      </button>
                    </div>

                    {/* Action 5: Forex & 5G eSIM */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-2xs">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xl">💳</span>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-sans">
                            0% MARKUP
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900">
                          5. Forex &amp; 5G eSIM
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                          Zero-markup {currentStudyData.currency} card &amp; instant QR eSIM.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setForexCardOrdered(!forexCardOrdered);
                          autoSaveJourney({ forex_ordered: !forexCardOrdered });
                        }}
                        className={`w-full py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-xs ${
                          forexCardOrdered
                            ? 'bg-emerald-100 text-[#00A86B]'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        {forexCardOrdered ? 'Ordered ✓' : 'Get Forex & eSIM'}
                      </button>
                    </div>

                    {/* Action 6: Customs & Rules */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-2xs">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xl">📄</span>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-sans">
                            CUSTOMS
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900">
                          6. Customs &amp; Rules
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                          {journeyDestination || 'Destination'} cash limit &amp; prescription guidelines.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={customsChecklistDone.cash}
                              onChange={(e) => {
                                const updated = { ...customsChecklistDone, cash: e.target.checked };
                                setCustomsChecklistDone(updated);
                                autoSaveJourney({ customs_checklist: updated });
                              }}
                              className="rounded text-[#00A86B] focus:ring-0 w-3.5 h-3.5"
                            />
                            <span>&lt;$10k Cash</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={customsChecklistDone.meds}
                              onChange={(e) => {
                                const updated = { ...customsChecklistDone, meds: e.target.checked };
                                setCustomsChecklistDone(updated);
                                autoSaveJourney({ customs_checklist: updated });
                              }}
                              className="rounded text-[#00A86B] focus:ring-0 w-3.5 h-3.5"
                            />
                            <span>Doctor Letter</span>
                          </label>
                        </div>

                        <a
                          href="/visa-guide"
                          className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold block text-center transition-all"
                        >
                          Read Arrival Guide →
                        </a>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ── FLOW 2: NOTEBOOK ARCHITECTURE (HAVE VISA? = NO) ── */}
          {hasVisaAlready === 'no' && (
            <div id="need-visa-pathway-dashboard" className="w-full max-w-6xl mx-auto mt-8 text-left animate-fadeIn space-y-6">
              
              {/* BRANCH A: PURPOSE = STUDY (8 STEPS NOTEBOOK ARCHITECTURE) */}
              {(travelPurpose === 'study' || !travelPurpose) && (
                <div className="space-y-6">
                  
                  {/* Top Pathway Header */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A86B]/20 text-emerald-300 border border-[#00A86B]/40 text-[10px] font-black uppercase tracking-wider mb-2">
                        <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Flow 2A: Study Abroad &amp; University Pathway (8 Steps)</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        Target Pathway: Study Abroad in {journeyDestination || 'Top Universities'}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                        8-Step notebook architecture: university shortlisting, document gathering, funds audit, readiness score &amp; VFS slot booking.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <div className="px-3.5 py-1.5 rounded-2xl bg-white/10 border border-white/15 text-white text-xs font-bold">
                        <span>Passport: {passportCountry || 'India'}</span>
                      </div>
                      <div className="px-3.5 py-1.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                        <span>Readiness Score: {studyReadinessScore}%</span>
                      </div>
                    </div>
                  </div>

                  {/* 8-Step Study Notebook Grid */}
                  <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto">
                    
                    
                    {/* STEP 1: Qualification & University Match */}
                    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)] space-y-6 text-left">
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-emerald-50 text-[#00A86B] flex items-center justify-center font-black text-sm sm:text-base shadow-xs">
                            1
                          </span>
                          <div>
                            <h4 className="text-base sm:text-lg font-black text-slate-900">
                              Step 1: Qualification &amp; University Match
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                              Tied-up institutions matching your profile in {journeyDestination || 'Destination'}
                            </p>
                          </div>
                        </div>
                        <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-emerald-50 text-[#00A86B] text-xs font-bold">
                          Step 1 of 8
                        </span>
                      </div>

                      {/* Custom Search-Style Dropdowns */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Custom Dropdown 1: Highest Qualification */}
                        <div className="relative">
                          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                            Highest Qualification
                          </label>
                          <div
                            ref={studyQualRef}
                            onClick={() => {
                              setIsStudyQualOpen(!isStudyQualOpen);
                              setIsStudyTargetOpen(false);
                            }}
                            className="relative bg-slate-50 hover:bg-slate-100/70 border border-slate-200 hover:border-[#00A86B]/60 rounded-2xl h-[52px] px-4 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                          >
                            <div className="flex items-center gap-2.5 min-w-0 flex-1">
                              <span className="text-lg shrink-0">
                                {studyQualificationOptions.find(o => o.value === studyQualification)?.icon || '🎓'}
                              </span>
                              <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                                {studyQualificationOptions.find(o => o.value === studyQualification)?.label || studyQualification}
                              </span>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isStudyQualOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                            {isStudyQualOpen && (
                              <div
                                className="absolute top-[calc(100%+6px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-2 max-h-[260px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                  Select Qualification
                                </div>
                                <div className="space-y-1">
                                  {studyQualificationOptions.map((opt) => {
                                    const isSelected = studyQualification === opt.value;
                                    return (
                                      <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => {
                                          setStudyQualification(opt.value as any);
                                          setIsStudyQualOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                                          isSelected ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                                        }`}
                                      >
                                        <div className="flex items-center gap-2.5 min-w-0">
                                          <span className="text-base">{opt.icon}</span>
                                          <span className="truncate">{opt.label}</span>
                                        </div>
                                        {isSelected && <Check className="w-4 h-4 text-[#00A86B] shrink-0 ml-1" />}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Custom Dropdown 2: Target Degree */}
                        <div className="relative">
                          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                            Target Degree
                          </label>
                          <div
                            ref={studyTargetRef}
                            onClick={() => {
                              setIsStudyTargetOpen(!isStudyTargetOpen);
                              setIsStudyQualOpen(false);
                            }}
                            className="relative bg-slate-50 hover:bg-slate-100/70 border border-slate-200 hover:border-[#00A86B]/60 rounded-2xl h-[52px] px-4 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                          >
                            <div className="flex items-center gap-2.5 min-w-0 flex-1">
                              <span className="text-lg shrink-0">
                                {studyTargetDegreeOptions.find(o => o.value === studyTargetDegree)?.icon || '📜'}
                              </span>
                              <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                                {studyTargetDegreeOptions.find(o => o.value === studyTargetDegree)?.label || studyTargetDegree}
                              </span>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isStudyTargetOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                            {isStudyTargetOpen && (
                              <div
                                className="absolute top-[calc(100%+6px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-2 max-h-[260px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                  Select Target Degree
                                </div>
                                <div className="space-y-1">
                                  {studyTargetDegreeOptions.map((opt) => {
                                    const isSelected = studyTargetDegree === opt.value;
                                    return (
                                      <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => {
                                          setStudyTargetDegree(opt.value as any);
                                          setIsStudyTargetOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                                          isSelected ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                                        }`}
                                      >
                                        <div className="flex items-center gap-2.5 min-w-0">
                                          <span className="text-base">{opt.icon}</span>
                                          <span className="truncate">{opt.label}</span>
                                        </div>
                                        {isSelected && <Check className="w-4 h-4 text-[#00A86B] shrink-0 ml-1" />}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Dynamic Destination Universities */}
                      <div className="space-y-2.5 pt-1">
                        <span className="text-xs sm:text-sm font-extrabold text-slate-700 block">
                          Top Verified Universities in {journeyDestination || 'Destination'}:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {currentStudyData.unis.map((uni, idx) => {
                            const isSelected = activeSelectedUni === uni.name;
                            return (
                              <div
                                key={idx}
                                onClick={() => {
                                  setSelectedMatchedUni(uni.name);
                                  setStudyTuitionFee(uni.fee);
                                }}
                                className={`p-4 rounded-2xl border flex flex-col justify-between cursor-pointer transition-all ${
                                  isSelected
                                    ? 'bg-emerald-50/80 border-[#00A86B] ring-2 ring-[#00A86B]/30 shadow-sm'
                                    : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-50 hover:border-slate-300'
                                }`}
                              >
                                <div>
                                  <div className="text-xs sm:text-sm font-black text-slate-900 line-clamp-2">{uni.name}</div>
                                  <div className="text-[11px] text-slate-500 mt-1">{uni.city} • {uni.rank}</div>
                                  <div className="text-xs font-black text-[#00A86B] mt-2">{uni.fee}</div>
                                </div>
                                <span className={`text-xs font-extrabold px-3 py-1 rounded-xl text-center mt-3 ${
                                  isSelected ? 'bg-[#00A86B] text-white shadow-2xs' : 'bg-slate-200/80 text-slate-700'
                                }`}>
                                  {isSelected ? 'Selected ✓' : 'Select University'}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-2">
                        <a
                          href={`/universities?country=${encodeURIComponent(journeyDestination || '')}`}
                          className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all"
                        >
                          <Search className="w-4 h-4" />
                          <span>Search 1,200+ Tied-up Programs in {journeyDestination || 'Course Finder'} →</span>
                        </a>
                      </div>
                    </div>

                    {/* STEP 2: Course & Expense Finalization */}
                    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)] space-y-6 text-left">
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-black text-sm sm:text-base shadow-xs">
                            2
                          </span>
                          <div>
                            <h4 className="text-base sm:text-lg font-black text-slate-900">
                              Step 2: Course &amp; Expense Finalization
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                              Total estimated 1st year budget and mandatory financial checklist for {journeyDestination || 'Destination'}
                            </p>
                          </div>
                        </div>
                        <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold">
                          Step 2 of 8
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                          <span className="text-xs font-bold text-slate-500 block">Selected Institution</span>
                          <span className="text-xs sm:text-sm font-black text-slate-900 mt-1 block truncate" title={activeSelectedUni}>
                            {activeSelectedUni}
                          </span>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                          <span className="text-xs font-bold text-slate-500 block">Annual Tuition Fee</span>
                          <span className="text-sm sm:text-base font-black text-[#00A86B] mt-1 block">
                            {activeTuitionFee}
                          </span>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                          <span className="text-xs font-bold text-slate-500 block">Living Cost Estimate</span>
                          <span className="text-sm sm:text-base font-black text-slate-800 mt-1 block">
                            {activeLivingCost}
                          </span>
                        </div>
                        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                          <span className="text-xs font-bold text-emerald-800 block">Total 1st Year Proof</span>
                          <span className="text-sm sm:text-base font-black text-[#00A86B] mt-1 block">
                            {currentStudyData.totalProof}
                          </span>
                        </div>
                      </div>

                      <div>
                        <span className="text-xs sm:text-sm font-extrabold text-slate-700 block mb-3">
                          Required Admission Document Checklist:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs font-semibold text-slate-800">
                          <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                            <CheckCircle2 className="w-4 h-4 text-[#00A86B] shrink-0" />
                            <span>Academic Transcripts</span>
                          </div>
                          <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                            <CheckCircle2 className="w-4 h-4 text-[#00A86B] shrink-0" />
                            <span>Statement of Purpose</span>
                          </div>
                          <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                            <CheckCircle2 className="w-4 h-4 text-[#00A86B] shrink-0" />
                            <span>2 LOR Letters</span>
                          </div>
                          <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                            <CheckCircle2 className="w-4 h-4 text-[#00A86B] shrink-0" />
                            <span>IELTS / Language Test</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* STEP 3: Document Gathering & Dashboard Sync */}
                    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)] space-y-6 text-left">
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-sm sm:text-base shadow-xs">
                            3
                          </span>
                          <div>
                            <h4 className="text-base sm:text-lg font-black text-slate-900">
                              Step 3: Document Gathering &amp; Dashboard Sync
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                              Upload real files to auto-update and verify data in Client Dashboard DB
                            </p>
                          </div>
                        </div>
                        <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-emerald-100 text-[#00A86B] text-xs font-bold">
                          Synced to /dashboard ✓
                        </span>
                      </div>

                      {/* Hidden Real File Inputs */}
                      <input
                        type="file"
                        ref={transcriptsInputRef}
                        onChange={(e) => e.target.files?.[0] && handleRealFileUpload('transcripts', e.target.files[0])}
                        className="hidden"
                        accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                      />
                      <input
                        type="file"
                        ref={sopInputRef}
                        onChange={(e) => e.target.files?.[0] && handleRealFileUpload('sop', e.target.files[0])}
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                      />
                      <input
                        type="file"
                        ref={lorInputRef}
                        onChange={(e) => e.target.files?.[0] && handleRealFileUpload('lor', e.target.files[0])}
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                      />
                      <input
                        type="file"
                        ref={ieltsInputRef}
                        onChange={(e) => e.target.files?.[0] && handleRealFileUpload('ielts', e.target.files[0])}
                        className="hidden"
                        accept=".pdf,.png,.jpg,.jpeg"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {[
                          { key: 'transcripts', label: 'Academic Transcripts (10th, 12th, Degree)', ref: transcriptsInputRef, isUploaded: !!uploadedDocFiles['transcripts'] || docTranscriptsUploaded, icon: '🎓' },
                          { key: 'sop', label: 'Statement of Purpose (SOP)', ref: sopInputRef, isUploaded: !!uploadedDocFiles['sop'] || docSopUploaded, icon: '📝' },
                          { key: 'lor', label: 'Letters of Recommendation (LOR)', ref: lorInputRef, isUploaded: !!uploadedDocFiles['lor'] || docLorUploaded, icon: '📜' },
                          { key: 'ielts', label: 'English Proficiency (IELTS / PTE / TOEFL)', ref: ieltsInputRef, isUploaded: !!uploadedDocFiles['ielts'] || docIeltsUploaded, icon: '🌐' }
                        ].map((doc, idx) => {
                          const fileData = uploadedDocFiles[doc.key];
                          const isUploading = uploadingDocKey === doc.key;

                          return (
                            <div
                              key={idx}
                              className={`p-4 rounded-2xl border transition-all ${
                                doc.isUploaded
                                  ? 'bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-200'
                                  : 'bg-slate-50/80 border-slate-200/80 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                  <span className="text-xl shrink-0">{doc.icon}</span>
                                  <div className="min-w-0">
                                    <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                                      {doc.label}
                                    </div>
                                    {fileData ? (
                                      <div className="text-xs font-semibold text-emerald-700 truncate mt-0.5 flex items-center gap-1.5">
                                        <span className="truncate">📄 {fileData.name}</span>
                                        <span className="text-slate-400 font-normal">({fileData.size})</span>
                                        <span className="text-[10px] text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md font-bold">Verified</span>
                                      </div>
                                    ) : doc.isUploaded ? (
                                      <div className="text-xs text-emerald-600 font-medium mt-0.5">
                                        Verified on Client Dashboard
                                      </div>
                                    ) : (
                                      <div className="text-xs text-slate-400 font-medium mt-0.5">
                                        PDF, DOCX, or Scanned Image
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0">
                                  {doc.isUploaded ? (
                                    <>
                                      <button
                                        type="button"
                                        onClick={() => doc.ref.current?.click()}
                                        className="px-3 py-2 rounded-xl text-xs font-extrabold bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs flex items-center gap-1.5 cursor-pointer transition-all"
                                      >
                                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                                        <span>Uploaded ✓</span>
                                      </button>
                                      <button
                                        type="button"
                                        title="Remove file"
                                        onClick={() => handleRemoveUploadedFile(doc.key)}
                                        className="w-8 h-8 rounded-xl bg-slate-200/80 hover:bg-red-100 hover:text-red-600 text-slate-600 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                                      >
                                        ✕
                                      </button>
                                    </>
                                  ) : (
                                    <button
                                      type="button"
                                      disabled={isUploading}
                                      onClick={() => doc.ref.current?.click()}
                                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 hover:border-[#00A86B] text-slate-700 hover:text-[#00A86B] hover:bg-emerald-50/50 shadow-2xs flex items-center gap-1.5 cursor-pointer transition-all"
                                    >
                                      {isUploading ? (
                                        <>
                                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#00A86B]" />
                                          <span>Scanning...</span>
                                        </>
                                      ) : (
                                        <>
                                          <Upload className="w-3.5 h-3.5" />
                                          <span>Upload +</span>
                                        </>
                                      )}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="text-xs sm:text-sm font-black text-emerald-950">University Application Status</div>
                          <div className="text-xs text-emerald-700 mt-0.5">Dossier prepared for {activeSelectedUni} admissions desk</div>
                        </div>
                        <span className="text-xs font-extrabold px-3 py-1.5 rounded-xl bg-white text-[#00A86B] border border-emerald-200 shrink-0 self-start sm:self-auto">
                          Applied (In Review)
                        </span>
                      </div>
                    </div>

                    {/* STEP 4: Visa Funds & Financial Audit */}
                    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)] space-y-6 text-left">
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-black text-sm sm:text-base shadow-xs">
                            4
                          </span>
                          <div>
                            <h4 className="text-base sm:text-lg font-black text-slate-900">
                              Step 4: Visa Funds &amp; Financial Audit
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                              Proof of funds calculator and verification for {journeyDestination || 'Destination'}
                            </p>
                          </div>
                        </div>
                        <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold">
                          Step 4 of 8
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Available Funds</label>
                          <div className="relative">
                            <input
                              type="number"
                              value={fundsAvailableAmount}
                              onChange={(e) => setFundsAvailableAmount(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-black text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#00A86B]"
                            />
                            <span className="absolute right-4 top-3 text-xs font-bold text-slate-400">{currentStudyData.currency}</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Estimated Timeline</label>
                          <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold text-slate-700 flex items-center">
                            ⏱️ 2–4 Weeks to Collect
                          </div>
                        </div>
                      </div>

                      {/* Partner Recommendations */}
                      <div className="space-y-3">
                        <span className="text-xs sm:text-sm font-extrabold text-slate-700 block">Partner Loan &amp; Insurance Providers:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between">
                            <div>
                              <div className="text-xs sm:text-sm font-black text-slate-900">Education Loan Partners</div>
                              <div className="text-xs text-slate-500 mt-1">{currentStudyData.loanPartners}</div>
                            </div>
                            <a href="/support" className="text-xs font-bold text-[#00A86B] mt-3 block hover:underline">Apply Loan →</a>
                          </div>

                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between">
                            <div>
                              <div className="text-xs sm:text-sm font-black text-slate-900">Mandatory Health Cover</div>
                              <div className="text-xs text-slate-500 mt-1">{currentStudyData.insurance}</div>
                            </div>
                            <a href="/services/travel-insurance" className="text-xs font-bold text-[#00A86B] mt-3 block hover:underline">View Policy →</a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* STEP 5: Dynamic Readiness Score */}
                    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg space-y-5 text-left">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-7 h-7 rounded-xl bg-[#00A86B] text-white flex items-center justify-center font-black text-xs">5</span>
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Step 5: Dynamic Visa Readiness Score</span>
                          </div>
                          <h4 className="text-2xl sm:text-3xl font-black text-white">
                            Visa Approval Likelihood: <span className="text-emerald-400">{studyReadinessScore}%</span>
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-2xl">
                            Algorithmic scoring based on academic qualification, language proficiency, verified funds docket for {journeyDestination || 'destination'}, and university offer status.
                          </p>
                        </div>

                        <div className="shrink-0">
                          {studyReadinessScore >= 95 ? (
                            <div className="bg-emerald-500/20 border border-emerald-500/40 p-4 rounded-2xl text-center">
                              <div className="text-xs sm:text-sm font-black text-emerald-300">⭐ High Profile Strength</div>
                              <div className="text-xs text-slate-200 mt-0.5">Self-Apply Recommended</div>
                              <a
                                href="/self-apply"
                                className="mt-2.5 inline-block px-5 py-2 bg-[#00A86B] hover:bg-[#008f5a] text-white text-xs font-black rounded-xl transition-all shadow-md"
                              >
                                Self Apply Now →
                              </a>
                            </div>
                          ) : (
                            <div className="bg-amber-500/20 border border-amber-500/40 p-4 rounded-2xl text-center">
                              <div className="text-xs sm:text-sm font-black text-amber-300">Profile Boost Needed (&lt;95%)</div>
                              <div className="text-xs text-slate-200 mt-0.5">Specialist Guidance Suggested</div>
                              <button
                                type="button"
                                onClick={() => {
                                  const formEl = document.getElementById('study-lead-capture-section');
                                  if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="mt-2.5 inline-block px-5 py-2 bg-[#00A86B] hover:bg-[#008f5a] text-white text-xs font-black rounded-xl transition-all shadow-md cursor-pointer"
                              >
                                📞 Contact Expert to Enhance Profile
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-emerald-400 to-[#00A86B] h-full rounded-full transition-all duration-500"
                          style={{ width: `${studyReadinessScore}%` }}
                        />
                      </div>
                    </div>

                    {/* STEP 6: Admission Re-Check */}
                    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)] space-y-5 text-left">
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-emerald-50 text-[#00A86B] flex items-center justify-center font-black text-sm sm:text-base shadow-xs">
                            6
                          </span>
                          <div>
                            <h4 className="text-base sm:text-lg font-black text-slate-900">
                              Step 6: Admission Re-Check
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                              Re-verify documents alongside {currentStudyData.admissionDocName}
                            </p>
                          </div>
                        </div>
                        <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-emerald-50 text-[#00A86B] text-xs font-bold">
                          Step 6 of 8
                        </span>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className="text-xs sm:text-sm font-bold text-slate-700 mr-2">{currentStudyData.admissionDocName}:</span>
                          <input
                            type="text"
                            value={casI20Number || currentStudyData.casNumber}
                            onChange={(e) => setCasI20Number(e.target.value)}
                            className="bg-white border border-slate-200 text-xs sm:text-sm font-black text-slate-900 rounded-xl px-3.5 py-2 w-full sm:w-48 text-left sm:text-right"
                          />
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                          <span className="text-xs sm:text-sm font-bold text-slate-700">University Offer Letter:</span>
                          <span className="text-xs sm:text-sm font-extrabold text-[#00A86B]">Verified by {activeSelectedUni} ✓</span>
                        </div>
                      </div>
                    </div>

                    {/* STEPS 7 & 8: VFS Appointment Booking & Final Application Submission */}
                    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)] space-y-5 text-left">
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-black text-sm sm:text-base shadow-xs">
                            7 &amp; 8
                          </span>
                          <div>
                            <h4 className="text-base sm:text-lg font-black text-slate-900">
                              Step 7 &amp; 8: Slot Booking &amp; Final Visa Filing
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                              Biometric appointment booking &amp; official embassy dossier submission
                            </p>
                          </div>
                        </div>
                        <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold">
                          Step 7 &amp; 8 of 8
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col justify-between gap-3">
                          <div>
                            <div className="text-xs sm:text-sm font-black text-slate-900">Step 7: Appointment Slot</div>
                            <div className="text-xs text-slate-500 mt-1">{currentStudyData.vfsText}</div>
                          </div>
                          <a
                            href="/vfs-appointment"
                            className="w-full text-center py-2.5 bg-[#00A86B] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#008f5a] transition-all"
                          >
                            Book Biometric Slot →
                          </a>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col justify-between gap-3">
                          <div>
                            <div className="text-xs sm:text-sm font-black text-slate-900">Step 8: Final Visa Filing</div>
                            <div className="text-xs text-slate-500 mt-1">Dossier lock &amp; embassy tracking generation</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setFinalDossierSubmitted(true)}
                            className={`w-full text-center py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                              finalDossierSubmitted ? 'bg-emerald-100 text-[#00A86B]' : 'bg-slate-900 text-white hover:bg-slate-800'
                            }`}
                          >
                            {finalDossierSubmitted ? 'Submitted ✓' : 'Submit Final Application'}
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* BRANCH B: PURPOSE = VISIT (TOURIST / FAMILY - DYNAMICALLY RESOLVED) */}
              {travelPurpose === 'visit' && (
                <div className="space-y-6">
                  
                  {/* Top Pathway Header */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A86B]/20 text-emerald-300 border border-[#00A86B]/40 text-[10px] font-black uppercase tracking-wider mb-2">
                        <Compass className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Flow 2B: Tourist &amp; Visitor Visa Engine</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        Target Pathway: Tourist / Visitor Visa to {journeyDestination || 'Abroad'}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                        3-Step tourist auditor: budget verification, trip itinerary planner / tour packages &amp; VFS slot booking.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <div className="px-3.5 py-1.5 rounded-2xl bg-white/10 border border-white/15 text-white text-xs font-bold">
                        <span>Passport: {passportCountry || 'India'}</span>
                      </div>
                      <div className="px-3.5 py-1.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                        <span>Verified Tourist Checklist</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* STEP 1: VFS Tourist Checklist & Budget Proof Auditor (6 Cols) */}
                    <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                        <span className="w-7 h-7 rounded-xl bg-emerald-50 text-[#00A86B] flex items-center justify-center font-black text-xs">1</span>
                        <div>
                          <h4 className="text-sm sm:text-base font-black text-slate-900">Step 1: VFS Tourist Checklist &amp; Budget Proof</h4>
                          <p className="text-[11px] text-slate-400">Essential visitor requirements for {journeyDestination || 'Destination'}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800">Passport Validity (6+ Months Minimum)</span>
                          <span className="text-xs font-extrabold text-[#00A86B]">Verified ✓</span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800">Proof of Funds</span>
                            <span className="text-xs font-extrabold text-[#00A86B]">Verified ✓</span>
                          </div>
                          <p className="text-[10px] text-slate-500">{currentVisitData.fundsText}</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800">Ties to Home Country (Job / Property / Family)</span>
                          <span className="text-xs font-extrabold text-[#00A86B]">Verified ✓</span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800">International Travel Health Insurance</span>
                          <span className="text-xs font-extrabold text-[#00A86B]">Verified ✓</span>
                        </div>
                      </div>
                    </div>

                    {/* STEP 2: Trip Planning Audit (6 Cols) */}
                    <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                        <span className="w-7 h-7 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-black text-xs">2</span>
                        <div>
                          <h4 className="text-sm sm:text-base font-black text-slate-900">Step 2: Trip Planning Audit</h4>
                          <p className="text-[11px] text-slate-400">Planned trip to {journeyDestination || 'Destination'} or need packages?</p>
                        </div>
                      </div>

                      <div>
                        <span className="text-xs font-bold text-slate-600 block mb-2">Planned trip already?</span>
                        <div className="grid grid-cols-2 gap-2.5">
                          <button
                            type="button"
                            onClick={() => setVisitPlannedAlready('yes')}
                            className={`py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                              visitPlannedAlready === 'yes'
                                ? 'bg-slate-900 text-white shadow-md'
                                : 'bg-slate-50 border border-slate-200 text-slate-700'
                            }`}
                          >
                            YES (I have itinerary)
                          </button>
                          <button
                            type="button"
                            onClick={() => setVisitPlannedAlready('no')}
                            className={`py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                              visitPlannedAlready === 'no'
                                ? 'bg-[#00A86B] text-white shadow-md'
                                : 'bg-slate-50 border border-slate-200 text-slate-700'
                            }`}
                          >
                            NO (Need Tour Packages)
                          </button>
                        </div>
                      </div>

                      {visitPlannedAlready === 'yes' ? (
                        <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
                          <div className="text-xs font-bold text-emerald-900">AI Itinerary &amp; Hotel Audit</div>
                          <p className="text-[11px] text-emerald-700">Upload flight itinerary &amp; hotel booking for {journeyDestination || 'stay'} genuine visitor audit.</p>
                          <button
                            type="button"
                            onClick={() => setVisitItineraryUploaded(true)}
                            className="px-3.5 py-1.5 bg-[#00A86B] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                          >
                            {visitItineraryUploaded ? 'Itinerary Uploaded ✓' : 'Upload Travel Plan'}
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <span className="text-[11px] font-bold text-slate-600 block">Curated {journeyDestination || 'Destination'} Tour Packages:</span>
                          <div className="space-y-1.5">
                            {currentVisitData.packages.map((pkg, idx) => (
                              <div
                                key={idx}
                                onClick={() => setVisitSelectedTourPackage(pkg.name)}
                                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer ${
                                  visitSelectedTourPackage === pkg.name ? 'bg-emerald-50 border-[#00A86B]' : 'bg-slate-50 border-slate-200'
                                }`}
                              >
                                <div>
                                  <div className="text-xs font-black text-slate-900">{pkg.name}</div>
                                  <div className="text-[10px] text-slate-500">{pkg.days} • {pkg.price}</div>
                                </div>
                                <span className="text-[10px] font-bold text-[#00A86B]">Select →</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* STEP 3: VFS Booking & Final Submission (12 Cols) */}
                    <div className="lg:col-span-12 bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-6 h-6 rounded-lg bg-[#00A86B] text-white flex items-center justify-center font-black text-xs">3</span>
                          <span className="text-xs font-black text-slate-900">Step 3: Final Document Re-check &amp; VFS Submission</span>
                        </div>
                        <p className="text-xs text-slate-500">{currentVisitData.vfsSlotText}</p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <a
                          href="/vfs-appointment"
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all"
                        >
                          Book VFS Slot →
                        </a>
                        <a
                          href="/self-apply"
                          className="px-4 py-2 bg-[#00A86B] hover:bg-[#008f5a] text-white font-bold text-xs rounded-xl shadow-md transition-all"
                        >
                          Submit Visa Application
                        </a>
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* FALLBACK / WORK / PR / GENERAL LEAD CAPTURE SECTION */}
              <div id="study-lead-capture-section" className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm text-left">
                {leadSubmittedSuccess ? (
                  <div className="text-center py-6 space-y-3 animate-fadeIn">
                    <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 text-[#00A86B] flex items-center justify-center mx-auto text-3xl shadow-sm">
                      ✅
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      Profile Evaluation Request Received!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto leading-relaxed">
                      Our certified <strong>{journeyDestination || 'Visa'}</strong> specialist will review your profile and reach out to you on <strong>{leadContactPref === 'whatsapp' ? 'WhatsApp' : 'Phone'}</strong> ({leadPhoneNumber}) shortly.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="mb-6 pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#00A86B] border border-emerald-200 text-[10px] font-black uppercase tracking-wider mb-1.5">
                          <Sparkles className="w-3 h-3" />
                          <span>1-on-1 Specialist Matchmaker</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900">
                          Need Expert Profile Enhancement for {journeyDestination || 'Abroad'}?
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Get your SOP, financial proof, and visa file reviewed by certified immigration lawyers.
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleNoVisaLeadSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={leadFullName}
                          onChange={(e) => setLeadFullName(e.target.value)}
                          placeholder="Your full name"
                          className="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#00A86B]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          value={leadPhoneNumber}
                          onChange={(e) => setLeadPhoneNumber(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#00A86B]"
                        />
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={leadSubmitting}
                          className={`w-full h-11 font-extrabold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 ${
                            'bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-900/30'
                          }`}
                        >
                          <PhoneCall className={`w-4 h-4 ${hasVisaAlready === 'no' ? 'text-cyan-400' : 'text-emerald-100'}`} />
                          <span>{leadSubmitting ? 'Connecting...' : 'Request Free Specialist Callback'}</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ── 3. MULTI-TAB GLOBAL SEARCH & FILTER WIDGET ── */}
          {travelScopeTab === 'international' && (
          <div className="w-full max-w-6xl mx-auto mt-8 sm:mt-10 bg-white border border-slate-200/90 rounded-2xl sm:rounded-[30px] p-4 sm:p-7 md:p-9 shadow-[0_14px_50px_rgba(0,0,0,0.05)] text-left">
            
            {/* Top 5 Service Directory Tabs */}
            <div className="flex items-center justify-start sm:justify-between gap-4 sm:gap-6 border-b border-slate-100 overflow-x-auto no-scrollbar pb-3 sm:pb-4 mb-5 sm:mb-6 px-1">
              <button
                type="button"
                onClick={() => setActiveSearchTab('universities')}
                className={`shrink-0 flex items-center gap-2 text-xs sm:text-sm md:text-[15px] font-extrabold transition-all whitespace-nowrap cursor-pointer pb-3 sm:pb-4 -mb-[13px] sm:-mb-[17px] ${
                  activeSearchTab === 'universities'
                    ? hasVisaAlready === 'no' ? 'border-b-2 border-slate-900 text-slate-900' : 'border-b-2 border-[#00A86B] text-[#00A86B]'
                    : 'border-b-2 border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Universities</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSearchTab('consultants')}
                className={`shrink-0 flex items-center gap-2 text-xs sm:text-sm md:text-[15px] font-extrabold transition-all whitespace-nowrap cursor-pointer pb-3 sm:pb-4 -mb-[13px] sm:-mb-[17px] ${
                  activeSearchTab === 'consultants'
                    ? hasVisaAlready === 'no' ? 'border-b-2 border-slate-900 text-slate-900' : 'border-b-2 border-[#00A86B] text-[#00A86B]'
                    : 'border-b-2 border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Consultants</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSearchTab('relocation')}
                className={`shrink-0 flex items-center gap-2 text-xs sm:text-sm md:text-[15px] font-extrabold transition-all whitespace-nowrap cursor-pointer pb-3 sm:pb-4 -mb-[13px] sm:-mb-[17px] ${
                  activeSearchTab === 'relocation'
                    ? hasVisaAlready === 'no' ? 'border-b-2 border-slate-900 text-slate-900' : 'border-b-2 border-[#00A86B] text-[#00A86B]'
                    : 'border-b-2 border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Luggage className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Relocation Assistance</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSearchTab('jobs')}
                className={`shrink-0 flex items-center gap-2 text-xs sm:text-sm md:text-[15px] font-extrabold transition-all whitespace-nowrap cursor-pointer pb-3 sm:pb-4 -mb-[13px] sm:-mb-[17px] ${
                  activeSearchTab === 'jobs'
                    ? hasVisaAlready === 'no' ? 'border-b-2 border-slate-900 text-slate-900' : 'border-b-2 border-[#00A86B] text-[#00A86B]'
                    : 'border-b-2 border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Jobs Abroad</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSearchTab('lawyers')}
                className={`shrink-0 flex items-center gap-2 text-xs sm:text-sm md:text-[15px] font-extrabold transition-all whitespace-nowrap cursor-pointer pb-3 sm:pb-4 -mb-[13px] sm:-mb-[17px] ${
                  activeSearchTab === 'lawyers'
                    ? hasVisaAlready === 'no' ? 'border-b-2 border-slate-900 text-slate-900' : 'border-b-2 border-[#00A86B] text-[#00A86B]'
                    : 'border-b-2 border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Scale className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Immigration Lawyers</span>
              </button>
            </div>

            {/* ── DYNAMIC ROW 1 FILTER FIELDS ── */}
            
            {/* TAB 1: UNIVERSITIES */}
            {activeSearchTab === 'universities' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6 animate-fadeIn">
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Course Level</label>
                  <div
                    ref={courseLevelRef}
                    className="relative bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 rounded-2xl h-[52px] px-4 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                    onClick={() => setIsCourseLevelOpen(!isCourseLevelOpen)}
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
                        className="absolute top-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[260px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="space-y-0.5">
                          {courseLevelOptions.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setCourseLevel(opt.value);
                                setIsCourseLevelOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                                courseLevel === opt.value ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <span>{opt.label}</span>
                              {courseLevel === opt.value && <Check className="w-3.5 h-3.5 text-[#00A86B]" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Destination Country</label>
                  <input
                    type="text"
                    value={searchCountry}
                    onChange={(e) => setSearchCountry(e.target.value)}
                    placeholder="e.g. UAE, Canada, UK, Australia"
                    className="w-full bg-slate-50/80 border border-slate-200/90 rounded-2xl h-[52px] px-4 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                  />
                </div>

                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">State / City</label>
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="e.g. Dubai, Toronto, London, Sydney"
                    className="w-full bg-slate-50/80 border border-slate-200/90 rounded-2xl h-[52px] px-4 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: CONSULTANTS (PASSPORT, DESTINATION, PURPOSE FILTER) */}
            {activeSearchTab === 'consultants' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6 animate-fadeIn">
                
                {/* 1. Passport Country */}
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Passport / Origin
                  </label>
                  <div
                    ref={consultantPassportRef}
                    className="relative bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 rounded-2xl h-[52px] px-4 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                    onClick={() => {
                      setIsConsultantPassportOpen(!isConsultantPassportOpen);
                      setIsConsultantDestOpen(false);
                      setIsConsultantPurposeOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="text-base shrink-0">
                        {consultantPassport ? (passportCountryOptions.find(o => o.value === consultantPassport)?.icon || '🌐') : '🌐'}
                      </span>
                      <span className={`text-sm font-semibold truncate ${consultantPassport ? 'text-slate-800 font-bold' : 'text-slate-400'}`}>
                        {consultantPassport ? (passportCountryOptions.find(o => o.value === consultantPassport)?.label || consultantPassport) : 'Select Passport'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isConsultantPassportOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                    {isConsultantPassportOpen && (
                      <div
                        className="absolute top-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[260px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="space-y-0.5">
                          {passportCountryOptions.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setConsultantPassport(opt.value);
                                setIsConsultantPassportOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                                consultantPassport === opt.value ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-base">{opt.icon}</span>
                                <span className="truncate">{opt.label}</span>
                              </div>
                              {consultantPassport === opt.value && <Check className="w-3.5 h-3.5 text-[#00A86B]" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Target Destination Country */}
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Target Destination
                  </label>
                  <div
                    ref={consultantDestRef}
                    className="relative bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 rounded-2xl h-[52px] px-4 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                    onClick={() => {
                      setIsConsultantDestOpen(!isConsultantDestOpen);
                      setIsConsultantPassportOpen(false);
                      setIsConsultantPurposeOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="text-base shrink-0">
                        {consultantDestination ? (journeyDestinationOptions.find(o => o.value === consultantDestination)?.icon || '✈️') : '✈️'}
                      </span>
                      <span className={`text-sm font-semibold truncate ${consultantDestination ? 'text-slate-800 font-bold' : 'text-slate-400'}`}>
                        {consultantDestination ? (journeyDestinationOptions.find(o => o.value === consultantDestination)?.label || consultantDestination) : 'Select Destination'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isConsultantDestOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                    {isConsultantDestOpen && (
                      <div
                        className="absolute top-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[260px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="space-y-0.5">
                          {journeyDestinationOptions.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setConsultantDestination(opt.value);
                                setIsConsultantDestOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                                consultantDestination === opt.value ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-base">{opt.icon}</span>
                                <span className="truncate">{opt.label}</span>
                              </div>
                              {consultantDestination === opt.value && <Check className="w-3.5 h-3.5 text-[#00A86B]" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Purpose / Visa Type */}
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Visa Purpose / Category
                  </label>
                  <div
                    ref={consultantPurposeRef}
                    className="relative bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 rounded-2xl h-[52px] px-4 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                    onClick={() => {
                      setIsConsultantPurposeOpen(!isConsultantPurposeOpen);
                      setIsConsultantPassportOpen(false);
                      setIsConsultantDestOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="text-base shrink-0">
                        {consultantPurpose ? (travelPurposeOptions.find(o => o.value === consultantPurpose)?.icon || '🎯') : '🎯'}
                      </span>
                      <span className={`text-sm font-semibold truncate ${consultantPurpose ? 'text-slate-800 font-bold' : 'text-slate-400'}`}>
                        {consultantPurpose ? (travelPurposeOptions.find(o => o.value === consultantPurpose)?.label || consultantPurpose) : 'Select Visa Goal'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isConsultantPurposeOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                    {isConsultantPurposeOpen && (
                      <div
                        className="absolute top-[calc(100%+8px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[260px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="space-y-0.5">
                          {travelPurposeOptions.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setConsultantPurpose(opt.value);
                                setIsConsultantPurposeOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-left cursor-pointer transition-colors ${
                                consultantPurpose === opt.value ? 'bg-emerald-50 text-[#00A86B] font-bold' : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-base">{opt.icon}</span>
                                <span className="truncate">{opt.label}</span>
                              </div>
                              {consultantPurpose === opt.value && <Check className="w-3.5 h-3.5 text-[#00A86B]" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: RELOCATION ASSISTANCE */}
            {activeSearchTab === 'relocation' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6 animate-fadeIn">
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Relocation Destination</label>
                  <input
                    type="text"
                    value={searchCountry}
                    onChange={(e) => setSearchCountry(e.target.value)}
                    placeholder="e.g. Dubai, London, Toronto, Sydney"
                    className="w-full bg-slate-50/80 border border-slate-200/90 rounded-2xl h-[52px] px-4 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                  />
                </div>
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Service Type</label>
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="e.g. Shared Accommodation, Forex, Airport Pickup"
                    className="w-full bg-slate-50/80 border border-slate-200/90 rounded-2xl h-[52px] px-4 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: JOBS ABROAD */}
            {activeSearchTab === 'jobs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6 animate-fadeIn">
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Work Destination</label>
                  <input
                    type="text"
                    value={searchCountry}
                    onChange={(e) => setSearchCountry(e.target.value)}
                    placeholder="e.g. Germany, UAE, Canada, UK"
                    className="w-full bg-slate-50/80 border border-slate-200/90 rounded-2xl h-[52px] px-4 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                  />
                </div>
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Job Role / Industry</label>
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="e.g. Software Engineer, Healthcare, Hospitality"
                    className="w-full bg-slate-50/80 border border-slate-200/90 rounded-2xl h-[52px] px-4 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                  />
                </div>
              </div>
            )}

            {/* TAB 5: IMMIGRATION LAWYERS */}
            {activeSearchTab === 'lawyers' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6 animate-fadeIn">
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Embassy / Jurisdiction Country</label>
                  <input
                    type="text"
                    value={searchCountry}
                    onChange={(e) => setSearchCountry(e.target.value)}
                    placeholder="e.g. Canada, UK, USA, Australia"
                    className="w-full bg-slate-50/80 border border-slate-200/90 rounded-2xl h-[52px] px-4 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                  />
                </div>
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Legal Matter / Issue</label>
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="e.g. Visa Refusal Appeal, Judicial Review, Overstay"
                    className="w-full bg-slate-50/80 border border-slate-200/90 rounded-2xl h-[52px] px-4 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                  />
                </div>
              </div>
            )}

            {/* Global Search Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleGlobalSearch}
                className="w-full py-3.5 font-extrabold text-sm sm:text-base rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/25"
              >
                <Search className="w-4 h-4 text-cyan-400" />
                <span>Search {activeSearchTab === 'universities' ? 'Universities & Courses' : activeSearchTab === 'consultants' ? 'Verified Consultants' : activeSearchTab === 'relocation' ? 'Relocation Classifieds' : activeSearchTab === 'jobs' ? 'Jobs Abroad' : 'Immigration Lawyers'} →</span>
              </button>
            </div>

            {/* ── MONETIZATION LAYER: CLASSIFIEDS & DISCORD ADS CONTAINERS ── */}
            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Ad Placeholder 1: Relocation Classifieds & Services */}
              <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/40 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shrink-0 shadow-sm text-lg">
                    📦
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded-md">
                        Sponsored Classifieds
                      </span>
                    </div>
                    <h5 className="text-xs sm:text-sm font-black text-slate-900 mt-1">
                      Student Shuttles, Shared Flats &amp; Forex
                    </h5>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Verified rides, airport transfers &amp; low-cost shared student apartments in Dubai, Toronto, London &amp; Melbourne.
                    </p>
                  </div>
                </div>
                <a
                  href="/classifieds"
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl whitespace-nowrap shrink-0 shadow-xs"
                >
                  View Deals →
                </a>
              </div>

              {/* Ad Placeholder 2: Discord & Student Community */}
              <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/40 border border-indigo-200/80 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#5865F2] text-white flex items-center justify-center font-bold shrink-0 shadow-sm text-lg">
                    💬
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-200/70 text-indigo-900 px-2 py-0.5 rounded-md">
                        Global Community
                      </span>
                    </div>
                    <h5 className="text-xs sm:text-sm font-black text-slate-900 mt-1">
                      Join 15,000+ Students &amp; Travellers
                    </h5>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Live visa Q&amp;A, pre-departure roommate matching, and city guides on Discord.
                    </p>
                  </div>
                </div>
                <a
                  href="https://discord.gg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold rounded-xl whitespace-nowrap shrink-0 shadow-xs flex items-center gap-1"
                >
                  <span>Join Discord</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>

          </div>
          )}
          {/* ── 4. POPULAR DESTINATIONS SECTION (1:1 CLEAN CIRCULAR FLAGS AS IN SCREENSHOT) ── */}
          <div className="w-full max-w-6xl mx-auto mt-8 sm:mt-10 bg-white border border-slate-200/90 rounded-2xl sm:rounded-[30px] p-5 sm:p-7 md:p-8 shadow-[0_14px_50px_rgba(0,0,0,0.05)] text-left">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                  Popular Destinations
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                  Explore top country pathways with verified consultants and university partners.
                </p>
              </div>
              <a
                href="/universities"
                className="text-xs font-bold text-[#00A86B] hover:underline flex items-center gap-1 shrink-0"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex items-center justify-between gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-2 px-1 text-center">
              {[
                { name: 'Canada', code: 'ca', country: 'Canada' },
                { name: 'UK', code: 'gb', country: 'United Kingdom' },
                { name: 'USA', code: 'us', country: 'United States' },
                { name: 'Australia', code: 'au', country: 'Australia' },
                { name: 'Germany', code: 'de', country: 'Germany' },
                { name: 'New Zealand', code: 'nz', country: 'New Zealand' },
                { name: 'UAE', code: 'ae', country: 'UAE' },
                { name: 'More', code: '', country: '' }
              ].map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (item.country) {
                      setJourneyDestination(item.country);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      window.location.href = '/universities';
                    }
                  }}
                  className="flex flex-col items-center justify-center min-w-[68px] sm:min-w-[80px] p-2 hover:scale-105 transition-transform cursor-pointer group select-none"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden mb-2 shadow-sm group-hover:shadow-md transition-all flex items-center justify-center bg-white border border-slate-200/80">
                    {item.code ? (
                      <img
                        src={`https://flagcdn.com/w160/${item.code}.png`}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-full"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-black text-sm">
                        •••
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-[#00A86B] truncate w-full text-center">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
          {/* ── EXPLORE CLASSIFIEDS SECTION (EXACT MOCKUP IMPLEMENTATION) ── */}
          <div className="w-full max-w-6xl mx-auto mt-8 sm:mt-10 bg-white border border-slate-200/90 rounded-2xl sm:rounded-[30px] p-5 sm:p-7 md:p-8 shadow-[0_14px_50px_rgba(0,0,0,0.05)] text-left">
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base sm:text-2xl font-black text-slate-900 leading-tight">Explore Classifieds</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">Find great offers from trusted providers</p>
              </div>
              <a
                href="/classifieds"
                className="text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
              >
                View All
              </a>
            </div>

            {/* 5 Cards Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
              
              {/* Card 1: Study in Canada */}
              <a
                href="/universities?country=Canada"
                className="group bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-slate-100">
                  <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md bg-[#6366f1] text-white text-[9px] font-black uppercase tracking-wider shadow-sm">
                    FEATURED
                  </span>
                  <img
                    src="https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=600&auto=format&fit=crop&q=80"
                    alt="Study in Canada"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      Study in Canada
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5 line-clamp-2">
                      Get admission in top universities
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 text-[11px] font-bold">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-slate-800 font-black">4.8</span>
                    </div>
                    <span className="text-slate-500 font-semibold">Canada</span>
                  </div>
                </div>
              </a>

              {/* Card 2: Flight Tickets */}
              <a
                href="/find-experts?category=flight"
                className="group bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-slate-100">
                  <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md bg-[#10b981] text-white text-[9px] font-black uppercase tracking-wider shadow-sm">
                    OFFER
                  </span>
                  <img
                    src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=600&auto=format&fit=crop&q=80"
                    alt="Flight Tickets"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      Flight Tickets
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5 line-clamp-2">
                      Domestic &amp; International flight deals
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 text-[11px] font-bold">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-slate-800 font-black">4.6</span>
                    </div>
                    <span className="text-slate-500 font-semibold">All Routes</span>
                  </div>
                </div>
              </a>

              {/* Card 3: Hotel Stays */}
              <a
                href="/classifieds?category=hotels"
                className="group bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop&q=80"
                    alt="Hotel Stays"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      Hotel Stays
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5 line-clamp-2">
                      Best hotel deals across India
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 text-[11px] font-bold">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-slate-800 font-black">4.7</span>
                    </div>
                    <span className="text-slate-500 font-semibold">1000+ Hotels</span>
                  </div>
                </div>
              </a>

              {/* Card 4: Outstation Cabs */}
              <a
                href="/classifieds?category=cabs"
                className="group bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80"
                    alt="Outstation Cabs"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      Outstation Cabs
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5 line-clamp-2">
                      Safe &amp; reliable cabs at best prices
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 text-[11px] font-bold">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-slate-800 font-black">4.5</span>
                    </div>
                    <span className="text-slate-500 font-semibold">All India</span>
                  </div>
                </div>
              </a>

              {/* Card 5: Holiday Packages */}
              <a
                href="/tours"
                className="group bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-300 flex flex-col cursor-pointer col-span-2 sm:col-span-1"
              >
                <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&auto=format&fit=crop&q=80"
                    alt="Holiday Packages"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      Holiday Packages
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5 line-clamp-2">
                      Amazing holiday packages
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 text-[11px] font-bold">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-slate-800 font-black">4.6</span>
                    </div>
                    <span className="text-slate-500 font-semibold">All India</span>
                  </div>
                </div>
              </a>

            </div>
          </div>

          {/* ── HOW TRAVLTIK WORKS SECTION (EXACT MOCKUP IMPLEMENTATION) ── */}
          <div className="w-full max-w-6xl mx-auto mt-8 sm:mt-10 bg-white border border-slate-200/90 rounded-2xl sm:rounded-[30px] p-6 sm:p-8 md:p-10 shadow-[0_14px_50px_rgba(0,0,0,0.05)] text-center">
            <div className="mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                How TravlTik Works?
              </h3>
            </div>

            <div className="relative max-w-5xl mx-auto">
              {/* 4 Steps Grid with Connectors */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 relative z-10">
                
                {/* Step 1: Search */}
                <div className="flex flex-col items-center text-center relative group">
                  <div className="relative mb-3">
                    <span className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-blue-50 text-blue-600 font-black text-xs flex items-center justify-center border border-blue-200 shadow-2xs z-10">
                      1
                    </span>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border border-blue-100 shadow-[0_8px_25px_rgba(37,99,235,0.08)] flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                      <Search className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
                    </div>
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 mt-1">Search</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1 max-w-[170px] leading-relaxed">
                    Find services, destinations or trusted experts
                  </p>
                </div>

                {/* Step 2: Compare */}
                <div className="flex flex-col items-center text-center relative group">
                  <div className="relative mb-3">
                    <span className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-blue-50 text-blue-600 font-black text-xs flex items-center justify-center border border-blue-200 shadow-2xs z-10">
                      2
                    </span>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border border-blue-100 shadow-[0_8px_25px_rgba(37,99,235,0.08)] flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                      </svg>
                    </div>
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 mt-1">Compare</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1 max-w-[170px] leading-relaxed">
                    Compare options, reviews &amp; prices
                  </p>
                </div>

                {/* Step 3: Connect */}
                <div className="flex flex-col items-center text-center relative group">
                  <div className="relative mb-3">
                    <span className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-blue-50 text-blue-600 font-black text-xs flex items-center justify-center border border-blue-200 shadow-2xs z-10">
                      3
                    </span>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border border-emerald-100 shadow-[0_8px_25px_rgba(16,185,129,0.08)] flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                      <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
                    </div>
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 mt-1">Connect</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1 max-w-[170px] leading-relaxed">
                    Connect with verified experts &amp; book with confidence
                  </p>
                </div>

                {/* Step 4: Travel */}
                <div className="flex flex-col items-center text-center relative group">
                  <div className="relative mb-3">
                    <span className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-blue-50 text-blue-600 font-black text-xs flex items-center justify-center border border-blue-200 shadow-2xs z-10">
                      4
                    </span>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border border-blue-100 shadow-[0_8px_25px_rgba(37,99,235,0.08)] flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                      <Send className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2] -rotate-12 translate-x-0.5" />
                    </div>
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 mt-1">Travel</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1 max-w-[170px] leading-relaxed">
                    Plan, prepare and enjoy your journey
                  </p>
                </div>

              </div>
            </div>
          </div>


          {/* ── 6. BOTTOM 2 FEATURE CARDS (READINESS AUDIT & EMBASSY CHECKLIST DOWNLOAD) ── */}
          <div className="w-full max-w-6xl mx-auto mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 text-left">
            
            {/* Left Card: Check Your Travel Readiness */}
            <a
              href="/visa-guide"
              className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl sm:rounded-[28px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-extrabold text-slate-900">
                    Check Your Travel Readiness
                  </h3>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-[#00A86B] text-[10px] font-black uppercase tracking-wider">
                    Instant AI Audit
                  </span>
                </div>

                <div className="flex items-center gap-5 my-2">
                  <div className="relative w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-500 flex items-center justify-center shrink-0">
                    <div className="text-center">
                      <span className="text-base font-black text-slate-900 leading-none">82</span>
                      <span className="text-[9px] text-slate-400 block font-bold">/100</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs font-semibold text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#00A86B] stroke-[3]" />
                      <span>Passport Validity</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#00A86B] stroke-[3]" />
                      <span>Documents Verified</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#00A86B] stroke-[3]" />
                      <span>Finances Ready</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#00A86B] stroke-[3]" />
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

            {/* Right Card: Free Embassy Document Checklist Download */}
            <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl sm:rounded-[28px] p-5 sm:p-6 shadow-sm flex flex-col justify-between">
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
                  <div className="relative w-full sm:w-72">
                    <div
                      ref={checklistCountryRef}
                      onClick={() => setIsChecklistCountryOpen(!isChecklistCountryOpen)}
                      className="relative bg-slate-50 hover:bg-slate-100/80 border border-slate-200/90 rounded-2xl h-[46px] px-3.5 flex items-center justify-between shadow-2xs transition-colors cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span className="text-base shrink-0">
                          {checklistCountryOptions.find(o => o.value === checklistCountry)?.icon || '🇦🇪'}
                        </span>
                        <span className="text-xs font-bold text-slate-800 truncate">
                          {checklistCountryOptions.find(o => o.value === checklistCountry)?.label || 'United Arab Emirates (UAE / Dubai)'}
                        </span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${isChecklistCountryOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />

                      {isChecklistCountryOpen && (
                        <div
                          className="absolute bottom-[calc(100%+6px)] sm:bottom-auto sm:top-[calc(100%+6px)] left-0 w-full z-[999] bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-1.5 max-h-[260px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Select Country
                          </div>
                          <div className="space-y-0.5">
                            {checklistCountryOptions.map((opt) => {
                              const isSelected = checklistCountry === opt.value;
                              return (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => {
                                    setChecklistCountry(opt.value);
                                    setIsChecklistCountryOpen(false);
                                  }}
                                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left cursor-pointer transition-colors ${
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

                  <a
                    href="/visa-guide"
                    className="w-full sm:w-auto bg-[#00A86B] hover:bg-[#008f5a] text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all whitespace-nowrap cursor-pointer"
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
  );
}
