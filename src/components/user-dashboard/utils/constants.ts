import type { CountryOption, PurposeOption, VaultDocItem } from '../types';

export const dashboardPassportOptions: CountryOption[] = [
  { value: 'India', label: 'India (Indian)', flag: '🇮🇳' },
  { value: 'United States', label: 'United States (American)', flag: '🇺🇸' },
  { value: 'United Arab Emirates', label: 'United Arab Emirates (Emirati)', flag: '🇦🇪' },
  { value: 'United Kingdom', label: 'United Kingdom (British)', flag: '🇬🇧' },
  { value: 'Canada', label: 'Canada (Canadian)', flag: '🇨🇦' },
  { value: 'Australia', label: 'Australia (Australian)', flag: '🇦🇺' },
  { value: 'Nepal', label: 'Nepal (Nepalese)', flag: '🇳🇵' },
  { value: 'Bangladesh', label: 'Bangladesh (Bangladeshi)', flag: '🇧🇩' },
  { value: 'Sri Lanka', label: 'Sri Lanka (Sri Lankan)', flag: '🇱🇰' },
  { value: 'Philippines', label: 'Philippines (Philippine)', flag: '🇵🇭' },
  { value: 'Nigeria', label: 'Nigeria (Nigerian)', flag: '🇳🇬' },
  { value: 'Pakistan', label: 'Pakistan (Pakistani)', flag: '🇵🇰' },
  { value: 'Germany', label: 'Germany (German)', flag: '🇩🇪' },
  { value: 'Other', label: 'Other Country', flag: '🌍' }
];

export const dashboardDestinationOptions: CountryOption[] = [
  { value: 'United States', label: 'United States (USA)', flag: '🇺🇸', defaultVisa: 'B1/B2 Visitor Visa' },
  { value: 'United Arab Emirates', label: 'United Arab Emirates (UAE / Dubai)', flag: '🇦🇪', defaultVisa: '30/60 Days Tourist Visa' },
  { value: 'Canada', label: 'Canada', flag: '🇨🇦', defaultVisa: 'Visitor Visa / Study Permit' },
  { value: 'United Kingdom', label: 'United Kingdom (UK)', flag: '🇬🇧', defaultVisa: 'Standard Visitor Visa' },
  { value: 'Australia', label: 'Australia', flag: '🇦🇺', defaultVisa: 'Subclass 600 / Subclass 500' },
  { value: 'Germany', label: 'Germany / Schengen', flag: '🇩🇪', defaultVisa: 'Schengen Visa Type C' },
  { value: 'Jordan', label: 'Jordan', flag: '🇯🇴', defaultVisa: 'Jordan Pass / Entry Visa' },
  { value: 'Singapore', label: 'Singapore', flag: '🇸🇬', defaultVisa: 'e-Visa / Tourist Pass' },
  { value: 'France', label: 'France / Schengen', flag: '🇫🇷', defaultVisa: 'Short-Stay Schengen Visa' },
  { value: 'New Zealand', label: 'New Zealand', flag: '🇳🇿', defaultVisa: 'NZeTA / Visitor Visa' },
  { value: 'Ireland', label: 'Ireland', flag: '🇮🇪', defaultVisa: 'Short Stay "C" Tourist Visa' },
  { value: 'Japan', label: 'Japan', flag: '🇯🇵', defaultVisa: 'Single/Multiple Entry Tourist Visa' }
];

export const dashboardPurposeOptions: PurposeOption[] = [
  { value: 'Tourism / Vacation', label: 'Tourism / Vacation', emoji: '🏝️' },
  { value: 'Higher Studies', label: 'Higher Studies', emoji: '🎓' },
  { value: 'Employment / Work', label: 'Employment / Work', emoji: '💼' },
  { value: 'Business Visit', label: 'Business Visit', emoji: '🏢' },
  { value: 'Family / Friends Visit', label: 'Family / Friends Visit', emoji: '👨‍👩‍👦' }
];

