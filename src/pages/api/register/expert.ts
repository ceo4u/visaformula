import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../backend/db';
import { createSession } from '../../../backend/auth';
import bcrypt from 'bcryptjs';
import { sendWelcomeEmail } from '../../../lib/email';
import { deleteOtpRecord } from '../../../lib/otp';
import { verifyTurnstileToken } from '../../../lib/verify-turnstile';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const tokenHeader = request.headers.get('x-turnstile-token');
    const turnstileToken = body.turnstileToken || tokenHeader;

    if (turnstileToken) {
      verifyTurnstileToken(turnstileToken, request).catch(() => {});
    }

    const { 
      business_name, email, password, contact_number, advisor_type, 
      about_me, portfolio_link, office_address, gov_registration_number, 
      license_document_url, expertise_tags, countries_expertise,
      business_type, year_established, business_email, business_phone,
      website, city, state, country, pin_code, full_name,
      experience_years, languages_spoken, services, is_google_verified
    } = body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(JSON.stringify({ status: 'error', message: 'Please provide a valid email address.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const pool = getPool();
    runMigrations().catch(err => console.warn('[RegisterExpert] Migration check:', err));

    const [seekerCheck, expertCheck] = await Promise.all([
      pool.query('SELECT id FROM seekers WHERE LOWER(email) = LOWER($1)', [email]),
      pool.query('SELECT id FROM experts WHERE LOWER(email) = LOWER($1)', [email]),
    ]);
    if (seekerCheck.rows.length > 0 || expertCheck.rows.length > 0) {
      return new Response(JSON.stringify({ status: 'error', message: 'This email is already registered. Please login instead.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Hash password with bcrypt (12 salt rounds)
    const hashedPassword = password ? await bcrypt.hash(password, 12) : '';

    const resolvedBusinessName = business_name || full_name || 'Business Partner';
    const resolvedAdvisorType = advisor_type || business_type || 'Consultant';
    const resolvedServices = expertise_tags || services || [];
    const resolvedCountries = typeof countries_expertise === 'string' ? countries_expertise : JSON.stringify(countries_expertise || []);
    const resolvedLanguages = typeof languages_spoken === 'string' ? languages_spoken : JSON.stringify(languages_spoken || []);

    // Insert expert record
    await pool.query(`
      INSERT INTO experts (
        business_name, email, password_hash, contact_number, advisor_type, 
        about_me, portfolio_link, office_address, gov_registration_number, 
        license_document_url, expertise_tags, countries_expertise,
        business_type, year_established, business_email, business_phone,
        website, city, state, country, pin_code, full_name,
        experience_years, languages_spoken
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
      ON CONFLICT (email) DO UPDATE 
      SET business_name = $1, contact_number = $4, advisor_type = $5, 
          about_me = $6, portfolio_link = $7, office_address = $8, 
          gov_registration_number = $9, license_document_url = $10, 
          expertise_tags = $11, countries_expertise = $12,
          business_type = $13, year_established = $14, business_email = $15,
          business_phone = $16, website = $17, city = $18, state = $19,
          country = $20, pin_code = $21, full_name = $22,
          experience_years = $23, languages_spoken = $24;
    `, [
      resolvedBusinessName,
      email.toLowerCase().trim(),
      hashedPassword,
      contact_number || business_phone || '',
      resolvedAdvisorType,
      about_me || '',
      website || portfolio_link || '',
      office_address || '',
      gov_registration_number || '',
      license_document_url || '',
      JSON.stringify(resolvedServices),
      resolvedCountries,
      business_type || '',
      year_established || '',
      business_email || email,
      business_phone || contact_number || '',
      website || '',
      city || '',
      state || '',
      country || '',
      pin_code || '',
      full_name || '',
      experience_years || '',
      resolvedLanguages
    ]);

    try {
      await deleteOtpRecord(email);
      sendWelcomeEmail({
        firstName: full_name || resolvedBusinessName,
        displayName: resolvedBusinessName,
        email,
        userType: 'expert',
      }).catch(err => console.error('Welcome email failed for expert:', err));
    } catch (emailErr) {
      console.error('Post-registration actions failed for expert:', emailErr);
    }

    const userRes = await pool.query('SELECT * FROM experts WHERE LOWER(email) = LOWER($1)', [email.toLowerCase().trim()]);
    const user = userRes.rows[0];

    const token = await createSession(user.id, 'expert');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append(
      'Set-Cookie',
      `travltik_sid=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60};`
    );

    return new Response(JSON.stringify({
      status: 'success',
      message: 'Expert registered successfully!',
      user: {
        uid: `expert_${user.id}`,
        email: user.email,
        displayName: user.business_name || full_name,
        type: 'expert',
        rawUser: { ...user, password_hash: undefined }
      }
    }), {
      status: 200,
      headers
    });
  } catch (err: any) {
    console.error('Expert API error:', err);
    return new Response(JSON.stringify({ status: 'error', message: err.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
