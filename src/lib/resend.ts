// ============================================================
// src/lib/resend.ts
// Central Resend client with complete delivery audit logging & domain verification
// ============================================================

import { Resend } from 'resend';

const getApiKey = (): string => {
  return (
    process.env.RESEND_API_KEY ||
    (import.meta?.env?.RESEND_API_KEY as string | undefined)
  )?.trim() || '';
};

let _resendClient: Resend | null = null;

export function getResendClient(): Resend {
  if (_resendClient) return _resendClient;
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error(
      '[Resend] RESEND_API_KEY is not configured in environment variables. ' +
      'Add RESEND_API_KEY to your .env file and server environment variables.'
    );
  }
  _resendClient = new Resend(apiKey);
  return _resendClient;
}

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  emailType?: string;
}

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
  from = process.env.EMAIL_FROM || 'VisaFormula <noreply@visaformula.com>',
  emailType = 'transactional'
}: SendEmailOptions) => {
  const apiKey = getApiKey();
  const apiKeyExists = Boolean(apiKey);

  console.log('----------------------------------------------------');
  console.log('[RESEND AUDIT LOG] Initiating email dispatch...');
  console.log(`- RESEND_API_KEY exists?: ${apiKeyExists}`);
  console.log(`- From address: ${from}`);
  console.log(`- To address: ${Array.isArray(to) ? to.join(', ') : to}`);
  console.log(`- Email type: ${emailType}`);
  console.log(`- Subject: ${subject}`);

  // Enforce verified domain constraint (must be visaformula.com)
  const allowedDomains = ['visaformula.com'];
  const fromDomainMatch = from.match(/@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  const fromDomain = fromDomainMatch ? fromDomainMatch[1].toLowerCase() : '';

  if (!allowedDomains.includes(fromDomain)) {
    const domainError = `[RESEND AUDIT REJECTION] Sender domain "${fromDomain}" is not an allowed verified domain. Allowed: ${allowedDomains.join(', ')}`;
    console.error(domainError);
    return { success: false, error: domainError };
  }

  try {
    const resend = getResendClient();
    console.log('[RESEND AUDIT LOG] Executing resend.emails.send()...');

    const result = await resend.emails.send({
      from,
      to,
      subject,
      html,
      text,
    });

    console.log('[RESEND AUDIT LOG] FULL Resend Response:');
    console.log(JSON.stringify(result, null, 2));

    if (result.error) {
      console.error('[RESEND AUDIT ERROR] Resend API returned error:', result.error);
      return { success: false, error: result.error.message || JSON.stringify(result.error) };
    }

    return { success: true, data: result.data };
  } catch (error: any) {
    console.error('[RESEND AUDIT EXCEPTION] Failed to send email via Resend:');
    console.error('Message:', error?.message);
    console.error('Stack:', error?.stack);
    console.error('Full Error Object:', error);
    return { success: false, error: error?.message || error };
  }
};
