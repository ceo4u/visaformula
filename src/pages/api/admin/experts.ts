// src/pages/api/admin/experts.ts
import type { APIRoute } from 'astro';
import { runMigrations, getPool } from '../../../backend/db';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    await runMigrations();
    const pool = getPool();

    const res = await pool.query(`
      SELECT 
        id, business_name, email, contact_number, advisor_type, 
        gov_registration_number, license_document_url, city, country,
        COALESCE(is_verified, false) as is_verified,
        COALESCE(verification_status, 'pending') as verification_status,
        created_at
      FROM experts
      ORDER BY id DESC
    `);

    return new Response(
      JSON.stringify({ success: true, experts: res.rows }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[API /api/admin/experts] GET Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: err?.message || 'Failed to fetch experts' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    await runMigrations();
    const pool = getPool();
    const body = await request.json();
    const { expertId, action } = body;

    if (!expertId || !action) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing expertId or action' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let isVerified = false;
    let statusStr = 'pending';

    if (action === 'approve' || action === 'verify') {
      isVerified = true;
      statusStr = 'approved';
    } else if (action === 'reject') {
      isVerified = false;
      statusStr = 'rejected';
    } else if (action === 'suspend') {
      isVerified = false;
      statusStr = 'suspended';
    }

    await pool.query(`
      UPDATE experts 
      SET is_verified = $1, verification_status = $2 
      WHERE id = $3
    `, [isVerified, statusStr, expertId]);

    return new Response(
      JSON.stringify({ success: true, message: `Expert status updated to ${statusStr}` }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[API /api/admin/experts] POST Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: err?.message || 'Failed to update expert status' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
