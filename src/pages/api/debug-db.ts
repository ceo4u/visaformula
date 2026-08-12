// src/pages/api/debug-db.ts
// TEMPORARY debug endpoint — remove after issue is resolved
import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  const dbUrl = (process.env.DATABASE_URL || import.meta.env.DATABASE_URL || '').trim();
  
  if (!dbUrl) {
    return new Response(JSON.stringify({
      ok: false,
      error: 'DATABASE_URL is NOT set in environment variables',
      envKeys: Object.keys(process.env).filter(k => !k.includes('SECRET') && !k.includes('KEY') && !k.includes('PASS')).slice(0, 30)
    }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const pg = await import('pg');
    const Pool = pg.default.Pool || (pg as any).Pool;
    const pool = new Pool({ connectionString: dbUrl, ssl: { rejectUnauthorized: false }, max: 1 });
    const result = await pool.query('SELECT COUNT(*) as total FROM experts');
    await pool.end();
    return new Response(JSON.stringify({
      ok: true,
      dbUrlPrefix: dbUrl.substring(0, 40) + '...',
      expertsCount: Number(result.rows[0].total)
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    return new Response(JSON.stringify({
      ok: false,
      error: err.message,
      dbUrlPresent: !!dbUrl
    }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
