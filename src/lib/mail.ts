// ============================================================
// src/lib/mail.ts
// Backward-compatible wrapper — delegates to EmailService
// All new code should use src/lib/email.ts directly
// ============================================================

export { sendVerificationOTP, sendWelcomeEmail, sendPasswordReset, EmailService } from './email';

// Legacy interface kept for any existing callers
export interface MailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

/**
 * @deprecated Use EmailService from src/lib/email.ts instead.
 * This function is kept for backward compatibility only.
 */
export async function sendEmailWithRetry(options: MailOptions, _retryCount = 1): Promise<any> {
  const { getPlunkClient } = await import('./plunk');
  const client = getPlunkClient();
  const result = await client.emails.send({
    to: options.to,
    subject: options.subject,
    body: options.html,
  });
  console.log(`[mail.ts legacy] Sent to ${options.to}`);
  return result;
}
