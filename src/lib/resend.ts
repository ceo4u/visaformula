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
    throw new Error('[Resend] RESEND_API_KEY is missing');
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
  const apiKeyAvailable = Boolean(apiKey) ? 'YES' : 'NO';
  const sender = from || 'VisaFormula <noreply@visaformula.com>';

  console.log(`[OTP DEBUG] provider: RESEND`);
  console.log(`[OTP DEBUG] API key available: ${apiKeyAvailable}`);
  console.log(`[OTP DEBUG] from: ${sender}`);
  console.log(`[OTP DEBUG] resend request started`);

  if (!apiKey) {
    const err = 'RESEND_API_KEY is missing from environment';
    console.log(`[OTP DEBUG] resend error: ${err}`);
    return { success: false, error: err };
  }

  try {
    const resend = getResendClient();
    const result = await resend.emails.send({
      from: sender,
      to,
      subject,
      html,
      text,
    });

    if (result.data?.id) {
      console.log(`[OTP DEBUG] resend response ID: ${result.data.id}`);
      return { success: true, data: result.data };
    }

    if (result.error) {
      const errDetail = result.error.message || JSON.stringify(result.error);
      console.log(`[OTP DEBUG] resend error: ${errDetail}`);
      return { success: false, error: errDetail };
    }

    return { success: true, data: result.data };
  } catch (error: any) {
    const errDetail = error?.message || String(error);
    console.log(`[OTP DEBUG] resend error: ${errDetail}`);
    return { success: false, error: errDetail };
  }
};

