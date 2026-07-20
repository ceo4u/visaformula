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

  const apiKey =
    process.env.PLUNK_SECRET_KEY ||
    (import.meta?.env?.PLUNK_SECRET_KEY as string | undefined);

  if (!apiKey || apiKey === 'YOUR_PLUNK_SECRET_KEY_HERE') {
    throw new Error(
      '[Plunk] PLUNK_SECRET_KEY is not configured. ' +
      'Add it to your .env file and Vercel environment variables.'
    );
  }

  _client = new Plunk(apiKey);
  return _client;
}
