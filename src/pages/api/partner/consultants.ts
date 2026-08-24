import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../backend/db';

export const prerender = false;

async function getPartnerId(token: string): Promise<number | null> {
  const pool = getPool();
  const res = await pool.query('SELECT partner_id FROM partner_sessions WHERE token = $1 AND expires_at > NOW()', [token]);
  return res.rows[0]?.partner_id || null;
}

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    await runMigrations();
    const token = cookies.get('cp_sid')?.value;
    if (!token) return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    const cpId = await getPartnerId(token);
    if (!cpId) return new Response(JSON.stringify({ success: false, message: 'Session expired' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    const { consultant_name, email, phone, state_partner_id, region, speciality } = await request.json();
    if (!consultant_name || !email) return new Response(JSON.stringify({ success: false, message: 'Name and email are required.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    const pool = getPool();
    const res = await pool.query(
      `INSERT INTO referral_consultants (country_partner_id, state_partner_id, consultant_name, email, phone, region, speciality, status) VALUES ($1,$2,$3,$4,$5,$6,$7,'pending_workflow') RETURNING *`,
      [cpId, state_partner_id || null, consultant_name, email, phone || '', region || '', speciality || '']
    );
    return new Response(JSON.stringify({ success: true, consultant: res.rows[0] }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    console.error('[Consultant POST]', err);
    return new Response(JSON.stringify({ success: false, message: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
