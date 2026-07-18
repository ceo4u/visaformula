import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../backend/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { first_name, last_name, email, password, phone, passport_country, goals, destinations, looking_for } = body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(JSON.stringify({ status: 'error', message: 'Please provide a valid email address.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await runMigrations();
    const pool = getPool();

    // Verify email verification has succeeded
    const verCheck = await pool.query('SELECT verified FROM email_verifications WHERE LOWER(email) = LOWER($1)', [email]);
    if (verCheck.rows.length === 0 || !verCheck.rows[0].verified) {
      return new Response(JSON.stringify({ status: 'error', message: 'Email address has not been verified.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const checkRes = await pool.query('SELECT id FROM seekers WHERE LOWER(email) = LOWER($1)', [email]);
    const isNew = checkRes.rows.length === 0;

    // Insert seeker record
    await pool.query(`
      INSERT INTO seekers (first_name, last_name, email, password_hash, phone, passport_country, goals, destinations, looking_for)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (email) DO UPDATE 
      SET first_name = $1, last_name = $2, phone = $5, passport_country = $6, goals = $7, destinations = $8, looking_for = $9;
    `, [
      first_name, 
      last_name, 
      email, 
      password || '', 
      phone, 
      passport_country, 
      JSON.stringify(goals || []), 
      JSON.stringify(destinations || []),
      looking_for || ''
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

    const userRes = await pool.query('SELECT * FROM seekers WHERE LOWER(email) = LOWER($1)', [email]);
    const user = userRes.rows[0];

    return new Response(JSON.stringify({
      status: 'success',
      message: 'Seeker registered successfully!',
      user: {
        uid: `seeker_${user.id}`,
        email: user.email,
        displayName: `${user.first_name} ${user.last_name || ''}`.trim(),
        type: 'seeker',
        rawUser: user
      }
    }), {
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
