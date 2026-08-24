import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../backend/db';

export const prerender = false;

async function verifyPartnerSession(token: string) {
  const pool = getPool();
  const res = await pool.query(
    `SELECT ps.partner_id, cp.company_name, cp.email, cp.role, cp.tier, cp.country, cp.contact_person
     FROM partner_sessions ps
     JOIN channel_partners cp ON cp.id = ps.partner_id
     WHERE ps.token = $1 AND ps.expires_at > NOW()`,
    [token]
  );
  return res.rows[0] || null;
}

export const GET: APIRoute = async ({ cookies }) => {
  try {
    await runMigrations();
    const token = cookies.get('cp_sid')?.value;
    if (!token) return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });

    const session = await verifyPartnerSession(token);
    if (!session) return new Response(JSON.stringify({ success: false, message: 'Session expired' }), { status: 401, headers: { 'Content-Type': 'application/json' } });

    const pool = getPool();
    const cpId = session.partner_id;

    const [spRes, rcRes, spTotal, rcApproved, rcPending] = await Promise.all([
      pool.query('SELECT id, partner_name, company_name, operating_state, email, phone, status, created_at FROM state_partners WHERE country_partner_id = $1 ORDER BY created_at DESC', [cpId]),
      pool.query('SELECT id, consultant_name, email, phone, region, speciality, status, revenue, commission, leads_count, state_partner_id, created_at FROM referral_consultants WHERE country_partner_id = $1 ORDER BY created_at DESC', [cpId]),
      pool.query('SELECT COUNT(*) FROM state_partners WHERE country_partner_id = $1', [cpId]),
      pool.query('SELECT COUNT(*) FROM referral_consultants WHERE country_partner_id = $1 AND status = $2', [cpId, 'approved']),
      pool.query('SELECT COUNT(*) FROM referral_consultants WHERE country_partner_id = $1 AND status = $2', [cpId, 'pending_workflow']),
    ]);

    const totalRevenue = rcRes.rows.reduce((s: number, r: any) => s + parseFloat(r.revenue || '0'), 0);
    const myCommission = rcRes.rows.reduce((s: number, r: any) => s + parseFloat(r.commission || '0'), 0);
    const totalLeads = rcRes.rows.reduce((s: number, r: any) => s + parseInt(r.leads_count || '0', 10), 0);

    const spMap: Record<number, string> = {};
    spRes.rows.forEach((sp: any) => { spMap[sp.id] = sp.partner_name; });
    const consultants = rcRes.rows.map((rc: any) => ({ ...rc, state_partner_name: rc.state_partner_id ? (spMap[rc.state_partner_id] || 'Unassigned') : 'Unassigned' }));

    return new Response(JSON.stringify({
      success: true,
      partner: { company_name: session.company_name, email: session.email, role: session.role, tier: session.tier, country: session.country, contact_person: session.contact_person },
      metrics: {
        total_revenue: totalRevenue,
        my_commission: myCommission,
        total_leads: totalLeads,
        state_partners_count: parseInt(spTotal.rows[0].count, 10),
        approved_consultants: parseInt(rcApproved.rows[0].count, 10),
        pending_consultants: parseInt(rcPending.rows[0].count, 10),
        conversion_rate: totalLeads > 0 ? parseFloat(((parseInt(rcApproved.rows[0].count, 10) / totalLeads) * 100).toFixed(1)) : 0,
      },
      state_partners: spRes.rows,
      consultants,
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    console.error('[PartnerMetrics]', err);
    return new Response(JSON.stringify({ success: false, message: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
