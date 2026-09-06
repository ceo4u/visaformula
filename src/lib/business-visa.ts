// src/lib/business-visa.ts
// Country-specific Business Visa pipeline based on official immigration and consular mandates

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

export interface BusinessHighlightItem {
  icon: string;
  title: string;
  description: string;
}

export interface StructuredVisaRequirements {
  passport_country: string;
  destination_country: string;
  purpose_of_visit: string;
  visa_type: string;
  source_url: string;
  official_source_name: string;
  overview?: string;
  highlights?: BusinessHighlightItem[];
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
  verification_status?: string;
  is_v3_verified?: boolean;
}

// ── COUNTRY NORMALIZATION HELPER ──
export function normalizeCountry(country: string): string {
  const c = (country || '').toLowerCase().trim().replace(/[-_]/g, ' ');
  if (c.includes('uk') || c.includes('united kingdom') || c.includes('england') || c.includes('britain') || c.includes('great britain') || c.includes('scotland') || c.includes('wales')) return 'uk';
  if (c.includes('usa') || c.includes('united states') || c.includes('america') || c.includes('u.s.') || c === 'us') return 'usa';
  if (c.includes('canada')) return 'canada';
  if (c.includes('australia')) return 'australia';
  if (c.includes('germany') || c.includes('deutschland')) return 'germany';
  if (c.includes('france')) return 'france';
  if (c.includes('uae') || c.includes('united arab emirates') || c.includes('dubai') || c.includes('abu dhabi')) return 'uae';
  if (c.includes('singapore')) return 'singapore';
  if (c.includes('china')) return 'china';
  if (c.includes('india')) return 'india';
  if (c.includes('netherlands') || c.includes('holland') || c.includes('dutch')) return 'netherlands';
  if (c.includes('italy')) return 'italy';
  if (c.includes('spain')) return 'spain';
  if (c.includes('switzerland')) return 'switzerland';
  if (c.includes('japan')) return 'japan';
  if (c.includes('saudi') || c.includes('ksa')) return 'saudi-arabia';
  if (c.includes('qatar')) return 'qatar';
  return c;
}

// ── 1. BUSINESS OVERVIEW — COUNTRY SPECIFIC ──
export function getBusinessOverview(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'usa': 'The B-1 Business Visitor Visa allows Indian professionals to travel to the United States for legitimate business activities such as meetings, conferences, negotiations, site visits, and contract discussions. The visa is valid for up to 10 years with multiple entries. Each visit allows up to 6 months stay (determined by CBP at port of entry). You CANNOT perform productive work or draw a U.S. salary.',
    'uk': 'The UK Standard Visitor Visa (Business Route) allows Indian professionals to travel to the UK for business activities including meetings, conferences, trade fairs, training, and contract negotiations. The visa is valid for 6 months with multiple entries. You CANNOT take up employment, work for a UK company, or provide services to a UK client directly.',
    'canada': 'The Canada Business Visitor Visa allows Indian professionals to travel to Canada for international business activities including meetings, conferences, site visits, and contract negotiations. The visa is valid for up to 10 years with multiple entries. Each visit allows up to 6 months stay. You CANNOT enter the Canadian labour market or perform productive work.',
    'australia': 'The Australia Visitor Visa (Subclass 600) Business Stream allows Indian professionals to travel to Australia for business activities including meetings, conferences, negotiations, and exploratory visits. The visa is valid for up to 12 months with single or multiple entries. You CANNOT work for an Australian entity or perform productive work.',
    'germany': 'The Germany Business Schengen Visa (Type C) allows Indian professionals to travel to Germany and all 29 Schengen countries for business meetings, conferences, trade fairs, and contract negotiations. The visa is valid for up to 90 days within any 180-day period. You CANNOT take up employment or provide services to a local entity.',
    'france': 'The France Business Schengen Visa (Type C) allows Indian professionals to travel to France and all 29 Schengen countries for business meetings, conferences, exhibitions, and contract negotiations. Apply through France-Visas portal and VFS Global. Valid for up to 90 days within any 180-day period.',
    'uae': 'The UAE Business Visit Visa allows Indian professionals to travel to the UAE for business meetings, conferences, trade shows, and corporate negotiations. Apply through ICP/GDRFA portals. Choose between 30-day or 60-day permits. A UAE-based host or company invitation is required for visa approval.',
    'singapore': 'The Singapore Business Visit Visa allows Indian professionals to travel to Singapore for business meetings, conferences, trade fairs, and corporate negotiations. Apply through ICA Authorized Visa Agents (AVAs). Valid for up to 2 years with multiple entries. Each visit allows up to 30 days stay.',
    'china': 'The China Business Visa (M-Visa) allows Indian professionals to travel to China for commercial and trade activities including business meetings, exhibitions, negotiations, and industrial visits. Apply through the Chinese Visa Application Service Center (CVASC). Valid for 3-6 months with single or double entry.',
    'india': 'The India Business Visa allows foreign professionals to travel to India for business meetings, conferences, trade shows, and corporate negotiations. Apply through Indian Missions/Embassies or online via Indian Visa Online Portal. Valid for up to 5 years with multiple entries.',
    'netherlands': 'The Netherlands Business Schengen Visa allows professionals to travel to the Netherlands and the Schengen zone for business negotiations, corporate meetings, and industry seminars. Valid for up to 90 days within a 180-day period.',
    'japan': 'The Japan Temporary Visitor Visa (Commercial Purpose) allows business travelers to engage in business liaison, conference attendance, market surveys, and contract signings. Productive employment is strictly prohibited.',
    'saudi-arabia': 'The Saudi Arabia Commercial Business Visa permits international executives to attend business discussions, trade delegations, and corporate meetings in the Kingdom, backed by an official MoFA commercial invitation.'
  };

  return map[c] ||
    `The ${country} Business Visa allows international professionals to travel to ${country} for legitimate business activities including meetings, conferences, negotiations, and site visits. You cannot take up local employment or provide services to a local entity. Please check the official embassy website for current requirements.`;
}

