// ============================================================
// src/pages/api/auth/verify-email-code.ts
// Verify OTP using the otp.ts module
// ============================================================

import type { APIRoute } from 'astro';
import { verifyOtp } from '../../../lib/otp';
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
    const result = await verifyOtp(email, otp);

    if (result.success) {
      return new Response(JSON.stringify({ status: 'success', verified: true, message: 'Email verified successfully!' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // ── Map errors to user-friendly messages ─────────────────
    const errorMessages: Record<string, { message: string; code: string }> = {
      NOT_FOUND: { message: 'No verification request found. Please request a new code.', code: 'NOT_FOUND' },
      EXPIRED:   { message: 'Verification code has expired. Please request a new one.', code: 'EXPIRED' },
      TOO_MANY_ATTEMPTS: { message: 'Too many failed attempts. Please request a new code.', code: 'TOO_MANY_ATTEMPTS' },
      INVALID:   { message: 'Invalid verification code. Please check and try again.', code: 'INVALID_OTP' },
    };

    const errorInfo = errorMessages[result.error] || { message: 'Verification failed.', code: 'UNKNOWN' };

    return new Response(JSON.stringify({ status: 'error', code: errorInfo.code, message: errorInfo.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err: any) {
    console.error('[verify-email-code] Error:', err);
    return new Response(JSON.stringify({ status: 'error', message: 'An unexpected error occurred.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
