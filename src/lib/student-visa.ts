// src/lib/student-visa.ts
// Country-specific student visa steps, documents, fees, processing, and requirements pipeline based on official consular requirements

export interface DocumentRequiredItem {
  title: string;
  description: string;
  is_mandatory: boolean;
}

export interface FinancialProofItem {
  type: string;
  minimum_balance_or_amount: string | null;
  time_frame: string;
  notes: string;
}

export interface OtherRequirementItem {
  category: string;
  details: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface StructuredVisaRequirements {
  passport_country: string;
  destination_country: string;
  purpose_of_visit: string;
  visa_type: string;
  source_url: string;
  official_source_name: string;
  overview?: string;
  consular_directives?: string[];
  application_portal?: string;
  vac_provider?: string;
  processing_time?: string;
  validity?: string;
  stay_duration?: string;
  entry_type?: string;
  processing_time_details?: string;
  validity_details?: string;
  stay_duration_details?: string;
  entry_type_details?: string;
  validity_and_stay?: {
    visa_validity?: string;
    max_stay_per_entry?: string;
    entry_type?: string;
  };
  documents_required: DocumentRequiredItem[];
  supportingDocuments?: any[];
  financial_proofs: FinancialProofItem[];
  other_requirements: OtherRequirementItem[];
  how_to_apply: string[];
  costs: {
    visa_fee: string;
    service_fee: string;
    total_fee: string;
    notes: string;
  };
  processing_and_timing: {
    apply_window: string;
    decision_time: string;
    max_extension: string;
    center_notes?: string;
  };
  faqs?: FAQItem[];
}

// ── COUNTRY NORMALIZATION HELPER ──
export function normalizeCountry(country: string): string {
  const c = (country || '').toLowerCase().trim().replace(/[-_]/g, ' ');
  if (c.includes('australia') || c.includes('subclass 500')) return 'australia';
  if (c === 'uk' || c.startsWith('uk ') || c.endsWith(' uk') || c.includes('united kingdom') || c.includes('england') || c.includes('britain') || c.includes('great britain') || c.includes('scotland') || c.includes('wales')) return 'uk';
  if (c.includes('usa') || c.includes('united states') || c.includes('america') || c.includes('u.s.') || c === 'us') return 'usa';
  if (c.includes('canada')) return 'canada';
  if (c.includes('germany') || c.includes('deutschland')) return 'germany';
  if (c.includes('france') || c.includes('paris')) return 'france';
  if (c.includes('ireland') || c.includes('irish') || c.includes('eire')) return 'ireland';
  if (c.includes('italy') || c.includes('italia') || c.includes('rome') || c.includes('milan')) return 'italy';
  if (c.includes('new zealand') || c === 'nz' || c.includes('auckland')) return 'new-zealand';
  if (c.includes('singapore')) return 'singapore';
  if (c.includes('japan') || c.includes('tokyo') || c.includes('kyoto')) return 'japan';
  if (c.includes('austria') || c.includes('vienna')) return 'austria';
  if (c.includes('belgium') || c.includes('brussels')) return 'belgium';
  if (c.includes('czech') || c.includes('prague')) return 'czech-republic';
  if (c.includes('denmark') || c.includes('copenhagen')) return 'denmark';
  if (c.includes('finland') || c.includes('helsinki')) return 'finland';
  if (c.includes('hungary') || c.includes('budapest')) return 'hungary';
  if (c.includes('iceland') || c.includes('reykjavik')) return 'iceland';
  if (c.includes('norway') || c.includes('oslo')) return 'norway';
  if (c.includes('poland') || c.includes('warsaw') || c.includes('krakow')) return 'poland';
  if (c.includes('portugal') || c.includes('lisbon')) return 'portugal';
  if (c.includes('sweden') || c.includes('stockholm')) return 'sweden';
  if (c.includes('switzerland') || c.includes('swiss') || c.includes('zurich')) return 'switzerland';
  if (c.includes('turkey') || c.includes('turkiye') || c.includes('istanbul')) return 'turkey';
  if (c.includes('argentina') || c.includes('buenos aires')) return 'argentina';
  if (c.includes('netherlands') || c.includes('holland') || c.includes('dutch')) return 'netherlands';
  return c;
}

const DESTS: Record<string, any> = {
  "australia": {
    "overview": "The Australian Student Visa (Subclass 500) authorizes international students to undertake full-time higher education, vocational training, or postgraduate research at registered CRICOS academic institutions. Students are permitted to work up to 48 hours per fortnight during university terms and unrestricted hours during scheduled semester breaks. Upon graduation from eligible degrees, students can transition to the Subclass 485 Temporary Graduate Visa for 2 to 4 years of post-study work rights.",
    "fees": { "visa_fee": "AUD 1,600 (approx. ₹88,000)", "service_fee": "₹1,650 (VFS Global ABCC Biometrics)", "total_fee": "AUD 1,600 Base Application Charge", "notes": "Paid online via ImmiAccount. Excludes mandatory Overseas Student Health Cover (OSHC) of AUD 600-900/year and Bupa medical examinations." },
    "proc_time": "4 to 8 Weeks (Standard Higher Education Sector)",
    "proc_details": "Applications are processed under the simplified student visa framework (SSVF). Lodging with a Confirmation of Enrolment (CoE) and evidence of Genuine Student (GS) intent accelerates assessment.",
    "source": "Department of Home Affairs (ImmiAccount) / VFS Global Australia",
    "work_term": "48 hours per fortnight", "work_break": "Unlimited hours", "post_study": "2 to 4 years (Subclass 485 Temporary Graduate Visa)",
    "min_funds": "AUD 29,710/year (living costs) + 1st year tuition fee + AUD 2,000 travel allowance",
    "acceptance_doc": "Confirmation of Enrolment (CoE)",
    "acceptance_desc": "Electronic CoE issued by CRICOS-registered Australian education provider with PRISMS tracking number."
  },
  "uk": {
    "overview": "The UK Student Route Visa permits international students to enroll in full-time degree programs at licensed Student Sponsor Higher Education Providers (HEPs). Students holding a degree-level visa can work up to 20 hours per week during term time and full-time during official vacation periods. Upon successful course completion, graduates can transition to the 2-year Graduate Route Post-Study Work Visa (3 years for PhD/doctoral graduates) with no job sponsorship required.",
    "fees": { "visa_fee": "£490 (approx. ₹52,400)", "service_fee": "£776/year (Immigration Health Surcharge - IHS)", "total_fee": "£1,266+ (Visa £490 + Annual IHS £776)", "notes": "Paid online on GOV.UK. Mandatory IHS covers full NHS healthcare access during studies. Priority visa processing (+£500 for 5 days) available." },
    "proc_time": "3 Weeks (15 Working Days) Standard Processing",
    "proc_details": "UKVI standard processing is 3 weeks following biometric capture at VFS Global. Priority (5 days) and Super Priority (next business day) services are optional.",
    "source": "UK Visas and Immigration (UKVI / GOV.UK) / VFS Global",
    "work_term": "20 hours per week", "work_break": "Full-time (40 hours/week)", "post_study": "2 years (3 years for PhD) via Graduate Route",
    "min_funds": "£1,483/month (London) or £1,136/month (outside London) for up to 9 months + unpaid tuition",
    "acceptance_doc": "Confirmation of Acceptance for Studies (CAS)",
    "acceptance_desc": "Unique 14-digit electronic reference number issued by a UK licensed Student Sponsor institution."
  },
  "usa": {
    "overview": "The F-1 Academic Student Visa enables international students to pursue full-time academic degree programs at SEVP-certified colleges, universities, and seminaries across the United States. F-1 students may work on-campus up to 20 hours per week during school terms and full-time during vacations. Following graduation, students qualify for 12 months of Optional Practical Training (OPT), with an additional 24-month STEM OPT extension available for eligible science, technology, engineering, and mathematics degrees (36 months total).",
    "fees": { "visa_fee": "USD $185 (MRV Visa Fee - approx. ₹15,540)", "service_fee": "USD $350 (I-901 SEVIS Fee)", "total_fee": "USD $535 Total Statutory Reference", "notes": "SEVIS fee must be paid online via FMJfee.com prior to scheduling the consular interview. MRV visa fee is paid via the US Visa Scheduling portal." },
    "proc_time": "Consular Decision at Interview Window (Passport return in 3-5 Business Days)",
    "proc_details": "Requires a two-stage in-person appointment in India: Biometrics at a Visa Application Center (VAC) followed by an in-person consular interview at a US Embassy or Consulate.",
    "source": "U.S. Department of State / US Embassy & Consulates in India",
    "work_term": "Up to 20 hours per week (on-campus only)", "work_break": "Full-time on-campus (40 hours/week)", "post_study": "12 to 36 Months (OPT / STEM OPT Extension)",
    "min_funds": "Full 1st year estimated expenses (Tuition + Living + Health Insurance as certified on Form I-20)",
    "acceptance_doc": "Certificate of Eligibility for Nonimmigrant Student Status (Form I-20)",
    "acceptance_desc": "Official Form I-20 issued by SEVP-certified institution with designated SEVIS ID number."
  },
  "canada": {
    "overview": "The Canadian Study Permit allows international students to pursue academic, professional, or vocational training at Designated Learning Institutions (DLIs) across Canada. Eligible students may work off-campus up to 20 hours per week during regular academic sessions and full-time during scheduled academic breaks. Following graduation from an eligible program, students can obtain a Post-Graduation Work Permit (PGWP) valid for up to 3 years, offering an established pathway to permanent residence via Express Entry.",
    "fees": { "visa_fee": "CAD $150 (approx. ₹9,300)", "service_fee": "CAD $85 (Biometrics Fee)", "total_fee": "CAD $235 Total Government Charge", "notes": "Paid online via IRCC secure portal. Living expenses must be demonstrated through a Guaranteed Investment Certificate (GIC) of CAD $20,635." },
    "proc_time": "6 to 10 Weeks (Standard Assessment Timeline)",
    "proc_details": "Processed online via the IRCC portal. Provincial Attestation Letter (PAL) is mandatory for post-secondary undergraduate applications.",
    "source": "Immigration, Refugees and Citizenship Canada (IRCC) / VFS Global",
    "work_term": "Up to 20 hours per week off-campus", "work_break": "Full-time during scheduled breaks", "post_study": "Up to 3 Years via Post-Graduation Work Permit (PGWP)",
    "min_funds": "CAD $20,635 (1st year living cost via GIC) + 1st year tuition fee receipt",
    "acceptance_doc": "DLI Letter of Acceptance (LOA) & Provincial Attestation Letter (PAL)",
    "acceptance_desc": "Official unconditional admission letter from a Designated Learning Institution accompanied by a provincial PAL."
  },
  "germany": {
    "overview": "The German National Student Visa (Type D) permits international students to enroll in bachelor, master, and doctoral degree programs at state-accredited German universities. Public universities in 15 of 16 German states offer tuition-free education. Students are legally authorized to work up to 140 full days or 280 half days per calendar year. Following graduation, students can obtain an 18-month Job Seeker Residence Permit to secure qualified employment matching their degree and transition to an EU Blue Card.",
    "fees": { "visa_fee": "€75 (approx. ₹6,750)", "service_fee": "₹18,000 (APS Verification) + ₹2,500 VFS logistics", "total_fee": "approx. ₹27,250 Total Consular Reference", "notes": "APS certificate verification by the Academic Evaluation Centre New Delhi is mandatory prior to visa submission. Visa fee waived for German government scholars." },
    "proc_time": "4 to 8 Weeks from Document Submission at VFS Global",
    "proc_details": "Processed by the German Embassy in New Delhi and Consulates General in Mumbai, Bengaluru, Chennai, and Kolkata following local foreigners authority (Ausländerbehörde) clearance.",
    "source": "German Federal Foreign Office / German Missions in India & VFS Global",
    "work_term": "140 full days or 280 half days per year", "work_break": "Permitted within statutory day allowance", "post_study": "18 Months Job Seeker Residence Permit (Aufenthaltserlaubnis zur Arbeitsplatzsuche)",
    "min_funds": "€11,208/year (€934/month) deposited into an officially approved Blocked Account (Sperrkonto)",
    "acceptance_doc": "University Admission Letter (Zulassungsbescheid) & APS Certificate",
    "acceptance_desc": "Unconditional admission notice from an accredited German university along with mandatory original APS Certificate."
  },
  "france": {
    "overview": "The French Long-Stay Student Visa (VLS-TS) allows international students to enroll in higher education programs at French universities, Grandes Écoles, and specialized institutes. Students are permitted to work up to 60% of the statutory annual working hours (964 hours per year). Following completion of a Master's degree or equivalent, graduates can apply for the 12-month Job Search / Business Creation authorization (RECE / APS), allowing them to seek employment or launch an enterprise in France.",
    "fees": { "visa_fee": "€50 (approx. ₹4,500)", "service_fee": "₹16,500 (Campus France EEF Processing) + VFS Logistics", "total_fee": "approx. ₹23,500 Total Statutory Reference", "notes": "Applicants must complete the mandatory Études en France (EEF) Campus France interview before lodging the visa file at VFS France." },
    "proc_time": "2 to 4 Weeks following Campus France Interview and VFS submission",
    "proc_details": "Two-tier verification: Academic interview with Campus France India followed by consular review and biometric capture through VFS Global France.",
    "source": "Campus France India & Ministry of the Interior (France-Visas) / VFS Global",
    "work_term": "Up to 964 hours per year (approx. 20 hrs/week)", "work_break": "Full-time within annual limit", "post_study": "12 Months via Recherche d'Emploi / Création d'Entreprise (RECE) permit",
    "min_funds": "Minimum €615/month (€7,380/year) living expenses + tuition fee coverage",
    "acceptance_doc": "Campus France EEF Acceptance & University Attestation",
    "acceptance_desc": "Confirmation of registration generated through the official Études en France (EEF) platform."
  },
  "ireland": {
    "overview": "The Irish Long Stay Student Visa (Type D) enables international students to undertake full-time higher education programs listed on the Interim List of Eligible Programmes (ILEP). Non-EEA students are granted permission to work up to 20 hours per week during term time and up to 40 hours per week during designated holiday periods (June–September and December 15–January 15). Under the Third Level Graduate Scheme (Stamp 1G), master's graduates can stay and work full-time for up to 24 months.",
    "fees": { "visa_fee": "€60 (Single Entry) / €100 (Multiple Entry)", "service_fee": "€300 (Irish Residence Permit - IRP Card registration on arrival)", "total_fee": "€360 – €400 Total Reference", "notes": "Paid online via AVATS portal. IRP registration fee (€300) is paid inside Ireland upon appointment with the Immigration Service Delivery (ISD)." },
    "proc_time": "4 to 8 Weeks from Document Submission at VFS Ireland",
    "proc_details": "Processed by the Embassy of Ireland in New Delhi. Ireland is NOT a Schengen member; visa requires direct national clearance.",
    "source": "Immigration Service Delivery (ISD / AVATS) / Embassy of Ireland & VFS Global",
    "work_term": "20 hours per week", "work_break": "40 hours per week (June-Sept & mid-Dec to mid-Jan)", "post_study": "Up to 24 Months via Third Level Graduate Scheme (Stamp 1G)",
    "min_funds": "€10,000/year living expenses demonstrated in personal/sponsor account + full 1st year tuition receipt",
    "acceptance_doc": "Letter of Acceptance from ILEP-approved Institution",
    "acceptance_desc": "Unconditional offer letter from an eligible Irish university confirming course registration and fees paid."
  },
  "italy": {
    "overview": "The Italian National Student Visa (Type D Studio) enables international students to enroll in undergraduate, master, and doctoral degree programs at Italian universities, polytechnics, and AFAM art academies. International students may legally work part-time up to 20 hours per week (maximum 1,040 hours per calendar year). Following graduation, degree holders can apply for a 12-month Permesso di Soggiorno per Ricerca Lavoro (Job Search Residence Permit) to seek employment matching their qualifications.",
    "fees": { "visa_fee": "€50 (National Study Visa Fee)", "service_fee": "€30 (VFS Global Service Fee) + €16 stamp duty (Marca da Bollo)", "total_fee": "approx. ₹8,500 Consular Total Reference", "notes": "Pre-enrolment must be completed online on the Universitaly portal. Declaration of Value (DOV) or CIMEA Statement of Comparability is mandatory for academic recognition." },
    "proc_time": "3 to 6 Weeks following VFS submission and Consular review",
    "proc_details": "Submitted via VFS Global Italy after pre-enrolment approval on the Universitaly portal by the Italian university.",
    "source": "Ministry of Foreign Affairs and International Cooperation (MAECI / Universitaly) / VFS Global",
    "work_term": "Up to 20 hours per week (max 1,040 hrs/year)", "work_break": "Permitted within annual hour ceiling", "post_study": "12 Months via Permesso di Soggiorno per Ricerca Lavoro",
    "min_funds": "Minimum €6,000/year (approx. €468/month) living expenses + accommodation proof",
    "acceptance_doc": "Universitaly Pre-enrolment Summary & University Admission Letter",
    "acceptance_desc": "Validated Summary Form from the official Universitaly portal endorsed by the admitting Italian institution."
  },
  "new-zealand": {
    "overview": "The New Zealand Fee Paying Student Visa allows international students to study full-time at universities, institutes of technology, and registered private training establishments across New Zealand. Students enrolled in eligible full-time tertiary programs can work up to 20 hours per week during term time and full-time during scheduled academic breaks. Following graduation, students can apply for a Post-Study Work Visa (PSWV) for 1, 2, or 3 years depending on the qualification level and study location.",
    "fees": { "visa_fee": "NZD $430 (approx. ₹21,500)", "service_fee": "NZD $35 (Immigration Levy)", "total_fee": "NZD $465 Total Reference", "notes": "Paid online via Immigration New Zealand Immigration Online portal. Excludes approved medical chest X-ray and full medical examination fees." },
    "proc_time": "4 to 6 Weeks from Online Submission",
    "proc_details": "100% digital application processed through Immigration New Zealand's Immigration Online platform. Electronic eVisa issued upon approval.",
    "source": "Immigration New Zealand (INZ / Immigration Online)",
    "work_term": "20 hours per week", "work_break": "Full-time during scheduled breaks", "post_study": "1 to 3 Years via Post-Study Work Visa (PSWV)",
    "min_funds": "NZD $20,000/year for living expenses + 1st year tuition fee receipt or proof of funds",
    "acceptance_doc": "Offer of Place from NZQA-accredited Institution",
    "acceptance_desc": "Unconditional Offer of Place confirming program details, course duration, and accommodation arrangements."
  },
  "singapore": {
    "overview": "The Student's Pass in Singapore allows international students to undertake approved full-time degree programs at Singapore's Institute of Higher Learning (IHLs) including NUS, NTU, SMU, and SUTD. Students at approved public IHLs are permitted to work part-time up to 16 hours per week during term time without a separate work pass and full-time during official vacation periods. Upon graduation, international students from local universities can apply for a 1-year non-renewable Long-Term Visit Pass (LTVP) to seek employment in Singapore.",
    "fees": { "visa_fee": "SGD $30 (Application Processing Fee)", "service_fee": "SGD $60 (Issuance Fee) + SGD $30 (Multiple Journey Visa if applicable)", "total_fee": "SGD $90 – $120 Total Reference", "notes": "Paid online via the ICA SOLAR portal. Security deposit or medical examination may be requested by ICA depending on nationality." },
    "proc_time": "10 to 15 Working Days (via ICA SOLAR system)",
    "proc_details": "Two-step digital process: The admitting educational institution files the SOLAR application, followed by the student submitting eForm 16 online.",
    "source": "Immigration & Checkpoints Authority (ICA Singapore / SOLAR System)",
    "work_term": "Up to 16 hours per week (at approved IHLs only)", "work_break": "Full-time during vacations", "post_study": "1 Year Job Search via Long-Term Visit Pass (LTVP)",
    "min_funds": "SGD $15,000 – $20,000/year demonstrated through personal/parental bank statements",
    "acceptance_doc": "SOLAR Registration Acknowledgement & University In-Principle Approval",
    "acceptance_desc": "Electronic In-Principle Approval (IPA) letter issued by ICA Singapore via SOLAR."
  },
  "japan": {
    "overview": "The Japan College Student Visa permits international students to enroll in degree programs at Japanese universities, graduate schools, and Ministry-accredited vocational colleges. Students must apply for and receive a Permission to Engage in Activity other than that Permitted under the Status of Residence Previously Granted (Shikakugaikatsudō) to work up to 28 hours per week during semesters and up to 8 hours per day during official vacations. Following graduation, students can obtain a 6 to 12-month Designated Activities Visa (Tokutei Katsudo) for employment seeking.",
    "fees": { "visa_fee": "3,000 JPY (Single Entry - approx. ₹1,700)", "service_fee": "₹750 – ₹1,200 (VFS Global Processing Fee)", "total_fee": "approx. ₹2,700 Total Reference", "notes": "The admitting Japanese university first secures the Certificate of Eligibility (COE) from regional immigration authorities in Japan before consular visa stamping in India." },
    "proc_time": "5 to 7 Working Days (following COE issuance in Japan)",
    "proc_details": "Two phases: Phase 1 is Certificate of Eligibility (COE) processing in Japan (takes 2-3 months); Phase 2 is consular visa sticker processing at VFS Japan in India (takes 1 week).",
    "source": "Immigration Services Agency of Japan (MOJ) / Embassy of Japan & VFS Global",
    "work_term": "Up to 28 hours per week (with Shikakugaikatsudō permit)", "work_break": "Up to 8 hours per day during vacations", "post_study": "6 to 12 Months via Designated Activities Visa (Job Hunting)",
    "min_funds": "2,000,000 JPY (approx. ₹11,00,000) living expenses shown in sponsor's bank statements",
    "acceptance_doc": "Certificate of Eligibility (COE) & Letter of Admission",
    "acceptance_desc": "Original Certificate of Eligibility (COE) issued by regional immigration bureaus in Japan."
  },
  "austria": {
    "overview": "The Austrian Student Residence Permit (Aufenthaltsbewilligung Student) allows international students to enroll in full-time degree programs at accredited public and private Austrian universities. International students from third countries may work up to 20 hours per week without requiring an extensive labour market test, provided an employment permit (Beschäftigungsbewilligung) is registered by the employer. Following graduation, degree holders can apply for a 12-month Red-White-Red Card for Job Seekers to secure qualified employment.",
    "fees": { "visa_fee": "€160 (€120 application fee + €20 grant fee + €20 police fee)", "service_fee": "€30 (VFS Service Fee)", "total_fee": "€190 Total Reference (approx. ₹17,100)", "notes": "Initial application submitted through Austrian Embassy in New Delhi / VFS Global. Final biometric residence card issued in Austria by the local magistrate (MA 35 in Vienna)." },
    "proc_time": "8 to 12 Weeks from Document Lodgement",
    "proc_details": "Application dossier is transmitted from the Austrian Embassy in New Delhi to the responsible municipal authority (Magistrat / Bezirkshauptmannschaft) in Austria for adjudication.",
    "source": "Austrian Federal Ministry of the Interior (BMI / OeAD) / Austrian Embassy & VFS Global",
    "work_term": "Up to 20 hours per week", "work_break": "Permitted with employer registration", "post_study": "12 Months via Red-White-Red Card Job Search Residence Permit",
    "min_funds": "€11,000 – €14,000/year living costs in personal bank account (€672/mo under 24, €1,217/mo over 24)",
    "acceptance_doc": "Austrian University Admission Notice (Zulassungsbescheid)",
    "acceptance_desc": "Official notification of admission issued by the rectorate of an accredited Austrian university."
  },
  "belgium": {
    "overview": "The Belgian Long-Stay Student Visa (Type D) enables international students to undertake higher education at universities and university colleges (Hautes Écoles) across Flanders, Wallonia, and Brussels. Students are permitted to work up to 20 hours per week during academic semesters and unlimited hours during summer holidays, provided studies remain the primary activity. Under Belgian law, non-EU graduates can apply for a 12-month Search Year (Orientation Year) residence permit to look for employment or start a business.",
    "fees": { "visa_fee": "€180 (Visa D Application Fee)", "service_fee": "€235 (Federal Administrative Fee paid to Immigration Office DOFI)", "total_fee": "€415 Total Reference (approx. ₹37,500)", "notes": "The federal administrative contribution (€235) must be paid directly into the Belgian Immigration Office bank account before lodging the visa application at VFS Belgium." },
    "proc_time": "4 to 8 Weeks from Physical Submission at VFS Global",
    "proc_details": "Processed by the Belgian Immigration Office (Dienst Vreemdelingenzaken / Office des Étrangers) in Brussels.",
    "source": "Belgian Immigration Office (DOFI) / Embassy of Belgium & VFS Global",
    "work_term": "Up to 20 hours per week", "work_break": "Unlimited during summer holidays", "post_study": "12 Months via Search Year / Orientation Year Residence Permit",
    "min_funds": "Minimum €803/month (€9,636/year) demonstrated via university blocked account or Annex 32 sponsorship",
    "acceptance_doc": "Attestation of Enrolment / Admission (Attestation d'inscription)",
    "acceptance_desc": "Official certificate issued by an accredited Belgian higher education institution."
  },
  "czech-republic": {
    "overview": "The Czech Long-Term Visa / Residence Permit for Studies allows international students to enroll in accredited degree programs at world-renowned Czech universities such as Charles University and CTU Prague. International students studying in an accredited university program have free access to the Czech labour market with no work permit required. Following graduation from an accredited Czech university, graduates can apply for a 9-month Job Seeker Residence Permit to find qualified employment.",
    "fees": { "visa_fee": "CZK 2,500 (approx. €100 / ₹9,000)", "service_fee": "CZK 500 – 1,000 (VFS Global Processing Fee)", "total_fee": "approx. ₹10,500 Total Reference", "notes": "All non-Czech documents (police clearance, birth certificate) must be super-legalized or apostilled and accompanied by an official certified Czech translation." },
    "proc_time": "60 Calendar Days statutory consular SLA",
    "proc_details": "Processed by the Department for Asylum and Migration Policy (OAMP) of the Ministry of the Interior of the Czech Republic.",
    "source": "Ministry of the Interior of the Czech Republic (MOI / OAMP) / Czech Embassy & VFS Global",
    "work_term": "Free access to labour market (no work permit needed for accredited programs)", "work_break": "Unrestricted", "post_study": "9 Months Job Search Residence Permit",
    "min_funds": "CZK 130,000 – 150,000/year (approx. ₹4,80,000) demonstrated through stamped bank statement",
    "acceptance_doc": "Letter of Acceptance for Studies (Potvrzení o studiu)",
    "acceptance_desc": "Official document confirming admission to an accredited Czech degree program issued in Czech."
  },
  "denmark": {
    "overview": "The Danish Student Residence Permit (ST1) allows international students to study at universities and higher education academies in Denmark. Non-EU students are legally permitted to work up to 20 hours per week during the academic year (September to May) and full-time (37 hours per week) during the summer holidays (June, July, and August). Following graduation, students can apply for a 3-year Post-Study Establishment Card to live and work in Denmark without requiring sponsor-based work permits.",
    "fees": { "visa_fee": "DKK 2,490 (approx. ₹30,000 - SIRI Case Order Fee)", "service_fee": "€30 (VFS Global Biometrics Fee)", "total_fee": "DKK 2,490 + VFS Service Fee", "notes": "Case Order ID must be created on newtodenmark.dk and the statutory SIRI fee paid online before submitting biometric data at VFS Denmark." },
    "proc_time": "2 Months (60 Days) from Biometric Capture",
    "proc_details": "Processed electronically by the Danish Agency for International Recruitment and Integration (SIRI).",
    "source": "Danish Agency for International Recruitment and Integration (SIRI) / VFS Global",
    "work_term": "20 hours per week (Sept–May)", "work_break": "Full-time (37 hours/week) June–August", "post_study": "3 Years via Post-Study Establishment Card Scheme",
    "min_funds": "DKK 6,820/month (approx. DKK 81,840/year) demonstrated through personal bank account",
    "acceptance_doc": "ST1 Application Online Code & University Admission Notice",
    "acceptance_desc": "Joint digital application form ST1 completed by educational institution and student."
  },
  "finland": {
    "overview": "The Finnish Student Residence Permit allows international students to pursue bachelor, master, and doctoral degree programs at Finnish universities and universities of applied sciences (UAS). Finland offers the world's most generous student work rights, permitting up to 30 hours of work per week during the academic term. Following graduation, degree holders can apply for a 2-year Job Search Residence Permit to look for work or start an enterprise.",
    "fees": { "visa_fee": "€350 (Electronic Application via Enter Finland)", "service_fee": "€30 (VFS Global Biometrics Fee)", "total_fee": "€380 Total Reference (approx. ₹34,200)", "notes": "Application is lodged online via the Enter Finland portal (enterfinland.fi). Private health insurance covering at least €120,000 in medical costs is required." },
    "proc_time": "1 to 2 Months from Biometric Verification at VFS Global",
    "proc_details": "Processed digitally by the Finnish Immigration Service (Migri) via Enter Finland.",
    "source": "Finnish Immigration Service (Migri / Enter Finland) / VFS Global",
    "work_term": "Up to 30 hours per week", "work_break": "Unrestricted hours when university classes are not held", "post_study": "2 Years Job Search Residence Permit (granted in up to 3 periods)",
    "min_funds": "€560/month (€6,720/year) deposited in applicant's personal bank account + tuition fee payment receipt",
    "acceptance_doc": "Study Place Acceptance Letter & Tuition Fee Receipt",
    "acceptance_desc": "Official certificate of acceptance issued through Studyinfo.fi or the admitting Finnish university."
  },
  "hungary": {
    "overview": "The Hungarian Long-Term Student Visa (Type D / Residence Permit for Studies) allows international students to enroll in full-time programs at prestigious Hungarian universities. Many Indian students study under the fully funded Stipendium Hungaricum scholarship. Students are entitled to work up to 24 hours per week during semester time and up to 66 days or 90 days per year outside semester periods. Graduates can transition to the 9-month Study-to-Work Residence Permit to seek employment in Hungary.",
    "fees": { "visa_fee": "€110 (Residence Permit Application Fee)", "service_fee": "€30 (VFS Global Processing Fee)", "total_fee": "€140 Total Reference (approx. ₹12,600)", "notes": "Visa D serves as an entry vignette valid for 30 days. The physical Residence Permit card is collected upon arrival at the National Directorate-General for Aliens Policing (OIF)." },
    "proc_time": "15 to 30 Calendar Days from Consular Submission",
    "proc_details": "Processed by the National Directorate-General for Aliens Policing (OIF) in Hungary via Hungarian consular missions in India.",
    "source": "National Directorate-General for Aliens Policing (OIF) / Hungarian Embassy & VFS Global",
    "work_term": "Up to 24 hours per week during term", "work_break": "Up to 66 working days outside semester", "post_study": "9 Months via Study-to-Work Residence Permit",
    "min_funds": "Approx. €700/month (€8,400/year) demonstrated in student's or sponsor's bank account",
    "acceptance_doc": "Letter of Admission & Stipendium Hungaricum Award (if applicable)",
    "acceptance_desc": "Official certificate of admission issued by a Hungarian higher education institution."
  },
  "iceland": {
    "overview": "The Icelandic Student Residence Permit allows international students to undertake full-time higher education at recognized universities in Iceland (such as the University of Iceland and Reykjavik University). Non-EEA students must apply for a specific student work permit to work up to 15 hours per week during the academic semester, with full-time work permitted during summer vacations. Following graduation, international students can obtain a 6-month residence permit to seek employment in Iceland.",
    "fees": { "visa_fee": "ISK 15,000 (approx. €100 / ₹9,000)", "service_fee": "€30 (VFS Service Fee)", "total_fee": "approx. ₹11,700 Total Reference", "notes": "Application must be submitted to the Directorate of Immigration (Útlendingastofnun) in Iceland before arriving. Criminal record certificate apostilled or legalized is mandatory." },
    "proc_time": "6 to 12 Weeks from Complete Dossier Receipt",
    "proc_details": "Adjudicated directly by the Directorate of Immigration (Útlendingastofnun) in Iceland.",
    "source": "Directorate of Immigration Iceland (Útlendingastofnun) / Danish Embassy (Representation)",
    "work_term": "Up to 15 hours per week (requires student work permit)", "work_break": "Full-time during summer holidays", "post_study": "6 Months Post-Study Job Search Permit",
    "min_funds": "ISK 217,799/month (approx. ₹1,30,000/month) for individual living expenses",
    "acceptance_doc": "Confirmation of School Admission (Staðfesting á skólavist)",
    "acceptance_desc": "Official confirmation of admission to a full-time university program in Iceland."
  },
  "norway": {
    "overview": "The Norwegian Student Residence Permit allows international students to enroll in full-time bachelor, master, and doctoral programs at Norwegian universities. International students are permitted to work part-time up to 20 hours per week during academic semesters and full-time during official semester breaks. Following graduation from a Norwegian university or college, students can apply for a 1-year Job Seeker Residence Permit to seek employment as a skilled worker.",
    "fees": { "visa_fee": "NOK 6,500 (approx. ₹51,000)", "service_fee": "€30 (VFS Global Biometrics Fee)", "total_fee": "NOK 6,500 + VFS Service Fee", "notes": "Living expenses (NOK 151,690/year) must be deposited into the Norwegian university's student deposit bank account prior to visa issuance." },
    "proc_time": "2 Months (8 Weeks) from Biometric Submission",
    "proc_details": "Applied online via the UDI Application Portal (udi.no) followed by physical document submission at VFS Norway.",
    "source": "Norwegian Directorate of Immigration (UDI) / Royal Norwegian Embassy & VFS Global",
    "work_term": "Up to 20 hours per week", "work_break": "Full-time during official university holidays", "post_study": "1 Year Job Seeker Residence Permit for Skilled Workers",
    "min_funds": "NOK 151,690/year (approx. ₹11,90,000) deposited into university's deposit account",
    "acceptance_doc": "Letter of Admission from Norwegian Higher Education Institution",
    "acceptance_desc": "Unconditional offer of admission to full-time study at an accredited Norwegian university."
  },
  "poland": {
    "overview": "The Polish National Visa for Studies (Type D) enables international students to pursue degree programs at universities across Poland. Poland has become a major Central European educational hub with affordable tuition and living costs. Full-time international students studying at accredited Polish universities have the legal right to work without a separate work permit during their studies. Graduates can apply for a 9-month Temporary Residence Permit for Job Seekers following course completion.",
    "fees": { "visa_fee": "€90 (National Visa D Application Fee)", "service_fee": "€15 (VFS Global Processing Fee)", "total_fee": "€105 Total Reference (approx. ₹9,450)", "notes": "Application is registered online on the official e-Konsulat platform (e-konsulat.gov.pl) and lodged at VFS Global Poland in India." },
    "proc_time": "15 to 30 Calendar Days from Consular Receipt",
    "proc_details": "Processed by the Consular Section of the Embassy of the Republic of Poland in New Delhi.",
    "source": "Ministry of Foreign Affairs of Poland (e-Konsulat) / VFS Global",
    "work_term": "Unrestricted work rights (no work permit needed for full-time students)", "work_break": "Unrestricted", "post_study": "9 Months via Temporary Residence Permit for University Graduates",
    "min_funds": "PLN 800/month living expenses + PLN 200/month accommodation + return flight cost",
    "acceptance_doc": "Certificate of Enrolment (Zaświadczenie o przyjęciu na studia)",
    "acceptance_desc": "Official certificate of acceptance from an accredited Polish university according to standard statutory template."
  },
  "portugal": {
    "overview": "The Portuguese National Student Visa (Type D4 / D5) enables international students to undertake higher education at universities and polytechnics across Portugal. International students are permitted to work up to 20 hours per week during term time and full-time during holidays, subject to notifying the immigration authorities (AIMA). After graduation, international students from Portuguese universities can apply for a 1-year Temporary Residence Permit for Job Searching to secure skilled employment.",
    "fees": { "visa_fee": "€90 (National Long-Stay Visa D Fee)", "service_fee": "€30 (VFS Global Service Fee)", "total_fee": "€120 Total Reference (approx. ₹10,800)", "notes": "The D-visa is a 4-month double-entry visa; upon arrival in Portugal, students attend an appointment at AIMA (Agency for Integration, Migration and Asylum) to obtain their residence permit card." },
    "proc_time": "30 to 60 Calendar Days from Lodgement",
    "proc_details": "Processed by the Consular Section of the Embassy of Portugal in New Delhi in coordination with AIMA in Lisbon.",
    "source": "Agency for Integration, Migration and Asylum (AIMA) / Embassy of Portugal & VFS Global",
    "work_term": "Up to 20 hours per week", "work_break": "Full-time during official university holidays", "post_study": "1 Year Job Search Residence Permit (Procura de Trabalho)",
    "min_funds": "€820/month (€9,840/year - Portuguese statutory minimum wage) in personal bank account",
    "acceptance_doc": "Declaration of Acceptance / University Registration (Declaração de Matrícula)",
    "acceptance_desc": "Official certificate issued by an accredited Portuguese higher education institution."
  },
  "sweden": {
    "overview": "The Swedish Residence Permit for Higher Education allows international students to enroll in degree programs at Swedish universities. Sweden offers an exceptional innovation and research ecosystem. International students in Sweden enjoy unrestricted work rights with no legal cap on weekly hours, provided they maintain satisfactory progress and attend mandatory classes. Following graduation, students can apply for a 12-month Residence Permit for Looking for Work or Starting a Business.",
    "fees": { "visa_fee": "SEK 1,500 (approx. ₹12,000)", "service_fee": "€30 (VFS Global Biometrics Fee)", "total_fee": "SEK 1,500 + VFS Service Fee", "notes": "Applied online directly via the Swedish Migration Agency (Migrationsverket) portal before biometric capture at VFS Sweden." },
    "proc_time": "2 to 3 Months from Online Submission",
    "proc_details": "Processed centrally by the Swedish Migration Agency (Migrationsverket) in Sweden.",
    "source": "Swedish Migration Agency (Migrationsverket) / Embassy of Sweden & VFS Global",
    "work_term": "Unrestricted weekly hours (must maintain study progress)", "work_break": "Unrestricted", "post_study": "12 Months Job Search Residence Permit",
    "min_funds": "SEK 10,314/month (approx. SEK 103,140 for 10-month academic year) in personal bank account",
    "acceptance_doc": "Notification of Selection Results from University Admissions Sweden",
    "acceptance_desc": "Official selection result letter from universityadmissions.se confirming full-time admission and tuition paid."
  },
  "switzerland": {
    "overview": "The Swiss National Visa for Study (National Visa Type D) permits international students to enroll in bachelor, master, and doctoral degree programs at top-ranked Swiss universities and Federal Institutes of Technology (ETH Zurich, EPFL). International students from non-EU/EFTA countries may work up to 15 hours per week during semesters, but only after completing 6 months of study in Switzerland; full-time work is permitted during semester vacations. Graduates can apply for a 6-month residence permit to seek employment in Switzerland.",
    "fees": { "visa_fee": "€90 (National Visa D Application Fee)", "service_fee": "CHF 100 – 250 (Cantonal Migration Authorization Fee upon arrival)", "total_fee": "approx. ₹18,000 – ₹25,000 Total Reference", "notes": "Visa application is lodged at VFS Switzerland in India. The cantonal migration office in Switzerland evaluates and approves the student residence permit." },
    "proc_time": "8 to 12 Weeks from Consular Lodgement",
    "proc_details": "Tri-level review: Swiss Consulate in India reviews dossier, transmits to the Cantonal Migration Authority (e.g. Zurich, Vaud, Geneva), with federal approval by SEM.",
    "source": "State Secretariat for Migration (SEM) & Cantonal Migration Offices / VFS Global Switzerland",
    "work_term": "Up to 15 hours per week (only permitted after 6 months of study)", "work_break": "Full-time during semester breaks", "post_study": "6 Months Job Search Residence Permit",
    "min_funds": "CHF 21,000/year (approx. ₹20,00,000) demonstrated through personal/Swiss bank account",
    "acceptance_doc": "Confirmation of Registration (Attestation d'immatriculation / Zulassungsbestätigung)",
    "acceptance_desc": "Official registration confirmation issued by the rectorate of a recognized Swiss university."
  },
  "turkey": {
    "overview": "The Turkish Student Residence Permit (Öğrenci İkamet İzni) allows international students to enroll in associate, bachelor, master, and doctoral degree programs at Turkish universities under the Council of Higher Education (YÖK). Master's and PhD students are legally permitted to work part-time in accordance with Turkish labour regulations. Following completion of an undergraduate or postgraduate degree, graduates can apply for a short-term residence permit for job seeking or business establishment.",
    "fees": { "visa_fee": "USD $60 (approx. ₹5,100)", "service_fee": "₹3,500 (Gateway Globe VAC Service Fee)", "total_fee": "approx. ₹8,600 Total Reference", "notes": "Initial Student Visa sticker is obtained through Gateway Globe in India. Upon arrival, students register for the Öğrenci İkamet İzni through the e-Ikamet portal." },
    "proc_time": "15 to 25 Working Days from Gateway Globe Submission",
    "proc_details": "Processed by the Turkish Embassy in New Delhi and General Consulates in Mumbai/Hyderabad.",
    "source": "Presidency of Migration Management (GÖÇ / e-Ikamet) / Gateway Globe",
    "work_term": "Part-time allowed for postgraduate students", "work_break": "Permitted under general labour laws", "post_study": "Short-Term Residence Permit for Job Seeking (up to 1 year)",
    "min_funds": "USD $4,000 – $6,000/year in personal or sponsor bank account",
    "acceptance_doc": "Official University Acceptance Letter & YÖK Recognition",
    "acceptance_desc": "Official acceptance letter issued by an accredited Turkish university."
  },
  "argentina": {
    "overview": "The Argentine Student Visa (Residencia Temporaria por Estudio) allows international students to study at universities and higher institutes across Argentina (such as the University of Buenos Aires - UBA). Public higher education is tuition-free for undergraduate studies in Argentina. International students on a temporary study residence permit have the legal right to work in Argentina with equal labour protections. Following graduation, students can transition to professional work permits or permanent residency.",
    "fees": { "visa_fee": "USD $150 (Consular Visa Fee)", "service_fee": "ARS $10,000 – $20,000 (DGM Immigration Entry Fee on arrival)", "total_fee": "approx. ₹15,000 Total Reference", "notes": "The university in Argentina must register the student on the SINEP / DGM platform before visa issuance at the Embassy of Argentina in New Delhi." },
    "proc_time": "3 to 6 Weeks from Consular Lodgement",
    "proc_details": "Processed by the Consular Section of the Embassy of the Argentine Republic in New Delhi.",
    "source": "National Directorate of Migration (DGM / Migraciones Argentina) / Embassy of Argentina",
    "work_term": "Permitted with temporary residence (DNI)", "work_break": "Full-time permitted", "post_study": "Direct transition to Temporary Work Residence or Mercosur Residency",
    "min_funds": "USD $3,000 – $5,000/year demonstrated through bank statements",
    "acceptance_doc": "Certificate of Enrolment Registered with DGM (Constancia de Inscripción)",
    "acceptance_desc": "Electronic electronic certificate of admission uploaded directly to the DGM immigration system."
  },
  "netherlands": {
    "overview": "The Dutch Student Visa (MVV) and Residence Permit (VVR) allows international students to study at Dutch research universities and universities of applied sciences. Students may work part-time up to 16 hours per week during term time (requiring a TWV work permit filed by the employer) or full-time during the summer months (June to August). Under Dutch law, graduates can apply for a 1-year Orientation Year Visa (Zoekjaar) within 3 years of graduating to seek employment without sponsor salary minimums.",
    "fees": { "visa_fee": "€228 (IND Student Residence Permit Fee)", "service_fee": "€30 (VFS Global Biometrics Fee)", "total_fee": "€258 Total Reference (approx. ₹23,200)", "notes": "The admitting Dutch university submits the MVV/VVR application directly to the Immigration and Naturalisation Service (IND) on the student's behalf." },
    "proc_time": "2 to 4 Weeks (Fast-Track University Filing)",
    "proc_details": "The Dutch university files the TEV (entry and residence) application directly with IND in the Netherlands.",
    "source": "Immigration and Naturalisation Service (IND) / Dutch Ministry of Foreign Affairs & VFS Global",
    "work_term": "Up to 16 hours per week (requires employer TWV permit)", "work_break": "Full-time during June, July, and August", "post_study": "1 Year via Orientation Year Visa for Highly Educated Persons (Zoekjaar)",
    "min_funds": "€12,000 – €14,000/year living costs deposited into university's account or personal account",
    "acceptance_doc": "IND Approval Letter & University Enrolment Letter",
    "acceptance_desc": "Confirmation of admission from a Dutch university and formal IND approval notice."
  }
}
;

// ── 1. STUDENT OVERVIEW ──
export function getStudentOverview(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'australia': 'The Australian Student Visa (Subclass 500) authorizes international students to undertake full-time higher education, vocational training, or postgraduate research at registered CRICOS academic institutions. Students are permitted to work up to 48 hours per fortnight during university terms and unrestricted hours during scheduled semester breaks. Upon graduation from eligible degrees, students can transition to the Subclass 485 Temporary Graduate Visa for 2 to 4 years of post-study work rights.',
    'uk': 'The UK Student Route Visa permits international students to enroll in full-time degree programs at licensed Student Sponsor Higher Education Providers (HEPs). Students holding a degree-level visa can work up to 20 hours per week during term time and full-time during official vacation periods. Upon successful course completion, graduates can transition to the 2-year Graduate Route Post-Study Work Visa (3 years for PhD/doctoral graduates) with no job sponsorship required.',
    'usa': 'The F-1 Academic Student Visa enables international students to pursue full-time academic degree programs at SEVP-certified colleges, universities, and seminaries across the United States. F-1 students may work on-campus up to 20 hours per week during school terms and full-time during vacations. Following graduation, students qualify for 12 months of Optional Practical Training (OPT), with an additional 24-month STEM OPT extension available for eligible science, technology, engineering, and mathematics degrees (36 months total).',
    'canada': 'The Canadian Study Permit allows international students to pursue academic, professional, or vocational training at Designated Learning Institutions (DLIs) across Canada. Eligible students may work off-campus up to 20 hours per week during regular academic sessions and full-time during scheduled academic breaks. Following graduation from an eligible program, students can obtain a Post-Graduation Work Permit (PGWP) valid for up to 3 years, offering an established pathway to permanent residence via Express Entry.',
    'germany': 'The German National Student Visa (Type D) permits international students to enroll in bachelor, master, and doctoral degree programs at state-accredited German universities. Public universities in 15 of 16 German states offer tuition-free education. Students are legally authorized to work up to 140 full days or 280 half days per calendar year. Following graduation, students can obtain an 18-month Job Seeker Residence Permit to secure qualified employment matching their degree and transition to an EU Blue Card.',
    'france': 'The French Long-Stay Student Visa (VLS-TS) allows international students to enroll in higher education programs at French universities, Grandes Écoles, and specialized institutes. Students are permitted to work up to 60% of the statutory annual working hours (964 hours per year). Following completion of a Master\'s degree or equivalent, graduates can apply for the 12-month Job Search / Business Creation authorization (RECE / APS), allowing them to seek employment or launch an enterprise in France.',
    'ireland': 'The Irish Long Stay Student Visa (Type D) enables international students to undertake full-time higher education programs listed on the Interim List of Eligible Programmes (ILEP). Non-EEA students are granted permission to work up to 20 hours per week during term time and up to 40 hours per week during designated holiday periods (June–September and December 15–January 15). Under the Third Level Graduate Scheme (Stamp 1G), master\'s graduates can stay and work full-time for up to 24 months.',
    'italy': 'The Italian National Student Visa (Type D Studio) enables international students to enroll in undergraduate, master, and doctoral degree programs at Italian universities, polytechnics, and AFAM art academies. International students may legally work part-time up to 20 hours per week (maximum 1,040 hours per calendar year). Following graduation, degree holders can apply for a 12-month Permesso di Soggiorno per Ricerca Lavoro (Job Search Residence Permit) to seek employment matching their qualifications.',
    'new-zealand': 'The New Zealand Fee Paying Student Visa allows international students to study full-time at universities, institutes of technology, and registered private training establishments across New Zealand. Students enrolled in eligible full-time tertiary programs can work up to 20 hours per week during term time and full-time during scheduled academic breaks. Following graduation, students can apply for a Post-Study Work Visa (PSWV) for 1, 2, or 3 years depending on the qualification level and study location.',
    'singapore': 'The Student\'s Pass in Singapore allows international students to undertake approved full-time degree programs at Singapore\'s Institute of Higher Learning (IHLs) including NUS, NTU, SMU, and SUTD. Students at approved public IHLs are permitted to work part-time up to 16 hours per week during term time without a separate work pass and full-time during official vacation periods. Upon graduation, international students from local universities can apply for a 1-year non-renewable Long-Term Visit Pass (LTVP) to seek employment in Singapore.',
    'japan': 'The Japan College Student Visa permits international students to enroll in degree programs at Japanese universities, graduate schools, and Ministry-accredited vocational colleges. Students must apply for and receive a Permission to Engage in Activity other than that Permitted under the Status of Residence Previously Granted (Shikakugaikatsudō) to work up to 28 hours per week during semesters and up to 8 hours per day during official vacations. Following graduation, students can obtain a 6 to 12-month Designated Activities Visa (Tokutei Katsudo) for employment seeking.',
    'austria': 'The Austrian Student Residence Permit (Aufenthaltsbewilligung Student) allows international students to enroll in full-time degree programs at accredited public and private Austrian universities. International students from third countries may work up to 20 hours per week without requiring an extensive labour market test, provided an employment permit (Beschäftigungsbewilligung) is registered by the employer. Following graduation, degree holders can apply for a 12-month Red-White-Red Card for Job Seekers to secure qualified employment.',
    'belgium': 'The Belgian Long-Stay Student Visa (Type D) enables international students to undertake higher education at universities and university colleges (Hautes Écoles) across Flanders, Wallonia, and Brussels. Students are permitted to work up to 20 hours per week during academic semesters and unlimited hours during summer holidays, provided studies remain the primary activity. Under Belgian law, non-EU graduates can apply for a 12-month Search Year (Orientation Year) residence permit to look for employment or start a business.',
    'czech-republic': 'The Czech Long-Term Visa / Residence Permit for Studies allows international students to enroll in accredited degree programs at world-renowned Czech universities such as Charles University and CTU Prague. International students studying in an accredited university program have free access to the Czech labour market with no work permit required. Following graduation from an accredited Czech university, graduates can apply for a 9-month Job Seeker Residence Permit to find qualified employment.',
    'denmark': 'The Danish Student Residence Permit (ST1) allows international students to study at universities and higher education academies in Denmark. Non-EU students are legally permitted to work up to 20 hours per week during the academic year (September to May) and full-time (37 hours per week) during the summer holidays (June, July, and August). Following graduation, students can apply for a 3-year Post-Study Establishment Card to live and work in Denmark without requiring sponsor-based work permits.',
    'finland': 'The Finnish Student Residence Permit allows international students to pursue bachelor, master, and doctoral degree programs at Finnish universities and universities of applied sciences (UAS). Finland offers the world\'s most generous student work rights, permitting up to 30 hours of work per week during the academic term. Following graduation, degree holders can apply for a 2-year Job Search Residence Permit to look for work or start an enterprise.',
    'hungary': 'The Hungarian Long-Term Student Visa (Type D / Residence Permit for Studies) allows international students to enroll in full-time programs at prestigious Hungarian universities. Many Indian students study under the fully funded Stipendium Hungaricum scholarship. Students are entitled to work up to 24 hours per week during semester time and up to 66 days or 90 days per year outside semester periods. Graduates can transition to the 9-month Study-to-Work Residence Permit to seek employment in Hungary.',
    'iceland': 'The Icelandic Student Residence Permit allows international students to undertake full-time higher education at recognized universities in Iceland (such as the University of Iceland and Reykjavik University). Non-EEA students must apply for a specific student work permit to work up to 15 hours per week during the academic semester, with full-time work permitted during summer vacations. Following graduation, international students can obtain a 6-month residence permit to seek employment in Iceland.',
    'norway': 'The Norwegian Student Residence Permit allows international students to enroll in full-time bachelor, master, and doctoral programs at Norwegian universities. International students are permitted to work part-time up to 20 hours per week during academic semesters and full-time during official semester breaks. Following graduation from a Norwegian university or college, students can apply for a 1-year Job Seeker Residence Permit to seek employment as a skilled worker.',
    'poland': 'The Polish National Visa for Studies (Type D) enables international students to pursue degree programs at universities across Poland. Poland has become a major Central European educational hub with affordable tuition and living costs. Full-time international students studying at accredited Polish universities have the legal right to work without a separate work permit during their studies. Graduates can apply for a 9-month Temporary Residence Permit for Job Seekers following course completion.',
    'portugal': 'The Portuguese National Student Visa (Type D4 / D5) enables international students to undertake higher education at universities and polytechnics across Portugal. International students are permitted to work up to 20 hours per week during term time and full-time during holidays, subject to notifying the immigration authorities (AIMA). After graduation, international students from Portuguese universities can apply for a 1-year Temporary Residence Permit for Job Searching to secure skilled employment.',
    'sweden': 'The Swedish Residence Permit for Higher Education allows international students to enroll in degree programs at Swedish universities. Sweden offers an exceptional innovation and research ecosystem. International students in Sweden enjoy unrestricted work rights with no legal cap on weekly hours, provided they maintain satisfactory progress and attend mandatory classes. Following graduation, students can apply for a 12-month Residence Permit for Looking for Work or Starting a Business.',
    'switzerland': 'The Swiss National Visa for Study (National Visa Type D) permits international students to enroll in bachelor, master, and doctoral degree programs at top-ranked Swiss universities and Federal Institutes of Technology (ETH Zurich, EPFL). International students from non-EU/EFTA countries may work up to 15 hours per week during semesters, but only after completing 6 months of study in Switzerland; full-time work is permitted during semester vacations. Graduates can apply for a 6-month residence permit to seek employment in Switzerland.',
    'turkey': 'The Turkish Student Residence Permit (Öğrenci İkamet İzni) allows international students to enroll in associate, bachelor, master, and doctoral degree programs at Turkish universities under the Council of Higher Education (YÖK). Master\'s and PhD students are legally permitted to work part-time in accordance with Turkish labour regulations. Following completion of an undergraduate or postgraduate degree, graduates can apply for a short-term residence permit for job seeking or business establishment.',
    'argentina': 'The Argentine Student Visa (Residencia Temporaria por Estudio) allows international students to study at universities and higher institutes across Argentina (such as the University of Buenos Aires - UBA). Public higher education is tuition-free for undergraduate studies in Argentina. International students on a temporary study residence permit have the legal right to work in Argentina with equal labour protections. Following graduation, students can transition to professional work permits or permanent residency.',
    'netherlands': 'The Dutch Student Visa (MVV) and Residence Permit (VVR) allows international students to study at Dutch research universities and universities of applied sciences. Students may work part-time up to 16 hours per week during term time (requiring a TWV work permit filed by the employer) or full-time during the summer months (June to August). Under Dutch law, graduates can apply for a 1-year Orientation Year Visa (Zoekjaar) within 3 years of graduating to seek employment without sponsor salary minimums.',
  };
  return map[c] || `The Student Visa allows international students to reside in ${country} for the full duration of their academic program to undertake full-time higher education, vocational training, or research. You must maintain enrolment and comply with visa conditions.`;
}

