// ============================================================
// src/pages/api/auth/send-verification-code.ts
// Enterprise OTP Send API
// - Parallel DB checks (no sequential awaits)
// - Awaited email send (Vercel-safe, no fire-and-forget)
// - Clear error messages on failure
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

    // ── Validate email ───────────────────────────────────────
    const body = await request.json();
    const email = (body?.email || '').trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(JSON.stringify({ status: 'error', message: 'Please provide a valid email address.' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }

    // ── Parallel: run migrations + check existing users ──────
    await runMigrations();
    const pool = getPool();
    const [seekerCheck, expertCheck] = await Promise.all([
      pool.query('SELECT id FROM seekers WHERE LOWER(email) = $1', [email]),
      pool.query('SELECT id FROM experts WHERE LOWER(email) = $1', [email]),
    ]);
    if (seekerCheck.rows.length > 0 || expertCheck.rows.length > 0) {
      return new Response(JSON.stringify({
        status: 'error', code: 'EMAIL_ALREADY_EXISTS',
        message: 'This email is already registered. Please login instead.',
      }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // ── Generate & save OTP ──────────────────────────────────
    const otp = generateOtp();
    const saveResult = await saveOtp(email, otp);

    if (!saveResult.success) {
      if (saveResult.error === 'COOLDOWN_ACTIVE') {
        return new Response(JSON.stringify({
          status: 'error', code: 'COOLDOWN_ACTIVE',
          message: `Please wait ${saveResult.cooldownSecondsLeft} seconds before requesting another code.`,
          cooldownSecondsLeft: saveResult.cooldownSecondsLeft,
        }), { status: 429, headers: { 'Content-Type': 'application/json' } });
      }
      if (saveResult.error === 'MAX_RESENDS_EXCEEDED') {
        return new Response(JSON.stringify({
          status: 'error', code: 'MAX_RESENDS_EXCEEDED',
          message: 'Maximum resend limit reached. Please try again after 10 minutes.',
        }), { status: 429, headers: { 'Content-Type': 'application/json' } });
      }
    }

    // ── Send OTP email (awaited — Vercel serverless safe) ────
    // Must await before returning or Vercel kills the outgoing HTTP request
    const emailResult = await sendVerificationOTP({ otp, email, expiresInMinutes: 10 });

    if (!emailResult.success) {
      console.error('[send-verification-code] Email failed:', emailResult.error);
      return new Response(JSON.stringify({
        status: 'error',
        message: 'Could not send verification email. Please try again.',
      }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({
      status: 'success',
      message: 'Verification code sent! Please check your inbox.',
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (err: any) {
    console.error('[send-verification-code] Unexpected error:', err?.message || err);
    return new Response(JSON.stringify({ status: 'error', message: 'An unexpected error occurred. Please try again.' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
};
