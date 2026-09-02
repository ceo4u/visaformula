import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../backend/db';
import bcrypt from 'bcryptjs';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    await runMigrations();
    const pool = getPool();
    const body = await request.json();
    const { action, email, password, currentPassword, newPassword, accountPassword } = body;

    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail) {
      return new Response(
        JSON.stringify({ success: false, message: 'User email is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 1. GET STATUS: Check if user has a vault password configured
    if (action === 'get_status') {
      const res = await pool.query(
        'SELECT vault_password_hash FROM seekers WHERE LOWER(email) = $1',
        [cleanEmail]
      );
      if (res.rows.length === 0) {
        return new Response(
          JSON.stringify({ success: true, hasPassword: false }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
      const hasPassword = Boolean(res.rows[0].vault_password_hash && res.rows[0].vault_password_hash.trim() !== '');
      return new Response(
        JSON.stringify({ success: true, hasPassword }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. SET PASSWORD: Create master vault password for the first time
    if (action === 'set') {
      if (!password || String(password).trim().length < 4) {
        return new Response(
          JSON.stringify({ success: false, message: 'Vault password must be at least 4 characters.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const hash = await bcrypt.hash(String(password).trim(), 10);
      const res = await pool.query(
        'UPDATE seekers SET vault_password_hash = $1 WHERE LOWER(email) = $2 RETURNING id',
        [hash, cleanEmail]
      );

      if (res.rows.length === 0) {
        // If seeker record doesn't exist yet, insert a placeholder record
        await pool.query(
          `INSERT INTO seekers (email, password_hash, vault_password_hash) 
           VALUES ($1, $2, $3) 
           ON CONFLICT (email) DO UPDATE SET vault_password_hash = EXCLUDED.vault_password_hash`,
          [cleanEmail, hash, hash]
        );
      }

      return new Response(
        JSON.stringify({ success: true, message: 'Vault secret password created successfully.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 3. VERIFY PASSWORD: Unlock the document vault
    if (action === 'verify') {
      if (!password) {
        return new Response(
          JSON.stringify({ success: false, message: 'Password is required.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const res = await pool.query(
        'SELECT vault_password_hash FROM seekers WHERE LOWER(email) = $1',
        [cleanEmail]
      );

      if (res.rows.length === 0 || !res.rows[0].vault_password_hash) {
        return new Response(
          JSON.stringify({ success: false, message: 'No vault password set yet. Please set up your password.' }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const isMatch = await bcrypt.compare(String(password).trim(), res.rows[0].vault_password_hash);
      if (!isMatch) {
        return new Response(
          JSON.stringify({ success: false, message: 'Incorrect vault password. Please try again.' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, verified: true, message: 'Vault unlocked successfully.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 4. CHANGE PASSWORD: Change existing vault password
    if (action === 'change') {
      if (!currentPassword || !newPassword || String(newPassword).trim().length < 4) {
        return new Response(
          JSON.stringify({ success: false, message: 'Current password and new password (min 4 characters) are required.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const res = await pool.query(
        'SELECT vault_password_hash FROM seekers WHERE LOWER(email) = $1',
        [cleanEmail]
      );

      if (res.rows.length === 0 || !res.rows[0].vault_password_hash) {
        return new Response(
          JSON.stringify({ success: false, message: 'No vault password configured.' }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const isMatch = await bcrypt.compare(String(currentPassword).trim(), res.rows[0].vault_password_hash);
      if (!isMatch) {
        return new Response(
          JSON.stringify({ success: false, message: 'Current vault password does not match.' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const newHash = await bcrypt.hash(String(newPassword).trim(), 10);
      await pool.query(
        'UPDATE seekers SET vault_password_hash = $1 WHERE LOWER(email) = $2',
        [newHash, cleanEmail]
      );

      return new Response(
        JSON.stringify({ success: true, message: 'Vault secret password updated successfully.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 5. RESET PASSWORD: Reset vault password using main login password
    if (action === 'reset') {
      if (!accountPassword || !newPassword || String(newPassword).trim().length < 4) {
        return new Response(
          JSON.stringify({ success: false, message: 'Account login password and new vault password are required.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const res = await pool.query(
        'SELECT password_hash FROM seekers WHERE LOWER(email) = $1',
        [cleanEmail]
      );

      if (res.rows.length === 0) {
        return new Response(
          JSON.stringify({ success: false, message: 'User account not found.' }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const isAccountMatch = await bcrypt.compare(String(accountPassword).trim(), res.rows[0].password_hash);
      if (!isAccountMatch) {
        return new Response(
          JSON.stringify({ success: false, message: 'Account login password is incorrect.' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const newHash = await bcrypt.hash(String(newPassword).trim(), 10);
      await pool.query(
        'UPDATE seekers SET vault_password_hash = $1 WHERE LOWER(email) = $2',
        [newHash, cleanEmail]
      );

      return new Response(
        JSON.stringify({ success: true, message: 'Vault password has been reset successfully.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, message: 'Invalid action.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err: any) {
    console.error('Vault Password API Error:', err);
    return new Response(
      JSON.stringify({ success: false, message: 'Server error processing vault security request.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