// ── 2. STUDENT FEES ──
export function getStudentFees(country: string): { visa_fee: string; service_fee: string; total_fee: string; notes: string } {
  const c = normalizeCountry(country);
  const map: Record<string, any> = {
    'australia': { visa_fee: 'AUD 1,600 (approx. ₹88,000)', service_fee: '₹1,650 (VFS Global ABCC Biometrics)', total_fee: 'AUD 1,600 Base Application Charge', notes: 'Paid online via ImmiAccount. Excludes mandatory Overseas Student Health Cover (OSHC) of AUD 600-900/year and Bupa medical examinations.' },
    'uk': { visa_fee: '£490 (approx. ₹52,400)', service_fee: '£776/year (Immigration Health Surcharge - IHS)', total_fee: '£1,266+ (Visa £490 + Annual IHS £776)', notes: 'Paid online on GOV.UK. Mandatory IHS covers full NHS healthcare access during studies. Priority visa processing (+£500 for 5 days) available.' },
    'usa': { visa_fee: 'USD $185 (MRV Visa Fee - approx. ₹15,540)', service_fee: 'USD $350 (I-901 SEVIS Fee)', total_fee: 'USD $535 Total Statutory Reference', notes: 'SEVIS fee must be paid online via FMJfee.com prior to scheduling the consular interview. MRV visa fee is paid via the US Visa Scheduling portal.' },
    'canada': { visa_fee: 'CAD $150 (approx. ₹9,300)', service_fee: 'CAD $85 (Biometrics Fee)', total_fee: 'CAD $235 Total Government Charge', notes: 'Paid online via IRCC secure portal. Living expenses must be demonstrated through a Guaranteed Investment Certificate (GIC) of CAD $20,635.' },
    'germany': { visa_fee: '€75 (approx. ₹6,750)', service_fee: '₹18,000 (APS Verification) + ₹2,500 VFS logistics', total_fee: 'approx. ₹27,250 Total Consular Reference', notes: 'APS certificate verification by the Academic Evaluation Centre New Delhi is mandatory prior to visa submission. Visa fee waived for German government scholars.' },
    'france': { visa_fee: '€50 (approx. ₹4,500)', service_fee: '₹16,500 (Campus France EEF Processing) + VFS Logistics', total_fee: 'approx. ₹23,500 Total Statutory Reference', notes: 'Applicants must complete the mandatory Études en France (EEF) Campus France interview before lodging the visa file at VFS France.' },
    'ireland': { visa_fee: '€60 (Single Entry) / €100 (Multiple Entry)', service_fee: '€300 (Irish Residence Permit - IRP Card registration on arrival)', total_fee: '€360 – €400 Total Reference', notes: 'Paid online via AVATS portal. IRP registration fee (€300) is paid inside Ireland upon appointment with the Immigration Service Delivery (ISD).' },
    'italy': { visa_fee: '€50 (National Study Visa Fee)', service_fee: '€30 (VFS Global Service Fee) + €16 stamp duty (Marca da Bollo)', total_fee: 'approx. ₹8,500 Consular Total Reference', notes: 'Pre-enrolment must be completed online on the Universitaly portal. Declaration of Value (DOV) or CIMEA Statement of Comparability is mandatory for academic recognition.' },
    'new-zealand': { visa_fee: 'NZD $430 (approx. ₹21,500)', service_fee: 'NZD $35 (Immigration Levy)', total_fee: 'NZD $465 Total Reference', notes: 'Paid online via Immigration New Zealand Immigration Online portal. Excludes approved medical chest X-ray and full medical examination fees.' },
    'singapore': { visa_fee: 'SGD $30 (Application Processing Fee)', service_fee: 'SGD $60 (Issuance Fee) + SGD $30 (Multiple Journey Visa if applicable)', total_fee: 'SGD $90 – $120 Total Reference', notes: 'Paid online via the ICA SOLAR portal. Security deposit or medical examination may be requested by ICA depending on nationality.' },
    'japan': { visa_fee: '3,000 JPY (Single Entry - approx. ₹1,700)', service_fee: '₹750 – ₹1,200 (VFS Global Processing Fee)', total_fee: 'approx. ₹2,700 Total Reference', notes: 'The admitting Japanese university first secures the Certificate of Eligibility (COE) from regional immigration authorities in Japan before consular visa stamping in India.' },
    'austria': { visa_fee: '€160 (€120 application fee + €20 grant fee + €20 police fee)', service_fee: '€30 (VFS Service Fee)', total_fee: '€190 Total Reference (approx. ₹17,100)', notes: 'Initial application submitted through Austrian Embassy in New Delhi / VFS Global. Final biometric residence card issued in Austria by the local magistrate (MA 35 in Vienna).' },
    'belgium': { visa_fee: '€180 (Visa D Application Fee)', service_fee: '€235 (Federal Administrative Fee paid to Immigration Office DOFI)', total_fee: '€415 Total Reference (approx. ₹37,500)', notes: 'The federal administrative contribution (€235) must be paid directly into the Belgian Immigration Office bank account before lodging the visa application at VFS Belgium.' },
    'czech-republic': { visa_fee: 'CZK 2,500 (approx. €100 / ₹9,000)', service_fee: 'CZK 500 – 1,000 (VFS Global Processing Fee)', total_fee: 'approx. ₹10,500 Total Reference', notes: 'All non-Czech documents (police clearance, birth certificate) must be super-legalized or apostilled and accompanied by an official certified Czech translation.' },
    'denmark': { visa_fee: 'DKK 2,490 (approx. ₹30,000 - SIRI Case Order Fee)', service_fee: '€30 (VFS Global Biometrics Fee)', total_fee: 'DKK 2,490 + VFS Service Fee', notes: 'Case Order ID must be created on newtodenmark.dk and the statutory SIRI fee paid online before submitting biometric data at VFS Denmark.' },
    'finland': { visa_fee: '€350 (Electronic Application via Enter Finland)', service_fee: '€30 (VFS Global Biometrics Fee)', total_fee: '€380 Total Reference (approx. ₹34,200)', notes: 'Application is lodged online via the Enter Finland portal (enterfinland.fi). Private health insurance covering at least €120,000 in medical costs is required.' },
    'hungary': { visa_fee: '€110 (Residence Permit Application Fee)', service_fee: '€30 (VFS Global Processing Fee)', total_fee: '€140 Total Reference (approx. ₹12,600)', notes: 'Visa D serves as an entry vignette valid for 30 days. The physical Residence Permit card is collected upon arrival at the National Directorate-General for Aliens Policing (OIF).' },
    'iceland': { visa_fee: 'ISK 15,000 (approx. €100 / ₹9,000)', service_fee: '€30 (VFS Service Fee)', total_fee: 'approx. ₹11,700 Total Reference', notes: 'Application must be submitted to the Directorate of Immigration (Útlendingastofnun) in Iceland before arriving. Criminal record certificate apostilled or legalized is mandatory.' },
    'norway': { visa_fee: 'NOK 6,500 (approx. ₹51,000)', service_fee: '€30 (VFS Global Biometrics Fee)', total_fee: 'NOK 6,500 + VFS Service Fee', notes: 'Living expenses (NOK 151,690/year) must be deposited into the Norwegian university\'s student deposit bank account prior to visa issuance.' },
    'poland': { visa_fee: '€90 (National Visa D Application Fee)', service_fee: '€15 (VFS Global Processing Fee)', total_fee: '€105 Total Reference (approx. ₹9,450)', notes: 'Application is registered online on the official e-Konsulat platform (e-konsulat.gov.pl) and lodged at VFS Global Poland in India.' },
    'portugal': { visa_fee: '€90 (National Long-Stay Visa D Fee)', service_fee: '€30 (VFS Global Service Fee)', total_fee: '€120 Total Reference (approx. ₹10,800)', notes: 'The D-visa is a 4-month double-entry visa; upon arrival in Portugal, students attend an appointment at AIMA (Agency for Integration, Migration and Asylum) to obtain their residence permit card.' },
    'sweden': { visa_fee: 'SEK 1,500 (approx. ₹12,000)', service_fee: '€30 (VFS Global Biometrics Fee)', total_fee: 'SEK 1,500 + VFS Service Fee', notes: 'Applied online directly via the Swedish Migration Agency (Migrationsverket) portal before biometric capture at VFS Sweden.' },
    'switzerland': { visa_fee: '€90 (National Visa D Application Fee)', service_fee: 'CHF 100 – 250 (Cantonal Migration Authorization Fee upon arrival)', total_fee: 'approx. ₹18,000 – ₹25,000 Total Reference', notes: 'Visa application is lodged at VFS Switzerland in India. The cantonal migration office in Switzerland evaluates and approves the student residence permit.' },
    'turkey': { visa_fee: 'USD $60 (approx. ₹5,100)', service_fee: '₹3,500 (Gateway Globe VAC Service Fee)', total_fee: 'approx. ₹8,600 Total Reference', notes: 'Initial Student Visa sticker is obtained through Gateway Globe in India. Upon arrival, students register for the Öğrenci İkamet İzni through the e-Ikamet portal.' },
    'argentina': { visa_fee: 'USD $150 (Consular Visa Fee)', service_fee: 'ARS $10,000 – $20,000 (DGM Immigration Entry Fee on arrival)', total_fee: 'approx. ₹15,000 Total Reference', notes: 'The university in Argentina must register the student on the SINEP / DGM platform before visa issuance at the Embassy of Argentina in New Delhi.' },
    'netherlands': { visa_fee: '€228 (IND Student Residence Permit Fee)', service_fee: '€30 (VFS Global Biometrics Fee)', total_fee: '€258 Total Reference (approx. ₹23,200)', notes: 'The admitting Dutch university submits the MVV/VVR application directly to the Immigration and Naturalisation Service (IND) on the student\'s behalf.' },
  };
  return map[c] || { visa_fee: 'Official Statutory Fee', service_fee: 'VAC Logistics Fee', total_fee: 'Statutory Fee + Logistics', notes: 'Check official embassy portal.' };
}

