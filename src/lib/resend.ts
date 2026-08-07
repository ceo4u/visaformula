// ============================================================
// src/lib/resend.ts
// Central Resend client — single source of truth for Resend API
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
      '[Resend] RESEND_API_KEY is not configured. ' +
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
}

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
  from = process.env.EMAIL_FROM || 'VisaFormula <noreply@visaformula.com>',
}: SendEmailOptions) => {
  try {
    const resend = getResendClient();
    const result = await resend.emails.send({
      from,
      to,
      subject,
      html,
      text,
    });

    if (result.error) {
      console.warn('[Resend] API returned warning/error:', result.error);
      return { success: false, error: result.error.message || JSON.stringify(result.error) };
    }

    console.log('[Resend] Email sent successfully with ID:', result.data?.id);
    return { success: true, data: result.data };
  } catch (error: any) {
    console.error('Failed to send email via Resend:', error);
    return { success: false, error: error?.message || error };
  }
};
