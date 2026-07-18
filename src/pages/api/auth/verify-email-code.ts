import type { APIRoute } from 'astro';
import { getPool } from '../../../backend/db';
import crypto from 'crypto';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return new Response(JSON.stringify({ status: 'error', message: 'Email and verification code are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const pool = getPool();
    const verRes = await pool.query('SELECT * FROM email_verifications WHERE LOWER(email) = LOWER($1)', [email]);

    if (verRes.rows.length === 0) {
      return new Response(JSON.stringify({ status: 'error', message: 'No verification request found for this email.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const record = verRes.rows[0];

    // Check attempts limit
    if (record.attempts >= 5) {
      return new Response(JSON.stringify({ status: 'error', message: 'Too many failed attempts. Code locked.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check expiry
    if (new Date() > new Date(record.expires_at)) {
      return new Response(JSON.stringify({ status: 'error', message: 'Verification code has expired.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Compare sha256 hash
    const computedHash = crypto.createHash('sha256').update(otp).digest('hex');
    const isValid = computedHash === record.otp_hash;

    if (!isValid) {
      // Increment attempts
      await pool.query('UPDATE email_verifications SET attempts = attempts + 1 WHERE LOWER(email) = LOWER($1)', [email]);
      return new Response(JSON.stringify({ status: 'error', message: 'Invalid verification code.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Set as verified
    await pool.query('UPDATE email_verifications SET verified = true, otp_hash = \'\' WHERE LOWER(email) = LOWER($1)', [email]);

    return new Response(JSON.stringify({ status: 'success', verified: true, message: 'Email verified successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Verify OTP API error:', err);
    return new Response(JSON.stringify({ status: 'error', message: err.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
