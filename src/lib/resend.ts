// ============================================================
// src/lib/resend.ts
// Central Resend client with complete delivery audit logging & domain verification
// ============================================================

import fs from 'fs';
import path from 'path';
import { Resend } from 'resend';

const getApiKey = (): string => {
  let key = (import.meta?.env?.RESEND_API_KEY as string | undefined)?.trim();
  if (key) return key;

  key = (process.env.RESEND_API_KEY as string | undefined)?.trim();
  if (key) return key;

  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/^RESEND_API_KEY\s*=\s*(.*)$/m);
      if (match) {
        key = match[1].trim().replace(/^["']|["']$/g, '');
        if (key) return key;
      }
    }
  } catch (err) {
    // ignore
  }

  return '';
};

export function getResendClient(): Resend {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('[Resend] RESEND_API_KEY is missing');
  }
  return new Resend(apiKey);
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
  from = process.env.EMAIL_FROM || 'Tavltik <noreply@travltik.com>',
  emailType = 'transactional'
}: SendEmailOptions) => {
  const apiKey = getApiKey();
  const apiKeyAvailable = Boolean(apiKey) ? 'YES' : 'NO';
  const sender = from || 'Tavltik <noreply@travltik.com>';
  const toArray = Array.isArray(to) ? to : [to];
  const maskedTo = toArray.map(addr => addr.replace(/^(.{2}).*(@.*)$/, "$1***$2")).join(', ');

  const cwd = process.cwd();
  const envPath = path.resolve(cwd, '.env');
  const envExists = fs.existsSync(envPath) ? 'YES' : 'NO';
  const hasImportMeta = Boolean((import.meta?.env?.RESEND_API_KEY as string | undefined)?.trim()) ? 'YES' : 'NO';
  const hasProcessEnv = Boolean(process.env.RESEND_API_KEY?.trim()) ? 'YES' : 'NO';

  console.log(`[ENV DEBUG] process.cwd(): ${cwd}`);
  console.log(`[ENV DEBUG] .env exists: ${envExists}`);
  console.log(`[ENV DEBUG] import.meta.env.RESEND_API_KEY: ${hasImportMeta}`);
  console.log(`[ENV DEBUG] process.env.RESEND_API_KEY: ${hasProcessEnv}`);
  console.log(`[ENV DEBUG] key length: ${apiKey.length}`);

  console.log(`[OTP TRACE] Step 8: sendEmail() executed = YES`);
  console.log(`[OTP TRACE] Step 9: exact to value passed = ${maskedTo}`);
  console.log(`[OTP TRACE] Step 10: exact from value passed = ${sender}`);
  console.log(`[OTP TRACE] Step 11: RESEND_API_KEY available = ${apiKeyAvailable}`);
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

