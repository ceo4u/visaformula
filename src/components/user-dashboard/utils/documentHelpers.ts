import type { VaultDocItem } from "../types";

export function getAiDocIcon(title: string): string {
  const t = (title || '').toLowerCase();
  if (t.includes('passport')) return '🛂';
  if (t.includes('photo') || t.includes('picture')) return '📸';
  if (t.includes('flight') || t.includes('ticket') || t.includes('air') || t.includes('travel')) return '✈️';
  if (t.includes('hotel') || t.includes('stay') || t.includes('accommodation') || t.includes('host') || t.includes('address')) return '🏨';
  if (t.includes('bank') || t.includes('financial') || t.includes('funds') || t.includes('statement') || t.includes('solvency')) return '💰';
  if (t.includes('ds-160') || t.includes('form') || t.includes('application') || t.includes('schengen')) return '📝';
  if (t.includes('appointment') || t.includes('schedule') || t.includes('confirmation')) return '📅';
  if (t.includes('employment') || t.includes('work') || t.includes('leave') || t.includes('noc') || t.includes('job') || t.includes('ties')) return '💼';
  if (t.includes('insurance') || t.includes('medical') || t.includes('health')) return '🛡️';
  if (t.includes('student') || t.includes('cas') || t.includes('i-20') || t.includes('admit') || t.includes('degree')) return '🎓';
  if (t.includes('invitation') || t.includes('sponsor')) return '✉️';
  return '📄';
}

