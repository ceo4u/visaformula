// src/pages/api/auth/change-password.ts
import type { APIRoute } from 'astro';
import bcrypt from 'bcryptjs';
import { getPool, runMigrations } from '../../../backend/db';
import { verifySession } from '../../../backend/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    await runMigrations();
    const pool = getPool();
    const body = await request.json();
    const { email: reqEmail, currentPassword, newPassword } = body;

    let userEmail = '';
    const sessionToken = cookies.get('travltik_sid')?.value;
    if (sessionToken) {
      const session = await verifySession(sessionToken);
      if (session?.user?.email) {
        userEmail = session.user.email.toLowerCase().trim();
      }
    }

    if (!userEmail && reqEmail) {
      userEmail = String(reqEmail).toLowerCase().trim();
    }

    if (!userEmail) {
      return new Response(
        JSON.stringify({ success: false, message: 'Authentication required. Please log in.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!newPassword || newPassword.length < 8) {
      return new Response(
        JSON.stringify({ success: false, message: 'New password must be at least 8 characters long.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let userRow: any = null;
    let userTable = 'seekers';

    const seekerRes = await pool.query(
      'SELECT id, email, password_hash FROM seekers WHERE LOWER(email) = LOWER($1)',
      [userEmail]
    );

    if (seekerRes.rows.length > 0) {
      userRow = seekerRes.rows[0];
      userTable = 'seekers';
    } else {
      const expertRes = await pool.query(
        'SELECT id, email, password_hash FROM experts WHERE LOWER(email) = LOWER($1)',
        [userEmail]
      );
      if (expertRes.rows.length > 0) {
        userRow = expertRes.rows[0];
        userTable = 'experts';
      }
    }

    if (!userRow) {
      return new Response(
        JSON.stringify({ success: false, message: 'User account not found.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (userRow.password_hash && currentPassword) {
      const isMatch = await bcrypt.compare(currentPassword, userRow.password_hash);
      if (!isMatch) {
        return new Response(
          JSON.stringify({ success: false, message: 'Current password is incorrect.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    const newHash = await bcrypt.hash(newPassword, 12);
    await pool.query(
      `UPDATE ${userTable} SET password_hash = $1 WHERE id = $2`,
      [newHash, userRow.id]
    );

    return new Response(
      JSON.stringify({ success: true, message: 'Password updated successfully.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err: any) {
    console.error('[change-password] Error:', err);
    return new Response(
      JSON.stringify({ success: false, message: 'Server error while updating password.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
