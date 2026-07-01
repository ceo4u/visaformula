import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../backend/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { first_name, last_name, email, password, phone, passport_country, goals, destinations } = body;

    await runMigrations();
    const pool = getPool();

    // Insert seeker record
    await pool.query(`
      INSERT INTO seekers (first_name, last_name, email, password_hash, phone, passport_country, goals, destinations)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (email) DO UPDATE 
      SET first_name = $1, last_name = $2, phone = $5, passport_country = $6, goals = $7, destinations = $8;
    `, [
      first_name, 
      last_name, 
      email, 
      password || '', 
      phone, 
      passport_country, 
      JSON.stringify(goals || []), 
      JSON.stringify(destinations || [])
    ]);

    return new Response(JSON.stringify({ status: 'success', message: 'Seeker registered successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Seeker API error:', err);
    return new Response(JSON.stringify({ status: 'error', message: err.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
