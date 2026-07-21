// ============================================================
// src/lib/email.ts
// Enterprise Email Service — all emails go through here
// Uses direct Plunk HTTP (no SDK), with timeout + retry
// ============================================================

import { sendViaplunk } from './plunk';
import type {
  EmailType,
  EmailResult,
  VerificationEmailData,
  WelcomeEmailData,
  PasswordResetEmailData,
  LoginAlertEmailData,
} from '../types/email';

const FROM_NAME  = process.env.EMAIL_FROM_NAME || 'Visa Formula';
const FROM_EMAIL = process.env.EMAIL_FROM      || 'noreply@visaformula.com';
const APP_URL    = process.env.APP_URL || 'https://visaformula.com';

// ─── Core Send Function ────────────────────────────────────

async function sendEmail(
  to: string,
  subject: string,
  html: string,
  type: EmailType
): Promise<EmailResult> {
  const result = await sendViaplunk({
    to,
    subject,
    body: html,
    from: FROM_EMAIL,
    name: FROM_NAME,
  });

  // Non-blocking DB log — never blocks the email send path
  logEmail({ email: to, type, status: result.success ? 'sent' : 'failed', errorMessage: result.error }).catch(() => {});

  if (result.success) {
    return { success: true, messageId: result.messageId };
  }
  return { success: false, error: result.error || 'Unknown email error' };
}

// ─── Non-blocking DB Logging ───────────────────────────────

interface LogEntry {
  email: string;
  type: EmailType;
  status: 'sent' | 'failed' | 'retried';
  errorMessage?: string;
}

async function logEmail(entry: LogEntry): Promise<void> {
  try {
    const { getPool } = await import('../backend/db');
    const pool = getPool();
    await pool.query(
      `INSERT INTO email_logs (email, type, status, provider, error_message, created_at)
       VALUES ($1, $2, $3, 'plunk', $4, NOW())`,
      [entry.email, entry.type, entry.status, entry.errorMessage || null]
    );
  } catch {
    // Silently ignore — never let logging break email delivery
  }
}

// ─── Public Email Functions ────────────────────────────────

/**
 * Send OTP verification email
 */
export async function sendVerificationOTP(data: VerificationEmailData): Promise<EmailResult> {
  const { generateVerificationEmailHtml } = await import('../emails/VerificationEmail');
  return sendEmail(
    data.email,
    'Your Visa Formula Verification Code',
    generateVerificationEmailHtml(data),
    'otp_verification'
  );
}

/**
 * Send welcome email after successful registration
 */
export async function sendWelcomeEmail(data: WelcomeEmailData): Promise<EmailResult> {
  const { generateWelcomeHtml } = await import('../emails/WelcomeEmail');
  return sendEmail(
    data.email,
    'Welcome to Visa Formula 🎉',
    generateWelcomeHtml({ firstName: data.firstName, displayName: data.displayName }),
    'welcome'
  );
}

/**
 * Send password reset OTP email
 */
export async function sendPasswordReset(data: PasswordResetEmailData): Promise<EmailResult> {
  const { generatePasswordResetEmailHtml } = await import('../emails/PasswordResetEmail');
  return sendEmail(
    data.email,
    'Reset your Visa Formula password',
    generatePasswordResetEmailHtml(data),
    'password_reset'
  );
}

/**
 * Send login alert email
 */
export async function sendLoginAlert(data: LoginAlertEmailData): Promise<EmailResult> {
  const html = `<!DOCTYPE html>
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
</html>`;
  return sendEmail(data.email, 'New login to your Visa Formula account', html, 'login_alert');
}

/**
 * Send visa status notification
 */
export async function sendVisaNotification(data: {
  email: string; firstName: string; visaType: string; status: string; message: string;
}): Promise<EmailResult> {
  const html = `<!DOCTYPE html><html><body style="background:#0A0A0A;font-family:'Segoe UI',sans-serif;padding:40px 20px;">
  <div style="max-width:500px;margin:0 auto;background:#111;border:1px solid #222;border-radius:16px;overflow:hidden;">
    <div style="padding:32px;"><h2 style="color:#fff;margin:0 0 8px;">Visa Status Update</h2>
      <p style="color:#94a3b8;margin:0 0 20px;font-size:14px;">Hi ${data.firstName}, here's the latest on your application.</p>
      <div style="background:linear-gradient(135deg,#1e1e3a,#1a2744);border:1px solid #4F7CFF;border-radius:12px;padding:20px;margin-bottom:20px;">
        <p style="color:#94a3b8;font-size:13px;margin:0 0 4px;">Visa Type: <strong style="color:#fff;">${data.visaType}</strong></p>
        <p style="color:#94a3b8;font-size:13px;margin:0;">Status: <strong style="color:#4F7CFF;">${data.status}</strong></p>
      </div>
      <p style="color:#94a3b8;font-size:14px;line-height:1.6;margin:0;">${data.message}</p>
    </div>
  </div></body></html>`;
  return sendEmail(data.email, `Visa Status Update: ${data.status}`, html, 'visa_notification');
}

/**
 * Send appointment reminder
 */
export async function sendAppointmentReminder(data: {
  email: string; firstName: string; expertName: string; appointmentDate: string; appointmentTime: string;
}): Promise<EmailResult> {
  const html = `<!DOCTYPE html><html><body style="background:#0A0A0A;font-family:'Segoe UI',sans-serif;padding:40px 20px;">
  <div style="max-width:500px;margin:0 auto;background:#111;border:1px solid #222;border-radius:16px;overflow:hidden;">
    <div style="padding:32px;"><h2 style="color:#fff;margin:0 0 8px;">Appointment Reminder</h2>
      <p style="color:#94a3b8;margin:0 0 20px;font-size:14px;">Hi ${data.firstName}, your consultation is coming up!</p>
      <div style="background:linear-gradient(135deg,#1e1e3a,#1a2744);border:1px solid #4F7CFF;border-radius:12px;padding:20px;">
        <p style="color:#94a3b8;font-size:13px;margin:0 0 6px;">👤 Expert: <strong style="color:#fff;">${data.expertName}</strong></p>
        <p style="color:#94a3b8;font-size:13px;margin:0 0 6px;">📅 Date: <strong style="color:#fff;">${data.appointmentDate}</strong></p>
        <p style="color:#94a3b8;font-size:13px;margin:0;">🕐 Time: <strong style="color:#fff;">${data.appointmentTime}</strong></p>
      </div>
    </div>
  </div></body></html>`;
  return sendEmail(data.email, `Reminder: Appointment with ${data.expertName} on ${data.appointmentDate}`, html, 'appointment_reminder');
}

// Named export for compatibility
export const EmailService = {
  sendVerificationOTP,
  sendWelcomeEmail,
  sendPasswordReset,
  sendLoginAlert,
  sendVisaNotification,
  sendAppointmentReminder,
};
