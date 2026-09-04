import React, { useState } from 'react';
import { 
  ArrowLeft, Copy, CheckCircle2, CheckCircle, Clock, Calendar, 
  CreditCard, ShieldCheck, AlertCircle, ExternalLink, MessageSquare, 
  Phone, ChevronDown, ChevronUp, Check, FileText, Plus, Info, 
  Sparkles, CheckSquare, XCircle, Shield
} from 'lucide-react';

interface VisaApplicationDetailsProps {
  application: any;
  applicantName: string;
  onBack: () => void;
  onOpenChat?: () => void;
}

export function VisaApplicationDetailsView({
  application,
  applicantName,
  onBack,
  onOpenChat
}: VisaApplicationDetailsProps) {
  const [copiedId, setCopiedId] = useState(false);
  const [confirmedDeclaration, setConfirmedDeclaration] = useState(true);
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: true, // Step 5 (Submit Application) expanded by default as in screenshot
    6: false
  });
  const [allExpanded, setAllExpanded] = useState(false);

  // Derive display values from application or high-fidelity defaults from screenshot
  const trackingId = application?.trackingId || 'VISA-2024-000789';
  const destination = application?.destination || 'France';
  const destinationFlag = application?.destinationFlag || (destination.toLowerCase().includes('emirates') || destination.toLowerCase().includes('uae') ? '🇦🇪' : destination.toLowerCase().includes('france') ? '🇫🇷' : '🌍');
  const passport = application?.passport || 'India';
  const visaType = application?.visaType || 'Short Stay (Tourism)';
  const appliedDate = application?.submittedAt || '10 May 2024';
  const lastUpdated = application?.updatedAt || '18 May 2024';
  const travelDate = application?.travelDate || '15 Jun 2024';
  const returnDate = application?.returnDate || '30 Jun 2024 (15 Days)';
  const entries = application?.entries || 'Single Entry';
  const appointmentDate = application?.appointmentDate || '18 May 2024, 10:30 AM';
  const feePaid = application?.feePaid || '€80 (INR 7,200)';
  const processingTime = application?.processingTime || '15 - 20 Working Days';

  const handleCopyId = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(trackingId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const toggleStep = (stepNumber: number) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  const toggleAllSteps = () => {
    const nextState = !allExpanded;
    setAllExpanded(nextState);
    setExpandedSteps({
      1: nextState,
      2: nextState,
      3: nextState,
      4: nextState,
      5: nextState,
      6: nextState
    });
  };

  const checklistDocuments = [
    { name: 'Passport', req: 'Valid for at least 3 months beyond return date', available: true, ready: true },
    { name: 'Visa Application Form', req: 'Complete and signed application form', available: true, ready: true },
    { name: 'Photograph', req: 'Recent photo, 35mm x 45mm, white background', available: true, ready: false },
    { name: 'Travel Itinerary', req: 'Confirmed flight tickets (round trip)', available: true, ready: true },
    { name: 'Hotel Booking', req: 'Confirmed hotel reservations', available: true, ready: true },
    { name: 'Travel Insurance', req: 'Minimum coverage of €30,000', available: true, ready: true },
    { name: 'Bank Statements', req: 'Last 3 months bank statements', available: true, ready: false },
    { name: 'Cover Letter', req: 'Purpose of visit and travel details', available: true, ready: true },
    { name: 'Employment Proof', req: 'Salary slips / Leave approval / NOC', available: true, ready: false },
    { name: 'ID Proof', req: 'Aadhaar Card / PAN Card copy', available: true, ready: true },
  ];

  return (
    <div className="space-y-6 animate-fade-up font-sans text-left">
      {/* ── TOP HEADER WITH BACK BUTTON ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Visa Application Details</h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Track and manage your visa application progress</p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-50 text-xs font-bold shadow-2xs transition-all self-start sm:self-auto cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Applications</span>
        </button>
      </div>

      {/* ── 1. APPLICATION METADATA HERO CARD ── */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {/* Col 1: Application ID */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Application ID</span>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-black text-emerald-600 font-mono tracking-tight">
                {trackingId}
              </span>
              <button
                type="button"
                onClick={handleCopyId}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-all cursor-pointer"
                title="Copy Application ID"
              >
                <Copy className="w-3 h-3 text-slate-500" />
                <span>{copiedId ? 'Copied ✓' : 'Copy'}</span>
              </button>
            </div>
            <span className="text-[11px] text-slate-400 font-medium block pt-1">
              Applied on: {appliedDate} • Last Updated: {lastUpdated}
            </span>
          </div>

          {/* Col 2: Name & Visa Type */}
          <div className="space-y-3">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Name</span>
              <span className="text-sm font-black text-slate-900 block mt-0.5">{applicantName}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Visa Type</span>
              <span className="text-xs font-bold text-slate-800 block mt-0.5">{visaType}</span>
            </div>
          </div>

          {/* Col 3: From -> To & Entries */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-3">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">From</span>
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                    <span>🇮🇳</span> {passport}
                  </span>
                </div>
                <span className="text-slate-300 font-black pt-3">➔</span>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">To</span>
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                    <span>{destinationFlag}</span> {destination}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Entries</span>
              <span className="text-xs font-bold text-slate-800 block mt-0.5">{entries}</span>
            </div>
          </div>

          {/* Col 4: Travel & Return Date */}
          <div className="space-y-3">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Travel Date</span>
              <span className="text-xs font-black text-slate-900 block mt-0.5">{travelDate}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Return Date</span>
              <span className="text-xs font-black text-slate-900 block mt-0.5">{returnDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. HORIZONTAL PIPELINE PROGRESS STEPPER ── */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs overflow-x-auto">
        <div className="min-w-[680px]">
          {/* Nodes and Connector Line */}
          <div className="relative flex items-center justify-between px-6">
            {/* Background connecting bar */}
            <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1 bg-slate-100 -z-0" />
            
            {/* Active completed progress bar (Steps 1 to 5) */}
            <div className="absolute left-10 w-[78%] top-1/2 -translate-y-1/2 h-1 bg-emerald-500 -z-0" />

            {/* Step 1: Check Requirements */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-xs shadow-sm ring-4 ring-white">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-xs font-bold text-slate-800 mt-2">1. Check Requirements</span>
            </div>

            {/* Step 2: Prepare Documents */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-xs shadow-sm ring-4 ring-white">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-xs font-bold text-slate-800 mt-2">2. Prepare Documents</span>
            </div>

            {/* Step 3: Fill Application */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-xs shadow-sm ring-4 ring-white">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-xs font-bold text-slate-800 mt-2">3. Fill Application</span>
            </div>

            {/* Step 4: Pay Fees */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-xs shadow-sm ring-4 ring-white">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-xs font-bold text-slate-800 mt-2">4. Pay Fees</span>
            </div>

            {/* Step 5: Submit Application (Current Active Step) */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-sm ring-4 ring-white">
                5
              </div>
              <span className="text-xs font-black text-indigo-700 mt-2">5. Submit Application</span>
            </div>

            {/* Step 6: Track & Receive */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-black text-xs shadow-sm ring-4 ring-white">
                6
              </div>
              <span className="text-xs font-medium text-slate-400 mt-2">6. Track & Receive</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. MAIN CONTENT: 2-COLUMN GRID (LEFT ACCORDIONS + TABLE, RIGHT STATS CARDS) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ── LEFT COLUMN (8 COLS) ── */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* SECTION A: STEPS TO FOLLOW */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-950">Steps to Follow</h2>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Complete each step to ensure a smooth visa application process</p>
              </div>
              <button
                type="button"
                onClick={toggleAllSteps}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
              >
                {allExpanded ? 'Collapse All' : 'Expand All'}
              </button>
            </div>

            <div className="space-y-3 pt-1">
              {/* Step 1 */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
                <div 
                  onClick={() => toggleStep(1)}
                  className="flex items-center justify-between p-4 bg-white hover:bg-slate-50/70 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-black text-slate-900">1. Check Visa Requirements</h3>
                      <p className="text-[11px] text-slate-500 font-medium">Reviewed and understood the visa requirements for {destination}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-200">
                      Completed
                    </span>
                    {expandedSteps[1] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>
                {expandedSteps[1] && (
                  <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                    <p>✓ All statutory prerequisites, passport validity (6+ months), and entry conditions for {destination} have been verified.</p>
                  </div>
                )}
              </div>

              {/* Step 2 */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
                <div 
                  onClick={() => toggleStep(2)}
                  className="flex items-center justify-between p-4 bg-white hover:bg-slate-50/70 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-black text-slate-900">2. Prepare Required Documents</h3>
                      <p className="text-[11px] text-slate-500 font-medium">Gather and prepare all required documents</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-200">
                      Completed
                    </span>
                    {expandedSteps[2] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>
                {expandedSteps[2] && (
                  <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                    <p>✓ Passport copy, photograph specs (35x45mm), flight reservations, and proof of funds assembled in document vault.</p>
                  </div>
                )}
              </div>

              {/* Step 3 */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
                <div 
                  onClick={() => toggleStep(3)}
                  className="flex items-center justify-between p-4 bg-white hover:bg-slate-50/70 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-black text-slate-900">3. Fill Visa Application Form</h3>
                      <p className="text-[11px] text-slate-500 font-medium">Fill and review the visa application form accurately</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-200">
                      Completed
                    </span>
                    {expandedSteps[3] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>
                {expandedSteps[3] && (
                  <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                    <p>✓ Harmonised visa application form completed online with zero typographical errors and validated against passport biodata.</p>
                  </div>
                )}
              </div>

              {/* Step 4 */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
                <div 
                  onClick={() => toggleStep(4)}
                  className="flex items-center justify-between p-4 bg-white hover:bg-slate-50/70 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-black text-slate-900">4. Pay Visa Fees</h3>
                      <p className="text-[11px] text-slate-500 font-medium">Pay the applicable visa processing fees</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-200">
                      Completed
                    </span>
                    {expandedSteps[4] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>
                {expandedSteps[4] && (
                  <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                    <p>✓ Consular visa fee and VAC service charges paid successfully ({feePaid}). Official receipt generated.</p>
                  </div>
                )}
              </div>

              {/* Step 5 (Current In Progress Step - Featured as in Image 1) */}
              <div className="border-2 border-indigo-500/80 rounded-2xl overflow-hidden shadow-xs">
                <div 
                  onClick={() => toggleStep(5)}
                  className="flex items-center justify-between p-4 bg-indigo-50/40 hover:bg-indigo-50/70 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center shrink-0">
                      <CheckSquare className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-black text-indigo-950">5. Submit Application</h3>
                      <p className="text-[11px] text-slate-600 font-medium">Submit your application at the Visa Application Center</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-indigo-200">
                      In Progress
                    </span>
                    {expandedSteps[5] ? <ChevronUp className="w-4 h-4 text-indigo-600" /> : <ChevronDown className="w-4 h-4 text-indigo-600" />}
                  </div>
                </div>

                {expandedSteps[5] && (
                  <div className="p-5 bg-indigo-50/20 border-t border-indigo-100 space-y-3.5">
                    {/* Subtask 1 */}
                    <div className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <div className="text-xs">
                        <strong className="text-slate-900 font-bold block">Book Appointment (VAC)</strong>
                        <span className="text-slate-500 font-medium block mt-0.5">Appointment booked for {appointmentDate}</span>
                      </div>
                    </div>

                    {/* Subtask 2 */}
                    <div className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300 bg-white shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <strong className="text-slate-700 font-bold block">Attend Appointment</strong>
                        <span className="text-slate-500 font-medium block mt-0.5">Visit the Visa Application Center with all documents</span>
                      </div>
                    </div>

                    {/* Subtask 3 */}
                    <div className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300 bg-white shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <strong className="text-slate-700 font-bold block">Biometric Submission</strong>
                        <span className="text-slate-500 font-medium block mt-0.5">Biometric data and photo will be captured</span>
                      </div>
                    </div>

                    {/* Subtask 4 */}
                    <div className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300 bg-white shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <strong className="text-slate-700 font-bold block">Application Submitted</strong>
                        <span className="text-slate-500 font-medium block mt-0.5">Application will be submitted for processing</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 6 */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
                <div 
                  onClick={() => toggleStep(6)}
                  className="flex items-center justify-between p-4 bg-white hover:bg-slate-50/70 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-md border-2 border-slate-300 bg-white flex items-center justify-center shrink-0" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-black text-slate-700">6. Track & Receive Passport</h3>
                      <p className="text-[11px] text-slate-400 font-medium">Track your application and collect your passport</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-black px-2 py-0.5 rounded-full border border-slate-200">
                      Pending
                    </span>
                    {expandedSteps[6] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>
                {expandedSteps[6] && (
                  <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                    <p>Live courier tracking and SMS status updates will activate once your passport is dispatched from the consulate.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SECTION B: DOCUMENTS REQUIRED CHECKLIST */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3.5">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-950">Documents Required Checklist</h2>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Ensure all documents are available and meet the requirements</p>
              </div>
              <a
                href="#guidelines"
                onClick={(e) => { e.preventDefault(); alert("Document Guidelines: Ensure all PDF scans are under 5MB, clear and uncropped, with color photocopies."); }}
                className="text-xs font-bold text-teal-600 hover:text-teal-800 hover:underline cursor-pointer"
              >
                View Document Guidelines
              </a>
            </div>

            {/* Checklist Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    <th className="py-2.5 px-3">Document</th>
                    <th className="py-2.5 px-3">Requirement</th>
                    <th className="py-2.5 px-3 text-center">Available</th>
                    <th className="py-2.5 px-3 text-center">Ready to Use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {checklistDocuments.map((doc, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                          <span className="font-bold text-slate-900">{doc.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-600 font-medium">
                        {doc.req}
                      </td>
                      <td className="py-3 px-3 text-center">
                        {doc.available ? (
                          <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                            <XCircle className="w-3 h-3" />
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center">
                        {doc.ready ? (
                          <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Checklist Legend */}
            <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-500">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>Available &amp; Ready</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                </div>
                <span>Available but not ready</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
                  <XCircle className="w-2.5 h-2.5" />
                </div>
                <span>Not Available</span>
              </div>
            </div>

            {/* Declaration & Terms Box */}
            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/80 space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmedDeclaration}
                  onChange={(e) => setConfirmedDeclaration(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded mt-0.5 focus:ring-emerald-500"
                />
                <span className="text-xs font-bold text-slate-800 leading-relaxed">
                  I confirm that all the above documents are true, valid and ready to be used as per the terms and conditions of the embassy/consulate.
                </span>
              </label>
              <div className="pl-6.5">
                <a 
                  href="#terms" 
                  onClick={(e) => { e.preventDefault(); alert("Consular Terms: All documents must be genuine. Submitting forged documents leads to entry bans."); }}
                  className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 hover:underline inline-flex items-center gap-1"
                >
                  <span>View Terms &amp; Conditions</span>
                  <Info className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN (4 COLS: STATS & REMINDER CARDS) ── */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* 1. VISA READINESS SCORE CARD */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs text-center space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Visa Readiness Score</h3>

            {/* Circular Gauge / Donut */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                {/* Background Ring */}
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Progress Ring (72%) */}
                <path
                  className="text-emerald-500 transition-all duration-1000 ease-out"
                  strokeDasharray="72, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-black text-slate-950 tracking-tight">72%</span>
                <span className="text-[11px] font-extrabold text-emerald-600 mt-0.5">Good Progress</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              You're on the right track! Complete the remaining steps and documents to improve your score.
            </p>

            {/* Score Breakdown Bars */}
            <div className="pt-3 border-t border-slate-100 space-y-3 text-left">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Score Breakdown</span>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Requirements</span>
                  <span className="text-slate-950">100%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Documents</span>
                  <span className="text-slate-950">65%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '65%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Application</span>
                  <span className="text-slate-950">75%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Fee Payment</span>
                  <span className="text-slate-950">100%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Submission</span>
                  <span className="text-slate-950">40%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '40%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Tracking</span>
                  <span className="text-slate-400">0%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-200 rounded-full" style={{ width: '0%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* 2. IMPORTANT REMINDERS CARD */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Important Reminders</h3>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block">Appointment Date</span>
                  <strong className="text-xs font-black text-slate-900 block mt-0.5">{appointmentDate}</strong>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block">Visa Fee Paid</span>
                  <strong className="text-xs font-black text-slate-900 block mt-0.5">{feePaid}</strong>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block">Processing Time</span>
                  <strong className="text-xs font-black text-slate-900 block mt-0.5">{processingTime}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* 3. NEED HELP? CARD */}
          <div className="bg-amber-50/40 rounded-3xl border border-amber-200/70 p-5 sm:p-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-base">👋</span>
              <h3 className="text-sm font-black text-slate-900">Need Help?</h3>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Talk to our visa experts for assistance at any step.
            </p>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  if (onOpenChat) onOpenChat();
                  else alert("Connecting to 24x7 Visa Expert Concierge...");
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-white border border-amber-300/80 hover:bg-amber-50/80 text-xs font-bold text-slate-800 transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                <span>Chat with Expert</span>
              </button>

              <button
                type="button"
                onClick={() => alert("Helpline: +91 800 555 8728 (Mon - Sat, 9 AM - 7 PM)")}
                className="w-full py-2.5 px-4 rounded-xl bg-white border border-amber-300/80 hover:bg-amber-50/80 text-xs font-bold text-slate-800 transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>Call Us</span>
              </button>
            </div>
          </div>

          {/* 4. APPLICATION SUMMARY CARD */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3.5">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Application Summary</h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Application ID</span>
                <span className="font-bold font-mono text-slate-900">{trackingId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Visa Type</span>
                <span className="font-bold text-slate-900">{visaType}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">From - To</span>
                <span className="font-bold text-slate-900">{passport} ➔ {destination}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Travel Date</span>
                <span className="font-bold text-slate-900">{travelDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Return Date</span>
                <span className="font-bold text-slate-900">{returnDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Application Date</span>
                <span className="font-bold text-slate-900">{appliedDate}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium">Status</span>
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-indigo-200">
                  In Progress
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