export function getDestinationChecklist(dest: string, purp: string): VaultDocItem[] {
  const d = (dest || '').toLowerCase();
  const p = (purp || '').toLowerCase();

  if (d.includes('united states') || d.includes('usa') || d.includes('america')) {
    if (p.includes('study') || p.includes('student')) {
      return [
        {
          key: 'us_i20',
          title: 'Form I-20 (Certificate of Eligibility)',
          description: 'Official Form I-20 issued by SEVP-certified US university, signed by both the Designated School Official (DSO) and student.',
          icon: '🎓',
          mandatory: true,
          hint: 'Original signed I-20 document'
        },
        {
          key: 'us_sevis',
          title: 'SEVIS I-901 Fee Payment Receipt ($350)',
          description: 'Official Department of Homeland Security receipt confirming payment of $350 SEVIS fee prior to visa interview.',
          icon: '🧾',
          mandatory: true,
          hint: 'SEVIS payment confirmation sheet'
        },
        {
          key: 'us_ds160',
          title: 'DS-160 Confirmation & F-1 Visa Appointment Letter',
          description: 'Form DS-160 Nonimmigrant Visa barcode confirmation page along with OFC biometric and consular interview appointment letter.',
          icon: '📋',
          mandatory: true,
          hint: 'Barcode confirmation & appointment slip'
        },
        {
          key: 'us_transcripts',
          title: 'Academic Transcripts, Degree & Standardized Test Scores',
          description: 'Official mark sheets, degree completion certificates, and valid test scorecards (IELTS, TOEFL, GRE, or GMAT).',
          icon: '📚',
          mandatory: true,
          hint: 'Original marksheets & test score report'
        },
        {
          key: 'us_financials',
          title: 'Financial Solvency Proof & Sponsor Affidavit of Support',
          description: 'Bank statements, fixed deposits, education loan sanction letter, or Form I-134 demonstrating funds covering at least 1 full year expenses.',
          icon: '💰',
          mandatory: true,
          hint: 'Bank statement with seal & loan letter'
        },
        {
          key: 'us_sop',
          title: 'Statement of Purpose (SOP) & Curriculum Vitae (CV)',
          description: 'Comprehensive statement of purpose detailing academic goals, career roadmap, and strong nonimmigrant intent.',
          icon: '📝',
          mandatory: false,
          hint: 'Structured SOP & 2-page resume'
        }
      ];
    }

    if (p.includes('work') || p.includes('employment')) {
      return [
        {
          key: 'us_i797',
          title: 'Form I-797 Notice of Action (Approved Petition)',
          description: 'Official USCIS approval notice for H-1B, L-1, or O-1 temporary worker visa category.',
          icon: '📜',
          mandatory: true,
          hint: 'USCIS I-797 approval copy'
        },
        {
          key: 'us_offer_letter',
          title: 'US Employer Employment Offer Letter & LCA Copy',
          description: 'Letter from US petitioner confirming job role, annual salary, work location, and approved Labor Condition Application.',
          icon: '🏢',
          mandatory: true,
          hint: 'Signed company offer & job specifications'
        },
        {
          key: 'us_ds160',
          title: 'DS-160 Confirmation & Visa Appointment Confirmation',
          description: 'Form DS-160 submission confirmation page with appointment schedule for biometric and interview slots.',
          icon: '📋',
          mandatory: true,
          hint: 'DS-160 barcode confirmation sheet'
        },
        {
          key: 'us_experience',
          title: 'Work Experience Credentials, Pay Slips & Degree Certificates',
          description: 'Past employment certificates, last 6 months pay slips, and university degrees verifying specialized knowledge.',
          icon: '💼',
          mandatory: true,
          hint: 'Relieving letters, pay slips & degree'
        }
      ];
    }

    // Default: USA Tourism / Visitor (B1/B2)
    return [
      {
        key: 'us_ds160',
        title: 'DS-160 Nonimmigrant Visa Confirmation Page',
        description: 'Complete online Form DS-160 submission confirmation page bearing clear alphanumeric barcode and applicant photograph.',
        icon: '📋',
        mandatory: true,
        hint: 'High-resolution barcode confirmation page'
      },
      {
        key: 'us_appointment',
        title: 'US Visa Appointment Confirmation Letter (OFC & Embassy)',
        description: 'Official appointment confirmation document for Visa Application Center (VAC/OFC) biometrics and US Embassy/Consulate interview.',
        icon: '📅',
        mandatory: true,
        hint: 'Appointment letter showing date, time & location'
      },
      {
        key: 'us_bank_statement',
        title: 'Proof of Liquid Funds (6-Month Bank Statements with Bank Seal)',
        description: 'Bank statements for past 6 consecutive months showing healthy liquid closing balance, regular transactions, and official bank branch stamp.',
        icon: '🏦',
        mandatory: true,
        hint: 'Original bank statement with branch seal'
      },
      {
        key: 'us_ties',
        title: 'Ties to Home Country (Employer Leave NOC / Business Registration)',
        description: 'Official letter from employer approving leave dates and confirming job continuation, or company registration / GST for self-employed.',
        icon: '🏢',
        mandatory: true,
        hint: 'Signed NOC on company letterhead / Business proof'
      },
      {
        key: 'us_itinerary',
        title: 'US Travel Itinerary & Hotel Reservation / Invitation Letter',
        description: 'Day-by-day travel plan outlining cities to visit, flight booking reservation, and confirmed hotel booking or host invitation letter.',
        icon: '🗺️',
        mandatory: true,
        hint: 'Tentative flight schedule & hotel vouchers'
      },
      {
        key: 'us_tax_returns',
        title: 'Income Tax Returns (ITR / Form 16 for Last 2-3 Years)',
        description: 'Acknowledgement receipts of filed Income Tax Returns or Form 16 proving legitimate taxable income and financial stability.',
        icon: '📑',
        mandatory: true,
        hint: 'ITR-V acknowledgement copies'
      }
    ];
  }

  if (d.includes('canada')) {
    if (p.includes('study') || p.includes('student')) {
      return [
        {
          key: 'ca_loa',
          title: 'Official Letter of Acceptance (LOA) & PAL Certificate',
          description: 'Official acceptance letter from Designated Learning Institution (DLI) along with mandatory Provincial Attestation Letter.',
          icon: '🎓',
          mandatory: true,
          hint: 'DLI LOA & Provincial Attestation Letter'
        },
        {
          key: 'ca_gic',
          title: 'Guaranteed Investment Certificate (GIC - $20,635 CAD)',
          description: 'GIC certificate issued by approved Canadian financial institution (Scotiabank, ICICI, CIBC, or RBC).',
          icon: '💳',
          mandatory: true,
          hint: 'GIC confirmation certificate'
        },
        {
          key: 'ca_tuition',
          title: 'First Year Tuition Fee Payment Official Receipt',
          description: 'Wire transfer payment receipt or university acknowledgement confirming 1st year tuition fee fully paid.',
          icon: '🧾',
          mandatory: true,
          hint: 'Official university fee receipt'
        },
        {
          key: 'ca_ielts',
          title: 'IELTS / PTE Academic Official Scorecard',
          description: 'Official language proficiency test scorecard meeting SDS / Non-SDS minimum score thresholds.',
          icon: '🗣️',
          mandatory: true,
          hint: 'Valid IELTS/PTE score sheet'
        },
        {
          key: 'ca_sop',
          title: 'Statement of Purpose (SOP) & Study Plan for IRCC Officer',
          description: 'Detailed statement explaining study choice, financial capability, career path in home country, and ties.',
          icon: '📝',
          mandatory: true,
          hint: 'Comprehensive study plan document'
        }
      ];
    }

    return [
      {
        key: 'ca_application',
        title: 'IMM 5257 Application for Visitor Visa & IMM 5645 Family Info',
        description: 'Completed IRCC application forms with accurate travel history, employment, and family tree declarations.',
        icon: '📋',
        mandatory: true,
        hint: 'IRCC application form package'
      },
      {
        key: 'ca_funds',
        title: 'Proof of Financial Means (4-Month Bank Statements & ITR)',
        description: 'Certified bank statements for past 4 months showing stable savings, salary deposits, and last 2 years tax returns.',
        icon: '🏦',
        mandatory: true,
        hint: 'Certified bank statements with manager sign'
      },
      {
        key: 'ca_ties',
        title: 'Employment Verification & Approved Leave Certificate (NOC)',
        description: 'Letter from employer confirming employment designation, monthly compensation, and approved leave duration.',
        icon: '🏢',
        mandatory: true,
        hint: 'Original employer NOC letter'
      },
      {
        key: 'ca_itinerary',
        title: 'Travel Purpose, Flight Itinerary & Hotel Bookings',
        description: 'Confirmed round-trip flight reservations, hotel vouchers or Canadian resident host invitation with status proof.',
        icon: '✈️',
        mandatory: true,
        hint: 'Flight itinerary & stay vouchers'
      }
    ];
  }

  if (d.includes('united kingdom') || d.includes('uk')) {
    return [
      {
        key: 'uk_vfs',
        title: 'UKVI Visa Application Confirmation & Document Checklist',
        description: 'Official UK Visas and Immigration submission confirmation and biometric appointment confirmation at VFS Global.',
        icon: '📋',
        mandatory: true,
        hint: 'UKVI appointment & barcode checklist'
      },
      {
        key: 'uk_bank',
        title: '6-Month Bank Statements with 28-Day Holding Verification',
        description: 'Original bank statements demonstrating consistent financial maintenance without sudden unverified large deposits.',
        icon: '🏦',
        mandatory: true,
        hint: 'Bank statement with branch seal'
      },
      {
        key: 'uk_employment',
        title: 'Employer Leave NOC, Pay Slips & Tax Documents',
        description: 'Approved leave letter from current employer, last 3 to 6 months payslips, and income tax returns.',
        icon: '🏢',
        mandatory: true,
        hint: 'Employer letter & salary slips'
      },
      {
        key: 'uk_itinerary',
        title: 'UK Travel Itinerary, Accommodation Booking & Flight Schedule',
        description: 'Hotel reservations or host accommodation letter along with planned trip schedule.',
        icon: '🗺️',
        mandatory: true,
        hint: 'Hotel bookings & roundtrip flights'
      }
    ];
  }

  if (d.includes('germany') || d.includes('france') || d.includes('schengen') || d.includes('italy') || d.includes('spain')) {
    return [
      {
        key: 'schengen_insurance',
        title: '€30,000 Travel Medical Insurance (Schengen Compliant)',
        description: 'Mandatory travel medical insurance covering emergency medical expenses, hospitalization, and repatriation with €30,000 minimum cover.',
        icon: '🛡️',
        mandatory: true,
        hint: 'Zero deductible Schengen insurance policy'
      },
      {
        key: 'schengen_flight',
        title: 'Confirmed Return Flight Reservations & Hotel Vouchers',
        description: 'Round-trip flight booking with PNR and confirmed hotel accommodation covering entire stay across Schengen zone.',
        icon: '✈️',
        mandatory: true,
        hint: 'Flight PNR & hotel reservation vouchers'
      },
      {
        key: 'schengen_bank',
        title: 'Bank Statements (3 Months) & Last 2 Years ITR',
        description: 'Duly stamped bank statement from bank branch and income tax returns confirming financial stability.',
        icon: '🏦',
        mandatory: true,
        hint: 'Stamped bank statement & ITR'
      },
      {
        key: 'schengen_noc',
        title: 'Employer Leave NOC / Business Registration Proof',
        description: 'Formal leave sanction letter on company letterhead or GST registration for self-employed.',
        icon: '🏢',
        mandatory: true,
        hint: 'Company signed leave approval'
      }
    ];
  }

  if (d.includes('emirate') || d.includes('uae') || d.includes('dubai') || d.includes('abu dhabi')) {
    return [
      {
        key: 'uae_ticket',
        title: 'Confirmed Return Flight Ticket (Within 30/60 Days)',
        description: 'Confirmed roundtrip air ticket with onward journey booking reference.',
        icon: '✈️',
        mandatory: true,
        hint: 'Airline booking reference / PNR'
      },
      {
        key: 'uae_hotel',
        title: 'Hotel Reservation / Resident Host Sponsorship Letter',
        description: 'Confirmed hotel booking voucher or host invitation with valid Emirates ID copy.',
        icon: '🏨',
        mandatory: true,
        hint: 'Confirmed stay accommodation'
      },
      {
        key: 'uae_funds',
        title: 'Proof of Financial Means (3-Month Bank Statements)',
        description: 'Bank statements showing sufficient funds for stay duration in UAE.',
        icon: '🏦',
        mandatory: true,
        hint: 'Bank statement with official stamp'
      },
      {
        key: 'uae_photo',
        title: 'Passport Size Photograph (Recent, White Background, 35x45mm)',
        description: 'High-contrast studio photograph adhering to UAE ICP biometric guidelines.',
        icon: '📸',
        mandatory: true,
        hint: 'Studio photo with white backdrop'
      }
    ];
  }

  // Default international travel checklist
  return [
    {
      key: 'general_flight',
      title: 'Confirmed Return Flight Ticket / Reservation',
      description: 'Proof of onward or return travel from destination country.',
      icon: '✈️',
      mandatory: true,
      hint: 'Airline booking confirmation'
    },
    {
      key: 'general_hotel',
      title: 'Hotel Accommodation Voucher / Host Invitation',
      description: 'Proof of confirmed lodging or host address and contact details.',
      icon: '🏨',
      mandatory: true,
      hint: 'Hotel confirmation or host letter'
    },
    {
      key: 'general_funds',
      title: 'Proof of Financial Means (3-Month Bank Statements)',
      description: 'Demonstrating sufficient liquid funds to cover all living and travel expenses.',
      icon: '🏦',
      mandatory: true,
      hint: 'Official bank statement'
    },
    {
      key: 'general_photo',
      title: 'Passport Size Photograph (Recent, White Background)',
      description: 'Recent photograph meeting consular biometric photo dimensions (35x45mm).',
      icon: '📸',
      mandatory: true,
      hint: 'High-contrast studio photograph'
    }
  ];
}

