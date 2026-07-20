// src/pages/api/auth/verify-reset-code.ts
import type { APIRoute } from 'astro';
import crypto from 'crypto';
import { getPool, runMigrations } from '../../../backend/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, token } = await request.json();

    if (!email || !token) {
      return new Response(JSON.stringify({ status: 'error', message: 'Email and verification code are required.' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }

    await runMigrations();
    const pool = getPool();

    // Hash token to match database
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Query active token for this email
    const tokenRes = await pool.query(
      'SELECT expires_at, used FROM password_resets WHERE token_hash = $1 AND LOWER(email) = LOWER($2)',
      [tokenHash, email.toLowerCase()]
    );

    if (tokenRes.rows.length === 0) {
      return new Response(JSON.stringify({ status: 'error', message: 'Invalid verification code.' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }

    const { expires_at, used } = tokenRes.rows[0];

    if (used) {
      return new Response(JSON.stringify({ status: 'error', message: 'This verification code has already been used.' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }

    if (new Date() > new Date(expires_at)) {
      return new Response(JSON.stringify({ status: 'error', message: 'This verification code has expired.' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      status: 'success',
      verified: true,
      message: 'Code verified successfully.'
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (err: any) {
    console.error('[verify-reset-code] Error:', err);
    return new Response(JSON.stringify({ status: 'error', message: 'An unexpected error occurred.' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
};
