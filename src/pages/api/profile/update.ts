import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../backend/db';
import { verifySession } from '../../../backend/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Verify session cookie — reject unauthenticated requests
    const cookieHeader = request.headers.get('cookie') || '';
    const sidMatch = cookieHeader.match(/visaformula_sid=([^;]+)/);
    const sessionToken = sidMatch ? sidMatch[1] : null;
    if (!sessionToken) {
      return new Response(JSON.stringify({ status: 'error', message: 'Unauthorized. Please log in.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const sessionData = await verifySession(sessionToken);
    if (!sessionData) {
      return new Response(JSON.stringify({ status: 'error', message: 'Session expired. Please log in again.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();
    const { email, role, first_name, last_name, phone, passport_country, resident_of, looking_for, business_name, advisor_type = 'Freelancer', about_me = '', portfolio_link = '', office_address = '', gov_registration_number = '', countries_expertise = '[]' } = body;

    if (!email) {
      return new Response(JSON.stringify({ status: 'error', message: 'Email is required to update profile.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Ensure session user matches the email being updated
    if (sessionData.user.email.toLowerCase() !== email.toLowerCase()) {
      return new Response(JSON.stringify({ status: 'error', message: 'Unauthorized. Cannot update another user\'s profile.' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await runMigrations();
    const pool = getPool();

    if (role === 'expert') {
      const { advisor_type, about_me, portfolio_link, office_address, gov_registration_number, countries_expertise } = body;
      // Update expert
      await pool.query(
        `UPDATE experts 
         SET business_name = $1, contact_number = $2, advisor_type = $3, about_me = $4, portfolio_link = $5, office_address = $6, gov_registration_number = $7, countries_expertise = $8
         WHERE LOWER(email) = LOWER($9)`,
        [first_name || business_name, phone, advisor_type, about_me, portfolio_link, office_address, gov_registration_number, countries_expertise, email]
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