export const globalTravelDocuments: VaultDocItem[] = [
  {
    key: 'global_passport',
    title: 'Original Passport (Bio-data Page Front & Back)',
    description: 'Current valid passport bio-data page with minimum 6 months validity from intended departure date and at least 2 clear blank visa pages.',
    icon: '🛂',
    mandatory: true,
    hint: 'Front & back booklet pages with clear MRZ zone'
  },
  {
    key: 'global_travel_history',
    title: 'Travel History Proofs (Immigration Stamps & Boarding Passes)',
    description: 'Scans of all entry/exit immigration stamps from previous international travels, old flight boarding passes, or completed foreign trip itineraries.',
    icon: '✈️',
    mandatory: false,
    hint: 'Proves positive travel compliance record'
  },
  {
    key: 'global_financial',
    title: 'Bank Statement (Last 6 Months Certified with Bank Seal)',
    description: 'Official continuous stamped bank account statement reflecting sufficient liquid funds for trip duration and regular incoming salary or business cashflow.',
    icon: '🏦',
    mandatory: true,
    hint: 'Official bank stamp & branch manager signature'
  },
  {
    key: 'global_photo',
    title: 'Biometric Passport Photo (35x45mm or 2x2in White Background)',
    description: 'Recent studio-captured digital passport photograph meeting exact consular specs (80% face coverage, neutral expression, white backdrop, no spectacles).',
    icon: '📸',
    mandatory: true,
    hint: 'ICAO biometric compliance standard'
  },
  {
    key: 'global_flight',
    title: 'Confirmed Return Flight Ticket / Verifiable PNR Itinerary',
    description: 'Confirmed round-trip airline reservation showing inbound and outbound travel dates, connecting airport hubs, and verifiable airline booking reference.',
    icon: '🎫',
    mandatory: true,
    hint: 'Proof of intended departure from destination'
  },
  {
    key: 'global_insurance',
    title: 'Overseas Travel Medical Insurance ($50,000+ Coverage)',
    description: 'Valid international travel medical insurance policy with emergency hospitalization, COVID-19 treatment, and repatriation coverage for entire trip length.',
    icon: '🛡️',
    mandatory: true,
    hint: 'Minimum $50,000 USD / €30,000 coverage mandatory'
  }
];

export const defaultVaultList: VaultDocItem[] = [
  {
    key: 'statutory_passport',
    title: 'Valid Passport',
    description: 'Valid biometric machine-readable passport with at least 6 months validity from departure date.',
    icon: '📘',
    mandatory: true,
    hint: 'Front & back booklet pages with clear MRZ zone'
  },
  {
    key: 'statutory_national_id',
    title: 'National Identity Card (Aadhaar / National ID)',
    description: 'Official government-issued photo identity or citizenship card of the traveller.',
    icon: '🪪',
    mandatory: false,
    hint: 'Government-issued photo identification'
  },
  {
    key: 'statutory_tax_id',
    title: 'PAN Card / Taxpayer Identification',
    description: 'Official taxpayer identification number or PAN card document.',
    icon: '💳',
    mandatory: false,
    hint: 'Official tax registration document'
  },
  {
    key: 'statutory_financial',
    title: 'Bank Statement (Last 6 Months)',
    description: 'Recent consecutive months stamped bank statements demonstrating financial solvency.',
    icon: '🏦',
    mandatory: false,
    hint: 'Bank statement with official branch seal'
  },
  {
    key: 'statutory_photos',
    title: 'Biometric Passport Photos (35×45mm)',
    description: 'Recent color biometric photographs conforming to international travel standards.',
    icon: '📸',
    mandatory: false,
    hint: 'White background, neutral facial expression'
  },
  {
    key: 'statutory_insurance',
    title: 'Travel Medical Insurance Policy',
    description: 'Comprehensive travel health policy covering emergency medical expenses and evacuation.',
    icon: '🛡️',
    mandatory: false,
    hint: 'Comprehensive travel health policy certificate'
  },
  {
    key: 'statutory_flight',
    title: 'Flight Ticket / Booking Itinerary',
    description: 'Official airline round-trip reservation or confirmed PNR itinerary.',
    icon: '✈️',
    mandatory: false,
    hint: 'Confirmed flight ticket / PNR itinerary'
  },
  {
    key: 'statutory_accommodation',
    title: 'Proof of Accommodation / Hotel Stay',
    description: 'Confirmed hotel booking voucher, rental agreement, or official host invitation.',
    icon: '🏨',
    mandatory: false,
    hint: 'Hotel reservation voucher or host declaration'
  },
  {
    key: 'statutory_employment',
    title: 'Employment Proof / Salary Slips',
    description: 'Official employer letter, salary slips, or business registration certificate.',
    icon: '💼',
    mandatory: false,
    hint: 'Proof of occupation or business'
  }
];

