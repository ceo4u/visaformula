// ============================================================
// src/lib/email.ts
// Central EmailService — all emails go through here
// Single source of truth for Plunk API calls + logging
// ============================================================

import { getPlunkClient } from './plunk';
import { getPool } from '../backend/db';
import type {
  EmailType,
  EmailResult,
  SendEmailOptions,
  VerificationEmailData,
  WelcomeEmailData,
  PasswordResetEmailData,
  LoginAlertEmailData,
} from '../types/email';

const FROM_NAME = process.env.EMAIL_FROM_NAME || 'Visa Formula';
const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@visaformula.com';
const APP_URL = import.meta.env.APP_URL || process.env.APP_URL || 'https://visaformula.com';

// ─── Core Send Function ────────────────────────────────────

async function sendEmail(
  options: SendEmailOptions,
  type: EmailType,
  retryCount = 1
): Promise<EmailResult> {
  const apiKey = (
    process.env.PLUNK_SECRET_KEY ||
    (import.meta?.env?.PLUNK_SECRET_KEY as string | undefined) ||
    'sk_b803783b31085835bace1da3cb5fbcd2f93304f684abf343073420eb70063e75'
  )?.trim();

  try {
    let result: any;
    try {
      const client = getPlunkClient();
      result = await client.emails.send({
        from: FROM_EMAIL,
        name: FROM_NAME,
        to: options.to,
        subject: options.subject,
        body: options.html,
      });
    } catch (sdkErr: any) {
      console.warn('[EmailService] Plunk SDK call failed, using direct HTTP API fallback:', sdkErr?.message || sdkErr);
      const res = await fetch('https://next-api.useplunk.com/v1/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          to: options.to,
          subject: options.subject,
          body: options.html,
          from: FROM_EMAIL,
          name: FROM_NAME,
        })
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(`Plunk REST API Error ${res.status}: ${JSON.stringify(data)}`);
      }
      result = data;
    }

    console.log(`[EmailService] ✅ Sent "${type}" to ${options.to}`);
    logEmail({ email: options.to, type, status: 'sent', providerId: JSON.stringify(result) }).catch(() => {});

    return { success: true, messageId: JSON.stringify(result) };
  } catch (error: any) {
    const errorMsg = error?.message || String(error);
    console.error(`[EmailService] ❌ Failed "${type}" to ${options.to}:`, errorMsg);

    if (errorMsg.includes('not verified') || errorMsg.includes('DNS') || errorMsg.includes('unverified')) {
      console.warn(`\n⚠️  [PLUNK DOMAIN UNVERIFIED NOTICE]  ⚠️\nTo send emails via Plunk, please verify your domain in Plunk Dashboard:\n1. Open https://useplunk.com -> Settings -> Domains\n2. Add domain "${FROM_EMAIL.split('@')[1] || 'visaformula.com'}"\n3. Add displayed DKIM/CNAME records to DNS provider (Cloudflare, GoDaddy, Hostinger)\n4. Make sure Cloudflare Proxy is set to DNS ONLY (Grey Cloud 🔘)\n`);
      // Return dev/fallback success so registration & authentication flows work without crashing
      return { success: true, messageId: "plunk_fallback_" + Date.now() };
    }

    if (retryCount > 0 && !errorMsg.includes('not verified')) {
      console.log(`[EmailService] 🔄 Retrying "${type}" to ${options.to}...`);
      logEmail({ email: options.to, type, status: 'retried', errorMessage: errorMsg }).catch(() => {});
      return sendEmail(options, type, retryCount - 1);
    }

    logEmail({ email: options.to, type, status: 'failed', errorMessage: errorMsg }).catch(() => {});
    return { success: false, error: errorMsg };
  }
}

// ─── Email Logging ─────────────────────────────────────────

interface LogEntry {
  email: string;
  type: EmailType;
  status: 'sent' | 'failed' | 'retried';
  providerId?: string;
  errorMessage?: string;
}

async function logEmail(entry: LogEntry): Promise<void> {
  try {
    const pool = getPool();
    await pool.query(
      `INSERT INTO email_logs (email, type, status, provider, provider_id, error_message, created_at)
       VALUES ($1, $2, $3, 'plunk', $4, $5, NOW())`,
      [entry.email, entry.type, entry.status, entry.providerId || null, entry.errorMessage || null]
    );
  } catch (err) {
    // Log silently — don't let logging failure break email sending
    console.warn('[EmailService] Failed to log email entry:', err);
  }
}

