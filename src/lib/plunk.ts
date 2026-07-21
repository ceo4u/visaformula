// ============================================================
// src/lib/plunk.ts
// Singleton Plunk client — single source of truth for all email sends
// ============================================================

import Plunk from '@plunk/node';

let _client: Plunk | null = null;

/**
 * Returns the singleton Plunk client instance.
 * Throws if PLUNK_SECRET_KEY is not configured.
 */
export function getPlunkClient(): Plunk {
  if (_client) return _client;

  const apiKey = (
    process.env.PLUNK_SECRET_KEY ||
    (import.meta?.env?.PLUNK_SECRET_KEY as string | undefined)
  )?.trim();

  if (!apiKey || apiKey === 'YOUR_PLUNK_SECRET_KEY_HERE') {
    throw new Error(
      '[Plunk] PLUNK_SECRET_KEY is not configured. ' +
      'Add it to your .env file and Vercel environment variables.'
    );
  }

  const PlunkConstructor = (Plunk as any).default || Plunk;
  _client = new PlunkConstructor(apiKey, {
    baseUrl: 'https://api.useplunk.com/v1/'
  });
  return _client;
}

// Alias for new email.ts
export async function sendViaplunk(options: { to: string; subject: string; body: string }) {
  try {
    const client = getPlunkClient();
    const result = await client.emails.send({
      to: options.to,
      subject: options.subject,
      body: options.body,
    });
    return { success: true, messageId: String(result) };
  } catch (err: any) {
    console.error('[Plunk] Send error:', err?.message || err);
    return { success: false, error: err?.message || 'Unknown error' };
  }
}
