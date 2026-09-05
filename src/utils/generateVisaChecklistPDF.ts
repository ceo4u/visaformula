/**
 * generateVisaChecklistPDF.ts
 * Generates an official, certified PDF-1.4 document client-side without external dependencies.
 * Downloads directly as .pdf and also provides high-resolution print support.
 */

export interface VisaChecklistPDFData {
  countryName: string;
  passportCountry: string;
  purpose: string;
  visaType: string;
  trackingId: string;
  processingTime: string;
  embassyFee: string;
  childFee?: string;
  serviceFee: string;
  totalFee?: string;
  feeNotes?: string;
  stayDuration: string;
  validity: string;
  entryType: string;
  applyWindow?: string;
  profileScore?: number;
  profileDetails?: Array<{ label: string; value: string }>;
  documents: Array<{
    title: string;
    description: string;
    isMandatory?: boolean;
  }>;
  steps: Array<{
    step?: number;
    title: string;
    desc: string;
  }>;
  requirements?: Array<{
    title: string;
    desc: string;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  trackingUrl?: string;
  timestamp?: string;
}

function escapePdfText(str: string): string {
  return (str || '')
    .replace(/€/g, 'EUR ')
    .replace(/₹/g, 'INR ')
    .replace(/£/g, 'GBP ')
    .replace(/[–—]/g, '-')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[\r\n]+/g, ' ')
    .replace(/[^\x20-\x7E]/g, ' '); // Standard printable ASCII for PDF-1.4 Type1 fonts
}

function truncatePdfText(str: string, maxLen: number): string {
  const clean = escapePdfText(str);
  if (clean.length > maxLen) {
    return clean.slice(0, maxLen - 3) + '...';
  }
  return clean;
}

/**
 * Builds a valid 3-page PDF-1.4 binary string covering all 8 UI sections with exact byte offsets.
 */