// ── 3. STUDENT PROCESSING TIME ──
export function getStudentProcessingTime(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'australia': '4 to 8 Weeks (Standard Higher Education Sector)',
    'uk': '3 Weeks (15 Working Days) Standard Processing',
    'usa': 'Consular Decision at Interview Window (Passport return in 3-5 Business Days)',
    'canada': '6 to 10 Weeks (Standard Assessment Timeline)',
    'germany': '4 to 8 Weeks from Document Submission at VFS Global',
    'france': '2 to 4 Weeks following Campus France Interview and VFS submission',
    'ireland': '4 to 8 Weeks from Document Submission at VFS Ireland',
    'italy': '3 to 6 Weeks following VFS submission and Consular review',
    'new-zealand': '4 to 6 Weeks from Online Submission',
    'singapore': '10 to 15 Working Days (via ICA SOLAR system)',
    'japan': '5 to 7 Working Days (following COE issuance in Japan)',
    'austria': '8 to 12 Weeks from Document Lodgement',
    'belgium': '4 to 8 Weeks from Physical Submission at VFS Global',
    'czech-republic': '60 Calendar Days statutory consular SLA',
    'denmark': '2 Months (60 Days) from Biometric Capture',
    'finland': '1 to 2 Months from Biometric Verification at VFS Global',
    'hungary': '15 to 30 Calendar Days from Consular Submission',
    'iceland': '6 to 12 Weeks from Complete Dossier Receipt',
    'norway': '2 Months (8 Weeks) from Biometric Submission',
    'poland': '15 to 30 Calendar Days from Consular Receipt',
    'portugal': '30 to 60 Calendar Days from Lodgement',
    'sweden': '2 to 3 Months from Online Submission',
    'switzerland': '8 to 12 Weeks from Consular Lodgement',
    'turkey': '15 to 25 Working Days from Gateway Globe Submission',
    'argentina': '3 to 6 Weeks from Consular Lodgement',
    'netherlands': '2 to 4 Weeks (Fast-Track University Filing)',
  };
  return map[c] || '4 to 8 Weeks (Standard Consular Assessment)';
}

