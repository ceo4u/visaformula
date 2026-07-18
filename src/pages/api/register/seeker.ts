import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../backend/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { first_name, last_name, email, password, phone, passport_country, goals, destinations } = body;

    await runMigrations();
    const pool = getPool();

    const checkRes = await pool.query('SELECT id FROM seekers WHERE LOWER(email) = LOWER($1)', [email]);
    const isNew = checkRes.rows.length === 0;

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

    if (isNew) {
      try {
        const { sendEmailWithRetry } = await import('../../../lib/mail');
        const { generateWelcomeHtml } = await import('../../../emails/WelcomeEmail');
        
        const html = generateWelcomeHtml({ firstName: first_name, displayName: `${first_name} ${last_name || ''}`.trim() });
        await sendEmailWithRetry({
          from: `"Visa Formula" <noreply@visaformula.com>`,
          to: email,
          subject: `Welcome to Visa Formula 👋`,
          html: html
        });
      } catch (emailErr) {
        console.error('Welcome email failed for standard Seeker user:', emailErr);
      }
    }

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
