// ============================================================
// src/lib/email.ts
// Sends all emails via direct HTTP fetch to Plunk API
// No SDK — works reliably on Vercel serverless
// ============================================================

import type {
  EmailType,
  EmailResult,
  VerificationEmailData,
  WelcomeEmailData,
  PasswordResetEmailData,
  LoginAlertEmailData,
} from '../types/email';

const APP_URL = process.env.APP_URL || 'https://visaformula.com';

// ─── Core Send ─────────────────────────────────────────────

async function sendEmail(
  to: string,
  subject: string,
  html: string,
  type: EmailType
): Promise<EmailResult> {
  const apiKey = (process.env.PLUNK_SECRET_KEY || '').trim();

  if (!apiKey) {
    console.error('[Email] PLUNK_SECRET_KEY missing');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const res = await fetch('https://api.useplunk.com/v1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ to, subject, body: html }),
    });

    const text = await res.text();

    if (res.ok) {
      console.log(`[Email] ✅ Sent ${type} to ${to}`);
      return { success: true };
    }

    // Retry once on server errors
    if (res.status >= 500) {
      console.warn(`[Email] Retrying ${type} to ${to} (${res.status})...`);
      await new Promise(r => setTimeout(r, 1000));
      const res2 = await fetch('https://api.useplunk.com/v1/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ to, subject, body: html }),
      });
      if (res2.ok) {
        console.log(`[Email] ✅ Sent ${type} to ${to} on retry`);
        return { success: true };
      }
      const text2 = await res2.text();
      console.error(`[Email] ❌ ${type} to ${to} failed retry: ${res2.status} ${text2}`);
      return { success: false, error: `HTTP ${res2.status}` };
    }

    console.error(`[Email] ❌ ${type} to ${to} failed: ${res.status} ${text}`);
    return { success: false, error: `HTTP ${res.status}: ${text}` };

  } catch (err: any) {
    console.error(`[Email] ❌ ${type} to ${to} exception:`, err?.message);
    return { success: false, error: err?.message || 'Network error' };
  }
}

// ─── Public Functions ───────────────────────────────────────

export async function sendVerificationOTP(data: VerificationEmailData): Promise<EmailResult> {
  const { generateVerificationEmailHtml } = await import('../emails/VerificationEmail');
  return sendEmail(
    data.email,
    'Your Visa Formula Verification Code',
    generateVerificationEmailHtml(data),
    'otp_verification'
  );
}

export async function sendWelcomeEmail(data: WelcomeEmailData): Promise<EmailResult> {
  const { generateWelcomeHtml } = await import('../emails/WelcomeEmail');
  return sendEmail(
    data.email,
    'Welcome to Visa Formula 🎉',
    generateWelcomeHtml({ firstName: data.firstName, displayName: data.displayName }),
    'welcome'
  );
}

export async function sendPasswordReset(data: PasswordResetEmailData): Promise<EmailResult> {
  const { generatePasswordResetEmailHtml } = await import('../emails/PasswordResetEmail');
  return sendEmail(
    data.email,
    'Reset your Visa Formula password',
    generatePasswordResetEmailHtml(data),
    'password_reset'
  );
}

export async function sendLoginAlert(data: LoginAlertEmailData): Promise<EmailResult> {
  const html = `<!DOCTYPE html><html><body style="background:#0A0A0A;font-family:'Segoe UI',sans-serif;padding:40px 20px;"><div style="max-width:500px;margin:0 auto;background:#111;border:1px solid #222;border-radius:16px;overflow:hidden;"><div style="background:linear-gradient(135deg,#1a1a2e,#0f3460);padding:28px 32px;text-align:center;"><span style="font-size:24px;font-weight:900;color:#fff;">Visa</span><span style="font-size:24px;font-weight:900;color:#4F7CFF;">Formula</span></div><div style="padding:32px;"><h2 style="color:#fff;margin:0 0 12px;">New login detected</h2><p style="color:#94a3b8;font-size:14px;">Hi ${data.firstName || 'there'}, we noticed a new login to your account.</p><div style="background:#1a1a1a;border-radius:8px;padding:16px;margin:16px 0;"><p style="color:#94a3b8;font-size:13px;margin:0 0 6px;">🕐 Time: <strong style="color:#fff;">${data.loginTime}</strong></p>${data.ipAddress ? `<p style="color:#94a3b8;font-size:13px;margin:0;">🌐 IP: <strong style="color:#fff;">${data.ipAddress}</strong></p>` : ''}</div></div><div style="background:#0d0d0d;border-top:1px solid #222;padding:20px 32px;text-align:center;"><p style="margin:0;font-size:12px;color:#374151;">© ${new Date().getFullYear()} Visa Formula.</p></div></div></body></html>`;
  return sendEmail(data.email, 'New login to your Visa Formula account', html, 'login_alert');
}

export async function sendVisaNotification(data: { email: string; firstName: string; visaType: string; status: string; message: string; }): Promise<EmailResult> {
  const html = `<!DOCTYPE html><html><body style="background:#0A0A0A;padding:40px 20px;"><div style="max-width:500px;margin:0 auto;background:#111;border-radius:16px;padding:32px;"><h2 style="color:#fff;">Visa Status: ${data.status}</h2><p style="color:#94a3b8;">${data.message}</p></div></body></html>`;
  return sendEmail(data.email, `Visa Status Update: ${data.status}`, html, 'visa_notification');
}

export async function sendAppointmentReminder(data: { email: string; firstName: string; expertName: string; appointmentDate: string; appointmentTime: string; }): Promise<EmailResult> {
  const html = `<!DOCTYPE html><html><body style="background:#0A0A0A;padding:40px 20px;"><div style="max-width:500px;margin:0 auto;background:#111;border-radius:16px;padding:32px;"><h2 style="color:#fff;">Appointment Reminder</h2><p style="color:#94a3b8;">Hi ${data.firstName}, your appointment with ${data.expertName} is on ${data.appointmentDate} at ${data.appointmentTime}.</p></div></body></html>`;
  return sendEmail(data.email, `Reminder: Appointment with ${data.expertName}`, html, 'appointment_reminder');
}

export const EmailService = {
  sendVerificationOTP,
  sendWelcomeEmail,
  sendPasswordReset,
  sendLoginAlert,
  sendVisaNotification,
  sendAppointmentReminder,
};
