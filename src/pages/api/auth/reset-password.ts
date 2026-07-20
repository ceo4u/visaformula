// src/pages/api/auth/reset-password.ts
import type { APIRoute } from 'astro';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { getPool, runMigrations } from '../../../backend/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { token, password } = await request.json();

    if (!token) {
      return new Response(JSON.stringify({ status: 'error', message: 'Reset token is required.' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!password || password.length < 8) {
      return new Response(JSON.stringify({ status: 'error', message: 'Password must be at least 8 characters long.' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }

    await runMigrations();
    const pool = getPool();

    // Hash incoming token to match stored hash
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Retrieve active, unused token
    const tokenRes = await pool.query(
      'SELECT id, email, expires_at, used FROM password_resets WHERE token_hash = $1',
      [tokenHash]
    );

    if (tokenRes.rows.length === 0) {
      return new Response(JSON.stringify({ status: 'error', message: 'Invalid reset token.' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }

    const { id, email, expires_at, used } = tokenRes.rows[0];

    if (used) {
      return new Response(JSON.stringify({ status: 'error', message: 'This reset token has already been used.' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }

    if (new Date() > new Date(expires_at)) {
      return new Response(JSON.stringify({ status: 'error', message: 'This reset token has expired.' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }

    // Hash new password using bcrypt (12 salt rounds)
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update in seekers or experts table
    const seekerRes = await pool.query('SELECT id FROM seekers WHERE LOWER(email) = LOWER($1)', [email]);
    if (seekerRes.rows.length > 0) {
      await pool.query('UPDATE seekers SET password_hash = $1 WHERE LOWER(email) = LOWER($2)', [hashedPassword, email]);
    } else {
      const expertRes = await pool.query('SELECT id FROM experts WHERE LOWER(email) = LOWER($1)', [email]);
      if (expertRes.rows.length > 0) {
        await pool.query('UPDATE experts SET password_hash = $1 WHERE LOWER(email) = LOWER($2)', [hashedPassword, email]);
      } else {
        return new Response(JSON.stringify({ status: 'error', message: 'User account not found.' }), {
          status: 400, headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // Mark token as used
    await pool.query('UPDATE password_resets SET used = true WHERE id = $1', [id]);

    return new Response(JSON.stringify({
      status: 'success',
      message: 'Your password has been reset successfully. Please log in with your new password.',
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (err: any) {
    console.error('[reset-password] Error:', err);
    return new Response(JSON.stringify({ status: 'error', message: 'An unexpected error occurred.' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
};
