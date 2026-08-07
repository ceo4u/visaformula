import type { APIRoute } from 'astro';

// Algorithmic evaluation fallback for ultra-fast response & 100% offline guarantee
function evaluateReadinessAlgorithmic(data: {
  country: string;
  visaType: string;
  financialFundsUsd: number;
  ieltsScore: number;
  passportValidMonths: number;
  previousRefusals: boolean;
}) {
  const gaps: string[] = [];
  let score = 100;
  let financialScore = 100;

  const funds = Number(data.financialFundsUsd) || 0;
  const ielts = Number(data.ieltsScore) || 0;
  const passportMonths = Number(data.passportValidMonths) || 0;

  // 1. Financial Evaluation Thresholds
  const reqFunds: Record<string, number> = {
    'USA': 35000,
    'Canada': 25000,
    'United Kingdom': 22000,
    'Australia': 28000,
    'Germany': 12000,
    'New Zealand': 20000,
    'UAE / Dubai': 10000,
    'Schengen': 15000
  };
  const minRequired = reqFunds[data.country] || 20000;

  if (funds < minRequired) {
    const deficit = minRequired - funds;
    score -= 30;
    financialScore -= 45;
    gaps.push(`Financial Shortfall: Minimum $${minRequired.toLocaleString()} USD required for ${data.country} ${data.visaType}. You have a $${deficit.toLocaleString()} USD gap.`);
  } else if (funds < minRequired * 1.3) {
    score -= 10;
    financialScore -= 15;
    gaps.push(`Tight Liquidity: Having at least $${(minRequired * 1.3).toLocaleString()} USD in liquid reserves strengthens your approval chances.`);
  }

  // 2. Language Proficiency Thresholds
  if (data.visaType.toLowerCase().includes('student') || data.visaType.toLowerCase().includes('study')) {
    if (ielts < 6.0) {
      score -= 25;
      gaps.push(`Language Proficiency Gap: Minimum overall IELTS 6.0 (or equivalent) required for study permits. Current band ${ielts} requires enhancement.`);
    } else if (ielts < 6.5) {
      score -= 10;
      gaps.push(`Moderate IELTS Score: Band ${ielts} is acceptable, but 6.5+ significantly improves university acceptance rate.`);
    }
  }

  // 3. Passport Expiry Thresholds
  if (passportMonths < 6) {
    score -= 35;
    gaps.push(`Passport Expiry Risk: Passport has only ${passportMonths} months validity remaining. Embassies require at least 6 months validity from travel date.`);
  } else if (passportMonths < 12) {
    score -= 10;
    gaps.push(`Passport Validity Warning: Renewing passport before filing avoids potential visa duration truncation.`);
  }

  // 4. Refusal History
  if (data.previousRefusals) {
    score -= 25;
    gaps.push(`Prior Visa Refusal Record: Previous refusal history triggers elevated embassy scrutiny. A detailed appeal letter / expert statement of purpose is strongly recommended.`);
  }

  score = Math.max(15, Math.min(98, score));
  financialScore = Math.max(10, Math.min(100, financialScore));

  let status = 'READY';
  if (score < 60) status = 'HIGH_RISK';
  else if (score < 80) status = 'MODERATE_RISK';

  let recommendationSummary = "Your profile meets standard embassy benchmarks. Proceed to file your official application.";
  if (status === 'HIGH_RISK') {
    recommendationSummary = `High application risk detected due to critical profile gaps. Connecting with a licensed ${data.country} migration lawyer or expert before filing is critical to prevent visa rejection.`;
  } else if (status === 'MODERATE_RISK') {
    recommendationSummary = `Moderate risk identified. Addressing highlighted financial/document gaps with a verified consultant will boost your approval probability above 90%.`;
  }

  return {
    readinessScore: score,
    status,
    financialScore,
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
    } = body;

    if (!country || !visaType) {
      return new Response(
        JSON.stringify({ error: 'Missing required inputs: Country and Visa Type are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = import.meta.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
    let evaluationResult: any = null;

    // Call Gemini REST API directly if API key is provided
    if (apiKey) {
      try {
        const promptText = `
          Act as an official visa officer evaluating a visa applicant's readiness score.
          
          Applicant Profile:
          - Destination: ${country}
          - Visa Type: ${visaType}
          - Available Liquid Funds (USD): $${financialFundsUsd}
          - IELTS Score: ${ieltsScore}
          - Passport Remaining Expiry: ${passportValidMonths} months
          - Previous Refusals: ${previousRefusals ? 'Yes' : 'No'}

          Evaluate strictly against ${country} embassy criteria.
          Return ONLY valid JSON matching this exact structure:
          {
            "readinessScore": 75,
            "status": "MODERATE_RISK",
            "financialScore": 80,
            "criticalGaps": ["Gap 1", "Gap 2"],
            "recommendationSummary": "Summary statement..."
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

        const geminiData = await geminiRes.json();
        const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          evaluationResult = JSON.parse(rawText);
        }
      } catch (geminiError) {
        console.warn("[Readiness API] Gemini REST API call fallback to algorithmic evaluator:", geminiError);
      }
    }

    // Fallback to high-speed algorithmic evaluator if API key not available or errored
    if (!evaluationResult) {
      evaluationResult = evaluateReadinessAlgorithmic({
        country,
        visaType,
        financialFundsUsd: Number(financialFundsUsd) || 0,
        ieltsScore: Number(ieltsScore) || 0,
        passportValidMonths: Number(passportValidMonths) || 0,
        previousRefusals: Boolean(previousRefusals)
      });
    }

    const assessmentRecord = {
      id: "eval_" + Date.now(),
      target_country: country,
      visa_category: visaType,
      readiness_score: evaluationResult.readinessScore,
      risk_status: evaluationResult.status,
      financial_score: evaluationResult.financialScore || 80,
      critical_gaps: evaluationResult.criticalGaps || [],
      recommendation_summary: evaluationResult.recommendationSummary,
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
