// src/pages/api/ocr-analyze-visa.ts
import type { APIRoute } from 'astro';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

export const prerender = false;

// Resolve Gemini API key safely
const getGeminiApiKey = (): string => {
  let key = (
    process.env.GEMINI_API_KEY ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
    process.env.PUBLIC_GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    ''
  )?.trim();
  if (key) return key;

  try {
    const envFiles = ['.env', '.env.local'];
    for (const f of envFiles) {
      const envPath = path.resolve(process.cwd(), f);
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        const match = content.match(/^(?:GEMINI_API_KEY|NEXT_PUBLIC_GEMINI_API_KEY|PUBLIC_GEMINI_API_KEY|GOOGLE_API_KEY)\s*=\s*(.*)$/m);
        if (match) {
          key = match[1].trim().replace(/^["']|["']$/g, '');
          if (key) return key;
        }
      }
    }
  } catch (err) {}

  return '';
};

// Map nationality ISO code to Country Name
const mapNationalityCode = (code: string): string => {
  const c = (code || '').toUpperCase().trim();
  const map: Record<string, string> = {
    AUS: 'Australia',
    IND: 'India',
    USA: 'United States',
    GBR: 'United Kingdom',
    CAN: 'Canada',
    DEU: 'Germany',
    NPL: 'Nepal',
    BGD: 'Bangladesh',
    LKA: 'Sri Lanka',
    PHL: 'Philippines',
    NGA: 'Nigeria',
    PAK: 'Pakistan',
    ARE: 'UAE',
    NZL: 'New Zealand',
    FRA: 'France',
    JPN: 'Japan',
    SGP: 'Singapore',
    IRL: 'Ireland'
  };
  return map[c] || c;
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      base64Image = '',
      mimeType = 'image/jpeg',
      fileName = '',
      currentPassport = 'India',
      currentDestination = 'Canada',
      currentPurpose = 'study'
    } = body;

    const apiKey = getGeminiApiKey();

    if (apiKey && base64Image) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        
        // Strip data URL header if present (handles images, PDFs, etc.)
        const cleanBase64 = base64Image.replace(/^data:[^;]+;base64,/, '').trim();

        const prompt = `You are the Lead Consular Visa Verification & Optical Character Recognition (OCR) Engine for TravlTik.
Analyze this uploaded document image with 100% precision.

CRITICAL SECURITY INSPECTION - MANDATORY 3-STEP AUDIT:

STEP 1: DOCUMENT TYPE CLASSIFICATION & VALIDATION
Determine the EXACT type of document shown in the image:
- "visa": An official consular visa sticker (pasted inside a passport), an electronic visa (eVisa PDF), visa grant notice letter, or official government entry permit (e.g. Indian Tourist Visa, US B1/B2 Visa, Canada Study Permit, Australia Subclass 500, UK Standard Visitor Visa, Schengen Visa).
- "passport": An original national passport booklet bio-data page (with passport holder photo, passport booklet background, and ICAO MRZ lines). NOTE: A passport bio-page is NOT a visa document!
- "national_id": A national identity card (Aadhaar, Citizen ID, PAN card, voter ID, driving license).
- "educational": Degree certificate, diploma, marksheet, transcript.
- "financial": Bank account statement, payslip, tax document.
- "other": Any other document, selfie, or unidentifiable image.

STEP 2: IMAGE RESOLUTION & LEGIBILITY AUDIT
Evaluate visual clarity and quality:
- "imageQuality": "high" | "medium" | "low"
- "isBlurryOrLowQuality": boolean (true if image is blurry, out of focus, low-resolution, glare-obscured, or text is unreadable)
- "qualityFeedback": string explaining clarity, resolution, or illegibility issues if any.

STEP 3: EXTRACT VISA DATA (ONLY IF THE DOCUMENT IS ACTUALLY A VISA):
Extract every single field and return ONLY valid JSON without markdown wrapping:
{
  "detectedDocumentType": "visa" | "passport" | "national_id" | "educational" | "financial" | "other",
  "isVisa": true | false,
  "imageQuality": "high" | "medium" | "low",
  "isBlurryOrLowQuality": true | false,
  "qualityFeedback": "...",
  "issuingCountry": "Exact country issuing the visa (e.g. India, United States, Canada, United Kingdom, Australia, Germany, UAE, etc.)",
  "destination": "Destination Country matching the visa",
  "passportCountry": "Bearer's citizenship/nationality",
  "bearerName": "Full name of bearer as written on visa/MRZ",
  "passportNumber": "Passport number if present",
  "visaNumber": "Visa / Document number (e.g. VJ9CHC0C or similar)",
  "visaType": "Full visa type/subclass (e.g. Indian Tourist Visa, Canada Study Permit, Australia Subclass 500, US B1/B2)",
  "grantDate": "YYYY-MM-DD format (convert from DD/MM/YYYY or text)",
  "expiryDate": "YYYY-MM-DD format (convert from DD/MM/YYYY or text)",
  "entries": "Single, Double, or Multiple",
  "issuingAuthority": "Full name of the government department (e.g. Republic of India / Ministry of Home Affairs, IRCC Canada, UKVI, US Dept of State)",
  "workRights": "Permitted work entitlement or prohibition",
  "healthCover": "Applicable healthcare insurance requirement",
  "conditions": [
    "Array of 3 to 5 exact statutory conditions, endorsements, or restrictions printed on the visa"
  ]
}`;

        let response: any = null;
        try {
          response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
              {
                role: 'user',
                parts: [
                  { text: prompt },
                  {
                    inlineData: {
                      mimeType: mimeType && mimeType.includes('pdf') ? 'application/pdf' : (mimeType || 'image/jpeg'),
                      data: cleanBase64
                    }
                  }
                ]
              }
            ]
          });
        } catch (f35Err) {
          response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-lite',
            contents: [
              {
                role: 'user',
                parts: [
                  { text: prompt },
                  {
                    inlineData: {
                      mimeType: mimeType && mimeType.includes('pdf') ? 'application/pdf' : (mimeType || 'image/jpeg'),
                      data: cleanBase64
                    }
                  }
                ]
              }
            ]
          });
        }

        const textResponse = response.text || '';
        const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);

          // Quality check rejection
          if (parsed.isBlurryOrLowQuality || parsed.imageQuality === 'low') {
            return new Response(
              JSON.stringify({
                success: false,
                error: 'low_quality',
                message: parsed.qualityFeedback || 'Low quality image detected! The image is blurry, low resolution, or unreadable. Please upload your Visa Document at the highest quality (clear 300 DPI scan or sharp photo with readable text).'
              }),
              { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
          }

          // Document mismatch rejection
          const isActuallyVisa = parsed.isVisa === true && parsed.detectedDocumentType === 'visa';
          if (!isActuallyVisa) {
            const detectedLabel = parsed.detectedDocumentType === 'passport' ? 'Passport booklet bio-data page'
              : parsed.detectedDocumentType === 'national_id' ? 'National ID Card (Aadhaar / Citizen ID)'
              : parsed.detectedDocumentType === 'educational' ? 'Educational Document'
              : parsed.detectedDocumentType === 'financial' ? 'Income / Financial Proof'
              : 'different document type';

            return new Response(
              JSON.stringify({
                success: false,
                error: 'mismatched_document',
                detectedType: parsed.detectedDocumentType || 'other',
                expectedType: 'visa',
                message: `Document Mismatch: You uploaded a ${detectedLabel} instead of a Visa Document. Please upload your official Visa sticker, eVisa PDF, or grant letter.`
              }),
              { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
          }

          return new Response(
            JSON.stringify({
              success: true,
              source: 'gemini_vision_ocr',
              data: {
                ...parsed,
                passportCountry: mapNationalityCode(parsed.passportCountry || currentPassport),
                destination: parsed.destination || parsed.issuingCountry || currentDestination
              }
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
          );
        }
      } catch (geminiErr) {
        console.error('[API /api/ocr-analyze-visa] Gemini Vision error:', geminiErr);
      }
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: 'unrecognized_visa',
        message: 'Could not detect an official Visa Document from this image. Please upload a clear, high-quality scan or photo of your Visa sticker, electronic visa (eVisa PDF), or entry permit.'
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err: any) {
    console.error('[API /api/ocr-analyze-visa] Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to analyze visa image. Please provide a clear, high-resolution document.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
