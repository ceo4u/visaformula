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

    // Show all valid expert profiles
    conditions.push(`((business_name IS NOT NULL AND business_name != '') OR (email IS NOT NULL AND email != ''))`);

    if (q) {
      conditions.push(`(
        LOWER(COALESCE(business_name, '')) LIKE LOWER($${idx}) OR
        LOWER(COALESCE(about_me, '')) LIKE LOWER($${idx}) OR
        LOWER(COALESCE(advisor_type, '')) LIKE LOWER($${idx}) OR
        LOWER(COALESCE(expertise_tags::text, '')) LIKE LOWER($${idx}) OR
        LOWER(COALESCE(countries_expertise::text, '')) LIKE LOWER($${idx}) OR
        LOWER(COALESCE(office_address, '')) LIKE LOWER($${idx}) OR
        LOWER(COALESCE(email, '')) LIKE LOWER($${idx}) OR
        LOWER(COALESCE(contact_number, '')) LIKE LOWER($${idx})
      )`);
      params.push(`%${q}%`);
      idx++;
    }

    if (country) {
      conditions.push(`LOWER(COALESCE(countries_expertise::text, '')) LIKE LOWER($${idx})`);
      params.push(`%${country}%`);
      idx++;
    }

    if (purpose) {
      conditions.push(`(LOWER(COALESCE(expertise_tags::text, '')) LIKE LOWER($${idx}) OR LOWER(COALESCE(advisor_type, '')) LIKE LOWER($${idx}))`);
      params.push(`%${purpose}%`);
      idx++;
    }

    if (city) {
      conditions.push(`LOWER(COALESCE(office_address, '')) LIKE LOWER($${idx})`);
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

    // Clean Postgres array format e.g. {"Uk","Canada"} or JSON array
    const parseArrayField = (val: any): string[] => {
      if (!val) return [];
      if (Array.isArray(val)) {
        return val.map(x => String(x).replace(/^[\{\"\s]+|[\}\"\s]+$/g, '')).filter(Boolean);
      }
      if (typeof val === 'string') {
        try {
          const parsed = JSON.parse(val);
          if (Array.isArray(parsed)) return parsed.map(x => String(x).trim()).filter(Boolean);
        } catch {}
        return val
          .replace(/^\{|\}$/g, '')
          .split(',')
          .map(x => x.replace(/^["'\s]+|["'\s]+$/g, '').trim())
          .filter(Boolean);
      }
      return [];
    };

    // Deduplicate by business_name / email (keep latest)
    const seenIdentifiers = new Set<string>();
    const uniqueRows = result.rows.filter((row: any) => {
      const key = (row.business_name || row.email || '').toLowerCase().trim();
      if (!key) return true;
      if (seenIdentifiers.has(key)) return false;
      seenIdentifiers.add(key);
      return true;
    });

    const experts = uniqueRows.map((row: any) => {
      const tags = parseArrayField(row.expertise_tags);
      const countries = parseArrayField(row.countries_expertise);

      return {
        id: `db_${row.id}`,
        name: row.business_name || (row.email ? row.email.split('@')[0] : 'TravlTik Consultant'),
        role: row.advisor_type || 'Immigration Consultant',
        city: row.office_address || 'Remote',
        bio: row.about_me || 'Verified TravlTik Immigration Consultant.',
        email: row.email || '',
        phone: row.contact_number || '',
        govReg: row.gov_registration_number || '',
        portfolio: row.portfolio_link || '',
        tags: tags.length > 0 ? tags : ['Visa Consultation', 'Immigration'],
        countries: countries.length > 0 ? countries : ['Worldwide'],
        image: row.profile_photo || '',
        rating: 5.0,
        reviews: 1,
        isVerified: true,
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
