// src/pages/api/admin/applications.ts
import type { APIRoute } from 'astro';
import { runMigrations, getPool } from '../../../backend/db';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    await runMigrations();
    const pool = getPool();

    const res = await pool.query(`
      SELECT 
        id, visa_type, destination_country, travel_date,
        first_name, last_name, email, mobile_number, nationality,
        passport_number, passport_expiry, selected_services,
        total_amount, payment_status, payment_id, status, created_at
      FROM self_applications
      ORDER BY id DESC
    `);

    return new Response(
      JSON.stringify({ success: true, applications: res.rows }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[API /api/admin/applications] GET Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: err?.message || 'Failed to fetch self-applications' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
