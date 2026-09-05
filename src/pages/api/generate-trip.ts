// src/pages/api/generate-trip.ts
import type { APIRoute } from 'astro';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

export const prerender = false;

// Resolve Gemini API key safely
const getGeminiApiKey = (): string => {
  let key = (import.meta?.env?.GEMINI_API_KEY as string | undefined)?.trim();
  if (key) return key;

  key = (process.env.GEMINI_API_KEY as string | undefined)?.trim();
  if (key) return key;

  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/^GEMINI_API_KEY\s*=\s*(.*)$/m);
      if (match) {
        key = match[1].trim().replace(/^["']|["']$/g, '');
        if (key) return key;
      }
    }
  } catch (err) {}

  return '';
};

// Parental Security & Regulatory Compliance Pathway Knowledge
const destinationSecurityKnowledge: Record<string, { image: string; fallbackDays: Array<{ title: string; morning: string; afternoon: string; evening: string }> }> = {
  canada: {
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=600&auto=format&fit=crop',
    fallbackDays: [
      { title: 'Stage 1: Documentation, SOP & Proof of Funds Verification', morning: 'Academic transcript audit, WES credential evaluation & IELTS score check', afternoon: 'Proof of Funds GIC deposit ($20,635 CAD) & tuition fee confirmation', evening: 'Statement of Purpose (SOP) & legal tie-back review with certified consultant' },
      { title: 'Stage 2: DLI Acceptance, CAQ & PAL Letter Issuance', morning: 'Designated Learning Institution (DLI) unconditional acceptance letter', afternoon: 'Provincial Attestation Letter (PAL) or Quebec CAQ certificate processing', evening: 'Pre-submission document notarization & identity check' },
      { title: 'Stage 3: Upfront Medical Clearance & VFS Biometrics', morning: 'IRCC panel physician Immigration Medical Examination (IME)', afternoon: 'Digital IRCC portal application filing & fee payment', evening: 'VFS Global biometrics capture & digital photo appointment' },
      { title: 'Stage 4: Visa Grant POE Letter & Flight Transit Verification', morning: 'Receive official IRCC Study / Work Permit Letter of Introduction (POE)', afternoon: 'Book student flight ticket & verify direct airside transit exemptions', evening: 'Enroll in mandatory international health insurance cover' },
      { title: 'Stage 5: Housing Escrow, Multi-Currency Forex & Airport Pickup', morning: 'Confirm verified student housing / rental contract with escrow protection', afternoon: 'Activate Zero-Markup Forex Card & load CAD funds + get Canadian 5G eSIM', evening: 'Book verified airport driver pickup & CBSA border interview prep' }
    ]
  },
  usa: {
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=600&auto=format&fit=crop',
    fallbackDays: [
      { title: 'Stage 1: SEVP Acceptance, Form I-20 & SEVIS I-901 Fee', morning: 'SEVP-certified institution admission confirmation & financial affidavit audit', afternoon: 'Receive official Form I-20 with SEVIS ID and DSO advisor contact', evening: 'Pay mandatory SEVIS I-901 fee online and print official receipt' },
      { title: 'Stage 2: DS-160 Filing & Consular Appointment Scheduling', morning: 'Complete Online Nonimmigrant Visa Application (DS-160) barcode form', afternoon: 'Pay US visa application fee and book OFC Biometrics + Consular Interview', evening: 'Assemble standardized financial, academic, and home-tie evidence dossier' },
      { title: 'Stage 3: OFC Biometrics & US Embassy Consular Interview', morning: 'Attend OFC (Offsite Facilitation Center) for photo and fingerprinting', afternoon: 'Attend face-to-face Consular Interview with clarity on academic intent', evening: 'Visa approval confirmation & passport submitted for visa stamping' },
      { title: 'Stage 4: Flight Ticketing, Transit Exemption & Immunization', morning: 'Book international flight arriving up to 30 days prior to program start', afternoon: 'Confirm transit rules for European/Middle Eastern hub layovers', evening: 'Submit university mandatory immunization form & health insurance' },
      { title: 'Stage 5: USD Forex, 5G eSIM, Verified Pickup & CBP Landing', morning: 'Load USD Multi-Currency Card & activate instant QR code US 5G eSIM', afternoon: 'Confirm verified student airport pickup and campus housing check-in', evening: 'CBP Port of Entry inspection clearance at JFK/SFO and I-94 electronic record' }
    ]
  },
  uk: {
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600&auto=format&fit=crop',
    fallbackDays: [
      { title: 'Stage 1: CAS Issuance, 28-Day Fund Maturation & TB Test', morning: 'Fulfill university conditional offer & receive unconditional CAS letter', afternoon: 'Audit 28-day maintenance funds in approved banking institution', evening: 'Complete mandatory UK TB (Tuberculosis) screening at approved IOM clinic' },
      { title: 'Stage 2: UKVI Online Application & NHS Health Surcharge (IHS)', morning: 'Fill out UK Visas & Immigration online application referencing CAS number', afternoon: 'Pay Immigration Health Surcharge (IHS) for full NHS medical coverage', evening: 'Upload digital supporting evidence to VFS Global / TLScontact document portal' },
      { title: 'Stage 3: VFS Biometrics & Digital eVisa / Vignette Decision', morning: 'Attend VFS Global biometric appointment for fingerprinting & passport submission', afternoon: 'Application processed by UKVI Home Office caseworker (Standard / Priority)', evening: 'Receive UKVI decision letter and collect passport with entry vignette' },
      { title: 'Stage 4: Flight Booking & Student Luggage Allocation', morning: 'Book flight ticket with double 23kg student baggage allowance', afternoon: 'Confirm airport express train / verified coach transfer to university city', evening: 'Complete UK Passenger arrival registration & accommodation contract' },
      { title: 'Stage 5: UKVI eVisa Account, Monzo/Revolut Bank & Housing Landing', morning: 'Set up UKVI digital status share code on smartphone', afternoon: 'Arrive at UK border with passport & CAS documentation', evening: 'Check-in to verified student hall, open local bank account, and get UK SIM' }
    ]
  },
  australia: {
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=600&auto=format&fit=crop',
    fallbackDays: [
      { title: 'Stage 1: CRICOS CoE, Genuine Student (GS) & OSHC Health Cover', morning: 'Satisfy Genuine Student (GS) criteria & accept university offer', afternoon: 'Pay initial tuition deposit and receive electronic Confirmation of Enrolment (CoE)', evening: 'Purchase mandatory Overseas Student Health Cover (OSHC) with Medibank/Allianz' },
      { title: 'Stage 2: ImmiAccount Filing & Financial Capacity Evidence', morning: 'Create ImmiAccount and fill out Subclass 500 Student Visa application', afternoon: 'Upload financial capacity evidence (AUD $29,710 living cost + tuition fee)', evening: 'Pay Department of Home Affairs visa application fee' },
      { title: 'Stage 3: HAP ID Health Examination & Biometrics Collection', morning: 'Generate eMedical referral letter with HAP ID & book panel physician', afternoon: 'Complete medical examination & chest X-ray at authorized medical clinic', evening: 'Attend VFS Global Australian Biometric Collection Centre for fingerprinting' },
      { title: 'Stage 4: Visa Grant Notice, VEVO Conditions & Flight Booking', morning: 'Receive Department of Home Affairs Visa Grant Notice with VEVO verification', afternoon: 'Review Condition 8105 (work limit) and Condition 8501 (health insurance)', evening: 'Book international flight to Sydney, Melbourne, or Brisbane via Asian hub' },
      { title: 'Stage 5: TFN Application, Commonwealth Bank & Airport Transfer', morning: 'Apply for Australian Tax File Number (TFN) online', afternoon: 'Open Australian bank account (Commonwealth / ANZ) with online ID check', evening: 'Confirm verified airport driver pickup and check-in to verified student accommodation' }
    ]
  },
  germany: {
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=600&auto=format&fit=crop',
    fallbackDays: [
      { title: 'Stage 1: University Zulassung & Sperrkonto (Blocked Account)', morning: 'Receive official admission letter (Zulassungsbescheid) or Opportunity Card', afternoon: 'Open German Blocked Account (Sperrkonto) with Coracle / Expatrio (€11,208/yr)', evening: 'Enroll in mandatory statutory health insurance (TK / Barmer)' },
      { title: 'Stage 2: VIDEX D-Visa Application & APS Certificate', morning: 'Complete digital VIDEX application for German National Long-Stay Visa (Category D)', afternoon: 'Compile chronological Europass CV, German motivation letter & APS certificate', evening: 'Schedule VFS German Visa Application Centre appointment slot' },
      { title: 'Stage 3: VFS Submission & Ausländerbehörde Clearance', morning: 'Submit complete dossier and biometrics at VFS German Application Centre', afternoon: 'Application forwarded to German Federal Foreign Office & local Alien Authority', evening: 'Receive passport stamped with German National D-Visa' },
      { title: 'Stage 4: Flight Booking to Frankfurt/Munich & Schengen Transit', morning: 'Book air ticket arriving ahead of semester start date', afternoon: 'Verify Schengen free movement rules & student luggage limits', evening: 'Secure temporary accommodation / WG-Zimmer with Wohnungsgeberbestätigung' },
      { title: 'Stage 5: City Registration (Anmeldung) & Bank Account Unblocking', morning: 'Arrive in Germany and register address at local Bürgeramt within 14 days', afternoon: 'Activate blocked account monthly payouts with German IBAN bank account', evening: 'Complete university matriculation (Immatrikulation) and receive Semesterticket' }
    ]
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      destination = 'Canada',
      vibe = 'study',
      duration = 5,
      modifiers = []
    } = body;

    const apiKey = getGeminiApiKey();
    const normDest = (destination || 'Canada').toLowerCase().replace(/[^a-z]/g, '');
    const fallback = destinationSecurityKnowledge[normDest] || destinationSecurityKnowledge['canada'];

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `You are the Chief Immigration Officer & Parental Overseas Security Architect for TravlTik.
Generate a strictly professional, practical 5-stage pre-departure & settlement pathway for a traveler heading to ${destination} for ${vibe}.

CRITICAL ISOLATION RULE:
- Adhere strictly and exclusively to the destination country: "${destination}".
- Never mix authorities, airports, currencies, or legal frameworks from previous conversational context or other countries.
- All 5 stages must apply specifically to entering and settling in "${destination}".

PRE-OUTPUT VERIFICATION GUARDRAIL:
- Ensure airport codes, legal terms, immigration bodies, and currency exactly belong to "${destination}".

IMPORTANT RULES:
- DO NOT INCLUDE ANY TOURISM, SIGHTSEEING, BEACHES, CAFES, SHOPPING, OR CULINARY ITINERARY.
- STRICTLY FOCUS ON PARENTAL PEACE-OF-MIND: Document verification, SOP, Proof of Funds, Biometrics, Visa Grant, Transit Visa checking, Airport Pickup by verified driver, Escrow Accommodation, 5G eSIM, Multi-currency Forex, and Border Compliance.
- Return ONLY valid JSON in this structure:
{
  "success": true,
  "plan": {
    "days": [
      {
        "dayNumber": 1,
        "title": "Stage 1: Documentation & Legal Eligibility Audit",
        "summary": "Brief 1-sentence stage milestone overview",
        "morning": "Morning critical compliance step",
        "afternoon": "Afternoon financial/institutional verification step",
        "evening": "Evening legal consultation & review step"
      }
    ]
  }
}`;

        let response: any = null;
        try {
          response = await ai.models.generateContent({
            model: 'gemini-3.7-flash',
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
          });
        } catch (f35Err) {
          response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
          });
        }

        const text = response.text || '';
        const match = text.match(/\{[\s\S]*\}/);
        if (match) {
          const parsed = JSON.parse(match[0]);
          if (parsed && parsed.plan && Array.isArray(parsed.plan.days) && parsed.plan.days.length > 0) {
            return new Response(
              JSON.stringify({
                success: true,
                plan: {
                  days: parsed.plan.days.map((d: any, idx: number) => ({
                    ...d,
                    image: fallback.image
                  }))
                }
              }),
              { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini pathway generation failed, using security fallback:', geminiErr);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        plan: {
          days: fallback.fallbackDays.map((d, idx) => ({
            dayNumber: idx + 1,
            title: d.title,
            summary: d.morning.substring(0, 70) + '...',
            image: fallback.image,
            morning: d.morning,
            afternoon: d.afternoon,
            evening: d.evening
          }))
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err: any) {
    console.error('API /api/generate-trip error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to generate pathway.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
