import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../backend/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, role, first_name, last_name, phone, passport_country, resident_of, looking_for } = body;

    if (!email) {
      return new Response(JSON.stringify({ status: 'error', message: 'Email is required to update profile.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await runMigrations();
    const pool = getPool();

    if (role === 'expert') {
      // Update expert
      await pool.query(
        `UPDATE experts 
         SET business_name = $1, contact_number = $2 
         WHERE LOWER(email) = LOWER($3)`,
        [`${first_name} ${last_name}`.trim(), phone, email]
      );
    } else {
      // Update seeker
      await pool.query(
        `UPDATE seekers 
         SET first_name = $1, last_name = $2, phone = $3, passport_country = $4, resident_of = $5, looking_for = $6 
         WHERE LOWER(email) = LOWER($7)`,
        [first_name, last_name, phone, passport_country, resident_of, looking_for, email]
      );
    }

    // Retrieve updated user to return in the response
    let updatedUser: any = null;
    if (role === 'expert') {
      const res = await pool.query('SELECT * FROM experts WHERE LOWER(email) = LOWER($1)', [email]);
      if (res.rows.length > 0) {
        const user = res.rows[0];
        updatedUser = {
          uid: `expert_${user.id}`,
          email: user.email,
          displayName: user.business_name,
          type: 'expert',
          rawUser: user
        };
      }
    } else {
      const res = await pool.query('SELECT * FROM seekers WHERE LOWER(email) = LOWER($1)', [email]);
      if (res.rows.length > 0) {
        const user = res.rows[0];
        updatedUser = {
          uid: `seeker_${user.id}`,
          email: user.email,
          displayName: `${user.first_name} ${user.last_name || ''}`.trim(),
          type: 'seeker',
          rawUser: user
        };
      }
    }

    return new Response(JSON.stringify({
      status: 'success',
      message: 'Profile updated and saved to database successfully!',
      user: updatedUser
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Profile update API error:', err);
    return new Response(JSON.stringify({ status: 'error', message: err.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
