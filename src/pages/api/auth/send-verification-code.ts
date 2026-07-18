import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../backend/db';
import crypto from 'crypto';
import { sendEmailWithRetry } from '../../../lib/mail';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email } = body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(JSON.stringify({ status: 'error', message: 'Please provide a valid email address.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await runMigrations();
    const pool = getPool();

    // Check if user already exists as Seeker
    const seekerCheck = await pool.query('SELECT id FROM seekers WHERE LOWER(email) = LOWER($1)', [email]);
    if (seekerCheck.rows.length > 0) {
      return new Response(JSON.stringify({ status: 'error', code: 'EMAIL_ALREADY_EXISTS', message: 'Email already registered.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if user already exists as Expert
    const expertCheck = await pool.query('SELECT id FROM experts WHERE LOWER(email) = LOWER($1)', [email]);
    if (expertCheck.rows.length > 0) {
      return new Response(JSON.stringify({ status: 'error', code: 'EMAIL_ALREADY_EXISTS', message: 'Email already registered.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex');
    
    // OTP expires in 10 minutes
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Save in email_verifications table (upsert)
    await pool.query(
      `INSERT INTO email_verifications (email, otp_hash, expires_at, attempts, verified, created_at)
       VALUES ($1, $2, $3, 0, false, NOW())
       ON CONFLICT (email) 
       DO UPDATE SET otp_hash = EXCLUDED.otp_hash, expires_at = EXCLUDED.expires_at, attempts = 0, verified = false, created_at = NOW()`,
      [email.toLowerCase(), otpHash, expiresAt]
    );

    // Send Verification Email
    const htmlContent = `
      <div style="font-family: 'Sora', 'Segoe UI', Arial, sans-serif; background-color: #fafafa; padding: 40px; color: #111;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 24px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="font-size: 24px; font-weight: 800; color: #000; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Visa Formula</h1>
          </div>
          <h2 style="font-size: 20px; font-weight: 700; color: #000; margin-bottom: 20px;">Verify your Email</h2>
          <p style="font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 30px;">
            Thanks for creating your Visa Formula account. Please enter the verification code below to confirm your email address.
          </p>
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; text-align: center; margin-bottom: 30px;">
            <span style="font-family: monospace; font-size: 36px; font-weight: 800; color: #000; letter-spacing: 8px;">${otp}</span>
          </div>
          <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-bottom: 30px;">
            This code expires in 10 minutes.
          </p>
          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; font-size: 12px; color: #64748b;">
            Need help? Contact <a href="mailto:support@visaformula.com" style="color: #000; text-decoration: none; font-weight: 700;">support@visaformula.com</a>
          </div>
        </div>
      </div>
    `;

    // Fire email sending asynchronously to return HTTP response instantly
    sendEmailWithRetry({
      from: `"Visa Formula" <noreply@visaformula.com>`,
      to: email,
      subject: "Verify your Email Address",
      html: htmlContent
    }).catch(err => console.error("Async email send failed:", err));

    return new Response(JSON.stringify({ 
      status: 'success', 
      message: 'Verification code sent successfully!',
      otp: otp
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Send verification API error:', err);
    return new Response(JSON.stringify({ status: 'error', message: err.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
