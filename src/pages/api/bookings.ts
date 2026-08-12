// src/pages/api/bookings.ts
// Handles booking consultation requests and enquiries between Seekers and Experts
import type { APIRoute } from 'astro';
import { runMigrations, getPool } from '../../backend/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    await runMigrations();
    const pool = getPool();
    const body = await request.json();

    const {
      seekerName = '',
      seekerEmail = '',
      seekerPhone = '',
      expertName = '',
      expertEmail = '',
      visaCategory = 'General Inquiry',
      details = '',
      bookingDate = null
    } = body;

    if (!seekerEmail || !expertEmail) {
      return new Response(
        JSON.stringify({ success: false, error: 'Both seekerEmail and expertEmail are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = await pool.query(
      `INSERT INTO bookings (
        seeker_name,
        seeker_email,
        seeker_phone,
        expert_name,
        expert_email,
        visa_category,
        details,
        booking_date,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, COALESCE($8::timestamp, CURRENT_TIMESTAMP), 'pending')
      RETURNING id, created_at`,
      [
        seekerName,
        seekerEmail,
        seekerPhone,
        expertName,
        expertEmail,
        visaCategory,
        details,
        bookingDate
      ]
    );

    const inserted = result.rows[0];

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Booking enquiry submitted successfully!',
        id: inserted.id,
        createdAt: inserted.created_at
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[API /api/bookings] Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: err?.message || 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const GET: APIRoute = async ({ url }) => {
  try {
    await runMigrations();
    const pool = getPool();
    const expertEmail = url.searchParams.get('expertEmail')?.trim();
    const seekerEmail = url.searchParams.get('seekerEmail')?.trim();

    let query = `SELECT * FROM bookings ORDER BY created_at DESC LIMIT 50`;
    let params: any[] = [];

    if (expertEmail) {
      query = `SELECT * FROM bookings WHERE LOWER(COALESCE(expert_email, '')) = LOWER($1) ORDER BY created_at DESC LIMIT 50`;
      params = [expertEmail];
    } else if (seekerEmail) {
      query = `SELECT * FROM bookings WHERE LOWER(COALESCE(seeker_email, '')) = LOWER($1) ORDER BY created_at DESC LIMIT 50`;
      params = [seekerEmail];
    }

    const result = await pool.query(query, params);

    const bookings = result.rows.map((row: any) => ({
      id: row.id,
      seekerName: row.seeker_name || 'Anonymous Applicant',
      seekerEmail: row.seeker_email || '',
      seekerPhone: row.seeker_phone || '',
      expertName: row.expert_name || '',
      expertEmail: row.expert_email || '',
      visaCategory: row.visa_category || 'General Consultation',
      status: row.status || 'pending',
      details: row.details || '',
      bookingDate: row.booking_date,
      createdAt: row.created_at
    }));

    return new Response(
      JSON.stringify({ success: true, bookings, total: bookings.length }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[API /api/bookings GET] Error:', err);
    return new Response(
      JSON.stringify({ success: false, bookings: [], error: err?.message || 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
