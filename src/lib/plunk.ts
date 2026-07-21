// ============================================================
// src/lib/plunk.ts
// Enterprise-grade Plunk email client
// - Direct fetch (no SDK overhead)
// - AbortController timeout (8s)
// - Auto-retry with backoff (2 attempts total)
// - Detailed error logging for production debugging
// ============================================================

const PLUNK_API_URL = 'https://api.useplunk.com/v1/send';
const REQUEST_TIMEOUT_MS = 8000; // 8 seconds
const MAX_RETRIES = 2;

function getApiKey(): string {
  const key = (
    process.env.PLUNK_SECRET_KEY ||
    (import.meta?.env?.PLUNK_SECRET_KEY as string | undefined) ||
    ''
  ).trim();

  if (!key || key === 'YOUR_PLUNK_SECRET_KEY_HERE') {
    throw new Error('[Plunk] PLUNK_SECRET_KEY is not set in environment variables.');
  }
  return key;
}

export interface PlunkSendOptions {
  to: string;
  subject: string;
  body: string;
  from?: string;
  name?: string;
}

export interface PlunkSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
  statusCode?: number;
}

// Core send with timeout and retry
async function attemptSend(
  options: PlunkSendOptions,
  apiKey: string,
  attempt: number
): Promise<PlunkSendResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const payload = {
      to: options.to,
      subject: options.subject,
      body: options.body,
      ...(options.from ? { from: options.from } : {}),
      ...(options.name ? { name: options.name } : {}),
    };

    const res = await fetch(PLUNK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const text = await res.text();
    let json: any = {};
    try { json = JSON.parse(text); } catch {}

    if (res.ok) {
      console.log(`[Plunk] ✅ Email sent to ${options.to} (attempt ${attempt}), status=${res.status}`);
      return { success: true, messageId: json?.id || json?.messageId || String(res.status) };
    }

    console.error(`[Plunk] ❌ HTTP ${res.status} on attempt ${attempt} for ${options.to}: ${text}`);
    return { success: false, error: `HTTP ${res.status}: ${text}`, statusCode: res.status };

  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      console.error(`[Plunk] ⏱️ Timeout on attempt ${attempt} for ${options.to} (>${REQUEST_TIMEOUT_MS}ms)`);
      return { success: false, error: `Timeout after ${REQUEST_TIMEOUT_MS}ms` };
    }
    console.error(`[Plunk] ⚠️ Network error on attempt ${attempt} for ${options.to}:`, err?.message);
    return { success: false, error: err?.message || 'Network error' };
  }
}

/**
 * Send an email via Plunk with automatic retry.
 * Retries once after 1 second if the first attempt fails.
 */
export async function sendViaplunk(options: PlunkSendOptions): Promise<PlunkSendResult> {
  const apiKey = getApiKey();

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const result = await attemptSend(options, apiKey, attempt);

    if (result.success) return result;

    // Don't retry on 4xx client errors (bad API key, invalid email, etc.)
    if (result.statusCode && result.statusCode >= 400 && result.statusCode < 500) {
      console.error(`[Plunk] 🚫 Not retrying — client error ${result.statusCode}`);
      return result;
    }

    if (attempt < MAX_RETRIES) {
      console.log(`[Plunk] 🔄 Retrying in 1s... (attempt ${attempt + 1}/${MAX_RETRIES})`);
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  return { success: false, error: `Failed after ${MAX_RETRIES} attempts` };
}

// Legacy compatibility — keep getPlunkClient for any old references
export function getPlunkClient() {
  return { send: sendViaplunk };
}
