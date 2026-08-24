import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../../backend/db';
import bcrypt from 'bcryptjs';

export const prerender = false;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  try {
    await runMigrations();
    const pool = getPool();
    const body = await request.json();
    const { role = 'country_partner', email, password } = body;

    // 1. Basic validation
    if (!email || !EMAIL_REGEX.test(email.trim())) {
      return new Response(JSON.stringify({ success: false, message: 'Please provide a valid corporate email address.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!password || password.length < 8) {
      return new Response(JSON.stringify({ success: false, message: 'Password must be at least 8 characters long.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 2. Role Specific Processing
    if (role === 'country_partner') {
      const { company_name, contact_person, phone, country, tax_id } = body;
      if (!company_name || !contact_person) {
        return new Response(JSON.stringify({ success: false, message: 'Company name and contact person are required.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Check existing email
      const existing = await pool.query('SELECT id FROM channel_partners WHERE LOWER(email) = LOWER($1)', [cleanEmail]);
      if (existing.rows.length > 0) {
        return new Response(JSON.stringify({ success: false, message: 'This email is already registered as a Country Partner.' }), {
          status: 409,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      await pool.query(
        `INSERT INTO channel_partners (company_name, email, password_hash, contact_person, phone, country, tax_id, tier, role, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'platinum', 'country_partner', 'PENDING_HQ_APPROVAL')`,
        [
          company_name,
          cleanEmail,
          hashedPassword,
          contact_person,
          phone || '',
          country || 'United States',
          tax_id || ''
        ]
      );

      return new Response(JSON.stringify({
        success: true,
        message: '🎉 Registration Submitted! Your Country Partner profile is pending TravlTik HQ approval. You will receive an email once activated.',
        status: 'PENDING_HQ_APPROVAL'
      }), { status: 201, headers: { 'Content-Type': 'application/json' } });
    }

    if (role === 'state_partner') {
      const { agency_name, contact_person, phone, operating_state, parent_code } = body;
      if (!agency_name || !operating_state) {
        return new Response(JSON.stringify({ success: false, message: 'Agency name and operating state are required.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Get or assign parent country partner
      let cpId: number | null = null;
      const cpRes = await pool.query('SELECT id FROM channel_partners ORDER BY id ASC LIMIT 1');
      if (cpRes.rows.length > 0) {
        cpId = cpRes.rows[0].id;
      }

      await pool.query(
        `INSERT INTO state_partners (country_partner_id, partner_name, company_name, operating_state, email, phone, contact_person, password_hash, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'PENDING_COUNTRY_PARTNER_APPROVAL')`,
        [
          cpId,
          agency_name,
          agency_name,
          operating_state,
          cleanEmail,
          phone || '',
          contact_person || agency_name,
          hashedPassword
        ]
      );

      return new Response(JSON.stringify({
        success: true,
        message: '🎉 Registration Submitted! Your State Partner application has been sent for Country Partner & HQ review.',
        status: 'PENDING_COUNTRY_PARTNER_APPROVAL'
      }), { status: 201, headers: { 'Content-Type': 'application/json' } });
    }

    if (role === 'referral_consultant') {
      const { consultant_name, phone, state, specialization } = body;
      if (!consultant_name) {
        return new Response(JSON.stringify({ success: false, message: 'Consultant name is required.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      let cpId: number | null = null;
      const cpRes = await pool.query('SELECT id FROM channel_partners ORDER BY id ASC LIMIT 1');
      if (cpRes.rows.length > 0) {
        cpId = cpRes.rows[0].id;
      }

      await pool.query(
        `INSERT INTO referral_consultants (country_partner_id, consultant_name, email, phone, region, speciality, password_hash, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'PENDING_APPROVAL')`,
        [
          cpId,
          consultant_name,
          cleanEmail,
          phone || '',
          state || '',
          specialization || 'General Migration',
          hashedPassword
        ]
      );

      return new Response(JSON.stringify({
        success: true,
        message: '🎉 Registration Submitted! Your Referral Consultant application is pending approval.',
        status: 'PENDING_APPROVAL'
      }), { status: 201, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ success: false, message: 'Invalid role selected.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    console.error('[PartnerRegister API Error]', err);
    return new Response(JSON.stringify({ success: false, message: err.message || 'Registration processing failed.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
