// src/pages/api/experts.ts
// Fetches all registered experts from Neon DB with optional search filters
import type { APIRoute } from 'astro';
import { runMigrations, getPool } from '../../backend/db';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  try {
    await runMigrations();
    const pool = getPool();

    const q       = url.searchParams.get('q')?.trim() || '';
    const country = url.searchParams.get('country')?.trim() || '';
    const purpose = url.searchParams.get('purpose')?.trim() || '';
    const city    = url.searchParams.get('city')?.trim() || '';

    // Build WHERE clause dynamically
    const conditions: string[] = [];
    const params: any[] = [];
    let idx = 1;

    // Only show experts who have at least a business name (completed basic profile)
    conditions.push(`(business_name IS NOT NULL AND business_name != '')`);

    if (q) {
      conditions.push(`(
        LOWER(business_name) LIKE LOWER($${idx}) OR
        LOWER(about_me) LIKE LOWER($${idx}) OR
        LOWER(advisor_type) LIKE LOWER($${idx}) OR
        LOWER(expertise_tags) LIKE LOWER($${idx}) OR
        LOWER(countries_expertise) LIKE LOWER($${idx}) OR
        LOWER(office_address) LIKE LOWER($${idx})
      )`);
      params.push(`%${q}%`);
      idx++;
    }

    if (country) {
      conditions.push(`LOWER(countries_expertise) LIKE LOWER($${idx})`);
      params.push(`%${country}%`);
      idx++;
    }

    if (purpose) {
      conditions.push(`(LOWER(expertise_tags) LIKE LOWER($${idx}) OR LOWER(advisor_type) LIKE LOWER($${idx}))`);
      params.push(`%${purpose}%`);
      idx++;
    }

    if (city) {
      conditions.push(`LOWER(office_address) LIKE LOWER($${idx})`);
      params.push(`%${city}%`);
      idx++;
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const result = await pool.query(
      `SELECT
        id,
        business_name,
        email,
        contact_number,
        advisor_type,
        about_me,
        portfolio_link,
        office_address,
        gov_registration_number,
        expertise_tags,
        countries_expertise,
        profile_photo,
        created_at
      FROM experts
      ${where}
      ORDER BY created_at DESC
      LIMIT 100`,
      params
    );

    const experts = result.rows.map((row: any) => {
      // Parse JSON fields safely
      let tags: string[] = [];
      try {
        const t = typeof row.expertise_tags === 'string' ? JSON.parse(row.expertise_tags) : row.expertise_tags;
        if (Array.isArray(t)) tags = t;
      } catch { tags = row.expertise_tags ? [row.expertise_tags] : []; }

      let countries: string[] = [];
      try {
        const c = typeof row.countries_expertise === 'string' ? JSON.parse(row.countries_expertise) : row.countries_expertise;
        if (Array.isArray(c)) countries = c;
        else if (typeof c === 'string') countries = c.split(',').map((x: string) => x.trim()).filter(Boolean);
      } catch { countries = row.countries_expertise ? row.countries_expertise.split(',').map((x: string) => x.trim()) : []; }

      return {
        id: `db_${row.id}`,
        name: row.business_name || 'Expert',
        role: row.advisor_type || 'Immigration Consultant',
        city: row.office_address || 'Remote',
        bio: row.about_me || '',
        email: row.email || '',
        phone: row.contact_number || '',
        govReg: row.gov_registration_number || '',
        portfolio: row.portfolio_link || '',
        tags,
        countries: countries.length > 0 ? countries : ['Worldwide'],
        image: row.profile_photo || '',
        rating: 5.0,
        reviews: 0,
        isVerified: Boolean(row.gov_registration_number),
        isRemote: true,
        createdAt: row.created_at,
      };
    });

    return new Response(JSON.stringify({ success: true, experts, total: experts.length }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });

  } catch (err: any) {
    console.error('[API /api/experts] Error:', err);
    return new Response(
      JSON.stringify({ success: false, experts: [], error: err?.message || 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