export function getDocConditions(title: string, desc: string): string[] {
  const t = (title || '').toLowerCase();
  if (t.includes('passport') && !t.includes('photo')) {
    return [
      'Valid for at least 3 months beyond intended stay',
      'Issued within the last 10 years',
      'Minimum 2 blank pages'
    ];
  }
  if (t.includes('application form') || t.includes('schengen visa application') || t.includes('visa form')) {
    return [
      'Fully filled and signed',
      'Date of signature within last 30 days'
    ];
  }
  if (t.includes('photo') || t.includes('photograph')) {
    return [
      'Recent (taken within last 6 months)',
      '35mm × 45mm, white background',
      'No glasses, no headgear'
    ];
  }
  if (t.includes('itinerary') || t.includes('flight') || t.includes('ticket')) {
    return [
      'Confirmed flight tickets',
      'Round trip itinerary'
    ];
  }
  if (t.includes('hotel') || t.includes('accommodation') || t.includes('reservation')) {
    return [
      'Confirmed booking for entire stay',
      'Hotel name and address required'
    ];
  }
  if (t.includes('insurance')) {
    return [
      'Minimum coverage of €30,000',
      'Must cover entire Schengen / travel area',
      'Valid for entire stay'
    ];
  }
  if (t.includes('bank') || t.includes('statement') || t.includes('financial')) {
    return [
      'Last 3 months statements',
      'Sufficient balance to cover stay',
      'Name & account number visible'
    ];
  }
  if (t.includes('cover letter') || t.includes('purpose') || t.includes('intent')) {
    return [
      'Purpose of visit',
      'Details of stay and return',
      "Applicant's contact details"
    ];
  }
  if (t.includes('employment') || t.includes('noc') || t.includes('leave') || t.includes('salary')) {
    return [
      'Original employer NOC / Leave letter',
      'Last 3 months salary payslips',
      'Company seal and HR signature'
    ];
  }
  if (t.includes('tax') || t.includes('itr')) {
    return [
      'Last 2 to 3 years ITR-V e-filing acknowledgements',
      'Form 16 or audited financial report'
    ];
  }
  if (desc) {
    const parts = desc.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 5);
    if (parts.length > 0) return parts.slice(0, 3);
  }
  return [
    'Official statutory requirement',
    'Must be clearly legible in PDF or JPG format',
    'Meets consular authenticity criteria'
  ];
}

