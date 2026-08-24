// src/pages/api/community/messages/react.ts
import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../../backend/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    await runMigrations();
    const { message_id, emoji } = await request.json();

    if (!message_id || !emoji) {
      return new Response(JSON.stringify({ success: false, message: 'message_id and emoji are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const pool = getPool();
    const msgRes = await pool.query('SELECT reactions FROM chat_messages WHERE id = $1', [message_id]);

    if (msgRes.rows.length === 0) {
      return new Response(JSON.stringify({ success: false, message: 'Message not found.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    let reactions: Array<{ emoji: string; count: number }> = [];
    const currentReactions = msgRes.rows[0].reactions;
    if (Array.isArray(currentReactions)) {
      reactions = [...currentReactions];
    }

    const existingIdx = reactions.findIndex(r => r.emoji === emoji);
    if (existingIdx >= 0) {
      reactions[existingIdx].count += 1;
    } else {
      reactions.push({ emoji, count: 1 });
    }

    const updateRes = await pool.query(
      'UPDATE chat_messages SET reactions = $1 WHERE id = $2 RETURNING id, reactions',
      [JSON.stringify(reactions), message_id]
    );

    return new Response(JSON.stringify({
      success: true,
      reactions: updateRes.rows[0].reactions
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    console.error('[Community Reaction Error]', err);
    return new Response(JSON.stringify({ success: false, message: 'Failed to react to message.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
