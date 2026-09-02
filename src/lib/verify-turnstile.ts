// ============================================================
// src/lib/verify-turnstile.ts
// Cloudflare Turnstile Server-Side Token Verification Helper
// Compatible with Astro APIRoute (Request), Next.js / Node.js req, and direct IP
// ============================================================

import fs from 'fs';
import path from 'path';

const getSecretKey = (): string => {
  let key = (
    (import.meta?.env?.TURNSTILE_SECRET_KEY as string | undefined) ||
    process.env.TURNSTILE_SECRET_KEY ||
    ''
  )?.trim();
  if (key) return key;

  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/^TURNSTILE_SECRET_KEY\s*=\s*(.*)$/m);
      if (match) {
        key = match[1].trim().replace(/^["']|["']$/g, '');
        if (key) return key;
      }
    }
  } catch (err) {}

  return '';
};

/**
 * Verifies a Cloudflare Turnstile token on the backend.
 * @param token The turnstile token sent from the client-side widget
 * @param reqOrIp Astro Request, Node req, or client IP string
 * @returns Promise<boolean> - true if human/verified, false otherwise
 */
export async function verifyTurnstileToken(
  token: string | undefined | null,
  reqOrIp?: Request | any | string
): Promise<boolean> {
  const secretKey = getSecretKey();

  // Development bypass if secret key is intentionally omitted
  if (!secretKey) {
    if (process.env.NODE_ENV === 'development' || import.meta?.env?.DEV) {
      console.warn('⚠️ TURNSTILE_SECRET_KEY is missing. Bypassing Turnstile in development mode.');
      return true;
    }
    return false;
  }

  if (!token || typeof token !== 'string' || !token.trim()) {
    console.warn('[Turnstile] Token is missing or empty.');
    return false;
  }

  // Development pass-through for test token
  if (token === 'XXXX.DUMMY.TOKEN.XXXX') {
    if (process.env.NODE_ENV === 'development' || import.meta?.env?.DEV) {
      return true;
    }
  }

  try {
    let clientIp: string | undefined;

    if (typeof reqOrIp === 'string') {
      clientIp = reqOrIp;
    } else if (reqOrIp && typeof (reqOrIp as Request).headers?.get === 'function') {
      // Standard Fetch / Astro Request
      const r = reqOrIp as Request;
      clientIp =
        r.headers.get('cf-connecting-ip') ||
        r.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        r.headers.get('x-real-ip') ||
        undefined;
    } else if (reqOrIp?.headers) {
      // Node.js / Next.js req
      clientIp =
        ((reqOrIp.headers['cf-connecting-ip'] as string) ||
        (reqOrIp.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
        reqOrIp.socket?.remoteAddress);
    }

    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token.trim());
    if (clientIp) {
      formData.append('remoteip', clientIp);
    }

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });

    const outcome = await res.json();
    console.log('[Turnstile] Verification result:', outcome.success ? '✅ PASSED' : '❌ FAILED', outcome['error-codes'] || '');
    return outcome.success === true;
  } catch (error) {
    console.error('[Turnstile] Verification error:', error);
    return false;
  }
}
