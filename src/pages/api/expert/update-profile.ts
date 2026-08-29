// src/pages/api/expert/update-profile.ts
import type { APIRoute } from 'astro';
import { runMigrations, getPool } from '../../../backend/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    await runMigrations();
    const pool = getPool();
    const body = await request.json();

    const {
      email,
      business_name,
      first_name,
      last_name,
      contact_number,
      advisor_type,
      about_me,
      portfolio_link,
      office_address,
      city,
      state,
      country,
      gov_registration_number,
      expertise_tags,
      countries_expertise,
      profile_photo
    } = body;

    if (!email) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Email is required to update profile.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const finalBusinessName = business_name || `${first_name || ''} ${last_name || ''}`.trim() || 'Immigration Consultant';
    const finalCity = city || (office_address ? office_address.split(',')[0] : 'Location Not Specified');
    const finalTags = Array.isArray(expertise_tags) ? JSON.stringify(expertise_tags) : (typeof expertise_tags === 'string' ? expertise_tags : '[]');
    const finalCountries = Array.isArray(countries_expertise) ? countries_expertise.join(', ') : (countries_expertise || 'Worldwide');

    // Check if expert exists, if not insert, else update
    const checkRes = await pool.query('SELECT id FROM experts WHERE LOWER(email) = LOWER($1)', [cleanEmail]);

    let expertRow;
    if (checkRes.rows.length === 0) {
      const insertRes = await pool.query(`
        INSERT INTO experts (
          business_name, email, password_hash, contact_number, advisor_type,
          about_me, portfolio_link, office_address, city, state, country,
          gov_registration_number, expertise_tags, countries_expertise, profile_photo, is_verified, verification_status
        )
        VALUES ($1, $2, '', $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, TRUE, 'active')
        RETURNING *;
      `, [
        finalBusinessName,
        cleanEmail,
        contact_number || '',
        advisor_type || 'Visa & Immigration Consultant',
        about_me || '',
        portfolio_link || '',
        office_address || '',
        finalCity,
        state || '',
        country || 'India',
        gov_registration_number || '',
        finalTags,
        finalCountries,
        profile_photo || ''
      ]);
      expertRow = insertRes.rows[0];
    } else {
      const updateRes = await pool.query(`
        UPDATE experts
        SET
          business_name = COALESCE($1, business_name),
          contact_number = COALESCE($2, contact_number),
          advisor_type = COALESCE($3, advisor_type),
          about_me = COALESCE($4, about_me),
          portfolio_link = COALESCE($5, portfolio_link),
          office_address = COALESCE($6, office_address),
          city = COALESCE($7, city),
          state = COALESCE($8, state),
          country = COALESCE($9, country),
          gov_registration_number = COALESCE($10, gov_registration_number),
          expertise_tags = COALESCE($11, expertise_tags),
          countries_expertise = COALESCE($12, countries_expertise),
          profile_photo = COALESCE($13, profile_photo),
          is_verified = TRUE,
          verification_status = 'active'
        WHERE LOWER(email) = LOWER($14)
        RETURNING *;
      `, [
        finalBusinessName,
        contact_number || '',
        advisor_type || 'Visa & Immigration Consultant',
        about_me || '',
        portfolio_link || '',
        office_address || '',
        finalCity,
        state || '',
        country || 'India',
        gov_registration_number || '',
        finalTags,
        finalCountries,
        profile_photo || '',
        cleanEmail
      ]);
      expertRow = updateRes.rows[0];
    }

    return new Response(
      JSON.stringify({
        status: 'success',
        message: 'Expert profile updated and activated successfully!',
        expert: expertRow
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[API /api/expert/update-profile] Error:', err);
    return new Response(
      JSON.stringify({ status: 'error', message: err?.message || 'Failed to update profile.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
