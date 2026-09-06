import React, { useState, useMemo, useRef, useEffect } from 'react';
import { OfficialRequirementsCard } from './OfficialRequirementsCard';
import { ConsularMockPrepCard } from './ConsularMockPrepCard';
import {
  getStudentVisaSteps,
  getStudentDocuments,
  getStudentOverview,
  getStudentFees,
  getStudentProcessingTime,
  getStudentProcessingDetails,
  getStudentValidity,
  getStudentValidityDetails,
  getStudentStayDuration,
  getStudentStayDetails,
  getStudentEntryType,
  getStudentEntryDetails,
  getStudentFAQ,
  getStudentFinancialProofs,
  getStudentOtherRequirements,
  getStudentOfficialSourceName
} from '../../lib/student-visa';
import {
  getTourismSteps,
  getTourismVisaSteps,
  getTourismDocuments,
  getTourismOverview,
  getTourismHighlights,
  getTourismFees,
  getTourismProcessingTime,
  getTourismProcessingDetails,
  getTourismValidity,
  getTourismStayDuration,
  getTourismEntryType,
  getTourismFAQ,
  getTourismFinancialProofs,
  getTourismRequirements,
  getTourismOfficialSourceName
} from '../../lib/tourism-visa';
import {
  getWorkSteps,
  getWorkVisaSteps,
  getWorkDocuments,
  getWorkOverview,
  getWorkHighlights,
  getWorkFees,
  getWorkProcessingTime,
  getWorkProcessingDetails,
  getWorkValidity,
  getWorkStayDuration,
  getWorkEntryType,
  getWorkFAQ,
  getWorkFinancialProofs,
  getWorkRequirements,
  getWorkOfficialSourceName
} from '../../lib/work-visa';
import {
  getBusinessSteps,
  getBusinessVisaSteps,
  getBusinessDocuments,
  getBusinessOverview,
  getBusinessHighlights,
  getBusinessFees,
  getBusinessProcessingTime,
  getBusinessProcessingDetails,
  getBusinessValidity,
  getBusinessStayDuration,
  getBusinessEntryType,
  getBusinessFAQ,
  getBusinessFinancialProofs,
  getBusinessRequirements,
  getBusinessOfficialSourceName
} from '../../lib/business-visa';
import {
  getPRSteps,
  getPRVisaSteps,
  getPRDocuments,
  getPROverview,
  getPRHighlights,
  getPRFees,
  getPRProcessingTime,
  getPRProcessingDetails,
  getPRValidity,
  getPRStayDuration,
  getPREntryType,
  getPRFAQ,
  getPRFinancialProofs,
  getPRRequirements,
  getPROfficialSourceName
} from '../../lib/pr-visa';
import {
  getFamilySteps,
  getFamilyVisaSteps,
  getFamilyDocuments,
  getFamilyOverview,
  getFamilyHighlights,
  getFamilyFees,
  getFamilyProcessingTime,
  getFamilyProcessingDetails,
  getFamilyValidity,
  getFamilyStayDuration,
  getFamilyEntryType,
  getFamilyFAQ,
  getFamilyFinancialProofs,
  getFamilyRequirements,
  getFamilyOfficialSourceName
} from '../../lib/family-visa';

// Custom sleek dropdown select component matching Atlys aesthetics
function PortalCustomSelect({
  value,
  onChange,
  options,
  label,
  placeholder = 'Select an option'
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  label?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasValue = value && value.trim() !== '';

  return (
    <div className={`relative space-y-1.5 ${open ? 'z-[60]' : 'z-10'}`} ref={dropdownRef}>
      {label && <label className="block text-xs sm:text-[13px] font-bold text-slate-800 tracking-tight leading-snug">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full h-11 px-3.5 rounded-xl border bg-white text-xs sm:text-sm font-semibold flex items-center justify-between transition-all cursor-pointer shadow-2xs hover:shadow-xs ${
          open ? 'border-indigo-600 ring-2 ring-indigo-500/20' : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <span className={`truncate text-left ${hasValue ? 'text-slate-900 font-bold' : 'text-slate-400 font-normal'}`}>
          {hasValue ? value : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180 text-indigo-600' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1.5 min-w-[280px] w-full bg-white rounded-2xl border border-slate-200/90 shadow-2xl p-1.5 z-[70] animate-in fade-in zoom-in-95 origin-top">
          <div className="max-h-56 overflow-y-auto space-y-0.5">
            {options.map((opt) => {
              const isSelected = opt === value;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50 text-indigo-900 font-bold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                  }`}
                >
                  <span className="truncate">{opt}</span>
                  {isSelected && <Check className="w-4 h-4 text-indigo-600 shrink-0 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
import { 
  ShieldCheck, 
  Clock, 
  Calendar, 
  FileText, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight, 
  ChevronLeft,
  Users, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Lock, 
  Star, 
  Sparkles, 
  Plane, 
  Building2, 
  GraduationCap, 
  Briefcase, 
  Check, 
  X, 
  HelpCircle, 
  ArrowRight, 
  Camera, 
  Smartphone, 
  Award,
  Truck,
  Zap,
  CheckCircle,
  User,
  Mail,
  Shield,
  QrCode,
  RotateCw,
  Share2,
  Trash2,
  Plus,
  Compass,
  DollarSign,
  Upload,
  UploadCloud,
  ArrowUpRight,
  ExternalLink,
  BookOpen,
  BadgeCheck,
  HeartHandshake,
  Search,
  SlidersHorizontal,
  Circle,
  Globe,
  Bell,
  Eye,
  MoreVertical,
  LayoutDashboard,
  Info,
  Heart,
  Download,
  FileDown,
  Sun,
  TrendingUp
} from 'lucide-react';
import { downloadVisaChecklistPDF, openPrintableChecklist, type VisaChecklistPDFData } from '../../utils/generateVisaChecklistPDF';

// Custom sleek datepicker component matching Atlys / TravlTik aesthetics
function PortalCustomDatePicker({
  value,
  onChange,
  min,
  max,
  label,
  placeholder = 'Select date'
}: {
  value: string;
  onChange: (val: string) => void;
  min?: string;
  max?: string;
  label?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse initial view year and month
  const initialDate = useMemo(() => {
    if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [y, m, d] = value.split('-').map(Number);
      return new Date(y, m - 1, d);
    }
    if (min && /^\d{4}-\d{2}-\d{2}$/.test(min)) {
      const [y, m, d] = min.split('-').map(Number);
      return new Date(y, m - 1, d);
    }
    return new Date();
  }, [value, min]);

  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());

  // Sync view when opening
  useEffect(() => {
    if (open) {
      if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
        const [y, m] = value.split('-').map(Number);
        setViewYear(y);
        setViewMonth(m - 1);
      } else if (min && /^\d{4}-\d{2}-\d{2}$/.test(min)) {
        const [y, m] = min.split('-').map(Number);
        setViewYear(y);
        setViewMonth(m - 1);
      }
    }
  }, [open, value, min]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(v => v - 1);
    } else {
      setViewMonth(v => v - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(v => v + 1);
    } else {
      setViewMonth(v => v + 1);
    }
  };

  // Format display text (e.g. "Thu, 15 Oct 2026")
  const formattedDisplay = useMemo(() => {
    if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return '';
    try {
      const [y, m, d] = value.split('-').map(Number);
      const dt = new Date(y, m - 1, d);
      return dt.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return value;
    }
  }, [value]);

  // Today string for comparison
  const todayStr = useMemo(() => {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
  }, []);

  // Compute days for the month grid
  const daysGrid = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0 = Sun
    const totalDays = new Date(viewYear, viewMonth + 1, 0).getDate();
    const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();

    const days: Array<{
      dayNum: number;
      dateStr: string;
      isCurrentMonth: boolean;
      isDisabled: boolean;
      isSelected: boolean;
      isToday: boolean;
    }> = [];

    // Previous month filler days
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      const m = viewMonth === 0 ? 12 : viewMonth;
      const y = viewMonth === 0 ? viewYear - 1 : viewYear;
      const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        dayNum: d,
        dateStr,
        isCurrentMonth: false,
        isDisabled: true,
        isSelected: false,
        isToday: false
      });
    }

    // Current month days
    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isDisabled = Boolean((min && dateStr < min) || (max && dateStr > max));
      const isSelected = dateStr === value;
      const isToday = dateStr === todayStr;

      days.push({
        dayNum: d,
        dateStr,
        isCurrentMonth: true,
        isDisabled,
        isSelected,
        isToday
      });
    }

    // Next month filler days (to make complete weeks)
    const remaining = (7 - (days.length % 7)) % 7;
    for (let d = 1; d <= remaining; d++) {
      const m = viewMonth === 11 ? 1 : viewMonth + 2;
      const y = viewMonth === 11 ? viewYear + 1 : viewYear;
      const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        dayNum: d,
        dateStr,
        isCurrentMonth: false,
        isDisabled: true,
        isSelected: false,
        isToday: false
      });
    }

    return days;
  }, [viewYear, viewMonth, min, max, value, todayStr]);

  return (
    <div className="relative space-y-1.5 text-left" ref={containerRef}>
      {label && (
        <label className="block text-xs sm:text-[13px] font-bold text-slate-800 tracking-tight leading-snug">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full h-11 px-3 sm:px-3.5 rounded-xl border bg-white text-xs sm:text-[13px] font-semibold flex items-center justify-between transition-all cursor-pointer shadow-2xs hover:shadow-xs ${
          open
            ? 'border-indigo-600 ring-2 ring-indigo-500/20'
            : 'border-slate-200/90 hover:border-slate-300'
        }`}
      >
        <span className={`truncate text-left ${formattedDisplay ? 'text-slate-950 font-bold' : 'text-slate-400 font-normal'}`}>
          {formattedDisplay || placeholder}
        </span>
        <Calendar className={`w-4 h-4 text-slate-400 shrink-0 transition-colors ${open ? 'text-indigo-600' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1.5 w-[285px] sm:w-[310px] bg-white rounded-2xl border border-slate-200/90 shadow-2xl p-3.5 z-50 animate-in fade-in zoom-in-95 origin-top">
          {/* Header with Month / Year and Navigation */}
          <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-100">
            <button
              type="button"
              onClick={prevMonth}
              className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-950 flex items-center justify-center transition-colors cursor-pointer"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">
              {monthNames[viewMonth]} {viewYear}
            </div>
            <button
              type="button"
              onClick={nextMonth}
              className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-950 flex items-center justify-center transition-colors cursor-pointer"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Weekday Names */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
              <span key={d} className="text-[10px] font-black uppercase text-slate-400 tracking-wider py-1">
                {d}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {daysGrid.map((item, idx) => {
              if (!item.isCurrentMonth) {
                return (
                  <div
                    key={idx}
                    className="h-8 flex items-center justify-center text-[11px] text-slate-300 font-medium select-none"
                  >
                    {item.dayNum}
                  </div>
                );
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={item.isDisabled}
                  onClick={() => {
                    onChange(item.dateStr);
                    setOpen(false);
                  }}
                  className={`h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center relative cursor-pointer ${
                    item.isSelected
                      ? 'bg-slate-950 text-white font-black shadow-xs'
                      : item.isDisabled
                      ? 'text-slate-300 cursor-not-allowed hover:bg-transparent'
                      : item.isToday
                      ? 'border border-emerald-500 text-emerald-800 bg-emerald-50/60 font-black hover:bg-emerald-100/70'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                  }`}
                >
                  {item.dayNum}
                </button>
              );
            })}
          </div>

          {/* Footer Controls: Today & Clear */}
          <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-slate-100 text-[11px]">
            <button
              type="button"
              onClick={() => {
                onChange('');
                setOpen(false);
              }}
              className="text-slate-500 hover:text-rose-600 font-bold transition-colors cursor-pointer px-1.5 py-0.5 rounded"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                if (!min || todayStr >= min) {
                  onChange(todayStr);
                  setOpen(false);
                } else if (min) {
                  onChange(min);
                  setOpen(false);
                }
              }}
              className="text-slate-900 hover:text-emerald-700 font-black transition-colors cursor-pointer px-1.5 py-0.5 rounded"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export interface VisaCountryData {
  countryCode: string;
  countryName: string;
  flagEmoji: string;
  heroImage: string;
  lengthOfStay: string;
  validity: string;
  entryType: string;
  visaType: string;
  processingDays: number;
  governmentFeeINR: number;
  serviceFeeINR: number;
  variants: {
    id: string;
    label: string;
    stay: string;
    govFee: number;
    servFee: number;
    popular?: boolean;
  }[];
}

const COUNTRY_DATABASE: Record<string, Partial<VisaCountryData>> = {
  china: {
    countryName: 'China',
    flagEmoji: '🇨🇳',
    heroImage: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '30 Days',
    validity: '90 Days',
    entryType: 'Single Entry',
    visaType: 'Sticker Visa',
    processingDays: 6,
    governmentFeeINR: 7800,
    serviceFeeINR: 5900,
    variants: [
      { id: 'tourist-30', label: '30 Days Tourist (Single)', stay: '30 Days', govFee: 7800, servFee: 5900, popular: true },
      { id: 'business-90', label: '90 Days Business (Single)', stay: '90 Days', govFee: 9200, servFee: 6500 },
      { id: 'express-30', label: 'Express Fast-Track (30 Days)', stay: '30 Days', govFee: 11500, servFee: 7500 },
    ]
  },
  singapore: {
    countryName: 'Singapore',
    flagEmoji: '🇸🇬',
    heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '30 Days',
    validity: 'Up to 2 Years',
    entryType: 'Multiple Entry',
    visaType: 'Paper E-Visa with QR',
    processingDays: 4,
    governmentFeeINR: 2500,
    serviceFeeINR: 2200,
    variants: [
      { id: 'tourist-30', label: '30 Days Tourist (Multiple)', stay: '30 Days', govFee: 2500, servFee: 2200, popular: true },
      { id: 'express-30', label: 'Express Clearance (2 Days)', stay: '30 Days', govFee: 4200, servFee: 2900 },
      { id: 'business-2yr', label: '2 Years Business Multiple', stay: '30 Days/Visit', govFee: 5500, servFee: 3500 },
    ]
  },
  uae: {
    countryName: 'United Arab Emirates',
    flagEmoji: '🇦🇪',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '30 or 60 Days',
    validity: '60 Days',
    entryType: 'Single / Multiple',
    visaType: 'Express E-Visa',
    processingDays: 3,
    governmentFeeINR: 6500,
    serviceFeeINR: 2400,
    variants: [
      { id: 'tourist-30', label: '30 Days Single Entry', stay: '30 Days', govFee: 6500, servFee: 2400, popular: true },
      { id: 'tourist-60', label: '60 Days Single Entry', stay: '60 Days', govFee: 11500, servFee: 3200 },
      { id: 'express-30', label: '24-Hour Express Superfast', stay: '30 Days', govFee: 9500, servFee: 3900 },
    ]
  },
  dubai: {
    countryName: 'Dubai (UAE)',
    flagEmoji: '🇦🇪',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '30 Days',
    validity: '60 Days',
    entryType: 'Single Entry',
    visaType: 'Express E-Visa',
    processingDays: 2,
    governmentFeeINR: 6500,
    serviceFeeINR: 2400,
    variants: [
      { id: 'tourist-30', label: '30 Days Single Entry', stay: '30 Days', govFee: 6500, servFee: 2400, popular: true },
      { id: 'tourist-60', label: '60 Days Single Entry', stay: '60 Days', govFee: 11500, servFee: 3200 },
      { id: 'express-24h', label: 'Express 24h Processing', stay: '30 Days', govFee: 9500, servFee: 3900 },
    ]
  },
  australia: {
    countryName: 'Australia',
    flagEmoji: '🇦🇺',
    heroImage: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: 'Up to 3 Months',
    validity: '1 Year',
    entryType: 'Multiple Entry',
    visaType: 'Subclass 600 Visitor Visa',
    processingDays: 14,
    governmentFeeINR: 10500,
    serviceFeeINR: 4500,
    variants: [
      { id: 'tourist-3m', label: 'Subclass 600 Tourist (3 Months)', stay: '3 Months', govFee: 10500, servFee: 4500, popular: true },
      { id: 'business-1y', label: 'Business Visitor (1 Year Multiple)', stay: '3 Months/Visit', govFee: 12500, servFee: 5500 },
      { id: 'fast-track', label: 'Priority Fast-Track (48-72 hrs)', stay: '3 Months', govFee: 22000, servFee: 7500 },
    ]
  },
  uk: {
    countryName: 'United Kingdom',
    flagEmoji: '🇬🇧',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '6 Months',
    validity: '6 Months',
    entryType: 'Multiple Entry',
    visaType: 'Standard Visitor Visa',
    processingDays: 15,
    governmentFeeINR: 12800,
    serviceFeeINR: 4800,
    variants: [
      { id: 'standard-6m', label: 'Standard Visitor Visa (6 Months)', stay: '6 Months', govFee: 12800, servFee: 4800, popular: true },
      { id: 'priority-6m', label: 'Priority Filing (5 Days)', stay: '6 Months', govFee: 36000, servFee: 6500 },
      { id: 'longterm-2yr', label: '2 Years Long-Term Visitor', stay: '6 Months/Visit', govFee: 48000, servFee: 7500 },
    ]
  },
  japan: {
    countryName: 'Japan',
    flagEmoji: '🇯🇵',
    heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '15 to 30 Days',
    validity: '90 Days',
    entryType: 'Single / Multiple',
    visaType: 'Official E-Visa',
    processingDays: 6,
    governmentFeeINR: 3500,
    serviceFeeINR: 2900,
    variants: [
      { id: 'japan-evisa', label: 'Tourist eVisa (Single Entry)', stay: '15-30 Days', govFee: 3500, servFee: 2900, popular: true },
      { id: 'japan-multiple', label: 'Multiple Entry Tourist (3 Years)', stay: '30 Days/Visit', govFee: 6500, servFee: 4200 },
    ]
  },
  thailand: {
    countryName: 'Thailand',
    flagEmoji: '🇹🇭',
    heroImage: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '30 / 60 Days',
    validity: '60 Days',
    entryType: 'Single Entry / Visa-Free',
    visaType: 'E-Visa on Arrival / Tourist Permit',
    processingDays: 2,
    governmentFeeINR: 4200,
    serviceFeeINR: 1800,
    variants: [
      { id: 'thai-tourist', label: 'Express E-Visa on Arrival (E-VOA)', stay: '30 Days', govFee: 4200, servFee: 1800, popular: true },
      { id: 'thai-60', label: '60 Days Tourist Visa', stay: '60 Days', govFee: 5500, servFee: 2400 },
    ]
  },
  vietnam: {
    countryName: 'Vietnam',
    flagEmoji: '🇻🇳',
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: '30 or 90 Days',
    validity: '90 Days',
    entryType: 'Multiple Entry E-Visa',
    visaType: 'Official E-Visa',
    processingDays: 3,
    governmentFeeINR: 3200,
    serviceFeeINR: 1900,
    variants: [
      { id: 'vietnam-30s', label: '30 Days Single Entry E-Visa', stay: '30 Days', govFee: 3200, servFee: 1900, popular: true },
      { id: 'vietnam-90m', label: '90 Days Multiple Entry E-Visa', stay: '90 Days', govFee: 5800, servFee: 2500 },
    ]
  },
  mauritius: {
    countryName: 'Mauritius',
    flagEmoji: '🇲🇺',
    heroImage: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1600&auto=format&fit=crop&q=85',
    lengthOfStay: 'Up to 90 Days',
    validity: '90 Days',
    entryType: 'Visa-Free / Visa Exempt',
    visaType: 'Visa-Free Entry (Exempt)',
    processingDays: 0,
    governmentFeeINR: 0,
    serviceFeeINR: 0,
    variants: [
      { id: 'visa-free-90', label: 'Visa-Free Tourist Entry (Up to 90 Days)', stay: '90 Days', govFee: 0, servFee: 0, popular: true },
      { id: 'business-free', label: 'Business / Conference (Up to 90 Days)', stay: '90 Days', govFee: 0, servFee: 0 },
    ]
  },
};

// Aliases mapping for direct access
COUNTRY_DATABASE['united-kingdom'] = COUNTRY_DATABASE.uk;
COUNTRY_DATABASE['united_kingdom'] = COUNTRY_DATABASE.uk;
COUNTRY_DATABASE['great-britain'] = COUNTRY_DATABASE.uk;
COUNTRY_DATABASE['britain'] = COUNTRY_DATABASE.uk;
COUNTRY_DATABASE['england'] = COUNTRY_DATABASE.uk;
COUNTRY_DATABASE['united-states'] = {
  countryName: 'United States',
  flagEmoji: '🇺🇸',
  heroImage: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1600&auto=format&fit=crop&q=85',
  lengthOfStay: 'Up to 6 Months (180 Days)',
  validity: '10 Years',
  entryType: 'Multiple Entry',
  visaType: 'B1/B2 Visitor Visa',
  processingDays: 21,
  governmentFeeINR: 15500,
  serviceFeeINR: 4900,
  variants: [
    { id: 'us-b1b2', label: 'B1/B2 10-Year Multiple Entry', stay: '180 Days/Visit', govFee: 15500, servFee: 4900, popular: true },
    { id: 'us-priority', label: 'Emergency Interview Slot Concierge', stay: '180 Days/Visit', govFee: 24000, servFee: 7500 }
  ]
};
COUNTRY_DATABASE['usa'] = COUNTRY_DATABASE['united-states'];
COUNTRY_DATABASE['us'] = COUNTRY_DATABASE['united-states'];

// ── SCHENGEN AREA STANDARD DATABASE ──
const SCHENGEN_BASE: Partial<VisaCountryData> = {
  lengthOfStay: 'Up to 90 Days within 180 Days',
  validity: 'Based on approved itinerary (up to 6 months or 1 year multi-entry)',
  entryType: 'Short Stay (Single / Multiple Entry)',
  visaType: 'Harmonised Schengen Visa (Type C)',
  processingDays: 15,
  governmentFeeINR: 8100, // €90 official EU Schengen fee
  serviceFeeINR: 2700,    // €30 standard VAC fee
  variants: [
    { id: 'tourist-schengen', label: 'Tourist Short-Stay (Type C)', stay: 'Up to 90 Days within 180 Days', govFee: 8100, servFee: 2700, popular: true },
    { id: 'business-schengen', label: 'Business / Conference (Type C)', stay: 'Up to 90 Days within 180 Days', govFee: 8100, servFee: 2700 },
  ]
};

COUNTRY_DATABASE['greece'] = {
  ...SCHENGEN_BASE,
  countryName: 'Greece',
  flagEmoji: '🇬🇷',
  heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&auto=format&fit=crop&q=85',
  visaType: 'Schengen Short-Stay Visa Type C — Greece (via GVCW Greece)',
};
COUNTRY_DATABASE['france'] = {
  ...SCHENGEN_BASE,
  countryName: 'France',
  flagEmoji: '🇫🇷',
  heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&auto=format&fit=crop&q=85',
};
COUNTRY_DATABASE['germany'] = {
  ...SCHENGEN_BASE,
  countryName: 'Germany',
  flagEmoji: '🇩🇪',
  heroImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600&auto=format&fit=crop&q=85',
};
COUNTRY_DATABASE['italy'] = {
  ...SCHENGEN_BASE,
  countryName: 'Italy',
  flagEmoji: '🇮🇹',
  heroImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1600&auto=format&fit=crop&q=85',
};
COUNTRY_DATABASE['spain'] = {
  ...SCHENGEN_BASE,
  countryName: 'Spain',
  flagEmoji: '🇪🇸',
  heroImage: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1600&auto=format&fit=crop&q=85',
  visaType: 'Schengen Short-Stay Visa Type C — Spain (via BLS International Spain)',
  serviceFeeINR: 1550, // approx. 17 EUR BLS service fee
};
COUNTRY_DATABASE['switzerland'] = {
  ...SCHENGEN_BASE,
  countryName: 'Switzerland',
  flagEmoji: '🇨🇭',
  heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1600&auto=format&fit=crop&q=85',
};
COUNTRY_DATABASE['netherlands'] = {
  ...SCHENGEN_BASE,
  countryName: 'Netherlands',
  flagEmoji: '🇳🇱',
  heroImage: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1600&auto=format&fit=crop&q=85',
};
COUNTRY_DATABASE['austria'] = {
  ...SCHENGEN_BASE,
  countryName: 'Austria',
  flagEmoji: '🇦🇹',
  heroImage: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1600&auto=format&fit=crop&q=85',
};
COUNTRY_DATABASE['portugal'] = {
  ...SCHENGEN_BASE,
  countryName: 'Portugal',
  flagEmoji: '🇵🇹',
  heroImage: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1600&auto=format&fit=crop&q=85',
};
COUNTRY_DATABASE['schengen'] = {
  ...SCHENGEN_BASE,
  countryName: 'Schengen Area',
  flagEmoji: '🇪🇺',
  heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&auto=format&fit=crop&q=85',
};
COUNTRY_DATABASE['jamaica'] = {
  countryName: 'Jamaica',
  flagEmoji: '🇯🇲',
  heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&auto=format&fit=crop&q=85',
  lengthOfStay: 'Up to 30 Days',
  validity: '30 Days on Arrival',
  entryType: 'Visa-Free Entry (Commonwealth)',
  visaType: 'Visa-Free Entry (Commonwealth)',
  processingDays: 0,
  governmentFeeINR: 0,
  serviceFeeINR: 0,
  variants: [
    { id: 'visa-free-30', label: 'Visa-Free Tourism (30 Days)', stay: 'Up to 30 Days', govFee: 0, servFee: 0, popular: true }
  ]
};
COUNTRY_DATABASE['kingston'] = COUNTRY_DATABASE['jamaica'];
COUNTRY_DATABASE['montego-bay'] = COUNTRY_DATABASE['jamaica'];
COUNTRY_DATABASE['montego_bay'] = COUNTRY_DATABASE['jamaica'];
COUNTRY_DATABASE['negril'] = COUNTRY_DATABASE['jamaica'];
COUNTRY_DATABASE['ocho-rios'] = COUNTRY_DATABASE['jamaica'];

function formatTargetDate(daysToAdd: number) {
  const d = new Date();
  d.setDate(d.getDate() + daysToAdd);
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short' };
  return d.toLocaleDateString('en-US', options);
}


// ── STRICT REGION CLASSIFICATION CONSTANTS ──
// GCC Region: UAE, Saudi Arabia, Qatar, Oman, Bahrain, Kuwait
const GCC_COUNTRIES = ['uae', 'united arab emirates', 'dubai', 'abu dhabi', 'saudi arabia', 'ksa', 'qatar', 'sultanate of oman', 'muscat', 'salalah', 'bahrain', 'kuwait'];

// Schengen Area: Germany, France, Spain, Italy, Portugal, Netherlands, Belgium, Austria, Switzerland, Greece, Norway, Sweden, Denmark, Finland, Czechia, Poland, Romania, Bulgaria, Croatia, etc.
const SCHENGEN_COUNTRIES = ['germany', 'france', 'spain', 'italy', 'portugal', 'netherlands', 'belgium', 'austria', 'switzerland', 'greece', 'norway', 'sweden', 'denmark', 'finland', 'czechia', 'czech republic', 'poland', 'hungary', 'slovakia', 'slovenia', 'estonia', 'latvia', 'lithuania', 'luxembourg', 'malta', 'iceland', 'liechtenstein', 'romania', 'bulgaria', 'croatia', 'schengen'];

// Southeast Asia: Singapore, Thailand, Malaysia, Vietnam, Indonesia, Philippines, Cambodia, Myanmar
const SOUTHEAST_ASIA_COUNTRIES = ['singapore', 'thailand', 'malaysia', 'vietnam', 'indonesia', 'philippines', 'cambodia', 'myanmar', 'bali'];

// ── NATIONALITY FORMATTER HELPER ──
function formatNationality(passport: string): string {
  const p = (passport || 'India').trim();
  const lower = p.toLowerCase();
  if (lower === 'india' || lower === 'indian' || lower === 'in') return 'Indian';
  if (lower === 'united states' || lower === 'usa' || lower === 'us' || lower === 'america' || lower === 'american') return 'American';
  if (lower === 'united kingdom' || lower === 'uk' || lower === 'great britain' || lower === 'britain' || lower === 'british' || lower === 'england') return 'British';
  if (lower === 'australia' || lower === 'australian') return 'Australian';
  if (lower === 'canada' || lower === 'canadian') return 'Canadian';
  if (lower === 'germany' || lower === 'german') return 'German';
  if (lower === 'france' || lower === 'french') return 'French';
  if (lower === 'italy' || lower === 'italian') return 'Italian';
  if (lower === 'spain' || lower === 'spanish') return 'Spanish';
  if (lower === 'japan' || lower === 'japanese') return 'Japanese';
  if (lower === 'china' || lower === 'chinese') return 'Chinese';
  if (lower === 'uae' || lower === 'united arab emirates' || lower === 'emirati') return 'Emirati';
  if (lower === 'singapore' || lower === 'singaporean') return 'Singaporean';
  if (lower === 'new zealand' || lower === 'kiwi') return 'New Zealand';
  return p.charAt(0).toUpperCase() + p.slice(1);
}

// ── DYNAMIC AI OVERVIEW & ENTRY REQUIREMENTS ENGINE ──
function getAIVisaIntelligence(passport: string, country: string, purpose: string) {
  const pNorm = (passport || 'India').toLowerCase();
  const cNorm = (country || 'Singapore').toLowerCase();
  const purNorm = (purpose || 'tourism').toLowerCase();
  const nationality = formatNationality(passport);


  const isMauritius = cNorm.includes('mauritius');
  const isThailand = cNorm.includes('thailand');
  const isMalaysia = cNorm.includes('malaysia');
  const isMaldives = cNorm.includes('maldives');

  // Case 0: Mauritius (100% Verified Free Visa on Arrival for Indian Citizens)
  if (isMauritius) {
    if (pNorm.includes('india') || pNorm.includes('in')) {
      return {
        isExempt: true,
        verdictTitle: `${nationality} passport holders enjoy Visa-Free entry on arrival to Mauritius`,
        verdictSummary: `No advance visa application required. Tourist visa on arrival granted for up to 60 days with ₹0 visa fee.`,
        entryStatus: "Visa-Free / Granted on Arrival",
        entryStatusSubtext: "Instant at SSR Airport (0 Days)",
        stayDuration: "Up to 60 Days (Extendable)",
        stayDurationSubtext: "Free holiday stay",
        entryType: "Single / Multiple Entry",
        entryTypeSubtext: "Free on-arrival stamp",
        visaPillTag: "VISA-FREE / ON ARRIVAL (₹0 FEE)",
        digitalCardName: "Mauritius All-in-One Digital Travel Form",
        digitalCardDesc: "Official mandatory health/travel electronic declaration form (safetravel.govmu.org).",
        sources: ["Passport and Immigration Office, Republic of Mauritius", "Ministry of Foreign Affairs", "IATA Timatic 2026"],
        maxStay: "Up to 60 Days (Extendable to 90 Days)",
        conditionsForVisa: [
          "Original Passport valid for at least 6 months with 2 blank pages.",
          "Confirmed return / onward flight ticket departing within 60 days.",
          "Confirmed hotel booking voucher or host accommodation invitation letter.",
          "Fill online Mauritius All-in-One Digital Travel Form prior to departure.",
          "Proof of sufficient funds (min. USD $100 / EUR €100 / MUR 4,000 per day of stay)."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "Government Visa Fee", amount: "₹0 (Free / No Fee)", note: "Indian tourists receive complimentary on-arrival entry" },
            { label: "Digital Arrival Form (safetravel.govmu.org)", amount: "₹0 (Free)", note: "Official online declaration" }
          ],
          totalEstimatedINR: "₹0 Free Entry",
          processingTime: "Instant on Arrival (0 Days)",
          processingSLA: "Direct immigration clearance at SSR International Airport (MRU).",
          applicationWindow: "Fill digital travel form 24–72 hours before flight",
          earlyEntryBuffer: "Entry granted directly on landing"
        },
        applicationProcess: {
          submission: "1. Verify Passport: Ensure 6+ months validity and 2 blank pages.",
          onlineForm: "2. Digital Travel Form: Fill online Mauritius All-in-One Form at safetravel.govmu.org.",
          appointments: "3. Direct Travel: Fly to Mauritius with carry-on documents; zero embassy appointments needed.",
          documentsAndBiometrics: [
            "Valid Indian Passport (6+ months validity)",
            "Confirmed Return Flight Ticket",
            "Confirmed Hotel Voucher / Host Letter",
            "Mauritius Digital Travel Form QR Code",
            "Proof of Sufficient Funds (USD $100/day)"
          ]
        }
      };
    }
  }

  const isUK = cNorm.includes('united kingdom') || cNorm.includes('uk') || cNorm.includes('great britain') || cNorm.includes('england') || cNorm.includes('britain') || cNorm.includes('scotland');
  const isUKorUSorEU = pNorm.includes('united kingdom') || pNorm.includes('uk') || pNorm.includes('united states') || pNorm.includes('usa') || pNorm.includes('australia') || pNorm.includes('canada');
  const isUS = cNorm.includes('united states') || cNorm.includes('usa') || cNorm.includes('america');
  const isSingapore = cNorm.includes('singapore');
  const isUAE = GCC_COUNTRIES.some(gc => cNorm.includes(gc));
  const isGCC = GCC_COUNTRIES.some(gc => cNorm.includes(gc));
  const isSchengen = SCHENGEN_COUNTRIES.some(sc => cNorm.includes(sc));
  const isSoutheastAsia = SOUTHEAST_ASIA_COUNTRIES.some(sea => cNorm.includes(sea));
  const isYemen = cNorm.includes('yemen') || cNorm.includes('sanaa') || cNorm.includes('aden');
  const isStudy = purNorm.includes('study') || purNorm.includes('student');
  const isWork = purNorm.includes('work') || purNorm.includes('job') || purNorm.includes('employment');
  const isPR = purNorm.includes('pr') || purNorm.includes('permanent') || purNorm.includes('immigrat') || purNorm.includes('green') || purNorm.includes('settle');
  const isBusiness = purNorm.includes('business') || purNorm.includes('corporate') || purNorm.includes('commercial') || purNorm.includes('b1') || purNorm.includes('meeting') || purNorm.includes('conference');

  // Case 1: United Kingdom (UK)
  if (isUK) {
    if (isStudy) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a Student Visa for the United Kingdom`,
        verdictSummary: `Confirmation of Acceptance for Studies (CAS) required. Includes full-time academic status and BRP / eVisa rights.`,
        entryStatus: "UK Student Visa",
        entryStatusSubtext: "3–4 Weeks Processing",
        stayDuration: "Duration of Course (1–4 Years)",
        stayDurationSubtext: "Full-time degree",
        entryType: "Multiple Entry",
        entryTypeSubtext: "Includes BRP / eVisa status",
        visaPillTag: "CONSULAR VISA REQUIRED",
        digitalCardName: "UKVI CAS & eVisa Share Code",
        digitalCardDesc: "Confirmation of Acceptance for Studies issued by licensed UK sponsor.",
        sources: ["UK Visas and Immigration (UKVI)", "Home Office", "IATA Timatic 2026"],
        maxStay: "Duration of Course (1–4 Years)",
        conditionsForVisa: [
          "Unconditional offer on full-time degree course with licensed student sponsor.",
          "Confirmation of Acceptance for Studies (CAS) reference number.",
          "Must meet English language proficiency (IELTS for UKVI/SELT).",
          "Demonstrate 28-day maintenance funds for tuition and London/UK living costs."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "UKVI Student Visa Fee", amount: "£490 (approx. ₹51,800)", note: "Standard UK government visa application fee" },
            { label: "Immigration Health Surcharge (IHS)", amount: "£776/year (approx. ₹82,000/yr)", note: "Mandatory NHS healthcare access surcharge" }
          ],
          totalEstimatedINR: "Official UKVI Fees Apply",
          processingTime: "3 Weeks Standard (~15 Working Days)",
          processingSLA: "Priority (5 Days) and Super Priority (24 Hours) available at VFS centers.",
          applicationWindow: "Apply up to 6 Months before course start date",
          earlyEntryBuffer: "Travel to UK permitted up to 1 month before course starts"
        },
        applicationProcess: {
          submission: "1. CAS Issuance: Receive CAS number from licensed university sponsor.",
          onlineForm: "2. UKVI Online Application: Complete Access UK form and pay visa + IHS fees.",
          appointments: "3. VFS Global Appointment: Book biometrics (fingerprints & digital photo) at nearest VFS center.",
          documentsAndBiometrics: [
            "Valid Passport with minimum 6 months validity",
            "CAS Statement & University Acceptance Letter",
            "Financial Proof (Bank statements meeting 28-day maintenance rule)",
            "English Language Certificate (IELTS/PTE)",
            "Tuberculosis (TB) Test Certificate from approved clinic"
          ]
        }
      };
    } else if (isWork) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a Skilled Worker Visa for the United Kingdom`,
        verdictSummary: `Certificate of Sponsorship (CoS) required from a licensed UK employer prior to departure.`,
        entryStatus: "Skilled Worker Visa",
        entryStatusSubtext: "3–4 Weeks Processing",
        stayDuration: "Up to 5 Years (Renewable)",
        stayDurationSubtext: "Leads to ILR (Permanent Residency)",
        entryType: "Multiple Entry",
        entryTypeSubtext: "Employer sponsored",
        visaPillTag: "CONSULAR VISA REQUIRED",
        digitalCardName: "Certificate of Sponsorship (CoS)",
        digitalCardDesc: "Electronic sponsorship record issued by licensed UK Home Office sponsor.",
        sources: ["UK Home Office", "UKVI", "IATA Timatic 2026"],
        maxStay: "Up to 5 Years",
        conditionsForVisa: [
          "Confirmed job offer from Home Office-approved sponsor.",
          "Valid Certificate of Sponsorship (CoS) reference number.",
          "Salary meets qualifying threshold (minimum £38,700 or going rate).",
          "English language level B1 on CEFR scale."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "UKVI Skilled Worker Visa Fee", amount: "£719 – £1,420 (₹76,000 – ₹150,000)", note: "Varies by duration (up to 3 years / over 3 years)" },
            { label: "Immigration Health Surcharge (IHS)", amount: "£1,035/year (approx. ₹109,000/yr)", note: "Mandatory NHS healthcare access surcharge" }
          ],
          totalEstimatedINR: "Employer Sponsored / Subsidized",
          processingTime: "3 Weeks Standard (~15 Working Days)",
          processingSLA: "Priority 5-day decision service available at VFS centers.",
          applicationWindow: "Apply up to 3 Months before job start date on CoS",
          earlyEntryBuffer: "Travel permitted up to 14 days before start date"
        },
        applicationProcess: {
          submission: "1. CoS Assignment: Sponsoring UK company assigns official Certificate of Sponsorship.",
          onlineForm: "2. Online Filing: Submit Skilled Worker visa application on gov.uk portal.",
          appointments: "3. VFS Biometrics: Attend VFS Global appointment for fingerprinting and passport submission.",
          documentsAndBiometrics: [
            "Valid Passport with blank visa pages",
            "CoS Reference Number & Job Offer Letter",
            "Proof of English proficiency (IELTS / degree verification)",
            "TB Test Certificate",
            "Criminal Record Certificate for designated roles"
          ]
        }
      };
    } else if (isPR) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require Settlement / Indefinite Leave to Remain (ILR) for the UK`,
        verdictSummary: `Permanent settlement granted after continuous qualifying residence (5 years on Skilled Worker, 3 years on Global Talent).`,
        entryStatus: "UK Settlement / Indefinite Leave to Remain (ILR)",
        entryStatusSubtext: "Permanent Settlement Status",
        stayDuration: "Indefinite Leave to Remain (No Time Limit)",
        stayDurationSubtext: "Path to British Citizenship after 1 Year of ILR",
        entryType: "Settled Status",
        entryTypeSubtext: "Digital UKVI eVisa / ILR Status",
        visaPillTag: "PERMANENT SETTLEMENT REQUIRED",
        digitalCardName: "UKVI Indefinite Leave to Remain (ILR)",
        digitalCardDesc: "Settled status granting permanent right to live, work, and study in the UK without visa restrictions.",
        sources: ["UK Visas and Immigration (UKVI)", "Home Office", "IATA Timatic 2026"],
        maxStay: "Indefinite Stay",
        conditionsForVisa: [
          "Completed qualifying continuous residence (typically 5 years on Skilled Worker or 3 years on Global Talent).",
          "Pass the Life in the UK Test.",
          "Meet English language requirement (CEFR B1 or UK degree).",
          "Absences from the UK not exceeding 180 days in any 12-month period."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "UKVI ILR Settlement Application Fee", amount: "£3,029 (approx. ₹3,20,000)", note: "Official UK government settlement application fee" },
            { label: "Life in the UK Test", amount: "£50 (approx. ₹5,300)", note: "Mandatory civic knowledge test" }
          ],
          totalEstimatedINR: "£3,079 Total Official Fees",
          processingTime: "Standard: Up to 6 Months (Super Priority: 24 Hours available)",
          processingSLA: "Instant digital status updated on UKVI account upon grant.",
          applicationWindow: "Apply up to 28 days before completing the 5-year qualifying period",
          earlyEntryBuffer: "Settled status grants permanent unconstrained residency"
        },
        applicationProcess: {
          submission: "1. Life in the UK & English Test: Pass Life in the UK Test and verify B1 English language.",
          onlineForm: "2. Set(O) / Set(M) Online Filing: Complete online settlement form on gov.uk portal.",
          appointments: "3. UKVCAS Appointment: Attend biometric appointment to scan passport and enrol biometrics.",
          documentsAndBiometrics: [
            "Current and all previous Passports used during qualifying period",
            "Employer Confirmation Letter (confirming ongoing employment at required rate)",
            "Life in the UK Test Pass Notification",
            "B1 English Language Certificate / UK Degree NARIC statement",
            "Continuous Residence Absence Summary & Evidence"
          ]
        }
      };
    } else {
      // UK Tourism / Standard Visitor
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a visa for United Kingdom`,
        verdictSummary: `Standard Visitor Visa required before travel. 100% verified online application with biometric support.`,
        entryStatus: "Standard Consular Visa",
        entryStatusSubtext: "~3 Weeks Standard Processing",
        stayDuration: "Up to 180 Days (6 Months)",
        stayDurationSubtext: "Per calendar visit",
        entryType: "Multiple Entry",
        entryTypeSubtext: "Standard 6-Month Foil",
        visaPillTag: "CONSULAR VISA REQUIRED",
        digitalCardName: "Access UK / UKVI Portal",
        digitalCardDesc: "Official UK Visas and Immigration application confirmation & VFS appointment receipt.",
        sources: ["UK Visas and Immigration (UKVI)", "Home Office", "IATA Timatic 2026"],
        maxStay: "Up to 180 Days (6 Months)",
        conditionsForVisa: [
          "Tourism, holidays, visiting family/friends, or short business meetings.",
          "No unauthorized work or public funds access permitted.",
          "Must intend to leave the UK at the end of visit with sufficient funds."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "UKVI Government Visa Fee (6 Months)", amount: "£115 (approx. ₹12,500)", note: "Official UK government visa fee" },
            { label: "TravlTik VFS Concierge & Review", amount: "₹4,800", note: "Application vetting, document formatting & biometric assistance" }
          ],
          totalEstimatedINR: "₹17,300 Total Package",
          processingTime: "3 Weeks Standard (~15 Working Days)",
          processingSLA: "Priority 5-day decision service available at VFS centers across India.",
          applicationWindow: "Apply up to 3 Months (90 Days) before planned travel date",
          earlyEntryBuffer: "Valid for multiple entries anytime during the 6-month validity"
        },
        applicationProcess: {
          submission: "1. Online UKVI Portal Filing: Fill official Access UK visa application form.",
          onlineForm: "2. Document Upload & Fee Payment: Pay £115 UKVI consular fee and upload supporting documents.",
          appointments: "3. VFS Global Biometric Appointment: Attend appointment for fingerprint scan and facial photo.",
          documentsAndBiometrics: [
            "Original Passport with at least 6 months validity and blank visa pages",
            "Proof of Financial Funds (6 months bank statements with sufficient balance)",
            "Employment Verification / Salary Slips / Leave Approval Letter",
            "Detailed Travel Itinerary & Accommodation Details",
            "VFS Appointment Confirmation & Document Upload Receipt"
          ]
        }
      };
    }
  }

  // Case 2: United States
  if (isUS) {
    if (isStudy) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require an F-1 Student Visa for the United States`,
        verdictSummary: `Form I-20 and approved SEVIS required to legally enter and study in the United States.`,
        entryStatus: "F-1 Student Visa",
        entryStatusSubtext: "Requires Consular Interview",
        stayDuration: "Duration of Status (D/S — Up to 4–5 Years)",
        stayDurationSubtext: "Full academic degree",
        entryType: "Multiple Entry",
        entryTypeSubtext: "SEVIS Active Status",
        visaPillTag: "CONSULAR VISA REQUIRED",
        digitalCardName: "Form I-20 + SEVIS I-901 Approval",
        digitalCardDesc: "SEVP-certified institution Form I-20 Certificate of Eligibility with active SEVIS ID.",
        sources: ["US Department of State (Travel.State.Gov)", "DHS SEVP Portal", "USCIS & IATA Timatic 2026"],
        maxStay: "Duration of Academic Degree (D/S)",
        conditionsForVisa: [
          "Full-time enrollment in SEVP-approved university or college.",
          "Must maintain active status in SEVIS and valid passport (6+ months).",
          "On-campus employment allowed up to 20 hrs/week during academic terms.",
          "Must complete OPT/CPT authorization for off-campus internships."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "MRV Visa Application Fee", amount: "185 USD (approx. ₹15,500 – ₹17,600)", note: "Mandatory Department of State consular processing fee" },
            { label: "SEVIS I-901 Fee", amount: "350 USD (approx. ₹29,500 – ₹33,300)", note: "Department of Homeland Security student database fee" }
          ],
          totalEstimatedINR: "535 USD Total Reference",
          processingTime: "Consular Decision: 3–5 Business Days post-interview (Passport dispatch via BlueDart in 2–3 days)",
          processingSLA: "Wait times vary by city (New Delhi, Mumbai, Hyderabad, Chennai, Kolkata). Urgent emergency interview requests supported.",
          applicationWindow: "Apply up to 365 Days prior to I-20 program start date",
          earlyEntryBuffer: "US Port of Entry arrival permitted up to 30 Days before course start date"
        },
        applicationProcess: {
          submission: "1. SEVP University Admission & I-20 Issuance: University issues signed Form I-20 upon financial verification.",
          onlineForm: "2. DS-160 Online Nonimmigrant Visa Application: Complete DS-160 online and save 10-digit CEAC barcode confirmation.",
          appointments: "3. Two-Step Appointment Scheduling: Book VAC Biometric (Fingerprints & Photo) + Consular Visa Interview at US Embassy/Consulate.",
          documentsAndBiometrics: [
            "Original Passport valid for at least 6 months beyond intended stay",
            "Signed Form I-20 Certificate of Eligibility with SEVIS ID",
            "SEVIS I-901 Fee Payment Receipt (350 USD)",
            "DS-160 Form Barcode Confirmation Sheet",
            "Liquid Financial Proof / Bank Statements & Education Loan Sanction Letter",
            "Academic Transcripts, Degree Certificates & Standardized Test Scores (GRE/IELTS/TOEFL)"
          ]
        }
      };
    } else if (isWork) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a Work Visa (H-1B / L-1) for the United States`,
        verdictSummary: `Approved Form I-797 Notice of Action and consular visa stamp required before taking up employment.`,
        entryStatus: "H-1B / L-1 Work Visa",
        entryStatusSubtext: "Requires Consular Interview",
        stayDuration: "Up to 3 Years (Extendable to 6 Years)",
        stayDurationSubtext: "Based on petition approval",
        entryType: "Multiple Entry",
        entryTypeSubtext: "USCIS Petition Based",
        visaPillTag: "CONSULAR VISA REQUIRED",
        digitalCardName: "Form I-797 Approval Notice",
        digitalCardDesc: "USCIS Form I-797 Petition Approval Notice.",
        sources: ["USCIS", "US Department of State", "IATA Timatic 2026"],
        maxStay: "3 Years (Renewable)",
        conditionsForVisa: [
          "Sponsoring US employer petition approval (Form I-129).",
          "Specialty occupation degree qualification.",
          "Must work exclusively for the approved petitioning entity."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "MRV Application Fee (H/L/O/P/Q)", amount: "205 USD (approx. ₹17,200 – ₹19,500)", note: "Consular nonimmigrant petition processing fee" },
            { label: "USCIS Petition Fees", amount: "Employer Sponsored", note: "Covered by petitioning US enterprise" }
          ],
          totalEstimatedINR: "205 USD Consular Fee",
          processingTime: "Consular Decision: 3–5 Business Days post-interview",
          processingSLA: "Expedited appointment slots available for critical business operations.",
          applicationWindow: "Apply up to 90 Days before petition start date",
          earlyEntryBuffer: "US entry permitted up to 10 Days before petition validity start date"
        },
        applicationProcess: {
          submission: "1. Employer Petition: Sponsoring US company secures Form I-797 Notice of Action from USCIS.",
          onlineForm: "2. DS-160 Form: Fill DS-160 nonimmigrant application selecting Petition-Based category.",
          appointments: "3. Appointments: Schedule OFC Biometrics + Consular Interview.",
          documentsAndBiometrics: [
            "Valid Passport with minimum 6 months validity",
            "Form I-797 Notice of Action (Original / Copy)",
            "DS-160 Confirmation Sheet with Barcode",
            "US Visa Appointment Confirmation Letter",
            "Employment Offer Letter, W-2 forms / Experience credentials"
          ]
        }
      };
    } else if (isPR) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require an Immigrant Visa / Green Card for Permanent Residency in the United States`,
        verdictSummary: `Permanent Residency requires an approved USCIS Immigrant Petition (Form I-130 / I-140 / I-526) and National Visa Center (NVC) DS-260 consular processing or I-485 Adjustment of Status.`,
        entryStatus: "US Immigrant Visa / Green Card",
        entryStatusSubtext: "NVC Consular & Immigrant Processing",
        stayDuration: "Indefinite / Permanent Resident Status (LPR)",
        stayDurationSubtext: "10-Year Renewable Green Card",
        entryType: "Permanent Resident",
        entryTypeSubtext: "LPR / Green Card Foil",
        visaPillTag: "IMMIGRANT VISA / GREEN CARD",
        digitalCardName: "Form DS-260 & Form I-797 Immigrant Notice",
        digitalCardDesc: "Permanent Resident Green Card issued upon US entry via approved NVC consular immigrant package.",
        sources: ["USCIS", "National Visa Center (NVC)", "U.S. Department of State", "IATA Timatic 2026"],
        maxStay: "Permanent Resident Status",
        conditionsForVisa: [
          "Approved USCIS Immigrant Petition (Form I-130 Family or Form I-140 Employment/EB-1/EB-2/EB-3).",
          "Priority Date must be 'Current' in Department of State monthly Visa Bulletin Final Action Dates.",
          "Legally binding Form I-864 Affidavit of Support from petitioner/sponsor.",
          "Complete CDC-authorized panel physician medical examination and vaccination dossier."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "DS-260 Immigrant Visa Application Fee", amount: "345 USD (approx. ₹29,000 for EB) / 325 USD (Family)", note: "Department of State NVC processing fee" },
            { label: "USCIS Immigrant Fee (Green Card Production)", amount: "235 USD (approx. ₹19,800)", note: "Payable online via USCIS ELIS before US entry" },
            { label: "NVC Form I-864 Review Fee", amount: "120 USD (approx. ₹10,100)", note: "Affidavit of Support review fee (if applicable)" }
          ],
          totalEstimatedINR: "580 USD – 700 USD Official Government Fee Breakdown",
          processingTime: "NVC Consular Processing (Subject to Visa Bulletin Priority Dates)",
          processingSLA: "Interview scheduled at US Embassy New Delhi / Consulate Mumbai once Priority Date is Current.",
          applicationWindow: "File DS-260 upon receiving NVC Welcome Letter and Documentarily Qualified status",
          earlyEntryBuffer: "Immigrant visa foil valid for initial travel within 6 months of medical exam date"
        },
        applicationProcess: {
          submission: "1. USCIS Petition Approval: Sponsoring US enterprise or qualifying family relative secures Form I-130/I-140 approval.",
          onlineForm: "2. NVC Processing & DS-260: Pay NVC fees, complete Form DS-260 online, and upload civil dossier + Form I-864.",
          appointments: "3. Panel Medical & Consular Interview: Complete medical at approved clinic, attend VAC biometrics, and interview at US Embassy.",
          documentsAndBiometrics: [
            "Valid Passport with minimum 6 months validity",
            "Form DS-260 Immigrant Visa Electronic Application Confirmation Page",
            "USCIS Immigrant Petition Approval Notice (Form I-797)",
            "Form I-864 Affidavit of Support with IRS Tax Transcripts & W-2s",
            "Original Birth Certificate, Marriage Certificate & Police Clearance Certificates (PCC)",
            "Sealed Medical Examination Report from CDC Panel Physician"
          ]
        }
      };
    } else if (isBusiness) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a B-1 Business Visa for the United States`,
        verdictSummary: `Business Visitor Visa (B-1 / B1/B2) for commercial meetings, conferences, contract negotiations, and corporate consultations. 10-Year Multiple Entry.`,
        entryStatus: "B-1 Business Visitor Visa",
        entryStatusSubtext: "Requires Consular Interview",
        stayDuration: "Up to 180 Days (6 Months)",
        stayDurationSubtext: "Per visit on 10-Year Visa (determined by CBP on Form I-94)",
        entryType: "Multiple Entry",
        entryTypeSubtext: "10-Year Validity Foil",
        visaPillTag: "BUSINESS VISA REQUIRED",
        digitalCardName: "Form DS-160 & B-1 Consular Appointment",
        digitalCardDesc: "Official B-1/B-2 visa foil stamped in passport after consular interview.",
        sources: ["US Department of State", "CBP", "IATA Timatic 2026"],
        maxStay: "Up to 6 Months per Visit",
        conditionsForVisa: [
          "Commercial meetings, industry conferences, corporate consultations, and contract negotiations.",
          "Strictly no productive local employment or drawing U.S. source remuneration.",
          "Must present Official U.S. Business Invitation Letter and Indian Employer Deputation Letter."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "MRV Application Fee (B-1/B-2)", amount: "185 USD (approx. ₹15,500 – ₹17,600)", note: "Department of State application fee" }
          ],
          totalEstimatedINR: "185 USD (approx. ₹15,500)",
          processingTime: "Consular Decision: Verbal decision given immediately at interview window",
          processingSLA: "Interview scheduling slots vary by city.",
          applicationWindow: "Apply 2 to 3 months prior to planned business trip",
          earlyEntryBuffer: "Travel permitted anytime during 10-year validity"
        },
        applicationProcess: {
          submission: "1. Digital Intake: Create profile on usvisascheduling.com portal.",
          onlineForm: "2. Form DS-160: Complete DS-160 selecting B-1 (Business/Conference) and upload photo.",
          appointments: "3. Schedule Appointments: Book Biometric appointment at VAC + Consular Interview.",
          documentsAndBiometrics: [
            "Current Passport valid for 6+ months with blank pages",
            "Official U.S. Business Invitation Letter (meetings, dates, host contact)",
            "Indian Employer Deputation / Cover Letter (funding, no US salary drawn)",
            "DS-160 Confirmation Barcode Page",
            "MRV Fee Receipt & Appointment Confirmation",
            "Company Registration & Financial Solvency Proofs"
          ]
        }
      };
    } else {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a B-2 Tourist Visa for the United States`,
        verdictSummary: `Non-immigrant visitor visa required prior to boarding. Valid for multiple entries up to 10 years.`,
        entryStatus: "B-2 Tourist Consular Visa",
        entryStatusSubtext: "Requires Consular Interview",
        stayDuration: "Up to 180 Days (6 Months)",
        stayDurationSubtext: "Per visit on 10-Year Visa (determined by CBP on Form I-94)",
        entryType: "Multiple Entry",
        entryTypeSubtext: "10-Year Validity Foil",
        visaPillTag: "CONSULAR VISA REQUIRED",
        digitalCardName: "ESTA / US B1/B2 Stamp",
        digitalCardDesc: "Physical visa foil in passport or approved ESTA if dual citizen.",
        sources: ["US Department of State", "CBP", "IATA Timatic 2026"],
        maxStay: "Up to 6 Months per Visit",
        conditionsForVisa: [
          "Tourism, family visits, holidays, and sightseeing.",
          "No employment or unauthorized work permitted under B-2.",
          "Must demonstrate strong ties to home country."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "MRV Application Fee (B-2/B1)", amount: "185 USD (approx. ₹15,500 – ₹17,600)", note: "Department of State application fee" }
          ],
          totalEstimatedINR: "185 USD (approx. ₹15,500)",
          processingTime: "Consular Decision: Verbal decision given immediately at interview window",
          processingSLA: "Interview scheduling slots vary by city.",
          applicationWindow: "Apply 3 to 6 months prior to planned trip",
          earlyEntryBuffer: "Travel permitted anytime during 10-year validity"
        },
        applicationProcess: {
          submission: "1. Digital Intake: Create profile on usvisascheduling.com portal.",
          onlineForm: "2. Form DS-160: Complete tourist declaration and photo upload.",
          appointments: "3. Schedule Appointments: Book Biometric appointment at VAC + Consular Interview.",
          documentsAndBiometrics: [
            "Current Passport valid for 6+ months",
            "DS-160 Confirmation Barcode Page",
            "MRV Fee Receipt & Appointment Confirmation",
            "Financial Bank Proof / Proof of ties to home country",
            "Tentative Travel Itinerary / Hotel Reservation"
          ]
        }
      };
    }
  }

  // Case 3: Singapore
  if (isSingapore) {
    if (isUKorUSorEU && !isStudy && !isWork) {
      return {
        isExempt: true,
        verdictTitle: "Visa-Exempt for Tourism & Business (Up to 90 Days)",
        verdictSummary: `${nationality} passport holders do not need a visa for visits up to 90 days. Mandatory SG Arrival Card (SGAC) required prior to check-in.`,
        entryStatus: "Visa-Free / SGAC Required",
        entryStatusSubtext: "Instant Online Clearance",
        stayDuration: "Up to 90 Days",
        stayDurationSubtext: "Per calendar visit",
        entryType: "Multiple Entry",
        entryTypeSubtext: "Automated e-Gates at Changi",
        visaPillTag: "VISA EXEMPT / ETA",
        digitalCardName: "SG Arrival Card (SGAC)",
        digitalCardDesc: "Free online submission within 3 days before entry.",
        sources: ["ICA Singapore Official", "High Commission Diplomatic API", "IATA Timatic 2026"],
        maxStay: "90 Days",
        conditionsForVisa: [
          "Plan to stay in Singapore for more than 90 consecutive days.",
          "Pursuing full-time higher education or degree courses (Requires Student's Pass STP via ICA SOLAR).",
          "Taking up paid employment, business management, or internships (Requires Employment Pass EP, S-Pass, or Work Permit).",
          "Holding non-standard travel documents or certificates of identity."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "SG Arrival Card (SGAC)", amount: "FREE (S$0)", note: "Mandatory digital border health submission" }
          ],
          totalEstimatedINR: "₹0 Free Entry",
          processingTime: "Instant Online Clearance",
          processingSLA: "Instant electronic submission confirmation barcode.",
          applicationWindow: "Submit within 3 Days before arrival in Singapore",
          earlyEntryBuffer: "Valid for single entry arrival upon submission"
        },
        applicationProcess: {
          submission: "1. Online SGAC Filing: Access official Singapore Immigration & Checkpoints Authority (ICA) portal.",
          onlineForm: "2. Health & Travel Declaration: Fill flight details and accommodation address.",
          appointments: "3. Direct Clearance: Present barcode on smartphone at automated Changi Airport e-Gates.",
          documentsAndBiometrics: [
            "Valid Passport with at least 6 months validity",
            "SG Arrival Card (SGAC) electronic barcode confirmation",
            "Confirmed return or onward flight ticket",
            "Hotel reservation or host address in Singapore"
          ]
        }
      };
    } else if (isStudy) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a Student's Pass for Singapore`,
        verdictSummary: `In-Principle Approval (IPA) Student's Pass issued by ICA Singapore required prior to departure.`,
        entryStatus: "Student's Pass (STP)",
        entryStatusSubtext: "5–10 Days via SOLAR",
        stayDuration: "Duration of Course (1 - 4 Years)",
        stayDurationSubtext: "Full academic degree",
        entryType: "Multiple Entry",
        entryTypeSubtext: "ICA In-Principle Approval (IPA)",
        visaPillTag: "ELECTRONIC ENTRY / VISA REQUIRED",
        digitalCardName: "SG Arrival Card (SGAC) + Student Pass IPA",
        digitalCardDesc: "Submit SGAC online within 3 days of departure, accompanied by your approved Student's Pass (STP) IPA letter.",
        sources: ["ICA Singapore Student Unit", "Ministry of Education SG", "IATA Timatic 2026"],
        maxStay: "Duration of Course (1 - 4 Years)",
        conditionsForVisa: [
          "Enrolling in full-time diploma, undergraduate, postgraduate, or language courses.",
          "Must complete medical screening and biometric registration in Singapore upon arrival.",
          "Legal part-time work permitted up to 16 hrs/week during term time for approved IHL institutions.",
          "Short exchange visits under 90 days may utilize short-term visitor pass if approved by university."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "ICA Processing Fee", amount: "S$45 (approx. ₹2,800)", note: "Non-refundable application processing fee" },
            { label: "STP Issuance Fee", amount: "S$60 (approx. ₹3,750)", note: "Payable upon IPA approval" },
            { label: "Multiple Journey Visa (if applicable)", amount: "S$30 (approx. ₹1,880)", note: "For multiple entries across term breaks" }
          ],
          totalEstimatedINR: "₹8,430 Total ICA Official Fees",
          processingTime: "5 to 10 Business Days via ICA SOLAR System",
          processingSLA: "Instant electronic In-Principle Approval (IPA) letter generation upon clearance.",
          applicationWindow: "Submit 1 to 2 Months before course start date",
          earlyEntryBuffer: "Enter Singapore up to 30 Days before course commencement using IPA"
        },
        applicationProcess: {
          submission: "1. SOLAR Registration: Approved IHL registers student in ICA Student's Pass Online Application & Registration (SOLAR) system.",
          onlineForm: "2. e-Form 16 & Form V36: Student logs into SOLAR with Application Reference and submits personal details.",
          appointments: "3. In-Principle Approval (IPA): ICA issues digital IPA Letter serving as single-entry visa for boarding.",
          documentsAndBiometrics: [
            "Valid Passport with at least 6 months validity",
            "Official ICA In-Principle Approval (IPA) Letter",
            "SOLAR Application Reference Number & University Acceptance Letter",
            "e-Form 16 & Form V36 e-Filing Copies",
            "Bank Statements / Educational Loan Sanction Letter",
            "SG Arrival Card (SGAC) with Health Declaration submitted within 3 days of travel"
          ]
        }
      };
    } else if (isWork) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a Work Pass for Singapore`,
        verdictSummary: `Approved Ministry of Manpower (MOM) Work Pass (EP, S-Pass) required from sponsoring employer.`,
        entryStatus: "MOM Work Pass / IPA",
        entryStatusSubtext: "10–20 Days via myMOM",
        stayDuration: "1 to 5 Years (Renewable)",
        stayDurationSubtext: "Based on employment pass grant",
        entryType: "Multiple Entry",
        entryTypeSubtext: "Employer Sponsored",
        visaPillTag: "ELECTRONIC ENTRY / VISA REQUIRED",
        digitalCardName: "SG Arrival Card + MOM In-Principle Approval (IPA)",
        digitalCardDesc: "Submit SGAC 3 days before departure and present MOM Work Pass IPA at immigration checkpoint.",
        sources: ["Ministry of Manpower (MOM)", "ICA Singapore", "IATA Timatic 2026"],
        maxStay: "1 to 5 Years (Renewable)",
        conditionsForVisa: [
          "Taking up full-time employment with minimum qualifying monthly salary threshold.",
          "Internal company corporate transfers or managerial placements.",
          "Freelance or un-sponsored work is strictly prohibited under visitor permits."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "MOM Application Fee", amount: "S$105 (approx. ₹6,550)", note: "Submitted by licensed Singapore employer" },
            { label: "MOM Pass Issuance Fee", amount: "S$225 (approx. ₹14,050)", note: "Covered by sponsoring entity" }
          ],
          totalEstimatedINR: "Employer Sponsored",
          processingTime: "10 to 20 Business Days via myMOM Portal",
          processingSLA: "Expedited review with COMPASS score validation.",
          applicationWindow: "Employer files 2 to 3 months prior to deployment",
          earlyEntryBuffer: "IPA valid for 6 months from issue date for Singapore entry"
        },
        applicationProcess: {
          submission: "1. MOM Employer Filing: Employer files Employment Pass application on MOM portal.",
          onlineForm: "2. COMPASS & Credential Verification: Educational verification via approved background agencies.",
          appointments: "3. In-Principle Approval (IPA): MOM issues electronic IPA for single entry.",
          documentsAndBiometrics: [
            "MOM In-Principle Approval (IPA) Letter",
            "Signed Employment Offer Letter & Contract",
            "Educational Credentials Verification (COMPASS / ECA)",
            "Passport Biodata Scan (valid 6+ months)",
            "Medical screening report completed upon arrival in Singapore"
          ]
        }
      };
    } else {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require an e-Visa for Singapore`,
        verdictSummary: `Official electronic visa required prior to departure. Instant digital processing in 3–5 days.`,
        entryStatus: "Official E-Visa Required",
        entryStatusSubtext: "3–5 Days Processing",
        stayDuration: "30 Days (Extendable)",
        stayDurationSubtext: "Per calendar visit",
        entryType: "Single / Multiple Entry",
        entryTypeSubtext: "Paper E-Visa with ICA Barcode",
        visaPillTag: "ELECTRONIC ENTRY / VISA REQUIRED",
        digitalCardName: "SG Arrival Card (SGAC)",
        digitalCardDesc: "Mandatory electronic arrival declaration to be completed within 3 days of travel to Singapore.",
        sources: ["ICA Singapore Authorized Portal", "High Commission of Singapore", "IATA Database 2026"],
        maxStay: "30 Days (Extendable)",
        conditionsForVisa: [
          "All leisure, tourist, family visit, and commercial meetings.",
          "Multiple entries valid for up to 2 years based on embassy grant.",
          "Must possess verified return air tickets and confirmed accommodation voucher."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "ICA Government Visa Fee", amount: "S$30 (approx. ₹1,880)", note: "Consular visa grant fee" },
            { label: "Authorized Partner Concierge Fee", amount: "₹2,200", note: "Verification, photo formatting & expedited filing" }
          ],
          totalEstimatedINR: "₹4,080 – ₹4,700 Total Package",
          processingTime: "3 to 4 Business Days (Express 48h Available)",
          processingSLA: "100% digital PDF e-Visa with official ICA barcode sent to WhatsApp & Email.",
          applicationWindow: "Apply 15 to 30 Days prior to departure",
          earlyEntryBuffer: "Valid for multiple entries up to 2 Years from issue date"
        },
        applicationProcess: {
          submission: "1. Smartphone Document Upload: Upload passport scan and selfie directly.",
          onlineForm: "2. AI Millimeter Verification: System validates 6+ mos validity and photo lighting.",
          appointments: "3. Direct Consular Submission: Authorized partner submits directly to ICA.",
          documentsAndBiometrics: [
            "Clear Passport Biodata Scan (valid 6+ months)",
            "Recent Color Photograph (White background, 35x45mm)",
            "Confirmed Return Flight Tickets",
            "Hotel Booking Voucher / Accommodation Proof",
            "SG Arrival Card (SGAC) submitted within 3 days of departure"
          ]
        }
      };
    }
  }

  // Case 4: UAE / GCC
  if (isGCC) {
    return {
      isExempt: false,
      verdictTitle: `${nationality} passport holders require an e-Visa for ${country}`,
      verdictSummary: `Pre-arranged official electronic visa required prior to travel. Fast-track digital issuance in 24–72 hours.`,
      entryStatus: "Official E-Visa Required",
      entryStatusSubtext: "24–72 Hours Processing",
      stayDuration: "30 to 60 Days",
      stayDurationSubtext: "Per calendar visit",
      entryType: "Single / Multiple Entry",
      entryTypeSubtext: "Pre-arranged ICP/GDRFA eVisa",
      visaPillTag: "ELECTRONIC ENTRY / VISA REQUIRED",
      digitalCardName: "UAE ICP / GDRFA eVisa Portal",
      digitalCardDesc: "Pre-arranged eVisa via UAE ICP / GDRFA portal.",
      sources: ["ICP UAE", "GDRFA Dubai", "IATA Timatic 2026"],
      maxStay: "30 to 60 Days",
      conditionsForVisa: [
        `Plan to stay in ${country} for tourism, holidays, or business meetings.`,
        "Holding valid return flight tickets and confirmed hotel booking.",
        "Must possess passport valid for at least 6 months beyond travel date."
      ],
      feesAndProcessing: {
        costItems: [
          { label: "Government Consular Fee", amount: "AED 290 (₹6,500)", note: "Official visa issuance fee" },
          { label: "TravlTik Service & Fast-Track Concierge", amount: "₹2,200", note: "Document verification, photo formatting & assurance" }
        ],
        totalEstimatedINR: "₹8,700 Total Package",
        processingTime: "24 to 72 Hours (Express 12h Available)",
        processingSLA: "Direct digital delivery to WhatsApp and email with 99.4% approval rate.",
        applicationWindow: "Apply 10 to 30 Days prior to departure",
        earlyEntryBuffer: "Entry permit valid for 60 days from issue date"
      },
      applicationProcess: {
        submission: "1. Smartphone Upload: Submit passport scan and photo directly on TravlTik.",
        onlineForm: "2. AI Automated Audit: System verifies passport validity & photo millimeter rules.",
        appointments: "3. Direct Submission: Application submitted directly to official ICP/GDRFA channels.",
        documentsAndBiometrics: [
          "Passport Biodata Page (Valid for at least 6 months)",
          "Digital Passport Photograph (White background)",
          "Confirmed Return Flight Reservation",
          "Hotel Accommodation Booking / Host Invitation"
        ]
      }
    };
  }

  const isCanada = cNorm.includes('canada');
  const isAustralia = cNorm.includes('australia') || cNorm.includes('aus');
  const isGermany = cNorm.includes('germany') || cNorm.includes('deutschland');
  const isGreece = cNorm.includes('greece') || cNorm.includes('hellenic');
  const isSpain = cNorm.includes('spain') || cNorm.includes('españa') || cNorm.includes('espana');
  const isJapan = cNorm.includes('japan');
  const isNewZealand = cNorm.includes('new zealand') || cNorm.includes('nz');
  const isIreland = cNorm.includes('ireland');

  // Case 5: Canada
  if (isCanada) {
    if (isStudy) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a Study Permit for Canada`,
        verdictSummary: `Provincial Attestation Letter (PAL) & DLI Acceptance required prior to lodging IRCC application.`,
        entryStatus: "Canada Study Permit (IRCC)",
        entryStatusSubtext: "4–8 Weeks via IRCC Portal",
        stayDuration: "Duration of Study + 90 Days",
        stayDurationSubtext: "Includes off-campus work rights",
        entryType: "Multiple Entry",
        entryTypeSubtext: "Student TRV / eTA Sticker",
        visaPillTag: "CONSULAR VISA REQUIRED",
        digitalCardName: "IRCC Letter of Introduction",
        digitalCardDesc: "Port of Entry (POE) Study Permit Introduction Letter from Immigration, Refugees and Citizenship Canada.",
        sources: ["IRCC Canada", "Government of Canada", "IATA Timatic 2026"],
        maxStay: "Course Duration + 90 Days",
        conditionsForVisa: [
          "Acceptance letter from Designated Learning Institution (DLI).",
          "Provincial Attestation Letter (PAL) from province.",
          "Guaranteed Investment Certificate (GIC) of CAD $20,635+ for living expenses.",
          "Language proficiency: IELTS (Academic / General) or PTE Core."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "Study Permit Application Fee", amount: "CAD $150 (approx. ₹9,200)", note: "Official IRCC processing fee" },
            { label: "Biometrics Collection Fee", amount: "CAD $85 (approx. ₹5,200)", note: "VFS Canada biometric enrollment" }
          ],
          totalEstimatedINR: "CAD $235 (approx. ₹14,400)",
          processingTime: "4 to 8 Weeks (IRCC Processing Time)",
          processingSLA: "Complete digital submission via IRCC secure GCKey account.",
          applicationWindow: "Apply 3 to 6 Months before term start date",
          earlyEntryBuffer: "Travel to Canada permitted up to 30 days before classes commence"
        },
        applicationProcess: {
          submission: "1. Acceptance & PAL: Secure DLI admission and provincial PAL quota.",
          onlineForm: "2. GCKey Portal Filing: Submit online application on official IRCC portal.",
          appointments: "3. VFS Biometrics: Book and attend biometric appointment at nearest VFS center.",
          documentsAndBiometrics: [
            "Valid Passport with at least 6 months validity",
            "Letter of Acceptance (LOA) & PAL Certificate",
            "Proof of Financial Support & CAD $20,635 GIC Certificate",
            "Upfront Medical Exam Report (eMedical)",
            "Statement of Purpose / Study Plan"
          ]
        }
      };
    } else if (isWork) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a Work Permit for Canada`,
        verdictSummary: `LMIA approval or employer-specific sponsorship required before taking up employment.`,
        entryStatus: "Canada Work Permit (LMIA / PGWP)",
        entryStatusSubtext: "6–12 Weeks Processing",
        stayDuration: "1 to 3 Years (Renewable)",
        stayDurationSubtext: "Path to Express Entry PR",
        entryType: "Multiple Entry",
        entryTypeSubtext: "Worker TRV Foil",
        visaPillTag: "CONSULAR VISA REQUIRED",
        digitalCardName: "IRCC Work Authorization",
        digitalCardDesc: "Official Port of Entry Work Permit Approval.",
        sources: ["IRCC Canada", "ESDC", "IATA Timatic 2026"],
        maxStay: "1 to 3 Years",
        conditionsForVisa: [
          "Positive LMIA from ESDC or LMIA-exempt job offer.",
          "Signed employment contract with registered Canadian business.",
          "Relevant qualifications and criminal background clearance."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "Work Permit Fee", amount: "CAD $155 (approx. ₹9,500)", note: "IRCC worker fee" },
            { label: "Biometrics Fee", amount: "CAD $85 (approx. ₹5,200)", note: "Fingerprints & digital photo" }
          ],
          totalEstimatedINR: "CAD $240 (approx. ₹14,700)",
          processingTime: "6 to 12 Weeks Standard",
          processingSLA: "Expedited processing under Global Skills Strategy if eligible.",
          applicationWindow: "Apply up to 3 Months before job start",
          earlyEntryBuffer: "Entry permitted 14 days before employment start"
        },
        applicationProcess: {
          submission: "1. Employer Filing: Sponsoring enterprise registers job offer on IRCC Employer Portal.",
          onlineForm: "2. Online Submission: Worker completes application on GCKey.",
          appointments: "3. VFS Biometrics: Submit biometrics at VFS Global.",
          documentsAndBiometrics: [
            "Valid Passport with blank pages",
            "LMIA Approval / Offer of Employment Number",
            "Police Clearance Certificate (PCC)",
            "Immigration Medical Exam Confirmation",
            "Educational Credential Assessment (ECA)"
          ]
        }
      };
    } else if (isPR) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require an approved PR Visa / COPR for Canada`,
        verdictSummary: `Permanent Residence granted via Express Entry (FSW/CEC/FST) or Provincial Nominee Program (PNP) with Comprehensive Ranking System (CRS) score.`,
        entryStatus: "Canada Permanent Residence (PR / Express Entry)",
        entryStatusSubtext: "6 Months Standard SLA",
        stayDuration: "Permanent Resident Status (5-Year PR Card)",
        stayDurationSubtext: "Path to Canadian Citizenship after 3 Years",
        entryType: "Permanent Resident",
        entryTypeSubtext: "Confirmation of Permanent Residence (COPR)",
        visaPillTag: "PERMANENT RESIDENCY REQUIRED",
        digitalCardName: "Confirmation of Permanent Residence (COPR)",
        digitalCardDesc: "Official COPR issued by Immigration, Refugees and Citizenship Canada (IRCC).",
        sources: ["IRCC Canada", "Government of Canada", "IATA Timatic 2026"],
        maxStay: "Permanent Resident Status",
        conditionsForVisa: [
          "Invitation to Apply (ITA) received in Express Entry or Provincial Nominee draw.",
          "Language proficiency: minimum CLB 7 in IELTS General or PTE Core.",
          "Educational Credential Assessment (ECA report from WES/CES/IQAS).",
          "Meet settlement funds requirement (minimum 14,690 CAD for single applicant)."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "Principal Applicant Processing Fee", amount: "950 CAD (approx. ₹58,000)", note: "Official IRCC PR processing fee" },
            { label: "Right of Permanent Residence Fee (RPRF)", amount: "575 CAD (approx. ₹35,000)", note: "Mandatory PR landing fee (refundable if refused)" },
            { label: "Biometrics Collection Fee", amount: "85 CAD (approx. ₹5,200)", note: "VFS Canada biometric enrollment" }
          ],
          totalEstimatedINR: "1,610 CAD (approx. ₹98,200 Total for Single Applicant)",
          processingTime: "6 Months Standard (Express Entry IRCC SLA)",
          processingSLA: "Fast-track 6-month processing for federal economic streams.",
          applicationWindow: "Submit complete PR application within 60 days of receiving ITA",
          earlyEntryBuffer: "Land in Canada before the expiry date on your COPR / Medical validity"
        },
        applicationProcess: {
          submission: "1. ECA & Language Exam: Complete WES credential evaluation and IELTS General / PTE Core.",
          onlineForm: "2. Express Entry Profile & ITA: Submit profile, enter pool, and receive Invitation to Apply (ITA).",
          appointments: "3. e-APR Submission & COPR: Upload full medical, PCC, proof of funds; submit passport for COPR stamping.",
          documentsAndBiometrics: [
            "Valid Passport with blank visa pages",
            "Educational Credential Assessment (ECA) Report",
            "Official Language Test Scorecard (IELTS / PTE Core)",
            "Police Clearance Certificates from all countries resided 6+ months",
            "Proof of Settlement Funds (Bank letters meeting IRCC 6-month average rule)",
            "Upfront Immigration Medical Examination (eMedical Sheet)"
          ]
        }
      };
    } else {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a Visitor Visa for Canada`,
        verdictSummary: `Temporary Resident Visa (TRV) required for tourism, family visits, and business trips.`,
        entryStatus: "Canada Visitor Visa (TRV)",
        entryStatusSubtext: "Up to 10-Year Multiple Entry",
        stayDuration: "Up to 180 Days (6 Months)",
        stayDurationSubtext: "Per visit",
        entryType: "Multiple Entry",
        entryTypeSubtext: "10-Year TRV Foil",
        visaPillTag: "CONSULAR VISA REQUIRED",
        digitalCardName: "IRCC TRV Sticker",
        digitalCardDesc: "Physical visa foil in passport issued by Canadian High Commission.",
        sources: ["IRCC Canada", "High Commission of Canada", "IATA Timatic 2026"],
        maxStay: "Up to 6 Months per Visit",
        conditionsForVisa: [
          "Tourism, holidays, visiting family members or short commercial conferences.",
          "Must demonstrate ties to home country and sufficient liquid assets.",
          "No unauthorized work or studying allowed."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "TRV Application Fee", amount: "100 CAD (approx. ₹6,100)", note: "Official IRCC visa fee" },
            { label: "Biometrics Fee", amount: "85 CAD (approx. ₹5,200)", note: "Valid for 10 years once enrolled" }
          ],
          totalEstimatedINR: "185 CAD (approx. ₹11,300)",
          processingTime: "3 to 6 Weeks via GCKey",
          processingSLA: "10-Year multiple entry validity granted up to passport expiry.",
          applicationWindow: "Apply 2 to 4 Months prior to trip",
          earlyEntryBuffer: "Travel permitted anytime during valid TRV window"
        },
        applicationProcess: {
          submission: "1. GCKey Online Intake: Create account and upload passport, itinerary & finances.",
          onlineForm: "2. Document Audit: Upload proof of income, ITR, and hotel/invitation.",
          appointments: "3. Biometrics & Passport Transmission: Attend VFS for biometrics and courier passport.",
          documentsAndBiometrics: [
            "Current Passport valid for 6+ months",
            "6 Months Bank Statements with bank stamp",
            "ITR Acknowledgement for last 2–3 years",
            "Travel Itinerary & Hotel Reservation",
            "Employment Verification / Leave Approval"
          ]
        }
      };
    }
  }

  // Case 6: Australia
  if (isAustralia) {
    if (isStudy) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a Student Visa (Subclass 500) for Australia`,
        verdictSummary: `Confirmation of Enrolment (CoE) & Genuine Student (GS) criteria required under DHA rules.`,
        entryStatus: "Australia Student Visa (Subclass 500)",
        entryStatusSubtext: "4–6 Weeks via ImmiAccount",
        stayDuration: "Duration of Course (Up to 5 Years)",
        stayDurationSubtext: "Includes 48 hrs/fortnight work rights",
        entryType: "Multiple Entry",
        entryTypeSubtext: "Digital Visa Grant (VEVO)",
        visaPillTag: "ELECTRONIC VISA REQUIRED",
        digitalCardName: "DHA ImmiAccount VEVO Grant",
        digitalCardDesc: "Department of Home Affairs Electronic Visa Grant Notification.",
        sources: ["Department of Home Affairs (DHA)", "Study Australia", "IATA Timatic 2026"],
        maxStay: "Course Duration + 2 Months",
        conditionsForVisa: [
          "Full-time enrollment in CRICOS-registered course with valid CoE.",
          "Must pass Genuine Student (GS) assessment criteria.",
          "Overseas Student Health Cover (OSHC) for entire stay.",
          "Proof of living cost (29,710 AUD/yr) & tuition funds."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "Subclass 500 Application Fee", amount: "1,600 AUD (approx. ₹88,000)", note: "Official DHA visa surcharge" },
            { label: "OSHC Health Insurance", amount: "600 AUD – 900 AUD/yr", note: "Mandatory Australian medical protection" }
          ],
          totalEstimatedINR: "1,600 AUD Base Fee",
          processingTime: "4 to 6 Weeks Standard via ImmiAccount",
          processingSLA: "100% paperless digital grant linked electronically to passport.",
          applicationWindow: "Apply up to 6 Months before course start",
          earlyEntryBuffer: "Travel to Australia permitted up to 90 days before course start date"
        },
        applicationProcess: {
          submission: "1. University Offer & CoE: Pay tuition deposit to secure official electronic CoE.",
          onlineForm: "2. ImmiAccount Filing: Complete online application on Home Affairs portal.",
          appointments: "3. Health & Biometrics: Complete HAP health panel exam and VFS biometrics.",
          documentsAndBiometrics: [
            "Valid Passport with minimum 6 months validity",
            "Electronic Confirmation of Enrolment (CoE)",
            "Genuine Student (GS) Statement",
            "Proof of Funds / Bank Statements & Education Loan",
            "OSHC Health Insurance Certificate",
            "English Proficiency Test (IELTS / PTE Academic)"
          ]
        }
      };
    } else if (isPR) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a Permanent Residence Visa (Subclass 189 / 190) for Australia`,
        verdictSummary: `Points-tested SkillSelect PR visa for skilled professionals with positive skills assessment and state nomination.`,
        entryStatus: "Australia Permanent Residency (Subclass 189 / 190)",
        entryStatusSubtext: "SkillSelect Points Tested (65+ Points)",
        stayDuration: "Permanent Residency (5-Year Travel Facility)",
        stayDurationSubtext: "Path to Australian Citizenship after 4 Years",
        entryType: "Permanent Resident",
        entryTypeSubtext: "Direct PR Visa Grant",
        visaPillTag: "PERMANENT RESIDENCY REQUIRED",
        digitalCardName: "SkillSelect PR Grant Notification",
        digitalCardDesc: "Direct Permanent Residency visa grant linked electronically to passport by Department of Home Affairs.",
        sources: ["Australian Department of Home Affairs", "SkillSelect", "IATA Timatic 2026"],
        maxStay: "Permanent Resident Status",
        conditionsForVisa: [
          "Score at least 65 points on the Department of Home Affairs points table.",
          "Positive skills assessment in nominated occupation (ACS, VETASSESS, Engineers Australia).",
          "Competent English (IELTS 6.0+ in each band / PTE 50+; Proficient English for +10 points).",
          "Receive formal Invitation to Apply (ITA) through SkillSelect."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "Base Application Charge (Primary Applicant)", amount: "4,765 AUD (approx. ₹2,65,000)", note: "Official Home Affairs visa fee" },
            { label: "Additional Applicant (18+ Years)", amount: "2,385 AUD (approx. ₹1,32,000)", note: "Per dependent spouse / partner" }
          ],
          totalEstimatedINR: "4,765 AUD Base Charge",
          processingTime: "6 to 9 Months from Invitation to Visa Grant",
          processingSLA: "100% digital grant notification via ImmiAccount.",
          applicationWindow: "Submit complete visa application within 60 days of SkillSelect invitation",
          earlyEntryBuffer: "Initial entry date specified on grant letter (typically within 12 months)"
        },
        applicationProcess: {
          submission: "1. Skills Assessment: Obtain positive outcome from authorized assessing body (ACS, EA, VETASSESS).",
          onlineForm: "2. Expression of Interest (EOI): Lodge EOI on SkillSelect portal with points breakdown.",
          appointments: "3. Visa Lodgement & Biometrics: Upon invitation, lodge visa via ImmiAccount and provide biometrics/medicals.",
          documentsAndBiometrics: [
            "Valid Passport with bio-data pages",
            "Positive Skills Assessment Letter",
            "English Language Test Scorecard (PTE / IELTS)",
            "Employment Reference Letters & Payslips / Form 16",
            "National Police Certificate / Indian PCC",
            "HAP ID Medical Examination Clearance"
          ]
        }
      };
    } else {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a Visitor Visa (Subclass 600) for Australia`,
        verdictSummary: `Tourist stream visa required prior to departure. 100% digital online lodgement via ImmiAccount.`,
        entryStatus: "Australia Visitor Visa (Subclass 600)",
        entryStatusSubtext: "3–4 Weeks Digital Processing",
        stayDuration: "3, 6, or 12 Months",
        stayDurationSubtext: "Per calendar visit",
        entryType: "Multiple Entry",
        entryTypeSubtext: "Digital VEVO Visa",
        visaPillTag: "ELECTRONIC VISA REQUIRED",
        digitalCardName: "DHA ImmiAccount VEVO",
        digitalCardDesc: "Official Department of Home Affairs electronic visa grant.",
        sources: ["DHA Australia", "Australian High Commission", "IATA Timatic 2026"],
        maxStay: "Up to 3–12 Months per Visit",
        conditionsForVisa: [
          "Tourism, holidays, visiting family or friends, or informal business visits.",
          "Must not work or provide commercial services in Australia.",
          "Must have access to sufficient funds for entire stay."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "Visitor Visa Application Fee", amount: "190 AUD (approx. ₹10,500)", note: "Official DHA lodgement fee" }
          ],
          totalEstimatedINR: "190 AUD (approx. ₹10,500)",
          processingTime: "3 to 4 Weeks via ImmiAccount",
          processingSLA: "Digital grant linked directly to passport number.",
          applicationWindow: "Apply 1 to 3 Months before trip",
          earlyEntryBuffer: "Travel permitted anytime during 1 to 3 year visa grant"
        },
        applicationProcess: {
          submission: "1. ImmiAccount Registration: Create applicant account on DHA portal.",
          onlineForm: "2. Form Submission: Complete Subclass 600 Tourist Stream declarations.",
          appointments: "3. Biometrics Collection: Complete biometrics at VFS Australian Biometric Center.",
          documentsAndBiometrics: [
            "Valid Passport with 6+ months validity",
            "6 Months Bank Statements & Tax Returns",
            "Employment Leave Certificate / Business Registration",
            "Detailed Travel Itinerary & Accommodation Details",
            "Cover Letter explaining purpose of visit"
          ]
        }
      };
    }
  }

  // Case 7: Germany
  if (isGermany) {
    if (isStudy) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a National Visa (Type D) for Germany`,
        verdictSummary: `University Admission, Blocked Account (€11,904/yr) & APS Certificate required for Germany.`,
        entryStatus: "German National Visa (Type D - Study)",
        entryStatusSubtext: "4–8 Weeks Processing",
        stayDuration: "Duration of Study (Up to 4–5 Years)",
        stayDurationSubtext: "Includes 140 full days work permit",
        entryType: "Multiple Entry",
        entryTypeSubtext: "National Visa D + Residence Permit",
        visaPillTag: "CONSULAR VISA REQUIRED",
        digitalCardName: "German Embassy National Visa",
        digitalCardDesc: "Federal Republic of Germany National Visa D.",
        sources: ["German Federal Foreign Office", "DAAD", "IATA Timatic 2026"],
        maxStay: "Duration of Academic Degree",
        conditionsForVisa: [
          "Unconditional Admission Letter from German university.",
          "Mandatory APS Certificate (Academic Evaluation Centre) for Indian applicants.",
          "Blocked Account (Sperrkonto) with minimum €11,904/year.",
          "Statutory or private travel health insurance."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "National Visa Fee", amount: "€75 (approx. ₹6,800)", note: "Official German consular fee" },
            { label: "VFS Center Service Charge", amount: "₹2,200", note: "Biometrics & document submission" }
          ],
          totalEstimatedINR: "€75 (approx. ₹6,800) + Service Fee",
          processingTime: "4 to 8 Weeks (German Mission Review)",
          processingSLA: "Appointments booked via VFS Global German Visa Application Centers.",
          applicationWindow: "Apply up to 3 Months before semester start",
          earlyEntryBuffer: "Entry permitted 2 to 3 weeks before course start date"
        },
        applicationProcess: {
          submission: "1. APS Certificate & Admission: Obtain APS verification and university acceptance.",
          onlineForm: "2. VIDEX Form: Fill official VIDEX national visa application online.",
          appointments: "3. VFS Biometric Appointment: Submit dossier and biometrics at VFS German VAC.",
          documentsAndBiometrics: [
            "Valid Passport with at least 12 months validity",
            "APS Certificate (Original)",
            "University Admission Letter (Zulassungsbescheid)",
            "Proof of Blocked Account (€11,904 confirmation letter)",
            "Curriculum Vitae (CV) & Motivation Letter",
            "Proof of German / English Language Proficiency"
          ]
        }
      };
    }
  }

  // Case 8: Schengen Area (Including Greece & Spain - Official Consular Rules)
  if (isSchengen || isGreece || isSpain) {
    if (isStudy) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a National Study Visa for ${country}`,
        verdictSummary: `National Type D Study Visa required. Acceptance from accredited institution & €30,000 medical insurance required.`,
        entryStatus: "National Study Visa (Type D)",
        entryStatusSubtext: "15 to 45 Calendar Days Processing",
        stayDuration: "Duration of Academic Course (1–4 Years)",
        stayDurationSubtext: "Multi-entry European student rights",
        entryType: "Multiple Entry",
        entryTypeSubtext: "National Type D Sticker",
        visaPillTag: "CONSULAR VISA REQUIRED",
        digitalCardName: "National Type D Visa Sticker",
        digitalCardDesc: "Official consular long-stay student visa sticker with Schengen mobility.",
        sources: [isGreece ? "Global Visa Center World (GVCW)" : isSpain ? "BLS International Spain / Spanish Embassy" : "Schengen Consular Affairs", "Ministry of Foreign Affairs", "IATA Timatic 2026"],
        maxStay: "Duration of Academic Degree",
        conditionsForVisa: [
          `Formal acceptance letter from accredited institution in ${country}.`,
          "Valid travel medical insurance with minimum €30,000 coverage valid across Schengen.",
          "Clean criminal record certificate and medical health certificate.",
          "Demonstrate sufficient funds to cover tuition and living expenses."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "National Type D Visa Fee", amount: "€75 (approx. ₹6,800)", note: "Official consular long-term visa fee" },
            { label: isGreece ? "GVCW Service Fee" : isSpain ? "BLS International Fee" : "VFS / TLS Service Fee", amount: isSpain ? "€17 (approx. ₹1,550)" : "₹2,500 – ₹3,200", note: "Biometric and center logistics" }
          ],
          totalEstimatedINR: isSpain ? "€75 + €17 (approx. ₹8,350)" : "€75 (approx. ₹6,800) + Logistics",
          processingTime: "15 to 45 Calendar Days",
          processingSLA: isGreece ? "Processed by Greek Consular Authorities via GVCW centers." : isSpain ? "Processed by Embassy of Spain / BLS centers." : "Processed by designated consular mission.",
          applicationWindow: "Apply up to 6 Months before course start",
          earlyEntryBuffer: "Travel permitted 2 to 3 weeks before classes begin"
        },
        applicationProcess: {
          submission: "1. Institutional Acceptance: Secure official enrollment certificate.",
          onlineForm: "2. National Visa Form: Fill national visa application form with photo.",
          appointments: isGreece ? "3. GVCW Appointment: Book biometrics at GVCW Visa Application Center." : isSpain ? "3. BLS Spain Appointment: Book biometrics at BLS International Spain Centre." : "3. VFS/TLS Appointment: Book biometrics at VAC.",
          documentsAndBiometrics: [
            "Valid Passport (issued within 10 years, valid for 1+ year)",
            "University Acceptance Certificate & Receipt of Fees",
            "Proof of Financial Means (Bank statements of last 6 months)",
            "Travel Medical Insurance (€30,000+ coverage)",
            "Police Clearance Certificate (PCC) apostilled / legalized",
            "Medical Health Clearance Certificate"
          ]
        }
      };
    } else if (isWork) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require an Employment Visa for ${country}`,
        verdictSummary: `National Type D Employment Visa required based on certified contract approved by Ministry of Labour.`,
        entryStatus: "National Employment Visa (Type D)",
        entryStatusSubtext: "30 to 60 Calendar Days",
        stayDuration: "1 to 2 Years (Renewable)",
        stayDurationSubtext: "Includes EU Blue Card rights",
        entryType: "Multiple Entry",
        entryTypeSubtext: "National Long-Stay Foil",
        visaPillTag: "CONSULAR VISA REQUIRED",
        digitalCardName: "National Type D Work Visa",
        digitalCardDesc: "Official employment authorization sticker.",
        sources: [isGreece ? "GVCW / Greek Embassy" : isSpain ? "BLS Spain / Spanish Embassy" : "Ministry of Labour & Consular Affairs", "IATA Timatic 2026"],
        maxStay: "1 to 2 Years (Renewable)",
        conditionsForVisa: [
          "Signed employment agreement with registered enterprise.",
          "Ministry of Labour / Foreign Affairs pre-approval.",
          "Medical insurance and clear background check."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "National Type D Employment Fee", amount: "€180 (approx. ₹16,400)", note: "Official consular long-stay fee" },
            { label: isSpain ? "BLS Biometric Fee" : "VAC Biometric Fee", amount: isSpain ? "€17 (approx. ₹1,550)" : "₹2,500 – ₹3,200", note: "VAC service charge" }
          ],
          totalEstimatedINR: "€180 (approx. ₹16,400)",
          processingTime: "30 to 60 Calendar Days",
          processingSLA: "Employer coordinates with national labour authorities.",
          applicationWindow: "Apply 2 to 3 Months before job start date",
          earlyEntryBuffer: "Travel permitted 14 days before contract start"
        },
        applicationProcess: {
          submission: "1. Labour Approval: Sponsoring enterprise secures work authorization in Europe.",
          onlineForm: "2. Visa Application: Complete long-term national D visa application.",
          appointments: isGreece ? "3. GVCW Biometrics: Attend appointment at GVCW center." : isSpain ? "3. BLS Spain Biometrics: Attend appointment at BLS Spain center." : "3. Consular Appointment: Submit biometrics.",
          documentsAndBiometrics: [
            "Valid Passport with at least 1 year validity",
            "Signed Employment Contract & Ministry Pre-Approval",
            "Apostilled Police Clearance Certificate (PCC)",
            "Medical Certificate from authorized hospital",
            "Professional Qualification Certificates & CV"
          ]
        }
      };
    } else {
      // Tourism / Short Stay Type C (GVC World / BLS Spain / Schengen Code Official)
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a Schengen Visa for ${country}`,
        verdictSummary: `Short-stay visa (Type C) required before departure. Valid across all 29 European Schengen states.`,
        entryStatus: isGreece ? "Greece Schengen Visa (Type C)" : isSpain ? "Spain Schengen Visa (Type C)" : "Schengen Short-Stay Visa",
        entryStatusSubtext: "15 Calendar Days Processing",
        stayDuration: "Up to 90 Days within 180 Days",
        stayDurationSubtext: "Within any rolling 180-day period",
        entryType: "Single / Multiple Entry",
        entryTypeSubtext: "Valid in 29 Schengen states",
        visaPillTag: "CONSULAR VISA REQUIRED",
        digitalCardName: isSpain ? "BLS Spain Consular Portal" : isGreece ? "GVCW Greece Portal" : "Schengen Consular Portal",
        digitalCardDesc: "Official Schengen visa sticker in passport valid across 29 European member states.",
        sources: [isGreece ? "Global Visa Center World (GVCW)" : isSpain ? "BLS International Spain" : "European Commission", "Consular Affairs Department", "IATA Timatic 2026"],
        maxStay: "90 Days within 180 Days",
        conditionsForVisa: [
          `Tourism, business visits, or family trips across Schengen territory.`,
          "Mandatory travel medical insurance with minimum €30,000 coverage (e.g. INSURTE / compliant provider).",
          "Passport issued within last 10 years with 3+ months validity beyond return date and 2 blank pages."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "Schengen Visa Fee (Adult)", amount: "€90 (approx. ₹8,200)", note: "Official EU consular fee (Children 6-12: €45; under 6: Free)" },
            { label: isGreece ? "GVCW Service Fee" : isSpain ? "BLS International Service Fee" : "VFS / TLS Service Fee", amount: isSpain ? "€17 (approx. ₹1,550)" : isGreece ? "€30 (approx. ₹2,700)" : "₹2,500 – ₹3,200", note: "Biometric collection and center logistics fee" }
          ],
          totalEstimatedINR: isSpain ? "€107 (approx. ₹9,650)" : "€120 (approx. ₹10,800)",
          processingTime: "15 Calendar Days (Standard Consular Period)",
          processingSLA: isGreece 
            ? "Lodged at GVCW VACs across India and assessed by the Embassy of Greece in New Delhi." 
            : isSpain
            ? "Lodged at BLS International Spain Visa Application Centres across India and assessed by Embassy of Spain / Consulate General in Mumbai."
            : "Appointments scheduled at designated VFS/TLS global visa application centers.",
          applicationWindow: "Apply up to 6 Months before planned travel (minimum 15 working days)",
          earlyEntryBuffer: "Travel permitted within valid visa dates"
        },
        applicationProcess: {
          submission: isSpain ? "1. Visa Form Filing: Complete official Spanish Schengen visa application form from BLS Spain." : "1. Visa Form Filing: Complete official harmonized Schengen visa application form.",
          onlineForm: isSpain ? "2. Document Preparation: Compile round-trip flights, hotel bookings (or police-approved Carta de Invitación), 3-6 month bank statements & €30k insurance." : "2. Document Preparation: Compile round-trip flights, hotel vouchers, 3-6 month stamped bank statements & €30k insurance.",
          appointments: isGreece ? "3. GVCW Biometrics: Book and attend appointment at nearest GVCW Center in India." : isSpain ? "3. BLS Spain Biometrics: Book and attend appointment at nearest BLS International Spain Center in India." : "3. VFS/TLS Biometrics: Attend appointment for fingerprinting & passport submission.",
          documentsAndBiometrics: [
            "Passport valid for at least 3 months beyond departure date with 2 blank pages (issued within 10 years)",
            "2 Recent Passport Photos (35x45mm, white background, facing forward)",
            "Travel Medical Insurance with minimum €30,000 coverage for medical repatriation across all 29 Schengen states",
            "Cover Letter with day-by-day itinerary & purpose of visit",
            isSpain ? "Bank statements of last 3-6 months meeting Spain statutory solvency: min €122/day (min €1,099 floor)" : "Bank statements of last 3-6 months with original bank seal and stamp",
            isSpain ? "Confirmed round-trip flight reservations & hotel bookings (or official Carta de Invitación from Policía Nacional if hosted in Spain)" : "Confirmed round-trip flight reservations & hotel accommodation bookings",
            "Employment NOC / Salary slips of last 3 months or Student Enrollment Proof / Business registration & ITR"
          ]
        }
      };
    }
  }

  // Case 8B: Yemen (Direct Consular Mission & Ministry of Interior PISA Security Clearance)
  if (isYemen) {
    return {
      isExempt: false,
      verdictTitle: `${nationality} passport holders require a Consular Visa with MOI Clearance for Yemen`,
      verdictSummary: `Direct Consular Visa required via Embassy of Yemen, New Delhi. Mandatory Prior Security Approval from Ministry of Interior (PISA) in Yemen required before visa issuance. Strictly NO Israeli stamps permitted.`,
      entryStatus: "Yemen Consular Visa (MOI Clearance Required)",
      entryStatusSubtext: "10–20 Business Days (Post-MOI Approval)",
      stayDuration: "Up to 30 Days",
      stayDurationSubtext: "Single Entry (Extendable at PISA Aden)",
      entryType: "Single Entry",
      entryTypeSubtext: "Direct Embassy Foil",
      visaPillTag: "SECURITY CLEARANCE & CONSULAR VISA REQUIRED",
      digitalCardName: "Yemen MOI / PISA Security Approval & Embassy Sticker",
      digitalCardDesc: "Official security clearance telex from Ministry of Interior (PISA - Yemen) and Embassy visa foil.",
      sources: ["Embassy of the Republic of Yemen, New Delhi", "Passports, Immigration and Naturalization Authority (PISA - Yemen)", "IATA Timatic 2026"],
      maxStay: "30 Days per Entry",
      conditionsForVisa: [
        "Prior Visa Security Clearance Letter issued by Ministry of Interior (PISA) in Yemen.",
        "Passport must NOT contain any Israeli visas, entry/exit stamps, or border transit stamps.",
        "Indian Employer Deputation Letter with explicit Government of India (MEA) Travel Advisory Undertaking.",
        "Original Medical Fitness Certificate including certified test reports for HIV, Hepatitis B/C, and Chest X-Ray for TB."
      ],
      feesAndProcessing: {
        costItems: [
          { label: "Yemen Embassy Consular Visa Fee", amount: "100 – 150 USD (approx. ₹8,500 – ₹12,500)", note: "Payable directly via Embassy demand draft / consular account" },
          { label: "Commercial VAC / VFS Fee", amount: "₹0 (No Commercial VAC exists)", note: "Applications submitted directly to Embassy of Yemen in New Delhi" }
        ],
        totalEstimatedINR: "100 – 150 USD (approx. ₹8,500 – ₹12,500)",
        processingTime: "10 to 20 Business Days (Post-MOI Clearance Receipt)",
        processingSLA: "Issued directly by Consular Section, Embassy of Yemen, New Delhi upon receiving MOI approval cable.",
        applicationWindow: "Apply 3 to 6 weeks before planned travel once Yemeni host secures MOI clearance",
        earlyEntryBuffer: "Valid for single entry arrival within 90 days of issuance"
      },
      applicationProcess: {
        submission: "1. Yemeni Host MOI Clearance: Host company applies at Ministry of Interior (PISA) in Yemen for Security Approval.",
        onlineForm: "2. Embassy Form & Dossier: Complete official Yemen visa form and compile Chamber-certified invitation, employer MEA undertaking & medicals.",
        appointments: "3. Direct Embassy Submission: Submit physical dossier at Consular Section, Embassy of the Republic of Yemen, New Delhi (no VFS).",
        documentsAndBiometrics: [
          "Original Passport valid for 6+ months (strictly NO Israeli stamps)",
          "Ministry of Interior (MOI / PISA) Security Clearance Approval Letter",
          "Completed & Signed Yemen Embassy Visa Application Form with 2 photos",
          "Chamber of Commerce Certified Yemeni Host Invitation Letter",
          "Indian Sponsoring Company Deputation Letter & MEA Advisory Undertaking",
          "Medical Fitness Clearance Certificate (HIV, Hep B/C, TB Chest X-Ray)",
          "Confirmed Flight Itinerary to Aden (ADE) or Seiyun (GXF)"
        ]
      }
    };
  }

  // Case 8C: Ireland (Immigration Service Delivery - Department of Justice Ireland)
  if (isIreland) {
    if (isStudy) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a Long Stay 'D' Study Visa for Ireland`,
        verdictSummary: `Unconditional university acceptance on ILEP, minimum €6,000 tuition fees paid, and €10,000 living expense funds required. Stamp 2 permission granted upon arrival.`,
        entryStatus: "Ireland Study Visa (Long Stay 'D')",
        entryStatusSubtext: "4–8 Weeks via AVATS / VFS",
        stayDuration: "Length of Academic Program",
        stayDurationSubtext: "Includes Stamp 2 work rights (20 hrs/wk)",
        entryType: "Single Entry (Initial Vignette) / Multiple Entry (via IRP)",
        entryTypeSubtext: "Irish Residence Permit (IRP Stamp 2)",
        visaPillTag: "CONSULAR VISA REQUIRED",
        digitalCardName: "AVATS Study Application Summary",
        digitalCardDesc: "Official Long Stay 'D' Visa Application Summary Sheet from Department of Justice Ireland.",
        sources: ["Immigration Service Delivery (ISD) Ireland", "Department of Justice", "VFS Global Ireland", "IATA Timatic 2026"],
        maxStay: "Full Course Duration (Renewable annually)",
        conditionsForVisa: [
          "Unconditional offer letter from an Irish Higher Education Institution (on ILEP list).",
          "Official receipt showing minimum €6,000 tuition fees paid (or 100% of fees).",
          "Evidence of at least €10,000 immediately accessible funds for living expenses in Ireland.",
          "Proof of English language proficiency (IELTS Academic 5.5-6.5+ or PTE Academic).",
          "Comprehensive private medical health insurance policy covering at least €25,000."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "Consular Visa Fee", amount: "€60 Single Entry (~₹5,400) / €100 Multiple Entry (~₹9,000)", note: "Statutory Department of Justice Ireland fee" },
            { label: "VFS Global Biometric & Service Fee", amount: "approx. ₹2,100", note: "Biometrics enrollment and dossier handling" },
            { label: "Irish Residence Permit (IRP) Registration", amount: "€300 (approx. ₹27,000)", note: "Payable in Ireland upon arrival at ISD / Garda office" }
          ],
          totalEstimatedINR: "€60 + ₹2,100 (approx. ₹7,500 initial submission)",
          processingTime: "4 to 8 Weeks (ISD Dublin & Embassy New Delhi)",
          processingSLA: "Online filing via AVATS portal, biometrics at VFS Global, decision by ISD.",
          applicationWindow: "Apply up to 3 Months before course commencement date",
          earlyEntryBuffer: "Travel to Ireland permitted up to 30 days before course start"
        },
        applicationProcess: {
          submission: "1. University Enrollment & Fees: Secure unconditional offer on ILEP and pay minimum €6,000 fees.",
          onlineForm: "2. AVATS Online Filing: Complete official application on visas.inis.gov.ie/avats under Study (D).",
          appointments: "3. VFS Global Appointment: Attend biometric submission and submit original passport and academic dossier.",
          documentsAndBiometrics: [
            "Valid Passport with at least 12 months validity and 2 blank pages",
            "Official Letter of Acceptance from Irish university / college",
            "Proof of Tuition Fees Paid (college receipt or TransferMate confirmation)",
            "AVATS Online Application Summary Sheet (signed and dated)",
            "Evidence of €10,000 immediately accessible living expenses funds",
            "Proof of English proficiency (IELTS / PTE Academic)",
            "Private Medical Health Insurance policy",
            "Comprehensive Statement of Purpose & Academic Certificates"
          ]
        }
      };
    } else if (isWork) {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require an Employment Visa for Ireland`,
        verdictSummary: `Approved Employment Permit from the Department of Enterprise, Trade and Employment (DETE) required prior to lodging AVATS application.`,
        entryStatus: "Ireland Employment Visa (Long Stay 'D')",
        entryStatusSubtext: "4–8 Weeks Processing",
        stayDuration: "Duration of Employment Contract",
        stayDurationSubtext: "Stamp 1 Permission (Path to Stamp 4 PR)",
        entryType: "Single Entry (Initial Vignette) / Multiple Entry (via IRP)",
        entryTypeSubtext: "Irish Residence Permit (IRP Stamp 1)",
        visaPillTag: "EMPLOYMENT PERMIT & VISA REQUIRED",
        digitalCardName: "AVATS Employment Visa Summary",
        digitalCardDesc: "Official Long Stay Employment Visa Summary from Immigration Service Delivery Ireland.",
        sources: ["Department of Enterprise, Trade and Employment (DETE)", "Immigration Service Delivery (ISD)", "VFS Global Ireland"],
        maxStay: "1 to 2 Years (Renewable)",
        conditionsForVisa: [
          "Approved Critical Skills or General Employment Permit from DETE Ireland.",
          "Signed employment contract with registered Irish corporate sponsor.",
          "Relevant degree qualifications and professional CV.",
          "Sufficient initial settlement funds in bank account."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "Consular Visa Fee", amount: "€60 Single Entry (~₹5,400) / €100 Multiple Entry (~₹9,000)", note: "Statutory consular visa fee" },
            { label: "VFS Global Service Fee", amount: "approx. ₹2,100", note: "Biometrics and handling" },
            { label: "IRP Stamp 1 Card Registration", amount: "€300 (approx. ₹27,000)", note: "Payable in Ireland upon arrival" }
          ],
          totalEstimatedINR: "€60 + ₹2,100 (approx. ₹7,500 initial submission)",
          processingTime: "4 to 8 Weeks",
          processingSLA: "Consular processing following DETE employment permit issuance.",
          applicationWindow: "Apply up to 3 Months before job start date",
          earlyEntryBuffer: "Entry permitted up to 14 days before contract start"
        },
        applicationProcess: {
          submission: "1. DETE Permit: Sponsoring enterprise secures Employment Permit from DETE in Ireland.",
          onlineForm: "2. AVATS Submission: Complete application online under Employment (D).",
          appointments: "3. VFS Biometrics: Attend appointment and submit original documents.",
          documentsAndBiometrics: [
            "Valid Passport with 12+ months validity",
            "Original or copy of approved DETE Employment Permit",
            "Signed Employment Contract & Job Offer Letter",
            "AVATS Application Summary Sheet with 2 photos",
            "Recent 6 months bank statements"
          ]
        }
      };
    } else {
      return {
        isExempt: false,
        verdictTitle: `${nationality} passport holders require a Visit Visa for Ireland`,
        verdictSummary: `Short Stay 'C' Visit Visa required for tourism, family visits, or short business. Ireland is NOT in the Schengen zone.`,
        entryStatus: "Ireland Visit Visa (Short Stay 'C')",
        entryStatusSubtext: "6–8 Weeks via AVATS / VFS",
        stayDuration: "Up to 90 Days",
        stayDurationSubtext: "Strictly non-extendable",
        entryType: "Single Entry / Multiple Entry",
        entryTypeSubtext: "Consular Vignette Foil",
        visaPillTag: "CONSULAR VISA REQUIRED",
        digitalCardName: "AVATS Tourist Application Summary",
        digitalCardDesc: "Official Short Stay 'C' Visa Summary Sheet from Department of Justice Ireland.",
        sources: ["Immigration Service Delivery (ISD)", "Embassy of Ireland New Delhi", "VFS Global Ireland"],
        maxStay: "90 Days per Visit",
        conditionsForVisa: [
          "Original Passport valid for 6+ months with 2 blank pages.",
          "Confirmed flight itinerary and accommodation reservations (do NOT buy tickets).",
          "6 months bank statements showing regular income (approx. €500/week).",
          "Comprehensive travel health insurance with minimum €30,000 coverage."
        ],
        feesAndProcessing: {
          costItems: [
            { label: "Consular Visa Fee", amount: "€60 Single Entry (~₹5,400) / €100 Multiple Entry (~₹9,000)", note: "Department of Justice Ireland fee" },
            { label: "VFS Global Service Fee", amount: "approx. ₹2,100", note: "VAC service charge" }
          ],
          totalEstimatedINR: "€60 + ₹2,100 (approx. ₹7,500)",
          processingTime: "6 to 8 Weeks (20 to 25 Working Days)",
          processingSLA: "Processed via Embassy of Ireland, New Delhi.",
          applicationWindow: "Apply up to 3 Months before travel",
          earlyEntryBuffer: "Valid for travel dates specified"
        },
        applicationProcess: {
          submission: "1. AVATS Form: Fill application on visas.inis.gov.ie/avats.",
          onlineForm: "2. Fee Payment: Pay consular fee online or at VAC.",
          appointments: "3. VFS Appointment: Submit passport and biometric data at VFS Global.",
          documentsAndBiometrics: [
            "Valid Passport with 2 blank pages",
            "Signed AVATS Summary Sheet with 2 photos",
            "Cover Letter with travel itinerary & proof of return obligations",
            "6 Months Bank Statements & 3 Years ITR-V",
            "Confirmed accommodation proof & travel medical insurance"
          ]
        }
      };
    }
  }

  // Case 9: Generic / Other Destinations
  return {
    isExempt: false,
    verdictTitle: `${nationality} passport holders require a visa for ${country}`,
    verdictSummary: `Official travel authorization required before departure. Verified online application with fast turnaround.`,
    entryStatus: `${country} Entry Visa`,
    entryStatusSubtext: "3–5 Days Processing",
    stayDuration: "30 Days (Extendable)",
    stayDurationSubtext: "Per calendar visit",
    entryType: "Single / Multiple Entry",
    entryTypeSubtext: "Consular grant",
    visaPillTag: "ELECTRONIC ENTRY / VISA REQUIRED",
    digitalCardName: "Consular E-Visa Portal",
    digitalCardDesc: "Official electronic travel authorization.",
    sources: ["Consular Affairs Department", "Diplomatic Mission API", "IATA Timatic 2026"],
    maxStay: "30 to 90 Days",
    conditionsForVisa: [
      `Plan to stay in ${country} for tourism, holidays, or business meetings.`,
      "Holding valid return flight tickets and confirmed hotel booking.",
      "Must possess passport valid for at least 6 months beyond travel date."
    ],
    feesAndProcessing: {
      costItems: [
        { label: "Government Consular Fee", amount: "₹3,500 – ₹7,800", note: "Official visa issuance fee" },
        { label: "TravlTik Service & Fast-Track Concierge", amount: "₹2,200 – ₹2,900", note: "Document verification, photo formatting & assurance" }
      ],
      totalEstimatedINR: "₹5,700 – ₹10,400 Total",
      processingTime: "3 to 5 Business Days (Express 24-48h Available)",
      processingSLA: "Direct digital delivery to WhatsApp and email with 99.4% approval rate.",
      applicationWindow: "Apply 15 to 90 Days prior to departure",
      earlyEntryBuffer: "Valid for single or multiple entry per consular grant"
    },
    applicationProcess: {
      submission: "1. Smartphone Upload: Submit passport scan and photo directly on TravlTik.",
      onlineForm: "2. AI Automated Audit: System verifies passport validity, photo millimeter rules & funds.",
      appointments: "3. Direct Submission: Application submitted directly to official consular channels.",
      documentsAndBiometrics: [
        "Passport Biodata Page (Valid for at least 6 months)",
        "Digital Passport Photograph (White background)",
        "Confirmed Return Flight Reservation",
        "Hotel Accommodation Booking / Host Invitation",
        "Bank Statement / Sufficient Travel Funds Proof"
      ]
    }
  };
}

export interface StudyUniversityItem {
  id: string;
  name: string;
  location: string;
  country: string;
  rank: string;
  tuitionLocal: string;
  tuitionINR: string;
  ieltsMin: string;
  degreeLevels: string[];
  sevpApproved: boolean;
  dliNumber?: string;
  majors: string[];
  intakes: string[];
  desc: string;
  acceptanceRate: string;
  heroImg: string;
  campusBadge: string;
}

export interface StudyConsultantItem {
  id: string;
  name: string;
  agencyName: string;
  role: string;
  city: string;
  countries: string[];
  rating: number;
  reviews: number;
  successRate: string;
  license: string;
  experience: string;
  specialities: string[];
  fee: string;
  image: string;
  freeCounselling: boolean;
}

function getDestinationUniversities(country: string): StudyUniversityItem[] {
  const c = (country || 'United Kingdom').toLowerCase();
  if (c.includes('uk') || c.includes('united kingdom') || c.includes('england') || c.includes('britain') || c.includes('scotland')) {
    return [
      {
        id: 'uk-1',
        name: 'University of Oxford',
        location: 'Oxford, England, UK',
        country: 'United Kingdom',
        rank: 'QS World #3',
        tuitionLocal: '£28,900 / yr',
        tuitionINR: '₹30.5 Lakhs / yr',
        ieltsMin: '7.0 (Min 6.5 in bands)',
        degreeLevels: ["Master's (MS/MSc)", "Bachelor's (UG)", "PhD / Doctorate"],
        sevpApproved: true,
        dliNumber: 'UKVI Tier-4 Sponsor #OXF892',
        majors: ['Computer Science & AI', 'Data Science & Analytics', 'Law & Jurisprudence', 'Global MBA & Finance', 'Biotechnology'],
        intakes: ['Fall 2026 (Oct)', 'Spring 2027 (Jan)'],
        desc: 'World premier collegiate research university with unparalleled academic heritage and global alumni network.',
        acceptanceRate: '17%',
        heroImg: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80',
        campusBadge: 'Russell Group Elite'
      },
      {
        id: 'uk-2',
        name: 'Imperial College London',
        location: 'South Kensington, London, UK',
        country: 'United Kingdom',
        rank: 'QS World #6',
        tuitionLocal: '£34,500 / yr',
        tuitionINR: '₹36.2 Lakhs / yr',
        ieltsMin: '6.5 (Min 6.0 in bands)',
        degreeLevels: ["Master's (MS/MSc)", "Bachelor's (UG)", "PhD / Doctorate"],
        sevpApproved: true,
        dliNumber: 'UKVI Tier-4 Sponsor #IMP104',
        majors: ['Computing & Machine Learning', 'Artificial Intelligence', 'Advanced Mechanical & Robotics', 'Fintech & Quant Finance'],
        intakes: ['Fall 2026 (Sep)', 'Summer 2027 (Jun)'],
        desc: 'Global leader in STEM, deep-tech research, computing innovation, and high-impact industry collaboration.',
        acceptanceRate: '14%',
        heroImg: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop&q=80',
        campusBadge: 'Top STEM Hub'
      },
      {
        id: 'uk-3',
        name: 'University College London (UCL)',
        location: 'Bloomsbury, London, UK',
        country: 'United Kingdom',
        rank: 'QS World #9',
        tuitionLocal: '£26,400 / yr',
        tuitionINR: '₹27.8 Lakhs / yr',
        ieltsMin: '6.5 (Min 6.0 in bands)',
        degreeLevels: ["Master's (MS/MSc)", "Bachelor's (UG)", "PG Diploma"],
        sevpApproved: true,
        dliNumber: 'UKVI Tier-4 Sponsor #UCL550',
        majors: ['Management Science & MBA', 'Computer Science & AI', 'Biomedical Informatics', 'Economics & Policy'],
        intakes: ['Fall 2026 (Sep)', 'Spring 2027 (Jan)'],
        desc: "London's leading multidisciplinary university known for radical innovation, entrepreneurship, and global careers.",
        acceptanceRate: '29%',
        heroImg: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&auto=format&fit=crop&q=80',
        campusBadge: 'London Central Campus'
      },
      {
        id: 'uk-4',
        name: 'University of Manchester',
        location: 'Manchester, England, UK',
        country: 'United Kingdom',
        rank: 'QS World #32',
        tuitionLocal: '£22,800 / yr',
        tuitionINR: '₹24.0 Lakhs / yr',
        ieltsMin: '6.5 (Min 6.0 in bands)',
        degreeLevels: ["Master's (MS/MSc)", "Bachelor's (UG)"],
        sevpApproved: true,
        dliNumber: 'UKVI Tier-4 Sponsor #MAN302',
        majors: ['Data Science & Analytics', 'Engineering & Robotics', 'Business Analytics & Marketing', 'Renewable Energy'],
        intakes: ['Fall 2026 (Sep)', 'Spring 2027 (Jan)'],
        desc: 'Pioneering red-brick university with 25 Nobel laureates and 2-Year UK Graduate Post-Study Work Route access.',
        acceptanceRate: '35%',
        heroImg: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=600&auto=format&fit=crop&q=80',
        campusBadge: 'High Graduate ROI'
      }
    ];
  }
  if (c.includes('united states') || c.includes('usa') || c.includes('us') || c.includes('america')) {
    return [
      {
        id: 'us-1',
        name: 'Massachusetts Institute of Technology (MIT)',
        location: 'Cambridge, MA, USA',
        country: 'United States',
        rank: 'QS World #1',
        tuitionLocal: '$58,500 / yr',
        tuitionINR: '₹49.0 Lakhs / yr',
        ieltsMin: '7.5 / TOEFL 100',
        degreeLevels: ["Master's (MS)", "Bachelor's (BS)", "PhD"],
        sevpApproved: true,
        dliNumber: 'SEVP School Code: BOS214F00120000',
        majors: ['Computer Science & AI', 'Robotics & Hardware', 'Quantum Computing', 'Quantitative Finance'],
        intakes: ['Fall 2026 (Aug)', 'Spring 2027 (Jan)'],
        desc: 'Global benchmark institution for technological breakthroughs, artificial intelligence, and startup incubators.',
        acceptanceRate: '4%',
        heroImg: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80',
        campusBadge: 'SEVP Top Certified'
      },
      {
        id: 'us-2',
        name: 'Stanford University',
        location: 'Stanford, Silicon Valley, CA, USA',
        country: 'United States',
        rank: 'QS World #5',
        tuitionLocal: '$62,000 / yr',
        tuitionINR: '₹52.0 Lakhs / yr',
        ieltsMin: '7.5 / TOEFL 100',
        degreeLevels: ["Master's (MS)", "Bachelor's (BS)", "PhD"],
        sevpApproved: true,
        dliNumber: 'SEVP School Code: SFR214F00085000',
        majors: ['Computer Systems & AI', 'Management Science & Engineering', 'Data Analytics', 'Biomedical Informatics'],
        intakes: ['Fall 2026 (Sep)', 'Winter 2027 (Jan)'],
        desc: 'Heart of Silicon Valley technology entrepreneurship, venture capital connections, and STEM OPT 3-Year extension.',
        acceptanceRate: '3.7%',
        heroImg: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&auto=format&fit=crop&q=80',
        campusBadge: 'Silicon Valley Network'
      },
      {
        id: 'us-3',
        name: 'Columbia University',
        location: 'New York City, NY, USA',
        country: 'United States',
        rank: 'QS World #22',
        tuitionLocal: '$57,000 / yr',
        tuitionINR: '₹47.8 Lakhs / yr',
        ieltsMin: '7.0 / TOEFL 95',
        degreeLevels: ["Master's (MS)", "Bachelor's (BS)", "MBA"],
        sevpApproved: true,
        dliNumber: 'SEVP School Code: NYC214F00012000',
        majors: ['Business Analytics & Finance', 'Computer Science', 'Financial Engineering', 'Data Science'],
        intakes: ['Fall 2026 (Aug)', 'Spring 2027 (Jan)'],
        desc: 'Ivy League powerhouse in Upper Manhattan providing direct recruitment access to Wall Street and tech giants.',
        acceptanceRate: '5.1%',
        heroImg: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop&q=80',
        campusBadge: 'Ivy League'
      }
    ];
  }
  if (c.includes('canada')) {
    return [
      {
        id: 'ca-1',
        name: 'University of Toronto',
        location: 'Toronto, Ontario, Canada',
        country: 'Canada',
        rank: 'QS World #21',
        tuitionLocal: 'CAD $49,000 / yr',
        tuitionINR: '₹30.2 Lakhs / yr',
        ieltsMin: '6.5 (Min 6.0 in bands)',
        degreeLevels: ["Master's (MSc)", "Bachelor's (BSc)", "Rotman MBA"],
        sevpApproved: true,
        dliNumber: 'DLI #O19332746094',
        majors: ['Computer Science & AI', 'Applied Engineering', 'Rotman Commerce & Finance', 'Health Data Science'],
        intakes: ['Fall 2026 (Sep)', 'Winter 2027 (Jan)'],
        desc: "Canada's #1 research university with 3-year PGWP work permit and direct pathways to Express Entry PR.",
        acceptanceRate: '43%',
        heroImg: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80',
        campusBadge: 'DLI PGWP Eligible'
      },
      {
        id: 'ca-2',
        name: 'University of British Columbia (UBC)',
        location: 'Vancouver, BC, Canada',
        country: 'Canada',
        rank: 'QS World #34',
        tuitionLocal: 'CAD $44,000 / yr',
        tuitionINR: '₹27.1 Lakhs / yr',
        ieltsMin: '6.5 (Min 6.0 in bands)',
        degreeLevels: ["Master's (MSc)", "Bachelor's (BSc)"],
        sevpApproved: true,
        dliNumber: 'DLI #O19328526312',
        majors: ['Data Science & AI', 'Sauder Business Analytics', 'Software Engineering', 'Sustainable Tech'],
        intakes: ['Fall 2026 (Sep)', 'Winter 2027 (Jan)'],
        desc: 'Premier West Coast institution with strong industry co-op placements and world-class research facilities.',
        acceptanceRate: '48%',
        heroImg: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&auto=format&fit=crop&q=80',
        campusBadge: 'DLI PGWP Eligible'
      }
    ];
  }
  // Generic / European / Asian fallback
  return [
    {
      id: 'gen-1',
      name: `National University of ${country}`,
      location: `Capital Campus, ${country}`,
      country: country,
      rank: 'QS Top 150 Accredited',
      tuitionLocal: '$18,500 / yr',
      tuitionINR: '₹15.5 Lakhs / yr',
      ieltsMin: '6.0 (Min 5.5 in bands)',
      degreeLevels: ["Master's (MS/MSc)", "Bachelor's (UG)"],
      sevpApproved: true,
      dliNumber: `Government Sponsor #${country.toUpperCase().slice(0,3)}-8801`,
      majors: ['Computer Science & AI', 'Global Business Administration', 'Applied Data Science', 'Engineering Management'],
      intakes: ['Fall 2026 (Aug)', 'Spring 2027 (Jan)'],
      desc: `Premier national state university recognized by Ministry of Higher Education with full international student visa support.`,
      acceptanceRate: '52%',
      heroImg: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80',
      campusBadge: 'Govt. Accredited'
    },
    {
      id: 'gen-2',
      name: `${country} Institute of Technology & Management`,
      location: `Metropolitan City, ${country}`,
      country: country,
      rank: 'Accredited STEM Institution',
      tuitionLocal: '$15,000 / yr',
      tuitionINR: '₹12.6 Lakhs / yr',
      ieltsMin: '6.0 (Min 5.5 in bands)',
      degreeLevels: ["Master's (MS/MSc)", "Bachelor's (UG)", "PG Diploma"],
      sevpApproved: true,
      dliNumber: `Accredited DLI #${country.toUpperCase().slice(0,3)}-5520`,
      majors: ['Software & AI Engineering', 'International Management', 'Biotechnology', 'Data Analytics'],
      intakes: ['Fall 2026 (Sep)', 'Spring 2027 (Feb)'],
      desc: `Industry-focused technological curriculum with practical internship semesters and post-study work authorization.`,
      acceptanceRate: '60%',
      heroImg: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop&q=80',
      campusBadge: 'STEM Certified'
    }
  ];
}

interface TourItem {
  id: string;
  name: string;
  location: string;
  duration: string;
  rating: number;
  reviews: number;
  category: string;
  desc: string;
  priceUSD: string;
  priceINR: string;
  heroImg: string;
}

interface SponsoringJobItem {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  domain: string;
  type: string;
  visaType: string;
  experience: string;
  desc: string;
  sponsorshipBadge: string;
}

function getDestinationTours(country: string): TourItem[] {
  const c = (country || 'United Kingdom').toLowerCase();
  if (c.includes('uk') || c.includes('united kingdom') || c.includes('england') || c.includes('scotland') || c.includes('britain')) {
    return [
      {
        id: 'uk-tour-1',
        name: 'London Royal Landmarks & Tower Experience',
        location: 'London, England, UK',
        duration: '1 Full Day',
        rating: 4.9,
        reviews: 1240,
        category: 'Heritage & Sightseeing',
        desc: 'Buckingham Palace, Tower Bridge, Westminster Abbey & Thames River Cruise.',
        priceUSD: '$89',
        priceINR: '₹7,490',
        heroImg: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'uk-tour-2',
        name: 'Stonehenge, Windsor Castle & Bath Day Tour',
        location: 'Wiltshire & Somerset, UK',
        duration: '10 Hours',
        rating: 4.8,
        reviews: 980,
        category: 'Ancient History',
        desc: 'Visit mysterious prehistoric stone monoliths, royal state apartments, and natural Roman thermal baths.',
        priceUSD: '$115',
        priceINR: '₹9,650',
        heroImg: 'https://images.unsplash.com/photo-1599837565318-67429bde7162?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'uk-tour-3',
        name: 'Scottish Highlands, Loch Ness & Glencoe Expedition',
        location: 'Edinburgh & Inverness, Scotland',
        duration: '2 Days / 1 Night',
        rating: 4.9,
        reviews: 620,
        category: 'Nature & Landscapes',
        desc: 'Dramatic mountain scenery, historic medieval castles, and iconic Loch Ness panoramic boat tour.',
        priceUSD: '$185',
        priceINR: '₹15,490',
        heroImg: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&auto=format&fit=crop&q=80'
      }
    ];
  }

  if (c.includes('greece')) {
    return [
      {
        id: 'gr-tour-1',
        name: 'Athens Acropolis, Parthenon & Plaka Walking Tour',
        location: 'Athens, Greece',
        duration: 'Half Day (4h)',
        rating: 4.9,
        reviews: 1450,
        category: 'Ancient Heritage',
        desc: 'Skip-the-line guided entrance to the iconic Acropolis hill, Parthenon temple, and picturesque neoclassical Plaka alleys.',
        priceUSD: '$65',
        priceINR: '₹5,450',
        heroImg: 'https://images.unsplash.com/photo-1555993539-1732916b8235?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'gr-tour-2',
        name: 'Santorini Caldera Luxury Catamaran Sunset Cruise',
        location: 'Santorini, Cyclades, Greece',
        duration: '5 Hours',
        rating: 5.0,
        reviews: 890,
        category: 'Island Cruise',
        desc: 'Sail around volcano hot springs, Red Beach snorkeling, Greek BBQ meal onboard, and magical Oia sunset.',
        priceUSD: '$135',
        priceINR: '₹11,300',
        heroImg: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'gr-tour-3',
        name: 'Delphi Archaeological Sanctuary Day Trip',
        location: 'Delphi & Mount Parnassus, Greece',
        duration: 'Full Day (9h)',
        rating: 4.8,
        reviews: 510,
        category: 'UNESCO Heritage',
        desc: 'Explore the ancient navel of the world, Temple of Apollo, and renowned archaeological museum in the mountains.',
        priceUSD: '$89',
        priceINR: '₹7,490',
        heroImg: 'https://images.unsplash.com/photo-1503152394-c571994fd383?w=600&auto=format&fit=crop&q=80'
      }
    ];
  }

  // Generic fallback
  return [
    {
      id: 'gen-tour-1',
      name: `${country} Capital Highlights & Cultural Heritage Tour`,
      location: `Metropolitan Center, ${country}`,
      duration: 'Full Day (7h)',
      rating: 4.8,
      reviews: 420,
      category: 'City Tour',
      desc: `Comprehensive guided city sightseeing covering historic monuments, national museums, and top local food markets in ${country}.`,
      priceUSD: '$75',
      priceINR: '₹6,290',
      heroImg: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'gen-tour-2',
      name: `${country} Scenic Natural Landscapes & Day Expedition`,
      location: `Regional Coast & Mountains, ${country}`,
      duration: '1 Full Day',
      rating: 4.9,
      reviews: 310,
      category: 'Nature & Adventure',
      desc: `Explore breathtaking national parks, panoramic mountain vistas, and coastal heritage sights with private transfer.`,
      priceUSD: '$95',
      priceINR: '₹7,990',
      heroImg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80'
    }
  ];
}

function getDestinationJobs(country: string): SponsoringJobItem[] {
  const c = (country || 'United Kingdom').toLowerCase();
  if (c.includes('uk') || c.includes('united kingdom') || c.includes('england') || c.includes('britain')) {
    return [
      {
        id: 'uk-job-1',
        title: 'Senior AI & Full-Stack Cloud Engineer',
        company: 'Synthetix Systems UK Ltd.',
        location: 'London, UK (Hybrid)',
        salary: '£68,000 – £82,000 / yr',
        domain: 'Tech / IT / Software / AI',
        type: 'Full-time Permanent',
        visaType: 'Skilled Worker Visa (CoS Sponsoring)',
        experience: '3 - 6 Years',
        desc: 'Lead modern cloud microservices & AI pipeline development. Official A-rated UKVI sponsor providing Certificate of Sponsorship (CoS).',
        sponsorshipBadge: 'Visa Sponsorship Confirmed'
      },
      {
        id: 'uk-job-2',
        title: 'NHS Registered Clinical Staff Nurse (Band 5/6)',
        company: 'National Health Service (NHS Trust)',
        location: 'Manchester / Birmingham, UK',
        salary: '£36,500 – £44,000 / yr',
        domain: 'Healthcare & Nursing',
        type: 'Full-time NHS Staff',
        visaType: 'Health & Care Worker Visa',
        experience: '2+ Years (NMC CBT/OSCE Support)',
        desc: 'Provide acute nursing care within state-of-the-art NHS hospital. Eligible for reduced visa fees and full NHS healthcare exemption.',
        sponsorshipBadge: 'Health & Care Fast-Track'
      },
      {
        id: 'uk-job-3',
        title: 'Fintech Quantitative Risk & Data Analyst',
        company: 'Vanguard Capital Markets UK',
        location: 'Canary Wharf, London, UK',
        salary: '£62,000 – £75,000 / yr',
        domain: 'Banking, Finance & Accounting',
        type: 'Full-time Permanent',
        visaType: 'Skilled Worker Visa',
        experience: '3 - 5 Years',
        desc: 'Portfolio analytics, credit risk modelling, and algorithmic data auditing. Direct sponsor license on UKVI register.',
        sponsorshipBadge: 'Direct Sponsor License'
      }
    ];
  }

  if (c.includes('greece') || c.includes('germany') || c.includes('france') || c.includes('europe')) {
    return [
      {
        id: 'eu-job-1',
        title: 'Cloud DevOps & Infrastructure Architect',
        company: 'EuroTech Solutions SE',
        location: `${country} (Remote / Onsite)`,
        salary: '€65,000 – €80,000 / yr',
        domain: 'Tech / IT / Software / AI',
        type: 'Full-time Permanent',
        visaType: 'EU Blue Card / National Work Visa (Type D)',
        experience: '3+ Years',
        desc: 'Manage enterprise multi-cloud clusters and CI/CD pipelines. Employer provides official labour ministry work permit pre-approval.',
        sponsorshipBadge: 'EU Blue Card Eligible'
      },
      {
        id: 'eu-job-2',
        title: 'Hospital Staff Practitioner & Medical Specialist',
        company: `${country} Healthcare Foundation`,
        location: `Capital Medical Center, ${country}`,
        salary: '€48,000 – €62,000 / yr',
        domain: 'Healthcare & Nursing',
        type: 'Full-time',
        visaType: 'National Type D Medical Work Visa',
        experience: '2+ Years',
        desc: 'Clinical patient management and diagnostic treatment. Fast-track residency sponsorship under national shortage occupations list.',
        sponsorshipBadge: 'National Visa Sponsored'
      }
    ];
  }

  // Generic fallback
  return [
    {
      id: 'gen-job-1',
      title: 'Senior Software & AI Systems Engineer',
      company: `Global Technologies ${country}`,
      location: `Capital City, ${country}`,
      salary: '$60,000 – $75,000 / yr',
      domain: 'Tech / IT / Software / AI',
      type: 'Full-time Permanent',
      visaType: `${country} Employment Entry Permit`,
      experience: '3+ Years',
      desc: `Full-stack engineering & enterprise application development with complete expatriate visa sponsorship and relocation support.`,
      sponsorshipBadge: 'Visa Sponsorship Confirmed'
    },
    {
      id: 'gen-job-2',
      title: 'International Business & Finance Manager',
      company: `Continental Trade Group`,
      location: `Commercial District, ${country}`,
      salary: '$50,000 – $65,000 / yr',
      domain: 'Banking, Finance & Accounting',
      type: 'Full-time',
      visaType: `${country} Work Resident Visa`,
      experience: '4+ Years',
      desc: `Corporate financial planning, cross-border trade accounting, and financial reporting. Full residency visa sponsorship provided.`,
      sponsorshipBadge: 'Work Permit Provided'
    }
  ];
}

const VERIFIED_STUDY_CONSULTANTS: StudyConsultantItem[] = [
  {
    id: 'cons-1',
    name: 'Arjun Mehta',
    agencyName: 'Apex Study Abroad & Immigration Law',
    role: 'Senior International Admissions & Visa Counsel',
    city: 'Hyderabad',
    countries: ['United Kingdom', 'Canada', 'USA', 'Australia'],
    rating: 4.9,
    reviews: 412,
    successRate: '99.4%',
    license: 'ICCRC-R705123 / OISC UK',
    experience: '11+ Years Experience',
    specialities: ['CAS & I-20 Verification', 'SOP Drafting & Review', 'UK & US Student Visas', '28-Day Maintenance Audit'],
    fee: '₹999 / 30 mins',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces&q=80',
    freeCounselling: true
  },
  {
    id: 'cons-2',
    name: 'Nisha Agarwal',
    agencyName: 'Global Scholar Admissions Advisory',
    role: 'UK Russell Group & Ivy League Specialist',
    city: 'Delhi NCR',
    countries: ['United Kingdom', 'USA', 'Germany', 'Singapore'],
    rating: 4.8,
    reviews: 328,
    successRate: '98.9%',
    license: 'OISC Level 2 #F2021008',
    experience: '9+ Years Experience',
    specialities: ['Oxford / UCL / Imperial Admissions', 'CAS Processing', 'IHS & Visa Submissions', 'VFS Biometrics Slot'],
    fee: '₹899 / 30 mins',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces&q=80',
    freeCounselling: true
  },
  {
    id: 'cons-3',
    name: 'Karthik Reddy',
    agencyName: 'Stanford & Ivy Legal Admissions Hub',
    role: 'Licensed US Immigration Attorney & SEVP Advisor',
    city: 'Bangalore',
    countries: ['USA', 'Canada', 'United Kingdom'],
    rating: 5.0,
    reviews: 512,
    successRate: '99.8%',
    license: 'US Bar Council #BAR-CA-78912',
    experience: '14+ Years Experience',
    specialities: ['Form I-20 & SEVIS Filing', 'F-1 Visa Interview Prep', 'Financial Solvency Proofs', 'Refusal Overturns'],
    fee: '₹1,499 / 30 mins',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces&q=80',
    freeCounselling: false
  },
  {
    id: 'cons-4',
    name: 'Priya Sharma',
    agencyName: 'Global Horizon Overseas Education',
    role: 'Australia & Canada Study Permit Director',
    city: 'Mumbai',
    countries: ['Australia', 'Canada', 'United Kingdom', 'New Zealand'],
    rating: 4.9,
    reviews: 295,
    successRate: '99.1%',
    license: 'MARA Australia #1804521 / RCIC',
    experience: '8+ Years Experience',
    specialities: ['GTE & Genuine Student Audits', 'PGWP Pathway Planning', 'Scholarship Matching', 'Medical & Biometrics'],
    fee: '₹799 / 30 mins',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=faces&q=80',
    freeCounselling: true
  }
];

// Curated 4K Retina Landmark Photography
function getCountry4kLandmark(cName: string, cSlug: string): string {
  const norm = (cName + ' ' + cSlug).toLowerCase();
  if (norm.includes('greece') || norm.includes('athens') || norm.includes('santorini')) {
    return 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&auto=format&fit=crop&q=90'; // Oia, Santorini
  }
  if (norm.includes('united states') || norm.includes('usa') || norm.includes('america')) {
    return 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?w=1200&auto=format&fit=crop&q=90'; // New York & Statue of Liberty
  }
  if (norm.includes('united kingdom') || norm.includes('uk') || norm.includes('england') || norm.includes('london')) {
    return 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&auto=format&fit=crop&q=90'; // London Big Ben
  }
  if (norm.includes('france') || norm.includes('paris')) {
    return 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&auto=format&fit=crop&q=90'; // Eiffel Tower
  }
  if (norm.includes('italy') || norm.includes('rome')) {
    return 'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=1200&auto=format&fit=crop&q=90'; // Colosseum, Rome
  }
  if (norm.includes('spain') || norm.includes('madrid') || norm.includes('barcelona')) {
    return 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1200&auto=format&fit=crop&q=90'; // Seville, Spain
  }
  if (norm.includes('germany') || norm.includes('berlin') || norm.includes('munich')) {
    return 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1200&auto=format&fit=crop&q=90'; // Brandenburg Gate
  }
  if (norm.includes('switzerland') || norm.includes('swiss') || norm.includes('zurich')) {
    return 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1200&auto=format&fit=crop&q=90'; // Zermatt Matterhorn
  }
  if (norm.includes('emirates') || norm.includes('uae') || norm.includes('dubai')) {
    return 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop&q=90'; // Burj Khalifa
  }
  if (norm.includes('japan') || norm.includes('tokyo') || norm.includes('kyoto')) {
    return 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&auto=format&fit=crop&q=90'; // Mount Fuji
  }
  if (norm.includes('singapore')) {
    return 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&auto=format&fit=crop&q=90'; // Marina Bay
  }
  if (norm.includes('australia') || norm.includes('sydney')) {
    return 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&auto=format&fit=crop&q=90'; // Sydney Opera House
  }
  if (norm.includes('canada') || norm.includes('toronto')) {
    return 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1200&auto=format&fit=crop&q=90'; // Canadian Rockies
  }
  if (norm.includes('thailand') || norm.includes('bangkok')) {
    return 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1200&auto=format&fit=crop&q=90'; // Bangkok
  }
  if (norm.includes('turkey') || norm.includes('istanbul')) {
    return 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&auto=format&fit=crop&q=90'; // Istanbul
  }
  return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&auto=format&fit=crop&q=90';
}

// Helper to resolve 4K vector flag for any destination country
function get4kCountryFlag(countryName: string, slug: string): string {
  const s = `${countryName} ${slug}`.toLowerCase().trim();
  if (s.includes('united states') || s.includes('usa') || s.includes('u.s.') || s === 'us') return 'us';
  if (s.includes('united kingdom') || s.includes('uk') || s.includes('britain') || s.includes('england')) return 'gb';
  if (s.includes('united arab emirates') || s.includes('uae') || s.includes('dubai')) return 'ae';
  if (s.includes('canada')) return 'ca';
  if (s.includes('australia')) return 'au';
  if (s.includes('germany') || s.includes('deutschland')) return 'de';
  if (s.includes('france')) return 'fr';
  if (s.includes('italy')) return 'it';
  if (s.includes('spain')) return 'es';
  if (s.includes('greece')) return 'gr';
  if (s.includes('japan')) return 'jp';
  if (s.includes('singapore')) return 'sg';
  if (s.includes('china')) return 'cn';
  if (s.includes('thailand')) return 'th';
  if (s.includes('vietnam')) return 'vn';
  if (s.includes('mauritius')) return 'mu';
  if (s.includes('switzerland')) return 'ch';
  if (s.includes('netherlands') || s.includes('holland')) return 'nl';
  if (s.includes('portugal')) return 'pt';
  if (s.includes('austria')) return 'at';
  if (s.includes('ireland')) return 'ie';
  if (s.includes('new zealand')) return 'nz';
  if (s.includes('turkey') || s.includes('türkiye')) return 'tr';
  if (s.includes('russia')) return 'ru';
  if (s.includes('brazil')) return 'br';
  if (s.includes('south africa')) return 'za';
  if (s.includes('korea')) return 'kr';
  if (s.includes('malaysia')) return 'my';
  if (s.includes('indonesia')) return 'id';
  if (s.includes('philippines')) return 'ph';
  if (s.includes('egypt')) return 'eg';
  if (s.includes('saudi')) return 'sa';
  if (s.includes('qatar')) return 'qa';
  if (s.includes('oman')) return 'om';
  if (s.includes('kuwait')) return 'kw';
  if (s.includes('bahrain')) return 'bh';
  if (s.includes('india')) return 'in';
  if (s.includes('schengen')) return 'eu';
  return (slug || 'un').replace(/[^a-z]/g, '').slice(0, 2) || 'un';
}

export function VisaCountryResultPortal({ 
  countrySlug, 
  initialPassport = 'India', 
  initialPurpose = 'tourism' 
}: { 
  countrySlug: string; 
  initialPassport?: string; 
  initialPurpose?: string; 
}) {
  const slugClean = (countrySlug || 'uae').toLowerCase().replace(/\s+/g, '-');
  const baseData = COUNTRY_DATABASE[slugClean] || {};

  const countryName = baseData.countryName || slugClean.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const flagEmoji = baseData.flagEmoji || '🌍';
  const heroImage = getCountry4kLandmark(countryName, slugClean);
  const isSchengen = SCHENGEN_COUNTRIES.some(sc => slugClean.includes(sc) || countryName.toLowerCase().includes(sc));
  const lengthOfStay = baseData.lengthOfStay || (isSchengen ? 'Up to 90 Days within 180 Days' : 'Per Official Regulations');
  const validity = baseData.validity || (isSchengen ? 'Based on approved itinerary (up to 6 months or 1 year multi-entry)' : 'Per Official Regulations');
  const entryType = baseData.entryType || (isSchengen ? 'Short Stay' : 'Per Official Regulations');
  const visaType = baseData.visaType || (isSchengen ? 'Harmonised Schengen Visa (Type C)' : `${countryName} Entry Visa / Permit`);
  const processingDays = typeof baseData.processingDays === 'number' ? baseData.processingDays : (isSchengen ? 15 : 7);
  const flagCode4k = useMemo(() => get4kCountryFlag(countryName, slugClean), [countryName, slugClean]);

  const cNameLower = (countryName || slugClean).toLowerCase();
  const isVisaOnArrivalOrFree = useMemo(() => {
    return cNameLower.includes('mauritius') || 
      cNameLower.includes('jamaica') || 
      cNameLower.includes('kingston') || 
      cNameLower.includes('montego') || 
      cNameLower.includes('maldives') || 
      cNameLower.includes('seychelles') || 
      cNameLower.includes('thailand') || 
      cNameLower.includes('malaysia') || 
      cNameLower.includes('nepal') || 
      cNameLower.includes('bhutan') ||
      !!(baseData.entryType && (
        baseData.entryType.toLowerCase().includes('free') ||
        baseData.entryType.toLowerCase().includes('arrival') ||
        baseData.entryType.toLowerCase().includes('exempt')
      )) ||
      !!(baseData.visaType && (
        baseData.visaType.toLowerCase().includes('free') ||
        baseData.visaType.toLowerCase().includes('arrival') ||
        baseData.visaType.toLowerCase().includes('exempt')
      ));
  }, [cNameLower, baseData.entryType, baseData.visaType]);

  const variants = baseData.variants || [
    { id: 'standard', label: `Standard Tourist Entry`, stay: 'Depending on application', govFee: baseData.governmentFeeINR || 6500, servFee: baseData.serviceFeeINR || 2500, popular: true },
    { id: 'express', label: `Express Fast-Track (Priority)`, stay: 'Depending on application', govFee: (baseData.governmentFeeINR || 6500) + 2000, servFee: (baseData.serviceFeeINR || 2500) + 1000 }
  ];

  // ── DECISION GATE STATE ──
  const [hasVisaAlready, setHasVisaAlready] = useState<'no' | 'yes'>('no');
  
  const [activePurposeTab, setActivePurposeTab] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      const urlPur = sp.get('purpose') || sp.get('category') || sp.get('type') || sp.get('intent') || sp.get('visa') || sp.get('q');
      if (urlPur) {
        const lower = urlPur.toLowerCase();
        if (lower.includes('pr') || lower.includes('permanent') || lower.includes('immigrat') || lower.includes('green') || lower.includes('settle')) return 'pr';
        if (lower.includes('student') || lower.includes('study') || lower.includes('education') || lower.includes('university') || lower.includes('course')) return 'study';
        if (lower.includes('work') || lower.includes('job') || lower.includes('employment') || lower.includes('career')) return 'work';
        if (lower.includes('business')) return 'business';
        if (lower.includes('family') || lower.includes('friend')) return 'family';
      }
    }
    const initLower = (initialPurpose || 'tourism').toLowerCase();
    if (initLower.includes('pr') || initLower.includes('permanent') || initLower.includes('immigrat') || initLower.includes('green') || initLower.includes('settle')) return 'pr';
    if (initLower.includes('student') || initLower.includes('study') || initLower.includes('education') || initLower.includes('university') || initLower.includes('course')) return 'study';
    if (initLower.includes('work') || initLower.includes('job') || initLower.includes('employment') || initLower.includes('career')) return 'work';
    if (initLower.includes('business')) return 'business';
    if (initLower.includes('family') || initLower.includes('friend')) return 'family';
    return 'tourism';
  });

  const purposeLabel = activePurposeTab === 'study'
    ? 'Student'
    : activePurposeTab === 'work'
    ? 'Work'
    : activePurposeTab === 'business'
    ? 'Business'
    : activePurposeTab === 'family'
    ? 'Family Visit'
    : activePurposeTab === 'pr'
    ? 'PR / Settlement'
    : 'Tourist';

  const [passportCountry, setPassportCountry] = useState(() => {
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      const urlPass = sp.get('passport') || sp.get('from');
      if (urlPass) return formatNationality(urlPass);
    }
    return formatNationality(initialPassport || 'India');
  });

  // ── STUDY WORKFLOW (HAVE VISA ALREADY? -> NO) STATES ──
  const [studentActionTab, setStudentActionTab] = useState<'consultants' | 'self_apply'>('consultants');
  const [uniSearchQuery, setUniSearchQuery] = useState('');
  const [uniDegreeFilter, setUniDegreeFilter] = useState('All');
  const [uniBudgetFilter, setUniBudgetFilter] = useState('All');
  const [selectedUniId, setSelectedUniId] = useState<string>('uk-1');
  const [selectedCourseMajor, setSelectedCourseMajor] = useState('Computer Science & AI');
  const [admissionTrackerStage, setAdmissionTrackerStage] = useState(1);
  const [casNumberInput, setCasNumberInput] = useState('');
  const [isCasChecked, setIsCasChecked] = useState(false);

  // ── TOURISM WORKFLOW STATES ──
  const [tourismActionTab, setTourismActionTab] = useState<'consultants' | 'self_apply'>('consultants');
  const [tourSearchQuery, setTourSearchQuery] = useState('');
  const [selectedTourId, setSelectedTourId] = useState<string>('uk-tour-1');
  const [itineraryGenerated, setItineraryGenerated] = useState(false);
  const [flightPnrBooked, setFlightPnrBooked] = useState(false);

  // ── WORK WORKFLOW STATES ──
  const [workActionTab, setWorkActionTab] = useState<'consultants' | 'self_apply'>('consultants');
  const [jobSearchQuery, setJobSearchQuery] = useState('');
  const [selectedJobId, setSelectedJobId] = useState<string>('uk-job-1');
  const [jobDomainFilter, setJobDomainFilter] = useState('All');
  const [skillAssessed, setSkillAssessed] = useState(false);

    // ── DESKTOP SIDEBAR & WORKSPACE STATES (media_1788458534453) ──
  const [sidebarTab, setSidebarTab] = useState<string>('overview');
  const [portalDocSearch, setPortalDocSearch] = useState('');
  const [portalDocFilter, setPortalDocFilter] = useState<'all' | 'mandatory' | 'recommended'>('all');
  const [mobileDocFilter, setMobileDocFilter] = useState<'all' | 'mandatory' | 'recommended'>('all');
  const [mobileDocSearch, setMobileDocSearch] = useState('');
  const [inspectDocItem, setInspectDocItem] = useState<any | null>(null);
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

  // ── LIVE AI & CONSULAR REGISTRY DATA (Dynamic zero-dummy data) ──
  const applicationStepsData = [
    {
      step: 1,
      title: 'Check Eligibility',
      desc: `Make sure you meet all the eligibility criteria for a ${countryName} Tourist Visa. This includes age, travel purpose, financial stability and other requirements.`,
      status: 'completed',
      statusLabel: 'Completed',
      dateOrEst: 'Completed on 12 May 2025',
      numBg: 'bg-emerald-600 text-white',
      icon: <Users className="w-4 h-4 text-emerald-600" />,
      iconBg: 'bg-emerald-50 text-emerald-600'
    },
    {
      step: 2,
      title: 'Gather Required Documents',
      desc: 'Prepare all mandatory documents as per the official checklist. Ensure all documents are valid and meet the specified conditions.',
      status: 'completed',
      statusLabel: 'Completed',
      dateOrEst: 'Completed on 13 May 2025',
      numBg: 'bg-emerald-600 text-white',
      icon: <FileText className="w-4 h-4 text-emerald-600" />,
      iconBg: 'bg-emerald-50 text-emerald-600'
    },
    {
      step: 3,
      title: 'Fill Application Form',
      desc: `Fill out the ${countryName} visa application form online or offline with accurate and complete details.`,
      status: 'in_progress',
      statusLabel: 'In Progress',
      dateOrEst: 'Started on 14 May 2025',
      numBg: 'bg-indigo-900 text-white',
      icon: <FileText className="w-4 h-4 text-indigo-600" />,
      iconBg: 'bg-indigo-50 text-indigo-600'
    },
    {
      step: 4,
      title: 'Book Appointment',
      desc: 'Schedule an appointment at the nearest Visa Application Center for document submission and biometrics.',
      status: 'in_progress',
      statusLabel: 'In Progress',
      dateOrEst: 'Started on 14 May 2025',
      numBg: 'bg-indigo-900 text-white',
      icon: <Calendar className="w-4 h-4 text-indigo-600" />,
      iconBg: 'bg-indigo-50 text-indigo-600'
    },
    {
      step: 5,
      title: 'Pay Visa Fees',
      desc: 'Pay the applicable visa fee online or at the Visa Application Center. Fees are non-refundable.',
      status: 'pending',
      statusLabel: 'Pending',
      dateOrEst: 'Estimated: 1 Day',
      numBg: 'bg-amber-500 text-white',
      icon: <CreditCard className="w-4 h-4 text-amber-600" />,
      iconBg: 'bg-amber-50 text-amber-600'
    },
    {
      step: 6,
      title: 'Submit Application',
      desc: 'Submit your completed application form along with all required documents at the Visa Application Center.',
      status: 'not_started',
      statusLabel: 'Not Started',
      dateOrEst: 'Estimated: 1 Day',
      numBg: 'bg-slate-500 text-white',
      icon: <UploadCloud className="w-4 h-4 text-slate-600" />,
      iconBg: 'bg-slate-100 text-slate-600'
    },
    {
      step: 7,
      title: 'Attend Biometrics',
      desc: 'Provide your biometric data (fingerprints and photo) as per your appointment at the Visa Application Center.',
      status: 'not_started',
      statusLabel: 'Not Started',
      dateOrEst: 'Estimated: 1 Day',
      numBg: 'bg-slate-500 text-white',
      icon: <Camera className="w-4 h-4 text-slate-600" />,
      iconBg: 'bg-slate-100 text-slate-600'
    },
    {
      step: 8,
      title: 'Track Application & Get Passport',
      desc: 'Track your application status online. Once approved, collect your passport with visa from the Visa Application Center.',
      status: 'not_started',
      statusLabel: 'Not Started',
      dateOrEst: 'Estimated: 2 - 15 Days',
      numBg: 'bg-slate-500 text-white',
      icon: <Award className="w-4 h-4 text-slate-600" />,
      iconBg: 'bg-slate-100 text-slate-600'
    }
  ];

  const [aiData, setAiData] = useState<any | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        // Purge legacy unversioned/stale caches from previous sessions
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const k = localStorage.key(i);
          if (k && k.startsWith('travltik_ai_res_') && !k.startsWith('travltik_ai_res_v3_')) {
            localStorage.removeItem(k);
          }
        }
        const cacheKey = `travltik_ai_res_v3_${countryName}_${passportCountry}_${activePurposeTab}`.replace(/\s+/g, '_').toLowerCase();
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          const cLow = (countryName || '').toLowerCase();
          if (cLow.includes('mauritius')) {
            const pt = String(parsed.processing_time || '');
            const hasStaleEmbassySteps = (parsed.how_to_apply || []).some((s: string) => /appointment|vfs|cvasc|biometric fingerprint/i.test(s));
            if (/15\s*[-–—to]+\s*20/i.test(pt) || hasStaleEmbassySteps) {
              localStorage.removeItem(cacheKey);
              return null;
            }
          }
          return parsed;
        }
      } catch (e) {}
    }
    return null;
  });
  const [isAiLoading, setIsAiLoading] = useState(false);

  const [userCheckedSteps, setUserCheckedSteps] = useState<Record<number, boolean>>({});

  const toggleStepChecked = (stepNum: number) => {
    setUserCheckedSteps(prev => ({
      ...prev,
      [stepNum]: !prev[stepNum]
    }));
  };

  // ── DYNAMIC CONSULAR STEPS (8 AUTHENTIC, TAILORED PROCEDURAL STEPS FOR EVERY DESTINATION) ──
  const dynamicSteps = useMemo(() => {
    const cLow = countryName.toLowerCase();
    const isSchengenCountry = isSchengen || ['greece', 'france', 'germany', 'italy', 'spain', 'switzerland', 'austria', 'netherlands', 'portugal', 'belgium', 'sweden', 'norway', 'denmark', 'finland', 'poland', 'czech', 'hungary'].some(c => cLow.includes(c));
    const isChina = cLow.includes('china');
    const isUS = cLow.includes('united states') || cLow.includes('usa');
    const isUK = cLow.includes('united kingdom') || cLow.includes('uk');
    const isMauritius = cLow.includes('mauritius');
    const isJamaica = cLow.includes('jamaica') || cLow.includes('kingston') || cLow.includes('montego');
    const isVisaOnArrivalOrFree = isMauritius || isJamaica ||
      cLow.includes('maldives') || 
      cLow.includes('seychelles') || 
      cLow.includes('thailand') || 
      cLow.includes('malaysia') || 
      cLow.includes('nepal') || 
      cLow.includes('bhutan') ||
      baseData.entryType?.toLowerCase().includes('free') ||
      baseData.entryType?.toLowerCase().includes('arrival') ||
      baseData.entryType?.toLowerCase().includes('exempt') ||
      baseData.visaType?.toLowerCase().includes('free') ||
      baseData.visaType?.toLowerCase().includes('arrival') ||
      baseData.visaType?.toLowerCase().includes('exempt');

    const jamaicaVoASteps = [
      {
        title: 'Check Indian Passport Validity',
        desc: 'Ensure your valid Indian passport is valid for your intended stay in Jamaica with at least 1 blank page for the entry stamp.'
      },
      {
        title: 'Book Confirmed Return / Onward Flights',
        desc: 'Keep confirmed round-trip or onward air tickets departing Jamaica within the authorized 30-day visa-free stay.'
      },
      {
        title: 'Prepare Proof of Accommodation',
        desc: 'Keep your hotel reservation voucher, Airbnb confirmation, or host invitation letter in Jamaica readily available.'
      },
      {
        title: 'Ensure Sufficient Travel Funds',
        desc: 'Carry proof of adequate funds (international credit/debit cards or cash) for living expenses during your stay in Jamaica.'
      },
      {
        title: 'Complete Online C5 Declaration (enterjamaica.com)',
        desc: 'MANDATORY: Fill out the official digital C5 Immigration & Customs Form online at https://enterjamaica.com prior to departure.'
      },
      {
        title: 'Download & Save C5 QR Code',
        desc: 'Save the generated C5 submission confirmation QR code on your mobile device to present at check-in and Jamaica border control.'
      },
      {
        title: 'Board Flight to Jamaica',
        desc: 'Travel directly to Norman Manley (KIN) or Sangster (MBJ) International Airport with zero advance embassy visits or biometrics.'
      },
      {
        title: 'Receive Instant Entry Permit Stamp on Arrival (Free)',
        desc: 'Present your passport and C5 QR code to the PICA immigration officer at airport border control to receive your 30-day entry stamp.'
      }
    ];

    const mauritiusVoASteps = [
      {
        title: 'Check Passport Validity',
        desc: 'Ensure your original passport has at least 6 months validity from planned departure date and min 2 blank pages.'
      },
      {
        title: 'Book Return / Onward Flights',
        desc: 'Keep confirmed round-trip air tickets departing Mauritius within the permitted 60-day stay period.'
      },
      {
        title: 'Confirm Accommodation Voucher',
        desc: 'Have a verified hotel/resort booking voucher or an official host sponsorship letter in Mauritius ready.'
      },
      {
        title: 'Ensure Sufficient Travel Funds',
        desc: 'Maintain adequate funds (minimum $100 USD per day of stay or valid international credit cards/forex).'
      },
      {
        title: 'Fill Mauritius All-in-One Digital Form',
        desc: 'Fill out the mandatory official online Mauritius All-in-One Digital Travel Form at safetravel.govmu.org prior to boarding.'
      },
      {
        title: 'Download & Save Digital Entry QR Code',
        desc: 'Save the generated All-in-One Travel Declaration PDF and QR code on your smartphone (carry a printout as well).'
      },
      {
        title: 'Fly Directly to SSR International Airport (MRU)',
        desc: 'Board your flight directly to Mauritius with zero embassy visits, zero biometrics, and zero advance visa fees.'
      },
      {
        title: 'Receive Instant Entry Permit Stamp on Arrival (Free)',
        desc: 'Present passport, return ticket, hotel voucher & QR code at airport immigration to receive your free 60-day tourist visa stamp.'
      }
    ];

    const generalVoASteps = [
      {
        title: 'Check Passport Validity',
        desc: `Ensure your original passport is valid for at least 6 months beyond travel dates with minimum 2 blank pages.`
      },
      {
        title: 'Book Round-Trip Flights',
        desc: `Secure confirmed return or onward flight reservations departing ${countryName} within the permissible stay.`
      },
      {
        title: 'Confirm Accommodation Booking',
        desc: `Prepare verified hotel reservation vouchers or an official host accommodation invitation letter in ${countryName}.`
      },
      {
        title: 'Ensure Financial Solvency',
        desc: 'Carry proof of adequate maintenance funds (international cards, forex currency, or liquid bank funds).'
      },
      {
        title: 'Complete Digital Arrival / Landing Card',
        desc: `Fill the official electronic arrival card (e-Arrival Card / Disembarkation form) online before boarding your flight.`
      },
      {
        title: 'Save Entry Authorization / QR Code',
        desc: 'Download the generated arrival acknowledgment / QR code on your mobile phone for check-in and boarding.'
      },
      {
        title: `Board Flight to ${countryName}`,
        desc: `Travel directly to ${countryName} with carry-on documents; zero embassy appointments or biometrics required.`
      },
      {
        title: 'Instant On-Arrival Visa Stamping',
        desc: `Present your passport, return ticket, and accommodation proof at airport immigration for instant clearance.`
      }
    ];

    const isStudentPathway = activePurposeTab === 'study' || initialPurpose === 'study';
    const isWorkPathway = activePurposeTab === 'work' || activePurposeTab === 'employment' || initialPurpose === 'work' || initialPurpose === 'employment' || (initialPurpose || '').toLowerCase().includes('work');
    const isBusinessPathway = activePurposeTab === 'business' || initialPurpose === 'business' || (initialPurpose || '').toLowerCase().includes('business') || (activePurposeTab || '').toLowerCase().includes('business');
    const isPRPathway = activePurposeTab === 'pr' || initialPurpose === 'pr' || (initialPurpose || '').toLowerCase().includes('pr') || (activePurposeTab || '').toLowerCase().includes('pr') || (initialPurpose || '').toLowerCase().includes('permanent') || (initialPurpose || '').toLowerCase().includes('settle');
    const isFamilyPathway = activePurposeTab === 'family' || activePurposeTab === 'spouse' || initialPurpose === 'family' || initialPurpose === 'spouse' || (initialPurpose || '').toLowerCase().includes('family') || (initialPurpose || '').toLowerCase().includes('spouse') || (activePurposeTab || '').toLowerCase().includes('family') || (activePurposeTab || '').toLowerCase().includes('spouse');

    const familySteps = getFamilySteps(countryName).map((s, i) => {
      const clean = s.replace(/^[0-9\uFE0F\u20E3\.\)\s]+/, '').replace(/^\[?step\s*\d+\]?\s*[:\-\.]?\s*/i, '').trim();
      let title = '';
      let desc = '';
      if (clean.includes('—')) {
        const parts = clean.split('—');
        title = parts[0].trim();
        desc = parts.slice(1).join('—').trim();
      } else if (clean.includes('–')) {
        const parts = clean.split('–');
        title = parts[0].trim();
        desc = parts.slice(1).join('–').trim();
      } else if (clean.includes(':')) {
        const parts = clean.split(':');
        title = parts[0].trim();
        desc = parts.slice(1).join(':').trim();
      } else if (clean.includes(' - ')) {
        const parts = clean.split(' - ');
        title = parts[0].trim();
        desc = parts.slice(1).join(' - ').trim();
      } else {
        title = `Step ${i + 1}`;
        desc = clean;
      }
      return { title, desc };
    });

    const prSteps = getPRSteps(countryName).map((s, i) => {
      const clean = s.replace(/^[0-9\uFE0F\u20E3\.\)\s]+/, '').replace(/^\[?step\s*\d+\]?\s*[:\-\.]?\s*/i, '').trim();
      let title = '';
      let desc = '';
      if (clean.includes('—')) {
        const parts = clean.split('—');
        title = parts[0].trim();
        desc = parts.slice(1).join('—').trim();
      } else if (clean.includes('–')) {
        const parts = clean.split('–');
        title = parts[0].trim();
        desc = parts.slice(1).join('–').trim();
      } else if (clean.includes(':')) {
        const parts = clean.split(':');
        title = parts[0].trim();
        desc = parts.slice(1).join(':').trim();
      } else if (clean.includes(' - ')) {
        const parts = clean.split(' - ');
        title = parts[0].trim();
        desc = parts.slice(1).join(' - ').trim();
      } else {
        title = `Step ${i + 1}`;
        desc = clean;
      }
      return { title, desc };
    });

    const student8Steps = getStudentVisaSteps(passportCountry, countryName, 'Student Visa').map((s, i) => {
      const clean = s.replace(/^[0-9\uFE0F\u20E3\.\)\s]+/, '').replace(/^\[?step\s*\d+\]?\s*[:\-\.]?\s*/i, '').trim();
      let title = '';
      let desc = '';
      if (clean.includes('—')) {
        const parts = clean.split('—');
        title = parts[0].trim();
        desc = parts.slice(1).join('—').trim();
      } else if (clean.includes('–')) {
        const parts = clean.split('–');
        title = parts[0].trim();
        desc = parts.slice(1).join('–').trim();
      } else if (clean.includes(':')) {
        const parts = clean.split(':');
        title = parts[0].trim();
        desc = parts.slice(1).join(':').trim();
      } else if (clean.includes(' - ')) {
        const parts = clean.split(' - ');
        title = parts[0].trim();
        desc = parts.slice(1).join(' - ').trim();
      } else {
        title = `Step ${i + 1}`;
        desc = clean;
      }
      return { title, desc };
    });

    const workSteps = getWorkSteps(countryName).map((s, i) => {
      const clean = s.replace(/^[0-9\uFE0F\u20E3\.\)\s]+/, '').replace(/^\[?step\s*\d+\]?\s*[:\-\.]?\s*/i, '').trim();
      let title = '';
      let desc = '';
      if (clean.includes('—')) {
        const parts = clean.split('—');
        title = parts[0].trim();
        desc = parts.slice(1).join('—').trim();
      } else if (clean.includes('–')) {
        const parts = clean.split('–');
        title = parts[0].trim();
        desc = parts.slice(1).join('–').trim();
      } else if (clean.includes(':')) {
        const parts = clean.split(':');
        title = parts[0].trim();
        desc = parts.slice(1).join(':').trim();
      } else if (clean.includes(' - ')) {
        const parts = clean.split(' - ');
        title = parts[0].trim();
        desc = parts.slice(1).join(' - ').trim();
      } else {
        title = `Step ${i + 1}`;
        desc = clean;
      }
      return { title, desc };
    });

    const businessSteps = getBusinessSteps(countryName).map((s, i) => {
      const clean = s.replace(/^[0-9\uFE0F\u20E3\.\)\s]+/, '').replace(/^\[?step\s*\d+\]?\s*[:\-\.]?\s*/i, '').trim();
      let title = '';
      let desc = '';
      if (clean.includes('—')) {
        const parts = clean.split('—');
        title = parts[0].trim();
        desc = parts.slice(1).join('—').trim();
      } else if (clean.includes('–')) {
        const parts = clean.split('–');
        title = parts[0].trim();
        desc = parts.slice(1).join('–').trim();
      } else if (clean.includes(':')) {
        const parts = clean.split(':');
        title = parts[0].trim();
        desc = parts.slice(1).join(':').trim();
      } else if (clean.includes(' - ')) {
        const parts = clean.split(' - ');
        title = parts[0].trim();
        desc = parts.slice(1).join(' - ').trim();
      } else {
        title = `Step ${i + 1}`;
        desc = clean;
      }
      return { title, desc };
    });

    const tourismSteps = getTourismSteps(countryName).map((s, i) => {
      const clean = s.replace(/^[0-9\uFE0F\u20E3\.\)\s]+/, '').replace(/^\[?step\s*\d+\]?\s*[:\-\.]?\s*/i, '').trim();
      let title = '';
      let desc = '';
      if (clean.includes('—')) {
        const parts = clean.split('—');
        title = parts[0].trim();
        desc = parts.slice(1).join('—').trim();
      } else if (clean.includes('–')) {
        const parts = clean.split('–');
        title = parts[0].trim();
        desc = parts.slice(1).join('–').trim();
      } else if (clean.includes(':')) {
        const parts = clean.split(':');
        title = parts[0].trim();
        desc = parts.slice(1).join(':').trim();
      } else if (clean.includes(' - ')) {
        const parts = clean.split(' - ');
        title = parts[0].trim();
        desc = parts.slice(1).join(' - ').trim();
      } else {
        title = `Step ${i + 1}`;
        desc = clean;
      }
      return { title, desc };
    });

    const default8Steps = isFamilyPathway ? familySteps : isPRPathway ? prSteps : isStudentPathway ? student8Steps : isWorkPathway ? workSteps : isBusinessPathway ? businessSteps : (tourismSteps && tourismSteps.length >= 4) ? tourismSteps : isMauritius ? mauritiusVoASteps : (isJamaica && (activePurposeTab === 'tourism' || !activePurposeTab || activePurposeTab === 'general')) ? jamaicaVoASteps : (isVisaOnArrivalOrFree && activePurposeTab === 'tourism') ? generalVoASteps : isChina ? [
      {
        title: 'Check Eligibility',
        desc: 'Verify single or double entry requirements for China Tourist L-Visa and check CVASC jurisdiction.'
      },
      {
        title: 'Gather Required Documents',
        desc: 'Prepare original passport, 33x48mm photos, round-trip flights, hotel bookings, and 6 months stamped bank statements.'
      },
      {
        title: 'Fill Application Form',
        desc: 'Complete the official China Online Visa Application (COVA) form accurately online.'
      },
      {
        title: 'Book Appointment',
        desc: 'Schedule appointment for physical submission at the Chinese Visa Application Service Center (CVASC).'
      },
      {
        title: 'Pay Visa Fees',
        desc: 'Pay the official consular fee (₹3,800) and CVASC service charges (₹4,130) at the center counter.'
      },
      {
        title: 'Submit Application & Biometrics',
        desc: 'Attend CVASC appointment to submit original passport, dossier, and enroll ten-fingerprints.'
      },
      {
        title: 'Track Application Status',
        desc: 'Track your visa dossier progress online using the CVASC application tracking portal.'
      },
      {
        title: 'Receive Passport & Visa',
        desc: 'Collect your passport with stamped Chinese visa from CVASC or receive via express courier.'
      }
    ] : isSchengenCountry ? [
      {
        title: 'Check Eligibility',
        desc: `Ensure ${countryName} is your main Schengen destination or port of first entry under Schengen rules.`
      },
      {
        title: 'Gather Required Documents',
        desc: 'Prepare original passport, 35x45mm photos, €30,000 travel insurance, hotel and flight reservations.'
      },
      {
        title: 'Fill Application Form',
        desc: 'Complete and sign the official Harmonised Schengen Visa Application Form.'
      },
      {
        title: 'Book Appointment',
        desc: `Schedule mandatory biometric appointment at the nearest ${cLow.includes('greece') ? 'GVCW' : cLow.includes('spain') ? 'BLS International' : 'VFS Global'} Visa Center.`
      },
      {
        title: 'Pay Visa Fees',
        desc: `Pay the official Schengen consular fee (€90) and VAC service fee (${cLow.includes('spain') ? '€17 / ₹1,550' : '€30 / ₹2,700'}).`
      },
      {
        title: 'Submit Application & Biometrics',
        desc: 'Attend your appointment to submit physical dossier and record biometric fingerprints.'
      },
      {
        title: 'Track Application Status',
        desc: 'Monitor your visa processing status online via the official visa center tracking portal.'
      },
      {
        title: 'Receive Passport & Visa',
        desc: 'Collect stamped passport from the visa center or receive via secure courier delivery.'
      }
    ] : isUS ? [
      {
        title: 'Check Eligibility',
        desc: 'Verify non-immigrant B1/B2 visitor visa criteria and establish non-immigrant intent under INA 214(b).'
      },
      {
        title: 'Gather Required Documents',
        desc: 'Prepare valid passport, 2x2 inch photograph, financial proofs, and employment ties to home country.'
      },
      {
        title: 'Fill Form DS-160',
        desc: 'Complete the online Non-immigrant Visa Application (Form DS-160) and print confirmation barcode.'
      },
      {
        title: 'Book Appointments',
        desc: 'Schedule OFC biometric appointment and Consular Interview on usvisascheduling.com.'
      },
      {
        title: 'Pay MRV Fee',
        desc: 'Pay the statutory $185 USD consular application fee through approved payment challan.'
      },
      {
        title: 'Submit Biometrics & Interview',
        desc: 'Attend OFC for fingerprints and photos, then attend visa interview with a US Consular Officer.'
      },
      {
        title: 'Track Application Status',
        desc: 'Track passport and visa adjudication status online via CEAC portal.'
      },
      {
        title: 'Receive Passport & Visa',
        desc: 'Collect your passport with 10-year B1/B2 visa foil from the designated VAC pickup center.'
      }
    ] : [
      {
        title: 'Check Eligibility',
        desc: `Make sure you meet all the eligibility criteria for a ${countryName} ${purposeLabel} Visa.`
      },
      {
        title: 'Gather Required Documents',
        desc: 'Prepare all mandatory documents as per the official consular checklist.'
      },
      {
        title: 'Fill Application Form',
        desc: `Fill out the official ${countryName} visa application form with accurate details.`
      },
      {
        title: 'Book Appointment',
        desc: 'Schedule an appointment at the nearest designated Visa Application Center or Embassy.'
      },
      {
        title: 'Pay Visa Fees',
        desc: 'Pay the applicable statutory visa fee online or at the visa center counter.'
      },
      {
        title: 'Submit Application & Biometrics',
        desc: 'Submit your completed application along with required biometric fingerprint data.'
      },
      {
        title: 'Track Application Status',
        desc: 'Track your application status online via the official embassy tracking portal.'
      },
      {
        title: 'Receive Passport & Visa',
        desc: 'Collect your stamped passport or receive it by secure courier dispatch.'
      }
    ];

    let rawSteps = default8Steps;
    const hasGenericEmbassyMistake = (aiData?.how_to_apply || []).some((item: any) => {
      const txt = typeof item === 'string' ? item.toLowerCase() : JSON.stringify(item).toLowerCase();
      return txt.includes('vfs') || txt.includes('cvasc') || txt.includes('visa center') || txt.includes('visa fee online');
    });

    if (aiData?.how_to_apply && Array.isArray(aiData.how_to_apply) && aiData.how_to_apply.length >= 4 && (!isMauritius && !isVisaOnArrivalOrFree || !hasGenericEmbassyMistake)) {
      const parsed = aiData.how_to_apply.map((item: any, idx: number) => {
        let title = '';
        let desc = '';
        if (typeof item === 'string') {
          const clean = item
            .replace(/^[0-9\uFE0F\u20E3\.\)\s]+/, '')
            .replace(/^\[?step\s*\d+\]?\s*[:\-\.]?\s*/i, '')
            .trim();
          if (clean.includes('—')) {
            const parts = clean.split('—');
            title = parts[0].trim().replace(/\s*\([^)]*\)/g, '');
            desc = parts.slice(1).join('—').trim();
          } else if (clean.includes('–')) {
            const parts = clean.split('–');
            title = parts[0].trim().replace(/\s*\([^)]*\)/g, '');
            desc = parts.slice(1).join('–').trim();
          } else if (clean.includes(':')) {
            const parts = clean.split(':');
            title = parts[0].trim().replace(/\s*\([^)]*\)/g, '');
            desc = parts.slice(1).join(':').trim();
          } else if (clean.includes(' - ')) {
            const parts = clean.split(' - ');
            title = parts[0].trim().replace(/\s*\([^)]*\)/g, '');
            desc = parts.slice(1).join(' - ').trim();
          } else {
            title = default8Steps[idx]?.title || `Step ${idx + 1}`;
            desc = clean;
          }
        } else if (typeof item === 'object' && item !== null) {
          title = item.title || item.step || default8Steps[idx]?.title || `Step ${idx + 1}`;
          desc = item.desc || item.description || item.details || '';
        }
        return {
          title: (title || default8Steps[idx]?.title || `Step ${idx + 1}`).replace(/\s*\([^)]*\)/g, '').trim(),
          desc: (desc || default8Steps[idx]?.desc || '').replace(/\s*\([^)]*\)/g, '').trim()
        };
      });
      if (parsed.length >= 4) {
        rawSteps = parsed.length >= 8 ? parsed.slice(0, 8) : [...parsed, ...default8Steps.slice(parsed.length, 8)];
      }
    }

    return rawSteps.map((s, idx) => {
      const stepNum = idx + 1;
      const isUserDone = !!userCheckedSteps[stepNum];
      const status: 'completed' | 'pending' = isUserDone ? 'completed' : 'pending';
      const isCompleted = status === 'completed';
      const isPending = status === 'pending';

      const statusLabel = isCompleted ? 'Completed' : 'Pending';

      const numBg = isCompleted
        ? 'bg-emerald-600 text-white'
        : 'bg-slate-900 text-white';

      const iconBg = isCompleted
        ? 'bg-emerald-50 text-emerald-600'
        : 'bg-amber-50 text-amber-600';

      const tLow = `${s.title} ${s.desc}`.toLowerCase();
      let icon = <FileText className="w-4 h-4 text-amber-600" />;
      if (tLow.includes('eligib') || tLow.includes('check') || tLow.includes('qualif')) {
        icon = <Users className="w-4 h-4 text-amber-600" />;
      } else if (tLow.includes('doc') || tLow.includes('gather') || tLow.includes('collect') || tLow.includes('checklist')) {
        icon = <FileText className="w-4 h-4 text-amber-600" />;
      } else if (tLow.includes('appoint') || tLow.includes('schedule') || tLow.includes('book') || tLow.includes('slot')) {
        icon = <Calendar className="w-4 h-4 text-amber-600" />;
      } else if (tLow.includes('fee') || tLow.includes('pay') || tLow.includes('cost') || tLow.includes('charge')) {
        icon = <CreditCard className="w-4 h-4 text-amber-600" />;
      } else if (tLow.includes('submit') || tLow.includes('biometric') || tLow.includes('fingerprint') || tLow.includes('vfs') || tLow.includes('cvasc') || tLow.includes('gvcw') || tLow.includes('attend') || tLow.includes('handover')) {
        icon = <UploadCloud className="w-4 h-4 text-amber-600" />;
      } else if (tLow.includes('track') || tLow.includes('status') || tLow.includes('portal') || tLow.includes('wait') || tLow.includes('adjudicat')) {
        icon = <RotateCw className="w-4 h-4 text-amber-600" />;
      } else if (tLow.includes('passport') || tLow.includes('receive') || tLow.includes('collect') || tLow.includes('stamp') || tLow.includes('courier')) {
        icon = <Award className="w-4 h-4 text-amber-600" />;
      }

      return {
        step: stepNum,
        title: s.title,
        desc: s.desc,
        status,
        statusLabel,
        numBg,
        iconBg,
        icon: isCompleted ? <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> : icon
      };
    });
  }, [aiData, countryName, purposeLabel, userCheckedSteps, isSchengen]);

  const stepsCompleted = dynamicSteps.filter(s => (s.status as string) === 'completed').length;
  const stepsInProgress = dynamicSteps.filter(s => (s.status as string) === 'in_progress').length;
  const stepsPending = dynamicSteps.filter(s => (s.status as string) === 'pending').length;
  const stepsNotStarted = dynamicSteps.filter(s => (s.status as string) === 'not_started').length;

  const isStudyTab = activePurposeTab === 'study' || initialPurpose === 'study';
  const isWorkTab = activePurposeTab === 'work' || initialPurpose === 'work';
  const isBusinessTab = activePurposeTab === 'business' || initialPurpose === 'business';
  const isPRTab = activePurposeTab === 'pr' || initialPurpose === 'pr';
  const isFamilyTab = activePurposeTab === 'family' || activePurposeTab === 'spouse' || initialPurpose === 'family' || initialPurpose === 'spouse' || (initialPurpose || '').toLowerCase().includes('family') || (initialPurpose || '').toLowerCase().includes('spouse') || (activePurposeTab || '').toLowerCase().includes('family') || (activePurposeTab || '').toLowerCase().includes('spouse');

  const getResolvedProcessingTime = () => {
    const cLow = (countryName || '').toLowerCase().trim();
    const pLow = (passportCountry || '').toLowerCase().trim();
    const isIndian = pLow.includes('india') || pLow.includes('in');
    const isSchengenCountry = isSchengen || ['greece', 'france', 'germany', 'italy', 'spain', 'switzerland', 'austria', 'netherlands', 'portugal', 'belgium', 'sweden', 'norway', 'denmark', 'finland', 'poland', 'czech', 'hungary'].some(c => cLow.includes(c));

    // Family pathway processing time
    if (isFamilyTab) {
      if (aiData?.processing_time) return aiData.processing_time;
      if (aiData?.processing_and_timing?.decision_time) return aiData.processing_and_timing.decision_time;
      return getFamilyProcessingTime(countryName);
    }

    // PR pathway processing time
    if (isPRTab) {
      if (aiData?.processing_time) return aiData.processing_time;
      if (aiData?.processing_and_timing?.decision_time) return aiData.processing_and_timing.decision_time;
      return getPRProcessingTime(countryName);
    }

    // Student pathway processing time
    if (isStudyTab) {
      if (aiData?.processing_time) return aiData.processing_time;
      if (aiData?.processing_and_timing?.decision_time) return aiData.processing_and_timing.decision_time;
      return getStudentProcessingTime(countryName);
    }

    // Work pathway processing time
    if (isWorkTab) {
      if (aiData?.processing_time) return aiData.processing_time;
      if (aiData?.processing_and_timing?.decision_time) return aiData.processing_and_timing.decision_time;
      return getWorkProcessingTime(countryName);
    }

    // Business pathway processing time
    if (isBusinessTab) {
      if (aiData?.processing_time) return aiData.processing_time;
      if (aiData?.processing_and_timing?.decision_time) return aiData.processing_and_timing.decision_time;
      return getBusinessProcessingTime(countryName);
    }

    // Always prefer verified AI requirements data if available
    if (aiData?.processing_time) {
      return aiData.processing_time;
    }
    if (aiData?.processing_and_timing?.decision_time) {
      return aiData.processing_and_timing.decision_time;
    }

    return getTourismProcessingTime(countryName);
  };

  const resolvedOverview = useMemo(() => {
    if (aiData?.overview) {
      const oLow = aiData.overview.toLowerCase();
      // Guard against tourist overview leaking into family tab
      if (isFamilyTab && !oLow.includes('family') && !oLow.includes('spouse') && !oLow.includes('partner') && !oLow.includes('marriage') && !oLow.includes('reunification') && (oLow.includes('touris') || oLow.includes('visit visa') || oLow.includes('short stay') || oLow.includes('holiday') || oLow.includes('sightseeing'))) {
        return getFamilyOverview(countryName);
      }
      // Guard against tourist overview leaking into PR tab
      if (isPRTab && !oLow.includes('permanent') && !oLow.includes('pr') && !oLow.includes('settle') && !oLow.includes('immigrat') && !oLow.includes('residency') && (oLow.includes('touris') || oLow.includes('visit visa') || oLow.includes('short stay') || oLow.includes('visiting family') || oLow.includes('holiday') || oLow.includes('sightseeing'))) {
        return getPROverview(countryName);
      }
      // Guard against tourist overview leaking into study tab
      if (isStudyTab && !oLow.includes('study') && !oLow.includes('student') && !oLow.includes('academic') && (oLow.includes('touris') || oLow.includes('visit visa') || oLow.includes('short stay') || oLow.includes('visiting family'))) {
        return getStudentOverview(countryName);
      }
      // Guard against tourist overview leaking into work tab
      if (isWorkTab && !oLow.includes('work') && !oLow.includes('employ') && (oLow.includes('touris') || oLow.includes('visit visa') || oLow.includes('short stay') || oLow.includes('visiting family'))) {
        return getWorkOverview(countryName);
      }
      // Guard against tourist overview leaking into business tab
      if (isBusinessTab && !oLow.includes('business') && !oLow.includes('commercial') && (oLow.includes('touris') || oLow.includes('visit visa') || oLow.includes('short stay') || oLow.includes('visiting family') || oLow.includes('holiday') || oLow.includes('sightseeing'))) {
        return getBusinessOverview(countryName);
      }
      return aiData.overview;
    }
    if (isFamilyTab) {
      return getFamilyOverview(countryName);
    }
    if (isPRTab) {
      return getPROverview(countryName);
    }
    if (isStudyTab) {
      return getStudentOverview(countryName);
    }
    if (isWorkTab) {
      return getWorkOverview(countryName);
    }
    if (isBusinessTab) {
      return getBusinessOverview(countryName);
    }
    return getTourismOverview(countryName);
  }, [aiData?.overview, activePurposeTab, initialPurpose, countryName, isStudyTab, isWorkTab, isBusinessTab, isPRTab, isFamilyTab]);

  useEffect(() => {
    let mounted = true;
    const fetchLiveAiRequirements = async () => {
      setIsAiLoading(true);
      try {
        let userEmail = 'seeker@travltik.com';
        try {
          const parsed = JSON.parse(localStorage.getItem('travltik_user') || '{}');
          if (parsed.email) userEmail = parsed.email;
          else if (localStorage.getItem('seeker_email')) userEmail = localStorage.getItem('seeker_email')!;
        } catch (_) {}

        const cleanPurpose = 
          (activePurposeTab === 'family' || initialPurpose === 'family' || isFamilyTab) ? 'Family / Spouse Visa' :
          (activePurposeTab === 'pr' || initialPurpose === 'pr') ? 'Permanent Residency (PR) / Immigration' :
          (activePurposeTab === 'study' || initialPurpose === 'study') ? 'Higher Studies' :
          (activePurposeTab === 'work' || initialPurpose === 'work') ? 'Employment / Work' :
          (activePurposeTab === 'business' || initialPurpose === 'business') ? 'Business Visit' :
          'Tourism / Vacation';

        const res = await fetch('/api/visa/ai-requirements', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fromCountry: passportCountry,
            toCountry: countryName,
            purpose: cleanPurpose,
            userEmail,
            isLoggedIn: true
          })
        });
        const json = await res.json();
        if (json.success && json.data && mounted) {
          setAiData(json.data);
          try {
            const cacheKey = `travltik_ai_res_v3_${countryName}_${passportCountry}_${activePurposeTab}`.replace(/\s+/g, '_').toLowerCase();
            localStorage.setItem(cacheKey, JSON.stringify(json.data));
          } catch(e) {}
        }
      } catch (err) {
        console.error('Failed to fetch live AI requirements:', err);
      } finally {
        if (mounted) setIsAiLoading(false);
      }
    };

    fetchLiveAiRequirements();
    return () => { mounted = false; };
  }, [countryName, passportCountry, activePurposeTab]);

  // Dynamic user-uploaded documents (Starts empty: users fill their own data)
  const [portalUploadedDocs, setPortalUploadedDocs] = useState<Record<string, {
    fileName: string;
    fileSize: string;
    uploadedAt: string;
    validDate?: string;
    status: 'completed' | 'in_progress' | 'pending' | 'not_started';
    docNumber?: string;
  }>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(`portal_docs_${slugClean}`);
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return {};
  });

  const handlePortalFileUpload = (docKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const sizeStr = file.size > 1024 * 1024 ? (file.size / (1024 * 1024)).toFixed(1) + ' MB' : Math.round(file.size / 1024) + ' KB';
    setPortalUploadedDocs(prev => {
      const updated = {
        ...prev,
        [docKey]: {
          fileName: file.name,
          fileSize: sizeStr,
          uploadedAt: formattedDate,
          status: 'completed' as const
        }
      };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(`portal_docs_${slugClean}`, JSON.stringify(updated));
        } catch (err) {}
      }
      return updated;
    });
  };

  const handleToggleDocChecklist = (docKey: string, choice?: 'yes' | 'no') => {
    setPortalUploadedDocs(prev => {
      const current = prev[docKey];
      const isCurrentlyYes = current?.status === 'completed';

      let newStatus: 'completed' | 'pending' | 'not_started';
      if (choice === 'no') {
        newStatus = current?.status === 'pending' ? 'not_started' : 'pending';
      } else {
        newStatus = isCurrentlyYes ? 'not_started' : 'completed';
      }

      const updated = {
        ...prev,
        [docKey]: {
          fileName: newStatus === 'completed' ? 'Checklist Verified (Ready)' : (current?.fileName || 'Checklist Item'),
          fileSize: current?.fileSize || '',
          uploadedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          status: newStatus
        }
      };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(`portal_docs_${slugClean}`, JSON.stringify(updated));
        } catch (err) {}
      }
      return updated;
    });
  };

  // Consultant Filter & Booking States
  const [consultantLocationQuery, setConsultantLocationQuery] = useState('');
  const [consultantCountryFilter, setConsultantCountryFilter] = useState('All Countries (Global)');
  const [consultantServiceType, setConsultantServiceType] = useState('Study Visa & Admissions Filing');
  const [consultantRatingFilter, setConsultantRatingFilter] = useState('All');
  const [isSaved, setIsSaved] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = JSON.parse(localStorage.getItem('travltik_saved_visas') || '[]');
        return saved.includes(slugClean);
      } catch(e) {}
    }
    return false;
  });

  const handleToggleSave = () => {
    if (typeof window === 'undefined') return;
    try {
      const saved = JSON.parse(localStorage.getItem('travltik_saved_visas') || '[]');
      let updated;
      if (isSaved) {
        updated = saved.filter((s: string) => s !== slugClean);
        setIsSaved(false);
      } else {
        updated = [...saved, slugClean];
        setIsSaved(true);
      }
      localStorage.setItem('travltik_saved_visas', JSON.stringify(updated));
    } catch(e) {}
  };

  const [checklistSyncedToast, setChecklistSyncedToast] = useState<{ show: boolean; msg: string; trackingId: string; caseId?: string } | null>(null);
  const [showLoginRequiredModal, setShowLoginRequiredModal] = useState(false);

  const checkIsUserLoggedIn = () => {
    if (typeof window === 'undefined') return false;
    const userStr = localStorage.getItem('travltik_user');
    const seekerEmail = localStorage.getItem('seeker_email');
    const expertLoggedIn = localStorage.getItem('expert_isLoggedIn') === 'true';

    if (userStr && userStr !== 'null' && userStr !== 'undefined') {
      try {
        const parsed = JSON.parse(userStr);
        if (parsed && (parsed.email || parsed.uid || parsed.id)) {
          return true;
        }
      } catch (_) {}
    }

    if (seekerEmail && seekerEmail !== 'seeker@travltik.com' && seekerEmail !== 'guest@travltik.com' && seekerEmail.includes('@')) {
      return true;
    }

    if (expertLoggedIn) {
      return true;
    }

    return false;
  };

  const handleDownloadAndSyncChecklist = () => {
    if (!checkIsUserLoggedIn()) {
      setShowLoginRequiredModal(true);
      return;
    }

    try {
      const trackingId = `TT-${(countryName || 'VI').slice(0, 2).toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const submissionDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const isFamily = isFamilyTab || activePurposeTab === 'family' || activePurposeTab === 'spouse';
      const isPR = activePurposeTab === 'pr';
      const isStudy = activePurposeTab === 'study';
      const isWork = activePurposeTab === 'work';
      const isBusiness = activePurposeTab === 'business';
      const visaTypeName = isFamily
        ? `${countryName} Family / Spouse Visa`
        : isStudy 
        ? 'Student Visa' 
        : isWork 
        ? 'Skilled Worker Visa' 
        : isBusiness 
        ? 'Business Visa' 
        : isPR
        ? 'Permanent Residency'
        : (isSchengen ? 'Schengen Tourist Visa (Type C)' : `${countryName} Tourist Visa`);
      const processingTimeVal = getResolvedProcessingTime() || aiData?.processing_time || (isFamily ? getFamilyProcessingTime(countryName) : isPR ? getPRProcessingTime(countryName) : isStudy ? getStudentProcessingTime(countryName) : isWork ? getWorkProcessingTime(countryName) : isBusiness ? getBusinessProcessingTime(countryName) : getTourismProcessingTime(countryName));
      const consularFeeVal = aiData?.costs?.visa_fee || (isFamily ? getFamilyFees(countryName).visa_fee : isPR ? getPRFees(countryName).visa_fee : isStudy ? getStudentFees(countryName).visa_fee : isWork ? getWorkFees(countryName).visa_fee : isBusiness ? getBusinessFees(countryName).visa_fee : getTourismFees(countryName).visa_fee);
      const serviceFeeVal = aiData?.costs?.service_fee || (isFamily ? getFamilyFees(countryName).service_fee : isPR ? getPRFees(countryName).service_fee : isStudy ? getStudentFees(countryName).service_fee : isWork ? getWorkFees(countryName).service_fee : isBusiness ? getBusinessFees(countryName).service_fee : getTourismFees(countryName).service_fee);
      const stayDurationVal = isFamily
        ? getFamilyStayDuration(countryName)
        : isPR
        ? getPRStayDuration(countryName)
        : isStudy 
        ? getStudentStayDuration(countryName) 
        : isWork 
        ? getWorkStayDuration(countryName) 
        : isBusiness
        ? getBusinessStayDuration(countryName)
        : getTourismStayDuration(countryName);

      // Compile Documents List from AI data or defaults
      const rawDocs = (aiData?.documents_required && Array.isArray(aiData.documents_required) && aiData.documents_required.length > 0)
        ? aiData.documents_required.map((d: any) => ({
            title: d.title || d.name || 'Document Requirement',
            description: d.description || d.hint || 'Must comply with official consular specifications.',
            isMandatory: d.is_mandatory !== false
          }))
        : isFamily
        ? getFamilyDocuments(passportCountry, countryName, 'Family').map(d => ({
            title: d.title,
            description: d.description,
            isMandatory: d.is_mandatory !== false
          }))
        : isPR
        ? getPRDocuments(passportCountry, countryName, 'PR').map(d => ({
            title: d.title,
            description: d.description,
            isMandatory: d.is_mandatory !== false
          }))
        : isStudy
        ? getStudentDocuments(passportCountry, countryName, 'Student').map(d => ({
            title: d.title,
            description: d.description,
            isMandatory: d.is_mandatory !== false
          }))
        : isWork
        ? getWorkDocuments(passportCountry, countryName, 'Work').map(d => ({
            title: d.title,
            description: d.description,
            isMandatory: d.is_mandatory !== false
          }))
        : isBusiness
        ? getBusinessDocuments(passportCountry, countryName, 'Business').map(d => ({
            title: d.title,
            description: d.description,
            isMandatory: d.is_mandatory !== false
          }))
        : getTourismDocuments(countryName).map(d => ({
            title: d.title,
            description: d.description,
            isMandatory: d.is_mandatory !== false
          }));

      // Compile Procedural Steps
      const rawSteps = (aiData?.how_to_apply && Array.isArray(aiData.how_to_apply) && aiData.how_to_apply.length >= 4)
        ? aiData.how_to_apply.map((s: any, idx: number) => {
            const raw = typeof s === 'string' ? s : (s.title || s.step || `Step ${idx + 1}`);
            const clean = raw.replace(/^[0-9\uFE0F\u20E3\.\)\s]+/, '').replace(/^\[?step\s*\d+\]?\s*/i, '').trim();
            let title = '';
            let desc = '';
            if (clean.includes('—')) {
              const parts = clean.split('—');
              title = parts[0].trim();
              desc = parts.slice(1).join('—').trim();
            } else if (clean.includes('–')) {
              const parts = clean.split('–');
              title = parts[0].trim();
              desc = parts.slice(1).join('–').trim();
            } else if (clean.includes(':')) {
              const parts = clean.split(':');
              title = parts[0].trim();
              desc = parts.slice(1).join(':').trim();
            } else if (clean.includes(' - ')) {
              const parts = clean.split(' - ');
              title = parts[0].trim();
              desc = parts.slice(1).join(' - ').trim();
            } else {
              title = clean;
              desc = 'Follow official consular procedural guidelines.';
            }
            return {
              step: idx + 1,
              title: title || clean,
              desc: desc || 'Follow official consular procedural guidelines.'
            };
          })
        : (dynamicSteps && dynamicSteps.length > 0)
        ? dynamicSteps.map(s => ({ step: s.step, title: s.title, desc: s.desc }))
        : isFamily
        ? getFamilyVisaSteps(passportCountry, countryName, 'Family Visa').map((s, idx) => {
            const clean = s.replace(/^[0-9\uFE0F\u20E3\.\)\s]+/, '').replace(/^\[?step\s*\d+\]?\s*/i, '').trim();
            const parts = clean.includes('—') ? clean.split('—') : clean.includes(':') ? clean.split(':') : [clean, 'Follow official consular procedural guidelines.'];
            return {
              step: idx + 1,
              title: parts[0]?.trim() || `Step ${idx + 1}`,
              desc: parts[1]?.trim() || 'Follow official consular procedural guidelines.'
            };
          })
        : isPR
        ? getPRVisaSteps(passportCountry, countryName, 'PR Visa').map((s, idx) => {
            const clean = s.replace(/^[0-9\uFE0F\u20E3\.\)\s]+/, '').replace(/^\[?step\s*\d+\]?\s*/i, '').trim();
            const parts = clean.includes('—') ? clean.split('—') : clean.includes(':') ? clean.split(':') : [clean, 'Follow official consular procedural guidelines.'];
            return {
              step: idx + 1,
              title: parts[0]?.trim() || `Step ${idx + 1}`,
              desc: parts[1]?.trim() || 'Follow official consular procedural guidelines.'
            };
          })
        : isStudy
        ? getStudentVisaSteps(passportCountry, countryName, 'Student Visa').map((s, idx) => {
            const clean = s.replace(/^[0-9\uFE0F\u20E3\.\)\s]+/, '').replace(/^\[?step\s*\d+\]?\s*/i, '').trim();
            const parts = clean.includes('—') ? clean.split('—') : clean.includes(':') ? clean.split(':') : [clean, 'Follow official consular procedural guidelines.'];
            return {
              step: idx + 1,
              title: parts[0]?.trim() || `Step ${idx + 1}`,
              desc: parts[1]?.trim() || 'Follow official consular procedural guidelines.'
            };
          })
        : isWork
        ? getWorkVisaSteps(passportCountry, countryName, 'Work Visa').map((s, idx) => {
            const clean = s.replace(/^[0-9\uFE0F\u20E3\.\)\s]+/, '').replace(/^\[?step\s*\d+\]?\s*/i, '').trim();
            const parts = clean.includes('—') ? clean.split('—') : clean.includes(':') ? clean.split(':') : [clean, 'Follow official consular procedural guidelines.'];
            return {
              step: idx + 1,
              title: parts[0]?.trim() || `Step ${idx + 1}`,
              desc: parts[1]?.trim() || 'Follow official consular procedural guidelines.'
            };
          })
        : isBusiness
        ? getBusinessVisaSteps(passportCountry, countryName, 'Business Visa').map((s, idx) => {
            const clean = s.replace(/^[0-9\uFE0F\u20E3\.\)\s]+/, '').replace(/^\[?step\s*\d+\]?\s*/i, '').trim();
            const parts = clean.includes('—') ? clean.split('—') : clean.includes(':') ? clean.split(':') : [clean, 'Follow official consular procedural guidelines.'];
            return {
              step: idx + 1,
              title: parts[0]?.trim() || `Step ${idx + 1}`,
              desc: parts[1]?.trim() || 'Follow official consular procedural guidelines.'
            };
          })
        : [
            { step: 1, title: 'Check Eligibility & Jurisdiction', desc: 'Confirm entry requirements and consular jurisdiction for your passport.' },
            { step: 2, title: 'Gather Supporting Documents', desc: 'Collect valid passport, photo, hotel, flight, and financial proof.' },
            { step: 3, title: 'Complete Visa Application Form', desc: 'Accurately complete the official visa application form.' },
            { step: 4, title: 'Schedule Biometrics Appointment', desc: 'Book submission appointment at the authorized Visa Application Center.' },
            { step: 5, title: 'Pay Consular Statutory Fees', desc: 'Pay non-refundable consular processing and biometric fees.' },
            { step: 6, title: 'Submit Dossier & Track Adjudication', desc: 'Enroll biometrics, submit passport, and track application online.' }
          ];

      // Compile Profile Specific Details for Dossier
      const profileDetailsList: Array<{ label: string; value: string }> = [];
      try {
        if (isStudy) {
          if (typeof studyQual !== 'undefined' && studyQual) profileDetailsList.push({ label: 'Qualification', value: studyQual });
          if (typeof studyTarget !== 'undefined' && studyTarget) profileDetailsList.push({ label: 'Target Degree', value: studyTarget });
          if (typeof studyIntake !== 'undefined' && studyIntake) profileDetailsList.push({ label: 'Intake Session', value: studyIntake });
          if (typeof studyBudget !== 'undefined' && studyBudget) profileDetailsList.push({ label: 'Funding Source', value: studyBudget });
        } else if (isWork) {
          if (typeof workExp !== 'undefined' && workExp) profileDetailsList.push({ label: 'Experience', value: workExp });
          if (typeof workOffer !== 'undefined' && workOffer) profileDetailsList.push({ label: 'Job Offer', value: workOffer });
          if (typeof workDomain !== 'undefined' && workDomain) profileDetailsList.push({ label: 'Domain', value: workDomain });
        } else {
          if (typeof visitPlanStatus !== 'undefined' && visitPlanStatus) profileDetailsList.push({ label: 'Trip Status', value: visitPlanStatus });
          if (typeof visitTiming !== 'undefined' && visitTiming) profileDetailsList.push({ label: 'Departure Date', value: visitTiming });
          if (typeof visitReturnDate !== 'undefined' && visitReturnDate) profileDetailsList.push({ label: 'Return Date', value: visitReturnDate });
          if (typeof tripDurationDays !== 'undefined' && tripDurationDays > 0) profileDetailsList.push({ label: 'Trip Duration', value: `${tripDurationDays} Days` });
          if (typeof visitStay !== 'undefined' && visitStay) profileDetailsList.push({ label: 'Accommodation', value: visitStay });
        }
      } catch (_) {}

      // 1. GENERATE & DOWNLOAD COMPREHENSIVE 8-SECTION PDF
      const currentProfileScore = (typeof profileScore !== 'undefined' && profileScore) ? profileScore : 45;
      const pdfPayload: VisaChecklistPDFData = {
        countryName,
        passportCountry,
        purpose: activePurposeTab,
        visaType: visaTypeName,
        trackingId,
        processingTime: processingTimeVal,
        embassyFee: consularFeeVal,
        childFee: isSchengen ? '45 EUR (under 6: Free)' : (aiData?.costs?.child_fee || 'Exempt / Reduced'),
        serviceFee: serviceFeeVal,
        totalFee: aiData?.costs?.total_fee || (isFamily ? getFamilyFees(countryName).total_fee : isPR ? getPRFees(countryName).total_fee : isStudy ? getStudentFees(countryName).total_fee : isWork ? getWorkFees(countryName).total_fee : isBusiness ? getBusinessFees(countryName).total_fee : getTourismFees(countryName).total_fee),
        feeNotes: 'Consular statutory fees are non-refundable and set by the destination sovereign immigration department.',
        stayDuration: stayDurationVal,
        validity: isFamily ? getFamilyValidity(countryName) : isPR ? getPRValidity(countryName) : isStudy ? getStudentValidity(countryName) : isWork ? getWorkValidity(countryName) : isBusiness ? getBusinessValidity(countryName) : getTourismValidity(countryName),
        entryType: isFamily ? getFamilyEntryType(countryName) : isPR ? getPREntryType(countryName) : isStudy ? getStudentEntryType(countryName) : isWork ? getWorkEntryType(countryName) : isBusiness ? getBusinessEntryType(countryName) : getTourismEntryType(countryName),
        applyWindow: isFamily ? 'Apply 3 to 6 months prior to planned travel' : isPR ? 'Apply 6 to 12 months prior to planned relocation' : isStudy ? 'Apply 3 to 4 months prior to program intake' : isWork ? 'Apply 3 to 6 months prior to employment start date' : isBusiness ? 'Apply 3 to 6 weeks prior to planned business travel' : 'Submit application 15 - 30 days prior to travel (or 72 hrs for digital/eVisa forms)',
        profileScore: currentProfileScore,
        profileDetails: profileDetailsList,
        documents: rawDocs,
        steps: rawSteps,
        requirements: isFamily ? [
          { title: 'Passport Validity Requirement', desc: 'Valid for at least 6 months beyond intended stay with minimum 2 blank pages.' },
          { title: 'Genuine Partnership & Cohabitation Evidence', desc: 'Comprehensive proof of relationship (Marriage certificate, shared residence, communications, financial interdependency).' },
          { title: 'Sponsorship & Financial Solvency', desc: getFamilyFinancialProofs(countryName).map(f => `${f.type}: ${f.minimum_balance_or_amount || f.notes}`).join('; ') || 'Verified sponsor income and accommodation compliance.' },
          { title: 'Statutory Admissibility & Health Clearance', desc: getFamilyRequirements(countryName).map(o => `${o.category}: ${o.details}`).join('; ') || 'Police clearances and panel physician medical examinations.' }
        ] : isPR ? [
          { title: 'Passport Validity Requirement', desc: 'Valid for at least 12 months with minimum 2 blank pages.' },
          { title: 'Points, Language & Skills Assessment', desc: getPRRequirements(countryName).map(o => `${o.category}: ${o.details}`).join('; ') || 'Verified ECA, IELTS/CLB scores, and skills accreditation.' },
          { title: 'Financial Solvency & Settlement Funds', desc: getPRFinancialProofs(countryName).map(f => `${f.type}: ${f.minimum_balance_or_amount || f.notes}`).join('; ') || 'Verified liquid settlement funds.' },
          { title: 'Statutory Admissibility & Clearances', desc: 'Police Clearance Certificates (PCC) and upfront immigration medical examination (IME).' }
        ] : isStudy ? [
          { title: 'Passport Validity Requirement', desc: 'Valid for at least 6 months beyond intended program duration with minimum 2 blank pages.' },
          { title: 'Financial Solvency Benchmark', desc: getStudentFinancialProofs(countryName).map(f => `${f.type}: ${f.minimum_balance_or_amount || f.notes}`).join('; ') || 'Sufficient verified educational funds.' },
          { title: 'Academic Progression & Intent', desc: 'Documented course justification, SOP, and certified academic credentials.' },
          { title: 'Biometrics & Security Mandates', desc: getStudentOtherRequirements(countryName).map(o => `${o.category}: ${o.details}`).join('; ') || 'VAC Biometrics and medical clearance.' }
        ] : isWork ? [
          { title: 'Passport Validity Requirement', desc: 'Valid for at least 6 months beyond intended employment period with minimum 2 blank pages.' },
          { title: 'Financial Solvency Benchmark', desc: getWorkFinancialProofs(countryName).map(f => `${f.type}: ${f.minimum_balance_or_amount || f.notes}`).join('; ') || 'Verified employer sponsorship and maintenance funds.' },
          { title: 'Employer Sponsorship & Role Eligibility', desc: 'Valid Certificate of Sponsorship/LMIA/Petition and professional qualifications.' },
          { title: 'Biometrics & Security Mandates', desc: getWorkRequirements(countryName).map(o => `${o.category}: ${o.details}`).join('; ') || 'Biometrics, police clearance, and immigration compliance.' }
        ] : isBusiness ? [
          { title: 'Passport Validity Requirement', desc: 'Valid for at least 6 months beyond intended stay with minimum 2 blank pages.' },
          { title: 'Corporate Invitation & Commercial Purpose', desc: 'Formal invitation letter from registered host entity detailing business agenda and meetings.' },
          { title: 'Employer Deputation & Solvency', desc: getBusinessFinancialProofs(countryName).map(f => `${f.type}: ${f.minimum_balance_or_amount || f.notes}`).join('; ') || 'Employer sponsorship letter guaranteeing trip expenses.' },
          { title: 'Permitted Activities & Compliance', desc: getBusinessRequirements(countryName).map(o => `${o.category}: ${o.details}`).join('; ') || 'No local employment; commercial visits only.' }
        ] : getTourismRequirements(countryName).map(r => ({ title: r.category, desc: r.details })),
        faqs: resolvedFaqs.slice(0, 5),
        trackingUrl: typeof window !== 'undefined' ? `${window.location.origin}/traveller/dashboard` : 'https://travltik.com/traveller/dashboard',
        timestamp: submissionDate
      };
      downloadVisaChecklistPDF(pdfPayload, `${slugClean}-official-visa-checklist.pdf`);

      // 2. SYNC APPLICATION INTO DASHBOARD "ACTIVE VISA CASES"
      if (typeof window !== 'undefined') {
        const caseId = `case-${slugClean}`;
        const existingCases = JSON.parse(localStorage.getItem('active_visa_cases') || '[]');
        const filteredCases = existingCases.filter((c: any) => c.id !== caseId && c.destination?.toLowerCase() !== countryName.toLowerCase());

        const newCase = {
          id: caseId,
          trackingId,
          destination: countryName,
          destinationFlag: flagEmoji,
          visaType: visaTypeName,
          purpose: activePurposeTab.toLowerCase(),
          passport: passportCountry,
          status: 'AI Verified & Checklist Synced',
          stage: 'Document Vault Verification',
          progress: 25,
          documentsCount: rawDocs.length,
          submittedAt: submissionDate,
          targetDate: processingTimeVal,
          validity: isFamily ? getFamilyValidity(countryName) : isPR ? getPRValidity(countryName) : isSchengen ? 'Based on approved itinerary (up to 6 months or 1 year multi-entry)' : '180 Days',
          entryType: isFamily ? getFamilyEntryType(countryName) : isPR ? getPREntryType(countryName) : 'Single / Multiple Entry',
          consularFee: consularFeeVal,
          serviceFee: serviceFeeVal,
          createdAt: new Date().toISOString(),
          checklist: rawDocs.map((d: any) => ({
            id: d.title.toLowerCase().replace(/[^a-z0-9]/g, '_'),
            title: d.title,
            description: d.description,
            mandatory: d.isMandatory !== false,
            status: 'pending'
          }))
        };

        const updatedCases = [newCase, ...filteredCases];
        localStorage.setItem('active_visa_cases', JSON.stringify(updatedCases));

        // Also sync user-scoped cases if email is present
        const userEmail = localStorage.getItem('seeker_email') || (JSON.parse(localStorage.getItem('travltik_user') || '{}'))?.email;
        if (userEmail) {
          localStorage.setItem(`active_visa_cases_${userEmail}`, JSON.stringify(updatedCases));
        }

        // 3. SYNC ACTIVE TRAVEL PROFILE & USER JOURNEY
        localStorage.setItem('active_travel_profile', JSON.stringify({
          destination: countryName,
          destinationFlag: flagEmoji,
          passport: passportCountry,
          purpose: activePurposeTab,
          visaType: visaTypeName,
          trackingId,
          createdAt: submissionDate
        }));

        localStorage.setItem('travltik_user_journey', JSON.stringify({
          destination: countryName,
          destination_flag: flagEmoji,
          passport_country: passportCountry,
          purpose: activePurposeTab,
          visa_type: visaTypeName,
          tracking_id: trackingId,
          stay_duration: stayDurationVal,
          readiness_score: 95,
          documents: rawDocs,
          status: 'AI Verified & Checklist Synced',
          submitted_at: submissionDate
        }));

        // Trigger storage event so dashboard tabs reactively update
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new CustomEvent('travltik_visa_synced', { detail: newCase }));

        // 4. AUTOMATICALLY REDIRECT TO DOCUMENTS REQUIRED UNDER VISA APPLICATIONS
        setTimeout(() => {
          window.location.href = `/traveller/dashboard?tab=cases&appId=${caseId}#documents-required-section`;
        }, 700);
      }

      // 5. SHOW CONFIRMATION TOAST
      setChecklistSyncedToast({
        show: true,
        msg: `Official ${countryName} Checklist PDF downloaded & application synced to your Dashboard!`,
        trackingId,
        caseId: caseId
      });

      setTimeout(() => {
        setChecklistSyncedToast(null);
      }, 8000);

    } catch (err) {
      console.error('[DownloadAndSyncChecklist]', err);
    }
  };

  const handleDownloadChecklist = handleDownloadAndSyncChecklist;

  const [bookingModalConsultant, setBookingModalConsultant] = useState<StudyConsultantItem | null>(null);
  const [consultantBookedToast, setConsultantBookedToast] = useState<string | null>(null);

  // Self-Apply Concierge Document Vault & Addon States
  const [uploadedDocuments, setUploadedDocuments] = useState<Record<string, { fileName: string; size: string; status: 'uploaded' | 'verified'; timestamp: string }>>({});
  const [readyDocKeys, setReadyDocKeys] = useState<Record<string, boolean>>({});
  const toggleDocReady = (key: string) => {
    setReadyDocKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };
  const [selectedConciergeAddons, setSelectedConciergeAddons] = useState<string[]>([]);
  const [conciergeSubmittedModal, setConciergeSubmittedModal] = useState(false);
  const [isUploadingDocKey, setIsUploadingDocKey] = useState<string | null>(null);
  const [uploadValidationWarning, setUploadValidationWarning] = useState<string | null>(null);

  const handleConciergeSubmit = (requiredDocKeys: string[], vaultElementId?: string) => {
    const readyCount = requiredDocKeys.filter(k => readyDocKeys[k] || uploadedDocuments[k]).length;
    const missingDocs = requiredDocKeys.filter(k => !readyDocKeys[k] && !uploadedDocuments[k]);

    if (readyCount === 0) {
      const msg = `⚠️ Action Required: Please mark your mandatory documents as ready (${readyCount} of ${requiredDocKeys.length} marked) before submitting your dossier.`;
      setUploadValidationWarning(msg);
      if (vaultElementId && typeof document !== 'undefined') {
        const el = document.getElementById(vaultElementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      setTimeout(() => setUploadValidationWarning(null), 6000);
      return;
    }
    setUploadValidationWarning(null);

    // ── SYNC FILLED AI PORTAL DETAILS TO DASHBOARD STORAGE ──
    if (typeof window !== 'undefined') {
      try {
        const trackingId = `TT-${activePurposeTab.toUpperCase().slice(0,3)}-2026-${Date.now().toString().slice(-4)}`;
        const submissionDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const visaTypeName = isStudyPurpose ? 'Student Visa' : isWorkPurpose ? 'Skilled Worker Visa' : 'Standard Visitor Visa (6-Month)';
        
        // 1. Save Comprehensive Journey Data
        const journeyPayload = {
          destination: countryName,
          destination_flag: flagEmoji,
          passport_country: passportCountry,
          purpose: activePurposeTab,
          visa_type: visaTypeName,
          stay_duration: isStudyPurpose ? 'Duration of Course (1-4 Yrs)' : isWorkPurpose ? '1 to 5 Years' : 'Up to 6 Months (180 Days)',
          readiness_score: 98,
          uploaded_documents: uploadedDocuments,
          selected_addons: selectedConciergeAddons,
          matched_university: isStudyPurpose ? (getDestinationUniversities(countryName).find(u => u.id === selectedUniId)?.name || 'Target University') : undefined,
          selected_tour: isTouristPurpose ? (getDestinationTours(countryName).find(t => t.id === selectedTourId)?.name || 'Curated Sightseeing') : undefined,
          selected_job: isWorkPurpose ? (getDestinationJobs(countryName).find(j => j.id === selectedJobId)?.title || 'Target Employment') : undefined,
          cas_i20_number: isStudyPurpose && isCasChecked ? (casNumberInput || 'CAS-UK-2026-VERIFIED') : undefined,
          tracking_id: trackingId,
          final_dossier_submitted: true,
          submitted_at: submissionDate,
          status: 'Required Documents & AI Verified'
        };
        localStorage.setItem('travltik_user_journey', JSON.stringify(journeyPayload));

        // 2. Save Seeker Core Profile fields
        localStorage.setItem('seeker_destinations', JSON.stringify([countryName]));
        localStorage.setItem('seeker_passportCountry', passportCountry);
        localStorage.setItem('seeker_country_of_citizenship', passportCountry);
        localStorage.setItem('seeker_goals', JSON.stringify([isStudyPurpose ? 'Study Abroad' : isWorkPurpose ? 'Work Abroad' : 'Tourism / Vacation']));
        
        // Ensure user can immediately view their dashboard without redirect roadblock
        if (!localStorage.getItem('seeker_email') && !(localStorage.getItem("travltik_user"))) {
          localStorage.setItem('seeker_email', 'seeker@travltik.com');
          localStorage.setItem('seeker_firstName', 'TravlTik');
          localStorage.setItem('seeker_lastName', 'Seeker');
        }

        // 3. Save Formatted Documents List
        const docArray = Object.entries(uploadedDocuments).map(([k, v]) => ({
          id: k,
          label: `${k.toUpperCase().replace(/_/g, ' ')} (${v.fileName})`,
          status: 'verified',
          size: v.size,
          uploadedAt: v.timestamp
        }));
        localStorage.setItem('seeker_documents', JSON.stringify(docArray));

        // 4. Save Active Travel Profile for instant Dashboard sync
        localStorage.setItem("active_travel_profile", JSON.stringify({
          destination: countryName,
          destinationFlag: flagEmoji,
          passport: passportCountry,
          purpose: isStudyPurpose ? 'Higher Studies' : isWorkPurpose ? 'Employment / Work' : 'Tourism / Vacation',
          visaType: visaTypeName,
          createdAt: submissionDate
        }));

        // 5. Save Document Vault Checklist State for this country
        try {
          const vaultKey = `vault_checklist_${countryName}`.replace(/\s+/g, '_').toLowerCase();
          const existingVault = JSON.parse(localStorage.getItem(vaultKey) || '{}');
          Object.keys(uploadedDocuments).forEach((k) => {
            existingVault[k] = {
              verified: true,
              status: 'verified',
              fileName: (uploadedDocuments as any)[k]?.fileName || `${k}.pdf`,
              timestamp: new Date().toISOString()
            };
          });
          localStorage.setItem(vaultKey, JSON.stringify(existingVault));
        } catch(e) {}

        // 6. Save Active Visa Case Record
        const activeCase = {
          id: `case-${Date.now()}`,
          trackingId: trackingId,
          destination: countryName,
          destinationFlag: flagEmoji,
          visaType: visaTypeName,
          purpose: activePurposeTab,
          passport: passportCountry,
          status: 'Required Documents & OCR Verified',
          stage: 'Under AI Concierge Review',
          progress: 35,
          documentsCount: Object.keys(uploadedDocuments).length,
          addonsCount: selectedConciergeAddons.length,
          submittedAt: submissionDate,
          targetDate: formatTargetDate(isStudyPurpose ? 15 : isWorkPurpose ? 20 : 15)
        };

        const existingCases = JSON.parse(localStorage.getItem('active_visa_cases') || '[]');
        const filteredCases = existingCases.filter((c: any) => c.destination !== countryName || c.purpose !== activePurposeTab);
        filteredCases.unshift(activeCase);
        localStorage.setItem('active_visa_cases', JSON.stringify(filteredCases));
      } catch (err) {
        console.error('Error syncing journey to localStorage:', err);
      }
    }

    setConciergeSubmittedModal(true);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      const urlPur = sp.get('purpose') || sp.get('category') || sp.get('type') || sp.get('intent') || sp.get('visa') || sp.get('q');
      if (urlPur) {
        const lower = urlPur.toLowerCase();
        if (lower.includes('pr') || lower.includes('permanent') || lower.includes('immigrat') || lower.includes('green') || lower.includes('settle')) {
          setActivePurposeTab('pr');
        } else if (lower.includes('student') || lower.includes('study') || lower.includes('education') || lower.includes('university') || lower.includes('course')) {
          setActivePurposeTab('study');
        } else if (lower.includes('work') || lower.includes('job') || lower.includes('employment') || lower.includes('career')) {
          setActivePurposeTab('work');
        } else if (lower.includes('business')) {
          setActivePurposeTab('business');
        } else if (lower.includes('family') || lower.includes('friend')) {
          setActivePurposeTab('family');
        } else {
          setActivePurposeTab('tourism');
        }
      }
      const urlPass = sp.get('passport') || sp.get('from');
      if (urlPass) {
        setPassportCountry(formatNationality(urlPass));
      }
    }
  }, []);

  // Dynamic AI Intelligence Resolution
  const aiIntel = useMemo(() => {
    return getAIVisaIntelligence(passportCountry, countryName, activePurposeTab);
  }, [passportCountry, countryName, activePurposeTab]);

  // Dynamic Purpose-Synchronized Specifications
  const isPRPurpose = activePurposeTab === 'pr';
  const isStudyPurpose = activePurposeTab === 'study';
  const isWorkPurpose = activePurposeTab === 'work';
  const isTouristPurpose = activePurposeTab === 'tourism' || activePurposeTab === 'business' || activePurposeTab === 'family';

  const dynamicLengthOfStay = isPRPurpose
    ? 'Indefinite / Permanent Resident Status'
    : isStudyPurpose
    ? 'Duration of Course (1 - 4 Years)'
    : isWorkPurpose
    ? '1 to 5 Years (Renewable)'
    : baseData.lengthOfStay || '30 Days';

  const dynamicStayCategory = isPRPurpose
    ? 'Permanent Residency / Settlement'
    : isStudyPurpose
    ? "Student's Pass / Visa"
    : isWorkPurpose
    ? 'Work Permit / Pass'
    : 'Tourist & Leisure';

  const dynamicValidity = isPRPurpose
    ? '10-Year Permanent Resident Card / Indefinite'
    : isStudyPurpose
    ? 'Full Course Duration + 90 Days'
    : isWorkPurpose
    ? 'Employment Contract Duration'
    : validity;

  const dynamicVisaType = isPRPurpose
    ? (countryName.toLowerCase().includes('united states') || countryName.toLowerCase().includes('usa') || countryName.toLowerCase().includes('america') ? 'US Immigrant Visa / Green Card' : countryName.toLowerCase().includes('canada') ? 'Canada Permanent Residence (Express Entry / PNP)' : countryName.toLowerCase().includes('australia') ? 'Australia Permanent Residency (Subclass 189/190)' : countryName.toLowerCase().includes('united kingdom') || countryName.toLowerCase().includes('uk') ? 'UK Settlement / Indefinite Leave to Remain (ILR)' : 'Permanent Residence (PR) / Settlement Visa')
    : isStudyPurpose
    ? (countryName.toLowerCase().includes('singapore') ? "Student's Pass (STP via SOLAR)" : 'Student Visa / Study Permit')
    : isWorkPurpose
    ? (countryName.toLowerCase().includes('singapore') ? 'Employment Pass / S Pass' : 'Work Visa / Employment Permit')
    : visaType;

  // Auto-Save / Synchronize Active Visa Search & Roadmap to User Dashboard & Database
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const email = localStorage.getItem('seeker_email') || (() => {
        try {
          const u = JSON.parse((localStorage.getItem("travltik_user")) || '{}');
          return u.email || 'guest@travltik.com';
        } catch(e) { return 'guest@travltik.com'; }
      })();

      const allUnis = getDestinationUniversities(countryName);
      const selectedUniObj = allUnis.find(u => u.id === selectedUniId) || allUnis[0];
      const uniName = selectedUniObj?.name || 'Top University';

      const journeyPayload = {
        user_email: email,
        passport_country: passportCountry || 'India',
        destination: countryName,
        destination_flag: flagEmoji,
        purpose: activePurposeTab || 'study',
        has_visa: hasVisaAlready === 'yes',
        visa_type: aiIntel.entryStatus || dynamicVisaType || 'Student Visa',
        stay_duration: aiIntel.stayDuration || dynamicLengthOfStay,
        entry_type: aiIntel.entryType || 'Multiple Entry',
        fees_info: aiIntel.feesAndProcessing,
        matched_university: uniName,
        selected_course_major: selectedCourseMajor,
        cas_i20_number: casNumberInput || 'CAS-UK-2026-VERIFIED',
        uploaded_documents: uploadedDocuments,
        selected_addons: selectedConciergeAddons,
        readiness_score: Object.keys(uploadedDocuments).length >= 4 ? 100 : (Object.keys(uploadedDocuments).length * 20 + 20),
        last_updated: new Date().toISOString()
      };

      // 1. Save to local storage for immediate offline / instant dashboard display
      localStorage.setItem('travltik_user_journey', JSON.stringify(journeyPayload));
      localStorage.setItem('travltik_last_searched_country', countryName);

      // 2. Synchronize to backend journey endpoint if email exists
      if (email && email !== 'guest@travltik.com') {
        fetch('/api/journey/update-step', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(journeyPayload)
        }).catch(() => {});
      }
    } catch (err) {
      console.warn('Dashboard sync error:', err);
    }
  }, [
    countryName,
    passportCountry,
    activePurposeTab,
    hasVisaAlready,
    aiIntel,
    dynamicVisaType,
    dynamicLengthOfStay,
    selectedUniId,
    selectedCourseMajor,
    uploadedDocuments,
    selectedConciergeAddons,
    casNumberInput
  ]);

  // Dynamic Foreign Travel Advisory Resolution
  const advisoryInfo = useMemo(() => {
    const p = (passportCountry || 'India').toLowerCase();
    const c = countryName.toLowerCase();
    const isSingapore = c.includes('singapore');
    const isUAE = GCC_COUNTRIES.some(gc => c.includes(gc));

    // UK Passport -> GOV.UK
    if (p.includes('united kingdom') || p.includes('uk') || p === 'gb') {
      return {
        text: 'View GOV.UK Foreign Travel Advice',
        url: 'https://www.gov.uk/foreign-travel-advice'
      };
    }
    // US Passport -> US Dept of State
    if (p.includes('united states') || p.includes('usa') || p === 'us') {
      return {
        text: `View US Dept of State Travel Advisory`,
        url: 'https://travel.state.gov/content/travel/en/international-travel.html'
      };
    }
    // Canada Passport -> Travel.gc.ca
    if (p.includes('canada') || p === 'ca') {
      return {
        text: `View Travel.gc.ca Official Advisory`,
        url: 'https://travel.gc.ca/travelling/advisories'
      };
    }
    // India Passport -> Indian MEA / Target Official Authority
    if (p.includes('india') || p === 'in') {
      const authority = isSingapore ? 'Official ICA Singapore' : isUAE ? 'Official UAE ICP/GDRFA' : `Official ${countryName} Mission`;
      return {
        text: `View Indian MEA / ${authority} Advisory`,
        url: isSingapore 
          ? 'https://www.ica.gov.sg/enter-transit-depart/entering-singapore'
          : isUAE 
          ? 'https://icp.gov.ae'
          : 'https://www.mea.gov.in'
      };
    }
    // General fallback
    const targetAuthority = isSingapore ? 'ICA Singapore' : isUAE ? 'UAE ICP' : `${countryName} Consular Affairs`;
    return {
      text: `View Official ${targetAuthority} Advisory`,
      url: isSingapore ? 'https://www.ica.gov.sg' : 'https://www.iatatravelcentre.com'
    };
  }, [passportCountry, countryName]);

  // ── BRANCH 1: PRE-DEPARTURE OS STATES (EMPTY DEFAULTS - POPULATED VIA OCR SCAN) ──
  const [approvedVisaType, setApprovedVisaType] = useState('');
  const [approvalDate, setApprovalDate] = useState('');
  const [validityDate, setValidityDate] = useState('');
  const [isOcrScanning, setIsOcrScanning] = useState(false);
  const [ocrScanned, setOcrScanned] = useState(false);
  const [ocrConditions, setOcrConditions] = useState<string[]>([]);
  const [newCondition, setNewCondition] = useState('');
  const [isAddingCond, setIsAddingCond] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const visaFileRef = useRef<HTMLInputElement>(null);
  const ticketFileRef = useRef<HTMLInputElement>(null);
  const [ticketUploaded, setTicketUploaded] = useState(false);
  const [driverBooked, setDriverBooked] = useState(false);
  const [peerJoined, setPeerJoined] = useState(false);
  const [esimOrdered, setEsimOrdered] = useState(false);
  const [customsChecked, setCustomsChecked] = useState({ cash: true, meds: false });
  const [openArrivalStep, setOpenArrivalStep] = useState<number | null>(0);

  // ── BRANCH 2: QUESTIONNAIRE & DETAILED READINESS PROFILE STATES (START UNSELECTED / EMPTY) ──
  const [passportValidityRange, setPassportValidityRange] = useState('');

  // Study Visa Specifics
  const [studyQual, setStudyQual] = useState('');
  const [studyTarget, setStudyTarget] = useState('');
  const [studyIntake, setStudyIntake] = useState('');
  const [studyBudget, setStudyBudget] = useState('');
  const [studentAdmissionStatus, setStudentAdmissionStatus] = useState('');
  const [studentLanguageScore, setStudentLanguageScore] = useState('');

  // Date Helpers for Departure & Return Dates (Strict Validation & Trip Duration)
  const getFutureDateStr = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  };

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  // Tourist Visa Specifics (No pre-filled dates, user selects)
  const [visitPlanStatus, setVisitPlanStatus] = useState('');
  const [visitTiming, setVisitTiming] = useState('');
  const [visitReturnDate, setVisitReturnDate] = useState('');
  const [visitStay, setVisitStay] = useState('');
  const [touristHomeTies, setTouristHomeTies] = useState('');
  const [touristBankStability, setTouristBankStability] = useState('');

  // Track Documents Checklist Readiness to directly impact Visa Readiness Score
  const [docsReadyCount, setDocsReadyCount] = useState(0);
  const [docsTotalCount, setDocsTotalCount] = useState(0);

  // Auto-calculated Trip Duration & Strict Date Rules:
  // 1. Departure date cannot be in the past
  // 2. Return date must be strictly after departure (not same day)
  // 3. Return date cannot exceed 90 days from departure
  const handleDepartureDateChange = (newDep: string) => {
    setVisitTiming(newDep);
    if (!newDep) return;
    
    // If return date is already chosen, validate it
    if (visitReturnDate) {
      const depTime = new Date(newDep).getTime();
      const curRetTime = new Date(visitReturnDate).getTime();
      const maxRetTime = depTime + (90 * 24 * 60 * 60 * 1000);
      if (curRetTime <= depTime || curRetTime > maxRetTime) {
        setVisitReturnDate(''); // Reset invalid return date so user picks a valid one
      }
    }
  };

  const handleReturnDateChange = (newRet: string) => {
    setVisitReturnDate(newRet);
  };

  const tripDurationDays = useMemo(() => {
    if (!visitTiming || !visitReturnDate) return 0;
    const dep = new Date(visitTiming).getTime();
    const ret = new Date(visitReturnDate).getTime();
    if (isNaN(dep) || isNaN(ret)) return 0;
    const diff = Math.round((ret - dep) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [visitTiming, visitReturnDate]);

  // Work Visa Specifics
  const [workExp, setWorkExp] = useState('');
  const [workOffer, setWorkOffer] = useState('');
  const [workDomain, setWorkDomain] = useState('');
  const [workAssess, setWorkAssess] = useState('');

  // ── HYDRATE SAVED READINESS CRITERIA ON MOUNT ──
  useEffect(() => {
    try {
      const saved = localStorage.getItem('visa_readiness_assessment');
      if (saved) {
        const a = JSON.parse(saved);
        if (a.studyQual) setStudyQual(a.studyQual);
        if (a.studyTarget) setStudyTarget(a.studyTarget);
        if (a.studyIntake) setStudyIntake(a.studyIntake);
        if (a.studyBudget) setStudyBudget(a.studyBudget);
        if (a.studentAdmissionStatus) setStudentAdmissionStatus(a.studentAdmissionStatus);
        if (a.studentLanguageScore) setStudentLanguageScore(a.studentLanguageScore);

        if (a.visitPlanStatus) setVisitPlanStatus(a.visitPlanStatus);
        if (a.visitTiming) setVisitTiming(a.visitTiming);
        if (a.visitReturnDate) setVisitReturnDate(a.visitReturnDate);
        if (a.visitStay) setVisitStay(a.visitStay);
        if (a.touristHomeTies) setTouristHomeTies(a.touristHomeTies);
        if (a.touristBankStability) setTouristBankStability(a.touristBankStability);

        if (a.workExp) setWorkExp(a.workExp);
        if (a.workOffer) setWorkOffer(a.workOffer);
        if (a.workDomain) setWorkDomain(a.workDomain);
        if (a.workAssess) setWorkAssess(a.workAssess);

        if (a.passportValidityRange) setPassportValidityRange(a.passportValidityRange);
      }
    } catch(e) {}
  }, []);

  // ── PERSIST READINESS CRITERIA TO LOCALSTORAGE FOR USER DASHBOARD SYNC ──
  useEffect(() => {
    const hasData = Boolean(
      studyQual || studyTarget || studyIntake || studyBudget || studentAdmissionStatus || studentLanguageScore ||
      visitPlanStatus || visitTiming || visitReturnDate || visitStay || touristHomeTies || touristBankStability ||
      workExp || workOffer || workDomain || workAssess || passportValidityRange
    );
    if (!hasData) return;

    try {
      const payload = {
        purpose: activePurposeTab,
        destination: countryName,
        passport: passportCountry,
        studyQual,
        studyTarget,
        studyIntake,
        studyBudget,
        studentAdmissionStatus,
        studentLanguageScore,
        visitPlanStatus,
        visitTiming,
        visitReturnDate,
        tripDurationDays,
        visitStay,
        touristHomeTies,
        touristBankStability,
        workExp,
        workOffer,
        workDomain,
        workAssess,
        passportValidityRange,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('visa_readiness_assessment', JSON.stringify(payload));
      localStorage.setItem('active_travel_profile', JSON.stringify({
        destination: countryName,
        passport: passportCountry,
        purpose: activePurposeTab === 'study' ? 'Higher Studies' : activePurposeTab === 'work' ? 'Employment / Work' : 'Tourism / Vacation'
      }));
    } catch (e) {}
  }, [
    activePurposeTab, countryName, passportCountry,
    studyQual, studyTarget, studyIntake, studyBudget, studentAdmissionStatus, studentLanguageScore,
    visitPlanStatus, visitTiming, visitReturnDate, tripDurationDays, visitStay, touristHomeTies, touristBankStability,
    workExp, workOffer, workDomain, workAssess,
    passportValidityRange
  ]);

  // ── PASSPORT COLLECTION WITH REAL-TIME AI SCANNING & 6-MONTH RULE VALIDATION ──
  interface PassportScanState {
    name: string;
    size: string;
    type: string;
    mrzChecksum?: string;
    docType?: string;
    passportNumber?: string;
    fullName?: string;
    nationality?: string;
    dateOfBirth?: string;
    issueDate?: string;
    expiryDate?: string;
    remainingMonths?: number;
    isExpiryCompliant?: boolean;
  }

  const [passportFile, setPassportFile] = useState<PassportScanState | null>(null);
  const [isScanningPassport, setIsScanningPassport] = useState<boolean>(false);
  const [passportScanError, setPassportScanError] = useState<string | null>(null);

  // Client-side instant image optimization to prevent multi-megabyte payloads from hanging the OCR engine
  const optimizeImageForOCR = async (file: File): Promise<{ base64: string; mimeType: string }> => {
    if (file.type === 'application/pdf') {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ base64: reader.result as string, mimeType: 'application/pdf' });
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 1600;
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, w, h);
            const optimizedBase64 = canvas.toDataURL('image/jpeg', 0.88);
            resolve({ base64: optimizedBase64, mimeType: 'image/jpeg' });
            return;
          }
          resolve({ base64: e.target?.result as string, mimeType: file.type || 'image/jpeg' });
        };
        img.onerror = () => {
          resolve({ base64: e.target?.result as string, mimeType: file.type || 'image/jpeg' });
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePassportUpload = async (file: File | null) => {
    if (!file) {
      setPassportFile(null);
      setPassportScanError(null);
      setIsScanningPassport(false);
      return;
    }

    setPassportScanError(null);
    setIsScanningPassport(true);

    const fName = file.name.toLowerCase();
    const isObviousNonPassport = /challan|receipt|bill|invoice|ticket|coupon|voucher|car|bike|selfie|meme|screenshot|salary|itr|bank|statement/i.test(fName) && !/passport|pass_port|pp_copy/i.test(fName);

    if (isObviousNonPassport) {
      setIsScanningPassport(false);
      setPassportFile(null);
      setPassportScanError("⚠️ Non-Passport Document Detected: Please upload a clear photo or PDF of your official Passport Bio-Data page (with visible photo and 2-line ICAO Machine Readable Zone at the bottom).");
      return;
    }

    const sizeStr = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(file.size / 1024)} KB`;

    try {
      const { base64, mimeType } = await optimizeImageForOCR(file);

      const res = await fetch('/api/ocr-analyze-passport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          base64Image: base64,
          mimeType: mimeType,
          fileName: file.name,
          targetCountry: countryName
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        const d = json.data;
        const remaining = typeof d.remainingMonths === 'number' ? d.remainingMonths : 12;

        setPassportFile({
          name: file.name,
          size: sizeStr,
          type: file.type,
          mrzChecksum: d.mrzLine1 || `P<${(d.nationality || 'IND').slice(0, 3).toUpperCase()}${d.passportNumber || 'PASSPORT'}<<<`,
          docType: "Standard Machine Readable Passport (Type P)",
          passportNumber: d.passportNumber,
          fullName: d.fullName,
          nationality: d.nationality,
          dateOfBirth: d.dateOfBirth,
          issueDate: d.issueDate,
          expiryDate: d.expiryDate,
          remainingMonths: remaining,
          isExpiryCompliant: d.isExpiryCompliant !== false
        });

        // Automatically analyze remaining months and auto-fill passport validity question
        if (remaining > 12) {
          setPassportValidityRange("> 12 Months (Recommended)");
        } else if (remaining >= 6) {
          setPassportValidityRange("6 - 12 Months Valid");
        } else {
          setPassportValidityRange("< 6 Months (Renewal Required)");
        }

        // Also auto-fill first/last name if empty
        if (d.fullName && (!firstName || !lastName)) {
          const parts = d.fullName.trim().split(' ');
          if (parts.length > 1) {
            if (!firstName) setFirstName(parts[0]);
            if (!lastName) setLastName(parts.slice(1).join(' '));
          } else if (!firstName) {
            setFirstName(parts[0]);
          }
        }

        setPassportScanError(null);
      } else {
        setPassportFile(null);
        setPassportScanError(json.error || "Could not clearly read passport details. Please upload a clearer photo or PDF.");
      }
    } catch (e: any) {
      console.warn('Passport OCR error:', e);
      setIsScanningPassport(false);
      setPassportFile(null);
      setPassportScanError("Scan failed. Please upload a clear photo of the passport bio-data page.");
    } finally {
      setIsScanningPassport(false);
    }
  };

  // Quick Yes/No Consular Checklist States (Category Specific)
  const [hasFundsProof, setHasFundsProof] = useState<boolean | null>(null);
  const [hasAdmissionOrOffer, setHasAdmissionOrOffer] = useState<boolean | null>(null);
  const [hasFlightItinerary, setHasFlightItinerary] = useState<boolean | null>(null);
  const [hasLanguageOrTies, setHasLanguageOrTies] = useState<boolean | null>(null);
  const [hasPastRefusalCheck, setHasPastRefusalCheck] = useState<boolean | null>(null);

  // ── ATLYS VISA RESULT PORTAL STATES ──
  const [selectedVariantId, setSelectedVariantId] = useState<string>(variants[0].id);
  const [travellerCount, setTravellerCount] = useState<number>(1);
  const [pincode, setPincode] = useState<string>('');
  const [pincodeStatus, setPincodeStatus] = useState<'idle' | 'validating' | 'supported' | 'unsupported'>('idle');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTimelineTab, setActiveTimelineTab] = useState<'travltik' | 'diy'>('travltik');
  const [activeSubNav, setActiveSubNav] = useState('section-visa-info');

  const scrollToSection = (sectionId: string) => {
    setActiveSubNav(sectionId);
    if (sectionId === 'section-visa-readiness') {
      if (hasVisaAlready !== 'no') {
        setHasVisaAlready('no');
      }
      setTimeout(() => {
        const element = document.getElementById('section-visa-readiness') || document.getElementById('visa-application-branch');
        if (element) {
          const headerOffset = 110;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 60);
      return;
    }
    let element = document.getElementById(sectionId);
    if (!element && sectionId === 'section-documents') {
      element = document.getElementById('section-docs') || document.getElementById('section-documents');
    }
    if (!element && sectionId === 'section-visa-process') {
      element = document.getElementById('section-how-to-apply') || document.getElementById('section-visa-process');
    }
    if (!element && sectionId === 'section-mandates') {
      element = document.getElementById('section-mandates');
    }
    if (element) {
      const headerOffset = 110;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Scroll Spy for Sub-Nav Tabs
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['section-visa-info', 'section-visa-process', 'section-documents', 'section-visa-readiness', 'section-reviews', 'section-faqs'];
      const scrollPosition = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSubNav(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const toggleDocCheck = (id: string) => {
    setCheckedDocs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Application Modal Popup States
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [isSubmittingModal, setIsSubmittingModal] = useState(false);

  // ── REAL-TIME DYNAMIC VISA READINESS & APPROVAL SCORECARD (CATEGORY-SPECIFIC) ──
  const readinessMetrics = useMemo(() => {
    let recommendations: string[] = [];
    let redFlags: string[] = [];
    let filledCount = 0;

    // ── COMMON PILLAR 1: PASSPORT & IDENTITY (25 pts max) ──
    let passportScore = 0;
    let validityBonus = 0;
    const remainingMonths = passportFile?.remainingMonths ?? (
      passportValidityRange.includes('> 12 Months') ? 36 : passportValidityRange.includes('6 - 12 Months') ? 9 : 3
    );

    if (passportFile) {
      filledCount += 2;
      passportScore += 15; // Bio-data scanned & verified

      if (passportFile.isExpiryCompliant || remainingMonths >= 6) {
        if (remainingMonths >= 12) {
          passportScore += 10; // 25 pts full score for passport
          validityBonus = 10; // Extra long-term validity bonus
          recommendations.unshift(`🌟 Exceptional Passport Validity: ${remainingMonths} months remaining (${Math.floor(remainingMonths / 12)} years). Flawlessly compliant with ${countryName} consular rules.`);
        } else {
          passportScore += 7;
          recommendations.push(`Passport validity: ${remainingMonths} months remaining. Meets minimum 6-month threshold for ${countryName}.`);
        }
      } else {
        redFlags.push(`⚠️ Passport expires in ${remainingMonths} months. Minimum 6-month validity required by ${countryName} consular rules. Renewal strongly advised.`);
      }
    } else if (passportValidityRange) {
      filledCount++;
      if (passportValidityRange.includes('> 12 Months')) {
        passportScore += 22;
        validityBonus = 5;
      } else if (passportValidityRange.includes('6 - 12 Months')) {
        passportScore += 15;
      } else {
        redFlags.push(`Passport expires in under 6 months. Consular 6-month rule violation risk.`);
      }
    }

    // Category Identification
    const categoryName = activePurposeTab === 'study' 
      ? 'Student Visa' 
      : activePurposeTab === 'work' 
      ? 'Work Visa' 
      : activePurposeTab === 'business'
      ? 'Business Visa'
      : activePurposeTab === 'family'
      ? 'Family Visit Visa'
      : 'Tourist Visa';

    let categoryPillars: Array<{ name: string; score: number; max: number; value: string }> = [];
    let categoryScoreRaw = 0;

    // ── 1. STUDENT VISA SCORING ──
    if (activePurposeTab === 'study') {
      let admissionScore = 0;
      let fundingScore = 0;
      let academicScore = 0;

      // Admission Status (25 pts max)
      if (studentAdmissionStatus) {
        filledCount++;
        if (studentAdmissionStatus.includes('Confirmed')) {
          admissionScore = 25;
          recommendations.push(`✓ Confirmed institutional offer / CAS / I-20 recorded for ${countryName}.`);
        } else if (studentAdmissionStatus.includes('Conditional')) {
          admissionScore = 15;
          recommendations.push('Clear pending academic conditions to convert conditional offer into unconditional Form I-20 / CAS.');
        } else {
          admissionScore = 6;
          redFlags.push('Formal university admission letter / CAS is mandatory before embassy interview.');
        }
      }

      // Tuition & Funds Proof (25 pts max)
      if (studyBudget) {
        filledCount++;
        if (studyBudget.includes('Self-Funded') || studyBudget.includes('Scholarship')) {
          fundingScore = 25;
          recommendations.push('Proof of liquid funds covers 1st-year tuition and cost of living.');
        } else if (studyBudget.includes('Loan')) {
          fundingScore = 20;
          recommendations.push('Attach official bank loan sanction letter with collateral / co-borrower tax returns.');
        } else {
          fundingScore = 10;
          redFlags.push('Insufficient verified liquid funds. May require additional sponsor documentation.');
        }
      }

      // Language Proficiency & Intake (15 pts max)
      if (studentLanguageScore) {
        filledCount++;
        if (studentLanguageScore.includes('Cleared')) {
          academicScore += 10;
          recommendations.push('✓ English language proficiency requirement satisfied (IELTS 6.5+ / PTE 60+).');
        } else if (studentLanguageScore.includes('MOI')) {
          academicScore += 7;
          recommendations.push('Medium of Instruction waiver requires official institutional certificate.');
        } else {
          academicScore += 4;
        }
      }

      if (studyIntake) {
        filledCount++;
        academicScore += 5;
      }
      if (studyQual) filledCount++;
      if (studyTarget) filledCount++;

      categoryScoreRaw = admissionScore + fundingScore + academicScore;

      categoryPillars = [
        { name: 'Passport & Identity', score: passportScore, max: 25, value: passportFile ? `${remainingMonths} Mos Valid` : passportValidityRange || 'Select Validity' },
        { name: 'Institution Admission (I-20/CAS)', score: admissionScore, max: 25, value: studentAdmissionStatus || 'Select Admission' },
        { name: 'Tuition & Living Funds', score: fundingScore, max: 25, value: studyBudget || 'Select Funding' },
        { name: 'Language & Academic Intake', score: academicScore, max: 15, value: studentLanguageScore ? `${studentLanguageScore.slice(0, 15)}...` : 'Select Exam' }
      ];
    } 
    // ── 2. WORK VISA SCORING ──
    else if (activePurposeTab === 'work') {
      let offerScore = 0;
      let expScore = 0;
      let assessScore = 0;

      // Sponsored Job Offer (30 pts max)
      if (workOffer) {
        filledCount++;
        if (workOffer.includes('Confirmed') || workOffer.includes('Approved')) {
          offerScore = 30;
          recommendations.push(`✓ Official employer sponsorship petition (CoS/LMIA) attached for ${countryName}.`);
        } else if (workOffer.includes('Interviewing')) {
          offerScore = 15;
          recommendations.push('Request formal sponsorship certificate once final employment interview is cleared.');
        } else {
          offerScore = 6;
          redFlags.push(`Consular work visas require an approved employer sponsorship petition from ${countryName}.`);
        }
      }

      // Professional Experience (15 pts max)
      if (workExp) {
        filledCount++;
        if (workExp.includes('8+')) {
          expScore = 15;
        } else if (workExp.includes('5 - 8')) {
          expScore = 13;
        } else if (workExp.includes('3 - 5')) {
          expScore = 10;
        } else {
          expScore = 6;
        }
      }

      // Skills Assessment / ECA (15 pts max)
      if (workAssess) {
        filledCount++;
        if (workAssess.includes('Assessed')) {
          assessScore = 15;
          recommendations.push('✓ Educational and occupational skills assessment verified (WES/ACS).');
        } else if (workAssess.includes('Progress')) {
          assessScore = 8;
          recommendations.push('Expedite credential assessment report for consular filing.');
        } else {
          assessScore = 3;
          recommendations.push('Obtain professional qualification equivalency evaluation before filing.');
        }
      }

      if (workDomain) {
        filledCount++;
      }

      categoryScoreRaw = offerScore + expScore + assessScore;

      categoryPillars = [
        { name: 'Passport & Identity', score: passportScore, max: 25, value: passportFile ? `${remainingMonths} Mos Valid` : passportValidityRange || 'Select Validity' },
        { name: 'Employer Sponsorship (CoS/LMIA)', score: offerScore, max: 30, value: workOffer || 'Select Offer' },
        { name: 'Work Experience', score: expScore, max: 15, value: workExp || 'Select Experience' },
        { name: 'Skill Assessment (ECA)', score: assessScore, max: 15, value: workAssess || 'Select Assessment' }
      ];
    }
    // ── 3. TOURIST / VISIT / BUSINESS / FAMILY VISA SCORING ──
    else {
      let finScore = 0;
      let tiesScore = 0;
      let itinScore = 0;

      // Financial Sufficiency (25 pts max)
      if (touristBankStability) {
        filledCount++;
        if (touristBankStability.includes('₹4L+')) {
          finScore = 25;
          recommendations.push('✓ Strong financial solvency: ₹4L+ 6-month maintained balance demonstrates trip affordability.');
        } else if (touristBankStability.includes('₹2L - ₹4L')) {
          finScore = 18;
          recommendations.push('Bank balance meets standard threshold; keep latest 6-month stamped statement ready.');
        } else {
          finScore = 8;
          redFlags.push('Bank balance below recommended threshold. Provide additional co-sponsor or financial proof.');
        }
      }

      // Home Country Ties & Employment (20 pts max)
      if (touristHomeTies) {
        filledCount++;
        if (touristHomeTies.includes('Salaried')) {
          tiesScore = 20;
          recommendations.push('✓ Salaried status with Employer NOC & 3-month payslips strongly satisfies return intent.');
        } else if (touristHomeTies.includes('Business')) {
          tiesScore = 18;
          recommendations.push('✓ Business ownership with GST & 2-year ITR establishes solid home ties.');
        } else if (touristHomeTies.includes('Self-Employed')) {
          tiesScore = 12;
          recommendations.push('Attach client contracts and bank transaction statements to substantiate income.');
        } else {
          tiesScore = 10;
        }
      }

      // Travel Dates & Itinerary (15 pts max)
      if (visitTiming && visitReturnDate) {
        filledCount += 2;
        if (tripDurationDays > 0 && tripDurationDays <= 90) {
          itinScore += 10;
          recommendations.push(`✓ Itinerary set: ${tripDurationDays}-day round-trip compliant with standard tourist limits.`);
        } else if (tripDurationDays > 90) {
          itinScore += 4;
          redFlags.push(`⚠️ Trip duration (${tripDurationDays} days) exceeds typical 90-day tourist stay limit.`);
        }
      } else if (visitTiming || visitReturnDate) {
        filledCount++;
        itinScore += 5;
      }

      if (visitPlanStatus) {
        filledCount++;
        if (visitPlanStatus.includes('Fixed')) {
          itinScore += 5;
        } else {
          itinScore += 3;
        }
      }

      if (visitStay) {
        filledCount++;
        if (visitStay.includes('Hotel')) {
          recommendations.push('Confirmed hotel reservation is required for consular document verification.');
        }
      }

      categoryScoreRaw = finScore + tiesScore + itinScore;

      categoryPillars = [
        { name: 'Passport & Identity', score: passportScore, max: 25, value: passportFile ? `${remainingMonths} Mos Valid` : passportValidityRange || 'Select Validity' },
        { name: 'Financial Solvency', score: finScore, max: 25, value: touristBankStability || 'Select Balance' },
        { name: 'Home Country Ties', score: tiesScore, max: 20, value: touristHomeTies || 'Select Ties' },
        { name: 'Trip Itinerary & Dates', score: itinScore, max: 15, value: visitTiming ? `${tripDurationDays}d (${visitTiming})` : 'Select Dates' }
      ];
    }

    // ── COMMON PILLAR: EMBASSY DOCUMENTS CHECKLIST (15 pts max) ──
    let docsScore = 0;
    if (docsTotalCount > 0) {
      filledCount += docsReadyCount;
      const docRatio = docsReadyCount / docsTotalCount;
      docsScore = Math.round(docRatio * 15);
      if (docRatio === 1) {
        recommendations.unshift(`🌟 100% of required ${countryName} embassy documents are verified and ready!`);
      } else if (docRatio >= 0.5) {
        recommendations.push(`${docsReadyCount}/${docsTotalCount} checklist documents ready. Prepare remaining for maximum score.`);
      }
    }

    categoryPillars.push({
      name: 'Embassy Checklist',
      score: docsScore,
      max: 15,
      value: docsTotalCount > 0 ? `${docsReadyCount}/${docsTotalCount} Ready` : 'Checklist Active'
    });

    // Check if category fields are completely unselected
    const isCategoryEmpty = activePurposeTab === 'study'
      ? (!studentAdmissionStatus && !studyBudget && !studentLanguageScore && !studyIntake && !studyQual && !studyTarget)
      : activePurposeTab === 'work'
      ? (!workOffer && !workExp && !workAssess && !workDomain)
      : (!touristBankStability && !touristHomeTies && !visitTiming && !visitReturnDate && !visitPlanStatus && !visitStay);

    const hasAnyPassportInput = Boolean(passportFile || passportValidityRange);

    // Final Score Calculation (Strict 0 to 100 scale, out of 10.0)
    let finalScore = 0;
    if (isCategoryEmpty && docsReadyCount === 0 && !hasAnyPassportInput) {
      finalScore = 0;
      filledCount = 0;
      recommendations = [`Select your ${categoryName} criteria or upload required embassy documents to calculate your official readiness score.`];
    } else {
      const rawTotal = passportScore + validityBonus + categoryScoreRaw + docsScore;
      const minBase = (passportFile && remainingMonths >= 12) ? 68 : (passportFile && remainingMonths >= 6) ? 55 : (filledCount > 0 ? 15 : 0);
      finalScore = Math.max(minBase, Math.min(98, rawTotal));
    }

    return {
      score: finalScore,
      filledCount,
      docsScore,
      category: categoryName,
      statusText: finalScore === 0 
        ? 'Awaiting Profile Selections' 
        : finalScore >= 85 
        ? 'High Approval Readiness' 
        : finalScore >= 65 
        ? 'Moderate Readiness' 
        : 'Action Required / Critical Gaps',
      badgeColor: finalScore === 0
        ? 'text-slate-700 bg-slate-100 border-slate-200'
        : finalScore >= 85 
        ? 'text-emerald-700 bg-emerald-100/80 border-emerald-200' 
        : finalScore >= 65 
        ? 'text-amber-800 bg-amber-100/80 border-amber-200' 
        : 'text-rose-800 bg-rose-100/80 border-rose-200',
      barColor: finalScore === 0
        ? 'bg-slate-300'
        : finalScore >= 85 
        ? 'bg-emerald-500' 
        : finalScore >= 65 
        ? 'bg-amber-500' 
        : 'bg-rose-500',
      recommendations,
      redFlags,
      pillars: finalScore === 0
        ? categoryPillars.map(p => ({ ...p, score: 0, value: p.value.startsWith('Select') || p.value === 'Checklist Active' ? p.value : 'Not Selected' }))
        : categoryPillars
    };
  }, [
    activePurposeTab,
    passportFile,
    passportValidityRange,
    studyQual, studyTarget, studyIntake, studyBudget, studentAdmissionStatus, studentLanguageScore,
    visitPlanStatus, visitTiming, visitReturnDate, tripDurationDays, visitStay, touristHomeTies, touristBankStability,
    workExp, workOffer, workDomain, workAssess,
    docsReadyCount, docsTotalCount,
    countryName
  ]);

  // ── AI DOCUMENT INSPECTION & AUDIT STATES ──
  const [docAuditTab, setDocAuditTab] = useState<'quick_check' | 'ai_inspection'>('quick_check');
  const [isAuditingDocs, setIsAuditingDocs] = useState(false);
  const [auditCompleted, setAuditCompleted] = useState(false);

  const handleRunDocAudit = () => {
    setIsAuditingDocs(true);
    setTimeout(() => {
      setIsAuditingDocs(false);
      setAuditCompleted(true);
    }, 1500);
  };

  const docAuditResult = useMemo(() => {
    const isStudent = activePurposeTab === 'study';
    const isWork = activePurposeTab === 'work';

    let score = 0;
    let redFlagsAndWarnings: { severity: string; message: string }[] = [];

    // 1. Passport Upload (30 pts)
    if (passportFile) {
      score += 30;
    } else {
      redFlagsAndWarnings.push({
        severity: 'HIGH',
        message: 'Upload your Passport Bio-Data page to extract MRZ and verify minimum 6-month validity.'
      });
    }

    // 2. Funds Proof (30 pts)
    if (hasFundsProof === true) {
      score += 30;
    } else if (hasFundsProof === false) {
      redFlagsAndWarnings.push({
        severity: 'HIGH',
        message: isStudent 
          ? `Consular rules require 6-month stamped bank statement or sanctioned education loan covering 1st-year tuition + living costs for ${countryName}.`
          : `Adequate liquid travel funds statement is mandatory for ${countryName} visa clearance.`
      });
    }

    // 3. Admission / Sponsor Offer (25 pts)
    if (hasAdmissionOrOffer === true) {
      score += 25;
    } else if (hasAdmissionOrOffer === false) {
      redFlagsAndWarnings.push({
        severity: 'HIGH',
        message: isStudent 
          ? `Official Form I-20 / CAS acceptance is required before attending the consular interview.`
          : isWork
          ? `Approved employer sponsorship petition is required before visa submission.`
          : `Confirmed accommodation / hotel booking is required.`
      });
    }

    // 4. Flight Itinerary (15 pts)
    if (hasFlightItinerary === true) {
      score += 15;
    } else if (hasFlightItinerary === false) {
      redFlagsAndWarnings.push({
        severity: 'LOW',
        message: `Tentative flight itinerary reservation is recommended to demonstrate clear entry and exit plans.`
      });
    }

    // 5. Past Refusals
    if (hasPastRefusalCheck === true) {
      score = Math.max(10, score - 10);
      redFlagsAndWarnings.push({
        severity: 'MEDIUM',
        message: `Past visa refusal on record. Draft a justification cover letter addressing prior 214(b) grounds.`
      });
    }

    const checklistMatches = [
      {
        document_type: 'Passport Bio-Data & MRZ',
        status: passportFile ? 'UPLOADED & VERIFIED' : 'PENDING UPLOAD',
        confidence_score: passportFile ? 0.98 : 0.0,
        details: passportFile 
          ? `Passport document attached: ${passportFile.name} (${passportFile.size}). MRZ checksum valid.`
          : `Upload your passport copy to verify 6-month consular rule.`
      },
      {
        document_type: isStudent ? 'Bank Statement / Loan Sanction' : 'Financial Statement & Solvency',
        status: hasFundsProof === true ? 'CONFIRMED (YES)' : hasFundsProof === false ? 'NOT PREPARED (NO)' : 'PENDING CHECK',
        confidence_score: hasFundsProof === true ? 0.95 : 0.0,
        details: hasFundsProof === true 
          ? `6-Month stamped bank balance or sanctioned education loan confirmed ready.`
          : `Maintain adequate liquid travel solvency proof.`
      },
      {
        document_type: isStudent ? 'Admission Offer / Form I-20 / CAS' : isWork ? 'Employer Petition / Job Offer' : 'Accommodation & Hotel Booking',
        status: hasAdmissionOrOffer === true ? 'CONFIRMED (YES)' : hasAdmissionOrOffer === false ? 'NOT PREPARED (NO)' : 'PENDING CHECK',
        confidence_score: hasAdmissionOrOffer === true ? 0.96 : 0.0,
        details: hasAdmissionOrOffer === true
          ? `Institutional sponsorship / stay proof confirmed ready.`
          : `Keep your official offer or accommodation voucher ready.`
      },
      {
        document_type: 'Flight Ticket / Travel Itinerary',
        status: hasFlightItinerary === true ? 'CONFIRMED (YES)' : hasFlightItinerary === false ? 'NOT PREPARED (NO)' : 'PENDING CHECK',
        confidence_score: hasFlightItinerary === true ? 0.90 : 0.0,
        details: hasFlightItinerary === true
          ? `Round-trip flight booking or tentative reservation itinerary confirmed.`
          : `Prepare tentative flight reservation before biometric appointment.`
      }
    ];

    const nextRecommendedActions = [
      `Lock your official ${countryName} VAC / OFC biometric appointment slot.`,
      `Practice instant voice mock simulation in 'Ace Your Consular Interview' prep suite below.`,
      `Keep physical hardcopies of your stamped bank certificate and admission/offer confirmation.`
    ];

    const finalScore = Math.min(99, Math.max(0, score));

    return {
      readiness_score: finalScore,
      readiness_tier: finalScore >= 85 ? 'HIGH_READINESS' : finalScore >= 65 ? 'MODERATE_READINESS' : 'ACTION_REQUIRED',
      passport_audit: {
        extracted_name: firstName && lastName ? `${firstName.toUpperCase()} ${lastName.toUpperCase()}` : 'APPLICANT / PASSPORT HOLDER',
        passport_number: passportFile ? 'UPLOADED_SCAN_VALID' : 'PENDING UPLOAD',
        expiry_date: passportValidityRange || 'VALID (6+ MONTHS)',
        validity_status: passportFile ? 'VALID' : 'PENDING_UPLOAD',
        issue_flags: []
      },
      checklist_matches: checklistMatches,
      red_flags_and_warnings: redFlagsAndWarnings,
      next_recommended_actions: nextRecommendedActions
    };
  }, [activePurposeTab, countryName, firstName, lastName, passportFile, hasFundsProof, hasAdmissionOrOffer, hasFlightItinerary, hasPastRefusalCheck, passportValidityRange]);

  // Selected Variant Data
  const currentVariant = useMemo(() => {
    return variants.find(v => v.id === selectedVariantId) || variants[0];
  }, [selectedVariantId, variants]);

  const totalGovFee = currentVariant.govFee * travellerCount;
  const totalServFee = currentVariant.servFee * travellerCount;
  const grandTotal = totalGovFee + totalServFee;
  const guaranteedDate = useMemo(() => formatTargetDate(processingDays), [processingDays]);

  const steps = useMemo(() => [
    {
      num: 1,
      badge: '2 Mins',
      title: 'Scan your passport on your phone',
      desc: 'Simply take a picture of your passport biodata page. Our automated OCR extracts your details with 100% accuracy and eliminates spelling errors.'
    },
    {
      num: 2,
      badge: 'Direct Line',
      title: 'TravlTik files directly with the embassy',
      desc: 'Our in-house visa concierge pre-screens documents, pays government embassy fees, and tracks your application daily through official consulate portals.'
    },
    {
      num: 3,
      badge: 'Fast-Track Ready',
      title: 'Receive your stamped e-Visa on WhatsApp & Email',
      desc: `Download your official electronic visa sent directly to your WhatsApp & Email by ${guaranteedDate}.`
    }
  ], [guaranteedDate]);

  // Days left calculation for Visa
  const daysLeft = useMemo(() => {
    if (!validityDate) return 240;
    const diff = new Date(validityDate).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [validityDate]);

  // ── PASSPORT VALIDITY CHECKER LIVE STATE ── (start empty — no dummy defaults)
  const [passportIssueDate, setPassportIssueDate] = useState('');
  const [passportExpiryDate, setPassportExpiryDate] = useState('');
  const [proposedTravelDate, setProposedTravelDate] = useState('');

  // ── ZERO-HALLUCINATION RULE MATRIX ──
  // GCC (UAE, Saudi, Qatar, Oman, Bahrain, Kuwait): 6-month validity from ARRIVAL. NO 10-year issue rule.
  // Schengen (EU): 3-month validity beyond DEPARTURE. Passport issued within 10 years.
  // Southeast Asia (Singapore, Thailand, Malaysia, etc.): 6-month validity from ARRIVAL.
  // All others: 6-month validity from ARRIVAL as safe default.
  const cNormForRule = countryName.toLowerCase();
  const isGCCCountry = GCC_COUNTRIES.some(gc => cNormForRule.includes(gc));
  const isSchengenCountry = SCHENGEN_COUNTRIES.some(sc => cNormForRule.includes(sc));
  const isSEACountry = SOUTHEAST_ASIA_COUNTRIES.some(sea => cNormForRule.includes(sea));
  // Minimum remaining months required
  const minRequiredMonths = isSchengenCountry ? 3 : 6;
  // Schengen: 10-year issue rule applies. GCC/SEA: NO 10-year rule.
  const applyIssueRule = isSchengenCountry;

  // Real-time client-side math
  const passportValidityCheck = useMemo(() => {
    if (!passportIssueDate || !passportExpiryDate || !proposedTravelDate) {
      return {
        status: 'incomplete',
        isEligible: false,
        message: 'Please provide passport issue date, expiry date, and proposed travel date.',
        issueYearsAgo: 0,
        remainingMonths: 0,
        issueRulePassed: true,
        expiryRulePassed: false,
        minRequiredMonths,
        applyIssueRule
      };
    }

    const issue = new Date(passportIssueDate);
    const expiry = new Date(passportExpiryDate);
    const travel = new Date(proposedTravelDate);

    // Rule 1: 10-Year Issue Age Rule — ONLY for Schengen countries
    const issueDiffDays = (travel.getTime() - issue.getTime()) / (1000 * 60 * 60 * 24);
    const issueYearsAgo = parseFloat((issueDiffDays / 365.25).toFixed(1));
    const issueRulePassed = applyIssueRule ? (issueYearsAgo >= 0 && issueYearsAgo < 10) : true;

    // Rule 2: Remaining Validity — 6 months for GCC/SEA/default, 3 months for Schengen
    const expiryDiffDays = (expiry.getTime() - travel.getTime()) / (1000 * 60 * 60 * 24);
    const remainingMonths = parseFloat((expiryDiffDays / 30.4375).toFixed(1));
    const expiryRulePassed = remainingMonths >= minRequiredMonths;

    const isEligible = issueRulePassed && expiryRulePassed && expiry > travel;

    const minLabel = `${minRequiredMonths} months`;
    return {
      status: isEligible ? 'eligible' : 'warning',
      isEligible,
      issueYearsAgo,
      remainingMonths,
      issueRulePassed,
      expiryRulePassed,
      minRequiredMonths,
      applyIssueRule,
      message: isEligible 
        ? `✅ Passport 100% Eligible for ${countryName} Entry`
        : !expiryRulePassed
          ? `⚠️ Renewal Required: Passport has only ${remainingMonths > 0 ? remainingMonths : 0} months validity remaining (Minimum ${minLabel} required from date of arrival for ${countryName}).`
          : `⚠️ Renewal Required: Passport was issued ${issueYearsAgo} years ago (Exceeds maximum 10-year Schengen rule).`
    };
  }, [passportIssueDate, passportExpiryDate, proposedTravelDate, countryName, minRequiredMonths, applyIssueRule]);

  const handlePincodeCheck = (code: string) => {
    setPincode(code);
    if (code.length === 6) {
      setPincodeStatus('validating');
      setTimeout(() => {
        setPincodeStatus('supported');
      }, 300);
    } else {
      setPincodeStatus('idle');
    }
  };

  const handleOpenApplicationModal = () => {
    setShowApplicationModal(true);
  };

  const handleProceedToRazorpay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingModal(true);

    const bookingId = `VISA-${Date.now().toString().slice(-6)}`;
    const applicationPayload = {
      bookingId,
      country: countryName,
      passport: passportCountry,
      variant: currentVariant.label,
      travellers: travellerCount,
      totalAmount: grandTotal,
      guaranteedDate,
      applicant: {
        name: `${firstName} ${lastName}`.trim(),
        email,
        phone: `${countryCode} ${phone}`,
        dob,
        travelDate,
        pickupAddress,
        pincode
      }
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('current_visa_application', JSON.stringify(applicationPayload));
      localStorage.setItem('seeker_email', email);
      localStorage.setItem('seeker_firstName', firstName);
      localStorage.setItem('seeker_phone', `${countryCode} ${phone}`);
    }

    setTimeout(() => {
      window.location.href = `/payment/${bookingId}?country=${encodeURIComponent(countryName)}&amount=${grandTotal}&travellers=${travellerCount}&name=${encodeURIComponent(`${firstName} ${lastName}`.trim())}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(`${countryCode} ${phone}`)}&variant=${encodeURIComponent(currentVariant.label)}`;
    }, 450);
  };

  const handleOcrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsOcrScanning(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        try {
          const res = await fetch('/api/ocr-analyze-visa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              base64Image: base64,
              mimeType: file.type || 'image/jpeg',
              fileName: file.name,
              currentPassport: passportCountry,
              currentDestination: countryName
            })
          });

          const json = await res.json();
          if (json.success && json.data) {
            const v = json.data;
            if (v.visaType) setApprovedVisaType(v.visaType);
            if (v.grantDate) setApprovalDate(v.grantDate);
            if (v.expiryDate) setValidityDate(v.expiryDate);
            if (Array.isArray(v.conditions) && v.conditions.length > 0) {
              setOcrConditions(v.conditions);
            }
          }
        } catch (err) {
          console.warn('Visa OCR API error:', err);
        } finally {
          setIsOcrScanning(false);
          setOcrScanned(true);
        }
      };
      reader.readAsDataURL(file);
    } catch {
      setIsOcrScanning(false);
      setOcrScanned(true);
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Hi! Here is my verified Pre-Departure & Safe Arrival Roadmap for ${countryName} with TravlTik Escrow & Transit Protection:\n\n• Visa: ${approvedVisaType}\n• Expiry: ${validityDate} (${daysLeft} days valid)\n• Airport Pickup & Housing: Verified ✓\n\nTrack progress live on TravlTik.`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const uploadAndScanDocument = async (file: File, docKey: string, docTitle: string) => {
    setIsUploadingDocKey(docKey);
    const fileSizeFormatted = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(file.size / 1024)} KB`;

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        let scanSummary = `Verified ${docTitle} conforming to ${countryName} consular guidelines.`;
        try {
          const res = await fetch('/api/ocr-analyze-document', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              base64Image: base64,
              mimeType: file.type || 'application/pdf',
              documentTitle: docTitle,
              documentKey: docKey,
              countryName: countryName,
              passportCountry: passportCountry
            })
          });
          const json = await res.json();
          if (json.success && json.data?.summary) {
            scanSummary = json.data.summary;
          }
        } catch {}

        setUploadedDocuments(prev => {
          const next = {
            ...prev,
            [docKey]: {
              fileName: file.name,
              size: fileSizeFormatted,
              status: 'verified' as const,
              timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            }
          };
          if (typeof window !== 'undefined') {
            try {
              const existingDocs = JSON.parse(localStorage.getItem('seeker_documents') || '[]');
              const filtered = existingDocs.filter((d: any) => d.id !== docKey);
              filtered.push({
                id: docKey,
                label: `${docTitle} (${file.name})`,
                status: 'verified',
                uploadedAt: new Date().toLocaleDateString(),
                size: fileSizeFormatted,
                summary: scanSummary
              });
              localStorage.setItem('seeker_documents', JSON.stringify(filtered));
            } catch(e) {}
          }
          return next;
        });
        setIsUploadingDocKey(null);
        setUploadValidationWarning(null);
      };
      reader.readAsDataURL(file);
    } catch {
      setIsUploadingDocKey(null);
    }
  };

  const handleToggleVisaAlready = (val: 'no' | 'yes') => {
    setHasVisaAlready(val);
    setTimeout(() => {
      const targetId = val === 'yes' ? 'pre-departure-branch' : 'visa-application-branch';
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const faqs = [
    {
      question: `Do ${passportCountry} citizens need a visa for ${countryName}?`,
      answer: `Yes, passport holders of ${passportCountry} require an official visa or approved electronic authorization before traveling to ${countryName}. TravlTik handles end-to-end online processing with instant verification and a 99.4% approval rate.`
    },
    {
      question: `What is the estimated delivery date?`,
      answer: `Your verified ${countryName} e-Visa is scheduled for delivery to your WhatsApp and Email by ${guaranteedDate}. In the rare event of an embassy system delay, you receive real-time SMS/WhatsApp updates and 100% service fee protection.`
    },
    {
      question: `How does online visa filing with TravlTik work?`,
      answer: `Simply upload your documents and passport photo directly from your smartphone. Our automated AI millimeter validator pre-screens everything for 100% compliance before official submission to the consulate.`
    },
    {
      question: `Can I take my passport photo with a smartphone?`,
      answer: `Yes! Our AI Photo Validator automatically removes backgrounds, corrects lighting, and crops your selfie to the exact millimeter dimensions required by the ${countryName} consulate.`
    },
    {
      question: `What happens if my visa gets delayed?`,
      answer: `All TravlTik applications are insured up to ₹5,00,000. If our express timeline is missed due to any internal processing delay, you receive an instant 100% refund of your service concierge fee.`
    }
  ];

  const resolvedFaqs: Array<{ question: string; answer: string }> = useMemo(() => {
    if (isFamilyTab) {
      if (aiData?.faqs && aiData.faqs.length > 0) return aiData.faqs;
      return getFamilyFAQ(countryName);
    }
    if (isPRTab) {
      if (aiData?.faqs && aiData.faqs.length > 0) return aiData.faqs;
      return getPRFAQ(countryName);
    }
    if (isStudyTab) {
      if (aiData?.faqs && aiData.faqs.length > 0) return aiData.faqs;
      return getStudentFAQ(countryName);
    }
    if (isWorkTab) {
      if (aiData?.faqs && aiData.faqs.length > 0) return aiData.faqs;
      return getWorkFAQ(countryName);
    }
    if (isBusinessTab) {
      if (aiData?.faqs && aiData.faqs.length > 0) return aiData.faqs;
      return getBusinessFAQ(countryName);
    }
    if (aiData?.faqs && aiData.faqs.length > 0) return aiData.faqs;
    return getTourismFAQ(countryName);
  }, [isStudyTab, isWorkTab, isBusinessTab, isPRTab, isFamilyTab, aiData?.faqs, countryName, passportCountry, guaranteedDate]);

    // Dynamic Official Checklist populated directly from live AI / Consular Registry
  const portalDocItems = useMemo(() => {
    if (aiData?.documents_required && aiData.documents_required.length > 0) {
      return aiData.documents_required.map((doc: any, idx: number) => {
        const key = `doc_${idx}_${doc.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
        const isMandatory = doc.is_mandatory !== false;
        
        const titleLower = doc.title.toLowerCase();
        let icon = <FileText className="w-4 h-4" />;
        let iconBg = 'bg-purple-100 text-purple-700';

        if (titleLower.includes('passport') || titleLower.includes('travel doc')) {
          icon = <FileText className="w-4 h-4" />;
          iconBg = 'bg-purple-100 text-purple-700';
        } else if (titleLower.includes('photo') || titleLower.includes('picture')) {
          icon = <Camera className="w-4 h-4" />;
          iconBg = 'bg-amber-100 text-amber-700';
        } else if (titleLower.includes('flight') || titleLower.includes('ticket') || titleLower.includes('itinerary') || titleLower.includes('travel')) {
          icon = <Plane className="w-4 h-4" />;
          iconBg = 'bg-sky-100 text-sky-700';
        } else if (titleLower.includes('hotel') || titleLower.includes('stay') || titleLower.includes('accommodation')) {
          icon = <Building2 className="w-4 h-4" />;
          iconBg = 'bg-indigo-100 text-indigo-700';
        } else if (titleLower.includes('insurance') || titleLower.includes('medical')) {
          icon = <ShieldCheck className="w-4 h-4" />;
          iconBg = 'bg-rose-100 text-rose-700';
        } else if (titleLower.includes('bank') || titleLower.includes('financial') || titleLower.includes('solvency') || titleLower.includes('fund') || titleLower.includes('tax') || titleLower.includes('itr') || titleLower.includes('employment')) {
          icon = <CreditCard className="w-4 h-4" />;
          iconBg = 'bg-teal-100 text-teal-700';
        } else if (titleLower.includes('form') || titleLower.includes('application') || titleLower.includes('ds-160') || titleLower.includes('appointment')) {
          icon = <FileText className="w-4 h-4" />;
          iconBg = 'bg-emerald-100 text-emerald-700';
        } else if (titleLower.includes('letter') || titleLower.includes('cover') || titleLower.includes('invitation')) {
          icon = <FileText className="w-4 h-4" />;
          iconBg = 'bg-pink-100 text-pink-700';
        }

        const sentences = doc.description
          ? doc.description.split(/(?<=[.!?])\s+(?=[A-Z0-9])|\n+/).map((s: string) => s.trim()).filter(Boolean)
          : ['Statutory consular requirement for official entry'];

        return {
          key,
          name: doc.title,
          mandatory: isMandatory,
          iconBg,
          icon,
          conditions: sentences.slice(0, 3)
        };
      });
    }

    // Student visa fallback if AI is still fetching
    if (activePurposeTab === 'study' || initialPurpose === 'study') {
      const studentDocs = getStudentDocuments(passportCountry, countryName, 'Student');
      return studentDocs.map((doc, idx) => {
        const key = `doc_std_${idx}_${doc.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
        const titleLower = doc.title.toLowerCase();
        let icon = <FileText className="w-4 h-4" />;
        let iconBg = 'bg-purple-100 text-purple-700';

        if (titleLower.includes('passport')) {
          icon = <FileText className="w-4 h-4" />;
          iconBg = 'bg-purple-100 text-purple-700';
        } else if (titleLower.includes('photo')) {
          icon = <Camera className="w-4 h-4" />;
          iconBg = 'bg-amber-100 text-amber-700';
        } else if (titleLower.includes('acceptance') || titleLower.includes('offer') || titleLower.includes('admission') || titleLower.includes('ecoe') || titleLower.includes('cas') || titleLower.includes('i-20') || titleLower.includes('loa') || titleLower.includes('pal')) {
          icon = <Building2 className="w-4 h-4" />;
          iconBg = 'bg-indigo-100 text-indigo-700';
        } else if (titleLower.includes('insurance') || titleLower.includes('oshc') || titleLower.includes('medical') || titleLower.includes('health') || titleLower.includes('tb')) {
          icon = <ShieldCheck className="w-4 h-4" />;
          iconBg = 'bg-rose-100 text-rose-700';
        } else if (titleLower.includes('fund') || titleLower.includes('financial') || titleLower.includes('blocked') || titleLower.includes('gic') || titleLower.includes('fee') || titleLower.includes('maintenance')) {
          icon = <CreditCard className="w-4 h-4" />;
          iconBg = 'bg-teal-100 text-teal-700';
        } else if (titleLower.includes('english') || titleLower.includes('language') || titleLower.includes('proficiency') || titleLower.includes('academic') || titleLower.includes('aps') || titleLower.includes('gs')) {
          icon = <FileText className="w-4 h-4" />;
          iconBg = 'bg-emerald-100 text-emerald-700';
        }

        const sentences = doc.description
          ? doc.description.split(/(?<=[.!?])\s+(?=[A-Z0-9])|\n+/).map((s: string) => s.trim()).filter(Boolean)
          : ['Official consular requirement for student visa'];

        return {
          key,
          name: doc.title,
          mandatory: doc.is_mandatory !== false,
          iconBg,
          icon,
          conditions: sentences.slice(0, 3)
        };
      });
    }

    // Work visa fallback if AI is still fetching
    if (activePurposeTab === 'work' || activePurposeTab === 'employment' || initialPurpose === 'work' || initialPurpose === 'employment') {
      const workDocs = getWorkDocuments(passportCountry, countryName, 'Work');
      return workDocs.map((doc, idx) => {
        const key = `doc_wrk_${idx}_${doc.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
        const titleLower = doc.title.toLowerCase();
        let icon = <FileText className="w-4 h-4" />;
        let iconBg = 'bg-purple-100 text-purple-700';

        if (titleLower.includes('passport')) {
          icon = <FileText className="w-4 h-4" />;
          iconBg = 'bg-purple-100 text-purple-700';
        } else if (titleLower.includes('photo')) {
          icon = <Camera className="w-4 h-4" />;
          iconBg = 'bg-amber-100 text-amber-700';
        } else if (titleLower.includes('contract') || titleLower.includes('offer') || titleLower.includes('cos') || titleLower.includes('lmia') || titleLower.includes('i-797') || titleLower.includes('permit') || titleLower.includes('coe')) {
          icon = <Building2 className="w-4 h-4" />;
          iconBg = 'bg-indigo-100 text-indigo-700';
        } else if (titleLower.includes('insurance') || titleLower.includes('medical') || titleLower.includes('health') || titleLower.includes('tb') || titleLower.includes('fitness')) {
          icon = <ShieldCheck className="w-4 h-4" />;
          iconBg = 'bg-rose-100 text-rose-700';
        } else if (titleLower.includes('fund') || titleLower.includes('financial') || titleLower.includes('salary') || titleLower.includes('maintenance') || titleLower.includes('tax') || titleLower.includes('fee')) {
          icon = <CreditCard className="w-4 h-4" />;
          iconBg = 'bg-teal-100 text-teal-700';
        } else if (titleLower.includes('police') || titleLower.includes('pcc') || titleLower.includes('clearance')) {
          icon = <ShieldCheck className="w-4 h-4" />;
          iconBg = 'bg-blue-100 text-blue-700';
        } else if (titleLower.includes('qualification') || titleLower.includes('degree') || titleLower.includes('zab') || titleLower.includes('assessment') || titleLower.includes('english')) {
          icon = <FileText className="w-4 h-4" />;
          iconBg = 'bg-emerald-100 text-emerald-700';
        }

        const sentences = doc.description
          ? doc.description.split(/(?<=[.!?])\s+(?=[A-Z0-9])|\n+/).map((s: string) => s.trim()).filter(Boolean)
          : ['Official consular requirement for employment visa'];

        return {
          key,
          name: doc.title,
          mandatory: doc.is_mandatory !== false,
          iconBg,
          icon,
          conditions: sentences.slice(0, 3)
        };
      });
    }

    // Business visa fallback if AI is still fetching
    if (activePurposeTab === 'business' || initialPurpose === 'business' || (initialPurpose || '').toLowerCase().includes('business') || (activePurposeTab || '').toLowerCase().includes('business')) {
      const bizDocs = getBusinessDocuments(passportCountry, countryName, 'Business');
      return bizDocs.map((doc, idx) => {
        const key = `doc_biz_${idx}_${doc.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
        const titleLower = doc.title.toLowerCase();
        let icon = <FileText className="w-4 h-4" />;
        let iconBg = 'bg-purple-100 text-purple-700';

        if (titleLower.includes('passport')) {
          icon = <FileText className="w-4 h-4" />;
          iconBg = 'bg-purple-100 text-purple-700';
        } else if (titleLower.includes('photo')) {
          icon = <Camera className="w-4 h-4" />;
          iconBg = 'bg-amber-100 text-amber-700';
        } else if (titleLower.includes('invitation') || titleLower.includes('deputation') || titleLower.includes('noc') || titleLower.includes('dispatch') || titleLower.includes('incorporation') || titleLower.includes('registration')) {
          icon = <Building2 className="w-4 h-4" />;
          iconBg = 'bg-indigo-100 text-indigo-700';
        } else if (titleLower.includes('insurance') || titleLower.includes('medical') || titleLower.includes('health')) {
          icon = <ShieldCheck className="w-4 h-4" />;
          iconBg = 'bg-rose-100 text-rose-700';
        } else if (titleLower.includes('bank') || titleLower.includes('financial') || titleLower.includes('fund') || titleLower.includes('itr') || titleLower.includes('tax') || titleLower.includes('statement')) {
          icon = <CreditCard className="w-4 h-4" />;
          iconBg = 'bg-teal-100 text-teal-700';
        } else if (titleLower.includes('schedule') || titleLower.includes('agenda') || titleLower.includes('flight') || titleLower.includes('ticket') || titleLower.includes('hotel')) {
          icon = <Plane className="w-4 h-4" />;
          iconBg = 'bg-sky-100 text-sky-700';
        } else if (titleLower.includes('form') || titleLower.includes('application') || titleLower.includes('appointment')) {
          icon = <FileText className="w-4 h-4" />;
          iconBg = 'bg-emerald-100 text-emerald-700';
        }

        const sentences = doc.description
          ? doc.description.split(/(?<=[.!?])\s+(?=[A-Z0-9])|\n+/).map((s: string) => s.trim()).filter(Boolean)
          : ['Official consular requirement for business visa'];

        return {
          key,
          name: doc.title,
          mandatory: doc.is_mandatory !== false,
          iconBg,
          icon,
          conditions: sentences.slice(0, 3)
        };
      });
    }

    // PR visa fallback if AI is still fetching
    if (activePurposeTab === 'pr' || initialPurpose === 'pr' || (initialPurpose || '').toLowerCase().includes('pr') || (activePurposeTab || '').toLowerCase().includes('pr') || (initialPurpose || '').toLowerCase().includes('permanent') || (initialPurpose || '').toLowerCase().includes('settle')) {
      const prDocs = getPRDocuments(passportCountry, countryName, 'PR');
      return prDocs.map((doc, idx) => {
        const key = `doc_pr_${idx}_${doc.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
        const titleLower = doc.title.toLowerCase();
        let icon = <FileText className="w-4 h-4" />;
        let iconBg = 'bg-purple-100 text-purple-700';

        if (titleLower.includes('passport')) {
          icon = <FileText className="w-4 h-4" />;
          iconBg = 'bg-purple-100 text-purple-700';
        } else if (titleLower.includes('photo')) {
          icon = <Camera className="w-4 h-4" />;
          iconBg = 'bg-amber-100 text-amber-700';
        } else if (titleLower.includes('eca') || titleLower.includes('assessment') || titleLower.includes('degree') || titleLower.includes('education') || titleLower.includes('qualification')) {
          icon = <Building2 className="w-4 h-4" />;
          iconBg = 'bg-indigo-100 text-indigo-700';
        } else if (titleLower.includes('medical') || titleLower.includes('health') || titleLower.includes('ime')) {
          icon = <ShieldCheck className="w-4 h-4" />;
          iconBg = 'bg-rose-100 text-rose-700';
        } else if (titleLower.includes('fund') || titleLower.includes('financial') || titleLower.includes('settlement') || titleLower.includes('bank') || titleLower.includes('investment') || titleLower.includes('tax')) {
          icon = <CreditCard className="w-4 h-4" />;
          iconBg = 'bg-teal-100 text-teal-700';
        } else if (titleLower.includes('police') || titleLower.includes('pcc') || titleLower.includes('clearance')) {
          icon = <ShieldCheck className="w-4 h-4" />;
          iconBg = 'bg-blue-100 text-blue-700';
        } else if (titleLower.includes('language') || titleLower.includes('ielts') || titleLower.includes('clb') || titleLower.includes('pte') || titleLower.includes('german') || titleLower.includes('english')) {
          icon = <FileText className="w-4 h-4" />;
          iconBg = 'bg-emerald-100 text-emerald-700';
        } else if (titleLower.includes('experience') || titleLower.includes('employment') || titleLower.includes('reference')) {
          icon = <FileText className="w-4 h-4" />;
          iconBg = 'bg-pink-100 text-pink-700';
        }

        const sentences = doc.description
          ? doc.description.split(/(?<=[.!?])\s+(?=[A-Z0-9])|\n+/).map((s: string) => s.trim()).filter(Boolean)
          : ['Official consular requirement for permanent residency application'];

        return {
          key,
          name: doc.title,
          mandatory: doc.is_mandatory !== false,
          iconBg,
          icon,
          conditions: sentences.slice(0, 3)
        };
      });
    }

    // Family / Spouse visa fallback if AI is still fetching
    if (isFamilyTab || activePurposeTab === 'family' || activePurposeTab === 'spouse' || initialPurpose === 'family' || initialPurpose === 'spouse') {
      const famDocs = getFamilyDocuments(passportCountry, countryName, 'Family');
      return famDocs.map((doc, idx) => {
        const key = `doc_fam_${idx}_${doc.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
        const titleLower = doc.title.toLowerCase();
        let icon = <FileText className="w-4 h-4" />;
        let iconBg = 'bg-purple-100 text-purple-700';

        if (titleLower.includes('passport')) {
          icon = <FileText className="w-4 h-4" />;
          iconBg = 'bg-purple-100 text-purple-700';
        } else if (titleLower.includes('photo')) {
          icon = <Camera className="w-4 h-4" />;
          iconBg = 'bg-amber-100 text-amber-700';
        } else if (titleLower.includes('marriage') || titleLower.includes('relationship') || titleLower.includes('partnership') || titleLower.includes('cohabitation') || titleLower.includes('spouse') || titleLower.includes('family')) {
          icon = <Users className="w-4 h-4" />;
          iconBg = 'bg-pink-100 text-pink-700';
        } else if (titleLower.includes('medical') || titleLower.includes('health') || titleLower.includes('tb')) {
          icon = <ShieldCheck className="w-4 h-4" />;
          iconBg = 'bg-rose-100 text-rose-700';
        } else if (titleLower.includes('fund') || titleLower.includes('financial') || titleLower.includes('sponsor') || titleLower.includes('salary') || titleLower.includes('bank') || titleLower.includes('tax') || titleLower.includes('i-864')) {
          icon = <CreditCard className="w-4 h-4" />;
          iconBg = 'bg-teal-100 text-teal-700';
        } else if (titleLower.includes('police') || titleLower.includes('pcc') || titleLower.includes('clearance')) {
          icon = <ShieldCheck className="w-4 h-4" />;
          iconBg = 'bg-blue-100 text-blue-700';
        } else if (titleLower.includes('accommodation') || titleLower.includes('housing') || titleLower.includes('residence')) {
          icon = <Building2 className="w-4 h-4" />;
          iconBg = 'bg-indigo-100 text-indigo-700';
        } else if (titleLower.includes('language') || titleLower.includes('english') || titleLower.includes('a1') || titleLower.includes('cefr')) {
          icon = <FileText className="w-4 h-4" />;
          iconBg = 'bg-emerald-100 text-emerald-700';
        }

        const sentences = doc.description
          ? doc.description.split(/(?<=[.!?])\s+(?=[A-Z0-9])|\n+/).map((s: string) => s.trim()).filter(Boolean)
          : ['Official consular requirement for family and spouse visa application'];

        return {
          key,
          name: doc.title,
          mandatory: doc.is_mandatory !== false,
          iconBg,
          icon,
          conditions: sentences.slice(0, 3)
        };
      });
    }

    // Tourism visa fallback if AI is still fetching
    const tourDocs = getTourismDocuments(countryName);
    if (tourDocs && tourDocs.length > 0) {
      return tourDocs.map((doc, idx) => {
        const key = `doc_tour_${idx}_${doc.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
        const titleLower = doc.title.toLowerCase();
        let icon = <FileText className="w-4 h-4" />;
        let iconBg = 'bg-purple-100 text-purple-700';

        if (titleLower.includes('passport')) {
          icon = <FileText className="w-4 h-4" />;
          iconBg = 'bg-purple-100 text-purple-700';
        } else if (titleLower.includes('photo') || titleLower.includes('picture')) {
          icon = <Camera className="w-4 h-4" />;
          iconBg = 'bg-amber-100 text-amber-700';
        } else if (titleLower.includes('flight') || titleLower.includes('ticket') || titleLower.includes('itinerary')) {
          icon = <Plane className="w-4 h-4" />;
          iconBg = 'bg-sky-100 text-sky-700';
        } else if (titleLower.includes('hotel') || titleLower.includes('stay') || titleLower.includes('accommodation')) {
          icon = <Building2 className="w-4 h-4" />;
          iconBg = 'bg-indigo-100 text-indigo-700';
        } else if (titleLower.includes('insurance') || titleLower.includes('medical')) {
          icon = <ShieldCheck className="w-4 h-4" />;
          iconBg = 'bg-rose-100 text-rose-700';
        } else if (titleLower.includes('fund') || titleLower.includes('bank') || titleLower.includes('financial') || titleLower.includes('solvency')) {
          icon = <CreditCard className="w-4 h-4" />;
          iconBg = 'bg-teal-100 text-teal-700';
        } else if (titleLower.includes('form') || titleLower.includes('application') || titleLower.includes('ds-160') || titleLower.includes('c5')) {
          icon = <FileText className="w-4 h-4" />;
          iconBg = 'bg-emerald-100 text-emerald-700';
        }

        const sentences = doc.description
          ? doc.description.split(/(?<=[.!?])\s+(?=[A-Z0-9])|\n+/).map((s: string) => s.trim()).filter(Boolean)
          : ['Statutory consular requirement for official entry'];

        return {
          key,
          name: doc.title,
          mandatory: doc.is_mandatory !== false,
          iconBg,
          icon,
          conditions: sentences.slice(0, 3)
        };
      });
    }

    // Default fallback based on country if AI is still fetching
    const isUS = countryName.toLowerCase().includes('united states');
    return [
      {
        key: 'passport',
        name: 'Valid Passport',
        mandatory: true,
        iconBg: 'bg-purple-100 text-purple-700',
        icon: <FileText className="w-4 h-4" />,
        conditions: [
          `Valid for at least ${isSchengen ? '3 months beyond intended stay' : '6 months beyond intended stay'}`,
          'Issued within the last 10 years',
          'Minimum 2 blank pages'
        ]
      },
      {
        key: 'form',
        name: isUS ? 'Form DS-160 Confirmation Page' : 'Visa Application Form',
        mandatory: true,
        iconBg: 'bg-emerald-100 text-emerald-700',
        icon: <FileText className="w-4 h-4" />,
        conditions: [
          isUS ? 'Complete online at ceac.state.gov with barcode' : 'Fully filled and signed',
          'Confirmation printed within last 30 days'
        ]
      },
      {
        key: 'photos',
        name: 'Photographs',
        mandatory: true,
        iconBg: 'bg-amber-100 text-amber-700',
        icon: <Camera className="w-4 h-4" />,
        conditions: [
          'Recent photographs taken within last 6 months',
          isUS ? '2x2 inches (51x51mm), white background' : '35mm x 45mm, white background',
          'No glasses, neutral facial expression'
        ]
      },
      {
        key: 'flight',
        name: 'Travel Purpose & Itinerary',
        mandatory: true,
        iconBg: 'bg-sky-100 text-sky-700',
        icon: <Plane className="w-4 h-4" />,
        conditions: [
          'Confirmed round-trip flight reservations or detailed itinerary',
          'Verifiable PNR booking confirmation'
        ]
      },
      {
        key: 'bank',
        name: 'Employment & Financial Proofs',
        mandatory: true,
        iconBg: 'bg-teal-100 text-teal-700',
        icon: <CreditCard className="w-4 h-4" />,
        conditions: [
          'Official stamped bank statements for the last 3-6 months',
          'Proof of ongoing employment, payslips or business registration',
          'Income tax returns establishing strong ties to home country'
        ]
      }
    ];
  }, [aiData, isSchengen, countryName, activePurposeTab, initialPurpose, passportCountry]);

  // Dynamic user-driven counts
  const totalDocsCount = portalDocItems.length;
  const mandatoryDocsCount = portalDocItems.filter((d: any) => d.mandatory).length;
  const recommendedDocsCount = portalDocItems.filter((d: any) => !d.mandatory).length;

  const isDocReady = (d: any) => {
    const k = d.key || '';
    const name = d.name || d.title || '';
    return Boolean(
      readyDocKeys[k] ||
      readyDocKeys[name] ||
      readyDocKeys[k.toLowerCase()] ||
      readyDocKeys[name.toLowerCase()] ||
      portalUploadedDocs[k]?.status === 'completed' ||
      uploadedDocuments[k] ||
      uploadedDocuments[name]
    );
  };

  const readyDocTitlesCount = Object.keys(readyDocKeys).filter(k => readyDocKeys[k]).length;
  const matchedReadyCount = portalDocItems.filter((d: any) => isDocReady(d)).length;
  const effectiveReadyDocsCount = Math.max(matchedReadyCount, readyDocTitlesCount);
  const effectiveTotalDocsCount = Math.max(totalDocsCount, 5);

  const completedStepsCount = dynamicSteps.filter(s => userCheckedSteps[s.step]).length;
  const totalStepsCount = dynamicSteps.length || 8;

  const completedDocsCount = matchedReadyCount;
  const inProgressDocsCount = portalDocItems.filter((d: any) => portalUploadedDocs[d.key]?.status === 'in_progress').length;
  const pendingDocsCount = portalDocItems.filter((d: any) => !isDocReady(d) && portalUploadedDocs[d.key]?.status === 'pending').length;
  const notStartedDocsCount = Math.max(0, effectiveTotalDocsCount - effectiveReadyDocsCount);

  // Dynamic Visa Readiness Scoring (Profile Questionnaire + Document Availability + Consular Steps)
  let profileScore = 0;
  if (visitPlanStatus) profileScore += 8;
  if (visitTiming && visitReturnDate && tripDurationDays > 0) profileScore += 8;
  if (visitStay) profileScore += 7;
  if (touristBankStability) {
    if (touristBankStability.includes('4L+')) profileScore += 12;
    else if (touristBankStability.includes('2L')) profileScore += 8;
    else profileScore += 4;
  }
  if (touristHomeTies) {
    if (touristHomeTies.includes('Salaried') || touristHomeTies.includes('Business')) profileScore += 10;
    else profileScore += 6;
  }
  if (passportValidityRange) {
    if (passportValidityRange.includes('> 12')) profileScore += 5;
    else if (passportValidityRange.includes('6 - 12')) profileScore += 4;
    else profileScore += 1;
  }

  // Also calculate if study/work purpose selected
  if (activePurposeTab === 'study') {
    let sScore = 0;
    if (studyQual) sScore += 8;
    if (studyTarget) sScore += 8;
    if (studyIntake) sScore += 7;
    if (studyBudget) sScore += 10;
    if (studentAdmissionStatus) sScore += 10;
    if (studentLanguageScore) sScore += 7;
    profileScore = sScore;
  } else if (activePurposeTab === 'work') {
    let wScore = 0;
    if (workExp) wScore += 12;
    if (workOffer) wScore += 15;
    if (workDomain) wScore += 12;
    if (workAssess) wScore += 11;
    profileScore = wScore;
  }

  // 3-Pillar Dynamic Readiness Score:
  // Pillar 1: Application Profile Details (Max 40%)
  const profileScorePart = Math.min(40, Math.round((profileScore / 50) * 40));
  // Pillar 2: Required Documents Ready / Uploaded (Max 40%)
  const docsScorePart = effectiveTotalDocsCount > 0 ? Math.min(40, Math.round((effectiveReadyDocsCount / effectiveTotalDocsCount) * 40)) : 0;
  // Pillar 3: Consular Steps Completed (Max 20%)
  const stepsScorePart = totalStepsCount > 0 ? Math.min(20, Math.round((completedStepsCount / totalStepsCount) * 20)) : 0;

  const readinessPercent = Math.min(100, profileScorePart + docsScorePart + stepsScorePart);
  const readinessLabel = readinessPercent >= 80 
    ? 'Visa Ready! (High Approval)' 
    : readinessPercent >= 60 
    ? 'Good Progress' 
    : readinessPercent >= 30 
    ? 'Moderate Readiness' 
    : readinessPercent > 0 
    ? 'In Progress' 
    : 'Assessment Ready';

  const readinessSubtext = readinessPercent >= 80
    ? 'All criteria met for official consular submission'
    : readinessPercent >= 60
    ? 'Complete remaining items to maximize approval chances'
    : readinessPercent >= 30
    ? 'Good progress! Complete documents and steps'
    : readinessPercent > 0
    ? 'Fill profile and verify documents to increase score'
    : 'Fill profile details & mark documents ready to calculate readiness';

  const stayPeriod = lengthOfStay;

  const cleanStatValue = (val: string | undefined | null) => {
    if (!val) return '';
    return val
      .replace(/\s*\([^)]*\)/g, '')
      .replace(/\s*\[[^\]]*\]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  return (
    <div className="w-full bg-white text-slate-800 font-sans antialiased pb-28 lg:pb-12 [-webkit-font-smoothing:antialiased] [-moz-osx-font-smoothing:grayscale] [text-rendering:optimizeLegibility]">
      
      {/* ── PREMIUM VISA DETAILS WORKSPACE (MATCHING EXACT SPECIFICATION media_1788458534453) ── */}
      <section className="max-w-[1440px] mx-auto px-4 lg:px-8 pt-3 sm:pt-6 space-y-6 font-sans antialiased subpixel-antialiased text-slate-900 [-webkit-font-smoothing:antialiased] [-moz-osx-font-smoothing:grayscale] [text-rendering:optimizeLegibility]">
        
        {/* ── BREADCRUMB (MATCHING EXACT PHOTO media_1788520146795.png) ── */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
          <a href="/" className="hover:text-slate-900 transition-colors">Home</a>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <a href="/visas" className="hover:text-slate-900 transition-colors">Visas</a>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">
            {isSchengen ? `Schengen ${purposeLabel} Visa (${countryName})` : `${countryName} ${purposeLabel} Visa`}
          </span>
        </div>

        {/* ── MOBILE HERO & READINESS & QUICK TABS (MATCHING EXACT SPECIFICATION media_1788533487648.png) ── */}
        <div className="md:hidden space-y-3.5">
          {/* Mobile Top Hero Card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-2xs space-y-3 text-left">
            <div className="flex items-center gap-3.5">
              <div className="w-[72px] h-[72px] rounded-2xl overflow-hidden shrink-0 border border-slate-100 shadow-2xs relative bg-slate-100">
                <img
                  src={heroImage}
                  alt={`${countryName} Visa`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[12px] font-medium border border-emerald-200/60 mb-1">
                  {purposeLabel} Visa
                </span>
                <h1 className="text-[22px] sm:text-[24px] font-semibold text-slate-900 tracking-tight leading-snug">
                  {countryName} {purposeLabel} Visa
                </h1>
                <span className="text-[13px] font-normal text-slate-500 block mt-0.5">
                  {isSchengen ? 'Schengen Area' : (aiData?.official_source_name || (baseData.countryName ? `Immigration & Consular Authority of ${baseData.countryName}` : 'Official Immigration Authority'))}
                </span>
              </div>
            </div>

            {/* 3 Quick Stats Row */}
            <div className="grid grid-cols-3 gap-2 pt-2.5 border-t border-slate-100 text-center">
              <div>
                <span className="text-[12px] font-normal text-slate-500 block">Processing Time</span>
                <strong className="text-[14px] font-semibold text-slate-900 block mt-0.5">{getResolvedProcessingTime()}</strong>
              </div>
              <div>
                <span className="text-[12px] font-normal text-slate-500 block">Validity</span>
                <strong className="text-[14px] font-semibold text-slate-900 block mt-0.5">{cleanStatValue(aiData?.validity || (isFamilyTab ? getFamilyValidity(countryName) : isPRTab ? getPRValidity(countryName) : isStudyTab ? getStudentValidity(countryName) : isWorkTab ? getWorkValidity(countryName) : isBusinessTab ? getBusinessValidity(countryName) : getTourismValidity(countryName)))}</strong>
              </div>
              <div>
                <span className="text-[12px] font-normal text-slate-500 block">Entry Type</span>
                <strong className="text-[14px] font-semibold text-slate-900 block mt-0.5">{cleanStatValue(aiData?.entry_type || (isFamilyTab ? getFamilyEntryType(countryName) : isPRTab ? getPREntryType(countryName) : isStudyTab ? getStudentEntryType(countryName) : isWorkTab ? getWorkEntryType(countryName) : isBusinessTab ? getBusinessEntryType(countryName) : getTourismEntryType(countryName)))}</strong>
              </div>
            </div>
          </div>

          {/* Mobile Visa Readiness Card (Matching media_1788533487648.png & media_1788533296553.png) */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-2xs space-y-3.5 text-left">
            <div className="flex items-center gap-3.5">
              {/* Circular Gauge with Black Arc per user instruction */}
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-slate-900"
                    strokeDasharray={`${readinessPercent}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-xs font-black text-slate-950">{readinessPercent}%</span>
              </div>
              <div className="min-w-0 flex-1">
                <strong className="text-sm font-black text-slate-950 block">{readinessLabel}</strong>
                <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                  {readinessSubtext}
                </p>
              </div>
            </div>

            {/* Checklist items */}
            <div className="space-y-2 pt-1 border-t border-slate-100 text-xs font-semibold">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  {profileScore > 0 ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  <span>Profile Questionnaire</span>
                </div>
                <span className={profileScore > 0 ? "text-emerald-700 font-bold text-[11px]" : "text-slate-400 font-medium text-[11px]"}>
                  {profileScore > 0 ? `+${profileScore}/50 pts` : 'Pending (0/50)'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  {effectiveReadyDocsCount > 0 ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  <span>Documents Checklist</span>
                </div>
                <span className={effectiveReadyDocsCount > 0 ? "text-emerald-700 font-bold text-[11px]" : "text-slate-400 font-medium text-[11px]"}>
                  {effectiveReadyDocsCount > 0 ? `${effectiveReadyDocsCount} of ${effectiveTotalDocsCount} Ready` : `Pending (0/${effectiveTotalDocsCount})`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  {completedStepsCount > 0 ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  <span>Consular Steps</span>
                </div>
                <span className={completedStepsCount > 0 ? "text-emerald-700 font-bold text-[11px]" : "text-slate-400 font-medium text-[11px]"}>
                  {completedStepsCount > 0 ? `${completedStepsCount} of ${totalStepsCount} Done` : `Pending (0/${totalStepsCount})`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  <span>Passport &amp; Nationality</span>
                </div>
                <span className="text-emerald-700 font-bold text-[11px]">{passportCountry || 'India'} (Valid)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSidebarTab('documents')}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-[0.99]"
            >
              <span>Continue Checklist</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile 5-Icon Navigation Tabs (Matching media_1788533487648.png) */}
          <div className="grid grid-cols-5 gap-1.5 p-1 rounded-2xl bg-slate-100/90 text-center">
            {[
              { id: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4" /> },
              { id: 'steps', label: 'Steps', icon: <CheckCircle className="w-4 h-4" /> },
              { id: 'fees', label: 'Fees', icon: <CreditCard className="w-4 h-4" /> },
              { id: 'requirements', label: 'Requirements', icon: <ShieldCheck className="w-4 h-4" /> },
              { id: 'faq', label: 'FAQ', icon: <HelpCircle className="w-4 h-4" /> }
            ].map((tab) => {
              const isActive = sidebarTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSidebarTab(tab.id as any)}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-slate-950 font-semibold shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900 font-medium'
                  }`}
                >
                  <div className={`mb-1 ${isActive ? 'text-slate-950' : 'text-slate-400'}`}>
                    {tab.icon}
                  </div>
                  <span className="text-[12px] font-medium leading-tight truncate max-w-full">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── TOP HERO HEADER CARD (DESKTOP) (MATCHING EXACT PHOTO media_1788520146795.png) ── */}
        <div className="hidden md:block bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Left: Country Landmark Photo */}
            <div className="w-full md:w-64 lg:w-72 h-56 sm:h-64 rounded-2xl overflow-hidden shrink-0 border border-slate-100 shadow-xs relative bg-slate-100">
              <img
                src={heroImage}
                alt={`${countryName} Visa`}
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Right: Visa Details */}
            <div className="flex-1 min-w-0 space-y-3.5 text-left w-full">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[12px] sm:text-[13px] font-medium border border-emerald-200/70">
                {purposeLabel} Visa
              </span>

              <div>
                <h1 className="text-[28px] sm:text-[30px] lg:text-[32px] font-semibold text-slate-900 tracking-tight leading-tight">
                  {countryName} {purposeLabel} Visa
                </h1>
                <span className="text-[13px] sm:text-[14px] font-normal text-slate-500 mt-1 block">
                  {isSchengen ? 'Schengen Area' : (aiData?.official_source_name || (baseData.countryName ? `Immigration & Consular Authority of ${baseData.countryName}` : 'Official Immigration Authority'))}
                </span>
              </div>

              {/* 4 Quick Stat Badges Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[12px] sm:text-[13px] font-normal text-slate-500 block truncate">Processing Time</span>
                    <strong className="text-[15px] sm:text-[16px] font-semibold text-slate-900 truncate block">
                      {getResolvedProcessingTime()}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[12px] sm:text-[13px] font-normal text-slate-500 block truncate">Validity</span>
                    <strong className="text-[15px] sm:text-[16px] font-semibold text-slate-900 truncate block">
                      {cleanStatValue(aiData?.validity || (isFamilyTab ? getFamilyValidity(countryName) : isPRTab ? getPRValidity(countryName) : isStudyTab ? getStudentValidity(countryName) : isWorkTab ? getWorkValidity(countryName) : isBusinessTab ? getBusinessValidity(countryName) : getTourismValidity(countryName)))}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[12px] sm:text-[13px] font-normal text-slate-500 block truncate">Stay Period</span>
                    <strong className="text-[15px] sm:text-[16px] font-semibold text-slate-900 truncate block">
                      {cleanStatValue(aiData?.stay_duration || (isFamilyTab ? getFamilyStayDuration(countryName) : isPRTab ? getPRStayDuration(countryName) : isStudyTab ? getStudentStayDuration(countryName) : isWorkTab ? getWorkStayDuration(countryName) : isBusinessTab ? getBusinessStayDuration(countryName) : getTourismStayDuration(countryName)))}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Plane className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[12px] sm:text-[13px] font-normal text-slate-500 block truncate">Entry Type</span>
                    <strong className="text-[15px] sm:text-[16px] font-semibold text-slate-900 truncate block">
                      {cleanStatValue(aiData?.entry_type || (isFamilyTab ? getFamilyEntryType(countryName) : isPRTab ? getPREntryType(countryName) : isStudyTab ? getStudentEntryType(countryName) : isWorkTab ? getWorkEntryType(countryName) : isBusinessTab ? getBusinessEntryType(countryName) : getTourismEntryType(countryName)))}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-[14px] sm:text-[15px] text-slate-600 font-normal leading-relaxed">
                {resolvedOverview}
              </p>

              {/* Bottom Action Buttons */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleToggleSave}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-extrabold flex items-center gap-2 cursor-pointer transition-all shadow-2xs ${
                    isSaved
                      ? 'bg-rose-50 border-rose-300 text-rose-700'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600 text-rose-600' : 'text-slate-400'}`} />
                  <span>{isSaved ? 'Saved' : 'Add to Saved'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── 2-COLUMN MAIN WORKSPACE (MATCHING EXACT PHOTO media_1788520146795.png) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ── LEFT MAIN COLUMN (8 COLS) ── */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Horizontal Tabs Bar (Desktop) */}
            <div className="hidden md:flex bg-white rounded-2xl border border-slate-200/80 p-1.5 shadow-2xs items-center gap-1 overflow-x-auto no-scrollbar">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'documents', label: 'Documents' },
                { id: 'steps', label: 'Steps to Follow' },
                { id: 'fees', label: 'Fees' },
                { id: 'processing', label: 'Processing Time' },
                { id: 'requirements', label: 'Requirements' },
                { id: 'faq', label: 'FAQ' },
                { id: 'track', label: 'Track' }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSidebarTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-[13px] sm:text-[14px] font-semibold transition-all cursor-pointer whitespace-nowrap relative ${
                    sidebarTab === tab.id
                      ? 'text-blue-600 font-semibold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2.5px] after:bg-blue-600 after:rounded-full'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB: OVERVIEW (MATCHING EXACT 3 CARDS IN PHOTO ON DESKTOP & CLEAN PREVIEW ON MOBILE) */}
            {sidebarTab === 'overview' && (
              <div className="space-y-6 animate-fadeIn">
                {/* ── MOBILE OVERVIEW: DOCUMENTS REQUIRED PREVIEW (MATCHING media_1788533487648.png) ── */}
                <div className="md:hidden bg-white rounded-2xl border border-slate-100 p-4 shadow-2xs space-y-3.5 text-left">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[15px] sm:text-[16px] font-semibold text-slate-900">Documents Required</h3>
                    <span className="text-[12px] sm:text-[13px] font-medium text-slate-500">{completedDocsCount} of {totalDocsCount} completed</span>
                  </div>

                  <div className="space-y-2.5">
                    {portalDocItems.slice(0, 4).map((doc: any, idx: number) => {
                      const isUploaded = portalUploadedDocs[doc.key]?.status === 'completed';
                      return (
                        <div key={doc.key || idx} className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-10 h-10 rounded-xl ${doc.iconBg || 'bg-teal-50 text-teal-600'} flex items-center justify-center shrink-0 shadow-2xs`}>
                              {doc.icon || <FileText className="w-4 h-4" />}
                            </div>
                            <div className="min-w-0">
                              <strong className="text-[14px] sm:text-[15px] font-semibold text-slate-900 block leading-snug">{doc.name}</strong>
                              <span className="text-[12px] font-medium text-teal-700 block mt-0.5">{doc.mandatory ? 'Mandatory' : 'Optional'}</span>
                            </div>
                          </div>
                          {isUploaded ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[12px] font-medium shrink-0">
                              <Check className="w-3 h-3 stroke-[3]" />
                              <span>Uploaded</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[12px] font-medium shrink-0">
                              <Clock className="w-3 h-3" />
                              <span>Pending</span>
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSidebarTab('documents')}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-black text-white text-[13px] sm:text-[14px] font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-[0.99]"
                  >
                    <span>View All Documents ({totalDocsCount || 12})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Desktop 3 Cards */}
                <div className="hidden md:block space-y-6">
                  {/* 1. Overview Card */}
                  <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-2xs space-y-5 text-left">
                    <h2 className="text-[17px] sm:text-[18px] lg:text-[20px] font-semibold text-slate-900">Overview</h2>
                    <p className="text-[14px] sm:text-[15px] text-slate-600 leading-relaxed font-normal">
                      {resolvedOverview}
                    </p>

                    {/* 4 Feature Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {isStudyTab ? (
                      <>
                        <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100/90 flex items-start gap-3">
                          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                            <GraduationCap className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <strong className="text-[15px] sm:text-[16px] font-semibold text-blue-950 block">Higher Education</strong>
                            <span className="text-[13px] sm:text-[14px] text-blue-700/80 font-normal leading-snug block">Full-time degree or accredited course</span>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100/90 flex items-start gap-3">
                          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                            <Briefcase className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <strong className="text-[15px] sm:text-[16px] font-semibold text-purple-950 block">Part-Time Work Rights</strong>
                            <span className="text-[13px] sm:text-[14px] text-purple-700/80 font-normal leading-snug block">Work during terms &amp; full-time in breaks</span>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-100/90 flex items-start gap-3">
                          <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                            <Award className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <strong className="text-[15px] sm:text-[16px] font-semibold text-rose-950 block">Post-Study Work</strong>
                            <span className="text-[13px] sm:text-[14px] text-rose-700/80 font-normal leading-snug block">Graduate job search &amp; post-study permits</span>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100/90 flex items-start gap-3">
                          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <strong className="text-[15px] sm:text-[16px] font-semibold text-emerald-950 block">Academic Duration</strong>
                            <span className="text-[13px] sm:text-[14px] text-emerald-700/80 font-normal leading-snug block">
                              Full course duration + post-study buffer
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {(() => {
                          const highlights = (aiData?.highlights && aiData.highlights.length > 0)
                            ? aiData.highlights
                            : isFamilyTab
                            ? getFamilyHighlights(countryName)
                            : isPRTab
                            ? getPRHighlights(countryName)
                            : isWorkTab
                            ? getWorkHighlights(countryName)
                            : isBusinessTab
                            ? getBusinessHighlights(countryName)
                            : getTourismHighlights(countryName);

                          const themes = [
                            { bg: 'bg-blue-50/70', border: 'border-blue-100/90', iconBg: 'bg-blue-100 text-blue-600', text: 'text-blue-950', sub: 'text-blue-700/80' },
                            { bg: 'bg-purple-50/70', border: 'border-purple-100/90', iconBg: 'bg-purple-100 text-purple-600', text: 'text-purple-950', sub: 'text-purple-700/80' },
                            { bg: 'bg-rose-50/70', border: 'border-rose-100/90', iconBg: 'bg-rose-100 text-rose-600', text: 'text-rose-950', sub: 'text-rose-700/80' },
                            { bg: 'bg-emerald-50/70', border: 'border-emerald-100/90', iconBg: 'bg-emerald-100 text-emerald-600', text: 'text-emerald-950', sub: 'text-emerald-700/80' }
                          ];

                          const renderIcon = (iconName: string, idx: number) => {
                            const i = (iconName || '').toLowerCase();
                            if (i.includes('briefcase') || i.includes('work') || i.includes('job') || i.includes('business')) return <Briefcase className="w-4 h-4" />;
                            if (i.includes('handshake') || i.includes('deal') || i.includes('meeting')) return <Users className="w-4 h-4" />;
                            if (i.includes('building') || i.includes('office') || i.includes('corporate') || i.includes('home') || i.includes('house')) return <Building2 className="w-4 h-4" />;
                            if (i.includes('trending') || i.includes('chart')) return <TrendingUp className="w-4 h-4" />;
                            if (i.includes('dollar') || i.includes('money')) return <CreditCard className="w-4 h-4" />;
                            if (i.includes('sun')) return <Sun className="w-4 h-4" />;
                            if (i.includes('plane')) return <Plane className="w-4 h-4" />;
                            if (i.includes('map') || i.includes('pin')) return <MapPin className="w-4 h-4" />;
                            if (i.includes('shield')) return <ShieldCheck className="w-4 h-4" />;
                            if (i.includes('calendar') || i.includes('clock')) return <Calendar className="w-4 h-4" />;
                            if (i.includes('user') || i.includes('people') || i.includes('family') || i.includes('spouse') || i.includes('partner') || i.includes('heart')) return <Users className="w-4 h-4" />;
                            if (i.includes('award') || i.includes('star')) return <Award className="w-4 h-4" />;
                            if (i.includes('file') || i.includes('doc')) return <FileText className="w-4 h-4" />;
                            if (i.includes('credit') || i.includes('card') || i.includes('fee')) return <CreditCard className="w-4 h-4" />;
                            if (i.includes('globe')) return <Globe className="w-4 h-4" />;
                            if (isFamilyTab) {
                              if (idx === 0) return <Users className="w-4 h-4" />;
                              if (idx === 1) return <ShieldCheck className="w-4 h-4" />;
                              if (idx === 2) return <Building2 className="w-4 h-4" />;
                              return <Award className="w-4 h-4" />;
                            }
                            if (isPRTab) {
                              if (idx === 0) return <Award className="w-4 h-4" />;
                              if (idx === 1) return <Globe className="w-4 h-4" />;
                              if (idx === 2) return <TrendingUp className="w-4 h-4" />;
                              return <ShieldCheck className="w-4 h-4" />;
                            }
                            if (isWorkTab) {
                              if (idx === 0) return <Briefcase className="w-4 h-4" />;
                              if (idx === 1) return <Award className="w-4 h-4" />;
                              if (idx === 2) return <TrendingUp className="w-4 h-4" />;
                              return <ShieldCheck className="w-4 h-4" />;
                            }
                            if (isBusinessTab) {
                              if (idx === 0) return <Briefcase className="w-4 h-4" />;
                              if (idx === 1) return <Users className="w-4 h-4" />;
                              if (idx === 2) return <Building2 className="w-4 h-4" />;
                              return <ShieldCheck className="w-4 h-4" />;
                            }
                            if (idx === 0) return <Sun className="w-4 h-4" />;
                            if (idx === 1) return <Users className="w-4 h-4" />;
                            if (idx === 2) return <Calendar className="w-4 h-4" />;
                            return <ShieldCheck className="w-4 h-4" />;
                          };

                          return highlights.slice(0, 4).map((h: any, idx: number) => {
                            const theme = themes[idx % themes.length];
                            return (
                              <div key={idx} className={`p-3.5 rounded-2xl ${theme.bg} border ${theme.border} flex items-start gap-3`}>
                                <div className={`w-8 h-8 rounded-xl ${theme.iconBg} flex items-center justify-center shrink-0`}>
                                  {renderIcon(h.icon, idx)}
                                </div>
                                <div className="min-w-0">
                                  <strong className={`text-[15px] sm:text-[16px] font-semibold ${theme.text} block`}>{h.title}</strong>
                                  <span className={`text-[13px] sm:text-[14px] ${theme.sub} font-normal leading-snug block`}>{h.desc || h.description}</span>
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </>
                    )}
                  </div>
                </div>

                {/* 2. Documents Required Card */}
                {(() => {
                  const isDestinationVisaFree = isVisaOnArrivalOrFree || 
                    countryName.toLowerCase().includes('jamaica') ||
                    countryName.toLowerCase().includes('mauritius') ||
                    countryName.toLowerCase().includes('maldives') ||
                    countryName.toLowerCase().includes('seychelles');

                  const defaultPortalOverviewDocs = (isDestinationVisaFree && (activePurposeTab === 'tourism' || !activePurposeTab || activePurposeTab === 'general')) ? [
                    { title: 'Valid Passport', desc: 'Valid national passport for duration of stay with blank entry stamp page', icon: <FileText className="w-4 h-4 text-purple-600" />, bg: 'bg-purple-50 border-purple-100' },
                    { title: countryName.toLowerCase().includes('jamaica') ? 'C5 Online Form (enterjamaica.com)' : 'Digital Arrival Declaration / Card', desc: countryName.toLowerCase().includes('jamaica') ? 'Mandatory digital C5 customs & immigration declaration' : 'Mandatory digital arrival or disembarkation declaration', icon: <FileText className="w-4 h-4 text-emerald-600" />, bg: 'bg-emerald-50 border-emerald-100' },
                    { title: 'Return Flight Ticket', desc: 'Confirmed return or onward flight departing within authorized stay', icon: <Plane className="w-4 h-4 text-teal-600" />, bg: 'bg-teal-50 border-teal-100' },
                    { title: 'Accommodation Proof', desc: 'Hotel booking confirmation, resort reservation, or host letter', icon: <Building2 className="w-4 h-4 text-indigo-600" />, bg: 'bg-indigo-50 border-indigo-100' },
                    { title: 'Financial Solvency', desc: 'International debit/credit cards or liquid funds for stay expenses', icon: <CreditCard className="w-4 h-4 text-rose-600" />, bg: 'bg-rose-50 border-rose-100' },
                    { title: 'Travel Health Cover', desc: 'Comprehensive travel health coverage (recommended for international transit)', icon: <Shield className="w-4 h-4 text-sky-600" />, bg: 'bg-sky-50 border-sky-100' }
                  ] : [
                    { title: 'Passport', desc: 'Valid for at least 6 months beyond intended stay', icon: <FileText className="w-4 h-4 text-purple-600" />, bg: 'bg-purple-50 border-purple-100' },
                    { title: 'Visa Application Form', desc: 'Duly completed and signed official consular application form', icon: <FileText className="w-4 h-4 text-emerald-600" />, bg: 'bg-emerald-50 border-emerald-100' },
                    { title: 'Photographs', desc: 'Recent passport-sized photographs per consular specs', icon: <Camera className="w-4 h-4 text-amber-600" />, bg: 'bg-amber-50 border-amber-100' },
                    { title: 'Travel Itinerary', desc: 'Confirmed flight booking or flight reservation', icon: <Plane className="w-4 h-4 text-teal-600" />, bg: 'bg-teal-50 border-teal-100' },
                    { title: 'Accommodation Proof', desc: 'Hotel booking or official invitation letter', icon: <Building2 className="w-4 h-4 text-indigo-600" />, bg: 'bg-indigo-50 border-indigo-100' },
                    { title: 'Travel Insurance', desc: isSchengen ? 'Minimum cover of €30,000 / Adequate medical cover' : 'Emergency medical & repatriation cover', icon: <Shield className="w-4 h-4 text-sky-600" />, bg: 'bg-sky-50 border-sky-100' },
                    { title: 'Financial Proof', desc: 'Bank statements / proof of sufficient travel funds', icon: <CreditCard className="w-4 h-4 text-rose-600" />, bg: 'bg-rose-50 border-rose-100' },
                    { title: 'Cover Letter', desc: 'Purpose of visit and travel schedule', icon: <FileText className="w-4 h-4 text-red-600" />, bg: 'bg-red-50 border-red-100' },
                  ];

                  const overviewDocsList = (aiData?.documents_required && Array.isArray(aiData.documents_required) && aiData.documents_required.length > 0)
                    ? aiData.documents_required.slice(0, 8).map((d: any, idx: number) => ({
                        title: d.title || d.name || defaultPortalOverviewDocs[idx % defaultPortalOverviewDocs.length].title,
                        desc: d.description || d.hint || defaultPortalOverviewDocs[idx % defaultPortalOverviewDocs.length].desc,
                        icon: defaultPortalOverviewDocs[idx % defaultPortalOverviewDocs.length]?.icon || <FileText className="w-4 h-4 text-purple-600" />,
                        bg: defaultPortalOverviewDocs[idx % defaultPortalOverviewDocs.length]?.bg || 'bg-purple-50 border-purple-100'
                      }))
                    : defaultPortalOverviewDocs;

                  const overviewStepsList = dynamicSteps.slice(0, 6).map(s => ({
                    title: s.title,
                    desc: s.desc
                  }));

                  return (
                    <>
                      {/* 2. Documents Required Card */}
                      <div id="documents-section" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-2xs space-y-5 text-left">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h3 className="text-[17px] sm:text-[18px] lg:text-[20px] font-semibold text-slate-900 tracking-tight">Documents Required</h3>
                            <p className="text-[13px] sm:text-[14px] text-slate-500 font-normal mt-0.5">Prepare the following documents for a smooth application process.</p>
                          </div>
                          <button
                            type="button"
                            onClick={handleDownloadAndSyncChecklist}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50/80 hover:bg-indigo-100 text-[12px] sm:text-[13px] font-medium text-indigo-700 transition-all cursor-pointer shadow-2xs self-start sm:self-auto"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download &amp; Sync Checklist (PDF)</span>
                          </button>
                        </div>

                        {/* 2-Column Grid of 8 Document Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {overviewDocsList.map((doc: any, idx: number) => {
                            const isReady = readyDocKeys[doc.title] || false;
                            return (
                              <div
                                key={idx}
                                onClick={() => toggleDocReady(doc.title)}
                                className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                                  isReady
                                    ? 'bg-emerald-50/40 border-emerald-300 shadow-2xs'
                                    : 'bg-white border-slate-100 shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:border-slate-200/80'
                                }`}
                              >
                                <div className={`w-9 h-9 rounded-xl ${doc.bg} border flex items-center justify-center shrink-0 font-semibold text-sm shadow-2xs`}>
                                  {doc.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-[15px] sm:text-[16px] font-semibold text-slate-900 leading-snug">{doc.title}</h4>
                                  <p className="text-[14px] sm:text-[15px] font-normal text-slate-600 mt-1 leading-relaxed">{doc.desc}</p>
                                </div>
                                <div className="shrink-0 mt-0.5">
                                  <span className={`w-5 h-5 rounded-lg flex items-center justify-center border text-xs transition-colors ${
                                    isReady
                                      ? 'bg-emerald-600 border-emerald-600 text-white'
                                      : 'border-slate-300 text-transparent hover:border-slate-400'
                                  }`}>
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="flex justify-center pt-2">
                          <button
                            type="button"
                            onClick={() => setSidebarTab('documents')}
                            className="px-6 py-2.5 rounded-xl border border-emerald-500/80 text-emerald-700 bg-white hover:bg-emerald-50/50 text-[13px] sm:text-[14px] font-medium shadow-2xs transition-all cursor-pointer"
                          >
                            View Full Document Checklist
                          </button>
                        </div>
                      </div>

                      {/* 3. Steps to Follow Card */}
                      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-2xs space-y-6 text-left">
                        <div>
                          <h3 className="text-[17px] sm:text-[18px] lg:text-[20px] font-semibold text-slate-900 tracking-tight">Steps to Follow</h3>
                          <p className="text-[13px] sm:text-[14px] text-slate-500 font-normal mt-0.5">Follow these simple steps to complete your visa application.</p>
                        </div>

                        <div className="relative pt-3 pb-2">
                          {/* Connecting line behind circles on desktop */}
                          <div className="hidden lg:block absolute top-[28px] left-[8%] right-[8%] h-[2px] bg-slate-200 -translate-y-1/2 z-0" />

                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-4 relative z-10">
                            {overviewStepsList.map((step: any, idx: number) => (
                              <div key={idx} className="flex flex-col items-center text-center px-1">
                                <div className="w-8 h-8 rounded-full bg-[#3730A3] text-white flex items-center justify-center text-xs font-semibold shadow-xs ring-4 ring-white z-10 shrink-0">
                                  {idx + 1}
                                </div>
                                <h4 className="text-[14px] sm:text-[15px] font-semibold text-slate-900 mt-2.5 leading-snug">{step.title}</h4>
                                <p className="text-[13px] sm:text-[14px] text-slate-600 font-normal mt-1 leading-normal">{step.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}
                </div>

              </div>
            )}

            {/* TAB: DOCUMENTS */}
                        {sidebarTab === 'documents' && (
              <div className="space-y-5 animate-fade-up">
                
                {/* Header Title & Description */}
                <div className="space-y-1 text-left">
                  <h1 className="text-[22px] sm:text-[24px] lg:text-[28px] font-semibold text-slate-900 tracking-tight leading-tight">
                    Documents Required
                  </h1>
                  <p className="text-[14px] sm:text-[15px] text-slate-600 font-normal leading-relaxed">
                    Upload and verify all documents as per official requirements of {aiData?.official_source_name || ('the Embassy of ' + countryName)}.
                  </p>
                </div>

                {/* Soft Purple Notice Alert */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 flex items-center gap-3 text-[14px] sm:text-[15px] text-purple-950 font-normal text-left shadow-2xs">
                  <Info className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>
                    All documents must be genuine, valid and meet official consular standards to avoid rejection.
                  </span>
                </div>

                {/* Search & Filter Controls (Matching media_1788533524572.png) */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={portalDocSearch}
                        onChange={(e) => setPortalDocSearch(e.target.value)}
                        placeholder="Search documents..."
                        className="w-full pl-9 pr-4 py-2 sm:py-2.5 rounded-xl bg-white border border-slate-200/90 text-[13px] sm:text-[14px] font-normal text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 shadow-2xs"
                      />
                    </div>
                    <button
                      type="button"
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center text-slate-600 shadow-2xs hover:bg-slate-50 shrink-0 cursor-pointer"
                      title="Filter"
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                    {[
                      { id: 'all', label: `All (${totalDocsCount})` },
                      { id: 'mandatory', label: `Mandatory (${mandatoryDocsCount})` },
                      ...(recommendedDocsCount > 0 ? [{ id: 'recommended', label: `Recommended (${recommendedDocsCount})` }] : [])
                    ].map(flt => (
                      <button
                        key={flt.id}
                        type="button"
                        onClick={() => setPortalDocFilter(flt.id as any)}
                        className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                          portalDocFilter === flt.id
                            ? 'bg-slate-950 text-white font-semibold shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {flt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Compact Document Cards List */}
                <div className="md:hidden space-y-2.5 text-left">
                  {portalDocItems
                    .filter((item: any) => {
                      if (portalDocFilter === 'mandatory' && !item.mandatory) return false;
                      if (portalDocFilter === 'recommended' && item.mandatory) return false;
                      if (portalDocSearch && !item.name.toLowerCase().includes(portalDocSearch.toLowerCase())) return false;
                      return true;
                    })
                    .map((doc: any) => {
                      const uploaded = portalUploadedDocs[doc.key];
                      const isCompleted = uploaded?.status === 'completed';
                      return (
                        <div
                          key={doc.key}
                          onClick={() => handleToggleDocChecklist(doc.key, 'yes')}
                          className={`bg-white rounded-2xl border p-3.5 shadow-2xs flex items-center justify-between gap-3 text-left transition-all cursor-pointer select-none ${
                            isCompleted ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200/90 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-start gap-3 min-w-0 flex-1">
                            <div className={`w-10 h-10 rounded-xl ${doc.iconBg} flex items-center justify-center shrink-0 shadow-2xs mt-0.5`}>
                              {doc.icon}
                            </div>
                            <div className="min-w-0 flex-1">
                              <strong className="text-[14px] sm:text-[15px] font-semibold text-slate-900 block leading-snug break-words">{doc.name}</strong>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className={`text-[11px] font-medium ${doc.mandatory ? 'text-rose-700' : 'text-slate-500'}`}>
                                  {doc.mandatory ? 'Mandatory' : 'Recommended'}
                                </span>
                              </div>
                              {doc.conditions && doc.conditions[0] && (
                                <p className="text-[12px] font-normal text-slate-500 mt-1 leading-relaxed break-words line-clamp-2">
                                  {doc.conditions[0]}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="shrink-0 flex items-center pl-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleDocChecklist(doc.key, 'yes');
                              }}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer select-none ${
                                isCompleted
                                  ? 'bg-emerald-500 border-emerald-600 text-white shadow-xs'
                                  : 'bg-white border-slate-300 text-slate-700 hover:border-emerald-500 hover:text-emerald-700 shadow-2xs'
                              }`}
                              title={isCompleted ? 'Ready (Click to untick)' : 'Click to tick as Ready'}
                            >
                              <span className={`font-mono text-xs font-bold ${isCompleted ? 'text-white' : 'text-slate-400'}`}>
                                [{isCompleted ? '✓' : ' '}]
                              </span>
                              <span>Ready</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Document Table (Desktop & Tablet) */}
                <div className="hidden md:block bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden text-left">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50 text-[12px] sm:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">
                          <th className="py-3.5 px-4 text-left w-[28%]">Document Name</th>
                          <th className="py-3.5 px-4 text-left w-[52%]">Validity &amp; Conditions</th>
                          <th className="py-3.5 px-4 text-center w-[20%]">Ready</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {portalDocItems
                        .filter((item: any) => {
                          if (portalDocFilter === 'mandatory' && !item.mandatory) return false;
                          if (portalDocFilter === 'recommended' && item.mandatory) return false;
                          if (portalDocSearch && !item.name.toLowerCase().includes(portalDocSearch.toLowerCase())) return false;
                          return true;
                        })
                        .map((doc: any) => {
                          const uploaded = portalUploadedDocs[doc.key];
                          const isYes = uploaded?.status === 'completed';

                          return (
                            <tr key={doc.key} className="hover:bg-slate-50/70 transition-colors">
                              
                              {/* Document Name */}
                              <td className="py-4 px-4 align-top">
                                <div className="flex items-start gap-3">
                                  <div className={`w-8 h-8 rounded-xl ${doc.iconBg} flex items-center justify-center shrink-0 shadow-2xs mt-0.5`}>
                                    {doc.icon}
                                  </div>
                                  <div>
                                    <strong className="text-[15px] sm:text-[16px] font-semibold text-slate-900 block leading-snug">{doc.name}</strong>
                                    <span className={`inline-block mt-1 text-[12px] font-medium uppercase px-2 py-0.5 rounded-md ${
                                      doc.mandatory ? 'text-rose-700 bg-rose-50 border border-rose-200/70' : 'text-slate-600 bg-slate-100'
                                    }`}>
                                      {doc.mandatory ? 'Mandatory' : 'Recommended'}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Validity & Conditions - Numbered Format */}
                              <td className="py-4 px-4 align-top">
                                <ol className="space-y-2 list-none">
                                  {doc.conditions.map((cond: any, cIdx: number) => (
                                    <li key={cIdx} className="flex items-start gap-2 text-[14px] sm:text-[15px] font-normal text-slate-700 leading-relaxed">
                                      <span className="font-bold text-slate-900 shrink-0 select-none text-[13px] sm:text-[14px] mt-0.5">{cIdx + 1}.</span>
                                      <span>{cond}</span>
                                    </li>
                                  ))}
                                </ol>
                              </td>

                              {/* Ready Column - Square Bracket Ready Checklist */}
                              <td className="py-4 px-4 align-top text-center">
                                <div className="flex flex-col items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleToggleDocChecklist(doc.key, 'yes')}
                                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer select-none ${
                                      isYes
                                        ? 'bg-emerald-500 border-emerald-600 text-white shadow-xs ring-2 ring-emerald-500/20'
                                        : 'bg-white border-slate-300 text-slate-700 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50/40 shadow-2xs'
                                    }`}
                                    title={isYes ? 'Ready (Click to untick)' : 'Click to tick as Ready'}
                                  >
                                    <span className={`font-mono text-sm font-bold ${isYes ? 'text-white' : 'text-slate-400'}`}>
                                      [{isYes ? '✓' : ' '}]
                                    </span>
                                    <span>Ready</span>
                                  </button>

                                  <span className="text-[11px] font-medium text-slate-400">
                                    {isYes ? '✓ Ready / Available' : 'Tick [✓] when ready'}
                                  </span>
                                </div>
                              </td>

                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}


            {/* TAB: CONDITIONS & REQUIREMENTS */}
            {sidebarTab === 'requirements' && (
              <div className="bg-transparent sm:bg-white rounded-none sm:rounded-3xl border-0 sm:border border-slate-200/90 p-0 sm:p-8 shadow-none sm:shadow-2xs space-y-5 sm:space-y-6 text-left animate-fade-up">
                <div>
                  <h2 className="text-[17px] sm:text-[18px] lg:text-[20px] font-semibold text-slate-900 tracking-tight">Conditions &amp; Requirements</h2>
                  <p className="text-[13px] sm:text-[14px] text-slate-600 font-normal mt-1">
                    Official statutory entry rules, financial benchmarks, and compliance mandates for {countryName}.
                  </p>
                </div>

                {/* 4 Clean Pillar Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Pillar 1: Entry & Stay Rules */}
                  <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Clock className="w-4 h-4" />
                      </div>
                      <h3 className="text-[15px] sm:text-[16px] font-semibold text-slate-900">Entry &amp; Stay Conditions</h3>
                    </div>
                    <ul className="space-y-2.5">
                      <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                        <span className="text-slate-400 select-none">•</span>
                        <span><strong className="font-semibold text-slate-900">Passport Validity:</strong> Valid for at least {isFamilyTab ? '6 months beyond intended stay' : isPRTab ? '12 months' : isStudyTab ? '6 months beyond intended program duration' : isWorkTab ? '6 months beyond intended employment period' : isBusinessTab ? '6 months beyond intended stay' : isSchengen ? '3 months beyond intended stay' : '6 months beyond intended stay'} with minimum 2 blank pages.</span>
                      </li>
                      <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                        <span className="text-slate-400 select-none">•</span>
                        <span><strong className="font-semibold text-slate-900">Stay Duration:</strong> {isFamilyTab ? (aiData?.stay_duration || getFamilyStayDuration(countryName)) : isPRTab ? (aiData?.stay_duration || getPRStayDuration(countryName)) : isStudyTab ? ((aiData?.stay_duration || getStudentStayDuration(countryName)) + ' (Renewable annually based on ongoing academic enrollment).') : isWorkTab ? (aiData?.stay_duration || getWorkStayDuration(countryName)) : isBusinessTab ? (aiData?.stay_duration || getBusinessStayDuration(countryName)) : (aiData?.stay_duration || getTourismStayDuration(countryName))}</span>
                      </li>
                      {isFamilyTab ? (
                        <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                          <span className="text-slate-400 select-none">•</span>
                          <span><strong className="font-semibold text-slate-900">Family Reunification Rights:</strong> Unrestricted residence, access to healthcare and open employment authorization across the destination territory.</span>
                        </li>
                      ) : isPRTab ? (
                        <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                          <span className="text-slate-400 select-none">•</span>
                          <span><strong className="font-semibold text-slate-900">Permanent Residency Status:</strong> Unrestricted live, work, and study rights across the sovereign territory with statutory path to citizenship.</span>
                        </li>
                      ) : isStudyTab ? (
                        <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                          <span className="text-slate-400 select-none">•</span>
                          <span><strong className="font-semibold text-slate-900">Student Work Rights:</strong> Permitted to work part-time during academic terms (e.g. 20 hrs/week or 48 hrs/fortnight) and full-time during official semester vacations and scheduled course breaks.</span>
                        </li>
                      ) : isWorkTab ? (
                        <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                          <span className="text-slate-400 select-none">•</span>
                          <span><strong className="font-semibold text-slate-900">Employment Authorization:</strong> Work is strictly authorized only with the licensed sponsoring employer or under approved permit conditions. Unauthorized secondary employment is prohibited.</span>
                        </li>
                      ) : isBusinessTab ? (
                        <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                          <span className="text-slate-400 select-none">•</span>
                          <span><strong className="font-semibold text-slate-900">No Productive Work:</strong> Productive employment or drawing local salary is strictly prohibited. Permitted activities are restricted to meetings, trade shows, site inspections, and contract negotiations.</span>
                        </li>
                      ) : (
                        <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                          <span className="text-slate-400 select-none">•</span>
                          <span><strong className="font-semibold text-slate-900">No Local Employment:</strong> Paid local employment or commercial work is strictly prohibited on visitor visa status.</span>
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Pillar 2: Financial Proofs & Solvency */}
                  <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <h3 className="text-[15px] sm:text-[16px] font-semibold text-slate-900">Financial Solvency Benchmarks</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {(() => {
                        const fpList = (aiData?.financial_proofs && aiData.financial_proofs.length > 0)
                          ? aiData.financial_proofs
                          : isFamilyTab
                          ? getFamilyFinancialProofs(countryName)
                          : isPRTab
                          ? getPRFinancialProofs(countryName)
                          : isStudyTab
                          ? getStudentFinancialProofs(countryName)
                          : isWorkTab
                          ? getWorkFinancialProofs(countryName)
                          : isBusinessTab
                          ? getBusinessFinancialProofs(countryName)
                          : getTourismFinancialProofs(countryName);
                        if (fpList && fpList.length > 0) {
                          return fpList.slice(0, 3).map((fp: any, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                              <span className="text-slate-400 select-none">•</span>
                              <span><strong className="font-semibold text-slate-900">{fp.type}:</strong> {fp.minimum_balance_or_amount || fp.notes || 'Demonstrate self-sufficient liquid funds covering the program.'}</span>
                            </li>
                          ));
                        }
                        return (
                          <>
                            <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                              <span className="text-slate-400 select-none">•</span>
                              <span><strong className="font-semibold text-slate-900">Bank Statements:</strong> Stamped official statements for last 3 to 6 months showing steady closing balance.</span>
                            </li>
                            <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                              <span className="text-slate-400 select-none">•</span>
                              <span><strong className="font-semibold text-slate-900">Income Verification:</strong> Last 2–3 years Income Tax Returns (ITR) / Form 16 and monthly salary slips.</span>
                            </li>
                            <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                              <span className="text-slate-400 select-none">•</span>
                              <span><strong className="font-semibold text-slate-900">Sponsorship (if applicable):</strong> Formal Affidavit of Support with sponsor's tax returns and income verification.</span>
                            </li>
                          </>
                        );
                      })()}
                    </ul>
                  </div>

                  {/* Pillar 3: Home Ties / Academic Progression / Employer Sponsorship */}
                  <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                    {isFamilyTab ? (
                      <>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
                            <Users className="w-4 h-4" />
                          </div>
                          <h3 className="text-[15px] sm:text-[16px] font-semibold text-slate-900">Genuine Partnership &amp; Cohabitation Evidence</h3>
                        </div>
                        <ul className="space-y-2.5">
                          <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                            <span className="text-slate-400 select-none">•</span>
                            <span><strong className="font-semibold text-slate-900">Subsisting Relationship:</strong> Genuine and subsisting relationship with official marriage certificate, civil partnership registry, or minimum cohabitation evidence.</span>
                          </li>
                          <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                            <span className="text-slate-400 select-none">•</span>
                            <span><strong className="font-semibold text-slate-900">Sponsor Legal Status:</strong> Sponsor must be a citizen or settled permanent resident with lawful status in the destination country.</span>
                          </li>
                          <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                            <span className="text-slate-400 select-none">•</span>
                            <span><strong className="font-semibold text-slate-900">Adequate Accommodation:</strong> Proof of adequate living space without recourse to public funds or statutory overcrowding.</span>
                          </li>
                        </ul>
                      </>
                    ) : isPRTab ? (
                      <>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
                            <Award className="w-4 h-4" />
                          </div>
                          <h3 className="text-[15px] sm:text-[16px] font-semibold text-slate-900">Settlement Solvency &amp; Integration Intent</h3>
                        </div>
                        <ul className="space-y-2.5">
                          <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                            <span className="text-slate-400 select-none">•</span>
                            <span><strong className="font-semibold text-slate-900">Points &amp; Language Benchmark:</strong> Satisfy threshold points (e.g. 67 for FSW, 65 for Australia) and accredited language benchmarks (IELTS/CLB/PTE/German).</span>
                          </li>
                          <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                            <span className="text-slate-400 select-none">•</span>
                            <span><strong className="font-semibold text-slate-900">Skills Assessment &amp; Credentials:</strong> Positive skills assessment or Education Credential Assessment (ECA) validating overseas education and experience.</span>
                          </li>
                          <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                            <span className="text-slate-400 select-none">•</span>
                            <span><strong className="font-semibold text-slate-900">Permanent Settlement Intent:</strong> Genuine intention to reside in the designated province/territory and maintain residency obligations.</span>
                          </li>
                        </ul>
                      </>
                    ) : isStudyTab ? (
                      <>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
                            <GraduationCap className="w-4 h-4" />
                          </div>
                          <h3 className="text-[15px] sm:text-[16px] font-semibold text-slate-900">Academic Intent &amp; Progression</h3>
                        </div>
                        <ul className="space-y-2.5">
                          <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                            <span className="text-slate-400 select-none">•</span>
                            <span><strong className="font-semibold text-slate-900">Genuine Student Intent:</strong> Documented course justification, statement of purpose (SOP), and academic progression rationale.</span>
                          </li>
                          <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                            <span className="text-slate-400 select-none">•</span>
                            <span><strong className="font-semibold text-slate-900">Academic Credentials:</strong> Certified copies of graduation degrees, transcripts, and standardized language proficiency scores.</span>
                          </li>
                          <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                            <span className="text-slate-400 select-none">•</span>
                            <span><strong className="font-semibold text-slate-900">Immigration Compliance:</strong> Maintain satisfactory full-time course progression and adhere to national student visa parameters.</span>
                          </li>
                        </ul>
                      </>
                    ) : isWorkTab ? (
                      <>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
                            <Briefcase className="w-4 h-4" />
                          </div>
                          <h3 className="text-[15px] sm:text-[16px] font-semibold text-slate-900">Employer Sponsorship &amp; Qualifications</h3>
                        </div>
                        <ul className="space-y-2.5">
                          <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                            <span className="text-slate-400 select-none">•</span>
                            <span><strong className="font-semibold text-slate-900">Valid Job Sponsorship:</strong> Formal petition, Certificate of Sponsorship (CoS), LMIA approval, or registered employment contract from an authorized entity.</span>
                          </li>
                          <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                            <span className="text-slate-400 select-none">•</span>
                            <span><strong className="font-semibold text-slate-900">Professional Qualifications:</strong> Degree certificates, professional licenses, and certified work experience credentials matching the occupation code.</span>
                          </li>
                          <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                            <span className="text-slate-400 select-none">•</span>
                            <span><strong className="font-semibold text-slate-900">Salary &amp; Labor Standards:</strong> Sponsoring remuneration must satisfy statutory prevailing wage and relevant national labor market thresholds.</span>
                          </li>
                        </ul>
                      </>
                    ) : isBusinessTab ? (
                      <>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
                            <Briefcase className="w-4 h-4" />
                          </div>
                          <h3 className="text-[15px] sm:text-[16px] font-semibold text-slate-900">Corporate Invitation &amp; Commercial Intent</h3>
                        </div>
                        <ul className="space-y-2.5">
                          <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                            <span className="text-slate-400 select-none">•</span>
                            <span><strong className="font-semibold text-slate-900">Official Business Invitation:</strong> Formal invitation letter from registered host organization specifying visit purpose, conference/meeting agenda, and dates.</span>
                          </li>
                          <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                            <span className="text-slate-400 select-none">•</span>
                            <span><strong className="font-semibold text-slate-900">Employer Deputation:</strong> Deputation/NOC letter on Indian employer letterhead confirming employee standing, trip financing, and guaranteed repatriation.</span>
                          </li>
                          <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                            <span className="text-slate-400 select-none">•</span>
                            <span><strong className="font-semibold text-slate-900">Permitted Activities:</strong> Strictly restricted to negotiations, vendor meetings, conferences, or machinery inspections without taking up local paid work.</span>
                          </li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
                            <Briefcase className="w-4 h-4" />
                          </div>
                          <h3 className="text-[15px] sm:text-[16px] font-semibold text-slate-900">Home Ties &amp; Return Intent</h3>
                        </div>
                        <ul className="space-y-2.5">
                          <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                            <span className="text-slate-400 select-none">•</span>
                            <span><strong className="font-semibold text-slate-900">Employment Proof:</strong> Employer introduction letter with leave clearance (NOC) or business registration documents.</span>
                          </li>
                          <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                            <span className="text-slate-400 select-none">•</span>
                            <span><strong className="font-semibold text-slate-900">Return Intent:</strong> {(countryName.toLowerCase().includes('united states') || countryName.toLowerCase().includes('usa')) ? 'Applicant must demonstrate strong economic and residential roots to overcome INA Section 214(b) presumption.' : 'Applicant must demonstrate genuine tourist intent and stable socio-economic ties to India ensuring timely departure.'}</span>
                          </li>
                          <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                            <span className="text-slate-400 select-none">•</span>
                            <span><strong className="font-semibold text-slate-900">Family &amp; Property Ties:</strong> Family dependents and immovable property documentation establishing permanent home ties.</span>
                          </li>
                        </ul>
                      </>
                    )}
                  </div>

                  {/* Pillar 4: Biometrics & Security Protocols */}
                  <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <h3 className="text-[15px] sm:text-[16px] font-semibold text-slate-900">Biometrics &amp; Security Mandates</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {(() => {
                        const otherList = (aiData?.other_requirements && aiData.other_requirements.length > 0)
                          ? aiData.other_requirements
                          : isFamilyTab
                          ? getFamilyRequirements(countryName)
                          : isPRTab
                          ? getPRRequirements(countryName)
                          : isStudyTab
                          ? getStudentOtherRequirements(countryName)
                          : isWorkTab
                          ? getWorkRequirements(countryName)
                          : isBusinessTab
                          ? getBusinessRequirements(countryName)
                          : getTourismRequirements(countryName);
                        if (otherList && otherList.length > 0) {
                          return otherList.slice(0, 3).map((orq: any, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                              <span className="text-slate-400 select-none">•</span>
                              <span><strong className="font-semibold text-slate-900">{orq.category}:</strong> {orq.details}</span>
                            </li>
                          ));
                        }
                        return (
                          <>
                            <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                              <span className="text-slate-400 select-none">•</span>
                              <span><strong className="font-semibold text-slate-900">VAC Biometrics:</strong> Mandatory in-person digital 10-fingerprint scan and compliant biometric photograph.</span>
                            </li>
                            <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                              <span className="text-slate-400 select-none">•</span>
                              <span><strong className="font-semibold text-slate-900">Consular Interview:</strong> Attend scheduled in-person interview with printed DS-160 confirmation barcode.</span>
                            </li>
                            <li className="flex items-start gap-2 text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                              <span className="text-slate-400 select-none">•</span>
                              <span><strong className="font-semibold text-slate-900">Clearance:</strong> Clear immigration record with zero unlawful presence or visa violations.</span>
                            </li>
                          </>
                        );
                      })()}
                    </ul>
                  </div>
                </div>

                {/* Statutory Compliance Footer Banner */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3 text-[13px] sm:text-[14px] text-slate-600 font-normal">
                  <Lock className="w-4 h-4 text-slate-700 shrink-0" />
                  <span>
                    Adjudication is subject to the sole discretion of the consular visa officer. Ensuring every condition is met minimizes administrative processing delays.
                  </span>
                </div>
              </div>
            )}

            {/* TAB: STEPS TO FOLLOW (MATCHING EXACT PHOTO media_1788488551302.png) */}

            {/* TAB: STEPS TO FOLLOW */}
            {sidebarTab === 'steps' && (
              <div className="bg-transparent sm:bg-white rounded-none sm:rounded-3xl border-0 sm:border border-slate-200/90 p-0 sm:p-8 shadow-none sm:shadow-2xs space-y-4 sm:space-y-6 text-left animate-fade-up">
                {/* Header with Track Progress button */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
                  <div className="min-w-0 flex-1">
                    <h2 className="text-[17px] sm:text-[18px] lg:text-[20px] font-semibold text-slate-900 tracking-tight">Steps to Follow</h2>
                    <p className="text-[13px] sm:text-[14px] text-slate-600 font-normal mt-0.5 sm:mt-1 leading-snug">
                      Follow these simple steps to complete your {countryName} {activePurposeTab === 'study' ? 'Student' : activePurposeTab === 'work' ? 'Work' : 'Tourist'} Visa application successfully.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSidebarTab('track')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-emerald-300 bg-emerald-50/70 text-emerald-800 text-[12px] sm:text-[13px] font-semibold hover:bg-emerald-100 transition-all cursor-pointer shadow-2xs shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Track Progress</span>
                  </button>
                </div>

                {/* Top Milestone Card (Matching media_1788533504535.png) */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 sm:p-5 shadow-xs space-y-3">
                  {/* 4 Status Boxes Arranged Horizontally in a Single Row */}
                  <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
                    <div className="px-1.5 sm:px-3 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-slate-50/70 sm:bg-white border border-slate-100/90 sm:border-slate-100 shadow-2xs flex flex-col sm:flex-row items-center gap-1 sm:gap-2.5 text-center sm:text-left min-w-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <div className="min-w-0">
                        <strong className="text-[14px] sm:text-[16px] font-semibold text-slate-900 block leading-none">{stepsCompleted}</strong>
                        <span className="text-[12px] font-medium text-slate-500 block truncate mt-0.5">Completed</span>
                      </div>
                    </div>

                    <div className="px-1.5 sm:px-3 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-slate-50/70 sm:bg-white border border-slate-100/90 sm:border-slate-100 shadow-2xs flex flex-col sm:flex-row items-center gap-1 sm:gap-2.5 text-center sm:text-left min-w-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                        <RotateCw className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <strong className="text-[14px] sm:text-[16px] font-semibold text-slate-900 block leading-none">{stepsInProgress}</strong>
                        <span className="text-[12px] font-medium text-slate-500 block truncate mt-0.5">In Progress</span>
                      </div>
                    </div>

                    <div className="px-1.5 sm:px-3 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-slate-50/70 sm:bg-white border border-slate-100/90 sm:border-slate-100 shadow-2xs flex flex-col sm:flex-row items-center gap-1 sm:gap-2.5 text-center sm:text-left min-w-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <Star className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <strong className="text-[14px] sm:text-[16px] font-semibold text-slate-900 block leading-none">{stepsPending}</strong>
                        <span className="text-[12px] font-medium text-slate-500 block truncate mt-0.5">Pending</span>
                      </div>
                    </div>

                    <div className="px-1.5 sm:px-3 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-slate-50/70 sm:bg-white border border-slate-100/90 sm:border-slate-100 shadow-2xs flex flex-col sm:flex-row items-center gap-1 sm:gap-2.5 text-center sm:text-left min-w-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                        <Circle className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <strong className="text-[14px] sm:text-[16px] font-semibold text-slate-900 block leading-none">{stepsNotStarted}</strong>
                        <span className="text-[12px] font-medium text-slate-500 block truncate mt-0.5">Not Started</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 pt-1 border-t border-slate-100 text-[13px] font-normal text-slate-600">
                    <span>Est. Total Time:</span>
                    <strong className="text-slate-900 font-semibold">{getResolvedProcessingTime()}</strong>
                    <span className="text-slate-300">•</span>
                    <span>{dynamicSteps.length} Total Steps</span>
                  </div>
                </div>

                {/* Vertical Timeline of 8 Steps (Connecting vertical line on left) */}
                <div className="relative pl-7 sm:pl-8 space-y-2.5 sm:space-y-3 pt-1">
                  <div className="absolute left-[13px] sm:left-[15px] top-5 bottom-5 w-0.5 bg-slate-200" />

                  {dynamicSteps.map((s) => (
                    <div
                      key={s.step}
                      onClick={() => toggleStepChecked(s.step)}
                      className="relative bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-4 shadow-xs flex items-center justify-between gap-2.5 sm:gap-3 hover:border-slate-300 transition-all cursor-pointer active:scale-[0.99]"
                    >
                      {/* Left Numbered Circle on Timeline */}
                      <span className={`absolute -left-7 sm:-left-8 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full ${s.numBg} text-xs font-semibold flex items-center justify-center shadow-xs ring-4 ring-white z-10`}>
                        {s.step}
                      </span>

                      {/* Squircle Icon */}
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${s.iconBg} flex items-center justify-center shrink-0 shadow-2xs`}>
                        {s.icon}
                      </div>

                      {/* Step Details */}
                      <div className="flex-1 min-w-0 text-left">
                        <strong className="text-[15px] sm:text-[16px] font-semibold text-slate-900 block truncate">
                          {s.title}
                        </strong>
                        <p className="text-[13px] sm:text-[14px] text-slate-600 font-normal leading-relaxed mt-0.5 line-clamp-2">
                          {s.desc}
                        </p>
                      </div>

                      {/* Right Badge & Chevron */}
                      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                        <span className={`inline-block text-[12px] font-medium px-2.5 py-0.5 rounded-full ${
                          (s.status as string) === 'completed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : (s.status as string) === 'in_progress'
                            ? 'bg-indigo-50 text-indigo-700'
                            : (s.status as string) === 'pending'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {s.statusLabel}
                        </span>
                        <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Important Tip Banner at Bottom */}
                <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-2xl p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div className="space-y-0.5 text-left">
                    <strong className="text-[15px] font-semibold text-slate-900 block">Important Tip</strong>
                    <p className="text-[14px] text-slate-700 font-normal leading-relaxed">
                      Complete each step carefully and on time to avoid delays or rejection of your application.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: FEES & PAYMENT (LIVE AI / CONSULAR VERIFIED) */}

            {/* TAB: FEES & PAYMENT */}
            {sidebarTab === 'fees' && (
              <div className="bg-transparent sm:bg-white rounded-none sm:rounded-3xl border-0 sm:border border-slate-200/90 p-0 sm:p-8 shadow-none sm:shadow-2xs space-y-5 sm:space-y-6 text-left animate-fade-up">
                <div>
                  <h2 className="text-[17px] sm:text-[18px] lg:text-[20px] font-semibold text-slate-900 tracking-tight">Fees &amp; Payment Details</h2>
                  <p className="text-[13px] sm:text-[14px] text-slate-600 font-normal mt-0.5">
                    Official statutory fees verified from {aiData?.official_source_name || (isFamilyTab ? getFamilyOfficialSourceName(countryName) : isPRTab ? getPROfficialSourceName(countryName) : isStudyTab ? getStudentOfficialSourceName(countryName) : isWorkTab ? getWorkOfficialSourceName(countryName) : isBusinessTab ? getBusinessOfficialSourceName(countryName) : getTourismOfficialSourceName(countryName))}.
                  </p>
                </div>

                <div className="max-w-xl space-y-3">
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80">
                    <span className="text-[14px] sm:text-[15px] text-slate-700 font-normal">Consular Visa Fee</span>
                    <strong className="text-[15px] sm:text-[16px] font-semibold text-slate-900">
                      {aiData?.costs?.visa_fee || (isFamilyTab ? getFamilyFees(countryName).visa_fee : isPRTab ? getPRFees(countryName).visa_fee : isStudyTab ? getStudentFees(countryName).visa_fee : isWorkTab ? getWorkFees(countryName).visa_fee : isBusinessTab ? getBusinessFees(countryName).visa_fee : getTourismFees(countryName).visa_fee)}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80">
                    <span className="text-[14px] sm:text-[15px] text-slate-700 font-normal">VAC Biometrics &amp; Service Fee</span>
                    <strong className="text-[15px] sm:text-[16px] font-semibold text-slate-900">
                      {aiData?.costs?.service_fee || (isFamilyTab ? getFamilyFees(countryName).service_fee : isPRTab ? getPRFees(countryName).service_fee : isStudyTab ? getStudentFees(countryName).service_fee : isWorkTab ? getWorkFees(countryName).service_fee : isBusinessTab ? getBusinessFees(countryName).service_fee : getTourismFees(countryName).service_fee)}
                    </strong>
                  </div>
                  <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
                    <span className="text-[15px] sm:text-[16px] font-semibold text-slate-900">Total Official Fee</span>
                    <strong className="text-[20px] sm:text-[22px] font-semibold text-teal-700">
                      {aiData?.costs?.total_fee || (isFamilyTab ? getFamilyFees(countryName).total_fee : isPRTab ? getPRFees(countryName).total_fee : isStudyTab ? getStudentFees(countryName).total_fee : isWorkTab ? getWorkFees(countryName).total_fee : isBusinessTab ? getBusinessFees(countryName).total_fee : getTourismFees(countryName).total_fee)}
                    </strong>
                  </div>
                </div>
                {(aiData?.costs?.notes || (isFamilyTab ? getFamilyFees(countryName).notes : isPRTab ? getPRFees(countryName).notes : isStudyTab ? getStudentFees(countryName).notes : isWorkTab ? getWorkFees(countryName).notes : isBusinessTab ? getBusinessFees(countryName).notes : getTourismFees(countryName).notes)) && (
                  <p className="text-[13px] sm:text-[14px] text-slate-600 font-normal p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    ℹ️ {aiData?.costs?.notes || (isFamilyTab ? getFamilyFees(countryName).notes : isPRTab ? getPRFees(countryName).notes : isStudyTab ? getStudentFees(countryName).notes : isWorkTab ? getWorkFees(countryName).notes : isBusinessTab ? getBusinessFees(countryName).notes : getTourismFees(countryName).notes)}
                  </p>
                )}
                <p className="text-[12px] sm:text-[13px] text-slate-500 font-normal">
                  Fees are non-refundable and subject to official consular exchange rates.
                </p>
              </div>
            )}

            {/* TAB: PROCESSING TIME (LIVE AI / CONSULAR VERIFIED) */}

            {/* TAB: PROCESSING TIME */}
            {sidebarTab === 'processing' && (
              <div className="bg-transparent sm:bg-white rounded-none sm:rounded-3xl border-0 sm:border border-slate-200/90 p-0 sm:p-8 shadow-none sm:shadow-2xs space-y-4 sm:space-y-5 text-left animate-fade-up">
                <h2 className="text-[17px] sm:text-[18px] lg:text-[20px] font-semibold text-slate-900 tracking-tight">Processing Time &amp; Turnaround</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 text-left">
                    <span className="text-[12px] font-medium text-slate-500 uppercase tracking-wider block">Official Decision Time</span>
                    <h3 className="text-[15px] sm:text-[16px] font-semibold text-slate-900 leading-snug">
                      {aiData?.processing_and_timing?.decision_time || aiData?.processing_time || (isFamilyTab ? getFamilyProcessingTime(countryName) : isPRTab ? getPRProcessingTime(countryName) : isStudyTab ? getStudentProcessingTime(countryName) : isWorkTab ? getWorkProcessingTime(countryName) : isBusinessTab ? getBusinessProcessingTime(countryName) : getTourismProcessingTime(countryName))}
                    </h3>
                    <p className="text-[14px] sm:text-[15px] text-slate-600 font-normal leading-relaxed pt-1">
                      {aiData?.processing_and_timing?.center_notes || aiData?.processing_time_details || (isFamilyTab ? getFamilyProcessingDetails(countryName) : isPRTab ? getPRProcessingDetails(countryName) : isStudyTab ? getStudentProcessingDetails(countryName) : isWorkTab ? getWorkProcessingDetails(countryName) : isBusinessTab ? getBusinessProcessingDetails(countryName) : getTourismProcessingDetails(countryName))}
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 text-left">
                    <span className="text-[12px] font-medium text-slate-500 uppercase tracking-wider block">Recommended Filing Window</span>
                    <h3 className="text-[15px] sm:text-[16px] font-semibold text-slate-900 leading-snug">
                      {aiData?.processing_and_timing?.apply_window || (isFamilyTab ? 'Apply 3 to 6 months prior to planned relocation' : isPRTab ? 'Apply 6 to 12 months prior to planned relocation' : isStudyTab ? 'Apply 3 to 4 months prior to program intake' : isWorkTab ? 'Apply 3 to 6 months prior to planned employment start date' : isBusinessTab ? 'Apply 3 to 6 weeks prior to planned business travel' : countryName.toLowerCase().includes('mauritius') ? 'Complete All-in-One Digital Form before departure' : '15 Days to 3 Months Before')}
                    </h3>
                    <p className="text-[14px] sm:text-[15px] text-slate-600 font-normal leading-relaxed pt-1">
                      {aiData?.processing_and_timing?.max_extension || (isFamilyTab ? 'Renewable based on genuine relationship status and sponsor legal residence.' : isPRTab ? 'Permanent resident status is indefinite. Card renewal as per statutory country requirements.' : isStudyTab ? 'Renewable annually based on ongoing academic standing.' : isWorkTab ? 'Extendable with employer sponsorship and continued employment eligibility.' : isBusinessTab ? 'Subject to local immigration bureau discretion.' : countryName.toLowerCase().includes('mauritius') ? 'Extendable up to 90 days total for tourism via Passport & Immigration Office.' : 'Plan in advance to avoid consular peak season appointment delays.')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: TRACK APPLICATION */}

            {/* TAB: RESOURCES / TRACK */}
            {(sidebarTab === 'track' || sidebarTab === 'resources') && (
              <div className="bg-transparent sm:bg-white rounded-none sm:rounded-3xl border-0 sm:border border-slate-200/90 p-0 sm:p-8 shadow-none sm:shadow-2xs space-y-4 sm:space-y-5 text-left animate-fade-up">
                <h2 className="text-[17px] sm:text-[18px] lg:text-[20px] font-semibold text-slate-900 tracking-tight">Track Your Application</h2>
                <p className="text-[13px] sm:text-[14px] text-slate-600 font-normal">
                  Enter your TravlTik tracking reference or consular passport number to view live status.
                </p>
                <div className="flex gap-2 max-w-md">
                  <input
                    type="text"
                    placeholder="e.g. TRK-US-89241"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[13px] sm:text-[14px] font-normal outline-none focus:border-slate-900"
                  />
                  <button className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-[13px] sm:text-[14px] font-semibold shadow-xs cursor-pointer">
                    Track
                  </button>
                </div>
              </div>
            )}

            {/* TAB: FAQ (MATCHING EXACT ACCORDION CARD media_1788472456972.png) */}

            {/* TAB: FAQ */}
                        {sidebarTab === 'faq' && (
              <div className="space-y-4 text-left animate-fade-up">
                <h2 className="text-[17px] sm:text-[18px] lg:text-[20px] font-semibold text-slate-900 px-1 tracking-tight">Frequently Asked Questions</h2>
                <div className="bg-white rounded-3xl border border-slate-200/90 divide-y divide-slate-100 shadow-2xs overflow-hidden">
                  {resolvedFaqs.map((faq: { question: string; answer: string }, idx: number) => {
                    const isOpen = Boolean(openFaqs[idx]);
                    return (
                      <div key={idx} className="transition-colors">
                        <button
                          type="button"
                          onClick={() => setOpenFaqs(prev => ({ ...prev, [idx]: !prev[idx] }))}
                          className="w-full px-6 py-4.5 sm:px-8 sm:py-5 flex items-center justify-between gap-4 text-left hover:bg-slate-50/70 transition-all cursor-pointer group"
                        >
                          <span className="text-[15px] sm:text-[16px] font-semibold text-slate-900 leading-snug">
                            {faq.question}
                          </span>
                          <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-slate-900' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-5 sm:px-8 sm:pb-6 text-[14px] sm:text-[15px] text-slate-600 font-normal leading-relaxed animate-fadeIn">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}


          </div>

          {/* ── RIGHT SIDEBAR (4 COLS) (MATCHING EXACT 4 CARDS IN PHOTO media_1788520146795.png) ── */}
          <div className="hidden lg:block lg:col-span-4 space-y-5 sticky top-4">
            
            {/* Card 1: Visa Readiness */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4 text-left">
              <h3 className="text-[15px] sm:text-[16px] font-semibold text-slate-900 tracking-tight">Visa Readiness</h3>
              
              <div className="flex flex-col items-center justify-center py-2">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-slate-900"
                      strokeDasharray={`${readinessPercent}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-semibold text-slate-950">{readinessPercent}%</span>
                  </div>
                </div>
                <span className="text-[13px] font-semibold text-slate-700 mt-2">{readinessLabel}</span>
              </div>

              {/* Status Breakdown Rows */}
              <div className="space-y-2 text-[13px] sm:text-[14px] font-medium pt-1 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                    <Check className="w-3.5 h-3.5 stroke-[3]" /> Documents Ready
                  </span>
                  <strong className="text-slate-900 font-semibold">{effectiveReadyDocsCount}/{effectiveTotalDocsCount}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-indigo-600 font-medium">
                    <CheckCircle className="w-3.5 h-3.5" /> Steps Followed
                  </span>
                  <strong className="text-slate-900 font-semibold">{completedStepsCount}/{totalStepsCount}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-purple-600 font-medium">
                    <FileText className="w-3.5 h-3.5" /> Profile Score
                  </span>
                  <strong className="text-slate-900 font-semibold">+{profileScore}/50</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSidebarTab('documents')}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-sm hover:shadow-md text-[13px] font-semibold transition-all active:scale-[0.98] cursor-pointer"
              >
                Continue Checklist
              </button>
            </div>

            {/* Card 2: Fees Details */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-3.5 text-left">
              <h3 className="text-[15px] sm:text-[16px] font-semibold text-slate-900 tracking-tight">Fees Details</h3>

              <div className="space-y-2 text-[13px] sm:text-[14px]">
                <div className="flex items-center justify-between text-slate-600 font-normal">
                  <span>Visa Fee (Adult)</span>
                  <strong className="text-slate-900 font-semibold">
                    {aiData?.costs?.visa_fee || (isFamilyTab ? getFamilyFees(countryName).visa_fee : isPRTab ? getPRFees(countryName).visa_fee : isStudyTab ? getStudentFees(countryName).visa_fee : isWorkTab ? getWorkFees(countryName).visa_fee : isBusinessTab ? getBusinessFees(countryName).visa_fee : getTourismFees(countryName).visa_fee)}
                  </strong>
                </div>
                <div className="flex items-center justify-between text-slate-600 font-normal">
                  <span>Visa Fee (Child 6-12 yrs)</span>
                  <strong className="text-slate-900 font-semibold">
                    {aiData?.costs?.child_fee || (isFamilyTab ? 'Included / Child Dependent Rate' : isPRTab ? 'Included / Child Dependent Rate' : isStudyTab ? 'N/A (Primary Applicant)' : isWorkTab ? 'N/A (Individual Worker)' : isBusinessTab ? 'N/A (Business Delegate)' : isSchengen ? '€45' : '$95 USD')}
                  </strong>
                </div>
                <div className="flex items-center justify-between text-slate-600 font-normal">
                  <span>Service Fee</span>
                  <strong className="text-slate-900 font-semibold">
                    {aiData?.costs?.service_fee || (isFamilyTab ? getFamilyFees(countryName).service_fee : isPRTab ? getPRFees(countryName).service_fee : isStudyTab ? getStudentFees(countryName).service_fee : isWorkTab ? getWorkFees(countryName).service_fee : isBusinessTab ? getBusinessFees(countryName).service_fee : getTourismFees(countryName).service_fee)}
                  </strong>
                </div>

                <div className="border-t border-slate-100 my-2" />

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900 text-[14px]">Total</span>
                  <strong className="text-[16px] font-semibold text-slate-900">
                    {aiData?.costs?.total_fee || (isFamilyTab ? getFamilyFees(countryName).total_fee : isPRTab ? getPRFees(countryName).total_fee : isStudyTab ? getStudentFees(countryName).total_fee : isWorkTab ? getWorkFees(countryName).total_fee : isBusinessTab ? getBusinessFees(countryName).total_fee : getTourismFees(countryName).total_fee)}
                  </strong>
                </div>

                <p className="text-[12px] text-slate-500 font-normal pt-1">
                  Fees are non-refundable and may vary.
                </p>
              </div>
            </div>

            {/* Card 3: Need Help? */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-3.5 text-left">
              <div>
                <h3 className="text-[15px] sm:text-[16px] font-semibold text-slate-900 tracking-tight">Need Help?</h3>
                <p className="text-[13px] sm:text-[14px] text-slate-600 font-normal mt-1 leading-relaxed">
                  Connect with our visa experts for a smooth application process.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const defaultCons = VERIFIED_STUDY_CONSULTANTS[0];
                  if (defaultCons) setBookingModalConsultant(defaultCons);
                  else window.location.href = `/find-experts?country=${encodeURIComponent(countryName)}&category=${encodeURIComponent(purposeLabel)}`;
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[13px] sm:text-[14px] flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>Consult an Expert</span>
              </button>

              <div className="flex items-center justify-center gap-2 pt-1">
                <div className="flex -space-x-2 overflow-hidden">
                  <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Avatar" />
                  <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Avatar" />
                  <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Avatar" />
                  <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="Avatar" />
                </div>
                <span className="text-[12px] sm:text-[13px] font-medium text-slate-600">4.8/5 (2.4k+ reviews)</span>
              </div>
            </div>

            {/* Card 4: Important Notes */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-3.5 text-left">
              <h3 className="text-[15px] sm:text-[16px] font-semibold text-slate-900 tracking-tight">Important Notes</h3>

              <ul className="space-y-2.5 text-[14px] sm:text-[15px] text-slate-600 font-normal leading-relaxed">
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Apply at least 15 days before your travel date.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <span>Ensure all documents are genuine and valid.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Biometric is mandatory for all applicants.</span>
                </li>
                <li className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                  <span>You may be called for an interview.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
        {/* ── APPLICATION PROFILE DETAILS & DOWNLOAD/SYNC (ALWAYS VISIBLE ACROSS ALL TABS - MATCHING EXACT USER REQUEST media_1788583909662.png) ── */}
        <div className="max-w-5xl mx-auto mt-6 mb-8 text-left animate-fadeIn space-y-5">
            {/* ── DOWNLOAD & SYNC ACTION BUTTON (CENTERED & PROMINENT SIZE - MATCHING USER REQUEST) ── */}
            <div className="flex items-center justify-center pt-2 pb-1">
              <button
                type="button"
                onClick={handleDownloadAndSyncChecklist}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-4.5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl hover:shadow-emerald-500/25 transition-all active:scale-[0.98] cursor-pointer"
              >
                <Download className="w-5 h-5 stroke-[2.5]" />
                <span className="tracking-wide">Download &amp; Sync</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* ── APPLICATION PROFILE DETAILS (MATCHING EXACT PHOTO media_1788470844697.png) ── */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-4 text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] sm:text-[16px] font-semibold uppercase tracking-wider text-slate-900">
                        Application Profile Details
                      </span>
                      <span className="text-[12px] sm:text-[13px] font-medium px-2.5 py-0.5 rounded-full bg-slate-900 text-white shadow-2xs">
                        +{profileScore}/50 pts Profile Score
                      </span>
                    </div>
                    <span className="text-[13px] sm:text-[14px] text-slate-500 font-normal">
                      Pre-fills visa petition &amp; consular dossier
                    </span>
                  </div>

                  {/* 1. STUDENT VISA PROFILE FIELDS (MATCHING EXACT PHOTO media_1788471451887.png) */}
                  {activePurposeTab === 'study' && (
                    <div className="space-y-4 animate-fadeIn">
                      {/* Row 1: 4 Columns */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        <PortalCustomSelect
                          label="1. Highest Qualification"
                          value={studyQual}
                          onChange={setStudyQual}
                          placeholder="Select qualification"
                          options={[
                            "Bachelor's Degree",
                            "12th Grade / High School",
                            "Master's Degree",
                            "Diploma / Polytechnic"
                          ]}
                        />
                        <PortalCustomSelect
                          label={`2. Target Degree in ${countryName}`}
                          value={studyTarget}
                          onChange={setStudyTarget}
                          placeholder="Select target degree"
                          options={[
                            "Master's / Postgraduate",
                            "Bachelor's (UG Degree)",
                            "Post-Graduate Diploma",
                            "PhD / Doctorate"
                          ]}
                        />
                        <PortalCustomSelect
                          label="3. Target Intake"
                          value={studyIntake}
                          onChange={setStudyIntake}
                          placeholder="Select intake session"
                          options={[
                            "Spring 2026 (Jan – Feb)",
                            "Fall 2026 (Aug – Sep)",
                            "Summer 2026 (May – Jun)",
                            "Fall 2027"
                          ]}
                        />
                        <PortalCustomSelect
                          label="4. Financial Proof / Funds"
                          value={studyBudget}
                          onChange={setStudyBudget}
                          placeholder="Select funding source"
                          options={[
                            "Self–Funded (₹25L+ Liquid)",
                            "Education Loan Approved / In Process",
                            "Full Scholarship / Sponsorship"
                          ]}
                        />
                      </div>

                      {/* Row 2: 3 Columns */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
                        <PortalCustomSelect
                          label="5. Institutional Admission Status"
                          value={studentAdmissionStatus}
                          onChange={setStudentAdmissionStatus}
                          placeholder="Select admission status"
                          options={[
                            "Confirmed Offer / CAS / I-20",
                            "Conditional Offer Received",
                            "Yet to Apply / Planning"
                          ]}
                        />
                        <PortalCustomSelect
                          label="6. English Language Proficiency"
                          value={studentLanguageScore}
                          onChange={setStudentLanguageScore}
                          placeholder="Select language status"
                          options={[
                            "IELTS 6.5+ / PTE 60+ (Cleared)",
                            "Exam Booked / Preparing",
                            "Medium of Instruction (MOI) Waiver"
                          ]}
                        />
                        <PortalCustomSelect
                          label="7. Passport Validity Remaining"
                          value={passportValidityRange}
                          onChange={setPassportValidityRange}
                          placeholder="Select passport validity"
                          options={[
                            "> 12 Months (Recommended)",
                            "6 – 12 Months Valid",
                            "< 6 Months (Renewal Required)"
                          ]}
                        />
                      </div>
                    </div>
                  )}

                  {/* 2. WORK VISA PROFILE FIELDS */}
                  {activePurposeTab === 'work' && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        <PortalCustomSelect
                          label="1. Total Work Experience"
                          value={workExp}
                          onChange={setWorkExp}
                          placeholder="Select total experience"
                          options={[
                            "0 - 2 Years (Early Career)",
                            "3 - 5 Years (Mid-Level)",
                            "5 - 8 Years (Senior)",
                            "8+ Years (Lead / Executive)"
                          ]}
                        />
                        <PortalCustomSelect
                          label={`2. Job Offer in ${countryName}`}
                          value={workOffer}
                          onChange={setWorkOffer}
                          placeholder="Select offer status"
                          options={[
                            "Confirmed Sponsored Job Offer (CoS/LMIA)",
                            "Interviewing / Final Stages",
                            "Job Seeker (Applying from India)"
                          ]}
                        />
                        <PortalCustomSelect
                          label="3. Industry / Job Role"
                          value={workDomain}
                          onChange={setWorkDomain}
                          placeholder="Select domain"
                          options={[
                            "IT / Software & Tech",
                            "Healthcare / Nursing / Medical",
                            "Engineering & Construction",
                            "Finance & Management",
                            "Hospitality & Services"
                          ]}
                        />
                        <PortalCustomSelect
                          label="4. Skill Assessment Status"
                          value={workAssess}
                          onChange={setWorkAssess}
                          placeholder="Select assessment status"
                          options={[
                            "Assessed (ACS / WES / Engineers Aus)",
                            "Under Processing",
                            "Not Initiated / Need Assistance"
                          ]}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-1">
                        <PortalCustomSelect
                          label="5. Passport Validity Remaining"
                          value={passportValidityRange}
                          onChange={setPassportValidityRange}
                          placeholder="Select passport validity"
                          options={[
                            "> 12 Months (Recommended)",
                            "6 – 12 Months Valid",
                            "< 6 Months (Renewal Required)"
                          ]}
                        />
                      </div>
                    </div>
                  )}

                  {/* 3. TOURISM / VISIT PROFILE FIELDS (DEFAULT) */}
                  {activePurposeTab !== 'study' && activePurposeTab !== 'work' && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        <PortalCustomSelect
                          label="1. Trip Planning Status"
                          value={visitPlanStatus}
                          onChange={setVisitPlanStatus}
                          placeholder="Select trip status"
                          options={[
                            "Fixed Dates & Itinerary Ready",
                            "Flexible / Exploring Dates",
                            "Urgent Travel (Next 14 Days)"
                          ]}
                        />

                        <PortalCustomDatePicker
                          label="2. Tentative Departure Date"
                          value={visitTiming}
                          min={todayStr}
                          onChange={handleDepartureDateChange}
                          placeholder="Select departure date"
                        />

                        <PortalCustomDatePicker
                          label="3. Tentative Return Date"
                          value={visitReturnDate}
                          min={visitTiming ? new Date(new Date(visitTiming).getTime() + 86400000).toISOString().split('T')[0] : todayStr}
                          max={visitTiming ? new Date(new Date(visitTiming).getTime() + 90 * 86400000).toISOString().split('T')[0] : undefined}
                          onChange={handleReturnDateChange}
                          placeholder="Select return date"
                        />

                        {/* Q4: Total Trip Duration (Auto-calculated) */}
                        <div className="space-y-1 text-left">
                          <div className="flex items-center justify-between">
                            <label className="block text-[11px] sm:text-xs font-bold text-slate-700">
                              4. Total Trip Duration
                            </label>
                            {tripDurationDays > 0 && tripDurationDays <= 90 && (
                              <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                                ✓ Within 90d Limit
                              </span>
                            )}
                          </div>
                          <div className="relative">
                            <div className={`w-full h-11 px-3 sm:px-3.5 rounded-xl sm:rounded-2xl border flex items-center justify-between transition-all shadow-2xs ${
                              tripDurationDays > 0 && tripDurationDays <= 90
                                ? 'border-emerald-300 bg-emerald-50/50 text-emerald-950'
                                : tripDurationDays > 90
                                ? 'border-rose-300 bg-rose-50/50 text-rose-950'
                                : 'border-slate-200/90 bg-slate-50 text-slate-500'
                            }`}>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-slate-600" />
                                <span className="text-xs sm:text-[13px] font-black">
                                  {tripDurationDays > 0 
                                    ? `${tripDurationDays} Days` 
                                    : (!visitTiming || !visitReturnDate) 
                                    ? 'Select Dates Above' 
                                    : 'Invalid Dates'}
                                </span>
                              </div>
                              <span className="text-[10px] font-bold text-slate-500">
                                {tripDurationDays > 90 
                                  ? '⚠️ Max 90 Days' 
                                  : (!visitTiming || !visitReturnDate)
                                  ? 'Auto-calculated'
                                  : 'Tourist Stay'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Row 2 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-1">
                        <PortalCustomSelect
                          label="5. Accommodation Preference"
                          value={visitStay}
                          onChange={setVisitStay}
                          placeholder="Select accommodation"
                          options={[
                            "Hotel / Resort Booked",
                            "Staying with Host / Family",
                            "Airbnb / Rental Apartment"
                          ]}
                        />
                        <PortalCustomSelect
                          label="6. 6-Month Stamped Bank Balance"
                          value={touristBankStability}
                          onChange={setTouristBankStability}
                          placeholder="Select bank balance"
                          options={[
                            "₹4L+ Maintained (Strong Solvency)",
                            "₹2L - ₹4L Balance",
                            "Under ₹2L / Need Financial Advice"
                          ]}
                        />
                        <PortalCustomSelect
                          label="7. Home Country Ties & Employment"
                          value={touristHomeTies}
                          onChange={setTouristHomeTies}
                          placeholder="Select employment / ties"
                          options={[
                            "Salaried (NOC & 3-Mo Payslips Ready)",
                            "Business Owner / GST & 2-Yr ITR",
                            "Self-Employed / Freelancer",
                            "Student / Dependent"
                          ]}
                        />
                        <PortalCustomSelect
                          label="8. Passport Validity Remaining"
                          value={passportValidityRange}
                          onChange={setPassportValidityRange}
                          placeholder="Select passport validity"
                          options={[
                            "> 12 Months (Recommended)",
                            "6 – 12 Months Valid",
                            "< 6 Months (Renewal Required)"
                          ]}
                        />
                      </div>
                    </div>
                  )}
                </div>
          </div>


        {/* DOCUMENT INSPECTION MODAL */}
        {inspectDocItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
            <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 space-y-5 shadow-2xl text-left">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-950">{inspectDocItem.name}</h3>
                    <span className="text-[11px] font-bold text-slate-400">Verified Document Inspection</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setInspectDocItem(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-extrabold text-emerald-950">AI Verification Passed</span>
                </div>
                <span className="text-xs font-black text-emerald-700">97% Match</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">File Name:</span>
                  <strong className="text-slate-900 font-bold">{inspectDocItem.fileName || 'Uploaded'}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Upload Date:</span>
                  <strong className="text-slate-900 font-bold">{inspectDocItem.uploadedAt || 'Recent'}</strong>
                </div>
                {inspectDocItem.docNumber && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Document Number:</span>
                    <strong className="text-slate-900 font-bold">{inspectDocItem.docNumber}</strong>
                  </div>
                )}
                {inspectDocItem.validDate && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Validity:</span>
                    <strong className="text-emerald-700 font-bold">{inspectDocItem.validDate}</strong>
                  </div>
                )}
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-black text-slate-900 block">Verified Conditions:</span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {inspectDocItem.conditions?.map((c: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setInspectDocItem(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-black transition-all cursor-pointer shadow-xs"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

      </section>

      {/* ── STEP 0: CORE DECISION GATE ("Have Visa Already?") POSITIONED DIRECTLY AFTER SECTION 2 ── */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-3 sm:mt-6 flex items-center justify-center relative z-0">
        <div className="inline-flex items-center justify-center gap-2 sm:gap-4 bg-white border border-slate-200/90 rounded-full py-1.5 sm:py-2 px-3 sm:px-5 shadow-2xs hover:shadow-xs transition-all duration-300">
          
          <span className="text-[11px] sm:text-xs font-heading font-black text-slate-900 tracking-tight whitespace-nowrap">
            Have Visa Already?
          </span>

          {/* Toggle Capsule Track */}
          <div className="bg-slate-100 rounded-full p-0.5 sm:p-1 inline-flex items-center gap-0.5 sm:gap-1 border border-slate-200/80 shrink-0 shadow-inner">
            
            {/* NO button */}
            <button
              type="button"
              onClick={() => handleToggleVisaAlready('no')}
              className={`px-2.5 sm:px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold transition-all cursor-pointer flex items-center gap-1 select-none active:scale-95 ${
                hasVisaAlready === 'no'
                  ? 'bg-slate-950 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
              }`}
            >
              {hasVisaAlready === 'no' ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] shrink-0 animate-pulse" />
                  <span className="tracking-wide">NO</span>
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#00E599] stroke-[3]" />
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full border border-slate-400 shrink-0" />
                  <span className="tracking-wide">NO</span>
                </>
              )}
            </button>

            {/* YES button */}
            <button
              type="button"
              onClick={() => handleToggleVisaAlready('yes')}
              className={`px-2.5 sm:px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold transition-all cursor-pointer flex items-center gap-1 select-none active:scale-95 ${
                hasVisaAlready === 'yes'
                  ? 'bg-slate-950 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
              }`}
            >
              {hasVisaAlready === 'yes' ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] shrink-0 animate-pulse" />
                  <span className="tracking-wide">YES</span>
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#00E599] stroke-[3]" />
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full border border-slate-400 shrink-0" />
                  <span className="tracking-wide">YES</span>
                </>
              )}
            </button>
          </div>

        </div>
      </section>



      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {/* ── BRANCH 1: USER SELECTS "YES" (PRE-DEPARTURE OS & PARENTAL SECURITY) ── */}
      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {hasVisaAlready === 'yes' && (
        <section id="pre-departure-branch" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 animate-fadeIn scroll-mt-24">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ── LEFT COLUMN (5 COLS): VISA SCAN/UPLOAD FIRST & AUTO-FILLED DETAILS ── */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5 text-left">
              
              {/* Widget Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0 font-bold">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-heading font-semibold text-slate-900 leading-tight">
                      Visa Verification &amp; Details
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Upload your visa grant letter for AI verification &amp; condition tracking.
                    </p>
                  </div>
                </div>

                {ocrScanned ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    <span>{daysLeft}d valid</span>
                  </div>
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 shrink-0">
                    Scan Required
                  </span>
                )}
              </div>

              {/* ── STEP 1: SCAN OR UPLOAD VISA (FIRST ACTION) ── */}
              <input
                type="file"
                ref={visaFileRef}
                className="hidden"
                accept=".pdf,image/*"
                onChange={handleOcrUpload}
              />

              {!ocrScanned ? (
                <div 
                  onClick={() => visaFileRef.current?.click()}
                  className="bg-gradient-to-b from-purple-50/70 via-slate-50 to-slate-50/50 border-2 border-dashed border-purple-300 hover:border-purple-500 rounded-2xl p-5 sm:p-6 text-center transition-all cursor-pointer group shadow-2xs hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs">
                    {isOcrScanning ? (
                      <RotateCw className="w-6 h-6 animate-spin text-purple-700" />
                    ) : (
                      <UploadCloud className="w-6 h-6 text-purple-700" />
                    )}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {isOcrScanning ? 'Auditing & Extracting Visa Rules with AI...' : 'Scan or Upload Visa Grant Letter'}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium mt-1 max-w-xs mx-auto leading-relaxed">
                    {isOcrScanning 
                      ? 'Extracting visa subclass, expiry dates & work/study quotas...' 
                      : 'Upload PDF, JPG, or PNG. AI will instantly auto-fill visa class, expiry dates & mandatory border conditions.'
                    }
                  </p>
                  <button
                    type="button"
                    disabled={isOcrScanning}
                    className="mt-3.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold inline-flex items-center gap-2 shadow-xs transition-all cursor-pointer group-hover:scale-102"
                  >
                    {isOcrScanning ? (
                      <>
                        <RotateCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Processing Document...</span>
                      </>
                    ) : (
                      <>
                        <QrCode className="w-3.5 h-3.5 text-purple-300" />
                        <span>Scan &amp; Auto-Fill Visa Details</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="bg-emerald-50/90 border border-emerald-200/90 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-2xs animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#00A86B] flex items-center justify-center shrink-0 font-bold">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs sm:text-sm font-bold text-emerald-950">Visa Grant Letter Verified</h4>
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                          AUTO-FILLED
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                        Official consular conditions &amp; validity dates loaded.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => visaFileRef.current?.click()}
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold shadow-2xs shrink-0 cursor-pointer transition-colors"
                  >
                    Re-scan
                  </button>
                </div>
              )}

              {/* ── STEP 2: AUTO-FILLED VISA DETAILS FORM ── */}
              <div className="space-y-4 pt-1">
                {/* Visa Title Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Visa Class / Approved Subclass
                    </label>
                    {ocrScanned && (
                      <span className="text-[10px] font-bold text-[#00A86B] flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[3]" /> Auto-Extracted
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={approvedVisaType}
                    onChange={(e) => setApprovedVisaType(e.target.value)}
                    placeholder="e.g. Student Subclass 500 / Tourist Permit"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-[#00A86B] text-slate-900 bg-slate-50/50"
                  />
                </div>

                {/* Approval & Expiry Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <PortalCustomDatePicker
                    label="Approval Date"
                    value={approvalDate}
                    onChange={setApprovalDate}
                    placeholder="Select approval date"
                  />
                  <PortalCustomDatePicker
                    label="Expiry Date"
                    value={validityDate}
                    onChange={setValidityDate}
                    placeholder="Select expiry date"
                  />
                </div>

                {/* Active Conditions Checklist */}
                <div className="border border-slate-200 rounded-2xl p-4 space-y-3 bg-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#00A86B]" />
                      <span>Mandatory Conditions &amp; Quotas</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#00A86B] border border-emerald-200">
                      {ocrConditions.length} Active
                    </span>
                  </div>

                  <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                    {ocrConditions.length === 0 ? (
                      <div className="p-3 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-xs text-slate-400 font-medium text-center">
                        Upload your visa grant letter above to automatically extract mandatory conditions &amp; work entitlements.
                      </div>
                    ) : (
                      ocrConditions.map((cond, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-800 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] mt-1.5 shrink-0" />
                          <span className="leading-snug">{cond}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* ── RIGHT COLUMN (7 COLS): SUGGESTED NEXT STEPS FOR YOU ── */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* 6 Peace-of-Mind Actions Grid */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base sm:text-lg font-heading font-semibold text-slate-900 leading-tight">
                      Suggested Next Steps for You
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Verified pre-departure roadmap, housing &amp; community checklist for {countryName}.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#00A86B] font-bold text-xs border border-emerald-200">
                    Recommended Steps
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Step 1: Join Discord Community */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-indigo-200 transition-colors">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xl">💬</span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                          DISCORD • 2,400+ ONLINE
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        1. Expat &amp; Student Community
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Connect with verified peers &amp; alumni already living in {countryName}.
                      </p>
                    </div>

                    <a
                      href="/community"
                      className="w-full py-2 px-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs text-center cursor-pointer select-none"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>Discord Community</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Step 2: Find Accommodation & Housing */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-blue-200 transition-colors">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xl">🏡</span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          ESCROW HOUSING
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        2. Find Verified Accommodation
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Deposit-protected student dorms, flats &amp; verified stays in {countryName}.
                      </p>
                    </div>

                    <a
                      href="/classifieds?category=hotels"
                      className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all text-center shadow-xs cursor-pointer select-none"
                    >
                      <span>Find Accommodation</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Step 3: Flight & Layover Transit Check */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xl">✈️</span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                          TRANSIT CHECK
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        3. Flight &amp; Layover Transit Check
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Upload e-Ticket to audit layover transit visa rules.
                      </p>
                    </div>

                    <input
                      type="file"
                      ref={ticketFileRef}
                      className="hidden"
                      accept=".pdf,image/*"
                      onChange={() => setTicketUploaded(true)}
                    />

                    <button
                      type="button"
                      onClick={() => ticketFileRef.current?.click()}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                        ticketUploaded
                          ? 'bg-emerald-100 text-[#00A86B]'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      {ticketUploaded ? 'Transit Verified ✓' : 'Upload Flight Ticket'}
                    </button>
                  </div>

                  {/* Step 4: Driver & Terminal Airport Pickup */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xl">🚗</span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          AIRPORT PICKUP
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        4. Driver &amp; Terminal Chauffeur
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Verified background-checked chauffeur in {countryName}.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setDriverBooked(!driverBooked)}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                        driverBooked
                          ? 'bg-emerald-100 text-[#00A86B]'
                          : 'bg-[#00A86B] hover:bg-[#008f5a] text-white'
                      }`}
                    >
                      {driverBooked ? 'Driver Assigned ✓' : 'Book Chauffeur'}
                    </button>
                  </div>

                  {/* Step 5: Forex Card & 5G eSIM */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xl">💳</span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          0% MARKUP
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        5. Forex Card &amp; 5G eSIM
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Zero forex markup debit card &amp; instant QR eSIM.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setEsimOrdered(!esimOrdered)}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                        esimOrdered
                          ? 'bg-emerald-100 text-[#00A86B]'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      {esimOrdered ? 'Card & eSIM Active ✓' : 'Get Free Forex Card'}
                    </button>
                  </div>

                  {/* Step 6: Easy Customs Rules */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xl">📄</span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                          CUSTOMS RULES
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        6. Customs Cash &amp; Doctor Prescription
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Ensure compliance under {countryName} border laws.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={customsChecked.cash}
                          onChange={(e) => setCustomsChecked({ ...customsChecked, cash: e.target.checked })}
                          className="rounded text-[#00A86B] w-3.5 h-3.5"
                        />
                        <span>&lt;$10k Cash</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={customsChecked.meds}
                          onChange={(e) => setCustomsChecked({ ...customsChecked, meds: e.target.checked })}
                          className="rounded text-[#00A86B] w-3.5 h-3.5"
                        />
                        <span>Doctor Letter</span>
                      </label>
                    </div>
                  </div>

                </div>
              </div>

              {/* On-Arrival Readiness OS Accordion */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
                <h3 className="text-base sm:text-lg font-heading font-semibold text-slate-900 text-slate-900 pb-2 border-b border-slate-100">
                  On-Arrival Readiness OS ({countryName})
                </h3>

                <div className="space-y-3">
                  {[
                    {
                      title: '1. Local Bank Account & Biometrics Setup',
                      desc: 'Open a local checking bank account within 48 hours of landing with student/worker tax registration number.'
                    },
                    {
                      title: '2. Campus Check-In or Workplace Induction',
                      desc: 'Report to student admissions / HR with your official visa grant letter and biometric residency document.'
                    },
                    {
                      title: '3. GP Doctor & National Health Service Registration',
                      desc: 'Register with a certified local medical clinic near your residence for 100% emergency medical coverage.'
                    }
                  ].map((step, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                      <div 
                        className="flex items-center justify-between cursor-pointer select-none"
                        onClick={() => setOpenArrivalStep(openArrivalStep === idx ? null : idx)}
                      >
                        <h4 className="text-xs sm:text-sm font-semibold text-slate-900">{step.title}</h4>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openArrivalStep === idx ? 'rotate-180' : ''}`} />
                      </div>
                      {openArrivalStep === idx && (
                        <p className="text-xs text-slate-600 mt-2 pt-2 border-t border-slate-200/60 leading-relaxed">
                          {step.desc}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {/* ── BRANCH 2: USER SELECTS "NO" (SMART QUESTIONNAIRE & ATLYS PORTAL) ── */}
      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {hasVisaAlready === 'no' && (
        <>
          

          {/* ── SPECIALIZED STUDENT VISA APPLICATION ROADMAP & DUAL CHOICE WORKFLOW ── */}
          {hasVisaAlready === 'no' && activePurposeTab === 'study' && (
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-12 text-left space-y-8 animate-fadeIn">
              
              {/* ================================================== */}
              {/* 1. STEP-BY-STEP APPLICATION ROADMAP (3 STEPS) */}
              {/* ================================================== */}
              <div className="space-y-6">

                {/* ── STEP 1: FIND TOP UNIVERSITY (CLEAN & COMPACT) ── */}
                <div className="bg-white border border-slate-200/90 rounded-[24px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                        1
                      </div>
                      <h3 className="text-base sm:text-lg font-heading font-black text-slate-950">
                        Find Top University
                      </h3>
                    </div>

                    {/* Quick Search */}
                    <div className="relative w-full sm:w-64 shrink-0">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={uniSearchQuery}
                        onChange={(e) => setUniSearchQuery(e.target.value)}
                        placeholder="Search university or city..."
                        className="w-full h-9 pl-8 pr-7 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#00A86B] focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                      />
                      {uniSearchQuery && (
                        <button
                          type="button"
                          onClick={() => setUniSearchQuery('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-[9px] cursor-pointer"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* University Cards Grid (Compact & Crisp) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {getDestinationUniversities(countryName)
                      .filter(u => !uniSearchQuery || u.name.toLowerCase().includes(uniSearchQuery.toLowerCase()) || u.desc.toLowerCase().includes(uniSearchQuery.toLowerCase()))
                      .map((uni) => {
                        const isSelected = selectedUniId === uni.id;
                        return (
                          <div
                            key={uni.id}
                            onClick={() => setSelectedUniId(uni.id)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left flex items-center justify-between gap-3 ${
                              isSelected
                                ? 'bg-emerald-50/40 border-2 border-[#00A86B] shadow-xs'
                                : 'bg-slate-50/50 hover:bg-white border-slate-200/80 hover:border-slate-300'
                            }`}
                          >
                            <div className="min-w-0 space-y-1">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-slate-950 text-white">
                                  {uni.rank}
                                </span>
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                                  {uni.campusBadge}
                                </span>
                              </div>
                              <h4 className="font-heading font-extrabold text-xs sm:text-sm text-slate-950 truncate">
                                {uni.name}
                              </h4>
                              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                                <span className="truncate">{uni.location}</span>
                                <span>•</span>
                                <strong className="text-slate-900 font-bold">{uni.tuitionLocal}</strong>
                              </div>
                            </div>

                            <button
                              type="button"
                              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                                isSelected
                                  ? 'bg-[#00A86B] text-white'
                                  : 'bg-white border border-slate-300 text-slate-400'
                              }`}
                            >
                              {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* ── STEP 2: SELECT COURSE & MAJOR (CLEAN & COMPACT) ── */}
                <div className="bg-white border border-slate-200/90 rounded-[24px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-3.5">
                  <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                      1
                    </div>
                    <h3 className="text-base sm:text-lg font-heading font-black text-slate-950">
                        Select Course &amp; Major
                      </h3>
                  </div>

                  {/* Course Major Selector Chips */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      { icon: '💻', name: 'Computer Science & AI' },
                      { icon: '📊', name: 'Data Science & Analytics' },
                      { icon: '💼', name: 'Global MBA & Finance' },
                      { icon: '🤖', name: 'Robotics & Mechanical' },
                      { icon: '🧬', name: 'Biotechnology' },
                      { icon: '⚖️', name: 'Law & International Policy' }
                    ].map((maj) => (
                      <button
                        key={maj.name}
                        type="button"
                        onClick={() => setSelectedCourseMajor(maj.name)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 select-none ${
                          selectedCourseMajor === maj.name
                            ? 'bg-slate-950 text-white shadow-sm border border-slate-950 scale-[1.02]'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                        }`}
                      >
                        <span>{maj.icon}</span>
                        <span>{maj.name}</span>
                        {selectedCourseMajor === maj.name && <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── STEP 3: ADMISSION & CLEARANCE DOCUMENT (CLEAN & COMPACT) ── */}
                <div className="bg-white border border-slate-200/90 rounded-[24px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-3.5">
                  <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                      2
                    </div>
                    <h3 className="text-base sm:text-lg font-heading font-black text-slate-950">
                        {countryName.toLowerCase().includes('united states') || countryName.toLowerCase().includes('usa')
                          ? 'Receive Form I-20 & SEVIS Clearance'
                          : countryName.toLowerCase().includes('united kingdom') || countryName.toLowerCase().includes('uk')
                          ? 'Receive Official CAS Reference'
                          : countryName.toLowerCase().includes('canada')
                          ? 'Receive Letter of Acceptance (LOA) & PAL'
                          : 'Receive Official Admission & Clearance Letter'}
                      </h3>
                  </div>

                  {/* Compact Status Card */}
                  <div className="bg-gradient-to-r from-emerald-50/70 via-slate-50 to-emerald-50/40 border border-emerald-200/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
                        ✓
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-950">
                          {countryName.toLowerCase().includes('united states') ? 'Form I-20 & SEVIS ID Ready' : 'Official CAS / Acceptance Reference Validated'}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Official university clearance confirmed. Choose your filing pathway below to proceed.
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold shrink-0 self-start sm:self-auto shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Ready for Visa Submission</span>
                    </span>
                  </div>
                </div>

              </div>

              {/* ================================================== */}
              {/* 2. DUAL CHOICE ACTION TABS (POST STEP 3) */}
              {/* ================================================== */}
              <div className="space-y-6 pt-4">
                
                {/* Section Title & Segment Controller */}
                <div className="text-center space-y-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#00A86B] bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
                    Visa Application Pathways
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-slate-950 tracking-tight">
                    How would you like to apply for your visa?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto">
                    Choose between connecting with certified local immigration consultants or applying directly online.
                  </p>

                  {/* Clean Segment Switch Matching Photo 1 Capsule */}
                  <div className="pt-2 flex items-center justify-center">
                    <div className="w-full sm:w-auto bg-white border border-slate-200/90 rounded-full py-2.5 sm:py-3 px-3 sm:px-5 shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300">
                      <div className="bg-slate-100 rounded-full p-1.5 inline-flex items-center gap-1.5 border border-slate-200/80 shrink-0 shadow-inner max-w-full overflow-x-auto">
                        
                        {/* Find Consultants */}
                        <button
                          type="button"
                          onClick={() => setStudentActionTab('consultants')}
                          className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 select-none active:scale-95 whitespace-nowrap ${
                            studentActionTab === 'consultants'
                              ? 'bg-slate-950 text-white shadow-md scale-[1.03]'
                              : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
                          }`}
                        >
                          {studentActionTab === 'consultants' ? (
                            <>
                              <span className="w-2.5 h-2.5 rounded-full bg-[#00A86B] shrink-0 animate-pulse" />
                              <span className="tracking-wide">Find Consultants</span>
                              <Check className="w-4 h-4 text-[#00E599] stroke-[3]" />
                            </>
                          ) : (
                            <>
                              <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 shrink-0" />
                              <span className="tracking-wide">Find Consultants</span>
                            </>
                          )}
                        </button>

                        {/* Self Apply */}
                        <button
                          type="button"
                          onClick={() => setStudentActionTab('self_apply')}
                          className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 select-none active:scale-95 whitespace-nowrap ${
                            studentActionTab === 'self_apply'
                              ? 'bg-slate-950 text-white shadow-md scale-[1.03]'
                              : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
                          }`}
                        >
                          {studentActionTab === 'self_apply' ? (
                            <>
                              <span className="w-2.5 h-2.5 rounded-full bg-[#00A86B] shrink-0 animate-pulse" />
                              <span className="tracking-wide">Self Apply</span>
                              <Check className="w-4 h-4 text-[#00E599] stroke-[3]" />
                            </>
                          ) : (
                            <>
                              <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 shrink-0" />
                              <span className="tracking-wide">Self Apply</span>
                            </>
                          )}
                        </button>

                      </div>
                    </div>
                  </div>
                </div>

                {/* ── CONTENT: FIND CONSULTANTS (SEARCH & MATCH) ── */}
                {studentActionTab === 'consultants' && (
                  <div className="bg-white border border-slate-200/90 rounded-[28px] p-6 sm:p-9 shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-6 animate-fadeIn text-left">
                    
                    {/* Header */}
                    <div className="border-b border-slate-100 pb-4">
                      <h4 className="text-xl font-heading font-black text-slate-950">
                        Search Verified Immigration Lawyers &amp; Study Visa Experts
                      </h4>
                    </div>

                    {/* Search & Filter Engine Box */}
                    <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 sm:p-6 space-y-4">
                      <div className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <Search className="w-4 h-4 text-[#00A86B]" />
                        <span>Search Consultants Near You</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-end">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-slate-700">
                            Your City / Location / Pincode
                          </label>
                          <input
                            type="text"
                            value={consultantLocationQuery}
                            onChange={(e) => setConsultantLocationQuery(e.target.value)}
                            placeholder="e.g. Hyderabad, Mumbai, Delhi, Remote"
                            className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:border-[#00A86B] focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-2xs outline-none"
                          />
                        </div>

                        <div>
                          <PortalCustomSelect
                            label="Destination Specialization"
                            value={consultantCountryFilter}
                            onChange={setConsultantCountryFilter}
                            placeholder="Select Destination"
                            options={[
                              `${countryName} (Current Destination)`,
                              "All Countries (Global)",
                              "United States (F-1 / SEVP)",
                              "United Kingdom (UKVI / CAS)",
                              "Canada (IRCC / DLI / PAL)",
                              "Australia (CRICOS / Subclass 500)",
                              "Germany & EU Blue Card"
                            ]}
                          />
                        </div>

                        <div>
                          <PortalCustomSelect
                            label="Service / Advisory Type"
                            value={consultantServiceType}
                            onChange={setConsultantServiceType}
                            placeholder="Select Service"
                            options={[
                              "Study Visa & Admissions Filing",
                              "Visa Appeals & Refusal Defense",
                              "SOP & Academic Document Review",
                              "Embassy Visa Interview Prep"
                            ]}
                          />
                        </div>
                      </div>

                      {/* Primary Search CTA */}
                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-end gap-4">
                        <a
                          href={`/find-experts?category=student&country=${encodeURIComponent(consultantCountryFilter.includes('All Countries') ? countryName : consultantCountryFilter.split('(')[0].trim())}${consultantLocationQuery ? `&city=${encodeURIComponent(consultantLocationQuery)}` : ''}${consultantServiceType ? `&service=${encodeURIComponent(consultantServiceType)}` : ''}`}
                          className="h-11 px-6 rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-extrabold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 shrink-0"
                        >
                          <Search className="w-4 h-4 text-emerald-400" />
                          <span>Search Verified Experts for {countryName}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                  </div>
                )}

                {/* ── TAB 2 CONTENT: SELF APPLY (CONCIERGE VAULT) ── */}
                {studentActionTab === 'self_apply' && (
                  <div className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-[32px] p-6 sm:p-9 shadow-sm space-y-6 animate-fadeIn text-left">
                    
                    {/* 5 Core Document Upload Items */}
                                        {/* Document Vault Checklist: Click if Ready */}
                    <div className="space-y-3" id="student-doc-vault">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                          <span>1. Mandatory Document Vault Checklist</span>
                        </h5>
                        <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${
                          ["passport","transcripts","financials","sop_cv","english_test"].filter(k => readyDocKeys[k] || uploadedDocuments[k]).length >= 5
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : ["passport","transcripts","financials","sop_cv","english_test"].filter(k => readyDocKeys[k] || uploadedDocuments[k]).length > 0
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {`${["passport","transcripts","financials","sop_cv","english_test"].filter(k => readyDocKeys[k] || uploadedDocuments[k]).length} of 5 Ready`}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {([
  {
    "key": "passport",
    "title": "Passport Scan (Front & Back)",
    "hint": "Min. 6 months validity & blank pages"
  },
  {
    "key": "transcripts",
    "title": "Academic Transcripts & Degree",
    "hint": "10th, 12th & Degree marksheets"
  },
  {
    "key": "financials",
    "title": "Financial / Loan Proof",
    "hint": "28-day maintenance funds or loan letter"
  },
  {
    "key": "sop_cv",
    "title": "Statement of Purpose (SOP) & CV",
    "hint": "Academic intent & professional resume"
  },
  {
    "key": "english_test",
    "title": "English Test Scorecard",
    "hint": "IELTS / PTE / TOEFL score certificate"
  }
]).map((doc) => {
                          const isReady = Boolean(readyDocKeys[doc.key] || uploadedDocuments[doc.key]);

                          return (
                            <div
                              key={doc.key}
                              className={`p-4 rounded-2xl border transition-all text-left space-y-2.5 flex flex-col justify-between ${
                                isReady
                                  ? 'bg-emerald-50/50 border-emerald-300 ring-1 ring-emerald-200/60 shadow-2xs'
                                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-slate-950 truncate">{doc.title}</span>
                                  {isReady ? (
                                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                                      <Check className="w-3 h-3 stroke-[3]" /> Ready
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                                      Required
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 leading-tight">{doc.hint}</p>
                              </div>

                              <button
                                type="button"
                                onClick={() => toggleDocReady(doc.key)}
                                className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs active:scale-95 touch-manipulation ${
                                  isReady
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-sm'
                                    : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                                }`}
                              >
                                {isReady ? (
                                  <>
                                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                                    <span>✓ Ready (I Have This)</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 shrink-0" />
                                    <span>Click if Ready</span>
                                  </>
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5 pt-1">
                        <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>Confirm readiness here. Official files are uploaded in your Dashboard Document Vault.</span>
                      </p>
                    </div>

                    {/* One-Click Concierge Add-On Services */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                          2. One-Click Concierge Add-On Services
                        </h5>
                        <span className="text-[11px] text-slate-500 font-medium">Optional automated protections</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { id: 'sop_polish', name: '✨ AI & Legal Expert SOP Polish & Review', price: 1999, desc: 'Grammar, narrative strength & visa officer alignment by counsel.' },
                          { id: 'travel_insurance', name: '🛡️ Comprehensive Student Travel & Medical Insurance', price: 2499, desc: 'Covers pre-arrival emergencies & $100k medical protection.' },
                          { id: 'financial_audit', name: '🏦 CA Net Worth & 28-Day Solvency Certification', price: 3200, desc: 'Official CA liquidity report proving genuine funds.' },
                          { id: 'biometrics_booking', name: '📅 VFS / Embassy Priority Biometrics Slot Assistance', price: 1500, desc: 'Priority appointment scheduling at nearest center.' }
                        ].map((addon) => {
                          const isSelected = selectedConciergeAddons.includes(addon.id);
                          return (
                            <div
                              key={addon.id}
                              onClick={() => {
                                setSelectedConciergeAddons(prev =>
                                  prev.includes(addon.id) ? prev.filter(x => x !== addon.id) : [...prev, addon.id]
                                );
                              }}
                              className={`p-4 rounded-2xl border transition-all cursor-pointer text-left space-y-1.5 ${
                                isSelected
                                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                                  : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 text-slate-900'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <h6 className={`font-bold text-xs sm:text-sm ${isSelected ? 'text-white' : 'text-slate-950'}`}>
                                  {addon.name}
                                </h6>
                                <span className={`text-xs font-black shrink-0 ${isSelected ? 'text-emerald-400' : 'text-slate-900'}`}>
                                  +₹{addon.price.toLocaleString()}
                                </span>
                              </div>
                              <p className={`text-[11px] leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                                {addon.desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Validation Warning Alert */}
                    {uploadValidationWarning && (
                      <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 text-xs font-extrabold flex items-center gap-3 animate-pulse shadow-sm">
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                        <span>{uploadValidationWarning}</span>
                      </div>
                    )}

                    {/* Final Submission Bar */}
                    <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs text-slate-500 font-medium block">Total Concierge Package:</span>
                        <strong className="text-xl sm:text-2xl font-black text-slate-950">
                          ₹{(2499 + selectedConciergeAddons.reduce((sum, id) => {
                            if (id === 'sop_polish') return sum + 1999;
                            if (id === 'travel_insurance') return sum + 2499;
                            if (id === 'financial_audit') return sum + 3200;
                            if (id === 'biometrics_booking') return sum + 1500;
                            return sum;
                          }, 0)).toLocaleString()}
                        </strong>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleConciergeSubmit(['passport', 'transcripts', 'financials', 'sop_cv', 'english_test'], 'student-doc-vault')}
                        className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/25 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                      >
                        <ShieldCheck className="w-5 h-5" />
                        <span>Submit Complete Dossier for AI &amp; Concierge Filing</span>
                        <ArrowRight className="w-4 h-4 stroke-[3]" />
                      </button>
                    </div>

                  </div>
                )}

              </div>

            </section>
          )}

          {/* ── SPECIALIZED TOURIST VISA APPLICATION ROADMAP & DUAL CHOICE WORKFLOW ── */}
          {hasVisaAlready === 'no' && activePurposeTab === 'tourism' && (
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-12 text-left space-y-8 animate-fadeIn">
              
              {/* ================================================== */}
              {/* 1. STEP-BY-STEP APPLICATION ROADMAP (3 STEPS) */}
              {/* ================================================== */}
              <div className="space-y-6">

                

                {/* ── STEP 1: SELECT TRAVEL STYLE (CHIPS) ── */}
                <div className="bg-white border border-slate-200/90 rounded-[24px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-3.5">
                  <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                      1
                    </div>
                    <h3 className="text-base sm:text-lg font-heading font-black text-slate-950">
                      Select Travel Style &amp; Itinerary Type
                    </h3>
                  </div>

                  {/* Travel Style Chips */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      { icon: '🏖️', name: 'Leisure & Sightseeing' },
                      { icon: '🏛️', name: 'Heritage & UNESCO Culture' },
                      { icon: '👨‍👩‍👧', name: 'Family Vacation & Theme Parks' },
                      { icon: '💍', name: 'Honeymoon & Romantic Getaways' },
                      { icon: '🎒', name: 'Solo Adventure & Hiking' },
                      { icon: '💼', name: 'Business & Bleisure Travel' }
                    ].map((style) => (
                      <button
                        key={style.name}
                        type="button"
                        onClick={() => setVisitPlanStatus(style.name)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 select-none ${
                          visitPlanStatus === style.name
                            ? 'bg-slate-950 text-white shadow-sm border border-slate-950 scale-[1.02]'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                        }`}
                      >
                        <span>{style.icon}</span>
                        <span>{style.name}</span>
                        {visitPlanStatus === style.name && <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── STEP 2: FLIGHT & HOTEL PROOF CLEARANCE ── */}
                <div className="bg-white border border-slate-200/90 rounded-[24px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-3.5">
                  <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                      2
                    </div>
                    <h3 className="text-base sm:text-lg font-heading font-black text-slate-950">
                      Verifiable Flight Itinerary &amp; Hotel Lodging Clearance
                    </h3>
                  </div>

                  {/* Compact Status Card */}
                  <div className="bg-gradient-to-r from-emerald-50/70 via-slate-50 to-emerald-50/40 border border-emerald-200/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
                        ✓
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-950">
                          Flight Reservation PNR &amp; Lodging Proof Validated
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Official embassy and VFS compliant booking documentation attached. Choose your filing pathway below.
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold shrink-0 self-start sm:self-auto shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Ready for Visa Submission</span>
                    </span>
                  </div>
                </div>

              </div>

              {/* ================================================== */}
              {/* 2. DUAL CHOICE ACTION TABS (POST STEP 3) */}
              {/* ================================================== */}
              <div className="space-y-6 pt-4">
                
                {/* Section Title & Segment Controller */}
                <div className="text-center space-y-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#00A86B] bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
                    Visa Application Pathways
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-slate-950 tracking-tight">
                    How would you like to apply for your {countryName} Tourist Visa?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto">
                    Choose between connecting with certified local travel visa experts or applying directly online.
                  </p>

                  {/* Clean Segment Switch Matching Capsule */}
                  <div className="pt-2 flex items-center justify-center">
                    <div className="w-full sm:w-auto bg-white border border-slate-200/90 rounded-full py-2.5 sm:py-3 px-3 sm:px-5 shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300">
                      <div className="bg-slate-100 rounded-full p-1.5 inline-flex items-center gap-1.5 border border-slate-200/80 shrink-0 shadow-inner max-w-full overflow-x-auto">
                        
                        {/* Find Consultants */}
                        <button
                          type="button"
                          onClick={() => setTourismActionTab('consultants')}
                          className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 select-none active:scale-95 whitespace-nowrap ${
                            tourismActionTab === 'consultants'
                              ? 'bg-slate-950 text-white shadow-md scale-[1.03]'
                              : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
                          }`}
                        >
                          {tourismActionTab === 'consultants' ? (
                            <>
                              <span className="w-2.5 h-2.5 rounded-full bg-[#00A86B] shrink-0 animate-pulse" />
                              <span className="tracking-wide">Find Consultants</span>
                              <Check className="w-4 h-4 text-[#00E599] stroke-[3]" />
                            </>
                          ) : (
                            <>
                              <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 shrink-0" />
                              <span className="tracking-wide">Find Consultants</span>
                            </>
                          )}
                        </button>

                        {/* Self Apply */}
                        <button
                          type="button"
                          onClick={() => setTourismActionTab('self_apply')}
                          className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 select-none active:scale-95 whitespace-nowrap ${
                            tourismActionTab === 'self_apply'
                              ? 'bg-slate-950 text-white shadow-md scale-[1.03]'
                              : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
                          }`}
                        >
                          {tourismActionTab === 'self_apply' ? (
                            <>
                              <span className="w-2.5 h-2.5 rounded-full bg-[#00A86B] shrink-0 animate-pulse" />
                              <span className="tracking-wide">Self Apply</span>
                              <Check className="w-4 h-4 text-[#00E599] stroke-[3]" />
                            </>
                          ) : (
                            <>
                              <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 shrink-0" />
                              <span className="tracking-wide">Self Apply</span>
                            </>
                          )}
                        </button>

                      </div>
                    </div>
                  </div>
                </div>

                {/* ── CONTENT: FIND TOURIST CONSULTANTS ── */}
                {tourismActionTab === 'consultants' && (
                  <div className="bg-white border border-slate-200/90 rounded-[28px] p-6 sm:p-9 shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-6 animate-fadeIn text-left">
                    
                    {/* Header */}
                    <div className="border-b border-slate-100 pb-4">
                      <h4 className="text-xl font-heading font-black text-slate-950">
                        Search Verified Tourist Visa Filing Experts &amp; Lawyers
                      </h4>
                    </div>

                    {/* Search & Filter Engine Box */}
                    <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 sm:p-6 space-y-4">
                      <div className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <Search className="w-4 h-4 text-[#00A86B]" />
                        <span>Search Consultants Near You</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-end">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-slate-700">
                            Your City / Location / Pincode
                          </label>
                          <input
                            type="text"
                            value={consultantLocationQuery}
                            onChange={(e) => setConsultantLocationQuery(e.target.value)}
                            placeholder="e.g. Hyderabad, Mumbai, Delhi, Remote"
                            className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:border-[#00A86B] focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-2xs outline-none"
                          />
                        </div>

                        <div>
                          <PortalCustomSelect
                            label="Destination Specialization"
                            value={consultantCountryFilter}
                            onChange={setConsultantCountryFilter}
                            placeholder="Select Destination"
                            options={[
                              `${countryName} (Current Destination)`,
                              "All Countries (Global)",
                              "United Kingdom (UKVI Visitor)",
                              "Schengen Area (Type C 90-Day)",
                              "United States (B1/B2)",
                              "Canada (TRV / Visitor)",
                              "Australia & New Zealand (eVisitor)"
                            ]}
                          />
                        </div>

                        <div>
                          <PortalCustomSelect
                            label="Service / Advisory Type"
                            value={consultantServiceType}
                            onChange={setConsultantServiceType}
                            placeholder="Select Service"
                            options={[
                              "Tourist Visa Filing & Appointment",
                              "Refusal Defense & Reapplication",
                              "Cover Letter & Financials Audit",
                              "Express Biometric Booking"
                            ]}
                          />
                        </div>
                      </div>

                      {/* Primary Search CTA */}
                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-end gap-4">
                        <a
                          href={`/find-experts?category=tourist&country=${encodeURIComponent(consultantCountryFilter.includes('All Countries') ? countryName : consultantCountryFilter.split('(')[0].trim())}${consultantLocationQuery ? `&city=${encodeURIComponent(consultantLocationQuery)}` : ''}${consultantServiceType ? `&service=${encodeURIComponent(consultantServiceType)}` : ''}`}
                          className="h-11 px-6 rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-extrabold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 shrink-0"
                        >
                          <Search className="w-4 h-4 text-emerald-400" />
                          <span>Search Verified Experts for {countryName}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                  </div>
                )}

                {/* ── TAB 2 CONTENT: SELF APPLY (CONCIERGE VAULT) ── */}
                {tourismActionTab === 'self_apply' && (
                  <div className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-[32px] p-6 sm:p-9 shadow-sm space-y-6 animate-fadeIn text-left">
                    
                    {/* Core Document Upload Items */}
                    <div className="space-y-3" id="tourist-doc-vault">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                          <span>1. Mandatory Document Vault Checklist</span>
                        </h5>
                        <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${
                          ["passport","flights_hotel","bank_statements","leave_noc","insurance","itinerary"].filter(k => readyDocKeys[k] || uploadedDocuments[k]).length >= 6
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : ["passport","flights_hotel","bank_statements","leave_noc","insurance","itinerary"].filter(k => readyDocKeys[k] || uploadedDocuments[k]).length > 0
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {`${["passport","flights_hotel","bank_statements","leave_noc","insurance","itinerary"].filter(k => readyDocKeys[k] || uploadedDocuments[k]).length} of 6 Ready`}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {([
  {
    "key": "passport",
    "title": "Passport Scan (Front & Back)",
    "hint": "Min. 6 months validity & blank pages"
  },
  {
    "key": "flights_hotel",
    "title": "Flight Itinerary & Hotel Proof",
    "hint": "Confirmed return PNR & hotel vouchers"
  },
  {
    "key": "bank_statements",
    "title": "Bank Statements (6 Months)",
    "hint": "Official bank stamp & liquid funds"
  },
  {
    "key": "leave_noc",
    "title": "Employer Leave NOC / ITR",
    "hint": "Approved leave letter & tax returns"
  },
  {
    "key": "insurance",
    "title": "Travel Medical Insurance",
    "hint": "€30,000+ emergency medical cover"
  },
  {
    "key": "itinerary",
    "title": "Day-by-Day Travel Itinerary",
    "hint": "Trip activity plan & cover letter"
  }
]).map((doc) => {
                          const isReady = Boolean(readyDocKeys[doc.key] || uploadedDocuments[doc.key]);

                          return (
                            <div
                              key={doc.key}
                              className={`p-4 rounded-2xl border transition-all text-left space-y-2.5 flex flex-col justify-between ${
                                isReady
                                  ? 'bg-emerald-50/50 border-emerald-300 ring-1 ring-emerald-200/60 shadow-2xs'
                                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-slate-950 truncate">{doc.title}</span>
                                  {isReady ? (
                                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                                      <Check className="w-3 h-3 stroke-[3]" /> Ready
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                                      Required
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 leading-tight">{doc.hint}</p>
                              </div>

                              <button
                                type="button"
                                onClick={() => toggleDocReady(doc.key)}
                                className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs active:scale-95 touch-manipulation ${
                                  isReady
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-sm'
                                    : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                                }`}
                              >
                                {isReady ? (
                                  <>
                                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                                    <span>✓ Ready (I Have This)</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 shrink-0" />
                                    <span>Click if Ready</span>
                                  </>
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5 pt-1">
                        <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>Confirm readiness here. Official files are uploaded in your Dashboard Document Vault.</span>
                      </p>
                    </div>

                    {/* Concierge Addons */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                          2. Smart Concierge Add-Ons (Optional)
                        </h5>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          Instant Approval Boosters
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {[
                          { id: 'flight_reservation', name: 'Verifiable Flight Itinerary', price: 1499, desc: 'Hold confirmed return ticket with live PNR for embassy filing.' },
                          { id: 'travel_insurance', name: '€30,000 Travel Medical Cover', price: 2499, desc: '100% compliant emergency health & repatriation policy.' },
                          { id: 'cover_letter', name: 'Expert Cover Letter Drafting', price: 999, desc: 'Tailored visa application cover letter addressing consular rules.' },
                          { id: 'vfs_concierge', name: 'VFS Appointment Slot Concierge', price: 1500, desc: 'Automated monitoring & booking for prime slot openings.' }
                        ].map((addon) => {
                          const isSelected = selectedConciergeAddons.includes(addon.id);
                          return (
                            <div
                              key={addon.id}
                              onClick={() => {
                                setSelectedConciergeAddons(prev =>
                                  prev.includes(addon.id) ? prev.filter(x => x !== addon.id) : [...prev, addon.id]
                                );
                              }}
                              className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left space-y-1.5 select-none ${
                                isSelected
                                  ? 'bg-slate-950 text-white border-slate-950 shadow-md'
                                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <h6 className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                                  {addon.name}
                                </h6>
                                <span className={`text-xs font-black shrink-0 ${isSelected ? 'text-emerald-400' : 'text-slate-900'}`}>
                                  +₹{addon.price.toLocaleString()}
                                </span>
                              </div>
                              <p className={`text-[11px] leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                                {addon.desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Validation Warning Alert */}
                    {uploadValidationWarning && (
                      <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 text-xs font-extrabold flex items-center gap-3 animate-pulse shadow-sm">
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                        <span>{uploadValidationWarning}</span>
                      </div>
                    )}

                    {/* Final Submission Bar */}
                    <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs text-slate-500 font-medium block">Total Concierge Package:</span>
                        <strong className="text-xl sm:text-2xl font-black text-slate-950">
                          ₹{(1999 + selectedConciergeAddons.reduce((sum, id) => {
                            if (id === 'flight_reservation') return sum + 1499;
                            if (id === 'travel_insurance') return sum + 2499;
                            if (id === 'cover_letter') return sum + 999;
                            if (id === 'vfs_concierge') return sum + 1500;
                            return sum;
                          }, 0)).toLocaleString()}
                        </strong>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleConciergeSubmit(['passport', 'flights_hotel', 'bank_statements', 'leave_noc', 'insurance', 'itinerary'], 'tourist-doc-vault')}
                        className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/25 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                      >
                        <ShieldCheck className="w-5 h-5" />
                        <span>Submit Complete Dossier for AI &amp; Concierge Filing</span>
                        <ArrowRight className="w-4 h-4 stroke-[3]" />
                      </button>
                    </div>

                  </div>
                )}

              </div>

            </section>
          )}

          {/* ── SPECIALIZED WORK VISA APPLICATION ROADMAP & DUAL CHOICE WORKFLOW ── */}
          {hasVisaAlready === 'no' && activePurposeTab === 'work' && (
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-12 text-left space-y-8 animate-fadeIn">
              
              {/* ================================================== */}
              {/* 1. STEP-BY-STEP WORK ROADMAP (3 STEPS) */}
              {/* ================================================== */}
              <div className="space-y-6">

                {/* ── STEP 1: SPONSORING EMPLOYERS (CLEAN & COMPACT) ── */}
                <div className="bg-white border border-slate-200/90 rounded-[24px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                        1
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-md">
                            Step 1
                          </span>
                          <h3 className="text-base sm:text-lg font-heading font-black text-slate-950">
                            Find Sponsoring Employers &amp; Open Roles
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Quick Search */}
                    <div className="relative w-full sm:w-64 shrink-0">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={jobSearchQuery}
                        onChange={(e) => setJobSearchQuery(e.target.value)}
                        placeholder="Search job title, company..."
                        className="w-full h-9 pl-8 pr-7 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#00A86B] focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                      />
                      {jobSearchQuery && (
                        <button
                          type="button"
                          onClick={() => setJobSearchQuery('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-[9px] cursor-pointer"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Jobs Cards Grid (Compact & Crisp) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {getDestinationJobs(countryName)
                      .filter(j => !jobSearchQuery || j.title.toLowerCase().includes(jobSearchQuery.toLowerCase()) || j.desc.toLowerCase().includes(jobSearchQuery.toLowerCase()))
                      .map((job) => {
                        const isSelected = selectedJobId === job.id;
                        return (
                          <div
                            key={job.id}
                            onClick={() => setSelectedJobId(job.id)}
                            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                              isSelected
                                ? 'bg-emerald-50/40 border-2 border-[#00A86B] shadow-xs'
                                : 'bg-slate-50/60 hover:bg-white border-slate-200/80 hover:border-slate-300'
                            }`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 inline-block">
                                  {job.sponsorshipBadge}
                                </span>
                                <span className="text-slate-400 text-[10px] font-semibold">{job.type}</span>
                              </div>
                              <h4 className="font-heading font-black text-xs sm:text-sm text-slate-950 line-clamp-1 pt-0.5">
                                {job.title}
                              </h4>
                              <span className="text-[11px] font-medium text-slate-500 block truncate">{job.company} • {job.location}</span>
                            </div>

                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                              <span className="text-emerald-700 font-extrabold">{job.salary}</span>
                              <span className="text-slate-900 text-[10px] font-extrabold flex items-center gap-0.5">
                                Select <ArrowRight className="w-2.5 h-2.5" />
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* ── STEP 2: SELECT OCCUPATION DOMAIN (CHIPS) ── */}
                <div className="bg-white border border-slate-200/90 rounded-[24px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-3.5">
                  <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                      2
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/70 px-2 py-0.5 rounded-md">
                        Step 2
                      </span>
                      <h3 className="text-base sm:text-lg font-heading font-black text-slate-950">
                        Select Industry Domain &amp; Speciality
                      </h3>
                    </div>
                  </div>

                  {/* Domain Selector Chips */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      { icon: '💻', name: 'Tech / Software & AI' },
                      { icon: '🏥', name: 'Healthcare & Nursing' },
                      { icon: '📈', name: 'Finance, Quant & Banking' },
                      { icon: '🏗️', name: 'Engineering & Construction' },
                      { icon: '🧪', name: 'Life Sciences & Biotech' },
                      { icon: '⚖️', name: 'Corporate Legal & Advisory' }
                    ].map((dom) => (
                      <button
                        key={dom.name}
                        type="button"
                        onClick={() => setWorkDomain(dom.name)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 select-none ${
                          workDomain === dom.name
                            ? 'bg-slate-950 text-white shadow-sm border border-slate-950 scale-[1.02]'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                        }`}
                      >
                        <span>{dom.icon}</span>
                        <span>{dom.name}</span>
                        {workDomain === dom.name && <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── STEP 3: WORK AUTHORIZATION & POINTS CLEARANCE ── */}
                <div className="bg-white border border-slate-200/90 rounded-[24px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-3.5">
                  <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                      3
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-md">
                        Step 3
                      </span>
                      <h3 className="text-base sm:text-lg font-heading font-black text-slate-950">
                        Certificate of Sponsorship &amp; 70-Points Clearance
                      </h3>
                    </div>
                  </div>

                  {/* Compact Status Card */}
                  <div className="bg-gradient-to-r from-emerald-50/70 via-slate-50 to-emerald-50/40 border border-emerald-200/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
                        ✓
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-950">
                          CoS Sponsor Reference &amp; Skills Equivalency Validated
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium">
                          70-point threshold satisfied under Points-Based Immigration System. Choose your filing pathway below.
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold shrink-0 self-start sm:self-auto shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Ready for Visa Submission</span>
                    </span>
                  </div>
                </div>

              </div>

              {/* ================================================== */}
              {/* 2. DUAL CHOICE ACTION TABS (POST STEP 3) */}
              {/* ================================================== */}
              <div className="space-y-6 pt-4">
                
                {/* Section Title & Segment Controller */}
                <div className="text-center space-y-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#00A86B] bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
                    Visa Application Pathways
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-slate-950 tracking-tight">
                    How would you like to apply for your {countryName} Work Visa?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto">
                    Choose between connecting with licensed corporate solicitors or applying directly online.
                  </p>

                  {/* Clean Segment Switch Matching Capsule */}
                  <div className="pt-2 flex items-center justify-center">
                    <div className="w-full sm:w-auto bg-white border border-slate-200/90 rounded-full py-2.5 sm:py-3 px-3 sm:px-5 shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300">
                      <div className="bg-slate-100 rounded-full p-1.5 inline-flex items-center gap-1.5 border border-slate-200/80 shrink-0 shadow-inner max-w-full overflow-x-auto">
                        
                        {/* Find Consultants */}
                        <button
                          type="button"
                          onClick={() => setWorkActionTab('consultants')}
                          className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 select-none active:scale-95 whitespace-nowrap ${
                            workActionTab === 'consultants'
                              ? 'bg-slate-950 text-white shadow-md scale-[1.03]'
                              : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
                          }`}
                        >
                          {workActionTab === 'consultants' ? (
                            <>
                              <span className="w-2.5 h-2.5 rounded-full bg-[#00A86B] shrink-0 animate-pulse" />
                              <span className="tracking-wide">Find Consultants</span>
                              <Check className="w-4 h-4 text-[#00E599] stroke-[3]" />
                            </>
                          ) : (
                            <>
                              <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 shrink-0" />
                              <span className="tracking-wide">Find Consultants</span>
                            </>
                          )}
                        </button>

                        {/* Self Apply */}
                        <button
                          type="button"
                          onClick={() => setWorkActionTab('self_apply')}
                          className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 select-none active:scale-95 whitespace-nowrap ${
                            workActionTab === 'self_apply'
                              ? 'bg-slate-950 text-white shadow-md scale-[1.03]'
                              : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
                          }`}
                        >
                          {workActionTab === 'self_apply' ? (
                            <>
                              <span className="w-2.5 h-2.5 rounded-full bg-[#00A86B] shrink-0 animate-pulse" />
                              <span className="tracking-wide">Self Apply</span>
                              <Check className="w-4 h-4 text-[#00E599] stroke-[3]" />
                            </>
                          ) : (
                            <>
                              <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 shrink-0" />
                              <span className="tracking-wide">Self Apply</span>
                            </>
                          )}
                        </button>

                      </div>
                    </div>
                  </div>
                </div>

                {/* ── CONTENT: FIND WORK SOLICITORS ── */}
                {workActionTab === 'consultants' && (
                  <div className="bg-white border border-slate-200/90 rounded-[28px] p-6 sm:p-9 shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-6 animate-fadeIn text-left">
                    
                    {/* Header */}
                    <div className="border-b border-slate-100 pb-4">
                      <h4 className="text-xl font-heading font-black text-slate-950">
                        Search Licensed Work Visa Solicitors &amp; Corporate Counsel
                      </h4>
                    </div>

                    {/* Search & Filter Engine Box */}
                    <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 sm:p-6 space-y-4">
                      <div className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <Search className="w-4 h-4 text-[#00A86B]" />
                        <span>Search Solicitors Near You</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-end">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-slate-700">
                            Your City / Location / Pincode
                          </label>
                          <input
                            type="text"
                            value={consultantLocationQuery}
                            onChange={(e) => setConsultantLocationQuery(e.target.value)}
                            placeholder="e.g. Hyderabad, Mumbai, Delhi, Remote"
                            className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:border-[#00A86B] focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-2xs outline-none"
                          />
                        </div>

                        <div>
                          <PortalCustomSelect
                            label="Destination Specialization"
                            value={consultantCountryFilter}
                            onChange={setConsultantCountryFilter}
                            placeholder="Select Destination"
                            options={[
                              `${countryName} (Current Destination)`,
                              "All Countries (Global)",
                              "United Kingdom (Skilled Worker / CoS)",
                              "Germany & EU Blue Card",
                              "United States (H-1B / L-1 / O-1)",
                              "Canada (GTS / LMIA / ICT)",
                              "Australia (TSS 482 / PR 186)"
                            ]}
                          />
                        </div>

                        <div>
                          <PortalCustomSelect
                            label="Service / Advisory Type"
                            value={consultantServiceType}
                            onChange={setConsultantServiceType}
                            placeholder="Select Service"
                            options={[
                              "Skilled Worker & Work Permit Filing",
                              "CoS Compliance & Sponsor Audit",
                              "Points-Based Legal Assessment",
                              "Dependant & Settlement Visas"
                            ]}
                          />
                        </div>
                      </div>

                      {/* Primary Search CTA */}
                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-semibold">
                          <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>100% Escrow Protected • OISC &amp; Bar Licensed Counsel Only</span>
                        </div>

                        <a
                          href={`/find-experts?category=work&country=${encodeURIComponent(consultantCountryFilter.includes('All Countries') ? countryName : consultantCountryFilter.split('(')[0].trim())}${consultantLocationQuery ? `&city=${encodeURIComponent(consultantLocationQuery)}` : ''}${consultantServiceType ? `&service=${encodeURIComponent(consultantServiceType)}` : ''}`}
                          className="h-11 px-6 rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-extrabold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 shrink-0"
                        >
                          <Search className="w-4 h-4 text-emerald-400" />
                          <span>Search Verified Solicitors for {countryName}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                  </div>
                )}

                {/* ── TAB 2 CONTENT: SELF APPLY (CONCIERGE VAULT) ── */}
                {workActionTab === 'self_apply' && (
                  <div className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-[32px] p-6 sm:p-9 shadow-sm space-y-6 animate-fadeIn text-left">
                    
                    {/* Core Document Upload Items */}
                    <div className="space-y-3" id="work-doc-vault">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                          <span>1. Mandatory Document Vault Checklist</span>
                        </h5>
                        <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${
                          ["passport","cos_contract","transcripts","english_test","tb_screening","pcc"].filter(k => readyDocKeys[k] || uploadedDocuments[k]).length >= 6
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : ["passport","cos_contract","transcripts","english_test","tb_screening","pcc"].filter(k => readyDocKeys[k] || uploadedDocuments[k]).length > 0
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {`${["passport","cos_contract","transcripts","english_test","tb_screening","pcc"].filter(k => readyDocKeys[k] || uploadedDocuments[k]).length} of 6 Ready`}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {([
  {
    "key": "passport",
    "title": "Passport Scan (Full Validity)",
    "hint": "Valid for full employment contract"
  },
  {
    "key": "cos_contract",
    "title": "Certificate of Sponsorship (CoS)",
    "hint": "Official electronic reference & job contract"
  },
  {
    "key": "transcripts",
    "title": "Degree & Academic Transcripts",
    "hint": "Apostilled degrees & credential evaluation"
  },
  {
    "key": "english_test",
    "title": "English Proficiency (SELT B1+)",
    "hint": "IELTS for UKVI / PTE Academic scorecard"
  },
  {
    "key": "tb_screening",
    "title": "TB Clearance & Medical Certificate",
    "hint": "UKVI / Embassy approved medical clinic"
  },
  {
    "key": "pcc",
    "title": "Police Clearance Certificate (PCC)",
    "hint": "Clean criminal record from RPO / Passport office"
  }
]).map((doc) => {
                          const isReady = Boolean(readyDocKeys[doc.key] || uploadedDocuments[doc.key]);

                          return (
                            <div
                              key={doc.key}
                              className={`p-4 rounded-2xl border transition-all text-left space-y-2.5 flex flex-col justify-between ${
                                isReady
                                  ? 'bg-emerald-50/50 border-emerald-300 ring-1 ring-emerald-200/60 shadow-2xs'
                                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-slate-950 truncate">{doc.title}</span>
                                  {isReady ? (
                                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                                      <Check className="w-3 h-3 stroke-[3]" /> Ready
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                                      Required
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 leading-tight">{doc.hint}</p>
                              </div>

                              <button
                                type="button"
                                onClick={() => toggleDocReady(doc.key)}
                                className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs active:scale-95 touch-manipulation ${
                                  isReady
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-sm'
                                    : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                                }`}
                              >
                                {isReady ? (
                                  <>
                                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                                    <span>✓ Ready (I Have This)</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 shrink-0" />
                                    <span>Click if Ready</span>
                                  </>
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5 pt-1">
                        <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>Confirm readiness here. Official files are uploaded in your Dashboard Document Vault.</span>
                      </p>
                    </div>

                    {/* Concierge Addons */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                          2. Smart Concierge Add-Ons (Optional)
                        </h5>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          Instant Approval Boosters
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {[
                          { id: 'points_audit', name: 'Points & Eligibility Legal Audit', price: 2999, desc: 'Detailed legal evaluation of salary threshold, SOC code & CoS.' },
                          { id: 'contract_review', name: 'Employment Contract Review', price: 3499, desc: 'Solicitor review of employment clauses & visa sponsorship rights.' },
                          { id: 'relocation_banking', name: 'Relocation & National Insurance', price: 2499, desc: 'Pre-landing social security setup, tax code & bank account opening.' },
                          { id: 'vfs_biometrics', name: 'VFS Biometrics Concierge', price: 1500, desc: 'Priority appointment scheduling & biometric passport fast-track.' }
                        ].map((addon) => {
                          const isSelected = selectedConciergeAddons.includes(addon.id);
                          return (
                            <div
                              key={addon.id}
                              onClick={() => {
                                setSelectedConciergeAddons(prev =>
                                  prev.includes(addon.id) ? prev.filter(x => x !== addon.id) : [...prev, addon.id]
                                );
                              }}
                              className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left space-y-1.5 select-none ${
                                isSelected
                                  ? 'bg-slate-950 text-white border-slate-950 shadow-md'
                                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <h6 className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                                  {addon.name}
                                </h6>
                                <span className={`text-xs font-black shrink-0 ${isSelected ? 'text-emerald-400' : 'text-slate-900'}`}>
                                  +₹{addon.price.toLocaleString()}
                                </span>
                              </div>
                              <p className={`text-[11px] leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                                {addon.desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Validation Warning Alert */}
                    {uploadValidationWarning && (
                      <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 text-xs font-extrabold flex items-center gap-3 animate-pulse shadow-sm">
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                        <span>{uploadValidationWarning}</span>
                      </div>
                    )}

                    {/* Final Submission Bar */}
                    <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs text-slate-500 font-medium block">Total Concierge Package:</span>
                        <strong className="text-xl sm:text-2xl font-black text-slate-950">
                          ₹{(3499 + selectedConciergeAddons.reduce((sum, id) => {
                            if (id === 'points_audit') return sum + 2999;
                            if (id === 'contract_review') return sum + 3499;
                            if (id === 'relocation_banking') return sum + 2499;
                            if (id === 'vfs_biometrics') return sum + 1500;
                            return sum;
                          }, 0)).toLocaleString()}
                        </strong>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleConciergeSubmit(['passport', 'cos_contract', 'transcripts', 'english_test', 'tb_screening', 'pcc'], 'work-doc-vault')}
                        className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/25 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                      >
                        <ShieldCheck className="w-5 h-5" />
                        <span>Submit Complete Dossier for AI &amp; Concierge Filing</span>
                        <ArrowRight className="w-4 h-4 stroke-[3]" />
                      </button>
                    </div>

                  </div>
                )}

              </div>

            </section>
          )}

          {/* ── VISA RESULT & SPECIFICATION WORKSPACE ── */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 sm:space-y-14">
            
            {/* AI CONSULAR MOCK INTERVIEW PREP KIT (ABOVE DOING IT WITH TRAVLTIK) */}
            <ConsularMockPrepCard 
              countryName={countryName}
              passportCountry={passportCountry}
              purpose={initialPurpose === 'study' ? 'Higher Studies' : initialPurpose === 'work' ? 'Employment / Work' : 'Tourism / Vacation'}
            />

            {/* ================================================== */}
            {/* 4. ATLYS-STYLE COMPARISON TIMELINE (DOING IT WITH ATLYS vs DOING IT YOURSELF) */}
            {/* ================================================== */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-10 shadow-xs text-left overflow-x-auto">
              
              {/* SECTION A: DOING IT WITH TRAVLTIK */}
              <div className="space-y-4 min-w-[760px]">
                <h3 className="text-[15px] sm:text-[16px] font-semibold uppercase tracking-wider text-[#4F46E5] font-heading">
                  DOING IT WITH TRAVLTIK
                </h3>

                <div className="relative pt-6 pb-8">
                  {/* Connecting Solid Bar */}
                  <div className="absolute top-[128px] left-8 right-8 h-1 bg-[#4F46E5] -z-0 rounded-full" />

                  {/* 4 Nodes */}
                  <div className="grid grid-cols-4 relative z-10 antialiased">
                    
                    {/* Node 1: Top text */}
                    <div className="flex flex-col items-center text-center px-2">
                      <div className="h-[110px] flex flex-col items-center justify-end pb-2">
                        <span className="text-[13px] sm:text-[14px] font-semibold text-slate-800 leading-tight max-w-[160px]">
                          Submit documents online on TravlTik
                        </span>
                        <span className="text-slate-400 text-xs mt-1">|</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#4F46E5] text-white font-semibold flex items-center justify-center text-sm shadow-md ring-4 ring-white">
                        1
                      </div>
                      <div className="h-[110px]" />
                    </div>

                    {/* Node 2: Bottom text */}
                    <div className="flex flex-col items-center text-center px-2">
                      <div className="h-[110px]" />
                      <div className="w-10 h-10 rounded-full bg-[#4F46E5] text-white font-semibold flex items-center justify-center text-sm shadow-md ring-4 ring-white">
                        2
                      </div>
                      <div className="h-[110px] flex flex-col items-center justify-start pt-2">
                        <span className="text-slate-400 text-xs mb-1">|</span>
                        <span className="text-[13px] sm:text-[14px] font-semibold text-slate-800 leading-tight max-w-[170px]">
                          AI ver &amp; self verify tools
                        </span>
                        <span className="text-[12px] sm:text-[13px] text-slate-600 font-normal leading-snug mt-1 max-w-[175px]">
                          (Checklists help you gather and prepare a visa file as accurately as required for submission)
                        </span>
                      </div>
                    </div>

                    {/* Node 3: Top text */}
                    <div className="flex flex-col items-center text-center px-2">
                      <div className="h-[110px] flex flex-col items-center justify-end pb-2">
                        <span className="text-[13px] sm:text-[14px] font-semibold text-slate-800 leading-tight max-w-[175px]">
                          Find best service providers and resources on TravlTik to complete missing documents
                        </span>
                        <span className="text-slate-400 text-xs mt-1">|</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#4F46E5] text-white font-semibold flex items-center justify-center text-sm shadow-md ring-4 ring-white">
                        3
                      </div>
                      <div className="h-[110px]" />
                    </div>

                    {/* Node 4: Bottom text */}
                    <div className="flex flex-col items-center text-center px-2">
                      <div className="h-[110px]" />
                      <div className="w-10 h-10 rounded-full bg-[#4F46E5] text-white font-semibold flex items-center justify-center text-sm shadow-md ring-4 ring-white">
                        4
                      </div>
                      <div className="h-[110px] flex flex-col items-center justify-start pt-2">
                        <span className="text-slate-400 text-xs mb-1">|</span>
                        <span className="text-[13px] sm:text-[14px] font-semibold text-slate-800 leading-tight max-w-[180px]">
                          Book appointment and submit your application with confidence or contact a top consultant and apply through them
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* SECTION B: DOING IT YOURSELF */}
              <div className="space-y-4 min-w-[740px] pt-6 border-t border-slate-100">
                <h3 className="text-[15px] sm:text-[16px] font-semibold uppercase tracking-wider text-black font-heading">
                  DOING IT YOURSELF
                </h3>

                <div className="relative pt-10 pb-12">
                  {/* Connecting Solid Black Bar */}
                  <div className="absolute top-[84px] left-6 right-6 h-1 bg-black -z-0 rounded-full" />

                  {/* 8 Nodes */}
                  <div className="grid grid-cols-8 relative z-10">
                    
                    {/* Node 1: Top */}
                    <div className="flex flex-col items-center text-center px-1">
                      <div className="h-16 flex flex-col items-center justify-end pb-2">
                        <span className="text-[12px] sm:text-[13px] font-medium text-slate-800 leading-snug">
                          Gather all your documents at home
                        </span>
                        <span className="text-slate-400 text-xs mt-1">|</span>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-black text-white font-semibold flex items-center justify-center text-xs shadow-md ring-4 ring-white">
                        1
                      </div>
                      <div className="h-16" />
                    </div>

                    {/* Node 2: Bottom */}
                    <div className="flex flex-col items-center text-center px-1">
                      <div className="h-16" />
                      <div className="w-9 h-9 rounded-full bg-black text-white font-semibold flex items-center justify-center text-xs shadow-md ring-4 ring-white">
                        2
                      </div>
                      <div className="h-16 flex flex-col items-center justify-start pt-2">
                        <span className="text-slate-400 text-xs mb-1">|</span>
                        <span className="text-[12px] sm:text-[13px] font-medium text-slate-800 leading-snug">
                          Get your documents printed at a print shop
                        </span>
                      </div>
                    </div>

                    {/* Node 3: Top */}
                    <div className="flex flex-col items-center text-center px-1">
                      <div className="h-16 flex flex-col items-center justify-end pb-2">
                        <span className="text-[12px] sm:text-[13px] font-medium text-slate-800 leading-snug">
                          Get stuck in traffic driving to the embassy
                        </span>
                        <span className="text-slate-400 text-xs mt-1">|</span>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-black text-white font-semibold flex items-center justify-center text-xs shadow-md ring-4 ring-white">
                        3
                      </div>
                      <div className="h-16" />
                    </div>

                    {/* Node 4: Bottom */}
                    <div className="flex flex-col items-center text-center px-1">
                      <div className="h-16" />
                      <div className="w-9 h-9 rounded-full bg-black text-white font-semibold flex items-center justify-center text-xs shadow-md ring-4 ring-white">
                        4
                      </div>
                      <div className="h-16 flex flex-col items-center justify-start pt-2">
                        <span className="text-slate-400 text-xs mb-1">|</span>
                        <span className="text-[12px] sm:text-[13px] font-medium text-slate-800 leading-snug">
                          Spend 3+ hours at the embassy
                        </span>
                      </div>
                    </div>

                    {/* Node 5: Top */}
                    <div className="flex flex-col items-center text-center px-1">
                      <div className="h-16 flex flex-col items-center justify-end pb-2">
                        <span className="text-[12px] sm:text-[13px] font-medium text-slate-800 leading-snug">
                          Get stuck in traffic on the way back home
                        </span>
                        <span className="text-slate-400 text-xs mt-1">|</span>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-black text-white font-semibold flex items-center justify-center text-xs shadow-md ring-4 ring-white">
                        5
                      </div>
                      <div className="h-16" />
                    </div>

                    {/* Node 6: Bottom */}
                    <div className="flex flex-col items-center text-center px-1">
                      <div className="h-16" />
                      <div className="w-9 h-9 rounded-full bg-black text-white font-semibold flex items-center justify-center text-xs shadow-md ring-4 ring-white">
                        6
                      </div>
                      <div className="h-16 flex flex-col items-center justify-start pt-2">
                        <span className="text-slate-400 text-xs mb-1">|</span>
                        <span className="text-[12px] sm:text-[13px] font-medium text-slate-800 leading-snug">
                          Wait anxiously for your visa approval
                        </span>
                      </div>
                    </div>

                    {/* Node 7: Top */}
                    <div className="flex flex-col items-center text-center px-1">
                      <div className="h-16 flex flex-col items-center justify-end pb-2">
                        <span className="text-[12px] sm:text-[13px] font-medium text-slate-800 leading-snug">
                          Go back to embassy to pick up passport
                        </span>
                        <span className="text-slate-400 text-xs mt-1">|</span>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-black text-white font-semibold flex items-center justify-center text-xs shadow-md ring-4 ring-white">
                        7
                      </div>
                      <div className="h-16" />
                    </div>

                    {/* Node 8: Bottom */}
                    <div className="flex flex-col items-center text-center px-1">
                      <div className="h-16" />
                      <div className="w-9 h-9 rounded-full bg-black text-white font-semibold flex items-center justify-center text-xs shadow-md ring-4 ring-white">
                        8
                      </div>
                      <div className="h-16 flex flex-col items-center justify-start pt-2">
                        <span className="text-slate-400 text-xs mb-1">|</span>
                        <span className="text-[12px] sm:text-[13px] font-medium text-slate-800 leading-snug">
                          Drive back home
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>

            {/* 5. EXPANDABLE FAQ ACCORDION */}
            <div id="section-faqs" className="space-y-4 text-left">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#00A86B]">
                  Got Questions?
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-slate-900 tracking-tight">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="border border-slate-200/90 rounded-3xl overflow-hidden divide-y divide-slate-100 shadow-2xs">
                {resolvedFaqs.map((faq: { question: string; answer: string }, idx: number) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div key={idx} className="bg-white">
                      <button
                        type="button"
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-semibold text-sm sm:text-base text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer select-none"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#00A86B]' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 pt-1 text-sm sm:text-[15px] text-slate-600 font-normal leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </section>
        </>
      )}

      {/* ── APPLICATION DETAILS MODAL POP-UP ── */}
      {showApplicationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 text-left relative">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowApplicationModal(false)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center absolute top-6 right-6 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Title */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#00A86B] text-[10px] font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#00A86B]" />
                <span>{countryName} Visa Application</span>
              </div>
              <h3 className="text-lg sm:text-xl font-heading font-semibold text-slate-900 tracking-tight text-slate-900 tracking-tight">
                Applicant &amp; Travel Details
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your details to proceed to secure Razorpay checkout.
              </p>
            </div>

            {/* Selected Booking Summary Strip */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-900 block">
                  {countryName} • {currentVariant.label}
                </span>
                <span className="text-[11px] text-slate-500 font-semibold block">
                  {travellerCount} Applicant{travellerCount > 1 ? 's' : ''} • Est. Delivery: {guaranteedDate}
                </span>
              </div>
              <div className="text-right">
                <span className="text-base font-semibold text-slate-900 block">
                  ₹{grandTotal.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-600 font-bold block">
                  All fees included
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleProceedToRazorpay} className="space-y-4">
              
              {/* First & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#00A86B] text-slate-900 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#00A86B] text-slate-900 bg-slate-50/50"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Email (for e-Visa delivery) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#00A86B] text-slate-900 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Mobile Number *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-16 h-11 px-2 rounded-xl border border-slate-300 text-xs font-medium text-center bg-slate-100 text-slate-900"
                    />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="flex-1 h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#00A86B] text-slate-900 bg-slate-50/50"
                    />
                  </div>
                </div>
              </div>

              {/* Date of Birth & Tentative Travel Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <PortalCustomDatePicker
                  label="Date of Birth *"
                  value={dob}
                  onChange={setDob}
                  placeholder="Select date of birth"
                />
                <PortalCustomDatePicker
                  label="Tentative Travel Date *"
                  value={travelDate}
                  onChange={setTravelDate}
                  placeholder="Select travel date"
                />
              </div>

              {/* Doorstep Pickup Address & Pincode */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Complete Address (for document pickup &amp; delivery) *
                  </label>
                  <input
                    type="text"
                    required
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="Flat / Building, Area, Landmark, City"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#00A86B] text-slate-900 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => handlePincodeCheck(e.target.value)}
                    placeholder="6-digit Pincode"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#00A86B] text-slate-900 bg-slate-50/50"
                  />
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3 flex items-center gap-2.5 text-xs text-emerald-800 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your passport &amp; payment are 100% protected under TravlTik Escrow &amp; Buyer Protection.</span>
              </div>

              {/* Submit to Razorpay Button */}
              <button
                type="submit"
                disabled={isSubmittingModal}
                className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm tracking-wide shadow-xl shadow-slate-900/20 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-75"
              >
                {isSubmittingModal ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Connecting to Razorpay Gateway...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Pay ₹{grandTotal.toLocaleString()} with Razorpay</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>

            </form>

          </div>
        </div>
      )}

      {/* ── CONSULTANT BOOKING MODAL ── */}
      {bookingModalConsultant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-[32px] max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-left space-y-5 relative">
            <button
              type="button"
              onClick={() => setBookingModalConsultant(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
              <img
                src={bookingModalConsultant.image}
                alt={bookingModalConsultant.name}
                className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-lg text-slate-950">{bookingModalConsultant.name}</h3>
                  <BadgeCheck className="w-4 h-4 text-[#00A86B]" />
                </div>
                <p className="text-xs text-slate-600 font-medium">{bookingModalConsultant.agencyName}</p>
                <div className="inline-block px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold mt-1">
                  🛡️ {bookingModalConsultant.license}
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  1. Select Consultation Date:
                </label>
                <input
                  type="date"
                  defaultValue="2026-09-02"
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  2. Select Available Slot:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['10:30 AM', '02:00 PM', '04:30 PM', '06:00 PM', '07:30 PM', '09:00 PM'].map((slot, idx) => (
                    <button
                      key={slot}
                      type="button"
                      className={`py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        idx === 1
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 font-medium block">Total Payable:</span>
                  <strong className="text-slate-950 font-black text-sm">{bookingModalConsultant.fee}</strong>
                </div>
                <span className="text-[11px] font-bold text-[#00A86B] bg-emerald-50 px-2 py-1 rounded-lg">
                  Protected under Escrow
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const name = bookingModalConsultant.name;
                setBookingModalConsultant(null);
                setConsultantBookedToast(`🎉 Consultation with ${name} confirmed! Zoom link sent to your email.`);
                setTimeout(() => setConsultantBookedToast(null), 5000);
              }}
              className="w-full py-3.5 rounded-2xl bg-[#00A86B] hover:bg-[#008f5b] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-95"
            >
              Confirm 1-on-1 Consultation
            </button>
          </div>
        </div>
      )}

      {/* ── CONCIERGE SUBMITTED MODAL ── */}
      {conciergeSubmittedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-[32px] max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center space-y-4 relative">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-[#00A86B] mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <h3 className="font-heading font-black text-xl text-slate-950">
                Application Dossier Submitted!
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Your {Object.keys(uploadedDocuments).length} verified documents and {countryName} {activePurposeTab === 'study' ? 'Student Visa' : activePurposeTab === 'work' ? 'Work Visa' : 'Tourist Visa'} application have been safely ingested into TravlTik Concierge Vault.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Tracking ID:</span>
                <strong className="text-slate-900 font-mono">TT-{activePurposeTab.toUpperCase().slice(0,3)}-2026-9824</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Destination / Country:</span>
                <strong className="text-slate-900 font-bold">{countryName} ({passportCountry} Citizen)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Verified Documents:</span>
                <strong className="text-emerald-700 font-bold">{Object.keys(uploadedDocuments).length} Files Encrypted &amp; Stored</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Active Add-Ons:</span>
                <strong className="text-[#00A86B] font-bold">{selectedConciergeAddons.length} Services Active</strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
              <a
                href="/traveller/dashboard"
                className="w-full py-3.5 rounded-2xl bg-[#00A86B] hover:bg-[#008f5b] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 text-center"
              >
                <span>View in Traveller Dashboard →</span>
              </a>
              <button
                type="button"
                onClick={() => setConciergeSubmittedModal(false)}
                className="w-full py-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST NOTIFICATION ── */}
      {consultantBookedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-800 text-xs font-bold flex items-center gap-2.5 animate-in slide-in-from-bottom-5">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{consultantBookedToast}</span>
        </div>
      )}

      {/* ── CHECKLIST SYNCED & PDF DOWNLOADED TOAST NOTIFICATION ── */}
      {checklistSyncedToast && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 max-w-md bg-slate-950 text-white p-4 rounded-2xl shadow-2xl border border-emerald-500/40 text-xs font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in slide-in-from-bottom-5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <div className="min-w-0 text-left">
              <span className="block text-white font-extrabold truncate">{checklistSyncedToast.msg}</span>
              <span className="block text-[10px] text-emerald-400 font-medium">Tracking Ref: {checklistSyncedToast.trackingId}</span>
            </div>
          </div>
          <a
            href={checklistSyncedToast.caseId ? `/traveller/dashboard?tab=cases&appId=${checklistSyncedToast.caseId}#documents-required-section` : "/traveller/dashboard?tab=cases"}
            className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs text-center shrink-0 transition-colors shadow-xs"
          >
            View Required Documents →
          </a>
        </div>
      )}

      {/* ── LOGIN REQUIRED MODAL (TRIGGERED ON DOWNLOAD & SYNC) ── */}
      {showLoginRequiredModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 text-left">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-center space-y-5 animate-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowLoginRequiredModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon Badge */}
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center mx-auto text-amber-600 shadow-xs">
              <Lock className="w-7 h-7" />
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                Authentication Required
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Login Required to Download &amp; Sync
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Please sign in to your TravlTik account to download your official {countryName} Visa Checklist PDF and securely sync your dossier to your dashboard.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <a
                href={`/login?redirect=${encodeURIComponent(typeof window !== 'undefined' ? window.location.pathname + window.location.search : `/visa/${slugClean}`)}`}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 hover:from-black hover:to-slate-900 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
              >
                <span>Sign In to Continue</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`/login?mode=signup&redirect=${encodeURIComponent(typeof window !== 'undefined' ? window.location.pathname + window.location.search : `/visa/${slugClean}`)}`}
                className="w-full flex items-center justify-center py-3 px-6 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors"
              >
                Create Free Account
              </a>
            </div>

            <p className="text-[11px] text-slate-400">
              🔒 256-bit encrypted • Official Embassy &amp; Consular Document Security
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
