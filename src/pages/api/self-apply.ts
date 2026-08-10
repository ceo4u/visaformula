// src/pages/api/self-apply.ts
// Handles saving self-apply visa application details to Neon DB
import type { APIRoute } from 'astro';
import { runMigrations, getPool } from '../../backend/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    await runMigrations();
    const pool = getPool();
    const body = await request.json();

    const {
      visaType = 'Canada Student Visa',
      destinationCountry = 'Canada',
      travelDate = '',
      firstName = '',
      lastName = '',
      dob = '',
      passportNo = '',
      passportExpiry = '',
      nationality = 'Indian',
      emailAddress = '',
      mobileNumber = '',
      selectedServices = [],
      totalAmount = 2997,
      paymentStatus = 'submitted',
      paymentId = null
    } = body;

    const servicesText = Array.isArray(selectedServices) ? selectedServices.join(', ') : String(selectedServices || '');

    const result = await pool.query(
      `INSERT INTO self_applications (
        visa_type,
        destination_country,
        travel_date,
        first_name,
        last_name,
        dob,
        passport_number,
        passport_expiry,
        nationality,
        email,
        mobile_number,
        selected_services,
        total_amount,
        payment_status,
        payment_id,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, 'in_progress')
      RETURNING id, created_at`,
      [
        visaType,
        destinationCountry,
        travelDate,
        firstName,
        lastName,
        dob,
        passportNo,
        passportExpiry,
        nationality,
        emailAddress,
        mobileNumber,
        servicesText,
        totalAmount,
        paymentStatus,
        paymentId
      ]
    );

    const inserted = result.rows[0];

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Self-apply application saved to database successfully!',
        id: inserted.id,
        createdAt: inserted.created_at
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[API /api/self-apply] DB Error:', err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err?.message || 'Failed to save application to database'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const GET: APIRoute = async ({ url }) => {
  try {
    await runMigrations();
    const pool = getPool();
    const email = url.searchParams.get('email')?.trim();

    let query = `SELECT * FROM self_applications ORDER BY created_at DESC LIMIT 50`;
    let params: any[] = [];

    if (email) {
      query = `SELECT * FROM self_applications WHERE LOWER(email) = LOWER($1) ORDER BY created_at DESC LIMIT 50`;
      params = [email];
    }

    const result = await pool.query(query, params);

    return new Response(
      JSON.stringify({ success: true, applications: result.rows }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err?.message || 'Error fetching applications' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
