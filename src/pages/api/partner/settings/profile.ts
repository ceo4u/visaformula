// src/pages/api/partner/settings/profile.ts
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

    const { company_name, contact_person, phone, country, tax_id, business_address, logo_url } = await request.json();

    if (!company_name) {
      return new Response(JSON.stringify({ success: false, message: 'Company name is required.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const pool = getPool();
    await pool.query(
      `UPDATE channel_partners
       SET company_name = $1, contact_person = $2, phone = $3, country = $4, tax_id = $5, business_address = $6, logo_url = $7
       WHERE id = $8`,
      [company_name, contact_person || '', phone || '', country || 'United States', tax_id || '', business_address || '', logo_url || '', cpId]
    );

    return new Response(JSON.stringify({ success: true, message: 'Organization profile updated successfully!' }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (err: any) {
    console.error('[PartnerProfile POST]', err);
    return new Response(JSON.stringify({ success: false, message: 'Server error saving profile.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