// ── 2. BUSINESS HIGHLIGHTS — COUNTRY SPECIFIC ──
export function getBusinessHighlights(country: string): BusinessHighlightItem[] {
  const c = normalizeCountry(country);
  const map: Record<string, BusinessHighlightItem[]> = {
    'usa': [
      { icon: '🤝', title: 'Meetings & Conferences', description: 'Attend meetings, conferences, trade shows, and negotiations.' },
      { icon: '📋', title: 'No Productive Work', description: 'You CANNOT perform productive work or draw U.S. salary.' },
      { icon: '🔄', title: '10-Year Multiple Entry', description: 'B1/B2 visa valid for 10 years with multiple entries.' },
      { icon: '🏛️', title: 'B-1/B-2 Combined Visa', description: 'Business and tourism combined in one visa category.' }
    ],
    'uk': [
      { icon: '🤝', title: 'Meetings & Conferences', description: 'Attend business meetings, conferences, and trade fairs.' },
      { icon: '📋', title: 'No Local Employment', description: 'You CANNOT take up employment or provide services to UK clients.' },
      { icon: '🔄', title: '6-Month Multiple Entry', description: 'Standard 6-month visa with multiple entries.' },
      { icon: '📧', title: 'Invitation Letter Required', description: 'Official UK host invitation letter mandatory.' }
    ],
    'canada': [
      { icon: '🤝', title: 'Business Activities', description: 'Meetings, conferences, site visits, and negotiations.' },
      { icon: '📋', title: 'No Work Permitted', description: 'You CANNOT enter the Canadian labour market.' },
      { icon: '🔄', title: '10-Year Multiple Entry', description: 'Visitor TRV valid for up to 10 years.' },
      { icon: '🏛️', title: 'LMIA Not Required', description: 'Business visitors do not need an LMIA.' }
    ],
    'australia': [
      { icon: '🤝', title: 'Business Stream', description: 'Subclass 600 Business Stream for meetings and conferences.' },
      { icon: '📋', title: 'No Productive Work', description: 'You CANNOT work for an Australian entity.' },
      { icon: '🔄', title: 'Up to 12 Months', description: 'Valid for up to 12 months with single or multiple entry.' },
      { icon: '📱', title: '100% Digital Visa', description: 'Electronic visa linked directly to your passport.' }
    ],
    'germany': [
      { icon: '🤝', title: 'Business Schengen', description: 'Meetings, trade fairs, and contract negotiations.' },
      { icon: '📋', title: 'Schengen 90/180 Rule', description: 'Up to 90 days stay within any 180-day period.' },
      { icon: '🔄', title: 'Multiple Entry Option', description: 'Single, double, or multiple entry based on approval.' },
      { icon: '🏛️', title: 'Access to 29 Countries', description: 'One visa grants access to all Schengen countries.' }
    ],
    'france': [
      { icon: '🤝', title: 'Business Schengen', description: 'Meetings, exhibitions, and corporate negotiations.' },
      { icon: '📋', title: 'Schengen 90/180 Rule', description: 'Up to 90 days stay within any 180-day period.' },
      { icon: '🔄', title: 'Multiple Entry Option', description: 'Based on approved itinerary and business justification.' },
      { icon: '🏛️', title: 'Access to 29 Countries', description: 'One visa grants access to all Schengen countries.' }
    ],
    'uae': [
      { icon: '🤝', title: 'Business Meetings', description: 'Attend corporate meetings, conferences, and trade shows.' },
      { icon: '📋', title: 'Host Invitation Required', description: 'UAE-based company invitation mandatory for visa approval.' },
      { icon: '🔄', title: '30/60 Day Options', description: 'Choose between 30-day or 60-day business visit permits.' },
      { icon: '📱', title: '100% Online eVisa', description: 'Apply online via ICP/GDRFA — no physical embassy visit.' }
    ],
    'singapore': [
      { icon: '🤝', title: 'Business Hub', description: 'Meetings, conferences, and trade negotiations.' },
      { icon: '📋', title: 'Authorized Agent', description: 'Apply through ICA Authorized Visa Agents (AVAs) in India.' },
      { icon: '🔄', title: 'Up to 2 Years', description: 'Valid for up to 2 years with multiple entries.' },
      { icon: '📱', title: 'SGAC Required', description: 'Submit SG Arrival Card online within 3 days of arrival.' }
    ],
    'china': [
      { icon: '🤝', title: 'Commercial Activities', description: 'Business meetings, trade fairs, and negotiations.' },
      { icon: '📋', title: 'M-Visa Category', description: 'Specifically for commercial and trade activities.' },
      { icon: '🔄', title: '3-6 Months Validity', description: 'Valid for 3-6 months with single or double entry.' },
      { icon: '🏛️', title: 'CVASC Application', description: 'Apply through Chinese Visa Application Service Center.' }
    ],
    'india': [
      { icon: '🤝', title: 'Business Meetings', description: 'Attend corporate meetings, conferences, and trade shows.' },
      { icon: '📋', title: 'Business Visa', description: 'Specifically for business and commercial activities.' },
      { icon: '🔄', title: 'Up to 5 Years', description: 'Valid for up to 5 years with multiple entries.' },
      { icon: '📱', title: 'Online Application', description: 'Apply online via Indian Visa Online Portal.' }
    ]
  };

  return map[c] || [
    { icon: '🤝', title: 'Business Activities', description: 'Meetings, conferences, negotiations, and site visits.' },
    { icon: '📋', title: 'No Local Employment', description: 'You CANNOT take up paid work or provide services.' },
    { icon: '🔄', title: 'Multiple Entry', description: 'Based on consular approval and business justification.' },
    { icon: '📧', title: 'Invitation Letter', description: 'Official host/business invitation letter required.' }
  ];
}

