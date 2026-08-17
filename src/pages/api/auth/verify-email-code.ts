import type { APIRoute } from 'astro';
import { verifyOtp } from '../../../lib/otp';
import { getPool, runMigrations } from '../../../backend/db';
import { checkRateLimit, RATE_LIMITS, getIpFromRequest, rateLimitErrorResponse } from '../../../lib/rate-limit';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // ── Rate limit by IP ──────────────────────────────────────
    const ip = getIpFromRequest(request);
    const rl = checkRateLimit(`verify-otp:${ip}`, RATE_LIMITS.VERIFY_OTP);
    if (!rl.allowed) return rateLimitErrorResponse(rl.resetAt);

    // ── Validate input ────────────────────────────────────────
    const body = await request.json();
    const email = body.email;
    const otp = body.otp || body.code;

    if (!email || !otp) {
      return new Response(JSON.stringify({ status: 'error', message: 'Email and verification code are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // ── Verify OTP ────────────────────────────────────────────
    const result = await verifyOtp(email.trim().toLowerCase(), otp.trim());
    if (result.success) {
      let user: any = null;
      try {
        await runMigrations();
        const pool = getPool();
        const seekerCheck = await pool.query(
          'SELECT id, first_name, last_name, email, phone FROM seekers WHERE LOWER(email) = LOWER($1)',
          [email.trim().toLowerCase()]
        );
        if (seekerCheck.rows.length > 0) {
          const s = seekerCheck.rows[0];
          const name = `${s.first_name || ''} ${s.last_name || ''}`.trim() || s.email.split('@')[0];
          user = {
            uid: `seeker_${s.id}`,
            email: s.email,
            displayName: name,
            name,
            phone: s.phone || '',
            type: 'seeker',
            role: 'seeker'
          };
        }
      } catch (dbErr) {
        console.warn('[verify-email-code] DB seeker lookup warning:', dbErr);
      }

      return new Response(JSON.stringify({
        status: 'success',
        verified: true,
        message: 'Email verified successfully!',
        user,
        seekerExists: Boolean(user)
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      const errorMsg = result.error === 'EXPIRED' 
        ? 'Verification code has expired. Please request a new code.' 
        : 'Invalid 6-digit verification code. Please check and try again.';
      return new Response(JSON.stringify({
        status: 'error',
        code: result.error || 'INVALID_OTP',
        message: errorMsg
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

  } catch (err: any) {
    console.error('[verify-email-code] Error:', err);
    return new Response(JSON.stringify({ status: 'error', message: 'Failed to verify verification code.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

