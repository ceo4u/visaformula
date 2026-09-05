import { useState, useEffect, useMemo } from "react";
import { normalizeCountryName } from "../utils/countryHelpers";
import { getAiDocIcon, getDestinationChecklist } from "../utils/documentHelpers";
import type { VaultDocItem, IeltsScore, VaultDocChecklistEntry } from "../types";

export function useReadinessAudit({
  selectedDestination = "United States",
  selectedPassport = "India",
  selectedPurpose = "Tourism / Vacation",
  documents = [],
  vaultChecklistState = {},
  setVaultChecklistState
}: {
  selectedDestination?: string;
  selectedPassport?: string;
  selectedPurpose?: string;
  documents?: any[];
  vaultChecklistState?: Record<string, VaultDocChecklistEntry>;
  setVaultChecklistState?: React.Dispatch<React.SetStateAction<Record<string, VaultDocChecklistEntry>>>;
}) {
  // IELTS Score
  const [ieltsScore, setIeltsScore] = useState<IeltsScore>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("seeker_ielts");
        if (saved) return JSON.parse(saved);
      } catch(e) {}
    }
    return { L: 0, R: 0, W: 0, S: 0 };
  });

  const hasIeltsScore = ieltsScore.L > 0 || ieltsScore.R > 0 || ieltsScore.W > 0 || ieltsScore.S > 0;
  const overallBand = hasIeltsScore ? ((ieltsScore.L + ieltsScore.R + ieltsScore.W + ieltsScore.S) / 4).toFixed(1) : "N/A";

  const handleUpdateIelts = (newScore: IeltsScore) => {
    setIeltsScore(newScore);
    try {
      localStorage.setItem("seeker_ielts", JSON.stringify(newScore));
    } catch(e) {}
  };

  // Readiness purpose & passport validity
  const [readinessPurpose, setReadinessPurpose] = useState<'study' | 'tourism' | 'work'>('tourism');
  const [readinessPassportValidity, setReadinessPassportValidity] = useState("");
  const [aiVisaData, setAiVisaData] = useState<any>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  // Student specific states
  const [studyQual, setStudyQual] = useState("");
  const [studyTarget, setStudyTarget] = useState("");
  const [studyIntake, setStudyIntake] = useState("");
  const [studyBudget, setStudyBudget] = useState("");
  const [studentAdmissionStatus, setStudentAdmissionStatus] = useState("");
  const [studentLanguageScore, setStudentLanguageScore] = useState("");

  // Tourist specific states
  const [visitPlanStatus, setVisitPlanStatus] = useState("");
  const [visitTiming, setVisitTiming] = useState("");
  const [visitReturnDate, setVisitReturnDate] = useState("");
  const [tripDurationDays, setTripDurationDays] = useState(0);
  const [visitStay, setVisitStay] = useState("");
  const [touristHomeTies, setTouristHomeTies] = useState("");
  const [touristBankStability, setTouristBankStability] = useState("");

  // Work specific states
  const [workExp, setWorkExp] = useState("");
  const [workOffer, setWorkOffer] = useState("");
  const [workDomain, setWorkDomain] = useState("");
  const [workAssess, setWorkAssess] = useState("");

  // 11-point statutory audit states
  const [auditPassportExpiry, setAuditPassportExpiry] = useState("");
  const [auditPassportBlankPages, setAuditPassportBlankPages] = useState<boolean | null>(null);
  const [auditFinancialBalance, setAuditFinancialBalance] = useState("");
  const [auditBankStatementType, setAuditBankStatementType] = useState<string>("none");
  const [auditInsuranceFrom, setAuditInsuranceFrom] = useState("");
  const [auditInsuranceTill, setAuditInsuranceTill] = useState("");
  const [auditInsuranceCoverage, setAuditInsuranceCoverage] = useState<string>("none");
  const [auditEmploymentType, setAuditEmploymentType] = useState<"salaried" | "business">("salaried");
  const [auditSalariedPayslips, setAuditSalariedPayslips] = useState<string>("none");
  const [auditSalariedForm16, setAuditSalariedForm16] = useState<boolean | null>(null);
  const [auditSalariedNoc, setAuditSalariedNoc] = useState<boolean | null>(null);
  const [auditSalariedItr, setAuditSalariedItr] = useState<boolean | null>(null);
  const [auditBusinessReg, setAuditBusinessReg] = useState<boolean | null>(null);
  const [auditBusinessItr, setAuditBusinessItr] = useState<boolean | null>(null);
  const [auditFlightDeptDate, setAuditFlightDeptDate] = useState("");
  const [auditFlightRetDate, setAuditFlightRetDate] = useState("");
  const [auditFlightAirline, setAuditFlightAirline] = useState("");
  const [auditFlightHasLayover, setAuditFlightHasLayover] = useState<boolean | null>(null);
  const [auditFlightLayoverCity, setAuditFlightLayoverCity] = useState("");
  const [auditAccommodationType, setAuditAccommodationType] = useState<string>("none");
  const [auditSponsorshipType, setAuditSponsorshipType] = useState<string>("self");
  const [auditSponsorDocsReady, setAuditSponsorDocsReady] = useState<boolean | null>(null);
  const [auditCoveringLetter, setAuditCoveringLetter] = useState<string>("none");
  const [auditVisaFormFilled, setAuditVisaFormFilled] = useState<boolean | null>(null);
  const [auditTravelHistory, setAuditTravelHistory] = useState<string>("none");
  const [auditPastRefusal, setAuditPastRefusal] = useState<boolean | null>(null);
  const [auditRefusalMitigation, setAuditRefusalMitigation] = useState<boolean | null>(null);

  useEffect(() => {
    const p = (selectedPurpose || '').toLowerCase();
    if (p.includes('stud') || p.includes('higher') || p.includes('academic')) {
      setReadinessPurpose('study');
    } else if (p.includes('work') || p.includes('employ') || p.includes('job')) {
      setReadinessPurpose('work');
    } else {
      setReadinessPurpose('tourism');
    }
  }, [selectedPurpose]);

  // Hydrate readiness assessment from localStorage
  useEffect(() => {
    try {
      const savedRaw = localStorage.getItem('visa_readiness_assessment');
      const journeyRaw = localStorage.getItem('travltik_user_journey');
      let savedData: any = null;
      if (savedRaw) {
        savedData = JSON.parse(savedRaw);
      } else if (journeyRaw) {
        const j = JSON.parse(journeyRaw);
        if (j?.readiness_assessment) savedData = j.readiness_assessment;
      }

      if (savedData) {
        if (savedData.purpose) {
          const p = String(savedData.purpose).toLowerCase();
          if (p.includes('study') || p.includes('student')) setReadinessPurpose('study');
          else if (p.includes('work') || p.includes('job')) setReadinessPurpose('work');
          else setReadinessPurpose('tourism');
        }
        if (savedData.studyQual) setStudyQual(savedData.studyQual);
        if (savedData.studyTarget) setStudyTarget(savedData.studyTarget);
        if (savedData.studyIntake) setStudyIntake(savedData.studyIntake);
        if (savedData.studyBudget) setStudyBudget(savedData.studyBudget);
        if (savedData.studentAdmissionStatus) setStudentAdmissionStatus(savedData.studentAdmissionStatus);
        if (savedData.studentLanguageScore) setStudentLanguageScore(savedData.studentLanguageScore);

        if (savedData.visitPlanStatus) setVisitPlanStatus(savedData.visitPlanStatus);
        if (savedData.visitTiming) setVisitTiming(savedData.visitTiming);
        if (savedData.visitReturnDate) setVisitReturnDate(savedData.visitReturnDate);
        if (typeof savedData.tripDurationDays === 'number') setTripDurationDays(savedData.tripDurationDays);
        if (savedData.visitStay) setVisitStay(savedData.visitStay);
        if (savedData.touristHomeTies) setTouristHomeTies(savedData.touristHomeTies);
        if (savedData.touristBankStability) setTouristBankStability(savedData.touristBankStability);

        if (savedData.workExp) setWorkExp(savedData.workExp);
        if (savedData.workOffer) setWorkOffer(savedData.workOffer);
        if (savedData.workDomain) setWorkDomain(savedData.workDomain);
        if (savedData.workAssess) setWorkAssess(savedData.workAssess);

        if (savedData.passportValidityRange || savedData.readinessPassportValidity) {
          setReadinessPassportValidity(savedData.passportValidityRange || savedData.readinessPassportValidity);
        }
      }
    } catch (e) {}
  }, []);

  // Sync edits back to localStorage
  useEffect(() => {
    const hasData = Boolean(
      studyQual || studyTarget || studyIntake || studyBudget || studentAdmissionStatus || studentLanguageScore ||
      visitPlanStatus || visitTiming || visitReturnDate || visitStay || touristHomeTies || touristBankStability ||
      workExp || workOffer || workDomain || workAssess || readinessPassportValidity
    );
    if (!hasData) return;

    try {
      const payload = {
        purpose: readinessPurpose,
        destination: selectedDestination,
        passport: selectedPassport,
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
        readinessPassportValidity,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('visa_readiness_assessment', JSON.stringify(payload));
    } catch (e) {}
  }, [
    readinessPurpose, selectedDestination, selectedPassport,
    studyQual, studyTarget, studyIntake, studyBudget, studentAdmissionStatus, studentLanguageScore,
    visitPlanStatus, visitTiming, visitReturnDate, tripDurationDays, visitStay, touristHomeTies, touristBankStability,
    workExp, workOffer, workDomain, workAssess,
    readinessPassportValidity
  ]);

  const saveAuditField = (field: string, value: any) => {
    const targetDest = normalizeCountryName(selectedDestination);
    const key = `visa_readiness_audit_${targetDest.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${readinessPurpose}`;
    try {
      const current = JSON.parse(localStorage.getItem(key) || "{}");
      current[field] = value;
      localStorage.setItem(key, JSON.stringify(current));
    } catch(e) {}
  };

  // Hydrate 11-point audit state
  useEffect(() => {
    if (typeof window !== "undefined") {
      const targetDest = normalizeCountryName(selectedDestination);
      const key = `visa_readiness_audit_${targetDest.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${readinessPurpose}`;
      try {
        const saved = localStorage.getItem(key);
        if (saved) {
          const p = JSON.parse(saved);
          if (p.auditPassportExpiry !== undefined) setAuditPassportExpiry(p.auditPassportExpiry);
          if (p.auditPassportBlankPages !== undefined) setAuditPassportBlankPages(p.auditPassportBlankPages);
          if (p.auditFinancialBalance !== undefined) setAuditFinancialBalance(p.auditFinancialBalance);
          if (p.auditBankStatementType !== undefined) setAuditBankStatementType(p.auditBankStatementType);
          if (p.auditInsuranceFrom !== undefined) setAuditInsuranceFrom(p.auditInsuranceFrom);
          if (p.auditInsuranceTill !== undefined) setAuditInsuranceTill(p.auditInsuranceTill);
          if (p.auditInsuranceCoverage !== undefined) setAuditInsuranceCoverage(p.auditInsuranceCoverage);
          if (p.auditEmploymentType !== undefined) setAuditEmploymentType(p.auditEmploymentType);
          if (p.auditSalariedPayslips !== undefined) setAuditSalariedPayslips(p.auditSalariedPayslips);
          if (p.auditSalariedForm16 !== undefined) setAuditSalariedForm16(p.auditSalariedForm16);
          if (p.auditSalariedNoc !== undefined) setAuditSalariedNoc(p.auditSalariedNoc);
          if (p.auditSalariedItr !== undefined) setAuditSalariedItr(p.auditSalariedItr);
          if (p.auditBusinessReg !== undefined) setAuditBusinessReg(p.auditBusinessReg);
          if (p.auditBusinessItr !== undefined) setAuditBusinessItr(p.auditBusinessItr);
          if (p.auditFlightDeptDate !== undefined) setAuditFlightDeptDate(p.auditFlightDeptDate);
          if (p.auditFlightRetDate !== undefined) setAuditFlightRetDate(p.auditFlightRetDate);
          if (p.auditFlightAirline !== undefined) setAuditFlightAirline(p.auditFlightAirline);
          if (p.auditFlightHasLayover !== undefined) setAuditFlightHasLayover(p.auditFlightHasLayover);
          if (p.auditFlightLayoverCity !== undefined) setAuditFlightLayoverCity(p.auditFlightLayoverCity);
          if (p.auditAccommodationType !== undefined) setAuditAccommodationType(p.auditAccommodationType);
          if (p.auditSponsorshipType !== undefined) setAuditSponsorshipType(p.auditSponsorshipType);
          if (p.auditSponsorDocsReady !== undefined) setAuditSponsorDocsReady(p.auditSponsorDocsReady);
          if (p.auditCoveringLetter !== undefined) setAuditCoveringLetter(p.auditCoveringLetter);
          if (p.auditVisaFormFilled !== undefined) setAuditVisaFormFilled(p.auditVisaFormFilled);
          if (p.auditTravelHistory !== undefined) setAuditTravelHistory(p.auditTravelHistory);
          if (p.auditPastRefusal !== undefined) setAuditPastRefusal(p.auditPastRefusal);
          if (p.auditRefusalMitigation !== undefined) setAuditRefusalMitigation(p.auditRefusalMitigation);
        } else {
          const hasVaultPassport = vaultChecklistState['global_passport']?.verified;
          if (hasVaultPassport) {
            setAuditPassportBlankPages(true);
            if (!auditPassportExpiry) setAuditPassportExpiry('2031-10-15');
          }
        }
      } catch(e) {}
    }
  }, [selectedDestination, readinessPurpose]);

  const readinessDocChecklist = useMemo<VaultDocItem[]>(() => {
    const targetDest = normalizeCountryName(selectedDestination);
    const destChecklist = (aiVisaData?.documents_required && aiVisaData.documents_required.length > 0)
      ? aiVisaData.documents_required.map((doc: any, idx: number) => ({
          key: `doc_req_${idx}_${doc.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
          title: doc.title,
          description: doc.description || '',
          icon: getAiDocIcon(doc.title),
          mandatory: doc.is_mandatory !== false,
          hint: doc.is_mandatory !== false ? 'Mandatory Statutory Requirement' : 'Supporting / Optional'
        }))
      : getDestinationChecklist(targetDest, readinessPurpose);

    return destChecklist && destChecklist.length > 0 ? destChecklist : [
      { key: 'passport', title: 'Valid Passport (Bio-data Front & Back)', hint: 'Min. 6 months validity & blank pages', icon: '📘', mandatory: true, description: 'Clear color scan of passport bio-data page.' },
      { key: 'financials', title: 'Financial Solvency Proof & Bank Statements', hint: '6 months stamped bank statements or loan sanction', icon: '💰', mandatory: true, description: 'Official bank statements showing adequate liquid funds.' },
      { key: 'purpose_doc', title: readinessPurpose === 'study' ? 'Institutional Offer Letter / CAS / I-20' : readinessPurpose === 'work' ? 'Employer Job Offer & Sponsorship (CoS/LMIA)' : 'Return Flight Ticket & Hotel Reservation', hint: 'Official travel or acceptance proof', icon: '📄', mandatory: true, description: 'Key institutional or travel confirmation document.' },
      { key: 'identity_proof', title: 'National Identity Proof / Aadhaar / Voter ID', hint: 'Government issued identity proof', icon: '🪪', mandatory: true, description: 'National identity card or government document.' },
      { key: 'tax_employment', title: readinessPurpose === 'study' ? 'Academic Marksheets & Language Scorecard' : readinessPurpose === 'work' ? 'Professional Experience & Skill Assessment' : 'Employer Leave NOC & 2-Year ITR', hint: 'Income / Academic qualification record', icon: '📑', mandatory: false, description: 'Supporting tax, employment, or academic paperwork.' },
      { key: 'travel_insurance', title: 'Travel Medical Insurance Policy', hint: 'Medical emergency coverage compliant with embassy specs', icon: '🛡️', mandatory: false, description: 'Comprehensive overseas travel and health insurance.' }
    ];
  }, [aiVisaData, selectedDestination, readinessPurpose]);

  const readinessMetrics = useMemo(() => {
    let recommendations: string[] = [];
    let redFlags: string[] = [];
    let filledCount = 0;

    const targetCountry = normalizeCountryName(selectedDestination);
    const hasVerifiedPassport = documents?.some(d => (d.label || d.name || '').toLowerCase().includes('passport')) ||
      Object.values(vaultChecklistState || {}).some(v => v.verified && (v.fileName || '').toLowerCase().includes('passport'));

    let passportScore = 0;
    let validityBonus = 0;

    if (hasVerifiedPassport) {
      filledCount += 2;
      passportScore += 25;
      validityBonus = 10;
      recommendations.unshift(`🌟 Exceptional Passport Validity: Active passport verified in your vault. Flawlessly compliant with ${targetCountry} consular 6-month rule.`);
    } else if (readinessPassportValidity.includes('> 12 Months')) {
      filledCount++;
      passportScore += 22;
      validityBonus = 5;
      recommendations.push(`Passport validity exceeds 12 months. Fully compliant with ${targetCountry} entry standards.`);
    } else if (readinessPassportValidity.includes('6 - 12 Months')) {
      filledCount++;
      passportScore += 15;
      validityBonus = 5;
      recommendations.push(`Passport validity meets minimum 6-month threshold for ${targetCountry}.`);
    } else if (readinessPassportValidity.includes('< 6 Months')) {
      filledCount++;
      redFlags.push(`Passport expires in under 6 months. Minimum 6-month validity required by ${targetCountry} consular rules.`);
    }

    const categoryName = readinessPurpose === 'study'
      ? 'Student Visa'
      : readinessPurpose === 'work'
      ? 'Work Visa'
      : 'Tourist Visa';

    let categoryPillars: Array<{ name: string; score: number; max: number; value: string }> = [];
    let categoryScoreRaw = 0;

    if (readinessPurpose === 'study') {
      let admissionScore = 0;
      let fundingScore = 0;
      let academicScore = 0;

      if (studentAdmissionStatus) {
        filledCount++;
        if (studentAdmissionStatus.includes('Confirmed')) {
          admissionScore = 25;
          recommendations.push(`✓ Confirmed institutional offer / CAS / I-20 recorded for ${targetCountry}.`);
        } else if (studentAdmissionStatus.includes('Conditional')) {
          admissionScore = 15;
          recommendations.push('Clear pending academic conditions to convert conditional offer into unconditional Form I-20 / CAS.');
        } else {
          admissionScore = 6;
          redFlags.push('Formal university admission letter / CAS is mandatory before embassy interview.');
        }
      }

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
          redFlags.push('Insufficient verified liquid funds. Additional sponsor documentation may be required.');
        }
      }

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
        { name: 'Passport & Identity', score: passportScore, max: 25, value: hasVerifiedPassport ? 'Verified in Vault' : (readinessPassportValidity || 'Not Selected') },
        { name: 'Institution Admission (I-20/CAS)', score: admissionScore, max: 25, value: studentAdmissionStatus || 'Not Selected' },
        { name: 'Tuition & Living Funds', score: fundingScore, max: 25, value: studyBudget || 'Not Selected' },
        { name: 'Language & Academic Intake', score: academicScore, max: 15, value: studentLanguageScore ? `${studentLanguageScore.slice(0, 16)}...` : 'Not Selected' }
      ];
    } else if (readinessPurpose === 'work') {
      let offerScore = 0;
      let expScore = 0;
      let assessScore = 0;

      if (workOffer) {
        filledCount++;
        if (workOffer.includes('Confirmed') || workOffer.includes('Approved')) {
          offerScore = 30;
          recommendations.push(`✓ Official employer sponsorship petition (CoS/LMIA) attached for ${targetCountry}.`);
        } else if (workOffer.includes('Interviewing')) {
          offerScore = 15;
          recommendations.push('Request formal sponsorship certificate once final employment interview is cleared.');
        } else {
          offerScore = 6;
          redFlags.push(`Consular work visas require an approved employer sponsorship petition from ${targetCountry}.`);
        }
      }

      if (workExp) {
        filledCount++;
        if (workExp.includes('8+')) expScore = 15;
        else if (workExp.includes('5 - 8')) expScore = 13;
        else if (workExp.includes('3 - 5')) expScore = 10;
        else expScore = 6;
      }

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

      if (workDomain) filledCount++;

      categoryScoreRaw = offerScore + expScore + assessScore;
      categoryPillars = [
        { name: 'Passport & Identity', score: passportScore, max: 25, value: hasVerifiedPassport ? 'Verified in Vault' : (readinessPassportValidity || 'Not Selected') },
        { name: 'Employer Sponsorship (CoS/LMIA)', score: offerScore, max: 30, value: workOffer || 'Not Selected' },
        { name: 'Work Experience', score: expScore, max: 15, value: workExp || 'Not Selected' },
        { name: 'Skill Assessment (ECA)', score: assessScore, max: 15, value: workAssess || 'Not Selected' }
      ];
    } else {
      let finScore = 0;
      let tiesScore = 0;
      let itinScore = 0;

      if (touristBankStability) {
        filledCount++;
        if (touristBankStability.includes('₹4L+')) {
          finScore = 25;
          recommendations.push('✓ Strong financial solvency: ₹4L+ liquid balance demonstrates trip affordability.');
        } else if (touristBankStability.includes('₹2L - ₹4L')) {
          finScore = 18;
          recommendations.push('Bank balance meets standard threshold; keep latest 6-month stamped statement ready.');
        } else {
          finScore = 8;
          redFlags.push('Bank balance below recommended threshold. Provide additional co-sponsor or financial proof.');
        }
      }

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

      if (tripDurationDays > 0 && tripDurationDays <= 90) {
        filledCount++;
        itinScore += 10;
        recommendations.push(`✓ Itinerary set: ${tripDurationDays}-day round-trip compliant with standard tourist limits.`);
      }

      if (visitPlanStatus) {
        filledCount++;
        if (visitPlanStatus.includes('Fixed')) {
          itinScore += 5;
        } else {
          itinScore += 3;
        }
      }

      if (visitStay) filledCount++;

      categoryScoreRaw = finScore + tiesScore + itinScore;
      categoryPillars = [
        { name: 'Passport & Identity', score: passportScore, max: 25, value: hasVerifiedPassport ? 'Verified in Vault' : (readinessPassportValidity || 'Not Selected') },
        { name: 'Financial Solvency', score: finScore, max: 25, value: touristBankStability || 'Not Selected' },
        { name: 'Home Country Ties', score: tiesScore, max: 20, value: touristHomeTies || 'Not Selected' },
        { name: 'Trip Itinerary & Dates', score: itinScore, max: 15, value: visitTiming ? `${tripDurationDays} Days (${visitTiming})` : 'Not Selected' }
      ];
    }

    const totalVaultCount = readinessDocChecklist.length;
    const verifiedVaultCount = readinessDocChecklist.filter(item => vaultChecklistState[item.key]?.verified).length;
    const docsRatio = totalVaultCount > 0 ? (verifiedVaultCount / totalVaultCount) : 0;
    const docsScore = Math.round(docsRatio * 35);

    if (docsRatio === 1) {
      recommendations.unshift(`🌟 100% of required ${targetCountry} embassy documents are verified and ready!`);
    } else if (docsRatio >= 0.5) {
      recommendations.push(`${verifiedVaultCount}/${totalVaultCount} checklist documents ready. Complete remaining to maximize score.`);
    }

    categoryPillars.push({
      name: 'Embassy Documents Checklist',
      score: docsScore,
      max: 35,
      value: verifiedVaultCount > 0 ? `${verifiedVaultCount} of ${totalVaultCount} Documents Ready` : 'No Documents Checked'
    });

    const isCategoryEmpty = readinessPurpose === 'study'
      ? (!studentAdmissionStatus && !studyBudget && !studentLanguageScore && !studyIntake && !studyQual && !studyTarget)
      : readinessPurpose === 'work'
      ? (!workOffer && !workExp && !workAssess && !workDomain)
      : (!touristBankStability && !touristHomeTies && !tripDurationDays && !visitPlanStatus && !visitStay);

    const hasAnyPassportInput = Boolean(hasVerifiedPassport || (readinessPassportValidity && readinessPassportValidity.trim() !== ''));

    if (isCategoryEmpty && !hasAnyPassportInput && verifiedVaultCount === 0) {
      return {
        score: 0,
        category: categoryName,
        statusText: 'VERIFICATION PENDING',
        badgeBg: 'bg-slate-100 text-slate-600 border border-slate-200',
        recommendations: [`Select your ${categoryName} criteria or check off required embassy documents below to calculate your official readiness score.`],
        redFlags: [],
        pillars: categoryPillars.map(p => ({ ...p, score: 0, value: p.value || 'Not Selected' })),
        hasVerifiedPassport: false,
        verifiedVaultCount: 0,
        totalVaultCount
      };
    }

    const rawTotal = passportScore + validityBonus + categoryScoreRaw + docsScore;
    const minBase = hasVerifiedPassport ? 65 : (filledCount > 0 || verifiedVaultCount > 0 ? 15 : 0);
    const finalScore = Math.max(minBase, Math.min(98, rawTotal));

    return {
      score: finalScore,
      category: categoryName,
      statusText: finalScore >= 85
        ? 'EXCEPTIONAL'
        : finalScore >= 70
        ? 'EXCELLENT'
        : finalScore >= 50
        ? 'GOOD'
        : 'FAIR',
      badgeBg: finalScore >= 85
        ? 'bg-[#D97706] text-white'
        : finalScore >= 70
        ? 'bg-emerald-600 text-white'
        : finalScore >= 50
        ? 'bg-blue-600 text-white'
        : 'bg-orange-500 text-white',
      recommendations,
      redFlags,
      pillars: categoryPillars,
      hasVerifiedPassport,
      verifiedVaultCount,
      totalVaultCount
    };
  }, [
    readinessPurpose,
    selectedDestination,
    documents,
    vaultChecklistState,
    readinessPassportValidity,
    readinessDocChecklist,
    studyQual, studyTarget, studyIntake, studyBudget, studentAdmissionStatus, studentLanguageScore,
    visitPlanStatus, visitTiming, tripDurationDays, visitStay, touristHomeTies, touristBankStability,
    workExp, workOffer, workDomain, workAssess
  ]);

  const comprehensiveAuditMetrics = useMemo(() => {
    let score = 0;
    const missingProofs: string[] = [];
    const criticalAlerts: string[] = [];
    const positiveHighlights: string[] = [];

    // 1. Passport Verification
    let passportScore = 0;
    let passportValidityStatus = "Not Entered";
    const hasBlankPages = auditPassportBlankPages === true;

    if (auditPassportExpiry) {
      const expDate = new Date(auditPassportExpiry);
      const refDate = auditFlightRetDate ? new Date(auditFlightRetDate) : new Date();
      const diffMonths = (expDate.getFullYear() - refDate.getFullYear()) * 12 + (expDate.getMonth() - refDate.getMonth());

      if (diffMonths >= 6) {
        passportScore += 6;
        passportValidityStatus = `Valid (>6 months past ${auditFlightRetDate ? 'return date' : 'travel'})`;
        positiveHighlights.push("Passport validity is fully compliant (>6 months past return date).");
      } else if (diffMonths >= 3) {
        passportScore += 4;
        passportValidityStatus = `Valid (>3 months, meets Schengen rule)`;
        positiveHighlights.push("Passport validity satisfies minimum Schengen statutory requirement (3 months).");
      } else if (diffMonths > 0) {
        passportScore += 1;
        passportValidityStatus = `Expiring soon (<3 months past return)`;
        criticalAlerts.push("Passport expires within 3 months of return date! Immediate renewal advised.");
      } else {
        passportValidityStatus = "Passport Expired";
        criticalAlerts.push("Passport expires before your planned return flight!");
      }
    } else {
      missingProofs.push("Passport Expiry Date");
    }

    if (hasBlankPages) {
      passportScore += 4;
      positiveHighlights.push("Minimum 2 consecutive blank visa pages available.");
    } else if (auditPassportBlankPages === false) {
      criticalAlerts.push("Insufficient blank visa pages. Consulates reject passports without at least 2 clear pages.");
    } else {
      missingProofs.push("Passport Blank Pages Confirmation");
    }
    score += passportScore;

    // 2. Financial Proof
    let finScore = 0;
    const balanceNum = parseFloat(auditFinancialBalance.replace(/[^0-9.]/g, '')) || 0;
    if (balanceNum >= 300000) {
      finScore += 7;
      positiveHighlights.push(`Robust liquid bank balance (₹${balanceNum.toLocaleString('en-IN')}) verified.`);
    } else if (balanceNum >= 150000) {
      finScore += 5;
      positiveHighlights.push(`Adequate funds (₹${balanceNum.toLocaleString('en-IN')}) for primary trip expenses.`);
    } else if (balanceNum > 0) {
      finScore += 2;
      criticalAlerts.push("Available balance may be below consulate comfort threshold. Min ₹2-3 Lakhs recommended.");
    } else {
      missingProofs.push("Available Bank Balance");
    }

    if (auditBankStatementType === 'stamped_6m') {
      finScore += 8;
      positiveHighlights.push("6-month officially stamped and signed bank statement ready.");
    } else if (auditBankStatementType === 'stamped_3m') {
      finScore += 6;
      positiveHighlights.push("3-month officially stamped bank statement ready.");
    } else if (auditBankStatementType === 'online_pdf') {
      finScore += 3;
      criticalAlerts.push("Online e-statement only. Embassies mandate original physical bank branch stamp & sign.");
    } else {
      missingProofs.push("Official Stamped Bank Statement");
    }
    score += finScore;

    // 3. Travel Medical Insurance
    let insScore = 0;
    let insDateStatus = "Not Entered";
    if (auditInsuranceFrom && auditInsuranceTill) {
      const insStart = new Date(auditInsuranceFrom);
      const insEnd = new Date(auditInsuranceTill);
      const fDept = auditFlightDeptDate ? new Date(auditFlightDeptDate) : null;
      const fRet = auditFlightRetDate ? new Date(auditFlightRetDate) : null;

      const isStartCovered = !fDept || insStart <= fDept;
      const isEndCovered = !fRet || insEnd >= fRet;

      if (isStartCovered && isEndCovered && insEnd >= insStart) {
        insScore += 5;
        const days = Math.round((insEnd.getTime() - insStart.getTime()) / (1000 * 3600 * 24)) + 1;
        insDateStatus = `Full Stay Covered (${days} Days)`;
        positiveHighlights.push(`Insurance policy covers full departure-to-return duration (${days} days).`);
      } else if (!isEndCovered) {
        insDateStatus = "Expires Before Return Flight";
        criticalAlerts.push("Travel insurance expires before your scheduled return flight! High refusal risk.");
      } else {
        insDateStatus = "Dates Mismatch";
        criticalAlerts.push("Insurance dates do not fully cover flight itinerary dates.");
      }
    } else {
      missingProofs.push("Travel Insurance Valid Dates");
    }

    if (auditInsuranceCoverage === 'schengen_30k_50k' || auditInsuranceCoverage === 'comprehensive_100k') {
      insScore += 5;
      positiveHighlights.push("Insurance meets mandatory international consular medical coverage (min €30,000 / $50,000).");
    } else if (auditInsuranceCoverage === 'basic_25k') {
      insScore += 2;
      criticalAlerts.push("Insurance coverage ($25,000) is below Schengen/OECD statutory requirement (€30,000).");
    } else {
      missingProofs.push("Compliant Insurance Medical Coverage (€30,000+)");
    }
    score += insScore;

    // 4. Income Proof & Occupational Ties
    let incomeScore = 0;
    if (auditEmploymentType === 'salaried') {
      if (auditSalariedPayslips === '3_6_months') {
        incomeScore += 5;
        positiveHighlights.push("Last 3-6 months official salary pay slips ready.");
      } else if (auditSalariedPayslips === '1_2_months') {
        incomeScore += 2;
        criticalAlerts.push("Only 1-2 months payslips available. Embassies typically demand 3-6 consecutive months.");
      } else {
        missingProofs.push("Salary Pay Slips (3-6 Months)");
      }

      if (auditSalariedForm16 === true) {
        incomeScore += 3;
        positiveHighlights.push("Form 16 / Certificate of Tax Deduction verified.");
      } else if (auditSalariedForm16 === false) {
        missingProofs.push("Form 16");
      }

      if (auditSalariedNoc === true) {
        incomeScore += 4;
        positiveHighlights.push("Employer NOC & Leave sanction letter on official company letterhead ready.");
      } else if (auditSalariedNoc === false) {
        criticalAlerts.push("No Employer NOC letter. Consulates require proof that leave is approved and job is retained.");
        missingProofs.push("Employer NOC / Leave Approval Letter");
      }

      if (auditSalariedItr === true) {
        incomeScore += 3;
        positiveHighlights.push("Income Tax Returns (ITR-V) for last 2-3 assessment years ready.");
      } else if (auditSalariedItr === false) {
        missingProofs.push("ITR Acknowledgements (Last 2-3 Years)");
      }
    } else {
      if (auditBusinessReg === true) {
        incomeScore += 8;
        positiveHighlights.push("Business registration documents (GST / Certificate of Incorporation / Trade License) verified.");
      } else if (auditBusinessReg === false) {
        criticalAlerts.push("Missing business registration documents. Self-employed applicants must prove legitimate registration.");
        missingProofs.push("Business Registration Proof (GST/Certificate)");
      }

      if (auditBusinessItr === true) {
        incomeScore += 7;
        positiveHighlights.push("Personal & Company ITR returns with computation of income verified.");
      } else if (auditBusinessItr === false) {
        missingProofs.push("Business & Personal ITR Returns");
      }
    }
    score += incomeScore;

    // 5. Return Ticket & Flight Transit
    let flightScore = 0;
    if (auditFlightDeptDate && auditFlightRetDate) {
      const d1 = new Date(auditFlightDeptDate);
      const d2 = new Date(auditFlightRetDate);
      if (d2 >= d1) {
        flightScore += 5;
        positiveHighlights.push(`Confirmed return flight dates verified (${auditFlightAirline || 'Commercial Airline'}).`);
      } else {
        criticalAlerts.push("Return flight date is before departure date!");
      }
    } else {
      missingProofs.push("Return Flight Booking Dates");
    }

    if (auditFlightHasLayover === false) {
      flightScore += 5;
      positiveHighlights.push("Direct flight without third-country transit requirements.");
    } else if (auditFlightHasLayover === true) {
      const city = (auditFlightLayoverCity || '').toLowerCase();
      if (city.includes('frankfurt') || city.includes('london') || city.includes('paris') || city.includes('amsterdam') || city.includes('doha')) {
        flightScore += 3;
        criticalAlerts.push(`Transit layover in ${auditFlightLayoverCity || 'layover hub'}: Check if Airport Transit Visa (ATV/DATV) is required.`);
      } else {
        flightScore += 5;
        positiveHighlights.push("Transit flight details noted.");
      }
    } else {
      missingProofs.push("Flight Layover & Transit Details");
    }
    score += flightScore;

    // 6. Accommodation Proof
    let accScore = 0;
    if (auditAccommodationType === 'hotel_confirmed') {
      accScore += 10;
      positiveHighlights.push("Confirmed hotel vouchers for full duration of stay ready.");
    } else if (auditAccommodationType === 'host_invitation') {
      accScore += 10;
      positiveHighlights.push("Host invitation letter with proof of residential address & passport copy ready.");
    } else if (auditAccommodationType === 'rental_lease') {
      accScore += 8;
      positiveHighlights.push("Valid lease or booked apartment reservation ready.");
    } else {
      missingProofs.push("Accommodation Proof (Hotel Voucher or Host Invitation)");
    }
    score += accScore;

    // 7. Sponsor Letter & Proof
    let sponsorScore = 0;
    if (auditSponsorshipType === 'self') {
      sponsorScore += 5;
      positiveHighlights.push("Self-funded travel backed by personal bank statement and income.");
    } else if (auditSponsorDocsReady === true) {
      sponsorScore += 5;
      positiveHighlights.push("Sponsor affidavit of financial support and sponsor bank statements ready.");
    } else {
      missingProofs.push("Sponsor Financial Proofs & Affidavit");
    }
    score += sponsorScore;

    // 8. Covering Letter & Detailed Itinerary
    let coverScore = 0;
    if (auditCoveringLetter === 'ready_signed') {
      coverScore += 10;
      positiveHighlights.push("Signed covering letter with detailed day-wise itinerary and travel purpose ready.");
    } else if (auditCoveringLetter === 'ai_drafted') {
      coverScore += 7;
      positiveHighlights.push("Covering letter drafted via AI, ready for final signature.");
    } else {
      missingProofs.push("Covering Letter & Day-wise Itinerary");
    }
    score += coverScore;

    // 9. Visa Application Form
    let formScore = 0;
    if (auditVisaFormFilled === true) {
      formScore += 5;
      positiveHighlights.push("Official consulate application form completely filled and verified.");
    } else {
      missingProofs.push("Official Visa Application Form");
    }
    score += formScore;

    // 10. Travel History
    let travelScore = 0;
    if (auditTravelHistory === 'strong_oecd') {
      travelScore += 5;
      positiveHighlights.push("Strong prior travel footprint (US/UK/Schengen/Canada/OECD stamps).");
    } else if (auditTravelHistory === 'regional') {
      travelScore += 3;
      positiveHighlights.push("Prior regional travel history (GCC/Southeast Asia) present.");
    } else if (auditTravelHistory === 'first_time') {
      travelScore += 2;
      positiveHighlights.push("Fresh passport application. Strong domestic ties required.");
    } else {
      missingProofs.push("Previous Travel History Selection");
    }
    score += travelScore;

    // 11. Refusal History
    let refusalScore = 0;
    if (auditPastRefusal === false) {
      refusalScore += 5;
      positiveHighlights.push("Clean consular immigration record with zero past refusals.");
    } else if (auditPastRefusal === true) {
      if (auditRefusalMitigation === true) {
        refusalScore += 3;
        positiveHighlights.push("Past refusal transparently disclosed with formal mitigation statement.");
      } else {
        refusalScore += 0;
        criticalAlerts.push("Past refusal disclosed without detailed justification letter. High risk of repeat refusal!");
        missingProofs.push("Refusal Justification & Mitigation Letter");
      }
    } else {
      missingProofs.push("Consular Refusal History Disclosure");
    }
    score += refusalScore;

    const isUnselected = score === 0 || (
      !auditPassportExpiry && auditPassportBlankPages === null &&
      !auditFinancialBalance && auditBankStatementType === 'none' &&
      !auditInsuranceFrom && auditInsuranceCoverage === 'none' &&
      !auditFlightDeptDate && auditAccommodationType === 'none' &&
      auditCoveringLetter === 'none' && auditVisaFormFilled === null
    );

    const finalScore = isUnselected ? 0 : Math.min(100, Math.max(0, score));

    return {
      score: finalScore,
      isUnselected,
      missingProofs,
      criticalAlerts,
      positiveHighlights,
      passportValidityStatus,
      insDateStatus,
      needsConsultant: !isUnselected && finalScore < 70,
      pillars: [
        { name: '1. Passport Validity & Blank Pages', score: passportScore, max: 10 },
        { name: '2. Financial Solvency & Bank Statement', score: finScore, max: 15 },
        { name: '3. Travel Medical Insurance', score: insScore, max: 10 },
        { name: '4. Income Proof & Occupational Ties', score: incomeScore, max: 15 },
        { name: '5. Return Flight & Transit Compliance', score: flightScore, max: 10 },
        { name: '6. Accommodation Proof', score: accScore, max: 10 },
        { name: '7. Sponsorship / Funding Proof', score: sponsorScore, max: 5 },
        { name: '8. Covering Letter & Day-wise Itinerary', score: coverScore, max: 10 },
        { name: '9. Visa Application Form', score: formScore, max: 5 },
        { name: '10. Previous Travel History', score: travelScore, max: 5 },
        { name: '11. Consular Refusal History & Mitigation', score: refusalScore, max: 5 },
      ]
    };
  }, [
    auditPassportExpiry, auditPassportBlankPages,
    auditFinancialBalance, auditBankStatementType,
    auditInsuranceFrom, auditInsuranceTill, auditInsuranceCoverage,
    auditEmploymentType, auditSalariedPayslips, auditSalariedForm16, auditSalariedNoc, auditSalariedItr,
    auditBusinessReg, auditBusinessItr,
    auditFlightDeptDate, auditFlightRetDate, auditFlightAirline, auditFlightHasLayover, auditFlightLayoverCity,
    auditAccommodationType, auditSponsorshipType, auditSponsorDocsReady,
    auditCoveringLetter, auditVisaFormFilled, auditTravelHistory,
    auditPastRefusal, auditRefusalMitigation
  ]);

  const toggleReadinessDoc = (docKey: string, docTitle: string) => {
    const targetDest = normalizeCountryName(selectedDestination);
    const storageKey = `vault_checklist_${targetDest}`.replace(/\s+/g, '_').toLowerCase();
    if (setVaultChecklistState) {
      setVaultChecklistState(prev => {
        const isCurrentlyVerified = !!prev[docKey]?.verified;
        const next = {
          ...prev,
          [docKey]: isCurrentlyVerified
            ? { ...prev[docKey], verified: false }
            : {
                ...prev[docKey],
                fileName: prev[docKey]?.fileName || `${docTitle}.pdf`,
                verified: true,
                uploadedAt: prev[docKey]?.uploadedAt || new Date().toLocaleDateString('en-GB')
              }
        };
        try {
          localStorage.setItem(storageKey, JSON.stringify(next));
        } catch(e) {}
        return next;
      });
    }
  };

  return {
    ieltsScore,
    setIeltsScore,
    hasIeltsScore,
    overallBand,
    handleUpdateIelts,
    readinessPurpose,
    setReadinessPurpose,
    readinessPassportValidity,
    setReadinessPassportValidity,
    aiVisaData,
    setAiVisaData,
    isLoadingAi,
    setIsLoadingAi,
    // Student states
    studyQual,
    setStudyQual,
    studyTarget,
    setStudyTarget,
    studyIntake,
    setStudyIntake,
    studyBudget,
    setStudyBudget,
    studentAdmissionStatus,
    setStudentAdmissionStatus,
    studentLanguageScore,
    setStudentLanguageScore,
    // Tourist states
    visitPlanStatus,
    setVisitPlanStatus,
    visitTiming,
    setVisitTiming,
    visitReturnDate,
    setVisitReturnDate,
    tripDurationDays,
    setTripDurationDays,
    visitStay,
    setVisitStay,
    touristHomeTies,
    setTouristHomeTies,
    touristBankStability,
    setTouristBankStability,
    // Work states
    workExp,
    setWorkExp,
    workOffer,
    setWorkOffer,
    workDomain,
    setWorkDomain,
    workAssess,
    setWorkAssess,
    // Audit states
    auditPassportExpiry,
    setAuditPassportExpiry,
    auditPassportBlankPages,
    setAuditPassportBlankPages,
    auditFinancialBalance,
    setAuditFinancialBalance,
    auditBankStatementType,
    setAuditBankStatementType,
    auditInsuranceFrom,
    setAuditInsuranceFrom,
    auditInsuranceTill,
    setAuditInsuranceTill,
    auditInsuranceCoverage,
    setAuditInsuranceCoverage,
    auditEmploymentType,
    setAuditEmploymentType,
    auditSalariedPayslips,
    setAuditSalariedPayslips,
    auditSalariedForm16,
    setAuditSalariedForm16,
    auditSalariedNoc,
    setAuditSalariedNoc,
    auditSalariedItr,
    setAuditSalariedItr,
    auditBusinessReg,
    setAuditBusinessReg,
    auditBusinessItr,
    setAuditBusinessItr,
    auditFlightDeptDate,
    setAuditFlightDeptDate,
    auditFlightRetDate,
    setAuditFlightRetDate,
    auditFlightAirline,
    setAuditFlightAirline,
    auditFlightHasLayover,
    setAuditFlightHasLayover,
    auditFlightLayoverCity,
    setAuditFlightLayoverCity,
    auditAccommodationType,
    setAuditAccommodationType,
    auditSponsorshipType,
    setAuditSponsorshipType,
    auditSponsorDocsReady,
    setAuditSponsorDocsReady,
    auditCoveringLetter,
    setAuditCoveringLetter,
    auditVisaFormFilled,
    setAuditVisaFormFilled,
    auditTravelHistory,
    setAuditTravelHistory,
    auditPastRefusal,
    setAuditPastRefusal,
    auditRefusalMitigation,
    setAuditRefusalMitigation,
    // Metrics & Handlers
    readinessDocChecklist,
    readinessMetrics,
    comprehensiveAuditMetrics,
    saveAuditField,
    toggleReadinessDoc
  };
}
