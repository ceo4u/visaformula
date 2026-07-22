import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../backend/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { title, company, category, cover_photo, description, expert_email } = body;

    if (!title || !company || !category || !description) {
      return new Response(JSON.stringify({ status: 'error', message: 'Missing required advertisement details.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await runMigrations();
    const pool = getPool();

    const result = await pool.query(
      `INSERT INTO ads (title, company, category, cover_photo, description, expert_email, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'under_verification')
       RETURNING *;`,
      [title, company, category, cover_photo || '', description, expert_email || '']
    );

    return new Response(JSON.stringify({
      status: 'success',
      message: 'Our team will verify your details.',
      ad: result.rows[0]
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Failed to insert ad into database:', err);
    return new Response(JSON.stringify({
      status: 'error',
      message: err.message || 'Failed to save ad into database.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
