// src/pages/api/partner/settings/team.ts
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

    const { action = 'add', id, name, email, role = 'Manager' } = await request.json();
    const pool = getPool();

    if (action === 'delete') {
      if (!id) return new Response(JSON.stringify({ success: false, message: 'Member ID required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      await pool.query('DELETE FROM partner_team_members WHERE id = $1 AND partner_id = $2', [id, cpId]);
      return new Response(JSON.stringify({ success: true, message: 'Team member removed.' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    if (!name || !email) {
      return new Response(JSON.stringify({ success: false, message: 'Name and email are required.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const res = await pool.query(
      `INSERT INTO partner_team_members (partner_id, name, email, role, status)
       VALUES ($1, $2, $3, $4, 'Active')
       RETURNING *`,
      [cpId, name, email.trim().toLowerCase(), role]
    );

    return new Response(JSON.stringify({ success: true, message: 'Team member invited successfully!', member: res.rows[0] }), { status: 201, headers: { 'Content-Type': 'application/json' } });

  } catch (err: any) {
    console.error('[PartnerTeam POST]', err);
    return new Response(JSON.stringify({ success: false, message: 'Server error updating team.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