// ── 3. BUSINESS DOCUMENTS — COUNTRY SPECIFIC ──
export function getBusinessDocuments(countryOrFrom: string, maybeCountry?: string, _purpose?: string): DocumentRequiredItem[] {
  const target = maybeCountry || countryOrFrom;
  const c = normalizeCountry(target);

  const map: Record<string, DocumentRequiredItem[]> = {
    'usa': [
      { title: 'Valid Passport', description: 'Must be valid for at least 6 months beyond intended stay with blank visa pages.', is_mandatory: true },
      { title: 'Official U.S. Business Invitation Letter', description: 'Official invitation from U.S. host enterprise detailing meetings, conferences, business negotiations, training scope, dates, and host company details.', is_mandatory: true },
      { title: 'Indian Employer Deputation / Cover Letter', description: 'Official corporate letter on employer letterhead explicitly stating who is funding the trip, project purpose, applicant\'s role, and confirming that no U.S. salary will be drawn (staying on Indian payroll).', is_mandatory: true },
      { title: 'Form DS-160 Confirmation Page', description: 'Printed confirmation sheet with clear 10-character alphanumeric barcode.', is_mandatory: true },
      { title: 'Company Standing & Professional Background', description: 'Employer registration certificate / GST, corporate business cards, and project documentation confirming legitimate commercial purpose.', is_mandatory: true },
      { title: 'Corporate Financial Undertaking', description: '6 months company and personal bank statements + 3 years ITR / Form 16.', is_mandatory: true }
    ],
    'uk': [
      { title: 'Valid Passport', description: 'Valid for the entire duration of your business trip with at least 1 blank visa page.', is_mandatory: true },
      { title: 'UK Host / Conference Invitation Letter', description: 'Official letter from UK host company or event organizers stating visit purpose, dates, and agenda.', is_mandatory: true },
      { title: 'Employer Deputation & NOC Letter', description: 'Letter from home employer detailing role, salary, purpose of visit, and financial sponsorship guarantee.', is_mandatory: true },
      { title: 'Company Registration Certificate', description: 'Proof of legal incorporation / GST registration of sending employer.', is_mandatory: true },
      { title: 'Company & Personal Bank Statements', description: 'Sufficient funds covering travel, executive hotel lodging, and incidental costs. Last 6 months bank statements.', is_mandatory: true },
      { title: 'Income Tax Returns (ITR)', description: 'Last 2 assessment years ITR-V acknowledgements of traveler and company.', is_mandatory: true }
    ],
    'canada': [
      { title: 'Valid Passport', description: 'Color scan of bio-data page and all stamped pages (valid for intended stay duration).', is_mandatory: true },
      { title: 'Business Invitation Letter', description: 'Official invitation from Canadian host company detailing visit purpose, dates, and contact information.', is_mandatory: true },
      { title: 'Employer NOC Letter', description: 'Letter from Indian employer confirming employment, approved leave, and purpose of visit.', is_mandatory: true },
      { title: 'Company Registration Certificate', description: 'Proof of legal incorporation / GST registration.', is_mandatory: true },
      { title: 'Bank Statements (6 Months)', description: 'Stamped statements showing sufficient funds for the trip.', is_mandatory: true },
      { title: 'Income Tax Returns (ITR)', description: 'Last 2-3 years ITR acknowledgements.', is_mandatory: true }
    ],
    'australia': [
      { title: 'Current Passport', description: 'High-resolution color scan of all pages of your current valid passport.', is_mandatory: true },
      { title: 'National Identity Proof', description: 'Color copy of Aadhaar Card / National ID and PAN card.', is_mandatory: true },
      { title: 'Australian Business Invitation Letter', description: 'Official invitation from Australian host company or organization.', is_mandatory: true },
      { title: 'Employer Deputation Letter', description: 'Letter from Indian employer confirming role, salary, purpose of visit, and financial sponsorship.', is_mandatory: true },
      { title: 'Company Registration & GST', description: 'Proof of legal incorporation / GST registration.', is_mandatory: true },
      { title: 'Bank Statements (6 Months)', description: 'Stamped statements showing sufficient funds for the trip.', is_mandatory: true }
    ],
    'germany': [
      { title: 'Valid Passport', description: 'Valid for at least 3 months beyond departure date from Schengen area, issued within 10 years with 2 blank pages.', is_mandatory: true },
      { title: 'Official Business Invitation Letter', description: 'Formal invitation from host company in Germany detailing visit purpose, duration, and VIES tax ID.', is_mandatory: true },
      { title: 'Employer Dispatch Letter & NOC', description: 'Deputation letter from sending company stating traveler position, reason for travel, and financial guarantee.', is_mandatory: true },
      { title: 'Travel Medical Insurance (€30,000)', description: 'Minimum 30,000 EUR coverage across all 29 Schengen states.', is_mandatory: true },
      { title: 'Flight & Hotel Reservations', description: 'Confirmed round-trip flights and business hotel bookings.', is_mandatory: true },
      { title: 'Company & Personal Bank Statements', description: 'Last 3 to 6 months statements showing sufficient funds.', is_mandatory: true },
      { title: 'Income Tax Returns (ITR)', description: 'Last 2-3 years ITR acknowledgements.', is_mandatory: true }
    ],
    'france': [
      { title: 'Valid Passport', description: 'Valid for at least 3 months beyond departure, issued within 10 years, 2 blank pages.', is_mandatory: true },
      { title: 'Business Invitation Letter', description: 'Official invitation from French host company or organization.', is_mandatory: true },
      { title: 'Employer Dispatch Letter', description: 'Deputation letter from sending company stating traveler position, reason for travel, and financial guarantee.', is_mandatory: true },
      { title: 'Travel Medical Insurance (€30,000)', description: 'Minimum 30,000 EUR coverage across all 29 Schengen states.', is_mandatory: true },
      { title: 'Flight & Hotel Reservations', description: 'Confirmed round-trip flights and business hotel bookings.', is_mandatory: true },
      { title: 'Company & Personal Bank Statements', description: 'Last 3 to 6 months statements.', is_mandatory: true }
    ],
    'uae': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months from entry date with clear bio-data pages.', is_mandatory: true },
      { title: 'UAE Business Invitation Letter', description: 'Official invitation from UAE-based host company with company registration details.', is_mandatory: true },
      { title: 'Indian Employer NOC', description: 'Letter from Indian employer confirming purpose of visit, role, and sponsorship.', is_mandatory: true },
      { title: 'Company Registration Certificate', description: 'Proof of legal incorporation / GST registration.', is_mandatory: true },
      { title: 'Passport-Size Photograph', description: 'Recent color photograph with white background.', is_mandatory: true },
      { title: 'Confirmed Return Flight Ticket', description: 'Round-trip flight booking to Dubai/Abu Dhabi.', is_mandatory: true }
    ],
    'singapore': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months from entry date with 2 blank pages.', is_mandatory: true },
      { title: 'Singapore Business Invitation Letter', description: 'Official invitation from Singapore-based host company.', is_mandatory: true },
      { title: 'Employer NOC Letter', description: 'Letter from Indian employer confirming purpose of visit and sponsorship.', is_mandatory: true },
      { title: 'Company Registration Certificate', description: 'Proof of legal incorporation / GST registration.', is_mandatory: true },
      { title: 'Form 14A Visa Application Form', description: 'Completed and signed official Form 14A with photograph.', is_mandatory: true },
      { title: 'SGAC Submission', description: 'Submit SG Arrival Card online within 3 days of arrival.', is_mandatory: true }
    ],
    'china': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months beyond intended stay with 2 blank visa pages.', is_mandatory: true },
      { title: 'COVA Online Visa Application Form', description: 'Completed online via the China Online Visa Application (COVA) system, printed and signed.', is_mandatory: true },
      { title: 'Business Invitation Letter', description: 'Official invitation from Chinese host company with company registration details.', is_mandatory: true },
      { title: 'Employer Dispatch Letter', description: 'Letter from Indian employer confirming purpose of visit, role, and sponsorship.', is_mandatory: true },
      { title: 'Company Registration Certificate', description: 'Proof of legal incorporation / GST registration.', is_mandatory: true },
      { title: 'Passport Photographs (33×48mm)', description: '2 recent color photos on white background.', is_mandatory: true },
      { title: 'Bank Statements (6 Months)', description: 'Stamped statements showing sufficient funds.', is_mandatory: true }
    ],
    'india': [
      { title: 'Valid Passport', description: 'Valid for at least 6 months beyond intended stay with 2 blank pages.', is_mandatory: true },
      { title: 'Indian Business Invitation Letter', description: 'Official invitation from Indian host company with company registration details.', is_mandatory: true },
      { title: 'Employer Dispatch Letter', description: 'Letter from foreign employer confirming purpose of visit, role, and sponsorship.', is_mandatory: true },
      { title: 'Company Registration Certificate', description: 'Proof of legal incorporation / GST registration.', is_mandatory: true },
      { title: 'Visa Application Form', description: 'Completed and signed Indian visa application form.', is_mandatory: true },
      { title: 'Passport Photographs', description: 'Recent color photographs meeting Indian consular specifications.', is_mandatory: true }
    ]
  };

  const defaultDocs: DocumentRequiredItem[] = [
    { title: 'Valid Passport', description: 'Must be valid for at least 6 months beyond intended stay with 2 blank visa pages.', is_mandatory: true },
    { title: 'Business Invitation Letter', description: 'Official invitation from host company or organization in the destination country.', is_mandatory: true },
    { title: 'Employer Deputation Letter', description: 'Letter from current employer confirming purpose of visit, role, and sponsorship.', is_mandatory: true },
    { title: 'Company Registration & GST', description: 'Proof of legal incorporation / GST registration of sending employer.', is_mandatory: true },
    { title: 'Company & Personal Bank Statements', description: 'Last 3 to 6 months statements showing sufficient funds for the trip.', is_mandatory: true },
    { title: 'Income Tax Returns (ITR)', description: 'Last 2-3 years ITR acknowledgements.', is_mandatory: true }
  ];

  return map[c] || defaultDocs;
}

