// src/pages/api/admin/users.ts
import type { APIRoute } from 'astro';
import { runMigrations, getPool } from '../../../backend/db';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    await runMigrations();
    const pool = getPool();

    const res = await pool.query(`
      SELECT 
        id, first_name, last_name, email, phone,
        passport_country, goals, destinations, looking_for,
        city, state, current_visa_status, created_at
      FROM seekers
      ORDER BY id DESC
    `);

    return new Response(
      JSON.stringify({ success: true, users: res.rows }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[API /api/admin/users] GET Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: err?.message || 'Failed to fetch registered users' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
