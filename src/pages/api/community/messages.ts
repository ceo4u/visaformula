// src/pages/api/community/messages.ts
import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../backend/db';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    await runMigrations();
    const url = new URL(request.url);
    const channelSlug = url.searchParams.get('channel') || 'russia-mbbs-2026';

    const pool = getPool();
    const [messagesRes, channelsRes, seniorsRes, resourcesRes] = await Promise.all([
      pool.query(
        `SELECT id, channel_slug, user_id, sender_name, sender_avatar, is_verified_senior, content, reactions, created_at
         FROM chat_messages
         WHERE channel_slug = $1
         ORDER BY created_at ASC
         LIMIT 100`,
        [channelSlug]
      ),
      pool.query(
        `SELECT id, slug, name, category, icon, unread_count, description
         FROM community_channels
         ORDER BY category ASC, id ASC`
      ),
      pool.query(
        `SELECT id, name, avatar_url, university, status
         FROM verified_seniors
         ORDER BY id ASC`
      ),
      pool.query(
        `SELECT id, channel_slug, title, file_size, file_type, download_url
         FROM pinned_resources
         WHERE channel_slug = $1 OR channel_slug IS NULL
         ORDER BY id ASC`,
        [channelSlug]
      )
    ]);

    return new Response(JSON.stringify({
      success: true,
      channel: channelSlug,
      messages: messagesRes.rows,
      channels: channelsRes.rows,
      seniors: seniorsRes.rows,
      resources: resourcesRes.rows
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    console.error('[Community GET /messages]', err);
    return new Response(JSON.stringify({ success: false, message: 'Failed to fetch community feed.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    await runMigrations();
    const body = await request.json();
    const {
      channel_slug = 'russia-mbbs-2026',
      content,
      sender_name = 'Aman Verma',
      sender_avatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      is_verified_senior = false,
      user_id = 'user-current'
    } = body;

    if (!content || !content.trim()) {
      return new Response(JSON.stringify({ success: false, message: 'Message content cannot be empty.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const pool = getPool();
    const insertRes = await pool.query(
      `INSERT INTO chat_messages (channel_slug, user_id, sender_name, sender_avatar, is_verified_senior, content, reactions, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, '[]'::jsonb, NOW())
       RETURNING id, channel_slug, user_id, sender_name, sender_avatar, is_verified_senior, content, reactions, created_at`,
      [channel_slug, user_id, sender_name, sender_avatar, Boolean(is_verified_senior), content.trim()]
    );

    const newMessage = insertRes.rows[0];

    return new Response(JSON.stringify({
      success: true,
      message: newMessage
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    console.error('[Community POST /messages]', err);
    return new Response(JSON.stringify({ success: false, message: 'Failed to send message.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
