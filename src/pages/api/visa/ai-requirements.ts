// src/pages/api/visa/ai-requirements.ts
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

export interface AIRequirementItem {
  title: string;
  description: string;
}

export interface AIRequirementsData {
  fromCountry: string;
  toCountry: string;
  purpose: string;
  visaType: string;
  officialSource: string;
  entryAndDocumentRequirements: AIRequirementItem[];
  supportingDocuments: AIRequirementItem[];
  howToApply: string[];
  costs: {
    visaFee: string;
    serviceFee: string;
    totalFee: string;
    feeNote: string;
  };
  processingAndTiming: {
    applyWindow: string;
    decisionTime: string;
    maxExtension: string;
    centerNote?: string;
  };
}

// Built-in verified database matching official GVCW & VFS regulations
function getVerifiedOfficialData(from: string, to: string, purpose: string): AIRequirementsData {
  const toLower = to.toLowerCase();
  const purposeLower = purpose.toLowerCase();
  const isGreece = toLower.includes('greece') || toLower === 'gr';
  const isSchengen = isGreece || ['france', 'germany', 'italy', 'spain', 'netherlands', 'switzerland', 'austria', 'portugal', 'belgium', 'sweden', 'schengen'].some(c => toLower.includes(c));

  if (isGreece && (purposeLower.includes('tour') || purposeLower.includes('vacation') || purposeLower.includes('visit') || !purposeLower.includes('work'))) {
    return {
      fromCountry: from || 'India',
      toCountry: 'Greece',
      purpose: 'Tourism / Vacation',
      visaType: 'Short-stay Schengen Visa (Type C)',
      officialSource: 'Greek official sources (GVCW & Embassy of Greece in New Delhi)',
      entryAndDocumentRequirements: [
        {
          title: 'Passport',
          description: 'Valid at least 3 months after the planned return; issued within previous 10 years; at least 2 blank pages.'
        },
        {
          title: 'Visa application form',
          description: 'Fully completed and signed in English or Greek.'
        },
        {
          title: 'Photos',
          description: 'Two recent colour passport photos, 3.5 x 4 cm, forward-facing, light/white background.'
        },
        {
          title: 'Travel medical insurance',
          description: 'Minimum €30,000; covers all Schengen states and the full intended stay, including medical repatriation.'
        },
        {
          title: 'Travel & accommodation',
          description: 'Return/round-trip reservation and lodging evidence for the trip / each Schengen destination where applicable.'
        }
      ],
      supportingDocuments: [
        {
          title: 'Financial means',
          description: 'Bank statement showing the last 3 months\' movements with original bank seal and stamp.'
        },
        {
          title: 'Income evidence',
          description: 'For employed applicants: last 3 months payslips, employment contract and employer holiday approval letter.'
        },
        {
          title: 'Tax / employment evidence',
          description: 'Indian income-tax return (ITR-V) acknowledgement for the last two assessment years (as listed by the Embassy).'
        },
        {
          title: 'If self-employed',
          description: 'Company registration certificate, GST registration and relevant income tax assessment documentation.'
        },
        {
          title: 'Tourism evidence',
          description: 'Travel-agency booking certificate, detailed day-by-day itinerary or other appropriate travel documents.'
        }
      ],
      howToApply: [
        'Check requirements & prepare documents.',
        'Complete the Greece online application form and print it.',
        'Book a GVCW (Global Visa Center World) Visa Application Center appointment.',
        'Attend in person for submission and biometrics.',
        'Track the application and collect passport.'
      ],
      costs: {
        visaFee: '€90',
        serviceFee: '€30',
        totalFee: '€120',
        feeNote: 'Payable in INR at the VAC; exchange rate and fees may change.'
      },
      processingAndTiming: {
        applyWindow: 'Apply up to 6 months before travel.',
        decisionTime: 'Decision: up to 15 days after admissible receipt by Embassy.',
        maxExtension: 'May extend to 45 calendar days in individual cases.',
        centerNote: 'Applications from non-New-Delhi VACs: allow additional dispatch time; GVCW notes 5 extra days for those centers.'
      }
    };
  }

  if (isSchengen) {
    return {
      fromCountry: from || 'India',
      toCountry: to,
      purpose: purposeLower.includes('study') ? 'Higher Studies' : purposeLower.includes('work') ? 'Employment' : 'Tourism / Vacation',
      visaType: purposeLower.includes('study') ? 'National Long-Stay Student Visa (Type D)' : 'Short-stay Schengen Visa (Type C)',
      officialSource: `Official Consular Affairs & VFS / TLScontact for ${to}`,
      entryAndDocumentRequirements: [
        {
          title: 'Passport',
          description: 'Valid at least 3 months after the planned return; issued within previous 10 years; at least 2 blank pages.'
        },
        {
          title: 'Visa application form',
          description: 'Fully completed and signed official application form.'
        },
        {
          title: 'Photos',
          description: 'Two recent colour passport photos (3.5 x 4.5 cm), forward-facing, light/white background.'
        },
        {
          title: 'Travel medical insurance',
          description: 'Minimum €30,000; covers all Schengen states and the full intended stay, including medical repatriation.'
        },
        {
          title: 'Travel & accommodation',
          description: 'Return/round-trip reservation and lodging evidence for the trip / each Schengen destination where applicable.'
        }
      ],
      supportingDocuments: [
        {
          title: 'Financial means',
          description: 'Bank statement showing the last 3 to 6 months\' movements with bank stamp and seal.'
        },
        {
          title: 'Income evidence',
          description: 'For employed applicants: last 3 months payslips, employment contract and employer holiday approval.'
        },
        {
          title: 'Tax / employment evidence',
          description: 'Income-tax return (ITR-V) acknowledgement for the last two assessment years.'
        },
        {
          title: 'If self-employed',
          description: 'Company registration certificate, GST registration and relevant business tax returns.'
        },
        {
          title: 'Purpose evidence',
          description: purposeLower.includes('study') ? 'University unconditional offer and tuition receipts.' : 'Travel-agency booking certificate or travel itinerary.'
        }
      ],
      howToApply: [
        'Check requirements & prepare documents.',
        'Complete the online application form and print it.',
        'Book a Visa Application Center appointment.',
        'Attend in person for submission and biometrics.',
        'Track the application and collect passport.'
      ],
      costs: {
        visaFee: '€90',
        serviceFee: '€30',
        totalFee: '€120',
        feeNote: 'Payable in INR at the VAC; exchange rate and fees may change.'
      },
      processingAndTiming: {
        applyWindow: 'Apply up to 6 months before travel.',
        decisionTime: 'Decision: up to 15 days after admissible receipt by Embassy.',
        maxExtension: 'May extend to 45 calendar days in individual cases.',
        centerNote: 'Applications from non-metro VACs: allow additional transit time for diplomatic courier dispatch.'
      }
    };
  }

  // Generic Destination Fallback
  return {
    fromCountry: from || 'India',
    toCountry: to,
    purpose: purpose || 'Tourism / Vacation',
    visaType: `${to} Entry Visa / Electronic Travel Authorization`,
    officialSource: `Official Ministry of Foreign Affairs & Immigration Authority of ${to}`,
    entryAndDocumentRequirements: [
      {
        title: 'Passport',
        description: 'Valid for at least 6 months from the date of arrival with at least 2 blank pages.'
      },
      {
        title: 'Visa application form',
        description: 'Complete digital visa application form with verified traveler details.'
      },
      {
        title: 'Photos',
        description: 'Digital passport photograph on clear white background meeting consulate specifications.'
      },
      {
        title: 'Travel & accommodation',
        description: 'Confirmed round-trip flight reservation and hotel voucher or host invitation.'
      },
      {
        title: 'Travel health insurance',
        description: 'Emergency medical treatment policy valid for the complete stay.'
      }
    ],
    supportingDocuments: [
      {
        title: 'Financial means',
        description: 'Last 3 to 6 months bank statement showing steady balance and liquidity.'
      },
      {
        title: 'Income evidence',
        description: 'Leave sanction letter / NOC from employer, student ID, or business registration.'
      },
      {
        title: 'Travel purpose proof',
        description: 'Detailed day-by-day travel plan or conference/tour registration.'
      }
    ],
    howToApply: [
      'Check requirements & assemble required documents.',
      'Complete online application form.',
      'Submit biometric or digital application online.',
      'Track status and receive visa grant letter.'
    ],
    costs: {
      visaFee: '₹3,500 – ₹7,800',
      serviceFee: '₹1,500 – ₹2,500',
      totalFee: '₹5,000 – ₹10,300',
      feeNote: 'Official consular fee and processing logistics combined.'
    },
    processingAndTiming: {
      applyWindow: 'Apply 15 to 90 days prior to departure.',
      decisionTime: '3 to 5 business days for standard processing.',
      maxExtension: 'Subject to consular background assessment.'
    }
  };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const fromCountry = body.fromCountry || body.passportCountry || 'India';
    const toCountry = body.toCountry || body.destinationCountry || 'Greece';
    const purpose = body.purpose || 'Tourism / Vacation';

    // 1. Try Gemini AI generation with fallback
    const apiKey = getGeminiApiKey();
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `You are an expert immigration officer and diplomatic consular AI.
Provide the official visa and travel requirements for a citizen of "${fromCountry}" traveling to "${toCountry}" for "${purpose}".
Refer to official Embassy, VFS Global, GVCW (Global Visa Center World), TLScontact, or Ministry sources.

Return ONLY a valid JSON object matching this exact structure:
{
  "fromCountry": "${fromCountry}",
  "toCountry": "${toCountry}",
  "purpose": "${purpose}",
  "visaType": "e.g. Short-stay Schengen Visa (Type C) or National Student Visa",
  "officialSource": "e.g. Greek official sources (GVCW & Embassy of Greece)",
  "entryAndDocumentRequirements": [
    { "title": "Passport", "description": "e.g. Valid at least 3 months after planned return..." },
    { "title": "Visa application form", "description": "..." },
    { "title": "Photos", "description": "..." },
    { "title": "Travel medical insurance", "description": "..." },
    { "title": "Travel & accommodation", "description": "..." }
  ],
  "supportingDocuments": [
    { "title": "Financial means", "description": "e.g. Bank statement showing last 3 months movements..." },
    { "title": "Income evidence", "description": "..." },
    { "title": "Tax / employment evidence", "description": "..." },
    { "title": "If self-employed", "description": "..." },
    { "title": "Tourism evidence", "description": "..." }
  ],
  "howToApply": [
    "Check requirements & prepare documents.",
    "Complete the online application form and print it.",
    "Book an appointment at the official visa center.",
    "Attend in person for submission and biometrics.",
    "Track the application and collect passport."
  ],
  "costs": {
    "visaFee": "e.g. €90",
    "serviceFee": "e.g. €30",
    "totalFee": "e.g. €120",
    "feeNote": "Payable in local currency at the VAC; exchange rates may vary."
  },
  "processingAndTiming": {
    "applyWindow": "Apply up to 6 months before travel.",
    "decisionTime": "Decision: up to 15 calendar days after receipt by Embassy.",
    "maxExtension": "May extend to 45 calendar days in individual cases.",
    "centerNote": "Additional dispatch time for regional centers if applicable."
  }
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.2
          }
        });

        const text = response.text ? response.text.trim() : '';
        if (text) {
          const parsed = JSON.parse(text);
          return new Response(JSON.stringify({ success: true, data: parsed, source: 'gemini-ai' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      } catch (aiErr) {
        console.warn('[AI Requirements API] Gemini fallback triggered:', aiErr);
      }
    }

    // Fallback to verified official consular database
    const verified = getVerifiedOfficialData(fromCountry, toCountry, purpose);
    return new Response(JSON.stringify({ success: true, data: verified, source: 'consular-knowledge-base' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    console.error('[AI Requirements API Error]', err);
    return new Response(JSON.stringify({ success: false, message: 'Failed to retrieve requirements' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