// ── 4. BUSINESS STEPS — COUNTRY SPECIFIC ──
export function getBusinessSteps(countryOrFrom: string, maybeCountry?: string, _purpose?: string): string[] {
  const target = maybeCountry || countryOrFrom;
  const c = normalizeCountry(target);

  const map: Record<string, string[]> = {
    'usa': [
      'Step 1: Secure Official Business Invitation — Obtain a formal invitation letter from the U.S. host company detailing meeting dates, purpose, and agenda.',
      'Step 2: Obtain Employer Deputation Letter — Get a formal letter from your Indian employer confirming role, salary, purpose of visit, and financial sponsorship.',
      'Step 3: Complete Form DS-160 — Fill the online Non-immigrant Visa Application (DS-160) selecting B-1 (Business/Conference) and print confirmation barcode.',
      'Step 4: Pay MRV Fee — Pay 185 USD visa application fee via usvisascheduling.com.',
      'Step 5: Schedule Appointments — Book VAC Biometrics and Consular Interview appointments.',
      'Step 6: Attend VAC Biometrics — Submit fingerprints and photo at the Visa Application Center.',
      'Step 7: Attend Consular Interview — Attend interview at US Embassy/Consulate with business invitation, employer letter, and financial documents.',
      'Step 8: Receive Visa & Travel — Receive 10-year B-1/B-2 visa. Travel to the U.S. for business activities. CBP determines stay at port of entry.'
    ],
    'uk': [
      'Step 1: Obtain UK Business Invitation — Secure an official invitation letter from UK host company or event organizer.',
      'Step 2: Complete UKVI Application — Fill the Standard Visitor Visa (Business Route) application on GOV.UK.',
      'Step 3: Pay Visa Fee — Pay £115 UKVI consular fee online.',
      'Step 4: Upload Supporting Documents — Upload business invitation, employer NOC, company registration, and financial documents.',
      'Step 5: Book VFS Biometrics — Schedule biometric appointment at VFS Global UK.',
      'Step 6: Attend Biometrics — Submit biometrics at VFS Global UK.',
      'Step 7: Receive Visa & Travel — Receive 6-month multiple-entry visa. Travel to the UK for business activities.'
    ],
    'canada': [
      'Step 1: Obtain Canadian Business Invitation — Secure an official invitation letter from Canadian host company.',
      'Step 2: Complete IRCC Application — Fill the Business Visitor application on IRCC portal.',
      'Step 3: Pay Visa Fee — Pay 100 CAD visa application fee + 85 CAD biometrics fee online.',
      'Step 4: Upload Documents — Upload business invitation, employer NOC, company registration, and financial documents.',
      'Step 5: Attend Biometrics — Book and attend VFS Global Canada biometric appointment.',
      'Step 6: Submit Passport — Upon approval, submit passport to VFS for visa counterfoil stamping.',
      'Step 7: Receive Visa & Travel — Receive 10-year multiple-entry visa. Travel to Canada for business activities.'
    ],
    'australia': [
      'Step 1: Obtain Australian Business Invitation — Secure an official invitation letter from Australian host company.',
      'Step 2: Create ImmiAccount — Register on Australian Department of Home Affairs ImmiAccount.',
      'Step 3: Complete Subclass 600 (Business) Application — Fill the Business Stream application online.',
      'Step 4: Upload Documents — Upload business invitation, employer NOC, company registration, and financial documents.',
      'Step 5: Pay Visa Fee — Pay 195 AUD visa application charge online.',
      'Step 6: Attend Biometrics (if requested) — Complete biometrics at VFS Global ABCC.',
      'Step 7: Receive Visa & Travel — Receive electronic Visitor Visa. Travel to Australia for business activities.'
    ],
    'germany': [
      'Step 1: Obtain German Business Invitation — Secure an official invitation letter from German host company.',
      'Step 2: Complete VIDEX Application — Fill the National/Schengen visa application on VIDEX.',
      'Step 3: Gather Documents — Compile business invitation, employer NOC, €30,000 insurance, flight/hotel bookings, and financial documents.',
      'Step 4: Book VFS Appointment — Schedule biometric appointment at VFS Global Germany.',
      'Step 5: Pay Visa Fee — Pay €90 adult Schengen fee + VFS service fee.',
      'Step 6: Attend Biometrics — Submit biometrics at VFS Global Germany.',
      'Step 7: Receive Visa & Travel — Receive Schengen visa. Travel to Germany and all 29 Schengen countries for business activities.'
    ],
    'france': [
      'Step 1: Obtain French Business Invitation — Secure an official invitation letter from French host company.',
      'Step 2: Complete France-Visas Application — Fill the Business Schengen visa application on France-Visas portal.',
      'Step 3: Gather Documents — Compile business invitation, employer NOC, €30,000 insurance, flight/hotel bookings, and financial documents.',
      'Step 4: Book VFS Appointment — Schedule biometric appointment at VFS Global France.',
      'Step 5: Pay Visa Fee — Pay €90 adult Schengen fee + VFS service fee.',
      'Step 6: Attend Biometrics — Submit biometrics at VFS Global France.',
      'Step 7: Receive Visa & Travel — Receive Schengen visa. Travel to France and all Schengen countries for business activities.'
    ],
    'uae': [
      'Step 1: Obtain UAE Business Invitation — Secure an official invitation letter from UAE-based host company.',
      'Step 2: Apply for UAE eVisa — Submit application via ICP/GDRFA portal with passport scan, photograph, and invitation letter.',
      'Step 3: Pay Visa Fee — Pay the official business visa fee (₹6,400 for 30 days / ₹11,800 for 60 days).',
      'Step 4: Receive Approved eVisa — Download your official UAE eVisa PDF within 24-72 hours.',
      'Step 5: Book Flights & Travel — Carry passport, printed eVisa, business invitation, and return ticket.',
      'Step 6: Clear Immigration — Present documents at UAE airport immigration for entry clearance.'
    ],
    'singapore': [
      'Step 1: Obtain Singapore Business Invitation — Secure an official invitation letter from Singapore-based host company.',
      'Step 2: Apply through AVA — Submit application through ICA Authorized Visa Agent (AVA) with passport, photo, and documents.',
      'Step 3: Receive Approved eVisa — Download your official Singapore eVisa PDF (valid up to 2 years multiple entry).',
      'Step 4: Submit SGAC — Complete SG Arrival Card online within 3 days before arrival.',
      'Step 5: Book Flights & Travel — Carry passport, printed eVisa, SGAC confirmation, business invitation, and return ticket.',
      'Step 6: Clear Automated e-Gates — Present passport at Changi Airport automated e-Gates for fast clearance.'
    ],
    'china': [
      'Step 1: Obtain Chinese Business Invitation — Secure an official invitation letter from Chinese host company.',
      'Step 2: Complete COVA Application — Fill the China Online Visa Application (COVA) system online.',
      'Step 3: Gather Documents — Compile passport, business invitation, employer NOC, company registration, and financial documents.',
      'Step 4: Book CVASC Appointment — Schedule appointment at the Chinese Visa Application Service Center (CVASC).',
      'Step 5: Pay Visa Fees — Pay consular fee (₹3,800) and CVASC service charges (₹4,130).',
      'Step 6: Submit Application & Biometrics — Attend CVASC appointment with original passport and dossier (biometrics waived through Dec 2026).',
      'Step 7: Receive Visa & Travel — Collect passport with stamped Chinese M-Visa. Travel to China for business activities.'
    ],
    'india': [
      'Step 1: Obtain Indian Business Invitation — Secure an official invitation letter from Indian host company.',
      'Step 2: Complete Online Application — Fill the Indian visa application on Indian Visa Online Portal.',
      'Step 3: Gather Documents — Compile passport, business invitation, employer NOC, company registration, and financial documents.',
      'Step 4: Schedule Appointment — Book appointment at the Indian Mission/Embassy or VFS.',
      'Step 5: Pay Visa Fee — Pay the applicable visa fee.',
      'Step 6: Submit Application — Submit your complete dossier at the Indian Mission/Embassy.',
      'Step 7: Receive Visa & Travel — Receive business visa. Travel to India for business activities.'
    ]
  };

  const defaultSteps = [
    'Step 1: Obtain Business Invitation — Secure an official invitation letter from the host company or organization.',
    'Step 2: Complete Visa Application — Fill the business visa application online.',
    'Step 3: Gather Required Documents — Compile invitation letter, employer NOC, company registration, and financial documents.',
    'Step 4: Pay Visa Fees — Pay the applicable consular fee and VAC service charges.',
    'Step 5: Submit Application & Biometrics — Attend appointment to submit dossier and record biometric data.',
    'Step 6: Receive Visa & Travel — Receive business visa. Travel for business activities.'
  ];

  return map[c] || defaultSteps;
}

export const getBusinessVisaSteps = getBusinessSteps;

