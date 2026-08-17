// src/pages/api/evaluations.ts
// Handles Quick Evaluation submissions and stores in dedicated visa_evaluations table
import type { APIRoute } from 'astro';
import { runMigrations, getPool } from '../../backend/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    await runMigrations();
    const pool = getPool();
    const body = await request.json();

    const {
      fullName = '',
      email = '',
      phone = '',
      destinationCountry = '',
      visaType = '',
      ageRange = '26-32',
      educationLevel = "Bachelor's Degree",
      workExperience = '3-5 years',
      englishTest = 'IELTS',
      englishScore = '7.0 - 7.5',
      budget = '₹5L - ₹15L'
    } = body;

    if (!fullName || !phone || !destinationCountry || !visaType) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Full name, phone, destination country, and visa purpose are required.' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Insert into visa_evaluations table (Dedicated table - never pollutes bookings)
    const insertRes = await pool.query(
      `INSERT INTO visa_evaluations (
        full_name,
        email,
        phone,
        destination_country,
        visa_type,
        age_range,
        education_level,
        work_experience,
        english_test,
        english_score,
        budget,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'new')
      RETURNING id, created_at`,
      [
        fullName,
        email || null,
        phone,
        destinationCountry,
        visaType,
        ageRange,
        educationLevel,
        workExperience,
        englishTest,
        englishScore,
        budget
      ]
    );

    const evalId = insertRes.rows[0].id;

    // Calculate dynamic visa readiness probability score (0-100%)
    let readinessScore = 70;
    if (educationLevel.includes("Master") || educationLevel.includes("Doctorate")) readinessScore += 10;
    if (workExperience.includes("3-5") || workExperience.includes("5+")) readinessScore += 10;
    if (englishScore.includes("7") || englishScore.includes("8")) readinessScore += 10;
    if (ageRange === "26-32" || ageRange === "18-25") readinessScore += 5;
    if (readinessScore > 98) readinessScore = 98;

    return new Response(
      JSON.stringify({
        success: true,
        evaluationId: evalId,
        readinessScore,
        eligibilityStatus: readinessScore >= 80 ? "High Eligibility" : "Moderate Eligibility",
        message: "Evaluation completed successfully! You have a high probability of visa approval."
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[API /api/evaluations POST] Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to process evaluation request.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
