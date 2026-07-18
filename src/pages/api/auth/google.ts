import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../backend/db';
import { createSession } from '../../../backend/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, name, uid } = await request.json();
    if (!email) {
      return new Response(JSON.stringify({ status: 'error', message: 'Email is required for Google authentication.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await runMigrations();
    const pool = getPool();

    // 1. Check if user is registered as Seeker
    const seekerRes = await pool.query('SELECT * FROM seekers WHERE LOWER(email) = LOWER($1)', [email]);
    let user: any = null;
    let type: 'seeker' | 'expert' = 'seeker';

    if (seekerRes.rows.length > 0) {
      user = seekerRes.rows[0];
      type = 'seeker';
    } else {
      // 2. Check if user is registered as Expert
      const expertRes = await pool.query('SELECT * FROM experts WHERE LOWER(email) = LOWER($1)', [email]);
      if (expertRes.rows.length > 0) {
        user = expertRes.rows[0];
        type = 'expert';
      }
    }

    // 3. Auto-Register as Seeker if user is brand new (Deferred Onboarding)
    if (!user) {
      const names = (name || 'Google User').split(' ');
      const firstName = names[0];
      const lastName = names.slice(1).join(' ') || '';

      const insertRes = await pool.query(`
        INSERT INTO seekers (first_name, last_name, email, password_hash, phone, passport_country, goals, destinations)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
      `, [
        firstName,
        lastName,
        email,
        '', // No password hash for OAuth
        '',
        '',
        '[]',
        '[]'
      ]);
      user = insertRes.rows[0];
      type = 'seeker';

      // Trigger Welcome Email for new Google Seeker
      try {
        const { sendEmailWithRetry } = await import('../../../lib/mail');
        const { generateWelcomeHtml } = await import('../../../emails/WelcomeEmail');
        
        const html = generateWelcomeHtml({ firstName, displayName: name || 'Google User' });
        await sendEmailWithRetry({
          from: `"Visa Formula" <noreply@visaformula.com>`,
          to: email,
          subject: `Welcome to Visa Formula 👋`,
          html: html
        });
      } catch (emailErr) {
        console.error('Welcome email failed for new Google user:', emailErr);
      }
    }

    // 4. Create Session
    const token = await createSession(user.id, type);

    // Set cookie headers for session persistence
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append(
      'Set-Cookie',
      `visaformula_sid=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60};`
    );

    const displayName = type === 'seeker' 
      ? `${user.first_name} ${user.last_name || ''}`.trim() 
      : user.business_name;

    return new Response(JSON.stringify({
      status: 'success',
      user: {
        uid: `${type}_${user.id}`,
        email: user.email,
        displayName: displayName || 'User',
        type,
        rawUser: user
      }
    }), { status: 200, headers });

  } catch (err: any) {
    console.error('Google Auth API error:', err);
    return new Response(JSON.stringify({ status: 'error', message: err.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
