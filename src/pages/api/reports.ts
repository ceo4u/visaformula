// src/pages/api/reports.ts
// Handles dispute and fraud reporting with server-side audit logging
import type { APIRoute } from 'astro';
import { runMigrations, getPool } from '../../backend/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    await runMigrations();
    const pool = getPool();
    const body = await request.json();

    const {
      reporterEmail = '',
      reporterName = '',
      reporterRole = 'seeker',
      targetType = 'provider',
      targetId = '',
      targetName = '',
      reason = '',
      description = '',
      evidenceUrl = ''
    } = body;

    // Strict validation
    if (!reporterEmail || !reason || !description.trim()) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Reporter email, reason for report, and detailed explanation are required.' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(reporterEmail.trim())) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please provide a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const allowedReasons = [
      'Spam Lead',
      'Fake Profile',
      'Payment Issue',
      'Misleading Information',
      'Other'
    ];

    const sanitizedReason = allowedReasons.includes(reason) ? reason : 'Other';

    // Insert dispute report
    const reportRes = await pool.query(
      `INSERT INTO reports (
        reporter_email,
        reporter_name,
        reporter_role,
        target_type,
        target_id,
        target_name,
        reason,
        description,
        evidence_url,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'Open')
      RETURNING id, created_at`,
      [
        reporterEmail.trim().toLowerCase(),
        reporterName || 'Anonymous Reporter',
        reporterRole || 'seeker',
        targetType || 'provider',
        targetId ? String(targetId) : null,
        targetName || 'Unspecified Target',
        sanitizedReason,
        description,
        evidenceUrl || null
      ]
    );

    const reportId = reportRes.rows[0].id;

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Your report has been submitted to the TravlTik Trust & Safety compliance team.',
        reportId,
        status: 'Open'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[API /api/reports POST] Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to submit report. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
