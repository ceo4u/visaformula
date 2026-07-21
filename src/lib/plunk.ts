// ============================================================
// src/lib/plunk.ts
// Kept for backward compatibility only — email sending is now
// handled directly in email.ts via fetch (no SDK needed)
// ============================================================

export function getPlunkClient() {
  // No-op — email.ts now uses direct fetch
  return null;
}
