import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../backend/db';

export const prerender = false;

// In-memory click events fallback store
let clickLogsStore: any[] = [];

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    if (!data.adTitle || !data.adType) {
      return new Response(JSON.stringify({ error: 'Missing required ad tracking fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const eventRecord = {
      id: 'click_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      adId: data.adId || data.adTitle.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      adTitle: data.adTitle,
      adType: data.adType, // 'classified' | 'sponsored'
      category: data.category || 'General',
      destination: data.destination || 'N/A',
      targetUrl: data.targetUrl || '',
      userEmail: data.userEmail || 'Guest (Anonymous)',
      userName: data.userName || 'Guest',
      userRole: data.userRole || 'guest',
      device: data.device || 'desktop',
      pageUrl: data.pageUrl || '/',
      timestamp: data.timestamp || new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip') || '127.0.0.1',
    };

    // Store in-memory fallback
    clickLogsStore.unshift(eventRecord);
    if (clickLogsStore.length > 500) {
      clickLogsStore = clickLogsStore.slice(0, 500);
    }

    // Persist to PostgreSQL database for permanent analytics across all user accounts
    try {
      await runMigrations();
      const pool = getPool();
      await pool.query(`
        INSERT INTO ad_click_analytics (
          ad_id, ad_title, ad_type, category, destination, target_url, user_email, user_name, user_role, device, page_url, ip_address
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `, [
        eventRecord.adId,
        eventRecord.adTitle,
        eventRecord.adType,
        eventRecord.category,
        eventRecord.destination,
        eventRecord.targetUrl,
        eventRecord.userEmail,
        eventRecord.userName,
        eventRecord.userRole,
        eventRecord.device,
        eventRecord.pageUrl,
        eventRecord.ip
      ]);
    } catch (dbErr) {
      console.warn('DB analytics log save warning:', dbErr);
    }

    return new Response(JSON.stringify({ success: true, trackedEvent: eventRecord }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const GET: APIRoute = async () => {
  try {
    await runMigrations();
    const pool = getPool();
    const dbRes = await pool.query(`
      SELECT 
        id,
        ad_id AS "adId",
        ad_title AS "adTitle",
        ad_type AS "adType",
        category,
        destination,
        target_url AS "targetUrl",
        user_email AS "userEmail",
        user_name AS "userName",
        user_role AS "userRole",
        device,
        page_url AS "pageUrl",
        ip_address AS "ip",
        created_at AS "timestamp"
      FROM ad_click_analytics
      ORDER BY id DESC
      LIMIT 500;
    `);

    return new Response(JSON.stringify({ logs: dbRes.rows, count: dbRes.rows.length }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (dbErr) {
    return new Response(JSON.stringify({ logs: clickLogsStore, count: clickLogsStore.length }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
