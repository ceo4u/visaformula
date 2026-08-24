// src/pages/api/partner/settings/security.ts
import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../../backend/db';
import bcrypt from 'bcryptjs';

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

    const body = await request.json();
    const { action = 'preferences' } = body;
    const pool = getPool();

    if (action === 'change_password') {
      const { current_password, new_password } = body;
      if (!current_password || !new_password || new_password.length < 8) {
        return new Response(JSON.stringify({ success: false, message: 'New password must be at least 8 characters long.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }

      const pRes = await pool.query('SELECT password_hash FROM channel_partners WHERE id = $1', [cpId]);
      if (pRes.rows.length === 0) {
        return new Response(JSON.stringify({ success: false, message: 'User not found.' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
      }

      const match = await bcrypt.compare(current_password, pRes.rows[0].password_hash);
      if (!match) {
        return new Response(JSON.stringify({ success: false, message: 'Current password is incorrect.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }

      const salt = await bcrypt.genSalt(10);
      const newHash = await bcrypt.hash(new_password, salt);
      await pool.query('UPDATE channel_partners SET password_hash = $1 WHERE id = $2', [newHash, cpId]);

      return new Response(JSON.stringify({ success: true, message: 'Password updated successfully!' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // Otherwise update notification alerts
    const { notify_email_leads, notify_whatsapp_leads, notify_payouts } = body;
    await pool.query(
      `UPDATE channel_partners
       SET notify_email_leads = $1, notify_whatsapp_leads = $2, notify_payouts = $3
       WHERE id = $4`,
      [Boolean(notify_email_leads), Boolean(notify_whatsapp_leads), Boolean(notify_payouts), cpId]
    );

    return new Response(JSON.stringify({ success: true, message: 'Security & alert preferences saved!' }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (err: any) {
    console.error('[PartnerSecurity POST]', err);
    return new Response(JSON.stringify({ success: false, message: 'Server error saving security settings.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