// ── 4. STUDENT PROCESSING DETAILS ──
export function getStudentProcessingDetails(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'australia': 'Applications are processed under the simplified student visa framework (SSVF). Lodging with a Confirmation of Enrolment (CoE) and evidence of Genuine Student (GS) intent accelerates assessment.',
    'uk': 'UKVI standard processing is 3 weeks following biometric capture at VFS Global. Priority (5 days) and Super Priority (next business day) services are optional.',
    'usa': 'Requires a two-stage in-person appointment in India: Biometrics at a Visa Application Center (VAC) followed by an in-person consular interview at a US Embassy or Consulate.',
    'canada': 'Processed online via the IRCC portal. Provincial Attestation Letter (PAL) is mandatory for post-secondary undergraduate applications.',
    'germany': 'Processed by the German Embassy in New Delhi and Consulates General in Mumbai, Bengaluru, Chennai, and Kolkata following local foreigners authority (Ausländerbehörde) clearance.',
    'france': 'Two-tier verification: Academic interview with Campus France India followed by consular review and biometric capture through VFS Global France.',
    'ireland': 'Processed by the Embassy of Ireland in New Delhi. Ireland is NOT a Schengen member; visa requires direct national clearance.',
    'italy': 'Submitted via VFS Global Italy after pre-enrolment approval on the Universitaly portal by the Italian university.',
    'new-zealand': '100% digital application processed through Immigration New Zealand\'s Immigration Online platform. Electronic eVisa issued upon approval.',
    'singapore': 'Two-step digital process: The admitting educational institution files the SOLAR application, followed by the student submitting eForm 16 online.',
    'japan': 'Two phases: Phase 1 is Certificate of Eligibility (COE) processing in Japan (takes 2-3 months); Phase 2 is consular visa sticker processing at VFS Japan in India (takes 1 week).',
    'austria': 'Application dossier is transmitted from the Austrian Embassy in New Delhi to the responsible municipal authority (Magistrat / Bezirkshauptmannschaft) in Austria for adjudication.',
    'belgium': 'Processed by the Belgian Immigration Office (Dienst Vreemdelingenzaken / Office des Étrangers) in Brussels.',
    'czech-republic': 'Processed by the Department for Asylum and Migration Policy (OAMP) of the Ministry of the Interior of the Czech Republic.',
    'denmark': 'Processed electronically by the Danish Agency for International Recruitment and Integration (SIRI).',
    'finland': 'Processed digitally by the Finnish Immigration Service (Migri) via Enter Finland.',
    'hungary': 'Processed by the National Directorate-General for Aliens Policing (OIF) in Hungary via Hungarian consular missions in India.',
    'iceland': 'Adjudicated directly by the Directorate of Immigration (Útlendingastofnun) in Iceland.',
    'norway': 'Applied online via the UDI Application Portal (udi.no) followed by physical document submission at VFS Norway.',
    'poland': 'Processed by the Consular Section of the Embassy of the Republic of Poland in New Delhi.',
    'portugal': 'Processed by the Consular Section of the Embassy of Portugal in New Delhi in coordination with AIMA in Lisbon.',
    'sweden': 'Processed centrally by the Swedish Migration Agency (Migrationsverket) in Sweden.',
    'switzerland': 'Tri-level review: Swiss Consulate in India reviews dossier, transmits to the Cantonal Migration Authority (e.g. Zurich, Vaud, Geneva), with federal approval by SEM.',
    'turkey': 'Processed by the Turkish Embassy in New Delhi and General Consulates in Mumbai/Hyderabad.',
    'argentina': 'Processed by the Consular Section of the Embassy of the Argentine Republic in New Delhi.',
    'netherlands': 'The Dutch university files the TEV (entry and residence) application directly with IND in the Netherlands.',
  };
  return map[c] || 'Processing timelines depend on intake volume, completeness of academic documentation, and consular review.';
}

