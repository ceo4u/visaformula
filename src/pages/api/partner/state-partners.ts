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
    const { partner_name, company_name, operating_state, email, phone } = await request.json();
    if (!partner_name || !operating_state || !email) return new Response(JSON.stringify({ success: false, message: 'Name, state and email are required.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    const pool = getPool();
    const res = await pool.query(
      `INSERT INTO state_partners (country_partner_id, partner_name, company_name, operating_state, email, phone, status) VALUES ($1,$2,$3,$4,$5,$6,'pending_hq_approval') RETURNING *`,
      [cpId, partner_name, company_name || '', operating_state, email, phone || '']
    );
    return new Response(JSON.stringify({ success: true, state_partner: res.rows[0] }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    console.error('[StatePartner POST]', err);
    return new Response(JSON.stringify({ success: false, message: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
