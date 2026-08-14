// src/pages/api/admin/stats.ts
import type { APIRoute } from 'astro';
import { runMigrations, getPool } from '../../../backend/db';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    await runMigrations();
    const pool = getPool();

    // 1. Total Seekers
    const seekersRes = await pool.query(`SELECT COUNT(*) as count FROM seekers`);
    const totalSeekers = parseInt(seekersRes.rows[0]?.count || '0', 10);

    // 2. Total Experts & Pending Verifications
    const expertsRes = await pool.query(`SELECT COUNT(*) as count FROM experts`);
    const totalExperts = parseInt(expertsRes.rows[0]?.count || '0', 10);

    // 3. Total Self Applications & Revenue
    const appsRes = await pool.query(`
      SELECT 
        COUNT(*) as count,
        SUM(CASE WHEN payment_status = 'completed' OR payment_status = 'submitted' THEN total_amount ELSE 0 END) as revenue
      FROM self_applications
    `);
    const totalApplications = parseInt(appsRes.rows[0]?.count || '0', 10);
    const selfApplyRevenue = parseFloat(appsRes.rows[0]?.revenue || '0');

    // 4. Total Bookings
    const bookingsRes = await pool.query(`SELECT COUNT(*) as count FROM bookings`);
    const totalBookings = parseInt(bookingsRes.rows[0]?.count || '0', 10);

    // 5. Total Ads & Ad Clicks
    const adsRes = await pool.query(`SELECT COUNT(*) as count FROM ads`);
    const totalAds = parseInt(adsRes.rows[0]?.count || '0', 10);

    const clicksRes = await pool.query(`SELECT COUNT(*) as count FROM ad_click_analytics`);
    const totalAdClicks = parseInt(clicksRes.rows[0]?.count || '0', 10);

    // Exact Real Platform Revenue Calculation from Neon DB
    const totalRevenue = selfApplyRevenue;

    return new Response(
      JSON.stringify({
        success: true,
        stats: {
          totalSeekers,
          totalExperts,
          totalApplications,
          totalBookings,
          totalAds,
          totalAdClicks,
          selfApplyRevenue,
          totalRevenue
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[API /api/admin/stats] Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: err?.message || 'Failed to fetch admin stats' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
