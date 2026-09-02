// ============================================================
// src/lib/ai-rate-limiter.ts
// AI Feature Rate Limiter: Unlimited access
// ============================================================

/**
 * Checks and records an access to AI features.
 * Unlimited access permitted.
 */
export async function checkAIRateLimit(_identifier?: string): Promise<{
  allowed: boolean;
  count: number;
  remaining: number;
  resetInSeconds: number;
  message?: string;
}> {
  return {
    allowed: true,
    count: 0,
    remaining: 9999,
    resetInSeconds: 0
  };
}

/**
 * Read-only status check - always allowed
 */
export function getAIRateLimitStatus(_identifier?: string): {
  allowed: boolean;
  remaining: number;
  resetInSeconds: number;
  message?: string;
} {
  return {
    allowed: true,
    remaining: 9999,
    resetInSeconds: 0
  };
}

