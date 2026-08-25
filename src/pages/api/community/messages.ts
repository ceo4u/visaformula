// src/pages/api/community/messages.ts
import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../backend/db';
import { verifySession } from '../../../backend/auth';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    await runMigrations();
    const url = new URL(request.url);
    const channelSlug = url.searchParams.get('channel') || 'russia-mbbs-2026';

    const pool = getPool();
    const [messagesRes, channelsRes, seniorsRes, resourcesRes, statsRes] = await Promise.all([
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
        `SELECT DISTINCT ON (name) id, name, avatar_url, university, status
         FROM verified_seniors
         ORDER BY name ASC, id ASC
         LIMIT 10`
      ),
      pool.query(
        `SELECT DISTINCT ON (title) id, channel_slug, title, file_size, file_type, download_url
         FROM pinned_resources
         WHERE channel_slug = $1 OR channel_slug IS NULL
         ORDER BY title ASC, id ASC
         LIMIT 6`,
        [channelSlug]
      ),
      pool.query(
        `SELECT 
          (SELECT COUNT(*) FROM seekers) as seeker_count,
          (SELECT COUNT(*) FROM verified_seniors) as senior_count,
          (SELECT COUNT(*) FROM chat_messages WHERE channel_slug = $1) as channel_messages_count`,
        [channelSlug]
      )
    ]);

    const seekerCount = parseInt(statsRes.rows[0]?.seeker_count || '0', 10);
    const seniorCount = parseInt(statsRes.rows[0]?.senior_count || '0', 10);

    return new Response(JSON.stringify({
      success: true,
      channel: channelSlug,
      messages: messagesRes.rows,
      channels: channelsRes.rows,
      seniors: seniorsRes.rows,
      resources: resourcesRes.rows,
      stats: {
        online_seniors: seniorCount > 0 ? seniorCount : 12,
        total_members: seekerCount > 0 ? seekerCount : 480
      }
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

    // Check session if available
    let authUser: any = null;
    const cookieHeader = request.headers.get('Cookie') || '';
    const match = cookieHeader.match(/visaformula_sid=([^;]+)/);
    if (match && match[1]) {
      const authResult = await verifySession(match[1]);
      if (authResult) authUser = authResult;
    }

    const body = await request.json();
    const {
      channel_slug = 'russia-mbbs-2026',
      content,
      sender_name,
      sender_avatar,
      is_verified_senior = false,
      user_id
    } = body;

    if (!content || !content.trim()) {
      return new Response(JSON.stringify({ success: false, message: 'Message content cannot be empty.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Determine final sender identity
    let finalSenderName = 'Community Member';
    let finalAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
    let finalUserId = user_id || 'guest-user';
    let isSenior = Boolean(is_verified_senior);

    if (authUser) {
      finalSenderName = authUser.type === 'seeker'
        ? `${authUser.user.first_name || ''} ${authUser.user.last_name || ''}`.trim() || authUser.user.email.split('@')[0]
        : authUser.user.business_name || 'Verified Expert';
      finalUserId = `${authUser.type}_${authUser.user.id}`;
      finalAvatar = authUser.user.profile_photo_url || authUser.user.avatar_url || finalAvatar;
      if (authUser.type === 'expert') isSenior = true;
    } else if (sender_name && sender_name !== 'Aman Verma') {
      finalSenderName = sender_name.trim();
      finalAvatar = sender_avatar || finalAvatar;
    }

    const pool = getPool();
    const insertRes = await pool.query(
      `INSERT INTO chat_messages (channel_slug, user_id, sender_name, sender_avatar, is_verified_senior, content, reactions, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, '[]'::jsonb, NOW())
       RETURNING id, channel_slug, user_id, sender_name, sender_avatar, is_verified_senior, content, reactions, created_at`,
      [channel_slug, finalUserId, finalSenderName, finalAvatar, isSenior, content.trim()]
    );

    return new Response(JSON.stringify({
      success: true,
      message: insertRes.rows[0]
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
