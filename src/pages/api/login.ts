import type { APIRoute } from 'astro';
import { loginUser, createSession } from '../../backend/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ status: 'error', message: 'Email and password are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const authResult = await loginUser(email, password);
    if (!authResult) {
      return new Response(JSON.stringify({ status: 'error', message: 'Invalid email or password.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { user, type } = authResult;
    const token = await createSession(user.id, type);

    // Set cookie headers for session persistence
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append(
      'Set-Cookie',
      `visaformula_sid=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60};`
    );

    const displayName = type === 'seeker' 
      ? `${user.first_name} ${user.last_name || ''}`.trim() 
      : user.business_name;

    return new Response(JSON.stringify({
      status: 'success',
      user: {
        uid: `${type}_${user.id}`,
        email: user.email,
        displayName: displayName || 'User',
        type,
        rawUser: user
      }
    }), { status: 200, headers });

  } catch (err: any) {
    console.error('Login API error:', err);
    return new Response(JSON.stringify({ status: 'error', message: err.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
