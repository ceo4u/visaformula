import type { APIRoute } from 'astro';
import { getPool } from '../../../../backend/db';

export const prerender = false;

async function getPartnerId(token: string): Promise<number | null> {
  const pool = getPool();
  const res = await pool.query('SELECT partner_id FROM partner_sessions WHERE token = $1 AND expires_at > NOW()', [token]);
  return res.rows[0]?.partner_id || null;
}

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const token = cookies.get('cp_sid')?.value;
    if (!token) return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    const cpId = await getPartnerId(token);
    if (!cpId) return new Response(JSON.stringify({ success: false, message: 'Session expired' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    const { type, id, action, transfer_to_state_partner_id } = await request.json();
    if (!type || !id || !action) return new Response(JSON.stringify({ success: false, message: 'type, id and action required.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    const pool = getPool();
    if (type === 'consultant') {
      if (action === 'transfer' && transfer_to_state_partner_id) {
        await pool.query('UPDATE referral_consultants SET state_partner_id = $1 WHERE id = $2 AND country_partner_id = $3', [transfer_to_state_partner_id, id, cpId]);
        return new Response(JSON.stringify({ success: true, message: 'Consultant transferred.' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }
      const newStatus = action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : null;
      if (newStatus) {
        await pool.query('UPDATE referral_consultants SET status = $1 WHERE id = $2 AND country_partner_id = $3', [newStatus, id, cpId]);
        return new Response(JSON.stringify({ success: true, status: newStatus }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }
    }
    return new Response(JSON.stringify({ success: false, message: 'Invalid action.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    console.error('[ApprovalProcess]', err);
    return new Response(JSON.stringify({ success: false, message: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
