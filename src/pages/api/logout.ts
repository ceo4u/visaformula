import type { APIRoute } from 'astro';
import { deleteSession } from '../../backend/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const cookieHeader = request.headers.get('Cookie') || '';
    const match = cookieHeader.match(/(?:travltik_sid|visaformula_sid)=([^;]+)/);
    const token = match ? match[1] : '';

    if (token) {
      await deleteSession(token);
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append(
      'Set-Cookie',
      'travltik_sid=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0;'
    );
    headers.append(
      'Set-Cookie',
      'visaformula_sid=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0;'
    );

    return new Response(JSON.stringify({ status: 'success', message: 'Logged out successfully.' }), {
      status: 200,
      headers
    });
  } catch (err: any) {
    console.error('Logout API error:', err);
    return new Response(JSON.stringify({ status: 'error', message: err.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
