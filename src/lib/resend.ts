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
  const toArray = Array.isArray(to) ? to : [to];
  const maskedRecipients = toArray.map(addr => addr.replace(/^(.{2}).*(@.*)$/, "$1***$2")).join(', ');

  console.log(`[Email Audit] Provider: Resend`);
  console.log(`[Email Audit] From Address: ${from}`);
  console.log(`[Email Audit] Recipient: ${maskedRecipients}`);

  const allowedDomains = ['visaformula.com', 'resend.dev'];
  const fromDomainMatch = from.match(/@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  const fromDomain = fromDomainMatch ? fromDomainMatch[1].toLowerCase() : '';

  let sender = from;
  if (!allowedDomains.includes(fromDomain)) {
    sender = 'VisaFormula <onboarding@resend.dev>';
  }

  try {
    const resend = getResendClient();

    let result = await resend.emails.send({
      from: sender,
      to,
      subject,
      html,
      text,
    });

    if (result.data?.id) {
      console.log(`[Resend API Success] Message ID: ${result.data.id}`);
    }

    // Fallback: If custom domain is not verified in Resend account, retry using onboarding@resend.dev
    if (result.error && (
      JSON.stringify(result.error).toLowerCase().includes('domain') ||
      JSON.stringify(result.error).toLowerCase().includes('verified') ||
      result.error.name === 'validation_error'
    )) {
      console.warn('[Resend Fallback] Unverified domain encountered. Retrying via onboarding@resend.dev...');
      result = await resend.emails.send({
        from: 'VisaFormula <onboarding@resend.dev>',
        to,
        subject,
        html,
        text,
      });
      if (result.data?.id) {
        console.log(`[Resend API Fallback Success] Message ID: ${result.data.id}`);
      }
    }

    if (result.error) {
      console.error('[Resend API Error]', result.error);
      return { success: false, error: result.error.message || JSON.stringify(result.error) };
    }

    return { success: true, data: result.data };
  } catch (error: any) {
    console.error("STEP 6 RESEND ERROR:", error);
    if (error?.stack) console.error(error.stack);
    return { success: false, error: error?.message || error };
  }
};