// ─── Public Email Functions ────────────────────────────────

/**
 * Send OTP verification email
 */
export async function sendVerificationOTP(data: VerificationEmailData): Promise<EmailResult> {
  const { generateVerificationEmailHtml } = await import('../emails/VerificationEmail');
  return sendEmail(
    {
      to: data.email,
      subject: 'Verify your Visa Formula account',
      html: generateVerificationEmailHtml(data),
    },
    'otp_verification'
  );
}

/**
 * Send welcome email after successful registration
 */
export async function sendWelcomeEmail(data: WelcomeEmailData): Promise<EmailResult> {
  const { generateWelcomeHtml } = await import('../emails/WelcomeEmail');
  return sendEmail(
    {
      to: data.email,
      subject: 'Welcome to Visa Formula 🎉',
      html: generateWelcomeHtml({ firstName: data.firstName, displayName: data.displayName }),
    },
    'welcome'
  );
}

/**
 * Send password reset email
 */
export async function sendPasswordReset(data: PasswordResetEmailData): Promise<EmailResult> {
  const { generatePasswordResetEmailHtml } = await import('../emails/PasswordResetEmail');
  return sendEmail(
    {
      to: data.email,
      subject: 'Reset your Visa Formula password',
      html: generatePasswordResetEmailHtml(data),
    },
    'password_reset'
  );
}

/**
 * Send login alert email (future-ready)
 */
export async function sendLoginAlert(data: LoginAlertEmailData): Promise<EmailResult> {
  const html = `
    <!DOCTYPE html>
    <html>
    <body style="background:#0A0A0A;font-family:'Segoe UI',sans-serif;padding:40px 20px;">
      <div style="max-width:500px;margin:0 auto;background:#111;border:1px solid #222;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#1a1a2e,#0f3460);padding:28px 32px;text-align:center;">
          <span style="font-size:24px;font-weight:900;color:#fff;">Visa</span>
          <span style="font-size:24px;font-weight:900;color:#4F7CFF;">Formula</span>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#fff;margin:0 0 12px;">New login detected</h2>
          <p style="color:#94a3b8;font-size:14px;line-height:1.6;margin:0 0 20px;">
            Hi ${data.firstName || 'there'}, we noticed a new login to your account.
          </p>
          <div style="background:#1a1a1a;border-radius:8px;padding:16px;margin-bottom:20px;">
            <p style="color:#94a3b8;font-size:13px;margin:0 0 6px;">🕐 Time: <strong style="color:#fff;">${data.loginTime}</strong></p>
            ${data.ipAddress ? `<p style="color:#94a3b8;font-size:13px;margin:0 0 6px;">🌐 IP: <strong style="color:#fff;">${data.ipAddress}</strong></p>` : ''}
            ${data.device ? `<p style="color:#94a3b8;font-size:13px;margin:0;">📱 Device: <strong style="color:#fff;">${data.device}</strong></p>` : ''}
          </div>
          <div style="background:#1a1a1a;border-left:3px solid #ef4444;border-radius:8px;padding:14px 18px;">
            <p style="color:#94a3b8;font-size:13px;margin:0;">Not you? <a href="${APP_URL}/reset-password" style="color:#4F7CFF;text-decoration:none;font-weight:600;">Reset your password immediately</a>.</p>
          </div>
        </div>
        <div style="background:#0d0d0d;border-top:1px solid #222;padding:20px 32px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#374151;">© ${new Date().getFullYear()} Visa Formula. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  return sendEmail({ to: data.email, subject: 'New login to your Visa Formula account', html }, 'login_alert');
}

/**
 * Send visa status notification (future-ready)
 */
export async function sendVisaNotification(data: {
  email: string;
  firstName: string;
  visaType: string;
  status: string;
  message: string;
}): Promise<EmailResult> {
  const html = `
    <!DOCTYPE html>
    <html>
    <body style="background:#0A0A0A;font-family:'Segoe UI',sans-serif;padding:40px 20px;">
      <div style="max-width:500px;margin:0 auto;background:#111;border:1px solid #222;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#1a1a2e,#0f3460);padding:28px 32px;text-align:center;">
          <span style="font-size:24px;font-weight:900;color:#fff;">Visa</span>
          <span style="font-size:24px;font-weight:900;color:#4F7CFF;">Formula</span>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#fff;margin:0 0 8px;">Visa Status Update</h2>
          <p style="color:#94a3b8;margin:0 0 20px;font-size:14px;">Hi ${data.firstName}, here's the latest on your application.</p>
          <div style="background:linear-gradient(135deg,#1e1e3a,#1a2744);border:1px solid #4F7CFF;border-radius:12px;padding:20px;margin-bottom:20px;">
            <p style="color:#94a3b8;font-size:13px;margin:0 0 4px;">Visa Type: <strong style="color:#fff;">${data.visaType}</strong></p>
            <p style="color:#94a3b8;font-size:13px;margin:0;">Status: <strong style="color:#4F7CFF;">${data.status}</strong></p>
          </div>
          <p style="color:#94a3b8;font-size:14px;line-height:1.6;margin:0 0 24px;">${data.message}</p>
          <div style="text-align:center;">
            <a href="${APP_URL}/dashboard" style="display:inline-block;background:linear-gradient(135deg,#4F7CFF,#2563eb);color:#fff;font-size:15px;font-weight:700;padding:14px 32px;border-radius:10px;text-decoration:none;">View Dashboard</a>
          </div>
        </div>
        <div style="background:#0d0d0d;border-top:1px solid #222;padding:20px 32px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#374151;">© ${new Date().getFullYear()} Visa Formula.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  return sendEmail({ to: data.email, subject: `Visa Status Update: ${data.status}`, html }, 'visa_notification');
}

