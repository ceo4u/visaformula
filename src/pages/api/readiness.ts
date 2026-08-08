import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

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

// Algorithmic evaluation fallback for high speed response & offline guarantee
function evaluateReadinessAlgorithmic(data: {
  country: string;
  visaType: string;
  financialFundsUsd: number;
  ieltsScore: number;
  passportValidMonths: number;
  previousRefusals: boolean;
  workExperience?: string;
}) {
  const gaps: Array<{ id: string; severity: 'critical' | 'moderate'; text: string; solution: string }> = [];
  let score = 86;
  let financialScore = 85;
  let authScore = 90;
  let tiesScore = 75;
  let eligScore = 80;

  const funds = Number(data.financialFundsUsd) || 0;
  const ielts = Number(data.ieltsScore) || 6.5;

  // 1. Financial Evaluation Thresholds
  const reqFunds: Record<string, number> = {
    'USA': 32000,
    'United States': 32000,
    'Canada': 22000,
    'United Kingdom': 20000,
    'Australia': 25000,
    'Germany': 14000,
    'New Zealand': 18000,
    'Schengen': 14000
  };
  const minRequired = reqFunds[data.country] || 20000;

  if (funds < minRequired) {
    const deficit = minRequired - funds;
    score -= 25;
    financialScore = Math.max(30, Math.round((funds / minRequired) * 100));
    gaps.push({
      id: 'fin-gap',
      severity: 'critical',
      text: `Financial Shortfall: Minimum $${minRequired.toLocaleString()} USD required for ${data.country} ${data.visaType}. You have a $${deficit.toLocaleString()} USD deficit.`,
      solution: `Add a liquid co-sponsor (parent or immediate family member) with verified bank balance and official affidavit of support.`
    });
  } else if (funds < minRequired * 1.25) {
    score -= 8;
    financialScore = 78;
    gaps.push({
      id: 'fin-mod',
      severity: 'moderate',
      text: `Tight liquid reserves detected for ${data.country}.`,
      solution: `Attach fixed deposit certificates, mutual fund portfolio statements, or liquid property valuation reports.`
    });
  }

  // 2. Language Proficiency Thresholds
  if (data.visaType.toLowerCase().includes('student') || data.visaType.toLowerCase().includes('study')) {
    if (ielts < 6.0) {
      score -= 22;
      eligScore -= 25;
      gaps.push({
        id: 'lang-crit',
        severity: 'critical',
        text: `Language score (${ielts}) is below embassy threshold (6.0 overall required for student visa).`,
        solution: `Retake IELTS/PTE to achieve overall 6.5+ band before submitting official application.`
      });
    } else if (ielts < 6.5) {
      score -= 6;
      eligScore -= 10;
      gaps.push({
        id: 'lang-mod',
        severity: 'moderate',
        text: `Language score (${ielts}) meets minimum cutoff, but 7.0+ overall improves university acceptance rate.`,
        solution: `Attach a Medium of Instruction (MOI) letter from your prior educational institution.`
      });
    }
  }

  // 3. Work Experience
  if (data.workExperience === 'Fresher / None' && (data.visaType.toLowerCase().includes('work') || data.visaType.toLowerCase().includes('pr'))) {
    score -= 20;
    eligScore -= 30;
    gaps.push({
      id: 'exp-crit',
      severity: 'critical',
      text: `Work permit / PR applications require verified skilled work experience.`,
      solution: `Provide official employer reference letters, salary bank credits, and tax filings.`
    });
  }

  // 4. Refusal History
  if (data.previousRefusals) {
    score -= 24;
    tiesScore -= 25;
    gaps.push({
      id: 'refusal-crit',
      severity: 'critical',
      text: `Prior visa refusal recorded. Triggers mandatory secondary officer review under embassy refusal section.`,
      solution: `Submit a professionally drafted Statement of Purpose (SOP) directly refuting previous refusal grounds with new supporting evidence.`
    });
  }

  if (gaps.length === 0) {
    gaps.push({
      id: 'clean-sop',
      severity: 'moderate',
      text: `Ensure Statement of Purpose (SOP) clearly outlines academic progression and ties to home country.`,
      solution: `Have a certified visa consultant review your SOP structure prior to submission.`
    });
  }

  score = Math.max(20, Math.min(98, Math.round(score)));
  financialScore = Math.max(20, Math.min(98, financialScore));

  let status = 'LOW_RISK';
  if (score < 65) status = 'HIGH_RISK';
  else if (score < 82) status = 'MODERATE_RISK';

  let recommendationSummary = `Your profile shows high approval probability for ${data.country}. Ensure all documents match official guidelines.`;
  if (status === 'HIGH_RISK') {
    recommendationSummary = `High application risk detected due to critical profile gaps. Connecting with a licensed ${data.country} migration lawyer before filing is critical to prevent visa rejection.`;
  } else if (status === 'MODERATE_RISK') {
    recommendationSummary = `Moderate risk identified for ${data.country}. Addressing highlighted financial/document gaps with a verified consultant will boost your approval probability above 90%.`;
  }

  return {
    readinessScore: score,
    status,
    financialScore,
    authenticityScore: authScore,
    homeTiesScore: tiesScore,
    eligibilityScore: eligScore,
    criticalGaps: gaps,
    recommendationSummary
  };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      country,
      visaType,
      financialFundsUsd,
      ieltsScore,
      passportValidMonths,
      previousRefusals,
      workExperience
    } = body;

    if (!country || !visaType) {
      return new Response(
        JSON.stringify({ error: 'Missing required inputs: Target Country and Visa Type are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = getGeminiApiKey();
    let evaluationResult: any = null;

    // Call Gemini 2.0 Flash REST API directly if API key is configured
    if (apiKey) {
      try {
        const promptText = `
          Act as a senior embassy visa officer evaluating an applicant's visa readiness score for ${country} (${visaType}).
          
          Applicant Profile:
          - Target Country: ${country}
          - Visa Type: ${visaType}
          - Available Liquid Funds (USD): $${financialFundsUsd || 0}
          - Language Score / IELTS: ${ieltsScore || 'Not provided'}
          - Work Experience: ${workExperience || 'Not provided'}
          - Prior Refusal History: ${previousRefusals ? 'Yes' : 'No'}

          Evaluate strictly against official ${country} embassy criteria.
          Return ONLY valid JSON matching this exact structure:
          {
            "readinessScore": 78,
            "status": "MODERATE_RISK",
            "financialScore": 80,
            "authenticityScore": 85,
            "homeTiesScore": 65,
            "eligibilityScore": 75,
            "criticalGaps": [
              {
                "id": "gap1",
                "severity": "critical",
                "text": "Specific gap description for applicant...",
                "solution": "Specific actionable solution for applicant..."
              }
            ],
            "recommendationSummary": "Official officer evaluation summary..."
          }
        `;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: promptText }] }],
              generationConfig: { responseMimeType: 'application/json' }
            })
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            evaluationResult = JSON.parse(rawText);
          }
        }
      } catch (geminiError) {
        console.warn("[Readiness API] Gemini AI evaluation error, falling back to algorithmic engine:", geminiError);
      }
    }

    // Algorithmic Fallback Engine
    if (!evaluationResult) {
      evaluationResult = evaluateReadinessAlgorithmic({
        country,
        visaType,
        financialFundsUsd: Number(financialFundsUsd) || 0,
        ieltsScore: parseFloat(String(ieltsScore).replace(/[^0-9.]/g, '')) || 6.5,
        passportValidMonths: Number(passportValidMonths) || 36,
        previousRefusals: Boolean(previousRefusals),
        workExperience
      });
    }

    const assessmentRecord = {
      id: "eval_" + Date.now(),
      target_country: country,
      visa_category: visaType,
      readiness_score: evaluationResult.readinessScore || 75,
      risk_status: evaluationResult.status || "MODERATE_RISK",
      financial_score: evaluationResult.financialScore || 80,
      authenticity_score: evaluationResult.authenticityScore || 85,
      home_ties_score: evaluationResult.homeTiesScore || 65,
      eligibility_score: evaluationResult.eligibilityScore || 75,
      critical_gaps: evaluationResult.criticalGaps || [],
      recommendation_summary: evaluationResult.recommendationSummary || `Your profile evaluation for ${country} is complete.`,
      created_at: new Date().toISOString()
    };

    return new Response(
      JSON.stringify({
        success: true,
        data: assessmentRecord
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Evaluation failed', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
