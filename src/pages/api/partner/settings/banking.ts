// src/pages/api/partner/settings/banking.ts
import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../../backend/db';

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

    const { bank_name, account_number, swift_ifsc, account_holder, payout_frequency } = await request.json();

    const pool = getPool();
    await pool.query(
      `UPDATE channel_partners
       SET bank_name = $1, account_number = $2, swift_ifsc = $3, account_holder = $4, payout_frequency = $5
       WHERE id = $6`,
      [bank_name || '', account_number || '', swift_ifsc || '', account_holder || '', payout_frequency || 'monthly', cpId]
    );

    return new Response(JSON.stringify({ success: true, message: 'Payout & banking details updated successfully!' }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (err: any) {
    console.error('[PartnerBanking POST]', err);
    return new Response(JSON.stringify({ success: false, message: 'Server error saving banking details.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
