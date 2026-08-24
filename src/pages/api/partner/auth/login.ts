import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../../backend/db';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    await runMigrations();
    const pool = getPool();
    const { email, password, role = 'country_partner' } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ success: false, message: 'Email and password are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Check channel_partners table
    let res = await pool.query('SELECT * FROM channel_partners WHERE LOWER(email) = LOWER($1)', [cleanEmail]);

    // If demo email or initial bootstrap
    if (res.rows.length === 0 && cleanEmail === 'partner@globalhorizons.com') {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const insertRes = await pool.query(
        `INSERT INTO channel_partners (company_name, email, password_hash, contact_person, country, tier, role, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'active')
         RETURNING *`,
        [
          'GLOBAL HORIZONS PVT. LTD.',
          cleanEmail,
          hashedPassword,
          'Country Director',
          'United States',
          'platinum',
          role || 'country_partner'
        ]
      );
      res = insertRes;
    }

    if (res.rows.length === 0) {
      return new Response(JSON.stringify({ success: false, message: 'No registered partner account found with this email address.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const partner = res.rows[0];
    const match = await bcrypt.compare(password, partner.password_hash);
    if (!match) {
      return new Response(JSON.stringify({ success: false, message: 'Incorrect password. Please try again.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check review status
    const statusNormalized = (partner.status || '').toUpperCase();
    if (statusNormalized.includes('PENDING') || statusNormalized === 'UNDER_REVIEW') {
      return new Response(JSON.stringify({
        success: false,
        message: 'Your account is currently under review by TravlTik HQ. You will receive an email once activated.'
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (statusNormalized === 'REJECTED' || statusNormalized === 'SUSPENDED') {
      return new Response(JSON.stringify({
        success: false,
        message: 'This partner account is inactive. Please contact partner support.'
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Active -> Create session token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await pool.query(
      'INSERT INTO partner_sessions (token, partner_id, expires_at) VALUES ($1, $2, $3)',
      [token, partner.id, expiresAt]
    );

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.append(
      'Set-Cookie',
      `cp_sid=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}`
    );

    return new Response(JSON.stringify({
      success: true,
      partner: {
        id: partner.id,
        company_name: partner.company_name,
        email: partner.email,
        role: partner.role,
        tier: partner.tier,
        country: partner.country
      }
    }), { status: 200, headers });

  } catch (err: any) {
    console.error('[PartnerLogin]', err);
    return new Response(JSON.stringify({ success: false, message: err.message || 'Server error during authentication.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
