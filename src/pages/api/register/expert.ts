import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../backend/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { 
      business_name, email, password, contact_number, advisor_type, 
      about_me, portfolio_link, office_address, gov_registration_number, 
      license_document_url, expertise_tags, countries_expertise 
    } = body;

    await runMigrations();
    const pool = getPool();

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
      password || '',
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

    return new Response(JSON.stringify({ status: 'success', message: 'Expert registered successfully!' }), {
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