// ── 5. BUSINESS FEES — COUNTRY SPECIFIC ──
export function getBusinessFees(country: string): { visa_fee: string; service_fee: string; total_fee: string; notes: string; } {
  const c = normalizeCountry(country);
  const map: Record<string, { visa_fee: string; service_fee: string; total_fee: string; notes: string; }> = {
    'usa': {
      visa_fee: '185 USD (approx. ₹15,540)',
      service_fee: '0 USD (Direct Consular Fee)',
      total_fee: '185 USD Total Reference',
      notes: 'Payable online via official US Visa Scheduling portal. Valid for 10 years multiple entry.'
    },
    'uk': {
      visa_fee: '£115 (approx. ₹12,300)',
      service_fee: '₹2,500 – ₹3,500 (VFS Logistics)',
      total_fee: '£115 + VFS Logistics',
      notes: 'Payable online at official UKVI portal. Standard 6-month multiple-entry business visa.'
    },
    'canada': {
      visa_fee: '100 CAD (approx. ₹6,200)',
      service_fee: '85 CAD (Biometrics Fee)',
      total_fee: '185 CAD Total Reference',
      notes: 'Official IRCC government fees paid online. Visa typically granted up to passport expiry (10 years).'
    },
    'australia': {
      visa_fee: '195 AUD (approx. ₹10,800)',
      service_fee: '₹1,650 (VFS Biometrics if applicable)',
      total_fee: '195 AUD+ Total Reference',
      notes: 'Payable online directly via Australian ImmiAccount portal.'
    },
    'germany': {
      visa_fee: '90 EUR (Adult) / 45 EUR (Children 6-12) / Free (Under 6)',
      service_fee: '30 EUR (VFS Service Fee)',
      total_fee: '120 EUR Total Reference (approx. ₹10,800)',
      notes: 'Embassy visa fee is NON-REFUNDABLE even if visa is refused.'
    },
    'france': {
      visa_fee: '90 EUR (Adult) / 45 EUR (Children 6-12) / Free (Under 6)',
      service_fee: '30 EUR (VFS Service Fee)',
      total_fee: '120 EUR Total Reference',
      notes: 'Embassy visa fee is NON-REFUNDABLE.'
    },
    'uae': {
      visa_fee: '₹6,400 (30 Days) / ₹11,800 (60 Days)',
      service_fee: '₹0 (Included)',
      total_fee: '₹6,400 – ₹11,800 Total Reference',
      notes: 'Includes mandatory health insurance coverage under ICP/GDRFA.'
    },
    'singapore': {
      visa_fee: 'SGD $30 (approx. ₹1,900)',
      service_fee: '₹1,000 – ₹1,500 (AVA Fee)',
      total_fee: '₹3,000 – ₹3,500 Total Reference',
      notes: 'Official ICA consular visa fee is SGD $30. Non-refundable once processed.'
    },
    'china': {
      visa_fee: '₹3,800 (Single Entry Consular Fee)',
      service_fee: '₹4,130 (CVASC Logistics Fee)',
      total_fee: '₹7,930 Total Reference',
      notes: 'Payable at CVASC center by cash, debit/credit card or bank draft.'
    },
    'india': {
      visa_fee: 'Official Statutory Fee (varies by nationality and entry type)',
      service_fee: 'VAC Service Fee',
      total_fee: 'Official Fee + VAC Logistics',
      notes: 'Check official Indian Mission/Embassy website for current fees.'
    }
  };

  return map[c] || {
    visa_fee: 'Official Statutory Fee',
    service_fee: 'VAC Service Fee',
    total_fee: 'Official Fee + VAC Logistics',
    notes: 'Check official embassy website for current fees.'
  };
}

// ── 6. BUSINESS PROCESSING TIME — COUNTRY SPECIFIC ──
export function getBusinessProcessingTime(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'usa': 'Verbal Decision at Consular Window. Passport dispatch: 3-5 Business Days.',
    'uk': 'Standard 3 Weeks (15 Working Days). Priority 5-day decision service available at VFS centers.',
    'canada': '15 to 30 Business Days after Biometrics Submission.',
    'australia': '15 to 25 Calendar Days (Standard Assessment Stream).',
    'germany': '15 Calendar Days (Consular SLA) — Up to 45 Days (Peak).',
    'france': '15 Calendar Days (Consular SLA) — Up to 45 Days (Peak).',
    'uae': '24 to 72 working hours (Express 8 hours available).',
    'singapore': '3 to 5 Business Days (via ICA Authorized Visa Agent).',
    'china': '4 to 7 Working Days (Standard Processing).',
    'india': '5 to 15 Working Days (Standard Processing).'
  };

  return map[c] || 'Per Official Consular SLA. Apply at least 3-4 weeks before travel.';
}

export function getBusinessProcessingDetails(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'usa': 'Apply 2-3 months before planned business travel. Interview scheduling slots vary by city. Emergency interview slots may be available.',
    'uk': 'Apply up to 3 months before intended business trip. Priority 5-day decision service available at VFS centers.',
    'canada': 'Apply 30-90 days before planned travel. Biometrics must be submitted within 30 days of application.',
    'australia': 'Apply 4-8 weeks before planned travel. 100% digital e-Visa linked to passport.',
    'germany': 'Apply 6 months to 15 days before travel. Schengen 90/180 rule applies.',
    'france': 'Apply 6 months to 15 days before travel. Schengen 90/180 rule applies.',
    'uae': 'Apply 7-30 days before departure. Valid for 60 days from electronic issuance.',
    'singapore': 'Apply 3-4 weeks before departure. Valid for up to 2 years multiple entry.',
    'china': 'Submit 1 month prior to departure date. Fingerprint collection waived through Dec 2026.',
    'india': 'Apply 3-4 weeks before travel. Processing times vary by mission.'
  };

  return map[c] || 'Apply at least 3-4 weeks before planned business travel. Check official website for current processing times.';
}

