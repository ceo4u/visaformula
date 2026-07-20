// ============================================================
// src/lib/rate-limit.ts
// In-memory rate limiter for all API endpoints
// ============================================================

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

export interface RateLimitConfig {
  /** Maximum number of requests allowed in the window */
  max: number;
  /** Window duration in milliseconds */
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Check and update rate limit for a given key.
 * Key format: `${action}:${ip}` or `${action}:${email}`
 */
export function checkRateLimit(key: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now >= entry.resetAt) {
    // First request or window expired — reset
    store.set(key, { count: 1, resetAt: now + config.windowMs });
    return { allowed: true, remaining: config.max - 1, resetAt: now + config.windowMs };
  }

  if (entry.count >= config.max) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { allowed: true, remaining: config.max - entry.count, resetAt: entry.resetAt };
}

// Predefined configs for each endpoint
export const RATE_LIMITS = {
  /** Send OTP: 5 requests per 5 minutes per IP */
  SEND_OTP: { max: 5, windowMs: 5 * 60 * 1000 } satisfies RateLimitConfig,
  /** Verify OTP: 10 attempts per 5 minutes per IP */
  VERIFY_OTP: { max: 10, windowMs: 5 * 60 * 1000 } satisfies RateLimitConfig,
  /** Password reset: 5 requests per 5 minutes per IP */
  PASSWORD_RESET: { max: 5, windowMs: 5 * 60 * 1000 } satisfies RateLimitConfig,
  /** OTP resend cooldown: 3 request per 60 seconds per email */
  OTP_RESEND_COOLDOWN: { max: 3, windowMs: 60 * 1000 } satisfies RateLimitConfig,
};

/**
 * Extract IP address from a Request object (Vercel-compatible).
 */
export function getIpFromRequest(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

/**
 * Build a rate limit error response.
 */
export function rateLimitErrorResponse(resetAt: number): Response {
  const retryAfterSeconds = Math.ceil((resetAt - Date.now()) / 1000);
  return new Response(
    JSON.stringify({
      status: 'error',
      code: 'RATE_LIMITED',
      message: `Too many requests. Try again in ${retryAfterSeconds} seconds.`,
      retryAfter: retryAfterSeconds,
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(retryAfterSeconds),
      },
    }
  );
}
