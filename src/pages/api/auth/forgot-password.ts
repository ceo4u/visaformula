// ============================================================
// src/pages/api/auth/forgot-password.ts
// Generate secure reset token and send password reset email via Plunk
// ============================================================

import type { APIRoute } from 'astro';
import crypto from 'crypto';
import { getPool, runMigrations } from '../../../backend/db';
import { sendPasswordReset } from '../../../lib/email';
import { checkRateLimit, RATE_LIMITS, getIpFromRequest, rateLimitErrorResponse } from '../../../lib/rate-limit';

export const prerender = false;

const RESET_TOKEN_EXPIRY_MINUTES = 30;

export const POST: APIRoute = async ({ request }) => {
  try {
    // ── Rate limit ────────────────────────────────────────────
    const ip = getIpFromRequest(request);
    const rl = checkRateLimit(`password-reset:${ip}`, RATE_LIMITS.PASSWORD_RESET);
    if (!rl.allowed) return rateLimitErrorResponse(rl.resetAt);

    // ── Validate input ────────────────────────────────────────
    const { email } = await request.json();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(JSON.stringify({ status: 'error', message: 'Please provide a valid email address.' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }

    await runMigrations();
    const pool = getPool();

    // ── Look up user (seeker or expert) ──────────────────────
    let user: any = null;
    let userType: 'seeker' | 'expert' | null = null;

    const seekerRes = await pool.query('SELECT id, first_name FROM seekers WHERE LOWER(email) = LOWER($1)', [email]);
    if (seekerRes.rows.length > 0) {
      user = seekerRes.rows[0];
      userType = 'seeker';
    } else {
      const expertRes = await pool.query('SELECT id, business_name FROM experts WHERE LOWER(email) = LOWER($1)', [email]);
      if (expertRes.rows.length > 0) {
        user = expertRes.rows[0];
        userType = 'expert';
      }
    }

    // Return error if user does not exist to guide reset flow
    if (!user) {
      return new Response(JSON.stringify({
        status: 'error',
        message: 'This email is not registered with us.',
      }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // ── Generate 6-digit numeric OTP ────────────────────────────
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const tokenHash = crypto.createHash('sha256').update(otpCode).digest('hex');
    const expiresAt = new Date(Date.now() + RESET_TOKEN_EXPIRY_MINUTES * 60 * 1000);

    // Invalidate any previous unused tokens for this email
    await pool.query('UPDATE password_resets SET used = true WHERE email = $1', [email.toLowerCase()]);

    // Store hashed token
    await pool.query(
      'INSERT INTO password_resets (email, token_hash, expires_at, used) VALUES ($1, $2, $3, false)',
      [email.toLowerCase(), tokenHash, expiresAt]
    );

    // ── Send reset email (MUST await on Vercel serverless) ───────────────
    // CRITICAL: fire-and-forget gets killed by Vercel before email sends
    const firstName = userType === 'seeker' ? user.first_name : user.business_name;
    let emailSent = false;
    try {
      const emailResult = await sendPasswordReset({
        resetToken: otpCode,
        email,
        firstName,
        expiresInMinutes: RESET_TOKEN_EXPIRY_MINUTES,
      });
      emailSent = emailResult.success;
      if (!emailResult.success) {
        console.error('[forgot-password] Email send failed:', emailResult.error);
      }
    } catch (emailErr: any) {
      console.error('[forgot-password] Email exception:', emailErr?.message || emailErr);
    }

    if (!emailSent) {
      return new Response(JSON.stringify({
        status: 'error',
        message: 'Failed to send reset email. Please try again in a moment.',
      }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({
      status: 'success',
      message: 'A 6-digit verification code has been sent to your email address.',
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (err: any) {
    console.error('[forgot-password] Error:', err);
    return new Response(JSON.stringify({ status: 'error', message: 'An unexpected error occurred.' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
};
