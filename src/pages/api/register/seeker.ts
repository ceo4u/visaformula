import type { APIRoute } from 'astro';
import pg from 'pg';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { first_name, last_name, email, password, phone, passport_country, goals, destinations } = body;

    const pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });

    // Self-migrating table creation
    await pool.query(`
      CREATE TABLE IF NOT EXISTS seekers (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        email VARCHAR(255) UNIQUE,
        password_hash VARCHAR(255),
        phone VARCHAR(50),
        passport_country VARCHAR(100),
        goals TEXT,
        destinations TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

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

    await pool.end();

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
