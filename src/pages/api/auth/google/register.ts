import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../../backend/db';
import { createSession } from '../../../../backend/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, name, businessName, uid, role } = await request.json();
    if (!email || !role) {
      return new Response(JSON.stringify({ status: 'error', message: 'Email and role selection are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await runMigrations();
    const pool = getPool();

    let user: any = null;
    const fallbackName = email ? email.split('@')[0] : 'User';
    const names = (name || fallbackName).trim().split(' ');
    const firstName = names[0] || fallbackName;
    const lastName = names.slice(1).join(' ') || '';

    // If explicit businessName is provided, use it; otherwise use full name
    const finalBusinessName = (businessName && businessName.trim()) 
      ? businessName.trim() 
      : `${firstName} ${lastName}`.trim();

    // 1. Register based on selected role
    if (role === 'expert') {
      const insertRes = await pool.query(`
        INSERT INTO experts (business_name, email, password_hash, contact_number, advisor_type, about_me, portfolio_link, office_address, gov_registration_number, license_document_url, expertise_tags, countries_expertise)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *;
      `, [
        finalBusinessName,
        email,
        '', // No password hash for OAuth
        '',
        'Freelancer',
        '',
        '',
        '',
        '',
        '',
        '[]',
        '[]'
      ]);
      user = insertRes.rows[0];
    } else {
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
    }

    // 2. Send Welcome Email
    try {
      const { sendEmailWithRetry } = await import('../../../../lib/mail');
      const { generateWelcomeHtml } = await import('../../../../emails/WelcomeEmail');
      
      const emailDisplayName = role === 'expert' ? user.business_name : `${user.first_name} ${user.last_name || ''}`.trim();
      const html = generateWelcomeHtml({ firstName: role === 'expert' ? user.business_name : user.first_name, displayName: emailDisplayName });
      
      await sendEmailWithRetry({
        from: `"Visa Formula" <noreply@visaformula.com>`,
        to: email,
        subject: `Welcome to Visa Formula 👋`,
        html: html
      });
    } catch (emailErr) {
      console.error('Welcome email failed during Google role registration:', emailErr);
    }

    // 3. Create Session
    const token = await createSession(user.id, role);

    // Set cookie headers for session persistence
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append(
      'Set-Cookie',
      `visaformula_sid=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60};`
    );

    const displayName = role === 'seeker' 
      ? `${user.first_name} ${user.last_name || ''}`.trim() 
      : user.business_name;

    return new Response(JSON.stringify({
      status: 'success',
      user: {
        uid: `${role}_${user.id}`,
        email: user.email,
        displayName: displayName || 'User',
        type: role,
        rawUser: user
      }
    }), { status: 200, headers });

  } catch (err: any) {
    console.error('Google registration role endpoint error:', err);
    return new Response(JSON.stringify({ status: 'error', message: err.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
