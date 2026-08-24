import type { APIRoute } from 'astro';
import { getPool } from '../../../../backend/db';

export const prerender = false;

export const POST: APIRoute = async ({ cookies }) => {
  try {
    const token = cookies.get('cp_sid')?.value;
    if (token) {
      const pool = getPool();
      await pool.query('DELETE FROM partner_sessions WHERE token = $1', [token]);
    }
    const headers = new Headers();
    headers.set('Set-Cookie', 'cp_sid=; Path=/; Max-Age=0');
    headers.set('Content-Type', 'application/json');
    return new Response(JSON.stringify({ success: true }), { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({ success: false }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
