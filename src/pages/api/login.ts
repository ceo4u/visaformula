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

    const { user, type } = await loginUser(email, password);
    const token = await createSession(user.id, type);

    // Set cookie headers for session persistence
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append(
      'Set-Cookie',
      `travltik_sid=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60};`
    );
    headers.append(
      'Set-Cookie',
      `visaformula_sid=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60};`
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
        rawUser: { ...user, password_hash: undefined }
      }
    }), { status: 200, headers });

  } catch (err: any) {
    console.error('Login API error:', err);
    // Generic message to prevent email enumeration
    return new Response(JSON.stringify({ status: 'error', message: 'Invalid email or password.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
