// src/pages/api/admin/bookings.ts
import type { APIRoute } from 'astro';
import { runMigrations, getPool } from '../../../backend/db';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    await runMigrations();
    const pool = getPool();

    const res = await pool.query(`
      SELECT 
        id, seeker_name, seeker_email, seeker_phone,
        expert_name, expert_email, visa_category,
        booking_date, status, details, created_at
      FROM bookings
      ORDER BY id DESC
    `);

    return new Response(
      JSON.stringify({ success: true, bookings: res.rows }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[API /api/admin/bookings] GET Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: err?.message || 'Failed to fetch bookings' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
