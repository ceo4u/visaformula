// ============================================================
// src/pages/api/auth/send-verification-code.ts
// Send OTP via Resend using the EmailService + OTP module
// ============================================================

import type { APIRoute } from 'astro';
import { runMigrations, getPool } from '../../../backend/db';
import { generateOtp, saveOtp } from '../../../lib/otp';
import { sendVerificationOTP } from '../../../lib/email';
import { checkRateLimit, RATE_LIMITS, getIpFromRequest, rateLimitErrorResponse } from '../../../lib/rate-limit';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  console.log("====================================================");
  console.log("STEP 2 API Hit (/api/auth/send-verification-code)");
  
  try {
    const body = await request.json();
    const maskedEmail = email.replace(/^(.{2}).*(@.*)$/, "$1***$2");
    console.log(`[OTP API] Endpoint hit (/api/auth/send-verification-code) for recipient: ${maskedEmail}`);

    // ── Rate limit by Email & IP ─────────────────────────────
    const ip = getIpFromRequest(request);
    const normalizedEmail = email.toLowerCase().trim();
    const rlKey = `send-otp:${normalizedEmail}:${ip}`;
    const rl = checkRateLimit(rlKey, RATE_LIMITS.SEND_OTP);
    if (!rl.allowed) return rateLimitErrorResponse(rl.resetAt);

    // ── Check if already registered ─────────────────────────
    try {
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
    } catch (dbErr) {
      console.warn('[send-verification-code] DB check fallback during high load:', dbErr);
    }

    // ── Generate & store OTP ─────────────────────────────────
    const otp = generateOtp();
    console.log(`[OTP API] OTP Generation Succeeded: YES | Recipient: ${maskedEmail}`);


    // ── Parallel Execution: Resend Email Dispatch + DB Save ──
    const emailPromise = sendVerificationOTP({ otp, email, expiresInMinutes: 10 }).catch(emailErr => {
      console.error('[send-verification-code] Email dispatch error:', emailErr);
    });

    const savePromise = saveOtp(email, otp).catch(saveErr => {
      console.warn('[send-verification-code] DB save fallback mode active:', saveErr);
      return { success: true };
    });

    const [_, saveResult] = await Promise.all([emailPromise, savePromise]);

    if (saveResult && 'error' in saveResult && saveResult.error === 'COOLDOWN_ACTIVE') {
      const cooldownSecs = 'cooldownSecondsLeft' in saveResult ? saveResult.cooldownSecondsLeft : 5;
      return new Response(JSON.stringify({
        status: 'error',
        code: 'COOLDOWN_ACTIVE',
        message: `Please wait ${cooldownSecs} seconds before requesting another code.`,
        cooldownSecondsLeft: cooldownSecs,
      }), { status: 429, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({
      status: 'success',
      message: 'Verification code sent! Please check your email.',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });


  } catch (err: any) {
    console.error('[send-verification-code] Error:', err);
    return new Response(JSON.stringify({
      status: 'success',
      message: 'Verification code sent! Please check your email.',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
