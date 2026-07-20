import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../backend/db';
import bcrypt from 'bcryptjs';
import { sendWelcomeEmail } from '../../../lib/email';
import { deleteOtpRecord } from '../../../lib/otp';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { 
      business_name, email, password, contact_number, advisor_type, 
      about_me, portfolio_link, office_address, gov_registration_number, 
      license_document_url, expertise_tags, countries_expertise 
    } = body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(JSON.stringify({ status: 'error', message: 'Please provide a valid email address.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await runMigrations();
    const pool = getPool();

    // Verify email verification has succeeded
    const verCheck = await pool.query('SELECT verified FROM email_verifications WHERE LOWER(email) = LOWER($1)', [email]);
    if (verCheck.rows.length === 0 || !verCheck.rows[0].verified) {
      return new Response(JSON.stringify({ status: 'error', message: 'Email address has not been verified.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const checkRes = await pool.query('SELECT id FROM experts WHERE LOWER(email) = LOWER($1)', [email]);
    const isNew = checkRes.rows.length === 0;

    // Hash password with bcrypt (12 salt rounds)
    const hashedPassword = password ? await bcrypt.hash(password, 12) : '';

    // Insert expert record
    await pool.query(`
      INSERT INTO experts (
        business_name, email, password_hash, contact_number, advisor_type, 
        about_me, portfolio_link, office_address, gov_registration_number, 
        license_document_url, expertise_tags, countries_expertise
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT (email) DO UPDATE 
      SET business_name = $1, contact_number = $4, advisor_type = $5, 
          about_me = $6, portfolio_link = $7, office_address = $8, 
          gov_registration_number = $9, license_document_url = $10, 
          expertise_tags = $11, countries_expertise = $12;
    `, [
      business_name,
      email,
      hashedPassword,
      contact_number,
      advisor_type,
      about_me || '',
      portfolio_link || '',
      office_address || '',
      gov_registration_number || '',
      license_document_url || '',
      JSON.stringify(expertise_tags || []),
      countries_expertise || ''
    ]);

    if (isNew) {
      try {
        await deleteOtpRecord(email);
        sendWelcomeEmail({
          firstName: business_name,
          displayName: business_name,
          email,
          userType: 'expert',
        }).catch(err => console.error('Welcome email failed for expert:', err));
      } catch (emailErr) {
        console.error('Post-registration actions failed for expert:', emailErr);
      }
    }

    const userRes = await pool.query('SELECT * FROM experts WHERE LOWER(email) = LOWER($1)', [email]);
    const user = userRes.rows[0];

    return new Response(JSON.stringify({
      status: 'success',
      message: 'Expert registered successfully!',
      user: {
        uid: `expert_${user.id}`,
        email: user.email,
        displayName: user.business_name,
        type: 'expert',
        rawUser: { ...user, password_hash: undefined }
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Expert API error:', err);
    return new Response(JSON.stringify({ status: 'error', message: err.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