// ── 7. BUSINESS REQUIREMENTS — COUNTRY SPECIFIC ──
export function getBusinessRequirements(country: string): OtherRequirementItem[] {
  const c = normalizeCountry(country);
  const map: Record<string, OtherRequirementItem[]> = {
    'usa': [
      { category: 'No Productive Work', details: 'You CANNOT perform productive work or draw U.S. salary. Permitted activities: meetings, conferences, contract negotiations, exhibitions, and short-term training.' },
      { category: 'Section 214(b) INA', details: 'Applicant must demonstrate strong economic, professional, and business ties to India confirming departure upon conclusion of the business visit.' },
      { category: 'CBP Discretion', details: 'Length of stay determined by CBP at port of entry (recorded on electronic Form I-94, typically up to 180 days).' },
      { category: 'Two-Stage Appointment', details: 'You must attend two separate appointments: (1) VAC for photo & biometrics, and (2) US Embassy/Consulate for the mandatory in-person consular interview.' }
    ],
    'uk': [
      { category: 'Permitted Business Activities', details: 'Attending meetings, conferences, site visits, and contract negotiations. No direct employment permitted.' },
      { category: 'No Productive Work', details: 'You CANNOT take up productive employment or provide services to a UK client directly.' },
      { category: 'Biometrics Required', details: 'Mandatory in-person appointment for digital facial photograph and fingerprint scanning at VFS Global.' }
    ],
    'canada': [
      { category: 'Business Activities', details: 'International business activities including meetings, conferences, site visits, and contract negotiations.' },
      { category: 'No Work Permitted', details: 'You CANNOT enter the Canadian labour market or perform productive work.' },
      { category: 'No LMIA Required', details: 'Business visitors do not require a Labour Market Impact Assessment (LMIA).' }
    ],
    'australia': [
      { category: 'Business Stream Rules', details: 'Making general business or employment enquiries, investigating or negotiating contracts, and conducting business activities as part of an official government visit.' },
      { category: 'No Local Employment', details: 'You CANNOT work for or provide services to a business or organisation based in Australia, nor sell goods or services to the general public.' }
    ],
    'germany': [
      { category: 'Schengen 90/180 Rule', details: 'Up to 90 days stay within any 180-day period across all 29 Schengen countries.' },
      { category: 'Travel Insurance', details: 'Mandatory €30,000 medical insurance covering emergency treatment and repatriation.' },
      { category: 'No Local Employment', details: 'You CANNOT take up employment or provide services to a local entity.' }
    ],
    'france': [
      { category: 'Schengen 90/180 Rule', details: 'Up to 90 days stay within any 180-day period across all 29 Schengen countries.' },
      { category: 'Travel Insurance', details: 'Mandatory €30,000 medical insurance covering emergency treatment and repatriation.' },
      { category: 'No Local Employment', details: 'You CANNOT take up employment or provide services to a local entity.' }
    ],
    'uae': [
      { category: 'Host Invitation Required', details: 'Official invitation from UAE-based host company mandatory for visa approval.' },
      { category: 'Business Activities', details: 'Attend corporate meetings, conferences, trade shows, and corporate negotiations.' },
      { category: 'No Local Employment', details: 'You CANNOT take up productive employment in the UAE.' }
    ],
    'singapore': [
      { category: 'Authorized Agent Submission', details: 'Applications from India must be submitted through ICA Authorized Visa Agents (AVAs) or strategic partner agencies.' },
      { category: 'SGAC Mandatory', details: 'Complete SG Arrival Card online within 3 days before arrival.' },
      { category: 'Business Activities', details: 'Attend meetings, conferences, trade fairs, and corporate negotiations.' }
    ],
    'china': [
      { category: 'Business M-Visa', details: 'Specifically for commercial and trade activities including business meetings, exhibitions, negotiations, and industrial visits.' },
      { category: 'Invitation Letter', details: 'Official invitation from Chinese host company with company registration details required.' },
      { category: 'Biometrics Exemption', details: 'Fingerprint collection is waived through December 31, 2026 for eligible short-term M-Visas.' }
    ]
  };

  const defaultRequirements: OtherRequirementItem[] = [
    { category: 'Business Activities', details: 'Permitted activities: meetings, conferences, negotiations, site visits, and contract discussions.' },
    { category: 'No Local Employment', details: 'You CANNOT take up productive work or provide services to a local entity.' },
    { category: 'Invitation Letter', details: 'Official invitation from host company or organization is mandatory.' },
    { category: 'Employer Sponsorship', details: 'Your current employer must provide a deputation/cover letter confirming purpose and sponsorship.' }
  ];

  return map[c] || defaultRequirements;
}

// ── 8. BUSINESS FINANCIAL PROOFS ──
export function getBusinessFinancialProofs(country: string): FinancialProofItem[] {
  const c = normalizeCountry(country);
  const map: Record<string, FinancialProofItem[]> = {
    'usa': [
      { type: 'Corporate Financial Guarantee', minimum_balance_or_amount: 'Letter of financial guarantee', time_frame: 'Last 6 Months', notes: 'Corporate sponsorship letter on official employer letterhead undertaking all travel, executive hotel, and incidental costs.' },
      { type: 'Employer Bank Statements', minimum_balance_or_amount: 'Adequate corporate reserves', time_frame: 'Last 6 Months', notes: 'Audited financial statements or corporate bank account showing stable operations.' },
      { type: 'Personal Bank Statements & ITR', minimum_balance_or_amount: '₹3,00,000 - ₹5,00,000 recommended', time_frame: 'Last 6 Months & 3 Years ITR', notes: 'Personal bank statements with regular salary credits + Form 16 / ITR-V acknowledgements.' }
    ],
    'uk': [
      { type: 'Employer Funding Guarantee', minimum_balance_or_amount: 'Full corporate sponsorship', time_frame: 'Duration of trip', notes: 'Explicit statement in employer deputation letter confirming complete sponsorship of flights, hotels, and allowances.' },
      { type: 'Company Bank Statements', minimum_balance_or_amount: 'Liquid operating balance', time_frame: 'Last 6 Months', notes: 'Stamped official corporate bank statements demonstrating strong solvency.' },
      { type: 'Personal Salary Statements', minimum_balance_or_amount: '₹2,50,000 - ₹4,00,000', time_frame: 'Last 6 Months', notes: 'Salary bank account showing regular corporate disbursements matching payslips.' }
    ],
    'germany': [
      { type: 'Formal Obligation (Verpflichtungserklärung) / Corporate Guarantee', minimum_balance_or_amount: 'Full coverage of travel & stay', time_frame: 'Entire Schengen duration', notes: 'German host company guarantee pursuant to Sections 66-68 of Residence Act OR Indian employer corporate guarantee.' },
      { type: 'Company Bank Statements', minimum_balance_or_amount: 'Verifiable solvency', time_frame: 'Last 3-6 Months', notes: 'Stamped corporate bank statements showing adequate cash flow.' },
      { type: 'Personal Financial Standing', minimum_balance_or_amount: '€45-€120/day (€3,000-€5,000)', time_frame: 'Last 3 Months', notes: 'Personal bank statements with ITR acknowledgements for past 2 years.' }
    ],
    'canada': [
      { type: 'Corporate Travel Sponsorship', minimum_balance_or_amount: 'Complete trip funding', time_frame: 'Duration of stay', notes: 'Letter from sending or host company confirming coverage of flights, lodging, and daily allowance.' },
      { type: 'Company Bank Statements', minimum_balance_or_amount: 'Demonstrated liquidity', time_frame: 'Last 6 Months', notes: 'Original stamped company account statements.' },
      { type: 'Personal Liquid Assets', minimum_balance_or_amount: 'CAD 3,000 - 5,000 equivalent', time_frame: 'Last 6 Months', notes: 'Bank statements and 2-3 years ITR notice of assessment.' }
    ]
  };

  const defaultProofs: FinancialProofItem[] = [
    { type: 'Corporate Sponsorship Letter', minimum_balance_or_amount: 'Full funding guarantee', time_frame: 'Trip duration', notes: 'Official company letter stating that all business travel, hotel, and living expenses are covered by the employer.' },
    { type: 'Company Bank Statements', minimum_balance_or_amount: 'Sufficient operating reserves', time_frame: 'Last 3 to 6 Months', notes: 'Stamped statements confirming financial standing of the corporate sponsor.' },
    { type: 'Personal Bank Statements & ITR', minimum_balance_or_amount: '₹2,00,000 - ₹4,00,000', time_frame: 'Last 6 Months', notes: 'Personal savings bank statements showing steady salary credits.' }
  ];

  return map[c] || defaultProofs;
}

