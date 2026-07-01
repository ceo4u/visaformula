import type { APIRoute } from 'astro';
import { verifySession } from '../../../backend/auth';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    const cookieHeader = request.headers.get('Cookie') || '';
    const match = cookieHeader.match(/visaformula_sid=([^;]+)/);
    const token = match ? match[1] : '';

    if (!token) {
      return new Response(JSON.stringify({ status: 'error', message: 'No active session.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const authResult = await verifySession(token);
    if (!authResult) {
      return new Response(JSON.stringify({ status: 'error', message: 'Invalid or expired session.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { user, type } = authResult;
    const displayName = type === 'seeker' 
      ? `${user.first_name} ${user.last_name || ''}`.trim() 
      : user.business_name;

    return new Response(JSON.stringify({
      status: 'success',
      user: {
        uid: `${type}_${user.id}`,
        email: user.email,
        displayName: displayName || 'User',
        type
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    console.error('Auth-me API error:', err);
    return new Response(JSON.stringify({ status: 'error', message: err.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