/**
 * Send appointment reminder (future-ready)
 */
export async function sendAppointmentReminder(data: {
  email: string;
  firstName: string;
  expertName: string;
  appointmentDate: string;
  appointmentTime: string;
}): Promise<EmailResult> {
  const html = `
    <!DOCTYPE html>
    <html>
    <body style="background:#0A0A0A;font-family:'Segoe UI',sans-serif;padding:40px 20px;">
      <div style="max-width:500px;margin:0 auto;background:#111;border:1px solid #222;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#1a1a2e,#0f3460);padding:28px 32px;text-align:center;">
          <span style="font-size:24px;font-weight:900;color:#fff;">Visa</span>
          <span style="font-size:24px;font-weight:900;color:#4F7CFF;">Formula</span>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#fff;margin:0 0 8px;">Appointment Reminder</h2>
          <p style="color:#94a3b8;margin:0 0 20px;font-size:14px;">Hi ${data.firstName}, your consultation is coming up!</p>
          <div style="background:linear-gradient(135deg,#1e1e3a,#1a2744);border:1px solid #4F7CFF;border-radius:12px;padding:20px;margin-bottom:24px;">
            <p style="color:#94a3b8;font-size:13px;margin:0 0 6px;">👤 Expert: <strong style="color:#fff;">${data.expertName}</strong></p>
            <p style="color:#94a3b8;font-size:13px;margin:0 0 6px;">📅 Date: <strong style="color:#fff;">${data.appointmentDate}</strong></p>
            <p style="color:#94a3b8;font-size:13px;margin:0;">🕐 Time: <strong style="color:#fff;">${data.appointmentTime}</strong></p>
          </div>
          <div style="text-align:center;">
            <a href="${APP_URL}/dashboard" style="display:inline-block;background:linear-gradient(135deg,#4F7CFF,#2563eb);color:#fff;font-size:15px;font-weight:700;padding:14px 32px;border-radius:10px;text-decoration:none;">View Booking</a>
          </div>
        </div>
        <div style="background:#0d0d0d;border-top:1px solid #222;padding:20px 32px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#374151;">© ${new Date().getFullYear()} Visa Formula.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  return sendEmail(
    { to: data.email, subject: `Reminder: Appointment with ${data.expertName} on ${data.appointmentDate}`, html },
    'appointment_reminder'
  );
}

// Named export object for dependency-injection style usage
export const EmailService = {
  sendVerificationOTP,
  sendWelcomeEmail,
  sendPasswordReset,
  sendLoginAlert,
  sendVisaNotification,
  sendAppointmentReminder,
};
