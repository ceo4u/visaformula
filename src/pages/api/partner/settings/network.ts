// src/pages/api/partner/settings/network.ts
import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../../backend/db';
import crypto from 'crypto';

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

    const { action, invite_code, require_manual_approval } = await request.json();
    const pool = getPool();

    if (action === 'regenerate_code') {
      const countryCode = 'USA';
      const randomPart = crypto.randomBytes(3).toString('hex').toUpperCase();
      const newCode = `CP-${countryCode}-${randomPart}`;
      await pool.query('UPDATE channel_partners SET invite_code = $1 WHERE id = $2', [newCode, cpId]);
      return new Response(JSON.stringify({ success: true, message: 'New invite code generated!', invite_code: newCode }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    await pool.query(
      `UPDATE channel_partners
       SET invite_code = COALESCE($1, invite_code), require_manual_approval = $2
       WHERE id = $3`,
      [invite_code, Boolean(require_manual_approval), cpId]
    );

    return new Response(JSON.stringify({ success: true, message: 'Network policies and invite settings updated!' }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (err: any) {
    console.error('[PartnerNetwork POST]', err);
    return new Response(JSON.stringify({ success: false, message: 'Server error updating network settings.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