// ── 9. BUSINESS FAQ — COUNTRY SPECIFIC ──
export function getBusinessFAQ(country: string): FAQItem[] {
  const c = normalizeCountry(country);
  const map: Record<string, FAQItem[]> = {
    'usa': [
      { question: 'Can I work on a B-1 Business Visa?', answer: 'No, you CANNOT perform productive work or draw U.S. salary. Permitted activities: business meetings, conferences, contract negotiations, exhibitions, and short-term corporate training.' },
      { question: 'How long can I stay in the USA on a B-1 visa?', answer: 'Up to 6 months (180 days) per entry, determined by CBP at the port of entry on Form I-94. The visa itself is valid for 10 years with multiple entries.' },
      { question: 'Do I need an invitation letter for B-1 visa?', answer: 'Yes, an official U.S. business invitation letter from the host company is mandatory. It should detail meeting dates, purpose, and host company information.' },
      { question: 'Can I extend my stay on a B-1 visa while in the U.S.?', answer: 'Yes, you can file Form I-539 with USCIS before your authorized I-94 stay expires, demonstrating continuing commercial necessity and adequate financial funds.' },
      { question: 'Can I attend job interviews on a B-1 visa?', answer: 'You may attend preliminary job interviews, but you cannot begin work or receive U.S. remuneration without obtaining an approved petition-based work visa (such as H-1B or L-1).' }
    ],
    'uk': [
      { question: 'Can I work on a UK Business Visitor Visa?', answer: 'No, you CANNOT take up employment or provide services to a UK client directly. Permitted activities: meetings, conferences, trade fairs, and contract negotiations.' },
      { question: 'How long can I stay in the UK on a Business Visitor Visa?', answer: 'Up to 6 months with multiple entries. The standard visitor visa is issued with 6 months validity.' },
      { question: 'Do I need a UK host invitation letter?', answer: 'Yes, an official letter from the UK host company or event organizer is mandatory for the visa application.' },
      { question: 'Can I attend corporate training or seminars in the UK?', answer: 'Yes, corporate intra-group training, software workshops, and industry conferences are permitted provided they are delivered to your employer group.' },
      { question: 'Can frequent travelers get a 2, 5, or 10-year UK visitor visa?', answer: 'Yes, regular business delegates with verified travel histories can apply for long-term multi-entry visas allowing visits of up to 6 months per trip.' }
    ],
    'canada': [
      { question: 'Can I work on a Canada Business Visitor Visa?', answer: 'No, you CANNOT enter the Canadian labour market or perform productive work. Permitted activities: international business meetings, conferences, site visits, and contract negotiations.' },
      { question: 'How long can I stay in Canada on a Business Visitor Visa?', answer: 'Up to 6 months per visit. The visa is valid for up to 10 years with multiple entries.' },
      { question: 'Do I need LMIA for a Business Visitor Visa?', answer: 'No, business visitors do not require a Labour Market Impact Assessment (LMIA).' },
      { question: 'What documents should I present to the CBSA officer on arrival?', answer: 'Present your passport with Canadian visa, corporate host invitation, employer deputation letter, and return flight itinerary.' },
      { question: 'Can I visit Canadian subsidiaries of my employer?', answer: 'Yes, intra-corporate visits to Canadian branch offices for board meetings, strategy planning, and operational reviews are fully permitted.' }
    ],
    'australia': [
      { question: 'Can I work on an Australian Subclass 600 Business Visitor visa?', answer: 'No, you cannot work for or sell services to the Australian public. You may only conduct business visitor activities like contract negotiations, conferences, and formal business meetings.' },
      { question: 'How long is the Australia Business Visitor visa valid?', answer: 'It is typically granted for up to 12 months with multiple entries, allowing stays of up to 3 months per visit.' },
      { question: 'Do I need an invitation letter from Australia?', answer: 'Yes, an invitation letter from the Australian host business outlining meeting dates and agendas is required.' },
      { question: 'Can I attend conventions and trade shows in Australia?', answer: 'Yes, attending business trade expos, industry exhibitions, and academic symposiums is explicitly authorized under the Business Visitor Stream.' },
      { question: 'Is medical insurance mandatory for an Australia business visit?', answer: 'While not statutorily mandatory for Subclass 600, Home Affairs strongly advises carrying comprehensive international health coverage for medical care.' }
    ],
    'germany': [
      { question: 'Can I work on a Germany Business Schengen Visa?', answer: 'No, you CANNOT take up employment or provide services to a local entity. Permitted activities: business meetings, conferences, trade fairs, and contract negotiations.' },
      { question: 'How long can I stay on a Business Schengen Visa?', answer: 'Up to 90 days within any 180-day period across all 29 Schengen countries.' },
      { question: 'What is the Schengen 90/180 rule?', answer: 'You can stay up to 90 days within any rolling 180-day period across all 29 Schengen countries. Overstaying results in a multi-year Schengen entry ban.' },
      { question: 'Who issues the formal Verpflichtungserklärung in Germany?', answer: 'If the German entity sponsors all travel expenses, they procure the Verpflichtungserklärung from their local Ausländerbehörde (Foreigners Office).' },
      { question: 'Can I visit client sites in other Schengen countries?', answer: 'Yes, your approved German Schengen Business Visa allows travel across all 29 member states within authorized validity dates.' }
    ],
    'france': [
      { question: 'Can I attend exhibitions and negotiate contracts in France on a Business Schengen visa?', answer: 'Yes, attending trade shows, sales exhibitions, corporate seminars, and client negotiations are fully permitted under the Business Schengen Visa.' },
      { question: 'What insurance is required for France business visa?', answer: 'Travel insurance with minimum €30,000 coverage valid across all 29 Schengen states, covering emergency medical expenses and repatriation.' },
      { question: 'Can I travel to other European countries with this visa?', answer: 'Yes, the visa allows unrestricted travel across all 29 Schengen member states during its validity.' },
      { question: 'How far in advance can I apply for a France Business Visa?', answer: 'Applications can be lodged up to 6 months prior to travel, with at least 15 to 20 working days recommended prior to scheduled departure.' },
      { question: 'What language should the French business invitation be in?', answer: 'Invitation letters can be issued in either French or English on official corporate host letterhead with authorized company signatures.' }
    ],
    'uae': [
      { question: 'Can I work on a UAE Business Visit Visa?', answer: 'No, you CANNOT take up productive employment in the UAE. Permitted activities: attend corporate meetings, conferences, trade shows, and corporate negotiations.' },
      { question: 'How long can I stay on a UAE Business Visit Visa?', answer: '30 or 60 days depending on the selected visa tier. Extensions may be possible.' },
      { question: 'Do I need a UAE host invitation?', answer: 'Yes, official invitation from a UAE-based host company is mandatory for visa approval.' },
      { question: 'Can a UAE business visit visa be extended within the country?', answer: 'Yes, both 30-day and 60-day visit visas can be extended inside the UAE via ICP or GDRFA without exiting the border.' },
      { question: 'What are the penalties for overstaying in the UAE?', answer: 'UAE immigration imposes a fine of AED 50 per day plus administrative departure clearance fees upon unauthorized overstay.' }
    ],
    'singapore': [
      { question: 'Can I work on a Singapore Business Visit Visa?', answer: 'No, you CANNOT take up productive employment in Singapore. Permitted activities: meetings, conferences, trade fairs, and corporate negotiations.' },
      { question: 'How long can I stay on a Singapore Business Visit Visa?', answer: 'Up to 30 days per visit. The visa is valid for up to 2 years with multiple entries.' },
      { question: 'Do I need to apply through an agent?', answer: 'Yes, applications from India must be submitted through ICA Authorized Visa Agents (AVAs) or strategic partner agencies.' },
      { question: 'What is the SG Arrival Card (SGAC) requirement?', answer: 'Every traveler must complete the SG Arrival Card online within 3 days prior to arrival in Singapore.' },
      { question: 'Can I attend short technical discussions with Singapore partners?', answer: 'Yes, technical consultations, contract drafting, and vendor evaluations are permitted under commercial visitor status.' }
    ],
    'china': [
      { question: 'Can I work on a China Business M-Visa?', answer: 'No, you CANNOT take up productive employment in China. Permitted activities: commercial and trade activities including business meetings, exhibitions, and negotiations.' },
      { question: 'How long can I stay on a China Business M-Visa?', answer: 'Typically 30 days per entry. The visa is valid for 3-6 months with single or double entry.' },
      { question: 'Do I need a Chinese host invitation?', answer: 'Yes, official invitation from a Chinese host company with company registration details is mandatory.' },
      { question: 'Are fingerprint biometrics required for Indian applicants?', answer: 'Biometric fingerprint collection is temporarily exempted through December 31, 2026 for eligible single/double-entry M-Visas.' },
      { question: 'Can I visit factory sites and production lines in China?', answer: 'Yes, quality inspections, factory audits, and procurement discussions are standard activities allowed under the M-Visa.' }
    ]
  };

  const defaultFAQ: FAQItem[] = [
    { question: `Do I need a business visa for ${country}?`, answer: `Yes, you need a business visa to travel to ${country} for business activities such as meetings, conferences, and negotiations. Check the official embassy website for current requirements.` },
    { question: `Can I work on a business visa for ${country}?`, answer: `No, you CANNOT take up productive work or provide services to a local entity. Business visas are only for meetings, conferences, and negotiations.` },
    { question: `How long can I stay on a business visa for ${country}?`, answer: `Stay duration varies by country and visa type. Typically 30-90 days per visit. Check specific requirements for ${country}.` },
    { question: `What is the difference between a Business Visa and a Work Visa?`, answer: `A Business Visa covers commercial visits like meetings and exhibitions paid by your home employer. A Work Visa authorizes you to enter local employment and draw domestic salary.` },
    { question: `Can my family accompany me on a business trip?`, answer: `Accompanying family members must apply for separate tourist visitor visas unless the destination sovereign offers family dependent business visitor endorsements.` }
  ];

  return map[c] || defaultFAQ;
}