export function getDefaultLuggageItems(dest: string) {
  return {
    cabin: [
      { id: 'cabin_passport', title: 'Original Passport & Visa / eVisa Printout', hint: 'Must have min. 6 months validity from travel date', icon: '🛂' },
      { id: 'cabin_tickets', title: 'Confirmed Flight Ticket & Boarding Pass', hint: 'Printed copy + offline PDF on smartphone', icon: '✈️' },
      { id: 'cabin_hotel', title: 'Hotel Booking / Host Invitation Letter', hint: 'Keep address & phone number readily accessible', icon: '🏨' },
      { id: 'cabin_meds', title: 'Prescription Medicines + Doctor\'s Prescription', hint: 'Keep in original packaging with doctor stamp', icon: '💊' },
      { id: 'cabin_powerbank', title: 'Portable Power Bank (Hand Luggage ONLY)', hint: 'Airlines strictly prohibit power banks in checked baggage (max 100Wh)', icon: '🔋' },
      { id: 'cabin_electronics', title: 'Laptop, Phone, Charger & Universal Adapter', hint: 'Check destination plug type before boarding', icon: '💻' },
      { id: 'cabin_forex', title: 'Forex Travel Card & Emergency Local Cash', hint: 'Carry at least $200-$500 cash in local currency', icon: '💵' },
      { id: 'cabin_pen', title: 'Ballpoint Pen for Arrival / Customs Card', hint: 'Airports often do not provide pens on arrival', icon: '🖊️' },
    ],
    checked: [
      { id: 'checked_clothes', title: `Weather-Appropriate Clothing for ${dest}`, hint: 'Check 7-day temperature forecast before packing', icon: '👕' },
      { id: 'checked_shoes', title: 'Comfortable Walking Shoes & Casual Footwear', hint: 'Break in new shoes before travel to prevent blisters', icon: '👟' },
      { id: 'checked_toiletries', title: 'Toiletries & Liquids (>100ml packed securely)', hint: 'Pack liquids in sealed zip-lock bags to avoid leaks', icon: '🧴' },
      { id: 'checked_docs_copy', title: 'Duplicate Physical Copies of All Travel Documents', hint: 'Store in waterproof sleeve inside checked suitcase', icon: '📂' },
      { id: 'checked_lock', title: 'TSA-Approved Luggage Combination Lock', hint: 'Allows customs security inspection without damaging bag', icon: '🔒' },
      { id: 'checked_tag', title: 'Luggage Name Tag with Contact Phone & Email', hint: 'Crucial for quick baggage recovery in case of delay', icon: '🏷️' },
    ],
    predeparture: [
      { id: 'prep_webcheckin', title: 'Online Web Check-in & Seat Selection', hint: 'Opens 24 to 48 hours prior to scheduled departure', icon: '🎫' },
      { id: 'prep_insurance', title: 'Travel Medical Insurance Policy Saved Offline', hint: `Must cover emergency hospitalization in ${dest}`, icon: '🛡️' },
      { id: 'prep_esim', title: 'International Roaming or Destination eSIM Ready', hint: 'Setup Airalo/Holafly eSIM before departure for instant data', icon: '📱' },
      { id: 'prep_bank', title: 'Bank International Card Usage Enabled in App', hint: 'Enable international ATM withdrawal & POS transactions', icon: '💳' },
      { id: 'prep_embassy', title: 'Home Country Embassy / Consular Contact Saved', hint: `Save 24x7 emergency helpline for ${dest}`, icon: '🏛️' },
    ]
  };
}