// ── 5. STUDENT ENTRY TYPE ──
export function getStudentEntryType(country: string): string {
  return 'Multiple Entry (Academic Duration)';
}

export function getStudentEntryDetails(country: string): string {
  return 'Authorized for multiple entries throughout the valid period of study and approved academic vacation breaks.';
}

// ── 6. STUDENT VALIDITY & STAY ──
export function getStudentValidity(country: string): string {
  return 'Duration of Academic Program + 2 to 4 Months';
}

export function getStudentValidityDetails(country: string): string {
  return 'Valid for the full registered length of your higher education degree, plus grace period for graduation and visa transition.';
}

export function getStudentStayDuration(country: string): string {
  return 'Full Course Duration (Maintained Enrolment)';
}

export function getStudentStayDetails(country: string): string {
  return 'Authorized to remain in-country as long as you maintain full-time student status and satisfactory academic progress.';
}

// ── 7. OFFICIAL SOURCE NAME ──
export function getStudentOfficialSourceName(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'australia': 'Department of Home Affairs (ImmiAccount) / VFS Global Australia',
    'uk': 'UK Visas and Immigration (UKVI / GOV.UK) / VFS Global',
    'usa': 'U.S. Department of State / US Embassy & Consulates in India',
    'canada': 'Immigration, Refugees and Citizenship Canada (IRCC) / VFS Global',
    'germany': 'German Federal Foreign Office / German Missions in India & VFS Global',
    'france': 'Campus France India & Ministry of the Interior (France-Visas) / VFS Global',
    'ireland': 'Immigration Service Delivery (ISD / AVATS) / Embassy of Ireland & VFS Global',
    'italy': 'Ministry of Foreign Affairs and International Cooperation (MAECI / Universitaly) / VFS Global',
    'new-zealand': 'Immigration New Zealand (INZ / Immigration Online)',
    'singapore': 'Immigration & Checkpoints Authority (ICA Singapore / SOLAR System)',
    'japan': 'Immigration Services Agency of Japan (MOJ) / Embassy of Japan & VFS Global',
    'austria': 'Austrian Federal Ministry of the Interior (BMI / OeAD) / Austrian Embassy & VFS Global',
    'belgium': 'Belgian Immigration Office (DOFI) / Embassy of Belgium & VFS Global',
    'czech-republic': 'Ministry of the Interior of the Czech Republic (MOI / OAMP) / Czech Embassy & VFS Global',
    'denmark': 'Danish Agency for International Recruitment and Integration (SIRI) / VFS Global',
    'finland': 'Finnish Immigration Service (Migri / Enter Finland) / VFS Global',
    'hungary': 'National Directorate-General for Aliens Policing (OIF) / Hungarian Embassy & VFS Global',
    'iceland': 'Directorate of Immigration Iceland (Útlendingastofnun) / Danish Embassy (Representation)',
    'norway': 'Norwegian Directorate of Immigration (UDI) / Royal Norwegian Embassy & VFS Global',
    'poland': 'Ministry of Foreign Affairs of Poland (e-Konsulat) / VFS Global',
    'portugal': 'Agency for Integration, Migration and Asylum (AIMA) / Embassy of Portugal & VFS Global',
    'sweden': 'Swedish Migration Agency (Migrationsverket) / Embassy of Sweden & VFS Global',
    'switzerland': 'State Secretariat for Migration (SEM) & Cantonal Migration Offices / VFS Global Switzerland',
    'turkey': 'Presidency of Migration Management (GÖÇ / e-Ikamet) / Gateway Globe',
    'argentina': 'National Directorate of Migration (DGM / Migraciones Argentina) / Embassy of Argentina',
    'netherlands': 'Immigration and Naturalisation Service (IND) / Dutch Ministry of Foreign Affairs & VFS Global',
  };
  return map[c] || `${country} Ministry of Foreign Affairs / Immigration Department`;
}

