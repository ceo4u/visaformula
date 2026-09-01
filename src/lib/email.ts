// ============================================================
// src/lib/email.ts
// Central EmailService — all emails go through here
// Single source of truth for Resend API calls + logging
// ============================================================

import { sendEmail as sendResendEmail } from './resend';
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

const rawName = process.env.EMAIL_FROM_NAME || 'TravlTik';
const FROM_NAME = rawName.toLowerCase().includes('visa') ? 'TravlTik' : rawName;
const rawEmail = process.env.EMAIL_FROM || 'noreply@travltik.com';
const FROM_EMAIL = (!rawEmail || rawEmail.includes('travltik.com') || !rawEmail.includes('@travltik.com'))
  ? 'noreply@travltik.com'
  : rawEmail;
const FROM_FORMATTED = `${FROM_NAME} <${FROM_EMAIL}>`;
const APP_URL = (typeof import.meta !== 'undefined' && import.meta.env?.APP_URL) || process.env.APP_URL || 'https://travltik.com';

// ─── Core Send Function ────────────────────────────────────

async function sendEmail(
  options: SendEmailOptions,
  type: EmailType,
  retryCount = 1
): Promise<EmailResult> {
  try {
    const res = await sendResendEmail({
      from: options.from || FROM_FORMATTED,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    if (!res.success) {
      throw new Error(typeof res.error === 'string' ? res.error : JSON.stringify(res.error));
    }

    const messageId = (res.data as any)?.id || JSON.stringify(res.data);
    console.log(`[EmailService] ✅ Sent "${type}" to ${options.to} (ID: ${messageId})`);
    logEmail({ email: options.to, type, status: 'sent', providerId: messageId }).catch(() => {});

    return { success: true, messageId };
  } catch (error: any) {
    const errorMsg = error?.message || String(error);
    console.error(`[EmailService] ❌ Failed "${type}" to ${options.to}:`, errorMsg);
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
       VALUES ($1, $2, $3, 'resend', $4, $5, NOW())`,
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
  console.log("STEP 4 Email Function (sendVerificationOTP)", { email: data.email });
  const { generateVerificationEmailHtml } = await import('../emails/VerificationEmail');
  return sendEmail(
    {
      to: data.email,
      subject: 'Your TravlTik Verification Code',
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
      subject: 'Welcome to TravlTik 🎉',
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
      subject: 'Reset your TravlTik password',
      html: generatePasswordResetEmailHtml(data),
    },
    'password_reset'
  );
}

/**
 * Send login alert email
 */
export async function sendLoginAlert(data: LoginAlertEmailData): Promise<EmailResult> {
  const html = `
    <!DOCTYPE html>
    <html>
    <body style="background:#f8fafc;font-family:'Segoe UI',sans-serif;padding:40px 20px;">
      <div style="max-width:500px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
        <div style="background:linear-gradient(135deg,#00a896,#0284c7);padding:24px 32px;text-align:center;">
          <img src="https://travltik.com/logo.png" alt="TravlTik" style="height:48px;width:auto;display:inline-block;" />
        </div>
        <div style="padding:32px;">
          <h2 style="color:#0f172a;margin:0 0 12px;font-size:20px;">New login detected</h2>
          <p style="color:#475569;font-size:14px;line-height:1.6;margin:0 0 20px;">
            Hi ${data.firstName || 'there'}, we noticed a new login to your TravlTik account.
          </p>
          <div style="background:#f1f5f9;border-radius:8px;padding:16px;margin-bottom:20px;">
            <p style="color:#334155;font-size:13px;margin:0 0 6px;">🕐 Time: <strong style="color:#0f172a;">${data.loginTime}</strong></p>
            ${data.ipAddress ? `<p style="color:#334155;font-size:13px;margin:0 0 6px;">🌐 IP: <strong style="color:#0f172a;">${data.ipAddress}</strong></p>` : ''}
            ${data.device ? `<p style="color:#334155;font-size:13px;margin:0;">📱 Device: <strong style="color:#0f172a;">${data.device}</strong></p>` : ''}
          </div>
          <div style="background:#fef2f2;border-left:3px solid #ef4444;border-radius:8px;padding:14px 18px;">
            <p style="color:#991b1b;font-size:13px;margin:0;">Not you? <a href="${APP_URL}/reset-password" style="color:#00a896;text-decoration:none;font-weight:600;">Reset your password immediately</a>.</p>
          </div>
        </div>
        <div style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 32px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#64748b;">© ${new Date().getFullYear()} TravlTik. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  return sendEmail({ to: data.email, subject: 'New login to your TravlTik account', html }, 'login_alert');
}

/**
 * Send visa status notification
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
    <body style="background:#f8fafc;font-family:'Segoe UI',sans-serif;padding:40px 20px;">
      <div style="max-width:500px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#00a896,#0284c7);padding:24px 32px;text-align:center;">
          <img src="https://travltik.com/logo.png" alt="TravlTik" style="height:48px;width:auto;display:inline-block;" />
        </div>
        <div style="padding:32px;">
          <h2 style="color:#0f172a;margin:0 0 8px;">Visa Status Update</h2>
          <p style="color:#475569;margin:0 0 20px;font-size:14px;">Hi ${data.firstName}, here's the latest on your application.</p>
          <div style="background:#f0fdfa;border:1px solid #00a896;border-radius:12px;padding:20px;margin-bottom:20px;">
            <p style="color:#334155;font-size:13px;margin:0 0 4px;">Visa Type: <strong style="color:#0f172a;">${data.visaType}</strong></p>
            <p style="color:#334155;font-size:13px;margin:0;">Status: <strong style="color:#00a896;">${data.status}</strong></p>
          </div>
          <p style="color:#475569;font-size:14px;line-height:1.6;margin:0 0 24px;">${data.message}</p>
          <div style="text-align:center;">
            <a href="${APP_URL}/dashboard" style="display:inline-block;background:linear-gradient(135deg,#00a896,#0284c7);color:#fff;font-size:15px;font-weight:700;padding:14px 32px;border-radius:10px;text-decoration:none;">View Dashboard</a>
          </div>
        </div>
        <div style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 32px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#64748b;">© ${new Date().getFullYear()} TravlTik. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  return sendEmail({ to: data.email, subject: `Visa Application Update: ${data.visaType}`, html }, 'status_update');
}

/**
 * Send appointment reminder
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
    <body style="background:#f8fafc;font-family:'Segoe UI',sans-serif;padding:40px 20px;">
      <div style="max-width:500px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#00a896,#0284c7);padding:24px 32px;text-align:center;">
          <img src="https://travltik.com/logo.png" alt="TravlTik" style="height:48px;width:auto;display:inline-block;" />
        </div>
        <div style="padding:32px;">
          <h2 style="color:#0f172a;margin:0 0 8px;">Appointment Reminder</h2>
          <p style="color:#475569;margin:0 0 20px;font-size:14px;">Hi ${data.firstName}, your consultation is coming up!</p>
          <div style="background:#f0fdfa;border:1px solid #00a896;border-radius:12px;padding:20px;margin-bottom:24px;">
            <p style="color:#334155;font-size:13px;margin:0 0 6px;">📅 Date: <strong style="color:#0f172a;">${data.appointmentDate}</strong></p>
            <p style="color:#334155;font-size:13px;margin:0 0 6px;">⏰ Time: <strong style="color:#0f172a;">${data.appointmentTime}</strong></p>
            <p style="color:#334155;font-size:13px;margin:0;">👤 Expert: <strong style="color:#00a896;">${data.expertName}</strong></p>
          </div>
          <div style="text-align:center;">
            <a href="${APP_URL}/dashboard" style="display:inline-block;background:linear-gradient(135deg,#00a896,#0284c7);color:#fff;font-size:15px;font-weight:700;padding:14px 32px;border-radius:10px;text-decoration:none;">View Appointment</a>
          </div>
        </div>
        <div style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 32px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#64748b;">© ${new Date().getFullYear()} TravlTik. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  return sendEmail({ to: data.email, subject: `Reminder: Appointment with ${data.expertName} on ${data.appointmentDate}`, html }, 'appointment_reminder');
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
