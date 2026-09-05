// scripts/test-v3-acceptance.ts
import { 
  INITIAL_20_COUNTRIES_REGISTRY, 
  isAllowedExactHostname, 
  getSourcesForDestination 
} from '../src/lib/visa-v3/registry';
import { 
  cleanHtmlToText, 
  computeSha256 
} from '../src/lib/visa-v3/scraper';
import { 
  verifyEvidenceAnchors, 
  validateDeterministicRules, 
  containsGenericPlaceholders 
} from '../src/lib/visa-v3/verifier';
import { computeStatusDecision } from '../src/lib/visa-v3/decision';
import { generateRouteKey } from '../src/lib/visa-v3/engine';
import type { V3VisaData } from '../src/lib/visa-v3/types';

interface TestCase {
  id: number;
  from: string;
  to: string;
  purpose: string;
  expectedHostnames: string[];
  expectedAuthority: 'government' | 'embassy' | 'evisa' | 'vac';
  simulatedSourceContent: string;
  targetUrl: string;
  validateData: (data: V3VisaData) => boolean;
  expectApplicabilityFalse?: string[];
  expectCrossContaminationClean?: boolean;
}

const TEST_CASES: TestCase[] = [
  // TEST 1: India → UAE → Tourism
  {
    id: 1,
    from: 'India',
    to: 'United Arab Emirates',
    purpose: 'Tourism',
    expectedHostnames: ['icp.gov.ae', 'gdrfad.gov.ae'],
    expectedAuthority: 'government',
    targetUrl: 'https://icp.gov.ae/services/visa-services',
    simulatedSourceContent: `
      Federal Authority for Identity, Citizenship, Customs and Port Security (ICP).
      Entry Permit for Tourism: Foreign nationals requiring entry visa to the United Arab Emirates must apply online before departure.
      Visa Type: 30-Day or 60-Day Tourist e-Visa.
      Visa Required: Yes, Indian ordinary passport holders require an entry permit prior to arrival unless holding a valid US visa or green card.
      Validity: Entry permit is valid for 60 days from the date of issue.
      Stay Duration: Maximum duration of stay is 30 days or 60 days per entry.
      Entry Type: Single entry or multiple entry.
      Processing Time: Standard online processing is 48 to 72 hours.
      Statutory Fee: Official ICP issuance fee is AED 350.
      Mandatory Documents: Valid passport bio-page copy (minimum 6 months validity), passport photo with white background, confirmed return flight tickets.
    `,
    validateData: (d) => d.visa_required.value === true && !containsGenericPlaceholders(d.fee.value || '')
  },

  // TEST 2: India → Thailand → Tourism (Visa-free route)
  {
    id: 2,
    from: 'India',
    to: 'Thailand',
    purpose: 'Tourism',
    expectedHostnames: ['thaievisa.go.th', 'consular.mfa.go.th'],
    expectedAuthority: 'evisa',
    targetUrl: 'https://www.thaievisa.go.th',
    simulatedSourceContent: `
      Official Thai eVisa Processing Portal - Ministry of Foreign Affairs of Thailand.
      Visa Exemption Scheme: Indian passport holders are eligible for visa-free entry for tourism purposes.
      Visa Required: No. Indian citizens are granted visa exemption.
      Validity: Passport must be valid for at least 6 months upon arrival in Thailand.
      Stay Duration: Permitted stay of up to 60 days per visit under the bilateral visa exemption.
      Entry Type: Single entry on arrival.
      Entry Conditions: Confirmed return airline ticket within 60 days and proof of adequate accommodation.
    `,
    expectApplicabilityFalse: ['visa_type', 'fee', 'processing_time'],
    validateData: (d) => d.visa_required.value === false && d.visa_type.applicable === false && d.fee.applicable === false
  },

  // TEST 3: India → Singapore → Tourism
  {
    id: 3,
    from: 'India',
    to: 'Singapore',
    purpose: 'Tourism',
    expectedHostnames: ['ica.gov.sg'],
    expectedAuthority: 'government',
    targetUrl: 'https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements',
    simulatedSourceContent: `
      Immigration & Checkpoints Authority Singapore (ICA).
      Entry Visa Requirements for Assessment Level I and II Countries: Indian passport holders require a valid Singapore visa to enter Singapore.
      Visa Type: Singapore Tourist e-Visa.
      Visa Required: Yes.
      Validity: Valid up to 2 years with multiple entries or 30 days single entry.
      Stay Duration: Up to 30 days per visit as granted at immigration checkpoint.
      Entry Type: Multiple journey entry visa.
      Processing Time: 3 to 5 working days from submission by authorized visa agent.
      Fee: Official processing fee is SGD 30.
      SG Arrival Card (SGAC): All arriving travelers must submit the SG Arrival Card online within 3 days prior to arrival.
    `,
    validateData: (d) => Boolean(d.visa_type.value?.includes('Tourist') && d.fee.value?.includes('SGD 30'))
  },

  // TEST 4: India → China → Tourism
  {
    id: 4,
    from: 'India',
    to: 'China',
    purpose: 'Tourism',
    expectedHostnames: ['visaforchina.cn', 'cvasc.org.in', 'mfa.gov.cn'],
    expectedAuthority: 'vac',
    targetUrl: 'https://www.visaforchina.cn',
    simulatedSourceContent: `
      Chinese Visa Application Service Center (CVASC).
      L-Visa (Tourist Visa) application procedures for Indian applicants.
      Visa Type: L-Visa for Tourism.
      Visa Required: Yes, ordinary passport holders must obtain a visa before entering China.
      Validity: 3 months single entry, or 6 months double entry.
      Stay Duration: Up to 30 days per entry.
      Entry Type: Single or double entry.
      Processing Time: 4 business days for regular service.
      Fee: Visa fee INR 4,000 plus CVASC service fee.
      Requirements: Round-trip flight tickets, hotel reservation, cover letter, itinerary in China.
    `,
    validateData: (d) => d.visa_type.value?.includes('L-Visa') && d.visa_required.value === true
  },

  // TEST 5: India → Australia → Student (Subclass 500, NOT Subclass 600)
  {
    id: 5,
    from: 'India',
    to: 'Australia',
    purpose: 'Student',
    expectedHostnames: ['immi.homeaffairs.gov.au'],
    expectedAuthority: 'government',
    targetUrl: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing',
    simulatedSourceContent: `
      Australian Government Department of Home Affairs.
      Student Visa (Subclass 500).
      Visa Type: Student Visa Subclass 500.
      Visa Required: Yes, international students must hold a Subclass 500 visa to study full-time in Australia.
      Validity: For the duration of your course of study plus standard stay period.
      Stay Duration: Duration of approved CRICOS registered course.
      Entry Type: Multiple travel facility.
      Processing Time: 25 to 50 days for standard higher education sector.
      Fee: Base application charge is AUD 1,600.
      Mandatory Requirements: Confirmation of Enrolment (CoE), Overseas Student Health Cover (OSHC), Genuine Student requirement.
    `,
    validateData: (d) => {
      const s = JSON.stringify(d).toLowerCase();
      return s.includes('subclass 500') && !s.includes('subclass 600');
    }
  },

  // TEST 6: India → Australia → Tourism (Subclass 600, NOT Subclass 500)
  {
    id: 6,
    from: 'India',
    to: 'Australia',
    purpose: 'Tourism',
    expectedHostnames: ['immi.homeaffairs.gov.au'],
    expectedAuthority: 'government',
    targetUrl: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing',
    simulatedSourceContent: `
      Australian Government Department of Home Affairs.
      Visitor Visa (Subclass 600) - Tourist stream (apply outside Australia).
      Visa Type: Visitor Subclass 600.
      Visa Required: Yes, passport holders outside ETA/eVisitor eligible countries must apply for Subclass 600.
      Validity: Up to 12 months from grant.
      Stay Duration: Up to 3 months per stay.
      Entry Type: Single or multiple entry.
      Processing Time: 15 to 25 calendar days.
      Fee: Base application fee is AUD 190.
      Requirements: Genuine temporary entrant intent, financial capacity, travel itinerary.
    `,
    validateData: (d) => {
      const s = JSON.stringify(d).toLowerCase();
      return s.includes('subclass 600') && !s.includes('subclass 500');
    }
  },

  // TEST 7: India → UK → Tourism (Standard Visitor)
  {
    id: 7,
    from: 'India',
    to: 'United Kingdom',
    purpose: 'Tourism',
    expectedHostnames: ['www.gov.uk'],
    expectedAuthority: 'government',
    targetUrl: 'https://www.gov.uk/standard-visitor',
    simulatedSourceContent: `
      GOV.UK - UK Visas and Immigration (UKVI).
      Standard Visitor Visa: For tourism, visiting family and friends, or attending business meetings.
      Visa Type: Standard Visitor Visa.
      Visa Required: Yes, Indian citizens must apply for a visa before traveling to the UK.
      Validity: 6 months standard visa, or long-term 2, 5, or 10 years.
      Stay Duration: Maximum 6 months per visit.
      Entry Type: Multiple entry.
      Processing Time: 3 weeks standard consular processing.
      Fee: Official application fee is £115 for a 6-month visa.
      Documents: Valid passport with one blank page, financial solvency evidence, tuberculosis test if applicable.
    `,
    validateData: (d) => d.visa_type.value?.includes('Standard Visitor') && d.fee.value?.includes('£115')
  },

  // TEST 8: India → USA → Tourism (B1/B2, DS-160)
  {
    id: 8,
    from: 'India',
    to: 'United States',
    purpose: 'Tourism',
    expectedHostnames: ['travel.state.gov', 'ustraveldocs.com'],
    expectedAuthority: 'government',
    targetUrl: 'https://travel.state.gov/content/travel/en/us-visas.html',
    simulatedSourceContent: `
      U.S. Department of State - Bureau of Consular Affairs.
      Visitor Visa B-1 / B-2 for temporary business or pleasure.
      Visa Type: B1/B2 Visitor Visa.
      Visa Required: Yes, all foreign citizens of non-VWP countries require a nonimmigrant visa.
      Validity: Up to 10 years with multiple entries.
      Stay Duration: Up to 180 days per entry as determined by CBP at port of entry.
      Entry Type: Multiple entry.
      Processing Time: Subject to interview appointment wait times.
      Fee: Machine Readable Visa (MRV) application fee is $185 USD.
      Requirements: Complete online Form DS-160, schedule biometrics at VAC and consular interview, valid passport.
    `,
    validateData: (d) => {
      const s = JSON.stringify(d).toLowerCase();
      return s.includes('b1/b2') && s.includes('ds-160');
    }
  },

  // TEST 9: India → Canada → Tourism (IRCC, TRV)
  {
    id: 9,
    from: 'India',
    to: 'Canada',
    purpose: 'Tourism',
    expectedHostnames: ['canada.ca', 'ircc.canada.ca'],
    expectedAuthority: 'government',
    targetUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html',
    simulatedSourceContent: `
      Immigration, Refugees and Citizenship Canada (IRCC) - Government of Canada.
      Visitor Visa (Temporary Resident Visa - TRV).
      Visa Type: Temporary Resident Visa (TRV).
      Visa Required: Yes, Indian citizens need a visitor visa to enter Canada.
      Validity: Up to 10 years or until passport expiry.
      Stay Duration: Up to 6 months per entry.
      Entry Type: Multiple entry.
      Processing Time: 15 to 30 working days plus biometric appointment.
      Fee: Application fee is CAD 100 per person plus CAD 85 biometrics fee.
      Requirements: Valid passport, biometric enrollment, digital photograph, proof of funds, purpose of travel.
    `,
    validateData: (d) => d.visa_type.value?.includes('TRV') || d.visa_type.value?.includes('Temporary Resident')
  },

  // TEST 10: India → France → Tourism (France-Visas, Schengen)
  {
    id: 10,
    from: 'India',
    to: 'France',
    purpose: 'Tourism',
    expectedHostnames: ['france-visas.gouv.fr', 'diplomatie.gouv.fr'],
    expectedAuthority: 'government',
    targetUrl: 'https://france-visas.gouv.fr/web/france-visas/accueil',
    simulatedSourceContent: `
      France-Visas Official Portal - Government of the French Republic.
      Short-stay Uniform Schengen Visa (Type C) for Tourism.
      Visa Type: Short-stay Uniform Schengen Visa (Type C).
      Visa Required: Yes, Indian nationals require a Schengen visa to enter the Schengen area.
      Validity: Up to 90 days in any 180-day period.
      Stay Duration: Maximum 90 days.
      Entry Type: Single or multiple entry.
      Processing Time: 15 calendar days statutory processing time.
      Fee: Official Schengen visa fee is €90.
      Mandatory Requirements: Passport with 3 months validity beyond intended departure and 2 blank pages, travel medical insurance with minimum coverage of €30,000, confirmed return flights, accommodation proof.
    `,
    validateData: (d) => {
      const s = JSON.stringify(d).toLowerCase();
      return s.includes('schengen') && (s.includes('€90') || s.includes('90 eur')) && s.includes('€30,000');
    }
  }
];

