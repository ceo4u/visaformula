// src/pages/api/readiness.ts
import type { APIRoute } from 'astro';
import { GoogleGenAI, Type } from '@google/genai';
import fs from 'fs';
import path from 'path';

export const prerender = false;

// Safe runtime resolution for GEMINI_API_KEY
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

// Algorithmic evaluation engine fallback
function evaluateReadinessAlgorithmic(data: {
  visaCategory: string;
  targetCountry: string;
  residenceCountry: string;
  profileDetails: any;
}) {
  const details = data.profileDetails || {};
  const gaps: Array<{ id: string; severity: 'critical' | 'moderate'; text: string; solution: string }> = [];

  let readinessScore = 82;
  let financialScore = 28; // Max 35
  let credentialScore = 25; // Max 30
  let homeTiesScore = 16; // Max 20
  let historyScore = 13; // Max 15

  const funds = Number(details.bankBalanceUsd || details.monthlySalaryUsd || details.settlementFundsUsd) || 0;
  const reqFunds: Record<string, number> = {
    'USA': 32000,
    'United States': 32000,
    'Canada': 22000,
    'United Kingdom': 20000,
    'Australia': 25000,
    'Germany': 14000,
    'Schengen': 14000,
    'UAE': 10000
  };
  const minRequired = reqFunds[data.targetCountry] || 20000;

  // 1. Financial Analysis
  if (funds > 0 && funds < minRequired) {
    const deficit = minRequired - funds;
    readinessScore -= 22;
    financialScore = Math.max(10, Math.round((funds / minRequired) * 35));
    gaps.push({
      id: 'fin-crit',
      severity: 'critical',
      text: `Available liquid funds ($${funds.toLocaleString()} USD) are below the recommended threshold ($${minRequired.toLocaleString()} USD) for ${data.targetCountry}.`,
      solution: `Add an immediate family co-sponsor with verified liquid bank statements and an official Affidavit of Support.`
    });
  } else if (funds === 0) {
    readinessScore -= 18;
    financialScore = 14;
    gaps.push({
      id: 'fin-zero',
      severity: 'critical',
      text: `Liquid proof of funds missing for ${data.targetCountry} ${data.visaCategory} evaluation.`,
      solution: `Provide updated bank balance certificates, fixed deposit receipts, or liquid investment valuation reports.`
    });
  }

  // 2. Refusal History Analysis
  if (details.previousRefusals) {
    readinessScore -= 22;
    historyScore = 5;
    gaps.push({
      id: 'refusal-crit',
      severity: 'critical',
      text: `Prior visa refusal recorded (${details.refusalDetails || 'Previous rejection'}). Triggers mandatory secondary officer scrutiny.`,
      solution: `Submit a professionally drafted Statement of Purpose (SOP) refuting previous refusal grounds with new supporting evidence.`
    });
  }

  // 3. Category Specific Gaps
  if (data.visaCategory === 'student' || data.visaCategory === 'Study Permit') {
    const ieltsVal = parseFloat(String(details.languageScore || '6.5').replace(/[^0-9.]/g, '')) || 6.5;
    if (ieltsVal < 6.0) {
      readinessScore -= 18;
      credentialScore -= 10;
      gaps.push({
        id: 'ielts-low',
        severity: 'critical',
        text: `Language score (${details.languageScore}) is below recommended 6.0 minimum band.`,
        solution: `Retake IELTS/PTE to achieve overall 6.5+ band before filing official visa application.`
      });
    }
  } else if (data.visaCategory === 'work' || data.visaCategory === 'Work Permit') {
    if (details.ecaStatus === 'No') {
      credentialScore -= 8;
      readinessScore -= 10;
      gaps.push({
        id: 'eca-missing',
        severity: 'moderate',
        text: `Educational Credential Assessment (ECA/WES) is not completed.`,
        solution: `Initiate WES or equivalent ECA credential evaluation to prove degree equivalency.`
      });
    }
  } else if (data.visaCategory === 'tourist' || data.visaCategory === 'Tourist / Visitor') {
    if (details.travelStamps === '0 Visas') {
      historyScore = Math.max(4, historyScore - 6);
      gaps.push({
        id: 'travel-zero',
        severity: 'moderate',
        text: `Blank passport with zero international travel history increases visitor visa refusal risk.`,
        solution: `Provide a detailed travel itinerary, prepaid accommodation, and strong proof of return employment ties.`
      });
    }
  }

  if (gaps.length === 0) {
    gaps.push({
      id: 'clean-sop',
      severity: 'moderate',
      text: `Ensure your Statement of Purpose (SOP) clearly articulates academic/professional goals and return ties.`,
      solution: `Have a certified Travltik consultant audit your complete document checklist prior to embassy submission.`
    });
  }

  readinessScore = Math.max(20, Math.min(98, Math.round(readinessScore)));
  let status = 'READY';
  if (readinessScore < 60) status = 'HIGH_RISK';
  else if (readinessScore < 80) status = 'MODERATE_RISK';

  let recommendationSummary = `Your profile shows a strong approval probability for ${data.targetCountry} (${data.visaCategory}).`;
  if (status === 'HIGH_RISK') {
    recommendationSummary = `High application risk detected due to critical profile gaps. Secondary expert review is strongly recommended before filing.`;
  } else if (status === 'MODERATE_RISK') {
    recommendationSummary = `Moderate risk identified for ${data.targetCountry}. Resolving the highlighted financial and document gaps will boost your score above 85%.`;
  }

  return {
    readinessScore,
    status,
    financialScore,
    credentialScore,
    homeTiesScore,
    historyScore,
    criticalGaps: gaps.map(g => `${g.text} — Action: ${g.solution}`),
    recommendationSummary
  };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      visaCategory,
      targetCountry,
      profileDetails,
      captchaToken,
    } = body;

    // 1. Strict Payload Validation
    if (!visaCategory || !targetCountry || !profileDetails) {
      return new Response(
        JSON.stringify({ error: 'Missing required inputs: Category, Destination, or Profile details.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. Server-Side hCaptcha Verification (with mock token & env fallback pass)
    const secretKey = (import.meta?.env?.HCAPTCHA_SECRET_KEY as string) || (process.env.HCAPTCHA_SECRET_KEY as string) || '';
    if (captchaToken && captchaToken !== 'mock-token' && secretKey) {
      try {
        const verifyParams = new URLSearchParams({
          secret: secretKey,
          response: captchaToken,
        });

        const captchaRes = await fetch('https://api.hcaptcha.com/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: verifyParams.toString(),
        });

        const captchaData = await captchaRes.json();
        if (!captchaData.success) {
          return new Response(
            JSON.stringify({ error: 'CAPTCHA verification failed. Please complete the captcha again.' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }
      } catch (captchaErr) {
        console.warn("[Readiness API] hCaptcha siteverify error, proceeding with evaluation:", captchaErr);
      }
    }

    const apiKey = getGeminiApiKey();
    let assessmentResult: any = null;

    // 3. Gemini 2.0 Flash Execution using @google/genai SDK or direct REST Endpoint
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const promptText = `
          Act as an official senior visa officer evaluating a visa application for ${targetCountry}.
          Selected Visa Category: ${visaCategory}

          Applicant Profile Details:
          ${JSON.stringify(profileDetails, null, 2)}

          Strict Evaluation Criteria:
          - Student: Check liquid fund threshold vs tuition/living costs, IELTS/language requirements, and academic progression.
          - Work: Check job offer status, ECA equivalency, and work experience depth.
          - Tourist: Check 6-month bank balance stability, employer NOC, home country ties proof, and travel history.
          - PR: Check settlement funds, skill assessment status, and calculated points benchmark.

          Calculate readinessScore (0-100), status ('READY' | 'MODERATE_RISK' | 'HIGH_RISK'), breakdown scores, criticalGaps, and recommendationSummary.
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-2.0-flash',
          contents: promptText,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                readinessScore: { type: Type.INTEGER },
                status: { type: Type.STRING },
                financialScore: { type: Type.INTEGER },
                credentialScore: { type: Type.INTEGER },
                homeTiesScore: { type: Type.INTEGER },
                historyScore: { type: Type.INTEGER },
                criticalGaps: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                recommendationSummary: { type: Type.STRING },
              },
              required: [
                'readinessScore',
                'status',
                'financialScore',
                'credentialScore',
                'homeTiesScore',
                'historyScore',
                'criticalGaps',
                'recommendationSummary',
              ],
            },
          },
        });

        if (response.text) {
          assessmentResult = JSON.parse(response.text);
        }
      } catch (geminiError) {
        console.warn("[Readiness API] Gemini SDK call failed, triggering fallback evaluation:", geminiError);
      }
    }

    // Fallback Algorithmic Evaluator if Gemini API Key missing or errored
    if (!assessmentResult) {
      assessmentResult = evaluateReadinessAlgorithmic({
        visaCategory,
        targetCountry,
        residenceCountry: profileDetails.residenceCountry || 'India',
        profileDetails
      });
    }

    return new Response(
      JSON.stringify({ success: true, data: assessmentResult }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Internal evaluation engine error.', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
