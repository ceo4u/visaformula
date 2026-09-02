// ============================================================
// src/lib/ai-rate-limiter.ts
// AI Feature Rate Limiter: Max 3 requests per 1-hour sliding window
// ============================================================

import { getPool } from '../backend/db';

interface RateLimitRecord {
  timestamps: number[];
}

// In-memory sliding window cache for instant 0ms responses
const memoryLimits = new Map<string, RateLimitRecord>();

const HOURLY_LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 Hour (3,600,000 ms)

/**
 * Checks and records an access to AI features.
 * Enforces a strict limit of 3 accesses per 1 hour window.
 *
 * @param identifier - user email (preferred) or client IP address
 */
export async function checkAIRateLimit(identifier: string): Promise<{
  allowed: boolean;
  count: number;
  remaining: number;
  resetInSeconds: number;
  message?: string;
}> {
  if (!identifier || identifier.trim() === '') {
    return {
      allowed: false,
      count: HOURLY_LIMIT,
      remaining: 0,
      resetInSeconds: 3600,
      message: 'Hourly limit reached'
    };
  }

  const key = identifier.trim().toLowerCase();
  const now = Date.now();

  // 1. Get or initialize in-memory record
  let record = memoryLimits.get(key);
  if (!record) {
    record = { timestamps: [] };
    memoryLimits.set(key, record);
  }

  // 2. Filter out timestamps older than 1 hour
  record.timestamps = record.timestamps.filter((ts) => now - ts < WINDOW_MS);

  // 3. Check if limit reached
  if (record.timestamps.length >= HOURLY_LIMIT) {
    const oldestTimestamp = record.timestamps[0];
    const resetInSeconds = Math.max(1, Math.ceil((oldestTimestamp + WINDOW_MS - now) / 1000));
    return {
      allowed: false,
      count: record.timestamps.length,
      remaining: 0,
      resetInSeconds,
      message: 'Hourly limit reached'
    };
  }

  // 4. Record current access
  record.timestamps.push(now);
  const remaining = Math.max(0, HOURLY_LIMIT - record.timestamps.length);

  // 5. Async DB sync (non-blocking, graceful fallback)
  try {
    const pool = getPool();
    if (pool) {
      pool.query(
        `INSERT INTO ai_rate_limits (identifier, accessed_at) VALUES ($1, NOW())`,
        [key]
      ).catch(() => {});
    }
  } catch (_) {}

  return {
    allowed: true,
    count: record.timestamps.length,
    remaining,
    resetInSeconds: 3600
  };
}

/**
 * Read-only status check without consuming a request token
 */
export function getAIRateLimitStatus(identifier: string): {
  allowed: boolean;
  remaining: number;
  resetInSeconds: number;
  message?: string;
} {
  if (!identifier) {
    return { allowed: false, remaining: 0, resetInSeconds: 3600, message: 'Hourly limit reached' };
  }
  const key = identifier.trim().toLowerCase();
  const now = Date.now();
  const record = memoryLimits.get(key);
  if (!record) {
    return { allowed: true, remaining: HOURLY_LIMIT, resetInSeconds: 3600 };
  }
  const active = record.timestamps.filter((ts) => now - ts < WINDOW_MS);
  if (active.length >= HOURLY_LIMIT) {
    const resetInSeconds = Math.max(1, Math.ceil((active[0] + WINDOW_MS - now) / 1000));
    return { allowed: false, remaining: 0, resetInSeconds, message: 'Hourly limit reached' };
  }
  return { allowed: true, remaining: HOURLY_LIMIT - active.length, resetInSeconds: 3600 };
}