// ── 8. FINANCIAL PROOFS ──
export function getStudentFinancialProofs(country: string): FinancialProofItem[] {
  const c = normalizeCountry(country);
  const d = DESTS[c] || DESTS['germany'];
  return [
    { type: 'Living Expenses Maintenance', minimum_balance_or_amount: d.min_funds, time_frame: 'Held for past 28 days to 6 months', notes: 'Original bank statement with bank seal, certificate of deposit, or approved blocked account.' },
    { type: 'Tuition Fee Proof / Receipt', minimum_balance_or_amount: '1st Academic Year Tuition Fee', time_frame: 'Prior to visa lodgement', notes: 'Official fee payment receipt issued by the admitting educational institution.' },
    { type: 'Education Loan Sanction Letter', minimum_balance_or_amount: 'Covers full tuition and living shortfall', time_frame: 'Current academic year', notes: 'Sanction letter from a scheduled commercial bank confirming unencumbered disbursement.' },
    { type: 'Sponsor\'s Income Tax Returns (ITR-V)', minimum_balance_or_amount: 'Past 2 to 3 Assessment Years', time_frame: 'Assessment years 2022-2025', notes: 'Accompanied by Affidavit of Financial Support from parents/primary sponsors.' }
  ];
}

// ── 9. OTHER REQUIREMENTS ──
export function getStudentOtherRequirements(country: string): OtherRequirementItem[] {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  return [
    { category: 'Academic Acceptance', details: d ? `${d['acceptance_doc']} from an accredited university.` : 'Unconditional acceptance letter from an accredited education provider.' },
    { category: 'Financial Solvency', details: d ? `Proof of living expenses (${d['min_funds']}) and tuition coverage.` : 'Verifiable proof of liquid funds covering full tuition and living expenses.' },
    { category: 'Language Proficiency', details: 'Official standardized test score report (IELTS Academic, TOEFL iBT, PTE Academic, or official language waiver).' },
    { category: 'Health Insurance & Integrity', details: 'Comprehensive international student medical coverage, medical chest X-ray, and Police Clearance Certificate (PCC).' }
  ];
}

