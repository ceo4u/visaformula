// src/pages/api/ocr-analyze-document.ts
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

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      base64Image = '',
      mimeType = 'application/pdf',
      documentTitle = 'Visa Document',
      documentKey = 'document',
      countryName = 'Destination',
      passportCountry = 'India'
    } = body;

    const apiKey = getGeminiApiKey();

    if (apiKey && base64Image) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const cleanBase64 = base64Image.replace(/^data:[^;]+;base64,/, '').trim();

        const prompt = `You are the Lead Consular Document Verification & Audit Officer for TravlTik (travltik.com).
The user is traveling/applying for travel clearance to ${countryName} with a ${passportCountry} passport.
The uploaded document is intended as: "${documentTitle}" (Requirement Key: ${documentKey}).

CRITICAL SECURITY INSPECTION - MANDATORY 3-STEP AUDIT:

STEP 1: DOCUMENT TYPE CLASSIFICATION & VALIDATION
Determine the EXACT type of document shown in the image:
- "passport": An official national passport booklet bio-data page with bearer photo, passport booklet background, and ICAO MRZ lines.
- "visa": A consular visa sticker, electronic visa (eVisa PDF/grant letter), or consular entry permit.
- "national_id": A government national identity card (Aadhaar, Citizen ID, PAN card, voter ID, driving license, state ID).
- "educational": Degree certificate, diploma, marksheet, academic transcript, graduation certificate.
- "financial": Bank account statement, salary payslip, ITR, Form 16, tax document.
- "flight": Confirmed flight ticket, booking itinerary, PNR ticket.
- "insurance": Travel medical insurance policy schedule.
- "other": Any other document, selfie, random paper, or unidentifiable image.

STEP 2: IMAGE RESOLUTION & LEGIBILITY AUDIT
Evaluate visual clarity and quality:
- "imageQuality": "high" | "medium" | "low"
- "isBlurryOrLowQuality": boolean (true if image is blurry, out of focus, low-resolution, glare-obscured, text is illegible, or difficult to read)
- "qualityFeedback": string explaining clarity, resolution, or illegibility issues if any.

STEP 3: MATCH VERIFICATION AGAINST EXPECTED REQUIREMENT:
- If documentKey is "statutory_passport" or title has "passport": expected type is "passport".
- If documentKey is "statutory_visa" or title has "visa": expected type is "visa".
- If documentKey is "statutory_national_id" or title has "national id" or "aadhaar" or "pan": expected type is "national_id".
- If documentKey is "statutory_education" or title has "education" or "degree": expected type is "educational".
- If documentKey is "statutory_income" or documentKey is "statutory_financial" or title has "bank" or "income" or "salary": expected type is "financial".

Is the uploaded document a valid match for "${documentTitle}"?
"isDocumentMatch": true | false
"mismatchMessage": "Clear explanation if the document does not match (e.g. 'Uploaded a Visa Document instead of National ID Card.')"

STEP 4: EXTRACT MANDATORY DETAILS:
   - Document Number
   - Holder Full Name (as printed on document)
   - Date of Birth (format as YYYY-MM-DD if present)
   - Nationality / Country
   - Sex (M / F / Other)
   - Place of Birth / Address if present
   - Date of Issue (format as YYYY-MM-DD)
   - Date of Expiry & Validity:
     * For Aadhaar / National ID / PAN Card: Set dateOfExpiry strictly as "Permanent".
     * For Bank Statements: Set dateOfExpiry as "Recent (6 Months)".
     * For Educational Degrees: Set dateOfExpiry as "Permanent".
     * For Travel Insurance: Extract policy end date strictly as YYYY-MM-DD.
     * For Flight Ticket: Extract departure date as YYYY-MM-DD.
   - Issuing Authority or Institution (e.g. UIDAI, Income Tax Department, Bank Name, University Name)

Return ONLY valid JSON (no markdown fences, no extra text):
{
  "detectedDocumentType": "passport" | "visa" | "national_id" | "educational" | "financial" | "flight" | "insurance" | "other",
  "isDocumentMatch": true | false,
  "imageQuality": "high" | "medium" | "low",
  "isBlurryOrLowQuality": true | false,
  "qualityFeedback": "...",
  "mismatchMessage": "...",
  "verified": true | false,
  "score": 95,
  "documentType": "${documentTitle}",
  "summary": "Verified official ${documentTitle} conforming to consular guidelines.",
  "extractedDetails": {
    "issuer": "Issuing authority or institution name",
    "holderName": "Full name extracted from document",
    "documentNumber": "Extracted document number / ID",
    "dateOfBirth": "YYYY-MM-DD",
    "nationality": "${passportCountry}",
    "sex": "M",
    "placeOfBirth": "Place of birth or state",
    "dateOfIssue": "YYYY-MM-DD",
    "dateOfExpiry": "YYYY-MM-DD or Permanent or Recent (6 Months)",
    "validity": "Valid",
    "amount": "Coverage / Balance if applicable"
  },
  "complianceStatus": "Verified & Consular Compliant",
  "warnings": []
}`;

        const cleanMime = (mimeType && mimeType.includes('pdf')) ? 'application/pdf' : (mimeType || 'image/jpeg');

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
                      mimeType: cleanMime,
                      data: cleanBase64
                    }
                  }
                ]
              }
            ]
          });
        } catch (mErr) {
          response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-lite',
            contents: [
              {
                role: 'user',
                parts: [
                  { text: prompt },
                  {
                    inlineData: {
                      mimeType: cleanMime,
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
                message: parsed.qualityFeedback || `Low quality image detected! The image for ${documentTitle} is blurry, low resolution, or unreadable. Please upload at the highest quality (clear 300 DPI scan or sharp photo with readable text).`
              }),
              { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
          }

          // Document mismatch rejection
          if (parsed.isDocumentMatch === false) {
            const detectedLabel = parsed.detectedDocumentType === 'passport' ? 'Passport bio-data page'
              : parsed.detectedDocumentType === 'visa' ? 'Visa Document'
              : parsed.detectedDocumentType === 'national_id' ? 'National ID Card'
              : parsed.detectedDocumentType === 'educational' ? 'Educational Document'
              : parsed.detectedDocumentType === 'financial' ? 'Income / Financial Proof'
              : 'different document type';

            return new Response(
              JSON.stringify({
                success: false,
                error: 'mismatched_document',
                detectedType: parsed.detectedDocumentType,
                expectedType: documentKey,
                message: parsed.mismatchMessage || `Document Mismatch: You uploaded a ${detectedLabel} instead of ${documentTitle}. Please upload the requested ${documentTitle}.`
              }),
              { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
          }

          return new Response(
            JSON.stringify({
              success: true,
              source: 'gemini_document_ocr',
              data: parsed
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
          );
        }
      } catch (geminiError: any) {
        console.warn('[DocOCR] Gemini failed:', geminiError?.message);
      }
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: 'unrecognized_document',
        message: `Could not verify official ${documentTitle} from this image. Please upload a clear, high-quality scan or PDF.`
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('[DocOCR Error]', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error?.message || 'Failed to analyze document'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
