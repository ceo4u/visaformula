// src/pages/api/partner/settings/index.ts
import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../../backend/db';

export const prerender = false;

async function getPartnerId(token: string): Promise<number | null> {
  const pool = getPool();
  const res = await pool.query('SELECT partner_id FROM partner_sessions WHERE token = $1 AND expires_at > NOW()', [token]);
  return res.rows[0]?.partner_id || null;
}

export const GET: APIRoute = async ({ cookies }) => {
  try {
    await runMigrations();
    const token = cookies.get('cp_sid')?.value;
    if (!token) return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });

    const cpId = await getPartnerId(token);
    if (!cpId) return new Response(JSON.stringify({ success: false, message: 'Session expired' }), { status: 401, headers: { 'Content-Type': 'application/json' } });

    const pool = getPool();
    const [partnerRes, teamRes] = await Promise.all([
      pool.query(
        `SELECT id, company_name, email, contact_person, phone, country, tax_id, business_address, logo_url,
                invite_code, require_manual_approval, bank_name, account_number, swift_ifsc, account_holder,
                payout_frequency, notify_email_leads, notify_whatsapp_leads, notify_payouts, tier, role, status
         FROM channel_partners WHERE id = $1`,
        [cpId]
      ),
      pool.query(
        `SELECT id, name, email, role, status, created_at FROM partner_team_members WHERE partner_id = $1 ORDER BY created_at ASC`,
        [cpId]
      )
    ]);

    if (partnerRes.rows.length === 0) {
      return new Response(JSON.stringify({ success: false, message: 'Partner profile not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    const partner = partnerRes.rows[0];

    // Default invite code fallback
    if (!partner.invite_code) {
      partner.invite_code = `CP-${(partner.country || 'USA').substring(0, 3).toUpperCase()}-${String(partner.id).padStart(3, '0')}`;
    }

    return new Response(JSON.stringify({
      success: true,
      settings: partner,
      team: teamRes.rows
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (err: any) {
    console.error('[PartnerSettings GET]', err);
    return new Response(JSON.stringify({ success: false, message: 'Server error fetching settings.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
