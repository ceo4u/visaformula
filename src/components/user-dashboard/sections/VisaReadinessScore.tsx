import React from "react";
import {
  CheckCircle, FileText, Shield, Briefcase, User, Users, Upload,
  CheckCircle2, ShieldCheck, AlertCircle, GraduationCap, Plane, Check
} from "lucide-react";
import { normalizeCountryName } from "../utils/countryHelpers";
import { cleanShortDocRequirement } from "../utils/vaultHelpers";
import { dashboardDestinationOptions, dashboardPassportOptions } from "../utils/constants";
import { ReadinessSelect } from "../components/ReadinessSelect";
import type { useReadinessAudit } from "../hooks/useReadinessAudit";
import type { VaultDocChecklistEntry } from "../types";

export interface VisaReadinessScoreProps {
  selectedDestination: string;
  selectedPassport: string;
  readiness: ReturnType<typeof useReadinessAudit>;
  vaultChecklistState?: Record<string, VaultDocChecklistEntry>;
  toggleReadinessDoc?: (docKey: string, docTitle: string) => void;
  setActiveTab?: (tab: string) => void;
  handleVaultDocScan?: (file: File, docKey: string, docTitle: string) => Promise<any> | void;
}

export function VisaReadinessScore({
  selectedDestination,
  selectedPassport,
  readiness,
  vaultChecklistState = {},
  toggleReadinessDoc,
  setActiveTab = () => {},
  handleVaultDocScan = () => {}
}: VisaReadinessScoreProps) {
  const {
    aiVisaData,
    readinessPurpose,
    setReadinessPurpose,
    readinessPassportValidity,
    setReadinessPassportValidity,
    readinessMetrics,
    comprehensiveAuditMetrics,
    readinessDocChecklist,
    saveAuditField,
    // Student
    studyQual, setStudyQual,
    studyTarget, setStudyTarget,
    studyIntake, setStudyIntake,
    studyBudget, setStudyBudget,
    studentAdmissionStatus, setStudentAdmissionStatus,
    studentLanguageScore, setStudentLanguageScore,
    // Tourist
    visitPlanStatus, setVisitPlanStatus,
    visitTiming, setVisitTiming,
    visitReturnDate, setVisitReturnDate,
    tripDurationDays, setTripDurationDays,
    visitStay, setVisitStay,
    touristHomeTies, setTouristHomeTies,
    touristBankStability, setTouristBankStability,
    // Work
    workExp, setWorkExp,
    workOffer, setWorkOffer,
    workDomain, setWorkDomain,
    workAssess, setWorkAssess,
    // Audit
    auditPassportExpiry, setAuditPassportExpiry,
    auditPassportBlankPages, setAuditPassportBlankPages,
    auditFinancialBalance, setAuditFinancialBalance,
    auditBankStatementType, setAuditBankStatementType,
    auditInsuranceFrom, setAuditInsuranceFrom,
    auditInsuranceTill, setAuditInsuranceTill,
    auditInsuranceCoverage, setAuditInsuranceCoverage,
    auditEmploymentType, setAuditEmploymentType,
    auditSalariedPayslips, setAuditSalariedPayslips,
    auditSalariedForm16, setAuditSalariedForm16,
    auditSalariedNoc, setAuditSalariedNoc,
    auditSalariedItr, setAuditSalariedItr,
    auditBusinessReg, setAuditBusinessReg,
    auditBusinessItr, setAuditBusinessItr,
    auditFlightDeptDate, setAuditFlightDeptDate,
    auditFlightRetDate, setAuditFlightRetDate,
    auditFlightAirline, setAuditFlightAirline,
    auditFlightHasLayover, setAuditFlightHasLayover,
    auditFlightLayoverCity, setAuditFlightLayoverCity,
    auditAccommodationType, setAuditAccommodationType,
    auditSponsorshipType, setAuditSponsorshipType,
    auditSponsorDocsReady, setAuditSponsorDocsReady,
    auditCoveringLetter, setAuditCoveringLetter,
    auditVisaFormFilled, setAuditVisaFormFilled,
    auditTravelHistory, setAuditTravelHistory,
    auditPastRefusal, setAuditPastRefusal,
    auditRefusalMitigation, setAuditRefusalMitigation,
  } = readiness;

                        const normalizedDest = normalizeCountryName(selectedDestination);
                        const normalizedPass = normalizeCountryName(selectedPassport);
                        const currentDestObj = dashboardDestinationOptions.find(d => 
                            normalizeCountryName(d.value) === normalizedDest || d.value.toLowerCase() === normalizedDest.toLowerCase() || d.label.toLowerCase().includes(normalizedDest.toLowerCase())
                        );
                        const destFlag = currentDestObj?.flag || '🌍';
                        const currentPassObj = dashboardPassportOptions.find(p => 
                            normalizeCountryName(p.value) === normalizedPass || p.value.toLowerCase() === normalizedPass.toLowerCase() || p.label.toLowerCase().includes(normalizedPass.toLowerCase())
                        );
                        const passFlag = currentPassObj?.flag || '🇮🇳';

                        return (
                            <div className="space-y-6 animate-fade-up">
                                {/* Header Section */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                                                Visa Readiness Score &amp; Audit
                                            </h2>
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black border border-emerald-200">
                                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                                Consular AI Calibrated
                                            </span>
                                        </div>
                                        <p className="text-xs font-medium text-slate-500 mt-0.5">
                                            Official AI readiness evaluation for {normalizedDest} ({readinessMetrics.category}). Calibrated against official embassy benchmarks.
                                        </p>
                                    </div>

                                    {/* Simple Route Summary matching Image 2 */}
                                    <div className="bg-white rounded-2xl border border-slate-200/90 px-4 py-2 shadow-2xs flex items-center gap-3 text-xs self-start md:self-auto">
                                        <span className="font-bold text-slate-700 flex items-center gap-1.5">
                                            <span>{passFlag}</span>
                                            <span>{normalizedPass}</span>
                                        </span>
                                        <span className="text-slate-300 font-medium">→</span>
                                        <span className="font-bold text-slate-700 flex items-center gap-1.5">
                                            <span>{destFlag}</span>
                                            <span>{normalizedDest}</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Active Category (Showing only the category selected by the user) */}
                                <div className="inline-flex items-center gap-2 py-2 px-3.5 rounded-xl text-xs bg-slate-900 text-white font-bold shadow-xs">
                                    {readinessPurpose === 'study' ? (
                                        <>
                                            <GraduationCap className="w-4 h-4 text-white" />
                                            <span>Student Visa</span>
                                        </>
                                    ) : readinessPurpose === 'work' ? (
                                        <>
                                            <Briefcase className="w-4 h-4 text-white" />
                                            <span>Work Visa</span>
                                        </>
                                    ) : (
                                        <>
                                            <Plane className="w-4 h-4 text-white" />
                                            <span>Tourist Visa</span>
                                        </>
                                    )}
                                </div>

                                {/* Main Two-Column Grid: Assessment Points + Scorecard */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                                    
                                    {/* Left Column (7 cols): Assessment Criteria */}
                                    <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-5 text-left">
                                        <div className="border-b border-slate-100 pb-3">
                                            <div>
                                                <div className="flex items-center gap-1.5 text-[11px] font-black uppercase text-indigo-600 tracking-wider">
                                                    <span>Step 1</span>
                                                </div>
                                                <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight mt-0.5">
                                                    Visa Readiness Score
                                                </h3>
                                                <p className="text-xs text-slate-500 font-medium mt-0.5">
                                                    Criteria are cross-checked in real-time against official {normalizeCountryName(selectedDestination)} embassy requirements.
                                                </p>
                                            </div>
                                        </div>

                                        {/* 1. PASSPORT VERIFICATION */}
                                        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3.5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">1</span>
                                                    <h4 className="text-sm font-black text-slate-900">Passport Validity &amp; Blank Pages</h4>
                                                </div>
                                                
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 block mb-1">
                                                        (a) Passport Expiry Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={auditPassportExpiry}
                                                        onChange={(e) => {
                                                            setAuditPassportExpiry(e.target.value);
                                                            saveAuditField('auditPassportExpiry', e.target.value);
                                                        }}
                                                        className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                    {auditPassportExpiry && (
                                                        <div className={`mt-1 text-[11px] font-bold ${
                                                            comprehensiveAuditMetrics.passportValidityStatus.includes('Valid') ? 'text-emerald-600' : 'text-rose-600'
                                                        }`}>
                                                            {comprehensiveAuditMetrics.passportValidityStatus}
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 block mb-1">
                                                        (b) Minimum 2 Consecutive Blank Pages?
                                                    </label>
                                                    <div className="flex gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setAuditPassportBlankPages(true);
                                                                saveAuditField('auditPassportBlankPages', true);
                                                            }}
                                                            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                auditPassportBlankPages === true
                                                                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                            }`}
                                                        >
                                                            Ready
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setAuditPassportBlankPages(false);
                                                                saveAuditField('auditPassportBlankPages', false);
                                                            }}
                                                            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                auditPassportBlankPages === false
                                                                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                                                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                            }`}
                                                        >
                                                            Not Ready
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 2. FINANCIAL PROOF */}
                                        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3.5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">2</span>
                                                    <h4 className="text-sm font-black text-slate-900">Financial Solvency Proof</h4>
                                                </div>
                                                
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 block mb-1">
                                                        (a) Available Funds (Liquid Bank Balance)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. ₹3,50,000 or $4,500"
                                                        value={auditFinancialBalance}
                                                        onChange={(e) => {
                                                            setAuditFinancialBalance(e.target.value);
                                                            saveAuditField('auditFinancialBalance', e.target.value);
                                                        }}
                                                        className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                    <span className="text-[10px] text-slate-400 mt-1 block">Consular guideline: min ₹2.5L - ₹4L depending on stay</span>
                                                </div>

                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 block mb-1">
                                                        (b) Official Bank Statement
                                                    </label>
                                                    <select
                                                        value={auditBankStatementType}
                                                        onChange={(e) => {
                                                            setAuditBankStatementType(e.target.value);
                                                            saveAuditField('auditBankStatementType', e.target.value);
                                                        }}
                                                        className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    >
                                                        <option value="none">Select Statement Status...</option>
                                                        <option value="stamped_6m">6 Months Stamped &amp; Signed (Consular Gold Standard)</option>
                                                        <option value="stamped_3m">3 Months Stamped &amp; Signed Statement</option>
                                                        <option value="online_pdf">Online e-Statement PDF (Unstamped)</option>
                                                    </select>
                                                    <span className="text-[10px] text-slate-400 mt-1 block">Must carry original bank branch stamp &amp; signature</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 3. TRAVEL MEDICAL INSURANCE */}
                                        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3.5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">3</span>
                                                    <h4 className="text-sm font-black text-slate-900">Travel Medical Insurance</h4>
                                                </div>
                                                
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 block mb-1">
                                                        Valid From Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={auditInsuranceFrom}
                                                        onChange={(e) => {
                                                            setAuditInsuranceFrom(e.target.value);
                                                            saveAuditField('auditInsuranceFrom', e.target.value);
                                                        }}
                                                        className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 block mb-1">
                                                        Valid Till Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={auditInsuranceTill}
                                                        onChange={(e) => {
                                                            setAuditInsuranceTill(e.target.value);
                                                            saveAuditField('auditInsuranceTill', e.target.value);
                                                        }}
                                                        className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 block mb-1">
                                                        Medical Coverage
                                                    </label>
                                                    <select
                                                        value={auditInsuranceCoverage}
                                                        onChange={(e) => {
                                                            setAuditInsuranceCoverage(e.target.value);
                                                            saveAuditField('auditInsuranceCoverage', e.target.value);
                                                        }}
                                                        className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    >
                                                        <option value="none">Select Coverage...</option>
                                                        <option value="schengen_30k_50k">€30,000 / $50,000 (Schengen/OECD Mandated)</option>
                                                        <option value="comprehensive_100k">$100,000+ Comprehensive Global</option>
                                                        <option value="basic_25k">$25,000 Basic (Below Schengen min)</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {auditInsuranceFrom && auditInsuranceTill && (
                                                <div className={`text-xs font-bold p-2.5 rounded-xl border ${
                                                    comprehensiveAuditMetrics.insDateStatus.includes('Full')
                                                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                                        : 'bg-rose-50 border-rose-200 text-rose-800'
                                                }`}>
                                                    {comprehensiveAuditMetrics.insDateStatus}: Must cover entire duration of stay including departure and return dates.
                                                </div>
                                            )}
                                        </div>

                                        {/* 4. INCOME PROOF & OCCUPATIONAL TIES */}
                                        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3.5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">4</span>
                                                    <h4 className="text-sm font-black text-slate-900">Income Proof &amp; Occupational Ties</h4>
                                                </div>
                                                
                                            </div>

                                            {/* Employment Type Toggle */}
                                            <div className="flex bg-slate-200/70 p-1 rounded-xl max-w-sm">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setAuditEmploymentType('salaried');
                                                        saveAuditField('auditEmploymentType', 'salaried');
                                                    }}
                                                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                                                        auditEmploymentType === 'salaried' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                                                    }`}
                                                >
                                                    Salaried Professional
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setAuditEmploymentType('business');
                                                        saveAuditField('auditEmploymentType', 'business');
                                                    }}
                                                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                                                        auditEmploymentType === 'business' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                                                    }`}
                                                >
                                                    Business / Self-Employed
                                                </button>
                                            </div>

                                            {auditEmploymentType === 'salaried' ? (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                                    <div>
                                                        <label className="text-xs font-bold text-slate-700 block mb-1">
                                                            (a) Salary Pay Slips
                                                        </label>
                                                        <select
                                                            value={auditSalariedPayslips}
                                                            onChange={(e) => {
                                                                setAuditSalariedPayslips(e.target.value);
                                                                saveAuditField('auditSalariedPayslips', e.target.value);
                                                            }}
                                                            className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        >
                                                            <option value="none">Select Pay Slips...</option>
                                                            <option value="3_6_months">Last 3 - 6 Months Stamped Slips Ready</option>
                                                            <option value="1_2_months">1 - 2 Months Only</option>
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <label className="text-xs font-bold text-slate-700 block mb-1">
                                                            (b) Form 16 / Tax Certificate
                                                        </label>
                                                        <div className="flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setAuditSalariedForm16(true);
                                                                    saveAuditField('auditSalariedForm16', true);
                                                                }}
                                                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                    auditSalariedForm16 === true ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                                }`}
                                                            >
                                                                Ready
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setAuditSalariedForm16(false);
                                                                    saveAuditField('auditSalariedForm16', false);
                                                                }}
                                                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                    auditSalariedForm16 === false ? 'bg-rose-600 text-white border-rose-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                                }`}
                                                            >
                                                                Not Ready
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="text-xs font-bold text-slate-700 block mb-1">
                                                            (c) Employer NOC &amp; Leave Letter
                                                        </label>
                                                        <div className="flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setAuditSalariedNoc(true);
                                                                    saveAuditField('auditSalariedNoc', true);
                                                                }}
                                                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                    auditSalariedNoc === true ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                                }`}
                                                            >
                                                                Ready
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setAuditSalariedNoc(false);
                                                                    saveAuditField('auditSalariedNoc', false);
                                                                }}
                                                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                    auditSalariedNoc === false ? 'bg-rose-600 text-white border-rose-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                                }`}
                                                            >
                                                                Not Ready
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="text-xs font-bold text-slate-700 block mb-1">
                                                            (d) Personal ITR (Last 2 - 3 Years)
                                                        </label>
                                                        <div className="flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setAuditSalariedItr(true);
                                                                    saveAuditField('auditSalariedItr', true);
                                                                }}
                                                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                    auditSalariedItr === true ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                                }`}
                                                            >
                                                                Ready
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setAuditSalariedItr(false);
                                                                    saveAuditField('auditSalariedItr', false);
                                                                }}
                                                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                    auditSalariedItr === false ? 'bg-rose-600 text-white border-rose-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                                }`}
                                                            >
                                                                Not Ready
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                                    <div>
                                                        <label className="text-xs font-bold text-slate-700 block mb-1">
                                                            (a) Business Registration (GST / Incorporation)
                                                        </label>
                                                        <div className="flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setAuditBusinessReg(true);
                                                                    saveAuditField('auditBusinessReg', true);
                                                                }}
                                                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                    auditBusinessReg === true ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                                }`}
                                                            >
                                                                Ready
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setAuditBusinessReg(false);
                                                                    saveAuditField('auditBusinessReg', false);
                                                                }}
                                                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                    auditBusinessReg === false ? 'bg-rose-600 text-white border-rose-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                                }`}
                                                            >
                                                                Not Ready
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="text-xs font-bold text-slate-700 block mb-1">
                                                            (b) Business &amp; Personal ITR (Last 2 - 3 Yrs)
                                                        </label>
                                                        <div className="flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setAuditBusinessItr(true);
                                                                    saveAuditField('auditBusinessItr', true);
                                                                }}
                                                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                    auditBusinessItr === true ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                                }`}
                                                            >
                                                                Ready
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setAuditBusinessItr(false);
                                                                    saveAuditField('auditBusinessItr', false);
                                                                }}
                                                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                    auditBusinessItr === false ? 'bg-rose-600 text-white border-rose-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                                }`}
                                                            >
                                                                Not Ready
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* 5. RETURN FLIGHT TICKET & TRANSIT VISA CHECKER */}
                                        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3.5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">5</span>
                                                    <h4 className="text-sm font-black text-slate-900">Return Ticket &amp; Transit Visa Checker</h4>
                                                </div>
                                                
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 block mb-1">Departure Date</label>
                                                    <input
                                                        type="date"
                                                        value={auditFlightDeptDate}
                                                        onChange={(e) => {
                                                            setAuditFlightDeptDate(e.target.value);
                                                            saveAuditField('auditFlightDeptDate', e.target.value);
                                                        }}
                                                        className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 block mb-1">Return Date</label>
                                                    <input
                                                        type="date"
                                                        value={auditFlightRetDate}
                                                        onChange={(e) => {
                                                            setAuditFlightRetDate(e.target.value);
                                                            saveAuditField('auditFlightRetDate', e.target.value);
                                                        }}
                                                        className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 block mb-1">Airlines</label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. Emirates, Lufthansa, Air India"
                                                        value={auditFlightAirline}
                                                        onChange={(e) => {
                                                            setAuditFlightAirline(e.target.value);
                                                            saveAuditField('auditFlightAirline', e.target.value);
                                                        }}
                                                        className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                </div>
                                            </div>

                                            {/* Transit Layover Checker */}
                                            <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-2">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                    <span className="text-xs font-bold text-slate-800">
                                                        Does your flight have layovers in a third country?
                                                    </span>
                                                    <div className="flex gap-2 shrink-0">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setAuditFlightHasLayover(false);
                                                                saveAuditField('auditFlightHasLayover', false);
                                                            }}
                                                            className={`py-1.5 px-3 rounded-lg text-xs font-bold border transition-all ${
                                                                auditFlightHasLayover === false ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 border-slate-200 text-slate-600'
                                                            }`}
                                                        >
                                                            Direct Flight
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setAuditFlightHasLayover(true);
                                                                saveAuditField('auditFlightHasLayover', true);
                                                            }}
                                                            className={`py-1.5 px-3 rounded-lg text-xs font-bold border transition-all ${
                                                                auditFlightHasLayover === true ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 border-slate-200 text-slate-600'
                                                            }`}
                                                        >
                                                            Has Layover
                                                        </button>
                                                    </div>
                                                </div>

                                                {auditFlightHasLayover === true && (
                                                    <div className="pt-2 border-t border-slate-100 space-y-2 animate-fadeIn">
                                                        <label className="text-[11px] font-bold text-slate-600 block">
                                                            Enter Layover City / Airport (Transit Visa Checker)
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="e.g. Frankfurt FRA, London LHR, Paris CDG, Doha DOH"
                                                            value={auditFlightLayoverCity}
                                                            onChange={(e) => {
                                                                setAuditFlightLayoverCity(e.target.value);
                                                                saveAuditField('auditFlightLayoverCity', e.target.value);
                                                            }}
                                                            className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        />
                                                        {auditFlightLayoverCity && (
                                                            <div className="text-[11px] font-semibold text-amber-900 bg-amber-50 border border-amber-200 p-2 rounded-lg">
                                                                ⚠️ <strong>Transit Visa Advisory:</strong> Indian passport holders transiting via Schengen hubs (FRA, CDG, AMS) or UK without a valid US/UK/Canada/Schengen visa may require an Airport Transit Visa (ATV/DATV). Check airline requirements before booking.
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* 6. ACCOMMODATION PROOF */}
                                        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3.5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">6</span>
                                                    <h4 className="text-sm font-black text-slate-900">Accommodation Proof</h4>
                                                </div>
                                                
                                            </div>

                                            <select
                                                value={auditAccommodationType}
                                                onChange={(e) => {
                                                    setAuditAccommodationType(e.target.value);
                                                    saveAuditField('auditAccommodationType', e.target.value);
                                                }}
                                                className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            >
                                                <option value="none">Select Accommodation Proof Status...</option>
                                                <option value="hotel_confirmed">Confirmed Hotel Voucher (Full Duration with Booking ID)</option>
                                                <option value="host_invitation">Host / Relative Official Invitation Letter + Proof of Address</option>
                                                <option value="rental_lease">Confirmed Rental Apartment / Airbnb Lease</option>
                                            </select>
                                        </div>

                                        {/* 7. SPONSOR LETTER */}
                                        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3.5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">7</span>
                                                    <h4 className="text-sm font-black text-slate-900">Sponsorship Details &amp; Proof</h4>
                                                </div>
                                                
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 block mb-1">Funding Source</label>
                                                    <select
                                                        value={auditSponsorshipType}
                                                        onChange={(e) => {
                                                            setAuditSponsorshipType(e.target.value);
                                                            saveAuditField('auditSponsorshipType', e.target.value);
                                                        }}
                                                        className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    >
                                                        <option value="self">Self-Sponsored (My Personal Funds)</option>
                                                        <option value="family_sponsored">Family / Relative Sponsored</option>
                                                        <option value="company_sponsored">Corporate / Company Sponsored</option>
                                                    </select>
                                                </div>

                                                {auditSponsorshipType !== 'self' && (
                                                    <div>
                                                        <label className="text-xs font-bold text-slate-700 block mb-1">
                                                            Sponsor Affidavit &amp; Financials Ready?
                                                        </label>
                                                        <div className="flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setAuditSponsorDocsReady(true);
                                                                    saveAuditField('auditSponsorDocsReady', true);
                                                                }}
                                                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                    auditSponsorDocsReady === true ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-slate-200 text-slate-600'
                                                                }`}
                                                            >
                                                                Ready
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setAuditSponsorDocsReady(false);
                                                                    saveAuditField('auditSponsorDocsReady', false);
                                                                }}
                                                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                                                                    auditSponsorDocsReady === false ? 'bg-rose-600 text-white border-rose-600' : 'bg-white border-slate-200 text-slate-600'
                                                                }`}
                                                            >
                                                                Not Ready
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* 8. COVERING LETTER */}
                                        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3.5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">8</span>
                                                    <h4 className="text-sm font-black text-slate-900">Covering Letter &amp; Day-wise Itinerary</h4>
                                                </div>
                                                
                                            </div>

                                            <select
                                                value={auditCoveringLetter}
                                                onChange={(e) => {
                                                    setAuditCoveringLetter(e.target.value);
                                                    saveAuditField('auditCoveringLetter', e.target.value);
                                                }}
                                                className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            >
                                                <option value="none">Select Covering Letter Status...</option>
                                                <option value="ready_signed">Signed &amp; Ready with Detailed Day-by-Day Travel Itinerary</option>
                                                <option value="ai_drafted">Drafted via AI (Pending Final Print &amp; Signature)</option>
                                            </select>
                                        </div>

                                        {/* 9. VISA APPLICATION FORM FILLED */}
                                        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3.5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">9</span>
                                                    <h4 className="text-sm font-black text-slate-900">Official Visa Application Form</h4>
                                                </div>
                                                
                                            </div>

                                            <div className="flex items-center justify-between gap-3">
                                                <span className="text-xs font-bold text-slate-700">
                                                    Official embassy online/paper application form completed &amp; signed?
                                                </span>
                                                <div className="flex gap-2 shrink-0">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setAuditVisaFormFilled(true);
                                                            saveAuditField('auditVisaFormFilled', true);
                                                        }}
                                                        className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all ${
                                                            auditVisaFormFilled === true ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                        }`}
                                                    >
                                                        Ready
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setAuditVisaFormFilled(false);
                                                            saveAuditField('auditVisaFormFilled', false);
                                                        }}
                                                        className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all ${
                                                            auditVisaFormFilled === false ? 'bg-rose-600 text-white border-rose-600 shadow-xs' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                                        }`}
                                                    >
                                                        Not Ready
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 10. PREVIOUS TRAVEL HISTORY */}
                                        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3.5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">10</span>
                                                    <h4 className="text-sm font-black text-slate-900">Previous International Travel History</h4>
                                                </div>
                                                
                                            </div>

                                            <select
                                                value={auditTravelHistory}
                                                onChange={(e) => {
                                                    setAuditTravelHistory(e.target.value);
                                                    saveAuditField('auditTravelHistory', e.target.value);
                                                }}
                                                className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            >
                                                <option value="none">Select Travel History Footprint...</option>
                                                <option value="strong_oecd">Frequent International Traveler (US, UK, Schengen, Canada, OECD visas)</option>
                                                <option value="regional">Regional Travel History (UAE, GCC, Singapore, Thailand, Malaysia)</option>
                                                <option value="first_time">First-Time International Traveler (Fresh Passport)</option>
                                            </select>
                                            <span className="text-[10px] text-slate-400 block">Migrated from your TravlTik profile travel history</span>
                                        </div>


                                    </div>

                                    {/* Right Column (5 cols): Real-Time Readiness Scorecard with <70% Consultant Recommendation */}
                                    <div className="lg:col-span-5 bg-gradient-to-b from-slate-50/90 via-white to-slate-50/50 border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4 text-center">
                                        
                                        {/* Card Header */}
                                        <div className="w-full flex items-center justify-between gap-2 pb-1 text-left">
                                            <div>
                                                <div className="flex items-center gap-1.5 text-[11px] font-black uppercase text-indigo-700 tracking-wider mb-0.5">
                                                    <span>10-Point Audit</span>
                                                    <span>•</span>
                                                    <span>Live Score</span>
                                                </div>
                                                <h4 className="text-base sm:text-lg font-black text-slate-950 tracking-tight">
                                                    Visa Readiness Score
                                                </h4>
                                                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                                                    {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                </p>
                                            </div>

                                            {comprehensiveAuditMetrics.score >= 70 ? (
                                                <span className="px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider shrink-0 bg-emerald-600 text-white">
                                                    BENCHMARK MET
                                                </span>
                                            ) : comprehensiveAuditMetrics.isUnselected ? (
                                                <span className="px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider shrink-0 bg-slate-100 text-slate-600 border border-slate-200">
                                                    VERIFICATION PENDING
                                                </span>
                                            ) : null}
                                        </div>

                                        {/* Center: Circular Rainbow Gauge */}
                                        <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto flex items-center justify-center my-1">
                                            <svg className="w-full h-full" viewBox="0 0 200 200">
                                                <defs>
                                                    <linearGradient id="rainbowGaugeDash11" x1="0%" y1="100%" x2="100%" y2="0%">
                                                        <stop offset="0%" stopColor="#F43F5E" />
                                                        <stop offset="35%" stopColor="#FB923C" />
                                                        <stop offset="65%" stopColor="#FACC15" />
                                                        <stop offset="100%" stopColor="#22C55E" />
                                                    </linearGradient>
                                                </defs>

                                                {/* Background Arc */}
                                                <path
                                                    d="M 46 150 A 70 70 0 1 1 154 150"
                                                    fill="none"
                                                    stroke="#E2E8F0"
                                                    strokeWidth="15"
                                                    strokeLinecap="round"
                                                />

                                                {/* Foreground Rainbow Score Arc */}
                                                <path
                                                    d="M 46 150 A 70 70 0 1 1 154 150"
                                                    fill="none"
                                                    stroke="url(#rainbowGaugeDash11)"
                                                    strokeWidth="15"
                                                    strokeLinecap="round"
                                                    strokeDasharray="318"
                                                    strokeDashoffset={comprehensiveAuditMetrics.isUnselected ? 318 : 318 - (Math.max(5, comprehensiveAuditMetrics.score) / 100) * 318}
                                                    className="transition-all duration-1000 ease-out"
                                                />
                                            </svg>

                                            {/* Center Number (0 to 100% Scale) */}
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-2 sm:pt-3">
                                                <div className="flex items-baseline justify-center gap-0.5">
                                                    <span className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight leading-none font-heading">
                                                        {comprehensiveAuditMetrics.score}
                                                    </span>
                                                    <span className="text-base sm:text-xl font-bold text-slate-400">%</span>
                                                </div>
                                                <span className={`text-[11px] sm:text-xs font-bold mt-1 ${
                                                    comprehensiveAuditMetrics.score >= 70 ? 'text-emerald-600' : 'text-slate-500'
                                                }`}>
                                                    {comprehensiveAuditMetrics.isUnselected
                                                        ? 'Verification Pending'
                                                        : comprehensiveAuditMetrics.score >= 70
                                                        ? 'Ready for Submission'
                                                        : 'In Progress'}
                                                </span>
                                            </div>
                                        </div>

                                        {comprehensiveAuditMetrics.score >= 70 && (
                                            <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-left space-y-2 animate-fade-up">
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                                    <span className="text-[11px] font-black uppercase text-emerald-900 tracking-wider">
                                                        CONSULAR BENCHMARK MET
                                                    </span>
                                                </div>
                                                <h5 className="text-sm font-black text-emerald-950">
                                                    Strong Visa Readiness ({comprehensiveAuditMetrics.score}%)
                                                </h5>
                                                <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                                                    Your documents fulfill primary embassy requirements! Your dossier is strong and ready for appointment booking and submission.
                                                </p>
                                            </div>
                                        )}

                                        {/* 11 Evaluation Pillars Grid */}
                                        <div className="w-full pt-3 border-t border-slate-100 text-left">
                                            <div className="flex items-center justify-between pb-2">
                                                <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider">
                                                    11 Evaluation Pillars Breakdown
                                                </span>
                                                <span className="text-[11px] font-bold text-slate-700 font-mono">
                                                    {comprehensiveAuditMetrics.score} / 100 Pts
                                                </span>
                                            </div>

                                            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1 no-scrollbar">
                                                {comprehensiveAuditMetrics.pillars.map((pillar, idx) => {
                                                    const pct = Math.min(100, Math.round((pillar.score / pillar.max) * 100));
                                                    return (
                                                        <div
                                                            key={idx}
                                                            className="p-2 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-slate-50 transition-colors text-left"
                                                        >
                                                            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                                                                <span className="truncate pr-1 text-[11px]">{pillar.name}</span>
                                                                <span className="font-mono text-emerald-700 font-extrabold text-[11px] shrink-0">
                                                                    {pillar.score} / {pillar.max}
                                                                </span>
                                                            </div>
                                                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                                                                <div
                                                                    className={`h-full rounded-full transition-all duration-500 ${
                                                                        pct === 100 ? 'bg-emerald-500' : pct > 0 ? 'bg-amber-500' : 'bg-slate-300'
                                                                    }`}
                                                                    style={{ width: `${pct}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Consular Red Flags / Alerts */}
                                        {comprehensiveAuditMetrics.criticalAlerts.length > 0 && (
                                            <div className="w-full space-y-1.5 text-left">
                                                {comprehensiveAuditMetrics.criticalAlerts.slice(0, 2).map((rf, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-start gap-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold leading-relaxed"
                                                    >
                                                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                                                        <span>{rf}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Action Button */}
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab('scanned-documents')}
                                            className="w-full py-2.5 rounded-xl bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white text-xs font-black shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                                        >
                                            <FileText className="w-3.5 h-3.5 text-white" />
                                            <span>Upload Documents in Vault →</span>
                                        </button>
                                    </div>
                                </div>

                                {/* STEP 2: MANDATORY EMBASSY DOCUMENTS CHECKLIST (Directly powers readiness score) */}
                                <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5 text-left animate-fadeIn mt-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-md">
                                                    STEP 2 • DOCUMENTS CHECKLIST
                                                </span>
                                                <span className="text-xs text-slate-400 font-medium">•</span>
                                                <span className="text-xs font-bold text-slate-600">
                                                    Boosts Readiness Score by up to +3.5 Pts
                                                </span>
                                            </div>
                                            <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight mt-1">
                                                Mandatory Embassy Documents Checklist for {normalizeCountryName(selectedDestination)}
                                            </h3>
                                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                                                Mark documents as ready or upload them to calculate your comprehensive consular approval readiness score.
                                            </p>

                                            {/* ── Evidence Verification Badge ── */}
                                            {aiVisaData && aiVisaData.verification_status && (
                                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                                    {aiVisaData.verification_status === 'verified' && (
                                                        <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded-lg">
                                                            <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                                            Verified from Official Source
                                                        </span>
                                                    )}
                                                    {aiVisaData.verification_status === 'partially_verified' && (
                                                        <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-300 px-2.5 py-1 rounded-lg">
                                                            <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>
                                                            Partially Verified — Cross-check with Embassy
                                                        </span>
                                                    )}
                                                    {(aiVisaData.verification_status === 'unverified' || aiVisaData.verification_status === 'conflicting_sources') && (
                                                        <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-rose-800 bg-rose-50 border border-rose-300 px-2.5 py-1 rounded-lg">
                                                            <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                                            Unverified — Cross-check with Official Embassy
                                                        </span>
                                                    )}
                                                    {aiVisaData.verification_status === 'stale' && (
                                                        <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-orange-800 bg-orange-50 border border-orange-300 px-2.5 py-1 rounded-lg">
                                                            <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
                                                            Data May Be Outdated — Verify with Embassy
                                                        </span>
                                                    )}
                                                    {aiVisaData.sources && aiVisaData.sources.length > 0 && aiVisaData.sources[0]?.url && (
                                                        <a
                                                            href={aiVisaData.sources[0].url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1 text-[10px] font-bold text-[#00a896] underline underline-offset-2 hover:text-[#009282] transition-colors"
                                                        >
                                                            View Official Source ↗
                                                        </a>
                                                    )}
                                                </div>
                                            )}

                                            {/* ── Sources Collapsible ── */}
                                            {aiVisaData?.sources && aiVisaData.sources.length > 0 && (
                                                <details className="mt-2 group">
                                                    <summary className="cursor-pointer text-[10px] font-black uppercase tracking-wider text-slate-500 hover:text-slate-700 list-none flex items-center gap-1 select-none">
                                                        <svg className="w-3 h-3 transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                                        {aiVisaData.sources.length} Source{aiVisaData.sources.length > 1 ? 's' : ''} Referenced
                                                    </summary>
                                                    <ul className="mt-1.5 space-y-1 pl-4">
                                                        {aiVisaData.sources.slice(0, 5).map((src: any, i: number) => (
                                                             <li key={i} className="text-[10px] text-slate-500 font-medium leading-relaxed">
                                                                {src.url ? (
                                                                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-[#00a896] hover:underline break-all">
                                                                        {src.authority || src.url}
                                                                    </a>
                                                                ) : (
                                                                    <span>{src.authority || 'Official Source'}</span>
                                                                )}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </details>
                                            )}

                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className={`text-xs font-black px-3.5 py-1.5 rounded-xl border transition-all ${
                                                readinessMetrics.verifiedVaultCount === readinessMetrics.totalVaultCount && readinessMetrics.totalVaultCount > 0
                                                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                                    : readinessMetrics.verifiedVaultCount > 0
                                                    ? 'bg-indigo-50 text-indigo-900 border-indigo-200'
                                                    : 'bg-slate-100 text-slate-600 border-slate-200'
                                            }`}>
                                                {readinessMetrics.verifiedVaultCount} of {readinessMetrics.totalVaultCount} Documents Ready
                                            </span>
                                        </div>
                                    </div>

                                    {/* Document Checklist Cards Grid - Crystal Clear Atlys UI */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {readinessDocChecklist.map((doc, idx) => {
                                            const itemData = vaultChecklistState[doc.key];
                                            const isReady = !!itemData?.verified;
                                            const fileInputId = `readiness-file-${doc.key}`;

                                            return (
                                                <div
                                                    key={doc.key || idx}
                                                    className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between text-left space-y-4 shadow-2xs hover:shadow-sm ${
                                                        isReady
                                                            ? 'bg-emerald-50/40 border-emerald-400'
                                                            : 'bg-white border-slate-200 hover:border-slate-300'
                                                    }`}
                                                >
                                                    <input
                                                        id={fileInputId}
                                                        type="file"
                                                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) handleVaultDocScan(file, doc.key, doc.title);
                                                        }}
                                                    />

                                                    <div className="space-y-2.5">
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div className="flex items-start gap-2.5">
                                                                <span className="text-xl shrink-0 p-1.5 rounded-xl bg-slate-50 border border-slate-100">{doc.icon || '📄'}</span>
                                                                <h4 className="text-sm font-black text-slate-950 leading-snug">
                                                                    {doc.title}
                                                                </h4>
                                                            </div>
                                                            <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md shrink-0 tracking-wider ${
                                                                isReady
                                                                    ? 'bg-emerald-600 text-white shadow-2xs'
                                                                    : doc.mandatory !== false
                                                                    ? 'bg-rose-50 text-rose-700 border border-rose-200 font-black'
                                                                    : 'bg-slate-100 text-slate-700 border border-slate-200 font-bold'
                                                            }`}>
                                                                {isReady ? 'Ready' : doc.mandatory !== false ? 'Required' : 'Optional'}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                                                            {cleanShortDocRequirement(doc.title, doc.description || doc.hint)}
                                                        </p>
                                                    </div>

                                                    <div className="pt-3 border-t border-slate-100">
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleReadinessDoc?.(doc.key, doc.title)}
                                                            className={`w-full px-3.5 py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                                                isReady
                                                                    ? 'bg-emerald-600 text-white shadow-xs hover:bg-emerald-700'
                                                                    : 'bg-white border-2 border-slate-200 text-slate-800 hover:border-slate-400 hover:bg-slate-50'
                                                            }`}
                                                        >
                                                            <Check className={`w-3.5 h-3.5 stroke-[3] ${isReady ? 'text-white' : 'text-slate-400'}`} />
                                                            <span>{isReady ? 'Document Ready' : 'Mark as Ready'}</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
}