async function runAcceptanceTests() {
  console.log('===============================================================');
  console.log('  🚀 RUNNING V3 PURE LOGIC VISA VERIFICATION ACCEPTANCE TESTS  ');
  console.log('===============================================================\n');

  let passed = 0;
  let failed = 0;

  for (const tc of TEST_CASES) {
    console.log(`[TEST ${tc.id}] ${tc.from} → ${tc.to} (${tc.purpose})`);

    try {
      // 1. Route Key Generation
      const { routeKey, routeHash } = generateRouteKey(tc.from, tc.to, tc.purpose);
      if (!routeKey || !routeHash) {
        throw new Error('Route key or hash generation failed');
      }

      // 2. Exact Hostname Discovery & Allowlist Check
      const allowed = isAllowedExactHostname(tc.targetUrl, tc.to);
      if (!allowed.allowed) {
        throw new Error(`Hostname for ${tc.targetUrl} was rejected by strict allowlist for ${tc.to}`);
      }

      // 3. Content Snapshot & Hash
      const cleaned = cleanHtmlToText(tc.simulatedSourceContent);
      const contentHash = computeSha256(cleaned);
      if (!contentHash || contentHash.length !== 64) {
        throw new Error('SHA256 content hash failed');
      }

      // 4. Construct Structured Data Model with field-level applicability & exact evidence anchors
      const isVisaFree = tc.expectApplicabilityFalse?.includes('visa_type');

      // Exact field evidence mappings based on test case
      let visaReqEvidence = 'Yes';
      let visaTypeEvidence = 'Visa Type';
      let validityEvidence = 'Validity';
      let stayEvidence = 'Stay Duration';
      let entryTypeEvidence = 'Entry Type';
      let procTimeEvidence = 'Processing Time';
      let feeEvidence = 'Fee';

      if (tc.id === 1) {
        visaReqEvidence = 'Foreign nationals requiring entry visa to the United Arab Emirates must apply online before departure.';
        visaTypeEvidence = '30-Day or 60-Day Tourist e-Visa.';
        validityEvidence = 'Entry permit is valid for 60 days from the date of issue.';
        stayEvidence = 'Maximum duration of stay is 30 days or 60 days per entry.';
        entryTypeEvidence = 'Single entry or multiple entry.';
        procTimeEvidence = 'Standard online processing is 48 to 72 hours.';
        feeEvidence = 'Official ICP issuance fee is AED 350.';
      } else if (tc.id === 2) {
        visaReqEvidence = 'Indian citizens are granted visa exemption.';
        validityEvidence = 'Passport must be valid for at least 6 months upon arrival in Thailand.';
        stayEvidence = 'Permitted stay of up to 60 days per visit under the bilateral visa exemption.';
        entryTypeEvidence = 'Single entry on arrival.';
      } else if (tc.id === 3) {
        visaReqEvidence = 'Indian passport holders require a valid Singapore visa to enter Singapore.';
        visaTypeEvidence = 'Singapore Tourist e-Visa.';
        validityEvidence = 'Valid up to 2 years with multiple entries or 30 days single entry.';
        stayEvidence = 'Up to 30 days per visit as granted at immigration checkpoint.';
        entryTypeEvidence = 'Multiple journey entry visa.';
        procTimeEvidence = '3 to 5 working days from submission by authorized visa agent.';
        feeEvidence = 'Official processing fee is SGD 30.';
      } else if (tc.id === 4) {
        visaReqEvidence = 'ordinary passport holders must obtain a visa before entering China.';
        visaTypeEvidence = 'L-Visa for Tourism.';
        validityEvidence = '3 months single entry, or 6 months double entry.';
        stayEvidence = 'Up to 30 days per entry.';
        entryTypeEvidence = 'Single or double entry.';
        procTimeEvidence = '4 business days for regular service.';
        feeEvidence = 'Visa fee INR 4,000 plus CVASC service fee.';
      } else if (tc.id === 5) {
        visaReqEvidence = 'international students must hold a Subclass 500 visa to study full-time in Australia.';
        visaTypeEvidence = 'Student Visa Subclass 500.';
        validityEvidence = 'For the duration of your course of study plus standard stay period.';
        stayEvidence = 'Duration of approved CRICOS registered course.';
        entryTypeEvidence = 'Multiple travel facility.';
        procTimeEvidence = '25 to 50 days for standard higher education sector.';
        feeEvidence = 'Base application charge is AUD 1,600.';
      } else if (tc.id === 6) {
        visaReqEvidence = 'passport holders outside ETA/eVisitor eligible countries must apply for Subclass 600.';
        visaTypeEvidence = 'Visitor Subclass 600.';
        validityEvidence = 'Up to 12 months from grant.';
        stayEvidence = 'Up to 3 months per stay.';
        entryTypeEvidence = 'Single or multiple entry.';
        procTimeEvidence = '15 to 25 calendar days.';
        feeEvidence = 'Base application fee is AUD 190.';
      } else if (tc.id === 7) {
        visaReqEvidence = 'Indian citizens must apply for a visa before traveling to the UK.';
        visaTypeEvidence = 'Standard Visitor Visa.';
        validityEvidence = '6 months standard visa, or long-term 2, 5, or 10 years.';
        stayEvidence = 'Maximum 6 months per visit.';
        entryTypeEvidence = 'Multiple entry.';
        procTimeEvidence = '3 weeks standard consular processing.';
        feeEvidence = 'Official application fee is £115 for a 6-month visa.';
      } else if (tc.id === 8) {
        visaReqEvidence = 'all foreign citizens of non-VWP countries require a nonimmigrant visa.';
        visaTypeEvidence = 'B1/B2 Visitor Visa.';
        validityEvidence = 'Up to 10 years with multiple entries.';
        stayEvidence = 'Up to 180 days per entry as determined by CBP at port of entry.';
        entryTypeEvidence = 'Multiple entry.';
        procTimeEvidence = 'Subject to interview appointment wait times.';
        feeEvidence = 'Machine Readable Visa (MRV) application fee is $185 USD.';
      } else if (tc.id === 9) {
        visaReqEvidence = 'Indian citizens need a visitor visa to enter Canada.';
        visaTypeEvidence = 'Temporary Resident Visa (TRV).';
        validityEvidence = 'Up to 10 years or until passport expiry.';
        stayEvidence = 'Up to 6 months per entry.';
        entryTypeEvidence = 'Multiple entry.';
        procTimeEvidence = '15 to 30 working days plus biometric appointment.';
        feeEvidence = 'Application fee is CAD 100 per person plus CAD 85 biometrics fee.';
      } else if (tc.id === 10) {
        visaReqEvidence = 'Indian nationals require a Schengen visa to enter the Schengen area.';
        visaTypeEvidence = 'Short-stay Uniform Schengen Visa (Type C).';
        validityEvidence = 'Up to 90 days in any 180-day period.';
        stayEvidence = 'Maximum 90 days.';
        entryTypeEvidence = 'Single or multiple entry.';
        procTimeEvidence = '15 calendar days statutory processing time.';
        feeEvidence = 'Official Schengen visa fee is €90.';
      }

      const mockData: V3VisaData = {
        passport_country: tc.from,
        destination_country: tc.to,
        purpose: tc.purpose,
        visa_required: {
          value: !isVisaFree,
          applicable: true,
          evidence: visaReqEvidence
        },
        visa_type: {
          value: isVisaFree ? null : visaTypeEvidence.replace(/\.$/, ''),
          applicable: !isVisaFree,
          reason: isVisaFree ? 'Visa-free entry for Indian citizens' : undefined,
          evidence: isVisaFree ? undefined : visaTypeEvidence
        },
        validity: {
          value: validityEvidence.replace(/\.$/, ''),
          applicable: true,
          evidence: validityEvidence
        },
        stay_duration: {
          value: stayEvidence.replace(/\.$/, ''),
          applicable: true,
          evidence: stayEvidence
        },
        entry_type: {
          value: entryTypeEvidence.replace(/\.$/, ''),
          applicable: true,
          evidence: entryTypeEvidence
        },
        processing_time: {
          value: isVisaFree ? null : procTimeEvidence.replace(/\.$/, ''),
          applicable: !isVisaFree,
          reason: isVisaFree ? 'Instant entry on arrival' : undefined,
          evidence: isVisaFree ? undefined : procTimeEvidence
        },
        fee: {
          value: isVisaFree ? null : feeEvidence.replace(/\.$/, ''),
          applicable: !isVisaFree,
          reason: isVisaFree ? 'Fee-exempt on arrival' : undefined,
          evidence: isVisaFree ? undefined : feeEvidence
        },
        documents_required: {
          value: tc.id === 10 ? [
            { title: 'Valid passport', description: 'Minimum 3 months validity beyond departure', is_mandatory: true },
            { title: 'Travel Medical Insurance', description: 'Minimum coverage of €30,000', is_mandatory: true }
          ] : tc.id === 8 ? [
            { title: 'Valid Passport', description: 'Valid for travel to the United States', is_mandatory: true },
            { title: 'Form DS-160 confirmation page', description: 'Online Nonimmigrant Visa Application', is_mandatory: true }
          ] : [
            { title: 'Valid Passport', description: 'At least 6 months validity', is_mandatory: true }
          ],
          applicable: true,
          evidence: tc.id === 10 ? 'travel medical insurance with minimum coverage of €30,000' : tc.id === 8 ? 'Complete online Form DS-160' : 'passport'
        },
        how_to_apply: {
          value: tc.id === 8 ? [
            'Complete online Form DS-160',
            'Schedule biometrics at VAC and consular interview'
          ] : ['Step 1: Check requirements', 'Step 2: Submit documents'],
          applicable: true,
          evidence: tc.id === 8 ? 'Complete online Form DS-160' : 'requirements'
        },
        financial_proofs: {
          value: [],
          applicable: !isVisaFree,
          evidence: undefined
        },
        other_requirements: {
          value: [],
          applicable: false
        }
      };

      // 5. Evidence Anchor Verification (Deterministic)
      const { verifiedData, anchors } = verifyEvidenceAnchors(mockData, cleaned);

      // Verify anchor exists for visa_required and stay_duration
      if (!anchors['stay_duration']) {
        throw new Error('Evidence anchor for stay_duration failed');
      }

      // 6. Deterministic Validation
      const report = validateDeterministicRules(
        verifiedData,
        tc.from,
        tc.to,
        tc.purpose,
        tc.expectedAuthority
      );

      if (report.cross_contamination_detected) {
        throw new Error(`Cross contamination detected: ${report.errors.join(', ')}`);
      }
      if (report.placeholders_detected) {
        throw new Error(`Generic placeholders detected: ${report.errors.join(', ')}`);
      }

      // 7. Status Decision
      const decision = computeStatusDecision(report, tc.expectedAuthority, true);

      if (tc.expectedAuthority === 'vac' && decision.status !== 'PARTIALLY_VERIFIED') {
        throw new Error(`Expected PARTIALLY_VERIFIED for VAC source, got ${decision.status}`);
      }
      if (tc.expectedAuthority !== 'vac' && decision.status !== 'VERIFIED') {
        throw new Error(`Expected VERIFIED for direct authority, got ${decision.status} (${report.errors.join('; ')})`);
      }

      // 8. Custom Test Case Validator
      if (!tc.validateData(verifiedData)) {
        throw new Error('Custom validation rules failed for test case');
      }

      console.log(`  ✅ PASSED: ${decision.status} | Anchors: ${Object.keys(anchors).length} | Source: ${tc.targetUrl} | Hash: ${contentHash.slice(0, 16)}...`);
      passed++;
    } catch (err: any) {
      console.error(`  ❌ FAILED: ${err.message}`);
      failed++;
    }
  }

  console.log('\n===============================================================');
  console.log(`  RESULTS: ${passed}/10 PASSED, ${failed} FAILED`);
  console.log('===============================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runAcceptanceTests().catch(e => {
  console.error(e);
  process.exit(1);
});
