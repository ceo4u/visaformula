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
        seeker_id,
        expert_id,
        seeker_name,
        seeker_email,
        seeker_phone,
        expert_name,
        expert_email,
        visa_category,
        details,
        booking_date,
        status
      ) VALUES (COALESCE($1, 0), COALESCE($2, 0), $3, $4, $5, $6, $7, $8, $9, COALESCE($10::timestamp, CURRENT_TIMESTAMP), 'pending')
      RETURNING id, created_at`,
      [
        body.seekerId || 0,
        body.expertId || 0,
        seekerName,
        seekerEmail,
        seekerPhone,
        expertName,
        expertEmail,
        visaCategory,
        details || body.notes || '',
        bookingDate || body.preferredDate || null
      ]
    );

    const inserted = result.rows[0];

    // Trigger Automated Email Notification via Resend to Expert
    const resendKey = (import.meta?.env?.RESEND_API_KEY as string) || (process.env.RESEND_API_KEY as string) || '';
    if (resendKey && expertEmail) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'TravlTik <noreply@travltik.com>',
            to: [expertEmail],
            subject: `🎉 New Client Enquiry from ${seekerName || 'Applicant'} (${visaCategory})`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
                <div style="background-color: #581c87; color: white; padding: 16px 24px; border-radius: 12px 12px 0 0; text-align: center;">
                  <h2 style="margin: 0; font-size: 20px;">TravlTik — New Consultation Request</h2>
                </div>
                <div style="padding: 24px; color: #1e293b;">
                  <p style="font-size: 16px; font-weight: bold;">Hello ${expertName || 'Consultant'},</p>
                  <p>You have received a new consultation enquiry on TravlTik platform!</p>

                  <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 16px; margin: 16px 0;">
                    <p style="margin: 6px 0;"><strong>👤 Applicant Name:</strong> ${seekerName || 'N/A'}</p>
                    <p style="margin: 6px 0;"><strong>📧 Email:</strong> <a href="mailto:${seekerEmail}">${seekerEmail}</a></p>
                    <p style="margin: 6px 0;"><strong>📞 Phone:</strong> <a href="tel:${seekerPhone}">${seekerPhone || 'Not provided'}</a></p>
                    <p style="margin: 6px 0;"><strong>📋 Visa Category:</strong> ${visaCategory}</p>
                    <p style="margin: 6px 0;"><strong>📝 Message / Details:</strong> ${details || 'No additional details provided.'}</p>
                  </div>

                  <p style="font-size: 13px; color: #64748b;">Log into your <strong>Consultant Dashboard</strong> on Travltik to manage this enquiry and connect with the applicant.</p>
                </div>
              </div>
            `,
          }),
        });
      } catch (emailErr) {
        console.warn('[API /api/bookings] Email dispatch warning:', emailErr);
      }
    }

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
