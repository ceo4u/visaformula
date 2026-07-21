// ============================================================
// src/lib/otp.ts
// OTP generation, hashing, storage and verification — PostgreSQL backed
// ============================================================

import crypto from 'crypto';
import { getPool, runMigrations } from '../backend/db';

const OTP_LENGTH = parseInt(process.env.OTP_LENGTH || '6', 10);
const OTP_EXPIRY_MINUTES = parseInt(process.env.OTP_EXPIRY_MINUTES || '10', 10);
const MAX_ATTEMPTS = 5;
const MAX_RESENDS = 10;           // Allow up to 10 resends per session
const RESEND_COOLDOWN_SECONDS = 30; // 30 second cooldown between resends

// ─── Generation ────────────────────────────────────────────

/** Generate a cryptographically secure numeric OTP */
export function generateOtp(): string {
  const min = Math.pow(10, OTP_LENGTH - 1);
  const max = Math.pow(10, OTP_LENGTH) - 1;
  // crypto.randomInt is secure and available in Node >=14.10
  return crypto.randomInt(min, max + 1).toString();
}

/** Hash an OTP using SHA-256 — never store plaintext */
export function hashOtp(otp: string): string {
  return crypto.createHash('sha256').update(otp).digest('hex');
}

// ─── Storage ───────────────────────────────────────────────

/**
 * Save or refresh OTP record in `email_verifications` table.
 * Respects resend limits and cooldown.
 */
export async function saveOtp(email: string, otp: string): Promise<{
  success: boolean;
  error?: 'MAX_RESENDS_EXCEEDED' | 'COOLDOWN_ACTIVE';
  cooldownSecondsLeft?: number;
}> {
  await runMigrations();
  const pool = getPool();
  const normalizedEmail = email.toLowerCase();
  const otpHash = hashOtp(otp);
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  // Check existing record
  const existing = await pool.query(
    'SELECT resend_count, last_resend_at FROM email_verifications WHERE email = $1',
    [normalizedEmail]
  );

  if (existing.rows.length > 0) {
    const record = existing.rows[0];

    // Check resend limit
    if ((record.resend_count || 0) >= MAX_RESENDS) {
      return { success: false, error: 'MAX_RESENDS_EXCEEDED' };
    }

    // Check cooldown
    if (record.last_resend_at) {
      const secondsSinceLast = (Date.now() - new Date(record.last_resend_at).getTime()) / 1000;
      if (secondsSinceLast < RESEND_COOLDOWN_SECONDS) {
        return {
          success: false,
          error: 'COOLDOWN_ACTIVE',
          cooldownSecondsLeft: Math.ceil(RESEND_COOLDOWN_SECONDS - secondsSinceLast),
        };
      }
    }
  }

  // Upsert the OTP record
  await pool.query(
    `INSERT INTO email_verifications
       (email, otp_hash, expires_at, attempts, resend_count, last_resend_at, verified, created_at)
     VALUES ($1, $2, $3, 0, 1, NOW(), false, NOW())
     ON CONFLICT (email) DO UPDATE SET
       otp_hash       = EXCLUDED.otp_hash,
       expires_at     = EXCLUDED.expires_at,
       attempts       = 0,
       resend_count   = email_verifications.resend_count + 1,
       last_resend_at = NOW(),
       verified       = false,
       created_at     = NOW()`,
    [normalizedEmail, otpHash, expiresAt]
  );

  return { success: true };
}

// ─── Verification ──────────────────────────────────────────

export type VerifyOtpResult =
  | { success: true }
  | { success: false; error: 'NOT_FOUND' | 'EXPIRED' | 'TOO_MANY_ATTEMPTS' | 'INVALID' };

/**
 * Verify an OTP against the database.
 * Increments attempts on failure, marks verified on success.
 */
export async function verifyOtp(email: string, otp: string): Promise<VerifyOtpResult> {
  const pool = getPool();
  const normalizedEmail = email.toLowerCase();

  const result = await pool.query(
    'SELECT * FROM email_verifications WHERE email = $1',
    [normalizedEmail]
  );

  if (result.rows.length === 0) {
    return { success: false, error: 'NOT_FOUND' };
  }

  const record = result.rows[0];

  if ((record.attempts || 0) >= MAX_ATTEMPTS) {
    return { success: false, error: 'TOO_MANY_ATTEMPTS' };
  }

  if (new Date() > new Date(record.expires_at)) {
    return { success: false, error: 'EXPIRED' };
  }

  const computedHash = hashOtp(otp);
  if (computedHash !== record.otp_hash) {
    await pool.query(
      'UPDATE email_verifications SET attempts = attempts + 1 WHERE email = $1',
      [normalizedEmail]
    );
    return { success: false, error: 'INVALID' };
  }

  // Mark verified and clear hash for security
  await pool.query(
    "UPDATE email_verifications SET verified = true, otp_hash = '' WHERE email = $1",
    [normalizedEmail]
  );

  return { success: true };
}

/** Check if an email has been OTP-verified */
export async function isEmailVerified(email: string): Promise<boolean> {
  const pool = getPool();
  const result = await pool.query(
    'SELECT verified FROM email_verifications WHERE LOWER(email) = $1',
    [email.toLowerCase()]
  );
  return result.rows.length > 0 && result.rows[0].verified === true;
}

/** Delete an OTP record (called after successful registration) */
export async function deleteOtpRecord(email: string): Promise<void> {
  const pool = getPool();
  await pool.query('DELETE FROM email_verifications WHERE email = $1', [email.toLowerCase()]);
}