// ── 10. STEPS TO APPLY ──
export function getStudentVisaSteps(countryOrFrom: string, maybeCountry?: string): string[] {
  const country = maybeCountry || countryOrFrom;
  const c = normalizeCountry(country);
  const d = DESTS[c];
  const cname = country;
  const portal = d ? d['source'] : 'Official Government Visa Portal';
  const doc = d ? d['acceptance_doc'] : 'Confirmation of Enrolment';
  const funds = d ? d['min_funds'] : 'statutory living allowance';
  return [
    `Secure Academic Admission: Obtain unconditional offer letter and official acceptance document (${doc}) from your chosen institution in ${cname}.`,
    `Arrange Financial Proofs: Deposit required statutory living funds (${funds}) into a blocked account, personal bank account, or secure a bank education loan sanction.`,
    `Clear Health & Background Checks: Undergo designated panel physician medical examinations and obtain a Police Clearance Certificate (PCC) from the Regional Passport Office (RPO).`,
    `Complete Online Application: Complete the official student visa application via ${portal} and upload certified copies of all academic transcripts, SOP, and financial proofs.`,
    `Book & Attend Biometrics Appointment: Schedule and attend your biometric appointment at the designated Visa Application Center (VFS Global / Consular section) to provide fingerprints and digital photo.`,
    `Attend Consular Interview (if applicable): Articulate your genuine student intent, course curriculum choice, and future career plans during the consular visa interview.`,
    `Collect Passport & Prepare Travel: Upon visa vignette approval or electronic grant notice, verify visa details, purchase flight tickets, and finalize student accommodation in ${cname}.`,
    `Arrive & Register: Upon arrival, register your local address with the municipal foreign registration authority to receive your biometric residence permit card.`
  ];
}