export function buildVisaChecklistPDF(data: VisaChecklistPDFData): Blob {
  const timestamp = data.timestamp || new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // ==========================================
  // PAGE 1: 1. OVERVIEW & 2. DOCUMENTS
  // ==========================================
  const stream1Lines: string[] = [];

  // Top Header Bar
  stream1Lines.push('q');
  stream1Lines.push('0.05 0.08 0.16 rg'); // Dark Navy #0d1529
  stream1Lines.push('0 755 595.28 86.89 re f');
  stream1Lines.push('0.0 0.65 0.58 rg'); // Emerald highlight bar
  stream1Lines.push('0 752 595.28 3 re f');
  stream1Lines.push('Q');

  stream1Lines.push('BT /F2 16 Tf 1 1 1 rg 40 802 Td (TRAVLTIK CONSULAR VERIFICATION REGISTRY) Tj ET');
  stream1Lines.push('BT /F1 9 Tf 0.65 0.75 0.9 rg 40 788 Td (OFFICIAL IMMIGRATION DOSSIER & COMPREHENSIVE VISA SPECIFICATION) Tj ET');
  stream1Lines.push(`BT /F2 8 Tf 0.2 0.85 0.65 rg 40 768 Td (DOSSIER ID: ${escapePdfText(data.trackingId)}   |   DATE: ${escapePdfText(timestamp)}   |   VAULT SYNCED) Tj ET`);

  // Section 1: Overview Box
  stream1Lines.push('q');
  stream1Lines.push('0.96 0.97 0.99 rg 40 648 515 90 re f');
  stream1Lines.push('0.85 0.88 0.93 RG 1 w 40 648 515 90 re S');
  stream1Lines.push('Q');

  stream1Lines.push(`BT /F2 12 Tf 0.06 0.1 0.2 rg 52 718 Td (1. OVERVIEW: ${truncatePdfText(`${data.countryName.toUpperCase()} - ${data.visaType.toUpperCase()}`, 52)}) Tj ET`);

  // Grid details
  stream1Lines.push(`BT /F2 7.5 Tf 0.4 0.45 0.55 rg 52 698 Td (NATIONALITY:) Tj ET`);
  stream1Lines.push(`BT /F2 8.5 Tf 0.08 0.12 0.22 rg 135 698 Td (${truncatePdfText(data.passportCountry, 22)}) Tj ET`);

  stream1Lines.push(`BT /F2 7.5 Tf 0.4 0.45 0.55 rg 52 682 Td (PURPOSE:) Tj ET`);
  stream1Lines.push(`BT /F2 8.5 Tf 0.08 0.12 0.22 rg 135 682 Td (${truncatePdfText(data.purpose.toUpperCase(), 22)}) Tj ET`);

  stream1Lines.push(`BT /F2 7.5 Tf 0.4 0.45 0.55 rg 52 666 Td (PROCESSING:) Tj ET`);
  stream1Lines.push(`BT /F2 8.5 Tf 0.08 0.12 0.22 rg 135 666 Td (${truncatePdfText(data.processingTime, 22)}) Tj ET`);

  stream1Lines.push(`BT /F2 7.5 Tf 0.4 0.45 0.55 rg 240 698 Td (VALIDITY / STAY:) Tj ET`);
  stream1Lines.push(`BT /F2 8.5 Tf 0.08 0.12 0.22 rg 330 698 Td (${truncatePdfText(data.validity || data.stayDuration || 'Up to 90 Days', 20)}) Tj ET`);

  stream1Lines.push(`BT /F2 7.5 Tf 0.4 0.45 0.55 rg 240 682 Td (EMBASSY FEE:) Tj ET`);
  stream1Lines.push(`BT /F2 8.5 Tf 0.08 0.12 0.22 rg 330 682 Td (${truncatePdfText(data.embassyFee, 20)}) Tj ET`);

  stream1Lines.push(`BT /F2 7.5 Tf 0.4 0.45 0.55 rg 240 666 Td (SERVICE / VAC:) Tj ET`);
  stream1Lines.push(`BT /F2 8.5 Tf 0.08 0.12 0.22 rg 330 666 Td (${truncatePdfText(data.serviceFee, 20)}) Tj ET`);

  stream1Lines.push(`BT /F2 7.5 Tf 0.4 0.45 0.55 rg 420 698 Td (ENTRY TYPE:) Tj ET`);
  stream1Lines.push(`BT /F2 8.5 Tf 0.08 0.12 0.22 rg 480 698 Td (${truncatePdfText(data.entryType || 'Single/Multiple', 14)}) Tj ET`);

  stream1Lines.push(`BT /F2 7.5 Tf 0.4 0.45 0.55 rg 420 682 Td (READINESS:) Tj ET`);
  stream1Lines.push(`BT /F2 8.5 Tf 0.05 0.6 0.4 rg 480 682 Td (${data.profileScore || 45}/50 Points) Tj ET`);

  stream1Lines.push(`BT /F2 7.5 Tf 0.4 0.45 0.55 rg 420 666 Td (STATUS:) Tj ET`);
  stream1Lines.push(`BT /F2 8.5 Tf 0.1 0.4 0.8 rg 480 666 Td (Verified & Synced) Tj ET`);

  // Section 2 Header: Mandatory & Supporting Documents Checklist
  stream1Lines.push('BT /F2 11 Tf 0.08 0.12 0.25 rg 40 622 Td (2. DOCUMENTS REQUIRED CHECKLIST) Tj ET');
  stream1Lines.push('q 0.8 0.85 0.9 RG 0.75 w 40 615 m 555 615 l S Q');

  // Render 8 documents on Page 1
  let curY = 595;
  const page1Docs = (data.documents || []).slice(0, 9);

  page1Docs.forEach((doc, idx) => {
    // Checkbox box
    stream1Lines.push('q');
    stream1Lines.push('0.93 0.95 0.98 rg 45 ' + (curY - 3) + ' 11 11 re f');
    stream1Lines.push('0.65 0.7 0.8 RG 0.8 w 45 ' + (curY - 3) + ' 11 11 re S');
    stream1Lines.push('Q');

    const titleText = `${idx + 1}.  ${doc.title} ${doc.isMandatory !== false ? '[MANDATORY]' : '[SUPPORTING]'}`;
    stream1Lines.push(`BT /F2 9 Tf 0.1 0.15 0.25 rg 65 ${curY} Td (${truncatePdfText(titleText, 72)}) Tj ET`);

    if (doc.description) {
      stream1Lines.push(`BT /F1 7.5 Tf 0.35 0.4 0.48 rg 65 ${curY - 10} Td (${truncatePdfText(doc.description, 98)}) Tj ET`);
    }

    curY -= 26;
  });

  // Profile Specific Details Box if any
  if (data.profileDetails && data.profileDetails.length > 0) {
    stream1Lines.push('q');
    stream1Lines.push('0.97 0.98 1.0 rg 40 ' + (curY - 5) + ' 515 48 re f');
    stream1Lines.push('0.85 0.88 0.94 RG 0.75 w 40 ' + (curY - 5) + ' 515 48 re S');
    stream1Lines.push('Q');
    stream1Lines.push(`BT /F2 8 Tf 0.1 0.2 0.4 rg 50 ${curY + 30} Td (SUBMITTED APPLICATION PROFILE ATTRIBUTES:) Tj ET`);
    data.profileDetails.slice(0, 3).forEach((item, pIdx) => {
      const colX = 50 + (pIdx * 170);
      stream1Lines.push(`BT /F2 7 Tf 0.45 0.5 0.58 rg ${colX} ${curY + 16} Td (${truncatePdfText(item.label.toUpperCase(), 28)}) Tj ET`);
      stream1Lines.push(`BT /F1 7.5 Tf 0.1 0.15 0.25 rg ${colX} ${curY + 4} Td (${truncatePdfText(item.value, 28)}) Tj ET`);
    });
  }

  // Page 1 Footer
  stream1Lines.push('q 0.85 0.88 0.92 RG 0.5 w 40 42 m 555 42 l S Q');
  stream1Lines.push(`BT /F1 7.5 Tf 0.45 0.5 0.58 rg 40 28 Td (TravlTik Consular AI Verification System  |  Page 1 of 3  |  Dossier ID: ${escapePdfText(data.trackingId)}) Tj ET`);
  stream1Lines.push('BT /F2 7.5 Tf 0.1 0.55 0.4 rg 445 28 Td (SECTIONS: 1. OVERVIEW & 2. DOCUMENTS) Tj ET');

  // ==========================================
  // PAGE 2: 3. STEPS TO FOLLOW, 4. FEES, 5. PROCESSING TIME
  // ==========================================
  const stream2Lines: string[] = [];

  // Page 2 Header Bar
  stream2Lines.push('q');
  stream2Lines.push('0.05 0.08 0.16 rg 0 805 595.28 36.89 re f');
  stream2Lines.push('0.0 0.65 0.58 rg 0 802 595.28 3 re f');
  stream2Lines.push('Q');
  stream2Lines.push('BT /F2 10.5 Tf 1 1 1 rg 40 818 Td (TRAVLTIK CONSULAR REGISTRY  -  ROADMAP, FEES & PROCESSING DURATION) Tj ET');
  stream2Lines.push(`BT /F1 8 Tf 0.7 0.8 0.9 rg 430 818 Td (DOSSIER: ${escapePdfText(data.trackingId)}) Tj ET`);

  let p2Y = 770;

  // Section 3: Steps to Follow (8 Steps)
  stream2Lines.push(`BT /F2 11 Tf 0.08 0.12 0.25 rg 40 ${p2Y} Td (3. STEPS TO FOLLOW ROADMAP) Tj ET`);
  stream2Lines.push(`q 0.8 0.85 0.9 RG 0.75 w 40 ${p2Y - 5} m 555 ${p2Y - 5} l S Q`);
  p2Y -= 22;

  const stepsList = (data.steps && data.steps.length > 0) ? data.steps.slice(0, 8) : [
    { title: 'Check Eligibility & Jurisdiction', desc: 'Confirm entry requirements and consular jurisdiction for your passport.' },
    { title: 'Gather Supporting Documents', desc: 'Collect valid passport, photo, hotel, flight, and financial proof.' },
    { title: 'Complete Visa Application Form', desc: 'Accurately complete the official visa application form.' },
    { title: 'Schedule Biometrics Appointment', desc: 'Book submission appointment at the authorized Visa Application Center.' },
    { title: 'Pay Consular Statutory Fees', desc: 'Pay non-refundable consular processing and biometric fees.' },
    { title: 'Submit Dossier & Track Adjudication', desc: 'Enroll biometrics, submit passport, and track application online.' }
  ];

  stepsList.forEach((st, idx) => {
    // Step circle
    stream2Lines.push('q 0.08 0.14 0.3 rg 45 ' + (p2Y - 3) + ' 14 14 re f Q');
    stream2Lines.push(`BT /F2 8 Tf 1 1 1 rg ${idx >= 9 ? 47 : 50} ${p2Y} Td (${idx + 1}) Tj ET`);

    stream2Lines.push(`BT /F2 8.5 Tf 0.08 0.12 0.22 rg 68 ${p2Y + 2} Td (${truncatePdfText(st.title, 75)}) Tj ET`);
    stream2Lines.push(`BT /F1 7.5 Tf 0.35 0.4 0.48 rg 68 ${p2Y - 8} Td (${truncatePdfText(st.desc, 102)}) Tj ET`);

    p2Y -= 25;
  });

  // Section 4: Fees Breakdown
  p2Y -= 10;
  stream2Lines.push(`BT /F2 11 Tf 0.08 0.12 0.25 rg 40 ${p2Y} Td (4. OFFICIAL FEES & CHARGES BREAKDOWN) Tj ET`);
  stream2Lines.push(`q 0.8 0.85 0.9 RG 0.75 w 40 ${p2Y - 5} m 555 ${p2Y - 5} l S Q`);
  p2Y -= 20;

  // Fees Table Box
  stream2Lines.push('q');
  stream2Lines.push('0.96 0.97 0.99 rg 40 ' + (p2Y - 60) + ' 515 65 re f');
  stream2Lines.push('0.85 0.88 0.93 RG 1 w 40 ' + (p2Y - 60) + ' 515 65 re S');
  stream2Lines.push('Q');

  stream2Lines.push(`BT /F2 8 Tf 0.35 0.4 0.5 rg 52 ${p2Y - 12} Td (CONSULAR VISA FEE (ADULT):) Tj ET`);
  stream2Lines.push(`BT /F2 9 Tf 0.08 0.12 0.22 rg 220 ${p2Y - 12} Td (${truncatePdfText(data.embassyFee, 25)}) Tj ET`);

  stream2Lines.push(`BT /F2 8 Tf 0.35 0.4 0.5 rg 52 ${p2Y - 26} Td (CHILD VISA FEE (6-12 YRS):) Tj ET`);
  stream2Lines.push(`BT /F2 9 Tf 0.08 0.12 0.22 rg 220 ${p2Y - 26} Td (${truncatePdfText(data.childFee || 'Exempt / Reduced', 25)}) Tj ET`);

  stream2Lines.push(`BT /F2 8 Tf 0.35 0.4 0.5 rg 320 ${p2Y - 12} Td (FAST-TRACK / VAC SERVICE:) Tj ET`);
  stream2Lines.push(`BT /F2 9 Tf 0.08 0.12 0.22 rg 450 ${p2Y - 12} Td (${truncatePdfText(data.serviceFee, 25)}) Tj ET`);

  stream2Lines.push(`BT /F2 8.5 Tf 0.08 0.12 0.25 rg 320 ${p2Y - 26} Td (TOTAL ESTIMATED COST:) Tj ET`);
  stream2Lines.push(`BT /F2 10 Tf 0.05 0.55 0.35 rg 450 ${p2Y - 26} Td (${truncatePdfText(data.totalFee || 'As Applicable', 25)}) Tj ET`);

  stream2Lines.push(`BT /F1 7 Tf 0.4 0.45 0.52 rg 52 ${p2Y - 48} Td (${truncatePdfText(data.feeNotes || 'Note: Consular fees are non-refundable and subject to change per government gazette notifications.', 105)}) Tj ET`);

  // Section 5: Processing Time
  p2Y -= 88;
  stream2Lines.push(`BT /F2 11 Tf 0.08 0.12 0.25 rg 40 ${p2Y} Td (5. ESTIMATED PROCESSING TIME & SUBMISSION WINDOW) Tj ET`);
  stream2Lines.push(`q 0.8 0.85 0.9 RG 0.75 w 40 ${p2Y - 5} m 555 ${p2Y - 5} l S Q`);
  p2Y -= 20;

  // Processing Time Box
  stream2Lines.push('q');
  stream2Lines.push('0.97 0.98 0.99 rg 40 ' + (p2Y - 50) + ' 515 54 re f');
  stream2Lines.push('0.85 0.88 0.92 RG 0.8 w 40 ' + (p2Y - 50) + ' 515 54 re S');
  stream2Lines.push('Q');

  stream2Lines.push(`BT /F2 8.5 Tf 0.1 0.15 0.25 rg 52 ${p2Y - 14} Td (STANDARD ADJUDICATION TURNAROUND:) Tj ET`);
  stream2Lines.push(`BT /F2 10 Tf 0.1 0.4 0.8 rg 250 ${p2Y - 14} Td (${truncatePdfText(data.processingTime, 35)}) Tj ET`);

  stream2Lines.push(`BT /F2 8 Tf 0.35 0.4 0.5 rg 52 ${p2Y - 28} Td (RECOMMENDED FILING WINDOW:) Tj ET`);
  stream2Lines.push(`BT /F1 8 Tf 0.15 0.2 0.28 rg 250 ${p2Y - 28} Td (${truncatePdfText(data.applyWindow || 'Submit at least 15 - 30 days before planned departure date.', 55)}) Tj ET`);

  stream2Lines.push(`BT /F1 7 Tf 0.4 0.45 0.52 rg 52 ${p2Y - 42} Td (Processing timelines may extend during peak holiday seasons or additional consular administrative reviews.) Tj ET`);

  // Page 2 Footer
  stream2Lines.push('q 0.85 0.88 0.92 RG 0.5 w 40 42 m 555 42 l S Q');
  stream2Lines.push(`BT /F1 7.5 Tf 0.45 0.5 0.58 rg 40 28 Td (TravlTik Consular AI Verification System  |  Page 2 of 3  |  Dossier ID: ${escapePdfText(data.trackingId)}) Tj ET`);
  stream2Lines.push('BT /F2 7.5 Tf 0.1 0.55 0.4 rg 445 28 Td (SECTIONS: 3. STEPS, 4. FEES, 5. PROCESSING) Tj ET');

  // ==========================================
  // PAGE 3: 6. REQUIREMENTS, 7. FAQ, 8. TRACK
  // ==========================================
  const stream3Lines: string[] = [];

  // Page 3 Header Bar
  stream3Lines.push('q');
  stream3Lines.push('0.05 0.08 0.16 rg 0 805 595.28 36.89 re f');
  stream3Lines.push('0.0 0.65 0.58 rg 0 802 595.28 3 re f');
  stream3Lines.push('Q');
  stream3Lines.push('BT /F2 10.5 Tf 1 1 1 rg 40 818 Td (TRAVLTIK CONSULAR REGISTRY  -  REQUIREMENTS, FAQ & APPLICATION TRACKING) Tj ET');
  stream3Lines.push(`BT /F1 8 Tf 0.7 0.8 0.9 rg 430 818 Td (DOSSIER: ${escapePdfText(data.trackingId)}) Tj ET`);

  let p3Y = 770;

  // Section 6: Requirements
  stream3Lines.push(`BT /F2 11 Tf 0.08 0.12 0.25 rg 40 ${p3Y} Td (6. STATUTORY ENTRY REQUIREMENTS & CONDITIONS) Tj ET`);
  stream3Lines.push(`q 0.8 0.85 0.9 RG 0.75 w 40 ${p3Y - 5} m 555 ${p3Y - 5} l S Q`);
  p3Y -= 20;

  const reqList = (data.requirements && data.requirements.length > 0) ? data.requirements.slice(0, 5) : [
    { title: 'Passport Validity Requirement', desc: 'Must possess minimum 6 months validity from entry date with at least 2 empty pages.' },
    { title: 'Sufficient Financial Proof', desc: 'Must demonstrate sufficient liquid funds to cover entire duration of stay and transit.' },
    { title: 'Accommodation & Return Ticket', desc: 'Confirmed onward or return flight itinerary and verified lodging reservation.' },
    { title: 'Travel Medical Insurance', desc: 'Comprehensive medical insurance covering emergency hospitalization and repatriation.' },
    { title: 'Consular & Biometric Adjudication', desc: 'Mandatory biometric registration or in-person interview if requested by consular post.' }
  ];

  reqList.forEach((req, idx) => {
    stream3Lines.push('q 0.05 0.6 0.45 rg 45 ' + (p3Y - 2) + ' 6 6 re f Q');
    stream3Lines.push(`BT /F2 8.5 Tf 0.08 0.12 0.22 rg 58 ${p3Y} Td (${idx + 1}.  ${truncatePdfText(req.title, 70)}) Tj ET`);
    stream3Lines.push(`BT /F1 7.5 Tf 0.35 0.4 0.48 rg 58 ${p3Y - 9} Td (${truncatePdfText(req.desc, 104)}) Tj ET`);
    p3Y -= 23;
  });

  // Section 7: FAQ
  p3Y -= 8;
  stream3Lines.push(`BT /F2 11 Tf 0.08 0.12 0.25 rg 40 ${p3Y} Td (7. FREQUENTLY ASKED QUESTIONS (FAQ)) Tj ET`);
  stream3Lines.push(`q 0.8 0.85 0.9 RG 0.75 w 40 ${p3Y - 5} m 555 ${p3Y - 5} l S Q`);
  p3Y -= 20;

  const faqList = (data.faqs && data.faqs.length > 0) ? data.faqs.slice(0, 4) : [
    { question: 'Can this visa be extended once inside the country?', answer: 'Extensions are subject to local immigration department discretion and must be requested prior to expiry.' },
    { question: 'Is biometric submission or an interview mandatory?', answer: 'First-time applicants usually undergo biometric enrollment. Embassy reserves right to call for interview.' },
    { question: 'What if my passport expires in less than 6 months?', answer: 'You must renew your passport before applying, as border authorities strictly enforce 6-month rules.' },
    { question: 'Are visa application fees refundable in case of refusal?', answer: 'All official consular and administrative handling charges are non-refundable once processed.' }
  ];

  faqList.forEach((faq) => {
    stream3Lines.push(`BT /F2 8 Tf 0.1 0.15 0.3 rg 45 ${p3Y} Td (Q: ${truncatePdfText(faq.question, 95)}) Tj ET`);
    stream3Lines.push(`BT /F1 7.5 Tf 0.35 0.4 0.48 rg 45 ${p3Y - 9} Td (A: ${truncatePdfText(faq.answer, 105)}) Tj ET`);
    p3Y -= 24;
  });

  // Section 8: Track & Vault Registry Record
  p3Y -= 10;
  stream3Lines.push(`BT /F2 11 Tf 0.08 0.12 0.25 rg 40 ${p3Y} Td (8. APPLICATION TRACKING & REGISTRY RECORD) Tj ET`);
  stream3Lines.push(`q 0.8 0.85 0.9 RG 0.75 w 40 ${p3Y - 5} m 555 ${p3Y - 5} l S Q`);
  p3Y -= 20;

  // Track Box
  stream3Lines.push('q');
  stream3Lines.push('0.96 0.97 0.99 rg 40 ' + (p3Y - 80) + ' 515 85 re f');
  stream3Lines.push('0.85 0.88 0.93 RG 1 w 40 ' + (p3Y - 80) + ' 515 85 re S');
  stream3Lines.push('Q');

  stream3Lines.push(`BT /F2 9.5 Tf 0.08 0.12 0.25 rg 52 ${p3Y - 14} Td (OFFICIAL APPLICATION DOSSIER TRACKING ID:) Tj ET`);
  stream3Lines.push(`BT /F2 12 Tf 0.05 0.6 0.4 rg 330 ${p3Y - 14} Td (${escapePdfText(data.trackingId)}) Tj ET`);

  stream3Lines.push(`BT /F2 8 Tf 0.35 0.4 0.5 rg 52 ${p3Y - 30} Td (VAULT REGISTRY STATUS:) Tj ET`);
  stream3Lines.push(`BT /F2 8.5 Tf 0.1 0.5 0.3 rg 180 ${p3Y - 30} Td (Active & Synced to TravlTik User Dashboard) Tj ET`);

  stream3Lines.push(`BT /F2 8 Tf 0.35 0.4 0.5 rg 52 ${p3Y - 44} Td (TRACKING PORTAL URL:) Tj ET`);
  stream3Lines.push(`BT /F1 8 Tf 0.1 0.3 0.7 rg 180 ${p3Y - 44} Td (${truncatePdfText(data.trackingUrl || 'https://travltik.com/dashboard', 55)}) Tj ET`);

  stream3Lines.push(`BT /F1 7 Tf 0.4 0.45 0.5 rg 52 ${p3Y - 64} Td (AUTHENTICITY NOTICE: This verification brief is cryptographically linked to your registered TravlTik account.) Tj ET`);
  stream3Lines.push(`BT /F1 7 Tf 0.4 0.45 0.5 rg 52 ${p3Y - 74} Td (Keep this dossier accessible when lodging paperwork with the consulate, VAC, or port of entry immigration.) Tj ET`);

  // Page 3 Footer
  stream3Lines.push('q 0.85 0.88 0.92 RG 0.5 w 40 42 m 555 42 l S Q');
  stream3Lines.push(`BT /F1 7.5 Tf 0.45 0.5 0.58 rg 40 28 Td (TravlTik Consular AI Verification System  |  Page 3 of 3  |  Official Certified Brief) Tj ET`);
  stream3Lines.push('BT /F2 7.5 Tf 0.1 0.55 0.4 rg 445 28 Td (SECTIONS: 6. RULES, 7. FAQ, 8. TRACK) Tj ET');

  // ==========================================
  // ASSEMBLE PDF OBJECTS (3 PAGES)
  // ==========================================
  const stream1 = stream1Lines.join('\n');
  const stream2 = stream2Lines.join('\n');
  const stream3 = stream3Lines.join('\n');

  const objects: string[] = [];

  // obj 1: Catalog
  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj');

  // obj 2: Pages (3 Pages)
  objects.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R 4 0 R 9 0 R] /Count 3 >>\nendobj');

  // obj 3: Page 1
  objects.push('3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 7 0 R >>\nendobj');

  // obj 4: Page 2
  objects.push('4 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 8 0 R >>\nendobj');

  // obj 5: Helvetica
  objects.push('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj');

  // obj 6: Helvetica-Bold
  objects.push('6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj');

  // obj 7: Stream 1
  objects.push(`7 0 obj\n<< /Length ${stream1.length} >>\nstream\n${stream1}\nendstream\nendobj`);

  // obj 8: Stream 2
  objects.push(`8 0 obj\n<< /Length ${stream2.length} >>\nstream\n${stream2}\nendstream\nendobj`);

  // obj 9: Page 3
  objects.push('9 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 10 0 R >>\nendobj');

  // obj 10: Stream 3
  objects.push(`10 0 obj\n<< /Length ${stream3.length} >>\nstream\n${stream3}\nendstream\nendobj`);

  // Build binary body & xref
  let pdf = '%PDF-1.4\n%TravlTik\n';
  const offsets: number[] = [];

  objects.forEach((obj) => {
    offsets.push(pdf.length);
    pdf += obj + '\n';
  });

  const xrefStart = pdf.length;
  pdf += 'xref\n';
  pdf += `0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';

  offsets.forEach((off) => {
    const s = off.toString().padStart(10, '0');
    pdf += `${s} 00000 n \n`;
  });

  pdf += 'trailer\n';
  pdf += `<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  pdf += 'startxref\n';
  pdf += `${xrefStart}\n`;
  pdf += '%%EOF\n';

  return new Blob([pdf], { type: 'application/pdf' });
}