export function getDocIconConfig(title: string) {
  const t = (title || '').toLowerCase();
  if (t.includes('passport') && !t.includes('photo')) {
    return { bg: 'bg-[#00a896]/10 text-[#00a896] border border-[#00a896]/30', iconName: 'passport' };
  }
  if (t.includes('application form') || t.includes('form')) {
    return { bg: 'bg-emerald-50 text-emerald-600 border border-emerald-200/80', iconName: 'form' };
  }
  if (t.includes('photo') || t.includes('photograph')) {
    return { bg: 'bg-amber-50 text-amber-600 border border-amber-200/80', iconName: 'photo' };
  }
  if (t.includes('itinerary') || t.includes('flight') || t.includes('ticket')) {
    return { bg: 'bg-sky-50 text-sky-600 border border-sky-200/80', iconName: 'flight' };
  }
  if (t.includes('hotel') || t.includes('accommodation')) {
    return { bg: 'bg-indigo-50 text-indigo-600 border border-indigo-200/80', iconName: 'hotel' };
  }
  if (t.includes('insurance')) {
    return { bg: 'bg-rose-50 text-rose-600 border border-rose-200/80', iconName: 'insurance' };
  }
  if (t.includes('bank') || t.includes('statement') || t.includes('financial')) {
    return { bg: 'bg-teal-50 text-teal-600 border border-teal-200/80', iconName: 'bank' };
  }
  if (t.includes('cover letter')) {
    return { bg: 'bg-rose-50 text-rose-500 border border-rose-200/80', iconName: 'letter' };
  }
  return { bg: 'bg-slate-50 text-slate-600 border border-slate-200/80', iconName: 'file' };
}