// ── 11. DOCUMENTS REQUIRED ──
export function getStudentDocuments(countryOrFrom: string, maybeCountry?: string): DocumentRequiredItem[] {
  const country = maybeCountry || countryOrFrom;
  const c = normalizeCountry(country);
  const d = DESTS[c];
  const doc = d ? d['acceptance_doc'] : 'University Acceptance Letter';
  const doc_desc = d ? d['acceptance_desc'] : 'Unconditional admission confirmation issued by accredited educational institution.';
  const funds = d ? d['min_funds'] : 'statutory living allowance';
  return [
    { title: 'Valid Passport', description: 'Original passport valid for at least 6-12 months beyond intended stay with at least 2 blank visa pages.', is_mandatory: true },
    { title: doc, description: doc_desc, is_mandatory: true },
    { title: 'Academic Certificates & Transcripts', description: 'Original degree certificates, mark sheets (Class 10th, 12th, Bachelor\'s), and provisional certificates.', is_mandatory: true },
    { title: 'English / Language Proficiency Score Report', description: 'Official score report (IELTS Academic, TOEFL iBT, PTE, Duolingo, or institutional language waiver).', is_mandatory: true },
    { title: 'Proof of Financial Means / Maintenance', description: `Verifiable proof of living funds (${funds}) via bank statements, loan sanction letter, or blocked account.`, is_mandatory: true },
    { title: 'Tuition Fee Payment Receipt', description: 'Official university fee receipt or transfer receipt confirming 1st semester/annual tuition payment.', is_mandatory: true },
    { title: 'Statement of Purpose (SOP) / Motivation Letter', description: 'Comprehensive personal statement explaining course selection, academic background, and post-study career trajectory.', is_mandatory: true },
    { title: 'Letters of Recommendation (LORs) & CV', description: 'Two academic or professional recommendation letters along with an updated academic curriculum vitae.', is_mandatory: true },
    { title: 'Student Health & Medical Insurance', description: 'Valid international student health insurance policy covering emergency hospitalization, medical evacuation, and repatriation.', is_mandatory: true },
    { title: 'Biometric Passport Photographs', description: 'Recent color photographs meeting specific consular biometric dimensions on white/light grey background.', is_mandatory: true }
  ];
}

// ── 12. FAQS ──
export function getStudentFAQ(country: string): FAQItem[] {
  const c = normalizeCountry(country);
  const d = DESTS[c];
  const cname = country;
  const work_term = d ? d['work_term'] : 'up to 20 hours per week';
  const work_break = d ? d['work_break'] : 'full-time during official vacation breaks';
  const post_study = d ? d['post_study'] : '1 to 2 years post-study work rights';
  const min_funds = d ? d['min_funds'] : 'statutory living maintenance';
  return [
    { question: `Can international students work part-time while studying in ${cname}?`, answer: `Yes, international students are permitted to work ${work_term} during academic terms and ${work_break} during scheduled semester breaks.` },
    { question: `What post-study work rights are available after graduating in ${cname}?`, answer: `Graduates of eligible higher education degree programs can apply for post-study work authorization for ${post_study} without requiring initial employer sponsorship.` },
    { question: `What are the financial maintenance proof requirements for a ${cname} student visa?`, answer: `You must demonstrate minimum financial resources covering ${min_funds} through personal or sponsor bank accounts, official education loan sanctions, or an approved blocked deposit account.` },
    { question: `Can I bring my spouse or dependents on a student visa to ${cname}?`, answer: `Spouse and dependent accompaniment is generally permitted for students enrolled in postgraduate research programs (Master\'s research or PhD), allowing spouses full work authorization in most destinations.` },
    { question: `What happens if my ${cname} student visa application is refused?`, answer: `You will receive an official refusal letter detailing specific reasons (e.g. financial sufficiency, genuine student intent). You have the right to request an administrative review, file a consular appeal within 15-30 days, or submit a fresh application addressing the refusal points.` }
  ];
}

// ── 13. COMPLETE STUDENT VISA DATA BUILDER ──
export function getStudentVisaData(
  from: string,
  to: string,
  purpose: string = 'Higher Education / Studies'
): StructuredVisaRequirements {
  const c = normalizeCountry(to);
  const countryName = to;
  const officialSource = getStudentOfficialSourceName(to);
  const procTime = getStudentProcessingTime(to);
  const procDetails = getStudentProcessingDetails(to);
  const val = getStudentValidity(to);
  const stay = getStudentStayDuration(to);
  const entryType = getStudentEntryType(to);
  const fees = getStudentFees(to);
  const faqs = getStudentFAQ(to);
  const docs = getStudentDocuments(to);
  const steps = getStudentVisaSteps(to);
  const reqs = getStudentOtherRequirements(to);
  const proofs = getStudentFinancialProofs(to);

  return {
    passport_country: from,
    destination_country: countryName,
    purpose_of_visit: 'Higher Education / Studies',
    visa_type: `${countryName} Student Visa`,
    source_url: `https://www.google.com/search?q=${encodeURIComponent(countryName + ' student visa official consular requirements')}`,
    official_source_name: officialSource,
    overview: getStudentOverview(to),
    how_to_apply: steps,
    documents_required: docs,
    costs: fees,
    processing_time: procTime,
    processing_time_details: procDetails,
    other_requirements: reqs,
    financial_proofs: proofs,
    faqs: faqs,
    validity: val,
    validity_details: getStudentValidityDetails(to),
    stay_duration: stay,
    stay_duration_details: getStudentStayDetails(to),
    entry_type: entryType,
    entry_type_details: getStudentEntryDetails(to),
    validity_and_stay: {
      visa_validity: val,
      max_stay_per_entry: stay,
      entry_type: entryType
    },
    processing_and_timing: {
      apply_window: 'Apply 2 to 3 months prior to academic program start date.',
      decision_time: procTime,
      max_extension: 'Renewable annually in-country based on satisfactory academic progression.',
      center_notes: `${officialSource}. Verify mandatory appointment slots and biometrics deadlines.`
    }
  };
}