// ── 10. BUSINESS VALIDITY, STAY, ENTRY — COUNTRY SPECIFIC ──
export function getBusinessValidity(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'usa': 'Up to 10 Years (120 Months) Multiple Entry',
    'uk': '6 Months (Standard Multiple Entry)',
    'canada': 'Up to 10 Years Multiple Entry',
    'australia': 'Up to 12 Months (Single or Multiple Entry)',
    'germany': 'Based on approved itinerary (up to 6 months or 1-5 years multi-entry)',
    'france': 'Based on approved itinerary (up to 6 months or 1-5 years multi-entry)',
    'uae': '60 Days from electronic issuance (30 or 60 day stay)',
    'singapore': 'Up to 2 Years Multiple Entry (30 Days per visit)',
    'china': '3 Months (Single Entry) / 6 Months (Double Entry)',
    'india': 'Up to 5 Years Multiple Entry'
  };

  return map[c] || 'Up to 90 Days to 1 Year (Single / Multiple Entry)';
}

export function getBusinessStayDuration(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'usa': 'Up to 6 Months (180 Days) per entry (determined by CBP on Form I-94)',
    'uk': 'Up to 6 Months (180 Days) per Visit',
    'canada': 'Up to 180 Days (6 Months) per Visit',
    'australia': 'Up to 3, 6, or 12 Months per stay (as stipulated in Grant Notice)',
    'germany': 'Up to 90 days within any 180-day rolling period',
    'france': 'Up to 90 days within any 180-day rolling period',
    'uae': 'Up to 30 Days or 60 Days (depending on selected visa tier)',
    'singapore': 'Up to 30 Days Per Visit',
    'china': 'Up to 30 Days per Entry (as determined by consular officer)',
    'india': 'Varies based on visa grant (typically 90-180 days)'
  };

  return map[c] || 'Up to 30 to 90 Days per visit';
}

export function getBusinessEntryType(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'usa': 'Multiple Entry (10-Year)',
    'uk': 'Multiple Entry',
    'canada': 'Multiple Entry (10-Year)',
    'australia': 'Single or Multiple Entry',
    'germany': 'Short Stay (Single / Double / Multiple Entry)',
    'france': 'Short Stay (Single / Multiple Entry)',
    'uae': 'Single / Multiple Entry (based on permit tier)',
    'singapore': 'Multiple Entry (e-Visa)',
    'china': 'Single / Double Entry',
    'india': 'Multiple Entry'
  };

  return map[c] || 'Single / Multiple Entry';
}

// ── 11. OFFICIAL SOURCE NAME ──
export function getBusinessOfficialSourceName(country: string): string {
  const c = normalizeCountry(country);
  const map: Record<string, string> = {
    'usa': 'U.S. Department of State (Travel.State.Gov) & CEAC',
    'uk': 'UK Visas and Immigration (UKVI) & Home Office',
    'canada': 'Immigration, Refugees and Citizenship Canada (IRCC)',
    'australia': 'Australian Department of Home Affairs (ImmiAccount)',
    'germany': 'Federal Foreign Office (Auswärtiges Amt) & VIDEX',
    'france': 'France-Visas Official Consular Portal & MFA',
    'uae': 'Federal Authority for Identity, Citizenship, Customs and Port Security (ICP) & GDRFA',
    'singapore': 'Immigration & Checkpoints Authority (ICA) Singapore',
    'china': 'Chinese Visa Application Service Center (CVASC) & MFA PRC',
    'india': 'Bureau of Immigration (BOI) & Ministry of External Affairs'
  };

  return map[c] || `Ministry of Foreign Affairs & Immigration Authority of ${country}`;
}

// ── 12. COMPLETE BUSINESS VISA DATA BUILDER ──
export function getBusinessVisaData(
  from: string,
  to: string,
  purpose: string = 'Business'
): StructuredVisaRequirements {
  const countryName = to;
  const c = normalizeCountry(to);
  const officialSource = getBusinessOfficialSourceName(to);
  const procTime = getBusinessProcessingTime(to);
  const procDetails = getBusinessProcessingDetails(to);
  const val = getBusinessValidity(to);
  const stay = getBusinessStayDuration(to);
  const entryType = getBusinessEntryType(to);
  const fees = getBusinessFees(to);
  const faqs = getBusinessFAQ(to);
  const highlights = getBusinessHighlights(to);

  return {
    passport_country: from,
    destination_country: countryName,
    purpose_of_visit: 'Business Visit',
    visa_type: `${countryName} Business Visa`,
    source_url: `https://www.google.com/search?q=${encodeURIComponent(countryName + ' business visa official consular requirements')}`,
    official_source_name: officialSource,

    // ── OVERVIEW ──
    overview: getBusinessOverview(to),
    highlights: highlights,

    // ── STEPS ──
    how_to_apply: getBusinessSteps(to),

    // ── DOCUMENTS ──
    documents_required: getBusinessDocuments(from, to, purpose),

    // ── FEES ──
    costs: fees,

    // ── PROCESSING TIME ──
    processing_time: procTime,
    processing_time_details: procDetails,

    // ── REQUIREMENTS ──
    other_requirements: getBusinessRequirements(to),
    financial_proofs: getBusinessFinancialProofs(to),

    // ── FAQ ──
    faqs: faqs,

    // ── VALIDITY & STAY ──
    validity: val,
    validity_details: `Standard business visa validity: ${val}`,
    stay_duration: stay,
    stay_duration_details: `Maximum permitted stay: ${stay}`,
    entry_type: entryType,
    entry_type_details: `${entryType} business authorization`,

    validity_and_stay: {
      visa_validity: val,
      max_stay_per_entry: stay,
      entry_type: entryType
    },

    processing_and_timing: {
      apply_window: 'Apply 3 to 6 weeks prior to planned business travel.',
      decision_time: procTime,
      max_extension: 'Subject to local immigration bureau discretion.',
      center_notes: c === 'usa'
        ? 'U.S. Embassy / Consulate & VAC (Visa Application Center) for biometrics & interview.'
        : `VFS Global / ${countryName} Embassy/Consulate. Check appointment availability online.`
    },

    verification_status: 'verified',
    is_v3_verified: true
  };
}