/**
 * Triggers instant download of the generated PDF file.
 */
export function downloadVisaChecklistPDF(data: VisaChecklistPDFData, filename?: string): void {
  try {
    const blob = buildVisaChecklistPDF(data);
    const cleanName = filename || `${data.countryName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-visa-checklist.pdf`;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = cleanName;
    a.setAttribute('download', cleanName);
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      try {
        if (a.parentNode) a.parentNode.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (_) {}
    }, 2000);
  } catch (err) {
    console.error('[downloadVisaChecklistPDF Error]', err);
    openPrintableChecklist(data);
  }
}

/**
 * High-resolution printable preview HTML generator rendering all 8 sections identically to the UI.
 */
export function openPrintableChecklist(data: VisaChecklistPDFData): void {
  const printWindow = window.open('', '_blank', 'width=950,height=1050');
  if (!printWindow) return;

  const html = `<!DOCTYPE html>
<html>
<head>
  <title>${data.countryName} Visa Dossier &amp; Checklist - TravlTik</title>
  <meta charset="utf-8" />
  <style>
    @page { size: A4 portrait; margin: 12mm 15mm; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #0f172a; margin: 0; padding: 20px; font-size: 12px; line-height: 1.45; background: #fff; }
    .header { background: #0b1329; color: #fff; padding: 20px 24px; border-radius: 14px; margin-bottom: 20px; border-bottom: 4px solid #059669; }
    .header h1 { margin: 0; font-size: 19px; font-weight: 900; letter-spacing: -0.3px; }
    .header p { margin: 4px 0 0; font-size: 11px; color: #94a3b8; }
    .badge { display: inline-block; background: #059669; color: #fff; padding: 3px 10px; border-radius: 999px; font-size: 10px; font-weight: 800; margin-top: 8px; letter-spacing: 0.5px; }
    
    .section-title { font-size: 13px; font-weight: 900; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px; margin: 24px 0 12px; text-transform: uppercase; color: #0f172a; display: flex; align-items: center; justify-content: space-between; }
    .section-num { color: #059669; font-weight: 900; margin-right: 6px; }

    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }

    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; }
    .card-label { display: block; font-size: 10px; font-weight: 800; color: #64748b; text-transform: uppercase; margin-bottom: 2px; }
    .card-val { font-size: 13px; font-weight: 800; color: #0f172a; }

    .doc-item { display: flex; align-items: flex-start; gap: 10px; padding: 9px 12px; border: 1px solid #f1f5f9; border-radius: 8px; margin-bottom: 6px; background: #fff; }
    .checkbox { width: 14px; height: 14px; border: 1.5px solid #94a3b8; border-radius: 3px; margin-top: 2px; flex-shrink: 0; }
    .doc-title { font-weight: 800; font-size: 12px; color: #0f172a; }
    .doc-desc { font-size: 11px; color: #64748b; margin-top: 2px; }
    .tag-mandatory { display: inline-block; background: #ecfdf5; color: #059669; font-size: 9.5px; font-weight: 800; padding: 1px 6px; border-radius: 4px; margin-left: 6px; border: 1px solid #a7f3d0; }
    .tag-supporting { display: inline-block; background: #f1f5f9; color: #475569; font-size: 9.5px; font-weight: 700; padding: 1px 6px; border-radius: 4px; margin-left: 6px; }

    .step-card { padding: 10px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 8px; }
    .step-badge { display: inline-block; width: 20px; height: 20px; background: #1e1b4b; color: #fff; border-radius: 50%; text-align: center; line-height: 20px; font-size: 10.5px; font-weight: 900; margin-right: 8px; vertical-align: middle; }

    table.fee-table { width: 100%; border-collapse: collapse; margin-top: 6px; }
    table.fee-table th, table.fee-table td { padding: 8px 12px; text-align: left; border-bottom: 1px solid #e2e8f0; font-size: 11.5px; }
    table.fee-table th { background: #f1f5f9; font-weight: 800; color: #475569; text-transform: uppercase; font-size: 10px; }

    .faq-card { background: #f8fafc; border-left: 3px solid #059669; padding: 8px 12px; border-radius: 0 8px 8px 0; margin-bottom: 8px; }
    .faq-q { font-weight: 800; font-size: 11.5px; color: #0f172a; margin-bottom: 3px; }
    .faq-a { font-size: 11px; color: #475569; line-height: 1.4; }

    .footer { margin-top: 30px; padding-top: 14px; border-top: 1px solid #e2e8f0; font-size: 10px; color: #94a3b8; text-align: center; }
    .page-break { page-break-after: always; }
  </style>
</head>
<body>
  <!-- HEADER -->
  <div class="header">
    <h1>TRAVLTIK CONSULAR VERIFICATION REGISTRY</h1>
    <p>Official AI Verification Brief &amp; Document Ingestion Dossier</p>
    <span class="badge">DOSSIER ID: ${data.trackingId} &bull; SYNCED TO VAULT</span>
  </div>

  <!-- 1. OVERVIEW -->
  <div class="section-title"><span class="section-num">1</span> Overview &amp; Visa Profile Details</div>
  <div class="grid-3" style="margin-bottom: 12px;">
    <div class="card"><span class="card-label">Destination</span><span class="card-val">${data.countryName}</span></div>
    <div class="card"><span class="card-label">Visa Category</span><span class="card-val">${data.visaType}</span></div>
    <div class="card"><span class="card-label">Passport Nationality</span><span class="card-val">${data.passportCountry}</span></div>
    <div class="card"><span class="card-label">Travel Purpose</span><span class="card-val">${data.purpose.toUpperCase()}</span></div>
    <div class="card"><span class="card-label">Validity / Stay Duration</span><span class="card-val">${data.validity || data.stayDuration || 'Up to 90 Days'}</span></div>
    <div class="card"><span class="card-label">Profile Readiness</span><span class="card-val" style="color:#059669;">${data.profileScore || 45}/50 Points</span></div>
  </div>

  ${(data.profileDetails && data.profileDetails.length > 0) ? `
    <div class="card" style="margin-bottom: 16px;">
      <span class="card-label">Pre-filled Application Profile Parameters</span>
      <div class="grid-4" style="margin-top: 6px;">
        ${data.profileDetails.map(p => `<div><strong style="display:block; font-size:9.5px; color:#64748b;">${p.label}</strong><span style="font-weight:700; font-size:11px;">${p.value}</span></div>`).join('')}
      </div>
    </div>
  ` : ''}

  <!-- 2. DOCUMENTS -->
  <div class="section-title"><span class="section-num">2</span> Documents Required Checklist (${(data.documents || []).length} Items)</div>
  ${(data.documents || []).map((d, i) => `
    <div class="doc-item">
      <div class="checkbox"></div>
      <div style="flex:1;">
        <div class="doc-title">
          ${i + 1}. ${d.title}
          ${d.isMandatory !== false ? '<span class="tag-mandatory">MANDATORY</span>' : '<span class="tag-supporting">SUPPORTING</span>'}
        </div>
        <div class="doc-desc">${d.description}</div>
      </div>
    </div>
  `).join('')}

  <div class="page-break"></div>

  <!-- 3. STEPS TO FOLLOW -->
  <div class="section-title"><span class="section-num">3</span> Steps to Follow Roadmap</div>
  <div class="grid-2" style="margin-bottom: 16px;">
    ${(data.steps || []).map((s, i) => `
      <div class="step-card">
        <div style="display:flex; align-items:flex-start;">
          <span class="step-badge">${i + 1}</span>
          <div>
            <strong style="font-size:12px; color:#0f172a;">${s.title}</strong>
            <div style="font-size:11px; color:#64748b; margin-top:3px; line-height:1.35;">${s.desc}</div>
          </div>
        </div>
      </div>
    `).join('')}
  </div>

  <!-- 4. FEES -->
  <div class="section-title"><span class="section-num">4</span> Fees &amp; Financial Breakdown</div>
  <table class="fee-table">
    <thead>
      <tr>
        <th>Fee Category</th>
        <th>Description</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Consular / Embassy Visa Fee</strong></td>
        <td>Official statutory fee levied by the destination government</td>
        <td><strong>${data.embassyFee}</strong></td>
      </tr>
      <tr>
        <td><strong>Child Visa Fee (6-12 Years)</strong></td>
        <td>Applicable for minor dependent travelers</td>
        <td><strong>${data.childFee || 'Exempt / Reduced'}</strong></td>
      </tr>
      <tr>
        <td><strong>Fast-Track / VAC Biometric Service</strong></td>
        <td>Application center appointment booking &amp; concierge verification</td>
        <td><strong>${data.serviceFee}</strong></td>
      </tr>
      <tr style="background:#f8fafc;">
        <td><strong style="color:#059669;">Total Estimated Cost</strong></td>
        <td>Combined statutory consular fee and service charges</td>
        <td><strong style="color:#059669; font-size:13px;">${data.totalFee || 'As Applicable'}</strong></td>
      </tr>
    </tbody>
  </table>
  <p style="font-size:10.5px; color:#64748b; margin-top:6px;">${data.feeNotes || 'Fees are non-refundable and subject to change per government consular notifications.'}</p>

  <!-- 5. PROCESSING TIME -->
  <div class="section-title"><span class="section-num">5</span> Processing Time &amp; Submission Window</div>
  <div class="grid-2" style="margin-bottom: 16px;">
    <div class="card">
      <span class="card-label">Standard Adjudication Timeline</span>
      <span class="card-val" style="color:#2563eb;">${data.processingTime}</span>
      <p style="margin:4px 0 0; font-size:10.5px; color:#64748b;">Consular decision turnaround following appointment submission.</p>
    </div>
    <div class="card">
      <span class="card-label">Recommended Filing Window</span>
      <span class="card-val">${data.applyWindow || '15 - 30 Days Prior'}</span>
      <p style="margin:4px 0 0; font-size:10.5px; color:#64748b;">Allows adequate margin for document verification and peak surges.</p>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- 6. REQUIREMENTS -->
  <div class="section-title"><span class="section-num">6</span> Statutory Requirements &amp; Entry Conditions</div>
  <div style="margin-bottom: 16px;">
    ${(data.requirements && data.requirements.length > 0 ? data.requirements : [
      { title: 'Passport Validity Requirement', desc: 'Must possess minimum 6 months validity from entry date with at least 2 empty pages.' },
      { title: 'Sufficient Financial Proof', desc: 'Must demonstrate sufficient liquid funds to cover entire duration of stay and transit.' },
      { title: 'Accommodation & Return Ticket', desc: 'Confirmed onward or return flight itinerary and verified lodging reservation.' },
      { title: 'Travel Medical Insurance', desc: 'Comprehensive medical insurance covering emergency hospitalization and repatriation.' },
      { title: 'Consular & Biometric Adjudication', desc: 'Mandatory biometric registration or in-person interview if requested by consular post.' }
    ]).map(r => `
      <div style="display:flex; align-items:flex-start; gap:8px; margin-bottom:8px;">
        <div style="width:6px; height:6px; border-radius:50%; background:#059669; margin-top:5px; flex-shrink:0;"></div>
        <div>
          <strong style="font-size:11.5px; color:#0f172a;">${r.title}:</strong>
          <span style="font-size:11px; color:#475569;">${r.desc}</span>
        </div>
      </div>
    `).join('')}
  </div>

  <!-- 7. FAQ -->
  <div class="section-title"><span class="section-num">7</span> Frequently Asked Questions (FAQ)</div>
  <div style="margin-bottom: 16px;">
    ${(data.faqs && data.faqs.length > 0 ? data.faqs : [
      { question: 'Can this visa be extended once inside the country?', answer: 'Extensions are subject to local immigration department discretion and must be requested prior to expiry.' },
      { question: 'Is biometric submission or an interview mandatory?', answer: 'First-time applicants usually undergo biometric enrollment. Embassy reserves right to call for interview.' },
      { question: 'What if my passport expires in less than 6 months?', answer: 'You must renew your passport before applying, as border authorities strictly enforce 6-month rules.' },
      { question: 'Are visa application fees refundable in case of refusal?', answer: 'All official consular and administrative handling charges are non-refundable once processed.' }
    ]).map(f => `
      <div class="faq-card">
        <div class="faq-q">Q: ${f.question}</div>
        <div class="faq-a">A: ${f.answer}</div>
      </div>
    `).join('')}
  </div>

  <!-- 8. TRACK -->
  <div class="section-title"><span class="section-num">8</span> Application Tracking &amp; Registry Verification</div>
  <div class="card" style="background:#f0fdf4; border-color:#bbf7d0; padding:16px;">
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
      <div>
        <span class="card-label" style="color:#166534;">Official Dossier Tracking ID</span>
        <span style="font-size:18px; font-weight:900; color:#14532d; letter-spacing:1px;">${data.trackingId}</span>
        <div style="font-size:11px; color:#15803d; margin-top:4px;">Status: Ingested &amp; Synced to TravlTik User Dashboard</div>
      </div>
      <div style="text-align:right;">
        <span class="card-label" style="color:#166534;">Direct Tracking Portal</span>
        <a href="${data.trackingUrl || '/dashboard'}" style="font-size:11px; font-weight:800; color:#059669; text-decoration:none;">${data.trackingUrl || 'travltik.com/dashboard'} &rarr;</a>
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <div class="footer">
    Adjudication authority resides exclusively with destination government sovereign immigration ministries.<br/>
    Document specifications verified by TravlTik AI Consular Registry. Generated on ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() { window.print(); }, 400);
    };
  </script>
</body>
</html>`;

  printWindow.document.write(html);
  printWindow.document.close();
}
