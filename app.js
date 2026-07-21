// ============================================================
// app.js
// Root-level entrypoint for cPanel Phusion Passenger compatibility
// ============================================================

import('./dist/server/entry.mjs').catch(err => {
  console.error('[cPanel Startup Error]: Failed to import dist/server/entry.mjs', err);
  process.exit(1);
});
