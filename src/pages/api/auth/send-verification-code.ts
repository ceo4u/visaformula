// ============================================================
// src/pages/api/auth/send-verification-code.ts
// Send OTP via Plunk using the EmailService + OTP module
// ============================================================

import type { APIRoute } from 'astro';
import { runMigrations, getPool } from '../../../backend/db';
import { generateOtp, saveOtp } from '../../../lib/otp';
import { sendVerificationOTP } from '../../../lib/email';
import { checkRateLimit, RATE_LIMITS, getIpFromRequest, rateLimitErrorResponse } from '../../../lib/rate-limit';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // ── Rate limit by IP ─────────────────────────────────────
    const ip = getIpFromRequest(request);
    const rl = checkRateLimit(`send-otp:${ip}`, RATE_LIMITS.SEND_OTP);
    if (!rl.allowed) return rateLimitErrorResponse(rl.resetAt);

    // ── Validate input ───────────────────────────────────────
    const body = await request.json();
    const { email } = body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(JSON.stringify({ status: 'error', message: 'Please provide a valid email address.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // ── Check if already registered ─────────────────────────
    await runMigrations();
    const pool = getPool();
    const [seekerCheck, expertCheck] = await Promise.all([
      pool.query('SELECT id FROM seekers WHERE LOWER(email) = LOWER($1)', [email]),
      pool.query('SELECT id FROM experts WHERE LOWER(email) = LOWER($1)', [email]),
    ]);
    if (seekerCheck.rows.length > 0 || expertCheck.rows.length > 0) {
      return new Response(JSON.stringify({ status: 'error', code: 'EMAIL_ALREADY_EXISTS', message: 'This email is already registered.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // ── Generate & store OTP ─────────────────────────────────
    const otp = generateOtp();
    const saveResult = await saveOtp(email, otp);

    if (!saveResult.success) {
      if (saveResult.error === 'COOLDOWN_ACTIVE') {
        return new Response(JSON.stringify({
          status: 'error',
          code: 'COOLDOWN_ACTIVE',
          message: `Please wait ${saveResult.cooldownSecondsLeft} seconds before requesting another code.`,
          cooldownSecondsLeft: saveResult.cooldownSecondsLeft,
        }), { status: 429, headers: { 'Content-Type': 'application/json' } });
      }
      if (saveResult.error === 'MAX_RESENDS_EXCEEDED') {
        return new Response(JSON.stringify({
          status: 'error',
          code: 'MAX_RESENDS_EXCEEDED',
          message: 'Maximum resend limit reached. Please try again after some time.',
        }), { status: 429, headers: { 'Content-Type': 'application/json' } });
      }
    }

    // ── Send email via Plunk asynchronously ──────────────────
    // Fire-and-forget: HTTP response returns immediately
    sendVerificationOTP({ otp, email, expiresInMinutes: 10 })
      .catch(err => console.error('[send-verification-code] Async email failed:', err));

    return new Response(JSON.stringify({
      status: 'success',
      message: 'Verification code sent! Please check your email.',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err: any) {
    console.error('[send-verification-code] Error:', err);
    return new Response(JSON.stringify({ status: 'error', message: 'An unexpected error occurred. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
